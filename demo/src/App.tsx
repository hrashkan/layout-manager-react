import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Layout,
  createLayoutModel,
  createTab,
  createTabSet,
  createRow,
  createColumn,
  LayoutModel,
  LayoutRef,
  LayoutAction,
  SelectTabPayload,
  CloseTabsetPayload,
  updateNodeById,
  findNodeById,
  removeEmptyTabsets,
  createLayoutStorage,
  isLocalStorageAvailable,
  removeTab,
  restoreTab,
  tabExists,
  ComponentRestoreData,
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

// Custom close icon component
const CustomCloseIcon: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const App: React.FC = () => {
  const layoutRef = useRef<LayoutRef>(null);
  const [storageEnabled, setStorageEnabled] = useState(() => {
    const saved = localStorage.getItem("demo-storage-enabled");
    return saved ? JSON.parse(saved) : true;
  });
  const [storageKey, setStorageKey] = useState("demo-layout");

  // Try to load direction from storage first, fallback to "ltr"
  const getInitialDirection = (): "ltr" | "rtl" => {
    if (storageEnabled && isLocalStorageAvailable()) {
      const storage = createLayoutStorage({ key: storageKey });
      const savedModel = storage.load();
      if (savedModel?.global?.direction) {
        return savedModel.global.direction;
      }
    }
    return "ltr";
  };

  const [direction, setDirection] = useState<"ltr" | "rtl">(
    getInitialDirection
  );

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

  // Sync direction from model when it's loaded from storage
  useEffect(() => {
    if (model.global?.direction && model.global.direction !== direction) {
      setDirection(model.global.direction);
    }
  }, [model.global?.direction]);

  // Store minimal restoration data in ref (no re-renders, memory efficient)
  const restoreDataRef = useRef<Map<string, ComponentRestoreData>>(new Map());

  // Component configuration mapping
  const COMPONENT_CONFIG: Record<
    string,
    { tabId: string; component: string; name: string }
  > = {
    component1: { tabId: "tab1", component: "component1", name: "Dashboard" },
    component2: { tabId: "tab2", component: "component2", name: "Analytics" },
    component3: { tabId: "tab3", component: "component3", name: "Settings" },
    component4: { tabId: "tab4", component: "component4", name: "Logs" },
    component5: { tabId: "tab5", component: "component5", name: "Console" },
  };

  // Load restoration data from model metadata on mount and when model changes
  useEffect(() => {
    if (model.metadata?.restoreData) {
      const data = model.metadata.restoreData as Record<
        string,
        ComponentRestoreData
      >;
      restoreDataRef.current = new Map(Object.entries(data));
    }
  }, [model.metadata?.restoreData]);

  // Check if a component is visible (tab exists in layout)
  const isComponentVisible = useCallback(
    (componentKey: string) => {
      const config = COMPONENT_CONFIG[componentKey];
      if (!config) return false;
      return tabExists(model.layout, config.tabId);
    },
    [model.layout]
  );

  // Toggle component visibility
  const toggleComponent = useCallback(
    (componentKey: string) => {
      const config = COMPONENT_CONFIG[componentKey];
      if (!config) return;

      const isVisible = tabExists(model.layout, config.tabId);

      if (isVisible) {
        const result = removeTab(model.layout, config.tabId);
        if (result.layout && result.restoreData) {
          restoreDataRef.current.set(config.tabId, result.restoreData);
          const cleanedLayout = removeEmptyTabsets(result.layout);
          if (cleanedLayout) {
            const restoreData = Object.fromEntries(restoreDataRef.current);
            const updatedModel = {
              ...model,
              layout: cleanedLayout,
              global: {
                ...model.global,
                direction: direction, // Use direction state to ensure latest value
              },
              metadata: {
                ...model.metadata,
                restoreData: restoreData,
              },
            };

            setModel(updatedModel);
          }
        }
      } else {
        const restoreData = restoreDataRef.current.get(config.tabId);
        if (restoreData) {
          const restored = restoreTab(
            model.layout,
            restoreData,
            initialModel.layout
          );
          if (restored) {
            restoreDataRef.current.delete(config.tabId);
            const restoreData = Object.fromEntries(restoreDataRef.current);
            const updatedModel = {
              ...model,
              layout: restored,
              global: {
                ...model.global,
                direction: direction, // Use direction state to ensure latest value
              },
              metadata: {
                ...model.metadata,
                restoreData: restoreData,
              },
            };

            setModel(updatedModel);
          }
        }
      }
    },
    [model, initialModel.layout, direction]
  );

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
      if (action.type === "removeNode") {
        const { nodeId, tabIndex } = action.payload as {
          nodeId: string;
          tabIndex: number;
        };
        const tabsetNode = findNodeById(model.layout, nodeId);
        if (
          tabsetNode &&
          tabsetNode.children &&
          tabsetNode.children[tabIndex]
        ) {
          const closedTab = tabsetNode.children[tabIndex];

          // Use package utility to remove tab and get restoration data
          const result = removeTab(model.layout, closedTab.id);

          if (result.layout && result.restoreData) {
            // Store minimal restoration data (memory efficient)
            restoreDataRef.current.set(closedTab.id, result.restoreData);

            const cleanedLayout = removeEmptyTabsets(result.layout);
            if (cleanedLayout) {
              // Update model with cleaned layout and restoration data
              const restoreData = Object.fromEntries(restoreDataRef.current);
              const updatedModel = {
                ...model,
                layout: cleanedLayout,
                global: {
                  ...model.global,
                  direction: direction, // Use direction state to ensure latest value
                },
                metadata: {
                  ...model.metadata,
                  restoreData: restoreData,
                },
              };

              setModel(updatedModel);
            }
          }
        }
      }
      if (action.type === "closeTabset") {
        const { nodeId } = action.payload as CloseTabsetPayload;
        const tabsetNode = findNodeById(model.layout, nodeId);
        if (tabsetNode && tabsetNode.type === "tabset" && tabsetNode.children) {
          // Store restoration data for all tabs in the tabset
          const restoreDataMap = new Map<string, ComponentRestoreData>();
          tabsetNode.children.forEach((tab) => {
            if (tab.type === "tab") {
              const result = removeTab(model.layout, tab.id);
              if (result.restoreData) {
                restoreDataRef.current.set(tab.id, result.restoreData);
                restoreDataMap.set(tab.id, result.restoreData);
              }
            }
          });

          // Update model with restoration data
          const restoreData = Object.fromEntries(restoreDataRef.current);
          const updatedModel = {
            ...model,
            metadata: {
              ...model.metadata,
              restoreData: restoreData,
            },
          };
          setModel(updatedModel);

          // Remove the tabset
          const updatedLayout = updateNodeById(model.layout, nodeId, null);
          if (updatedLayout) {
            const cleanedLayout = removeEmptyTabsets(updatedLayout);
            if (cleanedLayout) {
              setModel((prevModel) => ({
                ...prevModel,
                layout: cleanedLayout,
                global: {
                  ...prevModel.global,
                  direction: direction, // Use direction state to ensure latest value
                },
              }));
            }
          }
        }
      }
      if (action.type === "changeDirection") {
        const { direction: newDirection } = action.payload as {
          direction: "ltr" | "rtl";
        };
        setModel((prevModel) => ({
          ...prevModel,
          global: {
            ...prevModel.global,
            direction: newDirection,
          },
        }));
      }
    },
    [model, direction]
  );

  const toggleDirection = useCallback(() => {
    const newDirection = direction === "ltr" ? "rtl" : "ltr";
    setDirection(newDirection);

    if (layoutRef.current) {
      layoutRef.current.handleAction({
        type: "changeDirection",
        payload: { direction: newDirection },
      });
    } else {
      const updatedModel: LayoutModel = {
        ...model,
        global: {
          ...model.global,
          direction: newDirection as "ltr" | "rtl",
        },
      };
      setModel(updatedModel);
    }
  }, [direction, model]);

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

          <div
            style={{
              marginTop: "15px",
              borderTop: "1px solid #eee",
              paddingTop: "10px",
            }}
          >
            <h4 style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
              Component Toggles
            </h4>
            {Object.entries(COMPONENT_CONFIG).map(([key, config]) => (
              <label
                key={key}
                style={{
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <input
                  type="checkbox"
                  checked={isComponentVisible(key)}
                  onChange={() => toggleComponent(key)}
                  style={{ marginRight: "5px" }}
                />
                {config.name}
              </label>
            ))}
          </div>
        </div>
      </div>
      <Layout
        ref={layoutRef}
        model={model}
        factory={factory}
        onModelChange={(newModel) => {
          // Only update if the layout actually changed (not just metadata)
          // This prevents infinite loops when we update metadata
          const layoutChanged =
            JSON.stringify(model.layout) !== JSON.stringify(newModel.layout);

          // Always sync direction first, regardless of layout change
          if (
            newModel.global?.direction &&
            newModel.global.direction !== direction
          ) {
            setDirection(newModel.global.direction);
          }

          if (layoutChanged) {
            // Preserve restoration data when layout changes from drag/drop
            // Check if all tabs still exist (not removed, just moved)
            const preservedRestoreData = model.metadata?.restoreData;
            // Use direction state which is now synced above
            const currentDirection = direction;

            setModel({
              ...newModel,
              global: {
                ...newModel.global,
                direction: newModel.global?.direction || currentDirection, // Preserve direction
              },
              metadata: {
                ...newModel.metadata,
                // Preserve existing restoration data - drag/drop doesn't remove components
                restoreData:
                  preservedRestoreData || newModel.metadata?.restoreData,
              },
            });
          } else {
            // Layout didn't change, just update metadata if needed
            // Also preserve direction
            const currentDirection = direction;
            if (newModel.metadata?.restoreData || newModel.global?.direction) {
              setModel((prev) => ({
                ...prev,
                global: {
                  ...prev.global,
                  direction:
                    newModel.global?.direction ||
                    prev.global?.direction ||
                    currentDirection, // Preserve direction
                },
                metadata: newModel.metadata || prev.metadata,
              }));
            }
          }
        }}
        onAction={(action) => {
          if (action.type !== "changeDirection") {
            handleAction(action);
          }
        }}
        storage={{
          enabled: storageEnabled,
          key: storageKey,
          autoSave: true,
          debounceMs: 500,
        }}
        closeIcon={<CustomCloseIcon />}
        closeButtonClassName="demo-custom-close-button"
      />
    </div>
  );
};

export default App;
