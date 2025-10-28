import React, { useCallback, useState } from "react";
import {
  LayoutProps,
  LayoutNode,
  LayoutAction,
  SelectTabPayload,
} from "../types";
import { TabSet } from "./TabSet";
import { Splitter } from "./Splitter";
import { useLayoutResize } from "../hooks/useLayoutResize";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { updateNodeById } from "../utils/layoutUtils";
import "./Layout.css";

export const Layout: React.FC<LayoutProps> = ({
  model,
  factory,
  onModelChange,
  onAction,
  className = "",
  style = {},
}) => {
  const [internalModel, setInternalModel] = useState(model);

  const currentModel = onModelChange ? model : internalModel;
  const { handleResize } = useLayoutResize(currentModel, onModelChange);
  const {
    dragOverTabset,
    dropPosition,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useDragAndDrop(currentModel, onModelChange);

  const handleAction = useCallback(
    (action: LayoutAction) => {
      onAction?.(action);

      if (onModelChange) {
        // Let parent handle model updates
        return;
      }

      // Internal model updates
      setInternalModel((prevModel) => {
        switch (action.type) {
          case "selectTab":
            const { nodeId, tabIndex } = action.payload as SelectTabPayload;
            return {
              ...prevModel,
              layout: updateNodeById(prevModel.layout, nodeId, {
                selected: tabIndex,
              }),
            };
          default:
            return prevModel;
        }
      });
    },
    [onAction, onModelChange]
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
            />
          );

        case "row":
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
              {node.children?.map((child, index) => (
                <React.Fragment key={child.id}>
                  {renderNode(child)}
                  {index < (node.children?.length || 0) - 1 && (
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

  const layoutStyle: React.CSSProperties = {
    ...style,
    height: "100%",
    width: "100%",
  };

  return (
    <div className={`react-flex-layout ${className}`} style={layoutStyle}>
      {renderNode(currentModel.layout)}
    </div>
  );
};
