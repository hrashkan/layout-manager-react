import { useCallback, useState, useRef } from "react";
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

      if (!currentDraggedTab || !onModelChange) {
        return;
      }

      const { tabsetId: sourceTabsetId, tabIndex } = currentDraggedTab;

      if (
        sourceTabsetId === targetTabsetId &&
        dropPosition === "tab" &&
        dropTargetIndex !== null
      ) {
        const sourceTabset = findNodeById(model.layout, sourceTabsetId);
        if (!sourceTabset || !sourceTabset.children) {
          return;
        }

        const tabToMove = sourceTabset.children[tabIndex];
        if (!tabToMove || tabIndex === dropTargetIndex) {
          return;
        }

        const newChildren = [...sourceTabset.children];
        newChildren.splice(tabIndex, 1);
        newChildren.splice(dropTargetIndex, 0, tabToMove);

        let newSelected = sourceTabset.selected ?? 0;
        if (tabIndex < newSelected && dropTargetIndex >= newSelected) {
          newSelected = Math.max(0, newSelected - 1);
        } else if (tabIndex > newSelected && dropTargetIndex <= newSelected) {
          newSelected = Math.min(newSelected + 1, newChildren.length - 1);
        } else if (tabIndex === newSelected) {
          newSelected = dropTargetIndex;
        }

        const updatedLayout = updateNodeById(model.layout, sourceTabsetId, {
          children: newChildren,
          selected: newSelected,
        });

        if (updatedLayout) {
          onModelChange({
            ...model,
            layout: updatedLayout,
            metadata: model.metadata,
          });
        }

        setDraggedTab(null);
        setDragOverTabset(null);
        setDropTargetIndex(null);
        return;
      }

      if (sourceTabsetId === targetTabsetId && dropPosition !== "tab") {
        return;
      }

      const sourceTabset = findNodeById(model.layout, sourceTabsetId);
      const targetTabset = findNodeById(model.layout, targetTabsetId);

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

      let updatedLayout = model.layout;

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

      if (dropPosition === "center") {
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

          if (dropPosition === "left" || dropPosition === "right") {
            const newRow = createRow(`${targetTabsetId}-row-${Date.now()}`, [
              dropPosition === "left" ? newTabset : targetTabset,
              dropPosition === "left" ? targetTabset : newTabset,
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
          } else if (dropPosition === "top" || dropPosition === "bottom") {
            const newColumn = createColumn(
              `${targetTabsetId}-column-${Date.now()}`,
              [
                dropPosition === "top" ? newTabset : targetTabset,
                dropPosition === "top" ? targetTabset : newTabset,
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
        onModelChange({
          ...model,
          layout: cleanedLayout,
          metadata: model.metadata,
        });
      }

      setDraggedTab(null);
      setDragOverTabset(null);
    },
    [model, onModelChange, dropPosition, dropTargetIndex]
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
