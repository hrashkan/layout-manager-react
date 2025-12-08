import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useMemo,
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
import { MemoizedTabSet } from "./MemoizedTabSet";
import { Splitter } from "./Splitter";
import { useLayoutResize } from "../hooks/useLayoutResize";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useLayoutStorage } from "../hooks/useLayoutStorage";
import { useNodeIndex } from "../hooks/useNodeIndex";
import {
  updateNodeById,
  findNodeById,
  findNodeByIdCached,
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
      closeIcon,
      closeButtonClassName,
      scrollLeftIcon,
      scrollRightIcon,
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

    const { nodeIndex, parentIndex } = useNodeIndex(currentModel.layout);
    const nodeIndexRef = useRef(nodeIndex);
    const parentIndexRef = useRef(parentIndex);

    useEffect(() => {
      nodeIndexRef.current = nodeIndex;
      parentIndexRef.current = parentIndex;
    }, [nodeIndex, parentIndex]);

    const onModelChangeRef = useRef(onModelChange);
    const storageRef = useRef(storage);
    const updateStoredModelRef = useRef(updateStoredModel);

    useEffect(() => {
      onModelChangeRef.current = onModelChange;
    }, [onModelChange]);

    useEffect(() => {
      storageRef.current = storage;
    }, [storage]);

    useEffect(() => {
      updateStoredModelRef.current = updateStoredModel;
    }, [updateStoredModel]);

    const handleModelChange = useCallback((newModel: LayoutModel) => {
      if (storageRef.current?.enabled) {
        updateStoredModelRef.current(newModel);
        if (onModelChangeRef.current) {
          onModelChangeRef.current(newModel);
        }
      } else {
        if (onModelChangeRef.current) {
          onModelChangeRef.current(newModel);
        } else {
          setInternalModel(newModel);
        }
      }
    }, []);

    const { handleResize, resetResize } = useLayoutResize(
      currentModel,
      handleModelChange,
      parentIndex
    );

    const MAX_RESIZE_HANDLERS = 100;
    const resizeHandlersRef = useRef<
      Map<
        string,
        {
          onResize: (delta: number) => void;
          onResizeStart: () => void;
        }
      >
    >(new Map());

    const getResizeHandler = useCallback(
      (nodeId: string, direction: "horizontal" | "vertical") => {
        const key = `${nodeId}-${direction}`;
        const handlersMap = resizeHandlersRef.current;

        if (handlersMap.has(key)) {
          const handler = handlersMap.get(key)!;
          handlersMap.delete(key);
          handlersMap.set(key, handler);
          return handler;
        }

        const handler = {
          onResize: (delta: number) => {
            handleResize(nodeId, delta, direction);
          },
          onResizeStart: () => {
            resetResize(nodeId, direction);
          },
        };

        if (handlersMap.size >= MAX_RESIZE_HANDLERS) {
          const firstKey = handlersMap.keys().next().value;
          if (firstKey) {
            handlersMap.delete(firstKey);
          }
        }

        handlersMap.set(key, handler);
        return handler;
      },
      [handleResize, resetResize]
    );
    const {
      dragOverTabset,
      dropPosition,
      dropTargetIndex,
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragLeave,
      handleDrop,
    } = useDragAndDrop(currentModel, handleModelChange, nodeIndex, parentIndex);

    const storedModelRef = useRef<LayoutModel>(storedModel);
    useEffect(() => {
      storedModelRef.current = storedModel;
    }, [storedModel]);

    const internalModelRef = useRef<LayoutModel>(internalModel);
    useEffect(() => {
      internalModelRef.current = internalModel;
    }, [internalModel]);

    const modelRef = useRef<LayoutModel>(model);
    useEffect(() => {
      modelRef.current = model;
    }, [model]);

    const onActionRef = useRef(onAction);
    useEffect(() => {
      onActionRef.current = onAction;
    }, [onAction]);

    const handleAction = useCallback((action: LayoutAction) => {
      if (storageRef.current?.enabled) {
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
              if (!selectResult || selectResult === prevModel.layout) {
                return prevModel;
              }
              return {
                ...prevModel,
                layout: selectResult,
              };
            case "removeNode":
              const { nodeId: tabsetId, tabIndex: removeTabIndex } =
                action.payload as { nodeId: string; tabIndex: number };
              const tabsetNode =
                findNodeByIdCached(nodeIndexRef.current, tabsetId) ??
                findNodeById(prevModel.layout, tabsetId);
              if (tabsetNode && tabsetNode.children) {
                const updatedChildren = tabsetNode.children.filter(
                  (_, index) => index !== removeTabIndex
                );

                const currentSelected = tabsetNode.selected ?? 0;
                let newSelected = currentSelected;
                if (removeTabIndex <= currentSelected) {
                  newSelected = Math.max(0, currentSelected - 1);
                }
                newSelected = Math.min(newSelected, updatedChildren.length - 1);

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
        updateStoredModelRef.current(updatedModel);
        if (onModelChangeRef.current) {
          onModelChangeRef.current(updatedModel);
        }
        onActionRef.current?.(action);
      } else {
        if (action.type === "changeDirection" && onModelChangeRef.current) {
          const { direction: newDirection } = action.payload as {
            direction: Direction;
          };
          const currentModel = modelRef.current;
          const updatedModel: LayoutModel = {
            ...currentModel,
            global: {
              ...currentModel.global,
              direction: newDirection,
            },
          };
          onModelChangeRef.current(updatedModel);
        }
        onActionRef.current?.(action);
      }

      if (!storageRef.current?.enabled && !onModelChangeRef.current) {
        const currentInternalModel = internalModelRef.current;
        const updateModel = (prevModel: LayoutModel): LayoutModel => {
          switch (action.type) {
            case "selectTab":
              const { nodeId, tabIndex } = action.payload as SelectTabPayload;
              const selectResult = updateNodeById(prevModel.layout, nodeId, {
                selected: tabIndex,
              });
              if (!selectResult || selectResult === prevModel.layout) {
                return prevModel;
              }
              return {
                ...prevModel,
                layout: selectResult,
              };
            case "removeNode":
              const { nodeId: tabsetId, tabIndex: removeTabIndex } =
                action.payload as { nodeId: string; tabIndex: number };
              const tabsetNode =
                findNodeByIdCached(nodeIndexRef.current, tabsetId) ??
                findNodeById(prevModel.layout, tabsetId);
              if (tabsetNode && tabsetNode.children) {
                const updatedChildren = tabsetNode.children.filter(
                  (_, index) => index !== removeTabIndex
                );

                const currentSelected = tabsetNode.selected ?? 0;
                let newSelected = currentSelected;
                if (removeTabIndex <= currentSelected) {
                  newSelected = Math.max(0, currentSelected - 1);
                }
                newSelected = Math.min(newSelected, updatedChildren.length - 1);

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

        const updatedModel = updateModel(currentInternalModel);
        setInternalModel(updatedModel);
      }
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        handleAction,
      }),
      [handleAction]
    );

    const handleTabSelect = useCallback(
      (nodeId: string, tabIndex: number) => {
        handleAction({
          type: "selectTab",
          payload: { nodeId, tabIndex },
        });
      },
      [handleAction]
    );

    const handleTabClose = useCallback(
      (nodeId: string, tabIndex: number) => {
        handleAction({
          type: "removeNode",
          payload: { nodeId, tabIndex },
        });
      },
      [handleAction]
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

    const splitterSize = currentModel.global?.splitterSize || 8;

    const renderNode = useCallback(
      (node: LayoutNode): React.ReactNode => {
        switch (node.type) {
          case "tabset":
            return (
              <MemoizedTabSet
                key={node.id}
                node={node}
                factory={factory}
                onTabSelect={handleTabSelect}
                onTabClose={handleTabClose}
                onTabDragStart={handleDragStart}
                onTabDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                dragOverTabset={dragOverTabset}
                dropPosition={
                  dragOverTabset === node.id ? dropPosition : undefined
                }
                dropTargetIndex={
                  dragOverTabset === node.id ? dropTargetIndex : undefined
                }
                direction={direction}
                closeIcon={closeIcon}
                closeButtonClassName={closeButtonClassName}
                scrollLeftIcon={scrollLeftIcon}
                scrollRightIcon={scrollRightIcon}
              />
            );

          case "row":
            const rowChildren = node.children || [];

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
                {rowChildren.map((child, index) => {
                  const hasNextSibling = index < rowChildren.length - 1;

                  if (!hasNextSibling) {
                    return (
                      <React.Fragment key={child.id}>
                        {renderNode(child)}
                      </React.Fragment>
                    );
                  }

                  const horizontalHandlers = getResizeHandler(
                    child.id,
                    "horizontal"
                  );
                  return (
                    <React.Fragment key={child.id}>
                      {renderNode(child)}
                      <Splitter
                        direction="horizontal"
                        onResize={horizontalHandlers.onResize}
                        onResizeStart={horizontalHandlers.onResizeStart}
                        size={splitterSize}
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
                {node.children?.map((child, index) => {
                  const verticalHandlers =
                    index < (node.children?.length || 0) - 1
                      ? getResizeHandler(child.id, "vertical")
                      : null;
                  return (
                    <React.Fragment key={child.id}>
                      {renderNode(child)}
                      {verticalHandlers && (
                        <Splitter
                          direction="vertical"
                          onResize={verticalHandlers.onResize}
                          onResizeStart={verticalHandlers.onResizeStart}
                          size={splitterSize}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            );

          case "tab":
            return factory(node);

          default:
            return null;
        }
      },
      [
        direction,
        splitterSize,
        factory,
        handleTabSelect,
        handleTabClose,
        handleResize,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        dragOverTabset,
        dropPosition,
        closeIcon,
        closeButtonClassName,
        getResizeHandler,
      ]
    );

    useEffect(() => {
      if (!storage?.enabled && pendingDirection !== null) {
        setPendingDirection(null);
      }
    }, [storage?.enabled, pendingDirection]);

    useEffect(() => {
      if (storage?.enabled && pendingDirection !== null) {
        const storedDir = storedModel?.global?.direction || "ltr";
        if (storedDir === pendingDirection) {
          setPendingDirection(null);
        }
      }
    }, [storage?.enabled, pendingDirection, storedModel?.global?.direction]);

    const renderedLayout = useMemo(
      () => renderNode(currentModel.layout),
      [renderNode, currentModel.layout]
    );

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
        {renderedLayout}
      </div>
    );
  }
);

Layout.displayName = "Layout";
