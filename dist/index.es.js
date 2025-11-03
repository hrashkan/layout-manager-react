var Ot = Object.defineProperty;
var Ct = (t, n, i) => n in t ? Ot(t, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[n] = i;
var Te = (t, n, i) => (Ct(t, typeof n != "symbol" ? n + "" : n, i), i);
import ge, { useCallback as D, useMemo as Xe, useState as ye, useRef as we, useEffect as Ce, forwardRef as $t, useImperativeHandle as Dt, memo as Qe } from "react";
var Fe = { exports: {} }, Ee = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qe;
function It() {
  if (qe)
    return Ee;
  qe = 1;
  var t = ge, n = Symbol.for("react.element"), i = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, h = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(v, o, S) {
    var x, O = {}, y = null, P = null;
    S !== void 0 && (y = "" + S), o.key !== void 0 && (y = "" + o.key), o.ref !== void 0 && (P = o.ref);
    for (x in o)
      c.call(o, x) && !p.hasOwnProperty(x) && (O[x] = o[x]);
    if (v && v.defaultProps)
      for (x in o = v.defaultProps, o)
        O[x] === void 0 && (O[x] = o[x]);
    return { $$typeof: n, type: v, key: y, ref: P, props: O, _owner: h.current };
  }
  return Ee.Fragment = i, Ee.jsx = a, Ee.jsxs = a, Ee;
}
var Se = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ge;
function kt() {
  return Ge || (Ge = 1, process.env.NODE_ENV !== "production" && function() {
    var t = ge, n = Symbol.for("react.element"), i = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), v = Symbol.for("react.context"), o = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), x = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), P = Symbol.for("react.offscreen"), $ = Symbol.iterator, f = "@@iterator";
    function W(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = $ && e[$] || e[f];
      return typeof r == "function" ? r : null;
    }
    var w = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function u(e) {
      {
        for (var r = arguments.length, s = new Array(r > 1 ? r - 1 : 0), d = 1; d < r; d++)
          s[d - 1] = arguments[d];
        _("error", e, s);
      }
    }
    function _(e, r, s) {
      {
        var d = w.ReactDebugCurrentFrame, E = d.getStackAddendum();
        E !== "" && (r += "%s", s = s.concat([E]));
        var C = s.map(function(R) {
          return String(R);
        });
        C.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, C);
      }
    }
    var H = !1, F = !1, z = !1, re = !1, Z = !1, Q;
    Q = Symbol.for("react.module.reference");
    function oe(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === c || e === p || Z || e === h || e === S || e === x || re || e === P || H || F || z || typeof e == "object" && e !== null && (e.$$typeof === y || e.$$typeof === O || e.$$typeof === a || e.$$typeof === v || e.$$typeof === o || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Q || e.getModuleId !== void 0));
    }
    function ne(e, r, s) {
      var d = e.displayName;
      if (d)
        return d;
      var E = r.displayName || r.name || "";
      return E !== "" ? s + "(" + E + ")" : s;
    }
    function g(e) {
      return e.displayName || "Context";
    }
    function m(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && u("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case c:
          return "Fragment";
        case i:
          return "Portal";
        case p:
          return "Profiler";
        case h:
          return "StrictMode";
        case S:
          return "Suspense";
        case x:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case v:
            var r = e;
            return g(r) + ".Consumer";
          case a:
            var s = e;
            return g(s._context) + ".Provider";
          case o:
            return ne(e, e.render, "ForwardRef");
          case O:
            var d = e.displayName || null;
            return d !== null ? d : m(e.type) || "Memo";
          case y: {
            var E = e, C = E._payload, R = E._init;
            try {
              return m(R(C));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var I = Object.assign, K = 0, ee, l, k, se, j, T, de;
    function N() {
    }
    N.__reactDisabledLog = !0;
    function U() {
      {
        if (K === 0) {
          ee = console.log, l = console.info, k = console.warn, se = console.error, j = console.group, T = console.groupCollapsed, de = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: N,
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
        K++;
      }
    }
    function q() {
      {
        if (K--, K === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: I({}, e, {
              value: ee
            }),
            info: I({}, e, {
              value: l
            }),
            warn: I({}, e, {
              value: k
            }),
            error: I({}, e, {
              value: se
            }),
            group: I({}, e, {
              value: j
            }),
            groupCollapsed: I({}, e, {
              value: T
            }),
            groupEnd: I({}, e, {
              value: de
            })
          });
        }
        K < 0 && u("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var B = w.ReactCurrentDispatcher, J;
    function te(e, r, s) {
      {
        if (J === void 0)
          try {
            throw Error();
          } catch (E) {
            var d = E.stack.trim().match(/\n( *(at )?)/);
            J = d && d[1] || "";
          }
        return `
` + J + e;
      }
    }
    var V = !1, ce;
    {
      var M = typeof WeakMap == "function" ? WeakMap : Map;
      ce = new M();
    }
    function ue(e, r) {
      if (!e || V)
        return "";
      {
        var s = ce.get(e);
        if (s !== void 0)
          return s;
      }
      var d;
      V = !0;
      var E = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var C;
      C = B.current, B.current = null, U();
      try {
        if (r) {
          var R = function() {
            throw Error();
          };
          if (Object.defineProperty(R.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(R, []);
            } catch (G) {
              d = G;
            }
            Reflect.construct(e, [], R);
          } else {
            try {
              R.call();
            } catch (G) {
              d = G;
            }
            e.call(R.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (G) {
            d = G;
          }
          e();
        }
      } catch (G) {
        if (G && d && typeof G.stack == "string") {
          for (var b = G.stack.split(`
`), X = d.stack.split(`
`), A = b.length - 1, Y = X.length - 1; A >= 1 && Y >= 0 && b[A] !== X[Y]; )
            Y--;
          for (; A >= 1 && Y >= 0; A--, Y--)
            if (b[A] !== X[Y]) {
              if (A !== 1 || Y !== 1)
                do
                  if (A--, Y--, Y < 0 || b[A] !== X[Y]) {
                    var ae = `
` + b[A].replace(" at new ", " at ");
                    return e.displayName && ae.includes("<anonymous>") && (ae = ae.replace("<anonymous>", e.displayName)), typeof e == "function" && ce.set(e, ae), ae;
                  }
                while (A >= 1 && Y >= 0);
              break;
            }
        }
      } finally {
        V = !1, B.current = C, q(), Error.prepareStackTrace = E;
      }
      var pe = e ? e.displayName || e.name : "", me = pe ? te(pe) : "";
      return typeof e == "function" && ce.set(e, me), me;
    }
    function ie(e, r, s) {
      return ue(e, !1);
    }
    function fe(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function he(e, r, s) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ue(e, fe(e));
      if (typeof e == "string")
        return te(e);
      switch (e) {
        case S:
          return te("Suspense");
        case x:
          return te("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case o:
            return ie(e.render);
          case O:
            return he(e.type, r, s);
          case y: {
            var d = e, E = d._payload, C = d._init;
            try {
              return he(C(E), r, s);
            } catch {
            }
          }
        }
      return "";
    }
    var ve = Object.prototype.hasOwnProperty, je = {}, Ne = w.ReactDebugCurrentFrame;
    function Oe(e) {
      if (e) {
        var r = e._owner, s = he(e.type, e._source, r ? r.type : null);
        Ne.setExtraStackFrame(s);
      } else
        Ne.setExtraStackFrame(null);
    }
    function lt(e, r, s, d, E) {
      {
        var C = Function.call.bind(ve);
        for (var R in e)
          if (C(e, R)) {
            var b = void 0;
            try {
              if (typeof e[R] != "function") {
                var X = Error((d || "React class") + ": " + s + " type `" + R + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[R] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw X.name = "Invariant Violation", X;
              }
              b = e[R](r, R, d, s, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (A) {
              b = A;
            }
            b && !(b instanceof Error) && (Oe(E), u("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", d || "React class", s, R, typeof b), Oe(null)), b instanceof Error && !(b.message in je) && (je[b.message] = !0, Oe(E), u("Failed %s type: %s", s, b.message), Oe(null));
          }
      }
    }
    var st = Array.isArray;
    function $e(e) {
      return st(e);
    }
    function ct(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, s = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return s;
      }
    }
    function ot(e) {
      try {
        return We(e), !1;
      } catch {
        return !0;
      }
    }
    function We(e) {
      return "" + e;
    }
    function ze(e) {
      if (ot(e))
        return u("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ct(e)), We(e);
    }
    var Re = w.ReactCurrentOwner, ut = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ae, Ye, De;
    De = {};
    function dt(e) {
      if (ve.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function ft(e) {
      if (ve.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ht(e, r) {
      if (typeof e.ref == "string" && Re.current && r && Re.current.stateNode !== r) {
        var s = m(Re.current.type);
        De[s] || (u('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', m(Re.current.type), e.ref), De[s] = !0);
      }
    }
    function vt(e, r) {
      {
        var s = function() {
          Ae || (Ae = !0, u("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        s.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: s,
          configurable: !0
        });
      }
    }
    function yt(e, r) {
      {
        var s = function() {
          Ye || (Ye = !0, u("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        s.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: s,
          configurable: !0
        });
      }
    }
    var mt = function(e, r, s, d, E, C, R) {
      var b = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: s,
        props: R,
        // Record the component responsible for creating this element.
        _owner: C
      };
      return b._store = {}, Object.defineProperty(b._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(b, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: d
      }), Object.defineProperty(b, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: E
      }), Object.freeze && (Object.freeze(b.props), Object.freeze(b)), b;
    };
    function bt(e, r, s, d, E) {
      {
        var C, R = {}, b = null, X = null;
        s !== void 0 && (ze(s), b = "" + s), ft(r) && (ze(r.key), b = "" + r.key), dt(r) && (X = r.ref, ht(r, E));
        for (C in r)
          ve.call(r, C) && !ut.hasOwnProperty(C) && (R[C] = r[C]);
        if (e && e.defaultProps) {
          var A = e.defaultProps;
          for (C in A)
            R[C] === void 0 && (R[C] = A[C]);
        }
        if (b || X) {
          var Y = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          b && vt(R, Y), X && yt(R, Y);
        }
        return mt(e, b, X, E, d, Re.current, R);
      }
    }
    var Ie = w.ReactCurrentOwner, He = w.ReactDebugCurrentFrame;
    function be(e) {
      if (e) {
        var r = e._owner, s = he(e.type, e._source, r ? r.type : null);
        He.setExtraStackFrame(s);
      } else
        He.setExtraStackFrame(null);
    }
    var ke;
    ke = !1;
    function Pe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === n;
    }
    function Ke() {
      {
        if (Ie.current) {
          var e = m(Ie.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function pt(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), s = e.lineNumber;
          return `

Check your code at ` + r + ":" + s + ".";
        }
        return "";
      }
    }
    var Ue = {};
    function gt(e) {
      {
        var r = Ke();
        if (!r) {
          var s = typeof e == "string" ? e : e.displayName || e.name;
          s && (r = `

Check the top-level render call using <` + s + ">.");
        }
        return r;
      }
    }
    function Ve(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var s = gt(r);
        if (Ue[s])
          return;
        Ue[s] = !0;
        var d = "";
        e && e._owner && e._owner !== Ie.current && (d = " It was passed a child from " + m(e._owner.type) + "."), be(e), u('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', s, d), be(null);
      }
    }
    function Me(e, r) {
      {
        if (typeof e != "object")
          return;
        if ($e(e))
          for (var s = 0; s < e.length; s++) {
            var d = e[s];
            Pe(d) && Ve(d, r);
          }
        else if (Pe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var E = W(e);
          if (typeof E == "function" && E !== e.entries)
            for (var C = E.call(e), R; !(R = C.next()).done; )
              Pe(R.value) && Ve(R.value, r);
        }
      }
    }
    function xt(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var s;
        if (typeof r == "function")
          s = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === o || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === O))
          s = r.propTypes;
        else
          return;
        if (s) {
          var d = m(r);
          lt(s, e.props, "prop", d, e);
        } else if (r.PropTypes !== void 0 && !ke) {
          ke = !0;
          var E = m(r);
          u("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", E || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && u("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Rt(e) {
      {
        for (var r = Object.keys(e.props), s = 0; s < r.length; s++) {
          var d = r[s];
          if (d !== "children" && d !== "key") {
            be(e), u("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", d), be(null);
            break;
          }
        }
        e.ref !== null && (be(e), u("Invalid attribute `ref` supplied to `React.Fragment`."), be(null));
      }
    }
    var Be = {};
    function Je(e, r, s, d, E, C) {
      {
        var R = oe(e);
        if (!R) {
          var b = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (b += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var X = pt(E);
          X ? b += X : b += Ke();
          var A;
          e === null ? A = "null" : $e(e) ? A = "array" : e !== void 0 && e.$$typeof === n ? (A = "<" + (m(e.type) || "Unknown") + " />", b = " Did you accidentally export a JSX literal instead of a component?") : A = typeof e, u("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", A, b);
        }
        var Y = bt(e, r, s, E, C);
        if (Y == null)
          return Y;
        if (R) {
          var ae = r.children;
          if (ae !== void 0)
            if (d)
              if ($e(ae)) {
                for (var pe = 0; pe < ae.length; pe++)
                  Me(ae[pe], e);
                Object.freeze && Object.freeze(ae);
              } else
                u("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Me(ae, e);
        }
        if (ve.call(r, "key")) {
          var me = m(e), G = Object.keys(r).filter(function(jt) {
            return jt !== "key";
          }), Le = G.length > 0 ? "{key: someKey, " + G.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Be[me + Le]) {
            var wt = G.length > 0 ? "{" + G.join(": ..., ") + ": ...}" : "{}";
            u(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Le, me, wt, me), Be[me + Le] = !0;
          }
        }
        return e === c ? Rt(Y) : xt(Y), Y;
      }
    }
    function Tt(e, r, s) {
      return Je(e, r, s, !0);
    }
    function Et(e, r, s) {
      return Je(e, r, s, !1);
    }
    var St = Et, _t = Tt;
    Se.Fragment = c, Se.jsx = St, Se.jsxs = _t;
  }()), Se;
}
process.env.NODE_ENV === "production" ? Fe.exports = It() : Fe.exports = kt();
var L = Fe.exports;
const et = ({
  node: t,
  index: n,
  onClose: i,
  onSelect: c,
  onDragStart: h,
  onDragEnd: p,
  className: a = "",
  style: v = {}
}) => {
  const o = D(() => {
    c == null || c(t.id);
  }, [t.id, c]), S = D(
    (y) => {
      y.stopPropagation(), i == null || i(t.id);
    },
    [t.id, i]
  ), x = D(
    (y) => {
      y.dataTransfer.setData("text/plain", t.id), y.dataTransfer.effectAllowed = "move", y.currentTarget.classList.add("dragging"), document.body.classList.add("dragging"), h == null || h(t.id, n);
    },
    [t.id, n, h]
  ), O = D(
    (y) => {
      y.currentTarget.classList.remove("dragging"), document.body.classList.remove("dragging"), p == null || p();
    },
    [p]
  );
  return /* @__PURE__ */ L.jsxs(
    "div",
    {
      className: `react-flex-layout-tab ${a}`,
      style: { ...v, cursor: "grab" },
      onClick: o,
      draggable: !0,
      onDragStart: x,
      onDragEnd: O,
      children: [
        /* @__PURE__ */ L.jsx("span", { className: "react-flex-layout-tab-title", children: t.name || "Untitled" }),
        /* @__PURE__ */ L.jsx(
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
const tt = ({
  node: t,
  children: n,
  factory: i,
  onTabSelect: c,
  onTabClose: h,
  onTabDragStart: p,
  onTabDragEnd: a,
  onDragOver: v,
  onDragLeave: o,
  onDrop: S,
  dragOverTabset: x,
  dropPosition: O,
  direction: y = "ltr",
  className: P = "",
  style: $ = {}
}) => {
  const f = Xe(() => {
    var g;
    return ((g = t.children) == null ? void 0 : g.filter((m) => m.type === "tab")) || [];
  }, [t.children]), W = Xe(() => y === "rtl" ? [...f].reverse() : f, [f, y]), w = t.selected ?? 0, u = Math.min(
    w,
    Math.max(0, f.length - 1)
  ), _ = f[u], H = D(
    (g) => {
      const m = f.findIndex((I) => I.id === g);
      m !== -1 && (c == null || c(t.id, m));
    },
    [t.id, f, c]
  ), F = D(
    (g) => {
      const m = f.findIndex((I) => I.id === g);
      m !== -1 && (h == null || h(t.id, m));
    },
    [t.id, f, h]
  ), z = D(
    (g, m) => {
      const I = m !== void 0 ? m : f.findIndex((K) => K.id === g);
      I !== -1 && (p == null || p(t.id, I));
    },
    [t.id, f, p]
  ), re = D(
    (g) => {
      g.preventDefault(), g.dataTransfer.dropEffect = "move";
      const m = g.currentTarget.getBoundingClientRect(), I = g.clientX - m.left, K = g.clientY - m.top, ee = m.width, l = m.height;
      let k = "center";
      I < ee * 0.25 ? k = "left" : I > ee * 0.75 ? k = "right" : K < l * 0.25 ? k = "top" : K > l * 0.75 ? k = "bottom" : k = "center", v == null || v(g, t.id, k);
    },
    [t.id, v]
  ), Z = D(
    (g) => {
      o == null || o(g);
    },
    [o]
  ), Q = D(
    (g) => {
      S == null || S(g, t.id);
    },
    [t.id, S]
  ), oe = x === t.id, ne = {
    ...$,
    width: t.width ? `${t.width}%` : void 0,
    height: t.height ? `${t.height}%` : void 0,
    flex: `${t.flex || 1} 1 0%`,
    minWidth: t.minWidth ? `${t.minWidth}px` : void 0,
    minHeight: t.minHeight ? `${t.minHeight}px` : void 0,
    maxWidth: t.maxWidth ? `${t.maxWidth}px` : void 0,
    maxHeight: t.maxHeight ? `${t.maxHeight}px` : void 0
  };
  return f.length === 0 ? null : /* @__PURE__ */ L.jsxs(
    "div",
    {
      className: `react-flex-layout-tabset ${oe ? "drag-over" : ""} ${P}`,
      style: ne,
      "data-drop-position": oe ? O : void 0,
      onDragOver: re,
      onDragLeave: Z,
      onDrop: Q,
      children: [
        /* @__PURE__ */ L.jsx("div", { className: "react-flex-layout-tabset-header", children: W.map((g) => {
          const m = f.findIndex((I) => I.id === g.id);
          return /* @__PURE__ */ L.jsx(
            et,
            {
              node: g,
              index: m,
              onSelect: H,
              onClose: F,
              onDragStart: z,
              onDragEnd: a,
              className: m === u ? "active" : ""
            },
            g.id
          );
        }) }),
        /* @__PURE__ */ L.jsx("div", { className: "react-flex-layout-tabset-content", children: _ && (i ? i(_) : n) })
      ]
    }
  );
};
const Ze = ({
  direction: t,
  onResize: n,
  onResizeStart: i,
  size: c = 8,
  className: h = "",
  style: p = {},
  customStyles: a = {}
}) => {
  const [v, o] = ye(!1), S = we(0), x = D(
    ($) => {
      $.preventDefault(), $.stopPropagation(), o(!0), S.current = t === "horizontal" ? $.clientX : $.clientY, i == null || i();
      const f = (w) => {
        const _ = (t === "horizontal" ? w.clientX : w.clientY) - S.current;
        n(_);
      }, W = () => {
        o(!1), document.removeEventListener("mousemove", f), document.removeEventListener("mouseup", W);
      };
      document.addEventListener("mousemove", f), document.addEventListener("mouseup", W);
    },
    [t, n, i]
  ), O = {
    backgroundColor: "#ffffff",
    border: "none",
    outline: "none"
  }, y = () => v && a.active ? a.active : a.default ? a.default : O, P = {
    ...p,
    width: t === "horizontal" ? `${c}px` : "100%",
    height: t === "vertical" ? `${c}px` : "100%",
    minWidth: t === "horizontal" ? `${c}px` : void 0,
    minHeight: t === "vertical" ? `${c}px` : void 0,
    flexShrink: 0,
    cursor: t === "horizontal" ? "col-resize" : "row-resize",
    ...y(),
    transition: v ? "none" : "all 0.2s ease"
  };
  return /* @__PURE__ */ L.jsx(
    "div",
    {
      className: `react-flex-layout-splitter ${h}`,
      style: P,
      onMouseDown: x
    }
  );
}, Bt = (t, n) => ({
  global: {
    enableClose: !0,
    enableDrag: !0,
    enableResize: !0,
    splitterSize: 8,
    tabOverlapLength: 0,
    direction: "ltr",
    ...n
  },
  layout: t
}), Jt = (t, n, i, c) => ({
  id: t,
  type: "tab",
  component: n,
  name: i,
  config: c,
  enableClose: !0,
  enableDrag: !0
}), Pt = (t, n, i = 0) => ({
  id: t,
  type: "tabset",
  children: n,
  selected: i,
  enableClose: !0,
  enableDrag: !0
}), Lt = (t, n, i, c) => ({
  id: t,
  type: "row",
  children: nt(n),
  width: i,
  height: c,
  enableResize: !0
}), Ft = (t, n, i, c) => ({
  id: t,
  type: "column",
  children: nt(n),
  width: i,
  height: c,
  enableResize: !0
}), _e = (t, n) => {
  if (t.id === n)
    return t;
  if (t.children)
    for (const i of t.children) {
      const c = _e(i, n);
      if (c)
        return c;
    }
  return null;
}, rt = (t, n) => {
  if (!t.children)
    return null;
  for (const i of t.children)
    if (i.id === n)
      return t;
  for (const i of t.children) {
    const c = rt(i, n);
    if (c)
      return c;
  }
  return null;
}, le = (t, n, i) => {
  if (t.id === n)
    return i === null ? null : { ...t, ...i };
  if (t.children) {
    const c = t.children.map((h) => le(h, n, i)).filter((h) => h !== null);
    return {
      ...t,
      children: c
    };
  }
  return t;
}, Nt = (t, n) => {
  if (t.children) {
    const i = t.children.filter((c) => c.id !== n).map((c) => Nt(c, n));
    return {
      ...t,
      children: i
    };
  }
  return t;
}, nt = (t) => t.map((n) => ({
  ...n,
  flex: n.flex || 1 / t.length
})), xe = (t) => {
  if (t.type === "tabset" && (!t.children || t.children.length === 0))
    return null;
  if (t.children) {
    const n = t.children.length, i = t.children.map(xe).filter((h) => h !== null), c = i.length < n;
    if (i.length === 0)
      return null;
    if ((t.type === "row" || t.type === "column") && i.length > 0) {
      const h = i.reduce(
        (a, v) => a + (v.flex || 0),
        0
      );
      if (c || h < 0.999 || i.length === 1) {
        let a;
        if (i.length === 1)
          a = i.map((v) => ({
            ...v,
            flex: 1
          }));
        else if (h === 0 || h < 1e-3) {
          const v = 1 / i.length;
          a = i.map((o) => ({
            ...o,
            flex: v
          }));
        } else {
          const v = 1 / h;
          a = i.map((o) => ({
            ...o,
            flex: (o.flex || 0) * v
          }));
        }
        return {
          ...t,
          children: a
        };
      }
      if (i.length !== n || i.some(
        (a, v) => {
          var o;
          return a !== ((o = t.children) == null ? void 0 : o[v]);
        }
      ))
        return {
          ...t,
          children: i
        };
    }
    if (i !== t.children)
      return {
        ...t,
        children: i
      };
  }
  return t;
}, Wt = (t, n) => {
  const i = we({}), c = D(
    (p, a, v) => {
      if (!n)
        return;
      const o = it(t.layout, p);
      if (!o || !o.children)
        return;
      const S = o.children.findIndex(
        (F) => F.id === p
      ), x = S + 1;
      if (x >= o.children.length)
        return;
      const O = `${p}-${v}`;
      if (!i.current[O]) {
        const F = o.children[S], z = o.children[x];
        i.current[O] = {
          current: F.flex || 1,
          sibling: z.flex || 1
        };
      }
      const y = i.current[O], P = y.current + y.sibling, $ = v === "horizontal" ? window.innerWidth : window.innerHeight, f = y.current / P * $, W = y.sibling / P * $, w = 100;
      let u = f + a, _ = W - a;
      if (u < w) {
        const F = w - u;
        u = w, _ -= F;
      }
      if (_ < w) {
        const F = w - _;
        _ = w, u -= F;
      }
      const H = u + _;
      if (H > 0) {
        const F = u / H * P, z = _ / H * P, re = le(t.layout, o.id, {
          children: o.children.map((Z, Q) => Q === S ? { ...Z, flex: F } : Q === x ? { ...Z, flex: z } : Z)
        });
        re && n({
          ...t,
          layout: re
        });
      }
    },
    [t, n]
  ), h = D(
    (p, a) => {
      const v = `${p}-${a}`;
      delete i.current[v];
    },
    []
  );
  return { handleResize: c, resetResize: h };
}, it = (t, n) => {
  if (!t.children)
    return null;
  for (const i of t.children) {
    if (i.id === n)
      return t;
    const c = it(i, n);
    if (c)
      return c;
  }
  return null;
}, zt = (t, n) => {
  const [i, c] = ye(null), [h, p] = ye(null), [a, v] = ye("center"), o = we(null), S = D(($, f) => {
    const W = { tabsetId: $, tabIndex: f };
    c(W), o.current = W;
  }, []), x = D(() => {
    c(null), o.current = null, p(null);
  }, []), O = D(
    ($, f, W = "center") => {
      $.preventDefault(), $.dataTransfer.dropEffect = "move", p(f), v(W);
    },
    []
  ), y = D(($) => {
    $.currentTarget === $.target && setTimeout(() => {
      p(null);
    }, 50);
  }, []), P = D(
    ($, f) => {
      var oe, ne, g, m, I, K;
      $.preventDefault();
      const W = o.current;
      if (!W || !n)
        return;
      const { tabsetId: w, tabIndex: u } = W;
      if (w === f)
        return;
      const _ = _e(t.layout, w), H = _e(t.layout, f);
      if (!_ || !H || !_.children || !H.children)
        return;
      const F = _.children[u];
      if (!F)
        return;
      let z = t.layout;
      const re = _.children.filter(
        (ee, l) => l !== u
      ), Z = le(
        z,
        w,
        {
          children: re,
          selected: Math.min(
            _.selected || 0,
            re.length - 1
          )
        }
      );
      if (!Z)
        return;
      if (z = Z, a === "center") {
        const ee = { ...F, id: `${F.id}-${Date.now()}` }, l = le(
          z,
          f,
          {
            children: [...H.children || [], ee],
            selected: ((oe = H.children) == null ? void 0 : oe.length) || 0
          }
        );
        if (!l)
          return;
        z = l;
      } else {
        const ee = { ...F, id: `${F.id}-${Date.now()}` }, l = Pt(
          `${f}-split-${Date.now()}`,
          [ee]
        ), k = rt(z, f);
        if (k) {
          const se = ((ne = k.children) == null ? void 0 : ne.findIndex(
            (j) => j.id === f
          )) || 0;
          if (a === "left" || a === "right") {
            const j = Lt(`${f}-row-${Date.now()}`, [
              a === "left" ? l : H,
              a === "left" ? H : l
            ]), T = le(
              z,
              k.id,
              {
                children: [
                  ...((g = k.children) == null ? void 0 : g.slice(0, se)) || [],
                  j,
                  ...((m = k.children) == null ? void 0 : m.slice(se + 1)) || []
                ]
              }
            );
            if (!T)
              return;
            z = T;
          } else if (a === "top" || a === "bottom") {
            const j = Ft(
              `${f}-column-${Date.now()}`,
              [
                a === "top" ? l : H,
                a === "top" ? H : l
              ]
            ), T = le(
              z,
              k.id,
              {
                children: [
                  ...((I = k.children) == null ? void 0 : I.slice(0, se)) || [],
                  j,
                  ...((K = k.children) == null ? void 0 : K.slice(se + 1)) || []
                ]
              }
            );
            if (!T)
              return;
            z = T;
          }
        }
      }
      const Q = xe(z);
      Q && n({
        ...t,
        layout: Q
      }), c(null), p(null);
    },
    [t, n, a]
  );
  return {
    draggedTab: i,
    dragOverTabset: h,
    dropPosition: a,
    handleDragStart: S,
    handleDragEnd: x,
    handleDragOver: O,
    handleDragLeave: y,
    handleDrop: P
  };
}, At = "react-flex-layout";
class at {
  constructor(n = {}) {
    Te(this, "storageKey");
    Te(this, "autoSave");
    Te(this, "debounceMs");
    Te(this, "saveTimeout", null);
    this.storageKey = `${At}-${n.key || "default"}`, this.autoSave = n.autoSave !== !1, this.debounceMs = n.debounceMs || 500;
  }
  /**
   * Save layout model to localStorage
   */
  save(n) {
    try {
      const i = JSON.stringify(n);
      localStorage.setItem(this.storageKey, i);
    } catch {
    }
  }
  /**
   * Load layout model from localStorage
   */
  load() {
    try {
      const n = localStorage.getItem(this.storageKey);
      if (n)
        return JSON.parse(n);
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
  debouncedSave(n) {
    this.autoSave && (this.saveTimeout && clearTimeout(this.saveTimeout), this.saveTimeout = setTimeout(() => {
      this.save(n);
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
const Xt = (t) => new at(t), qt = () => {
  try {
    const t = "__localStorage_test__";
    return localStorage.setItem(t, t), localStorage.removeItem(t), !0;
  } catch {
    return !1;
  }
}, Yt = (t, n = {}) => {
  const { onLoad: i, onSave: c, onError: h, ...p } = n, a = we(null), [v, o] = ye(t), [S, x] = ye(!1), [O, y] = ye(!1);
  Ce(() => {
    a.current = new at(p), y(!0);
  }, [p.key, p.autoSave, p.debounceMs]), Ce(() => {
    if (!a.current || S)
      return;
    const u = a.current.load();
    u ? (o(u), x(!0), i == null || i(u)) : x(!0);
  }, [S, i]);
  const P = D(
    (u) => {
      if (a.current)
        try {
          a.current.isAutoSaveEnabled() ? a.current.debouncedSave(u) : a.current.save(u), c == null || c(u);
        } catch (_) {
          h == null || h(_);
        }
    },
    [c, h]
  ), $ = D(
    (u) => {
      const _ = { ...u };
      u.global && (_.global = { ...u.global }), o(_), P(_);
    },
    [P]
  ), f = D(() => {
    if (a.current)
      try {
        a.current.clear();
      } catch (u) {
        h == null || h(u);
      }
  }, [h]), W = D(() => {
    var u;
    return ((u = a.current) == null ? void 0 : u.exists()) ?? !1;
  }, []), w = D(() => {
    var u;
    return ((u = a.current) == null ? void 0 : u.getStorageKey()) ?? "";
  }, []);
  return {
    model: v,
    updateModel: $,
    clearStorage: f,
    hasStoredData: W,
    getStorageKey: w,
    isLoaded: S,
    hasStorage: O
  };
};
const Ht = $t(
  ({
    model: t,
    factory: n,
    onModelChange: i,
    onAction: c,
    className: h = "",
    style: p = {},
    storage: a
  }, v) => {
    var K, ee;
    const [o, S] = ye(t), [x, O] = ye(
      null
    ), {
      model: y,
      updateModel: P,
      isLoaded: $
    } = Yt(t, {
      key: a == null ? void 0 : a.key,
      autoSave: a == null ? void 0 : a.autoSave,
      debounceMs: a == null ? void 0 : a.debounceMs,
      onLoad: (l) => {
        i ? i(l) : S(l);
      }
    }), f = a != null && a.enabled ? y : i ? t : o, W = D(
      (l) => {
        a != null && a.enabled ? (P(l), i && i(l)) : i ? i(l) : S(l);
      },
      [i, a == null ? void 0 : a.enabled, P]
    ), { handleResize: w, resetResize: u } = Wt(
      f,
      W
    ), {
      dragOverTabset: _,
      dropPosition: H,
      handleDragStart: F,
      handleDragEnd: z,
      handleDragOver: re,
      handleDragLeave: Z,
      handleDrop: Q
    } = zt(f, W), oe = we(y);
    Ce(() => {
      oe.current = y;
    }, [y]);
    const ne = D(
      (l) => {
        if (a != null && a.enabled) {
          const k = oe.current;
          if (l.type === "changeDirection") {
            const { direction: T } = l.payload;
            O(T);
          }
          const j = ((T) => {
            switch (l.type) {
              case "selectTab":
                const { nodeId: de, tabIndex: N } = l.payload, U = le(T.layout, de, {
                  selected: N
                });
                return {
                  ...T,
                  layout: U || T.layout
                };
              case "removeNode":
                const { nodeId: q, tabIndex: B } = l.payload, J = _e(T.layout, q);
                if (J && J.children) {
                  const M = J.children.filter(
                    (ve, je) => je !== B
                  ), ue = J.selected ?? 0;
                  let ie = ue;
                  B <= ue && (ie = Math.max(0, ue - 1)), ie = Math.min(
                    ie,
                    M.length - 1
                  );
                  const fe = {
                    ...J,
                    children: M,
                    selected: M.length > 0 ? ie : void 0
                  }, he = le(
                    T.layout,
                    q,
                    fe
                  );
                  if (he) {
                    const ve = xe(he);
                    if (ve)
                      return {
                        ...T,
                        layout: ve
                      };
                  }
                }
                return T;
              case "closeTabset":
                const { nodeId: te } = l.payload, V = le(
                  T.layout,
                  te,
                  null
                );
                if (V) {
                  const M = xe(V);
                  if (M)
                    return {
                      ...T,
                      layout: M
                    };
                }
                return T;
              case "changeDirection":
                const { direction: ce } = l.payload;
                return {
                  ...T,
                  global: {
                    ...T.global,
                    direction: ce
                  }
                };
              default:
                return T;
            }
          })(k);
          P(j), i && i(j), c == null || c(l);
        } else
          c == null || c(l);
        if (!(a != null && a.enabled) && !i) {
          const se = ((j) => {
            switch (l.type) {
              case "selectTab":
                const { nodeId: T, tabIndex: de } = l.payload, N = le(j.layout, T, {
                  selected: de
                });
                return {
                  ...j,
                  layout: N || j.layout
                };
              case "removeNode":
                const { nodeId: U, tabIndex: q } = l.payload, B = _e(j.layout, U);
                if (B && B.children) {
                  const V = B.children.filter(
                    (fe, he) => he !== q
                  ), ce = B.selected ?? 0;
                  let M = ce;
                  q <= ce && (M = Math.max(0, ce - 1)), M = Math.min(
                    M,
                    V.length - 1
                  );
                  const ue = {
                    ...B,
                    children: V,
                    selected: V.length > 0 ? M : void 0
                  }, ie = le(
                    j.layout,
                    U,
                    ue
                  );
                  if (ie) {
                    const fe = xe(ie);
                    if (fe)
                      return {
                        ...j,
                        layout: fe
                      };
                  }
                }
                return j;
              case "closeTabset":
                const { nodeId: J } = l.payload, te = le(
                  j.layout,
                  J,
                  null
                );
                if (te) {
                  const V = xe(te);
                  if (V)
                    return {
                      ...j,
                      layout: V
                    };
                }
                return j;
              default:
                return j;
            }
          })(o);
          S(se);
        }
      },
      [
        c,
        i,
        a == null ? void 0 : a.enabled,
        P,
        o,
        y,
        x,
        O
      ]
    );
    Dt(
      v,
      () => ({
        handleAction: ne
      }),
      [ne]
    );
    const g = D(
      (l) => {
        var k;
        switch (l.type) {
          case "tabset":
            return /* @__PURE__ */ L.jsx(
              tt,
              {
                node: l,
                factory: n,
                onTabSelect: (N, U) => {
                  ne({
                    type: "selectTab",
                    payload: { nodeId: N, tabIndex: U }
                  });
                },
                onTabClose: (N, U) => {
                  ne({
                    type: "removeNode",
                    payload: { nodeId: N, tabIndex: U }
                  });
                },
                onTabDragStart: F,
                onTabDragEnd: z,
                onDragOver: re,
                onDragLeave: Z,
                onDrop: Q,
                dragOverTabset: _,
                dropPosition: _ === l.id ? H : void 0,
                direction: f.global.direction || "ltr"
              },
              l.id
            );
          case "row":
            const j = (f.global.direction || "ltr") === "rtl", T = l.children || [], de = j ? [...T].reverse() : T;
            return /* @__PURE__ */ L.jsx(
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
                children: de.map((N, U) => {
                  const q = U + 1;
                  if (!(q < de.length))
                    return /* @__PURE__ */ L.jsx(ge.Fragment, { children: g(N) }, N.id);
                  const J = j ? T.length - 1 - U : U, te = j ? T.length - 1 - q : q, V = Math.min(
                    J,
                    te
                  );
                  if (Math.max(
                    J,
                    te
                  ) !== V + 1)
                    return /* @__PURE__ */ L.jsx(ge.Fragment, { children: g(N) }, N.id);
                  const M = T[V], ue = j && J > te;
                  return /* @__PURE__ */ L.jsxs(ge.Fragment, { children: [
                    g(N),
                    /* @__PURE__ */ L.jsx(
                      Ze,
                      {
                        direction: "horizontal",
                        onResize: (ie) => {
                          const fe = ue ? -ie : ie;
                          w(
                            M.id,
                            fe,
                            "horizontal"
                          );
                        },
                        onResizeStart: () => {
                          u(M.id, "horizontal");
                        },
                        size: f.global.splitterSize || 8
                      }
                    )
                  ] }, N.id);
                })
              },
              l.id
            );
          case "column":
            return /* @__PURE__ */ L.jsx(
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
                children: (k = l.children) == null ? void 0 : k.map((N, U) => {
                  var q;
                  return /* @__PURE__ */ L.jsxs(ge.Fragment, { children: [
                    g(N),
                    U < (((q = l.children) == null ? void 0 : q.length) || 0) - 1 && /* @__PURE__ */ L.jsx(
                      Ze,
                      {
                        direction: "vertical",
                        onResize: (B) => w(N.id, B, "vertical"),
                        onResizeStart: () => {
                          u(N.id, "vertical");
                        },
                        size: f.global.splitterSize || 8
                      }
                    )
                  ] }, N.id);
                })
              },
              l.id
            );
          case "tab":
            return n(l);
          default:
            return null;
        }
      },
      [
        f.global.splitterSize,
        n,
        ne,
        w,
        F,
        z,
        re,
        Z,
        Q,
        _,
        H
      ]
    );
    let m;
    a != null && a.enabled ? x !== null ? m = x : m = ((K = y == null ? void 0 : y.global) == null ? void 0 : K.direction) || "ltr" : m = ((ee = f.global) == null ? void 0 : ee.direction) || "ltr", Ce(() => {
      !(a != null && a.enabled) && x !== null && O(null);
    }, [a == null ? void 0 : a.enabled, x]);
    const I = {
      ...p,
      height: "100%",
      width: "100%"
    };
    return a != null && a.enabled && !$ ? /* @__PURE__ */ L.jsx(
      "div",
      {
        className: `react-flex-layout ${h}`,
        style: {
          ...I,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ L.jsx("div", { children: "Loading layout..." })
      }
    ) : /* @__PURE__ */ L.jsx(
      "div",
      {
        className: `react-flex-layout ${h}`,
        style: I,
        dir: m,
        children: g(f.layout)
      }
    );
  }
);
Ht.displayName = "Layout";
const Gt = ({
  size: t = 16,
  color: n = "#666",
  className: i = ""
}) => /* @__PURE__ */ L.jsxs(
  "svg",
  {
    width: t,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: n,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: i,
    children: [
      /* @__PURE__ */ L.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ L.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
), Kt = Qe(et, (t, n) => t.node.id === n.node.id && t.node.name === n.node.name && t.node.enableClose === n.node.enableClose && t.node.enableDrag === n.node.enableDrag && t.className === n.className);
Kt.displayName = "MemoizedTab";
const Ut = Qe(
  tt,
  (t, n) => {
    var i, c;
    return t.node.id === n.node.id && t.node.selected === n.node.selected && t.node.width === n.node.width && t.node.height === n.node.height && t.node.flex === n.node.flex && ((i = t.node.children) == null ? void 0 : i.length) === ((c = n.node.children) == null ? void 0 : c.length) && t.className === n.className;
  }
);
Ut.displayName = "MemoizedTabSet";
export {
  Gt as DefaultCloseIcon,
  Ht as Layout,
  at as LayoutStorage,
  Kt as MemoizedTab,
  Ut as MemoizedTabSet,
  Ze as Splitter,
  et as Tab,
  tt as TabSet,
  nt as calculateFlexValues,
  Ft as createColumn,
  Bt as createLayoutModel,
  Xt as createLayoutStorage,
  Lt as createRow,
  Jt as createTab,
  Pt as createTabSet,
  _e as findNodeById,
  qt as isLocalStorageAvailable,
  xe as removeEmptyTabsets,
  Nt as removeNodeById,
  le as updateNodeById,
  Yt as useLayoutStorage
};
