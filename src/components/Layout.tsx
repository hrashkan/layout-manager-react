import React, { useCallback, useState } from "react";
import {
  LayoutProps,
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

export const Layout: React.FC<LayoutProps> = ({
  model,
  factory,
  onModelChange,
  onAction,
  className = "",
  style = {},
  storage,
}) => {
  const [internalModel, setInternalModel] = useState(model);

  // Use storage if enabled
  const {
    model: storedModel,
    updateModel: updateStoredModel,
    isLoaded,
  } = useLayoutStorage(model, {
    key: storage?.key,
    autoSave: storage?.autoSave,
    debounceMs: storage?.debounceMs,
    onLoad: (loadedModel) => {
      if (!onModelChange) {
        setInternalModel(loadedModel);
      }
    },
  });

  // Use stored model if storage is enabled, otherwise use provided model or internal model
  const currentModel = storage?.enabled
    ? storedModel
    : onModelChange
    ? model
    : internalModel;
  const handleModelChange = useCallback(
    (newModel: LayoutModel) => {
      // If storage is enabled, update storage (this will trigger re-render)
      if (storage?.enabled) {
        updateStoredModel(newModel);
        // Also call parent's onModelChange to keep parent state in sync
        if (onModelChange) {
          onModelChange(newModel);
        }
      } else {
        // No storage, use parent handler or internal state
        if (onModelChange) {
          onModelChange(newModel);
        } else {
          setInternalModel(newModel);
        }
      }
    },
    [onModelChange, storage?.enabled, updateStoredModel]
  );

  const { handleResize } = useLayoutResize(currentModel, handleModelChange);
  const {
    dragOverTabset,
    dropPosition,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useDragAndDrop(currentModel, handleModelChange);

  const handleAction = useCallback(
    (action: LayoutAction) => {
      // If storage is enabled, handle the action first to update storage
      if (storage?.enabled) {
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
              // Find the tabset and remove the specific tab
              const tabsetNode = findNodeById(prevModel.layout, tabsetId);
              if (tabsetNode && tabsetNode.children) {
                const updatedChildren = tabsetNode.children.filter(
                  (_, index) => index !== removeTabIndex
                );

                // Update selected index to ensure it's valid
                const currentSelected = tabsetNode.selected ?? 0;
                let newSelected = currentSelected;
                if (removeTabIndex <= currentSelected) {
                  // If we removed a tab at or before the selected index, adjust
                  newSelected = Math.max(0, currentSelected - 1);
                }
                // Ensure selected index doesn't exceed bounds
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
                  // Clean up empty tabsets without redistributing flex values
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
              // Remove the tabset by setting it to null
              const updatedLayout = updateNodeById(
                prevModel.layout,
                closeTabsetId,
                null
              );
              if (updatedLayout) {
                // Clean up and redistribute flex values so remaining tabsets grow
                const cleanedLayout = removeEmptyTabsets(updatedLayout);
                if (cleanedLayout) {
                  return {
                    ...prevModel,
                    layout: cleanedLayout,
                  };
                }
              }
              // If layout becomes null, return the original model (shouldn't happen in practice)
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

        const updatedModel = updateModel(storedModel);
        updateStoredModel(updatedModel);
        // Also call parent's onModelChange to keep parent state in sync
        if (onModelChange) {
          onModelChange(updatedModel);
        }
      } else {
        // If no storage, call parent's onAction first
        onAction?.(action);
      }

      if (!storage?.enabled && !onModelChange) {
        // If no storage and no parent onModelChange, handle internally
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
              // Find the tabset and remove the specific tab
              const tabsetNode = findNodeById(prevModel.layout, tabsetId);
              if (tabsetNode && tabsetNode.children) {
                const updatedChildren = tabsetNode.children.filter(
                  (_, index) => index !== removeTabIndex
                );

                // Update selected index to ensure it's valid
                const currentSelected = tabsetNode.selected ?? 0;
                let newSelected = currentSelected;
                if (removeTabIndex <= currentSelected) {
                  // If we removed a tab at or before the selected index, adjust
                  newSelected = Math.max(0, currentSelected - 1);
                }
                // Ensure selected index doesn't exceed bounds
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
                  // Clean up empty tabsets without redistributing flex values
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
              // Remove the tabset by setting it to null
              const updatedLayout = updateNodeById(
                prevModel.layout,
                closeTabsetId,
                null
              );
              if (updatedLayout) {
                // Clean up and redistribute flex values so remaining tabsets grow
                const cleanedLayout = removeEmptyTabsets(updatedLayout);
                if (cleanedLayout) {
                  return {
                    ...prevModel,
                    layout: cleanedLayout,
                  };
                }
              }
              // If layout becomes null, return the original model (shouldn't happen in practice)
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
      storedModel,
      internalModel,
    ]
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
              {childrenToRender.map((child, index) => (
                <React.Fragment key={child.id}>
                  {renderNode(child)}
                  {index < childrenToRender.length - 1 && (
                    <Splitter
                      direction="horizontal"
                      onResize={(delta) =>
                        handleResize(child.id, delta, "horizontal")
                      }
                      size={currentModel.global.splitterSize || 8}
                    />
                  )}
                </React.Fragment>
              ))}
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

  const direction = currentModel.global?.direction || "ltr";

  const layoutStyle: React.CSSProperties = {
    ...style,
    height: "100%",
    width: "100%",
  };

  // Don't render until storage is loaded (if using storage)
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
};
