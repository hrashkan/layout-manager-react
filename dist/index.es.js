import { jsxs as ae, jsx as R } from "react/jsx-runtime";
import fe, { useCallback as S, useMemo as be, memo as ye, useState as M, useRef as le, useEffect as de, forwardRef as Re, useImperativeHandle as Ne } from "react";
const ze = ({
  size: e = 16,
  color: t = "#666",
  className: n = ""
}) => /* @__PURE__ */ ae(
  "svg",
  {
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: t,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: n,
    children: [
      /* @__PURE__ */ R("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ R("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
), xe = ({
  node: e,
  index: t,
  onClose: n,
  onSelect: i,
  onDragStart: l,
  onDragEnd: s,
  className: r = "",
  style: h = {},
  closeIcon: d,
  closeButtonClassName: b = ""
}) => {
  const T = S(() => {
    i?.(e.id);
  }, [e.id, i]), y = S(
    (v) => {
      v.stopPropagation(), n?.(e.id);
    },
    [e.id, n]
  ), I = S(
    (v) => {
      v.dataTransfer.setData("text/plain", e.id), v.dataTransfer.effectAllowed = "move", v.currentTarget.classList.add("dragging"), document.body.classList.add("dragging"), l?.(e.id, t);
    },
    [e.id, t, l]
  ), D = S(
    (v) => {
      v.currentTarget.classList.remove("dragging"), document.body.classList.remove("dragging"), s?.();
    },
    [s]
  );
  return /* @__PURE__ */ ae(
    "div",
    {
      className: `react-flex-layout-tab ${r}`,
      style: { ...h, cursor: "grab" },
      onClick: T,
      draggable: !0,
      onDragStart: I,
      onDragEnd: D,
      children: [
        /* @__PURE__ */ R("span", { className: "react-flex-layout-tab-title", children: e.name || "Untitled" }),
        /* @__PURE__ */ R(
          "button",
          {
            className: `react-flex-layout-tab-close ${b}`.trim(),
            onClick: y,
            type: "button",
            "aria-label": "Close tab",
            children: d || /* @__PURE__ */ R(ze, {})
          }
        )
      ]
    }
  );
}, He = ({
  node: e,
  children: t,
  factory: n,
  onTabSelect: i,
  onTabClose: l,
  onTabDragStart: s,
  onTabDragEnd: r,
  onDragOver: h,
  onDragLeave: d,
  onDrop: b,
  dragOverTabset: T,
  dropPosition: y,
  dropTargetIndex: I,
  direction: D = "ltr",
  className: v = "",
  style: k = {},
  closeIcon: C,
  closeButtonClassName: g
}) => {
  const u = be(() => e.children?.filter((c) => c.type === "tab") || [], [e.children]), f = be(() => D === "rtl" ? [...u].reverse() : u, [u, D]), p = e.selected ?? 0, m = Math.min(
    p,
    Math.max(0, u.length - 1)
  ), H = u[m], Y = S(
    (c) => {
      const x = u.findIndex((B) => B.id === c);
      x !== -1 && i?.(e.id, x);
    },
    [e.id, u, i]
  ), N = S(
    (c) => {
      const x = u.findIndex((B) => B.id === c);
      x !== -1 && l?.(e.id, x);
    },
    [e.id, u, l]
  ), G = S(
    (c, x) => {
      const B = x !== void 0 ? x : u.findIndex((F) => F.id === c);
      B !== -1 && s?.(e.id, B);
    },
    [e.id, u, s]
  ), re = S(
    (c) => {
      c.preventDefault(), c.dataTransfer.dropEffect = "move";
      const x = c.currentTarget.getBoundingClientRect(), B = c.clientX - x.left, F = c.clientY - x.top, ee = x.width, P = x.height;
      let V = "center";
      if (F < 40) {
        const $ = c.currentTarget.querySelector(".react-flex-layout-tabset-header")?.getBoundingClientRect();
        if ($) {
          const q = c.clientX - $.left, _ = c.currentTarget.querySelectorAll(
            ".react-flex-layout-tab"
          );
          let o = u.length;
          if (D === "rtl") {
            for (let w = _.length - 1; w >= 0; w--) {
              const O = _[w].getBoundingClientRect(), A = O.left - $.left, j = O.right - $.left, J = (A + j) / 2;
              if (q > J) {
                o = u.findIndex(
                  (te) => te.id === f[w].id
                );
                break;
              }
            }
            if (o === u.length && _.length > 0) {
              const w = _[0].getBoundingClientRect();
              q > w.right - $.left && (o = u.findIndex(
                (A) => A.id === f[0].id
              ));
            }
          } else
            for (let w = 0; w < _.length; w++) {
              const O = _[w].getBoundingClientRect(), A = O.left - $.left, j = O.right - $.left, J = (A + j) / 2;
              if (q < J) {
                o = u.findIndex(
                  (te) => te.id === f[w].id
                );
                break;
              }
            }
          o === u.length && (o = u.length), V = "tab", h?.(c, e.id, V, o);
          return;
        }
      }
      B < ee * 0.25 ? V = "left" : B > ee * 0.75 ? V = "right" : F < P * 0.25 ? V = "top" : F > P * 0.75 ? V = "bottom" : V = "center", h?.(c, e.id, V);
    },
    [e.id, u, f, h]
  ), ie = S(
    (c) => {
      d?.(c);
    },
    [d]
  ), z = S(
    (c) => {
      b?.(c, e.id);
    },
    [e.id, b]
  ), L = T === e.id, K = {
    ...k,
    width: e.width ? `${e.width}%` : void 0,
    height: e.height ? `${e.height}%` : void 0,
    flex: `${e.flex || 1} 1 0%`,
    minWidth: e.minWidth ? `${e.minWidth}px` : void 0,
    minHeight: e.minHeight ? `${e.minHeight}px` : void 0,
    maxWidth: e.maxWidth ? `${e.maxWidth}px` : void 0,
    maxHeight: e.maxHeight ? `${e.maxHeight}px` : void 0
  };
  return u.length === 0 ? null : /* @__PURE__ */ ae(
    "div",
    {
      className: `react-flex-layout-tabset ${L ? "drag-over" : ""} ${v}`,
      style: K,
      "data-drop-position": L ? y : void 0,
      onDragOver: re,
      onDragLeave: ie,
      onDrop: z,
      children: [
        /* @__PURE__ */ ae("div", { className: "react-flex-layout-tabset-header", children: [
          f.map((c) => {
            const x = u.findIndex((ee) => ee.id === c.id), B = x === m, F = L && y === "tab" && I !== null && x === I;
            return /* @__PURE__ */ ae(fe.Fragment, { children: [
              F && /* @__PURE__ */ R("div", { className: "react-flex-layout-tab-drop-indicator" }),
              /* @__PURE__ */ R(
                xe,
                {
                  node: c,
                  index: x,
                  onSelect: Y,
                  onClose: N,
                  onDragStart: G,
                  onDragEnd: r,
                  className: B ? "active" : "",
                  closeIcon: C,
                  closeButtonClassName: g
                }
              )
            ] }, c.id);
          }),
          L && y === "tab" && I !== null && I === u.length && /* @__PURE__ */ R("div", { className: "react-flex-layout-tab-drop-indicator" })
        ] }),
        /* @__PURE__ */ R("div", { className: "react-flex-layout-tabset-content", children: H && (n ? n(H) : t) })
      ]
    }
  );
}, ve = ye(
  He,
  (e, t) => {
    if (e.node !== t.node) {
      if (e.node.id !== t.node.id || e.node.selected !== t.node.selected || e.node.width !== t.node.width || e.node.height !== t.node.height || e.node.flex !== t.node.flex || e.node.minWidth !== t.node.minWidth || e.node.minHeight !== t.node.minHeight || e.node.maxWidth !== t.node.maxWidth || e.node.maxHeight !== t.node.maxHeight) return !1;
      const n = e.node.children || [], i = t.node.children || [];
      if (n.length !== i.length) return !1;
      for (let l = 0; l < n.length; l++)
        if (n[l] !== i[l]) {
          const s = n[l], r = i[l];
          if (s.id !== r.id || s.type !== r.type || s.name !== r.name || s.component !== r.component || s.enableClose !== r.enableClose || s.enableDrag !== r.enableDrag)
            return !1;
        }
    }
    return !(e.className !== t.className || e.direction !== t.direction || e.dragOverTabset !== t.dragOverTabset || e.dropPosition !== t.dropPosition || e.factory !== t.factory || e.onTabSelect !== t.onTabSelect || e.onTabClose !== t.onTabClose || e.onTabDragStart !== t.onTabDragStart || e.onTabDragEnd !== t.onTabDragEnd || e.onDragOver !== t.onDragOver || e.onDragLeave !== t.onDragLeave || e.onDrop !== t.onDrop);
  }
);
ve.displayName = "MemoizedTabSet";
const me = ({
  direction: e,
  onResize: t,
  onResizeStart: n,
  size: i = 8,
  className: l = "",
  style: s = {},
  customStyles: r = {}
}) => {
  const [h, d] = M(!1), b = le(0), T = S(
    (v) => {
      v.preventDefault(), v.stopPropagation(), d(!0), b.current = e === "horizontal" ? v.clientX : v.clientY, n?.();
      const k = (g) => {
        const f = (e === "horizontal" ? g.clientX : g.clientY) - b.current;
        t(f);
      }, C = () => {
        d(!1), document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", C);
      };
      document.addEventListener("mousemove", k), document.addEventListener("mouseup", C);
    },
    [e, t, n]
  ), y = {
    backgroundColor: "#ffffff",
    border: "none",
    outline: "none"
  }, I = () => h && r.active ? r.active : r.default ? r.default : y, D = {
    ...s,
    width: e === "horizontal" ? `${i}px` : "100%",
    height: e === "vertical" ? `${i}px` : "100%",
    minWidth: e === "horizontal" ? `${i}px` : void 0,
    minHeight: e === "vertical" ? `${i}px` : void 0,
    flexShrink: 0,
    cursor: e === "horizontal" ? "col-resize" : "row-resize",
    ...I(),
    transition: h ? "none" : "all 0.2s ease"
  };
  return /* @__PURE__ */ R(
    "div",
    {
      className: `react-flex-layout-splitter ${l}`,
      style: D,
      onMouseDown: T
    }
  );
}, Ue = (e, t) => ({
  global: {
    enableClose: !0,
    enableDrag: !0,
    enableResize: !0,
    splitterSize: 8,
    tabOverlapLength: 0,
    direction: "ltr",
    ...t
  },
  layout: e
}), Oe = (e, t, n, i) => ({
  id: e,
  type: "tab",
  component: t,
  name: n,
  config: i,
  enableClose: !0,
  enableDrag: !0
}), Se = (e, t, n = 0) => ({
  id: e,
  type: "tabset",
  children: t,
  selected: n,
  enableClose: !0,
  enableDrag: !0
}), We = (e, t, n, i) => ({
  id: e,
  type: "row",
  children: Ie(t),
  width: n,
  height: i,
  enableResize: !0
}), Ee = (e, t, n, i) => ({
  id: e,
  type: "column",
  children: Ie(t),
  width: n,
  height: i,
  enableResize: !0
}), U = (e, t) => {
  if (e.id === t)
    return e;
  if (e.children)
    for (const n of e.children) {
      const i = U(n, t);
      if (i)
        return i;
    }
  return null;
}, Te = (e, t) => {
  if (!e.children)
    return null;
  for (const n of e.children)
    if (n.id === t)
      return e;
  for (const n of e.children) {
    const i = Te(n, t);
    if (i)
      return i;
  }
  return null;
}, E = (e, t, n) => {
  if (e.id === t)
    return n === null ? null : Object.keys(n).some(
      (l) => e[l] !== n[l]
    ) ? { ...e, ...n } : e;
  if (e.children) {
    let i = !1;
    const l = e.children.map((s) => {
      const r = E(s, t, n);
      return r !== s && (i = !0), r;
    }).filter((s) => s !== null);
    return i ? {
      ...e,
      children: l
    } : e;
  }
  return e;
}, pe = (e, t) => {
  if (e.children) {
    const n = e.children.filter((i) => i.id !== t).map((i) => pe(i, t));
    return {
      ...e,
      children: n
    };
  }
  return e;
}, Ie = (e) => e.map((t) => ({
  ...t,
  flex: t.flex || 1 / e.length
})), oe = (e) => {
  if (e.type === "tabset" && (!e.children || e.children.length === 0))
    return null;
  if (e.children) {
    const t = e.children.length, n = e.children.map(oe).filter((l) => l !== null), i = n.length < t;
    if (n.length === 0)
      return null;
    if ((e.type === "row" || e.type === "column") && n.length > 0) {
      const l = n.reduce(
        (r, h) => r + (h.flex || 0),
        0
      );
      if (i || l < 0.999 || n.length === 1) {
        let r;
        if (n.length === 1)
          r = n.map((h) => ({
            ...h,
            flex: 1
          }));
        else if (l === 0 || l < 1e-3) {
          const h = 1 / n.length;
          r = n.map((d) => ({
            ...d,
            flex: h
          }));
        } else {
          const h = 1 / l;
          r = n.map((d) => ({
            ...d,
            flex: (d.flex || 0) * h
          }));
        }
        return {
          ...e,
          children: r
        };
      }
      if (n.length !== t || n.some(
        (r, h) => r !== e.children?.[h]
      ))
        return {
          ...e,
          children: n
        };
    }
    if (n !== e.children)
      return {
        ...e,
        children: n
      };
  }
  return e;
}, De = (e, t, n = null) => {
  if (!e.children) return null;
  for (const i of e.children) {
    if (i.id === t)
      return n || e;
    if (i.children) {
      const l = De(i, t, e);
      if (l) return l;
    }
  }
  return null;
}, Le = (e, t) => {
  if (!e.children) return null;
  for (const n of e.children) {
    if (n.type === "tabset" && n.children && n.children.find((l) => l.id === t))
      return n;
    if (n.children) {
      const i = Le(n, t);
      if (i) return i;
    }
  }
  return null;
}, ke = (e, t, n) => {
  const i = U(e, t);
  if (!i || i.type !== "tabset")
    return null;
  const s = [...i.children || [], n], r = {
    ...i,
    children: s,
    selected: s.length - 1
  };
  return E(e, t, r);
}, qe = (e, t) => {
  const n = Le(e, t);
  if (!n || n.type !== "tabset")
    return { layout: e, restoreData: null };
  const i = n.children?.find((y) => y.id === t);
  if (!i || i.type !== "tab")
    return { layout: e, restoreData: null };
  const l = n.children?.findIndex(
    (y) => y.id === t
  ), s = n.children?.filter(
    (y) => y.id !== t
  );
  if (!s || s.length === 0) {
    const y = pe(e, n.id), I = {
      tabId: i.id,
      component: i.component || "",
      name: i.name || "",
      tabsetId: n.id,
      tabIndex: l !== void 0 ? l : 0,
      config: i.config
    };
    return {
      layout: y,
      restoreData: I
    };
  }
  const r = n.selected ?? 0;
  let h = r;
  l !== void 0 && l !== -1 && (l <= r && (h = Math.max(0, r - 1)), h = Math.min(h, s.length - 1));
  const d = {
    ...n,
    children: s,
    selected: s.length > 0 ? h : void 0
  }, b = E(e, n.id, d), T = {
    tabId: i.id,
    component: i.component || "",
    name: i.name || "",
    tabsetId: n.id,
    tabIndex: l !== void 0 ? l : 0,
    config: i.config
  };
  return {
    layout: b,
    restoreData: T
  };
}, Ye = (e, t, n) => {
  if (U(e, t.tabId))
    return e;
  let l = U(e, t.tabsetId);
  if (!l || l.type !== "tabset") {
    if (!n)
      return null;
    const h = De(
      n,
      t.tabsetId
    );
    if (!h)
      return null;
    const d = U(e, h.id);
    if (!d || !d.children)
      return null;
    const b = d.children.find(
      (T) => T.id === t.tabsetId
    );
    if (b)
      l = b;
    else {
      const T = Se(t.tabsetId, []), y = [...d.children, T], I = {
        ...d,
        children: y
      }, D = E(
        e,
        d.id,
        I
      );
      if (!D || (e = D, l = U(e, t.tabsetId), !l || l.type !== "tabset"))
        return null;
    }
  }
  const s = Oe(
    t.tabId,
    t.component,
    t.name,
    t.config
  );
  return ke(e, t.tabsetId, s);
}, Ge = (e, t) => U(e, t) !== null, Fe = (e, t) => {
  const n = le({}), i = S(
    (s, r, h) => {
      if (!t) return;
      const d = we(e.layout, s);
      if (!d || !d.children) return;
      const b = d.children.findIndex(
        (m) => m.id === s
      ), T = b + 1;
      if (T >= d.children.length) return;
      const y = `${s}-${h}`;
      if (!n.current[y]) {
        const m = d.children[b], H = d.children[T];
        n.current[y] = {
          current: m.flex || 1,
          sibling: H.flex || 1
        };
      }
      const I = n.current[y], D = I.current + I.sibling, v = h === "horizontal" ? window.innerWidth : window.innerHeight, k = I.current / D * v, C = I.sibling / D * v, g = 100;
      let u = k + r, f = C - r;
      if (u < g) {
        const m = g - u;
        u = g, f -= m;
      }
      if (f < g) {
        const m = g - f;
        f = g, u -= m;
      }
      const p = u + f;
      if (p > 0) {
        const m = u / p * D, H = f / p * D, Y = E(e.layout, d.id, {
          children: d.children.map((N, G) => G === b ? { ...N, flex: m } : G === T ? { ...N, flex: H } : N)
        });
        Y && t({
          ...e,
          layout: Y
        });
      }
    },
    [e, t]
  ), l = S(
    (s, r) => {
      const h = `${s}-${r}`;
      delete n.current[h];
    },
    []
  );
  return { handleResize: i, resetResize: l };
}, we = (e, t) => {
  if (!e.children) return null;
  for (const n of e.children) {
    if (n.id === t)
      return e;
    const i = we(n, t);
    if (i) return i;
  }
  return null;
}, Ke = (e, t) => {
  const [n, i] = M(null), [l, s] = M(null), [r, h] = M("center"), [d, b] = M(null), T = le(null), y = S((C, g) => {
    const u = { tabsetId: C, tabIndex: g };
    i(u), T.current = u;
  }, []), I = S(() => {
    i(null), T.current = null, s(null), b(null);
  }, []), D = S(
    (C, g, u = "center", f) => {
      C.preventDefault(), C.dataTransfer.dropEffect = "move", s(g), h(u), f !== void 0 ? b(f) : u !== "tab" && b(null);
    },
    []
  ), v = S((C) => {
    C.currentTarget === C.target && setTimeout(() => {
      s(null), b(null);
    }, 50);
  }, []), k = S(
    (C, g) => {
      C.preventDefault();
      const u = T.current;
      if (!u || !t)
        return;
      const { tabsetId: f, tabIndex: p } = u;
      if (f === g && r === "tab" && d !== null) {
        const z = U(e.layout, f);
        if (!z || !z.children)
          return;
        const L = z.children[p];
        if (!L || p === d)
          return;
        const K = [...z.children];
        K.splice(p, 1), K.splice(d, 0, L);
        let c = z.selected ?? 0;
        p < c && d >= c ? c = Math.max(0, c - 1) : p > c && d <= c ? c = Math.min(c + 1, K.length - 1) : p === c && (c = d);
        const x = E(e.layout, f, {
          children: K,
          selected: c
        });
        x && t({
          ...e,
          layout: x,
          metadata: e.metadata
        }), i(null), s(null), b(null);
        return;
      }
      if (f === g && r !== "tab")
        return;
      const m = U(e.layout, f), H = U(e.layout, g);
      if (!m || !H || !m.children || !H.children)
        return;
      const Y = m.children[p];
      if (!Y)
        return;
      let N = e.layout;
      const G = m.children.filter(
        (z, L) => L !== p
      ), re = E(
        N,
        f,
        {
          children: G,
          selected: Math.min(
            m.selected || 0,
            G.length - 1
          )
        }
      );
      if (!re) return;
      if (N = re, r === "center") {
        const z = E(
          N,
          g,
          {
            children: [...H.children || [], Y],
            selected: H.children?.length || 0
          }
        );
        if (!z) return;
        N = z;
      } else {
        const z = Se(
          `${g}-split-${Date.now()}`,
          [Y]
        ), L = Te(N, g);
        if (L) {
          const K = L.children?.findIndex(
            (c) => c.id === g
          ) || 0;
          if (r === "left" || r === "right") {
            const c = We(`${g}-row-${Date.now()}`, [
              r === "left" ? z : H,
              r === "left" ? H : z
            ]), x = E(
              N,
              L.id,
              {
                children: [
                  ...L.children?.slice(0, K) || [],
                  c,
                  ...L.children?.slice(K + 1) || []
                ]
              }
            );
            if (!x) return;
            N = x;
          } else if (r === "top" || r === "bottom") {
            const c = Ee(
              `${g}-column-${Date.now()}`,
              [
                r === "top" ? z : H,
                r === "top" ? H : z
              ]
            ), x = E(
              N,
              L.id,
              {
                children: [
                  ...L.children?.slice(0, K) || [],
                  c,
                  ...L.children?.slice(K + 1) || []
                ]
              }
            );
            if (!x) return;
            N = x;
          }
        }
      }
      const ie = oe(N);
      ie && t({
        ...e,
        layout: ie,
        metadata: e.metadata
      }), i(null), s(null);
    },
    [e, t, r, d]
  );
  return {
    draggedTab: n,
    dragOverTabset: l,
    dropPosition: r,
    dropTargetIndex: d,
    handleDragStart: y,
    handleDragEnd: I,
    handleDragOver: D,
    handleDragLeave: v,
    handleDrop: k
  };
}, Be = "react-flex-layout";
class Ce {
  storageKey;
  autoSave;
  debounceMs;
  saveTimeout = null;
  constructor(t = {}) {
    this.storageKey = `${Be}-${t.key || "default"}`, this.autoSave = t.autoSave !== !1, this.debounceMs = t.debounceMs || 500;
  }
  save(t) {
    try {
      const n = JSON.stringify(t);
      localStorage.setItem(this.storageKey, n);
    } catch {
    }
  }
  load() {
    try {
      const t = localStorage.getItem(this.storageKey);
      if (t)
        return JSON.parse(t);
    } catch {
    }
    return null;
  }
  clear() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch {
    }
  }
  exists() {
    return localStorage.getItem(this.storageKey) !== null;
  }
  debouncedSave(t) {
    this.autoSave && (this.saveTimeout && clearTimeout(this.saveTimeout), this.saveTimeout = setTimeout(() => {
      this.save(t);
    }, this.debounceMs));
  }
  getStorageKey() {
    return this.storageKey;
  }
  isAutoSaveEnabled() {
    return this.autoSave;
  }
}
const Ve = (e) => new Ce(e), Qe = () => {
  try {
    const e = "__localStorage_test__";
    return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
  } catch {
    return !1;
  }
}, _e = (e, t = {}) => {
  const { onLoad: n, onSave: i, onError: l, ...s } = t, r = le(null), [h, d] = M(e), [b, T] = M(!1), [y, I] = M(!1);
  de(() => {
    r.current = new Ce(s), I(!0);
  }, [s.key, s.autoSave, s.debounceMs]), de(() => {
    if (!r.current || b) return;
    const f = r.current.load();
    f ? (d(f), T(!0), n?.(f)) : T(!0);
  }, [b, n]);
  const D = le();
  de(() => {
    if (!b || !r.current) return;
    const f = JSON.stringify(h.layout), p = JSON.stringify(e.layout);
    if (D.current !== p && f !== p) {
      const m = { ...e };
      e.global && (m.global = { ...e.global }), d(m), D.current = p, r.current.isAutoSaveEnabled() ? r.current.debouncedSave(m) : r.current.save(m);
    } else e.metadata && JSON.stringify(h.metadata) !== JSON.stringify(e.metadata) && d((m) => ({
      ...m,
      metadata: e.metadata
    }));
  }, [e, b, h.layout, h.metadata]);
  const v = S(
    (f) => {
      if (r.current)
        try {
          r.current.isAutoSaveEnabled() ? r.current.debouncedSave(f) : r.current.save(f), i?.(f);
        } catch (p) {
          l?.(p);
        }
    },
    [i, l]
  ), k = S(
    (f) => {
      const p = { ...f };
      f.global && (p.global = { ...f.global }), d(p), v(p);
    },
    [v]
  ), C = S(() => {
    if (r.current)
      try {
        r.current.clear();
      } catch (f) {
        l?.(f);
      }
  }, [l]), g = S(() => r.current?.exists() ?? !1, []), u = S(() => r.current?.getStorageKey() ?? "", []);
  return {
    model: h,
    updateModel: k,
    clearStorage: C,
    hasStoredData: g,
    getStorageKey: u,
    isLoaded: b,
    hasStorage: y
  };
}, Ae = Re(
  ({
    model: e,
    factory: t,
    onModelChange: n,
    onAction: i,
    className: l = "",
    style: s = {},
    storage: r,
    closeIcon: h,
    closeButtonClassName: d
  }, b) => {
    const [T, y] = M(e), [I, D] = M(
      null
    ), {
      model: v,
      updateModel: k,
      isLoaded: C
    } = _e(e, {
      key: r?.key,
      autoSave: r?.autoSave,
      debounceMs: r?.debounceMs,
      onLoad: (a) => {
        n ? n(a) : y(a);
      }
    }), g = r?.enabled ? v : n ? e : T, u = S(
      (a) => {
        r?.enabled ? (k(a), n && n(a)) : n ? n(a) : y(a);
      },
      [n, r?.enabled, k]
    ), { handleResize: f, resetResize: p } = Fe(
      g,
      u
    ), {
      dragOverTabset: m,
      dropPosition: H,
      dropTargetIndex: Y,
      handleDragStart: N,
      handleDragEnd: G,
      handleDragOver: re,
      handleDragLeave: ie,
      handleDrop: z
    } = Ke(g, u), L = le(v);
    de(() => {
      L.current = v;
    }, [v]);
    const K = le(T);
    de(() => {
      K.current = T;
    }, [T]);
    const c = S(
      (a) => {
        if (r?.enabled) {
          const $ = L.current;
          if (a.type === "changeDirection") {
            const { direction: o } = a.payload;
            D(o);
          }
          const _ = ((o) => {
            switch (a.type) {
              case "selectTab":
                const { nodeId: w, tabIndex: O } = a.payload, A = E(o.layout, w, {
                  selected: O
                });
                return !A || A === o.layout ? o : {
                  ...o,
                  layout: A
                };
              case "removeNode":
                const { nodeId: j, tabIndex: J } = a.payload, W = U(o.layout, j);
                if (W && W.children) {
                  const X = W.children.filter(
                    (ue, $e) => $e !== J
                  ), Z = W.selected ?? 0;
                  let ce = Z;
                  J <= Z && (ce = Math.max(0, Z - 1)), ce = Math.min(
                    ce,
                    X.length - 1
                  );
                  const he = {
                    ...W,
                    children: X,
                    selected: X.length > 0 ? ce : void 0
                  }, se = E(
                    o.layout,
                    j,
                    he
                  );
                  if (se) {
                    const ue = oe(se);
                    if (ue)
                      return {
                        ...o,
                        layout: ue
                      };
                  }
                }
                return o;
              case "closeTabset":
                const { nodeId: te } = a.payload, ne = E(
                  o.layout,
                  te,
                  null
                );
                if (ne) {
                  const X = oe(ne);
                  if (X)
                    return {
                      ...o,
                      layout: X
                    };
                }
                return o;
              case "changeDirection":
                const { direction: Q } = a.payload;
                return {
                  ...o,
                  global: {
                    ...o.global,
                    direction: Q
                  }
                };
              default:
                return o;
            }
          })($);
          k(_), n && n(_), i?.(a);
        } else
          i?.(a);
        if (!r?.enabled && !n) {
          const $ = K.current, _ = ((o) => {
            switch (a.type) {
              case "selectTab":
                const { nodeId: w, tabIndex: O } = a.payload, A = E(o.layout, w, {
                  selected: O
                });
                return !A || A === o.layout ? o : {
                  ...o,
                  layout: A
                };
              case "removeNode":
                const { nodeId: j, tabIndex: J } = a.payload, W = U(o.layout, j);
                if (W && W.children) {
                  const Q = W.children.filter(
                    (se, ue) => ue !== J
                  ), X = W.selected ?? 0;
                  let Z = X;
                  J <= X && (Z = Math.max(0, X - 1)), Z = Math.min(
                    Z,
                    Q.length - 1
                  );
                  const ce = {
                    ...W,
                    children: Q,
                    selected: Q.length > 0 ? Z : void 0
                  }, he = E(
                    o.layout,
                    j,
                    ce
                  );
                  if (he) {
                    const se = oe(he);
                    if (se)
                      return {
                        ...o,
                        layout: se
                      };
                  }
                }
                return o;
              case "closeTabset":
                const { nodeId: te } = a.payload, ne = E(
                  o.layout,
                  te,
                  null
                );
                if (ne) {
                  const Q = oe(ne);
                  if (Q)
                    return {
                      ...o,
                      layout: Q
                    };
                }
                return o;
              default:
                return o;
            }
          })($);
          y(_);
        }
      },
      [i, n, r?.enabled, k]
    );
    Ne(
      b,
      () => ({
        handleAction: c
      }),
      [c]
    );
    const x = S(
      (a, $) => {
        c({
          type: "selectTab",
          payload: { nodeId: a, tabIndex: $ }
        });
      },
      [c]
    ), B = S(
      (a, $) => {
        c({
          type: "removeNode",
          payload: { nodeId: a, tabIndex: $ }
        });
      },
      [c]
    );
    let F;
    r?.enabled ? I !== null ? F = I : F = v?.global?.direction || "ltr" : F = g.global?.direction || "ltr";
    const ee = g.global?.splitterSize || 8, P = S(
      (a) => {
        switch (a.type) {
          case "tabset":
            return /* @__PURE__ */ R(
              ve,
              {
                node: a,
                factory: t,
                onTabSelect: x,
                onTabClose: B,
                onTabDragStart: N,
                onTabDragEnd: G,
                onDragOver: re,
                onDragLeave: ie,
                onDrop: z,
                dragOverTabset: m,
                dropPosition: m === a.id ? H : void 0,
                dropTargetIndex: m === a.id ? Y : void 0,
                direction: F,
                closeIcon: h,
                closeButtonClassName: d
              },
              a.id
            );
          case "row":
            const $ = F === "rtl", q = a.children || [], _ = $ ? [...q].reverse() : q;
            return /* @__PURE__ */ R(
              "div",
              {
                className: "react-flex-layout-row",
                style: {
                  width: a.width ? `${a.width}%` : void 0,
                  height: a.height ? `${a.height}%` : void 0,
                  flex: `${a.flex || 1} 1 0%`,
                  minWidth: a.minWidth ? `${a.minWidth}px` : void 0,
                  minHeight: a.minHeight ? `${a.minHeight}px` : void 0,
                  maxWidth: a.maxWidth ? `${a.maxWidth}px` : void 0,
                  maxHeight: a.maxHeight ? `${a.maxHeight}px` : void 0
                },
                children: _.map((o, w) => {
                  const O = w + 1;
                  if (!(O < _.length))
                    return /* @__PURE__ */ R(fe.Fragment, { children: P(o) }, o.id);
                  const j = $ ? q.length - 1 - w : w, J = $ ? q.length - 1 - O : O, W = Math.min(
                    j,
                    J
                  );
                  if (Math.max(
                    j,
                    J
                  ) !== W + 1)
                    return /* @__PURE__ */ R(fe.Fragment, { children: P(o) }, o.id);
                  const ne = q[W], Q = $ && j > J;
                  return /* @__PURE__ */ ae(fe.Fragment, { children: [
                    P(o),
                    /* @__PURE__ */ R(
                      me,
                      {
                        direction: "horizontal",
                        onResize: (X) => {
                          const Z = Q ? -X : X;
                          f(
                            ne.id,
                            Z,
                            "horizontal"
                          );
                        },
                        onResizeStart: () => {
                          p(ne.id, "horizontal");
                        },
                        size: ee
                      }
                    )
                  ] }, o.id);
                })
              },
              a.id
            );
          case "column":
            return /* @__PURE__ */ R(
              "div",
              {
                className: "react-flex-layout-column",
                style: {
                  width: a.width ? `${a.width}%` : void 0,
                  height: a.height ? `${a.height}%` : void 0,
                  flex: `${a.flex || 1} 1 0%`,
                  minWidth: a.minWidth ? `${a.minWidth}px` : void 0,
                  minHeight: a.minHeight ? `${a.minHeight}px` : void 0,
                  maxWidth: a.maxWidth ? `${a.maxWidth}px` : void 0,
                  maxHeight: a.maxHeight ? `${a.maxHeight}px` : void 0
                },
                children: a.children?.map((o, w) => /* @__PURE__ */ ae(fe.Fragment, { children: [
                  P(o),
                  w < (a.children?.length || 0) - 1 && /* @__PURE__ */ R(
                    me,
                    {
                      direction: "vertical",
                      onResize: (O) => f(o.id, O, "vertical"),
                      onResizeStart: () => {
                        p(o.id, "vertical");
                      },
                      size: ee
                    }
                  )
                ] }, o.id))
              },
              a.id
            );
          case "tab":
            return t(a);
          default:
            return null;
        }
      },
      [
        F,
        ee,
        t,
        x,
        B,
        f,
        N,
        G,
        re,
        ie,
        z,
        m,
        H,
        h,
        d
      ]
    );
    de(() => {
      !r?.enabled && I !== null && D(null);
    }, [r?.enabled, I]);
    const V = be(
      () => P(g.layout),
      [P, g.layout]
    ), ge = {
      ...s,
      height: "100%",
      width: "100%"
    };
    return r?.enabled && !C ? /* @__PURE__ */ R(
      "div",
      {
        className: `react-flex-layout ${l}`,
        style: {
          ...ge,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ R("div", { children: "Loading layout..." })
      }
    ) : /* @__PURE__ */ R(
      "div",
      {
        className: `react-flex-layout ${l}`,
        style: ge,
        dir: F,
        children: V
      }
    );
  }
);
Ae.displayName = "Layout";
const je = ye(xe, (e, t) => e.node.id === t.node.id && e.node.name === t.node.name && e.node.enableClose === t.node.enableClose && e.node.enableDrag === t.node.enableDrag && e.className === t.className);
je.displayName = "MemoizedTab";
export {
  ze as DefaultCloseIcon,
  Ae as Layout,
  Ce as LayoutStorage,
  je as MemoizedTab,
  ve as MemoizedTabSet,
  me as Splitter,
  xe as Tab,
  He as TabSet,
  ke as addTabToTabset,
  Ie as calculateFlexValues,
  Ee as createColumn,
  Ue as createLayoutModel,
  Ve as createLayoutStorage,
  We as createRow,
  Oe as createTab,
  Se as createTabSet,
  U as findNodeById,
  Qe as isLocalStorageAvailable,
  oe as removeEmptyTabsets,
  pe as removeNodeById,
  qe as removeTab,
  Ye as restoreTab,
  Ge as tabExists,
  E as updateNodeById,
  _e as useLayoutStorage
};
