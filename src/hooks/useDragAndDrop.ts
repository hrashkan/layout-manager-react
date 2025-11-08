import { useCallback, useState, useRef, useEffect } from "react";
import { LayoutModel, DropPosition } from "../types";
import {
  findNodeById,
  updateNodeById,
  createTabSet,
  createRow,
  createColumn,
  findParentNode,
  removeEmptyTabsets,
} from "../utils/layoutUtils";

export const useDragAndDrop = (
  model: LayoutModel,
  onModelChange?: (model: LayoutModel) => void
) => {
  const [draggedTab, setDraggedTab] = useState<{
    tabsetId: string;
    tabIndex: number;
  } | null>(null);

  const [dragOverTabset, setDragOverTabset] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<DropPosition>("center");
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  const draggedTabRef = useRef<{
    tabsetId: string;
    tabIndex: number;
  } | null>(null);

  // Use refs to keep callbacks stable
  const modelRef = useRef(model);
  const onModelChangeRef = useRef(onModelChange);
  const dropPositionRef = useRef(dropPosition);
  const dropTargetIndexRef = useRef(dropTargetIndex);

  useEffect(() => {
    modelRef.current = model;
  }, [model]);

  useEffect(() => {
    onModelChangeRef.current = onModelChange;
  }, [onModelChange]);

  useEffect(() => {
    dropPositionRef.current = dropPosition;
  }, [dropPosition]);

  useEffect(() => {
    dropTargetIndexRef.current = dropTargetIndex;
  }, [dropTargetIndex]);

  const handleDragStart = useCallback((tabsetId: string, tabIndex: number) => {
    const dragData = { tabsetId, tabIndex };
    setDraggedTab(dragData);
    draggedTabRef.current = dragData;
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedTab(null);
    draggedTabRef.current = null;
    setDragOverTabset(null);
    setDropTargetIndex(null);
  }, []);

  const handleDragOver = useCallback(
    (
      e: React.DragEvent,
      tabsetId: string,
      position: DropPosition = "center",
      targetIndex?: number
    ) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverTabset(tabsetId);
      setDropPosition(position);
      if (targetIndex !== undefined) {
        setDropTargetIndex(targetIndex);
      } else if (position !== "tab") {
        setDropTargetIndex(null);
      }
    },
    []
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (e.currentTarget === e.target) {
      setTimeout(() => {
        setDragOverTabset(null);
        setDropTargetIndex(null);
      }, 50);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetTabsetId: string) => {
      e.preventDefault();
      const currentDraggedTab = draggedTabRef.current;
      const currentModel = modelRef.current;
      const currentOnModelChange = onModelChangeRef.current;
      const currentDropPosition = dropPositionRef.current;
      const currentDropTargetIndex = dropTargetIndexRef.current;

      if (!currentDraggedTab || !currentOnModelChange) {
        return;
      }

      const { tabsetId: sourceTabsetId, tabIndex } = currentDraggedTab;

      if (
        sourceTabsetId === targetTabsetId &&
        currentDropPosition === "tab" &&
        currentDropTargetIndex !== null
      ) {
        const sourceTabset = findNodeById(currentModel.layout, sourceTabsetId);
        if (!sourceTabset || !sourceTabset.children) {
          return;
        }

        const tabToMove = sourceTabset.children[tabIndex];
        if (!tabToMove || tabIndex === currentDropTargetIndex) {
          return;
        }

        const newChildren = [...sourceTabset.children];
        newChildren.splice(tabIndex, 1);
        newChildren.splice(currentDropTargetIndex, 0, tabToMove);

        let newSelected = sourceTabset.selected ?? 0;
        if (tabIndex < newSelected && currentDropTargetIndex >= newSelected) {
          newSelected = Math.max(0, newSelected - 1);
        } else if (
          tabIndex > newSelected &&
          currentDropTargetIndex <= newSelected
        ) {
          newSelected = Math.min(newSelected + 1, newChildren.length - 1);
        } else if (tabIndex === newSelected) {
          newSelected = currentDropTargetIndex;
        }

        const updatedLayout = updateNodeById(
          currentModel.layout,
          sourceTabsetId,
          {
            children: newChildren,
            selected: newSelected,
          }
        );

        if (updatedLayout) {
          currentOnModelChange({
            ...currentModel,
            layout: updatedLayout,
            metadata: currentModel.metadata,
          });
        }

        setDraggedTab(null);
        setDragOverTabset(null);
        setDropTargetIndex(null);
        return;
      }

      if (sourceTabsetId === targetTabsetId && currentDropPosition !== "tab") {
        return;
      }

      const sourceTabset = findNodeById(currentModel.layout, sourceTabsetId);
      const targetTabset = findNodeById(currentModel.layout, targetTabsetId);

      if (
        !sourceTabset ||
        !targetTabset ||
        !sourceTabset.children ||
        !targetTabset.children
      ) {
        return;
      }

      const tabToMove = sourceTabset.children[tabIndex];
      if (!tabToMove) {
        return;
      }

      let updatedLayout = currentModel.layout;

      const updatedSourceChildren = sourceTabset.children.filter(
        (_, index) => index !== tabIndex
      );

      const updatedSourceLayout = updateNodeById(
        updatedLayout,
        sourceTabsetId,
        {
          children: updatedSourceChildren,
          selected: Math.min(
            sourceTabset.selected || 0,
            updatedSourceChildren.length - 1
          ),
        }
      );
      if (!updatedSourceLayout) return;
      updatedLayout = updatedSourceLayout;

      if (currentDropPosition === "center") {
        const updatedTargetLayout = updateNodeById(
          updatedLayout,
          targetTabsetId,
          {
            children: [...(targetTabset.children || []), tabToMove],
            selected: targetTabset.children?.length || 0,
          }
        );
        if (!updatedTargetLayout) return;
        updatedLayout = updatedTargetLayout;
      } else {
        const newTabset = createTabSet(
          `${targetTabsetId}-split-${Date.now()}`,
          [tabToMove]
        );

        const parent = findParentNode(updatedLayout, targetTabsetId);
        if (parent) {
          const targetIndex =
            parent.children?.findIndex(
              (child) => child.id === targetTabsetId
            ) || 0;

          if (
            currentDropPosition === "left" ||
            currentDropPosition === "right"
          ) {
            const newRow = createRow(`${targetTabsetId}-row-${Date.now()}`, [
              currentDropPosition === "left" ? newTabset : targetTabset,
              currentDropPosition === "left" ? targetTabset : newTabset,
            ]);

            const updatedParentLayout = updateNodeById(
              updatedLayout,
              parent.id,
              {
                children: [
                  ...(parent.children?.slice(0, targetIndex) || []),
                  newRow,
                  ...(parent.children?.slice(targetIndex + 1) || []),
                ],
              }
            );
            if (!updatedParentLayout) return;
            updatedLayout = updatedParentLayout;
          } else if (
            currentDropPosition === "top" ||
            currentDropPosition === "bottom"
          ) {
            const newColumn = createColumn(
              `${targetTabsetId}-column-${Date.now()}`,
              [
                currentDropPosition === "top" ? newTabset : targetTabset,
                currentDropPosition === "top" ? targetTabset : newTabset,
              ]
            );

            const updatedParentLayout2 = updateNodeById(
              updatedLayout,
              parent.id,
              {
                children: [
                  ...(parent.children?.slice(0, targetIndex) || []),
                  newColumn,
                  ...(parent.children?.slice(targetIndex + 1) || []),
                ],
              }
            );
            if (!updatedParentLayout2) return;
            updatedLayout = updatedParentLayout2;
          }
        }
      }

      const cleanedLayout = removeEmptyTabsets(updatedLayout);

      if (cleanedLayout) {
        currentOnModelChange({
          ...currentModel,
          layout: cleanedLayout,
          metadata: currentModel.metadata,
        });
      }

      setDraggedTab(null);
      setDragOverTabset(null);
    },
    [] // No dependencies - uses refs
  );

  return {
    draggedTab,
    dragOverTabset,
    dropPosition,
    dropTargetIndex,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
