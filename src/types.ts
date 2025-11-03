export interface LayoutNode {
  id: string;
  type: "tabset" | "tab" | "row" | "column";
  children?: LayoutNode[];
  component?: string;
  name?: string;
  width?: number; // percentage
  height?: number; // percentage
  flex?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  config?: Record<string, any>;
  selected?: number; // for tabsets, which tab is selected
  enableClose?: boolean;
  enableDrag?: boolean;
  enableResize?: boolean;
}

export type Direction = "ltr" | "rtl";

export interface LayoutModel {
  global: {
    enableClose?: boolean;
    enableDrag?: boolean;
    enableResize?: boolean;
    splitterSize?: number;
    tabOverlapLength?: number;
    direction?: Direction;
  };
  layout: LayoutNode;
}

export interface LayoutProps {
  model: LayoutModel;
  factory: (node: LayoutNode) => React.ReactNode;
  onModelChange?: (model: LayoutModel) => void;
  onAction?: (action: LayoutAction) => void;
  className?: string;
  style?: React.CSSProperties;
  storage?: {
    enabled?: boolean;
    key?: string;
    autoSave?: boolean;
    debounceMs?: number;
  };
  splitterStyles?: {
    default?: React.CSSProperties;
    hover?: React.CSSProperties;
    active?: React.CSSProperties;
  };
}

export interface SelectTabPayload {
  nodeId: string;
  tabIndex: number;
}

export interface CloseTabsetPayload {
  nodeId: string;
}

export interface ChangeDirectionPayload {
  direction: Direction;
}

export interface LayoutAction {
  type:
    | "addNode"
    | "removeNode"
    | "moveNode"
    | "resizeNode"
    | "selectTab"
    | "closeTabset"
    | "changeDirection";
  payload: SelectTabPayload | unknown;
}

export interface ResizeData {
  nodeId: string;
  width?: number;
  height?: number;
}

export type DropPosition = "center" | "left" | "right" | "top" | "bottom";

export interface DragData {
  nodeId: string;
  targetNodeId?: string;
  position?: DropPosition;
}

export interface TabProps {
  node: LayoutNode;
  index?: number;
  onClose?: (nodeId: string) => void;
  onSelect?: (nodeId: string) => void;
  onDragStart?: (nodeId: string, index?: number) => void;
  onDragEnd?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface TabSetProps {
  node: LayoutNode;
  children?: React.ReactNode;
  factory?: (node: LayoutNode) => React.ReactNode;
  onTabSelect?: (nodeId: string, tabIndex: number) => void;
  onTabClose?: (nodeId: string, tabIndex: number) => void;
  onTabDragStart?: (nodeId: string, tabIndex: number) => void;
  onTabDragEnd?: () => void;
  onDragOver?: (
    e: React.DragEvent,
    tabsetId: string,
    position?: DropPosition
  ) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, tabsetId: string) => void;
  dragOverTabset?: string | null;
  dropPosition?: DropPosition;
  direction?: Direction;
  className?: string;
  style?: React.CSSProperties;
}

export interface SplitterProps {
  direction: "horizontal" | "vertical";
  onResize: (delta: number) => void;
  onResizeStart?: () => void;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  customStyles?: {
    default?: React.CSSProperties;
    hover?: React.CSSProperties;
    active?: React.CSSProperties;
  };
}
