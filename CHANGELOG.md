# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.8] - 2025-11-07

### Added

- Basic tests to improve coverage and confidence

### Changed

- Minor performance optimizations and internal refinements

### Fixed

- Ensure distributed CSS is consistently exported as `dist/style.css`

## [0.0.7] - 2024-12-19

### Added

- Component removal and restoration: Remove tabs/components from the layout and restore them to their original positions
- New utility functions: `removeTab`, `restoreTab`, `tabExists`, `addTabToTabset` for programmatic component management
- `ComponentRestoreData` interface: Memory-efficient storage of restoration metadata (~50-100 bytes per component)
- Layout metadata support: `LayoutModel` now includes optional `metadata` field for storing restoration data
- Tab ID preservation: Tabs maintain their original IDs during drag-and-drop operations, preventing component loss
- Integration with localStorage: Component removal states are persisted in the existing layout storage key

### Changed

- Drag-and-drop operations now preserve tab IDs instead of generating new ones, ensuring components remain identifiable
- `useLayoutStorage` hook now synchronizes with external model updates, supporting component restoration workflows
- `useDragAndDrop` hook preserves metadata during layout changes to maintain restoration data integrity

### Fixed

- Fixed issue where drag-and-drop operations would incorrectly mark components as removed
- Fixed component restoration when parent tabsets were removed and need to be recreated
- Improved memory efficiency by storing minimal restoration data instead of full node structures

## [0.0.5] - 2024-12-19

### Added

- Custom close icon support: Pass a custom React element as `closeIcon` prop to customize tab close icons
- Custom close button styling: Pass `closeButtonClassName` prop to apply custom CSS classes to close buttons
- Smooth drop zone transitions: All drop zone position changes now animate smoothly with cubic-bezier easing

### Changed

- Improved drop zone visual feedback: Enhanced transitions between center, top, bottom, left, and right drop positions
- Drop zone animations now use consistent width/height properties for smoother transitions
- Default close icon is now a fallback when no custom icon is provided

### Fixed

- Fixed drop zone transition animations for center-to-top and center-to-left directions
- Ensured all drop zone position changes use consistent CSS properties for proper animation

## [0.0.4] - 2024-12-19

### Added

- Added CSS export path in package.json for better module resolution
- Enhanced README with Next.js-specific CSS import instructions
- Added multiple CSS import options documentation

### Changed

- Improved package.json exports configuration to include CSS file

## [0.0.3] - 2024-12-19

### Fixed

- Fixed React version mismatch error in Next.js and other frameworks by properly externalizing React and React DOM
- React and `react/jsx-runtime` are now properly externalized, preventing duplicate React instances
- Resolved "Cannot read properties of undefined (reading 'ReactCurrentDispatcher')" error

### Changed

- Updated Vite build configuration to externalize all React-related modules (`react`, `react-dom`, `react/jsx-runtime`, `react/jsx-dev-runtime`)
- Reduced bundle size significantly by removing bundled React code (ES: 55.5 kB → 33.6 kB, UMD: 33.7 kB → 19.6 kB)

## [0.0.2] - 2024-12-19

### Added

- Tab reordering within the same tabset by dragging tabs over the header area
- Visual drop indicator (blue line) showing where tabs will be inserted when reordering
- Custom scrollbar styling for tab header when tabs overflow
- Support for `dropPosition: "tab"` for internal tab reordering

### Changed

- Tabs now maintain their natural width based on content and padding
- Tabs no longer shrink when space is limited - header scrolls instead
- Improved tab header scrolling behavior with custom scrollbar styling
- Optimized re-rendering: only the affected tabset re-renders when changing tabs
- Fixed React hooks ordering issue that caused "Rendered more hooks" error

### Fixed

- Fixed issue where changing tabs in one tabset caused all tabsets to re-render
- Fixed React hooks violation when `useMemo` was called after conditional return
- Fixed tab button sizing to maintain content-based width

### Performance

- Optimized model updates to preserve references when nothing changes
- Memoized callbacks to prevent unnecessary re-renders
- Improved `MemoizedTabSet` comparison function for better memoization

## [0.0.1] - 2024-12-18

### Added

- Initial release
- Flexbox-based layout system
- Drag and drop support with multiple drop zones
- Resizable tabsets
- RTL/LTR direction support
- LocalStorage persistence
- TypeScript support
