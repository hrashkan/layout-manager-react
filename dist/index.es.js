var pe = Object.defineProperty;
var Re = (e, t, i) => t in e ? pe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var fe = (e, t, i) => (Re(e, typeof t != "symbol" ? t + "" : t, i), i);
import { jsxs as re, jsx as N } from "react/jsx-runtime";
import me, { useCallback as y, useMemo as ye, memo as ve, useState as te, useRef as oe, useEffect as be, forwardRef as Ne, useImperativeHandle as Ce } from "react";
const Te = ({
  node: e,
  index: t,
  onClose: i,
  onSelect: r,
  onDragStart: a,
  onDragEnd: c,
  className: n = "",
  style: m = {}
}) => {
  const s = y(() => {
    r == null || r(e.id);
  }, [e.id, r]), x = y(
    (g) => {
      g.stopPropagation(), i == null || i(e.id);
    },
    [e.id, i]
  ), w = y(
    (g) => {
      g.dataTransfer.setData("text/plain", e.id), g.dataTransfer.effectAllowed = "move", g.currentTarget.classList.add("dragging"), document.body.classList.add("dragging"), a == null || a(e.id, t);
    },
    [e.id, t, a]
  ), C = y(
    (g) => {
      g.currentTarget.classList.remove("dragging"), document.body.classList.remove("dragging"), c == null || c();
    },
    [c]
  );
  return /* @__PURE__ */ re(
    "div",
    {
      className: `react-flex-layout-tab ${n}`,
      style: { ...m, cursor: "grab" },
      onClick: s,
      draggable: !0,
      onDragStart: w,
      onDragEnd: C,
      children: [
        /* @__PURE__ */ N("span", { className: "react-flex-layout-tab-title", children: e.name || "Untitled" }),
        /* @__PURE__ */ N(
          "button",
          {
            className: "react-flex-layout-tab-close",
            onClick: x,
            type: "button",
            "aria-label": "Close tab",
            children: "×"
          }
        )
      ]
    }
  );
};
const ze = ({
  node: e,
  children: t,
  factory: i,
  onTabSelect: r,
  onTabClose: a,
  onTabDragStart: c,
  onTabDragEnd: n,
  onDragOver: m,
  onDragLeave: s,
  onDrop: x,
  dragOverTabset: w,
  dropPosition: C,
  dropTargetIndex: g,
  direction: $ = "ltr",
  className: _ = "",
  style: k = {}
}) => {
  const d = ye(() => {
    var h;
    return ((h = e.children) == null ? void 0 : h.filter((v) => v.type === "tab")) || [];
  }, [e.children]), f = ye(() => $ === "rtl" ? [...d].reverse() : d, [d, $]), u = e.selected ?? 0, b = Math.min(
    u,
    Math.max(0, d.length - 1)
  ), z = d[b], p = y(
    (h) => {
      const v = d.findIndex((F) => F.id === h);
      v !== -1 && (r == null || r(e.id, v));
    },
    [e.id, d, r]
  ), O = y(
    (h) => {
      const v = d.findIndex((F) => F.id === h);
      v !== -1 && (a == null || a(e.id, v));
    },
    [e.id, d, a]
  ), U = y(
    (h, v) => {
      const F = v !== void 0 ? v : d.findIndex((H) => H.id === h);
      F !== -1 && (c == null || c(e.id, F));
    },
    [e.id, d, c]
  ), R = y(
    (h) => {
      var X;
      h.preventDefault(), h.dataTransfer.dropEffect = "move";
      const v = h.currentTarget.getBoundingClientRect(), F = h.clientX - v.left, H = h.clientY - v.top, V = v.width, L = v.height;
      let T = "center";
      if (H < 40) {
        const B = (X = h.currentTarget.querySelector(".react-flex-layout-tabset-header")) == null ? void 0 : X.getBoundingClientRect();
        if (B) {
          const l = h.clientX - B.left, K = h.currentTarget.querySelectorAll(
            ".react-flex-layout-tab"
          );
          let q = d.length;
          if ($ === "rtl") {
            for (let S = K.length - 1; S >= 0; S--) {
              const o = K[S].getBoundingClientRect(), I = o.left - B.left, Y = o.right - B.left, W = (I + Y) / 2;
              if (l > W) {
                q = d.findIndex(
                  (J) => J.id === f[S].id
                );
                break;
              }
            }
            if (q === d.length && K.length > 0) {
              const S = K[0].getBoundingClientRect();
              l > S.right - B.left && (q = d.findIndex(
                (I) => I.id === f[0].id
              ));
            }
          } else
            for (let S = 0; S < K.length; S++) {
              const o = K[S].getBoundingClientRect(), I = o.left - B.left, Y = o.right - B.left, W = (I + Y) / 2;
              if (l < W) {
                q = d.findIndex(
                  (J) => J.id === f[S].id
                );
                break;
              }
            }
          q === d.length && (q = d.length), T = "tab", m == null || m(h, e.id, T, q);
          return;
        }
      }
      F < V * 0.25 ? T = "left" : F > V * 0.75 ? T = "right" : H < L * 0.25 ? T = "top" : H > L * 0.75 ? T = "bottom" : T = "center", m == null || m(h, e.id, T);
    },
    [e.id, d, f, m]
  ), A = y(
    (h) => {
      s == null || s(h);
    },
    [s]
  ), ie = y(
    (h) => {
      x == null || x(h, e.id);
    },
    [e.id, x]
  ), P = w === e.id, le = {
    ...k,
    width: e.width ? `${e.width}%` : void 0,
    height: e.height ? `${e.height}%` : void 0,
    flex: `${e.flex || 1} 1 0%`,
    minWidth: e.minWidth ? `${e.minWidth}px` : void 0,
    minHeight: e.minHeight ? `${e.minHeight}px` : void 0,
    maxWidth: e.maxWidth ? `${e.maxWidth}px` : void 0,
    maxHeight: e.maxHeight ? `${e.maxHeight}px` : void 0
  };
  return d.length === 0 ? null : /* @__PURE__ */ re(
    "div",
    {
      className: `react-flex-layout-tabset ${P ? "drag-over" : ""} ${_}`,
      style: le,
      "data-drop-position": P ? C : void 0,
      onDragOver: R,
      onDragLeave: A,
      onDrop: ie,
      children: [
        /* @__PURE__ */ re("div", { className: "react-flex-layout-tabset-header", children: [
          f.map((h) => {
            const v = d.findIndex((V) => V.id === h.id), F = v === b, H = P && C === "tab" && g !== null && v === g;
            return /* @__PURE__ */ re(me.Fragment, { children: [
              H && /* @__PURE__ */ N("div", { className: "react-flex-layout-tab-drop-indicator" }),
              /* @__PURE__ */ N(
                Te,
                {
                  node: h,
                  index: v,
                  onSelect: p,
                  onClose: O,
                  onDragStart: U,
                  onDragEnd: n,
                  className: F ? "active" : ""
                }
              )
            ] }, h.id);
          }),
          P && C === "tab" && g !== null && g === d.length && /* @__PURE__ */ N("div", { className: "react-flex-layout-tab-drop-indicator" })
        ] }),
        /* @__PURE__ */ N("div", { className: "react-flex-layout-tabset-content", children: z && (i ? i(z) : t) })
      ]
    }
  );
}, Se = ve(
  ze,
  (e, t) => {
    if (e.node !== t.node) {
      if (e.node.id !== t.node.id || e.node.selected !== t.node.selected || e.node.width !== t.node.width || e.node.height !== t.node.height || e.node.flex !== t.node.flex || e.node.minWidth !== t.node.minWidth || e.node.minHeight !== t.node.minHeight || e.node.maxWidth !== t.node.maxWidth || e.node.maxHeight !== t.node.maxHeight)
        return !1;
      const i = e.node.children || [], r = t.node.children || [];
      if (i.length !== r.length)
        return !1;
      for (let a = 0; a < i.length; a++)
        if (i[a] !== r[a]) {
          const c = i[a], n = r[a];
          if (c.id !== n.id || c.type !== n.type || c.name !== n.name || c.component !== n.component || c.enableClose !== n.enableClose || c.enableDrag !== n.enableDrag)
            return !1;
        }
    }
    return !(e.className !== t.className || e.direction !== t.direction || e.dragOverTabset !== t.dragOverTabset || e.dropPosition !== t.dropPosition || e.factory !== t.factory || e.onTabSelect !== t.onTabSelect || e.onTabClose !== t.onTabClose || e.onTabDragStart !== t.onTabDragStart || e.onTabDragEnd !== t.onTabDragEnd || e.onDragOver !== t.onDragOver || e.onDragLeave !== t.onDragLeave || e.onDrop !== t.onDrop);
  }
);
Se.displayName = "MemoizedTabSet";
const xe = ({
  direction: e,
  onResize: t,
  onResizeStart: i,
  size: r = 8,
  className: a = "",
  style: c = {},
  customStyles: n = {}
}) => {
  const [m, s] = te(!1), x = oe(0), w = y(
    (_) => {
      _.preventDefault(), _.stopPropagation(), s(!0), x.current = e === "horizontal" ? _.clientX : _.clientY, i == null || i();
      const k = (f) => {
        const b = (e === "horizontal" ? f.clientX : f.clientY) - x.current;
        t(b);
      }, d = () => {
        s(!1), document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", d);
      };
      document.addEventListener("mousemove", k), document.addEventListener("mouseup", d);
    },
    [e, t, i]
  ), C = {
    backgroundColor: "#ffffff",
    border: "none",
    outline: "none"
  }, g = () => m && n.active ? n.active : n.default ? n.default : C, $ = {
    ...c,
    width: e === "horizontal" ? `${r}px` : "100%",
    height: e === "vertical" ? `${r}px` : "100%",
    minWidth: e === "horizontal" ? `${r}px` : void 0,
    minHeight: e === "vertical" ? `${r}px` : void 0,
    flexShrink: 0,
    cursor: e === "horizontal" ? "col-resize" : "row-resize",
    ...g(),
    transition: m ? "none" : "all 0.2s ease"
  };
  return /* @__PURE__ */ N(
    "div",
    {
      className: `react-flex-layout-splitter ${a}`,
      style: $,
      onMouseDown: w
    }
  );
}, Ye = (e, t) => ({
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
}), Je = (e, t, i, r) => ({
  id: e,
  type: "tab",
  component: t,
  name: i,
  config: r,
  enableClose: !0,
  enableDrag: !0
}), He = (e, t, i = 0) => ({
  id: e,
  type: "tabset",
  children: t,
  selected: i,
  enableClose: !0,
  enableDrag: !0
}), We = (e, t, i, r) => ({
  id: e,
  type: "row",
  children: Ie(t),
  width: i,
  height: r,
  enableResize: !0
}), ke = (e, t, i, r) => ({
  id: e,
  type: "column",
  children: Ie(t),
  width: i,
  height: r,
  enableResize: !0
}), ue = (e, t) => {
  if (e.id === t)
    return e;
  if (e.children)
    for (const i of e.children) {
      const r = ue(i, t);
      if (r)
        return r;
    }
  return null;
}, we = (e, t) => {
  if (!e.children)
    return null;
  for (const i of e.children)
    if (i.id === t)
      return e;
  for (const i of e.children) {
    const r = we(i, t);
    if (r)
      return r;
  }
  return null;
}, M = (e, t, i) => {
  if (e.id === t)
    return i === null ? null : Object.keys(i).some(
      (a) => e[a] !== i[a]
    ) ? { ...e, ...i } : e;
  if (e.children) {
    let r = !1;
    const a = e.children.map((c) => {
      const n = M(c, t, i);
      return n !== c && (r = !0), n;
    }).filter((c) => c !== null);
    return r ? {
      ...e,
      children: a
    } : e;
  }
  return e;
}, Oe = (e, t) => {
  if (e.children) {
    const i = e.children.filter((r) => r.id !== t).map((r) => Oe(r, t));
    return {
      ...e,
      children: i
    };
  }
  return e;
}, Ie = (e) => e.map((t) => ({
  ...t,
  flex: t.flex || 1 / e.length
})), de = (e) => {
  if (e.type === "tabset" && (!e.children || e.children.length === 0))
    return null;
  if (e.children) {
    const t = e.children.length, i = e.children.map(de).filter((a) => a !== null), r = i.length < t;
    if (i.length === 0)
      return null;
    if ((e.type === "row" || e.type === "column") && i.length > 0) {
      const a = i.reduce(
        (n, m) => n + (m.flex || 0),
        0
      );
      if (r || a < 0.999 || i.length === 1) {
        let n;
        if (i.length === 1)
          n = i.map((m) => ({
            ...m,
            flex: 1
          }));
        else if (a === 0 || a < 1e-3) {
          const m = 1 / i.length;
          n = i.map((s) => ({
            ...s,
            flex: m
          }));
        } else {
          const m = 1 / a;
          n = i.map((s) => ({
            ...s,
            flex: (s.flex || 0) * m
          }));
        }
        return {
          ...e,
          children: n
        };
      }
      if (i.length !== t || i.some(
        (n, m) => {
          var s;
          return n !== ((s = e.children) == null ? void 0 : s[m]);
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
}, Fe = (e, t) => {
  const i = oe({}), r = y(
    (c, n, m) => {
      if (!t)
        return;
      const s = $e(e.layout, c);
      if (!s || !s.children)
        return;
      const x = s.children.findIndex(
        (p) => p.id === c
      ), w = x + 1;
      if (w >= s.children.length)
        return;
      const C = `${c}-${m}`;
      if (!i.current[C]) {
        const p = s.children[x], O = s.children[w];
        i.current[C] = {
          current: p.flex || 1,
          sibling: O.flex || 1
        };
      }
      const g = i.current[C], $ = g.current + g.sibling, _ = m === "horizontal" ? window.innerWidth : window.innerHeight, k = g.current / $ * _, d = g.sibling / $ * _, f = 100;
      let u = k + n, b = d - n;
      if (u < f) {
        const p = f - u;
        u = f, b -= p;
      }
      if (b < f) {
        const p = f - b;
        b = f, u -= p;
      }
      const z = u + b;
      if (z > 0) {
        const p = u / z * $, O = b / z * $, U = M(e.layout, s.id, {
          children: s.children.map((R, A) => A === x ? { ...R, flex: p } : A === w ? { ...R, flex: O } : R)
        });
        U && t({
          ...e,
          layout: U
        });
      }
    },
    [e, t]
  ), a = y(
    (c, n) => {
      const m = `${c}-${n}`;
      delete i.current[m];
    },
    []
  );
  return { handleResize: r, resetResize: a };
}, $e = (e, t) => {
  if (!e.children)
    return null;
  for (const i of e.children) {
    if (i.id === t)
      return e;
    const r = $e(i, t);
    if (r)
      return r;
  }
  return null;
}, Ee = (e, t) => {
  const [i, r] = te(null), [a, c] = te(null), [n, m] = te("center"), [s, x] = te(null), w = oe(null), C = y((d, f) => {
    const u = { tabsetId: d, tabIndex: f };
    r(u), w.current = u;
  }, []), g = y(() => {
    r(null), w.current = null, c(null), x(null);
  }, []), $ = y(
    (d, f, u = "center", b) => {
      d.preventDefault(), d.dataTransfer.dropEffect = "move", c(f), m(u), b !== void 0 ? x(b) : u !== "tab" && x(null);
    },
    []
  ), _ = y((d) => {
    d.currentTarget === d.target && setTimeout(() => {
      c(null), x(null);
    }, 50);
  }, []), k = y(
    (d, f) => {
      var le, h, v, F, H, V;
      d.preventDefault();
      const u = w.current;
      if (!u || !t)
        return;
      const { tabsetId: b, tabIndex: z } = u;
      if (b === f && n === "tab" && s !== null) {
        const L = ue(e.layout, b);
        if (!L || !L.children)
          return;
        const T = L.children[z];
        if (!T || z === s)
          return;
        const E = [...L.children];
        E.splice(z, 1), E.splice(s, 0, T);
        let D = L.selected ?? 0;
        z < D && s >= D ? D = Math.max(0, D - 1) : z > D && s <= D ? D = Math.min(D + 1, E.length - 1) : z === D && (D = s);
        const X = M(e.layout, b, {
          children: E,
          selected: D
        });
        X && t({
          ...e,
          layout: X
        }), r(null), c(null), x(null);
        return;
      }
      if (b === f && n !== "tab")
        return;
      const p = ue(e.layout, b), O = ue(e.layout, f);
      if (!p || !O || !p.children || !O.children)
        return;
      const U = p.children[z];
      if (!U)
        return;
      let R = e.layout;
      const A = p.children.filter(
        (L, T) => T !== z
      ), ie = M(
        R,
        b,
        {
          children: A,
          selected: Math.min(
            p.selected || 0,
            A.length - 1
          )
        }
      );
      if (!ie)
        return;
      if (R = ie, n === "center") {
        const L = { ...U, id: `${U.id}-${Date.now()}` }, T = M(
          R,
          f,
          {
            children: [...O.children || [], L],
            selected: ((le = O.children) == null ? void 0 : le.length) || 0
          }
        );
        if (!T)
          return;
        R = T;
      } else {
        const L = { ...U, id: `${U.id}-${Date.now()}` }, T = He(
          `${f}-split-${Date.now()}`,
          [L]
        ), E = we(R, f);
        if (E) {
          const D = ((h = E.children) == null ? void 0 : h.findIndex(
            (X) => X.id === f
          )) || 0;
          if (n === "left" || n === "right") {
            const X = We(`${f}-row-${Date.now()}`, [
              n === "left" ? T : O,
              n === "left" ? O : T
            ]), B = M(
              R,
              E.id,
              {
                children: [
                  ...((v = E.children) == null ? void 0 : v.slice(0, D)) || [],
                  X,
                  ...((F = E.children) == null ? void 0 : F.slice(D + 1)) || []
                ]
              }
            );
            if (!B)
              return;
            R = B;
          } else if (n === "top" || n === "bottom") {
            const X = ke(
              `${f}-column-${Date.now()}`,
              [
                n === "top" ? T : O,
                n === "top" ? O : T
              ]
            ), B = M(
              R,
              E.id,
              {
                children: [
                  ...((H = E.children) == null ? void 0 : H.slice(0, D)) || [],
                  X,
                  ...((V = E.children) == null ? void 0 : V.slice(D + 1)) || []
                ]
              }
            );
            if (!B)
              return;
            R = B;
          }
        }
      }
      const P = de(R);
      P && t({
        ...e,
        layout: P
      }), r(null), c(null);
    },
    [e, t, n, s]
  );
  return {
    draggedTab: i,
    dragOverTabset: a,
    dropPosition: n,
    dropTargetIndex: s,
    handleDragStart: C,
    handleDragEnd: g,
    handleDragOver: $,
    handleDragLeave: _,
    handleDrop: k
  };
}, Ke = "react-flex-layout";
class Le {
  constructor(t = {}) {
    fe(this, "storageKey");
    fe(this, "autoSave");
    fe(this, "debounceMs");
    fe(this, "saveTimeout", null);
    this.storageKey = `${Ke}-${t.key || "default"}`, this.autoSave = t.autoSave !== !1, this.debounceMs = t.debounceMs || 500;
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
const Me = (e) => new Le(e), Ge = () => {
  try {
    const e = "__localStorage_test__";
    return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
  } catch {
    return !1;
  }
}, Be = (e, t = {}) => {
  const { onLoad: i, onSave: r, onError: a, ...c } = t, n = oe(null), [m, s] = te(e), [x, w] = te(!1), [C, g] = te(!1);
  be(() => {
    n.current = new Le(c), g(!0);
  }, [c.key, c.autoSave, c.debounceMs]), be(() => {
    if (!n.current || x)
      return;
    const u = n.current.load();
    u ? (s(u), w(!0), i == null || i(u)) : w(!0);
  }, [x, i]);
  const $ = y(
    (u) => {
      if (n.current)
        try {
          n.current.isAutoSaveEnabled() ? n.current.debouncedSave(u) : n.current.save(u), r == null || r(u);
        } catch (b) {
          a == null || a(b);
        }
    },
    [r, a]
  ), _ = y(
    (u) => {
      const b = { ...u };
      u.global && (b.global = { ...u.global }), s(b), $(b);
    },
    [$]
  ), k = y(() => {
    if (n.current)
      try {
        n.current.clear();
      } catch (u) {
        a == null || a(u);
      }
  }, [a]), d = y(() => {
    var u;
    return ((u = n.current) == null ? void 0 : u.exists()) ?? !1;
  }, []), f = y(() => {
    var u;
    return ((u = n.current) == null ? void 0 : u.getStorageKey()) ?? "";
  }, []);
  return {
    model: m,
    updateModel: _,
    clearStorage: k,
    hasStoredData: d,
    getStorageKey: f,
    isLoaded: x,
    hasStorage: C
  };
};
const _e = Ne(
  ({
    model: e,
    factory: t,
    onModelChange: i,
    onAction: r,
    className: a = "",
    style: c = {},
    storage: n
  }, m) => {
    var D, X, B;
    const [s, x] = te(e), [w, C] = te(
      null
    ), {
      model: g,
      updateModel: $,
      isLoaded: _
    } = Be(e, {
      key: n == null ? void 0 : n.key,
      autoSave: n == null ? void 0 : n.autoSave,
      debounceMs: n == null ? void 0 : n.debounceMs,
      onLoad: (l) => {
        i ? i(l) : x(l);
      }
    }), k = n != null && n.enabled ? g : i ? e : s, d = y(
      (l) => {
        n != null && n.enabled ? ($(l), i && i(l)) : i ? i(l) : x(l);
      },
      [i, n == null ? void 0 : n.enabled, $]
    ), { handleResize: f, resetResize: u } = Fe(
      k,
      d
    ), {
      dragOverTabset: b,
      dropPosition: z,
      dropTargetIndex: p,
      handleDragStart: O,
      handleDragEnd: U,
      handleDragOver: R,
      handleDragLeave: A,
      handleDrop: ie
    } = Ee(k, d), P = oe(g);
    be(() => {
      P.current = g;
    }, [g]);
    const le = oe(s);
    be(() => {
      le.current = s;
    }, [s]);
    const h = y(
      (l) => {
        if (n != null && n.enabled) {
          const K = P.current;
          if (l.type === "changeDirection") {
            const { direction: o } = l.payload;
            C(o);
          }
          const S = ((o) => {
            switch (l.type) {
              case "selectTab":
                const { nodeId: I, tabIndex: Y } = l.payload, W = M(o.layout, I, {
                  selected: Y
                });
                return !W || W === o.layout ? o : {
                  ...o,
                  layout: W
                };
              case "removeNode":
                const { nodeId: ee, tabIndex: J } = l.payload, j = ue(o.layout, ee);
                if (j && j.children) {
                  const G = j.children.filter(
                    (he, De) => De !== J
                  ), Z = j.selected ?? 0;
                  let ne = Z;
                  J <= Z && (ne = Math.max(0, Z - 1)), ne = Math.min(
                    ne,
                    G.length - 1
                  );
                  const ge = {
                    ...j,
                    children: G,
                    selected: G.length > 0 ? ne : void 0
                  }, se = M(
                    o.layout,
                    ee,
                    ge
                  );
                  if (se) {
                    const he = de(se);
                    if (he)
                      return {
                        ...o,
                        layout: he
                      };
                  }
                }
                return o;
              case "closeTabset":
                const { nodeId: ae } = l.payload, ce = M(
                  o.layout,
                  ae,
                  null
                );
                if (ce) {
                  const G = de(ce);
                  if (G)
                    return {
                      ...o,
                      layout: G
                    };
                }
                return o;
              case "changeDirection":
                const { direction: Q } = l.payload;
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
          })(K);
          $(S), i && i(S), r == null || r(l);
        } else
          r == null || r(l);
        if (!(n != null && n.enabled) && !i) {
          const K = le.current, S = ((o) => {
            switch (l.type) {
              case "selectTab":
                const { nodeId: I, tabIndex: Y } = l.payload, W = M(o.layout, I, {
                  selected: Y
                });
                return !W || W === o.layout ? o : {
                  ...o,
                  layout: W
                };
              case "removeNode":
                const { nodeId: ee, tabIndex: J } = l.payload, j = ue(o.layout, ee);
                if (j && j.children) {
                  const Q = j.children.filter(
                    (se, he) => he !== J
                  ), G = j.selected ?? 0;
                  let Z = G;
                  J <= G && (Z = Math.max(0, G - 1)), Z = Math.min(
                    Z,
                    Q.length - 1
                  );
                  const ne = {
                    ...j,
                    children: Q,
                    selected: Q.length > 0 ? Z : void 0
                  }, ge = M(
                    o.layout,
                    ee,
                    ne
                  );
                  if (ge) {
                    const se = de(ge);
                    if (se)
                      return {
                        ...o,
                        layout: se
                      };
                  }
                }
                return o;
              case "closeTabset":
                const { nodeId: ae } = l.payload, ce = M(
                  o.layout,
                  ae,
                  null
                );
                if (ce) {
                  const Q = de(ce);
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
          })(K);
          x(S);
        }
      },
      [r, i, n == null ? void 0 : n.enabled, $]
    );
    Ce(
      m,
      () => ({
        handleAction: h
      }),
      [h]
    );
    const v = y(
      (l, K) => {
        h({
          type: "selectTab",
          payload: { nodeId: l, tabIndex: K }
        });
      },
      [h]
    ), F = y(
      (l, K) => {
        h({
          type: "removeNode",
          payload: { nodeId: l, tabIndex: K }
        });
      },
      [h]
    );
    let H;
    n != null && n.enabled ? w !== null ? H = w : H = ((D = g == null ? void 0 : g.global) == null ? void 0 : D.direction) || "ltr" : H = ((X = k.global) == null ? void 0 : X.direction) || "ltr";
    const V = ((B = k.global) == null ? void 0 : B.splitterSize) || 8, L = y(
      (l) => {
        var K;
        switch (l.type) {
          case "tabset":
            return /* @__PURE__ */ N(
              Se,
              {
                node: l,
                factory: t,
                onTabSelect: v,
                onTabClose: F,
                onTabDragStart: O,
                onTabDragEnd: U,
                onDragOver: R,
                onDragLeave: A,
                onDrop: ie,
                dragOverTabset: b,
                dropPosition: b === l.id ? z : void 0,
                dropTargetIndex: b === l.id ? p : void 0,
                direction: H
              },
              l.id
            );
          case "row":
            const q = H === "rtl", S = l.children || [], o = q ? [...S].reverse() : S;
            return /* @__PURE__ */ N(
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
                children: o.map((I, Y) => {
                  const W = Y + 1;
                  if (!(W < o.length))
                    return /* @__PURE__ */ N(me.Fragment, { children: L(I) }, I.id);
                  const J = q ? S.length - 1 - Y : Y, j = q ? S.length - 1 - W : W, ae = Math.min(
                    J,
                    j
                  );
                  if (Math.max(
                    J,
                    j
                  ) !== ae + 1)
                    return /* @__PURE__ */ N(me.Fragment, { children: L(I) }, I.id);
                  const Q = S[ae], G = q && J > j;
                  return /* @__PURE__ */ re(me.Fragment, { children: [
                    L(I),
                    /* @__PURE__ */ N(
                      xe,
                      {
                        direction: "horizontal",
                        onResize: (Z) => {
                          const ne = G ? -Z : Z;
                          f(
                            Q.id,
                            ne,
                            "horizontal"
                          );
                        },
                        onResizeStart: () => {
                          u(Q.id, "horizontal");
                        },
                        size: V
                      }
                    )
                  ] }, I.id);
                })
              },
              l.id
            );
          case "column":
            return /* @__PURE__ */ N(
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
                children: (K = l.children) == null ? void 0 : K.map((I, Y) => {
                  var W;
                  return /* @__PURE__ */ re(me.Fragment, { children: [
                    L(I),
                    Y < (((W = l.children) == null ? void 0 : W.length) || 0) - 1 && /* @__PURE__ */ N(
                      xe,
                      {
                        direction: "vertical",
                        onResize: (ee) => f(I.id, ee, "vertical"),
                        onResizeStart: () => {
                          u(I.id, "vertical");
                        },
                        size: V
                      }
                    )
                  ] }, I.id);
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
        H,
        V,
        t,
        v,
        F,
        f,
        O,
        U,
        R,
        A,
        ie,
        b,
        z
      ]
    );
    be(() => {
      !(n != null && n.enabled) && w !== null && C(null);
    }, [n == null ? void 0 : n.enabled, w]);
    const T = ye(
      () => L(k.layout),
      [L, k.layout]
    ), E = {
      ...c,
      height: "100%",
      width: "100%"
    };
    return n != null && n.enabled && !_ ? /* @__PURE__ */ N(
      "div",
      {
        className: `react-flex-layout ${a}`,
        style: {
          ...E,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ N("div", { children: "Loading layout..." })
      }
    ) : /* @__PURE__ */ N(
      "div",
      {
        className: `react-flex-layout ${a}`,
        style: E,
        dir: H,
        children: T
      }
    );
  }
);
_e.displayName = "Layout";
const Ve = ({
  size: e = 16,
  color: t = "#666",
  className: i = ""
}) => /* @__PURE__ */ re(
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
      /* @__PURE__ */ N("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ N("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
), je = ve(Te, (e, t) => e.node.id === t.node.id && e.node.name === t.node.name && e.node.enableClose === t.node.enableClose && e.node.enableDrag === t.node.enableDrag && e.className === t.className);
je.displayName = "MemoizedTab";
export {
  Ve as DefaultCloseIcon,
  _e as Layout,
  Le as LayoutStorage,
  je as MemoizedTab,
  Se as MemoizedTabSet,
  xe as Splitter,
  Te as Tab,
  ze as TabSet,
  Ie as calculateFlexValues,
  ke as createColumn,
  Ye as createLayoutModel,
  Me as createLayoutStorage,
  We as createRow,
  Je as createTab,
  He as createTabSet,
  ue as findNodeById,
  Ge as isLocalStorageAvailable,
  de as removeEmptyTabsets,
  Oe as removeNodeById,
  M as updateNodeById,
  Be as useLayoutStorage
};
