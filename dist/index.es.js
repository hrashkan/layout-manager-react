import { jsxs as me, jsx as N } from "react/jsx-runtime";
import Ce, { useRef as m, useCallback as w, useEffect as I, useMemo as ce, useState as se, memo as pe, forwardRef as Ue, useImperativeHandle as Ye } from "react";
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
  style: o = {},
  closeIcon: f,
  closeButtonClassName: y = ""
}) => {
  const b = m(!1), h = w(() => {
    r?.(e.id);
  }, [e.id, r]), x = w(
    (T) => {
      T.stopPropagation(), n?.(e.id);
    },
    [e.id, n]
  ), v = w(
    (T) => {
      T.dataTransfer.setData("text/plain", e.id), T.dataTransfer.effectAllowed = "move", T.currentTarget.classList.add("dragging"), document.body.classList.add("dragging"), b.current = !0, l?.(e.id, t);
    },
    [e.id, t, l]
  ), L = w(
    (T) => {
      T.currentTarget.classList.remove("dragging"), document.body.classList.remove("dragging"), b.current = !1, s?.();
    },
    [s]
  );
  I(() => () => {
    b.current && (document.body.classList.remove("dragging"), b.current = !1);
  }, []);
  const W = ce(() => ({ ...o, cursor: "grab" }), [o]);
  return /* @__PURE__ */ me(
    "div",
    {
      className: `react-flex-layout-tab ${i}`,
      style: W,
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
            onClick: x,
            type: "button",
            "aria-label": "Close tab",
            children: f || /* @__PURE__ */ N(Ge, {})
          }
        )
      ]
    }
  );
}, ke = (e) => /* @__PURE__ */ N(
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
ke.displayName = "ScrollLeftIcon";
const We = (e) => /* @__PURE__ */ N(
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
We.displayName = "ScrollRightIcon";
const Ve = ({
  node: e,
  children: t,
  factory: n,
  onTabSelect: r,
  onTabClose: l,
  onTabDragStart: s,
  onTabDragEnd: i,
  onDragOver: o,
  onDragLeave: f,
  onDrop: y,
  dragOverTabset: b,
  dropPosition: h,
  dropTargetIndex: x,
  direction: v = "ltr",
  className: L = "",
  style: W = {},
  closeIcon: T,
  closeButtonClassName: E,
  scrollLeftIcon: z,
  scrollRightIcon: O
}) => {
  const D = ce(() => e.children?.filter((c) => c.type === "tab") || [], [e.children]), $ = ce(() => {
    const c = /* @__PURE__ */ new Map();
    for (let u = 0; u < D.length; u++) {
      const K = D[u];
      K && K.id && c.set(K.id, u);
    }
    return c;
  }, [D]), _ = ce(() => v === "rtl" ? [...D].reverse() : D, [D, v]), S = e.selected ?? 0, g = Math.min(
    S,
    Math.max(0, D.length - 1)
  ), R = D[g], q = w(
    (c) => {
      const u = $.get(c);
      u !== void 0 && u !== -1 && r?.(e.id, u);
    },
    [e.id, $, r]
  ), C = w(
    (c) => {
      const u = $.get(c);
      u !== void 0 && u !== -1 && l?.(e.id, u);
    },
    [e.id, $, l]
  ), P = w(
    (c, u) => {
      const K = u !== void 0 ? u : $.get(c) ?? -1;
      K !== -1 && s?.(e.id, K);
    },
    [e.id, $, s]
  ), F = m(null), J = m(null), [U, G] = se(!1), [ee, V] = se(!1), ae = m(null), Y = m();
  Y.current = () => {
    const c = J.current;
    if (!c) {
      G(!1), V(!1);
      return;
    }
    const { scrollLeft: u, scrollWidth: K, clientWidth: re } = c;
    G(u > 1), V(u < K - re - 1);
  };
  const he = w(() => {
    ae.current && clearTimeout(ae.current), ae.current = setTimeout(() => {
      Y.current?.();
    }, 10);
  }, []), ye = w(
    (c) => {
      c.preventDefault(), c.dataTransfer.dropEffect = "move";
      const u = c.currentTarget.getBoundingClientRect(), K = c.clientX - u.left, re = c.clientY - u.top, ne = u.width, ue = u.height;
      let Z = "center";
      if (re < 40) {
        const a = F.current;
        if (a) {
          const k = a.getBoundingClientRect(), A = c.clientX - k.left, p = a.querySelectorAll(
            ".react-flex-layout-tab"
          );
          let d = D.length;
          if (v === "rtl") {
            for (let H = p.length - 1; H >= 0; H--) {
              const le = p[H].getBoundingClientRect(), de = le.left - k.left, fe = le.right - k.left, ge = (de + fe) / 2;
              if (A > ge) {
                const X = $.get(_[H].id);
                X !== void 0 && X !== -1 && (d = X);
                break;
              }
            }
            if (d === D.length && p.length > 0) {
              const H = p[0].getBoundingClientRect();
              if (A > H.right - k.left) {
                const le = $.get(_[0].id);
                le !== void 0 && le !== -1 && (d = le);
              }
            }
          } else
            for (let H = 0; H < p.length; H++) {
              const le = p[H].getBoundingClientRect(), de = le.left - k.left, fe = le.right - k.left, ge = (de + fe) / 2;
              if (A < ge) {
                const X = $.get(_[H].id);
                X !== void 0 && X !== -1 && (d = X);
                break;
              }
            }
          Z = "tab", o?.(c, e.id, Z, d);
          return;
        }
      }
      K < ne * 0.25 ? Z = v === "rtl" ? "right" : "left" : K > ne * 0.75 ? Z = v === "rtl" ? "left" : "right" : re < ue * 0.25 ? Z = "top" : re > ue * 0.75 ? Z = "bottom" : Z = "center", o?.(c, e.id, Z);
    },
    [e.id, v, D.length, _, $, o]
  ), Se = w(
    (c) => {
      f?.(c);
    },
    [f]
  ), j = w(
    (c) => {
      y?.(c, e.id);
    },
    [e.id, y]
  ), M = b === e.id;
  I(() => {
    const c = J.current;
    if (!c || g < 0) return;
    let u;
    return u = requestAnimationFrame(() => {
      const re = c.children[g];
      if (!re) return;
      const ne = c.getBoundingClientRect(), ue = re.getBoundingClientRect(), Z = c.scrollLeft;
      ue.left < ne.left ? c.scrollTo({
        left: Z - (ne.left - ue.left) - 10,
        behavior: "smooth"
      }) : ue.right > ne.right && c.scrollTo({
        left: Z + (ue.right - ne.right) + 10,
        behavior: "smooth"
      });
    }), () => {
      u && cancelAnimationFrame(u);
    };
  }, [g, _.length]), I(() => {
    const c = J.current;
    if (!c) return;
    const u = { current: 0 };
    u.current = requestAnimationFrame(() => {
      Y.current?.();
    }), c.addEventListener("scroll", he, { passive: !0 });
    const K = new ResizeObserver(() => {
      u.current && cancelAnimationFrame(u.current), u.current = requestAnimationFrame(() => {
        Y.current?.();
      });
    });
    return K.observe(c), () => {
      u.current && cancelAnimationFrame(u.current), c.removeEventListener("scroll", he), K.disconnect(), ae.current && (clearTimeout(ae.current), ae.current = null);
    };
  }, [he, _.length]);
  const te = {
    ...W,
    width: e.width ? `${e.width}%` : void 0,
    height: e.height ? `${e.height}%` : void 0,
    flex: `${e.flex || 1} 1 0%`,
    minWidth: e.minWidth ? `${e.minWidth}px` : void 0,
    minHeight: e.minHeight ? `${e.minHeight}px` : void 0,
    maxWidth: e.maxWidth ? `${e.maxWidth}px` : void 0,
    maxHeight: e.maxHeight ? `${e.maxHeight}px` : void 0
  };
  if (D.length === 0)
    return null;
  const B = M && h ? v === "rtl" && (h === "left" || h === "right") ? h === "left" ? "right" : "left" : h : void 0;
  return /* @__PURE__ */ me(
    "div",
    {
      className: `react-flex-layout-tabset ${M ? "drag-over" : ""} ${L}`,
      style: te,
      "data-tabset-id": e.id,
      "data-drop-position": B,
      onDragOver: ye,
      onDragLeave: Se,
      onDrop: j,
      children: [
        /* @__PURE__ */ me("div", { className: "react-flex-layout-tabset-header", ref: F, children: [
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
              children: z || /* @__PURE__ */ N(ke, {})
            }
          ),
          /* @__PURE__ */ me(
            "div",
            {
              ref: J,
              className: "react-flex-layout-tabset-tabs-container",
              onScroll: he,
              children: [
                _.map((c) => {
                  const u = $.get(c.id) ?? -1, K = u === g, re = M && h === "tab" && x !== null && u === x;
                  return /* @__PURE__ */ me(Ce.Fragment, { children: [
                    re && /* @__PURE__ */ N("div", { className: "react-flex-layout-tab-drop-indicator" }),
                    /* @__PURE__ */ N(
                      Ae,
                      {
                        node: c,
                        index: u,
                        onSelect: q,
                        onClose: C,
                        onDragStart: P,
                        onDragEnd: i,
                        className: K ? "active" : "",
                        closeIcon: T,
                        closeButtonClassName: E
                      }
                    )
                  ] }, c.id);
                }),
                M && h === "tab" && x !== null && x === D.length && /* @__PURE__ */ N("div", { className: "react-flex-layout-tab-drop-indicator" })
              ]
            }
          ),
          ee && /* @__PURE__ */ N(
            "button",
            {
              className: "react-flex-layout-tabset-scroll-button react-flex-layout-tabset-scroll-right",
              onClick: () => {
                const c = J.current;
                c && c.scrollBy({ left: 200, behavior: "smooth" });
              },
              type: "button",
              "aria-label": "Scroll right",
              children: O || /* @__PURE__ */ N(We, {})
            }
          )
        ] }),
        /* @__PURE__ */ N("div", { className: "react-flex-layout-tabset-content", children: R && (n ? n(R) : t) })
      ]
    }
  );
}, Oe = pe(
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
Oe.displayName = "MemoizedTabSet";
const Ze = ({
  direction: e,
  onResize: t,
  onResizeStart: n,
  size: r = 8,
  className: l = "",
  style: s = {},
  customStyles: i = {}
}) => {
  const [o, f] = se(!1), y = m(0), b = m(0), h = m(!1), x = m(null), v = m(null), L = w(
    (z) => {
      z.preventDefault(), z.stopPropagation(), f(!0), y.current = e === "horizontal" ? z.clientX : z.clientY, b.current = y.current, n?.();
      const O = ($) => {
        b.current = e === "horizontal" ? $.clientX : $.clientY, h.current || (h.current = !0, requestAnimationFrame(() => {
          h.current = !1;
          const _ = b.current - y.current;
          t(_);
        }));
      }, D = () => {
        f(!1), document.removeEventListener("mousemove", O), document.removeEventListener("mouseup", D), x.current = null, v.current = null, h.current = !1;
      };
      document.addEventListener("mousemove", O), document.addEventListener("mouseup", D), x.current = O, v.current = D;
    },
    [e, t, n]
  ), W = {
    backgroundColor: "#ffffff",
    border: "none",
    outline: "none"
  }, T = ce(() => o && i.active ? i.active : i.default ? i.default : W, [o, i.active, i.default]), E = ce(() => {
    const z = e === "horizontal";
    return {
      ...s,
      width: z ? `${r}px` : "100%",
      height: z ? "100%" : `${r}px`,
      minWidth: z ? `${r}px` : void 0,
      minHeight: z ? void 0 : `${r}px`,
      flexShrink: 0,
      cursor: z ? "col-resize" : "row-resize",
      ...T,
      transition: o ? "none" : "all 0.2s ease"
    };
  }, [e, r, s, T, o]);
  return I(() => () => {
    x.current && document.removeEventListener("mousemove", x.current), v.current && document.removeEventListener("mouseup", v.current), h.current = !1;
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
}, De = (e, t) => e.get(t) ?? null, Be = (e, t) => e.get(t) ?? null, ht = (e, t) => ({
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
}), Fe = (e, t, n = 0) => ({
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
}), oe = (e, t) => {
  if (e.id === t)
    return e;
  if (e.children)
    for (const n of e.children) {
      const r = oe(n, t);
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
}, Q = (e, t, n) => {
  if (e.id === t)
    return n === null ? null : Object.keys(n).some((l) => {
      const s = l;
      return e[s] !== n[s];
    }) ? { ...e, ...n } : e;
  if (e.children) {
    let r = null;
    const l = e.children;
    for (let s = 0; s < l.length; s++) {
      const i = l[s], o = Q(i, t, n);
      o !== i && r === null && (r = l.slice(0, s)), r !== null && o !== null && r.push(o);
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
      const o = t[i], f = Te(o);
      f !== o && r === null && (r = t.slice(0, i)), r !== null && f !== null && r.push(f);
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
  const r = oe(e, t);
  if (!r || r.type !== "tabset")
    return null;
  const s = [...r.children || [], n], i = {
    ...r,
    children: s,
    selected: s.length - 1
  };
  return Q(e, t, i);
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
    const h = Ke(e, n.id), x = {
      tabId: r.id,
      component: r.component || "",
      name: r.name || "",
      tabsetId: n.id,
      tabIndex: l !== void 0 ? l : 0,
      config: r.config
    };
    return {
      layout: h,
      restoreData: x
    };
  }
  const i = n.selected ?? 0;
  let o = i;
  l !== void 0 && l !== -1 && (l <= i && (o = Math.max(0, i - 1)), o = Math.min(o, s.length - 1));
  const f = {
    ...n,
    children: s,
    selected: s.length > 0 ? o : void 0
  }, y = Q(e, n.id, f), b = {
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
  if (oe(e, t.tabId))
    return e;
  let l = oe(e, t.tabsetId);
  if (!l || l.type !== "tabset") {
    if (!n)
      return null;
    const o = je(
      n,
      t.tabsetId
    );
    if (!o)
      return null;
    const f = oe(e, o.id);
    if (!f || !f.children)
      return null;
    const y = f.children.find(
      (b) => b.id === t.tabsetId
    );
    if (y)
      l = y;
    else {
      const b = Fe(t.tabsetId, []), h = [...f.children, b], x = {
        ...f,
        children: h
      }, v = Q(
        e,
        f.id,
        x
      );
      if (!v || (e = v, l = oe(e, t.tabsetId), !l || l.type !== "tabset"))
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
}, mt = (e, t) => oe(e, t) !== null, rt = (e, t, n) => {
  const r = m({}), l = m({}), s = m(e), i = m(t);
  I(() => {
    s.current = e;
  }, [e]), I(() => {
    i.current = t;
  }, [t]);
  const o = m(n);
  I(() => {
    o.current = n;
  }, [n]);
  const f = w(
    (b, h, x) => {
      if (!i.current) return;
      const v = s.current, L = (o.current && Be(o.current, b)) ?? qe(v.layout, b);
      if (!L || !L.children) return;
      const W = L.children.findIndex(
        (C) => C.id === b
      ), T = W + 1;
      if (T >= L.children.length) return;
      const E = `${b}-${x}`;
      if (!r.current[E]) {
        const C = L.children[W], P = L.children[T];
        r.current[E] = {
          current: C.flex || 1,
          sibling: P.flex || 1
        };
      }
      const z = r.current[E], O = z.current + z.sibling, D = x === "horizontal" ? window.innerWidth : window.innerHeight, $ = z.current / O * D, _ = z.sibling / O * D, S = 100;
      let g = $ + h, R = _ - h;
      if (g < S) {
        const C = S - g;
        g = S, R -= C;
      }
      if (R < S) {
        const C = S - R;
        R = S, g -= C;
      }
      const q = g + R;
      if (q > 0) {
        const C = g / q * O, P = R / q * O, F = l.current[E], J = 1e-4;
        if (F && Math.abs(F.current - C) < J && Math.abs(F.sibling - P) < J)
          return;
        const U = L.children.slice(), G = U[W], ee = U[T];
        U[W] = { ...G, flex: C }, U[T] = { ...ee, flex: P };
        const V = Q(v.layout, L.id, {
          children: U
        });
        V && (l.current[E] = {
          current: C,
          sibling: P
        }, i.current({
          ...v,
          layout: V
        }));
      }
    },
    []
  ), y = w(
    (b, h) => {
      const x = `${b}-${h}`;
      delete r.current[x], delete l.current[x];
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
  const [l, s] = se(null), [i, o] = se(null), [f, y] = se("center"), [b, h] = se(null), x = m(null), v = m(e), L = m(t), W = m(f), T = m(b), E = m(n), z = m(r);
  I(() => {
    v.current = e;
  }, [e]), I(() => {
    L.current = t;
  }, [t]), I(() => {
    W.current = f;
  }, [f]), I(() => {
    T.current = b;
  }, [b]), I(() => {
    E.current = n;
  }, [n]), I(() => {
    z.current = r;
  }, [r]);
  const O = w((g, R) => {
    const q = { tabsetId: g, tabIndex: R };
    s(q), x.current = q;
  }, []), D = w(() => {
    s(null), x.current = null, o(null), h(null);
  }, []), $ = w(
    (g, R, q = "center", C) => {
      g.preventDefault(), g.dataTransfer.dropEffect = "move", o(R), y(q), C !== void 0 ? h(C) : q !== "tab" && h(null);
    },
    []
  ), _ = w((g) => {
    g.currentTarget === g.target && setTimeout(() => {
      o(null), h(null);
    }, 50);
  }, []), S = w(
    (g, R) => {
      g.preventDefault();
      const q = x.current, C = v.current, P = L.current, F = W.current, J = T.current;
      if (!q || !P)
        return;
      const { tabsetId: U, tabIndex: G } = q;
      if (U === R && F === "tab" && J !== null) {
        const j = (E.current && De(E.current, U)) ?? oe(C.layout, U);
        if (!j || !j.children)
          return;
        const M = j.children[G];
        if (!M || G === J)
          return;
        const te = [...j.children];
        te.splice(G, 1), te.splice(J, 0, M);
        let B = j.selected ?? 0;
        G < B && J >= B ? B = Math.max(0, B - 1) : G > B && J <= B ? B = Math.min(B + 1, te.length - 1) : G === B && (B = J);
        const c = Q(
          C.layout,
          U,
          {
            children: te,
            selected: B
          }
        );
        c && P({
          ...C,
          layout: c,
          metadata: C.metadata
        }), s(null), o(null), h(null);
        return;
      }
      if (U === R && F !== "tab")
        return;
      const ee = (E.current && De(E.current, U)) ?? oe(C.layout, U), V = (E.current && De(E.current, R)) ?? oe(C.layout, R);
      if (!ee || !V || !ee.children || !V.children)
        return;
      const ae = ee.children[G];
      if (!ae)
        return;
      let Y = C.layout;
      const he = ee.children.filter(
        (j, M) => M !== G
      ), ye = Q(
        Y,
        U,
        {
          children: he,
          selected: Math.min(
            ee.selected || 0,
            he.length - 1
          )
        }
      );
      if (!ye) return;
      if (Y = ye, F === "center") {
        const j = Q(
          Y,
          R,
          {
            children: [...V.children || [], ae],
            selected: V.children?.length || 0
          }
        );
        if (!j) return;
        Y = j;
      } else {
        const j = Fe(
          `${R}-split-${Date.now()}`,
          [ae]
        ), M = (z.current && Be(z.current, R)) ?? Me(Y, R);
        if (M) {
          const te = M.children?.findIndex(
            (B) => B.id === R
          ) || 0;
          if (F === "left" || F === "right") {
            const B = et(`${R}-row-${Date.now()}`, [
              F === "left" ? j : V,
              F === "left" ? V : j
            ]), c = Q(
              Y,
              M.id,
              {
                children: [
                  ...M.children?.slice(0, te) || [],
                  B,
                  ...M.children?.slice(te + 1) || []
                ]
              }
            );
            if (!c) return;
            Y = c;
          } else if (F === "top" || F === "bottom") {
            const B = tt(
              `${R}-column-${Date.now()}`,
              [
                F === "top" ? j : V,
                F === "top" ? V : j
              ]
            ), c = Q(
              Y,
              M.id,
              {
                children: [
                  ...M.children?.slice(0, te) || [],
                  B,
                  ...M.children?.slice(te + 1) || []
                ]
              }
            );
            if (!c) return;
            Y = c;
          }
        }
      }
      const Se = Te(Y);
      Se && P({
        ...C,
        layout: Se,
        metadata: C.metadata
      }), s(null), o(null);
    },
    []
  );
  return {
    draggedTab: l,
    dragOverTabset: i,
    dropPosition: f,
    dropTargetIndex: b,
    handleDragStart: O,
    handleDragEnd: D,
    handleDragOver: $,
    handleDragLeave: _,
    handleDrop: S
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
  const { onLoad: n, onSave: r, onError: l, ...s } = t, i = m(null), [o, f] = se(e), [y, b] = se(!1), [h, x] = se(!1);
  I(() => {
    if (i.current)
      try {
        i.current.cancel?.();
      } catch {
      }
    i.current = new Je(s), x(!0);
  }, [s.key, s.autoSave, s.debounceMs]), I(() => {
    if (!i.current || y) return;
    const S = i.current.load();
    S ? (f(S), b(!0), n?.(S)) : b(!0);
  }, [y, n]);
  const v = m(), L = ce(
    () => JSON.stringify(o.layout),
    [o.layout]
  ), W = ce(
    () => JSON.stringify(e.layout),
    [e.layout]
  ), T = ce(
    () => o.metadata ? JSON.stringify(o.metadata) : void 0,
    [o.metadata]
  ), E = ce(
    () => e.metadata ? JSON.stringify(e.metadata) : void 0,
    [e.metadata]
  );
  I(() => {
    if (!(!y || !i.current)) {
      if (v.current !== W && L !== W) {
        const S = { ...e };
        e.global && (S.global = { ...e.global }), f(S), v.current = W, i.current.isAutoSaveEnabled() ? i.current.debouncedSave(S) : i.current.save(S);
        return;
      }
      e.metadata && T !== E && f((S) => ({
        ...S,
        metadata: e.metadata
      }));
    }
  }, [
    y,
    i,
    e,
    L,
    W,
    T,
    E
  ]);
  const z = w(
    (S) => {
      if (i.current)
        try {
          i.current.isAutoSaveEnabled() ? i.current.debouncedSave(S) : i.current.save(S), r?.(S);
        } catch (g) {
          l?.(g);
        }
    },
    [r, l]
  ), O = w(
    (S) => {
      const g = { ...S };
      S.global && (g.global = { ...S.global }), f(g), z(g);
    },
    [z]
  ), D = w(() => {
    if (i.current)
      try {
        i.current.clear();
      } catch (S) {
        l?.(S);
      }
  }, [l]), $ = w(() => i.current?.exists() ?? !1, []), _ = w(() => i.current?.getStorageKey() ?? "", []);
  return {
    model: o,
    updateModel: O,
    clearStorage: D,
    hasStoredData: $,
    getStorageKey: _,
    isLoaded: y,
    hasStorage: h
  };
}, st = (e) => {
  const t = m(null), n = m(e), r = ce(() => {
    if (t.current === null || n.current !== e || n.current.id !== e.id) {
      const l = Qe(e);
      return t.current = l, n.current = e, l;
    }
    return t.current;
  }, [e]);
  return I(() => {
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
    closeIcon: o,
    closeButtonClassName: f,
    scrollLeftIcon: y,
    scrollRightIcon: b
  }, h) => {
    const [x, v] = se(e), [L, W] = se(
      null
    ), {
      model: T,
      updateModel: E,
      isLoaded: z
    } = ct(e, {
      key: i?.key,
      autoSave: i?.autoSave,
      debounceMs: i?.debounceMs,
      onLoad: (a) => {
        n ? n(a) : v(a);
      }
    }), O = i?.enabled ? T : n ? e : x, { nodeIndex: D, parentIndex: $ } = st(O.layout), _ = m(D), S = m($);
    I(() => {
      _.current = D, S.current = $;
    }, [D, $]);
    const g = m(n), R = m(i), q = m(E);
    I(() => {
      g.current = n;
    }, [n]), I(() => {
      R.current = i;
    }, [i]), I(() => {
      q.current = E;
    }, [E]);
    const C = w((a) => {
      R.current?.enabled ? (q.current(a), g.current && g.current(a)) : g.current ? g.current(a) : v(a);
    }, []), { handleResize: P, resetResize: F } = rt(
      O,
      C,
      $
    ), J = 100, U = m(/* @__PURE__ */ new Map()), G = w(
      (a, k) => {
        const A = `${a}-${k}`, p = U.current;
        if (p.has(A)) {
          const H = p.get(A);
          return p.delete(A), p.set(A, H), H;
        }
        const d = {
          onResize: (H) => {
            P(a, H, k);
          },
          onResizeStart: () => {
            F(a, k);
          }
        };
        if (p.size >= J) {
          const H = p.keys().next().value;
          H && p.delete(H);
        }
        return p.set(A, d), d;
      },
      [P, F]
    ), {
      dragOverTabset: ee,
      dropPosition: V,
      dropTargetIndex: ae,
      handleDragStart: Y,
      handleDragEnd: he,
      handleDragOver: ye,
      handleDragLeave: Se,
      handleDrop: j
    } = lt(O, C, D, $), M = m(T);
    I(() => {
      M.current = T;
    }, [T]);
    const te = m(x);
    I(() => {
      te.current = x;
    }, [x]);
    const B = m(e);
    I(() => {
      B.current = e;
    }, [e]);
    const c = m(r);
    I(() => {
      c.current = r;
    }, [r]);
    const u = w((a) => {
      if (R.current?.enabled) {
        const k = M.current;
        if (a.type === "changeDirection") {
          const { direction: d } = a.payload;
          W(d);
        }
        const p = ((d) => {
          switch (a.type) {
            case "selectTab":
              const { nodeId: H, tabIndex: le } = a.payload, de = Q(d.layout, H, {
                selected: le
              });
              return !de || de === d.layout ? d : {
                ...d,
                layout: de
              };
            case "removeNode":
              const { nodeId: fe, tabIndex: ge } = a.payload, X = De(_.current, fe) ?? oe(d.layout, fe);
              if (X && X.children) {
                const ie = X.children.filter(
                  (ve, $e) => $e !== ge
                ), xe = X.selected ?? 0;
                let be = xe;
                ge <= xe && (be = Math.max(0, xe - 1)), be = Math.min(be, ie.length - 1);
                const ze = {
                  ...X,
                  children: ie,
                  selected: ie.length > 0 ? be : void 0
                }, we = Q(
                  d.layout,
                  fe,
                  ze
                );
                if (we) {
                  const ve = Te(we);
                  if (ve)
                    return {
                      ...d,
                      layout: ve
                    };
                }
              }
              return d;
            case "closeTabset":
              const { nodeId: Ie } = a.payload, Re = Q(
                d.layout,
                Ie,
                null
              );
              if (Re) {
                const ie = Te(Re);
                if (ie)
                  return {
                    ...d,
                    layout: ie
                  };
              }
              return d;
            case "changeDirection":
              const { direction: Ne } = a.payload;
              return {
                ...d,
                global: {
                  ...d.global,
                  direction: Ne
                }
              };
            default:
              return d;
          }
        })(k);
        q.current(p), g.current && g.current(p), c.current?.(a);
      } else {
        if (a.type === "changeDirection" && g.current) {
          const { direction: k } = a.payload, A = B.current, p = {
            ...A,
            global: {
              ...A.global,
              direction: k
            }
          };
          g.current(p);
        }
        c.current?.(a);
      }
      if (!R.current?.enabled && !g.current) {
        const k = te.current, p = ((d) => {
          switch (a.type) {
            case "selectTab":
              const { nodeId: H, tabIndex: le } = a.payload, de = Q(d.layout, H, {
                selected: le
              });
              return !de || de === d.layout ? d : {
                ...d,
                layout: de
              };
            case "removeNode":
              const { nodeId: fe, tabIndex: ge } = a.payload, X = De(_.current, fe) ?? oe(d.layout, fe);
              if (X && X.children) {
                const ie = X.children.filter(
                  (ve, $e) => $e !== ge
                ), xe = X.selected ?? 0;
                let be = xe;
                ge <= xe && (be = Math.max(0, xe - 1)), be = Math.min(be, ie.length - 1);
                const ze = {
                  ...X,
                  children: ie,
                  selected: ie.length > 0 ? be : void 0
                }, we = Q(
                  d.layout,
                  fe,
                  ze
                );
                if (we) {
                  const ve = Te(we);
                  if (ve)
                    return {
                      ...d,
                      layout: ve
                    };
                }
              }
              return d;
            case "closeTabset":
              const { nodeId: Ie } = a.payload, Re = Q(
                d.layout,
                Ie,
                null
              );
              if (Re) {
                const ie = Te(Re);
                if (ie)
                  return {
                    ...d,
                    layout: ie
                  };
              }
              return d;
            case "changeDirection":
              const { direction: Ne } = a.payload;
              return {
                ...d,
                global: {
                  ...d.global,
                  direction: Ne
                }
              };
            default:
              return d;
          }
        })(k);
        v(p);
      }
    }, []);
    Ye(
      h,
      () => ({
        handleAction: u
      }),
      [u]
    );
    const K = w(
      (a, k) => {
        u({
          type: "selectTab",
          payload: { nodeId: a, tabIndex: k }
        });
      },
      [u]
    ), re = w(
      (a, k) => {
        u({
          type: "removeNode",
          payload: { nodeId: a, tabIndex: k }
        });
      },
      [u]
    );
    let ne;
    i?.enabled ? L !== null ? ne = L : ne = T?.global?.direction || "ltr" : ne = O.global?.direction || "ltr";
    const ue = O.global?.splitterSize || 8, Z = w(
      (a) => {
        switch (a.type) {
          case "tabset":
            return /* @__PURE__ */ N(
              Oe,
              {
                node: a,
                factory: t,
                onTabSelect: K,
                onTabClose: re,
                onTabDragStart: Y,
                onTabDragEnd: he,
                onDragOver: ye,
                onDragLeave: Se,
                onDrop: j,
                dragOverTabset: ee,
                dropPosition: ee === a.id ? V : void 0,
                dropTargetIndex: ee === a.id ? ae : void 0,
                direction: ne,
                closeIcon: o,
                closeButtonClassName: f,
                scrollLeftIcon: y,
                scrollRightIcon: b
              },
              a.id
            );
          case "row":
            const k = a.children || [];
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
                children: k.map((A, p) => {
                  if (!(p < k.length - 1))
                    return /* @__PURE__ */ N(Ce.Fragment, { children: Z(A) }, A.id);
                  const H = G(
                    A.id,
                    "horizontal"
                  );
                  return /* @__PURE__ */ me(Ce.Fragment, { children: [
                    Z(A),
                    /* @__PURE__ */ N(
                      Ee,
                      {
                        direction: "horizontal",
                        onResize: H.onResize,
                        onResizeStart: H.onResizeStart,
                        size: ue
                      }
                    )
                  ] }, A.id);
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
                children: a.children?.map((A, p) => {
                  const d = p < (a.children?.length || 0) - 1 ? G(A.id, "vertical") : null;
                  return /* @__PURE__ */ me(Ce.Fragment, { children: [
                    Z(A),
                    d && /* @__PURE__ */ N(
                      Ee,
                      {
                        direction: "vertical",
                        onResize: d.onResize,
                        onResizeStart: d.onResizeStart,
                        size: ue
                      }
                    )
                  ] }, A.id);
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
        ue,
        t,
        K,
        re,
        P,
        Y,
        he,
        ye,
        Se,
        j,
        ee,
        V,
        o,
        f,
        G
      ]
    );
    I(() => {
      !i?.enabled && L !== null && W(null);
    }, [i?.enabled, L]), I(() => {
      i?.enabled && L !== null && (T?.global?.direction || "ltr") === L && W(null);
    }, [i?.enabled, L, T?.global?.direction]);
    const He = ce(
      () => Z(O.layout),
      [Z, O.layout]
    ), Le = {
      ...s,
      height: "100%",
      width: "100%"
    };
    return i?.enabled && !z ? /* @__PURE__ */ N(
      "div",
      {
        className: `react-flex-layout ${l}`,
        style: {
          ...Le,
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
        style: Le,
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
  Oe as MemoizedTabSet,
  ke as ScrollLeftIcon,
  We as ScrollRightIcon,
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
  Fe as createTabSet,
  oe as findNodeById,
  at as isLocalStorageAvailable,
  Te as removeEmptyTabsets,
  Ke as removeNodeById,
  gt as removeTab,
  bt as restoreTab,
  mt as tabExists,
  Q as updateNodeById,
  ct as useLayoutStorage
};
