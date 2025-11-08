import { jsxs as he, jsx as E } from "react/jsx-runtime";
import xe, { useRef as p, useCallback as C, useEffect as F, useMemo as ie, memo as Ie, useState as le, forwardRef as Oe, useImperativeHandle as We } from "react";
const Ae = ({
  size: e = 16,
  color: t = "#666",
  className: n = ""
}) => /* @__PURE__ */ he(
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
      /* @__PURE__ */ E("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ E("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
), Ce = ({
  node: e,
  index: t,
  onClose: n,
  onSelect: r,
  onDragStart: l,
  onDragEnd: s,
  className: i = "",
  style: h = {},
  closeIcon: o,
  closeButtonClassName: d = ""
}) => {
  const g = p(!1), b = C(() => {
    r?.(e.id);
  }, [e.id, r]), m = C(
    (N) => {
      N.stopPropagation(), n?.(e.id);
    },
    [e.id, n]
  ), I = C(
    (N) => {
      N.dataTransfer.setData("text/plain", e.id), N.dataTransfer.effectAllowed = "move", N.currentTarget.classList.add("dragging"), document.body.classList.add("dragging"), g.current = !0, l?.(e.id, t);
    },
    [e.id, t, l]
  ), R = C(
    (N) => {
      N.currentTarget.classList.remove("dragging"), document.body.classList.remove("dragging"), g.current = !1, s?.();
    },
    [s]
  );
  F(() => () => {
    g.current && (document.body.classList.remove("dragging"), g.current = !1);
  }, []);
  const O = ie(() => ({ ...h, cursor: "grab" }), [h]);
  return /* @__PURE__ */ he(
    "div",
    {
      className: `react-flex-layout-tab ${i}`,
      style: O,
      onClick: b,
      draggable: !0,
      onDragStart: I,
      onDragEnd: R,
      children: [
        /* @__PURE__ */ E("span", { className: "react-flex-layout-tab-title", children: e.name || "Untitled" }),
        /* @__PURE__ */ E(
          "button",
          {
            className: `react-flex-layout-tab-close ${d}`.trim(),
            onClick: m,
            type: "button",
            "aria-label": "Close tab",
            children: o || /* @__PURE__ */ E(Ae, {})
          }
        )
      ]
    }
  );
}, ke = ({
  node: e,
  children: t,
  factory: n,
  onTabSelect: r,
  onTabClose: l,
  onTabDragStart: s,
  onTabDragEnd: i,
  onDragOver: h,
  onDragLeave: o,
  onDrop: d,
  dragOverTabset: g,
  dropPosition: b,
  dropTargetIndex: m,
  direction: I = "ltr",
  className: R = "",
  style: O = {},
  closeIcon: N,
  closeButtonClassName: B
}) => {
  const u = ie(() => e.children?.filter((x) => x.type === "tab") || [], [e.children]), S = ie(() => {
    const x = /* @__PURE__ */ new Map();
    for (let D = 0; D < u.length; D++) {
      const k = u[D];
      k && k.id && x.set(k.id, D);
    }
    return x;
  }, [u]), v = ie(() => I === "rtl" ? [...u].reverse() : u, [u, I]), w = e.selected ?? 0, T = Math.min(
    w,
    Math.max(0, u.length - 1)
  ), f = u[T], z = C(
    (x) => {
      const D = S.get(x);
      D !== void 0 && D !== -1 && r?.(e.id, D);
    },
    [e.id, S, r]
  ), W = C(
    (x) => {
      const D = S.get(x);
      D !== void 0 && D !== -1 && l?.(e.id, D);
    },
    [e.id, S, l]
  ), M = C(
    (x, D) => {
      const k = D !== void 0 ? D : S.get(x) ?? -1;
      k !== -1 && s?.(e.id, k);
    },
    [e.id, S, s]
  ), Y = p(null), X = C(
    (x) => {
      x.preventDefault(), x.dataTransfer.dropEffect = "move";
      const D = x.currentTarget.getBoundingClientRect(), k = x.clientX - D.left, L = x.clientY - D.top, A = D.width, q = D.height;
      let y = "center";
      if (L < 40) {
        const be = Y.current;
        if (be) {
          const ae = be.getBoundingClientRect(), a = x.clientX - ae.left, $ = be.querySelectorAll(
            ".react-flex-layout-tab"
          );
          let _ = u.length;
          if (I === "rtl") {
            for (let H = $.length - 1; H >= 0; H--) {
              const c = $[H].getBoundingClientRect(), P = c.left - ae.left, ee = c.right - ae.left, te = (P + ee) / 2;
              if (a > te) {
                const K = S.get(v[H].id);
                K !== void 0 && K !== -1 && (_ = K);
                break;
              }
            }
            if (_ === u.length && $.length > 0) {
              const H = $[0].getBoundingClientRect();
              if (a > H.right - ae.left) {
                const c = S.get(v[0].id);
                c !== void 0 && c !== -1 && (_ = c);
              }
            }
          } else
            for (let H = 0; H < $.length; H++) {
              const c = $[H].getBoundingClientRect(), P = c.left - ae.left, ee = c.right - ae.left, te = (P + ee) / 2;
              if (a < te) {
                const K = S.get(v[H].id);
                K !== void 0 && K !== -1 && (_ = K);
                break;
              }
            }
          y = "tab", h?.(x, e.id, y, _);
          return;
        }
      }
      k < A * 0.25 ? y = "left" : k > A * 0.75 ? y = "right" : L < q * 0.25 ? y = "top" : L > q * 0.75 ? y = "bottom" : y = "center", h?.(x, e.id, y);
    },
    [e.id, I, u.length, v, S, h]
  ), V = C(
    (x) => {
      o?.(x);
    },
    [o]
  ), Q = C(
    (x) => {
      d?.(x, e.id);
    },
    [e.id, d]
  ), re = g === e.id, U = {
    ...O,
    width: e.width ? `${e.width}%` : void 0,
    height: e.height ? `${e.height}%` : void 0,
    flex: `${e.flex || 1} 1 0%`,
    minWidth: e.minWidth ? `${e.minWidth}px` : void 0,
    minHeight: e.minHeight ? `${e.minHeight}px` : void 0,
    maxWidth: e.maxWidth ? `${e.maxWidth}px` : void 0,
    maxHeight: e.maxHeight ? `${e.maxHeight}px` : void 0
  };
  return u.length === 0 ? null : /* @__PURE__ */ he(
    "div",
    {
      className: `react-flex-layout-tabset ${re ? "drag-over" : ""} ${R}`,
      style: U,
      "data-drop-position": re ? b : void 0,
      onDragOver: X,
      onDragLeave: V,
      onDrop: Q,
      children: [
        /* @__PURE__ */ he("div", { className: "react-flex-layout-tabset-header", ref: Y, children: [
          v.map((x) => {
            const D = S.get(x.id) ?? -1, k = D === T, L = re && b === "tab" && m !== null && D === m;
            return /* @__PURE__ */ he(xe.Fragment, { children: [
              L && /* @__PURE__ */ E("div", { className: "react-flex-layout-tab-drop-indicator" }),
              /* @__PURE__ */ E(
                Ce,
                {
                  node: x,
                  index: D,
                  onSelect: z,
                  onClose: W,
                  onDragStart: M,
                  onDragEnd: i,
                  className: k ? "active" : "",
                  closeIcon: N,
                  closeButtonClassName: B
                }
              )
            ] }, x.id);
          }),
          re && b === "tab" && m !== null && m === u.length && /* @__PURE__ */ E("div", { className: "react-flex-layout-tab-drop-indicator" })
        ] }),
        /* @__PURE__ */ E("div", { className: "react-flex-layout-tabset-content", children: f && (n ? n(f) : t) })
      ]
    }
  );
}, we = Ie(
  ke,
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
we.displayName = "MemoizedTabSet";
const De = ({
  direction: e,
  onResize: t,
  onResizeStart: n,
  size: r = 8,
  className: l = "",
  style: s = {},
  customStyles: i = {}
}) => {
  const [h, o] = le(!1), d = p(0), g = p(0), b = p(!1), m = p(null), I = p(null), R = C(
    (u) => {
      u.preventDefault(), u.stopPropagation(), o(!0), d.current = e === "horizontal" ? u.clientX : u.clientY, g.current = d.current, n?.();
      const S = (w) => {
        g.current = e === "horizontal" ? w.clientX : w.clientY, b.current || (b.current = !0, requestAnimationFrame(() => {
          b.current = !1;
          const T = g.current - d.current;
          t(T);
        }));
      }, v = () => {
        o(!1), document.removeEventListener("mousemove", S), document.removeEventListener("mouseup", v), m.current = null, I.current = null, b.current = !1;
      };
      document.addEventListener("mousemove", S), document.addEventListener("mouseup", v), m.current = S, I.current = v;
    },
    [e, t, n]
  ), O = {
    backgroundColor: "#ffffff",
    border: "none",
    outline: "none"
  }, N = ie(() => h && i.active ? i.active : i.default ? i.default : O, [h, i.active, i.default]), B = ie(() => {
    const u = e === "horizontal";
    return {
      ...s,
      width: u ? `${r}px` : "100%",
      height: u ? "100%" : `${r}px`,
      minWidth: u ? `${r}px` : void 0,
      minHeight: u ? void 0 : `${r}px`,
      flexShrink: 0,
      cursor: u ? "col-resize" : "row-resize",
      ...N,
      transition: h ? "none" : "all 0.2s ease"
    };
  }, [e, r, s, N, h]);
  return F(() => () => {
    m.current && document.removeEventListener("mousemove", m.current), I.current && document.removeEventListener("mouseup", I.current), b.current = !1;
  }, []), /* @__PURE__ */ E(
    "div",
    {
      className: `react-flex-layout-splitter ${l}`,
      style: B,
      onMouseDown: R
    }
  );
}, Qe = (e, t) => ({
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
}), Fe = (e, t, n, r) => ({
  id: e,
  type: "tab",
  component: t,
  name: n,
  config: r,
  enableClose: !0,
  enableDrag: !0
}), Le = (e, t, n = 0) => ({
  id: e,
  type: "tabset",
  children: t,
  selected: n,
  enableClose: !0,
  enableDrag: !0
}), Be = (e, t, n, r) => ({
  id: e,
  type: "row",
  children: Ne(t),
  width: n,
  height: r,
  enableResize: !0
}), Ke = (e, t, n, r) => ({
  id: e,
  type: "column",
  children: Ne(t),
  width: n,
  height: r,
  enableResize: !0
}), ne = (e, t) => {
  if (e.id === t)
    return e;
  if (e.children)
    for (const n of e.children) {
      const r = ne(n, t);
      if (r)
        return r;
    }
  return null;
}, Re = (e, t) => {
  if (!e.children)
    return null;
  for (const n of e.children)
    if (n.id === t)
      return e;
  for (const n of e.children) {
    const r = Re(n, t);
    if (r)
      return r;
  }
  return null;
}, J = (e, t, n) => {
  if (e.id === t)
    return n === null ? null : Object.keys(n).some(
      (l) => e[l] !== n[l]
    ) ? { ...e, ...n } : e;
  if (e.children) {
    let r = null;
    const l = e.children;
    for (let s = 0; s < l.length; s++) {
      const i = l[s], h = J(i, t, n);
      h !== i && r === null && (r = l.slice(0, s)), r !== null && h !== null && r.push(h);
    }
    return r === null ? e : {
      ...e,
      children: r
    };
  }
  return e;
}, pe = (e, t) => {
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
    const i = pe(s, t);
    i !== s && n === null && (n = r.slice(0, l)), n !== null && n.push(i);
  }
  return n === null ? e : {
    ...e,
    children: n
  };
}, Ne = (e) => e.map((t) => ({
  ...t,
  flex: t.flex || 1 / e.length
})), ge = (e) => {
  if (e.type === "tabset" && (!e.children || e.children.length === 0))
    return null;
  if (e.children) {
    const t = e.children, n = t.length;
    let r = null;
    for (let i = 0; i < t.length; i++) {
      const h = t[i], o = ge(h);
      o !== h && r === null && (r = t.slice(0, i)), r !== null && o !== null && r.push(o);
    }
    const l = r ?? t, s = l.length < n;
    if (l.length === 0)
      return null;
    if ((e.type === "row" || e.type === "column") && l.length > 0) {
      const i = l.reduce(
        (o, d) => o + (d.flex || 0),
        0
      );
      if (s || i < 0.999 || l.length === 1) {
        let o;
        if (l.length === 1)
          o = l.map((d) => ({
            ...d,
            flex: 1
          }));
        else if (i === 0 || i < 1e-3) {
          const d = 1 / l.length;
          o = l.map((g) => ({
            ...g,
            flex: d
          }));
        } else {
          const d = 1 / i;
          o = l.map((g) => ({
            ...g,
            flex: (g.flex || 0) * d
          }));
        }
        return {
          ...e,
          children: o
        };
      }
      if (l.length !== n || l.some((o, d) => o !== t[d]))
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
}, $e = (e, t, n = null) => {
  if (!e.children) return null;
  for (const r of e.children) {
    if (r.id === t)
      return n || e;
    if (r.children) {
      const l = $e(r, t, e);
      if (l) return l;
    }
  }
  return null;
}, He = (e, t) => {
  if (!e.children) return null;
  for (const n of e.children) {
    if (n.type === "tabset" && n.children && n.children.find((l) => l.id === t))
      return n;
    if (n.children) {
      const r = He(n, t);
      if (r) return r;
    }
  }
  return null;
}, Me = (e, t, n) => {
  const r = ne(e, t);
  if (!r || r.type !== "tabset")
    return null;
  const s = [...r.children || [], n], i = {
    ...r,
    children: s,
    selected: s.length - 1
  };
  return J(e, t, i);
}, Ze = (e, t) => {
  const n = He(e, t);
  if (!n || n.type !== "tabset")
    return { layout: e, restoreData: null };
  const r = n.children?.find((b) => b.id === t);
  if (!r || r.type !== "tab")
    return { layout: e, restoreData: null };
  const l = n.children?.findIndex(
    (b) => b.id === t
  ), s = n.children?.filter(
    (b) => b.id !== t
  );
  if (!s || s.length === 0) {
    const b = pe(e, n.id), m = {
      tabId: r.id,
      component: r.component || "",
      name: r.name || "",
      tabsetId: n.id,
      tabIndex: l !== void 0 ? l : 0,
      config: r.config
    };
    return {
      layout: b,
      restoreData: m
    };
  }
  const i = n.selected ?? 0;
  let h = i;
  l !== void 0 && l !== -1 && (l <= i && (h = Math.max(0, i - 1)), h = Math.min(h, s.length - 1));
  const o = {
    ...n,
    children: s,
    selected: s.length > 0 ? h : void 0
  }, d = J(e, n.id, o), g = {
    tabId: r.id,
    component: r.component || "",
    name: r.name || "",
    tabsetId: n.id,
    tabIndex: l !== void 0 ? l : 0,
    config: r.config
  };
  return {
    layout: d,
    restoreData: g
  };
}, Pe = (e, t, n) => {
  if (ne(e, t.tabId))
    return e;
  let l = ne(e, t.tabsetId);
  if (!l || l.type !== "tabset") {
    if (!n)
      return null;
    const h = $e(
      n,
      t.tabsetId
    );
    if (!h)
      return null;
    const o = ne(e, h.id);
    if (!o || !o.children)
      return null;
    const d = o.children.find(
      (g) => g.id === t.tabsetId
    );
    if (d)
      l = d;
    else {
      const g = Le(t.tabsetId, []), b = [...o.children, g], m = {
        ...o,
        children: b
      }, I = J(
        e,
        o.id,
        m
      );
      if (!I || (e = I, l = ne(e, t.tabsetId), !l || l.type !== "tabset"))
        return null;
    }
  }
  const s = Fe(
    t.tabId,
    t.component,
    t.name,
    t.config
  );
  return Me(e, t.tabsetId, s);
}, et = (e, t) => ne(e, t) !== null, _e = (e, t) => {
  const n = p({}), r = p({}), l = C(
    (i, h, o) => {
      if (!t) return;
      const d = ze(e.layout, i);
      if (!d || !d.children) return;
      const g = d.children.findIndex(
        (T) => T.id === i
      ), b = g + 1;
      if (b >= d.children.length) return;
      const m = `${i}-${o}`;
      if (!n.current[m]) {
        const T = d.children[g], f = d.children[b];
        n.current[m] = {
          current: T.flex || 1,
          sibling: f.flex || 1
        };
      }
      const I = n.current[m], R = I.current + I.sibling, O = o === "horizontal" ? window.innerWidth : window.innerHeight, N = I.current / R * O, B = I.sibling / R * O, u = 100;
      let S = N + h, v = B - h;
      if (S < u) {
        const T = u - S;
        S = u, v -= T;
      }
      if (v < u) {
        const T = u - v;
        v = u, S -= T;
      }
      const w = S + v;
      if (w > 0) {
        const T = S / w * R, f = v / w * R, z = r.current[m], W = 1e-4;
        if (z && Math.abs(z.current - T) < W && Math.abs(z.sibling - f) < W)
          return;
        const M = d.children.slice(), Y = M[g], X = M[b];
        M[g] = { ...Y, flex: T }, M[b] = { ...X, flex: f };
        const V = J(e.layout, d.id, {
          children: M
        });
        V && (r.current[m] = {
          current: T,
          sibling: f
        }, t({
          ...e,
          layout: V
        }));
      }
    },
    [e, t]
  ), s = C(
    (i, h) => {
      const o = `${i}-${h}`;
      delete n.current[o], delete r.current[o];
    },
    []
  );
  return { handleResize: l, resetResize: s };
}, ze = (e, t) => {
  if (!e.children) return null;
  for (const n of e.children) {
    if (n.id === t)
      return e;
    const r = ze(n, t);
    if (r) return r;
  }
  return null;
}, je = (e, t) => {
  const [n, r] = le(null), [l, s] = le(null), [i, h] = le("center"), [o, d] = le(null), g = p(null), b = p(e), m = p(t), I = p(i), R = p(o);
  F(() => {
    b.current = e;
  }, [e]), F(() => {
    m.current = t;
  }, [t]), F(() => {
    I.current = i;
  }, [i]), F(() => {
    R.current = o;
  }, [o]);
  const O = C((v, w) => {
    const T = { tabsetId: v, tabIndex: w };
    r(T), g.current = T;
  }, []), N = C(() => {
    r(null), g.current = null, s(null), d(null);
  }, []), B = C(
    (v, w, T = "center", f) => {
      v.preventDefault(), v.dataTransfer.dropEffect = "move", s(w), h(T), f !== void 0 ? d(f) : T !== "tab" && d(null);
    },
    []
  ), u = C((v) => {
    v.currentTarget === v.target && setTimeout(() => {
      s(null), d(null);
    }, 50);
  }, []), S = C(
    (v, w) => {
      v.preventDefault();
      const T = g.current, f = b.current, z = m.current, W = I.current, M = R.current;
      if (!T || !z)
        return;
      const { tabsetId: Y, tabIndex: X } = T;
      if (Y === w && W === "tab" && M !== null) {
        const L = ne(f.layout, Y);
        if (!L || !L.children)
          return;
        const A = L.children[X];
        if (!A || X === M)
          return;
        const q = [...L.children];
        q.splice(X, 1), q.splice(M, 0, A);
        let y = L.selected ?? 0;
        X < y && M >= y ? y = Math.max(0, y - 1) : X > y && M <= y ? y = Math.min(y + 1, q.length - 1) : X === y && (y = M);
        const Z = J(
          f.layout,
          Y,
          {
            children: q,
            selected: y
          }
        );
        Z && z({
          ...f,
          layout: Z,
          metadata: f.metadata
        }), r(null), s(null), d(null);
        return;
      }
      if (Y === w && W !== "tab")
        return;
      const V = ne(f.layout, Y), Q = ne(f.layout, w);
      if (!V || !Q || !V.children || !Q.children)
        return;
      const re = V.children[X];
      if (!re)
        return;
      let U = f.layout;
      const x = V.children.filter(
        (L, A) => A !== X
      ), D = J(
        U,
        Y,
        {
          children: x,
          selected: Math.min(
            V.selected || 0,
            x.length - 1
          )
        }
      );
      if (!D) return;
      if (U = D, W === "center") {
        const L = J(
          U,
          w,
          {
            children: [...Q.children || [], re],
            selected: Q.children?.length || 0
          }
        );
        if (!L) return;
        U = L;
      } else {
        const L = Le(
          `${w}-split-${Date.now()}`,
          [re]
        ), A = Re(U, w);
        if (A) {
          const q = A.children?.findIndex(
            (y) => y.id === w
          ) || 0;
          if (W === "left" || W === "right") {
            const y = Be(`${w}-row-${Date.now()}`, [
              W === "left" ? L : Q,
              W === "left" ? Q : L
            ]), Z = J(
              U,
              A.id,
              {
                children: [
                  ...A.children?.slice(0, q) || [],
                  y,
                  ...A.children?.slice(q + 1) || []
                ]
              }
            );
            if (!Z) return;
            U = Z;
          } else if (W === "top" || W === "bottom") {
            const y = Ke(
              `${w}-column-${Date.now()}`,
              [
                W === "top" ? L : Q,
                W === "top" ? Q : L
              ]
            ), Z = J(
              U,
              A.id,
              {
                children: [
                  ...A.children?.slice(0, q) || [],
                  y,
                  ...A.children?.slice(q + 1) || []
                ]
              }
            );
            if (!Z) return;
            U = Z;
          }
        }
      }
      const k = ge(U);
      k && z({
        ...f,
        layout: k,
        metadata: f.metadata
      }), r(null), s(null);
    },
    []
    // No dependencies - uses refs
  );
  return {
    draggedTab: n,
    dragOverTabset: l,
    dropPosition: i,
    dropTargetIndex: o,
    handleDragStart: O,
    handleDragEnd: N,
    handleDragOver: B,
    handleDragLeave: u,
    handleDrop: S
  };
}, Je = "react-flex-layout";
class Ee {
  storageKey;
  autoSave;
  debounceMs;
  saveTimeout = null;
  lastSavedString = null;
  isAvailable;
  constructor(t = {}) {
    this.storageKey = `${Je}-${t.key || "default"}`, this.autoSave = t.autoSave !== !1, this.debounceMs = t.debounceMs || 500, this.isAvailable = Xe();
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
const tt = (e) => new Ee(e), Xe = () => {
  try {
    const e = "__localStorage_test__";
    return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
  } catch {
    return !1;
  }
}, Ue = (e, t = {}) => {
  const { onLoad: n, onSave: r, onError: l, ...s } = t, i = p(null), [h, o] = le(e), [d, g] = le(!1), [b, m] = le(!1);
  F(() => {
    if (i.current)
      try {
        i.current.cancel?.();
      } catch {
      }
    i.current = new Ee(s), m(!0);
  }, [s.key, s.autoSave, s.debounceMs]), F(() => {
    if (!i.current || d) return;
    const f = i.current.load();
    f ? (o(f), g(!0), n?.(f)) : g(!0);
  }, [d, n]);
  const I = p(), R = ie(
    () => JSON.stringify(h.layout),
    [h.layout]
  ), O = ie(
    () => JSON.stringify(e.layout),
    [e.layout]
  ), N = ie(
    () => h.metadata ? JSON.stringify(h.metadata) : void 0,
    [h.metadata]
  ), B = ie(
    () => e.metadata ? JSON.stringify(e.metadata) : void 0,
    [e.metadata]
  );
  F(() => {
    if (!(!d || !i.current)) {
      if (I.current !== O && R !== O) {
        const f = { ...e };
        e.global && (f.global = { ...e.global }), o(f), I.current = O, i.current.isAutoSaveEnabled() ? i.current.debouncedSave(f) : i.current.save(f);
        return;
      }
      e.metadata && N !== B && o((f) => ({
        ...f,
        metadata: e.metadata
      }));
    }
  }, [
    d,
    i,
    e,
    R,
    O,
    N,
    B
  ]);
  const u = C(
    (f) => {
      if (i.current)
        try {
          i.current.isAutoSaveEnabled() ? i.current.debouncedSave(f) : i.current.save(f), r?.(f);
        } catch (z) {
          l?.(z);
        }
    },
    [r, l]
  ), S = C(
    (f) => {
      const z = { ...f };
      f.global && (z.global = { ...f.global }), o(z), u(z);
    },
    [u]
  ), v = C(() => {
    if (i.current)
      try {
        i.current.clear();
      } catch (f) {
        l?.(f);
      }
  }, [l]), w = C(() => i.current?.exists() ?? !1, []), T = C(() => i.current?.getStorageKey() ?? "", []);
  return {
    model: h,
    updateModel: S,
    clearStorage: v,
    hasStoredData: w,
    getStorageKey: T,
    isLoaded: d,
    hasStorage: b
  };
}, qe = Oe(
  ({
    model: e,
    factory: t,
    onModelChange: n,
    onAction: r,
    className: l = "",
    style: s = {},
    storage: i,
    closeIcon: h,
    closeButtonClassName: o
  }, d) => {
    const [g, b] = le(e), [m, I] = le(
      null
    ), {
      model: R,
      updateModel: O,
      isLoaded: N
    } = Ue(e, {
      key: i?.key,
      autoSave: i?.autoSave,
      debounceMs: i?.debounceMs,
      onLoad: (a) => {
        n ? n(a) : b(a);
      }
    }), B = i?.enabled ? R : n ? e : g, u = p(n), S = p(i), v = p(O);
    F(() => {
      u.current = n;
    }, [n]), F(() => {
      S.current = i;
    }, [i]), F(() => {
      v.current = O;
    }, [O]);
    const w = C(
      (a) => {
        S.current?.enabled ? (v.current(a), u.current && u.current(a)) : u.current ? u.current(a) : b(a);
      },
      []
      // No dependencies - uses refs
    ), { handleResize: T, resetResize: f } = _e(
      B,
      w
    ), {
      dragOverTabset: z,
      dropPosition: W,
      dropTargetIndex: M,
      handleDragStart: Y,
      handleDragEnd: X,
      handleDragOver: V,
      handleDragLeave: Q,
      handleDrop: re
    } = je(B, w), U = p(R);
    F(() => {
      U.current = R;
    }, [R]);
    const x = p(g);
    F(() => {
      x.current = g;
    }, [g]);
    const D = p(e);
    F(() => {
      D.current = e;
    }, [e]);
    const k = p(r);
    F(() => {
      k.current = r;
    }, [r]);
    const L = C(
      (a) => {
        if (S.current?.enabled) {
          const $ = U.current;
          if (a.type === "changeDirection") {
            const { direction: c } = a.payload;
            I(c);
          }
          const H = ((c) => {
            switch (a.type) {
              case "selectTab":
                const { nodeId: P, tabIndex: ee } = a.payload, te = J(c.layout, P, {
                  selected: ee
                });
                return !te || te === c.layout ? c : {
                  ...c,
                  layout: te
                };
              case "removeNode":
                const { nodeId: K, tabIndex: ce } = a.payload, G = ne(c.layout, K);
                if (G && G.children) {
                  const j = G.children.filter(
                    (fe, Te) => Te !== ce
                  ), se = G.selected ?? 0;
                  let oe = se;
                  ce <= se && (oe = Math.max(0, se - 1)), oe = Math.min(
                    oe,
                    j.length - 1
                  );
                  const Se = {
                    ...G,
                    children: j,
                    selected: j.length > 0 ? oe : void 0
                  }, ye = J(
                    c.layout,
                    K,
                    Se
                  );
                  if (ye) {
                    const fe = ge(ye);
                    if (fe)
                      return {
                        ...c,
                        layout: fe
                      };
                  }
                }
                return c;
              case "closeTabset":
                const { nodeId: ve } = a.payload, ue = J(
                  c.layout,
                  ve,
                  null
                );
                if (ue) {
                  const j = ge(ue);
                  if (j)
                    return {
                      ...c,
                      layout: j
                    };
                }
                return c;
              case "changeDirection":
                const { direction: me } = a.payload;
                return {
                  ...c,
                  global: {
                    ...c.global,
                    direction: me
                  }
                };
              default:
                return c;
            }
          })($);
          v.current(H), u.current && u.current(H), k.current?.(a);
        } else {
          if (a.type === "changeDirection" && u.current) {
            const { direction: $ } = a.payload, _ = D.current, H = {
              ..._,
              global: {
                ..._.global,
                direction: $
              }
            };
            u.current(H);
          }
          k.current?.(a);
        }
        if (!S.current?.enabled && !u.current) {
          const $ = x.current, H = ((c) => {
            switch (a.type) {
              case "selectTab":
                const { nodeId: P, tabIndex: ee } = a.payload, te = J(c.layout, P, {
                  selected: ee
                });
                return !te || te === c.layout ? c : {
                  ...c,
                  layout: te
                };
              case "removeNode":
                const { nodeId: K, tabIndex: ce } = a.payload, G = ne(c.layout, K);
                if (G && G.children) {
                  const j = G.children.filter(
                    (fe, Te) => Te !== ce
                  ), se = G.selected ?? 0;
                  let oe = se;
                  ce <= se && (oe = Math.max(0, se - 1)), oe = Math.min(
                    oe,
                    j.length - 1
                  );
                  const Se = {
                    ...G,
                    children: j,
                    selected: j.length > 0 ? oe : void 0
                  }, ye = J(
                    c.layout,
                    K,
                    Se
                  );
                  if (ye) {
                    const fe = ge(ye);
                    if (fe)
                      return {
                        ...c,
                        layout: fe
                      };
                  }
                }
                return c;
              case "closeTabset":
                const { nodeId: ve } = a.payload, ue = J(
                  c.layout,
                  ve,
                  null
                );
                if (ue) {
                  const j = ge(ue);
                  if (j)
                    return {
                      ...c,
                      layout: j
                    };
                }
                return c;
              case "changeDirection":
                const { direction: me } = a.payload;
                return {
                  ...c,
                  global: {
                    ...c.global,
                    direction: me
                  }
                };
              default:
                return c;
            }
          })($);
          b(H);
        }
      },
      []
      // No dependencies - uses refs
    );
    We(
      d,
      () => ({
        handleAction: L
      }),
      [L]
    );
    const A = C(
      (a, $) => {
        L({
          type: "selectTab",
          payload: { nodeId: a, tabIndex: $ }
        });
      },
      [L]
    ), q = C(
      (a, $) => {
        L({
          type: "removeNode",
          payload: { nodeId: a, tabIndex: $ }
        });
      },
      [L]
    );
    let y;
    i?.enabled ? m !== null ? y = m : y = R?.global?.direction || "ltr" : y = B.global?.direction || "ltr";
    const Z = B.global?.splitterSize || 8, de = C(
      (a) => {
        switch (a.type) {
          case "tabset":
            return /* @__PURE__ */ E(
              we,
              {
                node: a,
                factory: t,
                onTabSelect: A,
                onTabClose: q,
                onTabDragStart: Y,
                onTabDragEnd: X,
                onDragOver: V,
                onDragLeave: Q,
                onDrop: re,
                dragOverTabset: z,
                dropPosition: z === a.id ? W : void 0,
                dropTargetIndex: z === a.id ? M : void 0,
                direction: y,
                closeIcon: h,
                closeButtonClassName: o
              },
              a.id
            );
          case "row":
            const $ = y === "rtl", _ = a.children || [], H = $ ? [..._].reverse() : _;
            return /* @__PURE__ */ E(
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
                children: H.map((c, P) => {
                  const ee = P + 1;
                  if (!(ee < H.length))
                    return /* @__PURE__ */ E(xe.Fragment, { children: de(c) }, c.id);
                  const K = $ ? _.length - 1 - P : P, ce = $ ? _.length - 1 - ee : ee, G = Math.min(
                    K,
                    ce
                  );
                  if (Math.max(
                    K,
                    ce
                  ) !== G + 1)
                    return /* @__PURE__ */ E(xe.Fragment, { children: de(c) }, c.id);
                  const ue = _[G], me = $ && K > ce;
                  return /* @__PURE__ */ he(xe.Fragment, { children: [
                    de(c),
                    /* @__PURE__ */ E(
                      De,
                      {
                        direction: "horizontal",
                        onResize: (j) => {
                          const se = me ? -j : j;
                          T(
                            ue.id,
                            se,
                            "horizontal"
                          );
                        },
                        onResizeStart: () => {
                          f(ue.id, "horizontal");
                        },
                        size: Z
                      }
                    )
                  ] }, c.id);
                })
              },
              a.id
            );
          case "column":
            return /* @__PURE__ */ E(
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
                children: a.children?.map((c, P) => /* @__PURE__ */ he(xe.Fragment, { children: [
                  de(c),
                  P < (a.children?.length || 0) - 1 && /* @__PURE__ */ E(
                    De,
                    {
                      direction: "vertical",
                      onResize: (ee) => T(c.id, ee, "vertical"),
                      onResizeStart: () => {
                        f(c.id, "vertical");
                      },
                      size: Z
                    }
                  )
                ] }, c.id))
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
        y,
        Z,
        t,
        A,
        q,
        T,
        Y,
        X,
        V,
        Q,
        re,
        z,
        W,
        h,
        o
      ]
    );
    F(() => {
      !i?.enabled && m !== null && I(null);
    }, [i?.enabled, m]), F(() => {
      i?.enabled && m !== null && (R?.global?.direction || "ltr") === m && I(null);
    }, [i?.enabled, m, R?.global?.direction]);
    const be = ie(
      () => de(B.layout),
      [de, B.layout]
    ), ae = {
      ...s,
      height: "100%",
      width: "100%"
    };
    return i?.enabled && !N ? /* @__PURE__ */ E(
      "div",
      {
        className: `react-flex-layout ${l}`,
        style: {
          ...ae,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ E("div", { children: "Loading layout..." })
      }
    ) : /* @__PURE__ */ E(
      "div",
      {
        className: `react-flex-layout ${l}`,
        style: ae,
        dir: y,
        children: be
      }
    );
  }
);
qe.displayName = "Layout";
const Ye = Ie(Ce, (e, t) => !(e.className !== t.className || e.style !== t.style || e.closeIcon !== t.closeIcon || e.closeButtonClassName !== t.closeButtonClassName || e.index !== t.index || e.onSelect !== t.onSelect || e.onClose !== t.onClose || e.onDragStart !== t.onDragStart || e.onDragEnd !== t.onDragEnd || e.node.id !== t.node.id || e.node.name !== t.node.name));
Ye.displayName = "MemoizedTab";
export {
  Ae as DefaultCloseIcon,
  qe as Layout,
  Ee as LayoutStorage,
  Ye as MemoizedTab,
  we as MemoizedTabSet,
  De as Splitter,
  Ce as Tab,
  ke as TabSet,
  Me as addTabToTabset,
  Ne as calculateFlexValues,
  Ke as createColumn,
  Qe as createLayoutModel,
  tt as createLayoutStorage,
  Be as createRow,
  Fe as createTab,
  Le as createTabSet,
  ne as findNodeById,
  Xe as isLocalStorageAvailable,
  ge as removeEmptyTabsets,
  pe as removeNodeById,
  Ze as removeTab,
  Pe as restoreTab,
  et as tabExists,
  J as updateNodeById,
  Ue as useLayoutStorage
};
