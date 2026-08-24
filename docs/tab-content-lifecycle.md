# Tab content lifecycle (keep-alive)

Design note for the next correctness fix: inactive tabs currently **unmount**, so
React state, scroll position, form drafts, and live connections are lost on every
tab switch.

This document recommends how to add keep-alive **without surprising consumers**,
how to keep it cheap, and how apps should handle sockets / subscriptions.

---

## Decision

**Chosen: lazy keep-alive with `enableTabKeepAlive` default ON**, plus
`enableRenderOnDemand` and `useTabActive` in the same change.

---

## Today

```tsx
// TabSet content (simplified)
{selectedTab && factory(selectedTab)}
```

Only the selected tab’s panel is in the React tree. Switching tabs is a full
unmount → mount cycle.

That is fine for static panels. It is wrong for editors, forms, dashboards with
local UI state, and anything that looks like an IDE.

---

## Goals

1. Preserve panel state when the user switches away and back.
2. Do not explode memory when a tabset has many heavy tabs.
3. Do not break apps that today rely on `useEffect` cleanup on unmount
   (e.g. “socket closes when the tab unmounts”).
4. Stay competitive with FlexLayout-class managers (stateful panels by default).
5. Give a clear escape hatch per tab and globally.

---

## Options considered

| Approach | Behaviour | Pros | Cons |
|---|---|---|---|
| **A. Always mount all tabs** | Every tab in the tabset is mounted as soon as the tabset mounts | Simplest | Worst memory; mounts tabs the user never opens |
| **B. Remount every switch (today)** | Only selected tab mounted | Cheap; cleanup on leave is automatic | Loses all panel state |
| **C. Lazy keep-alive** | Mount on **first visit**, then **hide** (stay mounted). Unmount only when the tab is closed / removed from the model | Best balance | Soft break if default is ON |
| **D. Opt-in keep-alive only** | Same as C, but default OFF | Zero break | Opt-in forever means most users never get the fix; weak vs FlexLayout |

**Recommendation: C — lazy keep-alive**, with a global + per-tab escape hatch.

### Why lazy (not “mount everything”)

- A tabset with 12 tabs should not pay for 12 WebGL / chart / Monaco trees on first paint.
- First visit is the natural moment to mount (user chose that tab).
- After that, hide with `hidden` (or equivalent). React state stays; the browser
  skips painting the inactive panel.
- Closing a tab still removes it from the model → real unmount → real cleanup.

### Why not “always remount” as the long-term default

That is the current bug from a product perspective. Shipping keep-alive as
opt-in-only means the library keeps losing to FlexLayout on day-one UX.

---

## Recommended API (non-surprising, opt-out where it matters)

### Model flags

```ts
// LayoutModel.global
enableTabKeepAlive?: boolean; // default: true (recommended) OR false (safest migrate)

// LayoutNode (tab)
enableRenderOnDemand?: boolean; // default: false
// When true: this tab remounts every time it becomes selected (today’s behaviour).
```

Resolution (same pattern as `enableClose` / `enableDrag`):

```text
tab.enableRenderOnDemand
  → tabset.enableRenderOnDemand (if we allow it)
  → !global.enableTabKeepAlive
  → false
```

Practical rules:

| Intent | Setting |
|---|---|
| Default IDE-like panels | leave flags unset (keep-alive) |
| Heavy / one-shot panel | `tab.enableRenderOnDemand = true` |
| Whole app prefers remount | `global.enableTabKeepAlive = false` |

### Visibility context (for sockets and pause/resume)

Keep-alive means **unmount cleanup no longer runs on tab switch**. Apps need a
signal that the panel is hidden but still mounted:

```ts
// Proposed public hook
function useTabActive(): boolean;
```

Implementation sketch: `TabSet` wraps each panel in

```tsx
<TabActiveContext.Provider value={isSelected}>
  {factory(tab)}
</TabActiveContext.Provider>
```

Inactive panels stay mounted with `hidden` + `aria-hidden={true}`.

---

## Rendering sketch (optimized)

```tsx
// Pseudocode inside TabSet
const [mountedIds, setMountedIds] = useState(() => new Set(
  selectedTab ? [selectedTab.id] : []
));

useEffect(() => {
  if (!selectedTab) return;
  setMountedIds((prev) => {
    if (prev.has(selectedTab.id)) return prev;
    const next = new Set(prev);
    next.add(selectedTab.id);
    return next;
  });
}, [selectedTab?.id]);

// Drop ids that left the model (tab closed)
useEffect(() => {
  const live = new Set(tabs.map((t) => t.id));
  setMountedIds((prev) => {
    let changed = false;
    const next = new Set<string>();
    for (const id of prev) {
      if (live.has(id)) next.add(id);
      else changed = true;
    }
    return changed ? next : prev;
  });
}, [tabs]);

return (
  <div className="react-flex-layout-tabset-content">
    {tabs.map((tab) => {
      const active = tab.id === selectedTab?.id;
      const renderOnDemand = /* resolve flags */;
      const shouldMount = renderOnDemand
        ? active
        : keepAlive && mountedIds.has(tab.id);

      if (!shouldMount) return null;

      return (
        <div
          key={tab.id}
          className="react-flex-layout-tab-panel"
          hidden={!active}
          aria-hidden={!active}
        >
          <TabActiveContext.Provider value={active}>
            {factory(tab)}
          </TabActiveContext.Provider>
        </div>
      );
    })}
  </div>
);
```

Notes:

- Prefer the HTML `hidden` attribute over `display: none` in inline styles
  (clear semantics, less style thrash).
- Do **not** use `visibility: hidden` alone (still participates in layout).
- Keep `key={tab.id}` stable so React reuses the same instance.
- Memoization of `factory` results is **not** required if `factory` is stable and
  panels are keyed; avoid caching React elements in a Map (stale closures).

---

## Breaking-change analysis

| Consumer pattern | Keep-alive ON | Mitigation |
|---|---|---|
| Form / editor state in the panel | Fixed (desired) | — |
| `useEffect(() => connect(), [])` + cleanup on unmount to close a socket | Socket **stays open** while the tab is hidden | Use `useTabActive()` (below) or `enableRenderOnDemand` |
| Fetch-on-mount that should re-run every visit | Will **not** re-run | Depend on `useTabActive()` or remount flag |
| Measuring layout in `useLayoutEffect` on mount only | May be stale while hidden | Re-measure when `useTabActive()` becomes true |

### Default choice

Two honest defaults:

1. **`enableTabKeepAlive: true` (recommended for competitiveness)**  
   Soft break for socket-on-unmount apps. Document the migration in the
   changelog and README. Provide `useTabActive` + `enableRenderOnDemand` on day one.

2. **`enableTabKeepAlive: false` (safest)**  
   Zero behaviour change in 0.1.x. Flip the default in 0.2.0 after consumers
   have the docs. Slower path to “feels like FlexLayout”.

**Senior call for this package:** ship **lazy keep-alive default ON**, with
`enableRenderOnDemand` and `useTabActive` in the same PR so migration is one
read of the changelog — not a trap.

If you prefer zero risk for the next publish, ship default OFF and flip in 0.2.

---

## Usage guide

### 1. Normal UI panels (forms, settings, tables)

Do nothing. Keep-alive preserves state automatically.

```tsx
factory={(node) => {
  switch (node.component) {
    case "settings":
      return <SettingsForm />; // local useState survives tab switches
    default:
      return null;
  }
}}
```

### 2. WebSockets / SSE / polling (preferred pattern)

Keep the connection **lifecycle tied to visibility**, not to mount:

```tsx
import { useTabActive } from "layout-manager-react";

function LiveOrders() {
  const active = useTabActive();

  useEffect(() => {
    if (!active) return;

    const socket = connectOrders();
    socket.start();

    return () => {
      socket.stop(); // runs when tab becomes inactive OR unmounts
    };
  }, [active]);

  return <OrdersTable />;
}
```

What this gives you:

- First open → connect.
- Switch away → disconnect / pause (no wasted traffic).
- Switch back → reconnect (or resume, if your client supports it).
- Close tab → cleanup still runs (panel unmounts).

Alternative: keep the socket open while hidden (chat-style), and only pause UI
updates when `!active`. That is an app policy choice; the context supports both.

### 3. Panel that must remount every time (rare)

```ts
const reports = createTab("reports", "reports", "Reports");
reports.enableRenderOnDemand = true;
```

Use when:

- The panel is huge and rare.
- You intentionally want fresh data on every visit and no hidden tree.
- You have no visibility-aware code and need the old unmount behaviour.

### 4. Whole app wants old behaviour

```ts
createLayoutModel(layout, { enableTabKeepAlive: false });
```

### 5. What not to do

```tsx
// ❌ Assumes unmount on every tab switch — breaks under keep-alive
useEffect(() => {
  const ws = new WebSocket(url);
  return () => ws.close();
}, []);
```

```tsx
// ✅ Visibility-aware
useEffect(() => {
  if (!active) return;
  const ws = new WebSocket(url);
  return () => ws.close();
}, [active]);
```

---

## Performance checklist

- [ ] Lazy mount (first visit only), not mount-all.
- [ ] Unmount when the tab leaves the model (close / drag-away last instance).
- [ ] `hidden` + `aria-hidden` for inactive panels.
- [ ] Stable `key={tab.id}`.
- [ ] Per-tab `enableRenderOnDemand` for outliers.
- [ ] Do not clone elements into a cache Map.
- [ ] Ensure `MemoizedTabSet` still compares selection so active panel updates.
- [ ] Add unit tests: state preserved across select; unmount on close; remount when `enableRenderOnDemand`; `useTabActive` toggles.
- [ ] Add one e2e: type in a field, switch tab, switch back, value still there.

---

## Implementation order (when coding)

1. Add `TabActiveContext` + `useTabActive`.
2. Implement lazy keep-alive in `TabSet` (mounted id set).
3. Wire `enableTabKeepAlive` / `enableRenderOnDemand` with `isCapabilityEnabled`-style resolution.
4. CSS for `.react-flex-layout-tab-panel` if needed (`height: 100%`, etc.).
5. Tests + README section (short version of this guide).
6. Changelog: call out the soft break and the socket migration.

---

## Decision needed before coding

**Resolved:** default ON (lazy keep-alive), with `useTabActive` and
`enableRenderOnDemand` shipped together.
