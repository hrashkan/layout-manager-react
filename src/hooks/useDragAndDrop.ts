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

  // Use ref to avoid stale closure issues
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
  }, []);

  const handleDragOver = useCallback(
    (
      e: React.DragEvent,
      tabsetId: string,
      position: DropPosition = "center"
    ) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverTabset(tabsetId);
      setDropPosition(position);
    },
    []
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    // Only clear if we're actually leaving the tabset container, not just moving between child elements
    if (e.currentTarget === e.target) {
      setTimeout(() => {
        setDragOverTabset(null);
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

      // Don't drop on the same tabset
      if (sourceTabsetId === targetTabsetId) {
        return;
      }

      // Find source and target tabsets
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

      // Get the tab to move
      const tabToMove = sourceTabset.children[tabIndex];
      if (!tabToMove) {
        return;
      }

      // Create new layout
      let updatedLayout = model.layout;

      // Remove tab from source tabset
      const updatedSourceChildren = sourceTabset.children.filter(
        (_, index) => index !== tabIndex
      );

      // Update source tabset with remaining children (even if empty)
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

      // Handle different drop positions
      if (dropPosition === "center") {
        // Add tab to existing target tabset
        const newTab = { ...tabToMove, id: `${tabToMove.id}-${Date.now()}` };
        const updatedTargetLayout = updateNodeById(
          updatedLayout,
          targetTabsetId,
          {
            children: [...(targetTabset.children || []), newTab],
            selected: targetTabset.children?.length || 0,
          }
        );
        if (!updatedTargetLayout) return;
        updatedLayout = updatedTargetLayout;
      } else {
        // Create new tabset and split the layout
        const newTab = { ...tabToMove, id: `${tabToMove.id}-${Date.now()}` };
        const newTabset = createTabSet(
          `${targetTabsetId}-split-${Date.now()}`,
          [newTab]
        );

        // Find the parent of the target tabset
        const parent = findParentNode(updatedLayout, targetTabsetId);
        if (parent) {
          const targetIndex =
            parent.children?.findIndex(
              (child) => child.id === targetTabsetId
            ) || 0;

          if (dropPosition === "left" || dropPosition === "right") {
            // Create horizontal split
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
            // Create vertical split
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

      // Clean up empty tabsets immediately
      const cleanedLayout = removeEmptyTabsets(updatedLayout);

      // Update the model with cleaned layout (only if not null)
      if (cleanedLayout) {
        onModelChange({
          ...model,
          layout: cleanedLayout,
        });
      }

      // Clear drag state
      setDraggedTab(null);
      setDragOverTabset(null);
    },
    [model, onModelChange, dropPosition]
  );

  return {
    draggedTab,
    dragOverTabset,
    dropPosition,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
