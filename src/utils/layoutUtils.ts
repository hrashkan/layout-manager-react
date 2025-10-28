import { LayoutNode, LayoutModel } from "../types";

export const createLayoutModel = (
  layout: LayoutNode,
  global?: Partial<LayoutModel["global"]>
): LayoutModel => ({
  global: {
    enableClose: true,
    enableDrag: true,
    enableResize: true,
    splitterSize: 8,
    tabOverlapLength: 0,
    direction: "ltr",
    ...global,
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

export const updateNodeById = (
  node: LayoutNode,
  id: string,
  updates: Partial<LayoutNode> | null
): LayoutNode | null => {
  if (node.id === id) {
    if (updates === null) {
      return null; // Remove the node
    }
    return { ...node, ...updates };
  }

  if (node.children) {
    const updatedChildren = node.children
      .map((child) => updateNodeById(child, id, updates))
      .filter((child): child is LayoutNode => child !== null);

    return {
      ...node,
      children: updatedChildren,
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

/**
 * Removes empty tabsets and redistributes flex values to remaining children
 */
export const removeEmptyTabsets = (node: LayoutNode): LayoutNode | null => {
  // If this is a tabset with no children, remove it
  if (
    node.type === "tabset" &&
    (!node.children || node.children.length === 0)
  ) {
    return null;
  }

  // If this is a tabset with only one child, promote the child
  if (node.type === "tabset" && node.children && node.children.length === 1) {
    const child = node.children[0];
    return {
      ...child,
      flex: node.flex || 1, // Inherit the parent's flex value
    };
  }

  // Process children recursively
  if (node.children) {
    const processedChildren = node.children
      .map(removeEmptyTabsets)
      .filter((child): child is LayoutNode => child !== null);

    // If no children left, remove this node
    if (processedChildren.length === 0) {
      return null;
    }

    // If only one child left, promote it
    if (processedChildren.length === 1) {
      return {
        ...processedChildren[0],
        flex: node.flex || 1,
      };
    }

    // Redistribute flex values equally among remaining children
    const equalFlex = 1 / processedChildren.length;
    const updatedChildren = processedChildren.map((child) => ({
      ...child,
      flex: equalFlex,
    }));

    return {
      ...node,
      children: updatedChildren,
    };
  }

  return node;
};
