import React, { useState, useCallback } from "react";
import {
  Layout,
  createLayoutModel,
  createTab,
  createTabSet,
  createRow,
  createColumn,
  type LayoutModel,
  type LayoutAction,
} from "../src/index";
import "../src/components/Layout.css";
import "../src/components/TabSet.css";
import "../src/components/Tab.css";
import "../src/components/Splitter.css";

// Example components
const Dashboard: React.FC = () => (
  <div style={{ padding: "20px", backgroundColor: "#f0f0f0", height: "100%" }}>
    <h2>Dashboard</h2>
    <p>This is the dashboard content.</p>
  </div>
);

const Settings: React.FC = () => (
  <div style={{ padding: "20px", backgroundColor: "#e0e0e0", height: "100%" }}>
    <h2>Settings</h2>
    <p>Configure your application here.</p>
  </div>
);

const Logs: React.FC = () => (
  <div style={{ padding: "20px", backgroundColor: "#d0d0d0", height: "100%" }}>
    <h2>Logs</h2>
    <p>View application logs here.</p>
  </div>
);

const BasicExample: React.FC = () => {
  const [model, setModel] = useState<LayoutModel>(() =>
    createLayoutModel(
      createRow("root", [
        // Left column with dashboard
        createColumn(
          "left",
          [
            createTabSet("dashboard-tabs", [
              createTab("dashboard-tab", "dashboard", "Dashboard"),
            ]),
          ],
          30
        ), // 30% width

        // Right column with settings and logs
        createColumn(
          "right",
          [
            createRow(
              "top-right",
              [
                createTabSet("settings-tabs", [
                  createTab("settings-tab", "settings", "Settings"),
                ]),
              ],
              50
            ), // 50% height

            createRow(
              "bottom-right",
              [
                createTabSet("logs-tabs", [
                  createTab("logs-tab", "logs", "Logs"),
                ]),
              ],
              50
            ), // 50% height
          ],
          70
        ), // 70% width
      ])
    )
  );

  const factory = useCallback((node: any) => {
    switch (node.component) {
      case "dashboard":
        return <Dashboard />;
      case "settings":
        return <Settings />;
      case "logs":
        return <Logs />;
      default:
        return <div>Unknown component: {node.component}</div>;
    }
  }, []);

  const handleAction = useCallback((action: LayoutAction) => {
    // Handle actions
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

export default BasicExample;
