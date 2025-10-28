# React Flex Layout

A modern React layout manager using flexbox with percentage-based sizing, similar to FlexLayout but simpler and more performant.

## Features

- 🎯 **Flexbox-based**: Uses CSS flexbox instead of absolute positioning
- 📏 **Percentage sizing**: Responsive layout with percentage-based dimensions
- 🔄 **Drag & Drop**: Full drag and drop support with 4 drop zones (center, left, right, top/bottom)
- 📐 **Resizable**: Resize tabsets with smooth mouse tracking
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
      onModelChange={(model) => console.log("Model changed:", model)}
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

## Drag & Drop

Supports 4 drop zones:

- **Center**: Add tab to existing tabset
- **Left**: Create new tabset to the left (50% width)
- **Right**: Create new tabset to the right (50% width)
- **Top/Bottom**: Create new tabset above/below (50% height)

## License

MIT
