import { jsxs as ae, jsx as S } from "react/jsx-runtime";
import xe, { useRef as g, useCallback as D, useEffect as A, useMemo as oe, useState as se, memo as Te, forwardRef as Me, useImperativeHandle as Be } from "react";
const Fe = ({
  size: e = 16,
  color: t = "#666",
  className: r = ""
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
    className: r,
    children: [
      /* @__PURE__ */ S("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ S("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
), Se = ({
  node: e,
  index: t,
  onClose: r,
  onSelect: l,
  onDragStart: i,
  onDragEnd: c,
  className: o = "",
  style: d = {},
  closeIcon: f,
  closeButtonClassName: y = ""
}) => {
  const h = g(!1), u = D(() => {
    l?.(e.id);
  }, [e.id, l]), R = D(
    (I) => {
      I.stopPropagation(), r?.(e.id);
    },
    [e.id, r]
  ), m = D(
    (I) => {
      I.dataTransfer.setData("text/plain", e.id), I.dataTransfer.effectAllowed = "move", I.currentTarget.classList.add("dragging"), document.body.classList.add("dragging"), h.current = !0, i?.(e.id, t);
    },
    [e.id, t, i]
  ), N = D(
    (I) => {
      I.currentTarget.classList.remove("dragging"), document.body.classList.remove("dragging"), h.current = !1, c?.();
    },
    [c]
  );
  A(() => () => {
    h.current && (document.body.classList.remove("dragging"), h.current = !1);
  }, []);
  const k = oe(() => ({ ...d, cursor: "grab" }), [d]);
  return /* @__PURE__ */ ae(
    "div",
    {
      className: `react-flex-layout-tab ${o}`,
      style: k,
      onClick: u,
      draggable: !0,
      onDragStart: m,
      onDragEnd: N,
      children: [
        /* @__PURE__ */ S("span", { className: "react-flex-layout-tab-title", children: e.name || "Untitled" }),
        /* @__PURE__ */ S(
          "button",
          {
            className: `react-flex-layout-tab-close ${y}`.trim(),
            onClick: R,
            type: "button",
            "aria-label": "Close tab",
            children: f || /* @__PURE__ */ S(Fe, {})
          }
        )
      ]
    }
  );
}, De = (e) => /* @__PURE__ */ S(
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
    children: /* @__PURE__ */ S("polyline", { points: "15 18 9 12 15 6" })
  }
);
De.displayName = "ScrollLeftIcon";
const Le = (e) => /* @__PURE__ */ S(
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
    children: /* @__PURE__ */ S("polyline", { points: "9 18 15 12 9 6" })
  }
);
Le.displayName = "ScrollRightIcon";
const Ae = ({
  node: e,
  children: t,
  factory: r,
  onTabSelect: l,
  onTabClose: i,
  onTabDragStart: c,
  onTabDragEnd: o,
  onDragOver: d,
  onDragLeave: f,
  onDrop: y,
  dragOverTabset: h,
  dropPosition: u,
  dropTargetIndex: R,
  direction: m = "ltr",
  className: N = "",
  style: k = {},
  closeIcon: I,
  closeButtonClassName: M,
  scrollLeftIcon: w,
  scrollRightIcon: _
}) => {
  const C = oe(() => e.children?.filter((n) => n.type === "tab") || [], [e.children]), H = oe(() => {
    const n = /* @__PURE__ */ new Map();
    for (let a = 0; a < C.length; a++) {
      const s = C[a];
      s && s.id && n.set(s.id, a);
    }
    return n;
  }, [C]), Y = oe(() => C, [C]), P = e.selected ?? 0, T = Math.min(
    P,
    Math.max(0, C.length - 1)
  ), b = C[T], O = D(
    (n) => {
      const a = H.get(n);
      a !== void 0 && a !== -1 && l?.(e.id, a);
    },
    [e.id, H, l]
  ), v = D(
    (n) => {
      const a = H.get(n);
      a !== void 0 && a !== -1 && i?.(e.id, a);
    },
    [e.id, H, i]
  ), V = D(
    (n, a) => {
      const s = a !== void 0 ? a : H.get(n) ?? -1;
      s !== -1 && c?.(e.id, s);
    },
    [e.id, H, c]
  ), p = g(null), B = g(null), [F, X] = se(!1), [ee, j] = se(!1), Z = g(null), z = g();
  z.current = () => {
    const n = B.current;
    if (!n) {
      X(!1), j(!1);
      return;
    }
    const { scrollLeft: a, scrollWidth: s, clientWidth: x } = n;
    X(a > 1), j(a < s - x - 1);
  };
  const re = D(() => {
    Z.current && clearTimeout(Z.current), Z.current = setTimeout(() => {
      z.current?.();
    }, 10);
  }, []), ue = D(
    (n) => {
      n.preventDefault(), n.dataTransfer.dropEffect = "move";
      const a = n.currentTarget.getBoundingClientRect(), s = n.clientX - a.left, x = n.clientY - a.top, q = a.width, $ = a.height;
      let U = "center";
      if (x < 40) {
        const me = p.current;
        if (me) {
          const le = me.getBoundingClientRect(), be = n.clientX - le.left, J = me.querySelectorAll(
            ".react-flex-layout-tab"
          );
          let ie = C.length;
          if (m === "rtl") {
            for (let K = J.length - 1; K >= 0; K--) {
              const te = J[K].getBoundingClientRect(), ge = te.left - le.left, de = te.right - le.left, ye = (ge + de) / 2;
              if (be > ye) {
                const fe = H.get(Y[K].id);
                fe !== void 0 && fe !== -1 && (ie = fe);
                break;
              }
            }
            if (ie === C.length && J.length > 0) {
              const K = J[0].getBoundingClientRect();
              if (be > K.right - le.left) {
                const te = H.get(Y[0].id);
                te !== void 0 && te !== -1 && (ie = te);
              }
            }
          } else
            for (let K = 0; K < J.length; K++) {
              const te = J[K].getBoundingClientRect(), ge = te.left - le.left, de = te.right - le.left, ye = (ge + de) / 2;
              if (be < ye) {
                const fe = H.get(Y[K].id);
                fe !== void 0 && fe !== -1 && (ie = fe);
                break;
              }
            }
          U = "tab", d?.(n, e.id, U, ie);
          return;
        }
      }
      s < q * 0.25 ? U = m === "rtl" ? "right" : "left" : s > q * 0.75 ? U = m === "rtl" ? "left" : "right" : x < $ * 0.25 ? U = "top" : x > $ * 0.75 ? U = "bottom" : U = "center", d?.(n, e.id, U);
    },
    [e.id, m, C.length, Y, H, d]
  ), ce = D(
    (n) => {
      f?.(n);
    },
    [f]
  ), W = D(
    (n) => {
      y?.(n, e.id);
    },
    [e.id, y]
  ), L = h === e.id;
  A(() => {
    const n = B.current;
    if (!n || T < 0) return;
    let a;
    return a = requestAnimationFrame(() => {
      const x = n.children[T];
      if (!x) return;
      const q = n.getBoundingClientRect(), $ = x.getBoundingClientRect(), U = n.scrollLeft;
      $.left < q.left ? n.scrollTo({
        left: U - (q.left - $.left) - 10,
        behavior: "smooth"
      }) : $.right > q.right && n.scrollTo({
        left: U + ($.right - q.right) + 10,
        behavior: "smooth"
      });
    }), () => {
      a && cancelAnimationFrame(a);
    };
  }, [T, Y.length]), A(() => {
    const n = B.current;
    if (!n) return;
    const a = { current: 0 };
    a.current = requestAnimationFrame(() => {
      z.current?.();
    }), n.addEventListener("scroll", re, { passive: !0 });
    const s = new ResizeObserver(() => {
      a.current && cancelAnimationFrame(a.current), a.current = requestAnimationFrame(() => {
        z.current?.();
      });
    });
    return s.observe(n), () => {
      a.current && cancelAnimationFrame(a.current), n.removeEventListener("scroll", re), s.disconnect(), Z.current && (clearTimeout(Z.current), Z.current = null);
    };
  }, [re, Y.length]);
  const G = {
    ...k,
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
  const E = L && u ? m === "rtl" && (u === "left" || u === "right") ? u === "left" ? "right" : "left" : u : void 0;
  return /* @__PURE__ */ ae(
    "div",
    {
      className: `react-flex-layout-tabset ${L ? "drag-over" : ""} ${N}`,
      style: G,
      "data-tabset-id": e.id,
      "data-drop-position": E,
      onDragOver: ue,
      onDragLeave: ce,
      onDrop: W,
      children: [
        /* @__PURE__ */ ae("div", { className: "react-flex-layout-tabset-header", ref: p, children: [
          F && /* @__PURE__ */ S(
            "button",
            {
              className: "react-flex-layout-tabset-scroll-button react-flex-layout-tabset-scroll-left",
              onClick: () => {
                const n = B.current;
                n && n.scrollBy({ left: -200, behavior: "smooth" });
              },
              type: "button",
              "aria-label": "Scroll left",
              children: w || /* @__PURE__ */ S(De, {})
            }
          ),
          /* @__PURE__ */ ae(
            "div",
            {
              ref: B,
              className: "react-flex-layout-tabset-tabs-container",
              onScroll: re,
              children: [
                Y.map((n) => {
                  const a = H.get(n.id) ?? -1, s = a === T, x = L && u === "tab" && R !== null && a === R;
                  return /* @__PURE__ */ ae(xe.Fragment, { children: [
                    x && /* @__PURE__ */ S("div", { className: "react-flex-layout-tab-drop-indicator" }),
                    /* @__PURE__ */ S(
                      Se,
                      {
                        node: n,
                        index: a,
                        onSelect: O,
                        onClose: v,
                        onDragStart: V,
                        onDragEnd: o,
                        className: s ? "active" : "",
                        closeIcon: I,
                        closeButtonClassName: M
                      }
                    )
                  ] }, n.id);
                }),
                L && u === "tab" && R !== null && R === C.length && /* @__PURE__ */ S("div", { className: "react-flex-layout-tab-drop-indicator" })
              ]
            }
          ),
          ee && /* @__PURE__ */ S(
            "button",
            {
              className: "react-flex-layout-tabset-scroll-button react-flex-layout-tabset-scroll-right",
              onClick: () => {
                const n = B.current;
                n && n.scrollBy({ left: 200, behavior: "smooth" });
              },
              type: "button",
              "aria-label": "Scroll right",
              children: _ || /* @__PURE__ */ S(Le, {})
            }
          )
        ] }),
        /* @__PURE__ */ S("div", { className: "react-flex-layout-tabset-content", children: b && (r ? r(b) : t) })
      ]
    }
  );
}, Ie = Te(
  Ae,
  (e, t) => {
    if (e.className !== t.className || e.direction !== t.direction || e.dragOverTabset !== t.dragOverTabset || e.dropPosition !== t.dropPosition || e.dropTargetIndex !== t.dropTargetIndex || e.factory !== t.factory || e.onTabSelect !== t.onTabSelect || e.onTabClose !== t.onTabClose || e.onTabDragStart !== t.onTabDragStart || e.onTabDragEnd !== t.onTabDragEnd || e.onDragOver !== t.onDragOver || e.onDragLeave !== t.onDragLeave || e.onDrop !== t.onDrop || e.closeIcon !== t.closeIcon || e.closeButtonClassName !== t.closeButtonClassName || e.style !== t.style || e.children !== t.children) return !1;
    if (e.node === t.node) {
      if (e.node.selected !== t.node.selected)
        return !1;
    } else {
      if (e.node.id !== t.node.id || e.node.selected !== t.node.selected || e.node.width !== t.node.width || e.node.height !== t.node.height || e.node.flex !== t.node.flex || e.node.minWidth !== t.node.minWidth || e.node.minHeight !== t.node.minHeight || e.node.maxWidth !== t.node.maxWidth || e.node.maxHeight !== t.node.maxHeight) return !1;
      const r = e.node.children || [], l = t.node.children || [];
      if (r !== l) {
        if (r.length !== l.length) return !1;
        for (let i = 0; i < r.length; i++)
          if (r[i] !== l[i]) {
            const c = r[i], o = l[i];
            if (c.id !== o.id || c.type !== o.type || c.name !== o.name || c.component !== o.component || c.enableClose !== o.enableClose || c.enableDrag !== o.enableDrag)
              return !1;
          }
      }
    }
    return !0;
  }
);
Ie.displayName = "MemoizedTabSet";
const Oe = ({
  direction: e,
  onResize: t,
  onResizeStart: r,
  size: l = 8,
  className: i = "",
  style: c = {},
  customStyles: o = {}
}) => {
  const [d, f] = se(!1), y = g(0), h = g(0), u = g(!1), R = g(null), m = g(null), N = D(
    (w) => {
      w.preventDefault(), w.stopPropagation(), f(!0), y.current = e === "horizontal" ? w.clientX : w.clientY, h.current = y.current, r?.();
      const _ = (H) => {
        h.current = e === "horizontal" ? H.clientX : H.clientY, u.current || (u.current = !0, requestAnimationFrame(() => {
          u.current = !1;
          const Y = h.current - y.current;
          t(Y);
        }));
      }, C = () => {
        f(!1), document.removeEventListener("mousemove", _), document.removeEventListener("mouseup", C), R.current = null, m.current = null, u.current = !1;
      };
      document.addEventListener("mousemove", _), document.addEventListener("mouseup", C), R.current = _, m.current = C;
    },
    [e, t, r]
  ), k = {
    backgroundColor: "#ffffff",
    border: "none",
    outline: "none"
  }, I = oe(() => d && o.active ? o.active : o.default ? o.default : k, [d, o.active, o.default]), M = oe(() => {
    const w = e === "horizontal";
    return {
      ...c,
      width: w ? `${l}px` : "100%",
      height: w ? "100%" : `${l}px`,
      minWidth: w ? `${l}px` : void 0,
      minHeight: w ? void 0 : `${l}px`,
      flexShrink: 0,
      cursor: w ? "col-resize" : "row-resize",
      ...I,
      transition: d ? "none" : "all 0.2s ease"
    };
  }, [e, l, c, I, d]);
  return A(() => () => {
    R.current && document.removeEventListener("mousemove", R.current), m.current && document.removeEventListener("mouseup", m.current), u.current = !1;
  }, []), /* @__PURE__ */ S(
    "div",
    {
      className: `react-flex-layout-splitter ${i}`,
      style: M,
      onMouseDown: N
    }
  );
}, Ce = Te(Oe, (e, t) => e.direction === t.direction && e.size === t.size && e.onResize === t.onResize && e.onResizeStart === t.onResizeStart && e.className === t.className && e.style === t.style && e.customStyles === t.customStyles), je = (e) => {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), l = (i, c = null) => {
    if (t.set(i.id, i), c && r.set(i.id, c), i.children)
      for (const o of i.children)
        l(o, i);
  };
  return l(e), { nodeIndex: t, parentIndex: r };
}, Re = (e, t) => e.get(t) ?? null, Ne = (e, t) => e.get(t) ?? null, Pe = (e, t) => ({
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
}), qe = (e, t, r, l) => ({
  id: e,
  type: "tab",
  component: t,
  name: r,
  config: l,
  enableClose: !0,
  enableDrag: !0
}), ze = (e, t, r = 0) => ({
  id: e,
  type: "tabset",
  children: t,
  selected: r,
  enableClose: !0,
  enableDrag: !0
}), Xe = (e, t, r, l) => ({
  id: e,
  type: "row",
  children: pe(t),
  width: r,
  height: l,
  enableResize: !0
}), Ke = (e, t, r, l) => ({
  id: e,
  type: "column",
  children: pe(t),
  width: r,
  height: l,
  enableResize: !0
}), ne = (e, t) => {
  if (e.id === t)
    return e;
  if (e.children)
    for (const r of e.children) {
      const l = ne(r, t);
      if (l)
        return l;
    }
  return null;
}, $e = (e, t) => {
  if (!e.children)
    return null;
  for (const r of e.children)
    if (r.id === t)
      return e;
  for (const r of e.children) {
    const l = $e(r, t);
    if (l)
      return l;
  }
  return null;
}, Q = (e, t, r) => {
  if (e.id === t)
    return r === null ? null : Object.keys(r).some((i) => {
      const c = i;
      return e[c] !== r[c];
    }) ? { ...e, ...r } : e;
  if (e.children) {
    let l = null;
    const i = e.children;
    for (let c = 0; c < i.length; c++) {
      const o = i[c], d = Q(o, t, r);
      d !== o && l === null && (l = i.slice(0, c)), l !== null && d !== null && l.push(d);
    }
    return l === null ? e : {
      ...e,
      children: l
    };
  }
  return e;
}, He = (e, t) => {
  if (!e.children)
    return e;
  let r = null;
  const l = e.children;
  for (let i = 0; i < l.length; i++) {
    const c = l[i];
    if (c.id === t) {
      r === null && (r = l.slice(0, i));
      continue;
    }
    const o = He(c, t);
    o !== c && r === null && (r = l.slice(0, i)), r !== null && r.push(o);
  }
  return r === null ? e : {
    ...e,
    children: r
  };
}, pe = (e) => e.map((t) => ({
  ...t,
  flex: t.flex || 1 / e.length
})), ve = (e) => {
  if (e.type === "tabset" && (!e.children || e.children.length === 0))
    return null;
  if (e.children) {
    const t = e.children, r = t.length;
    let l = null;
    for (let o = 0; o < t.length; o++) {
      const d = t[o], f = ve(d);
      f !== d && l === null && (l = t.slice(0, o)), l !== null && f !== null && l.push(f);
    }
    const i = l ?? t, c = i.length < r;
    if (i.length === 0)
      return null;
    if ((e.type === "row" || e.type === "column") && i.length > 0) {
      const o = i.reduce(
        (f, y) => f + (y.flex || 0),
        0
      );
      if (c || o < 0.999 || i.length === 1) {
        let f;
        if (i.length === 1)
          f = i.map((y) => ({
            ...y,
            flex: 1
          }));
        else if (o === 0 || o < 1e-3) {
          const y = 1 / i.length;
          f = i.map((h) => ({
            ...h,
            flex: y
          }));
        } else {
          const y = 1 / o;
          f = i.map((h) => ({
            ...h,
            flex: (h.flex || 0) * y
          }));
        }
        return {
          ...e,
          children: f
        };
      }
      if (i.length !== r || i.some((f, y) => f !== t[y]))
        return {
          ...e,
          children: i
        };
    }
    if (l !== null)
      return {
        ...e,
        children: i
      };
  }
  return e;
}, Ee = (e, t, r = null) => {
  if (!e.children) return null;
  for (const l of e.children) {
    if (l.id === t)
      return r || e;
    if (l.children) {
      const i = Ee(l, t, e);
      if (i) return i;
    }
  }
  return null;
}, We = (e, t) => {
  if (!e.children) return null;
  for (const r of e.children) {
    if (r.type === "tabset" && r.children && r.children.find((i) => i.id === t))
      return r;
    if (r.children) {
      const l = We(r, t);
      if (l) return l;
    }
  }
  return null;
}, _e = (e, t, r) => {
  const l = ne(e, t);
  if (!l || l.type !== "tabset")
    return null;
  const c = [...l.children || [], r], o = {
    ...l,
    children: c,
    selected: c.length - 1
  };
  return Q(e, t, o);
}, et = (e, t) => {
  const r = We(e, t);
  if (!r || r.type !== "tabset")
    return { layout: e, restoreData: null };
  const l = r.children?.find((u) => u.id === t);
  if (!l || l.type !== "tab")
    return { layout: e, restoreData: null };
  const i = r.children?.findIndex(
    (u) => u.id === t
  ), c = r.children?.filter(
    (u) => u.id !== t
  );
  if (!c || c.length === 0) {
    const u = He(e, r.id), R = {
      tabId: l.id,
      component: l.component || "",
      name: l.name || "",
      tabsetId: r.id,
      tabIndex: i !== void 0 ? i : 0,
      config: l.config
    };
    return {
      layout: u,
      restoreData: R
    };
  }
  const o = r.selected ?? 0;
  let d = o;
  i !== void 0 && i !== -1 && (i <= o && (d = Math.max(0, o - 1)), d = Math.min(d, c.length - 1));
  const f = {
    ...r,
    children: c,
    selected: c.length > 0 ? d : void 0
  }, y = Q(e, r.id, f), h = {
    tabId: l.id,
    component: l.component || "",
    name: l.name || "",
    tabsetId: r.id,
    tabIndex: i !== void 0 ? i : 0,
    config: l.config
  };
  return {
    layout: y,
    restoreData: h
  };
}, tt = (e, t, r) => {
  if (ne(e, t.tabId))
    return e;
  let i = ne(e, t.tabsetId);
  if (!i || i.type !== "tabset") {
    if (!r)
      return null;
    const d = Ee(
      r,
      t.tabsetId
    );
    if (!d)
      return null;
    const f = ne(e, d.id);
    if (!f || !f.children)
      return null;
    const y = f.children.find(
      (h) => h.id === t.tabsetId
    );
    if (y)
      i = y;
    else {
      const h = ze(t.tabsetId, []), u = [...f.children, h], R = {
        ...f,
        children: u
      }, m = Q(
        e,
        f.id,
        R
      );
      if (!m || (e = m, i = ne(e, t.tabsetId), !i || i.type !== "tabset"))
        return null;
    }
  }
  const c = qe(
    t.tabId,
    t.component,
    t.name,
    t.config
  );
  return _e(e, t.tabsetId, c);
}, nt = (e, t) => ne(e, t) !== null, Ye = (e, t, r) => {
  const l = g({}), i = g({}), c = g(e), o = g(t);
  A(() => {
    c.current = e;
  }, [e]), A(() => {
    o.current = t;
  }, [t]);
  const d = g(r);
  A(() => {
    d.current = r;
  }, [r]);
  const f = D(
    (h, u, R) => {
      if (!o.current) return;
      const m = c.current, N = (d.current && Ne(d.current, h)) ?? ke(m.layout, h);
      if (!N || !N.children) return;
      const k = N.children.findIndex(
        (v) => v.id === h
      ), I = k + 1;
      if (I >= N.children.length) return;
      const M = `${h}-${R}`;
      if (!l.current[M]) {
        const v = N.children[k], V = N.children[I];
        l.current[M] = {
          current: v.flex || 1,
          sibling: V.flex || 1
        };
      }
      const w = l.current[M], _ = w.current + w.sibling, C = R === "horizontal" ? window.innerWidth : window.innerHeight, H = w.current / _ * C, Y = w.sibling / _ * C, P = 100;
      let T = H + u, b = Y - u;
      if (T < P) {
        const v = P - T;
        T = P, b -= v;
      }
      if (b < P) {
        const v = P - b;
        b = P, T -= v;
      }
      const O = T + b;
      if (O > 0) {
        const v = T / O * _, V = b / O * _, p = i.current[M], B = 1e-4;
        if (p && Math.abs(p.current - v) < B && Math.abs(p.sibling - V) < B)
          return;
        const F = N.children.slice(), X = F[k], ee = F[I];
        F[k] = { ...X, flex: v }, F[I] = { ...ee, flex: V };
        const j = Q(m.layout, N.id, {
          children: F
        });
        j && (i.current[M] = {
          current: v,
          sibling: V
        }, o.current({
          ...m,
          layout: j
        }));
      }
    },
    []
  ), y = D(
    (h, u) => {
      const R = `${h}-${u}`;
      delete l.current[R], delete i.current[R];
    },
    []
  );
  return { handleResize: f, resetResize: y };
}, ke = (e, t) => {
  if (!e.children) return null;
  for (const r of e.children) {
    if (r.id === t)
      return e;
    const l = ke(r, t);
    if (l) return l;
  }
  return null;
}, Ue = (e, t, r, l) => {
  const [i, c] = se(null), [o, d] = se(null), [f, y] = se("center"), [h, u] = se(null), R = g(null), m = g(e), N = g(t), k = g(f), I = g(h), M = g(r), w = g(l);
  A(() => {
    m.current = e;
  }, [e]), A(() => {
    N.current = t;
  }, [t]), A(() => {
    k.current = f;
  }, [f]), A(() => {
    I.current = h;
  }, [h]), A(() => {
    M.current = r;
  }, [r]), A(() => {
    w.current = l;
  }, [l]);
  const _ = D((T, b) => {
    const O = { tabsetId: T, tabIndex: b };
    c(O), R.current = O;
  }, []), C = D(() => {
    c(null), R.current = null, d(null), u(null);
  }, []), H = D(
    (T, b, O = "center", v) => {
      T.preventDefault(), T.dataTransfer.dropEffect = "move", d(b), y(O), v !== void 0 ? u(v) : O !== "tab" && u(null);
    },
    []
  ), Y = D((T) => {
    T.currentTarget === T.target && setTimeout(() => {
      d(null), u(null);
    }, 50);
  }, []), P = D(
    (T, b) => {
      T.preventDefault();
      const O = R.current, v = m.current, V = N.current, p = k.current, B = I.current;
      if (!O || !V)
        return;
      const { tabsetId: F, tabIndex: X } = O;
      if (F === b && p === "tab" && B !== null) {
        const W = (M.current && Re(M.current, F)) ?? ne(v.layout, F);
        if (!W || !W.children)
          return;
        const L = W.children[X];
        if (!L || X === B)
          return;
        const G = [...W.children];
        G.splice(X, 1), G.splice(B, 0, L);
        let E = W.selected ?? 0;
        X < E && B >= E ? E = Math.max(0, E - 1) : X > E && B <= E ? E = Math.min(E + 1, G.length - 1) : X === E && (E = B);
        const n = Q(
          v.layout,
          F,
          {
            children: G,
            selected: E
          }
        );
        n && V({
          ...v,
          layout: n,
          metadata: v.metadata
        }), c(null), d(null), u(null);
        return;
      }
      if (F === b && p !== "tab")
        return;
      const ee = (M.current && Re(M.current, F)) ?? ne(v.layout, F), j = (M.current && Re(M.current, b)) ?? ne(v.layout, b);
      if (!ee || !j || !ee.children || !j.children)
        return;
      const Z = ee.children[X];
      if (!Z)
        return;
      let z = v.layout;
      const re = ee.children.filter(
        (W, L) => L !== X
      ), ue = Q(
        z,
        F,
        {
          children: re,
          selected: Math.min(
            ee.selected || 0,
            re.length - 1
          )
        }
      );
      if (!ue) return;
      if (z = ue, p === "center") {
        const W = Q(
          z,
          b,
          {
            children: [...j.children || [], Z],
            selected: j.children?.length || 0
          }
        );
        if (!W) return;
        z = W;
      } else {
        const W = ze(
          `${b}-split-${Date.now()}`,
          [Z]
        ), L = (w.current && Ne(w.current, b)) ?? $e(z, b);
        if (L) {
          const G = L.children?.findIndex(
            (E) => E.id === b
          ) || 0;
          if (p === "left" || p === "right") {
            const E = Xe(`${b}-row-${Date.now()}`, [
              p === "left" ? W : j,
              p === "left" ? j : W
            ]), n = Q(
              z,
              L.id,
              {
                children: [
                  ...L.children?.slice(0, G) || [],
                  E,
                  ...L.children?.slice(G + 1) || []
                ]
              }
            );
            if (!n) return;
            z = n;
          } else if (p === "top" || p === "bottom") {
            const E = Ke(
              `${b}-column-${Date.now()}`,
              [
                p === "top" ? W : j,
                p === "top" ? j : W
              ]
            ), n = Q(
              z,
              L.id,
              {
                children: [
                  ...L.children?.slice(0, G) || [],
                  E,
                  ...L.children?.slice(G + 1) || []
                ]
              }
            );
            if (!n) return;
            z = n;
          }
        }
      }
      const ce = ve(z);
      ce && V({
        ...v,
        layout: ce,
        metadata: v.metadata
      }), c(null), d(null);
    },
    []
  );
  return {
    draggedTab: i,
    dragOverTabset: o,
    dropPosition: f,
    dropTargetIndex: h,
    handleDragStart: _,
    handleDragEnd: C,
    handleDragOver: H,
    handleDragLeave: Y,
    handleDrop: P
  };
}, Ve = (e) => {
  const t = g(null), r = g(e), l = oe(() => {
    if (t.current === null || r.current !== e || r.current.id !== e.id) {
      const i = je(e);
      return t.current = i, r.current = e, i;
    }
    return t.current;
  }, [e]);
  return A(() => {
    r.current = e;
  }, [e]), l;
}, Ze = Me(
  ({
    model: e,
    factory: t,
    onModelChange: r,
    onAction: l,
    className: i = "",
    style: c = {},
    closeIcon: o,
    closeButtonClassName: d,
    scrollLeftIcon: f,
    scrollRightIcon: y
  }, h) => {
    const [u, R] = se(e), m = r ? e : u, { nodeIndex: N, parentIndex: k } = Ve(m.layout), I = g(N), M = g(k);
    A(() => {
      I.current = N, M.current = k;
    }, [N, k]);
    const w = g(r);
    A(() => {
      w.current = r;
    }, [r]);
    const _ = D((n) => {
      w.current ? w.current(n) : R(n);
    }, []), { handleResize: C, resetResize: H } = Ye(
      m,
      _,
      k
    ), Y = 100, P = g(/* @__PURE__ */ new Map()), T = D(
      (n, a) => {
        const s = `${n}-${a}`, x = P.current;
        if (x.has(s)) {
          const $ = x.get(s);
          return x.delete(s), x.set(s, $), $;
        }
        const q = {
          onResize: ($) => {
            C(n, $, a);
          },
          onResizeStart: () => {
            H(n, a);
          }
        };
        if (x.size >= Y) {
          const $ = x.keys().next().value;
          $ && x.delete($);
        }
        return x.set(s, q), q;
      },
      [C, H]
    ), {
      dragOverTabset: b,
      dropPosition: O,
      dropTargetIndex: v,
      handleDragStart: V,
      handleDragEnd: p,
      handleDragOver: B,
      handleDragLeave: F,
      handleDrop: X
    } = Ue(m, _, N, k), ee = g(u);
    A(() => {
      ee.current = u;
    }, [u]);
    const j = g(e);
    A(() => {
      j.current = e;
    }, [e]);
    const Z = g(l);
    A(() => {
      Z.current = l;
    }, [l]);
    const z = D((n) => {
      const a = (s) => {
        switch (n.type) {
          case "selectTab":
            const { nodeId: x, tabIndex: q } = n.payload, $ = Q(s.layout, x, {
              selected: q
            });
            return !$ || $ === s.layout ? s : {
              ...s,
              layout: $
            };
          case "removeNode":
            const { nodeId: U, tabIndex: we } = n.payload, he = Re(I.current, U) ?? ne(s.layout, U);
            if (he && he.children) {
              const J = he.children.filter(
                (de, ye) => ye !== we
              ), ie = he.selected ?? 0;
              let K = ie;
              we <= ie && (K = Math.max(0, ie - 1)), K = Math.min(K, J.length - 1);
              const te = {
                ...he,
                children: J,
                selected: J.length > 0 ? K : void 0
              }, ge = Q(
                s.layout,
                U,
                te
              );
              if (ge) {
                const de = ve(ge);
                if (de)
                  return {
                    ...s,
                    layout: de
                  };
              }
            }
            return s;
          case "closeTabset":
            const { nodeId: me } = n.payload, le = Q(
              s.layout,
              me,
              null
            );
            if (le) {
              const J = ve(le);
              if (J)
                return {
                  ...s,
                  layout: J
                };
            }
            return s;
          case "changeDirection":
            const { direction: be } = n.payload;
            return {
              ...s,
              global: {
                ...s.global,
                direction: be
              }
            };
          default:
            return s;
        }
      };
      if (w.current) {
        const s = j.current, x = a(s);
        w.current(x);
      } else {
        const s = ee.current, x = a(s);
        R(x);
      }
      Z.current?.(n);
    }, []);
    Be(
      h,
      () => ({
        handleAction: z
      }),
      [z]
    );
    const re = D(
      (n, a) => {
        z({
          type: "selectTab",
          payload: { nodeId: n, tabIndex: a }
        });
      },
      [z]
    ), ue = D(
      (n, a) => {
        z({
          type: "removeNode",
          payload: { nodeId: n, tabIndex: a }
        });
      },
      [z]
    ), ce = m.global?.direction || "ltr", W = m.global?.splitterSize || 8, L = D(
      (n) => {
        switch (n.type) {
          case "tabset":
            return /* @__PURE__ */ S(
              Ie,
              {
                node: n,
                factory: t,
                onTabSelect: re,
                onTabClose: ue,
                onTabDragStart: V,
                onTabDragEnd: p,
                onDragOver: B,
                onDragLeave: F,
                onDrop: X,
                dragOverTabset: b,
                dropPosition: b === n.id ? O : void 0,
                dropTargetIndex: b === n.id ? v : void 0,
                direction: ce,
                closeIcon: o,
                closeButtonClassName: d,
                scrollLeftIcon: f,
                scrollRightIcon: y
              },
              n.id
            );
          case "row":
            const a = n.children || [];
            return /* @__PURE__ */ S(
              "div",
              {
                className: "react-flex-layout-row",
                style: {
                  width: n.width ? `${n.width}%` : void 0,
                  height: n.height ? `${n.height}%` : void 0,
                  flex: `${n.flex || 1} 1 0%`,
                  minWidth: n.minWidth ? `${n.minWidth}px` : void 0,
                  minHeight: n.minHeight ? `${n.minHeight}px` : void 0,
                  maxWidth: n.maxWidth ? `${n.maxWidth}px` : void 0,
                  maxHeight: n.maxHeight ? `${n.maxHeight}px` : void 0
                },
                children: a.map((s, x) => {
                  if (!(x < a.length - 1))
                    return /* @__PURE__ */ S(xe.Fragment, { children: L(s) }, s.id);
                  const $ = T(
                    s.id,
                    "horizontal"
                  );
                  return /* @__PURE__ */ ae(xe.Fragment, { children: [
                    L(s),
                    /* @__PURE__ */ S(
                      Ce,
                      {
                        direction: "horizontal",
                        onResize: $.onResize,
                        onResizeStart: $.onResizeStart,
                        size: W
                      }
                    )
                  ] }, s.id);
                })
              },
              n.id
            );
          case "column":
            return /* @__PURE__ */ S(
              "div",
              {
                className: "react-flex-layout-column",
                style: {
                  width: n.width ? `${n.width}%` : void 0,
                  height: n.height ? `${n.height}%` : void 0,
                  flex: `${n.flex || 1} 1 0%`,
                  minWidth: n.minWidth ? `${n.minWidth}px` : void 0,
                  minHeight: n.minHeight ? `${n.minHeight}px` : void 0,
                  maxWidth: n.maxWidth ? `${n.maxWidth}px` : void 0,
                  maxHeight: n.maxHeight ? `${n.maxHeight}px` : void 0
                },
                children: n.children?.map((s, x) => {
                  const q = x < (n.children?.length || 0) - 1 ? T(s.id, "vertical") : null;
                  return /* @__PURE__ */ ae(xe.Fragment, { children: [
                    L(s),
                    q && /* @__PURE__ */ S(
                      Ce,
                      {
                        direction: "vertical",
                        onResize: q.onResize,
                        onResizeStart: q.onResizeStart,
                        size: W
                      }
                    )
                  ] }, s.id);
                })
              },
              n.id
            );
          case "tab":
            return t(n);
          default:
            return null;
        }
      },
      [
        ce,
        W,
        t,
        re,
        ue,
        C,
        V,
        p,
        B,
        F,
        X,
        b,
        O,
        o,
        d,
        T
      ]
    ), G = oe(
      () => L(m.layout),
      [L, m.layout]
    ), E = {
      ...c,
      height: "100%",
      width: "100%"
    };
    return /* @__PURE__ */ S(
      "div",
      {
        className: `react-flex-layout ${i}`,
        style: E,
        dir: ce,
        children: G
      }
    );
  }
);
Ze.displayName = "Layout";
const Ge = Te(Se, (e, t) => !(e.className !== t.className || e.style !== t.style || e.closeIcon !== t.closeIcon || e.closeButtonClassName !== t.closeButtonClassName || e.index !== t.index || e.onSelect !== t.onSelect || e.onClose !== t.onClose || e.onDragStart !== t.onDragStart || e.onDragEnd !== t.onDragEnd || e.node.id !== t.node.id || e.node.name !== t.node.name));
Ge.displayName = "MemoizedTab";
export {
  Fe as DefaultCloseIcon,
  Ze as Layout,
  Ge as MemoizedTab,
  Ie as MemoizedTabSet,
  De as ScrollLeftIcon,
  Le as ScrollRightIcon,
  Ce as Splitter,
  Se as Tab,
  Ae as TabSet,
  _e as addTabToTabset,
  pe as calculateFlexValues,
  Ke as createColumn,
  Pe as createLayoutModel,
  Xe as createRow,
  qe as createTab,
  ze as createTabSet,
  ne as findNodeById,
  ve as removeEmptyTabsets,
  He as removeNodeById,
  et as removeTab,
  tt as restoreTab,
  nt as tabExists,
  Q as updateNodeById
};
