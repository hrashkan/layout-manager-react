var Ot = Object.defineProperty;
var $t = (t, r, a) => r in t ? Ot(t, r, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[r] = a;
var ce = (t, r, a) => ($t(t, typeof r != "symbol" ? r + "" : r, a), a);
import be, { useCallback as O, useMemo as Ke, useState as ee, useRef as $e, useEffect as Ue, memo as qe } from "react";
var Oe = { exports: {} }, de = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ve;
function Ct() {
  if (Ve)
    return de;
  Ve = 1;
  var t = be, r = Symbol.for("react.element"), a = Symbol.for("react.fragment"), o = Object.prototype.hasOwnProperty, f = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: !0, ref: !0, __self: !0, __source: !0 };
  function i(_, h, S) {
    var R, D = {}, v = null, H = null;
    S !== void 0 && (v = "" + S), h.key !== void 0 && (v = "" + h.key), h.ref !== void 0 && (H = h.ref);
    for (R in h)
      o.call(h, R) && !p.hasOwnProperty(R) && (D[R] = h[R]);
    if (_ && _.defaultProps)
      for (R in h = _.defaultProps, h)
        D[R] === void 0 && (D[R] = h[R]);
    return { $$typeof: r, type: _, key: v, ref: H, props: D, _owner: f.current };
  }
  return de.Fragment = a, de.jsx = i, de.jsxs = i, de;
}
var fe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Be;
function Dt() {
  return Be || (Be = 1, process.env.NODE_ENV !== "production" && function() {
    var t = be, r = Symbol.for("react.element"), a = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), _ = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), H = Symbol.for("react.offscreen"), w = Symbol.iterator, y = "@@iterator";
    function W(e) {
      if (e === null || typeof e != "object")
        return null;
      var n = w && e[w] || e[y];
      return typeof n == "function" ? n : null;
    }
    var $ = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function c(e) {
      {
        for (var n = arguments.length, l = new Array(n > 1 ? n - 1 : 0), d = 1; d < n; d++)
          l[d - 1] = arguments[d];
        N("error", e, l);
      }
    }
    function N(e, n, l) {
      {
        var d = $.ReactDebugCurrentFrame, E = d.getStackAddendum();
        E !== "" && (n += "%s", l = l.concat([E]));
        var j = l.map(function(g) {
          return String(g);
        });
        j.unshift("Warning: " + n), Function.prototype.apply.call(console[e], console, j);
      }
    }
    var P = !1, K = !1, k = !1, X = !1, V = !1, B;
    B = Symbol.for("react.module.reference");
    function s(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === o || e === p || V || e === f || e === S || e === R || X || e === H || P || K || k || typeof e == "object" && e !== null && (e.$$typeof === v || e.$$typeof === D || e.$$typeof === i || e.$$typeof === _ || e.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === B || e.getModuleId !== void 0));
    }
    function b(e, n, l) {
      var d = e.displayName;
      if (d)
        return d;
      var E = n.displayName || n.name || "";
      return E !== "" ? l + "(" + E + ")" : l;
    }
    function T(e) {
      return e.displayName || "Context";
    }
    function u(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && c("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case o:
          return "Fragment";
        case a:
          return "Portal";
        case p:
          return "Profiler";
        case f:
          return "StrictMode";
        case S:
          return "Suspense";
        case R:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case _:
            var n = e;
            return T(n) + ".Consumer";
          case i:
            var l = e;
            return T(l._context) + ".Provider";
          case h:
            return b(e, e.render, "ForwardRef");
          case D:
            var d = e.displayName || null;
            return d !== null ? d : u(e.type) || "Memo";
          case v: {
            var E = e, j = E._payload, g = E._init;
            try {
              return u(g(j));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var I = Object.assign, M = 0, C, x, A, Y, G, J, ae;
    function ie() {
    }
    ie.__reactDisabledLog = !0;
    function te() {
      {
        if (M === 0) {
          C = console.log, x = console.info, A = console.warn, Y = console.error, G = console.group, J = console.groupCollapsed, ae = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ie,
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
        M++;
      }
    }
    function ge() {
      {
        if (M--, M === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: I({}, e, {
              value: C
            }),
            info: I({}, e, {
              value: x
            }),
            warn: I({}, e, {
              value: A
            }),
            error: I({}, e, {
              value: Y
            }),
            group: I({}, e, {
              value: G
            }),
            groupCollapsed: I({}, e, {
              value: J
            }),
            groupEnd: I({}, e, {
              value: ae
            })
          });
        }
        M < 0 && c("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var re = $.ReactCurrentDispatcher, xe;
    function ve(e, n, l) {
      {
        if (xe === void 0)
          try {
            throw Error();
          } catch (E) {
            var d = E.stack.trim().match(/\n( *(at )?)/);
            xe = d && d[1] || "";
          }
        return `
` + xe + e;
      }
    }
    var Re = !1, ye;
    {
      var nt = typeof WeakMap == "function" ? WeakMap : Map;
      ye = new nt();
    }
    function Ce(e, n) {
      if (!e || Re)
        return "";
      {
        var l = ye.get(e);
        if (l !== void 0)
          return l;
      }
      var d;
      Re = !0;
      var E = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var j;
      j = re.current, re.current = null, te();
      try {
        if (n) {
          var g = function() {
            throw Error();
          };
          if (Object.defineProperty(g.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(g, []);
            } catch (q) {
              d = q;
            }
            Reflect.construct(e, [], g);
          } else {
            try {
              g.call();
            } catch (q) {
              d = q;
            }
            e.call(g.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (q) {
            d = q;
          }
          e();
        }
      } catch (q) {
        if (q && d && typeof q.stack == "string") {
          for (var m = q.stack.split(`
`), U = d.stack.split(`
`), L = m.length - 1, z = U.length - 1; L >= 1 && z >= 0 && m[L] !== U[z]; )
            z--;
          for (; L >= 1 && z >= 0; L--, z--)
            if (m[L] !== U[z]) {
              if (L !== 1 || z !== 1)
                do
                  if (L--, z--, z < 0 || m[L] !== U[z]) {
                    var Z = `
` + m[L].replace(" at new ", " at ");
                    return e.displayName && Z.includes("<anonymous>") && (Z = Z.replace("<anonymous>", e.displayName)), typeof e == "function" && ye.set(e, Z), Z;
                  }
                while (L >= 1 && z >= 0);
              break;
            }
        }
      } finally {
        Re = !1, re.current = j, ge(), Error.prepareStackTrace = E;
      }
      var oe = e ? e.displayName || e.name : "", ne = oe ? ve(oe) : "";
      return typeof e == "function" && ye.set(e, ne), ne;
    }
    function at(e, n, l) {
      return Ce(e, !1);
    }
    function it(e) {
      var n = e.prototype;
      return !!(n && n.isReactComponent);
    }
    function me(e, n, l) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ce(e, it(e));
      if (typeof e == "string")
        return ve(e);
      switch (e) {
        case S:
          return ve("Suspense");
        case R:
          return ve("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case h:
            return at(e.render);
          case D:
            return me(e.type, n, l);
          case v: {
            var d = e, E = d._payload, j = d._init;
            try {
              return me(j(E), n, l);
            } catch {
            }
          }
        }
      return "";
    }
    var se = Object.prototype.hasOwnProperty, De = {}, ke = $.ReactDebugCurrentFrame;
    function pe(e) {
      if (e) {
        var n = e._owner, l = me(e.type, e._source, n ? n.type : null);
        ke.setExtraStackFrame(l);
      } else
        ke.setExtraStackFrame(null);
    }
    function lt(e, n, l, d, E) {
      {
        var j = Function.call.bind(se);
        for (var g in e)
          if (j(e, g)) {
            var m = void 0;
            try {
              if (typeof e[g] != "function") {
                var U = Error((d || "React class") + ": " + l + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw U.name = "Invariant Violation", U;
              }
              m = e[g](n, g, d, l, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (L) {
              m = L;
            }
            m && !(m instanceof Error) && (pe(E), c("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", d || "React class", l, g, typeof m), pe(null)), m instanceof Error && !(m.message in De) && (De[m.message] = !0, pe(E), c("Failed %s type: %s", l, m.message), pe(null));
          }
      }
    }
    var ot = Array.isArray;
    function Te(e) {
      return ot(e);
    }
    function st(e) {
      {
        var n = typeof Symbol == "function" && Symbol.toStringTag, l = n && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return l;
      }
    }
    function ut(e) {
      try {
        return Ie(e), !1;
      } catch {
        return !0;
      }
    }
    function Ie(e) {
      return "" + e;
    }
    function Pe(e) {
      if (ut(e))
        return c("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", st(e)), Ie(e);
    }
    var ue = $.ReactCurrentOwner, ct = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Le, Fe, Ee;
    Ee = {};
    function dt(e) {
      if (se.call(e, "ref")) {
        var n = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function ft(e) {
      if (se.call(e, "key")) {
        var n = Object.getOwnPropertyDescriptor(e, "key").get;
        if (n && n.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ht(e, n) {
      if (typeof e.ref == "string" && ue.current && n && ue.current.stateNode !== n) {
        var l = u(ue.current.type);
        Ee[l] || (c('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u(ue.current.type), e.ref), Ee[l] = !0);
      }
    }
    function vt(e, n) {
      {
        var l = function() {
          Le || (Le = !0, c("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        l.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: l,
          configurable: !0
        });
      }
    }
    function yt(e, n) {
      {
        var l = function() {
          Fe || (Fe = !0, c("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", n));
        };
        l.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: l,
          configurable: !0
        });
      }
    }
    var mt = function(e, n, l, d, E, j, g) {
      var m = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: e,
        key: n,
        ref: l,
        props: g,
        // Record the component responsible for creating this element.
        _owner: j
      };
      return m._store = {}, Object.defineProperty(m._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(m, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.defineProperty(m, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: E
      }), Object.freeze && (Object.freeze(m.props), Object.freeze(m)), m;
    };
    function pt(e, n, l, d, E) {
      {
        var j, g = {}, m = null, U = null;
        l !== void 0 && (Pe(l), m = "" + l), ft(n) && (Pe(n.key), m = "" + n.key), dt(n) && (U = n.ref, ht(n, E));
        for (j in n)
          se.call(n, j) && !ct.hasOwnProperty(j) && (g[j] = n[j]);
        if (e && e.defaultProps) {
          var L = e.defaultProps;
          for (j in L)
            g[j] === void 0 && (g[j] = L[j]);
        }
        if (m || U) {
          var z = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          m && vt(g, z), U && yt(g, z);
        }
        return mt(e, m, U, E, d, ue.current, g);
      }
    }
    var _e = $.ReactCurrentOwner, We = $.ReactDebugCurrentFrame;
    function le(e) {
      if (e) {
        var n = e._owner, l = me(e.type, e._source, n ? n.type : null);
        We.setExtraStackFrame(l);
      } else
        We.setExtraStackFrame(null);
    }
    var Se;
    Se = !1;
    function we(e) {
      return typeof e == "object" && e !== null && e.$$typeof === r;
    }
    function Ne() {
      {
        if (_e.current) {
          var e = u(_e.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function bt(e) {
      {
        if (e !== void 0) {
          var n = e.fileName.replace(/^.*[\\\/]/, ""), l = e.lineNumber;
          return `

Check your code at ` + n + ":" + l + ".";
        }
        return "";
      }
    }
    var Ae = {};
    function gt(e) {
      {
        var n = Ne();
        if (!n) {
          var l = typeof e == "string" ? e : e.displayName || e.name;
          l && (n = `

Check the top-level render call using <` + l + ">.");
        }
        return n;
      }
    }
    function ze(e, n) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var l = gt(n);
        if (Ae[l])
          return;
        Ae[l] = !0;
        var d = "";
        e && e._owner && e._owner !== _e.current && (d = " It was passed a child from " + u(e._owner.type) + "."), le(e), c('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', l, d), le(null);
      }
    }
    function He(e, n) {
      {
        if (typeof e != "object")
          return;
        if (Te(e))
          for (var l = 0; l < e.length; l++) {
            var d = e[l];
            we(d) && ze(d, n);
          }
        else if (we(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var E = W(e);
          if (typeof E == "function" && E !== e.entries)
            for (var j = E.call(e), g; !(g = j.next()).done; )
              we(g.value) && ze(g.value, n);
        }
      }
    }
    function xt(e) {
      {
        var n = e.type;
        if (n == null || typeof n == "string")
          return;
        var l;
        if (typeof n == "function")
          l = n.propTypes;
        else if (typeof n == "object" && (n.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        n.$$typeof === D))
          l = n.propTypes;
        else
          return;
        if (l) {
          var d = u(n);
          lt(l, e.props, "prop", d, e);
        } else if (n.PropTypes !== void 0 && !Se) {
          Se = !0;
          var E = u(n);
          c("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", E || "Unknown");
        }
        typeof n.getDefaultProps == "function" && !n.getDefaultProps.isReactClassApproved && c("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Rt(e) {
      {
        for (var n = Object.keys(e.props), l = 0; l < n.length; l++) {
          var d = n[l];
          if (d !== "children" && d !== "key") {
            le(e), c("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", d), le(null);
            break;
          }
        }
        e.ref !== null && (le(e), c("Invalid attribute `ref` supplied to `React.Fragment`."), le(null));
      }
    }
    var Ye = {};
    function Me(e, n, l, d, E, j) {
      {
        var g = s(e);
        if (!g) {
          var m = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (m += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var U = bt(E);
          U ? m += U : m += Ne();
          var L;
          e === null ? L = "null" : Te(e) ? L = "array" : e !== void 0 && e.$$typeof === r ? (L = "<" + (u(e.type) || "Unknown") + " />", m = " Did you accidentally export a JSX literal instead of a component?") : L = typeof e, c("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", L, m);
        }
        var z = pt(e, n, l, E, j);
        if (z == null)
          return z;
        if (g) {
          var Z = n.children;
          if (Z !== void 0)
            if (d)
              if (Te(Z)) {
                for (var oe = 0; oe < Z.length; oe++)
                  He(Z[oe], e);
                Object.freeze && Object.freeze(Z);
              } else
                c("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              He(Z, e);
        }
        if (se.call(n, "key")) {
          var ne = u(e), q = Object.keys(n).filter(function(jt) {
            return jt !== "key";
          }), je = q.length > 0 ? "{key: someKey, " + q.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ye[ne + je]) {
            var wt = q.length > 0 ? "{" + q.join(": ..., ") + ": ...}" : "{}";
            c(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, je, ne, wt, ne), Ye[ne + je] = !0;
          }
        }
        return e === o ? Rt(z) : xt(z), z;
      }
    }
    function Tt(e, n, l) {
      return Me(e, n, l, !0);
    }
    function Et(e, n, l) {
      return Me(e, n, l, !1);
    }
    var _t = Et, St = Tt;
    fe.Fragment = o, fe.jsx = _t, fe.jsxs = St;
  }()), fe;
}
process.env.NODE_ENV === "production" ? Oe.exports = Ct() : Oe.exports = Dt();
var F = Oe.exports;
const Xe = ({
  node: t,
  index: r,
  onClose: a,
  onSelect: o,
  onDragStart: f,
  onDragEnd: p,
  className: i = "",
  style: _ = {}
}) => {
  const h = O(() => {
    o == null || o(t.id);
  }, [t.id, o]), S = O(
    (v) => {
      v.stopPropagation(), a == null || a(t.id);
    },
    [t.id, a]
  ), R = O(
    (v) => {
      v.dataTransfer.setData("text/plain", t.id), v.dataTransfer.effectAllowed = "move", v.currentTarget.classList.add("dragging"), document.body.classList.add("dragging"), f == null || f(t.id, r);
    },
    [t.id, r, f]
  ), D = O(
    (v) => {
      v.currentTarget.classList.remove("dragging"), document.body.classList.remove("dragging"), p == null || p();
    },
    [p]
  );
  return /* @__PURE__ */ F.jsxs(
    "div",
    {
      className: `react-flex-layout-tab ${i}`,
      style: { ..._, cursor: "grab" },
      onClick: h,
      draggable: !0,
      onDragStart: R,
      onDragEnd: D,
      children: [
        /* @__PURE__ */ F.jsx("span", { className: "react-flex-layout-tab-title", children: t.name || "Untitled" }),
        /* @__PURE__ */ F.jsx(
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
const Ge = ({
  node: t,
  children: r,
  factory: a,
  onTabSelect: o,
  onTabClose: f,
  onTabDragStart: p,
  onTabDragEnd: i,
  onDragOver: _,
  onDragLeave: h,
  onDrop: S,
  dragOverTabset: R,
  dropPosition: D,
  direction: v = "ltr",
  className: H = "",
  style: w = {}
}) => {
  const y = Ke(() => {
    var b;
    return ((b = t.children) == null ? void 0 : b.filter((T) => T.type === "tab")) || [];
  }, [t.children]), W = Ke(() => v === "rtl" ? [...y].reverse() : y, [y, v]), $ = t.selected ?? 0, c = y[$], N = O(
    (b) => {
      const T = y.findIndex((u) => u.id === b);
      T !== -1 && (o == null || o(t.id, T));
    },
    [t.id, y, o]
  ), P = O(
    (b) => {
      const T = y.findIndex((u) => u.id === b);
      T !== -1 && (f == null || f(t.id, T));
    },
    [t.id, y, f]
  ), K = O(
    (b, T) => {
      console.log("TABSET DRAG START:", t.id, b, T);
      const u = T !== void 0 ? T : y.findIndex((I) => I.id === b);
      u !== -1 && (p == null || p(t.id, u));
    },
    [t.id, y, p]
  ), k = O(
    (b) => {
      b.preventDefault(), b.dataTransfer.dropEffect = "move";
      const T = b.currentTarget.getBoundingClientRect(), u = b.clientX - T.left, I = b.clientY - T.top, M = T.width, C = T.height;
      let x = "center";
      u < M * 0.25 ? x = "left" : u > M * 0.75 ? x = "right" : I < C * 0.25 ? x = "top" : I > C * 0.75 ? x = "bottom" : x = "center", _ == null || _(b, t.id, x);
    },
    [t.id, _]
  ), X = O(
    (b) => {
      h == null || h(b);
    },
    [h]
  ), V = O(
    (b) => {
      S == null || S(b, t.id);
    },
    [t.id, S]
  ), B = R === t.id, s = {
    ...w,
    width: t.width ? `${t.width}%` : void 0,
    height: t.height ? `${t.height}%` : void 0,
    flex: `${t.flex || 1} 1 0%`,
    minWidth: t.minWidth ? `${t.minWidth}px` : void 0,
    minHeight: t.minHeight ? `${t.minHeight}px` : void 0,
    maxWidth: t.maxWidth ? `${t.maxWidth}px` : void 0,
    maxHeight: t.maxHeight ? `${t.maxHeight}px` : void 0
  };
  return y.length === 0 ? null : /* @__PURE__ */ F.jsxs(
    "div",
    {
      className: `react-flex-layout-tabset ${B ? "drag-over" : ""} ${H}`,
      style: s,
      "data-drop-position": B ? D : void 0,
      onDragOver: k,
      onDragLeave: X,
      onDrop: V,
      children: [
        /* @__PURE__ */ F.jsx("div", { className: "react-flex-layout-tabset-header", children: W.map((b) => {
          const T = y.findIndex((u) => u.id === b.id);
          return /* @__PURE__ */ F.jsx(
            Xe,
            {
              node: b,
              index: T,
              onSelect: N,
              onClose: P,
              onDragStart: K,
              onDragEnd: i,
              className: T === $ ? "active" : ""
            },
            b.id
          );
        }) }),
        /* @__PURE__ */ F.jsx("div", { className: "react-flex-layout-tabset-content", children: c && (a ? a(c) : r) })
      ]
    }
  );
};
const Je = ({
  direction: t,
  onResize: r,
  size: a = 8,
  className: o = "",
  style: f = {},
  customStyles: p = {}
}) => {
  const [i, _] = ee(!1), [h, S] = ee(!1), R = $e(0), D = O(
    ($) => {
      $.preventDefault(), $.stopPropagation(), _(!0), R.current = t === "horizontal" ? $.clientX : $.clientY;
      const c = (P) => {
        const k = (t === "horizontal" ? P.clientX : P.clientY) - R.current;
        r(k);
      }, N = () => {
        _(!1), document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", N);
      };
      document.addEventListener("mousemove", c), document.addEventListener("mouseup", N);
    },
    [t, r]
  ), v = {
    backgroundColor: "#ffffff",
    border: "none",
    outline: "none"
  }, H = () => i && p.active ? p.active : h && p.hover ? p.hover : p.default ? p.default : v, w = {
    ...f,
    width: t === "horizontal" ? `${a}px` : "100%",
    height: t === "vertical" ? `${a}px` : "100%",
    minWidth: t === "horizontal" ? `${a}px` : void 0,
    minHeight: t === "vertical" ? `${a}px` : void 0,
    flexShrink: 0,
    cursor: t === "horizontal" ? "col-resize" : "row-resize",
    ...H(),
    transition: i ? "none" : "all 0.2s ease"
  }, y = O(() => {
    S(!0);
  }, []), W = O(() => {
    S(!1);
  }, []);
  return /* @__PURE__ */ F.jsx(
    "div",
    {
      className: `react-flex-layout-splitter ${o}`,
      style: w,
      onMouseDown: D,
      onMouseEnter: y,
      onMouseLeave: W
    }
  );
}, Kt = (t, r) => ({
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
}), Ut = (t, r, a, o) => ({
  id: t,
  type: "tab",
  component: r,
  name: a,
  config: o,
  enableClose: !0,
  enableDrag: !0
}), kt = (t, r, a = 0) => ({
  id: t,
  type: "tabset",
  children: r,
  selected: a,
  enableClose: !0,
  enableDrag: !0
}), It = (t, r, a, o) => ({
  id: t,
  type: "row",
  children: Qe(r),
  width: a,
  height: o,
  enableResize: !0
}), Pt = (t, r, a, o) => ({
  id: t,
  type: "column",
  children: Qe(r),
  width: a,
  height: o,
  enableResize: !0
}), he = (t, r) => {
  if (t.id === r)
    return t;
  if (t.children)
    for (const a of t.children) {
      const o = he(a, r);
      if (o)
        return o;
    }
  return null;
}, Ze = (t, r) => {
  if (!t.children)
    return null;
  for (const a of t.children)
    if (a.id === r)
      return t;
  for (const a of t.children) {
    const o = Ze(a, r);
    if (o)
      return o;
  }
  return null;
}, Q = (t, r, a) => {
  if (t.id === r)
    return a === null ? null : { ...t, ...a };
  if (t.children) {
    const o = t.children.map((f) => Q(f, r, a)).filter((f) => f !== null);
    return {
      ...t,
      children: o
    };
  }
  return t;
}, Lt = (t, r) => {
  if (t.children) {
    const a = t.children.filter((o) => o.id !== r).map((o) => Lt(o, r));
    return {
      ...t,
      children: a
    };
  }
  return t;
}, Qe = (t) => t.map((r) => ({
  ...r,
  flex: r.flex || 1 / t.length
})), Ft = (t, r) => ({ handleResize: O(
  (o, f, p) => {
    if (!r)
      return;
    const i = et(t.layout, o);
    if (!i || !i.children)
      return;
    const _ = i.children.findIndex(
      (V) => V.id === o
    ), h = _ + 1;
    if (h >= i.children.length)
      return;
    const S = i.children[_], R = i.children[h], D = p === "horizontal" ? window.innerWidth : window.innerHeight, v = S.flex || 1, H = R.flex || 1, w = v + H, y = v / w * D, W = H / w * D, $ = 100, c = Math.max($, y + f), N = Math.max($, W - f), P = c + N, K = c / P * w, k = N / P * w, X = Q(t.layout, i.id, {
      children: i.children.map((V, B) => B === _ ? { ...V, flex: K } : B === h ? { ...V, flex: k } : V)
    });
    X && r({
      ...t,
      layout: X
    });
  },
  [t, r]
) }), et = (t, r) => {
  if (!t.children)
    return null;
  for (const a of t.children) {
    if (a.id === r)
      return t;
    const o = et(a, r);
    if (o)
      return o;
  }
  return null;
};
function tt(t) {
  if (t.type === "tabset" && (!t.children || t.children.length === 0))
    return null;
  if (t.type === "row" || t.type === "column") {
    if (!t.children)
      return t;
    const r = t.children.map((f) => tt(f)).filter((f) => f !== null);
    if (r.length === 0)
      return null;
    if (r.length === 1)
      return {
        ...r[0],
        flex: 1
      };
    const a = 1 / r.length, o = r.map((f) => ({
      ...f,
      flex: a
    }));
    return {
      ...t,
      children: o
    };
  }
  return t;
}
const Wt = (t, r) => {
  const [a, o] = ee(null), [f, p] = ee(null), [i, _] = ee("center"), h = $e(null), S = O((w, y) => {
    const W = { tabsetId: w, tabIndex: y };
    o(W), h.current = W;
  }, []), R = O(() => {
    o(null), h.current = null, p(null);
  }, []), D = O(
    (w, y, W = "center") => {
      w.preventDefault(), w.dataTransfer.dropEffect = "move", p(y), _(W);
    },
    []
  ), v = O((w) => {
    w.currentTarget === w.target && setTimeout(() => {
      p(null);
    }, 50);
  }, []), H = O(
    (w, y) => {
      var s, b, T, u, I, M;
      w.preventDefault();
      const W = h.current;
      if (!W || !r)
        return;
      const { tabsetId: $, tabIndex: c } = W;
      if ($ === y)
        return;
      const N = he(t.layout, $), P = he(t.layout, y);
      if (!N || !P || !N.children || !P.children)
        return;
      const K = N.children[c];
      if (!K)
        return;
      let k = t.layout;
      const X = N.children.filter(
        (C, x) => x !== c
      ), V = Q(
        k,
        $,
        {
          children: X,
          selected: Math.min(
            N.selected || 0,
            X.length - 1
          )
        }
      );
      if (!V)
        return;
      if (k = V, i === "center") {
        const C = { ...K, id: `${K.id}-${Date.now()}` }, x = Q(
          k,
          y,
          {
            children: [...P.children || [], C],
            selected: ((s = P.children) == null ? void 0 : s.length) || 0
          }
        );
        if (!x)
          return;
        k = x;
      } else {
        const C = { ...K, id: `${K.id}-${Date.now()}` }, x = kt(
          `${y}-split-${Date.now()}`,
          [C]
        ), A = Ze(k, y);
        if (A) {
          const Y = ((b = A.children) == null ? void 0 : b.findIndex(
            (G) => G.id === y
          )) || 0;
          if (i === "left" || i === "right") {
            const G = It(`${y}-row-${Date.now()}`, [
              i === "left" ? x : P,
              i === "left" ? P : x
            ]), J = Q(
              k,
              A.id,
              {
                children: [
                  ...((T = A.children) == null ? void 0 : T.slice(0, Y)) || [],
                  G,
                  ...((u = A.children) == null ? void 0 : u.slice(Y + 1)) || []
                ]
              }
            );
            if (!J)
              return;
            k = J;
          } else if (i === "top" || i === "bottom") {
            const G = Pt(
              `${y}-column-${Date.now()}`,
              [
                i === "top" ? x : P,
                i === "top" ? P : x
              ]
            ), J = Q(
              k,
              A.id,
              {
                children: [
                  ...((I = A.children) == null ? void 0 : I.slice(0, Y)) || [],
                  G,
                  ...((M = A.children) == null ? void 0 : M.slice(Y + 1)) || []
                ]
              }
            );
            if (!J)
              return;
            k = J;
          }
        }
      }
      const B = tt(k);
      B && r({
        ...t,
        layout: B
      }), o(null), p(null);
    },
    [t, r, i]
  );
  return {
    draggedTab: a,
    dragOverTabset: f,
    dropPosition: i,
    handleDragStart: S,
    handleDragEnd: R,
    handleDragOver: D,
    handleDragLeave: v,
    handleDrop: H
  };
}, Nt = "react-flex-layout";
class rt {
  constructor(r = {}) {
    ce(this, "storageKey");
    ce(this, "autoSave");
    ce(this, "debounceMs");
    ce(this, "saveTimeout", null);
    this.storageKey = `${Nt}-${r.key || "default"}`, this.autoSave = r.autoSave !== !1, this.debounceMs = r.debounceMs || 500;
  }
  /**
   * Save layout model to localStorage
   */
  save(r) {
    try {
      const a = JSON.stringify(r);
      localStorage.setItem(this.storageKey, a);
    } catch (a) {
      console.warn("Failed to save layout to localStorage:", a);
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
    } catch (r) {
      console.warn("Failed to load layout from localStorage:", r);
    }
    return null;
  }
  /**
   * Clear saved layout from localStorage
   */
  clear() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (r) {
      console.warn("Failed to clear layout from localStorage:", r);
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
const Vt = (t) => new rt(t), Bt = () => {
  try {
    const t = "__localStorage_test__";
    return localStorage.setItem(t, t), localStorage.removeItem(t), !0;
  } catch {
    return !1;
  }
}, At = (t, r = {}) => {
  const { onLoad: a, onSave: o, onError: f, ...p } = r, i = $e(null), [_, h] = ee(t), [S, R] = ee(!1), [D, v] = ee(!1);
  Ue(() => {
    i.current = new rt(p), v(!0);
  }, [p.key, p.autoSave, p.debounceMs]), Ue(() => {
    if (!i.current || S)
      return;
    const c = i.current.load();
    c ? (h(c), R(!0), a == null || a(c)) : R(!0);
  }, [S, a]);
  const H = O(
    (c) => {
      if (i.current)
        try {
          i.current.isAutoSaveEnabled() ? i.current.debouncedSave(c) : i.current.save(c), o == null || o(c);
        } catch (N) {
          f == null || f(N);
        }
    },
    [o, f]
  ), w = O(
    (c) => {
      h(c), H(c);
    },
    [H]
  ), y = O(() => {
    if (i.current)
      try {
        i.current.clear();
      } catch (c) {
        f == null || f(c);
      }
  }, [f]), W = O(() => {
    var c;
    return ((c = i.current) == null ? void 0 : c.exists()) ?? !1;
  }, []), $ = O(() => {
    var c;
    return ((c = i.current) == null ? void 0 : c.getStorageKey()) ?? "";
  }, []);
  return {
    model: _,
    updateModel: w,
    clearStorage: y,
    hasStoredData: W,
    getStorageKey: $,
    isLoaded: S,
    hasStorage: D
  };
};
const Jt = ({
  model: t,
  factory: r,
  onModelChange: a,
  onAction: o,
  className: f = "",
  style: p = {},
  storage: i
}) => {
  const [_, h] = ee(t), {
    model: S,
    updateModel: R,
    isLoaded: D
  } = At(t, {
    key: i == null ? void 0 : i.key,
    autoSave: i == null ? void 0 : i.autoSave,
    debounceMs: i == null ? void 0 : i.debounceMs,
    onLoad: (s) => {
      a || h(s);
    }
  }), v = i != null && i.enabled ? S : a ? t : _, H = O(
    (s) => {
      i != null && i.enabled ? (R(s), a && a(s)) : a ? a(s) : h(s);
    },
    [a, i == null ? void 0 : i.enabled, R]
  ), { handleResize: w } = Ft(v, H), {
    dragOverTabset: y,
    dropPosition: W,
    handleDragStart: $,
    handleDragEnd: c,
    handleDragOver: N,
    handleDragLeave: P,
    handleDrop: K
  } = Wt(v, H), k = O(
    (s) => {
      if (o == null || o(s), i != null && i.enabled) {
        const T = ((u) => {
          switch (s.type) {
            case "selectTab":
              const { nodeId: I, tabIndex: M } = s.payload, C = Q(u.layout, I, {
                selected: M
              });
              return {
                ...u,
                layout: C || u.layout
              };
            case "removeNode":
              const { nodeId: x, tabIndex: A } = s.payload, Y = he(u.layout, x);
              if (Y && Y.children) {
                const ae = Y.children.filter(
                  (ge, re) => re !== A
                ), ie = {
                  ...Y,
                  children: ae
                }, te = Q(
                  u.layout,
                  x,
                  ie
                );
                if (te)
                  return {
                    ...u,
                    layout: te
                  };
              }
              return u;
            case "closeTabset":
              const { nodeId: G } = s.payload, J = Q(
                u.layout,
                G,
                null
              );
              return J ? {
                ...u,
                layout: J
              } : u;
            default:
              return u;
          }
        })(S);
        R(T), a && a(T);
      } else if (!a) {
        const T = ((u) => {
          switch (s.type) {
            case "selectTab":
              const { nodeId: I, tabIndex: M } = s.payload, C = Q(u.layout, I, {
                selected: M
              });
              return {
                ...u,
                layout: C || u.layout
              };
            case "removeNode":
              const { nodeId: x, tabIndex: A } = s.payload, Y = he(u.layout, x);
              if (Y && Y.children) {
                const ae = Y.children.filter(
                  (ge, re) => re !== A
                ), ie = {
                  ...Y,
                  children: ae
                }, te = Q(
                  u.layout,
                  x,
                  ie
                );
                if (te)
                  return {
                    ...u,
                    layout: te
                  };
              }
              return u;
            case "closeTabset":
              const { nodeId: G } = s.payload, J = Q(
                u.layout,
                G,
                null
              );
              return J ? {
                ...u,
                layout: J
              } : u;
            default:
              return u;
          }
        })(_);
        h(T);
      }
    },
    [
      o,
      a,
      i == null ? void 0 : i.enabled,
      R,
      S,
      _
    ]
  ), X = O(
    (s) => {
      var b;
      switch (s.type) {
        case "tabset":
          return /* @__PURE__ */ F.jsx(
            Ge,
            {
              node: s,
              factory: r,
              onTabSelect: (C, x) => {
                k({
                  type: "selectTab",
                  payload: { nodeId: C, tabIndex: x }
                });
              },
              onTabClose: (C, x) => {
                k({
                  type: "removeNode",
                  payload: { nodeId: C, tabIndex: x }
                });
              },
              onTabDragStart: $,
              onTabDragEnd: c,
              onDragOver: N,
              onDragLeave: P,
              onDrop: K,
              dragOverTabset: y,
              dropPosition: y === s.id ? W : void 0,
              direction: v.global.direction || "ltr"
            },
            s.id
          );
        case "row":
          const u = (v.global.direction || "ltr") === "rtl", I = s.children || [], M = u ? [...I].reverse() : I;
          return /* @__PURE__ */ F.jsx(
            "div",
            {
              className: "react-flex-layout-row",
              style: {
                width: s.width ? `${s.width}%` : void 0,
                height: s.height ? `${s.height}%` : void 0,
                flex: `${s.flex || 1} 1 0%`,
                minWidth: s.minWidth ? `${s.minWidth}px` : void 0,
                minHeight: s.minHeight ? `${s.minHeight}px` : void 0,
                maxWidth: s.maxWidth ? `${s.maxWidth}px` : void 0,
                maxHeight: s.maxHeight ? `${s.maxHeight}px` : void 0
              },
              children: M.map((C, x) => /* @__PURE__ */ F.jsxs(be.Fragment, { children: [
                X(C),
                x < M.length - 1 && /* @__PURE__ */ F.jsx(
                  Je,
                  {
                    direction: "horizontal",
                    onResize: (A) => w(C.id, A, "horizontal"),
                    size: v.global.splitterSize || 8
                  }
                )
              ] }, C.id))
            },
            s.id
          );
        case "column":
          return /* @__PURE__ */ F.jsx(
            "div",
            {
              className: "react-flex-layout-column",
              style: {
                width: s.width ? `${s.width}%` : void 0,
                height: s.height ? `${s.height}%` : void 0,
                flex: `${s.flex || 1} 1 0%`,
                minWidth: s.minWidth ? `${s.minWidth}px` : void 0,
                minHeight: s.minHeight ? `${s.minHeight}px` : void 0,
                maxWidth: s.maxWidth ? `${s.maxWidth}px` : void 0,
                maxHeight: s.maxHeight ? `${s.maxHeight}px` : void 0
              },
              children: (b = s.children) == null ? void 0 : b.map((C, x) => {
                var A;
                return /* @__PURE__ */ F.jsxs(be.Fragment, { children: [
                  X(C),
                  x < (((A = s.children) == null ? void 0 : A.length) || 0) - 1 && /* @__PURE__ */ F.jsx(
                    Je,
                    {
                      direction: "vertical",
                      onResize: (Y) => w(C.id, Y, "vertical"),
                      size: v.global.splitterSize || 8
                    }
                  )
                ] }, C.id);
              })
            },
            s.id
          );
        case "tab":
          return r(s);
        default:
          return null;
      }
    },
    [
      v.global.splitterSize,
      r,
      k,
      w,
      $,
      c,
      N,
      P,
      K,
      y,
      W
    ]
  ), V = v.global.direction || "ltr", B = {
    ...p,
    height: "100%",
    width: "100%"
  };
  return i != null && i.enabled && !D ? /* @__PURE__ */ F.jsx(
    "div",
    {
      className: `react-flex-layout ${f}`,
      style: {
        ...B,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: /* @__PURE__ */ F.jsx("div", { children: "Loading layout..." })
    }
  ) : /* @__PURE__ */ F.jsx(
    "div",
    {
      className: `react-flex-layout ${f}`,
      style: B,
      dir: V,
      children: X(v.layout)
    }
  );
}, qt = ({
  size: t = 16,
  color: r = "#666",
  className: a = ""
}) => /* @__PURE__ */ F.jsxs(
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
      /* @__PURE__ */ F.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ F.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
), zt = qe(Xe, (t, r) => t.node.id === r.node.id && t.node.name === r.node.name && t.node.enableClose === r.node.enableClose && t.node.enableDrag === r.node.enableDrag && t.className === r.className);
zt.displayName = "MemoizedTab";
const Ht = qe(
  Ge,
  (t, r) => {
    var a, o;
    return t.node.id === r.node.id && t.node.selected === r.node.selected && t.node.width === r.node.width && t.node.height === r.node.height && t.node.flex === r.node.flex && ((a = t.node.children) == null ? void 0 : a.length) === ((o = r.node.children) == null ? void 0 : o.length) && t.className === r.className;
  }
);
Ht.displayName = "MemoizedTabSet";
export {
  qt as DefaultCloseIcon,
  Jt as Layout,
  rt as LayoutStorage,
  zt as MemoizedTab,
  Ht as MemoizedTabSet,
  Je as Splitter,
  Xe as Tab,
  Ge as TabSet,
  Qe as calculateFlexValues,
  Pt as createColumn,
  Kt as createLayoutModel,
  Vt as createLayoutStorage,
  It as createRow,
  Ut as createTab,
  kt as createTabSet,
  he as findNodeById,
  Bt as isLocalStorageAvailable,
  Lt as removeNodeById,
  Q as updateNodeById,
  At as useLayoutStorage
};
