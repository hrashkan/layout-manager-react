import ue, { useCallback as k, useMemo as _r, useState as ie, useRef as He, memo as Ue } from "react";
var xe = { exports: {} }, ne = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ze;
function Tr() {
  if (ze)
    return ne;
  ze = 1;
  var r = ue, a = Symbol.for("react.element"), s = Symbol.for("react.fragment"), l = Object.prototype.hasOwnProperty, p = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, E = { key: !0, ref: !0, __self: !0, __source: !0 };
  function d(w, c, S) {
    var m, _ = {}, b = null, W = null;
    S !== void 0 && (b = "" + S), c.key !== void 0 && (b = "" + c.key), c.ref !== void 0 && (W = c.ref);
    for (m in c)
      l.call(c, m) && !E.hasOwnProperty(m) && (_[m] = c[m]);
    if (w && w.defaultProps)
      for (m in c = w.defaultProps, c)
        _[m] === void 0 && (_[m] = c[m]);
    return { $$typeof: a, type: w, key: b, ref: W, props: _, _owner: p.current };
  }
  return ne.Fragment = s, ne.jsx = d, ne.jsxs = d, ne;
}
var ae = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ye;
function Sr() {
  return Ye || (Ye = 1, process.env.NODE_ENV !== "production" && function() {
    var r = ue, a = Symbol.for("react.element"), s = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), p = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), w = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), W = Symbol.for("react.offscreen"), v = Symbol.iterator, T = "@@iterator";
    function N(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = v && e[v] || e[T];
      return typeof t == "function" ? t : null;
    }
    var P = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function y(e) {
      {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          n[o - 1] = arguments[o];
        Y("error", e, n);
      }
    }
    function Y(e, t, n) {
      {
        var o = P.ReactDebugCurrentFrame, g = o.getStackAddendum();
        g !== "" && (t += "%s", n = n.concat([g]));
        var R = n.map(function(h) {
          return String(h);
        });
        R.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, R);
      }
    }
    var i = !1, F = !1, C = !1, j = !1, $ = !1, u;
    u = Symbol.for("react.module.reference");
    function x(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === l || e === E || $ || e === p || e === S || e === m || j || e === W || i || F || C || typeof e == "object" && e !== null && (e.$$typeof === b || e.$$typeof === _ || e.$$typeof === d || e.$$typeof === w || e.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === u || e.getModuleId !== void 0));
    }
    function M(e, t, n) {
      var o = e.displayName;
      if (o)
        return o;
      var g = t.displayName || t.name || "";
      return g !== "" ? n + "(" + g + ")" : n;
    }
    function q(e) {
      return e.displayName || "Context";
    }
    function I(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case l:
          return "Fragment";
        case s:
          return "Portal";
        case E:
          return "Profiler";
        case p:
          return "StrictMode";
        case S:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case w:
            var t = e;
            return q(t) + ".Consumer";
          case d:
            var n = e;
            return q(n._context) + ".Provider";
          case c:
            return M(e, e.render, "ForwardRef");
          case _:
            var o = e.displayName || null;
            return o !== null ? o : I(e.type) || "Memo";
          case b: {
            var g = e, R = g._payload, h = g._init;
            try {
              return I(h(R));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var U = Object.assign, A = 0, J, B, X, K, Ee, we, _e;
    function Te() {
    }
    Te.__reactDisabledLog = !0;
    function Ge() {
      {
        if (A === 0) {
          J = console.log, B = console.info, X = console.warn, K = console.error, Ee = console.group, we = console.groupCollapsed, _e = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Te,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        A++;
      }
    }
    function Ze() {
      {
        if (A--, A === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: U({}, e, {
              value: J
            }),
            info: U({}, e, {
              value: B
            }),
            warn: U({}, e, {
              value: X
            }),
            error: U({}, e, {
              value: K
            }),
            group: U({}, e, {
              value: Ee
            }),
            groupCollapsed: U({}, e, {
              value: we
            }),
            groupEnd: U({}, e, {
              value: _e
            })
          });
        }
        A < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var fe = P.ReactCurrentDispatcher, de;
    function le(e, t, n) {
      {
        if (de === void 0)
          try {
            throw Error();
          } catch (g) {
            var o = g.stack.trim().match(/\n( *(at )?)/);
            de = o && o[1] || "";
          }
        return `
` + de + e;
      }
    }
    var he = !1, se;
    {
      var Qe = typeof WeakMap == "function" ? WeakMap : Map;
      se = new Qe();
    }
    function Se(e, t) {
      if (!e || he)
        return "";
      {
        var n = se.get(e);
        if (n !== void 0)
          return n;
      }
      var o;
      he = !0;
      var g = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var R;
      R = fe.current, fe.current = null, Ge();
      try {
        if (t) {
          var h = function() {
            throw Error();
          };
          if (Object.defineProperty(h.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(h, []);
            } catch (H) {
              o = H;
            }
            Reflect.construct(e, [], h);
          } else {
            try {
              h.call();
            } catch (H) {
              o = H;
            }
            e.call(h.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (H) {
            o = H;
          }
          e();
        }
      } catch (H) {
        if (H && o && typeof H.stack == "string") {
          for (var f = H.stack.split(`
`), z = o.stack.split(`
`), O = f.length - 1, D = z.length - 1; O >= 1 && D >= 0 && f[O] !== z[D]; )
            D--;
          for (; O >= 1 && D >= 0; O--, D--)
            if (f[O] !== z[D]) {
              if (O !== 1 || D !== 1)
                do
                  if (O--, D--, D < 0 || f[O] !== z[D]) {
                    var V = `
` + f[O].replace(" at new ", " at ");
                    return e.displayName && V.includes("<anonymous>") && (V = V.replace("<anonymous>", e.displayName)), typeof e == "function" && se.set(e, V), V;
                  }
                while (O >= 1 && D >= 0);
              break;
            }
        }
      } finally {
        he = !1, fe.current = R, Ze(), Error.prepareStackTrace = g;
      }
      var ee = e ? e.displayName || e.name : "", G = ee ? le(ee) : "";
      return typeof e == "function" && se.set(e, G), G;
    }
    function er(e, t, n) {
      return Se(e, !1);
    }
    function rr(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function oe(e, t, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Se(e, rr(e));
      if (typeof e == "string")
        return le(e);
      switch (e) {
        case S:
          return le("Suspense");
        case m:
          return le("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case c:
            return er(e.render);
          case _:
            return oe(e.type, t, n);
          case b: {
            var o = e, g = o._payload, R = o._init;
            try {
              return oe(R(g), t, n);
            } catch {
            }
          }
        }
      return "";
    }
    var re = Object.prototype.hasOwnProperty, je = {}, Ce = P.ReactDebugCurrentFrame;
    function ce(e) {
      if (e) {
        var t = e._owner, n = oe(e.type, e._source, t ? t.type : null);
        Ce.setExtraStackFrame(n);
      } else
        Ce.setExtraStackFrame(null);
    }
    function tr(e, t, n, o, g) {
      {
        var R = Function.call.bind(re);
        for (var h in e)
          if (R(e, h)) {
            var f = void 0;
            try {
              if (typeof e[h] != "function") {
                var z = Error((o || "React class") + ": " + n + " type `" + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[h] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw z.name = "Invariant Violation", z;
              }
              f = e[h](t, h, o, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (O) {
              f = O;
            }
            f && !(f instanceof Error) && (ce(g), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", n, h, typeof f), ce(null)), f instanceof Error && !(f.message in je) && (je[f.message] = !0, ce(g), y("Failed %s type: %s", n, f.message), ce(null));
          }
      }
    }
    var nr = Array.isArray;
    function ve(e) {
      return nr(e);
    }
    function ar(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function ir(e) {
      try {
        return Oe(e), !1;
      } catch {
        return !0;
      }
    }
    function Oe(e) {
      return "" + e;
    }
    function $e(e) {
      if (ir(e))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ar(e)), Oe(e);
    }
    var te = P.ReactCurrentOwner, lr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, De, Pe, ge;
    ge = {};
    function sr(e) {
      if (re.call(e, "ref")) {
        var t = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function or(e) {
      if (re.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function cr(e, t) {
      if (typeof e.ref == "string" && te.current && t && te.current.stateNode !== t) {
        var n = I(te.current.type);
        ge[n] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', I(te.current.type), e.ref), ge[n] = !0);
      }
    }
    function ur(e, t) {
      {
        var n = function() {
          De || (De = !0, y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function fr(e, t) {
      {
        var n = function() {
          Pe || (Pe = !0, y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var dr = function(e, t, n, o, g, R, h) {
      var f = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: e,
        key: t,
        ref: n,
        props: h,
        // Record the component responsible for creating this element.
        _owner: R
      };
      return f._store = {}, Object.defineProperty(f._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(f, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.defineProperty(f, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: g
      }), Object.freeze && (Object.freeze(f.props), Object.freeze(f)), f;
    };
    function hr(e, t, n, o, g) {
      {
        var R, h = {}, f = null, z = null;
        n !== void 0 && ($e(n), f = "" + n), or(t) && ($e(t.key), f = "" + t.key), sr(t) && (z = t.ref, cr(t, g));
        for (R in t)
          re.call(t, R) && !lr.hasOwnProperty(R) && (h[R] = t[R]);
        if (e && e.defaultProps) {
          var O = e.defaultProps;
          for (R in O)
            h[R] === void 0 && (h[R] = O[R]);
        }
        if (f || z) {
          var D = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          f && ur(h, D), z && fr(h, D);
        }
        return dr(e, f, z, g, o, te.current, h);
      }
    }
    var me = P.ReactCurrentOwner, ke = P.ReactDebugCurrentFrame;
    function Q(e) {
      if (e) {
        var t = e._owner, n = oe(e.type, e._source, t ? t.type : null);
        ke.setExtraStackFrame(n);
      } else
        ke.setExtraStackFrame(null);
    }
    var pe;
    pe = !1;
    function be(e) {
      return typeof e == "object" && e !== null && e.$$typeof === a;
    }
    function Fe() {
      {
        if (me.current) {
          var e = I(me.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function vr(e) {
      {
        if (e !== void 0) {
          var t = e.fileName.replace(/^.*[\\\/]/, ""), n = e.lineNumber;
          return `

Check your code at ` + t + ":" + n + ".";
        }
        return "";
      }
    }
    var We = {};
    function gr(e) {
      {
        var t = Fe();
        if (!t) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (t = `

Check the top-level render call using <` + n + ">.");
        }
        return t;
      }
    }
    function Ne(e, t) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = gr(t);
        if (We[n])
          return;
        We[n] = !0;
        var o = "";
        e && e._owner && e._owner !== me.current && (o = " It was passed a child from " + I(e._owner.type) + "."), Q(e), y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, o), Q(null);
      }
    }
    function Ae(e, t) {
      {
        if (typeof e != "object")
          return;
        if (ve(e))
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            be(o) && Ne(o, t);
          }
        else if (be(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var g = N(e);
          if (typeof g == "function" && g !== e.entries)
            for (var R = g.call(e), h; !(h = R.next()).done; )
              be(h.value) && Ne(h.value, t);
        }
      }
    }
    function mr(e) {
      {
        var t = e.type;
        if (t == null || typeof t == "string")
          return;
        var n;
        if (typeof t == "function")
          n = t.propTypes;
        else if (typeof t == "object" && (t.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        t.$$typeof === _))
          n = t.propTypes;
        else
          return;
        if (n) {
          var o = I(t);
          tr(n, e.props, "prop", o, e);
        } else if (t.PropTypes !== void 0 && !pe) {
          pe = !0;
          var g = I(t);
          y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", g || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function pr(e) {
      {
        for (var t = Object.keys(e.props), n = 0; n < t.length; n++) {
          var o = t[n];
          if (o !== "children" && o !== "key") {
            Q(e), y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), Q(null);
            break;
          }
        }
        e.ref !== null && (Q(e), y("Invalid attribute `ref` supplied to `React.Fragment`."), Q(null));
      }
    }
    var Ie = {};
    function Le(e, t, n, o, g, R) {
      {
        var h = x(e);
        if (!h) {
          var f = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (f += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var z = vr(g);
          z ? f += z : f += Fe();
          var O;
          e === null ? O = "null" : ve(e) ? O = "array" : e !== void 0 && e.$$typeof === a ? (O = "<" + (I(e.type) || "Unknown") + " />", f = " Did you accidentally export a JSX literal instead of a component?") : O = typeof e, y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", O, f);
        }
        var D = hr(e, t, n, g, R);
        if (D == null)
          return D;
        if (h) {
          var V = t.children;
          if (V !== void 0)
            if (o)
              if (ve(V)) {
                for (var ee = 0; ee < V.length; ee++)
                  Ae(V[ee], e);
                Object.freeze && Object.freeze(V);
              } else
                y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ae(V, e);
        }
        if (re.call(t, "key")) {
          var G = I(e), H = Object.keys(t).filter(function(wr) {
            return wr !== "key";
          }), ye = H.length > 0 ? "{key: someKey, " + H.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ie[G + ye]) {
            var Er = H.length > 0 ? "{" + H.join(": ..., ") + ": ...}" : "{}";
            y(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ye, G, Er, G), Ie[G + ye] = !0;
          }
        }
        return e === l ? pr(D) : mr(D), D;
      }
    }
    function br(e, t, n) {
      return Le(e, t, n, !0);
    }
    function yr(e, t, n) {
      return Le(e, t, n, !1);
    }
    var xr = yr, Rr = br;
    ae.Fragment = l, ae.jsx = xr, ae.jsxs = Rr;
  }()), ae;
}
process.env.NODE_ENV === "production" ? xe.exports = Tr() : xe.exports = Sr();
var L = xe.exports;
const Ve = ({
  node: r,
  index: a,
  onClose: s,
  onSelect: l,
  onDragStart: p,
  onDragEnd: E,
  className: d = "",
  style: w = {}
}) => {
  const c = k(() => {
    l == null || l(r.id);
  }, [r.id, l]), S = k(
    (b) => {
      b.stopPropagation(), s == null || s(r.id);
    },
    [r.id, s]
  ), m = k(
    (b) => {
      b.dataTransfer.setData("text/plain", r.id), b.dataTransfer.effectAllowed = "move", b.currentTarget.classList.add("dragging"), document.body.classList.add("dragging"), p == null || p(r.id, a);
    },
    [r.id, a, p]
  ), _ = k(
    (b) => {
      b.currentTarget.classList.remove("dragging"), document.body.classList.remove("dragging"), E == null || E();
    },
    [E]
  );
  return /* @__PURE__ */ L.jsxs(
    "div",
    {
      className: `react-flex-layout-tab ${d}`,
      style: { ...w, cursor: "grab" },
      onClick: c,
      draggable: !0,
      onDragStart: m,
      onDragEnd: _,
      children: [
        /* @__PURE__ */ L.jsx("span", { className: "react-flex-layout-tab-title", children: r.name || "Untitled" }),
        r.enableClose !== !1 && /* @__PURE__ */ L.jsx(
          "button",
          {
            className: "react-flex-layout-tab-close",
            onClick: S,
            type: "button",
            "aria-label": "Close tab",
            children: "×"
          }
        )
      ]
    }
  );
};
const Be = ({
  node: r,
  children: a,
  factory: s,
  onTabSelect: l,
  onTabClose: p,
  onTabDragStart: E,
  onTabDragEnd: d,
  onDragOver: w,
  onDragLeave: c,
  onDrop: S,
  dragOverTabset: m,
  dropPosition: _,
  className: b = "",
  style: W = {}
}) => {
  const v = _r(() => {
    var u;
    return ((u = r.children) == null ? void 0 : u.filter((x) => x.type === "tab")) || [];
  }, [r.children]), T = r.selected ?? 0, N = v[T], P = k(
    (u) => {
      const x = v.findIndex((M) => M.id === u);
      x !== -1 && (l == null || l(r.id, x));
    },
    [r.id, v, l]
  ), y = k(
    (u) => {
      const x = v.findIndex((M) => M.id === u);
      x !== -1 && (p == null || p(r.id, x));
    },
    [r.id, v, p]
  ), Y = k(
    (u, x) => {
      console.log("TABSET DRAG START:", r.id, u, x);
      const M = x !== void 0 ? x : v.findIndex((q) => q.id === u);
      M !== -1 && (E == null || E(r.id, M));
    },
    [r.id, v, E]
  ), i = k(
    (u) => {
      u.preventDefault(), u.dataTransfer.dropEffect = "move";
      const x = u.currentTarget.getBoundingClientRect(), M = u.clientX - x.left, q = u.clientY - x.top, I = x.width, U = x.height;
      let A = "center";
      M < I * 0.25 ? A = "left" : M > I * 0.75 ? A = "right" : q < U * 0.25 ? A = "top" : q > U * 0.75 ? A = "bottom" : A = "center", w == null || w(u, r.id, A);
    },
    [r.id, w]
  ), F = k(
    (u) => {
      c == null || c(u);
    },
    [c]
  ), C = k(
    (u) => {
      S == null || S(u, r.id);
    },
    [r.id, S]
  ), j = m === r.id, $ = {
    ...W,
    width: r.width ? `${r.width}%` : void 0,
    height: r.height ? `${r.height}%` : void 0,
    flex: `${r.flex || 1} 1 0%`,
    minWidth: r.minWidth ? `${r.minWidth}px` : void 0,
    minHeight: r.minHeight ? `${r.minHeight}px` : void 0,
    maxWidth: r.maxWidth ? `${r.maxWidth}px` : void 0,
    maxHeight: r.maxHeight ? `${r.maxHeight}px` : void 0
  };
  return v.length === 0 ? null : /* @__PURE__ */ L.jsxs(
    "div",
    {
      className: `react-flex-layout-tabset ${j ? "drag-over" : ""} ${b}`,
      style: $,
      "data-drop-position": j ? _ : void 0,
      onDragOver: i,
      onDragLeave: F,
      onDrop: C,
      children: [
        /* @__PURE__ */ L.jsx("div", { className: "react-flex-layout-tabset-header", children: v.map((u, x) => /* @__PURE__ */ L.jsx(
          Ve,
          {
            node: u,
            index: x,
            onSelect: P,
            onClose: y,
            onDragStart: Y,
            onDragEnd: d,
            className: x === T ? "active" : ""
          },
          u.id
        )) }),
        /* @__PURE__ */ L.jsx("div", { className: "react-flex-layout-tabset-content", children: N && (s ? s(N) : a) })
      ]
    }
  );
};
const Me = ({
  direction: r,
  onResize: a,
  size: s = 8,
  className: l = "",
  style: p = {}
}) => {
  const [E, d] = ie(!1), w = He(0), c = k(
    (m) => {
      m.preventDefault(), m.stopPropagation(), d(!0), w.current = r === "horizontal" ? m.clientX : m.clientY;
      const _ = (W) => {
        const T = (r === "horizontal" ? W.clientX : W.clientY) - w.current;
        a(T);
      }, b = () => {
        d(!1), document.removeEventListener("mousemove", _), document.removeEventListener("mouseup", b);
      };
      document.addEventListener("mousemove", _), document.addEventListener("mouseup", b);
    },
    [r, a]
  ), S = {
    ...p,
    width: r === "horizontal" ? `${s}px` : "100%",
    height: r === "vertical" ? `${s}px` : "100%",
    minWidth: r === "horizontal" ? `${s}px` : void 0,
    minHeight: r === "vertical" ? `${s}px` : void 0,
    flexShrink: 0,
    cursor: r === "horizontal" ? "col-resize" : "row-resize",
    backgroundColor: E ? "#007acc" : "#e1e1e1",
    transition: E ? "none" : "background-color 0.2s ease"
  };
  return /* @__PURE__ */ L.jsx(
    "div",
    {
      className: `react-flex-layout-splitter ${l}`,
      style: S,
      onMouseDown: c
    }
  );
}, Nr = (r) => ({
  global: {
    enableClose: !0,
    enableDrag: !0,
    enableResize: !0,
    splitterSize: 8,
    tabOverlapLength: 0
  },
  layout: r
}), Ar = (r, a, s, l) => ({
  id: r,
  type: "tab",
  component: a,
  name: s,
  config: l,
  enableClose: !0,
  enableDrag: !0
}), jr = (r, a, s = 0) => ({
  id: r,
  type: "tabset",
  children: a,
  selected: s,
  enableClose: !0,
  enableDrag: !0
}), Cr = (r, a, s, l) => ({
  id: r,
  type: "row",
  children: Je(a),
  width: s,
  height: l,
  enableResize: !0
}), Or = (r, a, s, l) => ({
  id: r,
  type: "column",
  children: Je(a),
  width: s,
  height: l,
  enableResize: !0
}), Re = (r, a) => {
  if (r.id === a)
    return r;
  if (r.children)
    for (const s of r.children) {
      const l = Re(s, a);
      if (l)
        return l;
    }
  return null;
}, qe = (r, a) => {
  if (!r.children)
    return null;
  for (const s of r.children)
    if (s.id === a)
      return r;
  for (const s of r.children) {
    const l = qe(s, a);
    if (l)
      return l;
  }
  return null;
}, Z = (r, a, s) => r.id === a ? { ...r, ...s } : r.children ? {
  ...r,
  children: r.children.map(
    (l) => Z(l, a, s)
  )
} : r, $r = (r, a) => {
  if (r.children) {
    const s = r.children.filter((l) => l.id !== a).map((l) => $r(l, a));
    return {
      ...r,
      children: s
    };
  }
  return r;
}, Je = (r) => r.map((a) => ({
  ...a,
  flex: a.flex || 1 / r.length
})), Dr = (r, a) => ({ handleResize: k(
  (l, p, E) => {
    if (!a)
      return;
    const d = Ke(r.layout, l);
    if (!d || !d.children)
      return;
    const w = d.children.findIndex(
      ($) => $.id === l
    ), c = w + 1;
    if (c >= d.children.length)
      return;
    const S = d.children[w], m = d.children[c], _ = E === "horizontal" ? window.innerWidth : window.innerHeight, b = S.flex || 1, W = m.flex || 1, v = b + W, T = b / v * _, N = W / v * _, P = 100, y = Math.max(P, T + p), Y = Math.max(P, N - p), i = y + Y, F = y / i * v, C = Y / i * v, j = Z(r.layout, d.id, {
      children: d.children.map(($, u) => u === w ? { ...$, flex: F } : u === c ? { ...$, flex: C } : $)
    });
    a({
      ...r,
      layout: j
    });
  },
  [r, a]
) }), Ke = (r, a) => {
  if (!r.children)
    return null;
  for (const s of r.children) {
    if (s.id === a)
      return r;
    const l = Ke(s, a);
    if (l)
      return l;
  }
  return null;
};
function Xe(r) {
  if (r.type === "tabset" && (!r.children || r.children.length === 0))
    return null;
  if (r.type === "row" || r.type === "column") {
    if (!r.children)
      return r;
    const a = r.children.map((p) => Xe(p)).filter((p) => p !== null);
    if (a.length === 0)
      return null;
    if (a.length === 1)
      return {
        ...a[0],
        flex: 1
      };
    const s = 1 / a.length, l = a.map((p) => ({
      ...p,
      flex: s
    }));
    return {
      ...r,
      children: l
    };
  }
  return r;
}
const Pr = (r, a) => {
  const [s, l] = ie(null), [p, E] = ie(null), [d, w] = ie("center"), c = He(null), S = k((v, T) => {
    const N = { tabsetId: v, tabIndex: T };
    l(N), c.current = N;
  }, []), m = k(() => {
    l(null), c.current = null, E(null);
  }, []), _ = k(
    (v, T, N = "center") => {
      v.preventDefault(), v.dataTransfer.dropEffect = "move", E(T), w(N);
    },
    []
  ), b = k((v) => {
    v.currentTarget === v.target && setTimeout(() => {
      E(null);
    }, 50);
  }, []), W = k(
    (v, T) => {
      var u, x, M, q, I, U;
      v.preventDefault();
      const N = c.current;
      if (!N || !a)
        return;
      const { tabsetId: P, tabIndex: y } = N;
      if (P === T)
        return;
      const Y = Re(r.layout, P), i = Re(r.layout, T);
      if (!Y || !i || !Y.children || !i.children)
        return;
      const F = Y.children[y];
      if (!F)
        return;
      let C = r.layout;
      const j = Y.children.filter(
        (A, J) => J !== y
      );
      if (C = Z(C, P, {
        children: j,
        selected: Math.min(
          Y.selected || 0,
          j.length - 1
        )
      }), d === "center") {
        const A = { ...F, id: `${F.id}-${Date.now()}` };
        C = Z(C, T, {
          children: [...i.children || [], A],
          selected: ((u = i.children) == null ? void 0 : u.length) || 0
        });
      } else {
        const A = { ...F, id: `${F.id}-${Date.now()}` }, J = jr(
          `${T}-split-${Date.now()}`,
          [A]
        ), B = qe(C, T);
        if (B) {
          const X = ((x = B.children) == null ? void 0 : x.findIndex(
            (K) => K.id === T
          )) || 0;
          if (d === "left" || d === "right") {
            const K = Cr(`${T}-row-${Date.now()}`, [
              d === "left" ? J : i,
              d === "left" ? i : J
            ]);
            C = Z(C, B.id, {
              children: [
                ...((M = B.children) == null ? void 0 : M.slice(0, X)) || [],
                K,
                ...((q = B.children) == null ? void 0 : q.slice(X + 1)) || []
              ]
            });
          } else if (d === "top" || d === "bottom") {
            const K = Or(
              `${T}-column-${Date.now()}`,
              [
                d === "top" ? J : i,
                d === "top" ? i : J
              ]
            );
            C = Z(C, B.id, {
              children: [
                ...((I = B.children) == null ? void 0 : I.slice(0, X)) || [],
                K,
                ...((U = B.children) == null ? void 0 : U.slice(X + 1)) || []
              ]
            });
          }
        }
      }
      const $ = Xe(C);
      $ && a({
        ...r,
        layout: $
      }), l(null), E(null);
    },
    [r, a, d]
  );
  return {
    draggedTab: s,
    dragOverTabset: p,
    dropPosition: d,
    handleDragStart: S,
    handleDragEnd: m,
    handleDragOver: _,
    handleDragLeave: b,
    handleDrop: W
  };
};
const Ir = ({
  model: r,
  factory: a,
  onModelChange: s,
  onAction: l,
  className: p = "",
  style: E = {}
}) => {
  const [d, w] = ie(r), c = s ? r : d, { handleResize: S } = Dr(c, s), {
    dragOverTabset: m,
    dropPosition: _,
    handleDragStart: b,
    handleDragEnd: W,
    handleDragOver: v,
    handleDragLeave: T,
    handleDrop: N
  } = Pr(c, s), P = k(
    (i) => {
      l == null || l(i), !s && w((F) => {
        switch (i.type) {
          case "selectTab":
            const { nodeId: C, tabIndex: j } = i.payload;
            return {
              ...F,
              layout: Z(F.layout, C, {
                selected: j
              })
            };
          default:
            return F;
        }
      });
    },
    [l, s]
  ), y = k(
    (i) => {
      var F, C;
      switch (i.type) {
        case "tabset":
          return /* @__PURE__ */ L.jsx(
            Be,
            {
              node: i,
              factory: a,
              onTabSelect: (j, $) => {
                P({
                  type: "selectTab",
                  payload: { nodeId: j, tabIndex: $ }
                });
              },
              onTabClose: (j, $) => {
                P({
                  type: "removeNode",
                  payload: { nodeId: j, tabIndex: $ }
                });
              },
              onTabDragStart: b,
              onTabDragEnd: W,
              onDragOver: v,
              onDragLeave: T,
              onDrop: N,
              dragOverTabset: m,
              dropPosition: m === i.id ? _ : void 0
            },
            i.id
          );
        case "row":
          return /* @__PURE__ */ L.jsx(
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
              children: (F = i.children) == null ? void 0 : F.map((j, $) => {
                var u;
                return /* @__PURE__ */ L.jsxs(ue.Fragment, { children: [
                  y(j),
                  $ < (((u = i.children) == null ? void 0 : u.length) || 0) - 1 && /* @__PURE__ */ L.jsx(
                    Me,
                    {
                      direction: "horizontal",
                      onResize: (x) => S(j.id, x, "horizontal"),
                      size: c.global.splitterSize || 8
                    }
                  )
                ] }, j.id);
              })
            },
            i.id
          );
        case "column":
          return /* @__PURE__ */ L.jsx(
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
              children: (C = i.children) == null ? void 0 : C.map((j, $) => {
                var u;
                return /* @__PURE__ */ L.jsxs(ue.Fragment, { children: [
                  y(j),
                  $ < (((u = i.children) == null ? void 0 : u.length) || 0) - 1 && /* @__PURE__ */ L.jsx(
                    Me,
                    {
                      direction: "vertical",
                      onResize: (x) => S(j.id, x, "vertical"),
                      size: c.global.splitterSize || 8
                    }
                  )
                ] }, j.id);
              })
            },
            i.id
          );
        case "tab":
          return a(i);
        default:
          return null;
      }
    },
    [
      c.global.splitterSize,
      a,
      P,
      S,
      b,
      W,
      v,
      T,
      N,
      m,
      _
    ]
  ), Y = {
    ...E,
    height: "100%",
    width: "100%"
  };
  return /* @__PURE__ */ L.jsx("div", { className: `react-flex-layout ${p}`, style: Y, children: y(c.layout) });
}, kr = Ue(Ve, (r, a) => r.node.id === a.node.id && r.node.name === a.node.name && r.node.enableClose === a.node.enableClose && r.node.enableDrag === a.node.enableDrag && r.className === a.className);
kr.displayName = "MemoizedTab";
const Fr = Ue(
  Be,
  (r, a) => {
    var s, l;
    return r.node.id === a.node.id && r.node.selected === a.node.selected && r.node.width === a.node.width && r.node.height === a.node.height && r.node.flex === a.node.flex && ((s = r.node.children) == null ? void 0 : s.length) === ((l = a.node.children) == null ? void 0 : l.length) && r.className === a.className;
  }
);
Fr.displayName = "MemoizedTabSet";
export {
  Ir as Layout,
  kr as MemoizedTab,
  Fr as MemoizedTabSet,
  Me as Splitter,
  Ve as Tab,
  Be as TabSet,
  Je as calculateFlexValues,
  Or as createColumn,
  Nr as createLayoutModel,
  Cr as createRow,
  Ar as createTab,
  jr as createTabSet,
  Re as findNodeById,
  $r as removeNodeById,
  Z as updateNodeById
};
