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
} from "react-flex-layout";

// Sample components with different content
const Dashboard: React.FC = () => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#e3f2fd",
      height: "100%",
      overflow: "auto",
    }}
  >
    <h2>📊 Dashboard</h2>
    <p>Welcome to your dashboard! This panel shows key metrics and overview.</p>
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      >
        <strong>Total Users:</strong> 1,234
      </div>
      <div
        style={{
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      >
        <strong>Revenue:</strong> $45,678
      </div>
    </div>
  </div>
);

const Analytics: React.FC = () => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#f3e5f5",
      height: "100%",
      overflow: "auto",
    }}
  >
    <h2>📈 Analytics</h2>
    <p>Detailed analytics and reporting tools.</p>
    <div
      style={{
        height: "200px",
        backgroundColor: "white",
        borderRadius: "4px",
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed #ccc",
      }}
    >
      📊 Chart Placeholder
    </div>
  </div>
);

const Settings: React.FC = () => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#fff3e0",
      height: "100%",
      overflow: "auto",
    }}
  >
    <h2>⚙️ Settings</h2>
    <p>Configure your application preferences.</p>
    <div style={{ marginTop: "20px" }}>
      <label style={{ display: "block", marginBottom: "10px" }}>
        <input type="checkbox" defaultChecked /> Enable notifications
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        <input type="checkbox" /> Dark mode
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        <input type="checkbox" /> Auto-save
      </label>
    </div>
  </div>
);

const Logs: React.FC = () => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#e8f5e8",
      height: "100%",
      overflow: "auto",
      fontFamily: "monospace",
    }}
  >
    <h2>📝 Logs</h2>
    <div style={{ fontSize: "12px" }}>
      <div>[2024-01-15 10:30:15] INFO: Application started</div>
      <div>[2024-01-15 10:30:16] INFO: Database connected</div>
      <div>[2024-01-15 10:30:17] INFO: User authenticated</div>
      <div>[2024-01-15 10:30:18] WARN: High memory usage detected</div>
      <div>[2024-01-15 10:30:19] INFO: Cache cleared</div>
      <div>[2024-01-15 10:30:20] ERROR: Failed to connect to external API</div>
    </div>
  </div>
);

const Console: React.FC = () => (
  <div
    style={{
      padding: "20px",
      backgroundColor: "#263238",
      color: "#4caf50",
      height: "100%",
      overflow: "auto",
      fontFamily: "monospace",
    }}
  >
    <h2 style={{ color: "#4caf50" }}>💻 Console</h2>
    <div style={{ fontSize: "14px" }}>
      <div>$ npm run dev</div>
      <div>✓ Server started on port 3000</div>
      <div>✓ Hot reload enabled</div>
      <div>$ git status</div>
      <div>On branch main</div>
      <div>Changes not staged for commit:</div>
      <div> modified: src/App.tsx</div>
      <div> modified: src/components/Layout.tsx</div>
    </div>
  </div>
);

const AdvancedExample: React.FC = () => {
  const [model, setModel] = useState<LayoutModel>(() => {
    return createLayoutModel(
      createRow("root", [
        // Left sidebar with dashboard and analytics
        createColumn(
          "left-sidebar",
          [
            createTabSet("main-tabs", [
              createTab("dashboard-tab", "dashboard", "Dashboard"),
              createTab("analytics-tab", "analytics", "Analytics"),
            ]),
          ],
          40
        ), // 40% width

        // Right side with settings, logs, and console
        createColumn(
          "right-main",
          [
            createRow(
              "top-right",
              [
                createTabSet("settings-tabs", [
                  createTab("settings-tab", "settings", "Settings"),
                ]),
              ],
              30
            ), // 30% height

            createRow(
              "bottom-right",
              [
                createTabSet("logs-tabs", [
                  createTab("logs-tab", "logs", "Logs"),
                  createTab("console-tab", "console", "Console"),
                ]),
              ],
              70
            ), // 70% height
          ],
          60
        ), // 60% width
      ])
    );
  });

  const factory = useCallback((node: any) => {
    switch (node.component) {
      case "dashboard":
        return <Dashboard />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      case "logs":
        return <Logs />;
      case "console":
        return <Console />;
      default:
        return <div>Unknown component: {node.component}</div>;
    }
  }, []);

  const handleAction = useCallback((action: LayoutAction) => {
    // Handle layout actions

    // Handle different actions
    switch (action.type) {
      case "selectTab":
        // Tab selected
        break;
      case "removeNode":
        // Node removed
        break;
      case "moveNode":
        // Node moved
        break;
      case "resizeNode":
        // Node resized
        break;
      default:
      // Unknown action
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        style={{
          padding: "10px",
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #ddd",
          fontSize: "14px",
        }}
      >
        <strong>React Flex Layout Demo</strong> - Drag splitters to resize
        panels, click tabs to switch content
      </div>
      <div style={{ height: "calc(100vh - 50px)" }}>
        <Layout
          model={model}
          factory={factory}
          onModelChange={setModel}
          onAction={handleAction}
        />
      </div>
    </div>
  );
};

export default AdvancedExample;
