# Release Notes: v0.1.0

## 🎉 Minor Version Release

This is a **minor version release** with breaking changes. The package has been simplified by removing built-in localStorage support, making it more flexible and storage-agnostic.

## ⚠️ Breaking Changes

### Removed Built-in localStorage Support

The package no longer includes built-in localStorage functionality. This is a **breaking change** that requires migration.

**What was removed:**

- `storage` prop from `Layout` component
- `useLayoutStorage` hook
- `LayoutStorage` class
- `createLayoutStorage()` function
- `isLocalStorageAvailable()` function
- All storage-related exports

**Why:**

- More flexibility for users (can use any storage solution)
- Smaller bundle size (~17% reduction)
- Better for SSR/Next.js (no localStorage access during SSR)
- Clearer separation of concerns

## 📦 Bundle Size Improvements

| Format        | Before (v0.0.15) | After (v0.1.0) | Reduction           |
| ------------- | ---------------- | -------------- | ------------------- |
| ES Module     | 44.75 kB         | 37.15 kB       | **-7.6 kB (-17%)**  |
| UMD           | 28.17 kB         | 23.41 kB       | **-4.76 kB (-17%)** |
| ES (gzipped)  | 10.73 kB         | 9.22 kB        | **-1.5 kB (-14%)**  |
| UMD (gzipped) | 8.85 kB          | 7.59 kB        | **-1.26 kB (-14%)** |

## 🔄 Migration Guide

### Step 1: Update Your Code

**Before (v0.0.15):**

```tsx
import { Layout } from "layout-manager-react";

<Layout
  model={model}
  factory={factory}
  storage={{ enabled: true, key: "my-layout" }}
/>;
```

**After (v0.1.0):**

```tsx
import { Layout } from "layout-manager-react";
import { useState, useEffect } from "react";

const STORAGE_KEY = "my-layout";

function App() {
  // Load from localStorage on mount
  const [model, setModel] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load:", e);
      }
    }
    return initialModel;
  });

  // Save to localStorage when model changes (with debouncing)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(model));
      } catch (e) {
        console.error("Failed to save:", e);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [model]);

  return <Layout model={model} factory={factory} onModelChange={setModel} />;
}
```

### Step 2: Update Imports

Remove any imports of storage-related functions:

```tsx
// ❌ Remove these
import { useLayoutStorage, createLayoutStorage } from "layout-manager-react";

// ✅ Keep these
import { Layout, LayoutModel } from "layout-manager-react";
```

### Step 3: Alternative Storage Solutions

You can now use any storage solution:

**IndexedDB:**

```tsx
import { openDB } from "idb";

const db = await openDB("layout-db", 1);
await db.put("layouts", model, "my-layout");
```

**Backend API:**

```tsx
useEffect(() => {
  fetch("/api/layout")
    .then((res) => res.json())
    .then(setModel);
}, []);

useEffect(() => {
  fetch("/api/layout", {
    method: "POST",
    body: JSON.stringify(model),
  });
}, [model]);
```

**Zustand/Redux:**

```tsx
// Use your existing state management
const model = useLayoutStore((state) => state.model);
const setModel = useLayoutStore((state) => state.setModel);
```

## ✨ What's New

### Simplified API

- Cleaner `Layout` component props
- No storage configuration needed
- Full control over state management

### Better Flexibility

- Use any storage solution you prefer
- Better integration with existing state management
- Easier to test (no localStorage mocking needed)

### Performance

- Smaller bundle size
- No storage-related overhead
- Faster initial load

## 🐛 Bug Fixes

- **RTL children order**: Fixed incorrect child reversal in RTL mode
  - Children now maintain original order regardless of direction
  - CSS still handles visual RTL via `flex-direction: row-reverse`

## 📚 Documentation

- See `CHANGELOG.md` for detailed changes
- Demo updated to show manual localStorage handling
- Examples updated to reflect new API

## 🙏 Thanks

This major version focuses on simplicity and flexibility. Users now have full control over how they persist layout state, making the package more versatile and easier to integrate with different architectures.

---

**Ready to release!** 🎉
