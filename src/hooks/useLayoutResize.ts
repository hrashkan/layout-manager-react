import { useCallback, useRef, useEffect } from "react";
import { LayoutNode, LayoutModel } from "../types";
import { updateNodeById } from "../utils/layoutUtils";

export const useLayoutResize = (
  model: LayoutModel,
  onModelChange?: (model: LayoutModel) => void
) => {
  const initialFlexRef = useRef<{
    [key: string]: { current: number; sibling: number };
  }>({});
  const lastAppliedRef = useRef<{
    [key: string]: { current: number; sibling: number } | undefined;
  }>({});
  const modelRef = useRef<LayoutModel>(model);
  const onModelChangeRef = useRef(onModelChange);

  // Keep refs up to date
  useEffect(() => {
    modelRef.current = model;
  }, [model]);

  useEffect(() => {
    onModelChangeRef.current = onModelChange;
  }, [onModelChange]);

  const handleResize = useCallback(
    (nodeId: string, delta: number, direction: "horizontal" | "vertical") => {
      if (!onModelChangeRef.current) return;

      const currentModel = modelRef.current;
      const parent = findParentNode(currentModel.layout, nodeId);
      if (!parent || !parent.children) return;

      const currentIndex = parent.children.findIndex(
        (child) => child.id === nodeId
      );
      const siblingIndex = currentIndex + 1;

      if (siblingIndex >= parent.children.length) return;

      const resizeKey = `${nodeId}-${direction}`;

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

      const refContainerSize =
        direction === "horizontal" ? window.innerWidth : window.innerHeight;

      const initialCurrentPixels =
        (initialFlex.current / totalFlex) * refContainerSize;
      const initialSiblingPixels =
        (initialFlex.sibling / totalFlex) * refContainerSize;

      const minSize = 100;
      let newCurrentPixels = initialCurrentPixels + delta;
      let newSiblingPixels = initialSiblingPixels - delta;

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

      const newTotalPixels = newCurrentPixels + newSiblingPixels;
      if (newTotalPixels > 0) {
        const newCurrentFlex = (newCurrentPixels / newTotalPixels) * totalFlex;
        const newSiblingFlex = (newSiblingPixels / newTotalPixels) * totalFlex;

        const prevApplied = lastAppliedRef.current[resizeKey];
        const EPS = 0.0001;
        if (
          prevApplied &&
          Math.abs(prevApplied.current - newCurrentFlex) < EPS &&
          Math.abs(prevApplied.sibling - newSiblingFlex) < EPS
        ) {
          return;
        }

        const newChildren = parent.children.slice();
        const currentChild = newChildren[currentIndex];
        const siblingChild = newChildren[siblingIndex];
        newChildren[currentIndex] = { ...currentChild, flex: newCurrentFlex };
        newChildren[siblingIndex] = { ...siblingChild, flex: newSiblingFlex };

        const updatedLayout = updateNodeById(currentModel.layout, parent.id, {
          children: newChildren,
        });

        if (updatedLayout) {
          lastAppliedRef.current[resizeKey] = {
            current: newCurrentFlex,
            sibling: newSiblingFlex,
          };
          onModelChangeRef.current({
            ...currentModel,
            layout: updatedLayout,
          });
        }
      }
    },
    [] // Empty deps - stable reference, uses refs internally
  );

  const resetResize = useCallback(
    (nodeId: string, direction: "horizontal" | "vertical") => {
      const resizeKey = `${nodeId}-${direction}`;
      delete initialFlexRef.current[resizeKey];
      delete lastAppliedRef.current[resizeKey];
    },
    []
  );

  return { handleResize, resetResize };
};

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
