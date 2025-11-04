var Ne = Object.defineProperty;
var Ce = (e, t, i) => t in e ? Ne(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var be = (e, t, i) => (Ce(e, typeof t != "symbol" ? t + "" : t, i), i);
import { jsxs as ae, jsx as C } from "react/jsx-runtime";
import ge, { useCallback as g, useMemo as ve, memo as Se, useState as P, useRef as he, useEffect as ye, forwardRef as ze, useImperativeHandle as He } from "react";
const We = ({
  size: e = 16,
  color: t = "#666",
  className: i = ""
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
    className: i,
    children: [
      /* @__PURE__ */ C("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ C("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
);
const we = ({
  node: e,
  index: t,
  onClose: i,
  onSelect: r,
  onDragStart: c,
  onDragEnd: s,
  className: n = "",
  style: h = {},
  closeIcon: d,
  closeButtonClassName: v = ""
}) => {
  const L = g(() => {
    r == null || r(e.id);
  }, [e.id, r]), z = g(
    (b) => {
      b.stopPropagation(), i == null || i(e.id);
    },
    [e.id, i]
  ), $ = g(
    (b) => {
      b.dataTransfer.setData("text/plain", e.id), b.dataTransfer.effectAllowed = "move", b.currentTarget.classList.add("dragging"), document.body.classList.add("dragging"), c == null || c(e.id, t);
    },
    [e.id, t, c]
  ), R = g(
    (b) => {
      b.currentTarget.classList.remove("dragging"), document.body.classList.remove("dragging"), s == null || s();
    },
    [s]
  );
  return /* @__PURE__ */ ae(
    "div",
    {
      className: `react-flex-layout-tab ${n}`,
      style: { ...h, cursor: "grab" },
      onClick: L,
      draggable: !0,
      onDragStart: $,
      onDragEnd: R,
      children: [
        /* @__PURE__ */ C("span", { className: "react-flex-layout-tab-title", children: e.name || "Untitled" }),
        /* @__PURE__ */ C(
          "button",
          {
            className: `react-flex-layout-tab-close ${v}`.trim(),
            onClick: z,
            type: "button",
            "aria-label": "Close tab",
            children: d || /* @__PURE__ */ C(We, {})
          }
        )
      ]
    }
  );
};
const ke = ({
  node: e,
  children: t,
  factory: i,
  onTabSelect: r,
  onTabClose: c,
  onTabDragStart: s,
  onTabDragEnd: n,
  onDragOver: h,
  onDragLeave: d,
  onDrop: v,
  dragOverTabset: L,
  dropPosition: z,
  dropTargetIndex: $,
  direction: R = "ltr",
  className: b = "",
  style: K = {},
  closeIcon: N,
  closeButtonClassName: f
}) => {
  const a = ve(() => {
    var o;
    return ((o = e.children) == null ? void 0 : o.filter((T) => T.type === "tab")) || [];
  }, [e.children]), m = ve(() => R === "rtl" ? [...a].reverse() : a, [a, R]), O = e.selected ?? 0, S = Math.min(
    O,
    Math.max(0, a.length - 1)
  ), W = a[S], U = g(
    (o) => {
      const T = a.findIndex((F) => F.id === o);
      T !== -1 && (r == null || r(e.id, T));
    },
    [e.id, a, r]
  ), H = g(
    (o) => {
      const T = a.findIndex((F) => F.id === o);
      T !== -1 && (c == null || c(e.id, T));
    },
    [e.id, a, c]
  ), V = g(
    (o, T) => {
      const F = T !== void 0 ? T : a.findIndex((x) => x.id === o);
      F !== -1 && (s == null || s(e.id, F));
    },
    [e.id, a, s]
  ), ne = g(
    (o) => {
      var fe;
      o.preventDefault(), o.dataTransfer.dropEffect = "move";
      const T = o.currentTarget.getBoundingClientRect(), F = o.clientX - T.left, x = o.clientY - T.top, D = T.width, w = T.height;
      let y = "center";
      if (x < 40) {
        const Z = (fe = o.currentTarget.querySelector(".react-flex-layout-tabset-header")) == null ? void 0 : fe.getBoundingClientRect();
        if (Z) {
          const l = o.clientX - Z.left, E = o.currentTarget.querySelectorAll(
            ".react-flex-layout-tab"
          );
          let _ = a.length;
          if (R === "rtl") {
            for (let I = E.length - 1; I >= 0; I--) {
              const u = E[I].getBoundingClientRect(), p = u.left - Z.left, j = u.right - Z.left, k = (p + j) / 2;
              if (l > k) {
                _ = a.findIndex(
                  (X) => X.id === m[I].id
                );
                break;
              }
            }
            if (_ === a.length && E.length > 0) {
              const I = E[0].getBoundingClientRect();
              l > I.right - Z.left && (_ = a.findIndex(
                (p) => p.id === m[0].id
              ));
            }
          } else
            for (let I = 0; I < E.length; I++) {
              const u = E[I].getBoundingClientRect(), p = u.left - Z.left, j = u.right - Z.left, k = (p + j) / 2;
              if (l < k) {
                _ = a.findIndex(
                  (X) => X.id === m[I].id
                );
                break;
              }
            }
          _ === a.length && (_ = a.length), y = "tab", h == null || h(o, e.id, y, _);
          return;
        }
      }
      F < D * 0.25 ? y = "left" : F > D * 0.75 ? y = "right" : x < w * 0.25 ? y = "top" : x > w * 0.75 ? y = "bottom" : y = "center", h == null || h(o, e.id, y);
    },
    [e.id, a, m, h]
  ), ie = g(
    (o) => {
      d == null || d(o);
    },
    [d]
  ), le = g(
    (o) => {
      v == null || v(o, e.id);
    },
    [e.id, v]
  ), Q = L === e.id, re = {
    ...K,
    width: e.width ? `${e.width}%` : void 0,
    height: e.height ? `${e.height}%` : void 0,
    flex: `${e.flex || 1} 1 0%`,
    minWidth: e.minWidth ? `${e.minWidth}px` : void 0,
    minHeight: e.minHeight ? `${e.minHeight}px` : void 0,
    maxWidth: e.maxWidth ? `${e.maxWidth}px` : void 0,
    maxHeight: e.maxHeight ? `${e.maxHeight}px` : void 0
  };
  return a.length === 0 ? null : /* @__PURE__ */ ae(
    "div",
    {
      className: `react-flex-layout-tabset ${Q ? "drag-over" : ""} ${b}`,
      style: re,
      "data-drop-position": Q ? z : void 0,
      onDragOver: ne,
      onDragLeave: ie,
      onDrop: le,
      children: [
        /* @__PURE__ */ ae("div", { className: "react-flex-layout-tabset-header", children: [
          m.map((o) => {
            const T = a.findIndex((D) => D.id === o.id), F = T === S, x = Q && z === "tab" && $ !== null && T === $;
            return /* @__PURE__ */ ae(ge.Fragment, { children: [
              x && /* @__PURE__ */ C("div", { className: "react-flex-layout-tab-drop-indicator" }),
              /* @__PURE__ */ C(
                we,
                {
                  node: o,
                  index: T,
                  onSelect: U,
                  onClose: H,
                  onDragStart: V,
                  onDragEnd: n,
                  className: F ? "active" : "",
                  closeIcon: N,
                  closeButtonClassName: f
                }
              )
            ] }, o.id);
          }),
          Q && z === "tab" && $ !== null && $ === a.length && /* @__PURE__ */ C("div", { className: "react-flex-layout-tab-drop-indicator" })
        ] }),
        /* @__PURE__ */ C("div", { className: "react-flex-layout-tabset-content", children: W && (i ? i(W) : t) })
      ]
    }
  );
}, $e = Se(
  ke,
  (e, t) => {
    if (e.node !== t.node) {
      if (e.node.id !== t.node.id || e.node.selected !== t.node.selected || e.node.width !== t.node.width || e.node.height !== t.node.height || e.node.flex !== t.node.flex || e.node.minWidth !== t.node.minWidth || e.node.minHeight !== t.node.minHeight || e.node.maxWidth !== t.node.maxWidth || e.node.maxHeight !== t.node.maxHeight)
        return !1;
      const i = e.node.children || [], r = t.node.children || [];
      if (i.length !== r.length)
        return !1;
      for (let c = 0; c < i.length; c++)
        if (i[c] !== r[c]) {
          const s = i[c], n = r[c];
          if (s.id !== n.id || s.type !== n.type || s.name !== n.name || s.component !== n.component || s.enableClose !== n.enableClose || s.enableDrag !== n.enableDrag)
            return !1;
        }
    }
    return !(e.className !== t.className || e.direction !== t.direction || e.dragOverTabset !== t.dragOverTabset || e.dropPosition !== t.dropPosition || e.factory !== t.factory || e.onTabSelect !== t.onTabSelect || e.onTabClose !== t.onTabClose || e.onTabDragStart !== t.onTabDragStart || e.onTabDragEnd !== t.onTabDragEnd || e.onDragOver !== t.onDragOver || e.onDragLeave !== t.onDragLeave || e.onDrop !== t.onDrop);
  }
);
$e.displayName = "MemoizedTabSet";
const Te = ({
  direction: e,
  onResize: t,
  onResizeStart: i,
  size: r = 8,
  className: c = "",
  style: s = {},
  customStyles: n = {}
}) => {
  const [h, d] = P(!1), v = he(0), L = g(
    (b) => {
      b.preventDefault(), b.stopPropagation(), d(!0), v.current = e === "horizontal" ? b.clientX : b.clientY, i == null || i();
      const K = (f) => {
        const m = (e === "horizontal" ? f.clientX : f.clientY) - v.current;
        t(m);
      }, N = () => {
        d(!1), document.removeEventListener("mousemove", K), document.removeEventListener("mouseup", N);
      };
      document.addEventListener("mousemove", K), document.addEventListener("mouseup", N);
    },
    [e, t, i]
  ), z = {
    backgroundColor: "#ffffff",
    border: "none",
    outline: "none"
  }, $ = () => h && n.active ? n.active : n.default ? n.default : z, R = {
    ...s,
    width: e === "horizontal" ? `${r}px` : "100%",
    height: e === "vertical" ? `${r}px` : "100%",
    minWidth: e === "horizontal" ? `${r}px` : void 0,
    minHeight: e === "vertical" ? `${r}px` : void 0,
    flexShrink: 0,
    cursor: e === "horizontal" ? "col-resize" : "row-resize",
    ...$(),
    transition: h ? "none" : "all 0.2s ease"
  };
  return /* @__PURE__ */ C(
    "div",
    {
      className: `react-flex-layout-splitter ${c}`,
      style: R,
      onMouseDown: L
    }
  );
}, Ge = (e, t) => ({
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
}), Ve = (e, t, i, r) => ({
  id: e,
  type: "tab",
  component: t,
  name: i,
  config: r,
  enableClose: !0,
  enableDrag: !0
}), Oe = (e, t, i = 0) => ({
  id: e,
  type: "tabset",
  children: t,
  selected: i,
  enableClose: !0,
  enableDrag: !0
}), Fe = (e, t, i, r) => ({
  id: e,
  type: "row",
  children: Le(t),
  width: i,
  height: r,
  enableResize: !0
}), Ee = (e, t, i, r) => ({
  id: e,
  type: "column",
  children: Le(t),
  width: i,
  height: r,
  enableResize: !0
}), oe = (e, t) => {
  if (e.id === t)
    return e;
  if (e.children)
    for (const i of e.children) {
      const r = oe(i, t);
      if (r)
        return r;
    }
  return null;
}, Ie = (e, t) => {
  if (!e.children)
    return null;
  for (const i of e.children)
    if (i.id === t)
      return e;
  for (const i of e.children) {
    const r = Ie(i, t);
    if (r)
      return r;
  }
  return null;
}, q = (e, t, i) => {
  if (e.id === t)
    return i === null ? null : Object.keys(i).some(
      (c) => e[c] !== i[c]
    ) ? { ...e, ...i } : e;
  if (e.children) {
    let r = !1;
    const c = e.children.map((s) => {
      const n = q(s, t, i);
      return n !== s && (r = !0), n;
    }).filter((s) => s !== null);
    return r ? {
      ...e,
      children: c
    } : e;
  }
  return e;
}, Ke = (e, t) => {
  if (e.children) {
    const i = e.children.filter((r) => r.id !== t).map((r) => Ke(r, t));
    return {
      ...e,
      children: i
    };
  }
  return e;
}, Le = (e) => e.map((t) => ({
  ...t,
  flex: t.flex || 1 / e.length
})), ue = (e) => {
  if (e.type === "tabset" && (!e.children || e.children.length === 0))
    return null;
  if (e.children) {
    const t = e.children.length, i = e.children.map(ue).filter((c) => c !== null), r = i.length < t;
    if (i.length === 0)
      return null;
    if ((e.type === "row" || e.type === "column") && i.length > 0) {
      const c = i.reduce(
        (n, h) => n + (h.flex || 0),
        0
      );
      if (r || c < 0.999 || i.length === 1) {
        let n;
        if (i.length === 1)
          n = i.map((h) => ({
            ...h,
            flex: 1
          }));
        else if (c === 0 || c < 1e-3) {
          const h = 1 / i.length;
          n = i.map((d) => ({
            ...d,
            flex: h
          }));
        } else {
          const h = 1 / c;
          n = i.map((d) => ({
            ...d,
            flex: (d.flex || 0) * h
          }));
        }
        return {
          ...e,
          children: n
        };
      }
      if (i.length !== t || i.some(
        (n, h) => {
          var d;
          return n !== ((d = e.children) == null ? void 0 : d[h]);
        }
      ))
        return {
          ...e,
          children: i
        };
    }
    if (i !== e.children)
      return {
        ...e,
        children: i
      };
  }
  return e;
}, Be = (e, t) => {
  const i = he({}), r = g(
    (s, n, h) => {
      if (!t)
        return;
      const d = De(e.layout, s);
      if (!d || !d.children)
        return;
      const v = d.children.findIndex(
        (S) => S.id === s
      ), L = v + 1;
      if (L >= d.children.length)
        return;
      const z = `${s}-${h}`;
      if (!i.current[z]) {
        const S = d.children[v], W = d.children[L];
        i.current[z] = {
          current: S.flex || 1,
          sibling: W.flex || 1
        };
      }
      const $ = i.current[z], R = $.current + $.sibling, b = h === "horizontal" ? window.innerWidth : window.innerHeight, K = $.current / R * b, N = $.sibling / R * b, f = 100;
      let a = K + n, m = N - n;
      if (a < f) {
        const S = f - a;
        a = f, m -= S;
      }
      if (m < f) {
        const S = f - m;
        m = f, a -= S;
      }
      const O = a + m;
      if (O > 0) {
        const S = a / O * R, W = m / O * R, U = q(e.layout, d.id, {
          children: d.children.map((H, V) => V === v ? { ...H, flex: S } : V === L ? { ...H, flex: W } : H)
        });
        U && t({
          ...e,
          layout: U
        });
      }
    },
    [e, t]
  ), c = g(
    (s, n) => {
      const h = `${s}-${n}`;
      delete i.current[h];
    },
    []
  );
  return { handleResize: r, resetResize: c };
}, De = (e, t) => {
  if (!e.children)
    return null;
  for (const i of e.children) {
    if (i.id === t)
      return e;
    const r = De(i, t);
    if (r)
      return r;
  }
  return null;
}, _e = (e, t) => {
  const [i, r] = P(null), [c, s] = P(null), [n, h] = P("center"), [d, v] = P(null), L = he(null), z = g((N, f) => {
    const a = { tabsetId: N, tabIndex: f };
    r(a), L.current = a;
  }, []), $ = g(() => {
    r(null), L.current = null, s(null), v(null);
  }, []), R = g(
    (N, f, a = "center", m) => {
      N.preventDefault(), N.dataTransfer.dropEffect = "move", s(f), h(a), m !== void 0 ? v(m) : a !== "tab" && v(null);
    },
    []
  ), b = g((N) => {
    N.currentTarget === N.target && setTimeout(() => {
      s(null), v(null);
    }, 50);
  }, []), K = g(
    (N, f) => {
      var le, Q, re, o, T, F;
      N.preventDefault();
      const a = L.current;
      if (!a || !t)
        return;
      const { tabsetId: m, tabIndex: O } = a;
      if (m === f && n === "tab" && d !== null) {
        const x = oe(e.layout, m);
        if (!x || !x.children)
          return;
        const D = x.children[O];
        if (!D || O === d)
          return;
        const w = [...x.children];
        w.splice(O, 1), w.splice(d, 0, D);
        let y = x.selected ?? 0;
        O < y && d >= y ? y = Math.max(0, y - 1) : O > y && d <= y ? y = Math.min(y + 1, w.length - 1) : O === y && (y = d);
        const Y = q(e.layout, m, {
          children: w,
          selected: y
        });
        Y && t({
          ...e,
          layout: Y
        }), r(null), s(null), v(null);
        return;
      }
      if (m === f && n !== "tab")
        return;
      const S = oe(e.layout, m), W = oe(e.layout, f);
      if (!S || !W || !S.children || !W.children)
        return;
      const U = S.children[O];
      if (!U)
        return;
      let H = e.layout;
      const V = S.children.filter(
        (x, D) => D !== O
      ), ne = q(
        H,
        m,
        {
          children: V,
          selected: Math.min(
            S.selected || 0,
            V.length - 1
          )
        }
      );
      if (!ne)
        return;
      if (H = ne, n === "center") {
        const x = { ...U, id: `${U.id}-${Date.now()}` }, D = q(
          H,
          f,
          {
            children: [...W.children || [], x],
            selected: ((le = W.children) == null ? void 0 : le.length) || 0
          }
        );
        if (!D)
          return;
        H = D;
      } else {
        const x = { ...U, id: `${U.id}-${Date.now()}` }, D = Oe(
          `${f}-split-${Date.now()}`,
          [x]
        ), w = Ie(H, f);
        if (w) {
          const y = ((Q = w.children) == null ? void 0 : Q.findIndex(
            (Y) => Y.id === f
          )) || 0;
          if (n === "left" || n === "right") {
            const Y = Fe(`${f}-row-${Date.now()}`, [
              n === "left" ? D : W,
              n === "left" ? W : D
            ]), ee = q(
              H,
              w.id,
              {
                children: [
                  ...((re = w.children) == null ? void 0 : re.slice(0, y)) || [],
                  Y,
                  ...((o = w.children) == null ? void 0 : o.slice(y + 1)) || []
                ]
              }
            );
            if (!ee)
              return;
            H = ee;
          } else if (n === "top" || n === "bottom") {
            const Y = Ee(
              `${f}-column-${Date.now()}`,
              [
                n === "top" ? D : W,
                n === "top" ? W : D
              ]
            ), ee = q(
              H,
              w.id,
              {
                children: [
                  ...((T = w.children) == null ? void 0 : T.slice(0, y)) || [],
                  Y,
                  ...((F = w.children) == null ? void 0 : F.slice(y + 1)) || []
                ]
              }
            );
            if (!ee)
              return;
            H = ee;
          }
        }
      }
      const ie = ue(H);
      ie && t({
        ...e,
        layout: ie
      }), r(null), s(null);
    },
    [e, t, n, d]
  );
  return {
    draggedTab: i,
    dragOverTabset: c,
    dropPosition: n,
    dropTargetIndex: d,
    handleDragStart: z,
    handleDragEnd: $,
    handleDragOver: R,
    handleDragLeave: b,
    handleDrop: K
  };
}, je = "react-flex-layout";
class pe {
  constructor(t = {}) {
    be(this, "storageKey");
    be(this, "autoSave");
    be(this, "debounceMs");
    be(this, "saveTimeout", null);
    this.storageKey = `${je}-${t.key || "default"}`, this.autoSave = t.autoSave !== !1, this.debounceMs = t.debounceMs || 500;
  }
  /**
   * Save layout model to localStorage
   */
  save(t) {
    try {
      const i = JSON.stringify(t);
      localStorage.setItem(this.storageKey, i);
    } catch {
    }
  }
  /**
   * Load layout model from localStorage
   */
  load() {
    try {
      const t = localStorage.getItem(this.storageKey);
      if (t)
        return JSON.parse(t);
    } catch {
    }
    return null;
  }
  /**
   * Clear saved layout from localStorage
   */
  clear() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch {
    }
  }
  /**
   * Check if layout exists in localStorage
   */
  exists() {
    return localStorage.getItem(this.storageKey) !== null;
  }
  /**
   * Save with debouncing to avoid excessive writes
   */
  debouncedSave(t) {
    this.autoSave && (this.saveTimeout && clearTimeout(this.saveTimeout), this.saveTimeout = setTimeout(() => {
      this.save(t);
    }, this.debounceMs));
  }
  /**
   * Get storage key being used
   */
  getStorageKey() {
    return this.storageKey;
  }
  /**
   * Check if auto save is enabled
   */
  isAutoSaveEnabled() {
    return this.autoSave;
  }
}
const Qe = (e) => new pe(e), Ze = () => {
  try {
    const e = "__localStorage_test__";
    return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
  } catch {
    return !1;
  }
}, Xe = (e, t = {}) => {
  const { onLoad: i, onSave: r, onError: c, ...s } = t, n = he(null), [h, d] = P(e), [v, L] = P(!1), [z, $] = P(!1);
  ye(() => {
    n.current = new pe(s), $(!0);
  }, [s.key, s.autoSave, s.debounceMs]), ye(() => {
    if (!n.current || v)
      return;
    const a = n.current.load();
    a ? (d(a), L(!0), i == null || i(a)) : L(!0);
  }, [v, i]);
  const R = g(
    (a) => {
      if (n.current)
        try {
          n.current.isAutoSaveEnabled() ? n.current.debouncedSave(a) : n.current.save(a), r == null || r(a);
        } catch (m) {
          c == null || c(m);
        }
    },
    [r, c]
  ), b = g(
    (a) => {
      const m = { ...a };
      a.global && (m.global = { ...a.global }), d(m), R(m);
    },
    [R]
  ), K = g(() => {
    if (n.current)
      try {
        n.current.clear();
      } catch (a) {
        c == null || c(a);
      }
  }, [c]), N = g(() => {
    var a;
    return ((a = n.current) == null ? void 0 : a.exists()) ?? !1;
  }, []), f = g(() => {
    var a;
    return ((a = n.current) == null ? void 0 : a.getStorageKey()) ?? "";
  }, []);
  return {
    model: h,
    updateModel: b,
    clearStorage: K,
    hasStoredData: N,
    getStorageKey: f,
    isLoaded: v,
    hasStorage: z
  };
};
const qe = ze(
  ({
    model: e,
    factory: t,
    onModelChange: i,
    onAction: r,
    className: c = "",
    style: s = {},
    storage: n,
    closeIcon: h,
    closeButtonClassName: d
  }, v) => {
    var ee, fe, Z;
    const [L, z] = P(e), [$, R] = P(
      null
    ), {
      model: b,
      updateModel: K,
      isLoaded: N
    } = Xe(e, {
      key: n == null ? void 0 : n.key,
      autoSave: n == null ? void 0 : n.autoSave,
      debounceMs: n == null ? void 0 : n.debounceMs,
      onLoad: (l) => {
        i ? i(l) : z(l);
      }
    }), f = n != null && n.enabled ? b : i ? e : L, a = g(
      (l) => {
        n != null && n.enabled ? (K(l), i && i(l)) : i ? i(l) : z(l);
      },
      [i, n == null ? void 0 : n.enabled, K]
    ), { handleResize: m, resetResize: O } = Be(
      f,
      a
    ), {
      dragOverTabset: S,
      dropPosition: W,
      dropTargetIndex: U,
      handleDragStart: H,
      handleDragEnd: V,
      handleDragOver: ne,
      handleDragLeave: ie,
      handleDrop: le
    } = _e(f, a), Q = he(b);
    ye(() => {
      Q.current = b;
    }, [b]);
    const re = he(L);
    ye(() => {
      re.current = L;
    }, [L]);
    const o = g(
      (l) => {
        if (n != null && n.enabled) {
          const E = Q.current;
          if (l.type === "changeDirection") {
            const { direction: u } = l.payload;
            R(u);
          }
          const I = ((u) => {
            switch (l.type) {
              case "selectTab":
                const { nodeId: p, tabIndex: j } = l.payload, k = q(u.layout, p, {
                  selected: j
                });
                return !k || k === u.layout ? u : {
                  ...u,
                  layout: k
                };
              case "removeNode":
                const { nodeId: A, tabIndex: X } = l.payload, B = oe(u.layout, A);
                if (B && B.children) {
                  const J = B.children.filter(
                    (me, Re) => Re !== X
                  ), G = B.selected ?? 0;
                  let te = G;
                  X <= G && (te = Math.max(0, G - 1)), te = Math.min(
                    te,
                    J.length - 1
                  );
                  const xe = {
                    ...B,
                    children: J,
                    selected: J.length > 0 ? te : void 0
                  }, de = q(
                    u.layout,
                    A,
                    xe
                  );
                  if (de) {
                    const me = ue(de);
                    if (me)
                      return {
                        ...u,
                        layout: me
                      };
                  }
                }
                return u;
              case "closeTabset":
                const { nodeId: ce } = l.payload, se = q(
                  u.layout,
                  ce,
                  null
                );
                if (se) {
                  const J = ue(se);
                  if (J)
                    return {
                      ...u,
                      layout: J
                    };
                }
                return u;
              case "changeDirection":
                const { direction: M } = l.payload;
                return {
                  ...u,
                  global: {
                    ...u.global,
                    direction: M
                  }
                };
              default:
                return u;
            }
          })(E);
          K(I), i && i(I), r == null || r(l);
        } else
          r == null || r(l);
        if (!(n != null && n.enabled) && !i) {
          const E = re.current, I = ((u) => {
            switch (l.type) {
              case "selectTab":
                const { nodeId: p, tabIndex: j } = l.payload, k = q(u.layout, p, {
                  selected: j
                });
                return !k || k === u.layout ? u : {
                  ...u,
                  layout: k
                };
              case "removeNode":
                const { nodeId: A, tabIndex: X } = l.payload, B = oe(u.layout, A);
                if (B && B.children) {
                  const M = B.children.filter(
                    (de, me) => me !== X
                  ), J = B.selected ?? 0;
                  let G = J;
                  X <= J && (G = Math.max(0, J - 1)), G = Math.min(
                    G,
                    M.length - 1
                  );
                  const te = {
                    ...B,
                    children: M,
                    selected: M.length > 0 ? G : void 0
                  }, xe = q(
                    u.layout,
                    A,
                    te
                  );
                  if (xe) {
                    const de = ue(xe);
                    if (de)
                      return {
                        ...u,
                        layout: de
                      };
                  }
                }
                return u;
              case "closeTabset":
                const { nodeId: ce } = l.payload, se = q(
                  u.layout,
                  ce,
                  null
                );
                if (se) {
                  const M = ue(se);
                  if (M)
                    return {
                      ...u,
                      layout: M
                    };
                }
                return u;
              default:
                return u;
            }
          })(E);
          z(I);
        }
      },
      [r, i, n == null ? void 0 : n.enabled, K]
    );
    He(
      v,
      () => ({
        handleAction: o
      }),
      [o]
    );
    const T = g(
      (l, E) => {
        o({
          type: "selectTab",
          payload: { nodeId: l, tabIndex: E }
        });
      },
      [o]
    ), F = g(
      (l, E) => {
        o({
          type: "removeNode",
          payload: { nodeId: l, tabIndex: E }
        });
      },
      [o]
    );
    let x;
    n != null && n.enabled ? $ !== null ? x = $ : x = ((ee = b == null ? void 0 : b.global) == null ? void 0 : ee.direction) || "ltr" : x = ((fe = f.global) == null ? void 0 : fe.direction) || "ltr";
    const D = ((Z = f.global) == null ? void 0 : Z.splitterSize) || 8, w = g(
      (l) => {
        var E;
        switch (l.type) {
          case "tabset":
            return /* @__PURE__ */ C(
              $e,
              {
                node: l,
                factory: t,
                onTabSelect: T,
                onTabClose: F,
                onTabDragStart: H,
                onTabDragEnd: V,
                onDragOver: ne,
                onDragLeave: ie,
                onDrop: le,
                dragOverTabset: S,
                dropPosition: S === l.id ? W : void 0,
                dropTargetIndex: S === l.id ? U : void 0,
                direction: x,
                closeIcon: h,
                closeButtonClassName: d
              },
              l.id
            );
          case "row":
            const _ = x === "rtl", I = l.children || [], u = _ ? [...I].reverse() : I;
            return /* @__PURE__ */ C(
              "div",
              {
                className: "react-flex-layout-row",
                style: {
                  width: l.width ? `${l.width}%` : void 0,
                  height: l.height ? `${l.height}%` : void 0,
                  flex: `${l.flex || 1} 1 0%`,
                  minWidth: l.minWidth ? `${l.minWidth}px` : void 0,
                  minHeight: l.minHeight ? `${l.minHeight}px` : void 0,
                  maxWidth: l.maxWidth ? `${l.maxWidth}px` : void 0,
                  maxHeight: l.maxHeight ? `${l.maxHeight}px` : void 0
                },
                children: u.map((p, j) => {
                  const k = j + 1;
                  if (!(k < u.length))
                    return /* @__PURE__ */ C(ge.Fragment, { children: w(p) }, p.id);
                  const X = _ ? I.length - 1 - j : j, B = _ ? I.length - 1 - k : k, ce = Math.min(
                    X,
                    B
                  );
                  if (Math.max(
                    X,
                    B
                  ) !== ce + 1)
                    return /* @__PURE__ */ C(ge.Fragment, { children: w(p) }, p.id);
                  const M = I[ce], J = _ && X > B;
                  return /* @__PURE__ */ ae(ge.Fragment, { children: [
                    w(p),
                    /* @__PURE__ */ C(
                      Te,
                      {
                        direction: "horizontal",
                        onResize: (G) => {
                          const te = J ? -G : G;
                          m(
                            M.id,
                            te,
                            "horizontal"
                          );
                        },
                        onResizeStart: () => {
                          O(M.id, "horizontal");
                        },
                        size: D
                      }
                    )
                  ] }, p.id);
                })
              },
              l.id
            );
          case "column":
            return /* @__PURE__ */ C(
              "div",
              {
                className: "react-flex-layout-column",
                style: {
                  width: l.width ? `${l.width}%` : void 0,
                  height: l.height ? `${l.height}%` : void 0,
                  flex: `${l.flex || 1} 1 0%`,
                  minWidth: l.minWidth ? `${l.minWidth}px` : void 0,
                  minHeight: l.minHeight ? `${l.minHeight}px` : void 0,
                  maxWidth: l.maxWidth ? `${l.maxWidth}px` : void 0,
                  maxHeight: l.maxHeight ? `${l.maxHeight}px` : void 0
                },
                children: (E = l.children) == null ? void 0 : E.map((p, j) => {
                  var k;
                  return /* @__PURE__ */ ae(ge.Fragment, { children: [
                    w(p),
                    j < (((k = l.children) == null ? void 0 : k.length) || 0) - 1 && /* @__PURE__ */ C(
                      Te,
                      {
                        direction: "vertical",
                        onResize: (A) => m(p.id, A, "vertical"),
                        onResizeStart: () => {
                          O(p.id, "vertical");
                        },
                        size: D
                      }
                    )
                  ] }, p.id);
                })
              },
              l.id
            );
          case "tab":
            return t(l);
          default:
            return null;
        }
      },
      [
        x,
        D,
        t,
        T,
        F,
        m,
        H,
        V,
        ne,
        ie,
        le,
        S,
        W,
        h,
        d
      ]
    );
    ye(() => {
      !(n != null && n.enabled) && $ !== null && R(null);
    }, [n == null ? void 0 : n.enabled, $]);
    const y = ve(
      () => w(f.layout),
      [w, f.layout]
    ), Y = {
      ...s,
      height: "100%",
      width: "100%"
    };
    return n != null && n.enabled && !N ? /* @__PURE__ */ C(
      "div",
      {
        className: `react-flex-layout ${c}`,
        style: {
          ...Y,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ C("div", { children: "Loading layout..." })
      }
    ) : /* @__PURE__ */ C(
      "div",
      {
        className: `react-flex-layout ${c}`,
        style: Y,
        dir: x,
        children: y
      }
    );
  }
);
qe.displayName = "Layout";
const Ue = Se(we, (e, t) => e.node.id === t.node.id && e.node.name === t.node.name && e.node.enableClose === t.node.enableClose && e.node.enableDrag === t.node.enableDrag && e.className === t.className);
Ue.displayName = "MemoizedTab";
export {
  We as DefaultCloseIcon,
  qe as Layout,
  pe as LayoutStorage,
  Ue as MemoizedTab,
  $e as MemoizedTabSet,
  Te as Splitter,
  we as Tab,
  ke as TabSet,
  Le as calculateFlexValues,
  Ee as createColumn,
  Ge as createLayoutModel,
  Qe as createLayoutStorage,
  Fe as createRow,
  Ve as createTab,
  Oe as createTabSet,
  oe as findNodeById,
  Ze as isLocalStorageAvailable,
  ue as removeEmptyTabsets,
  Ke as removeNodeById,
  q as updateNodeById,
  Xe as useLayoutStorage
};
