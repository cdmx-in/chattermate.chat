var _f = Object.defineProperty;
var yf = (e, t, n) => t in e ? _f(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var et = (e, t, n) => yf(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function sa(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const tt = {}, Bs = [], _n = () => {
}, vf = () => !1, Di = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ra = (e) => e.startsWith("onUpdate:"), Pt = Object.assign, ia = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, bf = Object.prototype.hasOwnProperty, We = (e, t) => bf.call(e, t), ve = Array.isArray, Us = (e) => Fi(e) === "[object Map]", mc = (e) => Fi(e) === "[object Set]", Te = (e) => typeof e == "function", _t = (e) => typeof e == "string", ss = (e) => typeof e == "symbol", ft = (e) => e !== null && typeof e == "object", _c = (e) => (ft(e) || Te(e)) && Te(e.then) && Te(e.catch), yc = Object.prototype.toString, Fi = (e) => yc.call(e), wf = (e) => Fi(e).slice(8, -1), vc = (e) => Fi(e) === "[object Object]", oa = (e) => _t(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, xr = /* @__PURE__ */ sa(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), $i = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, kf = /-(\w)/g, es = $i(
  (e) => e.replace(kf, (t, n) => n ? n.toUpperCase() : "")
), Tf = /\B([A-Z])/g, rs = $i(
  (e) => e.replace(Tf, "-$1").toLowerCase()
), bc = $i((e) => e.charAt(0).toUpperCase() + e.slice(1)), co = $i(
  (e) => e ? `on${bc(e)}` : ""
), Zn = (e, t) => !Object.is(e, t), ai = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Po = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Mo = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let nl;
const Bi = () => nl || (nl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Se(e) {
  if (ve(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = _t(s) ? Ef(s) : Se(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (_t(e) || ft(e))
    return e;
}
const xf = /;(?![^(]*\))/g, Af = /:([^]+)/, Sf = /\/\*[^]*?\*\//g;
function Ef(e) {
  const t = {};
  return e.replace(Sf, "").split(xf).forEach((n) => {
    if (n) {
      const s = n.split(Af);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function $e(e) {
  let t = "";
  if (_t(e))
    t = e;
  else if (ve(e))
    for (let n = 0; n < e.length; n++) {
      const s = $e(e[n]);
      s && (t += s + " ");
    }
  else if (ft(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Cf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Rf = /* @__PURE__ */ sa(Cf);
function wc(e) {
  return !!e || e === "";
}
const kc = (e) => !!(e && e.__v_isRef === !0), re = (e) => _t(e) ? e : e == null ? "" : ve(e) || ft(e) && (e.toString === yc || !Te(e.toString)) ? kc(e) ? re(e.value) : JSON.stringify(e, Tc, 2) : String(e), Tc = (e, t) => kc(t) ? Tc(e, t.value) : Us(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[uo(s, i) + " =>"] = r, n),
    {}
  )
} : mc(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => uo(n))
} : ss(t) ? uo(t) : ft(t) && !ve(t) && !vc(t) ? String(t) : t, uo = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ss(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ht;
class If {
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
function Lf() {
  return Ht;
}
let it;
const fo = /* @__PURE__ */ new WeakSet();
class xc {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ht && Ht.active && Ht.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, fo.has(this) && (fo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Sc(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, sl(this), Ec(this);
    const t = it, n = un;
    it = this, un = !0;
    try {
      return this.fn();
    } finally {
      Cc(this), it = t, un = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ca(t);
      this.deps = this.depsTail = void 0, sl(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? fo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Do(this) && this.run();
  }
  get dirty() {
    return Do(this);
  }
}
let Ac = 0, Ar, Sr;
function Sc(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Sr, Sr = e;
    return;
  }
  e.next = Ar, Ar = e;
}
function aa() {
  Ac++;
}
function la() {
  if (--Ac > 0)
    return;
  if (Sr) {
    let t = Sr;
    for (Sr = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Ar; ) {
    let t = Ar;
    for (Ar = void 0; t; ) {
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
function Ec(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Cc(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), ca(s), Of(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Do(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Rc(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Rc(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Nr) || (e.globalVersion = Nr, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Do(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = it, s = un;
  it = e, un = !0;
  try {
    Ec(e);
    const r = e.fn(e._value);
    (t.version === 0 || Zn(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    it = n, un = s, Cc(e), e.flags &= -3;
  }
}
function ca(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      ca(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Of(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let un = !0;
const Ic = [];
function $n() {
  Ic.push(un), un = !1;
}
function Bn() {
  const e = Ic.pop();
  un = e === void 0 ? !0 : e;
}
function sl(e) {
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
let Nr = 0;
class Nf {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ua {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!it || !un || it === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== it)
      n = this.activeLink = new Nf(it, this), it.deps ? (n.prevDep = it.depsTail, it.depsTail.nextDep = n, it.depsTail = n) : it.deps = it.depsTail = n, Lc(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = it.depsTail, n.nextDep = void 0, it.depsTail.nextDep = n, it.depsTail = n, it.deps === n && (it.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Nr++, this.notify(t);
  }
  notify(t) {
    aa();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      la();
    }
  }
}
function Lc(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Lc(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Fo = /* @__PURE__ */ new WeakMap(), ws = Symbol(
  ""
), $o = Symbol(
  ""
), Pr = Symbol(
  ""
);
function Ot(e, t, n) {
  if (un && it) {
    let s = Fo.get(e);
    s || Fo.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new ua()), r.map = s, r.key = n), r.track();
  }
}
function Pn(e, t, n, s, r, i) {
  const o = Fo.get(e);
  if (!o) {
    Nr++;
    return;
  }
  const a = (l) => {
    l && l.trigger();
  };
  if (aa(), t === "clear")
    o.forEach(a);
  else {
    const l = ve(e), d = l && oa(n);
    if (l && n === "length") {
      const c = Number(s);
      o.forEach((b, w) => {
        (w === "length" || w === Pr || !ss(w) && w >= c) && a(b);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && a(o.get(n)), d && a(o.get(Pr)), t) {
        case "add":
          l ? d && a(o.get("length")) : (a(o.get(ws)), Us(e) && a(o.get($o)));
          break;
        case "delete":
          l || (a(o.get(ws)), Us(e) && a(o.get($o)));
          break;
        case "set":
          Us(e) && a(o.get(ws));
          break;
      }
  }
  la();
}
function Ms(e) {
  const t = He(e);
  return t === e ? t : (Ot(t, "iterate", Pr), on(e) ? t : t.map(Et));
}
function Ui(e) {
  return Ot(e = He(e), "iterate", Pr), e;
}
const Pf = {
  __proto__: null,
  [Symbol.iterator]() {
    return ho(this, Symbol.iterator, Et);
  },
  concat(...e) {
    return Ms(this).concat(
      ...e.map((t) => ve(t) ? Ms(t) : t)
    );
  },
  entries() {
    return ho(this, "entries", (e) => (e[1] = Et(e[1]), e));
  },
  every(e, t) {
    return Ln(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ln(this, "filter", e, t, (n) => n.map(Et), arguments);
  },
  find(e, t) {
    return Ln(this, "find", e, t, Et, arguments);
  },
  findIndex(e, t) {
    return Ln(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ln(this, "findLast", e, t, Et, arguments);
  },
  findLastIndex(e, t) {
    return Ln(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ln(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return po(this, "includes", e);
  },
  indexOf(...e) {
    return po(this, "indexOf", e);
  },
  join(e) {
    return Ms(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return po(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ln(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ur(this, "pop");
  },
  push(...e) {
    return ur(this, "push", e);
  },
  reduce(e, ...t) {
    return rl(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return rl(this, "reduceRight", e, t);
  },
  shift() {
    return ur(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ln(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ur(this, "splice", e);
  },
  toReversed() {
    return Ms(this).toReversed();
  },
  toSorted(e) {
    return Ms(this).toSorted(e);
  },
  toSpliced(...e) {
    return Ms(this).toSpliced(...e);
  },
  unshift(...e) {
    return ur(this, "unshift", e);
  },
  values() {
    return ho(this, "values", Et);
  }
};
function ho(e, t, n) {
  const s = Ui(e), r = s[t]();
  return s !== e && !on(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.value && (i.value = n(i.value)), i;
  }), r;
}
const Mf = Array.prototype;
function Ln(e, t, n, s, r, i) {
  const o = Ui(e), a = o !== e && !on(e), l = o[t];
  if (l !== Mf[t]) {
    const b = l.apply(e, i);
    return a ? Et(b) : b;
  }
  let d = n;
  o !== e && (a ? d = function(b, w) {
    return n.call(this, Et(b), w, e);
  } : n.length > 2 && (d = function(b, w) {
    return n.call(this, b, w, e);
  }));
  const c = l.call(o, d, s);
  return a && r ? r(c) : c;
}
function rl(e, t, n, s) {
  const r = Ui(e);
  let i = n;
  return r !== e && (on(e) ? n.length > 3 && (i = function(o, a, l) {
    return n.call(this, o, a, l, e);
  }) : i = function(o, a, l) {
    return n.call(this, o, Et(a), l, e);
  }), r[t](i, ...s);
}
function po(e, t, n) {
  const s = He(e);
  Ot(s, "iterate", Pr);
  const r = s[t](...n);
  return (r === -1 || r === !1) && da(n[0]) ? (n[0] = He(n[0]), s[t](...n)) : r;
}
function ur(e, t, n = []) {
  $n(), aa();
  const s = He(e)[t].apply(e, n);
  return la(), Bn(), s;
}
const Df = /* @__PURE__ */ sa("__proto__,__v_isRef,__isVue"), Oc = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ss)
);
function Ff(e) {
  ss(e) || (e = String(e));
  const t = He(this);
  return Ot(t, "has", e), t.hasOwnProperty(e);
}
class Nc {
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
      return s === (r ? i ? Kf : Fc : i ? Dc : Mc).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = ve(t);
    if (!r) {
      let l;
      if (o && (l = Pf[n]))
        return l;
      if (n === "hasOwnProperty")
        return Ff;
    }
    const a = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Nt(t) ? t : s
    );
    return (ss(n) ? Oc.has(n) : Df(n)) || (r || Ot(t, "get", n), i) ? a : Nt(a) ? o && oa(n) ? a : a.value : ft(a) ? r ? $c(a) : zi(a) : a;
  }
}
class Pc extends Nc {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    if (!this._isShallow) {
      const l = ts(i);
      if (!on(s) && !ts(s) && (i = He(i), s = He(s)), !ve(t) && Nt(i) && !Nt(s))
        return l ? !1 : (i.value = s, !0);
    }
    const o = ve(t) && oa(n) ? Number(n) < t.length : We(t, n), a = Reflect.set(
      t,
      n,
      s,
      Nt(t) ? t : r
    );
    return t === He(r) && (o ? Zn(s, i) && Pn(t, "set", n, s) : Pn(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = We(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Pn(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!ss(n) || !Oc.has(n)) && Ot(t, "has", n), s;
  }
  ownKeys(t) {
    return Ot(
      t,
      "iterate",
      ve(t) ? "length" : ws
    ), Reflect.ownKeys(t);
  }
}
class $f extends Nc {
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
const Bf = /* @__PURE__ */ new Pc(), Uf = /* @__PURE__ */ new $f(), zf = /* @__PURE__ */ new Pc(!0);
const Bo = (e) => e, ei = (e) => Reflect.getPrototypeOf(e);
function Hf(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = He(r), o = Us(i), a = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, d = r[e](...s), c = n ? Bo : t ? ki : Et;
    return !t && Ot(
      i,
      "iterate",
      l ? $o : ws
    ), {
      // iterator protocol
      next() {
        const { value: b, done: w } = d.next();
        return w ? { value: b, done: w } : {
          value: a ? [c(b[0]), c(b[1])] : c(b),
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
function ti(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Wf(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = He(i), a = He(r);
      e || (Zn(r, a) && Ot(o, "get", r), Ot(o, "get", a));
      const { has: l } = ei(o), d = t ? Bo : e ? ki : Et;
      if (l.call(o, r))
        return d(i.get(r));
      if (l.call(o, a))
        return d(i.get(a));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && Ot(He(r), "iterate", ws), Reflect.get(r, "size", r);
    },
    has(r) {
      const i = this.__v_raw, o = He(i), a = He(r);
      return e || (Zn(r, a) && Ot(o, "has", r), Ot(o, "has", a)), r === a ? i.has(r) : i.has(r) || i.has(a);
    },
    forEach(r, i) {
      const o = this, a = o.__v_raw, l = He(a), d = t ? Bo : e ? ki : Et;
      return !e && Ot(l, "iterate", ws), a.forEach((c, b) => r.call(i, d(c), d(b), o));
    }
  };
  return Pt(
    n,
    e ? {
      add: ti("add"),
      set: ti("set"),
      delete: ti("delete"),
      clear: ti("clear")
    } : {
      add(r) {
        !t && !on(r) && !ts(r) && (r = He(r));
        const i = He(this);
        return ei(i).has.call(i, r) || (i.add(r), Pn(i, "add", r, r)), this;
      },
      set(r, i) {
        !t && !on(i) && !ts(i) && (i = He(i));
        const o = He(this), { has: a, get: l } = ei(o);
        let d = a.call(o, r);
        d || (r = He(r), d = a.call(o, r));
        const c = l.call(o, r);
        return o.set(r, i), d ? Zn(i, c) && Pn(o, "set", r, i) : Pn(o, "add", r, i), this;
      },
      delete(r) {
        const i = He(this), { has: o, get: a } = ei(i);
        let l = o.call(i, r);
        l || (r = He(r), l = o.call(i, r)), a && a.call(i, r);
        const d = i.delete(r);
        return l && Pn(i, "delete", r, void 0), d;
      },
      clear() {
        const r = He(this), i = r.size !== 0, o = r.clear();
        return i && Pn(
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
    n[r] = Hf(r, e, t);
  }), n;
}
function fa(e, t) {
  const n = Wf(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    We(n, r) && r in s ? n : s,
    r,
    i
  );
}
const qf = {
  get: /* @__PURE__ */ fa(!1, !1)
}, jf = {
  get: /* @__PURE__ */ fa(!1, !0)
}, Vf = {
  get: /* @__PURE__ */ fa(!0, !1)
};
const Mc = /* @__PURE__ */ new WeakMap(), Dc = /* @__PURE__ */ new WeakMap(), Fc = /* @__PURE__ */ new WeakMap(), Kf = /* @__PURE__ */ new WeakMap();
function Gf(e) {
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
function Yf(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Gf(wf(e));
}
function zi(e) {
  return ts(e) ? e : ha(
    e,
    !1,
    Bf,
    qf,
    Mc
  );
}
function Xf(e) {
  return ha(
    e,
    !1,
    zf,
    jf,
    Dc
  );
}
function $c(e) {
  return ha(
    e,
    !0,
    Uf,
    Vf,
    Fc
  );
}
function ha(e, t, n, s, r) {
  if (!ft(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = Yf(e);
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
  return ts(e) ? zs(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ts(e) {
  return !!(e && e.__v_isReadonly);
}
function on(e) {
  return !!(e && e.__v_isShallow);
}
function da(e) {
  return e ? !!e.__v_raw : !1;
}
function He(e) {
  const t = e && e.__v_raw;
  return t ? He(t) : e;
}
function Zf(e) {
  return !We(e, "__v_skip") && Object.isExtensible(e) && Po(e, "__v_skip", !0), e;
}
const Et = (e) => ft(e) ? zi(e) : e, ki = (e) => ft(e) ? $c(e) : e;
function Nt(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ce(e) {
  return Jf(e, !1);
}
function Jf(e, t) {
  return Nt(e) ? e : new Qf(e, t);
}
class Qf {
  constructor(t, n) {
    this.dep = new ua(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : He(t), this._value = n ? t : Et(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || on(t) || ts(t);
    t = s ? t : He(t), Zn(t, n) && (this._rawValue = t, this._value = s ? t : Et(t), this.dep.trigger());
  }
}
function C(e) {
  return Nt(e) ? e.value : e;
}
const eh = {
  get: (e, t, n) => t === "__v_raw" ? e : C(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return Nt(r) && !Nt(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Bc(e) {
  return zs(e) ? e : new Proxy(e, eh);
}
class th {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ua(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Nr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    it !== this)
      return Sc(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Rc(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function nh(e, t, n = !1) {
  let s, r;
  return Te(e) ? s = e : (s = e.get, r = e.set), new th(s, r, n);
}
const ni = {}, Ti = /* @__PURE__ */ new WeakMap();
let ms;
function sh(e, t = !1, n = ms) {
  if (n) {
    let s = Ti.get(n);
    s || Ti.set(n, s = []), s.push(e);
  }
}
function rh(e, t, n = tt) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: a, call: l } = n, d = (S) => r ? S : on(S) || r === !1 || r === 0 ? Mn(S, 1) : Mn(S);
  let c, b, w, z, B = !1, V = !1;
  if (Nt(e) ? (b = () => e.value, B = on(e)) : zs(e) ? (b = () => d(e), B = !0) : ve(e) ? (V = !0, B = e.some((S) => zs(S) || on(S)), b = () => e.map((S) => {
    if (Nt(S))
      return S.value;
    if (zs(S))
      return d(S);
    if (Te(S))
      return l ? l(S, 2) : S();
  })) : Te(e) ? t ? b = l ? () => l(e, 2) : e : b = () => {
    if (w) {
      $n();
      try {
        w();
      } finally {
        Bn();
      }
    }
    const S = ms;
    ms = c;
    try {
      return l ? l(e, 3, [z]) : e(z);
    } finally {
      ms = S;
    }
  } : b = _n, t && r) {
    const S = b, I = r === !0 ? 1 / 0 : r;
    b = () => Mn(S(), I);
  }
  const M = Lf(), te = () => {
    c.stop(), M && M.active && ia(M.effects, c);
  };
  if (i && t) {
    const S = t;
    t = (...I) => {
      S(...I), te();
    };
  }
  let fe = V ? new Array(e.length).fill(ni) : ni;
  const he = (S) => {
    if (!(!(c.flags & 1) || !c.dirty && !S))
      if (t) {
        const I = c.run();
        if (r || B || (V ? I.some((Y, Z) => Zn(Y, fe[Z])) : Zn(I, fe))) {
          w && w();
          const Y = ms;
          ms = c;
          try {
            const Z = [
              I,
              // pass undefined as the old value when it's changed for the first time
              fe === ni ? void 0 : V && fe[0] === ni ? [] : fe,
              z
            ];
            fe = I, l ? l(t, 3, Z) : (
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
  return a && a(he), c = new xc(b), c.scheduler = o ? () => o(he, !1) : he, z = (S) => sh(S, !1, c), w = c.onStop = () => {
    const S = Ti.get(c);
    if (S) {
      if (l)
        l(S, 4);
      else
        for (const I of S) I();
      Ti.delete(c);
    }
  }, t ? s ? he(!0) : fe = c.run() : o ? o(he.bind(null, !0), !0) : c.run(), te.pause = c.pause.bind(c), te.resume = c.resume.bind(c), te.stop = te, te;
}
function Mn(e, t = 1 / 0, n) {
  if (t <= 0 || !ft(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, Nt(e))
    Mn(e.value, t, n);
  else if (ve(e))
    for (let s = 0; s < e.length; s++)
      Mn(e[s], t, n);
  else if (mc(e) || Us(e))
    e.forEach((s) => {
      Mn(s, t, n);
    });
  else if (vc(e)) {
    for (const s in e)
      Mn(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Mn(e[s], t, n);
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
    Hi(r, t, n);
  }
}
function bn(e, t, n, s) {
  if (Te(e)) {
    const r = $r(e, t, n, s);
    return r && _c(r) && r.catch((i) => {
      Hi(i, t, n);
    }), r;
  }
  if (ve(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(bn(e[i], t, n, s));
    return r;
  }
}
function Hi(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || tt;
  if (t) {
    let a = t.parent;
    const l = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const c = a.ec;
      if (c) {
        for (let b = 0; b < c.length; b++)
          if (c[b](e, l, d) === !1)
            return;
      }
      a = a.parent;
    }
    if (i) {
      $n(), $r(i, null, 10, [
        e,
        l,
        d
      ]), Bn();
      return;
    }
  }
  ih(e, n, r, s, o);
}
function ih(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Bt = [];
let gn = -1;
const Hs = [];
let Yn = null, Ds = 0;
const Uc = /* @__PURE__ */ Promise.resolve();
let xi = null;
function ks(e) {
  const t = xi || Uc;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function oh(e) {
  let t = gn + 1, n = Bt.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = Bt[s], i = Mr(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function pa(e) {
  if (!(e.flags & 1)) {
    const t = Mr(e), n = Bt[Bt.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Mr(n) ? Bt.push(e) : Bt.splice(oh(t), 0, e), e.flags |= 1, zc();
  }
}
function zc() {
  xi || (xi = Uc.then(Wc));
}
function ah(e) {
  ve(e) ? Hs.push(...e) : Yn && e.id === -1 ? Yn.splice(Ds + 1, 0, e) : e.flags & 1 || (Hs.push(e), e.flags |= 1), zc();
}
function il(e, t, n = gn + 1) {
  for (; n < Bt.length; n++) {
    const s = Bt[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      Bt.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Hc(e) {
  if (Hs.length) {
    const t = [...new Set(Hs)].sort(
      (n, s) => Mr(n) - Mr(s)
    );
    if (Hs.length = 0, Yn) {
      Yn.push(...t);
      return;
    }
    for (Yn = t, Ds = 0; Ds < Yn.length; Ds++) {
      const n = Yn[Ds];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Yn = null, Ds = 0;
  }
}
const Mr = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Wc(e) {
  try {
    for (gn = 0; gn < Bt.length; gn++) {
      const t = Bt[gn];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), $r(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; gn < Bt.length; gn++) {
      const t = Bt[gn];
      t && (t.flags &= -2);
    }
    gn = -1, Bt.length = 0, Hc(), xi = null, (Bt.length || Hs.length) && Wc();
  }
}
let rn = null, qc = null;
function Ai(e) {
  const t = rn;
  return rn = e, qc = e && e.type.__scopeId || null, t;
}
function lh(e, t = rn, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && pl(-1);
    const i = Ai(t);
    let o;
    try {
      o = e(...r);
    } finally {
      Ai(i), s._d && pl(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Kn(e, t) {
  if (rn === null)
    return e;
  const n = Ki(rn), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, a, l = tt] = t[r];
    i && (Te(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Mn(o), s.push({
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
    l && ($n(), bn(l, n, 8, [
      e.el,
      a,
      e,
      t
    ]), Bn());
  }
}
const ch = Symbol("_vte"), uh = (e) => e.__isTeleport;
function ga(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, ga(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ma(e, t) {
  return Te(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Pt({ name: e.name }, t, { setup: e })
  ) : e;
}
function jc(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Er(e, t, n, s, r = !1) {
  if (ve(e)) {
    e.forEach(
      (B, V) => Er(
        B,
        t && (ve(t) ? t[V] : t),
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
  const i = s.shapeFlag & 4 ? Ki(s.component) : s.el, o = r ? null : i, { i: a, r: l } = e, d = t && t.r, c = a.refs === tt ? a.refs = {} : a.refs, b = a.setupState, w = He(b), z = b === tt ? () => !1 : (B) => We(w, B);
  if (d != null && d !== l && (_t(d) ? (c[d] = null, z(d) && (b[d] = null)) : Nt(d) && (d.value = null)), Te(l))
    $r(l, a, 12, [o, c]);
  else {
    const B = _t(l), V = Nt(l);
    if (B || V) {
      const M = () => {
        if (e.f) {
          const te = B ? z(l) ? b[l] : c[l] : l.value;
          r ? ve(te) && ia(te, i) : ve(te) ? te.includes(i) || te.push(i) : B ? (c[l] = [i], z(l) && (b[l] = c[l])) : (l.value = [i], e.k && (c[e.k] = l.value));
        } else B ? (c[l] = o, z(l) && (b[l] = o)) : V && (l.value = o, e.k && (c[e.k] = o));
      };
      o ? (M.id = -1, Vt(M, n)) : M();
    }
  }
}
Bi().requestIdleCallback;
Bi().cancelIdleCallback;
const Cr = (e) => !!e.type.__asyncLoader, Vc = (e) => e.type.__isKeepAlive;
function fh(e, t) {
  Kc(e, "a", t);
}
function hh(e, t) {
  Kc(e, "da", t);
}
function Kc(e, t, n = Ut) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Wi(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Vc(r.parent.vnode) && dh(s, t, n, r), r = r.parent;
  }
}
function dh(e, t, n, s) {
  const r = Wi(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Br(() => {
    ia(s[t], r);
  }, n);
}
function Wi(e, t, n = Ut, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      $n();
      const a = Ur(n), l = bn(t, n, e, o);
      return a(), Bn(), l;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Un = (e) => (t, n = Ut) => {
  (!Fr || e === "sp") && Wi(e, (...s) => t(...s), n);
}, ph = Un("bm"), qi = Un("m"), gh = Un(
  "bu"
), mh = Un("u"), Gc = Un(
  "bum"
), Br = Un("um"), _h = Un(
  "sp"
), yh = Un("rtg"), vh = Un("rtc");
function bh(e, t = Ut) {
  Wi("ec", e, t);
}
const wh = Symbol.for("v-ndc");
function St(e, t, n, s) {
  let r;
  const i = n, o = ve(e);
  if (o || _t(e)) {
    const a = o && zs(e);
    let l = !1, d = !1;
    a && (l = !on(e), d = ts(e), e = Ui(e)), r = new Array(e.length);
    for (let c = 0, b = e.length; c < b; c++)
      r[c] = t(
        l ? d ? ki(Et(e[c])) : Et(e[c]) : e[c],
        c,
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
      for (let l = 0, d = a.length; l < d; l++) {
        const c = a[l];
        r[l] = t(e[c], c, l, i);
      }
    }
  else
    r = [];
  return r;
}
const Uo = (e) => e ? gu(e) ? Ki(e) : Uo(e.parent) : null, Rr = (
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
    $parent: (e) => Uo(e.parent),
    $root: (e) => Uo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Xc(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      pa(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ks.bind(e.proxy)),
    $watch: (e) => Wh.bind(e)
  })
), go = (e, t) => e !== tt && !e.__isScriptSetup && We(e, t), kh = {
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
        if (go(s, t))
          return o[t] = 1, s[t];
        if (r !== tt && We(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && We(d, t)
        )
          return o[t] = 3, i[t];
        if (n !== tt && We(n, t))
          return o[t] = 4, n[t];
        zo && (o[t] = 0);
      }
    }
    const c = Rr[t];
    let b, w;
    if (c)
      return t === "$attrs" && Ot(e.attrs, "get", ""), c(e);
    if (
      // css module (injected by vue-loader)
      (b = a.__cssModules) && (b = b[t])
    )
      return b;
    if (n !== tt && We(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      w = l.config.globalProperties, We(w, t)
    )
      return w[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return go(r, t) ? (r[t] = n, !0) : s !== tt && We(s, t) ? (s[t] = n, !0) : We(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i }
  }, o) {
    let a;
    return !!n[o] || e !== tt && We(e, o) || go(t, o) || (a = i[0]) && We(a, o) || We(s, o) || We(Rr, o) || We(r.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : We(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function ol(e) {
  return ve(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let zo = !0;
function Th(e) {
  const t = Xc(e), n = e.proxy, s = e.ctx;
  zo = !1, t.beforeCreate && al(t.beforeCreate, e, "bc");
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
    beforeMount: b,
    mounted: w,
    beforeUpdate: z,
    updated: B,
    activated: V,
    deactivated: M,
    beforeDestroy: te,
    beforeUnmount: fe,
    destroyed: he,
    unmounted: S,
    render: I,
    renderTracked: Y,
    renderTriggered: Z,
    errorCaptured: xe,
    serverPrefetch: Oe,
    // public API
    expose: _e,
    inheritAttrs: Me,
    // assets
    components: be,
    directives: je,
    filters: Ve
  } = t;
  if (d && xh(d, s, null), o)
    for (const ye in o) {
      const me = o[ye];
      Te(me) && (s[ye] = me.bind(n));
    }
  if (r) {
    const ye = r.call(n, n);
    ft(ye) && (e.data = zi(ye));
  }
  if (zo = !0, i)
    for (const ye in i) {
      const me = i[ye], nt = Te(me) ? me.bind(n, n) : Te(me.get) ? me.get.bind(n, n) : _n, Ke = !Te(me) && Te(me.set) ? me.set.bind(n) : _n, Ae = de({
        get: nt,
        set: Ke
      });
      Object.defineProperty(s, ye, {
        enumerable: !0,
        configurable: !0,
        get: () => Ae.value,
        set: (Ze) => Ae.value = Ze
      });
    }
  if (a)
    for (const ye in a)
      Yc(a[ye], s, n, ye);
  if (l) {
    const ye = Te(l) ? l.call(n) : l;
    Reflect.ownKeys(ye).forEach((me) => {
      Ih(me, ye[me]);
    });
  }
  c && al(c, e, "c");
  function ue(ye, me) {
    ve(me) ? me.forEach((nt) => ye(nt.bind(n))) : me && ye(me.bind(n));
  }
  if (ue(ph, b), ue(qi, w), ue(gh, z), ue(mh, B), ue(fh, V), ue(hh, M), ue(bh, xe), ue(vh, Y), ue(yh, Z), ue(Gc, fe), ue(Br, S), ue(_h, Oe), ve(_e))
    if (_e.length) {
      const ye = e.exposed || (e.exposed = {});
      _e.forEach((me) => {
        Object.defineProperty(ye, me, {
          get: () => n[me],
          set: (nt) => n[me] = nt,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  I && e.render === _n && (e.render = I), Me != null && (e.inheritAttrs = Me), be && (e.components = be), je && (e.directives = je), Oe && jc(e);
}
function xh(e, t, n = _n) {
  ve(e) && (e = Ho(e));
  for (const s in e) {
    const r = e[s];
    let i;
    ft(r) ? "default" in r ? i = li(
      r.from || s,
      r.default,
      !0
    ) : i = li(r.from || s) : i = li(r), Nt(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function al(e, t, n) {
  bn(
    ve(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Yc(e, t, n, s) {
  let r = s.includes(".") ? cu(n, s) : () => n[s];
  if (_t(e)) {
    const i = t[e];
    Te(i) && $t(r, i);
  } else if (Te(e))
    $t(r, e.bind(n));
  else if (ft(e))
    if (ve(e))
      e.forEach((i) => Yc(i, t, n, s));
    else {
      const i = Te(e.handler) ? e.handler.bind(n) : t[e.handler];
      Te(i) && $t(r, i, e);
    }
}
function Xc(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, a = i.get(t);
  let l;
  return a ? l = a : !r.length && !n && !s ? l = t : (l = {}, r.length && r.forEach(
    (d) => Si(l, d, o, !0)
  ), Si(l, t, o)), ft(t) && i.set(t, l), l;
}
function Si(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && Si(e, i, n, !0), r && r.forEach(
    (o) => Si(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const a = Ah[o] || n && n[o];
      e[o] = a ? a(e[o], t[o]) : t[o];
    }
  return e;
}
const Ah = {
  data: ll,
  props: cl,
  emits: cl,
  // objects
  methods: br,
  computed: br,
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
  components: br,
  directives: br,
  // watch
  watch: Eh,
  // provide / inject
  provide: ll,
  inject: Sh
};
function ll(e, t) {
  return t ? e ? function() {
    return Pt(
      Te(e) ? e.call(this, this) : e,
      Te(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Sh(e, t) {
  return br(Ho(e), Ho(t));
}
function Ho(e) {
  if (ve(e)) {
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
function br(e, t) {
  return e ? Pt(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function cl(e, t) {
  return e ? ve(e) && ve(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Pt(
    /* @__PURE__ */ Object.create(null),
    ol(e),
    ol(t ?? {})
  ) : t;
}
function Eh(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Pt(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Dt(e[s], t[s]);
  return n;
}
function Zc() {
  return {
    app: null,
    config: {
      isNativeTag: vf,
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
let Ch = 0;
function Rh(e, t) {
  return function(s, r = null) {
    Te(s) || (s = Pt({}, s)), r != null && !ft(r) && (r = null);
    const i = Zc(), o = /* @__PURE__ */ new WeakSet(), a = [];
    let l = !1;
    const d = i.app = {
      _uid: Ch++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: ud,
      get config() {
        return i.config;
      },
      set config(c) {
      },
      use(c, ...b) {
        return o.has(c) || (c && Te(c.install) ? (o.add(c), c.install(d, ...b)) : Te(c) && (o.add(c), c(d, ...b))), d;
      },
      mixin(c) {
        return i.mixins.includes(c) || i.mixins.push(c), d;
      },
      component(c, b) {
        return b ? (i.components[c] = b, d) : i.components[c];
      },
      directive(c, b) {
        return b ? (i.directives[c] = b, d) : i.directives[c];
      },
      mount(c, b, w) {
        if (!l) {
          const z = d._ceVNode || yn(s, r);
          return z.appContext = i, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(z, c, w), l = !0, d._container = c, c.__vue_app__ = d, Ki(z.component);
        }
      },
      onUnmount(c) {
        a.push(c);
      },
      unmount() {
        l && (bn(
          a,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(c, b) {
        return i.provides[c] = b, d;
      },
      runWithContext(c) {
        const b = Ws;
        Ws = d;
        try {
          return c();
        } finally {
          Ws = b;
        }
      }
    };
    return d;
  };
}
let Ws = null;
function Ih(e, t) {
  if (Ut) {
    let n = Ut.provides;
    const s = Ut.parent && Ut.parent.provides;
    s === n && (n = Ut.provides = Object.create(s)), n[e] = t;
  }
}
function li(e, t, n = !1) {
  const s = rd();
  if (s || Ws) {
    let r = Ws ? Ws._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && Te(t) ? t.call(s && s.proxy) : t;
  }
}
const Jc = {}, Qc = () => Object.create(Jc), eu = (e) => Object.getPrototypeOf(e) === Jc;
function Lh(e, t, n, s = !1) {
  const r = {}, i = Qc();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), tu(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : Xf(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function Oh(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, a = He(r), [l] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const c = e.vnode.dynamicProps;
      for (let b = 0; b < c.length; b++) {
        let w = c[b];
        if (ji(e.emitsOptions, w))
          continue;
        const z = t[w];
        if (l)
          if (We(i, w))
            z !== i[w] && (i[w] = z, d = !0);
          else {
            const B = es(w);
            r[B] = Wo(
              l,
              a,
              B,
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
    tu(e, t, r, i) && (d = !0);
    let c;
    for (const b in a)
      (!t || // for camelCase
      !We(t, b) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = rs(b)) === b || !We(t, c))) && (l ? n && // for camelCase
      (n[b] !== void 0 || // for kebab-case
      n[c] !== void 0) && (r[b] = Wo(
        l,
        a,
        b,
        void 0,
        e,
        !0
      )) : delete r[b]);
    if (i !== a)
      for (const b in i)
        (!t || !We(t, b)) && (delete i[b], d = !0);
  }
  d && Pn(e.attrs, "set", "");
}
function tu(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, a;
  if (t)
    for (let l in t) {
      if (xr(l))
        continue;
      const d = t[l];
      let c;
      r && We(r, c = es(l)) ? !i || !i.includes(c) ? n[c] = d : (a || (a = {}))[c] = d : ji(e.emitsOptions, l) || (!(l in s) || d !== s[l]) && (s[l] = d, o = !0);
    }
  if (i) {
    const l = He(n), d = a || tt;
    for (let c = 0; c < i.length; c++) {
      const b = i[c];
      n[b] = Wo(
        r,
        l,
        b,
        d[b],
        e,
        !We(d, b)
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
      if (o.type !== Function && !o.skipFactory && Te(l)) {
        const { propsDefaults: d } = r;
        if (n in d)
          s = d[n];
        else {
          const c = Ur(r);
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
    ] && (s === "" || s === rs(n)) && (s = !0));
  }
  return s;
}
const Nh = /* @__PURE__ */ new WeakMap();
function nu(e, t, n = !1) {
  const s = n ? Nh : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, a = [];
  let l = !1;
  if (!Te(e)) {
    const c = (b) => {
      l = !0;
      const [w, z] = nu(b, t, !0);
      Pt(o, w), z && a.push(...z);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!i && !l)
    return ft(e) && s.set(e, Bs), Bs;
  if (ve(i))
    for (let c = 0; c < i.length; c++) {
      const b = es(i[c]);
      ul(b) && (o[b] = tt);
    }
  else if (i)
    for (const c in i) {
      const b = es(c);
      if (ul(b)) {
        const w = i[c], z = o[b] = ve(w) || Te(w) ? { type: w } : Pt({}, w), B = z.type;
        let V = !1, M = !0;
        if (ve(B))
          for (let te = 0; te < B.length; ++te) {
            const fe = B[te], he = Te(fe) && fe.name;
            if (he === "Boolean") {
              V = !0;
              break;
            } else he === "String" && (M = !1);
          }
        else
          V = Te(B) && B.name === "Boolean";
        z[
          0
          /* shouldCast */
        ] = V, z[
          1
          /* shouldCastTrue */
        ] = M, (V || We(z, "default")) && a.push(b);
      }
    }
  const d = [o, a];
  return ft(e) && s.set(e, d), d;
}
function ul(e) {
  return e[0] !== "$" && !xr(e);
}
const _a = (e) => e === "_" || e === "__" || e === "_ctx" || e === "$stable", ya = (e) => ve(e) ? e.map(mn) : [mn(e)], Ph = (e, t, n) => {
  if (t._n)
    return t;
  const s = lh((...r) => ya(t(...r)), n);
  return s._c = !1, s;
}, su = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (_a(r)) continue;
    const i = e[r];
    if (Te(i))
      t[r] = Ph(r, i, s);
    else if (i != null) {
      const o = ya(i);
      t[r] = () => o;
    }
  }
}, ru = (e, t) => {
  const n = ya(t);
  e.slots.default = () => n;
}, iu = (e, t, n) => {
  for (const s in t)
    (n || !_a(s)) && (e[s] = t[s]);
}, Mh = (e, t, n) => {
  const s = e.slots = Qc();
  if (e.vnode.shapeFlag & 32) {
    const r = t.__;
    r && Po(s, "__", r, !0);
    const i = t._;
    i ? (iu(s, t, n), n && Po(s, "_", i, !0)) : su(t, s);
  } else t && ru(e, t);
}, Dh = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = tt;
  if (s.shapeFlag & 32) {
    const a = t._;
    a ? n && a === 1 ? i = !1 : iu(r, t, n) : (i = !t.$stable, su(t, r)), o = t;
  } else t && (ru(e, t), o = { default: 1 });
  if (i)
    for (const a in r)
      !_a(a) && o[a] == null && delete r[a];
}, Vt = Xh;
function Fh(e) {
  return $h(e);
}
function $h(e, t) {
  const n = Bi();
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
    parentNode: b,
    nextSibling: w,
    setScopeId: z = _n,
    insertStaticContent: B
  } = e, V = (m, y, R, N = null, F = null, L = null, G = void 0, W = null, q = !!y.dynamicChildren) => {
    if (m === y)
      return;
    m && !fr(m, y) && (N = gt(m), Ze(m, F, L, !0), m = null), y.patchFlag === -2 && (q = !1, y.dynamicChildren = null);
    const { type: $, ref: ne, shapeFlag: X } = y;
    switch ($) {
      case Vi:
        M(m, y, R, N);
        break;
      case ns:
        te(m, y, R, N);
        break;
      case ci:
        m == null && fe(y, R, N, G);
        break;
      case Be:
        be(
          m,
          y,
          R,
          N,
          F,
          L,
          G,
          W,
          q
        );
        break;
      default:
        X & 1 ? I(
          m,
          y,
          R,
          N,
          F,
          L,
          G,
          W,
          q
        ) : X & 6 ? je(
          m,
          y,
          R,
          N,
          F,
          L,
          G,
          W,
          q
        ) : (X & 64 || X & 128) && $.process(
          m,
          y,
          R,
          N,
          F,
          L,
          G,
          W,
          q,
          Mt
        );
    }
    ne != null && F ? Er(ne, m && m.ref, L, y || m, !y) : ne == null && m && m.ref != null && Er(m.ref, null, L, m, !0);
  }, M = (m, y, R, N) => {
    if (m == null)
      s(
        y.el = a(y.children),
        R,
        N
      );
    else {
      const F = y.el = m.el;
      y.children !== m.children && d(F, y.children);
    }
  }, te = (m, y, R, N) => {
    m == null ? s(
      y.el = l(y.children || ""),
      R,
      N
    ) : y.el = m.el;
  }, fe = (m, y, R, N) => {
    [m.el, m.anchor] = B(
      m.children,
      y,
      R,
      N,
      m.el,
      m.anchor
    );
  }, he = ({ el: m, anchor: y }, R, N) => {
    let F;
    for (; m && m !== y; )
      F = w(m), s(m, R, N), m = F;
    s(y, R, N);
  }, S = ({ el: m, anchor: y }) => {
    let R;
    for (; m && m !== y; )
      R = w(m), r(m), m = R;
    r(y);
  }, I = (m, y, R, N, F, L, G, W, q) => {
    y.type === "svg" ? G = "svg" : y.type === "math" && (G = "mathml"), m == null ? Y(
      y,
      R,
      N,
      F,
      L,
      G,
      W,
      q
    ) : Oe(
      m,
      y,
      F,
      L,
      G,
      W,
      q
    );
  }, Y = (m, y, R, N, F, L, G, W) => {
    let q, $;
    const { props: ne, shapeFlag: X, transition: E, dirs: O } = m;
    if (q = m.el = o(
      m.type,
      L,
      ne && ne.is,
      ne
    ), X & 8 ? c(q, m.children) : X & 16 && xe(
      m.children,
      q,
      null,
      N,
      F,
      mo(m, L),
      G,
      W
    ), O && fs(m, null, N, "created"), Z(q, m, m.scopeId, G, N), ne) {
      for (const J in ne)
        J !== "value" && !xr(J) && i(q, J, null, ne[J], L, N);
      "value" in ne && i(q, "value", null, ne.value, L), ($ = ne.onVnodeBeforeMount) && dn($, N, m);
    }
    O && fs(m, null, N, "beforeMount");
    const K = Bh(F, E);
    K && E.beforeEnter(q), s(q, y, R), (($ = ne && ne.onVnodeMounted) || K || O) && Vt(() => {
      $ && dn($, N, m), K && E.enter(q), O && fs(m, null, N, "mounted");
    }, F);
  }, Z = (m, y, R, N, F) => {
    if (R && z(m, R), N)
      for (let L = 0; L < N.length; L++)
        z(m, N[L]);
    if (F) {
      let L = F.subTree;
      if (y === L || fu(L.type) && (L.ssContent === y || L.ssFallback === y)) {
        const G = F.vnode;
        Z(
          m,
          G,
          G.scopeId,
          G.slotScopeIds,
          F.parent
        );
      }
    }
  }, xe = (m, y, R, N, F, L, G, W, q = 0) => {
    for (let $ = q; $ < m.length; $++) {
      const ne = m[$] = W ? Xn(m[$]) : mn(m[$]);
      V(
        null,
        ne,
        y,
        R,
        N,
        F,
        L,
        G,
        W
      );
    }
  }, Oe = (m, y, R, N, F, L, G) => {
    const W = y.el = m.el;
    let { patchFlag: q, dynamicChildren: $, dirs: ne } = y;
    q |= m.patchFlag & 16;
    const X = m.props || tt, E = y.props || tt;
    let O;
    if (R && hs(R, !1), (O = E.onVnodeBeforeUpdate) && dn(O, R, y, m), ne && fs(y, m, R, "beforeUpdate"), R && hs(R, !0), (X.innerHTML && E.innerHTML == null || X.textContent && E.textContent == null) && c(W, ""), $ ? _e(
      m.dynamicChildren,
      $,
      W,
      R,
      N,
      mo(y, F),
      L
    ) : G || me(
      m,
      y,
      W,
      null,
      R,
      N,
      mo(y, F),
      L,
      !1
    ), q > 0) {
      if (q & 16)
        Me(W, X, E, R, F);
      else if (q & 2 && X.class !== E.class && i(W, "class", null, E.class, F), q & 4 && i(W, "style", X.style, E.style, F), q & 8) {
        const K = y.dynamicProps;
        for (let J = 0; J < K.length; J++) {
          const ae = K[J], we = X[ae], Ee = E[ae];
          (Ee !== we || ae === "value") && i(W, ae, we, Ee, F, R);
        }
      }
      q & 1 && m.children !== y.children && c(W, y.children);
    } else !G && $ == null && Me(W, X, E, R, F);
    ((O = E.onVnodeUpdated) || ne) && Vt(() => {
      O && dn(O, R, y, m), ne && fs(y, m, R, "updated");
    }, N);
  }, _e = (m, y, R, N, F, L, G) => {
    for (let W = 0; W < y.length; W++) {
      const q = m[W], $ = y[W], ne = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        q.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (q.type === Be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !fr(q, $) || // - In the case of a component, it could contain anything.
        q.shapeFlag & 198) ? b(q.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          R
        )
      );
      V(
        q,
        $,
        ne,
        null,
        N,
        F,
        L,
        G,
        !0
      );
    }
  }, Me = (m, y, R, N, F) => {
    if (y !== R) {
      if (y !== tt)
        for (const L in y)
          !xr(L) && !(L in R) && i(
            m,
            L,
            y[L],
            null,
            F,
            N
          );
      for (const L in R) {
        if (xr(L)) continue;
        const G = R[L], W = y[L];
        G !== W && L !== "value" && i(m, L, W, G, F, N);
      }
      "value" in R && i(m, "value", y.value, R.value, F);
    }
  }, be = (m, y, R, N, F, L, G, W, q) => {
    const $ = y.el = m ? m.el : a(""), ne = y.anchor = m ? m.anchor : a("");
    let { patchFlag: X, dynamicChildren: E, slotScopeIds: O } = y;
    O && (W = W ? W.concat(O) : O), m == null ? (s($, R, N), s(ne, R, N), xe(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      y.children || [],
      R,
      ne,
      F,
      L,
      G,
      W,
      q
    )) : X > 0 && X & 64 && E && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    m.dynamicChildren ? (_e(
      m.dynamicChildren,
      E,
      R,
      F,
      L,
      G,
      W
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (y.key != null || F && y === F.subTree) && ou(
      m,
      y,
      !0
      /* shallow */
    )) : me(
      m,
      y,
      R,
      ne,
      F,
      L,
      G,
      W,
      q
    );
  }, je = (m, y, R, N, F, L, G, W, q) => {
    y.slotScopeIds = W, m == null ? y.shapeFlag & 512 ? F.ctx.activate(
      y,
      R,
      N,
      G,
      q
    ) : Ve(
      y,
      R,
      N,
      F,
      L,
      G,
      q
    ) : ot(m, y, q);
  }, Ve = (m, y, R, N, F, L, G) => {
    const W = m.component = sd(
      m,
      N,
      F
    );
    if (Vc(m) && (W.ctx.renderer = Mt), id(W, !1, G), W.asyncDep) {
      if (F && F.registerDep(W, ue, G), !m.el) {
        const q = W.subTree = yn(ns);
        te(null, q, y, R), m.placeholder = q.el;
      }
    } else
      ue(
        W,
        m,
        y,
        R,
        F,
        L,
        G
      );
  }, ot = (m, y, R) => {
    const N = y.component = m.component;
    if (Gh(m, y, R))
      if (N.asyncDep && !N.asyncResolved) {
        ye(N, y, R);
        return;
      } else
        N.next = y, N.update();
    else
      y.el = m.el, N.vnode = y;
  }, ue = (m, y, R, N, F, L, G) => {
    const W = () => {
      if (m.isMounted) {
        let { next: X, bu: E, u: O, parent: K, vnode: J } = m;
        {
          const h = au(m);
          if (h) {
            X && (X.el = J.el, ye(m, X, G)), h.asyncDep.then(() => {
              m.isUnmounted || W();
            });
            return;
          }
        }
        let ae = X, we;
        hs(m, !1), X ? (X.el = J.el, ye(m, X, G)) : X = J, E && ai(E), (we = X.props && X.props.onVnodeBeforeUpdate) && dn(we, K, X, J), hs(m, !0);
        const Ee = hl(m), Pe = m.subTree;
        m.subTree = Ee, V(
          Pe,
          Ee,
          // parent may have changed if it's in a teleport
          b(Pe.el),
          // anchor may have changed if it's in a fragment
          gt(Pe),
          m,
          F,
          L
        ), X.el = Ee.el, ae === null && Yh(m, Ee.el), O && Vt(O, F), (we = X.props && X.props.onVnodeUpdated) && Vt(
          () => dn(we, K, X, J),
          F
        );
      } else {
        let X;
        const { el: E, props: O } = y, { bm: K, m: J, parent: ae, root: we, type: Ee } = m, Pe = Cr(y);
        hs(m, !1), K && ai(K), !Pe && (X = O && O.onVnodeBeforeMount) && dn(X, ae, y), hs(m, !0);
        {
          we.ce && // @ts-expect-error _def is private
          we.ce._def.shadowRoot !== !1 && we.ce._injectChildStyle(Ee);
          const h = m.subTree = hl(m);
          V(
            null,
            h,
            R,
            N,
            m,
            F,
            L
          ), y.el = h.el;
        }
        if (J && Vt(J, F), !Pe && (X = O && O.onVnodeMounted)) {
          const h = y;
          Vt(
            () => dn(X, ae, h),
            F
          );
        }
        (y.shapeFlag & 256 || ae && Cr(ae.vnode) && ae.vnode.shapeFlag & 256) && m.a && Vt(m.a, F), m.isMounted = !0, y = R = N = null;
      }
    };
    m.scope.on();
    const q = m.effect = new xc(W);
    m.scope.off();
    const $ = m.update = q.run.bind(q), ne = m.job = q.runIfDirty.bind(q);
    ne.i = m, ne.id = m.uid, q.scheduler = () => pa(ne), hs(m, !0), $();
  }, ye = (m, y, R) => {
    y.component = m;
    const N = m.vnode.props;
    m.vnode = y, m.next = null, Oh(m, y.props, N, R), Dh(m, y.children, R), $n(), il(m), Bn();
  }, me = (m, y, R, N, F, L, G, W, q = !1) => {
    const $ = m && m.children, ne = m ? m.shapeFlag : 0, X = y.children, { patchFlag: E, shapeFlag: O } = y;
    if (E > 0) {
      if (E & 128) {
        Ke(
          $,
          X,
          R,
          N,
          F,
          L,
          G,
          W,
          q
        );
        return;
      } else if (E & 256) {
        nt(
          $,
          X,
          R,
          N,
          F,
          L,
          G,
          W,
          q
        );
        return;
      }
    }
    O & 8 ? (ne & 16 && vt($, F, L), X !== $ && c(R, X)) : ne & 16 ? O & 16 ? Ke(
      $,
      X,
      R,
      N,
      F,
      L,
      G,
      W,
      q
    ) : vt($, F, L, !0) : (ne & 8 && c(R, ""), O & 16 && xe(
      X,
      R,
      N,
      F,
      L,
      G,
      W,
      q
    ));
  }, nt = (m, y, R, N, F, L, G, W, q) => {
    m = m || Bs, y = y || Bs;
    const $ = m.length, ne = y.length, X = Math.min($, ne);
    let E;
    for (E = 0; E < X; E++) {
      const O = y[E] = q ? Xn(y[E]) : mn(y[E]);
      V(
        m[E],
        O,
        R,
        null,
        F,
        L,
        G,
        W,
        q
      );
    }
    $ > ne ? vt(
      m,
      F,
      L,
      !0,
      !1,
      X
    ) : xe(
      y,
      R,
      N,
      F,
      L,
      G,
      W,
      q,
      X
    );
  }, Ke = (m, y, R, N, F, L, G, W, q) => {
    let $ = 0;
    const ne = y.length;
    let X = m.length - 1, E = ne - 1;
    for (; $ <= X && $ <= E; ) {
      const O = m[$], K = y[$] = q ? Xn(y[$]) : mn(y[$]);
      if (fr(O, K))
        V(
          O,
          K,
          R,
          null,
          F,
          L,
          G,
          W,
          q
        );
      else
        break;
      $++;
    }
    for (; $ <= X && $ <= E; ) {
      const O = m[X], K = y[E] = q ? Xn(y[E]) : mn(y[E]);
      if (fr(O, K))
        V(
          O,
          K,
          R,
          null,
          F,
          L,
          G,
          W,
          q
        );
      else
        break;
      X--, E--;
    }
    if ($ > X) {
      if ($ <= E) {
        const O = E + 1, K = O < ne ? y[O].el : N;
        for (; $ <= E; )
          V(
            null,
            y[$] = q ? Xn(y[$]) : mn(y[$]),
            R,
            K,
            F,
            L,
            G,
            W,
            q
          ), $++;
      }
    } else if ($ > E)
      for (; $ <= X; )
        Ze(m[$], F, L, !0), $++;
    else {
      const O = $, K = $, J = /* @__PURE__ */ new Map();
      for ($ = K; $ <= E; $++) {
        const T = y[$] = q ? Xn(y[$]) : mn(y[$]);
        T.key != null && J.set(T.key, $);
      }
      let ae, we = 0;
      const Ee = E - K + 1;
      let Pe = !1, h = 0;
      const _ = new Array(Ee);
      for ($ = 0; $ < Ee; $++) _[$] = 0;
      for ($ = O; $ <= X; $++) {
        const T = m[$];
        if (we >= Ee) {
          Ze(T, F, L, !0);
          continue;
        }
        let H;
        if (T.key != null)
          H = J.get(T.key);
        else
          for (ae = K; ae <= E; ae++)
            if (_[ae - K] === 0 && fr(T, y[ae])) {
              H = ae;
              break;
            }
        H === void 0 ? Ze(T, F, L, !0) : (_[H - K] = $ + 1, H >= h ? h = H : Pe = !0, V(
          T,
          y[H],
          R,
          null,
          F,
          L,
          G,
          W,
          q
        ), we++);
      }
      const P = Pe ? Uh(_) : Bs;
      for (ae = P.length - 1, $ = Ee - 1; $ >= 0; $--) {
        const T = K + $, H = y[T], se = y[T + 1], ee = T + 1 < ne ? (
          // #13559, fallback to el placeholder for unresolved async component
          se.el || se.placeholder
        ) : N;
        _[$] === 0 ? V(
          null,
          H,
          R,
          ee,
          F,
          L,
          G,
          W,
          q
        ) : Pe && (ae < 0 || $ !== P[ae] ? Ae(H, R, ee, 2) : ae--);
      }
    }
  }, Ae = (m, y, R, N, F = null) => {
    const { el: L, type: G, transition: W, children: q, shapeFlag: $ } = m;
    if ($ & 6) {
      Ae(m.component.subTree, y, R, N);
      return;
    }
    if ($ & 128) {
      m.suspense.move(y, R, N);
      return;
    }
    if ($ & 64) {
      G.move(m, y, R, Mt);
      return;
    }
    if (G === Be) {
      s(L, y, R);
      for (let X = 0; X < q.length; X++)
        Ae(q[X], y, R, N);
      s(m.anchor, y, R);
      return;
    }
    if (G === ci) {
      he(m, y, R);
      return;
    }
    if (N !== 2 && $ & 1 && W)
      if (N === 0)
        W.beforeEnter(L), s(L, y, R), Vt(() => W.enter(L), F);
      else {
        const { leave: X, delayLeave: E, afterLeave: O } = W, K = () => {
          m.ctx.isUnmounted ? r(L) : s(L, y, R);
        }, J = () => {
          X(L, () => {
            K(), O && O();
          });
        };
        E ? E(L, K, J) : J();
      }
    else
      s(L, y, R);
  }, Ze = (m, y, R, N = !1, F = !1) => {
    const {
      type: L,
      props: G,
      ref: W,
      children: q,
      dynamicChildren: $,
      shapeFlag: ne,
      patchFlag: X,
      dirs: E,
      cacheIndex: O
    } = m;
    if (X === -2 && (F = !1), W != null && ($n(), Er(W, null, R, m, !0), Bn()), O != null && (y.renderCache[O] = void 0), ne & 256) {
      y.ctx.deactivate(m);
      return;
    }
    const K = ne & 1 && E, J = !Cr(m);
    let ae;
    if (J && (ae = G && G.onVnodeBeforeUnmount) && dn(ae, y, m), ne & 6)
      Re(m.component, R, N);
    else {
      if (ne & 128) {
        m.suspense.unmount(R, N);
        return;
      }
      K && fs(m, null, y, "beforeUnmount"), ne & 64 ? m.type.remove(
        m,
        y,
        R,
        Mt,
        N
      ) : $ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !$.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (L !== Be || X > 0 && X & 64) ? vt(
        $,
        y,
        R,
        !1,
        !0
      ) : (L === Be && X & 384 || !F && ne & 16) && vt(q, y, R), N && st(m);
    }
    (J && (ae = G && G.onVnodeUnmounted) || K) && Vt(() => {
      ae && dn(ae, y, m), K && fs(m, null, y, "unmounted");
    }, R);
  }, st = (m) => {
    const { type: y, el: R, anchor: N, transition: F } = m;
    if (y === Be) {
      At(R, N);
      return;
    }
    if (y === ci) {
      S(m);
      return;
    }
    const L = () => {
      r(R), F && !F.persisted && F.afterLeave && F.afterLeave();
    };
    if (m.shapeFlag & 1 && F && !F.persisted) {
      const { leave: G, delayLeave: W } = F, q = () => G(R, L);
      W ? W(m.el, L, q) : q();
    } else
      L();
  }, At = (m, y) => {
    let R;
    for (; m !== y; )
      R = w(m), r(m), m = R;
    r(y);
  }, Re = (m, y, R) => {
    const {
      bum: N,
      scope: F,
      job: L,
      subTree: G,
      um: W,
      m: q,
      a: $,
      parent: ne,
      slots: { __: X }
    } = m;
    fl(q), fl($), N && ai(N), ne && ve(X) && X.forEach((E) => {
      ne.renderCache[E] = void 0;
    }), F.stop(), L && (L.flags |= 8, Ze(G, m, y, R)), W && Vt(W, y), Vt(() => {
      m.isUnmounted = !0;
    }, y), y && y.pendingBranch && !y.isUnmounted && m.asyncDep && !m.asyncResolved && m.suspenseId === y.pendingId && (y.deps--, y.deps === 0 && y.resolve());
  }, vt = (m, y, R, N = !1, F = !1, L = 0) => {
    for (let G = L; G < m.length; G++)
      Ze(m[G], y, R, N, F);
  }, gt = (m) => {
    if (m.shapeFlag & 6)
      return gt(m.component.subTree);
    if (m.shapeFlag & 128)
      return m.suspense.next();
    const y = w(m.anchor || m.el), R = y && y[ch];
    return R ? w(R) : y;
  };
  let Ct = !1;
  const Rt = (m, y, R) => {
    m == null ? y._vnode && Ze(y._vnode, null, null, !0) : V(
      y._vnode || null,
      m,
      y,
      null,
      null,
      null,
      R
    ), y._vnode = m, Ct || (Ct = !0, il(), Hc(), Ct = !1);
  }, Mt = {
    p: V,
    um: Ze,
    m: Ae,
    r: st,
    mt: Ve,
    mc: xe,
    pc: me,
    pbc: _e,
    n: gt,
    o: e
  };
  return {
    render: Rt,
    hydrate: void 0,
    createApp: Rh(Rt)
  };
}
function mo({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function hs({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Bh(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ou(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (ve(s) && ve(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let a = r[i];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = r[i] = Xn(r[i]), a.el = o.el), !n && a.patchFlag !== -2 && ou(o, a)), a.type === Vi && (a.el = o.el), a.type === ns && !a.el && (a.el = o.el);
    }
}
function Uh(e) {
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
function au(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : au(t);
}
function fl(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const zh = Symbol.for("v-scx"), Hh = () => li(zh);
function $t(e, t, n) {
  return lu(e, t, n);
}
function lu(e, t, n = tt) {
  const { immediate: s, deep: r, flush: i, once: o } = n, a = Pt({}, n), l = t && s || !t && i !== "post";
  let d;
  if (Fr) {
    if (i === "sync") {
      const z = Hh();
      d = z.__watcherHandles || (z.__watcherHandles = []);
    } else if (!l) {
      const z = () => {
      };
      return z.stop = _n, z.resume = _n, z.pause = _n, z;
    }
  }
  const c = Ut;
  a.call = (z, B, V) => bn(z, c, B, V);
  let b = !1;
  i === "post" ? a.scheduler = (z) => {
    Vt(z, c && c.suspense);
  } : i !== "sync" && (b = !0, a.scheduler = (z, B) => {
    B ? z() : pa(z);
  }), a.augmentJob = (z) => {
    t && (z.flags |= 4), b && (z.flags |= 2, c && (z.id = c.uid, z.i = c));
  };
  const w = rh(e, t, a);
  return Fr && (d ? d.push(w) : l && w()), w;
}
function Wh(e, t, n) {
  const s = this.proxy, r = _t(e) ? e.includes(".") ? cu(s, e) : () => s[e] : e.bind(s, s);
  let i;
  Te(t) ? i = t : (i = t.handler, n = t);
  const o = Ur(this), a = lu(r, i.bind(s), n);
  return o(), a;
}
function cu(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const qh = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${es(t)}Modifiers`] || e[`${rs(t)}Modifiers`];
function jh(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || tt;
  let r = n;
  const i = t.startsWith("update:"), o = i && qh(s, t.slice(7));
  o && (o.trim && (r = n.map((c) => _t(c) ? c.trim() : c)), o.number && (r = n.map(Mo)));
  let a, l = s[a = co(t)] || // also try camelCase event handler (#2249)
  s[a = co(es(t))];
  !l && i && (l = s[a = co(rs(t))]), l && bn(
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
    e.emitted[a] = !0, bn(
      d,
      e,
      6,
      r
    );
  }
}
function uu(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, a = !1;
  if (!Te(e)) {
    const l = (d) => {
      const c = uu(d, t, !0);
      c && (a = !0, Pt(o, c));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !i && !a ? (ft(e) && s.set(e, null), null) : (ve(i) ? i.forEach((l) => o[l] = null) : Pt(o, i), ft(e) && s.set(e, o), o);
}
function ji(e, t) {
  return !e || !Di(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), We(e, t[0].toLowerCase() + t.slice(1)) || We(e, rs(t)) || We(e, t));
}
function hl(e) {
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
    props: b,
    data: w,
    setupState: z,
    ctx: B,
    inheritAttrs: V
  } = e, M = Ai(e);
  let te, fe;
  try {
    if (n.shapeFlag & 4) {
      const S = r || s, I = S;
      te = mn(
        d.call(
          I,
          S,
          c,
          b,
          z,
          w,
          B
        )
      ), fe = a;
    } else {
      const S = t;
      te = mn(
        S.length > 1 ? S(
          b,
          { attrs: a, slots: o, emit: l }
        ) : S(
          b,
          null
        )
      ), fe = t.props ? a : Vh(a);
    }
  } catch (S) {
    Ir.length = 0, Hi(S, e, 1), te = yn(ns);
  }
  let he = te;
  if (fe && V !== !1) {
    const S = Object.keys(fe), { shapeFlag: I } = he;
    S.length && I & 7 && (i && S.some(ra) && (fe = Kh(
      fe,
      i
    )), he = Ks(he, fe, !1, !0));
  }
  return n.dirs && (he = Ks(he, null, !1, !0), he.dirs = he.dirs ? he.dirs.concat(n.dirs) : n.dirs), n.transition && ga(he, n.transition), te = he, Ai(M), te;
}
const Vh = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Di(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Kh = (e, t) => {
  const n = {};
  for (const s in e)
    (!ra(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Gh(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: a, patchFlag: l } = t, d = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return s ? dl(s, o, d) : !!o;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let b = 0; b < c.length; b++) {
        const w = c[b];
        if (o[w] !== s[w] && !ji(d, w))
          return !0;
      }
    }
  } else
    return (r || a) && (!a || !a.$stable) ? !0 : s === o ? !1 : s ? o ? dl(s, o, d) : !0 : !!o;
  return !1;
}
function dl(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !ji(n, i))
      return !0;
  }
  return !1;
}
function Yh({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const fu = (e) => e.__isSuspense;
function Xh(e, t) {
  t && t.pendingBranch ? ve(e) ? t.effects.push(...e) : t.effects.push(e) : ah(e);
}
const Be = Symbol.for("v-fgt"), Vi = Symbol.for("v-txt"), ns = Symbol.for("v-cmt"), ci = Symbol.for("v-stc"), Ir = [];
let Gt = null;
function x(e = !1) {
  Ir.push(Gt = e ? null : []);
}
function Zh() {
  Ir.pop(), Gt = Ir[Ir.length - 1] || null;
}
let Dr = 1;
function pl(e, t = !1) {
  Dr += e, e < 0 && Gt && t && (Gt.hasOnce = !0);
}
function hu(e) {
  return e.dynamicChildren = Dr > 0 ? Gt || Bs : null, Zh(), Dr > 0 && Gt && Gt.push(e), e;
}
function A(e, t, n, s, r, i) {
  return hu(
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
function Ei(e, t, n, s, r) {
  return hu(
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
function du(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function fr(e, t) {
  return e.type === t.type && e.key === t.key;
}
const pu = ({ key: e }) => e ?? null, ui = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? _t(e) || Nt(e) || Te(e) ? { i: rn, r: e, k: t, f: !!n } : e : null);
function v(e, t = null, n = null, s = 0, r = null, i = e === Be ? 0 : 1, o = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && pu(t),
    ref: t && ui(t),
    scopeId: qc,
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
  return a ? (va(l, n), i & 128 && e.normalize(l)) : n && (l.shapeFlag |= _t(n) ? 8 : 16), Dr > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Gt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Gt.push(l), l;
}
const yn = Jh;
function Jh(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === wh) && (e = ns), du(e)) {
    const a = Ks(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && va(a, n), Dr > 0 && !i && Gt && (a.shapeFlag & 6 ? Gt[Gt.indexOf(e)] = a : Gt.push(a)), a.patchFlag = -2, a;
  }
  if (cd(e) && (e = e.__vccOpts), t) {
    t = Qh(t);
    let { class: a, style: l } = t;
    a && !_t(a) && (t.class = $e(a)), ft(l) && (da(l) && !ve(l) && (l = Pt({}, l)), t.style = Se(l));
  }
  const o = _t(e) ? 1 : fu(e) ? 128 : uh(e) ? 64 : ft(e) ? 4 : Te(e) ? 2 : 0;
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
function Qh(e) {
  return e ? da(e) || eu(e) ? Pt({}, e) : e : null;
}
function Ks(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: a, transition: l } = e, d = t ? ed(r || {}, t) : r, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && pu(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? ve(i) ? i.concat(ui(t)) : [i, ui(t)] : ui(t)
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
  return l && s && ga(
    c,
    l.clone(c)
  ), c;
}
function On(e = " ", t = 0) {
  return yn(Vi, null, e, t);
}
function ds(e, t) {
  const n = yn(ci, null, e);
  return n.staticCount = t, n;
}
function le(e = "", t = !1) {
  return t ? (x(), Ei(ns, null, e)) : yn(ns, null, e);
}
function mn(e) {
  return e == null || typeof e == "boolean" ? yn(ns) : ve(e) ? yn(
    Be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : du(e) ? Xn(e) : yn(Vi, null, String(e));
}
function Xn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ks(e);
}
function va(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (ve(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), va(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !eu(t) ? t._ctx = rn : r === 3 && rn && (rn.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Te(t) ? (t = { default: t, _ctx: rn }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [On(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function ed(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = $e([t.class, s.class]));
      else if (r === "style")
        t.style = Se([t.style, s.style]);
      else if (Di(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(ve(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function dn(e, t, n, s = null) {
  bn(e, t, 7, [
    n,
    s
  ]);
}
const td = Zc();
let nd = 0;
function sd(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || td, i = {
    uid: nd++,
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
    scope: new If(
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
    propsOptions: nu(s, r),
    emitsOptions: uu(s, r),
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = jh.bind(null, i), e.ce && e.ce(i), i;
}
let Ut = null;
const rd = () => Ut || rn;
let Ci, qo;
{
  const e = Bi(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  Ci = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ut = n
  ), qo = t(
    "__VUE_SSR_SETTERS__",
    (n) => Fr = n
  );
}
const Ur = (e) => {
  const t = Ut;
  return Ci(e), e.scope.on(), () => {
    e.scope.off(), Ci(t);
  };
}, gl = () => {
  Ut && Ut.scope.off(), Ci(null);
};
function gu(e) {
  return e.vnode.shapeFlag & 4;
}
let Fr = !1;
function id(e, t = !1, n = !1) {
  t && qo(t);
  const { props: s, children: r } = e.vnode, i = gu(e);
  Lh(e, s, i, t), Mh(e, r, n || t);
  const o = i ? od(e, t) : void 0;
  return t && qo(!1), o;
}
function od(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, kh);
  const { setup: s } = n;
  if (s) {
    $n();
    const r = e.setupContext = s.length > 1 ? ld(e) : null, i = Ur(e), o = $r(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), a = _c(o);
    if (Bn(), i(), (a || e.sp) && !Cr(e) && jc(e), a) {
      if (o.then(gl, gl), t)
        return o.then((l) => {
          ml(e, l);
        }).catch((l) => {
          Hi(l, e, 0);
        });
      e.asyncDep = o;
    } else
      ml(e, o);
  } else
    mu(e);
}
function ml(e, t, n) {
  Te(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ft(t) && (e.setupState = Bc(t)), mu(e);
}
function mu(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || _n);
  {
    const r = Ur(e);
    $n();
    try {
      Th(e);
    } finally {
      Bn(), r();
    }
  }
}
const ad = {
  get(e, t) {
    return Ot(e, "get", ""), e[t];
  }
};
function ld(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, ad),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ki(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Bc(Zf(e.exposed)), {
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
function cd(e) {
  return Te(e) && "__vccOpts" in e;
}
const de = (e, t) => nh(e, t, Fr), ud = "3.5.18";
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let jo;
const _l = typeof window < "u" && window.trustedTypes;
if (_l)
  try {
    jo = /* @__PURE__ */ _l.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const _u = jo ? (e) => jo.createHTML(e) : (e) => e, fd = "http://www.w3.org/2000/svg", hd = "http://www.w3.org/1998/Math/MathML", Nn = typeof document < "u" ? document : null, yl = Nn && /* @__PURE__ */ Nn.createElement("template"), dd = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? Nn.createElementNS(fd, e) : t === "mathml" ? Nn.createElementNS(hd, e) : n ? Nn.createElement(e, { is: n }) : Nn.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => Nn.createTextNode(e),
  createComment: (e) => Nn.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Nn.querySelector(e),
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
      yl.innerHTML = _u(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const a = yl.content;
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
}, pd = Symbol("_vtc");
function gd(e, t, n) {
  const s = e[pd];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ri = Symbol("_vod"), yu = Symbol("_vsh"), md = {
  beforeMount(e, { value: t }, { transition: n }) {
    e[Ri] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : hr(e, t);
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
  e.style.display = t ? e[Ri] : "none", e[yu] = !t;
}
const _d = Symbol(""), yd = /(^|;)\s*display\s*:/;
function vd(e, t, n) {
  const s = e.style, r = _t(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (_t(t))
        for (const o of t.split(";")) {
          const a = o.slice(0, o.indexOf(":")).trim();
          n[a] == null && fi(s, a, "");
        }
      else
        for (const o in t)
          n[o] == null && fi(s, o, "");
    for (const o in n)
      o === "display" && (i = !0), fi(s, o, n[o]);
  } else if (r) {
    if (t !== n) {
      const o = s[_d];
      o && (n += ";" + o), s.cssText = n, i = yd.test(n);
    }
  } else t && e.removeAttribute("style");
  Ri in e && (e[Ri] = i ? s.display : "", e[yu] && (s.display = "none"));
}
const vl = /\s*!important$/;
function fi(e, t, n) {
  if (ve(n))
    n.forEach((s) => fi(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = bd(e, t);
    vl.test(n) ? e.setProperty(
      rs(s),
      n.replace(vl, ""),
      "important"
    ) : e[s] = n;
  }
}
const bl = ["Webkit", "Moz", "ms"], _o = {};
function bd(e, t) {
  const n = _o[t];
  if (n)
    return n;
  let s = es(t);
  if (s !== "filter" && s in e)
    return _o[t] = s;
  s = bc(s);
  for (let r = 0; r < bl.length; r++) {
    const i = bl[r] + s;
    if (i in e)
      return _o[t] = i;
  }
  return t;
}
const wl = "http://www.w3.org/1999/xlink";
function kl(e, t, n, s, r, i = Rf(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(wl, t.slice(6, t.length)) : e.setAttributeNS(wl, t, n) : n == null || i && !wc(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : ss(n) ? String(n) : n
  );
}
function Tl(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? _u(n) : n);
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
    a === "boolean" ? n = wc(n) : n == null && a === "string" ? (n = "", o = !0) : a === "number" && (n = 0, o = !0);
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
function wd(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const xl = Symbol("_vei");
function kd(e, t, n, s, r = null) {
  const i = e[xl] || (e[xl] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [a, l] = Td(t);
    if (s) {
      const d = i[t] = Sd(
        s,
        r
      );
      Fs(e, a, d, l);
    } else o && (wd(e, a, o, l), i[t] = void 0);
  }
}
const Al = /(?:Once|Passive|Capture)$/;
function Td(e) {
  let t;
  if (Al.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Al); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : rs(e.slice(2)), t];
}
let yo = 0;
const xd = /* @__PURE__ */ Promise.resolve(), Ad = () => yo || (xd.then(() => yo = 0), yo = Date.now());
function Sd(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    bn(
      Ed(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Ad(), n;
}
function Ed(e, t) {
  if (ve(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (r) => !r._stopped && s && s(r)
    );
  } else
    return t;
}
const Sl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Cd = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? gd(e, s, o) : t === "style" ? vd(e, n, s) : Di(t) ? ra(t) || kd(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Rd(e, t, s, o)) ? (Tl(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && kl(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !_t(s)) ? Tl(e, es(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), kl(e, t, s, o));
};
function Rd(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Sl(t) && Te(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Sl(t) && _t(n) ? !1 : t in e;
}
const El = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return ve(t) ? (n) => ai(t, n) : t;
};
function Id(e) {
  e.target.composing = !0;
}
function Cl(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const vo = Symbol("_assign"), ps = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e[vo] = El(r);
    const i = s || r.props && r.props.type === "number";
    Fs(e, t ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let a = e.value;
      n && (a = a.trim()), i && (a = Mo(a)), e[vo](a);
    }), n && Fs(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Fs(e, "compositionstart", Id), Fs(e, "compositionend", Cl), Fs(e, "change", Cl));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[vo] = El(o), e.composing) return;
    const a = (i || e.type === "number") && !/^0\d/.test(e.value) ? Mo(e.value) : e.value, l = t ?? "";
    a !== l && (document.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === l) || (e.value = l));
  }
}, Ld = ["ctrl", "shift", "alt", "meta"], Od = {
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
  exact: (e, t) => Ld.some((n) => e[`${n}Key`] && !t.includes(n))
}, _s = (e, t) => {
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const a = Od[t[o]];
      if (a && a(r, t)) return;
    }
    return e(r, ...i);
  });
}, Nd = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, hi = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = (r) => {
    if (!("key" in r))
      return;
    const i = rs(r.key);
    if (t.some(
      (o) => o === i || Nd[o] === i
    ))
      return e(r);
  });
}, Pd = /* @__PURE__ */ Pt({ patchProp: Cd }, dd);
let Rl;
function Md() {
  return Rl || (Rl = Fh(Pd));
}
const Dd = (...e) => {
  const t = Md().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = $d(s);
    if (!r) return;
    const i = t._component;
    !Te(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, Fd(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
};
function Fd(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function $d(e) {
  return _t(e) ? document.querySelector(e) : e;
}
const qs = (e) => {
  const t = e.replace("#", ""), n = parseInt(t.substr(0, 2), 16), s = parseInt(t.substr(2, 2), 16), r = parseInt(t.substr(4, 2), 16);
  return (n * 299 + s * 587 + r * 114) / 1e3 < 128;
}, Bd = (e, t) => {
  const n = e.replace("#", ""), s = parseInt(n.substr(0, 2), 16), r = parseInt(n.substr(2, 2), 16), i = parseInt(n.substr(4, 2), 16), o = qs(e), a = o ? Math.min(255, s + t) : Math.max(0, s - t), l = o ? Math.min(255, r + t) : Math.max(0, r - t), d = o ? Math.min(255, i + t) : Math.max(0, i - t);
  return `#${a.toString(16).padStart(2, "0")}${l.toString(16).padStart(2, "0")}${d.toString(16).padStart(2, "0")}`;
}, dr = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e), Ud = (e) => {
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
function ba() {
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
var As = ba();
function vu(e) {
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
}, zd = /^(?:[ \t]*(?:\n|$))+/, Hd = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Wd = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, zr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, qd = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, wa = /(?:[*+-]|\d{1,9}[.)])/, bu = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, wu = qe(bu).replace(/bull/g, wa).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), jd = qe(bu).replace(/bull/g, wa).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ka = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Vd = /^[^\n]+/, Ta = /(?!\s*\])(?:\\.|[^\[\]\\])+/, Kd = qe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Ta).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Gd = qe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, wa).getRegex(), Gi = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", xa = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Yd = qe(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", xa).replace("tag", Gi).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ku = qe(ka).replace("hr", zr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Gi).getRegex(), Xd = qe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ku).getRegex(), Aa = {
  blockquote: Xd,
  code: Hd,
  def: Kd,
  fences: Wd,
  heading: qd,
  hr: zr,
  html: Yd,
  lheading: wu,
  list: Gd,
  newline: zd,
  paragraph: ku,
  table: Lr,
  text: Vd
}, Il = qe(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", zr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Gi).getRegex(), Zd = {
  ...Aa,
  lheading: jd,
  table: Il,
  paragraph: qe(ka).replace("hr", zr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Il).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Gi).getRegex()
}, Jd = {
  ...Aa,
  html: qe(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", xa).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Lr,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: qe(ka).replace("hr", zr).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", wu).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Qd = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, ep = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Tu = /^( {2,}|\\)\n(?!\s*$)/, tp = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Yi = /[\p{P}\p{S}]/u, Sa = /[\s\p{P}\p{S}]/u, xu = /[^\s\p{P}\p{S}]/u, np = qe(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Sa).getRegex(), Au = /(?!~)[\p{P}\p{S}]/u, sp = /(?!~)[\s\p{P}\p{S}]/u, rp = /(?:[^\s\p{P}\p{S}]|~)/u, ip = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, Su = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, op = qe(Su, "u").replace(/punct/g, Yi).getRegex(), ap = qe(Su, "u").replace(/punct/g, Au).getRegex(), Eu = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", lp = qe(Eu, "gu").replace(/notPunctSpace/g, xu).replace(/punctSpace/g, Sa).replace(/punct/g, Yi).getRegex(), cp = qe(Eu, "gu").replace(/notPunctSpace/g, rp).replace(/punctSpace/g, sp).replace(/punct/g, Au).getRegex(), up = qe(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, xu).replace(/punctSpace/g, Sa).replace(/punct/g, Yi).getRegex(), fp = qe(/\\(punct)/, "gu").replace(/punct/g, Yi).getRegex(), hp = qe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), dp = qe(xa).replace("(?:-->|$)", "-->").getRegex(), pp = qe(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", dp).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Ii = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, gp = qe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Ii).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Cu = qe(/^!?\[(label)\]\[(ref)\]/).replace("label", Ii).replace("ref", Ta).getRegex(), Ru = qe(/^!?\[(ref)\](?:\[\])?/).replace("ref", Ta).getRegex(), mp = qe("reflink|nolink(?!\\()", "g").replace("reflink", Cu).replace("nolink", Ru).getRegex(), Ea = {
  _backpedal: Lr,
  // only used for GFM url
  anyPunctuation: fp,
  autolink: hp,
  blockSkip: ip,
  br: Tu,
  code: ep,
  del: Lr,
  emStrongLDelim: op,
  emStrongRDelimAst: lp,
  emStrongRDelimUnd: up,
  escape: Qd,
  link: gp,
  nolink: Ru,
  punctuation: np,
  reflink: Cu,
  reflinkSearch: mp,
  tag: pp,
  text: tp,
  url: Lr
}, _p = {
  ...Ea,
  link: qe(/^!?\[(label)\]\((.*?)\)/).replace("label", Ii).getRegex(),
  reflink: qe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Ii).getRegex()
}, Vo = {
  ...Ea,
  emStrongRDelimAst: cp,
  emStrongLDelim: ap,
  url: qe(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, yp = {
  ...Vo,
  br: qe(Tu).replace("{2,}", "*").getRegex(),
  text: qe(Vo.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, si = {
  normal: Aa,
  gfm: Zd,
  pedantic: Jd
}, pr = {
  normal: Ea,
  gfm: Vo,
  breaks: yp,
  pedantic: _p
}, vp = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Ll = (e) => vp[e];
function pn(e, t) {
  if (t) {
    if (zt.escapeTest.test(e))
      return e.replace(zt.escapeReplace, Ll);
  } else if (zt.escapeTestNoEncode.test(e))
    return e.replace(zt.escapeReplaceNoEncode, Ll);
  return e;
}
function Ol(e) {
  try {
    e = encodeURI(e).replace(zt.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function Nl(e, t) {
  var i;
  const n = e.replace(zt.findPipe, (o, a, l) => {
    let d = !1, c = a;
    for (; --c >= 0 && l[c] === "\\"; ) d = !d;
    return d ? "|" : " |";
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
function bp(e, t) {
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
function Pl(e, t, n, s, r) {
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
function wp(e, t, n) {
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
var Li = class {
  // set by the lexer
  constructor(e) {
    et(this, "options");
    et(this, "rules");
    // set by the lexer
    et(this, "lexer");
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
      const n = t[0], s = wp(n, t[3] || "", this.rules);
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
        const d = a.join(`
`), c = d.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${d}` : d, r = r ? `${r}
${c}` : c;
        const b = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(c, i, !0), this.lexer.state.top = b, n.length === 0)
          break;
        const w = i.at(-1);
        if ((w == null ? void 0 : w.type) === "code")
          break;
        if ((w == null ? void 0 : w.type) === "blockquote") {
          const z = w, B = z.raw + `
` + n.join(`
`), V = this.blockquote(B);
          i[i.length - 1] = V, s = s.substring(0, s.length - z.raw.length) + V.raw, r = r.substring(0, r.length - z.text.length) + V.text;
          break;
        } else if ((w == null ? void 0 : w.type) === "list") {
          const z = w, B = z.raw + `
` + n.join(`
`), V = this.list(B);
          i[i.length - 1] = V, s = s.substring(0, s.length - w.raw.length) + V.raw, r = r.substring(0, r.length - z.raw.length) + V.raw, n = B.substring(i.at(-1).raw.length).split(`
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
        let b = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (te) => " ".repeat(3 * te.length)), w = e.split(`
`, 1)[0], z = !b.trim(), B = 0;
        if (this.options.pedantic ? (B = 2, c = b.trimStart()) : z ? B = t[1].length + 1 : (B = t[2].search(this.rules.other.nonSpaceChar), B = B > 4 ? 1 : B, c = b.slice(B), B += t[1].length), z && this.rules.other.blankLine.test(w) && (d += w + `
`, e = e.substring(w.length + 1), l = !0), !l) {
          const te = this.rules.other.nextBulletRegex(B), fe = this.rules.other.hrRegex(B), he = this.rules.other.fencesBeginRegex(B), S = this.rules.other.headingBeginRegex(B), I = this.rules.other.htmlBeginRegex(B);
          for (; e; ) {
            const Y = e.split(`
`, 1)[0];
            let Z;
            if (w = Y, this.options.pedantic ? (w = w.replace(this.rules.other.listReplaceNesting, "  "), Z = w) : Z = w.replace(this.rules.other.tabCharGlobal, "    "), he.test(w) || S.test(w) || I.test(w) || te.test(w) || fe.test(w))
              break;
            if (Z.search(this.rules.other.nonSpaceChar) >= B || !w.trim())
              c += `
` + Z.slice(B);
            else {
              if (z || b.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || he.test(b) || S.test(b) || fe.test(b))
                break;
              c += `
` + w;
            }
            !z && !w.trim() && (z = !0), d += Y + `
`, e = e.substring(Y.length + 1), b = Z.slice(B);
          }
        }
        r.loose || (o ? r.loose = !0 : this.rules.other.doubleBlankLine.test(d) && (o = !0));
        let V = null, M;
        this.options.gfm && (V = this.rules.other.listIsTask.exec(c), V && (M = V[0] !== "[ ] ", c = c.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: d,
          task: !!V,
          checked: M,
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
          const d = r.items[l].tokens.filter((b) => b.type === "space"), c = d.length > 0 && d.some((b) => this.rules.other.anyLine.test(b.raw));
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
    const n = Nl(t[1]), s = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (o = t[3]) != null && o.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
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
        i.rows.push(Nl(a, i.header.length).map((l, d) => ({
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
        const i = gr(n.slice(0, -1), "\\");
        if ((n.length - i.length) % 2 === 0)
          return;
      } else {
        const i = bp(t[2], "()");
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
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), Pl(t, {
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
      return Pl(n, r, n[0], this.lexer, this.rules);
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
        const b = [...s[0]][0].length, w = e.slice(0, i + s.index + b + a);
        if (Math.min(i, a) % 2) {
          const B = w.slice(1, -1);
          return {
            type: "em",
            raw: w,
            text: B,
            tokens: this.lexer.inlineTokens(B)
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
}, Dn = class Ko {
  constructor(t) {
    et(this, "tokens");
    et(this, "options");
    et(this, "state");
    et(this, "tokenizer");
    et(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || As, this.options.tokenizer = this.options.tokenizer || new Li(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      other: zt,
      block: si.normal,
      inline: pr.normal
    };
    this.options.pedantic ? (n.block = si.pedantic, n.inline = pr.pedantic) : this.options.gfm && (n.block = si.gfm, this.options.breaks ? n.inline = pr.breaks : n.inline = pr.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: si,
      inline: pr
    };
  }
  /**
   * Static Lex Method
   */
  static lex(t, n) {
    return new Ko(n).lex(t);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(t, n) {
    return new Ko(n).inlineTokens(t);
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
        let b;
        this.options.extensions.startBlock.forEach((w) => {
          b = w.call({ lexer: this }, c), typeof b == "number" && b >= 0 && (d = Math.min(d, b));
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
      let b = t;
      if ((d = this.options.extensions) != null && d.startInline) {
        let w = 1 / 0;
        const z = t.slice(1);
        let B;
        this.options.extensions.startInline.forEach((V) => {
          B = V.call({ lexer: this }, z), typeof B == "number" && B >= 0 && (w = Math.min(w, B));
        }), w < 1 / 0 && w >= 0 && (b = t.substring(0, w + 1));
      }
      if (c = this.tokenizer.inlineText(b)) {
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
}, Oi = class {
  // set by the parser
  constructor(e) {
    et(this, "options");
    et(this, "parser");
    this.options = e || As;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    var i;
    const s = (i = (t || "").match(zt.notSpaceStart)) == null ? void 0 : i[0], r = e.replace(zt.endingNewline, "") + `
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
    const s = this.parser.parseInline(n), r = Ol(e);
    if (r === null)
      return s;
    e = r;
    let i = '<a href="' + e + '"';
    return t && (i += ' title="' + pn(t) + '"'), i += ">" + s + "</a>", i;
  }
  image({ href: e, title: t, text: n, tokens: s }) {
    s && (n = this.parser.parseInline(s, this.parser.textRenderer));
    const r = Ol(e);
    if (r === null)
      return pn(n);
    e = r;
    let i = `<img src="${e}" alt="${n}"`;
    return t && (i += ` title="${pn(t)}"`), i += ">", i;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : pn(e.text);
  }
}, Ca = class {
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
}, Fn = class Go {
  constructor(t) {
    et(this, "options");
    et(this, "renderer");
    et(this, "textRenderer");
    this.options = t || As, this.options.renderer = this.options.renderer || new Oi(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Ca();
  }
  /**
   * Static Parse Method
   */
  static parse(t, n) {
    return new Go(n).parse(t);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(t, n) {
    return new Go(n).parseInline(t);
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
}, No, di = (No = class {
  constructor(e) {
    et(this, "options");
    et(this, "block");
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
    return this.block ? Fn.parse : Fn.parseInline;
  }
}, et(No, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
])), No), kp = class {
  constructor(...e) {
    et(this, "defaults", ba());
    et(this, "options", this.setOptions);
    et(this, "parse", this.parseMarkdown(!0));
    et(this, "parseInline", this.parseMarkdown(!1));
    et(this, "Parser", Fn);
    et(this, "Renderer", Oi);
    et(this, "TextRenderer", Ca);
    et(this, "Lexer", Dn);
    et(this, "Tokenizer", Li);
    et(this, "Hooks", di);
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
        const r = this.defaults.renderer || new Oi(this.defaults);
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
        const r = this.defaults.tokenizer || new Li(this.defaults);
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
        const r = this.defaults.hooks || new di();
        for (const i in n.hooks) {
          if (!(i in r))
            throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i))
            continue;
          const o = i, a = n.hooks[o], l = r[o];
          di.passThroughHooks.has(i) ? r[o] = (d) => {
            if (this.defaults.async)
              return Promise.resolve(a.call(r, d)).then((b) => l.call(r, b));
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
    return Dn.lex(e, t ?? this.defaults);
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
      const a = i.hooks ? i.hooks.provideLexer() : e ? Dn.lex : Dn.lexInline, l = i.hooks ? i.hooks.provideParser() : e ? Fn.parse : Fn.parseInline;
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
}, Ts = new kp();
function Ue(e, t) {
  return Ts.parse(e, t);
}
Ue.options = Ue.setOptions = function(e) {
  return Ts.setOptions(e), Ue.defaults = Ts.defaults, vu(Ue.defaults), Ue;
};
Ue.getDefaults = ba;
Ue.defaults = As;
Ue.use = function(...e) {
  return Ts.use(...e), Ue.defaults = Ts.defaults, vu(Ue.defaults), Ue;
};
Ue.walkTokens = function(e, t) {
  return Ts.walkTokens(e, t);
};
Ue.parseInline = Ts.parseInline;
Ue.Parser = Fn;
Ue.parser = Fn.parse;
Ue.Renderer = Oi;
Ue.TextRenderer = Ca;
Ue.Lexer = Dn;
Ue.lexer = Dn.lex;
Ue.Tokenizer = Li;
Ue.Hooks = di;
Ue.parse = Ue;
Ue.options;
Ue.setOptions;
Ue.use;
Ue.walkTokens;
Ue.parseInline;
Fn.parse;
Dn.lex;
/*! @license DOMPurify 3.4.15 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.15/LICENSE */
function Ml(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, s = Array(t); n < t; n++) s[n] = e[n];
  return s;
}
function Tp(e) {
  if (Array.isArray(e)) return e;
}
function xp(e, t) {
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
function Ap() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Sp(e, t) {
  return Tp(e) || xp(e, t) || Ep(e, t) || Ap();
}
function Ep(e, t) {
  if (e) {
    if (typeof e == "string") return Ml(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ml(e, t) : void 0;
  }
}
const Iu = Object.entries, Dl = Object.setPrototypeOf, Cp = Object.isFrozen, Rp = Object.getPrototypeOf, Ip = Object.getOwnPropertyDescriptor;
let wt = Object.freeze, xt = Object.seal, $s = Object.create, Lu = typeof Reflect < "u" && Reflect, Yo = Lu.apply, Xo = Lu.construct;
wt || (wt = function(t) {
  return t;
});
xt || (xt = function(t) {
  return t;
});
Yo || (Yo = function(t, n) {
  for (var s = arguments.length, r = new Array(s > 2 ? s - 2 : 0), i = 2; i < s; i++)
    r[i - 2] = arguments[i];
  return t.apply(n, r);
});
Xo || (Xo = function(t) {
  for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
    s[r - 1] = arguments[r];
  return new t(...s);
});
const ys = yt(Array.prototype.forEach), Lp = yt(Array.prototype.lastIndexOf), Fl = yt(Array.prototype.pop), mr = yt(Array.prototype.push), Op = yt(Array.prototype.splice), js = Array.isArray, wr = yt(String.prototype.toLowerCase), bo = yt(String.prototype.toString), $l = yt(String.prototype.match), _r = yt(String.prototype.replace), Bl = yt(String.prototype.indexOf), Np = yt(String.prototype.trim), Pp = yt(Number.prototype.toString), Mp = yt(Boolean.prototype.toString), Ul = typeof BigInt > "u" ? null : yt(BigInt.prototype.toString), zl = typeof Symbol > "u" ? null : yt(Symbol.prototype.toString), Wt = yt(Object.prototype.hasOwnProperty), yr = yt(Object.prototype.toString), Lt = yt(RegExp.prototype.test), gs = Dp(TypeError);
function yt(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
      s[r - 1] = arguments[r];
    return Yo(e, t, s);
  };
}
function Dp(e) {
  return function() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return Xo(e, n);
  };
}
function De(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : wr;
  if (Dl && Dl(e, null), !js(t))
    return e;
  let s = t.length;
  for (; s--; ) {
    let r = t[s];
    if (typeof r == "string") {
      const i = n(r);
      i !== r && (Cp(t) || (t[s] = i), r = i);
    }
    e[r] = !0;
  }
  return e;
}
function Fp(e) {
  for (let t = 0; t < e.length; t++)
    Wt(e, t) || (e[t] = null);
  return e;
}
function Kt(e) {
  const t = $s(null);
  for (const s of Iu(e)) {
    var n = Sp(s, 2);
    const r = n[0], i = n[1];
    Wt(e, r) && (js(i) ? t[r] = Fp(i) : i && typeof i == "object" && i.constructor === Object ? t[r] = Kt(i) : t[r] = i);
  }
  return t;
}
function $p(e) {
  switch (typeof e) {
    case "string":
      return e;
    case "number":
      return Pp(e);
    case "boolean":
      return Mp(e);
    case "bigint":
      return Ul ? Ul(e) : "0";
    case "symbol":
      return zl ? zl(e) : "Symbol()";
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
    const s = Ip(e, t);
    if (s) {
      if (s.get)
        return yt(s.get);
      if (typeof s.value == "function")
        return yt(s.value);
    }
    e = Rp(e);
  }
  function n() {
    return null;
  }
  return n;
}
function Bp(e) {
  try {
    return Lt(e, ""), !0;
  } catch {
    return !1;
  }
}
const Hl = wt(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), wo = wt(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), ko = wt(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Up = wt(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), To = wt(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), zp = wt(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Wl = wt(["#text"]), ql = wt(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), xo = wt(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dominant-baseline", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "pointer-events", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-orientation", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "vector-effect", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), jl = wt(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), ri = wt(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Hp = xt(/{{[\w\W]*|^[\w\W]*}}/g), Wp = xt(/<%[\w\W]*|^[\w\W]*%>/g), qp = xt(/\${[\w\W]*/g), jp = xt(/^data-[\-\w.\u00B7-\uFFFF]+$/), Vp = xt(/^aria-[\-\w]+$/), Vl = xt(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Kp = xt(/^(?:\w+script|data):/i), Gp = xt(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Yp = xt(/^html$/i), Xp = xt(/^[a-z][.\w]*(-[.\w]+)+$/i), Kl = xt(/<[/\w!]/g), Gl = xt(/<[/\w]/g), Zp = xt(/<\/no(script|embed|frames)/i), Jp = xt(/\/>/i), jt = {
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
}, Ou = ["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"], Qp = wt(De({}, Ou)), eg = function() {
  const e = {};
  return ys(Ou, (t) => {
    e[t] = xt(new RegExp("</" + t + "(?=[\\t\\n\\f\\r />])", "i"));
  }), wt(e);
}(), tg = function() {
  return typeof window > "u" ? null : window;
}, ng = function(t, n) {
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
}, Yl = function() {
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
}, Gn = function(t, n, s, r) {
  return Wt(t, n) && js(t[n]) ? De(r.base ? Kt(r.base) : {}, t[n], r.transform) : s;
}, Ao = function(t, n, s) {
  const r = Wt(t, n) ? t[n] : void 0;
  return r && typeof r == "object" ? Kt(r) : s();
};
function Nu() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : tg();
  const t = (j) => Nu(j);
  if (t.version = "3.4.15", t.removed = [], !e || !e.document || e.document.nodeType !== jt.document || !e.Element)
    return t.isSupported = !1, t;
  let n = e.document;
  const s = n, r = s.currentScript;
  e.DocumentFragment;
  const i = e.HTMLTemplateElement, o = e.Node, a = e.Element, l = e.NodeFilter, d = e.NamedNodeMap;
  d === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
  const c = e.DOMParser, b = e.trustedTypes, w = a.prototype, z = tn(w, "cloneNode"), B = tn(w, "remove"), V = tn(w, "removeAttributeNode"), M = tn(w, "nextSibling"), te = tn(w, "childNodes"), fe = tn(w, "parentNode"), he = tn(w, "shadowRoot"), S = tn(w, "attributes"), I = o && o.prototype ? tn(o.prototype, "nodeType") : null, Y = o && o.prototype ? tn(o.prototype, "nodeName") : null, Z = o && o.prototype ? tn(o.prototype, "ownerDocument") : null, xe = function(p) {
    return I ? I(p) : p.nodeType;
  }, Oe = function(p) {
    return Y ? Y(p) : p.nodeName;
  };
  if (typeof i == "function") {
    const j = n.createElement("template");
    j.content && j.content.ownerDocument && (n = j.content.ownerDocument);
  }
  let _e, Me = "", be, je = !1, Ve = 0;
  const ot = function() {
    if (Ve > 0)
      throw gs('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, ue = function(p) {
    ot(), Ve++;
    try {
      return _e.createHTML(p);
    } finally {
      Ve--;
    }
  }, ye = function(p) {
    ot(), Ve++;
    try {
      return _e.createScriptURL(p);
    } finally {
      Ve--;
    }
  }, me = function() {
    return je || (be = ng(b, r), je = !0), be;
  }, nt = n, Ke = nt.implementation, Ae = nt.createNodeIterator, Ze = nt.createDocumentFragment, st = nt.getElementsByTagName, At = s.importNode;
  let Re = Yl();
  t.isSupported = typeof Iu == "function" && typeof fe == "function" && Ke && Ke.createHTMLDocument !== void 0;
  const vt = Hp, gt = Wp, Ct = qp, Rt = jp, Mt = Vp, Yt = Kp, m = Gp, y = Xp;
  let R = Vl, N = null;
  const F = De({}, [...Hl, ...wo, ...ko, ...To, ...Wl]);
  let L = null;
  const G = De({}, [...ql, ...xo, ...jl, ...ri]);
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
  })), q = null, $ = null;
  const ne = Object.seal($s(null, {
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
  let X = !0, E = !0, O = !1, K = !0, J = !1, ae = !0, we = !1, Ee = !1, Pe = null, h = null, _ = !1, P = !1, T = !1, H = !1, se = !0, ee = !1;
  const Ie = "user-content-";
  let Le = !0, Ce = !1, Fe = {}, Ge = null;
  const kt = De({}, [
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
  let an = null;
  const kn = De({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ys = null;
  const Xs = De({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), is = "http://www.w3.org/1998/Math/MathML", os = "http://www.w3.org/2000/svg", qt = "http://www.w3.org/1999/xhtml";
  let Tn = qt, Zs = !1, as = null;
  const Ss = De({}, [is, os, qt], bo), Js = wt(["mi", "mo", "mn", "ms", "mtext"]);
  let Es = De({}, Js);
  const xn = wt(["annotation-xml"]);
  let An = De({}, xn);
  const Qs = De({}, ["title", "style", "font", "a", "script"]);
  let Sn = null;
  const fn = ["application/xhtml+xml", "text/html"], Hr = "text/html";
  let rt = null, En = null;
  const zn = n.createElement("form"), Wr = function(p) {
    return p instanceof RegExp || p instanceof Function;
  }, Hn = function() {
    let p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (En && En === p)
      return;
    (!p || typeof p != "object") && (p = {}), p = Kt(p), Sn = // eslint-disable-next-line unicorn/prefer-includes
    fn.indexOf(p.PARSER_MEDIA_TYPE) === -1 ? Hr : p.PARSER_MEDIA_TYPE, rt = Sn === "application/xhtml+xml" ? bo : wr, N = Gn(p, "ALLOWED_TAGS", F, {
      transform: rt
    }), L = Gn(p, "ALLOWED_ATTR", G, {
      transform: rt
    }), as = Gn(p, "ALLOWED_NAMESPACES", Ss, {
      transform: bo
    }), Ys = Gn(p, "ADD_URI_SAFE_ATTR", Xs, {
      transform: rt,
      base: Xs
    }), an = Gn(p, "ADD_DATA_URI_TAGS", kn, {
      transform: rt,
      base: kn
    }), Ge = Gn(p, "FORBID_CONTENTS", kt, {
      transform: rt
    }), q = Gn(p, "FORBID_TAGS", Kt({}), {
      transform: rt
    }), $ = Gn(p, "FORBID_ATTR", Kt({}), {
      transform: rt
    }), Fe = Wt(p, "USE_PROFILES") ? p.USE_PROFILES && typeof p.USE_PROFILES == "object" ? Kt(p.USE_PROFILES) : p.USE_PROFILES : !1, X = p.ALLOW_ARIA_ATTR !== !1, E = p.ALLOW_DATA_ATTR !== !1, O = p.ALLOW_UNKNOWN_PROTOCOLS || !1, K = p.ALLOW_SELF_CLOSE_IN_ATTR !== !1, J = p.SAFE_FOR_TEMPLATES || !1, ae = p.SAFE_FOR_XML !== !1, we = p.WHOLE_DOCUMENT || !1, P = p.RETURN_DOM || !1, T = p.RETURN_DOM_FRAGMENT || !1, H = p.RETURN_TRUSTED_TYPE || !1, _ = p.FORCE_BODY || !1, se = p.SANITIZE_DOM !== !1, ee = p.SANITIZE_NAMED_PROPS || !1, Le = p.KEEP_CONTENT !== !1, Ce = p.IN_PLACE || !1, R = Bp(p.ALLOWED_URI_REGEXP) ? p.ALLOWED_URI_REGEXP : Vl, Tn = typeof p.NAMESPACE == "string" ? p.NAMESPACE : qt, Es = Ao(
      p,
      "MATHML_TEXT_INTEGRATION_POINTS",
      () => De({}, Js)
      // Default built-in map
    ), An = Ao(
      p,
      "HTML_INTEGRATION_POINTS",
      () => De({}, xn)
      // Default built-in map
    );
    const k = Ao(p, "CUSTOM_ELEMENT_HANDLING", () => $s(null));
    if (W = $s(null), Wt(k, "tagNameCheck") && Wr(k.tagNameCheck) && (W.tagNameCheck = k.tagNameCheck), Wt(k, "attributeNameCheck") && Wr(k.attributeNameCheck) && (W.attributeNameCheck = k.attributeNameCheck), Wt(k, "allowCustomizedBuiltInElements") && typeof k.allowCustomizedBuiltInElements == "boolean" && (W.allowCustomizedBuiltInElements = k.allowCustomizedBuiltInElements), xt(W), J && (E = !1), T && (P = !0), Fe && (N = De({}, Wl), L = $s(null), Fe.html === !0 && (De(N, Hl), De(L, ql)), Fe.svg === !0 && (De(N, wo), De(L, xo), De(L, ri)), Fe.svgFilters === !0 && (De(N, ko), De(L, xo), De(L, ri)), Fe.mathMl === !0 && (De(N, To), De(L, jl), De(L, ri))), ne.tagCheck = null, ne.attributeCheck = null, Wt(p, "ADD_TAGS") && (typeof p.ADD_TAGS == "function" ? ne.tagCheck = p.ADD_TAGS : js(p.ADD_TAGS) && (N === F && (N = Kt(N)), De(N, p.ADD_TAGS, rt))), Wt(p, "ADD_ATTR") && (typeof p.ADD_ATTR == "function" ? ne.attributeCheck = p.ADD_ATTR : js(p.ADD_ATTR) && (L === G && (L = Kt(L)), De(L, p.ADD_ATTR, rt))), Wt(p, "ADD_FORBID_CONTENTS") && js(p.ADD_FORBID_CONTENTS) && (Ge === kt && (Ge = Kt(Ge)), De(Ge, p.ADD_FORBID_CONTENTS, rt)), Le && (N["#text"] = !0), we && De(N, ["html", "head", "body"]), N.table && (De(N, ["tbody"]), delete q.tbody), p.TRUSTED_TYPES_POLICY) {
      if (typeof p.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw gs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof p.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw gs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const U = _e;
      _e = p.TRUSTED_TYPES_POLICY;
      try {
        Me = ue("");
      } catch (Q) {
        throw _e = U, Q;
      }
    } else p.TRUSTED_TYPES_POLICY === null ? (_e = void 0, Me = "") : (_e === void 0 && (_e = me()), _e && typeof Me == "string" && (Me = ue("")));
    wt && wt(p), En = p;
  }, er = De({}, [...wo, ...ko, ...Up]), qr = De({}, [...To, ...zp]), jr = function(p, k, U) {
    return k.namespaceURI === qt ? p === "svg" : k.namespaceURI === is ? p === "svg" && (U === "annotation-xml" || Es[U]) : !!er[p];
  }, Cs = function(p, k, U) {
    return k.namespaceURI === qt ? p === "math" : k.namespaceURI === os ? p === "math" && An[U] : !!qr[p];
  }, tr = function(p, k, U) {
    return k.namespaceURI === os && !An[U] || k.namespaceURI === is && !Es[U] ? !1 : !qr[p] && (Qs[p] || !er[p]);
  }, Xt = function(p) {
    let k = fe(p);
    (!k || !k.tagName) && (k = {
      namespaceURI: Tn,
      tagName: "template"
    });
    const U = wr(p.tagName), Q = wr(k.tagName);
    return as[p.namespaceURI] ? p.namespaceURI === os ? jr(U, k, Q) : p.namespaceURI === is ? Cs(U, k, Q) : p.namespaceURI === qt ? tr(U, k, Q) : !!(Sn === "application/xhtml+xml" && as[p.namespaceURI]) : !1;
  }, bt = function(p) {
    mr(t.removed, {
      element: p
    });
    try {
      fe(p).removeChild(p);
    } catch {
      if (B(p), !fe(p))
        throw gs("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, ht = function(p, k, U) {
    try {
      V(p, k);
    } catch {
      try {
        p.removeAttribute(U);
      } catch {
      }
    }
  }, dt = function(p) {
    hn(p);
    const k = te(p);
    if (k) {
      const Q = [];
      ys(k, (ie) => {
        mr(Q, ie);
      }), ys(Q, (ie) => {
        try {
          B(ie);
        } catch {
        }
      });
    }
    const U = S(p);
    if (U)
      for (let Q = U.length - 1; Q >= 0; --Q) {
        const ie = U[Q], pe = ie && ie.name;
        typeof pe == "string" && ht(p, ie, pe);
      }
  }, Je = function(p, k, U) {
    if (!U)
      try {
        U = k.getAttributeNode(p);
      } catch {
        U = null;
      }
    mr(t.removed, {
      attribute: U || null,
      from: k
    });
    try {
      U ? V(k, U) : k.removeAttribute(p);
    } catch {
      try {
        k.removeAttribute(p);
      } catch {
      }
    }
    if (p === "is")
      if (P || T)
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
    const k = S(p);
    if (k)
      for (let U = k.length - 1; U >= 0; --U) {
        const Q = k[U], ie = Q && Q.name;
        typeof ie != "string" || L[rt(ie)] || ht(p, Q, ie);
      }
  }, hn = function(p) {
    const k = [p];
    for (; k.length > 0; ) {
      const U = k.pop();
      xe(U) === jt.element && Cn(U);
      const ie = te(U);
      if (ie)
        for (let pe = ie.length - 1; pe >= 0; --pe)
          k.push(ie[pe]);
    }
  }, nr = function(p, k) {
    return ae ? p === "patchsrc" ? !0 : p === "for" && k !== "label" && k !== "output" : !1;
  }, Rn = function(p) {
    if (!ae)
      return;
    const k = [p];
    for (; k.length > 0; ) {
      const U = k.pop(), Q = xe(U);
      if (Q === jt.processingInstruction || Q === jt.comment && Lt(Gl, U.data)) {
        try {
          B(U);
        } catch {
        }
        continue;
      }
      if (Q === jt.element) {
        const pe = U, Ye = rt(Oe(U));
        try {
          pe.hasAttribute && pe.hasAttribute("patchsrc") && pe.removeAttribute("patchsrc"), pe.hasAttribute && pe.hasAttribute("for") && nr("for", Ye) && pe.removeAttribute("for");
        } catch {
        }
      }
      const ie = te(U);
      if (ie)
        for (let pe = ie.length - 1; pe >= 0; --pe)
          k.push(ie[pe]);
    }
  }, Tt = function(p) {
    let k = null, U = null;
    if (_)
      p = "<remove></remove>" + p;
    else {
      const pe = $l(p, /^[\r\n\t ]+/);
      U = pe && pe[0];
    }
    Sn === "application/xhtml+xml" && Tn === qt && (p = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + p + "</body></html>");
    const Q = _e ? ue(p) : p;
    if (Tn === qt)
      try {
        k = new c().parseFromString(Q, Sn);
      } catch {
      }
    if (!k || !k.documentElement) {
      k = Ke.createDocument(Tn, "template", null);
      try {
        k.documentElement.innerHTML = Zs ? Me : Q;
      } catch {
      }
    }
    const ie = k.body || k.documentElement;
    return p && U && ie.insertBefore(n.createTextNode(U), ie.childNodes[0] || null), Tn === qt ? st.call(k, we ? "html" : "body")[0] : we ? k.documentElement : ie;
  }, Wn = function(p) {
    const k = Z ? Z(p) : p.ownerDocument;
    return Ae.call(
      k || p,
      p,
      // eslint-disable-next-line no-bitwise
      l.SHOW_ELEMENT | l.SHOW_COMMENT | l.SHOW_TEXT | l.SHOW_PROCESSING_INSTRUCTION | l.SHOW_CDATA_SECTION,
      null
    );
  }, Zt = function(p) {
    return p = _r(p, vt, " "), p = _r(p, gt, " "), p = _r(p, Ct, " "), p;
  }, sr = function(p) {
    var k;
    p.normalize();
    const U = Z ? Z(p) : p.ownerDocument, Q = Ae.call(
      U || p,
      p,
      // eslint-disable-next-line no-bitwise
      l.SHOW_TEXT | l.SHOW_COMMENT | l.SHOW_CDATA_SECTION | l.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let ie = Q.nextNode();
    for (; ie; )
      ie.data = Zt(ie.data), ie = Q.nextNode();
    const pe = (k = p.querySelectorAll) === null || k === void 0 ? void 0 : k.call(p, "template");
    pe && ys(pe, (Ye) => {
      qn(Ye.content) && sr(Ye.content);
    });
  }, Rs = function(p) {
    const k = Y ? Y(p) : null;
    return typeof k != "string" || rt(k) !== "form" ? !1 : typeof p.nodeName != "string" || typeof p.textContent != "string" || typeof p.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    p.attributes !== S(p) || typeof p.removeAttribute != "function" || // A form descendant named "removeAttributeNode" or "getAttributeNode"
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
    p.nodeType !== I(p) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
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
    p.childNodes !== te(p);
  }, qn = function(p) {
    if (!I || typeof p != "object" || p === null)
      return !1;
    try {
      return I(p) === jt.documentFragment;
    } catch {
      return !1;
    }
  }, ls = function(p) {
    if (!I || typeof p != "object" || p === null)
      return !1;
    try {
      return typeof I(p) == "number";
    } catch {
      return !1;
    }
  };
  function Jt(j, p, k) {
    j.length !== 0 && ys(j, (U) => {
      U.call(t, p, k, En);
    });
  }
  const Ji = function(p, k) {
    return !!(ae && p.hasChildNodes() && !ls(p.firstElementChild) && Lt(Kl, p.textContent) && Lt(Kl, p.innerHTML) || ae && p.namespaceURI === qt && Qp[k] && (ls(p.firstElementChild) || typeof p.textContent == "string" && Lt(eg[k], p.textContent)) || p.nodeType === jt.processingInstruction || ae && p.nodeType === jt.comment && Lt(Gl, p.data));
  }, Is = function(p, k) {
    if (p instanceof RegExp)
      return Lt(p, k);
    if (p instanceof Function) {
      for (var U = arguments.length, Q = new Array(U > 2 ? U - 2 : 0), ie = 2; ie < U; ie++)
        Q[ie - 2] = arguments[ie];
      return !!p(k, ...Q);
    }
    return !1;
  }, It = function(p, k, U) {
    if (!q[k] && rr(k) && Is(W.tagNameCheck, k))
      return !1;
    if (Le && !Ge[k]) {
      const Q = fe(p), ie = te(p);
      if (ie && Q) {
        const pe = ie.length;
        for (let Ye = pe - 1; Ye >= 0; --Ye) {
          const Xe = p === U ? z(ie[Ye], !0) : ie[Ye];
          Q.insertBefore(Xe, M(p));
        }
      }
    }
    return bt(p), !0;
  }, Vr = function(p, k, U, Q) {
    return p.length === 0 ? k : k === U || k === Q ? Kt(k) : k;
  }, Ls = function(p, k) {
    return p === k || fe(p) !== null ? !1 : (Ce && hn(p), !0);
  }, Kr = function(p, k) {
    if (Jt(Re.beforeSanitizeElements, p, null), Ls(p, k))
      return !0;
    if (Rs(p))
      return bt(p), !0;
    const U = rt(Oe(p));
    if (N = Vr(Re.uponSanitizeElement, N, F, Pe), Jt(Re.uponSanitizeElement, p, {
      tagName: U,
      allowedTags: N
    }), Ls(p, k))
      return !0;
    if (Ji(p, U))
      return bt(p), !0;
    if (q[U] || !(ne.tagCheck instanceof Function && ne.tagCheck(U)) && !N[U]) {
      const ie = It(p, U, k);
      return ie === !1 && Jt(Re.afterSanitizeElements, p, null), ie;
    }
    if (xe(p) === jt.element && !Xt(p) || (U === "noscript" || U === "noembed" || U === "noframes") && Lt(Zp, p.innerHTML))
      return bt(p), !0;
    if (J && p.nodeType === jt.text) {
      const ie = Zt(p.textContent);
      p.textContent !== ie && (mr(t.removed, {
        element: p.cloneNode()
      }), p.textContent = ie);
    }
    return Jt(Re.afterSanitizeElements, p, null), !1;
  }, Gr = function(p, k, U) {
    if ($[k] || nr(k, p) || se && (k === "id" || k === "name") && (U in n || U in zn))
      return !1;
    const Q = L[k] || ne.attributeCheck instanceof Function && ne.attributeCheck(k, p);
    return E && Lt(Rt, k) || X && Lt(Mt, k) ? !0 : Q ? Ys[k] || Lt(R, _r(U, m, "")) || (k === "src" || k === "xlink:href" || k === "href") && p !== "script" && Bl(U, "data:") === 0 && an[p] || O && !Lt(Yt, _r(U, m, "")) ? !0 : !U : (
      // Condition a) covers a basically valid custom element tag name whose
      // tag passes the configured tagNameCheck and whose attribute name
      // passes the configured attributeNameCheck ...
      rr(p) && Is(W.tagNameCheck, p) && Is(W.attributeNameCheck, k, p) || // Condition b) covers an `is` attribute whose value passes the
      // configured tagNameCheck while customized built-in elements are
      // allowed.
      k === "is" && W.allowCustomizedBuiltInElements && Is(W.tagNameCheck, U)
    );
  }, Qi = De({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), rr = function(p) {
    return !Qi[wr(p)] && Lt(y, p);
  }, ir = function(p, k, U, Q) {
    if (_e && typeof b == "object" && typeof b.getAttributeType == "function" && !U)
      switch (b.getAttributeType(p, k)) {
        case "TrustedHTML":
          return ue(Q);
        case "TrustedScriptURL":
          return ye(Q);
      }
    return Q;
  }, Yr = function(p, k, U, Q) {
    try {
      return U ? p.setAttributeNS(U, k, Q) : p.setAttribute(k, Q), Rs(p) ? (bt(p), !1) : !0;
    } catch {
      return Je(k, p), !1;
    }
  }, Xr = function(p) {
    Jt(Re.beforeSanitizeAttributes, p, null);
    const k = p.attributes;
    if (!k || Rs(p))
      return;
    L = Vr(Re.uponSanitizeAttribute, L, G, h);
    const U = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: L,
      forceKeepAttr: void 0
    };
    let Q = k.length;
    const ie = rt(p.nodeName);
    for (; Q--; ) {
      const pe = k[Q], Ye = pe.name, Xe = pe.namespaceURI, lt = pe.value, ct = rt(Ye), Qt = lt;
      let ut = Ye === "value" ? Qt : Np(Qt), In = !1;
      if (U.attrName = ct, U.attrValue = ut, U.keepAttr = !0, U.forceKeepAttr = void 0, Jt(Re.uponSanitizeAttribute, p, U), ut = U.attrValue, ee && (ct === "id" || ct === "name") && Bl(ut, Ie) !== 0 && (Je(Ye, p, pe), ut = Ie + ut, In = !0), ae && Lt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, ut)) {
        Je(Ye, p, pe);
        continue;
      }
      if (ct === "attributename" && $l(ut, "href")) {
        Je(Ye, p, pe);
        continue;
      }
      if (!U.forceKeepAttr) {
        if (!U.keepAttr) {
          Je(Ye, p, pe);
          continue;
        }
        if (!K && Lt(Jp, ut)) {
          Je(Ye, p, pe);
          continue;
        }
        if (J && (ut = Zt(ut)), !Gr(ie, ct, ut)) {
          Je(Ye, p, pe);
          continue;
        }
        ut = ir(ie, ct, Xe, ut), ut !== Qt && Yr(p, Ye, Xe, ut) && In && Fl(t.removed);
      }
    }
    Jt(Re.afterSanitizeAttributes, p, null);
  }, Os = function(p) {
    let k = null;
    const U = Wn(p);
    for (Jt(Re.beforeSanitizeShadowDOM, p, null); k = U.nextNode(); )
      if (Jt(Re.uponSanitizeShadowNode, k, null), Kr(k, p), Xr(k), qn(k.content) && Os(k.content), xe(k) === jt.element) {
        const Q = he(k);
        qn(Q) && (cs(Q), Os(Q));
      }
    Jt(Re.afterSanitizeShadowDOM, p, null);
  }, cs = function(p) {
    const k = [{
      node: p,
      shadow: null
    }];
    for (; k.length > 0; ) {
      const U = k.pop();
      if (U.shadow) {
        Os(U.shadow);
        continue;
      }
      const Q = U.node, pe = xe(Q) === jt.element, Ye = te(Q);
      if (Ye)
        for (let Xe = Ye.length - 1; Xe >= 0; --Xe)
          k.push({
            node: Ye[Xe],
            shadow: null
          });
      if (pe) {
        const Xe = Y ? Y(Q) : null;
        if (typeof Xe == "string" && rt(Xe) === "template") {
          const lt = Q.content;
          qn(lt) && k.push({
            node: lt,
            shadow: null
          });
        }
      }
      if (pe) {
        const Xe = he(Q);
        qn(Xe) && k.push({
          node: null,
          shadow: Xe
        }, {
          node: Xe,
          shadow: null
        });
      }
    }
  };
  return t.sanitize = function(j) {
    let p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, k = null, U = null, Q = null, ie = null;
    if (Zs = !j, Zs && (j = "<!-->"), typeof j != "string" && !ls(j) && (j = $p(j), typeof j != "string"))
      throw gs("dirty is not a string, aborting");
    if (!t.isSupported)
      return j;
    Ee ? (N = Pe, L = h) : Hn(p), (Re.uponSanitizeElement.length > 0 || Re.uponSanitizeAttribute.length > 0) && (N = Kt(N)), Re.uponSanitizeAttribute.length > 0 && (L = Kt(L)), t.removed = [];
    const pe = Ce && typeof j != "string" && ls(j);
    if (pe) {
      Rn(j);
      const lt = Oe(j);
      if (typeof lt == "string") {
        const ct = rt(lt);
        if (!N[ct] || q[ct])
          throw dt(j), gs("root node is forbidden and cannot be sanitized in-place");
      }
      if (Rs(j))
        throw dt(j), gs("root node is clobbered and cannot be sanitized in-place");
      try {
        cs(j);
      } catch (ct) {
        throw dt(j), ct;
      }
    } else if (ls(j))
      k = Tt("<!---->"), U = k.ownerDocument.importNode(j, !0), U.nodeType === jt.element && U.nodeName === "BODY" || U.nodeName === "HTML" ? k = U : k.appendChild(U), cs(k);
    else {
      if (!P && !J && !we && // eslint-disable-next-line unicorn/prefer-includes
      j.indexOf("<") === -1)
        return _e && H ? ue(j) : j;
      if (k = Tt(j), !k)
        return P ? null : H ? Me : "";
    }
    k && _ && bt(k.firstChild);
    const Ye = pe ? j : k;
    try {
      const lt = Wn(Ye);
      for (; Q = lt.nextNode(); )
        Kr(Q, Ye), Xr(Q), qn(Q.content) && Os(Q.content);
    } catch (lt) {
      throw pe && (dt(j), ys(t.removed, (ct) => {
        ct.element && hn(ct.element);
      })), lt;
    }
    if (pe)
      return ys(t.removed, (lt) => {
        lt.element && hn(lt.element);
      }), J && sr(j), j;
    if (P) {
      if (J && sr(k), T)
        for (ie = Ze.call(k.ownerDocument); k.firstChild; )
          ie.appendChild(k.firstChild);
      else
        ie = k;
      return (L.shadowroot || L.shadowrootmode) && (ie = At.call(s, ie, !0)), ie;
    }
    let Xe = we ? k.outerHTML : k.innerHTML;
    return we && N["!doctype"] && k.ownerDocument && k.ownerDocument.doctype && k.ownerDocument.doctype.name && Lt(Yp, k.ownerDocument.doctype.name) && (Xe = "<!DOCTYPE " + k.ownerDocument.doctype.name + `>
` + Xe), J && (Xe = Zt(Xe)), _e && H ? ue(Xe) : Xe;
  }, t.setConfig = function() {
    let j = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Hn(j), Ee = !0, Pe = N, h = L;
  }, t.clearConfig = function() {
    En = null, Ee = !1, Pe = null, h = null, _e = be, Me = "";
  }, t.isValidAttribute = function(j, p, k) {
    En || Hn({});
    const U = rt(j), Q = rt(p);
    return Gr(U, Q, k);
  }, t.addHook = function(j, p) {
    typeof p == "function" && Wt(Re, j) && mr(Re[j], p);
  }, t.removeHook = function(j, p) {
    if (Wt(Re, j)) {
      if (p !== void 0) {
        const k = Lp(Re[j], p);
        return k === -1 ? void 0 : Op(Re[j], k, 1)[0];
      }
      return Fl(Re[j]);
    }
  }, t.removeHooks = function(j) {
    Wt(Re, j) && (Re[j] = []);
  }, t.removeAllHooks = function() {
    Re = Yl();
  }, t;
}
var Ra = Nu();
Ra.addHook("uponSanitizeElement", (e, t) => {
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
Ra.addHook("afterSanitizeAttributes", (e) => {
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
function sg(e) {
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
  return Ra.sanitize(e, t);
}
Ue.setOptions({
  renderer: new Ue.Renderer(),
  gfm: !0,
  breaks: !0
});
const pi = (e) => sg(Ue(e || "")), Xl = "*", rg = /* @__PURE__ */ new Set(["null", "about:blank", ""]);
let nn = null;
const Or = (e) => e && !rg.has(e) ? e : null, ig = (e) => {
  if (!e) return null;
  try {
    return Or(new URL(e).origin);
  } catch {
    return null;
  }
};
function og() {
  if (nn) return nn;
  if (window.parent === window)
    return nn = Or(window.location.origin) || Xl, nn;
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
  return nn = ig(document.referrer) || Xl, nn;
}
function Zl(e) {
  nn = Or(e) || nn;
}
function Ft(e) {
  window.parent.postMessage(e, og());
}
const Ni = "Start a new chat", Jl = "Start a new chat? This ends the current one.", ag = "Start new chat", lg = "Cancel", Ql = "Couldn't start a new chat. Please try again.", cg = 15e3, ug = ["aria-label"], fg = { class: "new-chat-confirm__question" }, hg = { class: "new-chat-confirm__actions" }, dg = ["disabled"], pg = ["disabled"], gg = /* @__PURE__ */ ma({
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
      "aria-label": C(Jl)
    }, [
      v("p", fg, re(s.error || C(Jl)), 1),
      v("div", hg, [
        v("button", {
          type: "button",
          class: "new-chat-confirm__button",
          disabled: s.busy,
          onClick: r[0] || (r[0] = (i) => n("cancel"))
        }, re(C(lg)), 9, dg),
        v("button", {
          type: "button",
          class: "new-chat-confirm__button new-chat-confirm__button--primary",
          disabled: s.busy,
          onClick: r[1] || (r[1] = (i) => n("confirm"))
        }, re(C(ag)), 9, pg)
      ])
    ], 8, ug));
  }
}), Ia = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Pu = /* @__PURE__ */ Ia(gg, [["__scopeId", "data-v-6c78f353"]]), mg = { class: "askai" }, _g = { class: "askai__bar" }, yg = ["value", "placeholder", "disabled", "aria-label", "onKeydown"], vg = ["disabled", "title", "aria-label", "aria-expanded"], bg = { class: "askai__intro" }, wg = { class: "askai__title" }, kg = {
  key: 0,
  class: "askai__subtitle"
}, Tg = {
  key: 0,
  class: "askai__suggestions"
}, xg = ["disabled", "onClick"], Ag = ["aria-live"], Sg = {
  key: 0,
  class: "askai__question"
}, Eg = {
  key: 1,
  class: "askai__system"
}, Cg = ["innerHTML"], Rg = {
  key: 0,
  class: "askai__sources"
}, Ig = ["title"], Lg = {
  key: 0,
  class: "askai__thinking",
  role: "status",
  "aria-live": "polite"
}, Og = { class: "askai__thinking-text" }, Ng = { class: "askai__foot" }, Pg = { key: 0 }, Mg = /* @__PURE__ */ ma({
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
      () => n.messages.map((S, I) => ({ message: S, index: I })).filter(({ message: S }) => a.includes(S.message_type))
    ), d = de(() => l.value.length > 0), c = (S) => {
      s("update:draft", S.target.value);
    }, b = () => {
      !(n.typingEnabled ?? n.inputEnabled) || !n.draft.trim() || s("send");
    }, w = (S) => {
      n.inputEnabled && s("ask", S);
    }, z = typeof navigator < "u" && /Mac|iPod|iPhone|iPad/.test(navigator.platform || ""), B = (S) => {
      if (S.key === "Escape") {
        S.preventDefault(), s("close");
        return;
      }
      const I = z ? S.metaKey && !S.ctrlKey : S.ctrlKey && !S.metaKey;
      n.hotkey && I && !S.altKey && (S.key === "k" || S.key === "K") && (S.preventDefault(), s("close"));
    }, V = () => {
      ks(() => {
        var S;
        return (S = r.value) == null ? void 0 : S.focus();
      });
    };
    let M = 0;
    const te = () => {
      if (!o.value) return;
      const S = o.value.closest(".askai"), I = i.value;
      if (!S || !I) return;
      const Y = S.offsetHeight - I.offsetHeight, Z = getComputedStyle(I), xe = parseFloat(Z.paddingTop) + parseFloat(Z.paddingBottom), Oe = Math.ceil(Y + xe + o.value.getBoundingClientRect().height);
      Math.abs(Oe - M) < 3 || (M = Oe, Ft({ type: "WIDGET_RESIZE", height: Oe }));
    };
    let fe = null;
    const he = de(
      () => l.value.reduce((S, { message: I, index: Y }) => S + n.displayText(Y, I.message || "").length, 0)
    );
    return $t(
      () => [l.value.length, he.value, n.loading],
      () => ks(() => {
        i.value && (i.value.scrollTop = i.value.scrollHeight);
      })
    ), $t(() => n.newChatArmed, () => ks(() => te())), $t(() => n.active, (S) => {
      S && V();
    }), qi(() => {
      n.active && V(), window.addEventListener("keydown", B), o.value && typeof ResizeObserver < "u" && (fe = new ResizeObserver(() => te()), fe.observe(o.value)), te();
    }), Gc(() => {
      window.removeEventListener("keydown", B), fe == null || fe.disconnect(), fe = null;
    }), (S, I) => (x(), A("div", mg, [
      v("div", _g, [
        I[6] || (I[6] = v("svg", {
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
          value: S.draft,
          placeholder: S.placeholder,
          disabled: !(S.typingEnabled ?? S.inputEnabled),
          "aria-label": S.placeholder,
          autocomplete: "off",
          spellcheck: "false",
          onInput: c,
          onKeydown: hi(_s(b, ["prevent"]), ["enter"])
        }, null, 40, yg),
        S.canStartNewChat ? (x(), A("button", {
          key: 0,
          type: "button",
          class: $e(["askai__new", { "askai__new--armed": S.newChatArmed }]),
          disabled: S.startingNewChat,
          title: C(Ni),
          "aria-label": C(Ni),
          "aria-expanded": S.newChatArmed,
          onClick: I[0] || (I[0] = (Y) => s("newChat"))
        }, I[4] || (I[4] = [
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
        ]), 10, vg)) : le("", !0),
        v("button", {
          type: "button",
          class: "askai__close",
          "aria-label": "Close",
          title: "Close (Esc)",
          onClick: I[1] || (I[1] = (Y) => s("close"))
        }, I[5] || (I[5] = [
          v("span", { class: "askai__kbd" }, "Esc", -1)
        ]))
      ]),
      S.newChatArmed && S.canStartNewChat ? (x(), Ei(Pu, {
        key: 0,
        busy: S.startingNewChat,
        error: S.newChatError,
        onConfirm: I[2] || (I[2] = (Y) => s("confirmNewChat")),
        onCancel: I[3] || (I[3] = (Y) => s("cancelNewChat"))
      }, null, 8, ["busy", "error"])) : le("", !0),
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
          d.value ? (x(), A(Be, { key: 1 }, [
            (x(!0), A(Be, null, St(l.value, ({ message: Y, index: Z }) => (x(), A("div", {
              key: Z,
              class: "askai__turn",
              "aria-live": S.isStreaming(Z) ? "off" : "polite"
            }, [
              Y.message_type === "user" ? (x(), A("p", Sg, re(Y.message), 1)) : Y.message_type === "system" ? (x(), A("p", Eg, re(Y.message), 1)) : (x(), A(Be, { key: 2 }, [
                v("div", {
                  class: $e(["askai__answer", { "askai__answer--streaming": S.isStreaming(Z) }]),
                  innerHTML: C(pi)(S.isStreaming(Z) ? S.displayText(Z, Y.message || "") : Y.message || "")
                }, null, 10, Cg),
                S.showCitations && !S.isStreaming(Z) && Y.sources && Y.sources.length ? (x(), A("div", Rg, [
                  I[9] || (I[9] = v("span", { class: "askai__label" }, "Sources", -1)),
                  (x(!0), A(Be, null, St(Y.sources, (xe, Oe) => (x(), A("span", {
                    key: Oe,
                    class: "askai__source",
                    title: S.citationTooltip(xe)
                  }, re(S.citationLabel(xe)), 9, Ig))), 128))
                ])) : le("", !0)
              ], 64))
            ], 8, Ag))), 128)),
            S.loading ? (x(), A("div", Lg, [
              I[10] || (I[10] = v("span", { class: "askai__dot" }, null, -1)),
              I[11] || (I[11] = v("span", { class: "askai__dot" }, null, -1)),
              I[12] || (I[12] = v("span", { class: "askai__dot" }, null, -1)),
              v("span", Og, re(S.showCitations ? "Searching the knowledge base" : "Thinking"), 1)
            ])) : le("", !0)
          ], 64)) : (x(), A(Be, { key: 0 }, [
            v("div", bg, [
              v("h2", wg, re(S.welcomeTitle || `Ask ${S.agentName}`), 1),
              S.welcomeSubtitle ? (x(), A("p", kg, re(S.welcomeSubtitle), 1)) : le("", !0)
            ]),
            S.suggestions.length && !S.draft.trim() ? (x(), A("div", Tg, [
              I[8] || (I[8] = v("p", { class: "askai__label" }, "Suggested", -1)),
              (x(!0), A(Be, null, St(S.suggestions, (Y) => (x(), A("button", {
                key: Y,
                type: "button",
                class: "askai__suggestion",
                disabled: !S.inputEnabled,
                onClick: (Z) => w(Y)
              }, [
                v("span", null, re(Y), 1),
                I[7] || (I[7] = v("svg", {
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
              ], 8, xg))), 128))
            ])) : le("", !0)
          ], 64))
        ], 512)
      ], 512),
      v("div", Ng, [
        S.disclaimer ? (x(), A("span", Pg, re(S.disclaimer), 1)) : le("", !0),
        I[13] || (I[13] = v("a", {
          class: "askai__brand",
          href: "https://chattermate.chat",
          target: "_blank",
          rel: "noopener noreferrer"
        }, "Powered by ChatterMate", -1))
      ])
    ]));
  }
}), Dg = /* @__PURE__ */ Ia(Mg, [["__scopeId", "data-v-edea9534"]]), kr = [
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
], Fg = (e) => (e || "").split("").reduce((t, n) => t + n.charCodeAt(0), 0) % kr.length, $g = (e) => {
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
}, Bg = (e, t) => {
  const n = typeof t == "number" && Number.isFinite(t) ? t : Fg(e);
  return $g(n);
}, ec = (e) => {
  var t;
  return !!((t = e == null ? void 0 : e.attributes) != null && t.end_chat);
}, tc = "AI can make mistakes. Check important info.";
function Ug(e, t = !1) {
  return e !== !1 && !t;
}
const So = {
  ai: "Online · replies instantly",
  human: "Online · usually replies in a few minutes",
  away: "Away · we'll reply when we're back"
};
function zg(e, t = !1) {
  return (t ? "human" : (e == null ? void 0 : e.mode) ?? "ai") === "ai" ? { text: So.ai, online: !0 } : (e == null ? void 0 : e.available) !== !1 ? { text: So.human, online: !0 } : { text: So.away, online: !1 };
}
const Mu = (e) => !!e && (/^https?:\/\//i.test(e) || e.startsWith("data:")), Hg = (e, t) => e ? Mu(e) || e.startsWith("blob:") ? e : `${t.replace(/\/api\/v1\/?$/, "")}${e.startsWith("/") ? "" : "/"}${e}` : "";
function nc() {
  return typeof window < "u" && window.APP_CONFIG ? window.APP_CONFIG : {};
}
const xs = {
  get API_URL() {
    return nc().API_URL || "https://api.chattermate.chat/api/v1";
  },
  get WS_URL() {
    return nc().WS_URL || "wss://api.chattermate.chat";
  }
};
function Pi(e) {
  return Hg(e, xs.API_URL);
}
const Du = "ctid", Wg = "identity_expired", sc = 0.8, qg = 720 * 60 * 1e3, Eo = 30 * 1e3, Co = 1e3, Jn = (e) => {
  if (typeof e != "string") return e ? String(e) : null;
  const t = e.trim();
  return !t || t === "undefined" || t === "null" ? null : t;
}, gi = (e) => {
  const t = Jn(e);
  if (!t) return null;
  const [, n] = t.split(".");
  if (!n) return null;
  try {
    const s = atob(n.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(s);
  } catch {
    return null;
  }
}, Mi = (e = Du) => ({
  read: () => {
    try {
      return Jn(localStorage.getItem(e));
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
}), jg = () => ({
  read: () => null,
  write: () => {
  },
  clear: () => {
  }
});
function Vg(e = {}) {
  const t = e.store ?? Mi(), n = ce(null);
  let s = null, r = null;
  const i = () => {
    s && (clearTimeout(s), s = null);
  }, o = () => {
    const V = gi(n.value);
    return V != null && V.exp ? Number(V.exp) - Math.floor(Date.now() / Co) : null;
  }, a = () => {
    const V = gi(n.value);
    if (!(V != null && V.exp)) return !1;
    const M = V.iat ? Number(V.exp) - Number(V.iat) : 0, te = o() ?? 0;
    return M <= 0 ? te <= 0 : te <= M * (1 - sc);
  }, l = (V, { persist: M = !0 } = {}) => {
    var he, S;
    const te = Jn(V), fe = !!n.value;
    if (i(), n.value = te, !te) {
      t.clear(), fe && ((he = e.onTokenCleared) == null || he.call(e));
      return;
    }
    M && (t.write(te), (S = e.onTokenChanged) == null || S.call(e, te)), b();
  }, d = async (V) => {
    if (!n.value || !V) return !1;
    if (r) return r;
    const M = n.value;
    return r = (async () => {
      var te, fe;
      try {
        const he = await fetch(`${xs.API_URL}/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${M}`
          },
          body: JSON.stringify({ widget_id: V })
        });
        if (he.status === 401)
          return (te = e.onIdentityExpired) == null || te.call(e), !1;
        if (!he.ok)
          return b(Eo), !1;
        const S = await he.json(), I = Jn((fe = S == null ? void 0 : S.data) == null ? void 0 : fe.token);
        return I ? (l(I), !0) : !1;
      } catch {
        return b(Eo), !1;
      } finally {
        r = null;
      }
    })(), r;
  }, c = async (V) => n.value ? a() ? d(V) : !0 : !1, b = (V) => {
    i();
    const M = gi(n.value);
    if (!(M != null && M.exp) || !(M != null && M.iat)) return;
    const te = (Number(M.exp) - Number(M.iat)) * Co, fe = (o() ?? 0) * Co, he = V ?? Math.min(
      qg,
      Math.max(0, fe - te * (1 - sc))
    );
    s = setTimeout(() => {
      s = null, c(w).then((S) => {
        b(S ? void 0 : Eo);
      });
    }, he);
  };
  let w = "";
  return {
    token: n,
    start: (V, M) => {
      w = V;
      const te = Jn(M) || t.read();
      l(te, { persist: !1 }), te && t.write(te);
    },
    stop: () => {
      i(), r = null;
    },
    setToken: l,
    ensureFresh: c
  };
}
const Vs = window.__CM_FRAME__, Fu = "null";
let bs = !1, $u = !1, Bu = null;
const Zo = () => !!Vs, vs = () => !Vs || bs && !$u, Kg = () => Bu, Uu = (e) => {
  typeof e == "string" && e && (Bu = e);
}, zu = (e) => Vs ? bs ? jg() : Mi(`${Du}:${e}`) : Mi(), Gg = () => new Promise((e) => {
  const t = (n) => {
    var r;
    if (n.source !== window.parent || ((r = n.data) == null ? void 0 : r.type) !== "HOST_INIT") return;
    window.removeEventListener("message", t);
    const s = n.origin === Fu;
    e({
      origin: n.origin,
      // An opaque host can't be addressed, so nothing it hands over can be
      // answered safely: such a frame runs as an anonymous visitor.
      token: s ? null : Jn(n.data.token),
      pageUrl: typeof n.data.pageUrl == "string" ? n.data.pageUrl : null
    });
  };
  window.addEventListener("message", t), window.parent.postMessage({ type: "FRAME_READY" }, "*");
}), Yg = async (e) => {
  var t;
  try {
    const n = await e.json();
    return ((t = n == null ? void 0 : n.detail) == null ? void 0 : t.code) || "unavailable";
  } catch {
    return "unavailable";
  }
}, rc = () => {
  const e = document.getElementById("app");
  e && (e.textContent = "Chat is unavailable right now.");
};
async function Xg() {
  if (!Vs) return !0;
  const e = new URL(window.location.href).searchParams;
  bs = e.get("host") === "1" && window.parent !== window;
  let t, n = null;
  if (bs) {
    const o = await Gg();
    o.origin !== Fu ? (Zl(o.origin), n = o.origin) : ($u = !0, Zl("*")), Uu(o.pageUrl), t = o.token;
  } else
    t = zu(Vs.widgetId).read();
  let s;
  try {
    s = await fetch(`${xs.API_URL}/widgets/${encodeURIComponent(Vs.widgetId)}/bootstrap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...t ? { Authorization: `Bearer ${t}` } : {}
      },
      body: JSON.stringify({ host_origin: n, source: e.get("source") })
    });
  } catch {
    return bs ? Ft({ type: "WIDGET_ERROR", code: "unavailable" }) : rc(), !1;
  }
  if (!s.ok) {
    const o = await Yg(s);
    return bs ? Ft({ type: "WIDGET_ERROR", code: o }) : rc(), !1;
  }
  const r = await s.json();
  window.__INITIAL_DATA__ = r;
  const i = Jn(r.initialToken);
  return vs() && i && i !== t && Ft({ type: "TOKEN_UPDATE", token: i }), !0;
}
const Zg = () => {
  bs && Ft({ type: "WIDGET_READY" });
};
function Jg(e) {
  const t = de(() => ({
    backgroundColor: "var(--cm-card)",
    color: "var(--cm-text)"
  })), n = de(() => ({
    backgroundColor: e.value.chat_bubble_color || "#C9F24E",
    color: qs(e.value.chat_bubble_color || "#C9F24E") ? "#FFFFFF" : "#000000"
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
  })), a = de(() => Pi(e.value.photo_url)), l = de(() => {
    const d = e.value.chat_background_color || "#ffffff";
    return {
      boxShadow: `0 8px 5px ${qs(d) ? "rgba(0, 0, 0, 0.24)" : "rgba(0, 0, 0, 0.12)"}`
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
const Qg = /* @__PURE__ */ new Set(["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]), em = /* @__PURE__ */ new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
]);
[...Qg, ...em];
function tm(e, t) {
  const n = ce([]), s = ce(!1), r = ce(null), i = (I) => {
    if (I === 0) return "0 Bytes";
    const Y = 1024, Z = ["Bytes", "KB", "MB", "GB"], xe = Math.floor(Math.log(I) / Math.log(Y));
    return parseFloat((I / Math.pow(Y, xe)).toFixed(2)) + " " + Z[xe];
  }, o = (I) => I.startsWith("image/"), a = (I) => I ? Pi(I) : "", l = (I) => {
    const Y = I.file_url || I.url;
    return Y ? Pi(Y) : "";
  }, d = async (I) => {
    const Y = I.target;
    Y.files && Y.files.length > 0 && (await V(Array.from(Y.files)), Y.value = "");
  }, c = async (I) => {
    var Z;
    I.preventDefault();
    const Y = (Z = I.dataTransfer) == null ? void 0 : Z.files;
    Y && Y.length > 0 && await V(Array.from(Y));
  }, b = (I) => {
    I.preventDefault();
  }, w = (I) => {
    I.preventDefault();
  }, z = async (I) => {
    var xe;
    const Y = (xe = I.clipboardData) == null ? void 0 : xe.items;
    if (!Y) return;
    const Z = [];
    for (const Oe of Array.from(Y))
      if (Oe.kind === "file") {
        const _e = Oe.getAsFile();
        _e && Z.push(_e);
      }
    Z.length > 0 && await V(Z);
  }, B = async (I, Y = 500) => new Promise((Z, xe) => {
    const Oe = new FileReader();
    Oe.onload = (_e) => {
      var be;
      const Me = new Image();
      Me.onload = () => {
        const je = document.createElement("canvas");
        let Ve = Me.width, ot = Me.height;
        const ue = 1920;
        (Ve > ue || ot > ue) && (Ve > ot ? (ot = ot / Ve * ue, Ve = ue) : (Ve = Ve / ot * ue, ot = ue)), je.width = Ve, je.height = ot;
        const ye = je.getContext("2d");
        if (!ye) {
          xe(new Error("Failed to get canvas context"));
          return;
        }
        ye.drawImage(Me, 0, 0, Ve, ot);
        let me = 0.9;
        const nt = () => {
          je.toBlob((Ke) => {
            if (!Ke) {
              xe(new Error("Failed to compress image"));
              return;
            }
            if (Ke.size / 1024 > Y && me > 0.3)
              me -= 0.1, nt();
            else {
              const Ze = new FileReader();
              Ze.onload = () => {
                const st = Ze.result.split(",")[1];
                Z({ blob: Ke, base64: st });
              }, Ze.readAsDataURL(Ke);
            }
          }, I.type === "image/png" ? "image/png" : "image/jpeg", me);
        };
        nt();
      }, Me.onerror = () => xe(new Error("Failed to load image")), Me.src = (be = _e.target) == null ? void 0 : be.result;
    }, Oe.onerror = () => xe(new Error("Failed to read file")), Oe.readAsDataURL(I);
  }), V = async (I) => {
    if (n.value.length >= 3) {
      alert("Maximum 3 files allowed per message");
      return;
    }
    const _e = 3 - n.value.length, Me = I.slice(0, _e);
    I.length > _e && alert(`Only ${_e} more file(s) can be uploaded. Maximum 3 files per message.`);
    for (const be of Me)
      try {
        if (n.value.some((ue) => ue.filename === be.name)) {
          console.warn(`File ${be.name} is already selected`), alert(`File "${be.name}" is already selected`);
          continue;
        }
        const Ve = be.type.startsWith("image/"), ot = Ve ? 5242880 : 10485760;
        if (be.size > ot) {
          const ue = ot / 1048576;
          console.error(`File ${be.name} is too large. Maximum size is ${ue}MB`), alert(`File "${be.name}" is too large. Maximum size for ${Ve ? "images" : "documents"} is ${ue}MB`);
          continue;
        }
        if (Ve)
          try {
            const { blob: ue, base64: ye } = await B(be, 500), me = ue.size;
            console.log(`Compressed ${be.name}: ${(be.size / 1024).toFixed(2)}KB → ${(me / 1024).toFixed(2)}KB`), n.value.push({
              content: ye,
              filename: be.name,
              type: be.type,
              size: me,
              url: URL.createObjectURL(ue),
              file_url: URL.createObjectURL(ue)
            });
          } catch (ue) {
            console.error("Image compression failed, uploading original:", ue);
            const ye = new FileReader();
            ye.onload = (me) => {
              var Ae;
              const Ke = ((Ae = me.target) == null ? void 0 : Ae.result).split(",")[1];
              n.value.push({
                content: Ke,
                filename: be.name,
                type: be.type,
                size: be.size,
                url: URL.createObjectURL(be),
                file_url: URL.createObjectURL(be)
              });
            }, ye.readAsDataURL(be);
          }
        else {
          const ue = new FileReader();
          ue.onload = (ye) => {
            var Ke;
            const nt = ((Ke = ye.target) == null ? void 0 : Ke.result).split(",")[1];
            n.value.push({
              content: nt,
              filename: be.name,
              type: be.type || "application/octet-stream",
              size: be.size,
              url: "",
              file_url: ""
            });
          }, ue.readAsDataURL(be);
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
    handleFileSelect: d,
    handleDrop: c,
    handleDragOver: b,
    handleDragLeave: w,
    handlePaste: z,
    uploadFiles: V,
    removeAttachment: async (I) => {
      const Y = n.value[I];
      if (Y) {
        try {
          let Z = Y.url;
          if (Z.startsWith("/uploads/") ? Z = Z.substring(9) : Z.startsWith("/") && (Z = Z.substring(1)), Mu(Z))
            try {
              Z = new URL(Z).pathname.replace(/^\/+/, "");
            } catch {
            }
          const xe = {};
          e.value && (xe.Authorization = `Bearer ${e.value}`);
          const Oe = await fetch(`${xs.API_URL}/files/upload/${Z}`, {
            method: "DELETE",
            headers: xe
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
        Y.url && Y.url.startsWith("blob:") && URL.revokeObjectURL(Y.url), Y.file_url && Y.file_url.startsWith("blob:") && URL.revokeObjectURL(Y.file_url), n.value.splice(I, 1);
      }
    },
    openPreview: (I) => {
      r.value = I, s.value = !0;
    },
    closePreview: () => {
      s.value = !1, setTimeout(() => {
        r.value = null;
      }, 300);
    },
    openFilePicker: () => {
      var I;
      (I = t.value) == null || I.click();
    },
    isImage: (I) => I.startsWith("image/")
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
const mi = /* @__PURE__ */ Object.create(null);
Object.keys(wn).forEach((e) => {
  mi[wn[e]] = e;
});
const Jo = { type: "error", data: "parser error" }, Hu = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", Wu = typeof ArrayBuffer == "function", qu = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e && e.buffer instanceof ArrayBuffer, La = ({ type: e, data: t }, n, s) => Hu && t instanceof Blob ? n ? s(t) : ic(t, s) : Wu && (t instanceof ArrayBuffer || qu(t)) ? n ? s(t) : ic(new Blob([t]), s) : s(wn[e] + (t || "")), ic = (e, t) => {
  const n = new FileReader();
  return n.onload = function() {
    const s = n.result.split(",")[1];
    t("b" + (s || ""));
  }, n.readAsDataURL(e);
};
function oc(e) {
  return e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let Ro;
function nm(e, t) {
  if (Hu && e.data instanceof Blob)
    return e.data.arrayBuffer().then(oc).then(t);
  if (Wu && (e.data instanceof ArrayBuffer || qu(e.data)))
    return t(oc(e.data));
  La(e, !1, (n) => {
    Ro || (Ro = new TextEncoder()), t(Ro.encode(n));
  });
}
const ac = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Tr = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < ac.length; e++)
  Tr[ac.charCodeAt(e)] = e;
const sm = (e) => {
  let t = e.length * 0.75, n = e.length, s, r = 0, i, o, a, l;
  e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
  const d = new ArrayBuffer(t), c = new Uint8Array(d);
  for (s = 0; s < n; s += 4)
    i = Tr[e.charCodeAt(s)], o = Tr[e.charCodeAt(s + 1)], a = Tr[e.charCodeAt(s + 2)], l = Tr[e.charCodeAt(s + 3)], c[r++] = i << 2 | o >> 4, c[r++] = (o & 15) << 4 | a >> 2, c[r++] = (a & 3) << 6 | l & 63;
  return d;
}, rm = typeof ArrayBuffer == "function", Oa = (e, t) => {
  if (typeof e != "string")
    return {
      type: "message",
      data: ju(e, t)
    };
  const n = e.charAt(0);
  return n === "b" ? {
    type: "message",
    data: im(e.substring(1), t)
  } : mi[n] ? e.length > 1 ? {
    type: mi[n],
    data: e.substring(1)
  } : {
    type: mi[n]
  } : Jo;
}, im = (e, t) => {
  if (rm) {
    const n = sm(e);
    return ju(n, t);
  } else
    return { base64: !0, data: e };
}, ju = (e, t) => {
  switch (t) {
    case "blob":
      return e instanceof Blob ? e : new Blob([e]);
    case "arraybuffer":
    default:
      return e instanceof ArrayBuffer ? e : e.buffer;
  }
}, Vu = "", om = (e, t) => {
  const n = e.length, s = new Array(n);
  let r = 0;
  e.forEach((i, o) => {
    La(i, !1, (a) => {
      s[o] = a, ++r === n && t(s.join(Vu));
    });
  });
}, am = (e, t) => {
  const n = e.split(Vu), s = [];
  for (let r = 0; r < n.length; r++) {
    const i = Oa(n[r], t);
    if (s.push(i), i.type === "error")
      break;
  }
  return s;
};
function lm() {
  return new TransformStream({
    transform(e, t) {
      nm(e, (n) => {
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
function ii(e) {
  return e.reduce((t, n) => t + n.length, 0);
}
function oi(e, t) {
  if (e[0].length === t)
    return e.shift();
  const n = new Uint8Array(t);
  let s = 0;
  for (let r = 0; r < t; r++)
    n[r] = e[0][s++], s === e[0].length && (e.shift(), s = 0);
  return e.length && s < e[0].length && (e[0] = e[0].slice(s)), n;
}
function cm(e, t) {
  Io || (Io = new TextDecoder());
  const n = [];
  let s = 0, r = -1, i = !1;
  return new TransformStream({
    transform(o, a) {
      for (n.push(o); ; ) {
        if (s === 0) {
          if (ii(n) < 1)
            break;
          const l = oi(n, 1);
          i = (l[0] & 128) === 128, r = l[0] & 127, r < 126 ? s = 3 : r === 126 ? s = 1 : s = 2;
        } else if (s === 1) {
          if (ii(n) < 2)
            break;
          const l = oi(n, 2);
          r = new DataView(l.buffer, l.byteOffset, l.length).getUint16(0), s = 3;
        } else if (s === 2) {
          if (ii(n) < 8)
            break;
          const l = oi(n, 8), d = new DataView(l.buffer, l.byteOffset, l.length), c = d.getUint32(0);
          if (c > Math.pow(2, 21) - 1) {
            a.enqueue(Jo);
            break;
          }
          r = c * Math.pow(2, 32) + d.getUint32(4), s = 3;
        } else {
          if (ii(n) < r)
            break;
          const l = oi(n, r);
          a.enqueue(Oa(i ? l : Io.decode(l), t)), s = 0;
        }
        if (r === 0 || r > e) {
          a.enqueue(Jo);
          break;
        }
      }
    }
  });
}
const Ku = 4;
function mt(e) {
  if (e) return um(e);
}
function um(e) {
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
const Xi = typeof Promise == "function" && typeof Promise.resolve == "function" ? (t) => Promise.resolve().then(t) : (t, n) => n(t, 0), sn = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), fm = "arraybuffer";
function Gu(e, ...t) {
  return t.reduce((n, s) => (e.hasOwnProperty(s) && (n[s] = e[s]), n), {});
}
const hm = sn.setTimeout, dm = sn.clearTimeout;
function Zi(e, t) {
  t.useNativeTimers ? (e.setTimeoutFn = hm.bind(sn), e.clearTimeoutFn = dm.bind(sn)) : (e.setTimeoutFn = sn.setTimeout.bind(sn), e.clearTimeoutFn = sn.clearTimeout.bind(sn));
}
const pm = 1.33;
function gm(e) {
  return typeof e == "string" ? mm(e) : Math.ceil((e.byteLength || e.size) * pm);
}
function mm(e) {
  let t = 0, n = 0;
  for (let s = 0, r = e.length; s < r; s++)
    t = e.charCodeAt(s), t < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (s++, n += 4);
  return n;
}
function Yu() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function _m(e) {
  let t = "";
  for (let n in e)
    e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
  return t;
}
function ym(e) {
  let t = {}, n = e.split("&");
  for (let s = 0, r = n.length; s < r; s++) {
    let i = n[s].split("=");
    t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
  }
  return t;
}
class vm extends Error {
  constructor(t, n, s) {
    super(t), this.description = n, this.context = s, this.type = "TransportError";
  }
}
class Na extends mt {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(t) {
    super(), this.writable = !1, Zi(this, t), this.opts = t, this.query = t.query, this.socket = t.socket, this.supportsBinary = !t.forceBase64;
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
    return super.emitReserved("error", new vm(t, n, s)), this;
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
    const n = Oa(t, this.socket.binaryType);
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
    const n = _m(t);
    return n.length ? "?" + n : "";
  }
}
class bm extends Na {
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
    am(t, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
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
    this.writable = !1, om(t, (n) => {
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
    return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = Yu()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(t, n);
  }
}
let Xu = !1;
try {
  Xu = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const wm = Xu;
function km() {
}
class Tm extends bm {
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
class vn extends mt {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(t, n, s) {
    super(), this.createRequest = t, Zi(this, s), this._opts = s, this._method = s.method || "GET", this._uri = n, this._data = s.data !== void 0 ? s.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var t;
    const n = Gu(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
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
      if (this._xhr.onreadystatechange = km, t)
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
    attachEvent("onunload", lc);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in sn ? "pagehide" : "unload";
    addEventListener(e, lc, !1);
  }
}
function lc() {
  for (let e in vn.requests)
    vn.requests.hasOwnProperty(e) && vn.requests[e].abort();
}
const xm = function() {
  const e = Zu({
    xdomain: !1
  });
  return e && e.responseType !== null;
}();
class Am extends Tm {
  constructor(t) {
    super(t);
    const n = t && t.forceBase64;
    this.supportsBinary = xm && !n;
  }
  request(t = {}) {
    return Object.assign(t, { xd: this.xd }, this.opts), new vn(Zu, this.uri(), t);
  }
}
function Zu(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || wm))
      return new XMLHttpRequest();
  } catch {
  }
  if (!t)
    try {
      return new sn[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const Ju = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class Sm extends Na {
  get name() {
    return "websocket";
  }
  doOpen() {
    const t = this.uri(), n = this.opts.protocols, s = Ju ? {} : Gu(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
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
      La(s, this.supportsBinary, (i) => {
        try {
          this.doWrite(s, i);
        } catch {
        }
        r && Xi(() => {
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
    return this.opts.timestampRequests && (n[this.opts.timestampParam] = Yu()), this.supportsBinary || (n.b64 = 1), this.createUri(t, n);
  }
}
const Lo = sn.WebSocket || sn.MozWebSocket;
class Em extends Sm {
  createSocket(t, n, s) {
    return Ju ? new Lo(t, n, s) : n ? new Lo(t, n) : new Lo(t);
  }
  doWrite(t, n) {
    this.ws.send(n);
  }
}
class Cm extends Na {
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
        const n = cm(Number.MAX_SAFE_INTEGER, this.socket.binaryType), s = t.readable.pipeThrough(n).getReader(), r = lm();
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
        r && Xi(() => {
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
const Rm = {
  websocket: Em,
  webtransport: Cm,
  polling: Am
}, Im = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, Lm = [
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
function Qo(e) {
  if (e.length > 8e3)
    throw "URI too long";
  const t = e, n = e.indexOf("["), s = e.indexOf("]");
  n != -1 && s != -1 && (e = e.substring(0, n) + e.substring(n, s).replace(/:/g, ";") + e.substring(s, e.length));
  let r = Im.exec(e || ""), i = {}, o = 14;
  for (; o--; )
    i[Lm[o]] = r[o] || "";
  return n != -1 && s != -1 && (i.source = t, i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"), i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), i.ipv6uri = !0), i.pathNames = Om(i, i.path), i.queryKey = Nm(i, i.query), i;
}
function Om(e, t) {
  const n = /\/{2,9}/g, s = t.replace(n, "/").split("/");
  return (t.slice(0, 1) == "/" || t.length === 0) && s.splice(0, 1), t.slice(-1) == "/" && s.splice(s.length - 1, 1), s;
}
function Nm(e, t) {
  const n = {};
  return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, r, i) {
    r && (n[r] = i);
  }), n;
}
const ea = typeof addEventListener == "function" && typeof removeEventListener == "function", _i = [];
ea && addEventListener("offline", () => {
  _i.forEach((e) => e());
}, !1);
class Qn extends mt {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(t, n) {
    if (super(), this.binaryType = fm, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, t && typeof t == "object" && (n = t, t = null), t) {
      const s = Qo(t);
      n.hostname = s.host, n.secure = s.protocol === "https" || s.protocol === "wss", n.port = s.port, s.query && (n.query = s.query);
    } else n.host && (n.hostname = Qo(n.host).host);
    Zi(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((s) => {
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
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = ym(this.opts.query)), ea && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, _i.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
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
    n.EIO = Ku, n.transport = t, this.id && (n.sid = this.id);
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
    const t = this.opts.rememberUpgrade && Qn.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
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
    this.readyState = "open", Qn.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
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
      if (r && (n += gm(r)), s > 0 && n > this._maxPayload)
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
    return t && (this._pingTimeoutTime = 0, Xi(() => {
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
    if (Qn.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
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
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), ea && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const s = _i.indexOf(this._offlineEventListener);
        s !== -1 && _i.splice(s, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", t, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
Qn.protocol = Ku;
class Pm extends Qn {
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
    Qn.priorWebsocketSuccess = !1;
    const r = () => {
      s || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (b) => {
        if (!s)
          if (b.type === "pong" && b.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", n), !n)
              return;
            Qn.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
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
    function d(b) {
      n && b.name !== n.name && i();
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
let Mm = class extends Pm {
  constructor(t, n = {}) {
    const s = typeof t == "object", r = s ? { ...t } : { ...n };
    (!r.transports || r.transports && typeof r.transports[0] == "string") && (r.transports = (r.transports || ["polling", "websocket", "webtransport"]).map((i) => Rm[i]).filter((i) => !!i)), super(s ? r : t, r);
  }
};
function Dm(e, t = "", n) {
  let s = e;
  n = n || typeof location < "u" && location, e == null && (e = n.protocol + "//" + n.host), typeof e == "string" && (e.charAt(0) === "/" && (e.charAt(1) === "/" ? e = n.protocol + e : e = n.host + e), /^(https?|wss?):\/\//.test(e) || (typeof n < "u" ? e = n.protocol + "//" + e : e = "https://" + e), s = Qo(e)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
  const i = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return s.id = s.protocol + "://" + i + ":" + s.port + t, s.href = s.protocol + "://" + i + (n && n.port === s.port ? "" : ":" + s.port), s;
}
const Fm = typeof ArrayBuffer == "function", $m = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer, Qu = Object.prototype.toString, Bm = typeof Blob == "function" || typeof Blob < "u" && Qu.call(Blob) === "[object BlobConstructor]", Um = typeof File == "function" || typeof File < "u" && Qu.call(File) === "[object FileConstructor]";
function Pa(e) {
  return Fm && (e instanceof ArrayBuffer || $m(e)) || Bm && e instanceof Blob || Um && e instanceof File;
}
function yi(e, t) {
  if (!e || typeof e != "object")
    return !1;
  if (Array.isArray(e)) {
    for (let n = 0, s = e.length; n < s; n++)
      if (yi(e[n]))
        return !0;
    return !1;
  }
  if (Pa(e))
    return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return yi(e.toJSON(), !0);
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && yi(e[n]))
      return !0;
  return !1;
}
function zm(e) {
  const t = [], n = e.data, s = e;
  return s.data = vi(n, t), s.attachments = t.length, { packet: s, buffers: t };
}
function vi(e, t, n) {
  if (!e)
    return e;
  if (Pa(e)) {
    const s = { _placeholder: !0, num: t.length };
    return t.push(e), s;
  } else if (Array.isArray(e)) {
    const s = new Array(e.length);
    for (let r = 0; r < e.length; r++)
      s[r] = vi(e[r], t);
    return s;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    if (e.toJSON && typeof e.toJSON == "function" && !n)
      return vi(e.toJSON(), t, !0);
    const s = {};
    for (const r in e)
      Object.prototype.hasOwnProperty.call(e, r) && (s[r] = vi(e[r], t));
    return s;
  }
  return e;
}
function Hm(e, t) {
  return e.data = ta(e.data, t), delete e.attachments, e;
}
function ta(e, t) {
  if (!e)
    return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == "number" && e.num >= 0 && e.num < t.length)
      return t[e.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(e))
    for (let n = 0; n < e.length; n++)
      e[n] = ta(e[n], t);
  else if (typeof e == "object")
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (e[n] = ta(e[n], t));
  return e;
}
const Wm = [
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
class qm {
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
    return (t.type === Ne.EVENT || t.type === Ne.ACK) && yi(t) ? this.encodeAsBinary({
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
    const n = zm(t), s = this.encodeAsString(n.packet), r = n.buffers;
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
      s || n.type === Ne.BINARY_ACK ? (n.type = s ? Ne.EVENT : Ne.ACK, this.reconstructor = new jm(n)) : super.emitReserved("decoded", n);
    } else if (Pa(t) || t.base64)
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
      if (!Vm(a) || a < 1)
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
        return cc(n);
      case Ne.DISCONNECT:
        return n === void 0;
      case Ne.CONNECT_ERROR:
        return typeof n == "string" || cc(n);
      case Ne.EVENT:
      case Ne.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && Wm.indexOf(n[0]) === -1);
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
class jm {
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
      const n = Hm(this.reconPack, this.buffers);
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
const Vm = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
};
function cc(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
const Km = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Ma,
  Encoder: qm,
  get PacketType() {
    return Ne;
  }
}, Symbol.toStringTag, { value: "Module" }));
function cn(e, t, n) {
  return e.on(t, n), function() {
    e.off(t, n);
  };
}
const Gm = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class ef extends mt {
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
      cn(t, "open", this.onopen.bind(this)),
      cn(t, "packet", this.onpacket.bind(this)),
      cn(t, "error", this.onerror.bind(this)),
      cn(t, "close", this.onclose.bind(this))
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
    if (Gm.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (n.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const o = {
      type: Ne.EVENT,
      data: n
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
      const c = this.ids++, b = n.pop();
      this._registerAckCallback(c, b), o.id = c;
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
class na extends mt {
  constructor(t, n) {
    var s;
    super(), this.nsps = {}, this.subs = [], t && typeof t == "object" && (n = t, t = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, Zi(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5), this.backoff = new Gs({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = t;
    const r = n.parser || Km;
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
    this.engine = new Mm(this.uri, this.opts);
    const n = this.engine, s = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const r = cn(n, "open", function() {
      s.onopen(), t && t();
    }), i = (a) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", a), t ? t(a) : this.maybeReconnectOnOpen();
    }, o = cn(n, "error", i);
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
      cn(t, "ping", this.onping.bind(this)),
      cn(t, "data", this.ondata.bind(this)),
      cn(t, "error", this.onerror.bind(this)),
      cn(t, "close", this.onclose.bind(this)),
      // @ts-ignore
      cn(this.decoder, "decoded", this.ondecoded.bind(this))
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
    Xi(() => {
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
    return s ? this._autoConnect && !s.active && s.connect() : (s = new ef(this, t, n), this.nsps[t] = s), s;
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
function bi(e, t) {
  typeof e == "object" && (t = e, e = void 0), t = t || {};
  const n = Dm(e, t.path || "/socket.io"), s = n.source, r = n.id, i = n.path, o = vr[r] && i in vr[r].nsps, a = t.forceNew || t["force new connection"] || t.multiplex === !1 || o;
  let l;
  return a ? l = new na(s, t) : (vr[r] || (vr[r] = new na(s, t)), l = vr[r]), n.query && !t.query && (t.query = n.queryKey), l.socket(n.path, t);
}
Object.assign(bi, {
  Manager: na,
  Socket: ef,
  io: bi,
  connect: bi
});
const Ym = 5e3;
function Xm() {
  const e = ce([]), t = ce(!1), n = ce(""), s = ce(!1), r = ce(!1), i = ce(!1), o = ce("connecting"), a = ce(0), l = 5, d = ce({}), c = ce(null), b = ce("");
  let w = null;
  const z = 6e4, B = () => {
    t.value = !1, w && (clearTimeout(w), w = null);
  }, V = () => {
    t.value = !0, w && clearTimeout(w), w = setTimeout(B, z);
  };
  let M = null;
  const te = 1e3, fe = 15e3;
  let he = null;
  const S = /* @__PURE__ */ new Set(["ai_config_missing", "customer_required"]);
  let I = !1;
  const Y = ce(null), Z = () => {
    he && (clearTimeout(he), he = null);
  }, xe = () => {
    if (he || I) return;
    const E = Math.min(
      te * 2 ** Math.max(0, a.value - 1),
      fe
    );
    he = setTimeout(() => {
      he = null, M == null || M.connect();
    }, E);
  };
  let Oe = null, _e = null, Me = null, be = null, je = null, Ve, ot, ue;
  const ye = (E) => {
    var O;
    return (O = gi(E ?? null)) == null ? void 0 : O.sub;
  }, me = (E) => {
    Ve = E, E && M != null && M.connected && M.emit("refresh_token", { conversation_token: E });
  }, nt = (E) => {
    ot = E;
  }, Ke = () => {
    var K;
    const E = Ve || (Zo() ? null : Mi().read()), O = {};
    E && (O.conversation_token = E), ot && (O.widget_id = ot);
    try {
      O.page_url = Kg() || (window.parent !== window && ((K = window.parent.location) != null && K.href) ? window.parent.location.href : document.referrer || window.location.href);
    } catch {
      O.page_url = document.referrer || "";
    }
    return O;
  }, Ae = (E) => (M = bi(`${xs.WS_URL}/widget`, {
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
    auth: (O) => O(Ke())
  }), M.on("connect", () => {
    ue = ye(Ke().conversation_token), o.value = "connected", Z(), a.value = 0;
  }), M.on("bot_typing", () => {
    V();
  }), M.on("disconnect", () => {
    B(), o.value === "connected" && (console.log("Socket disconnected, setting connection status to connecting"), o.value = "connecting");
  }), M.on("connect_error", (O) => {
    var J;
    const K = (J = O == null ? void 0 : O.data) == null ? void 0 : J.type;
    if (K && S.has(K)) {
      I = !0, Y.value = K, Z(), o.value = "failed", K !== "customer_required" && Ct(O.data);
      return;
    }
    a.value++, console.error("Socket connection failed, attempt:", a.value), a.value >= l && (o.value = "failed"), M && !M.active && xe();
  }), M.on("chat_response", (O) => {
    if (B(), O.session_id ? (console.log("Captured session_id from chat_response:", O.session_id), b.value = O.session_id) : console.warn("No session_id in chat_response data:", O), O.type === "agent_message") {
      const K = {
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
      O.attachments && Array.isArray(O.attachments) && (K.id = O.message_id, K.attachments = O.attachments.map((J, ae) => ({
        id: O.message_id * 1e3 + ae,
        filename: J.filename,
        file_url: J.file_url,
        content_type: J.content_type,
        file_size: J.file_size
      }))), e.value.push(K);
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
  }), M.on("handle_taken_over", (O) => {
    e.value.push({
      message: `${O.user_name} joined the conversation`,
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: O.session_id
    }), d.value = {
      ...d.value,
      human_agent_name: O.user_name,
      human_agent_profile_pic: O.profile_picture
    }, B(), Oe && Oe(O);
  }), M.on("session_initialized", (O) => {
    O.session_id && (b.value = O.session_id, je = {
      session_id: O.session_id,
      authenticated: !!O.authenticated,
      created: !!O.created
    }, be == null || be(je));
  }), M.on("error", Ct), M.on("chat_history", Rt), M.on("rating_submitted", Mt), M.on("display_form", Yt), M.on("form_submitted", m), M.on("workflow_state", y), M.on("workflow_proceeded", R), M), Ze = async () => {
    try {
      return M != null && M.connected && ue && ue === ye(Ke().conversation_token) ? (o.value = "connected", !0) : (o.value = "connecting", a.value = 0, B(), Z(), I = !1, Y.value = null, M && (M.removeAllListeners(), M.disconnect(), M = null), M = Ae(""), new Promise((E) => {
        M == null || M.on("connect", () => {
          E(!0);
        }), M == null || M.on("connect_error", () => {
          (I || a.value >= l) && E(!1);
        });
      }));
    } catch (E) {
      return console.error("Socket initialization failed:", E), o.value = "failed", !1;
    }
  }, st = () => (M && M.disconnect(), Ze()), At = (E) => {
    Oe = E;
  }, Re = (E) => {
    be = E, je && E(je);
  }, vt = (E) => {
    _e = E;
  }, gt = (E) => {
    Me = E;
  }, Ct = (E) => {
    B(), n.value = Ud(E), s.value = !0, setTimeout(() => {
      s.value = !1, n.value = "";
    }, 5e3);
  }, Rt = (E) => {
    if (E.type === "chat_history" && Array.isArray(E.messages)) {
      const O = E.messages.map((K) => {
        var ae, we;
        const J = {
          message: K.message,
          message_type: K.message_type,
          created_at: K.created_at,
          session_id: "",
          agent_name: K.agent_name || "",
          user_name: K.user_name || "",
          attributes: K.attributes || {},
          attachments: K.attachments || []
          // Include attachments
        };
        return Array.isArray((ae = K.attributes) == null ? void 0 : ae.sources) && K.attributes.sources.length && (J.sources = K.attributes.sources), (we = K.attributes) != null && we.shopify_output && typeof K.attributes.shopify_output == "object" ? {
          ...J,
          message_type: "product",
          shopify_output: K.attributes.shopify_output
        } : J;
      });
      e.value = [
        ...O.filter(
          (K) => !e.value.some(
            (J) => J.message === K.message && J.created_at === K.created_at
          )
        ),
        ...e.value
      ];
    }
  }, Mt = (E) => {
    E.success && e.value.push({
      message: "Thank you for your feedback!",
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    });
  }, Yt = (E) => {
    var O;
    console.log("Form display handler in composable:", E), B(), c.value = E.form_data, console.log("Set currentForm in handleDisplayForm:", c.value), ((O = E.form_data) == null ? void 0 : O.form_full_screen) === !0 ? (console.log("Full screen form detected, triggering workflow state callback"), _e && _e({
      type: "form",
      form_data: E.form_data,
      session_id: E.session_id
    })) : e.value.push({
      message: "",
      message_type: "form",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: E.session_id,
      attributes: {
        form_data: E.form_data
      }
    });
  }, m = (E) => {
    console.log("Form submitted confirmation received, clearing currentForm"), c.value = null, E.success && console.log("Form submitted successfully");
  }, y = (E) => {
    console.log("Workflow state received in composable:", E), (E.type === "form" || E.type === "display_form") && (console.log("Setting currentForm from workflow state:", E.form_data), c.value = E.form_data), _e && _e(E);
  }, R = (E) => {
    console.log("Workflow proceeded in composable:", E), Me && Me(E);
  }, N = async (E, O) => {
    !M || !E || M.emit("submit_rating", {
      rating: E,
      feedback: O
    });
  }, F = async (E) => {
    var J;
    if (console.log("Submitting form in socket:", E), console.log("Current form in socket:", c.value), console.log("Socket in socket:", M), !M) {
      console.error("No socket available for form submission");
      return;
    }
    if (!E || Object.keys(E).length === 0) {
      console.error("No form data to submit");
      return;
    }
    const K = ((J = c.value) == null ? void 0 : J.form_type) === "contact" ? "submit_contact_info" : "submit_form";
    console.log(`Emitting ${K} event with data:`, E), M.emit(K, {
      form_data: E
    }), c.value = null;
  }, L = async () => {
    M && (console.log("Getting workflow state 12"), M.emit("get_workflow_state"));
  }, G = async () => {
    M && M.emit("proceed_workflow", {});
  }, W = async (E, O, K = []) => {
    if (!M || !E.trim() && K.length === 0) return;
    const J = {
      message: E,
      message_type: "user",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    };
    K.length > 0 && (J.attachments = K.map((ae, we) => {
      let Ee = "";
      if (ae.content_type.startsWith("image/")) {
        const Pe = atob(ae.content), h = new Array(Pe.length);
        for (let T = 0; T < Pe.length; T++)
          h[T] = Pe.charCodeAt(T);
        const _ = new Uint8Array(h), P = new Blob([_], { type: ae.content_type });
        Ee = URL.createObjectURL(P);
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
    })), e.value.push(J), M.emit("chat", {
      message: E,
      email: O,
      files: K
      // Send files with base64 content
    }), i.value = !0;
  }, q = () => {
    e.value = [], i.value = !1, b.value = "", B(), c.value = null;
  };
  return {
    messages: e,
    loading: t,
    errorMessage: n,
    showError: s,
    loadingHistory: r,
    hasStartedChat: i,
    connectionStatus: o,
    sendMessage: W,
    endChat: (E = "CUSTOMER_REQUEST") => new Promise((O) => {
      if (!M || !M.connected) {
        O(!1);
        return;
      }
      let K = !1;
      const J = (Pe) => {
        K || (K = !0, clearTimeout(Ee), M == null || M.off("chat_ended", ae), M == null || M.off("error", we), Pe && q(), O(Pe));
      }, ae = () => J(!0), we = (Pe) => {
        (Pe == null ? void 0 : Pe.type) === "end_chat_error" && J(!1);
      }, Ee = setTimeout(() => J(!1), Ym);
      M.on("chat_ended", ae), M.on("error", we), M.emit("end_chat", { reason: E });
    }),
    loadChatHistory: async () => {
      if (M)
        try {
          r.value = !0, M.emit("get_chat_history");
        } catch (E) {
          console.error("Failed to load chat history:", E);
        } finally {
          r.value = !1;
        }
    },
    connect: Ze,
    reconnect: st,
    cleanup: () => {
      B(), Z(), M && (M.removeAllListeners(), M.disconnect(), M = null), Oe = null, _e = null, Me = null;
    },
    humanAgent: d,
    onTakeover: At,
    onSessionState: Re,
    refusal: Y,
    submitRating: N,
    currentForm: c,
    submitForm: F,
    getWorkflowState: L,
    proceedWorkflow: G,
    onWorkflowState: vt,
    onWorkflowProceeded: gt,
    currentSessionId: b,
    setToken: me,
    setWidgetId: nt
  };
}
function Zm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Oo = { exports: {} }, uc;
function Jm() {
  return uc || (uc = 1, function(e) {
    (function() {
      function t(h, _, P) {
        return h.call.apply(h.bind, arguments);
      }
      function n(h, _, P) {
        if (!h) throw Error();
        if (2 < arguments.length) {
          var T = Array.prototype.slice.call(arguments, 2);
          return function() {
            var H = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(H, T), h.apply(_, H);
          };
        }
        return function() {
          return h.apply(_, arguments);
        };
      }
      function s(h, _, P) {
        return s = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? t : n, s.apply(null, arguments);
      }
      var r = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function i(h, _) {
        this.a = h, this.o = _ || h, this.c = this.o.document;
      }
      var o = !!window.FontFace;
      function a(h, _, P, T) {
        if (_ = h.c.createElement(_), P) for (var H in P) P.hasOwnProperty(H) && (H == "style" ? _.style.cssText = P[H] : _.setAttribute(H, P[H]));
        return T && _.appendChild(h.c.createTextNode(T)), _;
      }
      function l(h, _, P) {
        h = h.c.getElementsByTagName(_)[0], h || (h = document.documentElement), h.insertBefore(P, h.lastChild);
      }
      function d(h) {
        h.parentNode && h.parentNode.removeChild(h);
      }
      function c(h, _, P) {
        _ = _ || [], P = P || [];
        for (var T = h.className.split(/\s+/), H = 0; H < _.length; H += 1) {
          for (var se = !1, ee = 0; ee < T.length; ee += 1) if (_[H] === T[ee]) {
            se = !0;
            break;
          }
          se || T.push(_[H]);
        }
        for (_ = [], H = 0; H < T.length; H += 1) {
          for (se = !1, ee = 0; ee < P.length; ee += 1) if (T[H] === P[ee]) {
            se = !0;
            break;
          }
          se || _.push(T[H]);
        }
        h.className = _.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function b(h, _) {
        for (var P = h.className.split(/\s+/), T = 0, H = P.length; T < H; T++) if (P[T] == _) return !0;
        return !1;
      }
      function w(h) {
        return h.o.location.hostname || h.a.location.hostname;
      }
      function z(h, _, P) {
        function T() {
          Ie && H && se && (Ie(ee), Ie = null);
        }
        _ = a(h, "link", { rel: "stylesheet", href: _, media: "all" });
        var H = !1, se = !0, ee = null, Ie = P || null;
        o ? (_.onload = function() {
          H = !0, T();
        }, _.onerror = function() {
          H = !0, ee = Error("Stylesheet failed to load"), T();
        }) : setTimeout(function() {
          H = !0, T();
        }, 0), l(h, "head", _);
      }
      function B(h, _, P, T) {
        var H = h.c.getElementsByTagName("head")[0];
        if (H) {
          var se = a(h, "script", { src: _ }), ee = !1;
          return se.onload = se.onreadystatechange = function() {
            ee || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (ee = !0, P && P(null), se.onload = se.onreadystatechange = null, se.parentNode.tagName == "HEAD" && H.removeChild(se));
          }, H.appendChild(se), setTimeout(function() {
            ee || (ee = !0, P && P(Error("Script load timeout")));
          }, T || 5e3), se;
        }
        return null;
      }
      function V() {
        this.a = 0, this.c = null;
      }
      function M(h) {
        return h.a++, function() {
          h.a--, fe(h);
        };
      }
      function te(h, _) {
        h.c = _, fe(h);
      }
      function fe(h) {
        h.a == 0 && h.c && (h.c(), h.c = null);
      }
      function he(h) {
        this.a = h || "-";
      }
      he.prototype.c = function(h) {
        for (var _ = [], P = 0; P < arguments.length; P++) _.push(arguments[P].replace(/[\W_]+/g, "").toLowerCase());
        return _.join(this.a);
      };
      function S(h, _) {
        this.c = h, this.f = 4, this.a = "n";
        var P = (_ || "n4").match(/^([nio])([1-9])$/i);
        P && (this.a = P[1], this.f = parseInt(P[2], 10));
      }
      function I(h) {
        return xe(h) + " " + (h.f + "00") + " 300px " + Y(h.c);
      }
      function Y(h) {
        var _ = [];
        h = h.split(/,\s*/);
        for (var P = 0; P < h.length; P++) {
          var T = h[P].replace(/['"]/g, "");
          T.indexOf(" ") != -1 || /^\d/.test(T) ? _.push("'" + T + "'") : _.push(T);
        }
        return _.join(",");
      }
      function Z(h) {
        return h.a + h.f;
      }
      function xe(h) {
        var _ = "normal";
        return h.a === "o" ? _ = "oblique" : h.a === "i" && (_ = "italic"), _;
      }
      function Oe(h) {
        var _ = 4, P = "n", T = null;
        return h && ((T = h.match(/(normal|oblique|italic)/i)) && T[1] && (P = T[1].substr(0, 1).toLowerCase()), (T = h.match(/([1-9]00|normal|bold)/i)) && T[1] && (/bold/i.test(T[1]) ? _ = 7 : /[1-9]00/.test(T[1]) && (_ = parseInt(T[1].substr(0, 1), 10)))), P + _;
      }
      function _e(h, _) {
        this.c = h, this.f = h.o.document.documentElement, this.h = _, this.a = new he("-"), this.j = _.events !== !1, this.g = _.classes !== !1;
      }
      function Me(h) {
        h.g && c(h.f, [h.a.c("wf", "loading")]), je(h, "loading");
      }
      function be(h) {
        if (h.g) {
          var _ = b(h.f, h.a.c("wf", "active")), P = [], T = [h.a.c("wf", "loading")];
          _ || P.push(h.a.c("wf", "inactive")), c(h.f, P, T);
        }
        je(h, "inactive");
      }
      function je(h, _, P) {
        h.j && h.h[_] && (P ? h.h[_](P.c, Z(P)) : h.h[_]());
      }
      function Ve() {
        this.c = {};
      }
      function ot(h, _, P) {
        var T = [], H;
        for (H in _) if (_.hasOwnProperty(H)) {
          var se = h.c[H];
          se && T.push(se(_[H], P));
        }
        return T;
      }
      function ue(h, _) {
        this.c = h, this.f = _, this.a = a(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function ye(h) {
        l(h.c, "body", h.a);
      }
      function me(h) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + Y(h.c) + ";" + ("font-style:" + xe(h) + ";font-weight:" + (h.f + "00") + ";");
      }
      function nt(h, _, P, T, H, se) {
        this.g = h, this.j = _, this.a = T, this.c = P, this.f = H || 3e3, this.h = se || void 0;
      }
      nt.prototype.start = function() {
        var h = this.c.o.document, _ = this, P = r(), T = new Promise(function(ee, Ie) {
          function Le() {
            r() - P >= _.f ? Ie() : h.fonts.load(I(_.a), _.h).then(function(Ce) {
              1 <= Ce.length ? ee() : setTimeout(Le, 25);
            }, function() {
              Ie();
            });
          }
          Le();
        }), H = null, se = new Promise(function(ee, Ie) {
          H = setTimeout(Ie, _.f);
        });
        Promise.race([se, T]).then(function() {
          H && (clearTimeout(H), H = null), _.g(_.a);
        }, function() {
          _.j(_.a);
        });
      };
      function Ke(h, _, P, T, H, se, ee) {
        this.v = h, this.B = _, this.c = P, this.a = T, this.s = ee || "BESbswy", this.f = {}, this.w = H || 3e3, this.u = se || null, this.m = this.j = this.h = this.g = null, this.g = new ue(this.c, this.s), this.h = new ue(this.c, this.s), this.j = new ue(this.c, this.s), this.m = new ue(this.c, this.s), h = new S(this.a.c + ",serif", Z(this.a)), h = me(h), this.g.a.style.cssText = h, h = new S(this.a.c + ",sans-serif", Z(this.a)), h = me(h), this.h.a.style.cssText = h, h = new S("serif", Z(this.a)), h = me(h), this.j.a.style.cssText = h, h = new S("sans-serif", Z(this.a)), h = me(h), this.m.a.style.cssText = h, ye(this.g), ye(this.h), ye(this.j), ye(this.m);
      }
      var Ae = { D: "serif", C: "sans-serif" }, Ze = null;
      function st() {
        if (Ze === null) {
          var h = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          Ze = !!h && (536 > parseInt(h[1], 10) || parseInt(h[1], 10) === 536 && 11 >= parseInt(h[2], 10));
        }
        return Ze;
      }
      Ke.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = r(), Re(this);
      };
      function At(h, _, P) {
        for (var T in Ae) if (Ae.hasOwnProperty(T) && _ === h.f[Ae[T]] && P === h.f[Ae[T]]) return !0;
        return !1;
      }
      function Re(h) {
        var _ = h.g.a.offsetWidth, P = h.h.a.offsetWidth, T;
        (T = _ === h.f.serif && P === h.f["sans-serif"]) || (T = st() && At(h, _, P)), T ? r() - h.A >= h.w ? st() && At(h, _, P) && (h.u === null || h.u.hasOwnProperty(h.a.c)) ? gt(h, h.v) : gt(h, h.B) : vt(h) : gt(h, h.v);
      }
      function vt(h) {
        setTimeout(s(function() {
          Re(this);
        }, h), 50);
      }
      function gt(h, _) {
        setTimeout(s(function() {
          d(this.g.a), d(this.h.a), d(this.j.a), d(this.m.a), _(this.a);
        }, h), 0);
      }
      function Ct(h, _, P) {
        this.c = h, this.a = _, this.f = 0, this.m = this.j = !1, this.s = P;
      }
      var Rt = null;
      Ct.prototype.g = function(h) {
        var _ = this.a;
        _.g && c(_.f, [_.a.c("wf", h.c, Z(h).toString(), "active")], [_.a.c("wf", h.c, Z(h).toString(), "loading"), _.a.c("wf", h.c, Z(h).toString(), "inactive")]), je(_, "fontactive", h), this.m = !0, Mt(this);
      }, Ct.prototype.h = function(h) {
        var _ = this.a;
        if (_.g) {
          var P = b(_.f, _.a.c("wf", h.c, Z(h).toString(), "active")), T = [], H = [_.a.c("wf", h.c, Z(h).toString(), "loading")];
          P || T.push(_.a.c("wf", h.c, Z(h).toString(), "inactive")), c(_.f, T, H);
        }
        je(_, "fontinactive", h), Mt(this);
      };
      function Mt(h) {
        --h.f == 0 && h.j && (h.m ? (h = h.a, h.g && c(h.f, [h.a.c("wf", "active")], [h.a.c("wf", "loading"), h.a.c("wf", "inactive")]), je(h, "active")) : be(h.a));
      }
      function Yt(h) {
        this.j = h, this.a = new Ve(), this.h = 0, this.f = this.g = !0;
      }
      Yt.prototype.load = function(h) {
        this.c = new i(this.j, h.context || this.j), this.g = h.events !== !1, this.f = h.classes !== !1, y(this, new _e(this.c, h), h);
      };
      function m(h, _, P, T, H) {
        var se = --h.h == 0;
        (h.f || h.g) && setTimeout(function() {
          var ee = H || null, Ie = T || null || {};
          if (P.length === 0 && se) be(_.a);
          else {
            _.f += P.length, se && (_.j = se);
            var Le, Ce = [];
            for (Le = 0; Le < P.length; Le++) {
              var Fe = P[Le], Ge = Ie[Fe.c], kt = _.a, an = Fe;
              if (kt.g && c(kt.f, [kt.a.c("wf", an.c, Z(an).toString(), "loading")]), je(kt, "fontloading", an), kt = null, Rt === null) if (window.FontFace) {
                var an = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), kn = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                Rt = an ? 42 < parseInt(an[1], 10) : !kn;
              } else Rt = !1;
              Rt ? kt = new nt(s(_.g, _), s(_.h, _), _.c, Fe, _.s, Ge) : kt = new Ke(s(_.g, _), s(_.h, _), _.c, Fe, _.s, ee, Ge), Ce.push(kt);
            }
            for (Le = 0; Le < Ce.length; Le++) Ce[Le].start();
          }
        }, 0);
      }
      function y(h, _, P) {
        var H = [], T = P.timeout;
        Me(_);
        var H = ot(h.a, P, h.c), se = new Ct(h.c, _, T);
        for (h.h = H.length, _ = 0, P = H.length; _ < P; _++) H[_].load(function(ee, Ie, Le) {
          m(h, se, ee, Ie, Le);
        });
      }
      function R(h, _) {
        this.c = h, this.a = _;
      }
      R.prototype.load = function(h) {
        function _() {
          if (se["__mti_fntLst" + T]) {
            var ee = se["__mti_fntLst" + T](), Ie = [], Le;
            if (ee) for (var Ce = 0; Ce < ee.length; Ce++) {
              var Fe = ee[Ce].fontfamily;
              ee[Ce].fontStyle != null && ee[Ce].fontWeight != null ? (Le = ee[Ce].fontStyle + ee[Ce].fontWeight, Ie.push(new S(Fe, Le))) : Ie.push(new S(Fe));
            }
            h(Ie);
          } else setTimeout(function() {
            _();
          }, 50);
        }
        var P = this, T = P.a.projectId, H = P.a.version;
        if (T) {
          var se = P.c.o;
          B(this.c, (P.a.api || "https://fast.fonts.net/jsapi") + "/" + T + ".js" + (H ? "?v=" + H : ""), function(ee) {
            ee ? h([]) : (se["__MonotypeConfiguration__" + T] = function() {
              return P.a;
            }, _());
          }).id = "__MonotypeAPIScript__" + T;
        } else h([]);
      };
      function N(h, _) {
        this.c = h, this.a = _;
      }
      N.prototype.load = function(h) {
        var _, P, T = this.a.urls || [], H = this.a.families || [], se = this.a.testStrings || {}, ee = new V();
        for (_ = 0, P = T.length; _ < P; _++) z(this.c, T[_], M(ee));
        var Ie = [];
        for (_ = 0, P = H.length; _ < P; _++) if (T = H[_].split(":"), T[1]) for (var Le = T[1].split(","), Ce = 0; Ce < Le.length; Ce += 1) Ie.push(new S(T[0], Le[Ce]));
        else Ie.push(new S(T[0]));
        te(ee, function() {
          h(Ie, se);
        });
      };
      function F(h, _) {
        h ? this.c = h : this.c = L, this.a = [], this.f = [], this.g = _ || "";
      }
      var L = "https://fonts.googleapis.com/css";
      function G(h, _) {
        for (var P = _.length, T = 0; T < P; T++) {
          var H = _[T].split(":");
          H.length == 3 && h.f.push(H.pop());
          var se = "";
          H.length == 2 && H[1] != "" && (se = ":"), h.a.push(H.join(se));
        }
      }
      function W(h) {
        if (h.a.length == 0) throw Error("No fonts to load!");
        if (h.c.indexOf("kit=") != -1) return h.c;
        for (var _ = h.a.length, P = [], T = 0; T < _; T++) P.push(h.a[T].replace(/ /g, "+"));
        return _ = h.c + "?family=" + P.join("%7C"), 0 < h.f.length && (_ += "&subset=" + h.f.join(",")), 0 < h.g.length && (_ += "&text=" + encodeURIComponent(h.g)), _;
      }
      function q(h) {
        this.f = h, this.a = [], this.c = {};
      }
      var $ = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, ne = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, X = { i: "i", italic: "i", n: "n", normal: "n" }, E = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function O(h) {
        for (var _ = h.f.length, P = 0; P < _; P++) {
          var T = h.f[P].split(":"), H = T[0].replace(/\+/g, " "), se = ["n4"];
          if (2 <= T.length) {
            var ee, Ie = T[1];
            if (ee = [], Ie) for (var Ie = Ie.split(","), Le = Ie.length, Ce = 0; Ce < Le; Ce++) {
              var Fe;
              if (Fe = Ie[Ce], Fe.match(/^[\w-]+$/)) {
                var Ge = E.exec(Fe.toLowerCase());
                if (Ge == null) Fe = "";
                else {
                  if (Fe = Ge[2], Fe = Fe == null || Fe == "" ? "n" : X[Fe], Ge = Ge[1], Ge == null || Ge == "") Ge = "4";
                  else var kt = ne[Ge], Ge = kt || (isNaN(Ge) ? "4" : Ge.substr(0, 1));
                  Fe = [Fe, Ge].join("");
                }
              } else Fe = "";
              Fe && ee.push(Fe);
            }
            0 < ee.length && (se = ee), T.length == 3 && (T = T[2], ee = [], T = T ? T.split(",") : ee, 0 < T.length && (T = $[T[0]]) && (h.c[H] = T));
          }
          for (h.c[H] || (T = $[H]) && (h.c[H] = T), T = 0; T < se.length; T += 1) h.a.push(new S(H, se[T]));
        }
      }
      function K(h, _) {
        this.c = h, this.a = _;
      }
      var J = { Arimo: !0, Cousine: !0, Tinos: !0 };
      K.prototype.load = function(h) {
        var _ = new V(), P = this.c, T = new F(this.a.api, this.a.text), H = this.a.families;
        G(T, H);
        var se = new q(H);
        O(se), z(P, W(T), M(_)), te(_, function() {
          h(se.a, se.c, J);
        });
      };
      function ae(h, _) {
        this.c = h, this.a = _;
      }
      ae.prototype.load = function(h) {
        var _ = this.a.id, P = this.c.o;
        _ ? B(this.c, (this.a.api || "https://use.typekit.net") + "/" + _ + ".js", function(T) {
          if (T) h([]);
          else if (P.Typekit && P.Typekit.config && P.Typekit.config.fn) {
            T = P.Typekit.config.fn;
            for (var H = [], se = 0; se < T.length; se += 2) for (var ee = T[se], Ie = T[se + 1], Le = 0; Le < Ie.length; Le++) H.push(new S(ee, Ie[Le]));
            try {
              P.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            h(H);
          }
        }, 2e3) : h([]);
      };
      function we(h, _) {
        this.c = h, this.f = _, this.a = [];
      }
      we.prototype.load = function(h) {
        var _ = this.f.id, P = this.c.o, T = this;
        _ ? (P.__webfontfontdeckmodule__ || (P.__webfontfontdeckmodule__ = {}), P.__webfontfontdeckmodule__[_] = function(H, se) {
          for (var ee = 0, Ie = se.fonts.length; ee < Ie; ++ee) {
            var Le = se.fonts[ee];
            T.a.push(new S(Le.name, Oe("font-weight:" + Le.weight + ";font-style:" + Le.style)));
          }
          h(T.a);
        }, B(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + w(this.c) + "/" + _ + ".js", function(H) {
          H && h([]);
        })) : h([]);
      };
      var Ee = new Yt(window);
      Ee.a.c.custom = function(h, _) {
        return new N(_, h);
      }, Ee.a.c.fontdeck = function(h, _) {
        return new we(_, h);
      }, Ee.a.c.monotype = function(h, _) {
        return new R(_, h);
      }, Ee.a.c.typekit = function(h, _) {
        return new ae(_, h);
      }, Ee.a.c.google = function(h, _) {
        return new K(_, h);
      };
      var Pe = { load: s(Ee.load, Ee) };
      e.exports ? e.exports = Pe : (window.WebFont = Pe, window.WebFontConfig && Ee.load(window.WebFontConfig));
    })();
  }(Oo)), Oo.exports;
}
var Qm = Jm();
const e_ = /* @__PURE__ */ Zm(Qm), fc = [
  "Space Grotesk:400,500,600,700",
  "Instrument Sans:400,500,600",
  "JetBrains Mono:400,500,600"
], t_ = (e) => {
  const t = [...fc], n = (e == null ? void 0 : e.split(",")[0].trim().replace(/['"]/g, "")) || "", s = fc.some(
    (r) => r.toLowerCase().startsWith(n.toLowerCase())
  );
  n && !s && t.push(n), e_.load({
    google: { families: t },
    active: () => {
      if (!e) return;
      const r = document.querySelector(".chat-container");
      r && (r.style.fontFamily = e.includes(",") ? e : `"${e}", system-ui, sans-serif`);
    }
  });
};
function n_() {
  const e = ce({}), t = ce(""), n = (r) => {
    var i;
    e.value = r, r.photo_url && (e.value.photo_url = r.photo_url), t_(r.font_family), Ft({
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
const s_ = 13, r_ = 24;
function i_(e, t) {
  const n = zi({}), s = [];
  let r = null;
  const i = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, o = (c) => {
    r || s.length === 0 || (r = setTimeout(a, c));
  }, a = () => {
    r = null;
    const c = s[0];
    if (c === void 0) return;
    const b = e.value[c], w = n[c], z = (b == null ? void 0 : b.message) ?? "";
    if (!w || !b) {
      s.shift(), o(0);
      return;
    }
    if (w.shown >= z.length) {
      w.done = !0, s.shift(), o(0);
      return;
    }
    w.shown += 1;
    const B = z[w.shown - 1];
    t == null || t(), o(B === " " ? r_ : s_);
  };
  $t(() => e.value.length, (c, b) => {
    b !== void 0 && c < b && (Object.keys(n).forEach((w) => {
      delete n[Number(w)];
    }), s.length = 0);
    for (let w = b ?? 0; w < c; w++) {
      const z = e.value[w];
      if (!z || !z.stream || w in n) continue;
      const B = z.message ?? "";
      i || !B ? n[w] = { shown: B.length, done: !0 } : (n[w] = { shown: 0, done: !1 }, s.push(w));
    }
    o(0);
  });
  const l = (c, b) => {
    const w = n[c];
    return w ? b.slice(0, w.shown) : b;
  }, d = (c) => {
    const b = n[c];
    return !!b && !b.done;
  };
  return Br(() => {
    r && clearTimeout(r);
  }), { displayText: l, isStreaming: d };
}
function o_(e) {
  const t = ce(!0);
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
  }), qi(() => window.addEventListener("message", r)), Br(() => window.removeEventListener("message", r));
}
const a_ = {
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
}, l_ = {
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
}, c_ = {
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
}, u_ = {
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
}, f_ = {
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
}, wi = {
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
}, h_ = {
  GLASS: a_,
  AURORA: l_,
  TERMINAL: c_,
  CALM_MINT: u_,
  PLAYFUL: f_,
  SUNRISE: wi,
  CHATBOT: wi,
  ASK_ANYTHING: wi
}, d_ = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", hc = "'Instrument Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";
function p_(e) {
  return Math.max(4, Math.round(e * 0.3));
}
function dc(e) {
  const t = (e || "").replace("#", "");
  if (t.length < 6) return "#0B0C10";
  const n = parseInt(t.slice(0, 2), 16), s = parseInt(t.slice(2, 4), 16), r = parseInt(t.slice(4, 6), 16);
  return (0.299 * n + 0.587 * s + 0.114 * r) / 255 > 0.62 ? "#0B0C10" : "#FFFFFF";
}
function g_(e) {
  return h_[e || ""] || wi;
}
const m_ = "#212529";
function __(e, t) {
  const n = g_(e), s = (t == null ? void 0 : t.chat_background_color) || "", r = /^#[0-9a-fA-F]{6}$/.test(s), i = s || n.card, o = (t == null ? void 0 : t.chat_text_color) || "", l = /^#[0-9a-fA-F]{6}$/.test(o) && o.toLowerCase() !== m_ ? o : r ? qs(s) ? "#FFFFFF" : "#111111" : n.text, d = r ? qs(s) ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.62)" : n.muted, c = r ? Bd(s, 20) : n.agentBg, b = (t == null ? void 0 : t.accent_color) || n.accent, w = r ? !qs(s) : n.light, z = dc(b) === "#0B0C10", B = w === z ? d : b, V = n.mono ? d_ : t != null && t.font_family ? `${t.font_family}, ${hc}` : hc;
  return {
    "--cm-card": i,
    "--cm-text": l,
    "--cm-muted": d,
    "--cm-agent-bg": c,
    "--cm-accent": b,
    "--cm-on-accent": dc(b),
    "--cm-presence": B,
    "--cm-border": n.border,
    "--cm-glow": n.glow,
    "--cm-radius": `${n.radius}px`,
    "--cm-bubble": `${n.bubble}px`,
    "--cm-bubble-tail": `${p_(n.bubble)}px`,
    "--cm-field-radius": n.mono ? "7px" : "12px",
    "--cm-avatar-radius": n.mono ? "28%" : "50%",
    "--cm-hairline": n.light ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.08)",
    "--cm-body-font": V
  };
}
const pc = (e) => {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: e || "USD" }).resolvedOptions().maximumFractionDigits ?? 2;
  } catch {
    return 2;
  }
};
function y_() {
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
        minimumFractionDigits: pc(r),
        maximumFractionDigits: pc(r)
      }) : String(s);
      return i ? `${i}${a}` : a;
    },
    getCurrencySymbol: (s) => e[s] || s,
    currencySymbols: e
  };
}
const v_ = {
  key: 0,
  class: "widget-unavailable-overlay"
}, b_ = {
  key: 1,
  class: "auth-error-overlay"
}, w_ = { class: "auth-error-card" }, k_ = { class: "auth-error-message" }, T_ = {
  key: 0,
  class: "initializing-overlay"
}, x_ = {
  key: 0,
  class: "connecting-message"
}, A_ = {
  key: 1,
  class: "failed-message"
}, S_ = { class: "welcome-content" }, E_ = { class: "welcome-header" }, C_ = ["src", "alt"], R_ = { class: "welcome-title" }, I_ = { class: "welcome-subtitle" }, L_ = { class: "welcome-input-container" }, O_ = {
  key: 0,
  class: "email-input"
}, N_ = ["disabled"], P_ = { class: "welcome-message-input" }, M_ = ["placeholder", "disabled"], D_ = ["disabled"], F_ = {
  key: 0,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, $_ = {
  key: 1,
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, B_ = { class: "landing-page-content" }, U_ = { class: "landing-page-header" }, z_ = { class: "landing-page-heading" }, H_ = { class: "landing-page-text" }, W_ = { class: "landing-page-actions" }, q_ = { class: "form-fullscreen-content" }, j_ = {
  key: 0,
  class: "form-header"
}, V_ = {
  key: 0,
  class: "form-title"
}, K_ = {
  key: 1,
  class: "form-description"
}, G_ = { class: "form-fields" }, Y_ = ["for"], X_ = {
  key: 0,
  class: "required-indicator"
}, Z_ = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "autocomplete", "inputmode"], J_ = ["id", "placeholder", "required", "min", "max", "value", "onInput"], Q_ = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput"], ey = ["id", "required", "value", "onChange"], ty = { value: "" }, ny = ["value"], sy = {
  key: 4,
  class: "checkbox-field"
}, ry = ["id", "required", "checked", "onChange"], iy = { class: "checkbox-label" }, oy = {
  key: 5,
  class: "radio-group"
}, ay = ["name", "value", "required", "checked", "onChange"], ly = { class: "radio-label" }, cy = {
  key: 6,
  class: "field-error"
}, uy = { class: "form-actions" }, fy = ["disabled"], hy = {
  key: 0,
  class: "loading-spinner-inline"
}, dy = { key: 1 }, py = { class: "header-content" }, gy = ["src", "alt"], my = { class: "header-info" }, _y = { class: "status" }, yy = { class: "status-text cm-presence" }, vy = { class: "header-actions" }, by = ["disabled", "title", "aria-label", "aria-expanded"], wy = { class: "ask-anything-header" }, ky = ["src", "alt"], Ty = { class: "header-info" }, xy = {
  key: 2,
  class: "loading-history"
}, Ay = { class: "cm-email-gate-title" }, Sy = ["disabled"], Ey = {
  key: 0,
  class: "cm-email-gate-error"
}, Cy = ["disabled"], Ry = {
  key: 0,
  class: "cm-welcome-block"
}, Iy = { class: "message agent-message cm-welcome-row" }, Ly = ["src", "alt"], Oy = {
  key: 0,
  class: "cm-msg-avatar",
  "aria-hidden": "true"
}, Ny = ["src"], Py = ["src"], My = { class: "message-col" }, Dy = {
  key: 0,
  class: "rating-content"
}, Fy = { class: "rating-prompt" }, $y = ["onMouseover", "onMouseleave", "onClick", "disabled"], By = {
  key: 0,
  class: "feedback-wrapper"
}, Uy = { class: "feedback-section" }, zy = ["onUpdate:modelValue", "disabled"], Hy = { class: "feedback-counter" }, Wy = ["onClick", "disabled"], qy = {
  key: 1,
  class: "submitted-feedback-wrapper"
}, jy = { class: "submitted-feedback" }, Vy = { class: "submitted-feedback-text" }, Ky = {
  key: 2,
  class: "submitted-message"
}, Gy = {
  key: 1,
  class: "form-content"
}, Yy = {
  key: 0,
  class: "form-header"
}, Xy = {
  key: 0,
  class: "form-title"
}, Zy = {
  key: 1,
  class: "form-description"
}, Jy = { class: "form-fields" }, Qy = ["for"], ev = {
  key: 0,
  class: "required-indicator"
}, tv = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "disabled", "autocomplete", "inputmode"], nv = ["id", "placeholder", "required", "min", "max", "value", "onInput", "disabled"], sv = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "disabled"], rv = ["id", "required", "value", "onChange", "disabled"], iv = { value: "" }, ov = ["value"], av = {
  key: 4,
  class: "checkbox-field"
}, lv = ["id", "checked", "onChange", "disabled"], cv = ["for"], uv = {
  key: 5,
  class: "radio-field"
}, fv = ["id", "name", "value", "checked", "onChange", "disabled"], hv = ["for"], dv = {
  key: 6,
  class: "field-error"
}, pv = { class: "form-actions" }, gv = ["onClick", "disabled"], mv = {
  key: 2,
  class: "user-input-content"
}, _v = {
  key: 0,
  class: "user-input-prompt"
}, yv = {
  key: 1,
  class: "user-input-form"
}, vv = ["onUpdate:modelValue", "onKeydown"], bv = ["onClick", "disabled"], wv = {
  key: 2,
  class: "user-input-submitted"
}, kv = {
  key: 0,
  class: "user-input-confirmation"
}, Tv = {
  key: 3,
  class: "product-message-container"
}, xv = ["innerHTML"], Av = {
  key: 1,
  class: "products-carousel"
}, Sv = { class: "carousel-items" }, Ev = {
  key: 0,
  class: "product-image-compact"
}, Cv = ["src", "alt"], Rv = { class: "product-info-compact" }, Iv = { class: "product-text-area" }, Lv = { class: "product-title-compact" }, Ov = {
  key: 0,
  class: "product-variant-compact"
}, Nv = { class: "product-price-compact" }, Pv = { class: "product-actions-compact" }, Mv = ["onClick"], Dv = {
  key: 2,
  class: "no-products-message"
}, Fv = {
  key: 3,
  class: "no-products-message"
}, $v = ["innerHTML"], Bv = ["innerHTML"], Uv = {
  key: 2,
  class: "message-attachments"
}, zv = {
  key: 0,
  class: "attachment-image-container"
}, Hv = ["src", "alt", "onClick"], Wv = { class: "attachment-image-info" }, qv = ["href"], jv = { class: "attachment-size" }, Vv = ["href"], Kv = { class: "attachment-size" }, Gv = {
  key: 0,
  class: "citation-chips"
}, Yv = ["title"], Xv = { class: "message-info" }, Zv = {
  key: 0,
  class: "agent-name"
}, Jv = {
  key: 5,
  class: "cm-quick-actions-bar"
}, Qv = ["disabled", "onClick"], eb = {
  key: 0,
  class: "file-previews-widget"
}, tb = {
  class: "file-preview-content-widget",
  style: { cursor: "pointer" }
}, nb = ["src", "alt", "onClick"], sb = ["onClick"], rb = { class: "file-preview-info-widget" }, ib = { class: "file-preview-name-widget" }, ob = { class: "file-preview-size-widget" }, ab = ["onClick"], lb = {
  key: 1,
  class: "upload-progress-widget"
}, cb = { class: "message-input" }, ub = ["placeholder", "disabled"], fb = ["disabled", "title"], hb = ["disabled"], db = {
  key: 7,
  class: "new-conversation-section"
}, pb = { class: "conversation-ended-message" }, gb = {
  key: 8,
  class: "ai-disclaimer"
}, mb = {
  key: 8,
  class: "rating-dialog"
}, _b = { class: "rating-content" }, yb = { class: "star-rating" }, vb = ["onClick"], bb = { class: "rating-actions" }, wb = ["disabled"], kb = {
  key: 0,
  class: "preview-modal-image-container"
}, Tb = ["src", "alt"], xb = { class: "preview-modal-filename" }, Ab = {
  key: 3,
  class: "widget-loading"
}, gc = 3, Sb = "image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx,.xls", Eb = /* @__PURE__ */ ma({
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
    } = n_(), { formatCurrency: a } = y_(), {
      messages: l,
      loading: d,
      errorMessage: c,
      showError: b,
      loadingHistory: w,
      hasStartedChat: z,
      connectionStatus: B,
      sendMessage: V,
      endChat: M,
      loadChatHistory: te,
      connect: fe,
      reconnect: he,
      cleanup: S,
      humanAgent: I,
      onTakeover: Y,
      refusal: Z,
      submitRating: xe,
      submitForm: Oe,
      currentForm: _e,
      getWorkflowState: Me,
      proceedWorkflow: be,
      onWorkflowState: je,
      onWorkflowProceeded: Ve,
      currentSessionId: ot,
      setToken: ue,
      setWidgetId: ye,
      onSessionState: me
    } = Xm(), { displayText: nt, isStreaming: Ke } = i_(l, () => ks(() => Hn()));
    o_(l);
    const Ae = ce(""), Ze = ce(!0), st = ce(""), At = ce(!1), Re = (f) => {
      const g = f.target;
      Ae.value = g.value;
    };
    let vt = null;
    const gt = () => {
      vt && vt.disconnect(), vt = new MutationObserver((g) => {
        let u = !1, oe = !1;
        g.forEach((ke) => {
          if (ke.type === "childList") {
            const ge = Array.from(ke.addedNodes).some(
              (at) => {
                var Qe;
                return at.nodeType === Node.ELEMENT_NODE && (at.matches("input, textarea") || ((Qe = at.querySelector) == null ? void 0 : Qe.call(at, "input, textarea")));
              }
            ), pt = Array.from(ke.removedNodes).some(
              (at) => {
                var Qe;
                return at.nodeType === Node.ELEMENT_NODE && (at.matches("input, textarea") || ((Qe = at.querySelector) == null ? void 0 : Qe.call(at, "input, textarea")));
              }
            );
            ge && (oe = !0, u = !0), pt && (u = !0);
          }
        }), u && (clearTimeout(gt.timeoutId), gt.timeoutId = setTimeout(() => {
          y();
        }, oe ? 50 : 100));
      });
      const f = document.querySelector(".widget-container") || document.body;
      vt.observe(f, {
        childList: !0,
        subtree: !0
      });
    };
    gt.timeoutId = null;
    let Ct = [];
    const Rt = /* @__PURE__ */ new Set();
    let Mt = !1;
    const Yt = (f) => {
      if (Mt) return;
      const g = setTimeout(() => {
        Rt.delete(g), y();
      }, f);
      Rt.add(g);
    }, m = () => {
      Rt.forEach(clearTimeout), Rt.clear();
    }, y = () => {
      R();
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
      let g = [];
      for (const u of f) {
        const oe = document.querySelectorAll(u);
        if (oe.length > 0) {
          g = Array.from(oe);
          break;
        }
      }
      g.length !== 0 && (Ct = g, g.forEach((u) => {
        u.addEventListener("input", F, !0), u.addEventListener("keyup", F, !0), u.addEventListener("change", F, !0), u.addEventListener("keypress", L, !0), u.addEventListener("keydown", G, !0);
      }));
    }, R = () => {
      Ct.forEach((f) => {
        f.removeEventListener("input", F), f.removeEventListener("keyup", F), f.removeEventListener("change", F), f.removeEventListener("keypress", L), f.removeEventListener("keydown", G);
      }), Ct = [];
    }, N = (f) => !!(f && f.closest && f.closest(".form-message, .form-fullscreen, .cm-email-gate")), F = (f) => {
      if (N(f.target)) return;
      const g = f.target;
      Ae.value = g.value;
    }, L = (f) => {
      N(f.target) || f.key === "Enter" && !f.shiftKey && (f.preventDefault(), f.stopPropagation(), fn());
    }, G = (f) => {
      N(f.target) || f.key === "Enter" && !f.shiftKey && (f.preventDefault(), f.stopPropagation(), fn());
    }, W = (f) => {
      const g = f.target, u = document.querySelector(".header-menu-container");
      document.querySelector(".header-menu-btn");
      const oe = document.querySelector(".header-dropdown-menu");
      oe && !(u != null && u.contains(g)) && (oe.style.display = "none");
    }, q = ce(!0), {
      token: $,
      start: ne,
      stop: X,
      setToken: E,
      ensureFresh: O
    } = Vg({
      onTokenChanged: (f) => {
        vs() && Ft({ type: "TOKEN_UPDATE", token: f }), ue(f);
      },
      onIdentityExpired: () => {
        k();
      },
      // A framed widget holds the token only in memory: the host page keeps it, so
      // it must hear when the widget lets it go.
      onTokenCleared: () => {
        Zo() && vs() && Ft({ type: "TOKEN_CLEAR" });
      },
      store: zu(n.value || "")
    });
    de(() => !!$.value);
    const K = ce(null), J = ce(!1), ae = ce(!1);
    t.initialAuthError && (K.value = t.initialAuthError, J.value = !0, q.value = !1), o();
    const we = window.__INITIAL_DATA__;
    ne((we == null ? void 0 : we.widgetId) || "", we == null ? void 0 : we.initialToken), $.value && (At.value = !0);
    const Ee = ce(!1);
    (we == null ? void 0 : we.allowAttachments) !== void 0 && (Ee.value = we.allowAttachments);
    const Pe = ce(null), {
      chatStyles: h,
      chatIconStyles: _,
      agentBubbleStyles: P,
      userBubbleStyles: T,
      messageNameStyles: H,
      headerBorderStyles: se,
      photoUrl: ee,
      shadowStyle: Ie
    } = Jg(s), Le = ce(null), {
      uploadedAttachments: Ce,
      previewModal: Fe,
      previewFile: Ge,
      formatFileSize: kt,
      isImageAttachment: an,
      getDownloadUrl: kn,
      getPreviewUrl: Ys,
      handleFileSelect: Xs,
      handleDrop: is,
      handleDragOver: os,
      handleDragLeave: qt,
      handlePaste: Tn,
      removeAttachment: Zs,
      openPreview: as,
      closePreview: Ss,
      openFilePicker: Js,
      isImage: Es
    } = tm($, Le);
    de(() => l.value.some(
      (f) => f.message_type === "form" && (!f.isSubmitted || f.isSubmitted === !1)
    ));
    const xn = de(() => {
      var f;
      return z.value && At.value || !ro.value ? B.value === "connected" && !d.value : dr(st.value.trim()) && B.value === "connected" && !d.value || ((f = window.__INITIAL_DATA__) == null ? void 0 : f.workflow);
    }), An = de(() => xn.value || d.value && B.value === "connected" && z.value), Qs = de(() => B.value === "connected" ? en.value ? "Ask me anything..." : "Type a message..." : "Connecting..."), Sn = ce(!1), fn = async () => {
      if (!Ae.value.trim() && Ce.value.length === 0) return;
      if (d.value && z.value) {
        Sn.value = !0;
        return;
      }
      !z.value && st.value && await zn();
      const f = Ce.value.map((u) => ({
        content: u.content,
        // base64 content
        filename: u.filename,
        content_type: u.type,
        size: u.size
      }));
      await V(Ae.value, st.value, f), Ce.value.forEach((u) => {
        u.url && u.url.startsWith("blob:") && URL.revokeObjectURL(u.url), u.file_url && u.file_url.startsWith("blob:") && URL.revokeObjectURL(u.file_url);
      }), Ae.value = "", Ce.value = [];
      const g = document.querySelector('input[placeholder*="Type a message"]');
      g && (g.value = ""), Yt(500);
    };
    $t(d, (f) => {
      f || !Sn.value || (Sn.value = !1, B.value === "connected" && z.value && fn());
    });
    const Hr = (f) => {
      xn.value && (Ae.value = f, fn());
    }, rt = () => {
      Ft({ type: "WIDGET_MINIMIZE" });
    }, En = (f) => {
      f.key === "Enter" && !f.shiftKey && (f.preventDefault(), f.stopPropagation(), fn());
    }, zn = async ({ afterRefusal: f = !1 } = {}) => {
      var g, u, oe, ke;
      try {
        if (!n.value)
          return console.error("Widget ID is not available"), K.value = "Widget ID is not available. Please refresh and try again.", J.value = !0, !1;
        await O(n.value);
        const ge = new URL(`${xs.API_URL}/widgets/${n.value}`);
        st.value.trim() && dr(st.value.trim()) && ge.searchParams.append("email", st.value.trim());
        const pt = {
          Accept: "application/json",
          "Content-Type": "application/json"
        };
        $.value && (pt.Authorization = `Bearer ${$.value}`);
        const at = await fetch(ge, {
          headers: pt,
          cache: "no-store"
        });
        if (at.status === 401) {
          At.value = !1;
          try {
            const Vn = (await at.json()).detail;
            if ((Vn == null ? void 0 : Vn.code) === Wg)
              return k(), !1;
            const Ps = typeof Vn == "string" ? Vn : "";
            (Ps.includes("generate-token") || Ps.includes("API key") || Ps.includes("Token required")) && (ae.value = !0, K.value = "Widget authentication not configured. Please contact the website administrator.", J.value = !0, E(null));
          } catch {
            K.value = "Authentication required. Your token has expired or is invalid. Please refresh the page.", J.value = !0, E(null);
          }
          return !1;
        }
        if (!at.ok) {
          try {
            const cr = await at.json();
            K.value = cr.detail || `Error: ${at.statusText}`;
          } catch {
            K.value = `Error: ${at.statusText}. Please try again.`;
          }
          return J.value = !0, !1;
        }
        const Qe = await at.json();
        Qe.token && E(Qe.token), At.value = !0, K.value = null, J.value = !1, ue($.value || void 0);
        const lr = await fe();
        return !lr && Z.value === "customer_required" && !f ? await zn({ afterRefusal: !0 }) : (lr || console.error("Chat service not reachable yet; retrying in the background"), await Wr(), (g = Qe.agent) != null && g.customization && i(Qe.agent.customization), Qe.agent && !(Qe != null && Qe.human_agent) && (r.value = Qe.agent.name), Qe != null && Qe.human_agent && (I.value = Qe.human_agent), ((u = Qe.agent) == null ? void 0 : u.allow_attachments) !== void 0 && (Ee.value = Qe.agent.allow_attachments), ((oe = Qe.agent) == null ? void 0 : oe.workflow) !== void 0 && (window.__INITIAL_DATA__ = window.__INITIAL_DATA__ || {}, window.__INITIAL_DATA__.workflow = Qe.agent.workflow), (ke = Qe.agent) != null && ke.workflow && await Me(), !0);
      } catch (ge) {
        return console.error("Error checking authorization:", ge), K.value = "An unexpected error occurred. Please try again.", J.value = !0, At.value = !1, !1;
      } finally {
        q.value = !1;
      }
    }, Wr = async () => {
      !z.value && At.value && (z.value = !0, await te());
    }, Hn = () => {
      Pe.value && (Pe.value.scrollTop = Pe.value.scrollHeight);
    };
    $t(() => l.value, (f) => {
      ks(() => {
        Hn();
      });
    }, { deep: !0 }), $t(B, (f, g) => {
      f === "connected" && g !== "connected" && Yt(100);
    }), $t(() => l.value.length, (f, g) => {
      f > 0 && g === 0 && Yt(100);
    });
    let er = null;
    $t(() => l.value, (f) => {
      const g = f[f.length - 1];
      !ec(g) || g === er || (er = g, sr(g));
    }, { deep: !0 });
    const qr = async () => {
      (await he() || Z.value === "customer_required") && await zn();
    }, jr = ce(!1), Cs = ce(0), tr = ce(""), Xt = ce(0), bt = ce(!1), ht = ce({}), dt = ce(!1), Je = ce({}), Cn = ce(!1), hn = ce(null), nr = ce("Start Chat"), Rn = ce(!1), Tt = ce(null);
    de(() => {
      var g;
      const f = l.value[l.value.length - 1];
      return ((g = f == null ? void 0 : f.attributes) == null ? void 0 : g.request_rating) || !1;
    });
    const Wn = de(() => {
      var g;
      if (!((g = window.__INITIAL_DATA__) != null && g.workflow))
        return !1;
      const f = l.value.find((u) => u.message_type === "rating");
      return (f == null ? void 0 : f.isSubmitted) === !0;
    }), Zt = de(
      () => Pi(I.value.human_agent_profile_pic)
    ), sr = async (f) => {
      var g, u, oe, ke, ge;
      if (ec(f)) {
        try {
          if (f.session_id && $.value && n.value) {
            const pt = await j(f.session_id, {
              reason: (g = f.attributes) == null ? void 0 : g.end_chat_reason,
              description: (u = f.attributes) == null ? void 0 : u.end_chat_description
            });
            if (pt.ok) {
              const at = await pt.json();
              console.info(`✓ Chat session closed on backend: ${at.session_id}`);
            } else
              console.warn(`Failed to close session on backend: ${pt.status}`);
          }
        } catch (pt) {
          console.error("Error calling end-chat API:", pt);
        }
        if ((oe = f.attributes) != null && oe.end_chat && ((ke = f.attributes) != null && ke.request_rating)) {
          const pt = f.agent_name || ((ge = I.value) == null ? void 0 : ge.human_agent_name) || r.value || "our agent";
          l.value.push({
            message: `Rate the chat session that you had with ${pt}`,
            message_type: "rating",
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            session_id: f.session_id,
            agent_name: pt,
            showFeedback: !1
          }), ot.value = f.session_id;
        }
      }
    }, Rs = (f) => {
      bt.value || (Xt.value = f);
    }, qn = () => {
      if (!bt.value) {
        const f = l.value[l.value.length - 1];
        Xt.value = (f == null ? void 0 : f.selectedRating) || 0;
      }
    }, ls = async (f) => {
      if (!bt.value) {
        Xt.value = f;
        const g = l.value[l.value.length - 1];
        g && g.message_type === "rating" && (g.showFeedback = !0, g.selectedRating = f);
      }
    }, Jt = async (f, g, u = null) => {
      try {
        bt.value = !0, await xe(g, u);
        const oe = l.value.find((ke) => ke.message_type === "rating");
        oe && (oe.isSubmitted = !0, oe.finalRating = g, oe.finalFeedback = u);
      } catch (oe) {
        console.error("Failed to submit rating:", oe);
      } finally {
        bt.value = !1;
      }
    }, Ji = (f) => {
      const g = {};
      for (const u of f.fields) {
        const oe = ht.value[u.name], ke = Ls(u, oe);
        ke && (g[u.name] = ke);
      }
      return Je.value = g, Object.keys(g).length === 0;
    }, Is = async (f) => {
      if (!(dt.value || !Ji(f)))
        try {
          dt.value = !0, await Oe(ht.value);
          const u = l.value.findIndex(
            (oe) => oe.message_type === "form" && (!oe.isSubmitted || oe.isSubmitted === !1)
          );
          u !== -1 && l.value.splice(u, 1), ht.value = {}, Je.value = {};
        } catch (u) {
          console.error("Failed to submit form:", u);
        } finally {
          dt.value = !1;
        }
    }, It = (f, g) => {
      var u, oe;
      if (ht.value[f] = g, g && g.toString().trim() !== "") {
        let ke = null;
        if ((u = Tt.value) != null && u.fields && (ke = Tt.value.fields.find((ge) => ge.name === f)), !ke && ((oe = _e.value) != null && oe.fields) && (ke = _e.value.fields.find((ge) => ge.name === f)), ke) {
          const ge = Ls(ke, g);
          ge ? (Je.value[f] = ge, console.log(`Validation error for ${f}:`, ge)) : delete Je.value[f];
        }
      } else
        delete Je.value[f], console.log(`Cleared error for ${f}`);
    }, Vr = (f) => {
      const g = f.replace(/\D/g, "");
      return g.length >= 7 && g.length <= 15;
    }, Ls = (f, g) => {
      if (f.required && (!g || g.toString().trim() === ""))
        return `${f.label} is required`;
      if (!g || g.toString().trim() === "")
        return null;
      if (f.type === "email" && !dr(g))
        return "Please enter a valid email address";
      if (f.type === "tel" && !Vr(g))
        return "Please enter a valid phone number";
      if ((f.type === "text" || f.type === "textarea") && f.minLength && g.length < f.minLength)
        return `${f.label} must be at least ${f.minLength} characters`;
      if ((f.type === "text" || f.type === "textarea") && f.maxLength && g.length > f.maxLength)
        return `${f.label} must not exceed ${f.maxLength} characters`;
      if (f.type === "number") {
        const u = parseFloat(g);
        if (isNaN(u))
          return `${f.label} must be a valid number`;
        if (f.minLength && u < f.minLength)
          return `${f.label} must be at least ${f.minLength}`;
        if (f.maxLength && u > f.maxLength)
          return `${f.label} must not exceed ${f.maxLength}`;
      }
      return null;
    }, Kr = async () => {
      if (!(dt.value || !Tt.value))
        try {
          dt.value = !0, Je.value = {};
          let f = !1;
          for (const g of Tt.value.fields || []) {
            const u = ht.value[g.name], oe = Ls(g, u);
            oe && (Je.value[g.name] = oe, f = !0, console.log(`Validation error for field ${g.name}:`, oe));
          }
          if (f) {
            dt.value = !1, console.log("Validation failed, not submitting");
            return;
          }
          await Oe(ht.value), Rn.value = !1, Tt.value = null, ht.value = {};
        } catch (f) {
          console.error("Failed to submit full screen form:", f);
        } finally {
          dt.value = !1, console.log("Full screen form submission completed");
        }
    }, Gr = (f, g) => {
      if (console.log("handleViewDetails called with:", { product: f, shopDomain: g }), !f) {
        console.error("No product provided to handleViewDetails");
        return;
      }
      let u = null;
      if (f.handle && g)
        u = `https://${g}/products/${f.handle}`;
      else if (f.id && g)
        u = `https://${g}/products/${f.id}`;
      else if (g) {
        if (!f.handle && !f.id) {
          console.error("Product handle and ID are both missing! Product:", f), alert("Unable to open product: Product information incomplete.");
          return;
        }
      } else {
        console.error("Shop domain is missing! Product:", f), alert("Unable to open product: Shop domain not available. Please contact support.");
        return;
      }
      u && (console.log("Opening product URL:", u), window.open(u, "_blank", "noopener"));
    }, Qi = (f) => {
      if (!f) return "";
      let g = f.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "");
      const u = [];
      return g = g.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (oe, ke, ge) => {
        const pt = `__MARKDOWN_LINK_${u.length}__`;
        return console.log("Found markdown link:", oe, "-> placeholder:", pt), u.push(oe), pt;
      }), console.log("After replacing markdown links with placeholders:", g), console.log("Markdown links array:", u), g = g.replace(/https?:\/\/[^\s\)]+/g, "[link removed]"), console.log("After removing standalone URLs:", g), u.forEach((oe, ke) => {
        g = g.replace(`__MARKDOWN_LINK_${ke}__`, oe), console.log(`Restored markdown link ${ke}:`, oe);
      }), g = g.replace(/\n\s*\n\s*\n/g, `

`).trim(), g;
    }, rr = ce(!1);
    ce(!1);
    const ir = de(() => {
      var f;
      return !!((f = I.value) != null && f.human_agent_name);
    }), Yr = de(() => {
      var f;
      return zg((f = window.__INITIAL_DATA__) == null ? void 0 : f.presence, ir.value);
    }), Xr = de(() => Ee.value && ir.value && Ce.value.length < gc), Os = async () => {
      try {
        Cn.value = !1, hn.value = null, await be();
      } catch (f) {
        console.error("Failed to proceed workflow:", f);
      }
    }, cs = async (f) => {
      try {
        if (!f.userInputValue || !f.userInputValue.trim())
          return;
        const g = f.userInputValue.trim();
        f.isSubmitted = !0, f.submittedValue = g, await V(g, st.value);
      } catch (g) {
        console.error("Failed to submit user input:", g), f.isSubmitted = !1, f.submittedValue = null;
      }
    }, j = (f, { reason: g, description: u, keepalive: oe = !1 } = {}) => {
      const ke = new URL(`${xs.API_URL}/widgets/${n.value}/end-chat`);
      return ke.searchParams.append("session_id", f), g && ke.searchParams.append("reason", g), u && ke.searchParams.append("description", u), fetch(ke, {
        method: "POST",
        keepalive: oe,
        headers: {
          Authorization: `Bearer ${$.value}`,
          "Content-Type": "application/json"
        }
      });
    }, p = async (f) => {
      try {
        typeof f == "string" && f && $.value && n.value && await j(f, { reason: "CUSTOMER_REQUEST", keepalive: !0 });
      } catch {
      } finally {
        Ft({ type: "END_CHAT_DONE" });
      }
    }, k = () => {
      if (!vs()) {
        U();
        return;
      }
      Ft({ type: "IDENTITY_EXPIRED" });
    }, U = async () => {
      $.value && (E(null), await ie());
    }, Q = async (f) => {
      const g = Jn(f);
      !g || g === $.value || (E(g), await ie());
    }, ie = async () => {
      var f, g, u;
      try {
        let oe = 0;
        const ke = 50;
        for (; !((f = window.__INITIAL_DATA__) != null && f.widgetId) && oe < ke; )
          await new Promise((pt) => setTimeout(pt, 100)), oe++;
        return (g = window.__INITIAL_DATA__) != null && g.widgetId ? (ye(window.__INITIAL_DATA__.widgetId), await zn() ? ((u = window.__INITIAL_DATA__) != null && u.workflow && At.value && await Me(), !0) : (B.value = "connected", !1)) : (console.error("Widget data not available after waiting"), !1);
      } catch (oe) {
        return console.error("Failed to initialize widget:", oe), !1;
      }
    };
    window.addEventListener("message", (f) => {
      f.source === window.parent && (!f.data || typeof f.data.type != "string" || (f.data.type === "SCROLL_TO_BOTTOM" && Hn(), f.data.type === "HOST_PAGE" && Uu(f.data.url), f.data.type === "END_CHAT" && vs() && p(f.data.sessionId), f.data.type === "IDENTITY_UNAVAILABLE" && vs() && U(), f.data.type === "TOKEN_REFRESH" && vs() && Q(f.data.token), f.data.type === "WIDGET_VISIBILITY" && (qa.value = !!f.data.open), f.data.type === "WIDGET_DISPLAY" && (io.value = {
        mode: f.data.mode,
        width: f.data.width,
        height: f.data.height,
        hotkey: f.data.hotkey
      }), f.data.type === "PREFILL_MESSAGE" && typeof f.data.text == "string" && (Ae.value = f.data.text.slice(0, 2e3), ks(() => {
        const g = document.querySelector(
          ".message-input input, .welcome-message-field"
        );
        g == null || g.focus();
      }))));
    }), window.addEventListener("keydown", (f) => {
      f.key !== "Escape" || f.defaultPrevented || !Zo() || Ft({ type: "WIDGET_ESCAPE" });
    });
    const pe = () => {
      Y(async () => {
        await zn();
      }), me(({ session_id: f, authenticated: g, created: u }) => {
        Ft({
          type: "CHAT_SESSION",
          sessionId: f,
          authenticated: g,
          created: u
        });
      }), je((f) => {
        var g;
        if (nr.value = f.button_text || "Start Chat", f.type === "landing_page")
          hn.value = f.landing_page_data, Cn.value = !0, Rn.value = !1;
        else if (f.type === "form" || f.type === "display_form")
          if (((g = f.form_data) == null ? void 0 : g.form_full_screen) === !0)
            Tt.value = f.form_data, Rn.value = !0, Cn.value = !1;
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
              (ke) => ke.message_type === "form" && !ke.isSubmitted
            ) === -1 && l.value.push(u), Cn.value = !1, Rn.value = !1;
          }
        else
          Cn.value = !1, Rn.value = !1;
      }), Ve((f) => {
        console.log("Workflow proceeded:", f);
      });
    }, Ye = async () => {
      try {
        await ie(), await Me();
      } catch (f) {
        throw console.error("Failed to start new conversation:", f), f;
      }
    }, Xe = de(
      () => {
        var f;
        return s.value.allow_new_chat === !0 && l.value.length > 0 && !((f = I.value) != null && f.human_agent_name) && !us.value;
      }
    ), lt = ce(!1), ct = ce(""), Qt = ce(!1);
    let ut = null;
    const In = () => {
      Qt.value = !1, ct.value = "", ut && (clearTimeout(ut), ut = null);
    }, eo = () => {
      if (!lt.value) {
        if (Qt.value) {
          In();
          return;
        }
        Qt.value = !0, ct.value = "", ut = setTimeout(In, cg);
      }
    };
    $t(Xe, (f) => {
      f || In();
    });
    const Da = async () => {
      lt.value || (ut && (clearTimeout(ut), ut = null), await tf(), ct.value || (Qt.value = !1));
    }, tf = async () => {
      if (!lt.value) {
        lt.value = !0, ct.value = "";
        try {
          if (!await M()) {
            ct.value = Ql;
            return;
          }
          I.value = {}, Ae.value = "", Ce.value = [], await ie();
        } catch (f) {
          console.error("Failed to start a new chat:", f), ct.value = Ql;
        } finally {
          lt.value = !1;
        }
      }
    }, nf = async () => {
      Wn.value = !1, l.value = [], I.value = {}, await Ye();
    };
    qi(async () => {
      await ie(), pe(), gt(), document.addEventListener("click", W), (() => {
        const g = l.value.length > 0, u = B.value === "connected", oe = document.querySelector('input[type="text"], textarea') !== null;
        return g || u || oe;
      })() && Yt(100);
    }), Br(() => {
      window.removeEventListener("message", (f) => {
        f.data.type === "SCROLL_TO_BOTTOM" && Hn();
      }), document.removeEventListener("click", W), vt && (vt.disconnect(), vt = null), gt.timeoutId && (clearTimeout(gt.timeoutId), gt.timeoutId = null), Mt = !0, m(), R(), X(), In(), S();
    });
    const Ns = de(() => s.value.chat_style === "AURORA"), en = de(() => s.value.chat_style === "ASK_ANYTHING" || Ns.value), Fa = de(() => s.value.customization_metadata), Zr = de(() => {
      var g;
      const f = (g = Fa.value) == null ? void 0 : g.avatar_style;
      return f === "orb" ? !0 : f === "photo" ? !1 : Ns.value && !s.value.photo_url;
    }), or = de(() => {
      var f;
      return Bg(r.value || "", (f = Fa.value) == null ? void 0 : f.orb_variant);
    }), sf = {
      GLASS: "theme-glass",
      TERMINAL: "theme-terminal",
      PLAYFUL: "theme-playful",
      CALM_MINT: "theme-calm",
      SUNRISE: "theme-sunrise"
    }, rf = de(() => sf[s.value.chat_style] || ""), of = de(() => __(s.value.chat_style, {
      chat_background_color: s.value.chat_background_color,
      chat_text_color: s.value.chat_text_color,
      accent_color: s.value.accent_color,
      font_family: s.value.font_family
    })), to = de(
      () => Array.isArray(s.value.quick_actions) ? s.value.quick_actions.filter((f) => !!f && f.trim().length > 0) : []
    ), $a = de(() => (s.value.welcome_message || "").trim()), Ba = de(
      () => !en.value && l.value.length === 0 && !w.value && !us.value
    ), af = de(
      () => Ba.value && $a.value.length > 0
    ), lf = de(
      () => Ba.value && !Wn.value && to.value.length > 0
    ), Jr = de(() => s.value.show_citations === !0), Ua = de(() => Ug(s.value.show_ai_disclaimer, ir.value)), cf = (f) => /^[0-9a-f]{16,}$/i.test(f) || /^[0-9a-f-]{32,}$/i.test(f), no = (f) => {
      const g = (f || "").trim().toLowerCase();
      return !g || g === "unknown" ? "Knowledge base" : g.charAt(0).toUpperCase() + g.slice(1);
    }, so = (f) => {
      let g = ((f == null ? void 0 : f.name) || "").trim();
      return !g || (g = g.replace(/^[0-9a-f]{16,}[_-]/i, "").replace(/\.(pdf|txt|md|html?|docx?|csv|json)$/i, ""), !g || cf(g)) ? no(f == null ? void 0 : f.type) : g;
    }, za = (f) => {
      const g = so(f), u = no(f == null ? void 0 : f.type);
      return g === u ? u : `${g} · ${u}`;
    }, ro = de(() => s.value.collect_email === !0 && !en.value), Ha = ce(!1), jn = ce(""), ar = ce(!1), us = de(() => !z.value && ro.value && !Ha.value), Wa = async () => {
      const f = st.value.trim();
      if (!f) {
        jn.value = "Please enter your email address.";
        return;
      }
      if (!dr(f)) {
        jn.value = "Please enter a valid email address.";
        return;
      }
      jn.value = "", ar.value = !0;
      try {
        await zn(), Ha.value = !0;
      } catch {
        jn.value = "Something went wrong. Please try again.";
      } finally {
        ar.value = !1;
      }
    }, io = ce(null), qa = ce(!0), oo = { mode: "floating", width: 400, height: 560 }, Qr = de(
      () => {
        var f;
        return io.value || ((f = s.value.customization_metadata) == null ? void 0 : f.widget_display) || null;
      }
    ), uf = de(() => {
      const f = Qr.value;
      return f ? typeof f.mode == "string" && f.mode !== oo.mode || typeof f.width == "number" && f.width !== oo.width || typeof f.height == "number" && f.height !== oo.height : !1;
    }), ff = de(() => {
      var g;
      const f = {
        width: "100%",
        height: "100%",
        borderRadius: "var(--radius-lg)"
      };
      if (uf.value) {
        const u = (g = Qr.value) == null ? void 0 : g.mode;
        return u === "sidebar-left" || u === "sidebar-right" ? { ...f, borderRadius: "0" } : f;
      }
      return en.value ? window.innerWidth <= 768 ? {
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
    }), ja = de(() => en.value && l.value.length === 0), hf = ["form", "user_input", "rating", "product", "shopify_output"], df = de(
      () => l.value.some(
        (f) => hf.includes(f.message_type) || Array.isArray(f.attachments) && f.attachments.length > 0
      )
    ), pf = de(() => {
      var g, u;
      return en.value ? !0 : (((g = Qr.value) == null ? void 0 : g.mode) === "ask-ai" || ((u = Qr.value) == null ? void 0 : u.mode) === "search-bar") && !Ee.value;
    }), ao = de(
      () => pf.value && Ze.value && !Cn.value && !Rn.value && !us.value && !Wn.value && !df.value
    );
    $t(ao, (f) => {
      Ft({ type: "WIDGET_SURFACE", palette: f });
    }, { immediate: !0 });
    const gf = de(
      () => s.value.welcome_subtitle || `Ask a question — ${r.value || "the assistant"} answers from what it knows.`
    ), mf = de(() => {
      var f;
      return ((f = io.value) == null ? void 0 : f.hotkey) !== !1;
    });
    return (f, g) => J.value && ae.value ? (x(), A("div", v_, [
      v("button", {
        type: "button",
        class: "cm-error-close",
        "aria-label": "Close chat",
        title: "Close",
        onClick: rt
      }, "×"),
      g[20] || (g[20] = ds('<div class="widget-unavailable-card" data-v-def71c55><div class="widget-unavailable-icon-wrapper" data-v-def71c55><svg class="widget-unavailable-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-def71c55><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-def71c55></path><path d="M9 12l2 2 4-4" data-v-def71c55></path></svg></div><h2 class="widget-unavailable-title" data-v-def71c55>Chat Unavailable</h2><p class="widget-unavailable-message" data-v-def71c55> This chat widget is not currently configured. Please contact the website administrator to enable chat support. </p><div class="widget-unavailable-footer" data-v-def71c55><svg class="chattermate-logo-small" width="14" height="14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-def71c55><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-def71c55></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-def71c55><span class="cm-powered-prefix" data-v-def71c55>Powered by </span><strong class="cm-brand" data-v-def71c55>ChatterMate</strong></a></div></div>', 1))
    ])) : J.value ? (x(), A("div", b_, [
      v("button", {
        type: "button",
        class: "cm-error-close",
        "aria-label": "Close chat",
        title: "Close",
        onClick: rt
      }, "×"),
      v("div", w_, [
        g[21] || (g[21] = ds('<div class="auth-error-header" data-v-def71c55><svg class="auth-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-def71c55><circle cx="12" cy="12" r="10" data-v-def71c55></circle><line x1="12" y1="8" x2="12" y2="12" data-v-def71c55></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-def71c55></line></svg><h2 data-v-def71c55>Authentication Error</h2></div>', 1)),
        v("p", k_, re(K.value), 1),
        v("button", {
          class: "auth-error-refresh-btn",
          onClick: g[0] || (g[0] = () => f.window.location.reload())
        }, " Refresh Page ")
      ])
    ])) : n.value && !J.value ? (x(), A("div", {
      key: 2,
      class: $e(["chat-container cm-surface", [{ collapsed: !Ze.value, "ask-anything-style": en.value, aurora: Ns.value }, rf.value]]),
      style: Se({ ...C(Ie), ...ff.value, ...of.value })
    }, [
      q.value ? (x(), A("div", T_, g[22] || (g[22] = [
        ds('<div class="loading-spinner" data-v-def71c55><div class="dot" data-v-def71c55></div><div class="dot" data-v-def71c55></div><div class="dot" data-v-def71c55></div></div><div class="loading-text" data-v-def71c55>Initializing chat...</div>', 2)
      ]))) : le("", !0),
      !q.value && C(B) !== "connected" ? (x(), A("div", {
        key: 1,
        class: $e(["connection-status", C(B)])
      }, [
        C(B) === "connecting" ? (x(), A("div", x_, g[23] || (g[23] = [
          On(" Connecting to chat service... ", -1),
          v("div", { class: "loading-dots" }, [
            v("div", { class: "dot" }),
            v("div", { class: "dot" }),
            v("div", { class: "dot" })
          ], -1)
        ]))) : C(B) === "failed" ? (x(), A("div", A_, [
          g[24] || (g[24] = On(" Connection failed. ", -1)),
          v("button", {
            onClick: qr,
            class: "reconnect-button"
          }, " Click here to reconnect ")
        ])) : le("", !0)
      ], 2)) : le("", !0),
      C(b) ? (x(), A("div", {
        key: 2,
        class: "error-alert",
        style: Se(C(_))
      }, re(C(c)), 5)) : le("", !0),
      ao.value ? (x(), Ei(Dg, {
        key: 3,
        messages: C(l),
        draft: Ae.value,
        "agent-name": C(r),
        suggestions: to.value,
        "welcome-title": C(s).welcome_title,
        "welcome-subtitle": gf.value,
        placeholder: Qs.value,
        "input-enabled": xn.value,
        "typing-enabled": An.value,
        loading: C(d),
        "show-citations": Jr.value,
        disclaimer: Ua.value ? C(tc) : "",
        active: qa.value,
        hotkey: mf.value,
        "can-start-new-chat": Xe.value,
        "starting-new-chat": lt.value,
        "new-chat-armed": Qt.value,
        "new-chat-error": ct.value,
        onNewChat: eo,
        onConfirmNewChat: Da,
        onCancelNewChat: In,
        "citation-label": so,
        "citation-tooltip": za,
        "display-text": C(nt),
        "is-streaming": C(Ke),
        "onUpdate:draft": g[1] || (g[1] = (u) => Ae.value = u),
        onSend: fn,
        onAsk: Hr,
        onClose: rt
      }, null, 8, ["messages", "draft", "agent-name", "suggestions", "welcome-title", "welcome-subtitle", "placeholder", "input-enabled", "typing-enabled", "loading", "show-citations", "disclaimer", "active", "hotkey", "can-start-new-chat", "starting-new-chat", "new-chat-armed", "new-chat-error", "display-text", "is-streaming"])) : ja.value ? (x(), A("div", {
        key: 4,
        class: $e(["welcome-message-section", { aurora: Ns.value }]),
        style: Se(C(h))
      }, [
        v("div", S_, [
          v("div", E_, [
            Zr.value ? (x(), A("div", {
              key: 0,
              class: "welcome-orb",
              style: Se(or.value)
            }, null, 4)) : C(ee) ? (x(), A("img", {
              key: 1,
              src: C(ee),
              alt: C(r),
              class: "welcome-avatar"
            }, null, 8, C_)) : le("", !0),
            v("h1", R_, re(C(s).welcome_title || `Welcome to ${C(r)}`), 1),
            v("p", I_, re(C(s).welcome_subtitle || "I'm here to help you with anything you need. What can I assist you with today?"), 1)
          ])
        ]),
        v("div", L_, [
          !C(z) && !At.value && ro.value ? (x(), A("div", O_, [
            Kn(v("input", {
              "onUpdate:modelValue": g[2] || (g[2] = (u) => st.value = u),
              type: "email",
              placeholder: "Enter your email address",
              disabled: C(d) || C(B) !== "connected",
              class: $e([{
                invalid: st.value.trim() && !C(dr)(st.value.trim()),
                disabled: C(B) !== "connected"
              }, "welcome-email-input"])
            }, null, 10, N_), [
              [ps, st.value]
            ])
          ])) : le("", !0),
          v("div", P_, [
            Kn(v("input", {
              "onUpdate:modelValue": g[3] || (g[3] = (u) => Ae.value = u),
              type: "text",
              placeholder: Qs.value,
              onKeypress: En,
              onInput: Re,
              onChange: Re,
              disabled: !An.value,
              class: $e([{ disabled: !An.value }, "welcome-message-field"])
            }, null, 42, M_), [
              [ps, Ae.value]
            ]),
            v("button", {
              class: $e(["welcome-send-button", { "aurora-send": Ns.value }]),
              style: Se(C(T)),
              onClick: fn,
              disabled: !Ae.value.trim() || !xn.value
            }, [
              Ns.value ? (x(), A("svg", F_, g[25] || (g[25] = [
                v("path", {
                  d: "M12 19V5M12 5L5 12M12 5L19 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1)
              ]))) : (x(), A("svg", $_, g[26] || (g[26] = [
                v("path", {
                  d: "M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1)
              ])))
            ], 14, D_)
          ])
        ]),
        v("div", {
          class: "powered-by-welcome",
          style: Se(C(H))
        }, g[27] || (g[27] = [
          ds('<svg class="chattermate-logo" width="16" height="16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-def71c55><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-def71c55></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-def71c55><span class="cm-powered-prefix" data-v-def71c55>Powered by </span><strong class="cm-brand" data-v-def71c55>ChatterMate</strong></a>', 2)
        ]), 4)
      ], 6)) : le("", !0),
      Cn.value && hn.value ? (x(), A("div", {
        key: 5,
        class: "landing-page-fullscreen",
        style: Se(C(h))
      }, [
        v("div", B_, [
          v("div", U_, [
            v("h2", z_, re(hn.value.heading), 1),
            v("div", H_, re(hn.value.content), 1)
          ]),
          v("div", W_, [
            v("button", {
              class: "landing-page-button",
              onClick: Os
            }, re(nr.value), 1)
          ])
        ]),
        v("div", {
          class: "powered-by-landing",
          style: Se(C(H))
        }, g[28] || (g[28] = [
          ds('<svg class="chattermate-logo" width="16" height="16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-def71c55><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-def71c55></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-def71c55><span class="cm-powered-prefix" data-v-def71c55>Powered by </span><strong class="cm-brand" data-v-def71c55>ChatterMate</strong></a>', 2)
        ]), 4)
      ], 4)) : Rn.value && Tt.value ? (x(), A("div", {
        key: 6,
        class: "form-fullscreen",
        style: Se(C(h))
      }, [
        v("div", q_, [
          Tt.value.title || Tt.value.description ? (x(), A("div", j_, [
            Tt.value.title ? (x(), A("h2", V_, re(Tt.value.title), 1)) : le("", !0),
            Tt.value.description ? (x(), A("p", K_, re(Tt.value.description), 1)) : le("", !0)
          ])) : le("", !0),
          v("div", G_, [
            (x(!0), A(Be, null, St(Tt.value.fields, (u) => {
              var oe, ke;
              return x(), A("div", {
                key: u.name,
                class: "form-field"
              }, [
                v("label", {
                  for: `fullscreen-form-${u.name}`,
                  class: "field-label"
                }, [
                  On(re(u.label) + " ", 1),
                  u.required ? (x(), A("span", X_, "*")) : le("", !0)
                ], 8, Y_),
                u.type === "text" || u.type === "email" || u.type === "tel" ? (x(), A("input", {
                  key: 0,
                  id: `fullscreen-form-${u.name}`,
                  type: u.type,
                  placeholder: u.placeholder || "",
                  required: u.required,
                  minlength: u.minLength,
                  maxlength: u.maxLength,
                  value: ht.value[u.name] || "",
                  onInput: (ge) => It(u.name, ge.target.value),
                  onBlur: (ge) => It(u.name, ge.target.value),
                  class: $e(["form-input", { error: Je.value[u.name] }]),
                  autocomplete: u.type === "email" ? "email" : u.type === "tel" ? "tel" : "off",
                  inputmode: u.type === "tel" ? "tel" : u.type === "email" ? "email" : "text"
                }, null, 42, Z_)) : u.type === "number" ? (x(), A("input", {
                  key: 1,
                  id: `fullscreen-form-${u.name}`,
                  type: "number",
                  placeholder: u.placeholder || "",
                  required: u.required,
                  min: u.minLength,
                  max: u.maxLength,
                  value: ht.value[u.name] || "",
                  onInput: (ge) => It(u.name, ge.target.value),
                  class: $e(["form-input", { error: Je.value[u.name] }])
                }, null, 42, J_)) : u.type === "textarea" ? (x(), A("textarea", {
                  key: 2,
                  id: `fullscreen-form-${u.name}`,
                  placeholder: u.placeholder || "",
                  required: u.required,
                  minlength: u.minLength,
                  maxlength: u.maxLength,
                  value: ht.value[u.name] || "",
                  onInput: (ge) => It(u.name, ge.target.value),
                  class: $e(["form-textarea", { error: Je.value[u.name] }]),
                  rows: "4"
                }, null, 42, Q_)) : u.type === "select" ? (x(), A("select", {
                  key: 3,
                  id: `fullscreen-form-${u.name}`,
                  required: u.required,
                  value: ht.value[u.name] || "",
                  onChange: (ge) => It(u.name, ge.target.value),
                  class: $e(["form-select", { error: Je.value[u.name] }])
                }, [
                  v("option", ty, re(u.placeholder || "Please select..."), 1),
                  (x(!0), A(Be, null, St((Array.isArray(u.options) ? u.options : ((oe = u.options) == null ? void 0 : oe.split(`
`)) || []).filter((ge) => ge.trim()), (ge) => (x(), A("option", {
                    key: ge,
                    value: ge.trim()
                  }, re(ge.trim()), 9, ny))), 128))
                ], 42, ey)) : u.type === "checkbox" ? (x(), A("label", sy, [
                  v("input", {
                    id: `fullscreen-form-${u.name}`,
                    type: "checkbox",
                    required: u.required,
                    checked: ht.value[u.name] || !1,
                    onChange: (ge) => It(u.name, ge.target.checked),
                    class: "form-checkbox"
                  }, null, 40, ry),
                  v("span", iy, re(u.label), 1)
                ])) : u.type === "radio" ? (x(), A("div", oy, [
                  (x(!0), A(Be, null, St((Array.isArray(u.options) ? u.options : ((ke = u.options) == null ? void 0 : ke.split(`
`)) || []).filter((ge) => ge.trim()), (ge) => (x(), A("label", {
                    key: ge,
                    class: "radio-field"
                  }, [
                    v("input", {
                      type: "radio",
                      name: `fullscreen-form-${u.name}`,
                      value: ge.trim(),
                      required: u.required,
                      checked: ht.value[u.name] === ge.trim(),
                      onChange: (pt) => It(u.name, ge.trim()),
                      class: "form-radio"
                    }, null, 40, ay),
                    v("span", ly, re(ge.trim()), 1)
                  ]))), 128))
                ])) : le("", !0),
                Je.value[u.name] ? (x(), A("div", cy, re(Je.value[u.name]), 1)) : le("", !0)
              ]);
            }), 128))
          ]),
          v("div", uy, [
            v("button", {
              onClick: g[4] || (g[4] = () => {
                console.log("Submit button clicked!"), Kr();
              }),
              disabled: dt.value,
              class: "submit-form-button",
              style: Se(C(T))
            }, [
              dt.value ? (x(), A("span", hy, g[29] || (g[29] = [
                v("div", { class: "dot" }, null, -1),
                v("div", { class: "dot" }, null, -1),
                v("div", { class: "dot" }, null, -1)
              ]))) : (x(), A("span", dy, re(Tt.value.submit_button_text || "Submit"), 1))
            ], 12, fy)
          ])
        ]),
        v("div", {
          class: "powered-by-landing",
          style: Se(C(H))
        }, g[30] || (g[30] = [
          ds('<svg class="chattermate-logo" width="16" height="16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-def71c55><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-def71c55></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-def71c55><span class="cm-powered-prefix" data-v-def71c55>Powered by </span><strong class="cm-brand" data-v-def71c55>ChatterMate</strong></a>', 2)
        ]), 4)
      ], 4)) : !ja.value && Ze.value && !ao.value ? (x(), A("div", {
        key: 7,
        class: $e(["chat-panel", { "ask-anything-chat": en.value }]),
        style: Se(C(h))
      }, [
        en.value ? (x(), A("div", {
          key: 1,
          class: "ask-anything-top",
          style: Se(C(se))
        }, [
          v("div", wy, [
            Zt.value || C(ee) ? (x(), A("img", {
              key: 0,
              src: Zt.value || C(ee),
              alt: C(I).human_agent_name || C(r),
              class: "header-avatar"
            }, null, 8, ky)) : le("", !0),
            v("div", Ty, [
              v("h3", {
                style: Se(C(H))
              }, re(C(r)), 5),
              v("p", {
                class: "ask-anything-subtitle",
                style: Se(C(H))
              }, re(C(s).welcome_subtitle || "Ask me anything. I'm here to help."), 5)
            ])
          ])
        ], 4)) : (x(), A("div", {
          key: 0,
          class: "chat-header",
          style: Se(C(se))
        }, [
          v("div", {
            class: "cm-header-sheen",
            style: Se({ background: "linear-gradient(90deg, transparent, " + (C(s).accent_color || "#C9F24E") + ", transparent)" })
          }, null, 4),
          v("div", py, [
            !Zt.value && (Zr.value || !C(ee)) ? (x(), A("div", {
              key: 0,
              class: "header-orb",
              style: Se(or.value)
            }, null, 4)) : Zt.value || C(ee) ? (x(), A("img", {
              key: 1,
              src: Zt.value || C(ee),
              alt: C(I).human_agent_name || C(r),
              class: "header-avatar"
            }, null, 8, gy)) : le("", !0),
            v("div", my, [
              v("h3", {
                style: Se(C(H))
              }, re(C(I).human_agent_name || C(r)), 5),
              v("div", _y, [
                v("span", {
                  class: $e(["status-indicator", Yr.value.online ? "online" : "away"])
                }, null, 2),
                v("span", yy, re(Yr.value.text), 1)
              ])
            ])
          ]),
          v("div", vy, [
            Xe.value ? (x(), A("button", {
              key: 0,
              type: "button",
              class: $e(["header-new-chat", { armed: Qt.value }]),
              style: Se(C(H)),
              disabled: lt.value,
              title: C(Ni),
              "aria-label": C(Ni),
              "aria-expanded": Qt.value,
              onClick: eo
            }, g[31] || (g[31] = [
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
            ]), 14, by)) : le("", !0),
            v("button", {
              type: "button",
              class: "header-minimize",
              style: Se(C(H)),
              title: "Minimize",
              "aria-label": "Minimize chat",
              onClick: rt
            }, g[32] || (g[32] = [
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
        C(w) ? (x(), A("div", xy, g[33] || (g[33] = [
          v("div", { class: "loading-spinner" }, [
            v("div", { class: "dot" }),
            v("div", { class: "dot" }),
            v("div", { class: "dot" })
          ], -1)
        ]))) : le("", !0),
        us.value ? (x(), A("div", {
          key: 3,
          class: "cm-email-gate",
          style: Se(C(h))
        }, [
          v("div", {
            class: "cm-email-gate-orb",
            style: Se(or.value)
          }, null, 4),
          v("h3", Ay, re(C(s).welcome_title || "Before we start"), 1),
          g[34] || (g[34] = v("p", { class: "cm-email-gate-text" }, "Enter your email and we'll continue the chat.", -1)),
          Kn(v("input", {
            "onUpdate:modelValue": g[5] || (g[5] = (u) => st.value = u),
            type: "email",
            inputmode: "email",
            autocomplete: "email",
            placeholder: "you@example.com",
            class: $e(["cm-email-gate-input", { invalid: !!jn.value }]),
            disabled: ar.value,
            onKeyup: hi(Wa, ["enter"]),
            onInput: g[6] || (g[6] = (u) => jn.value = "")
          }, null, 42, Sy), [
            [ps, st.value]
          ]),
          jn.value ? (x(), A("p", Ey, re(jn.value), 1)) : le("", !0),
          v("button", {
            type: "button",
            class: "cm-email-gate-btn",
            style: Se(C(T)),
            disabled: ar.value,
            onClick: Wa
          }, re(ar.value ? "Please wait…" : "Continue to chat"), 13, Cy)
        ], 4)) : le("", !0),
        Qt.value && Xe.value ? (x(), Ei(Pu, {
          key: 4,
          busy: lt.value,
          error: ct.value,
          onConfirm: Da,
          onCancel: In
        }, null, 8, ["busy", "error"])) : le("", !0),
        Kn(v("div", {
          class: "chat-messages",
          ref_key: "messagesContainer",
          ref: Pe,
          role: "log",
          "aria-label": "Messages"
        }, [
          af.value ? (x(), A("div", Ry, [
            v("div", Iy, [
              Zr.value || !C(ee) ? (x(), A("div", {
                key: 0,
                class: "cm-welcome-orb",
                style: Se(or.value)
              }, null, 4)) : (x(), A("img", {
                key: 1,
                src: C(ee),
                alt: C(r),
                class: "cm-welcome-avatar"
              }, null, 8, Ly)),
              v("div", {
                class: "message-bubble cm-welcome-bubble",
                style: Se(C(P))
              }, re($a.value), 5)
            ])
          ])) : le("", !0),
          (x(!0), A(Be, null, St(C(l), (u, oe) => {
            var ke, ge, pt, at, Qe, lr, cr, Vn, Ps, Va, Ka, Ga, Ya, Xa, Za, Ja, Qa, el, tl;
            return x(), A("div", {
              key: oe,
              class: $e([
                "message",
                u.message_type === "bot" || u.message_type === "agent" ? "agent-message" : u.message_type === "system" ? "system-message" : u.message_type === "rating" ? "rating-message" : u.message_type === "form" ? "form-message" : u.message_type === "product" || u.shopify_output ? "product-message" : "user-message"
              ])
            }, [
              u.message_type === "bot" || u.message_type === "agent" ? (x(), A("div", Oy, [
                Zt.value ? (x(), A("img", {
                  key: 0,
                  src: Zt.value,
                  class: "cm-msg-avatar-img",
                  alt: ""
                }, null, 8, Ny)) : !Zr.value && C(ee) ? (x(), A("img", {
                  key: 1,
                  src: C(ee),
                  class: "cm-msg-avatar-img",
                  alt: ""
                }, null, 8, Py)) : (x(), A("div", {
                  key: 2,
                  class: "cm-msg-avatar-orb",
                  style: Se(or.value)
                }, null, 4))
              ])) : le("", !0),
              v("div", My, [
                v("div", {
                  class: "message-bubble",
                  style: Se(u.message_type === "system" || u.message_type === "rating" || u.message_type === "form" || u.message_type === "product" || u.shopify_output ? {} : u.message_type === "user" ? C(T) : C(P))
                }, [
                  u.message_type === "rating" ? (x(), A("div", Dy, [
                    v("p", Fy, "Rate the chat session that you had with " + re(u.agent_name || C(I).human_agent_name || C(r) || "our agent"), 1),
                    v("div", {
                      class: $e(["star-rating", { submitted: bt.value || u.isSubmitted }])
                    }, [
                      (x(), A(Be, null, St(5, (D) => v("button", {
                        key: D,
                        class: $e(["star-button", {
                          warning: D <= (u.isSubmitted ? u.finalRating : Xt.value || u.selectedRating) && (u.isSubmitted ? u.finalRating : Xt.value || u.selectedRating) <= 3,
                          success: D <= (u.isSubmitted ? u.finalRating : Xt.value || u.selectedRating) && (u.isSubmitted ? u.finalRating : Xt.value || u.selectedRating) > 3,
                          selected: D <= (u.isSubmitted ? u.finalRating : Xt.value || u.selectedRating)
                        }]),
                        onMouseover: (ln) => !u.isSubmitted && Rs(D),
                        onMouseleave: (ln) => !u.isSubmitted && qn,
                        onClick: (ln) => !u.isSubmitted && ls(D),
                        disabled: bt.value || u.isSubmitted
                      }, " ★ ", 42, $y)), 64))
                    ], 2),
                    u.showFeedback && !u.isSubmitted ? (x(), A("div", By, [
                      v("div", Uy, [
                        Kn(v("input", {
                          "onUpdate:modelValue": (D) => u.feedback = D,
                          placeholder: "Please share your feedback (optional)",
                          disabled: bt.value,
                          maxlength: "500",
                          class: "feedback-input"
                        }, null, 8, zy), [
                          [ps, u.feedback]
                        ]),
                        v("div", Hy, re(((ke = u.feedback) == null ? void 0 : ke.length) || 0) + "/500", 1)
                      ]),
                      v("button", {
                        onClick: (D) => Jt(u.session_id, Xt.value, u.feedback),
                        disabled: bt.value || !Xt.value,
                        class: "submit-rating-button",
                        style: Se({ backgroundColor: C(s).accent_color || "var(--accent-solid)" })
                      }, re(bt.value ? "Submitting..." : "Submit Rating"), 13, Wy)
                    ])) : le("", !0),
                    u.isSubmitted && u.finalFeedback ? (x(), A("div", qy, [
                      v("div", jy, [
                        v("p", Vy, re(u.finalFeedback), 1)
                      ])
                    ])) : u.isSubmitted ? (x(), A("div", Ky, " Thank you for your rating! ")) : le("", !0)
                  ])) : u.message_type === "form" ? (x(), A("div", Gy, [
                    (pt = (ge = u.attributes) == null ? void 0 : ge.form_data) != null && pt.title || (Qe = (at = u.attributes) == null ? void 0 : at.form_data) != null && Qe.description ? (x(), A("div", Yy, [
                      (cr = (lr = u.attributes) == null ? void 0 : lr.form_data) != null && cr.title ? (x(), A("h3", Xy, re(u.attributes.form_data.title), 1)) : le("", !0),
                      (Ps = (Vn = u.attributes) == null ? void 0 : Vn.form_data) != null && Ps.description ? (x(), A("p", Zy, re(u.attributes.form_data.description), 1)) : le("", !0)
                    ])) : le("", !0),
                    v("div", Jy, [
                      (x(!0), A(Be, null, St((Ka = (Va = u.attributes) == null ? void 0 : Va.form_data) == null ? void 0 : Ka.fields, (D) => {
                        var ln, lo;
                        return x(), A("div", {
                          key: D.name,
                          class: "form-field"
                        }, [
                          v("label", {
                            for: `form-${D.name}`,
                            class: "field-label"
                          }, [
                            On(re(D.label) + " ", 1),
                            D.required ? (x(), A("span", ev, "*")) : le("", !0)
                          ], 8, Qy),
                          D.type === "text" || D.type === "email" || D.type === "tel" ? (x(), A("input", {
                            key: 0,
                            id: `form-${D.name}`,
                            type: D.type,
                            placeholder: D.placeholder || "",
                            required: D.required,
                            minlength: D.minLength,
                            maxlength: D.maxLength,
                            value: ht.value[D.name] || "",
                            onInput: (ze) => It(D.name, ze.target.value),
                            onBlur: (ze) => It(D.name, ze.target.value),
                            class: $e(["form-input", { error: Je.value[D.name] }]),
                            disabled: dt.value,
                            autocomplete: D.type === "email" ? "email" : D.type === "tel" ? "tel" : "off",
                            inputmode: D.type === "tel" ? "tel" : D.type === "email" ? "email" : "text"
                          }, null, 42, tv)) : D.type === "number" ? (x(), A("input", {
                            key: 1,
                            id: `form-${D.name}`,
                            type: "number",
                            placeholder: D.placeholder || "",
                            required: D.required,
                            min: D.min,
                            max: D.max,
                            value: ht.value[D.name] || "",
                            onInput: (ze) => It(D.name, ze.target.value),
                            class: $e(["form-input", { error: Je.value[D.name] }]),
                            disabled: dt.value
                          }, null, 42, nv)) : D.type === "textarea" ? (x(), A("textarea", {
                            key: 2,
                            id: `form-${D.name}`,
                            placeholder: D.placeholder || "",
                            required: D.required,
                            minlength: D.minLength,
                            maxlength: D.maxLength,
                            value: ht.value[D.name] || "",
                            onInput: (ze) => It(D.name, ze.target.value),
                            class: $e(["form-textarea", { error: Je.value[D.name] }]),
                            disabled: dt.value,
                            rows: "3"
                          }, null, 42, sv)) : D.type === "select" ? (x(), A("select", {
                            key: 3,
                            id: `form-${D.name}`,
                            required: D.required,
                            value: ht.value[D.name] || "",
                            onChange: (ze) => It(D.name, ze.target.value),
                            class: $e(["form-select", { error: Je.value[D.name] }]),
                            disabled: dt.value
                          }, [
                            v("option", iv, re(D.placeholder || "Select an option"), 1),
                            (x(!0), A(Be, null, St((Array.isArray(D.options) ? D.options : ((ln = D.options) == null ? void 0 : ln.split(`
`)) || []).filter((ze) => ze.trim()), (ze) => (x(), A("option", {
                              key: ze.trim(),
                              value: ze.trim()
                            }, re(ze.trim()), 9, ov))), 128))
                          ], 42, rv)) : D.type === "checkbox" ? (x(), A("div", av, [
                            v("input", {
                              id: `form-${D.name}`,
                              type: "checkbox",
                              checked: ht.value[D.name] || !1,
                              onChange: (ze) => It(D.name, ze.target.checked),
                              class: "form-checkbox",
                              disabled: dt.value
                            }, null, 40, lv),
                            v("label", {
                              for: `form-${D.name}`,
                              class: "checkbox-label"
                            }, re(D.placeholder || D.label), 9, cv)
                          ])) : D.type === "radio" ? (x(), A("div", uv, [
                            (x(!0), A(Be, null, St((Array.isArray(D.options) ? D.options : ((lo = D.options) == null ? void 0 : lo.split(`
`)) || []).filter((ze) => ze.trim()), (ze) => (x(), A("div", {
                              key: ze.trim(),
                              class: "radio-option"
                            }, [
                              v("input", {
                                id: `form-${D.name}-${ze.trim()}`,
                                name: `form-${D.name}`,
                                type: "radio",
                                value: ze.trim(),
                                checked: ht.value[D.name] === ze.trim(),
                                onChange: (Ib) => It(D.name, ze.trim()),
                                class: "form-radio",
                                disabled: dt.value
                              }, null, 40, fv),
                              v("label", {
                                for: `form-${D.name}-${ze.trim()}`,
                                class: "radio-label"
                              }, re(ze.trim()), 9, hv)
                            ]))), 128))
                          ])) : le("", !0),
                          Je.value[D.name] ? (x(), A("div", dv, re(Je.value[D.name]), 1)) : le("", !0)
                        ]);
                      }), 128))
                    ]),
                    v("div", pv, [
                      v("button", {
                        onClick: () => {
                          var D;
                          console.log("Regular form submit button clicked!"), Is((D = u.attributes) == null ? void 0 : D.form_data);
                        },
                        disabled: dt.value,
                        class: "form-submit-button",
                        style: Se(C(T))
                      }, re(dt.value ? "Submitting..." : ((Ya = (Ga = u.attributes) == null ? void 0 : Ga.form_data) == null ? void 0 : Ya.submit_button_text) || "Submit"), 13, gv)
                    ])
                  ])) : u.message_type === "user_input" ? (x(), A("div", mv, [
                    (Xa = u.attributes) != null && Xa.prompt_message && u.attributes.prompt_message.trim() ? (x(), A("div", _v, re(u.attributes.prompt_message), 1)) : le("", !0),
                    u.isSubmitted ? (x(), A("div", wv, [
                      g[35] || (g[35] = v("strong", null, "Your input:", -1)),
                      On(" " + re(u.submittedValue) + " ", 1),
                      (Za = u.attributes) != null && Za.confirmation_message && u.attributes.confirmation_message.trim() ? (x(), A("div", kv, re(u.attributes.confirmation_message), 1)) : le("", !0)
                    ])) : (x(), A("div", yv, [
                      Kn(v("textarea", {
                        "onUpdate:modelValue": (D) => u.userInputValue = D,
                        class: "user-input-textarea",
                        placeholder: "Type your message here...",
                        rows: "3",
                        onKeydown: [
                          hi(_s((D) => cs(u), ["ctrl"]), ["enter"]),
                          hi(_s((D) => cs(u), ["meta"]), ["enter"])
                        ]
                      }, null, 40, vv), [
                        [ps, u.userInputValue]
                      ]),
                      v("button", {
                        class: "user-input-submit-button",
                        onClick: (D) => cs(u),
                        disabled: !u.userInputValue || !u.userInputValue.trim()
                      }, " Submit ", 8, bv)
                    ]))
                  ])) : u.shopify_output || u.message_type === "product" ? (x(), A("div", Tv, [
                    u.message ? (x(), A("div", {
                      key: 0,
                      innerHTML: C(pi)(((Qa = (Ja = u.shopify_output) == null ? void 0 : Ja.products) == null ? void 0 : Qa.length) > 0 ? Qi(u.message) : u.message),
                      class: "product-message-text"
                    }, null, 8, xv)) : le("", !0),
                    (el = u.shopify_output) != null && el.products && u.shopify_output.products.length > 0 ? (x(), A("div", Av, [
                      g[37] || (g[37] = v("h3", { class: "carousel-title" }, "Products", -1)),
                      v("div", Sv, [
                        (x(!0), A(Be, null, St(u.shopify_output.products, (D) => {
                          var ln;
                          return x(), A("div", {
                            key: D.id,
                            class: "product-card-compact carousel-item"
                          }, [
                            (ln = D.image) != null && ln.src ? (x(), A("div", Ev, [
                              v("img", {
                                src: D.image.src,
                                alt: D.title,
                                class: "product-thumbnail"
                              }, null, 8, Cv)
                            ])) : le("", !0),
                            v("div", Rv, [
                              v("div", Iv, [
                                v("div", Lv, re(D.title), 1),
                                D.variant_title && D.variant_title !== "Default Title" ? (x(), A("div", Ov, re(D.variant_title), 1)) : le("", !0),
                                v("div", Nv, re(D.price_formatted || C(a)(D.price, D.currency)), 1)
                              ]),
                              v("div", Pv, [
                                v("button", {
                                  class: "view-details-button-compact",
                                  onClick: (lo) => {
                                    var ze;
                                    return Gr(D, (ze = u.shopify_output) == null ? void 0 : ze.shop_domain);
                                  }
                                }, g[36] || (g[36] = [
                                  On(" View product ", -1),
                                  v("span", { class: "external-link-icon" }, "↗", -1)
                                ]), 8, Mv)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])) : !u.message && ((tl = u.shopify_output) != null && tl.products) && u.shopify_output.products.length === 0 ? (x(), A("div", Dv, g[38] || (g[38] = [
                      v("p", null, "No products found.", -1)
                    ]))) : !u.message && u.shopify_output && !u.shopify_output.products ? (x(), A("div", Fv, g[39] || (g[39] = [
                      v("p", null, "No products to display.", -1)
                    ]))) : le("", !0)
                  ])) : (x(), A(Be, { key: 4 }, [
                    C(Ke)(oe) ? (x(), A("div", {
                      key: 0,
                      class: "message-streaming",
                      innerHTML: C(pi)(C(nt)(oe, u.message))
                    }, null, 8, $v)) : (x(), A("div", {
                      key: 1,
                      innerHTML: C(pi)(u.message)
                    }, null, 8, Bv)),
                    u.attachments && u.attachments.length > 0 ? (x(), A("div", Uv, [
                      (x(!0), A(Be, null, St(u.attachments, (D) => (x(), A("div", {
                        key: D.id,
                        class: "attachment-item"
                      }, [
                        C(an)(D.content_type) ? (x(), A("div", zv, [
                          v("img", {
                            src: C(kn)(D.file_url),
                            alt: D.filename,
                            class: "attachment-image",
                            onClick: _s((ln) => C(as)({ url: D.file_url, filename: D.filename, type: D.content_type, file_url: C(kn)(D.file_url), size: void 0 }), ["stop"]),
                            style: { cursor: "pointer" }
                          }, null, 8, Hv),
                          v("div", Wv, [
                            v("a", {
                              href: C(kn)(D.file_url),
                              target: "_blank",
                              class: "attachment-link"
                            }, [
                              g[40] || (g[40] = v("svg", {
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
                              On(" " + re(D.filename) + " ", 1),
                              v("span", jv, "(" + re(C(kt)(D.file_size)) + ")", 1)
                            ], 8, qv)
                          ])
                        ])) : (x(), A("a", {
                          key: 1,
                          href: C(kn)(D.file_url),
                          target: "_blank",
                          class: "attachment-link"
                        }, [
                          g[41] || (g[41] = v("svg", {
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
                          On(" " + re(D.filename) + " ", 1),
                          v("span", Kv, "(" + re(C(kt)(D.file_size)) + ")", 1)
                        ], 8, Vv))
                      ]))), 128))
                    ])) : le("", !0)
                  ], 64))
                ], 4),
                Jr.value && (u.message_type === "bot" || u.message_type === "agent") && u.sources && u.sources.length ? (x(), A("div", Gv, [
                  g[42] || (g[42] = v("span", { class: "citation-label" }, "Sources", -1)),
                  (x(!0), A(Be, null, St(u.sources, (D, ln) => (x(), A("span", {
                    key: ln,
                    class: "citation-chip",
                    title: za(D)
                  }, re(so(D)), 9, Yv))), 128))
                ])) : le("", !0),
                v("div", Xv, [
                  u.message_type === "user" ? (x(), A("span", Zv, " You ")) : le("", !0)
                ])
              ])
            ], 2);
          }), 128)),
          C(d) ? (x(), A("div", {
            key: 1,
            class: $e(["typing-indicator", { "reading-indicator": Jr.value }])
          }, [
            Jr.value ? (x(), A(Be, { key: 0 }, [
              g[43] || (g[43] = v("div", {
                class: "reading-bars",
                "aria-hidden": "true"
              }, [
                v("span"),
                v("span"),
                v("span")
              ], -1)),
              g[44] || (g[44] = v("span", { class: "reading-label" }, "reading knowledge base", -1))
            ], 64)) : (x(), A("div", {
              key: 1,
              class: "cm-typing-bubble",
              style: Se(C(P))
            }, g[45] || (g[45] = [
              v("span", { class: "cm-typing-dot" }, null, -1),
              v("span", { class: "cm-typing-dot" }, null, -1),
              v("span", { class: "cm-typing-dot" }, null, -1)
            ]), 4))
          ], 2)) : le("", !0)
        ], 512), [
          [md, !us.value]
        ]),
        lf.value ? (x(), A("div", Jv, [
          (x(!0), A(Be, null, St(to.value, (u) => (x(), A("button", {
            key: u,
            type: "button",
            class: "cm-quick-action",
            disabled: !xn.value,
            onClick: (oe) => Hr(u)
          }, re(u), 9, Qv))), 128))
        ])) : le("", !0),
        !Wn.value && !us.value ? (x(), A("div", {
          key: 6,
          class: $e(["chat-input", { "ask-anything-input": en.value }])
        }, [
          v("input", {
            ref_key: "fileInputRef",
            ref: Le,
            type: "file",
            accept: Sb,
            multiple: "",
            style: { display: "none" },
            onChange: g[7] || (g[7] = //@ts-ignore
            (...u) => C(Xs) && C(Xs)(...u))
          }, null, 544),
          C(Ce).length > 0 ? (x(), A("div", eb, [
            (x(!0), A(Be, null, St(C(Ce), (u, oe) => (x(), A("div", {
              key: oe,
              class: "file-preview-widget"
            }, [
              v("div", tb, [
                C(Es)(u.type) ? (x(), A("img", {
                  key: 0,
                  src: C(Ys)(u),
                  alt: u.filename,
                  class: "file-preview-image-widget",
                  onClick: _s((ke) => C(as)(u), ["stop"]),
                  style: { cursor: "pointer" }
                }, null, 8, nb)) : (x(), A("div", {
                  key: 1,
                  class: "file-preview-icon-widget",
                  onClick: _s((ke) => C(as)(u), ["stop"]),
                  style: { cursor: "pointer" }
                }, g[46] || (g[46] = [
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
                ]), 8, sb))
              ]),
              v("div", rb, [
                v("div", ib, re(u.filename), 1),
                v("div", ob, re(C(kt)(u.size)), 1)
              ]),
              v("button", {
                type: "button",
                class: "file-preview-remove-widget",
                onClick: (ke) => C(Zs)(oe),
                title: "Remove file"
              }, " × ", 8, ab)
            ]))), 128))
          ])) : le("", !0),
          rr.value ? (x(), A("div", lb, g[47] || (g[47] = [
            v("div", { class: "upload-spinner-widget" }, null, -1),
            v("span", { class: "upload-text-widget" }, "Uploading files...", -1)
          ]))) : le("", !0),
          v("div", cb, [
            Kn(v("input", {
              "onUpdate:modelValue": g[8] || (g[8] = (u) => Ae.value = u),
              type: "text",
              placeholder: Qs.value,
              onKeypress: En,
              onInput: Re,
              onChange: Re,
              onPaste: g[9] || (g[9] = //@ts-ignore
              (...u) => C(Tn) && C(Tn)(...u)),
              onDrop: g[10] || (g[10] = //@ts-ignore
              (...u) => C(is) && C(is)(...u)),
              onDragover: g[11] || (g[11] = //@ts-ignore
              (...u) => C(os) && C(os)(...u)),
              onDragleave: g[12] || (g[12] = //@ts-ignore
              (...u) => C(qt) && C(qt)(...u)),
              disabled: !An.value,
              class: $e({ disabled: !An.value, "ask-anything-field": en.value })
            }, null, 42, ub), [
              [ps, Ae.value]
            ]),
            Xr.value ? (x(), A("button", {
              key: 0,
              type: "button",
              class: "attach-button",
              disabled: rr.value,
              onClick: g[13] || (g[13] = //@ts-ignore
              (...u) => C(Js) && C(Js)(...u)),
              title: `Attach files (${C(Ce).length}/${gc} used) or paste screenshots`
            }, g[48] || (g[48] = [
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
            ]), 8, fb)) : le("", !0),
            v("button", {
              class: $e(["send-button", { "ask-anything-send": en.value }]),
              "aria-label": "Send message",
              style: Se(C(T)),
              onClick: fn,
              disabled: !Ae.value.trim() && C(Ce).length === 0 || !xn.value
            }, g[49] || (g[49] = [
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
            ]), 14, hb)
          ])
        ], 2)) : Wn.value && !us.value ? (x(), A("div", db, [
          v("div", pb, [
            g[50] || (g[50] = v("p", { class: "ended-text" }, "This chat has ended.", -1)),
            v("button", {
              class: "start-new-conversation-button",
              style: Se(C(T)),
              onClick: nf
            }, " Click here to start a new conversation ", 4)
          ])
        ])) : le("", !0),
        Ua.value ? (x(), A("div", gb, re(C(tc)), 1)) : le("", !0),
        v("div", {
          class: "powered-by",
          style: Se(C(H))
        }, g[51] || (g[51] = [
          ds('<svg class="chattermate-logo" width="16" height="16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-def71c55><path d="M19 3H41A16 16 0 0 1 57 19V41A16 16 0 0 1 41 57H9A6 6 0 0 1 3 51V19A16 16 0 0 1 19 3Z" fill="#C9F24E" data-v-def71c55></path><circle cx="19.7" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle><circle cx="30" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle><circle cx="40.3" cy="30" r="4.3" fill="#0B0C10" data-v-def71c55></circle></svg><a class="cm-powered-link" href="https://chattermate.chat" target="_blank" rel="noopener" data-v-def71c55><span class="cm-powered-prefix" data-v-def71c55>Powered by </span><strong class="cm-brand" data-v-def71c55>ChatterMate</strong></a>', 2)
        ]), 4)
      ], 6)) : le("", !0),
      jr.value ? (x(), A("div", mb, [
        v("div", _b, [
          g[52] || (g[52] = v("h3", null, "Rate your conversation", -1)),
          v("div", yb, [
            (x(), A(Be, null, St(5, (u) => v("button", {
              key: u,
              onClick: (oe) => Cs.value = u,
              class: $e([{ active: u <= Cs.value }, "star-button"])
            }, " ★ ", 10, vb)), 64))
          ]),
          Kn(v("textarea", {
            "onUpdate:modelValue": g[14] || (g[14] = (u) => tr.value = u),
            placeholder: "Additional feedback (optional)",
            class: "rating-feedback"
          }, null, 512), [
            [ps, tr.value]
          ]),
          v("div", bb, [
            v("button", {
              onClick: g[15] || (g[15] = (u) => f.submitRating(Cs.value, tr.value)),
              disabled: !Cs.value,
              class: "submit-button",
              style: Se(C(T))
            }, " Submit ", 12, wb),
            v("button", {
              onClick: g[16] || (g[16] = (u) => jr.value = !1),
              class: "skip-rating"
            }, " Skip ")
          ])
        ])
      ])) : le("", !0),
      C(Fe) ? (x(), A("div", {
        key: 9,
        class: "preview-modal-overlay",
        onClick: g[19] || (g[19] = //@ts-ignore
        (...u) => C(Ss) && C(Ss)(...u))
      }, [
        v("div", {
          class: "preview-modal-content",
          onClick: g[18] || (g[18] = _s(() => {
          }, ["stop"]))
        }, [
          v("button", {
            class: "preview-modal-close",
            onClick: g[17] || (g[17] = //@ts-ignore
            (...u) => C(Ss) && C(Ss)(...u))
          }, "×"),
          C(Ge) && C(Es)(C(Ge).type) ? (x(), A("div", kb, [
            v("img", {
              src: C(Ys)(C(Ge)),
              alt: C(Ge).filename,
              class: "preview-modal-image"
            }, null, 8, Tb),
            v("div", xb, re(C(Ge).filename), 1)
          ])) : le("", !0)
        ])
      ])) : le("", !0)
    ], 6)) : (x(), A("div", Ab));
  }
}), Cb = /* @__PURE__ */ Ia(Eb, [["__scopeId", "data-v-def71c55"]]);
window.process || (window.process = { env: { NODE_ENV: "production" } });
async function Rb() {
  if (!await Xg()) return;
  const e = window.__INITIAL_DATA__, t = new URL(window.location.href), n = t.searchParams.get("preview") === "true", s = (a) => {
    const l = t.searchParams.get(a);
    if (!(!l || l === "undefined" || l.trim() === ""))
      return l;
  }, r = n ? s("widget_id") || (e == null ? void 0 : e.widgetId) || void 0 : (e == null ? void 0 : e.widgetId) || void 0, i = n ? (e == null ? void 0 : e.initialToken) || s("token") || void 0 : (e == null ? void 0 : e.initialToken) || void 0;
  Dd(Cb, {
    widgetId: r,
    token: i || void 0,
    initialAuthError: null
    // Let backend determine if auth is required
  }).mount("#app"), Zg();
}
Rb();
