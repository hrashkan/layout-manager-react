import { jsxs as me, jsx as N } from "react/jsx-runtime";
import Ce, { useRef as m, useCallback as D, useEffect as z, useMemo as ue, useState as de, memo as pe, forwardRef as Ue, useImperativeHandle as Ye } from "react";
const Ge = ({
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
      /* @__PURE__ */ N("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ N("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
), Ae = ({
  node: e,
  index: t,
  onClose: n,
  onSelect: r,
  onDragStart: l,
  onDragEnd: s,
  className: i = "",
  style: u = {},
  closeIcon: f,
  closeButtonClassName: y = ""
}) => {
  const b = m(!1), h = D(() => {
    r?.(e.id);
  }, [e.id, r]), S = D(
    (R) => {
      R.stopPropagation(), n?.(e.id);
    },
    [e.id, n]
  ), v = D(
    (R) => {
      R.dataTransfer.setData("text/plain", e.id), R.dataTransfer.effectAllowed = "move", R.currentTarget.classList.add("dragging"), document.body.classList.add("dragging"), b.current = !0, l?.(e.id, t);
    },
    [e.id, t, l]
  ), L = D(
    (R) => {
      R.currentTarget.classList.remove("dragging"), document.body.classList.remove("dragging"), b.current = !1, s?.();
    },
    [s]
  );
  z(() => () => {
    b.current && (document.body.classList.remove("dragging"), b.current = !1);
  }, []);
  const O = ue(() => ({ ...u, cursor: "grab" }), [u]);
  return /* @__PURE__ */ me(
    "div",
    {
      className: `react-flex-layout-tab ${i}`,
      style: O,
      onClick: h,
      draggable: !0,
      onDragStart: v,
      onDragEnd: L,
      children: [
        /* @__PURE__ */ N("span", { className: "react-flex-layout-tab-title", children: e.name || "Untitled" }),
        /* @__PURE__ */ N(
          "button",
          {
            className: `react-flex-layout-tab-close ${y}`.trim(),
            onClick: S,
            type: "button",
            "aria-label": "Close tab",
            children: f || /* @__PURE__ */ N(Ge, {})
          }
        )
      ]
    }
  );
}, Oe = (e) => /* @__PURE__ */ N(
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
    ...e,
    children: /* @__PURE__ */ N("polyline", { points: "15 18 9 12 15 6" })
  }
);
Oe.displayName = "ScrollLeftIcon";
const ke = (e) => /* @__PURE__ */ N(
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
    ...e,
    children: /* @__PURE__ */ N("polyline", { points: "9 18 15 12 9 6" })
  }
);
ke.displayName = "ScrollRightIcon";
const Ve = ({
  node: e,
  children: t,
  factory: n,
  onTabSelect: r,
  onTabClose: l,
  onTabDragStart: s,
  onTabDragEnd: i,
  onDragOver: u,
  onDragLeave: f,
  onDrop: y,
  dragOverTabset: b,
  dropPosition: h,
  dropTargetIndex: S,
  direction: v = "ltr",
  className: L = "",
  style: O = {},
  closeIcon: R,
  closeButtonClassName: E,
  scrollLeftIcon: $,
  scrollRightIcon: k
}) => {
  const C = ue(() => e.children?.filter((c) => c.type === "tab") || [], [e.children]), p = ue(() => {
    const c = /* @__PURE__ */ new Map();
    for (let d = 0; d < C.length; d++) {
      const _ = C[d];
      _ && _.id && c.set(_.id, d);
    }
    return c;
  }, [C]), j = ue(() => v === "rtl" ? [...C].reverse() : C, [C, v]), x = e.selected ?? 0, g = Math.min(
    x,
    Math.max(0, C.length - 1)
  ), T = C[g], q = D(
    (c) => {
      const d = p.get(c);
      d !== void 0 && d !== -1 && r?.(e.id, d);
    },
    [e.id, p, r]
  ), I = D(
    (c) => {
      const d = p.get(c);
      d !== void 0 && d !== -1 && l?.(e.id, d);
    },
    [e.id, p, l]
  ), te = D(
    (c, d) => {
      const _ = d !== void 0 ? d : p.get(c) ?? -1;
      _ !== -1 && s?.(e.id, _);
    },
    [e.id, p, s]
  ), M = m(null), J = m(null), [U, V] = de(!1), [le, Z] = de(!1), oe = m(null), Y = m();
  Y.current = () => {
    const c = J.current;
    if (!c) {
      V(!1), Z(!1);
      return;
    }
    const { scrollLeft: d, scrollWidth: _, clientWidth: ce } = c;
    V(d > 1), Z(d < _ - ce - 1);
  };
  const ge = D(() => {
    oe.current && clearTimeout(oe.current), oe.current = setTimeout(() => {
      Y.current?.();
    }, 10);
  }, []), ye = D(
    (c) => {
      c.preventDefault(), c.dataTransfer.dropEffect = "move";
      const d = c.currentTarget.getBoundingClientRect(), _ = c.clientX - d.left, ce = c.clientY - d.top, ne = d.width, he = d.height;
      let G = "center";
      if (ce < 40) {
        const a = M.current;
        if (a) {
          const H = a.getBoundingClientRect(), Q = c.clientX - H.left, F = a.querySelectorAll(
            ".react-flex-layout-tab"
          );
          let o = C.length;
          if (v === "rtl") {
            for (let A = F.length - 1; A >= 0; A--) {
              const w = F[A].getBoundingClientRect(), ae = w.left - H.left, re = w.right - H.left, se = (ae + re) / 2;
              if (Q > se) {
                const B = p.get(j[A].id);
                B !== void 0 && B !== -1 && (o = B);
                break;
              }
            }
            if (o === C.length && F.length > 0) {
              const A = F[0].getBoundingClientRect();
              if (Q > A.right - H.left) {
                const w = p.get(j[0].id);
                w !== void 0 && w !== -1 && (o = w);
              }
            }
          } else
            for (let A = 0; A < F.length; A++) {
              const w = F[A].getBoundingClientRect(), ae = w.left - H.left, re = w.right - H.left, se = (ae + re) / 2;
              if (Q < se) {
                const B = p.get(j[A].id);
                B !== void 0 && B !== -1 && (o = B);
                break;
              }
            }
          G = "tab", u?.(c, e.id, G, o);
          return;
        }
      }
      _ < ne * 0.25 ? G = v === "rtl" ? "right" : "left" : _ > ne * 0.75 ? G = v === "rtl" ? "left" : "right" : ce < he * 0.25 ? G = "top" : ce > he * 0.75 ? G = "bottom" : G = "center", u?.(c, e.id, G);
    },
    [e.id, v, C.length, j, p, u]
  ), xe = D(
    (c) => {
      f?.(c);
    },
    [f]
  ), X = D(
    (c) => {
      y?.(c, e.id);
    },
    [e.id, y]
  ), K = b === e.id;
  z(() => {
    const c = J.current;
    if (!c || g < 0) return;
    let d;
    return d = requestAnimationFrame(() => {
      const ce = c.children[g];
      if (!ce) return;
      const ne = c.getBoundingClientRect(), he = ce.getBoundingClientRect(), G = c.scrollLeft;
      he.left < ne.left ? c.scrollTo({
        left: G - (ne.left - he.left) - 10,
        behavior: "smooth"
      }) : he.right > ne.right && c.scrollTo({
        left: G + (he.right - ne.right) + 10,
        behavior: "smooth"
      });
    }), () => {
      d && cancelAnimationFrame(d);
    };
  }, [g, j.length]), z(() => {
    const c = J.current;
    if (!c) return;
    const d = { current: 0 };
    d.current = requestAnimationFrame(() => {
      Y.current?.();
    }), c.addEventListener("scroll", ge, { passive: !0 });
    const _ = new ResizeObserver(() => {
      d.current && cancelAnimationFrame(d.current), d.current = requestAnimationFrame(() => {
        Y.current?.();
      });
    });
    return _.observe(c), () => {
      d.current && cancelAnimationFrame(d.current), c.removeEventListener("scroll", ge), _.disconnect(), oe.current && (clearTimeout(oe.current), oe.current = null);
    };
  }, [ge, j.length]);
  const ie = {
    ...O,
    width: e.width ? `${e.width}%` : void 0,
    height: e.height ? `${e.height}%` : void 0,
    flex: `${e.flex || 1} 1 0%`,
    minWidth: e.minWidth ? `${e.minWidth}px` : void 0,
    minHeight: e.minHeight ? `${e.minHeight}px` : void 0,
    maxWidth: e.maxWidth ? `${e.maxWidth}px` : void 0,
    maxHeight: e.maxHeight ? `${e.maxHeight}px` : void 0
  };
  if (C.length === 0)
    return null;
  const W = K && h ? v === "rtl" && (h === "left" || h === "right") ? h === "left" ? "right" : "left" : h : void 0;
  return /* @__PURE__ */ me(
    "div",
    {
      className: `react-flex-layout-tabset ${K ? "drag-over" : ""} ${L}`,
      style: ie,
      "data-tabset-id": e.id,
      "data-drop-position": W,
      onDragOver: ye,
      onDragLeave: xe,
      onDrop: X,
      children: [
        /* @__PURE__ */ me("div", { className: "react-flex-layout-tabset-header", ref: M, children: [
          U && /* @__PURE__ */ N(
            "button",
            {
              className: "react-flex-layout-tabset-scroll-button react-flex-layout-tabset-scroll-left",
              onClick: () => {
                const c = J.current;
                c && c.scrollBy({ left: -200, behavior: "smooth" });
              },
              type: "button",
              "aria-label": "Scroll left",
              children: $ || /* @__PURE__ */ N(Oe, {})
            }
          ),
          /* @__PURE__ */ me(
            "div",
            {
              ref: J,
              className: "react-flex-layout-tabset-tabs-container",
              onScroll: ge,
              children: [
                j.map((c) => {
                  const d = p.get(c.id) ?? -1, _ = d === g, ce = K && h === "tab" && S !== null && d === S;
                  return /* @__PURE__ */ me(Ce.Fragment, { children: [
                    ce && /* @__PURE__ */ N("div", { className: "react-flex-layout-tab-drop-indicator" }),
                    /* @__PURE__ */ N(
                      Ae,
                      {
                        node: c,
                        index: d,
                        onSelect: q,
                        onClose: I,
                        onDragStart: te,
                        onDragEnd: i,
                        className: _ ? "active" : "",
                        closeIcon: R,
                        closeButtonClassName: E
                      }
                    )
                  ] }, c.id);
                }),
                K && h === "tab" && S !== null && S === C.length && /* @__PURE__ */ N("div", { className: "react-flex-layout-tab-drop-indicator" })
              ]
            }
          ),
          le && /* @__PURE__ */ N(
            "button",
            {
              className: "react-flex-layout-tabset-scroll-button react-flex-layout-tabset-scroll-right",
              onClick: () => {
                const c = J.current;
                c && c.scrollBy({ left: 200, behavior: "smooth" });
              },
              type: "button",
              "aria-label": "Scroll right",
              children: k || /* @__PURE__ */ N(ke, {})
            }
          )
        ] }),
        /* @__PURE__ */ N("div", { className: "react-flex-layout-tabset-content", children: T && (n ? n(T) : t) })
      ]
    }
  );
}, We = pe(
  Ve,
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
        for (let l = 0; l < n.length; l++)
          if (n[l] !== r[l]) {
            const s = n[l], i = r[l];
            if (s.id !== i.id || s.type !== i.type || s.name !== i.name || s.component !== i.component || s.enableClose !== i.enableClose || s.enableDrag !== i.enableDrag)
              return !1;
          }
      }
    }
    return !0;
  }
);
We.displayName = "MemoizedTabSet";
const Ze = ({
  direction: e,
  onResize: t,
  onResizeStart: n,
  size: r = 8,
  className: l = "",
  style: s = {},
  customStyles: i = {}
}) => {
  const [u, f] = de(!1), y = m(0), b = m(0), h = m(!1), S = m(null), v = m(null), L = D(
    ($) => {
      $.preventDefault(), $.stopPropagation(), f(!0), y.current = e === "horizontal" ? $.clientX : $.clientY, b.current = y.current, n?.();
      const k = (p) => {
        b.current = e === "horizontal" ? p.clientX : p.clientY, h.current || (h.current = !0, requestAnimationFrame(() => {
          h.current = !1;
          const j = b.current - y.current;
          t(j);
        }));
      }, C = () => {
        f(!1), document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", C), S.current = null, v.current = null, h.current = !1;
      };
      document.addEventListener("mousemove", k), document.addEventListener("mouseup", C), S.current = k, v.current = C;
    },
    [e, t, n]
  ), O = {
    backgroundColor: "#ffffff",
    border: "none",
    outline: "none"
  }, R = ue(() => u && i.active ? i.active : i.default ? i.default : O, [u, i.active, i.default]), E = ue(() => {
    const $ = e === "horizontal";
    return {
      ...s,
      width: $ ? `${r}px` : "100%",
      height: $ ? "100%" : `${r}px`,
      minWidth: $ ? `${r}px` : void 0,
      minHeight: $ ? void 0 : `${r}px`,
      flexShrink: 0,
      cursor: $ ? "col-resize" : "row-resize",
      ...R,
      transition: u ? "none" : "all 0.2s ease"
    };
  }, [e, r, s, R, u]);
  return z(() => () => {
    S.current && document.removeEventListener("mousemove", S.current), v.current && document.removeEventListener("mouseup", v.current), h.current = !1;
  }, []), /* @__PURE__ */ N(
    "div",
    {
      className: `react-flex-layout-splitter ${l}`,
      style: E,
      onMouseDown: L
    }
  );
}, Ee = pe(Ze, (e, t) => e.direction === t.direction && e.size === t.size && e.onResize === t.onResize && e.onResizeStart === t.onResizeStart && e.className === t.className && e.style === t.style && e.customStyles === t.customStyles), Qe = (e) => {
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = (l, s = null) => {
    if (t.set(l.id, l), s && n.set(l.id, s), l.children)
      for (const i of l.children)
        r(i, l);
  };
  return r(e), { nodeIndex: t, parentIndex: n };
}, Ie = (e, t) => e.get(t) ?? null, Fe = (e, t) => e.get(t) ?? null, ht = (e, t) => ({
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
}), Pe = (e, t, n, r) => ({
  id: e,
  type: "tab",
  component: t,
  name: n,
  config: r,
  enableClose: !0,
  enableDrag: !0
}), Be = (e, t, n = 0) => ({
  id: e,
  type: "tabset",
  children: t,
  selected: n,
  enableClose: !0,
  enableDrag: !0
}), et = (e, t, n, r) => ({
  id: e,
  type: "row",
  children: _e(t),
  width: n,
  height: r,
  enableResize: !0
}), tt = (e, t, n, r) => ({
  id: e,
  type: "column",
  children: _e(t),
  width: n,
  height: r,
  enableResize: !0
}), fe = (e, t) => {
  if (e.id === t)
    return e;
  if (e.children)
    for (const n of e.children) {
      const r = fe(n, t);
      if (r)
        return r;
    }
  return null;
}, Me = (e, t) => {
  if (!e.children)
    return null;
  for (const n of e.children)
    if (n.id === t)
      return e;
  for (const n of e.children) {
    const r = Me(n, t);
    if (r)
      return r;
  }
  return null;
}, ee = (e, t, n) => {
  if (e.id === t)
    return n === null ? null : Object.keys(n).some((l) => {
      const s = l;
      return e[s] !== n[s];
    }) ? { ...e, ...n } : e;
  if (e.children) {
    let r = null;
    const l = e.children;
    for (let s = 0; s < l.length; s++) {
      const i = l[s], u = ee(i, t, n);
      u !== i && r === null && (r = l.slice(0, s)), r !== null && u !== null && r.push(u);
    }
    return r === null ? e : {
      ...e,
      children: r
    };
  }
  return e;
}, Ke = (e, t) => {
  if (!e.children)
    return e;
  let n = null;
  const r = e.children;
  for (let l = 0; l < r.length; l++) {
    const s = r[l];
    if (s.id === t) {
      n === null && (n = r.slice(0, l));
      continue;
    }
    const i = Ke(s, t);
    i !== s && n === null && (n = r.slice(0, l)), n !== null && n.push(i);
  }
  return n === null ? e : {
    ...e,
    children: n
  };
}, _e = (e) => e.map((t) => ({
  ...t,
  flex: t.flex || 1 / e.length
})), Te = (e) => {
  if (e.type === "tabset" && (!e.children || e.children.length === 0))
    return null;
  if (e.children) {
    const t = e.children, n = t.length;
    let r = null;
    for (let i = 0; i < t.length; i++) {
      const u = t[i], f = Te(u);
      f !== u && r === null && (r = t.slice(0, i)), r !== null && f !== null && r.push(f);
    }
    const l = r ?? t, s = l.length < n;
    if (l.length === 0)
      return null;
    if ((e.type === "row" || e.type === "column") && l.length > 0) {
      const i = l.reduce(
        (f, y) => f + (y.flex || 0),
        0
      );
      if (s || i < 0.999 || l.length === 1) {
        let f;
        if (l.length === 1)
          f = l.map((y) => ({
            ...y,
            flex: 1
          }));
        else if (i === 0 || i < 1e-3) {
          const y = 1 / l.length;
          f = l.map((b) => ({
            ...b,
            flex: y
          }));
        } else {
          const y = 1 / i;
          f = l.map((b) => ({
            ...b,
            flex: (b.flex || 0) * y
          }));
        }
        return {
          ...e,
          children: f
        };
      }
      if (l.length !== n || l.some((f, y) => f !== t[y]))
        return {
          ...e,
          children: l
        };
    }
    if (r !== null)
      return {
        ...e,
        children: l
      };
  }
  return e;
}, je = (e, t, n = null) => {
  if (!e.children) return null;
  for (const r of e.children) {
    if (r.id === t)
      return n || e;
    if (r.children) {
      const l = je(r, t, e);
      if (l) return l;
    }
  }
  return null;
}, Xe = (e, t) => {
  if (!e.children) return null;
  for (const n of e.children) {
    if (n.type === "tabset" && n.children && n.children.find((l) => l.id === t))
      return n;
    if (n.children) {
      const r = Xe(n, t);
      if (r) return r;
    }
  }
  return null;
}, nt = (e, t, n) => {
  const r = fe(e, t);
  if (!r || r.type !== "tabset")
    return null;
  const s = [...r.children || [], n], i = {
    ...r,
    children: s,
    selected: s.length - 1
  };
  return ee(e, t, i);
}, gt = (e, t) => {
  const n = Xe(e, t);
  if (!n || n.type !== "tabset")
    return { layout: e, restoreData: null };
  const r = n.children?.find((h) => h.id === t);
  if (!r || r.type !== "tab")
    return { layout: e, restoreData: null };
  const l = n.children?.findIndex(
    (h) => h.id === t
  ), s = n.children?.filter(
    (h) => h.id !== t
  );
  if (!s || s.length === 0) {
    const h = Ke(e, n.id), S = {
      tabId: r.id,
      component: r.component || "",
      name: r.name || "",
      tabsetId: n.id,
      tabIndex: l !== void 0 ? l : 0,
      config: r.config
    };
    return {
      layout: h,
      restoreData: S
    };
  }
  const i = n.selected ?? 0;
  let u = i;
  l !== void 0 && l !== -1 && (l <= i && (u = Math.max(0, i - 1)), u = Math.min(u, s.length - 1));
  const f = {
    ...n,
    children: s,
    selected: s.length > 0 ? u : void 0
  }, y = ee(e, n.id, f), b = {
    tabId: r.id,
    component: r.component || "",
    name: r.name || "",
    tabsetId: n.id,
    tabIndex: l !== void 0 ? l : 0,
    config: r.config
  };
  return {
    layout: y,
    restoreData: b
  };
}, bt = (e, t, n) => {
  if (fe(e, t.tabId))
    return e;
  let l = fe(e, t.tabsetId);
  if (!l || l.type !== "tabset") {
    if (!n)
      return null;
    const u = je(
      n,
      t.tabsetId
    );
    if (!u)
      return null;
    const f = fe(e, u.id);
    if (!f || !f.children)
      return null;
    const y = f.children.find(
      (b) => b.id === t.tabsetId
    );
    if (y)
      l = y;
    else {
      const b = Be(t.tabsetId, []), h = [...f.children, b], S = {
        ...f,
        children: h
      }, v = ee(
        e,
        f.id,
        S
      );
      if (!v || (e = v, l = fe(e, t.tabsetId), !l || l.type !== "tabset"))
        return null;
    }
  }
  const s = Pe(
    t.tabId,
    t.component,
    t.name,
    t.config
  );
  return nt(e, t.tabsetId, s);
}, mt = (e, t) => fe(e, t) !== null, rt = (e, t, n) => {
  const r = m({}), l = m({}), s = m(e), i = m(t);
  z(() => {
    s.current = e;
  }, [e]), z(() => {
    i.current = t;
  }, [t]);
  const u = m(n);
  z(() => {
    u.current = n;
  }, [n]);
  const f = D(
    (b, h, S) => {
      if (!i.current) return;
      const v = s.current, L = (u.current && Fe(u.current, b)) ?? qe(v.layout, b);
      if (!L || !L.children) return;
      const O = L.children.findIndex(
        (I) => I.id === b
      ), R = O + 1;
      if (R >= L.children.length) return;
      const E = `${b}-${S}`;
      if (!r.current[E]) {
        const I = L.children[O], te = L.children[R];
        r.current[E] = {
          current: I.flex || 1,
          sibling: te.flex || 1
        };
      }
      const $ = r.current[E], k = $.current + $.sibling, C = S === "horizontal" ? window.innerWidth : window.innerHeight, p = $.current / k * C, j = $.sibling / k * C, x = 100;
      let g = p + h, T = j - h;
      if (g < x) {
        const I = x - g;
        g = x, T -= I;
      }
      if (T < x) {
        const I = x - T;
        T = x, g -= I;
      }
      const q = g + T;
      if (q > 0) {
        const I = g / q * k, te = T / q * k, M = l.current[E], J = 1e-4;
        if (M && Math.abs(M.current - I) < J && Math.abs(M.sibling - te) < J)
          return;
        const U = L.children.slice(), V = U[O], le = U[R];
        U[O] = { ...V, flex: I }, U[R] = { ...le, flex: te };
        const Z = ee(v.layout, L.id, {
          children: U
        });
        Z && (l.current[E] = {
          current: I,
          sibling: te
        }, i.current({
          ...v,
          layout: Z
        }));
      }
    },
    []
    // Empty deps - stable reference, uses refs internally
  ), y = D(
    (b, h) => {
      const S = `${b}-${h}`;
      delete r.current[S], delete l.current[S];
    },
    []
  );
  return { handleResize: f, resetResize: y };
}, qe = (e, t) => {
  if (!e.children) return null;
  for (const n of e.children) {
    if (n.id === t)
      return e;
    const r = qe(n, t);
    if (r) return r;
  }
  return null;
}, lt = (e, t, n, r) => {
  const [l, s] = de(null), [i, u] = de(null), [f, y] = de("center"), [b, h] = de(null), S = m(null), v = m(e), L = m(t), O = m(f), R = m(b), E = m(n), $ = m(r);
  z(() => {
    v.current = e;
  }, [e]), z(() => {
    L.current = t;
  }, [t]), z(() => {
    O.current = f;
  }, [f]), z(() => {
    R.current = b;
  }, [b]), z(() => {
    E.current = n;
  }, [n]), z(() => {
    $.current = r;
  }, [r]);
  const k = D((g, T) => {
    const q = { tabsetId: g, tabIndex: T };
    s(q), S.current = q;
  }, []), C = D(() => {
    s(null), S.current = null, u(null), h(null);
  }, []), p = D(
    (g, T, q = "center", I) => {
      g.preventDefault(), g.dataTransfer.dropEffect = "move", u(T), y(q), I !== void 0 ? h(I) : q !== "tab" && h(null);
    },
    []
  ), j = D((g) => {
    g.currentTarget === g.target && setTimeout(() => {
      u(null), h(null);
    }, 50);
  }, []), x = D(
    (g, T) => {
      g.preventDefault();
      const q = S.current, I = v.current, te = L.current, M = O.current, J = R.current;
      if (!q || !te)
        return;
      const { tabsetId: U, tabIndex: V } = q;
      if (U === T && M === "tab" && J !== null) {
        const X = (E.current && Ie(E.current, U)) ?? fe(I.layout, U);
        if (!X || !X.children)
          return;
        const K = X.children[V];
        if (!K || V === J)
          return;
        const ie = [...X.children];
        ie.splice(V, 1), ie.splice(J, 0, K);
        let W = X.selected ?? 0;
        V < W && J >= W ? W = Math.max(0, W - 1) : V > W && J <= W ? W = Math.min(W + 1, ie.length - 1) : V === W && (W = J);
        const c = ee(
          I.layout,
          U,
          {
            children: ie,
            selected: W
          }
        );
        c && te({
          ...I,
          layout: c,
          metadata: I.metadata
        }), s(null), u(null), h(null);
        return;
      }
      if (U === T && M !== "tab")
        return;
      const le = (E.current && Ie(E.current, U)) ?? fe(I.layout, U), Z = (E.current && Ie(E.current, T)) ?? fe(I.layout, T);
      if (!le || !Z || !le.children || !Z.children)
        return;
      const oe = le.children[V];
      if (!oe)
        return;
      let Y = I.layout;
      const ge = le.children.filter(
        (X, K) => K !== V
      ), ye = ee(
        Y,
        U,
        {
          children: ge,
          selected: Math.min(
            le.selected || 0,
            ge.length - 1
          )
        }
      );
      if (!ye) return;
      if (Y = ye, M === "center") {
        const X = ee(
          Y,
          T,
          {
            children: [...Z.children || [], oe],
            selected: Z.children?.length || 0
          }
        );
        if (!X) return;
        Y = X;
      } else {
        const X = Be(
          `${T}-split-${Date.now()}`,
          [oe]
        ), K = ($.current && Fe($.current, T)) ?? Me(Y, T);
        if (K) {
          const ie = K.children?.findIndex(
            (W) => W.id === T
          ) || 0;
          if (M === "left" || M === "right") {
            const W = et(`${T}-row-${Date.now()}`, [
              M === "left" ? X : Z,
              M === "left" ? Z : X
            ]), c = ee(
              Y,
              K.id,
              {
                children: [
                  ...K.children?.slice(0, ie) || [],
                  W,
                  ...K.children?.slice(ie + 1) || []
                ]
              }
            );
            if (!c) return;
            Y = c;
          } else if (M === "top" || M === "bottom") {
            const W = tt(
              `${T}-column-${Date.now()}`,
              [
                M === "top" ? X : Z,
                M === "top" ? Z : X
              ]
            ), c = ee(
              Y,
              K.id,
              {
                children: [
                  ...K.children?.slice(0, ie) || [],
                  W,
                  ...K.children?.slice(ie + 1) || []
                ]
              }
            );
            if (!c) return;
            Y = c;
          }
        }
      }
      const xe = Te(Y);
      xe && te({
        ...I,
        layout: xe,
        metadata: I.metadata
      }), s(null), u(null);
    },
    []
  );
  return {
    draggedTab: l,
    dragOverTabset: i,
    dropPosition: f,
    dropTargetIndex: b,
    handleDragStart: k,
    handleDragEnd: C,
    handleDragOver: p,
    handleDragLeave: j,
    handleDrop: x
  };
}, it = "react-flex-layout";
class Je {
  storageKey;
  autoSave;
  debounceMs;
  saveTimeout = null;
  lastSavedString = null;
  isAvailable;
  constructor(t = {}) {
    this.storageKey = `${it}-${t.key || "default"}`, this.autoSave = t.autoSave !== !1, this.debounceMs = t.debounceMs || 500, this.isAvailable = at();
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
const yt = (e) => new Je(e), at = () => {
  try {
    const e = "__localStorage_test__";
    return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
  } catch {
    return !1;
  }
}, ct = (e, t = {}) => {
  const { onLoad: n, onSave: r, onError: l, ...s } = t, i = m(null), [u, f] = de(e), [y, b] = de(!1), [h, S] = de(!1);
  z(() => {
    if (i.current)
      try {
        i.current.cancel?.();
      } catch {
      }
    i.current = new Je(s), S(!0);
  }, [s.key, s.autoSave, s.debounceMs]), z(() => {
    if (!i.current || y) return;
    const x = i.current.load();
    x ? (f(x), b(!0), n?.(x)) : b(!0);
  }, [y, n]);
  const v = m(), L = ue(
    () => JSON.stringify(u.layout),
    [u.layout]
  ), O = ue(
    () => JSON.stringify(e.layout),
    [e.layout]
  ), R = ue(
    () => u.metadata ? JSON.stringify(u.metadata) : void 0,
    [u.metadata]
  ), E = ue(
    () => e.metadata ? JSON.stringify(e.metadata) : void 0,
    [e.metadata]
  );
  z(() => {
    if (!(!y || !i.current)) {
      if (v.current !== O && L !== O) {
        const x = { ...e };
        e.global && (x.global = { ...e.global }), f(x), v.current = O, i.current.isAutoSaveEnabled() ? i.current.debouncedSave(x) : i.current.save(x);
        return;
      }
      e.metadata && R !== E && f((x) => ({
        ...x,
        metadata: e.metadata
      }));
    }
  }, [
    y,
    i,
    e,
    L,
    O,
    R,
    E
  ]);
  const $ = D(
    (x) => {
      if (i.current)
        try {
          i.current.isAutoSaveEnabled() ? i.current.debouncedSave(x) : i.current.save(x), r?.(x);
        } catch (g) {
          l?.(g);
        }
    },
    [r, l]
  ), k = D(
    (x) => {
      const g = { ...x };
      x.global && (g.global = { ...x.global }), f(g), $(g);
    },
    [$]
  ), C = D(() => {
    if (i.current)
      try {
        i.current.clear();
      } catch (x) {
        l?.(x);
      }
  }, [l]), p = D(() => i.current?.exists() ?? !1, []), j = D(() => i.current?.getStorageKey() ?? "", []);
  return {
    model: u,
    updateModel: k,
    clearStorage: C,
    hasStoredData: p,
    getStorageKey: j,
    isLoaded: y,
    hasStorage: h
  };
}, st = (e) => {
  const t = m(null), n = m(e), r = ue(() => {
    if (t.current === null || n.current !== e || n.current.id !== e.id) {
      const l = Qe(e);
      return t.current = l, n.current = e, l;
    }
    return t.current;
  }, [e]);
  return z(() => {
    n.current = e;
  }, [e]), r;
}, ot = Ue(
  ({
    model: e,
    factory: t,
    onModelChange: n,
    onAction: r,
    className: l = "",
    style: s = {},
    storage: i,
    closeIcon: u,
    closeButtonClassName: f,
    scrollLeftIcon: y,
    scrollRightIcon: b
  }, h) => {
    const [S, v] = de(e), [L, O] = de(
      null
    ), {
      model: R,
      updateModel: E,
      isLoaded: $
    } = ct(e, {
      key: i?.key,
      autoSave: i?.autoSave,
      debounceMs: i?.debounceMs,
      onLoad: (a) => {
        n ? n(a) : v(a);
      }
    }), k = i?.enabled ? R : n ? e : S, { nodeIndex: C, parentIndex: p } = st(k.layout), j = m(C), x = m(p);
    z(() => {
      j.current = C, x.current = p;
    }, [C, p]);
    const g = m(n), T = m(i), q = m(E);
    z(() => {
      g.current = n;
    }, [n]), z(() => {
      T.current = i;
    }, [i]), z(() => {
      q.current = E;
    }, [E]);
    const I = D((a) => {
      T.current?.enabled ? (q.current(a), g.current && g.current(a)) : g.current ? g.current(a) : v(a);
    }, []), { handleResize: te, resetResize: M } = rt(
      k,
      I,
      p
    ), J = 100, U = m(/* @__PURE__ */ new Map()), V = D(
      (a, H, Q) => {
        const F = `${a}-${H}-${Q ? "rtl" : "ltr"}`, o = U.current;
        if (o.has(F)) {
          const w = o.get(F);
          return o.delete(F), o.set(F, w), w;
        }
        const A = {
          onResize: (w) => {
            const ae = Q ? -w : w;
            te(a, ae, H);
          },
          onResizeStart: () => {
            M(a, H);
          }
        };
        if (o.size >= J) {
          const w = o.keys().next().value;
          w && o.delete(w);
        }
        return o.set(F, A), A;
      },
      [te, M]
    ), {
      dragOverTabset: le,
      dropPosition: Z,
      dropTargetIndex: oe,
      handleDragStart: Y,
      handleDragEnd: ge,
      handleDragOver: ye,
      handleDragLeave: xe,
      handleDrop: X
    } = lt(k, I, C, p), K = m(R);
    z(() => {
      K.current = R;
    }, [R]);
    const ie = m(S);
    z(() => {
      ie.current = S;
    }, [S]);
    const W = m(e);
    z(() => {
      W.current = e;
    }, [e]);
    const c = m(r);
    z(() => {
      c.current = r;
    }, [r]);
    const d = D((a) => {
      if (T.current?.enabled) {
        const H = K.current;
        if (a.type === "changeDirection") {
          const { direction: o } = a.payload;
          O(o);
        }
        const F = ((o) => {
          switch (a.type) {
            case "selectTab":
              const { nodeId: A, tabIndex: w } = a.payload, ae = ee(o.layout, A, {
                selected: w
              });
              return !ae || ae === o.layout ? o : {
                ...o,
                layout: ae
              };
            case "removeNode":
              const { nodeId: re, tabIndex: se } = a.payload, B = Ie(j.current, re) ?? fe(o.layout, re);
              if (B && B.children) {
                const P = B.children.filter(
                  (Re, $e) => $e !== se
                ), ve = B.selected ?? 0;
                let be = ve;
                se <= ve && (be = Math.max(0, ve - 1)), be = Math.min(be, P.length - 1);
                const ze = {
                  ...B,
                  children: P,
                  selected: P.length > 0 ? be : void 0
                }, De = ee(
                  o.layout,
                  re,
                  ze
                );
                if (De) {
                  const Re = Te(De);
                  if (Re)
                    return {
                      ...o,
                      layout: Re
                    };
                }
              }
              return o;
            case "closeTabset":
              const { nodeId: Le } = a.payload, Se = ee(
                o.layout,
                Le,
                null
              );
              if (Se) {
                const P = Te(Se);
                if (P)
                  return {
                    ...o,
                    layout: P
                  };
              }
              return o;
            case "changeDirection":
              const { direction: we } = a.payload;
              return {
                ...o,
                global: {
                  ...o.global,
                  direction: we
                }
              };
            default:
              return o;
          }
        })(H);
        q.current(F), g.current && g.current(F), c.current?.(a);
      } else {
        if (a.type === "changeDirection" && g.current) {
          const { direction: H } = a.payload, Q = W.current, F = {
            ...Q,
            global: {
              ...Q.global,
              direction: H
            }
          };
          g.current(F);
        }
        c.current?.(a);
      }
      if (!T.current?.enabled && !g.current) {
        const H = ie.current, F = ((o) => {
          switch (a.type) {
            case "selectTab":
              const { nodeId: A, tabIndex: w } = a.payload, ae = ee(o.layout, A, {
                selected: w
              });
              return !ae || ae === o.layout ? o : {
                ...o,
                layout: ae
              };
            case "removeNode":
              const { nodeId: re, tabIndex: se } = a.payload, B = Ie(j.current, re) ?? fe(o.layout, re);
              if (B && B.children) {
                const P = B.children.filter(
                  (Re, $e) => $e !== se
                ), ve = B.selected ?? 0;
                let be = ve;
                se <= ve && (be = Math.max(0, ve - 1)), be = Math.min(be, P.length - 1);
                const ze = {
                  ...B,
                  children: P,
                  selected: P.length > 0 ? be : void 0
                }, De = ee(
                  o.layout,
                  re,
                  ze
                );
                if (De) {
                  const Re = Te(De);
                  if (Re)
                    return {
                      ...o,
                      layout: Re
                    };
                }
              }
              return o;
            case "closeTabset":
              const { nodeId: Le } = a.payload, Se = ee(
                o.layout,
                Le,
                null
              );
              if (Se) {
                const P = Te(Se);
                if (P)
                  return {
                    ...o,
                    layout: P
                  };
              }
              return o;
            case "changeDirection":
              const { direction: we } = a.payload;
              return {
                ...o,
                global: {
                  ...o.global,
                  direction: we
                }
              };
            default:
              return o;
          }
        })(H);
        v(F);
      }
    }, []);
    Ye(
      h,
      () => ({
        handleAction: d
      }),
      [d]
    );
    const _ = D(
      (a, H) => {
        d({
          type: "selectTab",
          payload: { nodeId: a, tabIndex: H }
        });
      },
      [d]
    ), ce = D(
      (a, H) => {
        d({
          type: "removeNode",
          payload: { nodeId: a, tabIndex: H }
        });
      },
      [d]
    );
    let ne;
    i?.enabled ? L !== null ? ne = L : ne = R?.global?.direction || "ltr" : ne = k.global?.direction || "ltr";
    const he = k.global?.splitterSize || 8, G = D(
      (a) => {
        switch (a.type) {
          case "tabset":
            return /* @__PURE__ */ N(
              We,
              {
                node: a,
                factory: t,
                onTabSelect: _,
                onTabClose: ce,
                onTabDragStart: Y,
                onTabDragEnd: ge,
                onDragOver: ye,
                onDragLeave: xe,
                onDrop: X,
                dragOverTabset: le,
                dropPosition: le === a.id ? Z : void 0,
                dropTargetIndex: le === a.id ? oe : void 0,
                direction: ne,
                closeIcon: u,
                closeButtonClassName: f,
                scrollLeftIcon: y,
                scrollRightIcon: b
              },
              a.id
            );
          case "row":
            const H = ne === "rtl", Q = a.children || [], F = H ? [...Q].reverse() : Q;
            return /* @__PURE__ */ N(
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
                children: F.map((o, A) => {
                  const w = A + 1;
                  if (!(w < F.length))
                    return /* @__PURE__ */ N(Ce.Fragment, { children: G(o) }, o.id);
                  const re = H ? Q.length - 1 - A : A, se = H ? Q.length - 1 - w : w, B = Math.min(
                    re,
                    se
                  );
                  if (Math.max(
                    re,
                    se
                  ) !== B + 1)
                    return /* @__PURE__ */ N(Ce.Fragment, { children: G(o) }, o.id);
                  const Se = Q[B], we = H && re > se, P = V(
                    Se.id,
                    "horizontal",
                    we
                  );
                  return /* @__PURE__ */ me(Ce.Fragment, { children: [
                    G(o),
                    /* @__PURE__ */ N(
                      Ee,
                      {
                        direction: "horizontal",
                        onResize: P.onResize,
                        onResizeStart: P.onResizeStart,
                        size: he
                      }
                    )
                  ] }, o.id);
                })
              },
              a.id
            );
          case "column":
            return /* @__PURE__ */ N(
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
                children: a.children?.map((o, A) => {
                  const w = A < (a.children?.length || 0) - 1 ? V(o.id, "vertical") : null;
                  return /* @__PURE__ */ me(Ce.Fragment, { children: [
                    G(o),
                    w && /* @__PURE__ */ N(
                      Ee,
                      {
                        direction: "vertical",
                        onResize: w.onResize,
                        onResizeStart: w.onResizeStart,
                        size: he
                      }
                    )
                  ] }, o.id);
                })
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
        ne,
        he,
        t,
        _,
        ce,
        te,
        Y,
        ge,
        ye,
        xe,
        X,
        le,
        Z,
        u,
        f,
        V
      ]
    );
    z(() => {
      !i?.enabled && L !== null && O(null);
    }, [i?.enabled, L]), z(() => {
      i?.enabled && L !== null && (R?.global?.direction || "ltr") === L && O(null);
    }, [i?.enabled, L, R?.global?.direction]);
    const He = ue(
      () => G(k.layout),
      [G, k.layout]
    ), Ne = {
      ...s,
      height: "100%",
      width: "100%"
    };
    return i?.enabled && !$ ? /* @__PURE__ */ N(
      "div",
      {
        className: `react-flex-layout ${l}`,
        style: {
          ...Ne,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ N("div", { children: "Loading layout..." })
      }
    ) : /* @__PURE__ */ N(
      "div",
      {
        className: `react-flex-layout ${l}`,
        style: Ne,
        dir: ne,
        children: He
      }
    );
  }
);
ot.displayName = "Layout";
const ut = pe(Ae, (e, t) => !(e.className !== t.className || e.style !== t.style || e.closeIcon !== t.closeIcon || e.closeButtonClassName !== t.closeButtonClassName || e.index !== t.index || e.onSelect !== t.onSelect || e.onClose !== t.onClose || e.onDragStart !== t.onDragStart || e.onDragEnd !== t.onDragEnd || e.node.id !== t.node.id || e.node.name !== t.node.name));
ut.displayName = "MemoizedTab";
export {
  Ge as DefaultCloseIcon,
  ot as Layout,
  Je as LayoutStorage,
  ut as MemoizedTab,
  We as MemoizedTabSet,
  Oe as ScrollLeftIcon,
  ke as ScrollRightIcon,
  Ee as Splitter,
  Ae as Tab,
  Ve as TabSet,
  nt as addTabToTabset,
  _e as calculateFlexValues,
  tt as createColumn,
  ht as createLayoutModel,
  yt as createLayoutStorage,
  et as createRow,
  Pe as createTab,
  Be as createTabSet,
  fe as findNodeById,
  at as isLocalStorageAvailable,
  Te as removeEmptyTabsets,
  Ke as removeNodeById,
  gt as removeTab,
  bt as restoreTab,
  mt as tabExists,
  ee as updateNodeById,
  ct as useLayoutStorage
};
