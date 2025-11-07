import { jsxs as ce, jsx as O } from "react/jsx-runtime";
import he, { useRef as J, useCallback as C, useEffect as ie, useMemo as P, memo as ye, useState as re, forwardRef as $e, useImperativeHandle as pe } from "react";
const He = ({
  size: e = 16,
  color: t = "#666",
  className: n = ""
}) => /* @__PURE__ */ ce(
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
      /* @__PURE__ */ O("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ O("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
), xe = ({
  node: e,
  index: t,
  onClose: n,
  onSelect: i,
  onDragStart: l,
  onDragEnd: c,
  className: r = "",
  style: f = {},
  closeIcon: s,
  closeButtonClassName: u = ""
}) => {
  const h = J(!1), m = C(() => {
    i?.(e.id);
  }, [e.id, i]), y = C(
    (D) => {
      D.stopPropagation(), n?.(e.id);
    },
    [e.id, n]
  ), w = C(
    (D) => {
      D.dataTransfer.setData("text/plain", e.id), D.dataTransfer.effectAllowed = "move", D.currentTarget.classList.add("dragging"), document.body.classList.add("dragging"), h.current = !0, l?.(e.id, t);
    },
    [e.id, t, l]
  ), N = C(
    (D) => {
      D.currentTarget.classList.remove("dragging"), document.body.classList.remove("dragging"), h.current = !1, c?.();
    },
    [c]
  );
  ie(() => () => {
    h.current && (document.body.classList.remove("dragging"), h.current = !1);
  }, []);
  const E = P(() => ({ ...f, cursor: "grab" }), [f]);
  return /* @__PURE__ */ ce(
    "div",
    {
      className: `react-flex-layout-tab ${r}`,
      style: E,
      onClick: m,
      draggable: !0,
      onDragStart: w,
      onDragEnd: N,
      children: [
        /* @__PURE__ */ O("span", { className: "react-flex-layout-tab-title", children: e.name || "Untitled" }),
        /* @__PURE__ */ O(
          "button",
          {
            className: `react-flex-layout-tab-close ${u}`.trim(),
            onClick: y,
            type: "button",
            "aria-label": "Close tab",
            children: s || /* @__PURE__ */ O(He, {})
          }
        )
      ]
    }
  );
}, ze = ({
  node: e,
  children: t,
  factory: n,
  onTabSelect: i,
  onTabClose: l,
  onTabDragStart: c,
  onTabDragEnd: r,
  onDragOver: f,
  onDragLeave: s,
  onDrop: u,
  dragOverTabset: h,
  dropPosition: m,
  dropTargetIndex: y,
  direction: w = "ltr",
  className: N = "",
  style: E = {},
  closeIcon: D,
  closeButtonClassName: I
}) => {
  const d = P(() => e.children?.filter((T) => T.type === "tab") || [], [e.children]), g = P(() => {
    const T = /* @__PURE__ */ new Map();
    for (let x = 0; x < d.length; x++) {
      const K = d[x];
      K && K.id && T.set(K.id, x);
    }
    return T;
  }, [d]), v = P(() => w === "rtl" ? [...d].reverse() : d, [d, w]), $ = e.selected ?? 0, S = Math.min(
    $,
    Math.max(0, d.length - 1)
  ), b = d[S], R = C(
    (T) => {
      const x = g.get(T);
      x !== void 0 && x !== -1 && i?.(e.id, x);
    },
    [e.id, g, i]
  ), ee = C(
    (T) => {
      const x = g.get(T);
      x !== void 0 && x !== -1 && l?.(e.id, x);
    },
    [e.id, g, l]
  ), X = C(
    (T, x) => {
      const K = x !== void 0 ? x : g.get(T) ?? -1;
      K !== -1 && c?.(e.id, K);
    },
    [e.id, g, c]
  ), te = J(null), p = C(
    (T) => {
      T.preventDefault(), T.dataTransfer.dropEffect = "move";
      const x = T.currentTarget.getBoundingClientRect(), K = T.clientX - x.left, V = T.clientY - x.top, ge = x.width, de = x.height;
      let a = "center";
      if (V < 40) {
        const Z = te.current;
        if (Z) {
          const o = Z.getBoundingClientRect(), Y = T.clientX - o.left, F = Z.querySelectorAll(
            ".react-flex-layout-tab"
          );
          let j = d.length;
          if (w === "rtl") {
            for (let z = F.length - 1; z >= 0; z--) {
              const W = F[z].getBoundingClientRect(), A = W.left - o.left, ae = W.right - o.left, M = (A + ae) / 2;
              if (Y > M) {
                const k = g.get(v[z].id);
                k !== void 0 && k !== -1 && (j = k);
                break;
              }
            }
            if (j === d.length && F.length > 0) {
              const z = F[0].getBoundingClientRect();
              if (Y > z.right - o.left) {
                const W = g.get(v[0].id);
                W !== void 0 && W !== -1 && (j = W);
              }
            }
          } else
            for (let z = 0; z < F.length; z++) {
              const W = F[z].getBoundingClientRect(), A = W.left - o.left, ae = W.right - o.left, M = (A + ae) / 2;
              if (Y < M) {
                const k = g.get(v[z].id);
                k !== void 0 && k !== -1 && (j = k);
                break;
              }
            }
          a = "tab", f?.(T, e.id, a, j);
          return;
        }
      }
      K < ge * 0.25 ? a = "left" : K > ge * 0.75 ? a = "right" : V < de * 0.25 ? a = "top" : V > de * 0.75 ? a = "bottom" : a = "center", f?.(T, e.id, a);
    },
    [e.id, w, d.length, v, g, f]
  ), H = C(
    (T) => {
      s?.(T);
    },
    [s]
  ), _ = C(
    (T) => {
      u?.(T, e.id);
    },
    [e.id, u]
  ), L = h === e.id, U = {
    ...E,
    width: e.width ? `${e.width}%` : void 0,
    height: e.height ? `${e.height}%` : void 0,
    flex: `${e.flex || 1} 1 0%`,
    minWidth: e.minWidth ? `${e.minWidth}px` : void 0,
    minHeight: e.minHeight ? `${e.minHeight}px` : void 0,
    maxWidth: e.maxWidth ? `${e.maxWidth}px` : void 0,
    maxHeight: e.maxHeight ? `${e.maxHeight}px` : void 0
  };
  return d.length === 0 ? null : /* @__PURE__ */ ce(
    "div",
    {
      className: `react-flex-layout-tabset ${L ? "drag-over" : ""} ${N}`,
      style: U,
      "data-drop-position": L ? m : void 0,
      onDragOver: p,
      onDragLeave: H,
      onDrop: _,
      children: [
        /* @__PURE__ */ ce("div", { className: "react-flex-layout-tabset-header", ref: te, children: [
          v.map((T) => {
            const x = g.get(T.id) ?? -1, K = x === S, V = L && m === "tab" && y !== null && x === y;
            return /* @__PURE__ */ ce(he.Fragment, { children: [
              V && /* @__PURE__ */ O("div", { className: "react-flex-layout-tab-drop-indicator" }),
              /* @__PURE__ */ O(
                xe,
                {
                  node: T,
                  index: x,
                  onSelect: R,
                  onClose: ee,
                  onDragStart: X,
                  onDragEnd: r,
                  className: K ? "active" : "",
                  closeIcon: D,
                  closeButtonClassName: I
                }
              )
            ] }, T.id);
          }),
          L && m === "tab" && y !== null && y === d.length && /* @__PURE__ */ O("div", { className: "react-flex-layout-tab-drop-indicator" })
        ] }),
        /* @__PURE__ */ O("div", { className: "react-flex-layout-tabset-content", children: b && (n ? n(b) : t) })
      ]
    }
  );
}, ve = ye(
  ze,
  (e, t) => {
    if (e.className !== t.className || e.direction !== t.direction || e.dragOverTabset !== t.dragOverTabset || e.dropPosition !== t.dropPosition || e.dropTargetIndex !== t.dropTargetIndex || e.factory !== t.factory || e.onTabSelect !== t.onTabSelect || e.onTabClose !== t.onTabClose || e.onTabDragStart !== t.onTabDragStart || e.onTabDragEnd !== t.onTabDragEnd || e.onDragOver !== t.onDragOver || e.onDragLeave !== t.onDragLeave || e.onDrop !== t.onDrop || e.closeIcon !== t.closeIcon || e.closeButtonClassName !== t.closeButtonClassName || e.style !== t.style || e.children !== t.children) return !1;
    if (e.node !== t.node) {
      if (e.node.id !== t.node.id || e.node.selected !== t.node.selected || e.node.width !== t.node.width || e.node.height !== t.node.height || e.node.flex !== t.node.flex || e.node.minWidth !== t.node.minWidth || e.node.minHeight !== t.node.minHeight || e.node.maxWidth !== t.node.maxWidth || e.node.maxHeight !== t.node.maxHeight) return !1;
      const n = e.node.children || [], i = t.node.children || [];
      if (n.length !== i.length) return !1;
      for (let l = 0; l < n.length; l++)
        if (n[l] !== i[l]) {
          const c = n[l], r = i[l];
          if (c.id !== r.id || c.type !== r.type || c.name !== r.name || c.component !== r.component || c.enableClose !== r.enableClose || c.enableDrag !== r.enableDrag)
            return !1;
        }
    }
    return !0;
  }
);
ve.displayName = "MemoizedTabSet";
const me = ({
  direction: e,
  onResize: t,
  onResizeStart: n,
  size: i = 8,
  className: l = "",
  style: c = {},
  customStyles: r = {}
}) => {
  const [f, s] = re(!1), u = J(0), h = J(0), m = J(!1), y = J(null), w = J(null), N = C(
    (d) => {
      d.preventDefault(), d.stopPropagation(), s(!0), u.current = e === "horizontal" ? d.clientX : d.clientY, h.current = u.current, n?.();
      const g = ($) => {
        h.current = e === "horizontal" ? $.clientX : $.clientY, m.current || (m.current = !0, requestAnimationFrame(() => {
          m.current = !1;
          const S = h.current - u.current;
          t(S);
        }));
      }, v = () => {
        s(!1), document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", v), y.current = null, w.current = null, m.current = !1;
      };
      document.addEventListener("mousemove", g), document.addEventListener("mouseup", v), y.current = g, w.current = v;
    },
    [e, t, n]
  ), E = {
    backgroundColor: "#ffffff",
    border: "none",
    outline: "none"
  }, D = P(() => f && r.active ? r.active : r.default ? r.default : E, [f, r.active, r.default]), I = P(() => {
    const d = e === "horizontal";
    return {
      ...c,
      width: d ? `${i}px` : "100%",
      height: d ? "100%" : `${i}px`,
      minWidth: d ? `${i}px` : void 0,
      minHeight: d ? void 0 : `${i}px`,
      flexShrink: 0,
      cursor: d ? "col-resize" : "row-resize",
      ...D,
      transition: f ? "none" : "all 0.2s ease"
    };
  }, [e, i, c, D, f]);
  return ie(() => () => {
    y.current && document.removeEventListener("mousemove", y.current), w.current && document.removeEventListener("mouseup", w.current), m.current = !1;
  }, []), /* @__PURE__ */ O(
    "div",
    {
      className: `react-flex-layout-splitter ${l}`,
      style: I,
      onMouseDown: N
    }
  );
}, qe = (e, t) => ({
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
}), Ee = (e, t, n, i) => ({
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
}), Oe = (e, t, n, i) => ({
  id: e,
  type: "row",
  children: Ie(t),
  width: n,
  height: i,
  enableResize: !0
}), We = (e, t, n, i) => ({
  id: e,
  type: "column",
  children: Ie(t),
  width: n,
  height: i,
  enableResize: !0
}), Q = (e, t) => {
  if (e.id === t)
    return e;
  if (e.children)
    for (const n of e.children) {
      const i = Q(n, t);
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
}, B = (e, t, n) => {
  if (e.id === t)
    return n === null ? null : Object.keys(n).some(
      (l) => e[l] !== n[l]
    ) ? { ...e, ...n } : e;
  if (e.children) {
    let i = null;
    const l = e.children;
    for (let c = 0; c < l.length; c++) {
      const r = l[c], f = B(r, t, n);
      f !== r && i === null && (i = l.slice(0, c)), i !== null && f !== null && i.push(f);
    }
    return i === null ? e : {
      ...e,
      children: i
    };
  }
  return e;
}, De = (e, t) => {
  if (!e.children)
    return e;
  let n = null;
  const i = e.children;
  for (let l = 0; l < i.length; l++) {
    const c = i[l];
    if (c.id === t) {
      n === null && (n = i.slice(0, l));
      continue;
    }
    const r = De(c, t);
    r !== c && n === null && (n = i.slice(0, l)), n !== null && n.push(r);
  }
  return n === null ? e : {
    ...e,
    children: n
  };
}, Ie = (e) => e.map((t) => ({
  ...t,
  flex: t.flex || 1 / e.length
})), ue = (e) => {
  if (e.type === "tabset" && (!e.children || e.children.length === 0))
    return null;
  if (e.children) {
    const t = e.children, n = t.length;
    let i = null;
    for (let r = 0; r < t.length; r++) {
      const f = t[r], s = ue(f);
      s !== f && i === null && (i = t.slice(0, r)), i !== null && s !== null && i.push(s);
    }
    const l = i ?? t, c = l.length < n;
    if (l.length === 0)
      return null;
    if ((e.type === "row" || e.type === "column") && l.length > 0) {
      const r = l.reduce(
        (s, u) => s + (u.flex || 0),
        0
      );
      if (c || r < 0.999 || l.length === 1) {
        let s;
        if (l.length === 1)
          s = l.map((u) => ({
            ...u,
            flex: 1
          }));
        else if (r === 0 || r < 1e-3) {
          const u = 1 / l.length;
          s = l.map((h) => ({
            ...h,
            flex: u
          }));
        } else {
          const u = 1 / r;
          s = l.map((h) => ({
            ...h,
            flex: (h.flex || 0) * u
          }));
        }
        return {
          ...e,
          children: s
        };
      }
      if (l.length !== n || l.some((s, u) => s !== t[u]))
        return {
          ...e,
          children: l
        };
    }
    if (i !== null)
      return {
        ...e,
        children: l
      };
  }
  return e;
}, Le = (e, t, n = null) => {
  if (!e.children) return null;
  for (const i of e.children) {
    if (i.id === t)
      return n || e;
    if (i.children) {
      const l = Le(i, t, e);
      if (l) return l;
    }
  }
  return null;
}, we = (e, t) => {
  if (!e.children) return null;
  for (const n of e.children) {
    if (n.type === "tabset" && n.children && n.children.find((l) => l.id === t))
      return n;
    if (n.children) {
      const i = we(n, t);
      if (i) return i;
    }
  }
  return null;
}, Ae = (e, t, n) => {
  const i = Q(e, t);
  if (!i || i.type !== "tabset")
    return null;
  const c = [...i.children || [], n], r = {
    ...i,
    children: c,
    selected: c.length - 1
  };
  return B(e, t, r);
}, Ye = (e, t) => {
  const n = we(e, t);
  if (!n || n.type !== "tabset")
    return { layout: e, restoreData: null };
  const i = n.children?.find((m) => m.id === t);
  if (!i || i.type !== "tab")
    return { layout: e, restoreData: null };
  const l = n.children?.findIndex(
    (m) => m.id === t
  ), c = n.children?.filter(
    (m) => m.id !== t
  );
  if (!c || c.length === 0) {
    const m = De(e, n.id), y = {
      tabId: i.id,
      component: i.component || "",
      name: i.name || "",
      tabsetId: n.id,
      tabIndex: l !== void 0 ? l : 0,
      config: i.config
    };
    return {
      layout: m,
      restoreData: y
    };
  }
  const r = n.selected ?? 0;
  let f = r;
  l !== void 0 && l !== -1 && (l <= r && (f = Math.max(0, r - 1)), f = Math.min(f, c.length - 1));
  const s = {
    ...n,
    children: c,
    selected: c.length > 0 ? f : void 0
  }, u = B(e, n.id, s), h = {
    tabId: i.id,
    component: i.component || "",
    name: i.name || "",
    tabsetId: n.id,
    tabIndex: l !== void 0 ? l : 0,
    config: i.config
  };
  return {
    layout: u,
    restoreData: h
  };
}, Ge = (e, t, n) => {
  if (Q(e, t.tabId))
    return e;
  let l = Q(e, t.tabsetId);
  if (!l || l.type !== "tabset") {
    if (!n)
      return null;
    const f = Le(
      n,
      t.tabsetId
    );
    if (!f)
      return null;
    const s = Q(e, f.id);
    if (!s || !s.children)
      return null;
    const u = s.children.find(
      (h) => h.id === t.tabsetId
    );
    if (u)
      l = u;
    else {
      const h = Se(t.tabsetId, []), m = [...s.children, h], y = {
        ...s,
        children: m
      }, w = B(
        e,
        s.id,
        y
      );
      if (!w || (e = w, l = Q(e, t.tabsetId), !l || l.type !== "tabset"))
        return null;
    }
  }
  const c = Ee(
    t.tabId,
    t.component,
    t.name,
    t.config
  );
  return Ae(e, t.tabsetId, c);
}, Ve = (e, t) => Q(e, t) !== null, ke = (e, t) => {
  const n = J({}), i = J({}), l = C(
    (r, f, s) => {
      if (!t) return;
      const u = Ce(e.layout, r);
      if (!u || !u.children) return;
      const h = u.children.findIndex(
        (S) => S.id === r
      ), m = h + 1;
      if (m >= u.children.length) return;
      const y = `${r}-${s}`;
      if (!n.current[y]) {
        const S = u.children[h], b = u.children[m];
        n.current[y] = {
          current: S.flex || 1,
          sibling: b.flex || 1
        };
      }
      const w = n.current[y], N = w.current + w.sibling, E = s === "horizontal" ? window.innerWidth : window.innerHeight, D = w.current / N * E, I = w.sibling / N * E, d = 100;
      let g = D + f, v = I - f;
      if (g < d) {
        const S = d - g;
        g = d, v -= S;
      }
      if (v < d) {
        const S = d - v;
        v = d, g -= S;
      }
      const $ = g + v;
      if ($ > 0) {
        const S = g / $ * N, b = v / $ * N, R = i.current[y], ee = 1e-4;
        if (R && Math.abs(R.current - S) < ee && Math.abs(R.sibling - b) < ee)
          return;
        const X = u.children.slice(), te = X[h], p = X[m];
        X[h] = { ...te, flex: S }, X[m] = { ...p, flex: b };
        const H = B(e.layout, u.id, {
          children: X
        });
        H && (i.current[y] = {
          current: S,
          sibling: b
        }, t({
          ...e,
          layout: H
        }));
      }
    },
    [e, t]
  ), c = C(
    (r, f) => {
      const s = `${r}-${f}`;
      delete n.current[s], delete i.current[s];
    },
    []
  );
  return { handleResize: l, resetResize: c };
}, Ce = (e, t) => {
  if (!e.children) return null;
  for (const n of e.children) {
    if (n.id === t)
      return e;
    const i = Ce(n, t);
    if (i) return i;
  }
  return null;
}, Fe = (e, t) => {
  const [n, i] = re(null), [l, c] = re(null), [r, f] = re("center"), [s, u] = re(null), h = J(null), m = C((D, I) => {
    const d = { tabsetId: D, tabIndex: I };
    i(d), h.current = d;
  }, []), y = C(() => {
    i(null), h.current = null, c(null), u(null);
  }, []), w = C(
    (D, I, d = "center", g) => {
      D.preventDefault(), D.dataTransfer.dropEffect = "move", c(I), f(d), g !== void 0 ? u(g) : d !== "tab" && u(null);
    },
    []
  ), N = C((D) => {
    D.currentTarget === D.target && setTimeout(() => {
      c(null), u(null);
    }, 50);
  }, []), E = C(
    (D, I) => {
      D.preventDefault();
      const d = h.current;
      if (!d || !t)
        return;
      const { tabsetId: g, tabIndex: v } = d;
      if (g === I && r === "tab" && s !== null) {
        const p = Q(e.layout, g);
        if (!p || !p.children)
          return;
        const H = p.children[v];
        if (!H || v === s)
          return;
        const _ = [...p.children];
        _.splice(v, 1), _.splice(s, 0, H);
        let L = p.selected ?? 0;
        v < L && s >= L ? L = Math.max(0, L - 1) : v > L && s <= L ? L = Math.min(L + 1, _.length - 1) : v === L && (L = s);
        const U = B(e.layout, g, {
          children: _,
          selected: L
        });
        U && t({
          ...e,
          layout: U,
          metadata: e.metadata
        }), i(null), c(null), u(null);
        return;
      }
      if (g === I && r !== "tab")
        return;
      const $ = Q(e.layout, g), S = Q(e.layout, I);
      if (!$ || !S || !$.children || !S.children)
        return;
      const b = $.children[v];
      if (!b)
        return;
      let R = e.layout;
      const ee = $.children.filter(
        (p, H) => H !== v
      ), X = B(
        R,
        g,
        {
          children: ee,
          selected: Math.min(
            $.selected || 0,
            ee.length - 1
          )
        }
      );
      if (!X) return;
      if (R = X, r === "center") {
        const p = B(
          R,
          I,
          {
            children: [...S.children || [], b],
            selected: S.children?.length || 0
          }
        );
        if (!p) return;
        R = p;
      } else {
        const p = Se(
          `${I}-split-${Date.now()}`,
          [b]
        ), H = Te(R, I);
        if (H) {
          const _ = H.children?.findIndex(
            (L) => L.id === I
          ) || 0;
          if (r === "left" || r === "right") {
            const L = Oe(`${I}-row-${Date.now()}`, [
              r === "left" ? p : S,
              r === "left" ? S : p
            ]), U = B(
              R,
              H.id,
              {
                children: [
                  ...H.children?.slice(0, _) || [],
                  L,
                  ...H.children?.slice(_ + 1) || []
                ]
              }
            );
            if (!U) return;
            R = U;
          } else if (r === "top" || r === "bottom") {
            const L = We(
              `${I}-column-${Date.now()}`,
              [
                r === "top" ? p : S,
                r === "top" ? S : p
              ]
            ), U = B(
              R,
              H.id,
              {
                children: [
                  ...H.children?.slice(0, _) || [],
                  L,
                  ...H.children?.slice(_ + 1) || []
                ]
              }
            );
            if (!U) return;
            R = U;
          }
        }
      }
      const te = ue(R);
      te && t({
        ...e,
        layout: te,
        metadata: e.metadata
      }), i(null), c(null);
    },
    [e, t, r, s]
  );
  return {
    draggedTab: n,
    dragOverTabset: l,
    dropPosition: r,
    dropTargetIndex: s,
    handleDragStart: m,
    handleDragEnd: y,
    handleDragOver: w,
    handleDragLeave: N,
    handleDrop: E
  };
}, Be = "react-flex-layout";
class Re {
  storageKey;
  autoSave;
  debounceMs;
  saveTimeout = null;
  lastSavedString = null;
  isAvailable;
  constructor(t = {}) {
    this.storageKey = `${Be}-${t.key || "default"}`, this.autoSave = t.autoSave !== !1, this.debounceMs = t.debounceMs || 500, this.isAvailable = Ke();
  }
  save(t) {
    if (this.isAvailable)
      try {
        const n = JSON.stringify(t);
        if (n === this.lastSavedString) return;
        localStorage.setItem(this.storageKey, n), this.lastSavedString = n;
      } catch {
      }
  }
  load() {
    if (!this.isAvailable) return null;
    try {
      const t = localStorage.getItem(this.storageKey);
      if (t)
        return this.lastSavedString = t, JSON.parse(t);
    } catch {
    }
    return null;
  }
  clear() {
    if (this.isAvailable)
      try {
        localStorage.removeItem(this.storageKey), this.lastSavedString = null;
      } catch {
      }
  }
  exists() {
    return this.isAvailable ? localStorage.getItem(this.storageKey) !== null : !1;
  }
  debouncedSave(t) {
    this.autoSave && this.isAvailable && (this.saveTimeout && clearTimeout(this.saveTimeout), this.saveTimeout = setTimeout(() => {
      this.save(t);
    }, this.debounceMs));
  }
  getStorageKey() {
    return this.storageKey;
  }
  isAutoSaveEnabled() {
    return this.autoSave;
  }
  cancel() {
    this.saveTimeout && (clearTimeout(this.saveTimeout), this.saveTimeout = null);
  }
}
const Me = (e) => new Re(e), Ke = () => {
  try {
    const e = "__localStorage_test__";
    return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
  } catch {
    return !1;
  }
}, _e = (e, t = {}) => {
  const { onLoad: n, onSave: i, onError: l, ...c } = t, r = J(null), [f, s] = re(e), [u, h] = re(!1), [m, y] = re(!1);
  ie(() => {
    if (r.current)
      try {
        r.current.cancel?.();
      } catch {
      }
    r.current = new Re(c), y(!0);
  }, [c.key, c.autoSave, c.debounceMs]), ie(() => {
    if (!r.current || u) return;
    const b = r.current.load();
    b ? (s(b), h(!0), n?.(b)) : h(!0);
  }, [u, n]);
  const w = J(), N = P(
    () => JSON.stringify(f.layout),
    [f.layout]
  ), E = P(
    () => JSON.stringify(e.layout),
    [e.layout]
  ), D = P(
    () => f.metadata ? JSON.stringify(f.metadata) : void 0,
    [f.metadata]
  ), I = P(
    () => e.metadata ? JSON.stringify(e.metadata) : void 0,
    [e.metadata]
  );
  ie(() => {
    if (!(!u || !r.current)) {
      if (w.current !== E && N !== E) {
        const b = { ...e };
        e.global && (b.global = { ...e.global }), s(b), w.current = E, r.current.isAutoSaveEnabled() ? r.current.debouncedSave(b) : r.current.save(b);
        return;
      }
      e.metadata && D !== I && s((b) => ({
        ...b,
        metadata: e.metadata
      }));
    }
  }, [
    u,
    r,
    e,
    N,
    E,
    D,
    I
  ]);
  const d = C(
    (b) => {
      if (r.current)
        try {
          r.current.isAutoSaveEnabled() ? r.current.debouncedSave(b) : r.current.save(b), i?.(b);
        } catch (R) {
          l?.(R);
        }
    },
    [i, l]
  ), g = C(
    (b) => {
      const R = { ...b };
      b.global && (R.global = { ...b.global }), s(R), d(R);
    },
    [d]
  ), v = C(() => {
    if (r.current)
      try {
        r.current.clear();
      } catch (b) {
        l?.(b);
      }
  }, [l]), $ = C(() => r.current?.exists() ?? !1, []), S = C(() => r.current?.getStorageKey() ?? "", []);
  return {
    model: f,
    updateModel: g,
    clearStorage: v,
    hasStoredData: $,
    getStorageKey: S,
    isLoaded: u,
    hasStorage: m
  };
}, je = $e(
  ({
    model: e,
    factory: t,
    onModelChange: n,
    onAction: i,
    className: l = "",
    style: c = {},
    storage: r,
    closeIcon: f,
    closeButtonClassName: s
  }, u) => {
    const [h, m] = re(e), [y, w] = re(
      null
    ), {
      model: N,
      updateModel: E,
      isLoaded: D
    } = _e(e, {
      key: r?.key,
      autoSave: r?.autoSave,
      debounceMs: r?.debounceMs,
      onLoad: (a) => {
        n ? n(a) : m(a);
      }
    }), I = r?.enabled ? N : n ? e : h, d = C(
      (a) => {
        r?.enabled ? (E(a), n && n(a)) : n ? n(a) : m(a);
      },
      [n, r?.enabled, E]
    ), { handleResize: g, resetResize: v } = ke(
      I,
      d
    ), {
      dragOverTabset: $,
      dropPosition: S,
      dropTargetIndex: b,
      handleDragStart: R,
      handleDragEnd: ee,
      handleDragOver: X,
      handleDragLeave: te,
      handleDrop: p
    } = Fe(I, d), H = J(N);
    ie(() => {
      H.current = N;
    }, [N]);
    const _ = J(h);
    ie(() => {
      _.current = h;
    }, [h]);
    const L = C(
      (a) => {
        if (r?.enabled) {
          const q = H.current;
          if (a.type === "changeDirection") {
            const { direction: o } = a.payload;
            w(o);
          }
          const Z = ((o) => {
            switch (a.type) {
              case "selectTab":
                const { nodeId: Y, tabIndex: F } = a.payload, j = B(o.layout, Y, {
                  selected: F
                });
                return !j || j === o.layout ? o : {
                  ...o,
                  layout: j
                };
              case "removeNode":
                const { nodeId: z, tabIndex: W } = a.payload, A = Q(o.layout, z);
                if (A && A.children) {
                  const G = A.children.filter(
                    (fe, Ne) => Ne !== W
                  ), ne = A.selected ?? 0;
                  let se = ne;
                  W <= ne && (se = Math.max(0, ne - 1)), se = Math.min(
                    se,
                    G.length - 1
                  );
                  const be = {
                    ...A,
                    children: G,
                    selected: G.length > 0 ? se : void 0
                  }, oe = B(
                    o.layout,
                    z,
                    be
                  );
                  if (oe) {
                    const fe = ue(oe);
                    if (fe)
                      return {
                        ...o,
                        layout: fe
                      };
                  }
                }
                return o;
              case "closeTabset":
                const { nodeId: ae } = a.payload, M = B(
                  o.layout,
                  ae,
                  null
                );
                if (M) {
                  const G = ue(M);
                  if (G)
                    return {
                      ...o,
                      layout: G
                    };
                }
                return o;
              case "changeDirection":
                const { direction: k } = a.payload;
                return {
                  ...o,
                  global: {
                    ...o.global,
                    direction: k
                  }
                };
              default:
                return o;
            }
          })(q);
          E(Z), n && n(Z), i?.(a);
        } else
          i?.(a);
        if (!r?.enabled && !n) {
          const q = _.current, Z = ((o) => {
            switch (a.type) {
              case "selectTab":
                const { nodeId: Y, tabIndex: F } = a.payload, j = B(o.layout, Y, {
                  selected: F
                });
                return !j || j === o.layout ? o : {
                  ...o,
                  layout: j
                };
              case "removeNode":
                const { nodeId: z, tabIndex: W } = a.payload, A = Q(o.layout, z);
                if (A && A.children) {
                  const k = A.children.filter(
                    (oe, fe) => fe !== W
                  ), G = A.selected ?? 0;
                  let ne = G;
                  W <= G && (ne = Math.max(0, G - 1)), ne = Math.min(
                    ne,
                    k.length - 1
                  );
                  const se = {
                    ...A,
                    children: k,
                    selected: k.length > 0 ? ne : void 0
                  }, be = B(
                    o.layout,
                    z,
                    se
                  );
                  if (be) {
                    const oe = ue(be);
                    if (oe)
                      return {
                        ...o,
                        layout: oe
                      };
                  }
                }
                return o;
              case "closeTabset":
                const { nodeId: ae } = a.payload, M = B(
                  o.layout,
                  ae,
                  null
                );
                if (M) {
                  const k = ue(M);
                  if (k)
                    return {
                      ...o,
                      layout: k
                    };
                }
                return o;
              default:
                return o;
            }
          })(q);
          m(Z);
        }
      },
      [i, n, r?.enabled, E]
    );
    pe(
      u,
      () => ({
        handleAction: L
      }),
      [L]
    );
    const U = C(
      (a, q) => {
        L({
          type: "selectTab",
          payload: { nodeId: a, tabIndex: q }
        });
      },
      [L]
    ), T = C(
      (a, q) => {
        L({
          type: "removeNode",
          payload: { nodeId: a, tabIndex: q }
        });
      },
      [L]
    );
    let x;
    r?.enabled ? y !== null ? x = y : x = N?.global?.direction || "ltr" : x = I.global?.direction || "ltr";
    const K = I.global?.splitterSize || 8, V = C(
      (a) => {
        switch (a.type) {
          case "tabset":
            return /* @__PURE__ */ O(
              ve,
              {
                node: a,
                factory: t,
                onTabSelect: U,
                onTabClose: T,
                onTabDragStart: R,
                onTabDragEnd: ee,
                onDragOver: X,
                onDragLeave: te,
                onDrop: p,
                dragOverTabset: $,
                dropPosition: $ === a.id ? S : void 0,
                dropTargetIndex: $ === a.id ? b : void 0,
                direction: x,
                closeIcon: f,
                closeButtonClassName: s
              },
              a.id
            );
          case "row":
            const q = x === "rtl", le = a.children || [], Z = q ? [...le].reverse() : le;
            return /* @__PURE__ */ O(
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
                children: Z.map((o, Y) => {
                  const F = Y + 1;
                  if (!(F < Z.length))
                    return /* @__PURE__ */ O(he.Fragment, { children: V(o) }, o.id);
                  const z = q ? le.length - 1 - Y : Y, W = q ? le.length - 1 - F : F, A = Math.min(
                    z,
                    W
                  );
                  if (Math.max(
                    z,
                    W
                  ) !== A + 1)
                    return /* @__PURE__ */ O(he.Fragment, { children: V(o) }, o.id);
                  const M = le[A], k = q && z > W;
                  return /* @__PURE__ */ ce(he.Fragment, { children: [
                    V(o),
                    /* @__PURE__ */ O(
                      me,
                      {
                        direction: "horizontal",
                        onResize: (G) => {
                          const ne = k ? -G : G;
                          g(
                            M.id,
                            ne,
                            "horizontal"
                          );
                        },
                        onResizeStart: () => {
                          v(M.id, "horizontal");
                        },
                        size: K
                      }
                    )
                  ] }, o.id);
                })
              },
              a.id
            );
          case "column":
            return /* @__PURE__ */ O(
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
                children: a.children?.map((o, Y) => /* @__PURE__ */ ce(he.Fragment, { children: [
                  V(o),
                  Y < (a.children?.length || 0) - 1 && /* @__PURE__ */ O(
                    me,
                    {
                      direction: "vertical",
                      onResize: (F) => g(o.id, F, "vertical"),
                      onResizeStart: () => {
                        v(o.id, "vertical");
                      },
                      size: K
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
        x,
        K,
        t,
        U,
        T,
        g,
        R,
        ee,
        X,
        te,
        p,
        $,
        S,
        f,
        s
      ]
    );
    ie(() => {
      !r?.enabled && y !== null && w(null);
    }, [r?.enabled, y]), ie(() => {
      r?.enabled && y !== null && (N?.global?.direction || "ltr") === y && w(null);
    }, [r?.enabled, y, N?.global?.direction]);
    const ge = P(
      () => V(I.layout),
      [V, I.layout]
    ), de = {
      ...c,
      height: "100%",
      width: "100%"
    };
    return r?.enabled && !D ? /* @__PURE__ */ O(
      "div",
      {
        className: `react-flex-layout ${l}`,
        style: {
          ...de,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ O("div", { children: "Loading layout..." })
      }
    ) : /* @__PURE__ */ O(
      "div",
      {
        className: `react-flex-layout ${l}`,
        style: de,
        dir: x,
        children: ge
      }
    );
  }
);
je.displayName = "Layout";
const Je = ye(xe, (e, t) => !(e.className !== t.className || e.style !== t.style || e.closeIcon !== t.closeIcon || e.closeButtonClassName !== t.closeButtonClassName || e.index !== t.index || e.onSelect !== t.onSelect || e.onClose !== t.onClose || e.onDragStart !== t.onDragStart || e.onDragEnd !== t.onDragEnd || e.node.id !== t.node.id || e.node.name !== t.node.name));
Je.displayName = "MemoizedTab";
export {
  He as DefaultCloseIcon,
  je as Layout,
  Re as LayoutStorage,
  Je as MemoizedTab,
  ve as MemoizedTabSet,
  me as Splitter,
  xe as Tab,
  ze as TabSet,
  Ae as addTabToTabset,
  Ie as calculateFlexValues,
  We as createColumn,
  qe as createLayoutModel,
  Me as createLayoutStorage,
  Oe as createRow,
  Ee as createTab,
  Se as createTabSet,
  Q as findNodeById,
  Ke as isLocalStorageAvailable,
  ue as removeEmptyTabsets,
  De as removeNodeById,
  Ye as removeTab,
  Ge as restoreTab,
  Ve as tabExists,
  B as updateNodeById,
  _e as useLayoutStorage
};
