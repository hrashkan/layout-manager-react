import { useMemo } from "react";
import { LayoutNode } from "../types";
import { buildNodeIndexes } from "../utils/layoutUtils";

export const useNodeIndex = (root: LayoutNode) =>
  useMemo(() => buildNodeIndexes(root), [root]);
