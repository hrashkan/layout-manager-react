var jt = Object.defineProperty;
var Ot = (t, r, a) => r in t ? jt(t, r, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[r] = a;
var Ie = (t, r, a) => (Ot(t, typeof r != "symbol" ? r + "" : r, a), a);
import Se, { useCallback as j, useMemo as Pe, memo as nt, useState as xe, useRef as Oe, useEffect as Le, forwardRef as Dt, useImperativeHandle as It } from "react";
var Ye = { exports: {} }, $e = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var et;
function $t() {
  if (et)
    return $e;
  et = 1;
  var t = Se, r = Symbol.for("react.element"), a = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, f = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function n(m, o, T) {
    var R, C = {}, x = null, k = null;
    T !== void 0 && (x = "" + T), o.key !== void 0 && (x = "" + o.key), o.ref !== void 0 && (k = o.ref);
    for (R in o)
      s.call(o, R) && !d.hasOwnProperty(R) && (C[R] = o[R]);
    if (m && m.defaultProps)
      for (R in o = m.defaultProps, o)
        C[R] === void 0 && (C[R] = o[R]);
    return { $$typeof: r, type: m, key: x, ref: k, props: C, _owner: f.current };
  }
  return $e.Fragment = a, $e.jsx = n, $e.jsxs = n, $e;
}
var ke = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tt;
function kt() {
  return tt || (tt = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Se, r = Symbol.for("react.element"), a = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), n = Symbol.for("react.provider"), m = Symbol.for("react.context"), o = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), q = Symbol.iterator, M = "@@iterator";
    function b(e) {
      if (e === null || typeof e != "object")
        return null;
      var i = q && e[q] || e[M];
      return typeof i == "function" ? i : null;
    }
    var y = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function u(e) {
      {
        for (var i = arguments.length, l = new Array(i > 1 ? i - 1 : 0), v = 1; v < i; v++)
          l[v - 1] = arguments[v];
        S("error", e, l);
      }
    }
    function S(e, i, l) {
      {
        var v = y.ReactDebugCurrentFrame, _ = v.getStackAddendum();
        _ !== "" && (i += "%s", l = l.concat([_]));
        var O = l.map(function(E) {
          return String(E);
        });
        O.unshift("Warning: " + i), Function.prototype.apply.call(console[e], console, O);
      }
    }
    var Y = !1, z = !1, V = !1, re = !1, A = !1, oe;
    oe = Symbol.for("react.module.reference");
    function pe(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === s || e === d || A || e === f || e === T || e === R || re || e === k || Y || z || V || typeof e == "object" && e !== null && (e.$$typeof === x || e.$$typeof === C || e.$$typeof === n || e.$$typeof === m || e.$$typeof === o || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === oe || e.getModuleId !== void 0));
    }
    function de(e, i, l) {
      var v = e.displayName;
      if (v)
        return v;
      var _ = i.displayName || i.name || "";
      return _ !== "" ? l + "(" + _ + ")" : l;
    }
    function ge(e) {
      return e.displayName || "Context";
    }
    function h(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && u("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case s:
          return "Fragment";
        case a:
          return "Portal";
        case d:
          return "Profiler";
        case f:
          return "StrictMode";
        case T:
          return "Suspense";
        case R:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case m:
            var i = e;
            return ge(i) + ".Consumer";
          case n:
            var l = e;
            return ge(l._context) + ".Provider";
          case o:
            return de(e, e.render, "ForwardRef");
          case C:
            var v = e.displayName || null;
            return v !== null ? v : h(e.type) || "Memo";
          case x: {
            var _ = e, O = _._payload, E = _._init;
            try {
              return h(E(O));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var w = Object.assign, N = 0, H, le, F, D, K, W, Q;
    function J() {
    }
    J.__reactDisabledLog = !0;
    function c() {
      {
        if (N === 0) {
          H = console.log, le = console.info, F = console.warn, D = console.error, K = console.group, W = console.groupCollapsed, Q = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: J,
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
        N++;
      }
    }
    function X() {
      {
        if (N--, N === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: w({}, e, {
              value: H
            }),
            info: w({}, e, {
              value: le
            }),
            warn: w({}, e, {
              value: F
            }),
            error: w({}, e, {
              value: D
            }),
            group: w({}, e, {
              value: K
            }),
            groupCollapsed: w({}, e, {
              value: W
            }),
            groupEnd: w({}, e, {
              value: Q
            })
          });
        }
        N < 0 && u("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var G = y.ReactCurrentDispatcher, I;
    function g(e, i, l) {
      {
        if (I === void 0)
          try {
            throw Error();
          } catch (_) {
            var v = _.stack.trim().match(/\n( *(at )?)/);
            I = v && v[1] || "";
          }
        return `
` + I + e;
      }
    }
    var L = !1, Z;
    {
      var B = typeof WeakMap == "function" ? WeakMap : Map;
      Z = new B();
    }
    function ue(e, i) {
      if (!e || L)
        return "";
      {
        var l = Z.get(e);
        if (l !== void 0)
          return l;
      }
      var v;
      L = !0;
      var _ = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var O;
      O = G.current, G.current = null, c();
      try {
        if (i) {
          var E = function() {
            throw Error();
          };
          if (Object.defineProperty(E.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(E, []);
            } catch (ce) {
              v = ce;
            }
            Reflect.construct(e, [], E);
          } else {
            try {
              E.call();
            } catch (ce) {
              v = ce;
            }
            e.call(E.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ce) {
            v = ce;
          }
          e();
        }
      } catch (ce) {
        if (ce && v && typeof ce.stack == "string") {
          for (var p = ce.stack.split(`
`), ie = v.stack.split(`
`), P = p.length - 1, U = ie.length - 1; P >= 1 && U >= 0 && p[P] !== ie[U]; )
            U--;
          for (; P >= 1 && U >= 0; P--, U--)
            if (p[P] !== ie[U]) {
              if (P !== 1 || U !== 1)
                do
                  if (P--, U--, U < 0 || p[P] !== ie[U]) {
                    var ve = `
` + p[P].replace(" at new ", " at ");
                    return e.displayName && ve.includes("<anonymous>") && (ve = ve.replace("<anonymous>", e.displayName)), typeof e == "function" && Z.set(e, ve), ve;
                  }
                while (P >= 1 && U >= 0);
              break;
            }
        }
      } finally {
        L = !1, G.current = O, X(), Error.prepareStackTrace = _;
      }
      var _e = e ? e.displayName || e.name : "", Te = _e ? g(_e) : "";
      return typeof e == "function" && Z.set(e, Te), Te;
    }
    function ne(e, i, l) {
      return ue(e, !1);
    }
    function ee(e) {
      var i = e.prototype;
      return !!(i && i.isReactComponent);
    }
    function be(e, i, l) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ue(e, ee(e));
      if (typeof e == "string")
        return g(e);
      switch (e) {
        case T:
          return g("Suspense");
        case R:
          return g("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case o:
            return ne(e.render);
          case C:
            return be(e.type, i, l);
          case x: {
            var v = e, _ = v._payload, O = v._init;
            try {
              return be(O(_), i, l);
            } catch {
            }
          }
        }
      return "";
    }
    var he = Object.prototype.hasOwnProperty, se = {}, ae = y.ReactDebugCurrentFrame;
    function te(e) {
      if (e) {
        var i = e._owner, l = be(e.type, e._source, i ? i.type : null);
        ae.setExtraStackFrame(l);
      } else
        ae.setExtraStackFrame(null);
    }
    function ye(e, i, l, v, _) {
      {
        var O = Function.call.bind(he);
        for (var E in e)
          if (O(e, E)) {
            var p = void 0;
            try {
              if (typeof e[E] != "function") {
                var ie = Error((v || "React class") + ": " + l + " type `" + E + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[E] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ie.name = "Invariant Violation", ie;
              }
              p = e[E](i, E, v, l, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (P) {
              p = P;
            }
            p && !(p instanceof Error) && (te(_), u("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", v || "React class", l, E, typeof p), te(null)), p instanceof Error && !(p.message in se) && (se[p.message] = !0, te(_), u("Failed %s type: %s", l, p.message), te(null));
          }
      }
    }
    var Ee = Array.isArray;
    function me(e) {
      return Ee(e);
    }
    function Re(e) {
      {
        var i = typeof Symbol == "function" && Symbol.toStringTag, l = i && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return l;
      }
    }
    function Ne(e) {
      try {
        return Ke(e), !1;
      } catch {
        return !0;
      }
    }
    function Ke(e) {
      return "" + e;
    }
    function Be(e) {
      if (Ne(e))
        return u("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Re(e)), Ke(e);
    }
    var De = y.ReactCurrentOwner, ut = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ue, Me, Fe;
    Fe = {};
    function ft(e) {
      if (he.call(e, "ref")) {
        var i = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function dt(e) {
      if (he.call(e, "key")) {
        var i = Object.getOwnPropertyDescriptor(e, "key").get;
        if (i && i.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ht(e, i) {
      if (typeof e.ref == "string" && De.current && i && De.current.stateNode !== i) {
        var l = h(De.current.type);
        Fe[l] || (u('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', h(De.current.type), e.ref), Fe[l] = !0);
      }
    }
    function vt(e, i) {
      {
        var l = function() {
          Ue || (Ue = !0, u("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        l.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: l,
          configurable: !0
        });
      }
    }
    function bt(e, i) {
      {
        var l = function() {
          Me || (Me = !0, u("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", i));
        };
        l.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: l,
          configurable: !0
        });
      }
    }
    var gt = function(e, i, l, v, _, O, E) {
      var p = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: e,
        key: i,
        ref: l,
        props: E,
        // Record the component responsible for creating this element.
        _owner: O
      };
      return p._store = {}, Object.defineProperty(p._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(p, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: v
      }), Object.defineProperty(p, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: _
      }), Object.freeze && (Object.freeze(p.props), Object.freeze(p)), p;
    };
    function yt(e, i, l, v, _) {
      {
        var O, E = {}, p = null, ie = null;
        l !== void 0 && (Be(l), p = "" + l), dt(i) && (Be(i.key), p = "" + i.key), ft(i) && (ie = i.ref, ht(i, _));
        for (O in i)
          he.call(i, O) && !ut.hasOwnProperty(O) && (E[O] = i[O]);
        if (e && e.defaultProps) {
          var P = e.defaultProps;
          for (O in P)
            E[O] === void 0 && (E[O] = P[O]);
        }
        if (p || ie) {
          var U = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          p && vt(E, U), ie && bt(E, U);
        }
        return gt(e, p, ie, _, v, De.current, E);
      }
    }
    var We = y.ReactCurrentOwner, Ve = y.ReactDebugCurrentFrame;
    function we(e) {
      if (e) {
        var i = e._owner, l = be(e.type, e._source, i ? i.type : null);
        Ve.setExtraStackFrame(l);
      } else
        Ve.setExtraStackFrame(null);
    }
    var ze;
    ze = !1;
    function Ae(e) {
      return typeof e == "object" && e !== null && e.$$typeof === r;
    }
    function Je() {
      {
        if (We.current) {
          var e = h(We.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function mt(e) {
      {
        if (e !== void 0) {
          var i = e.fileName.replace(/^.*[\\\/]/, ""), l = e.lineNumber;
          return `

Check your code at ` + i + ":" + l + ".";
        }
        return "";
      }
    }
    var Xe = {};
    function xt(e) {
      {
        var i = Je();
        if (!i) {
          var l = typeof e == "string" ? e : e.displayName || e.name;
          l && (i = `

Check the top-level render call using <` + l + ">.");
        }
        return i;
      }
    }
    function qe(e, i) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var l = xt(i);
        if (Xe[l])
          return;
        Xe[l] = !0;
        var v = "";
        e && e._owner && e._owner !== We.current && (v = " It was passed a child from " + h(e._owner.type) + "."), we(e), u('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', l, v), we(null);
      }
    }
    function Ge(e, i) {
      {
        if (typeof e != "object")
          return;
        if (me(e))
          for (var l = 0; l < e.length; l++) {
            var v = e[l];
            Ae(v) && qe(v, i);
          }
        else if (Ae(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var _ = b(e);
          if (typeof _ == "function" && _ !== e.entries)
            for (var O = _.call(e), E; !(E = O.next()).done; )
              Ae(E.value) && qe(E.value, i);
        }
      }
    }
    function pt(e) {
      {
        var i = e.type;
        if (i == null || typeof i == "string")
          return;
        var l;
        if (typeof i == "function")
          l = i.propTypes;
        else if (typeof i == "object" && (i.$$typeof === o || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        i.$$typeof === C))
          l = i.propTypes;
        else
          return;
        if (l) {
          var v = h(i);
          ye(l, e.props, "prop", v, e);
        } else if (i.PropTypes !== void 0 && !ze) {
          ze = !0;
          var _ = h(i);
          u("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _ || "Unknown");
        }
        typeof i.getDefaultProps == "function" && !i.getDefaultProps.isReactClassApproved && u("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Rt(e) {
      {
        for (var i = Object.keys(e.props), l = 0; l < i.length; l++) {
          var v = i[l];
          if (v !== "children" && v !== "key") {
            we(e), u("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", v), we(null);
            break;
          }
        }
        e.ref !== null && (we(e), u("Invalid attribute `ref` supplied to `React.Fragment`."), we(null));
      }
    }
    var Ze = {};
    function Qe(e, i, l, v, _, O) {
      {
        var E = pe(e);
        if (!E) {
          var p = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (p += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ie = mt(_);
          ie ? p += ie : p += Je();
          var P;
          e === null ? P = "null" : me(e) ? P = "array" : e !== void 0 && e.$$typeof === r ? (P = "<" + (h(e.type) || "Unknown") + " />", p = " Did you accidentally export a JSX literal instead of a component?") : P = typeof e, u("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", P, p);
        }
        var U = yt(e, i, l, _, O);
        if (U == null)
          return U;
        if (E) {
          var ve = i.children;
          if (ve !== void 0)
            if (v)
              if (me(ve)) {
                for (var _e = 0; _e < ve.length; _e++)
                  Ge(ve[_e], e);
                Object.freeze && Object.freeze(ve);
              } else
                u("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ge(ve, e);
        }
        if (he.call(i, "key")) {
          var Te = h(e), ce = Object.keys(i).filter(function(Ct) {
            return Ct !== "key";
          }), He = ce.length > 0 ? "{key: someKey, " + ce.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ze[Te + He]) {
            var _t = ce.length > 0 ? "{" + ce.join(": ..., ") + ": ...}" : "{}";
            u(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, He, Te, _t, Te), Ze[Te + He] = !0;
          }
        }
        return e === s ? Rt(U) : pt(U), U;
      }
    }
    function Tt(e, i, l) {
      return Qe(e, i, l, !0);
    }
    function St(e, i, l) {
      return Qe(e, i, l, !1);
    }
    var Et = St, wt = Tt;
    ke.Fragment = s, ke.jsx = Et, ke.jsxs = wt;
  }()), ke;
}
process.env.NODE_ENV === "production" ? Ye.exports = $t() : Ye.exports = kt();
var $ = Ye.exports;
const at = ({
  node: t,
  index: r,
  onClose: a,
  onSelect: s,
  onDragStart: f,
  onDragEnd: d,
  className: n = "",
  style: m = {}
}) => {
  const o = j(() => {
    s == null || s(t.id);
  }, [t.id, s]), T = j(
    (x) => {
      x.stopPropagation(), a == null || a(t.id);
    },
    [t.id, a]
  ), R = j(
    (x) => {
      x.dataTransfer.setData("text/plain", t.id), x.dataTransfer.effectAllowed = "move", x.currentTarget.classList.add("dragging"), document.body.classList.add("dragging"), f == null || f(t.id, r);
    },
    [t.id, r, f]
  ), C = j(
    (x) => {
      x.currentTarget.classList.remove("dragging"), document.body.classList.remove("dragging"), d == null || d();
    },
    [d]
  );
  return /* @__PURE__ */ $.jsxs(
    "div",
    {
      className: `react-flex-layout-tab ${n}`,
      style: { ...m, cursor: "grab" },
      onClick: o,
      draggable: !0,
      onDragStart: R,
      onDragEnd: C,
      children: [
        /* @__PURE__ */ $.jsx("span", { className: "react-flex-layout-tab-title", children: t.name || "Untitled" }),
        /* @__PURE__ */ $.jsx(
          "button",
          {
            className: "react-flex-layout-tab-close",
            onClick: T,
            type: "button",
            "aria-label": "Close tab",
            children: "×"
          }
        )
      ]
    }
  );
};
const Lt = ({
  node: t,
  children: r,
  factory: a,
  onTabSelect: s,
  onTabClose: f,
  onTabDragStart: d,
  onTabDragEnd: n,
  onDragOver: m,
  onDragLeave: o,
  onDrop: T,
  dragOverTabset: R,
  dropPosition: C,
  dropTargetIndex: x,
  direction: k = "ltr",
  className: q = "",
  style: M = {}
}) => {
  const b = Pe(() => {
    var h;
    return ((h = t.children) == null ? void 0 : h.filter((w) => w.type === "tab")) || [];
  }, [t.children]), y = Pe(() => k === "rtl" ? [...b].reverse() : b, [b, k]), u = t.selected ?? 0, S = Math.min(
    u,
    Math.max(0, b.length - 1)
  ), Y = b[S], z = j(
    (h) => {
      const w = b.findIndex((N) => N.id === h);
      w !== -1 && (s == null || s(t.id, w));
    },
    [t.id, b, s]
  ), V = j(
    (h) => {
      const w = b.findIndex((N) => N.id === h);
      w !== -1 && (f == null || f(t.id, w));
    },
    [t.id, b, f]
  ), re = j(
    (h, w) => {
      const N = w !== void 0 ? w : b.findIndex((H) => H.id === h);
      N !== -1 && (d == null || d(t.id, N));
    },
    [t.id, b, d]
  ), A = j(
    (h) => {
      var Q;
      h.preventDefault(), h.dataTransfer.dropEffect = "move";
      const w = h.currentTarget.getBoundingClientRect(), N = h.clientX - w.left, H = h.clientY - w.top, le = w.width, F = w.height;
      let D = "center";
      if (H < 40) {
        const J = (Q = h.currentTarget.querySelector(".react-flex-layout-tabset-header")) == null ? void 0 : Q.getBoundingClientRect();
        if (J) {
          const c = h.clientX - J.left, X = h.currentTarget.querySelectorAll(
            ".react-flex-layout-tab"
          );
          let G = b.length;
          if (k === "rtl") {
            for (let I = X.length - 1; I >= 0; I--) {
              const g = X[I].getBoundingClientRect(), L = g.left - J.left, Z = g.right - J.left, B = (L + Z) / 2;
              if (c > B) {
                G = b.findIndex(
                  (ne) => ne.id === y[I].id
                );
                break;
              }
            }
            if (G === b.length && X.length > 0) {
              const I = X[0].getBoundingClientRect();
              c > I.right - J.left && (G = b.findIndex(
                (L) => L.id === y[0].id
              ));
            }
          } else
            for (let I = 0; I < X.length; I++) {
              const g = X[I].getBoundingClientRect(), L = g.left - J.left, Z = g.right - J.left, B = (L + Z) / 2;
              if (c < B) {
                G = b.findIndex(
                  (ne) => ne.id === y[I].id
                );
                break;
              }
            }
          G === b.length && (G = b.length), D = "tab", m == null || m(h, t.id, D, G);
          return;
        }
      }
      N < le * 0.25 ? D = "left" : N > le * 0.75 ? D = "right" : H < F * 0.25 ? D = "top" : H > F * 0.75 ? D = "bottom" : D = "center", m == null || m(h, t.id, D);
    },
    [t.id, b, y, m]
  ), oe = j(
    (h) => {
      o == null || o(h);
    },
    [o]
  ), pe = j(
    (h) => {
      T == null || T(h, t.id);
    },
    [t.id, T]
  ), de = R === t.id, ge = {
    ...M,
    width: t.width ? `${t.width}%` : void 0,
    height: t.height ? `${t.height}%` : void 0,
    flex: `${t.flex || 1} 1 0%`,
    minWidth: t.minWidth ? `${t.minWidth}px` : void 0,
    minHeight: t.minHeight ? `${t.minHeight}px` : void 0,
    maxWidth: t.maxWidth ? `${t.maxWidth}px` : void 0,
    maxHeight: t.maxHeight ? `${t.maxHeight}px` : void 0
  };
  return b.length === 0 ? null : /* @__PURE__ */ $.jsxs(
    "div",
    {
      className: `react-flex-layout-tabset ${de ? "drag-over" : ""} ${q}`,
      style: ge,
      "data-drop-position": de ? C : void 0,
      onDragOver: A,
      onDragLeave: oe,
      onDrop: pe,
      children: [
        /* @__PURE__ */ $.jsxs("div", { className: "react-flex-layout-tabset-header", children: [
          y.map((h) => {
            const w = b.findIndex((le) => le.id === h.id), N = w === S, H = de && C === "tab" && x !== null && w === x;
            return /* @__PURE__ */ $.jsxs(Se.Fragment, { children: [
              H && /* @__PURE__ */ $.jsx("div", { className: "react-flex-layout-tab-drop-indicator" }),
              /* @__PURE__ */ $.jsx(
                at,
                {
                  node: h,
                  index: w,
                  onSelect: z,
                  onClose: V,
                  onDragStart: re,
                  onDragEnd: n,
                  className: N ? "active" : ""
                }
              )
            ] }, h.id);
          }),
          de && C === "tab" && x !== null && x === b.length && /* @__PURE__ */ $.jsx("div", { className: "react-flex-layout-tab-drop-indicator" })
        ] }),
        /* @__PURE__ */ $.jsx("div", { className: "react-flex-layout-tabset-content", children: Y && (a ? a(Y) : r) })
      ]
    }
  );
}, it = nt(
  Lt,
  (t, r) => {
    if (t.node !== r.node) {
      if (t.node.id !== r.node.id || t.node.selected !== r.node.selected || t.node.width !== r.node.width || t.node.height !== r.node.height || t.node.flex !== r.node.flex || t.node.minWidth !== r.node.minWidth || t.node.minHeight !== r.node.minHeight || t.node.maxWidth !== r.node.maxWidth || t.node.maxHeight !== r.node.maxHeight)
        return !1;
      const a = t.node.children || [], s = r.node.children || [];
      if (a.length !== s.length)
        return !1;
      for (let f = 0; f < a.length; f++)
        if (a[f] !== s[f]) {
          const d = a[f], n = s[f];
          if (d.id !== n.id || d.type !== n.type || d.name !== n.name || d.component !== n.component || d.enableClose !== n.enableClose || d.enableDrag !== n.enableDrag)
            return !1;
        }
    }
    return !(t.className !== r.className || t.direction !== r.direction || t.dragOverTabset !== r.dragOverTabset || t.dropPosition !== r.dropPosition || t.factory !== r.factory || t.onTabSelect !== r.onTabSelect || t.onTabClose !== r.onTabClose || t.onTabDragStart !== r.onTabDragStart || t.onTabDragEnd !== r.onTabDragEnd || t.onDragOver !== r.onDragOver || t.onDragLeave !== r.onDragLeave || t.onDrop !== r.onDrop);
  }
);
it.displayName = "MemoizedTabSet";
const rt = ({
  direction: t,
  onResize: r,
  onResizeStart: a,
  size: s = 8,
  className: f = "",
  style: d = {},
  customStyles: n = {}
}) => {
  const [m, o] = xe(!1), T = Oe(0), R = j(
    (q) => {
      q.preventDefault(), q.stopPropagation(), o(!0), T.current = t === "horizontal" ? q.clientX : q.clientY, a == null || a();
      const M = (y) => {
        const S = (t === "horizontal" ? y.clientX : y.clientY) - T.current;
        r(S);
      }, b = () => {
        o(!1), document.removeEventListener("mousemove", M), document.removeEventListener("mouseup", b);
      };
      document.addEventListener("mousemove", M), document.addEventListener("mouseup", b);
    },
    [t, r, a]
  ), C = {
    backgroundColor: "#ffffff",
    border: "none",
    outline: "none"
  }, x = () => m && n.active ? n.active : n.default ? n.default : C, k = {
    ...d,
    width: t === "horizontal" ? `${s}px` : "100%",
    height: t === "vertical" ? `${s}px` : "100%",
    minWidth: t === "horizontal" ? `${s}px` : void 0,
    minHeight: t === "vertical" ? `${s}px` : void 0,
    flexShrink: 0,
    cursor: t === "horizontal" ? "col-resize" : "row-resize",
    ...x(),
    transition: m ? "none" : "all 0.2s ease"
  };
  return /* @__PURE__ */ $.jsx(
    "div",
    {
      className: `react-flex-layout-splitter ${f}`,
      style: k,
      onMouseDown: R
    }
  );
}, Vt = (t, r) => ({
  global: {
    enableClose: !0,
    enableDrag: !0,
    enableResize: !0,
    splitterSize: 8,
    tabOverlapLength: 0,
    direction: "ltr",
    ...r
  },
  layout: t
}), Jt = (t, r, a, s) => ({
  id: t,
  type: "tab",
  component: r,
  name: a,
  config: s,
  enableClose: !0,
  enableDrag: !0
}), Nt = (t, r, a = 0) => ({
  id: t,
  type: "tabset",
  children: r,
  selected: a,
  enableClose: !0,
  enableDrag: !0
}), Ft = (t, r, a, s) => ({
  id: t,
  type: "row",
  children: st(r),
  width: a,
  height: s,
  enableResize: !0
}), Wt = (t, r, a, s) => ({
  id: t,
  type: "column",
  children: st(r),
  width: a,
  height: s,
  enableResize: !0
}), je = (t, r) => {
  if (t.id === r)
    return t;
  if (t.children)
    for (const a of t.children) {
      const s = je(a, r);
      if (s)
        return s;
    }
  return null;
}, lt = (t, r) => {
  if (!t.children)
    return null;
  for (const a of t.children)
    if (a.id === r)
      return t;
  for (const a of t.children) {
    const s = lt(a, r);
    if (s)
      return s;
  }
  return null;
}, fe = (t, r, a) => {
  if (t.id === r)
    return a === null ? null : Object.keys(a).some(
      (f) => t[f] !== a[f]
    ) ? { ...t, ...a } : t;
  if (t.children) {
    let s = !1;
    const f = t.children.map((d) => {
      const n = fe(d, r, a);
      return n !== d && (s = !0), n;
    }).filter((d) => d !== null);
    return s ? {
      ...t,
      children: f
    } : t;
  }
  return t;
}, zt = (t, r) => {
  if (t.children) {
    const a = t.children.filter((s) => s.id !== r).map((s) => zt(s, r));
    return {
      ...t,
      children: a
    };
  }
  return t;
}, st = (t) => t.map((r) => ({
  ...r,
  flex: r.flex || 1 / t.length
})), Ce = (t) => {
  if (t.type === "tabset" && (!t.children || t.children.length === 0))
    return null;
  if (t.children) {
    const r = t.children.length, a = t.children.map(Ce).filter((f) => f !== null), s = a.length < r;
    if (a.length === 0)
      return null;
    if ((t.type === "row" || t.type === "column") && a.length > 0) {
      const f = a.reduce(
        (n, m) => n + (m.flex || 0),
        0
      );
      if (s || f < 0.999 || a.length === 1) {
        let n;
        if (a.length === 1)
          n = a.map((m) => ({
            ...m,
            flex: 1
          }));
        else if (f === 0 || f < 1e-3) {
          const m = 1 / a.length;
          n = a.map((o) => ({
            ...o,
            flex: m
          }));
        } else {
          const m = 1 / f;
          n = a.map((o) => ({
            ...o,
            flex: (o.flex || 0) * m
          }));
        }
        return {
          ...t,
          children: n
        };
      }
      if (a.length !== r || a.some(
        (n, m) => {
          var o;
          return n !== ((o = t.children) == null ? void 0 : o[m]);
        }
      ))
        return {
          ...t,
          children: a
        };
    }
    if (a !== t.children)
      return {
        ...t,
        children: a
      };
  }
  return t;
}, At = (t, r) => {
  const a = Oe({}), s = j(
    (d, n, m) => {
      if (!r)
        return;
      const o = ct(t.layout, d);
      if (!o || !o.children)
        return;
      const T = o.children.findIndex(
        (z) => z.id === d
      ), R = T + 1;
      if (R >= o.children.length)
        return;
      const C = `${d}-${m}`;
      if (!a.current[C]) {
        const z = o.children[T], V = o.children[R];
        a.current[C] = {
          current: z.flex || 1,
          sibling: V.flex || 1
        };
      }
      const x = a.current[C], k = x.current + x.sibling, q = m === "horizontal" ? window.innerWidth : window.innerHeight, M = x.current / k * q, b = x.sibling / k * q, y = 100;
      let u = M + n, S = b - n;
      if (u < y) {
        const z = y - u;
        u = y, S -= z;
      }
      if (S < y) {
        const z = y - S;
        S = y, u -= z;
      }
      const Y = u + S;
      if (Y > 0) {
        const z = u / Y * k, V = S / Y * k, re = fe(t.layout, o.id, {
          children: o.children.map((A, oe) => oe === T ? { ...A, flex: z } : oe === R ? { ...A, flex: V } : A)
        });
        re && r({
          ...t,
          layout: re
        });
      }
    },
    [t, r]
  ), f = j(
    (d, n) => {
      const m = `${d}-${n}`;
      delete a.current[m];
    },
    []
  );
  return { handleResize: s, resetResize: f };
}, ct = (t, r) => {
  if (!t.children)
    return null;
  for (const a of t.children) {
    if (a.id === r)
      return t;
    const s = ct(a, r);
    if (s)
      return s;
  }
  return null;
}, Ht = (t, r) => {
  const [a, s] = xe(null), [f, d] = xe(null), [n, m] = xe("center"), [o, T] = xe(null), R = Oe(null), C = j((b, y) => {
    const u = { tabsetId: b, tabIndex: y };
    s(u), R.current = u;
  }, []), x = j(() => {
    s(null), R.current = null, d(null), T(null);
  }, []), k = j(
    (b, y, u = "center", S) => {
      b.preventDefault(), b.dataTransfer.dropEffect = "move", d(y), m(u), S !== void 0 ? T(S) : u !== "tab" && T(null);
    },
    []
  ), q = j((b) => {
    b.currentTarget === b.target && setTimeout(() => {
      d(null), T(null);
    }, 50);
  }, []), M = j(
    (b, y) => {
      var ge, h, w, N, H, le;
      b.preventDefault();
      const u = R.current;
      if (!u || !r)
        return;
      const { tabsetId: S, tabIndex: Y } = u;
      if (S === y && n === "tab" && o !== null) {
        const F = je(t.layout, S);
        if (!F || !F.children)
          return;
        const D = F.children[Y];
        if (!D || Y === o)
          return;
        const K = [...F.children];
        K.splice(Y, 1), K.splice(o, 0, D);
        let W = F.selected ?? 0;
        Y < W && o >= W ? W = Math.max(0, W - 1) : Y > W && o <= W ? W = Math.min(W + 1, K.length - 1) : Y === W && (W = o);
        const Q = fe(t.layout, S, {
          children: K,
          selected: W
        });
        Q && r({
          ...t,
          layout: Q
        }), s(null), d(null), T(null);
        return;
      }
      if (S === y && n !== "tab")
        return;
      const z = je(t.layout, S), V = je(t.layout, y);
      if (!z || !V || !z.children || !V.children)
        return;
      const re = z.children[Y];
      if (!re)
        return;
      let A = t.layout;
      const oe = z.children.filter(
        (F, D) => D !== Y
      ), pe = fe(
        A,
        S,
        {
          children: oe,
          selected: Math.min(
            z.selected || 0,
            oe.length - 1
          )
        }
      );
      if (!pe)
        return;
      if (A = pe, n === "center") {
        const F = { ...re, id: `${re.id}-${Date.now()}` }, D = fe(
          A,
          y,
          {
            children: [...V.children || [], F],
            selected: ((ge = V.children) == null ? void 0 : ge.length) || 0
          }
        );
        if (!D)
          return;
        A = D;
      } else {
        const F = { ...re, id: `${re.id}-${Date.now()}` }, D = Nt(
          `${y}-split-${Date.now()}`,
          [F]
        ), K = lt(A, y);
        if (K) {
          const W = ((h = K.children) == null ? void 0 : h.findIndex(
            (Q) => Q.id === y
          )) || 0;
          if (n === "left" || n === "right") {
            const Q = Ft(`${y}-row-${Date.now()}`, [
              n === "left" ? D : V,
              n === "left" ? V : D
            ]), J = fe(
              A,
              K.id,
              {
                children: [
                  ...((w = K.children) == null ? void 0 : w.slice(0, W)) || [],
                  Q,
                  ...((N = K.children) == null ? void 0 : N.slice(W + 1)) || []
                ]
              }
            );
            if (!J)
              return;
            A = J;
          } else if (n === "top" || n === "bottom") {
            const Q = Wt(
              `${y}-column-${Date.now()}`,
              [
                n === "top" ? D : V,
                n === "top" ? V : D
              ]
            ), J = fe(
              A,
              K.id,
              {
                children: [
                  ...((H = K.children) == null ? void 0 : H.slice(0, W)) || [],
                  Q,
                  ...((le = K.children) == null ? void 0 : le.slice(W + 1)) || []
                ]
              }
            );
            if (!J)
              return;
            A = J;
          }
        }
      }
      const de = Ce(A);
      de && r({
        ...t,
        layout: de
      }), s(null), d(null);
    },
    [t, r, n, o]
  );
  return {
    draggedTab: a,
    dragOverTabset: f,
    dropPosition: n,
    dropTargetIndex: o,
    handleDragStart: C,
    handleDragEnd: x,
    handleDragOver: k,
    handleDragLeave: q,
    handleDrop: M
  };
}, Pt = "react-flex-layout";
class ot {
  constructor(r = {}) {
    Ie(this, "storageKey");
    Ie(this, "autoSave");
    Ie(this, "debounceMs");
    Ie(this, "saveTimeout", null);
    this.storageKey = `${Pt}-${r.key || "default"}`, this.autoSave = r.autoSave !== !1, this.debounceMs = r.debounceMs || 500;
  }
  /**
   * Save layout model to localStorage
   */
  save(r) {
    try {
      const a = JSON.stringify(r);
      localStorage.setItem(this.storageKey, a);
    } catch {
    }
  }
  /**
   * Load layout model from localStorage
   */
  load() {
    try {
      const r = localStorage.getItem(this.storageKey);
      if (r)
        return JSON.parse(r);
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
  debouncedSave(r) {
    this.autoSave && (this.saveTimeout && clearTimeout(this.saveTimeout), this.saveTimeout = setTimeout(() => {
      this.save(r);
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
const Xt = (t) => new ot(t), qt = () => {
  try {
    const t = "__localStorage_test__";
    return localStorage.setItem(t, t), localStorage.removeItem(t), !0;
  } catch {
    return !1;
  }
}, Yt = (t, r = {}) => {
  const { onLoad: a, onSave: s, onError: f, ...d } = r, n = Oe(null), [m, o] = xe(t), [T, R] = xe(!1), [C, x] = xe(!1);
  Le(() => {
    n.current = new ot(d), x(!0);
  }, [d.key, d.autoSave, d.debounceMs]), Le(() => {
    if (!n.current || T)
      return;
    const u = n.current.load();
    u ? (o(u), R(!0), a == null || a(u)) : R(!0);
  }, [T, a]);
  const k = j(
    (u) => {
      if (n.current)
        try {
          n.current.isAutoSaveEnabled() ? n.current.debouncedSave(u) : n.current.save(u), s == null || s(u);
        } catch (S) {
          f == null || f(S);
        }
    },
    [s, f]
  ), q = j(
    (u) => {
      const S = { ...u };
      u.global && (S.global = { ...u.global }), o(S), k(S);
    },
    [k]
  ), M = j(() => {
    if (n.current)
      try {
        n.current.clear();
      } catch (u) {
        f == null || f(u);
      }
  }, [f]), b = j(() => {
    var u;
    return ((u = n.current) == null ? void 0 : u.exists()) ?? !1;
  }, []), y = j(() => {
    var u;
    return ((u = n.current) == null ? void 0 : u.getStorageKey()) ?? "";
  }, []);
  return {
    model: m,
    updateModel: q,
    clearStorage: M,
    hasStoredData: b,
    getStorageKey: y,
    isLoaded: T,
    hasStorage: C
  };
};
const Kt = Dt(
  ({
    model: t,
    factory: r,
    onModelChange: a,
    onAction: s,
    className: f = "",
    style: d = {},
    storage: n
  }, m) => {
    var W, Q, J;
    const [o, T] = xe(t), [R, C] = xe(
      null
    ), {
      model: x,
      updateModel: k,
      isLoaded: q
    } = Yt(t, {
      key: n == null ? void 0 : n.key,
      autoSave: n == null ? void 0 : n.autoSave,
      debounceMs: n == null ? void 0 : n.debounceMs,
      onLoad: (c) => {
        a ? a(c) : T(c);
      }
    }), M = n != null && n.enabled ? x : a ? t : o, b = j(
      (c) => {
        n != null && n.enabled ? (k(c), a && a(c)) : a ? a(c) : T(c);
      },
      [a, n == null ? void 0 : n.enabled, k]
    ), { handleResize: y, resetResize: u } = At(
      M,
      b
    ), {
      dragOverTabset: S,
      dropPosition: Y,
      dropTargetIndex: z,
      handleDragStart: V,
      handleDragEnd: re,
      handleDragOver: A,
      handleDragLeave: oe,
      handleDrop: pe
    } = Ht(M, b), de = Oe(x);
    Le(() => {
      de.current = x;
    }, [x]);
    const ge = Oe(o);
    Le(() => {
      ge.current = o;
    }, [o]);
    const h = j(
      (c) => {
        if (n != null && n.enabled) {
          const X = de.current;
          if (c.type === "changeDirection") {
            const { direction: g } = c.payload;
            C(g);
          }
          const I = ((g) => {
            switch (c.type) {
              case "selectTab":
                const { nodeId: L, tabIndex: Z } = c.payload, B = fe(g.layout, L, {
                  selected: Z
                });
                return !B || B === g.layout ? g : {
                  ...g,
                  layout: B
                };
              case "removeNode":
                const { nodeId: ue, tabIndex: ne } = c.payload, ee = je(g.layout, ue);
                if (ee && ee.children) {
                  const ae = ee.children.filter(
                    (Re, Ne) => Ne !== ne
                  ), te = ee.selected ?? 0;
                  let ye = te;
                  ne <= te && (ye = Math.max(0, te - 1)), ye = Math.min(
                    ye,
                    ae.length - 1
                  );
                  const Ee = {
                    ...ee,
                    children: ae,
                    selected: ae.length > 0 ? ye : void 0
                  }, me = fe(
                    g.layout,
                    ue,
                    Ee
                  );
                  if (me) {
                    const Re = Ce(me);
                    if (Re)
                      return {
                        ...g,
                        layout: Re
                      };
                  }
                }
                return g;
              case "closeTabset":
                const { nodeId: be } = c.payload, he = fe(
                  g.layout,
                  be,
                  null
                );
                if (he) {
                  const ae = Ce(he);
                  if (ae)
                    return {
                      ...g,
                      layout: ae
                    };
                }
                return g;
              case "changeDirection":
                const { direction: se } = c.payload;
                return {
                  ...g,
                  global: {
                    ...g.global,
                    direction: se
                  }
                };
              default:
                return g;
            }
          })(X);
          k(I), a && a(I), s == null || s(c);
        } else
          s == null || s(c);
        if (!(n != null && n.enabled) && !a) {
          const X = ge.current, I = ((g) => {
            switch (c.type) {
              case "selectTab":
                const { nodeId: L, tabIndex: Z } = c.payload, B = fe(g.layout, L, {
                  selected: Z
                });
                return !B || B === g.layout ? g : {
                  ...g,
                  layout: B
                };
              case "removeNode":
                const { nodeId: ue, tabIndex: ne } = c.payload, ee = je(g.layout, ue);
                if (ee && ee.children) {
                  const se = ee.children.filter(
                    (me, Re) => Re !== ne
                  ), ae = ee.selected ?? 0;
                  let te = ae;
                  ne <= ae && (te = Math.max(0, ae - 1)), te = Math.min(
                    te,
                    se.length - 1
                  );
                  const ye = {
                    ...ee,
                    children: se,
                    selected: se.length > 0 ? te : void 0
                  }, Ee = fe(
                    g.layout,
                    ue,
                    ye
                  );
                  if (Ee) {
                    const me = Ce(Ee);
                    if (me)
                      return {
                        ...g,
                        layout: me
                      };
                  }
                }
                return g;
              case "closeTabset":
                const { nodeId: be } = c.payload, he = fe(
                  g.layout,
                  be,
                  null
                );
                if (he) {
                  const se = Ce(he);
                  if (se)
                    return {
                      ...g,
                      layout: se
                    };
                }
                return g;
              default:
                return g;
            }
          })(X);
          T(I);
        }
      },
      [s, a, n == null ? void 0 : n.enabled, k]
    );
    It(
      m,
      () => ({
        handleAction: h
      }),
      [h]
    );
    const w = j(
      (c, X) => {
        h({
          type: "selectTab",
          payload: { nodeId: c, tabIndex: X }
        });
      },
      [h]
    ), N = j(
      (c, X) => {
        h({
          type: "removeNode",
          payload: { nodeId: c, tabIndex: X }
        });
      },
      [h]
    );
    let H;
    n != null && n.enabled ? R !== null ? H = R : H = ((W = x == null ? void 0 : x.global) == null ? void 0 : W.direction) || "ltr" : H = ((Q = M.global) == null ? void 0 : Q.direction) || "ltr";
    const le = ((J = M.global) == null ? void 0 : J.splitterSize) || 8, F = j(
      (c) => {
        var X;
        switch (c.type) {
          case "tabset":
            return /* @__PURE__ */ $.jsx(
              it,
              {
                node: c,
                factory: r,
                onTabSelect: w,
                onTabClose: N,
                onTabDragStart: V,
                onTabDragEnd: re,
                onDragOver: A,
                onDragLeave: oe,
                onDrop: pe,
                dragOverTabset: S,
                dropPosition: S === c.id ? Y : void 0,
                dropTargetIndex: S === c.id ? z : void 0,
                direction: H
              },
              c.id
            );
          case "row":
            const G = H === "rtl", I = c.children || [], g = G ? [...I].reverse() : I;
            return /* @__PURE__ */ $.jsx(
              "div",
              {
                className: "react-flex-layout-row",
                style: {
                  width: c.width ? `${c.width}%` : void 0,
                  height: c.height ? `${c.height}%` : void 0,
                  flex: `${c.flex || 1} 1 0%`,
                  minWidth: c.minWidth ? `${c.minWidth}px` : void 0,
                  minHeight: c.minHeight ? `${c.minHeight}px` : void 0,
                  maxWidth: c.maxWidth ? `${c.maxWidth}px` : void 0,
                  maxHeight: c.maxHeight ? `${c.maxHeight}px` : void 0
                },
                children: g.map((L, Z) => {
                  const B = Z + 1;
                  if (!(B < g.length))
                    return /* @__PURE__ */ $.jsx(Se.Fragment, { children: F(L) }, L.id);
                  const ne = G ? I.length - 1 - Z : Z, ee = G ? I.length - 1 - B : B, be = Math.min(
                    ne,
                    ee
                  );
                  if (Math.max(
                    ne,
                    ee
                  ) !== be + 1)
                    return /* @__PURE__ */ $.jsx(Se.Fragment, { children: F(L) }, L.id);
                  const se = I[be], ae = G && ne > ee;
                  return /* @__PURE__ */ $.jsxs(Se.Fragment, { children: [
                    F(L),
                    /* @__PURE__ */ $.jsx(
                      rt,
                      {
                        direction: "horizontal",
                        onResize: (te) => {
                          const ye = ae ? -te : te;
                          y(
                            se.id,
                            ye,
                            "horizontal"
                          );
                        },
                        onResizeStart: () => {
                          u(se.id, "horizontal");
                        },
                        size: le
                      }
                    )
                  ] }, L.id);
                })
              },
              c.id
            );
          case "column":
            return /* @__PURE__ */ $.jsx(
              "div",
              {
                className: "react-flex-layout-column",
                style: {
                  width: c.width ? `${c.width}%` : void 0,
                  height: c.height ? `${c.height}%` : void 0,
                  flex: `${c.flex || 1} 1 0%`,
                  minWidth: c.minWidth ? `${c.minWidth}px` : void 0,
                  minHeight: c.minHeight ? `${c.minHeight}px` : void 0,
                  maxWidth: c.maxWidth ? `${c.maxWidth}px` : void 0,
                  maxHeight: c.maxHeight ? `${c.maxHeight}px` : void 0
                },
                children: (X = c.children) == null ? void 0 : X.map((L, Z) => {
                  var B;
                  return /* @__PURE__ */ $.jsxs(Se.Fragment, { children: [
                    F(L),
                    Z < (((B = c.children) == null ? void 0 : B.length) || 0) - 1 && /* @__PURE__ */ $.jsx(
                      rt,
                      {
                        direction: "vertical",
                        onResize: (ue) => y(L.id, ue, "vertical"),
                        onResizeStart: () => {
                          u(L.id, "vertical");
                        },
                        size: le
                      }
                    )
                  ] }, L.id);
                })
              },
              c.id
            );
          case "tab":
            return r(c);
          default:
            return null;
        }
      },
      [
        H,
        le,
        r,
        w,
        N,
        y,
        V,
        re,
        A,
        oe,
        pe,
        S,
        Y
      ]
    );
    Le(() => {
      !(n != null && n.enabled) && R !== null && C(null);
    }, [n == null ? void 0 : n.enabled, R]);
    const D = Pe(
      () => F(M.layout),
      [F, M.layout]
    ), K = {
      ...d,
      height: "100%",
      width: "100%"
    };
    return n != null && n.enabled && !q ? /* @__PURE__ */ $.jsx(
      "div",
      {
        className: `react-flex-layout ${f}`,
        style: {
          ...K,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ $.jsx("div", { children: "Loading layout..." })
      }
    ) : /* @__PURE__ */ $.jsx(
      "div",
      {
        className: `react-flex-layout ${f}`,
        style: K,
        dir: H,
        children: D
      }
    );
  }
);
Kt.displayName = "Layout";
const Gt = ({
  size: t = 16,
  color: r = "#666",
  className: a = ""
}) => /* @__PURE__ */ $.jsxs(
  "svg",
  {
    width: t,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: r,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: a,
    children: [
      /* @__PURE__ */ $.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ $.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
), Bt = nt(at, (t, r) => t.node.id === r.node.id && t.node.name === r.node.name && t.node.enableClose === r.node.enableClose && t.node.enableDrag === r.node.enableDrag && t.className === r.className);
Bt.displayName = "MemoizedTab";
export {
  Gt as DefaultCloseIcon,
  Kt as Layout,
  ot as LayoutStorage,
  Bt as MemoizedTab,
  it as MemoizedTabSet,
  rt as Splitter,
  at as Tab,
  Lt as TabSet,
  st as calculateFlexValues,
  Wt as createColumn,
  Vt as createLayoutModel,
  Xt as createLayoutStorage,
  Ft as createRow,
  Jt as createTab,
  Nt as createTabSet,
  je as findNodeById,
  qt as isLocalStorageAvailable,
  Ce as removeEmptyTabsets,
  zt as removeNodeById,
  fe as updateNodeById,
  Yt as useLayoutStorage
};
