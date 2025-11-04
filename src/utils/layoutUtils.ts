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

  for (const child of root.children) {
    if (child.id === childId) {
      return root;
    }
  }

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
      return null;
    }
    const hasChanges = Object.keys(updates).some(
      (key) => (node as any)[key] !== (updates as any)[key]
    );
    if (!hasChanges) {
      return node;
    }
    return { ...node, ...updates };
  }

  if (node.children) {
    let hasChildChanges = false;
    const updatedChildren = node.children
      .map((child) => {
        const updated = updateNodeById(child, id, updates);
        if (updated !== child) {
          hasChildChanges = true;
        }
        return updated;
      })
      .filter((child): child is LayoutNode => child !== null);

    if (!hasChildChanges) {
      return node;
    }

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

export const removeEmptyTabsets = (node: LayoutNode): LayoutNode | null => {
  if (
    node.type === "tabset" &&
    (!node.children || node.children.length === 0)
  ) {
    return null;
  }

  if (node.children) {
    const originalChildrenCount = node.children.length;
    const processedChildren = node.children
      .map(removeEmptyTabsets)
      .filter((child): child is LayoutNode => child !== null);

    const childrenWereRemoved =
      processedChildren.length < originalChildrenCount;

    if (processedChildren.length === 0) {
      return null;
    }

    if (
      (node.type === "row" || node.type === "column") &&
      processedChildren.length > 0
    ) {
      const totalFlex = processedChildren.reduce(
        (sum, child) => sum + (child.flex || 0),
        0
      );

      const mustNormalize =
        childrenWereRemoved ||
        totalFlex < 0.999 ||
        processedChildren.length === 1;

      if (mustNormalize) {
        let updatedChildren: LayoutNode[];

        if (processedChildren.length === 1) {
          updatedChildren = processedChildren.map((child) => ({
            ...child,
            flex: 1,
          }));
        } else if (totalFlex === 0 || totalFlex < 0.001) {
          const equalFlex = 1 / processedChildren.length;
          updatedChildren = processedChildren.map((child) => ({
            ...child,
            flex: equalFlex,
          }));
        } else {
          const scaleFactor = 1 / totalFlex;
          updatedChildren = processedChildren.map((child) => ({
            ...child,
            flex: (child.flex || 0) * scaleFactor,
          }));
        }

        return {
          ...node,
          children: updatedChildren,
        };
      }

      if (
        processedChildren.length !== originalChildrenCount ||
        processedChildren.some(
          (child, index) => child !== node.children?.[index]
        )
      ) {
        return {
          ...node,
          children: processedChildren,
        };
      }
    }

    if (processedChildren !== node.children) {
      return {
        ...node,
        children: processedChildren,
      };
    }
  }

  return node;
};
