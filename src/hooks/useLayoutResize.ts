import { useCallback } from "react";
import { LayoutNode, LayoutModel } from "../types";
import { updateNodeById } from "../utils/layoutUtils";

export const useLayoutResize = (
  model: LayoutModel,
  onModelChange?: (model: LayoutModel) => void
) => {
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

      const currentChild = parent.children[currentIndex];
      const siblingChild = parent.children[siblingIndex];

      // Calculate new flex values based on delta
      const containerSize =
        direction === "horizontal" ? window.innerWidth : window.innerHeight;

      // Get current flex values
      const currentFlex = currentChild.flex || 1;
      const siblingFlex = siblingChild.flex || 1;
      const totalFlex = currentFlex + siblingFlex;

      // Convert current flex values to pixel equivalents
      const currentPixels = (currentFlex / totalFlex) * containerSize;
      const siblingPixels = (siblingFlex / totalFlex) * containerSize;

      // Apply delta to current panel with minimum constraints
      const minSize = 100; // Minimum 100px
      const newCurrentPixels = Math.max(minSize, currentPixels + delta);
      const newSiblingPixels = Math.max(minSize, siblingPixels - delta);

      // Convert back to flex values
      const newTotalPixels = newCurrentPixels + newSiblingPixels;
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

      onModelChange({
        ...model,
        layout: updatedLayout,
      });
    },
    [model, onModelChange]
  );

  return { handleResize };
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
