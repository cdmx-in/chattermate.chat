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
const tt = {}, Ms = [], _n = () => {
}, uf = () => !1, Ni = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Qo = (e) => e.startsWith("onUpdate:"), Pt = Object.assign, ea = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ff = Object.prototype.hasOwnProperty, je = (e, t) => ff.call(e, t), be = Array.isArray, Fs = (e) => Pi(e) === "[object Map]", fc = (e) => Pi(e) === "[object Set]", ke = (e) => typeof e == "function", gt = (e) => typeof e == "string", ns = (e) => typeof e == "symbol", ut = (e) => e !== null && typeof e == "object", hc = (e) => (ut(e) || ke(e)) && ke(e.then) && ke(e.catch), dc = Object.prototype.toString, Pi = (e) => dc.call(e), hf = (e) => Pi(e).slice(8, -1), pc = (e) => Pi(e) === "[object Object]", ta = (e) => gt(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, kr = /* @__PURE__ */ Jo(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Mi = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, df = /-(\w)/g, Qn = Mi(
  (e) => e.replace(df, (t, n) => n ? n.toUpperCase() : "")
), pf = /\B([A-Z])/g, ss = Mi(
  (e) => e.replace(pf, "-$1").toLowerCase()
), mc = Mi((e) => e.charAt(0).toUpperCase() + e.slice(1)), io = Mi(
  (e) => e ? `on${mc(e)}` : ""
), Zn = (e, t) => !Object.is(e, t), ri = (e, ...t) => {
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
const Fi = () => Ja || (Ja = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Se(e) {
  if (be(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = gt(s) ? yf(s) : Se(s);
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
const _c = (e) => !!(e && e.__v_isRef === !0), se = (e) => gt(e) ? e : e == null ? "" : be(e) || ut(e) && (e.toString === dc || !ke(e.toString)) ? _c(e) ? se(e.value) : JSON.stringify(e, yc, 2) : String(e), yc = (e, t) => _c(t) ? yc(e, t.value) : Fs(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[oo(s, i) + " =>"] = r, n),
    {}
  )
} : fc(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => oo(n))
} : ns(t) ? oo(t) : ut(t) && !be(t) && !pc(t) ? String(t) : t, oo = (e, t = "") => {
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
const ao = /* @__PURE__ */ new WeakSet();
class bc {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, zt && zt.active && zt.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ao.has(this) && (ao.delete(this), this.trigger()));
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
    this.flags & 64 ? ao.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
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
let vc = 0, Tr, xr;
function wc(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = xr, xr = e;
    return;
  }
  e.next = Tr, Tr = e;
}
function na() {
  vc++;
}
function sa() {
  if (--vc > 0)
    return;
  if (xr) {
    let t = xr;
    for (xr = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Tr; ) {
    let t = Tr;
    for (Tr = void 0; t; ) {
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
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ir) || (e.globalVersion = Ir, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Oo(e))))
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
const Ac = [];
function Dn() {
  Ac.push(ln), ln = !1;
}
function $n() {
  const e = Ac.pop();
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
let Ir = 0;
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
      n = this.activeLink = new xf(ot, this), ot.deps ? (n.prevDep = ot.depsTail, ot.depsTail.nextDep = n, ot.depsTail = n) : ot.deps = ot.depsTail = n, Sc(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = ot.depsTail, n.nextDep = void 0, ot.depsTail.nextDep = n, ot.depsTail = n, ot.deps === n && (ot.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Ir++, this.notify(t);
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
function Sc(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Sc(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const No = /* @__PURE__ */ new WeakMap(), ys = Symbol(
  ""
), Po = Symbol(
  ""
), Lr = Symbol(
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
    Ir++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (na(), t === "clear")
    o.forEach(a);
  else {
    const l = be(e), d = l && ta(n);
    if (l && n === "length") {
      const c = Number(s);
      o.forEach((v, w) => {
        (w === "length" || w === Lr || !ns(w) && w >= c) && a(v);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && a(o.get(n)), d && a(o.get(Lr)), t) {
        case "add":
          l ? d && a(o.get("length")) : (a(o.get(ys)), Fs(e) && a(o.get(Po)));
          break;
        case "delete":
          l || (a(o.get(ys)), Fs(e) && a(o.get(Po)));
          break;
        case "set":
          Fs(e) && a(o.get(ys));
          break;
      }
  }
  sa();
}
function Ls(e) {
  const t = We(e);
  return t === e ? t : (Ot(t, "iterate", Lr), sn(e) ? t : t.map(Et));
}
function Di(e) {
  return Ot(e = We(e), "iterate", Lr), e;
}
const Af = {
  __proto__: null,
  [Symbol.iterator]() {
    return lo(this, Symbol.iterator, Et);
  },
  concat(...e) {
    return Ls(this).concat(
      ...e.map((t) => be(t) ? Ls(t) : t)
    );
  },
  entries() {
    return lo(this, "entries", (e) => (e[1] = Et(e[1]), e));
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
    return co(this, "includes", e);
  },
  indexOf(...e) {
    return co(this, "indexOf", e);
  },
  join(e) {
    return Ls(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return co(this, "lastIndexOf", e);
  },
  map(e, t) {
    return In(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return lr(this, "pop");
  },
  push(...e) {
    return lr(this, "push", e);
  },
  reduce(e, ...t) {
    return el(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return el(this, "reduceRight", e, t);
  },
  shift() {
    return lr(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return In(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return lr(this, "splice", e);
  },
  toReversed() {
    return Ls(this).toReversed();
  },
  toSorted(e) {
    return Ls(this).toSorted(e);
  },
  toSpliced(...e) {
    return Ls(this).toSpliced(...e);
  },
  unshift(...e) {
    return lr(this, "unshift", e);
  },
  values() {
    return lo(this, "values", Et);
  }
};
function lo(e, t, n) {
  const s = Di(e), r = s[t]();
  return s !== e && !sn(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.value && (i.value = n(i.value)), i;
  }), r;
}
const Sf = Array.prototype;
function In(e, t, n, s, r, i) {
  const o = Di(e), a = o !== e && !sn(e), l = o[t];
  if (l !== Sf[t]) {
    const v = l.apply(e, i);
    return a ? Et(v) : v;
  }
  let d = n;
  o !== e && (a ? d = function(v, w) {
    return n.call(this, Et(v), w, e);
  } : n.length > 2 && (d = function(v, w) {
    return n.call(this, v, w, e);
  }));
  const c = l.call(o, d, s);
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
function co(e, t, n) {
  const s = We(e);
  Ot(s, "iterate", Lr);
  const r = s[t](...n);
  return (r === -1 || r === !1) && la(n[0]) ? (n[0] = We(n[0]), s[t](...n)) : r;
}
function lr(e, t, n = []) {
  Dn(), na();
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
      if (o && (l = Af[n]))
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
    return (ns(n) ? Ec.has(n) : Ef(n)) || (r || Ot(t, "get", n), i) ? a : Nt(a) ? o && ta(n) ? a : a.value : ut(a) ? r ? Nc(a) : $i(a) : a;
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
      be(t) ? "length" : ys
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
const Mo = (e) => e, Zr = (e) => Reflect.getPrototypeOf(e);
function Nf(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = We(r), o = Fs(i), a = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, d = r[e](...s), c = n ? Mo : t ? vi : Et;
    return !t && Ot(
      i,
      "iterate",
      l ? Po : ys
    ), {
      // iterator protocol
      next() {
        const { value: v, done: w } = d.next();
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
function Jr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Pf(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = We(i), a = We(r);
      e || (Zn(r, a) && Ot(o, "get", r), Ot(o, "get", a));
      const { has: l } = Zr(o), d = t ? Mo : e ? vi : Et;
      if (l.call(o, r))
        return d(i.get(r));
      if (l.call(o, a))
        return d(i.get(a));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && Ot(We(r), "iterate", ys), Reflect.get(r, "size", r);
    },
    has(r) {
      const i = this.__v_raw, o = We(i), a = We(r);
      return e || (Zn(r, a) && Ot(o, "has", r), Ot(o, "has", a)), r === a ? i.has(r) : i.has(r) || i.has(a);
    },
    forEach(r, i) {
      const o = this, a = o.__v_raw, l = We(a), d = t ? Mo : e ? vi : Et;
      return !e && Ot(l, "iterate", ys), a.forEach((c, v) => r.call(i, d(c), d(v), o));
    }
  };
  return Pt(
    n,
    e ? {
      add: Jr("add"),
      set: Jr("set"),
      delete: Jr("delete"),
      clear: Jr("clear")
    } : {
      add(r) {
        !t && !sn(r) && !es(r) && (r = We(r));
        const i = We(this);
        return Zr(i).has.call(i, r) || (i.add(r), Nn(i, "add", r, r)), this;
      },
      set(r, i) {
        !t && !sn(i) && !es(i) && (i = We(i));
        const o = We(this), { has: a, get: l } = Zr(o);
        let d = a.call(o, r);
        d || (r = We(r), d = a.call(o, r));
        const c = l.call(o, r);
        return o.set(r, i), d ? Zn(i, c) && Nn(o, "set", r, i) : Nn(o, "add", r, i), this;
      },
      delete(r) {
        const i = We(this), { has: o, get: a } = Zr(i);
        let l = o.call(i, r);
        l || (r = We(r), l = o.call(i, r)), a && a.call(i, r);
        const d = i.delete(r);
        return l && Nn(i, "delete", r, void 0), d;
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
}, Ff = {
  get: /* @__PURE__ */ oa(!1, !0)
}, Df = {
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
function $i(e) {
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
    Ff,
    Lc
  );
}
function Nc(e) {
  return aa(
    e,
    !0,
    Lf,
    Df,
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
const Et = (e) => ut(e) ? $i(e) : e, vi = (e) => ut(e) ? Nc(e) : e;
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
function E(e) {
  return Nt(e) ? e.value : e;
}
const jf = {
  get: (e, t, n) => t === "__v_raw" ? e : E(Reflect.get(e, t, n)),
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
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ia(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ir - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
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
const Qr = {}, wi = /* @__PURE__ */ new WeakMap();
let ms;
function Gf(e, t = !1, n = ms) {
  if (n) {
    let s = wi.get(n);
    s || wi.set(n, s = []), s.push(e);
  }
}
function Yf(e, t, n = tt) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: a, call: l } = n, d = (R) => r ? R : sn(R) || r === !1 || r === 0 ? Pn(R, 1) : Pn(R);
  let c, v, w, z, I = !1, K = !1;
  if (Nt(e) ? (v = () => e.value, I = sn(e)) : Ds(e) ? (v = () => d(e), I = !0) : be(e) ? (K = !0, I = e.some((R) => Ds(R) || sn(R)), v = () => e.map((R) => {
    if (Nt(R))
      return R.value;
    if (Ds(R))
      return d(R);
    if (ke(R))
      return l ? l(R, 2) : R();
  })) : ke(e) ? t ? v = l ? () => l(e, 2) : e : v = () => {
    if (w) {
      Dn();
      try {
        w();
      } finally {
        $n();
      }
    }
    const R = ms;
    ms = c;
    try {
      return l ? l(e, 3, [z]) : e(z);
    } finally {
      ms = R;
    }
  } : v = _n, t && r) {
    const R = v, N = r === !0 ? 1 / 0 : r;
    v = () => Pn(R(), N);
  }
  const F = kf(), oe = () => {
    c.stop(), F && F.active && ea(F.effects, c);
  };
  if (i && t) {
    const R = t;
    t = (...N) => {
      R(...N), oe();
    };
  }
  let fe = K ? new Array(e.length).fill(Qr) : Qr;
  const pe = (R) => {
    if (!(!(c.flags & 1) || !c.dirty && !R))
      if (t) {
        const N = c.run();
        if (r || I || (K ? N.some((Y, Z) => Zn(Y, fe[Z])) : Zn(N, fe))) {
          w && w();
          const Y = ms;
          ms = c;
          try {
            const Z = [
              N,
              // pass undefined as the old value when it's changed for the first time
              fe === Qr ? void 0 : K && fe[0] === Qr ? [] : fe,
              z
            ];
            fe = N, l ? l(t, 3, Z) : (
              // @ts-expect-error
              t(...Z)
            );
          } finally {
            ms = Y;
          }
        }
      } else
        c.run();
  };
  return a && a(pe), c = new bc(v), c.scheduler = o ? () => o(pe, !1) : pe, z = (R) => Gf(R, !1, c), w = c.onStop = () => {
    const R = wi.get(c);
    if (R) {
      if (l)
        l(R, 4);
      else
        for (const N of R) N();
      wi.delete(c);
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
  else if (fc(e) || Fs(e))
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
function Mr(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Bi(r, t, n);
  }
}
function vn(e, t, n, s) {
  if (ke(e)) {
    const r = Mr(e, t, n, s);
    return r && hc(r) && r.catch((i) => {
      Bi(i, t, n);
    }), r;
  }
  if (be(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(vn(e[i], t, n, s));
    return r;
  }
}
function Bi(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || tt;
  if (t) {
    let a = t.parent;
    const l = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const c = a.ec;
      if (c) {
        for (let v = 0; v < c.length; v++)
          if (c[v](e, l, d) === !1)
            return;
      }
      a = a.parent;
    }
    if (i) {
      Dn(), Mr(i, null, 10, [
        e,
        l,
        d
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
const $s = [];
let Gn = null, Os = 0;
const Mc = /* @__PURE__ */ Promise.resolve();
let ki = null;
function bs(e) {
  const t = ki || Mc;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Zf(e) {
  let t = mn + 1, n = $t.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = $t[s], i = Or(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function ca(e) {
  if (!(e.flags & 1)) {
    const t = Or(e), n = $t[$t.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Or(n) ? $t.push(e) : $t.splice(Zf(t), 0, e), e.flags |= 1, Fc();
  }
}
function Fc() {
  ki || (ki = Mc.then($c));
}
function Jf(e) {
  be(e) ? $s.push(...e) : Gn && e.id === -1 ? Gn.splice(Os + 1, 0, e) : e.flags & 1 || ($s.push(e), e.flags |= 1), Fc();
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
function Dc(e) {
  if ($s.length) {
    const t = [...new Set($s)].sort(
      (n, s) => Or(n) - Or(s)
    );
    if ($s.length = 0, Gn) {
      Gn.push(...t);
      return;
    }
    for (Gn = t, Os = 0; Os < Gn.length; Os++) {
      const n = Gn[Os];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Gn = null, Os = 0;
  }
}
const Or = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function $c(e) {
  try {
    for (mn = 0; mn < $t.length; mn++) {
      const t = $t[mn];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Mr(
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
    mn = -1, $t.length = 0, Dc(), ki = null, ($t.length || $s.length) && $c();
  }
}
let nn = null, Bc = null;
function Ti(e) {
  const t = nn;
  return nn = e, Bc = e && e.type.__scopeId || null, t;
}
function Qf(e, t = nn, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && ul(-1);
    const i = Ti(t);
    let o;
    try {
      o = e(...r);
    } finally {
      Ti(i), s._d && ul(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Vn(e, t) {
  if (nn === null)
    return e;
  const n = Wi(nn), s = e.dirs || (e.dirs = []);
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
    l && (Dn(), vn(l, n, 8, [
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
function Ar(e, t, n, s, r = !1) {
  if (be(e)) {
    e.forEach(
      (I, K) => Ar(
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
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Ar(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? Wi(s.component) : s.el, o = r ? null : i, { i: a, r: l } = e, d = t && t.r, c = a.refs === tt ? a.refs = {} : a.refs, v = a.setupState, w = We(v), z = v === tt ? () => !1 : (I) => je(w, I);
  if (d != null && d !== l && (gt(d) ? (c[d] = null, z(d) && (v[d] = null)) : Nt(d) && (d.value = null)), ke(l))
    Mr(l, a, 12, [o, c]);
  else {
    const I = gt(l), K = Nt(l);
    if (I || K) {
      const F = () => {
        if (e.f) {
          const oe = I ? z(l) ? v[l] : c[l] : l.value;
          r ? be(oe) && ea(oe, i) : be(oe) ? oe.includes(i) || oe.push(i) : I ? (c[l] = [i], z(l) && (v[l] = c[l])) : (l.value = [i], e.k && (c[e.k] = l.value));
        } else I ? (c[l] = o, z(l) && (v[l] = o)) : K && (l.value = o, e.k && (c[e.k] = o));
      };
      o ? (F.id = -1, jt(F, n)) : F();
    }
  }
}
Fi().requestIdleCallback;
Fi().cancelIdleCallback;
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
  if (Ui(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      zc(r.parent.vnode) && rh(s, t, n, r), r = r.parent;
  }
}
function rh(e, t, n, s) {
  const r = Ui(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Fr(() => {
    ea(s[t], r);
  }, n);
}
function Ui(e, t, n = Bt, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Dn();
      const a = Dr(n), l = vn(t, n, e, o);
      return a(), $n(), l;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Bn = (e) => (t, n = Bt) => {
  (!Pr || e === "sp") && Ui(e, (...s) => t(...s), n);
}, ih = Bn("bm"), zi = Bn("m"), oh = Bn(
  "bu"
), ah = Bn("u"), qc = Bn(
  "bum"
), Fr = Bn("um"), lh = Bn(
  "sp"
), ch = Bn("rtg"), uh = Bn("rtc");
function fh(e, t = Bt) {
  Ui("ec", e, t);
}
const hh = Symbol.for("v-ndc");
function St(e, t, n, s) {
  let r;
  const i = n, o = be(e);
  if (o || gt(e)) {
    const a = o && Ds(e);
    let l = !1, d = !1;
    a && (l = !sn(e), d = es(e), e = Di(e)), r = new Array(e.length);
    for (let c = 0, v = e.length; c < v; c++)
      r[c] = t(
        l ? d ? vi(Et(e[c])) : Et(e[c]) : e[c],
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
      for (let l = 0, d = a.length; l < d; l++) {
        const c = a[l];
        r[l] = t(e[c], c, l, i);
      }
    }
  else
    r = [];
  return r;
}
const Fo = (e) => e ? uu(e) ? Wi(e) : Fo(e.parent) : null, Er = (
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
    $parent: (e) => Fo(e.parent),
    $root: (e) => Fo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => jc(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ca(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = bs.bind(e.proxy)),
    $watch: (e) => Ph.bind(e)
  })
), uo = (e, t) => e !== tt && !e.__isScriptSetup && je(e, t), dh = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: a, appContext: l } = e;
    let d;
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
        if (uo(s, t))
          return o[t] = 1, s[t];
        if (r !== tt && je(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && je(d, t)
        )
          return o[t] = 3, i[t];
        if (n !== tt && je(n, t))
          return o[t] = 4, n[t];
        Do && (o[t] = 0);
      }
    }
    const c = Er[t];
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
    return uo(r, t) ? (r[t] = n, !0) : s !== tt && je(s, t) ? (s[t] = n, !0) : je(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i }
  }, o) {
    let a;
    return !!n[o] || e !== tt && je(e, o) || uo(t, o) || (a = i[0]) && je(a, o) || je(s, o) || je(Er, o) || je(r.config.globalProperties, o);
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
let Do = !0;
function ph(e) {
  const t = jc(e), n = e.proxy, s = e.ctx;
  Do = !1, t.beforeCreate && sl(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: a,
    provide: l,
    inject: d,
    // lifecycle
    created: c,
    beforeMount: v,
    mounted: w,
    beforeUpdate: z,
    updated: I,
    activated: K,
    deactivated: F,
    beforeDestroy: oe,
    beforeUnmount: fe,
    destroyed: pe,
    unmounted: R,
    render: N,
    renderTracked: Y,
    renderTriggered: Z,
    errorCaptured: Te,
    serverPrefetch: Oe,
    // public API
    expose: _e,
    inheritAttrs: Fe,
    // assets
    components: ve,
    directives: Ke,
    filters: Ge
  } = t;
  if (d && mh(d, s, null), o)
    for (const ye in o) {
      const ge = o[ye];
      ke(ge) && (s[ye] = ge.bind(n));
    }
  if (r) {
    const ye = r.call(n, n);
    ut(ye) && (e.data = $i(ye));
  }
  if (Do = !0, i)
    for (const ye in i) {
      const ge = i[ye], nt = ke(ge) ? ge.bind(n, n) : ke(ge.get) ? ge.get.bind(n, n) : _n, Xe = !ke(ge) && ke(ge.set) ? ge.set.bind(n) : _n, xe = de({
        get: nt,
        set: Xe
      });
      Object.defineProperty(s, ye, {
        enumerable: !0,
        configurable: !0,
        get: () => xe.value,
        set: (Je) => xe.value = Je
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
  if (ue(ih, v), ue(zi, w), ue(oh, z), ue(ah, I), ue(nh, K), ue(sh, F), ue(fh, Te), ue(uh, Y), ue(ch, Z), ue(qc, fe), ue(Fr, R), ue(lh, Oe), be(_e))
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
  N && e.render === _n && (e.render = N), Fe != null && (e.inheritAttrs = Fe), ve && (e.components = ve), Ke && (e.directives = Ke), Oe && Uc(e);
}
function mh(e, t, n = _n) {
  be(e) && (e = $o(e));
  for (const s in e) {
    const r = e[s];
    let i;
    ut(r) ? "default" in r ? i = ii(
      r.from || s,
      r.default,
      !0
    ) : i = ii(r.from || s) : i = ii(r), Nt(i) ? Object.defineProperty(t, s, {
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
    ke(i) && Dt(r, i);
  } else if (ke(e))
    Dt(r, e.bind(n));
  else if (ut(e))
    if (be(e))
      e.forEach((i) => Wc(i, t, n, s));
    else {
      const i = ke(e.handler) ? e.handler.bind(n) : t[e.handler];
      ke(i) && Dt(r, i, e);
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
    (d) => xi(l, d, o, !0)
  ), xi(l, t, o)), ut(t) && i.set(t, l), l;
}
function xi(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && xi(e, i, n, !0), r && r.forEach(
    (o) => xi(e, o, n, !0)
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
  methods: yr,
  computed: yr,
  // lifecycle
  beforeCreate: Ft,
  created: Ft,
  beforeMount: Ft,
  mounted: Ft,
  beforeUpdate: Ft,
  updated: Ft,
  beforeDestroy: Ft,
  beforeUnmount: Ft,
  destroyed: Ft,
  unmounted: Ft,
  activated: Ft,
  deactivated: Ft,
  errorCaptured: Ft,
  serverPrefetch: Ft,
  // assets
  components: yr,
  directives: yr,
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
  return yr($o(e), $o(t));
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
function Ft(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function yr(e, t) {
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
    n[s] = Ft(e[s], t[s]);
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
    const d = i.app = {
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
        return o.has(c) || (c && ke(c.install) ? (o.add(c), c.install(d, ...v)) : ke(c) && (o.add(c), c(d, ...v))), d;
      },
      mixin(c) {
        return i.mixins.includes(c) || i.mixins.push(c), d;
      },
      component(c, v) {
        return v ? (i.components[c] = v, d) : i.components[c];
      },
      directive(c, v) {
        return v ? (i.directives[c] = v, d) : i.directives[c];
      },
      mount(c, v, w) {
        if (!l) {
          const z = d._ceVNode || yn(s, r);
          return z.appContext = i, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(z, c, w), l = !0, d._container = c, c.__vue_app__ = d, Wi(z.component);
        }
      },
      onUnmount(c) {
        a.push(c);
      },
      unmount() {
        l && (vn(
          a,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(c, v) {
        return i.provides[c] = v, d;
      },
      runWithContext(c) {
        const v = Bs;
        Bs = d;
        try {
          return c();
        } finally {
          Bs = v;
        }
      }
    };
    return d;
  };
}
let Bs = null;
function wh(e, t) {
  if (Bt) {
    let n = Bt.provides;
    const s = Bt.parent && Bt.parent.provides;
    s === n && (n = Bt.provides = Object.create(s)), n[e] = t;
  }
}
function ii(e, t, n = !1) {
  const s = Yh();
  if (s || Bs) {
    let r = Bs ? Bs._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
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
  let d = !1;
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
        if (Hi(e.emitsOptions, w))
          continue;
        const z = t[w];
        if (l)
          if (je(i, w))
            z !== i[w] && (i[w] = z, d = !0);
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
          z !== i[w] && (i[w] = z, d = !0);
      }
    }
  } else {
    Xc(e, t, r, i) && (d = !0);
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
        (!t || !je(t, v)) && (delete i[v], d = !0);
  }
  d && Nn(e.attrs, "set", "");
}
function Xc(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, a;
  if (t)
    for (let l in t) {
      if (kr(l))
        continue;
      const d = t[l];
      let c;
      r && je(r, c = Qn(l)) ? !i || !i.includes(c) ? n[c] = d : (a || (a = {}))[c] = d : Hi(e.emitsOptions, l) || (!(l in s) || d !== s[l]) && (s[l] = d, o = !0);
    }
  if (i) {
    const l = We(n), d = a || tt;
    for (let c = 0; c < i.length; c++) {
      const v = i[c];
      n[v] = Bo(
        r,
        l,
        v,
        d[v],
        e,
        !je(d, v)
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
        const { propsDefaults: d } = r;
        if (n in d)
          s = d[n];
        else {
          const c = Dr(r);
          s = d[n] = l.call(
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
    return ut(e) && s.set(e, Ms), Ms;
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
        let K = !1, F = !0;
        if (be(I))
          for (let oe = 0; oe < I.length; ++oe) {
            const fe = I[oe], pe = ke(fe) && fe.name;
            if (pe === "Boolean") {
              K = !0;
              break;
            } else pe === "String" && (F = !1);
          }
        else
          K = ke(I) && I.name === "Boolean";
        z[
          0
          /* shouldCast */
        ] = K, z[
          1
          /* shouldCastTrue */
        ] = F, (K || je(z, "default")) && a.push(v);
      }
    }
  const d = [o, a];
  return ut(e) && s.set(e, d), d;
}
function ol(e) {
  return e[0] !== "$" && !kr(e);
}
const ha = (e) => e === "_" || e === "__" || e === "_ctx" || e === "$stable", da = (e) => be(e) ? e.map(gn) : [gn(e)], Ah = (e, t, n) => {
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
      t[r] = Ah(r, i, s);
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
}, Sh = (e, t, n) => {
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
  const n = Fi();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: a,
    createComment: l,
    setText: d,
    setElementText: c,
    parentNode: v,
    nextSibling: w,
    setScopeId: z = _n,
    insertStaticContent: I
  } = e, K = (g, y, C, P = null, $ = null, L = null, G = void 0, q = null, W = !!y.dynamicChildren) => {
    if (g === y)
      return;
    g && !cr(g, y) && (P = pt(g), Je(g, $, L, !0), g = null), y.patchFlag === -2 && (W = !1, y.dynamicChildren = null);
    const { type: U, ref: te, shapeFlag: X } = y;
    switch (U) {
      case qi:
        F(g, y, C, P);
        break;
      case ts:
        oe(g, y, C, P);
        break;
      case oi:
        g == null && fe(y, C, P, G);
        break;
      case ze:
        ve(
          g,
          y,
          C,
          P,
          $,
          L,
          G,
          q,
          W
        );
        break;
      default:
        X & 1 ? N(
          g,
          y,
          C,
          P,
          $,
          L,
          G,
          q,
          W
        ) : X & 6 ? Ke(
          g,
          y,
          C,
          P,
          $,
          L,
          G,
          q,
          W
        ) : (X & 64 || X & 128) && U.process(
          g,
          y,
          C,
          P,
          $,
          L,
          G,
          q,
          W,
          Mt
        );
    }
    te != null && $ ? Ar(te, g && g.ref, L, y || g, !y) : te == null && g && g.ref != null && Ar(g.ref, null, L, g, !0);
  }, F = (g, y, C, P) => {
    if (g == null)
      s(
        y.el = a(y.children),
        C,
        P
      );
    else {
      const $ = y.el = g.el;
      y.children !== g.children && d($, y.children);
    }
  }, oe = (g, y, C, P) => {
    g == null ? s(
      y.el = l(y.children || ""),
      C,
      P
    ) : y.el = g.el;
  }, fe = (g, y, C, P) => {
    [g.el, g.anchor] = I(
      g.children,
      y,
      C,
      P,
      g.el,
      g.anchor
    );
  }, pe = ({ el: g, anchor: y }, C, P) => {
    let $;
    for (; g && g !== y; )
      $ = w(g), s(g, C, P), g = $;
    s(y, C, P);
  }, R = ({ el: g, anchor: y }) => {
    let C;
    for (; g && g !== y; )
      C = w(g), r(g), g = C;
    r(y);
  }, N = (g, y, C, P, $, L, G, q, W) => {
    y.type === "svg" ? G = "svg" : y.type === "math" && (G = "mathml"), g == null ? Y(
      y,
      C,
      P,
      $,
      L,
      G,
      q,
      W
    ) : Oe(
      g,
      y,
      $,
      L,
      G,
      q,
      W
    );
  }, Y = (g, y, C, P, $, L, G, q) => {
    let W, U;
    const { props: te, shapeFlag: X, transition: S, dirs: O } = g;
    if (W = g.el = o(
      g.type,
      L,
      te && te.is,
      te
    ), X & 8 ? c(W, g.children) : X & 16 && Te(
      g.children,
      W,
      null,
      P,
      $,
      fo(g, L),
      G,
      q
    ), O && us(g, null, P, "created"), Z(W, g, g.scopeId, G, P), te) {
      for (const J in te)
        J !== "value" && !kr(J) && i(W, J, null, te[J], L, P);
      "value" in te && i(W, "value", null, te.value, L), (U = te.onVnodeBeforeMount) && hn(U, P, g);
    }
    O && us(g, null, P, "beforeMount");
    const V = Ih($, S);
    V && S.beforeEnter(W), s(W, y, C), ((U = te && te.onVnodeMounted) || V || O) && jt(() => {
      U && hn(U, P, g), V && S.enter(W), O && us(g, null, P, "mounted");
    }, $);
  }, Z = (g, y, C, P, $) => {
    if (C && z(g, C), P)
      for (let L = 0; L < P.length; L++)
        z(g, P[L]);
    if ($) {
      let L = $.subTree;
      if (y === L || ou(L.type) && (L.ssContent === y || L.ssFallback === y)) {
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
  }, Te = (g, y, C, P, $, L, G, q, W = 0) => {
    for (let U = W; U < g.length; U++) {
      const te = g[U] = q ? Yn(g[U]) : gn(g[U]);
      K(
        null,
        te,
        y,
        C,
        P,
        $,
        L,
        G,
        q
      );
    }
  }, Oe = (g, y, C, P, $, L, G) => {
    const q = y.el = g.el;
    let { patchFlag: W, dynamicChildren: U, dirs: te } = y;
    W |= g.patchFlag & 16;
    const X = g.props || tt, S = y.props || tt;
    let O;
    if (C && fs(C, !1), (O = S.onVnodeBeforeUpdate) && hn(O, C, y, g), te && us(y, g, C, "beforeUpdate"), C && fs(C, !0), (X.innerHTML && S.innerHTML == null || X.textContent && S.textContent == null) && c(q, ""), U ? _e(
      g.dynamicChildren,
      U,
      q,
      C,
      P,
      fo(y, $),
      L
    ) : G || ge(
      g,
      y,
      q,
      null,
      C,
      P,
      fo(y, $),
      L,
      !1
    ), W > 0) {
      if (W & 16)
        Fe(q, X, S, C, $);
      else if (W & 2 && X.class !== S.class && i(q, "class", null, S.class, $), W & 4 && i(q, "style", X.style, S.style, $), W & 8) {
        const V = y.dynamicProps;
        for (let J = 0; J < V.length; J++) {
          const ae = V[J], we = X[ae], Ee = S[ae];
          (Ee !== we || ae === "value") && i(q, ae, we, Ee, $, C);
        }
      }
      W & 1 && g.children !== y.children && c(q, y.children);
    } else !G && U == null && Fe(q, X, S, C, $);
    ((O = S.onVnodeUpdated) || te) && jt(() => {
      O && hn(O, C, y, g), te && us(y, g, C, "updated");
    }, P);
  }, _e = (g, y, C, P, $, L, G) => {
    for (let q = 0; q < y.length; q++) {
      const W = g[q], U = y[q], te = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        W.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (W.type === ze || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !cr(W, U) || // - In the case of a component, it could contain anything.
        W.shapeFlag & 198) ? v(W.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          C
        )
      );
      K(
        W,
        U,
        te,
        null,
        P,
        $,
        L,
        G,
        !0
      );
    }
  }, Fe = (g, y, C, P, $) => {
    if (y !== C) {
      if (y !== tt)
        for (const L in y)
          !kr(L) && !(L in C) && i(
            g,
            L,
            y[L],
            null,
            $,
            P
          );
      for (const L in C) {
        if (kr(L)) continue;
        const G = C[L], q = y[L];
        G !== q && L !== "value" && i(g, L, q, G, $, P);
      }
      "value" in C && i(g, "value", y.value, C.value, $);
    }
  }, ve = (g, y, C, P, $, L, G, q, W) => {
    const U = y.el = g ? g.el : a(""), te = y.anchor = g ? g.anchor : a("");
    let { patchFlag: X, dynamicChildren: S, slotScopeIds: O } = y;
    O && (q = q ? q.concat(O) : O), g == null ? (s(U, C, P), s(te, C, P), Te(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      y.children || [],
      C,
      te,
      $,
      L,
      G,
      q,
      W
    )) : X > 0 && X & 64 && S && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    g.dynamicChildren ? (_e(
      g.dynamicChildren,
      S,
      C,
      $,
      L,
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
      C,
      te,
      $,
      L,
      G,
      q,
      W
    );
  }, Ke = (g, y, C, P, $, L, G, q, W) => {
    y.slotScopeIds = q, g == null ? y.shapeFlag & 512 ? $.ctx.activate(
      y,
      C,
      P,
      G,
      W
    ) : Ge(
      y,
      C,
      P,
      $,
      L,
      G,
      W
    ) : at(g, y, W);
  }, Ge = (g, y, C, P, $, L, G) => {
    const q = g.component = Gh(
      g,
      P,
      $
    );
    if (zc(g) && (q.ctx.renderer = Mt), Xh(q, !1, G), q.asyncDep) {
      if ($ && $.registerDep(q, ue, G), !g.el) {
        const W = q.subTree = yn(ts);
        oe(null, W, y, C), g.placeholder = W.el;
      }
    } else
      ue(
        q,
        g,
        y,
        C,
        $,
        L,
        G
      );
  }, at = (g, y, C) => {
    const P = y.component = g.component;
    if (Bh(g, y, C))
      if (P.asyncDep && !P.asyncResolved) {
        ye(P, y, C);
        return;
      } else
        P.next = y, P.update();
    else
      y.el = g.el, P.vnode = y;
  }, ue = (g, y, C, P, $, L, G) => {
    const q = () => {
      if (g.isMounted) {
        let { next: X, bu: S, u: O, parent: V, vnode: J } = g;
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
        fs(g, !1), X ? (X.el = J.el, ye(g, X, G)) : X = J, S && ri(S), (we = X.props && X.props.onVnodeBeforeUpdate) && hn(we, V, X, J), fs(g, !0);
        const Ee = ll(g), Me = g.subTree;
        g.subTree = Ee, K(
          Me,
          Ee,
          // parent may have changed if it's in a teleport
          v(Me.el),
          // anchor may have changed if it's in a fragment
          pt(Me),
          g,
          $,
          L
        ), X.el = Ee.el, ae === null && Uh(g, Ee.el), O && jt(O, $), (we = X.props && X.props.onVnodeUpdated) && jt(
          () => hn(we, V, X, J),
          $
        );
      } else {
        let X;
        const { el: S, props: O } = y, { bm: V, m: J, parent: ae, root: we, type: Ee } = g, Me = Sr(y);
        fs(g, !1), V && ri(V), !Me && (X = O && O.onVnodeBeforeMount) && hn(X, ae, y), fs(g, !0);
        {
          we.ce && // @ts-expect-error _def is private
          we.ce._def.shadowRoot !== !1 && we.ce._injectChildStyle(Ee);
          const f = g.subTree = ll(g);
          K(
            null,
            f,
            C,
            P,
            g,
            $,
            L
          ), y.el = f.el;
        }
        if (J && jt(J, $), !Me && (X = O && O.onVnodeMounted)) {
          const f = y;
          jt(
            () => hn(X, ae, f),
            $
          );
        }
        (y.shapeFlag & 256 || ae && Sr(ae.vnode) && ae.vnode.shapeFlag & 256) && g.a && jt(g.a, $), g.isMounted = !0, y = C = P = null;
      }
    };
    g.scope.on();
    const W = g.effect = new bc(q);
    g.scope.off();
    const U = g.update = W.run.bind(W), te = g.job = W.runIfDirty.bind(W);
    te.i = g, te.id = g.uid, W.scheduler = () => ca(te), fs(g, !0), U();
  }, ye = (g, y, C) => {
    y.component = g;
    const P = g.vnode.props;
    g.vnode = y, g.next = null, Th(g, y.props, P, C), Eh(g, y.children, C), Dn(), tl(g), $n();
  }, ge = (g, y, C, P, $, L, G, q, W = !1) => {
    const U = g && g.children, te = g ? g.shapeFlag : 0, X = y.children, { patchFlag: S, shapeFlag: O } = y;
    if (S > 0) {
      if (S & 128) {
        Xe(
          U,
          X,
          C,
          P,
          $,
          L,
          G,
          q,
          W
        );
        return;
      } else if (S & 256) {
        nt(
          U,
          X,
          C,
          P,
          $,
          L,
          G,
          q,
          W
        );
        return;
      }
    }
    O & 8 ? (te & 16 && yt(U, $, L), X !== U && c(C, X)) : te & 16 ? O & 16 ? Xe(
      U,
      X,
      C,
      P,
      $,
      L,
      G,
      q,
      W
    ) : yt(U, $, L, !0) : (te & 8 && c(C, ""), O & 16 && Te(
      X,
      C,
      P,
      $,
      L,
      G,
      q,
      W
    ));
  }, nt = (g, y, C, P, $, L, G, q, W) => {
    g = g || Ms, y = y || Ms;
    const U = g.length, te = y.length, X = Math.min(U, te);
    let S;
    for (S = 0; S < X; S++) {
      const O = y[S] = W ? Yn(y[S]) : gn(y[S]);
      K(
        g[S],
        O,
        C,
        null,
        $,
        L,
        G,
        q,
        W
      );
    }
    U > te ? yt(
      g,
      $,
      L,
      !0,
      !1,
      X
    ) : Te(
      y,
      C,
      P,
      $,
      L,
      G,
      q,
      W,
      X
    );
  }, Xe = (g, y, C, P, $, L, G, q, W) => {
    let U = 0;
    const te = y.length;
    let X = g.length - 1, S = te - 1;
    for (; U <= X && U <= S; ) {
      const O = g[U], V = y[U] = W ? Yn(y[U]) : gn(y[U]);
      if (cr(O, V))
        K(
          O,
          V,
          C,
          null,
          $,
          L,
          G,
          q,
          W
        );
      else
        break;
      U++;
    }
    for (; U <= X && U <= S; ) {
      const O = g[X], V = y[S] = W ? Yn(y[S]) : gn(y[S]);
      if (cr(O, V))
        K(
          O,
          V,
          C,
          null,
          $,
          L,
          G,
          q,
          W
        );
      else
        break;
      X--, S--;
    }
    if (U > X) {
      if (U <= S) {
        const O = S + 1, V = O < te ? y[O].el : P;
        for (; U <= S; )
          K(
            null,
            y[U] = W ? Yn(y[U]) : gn(y[U]),
            C,
            V,
            $,
            L,
            G,
            q,
            W
          ), U++;
      }
    } else if (U > S)
      for (; U <= X; )
        Je(g[U], $, L, !0), U++;
    else {
      const O = U, V = U, J = /* @__PURE__ */ new Map();
      for (U = V; U <= S; U++) {
        const T = y[U] = W ? Yn(y[U]) : gn(y[U]);
        T.key != null && J.set(T.key, U);
      }
      let ae, we = 0;
      const Ee = S - V + 1;
      let Me = !1, f = 0;
      const _ = new Array(Ee);
      for (U = 0; U < Ee; U++) _[U] = 0;
      for (U = O; U <= X; U++) {
        const T = g[U];
        if (we >= Ee) {
          Je(T, $, L, !0);
          continue;
        }
        let H;
        if (T.key != null)
          H = J.get(T.key);
        else
          for (ae = V; ae <= S; ae++)
            if (_[ae - V] === 0 && cr(T, y[ae])) {
              H = ae;
              break;
            }
        H === void 0 ? Je(T, $, L, !0) : (_[H - V] = U + 1, H >= f ? f = H : Me = !0, K(
          T,
          y[H],
          C,
          null,
          $,
          L,
          G,
          q,
          W
        ), we++);
      }
      const M = Me ? Lh(_) : Ms;
      for (ae = M.length - 1, U = Ee - 1; U >= 0; U--) {
        const T = V + U, H = y[T], ne = y[T + 1], ee = T + 1 < te ? (
          // #13559, fallback to el placeholder for unresolved async component
          ne.el || ne.placeholder
        ) : P;
        _[U] === 0 ? K(
          null,
          H,
          C,
          ee,
          $,
          L,
          G,
          q,
          W
        ) : Me && (ae < 0 || U !== M[ae] ? xe(H, C, ee, 2) : ae--);
      }
    }
  }, xe = (g, y, C, P, $ = null) => {
    const { el: L, type: G, transition: q, children: W, shapeFlag: U } = g;
    if (U & 6) {
      xe(g.component.subTree, y, C, P);
      return;
    }
    if (U & 128) {
      g.suspense.move(y, C, P);
      return;
    }
    if (U & 64) {
      G.move(g, y, C, Mt);
      return;
    }
    if (G === ze) {
      s(L, y, C);
      for (let X = 0; X < W.length; X++)
        xe(W[X], y, C, P);
      s(g.anchor, y, C);
      return;
    }
    if (G === oi) {
      pe(g, y, C);
      return;
    }
    if (P !== 2 && U & 1 && q)
      if (P === 0)
        q.beforeEnter(L), s(L, y, C), jt(() => q.enter(L), $);
      else {
        const { leave: X, delayLeave: S, afterLeave: O } = q, V = () => {
          g.ctx.isUnmounted ? r(L) : s(L, y, C);
        }, J = () => {
          X(L, () => {
            V(), O && O();
          });
        };
        S ? S(L, V, J) : J();
      }
    else
      s(L, y, C);
  }, Je = (g, y, C, P = !1, $ = !1) => {
    const {
      type: L,
      props: G,
      ref: q,
      children: W,
      dynamicChildren: U,
      shapeFlag: te,
      patchFlag: X,
      dirs: S,
      cacheIndex: O
    } = g;
    if (X === -2 && ($ = !1), q != null && (Dn(), Ar(q, null, C, g, !0), $n()), O != null && (y.renderCache[O] = void 0), te & 256) {
      y.ctx.deactivate(g);
      return;
    }
    const V = te & 1 && S, J = !Sr(g);
    let ae;
    if (J && (ae = G && G.onVnodeBeforeUnmount) && hn(ae, y, g), te & 6)
      Re(g.component, C, P);
    else {
      if (te & 128) {
        g.suspense.unmount(C, P);
        return;
      }
      V && us(g, null, y, "beforeUnmount"), te & 64 ? g.type.remove(
        g,
        y,
        C,
        Mt,
        P
      ) : U && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !U.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (L !== ze || X > 0 && X & 64) ? yt(
        U,
        y,
        C,
        !1,
        !0
      ) : (L === ze && X & 384 || !$ && te & 16) && yt(W, y, C), P && st(g);
    }
    (J && (ae = G && G.onVnodeUnmounted) || V) && jt(() => {
      ae && hn(ae, y, g), V && us(g, null, y, "unmounted");
    }, C);
  }, st = (g) => {
    const { type: y, el: C, anchor: P, transition: $ } = g;
    if (y === ze) {
      At(C, P);
      return;
    }
    if (y === oi) {
      R(g);
      return;
    }
    const L = () => {
      r(C), $ && !$.persisted && $.afterLeave && $.afterLeave();
    };
    if (g.shapeFlag & 1 && $ && !$.persisted) {
      const { leave: G, delayLeave: q } = $, W = () => G(C, L);
      q ? q(g.el, L, W) : W();
    } else
      L();
  }, At = (g, y) => {
    let C;
    for (; g !== y; )
      C = w(g), r(g), g = C;
    r(y);
  }, Re = (g, y, C) => {
    const {
      bum: P,
      scope: $,
      job: L,
      subTree: G,
      um: q,
      m: W,
      a: U,
      parent: te,
      slots: { __: X }
    } = g;
    al(W), al(U), P && ri(P), te && be(X) && X.forEach((S) => {
      te.renderCache[S] = void 0;
    }), $.stop(), L && (L.flags |= 8, Je(G, g, y, C)), q && jt(q, y), jt(() => {
      g.isUnmounted = !0;
    }, y), y && y.pendingBranch && !y.isUnmounted && g.asyncDep && !g.asyncResolved && g.suspenseId === y.pendingId && (y.deps--, y.deps === 0 && y.resolve());
  }, yt = (g, y, C, P = !1, $ = !1, L = 0) => {
    for (let G = L; G < g.length; G++)
      Je(g[G], y, C, P, $);
  }, pt = (g) => {
    if (g.shapeFlag & 6)
      return pt(g.component.subTree);
    if (g.shapeFlag & 128)
      return g.suspense.next();
    const y = w(g.anchor || g.el), C = y && y[eh];
    return C ? w(C) : y;
  };
  let Ct = !1;
  const Rt = (g, y, C) => {
    g == null ? y._vnode && Je(y._vnode, null, null, !0) : K(
      y._vnode || null,
      g,
      y,
      null,
      null,
      null,
      C
    ), y._vnode = g, Ct || (Ct = !0, tl(), Dc(), Ct = !1);
  }, Mt = {
    p: K,
    um: Je,
    m: xe,
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
function fo({ type: e, props: t }, n) {
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
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = r[i] = Yn(r[i]), a.el = o.el), !n && a.patchFlag !== -2 && tu(o, a)), a.type === qi && (a.el = o.el), a.type === ts && !a.el && (a.el = o.el);
    }
}
function Lh(e) {
  const t = e.slice(), n = [0];
  let s, r, i, o, a;
  const l = e.length;
  for (s = 0; s < l; s++) {
    const d = e[s];
    if (d !== 0) {
      if (r = n[n.length - 1], e[r] < d) {
        t[s] = r, n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        a = i + o >> 1, e[n[a]] < d ? i = a + 1 : o = a;
      d < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s);
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
const Oh = Symbol.for("v-scx"), Nh = () => ii(Oh);
function Dt(e, t, n) {
  return su(e, t, n);
}
function su(e, t, n = tt) {
  const { immediate: s, deep: r, flush: i, once: o } = n, a = Pt({}, n), l = t && s || !t && i !== "post";
  let d;
  if (Pr) {
    if (i === "sync") {
      const z = Nh();
      d = z.__watcherHandles || (z.__watcherHandles = []);
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
  return Pr && (d ? d.push(w) : l && w()), w;
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
function Fh(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || tt;
  let r = n;
  const i = t.startsWith("update:"), o = i && Mh(s, t.slice(7));
  o && (o.trim && (r = n.map((c) => gt(c) ? c.trim() : c)), o.number && (r = n.map(Lo)));
  let a, l = s[a = io(t)] || // also try camelCase event handler (#2249)
  s[a = io(Qn(t))];
  !l && i && (l = s[a = io(ss(t))]), l && vn(
    l,
    e,
    6,
    r
  );
  const d = s[a + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, vn(
      d,
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
    const l = (d) => {
      const c = iu(d, t, !0);
      c && (a = !0, Pt(o, c));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !i && !a ? (ut(e) && s.set(e, null), null) : (be(i) ? i.forEach((l) => o[l] = null) : Pt(o, i), ut(e) && s.set(e, o), o);
}
function Hi(e, t) {
  return !e || !Ni(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), je(e, t[0].toLowerCase() + t.slice(1)) || je(e, ss(t)) || je(e, t));
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
    render: d,
    renderCache: c,
    props: v,
    data: w,
    setupState: z,
    ctx: I,
    inheritAttrs: K
  } = e, F = Ti(e);
  let oe, fe;
  try {
    if (n.shapeFlag & 4) {
      const R = r || s, N = R;
      oe = gn(
        d.call(
          N,
          R,
          c,
          v,
          z,
          w,
          I
        )
      ), fe = a;
    } else {
      const R = t;
      oe = gn(
        R.length > 1 ? R(
          v,
          { attrs: a, slots: o, emit: l }
        ) : R(
          v,
          null
        )
      ), fe = t.props ? a : Dh(a);
    }
  } catch (R) {
    Cr.length = 0, Bi(R, e, 1), oe = yn(ts);
  }
  let pe = oe;
  if (fe && K !== !1) {
    const R = Object.keys(fe), { shapeFlag: N } = pe;
    R.length && N & 7 && (i && R.some(Qo) && (fe = $h(
      fe,
      i
    )), pe = qs(pe, fe, !1, !0));
  }
  return n.dirs && (pe = qs(pe, null, !1, !0), pe.dirs = pe.dirs ? pe.dirs.concat(n.dirs) : n.dirs), n.transition && ua(pe, n.transition), oe = pe, Ti(F), oe;
}
const Dh = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Ni(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, $h = (e, t) => {
  const n = {};
  for (const s in e)
    (!Qo(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Bh(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: a, patchFlag: l } = t, d = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return s ? cl(s, o, d) : !!o;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let v = 0; v < c.length; v++) {
        const w = c[v];
        if (o[w] !== s[w] && !Hi(d, w))
          return !0;
      }
    }
  } else
    return (r || a) && (!a || !a.$stable) ? !0 : s === o ? !1 : s ? o ? cl(s, o, d) : !0 : !!o;
  return !1;
}
function cl(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !Hi(n, i))
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
const ze = Symbol.for("v-fgt"), qi = Symbol.for("v-txt"), ts = Symbol.for("v-cmt"), oi = Symbol.for("v-stc"), Cr = [];
let Kt = null;
function x(e = !1) {
  Cr.push(Kt = e ? null : []);
}
function Hh() {
  Cr.pop(), Kt = Cr[Cr.length - 1] || null;
}
let Nr = 1;
function ul(e, t = !1) {
  Nr += e, e < 0 && Kt && t && (Kt.hasOnce = !0);
}
function au(e) {
  return e.dynamicChildren = Nr > 0 ? Kt || Ms : null, Hh(), Nr > 0 && Kt && Kt.push(e), e;
}
function A(e, t, n, s, r, i) {
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
function Ai(e, t, n, s, r) {
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
function cr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const cu = ({ key: e }) => e ?? null, ai = ({
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
    ref: t && ai(t),
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
  return a ? (pa(l, n), i & 128 && e.normalize(l)) : n && (l.shapeFlag |= gt(n) ? 8 : 16), Nr > 0 && // avoid a block node from tracking itself
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
    const a = qs(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && pa(a, n), Nr > 0 && !i && Kt && (a.shapeFlag & 6 ? Kt[Kt.indexOf(e)] = a : Kt.push(a)), a.patchFlag = -2, a;
  }
  if (ed(e) && (e = e.__vccOpts), t) {
    t = Wh(t);
    let { class: a, style: l } = t;
    a && !gt(a) && (t.class = Ue(a)), ut(l) && (la(l) && !be(l) && (l = Pt({}, l)), t.style = Se(l));
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
function qs(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: a, transition: l } = e, d = t ? jh(r || {}, t) : r, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && cu(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? be(i) ? i.concat(ai(t)) : [i, ai(t)] : ai(t)
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
    ssContent: e.ssContent && qs(e.ssContent),
    ssFallback: e.ssFallback && qs(e.ssFallback),
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
  return yn(qi, null, e, t);
}
function hs(e, t) {
  const n = yn(oi, null, e);
  return n.staticCount = t, n;
}
function le(e = "", t = !1) {
  return t ? (x(), Ai(ts, null, e)) : yn(ts, null, e);
}
function gn(e) {
  return e == null || typeof e == "boolean" ? yn(ts) : be(e) ? yn(
    ze,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : lu(e) ? Yn(e) : yn(qi, null, String(e));
}
function Yn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : qs(e);
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
        t.style = Se([t.style, s.style]);
      else if (Ni(r)) {
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Fh.bind(null, i), e.ce && e.ce(i), i;
}
let Bt = null;
const Yh = () => Bt || nn;
let Si, Uo;
{
  const e = Fi(), t = (n, s) => {
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
    (n) => Pr = n
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
let Pr = !1;
function Xh(e, t = !1, n = !1) {
  t && Uo(t);
  const { props: s, children: r } = e.vnode, i = uu(e);
  kh(e, s, i, t), Sh(e, r, n || t);
  const o = i ? Zh(e, t) : void 0;
  return t && Uo(!1), o;
}
function Zh(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, dh);
  const { setup: s } = n;
  if (s) {
    Dn();
    const r = e.setupContext = s.length > 1 ? Qh(e) : null, i = Dr(e), o = Mr(
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
          Bi(l, e, 0);
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
    Dn();
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
function Wi(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Pc(Hf(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Er)
        return Er[n](e);
    },
    has(t, n) {
      return n in t || n in Er;
    }
  })) : e.proxy;
}
function ed(e) {
  return ke(e) && "__vccOpts" in e;
}
const de = (e, t) => Kf(e, t, Pr), td = "3.5.18";
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
const Ei = Symbol("_vod"), du = Symbol("_vsh"), ad = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[Ei] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : ur(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), ur(e, !0), s.enter(e)) : s.leave(e, () => {
      ur(e, !1);
    }) : ur(e, t));
  },
  beforeUnmount(e, { value: t }) {
    ur(e, t);
  }
};
function ur(e, t) {
  e.style.display = t ? e[Ei] : "none", e[du] = !t;
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
          n[a] == null && li(s, a, "");
        }
      else
        for (const o in t)
          n[o] == null && li(s, o, "");
    for (const o in n)
      o === "display" && (i = !0), li(s, o, n[o]);
  } else if (r) {
    if (t !== n) {
      const o = s[ld];
      o && (n += ";" + o), s.cssText = n, i = cd.test(n);
    }
  } else t && e.removeAttribute("style");
  Ei in e && (e[Ei] = i ? s.display : "", e[du] && (s.display = "none"));
}
const ml = /\s*!important$/;
function li(e, t, n) {
  if (be(n))
    n.forEach((s) => li(e, t, s));
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
function Ns(e, t, n, s) {
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
      const d = i[t] = _d(
        s,
        r
      );
      Ns(e, a, d, l);
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
  t === "class" ? od(e, s, o) : t === "style" ? ud(e, n, s) : Ni(t) ? Qo(t) || dd(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : vd(e, t, s, o)) ? (bl(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && yl(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !gt(s)) ? bl(e, Qn(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), yl(e, t, s, o));
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
  return be(t) ? (n) => ri(t, n) : t;
};
function wd(e) {
  e.target.composing = !0;
}
function xl(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const mo = Symbol("_assign"), ds = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e[mo] = Tl(r);
    const i = s || r.props && r.props.type === "number";
    Ns(e, t ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let a = e.value;
      n && (a = a.trim()), i && (a = Lo(a)), e[mo](a);
    }), n && Ns(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Ns(e, "compositionstart", wd), Ns(e, "compositionend", xl), Ns(e, "change", xl));
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
}, gs = (e, t) => {
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
}, ci = (e, t) => {
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
}, Ad = /* @__PURE__ */ Pt({ patchProp: bd }, rd);
let Al;
function Sd() {
  return Al || (Al = Ch(Ad));
}
const Ed = (...e) => {
  const t = Sd().createApp(...e), { mount: n } = t;
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
const Us = (e) => {
  const t = e.replace("#", ""), n = parseInt(t.substr(0, 2), 16), s = parseInt(t.substr(2, 2), 16), r = parseInt(t.substr(4, 2), 16);
  return (n * 299 + s * 587 + r * 114) / 1e3 < 128;
}, Id = (e, t) => {
  const n = e.replace("#", ""), s = parseInt(n.substr(0, 2), 16), r = parseInt(n.substr(2, 2), 16), i = parseInt(n.substr(4, 2), 16), o = Us(e), a = o ? Math.min(255, s + t) : Math.max(0, s - t), l = o ? Math.min(255, r + t) : Math.max(0, r - t), d = o ? Math.min(255, i + t) : Math.max(0, i - t);
  return `#${a.toString(16).padStart(2, "0")}${l.toString(16).padStart(2, "0")}${d.toString(16).padStart(2, "0")}`;
}, fr = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e), Ld = (e) => {
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
var ws = ma();
function pu(e) {
  ws = e;
}
var Rr = { exec: () => null };
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
}, Od = /^(?:[ \t]*(?:\n|$))+/, Nd = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Pd = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, $r = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Md = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ga = /(?:[*+-]|\d{1,9}[.)])/, mu = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, gu = Ve(mu).replace(/bull/g, ga).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Fd = Ve(mu).replace(/bull/g, ga).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), _a = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Dd = /^[^\n]+/, ya = /(?!\s*\])(?:\\.|[^\[\]\\])+/, $d = Ve(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ya).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Bd = Ve(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ga).getRegex(), ji = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ba = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Ud = Ve(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", ba).replace("tag", ji).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), _u = Ve(_a).replace("hr", $r).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ji).getRegex(), zd = Ve(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", _u).getRegex(), va = {
  blockquote: zd,
  code: Nd,
  def: $d,
  fences: Pd,
  heading: Md,
  hr: $r,
  html: Ud,
  lheading: gu,
  list: Bd,
  newline: Od,
  paragraph: _u,
  table: Rr,
  text: Dd
}, Sl = Ve(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", $r).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ji).getRegex(), Hd = {
  ...va,
  lheading: Fd,
  table: Sl,
  paragraph: Ve(_a).replace("hr", $r).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Sl).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ji).getRegex()
}, qd = {
  ...va,
  html: Ve(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", ba).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Rr,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: Ve(_a).replace("hr", $r).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", gu).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Wd = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, jd = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, yu = /^( {2,}|\\)\n(?!\s*$)/, Vd = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Vi = /[\p{P}\p{S}]/u, wa = /[\s\p{P}\p{S}]/u, bu = /[^\s\p{P}\p{S}]/u, Kd = Ve(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, wa).getRegex(), vu = /(?!~)[\p{P}\p{S}]/u, Gd = /(?!~)[\s\p{P}\p{S}]/u, Yd = /(?:[^\s\p{P}\p{S}]|~)/u, Xd = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, wu = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Zd = Ve(wu, "u").replace(/punct/g, Vi).getRegex(), Jd = Ve(wu, "u").replace(/punct/g, vu).getRegex(), ku = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Qd = Ve(ku, "gu").replace(/notPunctSpace/g, bu).replace(/punctSpace/g, wa).replace(/punct/g, Vi).getRegex(), ep = Ve(ku, "gu").replace(/notPunctSpace/g, Yd).replace(/punctSpace/g, Gd).replace(/punct/g, vu).getRegex(), tp = Ve(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, bu).replace(/punctSpace/g, wa).replace(/punct/g, Vi).getRegex(), np = Ve(/\\(punct)/, "gu").replace(/punct/g, Vi).getRegex(), sp = Ve(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), rp = Ve(ba).replace("(?:-->|$)", "-->").getRegex(), ip = Ve(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", rp).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Ci = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, op = Ve(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Ci).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Tu = Ve(/^!?\[(label)\]\[(ref)\]/).replace("label", Ci).replace("ref", ya).getRegex(), xu = Ve(/^!?\[(ref)\](?:\[\])?/).replace("ref", ya).getRegex(), ap = Ve("reflink|nolink(?!\\()", "g").replace("reflink", Tu).replace("nolink", xu).getRegex(), ka = {
  _backpedal: Rr,
  // only used for GFM url
  anyPunctuation: np,
  autolink: sp,
  blockSkip: Xd,
  br: yu,
  code: jd,
  del: Rr,
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
  url: Rr
}, lp = {
  ...ka,
  link: Ve(/^!?\[(label)\]\((.*?)\)/).replace("label", Ci).getRegex(),
  reflink: Ve(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Ci).getRegex()
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
}, ei = {
  normal: va,
  gfm: Hd,
  pedantic: qd
}, hr = {
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
    let d = !1, c = a;
    for (; --c >= 0 && l[c] === "\\"; ) d = !d;
    return d ? "|" : " |";
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
function dr(e, t, n) {
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
var Ri = class {
  // set by the lexer
  constructor(e) {
    et(this, "options");
    et(this, "rules");
    // set by the lexer
    et(this, "lexer");
    this.options = e || ws;
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
        text: this.options.pedantic ? n : dr(n, `
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
        const s = dr(n, "#");
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
        raw: dr(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = dr(t[0], `
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
        const d = a.join(`
`), c = d.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${d}` : d, r = r ? `${r}
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
        let l = !1, d = "", c = "";
        if (!(t = i.exec(e)) || this.rules.block.hr.test(e))
          break;
        d = t[0], e = e.substring(d.length);
        let v = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (oe) => " ".repeat(3 * oe.length)), w = e.split(`
`, 1)[0], z = !v.trim(), I = 0;
        if (this.options.pedantic ? (I = 2, c = v.trimStart()) : z ? I = t[1].length + 1 : (I = t[2].search(this.rules.other.nonSpaceChar), I = I > 4 ? 1 : I, c = v.slice(I), I += t[1].length), z && this.rules.other.blankLine.test(w) && (d += w + `
`, e = e.substring(w.length + 1), l = !0), !l) {
          const oe = this.rules.other.nextBulletRegex(I), fe = this.rules.other.hrRegex(I), pe = this.rules.other.fencesBeginRegex(I), R = this.rules.other.headingBeginRegex(I), N = this.rules.other.htmlBeginRegex(I);
          for (; e; ) {
            const Y = e.split(`
`, 1)[0];
            let Z;
            if (w = Y, this.options.pedantic ? (w = w.replace(this.rules.other.listReplaceNesting, "  "), Z = w) : Z = w.replace(this.rules.other.tabCharGlobal, "    "), pe.test(w) || R.test(w) || N.test(w) || oe.test(w) || fe.test(w))
              break;
            if (Z.search(this.rules.other.nonSpaceChar) >= I || !w.trim())
              c += `
` + Z.slice(I);
            else {
              if (z || v.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || pe.test(v) || R.test(v) || fe.test(v))
                break;
              c += `
` + w;
            }
            !z && !w.trim() && (z = !0), d += Y + `
`, e = e.substring(Y.length + 1), v = Z.slice(I);
          }
        }
        r.loose || (o ? r.loose = !0 : this.rules.other.doubleBlankLine.test(d) && (o = !0));
        let K = null, F;
        this.options.gfm && (K = this.rules.other.listIsTask.exec(c), K && (F = K[0] !== "[ ] ", c = c.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: d,
          task: !!K,
          checked: F,
          loose: !1,
          text: c,
          tokens: []
        }), r.raw += d;
      }
      const a = r.items.at(-1);
      if (a)
        a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
      else
        return;
      r.raw = r.raw.trimEnd();
      for (let l = 0; l < r.items.length; l++)
        if (this.lexer.state.top = !1, r.items[l].tokens = this.lexer.blockTokens(r.items[l].text, []), !r.loose) {
          const d = r.items[l].tokens.filter((v) => v.type === "space"), c = d.length > 0 && d.some((v) => this.rules.other.anyLine.test(v.raw));
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
        i.rows.push(Rl(a, i.header.length).map((l, d) => ({
          text: l,
          tokens: this.lexer.inline(l),
          header: !1,
          align: i.align[d]
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
        const i = dr(n.slice(0, -1), "\\");
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
      let o, a, l = i, d = 0;
      const c = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (c.lastIndex = 0, t = t.slice(-1 * e.length + i); (s = c.exec(t)) != null; ) {
        if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o) continue;
        if (a = [...o].length, s[3] || s[4]) {
          l += a;
          continue;
        } else if ((s[5] || s[6]) && i % 3 && !((i + a) % 3)) {
          d += a;
          continue;
        }
        if (l -= a, l > 0) continue;
        a = Math.min(a, a + l + d);
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
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || ws, this.options.tokenizer = this.options.tokenizer || new Ri(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      other: Ut,
      block: ei.normal,
      inline: hr.normal
    };
    this.options.pedantic ? (n.block = ei.pedantic, n.inline = hr.pedantic) : this.options.gfm && (n.block = ei.gfm, this.options.breaks ? n.inline = hr.breaks : n.inline = hr.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: ei,
      inline: hr
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
      if ((i = (r = this.options.extensions) == null ? void 0 : r.block) != null && i.some((d) => (a = d.call({ lexer: this }, t, n)) ? (t = t.substring(a.raw.length), n.push(a), !0) : !1))
        continue;
      if (a = this.tokenizer.space(t)) {
        t = t.substring(a.raw.length);
        const d = n.at(-1);
        a.raw.length === 1 && d !== void 0 ? d.raw += `
` : n.push(a);
        continue;
      }
      if (a = this.tokenizer.code(t)) {
        t = t.substring(a.raw.length);
        const d = n.at(-1);
        (d == null ? void 0 : d.type) === "paragraph" || (d == null ? void 0 : d.type) === "text" ? (d.raw += `
` + a.raw, d.text += `
` + a.text, this.inlineQueue.at(-1).src = d.text) : n.push(a);
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
        const d = n.at(-1);
        (d == null ? void 0 : d.type) === "paragraph" || (d == null ? void 0 : d.type) === "text" ? (d.raw += `
` + a.raw, d.text += `
` + a.raw, this.inlineQueue.at(-1).src = d.text) : this.tokens.links[a.tag] || (this.tokens.links[a.tag] = {
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
        let d = 1 / 0;
        const c = t.slice(1);
        let v;
        this.options.extensions.startBlock.forEach((w) => {
          v = w.call({ lexer: this }, c), typeof v == "number" && v >= 0 && (d = Math.min(d, v));
        }), d < 1 / 0 && d >= 0 && (l = t.substring(0, d + 1));
      }
      if (this.state.top && (a = this.tokenizer.paragraph(l))) {
        const d = n.at(-1);
        s && (d == null ? void 0 : d.type) === "paragraph" ? (d.raw += `
` + a.raw, d.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = d.text) : n.push(a), s = l.length !== t.length, t = t.substring(a.raw.length);
        continue;
      }
      if (a = this.tokenizer.text(t)) {
        t = t.substring(a.raw.length);
        const d = n.at(-1);
        (d == null ? void 0 : d.type) === "text" ? (d.raw += `
` + a.raw, d.text += `
` + a.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = d.text) : n.push(a);
        continue;
      }
      if (t) {
        const d = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(d);
          break;
        } else
          throw new Error(d);
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
    var a, l, d;
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
      if ((d = this.options.extensions) != null && d.startInline) {
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
}, Ii = class {
  // set by the parser
  constructor(e) {
    et(this, "options");
    et(this, "parser");
    this.options = e || ws;
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
}, Fn = class Wo {
  constructor(t) {
    et(this, "options");
    et(this, "renderer");
    et(this, "textRenderer");
    this.options = t || ws, this.options.renderer = this.options.renderer || new Ii(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Ta();
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
        const d = a, c = this.options.extensions.renderers[d.type].call({ parser: this }, d);
        if (c !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(d.type)) {
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
          let d = l, c = this.renderer.text(d);
          for (; o + 1 < t.length && t[o + 1].type === "text"; )
            d = t[++o], c += `
` + this.renderer.text(d);
          n ? s += this.renderer.paragraph({
            type: "paragraph",
            raw: c,
            text: c,
            tokens: [{ type: "text", raw: c, text: c, escaped: !0 }]
          }) : s += c;
          continue;
        }
        default: {
          const d = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent)
            return console.error(d), "";
          throw new Error(d);
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
        const d = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (d !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
          s += d || "";
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
          const d = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent)
            return console.error(d), "";
          throw new Error(d);
        }
      }
    }
    return s;
  }
}, Ro, ui = (Ro = class {
  constructor(e) {
    et(this, "options");
    et(this, "block");
    this.options = e || ws;
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
    return this.block ? Fn.parse : Fn.parseInline;
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
    et(this, "Parser", Fn);
    et(this, "Renderer", Ii);
    et(this, "TextRenderer", Ta);
    et(this, "Lexer", Mn);
    et(this, "Tokenizer", Ri);
    et(this, "Hooks", ui);
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
          r[o] = (...d) => {
            let c = a.apply(r, d);
            return c === !1 && (c = l.apply(r, d)), c || "";
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
          r[o] = (...d) => {
            let c = a.apply(r, d);
            return c === !1 && (c = l.apply(r, d)), c;
          };
        }
        s.tokenizer = r;
      }
      if (n.hooks) {
        const r = this.defaults.hooks || new ui();
        for (const i in n.hooks) {
          if (!(i in r))
            throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i))
            continue;
          const o = i, a = n.hooks[o], l = r[o];
          ui.passThroughHooks.has(i) ? r[o] = (d) => {
            if (this.defaults.async)
              return Promise.resolve(a.call(r, d)).then((v) => l.call(r, v));
            const c = a.call(r, d);
            return l.call(r, c);
          } : r[o] = (...d) => {
            let c = a.apply(r, d);
            return c === !1 && (c = l.apply(r, d)), c;
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
    return Fn.parse(e, t ?? this.defaults);
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
      const a = i.hooks ? i.hooks.provideLexer() : e ? Mn.lex : Mn.lexInline, l = i.hooks ? i.hooks.provideParser() : e ? Fn.parse : Fn.parseInline;
      if (i.async)
        return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n).then((d) => a(d, i)).then((d) => i.hooks ? i.hooks.processAllTokens(d) : d).then((d) => i.walkTokens ? Promise.all(this.walkTokens(d, i.walkTokens)).then(() => d) : d).then((d) => l(d, i)).then((d) => i.hooks ? i.hooks.postprocess(d) : d).catch(o);
      try {
        i.hooks && (n = i.hooks.preprocess(n));
        let d = a(n, i);
        i.hooks && (d = i.hooks.processAllTokens(d)), i.walkTokens && this.walkTokens(d, i.walkTokens);
        let c = l(d, i);
        return i.hooks && (c = i.hooks.postprocess(c)), c;
      } catch (d) {
        return o(d);
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
}, vs = new dp();
function He(e, t) {
  return vs.parse(e, t);
}
He.options = He.setOptions = function(e) {
  return vs.setOptions(e), He.defaults = vs.defaults, pu(He.defaults), He;
};
He.getDefaults = ma;
He.defaults = ws;
He.use = function(...e) {
  return vs.use(...e), He.defaults = vs.defaults, pu(He.defaults), He;
};
He.walkTokens = function(e, t) {
  return vs.walkTokens(e, t);
};
He.parseInline = vs.parseInline;
He.Parser = Fn;
He.parser = Fn.parse;
He.Renderer = Ii;
He.TextRenderer = Ta;
He.Lexer = Mn;
He.lexer = Mn.lex;
He.Tokenizer = Ri;
He.Hooks = ui;
He.parse = He;
He.options;
He.setOptions;
He.use;
He.walkTokens;
He.parseInline;
Fn.parse;
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
    var s, r, i, o, a = [], l = !0, d = !1;
    try {
      if (i = (n = n.call(e)).next, t !== 0) for (; !(l = (s = i.call(n)).done) && (a.push(s.value), a.length !== t); l = !0) ;
    } catch (c) {
      d = !0, r = c;
    } finally {
      try {
        if (!l && n.return != null && (o = n.return(), Object(o) !== o)) return;
      } finally {
        if (d) throw r;
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
const Au = Object.entries, Ol = Object.setPrototypeOf, bp = Object.isFrozen, vp = Object.getPrototypeOf, wp = Object.getOwnPropertyDescriptor;
let vt = Object.freeze, xt = Object.seal, Ps = Object.create, Su = typeof Reflect < "u" && Reflect, jo = Su.apply, Vo = Su.construct;
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
const _s = _t(Array.prototype.forEach), kp = _t(Array.prototype.lastIndexOf), Nl = _t(Array.prototype.pop), pr = _t(Array.prototype.push), Tp = _t(Array.prototype.splice), zs = Array.isArray, br = _t(String.prototype.toLowerCase), go = _t(String.prototype.toString), Pl = _t(String.prototype.match), mr = _t(String.prototype.replace), Ml = _t(String.prototype.indexOf), xp = _t(String.prototype.trim), Ap = _t(Number.prototype.toString), Sp = _t(Boolean.prototype.toString), Fl = typeof BigInt > "u" ? null : _t(BigInt.prototype.toString), Dl = typeof Symbol > "u" ? null : _t(Symbol.prototype.toString), Ht = _t(Object.prototype.hasOwnProperty), gr = _t(Object.prototype.toString), Lt = _t(RegExp.prototype.test), ps = Ep(TypeError);
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
function De(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : br;
  if (Ol && Ol(e, null), !zs(t))
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
  const t = Ps(null);
  for (const s of Au(e)) {
    var n = _p(s, 2);
    const r = n[0], i = n[1];
    Ht(e, r) && (zs(i) ? t[r] = Cp(i) : i && typeof i == "object" && i.constructor === Object ? t[r] = Vt(i) : t[r] = i);
  }
  return t;
}
function Rp(e) {
  switch (typeof e) {
    case "string":
      return e;
    case "number":
      return Ap(e);
    case "boolean":
      return Sp(e);
    case "bigint":
      return Fl ? Fl(e) : "0";
    case "symbol":
      return Dl ? Dl(e) : "Symbol()";
    case "undefined":
      return gr(e);
    case "function":
    case "object": {
      if (e === null)
        return gr(e);
      const t = e, n = Qt(t, "toString");
      if (typeof n == "function") {
        const s = n(t);
        return typeof s == "string" ? s : gr(s);
      }
      return gr(e);
    }
    default:
      return gr(e);
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
const $l = vt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), _o = vt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), yo = vt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Lp = vt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), bo = vt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Op = vt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Bl = vt(["#text"]), Ul = vt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), vo = vt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dominant-baseline", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "pointer-events", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-orientation", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "vector-effect", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), zl = vt(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), ti = vt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Np = xt(/{{[\w\W]*|^[\w\W]*}}/g), Pp = xt(/<%[\w\W]*|^[\w\W]*%>/g), Mp = xt(/\${[\w\W]*/g), Fp = xt(/^data-[\-\w.\u00B7-\uFFFF]+$/), Dp = xt(/^aria-[\-\w]+$/), Hl = xt(
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
}, Eu = ["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"], Wp = vt(De({}, Eu)), jp = function() {
  const e = {};
  return _s(Eu, (t) => {
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
  return Ht(t, n) && zs(t[n]) ? De(r.base ? Vt(r.base) : {}, t[n], r.transform) : s;
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
  const i = e.HTMLTemplateElement, o = e.Node, a = e.Element, l = e.NodeFilter, d = e.NamedNodeMap;
  d === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
  const c = e.DOMParser, v = e.trustedTypes, w = a.prototype, z = Qt(w, "cloneNode"), I = Qt(w, "remove"), K = Qt(w, "removeAttributeNode"), F = Qt(w, "nextSibling"), oe = Qt(w, "childNodes"), fe = Qt(w, "parentNode"), pe = Qt(w, "shadowRoot"), R = Qt(w, "attributes"), N = o && o.prototype ? Qt(o.prototype, "nodeType") : null, Y = o && o.prototype ? Qt(o.prototype, "nodeName") : null, Z = o && o.prototype ? Qt(o.prototype, "ownerDocument") : null, Te = function(p) {
    return N ? N(p) : p.nodeType;
  }, Oe = function(p) {
    return Y ? Y(p) : p.nodeName;
  };
  if (typeof i == "function") {
    const j = n.createElement("template");
    j.content && j.content.ownerDocument && (n = j.content.ownerDocument);
  }
  let _e, Fe = "", ve, Ke = !1, Ge = 0;
  const at = function() {
    if (Ge > 0)
      throw ps('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, ue = function(p) {
    at(), Ge++;
    try {
      return _e.createHTML(p);
    } finally {
      Ge--;
    }
  }, ye = function(p) {
    at(), Ge++;
    try {
      return _e.createScriptURL(p);
    } finally {
      Ge--;
    }
  }, ge = function() {
    return Ke || (ve = Kp(v, r), Ke = !0), ve;
  }, nt = n, Xe = nt.implementation, xe = nt.createNodeIterator, Je = nt.createDocumentFragment, st = nt.getElementsByTagName, At = s.importNode;
  let Re = jl();
  t.isSupported = typeof Au == "function" && typeof fe == "function" && Xe && Xe.createHTMLDocument !== void 0;
  const yt = Np, pt = Pp, Ct = Mp, Rt = Fp, Mt = Dp, Gt = $p, g = Bp, y = zp;
  let C = Hl, P = null;
  const $ = De({}, [...$l, ..._o, ...yo, ...bo, ...Bl]);
  let L = null;
  const G = De({}, [...Ul, ...vo, ...zl, ...ti]);
  let q = Object.seal(Ps(null, {
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
  const te = Object.seal(Ps(null, {
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
  let X = !0, S = !0, O = !1, V = !0, J = !1, ae = !0, we = !1, Ee = !1, Me = null, f = null, _ = !1, M = !1, T = !1, H = !1, ne = !0, ee = !1;
  const Ie = "user-content-";
  let Le = !0, Ce = !1, Be = {}, Ze = null;
  const wt = De({}, [
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
  const kn = De({}, ["audio", "video", "img", "source", "image", "track"]);
  let Vs = null;
  const Ks = De({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), rs = "http://www.w3.org/1998/Math/MathML", is = "http://www.w3.org/2000/svg", qt = "http://www.w3.org/1999/xhtml";
  let Tn = qt, Gs = !1, os = null;
  const ks = De({}, [rs, is, qt], go), Ys = vt(["mi", "mo", "mn", "ms", "mtext"]);
  let Ts = De({}, Ys);
  const xn = vt(["annotation-xml"]);
  let An = De({}, xn);
  const Xs = De({}, ["title", "style", "font", "a", "script"]);
  let Sn = null;
  const cn = ["application/xhtml+xml", "text/html"], Br = "text/html";
  let rt = null, En = null;
  const Un = n.createElement("form"), Ur = function(p) {
    return p instanceof RegExp || p instanceof Function;
  }, zn = function() {
    let p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (En && En === p)
      return;
    (!p || typeof p != "object") && (p = {}), p = Vt(p), Sn = // eslint-disable-next-line unicorn/prefer-includes
    cn.indexOf(p.PARSER_MEDIA_TYPE) === -1 ? Br : p.PARSER_MEDIA_TYPE, rt = Sn === "application/xhtml+xml" ? go : br, P = Kn(p, "ALLOWED_TAGS", $, {
      transform: rt
    }), L = Kn(p, "ALLOWED_ATTR", G, {
      transform: rt
    }), os = Kn(p, "ALLOWED_NAMESPACES", ks, {
      transform: go
    }), Vs = Kn(p, "ADD_URI_SAFE_ATTR", Ks, {
      transform: rt,
      base: Ks
    }), rn = Kn(p, "ADD_DATA_URI_TAGS", kn, {
      transform: rt,
      base: kn
    }), Ze = Kn(p, "FORBID_CONTENTS", wt, {
      transform: rt
    }), W = Kn(p, "FORBID_TAGS", Vt({}), {
      transform: rt
    }), U = Kn(p, "FORBID_ATTR", Vt({}), {
      transform: rt
    }), Be = Ht(p, "USE_PROFILES") ? p.USE_PROFILES && typeof p.USE_PROFILES == "object" ? Vt(p.USE_PROFILES) : p.USE_PROFILES : !1, X = p.ALLOW_ARIA_ATTR !== !1, S = p.ALLOW_DATA_ATTR !== !1, O = p.ALLOW_UNKNOWN_PROTOCOLS || !1, V = p.ALLOW_SELF_CLOSE_IN_ATTR !== !1, J = p.SAFE_FOR_TEMPLATES || !1, ae = p.SAFE_FOR_XML !== !1, we = p.WHOLE_DOCUMENT || !1, M = p.RETURN_DOM || !1, T = p.RETURN_DOM_FRAGMENT || !1, H = p.RETURN_TRUSTED_TYPE || !1, _ = p.FORCE_BODY || !1, ne = p.SANITIZE_DOM !== !1, ee = p.SANITIZE_NAMED_PROPS || !1, Le = p.KEEP_CONTENT !== !1, Ce = p.IN_PLACE || !1, C = Ip(p.ALLOWED_URI_REGEXP) ? p.ALLOWED_URI_REGEXP : Hl, Tn = typeof p.NAMESPACE == "string" ? p.NAMESPACE : qt, Ts = wo(
      p,
      "MATHML_TEXT_INTEGRATION_POINTS",
      () => De({}, Ys)
      // Default built-in map
    ), An = wo(
      p,
      "HTML_INTEGRATION_POINTS",
      () => De({}, xn)
      // Default built-in map
    );
    const k = wo(p, "CUSTOM_ELEMENT_HANDLING", () => Ps(null));
    if (q = Ps(null), Ht(k, "tagNameCheck") && Ur(k.tagNameCheck) && (q.tagNameCheck = k.tagNameCheck), Ht(k, "attributeNameCheck") && Ur(k.attributeNameCheck) && (q.attributeNameCheck = k.attributeNameCheck), Ht(k, "allowCustomizedBuiltInElements") && typeof k.allowCustomizedBuiltInElements == "boolean" && (q.allowCustomizedBuiltInElements = k.allowCustomizedBuiltInElements), xt(q), J && (S = !1), T && (M = !0), Be && (P = De({}, Bl), L = Ps(null), Be.html === !0 && (De(P, $l), De(L, Ul)), Be.svg === !0 && (De(P, _o), De(L, vo), De(L, ti)), Be.svgFilters === !0 && (De(P, yo), De(L, vo), De(L, ti)), Be.mathMl === !0 && (De(P, bo), De(L, zl), De(L, ti))), te.tagCheck = null, te.attributeCheck = null, Ht(p, "ADD_TAGS") && (typeof p.ADD_TAGS == "function" ? te.tagCheck = p.ADD_TAGS : zs(p.ADD_TAGS) && (P === $ && (P = Vt(P)), De(P, p.ADD_TAGS, rt))), Ht(p, "ADD_ATTR") && (typeof p.ADD_ATTR == "function" ? te.attributeCheck = p.ADD_ATTR : zs(p.ADD_ATTR) && (L === G && (L = Vt(L)), De(L, p.ADD_ATTR, rt))), Ht(p, "ADD_FORBID_CONTENTS") && zs(p.ADD_FORBID_CONTENTS) && (Ze === wt && (Ze = Vt(Ze)), De(Ze, p.ADD_FORBID_CONTENTS, rt)), Le && (P["#text"] = !0), we && De(P, ["html", "head", "body"]), P.table && (De(P, ["tbody"]), delete W.tbody), p.TRUSTED_TYPES_POLICY) {
      if (typeof p.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw ps('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof p.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw ps('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const B = _e;
      _e = p.TRUSTED_TYPES_POLICY;
      try {
        Fe = ue("");
      } catch (Q) {
        throw _e = B, Q;
      }
    } else p.TRUSTED_TYPES_POLICY === null ? (_e = void 0, Fe = "") : (_e === void 0 && (_e = ge()), _e && typeof Fe == "string" && (Fe = ue("")));
    vt && vt(p), En = p;
  }, Zs = De({}, [..._o, ...yo, ...Lp]), zr = De({}, [...bo, ...Op]), Hr = function(p, k, B) {
    return k.namespaceURI === qt ? p === "svg" : k.namespaceURI === rs ? p === "svg" && (B === "annotation-xml" || Ts[B]) : !!Zs[p];
  }, xs = function(p, k, B) {
    return k.namespaceURI === qt ? p === "math" : k.namespaceURI === is ? p === "math" && An[B] : !!zr[p];
  }, Js = function(p, k, B) {
    return k.namespaceURI === is && !An[B] || k.namespaceURI === rs && !Ts[B] ? !1 : !zr[p] && (Xs[p] || !Zs[p]);
  }, Yt = function(p) {
    let k = fe(p);
    (!k || !k.tagName) && (k = {
      namespaceURI: Tn,
      tagName: "template"
    });
    const B = br(p.tagName), Q = br(k.tagName);
    return os[p.namespaceURI] ? p.namespaceURI === is ? Hr(B, k, Q) : p.namespaceURI === rs ? xs(B, k, Q) : p.namespaceURI === qt ? Js(B, k, Q) : !!(Sn === "application/xhtml+xml" && os[p.namespaceURI]) : !1;
  }, bt = function(p) {
    pr(t.removed, {
      element: p
    });
    try {
      fe(p).removeChild(p);
    } catch {
      if (I(p), !fe(p))
        throw ps("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, ft = function(p, k, B) {
    try {
      K(p, k);
    } catch {
      try {
        p.removeAttribute(B);
      } catch {
      }
    }
  }, ht = function(p) {
    un(p);
    const k = oe(p);
    if (k) {
      const Q = [];
      _s(k, (ie) => {
        pr(Q, ie);
      }), _s(Q, (ie) => {
        try {
          I(ie);
        } catch {
        }
      });
    }
    const B = R(p);
    if (B)
      for (let Q = B.length - 1; Q >= 0; --Q) {
        const ie = B[Q], he = ie && ie.name;
        typeof he == "string" && ft(p, ie, he);
      }
  }, Qe = function(p, k, B) {
    if (!B)
      try {
        B = k.getAttributeNode(p);
      } catch {
        B = null;
      }
    pr(t.removed, {
      attribute: B || null,
      from: k
    });
    try {
      B ? K(k, B) : k.removeAttribute(p);
    } catch {
      try {
        k.removeAttribute(p);
      } catch {
      }
    }
    if (p === "is")
      if (M || T)
        try {
          bt(k);
        } catch {
        }
      else
        try {
          k.setAttribute(p, "");
        } catch {
        }
  }, Cn = function(p) {
    const k = R(p);
    if (k)
      for (let B = k.length - 1; B >= 0; --B) {
        const Q = k[B], ie = Q && Q.name;
        typeof ie != "string" || L[rt(ie)] || ft(p, Q, ie);
      }
  }, un = function(p) {
    const k = [p];
    for (; k.length > 0; ) {
      const B = k.pop();
      Te(B) === Wt.element && Cn(B);
      const ie = oe(B);
      if (ie)
        for (let he = ie.length - 1; he >= 0; --he)
          k.push(ie[he]);
    }
  }, Qs = function(p, k) {
    return ae ? p === "patchsrc" ? !0 : p === "for" && k !== "label" && k !== "output" : !1;
  }, Rn = function(p) {
    if (!ae)
      return;
    const k = [p];
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
        const he = B, Ne = rt(Oe(B));
        try {
          he.hasAttribute && he.hasAttribute("patchsrc") && he.removeAttribute("patchsrc"), he.hasAttribute && he.hasAttribute("for") && Qs("for", Ne) && he.removeAttribute("for");
        } catch {
        }
      }
      const ie = oe(B);
      if (ie)
        for (let he = ie.length - 1; he >= 0; --he)
          k.push(ie[he]);
    }
  }, kt = function(p) {
    let k = null, B = null;
    if (_)
      p = "<remove></remove>" + p;
    else {
      const he = Pl(p, /^[\r\n\t ]+/);
      B = he && he[0];
    }
    Sn === "application/xhtml+xml" && Tn === qt && (p = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + p + "</body></html>");
    const Q = _e ? ue(p) : p;
    if (Tn === qt)
      try {
        k = new c().parseFromString(Q, Sn);
      } catch {
      }
    if (!k || !k.documentElement) {
      k = Xe.createDocument(Tn, "template", null);
      try {
        k.documentElement.innerHTML = Gs ? Fe : Q;
      } catch {
      }
    }
    const ie = k.body || k.documentElement;
    return p && B && ie.insertBefore(n.createTextNode(B), ie.childNodes[0] || null), Tn === qt ? st.call(k, we ? "html" : "body")[0] : we ? k.documentElement : ie;
  }, Hn = function(p) {
    const k = Z ? Z(p) : p.ownerDocument;
    return xe.call(
      k || p,
      p,
      // eslint-disable-next-line no-bitwise
      l.SHOW_ELEMENT | l.SHOW_COMMENT | l.SHOW_TEXT | l.SHOW_PROCESSING_INSTRUCTION | l.SHOW_CDATA_SECTION,
      null
    );
  }, Xt = function(p) {
    return p = mr(p, yt, " "), p = mr(p, pt, " "), p = mr(p, Ct, " "), p;
  }, er = function(p) {
    var k;
    p.normalize();
    const B = Z ? Z(p) : p.ownerDocument, Q = xe.call(
      B || p,
      p,
      // eslint-disable-next-line no-bitwise
      l.SHOW_TEXT | l.SHOW_COMMENT | l.SHOW_CDATA_SECTION | l.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let ie = Q.nextNode();
    for (; ie; )
      ie.data = Xt(ie.data), ie = Q.nextNode();
    const he = (k = p.querySelectorAll) === null || k === void 0 ? void 0 : k.call(p, "template");
    he && _s(he, (Ne) => {
      qn(Ne.content) && er(Ne.content);
    });
  }, As = function(p) {
    const k = Y ? Y(p) : null;
    return typeof k != "string" || rt(k) !== "form" ? !1 : typeof p.nodeName != "string" || typeof p.textContent != "string" || typeof p.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    p.attributes !== R(p) || typeof p.removeAttribute != "function" || // A form descendant named "removeAttributeNode" or "getAttributeNode"
    // shadows these Attr-node methods via [LegacyOverrideBuiltIns].
    // _removeAttribute() / _stripAttributeNode() reach for
    // element.removeAttributeNode(attr) first; when it is shadowed the call
    // throws and the name-based fallback element.removeAttribute(name)
    // ASCII-lowercases its lookup key in an HTML document, silently missing
    // a case-preserved event-handler attribute (e.g. an ONANIMATIONSTART
    // that reached the sanitizer through an XML/XHTML parse). Flag the form
    // so it is removed wholesale, exactly as for the other shadowed methods.
    typeof p.removeAttributeNode != "function" || typeof p.getAttributeNode != "function" || typeof p.setAttribute != "function" || typeof p.namespaceURI != "string" || typeof p.insertBefore != "function" || typeof p.hasChildNodes != "function" || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
    // returns the integer 1 for any Element regardless of realm; direct
    // read on a clobbered form (e.g. <input name="nodeType">) returns
    // the named child element. Cheap addition — nodeType is read from
    // an internal slot, no serialization cost — and removes a residual
    // clobbering surface used by several mXSS / PI / comment branches
    // in _sanitizeElements that compare currentNode.nodeType directly.
    p.nodeType !== N(p) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
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
    p.childNodes !== oe(p);
  }, qn = function(p) {
    if (!N || typeof p != "object" || p === null)
      return !1;
    try {
      return N(p) === Wt.documentFragment;
    } catch {
      return !1;
    }
  }, as = function(p) {
    if (!N || typeof p != "object" || p === null)
      return !1;
    try {
      return typeof N(p) == "number";
    } catch {
      return !1;
    }
  };
  function Zt(j, p, k) {
    j.length !== 0 && _s(j, (B) => {
      B.call(t, p, k, En);
    });
  }
  const Yi = function(p, k) {
    return !!(ae && p.hasChildNodes() && !as(p.firstElementChild) && Lt(ql, p.textContent) && Lt(ql, p.innerHTML) || ae && p.namespaceURI === qt && Wp[k] && (as(p.firstElementChild) || typeof p.textContent == "string" && Lt(jp[k], p.textContent)) || p.nodeType === Wt.processingInstruction || ae && p.nodeType === Wt.comment && Lt(Wl, p.data));
  }, Ss = function(p, k) {
    if (p instanceof RegExp)
      return Lt(p, k);
    if (p instanceof Function) {
      for (var B = arguments.length, Q = new Array(B > 2 ? B - 2 : 0), ie = 2; ie < B; ie++)
        Q[ie - 2] = arguments[ie];
      return !!p(k, ...Q);
    }
    return !1;
  }, It = function(p, k, B) {
    if (!W[k] && tr(k) && Ss(q.tagNameCheck, k))
      return !1;
    if (Le && !Ze[k]) {
      const Q = fe(p), ie = oe(p);
      if (ie && Q) {
        const he = ie.length;
        for (let Ne = he - 1; Ne >= 0; --Ne) {
          const $e = p === B ? z(ie[Ne], !0) : ie[Ne];
          Q.insertBefore($e, F(p));
        }
      }
    }
    return bt(p), !0;
  }, qr = function(p, k, B, Q) {
    return p.length === 0 ? k : k === B || k === Q ? Vt(k) : k;
  }, Es = function(p, k) {
    return p === k || fe(p) !== null ? !1 : (Ce && un(p), !0);
  }, Wr = function(p, k) {
    if (Zt(Re.beforeSanitizeElements, p, null), Es(p, k))
      return !0;
    if (As(p))
      return bt(p), !0;
    const B = rt(Oe(p));
    if (P = qr(Re.uponSanitizeElement, P, $, Me), Zt(Re.uponSanitizeElement, p, {
      tagName: B,
      allowedTags: P
    }), Es(p, k))
      return !0;
    if (Yi(p, B))
      return bt(p), !0;
    if (W[B] || !(te.tagCheck instanceof Function && te.tagCheck(B)) && !P[B]) {
      const ie = It(p, B, k);
      return ie === !1 && Zt(Re.afterSanitizeElements, p, null), ie;
    }
    if (Te(p) === Wt.element && !Yt(p) || (B === "noscript" || B === "noembed" || B === "noframes") && Lt(Hp, p.innerHTML))
      return bt(p), !0;
    if (J && p.nodeType === Wt.text) {
      const ie = Xt(p.textContent);
      p.textContent !== ie && (pr(t.removed, {
        element: p.cloneNode()
      }), p.textContent = ie);
    }
    return Zt(Re.afterSanitizeElements, p, null), !1;
  }, jr = function(p, k, B) {
    if (U[k] || Qs(k, p) || ne && (k === "id" || k === "name") && (B in n || B in Un))
      return !1;
    const Q = L[k] || te.attributeCheck instanceof Function && te.attributeCheck(k, p);
    return S && Lt(Rt, k) || X && Lt(Mt, k) ? !0 : Q ? Vs[k] || Lt(C, mr(B, g, "")) || (k === "src" || k === "xlink:href" || k === "href") && p !== "script" && Ml(B, "data:") === 0 && rn[p] || O && !Lt(Gt, mr(B, g, "")) ? !0 : !B : (
      // Condition a) covers a basically valid custom element tag name whose
      // tag passes the configured tagNameCheck and whose attribute name
      // passes the configured attributeNameCheck ...
      tr(p) && Ss(q.tagNameCheck, p) && Ss(q.attributeNameCheck, k, p) || // Condition b) covers an `is` attribute whose value passes the
      // configured tagNameCheck while customized built-in elements are
      // allowed.
      k === "is" && q.allowCustomizedBuiltInElements && Ss(q.tagNameCheck, B)
    );
  }, Xi = De({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), tr = function(p) {
    return !Xi[br(p)] && Lt(y, p);
  }, nr = function(p, k, B, Q) {
    if (_e && typeof v == "object" && typeof v.getAttributeType == "function" && !B)
      switch (v.getAttributeType(p, k)) {
        case "TrustedHTML":
          return ue(Q);
        case "TrustedScriptURL":
          return ye(Q);
      }
    return Q;
  }, Vr = function(p, k, B, Q) {
    try {
      return B ? p.setAttributeNS(B, k, Q) : p.setAttribute(k, Q), As(p) ? (bt(p), !1) : !0;
    } catch {
      return Qe(k, p), !1;
    }
  }, Kr = function(p) {
    Zt(Re.beforeSanitizeAttributes, p, null);
    const k = p.attributes;
    if (!k || As(p))
      return;
    L = qr(Re.uponSanitizeAttribute, L, G, f);
    const B = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: L,
      forceKeepAttr: void 0
    };
    let Q = k.length;
    const ie = rt(p.nodeName);
    for (; Q--; ) {
      const he = k[Q], Ne = he.name, $e = he.namespaceURI, lt = he.value, dt = rt(Ne), fn = lt;
      let Tt = Ne === "value" ? fn : xp(fn), sr = !1;
      if (B.attrName = dt, B.attrValue = Tt, B.keepAttr = !0, B.forceKeepAttr = void 0, Zt(Re.uponSanitizeAttribute, p, B), Tt = B.attrValue, ee && (dt === "id" || dt === "name") && Ml(Tt, Ie) !== 0 && (Qe(Ne, p, he), Tt = Ie + Tt, sr = !0), ae && Lt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, Tt)) {
        Qe(Ne, p, he);
        continue;
      }
      if (dt === "attributename" && Pl(Tt, "href")) {
        Qe(Ne, p, he);
        continue;
      }
      if (!B.forceKeepAttr) {
        if (!B.keepAttr) {
          Qe(Ne, p, he);
          continue;
        }
        if (!V && Lt(qp, Tt)) {
          Qe(Ne, p, he);
          continue;
        }
        if (J && (Tt = Xt(Tt)), !jr(ie, dt, Tt)) {
          Qe(Ne, p, he);
          continue;
        }
        Tt = nr(ie, dt, $e, Tt), Tt !== fn && Vr(p, Ne, $e, Tt) && sr && Nl(t.removed);
      }
    }
    Zt(Re.afterSanitizeAttributes, p, null);
  }, Cs = function(p) {
    let k = null;
    const B = Hn(p);
    for (Zt(Re.beforeSanitizeShadowDOM, p, null); k = B.nextNode(); )
      if (Zt(Re.uponSanitizeShadowNode, k, null), Wr(k, p), Kr(k), qn(k.content) && Cs(k.content), Te(k) === Wt.element) {
        const Q = pe(k);
        qn(Q) && (ls(Q), Cs(Q));
      }
    Zt(Re.afterSanitizeShadowDOM, p, null);
  }, ls = function(p) {
    const k = [{
      node: p,
      shadow: null
    }];
    for (; k.length > 0; ) {
      const B = k.pop();
      if (B.shadow) {
        Cs(B.shadow);
        continue;
      }
      const Q = B.node, he = Te(Q) === Wt.element, Ne = oe(Q);
      if (Ne)
        for (let $e = Ne.length - 1; $e >= 0; --$e)
          k.push({
            node: Ne[$e],
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
    let p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, k = null, B = null, Q = null, ie = null;
    if (Gs = !j, Gs && (j = "<!-->"), typeof j != "string" && !as(j) && (j = Rp(j), typeof j != "string"))
      throw ps("dirty is not a string, aborting");
    if (!t.isSupported)
      return j;
    Ee ? (P = Me, L = f) : zn(p), (Re.uponSanitizeElement.length > 0 || Re.uponSanitizeAttribute.length > 0) && (P = Vt(P)), Re.uponSanitizeAttribute.length > 0 && (L = Vt(L)), t.removed = [];
    const he = Ce && typeof j != "string" && as(j);
    if (he) {
      Rn(j);
      const lt = Oe(j);
      if (typeof lt == "string") {
        const dt = rt(lt);
        if (!P[dt] || W[dt])
          throw ht(j), ps("root node is forbidden and cannot be sanitized in-place");
      }
      if (As(j))
        throw ht(j), ps("root node is clobbered and cannot be sanitized in-place");
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
        return M ? null : H ? Fe : "";
    }
    k && _ && bt(k.firstChild);
    const Ne = he ? j : k;
    try {
      const lt = Hn(Ne);
      for (; Q = lt.nextNode(); )
        Wr(Q, Ne), Kr(Q), qn(Q.content) && Cs(Q.content);
    } catch (lt) {
      throw he && (ht(j), _s(t.removed, (dt) => {
        dt.element && un(dt.element);
      })), lt;
    }
    if (he)
      return _s(t.removed, (lt) => {
        lt.element && un(lt.element);
      }), J && er(j), j;
    if (M) {
      if (J && er(k), T)
        for (ie = Je.call(k.ownerDocument); k.firstChild; )
          ie.appendChild(k.firstChild);
      else
        ie = k;
      return (L.shadowroot || L.shadowrootmode) && (ie = At.call(s, ie, !0)), ie;
    }
    let $e = we ? k.outerHTML : k.innerHTML;
    return we && P["!doctype"] && k.ownerDocument && k.ownerDocument.doctype && k.ownerDocument.doctype.name && Lt(Up, k.ownerDocument.doctype.name) && ($e = "<!DOCTYPE " + k.ownerDocument.doctype.name + `>
` + $e), J && ($e = Xt($e)), _e && H ? ue($e) : $e;
  }, t.setConfig = function() {
    let j = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    zn(j), Ee = !0, Me = P, f = L;
  }, t.clearConfig = function() {
    En = null, Ee = !1, Me = null, f = null, _e = ve, Fe = "";
  }, t.isValidAttribute = function(j, p, k) {
    En || zn({});
    const B = rt(j), Q = rt(p);
    return jr(B, Q, k);
  }, t.addHook = function(j, p) {
    typeof p == "function" && Ht(Re, j) && pr(Re[j], p);
  }, t.removeHook = function(j, p) {
    if (Ht(Re, j)) {
      if (p !== void 0) {
        const k = kp(Re[j], p);
        return k === -1 ? void 0 : Tp(Re[j], k, 1)[0];
      }
      return Nl(Re[j]);
    }
  }, t.removeHooks = function(j) {
    Ht(Re, j) && (Re[j] = []);
  }, t.removeAllHooks = function() {
    Re = jl();
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
const fi = (e) => Gp(He(e || "")), Vl = "*", Yp = /* @__PURE__ */ new Set(["null", "about:blank", ""]);
let dn = null;
const hi = (e) => e && !Yp.has(e) ? e : null, Xp = (e) => {
  if (!e) return null;
  try {
    return hi(new URL(e).origin);
  } catch {
    return null;
  }
};
function Zp() {
  if (dn) return dn;
  if (window.parent === window)
    return dn = hi(window.location.origin) || Vl, dn;
  try {
    const e = hi(window.parent.location.origin);
    if (e)
      return dn = e, dn;
  } catch {
  }
  try {
    const e = window.location.ancestorOrigins, t = e && e.length ? hi(e[0]) : null;
    if (t)
      return dn = t, dn;
  } catch {
  }
  return dn = Xp(document.referrer) || Vl, dn;
}
function Xn(e) {
  window.parent.postMessage(e, Zp());
}
const Li = "Start a new chat", Kl = "Start a new chat? This ends the current one.", Jp = "Start new chat", Qp = "Cancel", Gl = "Couldn't start a new chat. Please try again.", em = 15e3, tm = ["aria-label"], nm = { class: "new-chat-confirm__question" }, sm = { class: "new-chat-confirm__actions" }, rm = ["disabled"], im = ["disabled"], om = /* @__PURE__ */ fa({
  __name: "NewChatConfirm",
  props: {
    error: {},
    busy: { type: Boolean }
  },
  emits: ["confirm", "cancel"],
  setup(e, { emit: t }) {
    const n = t;
    return (s, r) => (x(), A("div", {
      class: "new-chat-confirm",
      role: "alertdialog",
      "aria-live": "polite",
      "aria-label": E(Kl)
    }, [
      b("p", nm, se(s.error || E(Kl)), 1),
      b("div", sm, [
        b("button", {
          type: "button",
          class: "new-chat-confirm__button",
          disabled: s.busy,
          onClick: r[0] || (r[0] = (i) => n("cancel"))
        }, se(E(Qp)), 9, rm),
        b("button", {
          type: "button",
          class: "new-chat-confirm__button new-chat-confirm__button--primary",
          disabled: s.busy,
          onClick: r[1] || (r[1] = (i) => n("confirm"))
        }, se(E(Jp)), 9, im)
      ])
    ], 8, tm));
  }
}), Aa = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Ru = /* @__PURE__ */ Aa(om, [["__scopeId", "data-v-6c78f353"]]), am = { class: "askai" }, lm = { class: "askai__bar" }, cm = ["value", "placeholder", "disabled", "aria-label", "onKeydown"], um = ["disabled", "title", "aria-label", "aria-expanded"], fm = { class: "askai__intro" }, hm = { class: "askai__title" }, dm = {
  key: 0,
  class: "askai__subtitle"
}, pm = {
  key: 0,
  class: "askai__suggestions"
}, mm = ["disabled", "onClick"], gm = ["aria-live"], _m = {
  key: 0,
  class: "askai__question"
}, ym = {
  key: 1,
  class: "askai__system"
}, bm = ["innerHTML"], vm = {
  key: 0,
  class: "askai__sources"
}, wm = ["title"], km = {
  key: 0,
  class: "askai__thinking",
  role: "status",
  "aria-live": "polite"
}, Tm = { class: "askai__thinking-text" }, xm = { class: "askai__foot" }, Am = { key: 0 }, Sm = /* @__PURE__ */ fa({
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
      () => n.messages.map((R, N) => ({ message: R, index: N })).filter(({ message: R }) => a.includes(R.message_type))
    ), d = de(() => l.value.length > 0), c = (R) => {
      s("update:draft", R.target.value);
    }, v = () => {
      !(n.typingEnabled ?? n.inputEnabled) || !n.draft.trim() || s("send");
    }, w = (R) => {
      n.inputEnabled && s("ask", R);
    }, z = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform || ""), I = (R) => {
      if (R.key === "Escape") {
        R.preventDefault(), s("close");
        return;
      }
      const N = z ? R.metaKey && !R.ctrlKey : R.ctrlKey && !R.metaKey;
      n.hotkey && N && !R.altKey && (R.key === "k" || R.key === "K") && (R.preventDefault(), s("close"));
    }, K = () => {
      bs(() => {
        var R;
        return (R = r.value) == null ? void 0 : R.focus();
      });
    };
    let F = 0;
    const oe = () => {
      if (!o.value) return;
      const R = o.value.closest(".askai"), N = i.value;
      if (!R || !N) return;
      const Y = R.offsetHeight - N.offsetHeight, Z = getComputedStyle(N), Te = parseFloat(Z.paddingTop) + parseFloat(Z.paddingBottom), Oe = Math.ceil(Y + Te + o.value.getBoundingClientRect().height);
      Math.abs(Oe - F) < 3 || (F = Oe, Xn({ type: "WIDGET_RESIZE", height: Oe }));
    };
    let fe = null;
    const pe = de(
      () => l.value.reduce((R, { message: N, index: Y }) => R + n.displayText(Y, N.message || "").length, 0)
    );
    return Dt(
      () => [l.value.length, pe.value, n.loading],
      () => bs(() => {
        i.value && (i.value.scrollTop = i.value.scrollHeight);
      })
    ), Dt(() => n.newChatArmed, () => bs(() => oe())), Dt(() => n.active, (R) => {
      R && K();
    }), zi(() => {
      n.active && K(), window.addEventListener("keydown", I), o.value && typeof ResizeObserver < "u" && (fe = new ResizeObserver(() => oe()), fe.observe(o.value)), oe();
    }), qc(() => {
      window.removeEventListener("keydown", I), fe == null || fe.disconnect(), fe = null;
    }), (R, N) => (x(), A("div", am, [
      b("div", lm, [
        N[6] || (N[6] = b("svg", {
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
          value: R.draft,
          placeholder: R.placeholder,
          disabled: !(R.typingEnabled ?? R.inputEnabled),
          "aria-label": R.placeholder,
          autocomplete: "off",
          spellcheck: "false",
          onInput: c,
          onKeydown: ci(gs(v, ["prevent"]), ["enter"])
        }, null, 40, cm),
        R.canStartNewChat ? (x(), A("button", {
          key: 0,
          type: "button",
          class: Ue(["askai__new", { "askai__new--armed": R.newChatArmed }]),
          disabled: R.startingNewChat,
          title: E(Li),
          "aria-label": E(Li),
          "aria-expanded": R.newChatArmed,
          onClick: N[0] || (N[0] = (Y) => s("newChat"))
        }, N[4] || (N[4] = [
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
        ]), 10, um)) : le("", !0),
        b("button", {
          type: "button",
          class: "askai__close",
          "aria-label": "Close",
          title: "Close (Esc)",
          onClick: N[1] || (N[1] = (Y) => s("close"))
        }, N[5] || (N[5] = [
          b("span", { class: "askai__kbd" }, "Esc", -1)
        ]))
      ]),
      R.newChatArmed && R.canStartNewChat ? (x(), Ai(Ru, {
        key: 0,
        busy: R.startingNewChat,
        error: R.newChatError,
        onConfirm: N[2] || (N[2] = (Y) => s("confirmNewChat")),
        onCancel: N[3] || (N[3] = (Y) => s("cancelNewChat"))
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
          d.value ? (x(), A(ze, { key: 1 }, [
            (x(!0), A(ze, null, St(l.value, ({ message: Y, index: Z }) => (x(), A("div", {
              key: Z,
              class: "askai__turn",
              "aria-live": R.isStreaming(Z) ? "off" : "polite"
            }, [
              Y.message_type === "user" ? (x(), A("p", _m, se(Y.message), 1)) : Y.message_type === "system" ? (x(), A("p", ym, se(Y.message), 1)) : (x(), A(ze, { key: 2 }, [
                b("div", {
                  class: Ue(["askai__answer", { "askai__answer--streaming": R.isStreaming(Z) }]),
                  innerHTML: E(fi)(R.isStreaming(Z) ? R.displayText(Z, Y.message || "") : Y.message || "")
                }, null, 10, bm),
                R.showCitations && !R.isStreaming(Z) && Y.sources && Y.sources.length ? (x(), A("div", vm, [
                  N[9] || (N[9] = b("span", { class: "askai__label" }, "Sources", -1)),
                  (x(!0), A(ze, null, St(Y.sources, (Te, Oe) => (x(), A("span", {
                    key: Oe,
                    class: "askai__source",
                    title: R.citationTooltip(Te)
                  }, se(R.citationLabel(Te)), 9, wm))), 128))
                ])) : le("", !0)
              ], 64))
            ], 8, gm))), 128)),
            R.loading ? (x(), A("div", km, [
              N[10] || (N[10] = b("span", { class: "askai__dot" }, null, -1)),
              N[11] || (N[11] = b("span", { class: "askai__dot" }, null, -1)),
              N[12] || (N[12] = b("span", { class: "askai__dot" }, null, -1)),
              b("span", Tm, se(R.showCitations ? "Searching the knowledge base" : "Thinking"), 1)
            ])) : le("", !0)
          ], 64)) : (x(), A(ze, { key: 0 }, [
            b("div", fm, [
              b("h2", hm, se(R.welcomeTitle || `Ask ${R.agentName}`), 1),
              R.welcomeSubtitle ? (x(), A("p", dm, se(R.welcomeSubtitle), 1)) : le("", !0)
            ]),
            R.suggestions.length && !R.draft.trim() ? (x(), A("div", pm, [
              N[8] || (N[8] = b("p", { class: "askai__label" }, "Suggested", -1)),
              (x(!0), A(ze, null, St(R.suggestions, (Y) => (x(), A("button", {
                key: Y,
                type: "button",
                class: "askai__suggestion",
                disabled: !R.inputEnabled,
                onClick: (Z) => w(Y)
              }, [
                b("span", null, se(Y), 1),
                N[7] || (N[7] = b("svg", {
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
              ], 8, mm))), 128))
            ])) : le("", !0)
          ], 64))
        ], 512)
      ], 512),
      b("div", xm, [
        R.disclaimer ? (x(), A("span", Am, se(R.disclaimer), 1)) : le("", !0),
        N[13] || (N[13] = b("a", {
          class: "askai__brand",
          href: "https://chattermate.chat",
          target: "_blank",
          rel: "noopener noreferrer"
        }, "Powered by ChatterMate", -1))
      ])
    ]));
  }
}), Em = /* @__PURE__ */ Aa(Sm, [["__scopeId", "data-v-edea9534"]]), vr = [
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
], Cm = (e) => (e || "").split("").reduce((t, n) => t + n.charCodeAt(0), 0) % vr.length, Rm = (e) => {
  const t = vr[(e % vr.length + vr.length) % vr.length];
  return {
    background: `
            radial-gradient(circle at 32% 28%, rgba(255,255,255,0.22) 0%, transparent 42%),
            radial-gradient(circle at 68% 72%, rgba(0,0,0,0.25) 0%, transparent 38%),
            radial-gradient(ellipse at 50% 50%, ${t.stops})
        `.trim(),
    boxShadow: `0 4px 28px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`,
    borderRadius: "50%"
  };
}, Im = (e, t) => {
  const n = typeof t == "number" && Number.isFinite(t) ? t : Cm(e);
  return Rm(n);
}, Yl = (e) => {
  var t;
  return !!((t = e == null ? void 0 : e.attributes) != null && t.end_chat);
}, Xl = "AI can make mistakes. Check important info.";
function Lm(e, t = !1) {
  return e !== !1 && !t;
}
const ko = {
  ai: "Online · replies instantly",
  human: "Online · usually replies in a few minutes",
  away: "Away · we'll reply when we're back"
};
function Om(e, t = !1) {
  return (t ? "human" : (e == null ? void 0 : e.mode) ?? "ai") === "ai" ? { text: ko.ai, online: !0 } : (e == null ? void 0 : e.available) !== !1 ? { text: ko.human, online: !0 } : { text: ko.away, online: !1 };
}
const Iu = (e) => !!e && (/^https?:\/\//i.test(e) || e.startsWith("data:")), Nm = (e, t) => e ? Iu(e) || e.startsWith("blob:") ? e : `${t.replace(/\/api\/v1\/?$/, "")}${e.startsWith("/") ? "" : "/"}${e}` : "";
function Zl() {
  return typeof window < "u" && window.APP_CONFIG ? window.APP_CONFIG : {};
}
const Ws = {
  get API_URL() {
    return Zl().API_URL || "https://api.chattermate.chat/api/v1";
  },
  get WS_URL() {
    return Zl().WS_URL || "wss://api.chattermate.chat";
  }
};
function Oi(e) {
  return Nm(e, Ws.API_URL);
}
function Pm(e) {
  const t = de(() => ({
    backgroundColor: "var(--cm-card)",
    color: "var(--cm-text)"
  })), n = de(() => ({
    backgroundColor: e.value.chat_bubble_color || "#C9F24E",
    color: Us(e.value.chat_bubble_color || "#C9F24E") ? "#FFFFFF" : "#000000"
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
  })), a = de(() => Oi(e.value.photo_url)), l = de(() => {
    const d = e.value.chat_background_color || "#ffffff";
    return {
      boxShadow: `0 8px 5px ${Us(d) ? "rgba(0, 0, 0, 0.24)" : "rgba(0, 0, 0, 0.12)"}`
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
const Mm = /* @__PURE__ */ new Set(["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]), Fm = /* @__PURE__ */ new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
]);
[...Mm, ...Fm];
function Dm(e, t) {
  const n = ce([]), s = ce(!1), r = ce(null), i = (N) => {
    if (N === 0) return "0 Bytes";
    const Y = 1024, Z = ["Bytes", "KB", "MB", "GB"], Te = Math.floor(Math.log(N) / Math.log(Y));
    return parseFloat((N / Math.pow(Y, Te)).toFixed(2)) + " " + Z[Te];
  }, o = (N) => N.startsWith("image/"), a = (N) => N ? Oi(N) : "", l = (N) => {
    const Y = N.file_url || N.url;
    return Y ? Oi(Y) : "";
  }, d = async (N) => {
    const Y = N.target;
    Y.files && Y.files.length > 0 && (await K(Array.from(Y.files)), Y.value = "");
  }, c = async (N) => {
    var Z;
    N.preventDefault();
    const Y = (Z = N.dataTransfer) == null ? void 0 : Z.files;
    Y && Y.length > 0 && await K(Array.from(Y));
  }, v = (N) => {
    N.preventDefault();
  }, w = (N) => {
    N.preventDefault();
  }, z = async (N) => {
    var Te;
    const Y = (Te = N.clipboardData) == null ? void 0 : Te.items;
    if (!Y) return;
    const Z = [];
    for (const Oe of Array.from(Y))
      if (Oe.kind === "file") {
        const _e = Oe.getAsFile();
        _e && Z.push(_e);
      }
    Z.length > 0 && await K(Z);
  }, I = async (N, Y = 500) => new Promise((Z, Te) => {
    const Oe = new FileReader();
    Oe.onload = (_e) => {
      var ve;
      const Fe = new Image();
      Fe.onload = () => {
        const Ke = document.createElement("canvas");
        let Ge = Fe.width, at = Fe.height;
        const ue = 1920;
        (Ge > ue || at > ue) && (Ge > at ? (at = at / Ge * ue, Ge = ue) : (Ge = Ge / at * ue, at = ue)), Ke.width = Ge, Ke.height = at;
        const ye = Ke.getContext("2d");
        if (!ye) {
          Te(new Error("Failed to get canvas context"));
          return;
        }
        ye.drawImage(Fe, 0, 0, Ge, at);
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
          }, N.type === "image/png" ? "image/png" : "image/jpeg", ge);
        };
        nt();
      }, Fe.onerror = () => Te(new Error("Failed to load image")), Fe.src = (ve = _e.target) == null ? void 0 : ve.result;
    }, Oe.onerror = () => Te(new Error("Failed to read file")), Oe.readAsDataURL(N);
  }), K = async (N) => {
    if (n.value.length >= 3) {
      alert("Maximum 3 files allowed per message");
      return;
    }
    const _e = 3 - n.value.length, Fe = N.slice(0, _e);
    N.length > _e && alert(`Only ${_e} more file(s) can be uploaded. Maximum 3 files per message.`);
    for (const ve of Fe)
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
              var xe;
              const Xe = ((xe = ge.target) == null ? void 0 : xe.result).split(",")[1];
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
    handleFileSelect: d,
    handleDrop: c,
    handleDragOver: v,
    handleDragLeave: w,
    handlePaste: z,
    uploadFiles: K,
    removeAttachment: async (N) => {
      const Y = n.value[N];
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
          const Oe = await fetch(`${Ws.API_URL}/files/upload/${Z}`, {
            method: "DELETE",
            headers: Te
          });
          if (Oe.ok)
            console.log("File deleted successfully from backend.");
          else {
            const _e = await Oe.json();
            console.error("Failed to delete file:", _e.detail);
          }
        } catch (Z) {
          console.error("Error calling delete API:", Z);
        }
        Y.url && Y.url.startsWith("blob:") && URL.revokeObjectURL(Y.url), Y.file_url && Y.file_url.startsWith("blob:") && URL.revokeObjectURL(Y.file_url), n.value.splice(N, 1);
      }
    },
    openPreview: (N) => {
      r.value = N, s.value = !0;
    },
    closePreview: () => {
      s.value = !1, setTimeout(() => {
        r.value = null;
      }, 300);
    },
    openFilePicker: () => {
      var N;
      (N = t.value) == null || N.click();
    },
    isImage: (N) => N.startsWith("image/")
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
const di = /* @__PURE__ */ Object.create(null);
Object.keys(wn).forEach((e) => {
  di[wn[e]] = e;
});
const Ko = { type: "error", data: "parser error" }, Lu = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", Ou = typeof ArrayBuffer == "function", Nu = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e && e.buffer instanceof ArrayBuffer, Sa = ({ type: e, data: t }, n, s) => Lu && t instanceof Blob ? n ? s(t) : Jl(t, s) : Ou && (t instanceof ArrayBuffer || Nu(t)) ? n ? s(t) : Jl(new Blob([t]), s) : s(wn[e] + (t || "")), Jl = (e, t) => {
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
function $m(e, t) {
  if (Lu && e.data instanceof Blob)
    return e.data.arrayBuffer().then(Ql).then(t);
  if (Ou && (e.data instanceof ArrayBuffer || Nu(e.data)))
    return t(Ql(e.data));
  Sa(e, !1, (n) => {
    To || (To = new TextEncoder()), t(To.encode(n));
  });
}
const ec = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", wr = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < ec.length; e++)
  wr[ec.charCodeAt(e)] = e;
const Bm = (e) => {
  let t = e.length * 0.75, n = e.length, s, r = 0, i, o, a, l;
  e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
  const d = new ArrayBuffer(t), c = new Uint8Array(d);
  for (s = 0; s < n; s += 4)
    i = wr[e.charCodeAt(s)], o = wr[e.charCodeAt(s + 1)], a = wr[e.charCodeAt(s + 2)], l = wr[e.charCodeAt(s + 3)], c[r++] = i << 2 | o >> 4, c[r++] = (o & 15) << 4 | a >> 2, c[r++] = (a & 3) << 6 | l & 63;
  return d;
}, Um = typeof ArrayBuffer == "function", Ea = (e, t) => {
  if (typeof e != "string")
    return {
      type: "message",
      data: Pu(e, t)
    };
  const n = e.charAt(0);
  return n === "b" ? {
    type: "message",
    data: zm(e.substring(1), t)
  } : di[n] ? e.length > 1 ? {
    type: di[n],
    data: e.substring(1)
  } : {
    type: di[n]
  } : Ko;
}, zm = (e, t) => {
  if (Um) {
    const n = Bm(e);
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
}, Mu = "", Hm = (e, t) => {
  const n = e.length, s = new Array(n);
  let r = 0;
  e.forEach((i, o) => {
    Sa(i, !1, (a) => {
      s[o] = a, ++r === n && t(s.join(Mu));
    });
  });
}, qm = (e, t) => {
  const n = e.split(Mu), s = [];
  for (let r = 0; r < n.length; r++) {
    const i = Ea(n[r], t);
    if (s.push(i), i.type === "error")
      break;
  }
  return s;
};
function Wm() {
  return new TransformStream({
    transform(e, t) {
      $m(e, (n) => {
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
function ni(e) {
  return e.reduce((t, n) => t + n.length, 0);
}
function si(e, t) {
  if (e[0].length === t)
    return e.shift();
  const n = new Uint8Array(t);
  let s = 0;
  for (let r = 0; r < t; r++)
    n[r] = e[0][s++], s === e[0].length && (e.shift(), s = 0);
  return e.length && s < e[0].length && (e[0] = e[0].slice(s)), n;
}
function jm(e, t) {
  xo || (xo = new TextDecoder());
  const n = [];
  let s = 0, r = -1, i = !1;
  return new TransformStream({
    transform(o, a) {
      for (n.push(o); ; ) {
        if (s === 0) {
          if (ni(n) < 1)
            break;
          const l = si(n, 1);
          i = (l[0] & 128) === 128, r = l[0] & 127, r < 126 ? s = 3 : r === 126 ? s = 1 : s = 2;
        } else if (s === 1) {
          if (ni(n) < 2)
            break;
          const l = si(n, 2);
          r = new DataView(l.buffer, l.byteOffset, l.length).getUint16(0), s = 3;
        } else if (s === 2) {
          if (ni(n) < 8)
            break;
          const l = si(n, 8), d = new DataView(l.buffer, l.byteOffset, l.length), c = d.getUint32(0);
          if (c > Math.pow(2, 21) - 1) {
            a.enqueue(Ko);
            break;
          }
          r = c * Math.pow(2, 32) + d.getUint32(4), s = 3;
        } else {
          if (ni(n) < r)
            break;
          const l = si(n, r);
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
const Fu = 4;
function mt(e) {
  if (e) return Vm(e);
}
function Vm(e) {
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
const Ki = typeof Promise == "function" && typeof Promise.resolve == "function" ? (t) => Promise.resolve().then(t) : (t, n) => n(t, 0), en = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), Km = "arraybuffer";
function Du(e, ...t) {
  return t.reduce((n, s) => (e.hasOwnProperty(s) && (n[s] = e[s]), n), {});
}
const Gm = en.setTimeout, Ym = en.clearTimeout;
function Gi(e, t) {
  t.useNativeTimers ? (e.setTimeoutFn = Gm.bind(en), e.clearTimeoutFn = Ym.bind(en)) : (e.setTimeoutFn = en.setTimeout.bind(en), e.clearTimeoutFn = en.clearTimeout.bind(en));
}
const Xm = 1.33;
function Zm(e) {
  return typeof e == "string" ? Jm(e) : Math.ceil((e.byteLength || e.size) * Xm);
}
function Jm(e) {
  let t = 0, n = 0;
  for (let s = 0, r = e.length; s < r; s++)
    t = e.charCodeAt(s), t < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (s++, n += 4);
  return n;
}
function $u() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function Qm(e) {
  let t = "";
  for (let n in e)
    e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
  return t;
}
function eg(e) {
  let t = {}, n = e.split("&");
  for (let s = 0, r = n.length; s < r; s++) {
    let i = n[s].split("=");
    t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
  }
  return t;
}
class tg extends Error {
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
    super(), this.writable = !1, Gi(this, t), this.opts = t, this.query = t.query, this.socket = t.socket, this.supportsBinary = !t.forceBase64;
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
    return super.emitReserved("error", new tg(t, n, s)), this;
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
    const n = Qm(t);
    return n.length ? "?" + n : "";
  }
}
class ng extends Ca {
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
    qm(t, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
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
    this.writable = !1, Hm(t, (n) => {
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
const sg = Bu;
function rg() {
}
class ig extends ng {
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
    super(), this.createRequest = t, Gi(this, s), this._opts = s, this._method = s.method || "GET", this._uri = n, this._data = s.data !== void 0 ? s.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var t;
    const n = Du(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
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
      if (this._xhr.onreadystatechange = rg, t)
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
const og = function() {
  const e = Uu({
    xdomain: !1
  });
  return e && e.responseType !== null;
}();
class ag extends ig {
  constructor(t) {
    super(t);
    const n = t && t.forceBase64;
    this.supportsBinary = og && !n;
  }
  request(t = {}) {
    return Object.assign(t, { xd: this.xd }, this.opts), new bn(Uu, this.uri(), t);
  }
}
function Uu(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || sg))
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
class lg extends Ca {
  get name() {
    return "websocket";
  }
  doOpen() {
    const t = this.uri(), n = this.opts.protocols, s = zu ? {} : Du(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
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
      Sa(s, this.supportsBinary, (i) => {
        try {
          this.doWrite(s, i);
        } catch {
        }
        r && Ki(() => {
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
const Ao = en.WebSocket || en.MozWebSocket;
class cg extends lg {
  createSocket(t, n, s) {
    return zu ? new Ao(t, n, s) : n ? new Ao(t, n) : new Ao(t);
  }
  doWrite(t, n) {
    this.ws.send(n);
  }
}
class ug extends Ca {
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
        const n = jm(Number.MAX_SAFE_INTEGER, this.socket.binaryType), s = t.readable.pipeThrough(n).getReader(), r = Wm();
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
        r && Ki(() => {
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
const fg = {
  websocket: cg,
  webtransport: ug,
  polling: ag
}, hg = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, dg = [
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
  let r = hg.exec(e || ""), i = {}, o = 14;
  for (; o--; )
    i[dg[o]] = r[o] || "";
  return n != -1 && s != -1 && (i.source = t, i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"), i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), i.ipv6uri = !0), i.pathNames = pg(i, i.path), i.queryKey = mg(i, i.query), i;
}
function pg(e, t) {
  const n = /\/{2,9}/g, s = t.replace(n, "/").split("/");
  return (t.slice(0, 1) == "/" || t.length === 0) && s.splice(0, 1), t.slice(-1) == "/" && s.splice(s.length - 1, 1), s;
}
function mg(e, t) {
  const n = {};
  return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, r, i) {
    r && (n[r] = i);
  }), n;
}
const Yo = typeof addEventListener == "function" && typeof removeEventListener == "function", pi = [];
Yo && addEventListener("offline", () => {
  pi.forEach((e) => e());
}, !1);
class Jn extends mt {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(t, n) {
    if (super(), this.binaryType = Km, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, t && typeof t == "object" && (n = t, t = null), t) {
      const s = Go(t);
      n.hostname = s.host, n.secure = s.protocol === "https" || s.protocol === "wss", n.port = s.port, s.query && (n.query = s.query);
    } else n.host && (n.hostname = Go(n.host).host);
    Gi(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((s) => {
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
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = eg(this.opts.query)), Yo && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, pi.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
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
    n.EIO = Fu, n.transport = t, this.id && (n.sid = this.id);
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
      if (r && (n += Zm(r)), s > 0 && n > this._maxPayload)
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
    return t && (this._pingTimeoutTime = 0, Ki(() => {
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
        const s = pi.indexOf(this._offlineEventListener);
        s !== -1 && pi.splice(s, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", t, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
Jn.protocol = Fu;
class gg extends Jn {
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
    function d(v) {
      n && v.name !== n.name && i();
    }
    const c = () => {
      n.removeListener("open", r), n.removeListener("error", o), n.removeListener("close", a), this.off("close", l), this.off("upgrading", d);
    };
    n.once("open", r), n.once("error", o), n.once("close", a), this.once("close", l), this.once("upgrading", d), this._upgrades.indexOf("webtransport") !== -1 && t !== "webtransport" ? this.setTimeoutFn(() => {
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
let _g = class extends gg {
  constructor(t, n = {}) {
    const s = typeof t == "object", r = s ? { ...t } : { ...n };
    (!r.transports || r.transports && typeof r.transports[0] == "string") && (r.transports = (r.transports || ["polling", "websocket", "webtransport"]).map((i) => fg[i]).filter((i) => !!i)), super(s ? r : t, r);
  }
};
function yg(e, t = "", n) {
  let s = e;
  n = n || typeof location < "u" && location, e == null && (e = n.protocol + "//" + n.host), typeof e == "string" && (e.charAt(0) === "/" && (e.charAt(1) === "/" ? e = n.protocol + e : e = n.host + e), /^(https?|wss?):\/\//.test(e) || (typeof n < "u" ? e = n.protocol + "//" + e : e = "https://" + e), s = Go(e)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
  const i = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return s.id = s.protocol + "://" + i + ":" + s.port + t, s.href = s.protocol + "://" + i + (n && n.port === s.port ? "" : ":" + s.port), s;
}
const bg = typeof ArrayBuffer == "function", vg = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer, Hu = Object.prototype.toString, wg = typeof Blob == "function" || typeof Blob < "u" && Hu.call(Blob) === "[object BlobConstructor]", kg = typeof File == "function" || typeof File < "u" && Hu.call(File) === "[object FileConstructor]";
function Ra(e) {
  return bg && (e instanceof ArrayBuffer || vg(e)) || wg && e instanceof Blob || kg && e instanceof File;
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
  if (Ra(e))
    return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return mi(e.toJSON(), !0);
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && mi(e[n]))
      return !0;
  return !1;
}
function Tg(e) {
  const t = [], n = e.data, s = e;
  return s.data = gi(n, t), s.attachments = t.length, { packet: s, buffers: t };
}
function gi(e, t, n) {
  if (!e)
    return e;
  if (Ra(e)) {
    const s = { _placeholder: !0, num: t.length };
    return t.push(e), s;
  } else if (Array.isArray(e)) {
    const s = new Array(e.length);
    for (let r = 0; r < e.length; r++)
      s[r] = gi(e[r], t);
    return s;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    if (e.toJSON && typeof e.toJSON == "function" && !n)
      return gi(e.toJSON(), t, !0);
    const s = {};
    for (const r in e)
      Object.prototype.hasOwnProperty.call(e, r) && (s[r] = gi(e[r], t));
    return s;
  }
  return e;
}
function xg(e, t) {
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
var Pe;
(function(e) {
  e[e.CONNECT = 0] = "CONNECT", e[e.DISCONNECT = 1] = "DISCONNECT", e[e.EVENT = 2] = "EVENT", e[e.ACK = 3] = "ACK", e[e.CONNECT_ERROR = 4] = "CONNECT_ERROR", e[e.BINARY_EVENT = 5] = "BINARY_EVENT", e[e.BINARY_ACK = 6] = "BINARY_ACK";
})(Pe || (Pe = {}));
class Sg {
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
    return (t.type === Pe.EVENT || t.type === Pe.ACK) && mi(t) ? this.encodeAsBinary({
      type: t.type === Pe.EVENT ? Pe.BINARY_EVENT : Pe.BINARY_ACK,
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
    return (t.type === Pe.BINARY_EVENT || t.type === Pe.BINARY_ACK) && (n += t.attachments + "-"), t.nsp && t.nsp !== "/" && (n += t.nsp + ","), t.id != null && (n += t.id), t.data != null && (n += JSON.stringify(t.data, this.replacer)), n;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(t) {
    const n = Tg(t), s = this.encodeAsString(n.packet), r = n.buffers;
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
      const s = n.type === Pe.BINARY_EVENT;
      s || n.type === Pe.BINARY_ACK ? (n.type = s ? Pe.EVENT : Pe.ACK, this.reconstructor = new Eg(n)) : super.emitReserved("decoded", n);
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
    if (Pe[s.type] === void 0)
      throw new Error("unknown packet type " + s.type);
    if (s.type === Pe.BINARY_EVENT || s.type === Pe.BINARY_ACK) {
      const i = n + 1;
      for (; t.charAt(++n) !== "-" && n != t.length; )
        ;
      const o = t.substring(i, n);
      if (o != Number(o) || t.charAt(n) !== "-")
        throw new Error("Illegal attachments");
      const a = Number(o);
      if (!Cg(a) || a < 1)
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
      case Pe.CONNECT:
        return nc(n);
      case Pe.DISCONNECT:
        return n === void 0;
      case Pe.CONNECT_ERROR:
        return typeof n == "string" || nc(n);
      case Pe.EVENT:
      case Pe.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && Ag.indexOf(n[0]) === -1);
      case Pe.ACK:
      case Pe.BINARY_ACK:
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
class Eg {
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
      const n = xg(this.reconPack, this.buffers);
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
const Cg = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
};
function nc(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
const Rg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Ia,
  Encoder: Sg,
  get PacketType() {
    return Pe;
  }
}, Symbol.toStringTag, { value: "Module" }));
function an(e, t, n) {
  return e.on(t, n), function() {
    e.off(t, n);
  };
}
const Ig = Object.freeze({
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
    if (Ig.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (n.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const o = {
      type: Pe.EVENT,
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
      type: Pe.CONNECT,
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
        case Pe.CONNECT:
          t.data && t.data.sid ? this.onconnect(t.data.sid, t.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case Pe.EVENT:
        case Pe.BINARY_EVENT:
          this.onevent(t);
          break;
        case Pe.ACK:
        case Pe.BINARY_ACK:
          this.onack(t);
          break;
        case Pe.DISCONNECT:
          this.ondisconnect();
          break;
        case Pe.CONNECT_ERROR:
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
        type: Pe.ACK,
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
    return this.connected && this.packet({ type: Pe.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
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
function js(e) {
  e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;
}
js.prototype.duration = function() {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(), n = Math.floor(t * this.jitter * e);
    e = (Math.floor(t * 10) & 1) == 0 ? e - n : e + n;
  }
  return Math.min(e, this.max) | 0;
};
js.prototype.reset = function() {
  this.attempts = 0;
};
js.prototype.setMin = function(e) {
  this.ms = e;
};
js.prototype.setMax = function(e) {
  this.max = e;
};
js.prototype.setJitter = function(e) {
  this.jitter = e;
};
class Zo extends mt {
  constructor(t, n) {
    var s;
    super(), this.nsps = {}, this.subs = [], t && typeof t == "object" && (n = t, t = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, Gi(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5), this.backoff = new js({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = t;
    const r = n.parser || Rg;
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
    this.engine = new _g(this.uri, this.opts);
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
    Ki(() => {
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
const _r = {};
function _i(e, t) {
  typeof e == "object" && (t = e, e = void 0), t = t || {};
  const n = yg(e, t.path || "/socket.io"), s = n.source, r = n.id, i = n.path, o = _r[r] && i in _r[r].nsps, a = t.forceNew || t["force new connection"] || t.multiplex === !1 || o;
  let l;
  return a ? l = new Zo(s, t) : (_r[r] || (_r[r] = new Zo(s, t)), l = _r[r]), n.query && !t.query && (t.query = n.queryKey), l.socket(n.path, t);
}
Object.assign(_i, {
  Manager: Zo,
  Socket: qu,
  io: _i,
  connect: _i
});
const La = "ctid", Lg = "identity_expired", sc = 0.8, Og = 720 * 60 * 1e3, So = 30 * 1e3, Eo = 1e3, Hs = (e) => {
  if (typeof e != "string") return e ? String(e) : null;
  const t = e.trim();
  return !t || t === "undefined" || t === "null" ? null : t;
}, yi = (e) => {
  const t = Hs(e);
  if (!t) return null;
  const [, n] = t.split(".");
  if (!n) return null;
  try {
    const s = atob(n.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(s);
  } catch {
    return null;
  }
}, Ng = () => {
  try {
    return Hs(localStorage.getItem(La));
  } catch {
    return null;
  }
}, rc = (e) => {
  try {
    localStorage.setItem(La, e);
  } catch {
  }
}, Pg = () => {
  try {
    localStorage.removeItem(La);
  } catch {
  }
};
function Mg(e = {}) {
  const t = ce(null);
  let n = null, s = null;
  const r = () => {
    n && (clearTimeout(n), n = null);
  }, i = () => {
    const I = yi(t.value);
    return I != null && I.exp ? Number(I.exp) - Math.floor(Date.now() / Eo) : null;
  }, o = () => {
    const I = yi(t.value);
    if (!(I != null && I.exp)) return !1;
    const K = I.iat ? Number(I.exp) - Number(I.iat) : 0, F = i() ?? 0;
    return K <= 0 ? F <= 0 : F <= K * (1 - sc);
  }, a = (I, { persist: K = !0 } = {}) => {
    var oe;
    const F = Hs(I);
    if (r(), t.value = F, !F) {
      Pg();
      return;
    }
    K && (rc(F), (oe = e.onTokenChanged) == null || oe.call(e, F)), c();
  }, l = async (I) => {
    if (!t.value || !I) return !1;
    if (s) return s;
    const K = t.value;
    return s = (async () => {
      var F, oe;
      try {
        const fe = await fetch(`${Ws.API_URL}/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${K}`
          },
          body: JSON.stringify({ widget_id: I })
        });
        if (fe.status === 401)
          return (F = e.onIdentityExpired) == null || F.call(e), !1;
        if (!fe.ok)
          return c(So), !1;
        const pe = await fe.json(), R = Hs((oe = pe == null ? void 0 : pe.data) == null ? void 0 : oe.token);
        return R ? (a(R), !0) : !1;
      } catch {
        return c(So), !1;
      } finally {
        s = null;
      }
    })(), s;
  }, d = async (I) => t.value ? o() ? l(I) : !0 : !1, c = (I) => {
    r();
    const K = yi(t.value);
    if (!(K != null && K.exp) || !(K != null && K.iat)) return;
    const F = (Number(K.exp) - Number(K.iat)) * Eo, oe = (i() ?? 0) * Eo, fe = I ?? Math.min(
      Og,
      Math.max(0, oe - F * (1 - sc))
    );
    n = setTimeout(() => {
      n = null, d(v).then((pe) => {
        c(pe ? void 0 : So);
      });
    }, fe);
  };
  let v = "";
  return {
    token: t,
    start: (I, K) => {
      v = I;
      const F = Hs(K) || Ng();
      a(F, { persist: !1 }), F && rc(F);
    },
    stop: () => {
      r(), s = null;
    },
    setToken: a,
    ensureFresh: d
  };
}
const Fg = 5e3;
function Dg() {
  const e = ce([]), t = ce(!1), n = ce(""), s = ce(!1), r = ce(!1), i = ce(!1), o = ce("connecting"), a = ce(0), l = 5, d = ce({}), c = ce(null), v = ce("");
  let w = null;
  const z = 6e4, I = () => {
    t.value = !1, w && (clearTimeout(w), w = null);
  }, K = () => {
    t.value = !0, w && clearTimeout(w), w = setTimeout(I, z);
  };
  let F = null;
  const oe = 1e3, fe = 15e3;
  let pe = null;
  const R = /* @__PURE__ */ new Set(["ai_config_missing", "customer_required"]);
  let N = !1;
  const Y = ce(null), Z = () => {
    pe && (clearTimeout(pe), pe = null);
  }, Te = () => {
    if (pe || N) return;
    const S = Math.min(
      oe * 2 ** Math.max(0, a.value - 1),
      fe
    );
    pe = setTimeout(() => {
      pe = null, F == null || F.connect();
    }, S);
  };
  let Oe = null, _e = null, Fe = null, ve = null, Ke = null, Ge, at, ue;
  const ye = (S) => {
    var O;
    return (O = yi(S ?? null)) == null ? void 0 : O.sub;
  }, ge = (S) => {
    Ge = S, S && F != null && F.connected && F.emit("refresh_token", { conversation_token: S });
  }, nt = (S) => {
    at = S;
  }, Xe = () => {
    var V;
    const S = Ge || localStorage.getItem("ctid"), O = {};
    S && (O.conversation_token = S), at && (O.widget_id = at);
    try {
      O.page_url = window.parent !== window && ((V = window.parent.location) != null && V.href) ? window.parent.location.href : document.referrer || window.location.href;
    } catch {
      O.page_url = document.referrer || "";
    }
    return O;
  }, xe = (S) => (F = _i(`${Ws.WS_URL}/widget`, {
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
    auth: (O) => O(Xe())
  }), F.on("connect", () => {
    ue = ye(Xe().conversation_token), o.value = "connected", Z(), a.value = 0;
  }), F.on("bot_typing", () => {
    K();
  }), F.on("disconnect", () => {
    I(), o.value === "connected" && (console.log("Socket disconnected, setting connection status to connecting"), o.value = "connecting");
  }), F.on("connect_error", (O) => {
    var J;
    const V = (J = O == null ? void 0 : O.data) == null ? void 0 : J.type;
    if (V && R.has(V)) {
      N = !0, Y.value = V, Z(), o.value = "failed", V !== "customer_required" && Ct(O.data);
      return;
    }
    a.value++, console.error("Socket connection failed, attempt:", a.value), a.value >= l && (o.value = "failed"), F && !F.active && Te();
  }), F.on("chat_response", (O) => {
    if (I(), O.session_id ? (console.log("Captured session_id from chat_response:", O.session_id), v.value = O.session_id) : console.warn("No session_id in chat_response data:", O), O.type === "agent_message") {
      const V = {
        message: O.message,
        message_type: "agent",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: "",
        agent_name: O.agent_name,
        stream: !0,
        // live reply → client-side typewriter reveal
        attributes: {
          end_chat: O.end_chat,
          end_chat_reason: O.end_chat_reason,
          end_chat_description: O.end_chat_description,
          request_rating: O.request_rating
        }
      };
      O.attachments && Array.isArray(O.attachments) && (V.id = O.message_id, V.attachments = O.attachments.map((J, ae) => ({
        id: O.message_id * 1e3 + ae,
        filename: J.filename,
        file_url: J.file_url,
        content_type: J.content_type,
        file_size: J.file_size
      }))), e.value.push(V);
    } else O.shopify_output && typeof O.shopify_output == "object" && O.shopify_output.products ? e.value.push({
      message: O.message,
      // Keep the accompanying text message
      message_type: "product",
      // Use 'product' type for rendering
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: "",
      agent_name: O.agent_name,
      // Assign the whole structured object
      shopify_output: O.shopify_output,
      // Remove the old flattened fields (product_id, product_title, etc.)
      attributes: {
        // Keep other attributes if needed
        end_chat: O.end_chat,
        request_rating: O.request_rating
      }
    }) : e.value.push({
      message: O.message,
      message_type: "bot",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: "",
      agent_name: O.agent_name,
      stream: !0,
      // live reply → client-side typewriter reveal
      // Knowledge-base citations (display gated by show_citations in the widget)
      sources: Array.isArray(O.sources) && O.sources.length ? O.sources : void 0,
      attributes: {
        end_chat: O.end_chat,
        end_chat_reason: O.end_chat_reason,
        end_chat_description: O.end_chat_description,
        request_rating: O.request_rating
      }
    });
  }), F.on("handle_taken_over", (O) => {
    e.value.push({
      message: `${O.user_name} joined the conversation`,
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: O.session_id
    }), d.value = {
      ...d.value,
      human_agent_name: O.user_name,
      human_agent_profile_pic: O.profile_picture
    }, I(), Oe && Oe(O);
  }), F.on("session_initialized", (O) => {
    O.session_id && (v.value = O.session_id, Ke = {
      session_id: O.session_id,
      authenticated: !!O.authenticated,
      created: !!O.created
    }, ve == null || ve(Ke));
  }), F.on("error", Ct), F.on("chat_history", Rt), F.on("rating_submitted", Mt), F.on("display_form", Gt), F.on("form_submitted", g), F.on("workflow_state", y), F.on("workflow_proceeded", C), F), Je = async () => {
    try {
      return F != null && F.connected && ue && ue === ye(Xe().conversation_token) ? (o.value = "connected", !0) : (o.value = "connecting", a.value = 0, I(), Z(), N = !1, Y.value = null, F && (F.removeAllListeners(), F.disconnect(), F = null), F = xe(""), new Promise((S) => {
        F == null || F.on("connect", () => {
          S(!0);
        }), F == null || F.on("connect_error", () => {
          (N || a.value >= l) && S(!1);
        });
      }));
    } catch (S) {
      return console.error("Socket initialization failed:", S), o.value = "failed", !1;
    }
  }, st = () => (F && F.disconnect(), Je()), At = (S) => {
    Oe = S;
  }, Re = (S) => {
    ve = S, Ke && S(Ke);
  }, yt = (S) => {
    _e = S;
  }, pt = (S) => {
    Fe = S;
  }, Ct = (S) => {
    I(), n.value = Ld(S), s.value = !0, setTimeout(() => {
      s.value = !1, n.value = "";
    }, 5e3);
  }, Rt = (S) => {
    if (S.type === "chat_history" && Array.isArray(S.messages)) {
      const O = S.messages.map((V) => {
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
        ...O.filter(
          (V) => !e.value.some(
            (J) => J.message === V.message && J.created_at === V.created_at
          )
        ),
        ...e.value
      ];
    }
  }, Mt = (S) => {
    S.success && e.value.push({
      message: "Thank you for your feedback!",
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    });
  }, Gt = (S) => {
    var O;
    console.log("Form display handler in composable:", S), I(), c.value = S.form_data, console.log("Set currentForm in handleDisplayForm:", c.value), ((O = S.form_data) == null ? void 0 : O.form_full_screen) === !0 ? (console.log("Full screen form detected, triggering workflow state callback"), _e && _e({
      type: "form",
      form_data: S.form_data,
      session_id: S.session_id
    })) : e.value.push({
      message: "",
      message_type: "form",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: S.session_id,
      attributes: {
        form_data: S.form_data
      }
    });
  }, g = (S) => {
    console.log("Form submitted confirmation received, clearing currentForm"), c.value = null, S.success && console.log("Form submitted successfully");
  }, y = (S) => {
    console.log("Workflow state received in composable:", S), (S.type === "form" || S.type === "display_form") && (console.log("Setting currentForm from workflow state:", S.form_data), c.value = S.form_data), _e && _e(S);
  }, C = (S) => {
    console.log("Workflow proceeded in composable:", S), Fe && Fe(S);
  }, P = async (S, O) => {
    !F || !S || F.emit("submit_rating", {
      rating: S,
      feedback: O
    });
  }, $ = async (S) => {
    var J;
    if (console.log("Submitting form in socket:", S), console.log("Current form in socket:", c.value), console.log("Socket in socket:", F), !F) {
      console.error("No socket available for form submission");
      return;
    }
    if (!S || Object.keys(S).length === 0) {
      console.error("No form data to submit");
      return;
    }
    const V = ((J = c.value) == null ? void 0 : J.form_type) === "contact" ? "submit_contact_info" : "submit_form";
    console.log(`Emitting ${V} event with data:`, S), F.emit(V, {
      form_data: S
    }), c.value = null;
  }, L = async () => {
    F && (console.log("Getting workflow state 12"), F.emit("get_workflow_state"));
  }, G = async () => {
    F && F.emit("proceed_workflow", {});
  }, q = async (S, O, V = []) => {
    if (!F || !S.trim() && V.length === 0) return;
    const J = {
      message: S,
      message_type: "user",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    };
    V.length > 0 && (J.attachments = V.map((ae, we) => {
      let Ee = "";
      if (ae.content_type.startsWith("image/")) {
        const Me = atob(ae.content), f = new Array(Me.length);
        for (let T = 0; T < Me.length; T++)
          f[T] = Me.charCodeAt(T);
        const _ = new Uint8Array(f), M = new Blob([_], { type: ae.content_type });
        Ee = URL.createObjectURL(M);
      }
      return {
        id: Date.now() * 1e3 + we,
        // Temporary ID
        filename: ae.filename,
        file_url: Ee,
        // Temporary blob URL, will be replaced
        content_type: ae.content_type,
        file_size: ae.size,
        _isTemporary: !0
        // Flag to identify temporary attachments
      };
    })), e.value.push(J), F.emit("chat", {
      message: S,
      email: O,
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
    endChat: (S = "CUSTOMER_REQUEST") => new Promise((O) => {
      if (!F || !F.connected) {
        O(!1);
        return;
      }
      let V = !1;
      const J = (Me) => {
        V || (V = !0, clearTimeout(Ee), F == null || F.off("chat_ended", ae), F == null || F.off("error", we), Me && W(), O(Me));
      }, ae = () => J(!0), we = (Me) => {
        (Me == null ? void 0 : Me.type) === "end_chat_error" && J(!1);
      }, Ee = setTimeout(() => J(!1), Fg);
      F.on("chat_ended", ae), F.on("error", we), F.emit("end_chat", { reason: S });
    }),
    loadChatHistory: async () => {
      if (F)
        try {
          r.value = !0, F.emit("get_chat_history");
        } catch (S) {
          console.error("Failed to load chat history:", S);
        } finally {
          r.value = !1;
        }
    },
    connect: Je,
    reconnect: st,
    cleanup: () => {
      I(), Z(), F && (F.removeAllListeners(), F.disconnect(), F = null), Oe = null, _e = null, Fe = null;
    },
    humanAgent: d,
    onTakeover: At,
    onSessionState: Re,
    refusal: Y,
    submitRating: P,
    currentForm: c,
    submitForm: $,
    getWorkflowState: L,
    proceedWorkflow: G,
    onWorkflowState: yt,
    onWorkflowProceeded: pt,
    currentSessionId: v,
    setToken: ge,
    setWidgetId: nt
  };
}
function $g(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Co = { exports: {} }, ic;
function Bg() {
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
      function d(f) {
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
          Ie && H && ne && (Ie(ee), Ie = null);
        }
        _ = a(f, "link", { rel: "stylesheet", href: _, media: "all" });
        var H = !1, ne = !0, ee = null, Ie = M || null;
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
      function F(f) {
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
      function R(f, _) {
        this.c = f, this.f = 4, this.a = "n";
        var M = (_ || "n4").match(/^([nio])([1-9])$/i);
        M && (this.a = M[1], this.f = parseInt(M[2], 10));
      }
      function N(f) {
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
      function Oe(f) {
        var _ = 4, M = "n", T = null;
        return f && ((T = f.match(/(normal|oblique|italic)/i)) && T[1] && (M = T[1].substr(0, 1).toLowerCase()), (T = f.match(/([1-9]00|normal|bold)/i)) && T[1] && (/bold/i.test(T[1]) ? _ = 7 : /[1-9]00/.test(T[1]) && (_ = parseInt(T[1].substr(0, 1), 10)))), M + _;
      }
      function _e(f, _) {
        this.c = f, this.f = f.o.document.documentElement, this.h = _, this.a = new pe("-"), this.j = _.events !== !1, this.g = _.classes !== !1;
      }
      function Fe(f) {
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
        var f = this.c.o.document, _ = this, M = r(), T = new Promise(function(ee, Ie) {
          function Le() {
            r() - M >= _.f ? Ie() : f.fonts.load(N(_.a), _.h).then(function(Ce) {
              1 <= Ce.length ? ee() : setTimeout(Le, 25);
            }, function() {
              Ie();
            });
          }
          Le();
        }), H = null, ne = new Promise(function(ee, Ie) {
          H = setTimeout(Ie, _.f);
        });
        Promise.race([ne, T]).then(function() {
          H && (clearTimeout(H), H = null), _.g(_.a);
        }, function() {
          _.j(_.a);
        });
      };
      function Xe(f, _, M, T, H, ne, ee) {
        this.v = f, this.B = _, this.c = M, this.a = T, this.s = ee || "BESbswy", this.f = {}, this.w = H || 3e3, this.u = ne || null, this.m = this.j = this.h = this.g = null, this.g = new ue(this.c, this.s), this.h = new ue(this.c, this.s), this.j = new ue(this.c, this.s), this.m = new ue(this.c, this.s), f = new R(this.a.c + ",serif", Z(this.a)), f = ge(f), this.g.a.style.cssText = f, f = new R(this.a.c + ",sans-serif", Z(this.a)), f = ge(f), this.h.a.style.cssText = f, f = new R("serif", Z(this.a)), f = ge(f), this.j.a.style.cssText = f, f = new R("sans-serif", Z(this.a)), f = ge(f), this.m.a.style.cssText = f, ye(this.g), ye(this.h), ye(this.j), ye(this.m);
      }
      var xe = { D: "serif", C: "sans-serif" }, Je = null;
      function st() {
        if (Je === null) {
          var f = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          Je = !!f && (536 > parseInt(f[1], 10) || parseInt(f[1], 10) === 536 && 11 >= parseInt(f[2], 10));
        }
        return Je;
      }
      Xe.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = r(), Re(this);
      };
      function At(f, _, M) {
        for (var T in xe) if (xe.hasOwnProperty(T) && _ === f.f[xe[T]] && M === f.f[xe[T]]) return !0;
        return !1;
      }
      function Re(f) {
        var _ = f.g.a.offsetWidth, M = f.h.a.offsetWidth, T;
        (T = _ === f.f.serif && M === f.f["sans-serif"]) || (T = st() && At(f, _, M)), T ? r() - f.A >= f.w ? st() && At(f, _, M) && (f.u === null || f.u.hasOwnProperty(f.a.c)) ? pt(f, f.v) : pt(f, f.B) : yt(f) : pt(f, f.v);
      }
      function yt(f) {
        setTimeout(s(function() {
          Re(this);
        }, f), 50);
      }
      function pt(f, _) {
        setTimeout(s(function() {
          d(this.g.a), d(this.h.a), d(this.j.a), d(this.m.a), _(this.a);
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
          var ee = H || null, Ie = T || null || {};
          if (M.length === 0 && ne) ve(_.a);
          else {
            _.f += M.length, ne && (_.j = ne);
            var Le, Ce = [];
            for (Le = 0; Le < M.length; Le++) {
              var Be = M[Le], Ze = Ie[Be.c], wt = _.a, rn = Be;
              if (wt.g && c(wt.f, [wt.a.c("wf", rn.c, Z(rn).toString(), "loading")]), Ke(wt, "fontloading", rn), wt = null, Rt === null) if (window.FontFace) {
                var rn = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), kn = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                Rt = rn ? 42 < parseInt(rn[1], 10) : !kn;
              } else Rt = !1;
              Rt ? wt = new nt(s(_.g, _), s(_.h, _), _.c, Be, _.s, Ze) : wt = new Xe(s(_.g, _), s(_.h, _), _.c, Be, _.s, ee, Ze), Ce.push(wt);
            }
            for (Le = 0; Le < Ce.length; Le++) Ce[Le].start();
          }
        }, 0);
      }
      function y(f, _, M) {
        var H = [], T = M.timeout;
        Fe(_);
        var H = at(f.a, M, f.c), ne = new Ct(f.c, _, T);
        for (f.h = H.length, _ = 0, M = H.length; _ < M; _++) H[_].load(function(ee, Ie, Le) {
          g(f, ne, ee, Ie, Le);
        });
      }
      function C(f, _) {
        this.c = f, this.a = _;
      }
      C.prototype.load = function(f) {
        function _() {
          if (ne["__mti_fntLst" + T]) {
            var ee = ne["__mti_fntLst" + T](), Ie = [], Le;
            if (ee) for (var Ce = 0; Ce < ee.length; Ce++) {
              var Be = ee[Ce].fontfamily;
              ee[Ce].fontStyle != null && ee[Ce].fontWeight != null ? (Le = ee[Ce].fontStyle + ee[Ce].fontWeight, Ie.push(new R(Be, Le))) : Ie.push(new R(Be));
            }
            f(Ie);
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
      function P(f, _) {
        this.c = f, this.a = _;
      }
      P.prototype.load = function(f) {
        var _, M, T = this.a.urls || [], H = this.a.families || [], ne = this.a.testStrings || {}, ee = new K();
        for (_ = 0, M = T.length; _ < M; _++) z(this.c, T[_], F(ee));
        var Ie = [];
        for (_ = 0, M = H.length; _ < M; _++) if (T = H[_].split(":"), T[1]) for (var Le = T[1].split(","), Ce = 0; Ce < Le.length; Ce += 1) Ie.push(new R(T[0], Le[Ce]));
        else Ie.push(new R(T[0]));
        oe(ee, function() {
          f(Ie, ne);
        });
      };
      function $(f, _) {
        f ? this.c = f : this.c = L, this.a = [], this.f = [], this.g = _ || "";
      }
      var L = "https://fonts.googleapis.com/css";
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
      var U = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, te = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, X = { i: "i", italic: "i", n: "n", normal: "n" }, S = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function O(f) {
        for (var _ = f.f.length, M = 0; M < _; M++) {
          var T = f.f[M].split(":"), H = T[0].replace(/\+/g, " "), ne = ["n4"];
          if (2 <= T.length) {
            var ee, Ie = T[1];
            if (ee = [], Ie) for (var Ie = Ie.split(","), Le = Ie.length, Ce = 0; Ce < Le; Ce++) {
              var Be;
              if (Be = Ie[Ce], Be.match(/^[\w-]+$/)) {
                var Ze = S.exec(Be.toLowerCase());
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
          for (f.c[H] || (T = U[H]) && (f.c[H] = T), T = 0; T < ne.length; T += 1) f.a.push(new R(H, ne[T]));
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
        O(ne), z(M, q(T), F(_)), oe(_, function() {
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
            for (var H = [], ne = 0; ne < T.length; ne += 2) for (var ee = T[ne], Ie = T[ne + 1], Le = 0; Le < Ie.length; Le++) H.push(new R(ee, Ie[Le]));
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
          for (var ee = 0, Ie = ne.fonts.length; ee < Ie; ++ee) {
            var Le = ne.fonts[ee];
            T.a.push(new R(Le.name, Oe("font-weight:" + Le.weight + ";font-style:" + Le.style)));
          }
          f(T.a);
        }, I(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + w(this.c) + "/" + _ + ".js", function(H) {
          H && f([]);
        })) : f([]);
      };
      var Ee = new Gt(window);
      Ee.a.c.custom = function(f, _) {
        return new P(_, f);
      }, Ee.a.c.fontdeck = function(f, _) {
        return new we(_, f);
      }, Ee.a.c.monotype = function(f, _) {
        return new C(_, f);
      }, Ee.a.c.typekit = function(f, _) {
        return new ae(_, f);
      }, Ee.a.c.google = function(f, _) {
        return new V(_, f);
      };
      var Me = { load: s(Ee.load, Ee) };
      e.exports ? e.exports = Me : (window.WebFont = Me, window.WebFontConfig && Ee.load(window.WebFontConfig));
    })();
  }(Co)), Co.exports;
}
var Ug = Bg();
const zg = /* @__PURE__ */ $g(Ug), oc = [
  "Space Grotesk:400,500,600,700",
  "Instrument Sans:400,500,600",
  "JetBrains Mono:400,500,600"
], Hg = (e) => {
  const t = [...oc], n = (e == null ? void 0 : e.split(",")[0].trim().replace(/['"]/g, "")) || "", s = oc.some(
    (r) => r.toLowerCase().startsWith(n.toLowerCase())
  );
  n && !s && t.push(n), zg.load({
    google: { families: t },
    active: () => {
      if (!e) return;
      const r = document.querySelector(".chat-container");
      r && (r.style.fontFamily = e.includes(",") ? e : `"${e}", system-ui, sans-serif`);
    }
  });
};
function qg() {
  const e = ce({}), t = ce(""), n = (r) => {
    var i;
    e.value = r, r.photo_url && (e.value.photo_url = r.photo_url), Hg(r.font_family), Xn({
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
const Wg = 13, jg = 24;
function Vg(e, t) {
  const n = $i({}), s = [];
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
    t == null || t(), o(I === " " ? jg : Wg);
  };
  Dt(() => e.value.length, (c, v) => {
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
  }, d = (c) => {
    const v = n[c];
    return !!v && !v.done;
  };
  return Fr(() => {
    r && clearTimeout(r);
  }), { displayText: l, isStreaming: d };
}
function Kg(e) {
  const t = ce(!0);
  let n = 0;
  const s = () => {
    Xn({ type: "UNREAD_COUNT", count: n });
  }, r = (i) => {
    var o;
    ((o = i == null ? void 0 : i.data) == null ? void 0 : o.type) === "WIDGET_VISIBILITY" && (t.value = !!i.data.open, t.value && n !== 0 && (n = 0, s()));
  };
  Dt(() => e.value.length, (i, o) => {
    if (i <= (o ?? 0) || t.value) return;
    const a = e.value[i - 1];
    a && (a.message_type === "bot" || a.message_type === "agent") && (n += 1, s());
  }), zi(() => window.addEventListener("message", r)), Fr(() => window.removeEventListener("message", r));
}
const Gg = {
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
}, Yg = {
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
}, Xg = {
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
}, Zg = {
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
}, Jg = {
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
}, bi = {
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
}, Qg = {
  GLASS: Gg,
  AURORA: Yg,
  TERMINAL: Xg,
  CALM_MINT: Zg,
  PLAYFUL: Jg,
  SUNRISE: bi,
  CHATBOT: bi,
  ASK_ANYTHING: bi
}, e_ = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", ac = "'Instrument Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";
function t_(e) {
  return Math.max(4, Math.round(e * 0.3));
}
function lc(e) {
  const t = (e || "").replace("#", "");
  if (t.length < 6) return "#0B0C10";
  const n = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), r = parseInt(t.slice(4, 6), 16);
  return (0.299 * n + 0.587 * s + 0.114 * r) / 255 > 0.62 ? "#0B0C10" : "#FFFFFF";
}
function n_(e) {
  return Qg[e || ""] || bi;
}
const s_ = "#212529";
function r_(e, t) {
  const n = n_(e), s = (t == null ? void 0 : t.chat_background_color) || "", r = /^#[0-9a-fA-F]{6}$/.test(s), i = s || n.card, o = (t == null ? void 0 : t.chat_text_color) || "", l = /^#[0-9a-fA-F]{6}$/.test(o) && o.toLowerCase() !== s_ ? o : r ? Us(s) ? "#FFFFFF" : "#111111" : n.text, d = r ? Us(s) ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.62)" : n.muted, c = r ? Id(s, 20) : n.agentBg, v = (t == null ? void 0 : t.accent_color) || n.accent, w = r ? !Us(s) : n.light, z = lc(v) === "#0B0C10", I = w === z ? d : v, K = n.mono ? e_ : t != null && t.font_family ? `${t.font_family}, ${ac}` : ac;
  return {
    "--cm-card": i,
    "--cm-text": l,
    "--cm-muted": d,
    "--cm-agent-bg": c,
    "--cm-accent": v,
    "--cm-on-accent": lc(v),
    "--cm-presence": I,
    "--cm-border": n.border,
    "--cm-glow": n.glow,
    "--cm-radius": `${n.radius}px`,
    "--cm-bubble": `${n.bubble}px`,
    "--cm-bubble-tail": `${t_(n.bubble)}px`,
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
function i_() {
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
const o_ = {
  key: 0,
  class: "widget-unavailable-overlay"
}, a_ = {
  key: 1,
  class: "auth-error-overlay"
}, l_ = { class: "auth-error-card" }, c_ = { class: "auth-error-message" }, u_ = {
  key: 0,
  class: "initializing-overlay"
}, f_ = {
  key: 0,
  class: "connecting-message"
}, h_ = {
  key: 1,
  class: "failed-message"
}, d_ = { class: "welcome-content" }, p_ = { class: "welcome-header" }, m_ = ["src", "alt"], g_ = { class: "welcome-title" }, __ = { class: "welcome-subtitle" }, y_ = { class: "welcome-input-container" }, b_ = {
  key: 0,
  class: "email-input"
}, v_ = ["disabled"], w_ = { class: "welcome-message-input" }, k_ = ["placeholder", "disabled"], T_ = ["disabled"], x_ = {
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
}, S_ = { class: "landing-page-content" }, E_ = { class: "landing-page-header" }, C_ = { class: "landing-page-heading" }, R_ = { class: "landing-page-text" }, I_ = { class: "landing-page-actions" }, L_ = { class: "form-fullscreen-content" }, O_ = {
  key: 0,
  class: "form-header"
}, N_ = {
  key: 0,
  class: "form-title"
}, P_ = {
  key: 1,
  class: "form-description"
}, M_ = { class: "form-fields" }, F_ = ["for"], D_ = {
  key: 0,
  class: "required-indicator"
}, $_ = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "autocomplete", "inputmode"], B_ = ["id", "placeholder", "required", "min", "max", "value", "onInput"], U_ = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput"], z_ = ["id", "required", "value", "onChange"], H_ = { value: "" }, q_ = ["value"], W_ = {
  key: 4,
  class: "checkbox-field"
}, j_ = ["id", "required", "checked", "onChange"], V_ = { class: "checkbox-label" }, K_ = {
  key: 5,
  class: "radio-group"
}, G_ = ["name", "value", "required", "checked", "onChange"], Y_ = { class: "radio-label" }, X_ = {
  key: 6,
  class: "field-error"
}, Z_ = { class: "form-actions" }, J_ = ["disabled"], Q_ = {
  key: 0,
  class: "loading-spinner-inline"
}, ey = { key: 1 }, ty = { class: "header-content" }, ny = ["src", "alt"], sy = { class: "header-info" }, ry = { class: "status" }, iy = { class: "status-text cm-presence" }, oy = { class: "header-actions" }, ay = ["disabled", "title", "aria-label", "aria-expanded"], ly = { class: "ask-anything-header" }, cy = ["src", "alt"], uy = { class: "header-info" }, fy = {
  key: 2,
  class: "loading-history"
}, hy = { class: "cm-email-gate-title" }, dy = ["disabled"], py = {
  key: 0,
  class: "cm-email-gate-error"
}, my = ["disabled"], gy = {
  key: 0,
  class: "cm-welcome-block"
}, _y = { class: "message agent-message cm-welcome-row" }, yy = ["src", "alt"], by = {
  key: 0,
  class: "cm-msg-avatar",
  "aria-hidden": "true"
}, vy = ["src"], wy = ["src"], ky = { class: "message-col" }, Ty = {
  key: 0,
  class: "rating-content"
}, xy = { class: "rating-prompt" }, Ay = ["onMouseover", "onMouseleave", "onClick", "disabled"], Sy = {
  key: 0,
  class: "feedback-wrapper"
}, Ey = { class: "feedback-section" }, Cy = ["onUpdate:modelValue", "disabled"], Ry = { class: "feedback-counter" }, Iy = ["onClick", "disabled"], Ly = {
  key: 1,
  class: "submitted-feedback-wrapper"
}, Oy = { class: "submitted-feedback" }, Ny = { class: "submitted-feedback-text" }, Py = {
  key: 2,
  class: "submitted-message"
}, My = {
  key: 1,
  class: "form-content"
}, Fy = {
  key: 0,
  class: "form-header"
}, Dy = {
  key: 0,
  class: "form-title"
}, $y = {
  key: 1,
  class: "form-description"
}, By = { class: "form-fields" }, Uy = ["for"], zy = {
  key: 0,
  class: "required-indicator"
}, Hy = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "disabled", "autocomplete", "inputmode"], qy = ["id", "placeholder", "required", "min", "max", "value", "onInput", "disabled"], Wy = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "disabled"], jy = ["id", "required", "value", "onChange", "disabled"], Vy = { value: "" }, Ky = ["value"], Gy = {
  key: 4,
  class: "checkbox-field"
}, Yy = ["id", "checked", "onChange", "disabled"], Xy = ["for"], Zy = {
  key: 5,
  class: "radio-field"
}, Jy = ["id", "name", "value", "checked", "onChange", "disabled"], Qy = ["for"], eb = {
  key: 6,
  class: "field-error"
}, tb = { class: "form-actions" }, nb = ["onClick", "disabled"], sb = {
  key: 2,
  class: "user-input-content"
}, rb = {
  key: 0,
  class: "user-input-prompt"
}, ib = {
  key: 1,
  class: "user-input-form"
}, ob = ["onUpdate:modelValue", "onKeydown"], ab = ["onClick", "disabled"], lb = {
  key: 2,
  class: "user-input-submitted"
}, cb = {
  key: 0,
  class: "user-input-confirmation"
}, ub = {
  key: 3,
  class: "product-message-container"
}, fb = ["innerHTML"], hb = {
  key: 1,
  class: "products-carousel"
}, db = { class: "carousel-items" }, pb = {
  key: 0,
  class: "product-image-compact"
}, mb = ["src", "alt"], gb = { class: "product-info-compact" }, _b = { class: "product-text-area" }, yb = { class: "product-title-compact" }, bb = {
  key: 0,
  class: "product-variant-compact"
}, vb = { class: "product-price-compact" }, wb = { class: "product-actions-compact" }, kb = ["onClick"], Tb = {
  key: 2,
  class: "no-products-message"
}, xb = {
  key: 3,
  class: "no-products-message"
}, Ab = ["innerHTML"], Sb = ["innerHTML"], Eb = {
  key: 2,
  class: "message-attachments"
}, Cb = {
  key: 0,
  class: "attachment-image-container"
}, Rb = ["src", "alt", "onClick"], Ib = { class: "attachment-image-info" }, Lb = ["href"], Ob = { class: "attachment-size" }, Nb = ["href"], Pb = { class: "attachment-size" }, Mb = {
  key: 0,
  class: "citation-chips"
}, Fb = ["title"], Db = { class: "message-info" }, $b = {
  key: 0,
  class: "agent-name"
}, Bb = {
  key: 5,
  class: "cm-quick-actions-bar"
}, Ub = ["disabled", "onClick"], zb = {
  key: 0,
  class: "file-previews-widget"
}, Hb = {
  class: "file-preview-content-widget",
  style: { cursor: "pointer" }
}, qb = ["src", "alt", "onClick"], Wb = ["onClick"], jb = { class: "file-preview-info-widget" }, Vb = { class: "file-preview-name-widget" }, Kb = { class: "file-preview-size-widget" }, Gb = ["onClick"], Yb = {
  key: 1,
  class: "upload-progress-widget"
}, Xb = { class: "message-input" }, Zb = ["placeholder", "disabled"], Jb = ["disabled", "title"], Qb = ["disabled"], ev = {
  key: 7,
  class: "new-conversation-section"
}, tv = { class: "conversation-ended-message" }, nv = {
  key: 8,
  class: "ai-disclaimer"
}, sv = {
  key: 8,
  class: "rating-dialog"
}, rv = { class: "rating-content" }, iv = { class: "star-rating" }, ov = ["onClick"], av = { class: "rating-actions" }, lv = ["disabled"], cv = {
  key: 0,
  class: "preview-modal-image-container"
}, uv = ["src", "alt"], fv = { class: "preview-modal-filename" }, hv = {
  key: 3,
  class: "widget-loading"
}, uc = 3, dv = "image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx,.xls", pv = /* @__PURE__ */ fa({
  __name: "WidgetBuilder",
  props: {
    widgetId: {},
    token: {},
    initialAuthError: {}
  },
  setup(e) {
    const t = e, n = de(() => {
      var h;
      return t.widgetId || ((h = window.__INITIAL_DATA__) == null ? void 0 : h.widgetId);
    }), {
      customization: s,
      agentName: r,
      applyCustomization: i,
      initializeFromData: o
    } = qg(), { formatCurrency: a } = i_(), {
      messages: l,
      loading: d,
      errorMessage: c,
      showError: v,
      loadingHistory: w,
      hasStartedChat: z,
      connectionStatus: I,
      sendMessage: K,
      endChat: F,
      loadChatHistory: oe,
      connect: fe,
      reconnect: pe,
      cleanup: R,
      humanAgent: N,
      onTakeover: Y,
      refusal: Z,
      submitRating: Te,
      submitForm: Oe,
      currentForm: _e,
      getWorkflowState: Fe,
      proceedWorkflow: ve,
      onWorkflowState: Ke,
      onWorkflowProceeded: Ge,
      currentSessionId: at,
      setToken: ue,
      setWidgetId: ye,
      onSessionState: ge
    } = Dg(), { displayText: nt, isStreaming: Xe } = Vg(l, () => bs(() => zn()));
    Kg(l);
    const xe = ce(""), Je = ce(!0), st = ce(""), At = ce(!1), Re = (h) => {
      const m = h.target;
      xe.value = m.value;
    };
    let yt = null;
    const pt = () => {
      yt && yt.disconnect(), yt = new MutationObserver((m) => {
        let u = !1, re = !1;
        m.forEach((Ae) => {
          if (Ae.type === "childList") {
            const me = Array.from(Ae.addedNodes).some(
              (it) => {
                var Ye;
                return it.nodeType === Node.ELEMENT_NODE && (it.matches("input, textarea") || ((Ye = it.querySelector) == null ? void 0 : Ye.call(it, "input, textarea")));
              }
            ), ct = Array.from(Ae.removedNodes).some(
              (it) => {
                var Ye;
                return it.nodeType === Node.ELEMENT_NODE && (it.matches("input, textarea") || ((Ye = it.querySelector) == null ? void 0 : Ye.call(it, "input, textarea")));
              }
            );
            me && (re = !0, u = !0), ct && (u = !0);
          }
        }), u && (clearTimeout(pt.timeoutId), pt.timeoutId = setTimeout(() => {
          y();
        }, re ? 50 : 100));
      });
      const h = document.querySelector(".widget-container") || document.body;
      yt.observe(h, {
        childList: !0,
        subtree: !0
      });
    };
    pt.timeoutId = null;
    let Ct = [];
    const Rt = /* @__PURE__ */ new Set();
    let Mt = !1;
    const Gt = (h) => {
      if (Mt) return;
      const m = setTimeout(() => {
        Rt.delete(m), y();
      }, h);
      Rt.add(m);
    }, g = () => {
      Rt.forEach(clearTimeout), Rt.clear();
    }, y = () => {
      C();
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
      let m = [];
      for (const u of h) {
        const re = document.querySelectorAll(u);
        if (re.length > 0) {
          m = Array.from(re);
          break;
        }
      }
      m.length !== 0 && (Ct = m, m.forEach((u) => {
        u.addEventListener("input", $, !0), u.addEventListener("keyup", $, !0), u.addEventListener("change", $, !0), u.addEventListener("keypress", L, !0), u.addEventListener("keydown", G, !0);
      }));
    }, C = () => {
      Ct.forEach((h) => {
        h.removeEventListener("input", $), h.removeEventListener("keyup", $), h.removeEventListener("change", $), h.removeEventListener("keypress", L), h.removeEventListener("keydown", G);
      }), Ct = [];
    }, P = (h) => !!(h && h.closest && h.closest(".form-message, .form-fullscreen, .cm-email-gate")), $ = (h) => {
      if (P(h.target)) return;
      const m = h.target;
      xe.value = m.value;
    }, L = (h) => {
      P(h.target) || h.key === "Enter" && !h.shiftKey && (h.preventDefault(), h.stopPropagation(), cn());
    }, G = (h) => {
      P(h.target) || h.key === "Enter" && !h.shiftKey && (h.preventDefault(), h.stopPropagation(), cn());
    }, q = (h) => {
      const m = h.target, u = document.querySelector(".header-menu-container");
      document.querySelector(".header-menu-btn");
      const re = document.querySelector(".header-dropdown-menu");
      re && !(u != null && u.contains(m)) && (re.style.display = "none");
    }, W = ce(!0), {
      token: U,
      start: te,
      stop: X,
      setToken: S,
      ensureFresh: O
    } = Mg({
      onTokenChanged: (h) => {
        Xn({ type: "TOKEN_UPDATE", token: h }), ue(h);
      },
      onIdentityExpired: () => {
        j();
      }
    });
    de(() => !!U.value);
    const V = ce(null), J = ce(!1), ae = ce(!1);
    t.initialAuthError && (V.value = t.initialAuthError, J.value = !0, W.value = !1), o();
    const we = window.__INITIAL_DATA__;
    te((we == null ? void 0 : we.widgetId) || "", we == null ? void 0 : we.initialToken), U.value && (At.value = !0);
    const Ee = ce(!1);
    (we == null ? void 0 : we.allowAttachments) !== void 0 && (Ee.value = we.allowAttachments);
    const Me = ce(null), {
      chatStyles: f,
      chatIconStyles: _,
      agentBubbleStyles: M,
      userBubbleStyles: T,
      messageNameStyles: H,
      headerBorderStyles: ne,
      photoUrl: ee,
      shadowStyle: Ie
    } = Pm(s), Le = ce(null), {
      uploadedAttachments: Ce,
      previewModal: Be,
      previewFile: Ze,
      formatFileSize: wt,
      isImageAttachment: rn,
      getDownloadUrl: kn,
      getPreviewUrl: Vs,
      handleFileSelect: Ks,
      handleDrop: rs,
      handleDragOver: is,
      handleDragLeave: qt,
      handlePaste: Tn,
      removeAttachment: Gs,
      openPreview: os,
      closePreview: ks,
      openFilePicker: Ys,
      isImage: Ts
    } = Dm(U, Le);
    de(() => l.value.some(
      (h) => h.message_type === "form" && (!h.isSubmitted || h.isSubmitted === !1)
    ));
    const xn = de(() => {
      var h;
      return z.value && At.value || !eo.value ? I.value === "connected" && !d.value : fr(st.value.trim()) && I.value === "connected" && !d.value || ((h = window.__INITIAL_DATA__) == null ? void 0 : h.workflow);
    }), An = de(() => xn.value || d.value && I.value === "connected" && z.value), Xs = de(() => I.value === "connected" ? Jt.value ? "Ask me anything..." : "Type a message..." : "Connecting..."), Sn = ce(!1), cn = async () => {
      if (!xe.value.trim() && Ce.value.length === 0) return;
      if (d.value && z.value) {
        Sn.value = !0;
        return;
      }
      !z.value && st.value && await Un();
      const h = Ce.value.map((u) => ({
        content: u.content,
        // base64 content
        filename: u.filename,
        content_type: u.type,
        size: u.size
      }));
      await K(xe.value, st.value, h), Ce.value.forEach((u) => {
        u.url && u.url.startsWith("blob:") && URL.revokeObjectURL(u.url), u.file_url && u.file_url.startsWith("blob:") && URL.revokeObjectURL(u.file_url);
      }), xe.value = "", Ce.value = [];
      const m = document.querySelector('input[placeholder*="Type a message"]');
      m && (m.value = ""), Gt(500);
    };
    Dt(d, (h) => {
      h || !Sn.value || (Sn.value = !1, I.value === "connected" && z.value && cn());
    });
    const Br = (h) => {
      xn.value && (xe.value = h, cn());
    }, rt = () => {
      Xn({ type: "WIDGET_MINIMIZE" });
    }, En = (h) => {
      h.key === "Enter" && !h.shiftKey && (h.preventDefault(), h.stopPropagation(), cn());
    }, Un = async ({ afterRefusal: h = !1 } = {}) => {
      var m, u, re, Ae;
      try {
        if (!n.value)
          return console.error("Widget ID is not available"), V.value = "Widget ID is not available. Please refresh and try again.", J.value = !0, !1;
        await O(n.value);
        const me = new URL(`${Ws.API_URL}/widgets/${n.value}`);
        st.value.trim() && fr(st.value.trim()) && me.searchParams.append("email", st.value.trim());
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
          At.value = !1;
          try {
            const jn = (await it.json()).detail;
            if ((jn == null ? void 0 : jn.code) === Lg)
              return j(), !1;
            const Is = typeof jn == "string" ? jn : "";
            (Is.includes("generate-token") || Is.includes("API key") || Is.includes("Token required")) && (ae.value = !0, V.value = "Widget authentication not configured. Please contact the website administrator.", J.value = !0, S(null));
          } catch {
            V.value = "Authentication required. Your token has expired or is invalid. Please refresh the page.", J.value = !0, S(null);
          }
          return !1;
        }
        if (!it.ok) {
          try {
            const ar = await it.json();
            V.value = ar.detail || `Error: ${it.statusText}`;
          } catch {
            V.value = `Error: ${it.statusText}. Please try again.`;
          }
          return J.value = !0, !1;
        }
        const Ye = await it.json();
        Ye.token && S(Ye.token), At.value = !0, V.value = null, J.value = !1, ue(U.value || void 0);
        const or = await fe();
        return !or && Z.value === "customer_required" && !h ? await Un({ afterRefusal: !0 }) : (or || console.error("Chat service not reachable yet; retrying in the background"), await Ur(), (m = Ye.agent) != null && m.customization && i(Ye.agent.customization), Ye.agent && !(Ye != null && Ye.human_agent) && (r.value = Ye.agent.name), Ye != null && Ye.human_agent && (N.value = Ye.human_agent), ((u = Ye.agent) == null ? void 0 : u.allow_attachments) !== void 0 && (Ee.value = Ye.agent.allow_attachments), ((re = Ye.agent) == null ? void 0 : re.workflow) !== void 0 && (window.__INITIAL_DATA__ = window.__INITIAL_DATA__ || {}, window.__INITIAL_DATA__.workflow = Ye.agent.workflow), (Ae = Ye.agent) != null && Ae.workflow && await Fe(), !0);
      } catch (me) {
        return console.error("Error checking authorization:", me), V.value = "An unexpected error occurred. Please try again.", J.value = !0, At.value = !1, !1;
      } finally {
        W.value = !1;
      }
    }, Ur = async () => {
      !z.value && At.value && (z.value = !0, await oe());
    }, zn = () => {
      Me.value && (Me.value.scrollTop = Me.value.scrollHeight);
    };
    Dt(() => l.value, (h) => {
      bs(() => {
        zn();
      });
    }, { deep: !0 }), Dt(I, (h, m) => {
      h === "connected" && m !== "connected" && Gt(100);
    }), Dt(() => l.value.length, (h, m) => {
      h > 0 && m === 0 && Gt(100);
    });
    let Zs = null;
    Dt(() => l.value, (h) => {
      const m = h[h.length - 1];
      !Yl(m) || m === Zs || (Zs = m, er(m));
    }, { deep: !0 });
    const zr = async () => {
      (await pe() || Z.value === "customer_required") && await Un();
    }, Hr = ce(!1), xs = ce(0), Js = ce(""), Yt = ce(0), bt = ce(!1), ft = ce({}), ht = ce(!1), Qe = ce({}), Cn = ce(!1), un = ce(null), Qs = ce("Start Chat"), Rn = ce(!1), kt = ce(null);
    de(() => {
      var m;
      const h = l.value[l.value.length - 1];
      return ((m = h == null ? void 0 : h.attributes) == null ? void 0 : m.request_rating) || !1;
    });
    const Hn = de(() => {
      var m;
      if (!((m = window.__INITIAL_DATA__) != null && m.workflow))
        return !1;
      const h = l.value.find((u) => u.message_type === "rating");
      return (h == null ? void 0 : h.isSubmitted) === !0;
    }), Xt = de(
      () => Oi(N.value.human_agent_profile_pic)
    ), er = async (h) => {
      var m, u, re, Ae, me;
      if (Yl(h)) {
        try {
          if (h.session_id && U.value && n.value) {
            const ct = new URL(`${Ws.API_URL}/widgets/${n.value}/end-chat`);
            ct.searchParams.append("session_id", h.session_id), (m = h.attributes) != null && m.end_chat_reason && ct.searchParams.append("reason", h.attributes.end_chat_reason), (u = h.attributes) != null && u.end_chat_description && ct.searchParams.append("description", h.attributes.end_chat_description);
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
        if ((re = h.attributes) != null && re.end_chat && ((Ae = h.attributes) != null && Ae.request_rating)) {
          const ct = h.agent_name || ((me = N.value) == null ? void 0 : me.human_agent_name) || r.value || "our agent";
          l.value.push({
            message: `Rate the chat session that you had with ${ct}`,
            message_type: "rating",
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            session_id: h.session_id,
            agent_name: ct,
            showFeedback: !1
          }), at.value = h.session_id;
        }
      }
    }, As = (h) => {
      bt.value || (Yt.value = h);
    }, qn = () => {
      if (!bt.value) {
        const h = l.value[l.value.length - 1];
        Yt.value = (h == null ? void 0 : h.selectedRating) || 0;
      }
    }, as = async (h) => {
      if (!bt.value) {
        Yt.value = h;
        const m = l.value[l.value.length - 1];
        m && m.message_type === "rating" && (m.showFeedback = !0, m.selectedRating = h);
      }
    }, Zt = async (h, m, u = null) => {
      try {
        bt.value = !0, await Te(m, u);
        const re = l.value.find((Ae) => Ae.message_type === "rating");
        re && (re.isSubmitted = !0, re.finalRating = m, re.finalFeedback = u);
      } catch (re) {
        console.error("Failed to submit rating:", re);
      } finally {
        bt.value = !1;
      }
    }, Yi = (h) => {
      const m = {};
      for (const u of h.fields) {
        const re = ft.value[u.name], Ae = Es(u, re);
        Ae && (m[u.name] = Ae);
      }
      return Qe.value = m, Object.keys(m).length === 0;
    }, Ss = async (h) => {
      if (!(ht.value || !Yi(h)))
        try {
          ht.value = !0, await Oe(ft.value);
          const u = l.value.findIndex(
            (re) => re.message_type === "form" && (!re.isSubmitted || re.isSubmitted === !1)
          );
          u !== -1 && l.value.splice(u, 1), ft.value = {}, Qe.value = {};
        } catch (u) {
          console.error("Failed to submit form:", u);
        } finally {
          ht.value = !1;
        }
    }, It = (h, m) => {
      var u, re;
      if (ft.value[h] = m, m && m.toString().trim() !== "") {
        let Ae = null;
        if ((u = kt.value) != null && u.fields && (Ae = kt.value.fields.find((me) => me.name === h)), !Ae && ((re = _e.value) != null && re.fields) && (Ae = _e.value.fields.find((me) => me.name === h)), Ae) {
          const me = Es(Ae, m);
          me ? (Qe.value[h] = me, console.log(`Validation error for ${h}:`, me)) : delete Qe.value[h];
        }
      } else
        delete Qe.value[h], console.log(`Cleared error for ${h}`);
    }, qr = (h) => {
      const m = h.replace(/\D/g, "");
      return m.length >= 7 && m.length <= 15;
    }, Es = (h, m) => {
      if (h.required && (!m || m.toString().trim() === ""))
        return `${h.label} is required`;
      if (!m || m.toString().trim() === "")
        return null;
      if (h.type === "email" && !fr(m))
        return "Please enter a valid email address";
      if (h.type === "tel" && !qr(m))
        return "Please enter a valid phone number";
      if ((h.type === "text" || h.type === "textarea") && h.minLength && m.length < h.minLength)
        return `${h.label} must be at least ${h.minLength} characters`;
      if ((h.type === "text" || h.type === "textarea") && h.maxLength && m.length > h.maxLength)
        return `${h.label} must not exceed ${h.maxLength} characters`;
      if (h.type === "number") {
        const u = parseFloat(m);
        if (isNaN(u))
          return `${h.label} must be a valid number`;
        if (h.minLength && u < h.minLength)
          return `${h.label} must be at least ${h.minLength}`;
        if (h.maxLength && u > h.maxLength)
          return `${h.label} must not exceed ${h.maxLength}`;
      }
      return null;
    }, Wr = async () => {
      if (!(ht.value || !kt.value))
        try {
          ht.value = !0, Qe.value = {};
          let h = !1;
          for (const m of kt.value.fields || []) {
            const u = ft.value[m.name], re = Es(m, u);
            re && (Qe.value[m.name] = re, h = !0, console.log(`Validation error for field ${m.name}:`, re));
          }
          if (h) {
            ht.value = !1, console.log("Validation failed, not submitting");
            return;
          }
          await Oe(ft.value), Rn.value = !1, kt.value = null, ft.value = {};
        } catch (h) {
          console.error("Failed to submit full screen form:", h);
        } finally {
          ht.value = !1, console.log("Full screen form submission completed");
        }
    }, jr = (h, m) => {
      if (console.log("handleViewDetails called with:", { product: h, shopDomain: m }), !h) {
        console.error("No product provided to handleViewDetails");
        return;
      }
      let u = null;
      if (h.handle && m)
        u = `https://${m}/products/${h.handle}`;
      else if (h.id && m)
        u = `https://${m}/products/${h.id}`;
      else if (m) {
        if (!h.handle && !h.id) {
          console.error("Product handle and ID are both missing! Product:", h), alert("Unable to open product: Product information incomplete.");
          return;
        }
      } else {
        console.error("Shop domain is missing! Product:", h), alert("Unable to open product: Shop domain not available. Please contact support.");
        return;
      }
      u && (console.log("Opening product URL:", u), window.open(u, "_blank"));
    }, Xi = (h) => {
      if (!h) return "";
      let m = h.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "");
      const u = [];
      return m = m.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (re, Ae, me) => {
        const ct = `__MARKDOWN_LINK_${u.length}__`;
        return console.log("Found markdown link:", re, "-> placeholder:", ct), u.push(re), ct;
      }), console.log("After replacing markdown links with placeholders:", m), console.log("Markdown links array:", u), m = m.replace(/https?:\/\/[^\s\)]+/g, "[link removed]"), console.log("After removing standalone URLs:", m), u.forEach((re, Ae) => {
        m = m.replace(`__MARKDOWN_LINK_${Ae}__`, re), console.log(`Restored markdown link ${Ae}:`, re);
      }), m = m.replace(/\n\s*\n\s*\n/g, `

`).trim(), m;
    }, tr = ce(!1);
    ce(!1);
    const nr = de(() => {
      var h;
      return !!((h = N.value) != null && h.human_agent_name);
    }), Vr = de(() => {
      var h;
      return Om((h = window.__INITIAL_DATA__) == null ? void 0 : h.presence, nr.value);
    }), Kr = de(() => Ee.value && nr.value && Ce.value.length < uc), Cs = async () => {
      try {
        Cn.value = !1, un.value = null, await ve();
      } catch (h) {
        console.error("Failed to proceed workflow:", h);
      }
    }, ls = async (h) => {
      try {
        if (!h.userInputValue || !h.userInputValue.trim())
          return;
        const m = h.userInputValue.trim();
        h.isSubmitted = !0, h.submittedValue = m, await K(m, st.value);
      } catch (m) {
        console.error("Failed to submit user input:", m), h.isSubmitted = !1, h.submittedValue = null;
      }
    }, j = () => {
      Xn({ type: "IDENTITY_EXPIRED" });
    }, p = async () => {
      U.value && (S(null), await B());
    }, k = async (h) => {
      const m = Hs(h);
      !m || m === U.value || (S(m), await B());
    }, B = async () => {
      var h, m, u;
      try {
        let re = 0;
        const Ae = 50;
        for (; !((h = window.__INITIAL_DATA__) != null && h.widgetId) && re < Ae; )
          await new Promise((ct) => setTimeout(ct, 100)), re++;
        return (m = window.__INITIAL_DATA__) != null && m.widgetId ? (ye(window.__INITIAL_DATA__.widgetId), await Un() ? ((u = window.__INITIAL_DATA__) != null && u.workflow && At.value && await Fe(), !0) : (I.value = "connected", !1)) : (console.error("Widget data not available after waiting"), !1);
      } catch (re) {
        return console.error("Failed to initialize widget:", re), !1;
      }
    };
    window.addEventListener("message", (h) => {
      h.source === window.parent && (!h.data || typeof h.data.type != "string" || (h.data.type === "SCROLL_TO_BOTTOM" && zn(), h.data.type === "IDENTITY_UNAVAILABLE" && p(), h.data.type === "TOKEN_REFRESH" && k(h.data.token), h.data.type === "WIDGET_VISIBILITY" && (Ua.value = !!h.data.open), h.data.type === "WIDGET_DISPLAY" && (to.value = {
        mode: h.data.mode,
        width: h.data.width,
        height: h.data.height,
        hotkey: h.data.hotkey
      }), h.data.type === "PREFILL_MESSAGE" && typeof h.data.text == "string" && (xe.value = h.data.text.slice(0, 2e3), bs(() => {
        const m = document.querySelector(
          ".message-input input, .welcome-message-field"
        );
        m == null || m.focus();
      }))));
    });
    const Q = () => {
      Y(async () => {
        await Un();
      }), ge(({ session_id: h, authenticated: m, created: u }) => {
        Xn({
          type: "CHAT_SESSION",
          sessionId: h,
          authenticated: m,
          created: u
        });
      }), Ke((h) => {
        var m;
        if (Qs.value = h.button_text || "Start Chat", h.type === "landing_page")
          un.value = h.landing_page_data, Cn.value = !0, Rn.value = !1;
        else if (h.type === "form" || h.type === "display_form")
          if (((m = h.form_data) == null ? void 0 : m.form_full_screen) === !0)
            kt.value = h.form_data, Rn.value = !0, Cn.value = !1;
          else {
            const u = {
              message: "",
              message_type: "form",
              attributes: {
                form_data: h.form_data
              },
              created_at: (/* @__PURE__ */ new Date()).toISOString(),
              isSubmitted: !1
            };
            l.value.findIndex(
              (Ae) => Ae.message_type === "form" && !Ae.isSubmitted
            ) === -1 && l.value.push(u), Cn.value = !1, Rn.value = !1;
          }
        else
          Cn.value = !1, Rn.value = !1;
      }), Ge((h) => {
        console.log("Workflow proceeded:", h);
      });
    }, ie = async () => {
      try {
        await B(), await Fe();
      } catch (h) {
        throw console.error("Failed to start new conversation:", h), h;
      }
    }, he = de(
      () => {
        var h;
        return s.value.allow_new_chat === !0 && l.value.length > 0 && !((h = N.value) != null && h.human_agent_name) && !cs.value;
      }
    ), Ne = ce(!1), $e = ce(""), lt = ce(!1);
    let dt = null;
    const fn = () => {
      lt.value = !1, $e.value = "", dt && (clearTimeout(dt), dt = null);
    }, Tt = () => {
      if (!Ne.value) {
        if (lt.value) {
          fn();
          return;
        }
        lt.value = !0, $e.value = "", dt = setTimeout(fn, em);
      }
    };
    Dt(he, (h) => {
      h || fn();
    });
    const sr = async () => {
      Ne.value || (dt && (clearTimeout(dt), dt = null), await Oa(), $e.value || (lt.value = !1));
    }, Oa = async () => {
      if (!Ne.value) {
        Ne.value = !0, $e.value = "";
        try {
          if (!await F()) {
            $e.value = Gl;
            return;
          }
          N.value = {}, xe.value = "", Ce.value = [], await B();
        } catch (h) {
          console.error("Failed to start a new chat:", h), $e.value = Gl;
        } finally {
          Ne.value = !1;
        }
      }
    }, Ku = async () => {
      Hn.value = !1, l.value = [], N.value = {}, await ie();
    };
    zi(async () => {
      await B(), Q(), pt(), document.addEventListener("click", q), (() => {
        const m = l.value.length > 0, u = I.value === "connected", re = document.querySelector('input[type="text"], textarea') !== null;
        return m || u || re;
      })() && Gt(100);
    }), Fr(() => {
      window.removeEventListener("message", (h) => {
        h.data.type === "SCROLL_TO_BOTTOM" && zn();
      }), document.removeEventListener("click", q), yt && (yt.disconnect(), yt = null), pt.timeoutId && (clearTimeout(pt.timeoutId), pt.timeoutId = null), Mt = !0, g(), C(), X(), fn(), R();
    });
    const Rs = de(() => s.value.chat_style === "AURORA"), Jt = de(() => s.value.chat_style === "ASK_ANYTHING" || Rs.value), Na = de(() => s.value.customization_metadata), Gr = de(() => {
      var m;
      const h = (m = Na.value) == null ? void 0 : m.avatar_style;
      return h === "orb" ? !0 : h === "photo" ? !1 : Rs.value && !s.value.photo_url;
    }), rr = de(() => {
      var h;
      return Im(r.value || "", (h = Na.value) == null ? void 0 : h.orb_variant);
    }), Gu = {
      GLASS: "theme-glass",
      TERMINAL: "theme-terminal",
      PLAYFUL: "theme-playful",
      CALM_MINT: "theme-calm",
      SUNRISE: "theme-sunrise"
    }, Yu = de(() => Gu[s.value.chat_style] || ""), Xu = de(() => r_(s.value.chat_style, {
      chat_background_color: s.value.chat_background_color,
      chat_text_color: s.value.chat_text_color,
      accent_color: s.value.accent_color,
      font_family: s.value.font_family
    })), Zi = de(
      () => Array.isArray(s.value.quick_actions) ? s.value.quick_actions.filter((h) => !!h && h.trim().length > 0) : []
    ), Pa = de(() => (s.value.welcome_message || "").trim()), Ma = de(
      () => !Jt.value && l.value.length === 0 && !w.value && !cs.value
    ), Zu = de(
      () => Ma.value && Pa.value.length > 0
    ), Ju = de(
      () => Ma.value && !Hn.value && Zi.value.length > 0
    ), Yr = de(() => s.value.show_citations === !0), Fa = de(() => Lm(s.value.show_ai_disclaimer, nr.value)), Qu = (h) => /^[0-9a-f]{16,}$/i.test(h) || /^[0-9a-f-]{32,}$/i.test(h), Ji = (h) => {
      const m = (h || "").trim().toLowerCase();
      return !m || m === "unknown" ? "Knowledge base" : m.charAt(0).toUpperCase() + m.slice(1);
    }, Qi = (h) => {
      let m = ((h == null ? void 0 : h.name) || "").trim();
      return !m || (m = m.replace(/^[0-9a-f]{16,}[_-]/i, "").replace(/\.(pdf|txt|md|html?|docx?|csv|json)$/i, ""), !m || Qu(m)) ? Ji(h == null ? void 0 : h.type) : m;
    }, Da = (h) => {
      const m = Qi(h), u = Ji(h == null ? void 0 : h.type);
      return m === u ? u : `${m} · ${u}`;
    }, eo = de(() => s.value.collect_email === !0 && !Jt.value), $a = ce(!1), Wn = ce(""), ir = ce(!1), cs = de(() => !z.value && eo.value && !$a.value), Ba = async () => {
      const h = st.value.trim();
      if (!h) {
        Wn.value = "Please enter your email address.";
        return;
      }
      if (!fr(h)) {
        Wn.value = "Please enter a valid email address.";
        return;
      }
      Wn.value = "", ir.value = !0;
      try {
        await Un(), $a.value = !0;
      } catch {
        Wn.value = "Something went wrong. Please try again.";
      } finally {
        ir.value = !1;
      }
    }, to = ce(null), Ua = ce(!0), no = { mode: "floating", width: 400, height: 560 }, Xr = de(
      () => {
        var h;
        return to.value || ((h = s.value.customization_metadata) == null ? void 0 : h.widget_display) || null;
      }
    ), ef = de(() => {
      const h = Xr.value;
      return h ? typeof h.mode == "string" && h.mode !== no.mode || typeof h.width == "number" && h.width !== no.width || typeof h.height == "number" && h.height !== no.height : !1;
    }), tf = de(() => {
      var m;
      const h = {
        width: "100%",
        height: "100%",
        borderRadius: "var(--radius-lg)"
      };
      if (ef.value) {
        const u = (m = Xr.value) == null ? void 0 : m.mode;
        return u === "sidebar-left" || u === "sidebar-right" ? { ...h, borderRadius: "0" } : h;
      }
      return Jt.value ? window.innerWidth <= 768 ? {
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
    }), za = de(() => Jt.value && l.value.length === 0), nf = ["form", "user_input", "rating", "product", "shopify_output"], sf = de(
      () => l.value.some(
        (h) => nf.includes(h.message_type) || Array.isArray(h.attachments) && h.attachments.length > 0
      )
    ), rf = de(() => {
      var m, u;
      return Jt.value ? !0 : (((m = Xr.value) == null ? void 0 : m.mode) === "ask-ai" || ((u = Xr.value) == null ? void 0 : u.mode) === "search-bar") && !Ee.value;
    }), so = de(
      () => rf.value && Je.value && !Cn.value && !Rn.value && !cs.value && !Hn.value && !sf.value
    );
    Dt(so, (h) => {
      Xn({ type: "WIDGET_SURFACE", palette: h });
    }, { immediate: !0 });
    const of = de(
      () => s.value.welcome_subtitle || `Ask a question — ${r.value || "the assistant"} answers from what it knows.`
    ), af = de(() => {
      var h;
      return ((h = to.value) == null ? void 0 : h.hotkey) !== !1;
    });
    return (h, m) => J.value && ae.value ? (x(), A("div", o_, [
      b("button", {
        type: "button",
        class: "cm-error-close",
        "aria-label": "Close chat",
        title: "Close",
        onClick: rt
      }, "×"),
      m[20] || (m[20] = hs('<div class="widget-unavailable-card" data-v-1393b388><div class="widget-unavailable-icon-wrapper" data-v-1393b388><svg class="widget-unavailable-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-1393b388><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-1393b388></path><path d="M9 12l2 2 4-4" data-v-1393b388></path></svg></div><h2 class="widget-unavailable-title" data-v-1393b388>Chat Unavailable</h2><p class="widget-unavailable-message" data-v-1393b388> This chat widget is not currently configured. Please contact the website administrator to enable chat support. </p><div class="widget-unavailable-footer" data-v-1393b388><svg class="chattermate-logo-small" width="14" height="14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-1393b388><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-1393b388></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-1393b388><span class="cm-powered-prefix" data-v-1393b388>Powered by </span><strong class="cm-brand" data-v-1393b388>ChatterMate</strong></a></div></div>', 1))
    ])) : J.value ? (x(), A("div", a_, [
      b("button", {
        type: "button",
        class: "cm-error-close",
        "aria-label": "Close chat",
        title: "Close",
        onClick: rt
      }, "×"),
      b("div", l_, [
        m[21] || (m[21] = hs('<div class="auth-error-header" data-v-1393b388><svg class="auth-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-1393b388><circle cx="12" cy="12" r="10" data-v-1393b388></circle><line x1="12" y1="8" x2="12" y2="12" data-v-1393b388></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-1393b388></line></svg><h2 data-v-1393b388>Authentication Error</h2></div>', 1)),
        b("p", c_, se(V.value), 1),
        b("button", {
          class: "auth-error-refresh-btn",
          onClick: m[0] || (m[0] = () => h.window.location.reload())
        }, " Refresh Page ")
      ])
    ])) : n.value && !J.value ? (x(), A("div", {
      key: 2,
      class: Ue(["chat-container cm-surface", [{ collapsed: !Je.value, "ask-anything-style": Jt.value, aurora: Rs.value }, Yu.value]]),
      style: Se({ ...E(Ie), ...tf.value, ...Xu.value })
    }, [
      W.value ? (x(), A("div", u_, m[22] || (m[22] = [
        hs('<div class="loading-spinner" data-v-1393b388><div class="dot" data-v-1393b388></div><div class="dot" data-v-1393b388></div><div class="dot" data-v-1393b388></div></div><div class="loading-text" data-v-1393b388>Initializing chat...</div>', 2)
      ]))) : le("", !0),
      !W.value && E(I) !== "connected" ? (x(), A("div", {
        key: 1,
        class: Ue(["connection-status", E(I)])
      }, [
        E(I) === "connecting" ? (x(), A("div", f_, m[23] || (m[23] = [
          Ln(" Connecting to chat service... ", -1),
          b("div", { class: "loading-dots" }, [
            b("div", { class: "dot" }),
            b("div", { class: "dot" }),
            b("div", { class: "dot" })
          ], -1)
        ]))) : E(I) === "failed" ? (x(), A("div", h_, [
          m[24] || (m[24] = Ln(" Connection failed. ", -1)),
          b("button", {
            onClick: zr,
            class: "reconnect-button"
          }, " Click here to reconnect ")
        ])) : le("", !0)
      ], 2)) : le("", !0),
      E(v) ? (x(), A("div", {
        key: 2,
        class: "error-alert",
        style: Se(E(_))
      }, se(E(c)), 5)) : le("", !0),
      so.value ? (x(), Ai(Em, {
        key: 3,
        messages: E(l),
        draft: xe.value,
        "agent-name": E(r),
        suggestions: Zi.value,
        "welcome-title": E(s).welcome_title,
        "welcome-subtitle": of.value,
        placeholder: Xs.value,
        "input-enabled": xn.value,
        "typing-enabled": An.value,
        loading: E(d),
        "show-citations": Yr.value,
        disclaimer: Fa.value ? E(Xl) : "",
        active: Ua.value,
        hotkey: af.value,
        "can-start-new-chat": he.value,
        "starting-new-chat": Ne.value,
        "new-chat-armed": lt.value,
        "new-chat-error": $e.value,
        onNewChat: Tt,
        onConfirmNewChat: sr,
        onCancelNewChat: fn,
        "citation-label": Qi,
        "citation-tooltip": Da,
        "display-text": E(nt),
        "is-streaming": E(Xe),
        "onUpdate:draft": m[1] || (m[1] = (u) => xe.value = u),
        onSend: cn,
        onAsk: Br,
        onClose: rt
      }, null, 8, ["messages", "draft", "agent-name", "suggestions", "welcome-title", "welcome-subtitle", "placeholder", "input-enabled", "typing-enabled", "loading", "show-citations", "disclaimer", "active", "hotkey", "can-start-new-chat", "starting-new-chat", "new-chat-armed", "new-chat-error", "display-text", "is-streaming"])) : za.value ? (x(), A("div", {
        key: 4,
        class: Ue(["welcome-message-section", { aurora: Rs.value }]),
        style: Se(E(f))
      }, [
        b("div", d_, [
          b("div", p_, [
            Gr.value ? (x(), A("div", {
              key: 0,
              class: "welcome-orb",
              style: Se(rr.value)
            }, null, 4)) : E(ee) ? (x(), A("img", {
              key: 1,
              src: E(ee),
              alt: E(r),
              class: "welcome-avatar"
            }, null, 8, m_)) : le("", !0),
            b("h1", g_, se(E(s).welcome_title || `Welcome to ${E(r)}`), 1),
            b("p", __, se(E(s).welcome_subtitle || "I'm here to help you with anything you need. What can I assist you with today?"), 1)
          ])
        ]),
        b("div", y_, [
          !E(z) && !At.value && eo.value ? (x(), A("div", b_, [
            Vn(b("input", {
              "onUpdate:modelValue": m[2] || (m[2] = (u) => st.value = u),
              type: "email",
              placeholder: "Enter your email address",
              disabled: E(d) || E(I) !== "connected",
              class: Ue([{
                invalid: st.value.trim() && !E(fr)(st.value.trim()),
                disabled: E(I) !== "connected"
              }, "welcome-email-input"])
            }, null, 10, v_), [
              [ds, st.value]
            ])
          ])) : le("", !0),
          b("div", w_, [
            Vn(b("input", {
              "onUpdate:modelValue": m[3] || (m[3] = (u) => xe.value = u),
              type: "text",
              placeholder: Xs.value,
              onKeypress: En,
              onInput: Re,
              onChange: Re,
              disabled: !An.value,
              class: Ue([{ disabled: !An.value }, "welcome-message-field"])
            }, null, 42, k_), [
              [ds, xe.value]
            ]),
            b("button", {
              class: Ue(["welcome-send-button", { "aurora-send": Rs.value }]),
              style: Se(E(T)),
              onClick: cn,
              disabled: !xe.value.trim() || !xn.value
            }, [
              Rs.value ? (x(), A("svg", x_, m[25] || (m[25] = [
                b("path", {
                  d: "M12 19V5M12 5L5 12M12 5L19 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1)
              ]))) : (x(), A("svg", A_, m[26] || (m[26] = [
                b("path", {
                  d: "M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1)
              ])))
            ], 14, T_)
          ])
        ]),
        b("div", {
          class: "powered-by-welcome",
          style: Se(E(H))
        }, m[27] || (m[27] = [
          hs('<svg class="chattermate-logo" width="16" height="16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-1393b388><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-1393b388></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-1393b388><span class="cm-powered-prefix" data-v-1393b388>Powered by </span><strong class="cm-brand" data-v-1393b388>ChatterMate</strong></a>', 2)
        ]), 4)
      ], 6)) : le("", !0),
      Cn.value && un.value ? (x(), A("div", {
        key: 5,
        class: "landing-page-fullscreen",
        style: Se(E(f))
      }, [
        b("div", S_, [
          b("div", E_, [
            b("h2", C_, se(un.value.heading), 1),
            b("div", R_, se(un.value.content), 1)
          ]),
          b("div", I_, [
            b("button", {
              class: "landing-page-button",
              onClick: Cs
            }, se(Qs.value), 1)
          ])
        ]),
        b("div", {
          class: "powered-by-landing",
          style: Se(E(H))
        }, m[28] || (m[28] = [
          hs('<svg class="chattermate-logo" width="16" height="16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-1393b388><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-1393b388></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-1393b388><span class="cm-powered-prefix" data-v-1393b388>Powered by </span><strong class="cm-brand" data-v-1393b388>ChatterMate</strong></a>', 2)
        ]), 4)
      ], 4)) : Rn.value && kt.value ? (x(), A("div", {
        key: 6,
        class: "form-fullscreen",
        style: Se(E(f))
      }, [
        b("div", L_, [
          kt.value.title || kt.value.description ? (x(), A("div", O_, [
            kt.value.title ? (x(), A("h2", N_, se(kt.value.title), 1)) : le("", !0),
            kt.value.description ? (x(), A("p", P_, se(kt.value.description), 1)) : le("", !0)
          ])) : le("", !0),
          b("div", M_, [
            (x(!0), A(ze, null, St(kt.value.fields, (u) => {
              var re, Ae;
              return x(), A("div", {
                key: u.name,
                class: "form-field"
              }, [
                b("label", {
                  for: `fullscreen-form-${u.name}`,
                  class: "field-label"
                }, [
                  Ln(se(u.label) + " ", 1),
                  u.required ? (x(), A("span", D_, "*")) : le("", !0)
                ], 8, F_),
                u.type === "text" || u.type === "email" || u.type === "tel" ? (x(), A("input", {
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
                }, null, 42, $_)) : u.type === "number" ? (x(), A("input", {
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
                }, null, 42, B_)) : u.type === "textarea" ? (x(), A("textarea", {
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
                }, null, 42, U_)) : u.type === "select" ? (x(), A("select", {
                  key: 3,
                  id: `fullscreen-form-${u.name}`,
                  required: u.required,
                  value: ft.value[u.name] || "",
                  onChange: (me) => It(u.name, me.target.value),
                  class: Ue(["form-select", { error: Qe.value[u.name] }])
                }, [
                  b("option", H_, se(u.placeholder || "Please select..."), 1),
                  (x(!0), A(ze, null, St((Array.isArray(u.options) ? u.options : ((re = u.options) == null ? void 0 : re.split(`
`)) || []).filter((me) => me.trim()), (me) => (x(), A("option", {
                    key: me,
                    value: me.trim()
                  }, se(me.trim()), 9, q_))), 128))
                ], 42, z_)) : u.type === "checkbox" ? (x(), A("label", W_, [
                  b("input", {
                    id: `fullscreen-form-${u.name}`,
                    type: "checkbox",
                    required: u.required,
                    checked: ft.value[u.name] || !1,
                    onChange: (me) => It(u.name, me.target.checked),
                    class: "form-checkbox"
                  }, null, 40, j_),
                  b("span", V_, se(u.label), 1)
                ])) : u.type === "radio" ? (x(), A("div", K_, [
                  (x(!0), A(ze, null, St((Array.isArray(u.options) ? u.options : ((Ae = u.options) == null ? void 0 : Ae.split(`
`)) || []).filter((me) => me.trim()), (me) => (x(), A("label", {
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
                    }, null, 40, G_),
                    b("span", Y_, se(me.trim()), 1)
                  ]))), 128))
                ])) : le("", !0),
                Qe.value[u.name] ? (x(), A("div", X_, se(Qe.value[u.name]), 1)) : le("", !0)
              ]);
            }), 128))
          ]),
          b("div", Z_, [
            b("button", {
              onClick: m[4] || (m[4] = () => {
                console.log("Submit button clicked!"), Wr();
              }),
              disabled: ht.value,
              class: "submit-form-button",
              style: Se(E(T))
            }, [
              ht.value ? (x(), A("span", Q_, m[29] || (m[29] = [
                b("div", { class: "dot" }, null, -1),
                b("div", { class: "dot" }, null, -1),
                b("div", { class: "dot" }, null, -1)
              ]))) : (x(), A("span", ey, se(kt.value.submit_button_text || "Submit"), 1))
            ], 12, J_)
          ])
        ]),
        b("div", {
          class: "powered-by-landing",
          style: Se(E(H))
        }, m[30] || (m[30] = [
          hs('<svg class="chattermate-logo" width="16" height="16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-1393b388><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-1393b388></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-1393b388><span class="cm-powered-prefix" data-v-1393b388>Powered by </span><strong class="cm-brand" data-v-1393b388>ChatterMate</strong></a>', 2)
        ]), 4)
      ], 4)) : !za.value && Je.value && !so.value ? (x(), A("div", {
        key: 7,
        class: Ue(["chat-panel", { "ask-anything-chat": Jt.value }]),
        style: Se(E(f))
      }, [
        Jt.value ? (x(), A("div", {
          key: 1,
          class: "ask-anything-top",
          style: Se(E(ne))
        }, [
          b("div", ly, [
            Xt.value || E(ee) ? (x(), A("img", {
              key: 0,
              src: Xt.value || E(ee),
              alt: E(N).human_agent_name || E(r),
              class: "header-avatar"
            }, null, 8, cy)) : le("", !0),
            b("div", uy, [
              b("h3", {
                style: Se(E(H))
              }, se(E(r)), 5),
              b("p", {
                class: "ask-anything-subtitle",
                style: Se(E(H))
              }, se(E(s).welcome_subtitle || "Ask me anything. I'm here to help."), 5)
            ])
          ])
        ], 4)) : (x(), A("div", {
          key: 0,
          class: "chat-header",
          style: Se(E(ne))
        }, [
          b("div", {
            class: "cm-header-sheen",
            style: Se({ background: "linear-gradient(90deg, transparent, " + (E(s).accent_color || "#C9F24E") + ", transparent)" })
          }, null, 4),
          b("div", ty, [
            !Xt.value && (Gr.value || !E(ee)) ? (x(), A("div", {
              key: 0,
              class: "header-orb",
              style: Se(rr.value)
            }, null, 4)) : Xt.value || E(ee) ? (x(), A("img", {
              key: 1,
              src: Xt.value || E(ee),
              alt: E(N).human_agent_name || E(r),
              class: "header-avatar"
            }, null, 8, ny)) : le("", !0),
            b("div", sy, [
              b("h3", {
                style: Se(E(H))
              }, se(E(N).human_agent_name || E(r)), 5),
              b("div", ry, [
                b("span", {
                  class: Ue(["status-indicator", Vr.value.online ? "online" : "away"])
                }, null, 2),
                b("span", iy, se(Vr.value.text), 1)
              ])
            ])
          ]),
          b("div", oy, [
            he.value ? (x(), A("button", {
              key: 0,
              type: "button",
              class: Ue(["header-new-chat", { armed: lt.value }]),
              style: Se(E(H)),
              disabled: Ne.value,
              title: E(Li),
              "aria-label": E(Li),
              "aria-expanded": lt.value,
              onClick: Tt
            }, m[31] || (m[31] = [
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
            ]), 14, ay)) : le("", !0),
            b("button", {
              type: "button",
              class: "header-minimize",
              style: Se(E(H)),
              title: "Minimize",
              "aria-label": "Minimize chat",
              onClick: rt
            }, m[32] || (m[32] = [
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
        E(w) ? (x(), A("div", fy, m[33] || (m[33] = [
          b("div", { class: "loading-spinner" }, [
            b("div", { class: "dot" }),
            b("div", { class: "dot" }),
            b("div", { class: "dot" })
          ], -1)
        ]))) : le("", !0),
        cs.value ? (x(), A("div", {
          key: 3,
          class: "cm-email-gate",
          style: Se(E(f))
        }, [
          b("div", {
            class: "cm-email-gate-orb",
            style: Se(rr.value)
          }, null, 4),
          b("h3", hy, se(E(s).welcome_title || "Before we start"), 1),
          m[34] || (m[34] = b("p", { class: "cm-email-gate-text" }, "Enter your email and we'll continue the chat.", -1)),
          Vn(b("input", {
            "onUpdate:modelValue": m[5] || (m[5] = (u) => st.value = u),
            type: "email",
            inputmode: "email",
            autocomplete: "email",
            placeholder: "you@example.com",
            class: Ue(["cm-email-gate-input", { invalid: !!Wn.value }]),
            disabled: ir.value,
            onKeyup: ci(Ba, ["enter"]),
            onInput: m[6] || (m[6] = (u) => Wn.value = "")
          }, null, 42, dy), [
            [ds, st.value]
          ]),
          Wn.value ? (x(), A("p", py, se(Wn.value), 1)) : le("", !0),
          b("button", {
            type: "button",
            class: "cm-email-gate-btn",
            style: Se(E(T)),
            disabled: ir.value,
            onClick: Ba
          }, se(ir.value ? "Please wait…" : "Continue to chat"), 13, my)
        ], 4)) : le("", !0),
        lt.value && he.value ? (x(), Ai(Ru, {
          key: 4,
          busy: Ne.value,
          error: $e.value,
          onConfirm: sr,
          onCancel: fn
        }, null, 8, ["busy", "error"])) : le("", !0),
        Vn(b("div", {
          class: "chat-messages",
          ref_key: "messagesContainer",
          ref: Me,
          role: "log",
          "aria-label": "Messages"
        }, [
          Zu.value ? (x(), A("div", gy, [
            b("div", _y, [
              Gr.value || !E(ee) ? (x(), A("div", {
                key: 0,
                class: "cm-welcome-orb",
                style: Se(rr.value)
              }, null, 4)) : (x(), A("img", {
                key: 1,
                src: E(ee),
                alt: E(r),
                class: "cm-welcome-avatar"
              }, null, 8, yy)),
              b("div", {
                class: "message-bubble cm-welcome-bubble",
                style: Se(E(M))
              }, se(Pa.value), 5)
            ])
          ])) : le("", !0),
          (x(!0), A(ze, null, St(E(l), (u, re) => {
            var Ae, me, ct, it, Ye, or, ar, jn, Is, Ha, qa, Wa, ja, Va, Ka, Ga, Ya, Xa, Za;
            return x(), A("div", {
              key: re,
              class: Ue([
                "message",
                u.message_type === "bot" || u.message_type === "agent" ? "agent-message" : u.message_type === "system" ? "system-message" : u.message_type === "rating" ? "rating-message" : u.message_type === "form" ? "form-message" : u.message_type === "product" || u.shopify_output ? "product-message" : "user-message"
              ])
            }, [
              u.message_type === "bot" || u.message_type === "agent" ? (x(), A("div", by, [
                Xt.value ? (x(), A("img", {
                  key: 0,
                  src: Xt.value,
                  class: "cm-msg-avatar-img",
                  alt: ""
                }, null, 8, vy)) : !Gr.value && E(ee) ? (x(), A("img", {
                  key: 1,
                  src: E(ee),
                  class: "cm-msg-avatar-img",
                  alt: ""
                }, null, 8, wy)) : (x(), A("div", {
                  key: 2,
                  class: "cm-msg-avatar-orb",
                  style: Se(rr.value)
                }, null, 4))
              ])) : le("", !0),
              b("div", ky, [
                b("div", {
                  class: "message-bubble",
                  style: Se(u.message_type === "system" || u.message_type === "rating" || u.message_type === "form" || u.message_type === "product" || u.shopify_output ? {} : u.message_type === "user" ? E(T) : E(M))
                }, [
                  u.message_type === "rating" ? (x(), A("div", Ty, [
                    b("p", xy, "Rate the chat session that you had with " + se(u.agent_name || E(N).human_agent_name || E(r) || "our agent"), 1),
                    b("div", {
                      class: Ue(["star-rating", { submitted: bt.value || u.isSubmitted }])
                    }, [
                      (x(), A(ze, null, St(5, (D) => b("button", {
                        key: D,
                        class: Ue(["star-button", {
                          warning: D <= (u.isSubmitted ? u.finalRating : Yt.value || u.selectedRating) && (u.isSubmitted ? u.finalRating : Yt.value || u.selectedRating) <= 3,
                          success: D <= (u.isSubmitted ? u.finalRating : Yt.value || u.selectedRating) && (u.isSubmitted ? u.finalRating : Yt.value || u.selectedRating) > 3,
                          selected: D <= (u.isSubmitted ? u.finalRating : Yt.value || u.selectedRating)
                        }]),
                        onMouseover: (on) => !u.isSubmitted && As(D),
                        onMouseleave: (on) => !u.isSubmitted && qn,
                        onClick: (on) => !u.isSubmitted && as(D),
                        disabled: bt.value || u.isSubmitted
                      }, " ★ ", 42, Ay)), 64))
                    ], 2),
                    u.showFeedback && !u.isSubmitted ? (x(), A("div", Sy, [
                      b("div", Ey, [
                        Vn(b("input", {
                          "onUpdate:modelValue": (D) => u.feedback = D,
                          placeholder: "Please share your feedback (optional)",
                          disabled: bt.value,
                          maxlength: "500",
                          class: "feedback-input"
                        }, null, 8, Cy), [
                          [ds, u.feedback]
                        ]),
                        b("div", Ry, se(((Ae = u.feedback) == null ? void 0 : Ae.length) || 0) + "/500", 1)
                      ]),
                      b("button", {
                        onClick: (D) => Zt(u.session_id, Yt.value, u.feedback),
                        disabled: bt.value || !Yt.value,
                        class: "submit-rating-button",
                        style: Se({ backgroundColor: E(s).accent_color || "var(--accent-solid)" })
                      }, se(bt.value ? "Submitting..." : "Submit Rating"), 13, Iy)
                    ])) : le("", !0),
                    u.isSubmitted && u.finalFeedback ? (x(), A("div", Ly, [
                      b("div", Oy, [
                        b("p", Ny, se(u.finalFeedback), 1)
                      ])
                    ])) : u.isSubmitted ? (x(), A("div", Py, " Thank you for your rating! ")) : le("", !0)
                  ])) : u.message_type === "form" ? (x(), A("div", My, [
                    (ct = (me = u.attributes) == null ? void 0 : me.form_data) != null && ct.title || (Ye = (it = u.attributes) == null ? void 0 : it.form_data) != null && Ye.description ? (x(), A("div", Fy, [
                      (ar = (or = u.attributes) == null ? void 0 : or.form_data) != null && ar.title ? (x(), A("h3", Dy, se(u.attributes.form_data.title), 1)) : le("", !0),
                      (Is = (jn = u.attributes) == null ? void 0 : jn.form_data) != null && Is.description ? (x(), A("p", $y, se(u.attributes.form_data.description), 1)) : le("", !0)
                    ])) : le("", !0),
                    b("div", By, [
                      (x(!0), A(ze, null, St((qa = (Ha = u.attributes) == null ? void 0 : Ha.form_data) == null ? void 0 : qa.fields, (D) => {
                        var on, ro;
                        return x(), A("div", {
                          key: D.name,
                          class: "form-field"
                        }, [
                          b("label", {
                            for: `form-${D.name}`,
                            class: "field-label"
                          }, [
                            Ln(se(D.label) + " ", 1),
                            D.required ? (x(), A("span", zy, "*")) : le("", !0)
                          ], 8, Uy),
                          D.type === "text" || D.type === "email" || D.type === "tel" ? (x(), A("input", {
                            key: 0,
                            id: `form-${D.name}`,
                            type: D.type,
                            placeholder: D.placeholder || "",
                            required: D.required,
                            minlength: D.minLength,
                            maxlength: D.maxLength,
                            value: ft.value[D.name] || "",
                            onInput: (qe) => It(D.name, qe.target.value),
                            onBlur: (qe) => It(D.name, qe.target.value),
                            class: Ue(["form-input", { error: Qe.value[D.name] }]),
                            disabled: ht.value,
                            autocomplete: D.type === "email" ? "email" : D.type === "tel" ? "tel" : "off",
                            inputmode: D.type === "tel" ? "tel" : D.type === "email" ? "email" : "text"
                          }, null, 42, Hy)) : D.type === "number" ? (x(), A("input", {
                            key: 1,
                            id: `form-${D.name}`,
                            type: "number",
                            placeholder: D.placeholder || "",
                            required: D.required,
                            min: D.min,
                            max: D.max,
                            value: ft.value[D.name] || "",
                            onInput: (qe) => It(D.name, qe.target.value),
                            class: Ue(["form-input", { error: Qe.value[D.name] }]),
                            disabled: ht.value
                          }, null, 42, qy)) : D.type === "textarea" ? (x(), A("textarea", {
                            key: 2,
                            id: `form-${D.name}`,
                            placeholder: D.placeholder || "",
                            required: D.required,
                            minlength: D.minLength,
                            maxlength: D.maxLength,
                            value: ft.value[D.name] || "",
                            onInput: (qe) => It(D.name, qe.target.value),
                            class: Ue(["form-textarea", { error: Qe.value[D.name] }]),
                            disabled: ht.value,
                            rows: "3"
                          }, null, 42, Wy)) : D.type === "select" ? (x(), A("select", {
                            key: 3,
                            id: `form-${D.name}`,
                            required: D.required,
                            value: ft.value[D.name] || "",
                            onChange: (qe) => It(D.name, qe.target.value),
                            class: Ue(["form-select", { error: Qe.value[D.name] }]),
                            disabled: ht.value
                          }, [
                            b("option", Vy, se(D.placeholder || "Select an option"), 1),
                            (x(!0), A(ze, null, St((Array.isArray(D.options) ? D.options : ((on = D.options) == null ? void 0 : on.split(`
`)) || []).filter((qe) => qe.trim()), (qe) => (x(), A("option", {
                              key: qe.trim(),
                              value: qe.trim()
                            }, se(qe.trim()), 9, Ky))), 128))
                          ], 42, jy)) : D.type === "checkbox" ? (x(), A("div", Gy, [
                            b("input", {
                              id: `form-${D.name}`,
                              type: "checkbox",
                              checked: ft.value[D.name] || !1,
                              onChange: (qe) => It(D.name, qe.target.checked),
                              class: "form-checkbox",
                              disabled: ht.value
                            }, null, 40, Yy),
                            b("label", {
                              for: `form-${D.name}`,
                              class: "checkbox-label"
                            }, se(D.placeholder || D.label), 9, Xy)
                          ])) : D.type === "radio" ? (x(), A("div", Zy, [
                            (x(!0), A(ze, null, St((Array.isArray(D.options) ? D.options : ((ro = D.options) == null ? void 0 : ro.split(`
`)) || []).filter((qe) => qe.trim()), (qe) => (x(), A("div", {
                              key: qe.trim(),
                              class: "radio-option"
                            }, [
                              b("input", {
                                id: `form-${D.name}-${qe.trim()}`,
                                name: `form-${D.name}`,
                                type: "radio",
                                value: qe.trim(),
                                checked: ft.value[D.name] === qe.trim(),
                                onChange: (bv) => It(D.name, qe.trim()),
                                class: "form-radio",
                                disabled: ht.value
                              }, null, 40, Jy),
                              b("label", {
                                for: `form-${D.name}-${qe.trim()}`,
                                class: "radio-label"
                              }, se(qe.trim()), 9, Qy)
                            ]))), 128))
                          ])) : le("", !0),
                          Qe.value[D.name] ? (x(), A("div", eb, se(Qe.value[D.name]), 1)) : le("", !0)
                        ]);
                      }), 128))
                    ]),
                    b("div", tb, [
                      b("button", {
                        onClick: () => {
                          var D;
                          console.log("Regular form submit button clicked!"), Ss((D = u.attributes) == null ? void 0 : D.form_data);
                        },
                        disabled: ht.value,
                        class: "form-submit-button",
                        style: Se(E(T))
                      }, se(ht.value ? "Submitting..." : ((ja = (Wa = u.attributes) == null ? void 0 : Wa.form_data) == null ? void 0 : ja.submit_button_text) || "Submit"), 13, nb)
                    ])
                  ])) : u.message_type === "user_input" ? (x(), A("div", sb, [
                    (Va = u.attributes) != null && Va.prompt_message && u.attributes.prompt_message.trim() ? (x(), A("div", rb, se(u.attributes.prompt_message), 1)) : le("", !0),
                    u.isSubmitted ? (x(), A("div", lb, [
                      m[35] || (m[35] = b("strong", null, "Your input:", -1)),
                      Ln(" " + se(u.submittedValue) + " ", 1),
                      (Ka = u.attributes) != null && Ka.confirmation_message && u.attributes.confirmation_message.trim() ? (x(), A("div", cb, se(u.attributes.confirmation_message), 1)) : le("", !0)
                    ])) : (x(), A("div", ib, [
                      Vn(b("textarea", {
                        "onUpdate:modelValue": (D) => u.userInputValue = D,
                        class: "user-input-textarea",
                        placeholder: "Type your message here...",
                        rows: "3",
                        onKeydown: [
                          ci(gs((D) => ls(u), ["ctrl"]), ["enter"]),
                          ci(gs((D) => ls(u), ["meta"]), ["enter"])
                        ]
                      }, null, 40, ob), [
                        [ds, u.userInputValue]
                      ]),
                      b("button", {
                        class: "user-input-submit-button",
                        onClick: (D) => ls(u),
                        disabled: !u.userInputValue || !u.userInputValue.trim()
                      }, " Submit ", 8, ab)
                    ]))
                  ])) : u.shopify_output || u.message_type === "product" ? (x(), A("div", ub, [
                    u.message ? (x(), A("div", {
                      key: 0,
                      innerHTML: E(fi)(((Ya = (Ga = u.shopify_output) == null ? void 0 : Ga.products) == null ? void 0 : Ya.length) > 0 ? Xi(u.message) : u.message),
                      class: "product-message-text"
                    }, null, 8, fb)) : le("", !0),
                    (Xa = u.shopify_output) != null && Xa.products && u.shopify_output.products.length > 0 ? (x(), A("div", hb, [
                      m[37] || (m[37] = b("h3", { class: "carousel-title" }, "Products", -1)),
                      b("div", db, [
                        (x(!0), A(ze, null, St(u.shopify_output.products, (D) => {
                          var on;
                          return x(), A("div", {
                            key: D.id,
                            class: "product-card-compact carousel-item"
                          }, [
                            (on = D.image) != null && on.src ? (x(), A("div", pb, [
                              b("img", {
                                src: D.image.src,
                                alt: D.title,
                                class: "product-thumbnail"
                              }, null, 8, mb)
                            ])) : le("", !0),
                            b("div", gb, [
                              b("div", _b, [
                                b("div", yb, se(D.title), 1),
                                D.variant_title && D.variant_title !== "Default Title" ? (x(), A("div", bb, se(D.variant_title), 1)) : le("", !0),
                                b("div", vb, se(D.price_formatted || E(a)(D.price, D.currency)), 1)
                              ]),
                              b("div", wb, [
                                b("button", {
                                  class: "view-details-button-compact",
                                  onClick: (ro) => {
                                    var qe;
                                    return jr(D, (qe = u.shopify_output) == null ? void 0 : qe.shop_domain);
                                  }
                                }, m[36] || (m[36] = [
                                  Ln(" View product ", -1),
                                  b("span", { class: "external-link-icon" }, "↗", -1)
                                ]), 8, kb)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])) : !u.message && ((Za = u.shopify_output) != null && Za.products) && u.shopify_output.products.length === 0 ? (x(), A("div", Tb, m[38] || (m[38] = [
                      b("p", null, "No products found.", -1)
                    ]))) : !u.message && u.shopify_output && !u.shopify_output.products ? (x(), A("div", xb, m[39] || (m[39] = [
                      b("p", null, "No products to display.", -1)
                    ]))) : le("", !0)
                  ])) : (x(), A(ze, { key: 4 }, [
                    E(Xe)(re) ? (x(), A("div", {
                      key: 0,
                      class: "message-streaming",
                      innerHTML: E(fi)(E(nt)(re, u.message))
                    }, null, 8, Ab)) : (x(), A("div", {
                      key: 1,
                      innerHTML: E(fi)(u.message)
                    }, null, 8, Sb)),
                    u.attachments && u.attachments.length > 0 ? (x(), A("div", Eb, [
                      (x(!0), A(ze, null, St(u.attachments, (D) => (x(), A("div", {
                        key: D.id,
                        class: "attachment-item"
                      }, [
                        E(rn)(D.content_type) ? (x(), A("div", Cb, [
                          b("img", {
                            src: E(kn)(D.file_url),
                            alt: D.filename,
                            class: "attachment-image",
                            onClick: gs((on) => E(os)({ url: D.file_url, filename: D.filename, type: D.content_type, file_url: E(kn)(D.file_url), size: void 0 }), ["stop"]),
                            style: { cursor: "pointer" }
                          }, null, 8, Rb),
                          b("div", Ib, [
                            b("a", {
                              href: E(kn)(D.file_url),
                              target: "_blank",
                              class: "attachment-link"
                            }, [
                              m[40] || (m[40] = b("svg", {
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
                              Ln(" " + se(D.filename) + " ", 1),
                              b("span", Ob, "(" + se(E(wt)(D.file_size)) + ")", 1)
                            ], 8, Lb)
                          ])
                        ])) : (x(), A("a", {
                          key: 1,
                          href: E(kn)(D.file_url),
                          target: "_blank",
                          class: "attachment-link"
                        }, [
                          m[41] || (m[41] = b("svg", {
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
                          Ln(" " + se(D.filename) + " ", 1),
                          b("span", Pb, "(" + se(E(wt)(D.file_size)) + ")", 1)
                        ], 8, Nb))
                      ]))), 128))
                    ])) : le("", !0)
                  ], 64))
                ], 4),
                Yr.value && (u.message_type === "bot" || u.message_type === "agent") && u.sources && u.sources.length ? (x(), A("div", Mb, [
                  m[42] || (m[42] = b("span", { class: "citation-label" }, "Sources", -1)),
                  (x(!0), A(ze, null, St(u.sources, (D, on) => (x(), A("span", {
                    key: on,
                    class: "citation-chip",
                    title: Da(D)
                  }, se(Qi(D)), 9, Fb))), 128))
                ])) : le("", !0),
                b("div", Db, [
                  u.message_type === "user" ? (x(), A("span", $b, " You ")) : le("", !0)
                ])
              ])
            ], 2);
          }), 128)),
          E(d) ? (x(), A("div", {
            key: 1,
            class: Ue(["typing-indicator", { "reading-indicator": Yr.value }])
          }, [
            Yr.value ? (x(), A(ze, { key: 0 }, [
              m[43] || (m[43] = b("div", {
                class: "reading-bars",
                "aria-hidden": "true"
              }, [
                b("span"),
                b("span"),
                b("span")
              ], -1)),
              m[44] || (m[44] = b("span", { class: "reading-label" }, "reading knowledge base", -1))
            ], 64)) : (x(), A("div", {
              key: 1,
              class: "cm-typing-bubble",
              style: Se(E(M))
            }, m[45] || (m[45] = [
              b("span", { class: "cm-typing-dot" }, null, -1),
              b("span", { class: "cm-typing-dot" }, null, -1),
              b("span", { class: "cm-typing-dot" }, null, -1)
            ]), 4))
          ], 2)) : le("", !0)
        ], 512), [
          [ad, !cs.value]
        ]),
        Ju.value ? (x(), A("div", Bb, [
          (x(!0), A(ze, null, St(Zi.value, (u) => (x(), A("button", {
            key: u,
            type: "button",
            class: "cm-quick-action",
            disabled: !xn.value,
            onClick: (re) => Br(u)
          }, se(u), 9, Ub))), 128))
        ])) : le("", !0),
        !Hn.value && !cs.value ? (x(), A("div", {
          key: 6,
          class: Ue(["chat-input", { "ask-anything-input": Jt.value }])
        }, [
          b("input", {
            ref_key: "fileInputRef",
            ref: Le,
            type: "file",
            accept: dv,
            multiple: "",
            style: { display: "none" },
            onChange: m[7] || (m[7] = //@ts-ignore
            (...u) => E(Ks) && E(Ks)(...u))
          }, null, 544),
          E(Ce).length > 0 ? (x(), A("div", zb, [
            (x(!0), A(ze, null, St(E(Ce), (u, re) => (x(), A("div", {
              key: re,
              class: "file-preview-widget"
            }, [
              b("div", Hb, [
                E(Ts)(u.type) ? (x(), A("img", {
                  key: 0,
                  src: E(Vs)(u),
                  alt: u.filename,
                  class: "file-preview-image-widget",
                  onClick: gs((Ae) => E(os)(u), ["stop"]),
                  style: { cursor: "pointer" }
                }, null, 8, qb)) : (x(), A("div", {
                  key: 1,
                  class: "file-preview-icon-widget",
                  onClick: gs((Ae) => E(os)(u), ["stop"]),
                  style: { cursor: "pointer" }
                }, m[46] || (m[46] = [
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
                ]), 8, Wb))
              ]),
              b("div", jb, [
                b("div", Vb, se(u.filename), 1),
                b("div", Kb, se(E(wt)(u.size)), 1)
              ]),
              b("button", {
                type: "button",
                class: "file-preview-remove-widget",
                onClick: (Ae) => E(Gs)(re),
                title: "Remove file"
              }, " × ", 8, Gb)
            ]))), 128))
          ])) : le("", !0),
          tr.value ? (x(), A("div", Yb, m[47] || (m[47] = [
            b("div", { class: "upload-spinner-widget" }, null, -1),
            b("span", { class: "upload-text-widget" }, "Uploading files...", -1)
          ]))) : le("", !0),
          b("div", Xb, [
            Vn(b("input", {
              "onUpdate:modelValue": m[8] || (m[8] = (u) => xe.value = u),
              type: "text",
              placeholder: Xs.value,
              onKeypress: En,
              onInput: Re,
              onChange: Re,
              onPaste: m[9] || (m[9] = //@ts-ignore
              (...u) => E(Tn) && E(Tn)(...u)),
              onDrop: m[10] || (m[10] = //@ts-ignore
              (...u) => E(rs) && E(rs)(...u)),
              onDragover: m[11] || (m[11] = //@ts-ignore
              (...u) => E(is) && E(is)(...u)),
              onDragleave: m[12] || (m[12] = //@ts-ignore
              (...u) => E(qt) && E(qt)(...u)),
              disabled: !An.value,
              class: Ue({ disabled: !An.value, "ask-anything-field": Jt.value })
            }, null, 42, Zb), [
              [ds, xe.value]
            ]),
            Kr.value ? (x(), A("button", {
              key: 0,
              type: "button",
              class: "attach-button",
              disabled: tr.value,
              onClick: m[13] || (m[13] = //@ts-ignore
              (...u) => E(Ys) && E(Ys)(...u)),
              title: `Attach files (${E(Ce).length}/${uc} used) or paste screenshots`
            }, m[48] || (m[48] = [
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
            ]), 8, Jb)) : le("", !0),
            b("button", {
              class: Ue(["send-button", { "ask-anything-send": Jt.value }]),
              "aria-label": "Send message",
              style: Se(E(T)),
              onClick: cn,
              disabled: !xe.value.trim() && E(Ce).length === 0 || !xn.value
            }, m[49] || (m[49] = [
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
            ]), 14, Qb)
          ])
        ], 2)) : Hn.value && !cs.value ? (x(), A("div", ev, [
          b("div", tv, [
            m[50] || (m[50] = b("p", { class: "ended-text" }, "This chat has ended.", -1)),
            b("button", {
              class: "start-new-conversation-button",
              style: Se(E(T)),
              onClick: Ku
            }, " Click here to start a new conversation ", 4)
          ])
        ])) : le("", !0),
        Fa.value ? (x(), A("div", nv, se(E(Xl)), 1)) : le("", !0),
        b("div", {
          class: "powered-by",
          style: Se(E(H))
        }, m[51] || (m[51] = [
          hs('<svg class="chattermate-logo" width="16" height="16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-1393b388><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-1393b388></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-1393b388></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-1393b388><span class="cm-powered-prefix" data-v-1393b388>Powered by </span><strong class="cm-brand" data-v-1393b388>ChatterMate</strong></a>', 2)
        ]), 4)
      ], 6)) : le("", !0),
      Hr.value ? (x(), A("div", sv, [
        b("div", rv, [
          m[52] || (m[52] = b("h3", null, "Rate your conversation", -1)),
          b("div", iv, [
            (x(), A(ze, null, St(5, (u) => b("button", {
              key: u,
              onClick: (re) => xs.value = u,
              class: Ue([{ active: u <= xs.value }, "star-button"])
            }, " ★ ", 10, ov)), 64))
          ]),
          Vn(b("textarea", {
            "onUpdate:modelValue": m[14] || (m[14] = (u) => Js.value = u),
            placeholder: "Additional feedback (optional)",
            class: "rating-feedback"
          }, null, 512), [
            [ds, Js.value]
          ]),
          b("div", av, [
            b("button", {
              onClick: m[15] || (m[15] = (u) => h.submitRating(xs.value, Js.value)),
              disabled: !xs.value,
              class: "submit-button",
              style: Se(E(T))
            }, " Submit ", 12, lv),
            b("button", {
              onClick: m[16] || (m[16] = (u) => Hr.value = !1),
              class: "skip-rating"
            }, " Skip ")
          ])
        ])
      ])) : le("", !0),
      E(Be) ? (x(), A("div", {
        key: 9,
        class: "preview-modal-overlay",
        onClick: m[19] || (m[19] = //@ts-ignore
        (...u) => E(ks) && E(ks)(...u))
      }, [
        b("div", {
          class: "preview-modal-content",
          onClick: m[18] || (m[18] = gs(() => {
          }, ["stop"]))
        }, [
          b("button", {
            class: "preview-modal-close",
            onClick: m[17] || (m[17] = //@ts-ignore
            (...u) => E(ks) && E(ks)(...u))
          }, "×"),
          E(Ze) && E(Ts)(E(Ze).type) ? (x(), A("div", cv, [
            b("img", {
              src: E(Vs)(E(Ze)),
              alt: E(Ze).filename,
              class: "preview-modal-image"
            }, null, 8, uv),
            b("div", fv, se(E(Ze).filename), 1)
          ])) : le("", !0)
        ])
      ])) : le("", !0)
    ], 6)) : (x(), A("div", hv));
  }
}), mv = /* @__PURE__ */ Aa(pv, [["__scopeId", "data-v-1393b388"]]);
window.process || (window.process = { env: { NODE_ENV: "production" } });
const tn = window.__INITIAL_DATA__, Wu = new URL(window.location.href), ju = Wu.searchParams.get("preview") === "true", Vu = (e) => {
  const t = Wu.searchParams.get(e);
  if (!(!t || t === "undefined" || t.trim() === ""))
    return t;
}, gv = ju ? Vu("widget_id") || (tn == null ? void 0 : tn.widgetId) || void 0 : (tn == null ? void 0 : tn.widgetId) || void 0, _v = ju ? (tn == null ? void 0 : tn.initialToken) || Vu("token") || void 0 : (tn == null ? void 0 : tn.initialToken) || void 0, yv = Ed(mv, {
  widgetId: gv,
  token: _v || void 0,
  initialAuthError: null
  // Let backend determine if auth is required
});
yv.mount("#app");
