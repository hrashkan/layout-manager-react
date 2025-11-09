import { jsxs as be, jsx as w } from "react/jsx-runtime";
import Te, { useRef as I, useCallback as T, useEffect as W, useMemo as ue, useState as ce, memo as Ce, forwardRef as ke, useImperativeHandle as Ae } from "react";
const Be = ({
  size: e = 16,
  color: t = "#666",
  className: n = ""
}) => /* @__PURE__ */ be(
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
      /* @__PURE__ */ w("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ w("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
), Re = ({
  node: e,
  index: t,
  onClose: n,
  onSelect: r,
  onDragStart: a,
  onDragEnd: c,
  className: i = "",
  style: f = {},
  closeIcon: o,
  closeButtonClassName: d = ""
}) => {
  const y = I(!1), x = T(() => {
    r?.(e.id);
  }, [e.id, r]), S = T(
    (L) => {
      L.stopPropagation(), n?.(e.id);
    },
    [e.id, n]
  ), D = T(
    (L) => {
      L.dataTransfer.setData("text/plain", e.id), L.dataTransfer.effectAllowed = "move", L.currentTarget.classList.add("dragging"), document.body.classList.add("dragging"), y.current = !0, a?.(e.id, t);
    },
    [e.id, t, a]
  ), p = T(
    (L) => {
      L.currentTarget.classList.remove("dragging"), document.body.classList.remove("dragging"), y.current = !1, c?.();
    },
    [c]
  );
  W(() => () => {
    y.current && (document.body.classList.remove("dragging"), y.current = !1);
  }, []);
  const k = ue(() => ({ ...f, cursor: "grab" }), [f]);
  return /* @__PURE__ */ be(
    "div",
    {
      className: `react-flex-layout-tab ${i}`,
      style: k,
      onClick: x,
      draggable: !0,
      onDragStart: D,
      onDragEnd: p,
      children: [
        /* @__PURE__ */ w("span", { className: "react-flex-layout-tab-title", children: e.name || "Untitled" }),
        /* @__PURE__ */ w(
          "button",
          {
            className: `react-flex-layout-tab-close ${d}`.trim(),
            onClick: S,
            type: "button",
            "aria-label": "Close tab",
            children: o || /* @__PURE__ */ w(Be, {})
          }
        )
      ]
    }
  );
}, Fe = () => /* @__PURE__ */ w(
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
    children: /* @__PURE__ */ w("polyline", { points: "15 18 9 12 15 6" })
  }
), Ke = () => /* @__PURE__ */ w(
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
    children: /* @__PURE__ */ w("polyline", { points: "9 18 15 12 9 6" })
  }
), Me = ({
  node: e,
  children: t,
  factory: n,
  onTabSelect: r,
  onTabClose: a,
  onTabDragStart: c,
  onTabDragEnd: i,
  onDragOver: f,
  onDragLeave: o,
  onDrop: d,
  dragOverTabset: y,
  dropPosition: x,
  dropTargetIndex: S,
  direction: D = "ltr",
  className: p = "",
  style: k = {},
  closeIcon: L,
  closeButtonClassName: P,
  scrollLeftIcon: C,
  scrollRightIcon: N
}) => {
  const u = ue(() => e.children?.filter((s) => s.type === "tab") || [], [e.children]), b = ue(() => {
    const s = /* @__PURE__ */ new Map();
    for (let v = 0; v < u.length; v++) {
      const K = u[v];
      K && K.id && s.set(K.id, v);
    }
    return s;
  }, [u]), m = ue(() => D === "rtl" ? [...u].reverse() : u, [u, D]), h = e.selected ?? 0, $ = Math.min(
    h,
    Math.max(0, u.length - 1)
  ), E = u[$], A = T(
    (s) => {
      const v = b.get(s);
      v !== void 0 && v !== -1 && r?.(e.id, v);
    },
    [e.id, b, r]
  ), ne = T(
    (s) => {
      const v = b.get(s);
      v !== void 0 && v !== -1 && a?.(e.id, v);
    },
    [e.id, b, a]
  ), ee = T(
    (s, v) => {
      const K = v !== void 0 ? v : b.get(s) ?? -1;
      K !== -1 && c?.(e.id, K);
    },
    [e.id, b, c]
  ), te = I(null), M = I(null), [he, U] = ce(!1), [me, ge] = ce(!1), oe = I(null), B = T(
    (s) => {
      s.preventDefault(), s.dataTransfer.dropEffect = "move";
      const v = s.currentTarget.getBoundingClientRect(), K = s.clientX - v.left, l = s.clientY - v.top, z = v.width, Y = v.height;
      let j = "center";
      if (l < 40) {
        const re = te.current;
        if (re) {
          const Z = re.getBoundingClientRect(), ie = s.clientX - Z.left, G = re.querySelectorAll(
            ".react-flex-layout-tab"
          );
          let H = u.length;
          if (D === "rtl") {
            for (let V = G.length - 1; V >= 0; V--) {
              const q = G[V].getBoundingClientRect(), fe = q.left - Z.left, O = q.right - Z.left, le = (fe + O) / 2;
              if (ie > le) {
                const X = b.get(m[V].id);
                X !== void 0 && X !== -1 && (H = X);
                break;
              }
            }
            if (H === u.length && G.length > 0) {
              const V = G[0].getBoundingClientRect();
              if (ie > V.right - Z.left) {
                const q = b.get(m[0].id);
                q !== void 0 && q !== -1 && (H = q);
              }
            }
          } else
            for (let V = 0; V < G.length; V++) {
              const q = G[V].getBoundingClientRect(), fe = q.left - Z.left, O = q.right - Z.left, le = (fe + O) / 2;
              if (ie < le) {
                const X = b.get(m[V].id);
                X !== void 0 && X !== -1 && (H = X);
                break;
              }
            }
          j = "tab", f?.(s, e.id, j, H);
          return;
        }
      }
      K < z * 0.25 ? j = "left" : K > z * 0.75 ? j = "right" : l < Y * 0.25 ? j = "top" : l > Y * 0.75 ? j = "bottom" : j = "center", f?.(s, e.id, j);
    },
    [e.id, D, u.length, m, b, f]
  ), F = T(
    (s) => {
      o?.(s);
    },
    [o]
  ), _ = T(
    (s) => {
      d?.(s, e.id);
    },
    [e.id, d]
  ), R = y === e.id, J = T(() => {
    const s = M.current;
    if (!s) {
      U(!1), ge(!1);
      return;
    }
    const { scrollLeft: v, scrollWidth: K, clientWidth: l } = s;
    U(v > 1), ge(v < K - l - 1);
  }, []), ae = T(() => {
    oe.current && clearTimeout(oe.current), oe.current = setTimeout(J, 10);
  }, [J]);
  W(() => {
    const s = M.current;
    !s || $ < 0 || requestAnimationFrame(() => {
      const K = s.children[$];
      if (!K) return;
      const l = s.getBoundingClientRect(), z = K.getBoundingClientRect(), Y = s.scrollLeft;
      z.left < l.left ? s.scrollTo({
        left: Y - (l.left - z.left) - 10,
        behavior: "smooth"
      }) : z.right > l.right && s.scrollTo({
        left: Y + (z.right - l.right) + 10,
        behavior: "smooth"
      });
    });
  }, [$, m.length]), W(() => {
    const s = M.current;
    if (!s) return;
    requestAnimationFrame(J), s.addEventListener("scroll", ae, { passive: !0 });
    const v = new ResizeObserver(() => {
      requestAnimationFrame(J);
    });
    return v.observe(s), () => {
      s.removeEventListener("scroll", ae), v.disconnect(), oe.current && clearTimeout(oe.current);
    };
  }, [J, ae, m.length]);
  const ve = {
    ...k,
    width: e.width ? `${e.width}%` : void 0,
    height: e.height ? `${e.height}%` : void 0,
    flex: `${e.flex || 1} 1 0%`,
    minWidth: e.minWidth ? `${e.minWidth}px` : void 0,
    minHeight: e.minHeight ? `${e.minHeight}px` : void 0,
    maxWidth: e.maxWidth ? `${e.maxWidth}px` : void 0,
    maxHeight: e.maxHeight ? `${e.maxHeight}px` : void 0
  };
  return u.length === 0 ? null : /* @__PURE__ */ be(
    "div",
    {
      className: `react-flex-layout-tabset ${R ? "drag-over" : ""} ${p}`,
      style: ve,
      "data-tabset-id": e.id,
      "data-drop-position": R ? x : void 0,
      onDragOver: B,
      onDragLeave: F,
      onDrop: _,
      children: [
        /* @__PURE__ */ be("div", { className: "react-flex-layout-tabset-header", ref: te, children: [
          he && /* @__PURE__ */ w(
            "button",
            {
              className: "react-flex-layout-tabset-scroll-button react-flex-layout-tabset-scroll-left",
              onClick: () => {
                const s = M.current;
                s && s.scrollBy({ left: -200, behavior: "smooth" });
              },
              type: "button",
              "aria-label": "Scroll left",
              children: C || /* @__PURE__ */ w(Fe, {})
            }
          ),
          /* @__PURE__ */ be(
            "div",
            {
              ref: M,
              className: "react-flex-layout-tabset-tabs-container",
              onScroll: ae,
              children: [
                m.map((s) => {
                  const v = b.get(s.id) ?? -1, K = v === $, l = R && x === "tab" && S !== null && v === S;
                  return /* @__PURE__ */ be(Te.Fragment, { children: [
                    l && /* @__PURE__ */ w("div", { className: "react-flex-layout-tab-drop-indicator" }),
                    /* @__PURE__ */ w(
                      Re,
                      {
                        node: s,
                        index: v,
                        onSelect: A,
                        onClose: ne,
                        onDragStart: ee,
                        onDragEnd: i,
                        className: K ? "active" : "",
                        closeIcon: L,
                        closeButtonClassName: P
                      }
                    )
                  ] }, s.id);
                }),
                R && x === "tab" && S !== null && S === u.length && /* @__PURE__ */ w("div", { className: "react-flex-layout-tab-drop-indicator" })
              ]
            }
          ),
          me && /* @__PURE__ */ w(
            "button",
            {
              className: "react-flex-layout-tabset-scroll-button react-flex-layout-tabset-scroll-right",
              onClick: () => {
                const s = M.current;
                s && s.scrollBy({ left: 200, behavior: "smooth" });
              },
              type: "button",
              "aria-label": "Scroll right",
              children: N || /* @__PURE__ */ w(Ke, {})
            }
          )
        ] }),
        /* @__PURE__ */ w("div", { className: "react-flex-layout-tabset-content", children: E && (n ? n(E) : t) })
      ]
    }
  );
}, Ie = Ce(
  Me,
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
            const c = n[a], i = r[a];
            if (c.id !== i.id || c.type !== i.type || c.name !== i.name || c.component !== i.component || c.enableClose !== i.enableClose || c.enableDrag !== i.enableDrag)
              return !1;
          }
      }
    }
    return !0;
  }
);
Ie.displayName = "MemoizedTabSet";
const Le = ({
  direction: e,
  onResize: t,
  onResizeStart: n,
  size: r = 8,
  className: a = "",
  style: c = {},
  customStyles: i = {}
}) => {
  const [f, o] = ce(!1), d = I(0), y = I(0), x = I(!1), S = I(null), D = I(null), p = T(
    (C) => {
      C.preventDefault(), C.stopPropagation(), o(!0), d.current = e === "horizontal" ? C.clientX : C.clientY, y.current = d.current, n?.();
      const N = (b) => {
        y.current = e === "horizontal" ? b.clientX : b.clientY, x.current || (x.current = !0, requestAnimationFrame(() => {
          x.current = !1;
          const m = y.current - d.current;
          t(m);
        }));
      }, u = () => {
        o(!1), document.removeEventListener("mousemove", N), document.removeEventListener("mouseup", u), S.current = null, D.current = null, x.current = !1;
      };
      document.addEventListener("mousemove", N), document.addEventListener("mouseup", u), S.current = N, D.current = u;
    },
    [e, t, n]
  ), k = {
    backgroundColor: "#ffffff",
    border: "none",
    outline: "none"
  }, L = ue(() => f && i.active ? i.active : i.default ? i.default : k, [f, i.active, i.default]), P = ue(() => {
    const C = e === "horizontal";
    return {
      ...c,
      width: C ? `${r}px` : "100%",
      height: C ? "100%" : `${r}px`,
      minWidth: C ? `${r}px` : void 0,
      minHeight: C ? void 0 : `${r}px`,
      flexShrink: 0,
      cursor: C ? "col-resize" : "row-resize",
      ...L,
      transition: f ? "none" : "all 0.2s ease"
    };
  }, [e, r, c, L, f]);
  return W(() => () => {
    S.current && document.removeEventListener("mousemove", S.current), D.current && document.removeEventListener("mouseup", D.current), x.current = !1;
  }, []), /* @__PURE__ */ w(
    "div",
    {
      className: `react-flex-layout-splitter ${a}`,
      style: P,
      onMouseDown: p
    }
  );
}, tt = (e, t) => ({
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
}), _e = (e, t, n, r) => ({
  id: e,
  type: "tab",
  component: t,
  name: n,
  config: r,
  enableClose: !0,
  enableDrag: !0
}), pe = (e, t, n = 0) => ({
  id: e,
  type: "tabset",
  children: t,
  selected: n,
  enableClose: !0,
  enableDrag: !0
}), je = (e, t, n, r) => ({
  id: e,
  type: "row",
  children: ze(t),
  width: n,
  height: r,
  enableResize: !0
}), qe = (e, t, n, r) => ({
  id: e,
  type: "column",
  children: ze(t),
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
}, Ne = (e, t) => {
  if (!e.children)
    return null;
  for (const n of e.children)
    if (n.id === t)
      return e;
  for (const n of e.children) {
    const r = Ne(n, t);
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
      const i = a[c], f = Q(i, t, n);
      f !== i && r === null && (r = a.slice(0, c)), r !== null && f !== null && r.push(f);
    }
    return r === null ? e : {
      ...e,
      children: r
    };
  }
  return e;
}, $e = (e, t) => {
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
    const i = $e(c, t);
    i !== c && n === null && (n = r.slice(0, a)), n !== null && n.push(i);
  }
  return n === null ? e : {
    ...e,
    children: n
  };
}, ze = (e) => e.map((t) => ({
  ...t,
  flex: t.flex || 1 / e.length
})), xe = (e) => {
  if (e.type === "tabset" && (!e.children || e.children.length === 0))
    return null;
  if (e.children) {
    const t = e.children, n = t.length;
    let r = null;
    for (let i = 0; i < t.length; i++) {
      const f = t[i], o = xe(f);
      o !== f && r === null && (r = t.slice(0, i)), r !== null && o !== null && r.push(o);
    }
    const a = r ?? t, c = a.length < n;
    if (a.length === 0)
      return null;
    if ((e.type === "row" || e.type === "column") && a.length > 0) {
      const i = a.reduce(
        (o, d) => o + (d.flex || 0),
        0
      );
      if (c || i < 0.999 || a.length === 1) {
        let o;
        if (a.length === 1)
          o = a.map((d) => ({
            ...d,
            flex: 1
          }));
        else if (i === 0 || i < 1e-3) {
          const d = 1 / a.length;
          o = a.map((y) => ({
            ...y,
            flex: d
          }));
        } else {
          const d = 1 / i;
          o = a.map((y) => ({
            ...y,
            flex: (y.flex || 0) * d
          }));
        }
        return {
          ...e,
          children: o
        };
      }
      if (a.length !== n || a.some((o, d) => o !== t[d]))
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
}, Ee = (e, t, n = null) => {
  if (!e.children) return null;
  for (const r of e.children) {
    if (r.id === t)
      return n || e;
    if (r.children) {
      const a = Ee(r, t, e);
      if (a) return a;
    }
  }
  return null;
}, He = (e, t) => {
  if (!e.children) return null;
  for (const n of e.children) {
    if (n.type === "tabset" && n.children && n.children.find((a) => a.id === t))
      return n;
    if (n.children) {
      const r = He(n, t);
      if (r) return r;
    }
  }
  return null;
}, Je = (e, t, n) => {
  const r = se(e, t);
  if (!r || r.type !== "tabset")
    return null;
  const c = [...r.children || [], n], i = {
    ...r,
    children: c,
    selected: c.length - 1
  };
  return Q(e, t, i);
}, nt = (e, t) => {
  const n = He(e, t);
  if (!n || n.type !== "tabset")
    return { layout: e, restoreData: null };
  const r = n.children?.find((x) => x.id === t);
  if (!r || r.type !== "tab")
    return { layout: e, restoreData: null };
  const a = n.children?.findIndex(
    (x) => x.id === t
  ), c = n.children?.filter(
    (x) => x.id !== t
  );
  if (!c || c.length === 0) {
    const x = $e(e, n.id), S = {
      tabId: r.id,
      component: r.component || "",
      name: r.name || "",
      tabsetId: n.id,
      tabIndex: a !== void 0 ? a : 0,
      config: r.config
    };
    return {
      layout: x,
      restoreData: S
    };
  }
  const i = n.selected ?? 0;
  let f = i;
  a !== void 0 && a !== -1 && (a <= i && (f = Math.max(0, i - 1)), f = Math.min(f, c.length - 1));
  const o = {
    ...n,
    children: c,
    selected: c.length > 0 ? f : void 0
  }, d = Q(e, n.id, o), y = {
    tabId: r.id,
    component: r.component || "",
    name: r.name || "",
    tabsetId: n.id,
    tabIndex: a !== void 0 ? a : 0,
    config: r.config
  };
  return {
    layout: d,
    restoreData: y
  };
}, rt = (e, t, n) => {
  if (se(e, t.tabId))
    return e;
  let a = se(e, t.tabsetId);
  if (!a || a.type !== "tabset") {
    if (!n)
      return null;
    const f = Ee(
      n,
      t.tabsetId
    );
    if (!f)
      return null;
    const o = se(e, f.id);
    if (!o || !o.children)
      return null;
    const d = o.children.find(
      (y) => y.id === t.tabsetId
    );
    if (d)
      a = d;
    else {
      const y = pe(t.tabsetId, []), x = [...o.children, y], S = {
        ...o,
        children: x
      }, D = Q(
        e,
        o.id,
        S
      );
      if (!D || (e = D, a = se(e, t.tabsetId), !a || a.type !== "tabset"))
        return null;
    }
  }
  const c = _e(
    t.tabId,
    t.component,
    t.name,
    t.config
  );
  return Je(e, t.tabsetId, c);
}, it = (e, t) => se(e, t) !== null, Xe = (e, t) => {
  const n = I({}), r = I({}), a = T(
    (i, f, o) => {
      if (!t) return;
      const d = Oe(e.layout, i);
      if (!d || !d.children) return;
      const y = d.children.findIndex(
        (m) => m.id === i
      ), x = y + 1;
      if (x >= d.children.length) return;
      const S = `${i}-${o}`;
      if (!n.current[S]) {
        const m = d.children[y], h = d.children[x];
        n.current[S] = {
          current: m.flex || 1,
          sibling: h.flex || 1
        };
      }
      const D = n.current[S], p = D.current + D.sibling, k = o === "horizontal" ? window.innerWidth : window.innerHeight, L = D.current / p * k, P = D.sibling / p * k, C = 100;
      let N = L + f, u = P - f;
      if (N < C) {
        const m = C - N;
        N = C, u -= m;
      }
      if (u < C) {
        const m = C - u;
        u = C, N -= m;
      }
      const b = N + u;
      if (b > 0) {
        const m = N / b * p, h = u / b * p, $ = r.current[S], E = 1e-4;
        if ($ && Math.abs($.current - m) < E && Math.abs($.sibling - h) < E)
          return;
        const A = d.children.slice(), ne = A[y], ee = A[x];
        A[y] = { ...ne, flex: m }, A[x] = { ...ee, flex: h };
        const te = Q(e.layout, d.id, {
          children: A
        });
        te && (r.current[S] = {
          current: m,
          sibling: h
        }, t({
          ...e,
          layout: te
        }));
      }
    },
    [e, t]
  ), c = T(
    (i, f) => {
      const o = `${i}-${f}`;
      delete n.current[o], delete r.current[o];
    },
    []
  );
  return { handleResize: a, resetResize: c };
}, Oe = (e, t) => {
  if (!e.children) return null;
  for (const n of e.children) {
    if (n.id === t)
      return e;
    const r = Oe(n, t);
    if (r) return r;
  }
  return null;
}, Ue = (e, t) => {
  const [n, r] = ce(null), [a, c] = ce(null), [i, f] = ce("center"), [o, d] = ce(null), y = I(null), x = I(e), S = I(t), D = I(i), p = I(o);
  W(() => {
    x.current = e;
  }, [e]), W(() => {
    S.current = t;
  }, [t]), W(() => {
    D.current = i;
  }, [i]), W(() => {
    p.current = o;
  }, [o]);
  const k = T((u, b) => {
    const m = { tabsetId: u, tabIndex: b };
    r(m), y.current = m;
  }, []), L = T(() => {
    r(null), y.current = null, c(null), d(null);
  }, []), P = T(
    (u, b, m = "center", h) => {
      u.preventDefault(), u.dataTransfer.dropEffect = "move", c(b), f(m), h !== void 0 ? d(h) : m !== "tab" && d(null);
    },
    []
  ), C = T((u) => {
    u.currentTarget === u.target && setTimeout(() => {
      c(null), d(null);
    }, 50);
  }, []), N = T(
    (u, b) => {
      u.preventDefault();
      const m = y.current, h = x.current, $ = S.current, E = D.current, A = p.current;
      if (!m || !$)
        return;
      const { tabsetId: ne, tabIndex: ee } = m;
      if (ne === b && E === "tab" && A !== null) {
        const B = se(h.layout, ne);
        if (!B || !B.children)
          return;
        const F = B.children[ee];
        if (!F || ee === A)
          return;
        const _ = [...B.children];
        _.splice(ee, 1), _.splice(A, 0, F);
        let R = B.selected ?? 0;
        ee < R && A >= R ? R = Math.max(0, R - 1) : ee > R && A <= R ? R = Math.min(R + 1, _.length - 1) : ee === R && (R = A);
        const J = Q(
          h.layout,
          ne,
          {
            children: _,
            selected: R
          }
        );
        J && $({
          ...h,
          layout: J,
          metadata: h.metadata
        }), r(null), c(null), d(null);
        return;
      }
      if (ne === b && E !== "tab")
        return;
      const te = se(h.layout, ne), M = se(h.layout, b);
      if (!te || !M || !te.children || !M.children)
        return;
      const he = te.children[ee];
      if (!he)
        return;
      let U = h.layout;
      const me = te.children.filter(
        (B, F) => F !== ee
      ), ge = Q(
        U,
        ne,
        {
          children: me,
          selected: Math.min(
            te.selected || 0,
            me.length - 1
          )
        }
      );
      if (!ge) return;
      if (U = ge, E === "center") {
        const B = Q(
          U,
          b,
          {
            children: [...M.children || [], he],
            selected: M.children?.length || 0
          }
        );
        if (!B) return;
        U = B;
      } else {
        const B = pe(
          `${b}-split-${Date.now()}`,
          [he]
        ), F = Ne(U, b);
        if (F) {
          const _ = F.children?.findIndex(
            (R) => R.id === b
          ) || 0;
          if (E === "left" || E === "right") {
            const R = je(`${b}-row-${Date.now()}`, [
              E === "left" ? B : M,
              E === "left" ? M : B
            ]), J = Q(
              U,
              F.id,
              {
                children: [
                  ...F.children?.slice(0, _) || [],
                  R,
                  ...F.children?.slice(_ + 1) || []
                ]
              }
            );
            if (!J) return;
            U = J;
          } else if (E === "top" || E === "bottom") {
            const R = qe(
              `${b}-column-${Date.now()}`,
              [
                E === "top" ? B : M,
                E === "top" ? M : B
              ]
            ), J = Q(
              U,
              F.id,
              {
                children: [
                  ...F.children?.slice(0, _) || [],
                  R,
                  ...F.children?.slice(_ + 1) || []
                ]
              }
            );
            if (!J) return;
            U = J;
          }
        }
      }
      const oe = xe(U);
      oe && $({
        ...h,
        layout: oe,
        metadata: h.metadata
      }), r(null), c(null);
    },
    []
  );
  return {
    draggedTab: n,
    dragOverTabset: a,
    dropPosition: i,
    dropTargetIndex: o,
    handleDragStart: k,
    handleDragEnd: L,
    handleDragOver: P,
    handleDragLeave: C,
    handleDrop: N
  };
}, Ye = "react-flex-layout";
class We {
  storageKey;
  autoSave;
  debounceMs;
  saveTimeout = null;
  lastSavedString = null;
  isAvailable;
  constructor(t = {}) {
    this.storageKey = `${Ye}-${t.key || "default"}`, this.autoSave = t.autoSave !== !1, this.debounceMs = t.debounceMs || 500, this.isAvailable = Ge();
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
const lt = (e) => new We(e), Ge = () => {
  try {
    const e = "__localStorage_test__";
    return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
  } catch {
    return !1;
  }
}, Ve = (e, t = {}) => {
  const { onLoad: n, onSave: r, onError: a, ...c } = t, i = I(null), [f, o] = ce(e), [d, y] = ce(!1), [x, S] = ce(!1);
  W(() => {
    if (i.current)
      try {
        i.current.cancel?.();
      } catch {
      }
    i.current = new We(c), S(!0);
  }, [c.key, c.autoSave, c.debounceMs]), W(() => {
    if (!i.current || d) return;
    const h = i.current.load();
    h ? (o(h), y(!0), n?.(h)) : y(!0);
  }, [d, n]);
  const D = I(), p = ue(
    () => JSON.stringify(f.layout),
    [f.layout]
  ), k = ue(
    () => JSON.stringify(e.layout),
    [e.layout]
  ), L = ue(
    () => f.metadata ? JSON.stringify(f.metadata) : void 0,
    [f.metadata]
  ), P = ue(
    () => e.metadata ? JSON.stringify(e.metadata) : void 0,
    [e.metadata]
  );
  W(() => {
    if (!(!d || !i.current)) {
      if (D.current !== k && p !== k) {
        const h = { ...e };
        e.global && (h.global = { ...e.global }), o(h), D.current = k, i.current.isAutoSaveEnabled() ? i.current.debouncedSave(h) : i.current.save(h);
        return;
      }
      e.metadata && L !== P && o((h) => ({
        ...h,
        metadata: e.metadata
      }));
    }
  }, [
    d,
    i,
    e,
    p,
    k,
    L,
    P
  ]);
  const C = T(
    (h) => {
      if (i.current)
        try {
          i.current.isAutoSaveEnabled() ? i.current.debouncedSave(h) : i.current.save(h), r?.(h);
        } catch ($) {
          a?.($);
        }
    },
    [r, a]
  ), N = T(
    (h) => {
      const $ = { ...h };
      h.global && ($.global = { ...h.global }), o($), C($);
    },
    [C]
  ), u = T(() => {
    if (i.current)
      try {
        i.current.clear();
      } catch (h) {
        a?.(h);
      }
  }, [a]), b = T(() => i.current?.exists() ?? !1, []), m = T(() => i.current?.getStorageKey() ?? "", []);
  return {
    model: f,
    updateModel: N,
    clearStorage: u,
    hasStoredData: b,
    getStorageKey: m,
    isLoaded: d,
    hasStorage: x
  };
}, Qe = ke(
  ({
    model: e,
    factory: t,
    onModelChange: n,
    onAction: r,
    className: a = "",
    style: c = {},
    storage: i,
    closeIcon: f,
    closeButtonClassName: o,
    scrollLeftIcon: d,
    scrollRightIcon: y
  }, x) => {
    const [S, D] = ce(e), [p, k] = ce(
      null
    ), {
      model: L,
      updateModel: P,
      isLoaded: C
    } = Ve(e, {
      key: i?.key,
      autoSave: i?.autoSave,
      debounceMs: i?.debounceMs,
      onLoad: (l) => {
        n ? n(l) : D(l);
      }
    }), N = i?.enabled ? L : n ? e : S, u = I(n), b = I(i), m = I(P);
    W(() => {
      u.current = n;
    }, [n]), W(() => {
      b.current = i;
    }, [i]), W(() => {
      m.current = P;
    }, [P]);
    const h = T((l) => {
      b.current?.enabled ? (m.current(l), u.current && u.current(l)) : u.current ? u.current(l) : D(l);
    }, []), { handleResize: $, resetResize: E } = Xe(
      N,
      h
    ), {
      dragOverTabset: A,
      dropPosition: ne,
      dropTargetIndex: ee,
      handleDragStart: te,
      handleDragEnd: M,
      handleDragOver: he,
      handleDragLeave: U,
      handleDrop: me
    } = Ue(N, h), ge = I(L);
    W(() => {
      ge.current = L;
    }, [L]);
    const oe = I(S);
    W(() => {
      oe.current = S;
    }, [S]);
    const B = I(e);
    W(() => {
      B.current = e;
    }, [e]);
    const F = I(r);
    W(() => {
      F.current = r;
    }, [r]);
    const _ = T((l) => {
      if (b.current?.enabled) {
        const z = ge.current;
        if (l.type === "changeDirection") {
          const { direction: g } = l.payload;
          k(g);
        }
        const j = ((g) => {
          switch (l.type) {
            case "selectTab":
              const { nodeId: de, tabIndex: re } = l.payload, Z = Q(g.layout, de, {
                selected: re
              });
              return !Z || Z === g.layout ? g : {
                ...g,
                layout: Z
              };
            case "removeNode":
              const { nodeId: ie, tabIndex: G } = l.payload, H = se(g.layout, ie);
              if (H && H.children) {
                const O = H.children.filter(
                  (ye, we) => we !== G
                ), le = H.selected ?? 0;
                let X = le;
                G <= le && (X = Math.max(0, le - 1)), X = Math.min(X, O.length - 1);
                const De = {
                  ...H,
                  children: O,
                  selected: O.length > 0 ? X : void 0
                }, Se = Q(
                  g.layout,
                  ie,
                  De
                );
                if (Se) {
                  const ye = xe(Se);
                  if (ye)
                    return {
                      ...g,
                      layout: ye
                    };
                }
              }
              return g;
            case "closeTabset":
              const { nodeId: V } = l.payload, q = Q(
                g.layout,
                V,
                null
              );
              if (q) {
                const O = xe(q);
                if (O)
                  return {
                    ...g,
                    layout: O
                  };
              }
              return g;
            case "changeDirection":
              const { direction: fe } = l.payload;
              return {
                ...g,
                global: {
                  ...g.global,
                  direction: fe
                }
              };
            default:
              return g;
          }
        })(z);
        m.current(j), u.current && u.current(j), F.current?.(l);
      } else {
        if (l.type === "changeDirection" && u.current) {
          const { direction: z } = l.payload, Y = B.current, j = {
            ...Y,
            global: {
              ...Y.global,
              direction: z
            }
          };
          u.current(j);
        }
        F.current?.(l);
      }
      if (!b.current?.enabled && !u.current) {
        const z = oe.current, j = ((g) => {
          switch (l.type) {
            case "selectTab":
              const { nodeId: de, tabIndex: re } = l.payload, Z = Q(g.layout, de, {
                selected: re
              });
              return !Z || Z === g.layout ? g : {
                ...g,
                layout: Z
              };
            case "removeNode":
              const { nodeId: ie, tabIndex: G } = l.payload, H = se(g.layout, ie);
              if (H && H.children) {
                const O = H.children.filter(
                  (ye, we) => we !== G
                ), le = H.selected ?? 0;
                let X = le;
                G <= le && (X = Math.max(0, le - 1)), X = Math.min(X, O.length - 1);
                const De = {
                  ...H,
                  children: O,
                  selected: O.length > 0 ? X : void 0
                }, Se = Q(
                  g.layout,
                  ie,
                  De
                );
                if (Se) {
                  const ye = xe(Se);
                  if (ye)
                    return {
                      ...g,
                      layout: ye
                    };
                }
              }
              return g;
            case "closeTabset":
              const { nodeId: V } = l.payload, q = Q(
                g.layout,
                V,
                null
              );
              if (q) {
                const O = xe(q);
                if (O)
                  return {
                    ...g,
                    layout: O
                  };
              }
              return g;
            case "changeDirection":
              const { direction: fe } = l.payload;
              return {
                ...g,
                global: {
                  ...g.global,
                  direction: fe
                }
              };
            default:
              return g;
          }
        })(z);
        D(j);
      }
    }, []);
    Ae(
      x,
      () => ({
        handleAction: _
      }),
      [_]
    );
    const R = T(
      (l, z) => {
        _({
          type: "selectTab",
          payload: { nodeId: l, tabIndex: z }
        });
      },
      [_]
    ), J = T(
      (l, z) => {
        _({
          type: "removeNode",
          payload: { nodeId: l, tabIndex: z }
        });
      },
      [_]
    );
    let ae;
    i?.enabled ? p !== null ? ae = p : ae = L?.global?.direction || "ltr" : ae = N.global?.direction || "ltr";
    const ve = N.global?.splitterSize || 8, s = T(
      (l) => {
        switch (l.type) {
          case "tabset":
            return /* @__PURE__ */ w(
              Ie,
              {
                node: l,
                factory: t,
                onTabSelect: R,
                onTabClose: J,
                onTabDragStart: te,
                onTabDragEnd: M,
                onDragOver: he,
                onDragLeave: U,
                onDrop: me,
                dragOverTabset: A,
                dropPosition: A === l.id ? ne : void 0,
                dropTargetIndex: A === l.id ? ee : void 0,
                direction: ae,
                closeIcon: f,
                closeButtonClassName: o,
                scrollLeftIcon: d,
                scrollRightIcon: y
              },
              l.id
            );
          case "row":
            const z = ae === "rtl", Y = l.children || [], j = z ? [...Y].reverse() : Y;
            return /* @__PURE__ */ w(
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
                children: j.map((g, de) => {
                  const re = de + 1;
                  if (!(re < j.length))
                    return /* @__PURE__ */ w(Te.Fragment, { children: s(g) }, g.id);
                  const ie = z ? Y.length - 1 - de : de, G = z ? Y.length - 1 - re : re, H = Math.min(
                    ie,
                    G
                  );
                  if (Math.max(
                    ie,
                    G
                  ) !== H + 1)
                    return /* @__PURE__ */ w(Te.Fragment, { children: s(g) }, g.id);
                  const q = Y[H], fe = z && ie > G;
                  return /* @__PURE__ */ be(Te.Fragment, { children: [
                    s(g),
                    /* @__PURE__ */ w(
                      Le,
                      {
                        direction: "horizontal",
                        onResize: (O) => {
                          const le = fe ? -O : O;
                          $(
                            q.id,
                            le,
                            "horizontal"
                          );
                        },
                        onResizeStart: () => {
                          E(q.id, "horizontal");
                        },
                        size: ve
                      }
                    )
                  ] }, g.id);
                })
              },
              l.id
            );
          case "column":
            return /* @__PURE__ */ w(
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
                children: l.children?.map((g, de) => /* @__PURE__ */ be(Te.Fragment, { children: [
                  s(g),
                  de < (l.children?.length || 0) - 1 && /* @__PURE__ */ w(
                    Le,
                    {
                      direction: "vertical",
                      onResize: (re) => $(g.id, re, "vertical"),
                      onResizeStart: () => {
                        E(g.id, "vertical");
                      },
                      size: ve
                    }
                  )
                ] }, g.id))
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
        ae,
        ve,
        t,
        R,
        J,
        $,
        te,
        M,
        he,
        U,
        me,
        A,
        ne,
        f,
        o
      ]
    );
    W(() => {
      !i?.enabled && p !== null && k(null);
    }, [i?.enabled, p]), W(() => {
      i?.enabled && p !== null && (L?.global?.direction || "ltr") === p && k(null);
    }, [i?.enabled, p, L?.global?.direction]);
    const v = ue(
      () => s(N.layout),
      [s, N.layout]
    ), K = {
      ...c,
      height: "100%",
      width: "100%"
    };
    return i?.enabled && !C ? /* @__PURE__ */ w(
      "div",
      {
        className: `react-flex-layout ${a}`,
        style: {
          ...K,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ w("div", { children: "Loading layout..." })
      }
    ) : /* @__PURE__ */ w(
      "div",
      {
        className: `react-flex-layout ${a}`,
        style: K,
        dir: ae,
        children: v
      }
    );
  }
);
Qe.displayName = "Layout";
const Ze = Ce(Re, (e, t) => !(e.className !== t.className || e.style !== t.style || e.closeIcon !== t.closeIcon || e.closeButtonClassName !== t.closeButtonClassName || e.index !== t.index || e.onSelect !== t.onSelect || e.onClose !== t.onClose || e.onDragStart !== t.onDragStart || e.onDragEnd !== t.onDragEnd || e.node.id !== t.node.id || e.node.name !== t.node.name));
Ze.displayName = "MemoizedTab";
export {
  Be as DefaultCloseIcon,
  Qe as Layout,
  We as LayoutStorage,
  Ze as MemoizedTab,
  Ie as MemoizedTabSet,
  Le as Splitter,
  Re as Tab,
  Me as TabSet,
  Je as addTabToTabset,
  ze as calculateFlexValues,
  qe as createColumn,
  tt as createLayoutModel,
  lt as createLayoutStorage,
  je as createRow,
  _e as createTab,
  pe as createTabSet,
  se as findNodeById,
  Ge as isLocalStorageAvailable,
  xe as removeEmptyTabsets,
  $e as removeNodeById,
  nt as removeTab,
  rt as restoreTab,
  it as tabExists,
  Q as updateNodeById,
  Ve as useLayoutStorage
};
