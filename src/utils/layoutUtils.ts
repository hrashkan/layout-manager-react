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
    let newChildren: LayoutNode[] | null = null;
    const children = node.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const updated = updateNodeById(child, id, updates);
      if (updated !== child) {
        if (newChildren === null) {
          newChildren = children.slice(0, i);
        }
      }
      if (newChildren !== null && updated !== null) {
        newChildren.push(updated);
      }
    }

    if (newChildren === null) {
      return node;
    }

    return {
      ...node,
      children: newChildren,
    };
  }

  return node;
};

export const removeNodeById = (node: LayoutNode, id: string): LayoutNode => {
  if (!node.children) {
    return node;
  }

  let newChildren: LayoutNode[] | null = null;
  const children = node.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.id === id) {
      if (newChildren === null) newChildren = children.slice(0, i);
      continue;
    }
    const updated = removeNodeById(child, id);
    if (updated !== child) {
      if (newChildren === null) newChildren = children.slice(0, i);
    }
    if (newChildren !== null) newChildren.push(updated);
  }

  if (newChildren === null) {
    return node;
  }

  return {
    ...node,
    children: newChildren,
  };
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
    const originalChildren = node.children;
    const originalChildrenCount = originalChildren.length;
    let processedChildren: LayoutNode[] | null = null;

    for (let i = 0; i < originalChildren.length; i++) {
      const child = originalChildren[i];
      const processed = removeEmptyTabsets(child);
      if (processed !== child) {
        if (processedChildren === null) {
          processedChildren = originalChildren.slice(0, i) as LayoutNode[];
        }
      }
      if (processedChildren !== null && processed !== null) {
        processedChildren.push(processed);
      }
    }

    const finalChildren = processedChildren ?? originalChildren;

    const childrenWereRemoved = finalChildren.length < originalChildrenCount;

    if (finalChildren.length === 0) {
      return null;
    }

    if (
      (node.type === "row" || node.type === "column") &&
      finalChildren.length > 0
    ) {
      const totalFlex = finalChildren.reduce(
        (sum, child) => sum + (child.flex || 0),
        0
      );

      const mustNormalize =
        childrenWereRemoved || totalFlex < 0.999 || finalChildren.length === 1;

      if (mustNormalize) {
        let updatedChildren: LayoutNode[];

        if (finalChildren.length === 1) {
          updatedChildren = finalChildren.map((child) => ({
            ...child,
            flex: 1,
          }));
        } else if (totalFlex === 0 || totalFlex < 0.001) {
          const equalFlex = 1 / finalChildren.length;
          updatedChildren = finalChildren.map((child) => ({
            ...child,
            flex: equalFlex,
          }));
        } else {
          const scaleFactor = 1 / totalFlex;
          updatedChildren = finalChildren.map((child) => ({
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
        finalChildren.length !== originalChildrenCount ||
        finalChildren.some((child, index) => child !== originalChildren[index])
      ) {
        return {
          ...node,
          children: finalChildren,
        };
      }
    }

    if (processedChildren !== null) {
      return {
        ...node,
        children: finalChildren,
      };
    }
  }

  return node;
};

export interface ComponentRestoreData {
  tabId: string;
  component: string;
  name: string;
  tabsetId: string;
  tabIndex?: number;
  config?: Record<string, any>;
}

const findParentContainer = (
  root: LayoutNode,
  childId: string,
  parent: LayoutNode | null = null
): LayoutNode | null => {
  if (!root.children) return null;

  for (const child of root.children) {
    if (child.id === childId) {
      return parent || root;
    }
    if (child.children) {
      const found = findParentContainer(child, childId, root);
      if (found) return found;
    }
  }
  return null;
};

const findParentTabset = (
  root: LayoutNode,
  tabId: string
): LayoutNode | null => {
  if (!root.children) return null;

  for (const child of root.children) {
    if (child.type === "tabset" && child.children) {
      const tab = child.children.find((c) => c.id === tabId);
      if (tab) {
        return child;
      }
    }
    if (child.children) {
      const found = findParentTabset(child, tabId);
      if (found) return found;
    }
  }
  return null;
};

export const addTabToTabset = (
  layout: LayoutNode,
  tabsetId: string,
  tab: LayoutNode
): LayoutNode | null => {
  const tabset = findNodeById(layout, tabsetId);
  if (!tabset || tabset.type !== "tabset") {
    return null;
  }

  const existingChildren = tabset.children || [];
  const updatedChildren = [...existingChildren, tab];

  const updatedTabset = {
    ...tabset,
    children: updatedChildren,
    selected: updatedChildren.length - 1,
  };

  return updateNodeById(layout, tabsetId, updatedTabset);
};

export const removeTab = (
  layout: LayoutNode,
  tabId: string
): { layout: LayoutNode | null; restoreData: ComponentRestoreData | null } => {
  const parentTabset = findParentTabset(layout, tabId);

  if (!parentTabset || parentTabset.type !== "tabset") {
    return { layout, restoreData: null };
  }

  const tab = parentTabset.children?.find((child) => child.id === tabId);
  if (!tab || tab.type !== "tab") {
    return { layout, restoreData: null };
  }

  const tabIndex = parentTabset.children?.findIndex(
    (child) => child.id === tabId
  );

  const updatedChildren = parentTabset.children?.filter(
    (child) => child.id !== tabId
  );

  if (!updatedChildren || updatedChildren.length === 0) {
    const newLayout = removeNodeById(layout, parentTabset.id);
    const restoreData = {
      tabId: tab.id,
      component: tab.component || "",
      name: tab.name || "",
      tabsetId: parentTabset.id,
      tabIndex: tabIndex !== undefined ? tabIndex : 0,
      config: tab.config,
    };
    return {
      layout: newLayout,
      restoreData,
    };
  }

  const currentSelected = parentTabset.selected ?? 0;
  let newSelected = currentSelected;
  if (tabIndex !== undefined && tabIndex !== -1) {
    if (tabIndex <= currentSelected) {
      newSelected = Math.max(0, currentSelected - 1);
    }
    newSelected = Math.min(newSelected, updatedChildren.length - 1);
  }

  const updatedTabset = {
    ...parentTabset,
    children: updatedChildren,
    selected: updatedChildren.length > 0 ? newSelected : undefined,
  };

  const newLayout = updateNodeById(layout, parentTabset.id, updatedTabset);
  const restoreData = {
    tabId: tab.id,
    component: tab.component || "",
    name: tab.name || "",
    tabsetId: parentTabset.id,
    tabIndex: tabIndex !== undefined ? tabIndex : 0,
    config: tab.config,
  };
  return {
    layout: newLayout,
    restoreData,
  };
};

export const restoreTab = (
  layout: LayoutNode,
  restoreData: ComponentRestoreData,
  initialLayout?: LayoutNode
): LayoutNode | null => {
  const existingTab = findNodeById(layout, restoreData.tabId);
  if (existingTab) {
    return layout;
  }

  let tabsetNode = findNodeById(layout, restoreData.tabsetId);

  if (!tabsetNode || tabsetNode.type !== "tabset") {
    if (!initialLayout) {
      return null;
    }

    const parentInInitial = findParentContainer(
      initialLayout,
      restoreData.tabsetId
    );

    if (!parentInInitial) {
      return null;
    }

    const parentInCurrent = findNodeById(layout, parentInInitial.id);

    if (!parentInCurrent || !parentInCurrent.children) {
      return null;
    }

    const existingTabset = parentInCurrent.children.find(
      (child) => child.id === restoreData.tabsetId
    );
    if (existingTabset) {
      tabsetNode = existingTabset;
    } else {
      const newTabset = createTabSet(restoreData.tabsetId, []);

      const updatedParentChildren = [...parentInCurrent.children, newTabset];
      const updatedParent = {
        ...parentInCurrent,
        children: updatedParentChildren,
      };

      const updatedLayout = updateNodeById(
        layout,
        parentInCurrent.id,
        updatedParent
      );

      if (!updatedLayout) {
        return null;
      }

      layout = updatedLayout;
      tabsetNode = findNodeById(layout, restoreData.tabsetId);

      if (!tabsetNode || tabsetNode.type !== "tabset") {
        return null;
      }
    }
  }

  const tab = createTab(
    restoreData.tabId,
    restoreData.component,
    restoreData.name,
    restoreData.config
  );

  const result = addTabToTabset(layout, restoreData.tabsetId, tab);

  return result;
};

export const tabExists = (layout: LayoutNode, tabId: string): boolean => {
  return findNodeById(layout, tabId) !== null;
};
