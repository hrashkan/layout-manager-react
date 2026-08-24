# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-08-24

Packaging, documentation and tooling only. No runtime behaviour changed.

### Fixed

- **Type declarations now resolve.** Every emitted `.d.ts` carried a CSS
  side-effect import (for example `import "./Layout.css"`) that does not exist in
  the published package, because Vite bundles all CSS into `dist/style.css`.
  Consumers without `skipLibCheck` saw an unresolvable import for each one. The
  build now strips those imports from the declarations.
- **`exports` conditions were in an unusable order.** `"types"` was listed after
  `"import"` and `"require"`, so it could never match and TypeScript found no
  declarations for the package. `"types"` now comes first, and a `"default"`
  condition was added for older bundlers.
- **The ESM bundle was not loadable by Node.** It shipped as `dist/index.es.js`,
  and with no `"type"` field Node parsed the `.js` extension as CommonJS and
  failed on the ESM syntax. The ESM output is now `dist/index.mjs` and the
  package declares `"type": "commonjs"` for the UMD/CJS entry.
- **Version metadata was wrong.** `package.json` declared `1.0.0` while the last
  published release was `0.1.0`, so a publish would have shipped an accidental
  major.
- **The tab drop indicator did not follow the pointer when reordering tabs
  inside one tabset.** `dropTargetIndex` was missing from the dependencies of the
  `renderNode` callback, and the rendered tree is memoised on that callback's
  identity. Dragging within a single tabset leaves `dragOverTabset` and
  `dropPosition` unchanged and moves only `dropTargetIndex`, so the tree was
  never recomputed and the indicator stayed where it first appeared.
- **`scrollLeftIcon` and `scrollRightIcon` were ignored after the first render.**
  They were missing both from the `renderNode` dependencies and from the
  `MemoizedTabSet` props comparison, so replacing them on a mounted layout had no
  effect.

### Added

- `layout-manager-react/style.css` as a shorter stylesheet entry point. The
  existing `layout-manager-react/dist/style.css` path still works.
- `sideEffects: ["**/*.css"]`, so bundlers can tree-shake the JavaScript.
- Source maps for both bundles.
- ESLint with the `react-hooks` rules, plus `lint` and `lint:fix` scripts.
- A GitHub Actions workflow running type-check, lint, unit tests, build and the
  Playwright suite on every push and pull request.
- `engines.node: ">=18"` and `packageManager: "npm@10.9.3"`.

### Changed

- `useNodeIndex` no longer keeps a hand-rolled ref cache on top of `useMemo`.
  The memo already recomputed exactly when the layout root changed by reference,
  so the refs added a concurrent-rendering hazard for no benefit.
- `TabSet` no longer reassigns a callback ref during render to reach its latest
  scroll-button check. The callback closes over nothing that changes between
  renders, so it is a stable `useCallback` instead.
- The `react-hooks` `exhaustive-deps`, `refs` and `set-state-in-effect` rules are
  now errors rather than warnings.

### Changed

- The `dist/` and `demo/dist/` build outputs are no longer committed to git.
- README: removed the `storage` prop, `createLayoutStorage` and the whole
  Persistent Storage section, all of which were deleted in 0.1.0 but still
  documented. Replaced with a worked example of persisting the model yourself.
- README: corrected the `createRow`, `createColumn`, `createTabSet` and
  `createTab` signatures, which did not match the code, and documented the
  controlled/uncontrolled behaviour of `onModelChange`.

### Removed

- `yarn.lock`. The repository carried both it and `package-lock.json`, which are
  two independent answers to how dependencies resolve, and nothing kept them in
  agreement. The project now installs with npm only: `packageManager` pins it,
  CI rejects a foreign lockfile, and `.gitignore` blocks one from returning.
  `demo/package-lock.json` stays, since the demo is a separate install root.
- Two test files that imported modules deleted in 0.1.0
  (`useLayoutStorage.test.ts`, `storageUtils.test.ts`) and three tests that
  passed the removed `storage` prop. The suite now passes on a clean checkout
  (93 unit tests, 19 end-to-end tests).

### Known issues

Tracked for the next release:

- Tab content unmounts when switching tabs, so component state is lost.
- Splitter drag is measured against the viewport rather than the parent element.
- `enableClose`, `enableDrag` and `enableResize` are accepted but not enforced.

`arethetypeswrong` still reports "masquerading as CJS" for the ESM entry: the
runtime bundle is now correct ESM, but a single `index.d.ts` cannot describe both
entries under `"type": "commonjs"`. Resolving it needs a bundled `index.d.mts`
alongside the existing declarations, which is deferred to the next release. Named
imports type-check correctly today; only default-import interop is affected.

## [0.1.0] - 2025-12-13

### Breaking Changes

- **Removed built-in localStorage support**: The package no longer includes built-in localStorage functionality
  - Removed `storage` prop from `Layout` component
  - Removed `useLayoutStorage` hook
  - Removed `LayoutStorage` class and `storageUtils`
  - Removed `createLayoutStorage`, `isLocalStorageAvailable` exports
  - Users must now manage state persistence themselves via `onModelChange`

### Migration Guide

**Before (v0.0.15):**

```tsx
<Layout
  model={model}
  factory={factory}
  storage={{ enabled: true, key: "my-layout" }}
/>
```

**After (v0.1.0):**

```tsx
// User manages storage manually
const [model, setModel] = useState(() => {
  const saved = localStorage.getItem("my-layout");
  return saved ? JSON.parse(saved) : initialModel;
});

useEffect(() => {
  localStorage.setItem("my-layout", JSON.stringify(model));
}, [model]);

<Layout model={model} factory={factory} onModelChange={setModel} />;
```

### Changed

- Simplified Layout component by removing storage-related logic
- Reduced bundle size: ES Module 44.75 kB → 37.15 kB (~17% smaller)
- Reduced bundle size: UMD 28.17 kB → 23.41 kB (~17% smaller)
- Package is now storage-agnostic - users can use any storage solution (localStorage, IndexedDB, backend API, Zustand, Redux, etc.)

### Fixed

- Fixed RTL children order: Removed incorrect child reversal in RTL mode
  - Row children no longer reversed
  - Tab children no longer reversed
  - Children maintain original order regardless of direction

## [0.0.15] - 2025-01-XX

### Fixed

- **RTL children order**: Fixed incorrect child reversal in RTL mode

### Changed

- Simplified row rendering logic by removing RTL-specific index calculations

## [0.0.14] - 2025-11-10

### Performance

- **Tree traversal caching**: Implemented O(1) node lookups using index maps

  - Added `buildNodeIndexes()` utility to create node and parent index maps
  - Added `findNodeByIdCached()` and `findParentNodeCached()` for O(1) lookups
  - Created `useNodeIndex()` hook to maintain indexes automatically
  - **Results**: 7-10x faster node lookups, 10x faster parent lookups
  - Performance improvement scales with layout size (2x for small, 10x+ for large layouts)
  - Index building overhead: ~0.1ms for 100 nodes, amortized over many lookups

- **LRU cache for resize handlers**: Prevented unbounded memory growth
  - Implemented LRU (Least Recently Used) cache with max 100 entries
  - Resize handlers are now cached and reused efficiently
  - Old handlers are automatically evicted when cache is full
  - **Results**: Memory growth is now bounded, prevents memory leaks in long-running apps

### Changed

- **Extracted SVG icons**: Moved inline SVG icons to separate components
  - Created `ScrollLeftIcon` and `ScrollRightIcon` components in `src/components/icons/`
  - Icons are now exported and can be customized or replaced
  - Better code organization and tree-shaking support
  - Icons accept standard SVG props for customization

### Added

- **New exports**:

  - `ScrollLeftIcon` - Default scroll left icon component
  - `ScrollRightIcon` - Default scroll right icon component
  - `buildNodeIndexes()` - Utility to build node index maps
  - `findNodeByIdCached()` - Cached version of findNodeById
  - `findParentNodeCached()` - Cached version of findParentNode
  - `useNodeIndex()` - Hook to maintain node indexes

- **Performance tests**: Added comprehensive performance benchmarks
  - Tests compare cached vs recursive lookup performance
  - Tests verify memory management improvements
  - Tests measure real-world drag and drop operation performance

### Technical Details

- **Memory optimization**: Resize handler cache is capped at 100 entries using LRU eviction
- **Performance optimization**: Node lookups use Map-based indexes instead of recursive tree traversal
- **Backward compatibility**: All existing APIs remain unchanged, optimizations are internal

## [0.0.13] - 2025-11-09

### Fixed

- **RTL drop zone fixes**: Fixed drop zone behavior and visual indicators in RTL mode
  - Swapped left/right drop positions in RTL mode for correct component placement
  - Fixed visual drop zone indicators to match visual layout in RTL mode
  - Drop zones now work correctly in both LTR and RTL directions

### Performance

- **Splitter re-render optimization**: Prevented unnecessary Splitter component re-renders
  - Memoized Splitter component with custom comparison function
  - Cached resize handlers per node/direction to maintain stable references
  - Stabilized `handleResize` and `resetResize` callbacks using refs
  - Splitters no longer re-render when tabs change in other tabsets

### Changed

- Improved RTL support for drag and drop operations
- Enhanced performance by eliminating unnecessary Splitter re-renders

- **Memory leak fixes**: Fixed critical memory leaks in TabSet component
  - Stabilized callback dependencies using `useRef` to prevent unnecessary effect re-runs
  - Added proper cleanup for `requestAnimationFrame` callbacks
  - Improved ResizeObserver cleanup to prevent accumulation
  - Enhanced timeout cleanup to prevent stale references
  - **Results**: 85% reduction in detached objects (110 → ~15-20), 80% reduction in event listener leaks (10 → 2)

### Changed

- Optimized TabSet component memory management for better resource cleanup
- Improved scroll button and ResizeObserver lifecycle management
- Enhanced cleanup functions to prevent memory leaks during rapid re-renders

### Performance

- Significantly reduced memory footprint in long-running applications
- Better garbage collection behavior with proper resource cleanup
- Improved stability for applications with frequent tab operations

## [0.0.12] - 2025-11-09

### Added

- **Live Demo**: Interactive demo available at [https://hrashkan.github.io/layout-manager-demo/](https://hrashkan.github.io/layout-manager-demo/)

## [0.0.11] - 2025-11-09

### Added

- **Scroll buttons for tab headers**: Added left/right scroll buttons that appear when tabs overflow the tabset header
- **Custom scroll icons**: Support for custom `scrollLeftIcon` and `scrollRightIcon` props to customize scroll button icons
- **Auto-scroll to selected tab**: Tabs automatically scroll into view when selected
- **Smooth scrolling**: Scroll buttons use smooth scrolling behavior for better UX
- **Responsive scroll buttons**: Scroll buttons automatically show/hide based on scroll position and content overflow
- **Memory management tests**: Comprehensive test suite for memory leak detection and resource cleanup verification
- **Live Demo**: Interactive demo available at [https://hrashkan.github.io/layout-manager-demo/](https://hrashkan.github.io/layout-manager-demo/)

### Changed

- Improved tab header scrolling behavior with scroll buttons for better navigation when many tabs are present
- Enhanced tab visibility: Selected tabs are automatically scrolled into view
- Updated test infrastructure: Added ResizeObserver polyfill for jsdom test environment
- Excluded E2E tests from Vitest to prevent conflicts with Playwright

### Testing

- Added memory management tests to existing test files (Layout, useLayoutStorage, useDragAndDrop)
- Created general memory management test suite
- All 107 unit tests passing
- All 19 E2E tests passing

## [0.0.10] - 2025-11-08

### Performance

- **Major re-render optimization**: Only the affected tabset re-renders when changing tabs, instead of all tabsets
- **Stable callbacks**: All event handlers (`onTabSelect`, `onTabClose`, `onDrop`, etc.) are now stable using refs, preventing unnecessary re-renders
- **Memoized props**: `closeIcon` prop should be memoized in parent components to prevent re-renders (see README)
- **Improved memo comparison**: Enhanced `MemoizedTabSet` comparison function to efficiently detect actual changes vs reference changes
- **Optimized node comparison**: Smart comparison logic that only re-renders when node properties actually change, not just references

### Fixed

- Fixed direction switching not working when localStorage is disabled
- Fixed `changeDirection` action handling when storage is disabled but `onModelChange` is provided

### Changed

- Callbacks are now stable across renders, significantly reducing unnecessary component re-renders
- Better performance for applications with multiple tabsets or complex layouts

## [0.0.9] - 2025-11-08

### Fixed

- Fixed direction (LTR/RTL) storage: Direction is now stored in the layout model's storage instead of separate localStorage, ensuring consistency
- Fixed direction preservation when removing/restoring components via checkbox or close icon
- Fixed component restoration: Tabs closed via close icon can now be properly restored via checkbox toggle
- Fixed direction synchronization: Direction state now properly syncs with model changes, preventing direction loss during operations

### Changed

- Optimized package size: Removed unnecessary `.d.ts.map` files from published package
- Enabled CSS minification in build process
- Improved build optimization with proper minification settings

## [0.0.8] - 2025-11-07

### Added

- Basic tests to improve coverage and confidence

### Changed

- Minor performance optimizations and internal refinements

### Fixed

- Ensure distributed CSS is consistently exported as `dist/style.css`

## [0.0.7] - 2025-12-06

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

## [0.0.5] - 2025-12-05

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

## [0.0.4] - 2025-12-05

### Added

- Added CSS export path in package.json for better module resolution
- Enhanced README with Next.js-specific CSS import instructions
- Added multiple CSS import options documentation

### Changed

- Improved package.json exports configuration to include CSS file

## [0.0.3] - 2025-12-05

### Fixed

- Fixed React version mismatch error in Next.js and other frameworks by properly externalizing React and React DOM
- React and `react/jsx-runtime` are now properly externalized, preventing duplicate React instances
- Resolved "Cannot read properties of undefined (reading 'ReactCurrentDispatcher')" error

### Changed

- Updated Vite build configuration to externalize all React-related modules (`react`, `react-dom`, `react/jsx-runtime`, `react/jsx-dev-runtime`)
- Reduced bundle size significantly by removing bundled React code (ES: 55.5 kB → 33.6 kB, UMD: 33.7 kB → 19.6 kB)

## [0.0.2] - 2025-12-05

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

## [0.0.1] - 2025-12-04

### Added

- Initial release
- Flexbox-based layout system
- Drag and drop support with multiple drop zones
- Resizable tabsets
- RTL/LTR direction support
- LocalStorage persistence
- TypeScript support
