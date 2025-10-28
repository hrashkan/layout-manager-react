import React, { useState, useCallback } from "react";
import {
  Layout,
  createLayoutModel,
  createTab,
  createTabSet,
  createRow,
  createColumn,
  LayoutModel,
  LayoutAction,
  SelectTabPayload,
  updateNodeById,
} from "../../src/index";

// Sample components for the demo
const SampleComponent: React.FC<{ title: string; color: string }> = ({
  title,
  color,
}) => (
  <div
    style={{
      padding: "20px",
      backgroundColor: color,
      height: "100%",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      fontWeight: "bold",
    }}
  >
    {title}
  </div>
);

const App: React.FC = () => {
  const [model, setModel] = useState<LayoutModel>(() => {
    return createLayoutModel(
      createRow("root", [
        createColumn("left", [
          createTabSet("left-tabset", [
            createTab("tab1", "component1", "Dashboard"),
            createTab("tab2", "component2", "Analytics"),
          ]),
        ]),
        createColumn("right", [
          createRow("top-right", [
            createTabSet("top-tabset", [
              createTab("tab3", "component3", "Settings"),
            ]),
          ]),
          createRow("bottom-right", [
            createTabSet("bottom-tabset", [
              createTab("tab4", "component4", "Logs"),
              createTab("tab5", "component5", "Console"),
            ]),
          ]),
        ]),
      ])
    );
  });

  const factory = useCallback((node: any) => {
    switch (node.component) {
      case "component1":
        return <SampleComponent title="Dashboard" color="#4CAF50" />;
      case "component2":
        return <SampleComponent title="Analytics" color="#2196F3" />;
      case "component3":
        return <SampleComponent title="Settings" color="#FF9800" />;
      case "component4":
        return <SampleComponent title="Logs" color="#9C27B0" />;
      case "component5":
        return <SampleComponent title="Console" color="#F44336" />;
      default:
        return <div>Unknown component: {node.component}</div>;
    }
  }, []);

  const handleAction = useCallback((action: LayoutAction) => {
    console.log("Layout action:", action);

    // Handle tab selection
    if (action.type === "selectTab") {
      const { nodeId, tabIndex } = action.payload as SelectTabPayload;
      setModel((prevModel) => ({
        ...prevModel,
        layout: updateNodeById(prevModel.layout, nodeId, {
          selected: tabIndex,
        }),
      }));
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Layout
        model={model}
        factory={factory}
        onModelChange={setModel}
        onAction={handleAction}
      />
    </div>
  );
};

export default App;
