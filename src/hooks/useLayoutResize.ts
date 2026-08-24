import { useCallback, useRef, useEffect } from "react";
import { LayoutNode, LayoutModel } from "../types";
import { updateNodeById, findParentNodeCached } from "../utils/layoutUtils";

const DEFAULT_MIN_SIZE = 100;

type ResizeSnapshot = {
  currentFlex: number;
  siblingFlex: number;
  currentPx: number;
  siblingPx: number;
  minCurrent: number;
  minSibling: number;
  maxCurrent: number;
  maxSibling: number;
};

export const useLayoutResize = (
  model: LayoutModel,
  onModelChange?: (model: LayoutModel) => void,
  parentIndex?: Map<string, LayoutNode>
) => {
  const initialRef = useRef<{ [key: string]: ResizeSnapshot }>({});
  const lastAppliedRef = useRef<{
    [key: string]: { current: number; sibling: number } | undefined;
  }>({});
  const modelRef = useRef<LayoutModel>(model);
  const onModelChangeRef = useRef(onModelChange);

  useEffect(() => {
    modelRef.current = model;
  }, [model]);

  useEffect(() => {
    onModelChangeRef.current = onModelChange;
  }, [onModelChange]);

  const parentIndexRef = useRef(parentIndex);
  useEffect(() => {
    parentIndexRef.current = parentIndex;
  }, [parentIndex]);

  const handleResize = useCallback(
    (
      nodeId: string,
      delta: number,
      direction: "horizontal" | "vertical",
      pairSize?: number
    ) => {
      if (!onModelChangeRef.current) return;

      const currentModel = modelRef.current;
      const parent =
        (parentIndexRef.current &&
          findParentNodeCached(parentIndexRef.current, nodeId)) ??
        findParentNode(currentModel.layout, nodeId);
      if (!parent || !parent.children) return;

      const currentIndex = parent.children.findIndex(
        (child) => child.id === nodeId
      );
      const siblingIndex = currentIndex + 1;

      if (siblingIndex >= parent.children.length) return;

      const resizeKey = `${nodeId}-${direction}`;
      const currentChild = parent.children[currentIndex];
      const siblingChild = parent.children[siblingIndex];
      const isHorizontal = direction === "horizontal";

      if (!initialRef.current[resizeKey]) {
        const currentFlex = currentChild.flex || 1;
        const siblingFlex = siblingChild.flex || 1;
        const totalFlex = currentFlex + siblingFlex;
        const measured = resolvePairPixels(
          currentChild.id,
          siblingChild.id,
          parent,
          direction,
          currentFlex,
          siblingFlex,
          totalFlex,
          pairSize
        );
        if (!measured) return;

        initialRef.current[resizeKey] = {
          currentFlex,
          siblingFlex,
          currentPx: measured.currentPx,
          siblingPx: measured.siblingPx,
          minCurrent: axisMin(currentChild, isHorizontal),
          minSibling: axisMin(siblingChild, isHorizontal),
          maxCurrent: axisMax(currentChild, isHorizontal),
          maxSibling: axisMax(siblingChild, isHorizontal),
        };
      }

      const initial = initialRef.current[resizeKey];
      const totalFlex = initial.currentFlex + initial.siblingFlex;

      let newCurrentPixels = initial.currentPx + delta;
      let newSiblingPixels = initial.siblingPx - delta;

      if (newCurrentPixels < initial.minCurrent) {
        const excess = initial.minCurrent - newCurrentPixels;
        newCurrentPixels = initial.minCurrent;
        newSiblingPixels -= excess;
      }
      if (newSiblingPixels < initial.minSibling) {
        const excess = initial.minSibling - newSiblingPixels;
        newSiblingPixels = initial.minSibling;
        newCurrentPixels -= excess;
      }
      if (
        initial.maxCurrent !== Number.POSITIVE_INFINITY &&
        newCurrentPixels > initial.maxCurrent
      ) {
        const excess = newCurrentPixels - initial.maxCurrent;
        newCurrentPixels = initial.maxCurrent;
        newSiblingPixels += excess;
      }
      if (
        initial.maxSibling !== Number.POSITIVE_INFINITY &&
        newSiblingPixels > initial.maxSibling
      ) {
        const excess = newSiblingPixels - initial.maxSibling;
        newSiblingPixels = initial.maxSibling;
        newCurrentPixels += excess;
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
        newChildren[currentIndex] = {
          ...newChildren[currentIndex],
          flex: newCurrentFlex,
        };
        newChildren[siblingIndex] = {
          ...newChildren[siblingIndex],
          flex: newSiblingFlex,
        };

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
    []
  );

  const resetResize = useCallback(
    (nodeId: string, direction: "horizontal" | "vertical") => {
      const resizeKey = `${nodeId}-${direction}`;
      delete initialRef.current[resizeKey];
      delete lastAppliedRef.current[resizeKey];
    },
    []
  );

  return { handleResize, resetResize };
};

const axisMin = (node: LayoutNode, isHorizontal: boolean): number => {
  const value = isHorizontal ? node.minWidth : node.minHeight;
  return value ?? DEFAULT_MIN_SIZE;
};

const axisMax = (node: LayoutNode, isHorizontal: boolean): number => {
  const value = isHorizontal ? node.maxWidth : node.maxHeight;
  return value ?? Number.POSITIVE_INFINITY;
};

const measureNodePx = (
  id: string,
  direction: "horizontal" | "vertical"
): number => {
  if (typeof document === "undefined") return 0;
  const el = document.querySelector(`[data-layout-id="${id}"]`);
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  return direction === "horizontal" ? rect.width : rect.height;
};

const resolvePairPixels = (
  currentId: string,
  siblingId: string,
  parent: LayoutNode,
  direction: "horizontal" | "vertical",
  currentFlex: number,
  siblingFlex: number,
  pairFlex: number,
  pairSize?: number
): { currentPx: number; siblingPx: number } | null => {
  if (pairSize && pairSize > 0) {
    return {
      currentPx: (currentFlex / pairFlex) * pairSize,
      siblingPx: (siblingFlex / pairFlex) * pairSize,
    };
  }

  const currentPx = measureNodePx(currentId, direction);
  const siblingPx = measureNodePx(siblingId, direction);
  if (currentPx > 0 && siblingPx > 0) {
    return { currentPx, siblingPx };
  }

  const parentPx = measureNodePx(parent.id, direction);
  if (parentPx <= 0 || !parent.children || pairFlex <= 0) return null;

  const parentFlex = parent.children.reduce(
    (sum, child) => sum + (child.flex || 1),
    0
  );
  if (parentFlex <= 0) return null;

  const allocated = parentPx * (pairFlex / parentFlex);
  return {
    currentPx: (currentFlex / pairFlex) * allocated,
    siblingPx: (siblingFlex / pairFlex) * allocated,
  };
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
