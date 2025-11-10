import { useMemo, useRef, useEffect } from "react";
import { LayoutNode } from "../types";
import { buildNodeIndexes } from "../utils/layoutUtils";

/**
 * Hook that maintains cached node index maps for O(1) lookups
 * Rebuilds indexes when layout changes
 */
export const useNodeIndex = (root: LayoutNode) => {
  const indexesRef = useRef<{
    nodeIndex: Map<string, LayoutNode>;
    parentIndex: Map<string, LayoutNode>;
  } | null>(null);

  const rootRef = useRef<LayoutNode>(root);

  // Rebuild indexes when root changes
  const indexes = useMemo(() => {
    // Only rebuild if root actually changed (reference or structure)
    if (
      indexesRef.current === null ||
      rootRef.current !== root ||
      rootRef.current.id !== root.id
    ) {
      const newIndexes = buildNodeIndexes(root);
      indexesRef.current = newIndexes;
      rootRef.current = root;
      return newIndexes;
    }
    return indexesRef.current;
  }, [root]);

  // Keep ref in sync
  useEffect(() => {
    rootRef.current = root;
  }, [root]);

  return indexes;
};
