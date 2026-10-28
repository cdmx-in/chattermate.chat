var bf = Object.defineProperty;
var wf = (e, t, n) => t in e ? bf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ye = (e, t, n) => wf(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ra(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Xe = {}, Bs = [], Tn = () => {
}, kf = () => !1, Pi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ia = (e) => e.startsWith("onUpdate:"), Nt = Object.assign, oa = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Tf = Object.prototype.hasOwnProperty, We = (e, t) => Tf.call(e, t), ke = Array.isArray, Us = (e) => Di(e) === "[object Map]", yc = (e) => Di(e) === "[object Set]", Se = (e) => typeof e == "function", _t = (e) => typeof e == "string", es = (e) => typeof e == "symbol", ft = (e) => e !== null && typeof e == "object", vc = (e) => (ft(e) || Se(e)) && Se(e.then) && Se(e.catch), bc = Object.prototype.toString, Di = (e) => bc.call(e), Af = (e) => Di(e).slice(8, -1), wc = (e) => Di(e) === "[object Object]", aa = (e) => _t(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ar = /* @__PURE__ */ ra(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Mi = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Sf = /-(\w)/g, Zn = Mi(
  (e) => e.replace(Sf, (t, n) => n ? n.toUpperCase() : "")
), xf = /\B([A-Z])/g, ts = Mi(
  (e) => e.replace(xf, "-$1").toLowerCase()
), kc = Mi((e) => e.charAt(0).toUpperCase() + e.slice(1)), lo = Mi(
  (e) => e ? `on${kc(e)}` : ""
), Gn = (e, t) => !Object.is(e, t), ii = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Po = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Do = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let rl;
const Fi = () => rl || (rl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Pe(e) {
  if (ke(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = _t(s) ? If(s) : Pe(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (_t(e) || ft(e))
    return e;
}
const Ef = /;(?![^(]*\))/g, Cf = /:([^]+)/, Rf = /\/\*[^]*?\*\//g;
function If(e) {
  const t = {};
  return e.replace(Rf, "").split(Ef).forEach((n) => {
    if (n) {
      const s = n.split(Cf);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function $e(e) {
  let t = "";
  if (_t(e))
    t = e;
  else if (ke(e))
    for (let n = 0; n < e.length; n++) {
      const s = $e(e[n]);
      s && (t += s + " ");
    }
  else if (ft(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Lf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Of = /* @__PURE__ */ ra(Lf);
function Tc(e) {
  return !!e || e === "";
}
const Ac = (e) => !!(e && e.__v_isRef === !0), se = (e) => _t(e) ? e : e == null ? "" : ke(e) || ft(e) && (e.toString === bc || !Se(e.toString)) ? Ac(e) ? se(e.value) : JSON.stringify(e, Sc, 2) : String(e), Sc = (e, t) => Ac(t) ? Sc(e, t.value) : Us(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[co(s, i) + " =>"] = r, n),
    {}
  )
} : yc(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => co(n))
} : es(t) ? co(t) : ft(t) && !ke(t) && !wc(t) ? String(t) : t, co = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    es(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ht;
class Nf {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Ht, !t && Ht && (this.index = (Ht.scopes || (Ht.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Ht;
      try {
        return Ht = this, t();
      } finally {
        Ht = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ht, Ht = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Ht = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Pf() {
  return Ht;
}
let et;
const uo = /* @__PURE__ */ new WeakSet();
class xc {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ht && Ht.active && Ht.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, uo.has(this) && (uo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Cc(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, il(this), Rc(this);
    const t = et, n = hn;
    et = this, hn = !0;
    try {
      return this.fn();
    } finally {
      Ic(this), et = t, hn = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ua(t);
      this.deps = this.depsTail = void 0, il(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? uo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Mo(this) && this.run();
  }
  get dirty() {
    return Mo(this);
  }
}
let Ec = 0, Sr, xr;
function Cc(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = xr, xr = e;
    return;
  }
  e.next = Sr, Sr = e;
}
function la() {
  Ec++;
}
function ca() {
  if (--Ec > 0)
    return;
  if (xr) {
    let t = xr;
    for (xr = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Sr; ) {
    let t = Sr;
    for (Sr = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Rc(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ic(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), ua(s), Df(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Mo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Lc(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Lc(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Nr) || (e.globalVersion = Nr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Mo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = et, s = hn;
  et = e, hn = !0;
  try {
    Rc(e);
    const r = e.fn(e._value);
    (t.version === 0 || Gn(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    et = n, hn = s, Ic(e), e.flags &= -3;
  }
}
function ua(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      ua(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Df(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let hn = !0;
const Oc = [];
function Fn() {
  Oc.push(hn), hn = !1;
}
function $n() {
  const e = Oc.pop();
  hn = e === void 0 ? !0 : e;
}
function il(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = et;
    et = void 0;
    try {
      t();
    } finally {
      et = n;
    }
  }
}
let Nr = 0;
class Mf {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class fa {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!et || !hn || et === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== et)
      n = this.activeLink = new Mf(et, this), et.deps ? (n.prevDep = et.depsTail, et.depsTail.nextDep = n, et.depsTail = n) : et.deps = et.depsTail = n, Nc(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = et.depsTail, n.nextDep = void 0, et.depsTail.nextDep = n, et.depsTail = n, et.deps === n && (et.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Nr++, this.notify(t);
  }
  notify(t) {
    la();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      ca();
    }
  }
}
function Nc(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Nc(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Fo = /* @__PURE__ */ new WeakMap(), bs = Symbol(
  ""
), $o = Symbol(
  ""
), Pr = Symbol(
  ""
);
function Lt(e, t, n) {
  if (hn && et) {
    let s = Fo.get(e);
    s || Fo.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new fa()), r.map = s, r.key = n), r.track();
  }
}
function Nn(e, t, n, s, r, i) {
  const o = Fo.get(e);
  if (!o) {
    Nr++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (la(), t === "clear")
    o.forEach(a);
  else {
    const l = ke(e), p = l && aa(n);
    if (l && n === "length") {
      const u = Number(s);
      o.forEach((b, w) => {
        (w === "length" || w === Pr || !es(w) && w >= u) && a(b);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && a(o.get(n)), p && a(o.get(Pr)), t) {
        case "add":
          l ? p && a(o.get("length")) : (a(o.get(bs)), Us(e) && a(o.get($o)));
          break;
        case "delete":
          l || (a(o.get(bs)), Us(e) && a(o.get($o)));
          break;
        case "set":
          Us(e) && a(o.get(bs));
          break;
      }
  }
  ca();
}
function Ds(e) {
  const t = He(e);
  return t === e ? t : (Lt(t, "iterate", Pr), on(e) ? t : t.map(Ct));
}
function $i(e) {
  return Lt(e = He(e), "iterate", Pr), e;
}
const Ff = {
  __proto__: null,
  [Symbol.iterator]() {
    return fo(this, Symbol.iterator, Ct);
  },
  concat(...e) {
    return Ds(this).concat(
      ...e.map((t) => ke(t) ? Ds(t) : t)
    );
  },
  entries() {
    return fo(this, "entries", (e) => (e[1] = Ct(e[1]), e));
  },
  every(e, t) {
    return In(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return In(this, "filter", e, t, (n) => n.map(Ct), arguments);
  },
  find(e, t) {
    return In(this, "find", e, t, Ct, arguments);
  },
  findIndex(e, t) {
    return In(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return In(this, "findLast", e, t, Ct, arguments);
  },
  findLastIndex(e, t) {
    return In(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return In(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ho(this, "includes", e);
  },
  indexOf(...e) {
    return ho(this, "indexOf", e);
  },
  join(e) {
    return Ds(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return ho(this, "lastIndexOf", e);
  },
  map(e, t) {
    return In(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ur(this, "pop");
  },
  push(...e) {
    return ur(this, "push", e);
  },
  reduce(e, ...t) {
    return ol(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ol(this, "reduceRight", e, t);
  },
  shift() {
    return ur(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return In(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ur(this, "splice", e);
  },
  toReversed() {
    return Ds(this).toReversed();
  },
  toSorted(e) {
    return Ds(this).toSorted(e);
  },
  toSpliced(...e) {
    return Ds(this).toSpliced(...e);
  },
  unshift(...e) {
    return ur(this, "unshift", e);
  },
  values() {
    return fo(this, "values", Ct);
  }
};
function fo(e, t, n) {
  const s = $i(e), r = s[t]();
  return s !== e && !on(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.value && (i.value = n(i.value)), i;
  }), r;
}
const $f = Array.prototype;
function In(e, t, n, s, r, i) {
  const o = $i(e), a = o !== e && !on(e), l = o[t];
  if (l !== $f[t]) {
    const b = l.apply(e, i);
    return a ? Ct(b) : b;
  }
  let p = n;
  o !== e && (a ? p = function(b, w) {
    return n.call(this, Ct(b), w, e);
  } : n.length > 2 && (p = function(b, w) {
    return n.call(this, b, w, e);
  }));
  const u = l.call(o, p, s);
  return a && r ? r(u) : u;
}
function ol(e, t, n, s) {
  const r = $i(e);
  let i = n;
  return r !== e && (on(e) ? n.length > 3 && (i = function(o, a, l) {
    return n.call(this, o, a, l, e);
  }) : i = function(o, a, l) {
    return n.call(this, o, Ct(a), l, e);
  }), r[t](i, ...s);
}
function ho(e, t, n) {
  const s = He(e);
  Lt(s, "iterate", Pr);
  const r = s[t](...n);
  return (r === -1 || r === !1) && pa(n[0]) ? (n[0] = He(n[0]), s[t](...n)) : r;
}
function ur(e, t, n = []) {
  Fn(), la();
  const s = He(e)[t].apply(e, n);
  return ca(), $n(), s;
}
const Bf = /* @__PURE__ */ ra("__proto__,__v_isRef,__isVue"), Pc = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(es)
);
function Uf(e) {
  es(e) || (e = String(e));
  const t = He(this);
  return Lt(t, "has", e), t.hasOwnProperty(e);
}
class Dc {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return s === (r ? i ? Xf : Bc : i ? $c : Fc).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = ke(t);
    if (!r) {
      let l;
      if (o && (l = Ff[n]))
        return l;
      if (n === "hasOwnProperty")
        return Uf;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Ot(t) ? t : s
    );
    return (es(n) ? Pc.has(n) : Bf(n)) || (r || Lt(t, "get", n), i) ? a : Ot(a) ? o && aa(n) ? a : a.value : ft(a) ? r ? Uc(a) : Bi(a) : a;
  }
}
class Mc extends Dc {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    if (!this._isShallow) {
      const l = Jn(i);
      if (!on(s) && !Jn(s) && (i = He(i), s = He(s)), !ke(t) && Ot(i) && !Ot(s))
        return l ? !1 : (i.value = s, !0);
    }
    const o = ke(t) && aa(n) ? Number(n) < t.length : We(t, n), a = Reflect.set(
      t,
      n,
      s,
      Ot(t) ? t : r
    );
    return t === He(r) && (o ? Gn(s, i) && Nn(t, "set", n, s) : Nn(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = We(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Nn(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!es(n) || !Pc.has(n)) && Lt(t, "has", n), s;
  }
  ownKeys(t) {
    return Lt(
      t,
      "iterate",
      ke(t) ? "length" : bs
    ), Reflect.ownKeys(t);
  }
}
class zf extends Dc {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Hf = /* @__PURE__ */ new Mc(), Wf = /* @__PURE__ */ new zf(), qf = /* @__PURE__ */ new Mc(!0);
const Bo = (e) => e, Jr = (e) => Reflect.getPrototypeOf(e);
function jf(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = He(r), o = Us(i), a = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, p = r[e](...s), u = n ? Bo : t ? bi : Ct;
    return !t && Lt(
      i,
      "iterate",
      l ? $o : bs
    ), {
      // iterator protocol
      next() {
        const { value: b, done: w } = p.next();
        return w ? { value: b, done: w } : {
          value: a ? [u(b[0]), u(b[1])] : u(b),
          done: w
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Qr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Vf(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = He(i), a = He(r);
      e || (Gn(r, a) && Lt(o, "get", r), Lt(o, "get", a));
      const { has: l } = Jr(o), p = t ? Bo : e ? bi : Ct;
      if (l.call(o, r))
        return p(i.get(r));
      if (l.call(o, a))
        return p(i.get(a));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && Lt(He(r), "iterate", bs), Reflect.get(r, "size", r);
    },
    has(r) {
      const i = this.__v_raw, o = He(i), a = He(r);
      return e || (Gn(r, a) && Lt(o, "has", r), Lt(o, "has", a)), r === a ? i.has(r) : i.has(r) || i.has(a);
    },
    forEach(r, i) {
      const o = this, a = o.__v_raw, l = He(a), p = t ? Bo : e ? bi : Ct;
      return !e && Lt(l, "iterate", bs), a.forEach((u, b) => r.call(i, p(u), p(b), o));
    }
  };
  return Nt(
    n,
    e ? {
      add: Qr("add"),
      set: Qr("set"),
      delete: Qr("delete"),
      clear: Qr("clear")
    } : {
      add(r) {
        !t && !on(r) && !Jn(r) && (r = He(r));
        const i = He(this);
        return Jr(i).has.call(i, r) || (i.add(r), Nn(i, "add", r, r)), this;
      },
      set(r, i) {
        !t && !on(i) && !Jn(i) && (i = He(i));
        const o = He(this), { has: a, get: l } = Jr(o);
        let p = a.call(o, r);
        p || (r = He(r), p = a.call(o, r));
        const u = l.call(o, r);
        return o.set(r, i), p ? Gn(i, u) && Nn(o, "set", r, i) : Nn(o, "add", r, i), this;
      },
      delete(r) {
        const i = He(this), { has: o, get: a } = Jr(i);
        let l = o.call(i, r);
        l || (r = He(r), l = o.call(i, r)), a && a.call(i, r);
        const p = i.delete(r);
        return l && Nn(i, "delete", r, void 0), p;
      },
      clear() {
        const r = He(this), i = r.size !== 0, o = r.clear();
        return i && Nn(
          r,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = jf(r, e, t);
  }), n;
}
function ha(e, t) {
  const n = Vf(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    We(n, r) && r in s ? n : s,
    r,
    i
  );
}
const Kf = {
  get: /* @__PURE__ */ ha(!1, !1)
}, Gf = {
  get: /* @__PURE__ */ ha(!1, !0)
}, Yf = {
  get: /* @__PURE__ */ ha(!0, !1)
};
const Fc = /* @__PURE__ */ new WeakMap(), $c = /* @__PURE__ */ new WeakMap(), Bc = /* @__PURE__ */ new WeakMap(), Xf = /* @__PURE__ */ new WeakMap();
function Zf(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Jf(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Zf(Af(e));
}
function Bi(e) {
  return Jn(e) ? e : da(
    e,
    !1,
    Hf,
    Kf,
    Fc
  );
}
function Qf(e) {
  return da(
    e,
    !1,
    qf,
    Gf,
    $c
  );
}
function Uc(e) {
  return da(
    e,
    !0,
    Wf,
    Yf,
    Bc
  );
}
function da(e, t, n, s, r) {
  if (!ft(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = Jf(e);
  if (i === 0)
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const a = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, a), a;
}
function zs(e) {
  return Jn(e) ? zs(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Jn(e) {
  return !!(e && e.__v_isReadonly);
}
function on(e) {
  return !!(e && e.__v_isShallow);
}
function pa(e) {
  return e ? !!e.__v_raw : !1;
}
function He(e) {
  const t = e && e.__v_raw;
  return t ? He(t) : e;
}
function eh(e) {
  return !We(e, "__v_skip") && Object.isExtensible(e) && Po(e, "__v_skip", !0), e;
}
const Ct = (e) => ft(e) ? Bi(e) : e, bi = (e) => ft(e) ? Uc(e) : e;
function Ot(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ue(e) {
  return th(e, !1);
}
function th(e, t) {
  return Ot(e) ? e : new nh(e, t);
}
class nh {
  constructor(t, n) {
    this.dep = new fa(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : He(t), this._value = n ? t : Ct(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || on(t) || Jn(t);
    t = s ? t : He(t), Gn(t, n) && (this._rawValue = t, this._value = s ? t : Ct(t), this.dep.trigger());
  }
}
function C(e) {
  return Ot(e) ? e.value : e;
}
const sh = {
  get: (e, t, n) => t === "__v_raw" ? e : C(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return Ot(r) && !Ot(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function zc(e) {
  return zs(e) ? e : new Proxy(e, sh);
}
class rh {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new fa(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Nr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    et !== this)
      return Cc(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Lc(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function ih(e, t, n = !1) {
  let s, r;
  return Se(e) ? s = e : (s = e.get, r = e.set), new rh(s, r, n);
}
const ei = {}, wi = /* @__PURE__ */ new WeakMap();
let gs;
function oh(e, t = !1, n = gs) {
  if (n) {
    let s = wi.get(n);
    s || wi.set(n, s = []), s.push(e);
  }
}
function ah(e, t, n = Xe) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: a, call: l } = n, p = (x) => r ? x : on(x) || r === !1 || r === 0 ? Pn(x, 1) : Pn(x);
  let u, b, w, U, $ = !1, V = !1;
  if (Ot(e) ? (b = () => e.value, $ = on(e)) : zs(e) ? (b = () => p(e), $ = !0) : ke(e) ? (V = !0, $ = e.some((x) => zs(x) || on(x)), b = () => e.map((x) => {
    if (Ot(x))
      return x.value;
    if (zs(x))
      return p(x);
    if (Se(x))
      return l ? l(x, 2) : x();
  })) : Se(e) ? t ? b = l ? () => l(e, 2) : e : b = () => {
    if (w) {
      Fn();
      try {
        w();
      } finally {
        $n();
      }
    }
    const x = gs;
    gs = u;
    try {
      return l ? l(e, 3, [U]) : e(U);
    } finally {
      gs = x;
    }
  } : b = Tn, t && r) {
    const x = b, O = r === !0 ? 1 / 0 : r;
    b = () => Pn(x(), O);
  }
  const D = Pf(), te = () => {
    u.stop(), D && D.active && oa(D.effects, u);
  };
  if (i && t) {
    const x = t;
    t = (...O) => {
      x(...O), te();
    };
  }
  let fe = V ? new Array(e.length).fill(ei) : ei;
  const de = (x) => {
    if (!(!(u.flags & 1) || !u.dirty && !x))
      if (t) {
        const O = u.run();
        if (r || $ || (V ? O.some((Y, X) => Gn(Y, fe[X])) : Gn(O, fe))) {
          w && w();
          const Y = gs;
          gs = u;
          try {
            const X = [
              O,
              // pass undefined as the old value when it's changed for the first time
              fe === ei ? void 0 : V && fe[0] === ei ? [] : fe,
              U
            ];
            fe = O, l ? l(t, 3, X) : (
              // @ts-expect-error
              t(...X)
            );
          } finally {
            gs = Y;
          }
        }
      } else
        u.run();
  };
  return a && a(de), u = new xc(b), u.scheduler = o ? () => o(de, !1) : de, U = (x) => oh(x, !1, u), w = u.onStop = () => {
    const x = wi.get(u);
    if (x) {
      if (l)
        l(x, 4);
      else
        for (const O of x) O();
      wi.delete(u);
    }
  }, t ? s ? de(!0) : fe = u.run() : o ? o(de.bind(null, !0), !0) : u.run(), te.pause = u.pause.bind(u), te.resume = u.resume.bind(u), te.stop = te, te;
}
function Pn(e, t = 1 / 0, n) {
  if (t <= 0 || !ft(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, Ot(e))
    Pn(e.value, t, n);
  else if (ke(e))
    for (let s = 0; s < e.length; s++)
      Pn(e[s], t, n);
  else if (yc(e) || Us(e))
    e.forEach((s) => {
      Pn(s, t, n);
    });
  else if (wc(e)) {
    for (const s in e)
      Pn(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Pn(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function $r(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Ui(r, t, n);
  }
}
function xn(e, t, n, s) {
  if (Se(e)) {
    const r = $r(e, t, n, s);
    return r && vc(r) && r.catch((i) => {
      Ui(i, t, n);
    }), r;
  }
  if (ke(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(xn(e[i], t, n, s));
    return r;
  }
}
function Ui(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || Xe;
  if (t) {
    let a = t.parent;
    const l = t.proxy, p = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const u = a.ec;
      if (u) {
        for (let b = 0; b < u.length; b++)
          if (u[b](e, l, p) === !1)
            return;
      }
      a = a.parent;
    }
    if (i) {
      Fn(), $r(i, null, 10, [
        e,
        l,
        p
      ]), $n();
      return;
    }
  }
  lh(e, n, r, s, o);
}
function lh(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Bt = [];
let wn = -1;
const Hs = [];
let Vn = null, Ms = 0;
const Hc = /* @__PURE__ */ Promise.resolve();
let ki = null;
function ws(e) {
  const t = ki || Hc;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ch(e) {
  let t = wn + 1, n = Bt.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = Bt[s], i = Dr(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function ga(e) {
  if (!(e.flags & 1)) {
    const t = Dr(e), n = Bt[Bt.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Dr(n) ? Bt.push(e) : Bt.splice(ch(t), 0, e), e.flags |= 1, Wc();
  }
}
function Wc() {
  ki || (ki = Hc.then(jc));
}
function uh(e) {
  ke(e) ? Hs.push(...e) : Vn && e.id === -1 ? Vn.splice(Ms + 1, 0, e) : e.flags & 1 || (Hs.push(e), e.flags |= 1), Wc();
}
function al(e, t, n = wn + 1) {
  for (; n < Bt.length; n++) {
    const s = Bt[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      Bt.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function qc(e) {
  if (Hs.length) {
    const t = [...new Set(Hs)].sort(
      (n, s) => Dr(n) - Dr(s)
    );
    if (Hs.length = 0, Vn) {
      Vn.push(...t);
      return;
    }
    for (Vn = t, Ms = 0; Ms < Vn.length; Ms++) {
      const n = Vn[Ms];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Vn = null, Ms = 0;
  }
}
const Dr = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function jc(e) {
  try {
    for (wn = 0; wn < Bt.length; wn++) {
      const t = Bt[wn];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), $r(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; wn < Bt.length; wn++) {
      const t = Bt[wn];
      t && (t.flags &= -2);
    }
    wn = -1, Bt.length = 0, qc(), ki = null, (Bt.length || Hs.length) && jc();
  }
}
let rn = null, Vc = null;
function Ti(e) {
  const t = rn;
  return rn = e, Vc = e && e.type.__scopeId || null, t;
}
function fh(e, t = rn, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && ml(-1);
    const i = Ti(t);
    let o;
    try {
      o = e(...r);
    } finally {
      Ti(i), s._d && ml(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function qn(e, t) {
  if (rn === null)
    return e;
  const n = ji(rn), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, a, l = Xe] = t[r];
    i && (Se(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Pn(o), s.push({
      dir: i,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: a,
      modifiers: l
    }));
  }
  return e;
}
function fs(e, t, n, s) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const a = r[o];
    i && (a.oldValue = i[o].value);
    let l = a.dir[s];
    l && (Fn(), xn(l, n, 8, [
      e.el,
      a,
      e,
      t
    ]), $n());
  }
}
const hh = Symbol("_vte"), dh = (e) => e.__isTeleport;
function ma(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, ma(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function _a(e, t) {
  return Se(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Nt({ name: e.name }, t, { setup: e })
  ) : e;
}
function Kc(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Er(e, t, n, s, r = !1) {
  if (ke(e)) {
    e.forEach(
      ($, V) => Er(
        $,
        t && (ke(t) ? t[V] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (Cr(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Er(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? ji(s.component) : s.el, o = r ? null : i, { i: a, r: l } = e, p = t && t.r, u = a.refs === Xe ? a.refs = {} : a.refs, b = a.setupState, w = He(b), U = b === Xe ? () => !1 : ($) => We(w, $);
  if (p != null && p !== l && (_t(p) ? (u[p] = null, U(p) && (b[p] = null)) : Ot(p) && (p.value = null)), Se(l))
    $r(l, a, 12, [o, u]);
  else {
    const $ = _t(l), V = Ot(l);
    if ($ || V) {
      const D = () => {
        if (e.f) {
          const te = $ ? U(l) ? b[l] : u[l] : l.value;
          r ? ke(te) && oa(te, i) : ke(te) ? te.includes(i) || te.push(i) : $ ? (u[l] = [i], U(l) && (b[l] = u[l])) : (l.value = [i], e.k && (u[e.k] = l.value));
        } else $ ? (u[l] = o, U(l) && (b[l] = o)) : V && (l.value = o, e.k && (u[e.k] = o));
      };
      o ? (D.id = -1, Gt(D, n)) : D();
    }
  }
}
Fi().requestIdleCallback;
Fi().cancelIdleCallback;
const Cr = (e) => !!e.type.__asyncLoader, Gc = (e) => e.type.__isKeepAlive;
function ph(e, t) {
  Yc(e, "a", t);
}
function gh(e, t) {
  Yc(e, "da", t);
}
function Yc(e, t, n = Ut) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (zi(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Gc(r.parent.vnode) && mh(s, t, n, r), r = r.parent;
  }
}
function mh(e, t, n, s) {
  const r = zi(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Br(() => {
    oa(s[t], r);
  }, n);
}
function zi(e, t, n = Ut, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Fn();
      const a = Ur(n), l = xn(t, n, e, o);
      return a(), $n(), l;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Bn = (e) => (t, n = Ut) => {
  (!Fr || e === "sp") && zi(e, (...s) => t(...s), n);
}, _h = Bn("bm"), Hi = Bn("m"), yh = Bn(
  "bu"
), vh = Bn("u"), Xc = Bn(
  "bum"
), Br = Bn("um"), bh = Bn(
  "sp"
), wh = Bn("rtg"), kh = Bn("rtc");
function Th(e, t = Ut) {
  zi("ec", e, t);
}
const Ah = Symbol.for("v-ndc");
function Et(e, t, n, s) {
  let r;
  const i = n, o = ke(e);
  if (o || _t(e)) {
    const a = o && zs(e);
    let l = !1, p = !1;
    a && (l = !on(e), p = Jn(e), e = $i(e)), r = new Array(e.length);
    for (let u = 0, b = e.length; u < b; u++)
      r[u] = t(
        l ? p ? bi(Ct(e[u])) : Ct(e[u]) : e[u],
        u,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let a = 0; a < e; a++)
      r[a] = t(a + 1, a, void 0, i);
  } else if (ft(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (a, l) => t(a, l, void 0, i)
      );
    else {
      const a = Object.keys(e);
      r = new Array(a.length);
      for (let l = 0, p = a.length; l < p; l++) {
        const u = a[l];
        r[l] = t(e[u], u, l, i);
      }
    }
  else
    r = [];
  return r;
}
const Uo = (e) => e ? _u(e) ? ji(e) : Uo(e.parent) : null, Rr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Nt(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Uo(e.parent),
    $root: (e) => Uo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Jc(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ga(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ws.bind(e.proxy)),
    $watch: (e) => Vh.bind(e)
  })
), po = (e, t) => e !== Xe && !e.__isScriptSetup && We(e, t), Sh = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: a, appContext: l } = e;
    let p;
    if (t[0] !== "$") {
      const U = o[t];
      if (U !== void 0)
        switch (U) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (po(s, t))
          return o[t] = 1, s[t];
        if (r !== Xe && We(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && We(p, t)
        )
          return o[t] = 3, i[t];
        if (n !== Xe && We(n, t))
          return o[t] = 4, n[t];
        zo && (o[t] = 0);
      }
    }
    const u = Rr[t];
    let b, w;
    if (u)
      return t === "$attrs" && Lt(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (b = a.__cssModules) && (b = b[t])
    )
      return b;
    if (n !== Xe && We(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      w = l.config.globalProperties, We(w, t)
    )
      return w[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return po(r, t) ? (r[t] = n, !0) : s !== Xe && We(s, t) ? (s[t] = n, !0) : We(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i }
  }, o) {
    let a;
    return !!n[o] || e !== Xe && We(e, o) || po(t, o) || (a = i[0]) && We(a, o) || We(s, o) || We(Rr, o) || We(r.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : We(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function ll(e) {
  return ke(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let zo = !0;
function xh(e) {
  const t = Jc(e), n = e.proxy, s = e.ctx;
  zo = !1, t.beforeCreate && cl(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: a,
    provide: l,
    inject: p,
    // lifecycle
    created: u,
    beforeMount: b,
    mounted: w,
    beforeUpdate: U,
    updated: $,
    activated: V,
    deactivated: D,
    beforeDestroy: te,
    beforeUnmount: fe,
    destroyed: de,
    unmounted: x,
    render: O,
    renderTracked: Y,
    renderTriggered: X,
    errorCaptured: xe,
    serverPrefetch: Le,
    // public API
    expose: we,
    inheritAttrs: De,
    // assets
    components: Te,
    directives: je,
    filters: Fe
  } = t;
  if (p && Eh(p, s, null), o)
    for (const ye in o) {
      const me = o[ye];
      Se(me) && (s[ye] = me.bind(n));
    }
  if (r) {
    const ye = r.call(n, n);
    ft(ye) && (e.data = Bi(ye));
  }
  if (zo = !0, i)
    for (const ye in i) {
      const me = i[ye], Je = Se(me) ? me.bind(n, n) : Se(me.get) ? me.get.bind(n, n) : Tn, Qe = !Se(me) && Se(me.set) ? me.set.bind(n) : Tn, st = ge({
        get: Je,
        set: Qe
      });
      Object.defineProperty(s, ye, {
        enumerable: !0,
        configurable: !0,
        get: () => st.value,
        set: (Ee) => st.value = Ee
      });
    }
  if (a)
    for (const ye in a)
      Zc(a[ye], s, n, ye);
  if (l) {
    const ye = Se(l) ? l.call(n) : l;
    Reflect.ownKeys(ye).forEach((me) => {
      Nh(me, ye[me]);
    });
  }
  u && cl(u, e, "c");
  function he(ye, me) {
    ke(me) ? me.forEach((Je) => ye(Je.bind(n))) : me && ye(me.bind(n));
  }
  if (he(_h, b), he(Hi, w), he(yh, U), he(vh, $), he(ph, V), he(gh, D), he(Th, xe), he(kh, Y), he(wh, X), he(Xc, fe), he(Br, x), he(bh, Le), ke(we))
    if (we.length) {
      const ye = e.exposed || (e.exposed = {});
      we.forEach((me) => {
        Object.defineProperty(ye, me, {
          get: () => n[me],
          set: (Je) => n[me] = Je,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  O && e.render === Tn && (e.render = O), De != null && (e.inheritAttrs = De), Te && (e.components = Te), je && (e.directives = je), Le && Kc(e);
}
function Eh(e, t, n = Tn) {
  ke(e) && (e = Ho(e));
  for (const s in e) {
    const r = e[s];
    let i;
    ft(r) ? "default" in r ? i = oi(
      r.from || s,
      r.default,
      !0
    ) : i = oi(r.from || s) : i = oi(r), Ot(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function cl(e, t, n) {
  xn(
    ke(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Zc(e, t, n, s) {
  let r = s.includes(".") ? fu(n, s) : () => n[s];
  if (_t(e)) {
    const i = t[e];
    Se(i) && $t(r, i);
  } else if (Se(e))
    $t(r, e.bind(n));
  else if (ft(e))
    if (ke(e))
      e.forEach((i) => Zc(i, t, n, s));
    else {
      const i = Se(e.handler) ? e.handler.bind(n) : t[e.handler];
      Se(i) && $t(r, i, e);
    }
}
function Jc(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, a = i.get(t);
  let l;
  return a ? l = a : !r.length && !n && !s ? l = t : (l = {}, r.length && r.forEach(
    (p) => Ai(l, p, o, !0)
  ), Ai(l, t, o)), ft(t) && i.set(t, l), l;
}
function Ai(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && Ai(e, i, n, !0), r && r.forEach(
    (o) => Ai(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const a = Ch[o] || n && n[o];
      e[o] = a ? a(e[o], t[o]) : t[o];
    }
  return e;
}
const Ch = {
  data: ul,
  props: fl,
  emits: fl,
  // objects
  methods: br,
  computed: br,
  // lifecycle
  beforeCreate: Mt,
  created: Mt,
  beforeMount: Mt,
  mounted: Mt,
  beforeUpdate: Mt,
  updated: Mt,
  beforeDestroy: Mt,
  beforeUnmount: Mt,
  destroyed: Mt,
  unmounted: Mt,
  activated: Mt,
  deactivated: Mt,
  errorCaptured: Mt,
  serverPrefetch: Mt,
  // assets
  components: br,
  directives: br,
  // watch
  watch: Ih,
  // provide / inject
  provide: ul,
  inject: Rh
};
function ul(e, t) {
  return t ? e ? function() {
    return Nt(
      Se(e) ? e.call(this, this) : e,
      Se(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Rh(e, t) {
  return br(Ho(e), Ho(t));
}
function Ho(e) {
  if (ke(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Mt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function br(e, t) {
  return e ? Nt(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function fl(e, t) {
  return e ? ke(e) && ke(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Nt(
    /* @__PURE__ */ Object.create(null),
    ll(e),
    ll(t ?? {})
  ) : t;
}
function Ih(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Nt(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Mt(e[s], t[s]);
  return n;
}
function Qc() {
  return {
    app: null,
    config: {
      isNativeTag: kf,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Lh = 0;
function Oh(e, t) {
  return function(s, r = null) {
    Se(s) || (s = Nt({}, s)), r != null && !ft(r) && (r = null);
    const i = Qc(), o = /* @__PURE__ */ new WeakSet(), a = [];
    let l = !1;
    const p = i.app = {
      _uid: Lh++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: dd,
      get config() {
        return i.config;
      },
      set config(u) {
      },
      use(u, ...b) {
        return o.has(u) || (u && Se(u.install) ? (o.add(u), u.install(p, ...b)) : Se(u) && (o.add(u), u(p, ...b))), p;
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), p;
      },
      component(u, b) {
        return b ? (i.components[u] = b, p) : i.components[u];
      },
      directive(u, b) {
        return b ? (i.directives[u] = b, p) : i.directives[u];
      },
      mount(u, b, w) {
        if (!l) {
          const U = p._ceVNode || An(s, r);
          return U.appContext = i, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(U, u, w), l = !0, p._container = u, u.__vue_app__ = p, ji(U.component);
        }
      },
      onUnmount(u) {
        a.push(u);
      },
      unmount() {
        l && (xn(
          a,
          p._instance,
          16
        ), e(null, p._container), delete p._container.__vue_app__);
      },
      provide(u, b) {
        return i.provides[u] = b, p;
      },
      runWithContext(u) {
        const b = Ws;
        Ws = p;
        try {
          return u();
        } finally {
          Ws = b;
        }
      }
    };
    return p;
  };
}
let Ws = null;
function Nh(e, t) {
  if (Ut) {
    let n = Ut.provides;
    const s = Ut.parent && Ut.parent.provides;
    s === n && (n = Ut.provides = Object.create(s)), n[e] = t;
  }
}
function oi(e, t, n = !1) {
  const s = ad();
  if (s || Ws) {
    let r = Ws ? Ws._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && Se(t) ? t.call(s && s.proxy) : t;
  }
}
const eu = {}, tu = () => Object.create(eu), nu = (e) => Object.getPrototypeOf(e) === eu;
function Ph(e, t, n, s = !1) {
  const r = {}, i = tu();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), su(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : Qf(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function Dh(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, a = He(r), [l] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const u = e.vnode.dynamicProps;
      for (let b = 0; b < u.length; b++) {
        let w = u[b];
        if (Wi(e.emitsOptions, w))
          continue;
        const U = t[w];
        if (l)
          if (We(i, w))
            U !== i[w] && (i[w] = U, p = !0);
          else {
            const $ = Zn(w);
            r[$] = Wo(
              l,
              a,
              $,
              U,
              e,
              !1
            );
          }
        else
          U !== i[w] && (i[w] = U, p = !0);
      }
    }
  } else {
    su(e, t, r, i) && (p = !0);
    let u;
    for (const b in a)
      (!t || // for camelCase
      !We(t, b) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = ts(b)) === b || !We(t, u))) && (l ? n && // for camelCase
      (n[b] !== void 0 || // for kebab-case
      n[u] !== void 0) && (r[b] = Wo(
        l,
        a,
        b,
        void 0,
        e,
        !0
      )) : delete r[b]);
    if (i !== a)
      for (const b in i)
        (!t || !We(t, b)) && (delete i[b], p = !0);
  }
  p && Nn(e.attrs, "set", "");
}
function su(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, a;
  if (t)
    for (let l in t) {
      if (Ar(l))
        continue;
      const p = t[l];
      let u;
      r && We(r, u = Zn(l)) ? !i || !i.includes(u) ? n[u] = p : (a || (a = {}))[u] = p : Wi(e.emitsOptions, l) || (!(l in s) || p !== s[l]) && (s[l] = p, o = !0);
    }
  if (i) {
    const l = He(n), p = a || Xe;
    for (let u = 0; u < i.length; u++) {
      const b = i[u];
      n[b] = Wo(
        r,
        l,
        b,
        p[b],
        e,
        !We(p, b)
      );
    }
  }
  return o;
}
function Wo(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const a = We(o, "default");
    if (a && s === void 0) {
      const l = o.default;
      if (o.type !== Function && !o.skipFactory && Se(l)) {
        const { propsDefaults: p } = r;
        if (n in p)
          s = p[n];
        else {
          const u = Ur(r);
          s = p[n] = l.call(
            null,
            t
          ), u();
        }
      } else
        s = l;
      r.ce && r.ce._setProp(n, s);
    }
    o[
      0
      /* shouldCast */
    ] && (i && !a ? s = !1 : o[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === ts(n)) && (s = !0));
  }
  return s;
}
const Mh = /* @__PURE__ */ new WeakMap();
function ru(e, t, n = !1) {
  const s = n ? Mh : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, a = [];
  let l = !1;
  if (!Se(e)) {
    const u = (b) => {
      l = !0;
      const [w, U] = ru(b, t, !0);
      Nt(o, w), U && a.push(...U);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!i && !l)
    return ft(e) && s.set(e, Bs), Bs;
  if (ke(i))
    for (let u = 0; u < i.length; u++) {
      const b = Zn(i[u]);
      hl(b) && (o[b] = Xe);
    }
  else if (i)
    for (const u in i) {
      const b = Zn(u);
      if (hl(b)) {
        const w = i[u], U = o[b] = ke(w) || Se(w) ? { type: w } : Nt({}, w), $ = U.type;
        let V = !1, D = !0;
        if (ke($))
          for (let te = 0; te < $.length; ++te) {
            const fe = $[te], de = Se(fe) && fe.name;
            if (de === "Boolean") {
              V = !0;
              break;
            } else de === "String" && (D = !1);
          }
        else
          V = Se($) && $.name === "Boolean";
        U[
          0
          /* shouldCast */
        ] = V, U[
          1
          /* shouldCastTrue */
        ] = D, (V || We(U, "default")) && a.push(b);
      }
    }
  const p = [o, a];
  return ft(e) && s.set(e, p), p;
}
function hl(e) {
  return e[0] !== "$" && !Ar(e);
}
const ya = (e) => e === "_" || e === "__" || e === "_ctx" || e === "$stable", va = (e) => ke(e) ? e.map(kn) : [kn(e)], Fh = (e, t, n) => {
  if (t._n)
    return t;
  const s = fh((...r) => va(t(...r)), n);
  return s._c = !1, s;
}, iu = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (ya(r)) continue;
    const i = e[r];
    if (Se(i))
      t[r] = Fh(r, i, s);
    else if (i != null) {
      const o = va(i);
      t[r] = () => o;
    }
  }
}, ou = (e, t) => {
  const n = va(t);
  e.slots.default = () => n;
}, au = (e, t, n) => {
  for (const s in t)
    (n || !ya(s)) && (e[s] = t[s]);
}, $h = (e, t, n) => {
  const s = e.slots = tu();
  if (e.vnode.shapeFlag & 32) {
    const r = t.__;
    r && Po(s, "__", r, !0);
    const i = t._;
    i ? (au(s, t, n), n && Po(s, "_", i, !0)) : iu(t, s);
  } else t && ou(e, t);
}, Bh = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = Xe;
  if (s.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? i = !1 : au(r, t, n) : (i = !t.$stable, iu(t, r)), o = t;
  } else t && (ou(e, t), o = { default: 1 });
  if (i)
    for (const a in r)
      !ya(a) && o[a] == null && delete r[a];
}, Gt = Qh;
function Uh(e) {
  return zh(e);
}
function zh(e, t) {
  const n = Fi();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: a,
    createComment: l,
    setText: p,
    setElementText: u,
    parentNode: b,
    nextSibling: w,
    setScopeId: U = Tn,
    insertStaticContent: $
  } = e, V = (m, y, E, N = null, F = null, R = null, K = void 0, W = null, j = !!y.dynamicChildren) => {
    if (m === y)
      return;
    m && !fr(m, y) && (N = pt(m), Ee(m, F, R, !0), m = null), y.patchFlag === -2 && (j = !1, y.dynamicChildren = null);
    const { type: H, ref: Z, shapeFlag: G } = y;
    switch (H) {
      case qi:
        D(m, y, E, N);
        break;
      case Qn:
        te(m, y, E, N);
        break;
      case ai:
        m == null && fe(y, E, N, K);
        break;
      case Be:
        Te(
          m,
          y,
          E,
          N,
          F,
          R,
          K,
          W,
          j
        );
        break;
      default:
        G & 1 ? O(
          m,
          y,
          E,
          N,
          F,
          R,
          K,
          W,
          j
        ) : G & 6 ? je(
          m,
          y,
          E,
          N,
          F,
          R,
          K,
          W,
          j
        ) : (G & 64 || G & 128) && H.process(
          m,
          y,
          E,
          N,
          F,
          R,
          K,
          W,
          j,
          St
        );
    }
    Z != null && F ? Er(Z, m && m.ref, R, y || m, !y) : Z == null && m && m.ref != null && Er(m.ref, null, R, m, !0);
  }, D = (m, y, E, N) => {
    if (m == null)
      s(
        y.el = a(y.children),
        E,
        N
      );
    else {
      const F = y.el = m.el;
      y.children !== m.children && p(F, y.children);
    }
  }, te = (m, y, E, N) => {
    m == null ? s(
      y.el = l(y.children || ""),
      E,
      N
    ) : y.el = m.el;
  }, fe = (m, y, E, N) => {
    [m.el, m.anchor] = $(
      m.children,
      y,
      E,
      N,
      m.el,
      m.anchor
    );
  }, de = ({ el: m, anchor: y }, E, N) => {
    let F;
    for (; m && m !== y; )
      F = w(m), s(m, E, N), m = F;
    s(y, E, N);
  }, x = ({ el: m, anchor: y }) => {
    let E;
    for (; m && m !== y; )
      E = w(m), r(m), m = E;
    r(y);
  }, O = (m, y, E, N, F, R, K, W, j) => {
    y.type === "svg" ? K = "svg" : y.type === "math" && (K = "mathml"), m == null ? Y(
      y,
      E,
      N,
      F,
      R,
      K,
      W,
      j
    ) : Le(
      m,
      y,
      F,
      R,
      K,
      W,
      j
    );
  }, Y = (m, y, E, N, F, R, K, W) => {
    let j, H;
    const { props: Z, shapeFlag: G, transition: ie, dirs: le } = m;
    if (j = m.el = o(
      m.type,
      R,
      Z && Z.is,
      Z
    ), G & 8 ? u(j, m.children) : G & 16 && xe(
      m.children,
      j,
      null,
      N,
      F,
      go(m, R),
      K,
      W
    ), le && fs(m, null, N, "created"), X(j, m, m.scopeId, K, N), Z) {
      for (const P in Z)
        P !== "value" && !Ar(P) && i(j, P, null, Z[P], R, N);
      "value" in Z && i(j, "value", null, Z.value, R), (H = Z.onVnodeBeforeMount) && vn(H, N, m);
    }
    le && fs(m, null, N, "beforeMount");
    const Ae = Hh(F, ie);
    Ae && ie.beforeEnter(j), s(j, y, E), ((H = Z && Z.onVnodeMounted) || Ae || le) && Gt(() => {
      H && vn(H, N, m), Ae && ie.enter(j), le && fs(m, null, N, "mounted");
    }, F);
  }, X = (m, y, E, N, F) => {
    if (E && U(m, E), N)
      for (let R = 0; R < N.length; R++)
        U(m, N[R]);
    if (F) {
      let R = F.subTree;
      if (y === R || du(R.type) && (R.ssContent === y || R.ssFallback === y)) {
        const K = F.vnode;
        X(
          m,
          K,
          K.scopeId,
          K.slotScopeIds,
          F.parent
        );
      }
    }
  }, xe = (m, y, E, N, F, R, K, W, j = 0) => {
    for (let H = j; H < m.length; H++) {
      const Z = m[H] = W ? Kn(m[H]) : kn(m[H]);
      V(
        null,
        Z,
        y,
        E,
        N,
        F,
        R,
        K,
        W
      );
    }
  }, Le = (m, y, E, N, F, R, K) => {
    const W = y.el = m.el;
    let { patchFlag: j, dynamicChildren: H, dirs: Z } = y;
    j |= m.patchFlag & 16;
    const G = m.props || Xe, ie = y.props || Xe;
    let le;
    if (E && hs(E, !1), (le = ie.onVnodeBeforeUpdate) && vn(le, E, y, m), Z && fs(y, m, E, "beforeUpdate"), E && hs(E, !0), (G.innerHTML && ie.innerHTML == null || G.textContent && ie.textContent == null) && u(W, ""), H ? we(
      m.dynamicChildren,
      H,
      W,
      E,
      N,
      go(y, F),
      R
    ) : K || me(
      m,
      y,
      W,
      null,
      E,
      N,
      go(y, F),
      R,
      !1
    ), j > 0) {
      if (j & 16)
        De(W, G, ie, E, F);
      else if (j & 2 && G.class !== ie.class && i(W, "class", null, ie.class, F), j & 4 && i(W, "style", G.style, ie.style, F), j & 8) {
        const Ae = y.dynamicProps;
        for (let P = 0; P < Ae.length; P++) {
          const I = Ae[P], Q = G[I], oe = ie[I];
          (oe !== Q || I === "value") && i(W, I, Q, oe, F, E);
        }
      }
      j & 1 && m.children !== y.children && u(W, y.children);
    } else !K && H == null && De(W, G, ie, E, F);
    ((le = ie.onVnodeUpdated) || Z) && Gt(() => {
      le && vn(le, E, y, m), Z && fs(y, m, E, "updated");
    }, N);
  }, we = (m, y, E, N, F, R, K) => {
    for (let W = 0; W < y.length; W++) {
      const j = m[W], H = y[W], Z = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        j.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (j.type === Be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !fr(j, H) || // - In the case of a component, it could contain anything.
        j.shapeFlag & 198) ? b(j.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          E
        )
      );
      V(
        j,
        H,
        Z,
        null,
        N,
        F,
        R,
        K,
        !0
      );
    }
  }, De = (m, y, E, N, F) => {
    if (y !== E) {
      if (y !== Xe)
        for (const R in y)
          !Ar(R) && !(R in E) && i(
            m,
            R,
            y[R],
            null,
            F,
            N
          );
      for (const R in E) {
        if (Ar(R)) continue;
        const K = E[R], W = y[R];
        K !== W && R !== "value" && i(m, R, W, K, F, N);
      }
      "value" in E && i(m, "value", y.value, E.value, F);
    }
  }, Te = (m, y, E, N, F, R, K, W, j) => {
    const H = y.el = m ? m.el : a(""), Z = y.anchor = m ? m.anchor : a("");
    let { patchFlag: G, dynamicChildren: ie, slotScopeIds: le } = y;
    le && (W = W ? W.concat(le) : le), m == null ? (s(H, E, N), s(Z, E, N), xe(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      y.children || [],
      E,
      Z,
      F,
      R,
      K,
      W,
      j
    )) : G > 0 && G & 64 && ie && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    m.dynamicChildren ? (we(
      m.dynamicChildren,
      ie,
      E,
      F,
      R,
      K,
      W
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (y.key != null || F && y === F.subTree) && lu(
      m,
      y,
      !0
      /* shallow */
    )) : me(
      m,
      y,
      E,
      Z,
      F,
      R,
      K,
      W,
      j
    );
  }, je = (m, y, E, N, F, R, K, W, j) => {
    y.slotScopeIds = W, m == null ? y.shapeFlag & 512 ? F.ctx.activate(
      y,
      E,
      N,
      K,
      j
    ) : Fe(
      y,
      E,
      N,
      F,
      R,
      K,
      j
    ) : Ze(m, y, j);
  }, Fe = (m, y, E, N, F, R, K) => {
    const W = m.component = od(
      m,
      N,
      F
    );
    if (Gc(m) && (W.ctx.renderer = St), ld(W, !1, K), W.asyncDep) {
      if (F && F.registerDep(W, he, K), !m.el) {
        const j = W.subTree = An(Qn);
        te(null, j, y, E), m.placeholder = j.el;
      }
    } else
      he(
        W,
        m,
        y,
        E,
        F,
        R,
        K
      );
  }, Ze = (m, y, E) => {
    const N = y.component = m.component;
    if (Zh(m, y, E))
      if (N.asyncDep && !N.asyncResolved) {
        ye(N, y, E);
        return;
      } else
        N.next = y, N.update();
    else
      y.el = m.el, N.vnode = y;
  }, he = (m, y, E, N, F, R, K) => {
    const W = () => {
      if (m.isMounted) {
        let { next: G, bu: ie, u: le, parent: Ae, vnode: P } = m;
        {
          const f = cu(m);
          if (f) {
            G && (G.el = P.el, ye(m, G, K)), f.asyncDep.then(() => {
              m.isUnmounted || W();
            });
            return;
          }
        }
        let I = G, Q;
        hs(m, !1), G ? (G.el = P.el, ye(m, G, K)) : G = P, ie && ii(ie), (Q = G.props && G.props.onVnodeBeforeUpdate) && vn(Q, Ae, G, P), hs(m, !0);
        const oe = pl(m), Ie = m.subTree;
        m.subTree = oe, V(
          Ie,
          oe,
          // parent may have changed if it's in a teleport
          b(Ie.el),
          // anchor may have changed if it's in a fragment
          pt(Ie),
          m,
          F,
          R
        ), G.el = oe.el, I === null && Jh(m, oe.el), le && Gt(le, F), (Q = G.props && G.props.onVnodeUpdated) && Gt(
          () => vn(Q, Ae, G, P),
          F
        );
      } else {
        let G;
        const { el: ie, props: le } = y, { bm: Ae, m: P, parent: I, root: Q, type: oe } = m, Ie = Cr(y);
        hs(m, !1), Ae && ii(Ae), !Ie && (G = le && le.onVnodeBeforeMount) && vn(G, I, y), hs(m, !0);
        {
          Q.ce && // @ts-expect-error _def is private
          Q.ce._def.shadowRoot !== !1 && Q.ce._injectChildStyle(oe);
          const f = m.subTree = pl(m);
          V(
            null,
            f,
            E,
            N,
            m,
            F,
            R
          ), y.el = f.el;
        }
        if (P && Gt(P, F), !Ie && (G = le && le.onVnodeMounted)) {
          const f = y;
          Gt(
            () => vn(G, I, f),
            F
          );
        }
        (y.shapeFlag & 256 || I && Cr(I.vnode) && I.vnode.shapeFlag & 256) && m.a && Gt(m.a, F), m.isMounted = !0, y = E = N = null;
      }
    };
    m.scope.on();
    const j = m.effect = new xc(W);
    m.scope.off();
    const H = m.update = j.run.bind(j), Z = m.job = j.runIfDirty.bind(j);
    Z.i = m, Z.id = m.uid, j.scheduler = () => ga(Z), hs(m, !0), H();
  }, ye = (m, y, E) => {
    y.component = m;
    const N = m.vnode.props;
    m.vnode = y, m.next = null, Dh(m, y.props, N, E), Bh(m, y.children, E), Fn(), al(m), $n();
  }, me = (m, y, E, N, F, R, K, W, j = !1) => {
    const H = m && m.children, Z = m ? m.shapeFlag : 0, G = y.children, { patchFlag: ie, shapeFlag: le } = y;
    if (ie > 0) {
      if (ie & 128) {
        Qe(
          H,
          G,
          E,
          N,
          F,
          R,
          K,
          W,
          j
        );
        return;
      } else if (ie & 256) {
        Je(
          H,
          G,
          E,
          N,
          F,
          R,
          K,
          W,
          j
        );
        return;
      }
    }
    le & 8 ? (Z & 16 && Rt(H, F, R), G !== H && u(E, G)) : Z & 16 ? le & 16 ? Qe(
      H,
      G,
      E,
      N,
      F,
      R,
      K,
      W,
      j
    ) : Rt(H, F, R, !0) : (Z & 8 && u(E, ""), le & 16 && xe(
      G,
      E,
      N,
      F,
      R,
      K,
      W,
      j
    ));
  }, Je = (m, y, E, N, F, R, K, W, j) => {
    m = m || Bs, y = y || Bs;
    const H = m.length, Z = y.length, G = Math.min(H, Z);
    let ie;
    for (ie = 0; ie < G; ie++) {
      const le = y[ie] = j ? Kn(y[ie]) : kn(y[ie]);
      V(
        m[ie],
        le,
        E,
        null,
        F,
        R,
        K,
        W,
        j
      );
    }
    H > Z ? Rt(
      m,
      F,
      R,
      !0,
      !1,
      G
    ) : xe(
      y,
      E,
      N,
      F,
      R,
      K,
      W,
      j,
      G
    );
  }, Qe = (m, y, E, N, F, R, K, W, j) => {
    let H = 0;
    const Z = y.length;
    let G = m.length - 1, ie = Z - 1;
    for (; H <= G && H <= ie; ) {
      const le = m[H], Ae = y[H] = j ? Kn(y[H]) : kn(y[H]);
      if (fr(le, Ae))
        V(
          le,
          Ae,
          E,
          null,
          F,
          R,
          K,
          W,
          j
        );
      else
        break;
      H++;
    }
    for (; H <= G && H <= ie; ) {
      const le = m[G], Ae = y[ie] = j ? Kn(y[ie]) : kn(y[ie]);
      if (fr(le, Ae))
        V(
          le,
          Ae,
          E,
          null,
          F,
          R,
          K,
          W,
          j
        );
      else
        break;
      G--, ie--;
    }
    if (H > G) {
      if (H <= ie) {
        const le = ie + 1, Ae = le < Z ? y[le].el : N;
        for (; H <= ie; )
          V(
            null,
            y[H] = j ? Kn(y[H]) : kn(y[H]),
            E,
            Ae,
            F,
            R,
            K,
            W,
            j
          ), H++;
      }
    } else if (H > ie)
      for (; H <= G; )
        Ee(m[H], F, R, !0), H++;
    else {
      const le = H, Ae = H, P = /* @__PURE__ */ new Map();
      for (H = Ae; H <= ie; H++) {
        const S = y[H] = j ? Kn(y[H]) : kn(y[H]);
        S.key != null && P.set(S.key, H);
      }
      let I, Q = 0;
      const oe = ie - Ae + 1;
      let Ie = !1, f = 0;
      const _ = new Array(oe);
      for (H = 0; H < oe; H++) _[H] = 0;
      for (H = le; H <= G; H++) {
        const S = m[H];
        if (Q >= oe) {
          Ee(S, F, R, !0);
          continue;
        }
        let z;
        if (S.key != null)
          z = P.get(S.key);
        else
          for (I = Ae; I <= ie; I++)
            if (_[I - Ae] === 0 && fr(S, y[I])) {
              z = I;
              break;
            }
        z === void 0 ? Ee(S, F, R, !0) : (_[z - Ae] = H + 1, z >= f ? f = z : Ie = !0, V(
          S,
          y[z],
          E,
          null,
          F,
          R,
          K,
          W,
          j
        ), Q++);
      }
      const L = Ie ? Wh(_) : Bs;
      for (I = L.length - 1, H = oe - 1; H >= 0; H--) {
        const S = Ae + H, z = y[S], ee = y[S + 1], re = S + 1 < Z ? (
          // #13559, fallback to el placeholder for unresolved async component
          ee.el || ee.placeholder
        ) : N;
        _[H] === 0 ? V(
          null,
          z,
          E,
          re,
          F,
          R,
          K,
          W,
          j
        ) : Ie && (I < 0 || H !== L[I] ? st(z, E, re, 2) : I--);
      }
    }
  }, st = (m, y, E, N, F = null) => {
    const { el: R, type: K, transition: W, children: j, shapeFlag: H } = m;
    if (H & 6) {
      st(m.component.subTree, y, E, N);
      return;
    }
    if (H & 128) {
      m.suspense.move(y, E, N);
      return;
    }
    if (H & 64) {
      K.move(m, y, E, St);
      return;
    }
    if (K === Be) {
      s(R, y, E);
      for (let G = 0; G < j.length; G++)
        st(j[G], y, E, N);
      s(m.anchor, y, E);
      return;
    }
    if (K === ai) {
      de(m, y, E);
      return;
    }
    if (N !== 2 && H & 1 && W)
      if (N === 0)
        W.beforeEnter(R), s(R, y, E), Gt(() => W.enter(R), F);
      else {
        const { leave: G, delayLeave: ie, afterLeave: le } = W, Ae = () => {
          m.ctx.isUnmounted ? r(R) : s(R, y, E);
        }, P = () => {
          G(R, () => {
            Ae(), le && le();
          });
        };
        ie ? ie(R, Ae, P) : P();
      }
    else
      s(R, y, E);
  }, Ee = (m, y, E, N = !1, F = !1) => {
    const {
      type: R,
      props: K,
      ref: W,
      children: j,
      dynamicChildren: H,
      shapeFlag: Z,
      patchFlag: G,
      dirs: ie,
      cacheIndex: le
    } = m;
    if (G === -2 && (F = !1), W != null && (Fn(), Er(W, null, E, m, !0), $n()), le != null && (y.renderCache[le] = void 0), Z & 256) {
      y.ctx.deactivate(m);
      return;
    }
    const Ae = Z & 1 && ie, P = !Cr(m);
    let I;
    if (P && (I = K && K.onVnodeBeforeUnmount) && vn(I, y, m), Z & 6)
      Ce(m.component, E, N);
    else {
      if (Z & 128) {
        m.suspense.unmount(E, N);
        return;
      }
      Ae && fs(m, null, y, "beforeUnmount"), Z & 64 ? m.type.remove(
        m,
        y,
        E,
        St,
        N
      ) : H && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !H.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (R !== Be || G > 0 && G & 64) ? Rt(
        H,
        y,
        E,
        !1,
        !0
      ) : (R === Be && G & 384 || !F && Z & 16) && Rt(j, y, E), N && Pt(m);
    }
    (P && (I = K && K.onVnodeUnmounted) || Ae) && Gt(() => {
      I && vn(I, y, m), Ae && fs(m, null, y, "unmounted");
    }, E);
  }, Pt = (m) => {
    const { type: y, el: E, anchor: N, transition: F } = m;
    if (y === Be) {
      rt(E, N);
      return;
    }
    if (y === ai) {
      x(m);
      return;
    }
    const R = () => {
      r(E), F && !F.persisted && F.afterLeave && F.afterLeave();
    };
    if (m.shapeFlag & 1 && F && !F.persisted) {
      const { leave: K, delayLeave: W } = F, j = () => K(E, R);
      W ? W(m.el, R, j) : j();
    } else
      R();
  }, rt = (m, y) => {
    let E;
    for (; m !== y; )
      E = w(m), r(m), m = E;
    r(y);
  }, Ce = (m, y, E) => {
    const {
      bum: N,
      scope: F,
      job: R,
      subTree: K,
      um: W,
      m: j,
      a: H,
      parent: Z,
      slots: { __: G }
    } = m;
    dl(j), dl(H), N && ii(N), Z && ke(G) && G.forEach((ie) => {
      Z.renderCache[ie] = void 0;
    }), F.stop(), R && (R.flags |= 8, Ee(K, m, y, E)), W && Gt(W, y), Gt(() => {
      m.isUnmounted = !0;
    }, y), y && y.pendingBranch && !y.isUnmounted && m.asyncDep && !m.asyncResolved && m.suspenseId === y.pendingId && (y.deps--, y.deps === 0 && y.resolve());
  }, Rt = (m, y, E, N = !1, F = !1, R = 0) => {
    for (let K = R; K < m.length; K++)
      Ee(m[K], y, E, N, F);
  }, pt = (m) => {
    if (m.shapeFlag & 6)
      return pt(m.component.subTree);
    if (m.shapeFlag & 128)
      return m.suspense.next();
    const y = w(m.anchor || m.el), E = y && y[hh];
    return E ? w(E) : y;
  };
  let vt = !1;
  const Dt = (m, y, E) => {
    m == null ? y._vnode && Ee(y._vnode, null, null, !0) : V(
      y._vnode || null,
      m,
      y,
      null,
      null,
      null,
      E
    ), y._vnode = m, vt || (vt = !0, al(), qc(), vt = !1);
  }, St = {
    p: V,
    um: Ee,
    m: st,
    r: Pt,
    mt: Fe,
    mc: xe,
    pc: me,
    pbc: we,
    n: pt,
    o: e
  };
  return {
    render: Dt,
    hydrate: void 0,
    createApp: Oh(Dt)
  };
}
function go({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function hs({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Hh(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function lu(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (ke(s) && ke(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let a = r[i];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = r[i] = Kn(r[i]), a.el = o.el), !n && a.patchFlag !== -2 && lu(o, a)), a.type === qi && (a.el = o.el), a.type === Qn && !a.el && (a.el = o.el);
    }
}
function Wh(e) {
  const t = e.slice(), n = [0];
  let s, r, i, o, a;
  const l = e.length;
  for (s = 0; s < l; s++) {
    const p = e[s];
    if (p !== 0) {
      if (r = n[n.length - 1], e[r] < p) {
        t[s] = r, n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        a = i + o >> 1, e[n[a]] < p ? i = a + 1 : o = a;
      p < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = t[o];
  return n;
}
function cu(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : cu(t);
}
function dl(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const qh = Symbol.for("v-scx"), jh = () => oi(qh);
function $t(e, t, n) {
  return uu(e, t, n);
}
function uu(e, t, n = Xe) {
  const { immediate: s, deep: r, flush: i, once: o } = n, a = Nt({}, n), l = t && s || !t && i !== "post";
  let p;
  if (Fr) {
    if (i === "sync") {
      const U = jh();
      p = U.__watcherHandles || (U.__watcherHandles = []);
    } else if (!l) {
      const U = () => {
      };
      return U.stop = Tn, U.resume = Tn, U.pause = Tn, U;
    }
  }
  const u = Ut;
  a.call = (U, $, V) => xn(U, u, $, V);
  let b = !1;
  i === "post" ? a.scheduler = (U) => {
    Gt(U, u && u.suspense);
  } : i !== "sync" && (b = !0, a.scheduler = (U, $) => {
    $ ? U() : ga(U);
  }), a.augmentJob = (U) => {
    t && (U.flags |= 4), b && (U.flags |= 2, u && (U.id = u.uid, U.i = u));
  };
  const w = ah(e, t, a);
  return Fr && (p ? p.push(w) : l && w()), w;
}
function Vh(e, t, n) {
  const s = this.proxy, r = _t(e) ? e.includes(".") ? fu(s, e) : () => s[e] : e.bind(s, s);
  let i;
  Se(t) ? i = t : (i = t.handler, n = t);
  const o = Ur(this), a = uu(r, i.bind(s), n);
  return o(), a;
}
function fu(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const Kh = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Zn(t)}Modifiers`] || e[`${ts(t)}Modifiers`];
function Gh(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || Xe;
  let r = n;
  const i = t.startsWith("update:"), o = i && Kh(s, t.slice(7));
  o && (o.trim && (r = n.map((u) => _t(u) ? u.trim() : u)), o.number && (r = n.map(Do)));
  let a, l = s[a = lo(t)] || // also try camelCase event handler (#2249)
  s[a = lo(Zn(t))];
  !l && i && (l = s[a = lo(ts(t))]), l && xn(
    l,
    e,
    6,
    r
  );
  const p = s[a + "Once"];
  if (p) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, xn(
      p,
      e,
      6,
      r
    );
  }
}
function hu(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, a = !1;
  if (!Se(e)) {
    const l = (p) => {
      const u = hu(p, t, !0);
      u && (a = !0, Nt(o, u));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !i && !a ? (ft(e) && s.set(e, null), null) : (ke(i) ? i.forEach((l) => o[l] = null) : Nt(o, i), ft(e) && s.set(e, o), o);
}
function Wi(e, t) {
  return !e || !Pi(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), We(e, t[0].toLowerCase() + t.slice(1)) || We(e, ts(t)) || We(e, t));
}
function pl(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    propsOptions: [i],
    slots: o,
    attrs: a,
    emit: l,
    render: p,
    renderCache: u,
    props: b,
    data: w,
    setupState: U,
    ctx: $,
    inheritAttrs: V
  } = e, D = Ti(e);
  let te, fe;
  try {
    if (n.shapeFlag & 4) {
      const x = r || s, O = x;
      te = kn(
        p.call(
          O,
          x,
          u,
          b,
          U,
          w,
          $
        )
      ), fe = a;
    } else {
      const x = t;
      te = kn(
        x.length > 1 ? x(
          b,
          { attrs: a, slots: o, emit: l }
        ) : x(
          b,
          null
        )
      ), fe = t.props ? a : Yh(a);
    }
  } catch (x) {
    Ir.length = 0, Ui(x, e, 1), te = An(Qn);
  }
  let de = te;
  if (fe && V !== !1) {
    const x = Object.keys(fe), { shapeFlag: O } = de;
    x.length && O & 7 && (i && x.some(ia) && (fe = Xh(
      fe,
      i
    )), de = Ks(de, fe, !1, !0));
  }
  return n.dirs && (de = Ks(de, null, !1, !0), de.dirs = de.dirs ? de.dirs.concat(n.dirs) : n.dirs), n.transition && ma(de, n.transition), te = de, Ti(D), te;
}
const Yh = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Pi(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Xh = (e, t) => {
  const n = {};
  for (const s in e)
    (!ia(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Zh(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: a, patchFlag: l } = t, p = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return s ? gl(s, o, p) : !!o;
    if (l & 8) {
      const u = t.dynamicProps;
      for (let b = 0; b < u.length; b++) {
        const w = u[b];
        if (o[w] !== s[w] && !Wi(p, w))
          return !0;
      }
    }
  } else
    return (r || a) && (!a || !a.$stable) ? !0 : s === o ? !1 : s ? o ? gl(s, o, p) : !0 : !!o;
  return !1;
}
function gl(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !Wi(n, i))
      return !0;
  }
  return !1;
}
function Jh({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const du = (e) => e.__isSuspense;
function Qh(e, t) {
  t && t.pendingBranch ? ke(e) ? t.effects.push(...e) : t.effects.push(e) : uh(e);
}
const Be = Symbol.for("v-fgt"), qi = Symbol.for("v-txt"), Qn = Symbol.for("v-cmt"), ai = Symbol.for("v-stc"), Ir = [];
let Xt = null;
function T(e = !1) {
  Ir.push(Xt = e ? null : []);
}
function ed() {
  Ir.pop(), Xt = Ir[Ir.length - 1] || null;
}
let Mr = 1;
function ml(e, t = !1) {
  Mr += e, e < 0 && Xt && t && (Xt.hasOnce = !0);
}
function pu(e) {
  return e.dynamicChildren = Mr > 0 ? Xt || Bs : null, ed(), Mr > 0 && Xt && Xt.push(e), e;
}
function A(e, t, n, s, r, i) {
  return pu(
    v(
      e,
      t,
      n,
      s,
      r,
      i,
      !0
    )
  );
}
function Si(e, t, n, s, r) {
  return pu(
    An(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function gu(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function fr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const mu = ({ key: e }) => e ?? null, li = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? _t(e) || Ot(e) || Se(e) ? { i: rn, r: e, k: t, f: !!n } : e : null);
function v(e, t = null, n = null, s = 0, r = null, i = e === Be ? 0 : 1, o = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && mu(t),
    ref: t && li(t),
    scopeId: Vc,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: rn
  };
  return a ? (ba(l, n), i & 128 && e.normalize(l)) : n && (l.shapeFlag |= _t(n) ? 8 : 16), Mr > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Xt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Xt.push(l), l;
}
const An = td;
function td(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === Ah) && (e = Qn), gu(e)) {
    const a = Ks(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && ba(a, n), Mr > 0 && !i && Xt && (a.shapeFlag & 6 ? Xt[Xt.indexOf(e)] = a : Xt.push(a)), a.patchFlag = -2, a;
  }
  if (hd(e) && (e = e.__vccOpts), t) {
    t = nd(t);
    let { class: a, style: l } = t;
    a && !_t(a) && (t.class = $e(a)), ft(l) && (pa(l) && !ke(l) && (l = Nt({}, l)), t.style = Pe(l));
  }
  const o = _t(e) ? 1 : du(e) ? 128 : dh(e) ? 64 : ft(e) ? 4 : Se(e) ? 2 : 0;
  return v(
    e,
    t,
    n,
    s,
    r,
    o,
    i,
    !0
  );
}
function nd(e) {
  return e ? pa(e) || nu(e) ? Nt({}, e) : e : null;
}
function Ks(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: a, transition: l } = e, p = t ? sd(r || {}, t) : r, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: p,
    key: p && mu(p),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? ke(i) ? i.concat(li(t)) : [i, li(t)] : li(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Be ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: l,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ks(e.ssContent),
    ssFallback: e.ssFallback && Ks(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && s && ma(
    u,
    l.clone(u)
  ), u;
}
function Ln(e = " ", t = 0) {
  return An(qi, null, e, t);
}
function mo(e, t) {
  const n = An(ai, null, e);
  return n.staticCount = t, n;
}
function ce(e = "", t = !1) {
  return t ? (T(), Si(Qn, null, e)) : An(Qn, null, e);
}
function kn(e) {
  return e == null || typeof e == "boolean" ? An(Qn) : ke(e) ? An(
    Be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : gu(e) ? Kn(e) : An(qi, null, String(e));
}
function Kn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ks(e);
}
function ba(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (ke(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), ba(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !nu(t) ? t._ctx = rn : r === 3 && rn && (rn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Se(t) ? (t = { default: t, _ctx: rn }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Ln(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function sd(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = $e([t.class, s.class]));
      else if (r === "style")
        t.style = Pe([t.style, s.style]);
      else if (Pi(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(ke(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function vn(e, t, n, s = null) {
  xn(e, t, 7, [
    n,
    s
  ]);
}
const rd = Qc();
let id = 0;
function od(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || rd, i = {
    uid: id++,
    vnode: e,
    type: s,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Nf(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: ru(s, r),
    emitsOptions: hu(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Xe,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: Xe,
    data: Xe,
    props: Xe,
    attrs: Xe,
    slots: Xe,
    refs: Xe,
    setupState: Xe,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Gh.bind(null, i), e.ce && e.ce(i), i;
}
let Ut = null;
const ad = () => Ut || rn;
let xi, qo;
{
  const e = Fi(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  xi = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ut = n
  ), qo = t(
    "__VUE_SSR_SETTERS__",
    (n) => Fr = n
  );
}
const Ur = (e) => {
  const t = Ut;
  return xi(e), e.scope.on(), () => {
    e.scope.off(), xi(t);
  };
}, _l = () => {
  Ut && Ut.scope.off(), xi(null);
};
function _u(e) {
  return e.vnode.shapeFlag & 4;
}
let Fr = !1;
function ld(e, t = !1, n = !1) {
  t && qo(t);
  const { props: s, children: r } = e.vnode, i = _u(e);
  Ph(e, s, i, t), $h(e, r, n || t);
  const o = i ? cd(e, t) : void 0;
  return t && qo(!1), o;
}
function cd(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Sh);
  const { setup: s } = n;
  if (s) {
    Fn();
    const r = e.setupContext = s.length > 1 ? fd(e) : null, i = Ur(e), o = $r(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), a = vc(o);
    if ($n(), i(), (a || e.sp) && !Cr(e) && Kc(e), a) {
      if (o.then(_l, _l), t)
        return o.then((l) => {
          yl(e, l);
        }).catch((l) => {
          Ui(l, e, 0);
        });
      e.asyncDep = o;
    } else
      yl(e, o);
  } else
    yu(e);
}
function yl(e, t, n) {
  Se(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ft(t) && (e.setupState = zc(t)), yu(e);
}
function yu(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Tn);
  {
    const r = Ur(e);
    Fn();
    try {
      xh(e);
    } finally {
      $n(), r();
    }
  }
}
const ud = {
  get(e, t) {
    return Lt(e, "get", ""), e[t];
  }
};
function fd(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, ud),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function ji(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(zc(eh(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Rr)
        return Rr[n](e);
    },
    has(t, n) {
      return n in t || n in Rr;
    }
  })) : e.proxy;
}
function hd(e) {
  return Se(e) && "__vccOpts" in e;
}
const ge = (e, t) => ih(e, t, Fr), dd = "3.5.18";
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let jo;
const vl = typeof window < "u" && window.trustedTypes;
if (vl)
  try {
    jo = /* @__PURE__ */ vl.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const vu = jo ? (e) => jo.createHTML(e) : (e) => e, pd = "http://www.w3.org/2000/svg", gd = "http://www.w3.org/1998/Math/MathML", On = typeof document < "u" ? document : null, bl = On && /* @__PURE__ */ On.createElement("template"), md = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? On.createElementNS(pd, e) : t === "mathml" ? On.createElementNS(gd, e) : n ? On.createElement(e, { is: n }) : On.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => On.createTextNode(e),
  createComment: (e) => On.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => On.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, r, i) {
    const o = n ? n.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      bl.innerHTML = vu(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const a = bl.content;
      if (s === "svg" || s === "mathml") {
        const l = a.firstChild;
        for (; l.firstChild; )
          a.appendChild(l.firstChild);
        a.removeChild(l);
      }
      t.insertBefore(a, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, _d = Symbol("_vtc");
function yd(e, t, n) {
  const s = e[_d];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ei = Symbol("_vod"), bu = Symbol("_vsh"), vd = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[Ei] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : hr(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), hr(e, !0), s.enter(e)) : s.leave(e, () => {
      hr(e, !1);
    }) : hr(e, t));
  },
  beforeUnmount(e, { value: t }) {
    hr(e, t);
  }
};
function hr(e, t) {
  e.style.display = t ? e[Ei] : "none", e[bu] = !t;
}
const bd = Symbol(""), wd = /(^|;)\s*display\s*:/;
function kd(e, t, n) {
  const s = e.style, r = _t(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (_t(t))
        for (const o of t.split(";")) {
          const a = o.slice(0, o.indexOf(":")).trim();
          n[a] == null && ci(s, a, "");
        }
      else
        for (const o in t)
          n[o] == null && ci(s, o, "");
    for (const o in n)
      o === "display" && (i = !0), ci(s, o, n[o]);
  } else if (r) {
    if (t !== n) {
      const o = s[bd];
      o && (n += ";" + o), s.cssText = n, i = wd.test(n);
    }
  } else t && e.removeAttribute("style");
  Ei in e && (e[Ei] = i ? s.display : "", e[bu] && (s.display = "none"));
}
const wl = /\s*!important$/;
function ci(e, t, n) {
  if (ke(n))
    n.forEach((s) => ci(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Td(e, t);
    wl.test(n) ? e.setProperty(
      ts(s),
      n.replace(wl, ""),
      "important"
    ) : e[s] = n;
  }
}
const kl = ["Webkit", "Moz", "ms"], _o = {};
function Td(e, t) {
  const n = _o[t];
  if (n)
    return n;
  let s = Zn(t);
  if (s !== "filter" && s in e)
    return _o[t] = s;
  s = kc(s);
  for (let r = 0; r < kl.length; r++) {
    const i = kl[r] + s;
    if (i in e)
      return _o[t] = i;
  }
  return t;
}
const Tl = "http://www.w3.org/1999/xlink";
function Al(e, t, n, s, r, i = Of(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Tl, t.slice(6, t.length)) : e.setAttributeNS(Tl, t, n) : n == null || i && !Tc(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : es(n) ? String(n) : n
  );
}
function Sl(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? vu(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const a = i === "OPTION" ? e.getAttribute("value") || "" : e.value, l = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (a !== l || !("_value" in e)) && (e.value = l), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = Tc(n) : n == null && a === "string" ? (n = "", o = !0) : a === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function Fs(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Ad(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const xl = Symbol("_vei");
function Sd(e, t, n, s, r = null) {
  const i = e[xl] || (e[xl] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [a, l] = xd(t);
    if (s) {
      const p = i[t] = Rd(
        s,
        r
      );
      Fs(e, a, p, l);
    } else o && (Ad(e, a, o, l), i[t] = void 0);
  }
}
const El = /(?:Once|Passive|Capture)$/;
function xd(e) {
  let t;
  if (El.test(e)) {
    t = {};
    let s;
    for (; s = e.match(El); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ts(e.slice(2)), t];
}
let yo = 0;
const Ed = /* @__PURE__ */ Promise.resolve(), Cd = () => yo || (Ed.then(() => yo = 0), yo = Date.now());
function Rd(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    xn(
      Id(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Cd(), n;
}
function Id(e, t) {
  if (ke(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (r) => !r._stopped && s && s(r)
    );
  } else
    return t;
}
const Cl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ld = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? yd(e, s, o) : t === "style" ? kd(e, n, s) : Pi(t) ? ia(t) || Sd(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Od(e, t, s, o)) ? (Sl(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Al(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !_t(s)) ? Sl(e, Zn(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Al(e, t, s, o));
};
function Od(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Cl(t) && Se(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Cl(t) && _t(n) ? !1 : t in e;
}
const Rl = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return ke(t) ? (n) => ii(t, n) : t;
};
function Nd(e) {
  e.target.composing = !0;
}
function Il(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const vo = Symbol("_assign"), ds = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e[vo] = Rl(r);
    const i = s || r.props && r.props.type === "number";
    Fs(e, t ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let a = e.value;
      n && (a = a.trim()), i && (a = Do(a)), e[vo](a);
    }), n && Fs(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Fs(e, "compositionstart", Nd), Fs(e, "compositionend", Il), Fs(e, "change", Il));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[vo] = Rl(o), e.composing) return;
    const a = (i || e.type === "number") && !/^0\d/.test(e.value) ? Do(e.value) : e.value, l = t ?? "";
    a !== l && (document.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === l) || (e.value = l));
  }
}, Pd = ["ctrl", "shift", "alt", "meta"], Dd = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Pd.some((n) => e[`${n}Key`] && !t.includes(n))
}, ms = (e, t) => {
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const a = Dd[t[o]];
      if (a && a(r, t)) return;
    }
    return e(r, ...i);
  });
}, Md = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, ui = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = (r) => {
    if (!("key" in r))
      return;
    const i = ts(r.key);
    if (t.some(
      (o) => o === i || Md[o] === i
    ))
      return e(r);
  });
}, Fd = /* @__PURE__ */ Nt({ patchProp: Ld }, md);
let Ll;
function $d() {
  return Ll || (Ll = Uh(Fd));
}
const Bd = (...e) => {
  const t = $d().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = zd(s);
    if (!r) return;
    const i = t._component;
    !Se(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, Ud(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
};
function Ud(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function zd(e) {
  return _t(e) ? document.querySelector(e) : e;
}
const wu = /* @__PURE__ */ new Set(["customer_required", "token_invalid"]), Vo = (e) => !!e && wu.has(e), qs = (e) => {
  const t = e.replace("#", ""), n = parseInt(t.substr(0, 2), 16), s = parseInt(t.substr(2, 2), 16), r = parseInt(t.substr(4, 2), 16);
  return (n * 299 + s * 587 + r * 114) / 1e3 < 128;
}, Hd = (e, t) => {
  const n = e.replace("#", ""), s = parseInt(n.substr(0, 2), 16), r = parseInt(n.substr(2, 2), 16), i = parseInt(n.substr(4, 2), 16), o = qs(e), a = o ? Math.min(255, s + t) : Math.max(0, s - t), l = o ? Math.min(255, r + t) : Math.max(0, r - t), p = o ? Math.min(255, i + t) : Math.max(0, i - t);
  return `#${a.toString(16).padStart(2, "0")}${l.toString(16).padStart(2, "0")}${p.toString(16).padStart(2, "0")}`;
}, dr = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e), Wd = (e) => {
  switch (e.type) {
    case "connection_error":
      return "Unable to connect. Please try again later.";
    case "auth_error":
      return "Authentication failed. Please refresh the page.";
    case "chat_error":
      return "Unable to send message. Please try again.";
    case "ai_config_missing":
      return "Chat service is currently unavailable.";
    default:
      return e.error || "Something went wrong. Please try again.";
  }
};
function wa() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
var As = wa();
function ku(e) {
  As = e;
}
var Lr = { exec: () => null };
function qe(e, t = "") {
  let n = typeof e == "string" ? e : e.source;
  const s = {
    replace: (r, i) => {
      let o = typeof i == "string" ? i : i.source;
      return o = o.replace(zt.caret, "$1"), n = n.replace(r, o), s;
    },
    getRegex: () => new RegExp(n, t)
  };
  return s;
}
var zt = {
  codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
  outputLinkReplace: /\\([\[\]])/g,
  indentCodeCompensation: /^(\s+)(?:```)/,
  beginningSpace: /^\s+/,
  endingHash: /#$/,
  startingSpaceChar: /^ /,
  endingSpaceChar: / $/,
  nonSpaceChar: /[^ ]/,
  newLineCharGlobal: /\n/g,
  tabCharGlobal: /\t/g,
  multipleSpaceGlobal: /\s+/g,
  blankLine: /^[ \t]*$/,
  doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
  blockquoteStart: /^ {0,3}>/,
  blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
  blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
  listReplaceTabs: /^\t+/,
  listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
  listIsTask: /^\[[ xX]\] /,
  listReplaceTask: /^\[[ xX]\] +/,
  anyLine: /\n.*\n/,
  hrefBrackets: /^<(.*)>$/,
  tableDelimiter: /[:|]/,
  tableAlignChars: /^\||\| *$/g,
  tableRowBlankLine: /\n[ \t]*$/,
  tableAlignRight: /^ *-+: *$/,
  tableAlignCenter: /^ *:-+: *$/,
  tableAlignLeft: /^ *:-+ *$/,
  startATag: /^<a /i,
  endATag: /^<\/a>/i,
  startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
  endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
  startAngleBracket: /^</,
  endAngleBracket: />$/,
  pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
  unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
  escapeTest: /[&<>"']/,
  escapeReplace: /[&<>"']/g,
  escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
  unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
  caret: /(^|[^\[])\^/g,
  percentDecode: /%25/g,
  findPipe: /\|/g,
  splitPipe: / \|/,
  slashPipe: /\\\|/g,
  carriageReturn: /\r\n|\r/g,
  spaceLine: /^ +$/gm,
  notSpaceStart: /^\S*/,
  endingNewline: /\n$/,
  listItemRegex: (e) => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
  nextBulletRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
  hrRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
  fencesBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`),
  headingBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}#`),
  htmlBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i")
}, qd = /^(?:[ \t]*(?:\n|$))+/, jd = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Vd = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, zr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Kd = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ka = /(?:[*+-]|\d{1,9}[.)])/, Tu = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Au = qe(Tu).replace(/bull/g, ka).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Gd = qe(Tu).replace(/bull/g, ka).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Ta = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Yd = /^[^\n]+/, Aa = /(?!\s*\])(?:\\.|[^\[\]\\])+/, Xd = qe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Aa).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Zd = qe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ka).getRegex(), Vi = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Sa = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Jd = qe(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", Sa).replace("tag", Vi).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Su = qe(Ta).replace("hr", zr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Vi).getRegex(), Qd = qe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Su).getRegex(), xa = {
  blockquote: Qd,
  code: jd,
  def: Xd,
  fences: Vd,
  heading: Kd,
  hr: zr,
  html: Jd,
  lheading: Au,
  list: Zd,
  newline: qd,
  paragraph: Su,
  table: Lr,
  text: Yd
}, Ol = qe(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", zr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Vi).getRegex(), ep = {
  ...xa,
  lheading: Gd,
  table: Ol,
  paragraph: qe(Ta).replace("hr", zr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Ol).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Vi).getRegex()
}, tp = {
  ...xa,
  html: qe(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", Sa).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Lr,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: qe(Ta).replace("hr", zr).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Au).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, np = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, sp = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, xu = /^( {2,}|\\)\n(?!\s*$)/, rp = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Ki = /[\p{P}\p{S}]/u, Ea = /[\s\p{P}\p{S}]/u, Eu = /[^\s\p{P}\p{S}]/u, ip = qe(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Ea).getRegex(), Cu = /(?!~)[\p{P}\p{S}]/u, op = /(?!~)[\s\p{P}\p{S}]/u, ap = /(?:[^\s\p{P}\p{S}]|~)/u, lp = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, Ru = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, cp = qe(Ru, "u").replace(/punct/g, Ki).getRegex(), up = qe(Ru, "u").replace(/punct/g, Cu).getRegex(), Iu = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", fp = qe(Iu, "gu").replace(/notPunctSpace/g, Eu).replace(/punctSpace/g, Ea).replace(/punct/g, Ki).getRegex(), hp = qe(Iu, "gu").replace(/notPunctSpace/g, ap).replace(/punctSpace/g, op).replace(/punct/g, Cu).getRegex(), dp = qe(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, Eu).replace(/punctSpace/g, Ea).replace(/punct/g, Ki).getRegex(), pp = qe(/\\(punct)/, "gu").replace(/punct/g, Ki).getRegex(), gp = qe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), mp = qe(Sa).replace("(?:-->|$)", "-->").getRegex(), _p = qe(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", mp).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Ci = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, yp = qe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Ci).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Lu = qe(/^!?\[(label)\]\[(ref)\]/).replace("label", Ci).replace("ref", Aa).getRegex(), Ou = qe(/^!?\[(ref)\](?:\[\])?/).replace("ref", Aa).getRegex(), vp = qe("reflink|nolink(?!\\()", "g").replace("reflink", Lu).replace("nolink", Ou).getRegex(), Ca = {
  _backpedal: Lr,
  // only used for GFM url
  anyPunctuation: pp,
  autolink: gp,
  blockSkip: lp,
  br: xu,
  code: sp,
  del: Lr,
  emStrongLDelim: cp,
  emStrongRDelimAst: fp,
  emStrongRDelimUnd: dp,
  escape: np,
  link: yp,
  nolink: Ou,
  punctuation: ip,
  reflink: Lu,
  reflinkSearch: vp,
  tag: _p,
  text: rp,
  url: Lr
}, bp = {
  ...Ca,
  link: qe(/^!?\[(label)\]\((.*?)\)/).replace("label", Ci).getRegex(),
  reflink: qe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Ci).getRegex()
}, Ko = {
  ...Ca,
  emStrongRDelimAst: hp,
  emStrongLDelim: up,
  url: qe(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, wp = {
  ...Ko,
  br: qe(xu).replace("{2,}", "*").getRegex(),
  text: qe(Ko.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, ti = {
  normal: xa,
  gfm: ep,
  pedantic: tp
}, pr = {
  normal: Ca,
  gfm: Ko,
  breaks: wp,
  pedantic: bp
}, kp = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Nl = (e) => kp[e];
function bn(e, t) {
  if (t) {
    if (zt.escapeTest.test(e))
      return e.replace(zt.escapeReplace, Nl);
  } else if (zt.escapeTestNoEncode.test(e))
    return e.replace(zt.escapeReplaceNoEncode, Nl);
  return e;
}
function Pl(e) {
  try {
    e = encodeURI(e).replace(zt.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function Dl(e, t) {
  var i;
  const n = e.replace(zt.findPipe, (o, a, l) => {
    let p = !1, u = a;
    for (; --u >= 0 && l[u] === "\\"; ) p = !p;
    return p ? "|" : " |";
  }), s = n.split(zt.splitPipe);
  let r = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((i = s.at(-1)) != null && i.trim()) && s.pop(), t)
    if (s.length > t)
      s.splice(t);
    else
      for (; s.length < t; ) s.push("");
  for (; r < s.length; r++)
    s[r] = s[r].trim().replace(zt.slashPipe, "|");
  return s;
}
function gr(e, t, n) {
  const s = e.length;
  if (s === 0)
    return "";
  let r = 0;
  for (; r < s && e.charAt(s - r - 1) === t; )
    r++;
  return e.slice(0, s - r);
}
function Tp(e, t) {
  if (e.indexOf(t[1]) === -1)
    return -1;
  let n = 0;
  for (let s = 0; s < e.length; s++)
    if (e[s] === "\\")
      s++;
    else if (e[s] === t[0])
      n++;
    else if (e[s] === t[1] && (n--, n < 0))
      return s;
  return n > 0 ? -2 : -1;
}
function Ml(e, t, n, s, r) {
  const i = t.href, o = t.title || null, a = e[1].replace(r.other.outputLinkReplace, "$1");
  s.state.inLink = !0;
  const l = {
    type: e[0].charAt(0) === "!" ? "image" : "link",
    raw: n,
    href: i,
    title: o,
    text: a,
    tokens: s.inlineTokens(a)
  };
  return s.state.inLink = !1, l;
}
function Ap(e, t, n) {
  const s = e.match(n.other.indentCodeCompensation);
  if (s === null)
    return t;
  const r = s[1];
  return t.split(`
`).map((i) => {
    const o = i.match(n.other.beginningSpace);
    if (o === null)
      return i;
    const [a] = o;
    return a.length >= r.length ? i.slice(r.length) : i;
  }).join(`
`);
}
var Ri = class {
  // set by the lexer
  constructor(e) {
    Ye(this, "options");
    Ye(this, "rules");
    // set by the lexer
    Ye(this, "lexer");
    this.options = e || As;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0)
      return {
        type: "space",
        raw: t[0]
      };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const n = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? n : gr(n, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const n = t[0], s = Ap(n, t[3] || "", this.rules);
      return {
        type: "code",
        raw: n,
        lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
        text: s
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        const s = gr(n, "#");
        (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (n = s.trim());
      }
      return {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t)
      return {
        type: "hr",
        raw: gr(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = gr(t[0], `
`).split(`
`), s = "", r = "";
      const i = [];
      for (; n.length > 0; ) {
        let o = !1;
        const a = [];
        let l;
        for (l = 0; l < n.length; l++)
          if (this.rules.other.blockquoteStart.test(n[l]))
            a.push(n[l]), o = !0;
          else if (!o)
            a.push(n[l]);
          else
            break;
        n = n.slice(l);
        const p = a.join(`
`), u = p.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${p}` : p, r = r ? `${r}
${u}` : u;
        const b = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(u, i, !0), this.lexer.state.top = b, n.length === 0)
          break;
        const w = i.at(-1);
        if ((w == null ? void 0 : w.type) === "code")
          break;
        if ((w == null ? void 0 : w.type) === "blockquote") {
          const U = w, $ = U.raw + `
` + n.join(`
`), V = this.blockquote($);
          i[i.length - 1] = V, s = s.substring(0, s.length - U.raw.length) + V.raw, r = r.substring(0, r.length - U.text.length) + V.text;
          break;
        } else if ((w == null ? void 0 : w.type) === "list") {
          const U = w, $ = U.raw + `
` + n.join(`
`), V = this.list($);
          i[i.length - 1] = V, s = s.substring(0, s.length - w.raw.length) + V.raw, r = r.substring(0, r.length - U.raw.length) + V.raw, n = $.substring(i.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: s,
        tokens: i,
        text: r
      };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim();
      const s = n.length > 1, r = {
        type: "list",
        raw: "",
        ordered: s,
        start: s ? +n.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      n = s ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = s ? n : "[*+-]");
      const i = this.rules.other.listItemRegex(n);
      let o = !1;
      for (; e; ) {
        let l = !1, p = "", u = "";
        if (!(t = i.exec(e)) || this.rules.block.hr.test(e))
          break;
        p = t[0], e = e.substring(p.length);
        let b = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (te) => " ".repeat(3 * te.length)), w = e.split(`
`, 1)[0], U = !b.trim(), $ = 0;
        if (this.options.pedantic ? ($ = 2, u = b.trimStart()) : U ? $ = t[1].length + 1 : ($ = t[2].search(this.rules.other.nonSpaceChar), $ = $ > 4 ? 1 : $, u = b.slice($), $ += t[1].length), U && this.rules.other.blankLine.test(w) && (p += w + `
`, e = e.substring(w.length + 1), l = !0), !l) {
          const te = this.rules.other.nextBulletRegex($), fe = this.rules.other.hrRegex($), de = this.rules.other.fencesBeginRegex($), x = this.rules.other.headingBeginRegex($), O = this.rules.other.htmlBeginRegex($);
          for (; e; ) {
            const Y = e.split(`
`, 1)[0];
            let X;
            if (w = Y, this.options.pedantic ? (w = w.replace(this.rules.other.listReplaceNesting, "  "), X = w) : X = w.replace(this.rules.other.tabCharGlobal, "    "), de.test(w) || x.test(w) || O.test(w) || te.test(w) || fe.test(w))
              break;
            if (X.search(this.rules.other.nonSpaceChar) >= $ || !w.trim())
              u += `
` + X.slice($);
            else {
              if (U || b.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || de.test(b) || x.test(b) || fe.test(b))
                break;
              u += `
` + w;
            }
            !U && !w.trim() && (U = !0), p += Y + `
`, e = e.substring(Y.length + 1), b = X.slice($);
          }
        }
        r.loose || (o ? r.loose = !0 : this.rules.other.doubleBlankLine.test(p) && (o = !0));
        let V = null, D;
        this.options.gfm && (V = this.rules.other.listIsTask.exec(u), V && (D = V[0] !== "[ ] ", u = u.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: p,
          task: !!V,
          checked: D,
          loose: !1,
          text: u,
          tokens: []
        }), r.raw += p;
      }
      const a = r.items.at(-1);
      if (a)
        a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
      else
        return;
      r.raw = r.raw.trimEnd();
      for (let l = 0; l < r.items.length; l++)
        if (this.lexer.state.top = !1, r.items[l].tokens = this.lexer.blockTokens(r.items[l].text, []), !r.loose) {
          const p = r.items[l].tokens.filter((b) => b.type === "space"), u = p.length > 0 && p.some((b) => this.rules.other.anyLine.test(b.raw));
          r.loose = u;
        }
      if (r.loose)
        for (let l = 0; l < r.items.length; l++)
          r.items[l].loose = !0;
      return r;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t)
      return {
        type: "html",
        block: !0,
        raw: t[0],
        pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
        text: t[0]
      };
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      const n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), s = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return {
        type: "def",
        tag: n,
        raw: t[0],
        href: s,
        title: r
      };
    }
  }
  table(e) {
    var o;
    const t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2]))
      return;
    const n = Dl(t[1]), s = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (o = t[3]) != null && o.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i = {
      type: "table",
      raw: t[0],
      header: [],
      align: [],
      rows: []
    };
    if (n.length === s.length) {
      for (const a of s)
        this.rules.other.tableAlignRight.test(a) ? i.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? i.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? i.align.push("left") : i.align.push(null);
      for (let a = 0; a < n.length; a++)
        i.header.push({
          text: n[a],
          tokens: this.lexer.inline(n[a]),
          header: !0,
          align: i.align[a]
        });
      for (const a of r)
        i.rows.push(Dl(a, i.header.length).map((l, p) => ({
          text: l,
          tokens: this.lexer.inline(l),
          header: !1,
          align: i.align[p]
        })));
      return i;
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t)
      return {
        type: "heading",
        raw: t[0],
        depth: t[2].charAt(0) === "=" ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1])
      };
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t)
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0])
      };
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t)
      return {
        type: "escape",
        raw: t[0],
        text: t[1]
      };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: t[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: t[0]
      };
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const n = t[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
        if (!this.rules.other.endAngleBracket.test(n))
          return;
        const i = gr(n.slice(0, -1), "\\");
        if ((n.length - i.length) % 2 === 0)
          return;
      } else {
        const i = Tp(t[2], "()");
        if (i === -2)
          return;
        if (i > -1) {
          const a = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + i;
          t[2] = t[2].substring(0, i), t[0] = t[0].substring(0, a).trim(), t[3] = "";
        }
      }
      let s = t[2], r = "";
      if (this.options.pedantic) {
        const i = this.rules.other.pedanticHrefTitle.exec(s);
        i && (s = i[1], r = i[3]);
      } else
        r = t[3] ? t[3].slice(1, -1) : "";
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), Ml(t, {
        href: s && s.replace(this.rules.inline.anyPunctuation, "$1"),
        title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
      }, t[0], this.lexer, this.rules);
    }
  }
  reflink(e, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
      const s = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), r = t[s.toLowerCase()];
      if (!r) {
        const i = n[0].charAt(0);
        return {
          type: "text",
          raw: i,
          text: i
        };
      }
      return Ml(n, r, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let s = this.rules.inline.emStrongLDelim.exec(e);
    if (!s || s[3] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(s[1] || s[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      const i = [...s[0]].length - 1;
      let o, a, l = i, p = 0;
      const u = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (u.lastIndex = 0, t = t.slice(-1 * e.length + i); (s = u.exec(t)) != null; ) {
        if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o) continue;
        if (a = [...o].length, s[3] || s[4]) {
          l += a;
          continue;
        } else if ((s[5] || s[6]) && i % 3 && !((i + a) % 3)) {
          p += a;
          continue;
        }
        if (l -= a, l > 0) continue;
        a = Math.min(a, a + l + p);
        const b = [...s[0]][0].length, w = e.slice(0, i + s.index + b + a);
        if (Math.min(i, a) % 2) {
          const $ = w.slice(1, -1);
          return {
            type: "em",
            raw: w,
            text: $,
            tokens: this.lexer.inlineTokens($)
          };
        }
        const U = w.slice(2, -2);
        return {
          type: "strong",
          raw: w,
          text: U,
          tokens: this.lexer.inlineTokens(U)
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(this.rules.other.newLineCharGlobal, " ");
      const s = this.rules.other.nonSpaceChar.test(n), r = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return s && r && (n = n.substring(1, n.length - 1)), {
        type: "codespan",
        raw: t[0],
        text: n
      };
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t)
      return {
        type: "br",
        raw: t[0]
      };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2])
      };
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let n, s;
      return t[2] === "@" ? (n = t[1], s = "mailto:" + n) : (n = t[1], s = n), {
        type: "link",
        raw: t[0],
        text: n,
        href: s,
        tokens: [
          {
            type: "text",
            raw: n,
            text: n
          }
        ]
      };
    }
  }
  url(e) {
    var n;
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let s, r;
      if (t[2] === "@")
        s = t[0], r = "mailto:" + s;
      else {
        let i;
        do
          i = t[0], t[0] = ((n = this.rules.inline._backpedal.exec(t[0])) == null ? void 0 : n[0]) ?? "";
        while (i !== t[0]);
        s = t[0], t[1] === "www." ? r = "http://" + t[0] : r = t[0];
      }
      return {
        type: "link",
        raw: t[0],
        text: s,
        href: r,
        tokens: [
          {
            type: "text",
            raw: s,
            text: s
          }
        ]
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      const n = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        escaped: n
      };
    }
  }
}, Dn = class Go {
  constructor(t) {
    Ye(this, "tokens");
    Ye(this, "options");
    Ye(this, "state");
    Ye(this, "tokenizer");
    Ye(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || As, this.options.tokenizer = this.options.tokenizer || new Ri(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      other: zt,
      block: ti.normal,
      inline: pr.normal
    };
    this.options.pedantic ? (n.block = ti.pedantic, n.inline = pr.pedantic) : this.options.gfm && (n.block = ti.gfm, this.options.breaks ? n.inline = pr.breaks : n.inline = pr.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: ti,
      inline: pr
    };
  }
  /**
   * Static Lex Method
   */
  static lex(t, n) {
    return new Go(n).lex(t);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(t, n) {
    return new Go(n).inlineTokens(t);
  }
  /**
   * Preprocessing
   */
  lex(t) {
    t = t.replace(zt.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const s = this.inlineQueue[n];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, n = [], s = !1) {
    var r, i, o;
    for (this.options.pedantic && (t = t.replace(zt.tabCharGlobal, "    ").replace(zt.spaceLine, "")); t; ) {
      let a;
      if ((i = (r = this.options.extensions) == null ? void 0 : r.block) != null && i.some((p) => (a = p.call({ lexer: this }, t, n)) ? (t = t.substring(a.raw.length), n.push(a), !0) : !1))
        continue;
      if (a = this.tokenizer.space(t)) {
        t = t.substring(a.raw.length);
        const p = n.at(-1);
        a.raw.length === 1 && p !== void 0 ? p.raw += `
` : n.push(a);
        continue;
      }
      if (a = this.tokenizer.code(t)) {
        t = t.substring(a.raw.length);
        const p = n.at(-1);
        (p == null ? void 0 : p.type) === "paragraph" || (p == null ? void 0 : p.type) === "text" ? (p.raw += `
` + a.raw, p.text += `
` + a.text, this.inlineQueue.at(-1).src = p.text) : n.push(a);
        continue;
      }
      if (a = this.tokenizer.fences(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.heading(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.hr(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.blockquote(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.list(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.html(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.def(t)) {
        t = t.substring(a.raw.length);
        const p = n.at(-1);
        (p == null ? void 0 : p.type) === "paragraph" || (p == null ? void 0 : p.type) === "text" ? (p.raw += `
` + a.raw, p.text += `
` + a.raw, this.inlineQueue.at(-1).src = p.text) : this.tokens.links[a.tag] || (this.tokens.links[a.tag] = {
          href: a.href,
          title: a.title
        });
        continue;
      }
      if (a = this.tokenizer.table(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.lheading(t)) {
        t = t.substring(a.raw.length), n.push(a);
        continue;
      }
      let l = t;
      if ((o = this.options.extensions) != null && o.startBlock) {
        let p = 1 / 0;
        const u = t.slice(1);
        let b;
        this.options.extensions.startBlock.forEach((w) => {
          b = w.call({ lexer: this }, u), typeof b == "number" && b >= 0 && (p = Math.min(p, b));
        }), p < 1 / 0 && p >= 0 && (l = t.substring(0, p + 1));
      }
      if (this.state.top && (a = this.tokenizer.paragraph(l))) {
        const p = n.at(-1);
        s && (p == null ? void 0 : p.type) === "paragraph" ? (p.raw += `
` + a.raw, p.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = p.text) : n.push(a), s = l.length !== t.length, t = t.substring(a.raw.length);
        continue;
      }
      if (a = this.tokenizer.text(t)) {
        t = t.substring(a.raw.length);
        const p = n.at(-1);
        (p == null ? void 0 : p.type) === "text" ? (p.raw += `
` + a.raw, p.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = p.text) : n.push(a);
        continue;
      }
      if (t) {
        const p = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(p);
          break;
        } else
          throw new Error(p);
      }
    }
    return this.state.top = !0, n;
  }
  inline(t, n = []) {
    return this.inlineQueue.push({ src: t, tokens: n }), n;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(t, n = []) {
    var a, l, p;
    let s = t, r = null;
    if (this.tokens.links) {
      const u = Object.keys(this.tokens.links);
      if (u.length > 0)
        for (; (r = this.tokenizer.rules.inline.reflinkSearch.exec(s)) != null; )
          u.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (s = s.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(s)) != null; )
      s = s.slice(0, r.index) + "++" + s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (r = this.tokenizer.rules.inline.blockSkip.exec(s)) != null; )
      s = s.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    let i = !1, o = "";
    for (; t; ) {
      i || (o = ""), i = !1;
      let u;
      if ((l = (a = this.options.extensions) == null ? void 0 : a.inline) != null && l.some((w) => (u = w.call({ lexer: this }, t, n)) ? (t = t.substring(u.raw.length), n.push(u), !0) : !1))
        continue;
      if (u = this.tokenizer.escape(t)) {
        t = t.substring(u.raw.length), n.push(u);
        continue;
      }
      if (u = this.tokenizer.tag(t)) {
        t = t.substring(u.raw.length), n.push(u);
        continue;
      }
      if (u = this.tokenizer.link(t)) {
        t = t.substring(u.raw.length), n.push(u);
        continue;
      }
      if (u = this.tokenizer.reflink(t, this.tokens.links)) {
        t = t.substring(u.raw.length);
        const w = n.at(-1);
        u.type === "text" && (w == null ? void 0 : w.type) === "text" ? (w.raw += u.raw, w.text += u.text) : n.push(u);
        continue;
      }
      if (u = this.tokenizer.emStrong(t, s, o)) {
        t = t.substring(u.raw.length), n.push(u);
        continue;
      }
      if (u = this.tokenizer.codespan(t)) {
        t = t.substring(u.raw.length), n.push(u);
        continue;
      }
      if (u = this.tokenizer.br(t)) {
        t = t.substring(u.raw.length), n.push(u);
        continue;
      }
      if (u = this.tokenizer.del(t)) {
        t = t.substring(u.raw.length), n.push(u);
        continue;
      }
      if (u = this.tokenizer.autolink(t)) {
        t = t.substring(u.raw.length), n.push(u);
        continue;
      }
      if (!this.state.inLink && (u = this.tokenizer.url(t))) {
        t = t.substring(u.raw.length), n.push(u);
        continue;
      }
      let b = t;
      if ((p = this.options.extensions) != null && p.startInline) {
        let w = 1 / 0;
        const U = t.slice(1);
        let $;
        this.options.extensions.startInline.forEach((V) => {
          $ = V.call({ lexer: this }, U), typeof $ == "number" && $ >= 0 && (w = Math.min(w, $));
        }), w < 1 / 0 && w >= 0 && (b = t.substring(0, w + 1));
      }
      if (u = this.tokenizer.inlineText(b)) {
        t = t.substring(u.raw.length), u.raw.slice(-1) !== "_" && (o = u.raw.slice(-1)), i = !0;
        const w = n.at(-1);
        (w == null ? void 0 : w.type) === "text" ? (w.raw += u.raw, w.text += u.text) : n.push(u);
        continue;
      }
      if (t) {
        const w = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(w);
          break;
        } else
          throw new Error(w);
      }
    }
    return n;
  }
}, Ii = class {
  // set by the parser
  constructor(e) {
    Ye(this, "options");
    Ye(this, "parser");
    this.options = e || As;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    var i;
    const s = (i = (t || "").match(zt.notSpaceStart)) == null ? void 0 : i[0], r = e.replace(zt.endingNewline, "") + `
`;
    return s ? '<pre><code class="language-' + bn(s) + '">' + (n ? r : bn(r, !0)) + `</code></pre>
` : "<pre><code>" + (n ? r : bn(r, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    const t = e.ordered, n = e.start;
    let s = "";
    for (let o = 0; o < e.items.length; o++) {
      const a = e.items[o];
      s += this.listitem(a);
    }
    const r = t ? "ol" : "ul", i = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + r + i + `>
` + s + "</" + r + `>
`;
  }
  listitem(e) {
    var n;
    let t = "";
    if (e.task) {
      const s = this.checkbox({ checked: !!e.checked });
      e.loose ? ((n = e.tokens[0]) == null ? void 0 : n.type) === "paragraph" ? (e.tokens[0].text = s + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = s + " " + bn(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
        type: "text",
        raw: s + " ",
        text: s + " ",
        escaped: !0
      }) : t += s + " ";
    }
    return t += this.parser.parse(e.tokens, !!e.loose), `<li>${t}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", n = "";
    for (let r = 0; r < e.header.length; r++)
      n += this.tablecell(e.header[r]);
    t += this.tablerow({ text: n });
    let s = "";
    for (let r = 0; r < e.rows.length; r++) {
      const i = e.rows[r];
      n = "";
      for (let o = 0; o < i.length; o++)
        n += this.tablecell(i[o]);
      s += this.tablerow({ text: n });
    }
    return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + s + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    const t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
    return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${bn(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    const s = this.parser.parseInline(n), r = Pl(e);
    if (r === null)
      return s;
    e = r;
    let i = '<a href="' + e + '"';
    return t && (i += ' title="' + bn(t) + '"'), i += ">" + s + "</a>", i;
  }
  image({ href: e, title: t, text: n, tokens: s }) {
    s && (n = this.parser.parseInline(s, this.parser.textRenderer));
    const r = Pl(e);
    if (r === null)
      return bn(n);
    e = r;
    let i = `<img src="${e}" alt="${n}"`;
    return t && (i += ` title="${bn(t)}"`), i += ">", i;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : bn(e.text);
  }
}, Ra = class {
  // no need for block level renderers
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
}, Mn = class Yo {
  constructor(t) {
    Ye(this, "options");
    Ye(this, "renderer");
    Ye(this, "textRenderer");
    this.options = t || As, this.options.renderer = this.options.renderer || new Ii(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Ra();
  }
  /**
   * Static Parse Method
   */
  static parse(t, n) {
    return new Yo(n).parse(t);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(t, n) {
    return new Yo(n).parseInline(t);
  }
  /**
   * Parse Loop
   */
  parse(t, n = !0) {
    var r, i;
    let s = "";
    for (let o = 0; o < t.length; o++) {
      const a = t[o];
      if ((i = (r = this.options.extensions) == null ? void 0 : r.renderers) != null && i[a.type]) {
        const p = a, u = this.options.extensions.renderers[p.type].call({ parser: this }, p);
        if (u !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(p.type)) {
          s += u || "";
          continue;
        }
      }
      const l = a;
      switch (l.type) {
        case "space": {
          s += this.renderer.space(l);
          continue;
        }
        case "hr": {
          s += this.renderer.hr(l);
          continue;
        }
        case "heading": {
          s += this.renderer.heading(l);
          continue;
        }
        case "code": {
          s += this.renderer.code(l);
          continue;
        }
        case "table": {
          s += this.renderer.table(l);
          continue;
        }
        case "blockquote": {
          s += this.renderer.blockquote(l);
          continue;
        }
        case "list": {
          s += this.renderer.list(l);
          continue;
        }
        case "html": {
          s += this.renderer.html(l);
          continue;
        }
        case "paragraph": {
          s += this.renderer.paragraph(l);
          continue;
        }
        case "text": {
          let p = l, u = this.renderer.text(p);
          for (; o + 1 < t.length && t[o + 1].type === "text"; )
            p = t[++o], u += `
` + this.renderer.text(p);
          n ? s += this.renderer.paragraph({
            type: "paragraph",
            raw: u,
            text: u,
            tokens: [{ type: "text", raw: u, text: u, escaped: !0 }]
          }) : s += u;
          continue;
        }
        default: {
          const p = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent)
            return console.error(p), "";
          throw new Error(p);
        }
      }
    }
    return s;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(t, n = this.renderer) {
    var r, i;
    let s = "";
    for (let o = 0; o < t.length; o++) {
      const a = t[o];
      if ((i = (r = this.options.extensions) == null ? void 0 : r.renderers) != null && i[a.type]) {
        const p = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (p !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
          s += p || "";
          continue;
        }
      }
      const l = a;
      switch (l.type) {
        case "escape": {
          s += n.text(l);
          break;
        }
        case "html": {
          s += n.html(l);
          break;
        }
        case "link": {
          s += n.link(l);
          break;
        }
        case "image": {
          s += n.image(l);
          break;
        }
        case "strong": {
          s += n.strong(l);
          break;
        }
        case "em": {
          s += n.em(l);
          break;
        }
        case "codespan": {
          s += n.codespan(l);
          break;
        }
        case "br": {
          s += n.br(l);
          break;
        }
        case "del": {
          s += n.del(l);
          break;
        }
        case "text": {
          s += n.text(l);
          break;
        }
        default: {
          const p = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent)
            return console.error(p), "";
          throw new Error(p);
        }
      }
    }
    return s;
  }
}, No, fi = (No = class {
  constructor(e) {
    Ye(this, "options");
    Ye(this, "block");
    this.options = e || As;
  }
  /**
   * Process markdown before marked
   */
  preprocess(e) {
    return e;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(e) {
    return e;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(e) {
    return e;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? Dn.lex : Dn.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? Mn.parse : Mn.parseInline;
  }
}, Ye(No, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
])), No), Sp = class {
  constructor(...e) {
    Ye(this, "defaults", wa());
    Ye(this, "options", this.setOptions);
    Ye(this, "parse", this.parseMarkdown(!0));
    Ye(this, "parseInline", this.parseMarkdown(!1));
    Ye(this, "Parser", Mn);
    Ye(this, "Renderer", Ii);
    Ye(this, "TextRenderer", Ra);
    Ye(this, "Lexer", Dn);
    Ye(this, "Tokenizer", Ri);
    Ye(this, "Hooks", fi);
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, t) {
    var s, r;
    let n = [];
    for (const i of e)
      switch (n = n.concat(t.call(this, i)), i.type) {
        case "table": {
          const o = i;
          for (const a of o.header)
            n = n.concat(this.walkTokens(a.tokens, t));
          for (const a of o.rows)
            for (const l of a)
              n = n.concat(this.walkTokens(l.tokens, t));
          break;
        }
        case "list": {
          const o = i;
          n = n.concat(this.walkTokens(o.items, t));
          break;
        }
        default: {
          const o = i;
          (r = (s = this.defaults.extensions) == null ? void 0 : s.childTokens) != null && r[o.type] ? this.defaults.extensions.childTokens[o.type].forEach((a) => {
            const l = o[a].flat(1 / 0);
            n = n.concat(this.walkTokens(l, t));
          }) : o.tokens && (n = n.concat(this.walkTokens(o.tokens, t)));
        }
      }
    return n;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((n) => {
      const s = { ...n };
      if (s.async = this.defaults.async || s.async || !1, n.extensions && (n.extensions.forEach((r) => {
        if (!r.name)
          throw new Error("extension name required");
        if ("renderer" in r) {
          const i = t.renderers[r.name];
          i ? t.renderers[r.name] = function(...o) {
            let a = r.renderer.apply(this, o);
            return a === !1 && (a = i.apply(this, o)), a;
          } : t.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const i = t[r.level];
          i ? i.unshift(r.tokenizer) : t[r.level] = [r.tokenizer], r.start && (r.level === "block" ? t.startBlock ? t.startBlock.push(r.start) : t.startBlock = [r.start] : r.level === "inline" && (t.startInline ? t.startInline.push(r.start) : t.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (t.childTokens[r.name] = r.childTokens);
      }), s.extensions = t), n.renderer) {
        const r = this.defaults.renderer || new Ii(this.defaults);
        for (const i in n.renderer) {
          if (!(i in r))
            throw new Error(`renderer '${i}' does not exist`);
          if (["options", "parser"].includes(i))
            continue;
          const o = i, a = n.renderer[o], l = r[o];
          r[o] = (...p) => {
            let u = a.apply(r, p);
            return u === !1 && (u = l.apply(r, p)), u || "";
          };
        }
        s.renderer = r;
      }
      if (n.tokenizer) {
        const r = this.defaults.tokenizer || new Ri(this.defaults);
        for (const i in n.tokenizer) {
          if (!(i in r))
            throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i))
            continue;
          const o = i, a = n.tokenizer[o], l = r[o];
          r[o] = (...p) => {
            let u = a.apply(r, p);
            return u === !1 && (u = l.apply(r, p)), u;
          };
        }
        s.tokenizer = r;
      }
      if (n.hooks) {
        const r = this.defaults.hooks || new fi();
        for (const i in n.hooks) {
          if (!(i in r))
            throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i))
            continue;
          const o = i, a = n.hooks[o], l = r[o];
          fi.passThroughHooks.has(i) ? r[o] = (p) => {
            if (this.defaults.async)
              return Promise.resolve(a.call(r, p)).then((b) => l.call(r, b));
            const u = a.call(r, p);
            return l.call(r, u);
          } : r[o] = (...p) => {
            let u = a.apply(r, p);
            return u === !1 && (u = l.apply(r, p)), u;
          };
        }
        s.hooks = r;
      }
      if (n.walkTokens) {
        const r = this.defaults.walkTokens, i = n.walkTokens;
        s.walkTokens = function(o) {
          let a = [];
          return a.push(i.call(this, o)), r && (a = a.concat(r.call(this, o))), a;
        };
      }
      this.defaults = { ...this.defaults, ...s };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return Dn.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return Mn.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (n, s) => {
      const r = { ...s }, i = { ...this.defaults, ...r }, o = this.onError(!!i.silent, !!i.async);
      if (this.defaults.async === !0 && r.async === !1)
        return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n > "u" || n === null)
        return o(new Error("marked(): input parameter is undefined or null"));
      if (typeof n != "string")
        return o(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
      i.hooks && (i.hooks.options = i, i.hooks.block = e);
      const a = i.hooks ? i.hooks.provideLexer() : e ? Dn.lex : Dn.lexInline, l = i.hooks ? i.hooks.provideParser() : e ? Mn.parse : Mn.parseInline;
      if (i.async)
        return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n).then((p) => a(p, i)).then((p) => i.hooks ? i.hooks.processAllTokens(p) : p).then((p) => i.walkTokens ? Promise.all(this.walkTokens(p, i.walkTokens)).then(() => p) : p).then((p) => l(p, i)).then((p) => i.hooks ? i.hooks.postprocess(p) : p).catch(o);
      try {
        i.hooks && (n = i.hooks.preprocess(n));
        let p = a(n, i);
        i.hooks && (p = i.hooks.processAllTokens(p)), i.walkTokens && this.walkTokens(p, i.walkTokens);
        let u = l(p, i);
        return i.hooks && (u = i.hooks.postprocess(u)), u;
      } catch (p) {
        return o(p);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const s = "<p>An error occurred:</p><pre>" + bn(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(s) : s;
      }
      if (t)
        return Promise.reject(n);
      throw n;
    };
  }
}, ks = new Sp();
function Ue(e, t) {
  return ks.parse(e, t);
}
Ue.options = Ue.setOptions = function(e) {
  return ks.setOptions(e), Ue.defaults = ks.defaults, ku(Ue.defaults), Ue;
};
Ue.getDefaults = wa;
Ue.defaults = As;
Ue.use = function(...e) {
  return ks.use(...e), Ue.defaults = ks.defaults, ku(Ue.defaults), Ue;
};
Ue.walkTokens = function(e, t) {
  return ks.walkTokens(e, t);
};
Ue.parseInline = ks.parseInline;
Ue.Parser = Mn;
Ue.parser = Mn.parse;
Ue.Renderer = Ii;
Ue.TextRenderer = Ra;
Ue.Lexer = Dn;
Ue.lexer = Dn.lex;
Ue.Tokenizer = Ri;
Ue.Hooks = fi;
Ue.parse = Ue;
Ue.options;
Ue.setOptions;
Ue.use;
Ue.walkTokens;
Ue.parseInline;
Mn.parse;
Dn.lex;
/*! @license DOMPurify 3.4.15 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.15/LICENSE */
function Fl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, s = Array(t); n < t; n++) s[n] = e[n];
  return s;
}
function xp(e) {
  if (Array.isArray(e)) return e;
}
function Ep(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var s, r, i, o, a = [], l = !0, p = !1;
    try {
      if (i = (n = n.call(e)).next, t !== 0) for (; !(l = (s = i.call(n)).done) && (a.push(s.value), a.length !== t); l = !0) ;
    } catch (u) {
      p = !0, r = u;
    } finally {
      try {
        if (!l && n.return != null && (o = n.return(), Object(o) !== o)) return;
      } finally {
        if (p) throw r;
      }
    }
    return a;
  }
}
function Cp() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Rp(e, t) {
  return xp(e) || Ep(e, t) || Ip(e, t) || Cp();
}
function Ip(e, t) {
  if (e) {
    if (typeof e == "string") return Fl(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Fl(e, t) : void 0;
  }
}
const Nu = Object.entries, $l = Object.setPrototypeOf, Lp = Object.isFrozen, Op = Object.getPrototypeOf, Np = Object.getOwnPropertyDescriptor;
let kt = Object.freeze, At = Object.seal, $s = Object.create, Pu = typeof Reflect < "u" && Reflect, Xo = Pu.apply, Zo = Pu.construct;
kt || (kt = function(t) {
  return t;
});
At || (At = function(t) {
  return t;
});
Xo || (Xo = function(t, n) {
  for (var s = arguments.length, r = new Array(s > 2 ? s - 2 : 0), i = 2; i < s; i++)
    r[i - 2] = arguments[i];
  return t.apply(n, r);
});
Zo || (Zo = function(t) {
  for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
    s[r - 1] = arguments[r];
  return new t(...s);
});
const _s = yt(Array.prototype.forEach), Pp = yt(Array.prototype.lastIndexOf), Bl = yt(Array.prototype.pop), mr = yt(Array.prototype.push), Dp = yt(Array.prototype.splice), js = Array.isArray, wr = yt(String.prototype.toLowerCase), bo = yt(String.prototype.toString), Ul = yt(String.prototype.match), _r = yt(String.prototype.replace), zl = yt(String.prototype.indexOf), Mp = yt(String.prototype.trim), Fp = yt(Number.prototype.toString), $p = yt(Boolean.prototype.toString), Hl = typeof BigInt > "u" ? null : yt(BigInt.prototype.toString), Wl = typeof Symbol > "u" ? null : yt(Symbol.prototype.toString), Wt = yt(Object.prototype.hasOwnProperty), yr = yt(Object.prototype.toString), It = yt(RegExp.prototype.test), ps = Bp(TypeError);
function yt(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
      s[r - 1] = arguments[r];
    return Xo(e, t, s);
  };
}
function Bp(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return Zo(e, n);
  };
}
function Me(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : wr;
  if ($l && $l(e, null), !js(t))
    return e;
  let s = t.length;
  for (; s--; ) {
    let r = t[s];
    if (typeof r == "string") {
      const i = n(r);
      i !== r && (Lp(t) || (t[s] = i), r = i);
    }
    e[r] = !0;
  }
  return e;
}
function Up(e) {
  for (let t = 0; t < e.length; t++)
    Wt(e, t) || (e[t] = null);
  return e;
}
function Yt(e) {
  const t = $s(null);
  for (const s of Nu(e)) {
    var n = Rp(s, 2);
    const r = n[0], i = n[1];
    Wt(e, r) && (js(i) ? t[r] = Up(i) : i && typeof i == "object" && i.constructor === Object ? t[r] = Yt(i) : t[r] = i);
  }
  return t;
}
function zp(e) {
  switch (typeof e) {
    case "string":
      return e;
    case "number":
      return Fp(e);
    case "boolean":
      return $p(e);
    case "bigint":
      return Hl ? Hl(e) : "0";
    case "symbol":
      return Wl ? Wl(e) : "Symbol()";
    case "undefined":
      return yr(e);
    case "function":
    case "object": {
      if (e === null)
        return yr(e);
      const t = e, n = tn(t, "toString");
      if (typeof n == "function") {
        const s = n(t);
        return typeof s == "string" ? s : yr(s);
      }
      return yr(e);
    }
    default:
      return yr(e);
  }
}
function tn(e, t) {
  for (; e !== null; ) {
    const s = Np(e, t);
    if (s) {
      if (s.get)
        return yt(s.get);
      if (typeof s.value == "function")
        return yt(s.value);
    }
    e = Op(e);
  }
  function n() {
    return null;
  }
  return n;
}
function Hp(e) {
  try {
    return It(e, ""), !0;
  } catch {
    return !1;
  }
}
const ql = kt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), wo = kt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), ko = kt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Wp = kt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), To = kt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), qp = kt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), jl = kt(["#text"]), Vl = kt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), Ao = kt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dominant-baseline", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "pointer-events", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-orientation", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "vector-effect", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Kl = kt(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), ni = kt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), jp = At(/{{[\w\W]*|^[\w\W]*}}/g), Vp = At(/<%[\w\W]*|^[\w\W]*%>/g), Kp = At(/\${[\w\W]*/g), Gp = At(/^data-[\-\w.\u00B7-\uFFFF]+$/), Yp = At(/^aria-[\-\w]+$/), Gl = At(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Xp = At(/^(?:\w+script|data):/i), Zp = At(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Jp = At(/^html$/i), Qp = At(/^[a-z][.\w]*(-[.\w]+)+$/i), Yl = At(/<[/\w!]/g), Xl = At(/<[/\w]/g), eg = At(/<\/no(script|embed|frames)/i), tg = At(/\/>/i), Kt = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  processingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12
  // Deprecated
}, Du = ["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"], ng = kt(Me({}, Du)), sg = function() {
  const e = {};
  return _s(Du, (t) => {
    e[t] = At(new RegExp("</" + t + "(?=[\\t\\n\\f\\r />])", "i"));
  }), kt(e);
}(), rg = function() {
  return typeof window > "u" ? null : window;
}, ig = function(t, n) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let s = null;
  const r = "data-tt-policy-suffix";
  n && n.hasAttribute(r) && (s = n.getAttribute(r));
  const i = "dompurify" + (s ? "#" + s : "");
  try {
    return t.createPolicy(i, {
      createHTML(o) {
        return o;
      },
      createScriptURL(o) {
        return o;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + i + " could not be created."), null;
  }
}, Zl = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
}, jn = function(t, n, s, r) {
  return Wt(t, n) && js(t[n]) ? Me(r.base ? Yt(r.base) : {}, t[n], r.transform) : s;
}, So = function(t, n, s) {
  const r = Wt(t, n) ? t[n] : void 0;
  return r && typeof r == "object" ? Yt(r) : s();
};
function Mu() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : rg();
  const t = (q) => Mu(q);
  if (t.version = "3.4.15", t.removed = [], !e || !e.document || e.document.nodeType !== Kt.document || !e.Element)
    return t.isSupported = !1, t;
  let n = e.document;
  const s = n, r = s.currentScript;
  e.DocumentFragment;
  const i = e.HTMLTemplateElement, o = e.Node, a = e.Element, l = e.NodeFilter, p = e.NamedNodeMap;
  p === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
  const u = e.DOMParser, b = e.trustedTypes, w = a.prototype, U = tn(w, "cloneNode"), $ = tn(w, "remove"), V = tn(w, "removeAttributeNode"), D = tn(w, "nextSibling"), te = tn(w, "childNodes"), fe = tn(w, "parentNode"), de = tn(w, "shadowRoot"), x = tn(w, "attributes"), O = o && o.prototype ? tn(o.prototype, "nodeType") : null, Y = o && o.prototype ? tn(o.prototype, "nodeName") : null, X = o && o.prototype ? tn(o.prototype, "ownerDocument") : null, xe = function(d) {
    return O ? O(d) : d.nodeType;
  }, Le = function(d) {
    return Y ? Y(d) : d.nodeName;
  };
  if (typeof i == "function") {
    const q = n.createElement("template");
    q.content && q.content.ownerDocument && (n = q.content.ownerDocument);
  }
  let we, De = "", Te, je = !1, Fe = 0;
  const Ze = function() {
    if (Fe > 0)
      throw ps('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, he = function(d) {
    Ze(), Fe++;
    try {
      return we.createHTML(d);
    } finally {
      Fe--;
    }
  }, ye = function(d) {
    Ze(), Fe++;
    try {
      return we.createScriptURL(d);
    } finally {
      Fe--;
    }
  }, me = function() {
    return je || (Te = ig(b, r), je = !0), Te;
  }, Je = n, Qe = Je.implementation, st = Je.createNodeIterator, Ee = Je.createDocumentFragment, Pt = Je.getElementsByTagName, rt = s.importNode;
  let Ce = Zl();
  t.isSupported = typeof Nu == "function" && typeof fe == "function" && Qe && Qe.createHTMLDocument !== void 0;
  const Rt = jp, pt = Vp, vt = Kp, Dt = Gp, St = Yp, an = Xp, m = Zp, y = Qp;
  let E = Gl, N = null;
  const F = Me({}, [...ql, ...wo, ...ko, ...To, ...jl]);
  let R = null;
  const K = Me({}, [...Vl, ...Ao, ...Kl, ...ni]);
  let W = Object.seal($s(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), j = null, H = null;
  const Z = Object.seal($s(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let G = !0, ie = !0, le = !1, Ae = !0, P = !1, I = !0, Q = !1, oe = !1, Ie = null, f = null, _ = !1, L = !1, S = !1, z = !1, ee = !0, re = !1;
  const ve = "user-content-";
  let Oe = !0, Ve = !1, Re = {}, it = null;
  const gt = Me({}, [
    "annotation-xml",
    "audio",
    "colgroup",
    "desc",
    "foreignobject",
    "head",
    "iframe",
    "math",
    "mi",
    "mn",
    "mo",
    "ms",
    "mtext",
    "noembed",
    "noframes",
    "noscript",
    "plaintext",
    "script",
    // <selectedcontent> mirrors the selected <option>'s subtree, cloned by
    // the UA (customizable <select>) — including any on* handlers — and the
    // engine re-mirrors synchronously whenever a removal changes which
    // option/selectedcontent is current, even inside DOMPurify's inert
    // DOMParser document. Hoisting its children on removal re-inserts a fresh
    // mirror target ahead of the walk, which the engine refills, looping
    // forever (DoS) and amplifying output. Dropping its content on removal
    // (rather than hoisting) breaks that cascade; the content is a duplicate
    // of the option, which is sanitized on its own. See campaign-3 F1/F6.
    "selectedcontent",
    "style",
    "svg",
    "template",
    "thead",
    "title",
    "video",
    "xmp"
  ]);
  let qt = null;
  const Ss = Me({}, ["audio", "video", "img", "source", "image", "track"]);
  let ns = null;
  const Ys = Me({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), ss = "http://www.w3.org/1998/Math/MathML", rs = "http://www.w3.org/2000/svg", jt = "http://www.w3.org/1999/xhtml";
  let Cn = jt, xs = !1, Xs = null;
  const Zs = Me({}, [ss, rs, jt], bo), is = kt(["mi", "mo", "mn", "ms", "mtext"]);
  let Es = Me({}, is);
  const Js = kt(["annotation-xml"]);
  let dn = Me({}, Js);
  const os = Me({}, ["title", "style", "font", "a", "script"]);
  let Rn = null;
  const Qs = ["application/xhtml+xml", "text/html"], pn = "text/html";
  let ot = null, ln = null;
  const Hr = n.createElement("form"), gn = function(d) {
    return d instanceof RegExp || d instanceof Function;
  }, er = function() {
    let d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (ln && ln === d)
      return;
    (!d || typeof d != "object") && (d = {}), d = Yt(d), Rn = // eslint-disable-next-line unicorn/prefer-includes
    Qs.indexOf(d.PARSER_MEDIA_TYPE) === -1 ? pn : d.PARSER_MEDIA_TYPE, ot = Rn === "application/xhtml+xml" ? bo : wr, N = jn(d, "ALLOWED_TAGS", F, {
      transform: ot
    }), R = jn(d, "ALLOWED_ATTR", K, {
      transform: ot
    }), Xs = jn(d, "ALLOWED_NAMESPACES", Zs, {
      transform: bo
    }), ns = jn(d, "ADD_URI_SAFE_ATTR", Ys, {
      transform: ot,
      base: Ys
    }), qt = jn(d, "ADD_DATA_URI_TAGS", Ss, {
      transform: ot,
      base: Ss
    }), it = jn(d, "FORBID_CONTENTS", gt, {
      transform: ot
    }), j = jn(d, "FORBID_TAGS", Yt({}), {
      transform: ot
    }), H = jn(d, "FORBID_ATTR", Yt({}), {
      transform: ot
    }), Re = Wt(d, "USE_PROFILES") ? d.USE_PROFILES && typeof d.USE_PROFILES == "object" ? Yt(d.USE_PROFILES) : d.USE_PROFILES : !1, G = d.ALLOW_ARIA_ATTR !== !1, ie = d.ALLOW_DATA_ATTR !== !1, le = d.ALLOW_UNKNOWN_PROTOCOLS || !1, Ae = d.ALLOW_SELF_CLOSE_IN_ATTR !== !1, P = d.SAFE_FOR_TEMPLATES || !1, I = d.SAFE_FOR_XML !== !1, Q = d.WHOLE_DOCUMENT || !1, L = d.RETURN_DOM || !1, S = d.RETURN_DOM_FRAGMENT || !1, z = d.RETURN_TRUSTED_TYPE || !1, _ = d.FORCE_BODY || !1, ee = d.SANITIZE_DOM !== !1, re = d.SANITIZE_NAMED_PROPS || !1, Oe = d.KEEP_CONTENT !== !1, Ve = d.IN_PLACE || !1, E = Hp(d.ALLOWED_URI_REGEXP) ? d.ALLOWED_URI_REGEXP : Gl, Cn = typeof d.NAMESPACE == "string" ? d.NAMESPACE : jt, Es = So(
      d,
      "MATHML_TEXT_INTEGRATION_POINTS",
      () => Me({}, is)
      // Default built-in map
    ), dn = So(
      d,
      "HTML_INTEGRATION_POINTS",
      () => Me({}, Js)
      // Default built-in map
    );
    const k = So(d, "CUSTOM_ELEMENT_HANDLING", () => $s(null));
    if (W = $s(null), Wt(k, "tagNameCheck") && gn(k.tagNameCheck) && (W.tagNameCheck = k.tagNameCheck), Wt(k, "attributeNameCheck") && gn(k.attributeNameCheck) && (W.attributeNameCheck = k.attributeNameCheck), Wt(k, "allowCustomizedBuiltInElements") && typeof k.allowCustomizedBuiltInElements == "boolean" && (W.allowCustomizedBuiltInElements = k.allowCustomizedBuiltInElements), At(W), P && (ie = !1), S && (L = !0), Re && (N = Me({}, jl), R = $s(null), Re.html === !0 && (Me(N, ql), Me(R, Vl)), Re.svg === !0 && (Me(N, wo), Me(R, Ao), Me(R, ni)), Re.svgFilters === !0 && (Me(N, ko), Me(R, Ao), Me(R, ni)), Re.mathMl === !0 && (Me(N, To), Me(R, Kl), Me(R, ni))), Z.tagCheck = null, Z.attributeCheck = null, Wt(d, "ADD_TAGS") && (typeof d.ADD_TAGS == "function" ? Z.tagCheck = d.ADD_TAGS : js(d.ADD_TAGS) && (N === F && (N = Yt(N)), Me(N, d.ADD_TAGS, ot))), Wt(d, "ADD_ATTR") && (typeof d.ADD_ATTR == "function" ? Z.attributeCheck = d.ADD_ATTR : js(d.ADD_ATTR) && (R === K && (R = Yt(R)), Me(R, d.ADD_ATTR, ot))), Wt(d, "ADD_FORBID_CONTENTS") && js(d.ADD_FORBID_CONTENTS) && (it === gt && (it = Yt(it)), Me(it, d.ADD_FORBID_CONTENTS, ot)), Oe && (N["#text"] = !0), Q && Me(N, ["html", "head", "body"]), N.table && (Me(N, ["tbody"]), delete j.tbody), d.TRUSTED_TYPES_POLICY) {
      if (typeof d.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw ps('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof d.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw ps('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const B = we;
      we = d.TRUSTED_TYPES_POLICY;
      try {
        De = he("");
      } catch (J) {
        throw we = B, J;
      }
    } else d.TRUSTED_TYPES_POLICY === null ? (we = void 0, De = "") : (we === void 0 && (we = me()), we && typeof De == "string" && (De = he("")));
    kt && kt(d), ln = d;
  }, as = Me({}, [...wo, ...ko, ...Wp]), tr = Me({}, [...To, ...qp]), Xi = function(d, k, B) {
    return k.namespaceURI === jt ? d === "svg" : k.namespaceURI === ss ? d === "svg" && (B === "annotation-xml" || Es[B]) : !!as[d];
  }, Wr = function(d, k, B) {
    return k.namespaceURI === jt ? d === "math" : k.namespaceURI === rs ? d === "math" && dn[B] : !!tr[d];
  }, Cs = function(d, k, B) {
    return k.namespaceURI === rs && !dn[B] || k.namespaceURI === ss && !Es[B] ? !1 : !tr[d] && (os[d] || !as[d]);
  }, nr = function(d) {
    let k = fe(d);
    (!k || !k.tagName) && (k = {
      namespaceURI: Cn,
      tagName: "template"
    });
    const B = wr(d.tagName), J = wr(k.tagName);
    return Xs[d.namespaceURI] ? d.namespaceURI === rs ? Xi(B, k, J) : d.namespaceURI === ss ? Wr(B, k, J) : d.namespaceURI === jt ? Cs(B, k, J) : !!(Rn === "application/xhtml+xml" && Xs[d.namespaceURI]) : !1;
  }, bt = function(d) {
    mr(t.removed, {
      element: d
    });
    try {
      fe(d).removeChild(d);
    } catch {
      if ($(d), !fe(d))
        throw ps("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, Vt = function(d, k, B) {
    try {
      V(d, k);
    } catch {
      try {
        d.removeAttribute(B);
      } catch {
      }
    }
  }, at = function(d) {
    Zt(d);
    const k = te(d);
    if (k) {
      const J = [];
      _s(k, (ae) => {
        mr(J, ae);
      }), _s(J, (ae) => {
        try {
          $(ae);
        } catch {
        }
      });
    }
    const B = x(d);
    if (B)
      for (let J = B.length - 1; J >= 0; --J) {
        const ae = B[J], pe = ae && ae.name;
        typeof pe == "string" && Vt(d, ae, pe);
      }
  }, tt = function(d, k, B) {
    if (!B)
      try {
        B = k.getAttributeNode(d);
      } catch {
        B = null;
      }
    mr(t.removed, {
      attribute: B || null,
      from: k
    });
    try {
      B ? V(k, B) : k.removeAttribute(d);
    } catch {
      try {
        k.removeAttribute(d);
      } catch {
      }
    }
    if (d === "is")
      if (L || S)
        try {
          bt(k);
        } catch {
        }
      else
        try {
          k.setAttribute(d, "");
        } catch {
        }
  }, dt = function(d) {
    const k = x(d);
    if (k)
      for (let B = k.length - 1; B >= 0; --B) {
        const J = k[B], ae = J && J.name;
        typeof ae != "string" || R[ot(ae)] || Vt(d, J, ae);
      }
  }, Zt = function(d) {
    const k = [d];
    for (; k.length > 0; ) {
      const B = k.pop();
      xe(B) === Kt.element && dt(B);
      const ae = te(B);
      if (ae)
        for (let pe = ae.length - 1; pe >= 0; --pe)
          k.push(ae[pe]);
    }
  }, Un = function(d, k) {
    return I ? d === "patchsrc" ? !0 : d === "for" && k !== "label" && k !== "output" : !1;
  }, qr = function(d) {
    if (!I)
      return;
    const k = [d];
    for (; k.length > 0; ) {
      const B = k.pop(), J = xe(B);
      if (J === Kt.processingInstruction || J === Kt.comment && It(Xl, B.data)) {
        try {
          $(B);
        } catch {
        }
        continue;
      }
      if (J === Kt.element) {
        const pe = B, Ke = ot(Le(B));
        try {
          pe.hasAttribute && pe.hasAttribute("patchsrc") && pe.removeAttribute("patchsrc"), pe.hasAttribute && pe.hasAttribute("for") && Un("for", Ke) && pe.removeAttribute("for");
        } catch {
        }
      }
      const ae = te(B);
      if (ae)
        for (let pe = ae.length - 1; pe >= 0; --pe)
          k.push(ae[pe]);
    }
  }, mn = function(d) {
    let k = null, B = null;
    if (_)
      d = "<remove></remove>" + d;
    else {
      const pe = Ul(d, /^[\r\n\t ]+/);
      B = pe && pe[0];
    }
    Rn === "application/xhtml+xml" && Cn === jt && (d = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + d + "</body></html>");
    const J = we ? he(d) : d;
    if (Cn === jt)
      try {
        k = new u().parseFromString(J, Rn);
      } catch {
      }
    if (!k || !k.documentElement) {
      k = Qe.createDocument(Cn, "template", null);
      try {
        k.documentElement.innerHTML = xs ? De : J;
      } catch {
      }
    }
    const ae = k.body || k.documentElement;
    return d && B && ae.insertBefore(n.createTextNode(B), ae.childNodes[0] || null), Cn === jt ? Pt.call(k, Q ? "html" : "body")[0] : Q ? k.documentElement : ae;
  }, Tt = function(d) {
    const k = X ? X(d) : d.ownerDocument;
    return st.call(
      k || d,
      d,
      // eslint-disable-next-line no-bitwise
      l.SHOW_ELEMENT | l.SHOW_COMMENT | l.SHOW_TEXT | l.SHOW_PROCESSING_INSTRUCTION | l.SHOW_CDATA_SECTION,
      null
    );
  }, _n = function(d) {
    return d = _r(d, Rt, " "), d = _r(d, pt, " "), d = _r(d, vt, " "), d;
  }, cn = function(d) {
    var k;
    d.normalize();
    const B = X ? X(d) : d.ownerDocument, J = st.call(
      B || d,
      d,
      // eslint-disable-next-line no-bitwise
      l.SHOW_TEXT | l.SHOW_COMMENT | l.SHOW_CDATA_SECTION | l.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let ae = J.nextNode();
    for (; ae; )
      ae.data = _n(ae.data), ae = J.nextNode();
    const pe = (k = d.querySelectorAll) === null || k === void 0 ? void 0 : k.call(d, "template");
    pe && _s(pe, (Ke) => {
      zn(Ke.content) && cn(Ke.content);
    });
  }, Rs = function(d) {
    const k = Y ? Y(d) : null;
    return typeof k != "string" || ot(k) !== "form" ? !1 : typeof d.nodeName != "string" || typeof d.textContent != "string" || typeof d.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    d.attributes !== x(d) || typeof d.removeAttribute != "function" || // A form descendant named "removeAttributeNode" or "getAttributeNode"
    // shadows these Attr-node methods via [LegacyOverrideBuiltIns].
    // _removeAttribute() / _stripAttributeNode() reach for
    // element.removeAttributeNode(attr) first; when it is shadowed the call
    // throws and the name-based fallback element.removeAttribute(name)
    // ASCII-lowercases its lookup key in an HTML document, silently missing
    // a case-preserved event-handler attribute (e.g. an ONANIMATIONSTART
    // that reached the sanitizer through an XML/XHTML parse). Flag the form
    // so it is removed wholesale, exactly as for the other shadowed methods.
    typeof d.removeAttributeNode != "function" || typeof d.getAttributeNode != "function" || typeof d.setAttribute != "function" || typeof d.namespaceURI != "string" || typeof d.insertBefore != "function" || typeof d.hasChildNodes != "function" || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
    // returns the integer 1 for any Element regardless of realm; direct
    // read on a clobbered form (e.g. <input name="nodeType">) returns
    // the named child element. Cheap addition — nodeType is read from
    // an internal slot, no serialization cost — and removes a residual
    // clobbering surface used by several mXSS / PI / comment branches
    // in _sanitizeElements that compare currentNode.nodeType directly.
    d.nodeType !== O(d) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
    // "childNodes" shadows the prototype getter. Direct reads of
    // form.childNodes from a clobbered form return the named child
    // instead of the real NodeList, so any walk that reads it directly
    // skips the form's real children. Compare the direct read to the
    // cached Node.prototype getter — when the form's named-property
    // getter intercepts the read, the two values differ and we flag
    // the form. This catches every clobbering child type (input,
    // select, etc.) regardless of whether the named child happens to
    // carry a numeric .length, which a typeof-based probe would miss
    // (e.g. HTMLSelectElement.length is a defined unsigned-long).
    d.childNodes !== te(d);
  }, zn = function(d) {
    if (!O || typeof d != "object" || d === null)
      return !1;
    try {
      return O(d) === Kt.documentFragment;
    } catch {
      return !1;
    }
  }, ls = function(d) {
    if (!O || typeof d != "object" || d === null)
      return !1;
    try {
      return typeof O(d) == "number";
    } catch {
      return !1;
    }
  };
  function Jt(q, d, k) {
    q.length !== 0 && _s(q, (B) => {
      B.call(t, d, k, ln);
    });
  }
  const Zi = function(d, k) {
    return !!(I && d.hasChildNodes() && !ls(d.firstElementChild) && It(Yl, d.textContent) && It(Yl, d.innerHTML) || I && d.namespaceURI === jt && ng[k] && (ls(d.firstElementChild) || typeof d.textContent == "string" && It(sg[k], d.textContent)) || d.nodeType === Kt.processingInstruction || I && d.nodeType === Kt.comment && It(Xl, d.data));
  }, Is = function(d, k) {
    if (d instanceof RegExp)
      return It(d, k);
    if (d instanceof Function) {
      for (var B = arguments.length, J = new Array(B > 2 ? B - 2 : 0), ae = 2; ae < B; ae++)
        J[ae - 2] = arguments[ae];
      return !!d(k, ...J);
    }
    return !1;
  }, Ji = function(d, k, B) {
    if (!j[k] && Kr(k) && Is(W.tagNameCheck, k))
      return !1;
    if (Oe && !it[k]) {
      const J = fe(d), ae = te(d);
      if (ae && J) {
        const pe = ae.length;
        for (let Ke = pe - 1; Ke >= 0; --Ke) {
          const nt = d === B ? U(ae[Ke], !0) : ae[Ke];
          J.insertBefore(nt, D(d));
        }
      }
    }
    return bt(d), !0;
  }, xt = function(d, k, B, J) {
    return d.length === 0 ? k : k === B || k === J ? Yt(k) : k;
  }, jr = function(d, k) {
    return d === k || fe(d) !== null ? !1 : (Ve && Zt(d), !0);
  }, Ls = function(d, k) {
    if (Jt(Ce.beforeSanitizeElements, d, null), jr(d, k))
      return !0;
    if (Rs(d))
      return bt(d), !0;
    const B = ot(Le(d));
    if (N = xt(Ce.uponSanitizeElement, N, F, Ie), Jt(Ce.uponSanitizeElement, d, {
      tagName: B,
      allowedTags: N
    }), jr(d, k))
      return !0;
    if (Zi(d, B))
      return bt(d), !0;
    if (j[B] || !(Z.tagCheck instanceof Function && Z.tagCheck(B)) && !N[B]) {
      const ae = Ji(d, B, k);
      return ae === !1 && Jt(Ce.afterSanitizeElements, d, null), ae;
    }
    if (xe(d) === Kt.element && !nr(d) || (B === "noscript" || B === "noembed" || B === "noframes") && It(eg, d.innerHTML))
      return bt(d), !0;
    if (P && d.nodeType === Kt.text) {
      const ae = _n(d.textContent);
      d.textContent !== ae && (mr(t.removed, {
        element: d.cloneNode()
      }), d.textContent = ae);
    }
    return Jt(Ce.afterSanitizeElements, d, null), !1;
  }, Vr = function(d, k, B) {
    if (H[k] || Un(k, d) || ee && (k === "id" || k === "name") && (B in n || B in Hr))
      return !1;
    const J = R[k] || Z.attributeCheck instanceof Function && Z.attributeCheck(k, d);
    return ie && It(Dt, k) || G && It(St, k) ? !0 : J ? ns[k] || It(E, _r(B, m, "")) || (k === "src" || k === "xlink:href" || k === "href") && d !== "script" && zl(B, "data:") === 0 && qt[d] || le && !It(an, _r(B, m, "")) ? !0 : !B : (
      // Condition a) covers a basically valid custom element tag name whose
      // tag passes the configured tagNameCheck and whose attribute name
      // passes the configured attributeNameCheck ...
      Kr(d) && Is(W.tagNameCheck, d) && Is(W.attributeNameCheck, k, d) || // Condition b) covers an `is` attribute whose value passes the
      // configured tagNameCheck while customized built-in elements are
      // allowed.
      k === "is" && W.allowCustomizedBuiltInElements && Is(W.tagNameCheck, B)
    );
  }, Qi = Me({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), Kr = function(d) {
    return !Qi[wr(d)] && It(y, d);
  }, Gr = function(d, k, B, J) {
    if (we && typeof b == "object" && typeof b.getAttributeType == "function" && !B)
      switch (b.getAttributeType(d, k)) {
        case "TrustedHTML":
          return he(J);
        case "TrustedScriptURL":
          return ye(J);
      }
    return J;
  }, sr = function(d, k, B, J) {
    try {
      return B ? d.setAttributeNS(B, k, J) : d.setAttribute(k, J), Rs(d) ? (bt(d), !1) : !0;
    } catch {
      return tt(k, d), !1;
    }
  }, rr = function(d) {
    Jt(Ce.beforeSanitizeAttributes, d, null);
    const k = d.attributes;
    if (!k || Rs(d))
      return;
    R = xt(Ce.uponSanitizeAttribute, R, K, f);
    const B = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: R,
      forceKeepAttr: void 0
    };
    let J = k.length;
    const ae = ot(d.nodeName);
    for (; J--; ) {
      const pe = k[J], Ke = pe.name, nt = pe.namespaceURI, wt = pe.value, ut = ot(Ke), Qt = wt;
      let lt = Ke === "value" ? Qt : Mp(Qt), yn = !1;
      if (B.attrName = ut, B.attrValue = lt, B.keepAttr = !0, B.forceKeepAttr = void 0, Jt(Ce.uponSanitizeAttribute, d, B), lt = B.attrValue, re && (ut === "id" || ut === "name") && zl(lt, ve) !== 0 && (tt(Ke, d, pe), lt = ve + lt, yn = !0), I && It(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, lt)) {
        tt(Ke, d, pe);
        continue;
      }
      if (ut === "attributename" && Ul(lt, "href")) {
        tt(Ke, d, pe);
        continue;
      }
      if (!B.forceKeepAttr) {
        if (!B.keepAttr) {
          tt(Ke, d, pe);
          continue;
        }
        if (!Ae && It(tg, lt)) {
          tt(Ke, d, pe);
          continue;
        }
        if (P && (lt = _n(lt)), !Vr(ae, ut, lt)) {
          tt(Ke, d, pe);
          continue;
        }
        lt = Gr(ae, ut, nt, lt), lt !== Qt && sr(d, Ke, nt, lt) && yn && Bl(t.removed);
      }
    }
    Jt(Ce.afterSanitizeAttributes, d, null);
  }, Os = function(d) {
    let k = null;
    const B = Tt(d);
    for (Jt(Ce.beforeSanitizeShadowDOM, d, null); k = B.nextNode(); )
      if (Jt(Ce.uponSanitizeShadowNode, k, null), Ls(k, d), rr(k), zn(k.content) && Os(k.content), xe(k) === Kt.element) {
        const J = de(k);
        zn(J) && (ir(J), Os(J));
      }
    Jt(Ce.afterSanitizeShadowDOM, d, null);
  }, ir = function(d) {
    const k = [{
      node: d,
      shadow: null
    }];
    for (; k.length > 0; ) {
      const B = k.pop();
      if (B.shadow) {
        Os(B.shadow);
        continue;
      }
      const J = B.node, pe = xe(J) === Kt.element, Ke = te(J);
      if (Ke)
        for (let nt = Ke.length - 1; nt >= 0; --nt)
          k.push({
            node: Ke[nt],
            shadow: null
          });
      if (pe) {
        const nt = Y ? Y(J) : null;
        if (typeof nt == "string" && ot(nt) === "template") {
          const wt = J.content;
          zn(wt) && k.push({
            node: wt,
            shadow: null
          });
        }
      }
      if (pe) {
        const nt = de(J);
        zn(nt) && k.push({
          node: null,
          shadow: nt
        }, {
          node: nt,
          shadow: null
        });
      }
    }
  };
  return t.sanitize = function(q) {
    let d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, k = null, B = null, J = null, ae = null;
    if (xs = !q, xs && (q = "<!-->"), typeof q != "string" && !ls(q) && (q = zp(q), typeof q != "string"))
      throw ps("dirty is not a string, aborting");
    if (!t.isSupported)
      return q;
    oe ? (N = Ie, R = f) : er(d), (Ce.uponSanitizeElement.length > 0 || Ce.uponSanitizeAttribute.length > 0) && (N = Yt(N)), Ce.uponSanitizeAttribute.length > 0 && (R = Yt(R)), t.removed = [];
    const pe = Ve && typeof q != "string" && ls(q);
    if (pe) {
      qr(q);
      const wt = Le(q);
      if (typeof wt == "string") {
        const ut = ot(wt);
        if (!N[ut] || j[ut])
          throw at(q), ps("root node is forbidden and cannot be sanitized in-place");
      }
      if (Rs(q))
        throw at(q), ps("root node is clobbered and cannot be sanitized in-place");
      try {
        ir(q);
      } catch (ut) {
        throw at(q), ut;
      }
    } else if (ls(q))
      k = mn("<!---->"), B = k.ownerDocument.importNode(q, !0), B.nodeType === Kt.element && B.nodeName === "BODY" || B.nodeName === "HTML" ? k = B : k.appendChild(B), ir(k);
    else {
      if (!L && !P && !Q && // eslint-disable-next-line unicorn/prefer-includes
      q.indexOf("<") === -1)
        return we && z ? he(q) : q;
      if (k = mn(q), !k)
        return L ? null : z ? De : "";
    }
    k && _ && bt(k.firstChild);
    const Ke = pe ? q : k;
    try {
      const wt = Tt(Ke);
      for (; J = wt.nextNode(); )
        Ls(J, Ke), rr(J), zn(J.content) && Os(J.content);
    } catch (wt) {
      throw pe && (at(q), _s(t.removed, (ut) => {
        ut.element && Zt(ut.element);
      })), wt;
    }
    if (pe)
      return _s(t.removed, (wt) => {
        wt.element && Zt(wt.element);
      }), P && cn(q), q;
    if (L) {
      if (P && cn(k), S)
        for (ae = Ee.call(k.ownerDocument); k.firstChild; )
          ae.appendChild(k.firstChild);
      else
        ae = k;
      return (R.shadowroot || R.shadowrootmode) && (ae = rt.call(s, ae, !0)), ae;
    }
    let nt = Q ? k.outerHTML : k.innerHTML;
    return Q && N["!doctype"] && k.ownerDocument && k.ownerDocument.doctype && k.ownerDocument.doctype.name && It(Jp, k.ownerDocument.doctype.name) && (nt = "<!DOCTYPE " + k.ownerDocument.doctype.name + `>
` + nt), P && (nt = _n(nt)), we && z ? he(nt) : nt;
  }, t.setConfig = function() {
    let q = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    er(q), oe = !0, Ie = N, f = R;
  }, t.clearConfig = function() {
    ln = null, oe = !1, Ie = null, f = null, we = Te, De = "";
  }, t.isValidAttribute = function(q, d, k) {
    ln || er({});
    const B = ot(q), J = ot(d);
    return Vr(B, J, k);
  }, t.addHook = function(q, d) {
    typeof d == "function" && Wt(Ce, q) && mr(Ce[q], d);
  }, t.removeHook = function(q, d) {
    if (Wt(Ce, q)) {
      if (d !== void 0) {
        const k = Pp(Ce[q], d);
        return k === -1 ? void 0 : Dp(Ce[q], k, 1)[0];
      }
      return Bl(Ce[q]);
    }
  }, t.removeHooks = function(q) {
    Wt(Ce, q) && (Ce[q] = []);
  }, t.removeAllHooks = function() {
    Ce = Zl();
  }, t;
}
var Ia = Mu();
Ia.addHook("uponSanitizeElement", (e, t) => {
  var r, i, o, a, l;
  if (t.tagName === "svg") {
    (r = e.parentNode) == null || r.removeChild(e);
    return;
  }
  if (t.tagName === "math") {
    (i = e.parentNode) == null || i.removeChild(e);
    return;
  }
  if (t.tagName === "foreignobject") {
    (o = e.parentNode) == null || o.removeChild(e);
    return;
  }
  const n = e, s = (a = t.tagName) == null ? void 0 : a.toUpperCase();
  (s === "IMG" || s === "AREA" || s === "MAP") && ((l = n.parentNode) == null || l.removeChild(n));
});
Ia.addHook("afterSanitizeAttributes", (e) => {
  if (e.hasAttribute("href")) {
    const t = e.getAttribute("href") || "";
    try {
      const n = decodeURIComponent(t.toLowerCase());
      (n.includes("javascript:") || n.includes("data:text/html") || n.includes("vbscript:") || n.includes("about:") || n.includes("file:")) && e.removeAttribute("href");
    } catch {
      (t.toLowerCase().includes("javascript:") || t.toLowerCase().includes("data:text/html") || t.toLowerCase().includes("vbscript:") || t.toLowerCase().includes("about:") || t.toLowerCase().includes("file:")) && e.removeAttribute("href");
    }
  }
  if (e.nodeName === "A") {
    const t = (e.getAttribute("href") || "").trim();
    /^(https?:|mailto:)/i.test(t) ? (e.setAttribute("target", "_blank"), e.setAttribute("rel", "noopener noreferrer nofollow")) : e.removeAttribute("href");
  }
  if (e.hasAttribute("src")) {
    const t = e.getAttribute("src") || "";
    try {
      const n = decodeURIComponent(t.toLowerCase());
      (n.includes("javascript:") || n.includes("data:text/html") || n.includes("vbscript:") || n.includes("about:") || n.includes("file:")) && e.removeAttribute("src");
    } catch {
      (t.toLowerCase().includes("javascript:") || t.toLowerCase().includes("data:text/html") || t.toLowerCase().includes("vbscript:") || t.toLowerCase().includes("about:") || t.toLowerCase().includes("file:")) && e.removeAttribute("src");
    }
  }
  if (e.hasAttribute("style")) {
    const t = e.getAttribute("style") || "";
    try {
      const n = decodeURIComponent(t.toLowerCase());
      (n.includes("expression(") || n.includes("behavior:") || n.includes("-moz-binding") || n.includes("import") || n.includes("javascript:") || n.includes("vbscript:")) && e.removeAttribute("style");
    } catch {
      (t.toLowerCase().includes("expression(") || t.toLowerCase().includes("behavior:") || t.toLowerCase().includes("-moz-binding") || t.toLowerCase().includes("import") || t.toLowerCase().includes("javascript:") || t.toLowerCase().includes("vbscript:")) && e.removeAttribute("style");
    }
  }
  Array.from(e.attributes).forEach((t) => {
    t.name.toLowerCase().startsWith("on") && e.removeAttribute(t.name);
  });
});
function og(e) {
  if (!e || typeof e != "string")
    return !0;
  const t = e.trim().toLowerCase();
  if (t.startsWith("<!doctype"))
    return !1;
  const n = ["<html", "<head", "<body", "<?xml"];
  for (const s of n)
    if (t.includes(s))
      return !1;
  return !0;
}
function ag(e) {
  if (!og(e))
    return console.warn("Blocked HTML input: Contains DOCTYPE or document structure tags"), "";
  const t = {
    // Block all dangerous tags including SVG, form elements and images.
    // NOTE: 'a' must NOT be in this list — FORBID_TAGS beats ALLOWED_TAGS, and
    // anchors are intentionally kept (markdown links) then hardened by the
    // afterSanitizeAttributes hook (http(s)/mailto only, forced target+rel).
    FORBID_TAGS: [
      "iframe",
      "frame",
      "frameset",
      "object",
      "embed",
      "applet",
      "script",
      "base",
      "link",
      "meta",
      "style",
      "svg",
      "math",
      "form",
      "input",
      "button",
      "textarea",
      "select",
      "option",
      "xml",
      "xss",
      "import",
      "video",
      "audio",
      "track",
      "source",
      "canvas",
      "details",
      "template",
      "slot",
      "noscript",
      "marquee",
      "bgsound",
      "keygen",
      "command",
      "html",
      "head",
      "body",
      // SECURITY: Block document structure tags
      "img",
      "area",
      "map"
      // SECURITY: Remove image/map tags completely
    ],
    // Block dangerous attributes
    FORBID_ATTR: [
      // Event handlers
      "onerror",
      "onload",
      "onclick",
      "onmouseover",
      "onmouseout",
      "onmousemove",
      "onkeydown",
      "onkeyup",
      "onkeypress",
      "onfocus",
      "onblur",
      "onchange",
      "onsubmit",
      "ondblclick",
      "oncontextmenu",
      "oninput",
      "oninvalid",
      "onreset",
      "onsearch",
      "onselect",
      "onabort",
      "oncanplay",
      "oncanplaythrough",
      "oncuechange",
      "ondurationchange",
      "onemptied",
      "onended",
      "onloadeddata",
      "onloadedmetadata",
      "onloadstart",
      "onpause",
      "onplay",
      "onplaying",
      "onprogress",
      "onratechange",
      "onseeked",
      "onseeking",
      "onstalled",
      "onsuspend",
      "ontimeupdate",
      "onvolumechange",
      "onwaiting",
      "ontoggle",
      "onauxclick",
      "ongotpointercapture",
      "onlostpointercapture",
      "onpointercancel",
      "onpointerdown",
      "onpointerenter",
      "onpointerleave",
      "onpointermove",
      "onpointerout",
      "onpointerover",
      "onpointerup",
      "onwheel",
      "onanimationcancel",
      "onanimationend",
      "onanimationiteration",
      "onanimationstart",
      "ontransitioncancel",
      "ontransitionend",
      "ontransitionrun",
      "ontransitionstart",
      "ondrag",
      "ondragend",
      "ondragenter",
      "ondragleave",
      "ondragover",
      "ondragstart",
      "ondrop",
      "oncopy",
      "oncut",
      "onpaste",
      "onscroll",
      "onmessage",
      "onmouseenter",
      "onmouseleave",
      "onmousewheel",
      "onbeforeunload",
      "onerrorupdate",
      "onhelp",
      "onmove",
      "onreadystatechange",
      "onresize",
      "onstart",
      "onstop",
      "onunload",
      "onactivate",
      "onafterprint",
      "onafterupdate",
      "onbeforeactivate",
      "onbeforecopy",
      "onbeforecut",
      "onbeforedeactivate",
      "onbeforeeditfocus",
      "onbeforepaste",
      "onbeforeprint",
      "onbeforeupdate",
      "onbounce",
      "oncellchange",
      "oncontrolselect",
      "ondataavailable",
      "ondatasetchanged",
      "ondatasetcomplete",
      "ondeactivate",
      "onfilterchange",
      "onfinish",
      "onfocusin",
      "onfocusout",
      "onlayoutcomplete",
      "onlosecapture",
      "onmoveend",
      "onmovestart",
      "onpropertychange",
      "onresizeend",
      "onresizestart",
      "onrowenter",
      "onrowexit",
      "onrowsdelete",
      "onrowsinserted",
      "onselectionchange",
      "onselectstart",
      "onshow",
      "onsort",
      "onpointerrawupdate",
      // Dangerous attributes
      "formaction",
      "action",
      "form",
      "srcdoc",
      "srcset",
      "dynsrc",
      "lowsrc",
      "ping",
      "poster",
      "background",
      "code",
      "codebase",
      "archive",
      "profile",
      "xmlns",
      "xlink:href",
      "attributename",
      "from",
      "to",
      "values",
      "begin",
      "autofocus",
      "autoplay",
      "controls",
      "manifest",
      "sandbox",
      // SECURITY: block resource-loading attributes. 'href' is intentionally NOT
      // here (FORBID_ATTR beats ALLOWED_ATTR): markdown links need it, and the
      // afterSanitizeAttributes hook strips any href that isn't http(s)/mailto.
      "src",
      "data"
    ],
    // Only allow safe protocols
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    // SECURITY: Strip ALL HTML tags to prevent rendering exploits
    // Only allow basic text formatting for markdown (no links, images, or any potentially dangerous tags)
    ALLOWED_TAGS: [
      "a",
      "b",
      "i",
      "u",
      "strong",
      "em",
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "code",
      "pre",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "span",
      "div",
      "del",
      "hr",
      "sup",
      "sub",
      "abbr",
      "cite",
      "dfn",
      "kbd",
      "mark",
      "q",
      "samp",
      "small",
      "time",
      "var"
    ],
    // Allow safe link attributes only (href is protocol-restricted + target/rel are
    // forced by the afterSanitizeAttributes hook above). No src or resource-loading attrs.
    ALLOWED_ATTR: [
      "href",
      "target",
      "rel",
      "title",
      "class",
      "id",
      "align",
      "colspan",
      "rowspan"
    ],
    // Return a string instead of a document
    RETURN_DOM: !1,
    RETURN_DOM_FRAGMENT: !1,
    // Keep HTML comments removed
    ALLOW_DATA_ATTR: !1
    // NOTE: do NOT set USE_PROFILES here — it overrides ALLOWED_TAGS/ALLOWED_ATTR,
    // which would drop the <a> tags we explicitly allow above. The explicit
    // ALLOWED_TAGS/ALLOWED_ATTR allowlist is authoritative; protocols are still
    // restricted by the afterSanitizeAttributes hook (href → http/https/mailto only).
  };
  return Ia.sanitize(e, t);
}
Ue.setOptions({
  renderer: new Ue.Renderer(),
  gfm: !0,
  breaks: !0
});
const hi = (e) => ag(Ue(e || "")), Jl = "*", lg = /* @__PURE__ */ new Set(["null", "about:blank", ""]);
let nn = null;
const Or = (e) => e && !lg.has(e) ? e : null, cg = (e) => {
  if (!e) return null;
  try {
    return Or(new URL(e).origin);
  } catch {
    return null;
  }
};
function ug() {
  if (nn) return nn;
  if (window.parent === window)
    return nn = Or(window.location.origin) || Jl, nn;
  try {
    const e = Or(window.parent.location.origin);
    if (e)
      return nn = e, nn;
  } catch {
  }
  try {
    const e = window.location.ancestorOrigins, t = e && e.length ? Or(e[0]) : null;
    if (t)
      return nn = t, nn;
  } catch {
  }
  return nn = cg(document.referrer) || Jl, nn;
}
function Ql(e) {
  nn = Or(e) || nn;
}
function Ft(e) {
  window.parent.postMessage(e, ug());
}
const Li = "Start a new chat", ec = "Start a new chat? This ends the current one.", fg = "Start new chat", hg = "Cancel", tc = "Couldn't start a new chat. Please try again.", dg = 15e3, pg = ["aria-label"], gg = { class: "new-chat-confirm__question" }, mg = { class: "new-chat-confirm__actions" }, _g = ["disabled"], yg = ["disabled"], vg = /* @__PURE__ */ _a({
  __name: "NewChatConfirm",
  props: {
    error: {},
    busy: { type: Boolean }
  },
  emits: ["confirm", "cancel"],
  setup(e, { emit: t }) {
    const n = t;
    return (s, r) => (T(), A("div", {
      class: "new-chat-confirm",
      role: "alertdialog",
      "aria-live": "polite",
      "aria-label": C(ec)
    }, [
      v("p", gg, se(s.error || C(ec)), 1),
      v("div", mg, [
        v("button", {
          type: "button",
          class: "new-chat-confirm__button",
          disabled: s.busy,
          onClick: r[0] || (r[0] = (i) => n("cancel"))
        }, se(C(hg)), 9, _g),
        v("button", {
          type: "button",
          class: "new-chat-confirm__button new-chat-confirm__button--primary",
          disabled: s.busy,
          onClick: r[1] || (r[1] = (i) => n("confirm"))
        }, se(C(fg)), 9, yg)
      ])
    ], 8, pg));
  }
}), La = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Fu = /* @__PURE__ */ La(vg, [["__scopeId", "data-v-6c78f353"]]), bg = { class: "askai" }, wg = { class: "askai__bar" }, kg = ["value", "placeholder", "disabled", "aria-label", "onKeydown"], Tg = ["disabled", "title", "aria-label", "aria-expanded"], Ag = { class: "askai__intro" }, Sg = { class: "askai__title" }, xg = {
  key: 0,
  class: "askai__subtitle"
}, Eg = {
  key: 0,
  class: "askai__suggestions"
}, Cg = ["disabled", "onClick"], Rg = ["aria-live"], Ig = {
  key: 0,
  class: "askai__question"
}, Lg = {
  key: 1,
  class: "askai__system"
}, Og = ["innerHTML"], Ng = {
  key: 0,
  class: "askai__sources"
}, Pg = ["title"], Dg = {
  key: 0,
  class: "askai__thinking",
  role: "status",
  "aria-live": "polite"
}, Mg = { class: "askai__thinking-text" }, Fg = { class: "askai__foot" }, $g = { key: 0 }, Bg = /* @__PURE__ */ _a({
  __name: "AskAiPanel",
  props: {
    messages: {},
    draft: {},
    agentName: {},
    suggestions: {},
    welcomeTitle: {},
    welcomeSubtitle: {},
    placeholder: {},
    inputEnabled: { type: Boolean },
    typingEnabled: { type: Boolean },
    loading: { type: Boolean },
    showCitations: { type: Boolean },
    disclaimer: {},
    active: { type: Boolean },
    hotkey: { type: Boolean },
    citationLabel: { type: Function },
    citationTooltip: { type: Function },
    displayText: { type: Function },
    isStreaming: { type: Function },
    canStartNewChat: { type: Boolean },
    startingNewChat: { type: Boolean },
    newChatArmed: { type: Boolean },
    newChatError: {}
  },
  emits: ["update:draft", "send", "ask", "close", "newChat", "confirmNewChat", "cancelNewChat"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = ue(null), i = ue(null), o = ue(null), a = ["user", "bot", "agent", "system"], l = ge(
      () => n.messages.map((x, O) => ({ message: x, index: O })).filter(({ message: x }) => a.includes(x.message_type))
    ), p = ge(() => l.value.length > 0), u = (x) => {
      s("update:draft", x.target.value);
    }, b = () => {
      !(n.typingEnabled ?? n.inputEnabled) || !n.draft.trim() || s("send");
    }, w = (x) => {
      n.inputEnabled && s("ask", x);
    }, U = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform || ""), $ = (x) => {
      if (x.key === "Escape") {
        x.preventDefault(), s("close");
        return;
      }
      const O = U ? x.metaKey && !x.ctrlKey : x.ctrlKey && !x.metaKey;
      n.hotkey && O && !x.altKey && (x.key === "k" || x.key === "K") && (x.preventDefault(), s("close"));
    }, V = () => {
      ws(() => {
        var x;
        return (x = r.value) == null ? void 0 : x.focus();
      });
    };
    let D = 0;
    const te = () => {
      if (!o.value) return;
      const x = o.value.closest(".askai"), O = i.value;
      if (!x || !O) return;
      const Y = x.offsetHeight - O.offsetHeight, X = getComputedStyle(O), xe = parseFloat(X.paddingTop) + parseFloat(X.paddingBottom), Le = Math.ceil(Y + xe + o.value.getBoundingClientRect().height);
      Math.abs(Le - D) < 3 || (D = Le, Ft({ type: "WIDGET_RESIZE", height: Le }));
    };
    let fe = null;
    const de = ge(
      () => l.value.reduce((x, { message: O, index: Y }) => x + n.displayText(Y, O.message || "").length, 0)
    );
    return $t(
      () => [l.value.length, de.value, n.loading],
      () => ws(() => {
        i.value && (i.value.scrollTop = i.value.scrollHeight);
      })
    ), $t(() => n.newChatArmed, () => ws(() => te())), $t(() => n.active, (x) => {
      x && V();
    }), Hi(() => {
      n.active && V(), window.addEventListener("keydown", $), o.value && typeof ResizeObserver < "u" && (fe = new ResizeObserver(() => te()), fe.observe(o.value)), te();
    }), Xc(() => {
      window.removeEventListener("keydown", $), fe == null || fe.disconnect(), fe = null;
    }), (x, O) => (T(), A("div", bg, [
      v("div", wg, [
        O[6] || (O[6] = v("svg", {
          class: "askai__bar-icon",
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "1.8",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "aria-hidden": "true"
        }, [
          v("path", { d: "M12 3l1.9 4.9L19 9.8l-4.9 1.9L12 17l-1.9-5.3L5 9.8l5.1-1.9L12 3z" })
        ], -1)),
        v("input", {
          ref_key: "inputEl",
          ref: r,
          type: "text",
          class: "askai__input",
          value: x.draft,
          placeholder: x.placeholder,
          disabled: !(x.typingEnabled ?? x.inputEnabled),
          "aria-label": x.placeholder,
          autocomplete: "off",
          spellcheck: "false",
          onInput: u,
          onKeydown: ui(ms(b, ["prevent"]), ["enter"])
        }, null, 40, kg),
        x.canStartNewChat ? (T(), A("button", {
          key: 0,
          type: "button",
          class: $e(["askai__new", { "askai__new--armed": x.newChatArmed }]),
          disabled: x.startingNewChat,
          title: C(Li),
          "aria-label": C(Li),
          "aria-expanded": x.newChatArmed,
          onClick: O[0] || (O[0] = (Y) => s("newChat"))
        }, O[4] || (O[4] = [
          v("svg", {
            width: "15",
            height: "15",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "aria-hidden": "true"
          }, [
            v("path", { d: "M12 20h9" }),
            v("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" })
          ], -1)
        ]), 10, Tg)) : ce("", !0),
        v("button", {
          type: "button",
          class: "askai__close",
          "aria-label": "Close",
          title: "Close (Esc)",
          onClick: O[1] || (O[1] = (Y) => s("close"))
        }, O[5] || (O[5] = [
          v("span", { class: "askai__kbd" }, "Esc", -1)
        ]))
      ]),
      x.newChatArmed && x.canStartNewChat ? (T(), Si(Fu, {
        key: 0,
        busy: x.startingNewChat,
        error: x.newChatError,
        onConfirm: O[2] || (O[2] = (Y) => s("confirmNewChat")),
        onCancel: O[3] || (O[3] = (Y) => s("cancelNewChat"))
      }, null, 8, ["busy", "error"])) : ce("", !0),
      v("div", {
        ref_key: "bodyEl",
        ref: i,
        class: "askai__body"
      }, [
        v("div", {
          ref_key: "contentEl",
          ref: o,
          class: "askai__content"
        }, [
          p.value ? (T(), A(Be, { key: 1 }, [
            (T(!0), A(Be, null, Et(l.value, ({ message: Y, index: X }) => (T(), A("div", {
              key: X,
              class: "askai__turn",
              "aria-live": x.isStreaming(X) ? "off" : "polite"
            }, [
              Y.message_type === "user" ? (T(), A("p", Ig, se(Y.message), 1)) : Y.message_type === "system" ? (T(), A("p", Lg, se(Y.message), 1)) : (T(), A(Be, { key: 2 }, [
                v("div", {
                  class: $e(["askai__answer", { "askai__answer--streaming": x.isStreaming(X) }]),
                  innerHTML: C(hi)(x.isStreaming(X) ? x.displayText(X, Y.message || "") : Y.message || "")
                }, null, 10, Og),
                x.showCitations && !x.isStreaming(X) && Y.sources && Y.sources.length ? (T(), A("div", Ng, [
                  O[9] || (O[9] = v("span", { class: "askai__label" }, "Sources", -1)),
                  (T(!0), A(Be, null, Et(Y.sources, (xe, Le) => (T(), A("span", {
                    key: Le,
                    class: "askai__source",
                    title: x.citationTooltip(xe)
                  }, se(x.citationLabel(xe)), 9, Pg))), 128))
                ])) : ce("", !0)
              ], 64))
            ], 8, Rg))), 128)),
            x.loading ? (T(), A("div", Dg, [
              O[10] || (O[10] = v("span", { class: "askai__dot" }, null, -1)),
              O[11] || (O[11] = v("span", { class: "askai__dot" }, null, -1)),
              O[12] || (O[12] = v("span", { class: "askai__dot" }, null, -1)),
              v("span", Mg, se(x.showCitations ? "Searching the knowledge base" : "Thinking"), 1)
            ])) : ce("", !0)
          ], 64)) : (T(), A(Be, { key: 0 }, [
            v("div", Ag, [
              v("h2", Sg, se(x.welcomeTitle || `Ask ${x.agentName}`), 1),
              x.welcomeSubtitle ? (T(), A("p", xg, se(x.welcomeSubtitle), 1)) : ce("", !0)
            ]),
            x.suggestions.length && !x.draft.trim() ? (T(), A("div", Eg, [
              O[8] || (O[8] = v("p", { class: "askai__label" }, "Suggested", -1)),
              (T(!0), A(Be, null, Et(x.suggestions, (Y) => (T(), A("button", {
                key: Y,
                type: "button",
                class: "askai__suggestion",
                disabled: !x.inputEnabled,
                onClick: (X) => w(Y)
              }, [
                v("span", null, se(Y), 1),
                O[7] || (O[7] = v("svg", {
                  width: "15",
                  height: "15",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "aria-hidden": "true"
                }, [
                  v("path", { d: "M5 12h14M13 6l6 6-6 6" })
                ], -1))
              ], 8, Cg))), 128))
            ])) : ce("", !0)
          ], 64))
        ], 512)
      ], 512),
      v("div", Fg, [
        x.disclaimer ? (T(), A("span", $g, se(x.disclaimer), 1)) : ce("", !0)
      ])
    ]));
  }
}), Ug = /* @__PURE__ */ La(Bg, [["__scopeId", "data-v-8e1b1574"]]), kr = [
  { stops: "#9D8CFF, #5FE3D6, #C9F24E", glow: "rgba(157,140,255,0.45)" },
  // aurora (default)
  { stops: "#FF8A73, #9D8CFF, #5FE3D6", glow: "rgba(255,138,115,0.40)" },
  // coral
  { stops: "#5FE3D6, #C9F24E, #9D8CFF", glow: "rgba(95,227,214,0.40)" },
  // teal
  { stops: "#C9F24E, #5FE3D6, #FF8A73", glow: "rgba(201,242,78,0.35)" },
  // lime
  { stops: "#6EA8FF, #9D8CFF, #5FE3D6", glow: "rgba(110,168,255,0.42)" },
  // blue
  { stops: "#FF7AC6, #9D8CFF, #6EA8FF", glow: "rgba(255,122,198,0.42)" },
  // pink
  { stops: "#FF8A73, #FFC857, #FF7AC6", glow: "rgba(255,200,87,0.40)" },
  // sunset
  { stops: "#7C5CFF, #B388FF, #5FE3D6", glow: "rgba(124,92,255,0.45)" },
  // violet
  { stops: "#0EA5A5, #5FE3D6, #C9F24E", glow: "rgba(14,165,165,0.40)" },
  // emerald
  { stops: "#F34611, #FF8A73, #FFC857", glow: "rgba(243,70,17,0.38)" }
  // ember
], zg = (e) => (e || "").split("").reduce((t, n) => t + n.charCodeAt(0), 0) % kr.length, Hg = (e) => {
  const t = kr[(e % kr.length + kr.length) % kr.length];
  return {
    background: `
            radial-gradient(circle at 32% 28%, rgba(255,255,255,0.22) 0%, transparent 42%),
            radial-gradient(circle at 68% 72%, rgba(0,0,0,0.25) 0%, transparent 38%),
            radial-gradient(ellipse at 50% 50%, ${t.stops})
        `.trim(),
    boxShadow: `0 4px 28px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`,
    borderRadius: "50%"
  };
}, Wg = (e, t) => {
  const n = typeof t == "number" && Number.isFinite(t) ? t : zg(e);
  return Hg(n);
}, nc = (e) => {
  var t;
  return !!((t = e == null ? void 0 : e.attributes) != null && t.end_chat);
}, sc = "AI can make mistakes. Check important info.";
function qg(e, t = !1) {
  return e !== !1 && !t;
}
const xo = {
  ai: "Online · replies instantly",
  human: "Online · usually replies in a few minutes",
  away: "Away · we'll reply when we're back"
};
function jg(e, t = !1) {
  return (t ? "human" : (e == null ? void 0 : e.mode) ?? "ai") === "ai" ? { text: xo.ai, online: !0 } : (e == null ? void 0 : e.available) !== !1 ? { text: xo.human, online: !0 } : { text: xo.away, online: !1 };
}
const $u = (e) => !!e && (/^https?:\/\//i.test(e) || e.startsWith("data:")), Vg = (e, t) => e ? $u(e) || e.startsWith("blob:") ? e : `${t.replace(/\/api\/v1\/?$/, "")}${e.startsWith("/") ? "" : "/"}${e}` : "";
function rc() {
  return typeof window < "u" && window.APP_CONFIG ? window.APP_CONFIG : {};
}
const Ts = {
  get API_URL() {
    return rc().API_URL || "https://chm.c-dev.in/api/v1";
  },
  get WS_URL() {
    return rc().WS_URL || "wss://chm.c-dev.in";
  }
};
function Oi(e) {
  return Vg(e, Ts.API_URL);
}
const Bu = "ctid", Kg = "identity_expired", Gg = "invalid_token", ic = 0.8, Yg = 720 * 60 * 1e3, Eo = 30 * 1e3, Co = 1e3, Yn = (e) => {
  if (typeof e != "string") return e ? String(e) : null;
  const t = e.trim();
  return !t || t === "undefined" || t === "null" ? null : t;
}, di = (e) => {
  const t = Yn(e);
  if (!t) return null;
  const [, n] = t.split(".");
  if (!n) return null;
  try {
    const s = atob(n.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(s);
  } catch {
    return null;
  }
}, Xg = async (e) => {
  var t, n;
  try {
    return (n = (t = await e.json()) == null ? void 0 : t.detail) == null ? void 0 : n.code;
  } catch {
    return;
  }
}, Ni = (e = Bu) => ({
  read: () => {
    try {
      return Yn(localStorage.getItem(e));
    } catch {
      return null;
    }
  },
  write: (t) => {
    try {
      localStorage.setItem(e, t);
    } catch {
    }
  },
  clear: () => {
    try {
      localStorage.removeItem(e);
    } catch {
    }
  }
}), Zg = () => ({
  read: () => null,
  write: () => {
  },
  clear: () => {
  }
});
function Jg(e = {}) {
  const t = e.store ?? Ni(), n = ue(null);
  let s = null, r = null;
  const i = () => {
    s && (clearTimeout(s), s = null);
  }, o = () => {
    const V = di(n.value);
    return V != null && V.exp ? Number(V.exp) - Math.floor(Date.now() / Co) : null;
  }, a = () => {
    const V = di(n.value);
    if (!(V != null && V.exp)) return !1;
    const D = V.iat ? Number(V.exp) - Number(V.iat) : 0, te = o() ?? 0;
    return D <= 0 ? te <= 0 : te <= D * (1 - ic);
  }, l = (V, { persist: D = !0 } = {}) => {
    var de, x;
    const te = Yn(V), fe = !!n.value;
    if (i(), n.value = te, !te) {
      t.clear(), fe && ((de = e.onTokenCleared) == null || de.call(e));
      return;
    }
    D && (t.write(te), (x = e.onTokenChanged) == null || x.call(e, te)), b();
  }, p = async (V) => {
    if (!n.value || !V) return !1;
    if (r) return r;
    const D = n.value;
    return r = (async () => {
      var te, fe;
      try {
        const de = await fetch(`${Ts.API_URL}/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${D}`
          },
          body: JSON.stringify({ widget_id: V })
        });
        if (de.status === 401)
          return await Xg(de) !== Gg && ((te = e.onIdentityExpired) == null || te.call(e)), !1;
        if (!de.ok)
          return b(Eo), !1;
        const x = await de.json(), O = Yn((fe = x == null ? void 0 : x.data) == null ? void 0 : fe.token);
        return O ? (l(O), !0) : !1;
      } catch {
        return b(Eo), !1;
      } finally {
        r = null;
      }
    })(), r;
  }, u = async (V) => n.value ? a() ? p(V) : !0 : !1, b = (V) => {
    i();
    const D = di(n.value);
    if (!(D != null && D.exp) || !(D != null && D.iat)) return;
    const te = (Number(D.exp) - Number(D.iat)) * Co, fe = (o() ?? 0) * Co, de = V ?? Math.min(
      Yg,
      Math.max(0, fe - te * (1 - ic))
    );
    s = setTimeout(() => {
      s = null, u(w).then((x) => {
        b(x ? void 0 : Eo);
      });
    }, de);
  };
  let w = "";
  return {
    token: n,
    start: (V, D) => {
      w = V;
      const te = Yn(D) || t.read();
      l(te, { persist: !1 }), te && t.write(te);
    },
    stop: () => {
      i(), r = null;
    },
    setToken: l,
    ensureFresh: u
  };
}
const Vs = window.__CM_FRAME__, Uu = "null";
let vs = !1, zu = !1, Hu = null;
const Jo = () => !!Vs, ys = () => !Vs || vs && !zu, Qg = () => Hu, Wu = (e) => {
  typeof e == "string" && e && (Hu = e);
}, qu = (e) => Vs ? vs ? Zg() : Ni(`${Bu}:${e}`) : Ni(), em = () => new Promise((e) => {
  const t = (n) => {
    var r;
    if (n.source !== window.parent || ((r = n.data) == null ? void 0 : r.type) !== "HOST_INIT") return;
    window.removeEventListener("message", t);
    const s = n.origin === Uu;
    e({
      origin: n.origin,
      // An opaque host can't be addressed, so nothing it hands over can be
      // answered safely: such a frame runs as an anonymous visitor.
      token: s ? null : Yn(n.data.token),
      pageUrl: typeof n.data.pageUrl == "string" ? n.data.pageUrl : null
    });
  };
  window.addEventListener("message", t), window.parent.postMessage({ type: "FRAME_READY" }, "*");
}), tm = async (e) => {
  var t;
  try {
    const n = await e.json();
    return ((t = n == null ? void 0 : n.detail) == null ? void 0 : t.code) || "unavailable";
  } catch {
    return "unavailable";
  }
}, oc = () => {
  const e = document.getElementById("app");
  e && (e.textContent = "Chat is unavailable right now.");
};
async function nm() {
  if (!Vs) return !0;
  const e = new URL(window.location.href).searchParams;
  vs = e.get("host") === "1" && window.parent !== window;
  let t, n = null;
  if (vs) {
    const o = await em();
    o.origin !== Uu ? (Ql(o.origin), n = o.origin) : (zu = !0, Ql("*")), Wu(o.pageUrl), t = o.token;
  } else
    t = qu(Vs.widgetId).read();
  let s;
  try {
    s = await fetch(`${Ts.API_URL}/widgets/${encodeURIComponent(Vs.widgetId)}/bootstrap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...t ? { Authorization: `Bearer ${t}` } : {}
      },
      body: JSON.stringify({ host_origin: n, source: e.get("source") })
    });
  } catch {
    return vs ? Ft({ type: "WIDGET_ERROR", code: "unavailable" }) : oc(), !1;
  }
  if (!s.ok) {
    const o = await tm(s);
    return vs ? Ft({ type: "WIDGET_ERROR", code: o }) : oc(), !1;
  }
  const r = await s.json();
  window.__INITIAL_DATA__ = r;
  const i = Yn(r.initialToken);
  return ys() && i && i !== t && Ft({ type: "TOKEN_UPDATE", token: i }), !0;
}
const sm = () => {
  vs && Ft({ type: "WIDGET_READY" });
};
function rm(e) {
  const t = ge(() => ({
    backgroundColor: "var(--cm-card)",
    color: "var(--cm-text)"
  })), n = ge(() => ({
    backgroundColor: e.value.chat_bubble_color || "#C9F24E",
    color: qs(e.value.chat_bubble_color || "#C9F24E") ? "#FFFFFF" : "#000000"
  })), s = ge(() => ({
    backgroundColor: "var(--cm-agent-bg)",
    color: "var(--cm-text)"
  })), r = ge(() => ({
    backgroundColor: "var(--cm-accent)",
    color: "var(--cm-on-accent)"
  })), i = ge(() => ({
    color: "var(--cm-text)"
  })), o = ge(() => ({
    borderBottom: "1px solid var(--cm-hairline)"
  })), a = ge(() => Oi(e.value.photo_url)), l = ge(() => {
    const p = e.value.chat_background_color || "#ffffff";
    return {
      boxShadow: `0 8px 5px ${qs(p) ? "rgba(0, 0, 0, 0.24)" : "rgba(0, 0, 0, 0.12)"}`
    };
  });
  return {
    chatStyles: t,
    chatIconStyles: n,
    agentBubbleStyles: s,
    userBubbleStyles: r,
    messageNameStyles: i,
    headerBorderStyles: o,
    photoUrl: a,
    shadowStyle: l
  };
}
const im = /* @__PURE__ */ new Set(["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]), om = /* @__PURE__ */ new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
]);
[...im, ...om];
function am(e, t) {
  const n = ue([]), s = ue(!1), r = ue(null), i = (O) => {
    if (O === 0) return "0 Bytes";
    const Y = 1024, X = ["Bytes", "KB", "MB", "GB"], xe = Math.floor(Math.log(O) / Math.log(Y));
    return parseFloat((O / Math.pow(Y, xe)).toFixed(2)) + " " + X[xe];
  }, o = (O) => O.startsWith("image/"), a = (O) => O ? Oi(O) : "", l = (O) => {
    const Y = O.file_url || O.url;
    return Y ? Oi(Y) : "";
  }, p = async (O) => {
    const Y = O.target;
    Y.files && Y.files.length > 0 && (await V(Array.from(Y.files)), Y.value = "");
  }, u = async (O) => {
    var X;
    O.preventDefault();
    const Y = (X = O.dataTransfer) == null ? void 0 : X.files;
    Y && Y.length > 0 && await V(Array.from(Y));
  }, b = (O) => {
    O.preventDefault();
  }, w = (O) => {
    O.preventDefault();
  }, U = async (O) => {
    var xe;
    const Y = (xe = O.clipboardData) == null ? void 0 : xe.items;
    if (!Y) return;
    const X = [];
    for (const Le of Array.from(Y))
      if (Le.kind === "file") {
        const we = Le.getAsFile();
        we && X.push(we);
      }
    X.length > 0 && await V(X);
  }, $ = async (O, Y = 500) => new Promise((X, xe) => {
    const Le = new FileReader();
    Le.onload = (we) => {
      var Te;
      const De = new Image();
      De.onload = () => {
        const je = document.createElement("canvas");
        let Fe = De.width, Ze = De.height;
        const he = 1920;
        (Fe > he || Ze > he) && (Fe > Ze ? (Ze = Ze / Fe * he, Fe = he) : (Fe = Fe / Ze * he, Ze = he)), je.width = Fe, je.height = Ze;
        const ye = je.getContext("2d");
        if (!ye) {
          xe(new Error("Failed to get canvas context"));
          return;
        }
        ye.drawImage(De, 0, 0, Fe, Ze);
        let me = 0.9;
        const Je = () => {
          je.toBlob((Qe) => {
            if (!Qe) {
              xe(new Error("Failed to compress image"));
              return;
            }
            if (Qe.size / 1024 > Y && me > 0.3)
              me -= 0.1, Je();
            else {
              const Ee = new FileReader();
              Ee.onload = () => {
                const Pt = Ee.result.split(",")[1];
                X({ blob: Qe, base64: Pt });
              }, Ee.readAsDataURL(Qe);
            }
          }, O.type === "image/png" ? "image/png" : "image/jpeg", me);
        };
        Je();
      }, De.onerror = () => xe(new Error("Failed to load image")), De.src = (Te = we.target) == null ? void 0 : Te.result;
    }, Le.onerror = () => xe(new Error("Failed to read file")), Le.readAsDataURL(O);
  }), V = async (O) => {
    if (n.value.length >= 3) {
      alert("Maximum 3 files allowed per message");
      return;
    }
    const we = 3 - n.value.length, De = O.slice(0, we);
    O.length > we && alert(`Only ${we} more file(s) can be uploaded. Maximum 3 files per message.`);
    for (const Te of De)
      try {
        if (n.value.some((he) => he.filename === Te.name)) {
          console.warn(`File ${Te.name} is already selected`), alert(`File "${Te.name}" is already selected`);
          continue;
        }
        const Fe = Te.type.startsWith("image/"), Ze = Fe ? 5242880 : 10485760;
        if (Te.size > Ze) {
          const he = Ze / 1048576;
          console.error(`File ${Te.name} is too large. Maximum size is ${he}MB`), alert(`File "${Te.name}" is too large. Maximum size for ${Fe ? "images" : "documents"} is ${he}MB`);
          continue;
        }
        if (Fe)
          try {
            const { blob: he, base64: ye } = await $(Te, 500), me = he.size;
            console.log(`Compressed ${Te.name}: ${(Te.size / 1024).toFixed(2)}KB → ${(me / 1024).toFixed(2)}KB`), n.value.push({
              content: ye,
              filename: Te.name,
              type: Te.type,
              size: me,
              url: URL.createObjectURL(he),
              file_url: URL.createObjectURL(he)
            });
          } catch (he) {
            console.error("Image compression failed, uploading original:", he);
            const ye = new FileReader();
            ye.onload = (me) => {
              var st;
              const Qe = ((st = me.target) == null ? void 0 : st.result).split(",")[1];
              n.value.push({
                content: Qe,
                filename: Te.name,
                type: Te.type,
                size: Te.size,
                url: URL.createObjectURL(Te),
                file_url: URL.createObjectURL(Te)
              });
            }, ye.readAsDataURL(Te);
          }
        else {
          const he = new FileReader();
          he.onload = (ye) => {
            var Qe;
            const Je = ((Qe = ye.target) == null ? void 0 : Qe.result).split(",")[1];
            n.value.push({
              content: Je,
              filename: Te.name,
              type: Te.type || "application/octet-stream",
              size: Te.size,
              url: "",
              file_url: ""
            });
          }, he.readAsDataURL(Te);
        }
      } catch (je) {
        console.error("File upload error:", je);
      }
  };
  return {
    uploadedAttachments: n,
    previewModal: s,
    previewFile: r,
    formatFileSize: i,
    isImageAttachment: o,
    getDownloadUrl: a,
    getPreviewUrl: l,
    handleFileSelect: p,
    handleDrop: u,
    handleDragOver: b,
    handleDragLeave: w,
    handlePaste: U,
    uploadFiles: V,
    removeAttachment: async (O) => {
      const Y = n.value[O];
      if (Y) {
        try {
          let X = Y.url;
          if (X.startsWith("/uploads/") ? X = X.substring(9) : X.startsWith("/") && (X = X.substring(1)), $u(X))
            try {
              X = new URL(X).pathname.replace(/^\/+/, "");
            } catch {
            }
          const xe = {};
          e.value && (xe.Authorization = `Bearer ${e.value}`);
          const Le = await fetch(`${Ts.API_URL}/files/upload/${X}`, {
            method: "DELETE",
            headers: xe
          });
          if (Le.ok)
            console.log("File deleted successfully from backend.");
          else {
            const we = await Le.json();
            console.error("Failed to delete file:", we.detail);
          }
        } catch (X) {
          console.error("Error calling delete API:", X);
        }
        Y.url && Y.url.startsWith("blob:") && URL.revokeObjectURL(Y.url), Y.file_url && Y.file_url.startsWith("blob:") && URL.revokeObjectURL(Y.file_url), n.value.splice(O, 1);
      }
    },
    openPreview: (O) => {
      r.value = O, s.value = !0;
    },
    closePreview: () => {
      s.value = !1, setTimeout(() => {
        r.value = null;
      }, 300);
    },
    openFilePicker: () => {
      var O;
      (O = t.value) == null || O.click();
    },
    isImage: (O) => O.startsWith("image/")
  };
}
const En = /* @__PURE__ */ Object.create(null);
En.open = "0";
En.close = "1";
En.ping = "2";
En.pong = "3";
En.message = "4";
En.upgrade = "5";
En.noop = "6";
const pi = /* @__PURE__ */ Object.create(null);
Object.keys(En).forEach((e) => {
  pi[En[e]] = e;
});
const Qo = { type: "error", data: "parser error" }, ju = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", Vu = typeof ArrayBuffer == "function", Ku = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e && e.buffer instanceof ArrayBuffer, Oa = ({ type: e, data: t }, n, s) => ju && t instanceof Blob ? n ? s(t) : ac(t, s) : Vu && (t instanceof ArrayBuffer || Ku(t)) ? n ? s(t) : ac(new Blob([t]), s) : s(En[e] + (t || "")), ac = (e, t) => {
  const n = new FileReader();
  return n.onload = function() {
    const s = n.result.split(",")[1];
    t("b" + (s || ""));
  }, n.readAsDataURL(e);
};
function lc(e) {
  return e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let Ro;
function lm(e, t) {
  if (ju && e.data instanceof Blob)
    return e.data.arrayBuffer().then(lc).then(t);
  if (Vu && (e.data instanceof ArrayBuffer || Ku(e.data)))
    return t(lc(e.data));
  Oa(e, !1, (n) => {
    Ro || (Ro = new TextEncoder()), t(Ro.encode(n));
  });
}
const cc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Tr = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < cc.length; e++)
  Tr[cc.charCodeAt(e)] = e;
const cm = (e) => {
  let t = e.length * 0.75, n = e.length, s, r = 0, i, o, a, l;
  e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
  const p = new ArrayBuffer(t), u = new Uint8Array(p);
  for (s = 0; s < n; s += 4)
    i = Tr[e.charCodeAt(s)], o = Tr[e.charCodeAt(s + 1)], a = Tr[e.charCodeAt(s + 2)], l = Tr[e.charCodeAt(s + 3)], u[r++] = i << 2 | o >> 4, u[r++] = (o & 15) << 4 | a >> 2, u[r++] = (a & 3) << 6 | l & 63;
  return p;
}, um = typeof ArrayBuffer == "function", Na = (e, t) => {
  if (typeof e != "string")
    return {
      type: "message",
      data: Gu(e, t)
    };
  const n = e.charAt(0);
  return n === "b" ? {
    type: "message",
    data: fm(e.substring(1), t)
  } : pi[n] ? e.length > 1 ? {
    type: pi[n],
    data: e.substring(1)
  } : {
    type: pi[n]
  } : Qo;
}, fm = (e, t) => {
  if (um) {
    const n = cm(e);
    return Gu(n, t);
  } else
    return { base64: !0, data: e };
}, Gu = (e, t) => {
  switch (t) {
    case "blob":
      return e instanceof Blob ? e : new Blob([e]);
    case "arraybuffer":
    default:
      return e instanceof ArrayBuffer ? e : e.buffer;
  }
}, Yu = "", hm = (e, t) => {
  const n = e.length, s = new Array(n);
  let r = 0;
  e.forEach((i, o) => {
    Oa(i, !1, (a) => {
      s[o] = a, ++r === n && t(s.join(Yu));
    });
  });
}, dm = (e, t) => {
  const n = e.split(Yu), s = [];
  for (let r = 0; r < n.length; r++) {
    const i = Na(n[r], t);
    if (s.push(i), i.type === "error")
      break;
  }
  return s;
};
function pm() {
  return new TransformStream({
    transform(e, t) {
      lm(e, (n) => {
        const s = n.length;
        let r;
        if (s < 126)
          r = new Uint8Array(1), new DataView(r.buffer).setUint8(0, s);
        else if (s < 65536) {
          r = new Uint8Array(3);
          const i = new DataView(r.buffer);
          i.setUint8(0, 126), i.setUint16(1, s);
        } else {
          r = new Uint8Array(9);
          const i = new DataView(r.buffer);
          i.setUint8(0, 127), i.setBigUint64(1, BigInt(s));
        }
        e.data && typeof e.data != "string" && (r[0] |= 128), t.enqueue(r), t.enqueue(n);
      });
    }
  });
}
let Io;
function si(e) {
  return e.reduce((t, n) => t + n.length, 0);
}
function ri(e, t) {
  if (e[0].length === t)
    return e.shift();
  const n = new Uint8Array(t);
  let s = 0;
  for (let r = 0; r < t; r++)
    n[r] = e[0][s++], s === e[0].length && (e.shift(), s = 0);
  return e.length && s < e[0].length && (e[0] = e[0].slice(s)), n;
}
function gm(e, t) {
  Io || (Io = new TextDecoder());
  const n = [];
  let s = 0, r = -1, i = !1;
  return new TransformStream({
    transform(o, a) {
      for (n.push(o); ; ) {
        if (s === 0) {
          if (si(n) < 1)
            break;
          const l = ri(n, 1);
          i = (l[0] & 128) === 128, r = l[0] & 127, r < 126 ? s = 3 : r === 126 ? s = 1 : s = 2;
        } else if (s === 1) {
          if (si(n) < 2)
            break;
          const l = ri(n, 2);
          r = new DataView(l.buffer, l.byteOffset, l.length).getUint16(0), s = 3;
        } else if (s === 2) {
          if (si(n) < 8)
            break;
          const l = ri(n, 8), p = new DataView(l.buffer, l.byteOffset, l.length), u = p.getUint32(0);
          if (u > Math.pow(2, 21) - 1) {
            a.enqueue(Qo);
            break;
          }
          r = u * Math.pow(2, 32) + p.getUint32(4), s = 3;
        } else {
          if (si(n) < r)
            break;
          const l = ri(n, r);
          a.enqueue(Na(i ? l : Io.decode(l), t)), s = 0;
        }
        if (r === 0 || r > e) {
          a.enqueue(Qo);
          break;
        }
      }
    }
  });
}
const Xu = 4;
function mt(e) {
  if (e) return mm(e);
}
function mm(e) {
  for (var t in mt.prototype)
    e[t] = mt.prototype[t];
  return e;
}
mt.prototype.on = mt.prototype.addEventListener = function(e, t) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this;
};
mt.prototype.once = function(e, t) {
  function n() {
    this.off(e, n), t.apply(this, arguments);
  }
  return n.fn = t, this.on(e, n), this;
};
mt.prototype.off = mt.prototype.removeListener = mt.prototype.removeAllListeners = mt.prototype.removeEventListener = function(e, t) {
  if (this._callbacks = this._callbacks || {}, arguments.length == 0)
    return this._callbacks = {}, this;
  var n = this._callbacks["$" + e];
  if (!n) return this;
  if (arguments.length == 1)
    return delete this._callbacks["$" + e], this;
  for (var s, r = 0; r < n.length; r++)
    if (s = n[r], s === t || s.fn === t) {
      n.splice(r, 1);
      break;
    }
  return n.length === 0 && delete this._callbacks["$" + e], this;
};
mt.prototype.emit = function(e) {
  this._callbacks = this._callbacks || {};
  for (var t = new Array(arguments.length - 1), n = this._callbacks["$" + e], s = 1; s < arguments.length; s++)
    t[s - 1] = arguments[s];
  if (n) {
    n = n.slice(0);
    for (var s = 0, r = n.length; s < r; ++s)
      n[s].apply(this, t);
  }
  return this;
};
mt.prototype.emitReserved = mt.prototype.emit;
mt.prototype.listeners = function(e) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || [];
};
mt.prototype.hasListeners = function(e) {
  return !!this.listeners(e).length;
};
const Gi = typeof Promise == "function" && typeof Promise.resolve == "function" ? (t) => Promise.resolve().then(t) : (t, n) => n(t, 0), sn = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), _m = "arraybuffer";
function Zu(e, ...t) {
  return t.reduce((n, s) => (e.hasOwnProperty(s) && (n[s] = e[s]), n), {});
}
const ym = sn.setTimeout, vm = sn.clearTimeout;
function Yi(e, t) {
  t.useNativeTimers ? (e.setTimeoutFn = ym.bind(sn), e.clearTimeoutFn = vm.bind(sn)) : (e.setTimeoutFn = sn.setTimeout.bind(sn), e.clearTimeoutFn = sn.clearTimeout.bind(sn));
}
const bm = 1.33;
function wm(e) {
  return typeof e == "string" ? km(e) : Math.ceil((e.byteLength || e.size) * bm);
}
function km(e) {
  let t = 0, n = 0;
  for (let s = 0, r = e.length; s < r; s++)
    t = e.charCodeAt(s), t < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (s++, n += 4);
  return n;
}
function Ju() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function Tm(e) {
  let t = "";
  for (let n in e)
    e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
  return t;
}
function Am(e) {
  let t = {}, n = e.split("&");
  for (let s = 0, r = n.length; s < r; s++) {
    let i = n[s].split("=");
    t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
  }
  return t;
}
class Sm extends Error {
  constructor(t, n, s) {
    super(t), this.description = n, this.context = s, this.type = "TransportError";
  }
}
class Pa extends mt {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(t) {
    super(), this.writable = !1, Yi(this, t), this.opts = t, this.query = t.query, this.socket = t.socket, this.supportsBinary = !t.forceBase64;
  }
  /**
   * Emits an error.
   *
   * @param {String} reason
   * @param description
   * @param context - the error context
   * @return {Transport} for chaining
   * @protected
   */
  onError(t, n, s) {
    return super.emitReserved("error", new Sm(t, n, s)), this;
  }
  /**
   * Opens the transport.
   */
  open() {
    return this.readyState = "opening", this.doOpen(), this;
  }
  /**
   * Closes the transport.
   */
  close() {
    return (this.readyState === "opening" || this.readyState === "open") && (this.doClose(), this.onClose()), this;
  }
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   */
  send(t) {
    this.readyState === "open" && this.write(t);
  }
  /**
   * Called upon open
   *
   * @protected
   */
  onOpen() {
    this.readyState = "open", this.writable = !0, super.emitReserved("open");
  }
  /**
   * Called with data.
   *
   * @param {String} data
   * @protected
   */
  onData(t) {
    const n = Na(t, this.socket.binaryType);
    this.onPacket(n);
  }
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  onPacket(t) {
    super.emitReserved("packet", t);
  }
  /**
   * Called upon close.
   *
   * @protected
   */
  onClose(t) {
    this.readyState = "closed", super.emitReserved("close", t);
  }
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(t) {
  }
  createUri(t, n = {}) {
    return t + "://" + this._hostname() + this._port() + this.opts.path + this._query(n);
  }
  _hostname() {
    const t = this.opts.hostname;
    return t.indexOf(":") === -1 ? t : "[" + t + "]";
  }
  _port() {
    return this.opts.port && (this.opts.secure && Number(this.opts.port) !== 443 || !this.opts.secure && Number(this.opts.port) !== 80) ? ":" + this.opts.port : "";
  }
  _query(t) {
    const n = Tm(t);
    return n.length ? "?" + n : "";
  }
}
class xm extends Pa {
  constructor() {
    super(...arguments), this._polling = !1;
  }
  get name() {
    return "polling";
  }
  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @protected
   */
  doOpen() {
    this._poll();
  }
  /**
   * Pauses polling.
   *
   * @param {Function} onPause - callback upon buffers are flushed and transport is paused
   * @package
   */
  pause(t) {
    this.readyState = "pausing";
    const n = () => {
      this.readyState = "paused", t();
    };
    if (this._polling || !this.writable) {
      let s = 0;
      this._polling && (s++, this.once("pollComplete", function() {
        --s || n();
      })), this.writable || (s++, this.once("drain", function() {
        --s || n();
      }));
    } else
      n();
  }
  /**
   * Starts polling cycle.
   *
   * @private
   */
  _poll() {
    this._polling = !0, this.doPoll(), this.emitReserved("poll");
  }
  /**
   * Overloads onData to detect payloads.
   *
   * @protected
   */
  onData(t) {
    const n = (s) => {
      if (this.readyState === "opening" && s.type === "open" && this.onOpen(), s.type === "close")
        return this.onClose({ description: "transport closed by the server" }), !1;
      this.onPacket(s);
    };
    dm(t, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
  }
  /**
   * For polling, send a close packet.
   *
   * @protected
   */
  doClose() {
    const t = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? t() : this.once("open", t);
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} packets - data packets
   * @protected
   */
  write(t) {
    this.writable = !1, hm(t, (n) => {
      this.doWrite(n, () => {
        this.writable = !0, this.emitReserved("drain");
      });
    });
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const t = this.opts.secure ? "https" : "http", n = this.query || {};
    return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = Ju()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(t, n);
  }
}
let Qu = !1;
try {
  Qu = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const Em = Qu;
function Cm() {
}
class Rm extends xm {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @package
   */
  constructor(t) {
    if (super(t), typeof location < "u") {
      const n = location.protocol === "https:";
      let s = location.port;
      s || (s = n ? "443" : "80"), this.xd = typeof location < "u" && t.hostname !== location.hostname || s !== t.port;
    }
  }
  /**
   * Sends data.
   *
   * @param {String} data - data to send.
   * @param {Function} fn - called upon flush.
   * @private
   */
  doWrite(t, n) {
    const s = this.request({
      method: "POST",
      data: t
    });
    s.on("success", n), s.on("error", (r, i) => {
      this.onError("xhr post error", r, i);
    });
  }
  /**
   * Starts a poll cycle.
   *
   * @private
   */
  doPoll() {
    const t = this.request();
    t.on("data", this.onData.bind(this)), t.on("error", (n, s) => {
      this.onError("xhr poll error", n, s);
    }), this.pollXhr = t;
  }
}
class Sn extends mt {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(t, n, s) {
    super(), this.createRequest = t, Yi(this, s), this._opts = s, this._method = s.method || "GET", this._uri = n, this._data = s.data !== void 0 ? s.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var t;
    const n = Zu(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    n.xdomain = !!this._opts.xd;
    const s = this._xhr = this.createRequest(n);
    try {
      s.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          s.setDisableHeaderCheck && s.setDisableHeaderCheck(!0);
          for (let r in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(r) && s.setRequestHeader(r, this._opts.extraHeaders[r]);
        }
      } catch {
      }
      if (this._method === "POST")
        try {
          s.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {
        }
      try {
        s.setRequestHeader("Accept", "*/*");
      } catch {
      }
      (t = this._opts.cookieJar) === null || t === void 0 || t.addCookies(s), "withCredentials" in s && (s.withCredentials = this._opts.withCredentials), this._opts.requestTimeout && (s.timeout = this._opts.requestTimeout), s.onreadystatechange = () => {
        var r;
        s.readyState === 3 && ((r = this._opts.cookieJar) === null || r === void 0 || r.parseCookies(
          // @ts-ignore
          s.getResponseHeader("set-cookie")
        )), s.readyState === 4 && (s.status === 200 || s.status === 1223 ? this._onLoad() : this.setTimeoutFn(() => {
          this._onError(typeof s.status == "number" ? s.status : 0);
        }, 0));
      }, s.send(this._data);
    } catch (r) {
      this.setTimeoutFn(() => {
        this._onError(r);
      }, 0);
      return;
    }
    typeof document < "u" && (this._index = Sn.requestsCount++, Sn.requests[this._index] = this);
  }
  /**
   * Called upon error.
   *
   * @private
   */
  _onError(t) {
    this.emitReserved("error", t, this._xhr), this._cleanup(!0);
  }
  /**
   * Cleans up house.
   *
   * @private
   */
  _cleanup(t) {
    if (!(typeof this._xhr > "u" || this._xhr === null)) {
      if (this._xhr.onreadystatechange = Cm, t)
        try {
          this._xhr.abort();
        } catch {
        }
      typeof document < "u" && delete Sn.requests[this._index], this._xhr = null;
    }
  }
  /**
   * Called upon load.
   *
   * @private
   */
  _onLoad() {
    const t = this._xhr.responseText;
    t !== null && (this.emitReserved("data", t), this.emitReserved("success"), this._cleanup());
  }
  /**
   * Aborts the request.
   *
   * @package
   */
  abort() {
    this._cleanup();
  }
}
Sn.requestsCount = 0;
Sn.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", uc);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in sn ? "pagehide" : "unload";
    addEventListener(e, uc, !1);
  }
}
function uc() {
  for (let e in Sn.requests)
    Sn.requests.hasOwnProperty(e) && Sn.requests[e].abort();
}
const Im = function() {
  const e = ef({
    xdomain: !1
  });
  return e && e.responseType !== null;
}();
class Lm extends Rm {
  constructor(t) {
    super(t);
    const n = t && t.forceBase64;
    this.supportsBinary = Im && !n;
  }
  request(t = {}) {
    return Object.assign(t, { xd: this.xd }, this.opts), new Sn(ef, this.uri(), t);
  }
}
function ef(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || Em))
      return new XMLHttpRequest();
  } catch {
  }
  if (!t)
    try {
      return new sn[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const tf = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class Om extends Pa {
  get name() {
    return "websocket";
  }
  doOpen() {
    const t = this.uri(), n = this.opts.protocols, s = tf ? {} : Zu(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    this.opts.extraHeaders && (s.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(t, n, s);
    } catch (r) {
      return this.emitReserved("error", r);
    }
    this.ws.binaryType = this.socket.binaryType, this.addEventListeners();
  }
  /**
   * Adds event listeners to the socket
   *
   * @private
   */
  addEventListeners() {
    this.ws.onopen = () => {
      this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
    }, this.ws.onclose = (t) => this.onClose({
      description: "websocket connection closed",
      context: t
    }), this.ws.onmessage = (t) => this.onData(t.data), this.ws.onerror = (t) => this.onError("websocket error", t);
  }
  write(t) {
    this.writable = !1;
    for (let n = 0; n < t.length; n++) {
      const s = t[n], r = n === t.length - 1;
      Oa(s, this.supportsBinary, (i) => {
        try {
          this.doWrite(s, i);
        } catch {
        }
        r && Gi(() => {
          this.writable = !0, this.emitReserved("drain");
        }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < "u" && (this.ws.onerror = () => {
    }, this.ws.close(), this.ws = null);
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const t = this.opts.secure ? "wss" : "ws", n = this.query || {};
    return this.opts.timestampRequests && (n[this.opts.timestampParam] = Ju()), this.supportsBinary || (n.b64 = 1), this.createUri(t, n);
  }
}
const Lo = sn.WebSocket || sn.MozWebSocket;
class Nm extends Om {
  createSocket(t, n, s) {
    return tf ? new Lo(t, n, s) : n ? new Lo(t, n) : new Lo(t);
  }
  doWrite(t, n) {
    this.ws.send(n);
  }
}
class Pm extends Pa {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
    } catch (t) {
      return this.emitReserved("error", t);
    }
    this._transport.closed.then(() => {
      this.onClose();
    }).catch((t) => {
      this.onError("webtransport error", t);
    }), this._transport.ready.then(() => {
      this._transport.createBidirectionalStream().then((t) => {
        const n = gm(Number.MAX_SAFE_INTEGER, this.socket.binaryType), s = t.readable.pipeThrough(n).getReader(), r = pm();
        r.readable.pipeTo(t.writable), this._writer = r.writable.getWriter();
        const i = () => {
          s.read().then(({ done: a, value: l }) => {
            a || (this.onPacket(l), i());
          }).catch((a) => {
          });
        };
        i();
        const o = { type: "open" };
        this.query.sid && (o.data = `{"sid":"${this.query.sid}"}`), this._writer.write(o).then(() => this.onOpen());
      });
    });
  }
  write(t) {
    this.writable = !1;
    for (let n = 0; n < t.length; n++) {
      const s = t[n], r = n === t.length - 1;
      this._writer.write(s).then(() => {
        r && Gi(() => {
          this.writable = !0, this.emitReserved("drain");
        }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var t;
    (t = this._transport) === null || t === void 0 || t.close();
  }
}
const Dm = {
  websocket: Nm,
  webtransport: Pm,
  polling: Lm
}, Mm = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, Fm = [
  "source",
  "protocol",
  "authority",
  "userInfo",
  "user",
  "password",
  "host",
  "port",
  "relative",
  "path",
  "directory",
  "file",
  "query",
  "anchor"
];
function ea(e) {
  if (e.length > 8e3)
    throw "URI too long";
  const t = e, n = e.indexOf("["), s = e.indexOf("]");
  n != -1 && s != -1 && (e = e.substring(0, n) + e.substring(n, s).replace(/:/g, ";") + e.substring(s, e.length));
  let r = Mm.exec(e || ""), i = {}, o = 14;
  for (; o--; )
    i[Fm[o]] = r[o] || "";
  return n != -1 && s != -1 && (i.source = t, i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"), i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), i.ipv6uri = !0), i.pathNames = $m(i, i.path), i.queryKey = Bm(i, i.query), i;
}
function $m(e, t) {
  const n = /\/{2,9}/g, s = t.replace(n, "/").split("/");
  return (t.slice(0, 1) == "/" || t.length === 0) && s.splice(0, 1), t.slice(-1) == "/" && s.splice(s.length - 1, 1), s;
}
function Bm(e, t) {
  const n = {};
  return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, r, i) {
    r && (n[r] = i);
  }), n;
}
const ta = typeof addEventListener == "function" && typeof removeEventListener == "function", gi = [];
ta && addEventListener("offline", () => {
  gi.forEach((e) => e());
}, !1);
class Xn extends mt {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(t, n) {
    if (super(), this.binaryType = _m, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, t && typeof t == "object" && (n = t, t = null), t) {
      const s = ea(t);
      n.hostname = s.host, n.secure = s.protocol === "https" || s.protocol === "wss", n.port = s.port, s.query && (n.query = s.query);
    } else n.host && (n.hostname = ea(n.host).host);
    Yi(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((s) => {
      const r = s.prototype.name;
      this.transports.push(r), this._transportsByName[r] = s;
    }), this.opts = Object.assign({
      path: "/engine.io",
      agent: !1,
      withCredentials: !1,
      upgrade: !0,
      timestampParam: "t",
      rememberUpgrade: !1,
      addTrailingSlash: !0,
      rejectUnauthorized: !0,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: !1
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = Am(this.opts.query)), ta && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, gi.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  createTransport(t) {
    const n = Object.assign({}, this.opts.query);
    n.EIO = Xu, n.transport = t, this.id && (n.sid = this.id);
    const s = Object.assign({}, this.opts, {
      query: n,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[t]);
    return new this._transportsByName[t](s);
  }
  /**
   * Initializes transport to use and starts probe.
   *
   * @private
   */
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    }
    const t = this.opts.rememberUpgrade && Xn.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
    this.readyState = "opening";
    const n = this.createTransport(t);
    n.open(), this.setTransport(n);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  setTransport(t) {
    this.transport && this.transport.removeAllListeners(), this.transport = t, t.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (n) => this._onClose("transport close", n));
  }
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  onOpen() {
    this.readyState = "open", Xn.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
  }
  /**
   * Handles a packet.
   *
   * @private
   */
  _onPacket(t) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing")
      switch (this.emitReserved("packet", t), this.emitReserved("heartbeat"), t.type) {
        case "open":
          this.onHandshake(JSON.parse(t.data));
          break;
        case "ping":
          this._sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong"), this._resetPingTimeout();
          break;
        case "error":
          const n = new Error("server error");
          n.code = t.data, this._onError(n);
          break;
        case "message":
          this.emitReserved("data", t.data), this.emitReserved("message", t.data);
          break;
      }
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  onHandshake(t) {
    this.emitReserved("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this._pingInterval = t.pingInterval, this._pingTimeout = t.pingTimeout, this._maxPayload = t.maxPayload, this.onOpen(), this.readyState !== "closed" && this._resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const t = this._pingInterval + this._pingTimeout;
    this._pingTimeoutTime = Date.now() + t, this._pingTimeoutTimer = this.setTimeoutFn(() => {
      this._onClose("ping timeout");
    }, t), this.opts.autoUnref && this._pingTimeoutTimer.unref();
  }
  /**
   * Called on `drain` event
   *
   * @private
   */
  _onDrain() {
    this.writeBuffer.splice(0, this._prevBufferLen), this._prevBufferLen = 0, this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush();
  }
  /**
   * Flush write buffers.
   *
   * @private
   */
  flush() {
    if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const t = this._getWritablePackets();
      this.transport.send(t), this._prevBufferLen = t.length, this.emitReserved("flush");
    }
  }
  /**
   * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
   * long-polling)
   *
   * @private
   */
  _getWritablePackets() {
    if (!(this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1))
      return this.writeBuffer;
    let n = 1;
    for (let s = 0; s < this.writeBuffer.length; s++) {
      const r = this.writeBuffer[s].data;
      if (r && (n += wm(r)), s > 0 && n > this._maxPayload)
        return this.writeBuffer.slice(0, s);
      n += 2;
    }
    return this.writeBuffer;
  }
  /**
   * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
   *
   * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
   * `write()` method then the message would not be buffered by the Socket.IO client.
   *
   * @return {boolean}
   * @private
   */
  /* private */
  _hasPingExpired() {
    if (!this._pingTimeoutTime)
      return !0;
    const t = Date.now() > this._pingTimeoutTime;
    return t && (this._pingTimeoutTime = 0, Gi(() => {
      this._onClose("ping timeout");
    }, this.setTimeoutFn)), t;
  }
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  write(t, n, s) {
    return this._sendPacket("message", t, n, s), this;
  }
  /**
   * Sends a message. Alias of {@link Socket#write}.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  send(t, n, s) {
    return this._sendPacket("message", t, n, s), this;
  }
  /**
   * Sends a packet.
   *
   * @param {String} type - packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @private
   */
  _sendPacket(t, n, s, r) {
    if (typeof n == "function" && (r = n, n = void 0), typeof s == "function" && (r = s, s = null), this.readyState === "closing" || this.readyState === "closed")
      return;
    s = s || {}, s.compress = s.compress !== !1;
    const i = {
      type: t,
      data: n,
      options: s
    };
    this.emitReserved("packetCreate", i), this.writeBuffer.push(i), r && this.once("flush", r), this.flush();
  }
  /**
   * Closes the connection.
   */
  close() {
    const t = () => {
      this._onClose("forced close"), this.transport.close();
    }, n = () => {
      this.off("upgrade", n), this.off("upgradeError", n), t();
    }, s = () => {
      this.once("upgrade", n), this.once("upgradeError", n);
    };
    return (this.readyState === "opening" || this.readyState === "open") && (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", () => {
      this.upgrading ? s() : t();
    }) : this.upgrading ? s() : t()), this;
  }
  /**
   * Called upon transport error
   *
   * @private
   */
  _onError(t) {
    if (Xn.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
      return this.transports.shift(), this._open();
    this.emitReserved("error", t), this._onClose("transport error", t);
  }
  /**
   * Called upon transport close.
   *
   * @private
   */
  _onClose(t, n) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), ta && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const s = gi.indexOf(this._offlineEventListener);
        s !== -1 && gi.splice(s, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", t, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
Xn.protocol = Xu;
class Um extends Xn {
  constructor() {
    super(...arguments), this._upgrades = [];
  }
  onOpen() {
    if (super.onOpen(), this.readyState === "open" && this.opts.upgrade)
      for (let t = 0; t < this._upgrades.length; t++)
        this._probe(this._upgrades[t]);
  }
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  _probe(t) {
    let n = this.createTransport(t), s = !1;
    Xn.priorWebsocketSuccess = !1;
    const r = () => {
      s || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (b) => {
        if (!s)
          if (b.type === "pong" && b.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", n), !n)
              return;
            Xn.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
              s || this.readyState !== "closed" && (u(), this.setTransport(n), n.send([{ type: "upgrade" }]), this.emitReserved("upgrade", n), n = null, this.upgrading = !1, this.flush());
            });
          } else {
            const w = new Error("probe error");
            w.transport = n.name, this.emitReserved("upgradeError", w);
          }
      }));
    };
    function i() {
      s || (s = !0, u(), n.close(), n = null);
    }
    const o = (b) => {
      const w = new Error("probe error: " + b);
      w.transport = n.name, i(), this.emitReserved("upgradeError", w);
    };
    function a() {
      o("transport closed");
    }
    function l() {
      o("socket closed");
    }
    function p(b) {
      n && b.name !== n.name && i();
    }
    const u = () => {
      n.removeListener("open", r), n.removeListener("error", o), n.removeListener("close", a), this.off("close", l), this.off("upgrading", p);
    };
    n.once("open", r), n.once("error", o), n.once("close", a), this.once("close", l), this.once("upgrading", p), this._upgrades.indexOf("webtransport") !== -1 && t !== "webtransport" ? this.setTimeoutFn(() => {
      s || n.open();
    }, 200) : n.open();
  }
  onHandshake(t) {
    this._upgrades = this._filterUpgrades(t.upgrades), super.onHandshake(t);
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  _filterUpgrades(t) {
    const n = [];
    for (let s = 0; s < t.length; s++)
      ~this.transports.indexOf(t[s]) && n.push(t[s]);
    return n;
  }
}
let zm = class extends Um {
  constructor(t, n = {}) {
    const s = typeof t == "object", r = s ? { ...t } : { ...n };
    (!r.transports || r.transports && typeof r.transports[0] == "string") && (r.transports = (r.transports || ["polling", "websocket", "webtransport"]).map((i) => Dm[i]).filter((i) => !!i)), super(s ? r : t, r);
  }
};
function Hm(e, t = "", n) {
  let s = e;
  n = n || typeof location < "u" && location, e == null && (e = n.protocol + "//" + n.host), typeof e == "string" && (e.charAt(0) === "/" && (e.charAt(1) === "/" ? e = n.protocol + e : e = n.host + e), /^(https?|wss?):\/\//.test(e) || (typeof n < "u" ? e = n.protocol + "//" + e : e = "https://" + e), s = ea(e)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
  const i = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return s.id = s.protocol + "://" + i + ":" + s.port + t, s.href = s.protocol + "://" + i + (n && n.port === s.port ? "" : ":" + s.port), s;
}
const Wm = typeof ArrayBuffer == "function", qm = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer, nf = Object.prototype.toString, jm = typeof Blob == "function" || typeof Blob < "u" && nf.call(Blob) === "[object BlobConstructor]", Vm = typeof File == "function" || typeof File < "u" && nf.call(File) === "[object FileConstructor]";
function Da(e) {
  return Wm && (e instanceof ArrayBuffer || qm(e)) || jm && e instanceof Blob || Vm && e instanceof File;
}
function mi(e, t) {
  if (!e || typeof e != "object")
    return !1;
  if (Array.isArray(e)) {
    for (let n = 0, s = e.length; n < s; n++)
      if (mi(e[n]))
        return !0;
    return !1;
  }
  if (Da(e))
    return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return mi(e.toJSON(), !0);
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && mi(e[n]))
      return !0;
  return !1;
}
function Km(e) {
  const t = [], n = e.data, s = e;
  return s.data = _i(n, t), s.attachments = t.length, { packet: s, buffers: t };
}
function _i(e, t, n) {
  if (!e)
    return e;
  if (Da(e)) {
    const s = { _placeholder: !0, num: t.length };
    return t.push(e), s;
  } else if (Array.isArray(e)) {
    const s = new Array(e.length);
    for (let r = 0; r < e.length; r++)
      s[r] = _i(e[r], t);
    return s;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    if (e.toJSON && typeof e.toJSON == "function" && !n)
      return _i(e.toJSON(), t, !0);
    const s = {};
    for (const r in e)
      Object.prototype.hasOwnProperty.call(e, r) && (s[r] = _i(e[r], t));
    return s;
  }
  return e;
}
function Gm(e, t) {
  return e.data = na(e.data, t), delete e.attachments, e;
}
function na(e, t) {
  if (!e)
    return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == "number" && e.num >= 0 && e.num < t.length)
      return t[e.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(e))
    for (let n = 0; n < e.length; n++)
      e[n] = na(e[n], t);
  else if (typeof e == "object")
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (e[n] = na(e[n], t));
  return e;
}
const Ym = [
  "connect",
  // used on the client side
  "connect_error",
  // used on the client side
  "disconnect",
  // used on both sides
  "disconnecting",
  // used on the server side
  "newListener",
  // used by the Node.js EventEmitter
  "removeListener"
  // used by the Node.js EventEmitter
];
var Ne;
(function(e) {
  e[e.CONNECT = 0] = "CONNECT", e[e.DISCONNECT = 1] = "DISCONNECT", e[e.EVENT = 2] = "EVENT", e[e.ACK = 3] = "ACK", e[e.CONNECT_ERROR = 4] = "CONNECT_ERROR", e[e.BINARY_EVENT = 5] = "BINARY_EVENT", e[e.BINARY_ACK = 6] = "BINARY_ACK";
})(Ne || (Ne = {}));
class Xm {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(t) {
    this.replacer = t;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(t) {
    return (t.type === Ne.EVENT || t.type === Ne.ACK) && mi(t) ? this.encodeAsBinary({
      type: t.type === Ne.EVENT ? Ne.BINARY_EVENT : Ne.BINARY_ACK,
      nsp: t.nsp,
      data: t.data,
      id: t.id
    }) : [this.encodeAsString(t)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(t) {
    let n = "" + t.type;
    return (t.type === Ne.BINARY_EVENT || t.type === Ne.BINARY_ACK) && (n += t.attachments + "-"), t.nsp && t.nsp !== "/" && (n += t.nsp + ","), t.id != null && (n += t.id), t.data != null && (n += JSON.stringify(t.data, this.replacer)), n;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(t) {
    const n = Km(t), s = this.encodeAsString(n.packet), r = n.buffers;
    return r.unshift(s), r;
  }
}
class Ma extends mt {
  /**
   * Decoder constructor
   */
  constructor(t) {
    super(), this.opts = Object.assign({
      reviver: void 0,
      maxAttachments: 10
    }, typeof t == "function" ? { reviver: t } : t);
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(t) {
    let n;
    if (typeof t == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      n = this.decodeString(t);
      const s = n.type === Ne.BINARY_EVENT;
      s || n.type === Ne.BINARY_ACK ? (n.type = s ? Ne.EVENT : Ne.ACK, this.reconstructor = new Zm(n)) : super.emitReserved("decoded", n);
    } else if (Da(t) || t.base64)
      if (this.reconstructor)
        n = this.reconstructor.takeBinaryData(t), n && (this.reconstructor = null, super.emitReserved("decoded", n));
      else
        throw new Error("got binary data when not reconstructing a packet");
    else
      throw new Error("Unknown type: " + t);
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(t) {
    let n = 0;
    const s = {
      type: Number(t.charAt(0))
    };
    if (Ne[s.type] === void 0)
      throw new Error("unknown packet type " + s.type);
    if (s.type === Ne.BINARY_EVENT || s.type === Ne.BINARY_ACK) {
      const i = n + 1;
      for (; t.charAt(++n) !== "-" && n != t.length; )
        ;
      const o = t.substring(i, n);
      if (o != Number(o) || t.charAt(n) !== "-")
        throw new Error("Illegal attachments");
      const a = Number(o);
      if (!Jm(a) || a < 1)
        throw new Error("Illegal attachments");
      if (a > this.opts.maxAttachments)
        throw new Error("too many attachments");
      s.attachments = a;
    }
    if (t.charAt(n + 1) === "/") {
      const i = n + 1;
      for (; ++n && !(t.charAt(n) === "," || n === t.length); )
        ;
      s.nsp = t.substring(i, n);
    } else
      s.nsp = "/";
    const r = t.charAt(n + 1);
    if (r !== "" && Number(r) == r) {
      const i = n + 1;
      for (; ++n; ) {
        const o = t.charAt(n);
        if (o == null || Number(o) != o) {
          --n;
          break;
        }
        if (n === t.length)
          break;
      }
      s.id = Number(t.substring(i, n + 1));
    }
    if (t.charAt(++n)) {
      const i = this.tryParse(t.substr(n));
      if (Ma.isPayloadValid(s.type, i))
        s.data = i;
      else
        throw new Error("invalid payload");
    }
    return s;
  }
  tryParse(t) {
    try {
      return JSON.parse(t, this.opts.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(t, n) {
    switch (t) {
      case Ne.CONNECT:
        return fc(n);
      case Ne.DISCONNECT:
        return n === void 0;
      case Ne.CONNECT_ERROR:
        return typeof n == "string" || fc(n);
      case Ne.EVENT:
      case Ne.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && Ym.indexOf(n[0]) === -1);
      case Ne.ACK:
      case Ne.BINARY_ACK:
        return Array.isArray(n);
    }
  }
  /**
   * Deallocates a parser's resources
   */
  destroy() {
    this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null);
  }
}
class Zm {
  constructor(t) {
    this.packet = t, this.buffers = [], this.reconPack = t;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(t) {
    if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
      const n = Gm(this.reconPack, this.buffers);
      return this.finishedReconstruction(), n;
    }
    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */
  finishedReconstruction() {
    this.reconPack = null, this.buffers = [];
  }
}
const Jm = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
};
function fc(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
const Qm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Ma,
  Encoder: Xm,
  get PacketType() {
    return Ne;
  }
}, Symbol.toStringTag, { value: "Module" }));
function fn(e, t, n) {
  return e.on(t, n), function() {
    e.off(t, n);
  };
}
const e_ = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class sf extends mt {
  /**
   * `Socket` constructor.
   */
  constructor(t, n, s) {
    super(), this.connected = !1, this.recovered = !1, this.receiveBuffer = [], this.sendBuffer = [], this._queue = [], this._queueSeq = 0, this.ids = 0, this.acks = {}, this.flags = {}, this.io = t, this.nsp = n, s && s.auth && (this.auth = s.auth), this._opts = Object.assign({}, s), this.io._autoConnect && this.open();
  }
  /**
   * Whether the socket is currently disconnected
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log(socket.disconnected); // false
   * });
   *
   * socket.on("disconnect", () => {
   *   console.log(socket.disconnected); // true
   * });
   */
  get disconnected() {
    return !this.connected;
  }
  /**
   * Subscribe to open, close and packet events
   *
   * @private
   */
  subEvents() {
    if (this.subs)
      return;
    const t = this.io;
    this.subs = [
      fn(t, "open", this.onopen.bind(this)),
      fn(t, "packet", this.onpacket.bind(this)),
      fn(t, "error", this.onerror.bind(this)),
      fn(t, "close", this.onclose.bind(this))
    ];
  }
  /**
   * Whether the Socket will try to reconnect when its Manager connects or reconnects.
   *
   * @example
   * const socket = io();
   *
   * console.log(socket.active); // true
   *
   * socket.on("disconnect", (reason) => {
   *   if (reason === "io server disconnect") {
   *     // the disconnection was initiated by the server, you need to manually reconnect
   *     console.log(socket.active); // false
   *   }
   *   // else the socket will automatically try to reconnect
   *   console.log(socket.active); // true
   * });
   */
  get active() {
    return !!this.subs;
  }
  /**
   * "Opens" the socket.
   *
   * @example
   * const socket = io({
   *   autoConnect: false
   * });
   *
   * socket.connect();
   */
  connect() {
    return this.connected ? this : (this.subEvents(), this.io._reconnecting || this.io.open(), this.io._readyState === "open" && this.onopen(), this);
  }
  /**
   * Alias for {@link connect()}.
   */
  open() {
    return this.connect();
  }
  /**
   * Sends a `message` event.
   *
   * This method mimics the WebSocket.send() method.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   *
   * @example
   * socket.send("hello");
   *
   * // this is equivalent to
   * socket.emit("message", "hello");
   *
   * @return self
   */
  send(...t) {
    return t.unshift("message"), this.emit.apply(this, t), this;
  }
  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @example
   * socket.emit("hello", "world");
   *
   * // all serializable datastructures are supported (no need to call JSON.stringify)
   * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
   *
   * // with an acknowledgement from the server
   * socket.emit("hello", "world", (val) => {
   *   // ...
   * });
   *
   * @return self
   */
  emit(t, ...n) {
    var s, r, i;
    if (e_.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (n.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const o = {
      type: Ne.EVENT,
      data: n
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
      const u = this.ids++, b = n.pop();
      this._registerAckCallback(u, b), o.id = u;
    }
    const a = (r = (s = this.io.engine) === null || s === void 0 ? void 0 : s.transport) === null || r === void 0 ? void 0 : r.writable, l = this.connected && !(!((i = this.io.engine) === null || i === void 0) && i._hasPingExpired());
    return this.flags.volatile && !a || (l ? (this.notifyOutgoingListeners(o), this.packet(o)) : this.sendBuffer.push(o)), this.flags = {}, this;
  }
  /**
   * @private
   */
  _registerAckCallback(t, n) {
    var s;
    const r = (s = this.flags.timeout) !== null && s !== void 0 ? s : this._opts.ackTimeout;
    if (r === void 0) {
      this.acks[t] = n;
      return;
    }
    const i = this.io.setTimeoutFn(() => {
      delete this.acks[t];
      for (let a = 0; a < this.sendBuffer.length; a++)
        this.sendBuffer[a].id === t && this.sendBuffer.splice(a, 1);
      n.call(this, new Error("operation has timed out"));
    }, r), o = (...a) => {
      this.io.clearTimeoutFn(i), n.apply(this, a);
    };
    o.withError = !0, this.acks[t] = o;
  }
  /**
   * Emits an event and waits for an acknowledgement
   *
   * @example
   * // without timeout
   * const response = await socket.emitWithAck("hello", "world");
   *
   * // with a specific timeout
   * try {
   *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
   * } catch (err) {
   *   // the server did not acknowledge the event in the given delay
   * }
   *
   * @return a Promise that will be fulfilled when the server acknowledges the event
   */
  emitWithAck(t, ...n) {
    return new Promise((s, r) => {
      const i = (o, a) => o ? r(o) : s(a);
      i.withError = !0, n.push(i), this.emit(t, ...n);
    });
  }
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  _addToQueue(t) {
    let n;
    typeof t[t.length - 1] == "function" && (n = t.pop());
    const s = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: t,
      flags: Object.assign({ fromQueue: !0 }, this.flags)
    };
    t.push((r, ...i) => (this._queue[0], r !== null ? s.tryCount > this._opts.retries && (this._queue.shift(), n && n(r)) : (this._queue.shift(), n && n(null, ...i)), s.pending = !1, this._drainQueue())), this._queue.push(s), this._drainQueue();
  }
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  _drainQueue(t = !1) {
    if (!this.connected || this._queue.length === 0)
      return;
    const n = this._queue[0];
    n.pending && !t || (n.pending = !0, n.tryCount++, this.flags = n.flags, this.emit.apply(this, n.args));
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  packet(t) {
    t.nsp = this.nsp, this.io._packet(t);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  onopen() {
    typeof this.auth == "function" ? this.auth((t) => {
      this._sendConnectPacket(t);
    }) : this._sendConnectPacket(this.auth);
  }
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  _sendConnectPacket(t) {
    this.packet({
      type: Ne.CONNECT,
      data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t) : t
    });
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  onerror(t) {
    this.connected || this.emitReserved("connect_error", t);
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(t, n) {
    this.connected = !1, delete this.id, this.emitReserved("disconnect", t, n), this._clearAcks();
  }
  /**
   * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
   * the server.
   *
   * @private
   */
  _clearAcks() {
    Object.keys(this.acks).forEach((t) => {
      if (!this.sendBuffer.some((s) => String(s.id) === t)) {
        const s = this.acks[t];
        delete this.acks[t], s.withError && s.call(this, new Error("socket has been disconnected"));
      }
    });
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  onpacket(t) {
    if (t.nsp === this.nsp)
      switch (t.type) {
        case Ne.CONNECT:
          t.data && t.data.sid ? this.onconnect(t.data.sid, t.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case Ne.EVENT:
        case Ne.BINARY_EVENT:
          this.onevent(t);
          break;
        case Ne.ACK:
        case Ne.BINARY_ACK:
          this.onack(t);
          break;
        case Ne.DISCONNECT:
          this.ondisconnect();
          break;
        case Ne.CONNECT_ERROR:
          this.destroy();
          const s = new Error(t.data.message);
          s.data = t.data.data, this.emitReserved("connect_error", s);
          break;
      }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  onevent(t) {
    const n = t.data || [];
    t.id != null && n.push(this.ack(t.id)), this.connected ? this.emitEvent(n) : this.receiveBuffer.push(Object.freeze(n));
  }
  emitEvent(t) {
    if (this._anyListeners && this._anyListeners.length) {
      const n = this._anyListeners.slice();
      for (const s of n)
        s.apply(this, t);
    }
    super.emit.apply(this, t), this._pid && t.length && typeof t[t.length - 1] == "string" && (this._lastOffset = t[t.length - 1]);
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  ack(t) {
    const n = this;
    let s = !1;
    return function(...r) {
      s || (s = !0, n.packet({
        type: Ne.ACK,
        id: t,
        data: r
      }));
    };
  }
  /**
   * Called upon a server acknowledgement.
   *
   * @param packet
   * @private
   */
  onack(t) {
    const n = this.acks[t.id];
    typeof n == "function" && (delete this.acks[t.id], n.withError && t.data.unshift(null), n.apply(this, t.data));
  }
  /**
   * Called upon server connect.
   *
   * @private
   */
  onconnect(t, n) {
    this.id = t, this.recovered = n && this._pid === n, this._pid = n, this.connected = !0, this.emitBuffered(), this._drainQueue(!0), this.emitReserved("connect");
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  emitBuffered() {
    this.receiveBuffer.forEach((t) => this.emitEvent(t)), this.receiveBuffer = [], this.sendBuffer.forEach((t) => {
      this.notifyOutgoingListeners(t), this.packet(t);
    }), this.sendBuffer = [];
  }
  /**
   * Called upon server disconnect.
   *
   * @private
   */
  ondisconnect() {
    this.destroy(), this.onclose("io server disconnect");
  }
  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @private
   */
  destroy() {
    this.subs && (this.subs.forEach((t) => t()), this.subs = void 0), this.io._destroy(this);
  }
  /**
   * Disconnects the socket manually. In that case, the socket will not try to reconnect.
   *
   * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
   *
   * @example
   * const socket = io();
   *
   * socket.on("disconnect", (reason) => {
   *   // console.log(reason); prints "io client disconnect"
   * });
   *
   * socket.disconnect();
   *
   * @return self
   */
  disconnect() {
    return this.connected && this.packet({ type: Ne.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
  }
  /**
   * Alias for {@link disconnect()}.
   *
   * @return self
   */
  close() {
    return this.disconnect();
  }
  /**
   * Sets the compress flag.
   *
   * @example
   * socket.compress(false).emit("hello");
   *
   * @param compress - if `true`, compresses the sending data
   * @return self
   */
  compress(t) {
    return this.flags.compress = t, this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
   * ready to send messages.
   *
   * @example
   * socket.volatile.emit("hello"); // the server may or may not receive it
   *
   * @returns self
   */
  get volatile() {
    return this.flags.volatile = !0, this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the server:
   *
   * @example
   * socket.timeout(5000).emit("my-event", (err) => {
   *   if (err) {
   *     // the server did not acknowledge the event in the given delay
   *   }
   * });
   *
   * @returns self
   */
  timeout(t) {
    return this.flags.timeout = t, this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * @example
   * socket.onAny((event, ...args) => {
   *   console.log(`got ${event}`);
   * });
   *
   * @param listener
   */
  onAny(t) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.push(t), this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @example
   * socket.prependAny((event, ...args) => {
   *   console.log(`got event ${event}`);
   * });
   *
   * @param listener
   */
  prependAny(t) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(t), this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`got event ${event}`);
   * }
   *
   * socket.onAny(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAny(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAny();
   *
   * @param listener
   */
  offAny(t) {
    if (!this._anyListeners)
      return this;
    if (t) {
      const n = this._anyListeners;
      for (let s = 0; s < n.length; s++)
        if (t === n[s])
          return n.splice(s, 1), this;
    } else
      this._anyListeners = [];
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAny() {
    return this._anyListeners || [];
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.onAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  onAnyOutgoing(t) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(t), this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.prependAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  prependAnyOutgoing(t) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(t), this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`sent event ${event}`);
   * }
   *
   * socket.onAnyOutgoing(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAnyOutgoing(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAnyOutgoing();
   *
   * @param [listener] - the catch-all listener (optional)
   */
  offAnyOutgoing(t) {
    if (!this._anyOutgoingListeners)
      return this;
    if (t) {
      const n = this._anyOutgoingListeners;
      for (let s = 0; s < n.length; s++)
        if (t === n[s])
          return n.splice(s, 1), this;
    } else
      this._anyOutgoingListeners = [];
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  /**
   * Notify the listeners for each packet sent
   *
   * @param packet
   *
   * @private
   */
  notifyOutgoingListeners(t) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const n = this._anyOutgoingListeners.slice();
      for (const s of n)
        s.apply(this, t.data);
    }
  }
}
function Gs(e) {
  e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;
}
Gs.prototype.duration = function() {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(), n = Math.floor(t * this.jitter * e);
    e = (Math.floor(t * 10) & 1) == 0 ? e - n : e + n;
  }
  return Math.min(e, this.max) | 0;
};
Gs.prototype.reset = function() {
  this.attempts = 0;
};
Gs.prototype.setMin = function(e) {
  this.ms = e;
};
Gs.prototype.setMax = function(e) {
  this.max = e;
};
Gs.prototype.setJitter = function(e) {
  this.jitter = e;
};
class sa extends mt {
  constructor(t, n) {
    var s;
    super(), this.nsps = {}, this.subs = [], t && typeof t == "object" && (n = t, t = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, Yi(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5), this.backoff = new Gs({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = t;
    const r = n.parser || Qm;
    this.encoder = new r.Encoder(), this.decoder = new r.Decoder(), this._autoConnect = n.autoConnect !== !1, this._autoConnect && this.open();
  }
  reconnection(t) {
    return arguments.length ? (this._reconnection = !!t, t || (this.skipReconnect = !0), this) : this._reconnection;
  }
  reconnectionAttempts(t) {
    return t === void 0 ? this._reconnectionAttempts : (this._reconnectionAttempts = t, this);
  }
  reconnectionDelay(t) {
    var n;
    return t === void 0 ? this._reconnectionDelay : (this._reconnectionDelay = t, (n = this.backoff) === null || n === void 0 || n.setMin(t), this);
  }
  randomizationFactor(t) {
    var n;
    return t === void 0 ? this._randomizationFactor : (this._randomizationFactor = t, (n = this.backoff) === null || n === void 0 || n.setJitter(t), this);
  }
  reconnectionDelayMax(t) {
    var n;
    return t === void 0 ? this._reconnectionDelayMax : (this._reconnectionDelayMax = t, (n = this.backoff) === null || n === void 0 || n.setMax(t), this);
  }
  timeout(t) {
    return arguments.length ? (this._timeout = t, this) : this._timeout;
  }
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @private
   */
  maybeReconnectOnOpen() {
    !this._reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect();
  }
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} fn - optional, callback
   * @return self
   * @public
   */
  open(t) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new zm(this.uri, this.opts);
    const n = this.engine, s = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const r = fn(n, "open", function() {
      s.onopen(), t && t();
    }), i = (a) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", a), t ? t(a) : this.maybeReconnectOnOpen();
    }, o = fn(n, "error", i);
    if (this._timeout !== !1) {
      const a = this._timeout, l = this.setTimeoutFn(() => {
        r(), i(new Error("timeout")), n.close();
      }, a);
      this.opts.autoUnref && l.unref(), this.subs.push(() => {
        this.clearTimeoutFn(l);
      });
    }
    return this.subs.push(r), this.subs.push(o), this;
  }
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */
  connect(t) {
    return this.open(t);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */
  onopen() {
    this.cleanup(), this._readyState = "open", this.emitReserved("open");
    const t = this.engine;
    this.subs.push(
      fn(t, "ping", this.onping.bind(this)),
      fn(t, "data", this.ondata.bind(this)),
      fn(t, "error", this.onerror.bind(this)),
      fn(t, "close", this.onclose.bind(this)),
      // @ts-ignore
      fn(this.decoder, "decoded", this.ondecoded.bind(this))
    );
  }
  /**
   * Called upon a ping.
   *
   * @private
   */
  onping() {
    this.emitReserved("ping");
  }
  /**
   * Called with data.
   *
   * @private
   */
  ondata(t) {
    try {
      this.decoder.add(t);
    } catch (n) {
      this.onclose("parse error", n);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(t) {
    Gi(() => {
      this.emitReserved("packet", t);
    }, this.setTimeoutFn);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */
  onerror(t) {
    this.emitReserved("error", t);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(t, n) {
    let s = this.nsps[t];
    return s ? this._autoConnect && !s.active && s.connect() : (s = new sf(this, t, n), this.nsps[t] = s), s;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(t) {
    const n = Object.keys(this.nsps);
    for (const s of n)
      if (this.nsps[s].active)
        return;
    this._close();
  }
  /**
   * Writes a packet.
   *
   * @param packet
   * @private
   */
  _packet(t) {
    const n = this.encoder.encode(t);
    for (let s = 0; s < n.length; s++)
      this.engine.write(n[s], t.options);
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  cleanup() {
    this.subs.forEach((t) => t()), this.subs.length = 0, this.decoder.destroy();
  }
  /**
   * Close the current socket.
   *
   * @private
   */
  _close() {
    this.skipReconnect = !0, this._reconnecting = !1, this.onclose("forced close");
  }
  /**
   * Alias for close()
   *
   * @private
   */
  disconnect() {
    return this._close();
  }
  /**
   * Called when:
   *
   * - the low-level engine is closed
   * - the parser encountered a badly formatted packet
   * - all sockets are disconnected
   *
   * @private
   */
  onclose(t, n) {
    var s;
    this.cleanup(), (s = this.engine) === null || s === void 0 || s.close(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", t, n), this._reconnection && !this.skipReconnect && this.reconnect();
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const t = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;
    else {
      const n = this.backoff.duration();
      this._reconnecting = !0;
      const s = this.setTimeoutFn(() => {
        t.skipReconnect || (this.emitReserved("reconnect_attempt", t.backoff.attempts), !t.skipReconnect && t.open((r) => {
          r ? (t._reconnecting = !1, t.reconnect(), this.emitReserved("reconnect_error", r)) : t.onreconnect();
        }));
      }, n);
      this.opts.autoUnref && s.unref(), this.subs.push(() => {
        this.clearTimeoutFn(s);
      });
    }
  }
  /**
   * Called upon successful reconnect.
   *
   * @private
   */
  onreconnect() {
    const t = this.backoff.attempts;
    this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", t);
  }
}
const vr = {};
function yi(e, t) {
  typeof e == "object" && (t = e, e = void 0), t = t || {};
  const n = Hm(e, t.path || "/socket.io"), s = n.source, r = n.id, i = n.path, o = vr[r] && i in vr[r].nsps, a = t.forceNew || t["force new connection"] || t.multiplex === !1 || o;
  let l;
  return a ? l = new sa(s, t) : (vr[r] || (vr[r] = new sa(s, t)), l = vr[r]), n.query && !t.query && (t.query = n.queryKey), l.socket(n.path, t);
}
Object.assign(yi, {
  Manager: sa,
  Socket: sf,
  io: yi,
  connect: yi
});
const t_ = 5e3;
function n_() {
  const e = ue([]), t = ue(!1), n = ue(""), s = ue(!1), r = ue(!1), i = ue(!1), o = ue("connecting"), a = ue(0), l = 5, p = ue({}), u = ue(null), b = ue("");
  let w = null;
  const U = 6e4, $ = () => {
    t.value = !1, w && (clearTimeout(w), w = null);
  }, V = () => {
    t.value = !0, w && clearTimeout(w), w = setTimeout($, U);
  };
  let D = null;
  const te = 1e3, fe = 15e3;
  let de = null;
  const x = /* @__PURE__ */ new Set(["ai_config_missing", ...wu]);
  let O = !1;
  const Y = ue(null), X = () => {
    de && (clearTimeout(de), de = null);
  }, xe = () => {
    if (de || O) return;
    const P = Math.min(
      te * 2 ** Math.max(0, a.value - 1),
      fe
    );
    de = setTimeout(() => {
      de = null, D == null || D.connect();
    }, P);
  };
  let Le = null, we = null, De = null, Te = null, je = null, Fe = !1, Ze = null, he, ye, me;
  const Je = (P) => {
    var I;
    return (I = di(P ?? null)) == null ? void 0 : I.sub;
  }, Qe = (P) => {
    he = P, P && D != null && D.connected && D.emit("refresh_token", { conversation_token: P });
  }, st = (P) => {
    ye = P;
  }, Ee = () => {
    var Q;
    const P = he || (Jo() ? null : Ni().read()), I = {};
    P && (I.conversation_token = P), ye && (I.widget_id = ye);
    try {
      I.page_url = Qg() || (window.parent !== window && ((Q = window.parent.location) != null && Q.href) ? window.parent.location.href : document.referrer || window.location.href);
    } catch {
      I.page_url = document.referrer || "";
    }
    return I;
  }, Pt = (P) => (D = yi(`${Ts.WS_URL}/widget`, {
    transports: ["websocket"],
    reconnection: !0,
    // Keep trying. The old cap of 5 attempts was ~15s of backoff, so a
    // backend restart or a laptop waking from sleep left the widget dead
    // until the visitor reloaded the page.
    reconnectionAttempts: 1 / 0,
    reconnectionDelay: 1e3,
    reconnectionDelayMax: 15e3,
    // Called before every attempt, so a token refreshed since the socket
    // was created is the one that gets sent.
    auth: (I) => I(Ee())
  }), D.on("connect", () => {
    me = Je(Ee().conversation_token), o.value = "connected", X(), a.value = 0;
  }), D.on("bot_typing", () => {
    V();
  }), D.on("disconnect", () => {
    $(), o.value === "connected" && (console.log("Socket disconnected, setting connection status to connecting"), o.value = "connecting");
  }), D.on("connect_error", (I) => {
    var oe;
    const Q = (oe = I == null ? void 0 : I.data) == null ? void 0 : oe.type;
    if (Q && x.has(Q)) {
      O = !0, Y.value = Q, X(), o.value = "failed", Vo(Q) ? Fe || je == null || je() : an(I.data);
      return;
    }
    a.value++, console.error("Socket connection failed, attempt:", a.value), a.value >= l && (o.value = "failed"), D && !D.active && xe();
  }), D.on("chat_response", (I) => {
    if ($(), I.session_id ? (console.log("Captured session_id from chat_response:", I.session_id), b.value = I.session_id) : console.warn("No session_id in chat_response data:", I), I.type === "agent_message") {
      const Q = {
        message: I.message,
        message_type: "agent",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: "",
        agent_name: I.agent_name,
        stream: !0,
        // live reply → client-side typewriter reveal
        attributes: {
          end_chat: I.end_chat,
          end_chat_reason: I.end_chat_reason,
          end_chat_description: I.end_chat_description,
          request_rating: I.request_rating
        }
      };
      I.attachments && Array.isArray(I.attachments) && (Q.id = I.message_id, Q.attachments = I.attachments.map((oe, Ie) => ({
        id: I.message_id * 1e3 + Ie,
        filename: oe.filename,
        file_url: oe.file_url,
        content_type: oe.content_type,
        file_size: oe.file_size
      }))), e.value.push(Q);
    } else I.shopify_output && typeof I.shopify_output == "object" && I.shopify_output.products ? e.value.push({
      message: I.message,
      // Keep the accompanying text message
      message_type: "product",
      // Use 'product' type for rendering
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: "",
      agent_name: I.agent_name,
      // Assign the whole structured object
      shopify_output: I.shopify_output,
      // Remove the old flattened fields (product_id, product_title, etc.)
      attributes: {
        // Keep other attributes if needed
        end_chat: I.end_chat,
        request_rating: I.request_rating
      }
    }) : e.value.push({
      message: I.message,
      message_type: "bot",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: "",
      agent_name: I.agent_name,
      stream: !0,
      // live reply → client-side typewriter reveal
      // Knowledge-base citations (display gated by show_citations in the widget)
      sources: Array.isArray(I.sources) && I.sources.length ? I.sources : void 0,
      attributes: {
        end_chat: I.end_chat,
        end_chat_reason: I.end_chat_reason,
        end_chat_description: I.end_chat_description,
        request_rating: I.request_rating
      }
    });
  }), D.on("handle_taken_over", (I) => {
    e.value.push({
      message: `${I.user_name} joined the conversation`,
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: I.session_id
    }), p.value = {
      ...p.value,
      human_agent_name: I.user_name,
      human_agent_profile_pic: I.profile_picture
    }, $(), Le && Le(I);
  }), D.on("session_initialized", (I) => {
    I.session_id && (b.value = I.session_id, Ze = {
      session_id: I.session_id,
      authenticated: !!I.authenticated,
      created: !!I.created
    }, Te == null || Te(Ze));
  }), D.on("error", an), D.on("chat_history", m), D.on("rating_submitted", y), D.on("display_form", E), D.on("form_submitted", N), D.on("workflow_state", F), D.on("workflow_proceeded", R), D), rt = async () => {
    try {
      return D != null && D.connected && me && me === Je(Ee().conversation_token) ? (o.value = "connected", !0) : (o.value = "connecting", a.value = 0, $(), X(), O = !1, Y.value = null, D && (D.removeAllListeners(), D.disconnect(), D = null), Fe = !0, D = Pt(""), new Promise((P) => {
        const I = (Q) => {
          Fe = !1, P(Q);
        };
        D == null || D.on("connect", () => {
          I(!0);
        }), D == null || D.on("connect_error", () => {
          (O || a.value >= l) && I(!1);
        });
      }));
    } catch (P) {
      return console.error("Socket initialization failed:", P), Fe = !1, o.value = "failed", !1;
    }
  }, Ce = () => (D && D.disconnect(), rt()), Rt = (P) => {
    Le = P;
  }, pt = (P) => {
    je = P;
  }, vt = (P) => {
    Te = P, Ze && P(Ze);
  }, Dt = (P) => {
    we = P;
  }, St = (P) => {
    De = P;
  }, an = (P) => {
    $(), n.value = Wd(P), s.value = !0;
    const I = P == null ? void 0 : P.type;
    (I === "validation_error" || I === "upload_error") && e.value.length > 0 && e.value[e.value.length - 1].message_type === "user" && e.value.pop(), setTimeout(() => {
      s.value = !1, n.value = "";
    }, 5e3);
  }, m = (P) => {
    if (P.type === "chat_history" && Array.isArray(P.messages)) {
      const I = P.messages.map((Q) => {
        var Ie, f;
        const oe = {
          message: Q.message,
          message_type: Q.message_type,
          created_at: Q.created_at,
          session_id: "",
          agent_name: Q.agent_name || "",
          user_name: Q.user_name || "",
          attributes: Q.attributes || {},
          attachments: Q.attachments || []
          // Include attachments
        };
        return Array.isArray((Ie = Q.attributes) == null ? void 0 : Ie.sources) && Q.attributes.sources.length && (oe.sources = Q.attributes.sources), (f = Q.attributes) != null && f.shopify_output && typeof Q.attributes.shopify_output == "object" ? {
          ...oe,
          message_type: "product",
          shopify_output: Q.attributes.shopify_output
        } : oe;
      });
      e.value = [
        ...I.filter(
          (Q) => !e.value.some(
            (oe) => oe.message === Q.message && oe.created_at === Q.created_at
          )
        ),
        ...e.value
      ];
    }
  }, y = (P) => {
    P.success && e.value.push({
      message: "Thank you for your feedback!",
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    });
  }, E = (P) => {
    var I;
    console.log("Form display handler in composable:", P), $(), u.value = P.form_data, console.log("Set currentForm in handleDisplayForm:", u.value), ((I = P.form_data) == null ? void 0 : I.form_full_screen) === !0 ? (console.log("Full screen form detected, triggering workflow state callback"), we && we({
      type: "form",
      form_data: P.form_data,
      session_id: P.session_id
    })) : e.value.push({
      message: "",
      message_type: "form",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: P.session_id,
      attributes: {
        form_data: P.form_data
      }
    });
  }, N = (P) => {
    console.log("Form submitted confirmation received, clearing currentForm"), u.value = null, P.success && console.log("Form submitted successfully");
  }, F = (P) => {
    console.log("Workflow state received in composable:", P), (P.type === "form" || P.type === "display_form") && (console.log("Setting currentForm from workflow state:", P.form_data), u.value = P.form_data), we && we(P);
  }, R = (P) => {
    console.log("Workflow proceeded in composable:", P), De && De(P);
  }, K = async (P, I) => {
    !D || !P || D.emit("submit_rating", {
      rating: P,
      feedback: I
    });
  }, W = async (P) => {
    var oe;
    if (console.log("Submitting form in socket:", P), console.log("Current form in socket:", u.value), console.log("Socket in socket:", D), !D) {
      console.error("No socket available for form submission");
      return;
    }
    if (!P || Object.keys(P).length === 0) {
      console.error("No form data to submit");
      return;
    }
    const Q = ((oe = u.value) == null ? void 0 : oe.form_type) === "contact" ? "submit_contact_info" : "submit_form";
    console.log(`Emitting ${Q} event with data:`, P), D.emit(Q, {
      form_data: P
    }), u.value = null;
  }, j = async () => {
    D && (console.log("Getting workflow state 12"), D.emit("get_workflow_state"));
  }, H = async () => {
    D && D.emit("proceed_workflow", {});
  }, Z = async (P, I, Q = []) => {
    if (!D || !P.trim() && Q.length === 0) return;
    const oe = {
      message: P,
      message_type: "user",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    };
    Q.length > 0 && (oe.attachments = Q.map((Ie, f) => {
      let _ = "";
      if (Ie.content_type.startsWith("image/")) {
        const L = atob(Ie.content), S = new Array(L.length);
        for (let re = 0; re < L.length; re++)
          S[re] = L.charCodeAt(re);
        const z = new Uint8Array(S), ee = new Blob([z], { type: Ie.content_type });
        _ = URL.createObjectURL(ee);
      }
      return {
        id: Date.now() * 1e3 + f,
        // Temporary ID
        filename: Ie.filename,
        file_url: _,
        // Temporary blob URL, will be replaced
        content_type: Ie.content_type,
        file_size: Ie.size,
        _isTemporary: !0
        // Flag to identify temporary attachments
      };
    })), e.value.push(oe), D.emit("chat", {
      message: P,
      email: I,
      files: Q
      // Send files with base64 content
    }), i.value = !0;
  }, G = () => {
    e.value = [], i.value = !1, b.value = "", $(), u.value = null;
  };
  return {
    messages: e,
    loading: t,
    errorMessage: n,
    showError: s,
    loadingHistory: r,
    hasStartedChat: i,
    connectionStatus: o,
    sendMessage: Z,
    endChat: (P = "CUSTOMER_REQUEST") => new Promise((I) => {
      if (!D || !D.connected) {
        I(!1);
        return;
      }
      let Q = !1;
      const oe = (L) => {
        Q || (Q = !0, clearTimeout(_), D == null || D.off("chat_ended", Ie), D == null || D.off("error", f), L && G(), I(L));
      }, Ie = () => oe(!0), f = (L) => {
        (L == null ? void 0 : L.type) === "end_chat_error" && oe(!1);
      }, _ = setTimeout(() => oe(!1), t_);
      D.on("chat_ended", Ie), D.on("error", f), D.emit("end_chat", { reason: P });
    }),
    loadChatHistory: async () => {
      if (D)
        try {
          r.value = !0, D.emit("get_chat_history");
        } catch (P) {
          console.error("Failed to load chat history:", P);
        } finally {
          r.value = !1;
        }
    },
    connect: rt,
    reconnect: Ce,
    cleanup: () => {
      $(), X(), D && (D.removeAllListeners(), D.disconnect(), D = null), Le = null, we = null, De = null;
    },
    humanAgent: p,
    onTakeover: Rt,
    onSessionState: vt,
    onReauthorize: pt,
    refusal: Y,
    submitRating: K,
    currentForm: u,
    submitForm: W,
    getWorkflowState: j,
    proceedWorkflow: H,
    onWorkflowState: Dt,
    onWorkflowProceeded: St,
    currentSessionId: b,
    setToken: Qe,
    setWidgetId: st
  };
}
function s_(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Oo = { exports: {} }, hc;
function r_() {
  return hc || (hc = 1, function(e) {
    (function() {
      function t(f, _, L) {
        return f.call.apply(f.bind, arguments);
      }
      function n(f, _, L) {
        if (!f) throw Error();
        if (2 < arguments.length) {
          var S = Array.prototype.slice.call(arguments, 2);
          return function() {
            var z = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(z, S), f.apply(_, z);
          };
        }
        return function() {
          return f.apply(_, arguments);
        };
      }
      function s(f, _, L) {
        return s = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? t : n, s.apply(null, arguments);
      }
      var r = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function i(f, _) {
        this.a = f, this.o = _ || f, this.c = this.o.document;
      }
      var o = !!window.FontFace;
      function a(f, _, L, S) {
        if (_ = f.c.createElement(_), L) for (var z in L) L.hasOwnProperty(z) && (z == "style" ? _.style.cssText = L[z] : _.setAttribute(z, L[z]));
        return S && _.appendChild(f.c.createTextNode(S)), _;
      }
      function l(f, _, L) {
        f = f.c.getElementsByTagName(_)[0], f || (f = document.documentElement), f.insertBefore(L, f.lastChild);
      }
      function p(f) {
        f.parentNode && f.parentNode.removeChild(f);
      }
      function u(f, _, L) {
        _ = _ || [], L = L || [];
        for (var S = f.className.split(/\s+/), z = 0; z < _.length; z += 1) {
          for (var ee = !1, re = 0; re < S.length; re += 1) if (_[z] === S[re]) {
            ee = !0;
            break;
          }
          ee || S.push(_[z]);
        }
        for (_ = [], z = 0; z < S.length; z += 1) {
          for (ee = !1, re = 0; re < L.length; re += 1) if (S[z] === L[re]) {
            ee = !0;
            break;
          }
          ee || _.push(S[z]);
        }
        f.className = _.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function b(f, _) {
        for (var L = f.className.split(/\s+/), S = 0, z = L.length; S < z; S++) if (L[S] == _) return !0;
        return !1;
      }
      function w(f) {
        return f.o.location.hostname || f.a.location.hostname;
      }
      function U(f, _, L) {
        function S() {
          ve && z && ee && (ve(re), ve = null);
        }
        _ = a(f, "link", { rel: "stylesheet", href: _, media: "all" });
        var z = !1, ee = !0, re = null, ve = L || null;
        o ? (_.onload = function() {
          z = !0, S();
        }, _.onerror = function() {
          z = !0, re = Error("Stylesheet failed to load"), S();
        }) : setTimeout(function() {
          z = !0, S();
        }, 0), l(f, "head", _);
      }
      function $(f, _, L, S) {
        var z = f.c.getElementsByTagName("head")[0];
        if (z) {
          var ee = a(f, "script", { src: _ }), re = !1;
          return ee.onload = ee.onreadystatechange = function() {
            re || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (re = !0, L && L(null), ee.onload = ee.onreadystatechange = null, ee.parentNode.tagName == "HEAD" && z.removeChild(ee));
          }, z.appendChild(ee), setTimeout(function() {
            re || (re = !0, L && L(Error("Script load timeout")));
          }, S || 5e3), ee;
        }
        return null;
      }
      function V() {
        this.a = 0, this.c = null;
      }
      function D(f) {
        return f.a++, function() {
          f.a--, fe(f);
        };
      }
      function te(f, _) {
        f.c = _, fe(f);
      }
      function fe(f) {
        f.a == 0 && f.c && (f.c(), f.c = null);
      }
      function de(f) {
        this.a = f || "-";
      }
      de.prototype.c = function(f) {
        for (var _ = [], L = 0; L < arguments.length; L++) _.push(arguments[L].replace(/[\W_]+/g, "").toLowerCase());
        return _.join(this.a);
      };
      function x(f, _) {
        this.c = f, this.f = 4, this.a = "n";
        var L = (_ || "n4").match(/^([nio])([1-9])$/i);
        L && (this.a = L[1], this.f = parseInt(L[2], 10));
      }
      function O(f) {
        return xe(f) + " " + (f.f + "00") + " 300px " + Y(f.c);
      }
      function Y(f) {
        var _ = [];
        f = f.split(/,\s*/);
        for (var L = 0; L < f.length; L++) {
          var S = f[L].replace(/['"]/g, "");
          S.indexOf(" ") != -1 || /^\d/.test(S) ? _.push("'" + S + "'") : _.push(S);
        }
        return _.join(",");
      }
      function X(f) {
        return f.a + f.f;
      }
      function xe(f) {
        var _ = "normal";
        return f.a === "o" ? _ = "oblique" : f.a === "i" && (_ = "italic"), _;
      }
      function Le(f) {
        var _ = 4, L = "n", S = null;
        return f && ((S = f.match(/(normal|oblique|italic)/i)) && S[1] && (L = S[1].substr(0, 1).toLowerCase()), (S = f.match(/([1-9]00|normal|bold)/i)) && S[1] && (/bold/i.test(S[1]) ? _ = 7 : /[1-9]00/.test(S[1]) && (_ = parseInt(S[1].substr(0, 1), 10)))), L + _;
      }
      function we(f, _) {
        this.c = f, this.f = f.o.document.documentElement, this.h = _, this.a = new de("-"), this.j = _.events !== !1, this.g = _.classes !== !1;
      }
      function De(f) {
        f.g && u(f.f, [f.a.c("wf", "loading")]), je(f, "loading");
      }
      function Te(f) {
        if (f.g) {
          var _ = b(f.f, f.a.c("wf", "active")), L = [], S = [f.a.c("wf", "loading")];
          _ || L.push(f.a.c("wf", "inactive")), u(f.f, L, S);
        }
        je(f, "inactive");
      }
      function je(f, _, L) {
        f.j && f.h[_] && (L ? f.h[_](L.c, X(L)) : f.h[_]());
      }
      function Fe() {
        this.c = {};
      }
      function Ze(f, _, L) {
        var S = [], z;
        for (z in _) if (_.hasOwnProperty(z)) {
          var ee = f.c[z];
          ee && S.push(ee(_[z], L));
        }
        return S;
      }
      function he(f, _) {
        this.c = f, this.f = _, this.a = a(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function ye(f) {
        l(f.c, "body", f.a);
      }
      function me(f) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + Y(f.c) + ";" + ("font-style:" + xe(f) + ";font-weight:" + (f.f + "00") + ";");
      }
      function Je(f, _, L, S, z, ee) {
        this.g = f, this.j = _, this.a = S, this.c = L, this.f = z || 3e3, this.h = ee || void 0;
      }
      Je.prototype.start = function() {
        var f = this.c.o.document, _ = this, L = r(), S = new Promise(function(re, ve) {
          function Oe() {
            r() - L >= _.f ? ve() : f.fonts.load(O(_.a), _.h).then(function(Ve) {
              1 <= Ve.length ? re() : setTimeout(Oe, 25);
            }, function() {
              ve();
            });
          }
          Oe();
        }), z = null, ee = new Promise(function(re, ve) {
          z = setTimeout(ve, _.f);
        });
        Promise.race([ee, S]).then(function() {
          z && (clearTimeout(z), z = null), _.g(_.a);
        }, function() {
          _.j(_.a);
        });
      };
      function Qe(f, _, L, S, z, ee, re) {
        this.v = f, this.B = _, this.c = L, this.a = S, this.s = re || "BESbswy", this.f = {}, this.w = z || 3e3, this.u = ee || null, this.m = this.j = this.h = this.g = null, this.g = new he(this.c, this.s), this.h = new he(this.c, this.s), this.j = new he(this.c, this.s), this.m = new he(this.c, this.s), f = new x(this.a.c + ",serif", X(this.a)), f = me(f), this.g.a.style.cssText = f, f = new x(this.a.c + ",sans-serif", X(this.a)), f = me(f), this.h.a.style.cssText = f, f = new x("serif", X(this.a)), f = me(f), this.j.a.style.cssText = f, f = new x("sans-serif", X(this.a)), f = me(f), this.m.a.style.cssText = f, ye(this.g), ye(this.h), ye(this.j), ye(this.m);
      }
      var st = { D: "serif", C: "sans-serif" }, Ee = null;
      function Pt() {
        if (Ee === null) {
          var f = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          Ee = !!f && (536 > parseInt(f[1], 10) || parseInt(f[1], 10) === 536 && 11 >= parseInt(f[2], 10));
        }
        return Ee;
      }
      Qe.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = r(), Ce(this);
      };
      function rt(f, _, L) {
        for (var S in st) if (st.hasOwnProperty(S) && _ === f.f[st[S]] && L === f.f[st[S]]) return !0;
        return !1;
      }
      function Ce(f) {
        var _ = f.g.a.offsetWidth, L = f.h.a.offsetWidth, S;
        (S = _ === f.f.serif && L === f.f["sans-serif"]) || (S = Pt() && rt(f, _, L)), S ? r() - f.A >= f.w ? Pt() && rt(f, _, L) && (f.u === null || f.u.hasOwnProperty(f.a.c)) ? pt(f, f.v) : pt(f, f.B) : Rt(f) : pt(f, f.v);
      }
      function Rt(f) {
        setTimeout(s(function() {
          Ce(this);
        }, f), 50);
      }
      function pt(f, _) {
        setTimeout(s(function() {
          p(this.g.a), p(this.h.a), p(this.j.a), p(this.m.a), _(this.a);
        }, f), 0);
      }
      function vt(f, _, L) {
        this.c = f, this.a = _, this.f = 0, this.m = this.j = !1, this.s = L;
      }
      var Dt = null;
      vt.prototype.g = function(f) {
        var _ = this.a;
        _.g && u(_.f, [_.a.c("wf", f.c, X(f).toString(), "active")], [_.a.c("wf", f.c, X(f).toString(), "loading"), _.a.c("wf", f.c, X(f).toString(), "inactive")]), je(_, "fontactive", f), this.m = !0, St(this);
      }, vt.prototype.h = function(f) {
        var _ = this.a;
        if (_.g) {
          var L = b(_.f, _.a.c("wf", f.c, X(f).toString(), "active")), S = [], z = [_.a.c("wf", f.c, X(f).toString(), "loading")];
          L || S.push(_.a.c("wf", f.c, X(f).toString(), "inactive")), u(_.f, S, z);
        }
        je(_, "fontinactive", f), St(this);
      };
      function St(f) {
        --f.f == 0 && f.j && (f.m ? (f = f.a, f.g && u(f.f, [f.a.c("wf", "active")], [f.a.c("wf", "loading"), f.a.c("wf", "inactive")]), je(f, "active")) : Te(f.a));
      }
      function an(f) {
        this.j = f, this.a = new Fe(), this.h = 0, this.f = this.g = !0;
      }
      an.prototype.load = function(f) {
        this.c = new i(this.j, f.context || this.j), this.g = f.events !== !1, this.f = f.classes !== !1, y(this, new we(this.c, f), f);
      };
      function m(f, _, L, S, z) {
        var ee = --f.h == 0;
        (f.f || f.g) && setTimeout(function() {
          var re = z || null, ve = S || null || {};
          if (L.length === 0 && ee) Te(_.a);
          else {
            _.f += L.length, ee && (_.j = ee);
            var Oe, Ve = [];
            for (Oe = 0; Oe < L.length; Oe++) {
              var Re = L[Oe], it = ve[Re.c], gt = _.a, qt = Re;
              if (gt.g && u(gt.f, [gt.a.c("wf", qt.c, X(qt).toString(), "loading")]), je(gt, "fontloading", qt), gt = null, Dt === null) if (window.FontFace) {
                var qt = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), Ss = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                Dt = qt ? 42 < parseInt(qt[1], 10) : !Ss;
              } else Dt = !1;
              Dt ? gt = new Je(s(_.g, _), s(_.h, _), _.c, Re, _.s, it) : gt = new Qe(s(_.g, _), s(_.h, _), _.c, Re, _.s, re, it), Ve.push(gt);
            }
            for (Oe = 0; Oe < Ve.length; Oe++) Ve[Oe].start();
          }
        }, 0);
      }
      function y(f, _, L) {
        var z = [], S = L.timeout;
        De(_);
        var z = Ze(f.a, L, f.c), ee = new vt(f.c, _, S);
        for (f.h = z.length, _ = 0, L = z.length; _ < L; _++) z[_].load(function(re, ve, Oe) {
          m(f, ee, re, ve, Oe);
        });
      }
      function E(f, _) {
        this.c = f, this.a = _;
      }
      E.prototype.load = function(f) {
        function _() {
          if (ee["__mti_fntLst" + S]) {
            var re = ee["__mti_fntLst" + S](), ve = [], Oe;
            if (re) for (var Ve = 0; Ve < re.length; Ve++) {
              var Re = re[Ve].fontfamily;
              re[Ve].fontStyle != null && re[Ve].fontWeight != null ? (Oe = re[Ve].fontStyle + re[Ve].fontWeight, ve.push(new x(Re, Oe))) : ve.push(new x(Re));
            }
            f(ve);
          } else setTimeout(function() {
            _();
          }, 50);
        }
        var L = this, S = L.a.projectId, z = L.a.version;
        if (S) {
          var ee = L.c.o;
          $(this.c, (L.a.api || "https://fast.fonts.net/jsapi") + "/" + S + ".js" + (z ? "?v=" + z : ""), function(re) {
            re ? f([]) : (ee["__MonotypeConfiguration__" + S] = function() {
              return L.a;
            }, _());
          }).id = "__MonotypeAPIScript__" + S;
        } else f([]);
      };
      function N(f, _) {
        this.c = f, this.a = _;
      }
      N.prototype.load = function(f) {
        var _, L, S = this.a.urls || [], z = this.a.families || [], ee = this.a.testStrings || {}, re = new V();
        for (_ = 0, L = S.length; _ < L; _++) U(this.c, S[_], D(re));
        var ve = [];
        for (_ = 0, L = z.length; _ < L; _++) if (S = z[_].split(":"), S[1]) for (var Oe = S[1].split(","), Ve = 0; Ve < Oe.length; Ve += 1) ve.push(new x(S[0], Oe[Ve]));
        else ve.push(new x(S[0]));
        te(re, function() {
          f(ve, ee);
        });
      };
      function F(f, _) {
        f ? this.c = f : this.c = R, this.a = [], this.f = [], this.g = _ || "";
      }
      var R = "https://fonts.googleapis.com/css";
      function K(f, _) {
        for (var L = _.length, S = 0; S < L; S++) {
          var z = _[S].split(":");
          z.length == 3 && f.f.push(z.pop());
          var ee = "";
          z.length == 2 && z[1] != "" && (ee = ":"), f.a.push(z.join(ee));
        }
      }
      function W(f) {
        if (f.a.length == 0) throw Error("No fonts to load!");
        if (f.c.indexOf("kit=") != -1) return f.c;
        for (var _ = f.a.length, L = [], S = 0; S < _; S++) L.push(f.a[S].replace(/ /g, "+"));
        return _ = f.c + "?family=" + L.join("%7C"), 0 < f.f.length && (_ += "&subset=" + f.f.join(",")), 0 < f.g.length && (_ += "&text=" + encodeURIComponent(f.g)), _;
      }
      function j(f) {
        this.f = f, this.a = [], this.c = {};
      }
      var H = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, Z = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, G = { i: "i", italic: "i", n: "n", normal: "n" }, ie = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function le(f) {
        for (var _ = f.f.length, L = 0; L < _; L++) {
          var S = f.f[L].split(":"), z = S[0].replace(/\+/g, " "), ee = ["n4"];
          if (2 <= S.length) {
            var re, ve = S[1];
            if (re = [], ve) for (var ve = ve.split(","), Oe = ve.length, Ve = 0; Ve < Oe; Ve++) {
              var Re;
              if (Re = ve[Ve], Re.match(/^[\w-]+$/)) {
                var it = ie.exec(Re.toLowerCase());
                if (it == null) Re = "";
                else {
                  if (Re = it[2], Re = Re == null || Re == "" ? "n" : G[Re], it = it[1], it == null || it == "") it = "4";
                  else var gt = Z[it], it = gt || (isNaN(it) ? "4" : it.substr(0, 1));
                  Re = [Re, it].join("");
                }
              } else Re = "";
              Re && re.push(Re);
            }
            0 < re.length && (ee = re), S.length == 3 && (S = S[2], re = [], S = S ? S.split(",") : re, 0 < S.length && (S = H[S[0]]) && (f.c[z] = S));
          }
          for (f.c[z] || (S = H[z]) && (f.c[z] = S), S = 0; S < ee.length; S += 1) f.a.push(new x(z, ee[S]));
        }
      }
      function Ae(f, _) {
        this.c = f, this.a = _;
      }
      var P = { Arimo: !0, Cousine: !0, Tinos: !0 };
      Ae.prototype.load = function(f) {
        var _ = new V(), L = this.c, S = new F(this.a.api, this.a.text), z = this.a.families;
        K(S, z);
        var ee = new j(z);
        le(ee), U(L, W(S), D(_)), te(_, function() {
          f(ee.a, ee.c, P);
        });
      };
      function I(f, _) {
        this.c = f, this.a = _;
      }
      I.prototype.load = function(f) {
        var _ = this.a.id, L = this.c.o;
        _ ? $(this.c, (this.a.api || "https://use.typekit.net") + "/" + _ + ".js", function(S) {
          if (S) f([]);
          else if (L.Typekit && L.Typekit.config && L.Typekit.config.fn) {
            S = L.Typekit.config.fn;
            for (var z = [], ee = 0; ee < S.length; ee += 2) for (var re = S[ee], ve = S[ee + 1], Oe = 0; Oe < ve.length; Oe++) z.push(new x(re, ve[Oe]));
            try {
              L.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            f(z);
          }
        }, 2e3) : f([]);
      };
      function Q(f, _) {
        this.c = f, this.f = _, this.a = [];
      }
      Q.prototype.load = function(f) {
        var _ = this.f.id, L = this.c.o, S = this;
        _ ? (L.__webfontfontdeckmodule__ || (L.__webfontfontdeckmodule__ = {}), L.__webfontfontdeckmodule__[_] = function(z, ee) {
          for (var re = 0, ve = ee.fonts.length; re < ve; ++re) {
            var Oe = ee.fonts[re];
            S.a.push(new x(Oe.name, Le("font-weight:" + Oe.weight + ";font-style:" + Oe.style)));
          }
          f(S.a);
        }, $(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + w(this.c) + "/" + _ + ".js", function(z) {
          z && f([]);
        })) : f([]);
      };
      var oe = new an(window);
      oe.a.c.custom = function(f, _) {
        return new N(_, f);
      }, oe.a.c.fontdeck = function(f, _) {
        return new Q(_, f);
      }, oe.a.c.monotype = function(f, _) {
        return new E(_, f);
      }, oe.a.c.typekit = function(f, _) {
        return new I(_, f);
      }, oe.a.c.google = function(f, _) {
        return new Ae(_, f);
      };
      var Ie = { load: s(oe.load, oe) };
      e.exports ? e.exports = Ie : (window.WebFont = Ie, window.WebFontConfig && oe.load(window.WebFontConfig));
    })();
  }(Oo)), Oo.exports;
}
var i_ = r_();
const o_ = /* @__PURE__ */ s_(i_), dc = [
  "Space Grotesk:400,500,600,700",
  "Instrument Sans:400,500,600",
  "JetBrains Mono:400,500,600"
], a_ = (e) => {
  const t = [...dc], n = (e == null ? void 0 : e.split(",")[0].trim().replace(/['"]/g, "")) || "", s = dc.some(
    (r) => r.toLowerCase().startsWith(n.toLowerCase())
  );
  n && !s && t.push(n), o_.load({
    google: { families: t },
    active: () => {
      if (!e) return;
      const r = document.querySelector(".chat-container");
      r && (r.style.fontFamily = e.includes(",") ? e : `"${e}", system-ui, sans-serif`);
    }
  });
};
function l_() {
  const e = ue({}), t = ue(""), n = (r) => {
    var i;
    e.value = r, r.photo_url && (e.value.photo_url = r.photo_url), a_(r.font_family), Ft({
      type: "CUSTOMIZATION_UPDATE",
      data: {
        chat_bubble_color: r.chat_bubble_color || "#C9F24E",
        chat_style: r.chat_style,
        chat_initiation_messages: r.chat_initiation_messages || [],
        // Dashboard "Widget placement" defaults — the embed loader merges these
        // under any options the installing developer set.
        widget_display: (i = r.customization_metadata) == null ? void 0 : i.widget_display
      }
    });
  };
  return {
    customization: e,
    agentName: t,
    applyCustomization: n,
    initializeFromData: () => {
      const r = window.__INITIAL_DATA__;
      r && (n(r.customization || {}), t.value = r.agentName || "");
    }
  };
}
const c_ = 13, u_ = 24;
function f_(e, t) {
  const n = Bi({}), s = [];
  let r = null;
  const i = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, o = (u) => {
    r || s.length === 0 || (r = setTimeout(a, u));
  }, a = () => {
    r = null;
    const u = s[0];
    if (u === void 0) return;
    const b = e.value[u], w = n[u], U = (b == null ? void 0 : b.message) ?? "";
    if (!w || !b) {
      s.shift(), o(0);
      return;
    }
    if (w.shown >= U.length) {
      w.done = !0, s.shift(), o(0);
      return;
    }
    w.shown += 1;
    const $ = U[w.shown - 1];
    t == null || t(), o($ === " " ? u_ : c_);
  };
  $t(() => e.value.length, (u, b) => {
    b !== void 0 && u < b && (Object.keys(n).forEach((w) => {
      delete n[Number(w)];
    }), s.length = 0);
    for (let w = b ?? 0; w < u; w++) {
      const U = e.value[w];
      if (!U || !U.stream || w in n) continue;
      const $ = U.message ?? "";
      i || !$ ? n[w] = { shown: $.length, done: !0 } : (n[w] = { shown: 0, done: !1 }, s.push(w));
    }
    o(0);
  });
  const l = (u, b) => {
    const w = n[u];
    return w ? b.slice(0, w.shown) : b;
  }, p = (u) => {
    const b = n[u];
    return !!b && !b.done;
  };
  return Br(() => {
    r && clearTimeout(r);
  }), { displayText: l, isStreaming: p };
}
function h_(e) {
  const t = ue(!0);
  let n = 0;
  const s = () => {
    Ft({ type: "UNREAD_COUNT", count: n });
  }, r = (i) => {
    var o;
    ((o = i == null ? void 0 : i.data) == null ? void 0 : o.type) === "WIDGET_VISIBILITY" && (t.value = !!i.data.open, t.value && n !== 0 && (n = 0, s()));
  };
  $t(() => e.value.length, (i, o) => {
    if (i <= (o ?? 0) || t.value) return;
    const a = e.value[i - 1];
    a && (a.message_type === "bot" || a.message_type === "agent") && (n += 1, s());
  }), Hi(() => window.addEventListener("message", r)), Br(() => window.removeEventListener("message", r));
}
const d_ = {
  light: !1,
  mono: !1,
  radius: 22,
  bubble: 16,
  glow: "rgba(157,140,255,.26)",
  border: "rgba(157,140,255,.32)",
  card: "linear-gradient(180deg,rgba(28,26,40,.94),rgba(15,14,22,.97))",
  text: "#ECEAFA",
  muted: "#9C97BE",
  agentBg: "rgba(255,255,255,.06)",
  accent: "#9D8CFF"
}, p_ = {
  light: !1,
  mono: !1,
  radius: 26,
  bubble: 18,
  glow: "rgba(157,140,255,.32)",
  border: "rgba(157,140,255,.40)",
  card: "linear-gradient(180deg,#16131F,#0A0910)",
  text: "#F2F3F8",
  muted: "#A7A0CC",
  agentBg: "rgba(255,255,255,.05)",
  accent: "#9D8CFF"
}, g_ = {
  light: !1,
  mono: !0,
  radius: 8,
  bubble: 4,
  glow: "rgba(201,242,78,.20)",
  border: "rgba(201,242,78,.30)",
  card: "#070907",
  text: "#D7F7C8",
  muted: "#7F9B57",
  agentBg: "rgba(201,242,78,.045)",
  accent: "#C9F24E"
}, m_ = {
  light: !1,
  mono: !1,
  radius: 18,
  bubble: 14,
  glow: "rgba(95,227,214,.22)",
  border: "rgba(95,227,214,.30)",
  card: "linear-gradient(180deg,#0E1A1A,#0A1414)",
  text: "#DDF7F3",
  muted: "#6FAFA8",
  agentBg: "rgba(255,255,255,.05)",
  accent: "#5FE3D6"
}, __ = {
  light: !0,
  mono: !1,
  radius: 28,
  bubble: 20,
  glow: "rgba(255,138,115,.30)",
  border: "rgba(0,0,0,.07)",
  card: "#FFFFFF",
  text: "#2A2730",
  muted: "#736C7C",
  agentBg: "#F4F1F6",
  accent: "#FF8A73"
}, vi = {
  light: !0,
  mono: !1,
  radius: 24,
  bubble: 16,
  glow: "rgba(255,138,115,.22)",
  border: "rgba(0,0,0,.08)",
  card: "#FFFFFF",
  text: "#2A2A33",
  muted: "#6E6E7B",
  agentBg: "#F3F3F6",
  accent: "#FF8A73"
}, y_ = {
  GLASS: d_,
  AURORA: p_,
  TERMINAL: g_,
  CALM_MINT: m_,
  PLAYFUL: __,
  SUNRISE: vi,
  CHATBOT: vi,
  ASK_ANYTHING: vi
}, v_ = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", pc = "'Instrument Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";
function b_(e) {
  return Math.max(4, Math.round(e * 0.3));
}
function gc(e) {
  const t = (e || "").replace("#", "");
  if (t.length < 6) return "#0B0C10";
  const n = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), r = parseInt(t.slice(4, 6), 16);
  return (0.299 * n + 0.587 * s + 0.114 * r) / 255 > 0.62 ? "#0B0C10" : "#FFFFFF";
}
function w_(e) {
  return y_[e || ""] || vi;
}
const k_ = "#212529";
function T_(e, t) {
  const n = w_(e), s = (t == null ? void 0 : t.chat_background_color) || "", r = /^#[0-9a-fA-F]{6}$/.test(s), i = s || n.card, o = (t == null ? void 0 : t.chat_text_color) || "", l = /^#[0-9a-fA-F]{6}$/.test(o) && o.toLowerCase() !== k_ ? o : r ? qs(s) ? "#FFFFFF" : "#111111" : n.text, p = r ? qs(s) ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.62)" : n.muted, u = r ? Hd(s, 20) : n.agentBg, b = (t == null ? void 0 : t.accent_color) || n.accent, w = r ? !qs(s) : n.light, U = gc(b) === "#0B0C10", $ = w === U ? p : b, V = n.mono ? v_ : t != null && t.font_family ? `${t.font_family}, ${pc}` : pc;
  return {
    "--cm-card": i,
    "--cm-text": l,
    "--cm-muted": p,
    "--cm-agent-bg": u,
    "--cm-accent": b,
    "--cm-on-accent": gc(b),
    "--cm-presence": $,
    "--cm-border": n.border,
    "--cm-glow": n.glow,
    "--cm-radius": `${n.radius}px`,
    "--cm-bubble": `${n.bubble}px`,
    "--cm-bubble-tail": `${b_(n.bubble)}px`,
    "--cm-field-radius": n.mono ? "7px" : "12px",
    "--cm-avatar-radius": n.mono ? "28%" : "50%",
    "--cm-hairline": n.light ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.08)",
    "--cm-body-font": V
  };
}
const mc = (e) => {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: e || "USD" }).resolvedOptions().maximumFractionDigits ?? 2;
  } catch {
    return 2;
  }
};
function A_() {
  const e = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    INR: "₹",
    CAD: "CA$",
    AUD: "A$",
    CNY: "¥",
    CHF: "CHF",
    SEK: "kr",
    NOK: "kr",
    DKK: "kr",
    NZD: "NZ$",
    SGD: "S$",
    HKD: "HK$",
    KRW: "₩",
    MXN: "MX$",
    BRL: "R$",
    ZAR: "R",
    RUB: "₽",
    TRY: "₺",
    THB: "฿",
    PLN: "zł",
    AED: "د.إ",
    SAR: "﷼",
    ILS: "₪",
    MYR: "RM"
  };
  return {
    formatCurrency: (s, r) => {
      if (!s && s !== 0) return "";
      const i = r ? e[r] || r : "", o = typeof s == "number" ? s : Number(s), a = Number.isFinite(o) ? o.toLocaleString("en-US", {
        minimumFractionDigits: mc(r),
        maximumFractionDigits: mc(r)
      }) : String(s);
      return i ? `${i}${a}` : a;
    },
    getCurrencySymbol: (s) => e[s] || s,
    currencySymbols: e
  };
}
const S_ = {
  key: 0,
  class: "widget-unavailable-overlay"
}, x_ = {
  key: 1,
  class: "auth-error-overlay"
}, E_ = { class: "auth-error-card" }, C_ = { class: "auth-error-message" }, R_ = {
  key: 0,
  class: "initializing-overlay"
}, I_ = {
  key: 0,
  class: "connecting-message"
}, L_ = {
  key: 1,
  class: "failed-message"
}, O_ = { class: "welcome-content" }, N_ = { class: "welcome-header" }, P_ = ["src", "alt"], D_ = { class: "welcome-title" }, M_ = { class: "welcome-subtitle" }, F_ = { class: "welcome-input-container" }, $_ = {
  key: 0,
  class: "email-input"
}, B_ = ["disabled"], U_ = { class: "welcome-message-input" }, z_ = ["placeholder", "disabled"], H_ = ["disabled"], W_ = {
  key: 0,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, q_ = {
  key: 1,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, j_ = { class: "landing-page-content" }, V_ = { class: "landing-page-header" }, K_ = { class: "landing-page-heading" }, G_ = { class: "landing-page-text" }, Y_ = { class: "landing-page-actions" }, X_ = { class: "form-fullscreen-content" }, Z_ = {
  key: 0,
  class: "form-header"
}, J_ = {
  key: 0,
  class: "form-title"
}, Q_ = {
  key: 1,
  class: "form-description"
}, ey = { class: "form-fields" }, ty = ["for"], ny = {
  key: 0,
  class: "required-indicator"
}, sy = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "autocomplete", "inputmode"], ry = ["id", "placeholder", "required", "min", "max", "value", "onInput"], iy = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput"], oy = ["id", "required", "value", "onChange"], ay = { value: "" }, ly = ["value"], cy = {
  key: 4,
  class: "checkbox-field"
}, uy = ["id", "required", "checked", "onChange"], fy = { class: "checkbox-label" }, hy = {
  key: 5,
  class: "radio-group"
}, dy = ["name", "value", "required", "checked", "onChange"], py = { class: "radio-label" }, gy = {
  key: 6,
  class: "field-error"
}, my = { class: "form-actions" }, _y = ["disabled"], yy = {
  key: 0,
  class: "loading-spinner-inline"
}, vy = { key: 1 }, by = { class: "header-content" }, wy = ["src", "alt"], ky = { class: "header-info" }, Ty = { class: "status" }, Ay = { class: "status-text cm-presence" }, Sy = { class: "header-actions" }, xy = ["disabled", "title", "aria-label", "aria-expanded"], Ey = { class: "ask-anything-header" }, Cy = ["src", "alt"], Ry = { class: "header-info" }, Iy = {
  key: 2,
  class: "loading-history"
}, Ly = { class: "cm-email-gate-title" }, Oy = ["disabled"], Ny = {
  key: 0,
  class: "cm-email-gate-error"
}, Py = ["disabled"], Dy = {
  key: 0,
  class: "cm-welcome-block"
}, My = { class: "message agent-message cm-welcome-row" }, Fy = ["src", "alt"], $y = {
  key: 0,
  class: "cm-msg-avatar",
  "aria-hidden": "true"
}, By = ["src"], Uy = ["src"], zy = { class: "message-col" }, Hy = {
  key: 0,
  class: "rating-content"
}, Wy = { class: "rating-prompt" }, qy = ["onMouseover", "onMouseleave", "onClick", "disabled"], jy = {
  key: 0,
  class: "feedback-wrapper"
}, Vy = { class: "feedback-section" }, Ky = ["onUpdate:modelValue", "disabled"], Gy = { class: "feedback-counter" }, Yy = ["onClick", "disabled"], Xy = {
  key: 1,
  class: "submitted-feedback-wrapper"
}, Zy = { class: "submitted-feedback" }, Jy = { class: "submitted-feedback-text" }, Qy = {
  key: 2,
  class: "submitted-message"
}, ev = {
  key: 1,
  class: "form-content"
}, tv = {
  key: 0,
  class: "form-header"
}, nv = {
  key: 0,
  class: "form-title"
}, sv = {
  key: 1,
  class: "form-description"
}, rv = { class: "form-fields" }, iv = ["for"], ov = {
  key: 0,
  class: "required-indicator"
}, av = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "disabled", "autocomplete", "inputmode"], lv = ["id", "placeholder", "required", "min", "max", "value", "onInput", "disabled"], cv = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "disabled"], uv = ["id", "required", "value", "onChange", "disabled"], fv = { value: "" }, hv = ["value"], dv = {
  key: 4,
  class: "checkbox-field"
}, pv = ["id", "checked", "onChange", "disabled"], gv = ["for"], mv = {
  key: 5,
  class: "radio-field"
}, _v = ["id", "name", "value", "checked", "onChange", "disabled"], yv = ["for"], vv = {
  key: 6,
  class: "field-error"
}, bv = { class: "form-actions" }, wv = ["onClick", "disabled"], kv = {
  key: 2,
  class: "user-input-content"
}, Tv = {
  key: 0,
  class: "user-input-prompt"
}, Av = {
  key: 1,
  class: "user-input-form"
}, Sv = ["onUpdate:modelValue", "onKeydown"], xv = ["onClick", "disabled"], Ev = {
  key: 2,
  class: "user-input-submitted"
}, Cv = {
  key: 0,
  class: "user-input-confirmation"
}, Rv = {
  key: 3,
  class: "product-message-container"
}, Iv = ["innerHTML"], Lv = {
  key: 1,
  class: "products-carousel"
}, Ov = { class: "carousel-items" }, Nv = {
  key: 0,
  class: "product-image-compact"
}, Pv = ["src", "alt"], Dv = { class: "product-info-compact" }, Mv = { class: "product-text-area" }, Fv = { class: "product-title-compact" }, $v = {
  key: 0,
  class: "product-variant-compact"
}, Bv = { class: "product-price-compact" }, Uv = { class: "product-actions-compact" }, zv = ["onClick"], Hv = {
  key: 2,
  class: "no-products-message"
}, Wv = {
  key: 3,
  class: "no-products-message"
}, qv = ["innerHTML"], jv = ["innerHTML"], Vv = {
  key: 2,
  class: "message-attachments"
}, Kv = {
  key: 0,
  class: "attachment-image-container"
}, Gv = ["src", "alt", "onClick"], Yv = { class: "attachment-image-info" }, Xv = ["href"], Zv = { class: "attachment-size" }, Jv = ["href"], Qv = { class: "attachment-size" }, eb = {
  key: 0,
  class: "citation-chips"
}, tb = ["title"], nb = { class: "message-info" }, sb = {
  key: 0,
  class: "agent-name"
}, rb = {
  key: 5,
  class: "cm-quick-actions-bar"
}, ib = ["disabled", "onClick"], ob = {
  key: 0,
  class: "file-previews-widget"
}, ab = {
  class: "file-preview-content-widget",
  style: { cursor: "pointer" }
}, lb = ["src", "alt", "onClick"], cb = ["onClick"], ub = { class: "file-preview-info-widget" }, fb = { class: "file-preview-name-widget" }, hb = { class: "file-preview-size-widget" }, db = ["onClick"], pb = {
  key: 1,
  class: "upload-progress-widget"
}, gb = { class: "message-input" }, mb = ["placeholder", "disabled"], _b = ["disabled", "title"], yb = ["disabled"], vb = {
  key: 7,
  class: "new-conversation-section"
}, bb = { class: "conversation-ended-message" }, wb = {
  key: 8,
  class: "ai-disclaimer"
}, kb = {
  key: 8,
  class: "rating-dialog"
}, Tb = { class: "rating-content" }, Ab = { class: "star-rating" }, Sb = ["onClick"], xb = { class: "rating-actions" }, Eb = ["disabled"], Cb = {
  key: 0,
  class: "preview-modal-image-container"
}, Rb = ["src", "alt"], Ib = { class: "preview-modal-filename" }, Lb = {
  key: 3,
  class: "widget-loading"
}, _c = 3, Ob = "image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx,.xls", Nb = /* @__PURE__ */ _a({
  __name: "WidgetBuilder",
  props: {
    widgetId: {},
    token: {},
    initialAuthError: {}
  },
  setup(e) {
    const t = e, n = ge(() => {
      var h;
      return t.widgetId || ((h = window.__INITIAL_DATA__) == null ? void 0 : h.widgetId);
    }), {
      customization: s,
      agentName: r,
      applyCustomization: i,
      initializeFromData: o
    } = l_(), { formatCurrency: a } = A_(), {
      messages: l,
      loading: p,
      errorMessage: u,
      showError: b,
      loadingHistory: w,
      hasStartedChat: U,
      connectionStatus: $,
      sendMessage: V,
      endChat: D,
      loadChatHistory: te,
      connect: fe,
      reconnect: de,
      cleanup: x,
      humanAgent: O,
      onTakeover: Y,
      refusal: X,
      submitRating: xe,
      submitForm: Le,
      currentForm: we,
      getWorkflowState: De,
      proceedWorkflow: Te,
      onWorkflowState: je,
      onWorkflowProceeded: Fe,
      currentSessionId: Ze,
      setToken: he,
      setWidgetId: ye,
      onSessionState: me,
      onReauthorize: Je
    } = n_(), { displayText: Qe, isStreaming: st } = f_(l, () => ws(() => as()));
    h_(l);
    const Ee = ue(""), Pt = ue(!0), rt = ue(""), Ce = ue(!1), Rt = (h) => {
      const g = h.target;
      Ee.value = g.value;
    };
    let pt = null;
    const vt = () => {
      pt && pt.disconnect(), pt = new MutationObserver((g) => {
        let c = !1, ne = !1;
        g.forEach((be) => {
          if (be.type === "childList") {
            const _e = Array.from(be.addedNodes).some(
              (ct) => {
                var Ge;
                return ct.nodeType === Node.ELEMENT_NODE && (ct.matches("input, textarea") || ((Ge = ct.querySelector) == null ? void 0 : Ge.call(ct, "input, textarea")));
              }
            ), ht = Array.from(be.removedNodes).some(
              (ct) => {
                var Ge;
                return ct.nodeType === Node.ELEMENT_NODE && (ct.matches("input, textarea") || ((Ge = ct.querySelector) == null ? void 0 : Ge.call(ct, "input, textarea")));
              }
            );
            _e && (ne = !0, c = !0), ht && (c = !0);
          }
        }), c && (clearTimeout(vt.timeoutId), vt.timeoutId = setTimeout(() => {
          E();
        }, ne ? 50 : 100));
      });
      const h = document.querySelector(".widget-container") || document.body;
      pt.observe(h, {
        childList: !0,
        subtree: !0
      });
    };
    vt.timeoutId = null;
    let Dt = [];
    const St = /* @__PURE__ */ new Set();
    let an = !1;
    const m = (h) => {
      if (an) return;
      const g = setTimeout(() => {
        St.delete(g), E();
      }, h);
      St.add(g);
    }, y = () => {
      St.forEach(clearTimeout), St.clear();
    }, E = () => {
      N();
      const h = [
        '.widget-container input[type="text"]',
        '.chat-container input[type="text"]',
        ".message-input input",
        ".welcome-message-field",
        ".ask-anything-field",
        'input[placeholder*="message"]',
        'input[placeholder*="Type"]',
        'input[placeholder*="Ask"]',
        "input.message-input",
        "textarea",
        // More specific selectors for the widget context
        ".widget-container input",
        ".chat-input input",
        "input"
      ];
      let g = [];
      for (const c of h) {
        const ne = document.querySelectorAll(c);
        if (ne.length > 0) {
          g = Array.from(ne);
          break;
        }
      }
      g.length !== 0 && (Dt = g, g.forEach((c) => {
        c.addEventListener("input", R, !0), c.addEventListener("keyup", R, !0), c.addEventListener("change", R, !0), c.addEventListener("keypress", K, !0), c.addEventListener("keydown", W, !0);
      }));
    }, N = () => {
      Dt.forEach((h) => {
        h.removeEventListener("input", R), h.removeEventListener("keyup", R), h.removeEventListener("change", R), h.removeEventListener("keypress", K), h.removeEventListener("keydown", W);
      }), Dt = [];
    }, F = (h) => !!(h && h.closest && h.closest(".form-message, .form-fullscreen, .cm-email-gate")), R = (h) => {
      if (F(h.target)) return;
      const g = h.target;
      Ee.value = g.value;
    }, K = (h) => {
      F(h.target) || h.key === "Enter" && !h.shiftKey && (h.preventDefault(), h.stopPropagation(), pn());
    }, W = (h) => {
      F(h.target) || h.key === "Enter" && !h.shiftKey && (h.preventDefault(), h.stopPropagation(), pn());
    }, j = (h) => {
      const g = h.target, c = document.querySelector(".header-menu-container");
      document.querySelector(".header-menu-btn");
      const ne = document.querySelector(".header-dropdown-menu");
      ne && !(c != null && c.contains(g)) && (ne.style.display = "none");
    }, H = ue(!0), {
      token: Z,
      start: G,
      stop: ie,
      setToken: le,
      ensureFresh: Ae
    } = Jg({
      onTokenChanged: (h) => {
        ys() && Ft({ type: "TOKEN_UPDATE", token: h }), he(h);
      },
      onIdentityExpired: () => {
        B();
      },
      // A framed widget holds the token only in memory: the host page keeps it, so
      // it must hear when the widget lets it go.
      onTokenCleared: () => {
        Jo() && ys() && Ft({ type: "TOKEN_CLEAR" });
      },
      store: qu(n.value || "")
    });
    ge(() => !!Z.value);
    const P = ue(null), I = ue(!1), Q = ue(!1);
    t.initialAuthError && (P.value = t.initialAuthError, I.value = !0, H.value = !1), o();
    const oe = window.__INITIAL_DATA__;
    G((oe == null ? void 0 : oe.widgetId) || "", oe == null ? void 0 : oe.initialToken), Z.value && (Ce.value = !0);
    const Ie = ue(!1);
    (oe == null ? void 0 : oe.allowAttachments) !== void 0 && (Ie.value = oe.allowAttachments);
    const f = ue(null), {
      chatStyles: _,
      chatIconStyles: L,
      agentBubbleStyles: S,
      userBubbleStyles: z,
      messageNameStyles: ee,
      headerBorderStyles: re,
      photoUrl: ve,
      shadowStyle: Oe
    } = rm(s), Ve = ue(null), {
      uploadedAttachments: Re,
      previewModal: it,
      previewFile: gt,
      formatFileSize: qt,
      isImageAttachment: Ss,
      getDownloadUrl: ns,
      getPreviewUrl: Ys,
      handleFileSelect: ss,
      handleDrop: rs,
      handleDragOver: jt,
      handleDragLeave: Cn,
      handlePaste: xs,
      removeAttachment: Xs,
      openPreview: Zs,
      closePreview: is,
      openFilePicker: Es,
      isImage: Js
    } = am(Z, Ve);
    ge(() => l.value.some(
      (h) => h.message_type === "form" && (!h.isSubmitted || h.isSubmitted === !1)
    ));
    const dn = ge(() => {
      var c;
      return l.value.some((ne) => {
        var be;
        return (be = ne.attributes) == null ? void 0 : be.end_chat;
      }) || l.value.some((ne) => ne.message_type === "rating") ? !1 : U.value && Ce.value || !so.value ? $.value === "connected" && !p.value : dr(rt.value.trim()) && $.value === "connected" && !p.value || ((c = window.__INITIAL_DATA__) == null ? void 0 : c.workflow);
    }), os = ge(() => dn.value || p.value && $.value === "connected" && U.value), Rn = ge(() => $.value === "connected" ? en.value ? "Ask me anything..." : "Type a message..." : "Connecting..."), Qs = ue(!1), pn = async () => {
      if (!Ee.value.trim() && Re.value.length === 0) return;
      if (p.value && U.value) {
        Qs.value = !0;
        return;
      }
      !U.value && rt.value && await gn();
      const h = Re.value.map((c) => ({
        content: c.content,
        // base64 content
        filename: c.filename,
        content_type: c.type,
        size: c.size
      }));
      await V(Ee.value, rt.value, h), Re.value.forEach((c) => {
        c.url && c.url.startsWith("blob:") && URL.revokeObjectURL(c.url), c.file_url && c.file_url.startsWith("blob:") && URL.revokeObjectURL(c.file_url);
      }), Ee.value = "", Re.value = [];
      const g = document.querySelector('input[placeholder*="Type a message"]');
      g && (g.value = ""), m(500);
    };
    $t(p, (h) => {
      h || !Qs.value || (Qs.value = !1, $.value === "connected" && U.value && pn());
    });
    const ot = (h) => {
      dn.value && (Ee.value = h, pn());
    }, ln = () => {
      Ft({ type: "WIDGET_MINIMIZE" });
    }, Hr = (h) => {
      h.key === "Enter" && !h.shiftKey && (h.preventDefault(), h.stopPropagation(), pn());
    }, gn = async ({ afterRefusal: h = !1 } = {}) => {
      var g, c, ne, be;
      try {
        if (!n.value)
          return console.error("Widget ID is not available"), P.value = "Widget ID is not available. Please refresh and try again.", I.value = !0, !1;
        await Ae(n.value);
        const _e = new URL(`${Ts.API_URL}/widgets/${n.value}`);
        rt.value.trim() && dr(rt.value.trim()) && _e.searchParams.append("email", rt.value.trim());
        const ht = {
          Accept: "application/json",
          "Content-Type": "application/json"
        };
        Z.value && (ht.Authorization = `Bearer ${Z.value}`);
        const ct = await fetch(_e, {
          headers: ht,
          cache: "no-store"
        });
        if (ct.status === 401) {
          Ce.value = !1;
          try {
            const Wn = (await ct.json()).detail;
            if ((Wn == null ? void 0 : Wn.code) === Kg)
              return B(), !1;
            const Ps = typeof Wn == "string" ? Wn : "";
            (Ps.includes("generate-token") || Ps.includes("API key") || Ps.includes("Token required")) && (Q.value = !0, P.value = "Widget authentication not configured. Please contact the website administrator.", I.value = !0, le(null));
          } catch {
            P.value = "Authentication required. Your token has expired or is invalid. Please refresh the page.", I.value = !0, le(null);
          }
          return !1;
        }
        if (!ct.ok) {
          try {
            const cr = await ct.json();
            P.value = cr.detail || `Error: ${ct.statusText}`;
          } catch {
            P.value = `Error: ${ct.statusText}. Please try again.`;
          }
          return I.value = !0, !1;
        }
        const Ge = await ct.json();
        Ge.token && le(Ge.token), Ce.value = !0, P.value = null, I.value = !1, he(Z.value || void 0);
        const lr = await fe();
        return !lr && Vo(X.value) && !h ? await gn({ afterRefusal: !0 }) : (lr || console.error("Chat service not reachable yet; retrying in the background"), await er(), (g = Ge.agent) != null && g.customization && i(Ge.agent.customization), Ge.agent && !(Ge != null && Ge.human_agent) && (r.value = Ge.agent.name), Ge != null && Ge.human_agent && (O.value = Ge.human_agent), ((c = Ge.agent) == null ? void 0 : c.allow_attachments) !== void 0 && (Ie.value = Ge.agent.allow_attachments), ((ne = Ge.agent) == null ? void 0 : ne.workflow) !== void 0 && (window.__INITIAL_DATA__ = window.__INITIAL_DATA__ || {}, window.__INITIAL_DATA__.workflow = Ge.agent.workflow), (be = Ge.agent) != null && be.workflow && await De(), !0);
      } catch (_e) {
        return console.error("Error checking authorization:", _e), P.value = "An unexpected error occurred. Please try again.", I.value = !0, Ce.value = !1, !1;
      } finally {
        H.value = !1;
      }
    }, er = async () => {
      !U.value && Ce.value && (U.value = !0, await te());
    }, as = () => {
      f.value && (f.value.scrollTop = f.value.scrollHeight);
    };
    $t(() => l.value, (h) => {
      ws(() => {
        as();
      });
    }, { deep: !0 }), $t($, (h, g) => {
      h === "connected" && g !== "connected" && m(100);
    }), $t(() => l.value.length, (h, g) => {
      h > 0 && g === 0 && m(100);
    });
    let tr = null;
    $t(() => l.value, (h) => {
      const g = h[h.length - 1];
      !nc(g) || g === tr || (tr = g, Rs(g));
    }, { deep: !0 });
    const Xi = async () => {
      (await de() || Vo(X.value)) && await gn();
    }, Wr = ue(!1), Cs = ue(0), nr = ue(""), bt = ue(0), Vt = ue(!1), at = ue({}), tt = ue(!1), dt = ue({}), Zt = ue(!1), Un = ue(null), qr = ue("Start Chat"), mn = ue(!1), Tt = ue(null);
    ge(() => {
      var g;
      const h = l.value[l.value.length - 1];
      return ((g = h == null ? void 0 : h.attributes) == null ? void 0 : g.request_rating) || !1;
    });
    const _n = ge(() => {
      var g;
      if (!((g = window.__INITIAL_DATA__) != null && g.workflow))
        return !1;
      const h = l.value.find((c) => c.message_type === "rating");
      return (h == null ? void 0 : h.isSubmitted) === !0;
    }), cn = ge(
      () => Oi(O.value.human_agent_profile_pic)
    ), Rs = async (h) => {
      var g, c, ne, be, _e;
      if (nc(h)) {
        try {
          if (h.session_id && Z.value && n.value) {
            const ht = await d(h.session_id, {
              reason: (g = h.attributes) == null ? void 0 : g.end_chat_reason,
              description: (c = h.attributes) == null ? void 0 : c.end_chat_description
            });
            if (ht.ok) {
              const ct = await ht.json();
              console.info(`✓ Chat session closed on backend: ${ct.session_id}`);
            } else
              console.warn(`Failed to close session on backend: ${ht.status}`);
          }
        } catch (ht) {
          console.error("Error calling end-chat API:", ht);
        }
        if ((ne = h.attributes) != null && ne.end_chat && ((be = h.attributes) != null && be.request_rating)) {
          const ht = h.agent_name || ((_e = O.value) == null ? void 0 : _e.human_agent_name) || r.value || "our agent";
          l.value.push({
            message: `Rate the chat session that you had with ${ht}`,
            message_type: "rating",
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            session_id: h.session_id,
            agent_name: ht,
            showFeedback: !1
          }), Ze.value = h.session_id;
        }
      }
    }, zn = (h) => {
      Vt.value || (bt.value = h);
    }, ls = () => {
      if (!Vt.value) {
        const h = l.value[l.value.length - 1];
        bt.value = (h == null ? void 0 : h.selectedRating) || 0;
      }
    }, Jt = async (h) => {
      if (!Vt.value) {
        bt.value = h;
        const g = l.value[l.value.length - 1];
        g && g.message_type === "rating" && (g.showFeedback = !0, g.selectedRating = h);
      }
    }, Zi = async (h, g, c = null) => {
      try {
        Vt.value = !0, await xe(g, c);
        const ne = l.value.find((be) => be.message_type === "rating");
        ne && (ne.isSubmitted = !0, ne.finalRating = g, ne.finalFeedback = c);
      } catch (ne) {
        console.error("Failed to submit rating:", ne);
      } finally {
        Vt.value = !1;
      }
    }, Is = (h) => {
      const g = {};
      for (const c of h.fields) {
        const ne = at.value[c.name], be = Ls(c, ne);
        be && (g[c.name] = be);
      }
      return dt.value = g, Object.keys(g).length === 0;
    }, Ji = async (h) => {
      if (!(tt.value || !Is(h)))
        try {
          tt.value = !0, await Le(at.value);
          const c = l.value.findIndex(
            (ne) => ne.message_type === "form" && (!ne.isSubmitted || ne.isSubmitted === !1)
          );
          c !== -1 && l.value.splice(c, 1), at.value = {}, dt.value = {};
        } catch (c) {
          console.error("Failed to submit form:", c);
        } finally {
          tt.value = !1;
        }
    }, xt = (h, g) => {
      var c, ne;
      if (at.value[h] = g, g && g.toString().trim() !== "") {
        let be = null;
        if ((c = Tt.value) != null && c.fields && (be = Tt.value.fields.find((_e) => _e.name === h)), !be && ((ne = we.value) != null && ne.fields) && (be = we.value.fields.find((_e) => _e.name === h)), be) {
          const _e = Ls(be, g);
          _e ? (dt.value[h] = _e, console.log(`Validation error for ${h}:`, _e)) : delete dt.value[h];
        }
      } else
        delete dt.value[h], console.log(`Cleared error for ${h}`);
    }, jr = (h) => {
      const g = h.replace(/\D/g, "");
      return g.length >= 7 && g.length <= 15;
    }, Ls = (h, g) => {
      if (h.required && (!g || g.toString().trim() === ""))
        return `${h.label} is required`;
      if (!g || g.toString().trim() === "")
        return null;
      if (h.type === "email" && !dr(g))
        return "Please enter a valid email address";
      if (h.type === "tel" && !jr(g))
        return "Please enter a valid phone number";
      if ((h.type === "text" || h.type === "textarea") && h.minLength && g.length < h.minLength)
        return `${h.label} must be at least ${h.minLength} characters`;
      if ((h.type === "text" || h.type === "textarea") && h.maxLength && g.length > h.maxLength)
        return `${h.label} must not exceed ${h.maxLength} characters`;
      if (h.type === "number") {
        const c = parseFloat(g);
        if (isNaN(c))
          return `${h.label} must be a valid number`;
        if (h.minLength && c < h.minLength)
          return `${h.label} must be at least ${h.minLength}`;
        if (h.maxLength && c > h.maxLength)
          return `${h.label} must not exceed ${h.maxLength}`;
      }
      return null;
    }, Vr = async () => {
      if (!(tt.value || !Tt.value))
        try {
          tt.value = !0, dt.value = {};
          let h = !1;
          for (const g of Tt.value.fields || []) {
            const c = at.value[g.name], ne = Ls(g, c);
            ne && (dt.value[g.name] = ne, h = !0, console.log(`Validation error for field ${g.name}:`, ne));
          }
          if (h) {
            tt.value = !1, console.log("Validation failed, not submitting");
            return;
          }
          await Le(at.value), mn.value = !1, Tt.value = null, at.value = {};
        } catch (h) {
          console.error("Failed to submit full screen form:", h);
        } finally {
          tt.value = !1, console.log("Full screen form submission completed");
        }
    }, Qi = (h, g) => {
      if (console.log("handleViewDetails called with:", { product: h, shopDomain: g }), !h) {
        console.error("No product provided to handleViewDetails");
        return;
      }
      let c = null;
      if (h.handle && g)
        c = `https://${g}/products/${h.handle}`;
      else if (h.id && g)
        c = `https://${g}/products/${h.id}`;
      else if (g) {
        if (!h.handle && !h.id) {
          console.error("Product handle and ID are both missing! Product:", h), alert("Unable to open product: Product information incomplete.");
          return;
        }
      } else {
        console.error("Shop domain is missing! Product:", h), alert("Unable to open product: Shop domain not available. Please contact support.");
        return;
      }
      c && (console.log("Opening product URL:", c), window.open(c, "_blank", "noopener"));
    }, Kr = (h) => {
      if (!h) return "";
      let g = h.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "");
      const c = [];
      return g = g.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (ne, be, _e) => {
        const ht = `__MARKDOWN_LINK_${c.length}__`;
        return console.log("Found markdown link:", ne, "-> placeholder:", ht), c.push(ne), ht;
      }), console.log("After replacing markdown links with placeholders:", g), console.log("Markdown links array:", c), g = g.replace(/https?:\/\/[^\s\)]+/g, "[link removed]"), console.log("After removing standalone URLs:", g), c.forEach((ne, be) => {
        g = g.replace(`__MARKDOWN_LINK_${be}__`, ne), console.log(`Restored markdown link ${be}:`, ne);
      }), g = g.replace(/\n\s*\n\s*\n/g, `

`).trim(), g;
    }, Gr = ue(!1);
    ue(!1);
    const sr = ge(() => {
      var h;
      return !!((h = O.value) != null && h.human_agent_name);
    }), rr = ge(() => {
      var h;
      return jg((h = window.__INITIAL_DATA__) == null ? void 0 : h.presence, sr.value);
    }), Os = ge(() => Ie.value && sr.value && Re.value.length < _c), ir = async () => {
      try {
        Zt.value = !1, Un.value = null, await Te();
      } catch (h) {
        console.error("Failed to proceed workflow:", h);
      }
    }, q = async (h) => {
      try {
        if (!h.userInputValue || !h.userInputValue.trim())
          return;
        const g = h.userInputValue.trim();
        h.isSubmitted = !0, h.submittedValue = g, await V(g, rt.value);
      } catch (g) {
        console.error("Failed to submit user input:", g), h.isSubmitted = !1, h.submittedValue = null;
      }
    }, d = (h, { reason: g, description: c, keepalive: ne = !1 } = {}) => {
      const be = new URL(`${Ts.API_URL}/widgets/${n.value}/end-chat`);
      return be.searchParams.append("session_id", h), g && be.searchParams.append("reason", g), c && be.searchParams.append("description", c), fetch(be, {
        method: "POST",
        keepalive: ne,
        headers: {
          Authorization: `Bearer ${Z.value}`,
          "Content-Type": "application/json"
        }
      });
    }, k = async (h) => {
      try {
        typeof h == "string" && h && Z.value && n.value && await d(h, { reason: "CUSTOMER_REQUEST", keepalive: !0 });
      } catch {
      } finally {
        Ft({ type: "END_CHAT_DONE" });
      }
    }, B = () => {
      if (!ys()) {
        J();
        return;
      }
      Ft({ type: "IDENTITY_EXPIRED" });
    }, J = async () => {
      Z.value && (le(null), await pe());
    }, ae = async (h) => {
      const g = Yn(h);
      !g || g === Z.value || (le(g), await pe());
    }, pe = async () => {
      var h, g, c;
      try {
        let ne = 0;
        const be = 50;
        for (; !((h = window.__INITIAL_DATA__) != null && h.widgetId) && ne < be; )
          await new Promise((ht) => setTimeout(ht, 100)), ne++;
        return (g = window.__INITIAL_DATA__) != null && g.widgetId ? (ye(window.__INITIAL_DATA__.widgetId), await gn() ? ((c = window.__INITIAL_DATA__) != null && c.workflow && Ce.value && await De(), !0) : ($.value = "connected", !1)) : (console.error("Widget data not available after waiting"), !1);
      } catch (ne) {
        return console.error("Failed to initialize widget:", ne), !1;
      }
    };
    window.addEventListener("message", (h) => {
      h.source === window.parent && (!h.data || typeof h.data.type != "string" || (h.data.type === "SCROLL_TO_BOTTOM" && as(), h.data.type === "HOST_PAGE" && Wu(h.data.url), h.data.type === "END_CHAT" && ys() && k(h.data.sessionId), h.data.type === "IDENTITY_UNAVAILABLE" && ys() && J(), h.data.type === "TOKEN_REFRESH" && ys() && ae(h.data.token), h.data.type === "WIDGET_VISIBILITY" && (Va.value = !!h.data.open), h.data.type === "WIDGET_DISPLAY" && (ro.value = {
        mode: h.data.mode,
        width: h.data.width,
        height: h.data.height,
        hotkey: h.data.hotkey
      }), h.data.type === "PREFILL_MESSAGE" && typeof h.data.text == "string" && (Ee.value = h.data.text.slice(0, 2e3), ws(() => {
        const g = document.querySelector(
          ".message-input input, .welcome-message-field"
        );
        g == null || g.focus();
      }))));
    }), window.addEventListener("keydown", (h) => {
      h.key !== "Escape" || h.defaultPrevented || !Jo() || Ft({ type: "WIDGET_ESCAPE" });
    });
    const Ke = () => {
      Y(async () => {
        await gn();
      }), Je(async () => {
        await gn();
      }), me(({ session_id: h, authenticated: g, created: c }) => {
        Ft({
          type: "CHAT_SESSION",
          sessionId: h,
          authenticated: g,
          created: c
        });
      }), je((h) => {
        var g;
        if (qr.value = h.button_text || "Start Chat", h.type === "landing_page")
          Un.value = h.landing_page_data, Zt.value = !0, mn.value = !1;
        else if (h.type === "form" || h.type === "display_form")
          if (((g = h.form_data) == null ? void 0 : g.form_full_screen) === !0)
            Tt.value = h.form_data, mn.value = !0, Zt.value = !1;
          else {
            const c = {
              message: "",
              message_type: "form",
              attributes: {
                form_data: h.form_data
              },
              created_at: (/* @__PURE__ */ new Date()).toISOString(),
              isSubmitted: !1
            };
            l.value.findIndex(
              (be) => be.message_type === "form" && !be.isSubmitted
            ) === -1 && l.value.push(c), Zt.value = !1, mn.value = !1;
          }
        else
          Zt.value = !1, mn.value = !1;
      }), Fe((h) => {
        console.log("Workflow proceeded:", h);
      });
    }, nt = async () => {
      try {
        await pe(), await De();
      } catch (h) {
        throw console.error("Failed to start new conversation:", h), h;
      }
    }, wt = ge(
      () => {
        var h;
        return s.value.allow_new_chat === !0 && l.value.length > 0 && !((h = O.value) != null && h.human_agent_name) && !us.value;
      }
    ), ut = ue(!1), Qt = ue(""), lt = ue(!1);
    let yn = null;
    const cs = () => {
      lt.value = !1, Qt.value = "", yn && (clearTimeout(yn), yn = null);
    }, Fa = () => {
      if (!ut.value) {
        if (lt.value) {
          cs();
          return;
        }
        lt.value = !0, Qt.value = "", yn = setTimeout(cs, dg);
      }
    };
    $t(wt, (h) => {
      h || cs();
    });
    const $a = async () => {
      ut.value || (yn && (clearTimeout(yn), yn = null), await rf(), Qt.value || (lt.value = !1));
    }, rf = async () => {
      if (!ut.value) {
        ut.value = !0, Qt.value = "";
        try {
          if (!await D()) {
            Qt.value = tc;
            return;
          }
          O.value = {}, Ee.value = "", Re.value = [], await pe();
        } catch (h) {
          console.error("Failed to start a new chat:", h), Qt.value = tc;
        } finally {
          ut.value = !1;
        }
      }
    }, of = async () => {
      _n.value = !1, l.value = [], O.value = {}, await nt();
    };
    Hi(async () => {
      await pe(), Ke(), vt(), document.addEventListener("click", j), (() => {
        const g = l.value.length > 0, c = $.value === "connected", ne = document.querySelector('input[type="text"], textarea') !== null;
        return g || c || ne;
      })() && m(100);
    }), Br(() => {
      window.removeEventListener("message", (h) => {
        h.data.type === "SCROLL_TO_BOTTOM" && as();
      }), document.removeEventListener("click", j), pt && (pt.disconnect(), pt = null), vt.timeoutId && (clearTimeout(vt.timeoutId), vt.timeoutId = null), an = !0, y(), N(), ie(), cs(), x();
    });
    const Ns = ge(() => s.value.chat_style === "AURORA"), en = ge(() => s.value.chat_style === "ASK_ANYTHING" || Ns.value), Ba = ge(() => s.value.customization_metadata), Yr = ge(() => {
      var g;
      const h = (g = Ba.value) == null ? void 0 : g.avatar_style;
      return h === "orb" ? !0 : h === "photo" ? !1 : Ns.value && !s.value.photo_url;
    }), or = ge(() => {
      var h;
      return Wg(r.value || "", (h = Ba.value) == null ? void 0 : h.orb_variant);
    }), af = {
      GLASS: "theme-glass",
      TERMINAL: "theme-terminal",
      PLAYFUL: "theme-playful",
      CALM_MINT: "theme-calm",
      SUNRISE: "theme-sunrise"
    }, lf = ge(() => af[s.value.chat_style] || ""), cf = ge(() => T_(s.value.chat_style, {
      chat_background_color: s.value.chat_background_color,
      chat_text_color: s.value.chat_text_color,
      accent_color: s.value.accent_color,
      font_family: s.value.font_family
    })), eo = ge(
      () => Array.isArray(s.value.quick_actions) ? s.value.quick_actions.filter((h) => !!h && h.trim().length > 0) : []
    ), Ua = ge(() => (s.value.welcome_message || "").trim()), za = ge(
      () => !en.value && l.value.length === 0 && !w.value && !us.value
    ), uf = ge(
      () => za.value && Ua.value.length > 0
    ), ff = ge(
      () => za.value && !_n.value && eo.value.length > 0
    ), Xr = ge(() => s.value.show_citations === !0), Ha = ge(() => qg(s.value.show_ai_disclaimer, sr.value)), hf = (h) => /^[0-9a-f]{16,}$/i.test(h) || /^[0-9a-f-]{32,}$/i.test(h), to = (h) => {
      const g = (h || "").trim().toLowerCase();
      return !g || g === "unknown" ? "Knowledge base" : g.charAt(0).toUpperCase() + g.slice(1);
    }, no = (h) => {
      let g = ((h == null ? void 0 : h.name) || "").trim();
      return !g || (g = g.replace(/^[0-9a-f]{16,}[_-]/i, "").replace(/\.(pdf|txt|md|html?|docx?|csv|json)$/i, ""), !g || hf(g)) ? to(h == null ? void 0 : h.type) : g;
    }, Wa = (h) => {
      const g = no(h), c = to(h == null ? void 0 : h.type);
      return g === c ? c : `${g} · ${c}`;
    }, so = ge(() => s.value.collect_email === !0 && !en.value), qa = ue(!1), Hn = ue(""), ar = ue(!1), us = ge(() => !U.value && so.value && !qa.value), ja = async () => {
      const h = rt.value.trim();
      if (!h) {
        Hn.value = "Please enter your email address.";
        return;
      }
      if (!dr(h)) {
        Hn.value = "Please enter a valid email address.";
        return;
      }
      Hn.value = "", ar.value = !0;
      try {
        await gn(), qa.value = !0;
      } catch {
        Hn.value = "Something went wrong. Please try again.";
      } finally {
        ar.value = !1;
      }
    }, ro = ue(null), Va = ue(!0), io = { mode: "floating", width: 400, height: 560 }, Zr = ge(
      () => {
        var h;
        return ro.value || ((h = s.value.customization_metadata) == null ? void 0 : h.widget_display) || null;
      }
    ), df = ge(() => {
      const h = Zr.value;
      return h ? typeof h.mode == "string" && h.mode !== io.mode || typeof h.width == "number" && h.width !== io.width || typeof h.height == "number" && h.height !== io.height : !1;
    }), pf = ge(() => {
      var g;
      const h = {
        width: "100%",
        height: "100%",
        borderRadius: "var(--radius-lg)"
      };
      if (df.value) {
        const c = (g = Zr.value) == null ? void 0 : g.mode;
        return c === "sidebar-left" || c === "sidebar-right" ? { ...h, borderRadius: "0" } : h;
      }
      return en.value ? window.innerWidth <= 768 ? {
        ...h,
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
        minWidth: "unset",
        borderRadius: "0"
      } : window.innerWidth <= 1024 ? {
        ...h,
        width: "95%",
        maxWidth: "700px",
        minWidth: "500px",
        height: "650px"
      } : {
        ...h,
        width: "100%",
        maxWidth: "400px",
        minWidth: "400px",
        height: "580px"
      } : h;
    }), Ka = ge(() => en.value && l.value.length === 0), gf = ["form", "user_input", "rating", "product", "shopify_output"], mf = ge(
      () => l.value.some(
        (h) => gf.includes(h.message_type) || Array.isArray(h.attachments) && h.attachments.length > 0
      )
    ), _f = ge(() => {
      var g, c;
      return en.value ? !0 : (((g = Zr.value) == null ? void 0 : g.mode) === "ask-ai" || ((c = Zr.value) == null ? void 0 : c.mode) === "search-bar") && !Ie.value;
    }), oo = ge(
      () => _f.value && Pt.value && !Zt.value && !mn.value && !us.value && !_n.value && !mf.value
    );
    $t(oo, (h) => {
      Ft({ type: "WIDGET_SURFACE", palette: h });
    }, { immediate: !0 });
    const yf = ge(
      () => s.value.welcome_subtitle || `Ask a question — ${r.value || "the assistant"} answers from what it knows.`
    ), vf = ge(() => {
      var h;
      return ((h = ro.value) == null ? void 0 : h.hotkey) !== !1;
    });
    return (h, g) => I.value && Q.value ? (T(), A("div", S_, [
      v("button", {
        type: "button",
        class: "cm-error-close",
        "aria-label": "Close chat",
        title: "Close",
        onClick: ln
      }, "×"),
      g[20] || (g[20] = mo('<div class="widget-unavailable-card" data-v-575202d9><div class="widget-unavailable-icon-wrapper" data-v-575202d9><svg class="widget-unavailable-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-575202d9><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-575202d9></path><path d="M9 12l2 2 4-4" data-v-575202d9></path></svg></div><h2 class="widget-unavailable-title" data-v-575202d9>Chat Unavailable</h2><p class="widget-unavailable-message" data-v-575202d9> This chat widget is not currently configured. Please contact the website administrator to enable chat support. </p><div class="widget-unavailable-footer" data-v-575202d9><svg class="chattermate-logo-small" width="14" height="14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-575202d9><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-575202d9></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-575202d9></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-575202d9></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-575202d9></circle></svg></div></div>', 1))
    ])) : I.value ? (T(), A("div", x_, [
      v("button", {
        type: "button",
        class: "cm-error-close",
        "aria-label": "Close chat",
        title: "Close",
        onClick: ln
      }, "×"),
      v("div", E_, [
        g[21] || (g[21] = mo('<div class="auth-error-header" data-v-575202d9><svg class="auth-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-575202d9><circle cx="12" cy="12" r="10" data-v-575202d9></circle><line x1="12" y1="8" x2="12" y2="12" data-v-575202d9></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-575202d9></line></svg><h2 data-v-575202d9>Authentication Error</h2></div>', 1)),
        v("p", C_, se(P.value), 1),
        v("button", {
          class: "auth-error-refresh-btn",
          onClick: g[0] || (g[0] = () => h.window.location.reload())
        }, " Refresh Page ")
      ])
    ])) : n.value && !I.value ? (T(), A("div", {
      key: 2,
      class: $e(["chat-container cm-surface", [{ collapsed: !Pt.value, "ask-anything-style": en.value, aurora: Ns.value }, lf.value]]),
      style: Pe({ ...C(Oe), ...pf.value, ...cf.value })
    }, [
      H.value ? (T(), A("div", R_, g[22] || (g[22] = [
        mo('<div class="loading-spinner" data-v-575202d9><div class="dot" data-v-575202d9></div><div class="dot" data-v-575202d9></div><div class="dot" data-v-575202d9></div></div><div class="loading-text" data-v-575202d9>Initializing chat...</div>', 2)
      ]))) : ce("", !0),
      !H.value && C($) !== "connected" ? (T(), A("div", {
        key: 1,
        class: $e(["connection-status", C($)])
      }, [
        C($) === "connecting" ? (T(), A("div", I_, g[23] || (g[23] = [
          Ln(" Connecting to chat service... ", -1),
          v("div", { class: "loading-dots" }, [
            v("div", { class: "dot" }),
            v("div", { class: "dot" }),
            v("div", { class: "dot" })
          ], -1)
        ]))) : C($) === "failed" ? (T(), A("div", L_, [
          g[24] || (g[24] = Ln(" Connection failed. ", -1)),
          v("button", {
            onClick: Xi,
            class: "reconnect-button"
          }, " Click here to reconnect ")
        ])) : ce("", !0)
      ], 2)) : ce("", !0),
      C(b) ? (T(), A("div", {
        key: 2,
        class: "error-alert",
        style: Pe(C(L))
      }, se(C(u)), 5)) : ce("", !0),
      oo.value ? (T(), Si(Ug, {
        key: 3,
        messages: C(l),
        draft: Ee.value,
        "agent-name": C(r),
        suggestions: eo.value,
        "welcome-title": C(s).welcome_title,
        "welcome-subtitle": yf.value,
        placeholder: Rn.value,
        "input-enabled": dn.value,
        "typing-enabled": os.value,
        loading: C(p),
        "show-citations": Xr.value,
        disclaimer: Ha.value ? C(sc) : "",
        active: Va.value,
        hotkey: vf.value,
        "can-start-new-chat": wt.value,
        "starting-new-chat": ut.value,
        "new-chat-armed": lt.value,
        "new-chat-error": Qt.value,
        onNewChat: Fa,
        onConfirmNewChat: $a,
        onCancelNewChat: cs,
        "citation-label": no,
        "citation-tooltip": Wa,
        "display-text": C(Qe),
        "is-streaming": C(st),
        "onUpdate:draft": g[1] || (g[1] = (c) => Ee.value = c),
        onSend: pn,
        onAsk: ot,
        onClose: ln
      }, null, 8, ["messages", "draft", "agent-name", "suggestions", "welcome-title", "welcome-subtitle", "placeholder", "input-enabled", "typing-enabled", "loading", "show-citations", "disclaimer", "active", "hotkey", "can-start-new-chat", "starting-new-chat", "new-chat-armed", "new-chat-error", "display-text", "is-streaming"])) : Ka.value ? (T(), A("div", {
        key: 4,
        class: $e(["welcome-message-section", { aurora: Ns.value }]),
        style: Pe(C(_))
      }, [
        v("div", O_, [
          v("div", N_, [
            Yr.value ? (T(), A("div", {
              key: 0,
              class: "welcome-orb",
              style: Pe(or.value)
            }, null, 4)) : C(ve) ? (T(), A("img", {
              key: 1,
              src: C(ve),
              alt: C(r),
              class: "welcome-avatar"
            }, null, 8, P_)) : ce("", !0),
            v("h1", D_, se(C(s).welcome_title || `Welcome to ${C(r)}`), 1),
            v("p", M_, se(C(s).welcome_subtitle || "I'm here to help you with anything you need. What can I assist you with today?"), 1)
          ])
        ]),
        v("div", F_, [
          !C(U) && !Ce.value && so.value ? (T(), A("div", $_, [
            qn(v("input", {
              "onUpdate:modelValue": g[2] || (g[2] = (c) => rt.value = c),
              type: "email",
              placeholder: "Enter your email address",
              disabled: C(p) || C($) !== "connected",
              class: $e([{
                invalid: rt.value.trim() && !C(dr)(rt.value.trim()),
                disabled: C($) !== "connected"
              }, "welcome-email-input"])
            }, null, 10, B_), [
              [ds, rt.value]
            ])
          ])) : ce("", !0),
          v("div", U_, [
            qn(v("input", {
              "onUpdate:modelValue": g[3] || (g[3] = (c) => Ee.value = c),
              type: "text",
              placeholder: Rn.value,
              onKeypress: Hr,
              onInput: Rt,
              onChange: Rt,
              disabled: !os.value,
              class: $e([{ disabled: !os.value }, "welcome-message-field"])
            }, null, 42, z_), [
              [ds, Ee.value]
            ]),
            v("button", {
              class: $e(["welcome-send-button", { "aurora-send": Ns.value }]),
              style: Pe(C(z)),
              onClick: pn,
              disabled: !Ee.value.trim() || !dn.value
            }, [
              Ns.value ? (T(), A("svg", W_, g[25] || (g[25] = [
                v("path", {
                  d: "M12 19V5M12 5L5 12M12 5L19 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1)
              ]))) : (T(), A("svg", q_, g[26] || (g[26] = [
                v("path", {
                  d: "M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1)
              ])))
            ], 14, H_)
          ])
        ])
      ], 6)) : ce("", !0),
      Zt.value && Un.value ? (T(), A("div", {
        key: 5,
        class: "landing-page-fullscreen",
        style: Pe(C(_))
      }, [
        v("div", j_, [
          v("div", V_, [
            v("h2", K_, se(Un.value.heading), 1),
            v("div", G_, se(Un.value.content), 1)
          ]),
          v("div", Y_, [
            v("button", {
              class: "landing-page-button",
              onClick: ir
            }, se(qr.value), 1)
          ])
        ])
      ], 4)) : mn.value && Tt.value ? (T(), A("div", {
        key: 6,
        class: "form-fullscreen",
        style: Pe(C(_))
      }, [
        v("div", X_, [
          Tt.value.title || Tt.value.description ? (T(), A("div", Z_, [
            Tt.value.title ? (T(), A("h2", J_, se(Tt.value.title), 1)) : ce("", !0),
            Tt.value.description ? (T(), A("p", Q_, se(Tt.value.description), 1)) : ce("", !0)
          ])) : ce("", !0),
          v("div", ey, [
            (T(!0), A(Be, null, Et(Tt.value.fields, (c) => {
              var ne, be;
              return T(), A("div", {
                key: c.name,
                class: "form-field"
              }, [
                v("label", {
                  for: `fullscreen-form-${c.name}`,
                  class: "field-label"
                }, [
                  Ln(se(c.label) + " ", 1),
                  c.required ? (T(), A("span", ny, "*")) : ce("", !0)
                ], 8, ty),
                c.type === "text" || c.type === "email" || c.type === "tel" ? (T(), A("input", {
                  key: 0,
                  id: `fullscreen-form-${c.name}`,
                  type: c.type,
                  placeholder: c.placeholder || "",
                  required: c.required,
                  minlength: c.minLength,
                  maxlength: c.maxLength,
                  value: at.value[c.name] || "",
                  onInput: (_e) => xt(c.name, _e.target.value),
                  onBlur: (_e) => xt(c.name, _e.target.value),
                  class: $e(["form-input", { error: dt.value[c.name] }]),
                  autocomplete: c.type === "email" ? "email" : c.type === "tel" ? "tel" : "off",
                  inputmode: c.type === "tel" ? "tel" : c.type === "email" ? "email" : "text"
                }, null, 42, sy)) : c.type === "number" ? (T(), A("input", {
                  key: 1,
                  id: `fullscreen-form-${c.name}`,
                  type: "number",
                  placeholder: c.placeholder || "",
                  required: c.required,
                  min: c.minLength,
                  max: c.maxLength,
                  value: at.value[c.name] || "",
                  onInput: (_e) => xt(c.name, _e.target.value),
                  class: $e(["form-input", { error: dt.value[c.name] }])
                }, null, 42, ry)) : c.type === "textarea" ? (T(), A("textarea", {
                  key: 2,
                  id: `fullscreen-form-${c.name}`,
                  placeholder: c.placeholder || "",
                  required: c.required,
                  minlength: c.minLength,
                  maxlength: c.maxLength,
                  value: at.value[c.name] || "",
                  onInput: (_e) => xt(c.name, _e.target.value),
                  class: $e(["form-textarea", { error: dt.value[c.name] }]),
                  rows: "4"
                }, null, 42, iy)) : c.type === "select" ? (T(), A("select", {
                  key: 3,
                  id: `fullscreen-form-${c.name}`,
                  required: c.required,
                  value: at.value[c.name] || "",
                  onChange: (_e) => xt(c.name, _e.target.value),
                  class: $e(["form-select", { error: dt.value[c.name] }])
                }, [
                  v("option", ay, se(c.placeholder || "Please select..."), 1),
                  (T(!0), A(Be, null, Et((Array.isArray(c.options) ? c.options : ((ne = c.options) == null ? void 0 : ne.split(`
`)) || []).filter((_e) => _e.trim()), (_e) => (T(), A("option", {
                    key: _e,
                    value: _e.trim()
                  }, se(_e.trim()), 9, ly))), 128))
                ], 42, oy)) : c.type === "checkbox" ? (T(), A("label", cy, [
                  v("input", {
                    id: `fullscreen-form-${c.name}`,
                    type: "checkbox",
                    required: c.required,
                    checked: at.value[c.name] || !1,
                    onChange: (_e) => xt(c.name, _e.target.checked),
                    class: "form-checkbox"
                  }, null, 40, uy),
                  v("span", fy, se(c.label), 1)
                ])) : c.type === "radio" ? (T(), A("div", hy, [
                  (T(!0), A(Be, null, Et((Array.isArray(c.options) ? c.options : ((be = c.options) == null ? void 0 : be.split(`
`)) || []).filter((_e) => _e.trim()), (_e) => (T(), A("label", {
                    key: _e,
                    class: "radio-field"
                  }, [
                    v("input", {
                      type: "radio",
                      name: `fullscreen-form-${c.name}`,
                      value: _e.trim(),
                      required: c.required,
                      checked: at.value[c.name] === _e.trim(),
                      onChange: (ht) => xt(c.name, _e.trim()),
                      class: "form-radio"
                    }, null, 40, dy),
                    v("span", py, se(_e.trim()), 1)
                  ]))), 128))
                ])) : ce("", !0),
                dt.value[c.name] ? (T(), A("div", gy, se(dt.value[c.name]), 1)) : ce("", !0)
              ]);
            }), 128))
          ]),
          v("div", my, [
            v("button", {
              onClick: g[4] || (g[4] = () => {
                console.log("Submit button clicked!"), Vr();
              }),
              disabled: tt.value,
              class: "submit-form-button",
              style: Pe(C(z))
            }, [
              tt.value ? (T(), A("span", yy, g[27] || (g[27] = [
                v("div", { class: "dot" }, null, -1),
                v("div", { class: "dot" }, null, -1),
                v("div", { class: "dot" }, null, -1)
              ]))) : (T(), A("span", vy, se(Tt.value.submit_button_text || "Submit"), 1))
            ], 12, _y)
          ])
        ])
      ], 4)) : !Ka.value && Pt.value && !oo.value ? (T(), A("div", {
        key: 7,
        class: $e(["chat-panel", { "ask-anything-chat": en.value }]),
        style: Pe(C(_))
      }, [
        en.value ? (T(), A("div", {
          key: 1,
          class: "ask-anything-top",
          style: Pe(C(re))
        }, [
          v("div", Ey, [
            cn.value || C(ve) ? (T(), A("img", {
              key: 0,
              src: cn.value || C(ve),
              alt: C(O).human_agent_name || C(r),
              class: "header-avatar"
            }, null, 8, Cy)) : ce("", !0),
            v("div", Ry, [
              v("h3", {
                style: Pe(C(ee))
              }, se(C(r)), 5),
              v("p", {
                class: "ask-anything-subtitle",
                style: Pe(C(ee))
              }, se(C(s).welcome_subtitle || "Ask me anything. I'm here to help."), 5)
            ])
          ])
        ], 4)) : (T(), A("div", {
          key: 0,
          class: "chat-header",
          style: Pe(C(re))
        }, [
          v("div", {
            class: "cm-header-sheen",
            style: Pe({ background: "linear-gradient(90deg, transparent, " + (C(s).accent_color || "#C9F24E") + ", transparent)" })
          }, null, 4),
          v("div", by, [
            !cn.value && (Yr.value || !C(ve)) ? (T(), A("div", {
              key: 0,
              class: "header-orb",
              style: Pe(or.value)
            }, null, 4)) : cn.value || C(ve) ? (T(), A("img", {
              key: 1,
              src: cn.value || C(ve),
              alt: C(O).human_agent_name || C(r),
              class: "header-avatar"
            }, null, 8, wy)) : ce("", !0),
            v("div", ky, [
              v("h3", {
                style: Pe(C(ee))
              }, se(C(O).human_agent_name || C(r)), 5),
              v("div", Ty, [
                v("span", {
                  class: $e(["status-indicator", rr.value.online ? "online" : "away"])
                }, null, 2),
                v("span", Ay, se(rr.value.text), 1)
              ])
            ])
          ]),
          v("div", Sy, [
            wt.value ? (T(), A("button", {
              key: 0,
              type: "button",
              class: $e(["header-new-chat", { armed: lt.value }]),
              style: Pe(C(ee)),
              disabled: ut.value,
              title: C(Li),
              "aria-label": C(Li),
              "aria-expanded": lt.value,
              onClick: Fa
            }, g[28] || (g[28] = [
              v("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "aria-hidden": "true"
              }, [
                v("path", { d: "M12 20h9" }),
                v("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" })
              ], -1)
            ]), 14, xy)) : ce("", !0),
            v("button", {
              type: "button",
              class: "header-minimize",
              style: Pe(C(ee)),
              title: "Minimize",
              "aria-label": "Minimize chat",
              onClick: ln
            }, g[29] || (g[29] = [
              v("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "aria-hidden": "true"
              }, [
                v("path", { d: "M6 9l6 6 6-6" })
              ], -1)
            ]), 4)
          ])
        ], 4)),
        C(w) ? (T(), A("div", Iy, g[30] || (g[30] = [
          v("div", { class: "loading-spinner" }, [
            v("div", { class: "dot" }),
            v("div", { class: "dot" }),
            v("div", { class: "dot" })
          ], -1)
        ]))) : ce("", !0),
        us.value ? (T(), A("div", {
          key: 3,
          class: "cm-email-gate",
          style: Pe(C(_))
        }, [
          v("div", {
            class: "cm-email-gate-orb",
            style: Pe(or.value)
          }, null, 4),
          v("h3", Ly, se(C(s).welcome_title || "Before we start"), 1),
          g[31] || (g[31] = v("p", { class: "cm-email-gate-text" }, "Enter your email and we'll continue the chat.", -1)),
          qn(v("input", {
            "onUpdate:modelValue": g[5] || (g[5] = (c) => rt.value = c),
            type: "email",
            inputmode: "email",
            autocomplete: "email",
            placeholder: "you@example.com",
            class: $e(["cm-email-gate-input", { invalid: !!Hn.value }]),
            disabled: ar.value,
            onKeyup: ui(ja, ["enter"]),
            onInput: g[6] || (g[6] = (c) => Hn.value = "")
          }, null, 42, Oy), [
            [ds, rt.value]
          ]),
          Hn.value ? (T(), A("p", Ny, se(Hn.value), 1)) : ce("", !0),
          v("button", {
            type: "button",
            class: "cm-email-gate-btn",
            style: Pe(C(z)),
            disabled: ar.value,
            onClick: ja
          }, se(ar.value ? "Please wait…" : "Continue to chat"), 13, Py)
        ], 4)) : ce("", !0),
        lt.value && wt.value ? (T(), Si(Fu, {
          key: 4,
          busy: ut.value,
          error: Qt.value,
          onConfirm: $a,
          onCancel: cs
        }, null, 8, ["busy", "error"])) : ce("", !0),
        qn(v("div", {
          class: "chat-messages",
          ref_key: "messagesContainer",
          ref: f,
          role: "log",
          "aria-label": "Messages"
        }, [
          uf.value ? (T(), A("div", Dy, [
            v("div", My, [
              Yr.value || !C(ve) ? (T(), A("div", {
                key: 0,
                class: "cm-welcome-orb",
                style: Pe(or.value)
              }, null, 4)) : (T(), A("img", {
                key: 1,
                src: C(ve),
                alt: C(r),
                class: "cm-welcome-avatar"
              }, null, 8, Fy)),
              v("div", {
                class: "message-bubble cm-welcome-bubble",
                style: Pe(C(S))
              }, se(Ua.value), 5)
            ])
          ])) : ce("", !0),
          (T(!0), A(Be, null, Et(C(l), (c, ne) => {
            var be, _e, ht, ct, Ge, lr, cr, Wn, Ps, Ga, Ya, Xa, Za, Ja, Qa, el, tl, nl, sl;
            return T(), A("div", {
              key: ne,
              class: $e([
                "message",
                c.message_type === "bot" || c.message_type === "agent" ? "agent-message" : c.message_type === "system" ? "system-message" : c.message_type === "rating" ? "rating-message" : c.message_type === "form" ? "form-message" : c.message_type === "product" || c.shopify_output ? "product-message" : "user-message"
              ])
            }, [
              c.message_type === "bot" || c.message_type === "agent" ? (T(), A("div", $y, [
                cn.value ? (T(), A("img", {
                  key: 0,
                  src: cn.value,
                  class: "cm-msg-avatar-img",
                  alt: ""
                }, null, 8, By)) : !Yr.value && C(ve) ? (T(), A("img", {
                  key: 1,
                  src: C(ve),
                  class: "cm-msg-avatar-img",
                  alt: ""
                }, null, 8, Uy)) : (T(), A("div", {
                  key: 2,
                  class: "cm-msg-avatar-orb",
                  style: Pe(or.value)
                }, null, 4))
              ])) : ce("", !0),
              v("div", zy, [
                v("div", {
                  class: "message-bubble",
                  style: Pe(c.message_type === "system" || c.message_type === "rating" || c.message_type === "form" || c.message_type === "product" || c.shopify_output ? {} : c.message_type === "user" ? C(z) : C(S))
                }, [
                  c.message_type === "rating" ? (T(), A("div", Hy, [
                    v("p", Wy, "Rate the chat session that you had with " + se(c.agent_name || C(O).human_agent_name || C(r) || "our agent"), 1),
                    v("div", {
                      class: $e(["star-rating", { submitted: Vt.value || c.isSubmitted }])
                    }, [
                      (T(), A(Be, null, Et(5, (M) => v("button", {
                        key: M,
                        class: $e(["star-button", {
                          warning: M <= (c.isSubmitted ? c.finalRating : bt.value || c.selectedRating) && (c.isSubmitted ? c.finalRating : bt.value || c.selectedRating) <= 3,
                          success: M <= (c.isSubmitted ? c.finalRating : bt.value || c.selectedRating) && (c.isSubmitted ? c.finalRating : bt.value || c.selectedRating) > 3,
                          selected: M <= (c.isSubmitted ? c.finalRating : bt.value || c.selectedRating)
                        }]),
                        onMouseover: (un) => !c.isSubmitted && zn(M),
                        onMouseleave: (un) => !c.isSubmitted && ls,
                        onClick: (un) => !c.isSubmitted && Jt(M),
                        disabled: Vt.value || c.isSubmitted
                      }, " ★ ", 42, qy)), 64))
                    ], 2),
                    c.showFeedback && !c.isSubmitted ? (T(), A("div", jy, [
                      v("div", Vy, [
                        qn(v("input", {
                          "onUpdate:modelValue": (M) => c.feedback = M,
                          placeholder: "Please share your feedback (optional)",
                          disabled: Vt.value,
                          maxlength: "500",
                          class: "feedback-input"
                        }, null, 8, Ky), [
                          [ds, c.feedback]
                        ]),
                        v("div", Gy, se(((be = c.feedback) == null ? void 0 : be.length) || 0) + "/500", 1)
                      ]),
                      v("button", {
                        onClick: (M) => Zi(c.session_id, bt.value, c.feedback),
                        disabled: Vt.value || !bt.value,
                        class: "submit-rating-button",
                        style: Pe({ backgroundColor: C(s).accent_color || "var(--accent-solid)" })
                      }, se(Vt.value ? "Submitting..." : "Submit Rating"), 13, Yy)
                    ])) : ce("", !0),
                    c.isSubmitted && c.finalFeedback ? (T(), A("div", Xy, [
                      v("div", Zy, [
                        v("p", Jy, se(c.finalFeedback), 1)
                      ])
                    ])) : c.isSubmitted ? (T(), A("div", Qy, " Thank you for your rating! ")) : ce("", !0)
                  ])) : c.message_type === "form" ? (T(), A("div", ev, [
                    (ht = (_e = c.attributes) == null ? void 0 : _e.form_data) != null && ht.title || (Ge = (ct = c.attributes) == null ? void 0 : ct.form_data) != null && Ge.description ? (T(), A("div", tv, [
                      (cr = (lr = c.attributes) == null ? void 0 : lr.form_data) != null && cr.title ? (T(), A("h3", nv, se(c.attributes.form_data.title), 1)) : ce("", !0),
                      (Ps = (Wn = c.attributes) == null ? void 0 : Wn.form_data) != null && Ps.description ? (T(), A("p", sv, se(c.attributes.form_data.description), 1)) : ce("", !0)
                    ])) : ce("", !0),
                    v("div", rv, [
                      (T(!0), A(Be, null, Et((Ya = (Ga = c.attributes) == null ? void 0 : Ga.form_data) == null ? void 0 : Ya.fields, (M) => {
                        var un, ao;
                        return T(), A("div", {
                          key: M.name,
                          class: "form-field"
                        }, [
                          v("label", {
                            for: `form-${M.name}`,
                            class: "field-label"
                          }, [
                            Ln(se(M.label) + " ", 1),
                            M.required ? (T(), A("span", ov, "*")) : ce("", !0)
                          ], 8, iv),
                          M.type === "text" || M.type === "email" || M.type === "tel" ? (T(), A("input", {
                            key: 0,
                            id: `form-${M.name}`,
                            type: M.type,
                            placeholder: M.placeholder || "",
                            required: M.required,
                            minlength: M.minLength,
                            maxlength: M.maxLength,
                            value: at.value[M.name] || "",
                            onInput: (ze) => xt(M.name, ze.target.value),
                            onBlur: (ze) => xt(M.name, ze.target.value),
                            class: $e(["form-input", { error: dt.value[M.name] }]),
                            disabled: tt.value,
                            autocomplete: M.type === "email" ? "email" : M.type === "tel" ? "tel" : "off",
                            inputmode: M.type === "tel" ? "tel" : M.type === "email" ? "email" : "text"
                          }, null, 42, av)) : M.type === "number" ? (T(), A("input", {
                            key: 1,
                            id: `form-${M.name}`,
                            type: "number",
                            placeholder: M.placeholder || "",
                            required: M.required,
                            min: M.min,
                            max: M.max,
                            value: at.value[M.name] || "",
                            onInput: (ze) => xt(M.name, ze.target.value),
                            class: $e(["form-input", { error: dt.value[M.name] }]),
                            disabled: tt.value
                          }, null, 42, lv)) : M.type === "textarea" ? (T(), A("textarea", {
                            key: 2,
                            id: `form-${M.name}`,
                            placeholder: M.placeholder || "",
                            required: M.required,
                            minlength: M.minLength,
                            maxlength: M.maxLength,
                            value: at.value[M.name] || "",
                            onInput: (ze) => xt(M.name, ze.target.value),
                            class: $e(["form-textarea", { error: dt.value[M.name] }]),
                            disabled: tt.value,
                            rows: "3"
                          }, null, 42, cv)) : M.type === "select" ? (T(), A("select", {
                            key: 3,
                            id: `form-${M.name}`,
                            required: M.required,
                            value: at.value[M.name] || "",
                            onChange: (ze) => xt(M.name, ze.target.value),
                            class: $e(["form-select", { error: dt.value[M.name] }]),
                            disabled: tt.value
                          }, [
                            v("option", fv, se(M.placeholder || "Select an option"), 1),
                            (T(!0), A(Be, null, Et((Array.isArray(M.options) ? M.options : ((un = M.options) == null ? void 0 : un.split(`
`)) || []).filter((ze) => ze.trim()), (ze) => (T(), A("option", {
                              key: ze.trim(),
                              value: ze.trim()
                            }, se(ze.trim()), 9, hv))), 128))
                          ], 42, uv)) : M.type === "checkbox" ? (T(), A("div", dv, [
                            v("input", {
                              id: `form-${M.name}`,
                              type: "checkbox",
                              checked: at.value[M.name] || !1,
                              onChange: (ze) => xt(M.name, ze.target.checked),
                              class: "form-checkbox",
                              disabled: tt.value
                            }, null, 40, pv),
                            v("label", {
                              for: `form-${M.name}`,
                              class: "checkbox-label"
                            }, se(M.placeholder || M.label), 9, gv)
                          ])) : M.type === "radio" ? (T(), A("div", mv, [
                            (T(!0), A(Be, null, Et((Array.isArray(M.options) ? M.options : ((ao = M.options) == null ? void 0 : ao.split(`
`)) || []).filter((ze) => ze.trim()), (ze) => (T(), A("div", {
                              key: ze.trim(),
                              class: "radio-option"
                            }, [
                              v("input", {
                                id: `form-${M.name}-${ze.trim()}`,
                                name: `form-${M.name}`,
                                type: "radio",
                                value: ze.trim(),
                                checked: at.value[M.name] === ze.trim(),
                                onChange: (Mb) => xt(M.name, ze.trim()),
                                class: "form-radio",
                                disabled: tt.value
                              }, null, 40, _v),
                              v("label", {
                                for: `form-${M.name}-${ze.trim()}`,
                                class: "radio-label"
                              }, se(ze.trim()), 9, yv)
                            ]))), 128))
                          ])) : ce("", !0),
                          dt.value[M.name] ? (T(), A("div", vv, se(dt.value[M.name]), 1)) : ce("", !0)
                        ]);
                      }), 128))
                    ]),
                    v("div", bv, [
                      v("button", {
                        onClick: () => {
                          var M;
                          console.log("Regular form submit button clicked!"), Ji((M = c.attributes) == null ? void 0 : M.form_data);
                        },
                        disabled: tt.value,
                        class: "form-submit-button",
                        style: Pe(C(z))
                      }, se(tt.value ? "Submitting..." : ((Za = (Xa = c.attributes) == null ? void 0 : Xa.form_data) == null ? void 0 : Za.submit_button_text) || "Submit"), 13, wv)
                    ])
                  ])) : c.message_type === "user_input" ? (T(), A("div", kv, [
                    (Ja = c.attributes) != null && Ja.prompt_message && c.attributes.prompt_message.trim() ? (T(), A("div", Tv, se(c.attributes.prompt_message), 1)) : ce("", !0),
                    c.isSubmitted ? (T(), A("div", Ev, [
                      g[32] || (g[32] = v("strong", null, "Your input:", -1)),
                      Ln(" " + se(c.submittedValue) + " ", 1),
                      (Qa = c.attributes) != null && Qa.confirmation_message && c.attributes.confirmation_message.trim() ? (T(), A("div", Cv, se(c.attributes.confirmation_message), 1)) : ce("", !0)
                    ])) : (T(), A("div", Av, [
                      qn(v("textarea", {
                        "onUpdate:modelValue": (M) => c.userInputValue = M,
                        class: "user-input-textarea",
                        placeholder: "Type your message here...",
                        rows: "3",
                        onKeydown: [
                          ui(ms((M) => q(c), ["ctrl"]), ["enter"]),
                          ui(ms((M) => q(c), ["meta"]), ["enter"])
                        ]
                      }, null, 40, Sv), [
                        [ds, c.userInputValue]
                      ]),
                      v("button", {
                        class: "user-input-submit-button",
                        onClick: (M) => q(c),
                        disabled: !c.userInputValue || !c.userInputValue.trim()
                      }, " Submit ", 8, xv)
                    ]))
                  ])) : c.shopify_output || c.message_type === "product" ? (T(), A("div", Rv, [
                    c.message ? (T(), A("div", {
                      key: 0,
                      innerHTML: C(hi)(((tl = (el = c.shopify_output) == null ? void 0 : el.products) == null ? void 0 : tl.length) > 0 ? Kr(c.message) : c.message),
                      class: "product-message-text"
                    }, null, 8, Iv)) : ce("", !0),
                    (nl = c.shopify_output) != null && nl.products && c.shopify_output.products.length > 0 ? (T(), A("div", Lv, [
                      g[34] || (g[34] = v("h3", { class: "carousel-title" }, "Products", -1)),
                      v("div", Ov, [
                        (T(!0), A(Be, null, Et(c.shopify_output.products, (M) => {
                          var un;
                          return T(), A("div", {
                            key: M.id,
                            class: "product-card-compact carousel-item"
                          }, [
                            (un = M.image) != null && un.src ? (T(), A("div", Nv, [
                              v("img", {
                                src: M.image.src,
                                alt: M.title,
                                class: "product-thumbnail"
                              }, null, 8, Pv)
                            ])) : ce("", !0),
                            v("div", Dv, [
                              v("div", Mv, [
                                v("div", Fv, se(M.title), 1),
                                M.variant_title && M.variant_title !== "Default Title" ? (T(), A("div", $v, se(M.variant_title), 1)) : ce("", !0),
                                v("div", Bv, se(M.price_formatted || C(a)(M.price, M.currency)), 1)
                              ]),
                              v("div", Uv, [
                                v("button", {
                                  class: "view-details-button-compact",
                                  onClick: (ao) => {
                                    var ze;
                                    return Qi(M, (ze = c.shopify_output) == null ? void 0 : ze.shop_domain);
                                  }
                                }, g[33] || (g[33] = [
                                  Ln(" View product ", -1),
                                  v("span", { class: "external-link-icon" }, "↗", -1)
                                ]), 8, zv)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])) : !c.message && ((sl = c.shopify_output) != null && sl.products) && c.shopify_output.products.length === 0 ? (T(), A("div", Hv, g[35] || (g[35] = [
                      v("p", null, "No products found.", -1)
                    ]))) : !c.message && c.shopify_output && !c.shopify_output.products ? (T(), A("div", Wv, g[36] || (g[36] = [
                      v("p", null, "No products to display.", -1)
                    ]))) : ce("", !0)
                  ])) : (T(), A(Be, { key: 4 }, [
                    C(st)(ne) ? (T(), A("div", {
                      key: 0,
                      class: "message-streaming",
                      innerHTML: C(hi)(C(Qe)(ne, c.message))
                    }, null, 8, qv)) : (T(), A("div", {
                      key: 1,
                      innerHTML: C(hi)(c.message)
                    }, null, 8, jv)),
                    c.attachments && c.attachments.length > 0 ? (T(), A("div", Vv, [
                      (T(!0), A(Be, null, Et(c.attachments, (M) => (T(), A("div", {
                        key: M.id,
                        class: "attachment-item"
                      }, [
                        C(Ss)(M.content_type) ? (T(), A("div", Kv, [
                          v("img", {
                            src: C(ns)(M.file_url),
                            alt: M.filename,
                            class: "attachment-image",
                            onClick: ms((un) => C(Zs)({ url: M.file_url, filename: M.filename, type: M.content_type, file_url: C(ns)(M.file_url), size: void 0 }), ["stop"]),
                            style: { cursor: "pointer" }
                          }, null, 8, Gv),
                          v("div", Yv, [
                            v("a", {
                              href: C(ns)(M.file_url),
                              target: "_blank",
                              class: "attachment-link"
                            }, [
                              g[37] || (g[37] = v("svg", {
                                width: "14",
                                height: "14",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                "stroke-width": "2",
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round"
                              }, [
                                v("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                                v("polyline", { points: "7 10 12 15 17 10" }),
                                v("line", {
                                  x1: "12",
                                  y1: "15",
                                  x2: "12",
                                  y2: "3"
                                })
                              ], -1)),
                              Ln(" " + se(M.filename) + " ", 1),
                              v("span", Zv, "(" + se(C(qt)(M.file_size)) + ")", 1)
                            ], 8, Xv)
                          ])
                        ])) : (T(), A("a", {
                          key: 1,
                          href: C(ns)(M.file_url),
                          target: "_blank",
                          class: "attachment-link"
                        }, [
                          g[38] || (g[38] = v("svg", {
                            width: "14",
                            height: "14",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          }, [
                            v("path", { d: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" })
                          ], -1)),
                          Ln(" " + se(M.filename) + " ", 1),
                          v("span", Qv, "(" + se(C(qt)(M.file_size)) + ")", 1)
                        ], 8, Jv))
                      ]))), 128))
                    ])) : ce("", !0)
                  ], 64))
                ], 4),
                Xr.value && (c.message_type === "bot" || c.message_type === "agent") && c.sources && c.sources.length ? (T(), A("div", eb, [
                  g[39] || (g[39] = v("span", { class: "citation-label" }, "Sources", -1)),
                  (T(!0), A(Be, null, Et(c.sources, (M, un) => (T(), A("span", {
                    key: un,
                    class: "citation-chip",
                    title: Wa(M)
                  }, se(no(M)), 9, tb))), 128))
                ])) : ce("", !0),
                v("div", nb, [
                  c.message_type === "user" ? (T(), A("span", sb, " You ")) : ce("", !0)
                ])
              ])
            ], 2);
          }), 128)),
          C(p) ? (T(), A("div", {
            key: 1,
            class: $e(["typing-indicator", { "reading-indicator": Xr.value }])
          }, [
            Xr.value ? (T(), A(Be, { key: 0 }, [
              g[40] || (g[40] = v("div", {
                class: "reading-bars",
                "aria-hidden": "true"
              }, [
                v("span"),
                v("span"),
                v("span")
              ], -1)),
              g[41] || (g[41] = v("span", { class: "reading-label" }, "reading knowledge base", -1))
            ], 64)) : (T(), A("div", {
              key: 1,
              class: "cm-typing-bubble",
              style: Pe(C(S))
            }, g[42] || (g[42] = [
              v("span", { class: "cm-typing-dot" }, null, -1),
              v("span", { class: "cm-typing-dot" }, null, -1),
              v("span", { class: "cm-typing-dot" }, null, -1)
            ]), 4))
          ], 2)) : ce("", !0)
        ], 512), [
          [vd, !us.value]
        ]),
        ff.value ? (T(), A("div", rb, [
          (T(!0), A(Be, null, Et(eo.value, (c) => (T(), A("button", {
            key: c,
            type: "button",
            class: "cm-quick-action",
            disabled: !dn.value,
            onClick: (ne) => ot(c)
          }, se(c), 9, ib))), 128))
        ])) : ce("", !0),
        !_n.value && !us.value ? (T(), A("div", {
          key: 6,
          class: $e(["chat-input", { "ask-anything-input": en.value }])
        }, [
          v("input", {
            ref_key: "fileInputRef",
            ref: Ve,
            type: "file",
            accept: Ob,
            multiple: "",
            style: { display: "none" },
            onChange: g[7] || (g[7] = //@ts-ignore
            (...c) => C(ss) && C(ss)(...c))
          }, null, 544),
          C(Re).length > 0 ? (T(), A("div", ob, [
            (T(!0), A(Be, null, Et(C(Re), (c, ne) => (T(), A("div", {
              key: ne,
              class: "file-preview-widget"
            }, [
              v("div", ab, [
                C(Js)(c.type) ? (T(), A("img", {
                  key: 0,
                  src: C(Ys)(c),
                  alt: c.filename,
                  class: "file-preview-image-widget",
                  onClick: ms((be) => C(Zs)(c), ["stop"]),
                  style: { cursor: "pointer" }
                }, null, 8, lb)) : (T(), A("div", {
                  key: 1,
                  class: "file-preview-icon-widget",
                  onClick: ms((be) => C(Zs)(c), ["stop"]),
                  style: { cursor: "pointer" }
                }, g[43] || (g[43] = [
                  v("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    v("path", { d: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" }),
                    v("polyline", { points: "13 2 13 9 20 9" })
                  ], -1)
                ]), 8, cb))
              ]),
              v("div", ub, [
                v("div", fb, se(c.filename), 1),
                v("div", hb, se(C(qt)(c.size)), 1)
              ]),
              v("button", {
                type: "button",
                class: "file-preview-remove-widget",
                onClick: (be) => C(Xs)(ne),
                title: "Remove file"
              }, " × ", 8, db)
            ]))), 128))
          ])) : ce("", !0),
          Gr.value ? (T(), A("div", pb, g[44] || (g[44] = [
            v("div", { class: "upload-spinner-widget" }, null, -1),
            v("span", { class: "upload-text-widget" }, "Uploading files...", -1)
          ]))) : ce("", !0),
          v("div", gb, [
            qn(v("input", {
              "onUpdate:modelValue": g[8] || (g[8] = (c) => Ee.value = c),
              type: "text",
              placeholder: Rn.value,
              onKeypress: Hr,
              onInput: Rt,
              onChange: Rt,
              onPaste: g[9] || (g[9] = //@ts-ignore
              (...c) => C(xs) && C(xs)(...c)),
              onDrop: g[10] || (g[10] = //@ts-ignore
              (...c) => C(rs) && C(rs)(...c)),
              onDragover: g[11] || (g[11] = //@ts-ignore
              (...c) => C(jt) && C(jt)(...c)),
              onDragleave: g[12] || (g[12] = //@ts-ignore
              (...c) => C(Cn) && C(Cn)(...c)),
              disabled: !os.value,
              class: $e({ disabled: !os.value, "ask-anything-field": en.value })
            }, null, 42, mb), [
              [ds, Ee.value]
            ]),
            Os.value ? (T(), A("button", {
              key: 0,
              type: "button",
              class: "attach-button",
              disabled: Gr.value,
              onClick: g[13] || (g[13] = //@ts-ignore
              (...c) => C(Es) && C(Es)(...c)),
              title: `Attach files (${C(Re).length}/${_c} used) or paste screenshots`
            }, g[45] || (g[45] = [
              v("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                v("path", {
                  d: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
                  stroke: "currentColor",
                  "stroke-width": "2.2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1),
              v("span", { class: "attach-button-glow" }, null, -1)
            ]), 8, _b)) : ce("", !0),
            v("button", {
              class: $e(["send-button", { "ask-anything-send": en.value }]),
              "aria-label": "Send message",
              style: Pe(C(z)),
              onClick: pn,
              disabled: !Ee.value.trim() && C(Re).length === 0 || !dn.value
            }, g[46] || (g[46] = [
              v("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                v("path", {
                  d: "M12 19V5M5 12l7-7 7 7",
                  stroke: "currentColor",
                  "stroke-width": "2.2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1)
            ]), 14, yb)
          ])
        ], 2)) : _n.value && !us.value ? (T(), A("div", vb, [
          v("div", bb, [
            g[47] || (g[47] = v("p", { class: "ended-text" }, "This chat has ended.", -1)),
            v("button", {
              class: "start-new-conversation-button",
              style: Pe(C(z)),
              onClick: of
            }, " Click here to start a new conversation ", 4)
          ])
        ])) : ce("", !0),
        Ha.value ? (T(), A("div", wb, se(C(sc)), 1)) : ce("", !0)
      ], 6)) : ce("", !0),
      Wr.value ? (T(), A("div", kb, [
        v("div", Tb, [
          g[48] || (g[48] = v("h3", null, "Rate your conversation", -1)),
          v("div", Ab, [
            (T(), A(Be, null, Et(5, (c) => v("button", {
              key: c,
              onClick: (ne) => Cs.value = c,
              class: $e([{ active: c <= Cs.value }, "star-button"])
            }, " ★ ", 10, Sb)), 64))
          ]),
          qn(v("textarea", {
            "onUpdate:modelValue": g[14] || (g[14] = (c) => nr.value = c),
            placeholder: "Additional feedback (optional)",
            class: "rating-feedback"
          }, null, 512), [
            [ds, nr.value]
          ]),
          v("div", xb, [
            v("button", {
              onClick: g[15] || (g[15] = (c) => h.submitRating(Cs.value, nr.value)),
              disabled: !Cs.value,
              class: "submit-button",
              style: Pe(C(z))
            }, " Submit ", 12, Eb),
            v("button", {
              onClick: g[16] || (g[16] = (c) => Wr.value = !1),
              class: "skip-rating"
            }, " Skip ")
          ])
        ])
      ])) : ce("", !0),
      C(it) ? (T(), A("div", {
        key: 9,
        class: "preview-modal-overlay",
        onClick: g[19] || (g[19] = //@ts-ignore
        (...c) => C(is) && C(is)(...c))
      }, [
        v("div", {
          class: "preview-modal-content",
          onClick: g[18] || (g[18] = ms(() => {
          }, ["stop"]))
        }, [
          v("button", {
            class: "preview-modal-close",
            onClick: g[17] || (g[17] = //@ts-ignore
            (...c) => C(is) && C(is)(...c))
          }, "×"),
          C(gt) && C(Js)(C(gt).type) ? (T(), A("div", Cb, [
            v("img", {
              src: C(Ys)(C(gt)),
              alt: C(gt).filename,
              class: "preview-modal-image"
            }, null, 8, Rb),
            v("div", Ib, se(C(gt).filename), 1)
          ])) : ce("", !0)
        ])
      ])) : ce("", !0)
    ], 6)) : (T(), A("div", Lb));
  }
}), Pb = /* @__PURE__ */ La(Nb, [["__scopeId", "data-v-575202d9"]]);
window.process || (window.process = { env: { NODE_ENV: "production" } });
async function Db() {
  if (!await nm()) return;
  const e = window.__INITIAL_DATA__, t = new URL(window.location.href), n = t.searchParams.get("preview") === "true", s = (a) => {
    const l = t.searchParams.get(a);
    if (!(!l || l === "undefined" || l.trim() === ""))
      return l;
  }, r = n ? s("widget_id") || (e == null ? void 0 : e.widgetId) || void 0 : (e == null ? void 0 : e.widgetId) || void 0, i = n ? (e == null ? void 0 : e.initialToken) || s("token") || void 0 : (e == null ? void 0 : e.initialToken) || void 0;
  Bd(Pb, {
    widgetId: r,
    token: i || void 0,
    initialAuthError: null
    // Let backend determine if auth is required
  }).mount("#app"), sm();
}
Db();
