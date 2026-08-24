import { LayoutNode, LayoutModel } from "../types";

export const isCapabilityEnabled = (
  ...flags: Array<boolean | undefined>
): boolean => {
  for (let i = 0; i < flags.length; i++) {
    const flag = flags[i];
    if (flag !== undefined) {
      return flag;
    }
  }
  return true;
};

export const buildNodeIndexes = (
  root: LayoutNode
): {
  nodeIndex: Map<string, LayoutNode>;
  parentIndex: Map<string, LayoutNode>;
} => {
  const nodeIndex = new Map<string, LayoutNode>();
  const parentIndex = new Map<string, LayoutNode>();

  const traverse = (node: LayoutNode, parent: LayoutNode | null = null) => {
    nodeIndex.set(node.id, node);
    if (parent) {
      parentIndex.set(node.id, parent);
    }

    if (node.children) {
      for (const child of node.children) {
        traverse(child, node);
      }
    }
  };

  traverse(root);
  return { nodeIndex, parentIndex };
};

export const findNodeByIdCached = (
  nodeIndex: Map<string, LayoutNode>,
  id: string
): LayoutNode | null => {
  return nodeIndex.get(id) ?? null;
};

export const findParentNodeCached = (
  parentIndex: Map<string, LayoutNode>,
  childId: string
): LayoutNode | null => {
  return parentIndex.get(childId) ?? null;
};

export const createLayoutModel = (
  layout: LayoutNode,
  global?: Partial<LayoutModel["global"]>
): LayoutModel => ({
  global: {
    enableClose: true,
    enableDrag: true,
    enableResize: true,
    enableTabKeepAlive: true,
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
    const hasChanges = Object.keys(updates).some((key) => {
      const nodeKey = key as keyof LayoutNode;
      return node[nodeKey] !== updates[nodeKey];
    });
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

const getAncestorChain = (
  root: LayoutNode,
  nodeId: string
): LayoutNode[] | null => {
  if (root.id === nodeId) {
    return [root];
  }
  if (!root.children) return null;

  for (const child of root.children) {
    const sub = getAncestorChain(child, nodeId);
    if (sub) {
      return [root, ...sub];
    }
  }
  return null;
};

const cloneContainerShell = (node: LayoutNode): LayoutNode => ({
  id: node.id,
  type: node.type,
  children: [],
  width: node.width,
  height: node.height,
  flex: node.flex,
  minWidth: node.minWidth,
  minHeight: node.minHeight,
  maxWidth: node.maxWidth,
  maxHeight: node.maxHeight,
  selected: node.type === "tabset" ? 0 : node.selected,
  enableClose: node.enableClose,
  enableDrag: node.enableDrag,
  enableResize: node.enableResize,
  enableRenderOnDemand: node.enableRenderOnDemand,
});


const resolveSiblingInsertIndex = (
  initialSiblings: LayoutNode[],
  currentSiblings: LayoutNode[],
  targetId: string
): number => {
  const targetIndex = initialSiblings.findIndex((c) => c.id === targetId);
  if (targetIndex <= 0) return 0;

  let insertAt = 0;
  for (let i = 0; i < targetIndex; i++) {
    if (currentSiblings.some((c) => c.id === initialSiblings[i].id)) {
      insertAt += 1;
    }
  }
  return insertAt;
};

const insertChildIntoParent = (
  layout: LayoutNode,
  parentId: string,
  child: LayoutNode,
  insertIndex: number
): LayoutNode | null => {
  const parent = findNodeById(layout, parentId);
  if (!parent) return null;

  const children = [...(parent.children || [])];
  if (children.some((c) => c.id === child.id)) {
    return layout;
  }

  const index = Math.max(0, Math.min(insertIndex, children.length));
  children.splice(index, 0, child);

  const withFlex =
    parent.type === "row" || parent.type === "column"
      ? calculateFlexValues(children)
      : children;

  return updateNodeById(layout, parentId, {
    ...parent,
    children: withFlex,
  });
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
  tab: LayoutNode,
  tabIndex?: number
): LayoutNode | null => {
  const tabset = findNodeById(layout, tabsetId);
  if (!tabset || tabset.type !== "tabset") {
    return null;
  }

  const existingChildren = [...(tabset.children || [])];
  if (existingChildren.some((c) => c.id === tab.id)) {
    return layout;
  }

  const index =
    tabIndex === undefined
      ? existingChildren.length
      : Math.max(0, Math.min(tabIndex, existingChildren.length));
  existingChildren.splice(index, 0, tab);

  const updatedTabset = {
    ...tabset,
    children: existingChildren,
    selected: index,
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

  const restoreData: ComponentRestoreData = {
    tabId: tab.id,
    component: tab.component || "",
    name: tab.name || "",
    tabsetId: parentTabset.id,
    tabIndex: tabIndex !== undefined && tabIndex !== -1 ? tabIndex : 0,
    config: tab.config,
  };

  if (!updatedChildren || updatedChildren.length === 0) {
    const newLayout = removeNodeById(layout, parentTabset.id);
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
  return {
    layout: newLayout,
    restoreData,
  };
};


const ensureTabsetPath = (
  layout: LayoutNode,
  tabsetId: string,
  initialLayout: LayoutNode
): LayoutNode | null => {
  if (findNodeById(layout, tabsetId)?.type === "tabset") {
    return layout;
  }

  const chain = getAncestorChain(initialLayout, tabsetId);
  if (!chain || chain.length < 2) {
    return null;
  }

  let deepestExisting = -1;
  for (let i = chain.length - 1; i >= 0; i--) {
    if (findNodeById(layout, chain[i].id)) {
      deepestExisting = i;
      break;
    }
  }

  if (deepestExisting < 0) {
    return null;
  }

  let current = layout;
  for (let i = deepestExisting + 1; i < chain.length; i++) {
    const nodeTemplate = chain[i];
    const parentTemplate = chain[i - 1];
    const parentLive = findNodeById(current, parentTemplate.id);
    if (!parentLive) {
      return null;
    }

    if (findNodeById(current, nodeTemplate.id)) {
      continue;
    }

    const insertIndex = resolveSiblingInsertIndex(
      parentTemplate.children || [],
      parentLive.children || [],
      nodeTemplate.id
    );

    const shell = cloneContainerShell(nodeTemplate);
    const next = insertChildIntoParent(
      current,
      parentTemplate.id,
      shell,
      insertIndex
    );
    if (!next) {
      return null;
    }
    current = next;
  }

  return findNodeById(current, tabsetId)?.type === "tabset" ? current : null;
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

  let workingLayout = layout;
  let tabsetNode = findNodeById(workingLayout, restoreData.tabsetId);

  if (!tabsetNode || tabsetNode.type !== "tabset") {
    if (!initialLayout) {
      return null;
    }

    const ensured = ensureTabsetPath(
      workingLayout,
      restoreData.tabsetId,
      initialLayout
    );
    if (!ensured) {
      return null;
    }
    workingLayout = ensured;
    tabsetNode = findNodeById(workingLayout, restoreData.tabsetId);
    if (!tabsetNode || tabsetNode.type !== "tabset") {
      return null;
    }
  }

  const tab = createTab(
    restoreData.tabId,
    restoreData.component,
    restoreData.name,
    restoreData.config
  );

  return addTabToTabset(
    workingLayout,
    restoreData.tabsetId,
    tab,
    restoreData.tabIndex
  );
};

export const tabExists = (layout: LayoutNode, tabId: string): boolean => {
  return findNodeById(layout, tabId) !== null;
};
