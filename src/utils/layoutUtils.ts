import { LayoutNode, LayoutModel } from "../types";

export const createLayoutModel = (layout: LayoutNode): LayoutModel => ({
  global: {
    enableClose: true,
    enableDrag: true,
    enableResize: true,
    splitterSize: 8,
    tabOverlapLength: 0,
  },
  layout,
});

export const createTab = (
  id: string,
  component: string,
  name: string,
  config?: Record<string, any>
): LayoutNode => ({
  id,
  type: "tab",
  component,
  name,
  config,
  enableClose: true,
  enableDrag: true,
});

export const createTabSet = (
  id: string,
  children: LayoutNode[],
  selected: number = 0
): LayoutNode => ({
  id,
  type: "tabset",
  children,
  selected,
  enableClose: true,
  enableDrag: true,
});

export const createRow = (
  id: string,
  children: LayoutNode[],
  width?: number,
  height?: number
): LayoutNode => ({
  id,
  type: "row",
  children: calculateFlexValues(children),
  width,
  height,
  enableResize: true,
});

export const createColumn = (
  id: string,
  children: LayoutNode[],
  width?: number,
  height?: number
): LayoutNode => ({
  id,
  type: "column",
  children: calculateFlexValues(children),
  width,
  height,
  enableResize: true,
});

export const findNodeById = (
  node: LayoutNode,
  id: string
): LayoutNode | null => {
  if (node.id === id) {
    return node;
  }

  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) {
        return found;
      }
    }
  }

  return null;
};

export const findParentNode = (
  root: LayoutNode,
  childId: string
): LayoutNode | null => {
  if (!root.children) {
    return null;
  }

  // Check if any direct child matches
  for (const child of root.children) {
    if (child.id === childId) {
      return root;
    }
  }

  // Recursively search in children
  for (const child of root.children) {
    const found = findParentNode(child, childId);
    if (found) {
      return found;
    }
  }

  return null;
};

export const removeEmptyTabsets = (node: LayoutNode): LayoutNode => {
  if (!node.children) {
    return node;
  }

  // Filter out empty tabsets and recursively clean children
  const cleanedChildren = node.children
    .map((child) => removeEmptyTabsets(child))
    .filter((child) => {
      if (child === null) return false;
      if (child.type === "tabset") {
        // Keep tabset only if it has children (tabs)
        return child.children && child.children.length > 0;
      }
      if (child.type === "row" || child.type === "column") {
        // Keep row/column only if it has children
        return child.children && child.children.length > 0;
      }
      return true;
    });

  // If this is a row or column and has no children left, return null to indicate removal
  if (
    (node.type === "row" || node.type === "column") &&
    cleanedChildren.length === 0
  ) {
    return null as any; // This will be filtered out by the parent
  }

  // If this is a row or column and has only one child left, promote that child
  if (
    (node.type === "row" || node.type === "column") &&
    cleanedChildren.length === 1
  ) {
    const singleChild = cleanedChildren[0];
    return {
      ...singleChild,
      id: node.id, // Keep the parent's ID to maintain references
    };
  }

  // Recalculate flex values for remaining children
  const updatedChildren = calculateFlexValues(cleanedChildren);

  return {
    ...node,
    children: updatedChildren,
  };
};

export const updateNodeById = (
  node: LayoutNode,
  id: string,
  updates: Partial<LayoutNode>
): LayoutNode => {
  if (node.id === id) {
    return { ...node, ...updates };
  }

  if (node.children) {
    return {
      ...node,
      children: node.children.map((child) =>
        updateNodeById(child, id, updates)
      ),
    };
  }

  return node;
};

export const removeNodeById = (node: LayoutNode, id: string): LayoutNode => {
  if (node.children) {
    const filteredChildren = node.children
      .filter((child) => child.id !== id)
      .map((child) => removeNodeById(child, id));

    return {
      ...node,
      children: filteredChildren,
    };
  }

  return node;
};

export const calculateFlexValues = (children: LayoutNode[]): LayoutNode[] => {
  return children.map((child) => ({
    ...child,
    flex: child.flex || 1 / children.length,
  }));
};
