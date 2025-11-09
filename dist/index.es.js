import { jsxs as me, jsx as L } from "react/jsx-runtime";
import Re, { useRef as C, useCallback as D, useEffect as k, useMemo as ue, useState as ce, memo as Le, forwardRef as Fe, useImperativeHandle as Be } from "react";
const Me = ({
  size: e = 16,
  color: t = "#666",
  className: n = ""
}) => /* @__PURE__ */ me(
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
      /* @__PURE__ */ L("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ L("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
), Ne = ({
  node: e,
  index: t,
  onClose: n,
  onSelect: r,
  onDragStart: a,
  onDragEnd: c,
  className: l = "",
  style: m = {},
  closeIcon: o,
  closeButtonClassName: h = ""
}) => {
  const y = C(!1), S = D(() => {
    r?.(e.id);
  }, [e.id, r]), x = D(
    (R) => {
      R.stopPropagation(), n?.(e.id);
    },
    [e.id, n]
  ), v = D(
    (R) => {
      R.dataTransfer.setData("text/plain", e.id), R.dataTransfer.effectAllowed = "move", R.currentTarget.classList.add("dragging"), document.body.classList.add("dragging"), y.current = !0, a?.(e.id, t);
    },
    [e.id, t, a]
  ), $ = D(
    (R) => {
      R.currentTarget.classList.remove("dragging"), document.body.classList.remove("dragging"), y.current = !1, c?.();
    },
    [c]
  );
  k(() => () => {
    y.current && (document.body.classList.remove("dragging"), y.current = !1);
  }, []);
  const E = ue(() => ({ ...m, cursor: "grab" }), [m]);
  return /* @__PURE__ */ me(
    "div",
    {
      className: `react-flex-layout-tab ${l}`,
      style: E,
      onClick: S,
      draggable: !0,
      onDragStart: v,
      onDragEnd: $,
      children: [
        /* @__PURE__ */ L("span", { className: "react-flex-layout-tab-title", children: e.name || "Untitled" }),
        /* @__PURE__ */ L(
          "button",
          {
            className: `react-flex-layout-tab-close ${h}`.trim(),
            onClick: x,
            type: "button",
            "aria-label": "Close tab",
            children: o || /* @__PURE__ */ L(Me, {})
          }
        )
      ]
    }
  );
}, Ke = () => /* @__PURE__ */ L(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: /* @__PURE__ */ L("polyline", { points: "15 18 9 12 15 6" })
  }
), _e = () => /* @__PURE__ */ L(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: /* @__PURE__ */ L("polyline", { points: "9 18 15 12 9 6" })
  }
), je = ({
  node: e,
  children: t,
  factory: n,
  onTabSelect: r,
  onTabClose: a,
  onTabDragStart: c,
  onTabDragEnd: l,
  onDragOver: m,
  onDragLeave: o,
  onDrop: h,
  dragOverTabset: y,
  dropPosition: S,
  dropTargetIndex: x,
  direction: v = "ltr",
  className: $ = "",
  style: E = {},
  closeIcon: R,
  closeButtonClassName: X,
  scrollLeftIcon: O,
  scrollRightIcon: _
}) => {
  const g = ue(() => e.children?.filter((s) => s.type === "tab") || [], [e.children]), b = ue(() => {
    const s = /* @__PURE__ */ new Map();
    for (let f = 0; f < g.length; f++) {
      const K = g[f];
      K && K.id && s.set(K.id, f);
    }
    return s;
  }, [g]), T = ue(() => v === "rtl" ? [...g].reverse() : g, [g, v]), d = e.selected ?? 0, p = Math.min(
    d,
    Math.max(0, g.length - 1)
  ), w = g[p], j = D(
    (s) => {
      const f = b.get(s);
      f !== void 0 && f !== -1 && r?.(e.id, f);
    },
    [e.id, b, r]
  ), G = D(
    (s) => {
      const f = b.get(s);
      f !== void 0 && f !== -1 && a?.(e.id, f);
    },
    [e.id, b, a]
  ), q = D(
    (s, f) => {
      const K = f !== void 0 ? f : b.get(s) ?? -1;
      K !== -1 && c?.(e.id, K);
    },
    [e.id, b, c]
  ), U = C(null), B = C(null), [de, M] = ce(!1), [ye, be] = ce(!1), ie = C(null), W = C();
  W.current = () => {
    const s = B.current;
    if (!s) {
      M(!1), be(!1);
      return;
    }
    const { scrollLeft: f, scrollWidth: K, clientWidth: le } = s;
    M(f > 1), be(f < K - le - 1);
  };
  const A = D(() => {
    ie.current && clearTimeout(ie.current), ie.current = setTimeout(() => {
      W.current?.();
    }, 10);
  }, []), te = D(
    (s) => {
      s.preventDefault(), s.dataTransfer.dropEffect = "move";
      const f = s.currentTarget.getBoundingClientRect(), K = s.clientX - f.left, le = s.clientY - f.top, i = f.width, I = f.height;
      let z = "center";
      if (le < 40) {
        const Z = U.current;
        if (Z) {
          const J = Z.getBoundingClientRect(), ae = s.clientX - J.left, V = Z.querySelectorAll(
            ".react-flex-layout-tab"
          );
          let P = g.length;
          if (v === "rtl") {
            for (let N = V.length - 1; N >= 0; N--) {
              const re = V[N].getBoundingClientRect(), oe = re.left - J.left, he = re.right - J.left, F = (oe + he) / 2;
              if (ae > F) {
                const ee = b.get(T[N].id);
                ee !== void 0 && ee !== -1 && (P = ee);
                break;
              }
            }
            if (P === g.length && V.length > 0) {
              const N = V[0].getBoundingClientRect();
              if (ae > N.right - J.left) {
                const re = b.get(T[0].id);
                re !== void 0 && re !== -1 && (P = re);
              }
            }
          } else
            for (let N = 0; N < V.length; N++) {
              const re = V[N].getBoundingClientRect(), oe = re.left - J.left, he = re.right - J.left, F = (oe + he) / 2;
              if (ae < F) {
                const ee = b.get(T[N].id);
                ee !== void 0 && ee !== -1 && (P = ee);
                break;
              }
            }
          z = "tab", m?.(s, e.id, z, P);
          return;
        }
      }
      K < i * 0.25 ? z = v === "rtl" ? "right" : "left" : K > i * 0.75 ? z = v === "rtl" ? "left" : "right" : le < I * 0.25 ? z = "top" : le > I * 0.75 ? z = "bottom" : z = "center", m?.(s, e.id, z);
    },
    [e.id, v, g.length, T, b, m]
  ), H = D(
    (s) => {
      o?.(s);
    },
    [o]
  ), Y = D(
    (s) => {
      h?.(s, e.id);
    },
    [e.id, h]
  ), Se = y === e.id;
  k(() => {
    const s = B.current;
    if (!s || p < 0) return;
    let f;
    return f = requestAnimationFrame(() => {
      const le = s.children[p];
      if (!le) return;
      const i = s.getBoundingClientRect(), I = le.getBoundingClientRect(), z = s.scrollLeft;
      I.left < i.left ? s.scrollTo({
        left: z - (i.left - I.left) - 10,
        behavior: "smooth"
      }) : I.right > i.right && s.scrollTo({
        left: z + (I.right - i.right) + 10,
        behavior: "smooth"
      });
    }), () => {
      f && cancelAnimationFrame(f);
    };
  }, [p, T.length]), k(() => {
    const s = B.current;
    if (!s) return;
    const f = { current: 0 };
    f.current = requestAnimationFrame(() => {
      W.current?.();
    }), s.addEventListener("scroll", A, { passive: !0 });
    const K = new ResizeObserver(() => {
      f.current && cancelAnimationFrame(f.current), f.current = requestAnimationFrame(() => {
        W.current?.();
      });
    });
    return K.observe(s), () => {
      f.current && cancelAnimationFrame(f.current), s.removeEventListener("scroll", A), K.disconnect(), ie.current && (clearTimeout(ie.current), ie.current = null);
    };
  }, [A, T.length]);
  const De = {
    ...E,
    width: e.width ? `${e.width}%` : void 0,
    height: e.height ? `${e.height}%` : void 0,
    flex: `${e.flex || 1} 1 0%`,
    minWidth: e.minWidth ? `${e.minWidth}px` : void 0,
    minHeight: e.minHeight ? `${e.minHeight}px` : void 0,
    maxWidth: e.maxWidth ? `${e.maxWidth}px` : void 0,
    maxHeight: e.maxHeight ? `${e.maxHeight}px` : void 0
  };
  if (g.length === 0)
    return null;
  const fe = Se && S ? v === "rtl" && (S === "left" || S === "right") ? S === "left" ? "right" : "left" : S : void 0;
  return /* @__PURE__ */ me(
    "div",
    {
      className: `react-flex-layout-tabset ${Se ? "drag-over" : ""} ${$}`,
      style: De,
      "data-tabset-id": e.id,
      "data-drop-position": fe,
      onDragOver: te,
      onDragLeave: H,
      onDrop: Y,
      children: [
        /* @__PURE__ */ me("div", { className: "react-flex-layout-tabset-header", ref: U, children: [
          de && /* @__PURE__ */ L(
            "button",
            {
              className: "react-flex-layout-tabset-scroll-button react-flex-layout-tabset-scroll-left",
              onClick: () => {
                const s = B.current;
                s && s.scrollBy({ left: -200, behavior: "smooth" });
              },
              type: "button",
              "aria-label": "Scroll left",
              children: O || /* @__PURE__ */ L(Ke, {})
            }
          ),
          /* @__PURE__ */ me(
            "div",
            {
              ref: B,
              className: "react-flex-layout-tabset-tabs-container",
              onScroll: A,
              children: [
                T.map((s) => {
                  const f = b.get(s.id) ?? -1, K = f === p, le = Se && S === "tab" && x !== null && f === x;
                  return /* @__PURE__ */ me(Re.Fragment, { children: [
                    le && /* @__PURE__ */ L("div", { className: "react-flex-layout-tab-drop-indicator" }),
                    /* @__PURE__ */ L(
                      Ne,
                      {
                        node: s,
                        index: f,
                        onSelect: j,
                        onClose: G,
                        onDragStart: q,
                        onDragEnd: l,
                        className: K ? "active" : "",
                        closeIcon: R,
                        closeButtonClassName: X
                      }
                    )
                  ] }, s.id);
                }),
                Se && S === "tab" && x !== null && x === g.length && /* @__PURE__ */ L("div", { className: "react-flex-layout-tab-drop-indicator" })
              ]
            }
          ),
          ye && /* @__PURE__ */ L(
            "button",
            {
              className: "react-flex-layout-tabset-scroll-button react-flex-layout-tabset-scroll-right",
              onClick: () => {
                const s = B.current;
                s && s.scrollBy({ left: 200, behavior: "smooth" });
              },
              type: "button",
              "aria-label": "Scroll right",
              children: _ || /* @__PURE__ */ L(_e, {})
            }
          )
        ] }),
        /* @__PURE__ */ L("div", { className: "react-flex-layout-tabset-content", children: w && (n ? n(w) : t) })
      ]
    }
  );
}, ze = Le(
  je,
  (e, t) => {
    if (e.className !== t.className || e.direction !== t.direction || e.dragOverTabset !== t.dragOverTabset || e.dropPosition !== t.dropPosition || e.dropTargetIndex !== t.dropTargetIndex || e.factory !== t.factory || e.onTabSelect !== t.onTabSelect || e.onTabClose !== t.onTabClose || e.onTabDragStart !== t.onTabDragStart || e.onTabDragEnd !== t.onTabDragEnd || e.onDragOver !== t.onDragOver || e.onDragLeave !== t.onDragLeave || e.onDrop !== t.onDrop || e.closeIcon !== t.closeIcon || e.closeButtonClassName !== t.closeButtonClassName || e.style !== t.style || e.children !== t.children) return !1;
    if (e.node === t.node) {
      if (e.node.selected !== t.node.selected)
        return !1;
    } else {
      if (e.node.id !== t.node.id || e.node.selected !== t.node.selected || e.node.width !== t.node.width || e.node.height !== t.node.height || e.node.flex !== t.node.flex || e.node.minWidth !== t.node.minWidth || e.node.minHeight !== t.node.minHeight || e.node.maxWidth !== t.node.maxWidth || e.node.maxHeight !== t.node.maxHeight) return !1;
      const n = e.node.children || [], r = t.node.children || [];
      if (n !== r) {
        if (n.length !== r.length) return !1;
        for (let a = 0; a < n.length; a++)
          if (n[a] !== r[a]) {
            const c = n[a], l = r[a];
            if (c.id !== l.id || c.type !== l.type || c.name !== l.name || c.component !== l.component || c.enableClose !== l.enableClose || c.enableDrag !== l.enableDrag)
              return !1;
          }
      }
    }
    return !0;
  }
);
ze.displayName = "MemoizedTabSet";
const qe = ({
  direction: e,
  onResize: t,
  onResizeStart: n,
  size: r = 8,
  className: a = "",
  style: c = {},
  customStyles: l = {}
}) => {
  const [m, o] = ce(!1), h = C(0), y = C(0), S = C(!1), x = C(null), v = C(null), $ = D(
    (O) => {
      O.preventDefault(), O.stopPropagation(), o(!0), h.current = e === "horizontal" ? O.clientX : O.clientY, y.current = h.current, n?.();
      const _ = (b) => {
        y.current = e === "horizontal" ? b.clientX : b.clientY, S.current || (S.current = !0, requestAnimationFrame(() => {
          S.current = !1;
          const T = y.current - h.current;
          t(T);
        }));
      }, g = () => {
        o(!1), document.removeEventListener("mousemove", _), document.removeEventListener("mouseup", g), x.current = null, v.current = null, S.current = !1;
      };
      document.addEventListener("mousemove", _), document.addEventListener("mouseup", g), x.current = _, v.current = g;
    },
    [e, t, n]
  ), E = {
    backgroundColor: "#ffffff",
    border: "none",
    outline: "none"
  }, R = ue(() => m && l.active ? l.active : l.default ? l.default : E, [m, l.active, l.default]), X = ue(() => {
    const O = e === "horizontal";
    return {
      ...c,
      width: O ? `${r}px` : "100%",
      height: O ? "100%" : `${r}px`,
      minWidth: O ? `${r}px` : void 0,
      minHeight: O ? void 0 : `${r}px`,
      flexShrink: 0,
      cursor: O ? "col-resize" : "row-resize",
      ...R,
      transition: m ? "none" : "all 0.2s ease"
    };
  }, [e, r, c, R, m]);
  return k(() => () => {
    x.current && document.removeEventListener("mousemove", x.current), v.current && document.removeEventListener("mouseup", v.current), S.current = !1;
  }, []), /* @__PURE__ */ L(
    "div",
    {
      className: `react-flex-layout-splitter ${a}`,
      style: X,
      onMouseDown: $
    }
  );
}, Ie = Le(qe, (e, t) => e.direction === t.direction && e.size === t.size && e.onResize === t.onResize && e.onResizeStart === t.onResizeStart && e.className === t.className && e.style === t.style && e.customStyles === t.customStyles), lt = (e, t) => ({
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
}), Je = (e, t, n, r) => ({
  id: e,
  type: "tab",
  component: t,
  name: n,
  config: r,
  enableClose: !0,
  enableDrag: !0
}), $e = (e, t, n = 0) => ({
  id: e,
  type: "tabset",
  children: t,
  selected: n,
  enableClose: !0,
  enableDrag: !0
}), Xe = (e, t, n, r) => ({
  id: e,
  type: "row",
  children: Ee(t),
  width: n,
  height: r,
  enableResize: !0
}), Ue = (e, t, n, r) => ({
  id: e,
  type: "column",
  children: Ee(t),
  width: n,
  height: r,
  enableResize: !0
}), se = (e, t) => {
  if (e.id === t)
    return e;
  if (e.children)
    for (const n of e.children) {
      const r = se(n, t);
      if (r)
        return r;
    }
  return null;
}, pe = (e, t) => {
  if (!e.children)
    return null;
  for (const n of e.children)
    if (n.id === t)
      return e;
  for (const n of e.children) {
    const r = pe(n, t);
    if (r)
      return r;
  }
  return null;
}, Q = (e, t, n) => {
  if (e.id === t)
    return n === null ? null : Object.keys(n).some((a) => {
      const c = a;
      return e[c] !== n[c];
    }) ? { ...e, ...n } : e;
  if (e.children) {
    let r = null;
    const a = e.children;
    for (let c = 0; c < a.length; c++) {
      const l = a[c], m = Q(l, t, n);
      m !== l && r === null && (r = a.slice(0, c)), r !== null && m !== null && r.push(m);
    }
    return r === null ? e : {
      ...e,
      children: r
    };
  }
  return e;
}, He = (e, t) => {
  if (!e.children)
    return e;
  let n = null;
  const r = e.children;
  for (let a = 0; a < r.length; a++) {
    const c = r[a];
    if (c.id === t) {
      n === null && (n = r.slice(0, a));
      continue;
    }
    const l = He(c, t);
    l !== c && n === null && (n = r.slice(0, a)), n !== null && n.push(l);
  }
  return n === null ? e : {
    ...e,
    children: n
  };
}, Ee = (e) => e.map((t) => ({
  ...t,
  flex: t.flex || 1 / e.length
})), ve = (e) => {
  if (e.type === "tabset" && (!e.children || e.children.length === 0))
    return null;
  if (e.children) {
    const t = e.children, n = t.length;
    let r = null;
    for (let l = 0; l < t.length; l++) {
      const m = t[l], o = ve(m);
      o !== m && r === null && (r = t.slice(0, l)), r !== null && o !== null && r.push(o);
    }
    const a = r ?? t, c = a.length < n;
    if (a.length === 0)
      return null;
    if ((e.type === "row" || e.type === "column") && a.length > 0) {
      const l = a.reduce(
        (o, h) => o + (h.flex || 0),
        0
      );
      if (c || l < 0.999 || a.length === 1) {
        let o;
        if (a.length === 1)
          o = a.map((h) => ({
            ...h,
            flex: 1
          }));
        else if (l === 0 || l < 1e-3) {
          const h = 1 / a.length;
          o = a.map((y) => ({
            ...y,
            flex: h
          }));
        } else {
          const h = 1 / l;
          o = a.map((y) => ({
            ...y,
            flex: (y.flex || 0) * h
          }));
        }
        return {
          ...e,
          children: o
        };
      }
      if (a.length !== n || a.some((o, h) => o !== t[h]))
        return {
          ...e,
          children: a
        };
    }
    if (r !== null)
      return {
        ...e,
        children: a
      };
  }
  return e;
}, Oe = (e, t, n = null) => {
  if (!e.children) return null;
  for (const r of e.children) {
    if (r.id === t)
      return n || e;
    if (r.children) {
      const a = Oe(r, t, e);
      if (a) return a;
    }
  }
  return null;
}, We = (e, t) => {
  if (!e.children) return null;
  for (const n of e.children) {
    if (n.type === "tabset" && n.children && n.children.find((a) => a.id === t))
      return n;
    if (n.children) {
      const r = We(n, t);
      if (r) return r;
    }
  }
  return null;
}, Ye = (e, t, n) => {
  const r = se(e, t);
  if (!r || r.type !== "tabset")
    return null;
  const c = [...r.children || [], n], l = {
    ...r,
    children: c,
    selected: c.length - 1
  };
  return Q(e, t, l);
}, it = (e, t) => {
  const n = We(e, t);
  if (!n || n.type !== "tabset")
    return { layout: e, restoreData: null };
  const r = n.children?.find((S) => S.id === t);
  if (!r || r.type !== "tab")
    return { layout: e, restoreData: null };
  const a = n.children?.findIndex(
    (S) => S.id === t
  ), c = n.children?.filter(
    (S) => S.id !== t
  );
  if (!c || c.length === 0) {
    const S = He(e, n.id), x = {
      tabId: r.id,
      component: r.component || "",
      name: r.name || "",
      tabsetId: n.id,
      tabIndex: a !== void 0 ? a : 0,
      config: r.config
    };
    return {
      layout: S,
      restoreData: x
    };
  }
  const l = n.selected ?? 0;
  let m = l;
  a !== void 0 && a !== -1 && (a <= l && (m = Math.max(0, l - 1)), m = Math.min(m, c.length - 1));
  const o = {
    ...n,
    children: c,
    selected: c.length > 0 ? m : void 0
  }, h = Q(e, n.id, o), y = {
    tabId: r.id,
    component: r.component || "",
    name: r.name || "",
    tabsetId: n.id,
    tabIndex: a !== void 0 ? a : 0,
    config: r.config
  };
  return {
    layout: h,
    restoreData: y
  };
}, at = (e, t, n) => {
  if (se(e, t.tabId))
    return e;
  let a = se(e, t.tabsetId);
  if (!a || a.type !== "tabset") {
    if (!n)
      return null;
    const m = Oe(
      n,
      t.tabsetId
    );
    if (!m)
      return null;
    const o = se(e, m.id);
    if (!o || !o.children)
      return null;
    const h = o.children.find(
      (y) => y.id === t.tabsetId
    );
    if (h)
      a = h;
    else {
      const y = $e(t.tabsetId, []), S = [...o.children, y], x = {
        ...o,
        children: S
      }, v = Q(
        e,
        o.id,
        x
      );
      if (!v || (e = v, a = se(e, t.tabsetId), !a || a.type !== "tabset"))
        return null;
    }
  }
  const c = Je(
    t.tabId,
    t.component,
    t.name,
    t.config
  );
  return Ye(e, t.tabsetId, c);
}, ct = (e, t) => se(e, t) !== null, Ge = (e, t) => {
  const n = C({}), r = C({}), a = C(e), c = C(t);
  k(() => {
    a.current = e;
  }, [e]), k(() => {
    c.current = t;
  }, [t]);
  const l = D(
    (o, h, y) => {
      if (!c.current) return;
      const S = a.current, x = ke(S.layout, o);
      if (!x || !x.children) return;
      const v = x.children.findIndex(
        (w) => w.id === o
      ), $ = v + 1;
      if ($ >= x.children.length) return;
      const E = `${o}-${y}`;
      if (!n.current[E]) {
        const w = x.children[v], j = x.children[$];
        n.current[E] = {
          current: w.flex || 1,
          sibling: j.flex || 1
        };
      }
      const R = n.current[E], X = R.current + R.sibling, O = y === "horizontal" ? window.innerWidth : window.innerHeight, _ = R.current / X * O, g = R.sibling / X * O, b = 100;
      let T = _ + h, d = g - h;
      if (T < b) {
        const w = b - T;
        T = b, d -= w;
      }
      if (d < b) {
        const w = b - d;
        d = b, T -= w;
      }
      const p = T + d;
      if (p > 0) {
        const w = T / p * X, j = d / p * X, G = r.current[E], q = 1e-4;
        if (G && Math.abs(G.current - w) < q && Math.abs(G.sibling - j) < q)
          return;
        const U = x.children.slice(), B = U[v], de = U[$];
        U[v] = { ...B, flex: w }, U[$] = { ...de, flex: j };
        const M = Q(S.layout, x.id, {
          children: U
        });
        M && (r.current[E] = {
          current: w,
          sibling: j
        }, c.current({
          ...S,
          layout: M
        }));
      }
    },
    []
    // Empty deps - stable reference, uses refs internally
  ), m = D(
    (o, h) => {
      const y = `${o}-${h}`;
      delete n.current[y], delete r.current[y];
    },
    []
  );
  return { handleResize: l, resetResize: m };
}, ke = (e, t) => {
  if (!e.children) return null;
  for (const n of e.children) {
    if (n.id === t)
      return e;
    const r = ke(n, t);
    if (r) return r;
  }
  return null;
}, Ve = (e, t) => {
  const [n, r] = ce(null), [a, c] = ce(null), [l, m] = ce("center"), [o, h] = ce(null), y = C(null), S = C(e), x = C(t), v = C(l), $ = C(o);
  k(() => {
    S.current = e;
  }, [e]), k(() => {
    x.current = t;
  }, [t]), k(() => {
    v.current = l;
  }, [l]), k(() => {
    $.current = o;
  }, [o]);
  const E = D((g, b) => {
    const T = { tabsetId: g, tabIndex: b };
    r(T), y.current = T;
  }, []), R = D(() => {
    r(null), y.current = null, c(null), h(null);
  }, []), X = D(
    (g, b, T = "center", d) => {
      g.preventDefault(), g.dataTransfer.dropEffect = "move", c(b), m(T), d !== void 0 ? h(d) : T !== "tab" && h(null);
    },
    []
  ), O = D((g) => {
    g.currentTarget === g.target && setTimeout(() => {
      c(null), h(null);
    }, 50);
  }, []), _ = D(
    (g, b) => {
      g.preventDefault();
      const T = y.current, d = S.current, p = x.current, w = v.current, j = $.current;
      if (!T || !p)
        return;
      const { tabsetId: G, tabIndex: q } = T;
      if (G === b && w === "tab" && j !== null) {
        const W = se(d.layout, G);
        if (!W || !W.children)
          return;
        const A = W.children[q];
        if (!A || q === j)
          return;
        const te = [...W.children];
        te.splice(q, 1), te.splice(j, 0, A);
        let H = W.selected ?? 0;
        q < H && j >= H ? H = Math.max(0, H - 1) : q > H && j <= H ? H = Math.min(H + 1, te.length - 1) : q === H && (H = j);
        const Y = Q(
          d.layout,
          G,
          {
            children: te,
            selected: H
          }
        );
        Y && p({
          ...d,
          layout: Y,
          metadata: d.metadata
        }), r(null), c(null), h(null);
        return;
      }
      if (G === b && w !== "tab")
        return;
      const U = se(d.layout, G), B = se(d.layout, b);
      if (!U || !B || !U.children || !B.children)
        return;
      const de = U.children[q];
      if (!de)
        return;
      let M = d.layout;
      const ye = U.children.filter(
        (W, A) => A !== q
      ), be = Q(
        M,
        G,
        {
          children: ye,
          selected: Math.min(
            U.selected || 0,
            ye.length - 1
          )
        }
      );
      if (!be) return;
      if (M = be, w === "center") {
        const W = Q(
          M,
          b,
          {
            children: [...B.children || [], de],
            selected: B.children?.length || 0
          }
        );
        if (!W) return;
        M = W;
      } else {
        const W = $e(
          `${b}-split-${Date.now()}`,
          [de]
        ), A = pe(M, b);
        if (A) {
          const te = A.children?.findIndex(
            (H) => H.id === b
          ) || 0;
          if (w === "left" || w === "right") {
            const H = Xe(`${b}-row-${Date.now()}`, [
              w === "left" ? W : B,
              w === "left" ? B : W
            ]), Y = Q(
              M,
              A.id,
              {
                children: [
                  ...A.children?.slice(0, te) || [],
                  H,
                  ...A.children?.slice(te + 1) || []
                ]
              }
            );
            if (!Y) return;
            M = Y;
          } else if (w === "top" || w === "bottom") {
            const H = Ue(
              `${b}-column-${Date.now()}`,
              [
                w === "top" ? W : B,
                w === "top" ? B : W
              ]
            ), Y = Q(
              M,
              A.id,
              {
                children: [
                  ...A.children?.slice(0, te) || [],
                  H,
                  ...A.children?.slice(te + 1) || []
                ]
              }
            );
            if (!Y) return;
            M = Y;
          }
        }
      }
      const ie = ve(M);
      ie && p({
        ...d,
        layout: ie,
        metadata: d.metadata
      }), r(null), c(null);
    },
    []
  );
  return {
    draggedTab: n,
    dragOverTabset: a,
    dropPosition: l,
    dropTargetIndex: o,
    handleDragStart: E,
    handleDragEnd: R,
    handleDragOver: X,
    handleDragLeave: O,
    handleDrop: _
  };
}, Qe = "react-flex-layout";
class Ae {
  storageKey;
  autoSave;
  debounceMs;
  saveTimeout = null;
  lastSavedString = null;
  isAvailable;
  constructor(t = {}) {
    this.storageKey = `${Qe}-${t.key || "default"}`, this.autoSave = t.autoSave !== !1, this.debounceMs = t.debounceMs || 500, this.isAvailable = Ze();
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
const st = (e) => new Ae(e), Ze = () => {
  try {
    const e = "__localStorage_test__";
    return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
  } catch {
    return !1;
  }
}, Pe = (e, t = {}) => {
  const { onLoad: n, onSave: r, onError: a, ...c } = t, l = C(null), [m, o] = ce(e), [h, y] = ce(!1), [S, x] = ce(!1);
  k(() => {
    if (l.current)
      try {
        l.current.cancel?.();
      } catch {
      }
    l.current = new Ae(c), x(!0);
  }, [c.key, c.autoSave, c.debounceMs]), k(() => {
    if (!l.current || h) return;
    const d = l.current.load();
    d ? (o(d), y(!0), n?.(d)) : y(!0);
  }, [h, n]);
  const v = C(), $ = ue(
    () => JSON.stringify(m.layout),
    [m.layout]
  ), E = ue(
    () => JSON.stringify(e.layout),
    [e.layout]
  ), R = ue(
    () => m.metadata ? JSON.stringify(m.metadata) : void 0,
    [m.metadata]
  ), X = ue(
    () => e.metadata ? JSON.stringify(e.metadata) : void 0,
    [e.metadata]
  );
  k(() => {
    if (!(!h || !l.current)) {
      if (v.current !== E && $ !== E) {
        const d = { ...e };
        e.global && (d.global = { ...e.global }), o(d), v.current = E, l.current.isAutoSaveEnabled() ? l.current.debouncedSave(d) : l.current.save(d);
        return;
      }
      e.metadata && R !== X && o((d) => ({
        ...d,
        metadata: e.metadata
      }));
    }
  }, [
    h,
    l,
    e,
    $,
    E,
    R,
    X
  ]);
  const O = D(
    (d) => {
      if (l.current)
        try {
          l.current.isAutoSaveEnabled() ? l.current.debouncedSave(d) : l.current.save(d), r?.(d);
        } catch (p) {
          a?.(p);
        }
    },
    [r, a]
  ), _ = D(
    (d) => {
      const p = { ...d };
      d.global && (p.global = { ...d.global }), o(p), O(p);
    },
    [O]
  ), g = D(() => {
    if (l.current)
      try {
        l.current.clear();
      } catch (d) {
        a?.(d);
      }
  }, [a]), b = D(() => l.current?.exists() ?? !1, []), T = D(() => l.current?.getStorageKey() ?? "", []);
  return {
    model: m,
    updateModel: _,
    clearStorage: g,
    hasStoredData: b,
    getStorageKey: T,
    isLoaded: h,
    hasStorage: S
  };
}, et = Fe(
  ({
    model: e,
    factory: t,
    onModelChange: n,
    onAction: r,
    className: a = "",
    style: c = {},
    storage: l,
    closeIcon: m,
    closeButtonClassName: o,
    scrollLeftIcon: h,
    scrollRightIcon: y
  }, S) => {
    const [x, v] = ce(e), [$, E] = ce(
      null
    ), {
      model: R,
      updateModel: X,
      isLoaded: O
    } = Pe(e, {
      key: l?.key,
      autoSave: l?.autoSave,
      debounceMs: l?.debounceMs,
      onLoad: (i) => {
        n ? n(i) : v(i);
      }
    }), _ = l?.enabled ? R : n ? e : x, g = C(n), b = C(l), T = C(X);
    k(() => {
      g.current = n;
    }, [n]), k(() => {
      b.current = l;
    }, [l]), k(() => {
      T.current = X;
    }, [X]);
    const d = D((i) => {
      b.current?.enabled ? (T.current(i), g.current && g.current(i)) : g.current ? g.current(i) : v(i);
    }, []), { handleResize: p, resetResize: w } = Ge(
      _,
      d
    ), j = C(/* @__PURE__ */ new Map()), G = D(
      (i, I, z) => {
        const ne = `${i}-${I}-${z ? "rtl" : "ltr"}`;
        return j.current.has(ne) || j.current.set(ne, {
          onResize: (u) => {
            const Z = z ? -u : u;
            p(i, Z, I);
          },
          onResizeStart: () => {
            w(i, I);
          }
        }), j.current.get(ne);
      },
      [p, w]
    ), {
      dragOverTabset: q,
      dropPosition: U,
      dropTargetIndex: B,
      handleDragStart: de,
      handleDragEnd: M,
      handleDragOver: ye,
      handleDragLeave: be,
      handleDrop: ie
    } = Ve(_, d), W = C(R);
    k(() => {
      W.current = R;
    }, [R]);
    const A = C(x);
    k(() => {
      A.current = x;
    }, [x]);
    const te = C(e);
    k(() => {
      te.current = e;
    }, [e]);
    const H = C(r);
    k(() => {
      H.current = r;
    }, [r]);
    const Y = D((i) => {
      if (b.current?.enabled) {
        const I = W.current;
        if (i.type === "changeDirection") {
          const { direction: u } = i.payload;
          E(u);
        }
        const ne = ((u) => {
          switch (i.type) {
            case "selectTab":
              const { nodeId: Z, tabIndex: J } = i.payload, ae = Q(u.layout, Z, {
                selected: J
              });
              return !ae || ae === u.layout ? u : {
                ...u,
                layout: ae
              };
            case "removeNode":
              const { nodeId: V, tabIndex: P } = i.payload, N = se(u.layout, V);
              if (N && N.children) {
                const F = N.children.filter(
                  (xe, Ce) => Ce !== P
                ), ee = N.selected ?? 0;
                let ge = ee;
                P <= ee && (ge = Math.max(0, ee - 1)), ge = Math.min(ge, F.length - 1);
                const we = {
                  ...N,
                  children: F,
                  selected: F.length > 0 ? ge : void 0
                }, Te = Q(
                  u.layout,
                  V,
                  we
                );
                if (Te) {
                  const xe = ve(Te);
                  if (xe)
                    return {
                      ...u,
                      layout: xe
                    };
                }
              }
              return u;
            case "closeTabset":
              const { nodeId: re } = i.payload, oe = Q(
                u.layout,
                re,
                null
              );
              if (oe) {
                const F = ve(oe);
                if (F)
                  return {
                    ...u,
                    layout: F
                  };
              }
              return u;
            case "changeDirection":
              const { direction: he } = i.payload;
              return {
                ...u,
                global: {
                  ...u.global,
                  direction: he
                }
              };
            default:
              return u;
          }
        })(I);
        T.current(ne), g.current && g.current(ne), H.current?.(i);
      } else {
        if (i.type === "changeDirection" && g.current) {
          const { direction: I } = i.payload, z = te.current, ne = {
            ...z,
            global: {
              ...z.global,
              direction: I
            }
          };
          g.current(ne);
        }
        H.current?.(i);
      }
      if (!b.current?.enabled && !g.current) {
        const I = A.current, ne = ((u) => {
          switch (i.type) {
            case "selectTab":
              const { nodeId: Z, tabIndex: J } = i.payload, ae = Q(u.layout, Z, {
                selected: J
              });
              return !ae || ae === u.layout ? u : {
                ...u,
                layout: ae
              };
            case "removeNode":
              const { nodeId: V, tabIndex: P } = i.payload, N = se(u.layout, V);
              if (N && N.children) {
                const F = N.children.filter(
                  (xe, Ce) => Ce !== P
                ), ee = N.selected ?? 0;
                let ge = ee;
                P <= ee && (ge = Math.max(0, ee - 1)), ge = Math.min(ge, F.length - 1);
                const we = {
                  ...N,
                  children: F,
                  selected: F.length > 0 ? ge : void 0
                }, Te = Q(
                  u.layout,
                  V,
                  we
                );
                if (Te) {
                  const xe = ve(Te);
                  if (xe)
                    return {
                      ...u,
                      layout: xe
                    };
                }
              }
              return u;
            case "closeTabset":
              const { nodeId: re } = i.payload, oe = Q(
                u.layout,
                re,
                null
              );
              if (oe) {
                const F = ve(oe);
                if (F)
                  return {
                    ...u,
                    layout: F
                  };
              }
              return u;
            case "changeDirection":
              const { direction: he } = i.payload;
              return {
                ...u,
                global: {
                  ...u.global,
                  direction: he
                }
              };
            default:
              return u;
          }
        })(I);
        v(ne);
      }
    }, []);
    Be(
      S,
      () => ({
        handleAction: Y
      }),
      [Y]
    );
    const Se = D(
      (i, I) => {
        Y({
          type: "selectTab",
          payload: { nodeId: i, tabIndex: I }
        });
      },
      [Y]
    ), De = D(
      (i, I) => {
        Y({
          type: "removeNode",
          payload: { nodeId: i, tabIndex: I }
        });
      },
      [Y]
    );
    let fe;
    l?.enabled ? $ !== null ? fe = $ : fe = R?.global?.direction || "ltr" : fe = _.global?.direction || "ltr";
    const s = _.global?.splitterSize || 8, f = D(
      (i) => {
        switch (i.type) {
          case "tabset":
            return /* @__PURE__ */ L(
              ze,
              {
                node: i,
                factory: t,
                onTabSelect: Se,
                onTabClose: De,
                onTabDragStart: de,
                onTabDragEnd: M,
                onDragOver: ye,
                onDragLeave: be,
                onDrop: ie,
                dragOverTabset: q,
                dropPosition: q === i.id ? U : void 0,
                dropTargetIndex: q === i.id ? B : void 0,
                direction: fe,
                closeIcon: m,
                closeButtonClassName: o,
                scrollLeftIcon: h,
                scrollRightIcon: y
              },
              i.id
            );
          case "row":
            const I = fe === "rtl", z = i.children || [], ne = I ? [...z].reverse() : z;
            return /* @__PURE__ */ L(
              "div",
              {
                className: "react-flex-layout-row",
                style: {
                  width: i.width ? `${i.width}%` : void 0,
                  height: i.height ? `${i.height}%` : void 0,
                  flex: `${i.flex || 1} 1 0%`,
                  minWidth: i.minWidth ? `${i.minWidth}px` : void 0,
                  minHeight: i.minHeight ? `${i.minHeight}px` : void 0,
                  maxWidth: i.maxWidth ? `${i.maxWidth}px` : void 0,
                  maxHeight: i.maxHeight ? `${i.maxHeight}px` : void 0
                },
                children: ne.map((u, Z) => {
                  const J = Z + 1;
                  if (!(J < ne.length))
                    return /* @__PURE__ */ L(Re.Fragment, { children: f(u) }, u.id);
                  const V = I ? z.length - 1 - Z : Z, P = I ? z.length - 1 - J : J, N = Math.min(
                    V,
                    P
                  );
                  if (Math.max(
                    V,
                    P
                  ) !== N + 1)
                    return /* @__PURE__ */ L(Re.Fragment, { children: f(u) }, u.id);
                  const oe = z[N], he = I && V > P, F = G(
                    oe.id,
                    "horizontal",
                    he
                  );
                  return /* @__PURE__ */ me(Re.Fragment, { children: [
                    f(u),
                    /* @__PURE__ */ L(
                      Ie,
                      {
                        direction: "horizontal",
                        onResize: F.onResize,
                        onResizeStart: F.onResizeStart,
                        size: s
                      }
                    )
                  ] }, u.id);
                })
              },
              i.id
            );
          case "column":
            return /* @__PURE__ */ L(
              "div",
              {
                className: "react-flex-layout-column",
                style: {
                  width: i.width ? `${i.width}%` : void 0,
                  height: i.height ? `${i.height}%` : void 0,
                  flex: `${i.flex || 1} 1 0%`,
                  minWidth: i.minWidth ? `${i.minWidth}px` : void 0,
                  minHeight: i.minHeight ? `${i.minHeight}px` : void 0,
                  maxWidth: i.maxWidth ? `${i.maxWidth}px` : void 0,
                  maxHeight: i.maxHeight ? `${i.maxHeight}px` : void 0
                },
                children: i.children?.map((u, Z) => {
                  const J = Z < (i.children?.length || 0) - 1 ? G(u.id, "vertical") : null;
                  return /* @__PURE__ */ me(Re.Fragment, { children: [
                    f(u),
                    J && /* @__PURE__ */ L(
                      Ie,
                      {
                        direction: "vertical",
                        onResize: J.onResize,
                        onResizeStart: J.onResizeStart,
                        size: s
                      }
                    )
                  ] }, u.id);
                })
              },
              i.id
            );
          case "tab":
            return t(i);
          default:
            return null;
        }
      },
      [
        fe,
        s,
        t,
        Se,
        De,
        p,
        de,
        M,
        ye,
        be,
        ie,
        q,
        U,
        m,
        o,
        G
      ]
    );
    k(() => {
      !l?.enabled && $ !== null && E(null);
    }, [l?.enabled, $]), k(() => {
      l?.enabled && $ !== null && (R?.global?.direction || "ltr") === $ && E(null);
    }, [l?.enabled, $, R?.global?.direction]);
    const K = ue(
      () => f(_.layout),
      [f, _.layout]
    ), le = {
      ...c,
      height: "100%",
      width: "100%"
    };
    return l?.enabled && !O ? /* @__PURE__ */ L(
      "div",
      {
        className: `react-flex-layout ${a}`,
        style: {
          ...le,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ L("div", { children: "Loading layout..." })
      }
    ) : /* @__PURE__ */ L(
      "div",
      {
        className: `react-flex-layout ${a}`,
        style: le,
        dir: fe,
        children: K
      }
    );
  }
);
et.displayName = "Layout";
const tt = Le(Ne, (e, t) => !(e.className !== t.className || e.style !== t.style || e.closeIcon !== t.closeIcon || e.closeButtonClassName !== t.closeButtonClassName || e.index !== t.index || e.onSelect !== t.onSelect || e.onClose !== t.onClose || e.onDragStart !== t.onDragStart || e.onDragEnd !== t.onDragEnd || e.node.id !== t.node.id || e.node.name !== t.node.name));
tt.displayName = "MemoizedTab";
export {
  Me as DefaultCloseIcon,
  et as Layout,
  Ae as LayoutStorage,
  tt as MemoizedTab,
  ze as MemoizedTabSet,
  Ie as Splitter,
  Ne as Tab,
  je as TabSet,
  Ye as addTabToTabset,
  Ee as calculateFlexValues,
  Ue as createColumn,
  lt as createLayoutModel,
  st as createLayoutStorage,
  Xe as createRow,
  Je as createTab,
  $e as createTabSet,
  se as findNodeById,
  Ze as isLocalStorageAvailable,
  ve as removeEmptyTabsets,
  He as removeNodeById,
  it as removeTab,
  at as restoreTab,
  ct as tabExists,
  Q as updateNodeById,
  Pe as useLayoutStorage
};
