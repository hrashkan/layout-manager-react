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
  CloseTabsetPayload,
  updateNodeById,
  findNodeById,
  removeEmptyTabsets,
  createLayoutStorage,
  isLocalStorageAvailable,
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
  const [direction, setDirection] = useState<"ltr" | "rtl">(() => {
    const saved = localStorage.getItem("demo-direction");
    return (saved as "ltr" | "rtl") || "ltr";
  });
  const [storageEnabled, setStorageEnabled] = useState(() => {
    const saved = localStorage.getItem("demo-storage-enabled");
    return saved ? JSON.parse(saved) : true;
  });
  const [storageKey, setStorageKey] = useState("demo-layout");

  const initialModel = createLayoutModel(
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
    ]),
    {
      splitterSize: 8,
      direction: direction,
    }
  );

  const [model, setModel] = useState<LayoutModel>(initialModel);

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

  const handleAction = useCallback(
    (action: LayoutAction) => {
      // Handle tab selection
      if (action.type === "selectTab") {
        const { nodeId, tabIndex } = action.payload as SelectTabPayload;
        setModel((prevModel) => {
          const selectResult = updateNodeById(prevModel.layout, nodeId, {
            selected: tabIndex,
          });
          return {
            ...prevModel,
            layout: selectResult || prevModel.layout,
          };
        });
      }
      // Handle tab close (remove individual tab)
      if (action.type === "removeNode") {
        const { nodeId, tabIndex } = action.payload as {
          nodeId: string;
          tabIndex: number;
        };
        const tabsetNode = findNodeById(model.layout, nodeId);
        if (tabsetNode && tabsetNode.children) {
          const updatedChildren = tabsetNode.children.filter(
            (_, index) => index !== tabIndex
          );
          const updatedTabset = { ...tabsetNode, children: updatedChildren };
          const updatedLayout = updateNodeById(
            model.layout,
            nodeId,
            updatedTabset
          );
          if (updatedLayout) {
            // Clean up empty tabsets and redistribute flex values
            const cleanedLayout = removeEmptyTabsets(updatedLayout);
            if (cleanedLayout) {
              setModel((prevModel) => ({
                ...prevModel,
                layout: cleanedLayout,
              }));
            }
          }
        }
      }
      // Handle tabset close
      if (action.type === "closeTabset") {
        const { nodeId } = action.payload as CloseTabsetPayload;
        const updatedLayout = updateNodeById(model.layout, nodeId, null);
        if (updatedLayout) {
          setModel((prevModel) => ({
            ...prevModel,
            layout: updatedLayout,
          }));
        }
      }
    },
    [model.layout]
  );

  const toggleDirection = useCallback(() => {
    const newDirection = direction === "ltr" ? "rtl" : "ltr";
    setDirection(newDirection);
    localStorage.setItem("demo-direction", newDirection);
    setModel((prevModel) => ({
      ...prevModel,
      global: {
        ...prevModel.global,
        direction: newDirection,
      },
    }));
  }, [direction]);

  const clearStorage = useCallback(() => {
    if (isLocalStorageAvailable()) {
      const storage = createLayoutStorage({ key: storageKey });
      storage.clear();
      setModel(initialModel);
    }
  }, [storageKey, initialModel]);

  const resetLayout = useCallback(() => {
    setModel(initialModel);
  }, [initialModel]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          zIndex: 1000,
          background: "white",
          padding: "15px",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          minWidth: "200px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <h4 style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
            Layout Controls
          </h4>

          <div style={{ marginBottom: "8px" }}>
            <button
              onClick={toggleDirection}
              style={{
                padding: "6px 12px",
                fontSize: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                background: direction === "rtl" ? "#2196F3" : "#f5f5f5",
                color: direction === "rtl" ? "white" : "black",
                cursor: "pointer",
                marginRight: "5px",
              }}
            >
              {direction === "ltr" ? "RTL" : "LTR"}
            </button>
            <span style={{ fontSize: "12px", color: "#666" }}>
              {direction.toUpperCase()}
            </span>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label
              style={{
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                checked={storageEnabled}
                onChange={(e) => {
                  const newValue = e.target.checked;
                  setStorageEnabled(newValue);
                  localStorage.setItem(
                    "demo-storage-enabled",
                    JSON.stringify(newValue)
                  );
                }}
                style={{ marginRight: "5px" }}
              />
              Enable Storage
            </label>
          </div>

          <div style={{ marginBottom: "8px" }}>
            <input
              type="text"
              value={storageKey}
              onChange={(e) => setStorageKey(e.target.value)}
              placeholder="Storage key"
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "5px" }}>
            <button
              onClick={clearStorage}
              style={{
                padding: "4px 8px",
                fontSize: "11px",
                border: "1px solid #f44336",
                borderRadius: "4px",
                background: "#f44336",
                color: "white",
                cursor: "pointer",
                flex: 1,
              }}
            >
              Clear Storage
            </button>
            <button
              onClick={resetLayout}
              style={{
                padding: "4px 8px",
                fontSize: "11px",
                border: "1px solid #ff9800",
                borderRadius: "4px",
                background: "#ff9800",
                color: "white",
                cursor: "pointer",
                flex: 1,
              }}
            >
              Reset Layout
            </button>
          </div>
        </div>
      </div>
      <Layout
        model={model}
        factory={factory}
        onModelChange={setModel}
        onAction={handleAction}
        storage={{
          enabled: storageEnabled,
          key: storageKey,
          autoSave: true,
          debounceMs: 500,
        }}
      />
    </div>
  );
};

export default App;
