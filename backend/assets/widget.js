var af = Object.defineProperty;
var lf = (e, t, n) => t in e ? af(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var et = (e, t, n) => lf(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Zo(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const tt = {}, Fs = [], yn = () => {
}, cf = () => !1, Ii = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Jo = (e) => e.startsWith("onUpdate:"), Lt = Object.assign, Qo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, uf = Object.prototype.hasOwnProperty, Ve = (e, t) => uf.call(e, t), ye = Array.isArray, $s = (e) => Li(e) === "[object Map]", fc = (e) => Li(e) === "[object Set]", xe = (e) => typeof e == "function", pt = (e) => typeof e == "string", Jn = (e) => typeof e == "symbol", lt = (e) => e !== null && typeof e == "object", hc = (e) => (lt(e) || xe(e)) && xe(e.then) && xe(e.catch), dc = Object.prototype.toString, Li = (e) => dc.call(e), ff = (e) => Li(e).slice(8, -1), pc = (e) => Li(e) === "[object Object]", ea = (e) => pt(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, yr = /* @__PURE__ */ Zo(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Oi = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, hf = /-(\w)/g, Yn = Oi(
  (e) => e.replace(hf, (t, n) => n ? n.toUpperCase() : "")
), df = /\B([A-Z])/g, Qn = Oi(
  (e) => e.replace(df, "-$1").toLowerCase()
), mc = Oi((e) => e.charAt(0).toUpperCase() + e.slice(1)), ro = Oi(
  (e) => e ? `on${mc(e)}` : ""
), Kn = (e, t) => !Object.is(e, t), ti = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ro = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Io = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ja;
const Ni = () => Ja || (Ja = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ce(e) {
  if (ye(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = pt(s) ? _f(s) : Ce(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (pt(e) || lt(e))
    return e;
}
const pf = /;(?![^(]*\))/g, mf = /:([^]+)/, gf = /\/\*[^]*?\*\//g;
function _f(e) {
  const t = {};
  return e.replace(gf, "").split(pf).forEach((n) => {
    if (n) {
      const s = n.split(mf);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Ue(e) {
  let t = "";
  if (pt(e))
    t = e;
  else if (ye(e))
    for (let n = 0; n < e.length; n++) {
      const s = Ue(e[n]);
      s && (t += s + " ");
    }
  else if (lt(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const yf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", bf = /* @__PURE__ */ Zo(yf);
function gc(e) {
  return !!e || e === "";
}
const _c = (e) => !!(e && e.__v_isRef === !0), te = (e) => pt(e) ? e : e == null ? "" : ye(e) || lt(e) && (e.toString === dc || !xe(e.toString)) ? _c(e) ? te(e.value) : JSON.stringify(e, yc, 2) : String(e), yc = (e, t) => _c(t) ? yc(e, t.value) : $s(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[io(s, i) + " =>"] = r, n),
    {}
  )
} : fc(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => io(n))
} : Jn(t) ? io(t) : lt(t) && !ye(t) && !pc(t) ? String(t) : t, io = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Jn(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let zt;
class vf {
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
function wf() {
  return zt;
}
let it;
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
    const t = it, n = cn;
    it = this, cn = !0;
    try {
      return this.fn();
    } finally {
      Tc(this), it = t, cn = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        sa(t);
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
    Lo(this) && this.run();
  }
  get dirty() {
    return Lo(this);
  }
}
let vc = 0, br, vr;
function wc(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = vr, vr = e;
    return;
  }
  e.next = br, br = e;
}
function ta() {
  vc++;
}
function na() {
  if (--vc > 0)
    return;
  if (vr) {
    let t = vr;
    for (vr = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; br; ) {
    let t = br;
    for (br = void 0; t; ) {
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
    s.version === -1 ? (s === n && (n = r), sa(s), kf(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Lo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (xc(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function xc(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Sr) || (e.globalVersion = Sr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Lo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = it, s = cn;
  it = e, cn = !0;
  try {
    kc(e);
    const r = e.fn(e._value);
    (t.version === 0 || Kn(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    it = n, cn = s, Tc(e), e.flags &= -3;
  }
}
function sa(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      sa(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function kf(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let cn = !0;
const Ac = [];
function Ln() {
  Ac.push(cn), cn = !1;
}
function On() {
  const e = Ac.pop();
  cn = e === void 0 ? !0 : e;
}
function Qa(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = it;
    it = void 0;
    try {
      t();
    } finally {
      it = n;
    }
  }
}
let Sr = 0;
class Tf {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ra {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!it || !cn || it === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== it)
      n = this.activeLink = new Tf(it, this), it.deps ? (n.prevDep = it.depsTail, it.depsTail.nextDep = n, it.depsTail = n) : it.deps = it.depsTail = n, Sc(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = it.depsTail, n.nextDep = void 0, it.depsTail.nextDep = n, it.depsTail = n, it.deps === n && (it.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Sr++, this.notify(t);
  }
  notify(t) {
    ta();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      na();
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
const Oo = /* @__PURE__ */ new WeakMap(), ys = Symbol(
  ""
), No = Symbol(
  ""
), Er = Symbol(
  ""
);
function Rt(e, t, n) {
  if (cn && it) {
    let s = Oo.get(e);
    s || Oo.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new ra()), r.map = s, r.key = n), r.track();
  }
}
function En(e, t, n, s, r, i) {
  const o = Oo.get(e);
  if (!o) {
    Sr++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (ta(), t === "clear")
    o.forEach(a);
  else {
    const l = ye(e), d = l && ea(n);
    if (l && n === "length") {
      const c = Number(s);
      o.forEach((v, w) => {
        (w === "length" || w === Er || !Jn(w) && w >= c) && a(v);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && a(o.get(n)), d && a(o.get(Er)), t) {
        case "add":
          l ? d && a(o.get("length")) : (a(o.get(ys)), $s(e) && a(o.get(No)));
          break;
        case "delete":
          l || (a(o.get(ys)), $s(e) && a(o.get(No)));
          break;
        case "set":
          $s(e) && a(o.get(ys));
          break;
      }
  }
  na();
}
function Ns(e) {
  const t = je(e);
  return t === e ? t : (Rt(t, "iterate", Er), rn(e) ? t : t.map(xt));
}
function Pi(e) {
  return Rt(e = je(e), "iterate", Er), e;
}
const xf = {
  __proto__: null,
  [Symbol.iterator]() {
    return ao(this, Symbol.iterator, xt);
  },
  concat(...e) {
    return Ns(this).concat(
      ...e.map((t) => ye(t) ? Ns(t) : t)
    );
  },
  entries() {
    return ao(this, "entries", (e) => (e[1] = xt(e[1]), e));
  },
  every(e, t) {
    return xn(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return xn(this, "filter", e, t, (n) => n.map(xt), arguments);
  },
  find(e, t) {
    return xn(this, "find", e, t, xt, arguments);
  },
  findIndex(e, t) {
    return xn(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return xn(this, "findLast", e, t, xt, arguments);
  },
  findLastIndex(e, t) {
    return xn(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return xn(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return lo(this, "includes", e);
  },
  indexOf(...e) {
    return lo(this, "indexOf", e);
  },
  join(e) {
    return Ns(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return lo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return xn(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return rr(this, "pop");
  },
  push(...e) {
    return rr(this, "push", e);
  },
  reduce(e, ...t) {
    return el(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return el(this, "reduceRight", e, t);
  },
  shift() {
    return rr(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return xn(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return rr(this, "splice", e);
  },
  toReversed() {
    return Ns(this).toReversed();
  },
  toSorted(e) {
    return Ns(this).toSorted(e);
  },
  toSpliced(...e) {
    return Ns(this).toSpliced(...e);
  },
  unshift(...e) {
    return rr(this, "unshift", e);
  },
  values() {
    return ao(this, "values", xt);
  }
};
function ao(e, t, n) {
  const s = Pi(e), r = s[t]();
  return s !== e && !rn(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.value && (i.value = n(i.value)), i;
  }), r;
}
const Af = Array.prototype;
function xn(e, t, n, s, r, i) {
  const o = Pi(e), a = o !== e && !rn(e), l = o[t];
  if (l !== Af[t]) {
    const v = l.apply(e, i);
    return a ? xt(v) : v;
  }
  let d = n;
  o !== e && (a ? d = function(v, w) {
    return n.call(this, xt(v), w, e);
  } : n.length > 2 && (d = function(v, w) {
    return n.call(this, v, w, e);
  }));
  const c = l.call(o, d, s);
  return a && r ? r(c) : c;
}
function el(e, t, n, s) {
  const r = Pi(e);
  let i = n;
  return r !== e && (rn(e) ? n.length > 3 && (i = function(o, a, l) {
    return n.call(this, o, a, l, e);
  }) : i = function(o, a, l) {
    return n.call(this, o, xt(a), l, e);
  }), r[t](i, ...s);
}
function lo(e, t, n) {
  const s = je(e);
  Rt(s, "iterate", Er);
  const r = s[t](...n);
  return (r === -1 || r === !1) && aa(n[0]) ? (n[0] = je(n[0]), s[t](...n)) : r;
}
function rr(e, t, n = []) {
  Ln(), ta();
  const s = je(e)[t].apply(e, n);
  return na(), On(), s;
}
const Sf = /* @__PURE__ */ Zo("__proto__,__v_isRef,__isVue"), Ec = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Jn)
);
function Ef(e) {
  Jn(e) || (e = String(e));
  const t = je(this);
  return Rt(t, "has", e), t.hasOwnProperty(e);
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
      return s === (r ? i ? Ff : Oc : i ? Lc : Ic).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = ye(t);
    if (!r) {
      let l;
      if (o && (l = xf[n]))
        return l;
      if (n === "hasOwnProperty")
        return Ef;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      It(t) ? t : s
    );
    return (Jn(n) ? Ec.has(n) : Sf(n)) || (r || Rt(t, "get", n), i) ? a : It(a) ? o && ea(n) ? a : a.value : lt(a) ? r ? Nc(a) : Mi(a) : a;
  }
}
class Rc extends Cc {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    if (!this._isShallow) {
      const l = Xn(i);
      if (!rn(s) && !Xn(s) && (i = je(i), s = je(s)), !ye(t) && It(i) && !It(s))
        return l ? !1 : (i.value = s, !0);
    }
    const o = ye(t) && ea(n) ? Number(n) < t.length : Ve(t, n), a = Reflect.set(
      t,
      n,
      s,
      It(t) ? t : r
    );
    return t === je(r) && (o ? Kn(s, i) && En(t, "set", n, s) : En(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = Ve(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && En(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Jn(n) || !Ec.has(n)) && Rt(t, "has", n), s;
  }
  ownKeys(t) {
    return Rt(
      t,
      "iterate",
      ye(t) ? "length" : ys
    ), Reflect.ownKeys(t);
  }
}
class Cf extends Cc {
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
const Rf = /* @__PURE__ */ new Rc(), If = /* @__PURE__ */ new Cf(), Lf = /* @__PURE__ */ new Rc(!0);
const Po = (e) => e, Gr = (e) => Reflect.getPrototypeOf(e);
function Of(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = je(r), o = $s(i), a = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, d = r[e](...s), c = n ? Po : t ? _i : xt;
    return !t && Rt(
      i,
      "iterate",
      l ? No : ys
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
function Yr(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Nf(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = je(i), a = je(r);
      e || (Kn(r, a) && Rt(o, "get", r), Rt(o, "get", a));
      const { has: l } = Gr(o), d = t ? Po : e ? _i : xt;
      if (l.call(o, r))
        return d(i.get(r));
      if (l.call(o, a))
        return d(i.get(a));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && Rt(je(r), "iterate", ys), Reflect.get(r, "size", r);
    },
    has(r) {
      const i = this.__v_raw, o = je(i), a = je(r);
      return e || (Kn(r, a) && Rt(o, "has", r), Rt(o, "has", a)), r === a ? i.has(r) : i.has(r) || i.has(a);
    },
    forEach(r, i) {
      const o = this, a = o.__v_raw, l = je(a), d = t ? Po : e ? _i : xt;
      return !e && Rt(l, "iterate", ys), a.forEach((c, v) => r.call(i, d(c), d(v), o));
    }
  };
  return Lt(
    n,
    e ? {
      add: Yr("add"),
      set: Yr("set"),
      delete: Yr("delete"),
      clear: Yr("clear")
    } : {
      add(r) {
        !t && !rn(r) && !Xn(r) && (r = je(r));
        const i = je(this);
        return Gr(i).has.call(i, r) || (i.add(r), En(i, "add", r, r)), this;
      },
      set(r, i) {
        !t && !rn(i) && !Xn(i) && (i = je(i));
        const o = je(this), { has: a, get: l } = Gr(o);
        let d = a.call(o, r);
        d || (r = je(r), d = a.call(o, r));
        const c = l.call(o, r);
        return o.set(r, i), d ? Kn(i, c) && En(o, "set", r, i) : En(o, "add", r, i), this;
      },
      delete(r) {
        const i = je(this), { has: o, get: a } = Gr(i);
        let l = o.call(i, r);
        l || (r = je(r), l = o.call(i, r)), a && a.call(i, r);
        const d = i.delete(r);
        return l && En(i, "delete", r, void 0), d;
      },
      clear() {
        const r = je(this), i = r.size !== 0, o = r.clear();
        return i && En(
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
    n[r] = Of(r, e, t);
  }), n;
}
function ia(e, t) {
  const n = Nf(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    Ve(n, r) && r in s ? n : s,
    r,
    i
  );
}
const Pf = {
  get: /* @__PURE__ */ ia(!1, !1)
}, Mf = {
  get: /* @__PURE__ */ ia(!1, !0)
}, Df = {
  get: /* @__PURE__ */ ia(!0, !1)
};
const Ic = /* @__PURE__ */ new WeakMap(), Lc = /* @__PURE__ */ new WeakMap(), Oc = /* @__PURE__ */ new WeakMap(), Ff = /* @__PURE__ */ new WeakMap();
function $f(e) {
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
function Bf(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : $f(ff(e));
}
function Mi(e) {
  return Xn(e) ? e : oa(
    e,
    !1,
    Rf,
    Pf,
    Ic
  );
}
function Uf(e) {
  return oa(
    e,
    !1,
    Lf,
    Mf,
    Lc
  );
}
function Nc(e) {
  return oa(
    e,
    !0,
    If,
    Df,
    Oc
  );
}
function oa(e, t, n, s, r) {
  if (!lt(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = Bf(e);
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
function Bs(e) {
  return Xn(e) ? Bs(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Xn(e) {
  return !!(e && e.__v_isReadonly);
}
function rn(e) {
  return !!(e && e.__v_isShallow);
}
function aa(e) {
  return e ? !!e.__v_raw : !1;
}
function je(e) {
  const t = e && e.__v_raw;
  return t ? je(t) : e;
}
function zf(e) {
  return !Ve(e, "__v_skip") && Object.isExtensible(e) && Ro(e, "__v_skip", !0), e;
}
const xt = (e) => lt(e) ? Mi(e) : e, _i = (e) => lt(e) ? Nc(e) : e;
function It(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ce(e) {
  return Hf(e, !1);
}
function Hf(e, t) {
  return It(e) ? e : new Wf(e, t);
}
class Wf {
  constructor(t, n) {
    this.dep = new ra(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : je(t), this._value = n ? t : xt(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || rn(t) || Xn(t);
    t = s ? t : je(t), Kn(t, n) && (this._rawValue = t, this._value = s ? t : xt(t), this.dep.trigger());
  }
}
function E(e) {
  return It(e) ? e.value : e;
}
const qf = {
  get: (e, t, n) => t === "__v_raw" ? e : E(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return It(r) && !It(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Pc(e) {
  return Bs(e) ? e : new Proxy(e, qf);
}
class jf {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ra(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Sr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    it !== this)
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
function Vf(e, t, n = !1) {
  let s, r;
  return xe(e) ? s = e : (s = e.get, r = e.set), new jf(s, r, n);
}
const Xr = {}, yi = /* @__PURE__ */ new WeakMap();
let ms;
function Kf(e, t = !1, n = ms) {
  if (n) {
    let s = yi.get(n);
    s || yi.set(n, s = []), s.push(e);
  }
}
function Gf(e, t, n = tt) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: a, call: l } = n, d = (R) => r ? R : rn(R) || r === !1 || r === 0 ? Cn(R, 1) : Cn(R);
  let c, v, w, U, L = !1, K = !1;
  if (It(e) ? (v = () => e.value, L = rn(e)) : Bs(e) ? (v = () => d(e), L = !0) : ye(e) ? (K = !0, L = e.some((R) => Bs(R) || rn(R)), v = () => e.map((R) => {
    if (It(R))
      return R.value;
    if (Bs(R))
      return d(R);
    if (xe(R))
      return l ? l(R, 2) : R();
  })) : xe(e) ? t ? v = l ? () => l(e, 2) : e : v = () => {
    if (w) {
      Ln();
      try {
        w();
      } finally {
        On();
      }
    }
    const R = ms;
    ms = c;
    try {
      return l ? l(e, 3, [U]) : e(U);
    } finally {
      ms = R;
    }
  } : v = yn, t && r) {
    const R = v, M = r === !0 ? 1 / 0 : r;
    v = () => Cn(R(), M);
  }
  const D = wf(), ie = () => {
    c.stop(), D && D.active && Qo(D.effects, c);
  };
  if (i && t) {
    const R = t;
    t = (...M) => {
      R(...M), ie();
    };
  }
  let fe = K ? new Array(e.length).fill(Xr) : Xr;
  const pe = (R) => {
    if (!(!(c.flags & 1) || !c.dirty && !R))
      if (t) {
        const M = c.run();
        if (r || L || (K ? M.some((Y, X) => Kn(Y, fe[X])) : Kn(M, fe))) {
          w && w();
          const Y = ms;
          ms = c;
          try {
            const X = [
              M,
              // pass undefined as the old value when it's changed for the first time
              fe === Xr ? void 0 : K && fe[0] === Xr ? [] : fe,
              U
            ];
            fe = M, l ? l(t, 3, X) : (
              // @ts-expect-error
              t(...X)
            );
          } finally {
            ms = Y;
          }
        }
      } else
        c.run();
  };
  return a && a(pe), c = new bc(v), c.scheduler = o ? () => o(pe, !1) : pe, U = (R) => Kf(R, !1, c), w = c.onStop = () => {
    const R = yi.get(c);
    if (R) {
      if (l)
        l(R, 4);
      else
        for (const M of R) M();
      yi.delete(c);
    }
  }, t ? s ? pe(!0) : fe = c.run() : o ? o(pe.bind(null, !0), !0) : c.run(), ie.pause = c.pause.bind(c), ie.resume = c.resume.bind(c), ie.stop = ie, ie;
}
function Cn(e, t = 1 / 0, n) {
  if (t <= 0 || !lt(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, It(e))
    Cn(e.value, t, n);
  else if (ye(e))
    for (let s = 0; s < e.length; s++)
      Cn(e[s], t, n);
  else if (fc(e) || $s(e))
    e.forEach((s) => {
      Cn(s, t, n);
    });
  else if (pc(e)) {
    for (const s in e)
      Cn(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Cn(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Lr(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Di(r, t, n);
  }
}
function wn(e, t, n, s) {
  if (xe(e)) {
    const r = Lr(e, t, n, s);
    return r && hc(r) && r.catch((i) => {
      Di(i, t, n);
    }), r;
  }
  if (ye(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(wn(e[i], t, n, s));
    return r;
  }
}
function Di(e, t, n, s = !0) {
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
      Ln(), Lr(i, null, 10, [
        e,
        l,
        d
      ]), On();
      return;
    }
  }
  Yf(e, n, r, s, o);
}
function Yf(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Mt = [];
let gn = -1;
const Us = [];
let qn = null, Ps = 0;
const Mc = /* @__PURE__ */ Promise.resolve();
let bi = null;
function bs(e) {
  const t = bi || Mc;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Xf(e) {
  let t = gn + 1, n = Mt.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = Mt[s], i = Cr(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function la(e) {
  if (!(e.flags & 1)) {
    const t = Cr(e), n = Mt[Mt.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Cr(n) ? Mt.push(e) : Mt.splice(Xf(t), 0, e), e.flags |= 1, Dc();
  }
}
function Dc() {
  bi || (bi = Mc.then($c));
}
function Zf(e) {
  ye(e) ? Us.push(...e) : qn && e.id === -1 ? qn.splice(Ps + 1, 0, e) : e.flags & 1 || (Us.push(e), e.flags |= 1), Dc();
}
function tl(e, t, n = gn + 1) {
  for (; n < Mt.length; n++) {
    const s = Mt[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      Mt.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Fc(e) {
  if (Us.length) {
    const t = [...new Set(Us)].sort(
      (n, s) => Cr(n) - Cr(s)
    );
    if (Us.length = 0, qn) {
      qn.push(...t);
      return;
    }
    for (qn = t, Ps = 0; Ps < qn.length; Ps++) {
      const n = qn[Ps];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    qn = null, Ps = 0;
  }
}
const Cr = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function $c(e) {
  try {
    for (gn = 0; gn < Mt.length; gn++) {
      const t = Mt[gn];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Lr(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; gn < Mt.length; gn++) {
      const t = Mt[gn];
      t && (t.flags &= -2);
    }
    gn = -1, Mt.length = 0, Fc(), bi = null, (Mt.length || Us.length) && $c();
  }
}
let sn = null, Bc = null;
function vi(e) {
  const t = sn;
  return sn = e, Bc = e && e.type.__scopeId || null, t;
}
function Jf(e, t = sn, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && ul(-1);
    const i = vi(t);
    let o;
    try {
      o = e(...r);
    } finally {
      vi(i), s._d && ul(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Hn(e, t) {
  if (sn === null)
    return e;
  const n = zi(sn), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, a, l = tt] = t[r];
    i && (xe(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Cn(o), s.push({
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
    l && (Ln(), wn(l, n, 8, [
      e.el,
      a,
      e,
      t
    ]), On());
  }
}
const Qf = Symbol("_vte"), eh = (e) => e.__isTeleport;
function ca(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, ca(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ua(e, t) {
  return xe(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Lt({ name: e.name }, t, { setup: e })
  ) : e;
}
function Uc(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function wr(e, t, n, s, r = !1) {
  if (ye(e)) {
    e.forEach(
      (L, K) => wr(
        L,
        t && (ye(t) ? t[K] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (kr(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && wr(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? zi(s.component) : s.el, o = r ? null : i, { i: a, r: l } = e, d = t && t.r, c = a.refs === tt ? a.refs = {} : a.refs, v = a.setupState, w = je(v), U = v === tt ? () => !1 : (L) => Ve(w, L);
  if (d != null && d !== l && (pt(d) ? (c[d] = null, U(d) && (v[d] = null)) : It(d) && (d.value = null)), xe(l))
    Lr(l, a, 12, [o, c]);
  else {
    const L = pt(l), K = It(l);
    if (L || K) {
      const D = () => {
        if (e.f) {
          const ie = L ? U(l) ? v[l] : c[l] : l.value;
          r ? ye(ie) && Qo(ie, i) : ye(ie) ? ie.includes(i) || ie.push(i) : L ? (c[l] = [i], U(l) && (v[l] = c[l])) : (l.value = [i], e.k && (c[e.k] = l.value));
        } else L ? (c[l] = o, U(l) && (v[l] = o)) : K && (l.value = o, e.k && (c[e.k] = o));
      };
      o ? (D.id = -1, Vt(D, n)) : D();
    }
  }
}
Ni().requestIdleCallback;
Ni().cancelIdleCallback;
const kr = (e) => !!e.type.__asyncLoader, zc = (e) => e.type.__isKeepAlive;
function th(e, t) {
  Hc(e, "a", t);
}
function nh(e, t) {
  Hc(e, "da", t);
}
function Hc(e, t, n = Dt) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Fi(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      zc(r.parent.vnode) && sh(s, t, n, r), r = r.parent;
  }
}
function sh(e, t, n, s) {
  const r = Fi(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Or(() => {
    Qo(s[t], r);
  }, n);
}
function Fi(e, t, n = Dt, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Ln();
      const a = Nr(n), l = wn(t, n, e, o);
      return a(), On(), l;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Nn = (e) => (t, n = Dt) => {
  (!Ir || e === "sp") && Fi(e, (...s) => t(...s), n);
}, rh = Nn("bm"), $i = Nn("m"), ih = Nn(
  "bu"
), oh = Nn("u"), Wc = Nn(
  "bum"
), Or = Nn("um"), ah = Nn(
  "sp"
), lh = Nn("rtg"), ch = Nn("rtc");
function uh(e, t = Dt) {
  Fi("ec", e, t);
}
const fh = Symbol.for("v-ndc");
function Tt(e, t, n, s) {
  let r;
  const i = n, o = ye(e);
  if (o || pt(e)) {
    const a = o && Bs(e);
    let l = !1, d = !1;
    a && (l = !rn(e), d = Xn(e), e = Pi(e)), r = new Array(e.length);
    for (let c = 0, v = e.length; c < v; c++)
      r[c] = t(
        l ? d ? _i(xt(e[c])) : xt(e[c]) : e[c],
        c,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let a = 0; a < e; a++)
      r[a] = t(a + 1, a, void 0, i);
  } else if (lt(e))
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
const Mo = (e) => e ? uu(e) ? zi(e) : Mo(e.parent) : null, Tr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Lt(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Mo(e.parent),
    $root: (e) => Mo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => jc(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      la(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = bs.bind(e.proxy)),
    $watch: (e) => Nh.bind(e)
  })
), co = (e, t) => e !== tt && !e.__isScriptSetup && Ve(e, t), hh = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: a, appContext: l } = e;
    let d;
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
        if (co(s, t))
          return o[t] = 1, s[t];
        if (r !== tt && Ve(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && Ve(d, t)
        )
          return o[t] = 3, i[t];
        if (n !== tt && Ve(n, t))
          return o[t] = 4, n[t];
        Do && (o[t] = 0);
      }
    }
    const c = Tr[t];
    let v, w;
    if (c)
      return t === "$attrs" && Rt(e.attrs, "get", ""), c(e);
    if (
      // css module (injected by vue-loader)
      (v = a.__cssModules) && (v = v[t])
    )
      return v;
    if (n !== tt && Ve(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      w = l.config.globalProperties, Ve(w, t)
    )
      return w[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return co(r, t) ? (r[t] = n, !0) : s !== tt && Ve(s, t) ? (s[t] = n, !0) : Ve(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i }
  }, o) {
    let a;
    return !!n[o] || e !== tt && Ve(e, o) || co(t, o) || (a = i[0]) && Ve(a, o) || Ve(s, o) || Ve(Tr, o) || Ve(r.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Ve(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function nl(e) {
  return ye(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Do = !0;
function dh(e) {
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
    beforeUpdate: U,
    updated: L,
    activated: K,
    deactivated: D,
    beforeDestroy: ie,
    beforeUnmount: fe,
    destroyed: pe,
    unmounted: R,
    render: M,
    renderTracked: Y,
    renderTriggered: X,
    errorCaptured: _e,
    serverPrefetch: Re,
    // public API
    expose: be,
    inheritAttrs: Be,
    // assets
    components: ve,
    directives: Je,
    filters: We
  } = t;
  if (d && ph(d, s, null), o)
    for (const we in o) {
      const me = o[we];
      xe(me) && (s[we] = me.bind(n));
    }
  if (r) {
    const we = r.call(n, n);
    lt(we) && (e.data = Mi(we));
  }
  if (Do = !0, i)
    for (const we in i) {
      const me = i[we], Ge = xe(me) ? me.bind(n, n) : xe(me.get) ? me.get.bind(n, n) : yn, Ae = !xe(me) && xe(me.set) ? me.set.bind(n) : yn, st = de({
        get: Ge,
        set: Ae
      });
      Object.defineProperty(s, we, {
        enumerable: !0,
        configurable: !0,
        get: () => st.value,
        set: (Ie) => st.value = Ie
      });
    }
  if (a)
    for (const we in a)
      qc(a[we], s, n, we);
  if (l) {
    const we = xe(l) ? l.call(n) : l;
    Reflect.ownKeys(we).forEach((me) => {
      vh(me, we[me]);
    });
  }
  c && sl(c, e, "c");
  function he(we, me) {
    ye(me) ? me.forEach((Ge) => we(Ge.bind(n))) : me && we(me.bind(n));
  }
  if (he(rh, v), he($i, w), he(ih, U), he(oh, L), he(th, K), he(nh, D), he(uh, _e), he(ch, Y), he(lh, X), he(Wc, fe), he(Or, R), he(ah, Re), ye(be))
    if (be.length) {
      const we = e.exposed || (e.exposed = {});
      be.forEach((me) => {
        Object.defineProperty(we, me, {
          get: () => n[me],
          set: (Ge) => n[me] = Ge,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  M && e.render === yn && (e.render = M), Be != null && (e.inheritAttrs = Be), ve && (e.components = ve), Je && (e.directives = Je), Re && Uc(e);
}
function ph(e, t, n = yn) {
  ye(e) && (e = Fo(e));
  for (const s in e) {
    const r = e[s];
    let i;
    lt(r) ? "default" in r ? i = ni(
      r.from || s,
      r.default,
      !0
    ) : i = ni(r.from || s) : i = ni(r), It(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function sl(e, t, n) {
  wn(
    ye(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function qc(e, t, n, s) {
  let r = s.includes(".") ? ru(n, s) : () => n[s];
  if (pt(e)) {
    const i = t[e];
    xe(i) && Pt(r, i);
  } else if (xe(e))
    Pt(r, e.bind(n));
  else if (lt(e))
    if (ye(e))
      e.forEach((i) => qc(i, t, n, s));
    else {
      const i = xe(e.handler) ? e.handler.bind(n) : t[e.handler];
      xe(i) && Pt(r, i, e);
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
    (d) => wi(l, d, o, !0)
  ), wi(l, t, o)), lt(t) && i.set(t, l), l;
}
function wi(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && wi(e, i, n, !0), r && r.forEach(
    (o) => wi(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const a = mh[o] || n && n[o];
      e[o] = a ? a(e[o], t[o]) : t[o];
    }
  return e;
}
const mh = {
  data: rl,
  props: il,
  emits: il,
  // objects
  methods: pr,
  computed: pr,
  // lifecycle
  beforeCreate: Nt,
  created: Nt,
  beforeMount: Nt,
  mounted: Nt,
  beforeUpdate: Nt,
  updated: Nt,
  beforeDestroy: Nt,
  beforeUnmount: Nt,
  destroyed: Nt,
  unmounted: Nt,
  activated: Nt,
  deactivated: Nt,
  errorCaptured: Nt,
  serverPrefetch: Nt,
  // assets
  components: pr,
  directives: pr,
  // watch
  watch: _h,
  // provide / inject
  provide: rl,
  inject: gh
};
function rl(e, t) {
  return t ? e ? function() {
    return Lt(
      xe(e) ? e.call(this, this) : e,
      xe(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function gh(e, t) {
  return pr(Fo(e), Fo(t));
}
function Fo(e) {
  if (ye(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Nt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function pr(e, t) {
  return e ? Lt(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function il(e, t) {
  return e ? ye(e) && ye(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Lt(
    /* @__PURE__ */ Object.create(null),
    nl(e),
    nl(t ?? {})
  ) : t;
}
function _h(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Lt(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Nt(e[s], t[s]);
  return n;
}
function Vc() {
  return {
    app: null,
    config: {
      isNativeTag: cf,
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
let yh = 0;
function bh(e, t) {
  return function(s, r = null) {
    xe(s) || (s = Lt({}, s)), r != null && !lt(r) && (r = null);
    const i = Vc(), o = /* @__PURE__ */ new WeakSet(), a = [];
    let l = !1;
    const d = i.app = {
      _uid: yh++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: ed,
      get config() {
        return i.config;
      },
      set config(c) {
      },
      use(c, ...v) {
        return o.has(c) || (c && xe(c.install) ? (o.add(c), c.install(d, ...v)) : xe(c) && (o.add(c), c(d, ...v))), d;
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
          const U = d._ceVNode || bn(s, r);
          return U.appContext = i, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(U, c, w), l = !0, d._container = c, c.__vue_app__ = d, zi(U.component);
        }
      },
      onUnmount(c) {
        a.push(c);
      },
      unmount() {
        l && (wn(
          a,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(c, v) {
        return i.provides[c] = v, d;
      },
      runWithContext(c) {
        const v = zs;
        zs = d;
        try {
          return c();
        } finally {
          zs = v;
        }
      }
    };
    return d;
  };
}
let zs = null;
function vh(e, t) {
  if (Dt) {
    let n = Dt.provides;
    const s = Dt.parent && Dt.parent.provides;
    s === n && (n = Dt.provides = Object.create(s)), n[e] = t;
  }
}
function ni(e, t, n = !1) {
  const s = Gh();
  if (s || zs) {
    let r = zs ? zs._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && xe(t) ? t.call(s && s.proxy) : t;
  }
}
const Kc = {}, Gc = () => Object.create(Kc), Yc = (e) => Object.getPrototypeOf(e) === Kc;
function wh(e, t, n, s = !1) {
  const r = {}, i = Gc();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Xc(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : Uf(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function kh(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, a = je(r), [l] = e.propsOptions;
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
        if (Bi(e.emitsOptions, w))
          continue;
        const U = t[w];
        if (l)
          if (Ve(i, w))
            U !== i[w] && (i[w] = U, d = !0);
          else {
            const L = Yn(w);
            r[L] = $o(
              l,
              a,
              L,
              U,
              e,
              !1
            );
          }
        else
          U !== i[w] && (i[w] = U, d = !0);
      }
    }
  } else {
    Xc(e, t, r, i) && (d = !0);
    let c;
    for (const v in a)
      (!t || // for camelCase
      !Ve(t, v) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Qn(v)) === v || !Ve(t, c))) && (l ? n && // for camelCase
      (n[v] !== void 0 || // for kebab-case
      n[c] !== void 0) && (r[v] = $o(
        l,
        a,
        v,
        void 0,
        e,
        !0
      )) : delete r[v]);
    if (i !== a)
      for (const v in i)
        (!t || !Ve(t, v)) && (delete i[v], d = !0);
  }
  d && En(e.attrs, "set", "");
}
function Xc(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, a;
  if (t)
    for (let l in t) {
      if (yr(l))
        continue;
      const d = t[l];
      let c;
      r && Ve(r, c = Yn(l)) ? !i || !i.includes(c) ? n[c] = d : (a || (a = {}))[c] = d : Bi(e.emitsOptions, l) || (!(l in s) || d !== s[l]) && (s[l] = d, o = !0);
    }
  if (i) {
    const l = je(n), d = a || tt;
    for (let c = 0; c < i.length; c++) {
      const v = i[c];
      n[v] = $o(
        r,
        l,
        v,
        d[v],
        e,
        !Ve(d, v)
      );
    }
  }
  return o;
}
function $o(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const a = Ve(o, "default");
    if (a && s === void 0) {
      const l = o.default;
      if (o.type !== Function && !o.skipFactory && xe(l)) {
        const { propsDefaults: d } = r;
        if (n in d)
          s = d[n];
        else {
          const c = Nr(r);
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
    ] && (s === "" || s === Qn(n)) && (s = !0));
  }
  return s;
}
const Th = /* @__PURE__ */ new WeakMap();
function Zc(e, t, n = !1) {
  const s = n ? Th : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, a = [];
  let l = !1;
  if (!xe(e)) {
    const c = (v) => {
      l = !0;
      const [w, U] = Zc(v, t, !0);
      Lt(o, w), U && a.push(...U);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!i && !l)
    return lt(e) && s.set(e, Fs), Fs;
  if (ye(i))
    for (let c = 0; c < i.length; c++) {
      const v = Yn(i[c]);
      ol(v) && (o[v] = tt);
    }
  else if (i)
    for (const c in i) {
      const v = Yn(c);
      if (ol(v)) {
        const w = i[c], U = o[v] = ye(w) || xe(w) ? { type: w } : Lt({}, w), L = U.type;
        let K = !1, D = !0;
        if (ye(L))
          for (let ie = 0; ie < L.length; ++ie) {
            const fe = L[ie], pe = xe(fe) && fe.name;
            if (pe === "Boolean") {
              K = !0;
              break;
            } else pe === "String" && (D = !1);
          }
        else
          K = xe(L) && L.name === "Boolean";
        U[
          0
          /* shouldCast */
        ] = K, U[
          1
          /* shouldCastTrue */
        ] = D, (K || Ve(U, "default")) && a.push(v);
      }
    }
  const d = [o, a];
  return lt(e) && s.set(e, d), d;
}
function ol(e) {
  return e[0] !== "$" && !yr(e);
}
const fa = (e) => e === "_" || e === "__" || e === "_ctx" || e === "$stable", ha = (e) => ye(e) ? e.map(_n) : [_n(e)], xh = (e, t, n) => {
  if (t._n)
    return t;
  const s = Jf((...r) => ha(t(...r)), n);
  return s._c = !1, s;
}, Jc = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (fa(r)) continue;
    const i = e[r];
    if (xe(i))
      t[r] = xh(r, i, s);
    else if (i != null) {
      const o = ha(i);
      t[r] = () => o;
    }
  }
}, Qc = (e, t) => {
  const n = ha(t);
  e.slots.default = () => n;
}, eu = (e, t, n) => {
  for (const s in t)
    (n || !fa(s)) && (e[s] = t[s]);
}, Ah = (e, t, n) => {
  const s = e.slots = Gc();
  if (e.vnode.shapeFlag & 32) {
    const r = t.__;
    r && Ro(s, "__", r, !0);
    const i = t._;
    i ? (eu(s, t, n), n && Ro(s, "_", i, !0)) : Jc(t, s);
  } else t && Qc(e, t);
}, Sh = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = tt;
  if (s.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? i = !1 : eu(r, t, n) : (i = !t.$stable, Jc(t, r)), o = t;
  } else t && (Qc(e, t), o = { default: 1 });
  if (i)
    for (const a in r)
      !fa(a) && o[a] == null && delete r[a];
}, Vt = Uh;
function Eh(e) {
  return Ch(e);
}
function Ch(e, t) {
  const n = Ni();
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
    setScopeId: U = yn,
    insertStaticContent: L
  } = e, K = (g, y, C, N = null, $ = null, P = null, G = void 0, W = null, z = !!y.dynamicChildren) => {
    if (g === y)
      return;
    g && !ir(g, y) && (N = At(g), Ie(g, $, P, !0), g = null), y.patchFlag === -2 && (z = !1, y.dynamicChildren = null);
    const { type: H, ref: ee, shapeFlag: T } = y;
    switch (H) {
      case Ui:
        D(g, y, C, N);
        break;
      case Zn:
        ie(g, y, C, N);
        break;
      case si:
        g == null && fe(y, C, N, G);
        break;
      case ze:
        ve(
          g,
          y,
          C,
          N,
          $,
          P,
          G,
          W,
          z
        );
        break;
      default:
        T & 1 ? M(
          g,
          y,
          C,
          N,
          $,
          P,
          G,
          W,
          z
        ) : T & 6 ? Je(
          g,
          y,
          C,
          N,
          $,
          P,
          G,
          W,
          z
        ) : (T & 64 || T & 128) && H.process(
          g,
          y,
          C,
          N,
          $,
          P,
          G,
          W,
          z,
          wt
        );
    }
    ee != null && $ ? wr(ee, g && g.ref, P, y || g, !y) : ee == null && g && g.ref != null && wr(g.ref, null, P, g, !0);
  }, D = (g, y, C, N) => {
    if (g == null)
      s(
        y.el = a(y.children),
        C,
        N
      );
    else {
      const $ = y.el = g.el;
      y.children !== g.children && d($, y.children);
    }
  }, ie = (g, y, C, N) => {
    g == null ? s(
      y.el = l(y.children || ""),
      C,
      N
    ) : y.el = g.el;
  }, fe = (g, y, C, N) => {
    [g.el, g.anchor] = L(
      g.children,
      y,
      C,
      N,
      g.el,
      g.anchor
    );
  }, pe = ({ el: g, anchor: y }, C, N) => {
    let $;
    for (; g && g !== y; )
      $ = w(g), s(g, C, N), g = $;
    s(y, C, N);
  }, R = ({ el: g, anchor: y }) => {
    let C;
    for (; g && g !== y; )
      C = w(g), r(g), g = C;
    r(y);
  }, M = (g, y, C, N, $, P, G, W, z) => {
    y.type === "svg" ? G = "svg" : y.type === "math" && (G = "mathml"), g == null ? Y(
      y,
      C,
      N,
      $,
      P,
      G,
      W,
      z
    ) : Re(
      g,
      y,
      $,
      P,
      G,
      W,
      z
    );
  }, Y = (g, y, C, N, $, P, G, W) => {
    let z, H;
    const { props: ee, shapeFlag: T, transition: I, dirs: j } = g;
    if (z = g.el = o(
      g.type,
      P,
      ee && ee.is,
      ee
    ), T & 8 ? c(z, g.children) : T & 16 && _e(
      g.children,
      z,
      null,
      N,
      $,
      uo(g, P),
      G,
      W
    ), j && us(g, null, N, "created"), X(z, g, g.scopeId, G, N), ee) {
      for (const ue in ee)
        ue !== "value" && !yr(ue) && i(z, ue, null, ee[ue], P, N);
      "value" in ee && i(z, "value", null, ee.value, P), (H = ee.onVnodeBeforeMount) && dn(H, N, g);
    }
    j && us(g, null, N, "beforeMount");
    const J = Rh($, I);
    J && I.beforeEnter(z), s(z, y, C), ((H = ee && ee.onVnodeMounted) || J || j) && Vt(() => {
      H && dn(H, N, g), J && I.enter(z), j && us(g, null, N, "mounted");
    }, $);
  }, X = (g, y, C, N, $) => {
    if (C && U(g, C), N)
      for (let P = 0; P < N.length; P++)
        U(g, N[P]);
    if ($) {
      let P = $.subTree;
      if (y === P || ou(P.type) && (P.ssContent === y || P.ssFallback === y)) {
        const G = $.vnode;
        X(
          g,
          G,
          G.scopeId,
          G.slotScopeIds,
          $.parent
        );
      }
    }
  }, _e = (g, y, C, N, $, P, G, W, z = 0) => {
    for (let H = z; H < g.length; H++) {
      const ee = g[H] = W ? jn(g[H]) : _n(g[H]);
      K(
        null,
        ee,
        y,
        C,
        N,
        $,
        P,
        G,
        W
      );
    }
  }, Re = (g, y, C, N, $, P, G) => {
    const W = y.el = g.el;
    let { patchFlag: z, dynamicChildren: H, dirs: ee } = y;
    z |= g.patchFlag & 16;
    const T = g.props || tt, I = y.props || tt;
    let j;
    if (C && fs(C, !1), (j = I.onVnodeBeforeUpdate) && dn(j, C, y, g), ee && us(y, g, C, "beforeUpdate"), C && fs(C, !0), (T.innerHTML && I.innerHTML == null || T.textContent && I.textContent == null) && c(W, ""), H ? be(
      g.dynamicChildren,
      H,
      W,
      C,
      N,
      uo(y, $),
      P
    ) : G || me(
      g,
      y,
      W,
      null,
      C,
      N,
      uo(y, $),
      P,
      !1
    ), z > 0) {
      if (z & 16)
        Be(W, T, I, C, $);
      else if (z & 2 && T.class !== I.class && i(W, "class", null, I.class, $), z & 4 && i(W, "style", T.style, I.style, $), z & 8) {
        const J = y.dynamicProps;
        for (let ue = 0; ue < J.length; ue++) {
          const re = J[ue], Ne = T[re], Te = I[re];
          (Te !== Ne || re === "value") && i(W, re, Ne, Te, $, C);
        }
      }
      z & 1 && g.children !== y.children && c(W, y.children);
    } else !G && H == null && Be(W, T, I, C, $);
    ((j = I.onVnodeUpdated) || ee) && Vt(() => {
      j && dn(j, C, y, g), ee && us(y, g, C, "updated");
    }, N);
  }, be = (g, y, C, N, $, P, G) => {
    for (let W = 0; W < y.length; W++) {
      const z = g[W], H = y[W], ee = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        z.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (z.type === ze || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ir(z, H) || // - In the case of a component, it could contain anything.
        z.shapeFlag & 198) ? v(z.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          C
        )
      );
      K(
        z,
        H,
        ee,
        null,
        N,
        $,
        P,
        G,
        !0
      );
    }
  }, Be = (g, y, C, N, $) => {
    if (y !== C) {
      if (y !== tt)
        for (const P in y)
          !yr(P) && !(P in C) && i(
            g,
            P,
            y[P],
            null,
            $,
            N
          );
      for (const P in C) {
        if (yr(P)) continue;
        const G = C[P], W = y[P];
        G !== W && P !== "value" && i(g, P, W, G, $, N);
      }
      "value" in C && i(g, "value", y.value, C.value, $);
    }
  }, ve = (g, y, C, N, $, P, G, W, z) => {
    const H = y.el = g ? g.el : a(""), ee = y.anchor = g ? g.anchor : a("");
    let { patchFlag: T, dynamicChildren: I, slotScopeIds: j } = y;
    j && (W = W ? W.concat(j) : j), g == null ? (s(H, C, N), s(ee, C, N), _e(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      y.children || [],
      C,
      ee,
      $,
      P,
      G,
      W,
      z
    )) : T > 0 && T & 64 && I && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    g.dynamicChildren ? (be(
      g.dynamicChildren,
      I,
      C,
      $,
      P,
      G,
      W
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (y.key != null || $ && y === $.subTree) && tu(
      g,
      y,
      !0
      /* shallow */
    )) : me(
      g,
      y,
      C,
      ee,
      $,
      P,
      G,
      W,
      z
    );
  }, Je = (g, y, C, N, $, P, G, W, z) => {
    y.slotScopeIds = W, g == null ? y.shapeFlag & 512 ? $.ctx.activate(
      y,
      C,
      N,
      G,
      z
    ) : We(
      y,
      C,
      N,
      $,
      P,
      G,
      z
    ) : nt(g, y, z);
  }, We = (g, y, C, N, $, P, G) => {
    const W = g.component = Kh(
      g,
      N,
      $
    );
    if (zc(g) && (W.ctx.renderer = wt), Yh(W, !1, G), W.asyncDep) {
      if ($ && $.registerDep(W, he, G), !g.el) {
        const z = W.subTree = bn(Zn);
        ie(null, z, y, C), g.placeholder = z.el;
      }
    } else
      he(
        W,
        g,
        y,
        C,
        $,
        P,
        G
      );
  }, nt = (g, y, C) => {
    const N = y.component = g.component;
    if ($h(g, y, C))
      if (N.asyncDep && !N.asyncResolved) {
        we(N, y, C);
        return;
      } else
        N.next = y, N.update();
    else
      y.el = g.el, N.vnode = y;
  }, he = (g, y, C, N, $, P, G) => {
    const W = () => {
      if (g.isMounted) {
        let { next: T, bu: I, u: j, parent: J, vnode: ue } = g;
        {
          const h = nu(g);
          if (h) {
            T && (T.el = ue.el, we(g, T, G)), h.asyncDep.then(() => {
              g.isUnmounted || W();
            });
            return;
          }
        }
        let re = T, Ne;
        fs(g, !1), T ? (T.el = ue.el, we(g, T, G)) : T = ue, I && ti(I), (Ne = T.props && T.props.onVnodeBeforeUpdate) && dn(Ne, J, T, ue), fs(g, !0);
        const Te = ll(g), Qe = g.subTree;
        g.subTree = Te, K(
          Qe,
          Te,
          // parent may have changed if it's in a teleport
          v(Qe.el),
          // anchor may have changed if it's in a fragment
          At(Qe),
          g,
          $,
          P
        ), T.el = Te.el, re === null && Bh(g, Te.el), j && Vt(j, $), (Ne = T.props && T.props.onVnodeUpdated) && Vt(
          () => dn(Ne, J, T, ue),
          $
        );
      } else {
        let T;
        const { el: I, props: j } = y, { bm: J, m: ue, parent: re, root: Ne, type: Te } = g, Qe = kr(y);
        fs(g, !1), J && ti(J), !Qe && (T = j && j.onVnodeBeforeMount) && dn(T, re, y), fs(g, !0);
        {
          Ne.ce && // @ts-expect-error _def is private
          Ne.ce._def.shadowRoot !== !1 && Ne.ce._injectChildStyle(Te);
          const h = g.subTree = ll(g);
          K(
            null,
            h,
            C,
            N,
            g,
            $,
            P
          ), y.el = h.el;
        }
        if (ue && Vt(ue, $), !Qe && (T = j && j.onVnodeMounted)) {
          const h = y;
          Vt(
            () => dn(T, re, h),
            $
          );
        }
        (y.shapeFlag & 256 || re && kr(re.vnode) && re.vnode.shapeFlag & 256) && g.a && Vt(g.a, $), g.isMounted = !0, y = C = N = null;
      }
    };
    g.scope.on();
    const z = g.effect = new bc(W);
    g.scope.off();
    const H = g.update = z.run.bind(z), ee = g.job = z.runIfDirty.bind(z);
    ee.i = g, ee.id = g.uid, z.scheduler = () => la(ee), fs(g, !0), H();
  }, we = (g, y, C) => {
    y.component = g;
    const N = g.vnode.props;
    g.vnode = y, g.next = null, kh(g, y.props, N, C), Sh(g, y.children, C), Ln(), tl(g), On();
  }, me = (g, y, C, N, $, P, G, W, z = !1) => {
    const H = g && g.children, ee = g ? g.shapeFlag : 0, T = y.children, { patchFlag: I, shapeFlag: j } = y;
    if (I > 0) {
      if (I & 128) {
        Ae(
          H,
          T,
          C,
          N,
          $,
          P,
          G,
          W,
          z
        );
        return;
      } else if (I & 256) {
        Ge(
          H,
          T,
          C,
          N,
          $,
          P,
          G,
          W,
          z
        );
        return;
      }
    }
    j & 8 ? (ee & 16 && gt(H, $, P), T !== H && c(C, T)) : ee & 16 ? j & 16 ? Ae(
      H,
      T,
      C,
      N,
      $,
      P,
      G,
      W,
      z
    ) : gt(H, $, P, !0) : (ee & 8 && c(C, ""), j & 16 && _e(
      T,
      C,
      N,
      $,
      P,
      G,
      W,
      z
    ));
  }, Ge = (g, y, C, N, $, P, G, W, z) => {
    g = g || Fs, y = y || Fs;
    const H = g.length, ee = y.length, T = Math.min(H, ee);
    let I;
    for (I = 0; I < T; I++) {
      const j = y[I] = z ? jn(y[I]) : _n(y[I]);
      K(
        g[I],
        j,
        C,
        null,
        $,
        P,
        G,
        W,
        z
      );
    }
    H > ee ? gt(
      g,
      $,
      P,
      !0,
      !1,
      T
    ) : _e(
      y,
      C,
      N,
      $,
      P,
      G,
      W,
      z,
      T
    );
  }, Ae = (g, y, C, N, $, P, G, W, z) => {
    let H = 0;
    const ee = y.length;
    let T = g.length - 1, I = ee - 1;
    for (; H <= T && H <= I; ) {
      const j = g[H], J = y[H] = z ? jn(y[H]) : _n(y[H]);
      if (ir(j, J))
        K(
          j,
          J,
          C,
          null,
          $,
          P,
          G,
          W,
          z
        );
      else
        break;
      H++;
    }
    for (; H <= T && H <= I; ) {
      const j = g[T], J = y[I] = z ? jn(y[I]) : _n(y[I]);
      if (ir(j, J))
        K(
          j,
          J,
          C,
          null,
          $,
          P,
          G,
          W,
          z
        );
      else
        break;
      T--, I--;
    }
    if (H > T) {
      if (H <= I) {
        const j = I + 1, J = j < ee ? y[j].el : N;
        for (; H <= I; )
          K(
            null,
            y[H] = z ? jn(y[H]) : _n(y[H]),
            C,
            J,
            $,
            P,
            G,
            W,
            z
          ), H++;
      }
    } else if (H > I)
      for (; H <= T; )
        Ie(g[H], $, P, !0), H++;
    else {
      const j = H, J = H, ue = /* @__PURE__ */ new Map();
      for (H = J; H <= I; H++) {
        const A = y[H] = z ? jn(y[H]) : _n(y[H]);
        A.key != null && ue.set(A.key, H);
      }
      let re, Ne = 0;
      const Te = I - J + 1;
      let Qe = !1, h = 0;
      const _ = new Array(Te);
      for (H = 0; H < Te; H++) _[H] = 0;
      for (H = j; H <= T; H++) {
        const A = g[H];
        if (Ne >= Te) {
          Ie(A, $, P, !0);
          continue;
        }
        let q;
        if (A.key != null)
          q = ue.get(A.key);
        else
          for (re = J; re <= I; re++)
            if (_[re - J] === 0 && ir(A, y[re])) {
              q = re;
              break;
            }
        q === void 0 ? Ie(A, $, P, !0) : (_[q - J] = H + 1, q >= h ? h = q : Qe = !0, K(
          A,
          y[q],
          C,
          null,
          $,
          P,
          G,
          W,
          z
        ), Ne++);
      }
      const O = Qe ? Ih(_) : Fs;
      for (re = O.length - 1, H = Te - 1; H >= 0; H--) {
        const A = J + H, q = y[A], Z = y[A + 1], oe = A + 1 < ee ? (
          // #13559, fallback to el placeholder for unresolved async component
          Z.el || Z.placeholder
        ) : N;
        _[H] === 0 ? K(
          null,
          q,
          C,
          oe,
          $,
          P,
          G,
          W,
          z
        ) : Qe && (re < 0 || H !== O[re] ? st(q, C, oe, 2) : re--);
      }
    }
  }, st = (g, y, C, N, $ = null) => {
    const { el: P, type: G, transition: W, children: z, shapeFlag: H } = g;
    if (H & 6) {
      st(g.component.subTree, y, C, N);
      return;
    }
    if (H & 128) {
      g.suspense.move(y, C, N);
      return;
    }
    if (H & 64) {
      G.move(g, y, C, wt);
      return;
    }
    if (G === ze) {
      s(P, y, C);
      for (let T = 0; T < z.length; T++)
        st(z[T], y, C, N);
      s(g.anchor, y, C);
      return;
    }
    if (G === si) {
      pe(g, y, C);
      return;
    }
    if (N !== 2 && H & 1 && W)
      if (N === 0)
        W.beforeEnter(P), s(P, y, C), Vt(() => W.enter(P), $);
      else {
        const { leave: T, delayLeave: I, afterLeave: j } = W, J = () => {
          g.ctx.isUnmounted ? r(P) : s(P, y, C);
        }, ue = () => {
          T(P, () => {
            J(), j && j();
          });
        };
        I ? I(P, J, ue) : ue();
      }
    else
      s(P, y, C);
  }, Ie = (g, y, C, N = !1, $ = !1) => {
    const {
      type: P,
      props: G,
      ref: W,
      children: z,
      dynamicChildren: H,
      shapeFlag: ee,
      patchFlag: T,
      dirs: I,
      cacheIndex: j
    } = g;
    if (T === -2 && ($ = !1), W != null && (Ln(), wr(W, null, C, g, !0), On()), j != null && (y.renderCache[j] = void 0), ee & 256) {
      y.ctx.deactivate(g);
      return;
    }
    const J = ee & 1 && I, ue = !kr(g);
    let re;
    if (ue && (re = G && G.onVnodeBeforeUnmount) && dn(re, y, g), ee & 6)
      Ee(g.component, C, N);
    else {
      if (ee & 128) {
        g.suspense.unmount(C, N);
        return;
      }
      J && us(g, null, y, "beforeUnmount"), ee & 64 ? g.type.remove(
        g,
        y,
        C,
        wt,
        N
      ) : H && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !H.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (P !== ze || T > 0 && T & 64) ? gt(
        H,
        y,
        C,
        !1,
        !0
      ) : (P === ze && T & 384 || !$ && ee & 16) && gt(z, y, C), N && ft(g);
    }
    (ue && (re = G && G.onVnodeUnmounted) || J) && Vt(() => {
      re && dn(re, y, g), J && us(g, null, y, "unmounted");
    }, C);
  }, ft = (g) => {
    const { type: y, el: C, anchor: N, transition: $ } = g;
    if (y === ze) {
      Wt(C, N);
      return;
    }
    if (y === si) {
      R(g);
      return;
    }
    const P = () => {
      r(C), $ && !$.persisted && $.afterLeave && $.afterLeave();
    };
    if (g.shapeFlag & 1 && $ && !$.persisted) {
      const { leave: G, delayLeave: W } = $, z = () => G(C, P);
      W ? W(g.el, P, z) : z();
    } else
      P();
  }, Wt = (g, y) => {
    let C;
    for (; g !== y; )
      C = w(g), r(g), g = C;
    r(y);
  }, Ee = (g, y, C) => {
    const {
      bum: N,
      scope: $,
      job: P,
      subTree: G,
      um: W,
      m: z,
      a: H,
      parent: ee,
      slots: { __: T }
    } = g;
    al(z), al(H), N && ti(N), ee && ye(T) && T.forEach((I) => {
      ee.renderCache[I] = void 0;
    }), $.stop(), P && (P.flags |= 8, Ie(G, g, y, C)), W && Vt(W, y), Vt(() => {
      g.isUnmounted = !0;
    }, y), y && y.pendingBranch && !y.isUnmounted && g.asyncDep && !g.asyncResolved && g.suspenseId === y.pendingId && (y.deps--, y.deps === 0 && y.resolve());
  }, gt = (g, y, C, N = !1, $ = !1, P = 0) => {
    for (let G = P; G < g.length; G++)
      Ie(g[G], y, C, N, $);
  }, At = (g) => {
    if (g.shapeFlag & 6)
      return At(g.component.subTree);
    if (g.shapeFlag & 128)
      return g.suspense.next();
    const y = w(g.anchor || g.el), C = y && y[Qf];
    return C ? w(C) : y;
  };
  let St = !1;
  const $t = (g, y, C) => {
    g == null ? y._vnode && Ie(y._vnode, null, null, !0) : K(
      y._vnode || null,
      g,
      y,
      null,
      null,
      null,
      C
    ), y._vnode = g, St || (St = !0, tl(), Fc(), St = !1);
  }, wt = {
    p: K,
    um: Ie,
    m: st,
    r: ft,
    mt: We,
    mc: _e,
    pc: me,
    pbc: be,
    n: At,
    o: e
  };
  return {
    render: $t,
    hydrate: void 0,
    createApp: bh($t)
  };
}
function uo({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function fs({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Rh(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function tu(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (ye(s) && ye(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let a = r[i];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = r[i] = jn(r[i]), a.el = o.el), !n && a.patchFlag !== -2 && tu(o, a)), a.type === Ui && (a.el = o.el), a.type === Zn && !a.el && (a.el = o.el);
    }
}
function Ih(e) {
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
const Lh = Symbol.for("v-scx"), Oh = () => ni(Lh);
function Pt(e, t, n) {
  return su(e, t, n);
}
function su(e, t, n = tt) {
  const { immediate: s, deep: r, flush: i, once: o } = n, a = Lt({}, n), l = t && s || !t && i !== "post";
  let d;
  if (Ir) {
    if (i === "sync") {
      const U = Oh();
      d = U.__watcherHandles || (U.__watcherHandles = []);
    } else if (!l) {
      const U = () => {
      };
      return U.stop = yn, U.resume = yn, U.pause = yn, U;
    }
  }
  const c = Dt;
  a.call = (U, L, K) => wn(U, c, L, K);
  let v = !1;
  i === "post" ? a.scheduler = (U) => {
    Vt(U, c && c.suspense);
  } : i !== "sync" && (v = !0, a.scheduler = (U, L) => {
    L ? U() : la(U);
  }), a.augmentJob = (U) => {
    t && (U.flags |= 4), v && (U.flags |= 2, c && (U.id = c.uid, U.i = c));
  };
  const w = Gf(e, t, a);
  return Ir && (d ? d.push(w) : l && w()), w;
}
function Nh(e, t, n) {
  const s = this.proxy, r = pt(e) ? e.includes(".") ? ru(s, e) : () => s[e] : e.bind(s, s);
  let i;
  xe(t) ? i = t : (i = t.handler, n = t);
  const o = Nr(this), a = su(r, i.bind(s), n);
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
const Ph = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Yn(t)}Modifiers`] || e[`${Qn(t)}Modifiers`];
function Mh(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || tt;
  let r = n;
  const i = t.startsWith("update:"), o = i && Ph(s, t.slice(7));
  o && (o.trim && (r = n.map((c) => pt(c) ? c.trim() : c)), o.number && (r = n.map(Io)));
  let a, l = s[a = ro(t)] || // also try camelCase event handler (#2249)
  s[a = ro(Yn(t))];
  !l && i && (l = s[a = ro(Qn(t))]), l && wn(
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
    e.emitted[a] = !0, wn(
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
  if (!xe(e)) {
    const l = (d) => {
      const c = iu(d, t, !0);
      c && (a = !0, Lt(o, c));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !i && !a ? (lt(e) && s.set(e, null), null) : (ye(i) ? i.forEach((l) => o[l] = null) : Lt(o, i), lt(e) && s.set(e, o), o);
}
function Bi(e, t) {
  return !e || !Ii(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Ve(e, t[0].toLowerCase() + t.slice(1)) || Ve(e, Qn(t)) || Ve(e, t));
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
    setupState: U,
    ctx: L,
    inheritAttrs: K
  } = e, D = vi(e);
  let ie, fe;
  try {
    if (n.shapeFlag & 4) {
      const R = r || s, M = R;
      ie = _n(
        d.call(
          M,
          R,
          c,
          v,
          U,
          w,
          L
        )
      ), fe = a;
    } else {
      const R = t;
      ie = _n(
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
    xr.length = 0, Di(R, e, 1), ie = bn(Zn);
  }
  let pe = ie;
  if (fe && K !== !1) {
    const R = Object.keys(fe), { shapeFlag: M } = pe;
    R.length && M & 7 && (i && R.some(Jo) && (fe = Fh(
      fe,
      i
    )), pe = js(pe, fe, !1, !0));
  }
  return n.dirs && (pe = js(pe, null, !1, !0), pe.dirs = pe.dirs ? pe.dirs.concat(n.dirs) : n.dirs), n.transition && ca(pe, n.transition), ie = pe, vi(D), ie;
}
const Dh = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Ii(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Fh = (e, t) => {
  const n = {};
  for (const s in e)
    (!Jo(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function $h(e, t, n) {
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
        if (o[w] !== s[w] && !Bi(d, w))
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
    if (t[i] !== e[i] && !Bi(n, i))
      return !0;
  }
  return !1;
}
function Bh({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const ou = (e) => e.__isSuspense;
function Uh(e, t) {
  t && t.pendingBranch ? ye(e) ? t.effects.push(...e) : t.effects.push(e) : Zf(e);
}
const ze = Symbol.for("v-fgt"), Ui = Symbol.for("v-txt"), Zn = Symbol.for("v-cmt"), si = Symbol.for("v-stc"), xr = [];
let Gt = null;
function x(e = !1) {
  xr.push(Gt = e ? null : []);
}
function zh() {
  xr.pop(), Gt = xr[xr.length - 1] || null;
}
let Rr = 1;
function ul(e, t = !1) {
  Rr += e, e < 0 && Gt && t && (Gt.hasOnce = !0);
}
function au(e) {
  return e.dynamicChildren = Rr > 0 ? Gt || Fs : null, zh(), Rr > 0 && Gt && Gt.push(e), e;
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
function ki(e, t, n, s, r) {
  return au(
    bn(
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
function ir(e, t) {
  return e.type === t.type && e.key === t.key;
}
const cu = ({ key: e }) => e ?? null, ri = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? pt(e) || It(e) || xe(e) ? { i: sn, r: e, k: t, f: !!n } : e : null);
function b(e, t = null, n = null, s = 0, r = null, i = e === ze ? 0 : 1, o = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && cu(t),
    ref: t && ri(t),
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
    ctx: sn
  };
  return a ? (da(l, n), i & 128 && e.normalize(l)) : n && (l.shapeFlag |= pt(n) ? 8 : 16), Rr > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Gt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Gt.push(l), l;
}
const bn = Hh;
function Hh(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === fh) && (e = Zn), lu(e)) {
    const a = js(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && da(a, n), Rr > 0 && !i && Gt && (a.shapeFlag & 6 ? Gt[Gt.indexOf(e)] = a : Gt.push(a)), a.patchFlag = -2, a;
  }
  if (Qh(e) && (e = e.__vccOpts), t) {
    t = Wh(t);
    let { class: a, style: l } = t;
    a && !pt(a) && (t.class = Ue(a)), lt(l) && (aa(l) && !ye(l) && (l = Lt({}, l)), t.style = Ce(l));
  }
  const o = pt(e) ? 1 : ou(e) ? 128 : eh(e) ? 64 : lt(e) ? 4 : xe(e) ? 2 : 0;
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
  return e ? aa(e) || Yc(e) ? Lt({}, e) : e : null;
}
function js(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: a, transition: l } = e, d = t ? qh(r || {}, t) : r, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && cu(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? ye(i) ? i.concat(ri(t)) : [i, ri(t)] : ri(t)
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
    ssContent: e.ssContent && js(e.ssContent),
    ssFallback: e.ssFallback && js(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && s && ca(
    c,
    l.clone(c)
  ), c;
}
function An(e = " ", t = 0) {
  return bn(Ui, null, e, t);
}
function hs(e, t) {
  const n = bn(si, null, e);
  return n.staticCount = t, n;
}
function ae(e = "", t = !1) {
  return t ? (x(), ki(Zn, null, e)) : bn(Zn, null, e);
}
function _n(e) {
  return e == null || typeof e == "boolean" ? bn(Zn) : ye(e) ? bn(
    ze,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : lu(e) ? jn(e) : bn(Ui, null, String(e));
}
function jn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : js(e);
}
function da(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (ye(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), da(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Yc(t) ? t._ctx = sn : r === 3 && sn && (sn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else xe(t) ? (t = { default: t, _ctx: sn }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [An(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function qh(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Ue([t.class, s.class]));
      else if (r === "style")
        t.style = Ce([t.style, s.style]);
      else if (Ii(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(ye(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function dn(e, t, n, s = null) {
  wn(e, t, 7, [
    n,
    s
  ]);
}
const jh = Vc();
let Vh = 0;
function Kh(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || jh, i = {
    uid: Vh++,
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
    scope: new vf(
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Mh.bind(null, i), e.ce && e.ce(i), i;
}
let Dt = null;
const Gh = () => Dt || sn;
let Ti, Bo;
{
  const e = Ni(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  Ti = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Dt = n
  ), Bo = t(
    "__VUE_SSR_SETTERS__",
    (n) => Ir = n
  );
}
const Nr = (e) => {
  const t = Dt;
  return Ti(e), e.scope.on(), () => {
    e.scope.off(), Ti(t);
  };
}, fl = () => {
  Dt && Dt.scope.off(), Ti(null);
};
function uu(e) {
  return e.vnode.shapeFlag & 4;
}
let Ir = !1;
function Yh(e, t = !1, n = !1) {
  t && Bo(t);
  const { props: s, children: r } = e.vnode, i = uu(e);
  wh(e, s, i, t), Ah(e, r, n || t);
  const o = i ? Xh(e, t) : void 0;
  return t && Bo(!1), o;
}
function Xh(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, hh);
  const { setup: s } = n;
  if (s) {
    Ln();
    const r = e.setupContext = s.length > 1 ? Jh(e) : null, i = Nr(e), o = Lr(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), a = hc(o);
    if (On(), i(), (a || e.sp) && !kr(e) && Uc(e), a) {
      if (o.then(fl, fl), t)
        return o.then((l) => {
          hl(e, l);
        }).catch((l) => {
          Di(l, e, 0);
        });
      e.asyncDep = o;
    } else
      hl(e, o);
  } else
    fu(e);
}
function hl(e, t, n) {
  xe(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : lt(t) && (e.setupState = Pc(t)), fu(e);
}
function fu(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || yn);
  {
    const r = Nr(e);
    Ln();
    try {
      dh(e);
    } finally {
      On(), r();
    }
  }
}
const Zh = {
  get(e, t) {
    return Rt(e, "get", ""), e[t];
  }
};
function Jh(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Zh),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function zi(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Pc(zf(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Tr)
        return Tr[n](e);
    },
    has(t, n) {
      return n in t || n in Tr;
    }
  })) : e.proxy;
}
function Qh(e) {
  return xe(e) && "__vccOpts" in e;
}
const de = (e, t) => Vf(e, t, Ir), ed = "3.5.18";
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Uo;
const dl = typeof window < "u" && window.trustedTypes;
if (dl)
  try {
    Uo = /* @__PURE__ */ dl.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const hu = Uo ? (e) => Uo.createHTML(e) : (e) => e, td = "http://www.w3.org/2000/svg", nd = "http://www.w3.org/1998/Math/MathML", Sn = typeof document < "u" ? document : null, pl = Sn && /* @__PURE__ */ Sn.createElement("template"), sd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? Sn.createElementNS(td, e) : t === "mathml" ? Sn.createElementNS(nd, e) : n ? Sn.createElement(e, { is: n }) : Sn.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => Sn.createTextNode(e),
  createComment: (e) => Sn.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Sn.querySelector(e),
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
}, rd = Symbol("_vtc");
function id(e, t, n) {
  const s = e[rd];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const xi = Symbol("_vod"), du = Symbol("_vsh"), od = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[xi] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : or(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), or(e, !0), s.enter(e)) : s.leave(e, () => {
      or(e, !1);
    }) : or(e, t));
  },
  beforeUnmount(e, { value: t }) {
    or(e, t);
  }
};
function or(e, t) {
  e.style.display = t ? e[xi] : "none", e[du] = !t;
}
const ad = Symbol(""), ld = /(^|;)\s*display\s*:/;
function cd(e, t, n) {
  const s = e.style, r = pt(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (pt(t))
        for (const o of t.split(";")) {
          const a = o.slice(0, o.indexOf(":")).trim();
          n[a] == null && ii(s, a, "");
        }
      else
        for (const o in t)
          n[o] == null && ii(s, o, "");
    for (const o in n)
      o === "display" && (i = !0), ii(s, o, n[o]);
  } else if (r) {
    if (t !== n) {
      const o = s[ad];
      o && (n += ";" + o), s.cssText = n, i = ld.test(n);
    }
  } else t && e.removeAttribute("style");
  xi in e && (e[xi] = i ? s.display : "", e[du] && (s.display = "none"));
}
const ml = /\s*!important$/;
function ii(e, t, n) {
  if (ye(n))
    n.forEach((s) => ii(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = ud(e, t);
    ml.test(n) ? e.setProperty(
      Qn(s),
      n.replace(ml, ""),
      "important"
    ) : e[s] = n;
  }
}
const gl = ["Webkit", "Moz", "ms"], fo = {};
function ud(e, t) {
  const n = fo[t];
  if (n)
    return n;
  let s = Yn(t);
  if (s !== "filter" && s in e)
    return fo[t] = s;
  s = mc(s);
  for (let r = 0; r < gl.length; r++) {
    const i = gl[r] + s;
    if (i in e)
      return fo[t] = i;
  }
  return t;
}
const _l = "http://www.w3.org/1999/xlink";
function yl(e, t, n, s, r, i = bf(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(_l, t.slice(6, t.length)) : e.setAttributeNS(_l, t, n) : n == null || i && !gc(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : Jn(n) ? String(n) : n
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
function Ms(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function fd(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const vl = Symbol("_vei");
function hd(e, t, n, s, r = null) {
  const i = e[vl] || (e[vl] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [a, l] = dd(t);
    if (s) {
      const d = i[t] = gd(
        s,
        r
      );
      Ms(e, a, d, l);
    } else o && (fd(e, a, o, l), i[t] = void 0);
  }
}
const wl = /(?:Once|Passive|Capture)$/;
function dd(e) {
  let t;
  if (wl.test(e)) {
    t = {};
    let s;
    for (; s = e.match(wl); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Qn(e.slice(2)), t];
}
let ho = 0;
const pd = /* @__PURE__ */ Promise.resolve(), md = () => ho || (pd.then(() => ho = 0), ho = Date.now());
function gd(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    wn(
      _d(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = md(), n;
}
function _d(e, t) {
  if (ye(t)) {
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
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, yd = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? id(e, s, o) : t === "style" ? cd(e, n, s) : Ii(t) ? Jo(t) || hd(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : bd(e, t, s, o)) ? (bl(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && yl(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !pt(s)) ? bl(e, Yn(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), yl(e, t, s, o));
};
function bd(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && kl(t) && xe(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return kl(t) && pt(n) ? !1 : t in e;
}
const Tl = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return ye(t) ? (n) => ti(t, n) : t;
};
function vd(e) {
  e.target.composing = !0;
}
function xl(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const po = Symbol("_assign"), ds = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e[po] = Tl(r);
    const i = s || r.props && r.props.type === "number";
    Ms(e, t ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let a = e.value;
      n && (a = a.trim()), i && (a = Io(a)), e[po](a);
    }), n && Ms(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Ms(e, "compositionstart", vd), Ms(e, "compositionend", xl), Ms(e, "change", xl));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[po] = Tl(o), e.composing) return;
    const a = (i || e.type === "number") && !/^0\d/.test(e.value) ? Io(e.value) : e.value, l = t ?? "";
    a !== l && (document.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === l) || (e.value = l));
  }
}, wd = ["ctrl", "shift", "alt", "meta"], kd = {
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
  exact: (e, t) => wd.some((n) => e[`${n}Key`] && !t.includes(n))
}, gs = (e, t) => {
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const a = kd[t[o]];
      if (a && a(r, t)) return;
    }
    return e(r, ...i);
  });
}, Td = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, oi = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = (r) => {
    if (!("key" in r))
      return;
    const i = Qn(r.key);
    if (t.some(
      (o) => o === i || Td[o] === i
    ))
      return e(r);
  });
}, xd = /* @__PURE__ */ Lt({ patchProp: yd }, sd);
let Al;
function Ad() {
  return Al || (Al = Eh(xd));
}
const Sd = (...e) => {
  const t = Ad().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = Cd(s);
    if (!r) return;
    const i = t._component;
    !xe(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, Ed(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
};
function Ed(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Cd(e) {
  return pt(e) ? document.querySelector(e) : e;
}
const Hs = (e) => {
  const t = e.replace("#", ""), n = parseInt(t.substr(0, 2), 16), s = parseInt(t.substr(2, 2), 16), r = parseInt(t.substr(4, 2), 16);
  return (n * 299 + s * 587 + r * 114) / 1e3 < 128;
}, Rd = (e, t) => {
  const n = e.replace("#", ""), s = parseInt(n.substr(0, 2), 16), r = parseInt(n.substr(2, 2), 16), i = parseInt(n.substr(4, 2), 16), o = Hs(e), a = o ? Math.min(255, s + t) : Math.max(0, s - t), l = o ? Math.min(255, r + t) : Math.max(0, r - t), d = o ? Math.min(255, i + t) : Math.max(0, i - t);
  return `#${a.toString(16).padStart(2, "0")}${l.toString(16).padStart(2, "0")}${d.toString(16).padStart(2, "0")}`;
}, ar = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e), Id = (e) => {
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
function pa() {
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
var ws = pa();
function pu(e) {
  ws = e;
}
var Ar = { exec: () => null };
function Ke(e, t = "") {
  let n = typeof e == "string" ? e : e.source;
  const s = {
    replace: (r, i) => {
      let o = typeof i == "string" ? i : i.source;
      return o = o.replace(Ft.caret, "$1"), n = n.replace(r, o), s;
    },
    getRegex: () => new RegExp(n, t)
  };
  return s;
}
var Ft = {
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
}, Ld = /^(?:[ \t]*(?:\n|$))+/, Od = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Nd = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Pr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Pd = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ma = /(?:[*+-]|\d{1,9}[.)])/, mu = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, gu = Ke(mu).replace(/bull/g, ma).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Md = Ke(mu).replace(/bull/g, ma).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ga = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Dd = /^[^\n]+/, _a = /(?!\s*\])(?:\\.|[^\[\]\\])+/, Fd = Ke(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", _a).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), $d = Ke(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ma).getRegex(), Hi = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ya = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Bd = Ke(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", ya).replace("tag", Hi).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), _u = Ke(ga).replace("hr", Pr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Hi).getRegex(), Ud = Ke(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", _u).getRegex(), ba = {
  blockquote: Ud,
  code: Od,
  def: Fd,
  fences: Nd,
  heading: Pd,
  hr: Pr,
  html: Bd,
  lheading: gu,
  list: $d,
  newline: Ld,
  paragraph: _u,
  table: Ar,
  text: Dd
}, Sl = Ke(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", Pr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Hi).getRegex(), zd = {
  ...ba,
  lheading: Md,
  table: Sl,
  paragraph: Ke(ga).replace("hr", Pr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Sl).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Hi).getRegex()
}, Hd = {
  ...ba,
  html: Ke(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", ya).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Ar,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: Ke(ga).replace("hr", Pr).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", gu).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Wd = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, qd = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, yu = /^( {2,}|\\)\n(?!\s*$)/, jd = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Wi = /[\p{P}\p{S}]/u, va = /[\s\p{P}\p{S}]/u, bu = /[^\s\p{P}\p{S}]/u, Vd = Ke(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, va).getRegex(), vu = /(?!~)[\p{P}\p{S}]/u, Kd = /(?!~)[\s\p{P}\p{S}]/u, Gd = /(?:[^\s\p{P}\p{S}]|~)/u, Yd = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, wu = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Xd = Ke(wu, "u").replace(/punct/g, Wi).getRegex(), Zd = Ke(wu, "u").replace(/punct/g, vu).getRegex(), ku = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Jd = Ke(ku, "gu").replace(/notPunctSpace/g, bu).replace(/punctSpace/g, va).replace(/punct/g, Wi).getRegex(), Qd = Ke(ku, "gu").replace(/notPunctSpace/g, Gd).replace(/punctSpace/g, Kd).replace(/punct/g, vu).getRegex(), ep = Ke(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, bu).replace(/punctSpace/g, va).replace(/punct/g, Wi).getRegex(), tp = Ke(/\\(punct)/, "gu").replace(/punct/g, Wi).getRegex(), np = Ke(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), sp = Ke(ya).replace("(?:-->|$)", "-->").getRegex(), rp = Ke(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", sp).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Ai = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, ip = Ke(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Ai).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Tu = Ke(/^!?\[(label)\]\[(ref)\]/).replace("label", Ai).replace("ref", _a).getRegex(), xu = Ke(/^!?\[(ref)\](?:\[\])?/).replace("ref", _a).getRegex(), op = Ke("reflink|nolink(?!\\()", "g").replace("reflink", Tu).replace("nolink", xu).getRegex(), wa = {
  _backpedal: Ar,
  // only used for GFM url
  anyPunctuation: tp,
  autolink: np,
  blockSkip: Yd,
  br: yu,
  code: qd,
  del: Ar,
  emStrongLDelim: Xd,
  emStrongRDelimAst: Jd,
  emStrongRDelimUnd: ep,
  escape: Wd,
  link: ip,
  nolink: xu,
  punctuation: Vd,
  reflink: Tu,
  reflinkSearch: op,
  tag: rp,
  text: jd,
  url: Ar
}, ap = {
  ...wa,
  link: Ke(/^!?\[(label)\]\((.*?)\)/).replace("label", Ai).getRegex(),
  reflink: Ke(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Ai).getRegex()
}, zo = {
  ...wa,
  emStrongRDelimAst: Qd,
  emStrongLDelim: Zd,
  url: Ke(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, lp = {
  ...zo,
  br: Ke(yu).replace("{2,}", "*").getRegex(),
  text: Ke(zo.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Zr = {
  normal: ba,
  gfm: zd,
  pedantic: Hd
}, lr = {
  normal: wa,
  gfm: zo,
  breaks: lp,
  pedantic: ap
}, cp = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, El = (e) => cp[e];
function mn(e, t) {
  if (t) {
    if (Ft.escapeTest.test(e))
      return e.replace(Ft.escapeReplace, El);
  } else if (Ft.escapeTestNoEncode.test(e))
    return e.replace(Ft.escapeReplaceNoEncode, El);
  return e;
}
function Cl(e) {
  try {
    e = encodeURI(e).replace(Ft.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function Rl(e, t) {
  var i;
  const n = e.replace(Ft.findPipe, (o, a, l) => {
    let d = !1, c = a;
    for (; --c >= 0 && l[c] === "\\"; ) d = !d;
    return d ? "|" : " |";
  }), s = n.split(Ft.splitPipe);
  let r = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((i = s.at(-1)) != null && i.trim()) && s.pop(), t)
    if (s.length > t)
      s.splice(t);
    else
      for (; s.length < t; ) s.push("");
  for (; r < s.length; r++)
    s[r] = s[r].trim().replace(Ft.slashPipe, "|");
  return s;
}
function cr(e, t, n) {
  const s = e.length;
  if (s === 0)
    return "";
  let r = 0;
  for (; r < s && e.charAt(s - r - 1) === t; )
    r++;
  return e.slice(0, s - r);
}
function up(e, t) {
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
function fp(e, t, n) {
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
var Si = class {
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
        text: this.options.pedantic ? n : cr(n, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const n = t[0], s = fp(n, t[3] || "", this.rules);
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
        const s = cr(n, "#");
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
        raw: cr(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = cr(t[0], `
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
          const U = w, L = U.raw + `
` + n.join(`
`), K = this.blockquote(L);
          i[i.length - 1] = K, s = s.substring(0, s.length - U.raw.length) + K.raw, r = r.substring(0, r.length - U.text.length) + K.text;
          break;
        } else if ((w == null ? void 0 : w.type) === "list") {
          const U = w, L = U.raw + `
` + n.join(`
`), K = this.list(L);
          i[i.length - 1] = K, s = s.substring(0, s.length - w.raw.length) + K.raw, r = r.substring(0, r.length - U.raw.length) + K.raw, n = L.substring(i.at(-1).raw.length).split(`
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
`, 1)[0].replace(this.rules.other.listReplaceTabs, (ie) => " ".repeat(3 * ie.length)), w = e.split(`
`, 1)[0], U = !v.trim(), L = 0;
        if (this.options.pedantic ? (L = 2, c = v.trimStart()) : U ? L = t[1].length + 1 : (L = t[2].search(this.rules.other.nonSpaceChar), L = L > 4 ? 1 : L, c = v.slice(L), L += t[1].length), U && this.rules.other.blankLine.test(w) && (d += w + `
`, e = e.substring(w.length + 1), l = !0), !l) {
          const ie = this.rules.other.nextBulletRegex(L), fe = this.rules.other.hrRegex(L), pe = this.rules.other.fencesBeginRegex(L), R = this.rules.other.headingBeginRegex(L), M = this.rules.other.htmlBeginRegex(L);
          for (; e; ) {
            const Y = e.split(`
`, 1)[0];
            let X;
            if (w = Y, this.options.pedantic ? (w = w.replace(this.rules.other.listReplaceNesting, "  "), X = w) : X = w.replace(this.rules.other.tabCharGlobal, "    "), pe.test(w) || R.test(w) || M.test(w) || ie.test(w) || fe.test(w))
              break;
            if (X.search(this.rules.other.nonSpaceChar) >= L || !w.trim())
              c += `
` + X.slice(L);
            else {
              if (U || v.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || pe.test(v) || R.test(v) || fe.test(v))
                break;
              c += `
` + w;
            }
            !U && !w.trim() && (U = !0), d += Y + `
`, e = e.substring(Y.length + 1), v = X.slice(L);
          }
        }
        r.loose || (o ? r.loose = !0 : this.rules.other.doubleBlankLine.test(d) && (o = !0));
        let K = null, D;
        this.options.gfm && (K = this.rules.other.listIsTask.exec(c), K && (D = K[0] !== "[ ] ", c = c.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: d,
          task: !!K,
          checked: D,
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
        const i = cr(n.slice(0, -1), "\\");
        if ((n.length - i.length) % 2 === 0)
          return;
      } else {
        const i = up(t[2], "()");
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
          const L = w.slice(1, -1);
          return {
            type: "em",
            raw: w,
            text: L,
            tokens: this.lexer.inlineTokens(L)
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
}, Rn = class Ho {
  constructor(t) {
    et(this, "tokens");
    et(this, "options");
    et(this, "state");
    et(this, "tokenizer");
    et(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || ws, this.options.tokenizer = this.options.tokenizer || new Si(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      other: Ft,
      block: Zr.normal,
      inline: lr.normal
    };
    this.options.pedantic ? (n.block = Zr.pedantic, n.inline = lr.pedantic) : this.options.gfm && (n.block = Zr.gfm, this.options.breaks ? n.inline = lr.breaks : n.inline = lr.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: Zr,
      inline: lr
    };
  }
  /**
   * Static Lex Method
   */
  static lex(t, n) {
    return new Ho(n).lex(t);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(t, n) {
    return new Ho(n).inlineTokens(t);
  }
  /**
   * Preprocessing
   */
  lex(t) {
    t = t.replace(Ft.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const s = this.inlineQueue[n];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, n = [], s = !1) {
    var r, i, o;
    for (this.options.pedantic && (t = t.replace(Ft.tabCharGlobal, "    ").replace(Ft.spaceLine, "")); t; ) {
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
        const U = t.slice(1);
        let L;
        this.options.extensions.startInline.forEach((K) => {
          L = K.call({ lexer: this }, U), typeof L == "number" && L >= 0 && (w = Math.min(w, L));
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
}, Ei = class {
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
    const s = (i = (t || "").match(Ft.notSpaceStart)) == null ? void 0 : i[0], r = e.replace(Ft.endingNewline, "") + `
`;
    return s ? '<pre><code class="language-' + mn(s) + '">' + (n ? r : mn(r, !0)) + `</code></pre>
` : "<pre><code>" + (n ? r : mn(r, !0)) + `</code></pre>
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
      e.loose ? ((n = e.tokens[0]) == null ? void 0 : n.type) === "paragraph" ? (e.tokens[0].text = s + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = s + " " + mn(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
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
    return `<code>${mn(e, !0)}</code>`;
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
    return t && (i += ' title="' + mn(t) + '"'), i += ">" + s + "</a>", i;
  }
  image({ href: e, title: t, text: n, tokens: s }) {
    s && (n = this.parser.parseInline(s, this.parser.textRenderer));
    const r = Cl(e);
    if (r === null)
      return mn(n);
    e = r;
    let i = `<img src="${e}" alt="${n}"`;
    return t && (i += ` title="${mn(t)}"`), i += ">", i;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : mn(e.text);
  }
}, ka = class {
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
}, In = class Wo {
  constructor(t) {
    et(this, "options");
    et(this, "renderer");
    et(this, "textRenderer");
    this.options = t || ws, this.options.renderer = this.options.renderer || new Ei(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new ka();
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
}, Co, ai = (Co = class {
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
    return this.block ? Rn.lex : Rn.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? In.parse : In.parseInline;
  }
}, et(Co, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
])), Co), hp = class {
  constructor(...e) {
    et(this, "defaults", pa());
    et(this, "options", this.setOptions);
    et(this, "parse", this.parseMarkdown(!0));
    et(this, "parseInline", this.parseMarkdown(!1));
    et(this, "Parser", In);
    et(this, "Renderer", Ei);
    et(this, "TextRenderer", ka);
    et(this, "Lexer", Rn);
    et(this, "Tokenizer", Si);
    et(this, "Hooks", ai);
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
        const r = this.defaults.renderer || new Ei(this.defaults);
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
        const r = this.defaults.tokenizer || new Si(this.defaults);
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
        const r = this.defaults.hooks || new ai();
        for (const i in n.hooks) {
          if (!(i in r))
            throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i))
            continue;
          const o = i, a = n.hooks[o], l = r[o];
          ai.passThroughHooks.has(i) ? r[o] = (d) => {
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
    return Rn.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return In.parse(e, t ?? this.defaults);
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
      const a = i.hooks ? i.hooks.provideLexer() : e ? Rn.lex : Rn.lexInline, l = i.hooks ? i.hooks.provideParser() : e ? In.parse : In.parseInline;
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
        const s = "<p>An error occurred:</p><pre>" + mn(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(s) : s;
      }
      if (t)
        return Promise.reject(n);
      throw n;
    };
  }
}, vs = new hp();
function He(e, t) {
  return vs.parse(e, t);
}
He.options = He.setOptions = function(e) {
  return vs.setOptions(e), He.defaults = vs.defaults, pu(He.defaults), He;
};
He.getDefaults = pa;
He.defaults = ws;
He.use = function(...e) {
  return vs.use(...e), He.defaults = vs.defaults, pu(He.defaults), He;
};
He.walkTokens = function(e, t) {
  return vs.walkTokens(e, t);
};
He.parseInline = vs.parseInline;
He.Parser = In;
He.parser = In.parse;
He.Renderer = Ei;
He.TextRenderer = ka;
He.Lexer = Rn;
He.lexer = Rn.lex;
He.Tokenizer = Si;
He.Hooks = ai;
He.parse = He;
He.options;
He.setOptions;
He.use;
He.walkTokens;
He.parseInline;
In.parse;
Rn.lex;
/*! @license DOMPurify 3.4.15 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.15/LICENSE */
function Ll(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, s = Array(t); n < t; n++) s[n] = e[n];
  return s;
}
function dp(e) {
  if (Array.isArray(e)) return e;
}
function pp(e, t) {
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
function mp() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function gp(e, t) {
  return dp(e) || pp(e, t) || _p(e, t) || mp();
}
function _p(e, t) {
  if (e) {
    if (typeof e == "string") return Ll(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ll(e, t) : void 0;
  }
}
const Au = Object.entries, Ol = Object.setPrototypeOf, yp = Object.isFrozen, bp = Object.getPrototypeOf, vp = Object.getOwnPropertyDescriptor;
let yt = Object.freeze, vt = Object.seal, Ds = Object.create, Su = typeof Reflect < "u" && Reflect, qo = Su.apply, jo = Su.construct;
yt || (yt = function(t) {
  return t;
});
vt || (vt = function(t) {
  return t;
});
qo || (qo = function(t, n) {
  for (var s = arguments.length, r = new Array(s > 2 ? s - 2 : 0), i = 2; i < s; i++)
    r[i - 2] = arguments[i];
  return t.apply(n, r);
});
jo || (jo = function(t) {
  for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
    s[r - 1] = arguments[r];
  return new t(...s);
});
const _s = mt(Array.prototype.forEach), wp = mt(Array.prototype.lastIndexOf), Nl = mt(Array.prototype.pop), ur = mt(Array.prototype.push), kp = mt(Array.prototype.splice), Ws = Array.isArray, mr = mt(String.prototype.toLowerCase), mo = mt(String.prototype.toString), Pl = mt(String.prototype.match), fr = mt(String.prototype.replace), Ml = mt(String.prototype.indexOf), Tp = mt(String.prototype.trim), xp = mt(Number.prototype.toString), Ap = mt(Boolean.prototype.toString), Dl = typeof BigInt > "u" ? null : mt(BigInt.prototype.toString), Fl = typeof Symbol > "u" ? null : mt(Symbol.prototype.toString), Ht = mt(Object.prototype.hasOwnProperty), hr = mt(Object.prototype.toString), Ct = mt(RegExp.prototype.test), ps = Sp(TypeError);
function mt(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
      s[r - 1] = arguments[r];
    return qo(e, t, s);
  };
}
function Sp(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return jo(e, n);
  };
}
function Fe(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : mr;
  if (Ol && Ol(e, null), !Ws(t))
    return e;
  let s = t.length;
  for (; s--; ) {
    let r = t[s];
    if (typeof r == "string") {
      const i = n(r);
      i !== r && (yp(t) || (t[s] = i), r = i);
    }
    e[r] = !0;
  }
  return e;
}
function Ep(e) {
  for (let t = 0; t < e.length; t++)
    Ht(e, t) || (e[t] = null);
  return e;
}
function Kt(e) {
  const t = Ds(null);
  for (const s of Au(e)) {
    var n = gp(s, 2);
    const r = n[0], i = n[1];
    Ht(e, r) && (Ws(i) ? t[r] = Ep(i) : i && typeof i == "object" && i.constructor === Object ? t[r] = Kt(i) : t[r] = i);
  }
  return t;
}
function Cp(e) {
  switch (typeof e) {
    case "string":
      return e;
    case "number":
      return xp(e);
    case "boolean":
      return Ap(e);
    case "bigint":
      return Dl ? Dl(e) : "0";
    case "symbol":
      return Fl ? Fl(e) : "Symbol()";
    case "undefined":
      return hr(e);
    case "function":
    case "object": {
      if (e === null)
        return hr(e);
      const t = e, n = en(t, "toString");
      if (typeof n == "function") {
        const s = n(t);
        return typeof s == "string" ? s : hr(s);
      }
      return hr(e);
    }
    default:
      return hr(e);
  }
}
function en(e, t) {
  for (; e !== null; ) {
    const s = vp(e, t);
    if (s) {
      if (s.get)
        return mt(s.get);
      if (typeof s.value == "function")
        return mt(s.value);
    }
    e = bp(e);
  }
  function n() {
    return null;
  }
  return n;
}
function Rp(e) {
  try {
    return Ct(e, ""), !0;
  } catch {
    return !1;
  }
}
const $l = yt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), go = yt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), _o = yt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Ip = yt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), yo = yt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Lp = yt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Bl = yt(["#text"]), Ul = yt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), bo = yt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dominant-baseline", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "pointer-events", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-orientation", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "vector-effect", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), zl = yt(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Jr = yt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Op = vt(/{{[\w\W]*|^[\w\W]*}}/g), Np = vt(/<%[\w\W]*|^[\w\W]*%>/g), Pp = vt(/\${[\w\W]*/g), Mp = vt(/^data-[\-\w.\u00B7-\uFFFF]+$/), Dp = vt(/^aria-[\-\w]+$/), Hl = vt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Fp = vt(/^(?:\w+script|data):/i), $p = vt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Bp = vt(/^html$/i), Up = vt(/^[a-z][.\w]*(-[.\w]+)+$/i), Wl = vt(/<[/\w!]/g), ql = vt(/<[/\w]/g), zp = vt(/<\/no(script|embed|frames)/i), Hp = vt(/\/>/i), jt = {
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
}, Eu = ["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"], Wp = yt(Fe({}, Eu)), qp = function() {
  const e = {};
  return _s(Eu, (t) => {
    e[t] = vt(new RegExp("</" + t + "(?=[\\t\\n\\f\\r />])", "i"));
  }), yt(e);
}(), jp = function() {
  return typeof window > "u" ? null : window;
}, Vp = function(t, n) {
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
}, Wn = function(t, n, s, r) {
  return Ht(t, n) && Ws(t[n]) ? Fe(r.base ? Kt(r.base) : {}, t[n], r.transform) : s;
}, vo = function(t, n, s) {
  const r = Ht(t, n) ? t[n] : void 0;
  return r && typeof r == "object" ? Kt(r) : s();
};
function Cu() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : jp();
  const t = (V) => Cu(V);
  if (t.version = "3.4.15", t.removed = [], !e || !e.document || e.document.nodeType !== jt.document || !e.Element)
    return t.isSupported = !1, t;
  let n = e.document;
  const s = n, r = s.currentScript;
  e.DocumentFragment;
  const i = e.HTMLTemplateElement, o = e.Node, a = e.Element, l = e.NodeFilter, d = e.NamedNodeMap;
  d === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
  const c = e.DOMParser, v = e.trustedTypes, w = a.prototype, U = en(w, "cloneNode"), L = en(w, "remove"), K = en(w, "removeAttributeNode"), D = en(w, "nextSibling"), ie = en(w, "childNodes"), fe = en(w, "parentNode"), pe = en(w, "shadowRoot"), R = en(w, "attributes"), M = o && o.prototype ? en(o.prototype, "nodeType") : null, Y = o && o.prototype ? en(o.prototype, "nodeName") : null, X = o && o.prototype ? en(o.prototype, "ownerDocument") : null, _e = function(p) {
    return M ? M(p) : p.nodeType;
  }, Re = function(p) {
    return Y ? Y(p) : p.nodeName;
  };
  if (typeof i == "function") {
    const V = n.createElement("template");
    V.content && V.content.ownerDocument && (n = V.content.ownerDocument);
  }
  let be, Be = "", ve, Je = !1, We = 0;
  const nt = function() {
    if (We > 0)
      throw ps('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, he = function(p) {
    nt(), We++;
    try {
      return be.createHTML(p);
    } finally {
      We--;
    }
  }, we = function(p) {
    nt(), We++;
    try {
      return be.createScriptURL(p);
    } finally {
      We--;
    }
  }, me = function() {
    return Je || (ve = Vp(v, r), Je = !0), ve;
  }, Ge = n, Ae = Ge.implementation, st = Ge.createNodeIterator, Ie = Ge.createDocumentFragment, ft = Ge.getElementsByTagName, Wt = s.importNode;
  let Ee = jl();
  t.isSupported = typeof Au == "function" && typeof fe == "function" && Ae && Ae.createHTMLDocument !== void 0;
  const gt = Op, At = Np, St = Pp, $t = Mp, wt = Dp, Tn = Fp, g = $p, y = Up;
  let C = Hl, N = null;
  const $ = Fe({}, [...$l, ...go, ..._o, ...yo, ...Bl]);
  let P = null;
  const G = Fe({}, [...Ul, ...bo, ...zl, ...Jr]);
  let W = Object.seal(Ds(null, {
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
  })), z = null, H = null;
  const ee = Object.seal(Ds(null, {
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
  let T = !0, I = !0, j = !1, J = !0, ue = !1, re = !0, Ne = !1, Te = !1, Qe = null, h = null, _ = !1, O = !1, A = !1, q = !1, Z = !0, oe = !1;
  const Le = "user-content-";
  let ke = !0, Ye = !1, Pe = {}, rt = null;
  const Et = Fe({}, [
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
  let Bt = null;
  const es = Fe({}, ["audio", "video", "img", "source", "image", "track"]);
  let Gs = null;
  const Ys = Fe({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), ts = "http://www.w3.org/1998/Math/MathML", ns = "http://www.w3.org/2000/svg", qt = "http://www.w3.org/1999/xhtml";
  let Pn = qt, ss = !1, Mn = null;
  const Mr = Fe({}, [ts, ns, qt], mo), Xs = yt(["mi", "mo", "mn", "ms", "mtext"]);
  let un = Fe({}, Xs);
  const Dn = yt(["annotation-xml"]);
  let rs = Fe({}, Dn);
  const Zs = Fe({}, ["title", "style", "font", "a", "script"]);
  let Ut = null;
  const Dr = ["application/xhtml+xml", "text/html"], ks = "text/html";
  let ot = null, Yt = null;
  const Vi = n.createElement("form"), is = function(p) {
    return p instanceof RegExp || p instanceof Function;
  }, Ts = function() {
    let p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (Yt && Yt === p)
      return;
    (!p || typeof p != "object") && (p = {}), p = Kt(p), Ut = // eslint-disable-next-line unicorn/prefer-includes
    Dr.indexOf(p.PARSER_MEDIA_TYPE) === -1 ? ks : p.PARSER_MEDIA_TYPE, ot = Ut === "application/xhtml+xml" ? mo : mr, N = Wn(p, "ALLOWED_TAGS", $, {
      transform: ot
    }), P = Wn(p, "ALLOWED_ATTR", G, {
      transform: ot
    }), Mn = Wn(p, "ALLOWED_NAMESPACES", Mr, {
      transform: mo
    }), Gs = Wn(p, "ADD_URI_SAFE_ATTR", Ys, {
      transform: ot,
      base: Ys
    }), Bt = Wn(p, "ADD_DATA_URI_TAGS", es, {
      transform: ot,
      base: es
    }), rt = Wn(p, "FORBID_CONTENTS", Et, {
      transform: ot
    }), z = Wn(p, "FORBID_TAGS", Kt({}), {
      transform: ot
    }), H = Wn(p, "FORBID_ATTR", Kt({}), {
      transform: ot
    }), Pe = Ht(p, "USE_PROFILES") ? p.USE_PROFILES && typeof p.USE_PROFILES == "object" ? Kt(p.USE_PROFILES) : p.USE_PROFILES : !1, T = p.ALLOW_ARIA_ATTR !== !1, I = p.ALLOW_DATA_ATTR !== !1, j = p.ALLOW_UNKNOWN_PROTOCOLS || !1, J = p.ALLOW_SELF_CLOSE_IN_ATTR !== !1, ue = p.SAFE_FOR_TEMPLATES || !1, re = p.SAFE_FOR_XML !== !1, Ne = p.WHOLE_DOCUMENT || !1, O = p.RETURN_DOM || !1, A = p.RETURN_DOM_FRAGMENT || !1, q = p.RETURN_TRUSTED_TYPE || !1, _ = p.FORCE_BODY || !1, Z = p.SANITIZE_DOM !== !1, oe = p.SANITIZE_NAMED_PROPS || !1, ke = p.KEEP_CONTENT !== !1, Ye = p.IN_PLACE || !1, C = Rp(p.ALLOWED_URI_REGEXP) ? p.ALLOWED_URI_REGEXP : Hl, Pn = typeof p.NAMESPACE == "string" ? p.NAMESPACE : qt, un = vo(
      p,
      "MATHML_TEXT_INTEGRATION_POINTS",
      () => Fe({}, Xs)
      // Default built-in map
    ), rs = vo(
      p,
      "HTML_INTEGRATION_POINTS",
      () => Fe({}, Dn)
      // Default built-in map
    );
    const k = vo(p, "CUSTOM_ELEMENT_HANDLING", () => Ds(null));
    if (W = Ds(null), Ht(k, "tagNameCheck") && is(k.tagNameCheck) && (W.tagNameCheck = k.tagNameCheck), Ht(k, "attributeNameCheck") && is(k.attributeNameCheck) && (W.attributeNameCheck = k.attributeNameCheck), Ht(k, "allowCustomizedBuiltInElements") && typeof k.allowCustomizedBuiltInElements == "boolean" && (W.allowCustomizedBuiltInElements = k.allowCustomizedBuiltInElements), vt(W), ue && (I = !1), A && (O = !0), Pe && (N = Fe({}, Bl), P = Ds(null), Pe.html === !0 && (Fe(N, $l), Fe(P, Ul)), Pe.svg === !0 && (Fe(N, go), Fe(P, bo), Fe(P, Jr)), Pe.svgFilters === !0 && (Fe(N, _o), Fe(P, bo), Fe(P, Jr)), Pe.mathMl === !0 && (Fe(N, yo), Fe(P, zl), Fe(P, Jr))), ee.tagCheck = null, ee.attributeCheck = null, Ht(p, "ADD_TAGS") && (typeof p.ADD_TAGS == "function" ? ee.tagCheck = p.ADD_TAGS : Ws(p.ADD_TAGS) && (N === $ && (N = Kt(N)), Fe(N, p.ADD_TAGS, ot))), Ht(p, "ADD_ATTR") && (typeof p.ADD_ATTR == "function" ? ee.attributeCheck = p.ADD_ATTR : Ws(p.ADD_ATTR) && (P === G && (P = Kt(P)), Fe(P, p.ADD_ATTR, ot))), Ht(p, "ADD_FORBID_CONTENTS") && Ws(p.ADD_FORBID_CONTENTS) && (rt === Et && (rt = Kt(rt)), Fe(rt, p.ADD_FORBID_CONTENTS, ot)), ke && (N["#text"] = !0), Ne && Fe(N, ["html", "head", "body"]), N.table && (Fe(N, ["tbody"]), delete z.tbody), p.TRUSTED_TYPES_POLICY) {
      if (typeof p.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw ps('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof p.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw ps('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const B = be;
      be = p.TRUSTED_TYPES_POLICY;
      try {
        Be = he("");
      } catch (Q) {
        throw be = B, Q;
      }
    } else p.TRUSTED_TYPES_POLICY === null ? (be = void 0, Be = "") : (be === void 0 && (be = me()), be && typeof Be == "string" && (Be = he("")));
    yt && yt(p), Yt = p;
  }, Fr = Fe({}, [...go, ..._o, ...Ip]), Js = Fe({}, [...yo, ...Lp]), xs = function(p, k, B) {
    return k.namespaceURI === qt ? p === "svg" : k.namespaceURI === ts ? p === "svg" && (B === "annotation-xml" || un[B]) : !!Fr[p];
  }, Qs = function(p, k, B) {
    return k.namespaceURI === qt ? p === "math" : k.namespaceURI === ns ? p === "math" && rs[B] : !!Js[p];
  }, Xt = function(p, k, B) {
    return k.namespaceURI === ns && !rs[B] || k.namespaceURI === ts && !un[B] ? !1 : !Js[p] && (Zs[p] || !Fr[p]);
  }, Zt = function(p) {
    let k = fe(p);
    (!k || !k.tagName) && (k = {
      namespaceURI: Pn,
      tagName: "template"
    });
    const B = mr(p.tagName), Q = mr(k.tagName);
    return Mn[p.namespaceURI] ? p.namespaceURI === ns ? xs(B, k, Q) : p.namespaceURI === ts ? Qs(B, k, Q) : p.namespaceURI === qt ? Xt(B, k, Q) : !!(Ut === "application/xhtml+xml" && Mn[p.namespaceURI]) : !1;
  }, Xe = function(p) {
    ur(t.removed, {
      element: p
    });
    try {
      fe(p).removeChild(p);
    } catch {
      if (L(p), !fe(p))
        throw ps("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, ht = function(p, k, B) {
    try {
      K(p, k);
    } catch {
      try {
        p.removeAttribute(B);
      } catch {
      }
    }
  }, at = function(p) {
    as(p);
    const k = ie(p);
    if (k) {
      const Q = [];
      _s(k, (ne) => {
        ur(Q, ne);
      }), _s(Q, (ne) => {
        try {
          L(ne);
        } catch {
        }
      });
    }
    const B = R(p);
    if (B)
      for (let Q = B.length - 1; Q >= 0; --Q) {
        const ne = B[Q], le = ne && ne.name;
        typeof le == "string" && ht(p, ne, le);
      }
  }, Ot = function(p, k, B) {
    if (!B)
      try {
        B = k.getAttributeNode(p);
      } catch {
        B = null;
      }
    ur(t.removed, {
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
      if (O || A)
        try {
          Xe(k);
        } catch {
        }
      else
        try {
          k.setAttribute(p, "");
        } catch {
        }
  }, os = function(p) {
    const k = R(p);
    if (k)
      for (let B = k.length - 1; B >= 0; --B) {
        const Q = k[B], ne = Q && Q.name;
        typeof ne != "string" || P[ot(ne)] || ht(p, Q, ne);
      }
  }, as = function(p) {
    const k = [p];
    for (; k.length > 0; ) {
      const B = k.pop();
      _e(B) === jt.element && os(B);
      const ne = ie(B);
      if (ne)
        for (let le = ne.length - 1; le >= 0; --le)
          k.push(ne[le]);
    }
  }, fn = function(p, k) {
    return re ? p === "patchsrc" ? !0 : p === "for" && k !== "label" && k !== "output" : !1;
  }, kt = function(p) {
    if (!re)
      return;
    const k = [p];
    for (; k.length > 0; ) {
      const B = k.pop(), Q = _e(B);
      if (Q === jt.processingInstruction || Q === jt.comment && Ct(ql, B.data)) {
        try {
          L(B);
        } catch {
        }
        continue;
      }
      if (Q === jt.element) {
        const le = B, Me = ot(Re(B));
        try {
          le.hasAttribute && le.hasAttribute("patchsrc") && le.removeAttribute("patchsrc"), le.hasAttribute && le.hasAttribute("for") && fn("for", Me) && le.removeAttribute("for");
        } catch {
        }
      }
      const ne = ie(B);
      if (ne)
        for (let le = ne.length - 1; le >= 0; --le)
          k.push(ne[le]);
    }
  }, Fn = function(p) {
    let k = null, B = null;
    if (_)
      p = "<remove></remove>" + p;
    else {
      const le = Pl(p, /^[\r\n\t ]+/);
      B = le && le[0];
    }
    Ut === "application/xhtml+xml" && Pn === qt && (p = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + p + "</body></html>");
    const Q = be ? he(p) : p;
    if (Pn === qt)
      try {
        k = new c().parseFromString(Q, Ut);
      } catch {
      }
    if (!k || !k.documentElement) {
      k = Ae.createDocument(Pn, "template", null);
      try {
        k.documentElement.innerHTML = ss ? Be : Q;
      } catch {
      }
    }
    const ne = k.body || k.documentElement;
    return p && B && ne.insertBefore(n.createTextNode(B), ne.childNodes[0] || null), Pn === qt ? ft.call(k, Ne ? "html" : "body")[0] : Ne ? k.documentElement : ne;
  }, hn = function(p) {
    const k = X ? X(p) : p.ownerDocument;
    return st.call(
      k || p,
      p,
      // eslint-disable-next-line no-bitwise
      l.SHOW_ELEMENT | l.SHOW_COMMENT | l.SHOW_TEXT | l.SHOW_PROCESSING_INSTRUCTION | l.SHOW_CDATA_SECTION,
      null
    );
  }, As = function(p) {
    return p = fr(p, gt, " "), p = fr(p, At, " "), p = fr(p, St, " "), p;
  }, er = function(p) {
    var k;
    p.normalize();
    const B = X ? X(p) : p.ownerDocument, Q = st.call(
      B || p,
      p,
      // eslint-disable-next-line no-bitwise
      l.SHOW_TEXT | l.SHOW_COMMENT | l.SHOW_CDATA_SECTION | l.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let ne = Q.nextNode();
    for (; ne; )
      ne.data = As(ne.data), ne = Q.nextNode();
    const le = (k = p.querySelectorAll) === null || k === void 0 ? void 0 : k.call(p, "template");
    le && _s(le, (Me) => {
      $n(Me.content) && er(Me.content);
    });
  }, Ss = function(p) {
    const k = Y ? Y(p) : null;
    return typeof k != "string" || ot(k) !== "form" ? !1 : typeof p.nodeName != "string" || typeof p.textContent != "string" || typeof p.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
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
    p.nodeType !== M(p) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
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
    p.childNodes !== ie(p);
  }, $n = function(p) {
    if (!M || typeof p != "object" || p === null)
      return !1;
    try {
      return M(p) === jt.documentFragment;
    } catch {
      return !1;
    }
  }, ls = function(p) {
    if (!M || typeof p != "object" || p === null)
      return !1;
    try {
      return typeof M(p) == "number";
    } catch {
      return !1;
    }
  };
  function Jt(V, p, k) {
    V.length !== 0 && _s(V, (B) => {
      B.call(t, p, k, Yt);
    });
  }
  const Ki = function(p, k) {
    return !!(re && p.hasChildNodes() && !ls(p.firstElementChild) && Ct(Wl, p.textContent) && Ct(Wl, p.innerHTML) || re && p.namespaceURI === qt && Wp[k] && (ls(p.firstElementChild) || typeof p.textContent == "string" && Ct(qp[k], p.textContent)) || p.nodeType === jt.processingInstruction || re && p.nodeType === jt.comment && Ct(ql, p.data));
  }, _t = function(p, k) {
    if (p instanceof RegExp)
      return Ct(p, k);
    if (p instanceof Function) {
      for (var B = arguments.length, Q = new Array(B > 2 ? B - 2 : 0), ne = 2; ne < B; ne++)
        Q[ne - 2] = arguments[ne];
      return !!p(k, ...Q);
    }
    return !1;
  }, Gi = function(p, k, B) {
    if (!z[k] && Cs(k) && _t(W.tagNameCheck, k))
      return !1;
    if (ke && !rt[k]) {
      const Q = fe(p), ne = ie(p);
      if (ne && Q) {
        const le = ne.length;
        for (let Me = le - 1; Me >= 0; --Me) {
          const $e = p === B ? U(ne[Me], !0) : ne[Me];
          Q.insertBefore($e, D(p));
        }
      }
    }
    return Xe(p), !0;
  }, Es = function(p, k, B, Q) {
    return p.length === 0 ? k : k === B || k === Q ? Kt(k) : k;
  }, $r = function(p, k) {
    return p === k || fe(p) !== null ? !1 : (Ye && as(p), !0);
  }, Br = function(p, k) {
    if (Jt(Ee.beforeSanitizeElements, p, null), $r(p, k))
      return !0;
    if (Ss(p))
      return Xe(p), !0;
    const B = ot(Re(p));
    if (N = Es(Ee.uponSanitizeElement, N, $, Qe), Jt(Ee.uponSanitizeElement, p, {
      tagName: B,
      allowedTags: N
    }), $r(p, k))
      return !0;
    if (Ki(p, B))
      return Xe(p), !0;
    if (z[B] || !(ee.tagCheck instanceof Function && ee.tagCheck(B)) && !N[B]) {
      const ne = Gi(p, B, k);
      return ne === !1 && Jt(Ee.afterSanitizeElements, p, null), ne;
    }
    if (_e(p) === jt.element && !Zt(p) || (B === "noscript" || B === "noembed" || B === "noframes") && Ct(zp, p.innerHTML))
      return Xe(p), !0;
    if (ue && p.nodeType === jt.text) {
      const ne = As(p.textContent);
      p.textContent !== ne && (ur(t.removed, {
        element: p.cloneNode()
      }), p.textContent = ne);
    }
    return Jt(Ee.afterSanitizeElements, p, null), !1;
  }, Ur = function(p, k, B) {
    if (H[k] || fn(k, p) || Z && (k === "id" || k === "name") && (B in n || B in Vi))
      return !1;
    const Q = P[k] || ee.attributeCheck instanceof Function && ee.attributeCheck(k, p);
    return I && Ct($t, k) || T && Ct(wt, k) ? !0 : Q ? Gs[k] || Ct(C, fr(B, g, "")) || (k === "src" || k === "xlink:href" || k === "href") && p !== "script" && Ml(B, "data:") === 0 && Bt[p] || j && !Ct(Tn, fr(B, g, "")) ? !0 : !B : (
      // Condition a) covers a basically valid custom element tag name whose
      // tag passes the configured tagNameCheck and whose attribute name
      // passes the configured attributeNameCheck ...
      Cs(p) && _t(W.tagNameCheck, p) && _t(W.attributeNameCheck, k, p) || // Condition b) covers an `is` attribute whose value passes the
      // configured tagNameCheck while customized built-in elements are
      // allowed.
      k === "is" && W.allowCustomizedBuiltInElements && _t(W.tagNameCheck, B)
    );
  }, zr = Fe({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), Cs = function(p) {
    return !zr[mr(p)] && Ct(y, p);
  }, Hr = function(p, k, B, Q) {
    if (be && typeof v == "object" && typeof v.getAttributeType == "function" && !B)
      switch (v.getAttributeType(p, k)) {
        case "TrustedHTML":
          return he(Q);
        case "TrustedScriptURL":
          return we(Q);
      }
    return Q;
  }, Yi = function(p, k, B, Q) {
    try {
      return B ? p.setAttributeNS(B, k, Q) : p.setAttribute(k, Q), Ss(p) ? (Xe(p), !1) : !0;
    } catch {
      return Ot(k, p), !1;
    }
  }, Wr = function(p) {
    Jt(Ee.beforeSanitizeAttributes, p, null);
    const k = p.attributes;
    if (!k || Ss(p))
      return;
    P = Es(Ee.uponSanitizeAttribute, P, G, h);
    const B = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: P,
      forceKeepAttr: void 0
    };
    let Q = k.length;
    const ne = ot(p.nodeName);
    for (; Q--; ) {
      const le = k[Q], Me = le.name, $e = le.namespaceURI, ct = le.value, ut = ot(Me), Is = ct;
      let bt = Me === "value" ? Is : Tp(Is), qr = !1;
      if (B.attrName = ut, B.attrValue = bt, B.keepAttr = !0, B.forceKeepAttr = void 0, Jt(Ee.uponSanitizeAttribute, p, B), bt = B.attrValue, oe && (ut === "id" || ut === "name") && Ml(bt, Le) !== 0 && (Ot(Me, p, le), bt = Le + bt, qr = !0), re && Ct(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, bt)) {
        Ot(Me, p, le);
        continue;
      }
      if (ut === "attributename" && Pl(bt, "href")) {
        Ot(Me, p, le);
        continue;
      }
      if (!B.forceKeepAttr) {
        if (!B.keepAttr) {
          Ot(Me, p, le);
          continue;
        }
        if (!J && Ct(Hp, bt)) {
          Ot(Me, p, le);
          continue;
        }
        if (ue && (bt = As(bt)), !Ur(ne, ut, bt)) {
          Ot(Me, p, le);
          continue;
        }
        bt = Hr(ne, ut, $e, bt), bt !== Is && Yi(p, Me, $e, bt) && qr && Nl(t.removed);
      }
    }
    Jt(Ee.afterSanitizeAttributes, p, null);
  }, Bn = function(p) {
    let k = null;
    const B = hn(p);
    for (Jt(Ee.beforeSanitizeShadowDOM, p, null); k = B.nextNode(); )
      if (Jt(Ee.uponSanitizeShadowNode, k, null), Br(k, p), Wr(k), $n(k.content) && Bn(k.content), _e(k) === jt.element) {
        const Q = pe(k);
        $n(Q) && (Rs(Q), Bn(Q));
      }
    Jt(Ee.afterSanitizeShadowDOM, p, null);
  }, Rs = function(p) {
    const k = [{
      node: p,
      shadow: null
    }];
    for (; k.length > 0; ) {
      const B = k.pop();
      if (B.shadow) {
        Bn(B.shadow);
        continue;
      }
      const Q = B.node, le = _e(Q) === jt.element, Me = ie(Q);
      if (Me)
        for (let $e = Me.length - 1; $e >= 0; --$e)
          k.push({
            node: Me[$e],
            shadow: null
          });
      if (le) {
        const $e = Y ? Y(Q) : null;
        if (typeof $e == "string" && ot($e) === "template") {
          const ct = Q.content;
          $n(ct) && k.push({
            node: ct,
            shadow: null
          });
        }
      }
      if (le) {
        const $e = pe(Q);
        $n($e) && k.push({
          node: null,
          shadow: $e
        }, {
          node: $e,
          shadow: null
        });
      }
    }
  };
  return t.sanitize = function(V) {
    let p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, k = null, B = null, Q = null, ne = null;
    if (ss = !V, ss && (V = "<!-->"), typeof V != "string" && !ls(V) && (V = Cp(V), typeof V != "string"))
      throw ps("dirty is not a string, aborting");
    if (!t.isSupported)
      return V;
    Te ? (N = Qe, P = h) : Ts(p), (Ee.uponSanitizeElement.length > 0 || Ee.uponSanitizeAttribute.length > 0) && (N = Kt(N)), Ee.uponSanitizeAttribute.length > 0 && (P = Kt(P)), t.removed = [];
    const le = Ye && typeof V != "string" && ls(V);
    if (le) {
      kt(V);
      const ct = Re(V);
      if (typeof ct == "string") {
        const ut = ot(ct);
        if (!N[ut] || z[ut])
          throw at(V), ps("root node is forbidden and cannot be sanitized in-place");
      }
      if (Ss(V))
        throw at(V), ps("root node is clobbered and cannot be sanitized in-place");
      try {
        Rs(V);
      } catch (ut) {
        throw at(V), ut;
      }
    } else if (ls(V))
      k = Fn("<!---->"), B = k.ownerDocument.importNode(V, !0), B.nodeType === jt.element && B.nodeName === "BODY" || B.nodeName === "HTML" ? k = B : k.appendChild(B), Rs(k);
    else {
      if (!O && !ue && !Ne && // eslint-disable-next-line unicorn/prefer-includes
      V.indexOf("<") === -1)
        return be && q ? he(V) : V;
      if (k = Fn(V), !k)
        return O ? null : q ? Be : "";
    }
    k && _ && Xe(k.firstChild);
    const Me = le ? V : k;
    try {
      const ct = hn(Me);
      for (; Q = ct.nextNode(); )
        Br(Q, Me), Wr(Q), $n(Q.content) && Bn(Q.content);
    } catch (ct) {
      throw le && (at(V), _s(t.removed, (ut) => {
        ut.element && as(ut.element);
      })), ct;
    }
    if (le)
      return _s(t.removed, (ct) => {
        ct.element && as(ct.element);
      }), ue && er(V), V;
    if (O) {
      if (ue && er(k), A)
        for (ne = Ie.call(k.ownerDocument); k.firstChild; )
          ne.appendChild(k.firstChild);
      else
        ne = k;
      return (P.shadowroot || P.shadowrootmode) && (ne = Wt.call(s, ne, !0)), ne;
    }
    let $e = Ne ? k.outerHTML : k.innerHTML;
    return Ne && N["!doctype"] && k.ownerDocument && k.ownerDocument.doctype && k.ownerDocument.doctype.name && Ct(Bp, k.ownerDocument.doctype.name) && ($e = "<!DOCTYPE " + k.ownerDocument.doctype.name + `>
` + $e), ue && ($e = As($e)), be && q ? he($e) : $e;
  }, t.setConfig = function() {
    let V = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Ts(V), Te = !0, Qe = N, h = P;
  }, t.clearConfig = function() {
    Yt = null, Te = !1, Qe = null, h = null, be = ve, Be = "";
  }, t.isValidAttribute = function(V, p, k) {
    Yt || Ts({});
    const B = ot(V), Q = ot(p);
    return Ur(B, Q, k);
  }, t.addHook = function(V, p) {
    typeof p == "function" && Ht(Ee, V) && ur(Ee[V], p);
  }, t.removeHook = function(V, p) {
    if (Ht(Ee, V)) {
      if (p !== void 0) {
        const k = wp(Ee[V], p);
        return k === -1 ? void 0 : kp(Ee[V], k, 1)[0];
      }
      return Nl(Ee[V]);
    }
  }, t.removeHooks = function(V) {
    Ht(Ee, V) && (Ee[V] = []);
  }, t.removeAllHooks = function() {
    Ee = jl();
  }, t;
}
var Ta = Cu();
Ta.addHook("uponSanitizeElement", (e, t) => {
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
Ta.addHook("afterSanitizeAttributes", (e) => {
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
function Kp(e) {
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
  return Ta.sanitize(e, t);
}
He.setOptions({
  renderer: new He.Renderer(),
  gfm: !0,
  breaks: !0
});
const li = (e) => Kp(He(e || "")), Vl = "*", Gp = /* @__PURE__ */ new Set(["null", "about:blank", ""]);
let pn = null;
const ci = (e) => e && !Gp.has(e) ? e : null, Yp = (e) => {
  if (!e) return null;
  try {
    return ci(new URL(e).origin);
  } catch {
    return null;
  }
};
function Xp() {
  if (pn) return pn;
  if (window.parent === window)
    return pn = ci(window.location.origin) || Vl, pn;
  try {
    const e = ci(window.parent.location.origin);
    if (e)
      return pn = e, pn;
  } catch {
  }
  try {
    const e = window.location.ancestorOrigins, t = e && e.length ? ci(e[0]) : null;
    if (t)
      return pn = t, pn;
  } catch {
  }
  return pn = Yp(document.referrer) || Vl, pn;
}
function Vn(e) {
  window.parent.postMessage(e, Xp());
}
const Ci = "Start a new chat", Kl = "Start a new chat? This ends the current one.", Zp = "Start new chat", Jp = "Cancel", Gl = "Couldn't start a new chat. Please try again.", Qp = 15e3, em = ["aria-label"], tm = { class: "new-chat-confirm__question" }, nm = { class: "new-chat-confirm__actions" }, sm = ["disabled"], rm = ["disabled"], im = /* @__PURE__ */ ua({
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
      "aria-label": E(Kl)
    }, [
      b("p", tm, te(s.error || E(Kl)), 1),
      b("div", nm, [
        b("button", {
          type: "button",
          class: "new-chat-confirm__button",
          disabled: s.busy,
          onClick: r[0] || (r[0] = (i) => n("cancel"))
        }, te(E(Jp)), 9, sm),
        b("button", {
          type: "button",
          class: "new-chat-confirm__button new-chat-confirm__button--primary",
          disabled: s.busy,
          onClick: r[1] || (r[1] = (i) => n("confirm"))
        }, te(E(Zp)), 9, rm)
      ])
    ], 8, em));
  }
}), xa = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Ru = /* @__PURE__ */ xa(im, [["__scopeId", "data-v-6c78f353"]]), om = { class: "askai" }, am = { class: "askai__bar" }, lm = ["value", "placeholder", "disabled", "aria-label", "onKeydown"], cm = ["disabled", "title", "aria-label", "aria-expanded"], um = { class: "askai__intro" }, fm = { class: "askai__title" }, hm = {
  key: 0,
  class: "askai__subtitle"
}, dm = {
  key: 0,
  class: "askai__suggestions"
}, pm = ["disabled", "onClick"], mm = ["aria-live"], gm = {
  key: 0,
  class: "askai__question"
}, _m = {
  key: 1,
  class: "askai__system"
}, ym = ["innerHTML"], bm = {
  key: 0,
  class: "askai__sources"
}, vm = ["title"], wm = {
  key: 0,
  class: "askai__thinking",
  role: "status",
  "aria-live": "polite"
}, km = { class: "askai__thinking-text" }, Tm = { class: "askai__foot" }, xm = { key: 0 }, Am = /* @__PURE__ */ ua({
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
      () => n.messages.map((R, M) => ({ message: R, index: M })).filter(({ message: R }) => a.includes(R.message_type))
    ), d = de(() => l.value.length > 0), c = (R) => {
      s("update:draft", R.target.value);
    }, v = () => {
      !(n.typingEnabled ?? n.inputEnabled) || !n.draft.trim() || s("send");
    }, w = (R) => {
      n.inputEnabled && s("ask", R);
    }, U = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform || ""), L = (R) => {
      if (R.key === "Escape") {
        R.preventDefault(), s("close");
        return;
      }
      const M = U ? R.metaKey && !R.ctrlKey : R.ctrlKey && !R.metaKey;
      n.hotkey && M && !R.altKey && (R.key === "k" || R.key === "K") && (R.preventDefault(), s("close"));
    }, K = () => {
      bs(() => {
        var R;
        return (R = r.value) == null ? void 0 : R.focus();
      });
    };
    let D = 0;
    const ie = () => {
      if (!o.value) return;
      const R = o.value.closest(".askai"), M = i.value;
      if (!R || !M) return;
      const Y = R.offsetHeight - M.offsetHeight, X = getComputedStyle(M), _e = parseFloat(X.paddingTop) + parseFloat(X.paddingBottom), Re = Math.ceil(Y + _e + o.value.getBoundingClientRect().height);
      Math.abs(Re - D) < 3 || (D = Re, Vn({ type: "WIDGET_RESIZE", height: Re }));
    };
    let fe = null;
    const pe = de(
      () => l.value.reduce((R, { message: M, index: Y }) => R + n.displayText(Y, M.message || "").length, 0)
    );
    return Pt(
      () => [l.value.length, pe.value, n.loading],
      () => bs(() => {
        i.value && (i.value.scrollTop = i.value.scrollHeight);
      })
    ), Pt(() => n.newChatArmed, () => bs(() => ie())), Pt(() => n.active, (R) => {
      R && K();
    }), $i(() => {
      n.active && K(), window.addEventListener("keydown", L), o.value && typeof ResizeObserver < "u" && (fe = new ResizeObserver(() => ie()), fe.observe(o.value)), ie();
    }), Wc(() => {
      window.removeEventListener("keydown", L), fe == null || fe.disconnect(), fe = null;
    }), (R, M) => (x(), S("div", om, [
      b("div", am, [
        M[6] || (M[6] = b("svg", {
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
          onKeydown: oi(gs(v, ["prevent"]), ["enter"])
        }, null, 40, lm),
        R.canStartNewChat ? (x(), S("button", {
          key: 0,
          type: "button",
          class: Ue(["askai__new", { "askai__new--armed": R.newChatArmed }]),
          disabled: R.startingNewChat,
          title: E(Ci),
          "aria-label": E(Ci),
          "aria-expanded": R.newChatArmed,
          onClick: M[0] || (M[0] = (Y) => s("newChat"))
        }, M[4] || (M[4] = [
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
        ]), 10, cm)) : ae("", !0),
        b("button", {
          type: "button",
          class: "askai__close",
          "aria-label": "Close",
          title: "Close (Esc)",
          onClick: M[1] || (M[1] = (Y) => s("close"))
        }, M[5] || (M[5] = [
          b("span", { class: "askai__kbd" }, "Esc", -1)
        ]))
      ]),
      R.newChatArmed && R.canStartNewChat ? (x(), ki(Ru, {
        key: 0,
        busy: R.startingNewChat,
        error: R.newChatError,
        onConfirm: M[2] || (M[2] = (Y) => s("confirmNewChat")),
        onCancel: M[3] || (M[3] = (Y) => s("cancelNewChat"))
      }, null, 8, ["busy", "error"])) : ae("", !0),
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
          d.value ? (x(), S(ze, { key: 1 }, [
            (x(!0), S(ze, null, Tt(l.value, ({ message: Y, index: X }) => (x(), S("div", {
              key: X,
              class: "askai__turn",
              "aria-live": R.isStreaming(X) ? "off" : "polite"
            }, [
              Y.message_type === "user" ? (x(), S("p", gm, te(Y.message), 1)) : Y.message_type === "system" ? (x(), S("p", _m, te(Y.message), 1)) : (x(), S(ze, { key: 2 }, [
                b("div", {
                  class: Ue(["askai__answer", { "askai__answer--streaming": R.isStreaming(X) }]),
                  innerHTML: E(li)(R.isStreaming(X) ? R.displayText(X, Y.message || "") : Y.message || "")
                }, null, 10, ym),
                R.showCitations && !R.isStreaming(X) && Y.sources && Y.sources.length ? (x(), S("div", bm, [
                  M[9] || (M[9] = b("span", { class: "askai__label" }, "Sources", -1)),
                  (x(!0), S(ze, null, Tt(Y.sources, (_e, Re) => (x(), S("span", {
                    key: Re,
                    class: "askai__source",
                    title: R.citationTooltip(_e)
                  }, te(R.citationLabel(_e)), 9, vm))), 128))
                ])) : ae("", !0)
              ], 64))
            ], 8, mm))), 128)),
            R.loading ? (x(), S("div", wm, [
              M[10] || (M[10] = b("span", { class: "askai__dot" }, null, -1)),
              M[11] || (M[11] = b("span", { class: "askai__dot" }, null, -1)),
              M[12] || (M[12] = b("span", { class: "askai__dot" }, null, -1)),
              b("span", km, te(R.showCitations ? "Searching the knowledge base" : "Thinking"), 1)
            ])) : ae("", !0)
          ], 64)) : (x(), S(ze, { key: 0 }, [
            b("div", um, [
              b("h2", fm, te(R.welcomeTitle || `Ask ${R.agentName}`), 1),
              R.welcomeSubtitle ? (x(), S("p", hm, te(R.welcomeSubtitle), 1)) : ae("", !0)
            ]),
            R.suggestions.length && !R.draft.trim() ? (x(), S("div", dm, [
              M[8] || (M[8] = b("p", { class: "askai__label" }, "Suggested", -1)),
              (x(!0), S(ze, null, Tt(R.suggestions, (Y) => (x(), S("button", {
                key: Y,
                type: "button",
                class: "askai__suggestion",
                disabled: !R.inputEnabled,
                onClick: (X) => w(Y)
              }, [
                b("span", null, te(Y), 1),
                M[7] || (M[7] = b("svg", {
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
              ], 8, pm))), 128))
            ])) : ae("", !0)
          ], 64))
        ], 512)
      ], 512),
      b("div", Tm, [
        R.disclaimer ? (x(), S("span", xm, te(R.disclaimer), 1)) : ae("", !0),
        M[13] || (M[13] = b("a", {
          class: "askai__brand",
          href: "https://chattermate.chat",
          target: "_blank",
          rel: "noopener noreferrer"
        }, "Powered by ChatterMate", -1))
      ])
    ]));
  }
}), Sm = /* @__PURE__ */ xa(Am, [["__scopeId", "data-v-edea9534"]]), gr = [
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
], Em = (e) => (e || "").split("").reduce((t, n) => t + n.charCodeAt(0), 0) % gr.length, Cm = (e) => {
  const t = gr[(e % gr.length + gr.length) % gr.length];
  return {
    background: `
            radial-gradient(circle at 32% 28%, rgba(255,255,255,0.22) 0%, transparent 42%),
            radial-gradient(circle at 68% 72%, rgba(0,0,0,0.25) 0%, transparent 38%),
            radial-gradient(ellipse at 50% 50%, ${t.stops})
        `.trim(),
    boxShadow: `0 4px 28px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`,
    borderRadius: "50%"
  };
}, Rm = (e, t) => {
  const n = typeof t == "number" && Number.isFinite(t) ? t : Em(e);
  return Cm(n);
}, Yl = (e) => {
  var t;
  return !!((t = e == null ? void 0 : e.attributes) != null && t.end_chat);
}, Xl = "AI can make mistakes. Check important info.";
function Im(e, t = !1) {
  return e !== !1 && !t;
}
const wo = {
  ai: "Online · replies instantly",
  human: "Online · usually replies in a few minutes",
  away: "Away · we'll reply when we're back"
};
function Lm(e, t = !1) {
  return (t ? "human" : (e == null ? void 0 : e.mode) ?? "ai") === "ai" ? { text: wo.ai, online: !0 } : (e == null ? void 0 : e.available) !== !1 ? { text: wo.human, online: !0 } : { text: wo.away, online: !1 };
}
const Iu = (e) => !!e && (/^https?:\/\//i.test(e) || e.startsWith("data:")), Om = (e, t) => e ? Iu(e) || e.startsWith("blob:") ? e : `${t.replace(/\/api\/v1\/?$/, "")}${e.startsWith("/") ? "" : "/"}${e}` : "";
function Zl() {
  return typeof window < "u" && window.APP_CONFIG ? window.APP_CONFIG : {};
}
const Vs = {
  get API_URL() {
    return Zl().API_URL || void 0 || "https://api.chattermate.chat/api/v1";
  },
  get WS_URL() {
    return Zl().WS_URL || void 0 || "wss://api.chattermate.chat";
  }
};
function Ri(e) {
  return Om(e, Vs.API_URL);
}
function Nm(e) {
  const t = de(() => ({
    backgroundColor: "var(--cm-card)",
    color: "var(--cm-text)"
  })), n = de(() => ({
    backgroundColor: e.value.chat_bubble_color || "#C9F24E",
    color: Hs(e.value.chat_bubble_color || "#C9F24E") ? "#FFFFFF" : "#000000"
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
  })), a = de(() => Ri(e.value.photo_url)), l = de(() => {
    const d = e.value.chat_background_color || "#ffffff";
    return {
      boxShadow: `0 8px 5px ${Hs(d) ? "rgba(0, 0, 0, 0.24)" : "rgba(0, 0, 0, 0.12)"}`
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
const Pm = /* @__PURE__ */ new Set(["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]), Mm = /* @__PURE__ */ new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
]);
[...Pm, ...Mm];
function Dm(e, t) {
  const n = ce([]), s = ce(!1), r = ce(null), i = (M) => {
    if (M === 0) return "0 Bytes";
    const Y = 1024, X = ["Bytes", "KB", "MB", "GB"], _e = Math.floor(Math.log(M) / Math.log(Y));
    return parseFloat((M / Math.pow(Y, _e)).toFixed(2)) + " " + X[_e];
  }, o = (M) => M.startsWith("image/"), a = (M) => M ? Ri(M) : "", l = (M) => {
    const Y = M.file_url || M.url;
    return Y ? Ri(Y) : "";
  }, d = async (M) => {
    const Y = M.target;
    Y.files && Y.files.length > 0 && (await K(Array.from(Y.files)), Y.value = "");
  }, c = async (M) => {
    var X;
    M.preventDefault();
    const Y = (X = M.dataTransfer) == null ? void 0 : X.files;
    Y && Y.length > 0 && await K(Array.from(Y));
  }, v = (M) => {
    M.preventDefault();
  }, w = (M) => {
    M.preventDefault();
  }, U = async (M) => {
    var _e;
    const Y = (_e = M.clipboardData) == null ? void 0 : _e.items;
    if (!Y) return;
    const X = [];
    for (const Re of Array.from(Y))
      if (Re.kind === "file") {
        const be = Re.getAsFile();
        be && X.push(be);
      }
    X.length > 0 && await K(X);
  }, L = async (M, Y = 500) => new Promise((X, _e) => {
    const Re = new FileReader();
    Re.onload = (be) => {
      var ve;
      const Be = new Image();
      Be.onload = () => {
        const Je = document.createElement("canvas");
        let We = Be.width, nt = Be.height;
        const he = 1920;
        (We > he || nt > he) && (We > nt ? (nt = nt / We * he, We = he) : (We = We / nt * he, nt = he)), Je.width = We, Je.height = nt;
        const we = Je.getContext("2d");
        if (!we) {
          _e(new Error("Failed to get canvas context"));
          return;
        }
        we.drawImage(Be, 0, 0, We, nt);
        let me = 0.9;
        const Ge = () => {
          Je.toBlob((Ae) => {
            if (!Ae) {
              _e(new Error("Failed to compress image"));
              return;
            }
            if (Ae.size / 1024 > Y && me > 0.3)
              me -= 0.1, Ge();
            else {
              const Ie = new FileReader();
              Ie.onload = () => {
                const ft = Ie.result.split(",")[1];
                X({ blob: Ae, base64: ft });
              }, Ie.readAsDataURL(Ae);
            }
          }, M.type === "image/png" ? "image/png" : "image/jpeg", me);
        };
        Ge();
      }, Be.onerror = () => _e(new Error("Failed to load image")), Be.src = (ve = be.target) == null ? void 0 : ve.result;
    }, Re.onerror = () => _e(new Error("Failed to read file")), Re.readAsDataURL(M);
  }), K = async (M) => {
    if (n.value.length >= 3) {
      alert("Maximum 3 files allowed per message");
      return;
    }
    const be = 3 - n.value.length, Be = M.slice(0, be);
    M.length > be && alert(`Only ${be} more file(s) can be uploaded. Maximum 3 files per message.`);
    for (const ve of Be)
      try {
        if (n.value.some((he) => he.filename === ve.name)) {
          console.warn(`File ${ve.name} is already selected`), alert(`File "${ve.name}" is already selected`);
          continue;
        }
        const We = ve.type.startsWith("image/"), nt = We ? 5242880 : 10485760;
        if (ve.size > nt) {
          const he = nt / 1048576;
          console.error(`File ${ve.name} is too large. Maximum size is ${he}MB`), alert(`File "${ve.name}" is too large. Maximum size for ${We ? "images" : "documents"} is ${he}MB`);
          continue;
        }
        if (We)
          try {
            const { blob: he, base64: we } = await L(ve, 500), me = he.size;
            console.log(`Compressed ${ve.name}: ${(ve.size / 1024).toFixed(2)}KB → ${(me / 1024).toFixed(2)}KB`), n.value.push({
              content: we,
              filename: ve.name,
              type: ve.type,
              size: me,
              url: URL.createObjectURL(he),
              file_url: URL.createObjectURL(he)
            });
          } catch (he) {
            console.error("Image compression failed, uploading original:", he);
            const we = new FileReader();
            we.onload = (me) => {
              var st;
              const Ae = ((st = me.target) == null ? void 0 : st.result).split(",")[1];
              n.value.push({
                content: Ae,
                filename: ve.name,
                type: ve.type,
                size: ve.size,
                url: URL.createObjectURL(ve),
                file_url: URL.createObjectURL(ve)
              });
            }, we.readAsDataURL(ve);
          }
        else {
          const he = new FileReader();
          he.onload = (we) => {
            var Ae;
            const Ge = ((Ae = we.target) == null ? void 0 : Ae.result).split(",")[1];
            n.value.push({
              content: Ge,
              filename: ve.name,
              type: ve.type || "application/octet-stream",
              size: ve.size,
              url: "",
              file_url: ""
            });
          }, he.readAsDataURL(ve);
        }
      } catch (Je) {
        console.error("File upload error:", Je);
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
    handlePaste: U,
    uploadFiles: K,
    removeAttachment: async (M) => {
      const Y = n.value[M];
      if (Y) {
        try {
          let X = Y.url;
          if (X.startsWith("/uploads/") ? X = X.substring(9) : X.startsWith("/") && (X = X.substring(1)), Iu(X))
            try {
              X = new URL(X).pathname.replace(/^\/+/, "");
            } catch {
            }
          const _e = {};
          e.value && (_e.Authorization = `Bearer ${e.value}`);
          const Re = await fetch(`${Vs.API_URL}/files/upload/${X}`, {
            method: "DELETE",
            headers: _e
          });
          if (Re.ok)
            console.log("File deleted successfully from backend.");
          else {
            const be = await Re.json();
            console.error("Failed to delete file:", be.detail);
          }
        } catch (X) {
          console.error("Error calling delete API:", X);
        }
        Y.url && Y.url.startsWith("blob:") && URL.revokeObjectURL(Y.url), Y.file_url && Y.file_url.startsWith("blob:") && URL.revokeObjectURL(Y.file_url), n.value.splice(M, 1);
      }
    },
    openPreview: (M) => {
      r.value = M, s.value = !0;
    },
    closePreview: () => {
      s.value = !1, setTimeout(() => {
        r.value = null;
      }, 300);
    },
    openFilePicker: () => {
      var M;
      (M = t.value) == null || M.click();
    },
    isImage: (M) => M.startsWith("image/")
  };
}
const kn = /* @__PURE__ */ Object.create(null);
kn.open = "0";
kn.close = "1";
kn.ping = "2";
kn.pong = "3";
kn.message = "4";
kn.upgrade = "5";
kn.noop = "6";
const ui = /* @__PURE__ */ Object.create(null);
Object.keys(kn).forEach((e) => {
  ui[kn[e]] = e;
});
const Vo = { type: "error", data: "parser error" }, Lu = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", Ou = typeof ArrayBuffer == "function", Nu = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e && e.buffer instanceof ArrayBuffer, Aa = ({ type: e, data: t }, n, s) => Lu && t instanceof Blob ? n ? s(t) : Jl(t, s) : Ou && (t instanceof ArrayBuffer || Nu(t)) ? n ? s(t) : Jl(new Blob([t]), s) : s(kn[e] + (t || "")), Jl = (e, t) => {
  const n = new FileReader();
  return n.onload = function() {
    const s = n.result.split(",")[1];
    t("b" + (s || ""));
  }, n.readAsDataURL(e);
};
function Ql(e) {
  return e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let ko;
function Fm(e, t) {
  if (Lu && e.data instanceof Blob)
    return e.data.arrayBuffer().then(Ql).then(t);
  if (Ou && (e.data instanceof ArrayBuffer || Nu(e.data)))
    return t(Ql(e.data));
  Aa(e, !1, (n) => {
    ko || (ko = new TextEncoder()), t(ko.encode(n));
  });
}
const ec = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", _r = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < ec.length; e++)
  _r[ec.charCodeAt(e)] = e;
const $m = (e) => {
  let t = e.length * 0.75, n = e.length, s, r = 0, i, o, a, l;
  e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
  const d = new ArrayBuffer(t), c = new Uint8Array(d);
  for (s = 0; s < n; s += 4)
    i = _r[e.charCodeAt(s)], o = _r[e.charCodeAt(s + 1)], a = _r[e.charCodeAt(s + 2)], l = _r[e.charCodeAt(s + 3)], c[r++] = i << 2 | o >> 4, c[r++] = (o & 15) << 4 | a >> 2, c[r++] = (a & 3) << 6 | l & 63;
  return d;
}, Bm = typeof ArrayBuffer == "function", Sa = (e, t) => {
  if (typeof e != "string")
    return {
      type: "message",
      data: Pu(e, t)
    };
  const n = e.charAt(0);
  return n === "b" ? {
    type: "message",
    data: Um(e.substring(1), t)
  } : ui[n] ? e.length > 1 ? {
    type: ui[n],
    data: e.substring(1)
  } : {
    type: ui[n]
  } : Vo;
}, Um = (e, t) => {
  if (Bm) {
    const n = $m(e);
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
}, Mu = "", zm = (e, t) => {
  const n = e.length, s = new Array(n);
  let r = 0;
  e.forEach((i, o) => {
    Aa(i, !1, (a) => {
      s[o] = a, ++r === n && t(s.join(Mu));
    });
  });
}, Hm = (e, t) => {
  const n = e.split(Mu), s = [];
  for (let r = 0; r < n.length; r++) {
    const i = Sa(n[r], t);
    if (s.push(i), i.type === "error")
      break;
  }
  return s;
};
function Wm() {
  return new TransformStream({
    transform(e, t) {
      Fm(e, (n) => {
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
let To;
function Qr(e) {
  return e.reduce((t, n) => t + n.length, 0);
}
function ei(e, t) {
  if (e[0].length === t)
    return e.shift();
  const n = new Uint8Array(t);
  let s = 0;
  for (let r = 0; r < t; r++)
    n[r] = e[0][s++], s === e[0].length && (e.shift(), s = 0);
  return e.length && s < e[0].length && (e[0] = e[0].slice(s)), n;
}
function qm(e, t) {
  To || (To = new TextDecoder());
  const n = [];
  let s = 0, r = -1, i = !1;
  return new TransformStream({
    transform(o, a) {
      for (n.push(o); ; ) {
        if (s === 0) {
          if (Qr(n) < 1)
            break;
          const l = ei(n, 1);
          i = (l[0] & 128) === 128, r = l[0] & 127, r < 126 ? s = 3 : r === 126 ? s = 1 : s = 2;
        } else if (s === 1) {
          if (Qr(n) < 2)
            break;
          const l = ei(n, 2);
          r = new DataView(l.buffer, l.byteOffset, l.length).getUint16(0), s = 3;
        } else if (s === 2) {
          if (Qr(n) < 8)
            break;
          const l = ei(n, 8), d = new DataView(l.buffer, l.byteOffset, l.length), c = d.getUint32(0);
          if (c > Math.pow(2, 21) - 1) {
            a.enqueue(Vo);
            break;
          }
          r = c * Math.pow(2, 32) + d.getUint32(4), s = 3;
        } else {
          if (Qr(n) < r)
            break;
          const l = ei(n, r);
          a.enqueue(Sa(i ? l : To.decode(l), t)), s = 0;
        }
        if (r === 0 || r > e) {
          a.enqueue(Vo);
          break;
        }
      }
    }
  });
}
const Du = 4;
function dt(e) {
  if (e) return jm(e);
}
function jm(e) {
  for (var t in dt.prototype)
    e[t] = dt.prototype[t];
  return e;
}
dt.prototype.on = dt.prototype.addEventListener = function(e, t) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this;
};
dt.prototype.once = function(e, t) {
  function n() {
    this.off(e, n), t.apply(this, arguments);
  }
  return n.fn = t, this.on(e, n), this;
};
dt.prototype.off = dt.prototype.removeListener = dt.prototype.removeAllListeners = dt.prototype.removeEventListener = function(e, t) {
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
dt.prototype.emit = function(e) {
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
dt.prototype.emitReserved = dt.prototype.emit;
dt.prototype.listeners = function(e) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || [];
};
dt.prototype.hasListeners = function(e) {
  return !!this.listeners(e).length;
};
const qi = typeof Promise == "function" && typeof Promise.resolve == "function" ? (t) => Promise.resolve().then(t) : (t, n) => n(t, 0), tn = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), Vm = "arraybuffer";
function Fu(e, ...t) {
  return t.reduce((n, s) => (e.hasOwnProperty(s) && (n[s] = e[s]), n), {});
}
const Km = tn.setTimeout, Gm = tn.clearTimeout;
function ji(e, t) {
  t.useNativeTimers ? (e.setTimeoutFn = Km.bind(tn), e.clearTimeoutFn = Gm.bind(tn)) : (e.setTimeoutFn = tn.setTimeout.bind(tn), e.clearTimeoutFn = tn.clearTimeout.bind(tn));
}
const Ym = 1.33;
function Xm(e) {
  return typeof e == "string" ? Zm(e) : Math.ceil((e.byteLength || e.size) * Ym);
}
function Zm(e) {
  let t = 0, n = 0;
  for (let s = 0, r = e.length; s < r; s++)
    t = e.charCodeAt(s), t < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (s++, n += 4);
  return n;
}
function $u() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function Jm(e) {
  let t = "";
  for (let n in e)
    e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
  return t;
}
function Qm(e) {
  let t = {}, n = e.split("&");
  for (let s = 0, r = n.length; s < r; s++) {
    let i = n[s].split("=");
    t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
  }
  return t;
}
class eg extends Error {
  constructor(t, n, s) {
    super(t), this.description = n, this.context = s, this.type = "TransportError";
  }
}
class Ea extends dt {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(t) {
    super(), this.writable = !1, ji(this, t), this.opts = t, this.query = t.query, this.socket = t.socket, this.supportsBinary = !t.forceBase64;
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
    return super.emitReserved("error", new eg(t, n, s)), this;
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
    const n = Sa(t, this.socket.binaryType);
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
    const n = Jm(t);
    return n.length ? "?" + n : "";
  }
}
class tg extends Ea {
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
    Hm(t, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
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
    this.writable = !1, zm(t, (n) => {
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
const ng = Bu;
function sg() {
}
class rg extends tg {
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
class vn extends dt {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(t, n, s) {
    super(), this.createRequest = t, ji(this, s), this._opts = s, this._method = s.method || "GET", this._uri = n, this._data = s.data !== void 0 ? s.data : null, this._create();
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
    typeof document < "u" && (this._index = vn.requestsCount++, vn.requests[this._index] = this);
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
      if (this._xhr.onreadystatechange = sg, t)
        try {
          this._xhr.abort();
        } catch {
        }
      typeof document < "u" && delete vn.requests[this._index], this._xhr = null;
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
vn.requestsCount = 0;
vn.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", tc);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in tn ? "pagehide" : "unload";
    addEventListener(e, tc, !1);
  }
}
function tc() {
  for (let e in vn.requests)
    vn.requests.hasOwnProperty(e) && vn.requests[e].abort();
}
const ig = function() {
  const e = Uu({
    xdomain: !1
  });
  return e && e.responseType !== null;
}();
class og extends rg {
  constructor(t) {
    super(t);
    const n = t && t.forceBase64;
    this.supportsBinary = ig && !n;
  }
  request(t = {}) {
    return Object.assign(t, { xd: this.xd }, this.opts), new vn(Uu, this.uri(), t);
  }
}
function Uu(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || ng))
      return new XMLHttpRequest();
  } catch {
  }
  if (!t)
    try {
      return new tn[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const zu = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class ag extends Ea {
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
        r && qi(() => {
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
const xo = tn.WebSocket || tn.MozWebSocket;
class lg extends ag {
  createSocket(t, n, s) {
    return zu ? new xo(t, n, s) : n ? new xo(t, n) : new xo(t);
  }
  doWrite(t, n) {
    this.ws.send(n);
  }
}
class cg extends Ea {
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
        const n = qm(Number.MAX_SAFE_INTEGER, this.socket.binaryType), s = t.readable.pipeThrough(n).getReader(), r = Wm();
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
        r && qi(() => {
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
const ug = {
  websocket: lg,
  webtransport: cg,
  polling: og
}, fg = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, hg = [
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
function Ko(e) {
  if (e.length > 8e3)
    throw "URI too long";
  const t = e, n = e.indexOf("["), s = e.indexOf("]");
  n != -1 && s != -1 && (e = e.substring(0, n) + e.substring(n, s).replace(/:/g, ";") + e.substring(s, e.length));
  let r = fg.exec(e || ""), i = {}, o = 14;
  for (; o--; )
    i[hg[o]] = r[o] || "";
  return n != -1 && s != -1 && (i.source = t, i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"), i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), i.ipv6uri = !0), i.pathNames = dg(i, i.path), i.queryKey = pg(i, i.query), i;
}
function dg(e, t) {
  const n = /\/{2,9}/g, s = t.replace(n, "/").split("/");
  return (t.slice(0, 1) == "/" || t.length === 0) && s.splice(0, 1), t.slice(-1) == "/" && s.splice(s.length - 1, 1), s;
}
function pg(e, t) {
  const n = {};
  return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, r, i) {
    r && (n[r] = i);
  }), n;
}
const Go = typeof addEventListener == "function" && typeof removeEventListener == "function", fi = [];
Go && addEventListener("offline", () => {
  fi.forEach((e) => e());
}, !1);
class Gn extends dt {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(t, n) {
    if (super(), this.binaryType = Vm, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, t && typeof t == "object" && (n = t, t = null), t) {
      const s = Ko(t);
      n.hostname = s.host, n.secure = s.protocol === "https" || s.protocol === "wss", n.port = s.port, s.query && (n.query = s.query);
    } else n.host && (n.hostname = Ko(n.host).host);
    ji(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((s) => {
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
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = Qm(this.opts.query)), Go && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, fi.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
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
    const t = this.opts.rememberUpgrade && Gn.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
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
    this.readyState = "open", Gn.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
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
      if (r && (n += Xm(r)), s > 0 && n > this._maxPayload)
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
    return t && (this._pingTimeoutTime = 0, qi(() => {
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
    if (Gn.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
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
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), Go && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const s = fi.indexOf(this._offlineEventListener);
        s !== -1 && fi.splice(s, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", t, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
Gn.protocol = Du;
class mg extends Gn {
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
    Gn.priorWebsocketSuccess = !1;
    const r = () => {
      s || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (v) => {
        if (!s)
          if (v.type === "pong" && v.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", n), !n)
              return;
            Gn.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
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
let gg = class extends mg {
  constructor(t, n = {}) {
    const s = typeof t == "object", r = s ? { ...t } : { ...n };
    (!r.transports || r.transports && typeof r.transports[0] == "string") && (r.transports = (r.transports || ["polling", "websocket", "webtransport"]).map((i) => ug[i]).filter((i) => !!i)), super(s ? r : t, r);
  }
};
function _g(e, t = "", n) {
  let s = e;
  n = n || typeof location < "u" && location, e == null && (e = n.protocol + "//" + n.host), typeof e == "string" && (e.charAt(0) === "/" && (e.charAt(1) === "/" ? e = n.protocol + e : e = n.host + e), /^(https?|wss?):\/\//.test(e) || (typeof n < "u" ? e = n.protocol + "//" + e : e = "https://" + e), s = Ko(e)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
  const i = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return s.id = s.protocol + "://" + i + ":" + s.port + t, s.href = s.protocol + "://" + i + (n && n.port === s.port ? "" : ":" + s.port), s;
}
const yg = typeof ArrayBuffer == "function", bg = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer, Hu = Object.prototype.toString, vg = typeof Blob == "function" || typeof Blob < "u" && Hu.call(Blob) === "[object BlobConstructor]", wg = typeof File == "function" || typeof File < "u" && Hu.call(File) === "[object FileConstructor]";
function Ca(e) {
  return yg && (e instanceof ArrayBuffer || bg(e)) || vg && e instanceof Blob || wg && e instanceof File;
}
function hi(e, t) {
  if (!e || typeof e != "object")
    return !1;
  if (Array.isArray(e)) {
    for (let n = 0, s = e.length; n < s; n++)
      if (hi(e[n]))
        return !0;
    return !1;
  }
  if (Ca(e))
    return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return hi(e.toJSON(), !0);
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && hi(e[n]))
      return !0;
  return !1;
}
function kg(e) {
  const t = [], n = e.data, s = e;
  return s.data = di(n, t), s.attachments = t.length, { packet: s, buffers: t };
}
function di(e, t, n) {
  if (!e)
    return e;
  if (Ca(e)) {
    const s = { _placeholder: !0, num: t.length };
    return t.push(e), s;
  } else if (Array.isArray(e)) {
    const s = new Array(e.length);
    for (let r = 0; r < e.length; r++)
      s[r] = di(e[r], t);
    return s;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    if (e.toJSON && typeof e.toJSON == "function" && !n)
      return di(e.toJSON(), t, !0);
    const s = {};
    for (const r in e)
      Object.prototype.hasOwnProperty.call(e, r) && (s[r] = di(e[r], t));
    return s;
  }
  return e;
}
function Tg(e, t) {
  return e.data = Yo(e.data, t), delete e.attachments, e;
}
function Yo(e, t) {
  if (!e)
    return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == "number" && e.num >= 0 && e.num < t.length)
      return t[e.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(e))
    for (let n = 0; n < e.length; n++)
      e[n] = Yo(e[n], t);
  else if (typeof e == "object")
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (e[n] = Yo(e[n], t));
  return e;
}
const xg = [
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
var De;
(function(e) {
  e[e.CONNECT = 0] = "CONNECT", e[e.DISCONNECT = 1] = "DISCONNECT", e[e.EVENT = 2] = "EVENT", e[e.ACK = 3] = "ACK", e[e.CONNECT_ERROR = 4] = "CONNECT_ERROR", e[e.BINARY_EVENT = 5] = "BINARY_EVENT", e[e.BINARY_ACK = 6] = "BINARY_ACK";
})(De || (De = {}));
class Ag {
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
    return (t.type === De.EVENT || t.type === De.ACK) && hi(t) ? this.encodeAsBinary({
      type: t.type === De.EVENT ? De.BINARY_EVENT : De.BINARY_ACK,
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
    return (t.type === De.BINARY_EVENT || t.type === De.BINARY_ACK) && (n += t.attachments + "-"), t.nsp && t.nsp !== "/" && (n += t.nsp + ","), t.id != null && (n += t.id), t.data != null && (n += JSON.stringify(t.data, this.replacer)), n;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(t) {
    const n = kg(t), s = this.encodeAsString(n.packet), r = n.buffers;
    return r.unshift(s), r;
  }
}
class Ra extends dt {
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
      const s = n.type === De.BINARY_EVENT;
      s || n.type === De.BINARY_ACK ? (n.type = s ? De.EVENT : De.ACK, this.reconstructor = new Sg(n)) : super.emitReserved("decoded", n);
    } else if (Ca(t) || t.base64)
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
    if (De[s.type] === void 0)
      throw new Error("unknown packet type " + s.type);
    if (s.type === De.BINARY_EVENT || s.type === De.BINARY_ACK) {
      const i = n + 1;
      for (; t.charAt(++n) !== "-" && n != t.length; )
        ;
      const o = t.substring(i, n);
      if (o != Number(o) || t.charAt(n) !== "-")
        throw new Error("Illegal attachments");
      const a = Number(o);
      if (!Eg(a) || a < 1)
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
      if (Ra.isPayloadValid(s.type, i))
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
      case De.CONNECT:
        return nc(n);
      case De.DISCONNECT:
        return n === void 0;
      case De.CONNECT_ERROR:
        return typeof n == "string" || nc(n);
      case De.EVENT:
      case De.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && xg.indexOf(n[0]) === -1);
      case De.ACK:
      case De.BINARY_ACK:
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
class Sg {
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
      const n = Tg(this.reconPack, this.buffers);
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
const Eg = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
};
function nc(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
const Cg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Ra,
  Encoder: Ag,
  get PacketType() {
    return De;
  }
}, Symbol.toStringTag, { value: "Module" }));
function ln(e, t, n) {
  return e.on(t, n), function() {
    e.off(t, n);
  };
}
const Rg = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class Wu extends dt {
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
      ln(t, "open", this.onopen.bind(this)),
      ln(t, "packet", this.onpacket.bind(this)),
      ln(t, "error", this.onerror.bind(this)),
      ln(t, "close", this.onclose.bind(this))
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
    if (Rg.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (n.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const o = {
      type: De.EVENT,
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
      type: De.CONNECT,
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
        case De.CONNECT:
          t.data && t.data.sid ? this.onconnect(t.data.sid, t.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case De.EVENT:
        case De.BINARY_EVENT:
          this.onevent(t);
          break;
        case De.ACK:
        case De.BINARY_ACK:
          this.onack(t);
          break;
        case De.DISCONNECT:
          this.ondisconnect();
          break;
        case De.CONNECT_ERROR:
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
        type: De.ACK,
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
    return this.connected && this.packet({ type: De.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
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
function Ks(e) {
  e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;
}
Ks.prototype.duration = function() {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(), n = Math.floor(t * this.jitter * e);
    e = (Math.floor(t * 10) & 1) == 0 ? e - n : e + n;
  }
  return Math.min(e, this.max) | 0;
};
Ks.prototype.reset = function() {
  this.attempts = 0;
};
Ks.prototype.setMin = function(e) {
  this.ms = e;
};
Ks.prototype.setMax = function(e) {
  this.max = e;
};
Ks.prototype.setJitter = function(e) {
  this.jitter = e;
};
class Xo extends dt {
  constructor(t, n) {
    var s;
    super(), this.nsps = {}, this.subs = [], t && typeof t == "object" && (n = t, t = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, ji(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5), this.backoff = new Ks({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = t;
    const r = n.parser || Cg;
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
    this.engine = new gg(this.uri, this.opts);
    const n = this.engine, s = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const r = ln(n, "open", function() {
      s.onopen(), t && t();
    }), i = (a) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", a), t ? t(a) : this.maybeReconnectOnOpen();
    }, o = ln(n, "error", i);
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
      ln(t, "ping", this.onping.bind(this)),
      ln(t, "data", this.ondata.bind(this)),
      ln(t, "error", this.onerror.bind(this)),
      ln(t, "close", this.onclose.bind(this)),
      // @ts-ignore
      ln(this.decoder, "decoded", this.ondecoded.bind(this))
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
    qi(() => {
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
    return s ? this._autoConnect && !s.active && s.connect() : (s = new Wu(this, t, n), this.nsps[t] = s), s;
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
const dr = {};
function pi(e, t) {
  typeof e == "object" && (t = e, e = void 0), t = t || {};
  const n = _g(e, t.path || "/socket.io"), s = n.source, r = n.id, i = n.path, o = dr[r] && i in dr[r].nsps, a = t.forceNew || t["force new connection"] || t.multiplex === !1 || o;
  let l;
  return a ? l = new Xo(s, t) : (dr[r] || (dr[r] = new Xo(s, t)), l = dr[r]), n.query && !t.query && (t.query = n.queryKey), l.socket(n.path, t);
}
Object.assign(pi, {
  Manager: Xo,
  Socket: Wu,
  io: pi,
  connect: pi
});
const Ia = "ctid", Ig = "identity_expired", sc = 0.8, Lg = 720 * 60 * 1e3, Ao = 30 * 1e3, So = 1e3, qs = (e) => {
  if (typeof e != "string") return e ? String(e) : null;
  const t = e.trim();
  return !t || t === "undefined" || t === "null" ? null : t;
}, mi = (e) => {
  const t = qs(e);
  if (!t) return null;
  const [, n] = t.split(".");
  if (!n) return null;
  try {
    const s = atob(n.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(s);
  } catch {
    return null;
  }
}, Og = () => {
  try {
    return qs(localStorage.getItem(Ia));
  } catch {
    return null;
  }
}, rc = (e) => {
  try {
    localStorage.setItem(Ia, e);
  } catch {
  }
}, Ng = () => {
  try {
    localStorage.removeItem(Ia);
  } catch {
  }
};
function Pg(e = {}) {
  const t = ce(null);
  let n = null, s = null;
  const r = () => {
    n && (clearTimeout(n), n = null);
  }, i = () => {
    const L = mi(t.value);
    return L != null && L.exp ? Number(L.exp) - Math.floor(Date.now() / So) : null;
  }, o = () => {
    const L = mi(t.value);
    if (!(L != null && L.exp)) return !1;
    const K = L.iat ? Number(L.exp) - Number(L.iat) : 0, D = i() ?? 0;
    return K <= 0 ? D <= 0 : D <= K * (1 - sc);
  }, a = (L, { persist: K = !0 } = {}) => {
    var ie;
    const D = qs(L);
    if (r(), t.value = D, !D) {
      Ng();
      return;
    }
    K && (rc(D), (ie = e.onTokenChanged) == null || ie.call(e, D)), c();
  }, l = async (L) => {
    if (!t.value || !L) return !1;
    if (s) return s;
    const K = t.value;
    return s = (async () => {
      var D, ie;
      try {
        const fe = await fetch(`${Vs.API_URL}/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${K}`
          },
          body: JSON.stringify({ widget_id: L })
        });
        if (fe.status === 401)
          return (D = e.onIdentityExpired) == null || D.call(e), !1;
        if (!fe.ok)
          return c(Ao), !1;
        const pe = await fe.json(), R = qs((ie = pe == null ? void 0 : pe.data) == null ? void 0 : ie.token);
        return R ? (a(R), !0) : !1;
      } catch {
        return c(Ao), !1;
      } finally {
        s = null;
      }
    })(), s;
  }, d = async (L) => t.value ? o() ? l(L) : !0 : !1, c = (L) => {
    r();
    const K = mi(t.value);
    if (!(K != null && K.exp) || !(K != null && K.iat)) return;
    const D = (Number(K.exp) - Number(K.iat)) * So, ie = (i() ?? 0) * So, fe = L ?? Math.min(
      Lg,
      Math.max(0, ie - D * (1 - sc))
    );
    n = setTimeout(() => {
      n = null, d(v).then((pe) => {
        c(pe ? void 0 : Ao);
      });
    }, fe);
  };
  let v = "";
  return {
    token: t,
    start: (L, K) => {
      v = L;
      const D = qs(K) || Og();
      a(D, { persist: !1 }), D && rc(D);
    },
    stop: () => {
      r(), s = null;
    },
    setToken: a,
    ensureFresh: d
  };
}
const Mg = 5e3;
function Dg() {
  const e = ce([]), t = ce(!1), n = ce(""), s = ce(!1), r = ce(!1), i = ce(!1), o = ce("connecting"), a = ce(0), l = 5, d = ce({}), c = ce(null), v = ce("");
  let w = null;
  const U = 6e4, L = () => {
    t.value = !1, w && (clearTimeout(w), w = null);
  }, K = () => {
    t.value = !0, w && clearTimeout(w), w = setTimeout(L, U);
  };
  let D = null;
  const ie = 1e3, fe = 15e3;
  let pe = null;
  const R = /* @__PURE__ */ new Set(["ai_config_missing"]);
  let M = !1;
  const Y = () => {
    pe && (clearTimeout(pe), pe = null);
  }, X = () => {
    if (pe || M) return;
    const T = Math.min(
      ie * 2 ** Math.max(0, a.value - 1),
      fe
    );
    pe = setTimeout(() => {
      pe = null, D == null || D.connect();
    }, T);
  };
  let _e = null, Re = null, be = null, Be = null, ve = null, Je, We, nt;
  const he = (T) => {
    var I;
    return (I = mi(T ?? null)) == null ? void 0 : I.sub;
  }, we = (T) => {
    Je = T, T && D != null && D.connected && D.emit("refresh_token", { conversation_token: T });
  }, me = (T) => {
    We = T;
  }, Ge = () => {
    var j;
    const T = Je || localStorage.getItem("ctid"), I = {};
    T && (I.conversation_token = T), We && (I.widget_id = We);
    try {
      I.page_url = window.parent !== window && ((j = window.parent.location) != null && j.href) ? window.parent.location.href : document.referrer || window.location.href;
    } catch {
      I.page_url = document.referrer || "";
    }
    return I;
  }, Ae = (T) => (D = pi(`${Vs.WS_URL}/widget`, {
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
    auth: (I) => I(Ge())
  }), D.on("connect", () => {
    nt = he(Ge().conversation_token), o.value = "connected", Y(), a.value = 0;
  }), D.on("bot_typing", () => {
    K();
  }), D.on("disconnect", () => {
    L(), o.value === "connected" && (console.log("Socket disconnected, setting connection status to connecting"), o.value = "connecting");
  }), D.on("connect_error", () => {
    a.value++, console.error("Socket connection failed, attempt:", a.value), a.value >= l && (o.value = "failed"), D && !D.active && X();
  }), D.on("chat_response", (I) => {
    if (L(), I.session_id ? (console.log("Captured session_id from chat_response:", I.session_id), v.value = I.session_id) : console.warn("No session_id in chat_response data:", I), I.type === "agent_message") {
      const j = {
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
      I.attachments && Array.isArray(I.attachments) && (j.id = I.message_id, j.attachments = I.attachments.map((J, ue) => ({
        id: I.message_id * 1e3 + ue,
        filename: J.filename,
        file_url: J.file_url,
        content_type: J.content_type,
        file_size: J.file_size
      }))), e.value.push(j);
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
    }), d.value = {
      ...d.value,
      human_agent_name: I.user_name,
      human_agent_profile_pic: I.profile_picture
    }, L(), _e && _e(I);
  }), D.on("session_initialized", (I) => {
    I.session_id && (v.value = I.session_id, ve = {
      session_id: I.session_id,
      authenticated: !!I.authenticated,
      created: !!I.created
    }, Be == null || Be(ve));
  }), D.on("error", At), D.on("chat_history", St), D.on("rating_submitted", $t), D.on("display_form", wt), D.on("form_submitted", Tn), D.on("workflow_state", g), D.on("workflow_proceeded", y), D), st = async () => {
    try {
      return D != null && D.connected && nt && nt === he(Ge().conversation_token) ? (o.value = "connected", !0) : (o.value = "connecting", a.value = 0, L(), Y(), M = !1, D && (D.removeAllListeners(), D.disconnect(), D = null), D = Ae(""), new Promise((T) => {
        D == null || D.on("connect", () => {
          T(!0);
        }), D == null || D.on("connect_error", () => {
          a.value >= l && T(!1);
        });
      }));
    } catch (T) {
      return console.error("Socket initialization failed:", T), o.value = "failed", !1;
    }
  }, Ie = () => (D && D.disconnect(), st()), ft = (T) => {
    _e = T;
  }, Wt = (T) => {
    Be = T, ve && T(ve);
  }, Ee = (T) => {
    Re = T;
  }, gt = (T) => {
    be = T;
  }, At = (T) => {
    L(), n.value = Id(T), s.value = !0, R.has(T == null ? void 0 : T.type) && (M = !0, Y()), setTimeout(() => {
      s.value = !1, n.value = "";
    }, 5e3);
  }, St = (T) => {
    if (T.type === "chat_history" && Array.isArray(T.messages)) {
      const I = T.messages.map((j) => {
        var ue, re;
        const J = {
          message: j.message,
          message_type: j.message_type,
          created_at: j.created_at,
          session_id: "",
          agent_name: j.agent_name || "",
          user_name: j.user_name || "",
          attributes: j.attributes || {},
          attachments: j.attachments || []
          // Include attachments
        };
        return Array.isArray((ue = j.attributes) == null ? void 0 : ue.sources) && j.attributes.sources.length && (J.sources = j.attributes.sources), (re = j.attributes) != null && re.shopify_output && typeof j.attributes.shopify_output == "object" ? {
          ...J,
          message_type: "product",
          shopify_output: j.attributes.shopify_output
        } : J;
      });
      e.value = [
        ...I.filter(
          (j) => !e.value.some(
            (J) => J.message === j.message && J.created_at === j.created_at
          )
        ),
        ...e.value
      ];
    }
  }, $t = (T) => {
    T.success && e.value.push({
      message: "Thank you for your feedback!",
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    });
  }, wt = (T) => {
    var I;
    console.log("Form display handler in composable:", T), L(), c.value = T.form_data, console.log("Set currentForm in handleDisplayForm:", c.value), ((I = T.form_data) == null ? void 0 : I.form_full_screen) === !0 ? (console.log("Full screen form detected, triggering workflow state callback"), Re && Re({
      type: "form",
      form_data: T.form_data,
      session_id: T.session_id
    })) : e.value.push({
      message: "",
      message_type: "form",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: T.session_id,
      attributes: {
        form_data: T.form_data
      }
    });
  }, Tn = (T) => {
    console.log("Form submitted confirmation received, clearing currentForm"), c.value = null, T.success && console.log("Form submitted successfully");
  }, g = (T) => {
    console.log("Workflow state received in composable:", T), (T.type === "form" || T.type === "display_form") && (console.log("Setting currentForm from workflow state:", T.form_data), c.value = T.form_data), Re && Re(T);
  }, y = (T) => {
    console.log("Workflow proceeded in composable:", T), be && be(T);
  }, C = async (T, I) => {
    !D || !T || D.emit("submit_rating", {
      rating: T,
      feedback: I
    });
  }, N = async (T) => {
    var J;
    if (console.log("Submitting form in socket:", T), console.log("Current form in socket:", c.value), console.log("Socket in socket:", D), !D) {
      console.error("No socket available for form submission");
      return;
    }
    if (!T || Object.keys(T).length === 0) {
      console.error("No form data to submit");
      return;
    }
    const j = ((J = c.value) == null ? void 0 : J.form_type) === "contact" ? "submit_contact_info" : "submit_form";
    console.log(`Emitting ${j} event with data:`, T), D.emit(j, {
      form_data: T
    }), c.value = null;
  }, $ = async () => {
    D && (console.log("Getting workflow state 12"), D.emit("get_workflow_state"));
  }, P = async () => {
    D && D.emit("proceed_workflow", {});
  }, G = async (T, I, j = []) => {
    if (!D || !T.trim() && j.length === 0) return;
    const J = {
      message: T,
      message_type: "user",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    };
    j.length > 0 && (J.attachments = j.map((ue, re) => {
      let Ne = "";
      if (ue.content_type.startsWith("image/")) {
        const Te = atob(ue.content), Qe = new Array(Te.length);
        for (let O = 0; O < Te.length; O++)
          Qe[O] = Te.charCodeAt(O);
        const h = new Uint8Array(Qe), _ = new Blob([h], { type: ue.content_type });
        Ne = URL.createObjectURL(_);
      }
      return {
        id: Date.now() * 1e3 + re,
        // Temporary ID
        filename: ue.filename,
        file_url: Ne,
        // Temporary blob URL, will be replaced
        content_type: ue.content_type,
        file_size: ue.size,
        _isTemporary: !0
        // Flag to identify temporary attachments
      };
    })), e.value.push(J), D.emit("chat", {
      message: T,
      email: I,
      files: j
      // Send files with base64 content
    }), i.value = !0;
  }, W = () => {
    e.value = [], i.value = !1, v.value = "", L(), c.value = null;
  };
  return {
    messages: e,
    loading: t,
    errorMessage: n,
    showError: s,
    loadingHistory: r,
    hasStartedChat: i,
    connectionStatus: o,
    sendMessage: G,
    endChat: (T = "CUSTOMER_REQUEST") => new Promise((I) => {
      if (!D || !D.connected) {
        I(!1);
        return;
      }
      let j = !1;
      const J = (Te) => {
        j || (j = !0, clearTimeout(Ne), D == null || D.off("chat_ended", ue), D == null || D.off("error", re), Te && W(), I(Te));
      }, ue = () => J(!0), re = (Te) => {
        (Te == null ? void 0 : Te.type) === "end_chat_error" && J(!1);
      }, Ne = setTimeout(() => J(!1), Mg);
      D.on("chat_ended", ue), D.on("error", re), D.emit("end_chat", { reason: T });
    }),
    loadChatHistory: async () => {
      if (D)
        try {
          r.value = !0, D.emit("get_chat_history");
        } catch (T) {
          console.error("Failed to load chat history:", T);
        } finally {
          r.value = !1;
        }
    },
    connect: st,
    reconnect: Ie,
    cleanup: () => {
      L(), Y(), D && (D.removeAllListeners(), D.disconnect(), D = null), _e = null, Re = null, be = null;
    },
    humanAgent: d,
    onTakeover: ft,
    onSessionState: Wt,
    submitRating: C,
    currentForm: c,
    submitForm: N,
    getWorkflowState: $,
    proceedWorkflow: P,
    onWorkflowState: Ee,
    onWorkflowProceeded: gt,
    currentSessionId: v,
    setToken: we,
    setWidgetId: me
  };
}
function Fg(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Eo = { exports: {} }, ic;
function $g() {
  return ic || (ic = 1, function(e) {
    (function() {
      function t(h, _, O) {
        return h.call.apply(h.bind, arguments);
      }
      function n(h, _, O) {
        if (!h) throw Error();
        if (2 < arguments.length) {
          var A = Array.prototype.slice.call(arguments, 2);
          return function() {
            var q = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(q, A), h.apply(_, q);
          };
        }
        return function() {
          return h.apply(_, arguments);
        };
      }
      function s(h, _, O) {
        return s = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? t : n, s.apply(null, arguments);
      }
      var r = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function i(h, _) {
        this.a = h, this.o = _ || h, this.c = this.o.document;
      }
      var o = !!window.FontFace;
      function a(h, _, O, A) {
        if (_ = h.c.createElement(_), O) for (var q in O) O.hasOwnProperty(q) && (q == "style" ? _.style.cssText = O[q] : _.setAttribute(q, O[q]));
        return A && _.appendChild(h.c.createTextNode(A)), _;
      }
      function l(h, _, O) {
        h = h.c.getElementsByTagName(_)[0], h || (h = document.documentElement), h.insertBefore(O, h.lastChild);
      }
      function d(h) {
        h.parentNode && h.parentNode.removeChild(h);
      }
      function c(h, _, O) {
        _ = _ || [], O = O || [];
        for (var A = h.className.split(/\s+/), q = 0; q < _.length; q += 1) {
          for (var Z = !1, oe = 0; oe < A.length; oe += 1) if (_[q] === A[oe]) {
            Z = !0;
            break;
          }
          Z || A.push(_[q]);
        }
        for (_ = [], q = 0; q < A.length; q += 1) {
          for (Z = !1, oe = 0; oe < O.length; oe += 1) if (A[q] === O[oe]) {
            Z = !0;
            break;
          }
          Z || _.push(A[q]);
        }
        h.className = _.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function v(h, _) {
        for (var O = h.className.split(/\s+/), A = 0, q = O.length; A < q; A++) if (O[A] == _) return !0;
        return !1;
      }
      function w(h) {
        return h.o.location.hostname || h.a.location.hostname;
      }
      function U(h, _, O) {
        function A() {
          Le && q && Z && (Le(oe), Le = null);
        }
        _ = a(h, "link", { rel: "stylesheet", href: _, media: "all" });
        var q = !1, Z = !0, oe = null, Le = O || null;
        o ? (_.onload = function() {
          q = !0, A();
        }, _.onerror = function() {
          q = !0, oe = Error("Stylesheet failed to load"), A();
        }) : setTimeout(function() {
          q = !0, A();
        }, 0), l(h, "head", _);
      }
      function L(h, _, O, A) {
        var q = h.c.getElementsByTagName("head")[0];
        if (q) {
          var Z = a(h, "script", { src: _ }), oe = !1;
          return Z.onload = Z.onreadystatechange = function() {
            oe || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (oe = !0, O && O(null), Z.onload = Z.onreadystatechange = null, Z.parentNode.tagName == "HEAD" && q.removeChild(Z));
          }, q.appendChild(Z), setTimeout(function() {
            oe || (oe = !0, O && O(Error("Script load timeout")));
          }, A || 5e3), Z;
        }
        return null;
      }
      function K() {
        this.a = 0, this.c = null;
      }
      function D(h) {
        return h.a++, function() {
          h.a--, fe(h);
        };
      }
      function ie(h, _) {
        h.c = _, fe(h);
      }
      function fe(h) {
        h.a == 0 && h.c && (h.c(), h.c = null);
      }
      function pe(h) {
        this.a = h || "-";
      }
      pe.prototype.c = function(h) {
        for (var _ = [], O = 0; O < arguments.length; O++) _.push(arguments[O].replace(/[\W_]+/g, "").toLowerCase());
        return _.join(this.a);
      };
      function R(h, _) {
        this.c = h, this.f = 4, this.a = "n";
        var O = (_ || "n4").match(/^([nio])([1-9])$/i);
        O && (this.a = O[1], this.f = parseInt(O[2], 10));
      }
      function M(h) {
        return _e(h) + " " + (h.f + "00") + " 300px " + Y(h.c);
      }
      function Y(h) {
        var _ = [];
        h = h.split(/,\s*/);
        for (var O = 0; O < h.length; O++) {
          var A = h[O].replace(/['"]/g, "");
          A.indexOf(" ") != -1 || /^\d/.test(A) ? _.push("'" + A + "'") : _.push(A);
        }
        return _.join(",");
      }
      function X(h) {
        return h.a + h.f;
      }
      function _e(h) {
        var _ = "normal";
        return h.a === "o" ? _ = "oblique" : h.a === "i" && (_ = "italic"), _;
      }
      function Re(h) {
        var _ = 4, O = "n", A = null;
        return h && ((A = h.match(/(normal|oblique|italic)/i)) && A[1] && (O = A[1].substr(0, 1).toLowerCase()), (A = h.match(/([1-9]00|normal|bold)/i)) && A[1] && (/bold/i.test(A[1]) ? _ = 7 : /[1-9]00/.test(A[1]) && (_ = parseInt(A[1].substr(0, 1), 10)))), O + _;
      }
      function be(h, _) {
        this.c = h, this.f = h.o.document.documentElement, this.h = _, this.a = new pe("-"), this.j = _.events !== !1, this.g = _.classes !== !1;
      }
      function Be(h) {
        h.g && c(h.f, [h.a.c("wf", "loading")]), Je(h, "loading");
      }
      function ve(h) {
        if (h.g) {
          var _ = v(h.f, h.a.c("wf", "active")), O = [], A = [h.a.c("wf", "loading")];
          _ || O.push(h.a.c("wf", "inactive")), c(h.f, O, A);
        }
        Je(h, "inactive");
      }
      function Je(h, _, O) {
        h.j && h.h[_] && (O ? h.h[_](O.c, X(O)) : h.h[_]());
      }
      function We() {
        this.c = {};
      }
      function nt(h, _, O) {
        var A = [], q;
        for (q in _) if (_.hasOwnProperty(q)) {
          var Z = h.c[q];
          Z && A.push(Z(_[q], O));
        }
        return A;
      }
      function he(h, _) {
        this.c = h, this.f = _, this.a = a(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function we(h) {
        l(h.c, "body", h.a);
      }
      function me(h) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + Y(h.c) + ";" + ("font-style:" + _e(h) + ";font-weight:" + (h.f + "00") + ";");
      }
      function Ge(h, _, O, A, q, Z) {
        this.g = h, this.j = _, this.a = A, this.c = O, this.f = q || 3e3, this.h = Z || void 0;
      }
      Ge.prototype.start = function() {
        var h = this.c.o.document, _ = this, O = r(), A = new Promise(function(oe, Le) {
          function ke() {
            r() - O >= _.f ? Le() : h.fonts.load(M(_.a), _.h).then(function(Ye) {
              1 <= Ye.length ? oe() : setTimeout(ke, 25);
            }, function() {
              Le();
            });
          }
          ke();
        }), q = null, Z = new Promise(function(oe, Le) {
          q = setTimeout(Le, _.f);
        });
        Promise.race([Z, A]).then(function() {
          q && (clearTimeout(q), q = null), _.g(_.a);
        }, function() {
          _.j(_.a);
        });
      };
      function Ae(h, _, O, A, q, Z, oe) {
        this.v = h, this.B = _, this.c = O, this.a = A, this.s = oe || "BESbswy", this.f = {}, this.w = q || 3e3, this.u = Z || null, this.m = this.j = this.h = this.g = null, this.g = new he(this.c, this.s), this.h = new he(this.c, this.s), this.j = new he(this.c, this.s), this.m = new he(this.c, this.s), h = new R(this.a.c + ",serif", X(this.a)), h = me(h), this.g.a.style.cssText = h, h = new R(this.a.c + ",sans-serif", X(this.a)), h = me(h), this.h.a.style.cssText = h, h = new R("serif", X(this.a)), h = me(h), this.j.a.style.cssText = h, h = new R("sans-serif", X(this.a)), h = me(h), this.m.a.style.cssText = h, we(this.g), we(this.h), we(this.j), we(this.m);
      }
      var st = { D: "serif", C: "sans-serif" }, Ie = null;
      function ft() {
        if (Ie === null) {
          var h = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          Ie = !!h && (536 > parseInt(h[1], 10) || parseInt(h[1], 10) === 536 && 11 >= parseInt(h[2], 10));
        }
        return Ie;
      }
      Ae.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = r(), Ee(this);
      };
      function Wt(h, _, O) {
        for (var A in st) if (st.hasOwnProperty(A) && _ === h.f[st[A]] && O === h.f[st[A]]) return !0;
        return !1;
      }
      function Ee(h) {
        var _ = h.g.a.offsetWidth, O = h.h.a.offsetWidth, A;
        (A = _ === h.f.serif && O === h.f["sans-serif"]) || (A = ft() && Wt(h, _, O)), A ? r() - h.A >= h.w ? ft() && Wt(h, _, O) && (h.u === null || h.u.hasOwnProperty(h.a.c)) ? At(h, h.v) : At(h, h.B) : gt(h) : At(h, h.v);
      }
      function gt(h) {
        setTimeout(s(function() {
          Ee(this);
        }, h), 50);
      }
      function At(h, _) {
        setTimeout(s(function() {
          d(this.g.a), d(this.h.a), d(this.j.a), d(this.m.a), _(this.a);
        }, h), 0);
      }
      function St(h, _, O) {
        this.c = h, this.a = _, this.f = 0, this.m = this.j = !1, this.s = O;
      }
      var $t = null;
      St.prototype.g = function(h) {
        var _ = this.a;
        _.g && c(_.f, [_.a.c("wf", h.c, X(h).toString(), "active")], [_.a.c("wf", h.c, X(h).toString(), "loading"), _.a.c("wf", h.c, X(h).toString(), "inactive")]), Je(_, "fontactive", h), this.m = !0, wt(this);
      }, St.prototype.h = function(h) {
        var _ = this.a;
        if (_.g) {
          var O = v(_.f, _.a.c("wf", h.c, X(h).toString(), "active")), A = [], q = [_.a.c("wf", h.c, X(h).toString(), "loading")];
          O || A.push(_.a.c("wf", h.c, X(h).toString(), "inactive")), c(_.f, A, q);
        }
        Je(_, "fontinactive", h), wt(this);
      };
      function wt(h) {
        --h.f == 0 && h.j && (h.m ? (h = h.a, h.g && c(h.f, [h.a.c("wf", "active")], [h.a.c("wf", "loading"), h.a.c("wf", "inactive")]), Je(h, "active")) : ve(h.a));
      }
      function Tn(h) {
        this.j = h, this.a = new We(), this.h = 0, this.f = this.g = !0;
      }
      Tn.prototype.load = function(h) {
        this.c = new i(this.j, h.context || this.j), this.g = h.events !== !1, this.f = h.classes !== !1, y(this, new be(this.c, h), h);
      };
      function g(h, _, O, A, q) {
        var Z = --h.h == 0;
        (h.f || h.g) && setTimeout(function() {
          var oe = q || null, Le = A || null || {};
          if (O.length === 0 && Z) ve(_.a);
          else {
            _.f += O.length, Z && (_.j = Z);
            var ke, Ye = [];
            for (ke = 0; ke < O.length; ke++) {
              var Pe = O[ke], rt = Le[Pe.c], Et = _.a, Bt = Pe;
              if (Et.g && c(Et.f, [Et.a.c("wf", Bt.c, X(Bt).toString(), "loading")]), Je(Et, "fontloading", Bt), Et = null, $t === null) if (window.FontFace) {
                var Bt = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), es = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                $t = Bt ? 42 < parseInt(Bt[1], 10) : !es;
              } else $t = !1;
              $t ? Et = new Ge(s(_.g, _), s(_.h, _), _.c, Pe, _.s, rt) : Et = new Ae(s(_.g, _), s(_.h, _), _.c, Pe, _.s, oe, rt), Ye.push(Et);
            }
            for (ke = 0; ke < Ye.length; ke++) Ye[ke].start();
          }
        }, 0);
      }
      function y(h, _, O) {
        var q = [], A = O.timeout;
        Be(_);
        var q = nt(h.a, O, h.c), Z = new St(h.c, _, A);
        for (h.h = q.length, _ = 0, O = q.length; _ < O; _++) q[_].load(function(oe, Le, ke) {
          g(h, Z, oe, Le, ke);
        });
      }
      function C(h, _) {
        this.c = h, this.a = _;
      }
      C.prototype.load = function(h) {
        function _() {
          if (Z["__mti_fntLst" + A]) {
            var oe = Z["__mti_fntLst" + A](), Le = [], ke;
            if (oe) for (var Ye = 0; Ye < oe.length; Ye++) {
              var Pe = oe[Ye].fontfamily;
              oe[Ye].fontStyle != null && oe[Ye].fontWeight != null ? (ke = oe[Ye].fontStyle + oe[Ye].fontWeight, Le.push(new R(Pe, ke))) : Le.push(new R(Pe));
            }
            h(Le);
          } else setTimeout(function() {
            _();
          }, 50);
        }
        var O = this, A = O.a.projectId, q = O.a.version;
        if (A) {
          var Z = O.c.o;
          L(this.c, (O.a.api || "https://fast.fonts.net/jsapi") + "/" + A + ".js" + (q ? "?v=" + q : ""), function(oe) {
            oe ? h([]) : (Z["__MonotypeConfiguration__" + A] = function() {
              return O.a;
            }, _());
          }).id = "__MonotypeAPIScript__" + A;
        } else h([]);
      };
      function N(h, _) {
        this.c = h, this.a = _;
      }
      N.prototype.load = function(h) {
        var _, O, A = this.a.urls || [], q = this.a.families || [], Z = this.a.testStrings || {}, oe = new K();
        for (_ = 0, O = A.length; _ < O; _++) U(this.c, A[_], D(oe));
        var Le = [];
        for (_ = 0, O = q.length; _ < O; _++) if (A = q[_].split(":"), A[1]) for (var ke = A[1].split(","), Ye = 0; Ye < ke.length; Ye += 1) Le.push(new R(A[0], ke[Ye]));
        else Le.push(new R(A[0]));
        ie(oe, function() {
          h(Le, Z);
        });
      };
      function $(h, _) {
        h ? this.c = h : this.c = P, this.a = [], this.f = [], this.g = _ || "";
      }
      var P = "https://fonts.googleapis.com/css";
      function G(h, _) {
        for (var O = _.length, A = 0; A < O; A++) {
          var q = _[A].split(":");
          q.length == 3 && h.f.push(q.pop());
          var Z = "";
          q.length == 2 && q[1] != "" && (Z = ":"), h.a.push(q.join(Z));
        }
      }
      function W(h) {
        if (h.a.length == 0) throw Error("No fonts to load!");
        if (h.c.indexOf("kit=") != -1) return h.c;
        for (var _ = h.a.length, O = [], A = 0; A < _; A++) O.push(h.a[A].replace(/ /g, "+"));
        return _ = h.c + "?family=" + O.join("%7C"), 0 < h.f.length && (_ += "&subset=" + h.f.join(",")), 0 < h.g.length && (_ += "&text=" + encodeURIComponent(h.g)), _;
      }
      function z(h) {
        this.f = h, this.a = [], this.c = {};
      }
      var H = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, ee = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, T = { i: "i", italic: "i", n: "n", normal: "n" }, I = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function j(h) {
        for (var _ = h.f.length, O = 0; O < _; O++) {
          var A = h.f[O].split(":"), q = A[0].replace(/\+/g, " "), Z = ["n4"];
          if (2 <= A.length) {
            var oe, Le = A[1];
            if (oe = [], Le) for (var Le = Le.split(","), ke = Le.length, Ye = 0; Ye < ke; Ye++) {
              var Pe;
              if (Pe = Le[Ye], Pe.match(/^[\w-]+$/)) {
                var rt = I.exec(Pe.toLowerCase());
                if (rt == null) Pe = "";
                else {
                  if (Pe = rt[2], Pe = Pe == null || Pe == "" ? "n" : T[Pe], rt = rt[1], rt == null || rt == "") rt = "4";
                  else var Et = ee[rt], rt = Et || (isNaN(rt) ? "4" : rt.substr(0, 1));
                  Pe = [Pe, rt].join("");
                }
              } else Pe = "";
              Pe && oe.push(Pe);
            }
            0 < oe.length && (Z = oe), A.length == 3 && (A = A[2], oe = [], A = A ? A.split(",") : oe, 0 < A.length && (A = H[A[0]]) && (h.c[q] = A));
          }
          for (h.c[q] || (A = H[q]) && (h.c[q] = A), A = 0; A < Z.length; A += 1) h.a.push(new R(q, Z[A]));
        }
      }
      function J(h, _) {
        this.c = h, this.a = _;
      }
      var ue = { Arimo: !0, Cousine: !0, Tinos: !0 };
      J.prototype.load = function(h) {
        var _ = new K(), O = this.c, A = new $(this.a.api, this.a.text), q = this.a.families;
        G(A, q);
        var Z = new z(q);
        j(Z), U(O, W(A), D(_)), ie(_, function() {
          h(Z.a, Z.c, ue);
        });
      };
      function re(h, _) {
        this.c = h, this.a = _;
      }
      re.prototype.load = function(h) {
        var _ = this.a.id, O = this.c.o;
        _ ? L(this.c, (this.a.api || "https://use.typekit.net") + "/" + _ + ".js", function(A) {
          if (A) h([]);
          else if (O.Typekit && O.Typekit.config && O.Typekit.config.fn) {
            A = O.Typekit.config.fn;
            for (var q = [], Z = 0; Z < A.length; Z += 2) for (var oe = A[Z], Le = A[Z + 1], ke = 0; ke < Le.length; ke++) q.push(new R(oe, Le[ke]));
            try {
              O.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            h(q);
          }
        }, 2e3) : h([]);
      };
      function Ne(h, _) {
        this.c = h, this.f = _, this.a = [];
      }
      Ne.prototype.load = function(h) {
        var _ = this.f.id, O = this.c.o, A = this;
        _ ? (O.__webfontfontdeckmodule__ || (O.__webfontfontdeckmodule__ = {}), O.__webfontfontdeckmodule__[_] = function(q, Z) {
          for (var oe = 0, Le = Z.fonts.length; oe < Le; ++oe) {
            var ke = Z.fonts[oe];
            A.a.push(new R(ke.name, Re("font-weight:" + ke.weight + ";font-style:" + ke.style)));
          }
          h(A.a);
        }, L(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + w(this.c) + "/" + _ + ".js", function(q) {
          q && h([]);
        })) : h([]);
      };
      var Te = new Tn(window);
      Te.a.c.custom = function(h, _) {
        return new N(_, h);
      }, Te.a.c.fontdeck = function(h, _) {
        return new Ne(_, h);
      }, Te.a.c.monotype = function(h, _) {
        return new C(_, h);
      }, Te.a.c.typekit = function(h, _) {
        return new re(_, h);
      }, Te.a.c.google = function(h, _) {
        return new J(_, h);
      };
      var Qe = { load: s(Te.load, Te) };
      e.exports ? e.exports = Qe : (window.WebFont = Qe, window.WebFontConfig && Te.load(window.WebFontConfig));
    })();
  }(Eo)), Eo.exports;
}
var Bg = $g();
const Ug = /* @__PURE__ */ Fg(Bg), oc = [
  "Space Grotesk:400,500,600,700",
  "Instrument Sans:400,500,600",
  "JetBrains Mono:400,500,600"
], zg = (e) => {
  const t = [...oc], n = (e == null ? void 0 : e.split(",")[0].trim().replace(/['"]/g, "")) || "", s = oc.some(
    (r) => r.toLowerCase().startsWith(n.toLowerCase())
  );
  n && !s && t.push(n), Ug.load({
    google: { families: t },
    active: () => {
      if (!e) return;
      const r = document.querySelector(".chat-container");
      r && (r.style.fontFamily = e.includes(",") ? e : `"${e}", system-ui, sans-serif`);
    }
  });
};
function Hg() {
  const e = ce({}), t = ce(""), n = (r) => {
    var i;
    e.value = r, r.photo_url && (e.value.photo_url = r.photo_url), zg(r.font_family), Vn({
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
const Wg = 13, qg = 24;
function jg(e, t) {
  const n = Mi({}), s = [];
  let r = null;
  const i = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, o = (c) => {
    r || s.length === 0 || (r = setTimeout(a, c));
  }, a = () => {
    r = null;
    const c = s[0];
    if (c === void 0) return;
    const v = e.value[c], w = n[c], U = (v == null ? void 0 : v.message) ?? "";
    if (!w || !v) {
      s.shift(), o(0);
      return;
    }
    if (w.shown >= U.length) {
      w.done = !0, s.shift(), o(0);
      return;
    }
    w.shown += 1;
    const L = U[w.shown - 1];
    t == null || t(), o(L === " " ? qg : Wg);
  };
  Pt(() => e.value.length, (c, v) => {
    v !== void 0 && c < v && (Object.keys(n).forEach((w) => {
      delete n[Number(w)];
    }), s.length = 0);
    for (let w = v ?? 0; w < c; w++) {
      const U = e.value[w];
      if (!U || !U.stream || w in n) continue;
      const L = U.message ?? "";
      i || !L ? n[w] = { shown: L.length, done: !0 } : (n[w] = { shown: 0, done: !1 }, s.push(w));
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
  return Or(() => {
    r && clearTimeout(r);
  }), { displayText: l, isStreaming: d };
}
function Vg(e) {
  const t = ce(!0);
  let n = 0;
  const s = () => {
    Vn({ type: "UNREAD_COUNT", count: n });
  }, r = (i) => {
    var o;
    ((o = i == null ? void 0 : i.data) == null ? void 0 : o.type) === "WIDGET_VISIBILITY" && (t.value = !!i.data.open, t.value && n !== 0 && (n = 0, s()));
  };
  Pt(() => e.value.length, (i, o) => {
    if (i <= (o ?? 0) || t.value) return;
    const a = e.value[i - 1];
    a && (a.message_type === "bot" || a.message_type === "agent") && (n += 1, s());
  }), $i(() => window.addEventListener("message", r)), Or(() => window.removeEventListener("message", r));
}
const Kg = {
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
}, Gg = {
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
}, Yg = {
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
}, Xg = {
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
}, Zg = {
  light: !0,
  mono: !1,
  radius: 28,
  bubble: 20,
  glow: "rgba(255,138,115,.30)",
  border: "rgba(0,0,0,.07)",
  card: "#FFFFFF",
  text: "#2A2730",
  muted: "#9A93A3",
  agentBg: "#F4F1F6",
  accent: "#FF8A73"
}, gi = {
  light: !0,
  mono: !1,
  radius: 24,
  bubble: 16,
  glow: "rgba(255,138,115,.22)",
  border: "rgba(0,0,0,.08)",
  card: "#FFFFFF",
  text: "#2A2A33",
  muted: "#8A8A99",
  agentBg: "#F3F3F6",
  accent: "#FF8A73"
}, Jg = {
  GLASS: Kg,
  AURORA: Gg,
  TERMINAL: Yg,
  CALM_MINT: Xg,
  PLAYFUL: Zg,
  SUNRISE: gi,
  CHATBOT: gi,
  ASK_ANYTHING: gi
}, Qg = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", ac = "'Instrument Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";
function e_(e) {
  return Math.max(4, Math.round(e * 0.3));
}
function lc(e) {
  const t = (e || "").replace("#", "");
  if (t.length < 6) return "#0B0C10";
  const n = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), r = parseInt(t.slice(4, 6), 16);
  return (0.299 * n + 0.587 * s + 0.114 * r) / 255 > 0.62 ? "#0B0C10" : "#FFFFFF";
}
function t_(e) {
  return Jg[e || ""] || gi;
}
const n_ = "#212529";
function s_(e, t) {
  const n = t_(e), s = (t == null ? void 0 : t.chat_background_color) || "", r = /^#[0-9a-fA-F]{6}$/.test(s), i = s || n.card, o = (t == null ? void 0 : t.chat_text_color) || "", l = /^#[0-9a-fA-F]{6}$/.test(o) && o.toLowerCase() !== n_ ? o : r ? Hs(s) ? "#FFFFFF" : "#111111" : n.text, d = r ? Hs(s) ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)" : n.muted, c = r ? Rd(s, 20) : n.agentBg, v = (t == null ? void 0 : t.accent_color) || n.accent, w = r ? !Hs(s) : n.light, U = lc(v) === "#0B0C10", L = w === U ? d : v, K = n.mono ? Qg : t != null && t.font_family ? `${t.font_family}, ${ac}` : ac;
  return {
    "--cm-card": i,
    "--cm-text": l,
    "--cm-muted": d,
    "--cm-agent-bg": c,
    "--cm-accent": v,
    "--cm-on-accent": lc(v),
    "--cm-presence": L,
    "--cm-border": n.border,
    "--cm-glow": n.glow,
    "--cm-radius": `${n.radius}px`,
    "--cm-bubble": `${n.bubble}px`,
    "--cm-bubble-tail": `${e_(n.bubble)}px`,
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
function r_() {
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
const i_ = {
  key: 0,
  class: "widget-unavailable-overlay"
}, o_ = {
  key: 1,
  class: "auth-error-overlay"
}, a_ = { class: "auth-error-card" }, l_ = { class: "auth-error-message" }, c_ = {
  key: 0,
  class: "initializing-overlay"
}, u_ = {
  key: 0,
  class: "connecting-message"
}, f_ = {
  key: 1,
  class: "failed-message"
}, h_ = { class: "welcome-content" }, d_ = { class: "welcome-header" }, p_ = ["src", "alt"], m_ = { class: "welcome-title" }, g_ = { class: "welcome-subtitle" }, __ = { class: "welcome-input-container" }, y_ = {
  key: 0,
  class: "email-input"
}, b_ = ["disabled"], v_ = { class: "welcome-message-input" }, w_ = ["placeholder", "disabled"], k_ = ["disabled"], T_ = {
  key: 0,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, x_ = {
  key: 1,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, A_ = { class: "landing-page-content" }, S_ = { class: "landing-page-header" }, E_ = { class: "landing-page-heading" }, C_ = { class: "landing-page-text" }, R_ = { class: "landing-page-actions" }, I_ = { class: "form-fullscreen-content" }, L_ = {
  key: 0,
  class: "form-header"
}, O_ = {
  key: 0,
  class: "form-title"
}, N_ = {
  key: 1,
  class: "form-description"
}, P_ = { class: "form-fields" }, M_ = ["for"], D_ = {
  key: 0,
  class: "required-indicator"
}, F_ = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "autocomplete", "inputmode"], $_ = ["id", "placeholder", "required", "min", "max", "value", "onInput"], B_ = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput"], U_ = ["id", "required", "value", "onChange"], z_ = { value: "" }, H_ = ["value"], W_ = {
  key: 4,
  class: "checkbox-field"
}, q_ = ["id", "required", "checked", "onChange"], j_ = { class: "checkbox-label" }, V_ = {
  key: 5,
  class: "radio-group"
}, K_ = ["name", "value", "required", "checked", "onChange"], G_ = { class: "radio-label" }, Y_ = {
  key: 6,
  class: "field-error"
}, X_ = { class: "form-actions" }, Z_ = ["disabled"], J_ = {
  key: 0,
  class: "loading-spinner-inline"
}, Q_ = { key: 1 }, ey = { class: "header-content" }, ty = ["src", "alt"], ny = { class: "header-info" }, sy = { class: "status" }, ry = { class: "status-text cm-presence" }, iy = { class: "header-actions" }, oy = ["disabled", "title", "aria-label", "aria-expanded"], ay = { class: "ask-anything-header" }, ly = ["src", "alt"], cy = { class: "header-info" }, uy = {
  key: 2,
  class: "loading-history"
}, fy = { class: "cm-email-gate-title" }, hy = ["disabled"], dy = {
  key: 0,
  class: "cm-email-gate-error"
}, py = ["disabled"], my = {
  key: 0,
  class: "cm-welcome-block"
}, gy = { class: "message agent-message cm-welcome-row" }, _y = ["src", "alt"], yy = {
  key: 0,
  class: "cm-msg-avatar",
  "aria-hidden": "true"
}, by = ["src"], vy = ["src"], wy = { class: "message-col" }, ky = {
  key: 0,
  class: "rating-content"
}, Ty = { class: "rating-prompt" }, xy = ["onMouseover", "onMouseleave", "onClick", "disabled"], Ay = {
  key: 0,
  class: "feedback-wrapper"
}, Sy = { class: "feedback-section" }, Ey = ["onUpdate:modelValue", "disabled"], Cy = { class: "feedback-counter" }, Ry = ["onClick", "disabled"], Iy = {
  key: 1,
  class: "submitted-feedback-wrapper"
}, Ly = { class: "submitted-feedback" }, Oy = { class: "submitted-feedback-text" }, Ny = {
  key: 2,
  class: "submitted-message"
}, Py = {
  key: 1,
  class: "form-content"
}, My = {
  key: 0,
  class: "form-header"
}, Dy = {
  key: 0,
  class: "form-title"
}, Fy = {
  key: 1,
  class: "form-description"
}, $y = { class: "form-fields" }, By = ["for"], Uy = {
  key: 0,
  class: "required-indicator"
}, zy = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "disabled", "autocomplete", "inputmode"], Hy = ["id", "placeholder", "required", "min", "max", "value", "onInput", "disabled"], Wy = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "disabled"], qy = ["id", "required", "value", "onChange", "disabled"], jy = { value: "" }, Vy = ["value"], Ky = {
  key: 4,
  class: "checkbox-field"
}, Gy = ["id", "checked", "onChange", "disabled"], Yy = ["for"], Xy = {
  key: 5,
  class: "radio-field"
}, Zy = ["id", "name", "value", "checked", "onChange", "disabled"], Jy = ["for"], Qy = {
  key: 6,
  class: "field-error"
}, eb = { class: "form-actions" }, tb = ["onClick", "disabled"], nb = {
  key: 2,
  class: "user-input-content"
}, sb = {
  key: 0,
  class: "user-input-prompt"
}, rb = {
  key: 1,
  class: "user-input-form"
}, ib = ["onUpdate:modelValue", "onKeydown"], ob = ["onClick", "disabled"], ab = {
  key: 2,
  class: "user-input-submitted"
}, lb = {
  key: 0,
  class: "user-input-confirmation"
}, cb = {
  key: 3,
  class: "product-message-container"
}, ub = ["innerHTML"], fb = {
  key: 1,
  class: "products-carousel"
}, hb = { class: "carousel-items" }, db = {
  key: 0,
  class: "product-image-compact"
}, pb = ["src", "alt"], mb = { class: "product-info-compact" }, gb = { class: "product-text-area" }, _b = { class: "product-title-compact" }, yb = {
  key: 0,
  class: "product-variant-compact"
}, bb = { class: "product-price-compact" }, vb = { class: "product-actions-compact" }, wb = ["onClick"], kb = {
  key: 2,
  class: "no-products-message"
}, Tb = {
  key: 3,
  class: "no-products-message"
}, xb = ["innerHTML"], Ab = ["innerHTML"], Sb = {
  key: 2,
  class: "message-attachments"
}, Eb = {
  key: 0,
  class: "attachment-image-container"
}, Cb = ["src", "alt", "onClick"], Rb = { class: "attachment-image-info" }, Ib = ["href"], Lb = { class: "attachment-size" }, Ob = ["href"], Nb = { class: "attachment-size" }, Pb = {
  key: 0,
  class: "citation-chips"
}, Mb = ["title"], Db = { class: "message-info" }, Fb = {
  key: 0,
  class: "agent-name"
}, $b = {
  key: 5,
  class: "cm-quick-actions-bar"
}, Bb = ["disabled", "onClick"], Ub = {
  key: 0,
  class: "file-previews-widget"
}, zb = {
  class: "file-preview-content-widget",
  style: { cursor: "pointer" }
}, Hb = ["src", "alt", "onClick"], Wb = ["onClick"], qb = { class: "file-preview-info-widget" }, jb = { class: "file-preview-name-widget" }, Vb = { class: "file-preview-size-widget" }, Kb = ["onClick"], Gb = {
  key: 1,
  class: "upload-progress-widget"
}, Yb = { class: "message-input" }, Xb = ["placeholder", "disabled"], Zb = ["disabled", "title"], Jb = ["disabled"], Qb = {
  key: 7,
  class: "new-conversation-section"
}, ev = { class: "conversation-ended-message" }, tv = {
  key: 8,
  class: "rating-dialog"
}, nv = { class: "rating-content" }, sv = { class: "star-rating" }, rv = ["onClick"], iv = { class: "rating-actions" }, ov = ["disabled"], av = {
  key: 0,
  class: "preview-modal-image-container"
}, lv = ["src", "alt"], cv = { class: "preview-modal-filename" }, uv = {
  key: 3,
  class: "widget-loading"
}, uc = 3, fv = "image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx,.xls", hv = /* @__PURE__ */ ua({
  __name: "WidgetBuilder",
  props: {
    widgetId: {},
    token: {},
    initialAuthError: {}
  },
  setup(e) {
    const t = e, n = de(() => {
      var f;
      return t.widgetId || ((f = window.__INITIAL_DATA__) == null ? void 0 : f.widgetId);
    }), {
      customization: s,
      agentName: r,
      applyCustomization: i,
      initializeFromData: o
    } = Hg(), { formatCurrency: a } = r_(), {
      messages: l,
      loading: d,
      errorMessage: c,
      showError: v,
      loadingHistory: w,
      hasStartedChat: U,
      connectionStatus: L,
      sendMessage: K,
      endChat: D,
      loadChatHistory: ie,
      connect: fe,
      reconnect: pe,
      cleanup: R,
      humanAgent: M,
      onTakeover: Y,
      submitRating: X,
      submitForm: _e,
      currentForm: Re,
      getWorkflowState: be,
      proceedWorkflow: Be,
      onWorkflowState: ve,
      onWorkflowProceeded: Je,
      currentSessionId: We,
      setToken: nt,
      setWidgetId: he,
      onSessionState: we
    } = Dg(), { displayText: me, isStreaming: Ge } = jg(l, () => bs(() => is()));
    Vg(l);
    const Ae = ce(""), st = ce(!0), Ie = ce(""), ft = ce(!1), Wt = (f) => {
      const m = f.target;
      Ae.value = m.value;
    };
    let Ee = null;
    const gt = () => {
      Ee && Ee.disconnect(), Ee = new MutationObserver((m) => {
        let u = !1, se = !1;
        m.forEach((Se) => {
          if (Se.type === "childList") {
            const ge = Array.from(Se.addedNodes).some(
              (Oe) => {
                var on;
                return Oe.nodeType === Node.ELEMENT_NODE && (Oe.matches("input, textarea") || ((on = Oe.querySelector) == null ? void 0 : on.call(Oe, "input, textarea")));
              }
            ), Ze = Array.from(Se.removedNodes).some(
              (Oe) => {
                var on;
                return Oe.nodeType === Node.ELEMENT_NODE && (Oe.matches("input, textarea") || ((on = Oe.querySelector) == null ? void 0 : on.call(Oe, "input, textarea")));
              }
            );
            ge && (se = !0, u = !0), Ze && (u = !0);
          }
        }), u && (clearTimeout(gt.timeoutId), gt.timeoutId = setTimeout(() => {
          g();
        }, se ? 50 : 100));
      });
      const f = document.querySelector(".widget-container") || document.body;
      Ee.observe(f, {
        childList: !0,
        subtree: !0
      });
    };
    gt.timeoutId = null;
    let At = [];
    const St = /* @__PURE__ */ new Set();
    let $t = !1;
    const wt = (f) => {
      if ($t) return;
      const m = setTimeout(() => {
        St.delete(m), g();
      }, f);
      St.add(m);
    }, Tn = () => {
      St.forEach(clearTimeout), St.clear();
    }, g = () => {
      y();
      const f = [
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
      for (const u of f) {
        const se = document.querySelectorAll(u);
        if (se.length > 0) {
          m = Array.from(se);
          break;
        }
      }
      m.length !== 0 && (At = m, m.forEach((u) => {
        u.addEventListener("input", N, !0), u.addEventListener("keyup", N, !0), u.addEventListener("change", N, !0), u.addEventListener("keypress", $, !0), u.addEventListener("keydown", P, !0);
      }));
    }, y = () => {
      At.forEach((f) => {
        f.removeEventListener("input", N), f.removeEventListener("keyup", N), f.removeEventListener("change", N), f.removeEventListener("keypress", $), f.removeEventListener("keydown", P);
      }), At = [];
    }, C = (f) => !!(f && f.closest && f.closest(".form-message, .form-fullscreen, .cm-email-gate")), N = (f) => {
      if (C(f.target)) return;
      const m = f.target;
      Ae.value = m.value;
    }, $ = (f) => {
      C(f.target) || f.key === "Enter" && !f.shiftKey && (f.preventDefault(), f.stopPropagation(), Ut());
    }, P = (f) => {
      C(f.target) || f.key === "Enter" && !f.shiftKey && (f.preventDefault(), f.stopPropagation(), Ut());
    }, G = (f) => {
      const m = f.target, u = document.querySelector(".header-menu-container");
      document.querySelector(".header-menu-btn");
      const se = document.querySelector(".header-dropdown-menu");
      se && !(u != null && u.contains(m)) && (se.style.display = "none");
    }, W = ce(!0), {
      token: z,
      start: H,
      stop: ee,
      setToken: T,
      ensureFresh: I
    } = Pg({
      onTokenChanged: (f) => {
        Vn({ type: "TOKEN_UPDATE", token: f }), nt(f);
      },
      onIdentityExpired: () => {
        Rs();
      }
    });
    de(() => !!z.value);
    const j = ce(null), J = ce(!1), ue = ce(!1);
    t.initialAuthError && (j.value = t.initialAuthError, J.value = !0, W.value = !1), o();
    const re = window.__INITIAL_DATA__;
    H((re == null ? void 0 : re.widgetId) || "", re == null ? void 0 : re.initialToken), z.value && (ft.value = !0);
    const Ne = ce(!1);
    (re == null ? void 0 : re.allowAttachments) !== void 0 && (Ne.value = re.allowAttachments);
    const Te = ce(null), {
      chatStyles: Qe,
      chatIconStyles: h,
      agentBubbleStyles: _,
      userBubbleStyles: O,
      messageNameStyles: A,
      headerBorderStyles: q,
      photoUrl: Z,
      shadowStyle: oe
    } = Nm(s), Le = ce(null), {
      uploadedAttachments: ke,
      previewModal: Ye,
      previewFile: Pe,
      formatFileSize: rt,
      isImageAttachment: Et,
      getDownloadUrl: Bt,
      getPreviewUrl: es,
      handleFileSelect: Gs,
      handleDrop: Ys,
      handleDragOver: ts,
      handleDragLeave: ns,
      handlePaste: qt,
      removeAttachment: Pn,
      openPreview: ss,
      closePreview: Mn,
      openFilePicker: Mr,
      isImage: Xs
    } = Dm(z, Le);
    de(() => l.value.some(
      (f) => f.message_type === "form" && (!f.isSubmitted || f.isSubmitted === !1)
    ));
    const un = de(() => {
      var f;
      return U.value && ft.value || !Qi.value ? L.value === "connected" && !d.value : ar(Ie.value.trim()) && L.value === "connected" && !d.value || ((f = window.__INITIAL_DATA__) == null ? void 0 : f.workflow);
    }), Dn = de(() => un.value || d.value && L.value === "connected" && U.value), rs = de(() => L.value === "connected" ? Qt.value ? "Ask me anything..." : "Type a message..." : "Connecting..."), Zs = ce(!1), Ut = async () => {
      if (!Ae.value.trim() && ke.value.length === 0) return;
      if (d.value && U.value) {
        Zs.value = !0;
        return;
      }
      !U.value && Ie.value && await Yt();
      const f = ke.value.map((u) => ({
        content: u.content,
        // base64 content
        filename: u.filename,
        content_type: u.type,
        size: u.size
      }));
      await K(Ae.value, Ie.value, f), ke.value.forEach((u) => {
        u.url && u.url.startsWith("blob:") && URL.revokeObjectURL(u.url), u.file_url && u.file_url.startsWith("blob:") && URL.revokeObjectURL(u.file_url);
      }), Ae.value = "", ke.value = [];
      const m = document.querySelector('input[placeholder*="Type a message"]');
      m && (m.value = ""), wt(500);
    };
    Pt(d, (f) => {
      f || !Zs.value || (Zs.value = !1, L.value === "connected" && U.value && Ut());
    });
    const Dr = (f) => {
      un.value && (Ae.value = f, Ut());
    }, ks = () => {
      Vn({ type: "WIDGET_MINIMIZE" });
    }, ot = (f) => {
      f.key === "Enter" && !f.shiftKey && (f.preventDefault(), f.stopPropagation(), Ut());
    }, Yt = async () => {
      var f, m, u, se;
      try {
        if (!n.value)
          return console.error("Widget ID is not available"), j.value = "Widget ID is not available. Please refresh and try again.", J.value = !0, !1;
        await I(n.value);
        const Se = new URL(`${Vs.API_URL}/widgets/${n.value}`);
        Ie.value.trim() && ar(Ie.value.trim()) && Se.searchParams.append("email", Ie.value.trim());
        const ge = {
          Accept: "application/json",
          "Content-Type": "application/json"
        };
        z.value && (ge.Authorization = `Bearer ${z.value}`);
        const Ze = await fetch(Se, {
          headers: ge
        });
        if (Ze.status === 401) {
          ft.value = !1;
          try {
            const zn = (await Ze.json()).detail;
            if ((zn == null ? void 0 : zn.code) === Ig)
              return Rs(), !1;
            const Os = typeof zn == "string" ? zn : "";
            (Os.includes("generate-token") || Os.includes("API key") || Os.includes("Token required")) && (ue.value = !0, j.value = "Widget authentication not configured. Please contact the website administrator.", J.value = !0, T(null));
          } catch {
            j.value = "Authentication required. Your token has expired or is invalid. Please refresh the page.", J.value = !0, T(null);
          }
          return !1;
        }
        if (!Ze.ok) {
          try {
            const sr = await Ze.json();
            j.value = sr.detail || `Error: ${Ze.statusText}`;
          } catch {
            j.value = `Error: ${Ze.statusText}. Please try again.`;
          }
          return J.value = !0, !1;
        }
        const Oe = await Ze.json();
        return Oe.token && T(Oe.token), ft.value = !0, j.value = null, J.value = !1, nt(z.value || void 0), await fe() || console.error("Chat service not reachable yet; retrying in the background"), await Vi(), (f = Oe.agent) != null && f.customization && i(Oe.agent.customization), Oe.agent && !(Oe != null && Oe.human_agent) && (r.value = Oe.agent.name), Oe != null && Oe.human_agent && (M.value = Oe.human_agent), ((m = Oe.agent) == null ? void 0 : m.allow_attachments) !== void 0 && (Ne.value = Oe.agent.allow_attachments), ((u = Oe.agent) == null ? void 0 : u.workflow) !== void 0 && (window.__INITIAL_DATA__ = window.__INITIAL_DATA__ || {}, window.__INITIAL_DATA__.workflow = Oe.agent.workflow), (se = Oe.agent) != null && se.workflow && await be(), !0;
      } catch (Se) {
        return console.error("Error checking authorization:", Se), j.value = "An unexpected error occurred. Please try again.", J.value = !0, ft.value = !1, !1;
      } finally {
        W.value = !1;
      }
    }, Vi = async () => {
      !U.value && ft.value && (U.value = !0, await ie());
    }, is = () => {
      Te.value && (Te.value.scrollTop = Te.value.scrollHeight);
    };
    Pt(() => l.value, (f) => {
      bs(() => {
        is();
      });
    }, { deep: !0 }), Pt(L, (f, m) => {
      f === "connected" && m !== "connected" && wt(100);
    }), Pt(() => l.value.length, (f, m) => {
      f > 0 && m === 0 && wt(100);
    });
    let Ts = null;
    Pt(() => l.value, (f) => {
      const m = f[f.length - 1];
      !Yl(m) || m === Ts || (Ts = m, As(m));
    }, { deep: !0 });
    const Fr = async () => {
      await pe() && await Yt();
    }, Js = ce(!1), xs = ce(0), Qs = ce(""), Xt = ce(0), Zt = ce(!1), Xe = ce({}), ht = ce(!1), at = ce({}), Ot = ce(!1), os = ce(null), as = ce("Start Chat"), fn = ce(!1), kt = ce(null);
    de(() => {
      var m;
      const f = l.value[l.value.length - 1];
      return ((m = f == null ? void 0 : f.attributes) == null ? void 0 : m.request_rating) || !1;
    });
    const Fn = de(() => {
      var m;
      if (!((m = window.__INITIAL_DATA__) != null && m.workflow))
        return !1;
      const f = l.value.find((u) => u.message_type === "rating");
      return (f == null ? void 0 : f.isSubmitted) === !0;
    }), hn = de(
      () => Ri(M.value.human_agent_profile_pic)
    ), As = async (f) => {
      var m, u, se, Se, ge;
      if (Yl(f)) {
        try {
          if (f.session_id && z.value && n.value) {
            const Ze = new URL(`${Vs.API_URL}/widgets/${n.value}/end-chat`);
            Ze.searchParams.append("session_id", f.session_id), (m = f.attributes) != null && m.end_chat_reason && Ze.searchParams.append("reason", f.attributes.end_chat_reason), (u = f.attributes) != null && u.end_chat_description && Ze.searchParams.append("description", f.attributes.end_chat_description);
            const Oe = await fetch(Ze, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${z.value}`,
                "Content-Type": "application/json"
              }
            });
            if (Oe.ok) {
              const on = await Oe.json();
              console.info(`✓ Chat session closed on backend: ${on.session_id}`);
            } else
              console.warn(`Failed to close session on backend: ${Oe.status}`);
          }
        } catch (Ze) {
          console.error("Error calling end-chat API:", Ze);
        }
        if ((se = f.attributes) != null && se.end_chat && ((Se = f.attributes) != null && Se.request_rating)) {
          const Ze = f.agent_name || ((ge = M.value) == null ? void 0 : ge.human_agent_name) || r.value || "our agent";
          l.value.push({
            message: `Rate the chat session that you had with ${Ze}`,
            message_type: "rating",
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            session_id: f.session_id,
            agent_name: Ze,
            showFeedback: !1
          }), We.value = f.session_id;
        }
      }
    }, er = (f) => {
      Zt.value || (Xt.value = f);
    }, Ss = () => {
      if (!Zt.value) {
        const f = l.value[l.value.length - 1];
        Xt.value = (f == null ? void 0 : f.selectedRating) || 0;
      }
    }, $n = async (f) => {
      if (!Zt.value) {
        Xt.value = f;
        const m = l.value[l.value.length - 1];
        m && m.message_type === "rating" && (m.showFeedback = !0, m.selectedRating = f);
      }
    }, ls = async (f, m, u = null) => {
      try {
        Zt.value = !0, await X(m, u);
        const se = l.value.find((Se) => Se.message_type === "rating");
        se && (se.isSubmitted = !0, se.finalRating = m, se.finalFeedback = u);
      } catch (se) {
        console.error("Failed to submit rating:", se);
      } finally {
        Zt.value = !1;
      }
    }, Jt = (f) => {
      const m = {};
      for (const u of f.fields) {
        const se = Xe.value[u.name], Se = Es(u, se);
        Se && (m[u.name] = Se);
      }
      return at.value = m, Object.keys(m).length === 0;
    }, Ki = async (f) => {
      if (!(ht.value || !Jt(f)))
        try {
          ht.value = !0, await _e(Xe.value);
          const u = l.value.findIndex(
            (se) => se.message_type === "form" && (!se.isSubmitted || se.isSubmitted === !1)
          );
          u !== -1 && l.value.splice(u, 1), Xe.value = {}, at.value = {};
        } catch (u) {
          console.error("Failed to submit form:", u);
        } finally {
          ht.value = !1;
        }
    }, _t = (f, m) => {
      var u, se;
      if (Xe.value[f] = m, m && m.toString().trim() !== "") {
        let Se = null;
        if ((u = kt.value) != null && u.fields && (Se = kt.value.fields.find((ge) => ge.name === f)), !Se && ((se = Re.value) != null && se.fields) && (Se = Re.value.fields.find((ge) => ge.name === f)), Se) {
          const ge = Es(Se, m);
          ge ? (at.value[f] = ge, console.log(`Validation error for ${f}:`, ge)) : delete at.value[f];
        }
      } else
        delete at.value[f], console.log(`Cleared error for ${f}`);
    }, Gi = (f) => {
      const m = f.replace(/\D/g, "");
      return m.length >= 7 && m.length <= 15;
    }, Es = (f, m) => {
      if (f.required && (!m || m.toString().trim() === ""))
        return `${f.label} is required`;
      if (!m || m.toString().trim() === "")
        return null;
      if (f.type === "email" && !ar(m))
        return "Please enter a valid email address";
      if (f.type === "tel" && !Gi(m))
        return "Please enter a valid phone number";
      if ((f.type === "text" || f.type === "textarea") && f.minLength && m.length < f.minLength)
        return `${f.label} must be at least ${f.minLength} characters`;
      if ((f.type === "text" || f.type === "textarea") && f.maxLength && m.length > f.maxLength)
        return `${f.label} must not exceed ${f.maxLength} characters`;
      if (f.type === "number") {
        const u = parseFloat(m);
        if (isNaN(u))
          return `${f.label} must be a valid number`;
        if (f.minLength && u < f.minLength)
          return `${f.label} must be at least ${f.minLength}`;
        if (f.maxLength && u > f.maxLength)
          return `${f.label} must not exceed ${f.maxLength}`;
      }
      return null;
    }, $r = async () => {
      if (!(ht.value || !kt.value))
        try {
          ht.value = !0, at.value = {};
          let f = !1;
          for (const m of kt.value.fields || []) {
            const u = Xe.value[m.name], se = Es(m, u);
            se && (at.value[m.name] = se, f = !0, console.log(`Validation error for field ${m.name}:`, se));
          }
          if (f) {
            ht.value = !1, console.log("Validation failed, not submitting");
            return;
          }
          await _e(Xe.value), fn.value = !1, kt.value = null, Xe.value = {};
        } catch (f) {
          console.error("Failed to submit full screen form:", f);
        } finally {
          ht.value = !1, console.log("Full screen form submission completed");
        }
    }, Br = (f, m) => {
      if (console.log("handleViewDetails called with:", { product: f, shopDomain: m }), !f) {
        console.error("No product provided to handleViewDetails");
        return;
      }
      let u = null;
      if (f.handle && m)
        u = `https://${m}/products/${f.handle}`;
      else if (f.id && m)
        u = `https://${m}/products/${f.id}`;
      else if (m) {
        if (!f.handle && !f.id) {
          console.error("Product handle and ID are both missing! Product:", f), alert("Unable to open product: Product information incomplete.");
          return;
        }
      } else {
        console.error("Shop domain is missing! Product:", f), alert("Unable to open product: Shop domain not available. Please contact support.");
        return;
      }
      u && (console.log("Opening product URL:", u), window.open(u, "_blank"));
    }, Ur = (f) => {
      if (!f) return "";
      let m = f.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "");
      const u = [];
      return m = m.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (se, Se, ge) => {
        const Ze = `__MARKDOWN_LINK_${u.length}__`;
        return console.log("Found markdown link:", se, "-> placeholder:", Ze), u.push(se), Ze;
      }), console.log("After replacing markdown links with placeholders:", m), console.log("Markdown links array:", u), m = m.replace(/https?:\/\/[^\s\)]+/g, "[link removed]"), console.log("After removing standalone URLs:", m), u.forEach((se, Se) => {
        m = m.replace(`__MARKDOWN_LINK_${Se}__`, se), console.log(`Restored markdown link ${Se}:`, se);
      }), m = m.replace(/\n\s*\n\s*\n/g, `

`).trim(), m;
    }, zr = ce(!1);
    ce(!1);
    const Cs = de(() => {
      var f;
      return !!((f = M.value) != null && f.human_agent_name);
    }), Hr = de(() => {
      var f;
      return Lm((f = window.__INITIAL_DATA__) == null ? void 0 : f.presence, Cs.value);
    }), Yi = de(() => Ne.value && Cs.value && ke.value.length < uc), Wr = async () => {
      try {
        Ot.value = !1, os.value = null, await Be();
      } catch (f) {
        console.error("Failed to proceed workflow:", f);
      }
    }, Bn = async (f) => {
      try {
        if (!f.userInputValue || !f.userInputValue.trim())
          return;
        const m = f.userInputValue.trim();
        f.isSubmitted = !0, f.submittedValue = m, await K(m, Ie.value);
      } catch (m) {
        console.error("Failed to submit user input:", m), f.isSubmitted = !1, f.submittedValue = null;
      }
    }, Rs = () => {
      Vn({ type: "IDENTITY_EXPIRED" });
    }, V = async () => {
      z.value && (T(null), await k());
    }, p = async (f) => {
      const m = qs(f);
      !m || m === z.value || (T(m), await k());
    }, k = async () => {
      var f, m, u;
      try {
        let se = 0;
        const Se = 50;
        for (; !((f = window.__INITIAL_DATA__) != null && f.widgetId) && se < Se; )
          await new Promise((Ze) => setTimeout(Ze, 100)), se++;
        return (m = window.__INITIAL_DATA__) != null && m.widgetId ? (he(window.__INITIAL_DATA__.widgetId), await Yt() ? ((u = window.__INITIAL_DATA__) != null && u.workflow && ft.value && await be(), !0) : (L.value = "connected", !1)) : (console.error("Widget data not available after waiting"), !1);
      } catch (se) {
        return console.error("Failed to initialize widget:", se), !1;
      }
    };
    window.addEventListener("message", (f) => {
      f.source === window.parent && (!f.data || typeof f.data.type != "string" || (f.data.type === "SCROLL_TO_BOTTOM" && is(), f.data.type === "IDENTITY_UNAVAILABLE" && V(), f.data.type === "TOKEN_REFRESH" && p(f.data.token), f.data.type === "WIDGET_VISIBILITY" && (Ba.value = !!f.data.open), f.data.type === "WIDGET_DISPLAY" && (eo.value = {
        mode: f.data.mode,
        width: f.data.width,
        height: f.data.height,
        hotkey: f.data.hotkey
      }), f.data.type === "PREFILL_MESSAGE" && typeof f.data.text == "string" && (Ae.value = f.data.text.slice(0, 2e3), bs(() => {
        const m = document.querySelector(
          ".message-input input, .welcome-message-field"
        );
        m == null || m.focus();
      }))));
    });
    const B = () => {
      Y(async () => {
        await Yt();
      }), we(({ session_id: f, authenticated: m, created: u }) => {
        Vn({
          type: "CHAT_SESSION",
          sessionId: f,
          authenticated: m,
          created: u
        });
      }), ve((f) => {
        var m;
        if (as.value = f.button_text || "Start Chat", f.type === "landing_page")
          os.value = f.landing_page_data, Ot.value = !0, fn.value = !1;
        else if (f.type === "form" || f.type === "display_form")
          if (((m = f.form_data) == null ? void 0 : m.form_full_screen) === !0)
            kt.value = f.form_data, fn.value = !0, Ot.value = !1;
          else {
            const u = {
              message: "",
              message_type: "form",
              attributes: {
                form_data: f.form_data
              },
              created_at: (/* @__PURE__ */ new Date()).toISOString(),
              isSubmitted: !1
            };
            l.value.findIndex(
              (Se) => Se.message_type === "form" && !Se.isSubmitted
            ) === -1 && l.value.push(u), Ot.value = !1, fn.value = !1;
          }
        else
          Ot.value = !1, fn.value = !1;
      }), Je((f) => {
        console.log("Workflow proceeded:", f);
      });
    }, Q = async () => {
      try {
        await k(), await be();
      } catch (f) {
        throw console.error("Failed to start new conversation:", f), f;
      }
    }, ne = de(
      () => {
        var f;
        return s.value.allow_new_chat === !0 && l.value.length > 0 && !((f = M.value) != null && f.human_agent_name) && !cs.value;
      }
    ), le = ce(!1), Me = ce(""), $e = ce(!1);
    let ct = null;
    const ut = () => {
      $e.value = !1, Me.value = "", ct && (clearTimeout(ct), ct = null);
    }, Is = () => {
      if (!le.value) {
        if ($e.value) {
          ut();
          return;
        }
        $e.value = !0, Me.value = "", ct = setTimeout(ut, Qp);
      }
    };
    Pt(ne, (f) => {
      f || ut();
    });
    const bt = async () => {
      le.value || (ct && (clearTimeout(ct), ct = null), await qr(), Me.value || ($e.value = !1));
    }, qr = async () => {
      if (!le.value) {
        le.value = !0, Me.value = "";
        try {
          if (!await D()) {
            Me.value = Gl;
            return;
          }
          M.value = {}, Ae.value = "", ke.value = [], await k();
        } catch (f) {
          console.error("Failed to start a new chat:", f), Me.value = Gl;
        } finally {
          le.value = !1;
        }
      }
    }, La = async () => {
      Fn.value = !1, l.value = [], M.value = {}, await Q();
    };
    $i(async () => {
      await k(), B(), gt(), document.addEventListener("click", G), (() => {
        const m = l.value.length > 0, u = L.value === "connected", se = document.querySelector('input[type="text"], textarea') !== null;
        return m || u || se;
      })() && wt(100);
    }), Or(() => {
      window.removeEventListener("message", (f) => {
        f.data.type === "SCROLL_TO_BOTTOM" && is();
      }), document.removeEventListener("click", G), Ee && (Ee.disconnect(), Ee = null), gt.timeoutId && (clearTimeout(gt.timeoutId), gt.timeoutId = null), $t = !0, Tn(), y(), ee(), ut(), R();
    });
    const Ls = de(() => s.value.chat_style === "AURORA"), Qt = de(() => s.value.chat_style === "ASK_ANYTHING" || Ls.value), Oa = de(() => s.value.customization_metadata), jr = de(() => {
      var m;
      const f = (m = Oa.value) == null ? void 0 : m.avatar_style;
      return f === "orb" ? !0 : f === "photo" ? !1 : Ls.value && !s.value.photo_url;
    }), tr = de(() => {
      var f;
      return Rm(r.value || "", (f = Oa.value) == null ? void 0 : f.orb_variant);
    }), Ku = {
      GLASS: "theme-glass",
      TERMINAL: "theme-terminal",
      PLAYFUL: "theme-playful",
      CALM_MINT: "theme-calm",
      SUNRISE: "theme-sunrise"
    }, Gu = de(() => Ku[s.value.chat_style] || ""), Yu = de(() => s_(s.value.chat_style, {
      chat_background_color: s.value.chat_background_color,
      chat_text_color: s.value.chat_text_color,
      accent_color: s.value.accent_color,
      font_family: s.value.font_family
    })), Xi = de(
      () => Array.isArray(s.value.quick_actions) ? s.value.quick_actions.filter((f) => !!f && f.trim().length > 0) : []
    ), Na = de(() => (s.value.welcome_message || "").trim()), Pa = de(
      () => !Qt.value && l.value.length === 0 && !w.value && !cs.value
    ), Xu = de(
      () => Pa.value && Na.value.length > 0
    ), Zu = de(
      () => Pa.value && !Fn.value && Xi.value.length > 0
    ), Vr = de(() => s.value.show_citations === !0), Ma = de(() => Im(s.value.show_ai_disclaimer, Cs.value)), Ju = (f) => /^[0-9a-f]{16,}$/i.test(f) || /^[0-9a-f-]{32,}$/i.test(f), Zi = (f) => {
      const m = (f || "").trim().toLowerCase();
      return !m || m === "unknown" ? "Knowledge base" : m.charAt(0).toUpperCase() + m.slice(1);
    }, Ji = (f) => {
      let m = ((f == null ? void 0 : f.name) || "").trim();
      return !m || (m = m.replace(/^[0-9a-f]{16,}[_-]/i, "").replace(/\.(pdf|txt|md|html?|docx?|csv|json)$/i, ""), !m || Ju(m)) ? Zi(f == null ? void 0 : f.type) : m;
    }, Da = (f) => {
      const m = Ji(f), u = Zi(f == null ? void 0 : f.type);
      return m === u ? u : `${m} · ${u}`;
    }, Qi = de(() => s.value.collect_email === !0 && !Qt.value), Fa = ce(!1), Un = ce(""), nr = ce(!1), cs = de(() => !U.value && Qi.value && !Fa.value), $a = async () => {
      const f = Ie.value.trim();
      if (!f) {
        Un.value = "Please enter your email address.";
        return;
      }
      if (!ar(f)) {
        Un.value = "Please enter a valid email address.";
        return;
      }
      Un.value = "", nr.value = !0;
      try {
        await Yt(), Fa.value = !0;
      } catch {
        Un.value = "Something went wrong. Please try again.";
      } finally {
        nr.value = !1;
      }
    }, eo = ce(null), Ba = ce(!0), to = { mode: "floating", width: 400, height: 560 }, Kr = de(
      () => {
        var f;
        return eo.value || ((f = s.value.customization_metadata) == null ? void 0 : f.widget_display) || null;
      }
    ), Qu = de(() => {
      const f = Kr.value;
      return f ? typeof f.mode == "string" && f.mode !== to.mode || typeof f.width == "number" && f.width !== to.width || typeof f.height == "number" && f.height !== to.height : !1;
    }), ef = de(() => {
      var m;
      const f = {
        width: "100%",
        height: "100%",
        borderRadius: "var(--radius-lg)"
      };
      if (Qu.value) {
        const u = (m = Kr.value) == null ? void 0 : m.mode;
        return u === "sidebar-left" || u === "sidebar-right" ? { ...f, borderRadius: "0" } : f;
      }
      return Qt.value ? window.innerWidth <= 768 ? {
        ...f,
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
        minWidth: "unset",
        borderRadius: "0"
      } : window.innerWidth <= 1024 ? {
        ...f,
        width: "95%",
        maxWidth: "700px",
        minWidth: "500px",
        height: "650px"
      } : {
        ...f,
        width: "100%",
        maxWidth: "400px",
        minWidth: "400px",
        height: "580px"
      } : f;
    }), Ua = de(() => Qt.value && l.value.length === 0), tf = ["form", "user_input", "rating", "product", "shopify_output"], nf = de(
      () => l.value.some(
        (f) => tf.includes(f.message_type) || Array.isArray(f.attachments) && f.attachments.length > 0
      )
    ), sf = de(() => {
      var m, u;
      return Qt.value ? !0 : (((m = Kr.value) == null ? void 0 : m.mode) === "ask-ai" || ((u = Kr.value) == null ? void 0 : u.mode) === "search-bar") && !Ne.value;
    }), no = de(
      () => sf.value && st.value && !Ot.value && !fn.value && !cs.value && !Fn.value && !nf.value
    );
    Pt(no, (f) => {
      Vn({ type: "WIDGET_SURFACE", palette: f });
    }, { immediate: !0 });
    const rf = de(
      () => s.value.welcome_subtitle || `Ask a question — ${r.value || "the assistant"} answers from what it knows.`
    ), of = de(() => {
      var f;
      return ((f = eo.value) == null ? void 0 : f.hotkey) !== !1;
    });
    return (f, m) => J.value && ue.value ? (x(), S("div", i_, [
      b("button", {
        type: "button",
        class: "cm-error-close",
        "aria-label": "Close chat",
        title: "Close",
        onClick: ks
      }, "×"),
      m[20] || (m[20] = hs('<div class="widget-unavailable-card" data-v-d67c50ab><div class="widget-unavailable-icon-wrapper" data-v-d67c50ab><svg class="widget-unavailable-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-d67c50ab><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-d67c50ab></path><path d="M9 12l2 2 4-4" data-v-d67c50ab></path></svg></div><h2 class="widget-unavailable-title" data-v-d67c50ab>Chat Unavailable</h2><p class="widget-unavailable-message" data-v-d67c50ab> This chat widget is not currently configured. Please contact the website administrator to enable chat support. </p><div class="widget-unavailable-footer" data-v-d67c50ab><svg class="chattermate-logo-small" width="14" height="14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d67c50ab><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-d67c50ab></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-d67c50ab><span class="cm-powered-prefix" data-v-d67c50ab>Powered by </span><strong class="cm-brand" data-v-d67c50ab>ChatterMate</strong></a></div></div>', 1))
    ])) : J.value ? (x(), S("div", o_, [
      b("button", {
        type: "button",
        class: "cm-error-close",
        "aria-label": "Close chat",
        title: "Close",
        onClick: ks
      }, "×"),
      b("div", a_, [
        m[21] || (m[21] = hs('<div class="auth-error-header" data-v-d67c50ab><svg class="auth-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-d67c50ab><circle cx="12" cy="12" r="10" data-v-d67c50ab></circle><line x1="12" y1="8" x2="12" y2="12" data-v-d67c50ab></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-d67c50ab></line></svg><h2 data-v-d67c50ab>Authentication Error</h2></div>', 1)),
        b("p", l_, te(j.value), 1),
        b("button", {
          class: "auth-error-refresh-btn",
          onClick: m[0] || (m[0] = () => f.window.location.reload())
        }, " Refresh Page ")
      ])
    ])) : n.value && !J.value ? (x(), S("div", {
      key: 2,
      class: Ue(["chat-container cm-surface", [{ collapsed: !st.value, "ask-anything-style": Qt.value, aurora: Ls.value }, Gu.value]]),
      style: Ce({ ...E(oe), ...ef.value, ...Yu.value })
    }, [
      W.value ? (x(), S("div", c_, m[22] || (m[22] = [
        hs('<div class="loading-spinner" data-v-d67c50ab><div class="dot" data-v-d67c50ab></div><div class="dot" data-v-d67c50ab></div><div class="dot" data-v-d67c50ab></div></div><div class="loading-text" data-v-d67c50ab>Initializing chat...</div>', 2)
      ]))) : ae("", !0),
      !W.value && E(L) !== "connected" ? (x(), S("div", {
        key: 1,
        class: Ue(["connection-status", E(L)])
      }, [
        E(L) === "connecting" ? (x(), S("div", u_, m[23] || (m[23] = [
          An(" Connecting to chat service... ", -1),
          b("div", { class: "loading-dots" }, [
            b("div", { class: "dot" }),
            b("div", { class: "dot" }),
            b("div", { class: "dot" })
          ], -1)
        ]))) : E(L) === "failed" ? (x(), S("div", f_, [
          m[24] || (m[24] = An(" Connection failed. ", -1)),
          b("button", {
            onClick: Fr,
            class: "reconnect-button"
          }, " Click here to reconnect ")
        ])) : ae("", !0)
      ], 2)) : ae("", !0),
      E(v) ? (x(), S("div", {
        key: 2,
        class: "error-alert",
        style: Ce(E(h))
      }, te(E(c)), 5)) : ae("", !0),
      no.value ? (x(), ki(Sm, {
        key: 3,
        messages: E(l),
        draft: Ae.value,
        "agent-name": E(r),
        suggestions: Xi.value,
        "welcome-title": E(s).welcome_title,
        "welcome-subtitle": rf.value,
        placeholder: rs.value,
        "input-enabled": un.value,
        "typing-enabled": Dn.value,
        loading: E(d),
        "show-citations": Vr.value,
        disclaimer: Ma.value ? E(Xl) : "",
        active: Ba.value,
        hotkey: of.value,
        "can-start-new-chat": ne.value,
        "starting-new-chat": le.value,
        "new-chat-armed": $e.value,
        "new-chat-error": Me.value,
        onNewChat: Is,
        onConfirmNewChat: bt,
        onCancelNewChat: ut,
        "citation-label": Ji,
        "citation-tooltip": Da,
        "display-text": E(me),
        "is-streaming": E(Ge),
        "onUpdate:draft": m[1] || (m[1] = (u) => Ae.value = u),
        onSend: Ut,
        onAsk: Dr,
        onClose: ks
      }, null, 8, ["messages", "draft", "agent-name", "suggestions", "welcome-title", "welcome-subtitle", "placeholder", "input-enabled", "typing-enabled", "loading", "show-citations", "disclaimer", "active", "hotkey", "can-start-new-chat", "starting-new-chat", "new-chat-armed", "new-chat-error", "display-text", "is-streaming"])) : Ua.value ? (x(), S("div", {
        key: 4,
        class: Ue(["welcome-message-section", { aurora: Ls.value }]),
        style: Ce(E(Qe))
      }, [
        b("div", h_, [
          b("div", d_, [
            jr.value ? (x(), S("div", {
              key: 0,
              class: "welcome-orb",
              style: Ce(tr.value)
            }, null, 4)) : E(Z) ? (x(), S("img", {
              key: 1,
              src: E(Z),
              alt: E(r),
              class: "welcome-avatar"
            }, null, 8, p_)) : ae("", !0),
            b("h1", m_, te(E(s).welcome_title || `Welcome to ${E(r)}`), 1),
            b("p", g_, te(E(s).welcome_subtitle || "I'm here to help you with anything you need. What can I assist you with today?"), 1)
          ])
        ]),
        b("div", __, [
          !E(U) && !ft.value && Qi.value ? (x(), S("div", y_, [
            Hn(b("input", {
              "onUpdate:modelValue": m[2] || (m[2] = (u) => Ie.value = u),
              type: "email",
              placeholder: "Enter your email address",
              disabled: E(d) || E(L) !== "connected",
              class: Ue([{
                invalid: Ie.value.trim() && !E(ar)(Ie.value.trim()),
                disabled: E(L) !== "connected"
              }, "welcome-email-input"])
            }, null, 10, b_), [
              [ds, Ie.value]
            ])
          ])) : ae("", !0),
          b("div", v_, [
            Hn(b("input", {
              "onUpdate:modelValue": m[3] || (m[3] = (u) => Ae.value = u),
              type: "text",
              placeholder: rs.value,
              onKeypress: ot,
              onInput: Wt,
              onChange: Wt,
              disabled: !Dn.value,
              class: Ue([{ disabled: !Dn.value }, "welcome-message-field"])
            }, null, 42, w_), [
              [ds, Ae.value]
            ]),
            b("button", {
              class: Ue(["welcome-send-button", { "aurora-send": Ls.value }]),
              style: Ce(E(O)),
              onClick: Ut,
              disabled: !Ae.value.trim() || !un.value
            }, [
              Ls.value ? (x(), S("svg", T_, m[25] || (m[25] = [
                b("path", {
                  d: "M12 19V5M12 5L5 12M12 5L19 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1)
              ]))) : (x(), S("svg", x_, m[26] || (m[26] = [
                b("path", {
                  d: "M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1)
              ])))
            ], 14, k_)
          ])
        ]),
        b("div", {
          class: "powered-by-welcome",
          style: Ce(E(A))
        }, m[27] || (m[27] = [
          hs('<svg class="chattermate-logo" width="16" height="16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d67c50ab><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-d67c50ab></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-d67c50ab><span class="cm-powered-prefix" data-v-d67c50ab>Powered by </span><strong class="cm-brand" data-v-d67c50ab>ChatterMate</strong></a>', 2)
        ]), 4)
      ], 6)) : ae("", !0),
      Ot.value && os.value ? (x(), S("div", {
        key: 5,
        class: "landing-page-fullscreen",
        style: Ce(E(Qe))
      }, [
        b("div", A_, [
          b("div", S_, [
            b("h2", E_, te(os.value.heading), 1),
            b("div", C_, te(os.value.content), 1)
          ]),
          b("div", R_, [
            b("button", {
              class: "landing-page-button",
              onClick: Wr
            }, te(as.value), 1)
          ])
        ]),
        b("div", {
          class: "powered-by-landing",
          style: Ce(E(A))
        }, m[28] || (m[28] = [
          hs('<svg class="chattermate-logo" width="16" height="16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d67c50ab><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-d67c50ab></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-d67c50ab><span class="cm-powered-prefix" data-v-d67c50ab>Powered by </span><strong class="cm-brand" data-v-d67c50ab>ChatterMate</strong></a>', 2)
        ]), 4)
      ], 4)) : fn.value && kt.value ? (x(), S("div", {
        key: 6,
        class: "form-fullscreen",
        style: Ce(E(Qe))
      }, [
        b("div", I_, [
          kt.value.title || kt.value.description ? (x(), S("div", L_, [
            kt.value.title ? (x(), S("h2", O_, te(kt.value.title), 1)) : ae("", !0),
            kt.value.description ? (x(), S("p", N_, te(kt.value.description), 1)) : ae("", !0)
          ])) : ae("", !0),
          b("div", P_, [
            (x(!0), S(ze, null, Tt(kt.value.fields, (u) => {
              var se, Se;
              return x(), S("div", {
                key: u.name,
                class: "form-field"
              }, [
                b("label", {
                  for: `fullscreen-form-${u.name}`,
                  class: "field-label"
                }, [
                  An(te(u.label) + " ", 1),
                  u.required ? (x(), S("span", D_, "*")) : ae("", !0)
                ], 8, M_),
                u.type === "text" || u.type === "email" || u.type === "tel" ? (x(), S("input", {
                  key: 0,
                  id: `fullscreen-form-${u.name}`,
                  type: u.type,
                  placeholder: u.placeholder || "",
                  required: u.required,
                  minlength: u.minLength,
                  maxlength: u.maxLength,
                  value: Xe.value[u.name] || "",
                  onInput: (ge) => _t(u.name, ge.target.value),
                  onBlur: (ge) => _t(u.name, ge.target.value),
                  class: Ue(["form-input", { error: at.value[u.name] }]),
                  autocomplete: u.type === "email" ? "email" : u.type === "tel" ? "tel" : "off",
                  inputmode: u.type === "tel" ? "tel" : u.type === "email" ? "email" : "text"
                }, null, 42, F_)) : u.type === "number" ? (x(), S("input", {
                  key: 1,
                  id: `fullscreen-form-${u.name}`,
                  type: "number",
                  placeholder: u.placeholder || "",
                  required: u.required,
                  min: u.minLength,
                  max: u.maxLength,
                  value: Xe.value[u.name] || "",
                  onInput: (ge) => _t(u.name, ge.target.value),
                  class: Ue(["form-input", { error: at.value[u.name] }])
                }, null, 42, $_)) : u.type === "textarea" ? (x(), S("textarea", {
                  key: 2,
                  id: `fullscreen-form-${u.name}`,
                  placeholder: u.placeholder || "",
                  required: u.required,
                  minlength: u.minLength,
                  maxlength: u.maxLength,
                  value: Xe.value[u.name] || "",
                  onInput: (ge) => _t(u.name, ge.target.value),
                  class: Ue(["form-textarea", { error: at.value[u.name] }]),
                  rows: "4"
                }, null, 42, B_)) : u.type === "select" ? (x(), S("select", {
                  key: 3,
                  id: `fullscreen-form-${u.name}`,
                  required: u.required,
                  value: Xe.value[u.name] || "",
                  onChange: (ge) => _t(u.name, ge.target.value),
                  class: Ue(["form-select", { error: at.value[u.name] }])
                }, [
                  b("option", z_, te(u.placeholder || "Please select..."), 1),
                  (x(!0), S(ze, null, Tt((Array.isArray(u.options) ? u.options : ((se = u.options) == null ? void 0 : se.split(`
`)) || []).filter((ge) => ge.trim()), (ge) => (x(), S("option", {
                    key: ge,
                    value: ge.trim()
                  }, te(ge.trim()), 9, H_))), 128))
                ], 42, U_)) : u.type === "checkbox" ? (x(), S("label", W_, [
                  b("input", {
                    id: `fullscreen-form-${u.name}`,
                    type: "checkbox",
                    required: u.required,
                    checked: Xe.value[u.name] || !1,
                    onChange: (ge) => _t(u.name, ge.target.checked),
                    class: "form-checkbox"
                  }, null, 40, q_),
                  b("span", j_, te(u.label), 1)
                ])) : u.type === "radio" ? (x(), S("div", V_, [
                  (x(!0), S(ze, null, Tt((Array.isArray(u.options) ? u.options : ((Se = u.options) == null ? void 0 : Se.split(`
`)) || []).filter((ge) => ge.trim()), (ge) => (x(), S("label", {
                    key: ge,
                    class: "radio-field"
                  }, [
                    b("input", {
                      type: "radio",
                      name: `fullscreen-form-${u.name}`,
                      value: ge.trim(),
                      required: u.required,
                      checked: Xe.value[u.name] === ge.trim(),
                      onChange: (Ze) => _t(u.name, ge.trim()),
                      class: "form-radio"
                    }, null, 40, K_),
                    b("span", G_, te(ge.trim()), 1)
                  ]))), 128))
                ])) : ae("", !0),
                at.value[u.name] ? (x(), S("div", Y_, te(at.value[u.name]), 1)) : ae("", !0)
              ]);
            }), 128))
          ]),
          b("div", X_, [
            b("button", {
              onClick: m[4] || (m[4] = () => {
                console.log("Submit button clicked!"), $r();
              }),
              disabled: ht.value,
              class: "submit-form-button",
              style: Ce(E(O))
            }, [
              ht.value ? (x(), S("span", J_, m[29] || (m[29] = [
                b("div", { class: "dot" }, null, -1),
                b("div", { class: "dot" }, null, -1),
                b("div", { class: "dot" }, null, -1)
              ]))) : (x(), S("span", Q_, te(kt.value.submit_button_text || "Submit"), 1))
            ], 12, Z_)
          ])
        ]),
        b("div", {
          class: "powered-by-landing",
          style: Ce(E(A))
        }, m[30] || (m[30] = [
          hs('<svg class="chattermate-logo" width="16" height="16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d67c50ab><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-d67c50ab></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-d67c50ab><span class="cm-powered-prefix" data-v-d67c50ab>Powered by </span><strong class="cm-brand" data-v-d67c50ab>ChatterMate</strong></a>', 2)
        ]), 4)
      ], 4)) : !Ua.value && st.value && !no.value ? (x(), S("div", {
        key: 7,
        class: Ue(["chat-panel", { "ask-anything-chat": Qt.value }]),
        style: Ce(E(Qe))
      }, [
        Qt.value ? (x(), S("div", {
          key: 1,
          class: "ask-anything-top",
          style: Ce(E(q))
        }, [
          b("div", ay, [
            hn.value || E(Z) ? (x(), S("img", {
              key: 0,
              src: hn.value || E(Z),
              alt: E(M).human_agent_name || E(r),
              class: "header-avatar"
            }, null, 8, ly)) : ae("", !0),
            b("div", cy, [
              b("h3", {
                style: Ce(E(A))
              }, te(E(r)), 5),
              b("p", {
                class: "ask-anything-subtitle",
                style: Ce(E(A))
              }, te(E(s).welcome_subtitle || "Ask me anything. I'm here to help."), 5)
            ])
          ])
        ], 4)) : (x(), S("div", {
          key: 0,
          class: "chat-header",
          style: Ce(E(q))
        }, [
          b("div", {
            class: "cm-header-sheen",
            style: Ce({ background: "linear-gradient(90deg, transparent, " + (E(s).accent_color || "#C9F24E") + ", transparent)" })
          }, null, 4),
          b("div", ey, [
            !hn.value && (jr.value || !E(Z)) ? (x(), S("div", {
              key: 0,
              class: "header-orb",
              style: Ce(tr.value)
            }, null, 4)) : hn.value || E(Z) ? (x(), S("img", {
              key: 1,
              src: hn.value || E(Z),
              alt: E(M).human_agent_name || E(r),
              class: "header-avatar"
            }, null, 8, ty)) : ae("", !0),
            b("div", ny, [
              b("h3", {
                style: Ce(E(A))
              }, te(E(M).human_agent_name || E(r)), 5),
              b("div", sy, [
                b("span", {
                  class: Ue(["status-indicator", Hr.value.online ? "online" : "away"])
                }, null, 2),
                b("span", ry, te(Hr.value.text), 1)
              ])
            ])
          ]),
          b("div", iy, [
            ne.value ? (x(), S("button", {
              key: 0,
              type: "button",
              class: Ue(["header-new-chat", { armed: $e.value }]),
              style: Ce(E(A)),
              disabled: le.value,
              title: E(Ci),
              "aria-label": E(Ci),
              "aria-expanded": $e.value,
              onClick: Is
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
            ]), 14, oy)) : ae("", !0),
            b("button", {
              type: "button",
              class: "header-minimize",
              style: Ce(E(A)),
              title: "Minimize",
              "aria-label": "Minimize chat",
              onClick: ks
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
        E(w) ? (x(), S("div", uy, m[33] || (m[33] = [
          b("div", { class: "loading-spinner" }, [
            b("div", { class: "dot" }),
            b("div", { class: "dot" }),
            b("div", { class: "dot" })
          ], -1)
        ]))) : ae("", !0),
        cs.value ? (x(), S("div", {
          key: 3,
          class: "cm-email-gate",
          style: Ce(E(Qe))
        }, [
          b("div", {
            class: "cm-email-gate-orb",
            style: Ce(tr.value)
          }, null, 4),
          b("h3", fy, te(E(s).welcome_title || "Before we start"), 1),
          m[34] || (m[34] = b("p", { class: "cm-email-gate-text" }, "Enter your email and we'll continue the chat.", -1)),
          Hn(b("input", {
            "onUpdate:modelValue": m[5] || (m[5] = (u) => Ie.value = u),
            type: "email",
            inputmode: "email",
            autocomplete: "email",
            placeholder: "you@example.com",
            class: Ue(["cm-email-gate-input", { invalid: !!Un.value }]),
            disabled: nr.value,
            onKeyup: oi($a, ["enter"]),
            onInput: m[6] || (m[6] = (u) => Un.value = "")
          }, null, 42, hy), [
            [ds, Ie.value]
          ]),
          Un.value ? (x(), S("p", dy, te(Un.value), 1)) : ae("", !0),
          b("button", {
            type: "button",
            class: "cm-email-gate-btn",
            style: Ce(E(O)),
            disabled: nr.value,
            onClick: $a
          }, te(nr.value ? "Please wait…" : "Continue to chat"), 13, py)
        ], 4)) : ae("", !0),
        $e.value && ne.value ? (x(), ki(Ru, {
          key: 4,
          busy: le.value,
          error: Me.value,
          onConfirm: bt,
          onCancel: ut
        }, null, 8, ["busy", "error"])) : ae("", !0),
        Hn(b("div", {
          class: "chat-messages",
          ref_key: "messagesContainer",
          ref: Te,
          role: "log",
          "aria-label": "Messages"
        }, [
          Xu.value ? (x(), S("div", my, [
            b("div", gy, [
              jr.value || !E(Z) ? (x(), S("div", {
                key: 0,
                class: "cm-welcome-orb",
                style: Ce(tr.value)
              }, null, 4)) : (x(), S("img", {
                key: 1,
                src: E(Z),
                alt: E(r),
                class: "cm-welcome-avatar"
              }, null, 8, _y)),
              b("div", {
                class: "message-bubble cm-welcome-bubble",
                style: Ce(E(_))
              }, te(Na.value), 5)
            ])
          ])) : ae("", !0),
          (x(!0), S(ze, null, Tt(E(l), (u, se) => {
            var Se, ge, Ze, Oe, on, sr, zn, Os, za, Ha, Wa, qa, ja, Va, Ka, Ga, Ya, Xa, Za;
            return x(), S("div", {
              key: se,
              class: Ue([
                "message",
                u.message_type === "bot" || u.message_type === "agent" ? "agent-message" : u.message_type === "system" ? "system-message" : u.message_type === "rating" ? "rating-message" : u.message_type === "form" ? "form-message" : u.message_type === "product" || u.shopify_output ? "product-message" : "user-message"
              ])
            }, [
              u.message_type === "bot" || u.message_type === "agent" ? (x(), S("div", yy, [
                hn.value ? (x(), S("img", {
                  key: 0,
                  src: hn.value,
                  class: "cm-msg-avatar-img",
                  alt: ""
                }, null, 8, by)) : !jr.value && E(Z) ? (x(), S("img", {
                  key: 1,
                  src: E(Z),
                  class: "cm-msg-avatar-img",
                  alt: ""
                }, null, 8, vy)) : (x(), S("div", {
                  key: 2,
                  class: "cm-msg-avatar-orb",
                  style: Ce(tr.value)
                }, null, 4))
              ])) : ae("", !0),
              b("div", wy, [
                b("div", {
                  class: "message-bubble",
                  style: Ce(u.message_type === "system" || u.message_type === "rating" || u.message_type === "form" || u.message_type === "product" || u.shopify_output ? {} : u.message_type === "user" ? E(O) : E(_))
                }, [
                  u.message_type === "rating" ? (x(), S("div", ky, [
                    b("p", Ty, "Rate the chat session that you had with " + te(u.agent_name || E(M).human_agent_name || E(r) || "our agent"), 1),
                    b("div", {
                      class: Ue(["star-rating", { submitted: Zt.value || u.isSubmitted }])
                    }, [
                      (x(), S(ze, null, Tt(5, (F) => b("button", {
                        key: F,
                        class: Ue(["star-button", {
                          warning: F <= (u.isSubmitted ? u.finalRating : Xt.value || u.selectedRating) && (u.isSubmitted ? u.finalRating : Xt.value || u.selectedRating) <= 3,
                          success: F <= (u.isSubmitted ? u.finalRating : Xt.value || u.selectedRating) && (u.isSubmitted ? u.finalRating : Xt.value || u.selectedRating) > 3,
                          selected: F <= (u.isSubmitted ? u.finalRating : Xt.value || u.selectedRating)
                        }]),
                        onMouseover: (an) => !u.isSubmitted && er(F),
                        onMouseleave: (an) => !u.isSubmitted && Ss,
                        onClick: (an) => !u.isSubmitted && $n(F),
                        disabled: Zt.value || u.isSubmitted
                      }, " ★ ", 42, xy)), 64))
                    ], 2),
                    u.showFeedback && !u.isSubmitted ? (x(), S("div", Ay, [
                      b("div", Sy, [
                        Hn(b("input", {
                          "onUpdate:modelValue": (F) => u.feedback = F,
                          placeholder: "Please share your feedback (optional)",
                          disabled: Zt.value,
                          maxlength: "500",
                          class: "feedback-input"
                        }, null, 8, Ey), [
                          [ds, u.feedback]
                        ]),
                        b("div", Cy, te(((Se = u.feedback) == null ? void 0 : Se.length) || 0) + "/500", 1)
                      ]),
                      b("button", {
                        onClick: (F) => ls(u.session_id, Xt.value, u.feedback),
                        disabled: Zt.value || !Xt.value,
                        class: "submit-rating-button",
                        style: Ce({ backgroundColor: E(s).accent_color || "var(--accent-solid)" })
                      }, te(Zt.value ? "Submitting..." : "Submit Rating"), 13, Ry)
                    ])) : ae("", !0),
                    u.isSubmitted && u.finalFeedback ? (x(), S("div", Iy, [
                      b("div", Ly, [
                        b("p", Oy, te(u.finalFeedback), 1)
                      ])
                    ])) : u.isSubmitted ? (x(), S("div", Ny, " Thank you for your rating! ")) : ae("", !0)
                  ])) : u.message_type === "form" ? (x(), S("div", Py, [
                    (Ze = (ge = u.attributes) == null ? void 0 : ge.form_data) != null && Ze.title || (on = (Oe = u.attributes) == null ? void 0 : Oe.form_data) != null && on.description ? (x(), S("div", My, [
                      (zn = (sr = u.attributes) == null ? void 0 : sr.form_data) != null && zn.title ? (x(), S("h3", Dy, te(u.attributes.form_data.title), 1)) : ae("", !0),
                      (za = (Os = u.attributes) == null ? void 0 : Os.form_data) != null && za.description ? (x(), S("p", Fy, te(u.attributes.form_data.description), 1)) : ae("", !0)
                    ])) : ae("", !0),
                    b("div", $y, [
                      (x(!0), S(ze, null, Tt((Wa = (Ha = u.attributes) == null ? void 0 : Ha.form_data) == null ? void 0 : Wa.fields, (F) => {
                        var an, so;
                        return x(), S("div", {
                          key: F.name,
                          class: "form-field"
                        }, [
                          b("label", {
                            for: `form-${F.name}`,
                            class: "field-label"
                          }, [
                            An(te(F.label) + " ", 1),
                            F.required ? (x(), S("span", Uy, "*")) : ae("", !0)
                          ], 8, By),
                          F.type === "text" || F.type === "email" || F.type === "tel" ? (x(), S("input", {
                            key: 0,
                            id: `form-${F.name}`,
                            type: F.type,
                            placeholder: F.placeholder || "",
                            required: F.required,
                            minlength: F.minLength,
                            maxlength: F.maxLength,
                            value: Xe.value[F.name] || "",
                            onInput: (qe) => _t(F.name, qe.target.value),
                            onBlur: (qe) => _t(F.name, qe.target.value),
                            class: Ue(["form-input", { error: at.value[F.name] }]),
                            disabled: ht.value,
                            autocomplete: F.type === "email" ? "email" : F.type === "tel" ? "tel" : "off",
                            inputmode: F.type === "tel" ? "tel" : F.type === "email" ? "email" : "text"
                          }, null, 42, zy)) : F.type === "number" ? (x(), S("input", {
                            key: 1,
                            id: `form-${F.name}`,
                            type: "number",
                            placeholder: F.placeholder || "",
                            required: F.required,
                            min: F.min,
                            max: F.max,
                            value: Xe.value[F.name] || "",
                            onInput: (qe) => _t(F.name, qe.target.value),
                            class: Ue(["form-input", { error: at.value[F.name] }]),
                            disabled: ht.value
                          }, null, 42, Hy)) : F.type === "textarea" ? (x(), S("textarea", {
                            key: 2,
                            id: `form-${F.name}`,
                            placeholder: F.placeholder || "",
                            required: F.required,
                            minlength: F.minLength,
                            maxlength: F.maxLength,
                            value: Xe.value[F.name] || "",
                            onInput: (qe) => _t(F.name, qe.target.value),
                            class: Ue(["form-textarea", { error: at.value[F.name] }]),
                            disabled: ht.value,
                            rows: "3"
                          }, null, 42, Wy)) : F.type === "select" ? (x(), S("select", {
                            key: 3,
                            id: `form-${F.name}`,
                            required: F.required,
                            value: Xe.value[F.name] || "",
                            onChange: (qe) => _t(F.name, qe.target.value),
                            class: Ue(["form-select", { error: at.value[F.name] }]),
                            disabled: ht.value
                          }, [
                            b("option", jy, te(F.placeholder || "Select an option"), 1),
                            (x(!0), S(ze, null, Tt((Array.isArray(F.options) ? F.options : ((an = F.options) == null ? void 0 : an.split(`
`)) || []).filter((qe) => qe.trim()), (qe) => (x(), S("option", {
                              key: qe.trim(),
                              value: qe.trim()
                            }, te(qe.trim()), 9, Vy))), 128))
                          ], 42, qy)) : F.type === "checkbox" ? (x(), S("div", Ky, [
                            b("input", {
                              id: `form-${F.name}`,
                              type: "checkbox",
                              checked: Xe.value[F.name] || !1,
                              onChange: (qe) => _t(F.name, qe.target.checked),
                              class: "form-checkbox",
                              disabled: ht.value
                            }, null, 40, Gy),
                            b("label", {
                              for: `form-${F.name}`,
                              class: "checkbox-label"
                            }, te(F.placeholder || F.label), 9, Yy)
                          ])) : F.type === "radio" ? (x(), S("div", Xy, [
                            (x(!0), S(ze, null, Tt((Array.isArray(F.options) ? F.options : ((so = F.options) == null ? void 0 : so.split(`
`)) || []).filter((qe) => qe.trim()), (qe) => (x(), S("div", {
                              key: qe.trim(),
                              class: "radio-option"
                            }, [
                              b("input", {
                                id: `form-${F.name}-${qe.trim()}`,
                                name: `form-${F.name}`,
                                type: "radio",
                                value: qe.trim(),
                                checked: Xe.value[F.name] === qe.trim(),
                                onChange: (_v) => _t(F.name, qe.trim()),
                                class: "form-radio",
                                disabled: ht.value
                              }, null, 40, Zy),
                              b("label", {
                                for: `form-${F.name}-${qe.trim()}`,
                                class: "radio-label"
                              }, te(qe.trim()), 9, Jy)
                            ]))), 128))
                          ])) : ae("", !0),
                          at.value[F.name] ? (x(), S("div", Qy, te(at.value[F.name]), 1)) : ae("", !0)
                        ]);
                      }), 128))
                    ]),
                    b("div", eb, [
                      b("button", {
                        onClick: () => {
                          var F;
                          console.log("Regular form submit button clicked!"), Ki((F = u.attributes) == null ? void 0 : F.form_data);
                        },
                        disabled: ht.value,
                        class: "form-submit-button",
                        style: Ce(E(O))
                      }, te(ht.value ? "Submitting..." : ((ja = (qa = u.attributes) == null ? void 0 : qa.form_data) == null ? void 0 : ja.submit_button_text) || "Submit"), 13, tb)
                    ])
                  ])) : u.message_type === "user_input" ? (x(), S("div", nb, [
                    (Va = u.attributes) != null && Va.prompt_message && u.attributes.prompt_message.trim() ? (x(), S("div", sb, te(u.attributes.prompt_message), 1)) : ae("", !0),
                    u.isSubmitted ? (x(), S("div", ab, [
                      m[35] || (m[35] = b("strong", null, "Your input:", -1)),
                      An(" " + te(u.submittedValue) + " ", 1),
                      (Ka = u.attributes) != null && Ka.confirmation_message && u.attributes.confirmation_message.trim() ? (x(), S("div", lb, te(u.attributes.confirmation_message), 1)) : ae("", !0)
                    ])) : (x(), S("div", rb, [
                      Hn(b("textarea", {
                        "onUpdate:modelValue": (F) => u.userInputValue = F,
                        class: "user-input-textarea",
                        placeholder: "Type your message here...",
                        rows: "3",
                        onKeydown: [
                          oi(gs((F) => Bn(u), ["ctrl"]), ["enter"]),
                          oi(gs((F) => Bn(u), ["meta"]), ["enter"])
                        ]
                      }, null, 40, ib), [
                        [ds, u.userInputValue]
                      ]),
                      b("button", {
                        class: "user-input-submit-button",
                        onClick: (F) => Bn(u),
                        disabled: !u.userInputValue || !u.userInputValue.trim()
                      }, " Submit ", 8, ob)
                    ]))
                  ])) : u.shopify_output || u.message_type === "product" ? (x(), S("div", cb, [
                    u.message ? (x(), S("div", {
                      key: 0,
                      innerHTML: E(li)(((Ya = (Ga = u.shopify_output) == null ? void 0 : Ga.products) == null ? void 0 : Ya.length) > 0 ? Ur(u.message) : u.message),
                      class: "product-message-text"
                    }, null, 8, ub)) : ae("", !0),
                    (Xa = u.shopify_output) != null && Xa.products && u.shopify_output.products.length > 0 ? (x(), S("div", fb, [
                      m[37] || (m[37] = b("h3", { class: "carousel-title" }, "Products", -1)),
                      b("div", hb, [
                        (x(!0), S(ze, null, Tt(u.shopify_output.products, (F) => {
                          var an;
                          return x(), S("div", {
                            key: F.id,
                            class: "product-card-compact carousel-item"
                          }, [
                            (an = F.image) != null && an.src ? (x(), S("div", db, [
                              b("img", {
                                src: F.image.src,
                                alt: F.title,
                                class: "product-thumbnail"
                              }, null, 8, pb)
                            ])) : ae("", !0),
                            b("div", mb, [
                              b("div", gb, [
                                b("div", _b, te(F.title), 1),
                                F.variant_title && F.variant_title !== "Default Title" ? (x(), S("div", yb, te(F.variant_title), 1)) : ae("", !0),
                                b("div", bb, te(F.price_formatted || E(a)(F.price, F.currency)), 1)
                              ]),
                              b("div", vb, [
                                b("button", {
                                  class: "view-details-button-compact",
                                  onClick: (so) => {
                                    var qe;
                                    return Br(F, (qe = u.shopify_output) == null ? void 0 : qe.shop_domain);
                                  }
                                }, m[36] || (m[36] = [
                                  An(" View product ", -1),
                                  b("span", { class: "external-link-icon" }, "↗", -1)
                                ]), 8, wb)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])) : !u.message && ((Za = u.shopify_output) != null && Za.products) && u.shopify_output.products.length === 0 ? (x(), S("div", kb, m[38] || (m[38] = [
                      b("p", null, "No products found.", -1)
                    ]))) : !u.message && u.shopify_output && !u.shopify_output.products ? (x(), S("div", Tb, m[39] || (m[39] = [
                      b("p", null, "No products to display.", -1)
                    ]))) : ae("", !0)
                  ])) : (x(), S(ze, { key: 4 }, [
                    E(Ge)(se) ? (x(), S("div", {
                      key: 0,
                      class: "message-streaming",
                      innerHTML: E(li)(E(me)(se, u.message))
                    }, null, 8, xb)) : (x(), S("div", {
                      key: 1,
                      innerHTML: E(li)(u.message)
                    }, null, 8, Ab)),
                    u.attachments && u.attachments.length > 0 ? (x(), S("div", Sb, [
                      (x(!0), S(ze, null, Tt(u.attachments, (F) => (x(), S("div", {
                        key: F.id,
                        class: "attachment-item"
                      }, [
                        E(Et)(F.content_type) ? (x(), S("div", Eb, [
                          b("img", {
                            src: E(Bt)(F.file_url),
                            alt: F.filename,
                            class: "attachment-image",
                            onClick: gs((an) => E(ss)({ url: F.file_url, filename: F.filename, type: F.content_type, file_url: E(Bt)(F.file_url), size: void 0 }), ["stop"]),
                            style: { cursor: "pointer" }
                          }, null, 8, Cb),
                          b("div", Rb, [
                            b("a", {
                              href: E(Bt)(F.file_url),
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
                              An(" " + te(F.filename) + " ", 1),
                              b("span", Lb, "(" + te(E(rt)(F.file_size)) + ")", 1)
                            ], 8, Ib)
                          ])
                        ])) : (x(), S("a", {
                          key: 1,
                          href: E(Bt)(F.file_url),
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
                          An(" " + te(F.filename) + " ", 1),
                          b("span", Nb, "(" + te(E(rt)(F.file_size)) + ")", 1)
                        ], 8, Ob))
                      ]))), 128))
                    ])) : ae("", !0)
                  ], 64))
                ], 4),
                Vr.value && (u.message_type === "bot" || u.message_type === "agent") && u.sources && u.sources.length ? (x(), S("div", Pb, [
                  m[42] || (m[42] = b("span", { class: "citation-label" }, "Sources", -1)),
                  (x(!0), S(ze, null, Tt(u.sources, (F, an) => (x(), S("span", {
                    key: an,
                    class: "citation-chip",
                    title: Da(F)
                  }, te(Ji(F)), 9, Mb))), 128))
                ])) : ae("", !0),
                b("div", Db, [
                  u.message_type === "user" ? (x(), S("span", Fb, " You ")) : ae("", !0)
                ])
              ])
            ], 2);
          }), 128)),
          E(d) ? (x(), S("div", {
            key: 1,
            class: Ue(["typing-indicator", { "reading-indicator": Vr.value }])
          }, [
            Vr.value ? (x(), S(ze, { key: 0 }, [
              m[43] || (m[43] = b("div", {
                class: "reading-bars",
                "aria-hidden": "true"
              }, [
                b("span"),
                b("span"),
                b("span")
              ], -1)),
              m[44] || (m[44] = b("span", { class: "reading-label" }, "reading knowledge base", -1))
            ], 64)) : (x(), S("div", {
              key: 1,
              class: "cm-typing-bubble",
              style: Ce(E(_))
            }, m[45] || (m[45] = [
              b("span", { class: "cm-typing-dot" }, null, -1),
              b("span", { class: "cm-typing-dot" }, null, -1),
              b("span", { class: "cm-typing-dot" }, null, -1)
            ]), 4))
          ], 2)) : ae("", !0)
        ], 512), [
          [od, !cs.value]
        ]),
        Zu.value ? (x(), S("div", $b, [
          (x(!0), S(ze, null, Tt(Xi.value, (u) => (x(), S("button", {
            key: u,
            type: "button",
            class: "cm-quick-action",
            disabled: !un.value,
            onClick: (se) => Dr(u)
          }, te(u), 9, Bb))), 128))
        ])) : ae("", !0),
        !Fn.value && !cs.value ? (x(), S("div", {
          key: 6,
          class: Ue(["chat-input", { "ask-anything-input": Qt.value }])
        }, [
          b("input", {
            ref_key: "fileInputRef",
            ref: Le,
            type: "file",
            accept: fv,
            multiple: "",
            style: { display: "none" },
            onChange: m[7] || (m[7] = //@ts-ignore
            (...u) => E(Gs) && E(Gs)(...u))
          }, null, 544),
          E(ke).length > 0 ? (x(), S("div", Ub, [
            (x(!0), S(ze, null, Tt(E(ke), (u, se) => (x(), S("div", {
              key: se,
              class: "file-preview-widget"
            }, [
              b("div", zb, [
                E(Xs)(u.type) ? (x(), S("img", {
                  key: 0,
                  src: E(es)(u),
                  alt: u.filename,
                  class: "file-preview-image-widget",
                  onClick: gs((Se) => E(ss)(u), ["stop"]),
                  style: { cursor: "pointer" }
                }, null, 8, Hb)) : (x(), S("div", {
                  key: 1,
                  class: "file-preview-icon-widget",
                  onClick: gs((Se) => E(ss)(u), ["stop"]),
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
              b("div", qb, [
                b("div", jb, te(u.filename), 1),
                b("div", Vb, te(E(rt)(u.size)), 1)
              ]),
              b("button", {
                type: "button",
                class: "file-preview-remove-widget",
                onClick: (Se) => E(Pn)(se),
                title: "Remove file"
              }, " × ", 8, Kb)
            ]))), 128))
          ])) : ae("", !0),
          zr.value ? (x(), S("div", Gb, m[47] || (m[47] = [
            b("div", { class: "upload-spinner-widget" }, null, -1),
            b("span", { class: "upload-text-widget" }, "Uploading files...", -1)
          ]))) : ae("", !0),
          b("div", Yb, [
            Hn(b("input", {
              "onUpdate:modelValue": m[8] || (m[8] = (u) => Ae.value = u),
              type: "text",
              placeholder: rs.value,
              onKeypress: ot,
              onInput: Wt,
              onChange: Wt,
              onPaste: m[9] || (m[9] = //@ts-ignore
              (...u) => E(qt) && E(qt)(...u)),
              onDrop: m[10] || (m[10] = //@ts-ignore
              (...u) => E(Ys) && E(Ys)(...u)),
              onDragover: m[11] || (m[11] = //@ts-ignore
              (...u) => E(ts) && E(ts)(...u)),
              onDragleave: m[12] || (m[12] = //@ts-ignore
              (...u) => E(ns) && E(ns)(...u)),
              disabled: !Dn.value,
              class: Ue({ disabled: !Dn.value, "ask-anything-field": Qt.value })
            }, null, 42, Xb), [
              [ds, Ae.value]
            ]),
            Yi.value ? (x(), S("button", {
              key: 0,
              type: "button",
              class: "attach-button",
              disabled: zr.value,
              onClick: m[13] || (m[13] = //@ts-ignore
              (...u) => E(Mr) && E(Mr)(...u)),
              title: `Attach files (${E(ke).length}/${uc} used) or paste screenshots`
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
            ]), 8, Zb)) : ae("", !0),
            b("button", {
              class: Ue(["send-button", { "ask-anything-send": Qt.value }]),
              "aria-label": "Send message",
              style: Ce(E(O)),
              onClick: Ut,
              disabled: !Ae.value.trim() && E(ke).length === 0 || !un.value
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
            ]), 14, Jb)
          ])
        ], 2)) : Fn.value && !cs.value ? (x(), S("div", Qb, [
          b("div", ev, [
            m[50] || (m[50] = b("p", { class: "ended-text" }, "This chat has ended.", -1)),
            b("button", {
              class: "start-new-conversation-button",
              style: Ce(E(O)),
              onClick: La
            }, " Click here to start a new conversation ", 4)
          ])
        ])) : ae("", !0),
        Ma.value ? (x(), S("div", {
          key: 8,
          class: "ai-disclaimer",
          style: Ce(E(A))
        }, te(E(Xl)), 5)) : ae("", !0),
        b("div", {
          class: "powered-by",
          style: Ce(E(A))
        }, m[51] || (m[51] = [
          hs('<svg class="chattermate-logo" width="16" height="16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d67c50ab><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-d67c50ab></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-d67c50ab></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-d67c50ab><span class="cm-powered-prefix" data-v-d67c50ab>Powered by </span><strong class="cm-brand" data-v-d67c50ab>ChatterMate</strong></a>', 2)
        ]), 4)
      ], 6)) : ae("", !0),
      Js.value ? (x(), S("div", tv, [
        b("div", nv, [
          m[52] || (m[52] = b("h3", null, "Rate your conversation", -1)),
          b("div", sv, [
            (x(), S(ze, null, Tt(5, (u) => b("button", {
              key: u,
              onClick: (se) => xs.value = u,
              class: Ue([{ active: u <= xs.value }, "star-button"])
            }, " ★ ", 10, rv)), 64))
          ]),
          Hn(b("textarea", {
            "onUpdate:modelValue": m[14] || (m[14] = (u) => Qs.value = u),
            placeholder: "Additional feedback (optional)",
            class: "rating-feedback"
          }, null, 512), [
            [ds, Qs.value]
          ]),
          b("div", iv, [
            b("button", {
              onClick: m[15] || (m[15] = (u) => f.submitRating(xs.value, Qs.value)),
              disabled: !xs.value,
              class: "submit-button",
              style: Ce(E(O))
            }, " Submit ", 12, ov),
            b("button", {
              onClick: m[16] || (m[16] = (u) => Js.value = !1),
              class: "skip-rating"
            }, " Skip ")
          ])
        ])
      ])) : ae("", !0),
      E(Ye) ? (x(), S("div", {
        key: 9,
        class: "preview-modal-overlay",
        onClick: m[19] || (m[19] = //@ts-ignore
        (...u) => E(Mn) && E(Mn)(...u))
      }, [
        b("div", {
          class: "preview-modal-content",
          onClick: m[18] || (m[18] = gs(() => {
          }, ["stop"]))
        }, [
          b("button", {
            class: "preview-modal-close",
            onClick: m[17] || (m[17] = //@ts-ignore
            (...u) => E(Mn) && E(Mn)(...u))
          }, "×"),
          E(Pe) && E(Xs)(E(Pe).type) ? (x(), S("div", av, [
            b("img", {
              src: E(es)(E(Pe)),
              alt: E(Pe).filename,
              class: "preview-modal-image"
            }, null, 8, lv),
            b("div", cv, te(E(Pe).filename), 1)
          ])) : ae("", !0)
        ])
      ])) : ae("", !0)
    ], 6)) : (x(), S("div", uv));
  }
}), dv = /* @__PURE__ */ xa(hv, [["__scopeId", "data-v-d67c50ab"]]);
window.process || (window.process = { env: { NODE_ENV: "production" } });
const nn = window.__INITIAL_DATA__, qu = new URL(window.location.href), ju = qu.searchParams.get("preview") === "true", Vu = (e) => {
  const t = qu.searchParams.get(e);
  if (!(!t || t === "undefined" || t.trim() === ""))
    return t;
}, pv = ju ? Vu("widget_id") || (nn == null ? void 0 : nn.widgetId) || void 0 : (nn == null ? void 0 : nn.widgetId) || void 0, mv = ju ? (nn == null ? void 0 : nn.initialToken) || Vu("token") || void 0 : (nn == null ? void 0 : nn.initialToken) || void 0, gv = Sd(dv, {
  widgetId: pv,
  token: mv || void 0,
  initialAuthError: null
  // Let backend determine if auth is required
});
gv.mount("#app");
