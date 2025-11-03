import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  LayoutProps,
  LayoutRef,
  LayoutNode,
  LayoutAction,
  SelectTabPayload,
  CloseTabsetPayload,
  LayoutModel,
  Direction,
} from "../types";
import { TabSet } from "./TabSet";
import { Splitter } from "./Splitter";
import { useLayoutResize } from "../hooks/useLayoutResize";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useLayoutStorage } from "../hooks/useLayoutStorage";
import {
  updateNodeById,
  findNodeById,
  removeEmptyTabsets,
} from "../utils/layoutUtils";
import "./Layout.css";

export const Layout = forwardRef<LayoutRef, LayoutProps>(
  (
    {
      model,
      factory,
      onModelChange,
      onAction,
      className = "",
      style = {},
      storage,
    },
    ref
  ) => {
    const [internalModel, setInternalModel] = useState(model);
    const [pendingDirection, setPendingDirection] = useState<Direction | null>(
      null
    );

    const {
      model: storedModel,
      updateModel: updateStoredModel,
      isLoaded,
    } = useLayoutStorage(model, {
      key: storage?.key,
      autoSave: storage?.autoSave,
      debounceMs: storage?.debounceMs,
      onLoad: (loadedModel) => {
        if (onModelChange) {
          onModelChange(loadedModel);
        } else {
          setInternalModel(loadedModel);
        }
      },
    });

    const currentModel = storage?.enabled
      ? storedModel
      : onModelChange
      ? model
      : internalModel;
    const handleModelChange = useCallback(
      (newModel: LayoutModel) => {
        if (storage?.enabled) {
          updateStoredModel(newModel);
          if (onModelChange) {
            onModelChange(newModel);
          }
        } else {
          if (onModelChange) {
            onModelChange(newModel);
          } else {
            setInternalModel(newModel);
          }
        }
      },
      [onModelChange, storage?.enabled, updateStoredModel]
    );

    const { handleResize, resetResize } = useLayoutResize(
      currentModel,
      handleModelChange
    );
    const {
      dragOverTabset,
      dropPosition,
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragLeave,
      handleDrop,
    } = useDragAndDrop(currentModel, handleModelChange);

    const storedModelRef = useRef<LayoutModel>(storedModel);
    useEffect(() => {
      storedModelRef.current = storedModel;
    }, [storedModel]);

    const handleAction = useCallback(
      (action: LayoutAction) => {
        if (storage?.enabled) {
          const currentStoredModel = storedModelRef.current;

          if (action.type === "changeDirection") {
            const { direction: newDirection } = action.payload as {
              direction: Direction;
            };
            setPendingDirection(newDirection);
          }

          const updateModel = (prevModel: LayoutModel): LayoutModel => {
            switch (action.type) {
              case "selectTab":
                const { nodeId, tabIndex } = action.payload as SelectTabPayload;
                const selectResult = updateNodeById(prevModel.layout, nodeId, {
                  selected: tabIndex,
                });
                return {
                  ...prevModel,
                  layout: selectResult || prevModel.layout,
                };
              case "removeNode":
                const { nodeId: tabsetId, tabIndex: removeTabIndex } =
                  action.payload as { nodeId: string; tabIndex: number };
                const tabsetNode = findNodeById(prevModel.layout, tabsetId);
                if (tabsetNode && tabsetNode.children) {
                  const updatedChildren = tabsetNode.children.filter(
                    (_, index) => index !== removeTabIndex
                  );

                  const currentSelected = tabsetNode.selected ?? 0;
                  let newSelected = currentSelected;
                  if (removeTabIndex <= currentSelected) {
                    newSelected = Math.max(0, currentSelected - 1);
                  }
                  newSelected = Math.min(
                    newSelected,
                    updatedChildren.length - 1
                  );

                  const updatedTabset = {
                    ...tabsetNode,
                    children: updatedChildren,
                    selected:
                      updatedChildren.length > 0 ? newSelected : undefined,
                  };
                  const updatedLayout = updateNodeById(
                    prevModel.layout,
                    tabsetId,
                    updatedTabset
                  );
                  if (updatedLayout) {
                    const cleanedLayout = removeEmptyTabsets(updatedLayout);
                    if (cleanedLayout) {
                      return {
                        ...prevModel,
                        layout: cleanedLayout,
                      };
                    }
                  }
                }
                return prevModel;
              case "closeTabset":
                const { nodeId: closeTabsetId } =
                  action.payload as CloseTabsetPayload;
                const updatedLayout = updateNodeById(
                  prevModel.layout,
                  closeTabsetId,
                  null
                );
                if (updatedLayout) {
                  const cleanedLayout = removeEmptyTabsets(updatedLayout);
                  if (cleanedLayout) {
                    return {
                      ...prevModel,
                      layout: cleanedLayout,
                    };
                  }
                }
                return prevModel;
              case "changeDirection":
                const { direction: newDirection } = action.payload as {
                  direction: Direction;
                };
                return {
                  ...prevModel,
                  global: {
                    ...prevModel.global,
                    direction: newDirection,
                  },
                };
              default:
                return prevModel;
            }
          };

          const updatedModel = updateModel(currentStoredModel);
          updateStoredModel(updatedModel);
          if (onModelChange) {
            onModelChange(updatedModel);
          }
          onAction?.(action);
        } else {
          onAction?.(action);
        }

        if (!storage?.enabled && !onModelChange) {
          const updateModel = (prevModel: LayoutModel): LayoutModel => {
            switch (action.type) {
              case "selectTab":
                const { nodeId, tabIndex } = action.payload as SelectTabPayload;
                const selectResult = updateNodeById(prevModel.layout, nodeId, {
                  selected: tabIndex,
                });
                return {
                  ...prevModel,
                  layout: selectResult || prevModel.layout,
                };
              case "removeNode":
                const { nodeId: tabsetId, tabIndex: removeTabIndex } =
                  action.payload as { nodeId: string; tabIndex: number };
                const tabsetNode = findNodeById(prevModel.layout, tabsetId);
                if (tabsetNode && tabsetNode.children) {
                  const updatedChildren = tabsetNode.children.filter(
                    (_, index) => index !== removeTabIndex
                  );

                  const currentSelected = tabsetNode.selected ?? 0;
                  let newSelected = currentSelected;
                  if (removeTabIndex <= currentSelected) {
                    newSelected = Math.max(0, currentSelected - 1);
                  }
                  newSelected = Math.min(
                    newSelected,
                    updatedChildren.length - 1
                  );

                  const updatedTabset = {
                    ...tabsetNode,
                    children: updatedChildren,
                    selected:
                      updatedChildren.length > 0 ? newSelected : undefined,
                  };
                  const updatedLayout = updateNodeById(
                    prevModel.layout,
                    tabsetId,
                    updatedTabset
                  );
                  if (updatedLayout) {
                    const cleanedLayout = removeEmptyTabsets(updatedLayout);
                    if (cleanedLayout) {
                      return {
                        ...prevModel,
                        layout: cleanedLayout,
                      };
                    }
                  }
                }
                return prevModel;
              case "closeTabset":
                const { nodeId: closeTabsetId } =
                  action.payload as CloseTabsetPayload;
                const updatedLayout = updateNodeById(
                  prevModel.layout,
                  closeTabsetId,
                  null
                );
                if (updatedLayout) {
                  const cleanedLayout = removeEmptyTabsets(updatedLayout);
                  if (cleanedLayout) {
                    return {
                      ...prevModel,
                      layout: cleanedLayout,
                    };
                  }
                }
                return prevModel;
              default:
                return prevModel;
            }
          };

          const updatedModel = updateModel(internalModel);
          setInternalModel(updatedModel);
        }
      },
      [
        onAction,
        onModelChange,
        storage?.enabled,
        updateStoredModel,
        internalModel,
        storedModel,
        pendingDirection,
        setPendingDirection,
      ]
    );

    useImperativeHandle(
      ref,
      () => ({
        handleAction,
      }),
      [handleAction]
    );

    const renderNode = useCallback(
      (node: LayoutNode): React.ReactNode => {
        switch (node.type) {
          case "tabset":
            return (
              <TabSet
                key={node.id}
                node={node}
                factory={factory}
                onTabSelect={(nodeId, tabIndex) => {
                  handleAction({
                    type: "selectTab",
                    payload: { nodeId, tabIndex },
                  });
                }}
                onTabClose={(nodeId, tabIndex) => {
                  handleAction({
                    type: "removeNode",
                    payload: { nodeId, tabIndex },
                  });
                }}
                onTabDragStart={handleDragStart}
                onTabDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                dragOverTabset={dragOverTabset}
                dropPosition={
                  dragOverTabset === node.id ? dropPosition : undefined
                }
                direction={currentModel.global.direction || "ltr"}
              />
            );

          case "row":
            const direction = currentModel.global.direction || "ltr";
            const isRTL = direction === "rtl";
            const rowChildren = node.children || [];
            const childrenToRender = isRTL
              ? [...rowChildren].reverse()
              : rowChildren;

            return (
              <div
                key={node.id}
                className="react-flex-layout-row"
                style={{
                  width: node.width ? `${node.width}%` : undefined,
                  height: node.height ? `${node.height}%` : undefined,
                  flex: `${node.flex || 1} 1 0%`,
                  minWidth: node.minWidth ? `${node.minWidth}px` : undefined,
                  minHeight: node.minHeight ? `${node.minHeight}px` : undefined,
                  maxWidth: node.maxWidth ? `${node.maxWidth}px` : undefined,
                  maxHeight: node.maxHeight ? `${node.maxHeight}px` : undefined,
                }}
              >
                {childrenToRender.map((child, renderIndex) => {
                  const nextRenderIndex = renderIndex + 1;
                  const hasNextSibling =
                    nextRenderIndex < childrenToRender.length;

                  if (!hasNextSibling) {
                    return (
                      <React.Fragment key={child.id}>
                        {renderNode(child)}
                      </React.Fragment>
                    );
                  }

                  // Map back to original array positions
                  const currentOriginalIndex = isRTL
                    ? rowChildren.length - 1 - renderIndex
                    : renderIndex;
                  const nextOriginalIndex = isRTL
                    ? rowChildren.length - 1 - nextRenderIndex
                    : nextRenderIndex;

                  // For resize, we need to use the child that comes first in the original array
                  // This ensures currentIndex and siblingIndex are sequential (currentIndex + 1)
                  const firstOriginalIndex = Math.min(
                    currentOriginalIndex,
                    nextOriginalIndex
                  );
                  const secondOriginalIndex = Math.max(
                    currentOriginalIndex,
                    nextOriginalIndex
                  );

                  // Verify they are sequential in original array
                  if (secondOriginalIndex !== firstOriginalIndex + 1) {
                    // Not sequential - skip this splitter (shouldn't happen in normal layout)
                    return (
                      <React.Fragment key={child.id}>
                        {renderNode(child)}
                      </React.Fragment>
                    );
                  }

                  const firstChild = rowChildren[firstOriginalIndex];
                  const isRTLReversed =
                    isRTL && currentOriginalIndex > nextOriginalIndex;

                  return (
                    <React.Fragment key={child.id}>
                      {renderNode(child)}
                      <Splitter
                        direction="horizontal"
                        onResize={(delta) => {
                          // In RTL when children are reversed, invert delta direction
                          const adjustedDelta = isRTLReversed ? -delta : delta;
                          handleResize(
                            firstChild.id,
                            adjustedDelta,
                            "horizontal"
                          );
                        }}
                        onResizeStart={() => {
                          resetResize(firstChild.id, "horizontal");
                        }}
                        size={currentModel.global.splitterSize || 8}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            );

          case "column":
            return (
              <div
                key={node.id}
                className="react-flex-layout-column"
                style={{
                  width: node.width ? `${node.width}%` : undefined,
                  height: node.height ? `${node.height}%` : undefined,
                  flex: `${node.flex || 1} 1 0%`,
                  minWidth: node.minWidth ? `${node.minWidth}px` : undefined,
                  minHeight: node.minHeight ? `${node.minHeight}px` : undefined,
                  maxWidth: node.maxWidth ? `${node.maxWidth}px` : undefined,
                  maxHeight: node.maxHeight ? `${node.maxHeight}px` : undefined,
                }}
              >
                {node.children?.map((child, index) => (
                  <React.Fragment key={child.id}>
                    {renderNode(child)}
                    {index < (node.children?.length || 0) - 1 && (
                      <Splitter
                        direction="vertical"
                        onResize={(delta) =>
                          handleResize(child.id, delta, "vertical")
                        }
                        onResizeStart={() => {
                          // Reset any previous resize state for this node
                          resetResize(child.id, "vertical");
                        }}
                        size={currentModel.global.splitterSize || 8}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            );

          case "tab":
            return factory(node);

          default:
            return null;
        }
      },
      [
        currentModel.global.splitterSize,
        factory,
        handleAction,
        handleResize,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        dragOverTabset,
        dropPosition,
      ]
    );

    let direction: Direction;
    if (storage?.enabled) {
      if (pendingDirection !== null) {
        direction = pendingDirection;
      } else {
        direction = storedModel?.global?.direction || "ltr";
      }
    } else {
      direction = currentModel.global?.direction || "ltr";
    }

    useEffect(() => {
      if (!storage?.enabled && pendingDirection !== null) {
        setPendingDirection(null);
      }
    }, [storage?.enabled, pendingDirection]);

    const layoutStyle: React.CSSProperties = {
      ...style,
      height: "100%",
      width: "100%",
    };

    if (storage?.enabled && !isLoaded) {
      return (
        <div
          className={`react-flex-layout ${className}`}
          style={{
            ...layoutStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>Loading layout...</div>
        </div>
      );
    }

    return (
      <div
        className={`react-flex-layout ${className}`}
        style={layoutStyle}
        dir={direction}
      >
        {renderNode(currentModel.layout)}
      </div>
    );
  }
);

Layout.displayName = "Layout";
