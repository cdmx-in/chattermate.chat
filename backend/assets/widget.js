var lf = Object.defineProperty;
var cf = (e, t, n) => t in e ? lf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var et = (e, t, n) => cf(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Jo(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const tt = {}, Ps = [], _n = () => {
}, uf = () => !1, Oi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Qo = (e) => e.startsWith("onUpdate:"), Pt = Object.assign, ea = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ff = Object.prototype.hasOwnProperty, je = (e, t) => ff.call(e, t), be = Array.isArray, Ms = (e) => Ni(e) === "[object Map]", fc = (e) => Ni(e) === "[object Set]", ke = (e) => typeof e == "function", gt = (e) => typeof e == "string", ns = (e) => typeof e == "symbol", ut = (e) => e !== null && typeof e == "object", hc = (e) => (ut(e) || ke(e)) && ke(e.then) && ke(e.catch), dc = Object.prototype.toString, Ni = (e) => dc.call(e), hf = (e) => Ni(e).slice(8, -1), pc = (e) => Ni(e) === "[object Object]", ta = (e) => gt(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, wr = /* @__PURE__ */ Jo(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Pi = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, df = /-(\w)/g, Qn = Pi(
  (e) => e.replace(df, (t, n) => n ? n.toUpperCase() : "")
), pf = /\B([A-Z])/g, ss = Pi(
  (e) => e.replace(pf, "-$1").toLowerCase()
), mc = Pi((e) => e.charAt(0).toUpperCase() + e.slice(1)), ro = Pi(
  (e) => e ? `on${mc(e)}` : ""
), Zn = (e, t) => !Object.is(e, t), si = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Io = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Lo = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ja;
const Mi = () => Ja || (Ja = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Me(e) {
  if (be(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = gt(s) ? yf(s) : Me(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (gt(e) || ut(e))
    return e;
}
const mf = /;(?![^(]*\))/g, gf = /:([^]+)/, _f = /\/\*[^]*?\*\//g;
function yf(e) {
  const t = {};
  return e.replace(_f, "").split(mf).forEach((n) => {
    if (n) {
      const s = n.split(gf);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Ue(e) {
  let t = "";
  if (gt(e))
    t = e;
  else if (be(e))
    for (let n = 0; n < e.length; n++) {
      const s = Ue(e[n]);
      s && (t += s + " ");
    }
  else if (ut(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const bf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", vf = /* @__PURE__ */ Jo(bf);
function gc(e) {
  return !!e || e === "";
}
const _c = (e) => !!(e && e.__v_isRef === !0), re = (e) => gt(e) ? e : e == null ? "" : be(e) || ut(e) && (e.toString === dc || !ke(e.toString)) ? _c(e) ? re(e.value) : JSON.stringify(e, yc, 2) : String(e), yc = (e, t) => _c(t) ? yc(e, t.value) : Ms(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[io(s, i) + " =>"] = r, n),
    {}
  )
} : fc(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => io(n))
} : ns(t) ? io(t) : ut(t) && !be(t) && !pc(t) ? String(t) : t, io = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ns(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let zt;
class wf {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = zt, !t && zt && (this.index = (zt.scopes || (zt.scopes = [])).push(
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
      const n = zt;
      try {
        return zt = this, t();
      } finally {
        zt = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = zt, zt = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (zt = this.prevScope, this.prevScope = void 0);
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
function kf() {
  return zt;
}
let ot;
const oo = /* @__PURE__ */ new WeakSet();
class bc {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, zt && zt.active && zt.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, oo.has(this) && (oo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || wc(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Qa(this), kc(this);
    const t = ot, n = ln;
    ot = this, ln = !0;
    try {
      return this.fn();
    } finally {
      Tc(this), ot = t, ln = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ra(t);
      this.deps = this.depsTail = void 0, Qa(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? oo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Oo(this) && this.run();
  }
  get dirty() {
    return Oo(this);
  }
}
let vc = 0, kr, Tr;
function wc(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Tr, Tr = e;
    return;
  }
  e.next = kr, kr = e;
}
function na() {
  vc++;
}
function sa() {
  if (--vc > 0)
    return;
  if (Tr) {
    let t = Tr;
    for (Tr = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; kr; ) {
    let t = kr;
    for (kr = void 0; t; ) {
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
function kc(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Tc(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), ra(s), Tf(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Oo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (xc(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function xc(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Rr) || (e.globalVersion = Rr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Oo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ot, s = ln;
  ot = e, ln = !0;
  try {
    kc(e);
    const r = e.fn(e._value);
    (t.version === 0 || Zn(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    ot = n, ln = s, Tc(e), e.flags &= -3;
  }
}
function ra(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      ra(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Tf(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let ln = !0;
const Sc = [];
function Fn() {
  Sc.push(ln), ln = !1;
}
function $n() {
  const e = Sc.pop();
  ln = e === void 0 ? !0 : e;
}
function Qa(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ot;
    ot = void 0;
    try {
      t();
    } finally {
      ot = n;
    }
  }
}
let Rr = 0;
class xf {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ia {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ot || !ln || ot === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ot)
      n = this.activeLink = new xf(ot, this), ot.deps ? (n.prevDep = ot.depsTail, ot.depsTail.nextDep = n, ot.depsTail = n) : ot.deps = ot.depsTail = n, Ac(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = ot.depsTail, n.nextDep = void 0, ot.depsTail.nextDep = n, ot.depsTail = n, ot.deps === n && (ot.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Rr++, this.notify(t);
  }
  notify(t) {
    na();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      sa();
    }
  }
}
function Ac(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Ac(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const No = /* @__PURE__ */ new WeakMap(), _s = Symbol(
  ""
), Po = Symbol(
  ""
), Ir = Symbol(
  ""
);
function Ot(e, t, n) {
  if (ln && ot) {
    let s = No.get(e);
    s || No.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new ia()), r.map = s, r.key = n), r.track();
  }
}
function Nn(e, t, n, s, r, i) {
  const o = No.get(e);
  if (!o) {
    Rr++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (na(), t === "clear")
    o.forEach(a);
  else {
    const l = be(e), h = l && ta(n);
    if (l && n === "length") {
      const c = Number(s);
      o.forEach((v, w) => {
        (w === "length" || w === Ir || !ns(w) && w >= c) && a(v);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && a(o.get(n)), h && a(o.get(Ir)), t) {
        case "add":
          l ? h && a(o.get("length")) : (a(o.get(_s)), Ms(e) && a(o.get(Po)));
          break;
        case "delete":
          l || (a(o.get(_s)), Ms(e) && a(o.get(Po)));
          break;
        case "set":
          Ms(e) && a(o.get(_s));
          break;
      }
  }
  sa();
}
function Is(e) {
  const t = We(e);
  return t === e ? t : (Ot(t, "iterate", Ir), sn(e) ? t : t.map(Et));
}
function Di(e) {
  return Ot(e = We(e), "iterate", Ir), e;
}
const Sf = {
  __proto__: null,
  [Symbol.iterator]() {
    return ao(this, Symbol.iterator, Et);
  },
  concat(...e) {
    return Is(this).concat(
      ...e.map((t) => be(t) ? Is(t) : t)
    );
  },
  entries() {
    return ao(this, "entries", (e) => (e[1] = Et(e[1]), e));
  },
  every(e, t) {
    return In(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return In(this, "filter", e, t, (n) => n.map(Et), arguments);
  },
  find(e, t) {
    return In(this, "find", e, t, Et, arguments);
  },
  findIndex(e, t) {
    return In(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return In(this, "findLast", e, t, Et, arguments);
  },
  findLastIndex(e, t) {
    return In(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return In(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return lo(this, "includes", e);
  },
  indexOf(...e) {
    return lo(this, "indexOf", e);
  },
  join(e) {
    return Is(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return lo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return In(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ar(this, "pop");
  },
  push(...e) {
    return ar(this, "push", e);
  },
  reduce(e, ...t) {
    return el(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return el(this, "reduceRight", e, t);
  },
  shift() {
    return ar(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return In(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ar(this, "splice", e);
  },
  toReversed() {
    return Is(this).toReversed();
  },
  toSorted(e) {
    return Is(this).toSorted(e);
  },
  toSpliced(...e) {
    return Is(this).toSpliced(...e);
  },
  unshift(...e) {
    return ar(this, "unshift", e);
  },
  values() {
    return ao(this, "values", Et);
  }
};
function ao(e, t, n) {
  const s = Di(e), r = s[t]();
  return s !== e && !sn(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.value && (i.value = n(i.value)), i;
  }), r;
}
const Af = Array.prototype;
function In(e, t, n, s, r, i) {
  const o = Di(e), a = o !== e && !sn(e), l = o[t];
  if (l !== Af[t]) {
    const v = l.apply(e, i);
    return a ? Et(v) : v;
  }
  let h = n;
  o !== e && (a ? h = function(v, w) {
    return n.call(this, Et(v), w, e);
  } : n.length > 2 && (h = function(v, w) {
    return n.call(this, v, w, e);
  }));
  const c = l.call(o, h, s);
  return a && r ? r(c) : c;
}
function el(e, t, n, s) {
  const r = Di(e);
  let i = n;
  return r !== e && (sn(e) ? n.length > 3 && (i = function(o, a, l) {
    return n.call(this, o, a, l, e);
  }) : i = function(o, a, l) {
    return n.call(this, o, Et(a), l, e);
  }), r[t](i, ...s);
}
function lo(e, t, n) {
  const s = We(e);
  Ot(s, "iterate", Ir);
  const r = s[t](...n);
  return (r === -1 || r === !1) && la(n[0]) ? (n[0] = We(n[0]), s[t](...n)) : r;
}
function ar(e, t, n = []) {
  Fn(), na();
  const s = We(e)[t].apply(e, n);
  return sa(), $n(), s;
}
const Ef = /* @__PURE__ */ Jo("__proto__,__v_isRef,__isVue"), Ec = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ns)
);
function Cf(e) {
  ns(e) || (e = String(e));
  const t = We(this);
  return Ot(t, "has", e), t.hasOwnProperty(e);
}
class Cc {
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
      return s === (r ? i ? $f : Oc : i ? Lc : Ic).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = be(t);
    if (!r) {
      let l;
      if (o && (l = Sf[n]))
        return l;
      if (n === "hasOwnProperty")
        return Cf;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Nt(t) ? t : s
    );
    return (ns(n) ? Ec.has(n) : Ef(n)) || (r || Ot(t, "get", n), i) ? a : Nt(a) ? o && ta(n) ? a : a.value : ut(a) ? r ? Nc(a) : Fi(a) : a;
  }
}
class Rc extends Cc {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    if (!this._isShallow) {
      const l = es(i);
      if (!sn(s) && !es(s) && (i = We(i), s = We(s)), !be(t) && Nt(i) && !Nt(s))
        return l ? !1 : (i.value = s, !0);
    }
    const o = be(t) && ta(n) ? Number(n) < t.length : je(t, n), a = Reflect.set(
      t,
      n,
      s,
      Nt(t) ? t : r
    );
    return t === We(r) && (o ? Zn(s, i) && Nn(t, "set", n, s) : Nn(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = je(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Nn(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!ns(n) || !Ec.has(n)) && Ot(t, "has", n), s;
  }
  ownKeys(t) {
    return Ot(
      t,
      "iterate",
      be(t) ? "length" : _s
    ), Reflect.ownKeys(t);
  }
}
class Rf extends Cc {
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
const If = /* @__PURE__ */ new Rc(), Lf = /* @__PURE__ */ new Rf(), Of = /* @__PURE__ */ new Rc(!0);
const Mo = (e) => e, Xr = (e) => Reflect.getPrototypeOf(e);
function Nf(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = We(r), o = Ms(i), a = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, h = r[e](...s), c = n ? Mo : t ? bi : Et;
    return !t && Ot(
      i,
      "iterate",
      l ? Po : _s
    ), {
      // iterator protocol
      next() {
        const { value: v, done: w } = h.next();
        return w ? { value: v, done: w } : {
          value: a ? [c(v[0]), c(v[1])] : c(v),
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
function Zr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Pf(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = We(i), a = We(r);
      e || (Zn(r, a) && Ot(o, "get", r), Ot(o, "get", a));
      const { has: l } = Xr(o), h = t ? Mo : e ? bi : Et;
      if (l.call(o, r))
        return h(i.get(r));
      if (l.call(o, a))
        return h(i.get(a));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && Ot(We(r), "iterate", _s), Reflect.get(r, "size", r);
    },
    has(r) {
      const i = this.__v_raw, o = We(i), a = We(r);
      return e || (Zn(r, a) && Ot(o, "has", r), Ot(o, "has", a)), r === a ? i.has(r) : i.has(r) || i.has(a);
    },
    forEach(r, i) {
      const o = this, a = o.__v_raw, l = We(a), h = t ? Mo : e ? bi : Et;
      return !e && Ot(l, "iterate", _s), a.forEach((c, v) => r.call(i, h(c), h(v), o));
    }
  };
  return Pt(
    n,
    e ? {
      add: Zr("add"),
      set: Zr("set"),
      delete: Zr("delete"),
      clear: Zr("clear")
    } : {
      add(r) {
        !t && !sn(r) && !es(r) && (r = We(r));
        const i = We(this);
        return Xr(i).has.call(i, r) || (i.add(r), Nn(i, "add", r, r)), this;
      },
      set(r, i) {
        !t && !sn(i) && !es(i) && (i = We(i));
        const o = We(this), { has: a, get: l } = Xr(o);
        let h = a.call(o, r);
        h || (r = We(r), h = a.call(o, r));
        const c = l.call(o, r);
        return o.set(r, i), h ? Zn(i, c) && Nn(o, "set", r, i) : Nn(o, "add", r, i), this;
      },
      delete(r) {
        const i = We(this), { has: o, get: a } = Xr(i);
        let l = o.call(i, r);
        l || (r = We(r), l = o.call(i, r)), a && a.call(i, r);
        const h = i.delete(r);
        return l && Nn(i, "delete", r, void 0), h;
      },
      clear() {
        const r = We(this), i = r.size !== 0, o = r.clear();
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
    n[r] = Nf(r, e, t);
  }), n;
}
function oa(e, t) {
  const n = Pf(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    je(n, r) && r in s ? n : s,
    r,
    i
  );
}
const Mf = {
  get: /* @__PURE__ */ oa(!1, !1)
}, Df = {
  get: /* @__PURE__ */ oa(!1, !0)
}, Ff = {
  get: /* @__PURE__ */ oa(!0, !1)
};
const Ic = /* @__PURE__ */ new WeakMap(), Lc = /* @__PURE__ */ new WeakMap(), Oc = /* @__PURE__ */ new WeakMap(), $f = /* @__PURE__ */ new WeakMap();
function Bf(e) {
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
function Uf(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Bf(hf(e));
}
function Fi(e) {
  return es(e) ? e : aa(
    e,
    !1,
    If,
    Mf,
    Ic
  );
}
function zf(e) {
  return aa(
    e,
    !1,
    Of,
    Df,
    Lc
  );
}
function Nc(e) {
  return aa(
    e,
    !0,
    Lf,
    Ff,
    Oc
  );
}
function aa(e, t, n, s, r) {
  if (!ut(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = Uf(e);
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
function Ds(e) {
  return es(e) ? Ds(e.__v_raw) : !!(e && e.__v_isReactive);
}
function es(e) {
  return !!(e && e.__v_isReadonly);
}
function sn(e) {
  return !!(e && e.__v_isShallow);
}
function la(e) {
  return e ? !!e.__v_raw : !1;
}
function We(e) {
  const t = e && e.__v_raw;
  return t ? We(t) : e;
}
function Hf(e) {
  return !je(e, "__v_skip") && Object.isExtensible(e) && Io(e, "__v_skip", !0), e;
}
const Et = (e) => ut(e) ? Fi(e) : e, bi = (e) => ut(e) ? Nc(e) : e;
function Nt(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ce(e) {
  return qf(e, !1);
}
function qf(e, t) {
  return Nt(e) ? e : new Wf(e, t);
}
class Wf {
  constructor(t, n) {
    this.dep = new ia(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : We(t), this._value = n ? t : Et(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || sn(t) || es(t);
    t = s ? t : We(t), Zn(t, n) && (this._rawValue = t, this._value = s ? t : Et(t), this.dep.trigger());
  }
}
function R(e) {
  return Nt(e) ? e.value : e;
}
const jf = {
  get: (e, t, n) => t === "__v_raw" ? e : R(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return Nt(r) && !Nt(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Pc(e) {
  return Ds(e) ? e : new Proxy(e, jf);
}
class Vf {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ia(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Rr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ot !== this)
      return wc(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return xc(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Kf(e, t, n = !1) {
  let s, r;
  return ke(e) ? s = e : (s = e.get, r = e.set), new Vf(s, r, n);
}
const Jr = {}, vi = /* @__PURE__ */ new WeakMap();
let ps;
function Gf(e, t = !1, n = ps) {
  if (n) {
    let s = vi.get(n);
    s || vi.set(n, s = []), s.push(e);
  }
}
function Yf(e, t, n = tt) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: a, call: l } = n, h = (C) => r ? C : sn(C) || r === !1 || r === 0 ? Pn(C, 1) : Pn(C);
  let c, v, w, z, I = !1, K = !1;
  if (Nt(e) ? (v = () => e.value, I = sn(e)) : Ds(e) ? (v = () => h(e), I = !0) : be(e) ? (K = !0, I = e.some((C) => Ds(C) || sn(C)), v = () => e.map((C) => {
    if (Nt(C))
      return C.value;
    if (Ds(C))
      return h(C);
    if (ke(C))
      return l ? l(C, 2) : C();
  })) : ke(e) ? t ? v = l ? () => l(e, 2) : e : v = () => {
    if (w) {
      Fn();
      try {
        w();
      } finally {
        $n();
      }
    }
    const C = ps;
    ps = c;
    try {
      return l ? l(e, 3, [z]) : e(z);
    } finally {
      ps = C;
    }
  } : v = _n, t && r) {
    const C = v, P = r === !0 ? 1 / 0 : r;
    v = () => Pn(C(), P);
  }
  const D = kf(), oe = () => {
    c.stop(), D && D.active && ea(D.effects, c);
  };
  if (i && t) {
    const C = t;
    t = (...P) => {
      C(...P), oe();
    };
  }
  let fe = K ? new Array(e.length).fill(Jr) : Jr;
  const pe = (C) => {
    if (!(!(c.flags & 1) || !c.dirty && !C))
      if (t) {
        const P = c.run();
        if (r || I || (K ? P.some((Y, Z) => Zn(Y, fe[Z])) : Zn(P, fe))) {
          w && w();
          const Y = ps;
          ps = c;
          try {
            const Z = [
              P,
              // pass undefined as the old value when it's changed for the first time
              fe === Jr ? void 0 : K && fe[0] === Jr ? [] : fe,
              z
            ];
            fe = P, l ? l(t, 3, Z) : (
              // @ts-expect-error
              t(...Z)
            );
          } finally {
            ps = Y;
          }
        }
      } else
        c.run();
  };
  return a && a(pe), c = new bc(v), c.scheduler = o ? () => o(pe, !1) : pe, z = (C) => Gf(C, !1, c), w = c.onStop = () => {
    const C = vi.get(c);
    if (C) {
      if (l)
        l(C, 4);
      else
        for (const P of C) P();
      vi.delete(c);
    }
  }, t ? s ? pe(!0) : fe = c.run() : o ? o(pe.bind(null, !0), !0) : c.run(), oe.pause = c.pause.bind(c), oe.resume = c.resume.bind(c), oe.stop = oe, oe;
}
function Pn(e, t = 1 / 0, n) {
  if (t <= 0 || !ut(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, Nt(e))
    Pn(e.value, t, n);
  else if (be(e))
    for (let s = 0; s < e.length; s++)
      Pn(e[s], t, n);
  else if (fc(e) || Ms(e))
    e.forEach((s) => {
      Pn(s, t, n);
    });
  else if (pc(e)) {
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
function Pr(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    $i(r, t, n);
  }
}
function vn(e, t, n, s) {
  if (ke(e)) {
    const r = Pr(e, t, n, s);
    return r && hc(r) && r.catch((i) => {
      $i(i, t, n);
    }), r;
  }
  if (be(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(vn(e[i], t, n, s));
    return r;
  }
}
function $i(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || tt;
  if (t) {
    let a = t.parent;
    const l = t.proxy, h = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const c = a.ec;
      if (c) {
        for (let v = 0; v < c.length; v++)
          if (c[v](e, l, h) === !1)
            return;
      }
      a = a.parent;
    }
    if (i) {
      Fn(), Pr(i, null, 10, [
        e,
        l,
        h
      ]), $n();
      return;
    }
  }
  Xf(e, n, r, s, o);
}
function Xf(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const $t = [];
let mn = -1;
const Fs = [];
let Gn = null, Ls = 0;
const Mc = /* @__PURE__ */ Promise.resolve();
let wi = null;
function ys(e) {
  const t = wi || Mc;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Zf(e) {
  let t = mn + 1, n = $t.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = $t[s], i = Lr(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function ca(e) {
  if (!(e.flags & 1)) {
    const t = Lr(e), n = $t[$t.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Lr(n) ? $t.push(e) : $t.splice(Zf(t), 0, e), e.flags |= 1, Dc();
  }
}
function Dc() {
  wi || (wi = Mc.then($c));
}
function Jf(e) {
  be(e) ? Fs.push(...e) : Gn && e.id === -1 ? Gn.splice(Ls + 1, 0, e) : e.flags & 1 || (Fs.push(e), e.flags |= 1), Dc();
}
function tl(e, t, n = mn + 1) {
  for (; n < $t.length; n++) {
    const s = $t[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      $t.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Fc(e) {
  if (Fs.length) {
    const t = [...new Set(Fs)].sort(
      (n, s) => Lr(n) - Lr(s)
    );
    if (Fs.length = 0, Gn) {
      Gn.push(...t);
      return;
    }
    for (Gn = t, Ls = 0; Ls < Gn.length; Ls++) {
      const n = Gn[Ls];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Gn = null, Ls = 0;
  }
}
const Lr = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function $c(e) {
  try {
    for (mn = 0; mn < $t.length; mn++) {
      const t = $t[mn];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Pr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; mn < $t.length; mn++) {
      const t = $t[mn];
      t && (t.flags &= -2);
    }
    mn = -1, $t.length = 0, Fc(), wi = null, ($t.length || Fs.length) && $c();
  }
}
let nn = null, Bc = null;
function ki(e) {
  const t = nn;
  return nn = e, Bc = e && e.type.__scopeId || null, t;
}
function Qf(e, t = nn, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && ul(-1);
    const i = ki(t);
    let o;
    try {
      o = e(...r);
    } finally {
      ki(i), s._d && ul(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Vn(e, t) {
  if (nn === null)
    return e;
  const n = qi(nn), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, a, l = tt] = t[r];
    i && (ke(i) && (i = {
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
function us(e, t, n, s) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const a = r[o];
    i && (a.oldValue = i[o].value);
    let l = a.dir[s];
    l && (Fn(), vn(l, n, 8, [
      e.el,
      a,
      e,
      t
    ]), $n());
  }
}
const eh = Symbol("_vte"), th = (e) => e.__isTeleport;
function ua(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, ua(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function fa(e, t) {
  return ke(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Pt({ name: e.name }, t, { setup: e })
  ) : e;
}
function Uc(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function xr(e, t, n, s, r = !1) {
  if (be(e)) {
    e.forEach(
      (I, K) => xr(
        I,
        t && (be(t) ? t[K] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (Sr(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && xr(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? qi(s.component) : s.el, o = r ? null : i, { i: a, r: l } = e, h = t && t.r, c = a.refs === tt ? a.refs = {} : a.refs, v = a.setupState, w = We(v), z = v === tt ? () => !1 : (I) => je(w, I);
  if (h != null && h !== l && (gt(h) ? (c[h] = null, z(h) && (v[h] = null)) : Nt(h) && (h.value = null)), ke(l))
    Pr(l, a, 12, [o, c]);
  else {
    const I = gt(l), K = Nt(l);
    if (I || K) {
      const D = () => {
        if (e.f) {
          const oe = I ? z(l) ? v[l] : c[l] : l.value;
          r ? be(oe) && ea(oe, i) : be(oe) ? oe.includes(i) || oe.push(i) : I ? (c[l] = [i], z(l) && (v[l] = c[l])) : (l.value = [i], e.k && (c[e.k] = l.value));
        } else I ? (c[l] = o, z(l) && (v[l] = o)) : K && (l.value = o, e.k && (c[e.k] = o));
      };
      o ? (D.id = -1, jt(D, n)) : D();
    }
  }
}
Mi().requestIdleCallback;
Mi().cancelIdleCallback;
const Sr = (e) => !!e.type.__asyncLoader, zc = (e) => e.type.__isKeepAlive;
function nh(e, t) {
  Hc(e, "a", t);
}
function sh(e, t) {
  Hc(e, "da", t);
}
function Hc(e, t, n = Bt) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Bi(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      zc(r.parent.vnode) && rh(s, t, n, r), r = r.parent;
  }
}
function rh(e, t, n, s) {
  const r = Bi(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Mr(() => {
    ea(s[t], r);
  }, n);
}
function Bi(e, t, n = Bt, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Fn();
      const a = Dr(n), l = vn(t, n, e, o);
      return a(), $n(), l;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Bn = (e) => (t, n = Bt) => {
  (!Nr || e === "sp") && Bi(e, (...s) => t(...s), n);
}, ih = Bn("bm"), Ui = Bn("m"), oh = Bn(
  "bu"
), ah = Bn("u"), qc = Bn(
  "bum"
), Mr = Bn("um"), lh = Bn(
  "sp"
), ch = Bn("rtg"), uh = Bn("rtc");
function fh(e, t = Bt) {
  Bi("ec", e, t);
}
const hh = Symbol.for("v-ndc");
function At(e, t, n, s) {
  let r;
  const i = n, o = be(e);
  if (o || gt(e)) {
    const a = o && Ds(e);
    let l = !1, h = !1;
    a && (l = !sn(e), h = es(e), e = Di(e)), r = new Array(e.length);
    for (let c = 0, v = e.length; c < v; c++)
      r[c] = t(
        l ? h ? bi(Et(e[c])) : Et(e[c]) : e[c],
        c,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let a = 0; a < e; a++)
      r[a] = t(a + 1, a, void 0, i);
  } else if (ut(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (a, l) => t(a, l, void 0, i)
      );
    else {
      const a = Object.keys(e);
      r = new Array(a.length);
      for (let l = 0, h = a.length; l < h; l++) {
        const c = a[l];
        r[l] = t(e[c], c, l, i);
      }
    }
  else
    r = [];
  return r;
}
const Do = (e) => e ? uu(e) ? qi(e) : Do(e.parent) : null, Ar = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Pt(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Do(e.parent),
    $root: (e) => Do(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => jc(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ca(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ys.bind(e.proxy)),
    $watch: (e) => Ph.bind(e)
  })
), co = (e, t) => e !== tt && !e.__isScriptSetup && je(e, t), dh = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: a, appContext: l } = e;
    let h;
    if (t[0] !== "$") {
      const z = o[t];
      if (z !== void 0)
        switch (z) {
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
        if (co(s, t))
          return o[t] = 1, s[t];
        if (r !== tt && je(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (h = e.propsOptions[0]) && je(h, t)
        )
          return o[t] = 3, i[t];
        if (n !== tt && je(n, t))
          return o[t] = 4, n[t];
        Fo && (o[t] = 0);
      }
    }
    const c = Ar[t];
    let v, w;
    if (c)
      return t === "$attrs" && Ot(e.attrs, "get", ""), c(e);
    if (
      // css module (injected by vue-loader)
      (v = a.__cssModules) && (v = v[t])
    )
      return v;
    if (n !== tt && je(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      w = l.config.globalProperties, je(w, t)
    )
      return w[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return co(r, t) ? (r[t] = n, !0) : s !== tt && je(s, t) ? (s[t] = n, !0) : je(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i }
  }, o) {
    let a;
    return !!n[o] || e !== tt && je(e, o) || co(t, o) || (a = i[0]) && je(a, o) || je(s, o) || je(Ar, o) || je(r.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : je(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function nl(e) {
  return be(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Fo = !0;
function ph(e) {
  const t = jc(e), n = e.proxy, s = e.ctx;
  Fo = !1, t.beforeCreate && sl(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: a,
    provide: l,
    inject: h,
    // lifecycle
    created: c,
    beforeMount: v,
    mounted: w,
    beforeUpdate: z,
    updated: I,
    activated: K,
    deactivated: D,
    beforeDestroy: oe,
    beforeUnmount: fe,
    destroyed: pe,
    unmounted: C,
    render: P,
    renderTracked: Y,
    renderTriggered: Z,
    errorCaptured: Te,
    serverPrefetch: Le,
    // public API
    expose: _e,
    inheritAttrs: De,
    // assets
    components: ve,
    directives: Ke,
    filters: Ge
  } = t;
  if (h && mh(h, s, null), o)
    for (const ye in o) {
      const ge = o[ye];
      ke(ge) && (s[ye] = ge.bind(n));
    }
  if (r) {
    const ye = r.call(n, n);
    ut(ye) && (e.data = Fi(ye));
  }
  if (Fo = !0, i)
    for (const ye in i) {
      const ge = i[ye], nt = ke(ge) ? ge.bind(n, n) : ke(ge.get) ? ge.get.bind(n, n) : _n, Xe = !ke(ge) && ke(ge.set) ? ge.set.bind(n) : _n, Se = de({
        get: nt,
        set: Xe
      });
      Object.defineProperty(s, ye, {
        enumerable: !0,
        configurable: !0,
        get: () => Se.value,
        set: (Je) => Se.value = Je
      });
    }
  if (a)
    for (const ye in a)
      Wc(a[ye], s, n, ye);
  if (l) {
    const ye = ke(l) ? l.call(n) : l;
    Reflect.ownKeys(ye).forEach((ge) => {
      wh(ge, ye[ge]);
    });
  }
  c && sl(c, e, "c");
  function ue(ye, ge) {
    be(ge) ? ge.forEach((nt) => ye(nt.bind(n))) : ge && ye(ge.bind(n));
  }
  if (ue(ih, v), ue(Ui, w), ue(oh, z), ue(ah, I), ue(nh, K), ue(sh, D), ue(fh, Te), ue(uh, Y), ue(ch, Z), ue(qc, fe), ue(Mr, C), ue(lh, Le), be(_e))
    if (_e.length) {
      const ye = e.exposed || (e.exposed = {});
      _e.forEach((ge) => {
        Object.defineProperty(ye, ge, {
          get: () => n[ge],
          set: (nt) => n[ge] = nt,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  P && e.render === _n && (e.render = P), De != null && (e.inheritAttrs = De), ve && (e.components = ve), Ke && (e.directives = Ke), Le && Uc(e);
}
function mh(e, t, n = _n) {
  be(e) && (e = $o(e));
  for (const s in e) {
    const r = e[s];
    let i;
    ut(r) ? "default" in r ? i = ri(
      r.from || s,
      r.default,
      !0
    ) : i = ri(r.from || s) : i = ri(r), Nt(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function sl(e, t, n) {
  vn(
    be(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Wc(e, t, n, s) {
  let r = s.includes(".") ? ru(n, s) : () => n[s];
  if (gt(e)) {
    const i = t[e];
    ke(i) && Ft(r, i);
  } else if (ke(e))
    Ft(r, e.bind(n));
  else if (ut(e))
    if (be(e))
      e.forEach((i) => Wc(i, t, n, s));
    else {
      const i = ke(e.handler) ? e.handler.bind(n) : t[e.handler];
      ke(i) && Ft(r, i, e);
    }
}
function jc(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, a = i.get(t);
  let l;
  return a ? l = a : !r.length && !n && !s ? l = t : (l = {}, r.length && r.forEach(
    (h) => Ti(l, h, o, !0)
  ), Ti(l, t, o)), ut(t) && i.set(t, l), l;
}
function Ti(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && Ti(e, i, n, !0), r && r.forEach(
    (o) => Ti(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const a = gh[o] || n && n[o];
      e[o] = a ? a(e[o], t[o]) : t[o];
    }
  return e;
}
const gh = {
  data: rl,
  props: il,
  emits: il,
  // objects
  methods: _r,
  computed: _r,
  // lifecycle
  beforeCreate: Dt,
  created: Dt,
  beforeMount: Dt,
  mounted: Dt,
  beforeUpdate: Dt,
  updated: Dt,
  beforeDestroy: Dt,
  beforeUnmount: Dt,
  destroyed: Dt,
  unmounted: Dt,
  activated: Dt,
  deactivated: Dt,
  errorCaptured: Dt,
  serverPrefetch: Dt,
  // assets
  components: _r,
  directives: _r,
  // watch
  watch: yh,
  // provide / inject
  provide: rl,
  inject: _h
};
function rl(e, t) {
  return t ? e ? function() {
    return Pt(
      ke(e) ? e.call(this, this) : e,
      ke(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function _h(e, t) {
  return _r($o(e), $o(t));
}
function $o(e) {
  if (be(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Dt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function _r(e, t) {
  return e ? Pt(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function il(e, t) {
  return e ? be(e) && be(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Pt(
    /* @__PURE__ */ Object.create(null),
    nl(e),
    nl(t ?? {})
  ) : t;
}
function yh(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Pt(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Dt(e[s], t[s]);
  return n;
}
function Vc() {
  return {
    app: null,
    config: {
      isNativeTag: uf,
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
let bh = 0;
function vh(e, t) {
  return function(s, r = null) {
    ke(s) || (s = Pt({}, s)), r != null && !ut(r) && (r = null);
    const i = Vc(), o = /* @__PURE__ */ new WeakSet(), a = [];
    let l = !1;
    const h = i.app = {
      _uid: bh++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: td,
      get config() {
        return i.config;
      },
      set config(c) {
      },
      use(c, ...v) {
        return o.has(c) || (c && ke(c.install) ? (o.add(c), c.install(h, ...v)) : ke(c) && (o.add(c), c(h, ...v))), h;
      },
      mixin(c) {
        return i.mixins.includes(c) || i.mixins.push(c), h;
      },
      component(c, v) {
        return v ? (i.components[c] = v, h) : i.components[c];
      },
      directive(c, v) {
        return v ? (i.directives[c] = v, h) : i.directives[c];
      },
      mount(c, v, w) {
        if (!l) {
          const z = h._ceVNode || yn(s, r);
          return z.appContext = i, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(z, c, w), l = !0, h._container = c, c.__vue_app__ = h, qi(z.component);
        }
      },
      onUnmount(c) {
        a.push(c);
      },
      unmount() {
        l && (vn(
          a,
          h._instance,
          16
        ), e(null, h._container), delete h._container.__vue_app__);
      },
      provide(c, v) {
        return i.provides[c] = v, h;
      },
      runWithContext(c) {
        const v = $s;
        $s = h;
        try {
          return c();
        } finally {
          $s = v;
        }
      }
    };
    return h;
  };
}
let $s = null;
function wh(e, t) {
  if (Bt) {
    let n = Bt.provides;
    const s = Bt.parent && Bt.parent.provides;
    s === n && (n = Bt.provides = Object.create(s)), n[e] = t;
  }
}
function ri(e, t, n = !1) {
  const s = Yh();
  if (s || $s) {
    let r = $s ? $s._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && ke(t) ? t.call(s && s.proxy) : t;
  }
}
const Kc = {}, Gc = () => Object.create(Kc), Yc = (e) => Object.getPrototypeOf(e) === Kc;
function kh(e, t, n, s = !1) {
  const r = {}, i = Gc();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Xc(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : zf(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function Th(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, a = We(r), [l] = e.propsOptions;
  let h = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const c = e.vnode.dynamicProps;
      for (let v = 0; v < c.length; v++) {
        let w = c[v];
        if (zi(e.emitsOptions, w))
          continue;
        const z = t[w];
        if (l)
          if (je(i, w))
            z !== i[w] && (i[w] = z, h = !0);
          else {
            const I = Qn(w);
            r[I] = Bo(
              l,
              a,
              I,
              z,
              e,
              !1
            );
          }
        else
          z !== i[w] && (i[w] = z, h = !0);
      }
    }
  } else {
    Xc(e, t, r, i) && (h = !0);
    let c;
    for (const v in a)
      (!t || // for camelCase
      !je(t, v) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = ss(v)) === v || !je(t, c))) && (l ? n && // for camelCase
      (n[v] !== void 0 || // for kebab-case
      n[c] !== void 0) && (r[v] = Bo(
        l,
        a,
        v,
        void 0,
        e,
        !0
      )) : delete r[v]);
    if (i !== a)
      for (const v in i)
        (!t || !je(t, v)) && (delete i[v], h = !0);
  }
  h && Nn(e.attrs, "set", "");
}
function Xc(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, a;
  if (t)
    for (let l in t) {
      if (wr(l))
        continue;
      const h = t[l];
      let c;
      r && je(r, c = Qn(l)) ? !i || !i.includes(c) ? n[c] = h : (a || (a = {}))[c] = h : zi(e.emitsOptions, l) || (!(l in s) || h !== s[l]) && (s[l] = h, o = !0);
    }
  if (i) {
    const l = We(n), h = a || tt;
    for (let c = 0; c < i.length; c++) {
      const v = i[c];
      n[v] = Bo(
        r,
        l,
        v,
        h[v],
        e,
        !je(h, v)
      );
    }
  }
  return o;
}
function Bo(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const a = je(o, "default");
    if (a && s === void 0) {
      const l = o.default;
      if (o.type !== Function && !o.skipFactory && ke(l)) {
        const { propsDefaults: h } = r;
        if (n in h)
          s = h[n];
        else {
          const c = Dr(r);
          s = h[n] = l.call(
            null,
            t
          ), c();
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
    ] && (s === "" || s === ss(n)) && (s = !0));
  }
  return s;
}
const xh = /* @__PURE__ */ new WeakMap();
function Zc(e, t, n = !1) {
  const s = n ? xh : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, a = [];
  let l = !1;
  if (!ke(e)) {
    const c = (v) => {
      l = !0;
      const [w, z] = Zc(v, t, !0);
      Pt(o, w), z && a.push(...z);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!i && !l)
    return ut(e) && s.set(e, Ps), Ps;
  if (be(i))
    for (let c = 0; c < i.length; c++) {
      const v = Qn(i[c]);
      ol(v) && (o[v] = tt);
    }
  else if (i)
    for (const c in i) {
      const v = Qn(c);
      if (ol(v)) {
        const w = i[c], z = o[v] = be(w) || ke(w) ? { type: w } : Pt({}, w), I = z.type;
        let K = !1, D = !0;
        if (be(I))
          for (let oe = 0; oe < I.length; ++oe) {
            const fe = I[oe], pe = ke(fe) && fe.name;
            if (pe === "Boolean") {
              K = !0;
              break;
            } else pe === "String" && (D = !1);
          }
        else
          K = ke(I) && I.name === "Boolean";
        z[
          0
          /* shouldCast */
        ] = K, z[
          1
          /* shouldCastTrue */
        ] = D, (K || je(z, "default")) && a.push(v);
      }
    }
  const h = [o, a];
  return ut(e) && s.set(e, h), h;
}
function ol(e) {
  return e[0] !== "$" && !wr(e);
}
const ha = (e) => e === "_" || e === "__" || e === "_ctx" || e === "$stable", da = (e) => be(e) ? e.map(gn) : [gn(e)], Sh = (e, t, n) => {
  if (t._n)
    return t;
  const s = Qf((...r) => da(t(...r)), n);
  return s._c = !1, s;
}, Jc = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (ha(r)) continue;
    const i = e[r];
    if (ke(i))
      t[r] = Sh(r, i, s);
    else if (i != null) {
      const o = da(i);
      t[r] = () => o;
    }
  }
}, Qc = (e, t) => {
  const n = da(t);
  e.slots.default = () => n;
}, eu = (e, t, n) => {
  for (const s in t)
    (n || !ha(s)) && (e[s] = t[s]);
}, Ah = (e, t, n) => {
  const s = e.slots = Gc();
  if (e.vnode.shapeFlag & 32) {
    const r = t.__;
    r && Io(s, "__", r, !0);
    const i = t._;
    i ? (eu(s, t, n), n && Io(s, "_", i, !0)) : Jc(t, s);
  } else t && Qc(e, t);
}, Eh = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = tt;
  if (s.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? i = !1 : eu(r, t, n) : (i = !t.$stable, Jc(t, r)), o = t;
  } else t && (Qc(e, t), o = { default: 1 });
  if (i)
    for (const a in r)
      !ha(a) && o[a] == null && delete r[a];
}, jt = zh;
function Ch(e) {
  return Rh(e);
}
function Rh(e, t) {
  const n = Mi();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: a,
    createComment: l,
    setText: h,
    setElementText: c,
    parentNode: v,
    nextSibling: w,
    setScopeId: z = _n,
    insertStaticContent: I
  } = e, K = (g, y, E, N = null, $ = null, O = null, G = void 0, q = null, W = !!y.dynamicChildren) => {
    if (g === y)
      return;
    g && !lr(g, y) && (N = pt(g), Je(g, $, O, !0), g = null), y.patchFlag === -2 && (W = !1, y.dynamicChildren = null);
    const { type: U, ref: te, shapeFlag: X } = y;
    switch (U) {
      case Hi:
        D(g, y, E, N);
        break;
      case ts:
        oe(g, y, E, N);
        break;
      case ii:
        g == null && fe(y, E, N, G);
        break;
      case ze:
        ve(
          g,
          y,
          E,
          N,
          $,
          O,
          G,
          q,
          W
        );
        break;
      default:
        X & 1 ? P(
          g,
          y,
          E,
          N,
          $,
          O,
          G,
          q,
          W
        ) : X & 6 ? Ke(
          g,
          y,
          E,
          N,
          $,
          O,
          G,
          q,
          W
        ) : (X & 64 || X & 128) && U.process(
          g,
          y,
          E,
          N,
          $,
          O,
          G,
          q,
          W,
          Mt
        );
    }
    te != null && $ ? xr(te, g && g.ref, O, y || g, !y) : te == null && g && g.ref != null && xr(g.ref, null, O, g, !0);
  }, D = (g, y, E, N) => {
    if (g == null)
      s(
        y.el = a(y.children),
        E,
        N
      );
    else {
      const $ = y.el = g.el;
      y.children !== g.children && h($, y.children);
    }
  }, oe = (g, y, E, N) => {
    g == null ? s(
      y.el = l(y.children || ""),
      E,
      N
    ) : y.el = g.el;
  }, fe = (g, y, E, N) => {
    [g.el, g.anchor] = I(
      g.children,
      y,
      E,
      N,
      g.el,
      g.anchor
    );
  }, pe = ({ el: g, anchor: y }, E, N) => {
    let $;
    for (; g && g !== y; )
      $ = w(g), s(g, E, N), g = $;
    s(y, E, N);
  }, C = ({ el: g, anchor: y }) => {
    let E;
    for (; g && g !== y; )
      E = w(g), r(g), g = E;
    r(y);
  }, P = (g, y, E, N, $, O, G, q, W) => {
    y.type === "svg" ? G = "svg" : y.type === "math" && (G = "mathml"), g == null ? Y(
      y,
      E,
      N,
      $,
      O,
      G,
      q,
      W
    ) : Le(
      g,
      y,
      $,
      O,
      G,
      q,
      W
    );
  }, Y = (g, y, E, N, $, O, G, q) => {
    let W, U;
    const { props: te, shapeFlag: X, transition: A, dirs: L } = g;
    if (W = g.el = o(
      g.type,
      O,
      te && te.is,
      te
    ), X & 8 ? c(W, g.children) : X & 16 && Te(
      g.children,
      W,
      null,
      N,
      $,
      uo(g, O),
      G,
      q
    ), L && us(g, null, N, "created"), Z(W, g, g.scopeId, G, N), te) {
      for (const J in te)
        J !== "value" && !wr(J) && i(W, J, null, te[J], O, N);
      "value" in te && i(W, "value", null, te.value, O), (U = te.onVnodeBeforeMount) && hn(U, N, g);
    }
    L && us(g, null, N, "beforeMount");
    const V = Ih($, A);
    V && A.beforeEnter(W), s(W, y, E), ((U = te && te.onVnodeMounted) || V || L) && jt(() => {
      U && hn(U, N, g), V && A.enter(W), L && us(g, null, N, "mounted");
    }, $);
  }, Z = (g, y, E, N, $) => {
    if (E && z(g, E), N)
      for (let O = 0; O < N.length; O++)
        z(g, N[O]);
    if ($) {
      let O = $.subTree;
      if (y === O || ou(O.type) && (O.ssContent === y || O.ssFallback === y)) {
        const G = $.vnode;
        Z(
          g,
          G,
          G.scopeId,
          G.slotScopeIds,
          $.parent
        );
      }
    }
  }, Te = (g, y, E, N, $, O, G, q, W = 0) => {
    for (let U = W; U < g.length; U++) {
      const te = g[U] = q ? Yn(g[U]) : gn(g[U]);
      K(
        null,
        te,
        y,
        E,
        N,
        $,
        O,
        G,
        q
      );
    }
  }, Le = (g, y, E, N, $, O, G) => {
    const q = y.el = g.el;
    let { patchFlag: W, dynamicChildren: U, dirs: te } = y;
    W |= g.patchFlag & 16;
    const X = g.props || tt, A = y.props || tt;
    let L;
    if (E && fs(E, !1), (L = A.onVnodeBeforeUpdate) && hn(L, E, y, g), te && us(y, g, E, "beforeUpdate"), E && fs(E, !0), (X.innerHTML && A.innerHTML == null || X.textContent && A.textContent == null) && c(q, ""), U ? _e(
      g.dynamicChildren,
      U,
      q,
      E,
      N,
      uo(y, $),
      O
    ) : G || ge(
      g,
      y,
      q,
      null,
      E,
      N,
      uo(y, $),
      O,
      !1
    ), W > 0) {
      if (W & 16)
        De(q, X, A, E, $);
      else if (W & 2 && X.class !== A.class && i(q, "class", null, A.class, $), W & 4 && i(q, "style", X.style, A.style, $), W & 8) {
        const V = y.dynamicProps;
        for (let J = 0; J < V.length; J++) {
          const ae = V[J], we = X[ae], Ae = A[ae];
          (Ae !== we || ae === "value") && i(q, ae, we, Ae, $, E);
        }
      }
      W & 1 && g.children !== y.children && c(q, y.children);
    } else !G && U == null && De(q, X, A, E, $);
    ((L = A.onVnodeUpdated) || te) && jt(() => {
      L && hn(L, E, y, g), te && us(y, g, E, "updated");
    }, N);
  }, _e = (g, y, E, N, $, O, G) => {
    for (let q = 0; q < y.length; q++) {
      const W = g[q], U = y[q], te = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        W.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (W.type === ze || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !lr(W, U) || // - In the case of a component, it could contain anything.
        W.shapeFlag & 198) ? v(W.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          E
        )
      );
      K(
        W,
        U,
        te,
        null,
        N,
        $,
        O,
        G,
        !0
      );
    }
  }, De = (g, y, E, N, $) => {
    if (y !== E) {
      if (y !== tt)
        for (const O in y)
          !wr(O) && !(O in E) && i(
            g,
            O,
            y[O],
            null,
            $,
            N
          );
      for (const O in E) {
        if (wr(O)) continue;
        const G = E[O], q = y[O];
        G !== q && O !== "value" && i(g, O, q, G, $, N);
      }
      "value" in E && i(g, "value", y.value, E.value, $);
    }
  }, ve = (g, y, E, N, $, O, G, q, W) => {
    const U = y.el = g ? g.el : a(""), te = y.anchor = g ? g.anchor : a("");
    let { patchFlag: X, dynamicChildren: A, slotScopeIds: L } = y;
    L && (q = q ? q.concat(L) : L), g == null ? (s(U, E, N), s(te, E, N), Te(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      y.children || [],
      E,
      te,
      $,
      O,
      G,
      q,
      W
    )) : X > 0 && X & 64 && A && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    g.dynamicChildren ? (_e(
      g.dynamicChildren,
      A,
      E,
      $,
      O,
      G,
      q
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (y.key != null || $ && y === $.subTree) && tu(
      g,
      y,
      !0
      /* shallow */
    )) : ge(
      g,
      y,
      E,
      te,
      $,
      O,
      G,
      q,
      W
    );
  }, Ke = (g, y, E, N, $, O, G, q, W) => {
    y.slotScopeIds = q, g == null ? y.shapeFlag & 512 ? $.ctx.activate(
      y,
      E,
      N,
      G,
      W
    ) : Ge(
      y,
      E,
      N,
      $,
      O,
      G,
      W
    ) : at(g, y, W);
  }, Ge = (g, y, E, N, $, O, G) => {
    const q = g.component = Gh(
      g,
      N,
      $
    );
    if (zc(g) && (q.ctx.renderer = Mt), Xh(q, !1, G), q.asyncDep) {
      if ($ && $.registerDep(q, ue, G), !g.el) {
        const W = q.subTree = yn(ts);
        oe(null, W, y, E), g.placeholder = W.el;
      }
    } else
      ue(
        q,
        g,
        y,
        E,
        $,
        O,
        G
      );
  }, at = (g, y, E) => {
    const N = y.component = g.component;
    if (Bh(g, y, E))
      if (N.asyncDep && !N.asyncResolved) {
        ye(N, y, E);
        return;
      } else
        N.next = y, N.update();
    else
      y.el = g.el, N.vnode = y;
  }, ue = (g, y, E, N, $, O, G) => {
    const q = () => {
      if (g.isMounted) {
        let { next: X, bu: A, u: L, parent: V, vnode: J } = g;
        {
          const f = nu(g);
          if (f) {
            X && (X.el = J.el, ye(g, X, G)), f.asyncDep.then(() => {
              g.isUnmounted || q();
            });
            return;
          }
        }
        let ae = X, we;
        fs(g, !1), X ? (X.el = J.el, ye(g, X, G)) : X = J, A && si(A), (we = X.props && X.props.onVnodeBeforeUpdate) && hn(we, V, X, J), fs(g, !0);
        const Ae = ll(g), Pe = g.subTree;
        g.subTree = Ae, K(
          Pe,
          Ae,
          // parent may have changed if it's in a teleport
          v(Pe.el),
          // anchor may have changed if it's in a fragment
          pt(Pe),
          g,
          $,
          O
        ), X.el = Ae.el, ae === null && Uh(g, Ae.el), L && jt(L, $), (we = X.props && X.props.onVnodeUpdated) && jt(
          () => hn(we, V, X, J),
          $
        );
      } else {
        let X;
        const { el: A, props: L } = y, { bm: V, m: J, parent: ae, root: we, type: Ae } = g, Pe = Sr(y);
        fs(g, !1), V && si(V), !Pe && (X = L && L.onVnodeBeforeMount) && hn(X, ae, y), fs(g, !0);
        {
          we.ce && // @ts-expect-error _def is private
          we.ce._def.shadowRoot !== !1 && we.ce._injectChildStyle(Ae);
          const f = g.subTree = ll(g);
          K(
            null,
            f,
            E,
            N,
            g,
            $,
            O
          ), y.el = f.el;
        }
        if (J && jt(J, $), !Pe && (X = L && L.onVnodeMounted)) {
          const f = y;
          jt(
            () => hn(X, ae, f),
            $
          );
        }
        (y.shapeFlag & 256 || ae && Sr(ae.vnode) && ae.vnode.shapeFlag & 256) && g.a && jt(g.a, $), g.isMounted = !0, y = E = N = null;
      }
    };
    g.scope.on();
    const W = g.effect = new bc(q);
    g.scope.off();
    const U = g.update = W.run.bind(W), te = g.job = W.runIfDirty.bind(W);
    te.i = g, te.id = g.uid, W.scheduler = () => ca(te), fs(g, !0), U();
  }, ye = (g, y, E) => {
    y.component = g;
    const N = g.vnode.props;
    g.vnode = y, g.next = null, Th(g, y.props, N, E), Eh(g, y.children, E), Fn(), tl(g), $n();
  }, ge = (g, y, E, N, $, O, G, q, W = !1) => {
    const U = g && g.children, te = g ? g.shapeFlag : 0, X = y.children, { patchFlag: A, shapeFlag: L } = y;
    if (A > 0) {
      if (A & 128) {
        Xe(
          U,
          X,
          E,
          N,
          $,
          O,
          G,
          q,
          W
        );
        return;
      } else if (A & 256) {
        nt(
          U,
          X,
          E,
          N,
          $,
          O,
          G,
          q,
          W
        );
        return;
      }
    }
    L & 8 ? (te & 16 && yt(U, $, O), X !== U && c(E, X)) : te & 16 ? L & 16 ? Xe(
      U,
      X,
      E,
      N,
      $,
      O,
      G,
      q,
      W
    ) : yt(U, $, O, !0) : (te & 8 && c(E, ""), L & 16 && Te(
      X,
      E,
      N,
      $,
      O,
      G,
      q,
      W
    ));
  }, nt = (g, y, E, N, $, O, G, q, W) => {
    g = g || Ps, y = y || Ps;
    const U = g.length, te = y.length, X = Math.min(U, te);
    let A;
    for (A = 0; A < X; A++) {
      const L = y[A] = W ? Yn(y[A]) : gn(y[A]);
      K(
        g[A],
        L,
        E,
        null,
        $,
        O,
        G,
        q,
        W
      );
    }
    U > te ? yt(
      g,
      $,
      O,
      !0,
      !1,
      X
    ) : Te(
      y,
      E,
      N,
      $,
      O,
      G,
      q,
      W,
      X
    );
  }, Xe = (g, y, E, N, $, O, G, q, W) => {
    let U = 0;
    const te = y.length;
    let X = g.length - 1, A = te - 1;
    for (; U <= X && U <= A; ) {
      const L = g[U], V = y[U] = W ? Yn(y[U]) : gn(y[U]);
      if (lr(L, V))
        K(
          L,
          V,
          E,
          null,
          $,
          O,
          G,
          q,
          W
        );
      else
        break;
      U++;
    }
    for (; U <= X && U <= A; ) {
      const L = g[X], V = y[A] = W ? Yn(y[A]) : gn(y[A]);
      if (lr(L, V))
        K(
          L,
          V,
          E,
          null,
          $,
          O,
          G,
          q,
          W
        );
      else
        break;
      X--, A--;
    }
    if (U > X) {
      if (U <= A) {
        const L = A + 1, V = L < te ? y[L].el : N;
        for (; U <= A; )
          K(
            null,
            y[U] = W ? Yn(y[U]) : gn(y[U]),
            E,
            V,
            $,
            O,
            G,
            q,
            W
          ), U++;
      }
    } else if (U > A)
      for (; U <= X; )
        Je(g[U], $, O, !0), U++;
    else {
      const L = U, V = U, J = /* @__PURE__ */ new Map();
      for (U = V; U <= A; U++) {
        const T = y[U] = W ? Yn(y[U]) : gn(y[U]);
        T.key != null && J.set(T.key, U);
      }
      let ae, we = 0;
      const Ae = A - V + 1;
      let Pe = !1, f = 0;
      const _ = new Array(Ae);
      for (U = 0; U < Ae; U++) _[U] = 0;
      for (U = L; U <= X; U++) {
        const T = g[U];
        if (we >= Ae) {
          Je(T, $, O, !0);
          continue;
        }
        let H;
        if (T.key != null)
          H = J.get(T.key);
        else
          for (ae = V; ae <= A; ae++)
            if (_[ae - V] === 0 && lr(T, y[ae])) {
              H = ae;
              break;
            }
        H === void 0 ? Je(T, $, O, !0) : (_[H - V] = U + 1, H >= f ? f = H : Pe = !0, K(
          T,
          y[H],
          E,
          null,
          $,
          O,
          G,
          q,
          W
        ), we++);
      }
      const M = Pe ? Lh(_) : Ps;
      for (ae = M.length - 1, U = Ae - 1; U >= 0; U--) {
        const T = V + U, H = y[T], ne = y[T + 1], ee = T + 1 < te ? (
          // #13559, fallback to el placeholder for unresolved async component
          ne.el || ne.placeholder
        ) : N;
        _[U] === 0 ? K(
          null,
          H,
          E,
          ee,
          $,
          O,
          G,
          q,
          W
        ) : Pe && (ae < 0 || U !== M[ae] ? Se(H, E, ee, 2) : ae--);
      }
    }
  }, Se = (g, y, E, N, $ = null) => {
    const { el: O, type: G, transition: q, children: W, shapeFlag: U } = g;
    if (U & 6) {
      Se(g.component.subTree, y, E, N);
      return;
    }
    if (U & 128) {
      g.suspense.move(y, E, N);
      return;
    }
    if (U & 64) {
      G.move(g, y, E, Mt);
      return;
    }
    if (G === ze) {
      s(O, y, E);
      for (let X = 0; X < W.length; X++)
        Se(W[X], y, E, N);
      s(g.anchor, y, E);
      return;
    }
    if (G === ii) {
      pe(g, y, E);
      return;
    }
    if (N !== 2 && U & 1 && q)
      if (N === 0)
        q.beforeEnter(O), s(O, y, E), jt(() => q.enter(O), $);
      else {
        const { leave: X, delayLeave: A, afterLeave: L } = q, V = () => {
          g.ctx.isUnmounted ? r(O) : s(O, y, E);
        }, J = () => {
          X(O, () => {
            V(), L && L();
          });
        };
        A ? A(O, V, J) : J();
      }
    else
      s(O, y, E);
  }, Je = (g, y, E, N = !1, $ = !1) => {
    const {
      type: O,
      props: G,
      ref: q,
      children: W,
      dynamicChildren: U,
      shapeFlag: te,
      patchFlag: X,
      dirs: A,
      cacheIndex: L
    } = g;
    if (X === -2 && ($ = !1), q != null && (Fn(), xr(q, null, E, g, !0), $n()), L != null && (y.renderCache[L] = void 0), te & 256) {
      y.ctx.deactivate(g);
      return;
    }
    const V = te & 1 && A, J = !Sr(g);
    let ae;
    if (J && (ae = G && G.onVnodeBeforeUnmount) && hn(ae, y, g), te & 6)
      Ce(g.component, E, N);
    else {
      if (te & 128) {
        g.suspense.unmount(E, N);
        return;
      }
      V && us(g, null, y, "beforeUnmount"), te & 64 ? g.type.remove(
        g,
        y,
        E,
        Mt,
        N
      ) : U && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !U.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (O !== ze || X > 0 && X & 64) ? yt(
        U,
        y,
        E,
        !1,
        !0
      ) : (O === ze && X & 384 || !$ && te & 16) && yt(W, y, E), N && st(g);
    }
    (J && (ae = G && G.onVnodeUnmounted) || V) && jt(() => {
      ae && hn(ae, y, g), V && us(g, null, y, "unmounted");
    }, E);
  }, st = (g) => {
    const { type: y, el: E, anchor: N, transition: $ } = g;
    if (y === ze) {
      St(E, N);
      return;
    }
    if (y === ii) {
      C(g);
      return;
    }
    const O = () => {
      r(E), $ && !$.persisted && $.afterLeave && $.afterLeave();
    };
    if (g.shapeFlag & 1 && $ && !$.persisted) {
      const { leave: G, delayLeave: q } = $, W = () => G(E, O);
      q ? q(g.el, O, W) : W();
    } else
      O();
  }, St = (g, y) => {
    let E;
    for (; g !== y; )
      E = w(g), r(g), g = E;
    r(y);
  }, Ce = (g, y, E) => {
    const {
      bum: N,
      scope: $,
      job: O,
      subTree: G,
      um: q,
      m: W,
      a: U,
      parent: te,
      slots: { __: X }
    } = g;
    al(W), al(U), N && si(N), te && be(X) && X.forEach((A) => {
      te.renderCache[A] = void 0;
    }), $.stop(), O && (O.flags |= 8, Je(G, g, y, E)), q && jt(q, y), jt(() => {
      g.isUnmounted = !0;
    }, y), y && y.pendingBranch && !y.isUnmounted && g.asyncDep && !g.asyncResolved && g.suspenseId === y.pendingId && (y.deps--, y.deps === 0 && y.resolve());
  }, yt = (g, y, E, N = !1, $ = !1, O = 0) => {
    for (let G = O; G < g.length; G++)
      Je(g[G], y, E, N, $);
  }, pt = (g) => {
    if (g.shapeFlag & 6)
      return pt(g.component.subTree);
    if (g.shapeFlag & 128)
      return g.suspense.next();
    const y = w(g.anchor || g.el), E = y && y[eh];
    return E ? w(E) : y;
  };
  let Ct = !1;
  const Rt = (g, y, E) => {
    g == null ? y._vnode && Je(y._vnode, null, null, !0) : K(
      y._vnode || null,
      g,
      y,
      null,
      null,
      null,
      E
    ), y._vnode = g, Ct || (Ct = !0, tl(), Fc(), Ct = !1);
  }, Mt = {
    p: K,
    um: Je,
    m: Se,
    r: st,
    mt: Ge,
    mc: Te,
    pc: ge,
    pbc: _e,
    n: pt,
    o: e
  };
  return {
    render: Rt,
    hydrate: void 0,
    createApp: vh(Rt)
  };
}
function uo({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function fs({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ih(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function tu(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (be(s) && be(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let a = r[i];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = r[i] = Yn(r[i]), a.el = o.el), !n && a.patchFlag !== -2 && tu(o, a)), a.type === Hi && (a.el = o.el), a.type === ts && !a.el && (a.el = o.el);
    }
}
function Lh(e) {
  const t = e.slice(), n = [0];
  let s, r, i, o, a;
  const l = e.length;
  for (s = 0; s < l; s++) {
    const h = e[s];
    if (h !== 0) {
      if (r = n[n.length - 1], e[r] < h) {
        t[s] = r, n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        a = i + o >> 1, e[n[a]] < h ? i = a + 1 : o = a;
      h < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = t[o];
  return n;
}
function nu(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : nu(t);
}
function al(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Oh = Symbol.for("v-scx"), Nh = () => ri(Oh);
function Ft(e, t, n) {
  return su(e, t, n);
}
function su(e, t, n = tt) {
  const { immediate: s, deep: r, flush: i, once: o } = n, a = Pt({}, n), l = t && s || !t && i !== "post";
  let h;
  if (Nr) {
    if (i === "sync") {
      const z = Nh();
      h = z.__watcherHandles || (z.__watcherHandles = []);
    } else if (!l) {
      const z = () => {
      };
      return z.stop = _n, z.resume = _n, z.pause = _n, z;
    }
  }
  const c = Bt;
  a.call = (z, I, K) => vn(z, c, I, K);
  let v = !1;
  i === "post" ? a.scheduler = (z) => {
    jt(z, c && c.suspense);
  } : i !== "sync" && (v = !0, a.scheduler = (z, I) => {
    I ? z() : ca(z);
  }), a.augmentJob = (z) => {
    t && (z.flags |= 4), v && (z.flags |= 2, c && (z.id = c.uid, z.i = c));
  };
  const w = Yf(e, t, a);
  return Nr && (h ? h.push(w) : l && w()), w;
}
function Ph(e, t, n) {
  const s = this.proxy, r = gt(e) ? e.includes(".") ? ru(s, e) : () => s[e] : e.bind(s, s);
  let i;
  ke(t) ? i = t : (i = t.handler, n = t);
  const o = Dr(this), a = su(r, i.bind(s), n);
  return o(), a;
}
function ru(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const Mh = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Qn(t)}Modifiers`] || e[`${ss(t)}Modifiers`];
function Dh(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || tt;
  let r = n;
  const i = t.startsWith("update:"), o = i && Mh(s, t.slice(7));
  o && (o.trim && (r = n.map((c) => gt(c) ? c.trim() : c)), o.number && (r = n.map(Lo)));
  let a, l = s[a = ro(t)] || // also try camelCase event handler (#2249)
  s[a = ro(Qn(t))];
  !l && i && (l = s[a = ro(ss(t))]), l && vn(
    l,
    e,
    6,
    r
  );
  const h = s[a + "Once"];
  if (h) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, vn(
      h,
      e,
      6,
      r
    );
  }
}
function iu(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, a = !1;
  if (!ke(e)) {
    const l = (h) => {
      const c = iu(h, t, !0);
      c && (a = !0, Pt(o, c));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !i && !a ? (ut(e) && s.set(e, null), null) : (be(i) ? i.forEach((l) => o[l] = null) : Pt(o, i), ut(e) && s.set(e, o), o);
}
function zi(e, t) {
  return !e || !Oi(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), je(e, t[0].toLowerCase() + t.slice(1)) || je(e, ss(t)) || je(e, t));
}
function ll(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    propsOptions: [i],
    slots: o,
    attrs: a,
    emit: l,
    render: h,
    renderCache: c,
    props: v,
    data: w,
    setupState: z,
    ctx: I,
    inheritAttrs: K
  } = e, D = ki(e);
  let oe, fe;
  try {
    if (n.shapeFlag & 4) {
      const C = r || s, P = C;
      oe = gn(
        h.call(
          P,
          C,
          c,
          v,
          z,
          w,
          I
        )
      ), fe = a;
    } else {
      const C = t;
      oe = gn(
        C.length > 1 ? C(
          v,
          { attrs: a, slots: o, emit: l }
        ) : C(
          v,
          null
        )
      ), fe = t.props ? a : Fh(a);
    }
  } catch (C) {
    Er.length = 0, $i(C, e, 1), oe = yn(ts);
  }
  let pe = oe;
  if (fe && K !== !1) {
    const C = Object.keys(fe), { shapeFlag: P } = pe;
    C.length && P & 7 && (i && C.some(Qo) && (fe = $h(
      fe,
      i
    )), pe = Hs(pe, fe, !1, !0));
  }
  return n.dirs && (pe = Hs(pe, null, !1, !0), pe.dirs = pe.dirs ? pe.dirs.concat(n.dirs) : n.dirs), n.transition && ua(pe, n.transition), oe = pe, ki(D), oe;
}
const Fh = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Oi(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, $h = (e, t) => {
  const n = {};
  for (const s in e)
    (!Qo(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Bh(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: a, patchFlag: l } = t, h = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return s ? cl(s, o, h) : !!o;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let v = 0; v < c.length; v++) {
        const w = c[v];
        if (o[w] !== s[w] && !zi(h, w))
          return !0;
      }
    }
  } else
    return (r || a) && (!a || !a.$stable) ? !0 : s === o ? !1 : s ? o ? cl(s, o, h) : !0 : !!o;
  return !1;
}
function cl(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !zi(n, i))
      return !0;
  }
  return !1;
}
function Uh({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const ou = (e) => e.__isSuspense;
function zh(e, t) {
  t && t.pendingBranch ? be(e) ? t.effects.push(...e) : t.effects.push(e) : Jf(e);
}
const ze = Symbol.for("v-fgt"), Hi = Symbol.for("v-txt"), ts = Symbol.for("v-cmt"), ii = Symbol.for("v-stc"), Er = [];
let Kt = null;
function x(e = !1) {
  Er.push(Kt = e ? null : []);
}
function Hh() {
  Er.pop(), Kt = Er[Er.length - 1] || null;
}
let Or = 1;
function ul(e, t = !1) {
  Or += e, e < 0 && Kt && t && (Kt.hasOnce = !0);
}
function au(e) {
  return e.dynamicChildren = Or > 0 ? Kt || Ps : null, Hh(), Or > 0 && Kt && Kt.push(e), e;
}
function S(e, t, n, s, r, i) {
  return au(
    b(
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
function xi(e, t, n, s, r) {
  return au(
    yn(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function lu(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function lr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const cu = ({ key: e }) => e ?? null, oi = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? gt(e) || Nt(e) || ke(e) ? { i: nn, r: e, k: t, f: !!n } : e : null);
function b(e, t = null, n = null, s = 0, r = null, i = e === ze ? 0 : 1, o = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && cu(t),
    ref: t && oi(t),
    scopeId: Bc,
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
    ctx: nn
  };
  return a ? (pa(l, n), i & 128 && e.normalize(l)) : n && (l.shapeFlag |= gt(n) ? 8 : 16), Or > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Kt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Kt.push(l), l;
}
const yn = qh;
function qh(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === hh) && (e = ts), lu(e)) {
    const a = Hs(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && pa(a, n), Or > 0 && !i && Kt && (a.shapeFlag & 6 ? Kt[Kt.indexOf(e)] = a : Kt.push(a)), a.patchFlag = -2, a;
  }
  if (ed(e) && (e = e.__vccOpts), t) {
    t = Wh(t);
    let { class: a, style: l } = t;
    a && !gt(a) && (t.class = Ue(a)), ut(l) && (la(l) && !be(l) && (l = Pt({}, l)), t.style = Me(l));
  }
  const o = gt(e) ? 1 : ou(e) ? 128 : th(e) ? 64 : ut(e) ? 4 : ke(e) ? 2 : 0;
  return b(
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
function Wh(e) {
  return e ? la(e) || Yc(e) ? Pt({}, e) : e : null;
}
function Hs(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: a, transition: l } = e, h = t ? jh(r || {}, t) : r, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: h,
    key: h && cu(h),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? be(i) ? i.concat(oi(t)) : [i, oi(t)] : oi(t)
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
    patchFlag: t && e.type !== ze ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: e.ssContent && Hs(e.ssContent),
    ssFallback: e.ssFallback && Hs(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && s && ua(
    c,
    l.clone(c)
  ), c;
}
function Ln(e = " ", t = 0) {
  return yn(Hi, null, e, t);
}
function fo(e, t) {
  const n = yn(ii, null, e);
  return n.staticCount = t, n;
}
function le(e = "", t = !1) {
  return t ? (x(), xi(ts, null, e)) : yn(ts, null, e);
}
function gn(e) {
  return e == null || typeof e == "boolean" ? yn(ts) : be(e) ? yn(
    ze,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : lu(e) ? Yn(e) : yn(Hi, null, String(e));
}
function Yn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Hs(e);
}
function pa(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (be(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), pa(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Yc(t) ? t._ctx = nn : r === 3 && nn && (nn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else ke(t) ? (t = { default: t, _ctx: nn }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Ln(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function jh(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Ue([t.class, s.class]));
      else if (r === "style")
        t.style = Me([t.style, s.style]);
      else if (Oi(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(be(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function hn(e, t, n, s = null) {
  vn(e, t, 7, [
    n,
    s
  ]);
}
const Vh = Vc();
let Kh = 0;
function Gh(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || Vh, i = {
    uid: Kh++,
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
    scope: new wf(
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
    propsOptions: Zc(s, r),
    emitsOptions: iu(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: tt,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: tt,
    data: tt,
    props: tt,
    attrs: tt,
    slots: tt,
    refs: tt,
    setupState: tt,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Dh.bind(null, i), e.ce && e.ce(i), i;
}
let Bt = null;
const Yh = () => Bt || nn;
let Si, Uo;
{
  const e = Mi(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  Si = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Bt = n
  ), Uo = t(
    "__VUE_SSR_SETTERS__",
    (n) => Nr = n
  );
}
const Dr = (e) => {
  const t = Bt;
  return Si(e), e.scope.on(), () => {
    e.scope.off(), Si(t);
  };
}, fl = () => {
  Bt && Bt.scope.off(), Si(null);
};
function uu(e) {
  return e.vnode.shapeFlag & 4;
}
let Nr = !1;
function Xh(e, t = !1, n = !1) {
  t && Uo(t);
  const { props: s, children: r } = e.vnode, i = uu(e);
  kh(e, s, i, t), Ah(e, r, n || t);
  const o = i ? Zh(e, t) : void 0;
  return t && Uo(!1), o;
}
function Zh(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, dh);
  const { setup: s } = n;
  if (s) {
    Fn();
    const r = e.setupContext = s.length > 1 ? Qh(e) : null, i = Dr(e), o = Pr(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), a = hc(o);
    if ($n(), i(), (a || e.sp) && !Sr(e) && Uc(e), a) {
      if (o.then(fl, fl), t)
        return o.then((l) => {
          hl(e, l);
        }).catch((l) => {
          $i(l, e, 0);
        });
      e.asyncDep = o;
    } else
      hl(e, o);
  } else
    fu(e);
}
function hl(e, t, n) {
  ke(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ut(t) && (e.setupState = Pc(t)), fu(e);
}
function fu(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || _n);
  {
    const r = Dr(e);
    Fn();
    try {
      ph(e);
    } finally {
      $n(), r();
    }
  }
}
const Jh = {
  get(e, t) {
    return Ot(e, "get", ""), e[t];
  }
};
function Qh(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Jh),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function qi(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Pc(Hf(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Ar)
        return Ar[n](e);
    },
    has(t, n) {
      return n in t || n in Ar;
    }
  })) : e.proxy;
}
function ed(e) {
  return ke(e) && "__vccOpts" in e;
}
const de = (e, t) => Kf(e, t, Nr), td = "3.5.18";
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let zo;
const dl = typeof window < "u" && window.trustedTypes;
if (dl)
  try {
    zo = /* @__PURE__ */ dl.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const hu = zo ? (e) => zo.createHTML(e) : (e) => e, nd = "http://www.w3.org/2000/svg", sd = "http://www.w3.org/1998/Math/MathML", On = typeof document < "u" ? document : null, pl = On && /* @__PURE__ */ On.createElement("template"), rd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? On.createElementNS(nd, e) : t === "mathml" ? On.createElementNS(sd, e) : n ? On.createElement(e, { is: n }) : On.createElement(e);
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
      pl.innerHTML = hu(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const a = pl.content;
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
}, id = Symbol("_vtc");
function od(e, t, n) {
  const s = e[id];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ai = Symbol("_vod"), du = Symbol("_vsh"), ad = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[Ai] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : cr(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), cr(e, !0), s.enter(e)) : s.leave(e, () => {
      cr(e, !1);
    }) : cr(e, t));
  },
  beforeUnmount(e, { value: t }) {
    cr(e, t);
  }
};
function cr(e, t) {
  e.style.display = t ? e[Ai] : "none", e[du] = !t;
}
const ld = Symbol(""), cd = /(^|;)\s*display\s*:/;
function ud(e, t, n) {
  const s = e.style, r = gt(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (gt(t))
        for (const o of t.split(";")) {
          const a = o.slice(0, o.indexOf(":")).trim();
          n[a] == null && ai(s, a, "");
        }
      else
        for (const o in t)
          n[o] == null && ai(s, o, "");
    for (const o in n)
      o === "display" && (i = !0), ai(s, o, n[o]);
  } else if (r) {
    if (t !== n) {
      const o = s[ld];
      o && (n += ";" + o), s.cssText = n, i = cd.test(n);
    }
  } else t && e.removeAttribute("style");
  Ai in e && (e[Ai] = i ? s.display : "", e[du] && (s.display = "none"));
}
const ml = /\s*!important$/;
function ai(e, t, n) {
  if (be(n))
    n.forEach((s) => ai(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = fd(e, t);
    ml.test(n) ? e.setProperty(
      ss(s),
      n.replace(ml, ""),
      "important"
    ) : e[s] = n;
  }
}
const gl = ["Webkit", "Moz", "ms"], ho = {};
function fd(e, t) {
  const n = ho[t];
  if (n)
    return n;
  let s = Qn(t);
  if (s !== "filter" && s in e)
    return ho[t] = s;
  s = mc(s);
  for (let r = 0; r < gl.length; r++) {
    const i = gl[r] + s;
    if (i in e)
      return ho[t] = i;
  }
  return t;
}
const _l = "http://www.w3.org/1999/xlink";
function yl(e, t, n, s, r, i = vf(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(_l, t.slice(6, t.length)) : e.setAttributeNS(_l, t, n) : n == null || i && !gc(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : ns(n) ? String(n) : n
  );
}
function bl(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? hu(n) : n);
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
    a === "boolean" ? n = gc(n) : n == null && a === "string" ? (n = "", o = !0) : a === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function Os(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function hd(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const vl = Symbol("_vei");
function dd(e, t, n, s, r = null) {
  const i = e[vl] || (e[vl] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [a, l] = pd(t);
    if (s) {
      const h = i[t] = _d(
        s,
        r
      );
      Os(e, a, h, l);
    } else o && (hd(e, a, o, l), i[t] = void 0);
  }
}
const wl = /(?:Once|Passive|Capture)$/;
function pd(e) {
  let t;
  if (wl.test(e)) {
    t = {};
    let s;
    for (; s = e.match(wl); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ss(e.slice(2)), t];
}
let po = 0;
const md = /* @__PURE__ */ Promise.resolve(), gd = () => po || (md.then(() => po = 0), po = Date.now());
function _d(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    vn(
      yd(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = gd(), n;
}
function yd(e, t) {
  if (be(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (r) => !r._stopped && s && s(r)
    );
  } else
    return t;
}
const kl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, bd = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? od(e, s, o) : t === "style" ? ud(e, n, s) : Oi(t) ? Qo(t) || dd(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : vd(e, t, s, o)) ? (bl(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && yl(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !gt(s)) ? bl(e, Qn(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), yl(e, t, s, o));
};
function vd(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && kl(t) && ke(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return kl(t) && gt(n) ? !1 : t in e;
}
const Tl = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return be(t) ? (n) => si(t, n) : t;
};
function wd(e) {
  e.target.composing = !0;
}
function xl(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const mo = Symbol("_assign"), hs = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e[mo] = Tl(r);
    const i = s || r.props && r.props.type === "number";
    Os(e, t ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let a = e.value;
      n && (a = a.trim()), i && (a = Lo(a)), e[mo](a);
    }), n && Os(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Os(e, "compositionstart", wd), Os(e, "compositionend", xl), Os(e, "change", xl));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[mo] = Tl(o), e.composing) return;
    const a = (i || e.type === "number") && !/^0\d/.test(e.value) ? Lo(e.value) : e.value, l = t ?? "";
    a !== l && (document.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === l) || (e.value = l));
  }
}, kd = ["ctrl", "shift", "alt", "meta"], Td = {
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
  exact: (e, t) => kd.some((n) => e[`${n}Key`] && !t.includes(n))
}, ms = (e, t) => {
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const a = Td[t[o]];
      if (a && a(r, t)) return;
    }
    return e(r, ...i);
  });
}, xd = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, li = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = (r) => {
    if (!("key" in r))
      return;
    const i = ss(r.key);
    if (t.some(
      (o) => o === i || xd[o] === i
    ))
      return e(r);
  });
}, Sd = /* @__PURE__ */ Pt({ patchProp: bd }, rd);
let Sl;
function Ad() {
  return Sl || (Sl = Ch(Sd));
}
const Ed = (...e) => {
  const t = Ad().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = Rd(s);
    if (!r) return;
    const i = t._component;
    !ke(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, Cd(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
};
function Cd(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Rd(e) {
  return gt(e) ? document.querySelector(e) : e;
}
const Bs = (e) => {
  const t = e.replace("#", ""), n = parseInt(t.substr(0, 2), 16), s = parseInt(t.substr(2, 2), 16), r = parseInt(t.substr(4, 2), 16);
  return (n * 299 + s * 587 + r * 114) / 1e3 < 128;
}, Id = (e, t) => {
  const n = e.replace("#", ""), s = parseInt(n.substr(0, 2), 16), r = parseInt(n.substr(2, 2), 16), i = parseInt(n.substr(4, 2), 16), o = Bs(e), a = o ? Math.min(255, s + t) : Math.max(0, s - t), l = o ? Math.min(255, r + t) : Math.max(0, r - t), h = o ? Math.min(255, i + t) : Math.max(0, i - t);
  return `#${a.toString(16).padStart(2, "0")}${l.toString(16).padStart(2, "0")}${h.toString(16).padStart(2, "0")}`;
}, ur = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e), Ld = (e) => {
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
function ma() {
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
var vs = ma();
function pu(e) {
  vs = e;
}
var Cr = { exec: () => null };
function Ve(e, t = "") {
  let n = typeof e == "string" ? e : e.source;
  const s = {
    replace: (r, i) => {
      let o = typeof i == "string" ? i : i.source;
      return o = o.replace(Ut.caret, "$1"), n = n.replace(r, o), s;
    },
    getRegex: () => new RegExp(n, t)
  };
  return s;
}
var Ut = {
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
}, Od = /^(?:[ \t]*(?:\n|$))+/, Nd = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Pd = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Fr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Md = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ga = /(?:[*+-]|\d{1,9}[.)])/, mu = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, gu = Ve(mu).replace(/bull/g, ga).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Dd = Ve(mu).replace(/bull/g, ga).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), _a = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Fd = /^[^\n]+/, ya = /(?!\s*\])(?:\\.|[^\[\]\\])+/, $d = Ve(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ya).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Bd = Ve(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ga).getRegex(), Wi = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ba = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Ud = Ve(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", ba).replace("tag", Wi).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), _u = Ve(_a).replace("hr", Fr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Wi).getRegex(), zd = Ve(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", _u).getRegex(), va = {
  blockquote: zd,
  code: Nd,
  def: $d,
  fences: Pd,
  heading: Md,
  hr: Fr,
  html: Ud,
  lheading: gu,
  list: Bd,
  newline: Od,
  paragraph: _u,
  table: Cr,
  text: Fd
}, Al = Ve(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", Fr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Wi).getRegex(), Hd = {
  ...va,
  lheading: Dd,
  table: Al,
  paragraph: Ve(_a).replace("hr", Fr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Al).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Wi).getRegex()
}, qd = {
  ...va,
  html: Ve(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", ba).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Cr,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: Ve(_a).replace("hr", Fr).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", gu).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Wd = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, jd = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, yu = /^( {2,}|\\)\n(?!\s*$)/, Vd = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, ji = /[\p{P}\p{S}]/u, wa = /[\s\p{P}\p{S}]/u, bu = /[^\s\p{P}\p{S}]/u, Kd = Ve(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, wa).getRegex(), vu = /(?!~)[\p{P}\p{S}]/u, Gd = /(?!~)[\s\p{P}\p{S}]/u, Yd = /(?:[^\s\p{P}\p{S}]|~)/u, Xd = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, wu = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Zd = Ve(wu, "u").replace(/punct/g, ji).getRegex(), Jd = Ve(wu, "u").replace(/punct/g, vu).getRegex(), ku = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Qd = Ve(ku, "gu").replace(/notPunctSpace/g, bu).replace(/punctSpace/g, wa).replace(/punct/g, ji).getRegex(), ep = Ve(ku, "gu").replace(/notPunctSpace/g, Yd).replace(/punctSpace/g, Gd).replace(/punct/g, vu).getRegex(), tp = Ve(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, bu).replace(/punctSpace/g, wa).replace(/punct/g, ji).getRegex(), np = Ve(/\\(punct)/, "gu").replace(/punct/g, ji).getRegex(), sp = Ve(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), rp = Ve(ba).replace("(?:-->|$)", "-->").getRegex(), ip = Ve(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", rp).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Ei = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, op = Ve(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Ei).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Tu = Ve(/^!?\[(label)\]\[(ref)\]/).replace("label", Ei).replace("ref", ya).getRegex(), xu = Ve(/^!?\[(ref)\](?:\[\])?/).replace("ref", ya).getRegex(), ap = Ve("reflink|nolink(?!\\()", "g").replace("reflink", Tu).replace("nolink", xu).getRegex(), ka = {
  _backpedal: Cr,
  // only used for GFM url
  anyPunctuation: np,
  autolink: sp,
  blockSkip: Xd,
  br: yu,
  code: jd,
  del: Cr,
  emStrongLDelim: Zd,
  emStrongRDelimAst: Qd,
  emStrongRDelimUnd: tp,
  escape: Wd,
  link: op,
  nolink: xu,
  punctuation: Kd,
  reflink: Tu,
  reflinkSearch: ap,
  tag: ip,
  text: Vd,
  url: Cr
}, lp = {
  ...ka,
  link: Ve(/^!?\[(label)\]\((.*?)\)/).replace("label", Ei).getRegex(),
  reflink: Ve(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Ei).getRegex()
}, Ho = {
  ...ka,
  emStrongRDelimAst: ep,
  emStrongLDelim: Jd,
  url: Ve(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, cp = {
  ...Ho,
  br: Ve(yu).replace("{2,}", "*").getRegex(),
  text: Ve(Ho.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Qr = {
  normal: va,
  gfm: Hd,
  pedantic: qd
}, fr = {
  normal: ka,
  gfm: Ho,
  breaks: cp,
  pedantic: lp
}, up = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, El = (e) => up[e];
function pn(e, t) {
  if (t) {
    if (Ut.escapeTest.test(e))
      return e.replace(Ut.escapeReplace, El);
  } else if (Ut.escapeTestNoEncode.test(e))
    return e.replace(Ut.escapeReplaceNoEncode, El);
  return e;
}
function Cl(e) {
  try {
    e = encodeURI(e).replace(Ut.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function Rl(e, t) {
  var i;
  const n = e.replace(Ut.findPipe, (o, a, l) => {
    let h = !1, c = a;
    for (; --c >= 0 && l[c] === "\\"; ) h = !h;
    return h ? "|" : " |";
  }), s = n.split(Ut.splitPipe);
  let r = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((i = s.at(-1)) != null && i.trim()) && s.pop(), t)
    if (s.length > t)
      s.splice(t);
    else
      for (; s.length < t; ) s.push("");
  for (; r < s.length; r++)
    s[r] = s[r].trim().replace(Ut.slashPipe, "|");
  return s;
}
function hr(e, t, n) {
  const s = e.length;
  if (s === 0)
    return "";
  let r = 0;
  for (; r < s && e.charAt(s - r - 1) === t; )
    r++;
  return e.slice(0, s - r);
}
function fp(e, t) {
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
function Il(e, t, n, s, r) {
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
function hp(e, t, n) {
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
var Ci = class {
  // set by the lexer
  constructor(e) {
    et(this, "options");
    et(this, "rules");
    // set by the lexer
    et(this, "lexer");
    this.options = e || vs;
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
        text: this.options.pedantic ? n : hr(n, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const n = t[0], s = hp(n, t[3] || "", this.rules);
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
        const s = hr(n, "#");
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
        raw: hr(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = hr(t[0], `
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
        const h = a.join(`
`), c = h.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${h}` : h, r = r ? `${r}
${c}` : c;
        const v = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(c, i, !0), this.lexer.state.top = v, n.length === 0)
          break;
        const w = i.at(-1);
        if ((w == null ? void 0 : w.type) === "code")
          break;
        if ((w == null ? void 0 : w.type) === "blockquote") {
          const z = w, I = z.raw + `
` + n.join(`
`), K = this.blockquote(I);
          i[i.length - 1] = K, s = s.substring(0, s.length - z.raw.length) + K.raw, r = r.substring(0, r.length - z.text.length) + K.text;
          break;
        } else if ((w == null ? void 0 : w.type) === "list") {
          const z = w, I = z.raw + `
` + n.join(`
`), K = this.list(I);
          i[i.length - 1] = K, s = s.substring(0, s.length - w.raw.length) + K.raw, r = r.substring(0, r.length - z.raw.length) + K.raw, n = I.substring(i.at(-1).raw.length).split(`
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
        let l = !1, h = "", c = "";
        if (!(t = i.exec(e)) || this.rules.block.hr.test(e))
          break;
        h = t[0], e = e.substring(h.length);
        let v = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (oe) => " ".repeat(3 * oe.length)), w = e.split(`
`, 1)[0], z = !v.trim(), I = 0;
        if (this.options.pedantic ? (I = 2, c = v.trimStart()) : z ? I = t[1].length + 1 : (I = t[2].search(this.rules.other.nonSpaceChar), I = I > 4 ? 1 : I, c = v.slice(I), I += t[1].length), z && this.rules.other.blankLine.test(w) && (h += w + `
`, e = e.substring(w.length + 1), l = !0), !l) {
          const oe = this.rules.other.nextBulletRegex(I), fe = this.rules.other.hrRegex(I), pe = this.rules.other.fencesBeginRegex(I), C = this.rules.other.headingBeginRegex(I), P = this.rules.other.htmlBeginRegex(I);
          for (; e; ) {
            const Y = e.split(`
`, 1)[0];
            let Z;
            if (w = Y, this.options.pedantic ? (w = w.replace(this.rules.other.listReplaceNesting, "  "), Z = w) : Z = w.replace(this.rules.other.tabCharGlobal, "    "), pe.test(w) || C.test(w) || P.test(w) || oe.test(w) || fe.test(w))
              break;
            if (Z.search(this.rules.other.nonSpaceChar) >= I || !w.trim())
              c += `
` + Z.slice(I);
            else {
              if (z || v.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || pe.test(v) || C.test(v) || fe.test(v))
                break;
              c += `
` + w;
            }
            !z && !w.trim() && (z = !0), h += Y + `
`, e = e.substring(Y.length + 1), v = Z.slice(I);
          }
        }
        r.loose || (o ? r.loose = !0 : this.rules.other.doubleBlankLine.test(h) && (o = !0));
        let K = null, D;
        this.options.gfm && (K = this.rules.other.listIsTask.exec(c), K && (D = K[0] !== "[ ] ", c = c.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: h,
          task: !!K,
          checked: D,
          loose: !1,
          text: c,
          tokens: []
        }), r.raw += h;
      }
      const a = r.items.at(-1);
      if (a)
        a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
      else
        return;
      r.raw = r.raw.trimEnd();
      for (let l = 0; l < r.items.length; l++)
        if (this.lexer.state.top = !1, r.items[l].tokens = this.lexer.blockTokens(r.items[l].text, []), !r.loose) {
          const h = r.items[l].tokens.filter((v) => v.type === "space"), c = h.length > 0 && h.some((v) => this.rules.other.anyLine.test(v.raw));
          r.loose = c;
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
    const n = Rl(t[1]), s = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (o = t[3]) != null && o.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
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
        i.rows.push(Rl(a, i.header.length).map((l, h) => ({
          text: l,
          tokens: this.lexer.inline(l),
          header: !1,
          align: i.align[h]
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
        const i = hr(n.slice(0, -1), "\\");
        if ((n.length - i.length) % 2 === 0)
          return;
      } else {
        const i = fp(t[2], "()");
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
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), Il(t, {
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
      return Il(n, r, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let s = this.rules.inline.emStrongLDelim.exec(e);
    if (!s || s[3] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(s[1] || s[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      const i = [...s[0]].length - 1;
      let o, a, l = i, h = 0;
      const c = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (c.lastIndex = 0, t = t.slice(-1 * e.length + i); (s = c.exec(t)) != null; ) {
        if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o) continue;
        if (a = [...o].length, s[3] || s[4]) {
          l += a;
          continue;
        } else if ((s[5] || s[6]) && i % 3 && !((i + a) % 3)) {
          h += a;
          continue;
        }
        if (l -= a, l > 0) continue;
        a = Math.min(a, a + l + h);
        const v = [...s[0]][0].length, w = e.slice(0, i + s.index + v + a);
        if (Math.min(i, a) % 2) {
          const I = w.slice(1, -1);
          return {
            type: "em",
            raw: w,
            text: I,
            tokens: this.lexer.inlineTokens(I)
          };
        }
        const z = w.slice(2, -2);
        return {
          type: "strong",
          raw: w,
          text: z,
          tokens: this.lexer.inlineTokens(z)
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
}, Mn = class qo {
  constructor(t) {
    et(this, "tokens");
    et(this, "options");
    et(this, "state");
    et(this, "tokenizer");
    et(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || vs, this.options.tokenizer = this.options.tokenizer || new Ci(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      other: Ut,
      block: Qr.normal,
      inline: fr.normal
    };
    this.options.pedantic ? (n.block = Qr.pedantic, n.inline = fr.pedantic) : this.options.gfm && (n.block = Qr.gfm, this.options.breaks ? n.inline = fr.breaks : n.inline = fr.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: Qr,
      inline: fr
    };
  }
  /**
   * Static Lex Method
   */
  static lex(t, n) {
    return new qo(n).lex(t);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(t, n) {
    return new qo(n).inlineTokens(t);
  }
  /**
   * Preprocessing
   */
  lex(t) {
    t = t.replace(Ut.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const s = this.inlineQueue[n];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, n = [], s = !1) {
    var r, i, o;
    for (this.options.pedantic && (t = t.replace(Ut.tabCharGlobal, "    ").replace(Ut.spaceLine, "")); t; ) {
      let a;
      if ((i = (r = this.options.extensions) == null ? void 0 : r.block) != null && i.some((h) => (a = h.call({ lexer: this }, t, n)) ? (t = t.substring(a.raw.length), n.push(a), !0) : !1))
        continue;
      if (a = this.tokenizer.space(t)) {
        t = t.substring(a.raw.length);
        const h = n.at(-1);
        a.raw.length === 1 && h !== void 0 ? h.raw += `
` : n.push(a);
        continue;
      }
      if (a = this.tokenizer.code(t)) {
        t = t.substring(a.raw.length);
        const h = n.at(-1);
        (h == null ? void 0 : h.type) === "paragraph" || (h == null ? void 0 : h.type) === "text" ? (h.raw += `
` + a.raw, h.text += `
` + a.text, this.inlineQueue.at(-1).src = h.text) : n.push(a);
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
        const h = n.at(-1);
        (h == null ? void 0 : h.type) === "paragraph" || (h == null ? void 0 : h.type) === "text" ? (h.raw += `
` + a.raw, h.text += `
` + a.raw, this.inlineQueue.at(-1).src = h.text) : this.tokens.links[a.tag] || (this.tokens.links[a.tag] = {
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
        let h = 1 / 0;
        const c = t.slice(1);
        let v;
        this.options.extensions.startBlock.forEach((w) => {
          v = w.call({ lexer: this }, c), typeof v == "number" && v >= 0 && (h = Math.min(h, v));
        }), h < 1 / 0 && h >= 0 && (l = t.substring(0, h + 1));
      }
      if (this.state.top && (a = this.tokenizer.paragraph(l))) {
        const h = n.at(-1);
        s && (h == null ? void 0 : h.type) === "paragraph" ? (h.raw += `
` + a.raw, h.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = h.text) : n.push(a), s = l.length !== t.length, t = t.substring(a.raw.length);
        continue;
      }
      if (a = this.tokenizer.text(t)) {
        t = t.substring(a.raw.length);
        const h = n.at(-1);
        (h == null ? void 0 : h.type) === "text" ? (h.raw += `
` + a.raw, h.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = h.text) : n.push(a);
        continue;
      }
      if (t) {
        const h = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(h);
          break;
        } else
          throw new Error(h);
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
    var a, l, h;
    let s = t, r = null;
    if (this.tokens.links) {
      const c = Object.keys(this.tokens.links);
      if (c.length > 0)
        for (; (r = this.tokenizer.rules.inline.reflinkSearch.exec(s)) != null; )
          c.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (s = s.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(s)) != null; )
      s = s.slice(0, r.index) + "++" + s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (r = this.tokenizer.rules.inline.blockSkip.exec(s)) != null; )
      s = s.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    let i = !1, o = "";
    for (; t; ) {
      i || (o = ""), i = !1;
      let c;
      if ((l = (a = this.options.extensions) == null ? void 0 : a.inline) != null && l.some((w) => (c = w.call({ lexer: this }, t, n)) ? (t = t.substring(c.raw.length), n.push(c), !0) : !1))
        continue;
      if (c = this.tokenizer.escape(t)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.tag(t)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.link(t)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.reflink(t, this.tokens.links)) {
        t = t.substring(c.raw.length);
        const w = n.at(-1);
        c.type === "text" && (w == null ? void 0 : w.type) === "text" ? (w.raw += c.raw, w.text += c.text) : n.push(c);
        continue;
      }
      if (c = this.tokenizer.emStrong(t, s, o)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.codespan(t)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.br(t)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.del(t)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.autolink(t)) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      if (!this.state.inLink && (c = this.tokenizer.url(t))) {
        t = t.substring(c.raw.length), n.push(c);
        continue;
      }
      let v = t;
      if ((h = this.options.extensions) != null && h.startInline) {
        let w = 1 / 0;
        const z = t.slice(1);
        let I;
        this.options.extensions.startInline.forEach((K) => {
          I = K.call({ lexer: this }, z), typeof I == "number" && I >= 0 && (w = Math.min(w, I));
        }), w < 1 / 0 && w >= 0 && (v = t.substring(0, w + 1));
      }
      if (c = this.tokenizer.inlineText(v)) {
        t = t.substring(c.raw.length), c.raw.slice(-1) !== "_" && (o = c.raw.slice(-1)), i = !0;
        const w = n.at(-1);
        (w == null ? void 0 : w.type) === "text" ? (w.raw += c.raw, w.text += c.text) : n.push(c);
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
}, Ri = class {
  // set by the parser
  constructor(e) {
    et(this, "options");
    et(this, "parser");
    this.options = e || vs;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    var i;
    const s = (i = (t || "").match(Ut.notSpaceStart)) == null ? void 0 : i[0], r = e.replace(Ut.endingNewline, "") + `
`;
    return s ? '<pre><code class="language-' + pn(s) + '">' + (n ? r : pn(r, !0)) + `</code></pre>
` : "<pre><code>" + (n ? r : pn(r, !0)) + `</code></pre>
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
      e.loose ? ((n = e.tokens[0]) == null ? void 0 : n.type) === "paragraph" ? (e.tokens[0].text = s + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = s + " " + pn(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
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
    return `<code>${pn(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    const s = this.parser.parseInline(n), r = Cl(e);
    if (r === null)
      return s;
    e = r;
    let i = '<a href="' + e + '"';
    return t && (i += ' title="' + pn(t) + '"'), i += ">" + s + "</a>", i;
  }
  image({ href: e, title: t, text: n, tokens: s }) {
    s && (n = this.parser.parseInline(s, this.parser.textRenderer));
    const r = Cl(e);
    if (r === null)
      return pn(n);
    e = r;
    let i = `<img src="${e}" alt="${n}"`;
    return t && (i += ` title="${pn(t)}"`), i += ">", i;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : pn(e.text);
  }
}, Ta = class {
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
}, Dn = class Wo {
  constructor(t) {
    et(this, "options");
    et(this, "renderer");
    et(this, "textRenderer");
    this.options = t || vs, this.options.renderer = this.options.renderer || new Ri(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Ta();
  }
  /**
   * Static Parse Method
   */
  static parse(t, n) {
    return new Wo(n).parse(t);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(t, n) {
    return new Wo(n).parseInline(t);
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
        const h = a, c = this.options.extensions.renderers[h.type].call({ parser: this }, h);
        if (c !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(h.type)) {
          s += c || "";
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
          let h = l, c = this.renderer.text(h);
          for (; o + 1 < t.length && t[o + 1].type === "text"; )
            h = t[++o], c += `
` + this.renderer.text(h);
          n ? s += this.renderer.paragraph({
            type: "paragraph",
            raw: c,
            text: c,
            tokens: [{ type: "text", raw: c, text: c, escaped: !0 }]
          }) : s += c;
          continue;
        }
        default: {
          const h = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent)
            return console.error(h), "";
          throw new Error(h);
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
        const h = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (h !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
          s += h || "";
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
          const h = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent)
            return console.error(h), "";
          throw new Error(h);
        }
      }
    }
    return s;
  }
}, Ro, ci = (Ro = class {
  constructor(e) {
    et(this, "options");
    et(this, "block");
    this.options = e || vs;
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
    return this.block ? Mn.lex : Mn.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? Dn.parse : Dn.parseInline;
  }
}, et(Ro, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
])), Ro), dp = class {
  constructor(...e) {
    et(this, "defaults", ma());
    et(this, "options", this.setOptions);
    et(this, "parse", this.parseMarkdown(!0));
    et(this, "parseInline", this.parseMarkdown(!1));
    et(this, "Parser", Dn);
    et(this, "Renderer", Ri);
    et(this, "TextRenderer", Ta);
    et(this, "Lexer", Mn);
    et(this, "Tokenizer", Ci);
    et(this, "Hooks", ci);
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
        const r = this.defaults.renderer || new Ri(this.defaults);
        for (const i in n.renderer) {
          if (!(i in r))
            throw new Error(`renderer '${i}' does not exist`);
          if (["options", "parser"].includes(i))
            continue;
          const o = i, a = n.renderer[o], l = r[o];
          r[o] = (...h) => {
            let c = a.apply(r, h);
            return c === !1 && (c = l.apply(r, h)), c || "";
          };
        }
        s.renderer = r;
      }
      if (n.tokenizer) {
        const r = this.defaults.tokenizer || new Ci(this.defaults);
        for (const i in n.tokenizer) {
          if (!(i in r))
            throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i))
            continue;
          const o = i, a = n.tokenizer[o], l = r[o];
          r[o] = (...h) => {
            let c = a.apply(r, h);
            return c === !1 && (c = l.apply(r, h)), c;
          };
        }
        s.tokenizer = r;
      }
      if (n.hooks) {
        const r = this.defaults.hooks || new ci();
        for (const i in n.hooks) {
          if (!(i in r))
            throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i))
            continue;
          const o = i, a = n.hooks[o], l = r[o];
          ci.passThroughHooks.has(i) ? r[o] = (h) => {
            if (this.defaults.async)
              return Promise.resolve(a.call(r, h)).then((v) => l.call(r, v));
            const c = a.call(r, h);
            return l.call(r, c);
          } : r[o] = (...h) => {
            let c = a.apply(r, h);
            return c === !1 && (c = l.apply(r, h)), c;
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
    return Mn.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return Dn.parse(e, t ?? this.defaults);
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
      const a = i.hooks ? i.hooks.provideLexer() : e ? Mn.lex : Mn.lexInline, l = i.hooks ? i.hooks.provideParser() : e ? Dn.parse : Dn.parseInline;
      if (i.async)
        return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n).then((h) => a(h, i)).then((h) => i.hooks ? i.hooks.processAllTokens(h) : h).then((h) => i.walkTokens ? Promise.all(this.walkTokens(h, i.walkTokens)).then(() => h) : h).then((h) => l(h, i)).then((h) => i.hooks ? i.hooks.postprocess(h) : h).catch(o);
      try {
        i.hooks && (n = i.hooks.preprocess(n));
        let h = a(n, i);
        i.hooks && (h = i.hooks.processAllTokens(h)), i.walkTokens && this.walkTokens(h, i.walkTokens);
        let c = l(h, i);
        return i.hooks && (c = i.hooks.postprocess(c)), c;
      } catch (h) {
        return o(h);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const s = "<p>An error occurred:</p><pre>" + pn(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(s) : s;
      }
      if (t)
        return Promise.reject(n);
      throw n;
    };
  }
}, bs = new dp();
function He(e, t) {
  return bs.parse(e, t);
}
He.options = He.setOptions = function(e) {
  return bs.setOptions(e), He.defaults = bs.defaults, pu(He.defaults), He;
};
He.getDefaults = ma;
He.defaults = vs;
He.use = function(...e) {
  return bs.use(...e), He.defaults = bs.defaults, pu(He.defaults), He;
};
He.walkTokens = function(e, t) {
  return bs.walkTokens(e, t);
};
He.parseInline = bs.parseInline;
He.Parser = Dn;
He.parser = Dn.parse;
He.Renderer = Ri;
He.TextRenderer = Ta;
He.Lexer = Mn;
He.lexer = Mn.lex;
He.Tokenizer = Ci;
He.Hooks = ci;
He.parse = He;
He.options;
He.setOptions;
He.use;
He.walkTokens;
He.parseInline;
Dn.parse;
Mn.lex;
/*! @license DOMPurify 3.4.15 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.15/LICENSE */
function Ll(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, s = Array(t); n < t; n++) s[n] = e[n];
  return s;
}
function pp(e) {
  if (Array.isArray(e)) return e;
}
function mp(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var s, r, i, o, a = [], l = !0, h = !1;
    try {
      if (i = (n = n.call(e)).next, t !== 0) for (; !(l = (s = i.call(n)).done) && (a.push(s.value), a.length !== t); l = !0) ;
    } catch (c) {
      h = !0, r = c;
    } finally {
      try {
        if (!l && n.return != null && (o = n.return(), Object(o) !== o)) return;
      } finally {
        if (h) throw r;
      }
    }
    return a;
  }
}
function gp() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _p(e, t) {
  return pp(e) || mp(e, t) || yp(e, t) || gp();
}
function yp(e, t) {
  if (e) {
    if (typeof e == "string") return Ll(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ll(e, t) : void 0;
  }
}
const Su = Object.entries, Ol = Object.setPrototypeOf, bp = Object.isFrozen, vp = Object.getPrototypeOf, wp = Object.getOwnPropertyDescriptor;
let vt = Object.freeze, xt = Object.seal, Ns = Object.create, Au = typeof Reflect < "u" && Reflect, jo = Au.apply, Vo = Au.construct;
vt || (vt = function(t) {
  return t;
});
xt || (xt = function(t) {
  return t;
});
jo || (jo = function(t, n) {
  for (var s = arguments.length, r = new Array(s > 2 ? s - 2 : 0), i = 2; i < s; i++)
    r[i - 2] = arguments[i];
  return t.apply(n, r);
});
Vo || (Vo = function(t) {
  for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
    s[r - 1] = arguments[r];
  return new t(...s);
});
const gs = _t(Array.prototype.forEach), kp = _t(Array.prototype.lastIndexOf), Nl = _t(Array.prototype.pop), dr = _t(Array.prototype.push), Tp = _t(Array.prototype.splice), Us = Array.isArray, yr = _t(String.prototype.toLowerCase), go = _t(String.prototype.toString), Pl = _t(String.prototype.match), pr = _t(String.prototype.replace), Ml = _t(String.prototype.indexOf), xp = _t(String.prototype.trim), Sp = _t(Number.prototype.toString), Ap = _t(Boolean.prototype.toString), Dl = typeof BigInt > "u" ? null : _t(BigInt.prototype.toString), Fl = typeof Symbol > "u" ? null : _t(Symbol.prototype.toString), Ht = _t(Object.prototype.hasOwnProperty), mr = _t(Object.prototype.toString), Lt = _t(RegExp.prototype.test), ds = Ep(TypeError);
function _t(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
      s[r - 1] = arguments[r];
    return jo(e, t, s);
  };
}
function Ep(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return Vo(e, n);
  };
}
function Fe(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : yr;
  if (Ol && Ol(e, null), !Us(t))
    return e;
  let s = t.length;
  for (; s--; ) {
    let r = t[s];
    if (typeof r == "string") {
      const i = n(r);
      i !== r && (bp(t) || (t[s] = i), r = i);
    }
    e[r] = !0;
  }
  return e;
}
function Cp(e) {
  for (let t = 0; t < e.length; t++)
    Ht(e, t) || (e[t] = null);
  return e;
}
function Vt(e) {
  const t = Ns(null);
  for (const s of Su(e)) {
    var n = _p(s, 2);
    const r = n[0], i = n[1];
    Ht(e, r) && (Us(i) ? t[r] = Cp(i) : i && typeof i == "object" && i.constructor === Object ? t[r] = Vt(i) : t[r] = i);
  }
  return t;
}
function Rp(e) {
  switch (typeof e) {
    case "string":
      return e;
    case "number":
      return Sp(e);
    case "boolean":
      return Ap(e);
    case "bigint":
      return Dl ? Dl(e) : "0";
    case "symbol":
      return Fl ? Fl(e) : "Symbol()";
    case "undefined":
      return mr(e);
    case "function":
    case "object": {
      if (e === null)
        return mr(e);
      const t = e, n = Qt(t, "toString");
      if (typeof n == "function") {
        const s = n(t);
        return typeof s == "string" ? s : mr(s);
      }
      return mr(e);
    }
    default:
      return mr(e);
  }
}
function Qt(e, t) {
  for (; e !== null; ) {
    const s = wp(e, t);
    if (s) {
      if (s.get)
        return _t(s.get);
      if (typeof s.value == "function")
        return _t(s.value);
    }
    e = vp(e);
  }
  function n() {
    return null;
  }
  return n;
}
function Ip(e) {
  try {
    return Lt(e, ""), !0;
  } catch {
    return !1;
  }
}
const $l = vt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), _o = vt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), yo = vt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Lp = vt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), bo = vt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Op = vt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Bl = vt(["#text"]), Ul = vt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), vo = vt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dominant-baseline", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "pointer-events", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-orientation", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "vector-effect", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), zl = vt(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), ei = vt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Np = xt(/{{[\w\W]*|^[\w\W]*}}/g), Pp = xt(/<%[\w\W]*|^[\w\W]*%>/g), Mp = xt(/\${[\w\W]*/g), Dp = xt(/^data-[\-\w.\u00B7-\uFFFF]+$/), Fp = xt(/^aria-[\-\w]+$/), Hl = xt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), $p = xt(/^(?:\w+script|data):/i), Bp = xt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Up = xt(/^html$/i), zp = xt(/^[a-z][.\w]*(-[.\w]+)+$/i), ql = xt(/<[/\w!]/g), Wl = xt(/<[/\w]/g), Hp = xt(/<\/no(script|embed|frames)/i), qp = xt(/\/>/i), Wt = {
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
}, Eu = ["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"], Wp = vt(Fe({}, Eu)), jp = function() {
  const e = {};
  return gs(Eu, (t) => {
    e[t] = xt(new RegExp("</" + t + "(?=[\\t\\n\\f\\r />])", "i"));
  }), vt(e);
}(), Vp = function() {
  return typeof window > "u" ? null : window;
}, Kp = function(t, n) {
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
}, jl = function() {
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
}, Kn = function(t, n, s, r) {
  return Ht(t, n) && Us(t[n]) ? Fe(r.base ? Vt(r.base) : {}, t[n], r.transform) : s;
}, wo = function(t, n, s) {
  const r = Ht(t, n) ? t[n] : void 0;
  return r && typeof r == "object" ? Vt(r) : s();
};
function Cu() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Vp();
  const t = (j) => Cu(j);
  if (t.version = "3.4.15", t.removed = [], !e || !e.document || e.document.nodeType !== Wt.document || !e.Element)
    return t.isSupported = !1, t;
  let n = e.document;
  const s = n, r = s.currentScript;
  e.DocumentFragment;
  const i = e.HTMLTemplateElement, o = e.Node, a = e.Element, l = e.NodeFilter, h = e.NamedNodeMap;
  h === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
  const c = e.DOMParser, v = e.trustedTypes, w = a.prototype, z = Qt(w, "cloneNode"), I = Qt(w, "remove"), K = Qt(w, "removeAttributeNode"), D = Qt(w, "nextSibling"), oe = Qt(w, "childNodes"), fe = Qt(w, "parentNode"), pe = Qt(w, "shadowRoot"), C = Qt(w, "attributes"), P = o && o.prototype ? Qt(o.prototype, "nodeType") : null, Y = o && o.prototype ? Qt(o.prototype, "nodeName") : null, Z = o && o.prototype ? Qt(o.prototype, "ownerDocument") : null, Te = function(d) {
    return P ? P(d) : d.nodeType;
  }, Le = function(d) {
    return Y ? Y(d) : d.nodeName;
  };
  if (typeof i == "function") {
    const j = n.createElement("template");
    j.content && j.content.ownerDocument && (n = j.content.ownerDocument);
  }
  let _e, De = "", ve, Ke = !1, Ge = 0;
  const at = function() {
    if (Ge > 0)
      throw ds('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, ue = function(d) {
    at(), Ge++;
    try {
      return _e.createHTML(d);
    } finally {
      Ge--;
    }
  }, ye = function(d) {
    at(), Ge++;
    try {
      return _e.createScriptURL(d);
    } finally {
      Ge--;
    }
  }, ge = function() {
    return Ke || (ve = Kp(v, r), Ke = !0), ve;
  }, nt = n, Xe = nt.implementation, Se = nt.createNodeIterator, Je = nt.createDocumentFragment, st = nt.getElementsByTagName, St = s.importNode;
  let Ce = jl();
  t.isSupported = typeof Su == "function" && typeof fe == "function" && Xe && Xe.createHTMLDocument !== void 0;
  const yt = Np, pt = Pp, Ct = Mp, Rt = Dp, Mt = Fp, Gt = $p, g = Bp, y = zp;
  let E = Hl, N = null;
  const $ = Fe({}, [...$l, ..._o, ...yo, ...bo, ...Bl]);
  let O = null;
  const G = Fe({}, [...Ul, ...vo, ...zl, ...ei]);
  let q = Object.seal(Ns(null, {
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
  })), W = null, U = null;
  const te = Object.seal(Ns(null, {
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
  let X = !0, A = !0, L = !1, V = !0, J = !1, ae = !0, we = !1, Ae = !1, Pe = null, f = null, _ = !1, M = !1, T = !1, H = !1, ne = !0, ee = !1;
  const Re = "user-content-";
  let Ie = !0, Ee = !1, Be = {}, Ze = null;
  const wt = Fe({}, [
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
  let rn = null;
  const kn = Fe({}, ["audio", "video", "img", "source", "image", "track"]);
  let js = null;
  const Vs = Fe({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), rs = "http://www.w3.org/1998/Math/MathML", is = "http://www.w3.org/2000/svg", qt = "http://www.w3.org/1999/xhtml";
  let Tn = qt, Ks = !1, os = null;
  const ws = Fe({}, [rs, is, qt], go), Gs = vt(["mi", "mo", "mn", "ms", "mtext"]);
  let ks = Fe({}, Gs);
  const xn = vt(["annotation-xml"]);
  let Sn = Fe({}, xn);
  const Ys = Fe({}, ["title", "style", "font", "a", "script"]);
  let An = null;
  const cn = ["application/xhtml+xml", "text/html"], $r = "text/html";
  let rt = null, En = null;
  const Un = n.createElement("form"), Br = function(d) {
    return d instanceof RegExp || d instanceof Function;
  }, zn = function() {
    let d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (En && En === d)
      return;
    (!d || typeof d != "object") && (d = {}), d = Vt(d), An = // eslint-disable-next-line unicorn/prefer-includes
    cn.indexOf(d.PARSER_MEDIA_TYPE) === -1 ? $r : d.PARSER_MEDIA_TYPE, rt = An === "application/xhtml+xml" ? go : yr, N = Kn(d, "ALLOWED_TAGS", $, {
      transform: rt
    }), O = Kn(d, "ALLOWED_ATTR", G, {
      transform: rt
    }), os = Kn(d, "ALLOWED_NAMESPACES", ws, {
      transform: go
    }), js = Kn(d, "ADD_URI_SAFE_ATTR", Vs, {
      transform: rt,
      base: Vs
    }), rn = Kn(d, "ADD_DATA_URI_TAGS", kn, {
      transform: rt,
      base: kn
    }), Ze = Kn(d, "FORBID_CONTENTS", wt, {
      transform: rt
    }), W = Kn(d, "FORBID_TAGS", Vt({}), {
      transform: rt
    }), U = Kn(d, "FORBID_ATTR", Vt({}), {
      transform: rt
    }), Be = Ht(d, "USE_PROFILES") ? d.USE_PROFILES && typeof d.USE_PROFILES == "object" ? Vt(d.USE_PROFILES) : d.USE_PROFILES : !1, X = d.ALLOW_ARIA_ATTR !== !1, A = d.ALLOW_DATA_ATTR !== !1, L = d.ALLOW_UNKNOWN_PROTOCOLS || !1, V = d.ALLOW_SELF_CLOSE_IN_ATTR !== !1, J = d.SAFE_FOR_TEMPLATES || !1, ae = d.SAFE_FOR_XML !== !1, we = d.WHOLE_DOCUMENT || !1, M = d.RETURN_DOM || !1, T = d.RETURN_DOM_FRAGMENT || !1, H = d.RETURN_TRUSTED_TYPE || !1, _ = d.FORCE_BODY || !1, ne = d.SANITIZE_DOM !== !1, ee = d.SANITIZE_NAMED_PROPS || !1, Ie = d.KEEP_CONTENT !== !1, Ee = d.IN_PLACE || !1, E = Ip(d.ALLOWED_URI_REGEXP) ? d.ALLOWED_URI_REGEXP : Hl, Tn = typeof d.NAMESPACE == "string" ? d.NAMESPACE : qt, ks = wo(
      d,
      "MATHML_TEXT_INTEGRATION_POINTS",
      () => Fe({}, Gs)
      // Default built-in map
    ), Sn = wo(
      d,
      "HTML_INTEGRATION_POINTS",
      () => Fe({}, xn)
      // Default built-in map
    );
    const k = wo(d, "CUSTOM_ELEMENT_HANDLING", () => Ns(null));
    if (q = Ns(null), Ht(k, "tagNameCheck") && Br(k.tagNameCheck) && (q.tagNameCheck = k.tagNameCheck), Ht(k, "attributeNameCheck") && Br(k.attributeNameCheck) && (q.attributeNameCheck = k.attributeNameCheck), Ht(k, "allowCustomizedBuiltInElements") && typeof k.allowCustomizedBuiltInElements == "boolean" && (q.allowCustomizedBuiltInElements = k.allowCustomizedBuiltInElements), xt(q), J && (A = !1), T && (M = !0), Be && (N = Fe({}, Bl), O = Ns(null), Be.html === !0 && (Fe(N, $l), Fe(O, Ul)), Be.svg === !0 && (Fe(N, _o), Fe(O, vo), Fe(O, ei)), Be.svgFilters === !0 && (Fe(N, yo), Fe(O, vo), Fe(O, ei)), Be.mathMl === !0 && (Fe(N, bo), Fe(O, zl), Fe(O, ei))), te.tagCheck = null, te.attributeCheck = null, Ht(d, "ADD_TAGS") && (typeof d.ADD_TAGS == "function" ? te.tagCheck = d.ADD_TAGS : Us(d.ADD_TAGS) && (N === $ && (N = Vt(N)), Fe(N, d.ADD_TAGS, rt))), Ht(d, "ADD_ATTR") && (typeof d.ADD_ATTR == "function" ? te.attributeCheck = d.ADD_ATTR : Us(d.ADD_ATTR) && (O === G && (O = Vt(O)), Fe(O, d.ADD_ATTR, rt))), Ht(d, "ADD_FORBID_CONTENTS") && Us(d.ADD_FORBID_CONTENTS) && (Ze === wt && (Ze = Vt(Ze)), Fe(Ze, d.ADD_FORBID_CONTENTS, rt)), Ie && (N["#text"] = !0), we && Fe(N, ["html", "head", "body"]), N.table && (Fe(N, ["tbody"]), delete W.tbody), d.TRUSTED_TYPES_POLICY) {
      if (typeof d.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw ds('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof d.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw ds('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const B = _e;
      _e = d.TRUSTED_TYPES_POLICY;
      try {
        De = ue("");
      } catch (Q) {
        throw _e = B, Q;
      }
    } else d.TRUSTED_TYPES_POLICY === null ? (_e = void 0, De = "") : (_e === void 0 && (_e = ge()), _e && typeof De == "string" && (De = ue("")));
    vt && vt(d), En = d;
  }, Xs = Fe({}, [..._o, ...yo, ...Lp]), Ur = Fe({}, [...bo, ...Op]), zr = function(d, k, B) {
    return k.namespaceURI === qt ? d === "svg" : k.namespaceURI === rs ? d === "svg" && (B === "annotation-xml" || ks[B]) : !!Xs[d];
  }, Ts = function(d, k, B) {
    return k.namespaceURI === qt ? d === "math" : k.namespaceURI === is ? d === "math" && Sn[B] : !!Ur[d];
  }, Zs = function(d, k, B) {
    return k.namespaceURI === is && !Sn[B] || k.namespaceURI === rs && !ks[B] ? !1 : !Ur[d] && (Ys[d] || !Xs[d]);
  }, Yt = function(d) {
    let k = fe(d);
    (!k || !k.tagName) && (k = {
      namespaceURI: Tn,
      tagName: "template"
    });
    const B = yr(d.tagName), Q = yr(k.tagName);
    return os[d.namespaceURI] ? d.namespaceURI === is ? zr(B, k, Q) : d.namespaceURI === rs ? Ts(B, k, Q) : d.namespaceURI === qt ? Zs(B, k, Q) : !!(An === "application/xhtml+xml" && os[d.namespaceURI]) : !1;
  }, bt = function(d) {
    dr(t.removed, {
      element: d
    });
    try {
      fe(d).removeChild(d);
    } catch {
      if (I(d), !fe(d))
        throw ds("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, ft = function(d, k, B) {
    try {
      K(d, k);
    } catch {
      try {
        d.removeAttribute(B);
      } catch {
      }
    }
  }, ht = function(d) {
    un(d);
    const k = oe(d);
    if (k) {
      const Q = [];
      gs(k, (ie) => {
        dr(Q, ie);
      }), gs(Q, (ie) => {
        try {
          I(ie);
        } catch {
        }
      });
    }
    const B = C(d);
    if (B)
      for (let Q = B.length - 1; Q >= 0; --Q) {
        const ie = B[Q], he = ie && ie.name;
        typeof he == "string" && ft(d, ie, he);
      }
  }, Qe = function(d, k, B) {
    if (!B)
      try {
        B = k.getAttributeNode(d);
      } catch {
        B = null;
      }
    dr(t.removed, {
      attribute: B || null,
      from: k
    });
    try {
      B ? K(k, B) : k.removeAttribute(d);
    } catch {
      try {
        k.removeAttribute(d);
      } catch {
      }
    }
    if (d === "is")
      if (M || T)
        try {
          bt(k);
        } catch {
        }
      else
        try {
          k.setAttribute(d, "");
        } catch {
        }
  }, Cn = function(d) {
    const k = C(d);
    if (k)
      for (let B = k.length - 1; B >= 0; --B) {
        const Q = k[B], ie = Q && Q.name;
        typeof ie != "string" || O[rt(ie)] || ft(d, Q, ie);
      }
  }, un = function(d) {
    const k = [d];
    for (; k.length > 0; ) {
      const B = k.pop();
      Te(B) === Wt.element && Cn(B);
      const ie = oe(B);
      if (ie)
        for (let he = ie.length - 1; he >= 0; --he)
          k.push(ie[he]);
    }
  }, Js = function(d, k) {
    return ae ? d === "patchsrc" ? !0 : d === "for" && k !== "label" && k !== "output" : !1;
  }, Rn = function(d) {
    if (!ae)
      return;
    const k = [d];
    for (; k.length > 0; ) {
      const B = k.pop(), Q = Te(B);
      if (Q === Wt.processingInstruction || Q === Wt.comment && Lt(Wl, B.data)) {
        try {
          I(B);
        } catch {
        }
        continue;
      }
      if (Q === Wt.element) {
        const he = B, Oe = rt(Le(B));
        try {
          he.hasAttribute && he.hasAttribute("patchsrc") && he.removeAttribute("patchsrc"), he.hasAttribute && he.hasAttribute("for") && Js("for", Oe) && he.removeAttribute("for");
        } catch {
        }
      }
      const ie = oe(B);
      if (ie)
        for (let he = ie.length - 1; he >= 0; --he)
          k.push(ie[he]);
    }
  }, kt = function(d) {
    let k = null, B = null;
    if (_)
      d = "<remove></remove>" + d;
    else {
      const he = Pl(d, /^[\r\n\t ]+/);
      B = he && he[0];
    }
    An === "application/xhtml+xml" && Tn === qt && (d = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + d + "</body></html>");
    const Q = _e ? ue(d) : d;
    if (Tn === qt)
      try {
        k = new c().parseFromString(Q, An);
      } catch {
      }
    if (!k || !k.documentElement) {
      k = Xe.createDocument(Tn, "template", null);
      try {
        k.documentElement.innerHTML = Ks ? De : Q;
      } catch {
      }
    }
    const ie = k.body || k.documentElement;
    return d && B && ie.insertBefore(n.createTextNode(B), ie.childNodes[0] || null), Tn === qt ? st.call(k, we ? "html" : "body")[0] : we ? k.documentElement : ie;
  }, Hn = function(d) {
    const k = Z ? Z(d) : d.ownerDocument;
    return Se.call(
      k || d,
      d,
      // eslint-disable-next-line no-bitwise
      l.SHOW_ELEMENT | l.SHOW_COMMENT | l.SHOW_TEXT | l.SHOW_PROCESSING_INSTRUCTION | l.SHOW_CDATA_SECTION,
      null
    );
  }, Xt = function(d) {
    return d = pr(d, yt, " "), d = pr(d, pt, " "), d = pr(d, Ct, " "), d;
  }, Qs = function(d) {
    var k;
    d.normalize();
    const B = Z ? Z(d) : d.ownerDocument, Q = Se.call(
      B || d,
      d,
      // eslint-disable-next-line no-bitwise
      l.SHOW_TEXT | l.SHOW_COMMENT | l.SHOW_CDATA_SECTION | l.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let ie = Q.nextNode();
    for (; ie; )
      ie.data = Xt(ie.data), ie = Q.nextNode();
    const he = (k = d.querySelectorAll) === null || k === void 0 ? void 0 : k.call(d, "template");
    he && gs(he, (Oe) => {
      qn(Oe.content) && Qs(Oe.content);
    });
  }, xs = function(d) {
    const k = Y ? Y(d) : null;
    return typeof k != "string" || rt(k) !== "form" ? !1 : typeof d.nodeName != "string" || typeof d.textContent != "string" || typeof d.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    d.attributes !== C(d) || typeof d.removeAttribute != "function" || // A form descendant named "removeAttributeNode" or "getAttributeNode"
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
    d.nodeType !== P(d) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
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
    d.childNodes !== oe(d);
  }, qn = function(d) {
    if (!P || typeof d != "object" || d === null)
      return !1;
    try {
      return P(d) === Wt.documentFragment;
    } catch {
      return !1;
    }
  }, as = function(d) {
    if (!P || typeof d != "object" || d === null)
      return !1;
    try {
      return typeof P(d) == "number";
    } catch {
      return !1;
    }
  };
  function Zt(j, d, k) {
    j.length !== 0 && gs(j, (B) => {
      B.call(t, d, k, En);
    });
  }
  const Gi = function(d, k) {
    return !!(ae && d.hasChildNodes() && !as(d.firstElementChild) && Lt(ql, d.textContent) && Lt(ql, d.innerHTML) || ae && d.namespaceURI === qt && Wp[k] && (as(d.firstElementChild) || typeof d.textContent == "string" && Lt(jp[k], d.textContent)) || d.nodeType === Wt.processingInstruction || ae && d.nodeType === Wt.comment && Lt(Wl, d.data));
  }, Ss = function(d, k) {
    if (d instanceof RegExp)
      return Lt(d, k);
    if (d instanceof Function) {
      for (var B = arguments.length, Q = new Array(B > 2 ? B - 2 : 0), ie = 2; ie < B; ie++)
        Q[ie - 2] = arguments[ie];
      return !!d(k, ...Q);
    }
    return !1;
  }, It = function(d, k, B) {
    if (!W[k] && er(k) && Ss(q.tagNameCheck, k))
      return !1;
    if (Ie && !Ze[k]) {
      const Q = fe(d), ie = oe(d);
      if (ie && Q) {
        const he = ie.length;
        for (let Oe = he - 1; Oe >= 0; --Oe) {
          const $e = d === B ? z(ie[Oe], !0) : ie[Oe];
          Q.insertBefore($e, D(d));
        }
      }
    }
    return bt(d), !0;
  }, Hr = function(d, k, B, Q) {
    return d.length === 0 ? k : k === B || k === Q ? Vt(k) : k;
  }, As = function(d, k) {
    return d === k || fe(d) !== null ? !1 : (Ee && un(d), !0);
  }, qr = function(d, k) {
    if (Zt(Ce.beforeSanitizeElements, d, null), As(d, k))
      return !0;
    if (xs(d))
      return bt(d), !0;
    const B = rt(Le(d));
    if (N = Hr(Ce.uponSanitizeElement, N, $, Pe), Zt(Ce.uponSanitizeElement, d, {
      tagName: B,
      allowedTags: N
    }), As(d, k))
      return !0;
    if (Gi(d, B))
      return bt(d), !0;
    if (W[B] || !(te.tagCheck instanceof Function && te.tagCheck(B)) && !N[B]) {
      const ie = It(d, B, k);
      return ie === !1 && Zt(Ce.afterSanitizeElements, d, null), ie;
    }
    if (Te(d) === Wt.element && !Yt(d) || (B === "noscript" || B === "noembed" || B === "noframes") && Lt(Hp, d.innerHTML))
      return bt(d), !0;
    if (J && d.nodeType === Wt.text) {
      const ie = Xt(d.textContent);
      d.textContent !== ie && (dr(t.removed, {
        element: d.cloneNode()
      }), d.textContent = ie);
    }
    return Zt(Ce.afterSanitizeElements, d, null), !1;
  }, Wr = function(d, k, B) {
    if (U[k] || Js(k, d) || ne && (k === "id" || k === "name") && (B in n || B in Un))
      return !1;
    const Q = O[k] || te.attributeCheck instanceof Function && te.attributeCheck(k, d);
    return A && Lt(Rt, k) || X && Lt(Mt, k) ? !0 : Q ? js[k] || Lt(E, pr(B, g, "")) || (k === "src" || k === "xlink:href" || k === "href") && d !== "script" && Ml(B, "data:") === 0 && rn[d] || L && !Lt(Gt, pr(B, g, "")) ? !0 : !B : (
      // Condition a) covers a basically valid custom element tag name whose
      // tag passes the configured tagNameCheck and whose attribute name
      // passes the configured attributeNameCheck ...
      er(d) && Ss(q.tagNameCheck, d) && Ss(q.attributeNameCheck, k, d) || // Condition b) covers an `is` attribute whose value passes the
      // configured tagNameCheck while customized built-in elements are
      // allowed.
      k === "is" && q.allowCustomizedBuiltInElements && Ss(q.tagNameCheck, B)
    );
  }, Yi = Fe({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), er = function(d) {
    return !Yi[yr(d)] && Lt(y, d);
  }, tr = function(d, k, B, Q) {
    if (_e && typeof v == "object" && typeof v.getAttributeType == "function" && !B)
      switch (v.getAttributeType(d, k)) {
        case "TrustedHTML":
          return ue(Q);
        case "TrustedScriptURL":
          return ye(Q);
      }
    return Q;
  }, jr = function(d, k, B, Q) {
    try {
      return B ? d.setAttributeNS(B, k, Q) : d.setAttribute(k, Q), xs(d) ? (bt(d), !1) : !0;
    } catch {
      return Qe(k, d), !1;
    }
  }, Vr = function(d) {
    Zt(Ce.beforeSanitizeAttributes, d, null);
    const k = d.attributes;
    if (!k || xs(d))
      return;
    O = Hr(Ce.uponSanitizeAttribute, O, G, f);
    const B = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: O,
      forceKeepAttr: void 0
    };
    let Q = k.length;
    const ie = rt(d.nodeName);
    for (; Q--; ) {
      const he = k[Q], Oe = he.name, $e = he.namespaceURI, lt = he.value, dt = rt(Oe), fn = lt;
      let Tt = Oe === "value" ? fn : xp(fn), nr = !1;
      if (B.attrName = dt, B.attrValue = Tt, B.keepAttr = !0, B.forceKeepAttr = void 0, Zt(Ce.uponSanitizeAttribute, d, B), Tt = B.attrValue, ee && (dt === "id" || dt === "name") && Ml(Tt, Re) !== 0 && (Qe(Oe, d, he), Tt = Re + Tt, nr = !0), ae && Lt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, Tt)) {
        Qe(Oe, d, he);
        continue;
      }
      if (dt === "attributename" && Pl(Tt, "href")) {
        Qe(Oe, d, he);
        continue;
      }
      if (!B.forceKeepAttr) {
        if (!B.keepAttr) {
          Qe(Oe, d, he);
          continue;
        }
        if (!V && Lt(qp, Tt)) {
          Qe(Oe, d, he);
          continue;
        }
        if (J && (Tt = Xt(Tt)), !Wr(ie, dt, Tt)) {
          Qe(Oe, d, he);
          continue;
        }
        Tt = tr(ie, dt, $e, Tt), Tt !== fn && jr(d, Oe, $e, Tt) && nr && Nl(t.removed);
      }
    }
    Zt(Ce.afterSanitizeAttributes, d, null);
  }, Es = function(d) {
    let k = null;
    const B = Hn(d);
    for (Zt(Ce.beforeSanitizeShadowDOM, d, null); k = B.nextNode(); )
      if (Zt(Ce.uponSanitizeShadowNode, k, null), qr(k, d), Vr(k), qn(k.content) && Es(k.content), Te(k) === Wt.element) {
        const Q = pe(k);
        qn(Q) && (ls(Q), Es(Q));
      }
    Zt(Ce.afterSanitizeShadowDOM, d, null);
  }, ls = function(d) {
    const k = [{
      node: d,
      shadow: null
    }];
    for (; k.length > 0; ) {
      const B = k.pop();
      if (B.shadow) {
        Es(B.shadow);
        continue;
      }
      const Q = B.node, he = Te(Q) === Wt.element, Oe = oe(Q);
      if (Oe)
        for (let $e = Oe.length - 1; $e >= 0; --$e)
          k.push({
            node: Oe[$e],
            shadow: null
          });
      if (he) {
        const $e = Y ? Y(Q) : null;
        if (typeof $e == "string" && rt($e) === "template") {
          const lt = Q.content;
          qn(lt) && k.push({
            node: lt,
            shadow: null
          });
        }
      }
      if (he) {
        const $e = pe(Q);
        qn($e) && k.push({
          node: null,
          shadow: $e
        }, {
          node: $e,
          shadow: null
        });
      }
    }
  };
  return t.sanitize = function(j) {
    let d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, k = null, B = null, Q = null, ie = null;
    if (Ks = !j, Ks && (j = "<!-->"), typeof j != "string" && !as(j) && (j = Rp(j), typeof j != "string"))
      throw ds("dirty is not a string, aborting");
    if (!t.isSupported)
      return j;
    Ae ? (N = Pe, O = f) : zn(d), (Ce.uponSanitizeElement.length > 0 || Ce.uponSanitizeAttribute.length > 0) && (N = Vt(N)), Ce.uponSanitizeAttribute.length > 0 && (O = Vt(O)), t.removed = [];
    const he = Ee && typeof j != "string" && as(j);
    if (he) {
      Rn(j);
      const lt = Le(j);
      if (typeof lt == "string") {
        const dt = rt(lt);
        if (!N[dt] || W[dt])
          throw ht(j), ds("root node is forbidden and cannot be sanitized in-place");
      }
      if (xs(j))
        throw ht(j), ds("root node is clobbered and cannot be sanitized in-place");
      try {
        ls(j);
      } catch (dt) {
        throw ht(j), dt;
      }
    } else if (as(j))
      k = kt("<!---->"), B = k.ownerDocument.importNode(j, !0), B.nodeType === Wt.element && B.nodeName === "BODY" || B.nodeName === "HTML" ? k = B : k.appendChild(B), ls(k);
    else {
      if (!M && !J && !we && // eslint-disable-next-line unicorn/prefer-includes
      j.indexOf("<") === -1)
        return _e && H ? ue(j) : j;
      if (k = kt(j), !k)
        return M ? null : H ? De : "";
    }
    k && _ && bt(k.firstChild);
    const Oe = he ? j : k;
    try {
      const lt = Hn(Oe);
      for (; Q = lt.nextNode(); )
        qr(Q, Oe), Vr(Q), qn(Q.content) && Es(Q.content);
    } catch (lt) {
      throw he && (ht(j), gs(t.removed, (dt) => {
        dt.element && un(dt.element);
      })), lt;
    }
    if (he)
      return gs(t.removed, (lt) => {
        lt.element && un(lt.element);
      }), J && Qs(j), j;
    if (M) {
      if (J && Qs(k), T)
        for (ie = Je.call(k.ownerDocument); k.firstChild; )
          ie.appendChild(k.firstChild);
      else
        ie = k;
      return (O.shadowroot || O.shadowrootmode) && (ie = St.call(s, ie, !0)), ie;
    }
    let $e = we ? k.outerHTML : k.innerHTML;
    return we && N["!doctype"] && k.ownerDocument && k.ownerDocument.doctype && k.ownerDocument.doctype.name && Lt(Up, k.ownerDocument.doctype.name) && ($e = "<!DOCTYPE " + k.ownerDocument.doctype.name + `>
` + $e), J && ($e = Xt($e)), _e && H ? ue($e) : $e;
  }, t.setConfig = function() {
    let j = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    zn(j), Ae = !0, Pe = N, f = O;
  }, t.clearConfig = function() {
    En = null, Ae = !1, Pe = null, f = null, _e = ve, De = "";
  }, t.isValidAttribute = function(j, d, k) {
    En || zn({});
    const B = rt(j), Q = rt(d);
    return Wr(B, Q, k);
  }, t.addHook = function(j, d) {
    typeof d == "function" && Ht(Ce, j) && dr(Ce[j], d);
  }, t.removeHook = function(j, d) {
    if (Ht(Ce, j)) {
      if (d !== void 0) {
        const k = kp(Ce[j], d);
        return k === -1 ? void 0 : Tp(Ce[j], k, 1)[0];
      }
      return Nl(Ce[j]);
    }
  }, t.removeHooks = function(j) {
    Ht(Ce, j) && (Ce[j] = []);
  }, t.removeAllHooks = function() {
    Ce = jl();
  }, t;
}
var xa = Cu();
xa.addHook("uponSanitizeElement", (e, t) => {
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
xa.addHook("afterSanitizeAttributes", (e) => {
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
function Gp(e) {
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
function Yp(e) {
  if (!Gp(e))
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
  return xa.sanitize(e, t);
}
He.setOptions({
  renderer: new He.Renderer(),
  gfm: !0,
  breaks: !0
});
const ui = (e) => Yp(He(e || "")), Vl = "*", Xp = /* @__PURE__ */ new Set(["null", "about:blank", ""]);
let dn = null;
const fi = (e) => e && !Xp.has(e) ? e : null, Zp = (e) => {
  if (!e) return null;
  try {
    return fi(new URL(e).origin);
  } catch {
    return null;
  }
};
function Jp() {
  if (dn) return dn;
  if (window.parent === window)
    return dn = fi(window.location.origin) || Vl, dn;
  try {
    const e = fi(window.parent.location.origin);
    if (e)
      return dn = e, dn;
  } catch {
  }
  try {
    const e = window.location.ancestorOrigins, t = e && e.length ? fi(e[0]) : null;
    if (t)
      return dn = t, dn;
  } catch {
  }
  return dn = Zp(document.referrer) || Vl, dn;
}
function Xn(e) {
  window.parent.postMessage(e, Jp());
}
const Ii = "Start a new chat", Kl = "Start a new chat? This ends the current one.", Qp = "Start new chat", em = "Cancel", Gl = "Couldn't start a new chat. Please try again.", tm = 15e3, nm = ["aria-label"], sm = { class: "new-chat-confirm__question" }, rm = { class: "new-chat-confirm__actions" }, im = ["disabled"], om = ["disabled"], am = /* @__PURE__ */ fa({
  __name: "NewChatConfirm",
  props: {
    error: {},
    busy: { type: Boolean }
  },
  emits: ["confirm", "cancel"],
  setup(e, { emit: t }) {
    const n = t;
    return (s, r) => (x(), S("div", {
      class: "new-chat-confirm",
      role: "alertdialog",
      "aria-live": "polite",
      "aria-label": R(Kl)
    }, [
      b("p", sm, re(s.error || R(Kl)), 1),
      b("div", rm, [
        b("button", {
          type: "button",
          class: "new-chat-confirm__button",
          disabled: s.busy,
          onClick: r[0] || (r[0] = (i) => n("cancel"))
        }, re(R(em)), 9, im),
        b("button", {
          type: "button",
          class: "new-chat-confirm__button new-chat-confirm__button--primary",
          disabled: s.busy,
          onClick: r[1] || (r[1] = (i) => n("confirm"))
        }, re(R(Qp)), 9, om)
      ])
    ], 8, nm));
  }
}), Sa = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Ru = /* @__PURE__ */ Sa(am, [["__scopeId", "data-v-6c78f353"]]), lm = { class: "askai" }, cm = { class: "askai__bar" }, um = ["value", "placeholder", "disabled", "aria-label", "onKeydown"], fm = ["disabled", "title", "aria-label", "aria-expanded"], hm = { class: "askai__intro" }, dm = { class: "askai__title" }, pm = {
  key: 0,
  class: "askai__subtitle"
}, mm = {
  key: 0,
  class: "askai__suggestions"
}, gm = ["disabled", "onClick"], _m = ["aria-live"], ym = {
  key: 0,
  class: "askai__question"
}, bm = {
  key: 1,
  class: "askai__system"
}, vm = ["innerHTML"], wm = {
  key: 0,
  class: "askai__sources"
}, km = ["title"], Tm = {
  key: 0,
  class: "askai__thinking",
  role: "status",
  "aria-live": "polite"
}, xm = { class: "askai__thinking-text" }, Sm = { class: "askai__foot" }, Am = { key: 0 }, Em = /* @__PURE__ */ fa({
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
    const n = e, s = t, r = ce(null), i = ce(null), o = ce(null), a = ["user", "bot", "agent", "system"], l = de(
      () => n.messages.map((C, P) => ({ message: C, index: P })).filter(({ message: C }) => a.includes(C.message_type))
    ), h = de(() => l.value.length > 0), c = (C) => {
      s("update:draft", C.target.value);
    }, v = () => {
      !(n.typingEnabled ?? n.inputEnabled) || !n.draft.trim() || s("send");
    }, w = (C) => {
      n.inputEnabled && s("ask", C);
    }, z = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform || ""), I = (C) => {
      if (C.key === "Escape") {
        C.preventDefault(), s("close");
        return;
      }
      const P = z ? C.metaKey && !C.ctrlKey : C.ctrlKey && !C.metaKey;
      n.hotkey && P && !C.altKey && (C.key === "k" || C.key === "K") && (C.preventDefault(), s("close"));
    }, K = () => {
      ys(() => {
        var C;
        return (C = r.value) == null ? void 0 : C.focus();
      });
    };
    let D = 0;
    const oe = () => {
      if (!o.value) return;
      const C = o.value.closest(".askai"), P = i.value;
      if (!C || !P) return;
      const Y = C.offsetHeight - P.offsetHeight, Z = getComputedStyle(P), Te = parseFloat(Z.paddingTop) + parseFloat(Z.paddingBottom), Le = Math.ceil(Y + Te + o.value.getBoundingClientRect().height);
      Math.abs(Le - D) < 3 || (D = Le, Xn({ type: "WIDGET_RESIZE", height: Le }));
    };
    let fe = null;
    const pe = de(
      () => l.value.reduce((C, { message: P, index: Y }) => C + n.displayText(Y, P.message || "").length, 0)
    );
    return Ft(
      () => [l.value.length, pe.value, n.loading],
      () => ys(() => {
        i.value && (i.value.scrollTop = i.value.scrollHeight);
      })
    ), Ft(() => n.newChatArmed, () => ys(() => oe())), Ft(() => n.active, (C) => {
      C && K();
    }), Ui(() => {
      n.active && K(), window.addEventListener("keydown", I), o.value && typeof ResizeObserver < "u" && (fe = new ResizeObserver(() => oe()), fe.observe(o.value)), oe();
    }), qc(() => {
      window.removeEventListener("keydown", I), fe == null || fe.disconnect(), fe = null;
    }), (C, P) => (x(), S("div", lm, [
      b("div", cm, [
        P[6] || (P[6] = b("svg", {
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
          b("path", { d: "M12 3l1.9 4.9L19 9.8l-4.9 1.9L12 17l-1.9-5.3L5 9.8l5.1-1.9L12 3z" })
        ], -1)),
        b("input", {
          ref_key: "inputEl",
          ref: r,
          type: "text",
          class: "askai__input",
          value: C.draft,
          placeholder: C.placeholder,
          disabled: !(C.typingEnabled ?? C.inputEnabled),
          "aria-label": C.placeholder,
          autocomplete: "off",
          spellcheck: "false",
          onInput: c,
          onKeydown: li(ms(v, ["prevent"]), ["enter"])
        }, null, 40, um),
        C.canStartNewChat ? (x(), S("button", {
          key: 0,
          type: "button",
          class: Ue(["askai__new", { "askai__new--armed": C.newChatArmed }]),
          disabled: C.startingNewChat,
          title: R(Ii),
          "aria-label": R(Ii),
          "aria-expanded": C.newChatArmed,
          onClick: P[0] || (P[0] = (Y) => s("newChat"))
        }, P[4] || (P[4] = [
          b("svg", {
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
            b("path", { d: "M12 20h9" }),
            b("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" })
          ], -1)
        ]), 10, fm)) : le("", !0),
        b("button", {
          type: "button",
          class: "askai__close",
          "aria-label": "Close",
          title: "Close (Esc)",
          onClick: P[1] || (P[1] = (Y) => s("close"))
        }, P[5] || (P[5] = [
          b("span", { class: "askai__kbd" }, "Esc", -1)
        ]))
      ]),
      C.newChatArmed && C.canStartNewChat ? (x(), xi(Ru, {
        key: 0,
        busy: C.startingNewChat,
        error: C.newChatError,
        onConfirm: P[2] || (P[2] = (Y) => s("confirmNewChat")),
        onCancel: P[3] || (P[3] = (Y) => s("cancelNewChat"))
      }, null, 8, ["busy", "error"])) : le("", !0),
      b("div", {
        ref_key: "bodyEl",
        ref: i,
        class: "askai__body"
      }, [
        b("div", {
          ref_key: "contentEl",
          ref: o,
          class: "askai__content"
        }, [
          h.value ? (x(), S(ze, { key: 1 }, [
            (x(!0), S(ze, null, At(l.value, ({ message: Y, index: Z }) => (x(), S("div", {
              key: Z,
              class: "askai__turn",
              "aria-live": C.isStreaming(Z) ? "off" : "polite"
            }, [
              Y.message_type === "user" ? (x(), S("p", ym, re(Y.message), 1)) : Y.message_type === "system" ? (x(), S("p", bm, re(Y.message), 1)) : (x(), S(ze, { key: 2 }, [
                b("div", {
                  class: Ue(["askai__answer", { "askai__answer--streaming": C.isStreaming(Z) }]),
                  innerHTML: R(ui)(C.isStreaming(Z) ? C.displayText(Z, Y.message || "") : Y.message || "")
                }, null, 10, vm),
                C.showCitations && !C.isStreaming(Z) && Y.sources && Y.sources.length ? (x(), S("div", wm, [
                  P[9] || (P[9] = b("span", { class: "askai__label" }, "Sources", -1)),
                  (x(!0), S(ze, null, At(Y.sources, (Te, Le) => (x(), S("span", {
                    key: Le,
                    class: "askai__source",
                    title: C.citationTooltip(Te)
                  }, re(C.citationLabel(Te)), 9, km))), 128))
                ])) : le("", !0)
              ], 64))
            ], 8, _m))), 128)),
            C.loading ? (x(), S("div", Tm, [
              P[10] || (P[10] = b("span", { class: "askai__dot" }, null, -1)),
              P[11] || (P[11] = b("span", { class: "askai__dot" }, null, -1)),
              P[12] || (P[12] = b("span", { class: "askai__dot" }, null, -1)),
              b("span", xm, re(C.showCitations ? "Searching the knowledge base" : "Thinking"), 1)
            ])) : le("", !0)
          ], 64)) : (x(), S(ze, { key: 0 }, [
            b("div", hm, [
              b("h2", dm, re(C.welcomeTitle || `Ask ${C.agentName}`), 1),
              C.welcomeSubtitle ? (x(), S("p", pm, re(C.welcomeSubtitle), 1)) : le("", !0)
            ]),
            C.suggestions.length && !C.draft.trim() ? (x(), S("div", mm, [
              P[8] || (P[8] = b("p", { class: "askai__label" }, "Suggested", -1)),
              (x(!0), S(ze, null, At(C.suggestions, (Y) => (x(), S("button", {
                key: Y,
                type: "button",
                class: "askai__suggestion",
                disabled: !C.inputEnabled,
                onClick: (Z) => w(Y)
              }, [
                b("span", null, re(Y), 1),
                P[7] || (P[7] = b("svg", {
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
                  b("path", { d: "M5 12h14M13 6l6 6-6 6" })
                ], -1))
              ], 8, gm))), 128))
            ])) : le("", !0)
          ], 64))
        ], 512)
      ], 512),
      b("div", Sm, [
        C.disclaimer ? (x(), S("span", Am, re(C.disclaimer), 1)) : le("", !0)
      ])
    ]));
  }
}), Cm = /* @__PURE__ */ Sa(Em, [["__scopeId", "data-v-8e1b1574"]]), br = [
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
], Rm = (e) => (e || "").split("").reduce((t, n) => t + n.charCodeAt(0), 0) % br.length, Im = (e) => {
  const t = br[(e % br.length + br.length) % br.length];
  return {
    background: `
            radial-gradient(circle at 32% 28%, rgba(255,255,255,0.22) 0%, transparent 42%),
            radial-gradient(circle at 68% 72%, rgba(0,0,0,0.25) 0%, transparent 38%),
            radial-gradient(ellipse at 50% 50%, ${t.stops})
        `.trim(),
    boxShadow: `0 4px 28px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`,
    borderRadius: "50%"
  };
}, Lm = (e, t) => {
  const n = typeof t == "number" && Number.isFinite(t) ? t : Rm(e);
  return Im(n);
}, Yl = (e) => {
  var t;
  return !!((t = e == null ? void 0 : e.attributes) != null && t.end_chat);
}, Xl = "AI can make mistakes. Check important info.";
function Om(e, t = !1) {
  return e !== !1 && !t;
}
const ko = {
  ai: "Online · replies instantly",
  human: "Online · usually replies in a few minutes",
  away: "Away · we'll reply when we're back"
};
function Nm(e, t = !1) {
  return (t ? "human" : (e == null ? void 0 : e.mode) ?? "ai") === "ai" ? { text: ko.ai, online: !0 } : (e == null ? void 0 : e.available) !== !1 ? { text: ko.human, online: !0 } : { text: ko.away, online: !1 };
}
const Iu = (e) => !!e && (/^https?:\/\//i.test(e) || e.startsWith("data:")), Pm = (e, t) => e ? Iu(e) || e.startsWith("blob:") ? e : `${t.replace(/\/api\/v1\/?$/, "")}${e.startsWith("/") ? "" : "/"}${e}` : "";
function Zl() {
  return typeof window < "u" && window.APP_CONFIG ? window.APP_CONFIG : {};
}
const qs = {
  get API_URL() {
    return Zl().API_URL || "https://api.chattermate.chat/api/v1";
  },
  get WS_URL() {
    return Zl().WS_URL || "wss://chm.c-dev.in";
  }
};
function Li(e) {
  return Pm(e, qs.API_URL);
}
function Mm(e) {
  const t = de(() => ({
    backgroundColor: "var(--cm-card)",
    color: "var(--cm-text)"
  })), n = de(() => ({
    backgroundColor: e.value.chat_bubble_color || "#C9F24E",
    color: Bs(e.value.chat_bubble_color || "#C9F24E") ? "#FFFFFF" : "#000000"
  })), s = de(() => ({
    backgroundColor: "var(--cm-agent-bg)",
    color: "var(--cm-text)"
  })), r = de(() => ({
    backgroundColor: "var(--cm-accent)",
    color: "var(--cm-on-accent)"
  })), i = de(() => ({
    color: "var(--cm-text)"
  })), o = de(() => ({
    borderBottom: "1px solid var(--cm-hairline)"
  })), a = de(() => Li(e.value.photo_url)), l = de(() => {
    const h = e.value.chat_background_color || "#ffffff";
    return {
      boxShadow: `0 8px 5px ${Bs(h) ? "rgba(0, 0, 0, 0.24)" : "rgba(0, 0, 0, 0.12)"}`
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
const Dm = /* @__PURE__ */ new Set(["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]), Fm = /* @__PURE__ */ new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
]);
[...Dm, ...Fm];
function $m(e, t) {
  const n = ce([]), s = ce(!1), r = ce(null), i = (P) => {
    if (P === 0) return "0 Bytes";
    const Y = 1024, Z = ["Bytes", "KB", "MB", "GB"], Te = Math.floor(Math.log(P) / Math.log(Y));
    return parseFloat((P / Math.pow(Y, Te)).toFixed(2)) + " " + Z[Te];
  }, o = (P) => P.startsWith("image/"), a = (P) => P ? Li(P) : "", l = (P) => {
    const Y = P.file_url || P.url;
    return Y ? Li(Y) : "";
  }, h = async (P) => {
    const Y = P.target;
    Y.files && Y.files.length > 0 && (await K(Array.from(Y.files)), Y.value = "");
  }, c = async (P) => {
    var Z;
    P.preventDefault();
    const Y = (Z = P.dataTransfer) == null ? void 0 : Z.files;
    Y && Y.length > 0 && await K(Array.from(Y));
  }, v = (P) => {
    P.preventDefault();
  }, w = (P) => {
    P.preventDefault();
  }, z = async (P) => {
    var Te;
    const Y = (Te = P.clipboardData) == null ? void 0 : Te.items;
    if (!Y) return;
    const Z = [];
    for (const Le of Array.from(Y))
      if (Le.kind === "file") {
        const _e = Le.getAsFile();
        _e && Z.push(_e);
      }
    Z.length > 0 && await K(Z);
  }, I = async (P, Y = 500) => new Promise((Z, Te) => {
    const Le = new FileReader();
    Le.onload = (_e) => {
      var ve;
      const De = new Image();
      De.onload = () => {
        const Ke = document.createElement("canvas");
        let Ge = De.width, at = De.height;
        const ue = 1920;
        (Ge > ue || at > ue) && (Ge > at ? (at = at / Ge * ue, Ge = ue) : (Ge = Ge / at * ue, at = ue)), Ke.width = Ge, Ke.height = at;
        const ye = Ke.getContext("2d");
        if (!ye) {
          Te(new Error("Failed to get canvas context"));
          return;
        }
        ye.drawImage(De, 0, 0, Ge, at);
        let ge = 0.9;
        const nt = () => {
          Ke.toBlob((Xe) => {
            if (!Xe) {
              Te(new Error("Failed to compress image"));
              return;
            }
            if (Xe.size / 1024 > Y && ge > 0.3)
              ge -= 0.1, nt();
            else {
              const Je = new FileReader();
              Je.onload = () => {
                const st = Je.result.split(",")[1];
                Z({ blob: Xe, base64: st });
              }, Je.readAsDataURL(Xe);
            }
          }, P.type === "image/png" ? "image/png" : "image/jpeg", ge);
        };
        nt();
      }, De.onerror = () => Te(new Error("Failed to load image")), De.src = (ve = _e.target) == null ? void 0 : ve.result;
    }, Le.onerror = () => Te(new Error("Failed to read file")), Le.readAsDataURL(P);
  }), K = async (P) => {
    if (n.value.length >= 3) {
      alert("Maximum 3 files allowed per message");
      return;
    }
    const _e = 3 - n.value.length, De = P.slice(0, _e);
    P.length > _e && alert(`Only ${_e} more file(s) can be uploaded. Maximum 3 files per message.`);
    for (const ve of De)
      try {
        if (n.value.some((ue) => ue.filename === ve.name)) {
          console.warn(`File ${ve.name} is already selected`), alert(`File "${ve.name}" is already selected`);
          continue;
        }
        const Ge = ve.type.startsWith("image/"), at = Ge ? 5242880 : 10485760;
        if (ve.size > at) {
          const ue = at / 1048576;
          console.error(`File ${ve.name} is too large. Maximum size is ${ue}MB`), alert(`File "${ve.name}" is too large. Maximum size for ${Ge ? "images" : "documents"} is ${ue}MB`);
          continue;
        }
        if (Ge)
          try {
            const { blob: ue, base64: ye } = await I(ve, 500), ge = ue.size;
            console.log(`Compressed ${ve.name}: ${(ve.size / 1024).toFixed(2)}KB → ${(ge / 1024).toFixed(2)}KB`), n.value.push({
              content: ye,
              filename: ve.name,
              type: ve.type,
              size: ge,
              url: URL.createObjectURL(ue),
              file_url: URL.createObjectURL(ue)
            });
          } catch (ue) {
            console.error("Image compression failed, uploading original:", ue);
            const ye = new FileReader();
            ye.onload = (ge) => {
              var Se;
              const Xe = ((Se = ge.target) == null ? void 0 : Se.result).split(",")[1];
              n.value.push({
                content: Xe,
                filename: ve.name,
                type: ve.type,
                size: ve.size,
                url: URL.createObjectURL(ve),
                file_url: URL.createObjectURL(ve)
              });
            }, ye.readAsDataURL(ve);
          }
        else {
          const ue = new FileReader();
          ue.onload = (ye) => {
            var Xe;
            const nt = ((Xe = ye.target) == null ? void 0 : Xe.result).split(",")[1];
            n.value.push({
              content: nt,
              filename: ve.name,
              type: ve.type || "application/octet-stream",
              size: ve.size,
              url: "",
              file_url: ""
            });
          }, ue.readAsDataURL(ve);
        }
      } catch (Ke) {
        console.error("File upload error:", Ke);
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
    handleFileSelect: h,
    handleDrop: c,
    handleDragOver: v,
    handleDragLeave: w,
    handlePaste: z,
    uploadFiles: K,
    removeAttachment: async (P) => {
      const Y = n.value[P];
      if (Y) {
        try {
          let Z = Y.url;
          if (Z.startsWith("/uploads/") ? Z = Z.substring(9) : Z.startsWith("/") && (Z = Z.substring(1)), Iu(Z))
            try {
              Z = new URL(Z).pathname.replace(/^\/+/, "");
            } catch {
            }
          const Te = {};
          e.value && (Te.Authorization = `Bearer ${e.value}`);
          const Le = await fetch(`${qs.API_URL}/files/upload/${Z}`, {
            method: "DELETE",
            headers: Te
          });
          if (Le.ok)
            console.log("File deleted successfully from backend.");
          else {
            const _e = await Le.json();
            console.error("Failed to delete file:", _e.detail);
          }
        } catch (Z) {
          console.error("Error calling delete API:", Z);
        }
        Y.url && Y.url.startsWith("blob:") && URL.revokeObjectURL(Y.url), Y.file_url && Y.file_url.startsWith("blob:") && URL.revokeObjectURL(Y.file_url), n.value.splice(P, 1);
      }
    },
    openPreview: (P) => {
      r.value = P, s.value = !0;
    },
    closePreview: () => {
      s.value = !1, setTimeout(() => {
        r.value = null;
      }, 300);
    },
    openFilePicker: () => {
      var P;
      (P = t.value) == null || P.click();
    },
    isImage: (P) => P.startsWith("image/")
  };
}
const wn = /* @__PURE__ */ Object.create(null);
wn.open = "0";
wn.close = "1";
wn.ping = "2";
wn.pong = "3";
wn.message = "4";
wn.upgrade = "5";
wn.noop = "6";
const hi = /* @__PURE__ */ Object.create(null);
Object.keys(wn).forEach((e) => {
  hi[wn[e]] = e;
});
const Ko = { type: "error", data: "parser error" }, Lu = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", Ou = typeof ArrayBuffer == "function", Nu = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e && e.buffer instanceof ArrayBuffer, Aa = ({ type: e, data: t }, n, s) => Lu && t instanceof Blob ? n ? s(t) : Jl(t, s) : Ou && (t instanceof ArrayBuffer || Nu(t)) ? n ? s(t) : Jl(new Blob([t]), s) : s(wn[e] + (t || "")), Jl = (e, t) => {
  const n = new FileReader();
  return n.onload = function() {
    const s = n.result.split(",")[1];
    t("b" + (s || ""));
  }, n.readAsDataURL(e);
};
function Ql(e) {
  return e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let To;
function Bm(e, t) {
  if (Lu && e.data instanceof Blob)
    return e.data.arrayBuffer().then(Ql).then(t);
  if (Ou && (e.data instanceof ArrayBuffer || Nu(e.data)))
    return t(Ql(e.data));
  Aa(e, !1, (n) => {
    To || (To = new TextEncoder()), t(To.encode(n));
  });
}
const ec = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", vr = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < ec.length; e++)
  vr[ec.charCodeAt(e)] = e;
const Um = (e) => {
  let t = e.length * 0.75, n = e.length, s, r = 0, i, o, a, l;
  e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
  const h = new ArrayBuffer(t), c = new Uint8Array(h);
  for (s = 0; s < n; s += 4)
    i = vr[e.charCodeAt(s)], o = vr[e.charCodeAt(s + 1)], a = vr[e.charCodeAt(s + 2)], l = vr[e.charCodeAt(s + 3)], c[r++] = i << 2 | o >> 4, c[r++] = (o & 15) << 4 | a >> 2, c[r++] = (a & 3) << 6 | l & 63;
  return h;
}, zm = typeof ArrayBuffer == "function", Ea = (e, t) => {
  if (typeof e != "string")
    return {
      type: "message",
      data: Pu(e, t)
    };
  const n = e.charAt(0);
  return n === "b" ? {
    type: "message",
    data: Hm(e.substring(1), t)
  } : hi[n] ? e.length > 1 ? {
    type: hi[n],
    data: e.substring(1)
  } : {
    type: hi[n]
  } : Ko;
}, Hm = (e, t) => {
  if (zm) {
    const n = Um(e);
    return Pu(n, t);
  } else
    return { base64: !0, data: e };
}, Pu = (e, t) => {
  switch (t) {
    case "blob":
      return e instanceof Blob ? e : new Blob([e]);
    case "arraybuffer":
    default:
      return e instanceof ArrayBuffer ? e : e.buffer;
  }
}, Mu = "", qm = (e, t) => {
  const n = e.length, s = new Array(n);
  let r = 0;
  e.forEach((i, o) => {
    Aa(i, !1, (a) => {
      s[o] = a, ++r === n && t(s.join(Mu));
    });
  });
}, Wm = (e, t) => {
  const n = e.split(Mu), s = [];
  for (let r = 0; r < n.length; r++) {
    const i = Ea(n[r], t);
    if (s.push(i), i.type === "error")
      break;
  }
  return s;
};
function jm() {
  return new TransformStream({
    transform(e, t) {
      Bm(e, (n) => {
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
let xo;
function ti(e) {
  return e.reduce((t, n) => t + n.length, 0);
}
function ni(e, t) {
  if (e[0].length === t)
    return e.shift();
  const n = new Uint8Array(t);
  let s = 0;
  for (let r = 0; r < t; r++)
    n[r] = e[0][s++], s === e[0].length && (e.shift(), s = 0);
  return e.length && s < e[0].length && (e[0] = e[0].slice(s)), n;
}
function Vm(e, t) {
  xo || (xo = new TextDecoder());
  const n = [];
  let s = 0, r = -1, i = !1;
  return new TransformStream({
    transform(o, a) {
      for (n.push(o); ; ) {
        if (s === 0) {
          if (ti(n) < 1)
            break;
          const l = ni(n, 1);
          i = (l[0] & 128) === 128, r = l[0] & 127, r < 126 ? s = 3 : r === 126 ? s = 1 : s = 2;
        } else if (s === 1) {
          if (ti(n) < 2)
            break;
          const l = ni(n, 2);
          r = new DataView(l.buffer, l.byteOffset, l.length).getUint16(0), s = 3;
        } else if (s === 2) {
          if (ti(n) < 8)
            break;
          const l = ni(n, 8), h = new DataView(l.buffer, l.byteOffset, l.length), c = h.getUint32(0);
          if (c > Math.pow(2, 21) - 1) {
            a.enqueue(Ko);
            break;
          }
          r = c * Math.pow(2, 32) + h.getUint32(4), s = 3;
        } else {
          if (ti(n) < r)
            break;
          const l = ni(n, r);
          a.enqueue(Ea(i ? l : xo.decode(l), t)), s = 0;
        }
        if (r === 0 || r > e) {
          a.enqueue(Ko);
          break;
        }
      }
    }
  });
}
const Du = 4;
function mt(e) {
  if (e) return Km(e);
}
function Km(e) {
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
const Vi = typeof Promise == "function" && typeof Promise.resolve == "function" ? (t) => Promise.resolve().then(t) : (t, n) => n(t, 0), en = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), Gm = "arraybuffer";
function Fu(e, ...t) {
  return t.reduce((n, s) => (e.hasOwnProperty(s) && (n[s] = e[s]), n), {});
}
const Ym = en.setTimeout, Xm = en.clearTimeout;
function Ki(e, t) {
  t.useNativeTimers ? (e.setTimeoutFn = Ym.bind(en), e.clearTimeoutFn = Xm.bind(en)) : (e.setTimeoutFn = en.setTimeout.bind(en), e.clearTimeoutFn = en.clearTimeout.bind(en));
}
const Zm = 1.33;
function Jm(e) {
  return typeof e == "string" ? Qm(e) : Math.ceil((e.byteLength || e.size) * Zm);
}
function Qm(e) {
  let t = 0, n = 0;
  for (let s = 0, r = e.length; s < r; s++)
    t = e.charCodeAt(s), t < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (s++, n += 4);
  return n;
}
function $u() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function eg(e) {
  let t = "";
  for (let n in e)
    e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
  return t;
}
function tg(e) {
  let t = {}, n = e.split("&");
  for (let s = 0, r = n.length; s < r; s++) {
    let i = n[s].split("=");
    t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
  }
  return t;
}
class ng extends Error {
  constructor(t, n, s) {
    super(t), this.description = n, this.context = s, this.type = "TransportError";
  }
}
class Ca extends mt {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(t) {
    super(), this.writable = !1, Ki(this, t), this.opts = t, this.query = t.query, this.socket = t.socket, this.supportsBinary = !t.forceBase64;
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
    return super.emitReserved("error", new ng(t, n, s)), this;
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
    const n = Ea(t, this.socket.binaryType);
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
    const n = eg(t);
    return n.length ? "?" + n : "";
  }
}
class sg extends Ca {
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
    Wm(t, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
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
    this.writable = !1, qm(t, (n) => {
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
    return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = $u()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(t, n);
  }
}
let Bu = !1;
try {
  Bu = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const rg = Bu;
function ig() {
}
class og extends sg {
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
class bn extends mt {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(t, n, s) {
    super(), this.createRequest = t, Ki(this, s), this._opts = s, this._method = s.method || "GET", this._uri = n, this._data = s.data !== void 0 ? s.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var t;
    const n = Fu(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
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
    typeof document < "u" && (this._index = bn.requestsCount++, bn.requests[this._index] = this);
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
      if (this._xhr.onreadystatechange = ig, t)
        try {
          this._xhr.abort();
        } catch {
        }
      typeof document < "u" && delete bn.requests[this._index], this._xhr = null;
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
bn.requestsCount = 0;
bn.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", tc);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in en ? "pagehide" : "unload";
    addEventListener(e, tc, !1);
  }
}
function tc() {
  for (let e in bn.requests)
    bn.requests.hasOwnProperty(e) && bn.requests[e].abort();
}
const ag = function() {
  const e = Uu({
    xdomain: !1
  });
  return e && e.responseType !== null;
}();
class lg extends og {
  constructor(t) {
    super(t);
    const n = t && t.forceBase64;
    this.supportsBinary = ag && !n;
  }
  request(t = {}) {
    return Object.assign(t, { xd: this.xd }, this.opts), new bn(Uu, this.uri(), t);
  }
}
function Uu(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || rg))
      return new XMLHttpRequest();
  } catch {
  }
  if (!t)
    try {
      return new en[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const zu = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class cg extends Ca {
  get name() {
    return "websocket";
  }
  doOpen() {
    const t = this.uri(), n = this.opts.protocols, s = zu ? {} : Fu(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
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
      Aa(s, this.supportsBinary, (i) => {
        try {
          this.doWrite(s, i);
        } catch {
        }
        r && Vi(() => {
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
    return this.opts.timestampRequests && (n[this.opts.timestampParam] = $u()), this.supportsBinary || (n.b64 = 1), this.createUri(t, n);
  }
}
const So = en.WebSocket || en.MozWebSocket;
class ug extends cg {
  createSocket(t, n, s) {
    return zu ? new So(t, n, s) : n ? new So(t, n) : new So(t);
  }
  doWrite(t, n) {
    this.ws.send(n);
  }
}
class fg extends Ca {
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
        const n = Vm(Number.MAX_SAFE_INTEGER, this.socket.binaryType), s = t.readable.pipeThrough(n).getReader(), r = jm();
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
        r && Vi(() => {
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
const hg = {
  websocket: ug,
  webtransport: fg,
  polling: lg
}, dg = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, pg = [
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
function Go(e) {
  if (e.length > 8e3)
    throw "URI too long";
  const t = e, n = e.indexOf("["), s = e.indexOf("]");
  n != -1 && s != -1 && (e = e.substring(0, n) + e.substring(n, s).replace(/:/g, ";") + e.substring(s, e.length));
  let r = dg.exec(e || ""), i = {}, o = 14;
  for (; o--; )
    i[pg[o]] = r[o] || "";
  return n != -1 && s != -1 && (i.source = t, i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"), i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), i.ipv6uri = !0), i.pathNames = mg(i, i.path), i.queryKey = gg(i, i.query), i;
}
function mg(e, t) {
  const n = /\/{2,9}/g, s = t.replace(n, "/").split("/");
  return (t.slice(0, 1) == "/" || t.length === 0) && s.splice(0, 1), t.slice(-1) == "/" && s.splice(s.length - 1, 1), s;
}
function gg(e, t) {
  const n = {};
  return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, r, i) {
    r && (n[r] = i);
  }), n;
}
const Yo = typeof addEventListener == "function" && typeof removeEventListener == "function", di = [];
Yo && addEventListener("offline", () => {
  di.forEach((e) => e());
}, !1);
class Jn extends mt {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(t, n) {
    if (super(), this.binaryType = Gm, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, t && typeof t == "object" && (n = t, t = null), t) {
      const s = Go(t);
      n.hostname = s.host, n.secure = s.protocol === "https" || s.protocol === "wss", n.port = s.port, s.query && (n.query = s.query);
    } else n.host && (n.hostname = Go(n.host).host);
    Ki(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((s) => {
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
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = tg(this.opts.query)), Yo && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, di.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
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
    n.EIO = Du, n.transport = t, this.id && (n.sid = this.id);
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
    const t = this.opts.rememberUpgrade && Jn.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
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
    this.readyState = "open", Jn.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
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
      if (r && (n += Jm(r)), s > 0 && n > this._maxPayload)
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
    return t && (this._pingTimeoutTime = 0, Vi(() => {
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
    if (Jn.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
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
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), Yo && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const s = di.indexOf(this._offlineEventListener);
        s !== -1 && di.splice(s, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", t, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
Jn.protocol = Du;
class _g extends Jn {
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
    Jn.priorWebsocketSuccess = !1;
    const r = () => {
      s || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (v) => {
        if (!s)
          if (v.type === "pong" && v.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", n), !n)
              return;
            Jn.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
              s || this.readyState !== "closed" && (c(), this.setTransport(n), n.send([{ type: "upgrade" }]), this.emitReserved("upgrade", n), n = null, this.upgrading = !1, this.flush());
            });
          } else {
            const w = new Error("probe error");
            w.transport = n.name, this.emitReserved("upgradeError", w);
          }
      }));
    };
    function i() {
      s || (s = !0, c(), n.close(), n = null);
    }
    const o = (v) => {
      const w = new Error("probe error: " + v);
      w.transport = n.name, i(), this.emitReserved("upgradeError", w);
    };
    function a() {
      o("transport closed");
    }
    function l() {
      o("socket closed");
    }
    function h(v) {
      n && v.name !== n.name && i();
    }
    const c = () => {
      n.removeListener("open", r), n.removeListener("error", o), n.removeListener("close", a), this.off("close", l), this.off("upgrading", h);
    };
    n.once("open", r), n.once("error", o), n.once("close", a), this.once("close", l), this.once("upgrading", h), this._upgrades.indexOf("webtransport") !== -1 && t !== "webtransport" ? this.setTimeoutFn(() => {
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
let yg = class extends _g {
  constructor(t, n = {}) {
    const s = typeof t == "object", r = s ? { ...t } : { ...n };
    (!r.transports || r.transports && typeof r.transports[0] == "string") && (r.transports = (r.transports || ["polling", "websocket", "webtransport"]).map((i) => hg[i]).filter((i) => !!i)), super(s ? r : t, r);
  }
};
function bg(e, t = "", n) {
  let s = e;
  n = n || typeof location < "u" && location, e == null && (e = n.protocol + "//" + n.host), typeof e == "string" && (e.charAt(0) === "/" && (e.charAt(1) === "/" ? e = n.protocol + e : e = n.host + e), /^(https?|wss?):\/\//.test(e) || (typeof n < "u" ? e = n.protocol + "//" + e : e = "https://" + e), s = Go(e)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
  const i = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return s.id = s.protocol + "://" + i + ":" + s.port + t, s.href = s.protocol + "://" + i + (n && n.port === s.port ? "" : ":" + s.port), s;
}
const vg = typeof ArrayBuffer == "function", wg = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer, Hu = Object.prototype.toString, kg = typeof Blob == "function" || typeof Blob < "u" && Hu.call(Blob) === "[object BlobConstructor]", Tg = typeof File == "function" || typeof File < "u" && Hu.call(File) === "[object FileConstructor]";
function Ra(e) {
  return vg && (e instanceof ArrayBuffer || wg(e)) || kg && e instanceof Blob || Tg && e instanceof File;
}
function pi(e, t) {
  if (!e || typeof e != "object")
    return !1;
  if (Array.isArray(e)) {
    for (let n = 0, s = e.length; n < s; n++)
      if (pi(e[n]))
        return !0;
    return !1;
  }
  if (Ra(e))
    return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return pi(e.toJSON(), !0);
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && pi(e[n]))
      return !0;
  return !1;
}
function xg(e) {
  const t = [], n = e.data, s = e;
  return s.data = mi(n, t), s.attachments = t.length, { packet: s, buffers: t };
}
function mi(e, t, n) {
  if (!e)
    return e;
  if (Ra(e)) {
    const s = { _placeholder: !0, num: t.length };
    return t.push(e), s;
  } else if (Array.isArray(e)) {
    const s = new Array(e.length);
    for (let r = 0; r < e.length; r++)
      s[r] = mi(e[r], t);
    return s;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    if (e.toJSON && typeof e.toJSON == "function" && !n)
      return mi(e.toJSON(), t, !0);
    const s = {};
    for (const r in e)
      Object.prototype.hasOwnProperty.call(e, r) && (s[r] = mi(e[r], t));
    return s;
  }
  return e;
}
function Sg(e, t) {
  return e.data = Xo(e.data, t), delete e.attachments, e;
}
function Xo(e, t) {
  if (!e)
    return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == "number" && e.num >= 0 && e.num < t.length)
      return t[e.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(e))
    for (let n = 0; n < e.length; n++)
      e[n] = Xo(e[n], t);
  else if (typeof e == "object")
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (e[n] = Xo(e[n], t));
  return e;
}
const Ag = [
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
class Eg {
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
    return (t.type === Ne.EVENT || t.type === Ne.ACK) && pi(t) ? this.encodeAsBinary({
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
    const n = xg(t), s = this.encodeAsString(n.packet), r = n.buffers;
    return r.unshift(s), r;
  }
}
class Ia extends mt {
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
      s || n.type === Ne.BINARY_ACK ? (n.type = s ? Ne.EVENT : Ne.ACK, this.reconstructor = new Cg(n)) : super.emitReserved("decoded", n);
    } else if (Ra(t) || t.base64)
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
      if (!Rg(a) || a < 1)
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
      if (Ia.isPayloadValid(s.type, i))
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
        return nc(n);
      case Ne.DISCONNECT:
        return n === void 0;
      case Ne.CONNECT_ERROR:
        return typeof n == "string" || nc(n);
      case Ne.EVENT:
      case Ne.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && Ag.indexOf(n[0]) === -1);
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
class Cg {
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
      const n = Sg(this.reconPack, this.buffers);
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
const Rg = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
};
function nc(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
const Ig = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Ia,
  Encoder: Eg,
  get PacketType() {
    return Ne;
  }
}, Symbol.toStringTag, { value: "Module" }));
function an(e, t, n) {
  return e.on(t, n), function() {
    e.off(t, n);
  };
}
const Lg = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class qu extends mt {
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
      an(t, "open", this.onopen.bind(this)),
      an(t, "packet", this.onpacket.bind(this)),
      an(t, "error", this.onerror.bind(this)),
      an(t, "close", this.onclose.bind(this))
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
    if (Lg.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (n.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const o = {
      type: Ne.EVENT,
      data: n
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
      const c = this.ids++, v = n.pop();
      this._registerAckCallback(c, v), o.id = c;
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
function Ws(e) {
  e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;
}
Ws.prototype.duration = function() {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(), n = Math.floor(t * this.jitter * e);
    e = (Math.floor(t * 10) & 1) == 0 ? e - n : e + n;
  }
  return Math.min(e, this.max) | 0;
};
Ws.prototype.reset = function() {
  this.attempts = 0;
};
Ws.prototype.setMin = function(e) {
  this.ms = e;
};
Ws.prototype.setMax = function(e) {
  this.max = e;
};
Ws.prototype.setJitter = function(e) {
  this.jitter = e;
};
class Zo extends mt {
  constructor(t, n) {
    var s;
    super(), this.nsps = {}, this.subs = [], t && typeof t == "object" && (n = t, t = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, Ki(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5), this.backoff = new Ws({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = t;
    const r = n.parser || Ig;
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
    this.engine = new yg(this.uri, this.opts);
    const n = this.engine, s = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const r = an(n, "open", function() {
      s.onopen(), t && t();
    }), i = (a) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", a), t ? t(a) : this.maybeReconnectOnOpen();
    }, o = an(n, "error", i);
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
      an(t, "ping", this.onping.bind(this)),
      an(t, "data", this.ondata.bind(this)),
      an(t, "error", this.onerror.bind(this)),
      an(t, "close", this.onclose.bind(this)),
      // @ts-ignore
      an(this.decoder, "decoded", this.ondecoded.bind(this))
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
    Vi(() => {
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
    return s ? this._autoConnect && !s.active && s.connect() : (s = new qu(this, t, n), this.nsps[t] = s), s;
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
const gr = {};
function gi(e, t) {
  typeof e == "object" && (t = e, e = void 0), t = t || {};
  const n = bg(e, t.path || "/socket.io"), s = n.source, r = n.id, i = n.path, o = gr[r] && i in gr[r].nsps, a = t.forceNew || t["force new connection"] || t.multiplex === !1 || o;
  let l;
  return a ? l = new Zo(s, t) : (gr[r] || (gr[r] = new Zo(s, t)), l = gr[r]), n.query && !t.query && (t.query = n.queryKey), l.socket(n.path, t);
}
Object.assign(gi, {
  Manager: Zo,
  Socket: qu,
  io: gi,
  connect: gi
});
const La = "ctid", Og = "identity_expired", sc = 0.8, Ng = 720 * 60 * 1e3, Ao = 30 * 1e3, Eo = 1e3, zs = (e) => {
  if (typeof e != "string") return e ? String(e) : null;
  const t = e.trim();
  return !t || t === "undefined" || t === "null" ? null : t;
}, _i = (e) => {
  const t = zs(e);
  if (!t) return null;
  const [, n] = t.split(".");
  if (!n) return null;
  try {
    const s = atob(n.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(s);
  } catch {
    return null;
  }
}, Pg = () => {
  try {
    return zs(localStorage.getItem(La));
  } catch {
    return null;
  }
}, rc = (e) => {
  try {
    localStorage.setItem(La, e);
  } catch {
  }
}, Mg = () => {
  try {
    localStorage.removeItem(La);
  } catch {
  }
};
function Dg(e = {}) {
  const t = ce(null);
  let n = null, s = null;
  const r = () => {
    n && (clearTimeout(n), n = null);
  }, i = () => {
    const I = _i(t.value);
    return I != null && I.exp ? Number(I.exp) - Math.floor(Date.now() / Eo) : null;
  }, o = () => {
    const I = _i(t.value);
    if (!(I != null && I.exp)) return !1;
    const K = I.iat ? Number(I.exp) - Number(I.iat) : 0, D = i() ?? 0;
    return K <= 0 ? D <= 0 : D <= K * (1 - sc);
  }, a = (I, { persist: K = !0 } = {}) => {
    var oe;
    const D = zs(I);
    if (r(), t.value = D, !D) {
      Mg();
      return;
    }
    K && (rc(D), (oe = e.onTokenChanged) == null || oe.call(e, D)), c();
  }, l = async (I) => {
    if (!t.value || !I) return !1;
    if (s) return s;
    const K = t.value;
    return s = (async () => {
      var D, oe;
      try {
        const fe = await fetch(`${qs.API_URL}/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${K}`
          },
          body: JSON.stringify({ widget_id: I })
        });
        if (fe.status === 401)
          return (D = e.onIdentityExpired) == null || D.call(e), !1;
        if (!fe.ok)
          return c(Ao), !1;
        const pe = await fe.json(), C = zs((oe = pe == null ? void 0 : pe.data) == null ? void 0 : oe.token);
        return C ? (a(C), !0) : !1;
      } catch {
        return c(Ao), !1;
      } finally {
        s = null;
      }
    })(), s;
  }, h = async (I) => t.value ? o() ? l(I) : !0 : !1, c = (I) => {
    r();
    const K = _i(t.value);
    if (!(K != null && K.exp) || !(K != null && K.iat)) return;
    const D = (Number(K.exp) - Number(K.iat)) * Eo, oe = (i() ?? 0) * Eo, fe = I ?? Math.min(
      Ng,
      Math.max(0, oe - D * (1 - sc))
    );
    n = setTimeout(() => {
      n = null, h(v).then((pe) => {
        c(pe ? void 0 : Ao);
      });
    }, fe);
  };
  let v = "";
  return {
    token: t,
    start: (I, K) => {
      v = I;
      const D = zs(K) || Pg();
      a(D, { persist: !1 }), D && rc(D);
    },
    stop: () => {
      r(), s = null;
    },
    setToken: a,
    ensureFresh: h
  };
}
const Fg = 5e3;
function $g() {
  const e = ce([]), t = ce(!1), n = ce(""), s = ce(!1), r = ce(!1), i = ce(!1), o = ce("connecting"), a = ce(0), l = 5, h = ce({}), c = ce(null), v = ce("");
  let w = null;
  const z = 6e4, I = () => {
    t.value = !1, w && (clearTimeout(w), w = null);
  }, K = () => {
    t.value = !0, w && clearTimeout(w), w = setTimeout(I, z);
  };
  let D = null;
  const oe = 1e3, fe = 15e3;
  let pe = null;
  const C = /* @__PURE__ */ new Set(["ai_config_missing", "customer_required"]);
  let P = !1;
  const Y = ce(null), Z = () => {
    pe && (clearTimeout(pe), pe = null);
  }, Te = () => {
    if (pe || P) return;
    const A = Math.min(
      oe * 2 ** Math.max(0, a.value - 1),
      fe
    );
    pe = setTimeout(() => {
      pe = null, D == null || D.connect();
    }, A);
  };
  let Le = null, _e = null, De = null, ve = null, Ke = null, Ge, at, ue;
  const ye = (A) => {
    var L;
    return (L = _i(A ?? null)) == null ? void 0 : L.sub;
  }, ge = (A) => {
    Ge = A, A && D != null && D.connected && D.emit("refresh_token", { conversation_token: A });
  }, nt = (A) => {
    at = A;
  }, Xe = () => {
    var V;
    const A = Ge || localStorage.getItem("ctid"), L = {};
    A && (L.conversation_token = A), at && (L.widget_id = at);
    try {
      L.page_url = window.parent !== window && ((V = window.parent.location) != null && V.href) ? window.parent.location.href : document.referrer || window.location.href;
    } catch {
      L.page_url = document.referrer || "";
    }
    return L;
  }, Se = (A) => (D = gi(`${qs.WS_URL}/widget`, {
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
    auth: (L) => L(Xe())
  }), D.on("connect", () => {
    ue = ye(Xe().conversation_token), o.value = "connected", Z(), a.value = 0;
  }), D.on("bot_typing", () => {
    K();
  }), D.on("disconnect", () => {
    I(), o.value === "connected" && (console.log("Socket disconnected, setting connection status to connecting"), o.value = "connecting");
  }), D.on("connect_error", (L) => {
    var J;
    const V = (J = L == null ? void 0 : L.data) == null ? void 0 : J.type;
    if (V && C.has(V)) {
      P = !0, Y.value = V, Z(), o.value = "failed", V !== "customer_required" && Ct(L.data);
      return;
    }
    a.value++, console.error("Socket connection failed, attempt:", a.value), a.value >= l && (o.value = "failed"), D && !D.active && Te();
  }), D.on("chat_response", (L) => {
    if (I(), L.session_id ? (console.log("Captured session_id from chat_response:", L.session_id), v.value = L.session_id) : console.warn("No session_id in chat_response data:", L), L.type === "agent_message") {
      const V = {
        message: L.message,
        message_type: "agent",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: "",
        agent_name: L.agent_name,
        stream: !0,
        // live reply → client-side typewriter reveal
        attributes: {
          end_chat: L.end_chat,
          end_chat_reason: L.end_chat_reason,
          end_chat_description: L.end_chat_description,
          request_rating: L.request_rating
        }
      };
      L.attachments && Array.isArray(L.attachments) && (V.id = L.message_id, V.attachments = L.attachments.map((J, ae) => ({
        id: L.message_id * 1e3 + ae,
        filename: J.filename,
        file_url: J.file_url,
        content_type: J.content_type,
        file_size: J.file_size
      }))), e.value.push(V);
    } else L.shopify_output && typeof L.shopify_output == "object" && L.shopify_output.products ? e.value.push({
      message: L.message,
      // Keep the accompanying text message
      message_type: "product",
      // Use 'product' type for rendering
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: "",
      agent_name: L.agent_name,
      // Assign the whole structured object
      shopify_output: L.shopify_output,
      // Remove the old flattened fields (product_id, product_title, etc.)
      attributes: {
        // Keep other attributes if needed
        end_chat: L.end_chat,
        request_rating: L.request_rating
      }
    }) : e.value.push({
      message: L.message,
      message_type: "bot",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: "",
      agent_name: L.agent_name,
      stream: !0,
      // live reply → client-side typewriter reveal
      // Knowledge-base citations (display gated by show_citations in the widget)
      sources: Array.isArray(L.sources) && L.sources.length ? L.sources : void 0,
      attributes: {
        end_chat: L.end_chat,
        end_chat_reason: L.end_chat_reason,
        end_chat_description: L.end_chat_description,
        request_rating: L.request_rating
      }
    });
  }), D.on("handle_taken_over", (L) => {
    e.value.push({
      message: `${L.user_name} joined the conversation`,
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: L.session_id
    }), h.value = {
      ...h.value,
      human_agent_name: L.user_name,
      human_agent_profile_pic: L.profile_picture
    }, I(), Le && Le(L);
  }), D.on("session_initialized", (L) => {
    L.session_id && (v.value = L.session_id, Ke = {
      session_id: L.session_id,
      authenticated: !!L.authenticated,
      created: !!L.created
    }, ve == null || ve(Ke));
  }), D.on("error", Ct), D.on("chat_history", Rt), D.on("rating_submitted", Mt), D.on("display_form", Gt), D.on("form_submitted", g), D.on("workflow_state", y), D.on("workflow_proceeded", E), D), Je = async () => {
    try {
      return D != null && D.connected && ue && ue === ye(Xe().conversation_token) ? (o.value = "connected", !0) : (o.value = "connecting", a.value = 0, I(), Z(), P = !1, Y.value = null, D && (D.removeAllListeners(), D.disconnect(), D = null), D = Se(""), new Promise((A) => {
        D == null || D.on("connect", () => {
          A(!0);
        }), D == null || D.on("connect_error", () => {
          (P || a.value >= l) && A(!1);
        });
      }));
    } catch (A) {
      return console.error("Socket initialization failed:", A), o.value = "failed", !1;
    }
  }, st = () => (D && D.disconnect(), Je()), St = (A) => {
    Le = A;
  }, Ce = (A) => {
    ve = A, Ke && A(Ke);
  }, yt = (A) => {
    _e = A;
  }, pt = (A) => {
    De = A;
  }, Ct = (A) => {
    I(), n.value = Ld(A), s.value = !0;
    const L = A == null ? void 0 : A.type;
    (L === "validation_error" || L === "upload_error") && e.value.length > 0 && e.value[e.value.length - 1].message_type === "user" && e.value.pop(), setTimeout(() => {
      s.value = !1, n.value = "";
    }, 5e3);
  }, Rt = (A) => {
    if (A.type === "chat_history" && Array.isArray(A.messages)) {
      const L = A.messages.map((V) => {
        var ae, we;
        const J = {
          message: V.message,
          message_type: V.message_type,
          created_at: V.created_at,
          session_id: "",
          agent_name: V.agent_name || "",
          user_name: V.user_name || "",
          attributes: V.attributes || {},
          attachments: V.attachments || []
          // Include attachments
        };
        return Array.isArray((ae = V.attributes) == null ? void 0 : ae.sources) && V.attributes.sources.length && (J.sources = V.attributes.sources), (we = V.attributes) != null && we.shopify_output && typeof V.attributes.shopify_output == "object" ? {
          ...J,
          message_type: "product",
          shopify_output: V.attributes.shopify_output
        } : J;
      });
      e.value = [
        ...L.filter(
          (V) => !e.value.some(
            (J) => J.message === V.message && J.created_at === V.created_at
          )
        ),
        ...e.value
      ];
    }
  }, Mt = (A) => {
    A.success && e.value.push({
      message: "Thank you for your feedback!",
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    });
  }, Gt = (A) => {
    var L;
    console.log("Form display handler in composable:", A), I(), c.value = A.form_data, console.log("Set currentForm in handleDisplayForm:", c.value), ((L = A.form_data) == null ? void 0 : L.form_full_screen) === !0 ? (console.log("Full screen form detected, triggering workflow state callback"), _e && _e({
      type: "form",
      form_data: A.form_data,
      session_id: A.session_id
    })) : e.value.push({
      message: "",
      message_type: "form",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: A.session_id,
      attributes: {
        form_data: A.form_data
      }
    });
  }, g = (A) => {
    console.log("Form submitted confirmation received, clearing currentForm"), c.value = null, A.success && console.log("Form submitted successfully");
  }, y = (A) => {
    console.log("Workflow state received in composable:", A), (A.type === "form" || A.type === "display_form") && (console.log("Setting currentForm from workflow state:", A.form_data), c.value = A.form_data), _e && _e(A);
  }, E = (A) => {
    console.log("Workflow proceeded in composable:", A), De && De(A);
  }, N = async (A, L) => {
    !D || !A || D.emit("submit_rating", {
      rating: A,
      feedback: L
    });
  }, $ = async (A) => {
    var J;
    if (console.log("Submitting form in socket:", A), console.log("Current form in socket:", c.value), console.log("Socket in socket:", D), !D) {
      console.error("No socket available for form submission");
      return;
    }
    if (!A || Object.keys(A).length === 0) {
      console.error("No form data to submit");
      return;
    }
    const V = ((J = c.value) == null ? void 0 : J.form_type) === "contact" ? "submit_contact_info" : "submit_form";
    console.log(`Emitting ${V} event with data:`, A), D.emit(V, {
      form_data: A
    }), c.value = null;
  }, O = async () => {
    D && (console.log("Getting workflow state 12"), D.emit("get_workflow_state"));
  }, G = async () => {
    D && D.emit("proceed_workflow", {});
  }, q = async (A, L, V = []) => {
    if (!D || !A.trim() && V.length === 0) return;
    const J = {
      message: A,
      message_type: "user",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    };
    V.length > 0 && (J.attachments = V.map((ae, we) => {
      let Ae = "";
      if (ae.content_type.startsWith("image/")) {
        const Pe = atob(ae.content), f = new Array(Pe.length);
        for (let T = 0; T < Pe.length; T++)
          f[T] = Pe.charCodeAt(T);
        const _ = new Uint8Array(f), M = new Blob([_], { type: ae.content_type });
        Ae = URL.createObjectURL(M);
      }
      return {
        id: Date.now() * 1e3 + we,
        // Temporary ID
        filename: ae.filename,
        file_url: Ae,
        // Temporary blob URL, will be replaced
        content_type: ae.content_type,
        file_size: ae.size,
        _isTemporary: !0
        // Flag to identify temporary attachments
      };
    })), e.value.push(J), D.emit("chat", {
      message: A,
      email: L,
      files: V
      // Send files with base64 content
    }), i.value = !0;
  }, W = () => {
    e.value = [], i.value = !1, v.value = "", I(), c.value = null;
  };
  return {
    messages: e,
    loading: t,
    errorMessage: n,
    showError: s,
    loadingHistory: r,
    hasStartedChat: i,
    connectionStatus: o,
    sendMessage: q,
    endChat: (A = "CUSTOMER_REQUEST") => new Promise((L) => {
      if (!D || !D.connected) {
        L(!1);
        return;
      }
      let V = !1;
      const J = (Pe) => {
        V || (V = !0, clearTimeout(Ae), D == null || D.off("chat_ended", ae), D == null || D.off("error", we), Pe && W(), L(Pe));
      }, ae = () => J(!0), we = (Pe) => {
        (Pe == null ? void 0 : Pe.type) === "end_chat_error" && J(!1);
      }, Ae = setTimeout(() => J(!1), Fg);
      D.on("chat_ended", ae), D.on("error", we), D.emit("end_chat", { reason: A });
    }),
    loadChatHistory: async () => {
      if (D)
        try {
          r.value = !0, D.emit("get_chat_history");
        } catch (A) {
          console.error("Failed to load chat history:", A);
        } finally {
          r.value = !1;
        }
    },
    connect: Je,
    reconnect: st,
    cleanup: () => {
      I(), Z(), D && (D.removeAllListeners(), D.disconnect(), D = null), Le = null, _e = null, De = null;
    },
    humanAgent: h,
    onTakeover: St,
    onSessionState: Ce,
    refusal: Y,
    submitRating: N,
    currentForm: c,
    submitForm: $,
    getWorkflowState: O,
    proceedWorkflow: G,
    onWorkflowState: yt,
    onWorkflowProceeded: pt,
    currentSessionId: v,
    setToken: ge,
    setWidgetId: nt
  };
}
function Bg(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Co = { exports: {} }, ic;
function Ug() {
  return ic || (ic = 1, function(e) {
    (function() {
      function t(f, _, M) {
        return f.call.apply(f.bind, arguments);
      }
      function n(f, _, M) {
        if (!f) throw Error();
        if (2 < arguments.length) {
          var T = Array.prototype.slice.call(arguments, 2);
          return function() {
            var H = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(H, T), f.apply(_, H);
          };
        }
        return function() {
          return f.apply(_, arguments);
        };
      }
      function s(f, _, M) {
        return s = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? t : n, s.apply(null, arguments);
      }
      var r = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function i(f, _) {
        this.a = f, this.o = _ || f, this.c = this.o.document;
      }
      var o = !!window.FontFace;
      function a(f, _, M, T) {
        if (_ = f.c.createElement(_), M) for (var H in M) M.hasOwnProperty(H) && (H == "style" ? _.style.cssText = M[H] : _.setAttribute(H, M[H]));
        return T && _.appendChild(f.c.createTextNode(T)), _;
      }
      function l(f, _, M) {
        f = f.c.getElementsByTagName(_)[0], f || (f = document.documentElement), f.insertBefore(M, f.lastChild);
      }
      function h(f) {
        f.parentNode && f.parentNode.removeChild(f);
      }
      function c(f, _, M) {
        _ = _ || [], M = M || [];
        for (var T = f.className.split(/\s+/), H = 0; H < _.length; H += 1) {
          for (var ne = !1, ee = 0; ee < T.length; ee += 1) if (_[H] === T[ee]) {
            ne = !0;
            break;
          }
          ne || T.push(_[H]);
        }
        for (_ = [], H = 0; H < T.length; H += 1) {
          for (ne = !1, ee = 0; ee < M.length; ee += 1) if (T[H] === M[ee]) {
            ne = !0;
            break;
          }
          ne || _.push(T[H]);
        }
        f.className = _.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function v(f, _) {
        for (var M = f.className.split(/\s+/), T = 0, H = M.length; T < H; T++) if (M[T] == _) return !0;
        return !1;
      }
      function w(f) {
        return f.o.location.hostname || f.a.location.hostname;
      }
      function z(f, _, M) {
        function T() {
          Re && H && ne && (Re(ee), Re = null);
        }
        _ = a(f, "link", { rel: "stylesheet", href: _, media: "all" });
        var H = !1, ne = !0, ee = null, Re = M || null;
        o ? (_.onload = function() {
          H = !0, T();
        }, _.onerror = function() {
          H = !0, ee = Error("Stylesheet failed to load"), T();
        }) : setTimeout(function() {
          H = !0, T();
        }, 0), l(f, "head", _);
      }
      function I(f, _, M, T) {
        var H = f.c.getElementsByTagName("head")[0];
        if (H) {
          var ne = a(f, "script", { src: _ }), ee = !1;
          return ne.onload = ne.onreadystatechange = function() {
            ee || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (ee = !0, M && M(null), ne.onload = ne.onreadystatechange = null, ne.parentNode.tagName == "HEAD" && H.removeChild(ne));
          }, H.appendChild(ne), setTimeout(function() {
            ee || (ee = !0, M && M(Error("Script load timeout")));
          }, T || 5e3), ne;
        }
        return null;
      }
      function K() {
        this.a = 0, this.c = null;
      }
      function D(f) {
        return f.a++, function() {
          f.a--, fe(f);
        };
      }
      function oe(f, _) {
        f.c = _, fe(f);
      }
      function fe(f) {
        f.a == 0 && f.c && (f.c(), f.c = null);
      }
      function pe(f) {
        this.a = f || "-";
      }
      pe.prototype.c = function(f) {
        for (var _ = [], M = 0; M < arguments.length; M++) _.push(arguments[M].replace(/[\W_]+/g, "").toLowerCase());
        return _.join(this.a);
      };
      function C(f, _) {
        this.c = f, this.f = 4, this.a = "n";
        var M = (_ || "n4").match(/^([nio])([1-9])$/i);
        M && (this.a = M[1], this.f = parseInt(M[2], 10));
      }
      function P(f) {
        return Te(f) + " " + (f.f + "00") + " 300px " + Y(f.c);
      }
      function Y(f) {
        var _ = [];
        f = f.split(/,\s*/);
        for (var M = 0; M < f.length; M++) {
          var T = f[M].replace(/['"]/g, "");
          T.indexOf(" ") != -1 || /^\d/.test(T) ? _.push("'" + T + "'") : _.push(T);
        }
        return _.join(",");
      }
      function Z(f) {
        return f.a + f.f;
      }
      function Te(f) {
        var _ = "normal";
        return f.a === "o" ? _ = "oblique" : f.a === "i" && (_ = "italic"), _;
      }
      function Le(f) {
        var _ = 4, M = "n", T = null;
        return f && ((T = f.match(/(normal|oblique|italic)/i)) && T[1] && (M = T[1].substr(0, 1).toLowerCase()), (T = f.match(/([1-9]00|normal|bold)/i)) && T[1] && (/bold/i.test(T[1]) ? _ = 7 : /[1-9]00/.test(T[1]) && (_ = parseInt(T[1].substr(0, 1), 10)))), M + _;
      }
      function _e(f, _) {
        this.c = f, this.f = f.o.document.documentElement, this.h = _, this.a = new pe("-"), this.j = _.events !== !1, this.g = _.classes !== !1;
      }
      function De(f) {
        f.g && c(f.f, [f.a.c("wf", "loading")]), Ke(f, "loading");
      }
      function ve(f) {
        if (f.g) {
          var _ = v(f.f, f.a.c("wf", "active")), M = [], T = [f.a.c("wf", "loading")];
          _ || M.push(f.a.c("wf", "inactive")), c(f.f, M, T);
        }
        Ke(f, "inactive");
      }
      function Ke(f, _, M) {
        f.j && f.h[_] && (M ? f.h[_](M.c, Z(M)) : f.h[_]());
      }
      function Ge() {
        this.c = {};
      }
      function at(f, _, M) {
        var T = [], H;
        for (H in _) if (_.hasOwnProperty(H)) {
          var ne = f.c[H];
          ne && T.push(ne(_[H], M));
        }
        return T;
      }
      function ue(f, _) {
        this.c = f, this.f = _, this.a = a(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function ye(f) {
        l(f.c, "body", f.a);
      }
      function ge(f) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + Y(f.c) + ";" + ("font-style:" + Te(f) + ";font-weight:" + (f.f + "00") + ";");
      }
      function nt(f, _, M, T, H, ne) {
        this.g = f, this.j = _, this.a = T, this.c = M, this.f = H || 3e3, this.h = ne || void 0;
      }
      nt.prototype.start = function() {
        var f = this.c.o.document, _ = this, M = r(), T = new Promise(function(ee, Re) {
          function Ie() {
            r() - M >= _.f ? Re() : f.fonts.load(P(_.a), _.h).then(function(Ee) {
              1 <= Ee.length ? ee() : setTimeout(Ie, 25);
            }, function() {
              Re();
            });
          }
          Ie();
        }), H = null, ne = new Promise(function(ee, Re) {
          H = setTimeout(Re, _.f);
        });
        Promise.race([ne, T]).then(function() {
          H && (clearTimeout(H), H = null), _.g(_.a);
        }, function() {
          _.j(_.a);
        });
      };
      function Xe(f, _, M, T, H, ne, ee) {
        this.v = f, this.B = _, this.c = M, this.a = T, this.s = ee || "BESbswy", this.f = {}, this.w = H || 3e3, this.u = ne || null, this.m = this.j = this.h = this.g = null, this.g = new ue(this.c, this.s), this.h = new ue(this.c, this.s), this.j = new ue(this.c, this.s), this.m = new ue(this.c, this.s), f = new C(this.a.c + ",serif", Z(this.a)), f = ge(f), this.g.a.style.cssText = f, f = new C(this.a.c + ",sans-serif", Z(this.a)), f = ge(f), this.h.a.style.cssText = f, f = new C("serif", Z(this.a)), f = ge(f), this.j.a.style.cssText = f, f = new C("sans-serif", Z(this.a)), f = ge(f), this.m.a.style.cssText = f, ye(this.g), ye(this.h), ye(this.j), ye(this.m);
      }
      var Se = { D: "serif", C: "sans-serif" }, Je = null;
      function st() {
        if (Je === null) {
          var f = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          Je = !!f && (536 > parseInt(f[1], 10) || parseInt(f[1], 10) === 536 && 11 >= parseInt(f[2], 10));
        }
        return Je;
      }
      Xe.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = r(), Ce(this);
      };
      function St(f, _, M) {
        for (var T in Se) if (Se.hasOwnProperty(T) && _ === f.f[Se[T]] && M === f.f[Se[T]]) return !0;
        return !1;
      }
      function Ce(f) {
        var _ = f.g.a.offsetWidth, M = f.h.a.offsetWidth, T;
        (T = _ === f.f.serif && M === f.f["sans-serif"]) || (T = st() && St(f, _, M)), T ? r() - f.A >= f.w ? st() && St(f, _, M) && (f.u === null || f.u.hasOwnProperty(f.a.c)) ? pt(f, f.v) : pt(f, f.B) : yt(f) : pt(f, f.v);
      }
      function yt(f) {
        setTimeout(s(function() {
          Ce(this);
        }, f), 50);
      }
      function pt(f, _) {
        setTimeout(s(function() {
          h(this.g.a), h(this.h.a), h(this.j.a), h(this.m.a), _(this.a);
        }, f), 0);
      }
      function Ct(f, _, M) {
        this.c = f, this.a = _, this.f = 0, this.m = this.j = !1, this.s = M;
      }
      var Rt = null;
      Ct.prototype.g = function(f) {
        var _ = this.a;
        _.g && c(_.f, [_.a.c("wf", f.c, Z(f).toString(), "active")], [_.a.c("wf", f.c, Z(f).toString(), "loading"), _.a.c("wf", f.c, Z(f).toString(), "inactive")]), Ke(_, "fontactive", f), this.m = !0, Mt(this);
      }, Ct.prototype.h = function(f) {
        var _ = this.a;
        if (_.g) {
          var M = v(_.f, _.a.c("wf", f.c, Z(f).toString(), "active")), T = [], H = [_.a.c("wf", f.c, Z(f).toString(), "loading")];
          M || T.push(_.a.c("wf", f.c, Z(f).toString(), "inactive")), c(_.f, T, H);
        }
        Ke(_, "fontinactive", f), Mt(this);
      };
      function Mt(f) {
        --f.f == 0 && f.j && (f.m ? (f = f.a, f.g && c(f.f, [f.a.c("wf", "active")], [f.a.c("wf", "loading"), f.a.c("wf", "inactive")]), Ke(f, "active")) : ve(f.a));
      }
      function Gt(f) {
        this.j = f, this.a = new Ge(), this.h = 0, this.f = this.g = !0;
      }
      Gt.prototype.load = function(f) {
        this.c = new i(this.j, f.context || this.j), this.g = f.events !== !1, this.f = f.classes !== !1, y(this, new _e(this.c, f), f);
      };
      function g(f, _, M, T, H) {
        var ne = --f.h == 0;
        (f.f || f.g) && setTimeout(function() {
          var ee = H || null, Re = T || null || {};
          if (M.length === 0 && ne) ve(_.a);
          else {
            _.f += M.length, ne && (_.j = ne);
            var Ie, Ee = [];
            for (Ie = 0; Ie < M.length; Ie++) {
              var Be = M[Ie], Ze = Re[Be.c], wt = _.a, rn = Be;
              if (wt.g && c(wt.f, [wt.a.c("wf", rn.c, Z(rn).toString(), "loading")]), Ke(wt, "fontloading", rn), wt = null, Rt === null) if (window.FontFace) {
                var rn = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), kn = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                Rt = rn ? 42 < parseInt(rn[1], 10) : !kn;
              } else Rt = !1;
              Rt ? wt = new nt(s(_.g, _), s(_.h, _), _.c, Be, _.s, Ze) : wt = new Xe(s(_.g, _), s(_.h, _), _.c, Be, _.s, ee, Ze), Ee.push(wt);
            }
            for (Ie = 0; Ie < Ee.length; Ie++) Ee[Ie].start();
          }
        }, 0);
      }
      function y(f, _, M) {
        var H = [], T = M.timeout;
        De(_);
        var H = at(f.a, M, f.c), ne = new Ct(f.c, _, T);
        for (f.h = H.length, _ = 0, M = H.length; _ < M; _++) H[_].load(function(ee, Re, Ie) {
          g(f, ne, ee, Re, Ie);
        });
      }
      function E(f, _) {
        this.c = f, this.a = _;
      }
      E.prototype.load = function(f) {
        function _() {
          if (ne["__mti_fntLst" + T]) {
            var ee = ne["__mti_fntLst" + T](), Re = [], Ie;
            if (ee) for (var Ee = 0; Ee < ee.length; Ee++) {
              var Be = ee[Ee].fontfamily;
              ee[Ee].fontStyle != null && ee[Ee].fontWeight != null ? (Ie = ee[Ee].fontStyle + ee[Ee].fontWeight, Re.push(new C(Be, Ie))) : Re.push(new C(Be));
            }
            f(Re);
          } else setTimeout(function() {
            _();
          }, 50);
        }
        var M = this, T = M.a.projectId, H = M.a.version;
        if (T) {
          var ne = M.c.o;
          I(this.c, (M.a.api || "https://fast.fonts.net/jsapi") + "/" + T + ".js" + (H ? "?v=" + H : ""), function(ee) {
            ee ? f([]) : (ne["__MonotypeConfiguration__" + T] = function() {
              return M.a;
            }, _());
          }).id = "__MonotypeAPIScript__" + T;
        } else f([]);
      };
      function N(f, _) {
        this.c = f, this.a = _;
      }
      N.prototype.load = function(f) {
        var _, M, T = this.a.urls || [], H = this.a.families || [], ne = this.a.testStrings || {}, ee = new K();
        for (_ = 0, M = T.length; _ < M; _++) z(this.c, T[_], D(ee));
        var Re = [];
        for (_ = 0, M = H.length; _ < M; _++) if (T = H[_].split(":"), T[1]) for (var Ie = T[1].split(","), Ee = 0; Ee < Ie.length; Ee += 1) Re.push(new C(T[0], Ie[Ee]));
        else Re.push(new C(T[0]));
        oe(ee, function() {
          f(Re, ne);
        });
      };
      function $(f, _) {
        f ? this.c = f : this.c = O, this.a = [], this.f = [], this.g = _ || "";
      }
      var O = "https://fonts.googleapis.com/css";
      function G(f, _) {
        for (var M = _.length, T = 0; T < M; T++) {
          var H = _[T].split(":");
          H.length == 3 && f.f.push(H.pop());
          var ne = "";
          H.length == 2 && H[1] != "" && (ne = ":"), f.a.push(H.join(ne));
        }
      }
      function q(f) {
        if (f.a.length == 0) throw Error("No fonts to load!");
        if (f.c.indexOf("kit=") != -1) return f.c;
        for (var _ = f.a.length, M = [], T = 0; T < _; T++) M.push(f.a[T].replace(/ /g, "+"));
        return _ = f.c + "?family=" + M.join("%7C"), 0 < f.f.length && (_ += "&subset=" + f.f.join(",")), 0 < f.g.length && (_ += "&text=" + encodeURIComponent(f.g)), _;
      }
      function W(f) {
        this.f = f, this.a = [], this.c = {};
      }
      var U = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, te = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, X = { i: "i", italic: "i", n: "n", normal: "n" }, A = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function L(f) {
        for (var _ = f.f.length, M = 0; M < _; M++) {
          var T = f.f[M].split(":"), H = T[0].replace(/\+/g, " "), ne = ["n4"];
          if (2 <= T.length) {
            var ee, Re = T[1];
            if (ee = [], Re) for (var Re = Re.split(","), Ie = Re.length, Ee = 0; Ee < Ie; Ee++) {
              var Be;
              if (Be = Re[Ee], Be.match(/^[\w-]+$/)) {
                var Ze = A.exec(Be.toLowerCase());
                if (Ze == null) Be = "";
                else {
                  if (Be = Ze[2], Be = Be == null || Be == "" ? "n" : X[Be], Ze = Ze[1], Ze == null || Ze == "") Ze = "4";
                  else var wt = te[Ze], Ze = wt || (isNaN(Ze) ? "4" : Ze.substr(0, 1));
                  Be = [Be, Ze].join("");
                }
              } else Be = "";
              Be && ee.push(Be);
            }
            0 < ee.length && (ne = ee), T.length == 3 && (T = T[2], ee = [], T = T ? T.split(",") : ee, 0 < T.length && (T = U[T[0]]) && (f.c[H] = T));
          }
          for (f.c[H] || (T = U[H]) && (f.c[H] = T), T = 0; T < ne.length; T += 1) f.a.push(new C(H, ne[T]));
        }
      }
      function V(f, _) {
        this.c = f, this.a = _;
      }
      var J = { Arimo: !0, Cousine: !0, Tinos: !0 };
      V.prototype.load = function(f) {
        var _ = new K(), M = this.c, T = new $(this.a.api, this.a.text), H = this.a.families;
        G(T, H);
        var ne = new W(H);
        L(ne), z(M, q(T), D(_)), oe(_, function() {
          f(ne.a, ne.c, J);
        });
      };
      function ae(f, _) {
        this.c = f, this.a = _;
      }
      ae.prototype.load = function(f) {
        var _ = this.a.id, M = this.c.o;
        _ ? I(this.c, (this.a.api || "https://use.typekit.net") + "/" + _ + ".js", function(T) {
          if (T) f([]);
          else if (M.Typekit && M.Typekit.config && M.Typekit.config.fn) {
            T = M.Typekit.config.fn;
            for (var H = [], ne = 0; ne < T.length; ne += 2) for (var ee = T[ne], Re = T[ne + 1], Ie = 0; Ie < Re.length; Ie++) H.push(new C(ee, Re[Ie]));
            try {
              M.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            f(H);
          }
        }, 2e3) : f([]);
      };
      function we(f, _) {
        this.c = f, this.f = _, this.a = [];
      }
      we.prototype.load = function(f) {
        var _ = this.f.id, M = this.c.o, T = this;
        _ ? (M.__webfontfontdeckmodule__ || (M.__webfontfontdeckmodule__ = {}), M.__webfontfontdeckmodule__[_] = function(H, ne) {
          for (var ee = 0, Re = ne.fonts.length; ee < Re; ++ee) {
            var Ie = ne.fonts[ee];
            T.a.push(new C(Ie.name, Le("font-weight:" + Ie.weight + ";font-style:" + Ie.style)));
          }
          f(T.a);
        }, I(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + w(this.c) + "/" + _ + ".js", function(H) {
          H && f([]);
        })) : f([]);
      };
      var Ae = new Gt(window);
      Ae.a.c.custom = function(f, _) {
        return new N(_, f);
      }, Ae.a.c.fontdeck = function(f, _) {
        return new we(_, f);
      }, Ae.a.c.monotype = function(f, _) {
        return new E(_, f);
      }, Ae.a.c.typekit = function(f, _) {
        return new ae(_, f);
      }, Ae.a.c.google = function(f, _) {
        return new V(_, f);
      };
      var Pe = { load: s(Ae.load, Ae) };
      e.exports ? e.exports = Pe : (window.WebFont = Pe, window.WebFontConfig && Ae.load(window.WebFontConfig));
    })();
  }(Co)), Co.exports;
}
var zg = Ug();
const Hg = /* @__PURE__ */ Bg(zg), oc = [
  "Space Grotesk:400,500,600,700",
  "Instrument Sans:400,500,600",
  "JetBrains Mono:400,500,600"
], qg = (e) => {
  const t = [...oc], n = (e == null ? void 0 : e.split(",")[0].trim().replace(/['"]/g, "")) || "", s = oc.some(
    (r) => r.toLowerCase().startsWith(n.toLowerCase())
  );
  n && !s && t.push(n), Hg.load({
    google: { families: t },
    active: () => {
      if (!e) return;
      const r = document.querySelector(".chat-container");
      r && (r.style.fontFamily = e.includes(",") ? e : `"${e}", system-ui, sans-serif`);
    }
  });
};
function Wg() {
  const e = ce({}), t = ce(""), n = (r) => {
    var i;
    e.value = r, r.photo_url && (e.value.photo_url = r.photo_url), qg(r.font_family), Xn({
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
const jg = 13, Vg = 24;
function Kg(e, t) {
  const n = Fi({}), s = [];
  let r = null;
  const i = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, o = (c) => {
    r || s.length === 0 || (r = setTimeout(a, c));
  }, a = () => {
    r = null;
    const c = s[0];
    if (c === void 0) return;
    const v = e.value[c], w = n[c], z = (v == null ? void 0 : v.message) ?? "";
    if (!w || !v) {
      s.shift(), o(0);
      return;
    }
    if (w.shown >= z.length) {
      w.done = !0, s.shift(), o(0);
      return;
    }
    w.shown += 1;
    const I = z[w.shown - 1];
    t == null || t(), o(I === " " ? Vg : jg);
  };
  Ft(() => e.value.length, (c, v) => {
    v !== void 0 && c < v && (Object.keys(n).forEach((w) => {
      delete n[Number(w)];
    }), s.length = 0);
    for (let w = v ?? 0; w < c; w++) {
      const z = e.value[w];
      if (!z || !z.stream || w in n) continue;
      const I = z.message ?? "";
      i || !I ? n[w] = { shown: I.length, done: !0 } : (n[w] = { shown: 0, done: !1 }, s.push(w));
    }
    o(0);
  });
  const l = (c, v) => {
    const w = n[c];
    return w ? v.slice(0, w.shown) : v;
  }, h = (c) => {
    const v = n[c];
    return !!v && !v.done;
  };
  return Mr(() => {
    r && clearTimeout(r);
  }), { displayText: l, isStreaming: h };
}
function Gg(e) {
  const t = ce(!0);
  let n = 0;
  const s = () => {
    Xn({ type: "UNREAD_COUNT", count: n });
  }, r = (i) => {
    var o;
    ((o = i == null ? void 0 : i.data) == null ? void 0 : o.type) === "WIDGET_VISIBILITY" && (t.value = !!i.data.open, t.value && n !== 0 && (n = 0, s()));
  };
  Ft(() => e.value.length, (i, o) => {
    if (i <= (o ?? 0) || t.value) return;
    const a = e.value[i - 1];
    a && (a.message_type === "bot" || a.message_type === "agent") && (n += 1, s());
  }), Ui(() => window.addEventListener("message", r)), Mr(() => window.removeEventListener("message", r));
}
const Yg = {
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
}, Xg = {
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
}, Zg = {
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
}, Jg = {
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
}, Qg = {
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
}, yi = {
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
}, e_ = {
  GLASS: Yg,
  AURORA: Xg,
  TERMINAL: Zg,
  CALM_MINT: Jg,
  PLAYFUL: Qg,
  SUNRISE: yi,
  CHATBOT: yi,
  ASK_ANYTHING: yi
}, t_ = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", ac = "'Instrument Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";
function n_(e) {
  return Math.max(4, Math.round(e * 0.3));
}
function lc(e) {
  const t = (e || "").replace("#", "");
  if (t.length < 6) return "#0B0C10";
  const n = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), r = parseInt(t.slice(4, 6), 16);
  return (0.299 * n + 0.587 * s + 0.114 * r) / 255 > 0.62 ? "#0B0C10" : "#FFFFFF";
}
function s_(e) {
  return e_[e || ""] || yi;
}
const r_ = "#212529";
function i_(e, t) {
  const n = s_(e), s = (t == null ? void 0 : t.chat_background_color) || "", r = /^#[0-9a-fA-F]{6}$/.test(s), i = s || n.card, o = (t == null ? void 0 : t.chat_text_color) || "", l = /^#[0-9a-fA-F]{6}$/.test(o) && o.toLowerCase() !== r_ ? o : r ? Bs(s) ? "#FFFFFF" : "#111111" : n.text, h = r ? Bs(s) ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.62)" : n.muted, c = r ? Id(s, 20) : n.agentBg, v = (t == null ? void 0 : t.accent_color) || n.accent, w = r ? !Bs(s) : n.light, z = lc(v) === "#0B0C10", I = w === z ? h : v, K = n.mono ? t_ : t != null && t.font_family ? `${t.font_family}, ${ac}` : ac;
  return {
    "--cm-card": i,
    "--cm-text": l,
    "--cm-muted": h,
    "--cm-agent-bg": c,
    "--cm-accent": v,
    "--cm-on-accent": lc(v),
    "--cm-presence": I,
    "--cm-border": n.border,
    "--cm-glow": n.glow,
    "--cm-radius": `${n.radius}px`,
    "--cm-bubble": `${n.bubble}px`,
    "--cm-bubble-tail": `${n_(n.bubble)}px`,
    "--cm-field-radius": n.mono ? "7px" : "12px",
    "--cm-avatar-radius": n.mono ? "28%" : "50%",
    "--cm-hairline": n.light ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.08)",
    "--cm-body-font": K
  };
}
const cc = (e) => {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: e || "USD" }).resolvedOptions().maximumFractionDigits ?? 2;
  } catch {
    return 2;
  }
};
function o_() {
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
        minimumFractionDigits: cc(r),
        maximumFractionDigits: cc(r)
      }) : String(s);
      return i ? `${i}${a}` : a;
    },
    getCurrencySymbol: (s) => e[s] || s,
    currencySymbols: e
  };
}
const a_ = {
  key: 0,
  class: "widget-unavailable-overlay"
}, l_ = {
  key: 1,
  class: "auth-error-overlay"
}, c_ = { class: "auth-error-card" }, u_ = { class: "auth-error-message" }, f_ = {
  key: 0,
  class: "initializing-overlay"
}, h_ = {
  key: 0,
  class: "connecting-message"
}, d_ = {
  key: 1,
  class: "failed-message"
}, p_ = { class: "welcome-content" }, m_ = { class: "welcome-header" }, g_ = ["src", "alt"], __ = { class: "welcome-title" }, y_ = { class: "welcome-subtitle" }, b_ = { class: "welcome-input-container" }, v_ = {
  key: 0,
  class: "email-input"
}, w_ = ["disabled"], k_ = { class: "welcome-message-input" }, T_ = ["placeholder", "disabled"], x_ = ["disabled"], S_ = {
  key: 0,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, A_ = {
  key: 1,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, E_ = { class: "landing-page-content" }, C_ = { class: "landing-page-header" }, R_ = { class: "landing-page-heading" }, I_ = { class: "landing-page-text" }, L_ = { class: "landing-page-actions" }, O_ = { class: "form-fullscreen-content" }, N_ = {
  key: 0,
  class: "form-header"
}, P_ = {
  key: 0,
  class: "form-title"
}, M_ = {
  key: 1,
  class: "form-description"
}, D_ = { class: "form-fields" }, F_ = ["for"], $_ = {
  key: 0,
  class: "required-indicator"
}, B_ = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "autocomplete", "inputmode"], U_ = ["id", "placeholder", "required", "min", "max", "value", "onInput"], z_ = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput"], H_ = ["id", "required", "value", "onChange"], q_ = { value: "" }, W_ = ["value"], j_ = {
  key: 4,
  class: "checkbox-field"
}, V_ = ["id", "required", "checked", "onChange"], K_ = { class: "checkbox-label" }, G_ = {
  key: 5,
  class: "radio-group"
}, Y_ = ["name", "value", "required", "checked", "onChange"], X_ = { class: "radio-label" }, Z_ = {
  key: 6,
  class: "field-error"
}, J_ = { class: "form-actions" }, Q_ = ["disabled"], ey = {
  key: 0,
  class: "loading-spinner-inline"
}, ty = { key: 1 }, ny = { class: "header-content" }, sy = ["src", "alt"], ry = { class: "header-info" }, iy = { class: "status" }, oy = { class: "status-text cm-presence" }, ay = { class: "header-actions" }, ly = ["disabled", "title", "aria-label", "aria-expanded"], cy = { class: "ask-anything-header" }, uy = ["src", "alt"], fy = { class: "header-info" }, hy = {
  key: 2,
  class: "loading-history"
}, dy = { class: "cm-email-gate-title" }, py = ["disabled"], my = {
  key: 0,
  class: "cm-email-gate-error"
}, gy = ["disabled"], _y = {
  key: 0,
  class: "cm-welcome-block"
}, yy = { class: "message agent-message cm-welcome-row" }, by = ["src", "alt"], vy = {
  key: 0,
  class: "cm-msg-avatar",
  "aria-hidden": "true"
}, wy = ["src"], ky = ["src"], Ty = { class: "message-col" }, xy = {
  key: 0,
  class: "rating-content"
}, Sy = { class: "rating-prompt" }, Ay = ["onMouseover", "onMouseleave", "onClick", "disabled"], Ey = {
  key: 0,
  class: "feedback-wrapper"
}, Cy = { class: "feedback-section" }, Ry = ["onUpdate:modelValue", "disabled"], Iy = { class: "feedback-counter" }, Ly = ["onClick", "disabled"], Oy = {
  key: 1,
  class: "submitted-feedback-wrapper"
}, Ny = { class: "submitted-feedback" }, Py = { class: "submitted-feedback-text" }, My = {
  key: 2,
  class: "submitted-message"
}, Dy = {
  key: 1,
  class: "form-content"
}, Fy = {
  key: 0,
  class: "form-header"
}, $y = {
  key: 0,
  class: "form-title"
}, By = {
  key: 1,
  class: "form-description"
}, Uy = { class: "form-fields" }, zy = ["for"], Hy = {
  key: 0,
  class: "required-indicator"
}, qy = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "disabled", "autocomplete", "inputmode"], Wy = ["id", "placeholder", "required", "min", "max", "value", "onInput", "disabled"], jy = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "disabled"], Vy = ["id", "required", "value", "onChange", "disabled"], Ky = { value: "" }, Gy = ["value"], Yy = {
  key: 4,
  class: "checkbox-field"
}, Xy = ["id", "checked", "onChange", "disabled"], Zy = ["for"], Jy = {
  key: 5,
  class: "radio-field"
}, Qy = ["id", "name", "value", "checked", "onChange", "disabled"], eb = ["for"], tb = {
  key: 6,
  class: "field-error"
}, nb = { class: "form-actions" }, sb = ["onClick", "disabled"], rb = {
  key: 2,
  class: "user-input-content"
}, ib = {
  key: 0,
  class: "user-input-prompt"
}, ob = {
  key: 1,
  class: "user-input-form"
}, ab = ["onUpdate:modelValue", "onKeydown"], lb = ["onClick", "disabled"], cb = {
  key: 2,
  class: "user-input-submitted"
}, ub = {
  key: 0,
  class: "user-input-confirmation"
}, fb = {
  key: 3,
  class: "product-message-container"
}, hb = ["innerHTML"], db = {
  key: 1,
  class: "products-carousel"
}, pb = { class: "carousel-items" }, mb = {
  key: 0,
  class: "product-image-compact"
}, gb = ["src", "alt"], _b = { class: "product-info-compact" }, yb = { class: "product-text-area" }, bb = { class: "product-title-compact" }, vb = {
  key: 0,
  class: "product-variant-compact"
}, wb = { class: "product-price-compact" }, kb = { class: "product-actions-compact" }, Tb = ["onClick"], xb = {
  key: 2,
  class: "no-products-message"
}, Sb = {
  key: 3,
  class: "no-products-message"
}, Ab = ["innerHTML"], Eb = ["innerHTML"], Cb = {
  key: 2,
  class: "message-attachments"
}, Rb = {
  key: 0,
  class: "attachment-image-container"
}, Ib = ["src", "alt", "onClick"], Lb = { class: "attachment-image-info" }, Ob = ["href"], Nb = { class: "attachment-size" }, Pb = ["href"], Mb = { class: "attachment-size" }, Db = {
  key: 0,
  class: "citation-chips"
}, Fb = ["title"], $b = { class: "message-info" }, Bb = {
  key: 0,
  class: "agent-name"
}, Ub = {
  key: 5,
  class: "cm-quick-actions-bar"
}, zb = ["disabled", "onClick"], Hb = {
  key: 0,
  class: "file-previews-widget"
}, qb = {
  class: "file-preview-content-widget",
  style: { cursor: "pointer" }
}, Wb = ["src", "alt", "onClick"], jb = ["onClick"], Vb = { class: "file-preview-info-widget" }, Kb = { class: "file-preview-name-widget" }, Gb = { class: "file-preview-size-widget" }, Yb = ["onClick"], Xb = {
  key: 1,
  class: "upload-progress-widget"
}, Zb = { class: "message-input" }, Jb = ["placeholder", "disabled"], Qb = ["disabled", "title"], ev = ["disabled"], tv = {
  key: 7,
  class: "new-conversation-section"
}, nv = { class: "conversation-ended-message" }, sv = {
  key: 8,
  class: "ai-disclaimer"
}, rv = {
  key: 8,
  class: "rating-dialog"
}, iv = { class: "rating-content" }, ov = { class: "star-rating" }, av = ["onClick"], lv = { class: "rating-actions" }, cv = ["disabled"], uv = {
  key: 0,
  class: "preview-modal-image-container"
}, fv = ["src", "alt"], hv = { class: "preview-modal-filename" }, dv = {
  key: 3,
  class: "widget-loading"
}, uc = 3, pv = "image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx,.xls", mv = /* @__PURE__ */ fa({
  __name: "WidgetBuilder",
  props: {
    widgetId: {},
    token: {},
    initialAuthError: {}
  },
  setup(e) {
    const t = e, n = de(() => {
      var p;
      return t.widgetId || ((p = window.__INITIAL_DATA__) == null ? void 0 : p.widgetId);
    }), {
      customization: s,
      agentName: r,
      applyCustomization: i,
      initializeFromData: o
    } = Wg(), { formatCurrency: a } = o_(), {
      messages: l,
      loading: h,
      errorMessage: c,
      showError: v,
      loadingHistory: w,
      hasStartedChat: z,
      connectionStatus: I,
      sendMessage: K,
      endChat: D,
      loadChatHistory: oe,
      connect: fe,
      reconnect: pe,
      cleanup: C,
      humanAgent: P,
      onTakeover: Y,
      refusal: Z,
      submitRating: Te,
      submitForm: Le,
      currentForm: _e,
      getWorkflowState: De,
      proceedWorkflow: ve,
      onWorkflowState: Ke,
      onWorkflowProceeded: Ge,
      currentSessionId: at,
      setToken: ue,
      setWidgetId: ye,
      onSessionState: ge
    } = $g(), { displayText: nt, isStreaming: Xe } = Kg(l, () => ys(() => zn()));
    Gg(l);
    const Se = ce(""), Je = ce(!0), st = ce(""), St = ce(!1), Ce = (p) => {
      const m = p.target;
      Se.value = m.value;
    };
    let yt = null;
    const pt = () => {
      yt && yt.disconnect(), yt = new MutationObserver((m) => {
        let u = !1, se = !1;
        m.forEach((xe) => {
          if (xe.type === "childList") {
            const me = Array.from(xe.addedNodes).some(
              (it) => {
                var Ye;
                return it.nodeType === Node.ELEMENT_NODE && (it.matches("input, textarea") || ((Ye = it.querySelector) == null ? void 0 : Ye.call(it, "input, textarea")));
              }
            ), ct = Array.from(xe.removedNodes).some(
              (it) => {
                var Ye;
                return it.nodeType === Node.ELEMENT_NODE && (it.matches("input, textarea") || ((Ye = it.querySelector) == null ? void 0 : Ye.call(it, "input, textarea")));
              }
            );
            me && (se = !0, u = !0), ct && (u = !0);
          }
        }), u && (clearTimeout(pt.timeoutId), pt.timeoutId = setTimeout(() => {
          y();
        }, se ? 50 : 100));
      });
      const p = document.querySelector(".widget-container") || document.body;
      yt.observe(p, {
        childList: !0,
        subtree: !0
      });
    };
    pt.timeoutId = null;
    let Ct = [];
    const Rt = /* @__PURE__ */ new Set();
    let Mt = !1;
    const Gt = (p) => {
      if (Mt) return;
      const m = setTimeout(() => {
        Rt.delete(m), y();
      }, p);
      Rt.add(m);
    }, g = () => {
      Rt.forEach(clearTimeout), Rt.clear();
    }, y = () => {
      E();
      const p = [
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
      let m = [];
      for (const u of p) {
        const se = document.querySelectorAll(u);
        if (se.length > 0) {
          m = Array.from(se);
          break;
        }
      }
      m.length !== 0 && (Ct = m, m.forEach((u) => {
        u.addEventListener("input", $, !0), u.addEventListener("keyup", $, !0), u.addEventListener("change", $, !0), u.addEventListener("keypress", O, !0), u.addEventListener("keydown", G, !0);
      }));
    }, E = () => {
      Ct.forEach((p) => {
        p.removeEventListener("input", $), p.removeEventListener("keyup", $), p.removeEventListener("change", $), p.removeEventListener("keypress", O), p.removeEventListener("keydown", G);
      }), Ct = [];
    }, N = (p) => !!(p && p.closest && p.closest(".form-message, .form-fullscreen, .cm-email-gate")), $ = (p) => {
      if (N(p.target)) return;
      const m = p.target;
      Se.value = m.value;
    }, O = (p) => {
      N(p.target) || p.key === "Enter" && !p.shiftKey && (p.preventDefault(), p.stopPropagation(), cn());
    }, G = (p) => {
      N(p.target) || p.key === "Enter" && !p.shiftKey && (p.preventDefault(), p.stopPropagation(), cn());
    }, q = (p) => {
      const m = p.target, u = document.querySelector(".header-menu-container");
      document.querySelector(".header-menu-btn");
      const se = document.querySelector(".header-dropdown-menu");
      se && !(u != null && u.contains(m)) && (se.style.display = "none");
    }, W = ce(!0), {
      token: U,
      start: te,
      stop: X,
      setToken: A,
      ensureFresh: L
    } = Dg({
      onTokenChanged: (p) => {
        Xn({ type: "TOKEN_UPDATE", token: p }), ue(p);
      },
      onIdentityExpired: () => {
        j();
      }
    });
    de(() => !!U.value);
    const V = ce(null), J = ce(!1), ae = ce(!1);
    t.initialAuthError && (V.value = t.initialAuthError, J.value = !0, W.value = !1), o();
    const we = window.__INITIAL_DATA__;
    te((we == null ? void 0 : we.widgetId) || "", we == null ? void 0 : we.initialToken), U.value && (St.value = !0);
    const Ae = ce(!1);
    (we == null ? void 0 : we.allowAttachments) !== void 0 && (Ae.value = we.allowAttachments);
    const Pe = ce(null), {
      chatStyles: f,
      chatIconStyles: _,
      agentBubbleStyles: M,
      userBubbleStyles: T,
      messageNameStyles: H,
      headerBorderStyles: ne,
      photoUrl: ee,
      shadowStyle: Re
    } = Mm(s), Ie = ce(null), {
      uploadedAttachments: Ee,
      previewModal: Be,
      previewFile: Ze,
      formatFileSize: wt,
      isImageAttachment: rn,
      getDownloadUrl: kn,
      getPreviewUrl: js,
      handleFileSelect: Vs,
      handleDrop: rs,
      handleDragOver: is,
      handleDragLeave: qt,
      handlePaste: Tn,
      removeAttachment: Ks,
      openPreview: os,
      closePreview: ws,
      openFilePicker: Gs,
      isImage: ks
    } = $m(U, Ie);
    de(() => l.value.some(
      (p) => p.message_type === "form" && (!p.isSubmitted || p.isSubmitted === !1)
    ));
    const xn = de(() => {
      var u;
      return l.value.some((se) => {
        var xe;
        return (xe = se.attributes) == null ? void 0 : xe.end_chat;
      }) || l.value.some((se) => se.message_type === "rating") ? !1 : z.value && St.value || !Qi.value ? I.value === "connected" && !h.value : ur(st.value.trim()) && I.value === "connected" && !h.value || ((u = window.__INITIAL_DATA__) == null ? void 0 : u.workflow);
    }), Sn = de(() => xn.value || h.value && I.value === "connected" && z.value), Ys = de(() => I.value === "connected" ? Jt.value ? "Ask me anything..." : "Type a message..." : "Connecting..."), An = ce(!1), cn = async () => {
      if (!Se.value.trim() && Ee.value.length === 0) return;
      if (h.value && z.value) {
        An.value = !0;
        return;
      }
      !z.value && st.value && await Un();
      const p = Ee.value.map((u) => ({
        content: u.content,
        // base64 content
        filename: u.filename,
        content_type: u.type,
        size: u.size
      }));
      await K(Se.value, st.value, p), Ee.value.forEach((u) => {
        u.url && u.url.startsWith("blob:") && URL.revokeObjectURL(u.url), u.file_url && u.file_url.startsWith("blob:") && URL.revokeObjectURL(u.file_url);
      }), Se.value = "", Ee.value = [];
      const m = document.querySelector('input[placeholder*="Type a message"]');
      m && (m.value = ""), Gt(500);
    };
    Ft(h, (p) => {
      p || !An.value || (An.value = !1, I.value === "connected" && z.value && cn());
    });
    const $r = (p) => {
      xn.value && (Se.value = p, cn());
    }, rt = () => {
      Xn({ type: "WIDGET_MINIMIZE" });
    }, En = (p) => {
      p.key === "Enter" && !p.shiftKey && (p.preventDefault(), p.stopPropagation(), cn());
    }, Un = async ({ afterRefusal: p = !1 } = {}) => {
      var m, u, se, xe;
      try {
        if (!n.value)
          return console.error("Widget ID is not available"), V.value = "Widget ID is not available. Please refresh and try again.", J.value = !0, !1;
        await L(n.value);
        const me = new URL(`${qs.API_URL}/widgets/${n.value}`);
        st.value.trim() && ur(st.value.trim()) && me.searchParams.append("email", st.value.trim());
        const ct = {
          Accept: "application/json",
          "Content-Type": "application/json"
        };
        U.value && (ct.Authorization = `Bearer ${U.value}`);
        const it = await fetch(me, {
          headers: ct,
          cache: "no-store"
        });
        if (it.status === 401) {
          St.value = !1;
          try {
            const jn = (await it.json()).detail;
            if ((jn == null ? void 0 : jn.code) === Og)
              return j(), !1;
            const Rs = typeof jn == "string" ? jn : "";
            (Rs.includes("generate-token") || Rs.includes("API key") || Rs.includes("Token required")) && (ae.value = !0, V.value = "Widget authentication not configured. Please contact the website administrator.", J.value = !0, A(null));
          } catch {
            V.value = "Authentication required. Your token has expired or is invalid. Please refresh the page.", J.value = !0, A(null);
          }
          return !1;
        }
        if (!it.ok) {
          try {
            const or = await it.json();
            V.value = or.detail || `Error: ${it.statusText}`;
          } catch {
            V.value = `Error: ${it.statusText}. Please try again.`;
          }
          return J.value = !0, !1;
        }
        const Ye = await it.json();
        Ye.token && A(Ye.token), St.value = !0, V.value = null, J.value = !1, ue(U.value || void 0);
        const ir = await fe();
        return !ir && Z.value === "customer_required" && !p ? await Un({ afterRefusal: !0 }) : (ir || console.error("Chat service not reachable yet; retrying in the background"), await Br(), (m = Ye.agent) != null && m.customization && i(Ye.agent.customization), Ye.agent && !(Ye != null && Ye.human_agent) && (r.value = Ye.agent.name), Ye != null && Ye.human_agent && (P.value = Ye.human_agent), ((u = Ye.agent) == null ? void 0 : u.allow_attachments) !== void 0 && (Ae.value = Ye.agent.allow_attachments), ((se = Ye.agent) == null ? void 0 : se.workflow) !== void 0 && (window.__INITIAL_DATA__ = window.__INITIAL_DATA__ || {}, window.__INITIAL_DATA__.workflow = Ye.agent.workflow), (xe = Ye.agent) != null && xe.workflow && await De(), !0);
      } catch (me) {
        return console.error("Error checking authorization:", me), V.value = "An unexpected error occurred. Please try again.", J.value = !0, St.value = !1, !1;
      } finally {
        W.value = !1;
      }
    }, Br = async () => {
      !z.value && St.value && (z.value = !0, await oe());
    }, zn = () => {
      Pe.value && (Pe.value.scrollTop = Pe.value.scrollHeight);
    };
    Ft(() => l.value, (p) => {
      ys(() => {
        zn();
      });
    }, { deep: !0 }), Ft(I, (p, m) => {
      p === "connected" && m !== "connected" && Gt(100);
    }), Ft(() => l.value.length, (p, m) => {
      p > 0 && m === 0 && Gt(100);
    });
    let Xs = null;
    Ft(() => l.value, (p) => {
      const m = p[p.length - 1];
      !Yl(m) || m === Xs || (Xs = m, Qs(m));
    }, { deep: !0 });
    const Ur = async () => {
      (await pe() || Z.value === "customer_required") && await Un();
    }, zr = ce(!1), Ts = ce(0), Zs = ce(""), Yt = ce(0), bt = ce(!1), ft = ce({}), ht = ce(!1), Qe = ce({}), Cn = ce(!1), un = ce(null), Js = ce("Start Chat"), Rn = ce(!1), kt = ce(null);
    de(() => {
      var m;
      const p = l.value[l.value.length - 1];
      return ((m = p == null ? void 0 : p.attributes) == null ? void 0 : m.request_rating) || !1;
    });
    const Hn = de(() => {
      var m;
      if (!((m = window.__INITIAL_DATA__) != null && m.workflow))
        return !1;
      const p = l.value.find((u) => u.message_type === "rating");
      return (p == null ? void 0 : p.isSubmitted) === !0;
    }), Xt = de(
      () => Li(P.value.human_agent_profile_pic)
    ), Qs = async (p) => {
      var m, u, se, xe, me;
      if (Yl(p)) {
        try {
          if (p.session_id && U.value && n.value) {
            const ct = new URL(`${qs.API_URL}/widgets/${n.value}/end-chat`);
            ct.searchParams.append("session_id", p.session_id), (m = p.attributes) != null && m.end_chat_reason && ct.searchParams.append("reason", p.attributes.end_chat_reason), (u = p.attributes) != null && u.end_chat_description && ct.searchParams.append("description", p.attributes.end_chat_description);
            const it = await fetch(ct, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${U.value}`,
                "Content-Type": "application/json"
              }
            });
            if (it.ok) {
              const Ye = await it.json();
              console.info(`✓ Chat session closed on backend: ${Ye.session_id}`);
            } else
              console.warn(`Failed to close session on backend: ${it.status}`);
          }
        } catch (ct) {
          console.error("Error calling end-chat API:", ct);
        }
        if ((se = p.attributes) != null && se.end_chat && ((xe = p.attributes) != null && xe.request_rating)) {
          const ct = p.agent_name || ((me = P.value) == null ? void 0 : me.human_agent_name) || r.value || "our agent";
          l.value.push({
            message: `Rate the chat session that you had with ${ct}`,
            message_type: "rating",
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            session_id: p.session_id,
            agent_name: ct,
            showFeedback: !1
          }), at.value = p.session_id;
        }
      }
    }, xs = (p) => {
      bt.value || (Yt.value = p);
    }, qn = () => {
      if (!bt.value) {
        const p = l.value[l.value.length - 1];
        Yt.value = (p == null ? void 0 : p.selectedRating) || 0;
      }
    }, as = async (p) => {
      if (!bt.value) {
        Yt.value = p;
        const m = l.value[l.value.length - 1];
        m && m.message_type === "rating" && (m.showFeedback = !0, m.selectedRating = p);
      }
    }, Zt = async (p, m, u = null) => {
      try {
        bt.value = !0, await Te(m, u);
        const se = l.value.find((xe) => xe.message_type === "rating");
        se && (se.isSubmitted = !0, se.finalRating = m, se.finalFeedback = u);
      } catch (se) {
        console.error("Failed to submit rating:", se);
      } finally {
        bt.value = !1;
      }
    }, Gi = (p) => {
      const m = {};
      for (const u of p.fields) {
        const se = ft.value[u.name], xe = As(u, se);
        xe && (m[u.name] = xe);
      }
      return Qe.value = m, Object.keys(m).length === 0;
    }, Ss = async (p) => {
      if (!(ht.value || !Gi(p)))
        try {
          ht.value = !0, await Le(ft.value);
          const u = l.value.findIndex(
            (se) => se.message_type === "form" && (!se.isSubmitted || se.isSubmitted === !1)
          );
          u !== -1 && l.value.splice(u, 1), ft.value = {}, Qe.value = {};
        } catch (u) {
          console.error("Failed to submit form:", u);
        } finally {
          ht.value = !1;
        }
    }, It = (p, m) => {
      var u, se;
      if (ft.value[p] = m, m && m.toString().trim() !== "") {
        let xe = null;
        if ((u = kt.value) != null && u.fields && (xe = kt.value.fields.find((me) => me.name === p)), !xe && ((se = _e.value) != null && se.fields) && (xe = _e.value.fields.find((me) => me.name === p)), xe) {
          const me = As(xe, m);
          me ? (Qe.value[p] = me, console.log(`Validation error for ${p}:`, me)) : delete Qe.value[p];
        }
      } else
        delete Qe.value[p], console.log(`Cleared error for ${p}`);
    }, Hr = (p) => {
      const m = p.replace(/\D/g, "");
      return m.length >= 7 && m.length <= 15;
    }, As = (p, m) => {
      if (p.required && (!m || m.toString().trim() === ""))
        return `${p.label} is required`;
      if (!m || m.toString().trim() === "")
        return null;
      if (p.type === "email" && !ur(m))
        return "Please enter a valid email address";
      if (p.type === "tel" && !Hr(m))
        return "Please enter a valid phone number";
      if ((p.type === "text" || p.type === "textarea") && p.minLength && m.length < p.minLength)
        return `${p.label} must be at least ${p.minLength} characters`;
      if ((p.type === "text" || p.type === "textarea") && p.maxLength && m.length > p.maxLength)
        return `${p.label} must not exceed ${p.maxLength} characters`;
      if (p.type === "number") {
        const u = parseFloat(m);
        if (isNaN(u))
          return `${p.label} must be a valid number`;
        if (p.minLength && u < p.minLength)
          return `${p.label} must be at least ${p.minLength}`;
        if (p.maxLength && u > p.maxLength)
          return `${p.label} must not exceed ${p.maxLength}`;
      }
      return null;
    }, qr = async () => {
      if (!(ht.value || !kt.value))
        try {
          ht.value = !0, Qe.value = {};
          let p = !1;
          for (const m of kt.value.fields || []) {
            const u = ft.value[m.name], se = As(m, u);
            se && (Qe.value[m.name] = se, p = !0, console.log(`Validation error for field ${m.name}:`, se));
          }
          if (p) {
            ht.value = !1, console.log("Validation failed, not submitting");
            return;
          }
          await Le(ft.value), Rn.value = !1, kt.value = null, ft.value = {};
        } catch (p) {
          console.error("Failed to submit full screen form:", p);
        } finally {
          ht.value = !1, console.log("Full screen form submission completed");
        }
    }, Wr = (p, m) => {
      if (console.log("handleViewDetails called with:", { product: p, shopDomain: m }), !p) {
        console.error("No product provided to handleViewDetails");
        return;
      }
      let u = null;
      if (p.handle && m)
        u = `https://${m}/products/${p.handle}`;
      else if (p.id && m)
        u = `https://${m}/products/${p.id}`;
      else if (m) {
        if (!p.handle && !p.id) {
          console.error("Product handle and ID are both missing! Product:", p), alert("Unable to open product: Product information incomplete.");
          return;
        }
      } else {
        console.error("Shop domain is missing! Product:", p), alert("Unable to open product: Shop domain not available. Please contact support.");
        return;
      }
      u && (console.log("Opening product URL:", u), window.open(u, "_blank"));
    }, Yi = (p) => {
      if (!p) return "";
      let m = p.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "");
      const u = [];
      return m = m.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (se, xe, me) => {
        const ct = `__MARKDOWN_LINK_${u.length}__`;
        return console.log("Found markdown link:", se, "-> placeholder:", ct), u.push(se), ct;
      }), console.log("After replacing markdown links with placeholders:", m), console.log("Markdown links array:", u), m = m.replace(/https?:\/\/[^\s\)]+/g, "[link removed]"), console.log("After removing standalone URLs:", m), u.forEach((se, xe) => {
        m = m.replace(`__MARKDOWN_LINK_${xe}__`, se), console.log(`Restored markdown link ${xe}:`, se);
      }), m = m.replace(/\n\s*\n\s*\n/g, `

`).trim(), m;
    }, er = ce(!1);
    ce(!1);
    const tr = de(() => {
      var p;
      return !!((p = P.value) != null && p.human_agent_name);
    }), jr = de(() => {
      var p;
      return Nm((p = window.__INITIAL_DATA__) == null ? void 0 : p.presence, tr.value);
    }), Vr = de(() => Ae.value && tr.value && Ee.value.length < uc), Es = async () => {
      try {
        Cn.value = !1, un.value = null, await ve();
      } catch (p) {
        console.error("Failed to proceed workflow:", p);
      }
    }, ls = async (p) => {
      try {
        if (!p.userInputValue || !p.userInputValue.trim())
          return;
        const m = p.userInputValue.trim();
        p.isSubmitted = !0, p.submittedValue = m, await K(m, st.value);
      } catch (m) {
        console.error("Failed to submit user input:", m), p.isSubmitted = !1, p.submittedValue = null;
      }
    }, j = () => {
      Xn({ type: "IDENTITY_EXPIRED" });
    }, d = async () => {
      U.value && (A(null), await B());
    }, k = async (p) => {
      const m = zs(p);
      !m || m === U.value || (A(m), await B());
    }, B = async () => {
      var p, m, u;
      try {
        let se = 0;
        const xe = 50;
        for (; !((p = window.__INITIAL_DATA__) != null && p.widgetId) && se < xe; )
          await new Promise((ct) => setTimeout(ct, 100)), se++;
        return (m = window.__INITIAL_DATA__) != null && m.widgetId ? (ye(window.__INITIAL_DATA__.widgetId), await Un() ? ((u = window.__INITIAL_DATA__) != null && u.workflow && St.value && await De(), !0) : (I.value = "connected", !1)) : (console.error("Widget data not available after waiting"), !1);
      } catch (se) {
        return console.error("Failed to initialize widget:", se), !1;
      }
    };
    window.addEventListener("message", (p) => {
      p.source === window.parent && (!p.data || typeof p.data.type != "string" || (p.data.type === "SCROLL_TO_BOTTOM" && zn(), p.data.type === "IDENTITY_UNAVAILABLE" && d(), p.data.type === "TOKEN_REFRESH" && k(p.data.token), p.data.type === "WIDGET_VISIBILITY" && (Ua.value = !!p.data.open), p.data.type === "WIDGET_DISPLAY" && (eo.value = {
        mode: p.data.mode,
        width: p.data.width,
        height: p.data.height,
        hotkey: p.data.hotkey
      }), p.data.type === "PREFILL_MESSAGE" && typeof p.data.text == "string" && (Se.value = p.data.text.slice(0, 2e3), ys(() => {
        const m = document.querySelector(
          ".message-input input, .welcome-message-field"
        );
        m == null || m.focus();
      }))));
    });
    const Q = () => {
      Y(async () => {
        await Un();
      }), ge(({ session_id: p, authenticated: m, created: u }) => {
        Xn({
          type: "CHAT_SESSION",
          sessionId: p,
          authenticated: m,
          created: u
        });
      }), Ke((p) => {
        var m;
        if (Js.value = p.button_text || "Start Chat", p.type === "landing_page")
          un.value = p.landing_page_data, Cn.value = !0, Rn.value = !1;
        else if (p.type === "form" || p.type === "display_form")
          if (((m = p.form_data) == null ? void 0 : m.form_full_screen) === !0)
            kt.value = p.form_data, Rn.value = !0, Cn.value = !1;
          else {
            const u = {
              message: "",
              message_type: "form",
              attributes: {
                form_data: p.form_data
              },
              created_at: (/* @__PURE__ */ new Date()).toISOString(),
              isSubmitted: !1
            };
            l.value.findIndex(
              (xe) => xe.message_type === "form" && !xe.isSubmitted
            ) === -1 && l.value.push(u), Cn.value = !1, Rn.value = !1;
          }
        else
          Cn.value = !1, Rn.value = !1;
      }), Ge((p) => {
        console.log("Workflow proceeded:", p);
      });
    }, ie = async () => {
      try {
        await B(), await De();
      } catch (p) {
        throw console.error("Failed to start new conversation:", p), p;
      }
    }, he = de(
      () => {
        var p;
        return s.value.allow_new_chat === !0 && l.value.length > 0 && !((p = P.value) != null && p.human_agent_name) && !cs.value;
      }
    ), Oe = ce(!1), $e = ce(""), lt = ce(!1);
    let dt = null;
    const fn = () => {
      lt.value = !1, $e.value = "", dt && (clearTimeout(dt), dt = null);
    }, Tt = () => {
      if (!Oe.value) {
        if (lt.value) {
          fn();
          return;
        }
        lt.value = !0, $e.value = "", dt = setTimeout(fn, tm);
      }
    };
    Ft(he, (p) => {
      p || fn();
    });
    const nr = async () => {
      Oe.value || (dt && (clearTimeout(dt), dt = null), await Oa(), $e.value || (lt.value = !1));
    }, Oa = async () => {
      if (!Oe.value) {
        Oe.value = !0, $e.value = "";
        try {
          if (!await D()) {
            $e.value = Gl;
            return;
          }
          P.value = {}, Se.value = "", Ee.value = [], await B();
        } catch (p) {
          console.error("Failed to start a new chat:", p), $e.value = Gl;
        } finally {
          Oe.value = !1;
        }
      }
    }, Ku = async () => {
      Hn.value = !1, l.value = [], P.value = {}, await ie();
    };
    Ui(async () => {
      await B(), Q(), pt(), document.addEventListener("click", q), (() => {
        const m = l.value.length > 0, u = I.value === "connected", se = document.querySelector('input[type="text"], textarea') !== null;
        return m || u || se;
      })() && Gt(100);
    }), Mr(() => {
      window.removeEventListener("message", (p) => {
        p.data.type === "SCROLL_TO_BOTTOM" && zn();
      }), document.removeEventListener("click", q), yt && (yt.disconnect(), yt = null), pt.timeoutId && (clearTimeout(pt.timeoutId), pt.timeoutId = null), Mt = !0, g(), E(), X(), fn(), C();
    });
    const Cs = de(() => s.value.chat_style === "AURORA"), Jt = de(() => s.value.chat_style === "ASK_ANYTHING" || Cs.value), Na = de(() => s.value.customization_metadata), Kr = de(() => {
      var m;
      const p = (m = Na.value) == null ? void 0 : m.avatar_style;
      return p === "orb" ? !0 : p === "photo" ? !1 : Cs.value && !s.value.photo_url;
    }), sr = de(() => {
      var p;
      return Lm(r.value || "", (p = Na.value) == null ? void 0 : p.orb_variant);
    }), Gu = {
      GLASS: "theme-glass",
      TERMINAL: "theme-terminal",
      PLAYFUL: "theme-playful",
      CALM_MINT: "theme-calm",
      SUNRISE: "theme-sunrise"
    }, Yu = de(() => Gu[s.value.chat_style] || ""), Xu = de(() => i_(s.value.chat_style, {
      chat_background_color: s.value.chat_background_color,
      chat_text_color: s.value.chat_text_color,
      accent_color: s.value.accent_color,
      font_family: s.value.font_family
    })), Xi = de(
      () => Array.isArray(s.value.quick_actions) ? s.value.quick_actions.filter((p) => !!p && p.trim().length > 0) : []
    ), Pa = de(() => (s.value.welcome_message || "").trim()), Ma = de(
      () => !Jt.value && l.value.length === 0 && !w.value && !cs.value
    ), Zu = de(
      () => Ma.value && Pa.value.length > 0
    ), Ju = de(
      () => Ma.value && !Hn.value && Xi.value.length > 0
    ), Gr = de(() => s.value.show_citations === !0), Da = de(() => Om(s.value.show_ai_disclaimer, tr.value)), Qu = (p) => /^[0-9a-f]{16,}$/i.test(p) || /^[0-9a-f-]{32,}$/i.test(p), Zi = (p) => {
      const m = (p || "").trim().toLowerCase();
      return !m || m === "unknown" ? "Knowledge base" : m.charAt(0).toUpperCase() + m.slice(1);
    }, Ji = (p) => {
      let m = ((p == null ? void 0 : p.name) || "").trim();
      return !m || (m = m.replace(/^[0-9a-f]{16,}[_-]/i, "").replace(/\.(pdf|txt|md|html?|docx?|csv|json)$/i, ""), !m || Qu(m)) ? Zi(p == null ? void 0 : p.type) : m;
    }, Fa = (p) => {
      const m = Ji(p), u = Zi(p == null ? void 0 : p.type);
      return m === u ? u : `${m} · ${u}`;
    }, Qi = de(() => s.value.collect_email === !0 && !Jt.value), $a = ce(!1), Wn = ce(""), rr = ce(!1), cs = de(() => !z.value && Qi.value && !$a.value), Ba = async () => {
      const p = st.value.trim();
      if (!p) {
        Wn.value = "Please enter your email address.";
        return;
      }
      if (!ur(p)) {
        Wn.value = "Please enter a valid email address.";
        return;
      }
      Wn.value = "", rr.value = !0;
      try {
        await Un(), $a.value = !0;
      } catch {
        Wn.value = "Something went wrong. Please try again.";
      } finally {
        rr.value = !1;
      }
    }, eo = ce(null), Ua = ce(!0), to = { mode: "floating", width: 400, height: 560 }, Yr = de(
      () => {
        var p;
        return eo.value || ((p = s.value.customization_metadata) == null ? void 0 : p.widget_display) || null;
      }
    ), ef = de(() => {
      const p = Yr.value;
      return p ? typeof p.mode == "string" && p.mode !== to.mode || typeof p.width == "number" && p.width !== to.width || typeof p.height == "number" && p.height !== to.height : !1;
    }), tf = de(() => {
      var m;
      const p = {
        width: "100%",
        height: "100%",
        borderRadius: "var(--radius-lg)"
      };
      if (ef.value) {
        const u = (m = Yr.value) == null ? void 0 : m.mode;
        return u === "sidebar-left" || u === "sidebar-right" ? { ...p, borderRadius: "0" } : p;
      }
      return Jt.value ? window.innerWidth <= 768 ? {
        ...p,
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
        minWidth: "unset",
        borderRadius: "0"
      } : window.innerWidth <= 1024 ? {
        ...p,
        width: "95%",
        maxWidth: "700px",
        minWidth: "500px",
        height: "650px"
      } : {
        ...p,
        width: "100%",
        maxWidth: "400px",
        minWidth: "400px",
        height: "580px"
      } : p;
    }), za = de(() => Jt.value && l.value.length === 0), nf = ["form", "user_input", "rating", "product", "shopify_output"], sf = de(
      () => l.value.some(
        (p) => nf.includes(p.message_type) || Array.isArray(p.attachments) && p.attachments.length > 0
      )
    ), rf = de(() => {
      var m, u;
      return Jt.value ? !0 : (((m = Yr.value) == null ? void 0 : m.mode) === "ask-ai" || ((u = Yr.value) == null ? void 0 : u.mode) === "search-bar") && !Ae.value;
    }), no = de(
      () => rf.value && Je.value && !Cn.value && !Rn.value && !cs.value && !Hn.value && !sf.value
    );
    Ft(no, (p) => {
      Xn({ type: "WIDGET_SURFACE", palette: p });
    }, { immediate: !0 });
    const of = de(
      () => s.value.welcome_subtitle || `Ask a question — ${r.value || "the assistant"} answers from what it knows.`
    ), af = de(() => {
      var p;
      return ((p = eo.value) == null ? void 0 : p.hotkey) !== !1;
    });
    return (p, m) => J.value && ae.value ? (x(), S("div", a_, [
      b("button", {
        type: "button",
        class: "cm-error-close",
        "aria-label": "Close chat",
        title: "Close",
        onClick: rt
      }, "×"),
      m[20] || (m[20] = fo('<div class="widget-unavailable-card" data-v-de3e6421><div class="widget-unavailable-icon-wrapper" data-v-de3e6421><svg class="widget-unavailable-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-de3e6421><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-de3e6421></path><path d="M9 12l2 2 4-4" data-v-de3e6421></path></svg></div><h2 class="widget-unavailable-title" data-v-de3e6421>Chat Unavailable</h2><p class="widget-unavailable-message" data-v-de3e6421> This chat widget is not currently configured. Please contact the website administrator to enable chat support. </p><div class="widget-unavailable-footer" data-v-de3e6421><svg class="chattermate-logo-small" width="14" height="14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-de3e6421><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-de3e6421></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-de3e6421></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-de3e6421></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-de3e6421></circle></svg></div></div>', 1))
    ])) : J.value ? (x(), S("div", l_, [
      b("button", {
        type: "button",
        class: "cm-error-close",
        "aria-label": "Close chat",
        title: "Close",
        onClick: rt
      }, "×"),
      b("div", c_, [
        m[21] || (m[21] = fo('<div class="auth-error-header" data-v-de3e6421><svg class="auth-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-de3e6421><circle cx="12" cy="12" r="10" data-v-de3e6421></circle><line x1="12" y1="8" x2="12" y2="12" data-v-de3e6421></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-de3e6421></line></svg><h2 data-v-de3e6421>Authentication Error</h2></div>', 1)),
        b("p", u_, re(V.value), 1),
        b("button", {
          class: "auth-error-refresh-btn",
          onClick: m[0] || (m[0] = () => p.window.location.reload())
        }, " Refresh Page ")
      ])
    ])) : n.value && !J.value ? (x(), S("div", {
      key: 2,
      class: Ue(["chat-container cm-surface", [{ collapsed: !Je.value, "ask-anything-style": Jt.value, aurora: Cs.value }, Yu.value]]),
      style: Me({ ...R(Re), ...tf.value, ...Xu.value })
    }, [
      W.value ? (x(), S("div", f_, m[22] || (m[22] = [
        fo('<div class="loading-spinner" data-v-de3e6421><div class="dot" data-v-de3e6421></div><div class="dot" data-v-de3e6421></div><div class="dot" data-v-de3e6421></div></div><div class="loading-text" data-v-de3e6421>Initializing chat...</div>', 2)
      ]))) : le("", !0),
      !W.value && R(I) !== "connected" ? (x(), S("div", {
        key: 1,
        class: Ue(["connection-status", R(I)])
      }, [
        R(I) === "connecting" ? (x(), S("div", h_, m[23] || (m[23] = [
          Ln(" Connecting to chat service... ", -1),
          b("div", { class: "loading-dots" }, [
            b("div", { class: "dot" }),
            b("div", { class: "dot" }),
            b("div", { class: "dot" })
          ], -1)
        ]))) : R(I) === "failed" ? (x(), S("div", d_, [
          m[24] || (m[24] = Ln(" Connection failed. ", -1)),
          b("button", {
            onClick: Ur,
            class: "reconnect-button"
          }, " Click here to reconnect ")
        ])) : le("", !0)
      ], 2)) : le("", !0),
      R(v) ? (x(), S("div", {
        key: 2,
        class: "error-alert",
        style: Me(R(_))
      }, re(R(c)), 5)) : le("", !0),
      no.value ? (x(), xi(Cm, {
        key: 3,
        messages: R(l),
        draft: Se.value,
        "agent-name": R(r),
        suggestions: Xi.value,
        "welcome-title": R(s).welcome_title,
        "welcome-subtitle": of.value,
        placeholder: Ys.value,
        "input-enabled": xn.value,
        "typing-enabled": Sn.value,
        loading: R(h),
        "show-citations": Gr.value,
        disclaimer: Da.value ? R(Xl) : "",
        active: Ua.value,
        hotkey: af.value,
        "can-start-new-chat": he.value,
        "starting-new-chat": Oe.value,
        "new-chat-armed": lt.value,
        "new-chat-error": $e.value,
        onNewChat: Tt,
        onConfirmNewChat: nr,
        onCancelNewChat: fn,
        "citation-label": Ji,
        "citation-tooltip": Fa,
        "display-text": R(nt),
        "is-streaming": R(Xe),
        "onUpdate:draft": m[1] || (m[1] = (u) => Se.value = u),
        onSend: cn,
        onAsk: $r,
        onClose: rt
      }, null, 8, ["messages", "draft", "agent-name", "suggestions", "welcome-title", "welcome-subtitle", "placeholder", "input-enabled", "typing-enabled", "loading", "show-citations", "disclaimer", "active", "hotkey", "can-start-new-chat", "starting-new-chat", "new-chat-armed", "new-chat-error", "display-text", "is-streaming"])) : za.value ? (x(), S("div", {
        key: 4,
        class: Ue(["welcome-message-section", { aurora: Cs.value }]),
        style: Me(R(f))
      }, [
        b("div", p_, [
          b("div", m_, [
            Kr.value ? (x(), S("div", {
              key: 0,
              class: "welcome-orb",
              style: Me(sr.value)
            }, null, 4)) : R(ee) ? (x(), S("img", {
              key: 1,
              src: R(ee),
              alt: R(r),
              class: "welcome-avatar"
            }, null, 8, g_)) : le("", !0),
            b("h1", __, re(R(s).welcome_title || `Welcome to ${R(r)}`), 1),
            b("p", y_, re(R(s).welcome_subtitle || "I'm here to help you with anything you need. What can I assist you with today?"), 1)
          ])
        ]),
        b("div", b_, [
          !R(z) && !St.value && Qi.value ? (x(), S("div", v_, [
            Vn(b("input", {
              "onUpdate:modelValue": m[2] || (m[2] = (u) => st.value = u),
              type: "email",
              placeholder: "Enter your email address",
              disabled: R(h) || R(I) !== "connected",
              class: Ue([{
                invalid: st.value.trim() && !R(ur)(st.value.trim()),
                disabled: R(I) !== "connected"
              }, "welcome-email-input"])
            }, null, 10, w_), [
              [hs, st.value]
            ])
          ])) : le("", !0),
          b("div", k_, [
            Vn(b("input", {
              "onUpdate:modelValue": m[3] || (m[3] = (u) => Se.value = u),
              type: "text",
              placeholder: Ys.value,
              onKeypress: En,
              onInput: Ce,
              onChange: Ce,
              disabled: !Sn.value,
              class: Ue([{ disabled: !Sn.value }, "welcome-message-field"])
            }, null, 42, T_), [
              [hs, Se.value]
            ]),
            b("button", {
              class: Ue(["welcome-send-button", { "aurora-send": Cs.value }]),
              style: Me(R(T)),
              onClick: cn,
              disabled: !Se.value.trim() || !xn.value
            }, [
              Cs.value ? (x(), S("svg", S_, m[25] || (m[25] = [
                b("path", {
                  d: "M12 19V5M12 5L5 12M12 5L19 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1)
              ]))) : (x(), S("svg", A_, m[26] || (m[26] = [
                b("path", {
                  d: "M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1)
              ])))
            ], 14, x_)
          ])
        ])
      ], 6)) : le("", !0),
      Cn.value && un.value ? (x(), S("div", {
        key: 5,
        class: "landing-page-fullscreen",
        style: Me(R(f))
      }, [
        b("div", E_, [
          b("div", C_, [
            b("h2", R_, re(un.value.heading), 1),
            b("div", I_, re(un.value.content), 1)
          ]),
          b("div", L_, [
            b("button", {
              class: "landing-page-button",
              onClick: Es
            }, re(Js.value), 1)
          ])
        ])
      ], 4)) : Rn.value && kt.value ? (x(), S("div", {
        key: 6,
        class: "form-fullscreen",
        style: Me(R(f))
      }, [
        b("div", O_, [
          kt.value.title || kt.value.description ? (x(), S("div", N_, [
            kt.value.title ? (x(), S("h2", P_, re(kt.value.title), 1)) : le("", !0),
            kt.value.description ? (x(), S("p", M_, re(kt.value.description), 1)) : le("", !0)
          ])) : le("", !0),
          b("div", D_, [
            (x(!0), S(ze, null, At(kt.value.fields, (u) => {
              var se, xe;
              return x(), S("div", {
                key: u.name,
                class: "form-field"
              }, [
                b("label", {
                  for: `fullscreen-form-${u.name}`,
                  class: "field-label"
                }, [
                  Ln(re(u.label) + " ", 1),
                  u.required ? (x(), S("span", $_, "*")) : le("", !0)
                ], 8, F_),
                u.type === "text" || u.type === "email" || u.type === "tel" ? (x(), S("input", {
                  key: 0,
                  id: `fullscreen-form-${u.name}`,
                  type: u.type,
                  placeholder: u.placeholder || "",
                  required: u.required,
                  minlength: u.minLength,
                  maxlength: u.maxLength,
                  value: ft.value[u.name] || "",
                  onInput: (me) => It(u.name, me.target.value),
                  onBlur: (me) => It(u.name, me.target.value),
                  class: Ue(["form-input", { error: Qe.value[u.name] }]),
                  autocomplete: u.type === "email" ? "email" : u.type === "tel" ? "tel" : "off",
                  inputmode: u.type === "tel" ? "tel" : u.type === "email" ? "email" : "text"
                }, null, 42, B_)) : u.type === "number" ? (x(), S("input", {
                  key: 1,
                  id: `fullscreen-form-${u.name}`,
                  type: "number",
                  placeholder: u.placeholder || "",
                  required: u.required,
                  min: u.minLength,
                  max: u.maxLength,
                  value: ft.value[u.name] || "",
                  onInput: (me) => It(u.name, me.target.value),
                  class: Ue(["form-input", { error: Qe.value[u.name] }])
                }, null, 42, U_)) : u.type === "textarea" ? (x(), S("textarea", {
                  key: 2,
                  id: `fullscreen-form-${u.name}`,
                  placeholder: u.placeholder || "",
                  required: u.required,
                  minlength: u.minLength,
                  maxlength: u.maxLength,
                  value: ft.value[u.name] || "",
                  onInput: (me) => It(u.name, me.target.value),
                  class: Ue(["form-textarea", { error: Qe.value[u.name] }]),
                  rows: "4"
                }, null, 42, z_)) : u.type === "select" ? (x(), S("select", {
                  key: 3,
                  id: `fullscreen-form-${u.name}`,
                  required: u.required,
                  value: ft.value[u.name] || "",
                  onChange: (me) => It(u.name, me.target.value),
                  class: Ue(["form-select", { error: Qe.value[u.name] }])
                }, [
                  b("option", q_, re(u.placeholder || "Please select..."), 1),
                  (x(!0), S(ze, null, At((Array.isArray(u.options) ? u.options : ((se = u.options) == null ? void 0 : se.split(`
`)) || []).filter((me) => me.trim()), (me) => (x(), S("option", {
                    key: me,
                    value: me.trim()
                  }, re(me.trim()), 9, W_))), 128))
                ], 42, H_)) : u.type === "checkbox" ? (x(), S("label", j_, [
                  b("input", {
                    id: `fullscreen-form-${u.name}`,
                    type: "checkbox",
                    required: u.required,
                    checked: ft.value[u.name] || !1,
                    onChange: (me) => It(u.name, me.target.checked),
                    class: "form-checkbox"
                  }, null, 40, V_),
                  b("span", K_, re(u.label), 1)
                ])) : u.type === "radio" ? (x(), S("div", G_, [
                  (x(!0), S(ze, null, At((Array.isArray(u.options) ? u.options : ((xe = u.options) == null ? void 0 : xe.split(`
`)) || []).filter((me) => me.trim()), (me) => (x(), S("label", {
                    key: me,
                    class: "radio-field"
                  }, [
                    b("input", {
                      type: "radio",
                      name: `fullscreen-form-${u.name}`,
                      value: me.trim(),
                      required: u.required,
                      checked: ft.value[u.name] === me.trim(),
                      onChange: (ct) => It(u.name, me.trim()),
                      class: "form-radio"
                    }, null, 40, Y_),
                    b("span", X_, re(me.trim()), 1)
                  ]))), 128))
                ])) : le("", !0),
                Qe.value[u.name] ? (x(), S("div", Z_, re(Qe.value[u.name]), 1)) : le("", !0)
              ]);
            }), 128))
          ]),
          b("div", J_, [
            b("button", {
              onClick: m[4] || (m[4] = () => {
                console.log("Submit button clicked!"), qr();
              }),
              disabled: ht.value,
              class: "submit-form-button",
              style: Me(R(T))
            }, [
              ht.value ? (x(), S("span", ey, m[27] || (m[27] = [
                b("div", { class: "dot" }, null, -1),
                b("div", { class: "dot" }, null, -1),
                b("div", { class: "dot" }, null, -1)
              ]))) : (x(), S("span", ty, re(kt.value.submit_button_text || "Submit"), 1))
            ], 12, Q_)
          ])
        ])
      ], 4)) : !za.value && Je.value && !no.value ? (x(), S("div", {
        key: 7,
        class: Ue(["chat-panel", { "ask-anything-chat": Jt.value }]),
        style: Me(R(f))
      }, [
        Jt.value ? (x(), S("div", {
          key: 1,
          class: "ask-anything-top",
          style: Me(R(ne))
        }, [
          b("div", cy, [
            Xt.value || R(ee) ? (x(), S("img", {
              key: 0,
              src: Xt.value || R(ee),
              alt: R(P).human_agent_name || R(r),
              class: "header-avatar"
            }, null, 8, uy)) : le("", !0),
            b("div", fy, [
              b("h3", {
                style: Me(R(H))
              }, re(R(r)), 5),
              b("p", {
                class: "ask-anything-subtitle",
                style: Me(R(H))
              }, re(R(s).welcome_subtitle || "Ask me anything. I'm here to help."), 5)
            ])
          ])
        ], 4)) : (x(), S("div", {
          key: 0,
          class: "chat-header",
          style: Me(R(ne))
        }, [
          b("div", {
            class: "cm-header-sheen",
            style: Me({ background: "linear-gradient(90deg, transparent, " + (R(s).accent_color || "#C9F24E") + ", transparent)" })
          }, null, 4),
          b("div", ny, [
            !Xt.value && (Kr.value || !R(ee)) ? (x(), S("div", {
              key: 0,
              class: "header-orb",
              style: Me(sr.value)
            }, null, 4)) : Xt.value || R(ee) ? (x(), S("img", {
              key: 1,
              src: Xt.value || R(ee),
              alt: R(P).human_agent_name || R(r),
              class: "header-avatar"
            }, null, 8, sy)) : le("", !0),
            b("div", ry, [
              b("h3", {
                style: Me(R(H))
              }, re(R(P).human_agent_name || R(r)), 5),
              b("div", iy, [
                b("span", {
                  class: Ue(["status-indicator", jr.value.online ? "online" : "away"])
                }, null, 2),
                b("span", oy, re(jr.value.text), 1)
              ])
            ])
          ]),
          b("div", ay, [
            he.value ? (x(), S("button", {
              key: 0,
              type: "button",
              class: Ue(["header-new-chat", { armed: lt.value }]),
              style: Me(R(H)),
              disabled: Oe.value,
              title: R(Ii),
              "aria-label": R(Ii),
              "aria-expanded": lt.value,
              onClick: Tt
            }, m[28] || (m[28] = [
              b("svg", {
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
                b("path", { d: "M12 20h9" }),
                b("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" })
              ], -1)
            ]), 14, ly)) : le("", !0),
            b("button", {
              type: "button",
              class: "header-minimize",
              style: Me(R(H)),
              title: "Minimize",
              "aria-label": "Minimize chat",
              onClick: rt
            }, m[29] || (m[29] = [
              b("svg", {
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
                b("path", { d: "M6 9l6 6 6-6" })
              ], -1)
            ]), 4)
          ])
        ], 4)),
        R(w) ? (x(), S("div", hy, m[30] || (m[30] = [
          b("div", { class: "loading-spinner" }, [
            b("div", { class: "dot" }),
            b("div", { class: "dot" }),
            b("div", { class: "dot" })
          ], -1)
        ]))) : le("", !0),
        cs.value ? (x(), S("div", {
          key: 3,
          class: "cm-email-gate",
          style: Me(R(f))
        }, [
          b("div", {
            class: "cm-email-gate-orb",
            style: Me(sr.value)
          }, null, 4),
          b("h3", dy, re(R(s).welcome_title || "Before we start"), 1),
          m[31] || (m[31] = b("p", { class: "cm-email-gate-text" }, "Enter your email and we'll continue the chat.", -1)),
          Vn(b("input", {
            "onUpdate:modelValue": m[5] || (m[5] = (u) => st.value = u),
            type: "email",
            inputmode: "email",
            autocomplete: "email",
            placeholder: "you@example.com",
            class: Ue(["cm-email-gate-input", { invalid: !!Wn.value }]),
            disabled: rr.value,
            onKeyup: li(Ba, ["enter"]),
            onInput: m[6] || (m[6] = (u) => Wn.value = "")
          }, null, 42, py), [
            [hs, st.value]
          ]),
          Wn.value ? (x(), S("p", my, re(Wn.value), 1)) : le("", !0),
          b("button", {
            type: "button",
            class: "cm-email-gate-btn",
            style: Me(R(T)),
            disabled: rr.value,
            onClick: Ba
          }, re(rr.value ? "Please wait…" : "Continue to chat"), 13, gy)
        ], 4)) : le("", !0),
        lt.value && he.value ? (x(), xi(Ru, {
          key: 4,
          busy: Oe.value,
          error: $e.value,
          onConfirm: nr,
          onCancel: fn
        }, null, 8, ["busy", "error"])) : le("", !0),
        Vn(b("div", {
          class: "chat-messages",
          ref_key: "messagesContainer",
          ref: Pe,
          role: "log",
          "aria-label": "Messages"
        }, [
          Zu.value ? (x(), S("div", _y, [
            b("div", yy, [
              Kr.value || !R(ee) ? (x(), S("div", {
                key: 0,
                class: "cm-welcome-orb",
                style: Me(sr.value)
              }, null, 4)) : (x(), S("img", {
                key: 1,
                src: R(ee),
                alt: R(r),
                class: "cm-welcome-avatar"
              }, null, 8, by)),
              b("div", {
                class: "message-bubble cm-welcome-bubble",
                style: Me(R(M))
              }, re(Pa.value), 5)
            ])
          ])) : le("", !0),
          (x(!0), S(ze, null, At(R(l), (u, se) => {
            var xe, me, ct, it, Ye, ir, or, jn, Rs, Ha, qa, Wa, ja, Va, Ka, Ga, Ya, Xa, Za;
            return x(), S("div", {
              key: se,
              class: Ue([
                "message",
                u.message_type === "bot" || u.message_type === "agent" ? "agent-message" : u.message_type === "system" ? "system-message" : u.message_type === "rating" ? "rating-message" : u.message_type === "form" ? "form-message" : u.message_type === "product" || u.shopify_output ? "product-message" : "user-message"
              ])
            }, [
              u.message_type === "bot" || u.message_type === "agent" ? (x(), S("div", vy, [
                Xt.value ? (x(), S("img", {
                  key: 0,
                  src: Xt.value,
                  class: "cm-msg-avatar-img",
                  alt: ""
                }, null, 8, wy)) : !Kr.value && R(ee) ? (x(), S("img", {
                  key: 1,
                  src: R(ee),
                  class: "cm-msg-avatar-img",
                  alt: ""
                }, null, 8, ky)) : (x(), S("div", {
                  key: 2,
                  class: "cm-msg-avatar-orb",
                  style: Me(sr.value)
                }, null, 4))
              ])) : le("", !0),
              b("div", Ty, [
                b("div", {
                  class: "message-bubble",
                  style: Me(u.message_type === "system" || u.message_type === "rating" || u.message_type === "form" || u.message_type === "product" || u.shopify_output ? {} : u.message_type === "user" ? R(T) : R(M))
                }, [
                  u.message_type === "rating" ? (x(), S("div", xy, [
                    b("p", Sy, "Rate the chat session that you had with " + re(u.agent_name || R(P).human_agent_name || R(r) || "our agent"), 1),
                    b("div", {
                      class: Ue(["star-rating", { submitted: bt.value || u.isSubmitted }])
                    }, [
                      (x(), S(ze, null, At(5, (F) => b("button", {
                        key: F,
                        class: Ue(["star-button", {
                          warning: F <= (u.isSubmitted ? u.finalRating : Yt.value || u.selectedRating) && (u.isSubmitted ? u.finalRating : Yt.value || u.selectedRating) <= 3,
                          success: F <= (u.isSubmitted ? u.finalRating : Yt.value || u.selectedRating) && (u.isSubmitted ? u.finalRating : Yt.value || u.selectedRating) > 3,
                          selected: F <= (u.isSubmitted ? u.finalRating : Yt.value || u.selectedRating)
                        }]),
                        onMouseover: (on) => !u.isSubmitted && xs(F),
                        onMouseleave: (on) => !u.isSubmitted && qn,
                        onClick: (on) => !u.isSubmitted && as(F),
                        disabled: bt.value || u.isSubmitted
                      }, " ★ ", 42, Ay)), 64))
                    ], 2),
                    u.showFeedback && !u.isSubmitted ? (x(), S("div", Ey, [
                      b("div", Cy, [
                        Vn(b("input", {
                          "onUpdate:modelValue": (F) => u.feedback = F,
                          placeholder: "Please share your feedback (optional)",
                          disabled: bt.value,
                          maxlength: "500",
                          class: "feedback-input"
                        }, null, 8, Ry), [
                          [hs, u.feedback]
                        ]),
                        b("div", Iy, re(((xe = u.feedback) == null ? void 0 : xe.length) || 0) + "/500", 1)
                      ]),
                      b("button", {
                        onClick: (F) => Zt(u.session_id, Yt.value, u.feedback),
                        disabled: bt.value || !Yt.value,
                        class: "submit-rating-button",
                        style: Me({ backgroundColor: R(s).accent_color || "var(--accent-solid)" })
                      }, re(bt.value ? "Submitting..." : "Submit Rating"), 13, Ly)
                    ])) : le("", !0),
                    u.isSubmitted && u.finalFeedback ? (x(), S("div", Oy, [
                      b("div", Ny, [
                        b("p", Py, re(u.finalFeedback), 1)
                      ])
                    ])) : u.isSubmitted ? (x(), S("div", My, " Thank you for your rating! ")) : le("", !0)
                  ])) : u.message_type === "form" ? (x(), S("div", Dy, [
                    (ct = (me = u.attributes) == null ? void 0 : me.form_data) != null && ct.title || (Ye = (it = u.attributes) == null ? void 0 : it.form_data) != null && Ye.description ? (x(), S("div", Fy, [
                      (or = (ir = u.attributes) == null ? void 0 : ir.form_data) != null && or.title ? (x(), S("h3", $y, re(u.attributes.form_data.title), 1)) : le("", !0),
                      (Rs = (jn = u.attributes) == null ? void 0 : jn.form_data) != null && Rs.description ? (x(), S("p", By, re(u.attributes.form_data.description), 1)) : le("", !0)
                    ])) : le("", !0),
                    b("div", Uy, [
                      (x(!0), S(ze, null, At((qa = (Ha = u.attributes) == null ? void 0 : Ha.form_data) == null ? void 0 : qa.fields, (F) => {
                        var on, so;
                        return x(), S("div", {
                          key: F.name,
                          class: "form-field"
                        }, [
                          b("label", {
                            for: `form-${F.name}`,
                            class: "field-label"
                          }, [
                            Ln(re(F.label) + " ", 1),
                            F.required ? (x(), S("span", Hy, "*")) : le("", !0)
                          ], 8, zy),
                          F.type === "text" || F.type === "email" || F.type === "tel" ? (x(), S("input", {
                            key: 0,
                            id: `form-${F.name}`,
                            type: F.type,
                            placeholder: F.placeholder || "",
                            required: F.required,
                            minlength: F.minLength,
                            maxlength: F.maxLength,
                            value: ft.value[F.name] || "",
                            onInput: (qe) => It(F.name, qe.target.value),
                            onBlur: (qe) => It(F.name, qe.target.value),
                            class: Ue(["form-input", { error: Qe.value[F.name] }]),
                            disabled: ht.value,
                            autocomplete: F.type === "email" ? "email" : F.type === "tel" ? "tel" : "off",
                            inputmode: F.type === "tel" ? "tel" : F.type === "email" ? "email" : "text"
                          }, null, 42, qy)) : F.type === "number" ? (x(), S("input", {
                            key: 1,
                            id: `form-${F.name}`,
                            type: "number",
                            placeholder: F.placeholder || "",
                            required: F.required,
                            min: F.min,
                            max: F.max,
                            value: ft.value[F.name] || "",
                            onInput: (qe) => It(F.name, qe.target.value),
                            class: Ue(["form-input", { error: Qe.value[F.name] }]),
                            disabled: ht.value
                          }, null, 42, Wy)) : F.type === "textarea" ? (x(), S("textarea", {
                            key: 2,
                            id: `form-${F.name}`,
                            placeholder: F.placeholder || "",
                            required: F.required,
                            minlength: F.minLength,
                            maxlength: F.maxLength,
                            value: ft.value[F.name] || "",
                            onInput: (qe) => It(F.name, qe.target.value),
                            class: Ue(["form-textarea", { error: Qe.value[F.name] }]),
                            disabled: ht.value,
                            rows: "3"
                          }, null, 42, jy)) : F.type === "select" ? (x(), S("select", {
                            key: 3,
                            id: `form-${F.name}`,
                            required: F.required,
                            value: ft.value[F.name] || "",
                            onChange: (qe) => It(F.name, qe.target.value),
                            class: Ue(["form-select", { error: Qe.value[F.name] }]),
                            disabled: ht.value
                          }, [
                            b("option", Ky, re(F.placeholder || "Select an option"), 1),
                            (x(!0), S(ze, null, At((Array.isArray(F.options) ? F.options : ((on = F.options) == null ? void 0 : on.split(`
`)) || []).filter((qe) => qe.trim()), (qe) => (x(), S("option", {
                              key: qe.trim(),
                              value: qe.trim()
                            }, re(qe.trim()), 9, Gy))), 128))
                          ], 42, Vy)) : F.type === "checkbox" ? (x(), S("div", Yy, [
                            b("input", {
                              id: `form-${F.name}`,
                              type: "checkbox",
                              checked: ft.value[F.name] || !1,
                              onChange: (qe) => It(F.name, qe.target.checked),
                              class: "form-checkbox",
                              disabled: ht.value
                            }, null, 40, Xy),
                            b("label", {
                              for: `form-${F.name}`,
                              class: "checkbox-label"
                            }, re(F.placeholder || F.label), 9, Zy)
                          ])) : F.type === "radio" ? (x(), S("div", Jy, [
                            (x(!0), S(ze, null, At((Array.isArray(F.options) ? F.options : ((so = F.options) == null ? void 0 : so.split(`
`)) || []).filter((qe) => qe.trim()), (qe) => (x(), S("div", {
                              key: qe.trim(),
                              class: "radio-option"
                            }, [
                              b("input", {
                                id: `form-${F.name}-${qe.trim()}`,
                                name: `form-${F.name}`,
                                type: "radio",
                                value: qe.trim(),
                                checked: ft.value[F.name] === qe.trim(),
                                onChange: (vv) => It(F.name, qe.trim()),
                                class: "form-radio",
                                disabled: ht.value
                              }, null, 40, Qy),
                              b("label", {
                                for: `form-${F.name}-${qe.trim()}`,
                                class: "radio-label"
                              }, re(qe.trim()), 9, eb)
                            ]))), 128))
                          ])) : le("", !0),
                          Qe.value[F.name] ? (x(), S("div", tb, re(Qe.value[F.name]), 1)) : le("", !0)
                        ]);
                      }), 128))
                    ]),
                    b("div", nb, [
                      b("button", {
                        onClick: () => {
                          var F;
                          console.log("Regular form submit button clicked!"), Ss((F = u.attributes) == null ? void 0 : F.form_data);
                        },
                        disabled: ht.value,
                        class: "form-submit-button",
                        style: Me(R(T))
                      }, re(ht.value ? "Submitting..." : ((ja = (Wa = u.attributes) == null ? void 0 : Wa.form_data) == null ? void 0 : ja.submit_button_text) || "Submit"), 13, sb)
                    ])
                  ])) : u.message_type === "user_input" ? (x(), S("div", rb, [
                    (Va = u.attributes) != null && Va.prompt_message && u.attributes.prompt_message.trim() ? (x(), S("div", ib, re(u.attributes.prompt_message), 1)) : le("", !0),
                    u.isSubmitted ? (x(), S("div", cb, [
                      m[32] || (m[32] = b("strong", null, "Your input:", -1)),
                      Ln(" " + re(u.submittedValue) + " ", 1),
                      (Ka = u.attributes) != null && Ka.confirmation_message && u.attributes.confirmation_message.trim() ? (x(), S("div", ub, re(u.attributes.confirmation_message), 1)) : le("", !0)
                    ])) : (x(), S("div", ob, [
                      Vn(b("textarea", {
                        "onUpdate:modelValue": (F) => u.userInputValue = F,
                        class: "user-input-textarea",
                        placeholder: "Type your message here...",
                        rows: "3",
                        onKeydown: [
                          li(ms((F) => ls(u), ["ctrl"]), ["enter"]),
                          li(ms((F) => ls(u), ["meta"]), ["enter"])
                        ]
                      }, null, 40, ab), [
                        [hs, u.userInputValue]
                      ]),
                      b("button", {
                        class: "user-input-submit-button",
                        onClick: (F) => ls(u),
                        disabled: !u.userInputValue || !u.userInputValue.trim()
                      }, " Submit ", 8, lb)
                    ]))
                  ])) : u.shopify_output || u.message_type === "product" ? (x(), S("div", fb, [
                    u.message ? (x(), S("div", {
                      key: 0,
                      innerHTML: R(ui)(((Ya = (Ga = u.shopify_output) == null ? void 0 : Ga.products) == null ? void 0 : Ya.length) > 0 ? Yi(u.message) : u.message),
                      class: "product-message-text"
                    }, null, 8, hb)) : le("", !0),
                    (Xa = u.shopify_output) != null && Xa.products && u.shopify_output.products.length > 0 ? (x(), S("div", db, [
                      m[34] || (m[34] = b("h3", { class: "carousel-title" }, "Products", -1)),
                      b("div", pb, [
                        (x(!0), S(ze, null, At(u.shopify_output.products, (F) => {
                          var on;
                          return x(), S("div", {
                            key: F.id,
                            class: "product-card-compact carousel-item"
                          }, [
                            (on = F.image) != null && on.src ? (x(), S("div", mb, [
                              b("img", {
                                src: F.image.src,
                                alt: F.title,
                                class: "product-thumbnail"
                              }, null, 8, gb)
                            ])) : le("", !0),
                            b("div", _b, [
                              b("div", yb, [
                                b("div", bb, re(F.title), 1),
                                F.variant_title && F.variant_title !== "Default Title" ? (x(), S("div", vb, re(F.variant_title), 1)) : le("", !0),
                                b("div", wb, re(F.price_formatted || R(a)(F.price, F.currency)), 1)
                              ]),
                              b("div", kb, [
                                b("button", {
                                  class: "view-details-button-compact",
                                  onClick: (so) => {
                                    var qe;
                                    return Wr(F, (qe = u.shopify_output) == null ? void 0 : qe.shop_domain);
                                  }
                                }, m[33] || (m[33] = [
                                  Ln(" View product ", -1),
                                  b("span", { class: "external-link-icon" }, "↗", -1)
                                ]), 8, Tb)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])) : !u.message && ((Za = u.shopify_output) != null && Za.products) && u.shopify_output.products.length === 0 ? (x(), S("div", xb, m[35] || (m[35] = [
                      b("p", null, "No products found.", -1)
                    ]))) : !u.message && u.shopify_output && !u.shopify_output.products ? (x(), S("div", Sb, m[36] || (m[36] = [
                      b("p", null, "No products to display.", -1)
                    ]))) : le("", !0)
                  ])) : (x(), S(ze, { key: 4 }, [
                    R(Xe)(se) ? (x(), S("div", {
                      key: 0,
                      class: "message-streaming",
                      innerHTML: R(ui)(R(nt)(se, u.message))
                    }, null, 8, Ab)) : (x(), S("div", {
                      key: 1,
                      innerHTML: R(ui)(u.message)
                    }, null, 8, Eb)),
                    u.attachments && u.attachments.length > 0 ? (x(), S("div", Cb, [
                      (x(!0), S(ze, null, At(u.attachments, (F) => (x(), S("div", {
                        key: F.id,
                        class: "attachment-item"
                      }, [
                        R(rn)(F.content_type) ? (x(), S("div", Rb, [
                          b("img", {
                            src: R(kn)(F.file_url),
                            alt: F.filename,
                            class: "attachment-image",
                            onClick: ms((on) => R(os)({ url: F.file_url, filename: F.filename, type: F.content_type, file_url: R(kn)(F.file_url), size: void 0 }), ["stop"]),
                            style: { cursor: "pointer" }
                          }, null, 8, Ib),
                          b("div", Lb, [
                            b("a", {
                              href: R(kn)(F.file_url),
                              target: "_blank",
                              class: "attachment-link"
                            }, [
                              m[37] || (m[37] = b("svg", {
                                width: "14",
                                height: "14",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                "stroke-width": "2",
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round"
                              }, [
                                b("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                                b("polyline", { points: "7 10 12 15 17 10" }),
                                b("line", {
                                  x1: "12",
                                  y1: "15",
                                  x2: "12",
                                  y2: "3"
                                })
                              ], -1)),
                              Ln(" " + re(F.filename) + " ", 1),
                              b("span", Nb, "(" + re(R(wt)(F.file_size)) + ")", 1)
                            ], 8, Ob)
                          ])
                        ])) : (x(), S("a", {
                          key: 1,
                          href: R(kn)(F.file_url),
                          target: "_blank",
                          class: "attachment-link"
                        }, [
                          m[38] || (m[38] = b("svg", {
                            width: "14",
                            height: "14",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          }, [
                            b("path", { d: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" })
                          ], -1)),
                          Ln(" " + re(F.filename) + " ", 1),
                          b("span", Mb, "(" + re(R(wt)(F.file_size)) + ")", 1)
                        ], 8, Pb))
                      ]))), 128))
                    ])) : le("", !0)
                  ], 64))
                ], 4),
                Gr.value && (u.message_type === "bot" || u.message_type === "agent") && u.sources && u.sources.length ? (x(), S("div", Db, [
                  m[39] || (m[39] = b("span", { class: "citation-label" }, "Sources", -1)),
                  (x(!0), S(ze, null, At(u.sources, (F, on) => (x(), S("span", {
                    key: on,
                    class: "citation-chip",
                    title: Fa(F)
                  }, re(Ji(F)), 9, Fb))), 128))
                ])) : le("", !0),
                b("div", $b, [
                  u.message_type === "user" ? (x(), S("span", Bb, " You ")) : le("", !0)
                ])
              ])
            ], 2);
          }), 128)),
          R(h) ? (x(), S("div", {
            key: 1,
            class: Ue(["typing-indicator", { "reading-indicator": Gr.value }])
          }, [
            Gr.value ? (x(), S(ze, { key: 0 }, [
              m[40] || (m[40] = b("div", {
                class: "reading-bars",
                "aria-hidden": "true"
              }, [
                b("span"),
                b("span"),
                b("span")
              ], -1)),
              m[41] || (m[41] = b("span", { class: "reading-label" }, "reading knowledge base", -1))
            ], 64)) : (x(), S("div", {
              key: 1,
              class: "cm-typing-bubble",
              style: Me(R(M))
            }, m[42] || (m[42] = [
              b("span", { class: "cm-typing-dot" }, null, -1),
              b("span", { class: "cm-typing-dot" }, null, -1),
              b("span", { class: "cm-typing-dot" }, null, -1)
            ]), 4))
          ], 2)) : le("", !0)
        ], 512), [
          [ad, !cs.value]
        ]),
        Ju.value ? (x(), S("div", Ub, [
          (x(!0), S(ze, null, At(Xi.value, (u) => (x(), S("button", {
            key: u,
            type: "button",
            class: "cm-quick-action",
            disabled: !xn.value,
            onClick: (se) => $r(u)
          }, re(u), 9, zb))), 128))
        ])) : le("", !0),
        !Hn.value && !cs.value ? (x(), S("div", {
          key: 6,
          class: Ue(["chat-input", { "ask-anything-input": Jt.value }])
        }, [
          b("input", {
            ref_key: "fileInputRef",
            ref: Ie,
            type: "file",
            accept: pv,
            multiple: "",
            style: { display: "none" },
            onChange: m[7] || (m[7] = //@ts-ignore
            (...u) => R(Vs) && R(Vs)(...u))
          }, null, 544),
          R(Ee).length > 0 ? (x(), S("div", Hb, [
            (x(!0), S(ze, null, At(R(Ee), (u, se) => (x(), S("div", {
              key: se,
              class: "file-preview-widget"
            }, [
              b("div", qb, [
                R(ks)(u.type) ? (x(), S("img", {
                  key: 0,
                  src: R(js)(u),
                  alt: u.filename,
                  class: "file-preview-image-widget",
                  onClick: ms((xe) => R(os)(u), ["stop"]),
                  style: { cursor: "pointer" }
                }, null, 8, Wb)) : (x(), S("div", {
                  key: 1,
                  class: "file-preview-icon-widget",
                  onClick: ms((xe) => R(os)(u), ["stop"]),
                  style: { cursor: "pointer" }
                }, m[43] || (m[43] = [
                  b("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    b("path", { d: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" }),
                    b("polyline", { points: "13 2 13 9 20 9" })
                  ], -1)
                ]), 8, jb))
              ]),
              b("div", Vb, [
                b("div", Kb, re(u.filename), 1),
                b("div", Gb, re(R(wt)(u.size)), 1)
              ]),
              b("button", {
                type: "button",
                class: "file-preview-remove-widget",
                onClick: (xe) => R(Ks)(se),
                title: "Remove file"
              }, " × ", 8, Yb)
            ]))), 128))
          ])) : le("", !0),
          er.value ? (x(), S("div", Xb, m[44] || (m[44] = [
            b("div", { class: "upload-spinner-widget" }, null, -1),
            b("span", { class: "upload-text-widget" }, "Uploading files...", -1)
          ]))) : le("", !0),
          b("div", Zb, [
            Vn(b("input", {
              "onUpdate:modelValue": m[8] || (m[8] = (u) => Se.value = u),
              type: "text",
              placeholder: Ys.value,
              onKeypress: En,
              onInput: Ce,
              onChange: Ce,
              onPaste: m[9] || (m[9] = //@ts-ignore
              (...u) => R(Tn) && R(Tn)(...u)),
              onDrop: m[10] || (m[10] = //@ts-ignore
              (...u) => R(rs) && R(rs)(...u)),
              onDragover: m[11] || (m[11] = //@ts-ignore
              (...u) => R(is) && R(is)(...u)),
              onDragleave: m[12] || (m[12] = //@ts-ignore
              (...u) => R(qt) && R(qt)(...u)),
              disabled: !Sn.value,
              class: Ue({ disabled: !Sn.value, "ask-anything-field": Jt.value })
            }, null, 42, Jb), [
              [hs, Se.value]
            ]),
            Vr.value ? (x(), S("button", {
              key: 0,
              type: "button",
              class: "attach-button",
              disabled: er.value,
              onClick: m[13] || (m[13] = //@ts-ignore
              (...u) => R(Gs) && R(Gs)(...u)),
              title: `Attach files (${R(Ee).length}/${uc} used) or paste screenshots`
            }, m[45] || (m[45] = [
              b("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                b("path", {
                  d: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
                  stroke: "currentColor",
                  "stroke-width": "2.2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1),
              b("span", { class: "attach-button-glow" }, null, -1)
            ]), 8, Qb)) : le("", !0),
            b("button", {
              class: Ue(["send-button", { "ask-anything-send": Jt.value }]),
              "aria-label": "Send message",
              style: Me(R(T)),
              onClick: cn,
              disabled: !Se.value.trim() && R(Ee).length === 0 || !xn.value
            }, m[46] || (m[46] = [
              b("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                b("path", {
                  d: "M12 19V5M5 12l7-7 7 7",
                  stroke: "currentColor",
                  "stroke-width": "2.2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1)
            ]), 14, ev)
          ])
        ], 2)) : Hn.value && !cs.value ? (x(), S("div", tv, [
          b("div", nv, [
            m[47] || (m[47] = b("p", { class: "ended-text" }, "This chat has ended.", -1)),
            b("button", {
              class: "start-new-conversation-button",
              style: Me(R(T)),
              onClick: Ku
            }, " Click here to start a new conversation ", 4)
          ])
        ])) : le("", !0),
        Da.value ? (x(), S("div", sv, re(R(Xl)), 1)) : le("", !0)
      ], 6)) : le("", !0),
      zr.value ? (x(), S("div", rv, [
        b("div", iv, [
          m[48] || (m[48] = b("h3", null, "Rate your conversation", -1)),
          b("div", ov, [
            (x(), S(ze, null, At(5, (u) => b("button", {
              key: u,
              onClick: (se) => Ts.value = u,
              class: Ue([{ active: u <= Ts.value }, "star-button"])
            }, " ★ ", 10, av)), 64))
          ]),
          Vn(b("textarea", {
            "onUpdate:modelValue": m[14] || (m[14] = (u) => Zs.value = u),
            placeholder: "Additional feedback (optional)",
            class: "rating-feedback"
          }, null, 512), [
            [hs, Zs.value]
          ]),
          b("div", lv, [
            b("button", {
              onClick: m[15] || (m[15] = (u) => p.submitRating(Ts.value, Zs.value)),
              disabled: !Ts.value,
              class: "submit-button",
              style: Me(R(T))
            }, " Submit ", 12, cv),
            b("button", {
              onClick: m[16] || (m[16] = (u) => zr.value = !1),
              class: "skip-rating"
            }, " Skip ")
          ])
        ])
      ])) : le("", !0),
      R(Be) ? (x(), S("div", {
        key: 9,
        class: "preview-modal-overlay",
        onClick: m[19] || (m[19] = //@ts-ignore
        (...u) => R(ws) && R(ws)(...u))
      }, [
        b("div", {
          class: "preview-modal-content",
          onClick: m[18] || (m[18] = ms(() => {
          }, ["stop"]))
        }, [
          b("button", {
            class: "preview-modal-close",
            onClick: m[17] || (m[17] = //@ts-ignore
            (...u) => R(ws) && R(ws)(...u))
          }, "×"),
          R(Ze) && R(ks)(R(Ze).type) ? (x(), S("div", uv, [
            b("img", {
              src: R(js)(R(Ze)),
              alt: R(Ze).filename,
              class: "preview-modal-image"
            }, null, 8, fv),
            b("div", hv, re(R(Ze).filename), 1)
          ])) : le("", !0)
        ])
      ])) : le("", !0)
    ], 6)) : (x(), S("div", dv));
  }
}), gv = /* @__PURE__ */ Sa(mv, [["__scopeId", "data-v-de3e6421"]]);
window.process || (window.process = { env: { NODE_ENV: "production" } });
const tn = window.__INITIAL_DATA__, Wu = new URL(window.location.href), ju = Wu.searchParams.get("preview") === "true", Vu = (e) => {
  const t = Wu.searchParams.get(e);
  if (!(!t || t === "undefined" || t.trim() === ""))
    return t;
}, _v = ju ? Vu("widget_id") || (tn == null ? void 0 : tn.widgetId) || void 0 : (tn == null ? void 0 : tn.widgetId) || void 0, yv = ju ? (tn == null ? void 0 : tn.initialToken) || Vu("token") || void 0 : (tn == null ? void 0 : tn.initialToken) || void 0, bv = Ed(gv, {
  widgetId: _v,
  token: yv || void 0,
  initialAuthError: null
  // Let backend determine if auth is required
});
bv.mount("#app");
