import { useCallback, useRef } from "react";
import { LayoutNode, LayoutModel } from "../types";
import { updateNodeById } from "../utils/layoutUtils";

export const useLayoutResize = (
  model: LayoutModel,
  onModelChange?: (model: LayoutModel) => void
) => {
  // Track initial flex values when resize starts
  const initialFlexRef = useRef<{
    [key: string]: { current: number; sibling: number };
  }>({});

  const handleResize = useCallback(
    (nodeId: string, delta: number, direction: "horizontal" | "vertical") => {
      if (!onModelChange) return;

      // Find the parent node
      const parent = findParentNode(model.layout, nodeId);
      if (!parent || !parent.children) return;

      // Find the index of the current node and its sibling
      const currentIndex = parent.children.findIndex(
        (child) => child.id === nodeId
      );
      const siblingIndex = currentIndex + 1;

      if (siblingIndex >= parent.children.length) return;

      const resizeKey = `${nodeId}-${direction}`;

      // Initialize or get initial flex values
      if (!initialFlexRef.current[resizeKey]) {
        const currentChild = parent.children[currentIndex];
        const siblingChild = parent.children[siblingIndex];
        initialFlexRef.current[resizeKey] = {
          current: currentChild.flex || 1,
          sibling: siblingChild.flex || 1,
        };
      }

      const initialFlex = initialFlexRef.current[resizeKey];
      const totalFlex = initialFlex.current + initialFlex.sibling;

      // Use reference container size for pixel conversion
      const refContainerSize =
        direction === "horizontal" ? window.innerWidth : window.innerHeight;

      // Calculate initial pixel sizes
      const initialCurrentPixels =
        (initialFlex.current / totalFlex) * refContainerSize;
      const initialSiblingPixels =
        (initialFlex.sibling / totalFlex) * refContainerSize;

      // Apply delta to get new pixel sizes
      const minSize = 100;
      let newCurrentPixels = initialCurrentPixels + delta;
      let newSiblingPixels = initialSiblingPixels - delta;

      // Enforce minimum constraints
      if (newCurrentPixels < minSize) {
        const excess = minSize - newCurrentPixels;
        newCurrentPixels = minSize;
        newSiblingPixels -= excess;
      }
      if (newSiblingPixels < minSize) {
        const excess = minSize - newSiblingPixels;
        newSiblingPixels = minSize;
        newCurrentPixels -= excess;
      }

      // Convert back to flex values
      const newTotalPixels = newCurrentPixels + newSiblingPixels;
      if (newTotalPixels > 0) {
        const newCurrentFlex = (newCurrentPixels / newTotalPixels) * totalFlex;
        const newSiblingFlex = (newSiblingPixels / newTotalPixels) * totalFlex;

        // Update the model
        const updatedLayout = updateNodeById(model.layout, parent.id, {
          children: parent.children.map((child, index) => {
            if (index === currentIndex) {
              return { ...child, flex: newCurrentFlex };
            }
            if (index === siblingIndex) {
              return { ...child, flex: newSiblingFlex };
            }
            return child;
          }),
        });

        if (updatedLayout) {
          onModelChange({
            ...model,
            layout: updatedLayout,
          });
        }
      }
    },
    [model, onModelChange]
  );

  // Reset initial flex tracking when drag ends
  const resetResize = useCallback(
    (nodeId: string, direction: "horizontal" | "vertical") => {
      const resizeKey = `${nodeId}-${direction}`;
      delete initialFlexRef.current[resizeKey];
    },
    []
  );

  return { handleResize, resetResize };
};

// Helper function to find parent node
const findParentNode = (
  node: LayoutNode,
  childId: string
): LayoutNode | null => {
  if (!node.children) return null;

  for (const child of node.children) {
    if (child.id === childId) {
      return node;
    }
    const found = findParentNode(child, childId);
    if (found) return found;
  }

  return null;
};
