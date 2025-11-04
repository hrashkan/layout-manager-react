# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
