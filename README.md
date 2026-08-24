# Layout Manager React

A modern React layout manager using flexbox with percentage-based sizing, similar to FlexLayout but simpler and more performant.

## 🚀 Live Demo

Try it out: **[https://hrashkan.github.io/layout-manager-demo/](https://hrashkan.github.io/layout-manager-demo/)**

## Features

- 🎯 **Flexbox-based**: Uses CSS flexbox instead of absolute positioning
- 📏 **Percentage sizing**: Responsive layout with percentage-based dimensions
- 🔄 **Drag & Drop**: Full drag and drop support with 4 drop zones (center, left, right, top/bottom)
- 📐 **Resizable**: Resize tabsets with smooth mouse tracking
- 🌍 **RTL/LTR Support**: Full right-to-left and left-to-right direction support
- 🎨 **Customizable**: Easy to style and customize
- 🪶 **Small**: ~9 kB gzipped JavaScript plus ~1 kB of CSS, with React as the only peer dependency
- 🔗 **Broad compatibility**: Works on React 16.8+ and ships both ESM and UMD builds
- 🧠 **Tab keep-alive**: Panels mount once and stay mounted while you switch tabs
- 🔒 **Type Safe**: Full TypeScript support

> **Persistence:** built-in `localStorage` support was removed in v0.1.0 to keep the
> package small. The layout model is plain JSON, so you can persist it yourself —
> see [Persisting the layout](#persisting-the-layout).

## Installation

```bash
npm install layout-manager-react
```

To update to the latest version:

```bash
npm install layout-manager-react@latest
# or
npm update layout-manager-react
```

**Bundle Size**: Check the package size on [Bundlephobia](https://bundlephobia.com/package/layout-manager-react)

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
import "layout-manager-react/style.css";
```

The longer `layout-manager-react/dist/style.css` path also works and is kept for
backwards compatibility.

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
| `className`            | `string`                                | No       | Additional CSS class                      |
| `style`                | `React.CSSProperties`                   | No       | Additional inline styles                  |
| `splitterStyles`       | `{ default?, hover?, active? }`         | No       | Inline styles for splitters, per state    |
| `closeIcon`            | `React.ReactElement`                    | No       | Custom close icon for all tabs            |
| `closeButtonClassName` | `string`                                | No       | Custom CSS class for close buttons        |
| `scrollLeftIcon`       | `React.ReactElement`                    | No       | Custom icon for the scroll-left button    |
| `scrollRightIcon`      | `React.ReactElement`                    | No       | Custom icon for the scroll-right button   |

When `onModelChange` is supplied the component is **controlled**: it reports the next
model and renders whatever you pass back in `model`. Omit `onModelChange` and it keeps
the model in internal state instead.

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

#### `createRow(id, children, width?, height?): LayoutNode`

Creates a row node (horizontal container). Children get an even `flex` share unless
they already carry one. `width` and `height` are percentages.

```tsx
const row = createRow("root", [tabset1, tabset2]);
```

#### `createColumn(id, children, width?, height?): LayoutNode`

Creates a column node (vertical container), with the same sizing rules as `createRow`.

```tsx
const column = createColumn("col1", [tabset1, tabset2]);
```

#### `createTabSet(id, children, selected?): LayoutNode`

Creates a tabset node. `selected` is the index of the active tab and defaults to `0`.

```tsx
const tabset = createTabSet("tabs", [tab1, tab2], 0);
```

#### `createTab(id, component, name, config?): LayoutNode`

Creates a tab node. `component` is the key your `factory` switches on; `config` is an
arbitrary object carried along with the tab.

```tsx
const tab = createTab("tab1", "dashboard", "Dashboard", { filter: "active" });
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

## Persisting the layout

Built-in `localStorage` persistence was removed in v0.1.0. `LayoutModel` is plain
JSON, so persisting it is a few lines and keeps you in control of the storage
backend, the key and the migration strategy:

```tsx
import { useCallback, useState } from "react";
import { Layout, type LayoutModel } from "layout-manager-react";

const STORAGE_KEY = "my-layout";

const loadModel = (fallback: LayoutModel): LayoutModel => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as LayoutModel) : fallback;
  } catch {
    return fallback;
  }
};

const App = () => {
  const [model, setModel] = useState<LayoutModel>(() => loadModel(defaultModel));

  const handleModelChange = useCallback((next: LayoutModel) => {
    setModel(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage full or unavailable — keep the in-memory layout
    }
  }, []);

  return (
    <Layout model={model} factory={factory} onModelChange={handleModelChange} />
  );
};
```

If a layout changes rapidly (for example while dragging a splitter), debounce the
write rather than saving on every model update.

> **Note:** validate anything you read back from storage. A model saved by an older
> version of your app may not match the current shape.

## Drag & Drop

Full drag and drop support with 4 drop zones:

- **Center**: Add tab to existing tabset
- **Left**: Create new tabset to the left (50% width)
- **Right**: Create new tabset to the right (50% width)
- **Top/Bottom**: Create new tabset above/below (50% height)

> **Capability flags:** `enableClose`, `enableDrag` and `enableResize` are
> respected at the node, parent and global levels. The first defined value wins
> (tab → tabset → `model.global` → default `true`). Set a flag to `false` to lock
> that behaviour; leave it unset to inherit.

## Tab content keep-alive

By default, a tab’s panel is mounted the first time you open it and then **kept
mounted** (hidden) when you switch away, so form state, scroll position and React
state survive. Closing the tab still unmounts it.

```tsx
import { useTabActive } from "layout-manager-react";

function LivePanel() {
  const active = useTabActive();

  useEffect(() => {
    if (!active) return;
    const socket = connect();
    return () => socket.close();
  }, [active]);

  return <div>...</div>;
}
```

| Need | How |
|---|---|
| Default IDE-like panels | do nothing |
| Pause work while hidden (sockets, polling) | `useTabActive()` |
| Remount this tab every visit | `tab.enableRenderOnDemand = true` |
| Old remount-everywhere behaviour | `createLayoutModel(layout, { enableTabKeepAlive: false })` |

See [`docs/tab-content-lifecycle.md`](docs/tab-content-lifecycle.md) for the full design.

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

- **Live Demo**: [https://hrashkan.github.io/layout-manager-demo/](https://hrashkan.github.io/layout-manager-demo/) - Interactive demo with all features

See the `examples/` directory for more complete examples:

- `basic-usage.tsx` - Basic layout setup
- `advanced-usage.tsx` - Actions, imperative ref usage and custom styling

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
