# React Flex Layout

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
npm install react-flex-layout
```

## Usage

```tsx
import React from "react";
import { Layout } from "react-flex-layout";

const MyApp = () => {
  const layoutModel = {
    layout: {
      id: "root",
      type: "row",
      children: [
        {
          id: "left-tabset",
          type: "tabset",
          children: [
            {
              id: "tab1",
              type: "tab",
              component: "component1",
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
      direction: "ltr", // or "rtl" for right-to-left
    },
  };

  const factory = (node) => {
    switch (node.component) {
      case "component1":
        return <div>Dashboard Content</div>;
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <Layout
      model={layoutModel}
      factory={factory}
      onModelChange={(model) => {
        // Handle model changes
      }}
    />
  );
};
```

## API

### Layout Props

| Prop            | Type                                    | Description                               |
| --------------- | --------------------------------------- | ----------------------------------------- |
| `model`         | `LayoutModel`                           | The layout model containing the structure |
| `factory`       | `(node: LayoutNode) => React.ReactNode` | Factory function to render tab content    |
| `onModelChange` | `(model: LayoutModel) => void`          | Callback when layout changes              |
| `className`     | `string`                                | Additional CSS class                      |
| `style`         | `React.CSSProperties`                   | Additional inline styles                  |

### LayoutNode Types

- **Row**: Horizontal container
- **Column**: Vertical container
- **TabSet**: Container for tabs
- **Tab**: Individual tab content

## Direction Support

The layout manager supports both LTR (Left-to-Right) and RTL (Right-to-Left) directions:

- **LTR**: Default left-to-right layout
- **RTL**: Right-to-left layout with reversed row children
- **Dynamic**: Change direction at runtime
- **CSS Support**: Proper RTL styling with `dir` attribute

```tsx
// Set direction in global config
const model = createLayoutModel(layout, {
  direction: "rtl", // or "ltr"
});
```

## Persistent Storage

The layout manager supports automatic localStorage persistence to save user customizations:

```tsx
<Layout
  model={model}
  factory={factory}
  storage={{
    enabled: true, // Enable storage (default: false)
    key: "my-layout", // Storage key (default: "default")
    autoSave: true, // Auto-save on changes (default: true)
    debounceMs: 500, // Debounce delay in ms (default: 500)
  }}
/>
```

**Storage Features:**

- **Automatic Saving**: Changes are automatically saved to localStorage
- **Debounced Writes**: Multiple rapid changes are batched to avoid excessive writes
- **Custom Keys**: Use different storage keys for multiple layouts
- **Manual Control**: Clear storage or disable auto-save as needed

```tsx
import { createLayoutStorage } from "react-flex-layout";

// Manual storage control
const storage = createLayoutStorage({ key: "my-layout" });
storage.save(model); // Save manually
const saved = storage.load(); // Load manually
storage.clear(); // Clear storage
```

## Drag & Drop

Supports 4 drop zones:

- **Center**: Add tab to existing tabset
- **Left**: Create new tabset to the left (50% width)
- **Right**: Create new tabset to the right (50% width)
- **Top/Bottom**: Create new tabset above/below (50% height)

## License

MIT
