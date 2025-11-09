# Layout Manager React

A modern React layout manager using flexbox with percentage-based sizing, similar to FlexLayout but simpler and more performant.

## Features

- 🎯 **Flexbox-based**: Uses CSS flexbox instead of absolute positioning
- 📏 **Percentage sizing**: Responsive layout with percentage-based dimensions
- 🔄 **Drag & Drop**: Full drag and drop support with 4 drop zones (center, left, right, top/bottom)
- 📐 **Resizable**: Resize tabsets with smooth mouse tracking
- 🌍 **RTL/LTR Support**: Full right-to-left and left-to-right direction support
- 💾 **Persistent Storage**: Automatic localStorage persistence with debounced saving
- 🎨 **Customizable**: Easy to style and customize
- ⚡ **Performance**: Optimized for best performance
- 🔒 **Type Safe**: Full TypeScript support

## Installation

```bash
npm install layout-manager-react
```

**Bundle Size**: Check the package size on [Bundlephobia](https://bundlephobia.com/package/layout-manager-react@0.0.10)

## Quick Start

```tsx
import React, { useState } from "react";
import { Layout, LayoutModel } from "layout-manager-react";
import "layout-manager-react/dist/style.css";

const App: React.FC = () => {
  const [model, setModel] = useState<LayoutModel>({
    layout: {
      id: "root",
      type: "row",
      children: [
        {
          id: "tabset-1",
          type: "tabset",
          children: [
            {
              id: "tab-1",
              type: "tab",
              component: "dashboard",
              name: "Dashboard",
              enableClose: true,
              enableDrag: true,
            },
          ],
          selected: 0,
          flex: 1,
        },
      ],
      flex: 1,
    },
    global: {
      splitterSize: 8,
      direction: "ltr",
    },
  });

  const factory = (node: any) => {
    switch (node.component) {
      case "dashboard":
        return <div>Dashboard Content</div>;
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Layout model={model} factory={factory} onModelChange={setModel} />
    </div>
  );
};

export default App;
```

**Important**: Don't forget to import the CSS file!

### CSS Import Options

**Option 1: Direct import (Recommended)**

```tsx
import "layout-manager-react/dist/style.css";
```

**Option 2: In your main entry file (e.g., `app.tsx`, `_app.tsx`, or `main.tsx`)**

```tsx
// Next.js App Router (app/layout.tsx)
import "layout-manager-react/dist/style.css";

// Next.js Pages Router (_app.tsx)
import "layout-manager-react/dist/style.css";

// Vite/React (main.tsx)
import "layout-manager-react/dist/style.css";
```

**Option 3: In your global CSS file**

```css
/* styles.css or globals.css */
@import "layout-manager-react/dist/style.css";
```

### Next.js Specific

**For Next.js App Router (`app/` directory):**

```tsx
// app/layout.tsx or app/page.tsx
import "layout-manager-react/dist/style.css";
import { Layout } from "layout-manager-react";
```

**For Next.js Pages Router (`pages/` directory):**

```tsx
// pages/_app.tsx or any page component
import "layout-manager-react/dist/style.css";
import { Layout } from "layout-manager-react";
```

**Note:** Make sure to import the CSS in a client component (`"use client"` directive) or in a file that's processed by Next.js.

## Usage with Helper Functions

For easier layout creation, use the helper functions:

```tsx
import React, { useState } from "react";
import {
  Layout,
  createLayoutModel,
  createTab,
  createTabSet,
  createRow,
  createColumn,
  LayoutModel,
} from "layout-manager-react";
import "layout-manager-react/dist/style.css";

const App: React.FC = () => {
  const [model, setModel] = useState<LayoutModel>(
    createLayoutModel(
      createRow("root", [
        createTabSet("left-tabs", [
          createTab("tab-1", "dashboard", "Dashboard"),
          createTab("tab-2", "settings", "Settings"),
        ]),
      ])
    )
  );

  const factory = (node: any) => {
    switch (node.component) {
      case "dashboard":
        return <div>Dashboard</div>;
      case "settings":
        return <div>Settings</div>;
      default:
        return <div>Unknown</div>;
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <Layout model={model} factory={factory} onModelChange={setModel} />
    </div>
  );
};
```

## API Reference

### Layout Component

The main layout component.

#### Props

| Prop                   | Type                                    | Required | Description                               |
| ---------------------- | --------------------------------------- | -------- | ----------------------------------------- |
| `model`                | `LayoutModel`                           | Yes      | The layout model containing the structure |
| `factory`              | `(node: LayoutNode) => React.ReactNode` | Yes      | Factory function to render tab content    |
| `onModelChange`        | `(model: LayoutModel) => void`          | No       | Callback when layout changes              |
| `onAction`             | `(action: LayoutAction) => void`        | No       | Callback for layout actions               |
| `storage`              | `StorageOptions`                        | No       | Storage configuration                     |
| `className`            | `string`                                | No       | Additional CSS class                      |
| `style`                | `React.CSSProperties`                   | No       | Additional inline styles                  |
| `closeIcon`            | `React.ReactElement`                    | No       | Custom close icon for all tabs            |
| `closeButtonClassName` | `string`                                | No       | Custom CSS class for close buttons        |

### LayoutNode Types

- **row**: Horizontal container for organizing tabsets side by side
- **column**: Vertical container for organizing tabsets vertically
- **tabset**: Container for tabs
- **tab**: Individual tab content node

### Helper Functions

#### `createLayoutModel(layout: LayoutNode, global?: GlobalConfig): LayoutModel`

Creates a complete layout model with optional global configuration.

```tsx
const model = createLayoutModel(rootNode, {
  splitterSize: 8,
  direction: "ltr",
});
```

#### `createRow(id: string, children: LayoutNode[], flex?: number): LayoutNode`

Creates a row node (horizontal container).

```tsx
const row = createRow("root", [tabset1, tabset2], 1);
```

#### `createColumn(id: string, children: LayoutNode[], flex?: number): LayoutNode`

Creates a column node (vertical container).

```tsx
const column = createColumn("col1", [tabset1, tabset2], 0.5);
```

#### `createTabSet(id: string, children: TabNode[], flex?: number, selected?: number): LayoutNode`

Creates a tabset node.

```tsx
const tabset = createTabSet("tabs", [tab1, tab2], 1, 0);
```

#### `createTab(id: string, component: string, name: string, options?: TabOptions): TabNode`

Creates a tab node.

```tsx
const tab = createTab("tab1", "dashboard", "Dashboard", {
  enableClose: true,
  enableDrag: true,
});
```

## Direction Support

The layout manager supports both LTR (Left-to-Right) and RTL (Right-to-Left) directions.

### Setting Direction

```tsx
const model = createLayoutModel(layout, {
  direction: "rtl", // or "ltr"
});
```

### Dynamic Direction Changes

```tsx
const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

const model = createLayoutModel(layout, {
  direction,
});

// Toggle direction
const toggleDirection = () => {
  setDirection((prev) => (prev === "ltr" ? "rtl" : "ltr"));
};
```

### Features

- **LTR**: Default left-to-right layout
- **RTL**: Right-to-left layout with reversed row children
- **Dynamic**: Change direction at runtime
- **CSS Support**: Proper RTL styling with `dir` attribute

## Persistent Storage

The layout manager supports automatic localStorage persistence to save user customizations.

### Basic Storage Usage

```tsx
<Layout
  model={model}
  factory={factory}
  storage={{
    enabled: true,
    key: "my-layout",
    autoSave: true,
    debounceMs: 500,
  }}
/>
```

### Storage Options

| Option       | Type      | Default     | Description                    |
| ------------ | --------- | ----------- | ------------------------------ |
| `enabled`    | `boolean` | `false`     | Enable/disable storage         |
| `key`        | `string`  | `"default"` | Storage key for localStorage   |
| `autoSave`   | `boolean` | `true`      | Automatically save on changes  |
| `debounceMs` | `number`  | `500`       | Debounce delay in milliseconds |

### Manual Storage Control

```tsx
import { createLayoutStorage, LayoutModel } from "layout-manager-react";

const storage = createLayoutStorage({ key: "my-layout" });

// Save manually
storage.save(model);

// Load manually
const savedModel: LayoutModel | null = storage.load();

// Clear storage
storage.clear();

// Check if storage exists
if (storage.exists()) {
  // Load saved layout
}
```

### Storage Features

- **Automatic Saving**: Changes are automatically saved to localStorage
- **Debounced Writes**: Multiple rapid changes are batched to avoid excessive writes
- **Custom Keys**: Use different storage keys for multiple layouts
- **Manual Control**: Clear storage or disable auto-save as needed

## Drag & Drop

Full drag and drop support with 4 drop zones:

- **Center**: Add tab to existing tabset
- **Left**: Create new tabset to the left (50% width)
- **Right**: Create new tabset to the right (50% width)
- **Top/Bottom**: Create new tabset above/below (50% height)

Tabs can be dragged by enabling `enableDrag: true` on the tab node.

## Resizing

Tabsets can be resized by dragging the splitter between them. The layout automatically recalculates flex values to maintain proportional sizing.

## TypeScript Support

Full TypeScript definitions are included. Import types as needed:

```tsx
import type {
  LayoutModel,
  LayoutNode,
  LayoutProps,
  LayoutAction,
  LayoutRef,
} from "layout-manager-react";
```

## Styling

The library includes default styles, but you can customize them by overriding CSS classes:

- `.react-flex-layout` - Main layout container
- `.react-flex-layout-row` - Row container
- `.react-flex-layout-column` - Column container
- `.react-flex-layout-tabset` - Tabset container
- `.react-flex-layout-tab` - Individual tab
- `.react-flex-layout-splitter` - Resize splitter

### Custom Close Icons

You can customize the close icon for all tabs by passing a custom React element:

```tsx
const CustomCloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

// ⚠️ Important: Memoize closeIcon to prevent unnecessary re-renders
const memoizedCloseIcon = useMemo(() => <CustomCloseIcon />, []);

<Layout model={model} factory={factory} closeIcon={memoizedCloseIcon} />;
```

### Custom Close Button Styling

Apply custom CSS classes to close buttons:

```tsx
<Layout
  model={model}
  factory={factory}
  closeButtonClassName="my-custom-close-button"
/>

// In your CSS
.my-custom-close-button {
  border-radius: 50%;
  transition: all 0.2s ease;
}

.my-custom-close-button:hover {
  background-color: #e53935;
  transform: scale(1.1);
}
```

## Examples

See the `examples/` directory for more complete examples:

- `basic-usage.tsx` - Basic layout setup
- `advanced-usage.tsx` - Advanced features with storage and actions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Peer Dependencies

- `react`: >=16.8.0
- `react-dom`: >=16.8.0

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Repository

[GitHub Repository](https://github.com/hrashkan/layout-manager-react)
