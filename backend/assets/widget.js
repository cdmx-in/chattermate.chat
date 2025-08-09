var Nl = Object.defineProperty;
var Ml = (e, t, n) => t in e ? Nl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ce = (e, t, n) => Ml(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function br(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Te = {}, pn = [], At = () => {
}, Dl = () => !1, ys = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), vr = (e) => e.startsWith("onUpdate:"), Ge = Object.assign, wr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, ql = Object.prototype.hasOwnProperty, ve = (e, t) => ql.call(e, t), X = Array.isArray, gn = (e) => bs(e) === "[object Map]", to = (e) => bs(e) === "[object Set]", ee = (e) => typeof e == "function", De = (e) => typeof e == "string", en = (e) => typeof e == "symbol", Pe = (e) => e !== null && typeof e == "object", no = (e) => (Pe(e) || ee(e)) && ee(e.then) && ee(e.catch), so = Object.prototype.toString, bs = (e) => so.call(e), Vl = (e) => bs(e).slice(8, -1), ro = (e) => bs(e) === "[object Object]", kr = (e) => De(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Rn = /* @__PURE__ */ br(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), vs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Hl = /-(\w)/g, Jt = vs(
  (e) => e.replace(Hl, (t, n) => n ? n.toUpperCase() : "")
), Ul = /\B([A-Z])/g, tn = vs(
  (e) => e.replace(Ul, "-$1").toLowerCase()
), io = vs((e) => e.charAt(0).toUpperCase() + e.slice(1)), Bs = vs(
  (e) => e ? `on${io(e)}` : ""
), Gt = (e, t) => !Object.is(e, t), Jn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Qs = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Xs = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let di;
const ws = () => di || (di = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ee(e) {
  if (X(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = De(s) ? Kl(s) : Ee(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (De(e) || Pe(e))
    return e;
}
const jl = /;(?![^(]*\))/g, zl = /:([^]+)/, Wl = /\/\*[^]*?\*\//g;
function Kl(e) {
  const t = {};
  return e.replace(Wl, "").split(jl).forEach((n) => {
    if (n) {
      const s = n.split(zl);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Oe(e) {
  let t = "";
  if (De(e))
    t = e;
  else if (X(e))
    for (let n = 0; n < e.length; n++) {
      const s = Oe(e[n]);
      s && (t += s + " ");
    }
  else if (Pe(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Zl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Gl = /* @__PURE__ */ br(Zl);
function oo(e) {
  return !!e || e === "";
}
const lo = (e) => !!(e && e.__v_isRef === !0), fe = (e) => De(e) ? e : e == null ? "" : X(e) || Pe(e) && (e.toString === so || !ee(e.toString)) ? lo(e) ? fe(e.value) : JSON.stringify(e, ao, 2) : String(e), ao = (e, t) => lo(t) ? ao(e, t.value) : gn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[Ns(s, i) + " =>"] = r, n),
    {}
  )
} : to(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ns(n))
} : en(t) ? Ns(t) : Pe(t) && !X(t) && !ro(t) ? String(t) : t, Ns = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    en(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let nt;
class Yl {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = nt, !t && nt && (this.index = (nt.scopes || (nt.scopes = [])).push(
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
      const n = nt;
      try {
        return nt = this, t();
      } finally {
        nt = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = nt, nt = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (nt = this.prevScope, this.prevScope = void 0);
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
function Jl() {
  return nt;
}
let Ae;
const Ms = /* @__PURE__ */ new WeakSet();
class co {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, nt && nt.active && nt.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ms.has(this) && (Ms.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || fo(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, pi(this), ho(this);
    const t = Ae, n = bt;
    Ae = this, bt = !0;
    try {
      return this.fn();
    } finally {
      po(this), Ae = t, bt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Cr(t);
      this.deps = this.depsTail = void 0, pi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ms.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    er(this) && this.run();
  }
  get dirty() {
    return er(this);
  }
}
let uo = 0, In, On;
function fo(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = On, On = e;
    return;
  }
  e.next = In, In = e;
}
function xr() {
  uo++;
}
function Sr() {
  if (--uo > 0)
    return;
  if (On) {
    let t = On;
    for (On = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; In; ) {
    let t = In;
    for (In = void 0; t; ) {
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
function ho(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function po(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), Cr(s), Ql(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function er(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (go(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function go(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Nn) || (e.globalVersion = Nn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !er(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = Ae, s = bt;
  Ae = e, bt = !0;
  try {
    ho(e);
    const r = e.fn(e._value);
    (t.version === 0 || Gt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    Ae = n, bt = s, po(e), e.flags &= -3;
  }
}
function Cr(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      Cr(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ql(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let bt = !0;
const mo = [];
function Vt() {
  mo.push(bt), bt = !1;
}
function Ht() {
  const e = mo.pop();
  bt = e === void 0 ? !0 : e;
}
function pi(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = Ae;
    Ae = void 0;
    try {
      t();
    } finally {
      Ae = n;
    }
  }
}
let Nn = 0;
class Xl {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Tr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Ae || !bt || Ae === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Ae)
      n = this.activeLink = new Xl(Ae, this), Ae.deps ? (n.prevDep = Ae.depsTail, Ae.depsTail.nextDep = n, Ae.depsTail = n) : Ae.deps = Ae.depsTail = n, _o(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = Ae.depsTail, n.nextDep = void 0, Ae.depsTail.nextDep = n, Ae.depsTail = n, Ae.deps === n && (Ae.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Nn++, this.notify(t);
  }
  notify(t) {
    xr();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Sr();
    }
  }
}
function _o(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        _o(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const tr = /* @__PURE__ */ new WeakMap(), an = Symbol(
  ""
), nr = Symbol(
  ""
), Mn = Symbol(
  ""
);
function Ke(e, t, n) {
  if (bt && Ae) {
    let s = tr.get(e);
    s || tr.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new Tr()), r.map = s, r.key = n), r.track();
  }
}
function Nt(e, t, n, s, r, i) {
  const o = tr.get(e);
  if (!o) {
    Nn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (xr(), t === "clear")
    o.forEach(l);
  else {
    const a = X(e), f = a && kr(n);
    if (a && n === "length") {
      const u = Number(s);
      o.forEach((m, b) => {
        (b === "length" || b === Mn || !en(b) && b >= u) && l(m);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), f && l(o.get(Mn)), t) {
        case "add":
          a ? f && l(o.get("length")) : (l(o.get(an)), gn(e) && l(o.get(nr)));
          break;
        case "delete":
          a || (l(o.get(an)), gn(e) && l(o.get(nr)));
          break;
        case "set":
          gn(e) && l(o.get(an));
          break;
      }
  }
  Sr();
}
function fn(e) {
  const t = be(e);
  return t === e ? t : (Ke(t, "iterate", Mn), ht(e) ? t : t.map(je));
}
function ks(e) {
  return Ke(e = be(e), "iterate", Mn), e;
}
const ea = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ds(this, Symbol.iterator, je);
  },
  concat(...e) {
    return fn(this).concat(
      ...e.map((t) => X(t) ? fn(t) : t)
    );
  },
  entries() {
    return Ds(this, "entries", (e) => (e[1] = je(e[1]), e));
  },
  every(e, t) {
    return Ft(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ft(this, "filter", e, t, (n) => n.map(je), arguments);
  },
  find(e, t) {
    return Ft(this, "find", e, t, je, arguments);
  },
  findIndex(e, t) {
    return Ft(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ft(this, "findLast", e, t, je, arguments);
  },
  findLastIndex(e, t) {
    return Ft(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ft(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return qs(this, "includes", e);
  },
  indexOf(...e) {
    return qs(this, "indexOf", e);
  },
  join(e) {
    return fn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return qs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ft(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return wn(this, "pop");
  },
  push(...e) {
    return wn(this, "push", e);
  },
  reduce(e, ...t) {
    return gi(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return gi(this, "reduceRight", e, t);
  },
  shift() {
    return wn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ft(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return wn(this, "splice", e);
  },
  toReversed() {
    return fn(this).toReversed();
  },
  toSorted(e) {
    return fn(this).toSorted(e);
  },
  toSpliced(...e) {
    return fn(this).toSpliced(...e);
  },
  unshift(...e) {
    return wn(this, "unshift", e);
  },
  values() {
    return Ds(this, "values", je);
  }
};
function Ds(e, t, n) {
  const s = ks(e), r = s[t]();
  return s !== e && !ht(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.value && (i.value = n(i.value)), i;
  }), r;
}
const ta = Array.prototype;
function Ft(e, t, n, s, r, i) {
  const o = ks(e), l = o !== e && !ht(e), a = o[t];
  if (a !== ta[t]) {
    const m = a.apply(e, i);
    return l ? je(m) : m;
  }
  let f = n;
  o !== e && (l ? f = function(m, b) {
    return n.call(this, je(m), b, e);
  } : n.length > 2 && (f = function(m, b) {
    return n.call(this, m, b, e);
  }));
  const u = a.call(o, f, s);
  return l && r ? r(u) : u;
}
function gi(e, t, n, s) {
  const r = ks(e);
  let i = n;
  return r !== e && (ht(e) ? n.length > 3 && (i = function(o, l, a) {
    return n.call(this, o, l, a, e);
  }) : i = function(o, l, a) {
    return n.call(this, o, je(l), a, e);
  }), r[t](i, ...s);
}
function qs(e, t, n) {
  const s = be(e);
  Ke(s, "iterate", Mn);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Ir(n[0]) ? (n[0] = be(n[0]), s[t](...n)) : r;
}
function wn(e, t, n = []) {
  Vt(), xr();
  const s = be(e)[t].apply(e, n);
  return Sr(), Ht(), s;
}
const na = /* @__PURE__ */ br("__proto__,__v_isRef,__isVue"), yo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(en)
);
function sa(e) {
  en(e) || (e = String(e));
  const t = be(this);
  return Ke(t, "has", e), t.hasOwnProperty(e);
}
class bo {
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
      return s === (r ? i ? da : xo : i ? ko : wo).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = X(t);
    if (!r) {
      let a;
      if (o && (a = ea[n]))
        return a;
      if (n === "hasOwnProperty")
        return sa;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Ze(t) ? t : s
    );
    return (en(n) ? yo.has(n) : na(n)) || (r || Ke(t, "get", n), i) ? l : Ze(l) ? o && kr(n) ? l : l.value : Pe(l) ? r ? So(l) : Ar(l) : l;
  }
}
class vo extends bo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    if (!this._isShallow) {
      const a = Qt(i);
      if (!ht(s) && !Qt(s) && (i = be(i), s = be(s)), !X(t) && Ze(i) && !Ze(s))
        return a ? !1 : (i.value = s, !0);
    }
    const o = X(t) && kr(n) ? Number(n) < t.length : ve(t, n), l = Reflect.set(
      t,
      n,
      s,
      Ze(t) ? t : r
    );
    return t === be(r) && (o ? Gt(s, i) && Nt(t, "set", n, s) : Nt(t, "add", n, s)), l;
  }
  deleteProperty(t, n) {
    const s = ve(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Nt(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!en(n) || !yo.has(n)) && Ke(t, "has", n), s;
  }
  ownKeys(t) {
    return Ke(
      t,
      "iterate",
      X(t) ? "length" : an
    ), Reflect.ownKeys(t);
  }
}
class ra extends bo {
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
const ia = /* @__PURE__ */ new vo(), oa = /* @__PURE__ */ new ra(), la = /* @__PURE__ */ new vo(!0);
const sr = (e) => e, zn = (e) => Reflect.getPrototypeOf(e);
function aa(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = be(r), o = gn(i), l = e === "entries" || e === Symbol.iterator && o, a = e === "keys" && o, f = r[e](...s), u = n ? sr : t ? as : je;
    return !t && Ke(
      i,
      "iterate",
      a ? nr : an
    ), {
      // iterator protocol
      next() {
        const { value: m, done: b } = f.next();
        return b ? { value: m, done: b } : {
          value: l ? [u(m[0]), u(m[1])] : u(m),
          done: b
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Wn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ca(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = be(i), l = be(r);
      e || (Gt(r, l) && Ke(o, "get", r), Ke(o, "get", l));
      const { has: a } = zn(o), f = t ? sr : e ? as : je;
      if (a.call(o, r))
        return f(i.get(r));
      if (a.call(o, l))
        return f(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && Ke(be(r), "iterate", an), Reflect.get(r, "size", r);
    },
    has(r) {
      const i = this.__v_raw, o = be(i), l = be(r);
      return e || (Gt(r, l) && Ke(o, "has", r), Ke(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, a = be(l), f = t ? sr : e ? as : je;
      return !e && Ke(a, "iterate", an), l.forEach((u, m) => r.call(i, f(u), f(m), o));
    }
  };
  return Ge(
    n,
    e ? {
      add: Wn("add"),
      set: Wn("set"),
      delete: Wn("delete"),
      clear: Wn("clear")
    } : {
      add(r) {
        !t && !ht(r) && !Qt(r) && (r = be(r));
        const i = be(this);
        return zn(i).has.call(i, r) || (i.add(r), Nt(i, "add", r, r)), this;
      },
      set(r, i) {
        !t && !ht(i) && !Qt(i) && (i = be(i));
        const o = be(this), { has: l, get: a } = zn(o);
        let f = l.call(o, r);
        f || (r = be(r), f = l.call(o, r));
        const u = a.call(o, r);
        return o.set(r, i), f ? Gt(i, u) && Nt(o, "set", r, i) : Nt(o, "add", r, i), this;
      },
      delete(r) {
        const i = be(this), { has: o, get: l } = zn(i);
        let a = o.call(i, r);
        a || (r = be(r), a = o.call(i, r)), l && l.call(i, r);
        const f = i.delete(r);
        return a && Nt(i, "delete", r, void 0), f;
      },
      clear() {
        const r = be(this), i = r.size !== 0, o = r.clear();
        return i && Nt(
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
    n[r] = aa(r, e, t);
  }), n;
}
function Er(e, t) {
  const n = ca(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    ve(n, r) && r in s ? n : s,
    r,
    i
  );
}
const ua = {
  get: /* @__PURE__ */ Er(!1, !1)
}, fa = {
  get: /* @__PURE__ */ Er(!1, !0)
}, ha = {
  get: /* @__PURE__ */ Er(!0, !1)
};
const wo = /* @__PURE__ */ new WeakMap(), ko = /* @__PURE__ */ new WeakMap(), xo = /* @__PURE__ */ new WeakMap(), da = /* @__PURE__ */ new WeakMap();
function pa(e) {
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
function ga(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : pa(Vl(e));
}
function Ar(e) {
  return Qt(e) ? e : Rr(
    e,
    !1,
    ia,
    ua,
    wo
  );
}
function ma(e) {
  return Rr(
    e,
    !1,
    la,
    fa,
    ko
  );
}
function So(e) {
  return Rr(
    e,
    !0,
    oa,
    ha,
    xo
  );
}
function Rr(e, t, n, s, r) {
  if (!Pe(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = ga(e);
  if (i === 0)
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const l = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, l), l;
}
function mn(e) {
  return Qt(e) ? mn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Qt(e) {
  return !!(e && e.__v_isReadonly);
}
function ht(e) {
  return !!(e && e.__v_isShallow);
}
function Ir(e) {
  return e ? !!e.__v_raw : !1;
}
function be(e) {
  const t = e && e.__v_raw;
  return t ? be(t) : e;
}
function _a(e) {
  return !ve(e, "__v_skip") && Object.isExtensible(e) && Qs(e, "__v_skip", !0), e;
}
const je = (e) => Pe(e) ? Ar(e) : e, as = (e) => Pe(e) ? So(e) : e;
function Ze(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ge(e) {
  return ya(e, !1);
}
function ya(e, t) {
  return Ze(e) ? e : new ba(e, t);
}
class ba {
  constructor(t, n) {
    this.dep = new Tr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : be(t), this._value = n ? t : je(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || ht(t) || Qt(t);
    t = s ? t : be(t), Gt(t, n) && (this._rawValue = t, this._value = s ? t : je(t), this.dep.trigger());
  }
}
function q(e) {
  return Ze(e) ? e.value : e;
}
const va = {
  get: (e, t, n) => t === "__v_raw" ? e : q(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return Ze(r) && !Ze(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Co(e) {
  return mn(e) ? e : new Proxy(e, va);
}
class wa {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Tr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Nn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Ae !== this)
      return fo(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return go(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function ka(e, t, n = !1) {
  let s, r;
  return ee(e) ? s = e : (s = e.get, r = e.set), new wa(s, r, n);
}
const Kn = {}, cs = /* @__PURE__ */ new WeakMap();
let ln;
function xa(e, t = !1, n = ln) {
  if (n) {
    let s = cs.get(n);
    s || cs.set(n, s = []), s.push(e);
  }
}
function Sa(e, t, n = Te) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: a } = n, f = (V) => r ? V : ht(V) || r === !1 || r === 0 ? Mt(V, 1) : Mt(V);
  let u, m, b, I, N = !1, D = !1;
  if (Ze(e) ? (m = () => e.value, N = ht(e)) : mn(e) ? (m = () => f(e), N = !0) : X(e) ? (D = !0, N = e.some((V) => mn(V) || ht(V)), m = () => e.map((V) => {
    if (Ze(V))
      return V.value;
    if (mn(V))
      return f(V);
    if (ee(V))
      return a ? a(V, 2) : V();
  })) : ee(e) ? t ? m = a ? () => a(e, 2) : e : m = () => {
    if (b) {
      Vt();
      try {
        b();
      } finally {
        Ht();
      }
    }
    const V = ln;
    ln = u;
    try {
      return a ? a(e, 3, [I]) : e(I);
    } finally {
      ln = V;
    }
  } : m = At, t && r) {
    const V = m, ce = r === !0 ? 1 / 0 : r;
    m = () => Mt(V(), ce);
  }
  const ke = Jl(), se = () => {
    u.stop(), ke && ke.active && wr(ke.effects, u);
  };
  if (i && t) {
    const V = t;
    t = (...ce) => {
      V(...ce), se();
    };
  }
  let me = D ? new Array(e.length).fill(Kn) : Kn;
  const _e = (V) => {
    if (!(!(u.flags & 1) || !u.dirty && !V))
      if (t) {
        const ce = u.run();
        if (r || N || (D ? ce.some((qe, de) => Gt(qe, me[de])) : Gt(ce, me))) {
          b && b();
          const qe = ln;
          ln = u;
          try {
            const de = [
              ce,
              // pass undefined as the old value when it's changed for the first time
              me === Kn ? void 0 : D && me[0] === Kn ? [] : me,
              I
            ];
            me = ce, a ? a(t, 3, de) : (
              // @ts-expect-error
              t(...de)
            );
          } finally {
            ln = qe;
          }
        }
      } else
        u.run();
  };
  return l && l(_e), u = new co(m), u.scheduler = o ? () => o(_e, !1) : _e, I = (V) => xa(V, !1, u), b = u.onStop = () => {
    const V = cs.get(u);
    if (V) {
      if (a)
        a(V, 4);
      else
        for (const ce of V) ce();
      cs.delete(u);
    }
  }, t ? s ? _e(!0) : me = u.run() : o ? o(_e.bind(null, !0), !0) : u.run(), se.pause = u.pause.bind(u), se.resume = u.resume.bind(u), se.stop = se, se;
}
function Mt(e, t = 1 / 0, n) {
  if (t <= 0 || !Pe(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, Ze(e))
    Mt(e.value, t, n);
  else if (X(e))
    for (let s = 0; s < e.length; s++)
      Mt(e[s], t, n);
  else if (to(e) || gn(e))
    e.forEach((s) => {
      Mt(s, t, n);
    });
  else if (ro(e)) {
    for (const s in e)
      Mt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Mt(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Hn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    xs(r, t, n);
  }
}
function Ot(e, t, n, s) {
  if (ee(e)) {
    const r = Hn(e, t, n, s);
    return r && no(r) && r.catch((i) => {
      xs(i, t, n);
    }), r;
  }
  if (X(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(Ot(e[i], t, n, s));
    return r;
  }
}
function xs(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || Te;
  if (t) {
    let l = t.parent;
    const a = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let m = 0; m < u.length; m++)
          if (u[m](e, a, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      Vt(), Hn(i, null, 10, [
        e,
        a,
        f
      ]), Ht();
      return;
    }
  }
  Ca(e, n, r, s, o);
}
function Ca(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Qe = [];
let Tt = -1;
const _n = [];
let Kt = null, hn = 0;
const To = /* @__PURE__ */ Promise.resolve();
let us = null;
function Eo(e) {
  const t = us || To;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ta(e) {
  let t = Tt + 1, n = Qe.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = Qe[s], i = Dn(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Or(e) {
  if (!(e.flags & 1)) {
    const t = Dn(e), n = Qe[Qe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Dn(n) ? Qe.push(e) : Qe.splice(Ta(t), 0, e), e.flags |= 1, Ao();
  }
}
function Ao() {
  us || (us = To.then(Io));
}
function Ea(e) {
  X(e) ? _n.push(...e) : Kt && e.id === -1 ? Kt.splice(hn + 1, 0, e) : e.flags & 1 || (_n.push(e), e.flags |= 1), Ao();
}
function mi(e, t, n = Tt + 1) {
  for (; n < Qe.length; n++) {
    const s = Qe[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      Qe.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Ro(e) {
  if (_n.length) {
    const t = [...new Set(_n)].sort(
      (n, s) => Dn(n) - Dn(s)
    );
    if (_n.length = 0, Kt) {
      Kt.push(...t);
      return;
    }
    for (Kt = t, hn = 0; hn < Kt.length; hn++) {
      const n = Kt[hn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Kt = null, hn = 0;
  }
}
const Dn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Io(e) {
  try {
    for (Tt = 0; Tt < Qe.length; Tt++) {
      const t = Qe[Tt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Hn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Tt < Qe.length; Tt++) {
      const t = Qe[Tt];
      t && (t.flags &= -2);
    }
    Tt = -1, Qe.length = 0, Ro(), us = null, (Qe.length || _n.length) && Io();
  }
}
let ft = null, Oo = null;
function fs(e) {
  const t = ft;
  return ft = e, Oo = e && e.type.__scopeId || null, t;
}
function Aa(e, t = ft, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && Ci(-1);
    const i = fs(t);
    let o;
    try {
      o = e(...r);
    } finally {
      fs(i), s._d && Ci(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function nn(e, t) {
  if (ft === null)
    return e;
  const n = Es(ft), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, l, a = Te] = t[r];
    i && (ee(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Mt(o), s.push({
      dir: i,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return e;
}
function sn(e, t, n, s) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let a = l.dir[s];
    a && (Vt(), Ot(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Ht());
  }
}
const Ra = Symbol("_vte"), Ia = (e) => e.__isTeleport;
function Lr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Lr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Oa(e, t) {
  return ee(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ge({ name: e.name }, t, { setup: e })
  ) : e;
}
function Lo(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Ln(e, t, n, s, r = !1) {
  if (X(e)) {
    e.forEach(
      (N, D) => Ln(
        N,
        t && (X(t) ? t[D] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (Pn(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Ln(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? Es(s.component) : s.el, o = r ? null : i, { i: l, r: a } = e, f = t && t.r, u = l.refs === Te ? l.refs = {} : l.refs, m = l.setupState, b = be(m), I = m === Te ? () => !1 : (N) => ve(b, N);
  if (f != null && f !== a && (De(f) ? (u[f] = null, I(f) && (m[f] = null)) : Ze(f) && (f.value = null)), ee(a))
    Hn(a, l, 12, [o, u]);
  else {
    const N = De(a), D = Ze(a);
    if (N || D) {
      const ke = () => {
        if (e.f) {
          const se = N ? I(a) ? m[a] : u[a] : a.value;
          r ? X(se) && wr(se, i) : X(se) ? se.includes(i) || se.push(i) : N ? (u[a] = [i], I(a) && (m[a] = u[a])) : (a.value = [i], e.k && (u[e.k] = a.value));
        } else N ? (u[a] = o, I(a) && (m[a] = o)) : D && (a.value = o, e.k && (u[e.k] = o));
      };
      o ? (ke.id = -1, it(ke, n)) : ke();
    }
  }
}
ws().requestIdleCallback;
ws().cancelIdleCallback;
const Pn = (e) => !!e.type.__asyncLoader, Po = (e) => e.type.__isKeepAlive;
function La(e, t) {
  $o(e, "a", t);
}
function Pa(e, t) {
  $o(e, "da", t);
}
function $o(e, t, n = Xe) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Ss(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Po(r.parent.vnode) && $a(s, t, n, r), r = r.parent;
  }
}
function $a(e, t, n, s) {
  const r = Ss(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Pr(() => {
    wr(s[t], r);
  }, n);
}
function Ss(e, t, n = Xe, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Vt();
      const l = Un(n), a = Ot(t, n, e, o);
      return l(), Ht(), a;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Ut = (e) => (t, n = Xe) => {
  (!Vn || e === "sp") && Ss(e, (...s) => t(...s), n);
}, Fa = Ut("bm"), Fo = Ut("m"), Ba = Ut(
  "bu"
), Na = Ut("u"), Ma = Ut(
  "bum"
), Pr = Ut("um"), Da = Ut(
  "sp"
), qa = Ut("rtg"), Va = Ut("rtc");
function Ha(e, t = Xe) {
  Ss("ec", e, t);
}
const Ua = Symbol.for("v-ndc");
function xt(e, t, n, s) {
  let r;
  const i = n, o = X(e);
  if (o || De(e)) {
    const l = o && mn(e);
    let a = !1, f = !1;
    l && (a = !ht(e), f = Qt(e), e = ks(e)), r = new Array(e.length);
    for (let u = 0, m = e.length; u < m; u++)
      r[u] = t(
        a ? f ? as(je(e[u])) : je(e[u]) : e[u],
        u,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, i);
  } else if (Pe(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, a) => t(l, a, void 0, i)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let a = 0, f = l.length; a < f; a++) {
        const u = l[a];
        r[a] = t(e[u], u, a, i);
      }
    }
  else
    r = [];
  return r;
}
const rr = (e) => e ? nl(e) ? Es(e) : rr(e.parent) : null, $n = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ge(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => rr(e.parent),
    $root: (e) => rr(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => No(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Or(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Eo.bind(e.proxy)),
    $watch: (e) => fc.bind(e)
  })
), Vs = (e, t) => e !== Te && !e.__isScriptSetup && ve(e, t), ja = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: a } = e;
    let f;
    if (t[0] !== "$") {
      const I = o[t];
      if (I !== void 0)
        switch (I) {
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
        if (Vs(s, t))
          return o[t] = 1, s[t];
        if (r !== Te && ve(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && ve(f, t)
        )
          return o[t] = 3, i[t];
        if (n !== Te && ve(n, t))
          return o[t] = 4, n[t];
        ir && (o[t] = 0);
      }
    }
    const u = $n[t];
    let m, b;
    if (u)
      return t === "$attrs" && Ke(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (m = l.__cssModules) && (m = m[t])
    )
      return m;
    if (n !== Te && ve(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      b = a.config.globalProperties, ve(b, t)
    )
      return b[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return Vs(r, t) ? (r[t] = n, !0) : s !== Te && ve(s, t) ? (s[t] = n, !0) : ve(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i }
  }, o) {
    let l;
    return !!n[o] || e !== Te && ve(e, o) || Vs(t, o) || (l = i[0]) && ve(l, o) || ve(s, o) || ve($n, o) || ve(r.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ve(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function _i(e) {
  return X(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let ir = !0;
function za(e) {
  const t = No(e), n = e.proxy, s = e.ctx;
  ir = !1, t.beforeCreate && yi(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: a,
    inject: f,
    // lifecycle
    created: u,
    beforeMount: m,
    mounted: b,
    beforeUpdate: I,
    updated: N,
    activated: D,
    deactivated: ke,
    beforeDestroy: se,
    beforeUnmount: me,
    destroyed: _e,
    unmounted: V,
    render: ce,
    renderTracked: qe,
    renderTriggered: de,
    errorCaptured: ze,
    serverPrefetch: dt,
    // public API
    expose: Ye,
    inheritAttrs: pt,
    // assets
    components: vt,
    directives: tt,
    filters: He
  } = t;
  if (f && Wa(f, s, null), o)
    for (const te in o) {
      const ie = o[te];
      ee(ie) && (s[te] = ie.bind(n));
    }
  if (r) {
    const te = r.call(n, n);
    Pe(te) && (e.data = Ar(te));
  }
  if (ir = !0, i)
    for (const te in i) {
      const ie = i[te], M = ee(ie) ? ie.bind(n, n) : ee(ie.get) ? ie.get.bind(n, n) : At, $e = !ee(ie) && ee(ie.set) ? ie.set.bind(n) : At, j = Ve({
        get: M,
        set: $e
      });
      Object.defineProperty(s, te, {
        enumerable: !0,
        configurable: !0,
        get: () => j.value,
        set: (xe) => j.value = xe
      });
    }
  if (l)
    for (const te in l)
      Bo(l[te], s, n, te);
  if (a) {
    const te = ee(a) ? a.call(n) : a;
    Reflect.ownKeys(te).forEach((ie) => {
      Qa(ie, te[ie]);
    });
  }
  u && yi(u, e, "c");
  function re(te, ie) {
    X(ie) ? ie.forEach((M) => te(M.bind(n))) : ie && te(ie.bind(n));
  }
  if (re(Fa, m), re(Fo, b), re(Ba, I), re(Na, N), re(La, D), re(Pa, ke), re(Ha, ze), re(Va, qe), re(qa, de), re(Ma, me), re(Pr, V), re(Da, dt), X(Ye))
    if (Ye.length) {
      const te = e.exposed || (e.exposed = {});
      Ye.forEach((ie) => {
        Object.defineProperty(te, ie, {
          get: () => n[ie],
          set: (M) => n[ie] = M,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  ce && e.render === At && (e.render = ce), pt != null && (e.inheritAttrs = pt), vt && (e.components = vt), tt && (e.directives = tt), dt && Lo(e);
}
function Wa(e, t, n = At) {
  X(e) && (e = or(e));
  for (const s in e) {
    const r = e[s];
    let i;
    Pe(r) ? "default" in r ? i = Qn(
      r.from || s,
      r.default,
      !0
    ) : i = Qn(r.from || s) : i = Qn(r), Ze(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function yi(e, t, n) {
  Ot(
    X(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Bo(e, t, n, s) {
  let r = s.includes(".") ? Yo(n, s) : () => n[s];
  if (De(e)) {
    const i = t[e];
    ee(i) && Xn(r, i);
  } else if (ee(e))
    Xn(r, e.bind(n));
  else if (Pe(e))
    if (X(e))
      e.forEach((i) => Bo(i, t, n, s));
    else {
      const i = ee(e.handler) ? e.handler.bind(n) : t[e.handler];
      ee(i) && Xn(r, i, e);
    }
}
function No(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = i.get(t);
  let a;
  return l ? a = l : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (f) => hs(a, f, o, !0)
  ), hs(a, t, o)), Pe(t) && i.set(t, a), a;
}
function hs(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && hs(e, i, n, !0), r && r.forEach(
    (o) => hs(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = Ka[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Ka = {
  data: bi,
  props: vi,
  emits: vi,
  // objects
  methods: En,
  computed: En,
  // lifecycle
  beforeCreate: Je,
  created: Je,
  beforeMount: Je,
  mounted: Je,
  beforeUpdate: Je,
  updated: Je,
  beforeDestroy: Je,
  beforeUnmount: Je,
  destroyed: Je,
  unmounted: Je,
  activated: Je,
  deactivated: Je,
  errorCaptured: Je,
  serverPrefetch: Je,
  // assets
  components: En,
  directives: En,
  // watch
  watch: Ga,
  // provide / inject
  provide: bi,
  inject: Za
};
function bi(e, t) {
  return t ? e ? function() {
    return Ge(
      ee(e) ? e.call(this, this) : e,
      ee(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Za(e, t) {
  return En(or(e), or(t));
}
function or(e) {
  if (X(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Je(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function En(e, t) {
  return e ? Ge(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function vi(e, t) {
  return e ? X(e) && X(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ge(
    /* @__PURE__ */ Object.create(null),
    _i(e),
    _i(t ?? {})
  ) : t;
}
function Ga(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ge(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Je(e[s], t[s]);
  return n;
}
function Mo() {
  return {
    app: null,
    config: {
      isNativeTag: Dl,
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
let Ya = 0;
function Ja(e, t) {
  return function(s, r = null) {
    ee(s) || (s = Ge({}, s)), r != null && !Pe(r) && (r = null);
    const i = Mo(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const f = i.app = {
      _uid: Ya++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: $c,
      get config() {
        return i.config;
      },
      set config(u) {
      },
      use(u, ...m) {
        return o.has(u) || (u && ee(u.install) ? (o.add(u), u.install(f, ...m)) : ee(u) && (o.add(u), u(f, ...m))), f;
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), f;
      },
      component(u, m) {
        return m ? (i.components[u] = m, f) : i.components[u];
      },
      directive(u, m) {
        return m ? (i.directives[u] = m, f) : i.directives[u];
      },
      mount(u, m, b) {
        if (!a) {
          const I = f._ceVNode || Rt(s, r);
          return I.appContext = i, b === !0 ? b = "svg" : b === !1 && (b = void 0), e(I, u, b), a = !0, f._container = u, u.__vue_app__ = f, Es(I.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        a && (Ot(
          l,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(u, m) {
        return i.provides[u] = m, f;
      },
      runWithContext(u) {
        const m = yn;
        yn = f;
        try {
          return u();
        } finally {
          yn = m;
        }
      }
    };
    return f;
  };
}
let yn = null;
function Qa(e, t) {
  if (Xe) {
    let n = Xe.provides;
    const s = Xe.parent && Xe.parent.provides;
    s === n && (n = Xe.provides = Object.create(s)), n[e] = t;
  }
}
function Qn(e, t, n = !1) {
  const s = Ac();
  if (s || yn) {
    let r = yn ? yn._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && ee(t) ? t.call(s && s.proxy) : t;
  }
}
const Do = {}, qo = () => Object.create(Do), Vo = (e) => Object.getPrototypeOf(e) === Do;
function Xa(e, t, n, s = !1) {
  const r = {}, i = qo();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ho(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : ma(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function ec(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, l = be(r), [a] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const u = e.vnode.dynamicProps;
      for (let m = 0; m < u.length; m++) {
        let b = u[m];
        if (Cs(e.emitsOptions, b))
          continue;
        const I = t[b];
        if (a)
          if (ve(i, b))
            I !== i[b] && (i[b] = I, f = !0);
          else {
            const N = Jt(b);
            r[N] = lr(
              a,
              l,
              N,
              I,
              e,
              !1
            );
          }
        else
          I !== i[b] && (i[b] = I, f = !0);
      }
    }
  } else {
    Ho(e, t, r, i) && (f = !0);
    let u;
    for (const m in l)
      (!t || // for camelCase
      !ve(t, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = tn(m)) === m || !ve(t, u))) && (a ? n && // for camelCase
      (n[m] !== void 0 || // for kebab-case
      n[u] !== void 0) && (r[m] = lr(
        a,
        l,
        m,
        void 0,
        e,
        !0
      )) : delete r[m]);
    if (i !== l)
      for (const m in i)
        (!t || !ve(t, m)) && (delete i[m], f = !0);
  }
  f && Nt(e.attrs, "set", "");
}
function Ho(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let a in t) {
      if (Rn(a))
        continue;
      const f = t[a];
      let u;
      r && ve(r, u = Jt(a)) ? !i || !i.includes(u) ? n[u] = f : (l || (l = {}))[u] = f : Cs(e.emitsOptions, a) || (!(a in s) || f !== s[a]) && (s[a] = f, o = !0);
    }
  if (i) {
    const a = be(n), f = l || Te;
    for (let u = 0; u < i.length; u++) {
      const m = i[u];
      n[m] = lr(
        r,
        a,
        m,
        f[m],
        e,
        !ve(f, m)
      );
    }
  }
  return o;
}
function lr(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = ve(o, "default");
    if (l && s === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && ee(a)) {
        const { propsDefaults: f } = r;
        if (n in f)
          s = f[n];
        else {
          const u = Un(r);
          s = f[n] = a.call(
            null,
            t
          ), u();
        }
      } else
        s = a;
      r.ce && r.ce._setProp(n, s);
    }
    o[
      0
      /* shouldCast */
    ] && (i && !l ? s = !1 : o[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === tn(n)) && (s = !0));
  }
  return s;
}
const tc = /* @__PURE__ */ new WeakMap();
function Uo(e, t, n = !1) {
  const s = n ? tc : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, l = [];
  let a = !1;
  if (!ee(e)) {
    const u = (m) => {
      a = !0;
      const [b, I] = Uo(m, t, !0);
      Ge(o, b), I && l.push(...I);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!i && !a)
    return Pe(e) && s.set(e, pn), pn;
  if (X(i))
    for (let u = 0; u < i.length; u++) {
      const m = Jt(i[u]);
      wi(m) && (o[m] = Te);
    }
  else if (i)
    for (const u in i) {
      const m = Jt(u);
      if (wi(m)) {
        const b = i[u], I = o[m] = X(b) || ee(b) ? { type: b } : Ge({}, b), N = I.type;
        let D = !1, ke = !0;
        if (X(N))
          for (let se = 0; se < N.length; ++se) {
            const me = N[se], _e = ee(me) && me.name;
            if (_e === "Boolean") {
              D = !0;
              break;
            } else _e === "String" && (ke = !1);
          }
        else
          D = ee(N) && N.name === "Boolean";
        I[
          0
          /* shouldCast */
        ] = D, I[
          1
          /* shouldCastTrue */
        ] = ke, (D || ve(I, "default")) && l.push(m);
      }
    }
  const f = [o, l];
  return Pe(e) && s.set(e, f), f;
}
function wi(e) {
  return e[0] !== "$" && !Rn(e);
}
const $r = (e) => e === "_" || e === "__" || e === "_ctx" || e === "$stable", Fr = (e) => X(e) ? e.map(Et) : [Et(e)], nc = (e, t, n) => {
  if (t._n)
    return t;
  const s = Aa((...r) => Fr(t(...r)), n);
  return s._c = !1, s;
}, jo = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if ($r(r)) continue;
    const i = e[r];
    if (ee(i))
      t[r] = nc(r, i, s);
    else if (i != null) {
      const o = Fr(i);
      t[r] = () => o;
    }
  }
}, zo = (e, t) => {
  const n = Fr(t);
  e.slots.default = () => n;
}, Wo = (e, t, n) => {
  for (const s in t)
    (n || !$r(s)) && (e[s] = t[s]);
}, sc = (e, t, n) => {
  const s = e.slots = qo();
  if (e.vnode.shapeFlag & 32) {
    const r = t.__;
    r && Qs(s, "__", r, !0);
    const i = t._;
    i ? (Wo(s, t, n), n && Qs(s, "_", i, !0)) : jo(t, s);
  } else t && zo(e, t);
}, rc = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = Te;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : Wo(r, t, n) : (i = !t.$stable, jo(t, r)), o = t;
  } else t && (zo(e, t), o = { default: 1 });
  if (i)
    for (const l in r)
      !$r(l) && o[l] == null && delete r[l];
}, it = yc;
function ic(e) {
  return oc(e);
}
function oc(e, t) {
  const n = ws();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: l,
    createComment: a,
    setText: f,
    setElementText: u,
    parentNode: m,
    nextSibling: b,
    setScopeId: I = At,
    insertStaticContent: N
  } = e, D = (h, p, w, T = null, S = null, C = null, F = void 0, P = null, O = !!p.dynamicChildren) => {
    if (h === p)
      return;
    h && !kn(h, p) && (T = st(h), xe(h, S, C, !0), h = null), p.patchFlag === -2 && (O = !1, p.dynamicChildren = null);
    const { type: E, ref: z, shapeFlag: B } = p;
    switch (E) {
      case Ts:
        ke(h, p, w, T);
        break;
      case Xt:
        se(h, p, w, T);
        break;
      case es:
        h == null && me(p, w, T, F);
        break;
      case Ne:
        vt(
          h,
          p,
          w,
          T,
          S,
          C,
          F,
          P,
          O
        );
        break;
      default:
        B & 1 ? ce(
          h,
          p,
          w,
          T,
          S,
          C,
          F,
          P,
          O
        ) : B & 6 ? tt(
          h,
          p,
          w,
          T,
          S,
          C,
          F,
          P,
          O
        ) : (B & 64 || B & 128) && E.process(
          h,
          p,
          w,
          T,
          S,
          C,
          F,
          P,
          O,
          We
        );
    }
    z != null && S ? Ln(z, h && h.ref, C, p || h, !p) : z == null && h && h.ref != null && Ln(h.ref, null, C, h, !0);
  }, ke = (h, p, w, T) => {
    if (h == null)
      s(
        p.el = l(p.children),
        w,
        T
      );
    else {
      const S = p.el = h.el;
      p.children !== h.children && f(S, p.children);
    }
  }, se = (h, p, w, T) => {
    h == null ? s(
      p.el = a(p.children || ""),
      w,
      T
    ) : p.el = h.el;
  }, me = (h, p, w, T) => {
    [h.el, h.anchor] = N(
      h.children,
      p,
      w,
      T,
      h.el,
      h.anchor
    );
  }, _e = ({ el: h, anchor: p }, w, T) => {
    let S;
    for (; h && h !== p; )
      S = b(h), s(h, w, T), h = S;
    s(p, w, T);
  }, V = ({ el: h, anchor: p }) => {
    let w;
    for (; h && h !== p; )
      w = b(h), r(h), h = w;
    r(p);
  }, ce = (h, p, w, T, S, C, F, P, O) => {
    p.type === "svg" ? F = "svg" : p.type === "math" && (F = "mathml"), h == null ? qe(
      p,
      w,
      T,
      S,
      C,
      F,
      P,
      O
    ) : dt(
      h,
      p,
      S,
      C,
      F,
      P,
      O
    );
  }, qe = (h, p, w, T, S, C, F, P) => {
    let O, E;
    const { props: z, shapeFlag: B, transition: U, dirs: Z } = h;
    if (O = h.el = o(
      h.type,
      C,
      z && z.is,
      z
    ), B & 8 ? u(O, h.children) : B & 16 && ze(
      h.children,
      O,
      null,
      T,
      S,
      Hs(h, C),
      F,
      P
    ), Z && sn(h, null, T, "created"), de(O, h, h.scopeId, F, T), z) {
      for (const ne in z)
        ne !== "value" && !Rn(ne) && i(O, ne, null, z[ne], C, T);
      "value" in z && i(O, "value", null, z.value, C), (E = z.onVnodeBeforeMount) && St(E, T, h);
    }
    Z && sn(h, null, T, "beforeMount");
    const G = lc(S, U);
    G && U.beforeEnter(O), s(O, p, w), ((E = z && z.onVnodeMounted) || G || Z) && it(() => {
      E && St(E, T, h), G && U.enter(O), Z && sn(h, null, T, "mounted");
    }, S);
  }, de = (h, p, w, T, S) => {
    if (w && I(h, w), T)
      for (let C = 0; C < T.length; C++)
        I(h, T[C]);
    if (S) {
      let C = S.subTree;
      if (p === C || Qo(C.type) && (C.ssContent === p || C.ssFallback === p)) {
        const F = S.vnode;
        de(
          h,
          F,
          F.scopeId,
          F.slotScopeIds,
          S.parent
        );
      }
    }
  }, ze = (h, p, w, T, S, C, F, P, O = 0) => {
    for (let E = O; E < h.length; E++) {
      const z = h[E] = P ? Zt(h[E]) : Et(h[E]);
      D(
        null,
        z,
        p,
        w,
        T,
        S,
        C,
        F,
        P
      );
    }
  }, dt = (h, p, w, T, S, C, F) => {
    const P = p.el = h.el;
    let { patchFlag: O, dynamicChildren: E, dirs: z } = p;
    O |= h.patchFlag & 16;
    const B = h.props || Te, U = p.props || Te;
    let Z;
    if (w && rn(w, !1), (Z = U.onVnodeBeforeUpdate) && St(Z, w, p, h), z && sn(p, h, w, "beforeUpdate"), w && rn(w, !0), (B.innerHTML && U.innerHTML == null || B.textContent && U.textContent == null) && u(P, ""), E ? Ye(
      h.dynamicChildren,
      E,
      P,
      w,
      T,
      Hs(p, S),
      C
    ) : F || ie(
      h,
      p,
      P,
      null,
      w,
      T,
      Hs(p, S),
      C,
      !1
    ), O > 0) {
      if (O & 16)
        pt(P, B, U, w, S);
      else if (O & 2 && B.class !== U.class && i(P, "class", null, U.class, S), O & 4 && i(P, "style", B.style, U.style, S), O & 8) {
        const G = p.dynamicProps;
        for (let ne = 0; ne < G.length; ne++) {
          const W = G[ne], oe = B[W], J = U[W];
          (J !== oe || W === "value") && i(P, W, oe, J, S, w);
        }
      }
      O & 1 && h.children !== p.children && u(P, p.children);
    } else !F && E == null && pt(P, B, U, w, S);
    ((Z = U.onVnodeUpdated) || z) && it(() => {
      Z && St(Z, w, p, h), z && sn(p, h, w, "updated");
    }, T);
  }, Ye = (h, p, w, T, S, C, F) => {
    for (let P = 0; P < p.length; P++) {
      const O = h[P], E = p[P], z = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        O.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (O.type === Ne || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !kn(O, E) || // - In the case of a component, it could contain anything.
        O.shapeFlag & 198) ? m(O.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          w
        )
      );
      D(
        O,
        E,
        z,
        null,
        T,
        S,
        C,
        F,
        !0
      );
    }
  }, pt = (h, p, w, T, S) => {
    if (p !== w) {
      if (p !== Te)
        for (const C in p)
          !Rn(C) && !(C in w) && i(
            h,
            C,
            p[C],
            null,
            S,
            T
          );
      for (const C in w) {
        if (Rn(C)) continue;
        const F = w[C], P = p[C];
        F !== P && C !== "value" && i(h, C, P, F, S, T);
      }
      "value" in w && i(h, "value", p.value, w.value, S);
    }
  }, vt = (h, p, w, T, S, C, F, P, O) => {
    const E = p.el = h ? h.el : l(""), z = p.anchor = h ? h.anchor : l("");
    let { patchFlag: B, dynamicChildren: U, slotScopeIds: Z } = p;
    Z && (P = P ? P.concat(Z) : Z), h == null ? (s(E, w, T), s(z, w, T), ze(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      w,
      z,
      S,
      C,
      F,
      P,
      O
    )) : B > 0 && B & 64 && U && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    h.dynamicChildren ? (Ye(
      h.dynamicChildren,
      U,
      w,
      S,
      C,
      F,
      P
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || S && p === S.subTree) && Ko(
      h,
      p,
      !0
      /* shallow */
    )) : ie(
      h,
      p,
      w,
      z,
      S,
      C,
      F,
      P,
      O
    );
  }, tt = (h, p, w, T, S, C, F, P, O) => {
    p.slotScopeIds = P, h == null ? p.shapeFlag & 512 ? S.ctx.activate(
      p,
      w,
      T,
      F,
      O
    ) : He(
      p,
      w,
      T,
      S,
      C,
      F,
      O
    ) : jt(h, p, O);
  }, He = (h, p, w, T, S, C, F) => {
    const P = h.component = Ec(
      h,
      T,
      S
    );
    if (Po(h) && (P.ctx.renderer = We), Rc(P, !1, F), P.asyncDep) {
      if (S && S.registerDep(P, re, F), !h.el) {
        const O = P.subTree = Rt(Xt);
        se(null, O, p, w), h.placeholder = O.el;
      }
    } else
      re(
        P,
        h,
        p,
        w,
        S,
        C,
        F
      );
  }, jt = (h, p, w) => {
    const T = p.component = h.component;
    if (mc(h, p, w))
      if (T.asyncDep && !T.asyncResolved) {
        te(T, p, w);
        return;
      } else
        T.next = p, T.update();
    else
      p.el = h.el, T.vnode = p;
  }, re = (h, p, w, T, S, C, F) => {
    const P = () => {
      if (h.isMounted) {
        let { next: B, bu: U, u: Z, parent: G, vnode: ne } = h;
        {
          const c = Zo(h);
          if (c) {
            B && (B.el = ne.el, te(h, B, F)), c.asyncDep.then(() => {
              h.isUnmounted || P();
            });
            return;
          }
        }
        let W = B, oe;
        rn(h, !1), B ? (B.el = ne.el, te(h, B, F)) : B = ne, U && Jn(U), (oe = B.props && B.props.onVnodeBeforeUpdate) && St(oe, G, B, ne), rn(h, !0);
        const J = xi(h), Fe = h.subTree;
        h.subTree = J, D(
          Fe,
          J,
          // parent may have changed if it's in a teleport
          m(Fe.el),
          // anchor may have changed if it's in a fragment
          st(Fe),
          h,
          S,
          C
        ), B.el = J.el, W === null && _c(h, J.el), Z && it(Z, S), (oe = B.props && B.props.onVnodeUpdated) && it(
          () => St(oe, G, B, ne),
          S
        );
      } else {
        let B;
        const { el: U, props: Z } = p, { bm: G, m: ne, parent: W, root: oe, type: J } = h, Fe = Pn(p);
        rn(h, !1), G && Jn(G), !Fe && (B = Z && Z.onVnodeBeforeMount) && St(B, W, p), rn(h, !0);
        {
          oe.ce && // @ts-expect-error _def is private
          oe.ce._def.shadowRoot !== !1 && oe.ce._injectChildStyle(J);
          const c = h.subTree = xi(h);
          D(
            null,
            c,
            w,
            T,
            h,
            S,
            C
          ), p.el = c.el;
        }
        if (ne && it(ne, S), !Fe && (B = Z && Z.onVnodeMounted)) {
          const c = p;
          it(
            () => St(B, W, c),
            S
          );
        }
        (p.shapeFlag & 256 || W && Pn(W.vnode) && W.vnode.shapeFlag & 256) && h.a && it(h.a, S), h.isMounted = !0, p = w = T = null;
      }
    };
    h.scope.on();
    const O = h.effect = new co(P);
    h.scope.off();
    const E = h.update = O.run.bind(O), z = h.job = O.runIfDirty.bind(O);
    z.i = h, z.id = h.uid, O.scheduler = () => Or(z), rn(h, !0), E();
  }, te = (h, p, w) => {
    p.component = h;
    const T = h.vnode.props;
    h.vnode = p, h.next = null, ec(h, p.props, T, w), rc(h, p.children, w), Vt(), mi(h), Ht();
  }, ie = (h, p, w, T, S, C, F, P, O = !1) => {
    const E = h && h.children, z = h ? h.shapeFlag : 0, B = p.children, { patchFlag: U, shapeFlag: Z } = p;
    if (U > 0) {
      if (U & 128) {
        $e(
          E,
          B,
          w,
          T,
          S,
          C,
          F,
          P,
          O
        );
        return;
      } else if (U & 256) {
        M(
          E,
          B,
          w,
          T,
          S,
          C,
          F,
          P,
          O
        );
        return;
      }
    }
    Z & 8 ? (z & 16 && at(E, S, C), B !== E && u(w, B)) : z & 16 ? Z & 16 ? $e(
      E,
      B,
      w,
      T,
      S,
      C,
      F,
      P,
      O
    ) : at(E, S, C, !0) : (z & 8 && u(w, ""), Z & 16 && ze(
      B,
      w,
      T,
      S,
      C,
      F,
      P,
      O
    ));
  }, M = (h, p, w, T, S, C, F, P, O) => {
    h = h || pn, p = p || pn;
    const E = h.length, z = p.length, B = Math.min(E, z);
    let U;
    for (U = 0; U < B; U++) {
      const Z = p[U] = O ? Zt(p[U]) : Et(p[U]);
      D(
        h[U],
        Z,
        w,
        null,
        S,
        C,
        F,
        P,
        O
      );
    }
    E > z ? at(
      h,
      S,
      C,
      !0,
      !1,
      B
    ) : ze(
      p,
      w,
      T,
      S,
      C,
      F,
      P,
      O,
      B
    );
  }, $e = (h, p, w, T, S, C, F, P, O) => {
    let E = 0;
    const z = p.length;
    let B = h.length - 1, U = z - 1;
    for (; E <= B && E <= U; ) {
      const Z = h[E], G = p[E] = O ? Zt(p[E]) : Et(p[E]);
      if (kn(Z, G))
        D(
          Z,
          G,
          w,
          null,
          S,
          C,
          F,
          P,
          O
        );
      else
        break;
      E++;
    }
    for (; E <= B && E <= U; ) {
      const Z = h[B], G = p[U] = O ? Zt(p[U]) : Et(p[U]);
      if (kn(Z, G))
        D(
          Z,
          G,
          w,
          null,
          S,
          C,
          F,
          P,
          O
        );
      else
        break;
      B--, U--;
    }
    if (E > B) {
      if (E <= U) {
        const Z = U + 1, G = Z < z ? p[Z].el : T;
        for (; E <= U; )
          D(
            null,
            p[E] = O ? Zt(p[E]) : Et(p[E]),
            w,
            G,
            S,
            C,
            F,
            P,
            O
          ), E++;
      }
    } else if (E > U)
      for (; E <= B; )
        xe(h[E], S, C, !0), E++;
    else {
      const Z = E, G = E, ne = /* @__PURE__ */ new Map();
      for (E = G; E <= U; E++) {
        const y = p[E] = O ? Zt(p[E]) : Et(p[E]);
        y.key != null && ne.set(y.key, E);
      }
      let W, oe = 0;
      const J = U - G + 1;
      let Fe = !1, c = 0;
      const g = new Array(J);
      for (E = 0; E < J; E++) g[E] = 0;
      for (E = Z; E <= B; E++) {
        const y = h[E];
        if (oe >= J) {
          xe(y, S, C, !0);
          continue;
        }
        let A;
        if (y.key != null)
          A = ne.get(y.key);
        else
          for (W = G; W <= U; W++)
            if (g[W - G] === 0 && kn(y, p[W])) {
              A = W;
              break;
            }
        A === void 0 ? xe(y, S, C, !0) : (g[A - G] = E + 1, A >= c ? c = A : Fe = !0, D(
          y,
          p[A],
          w,
          null,
          S,
          C,
          F,
          P,
          O
        ), oe++);
      }
      const x = Fe ? ac(g) : pn;
      for (W = x.length - 1, E = J - 1; E >= 0; E--) {
        const y = G + E, A = p[y], H = p[y + 1], K = y + 1 < z ? (
          // #13559, fallback to el placeholder for unresolved async component
          H.el || H.placeholder
        ) : T;
        g[E] === 0 ? D(
          null,
          A,
          w,
          K,
          S,
          C,
          F,
          P,
          O
        ) : Fe && (W < 0 || E !== x[W] ? j(A, w, K, 2) : W--);
      }
    }
  }, j = (h, p, w, T, S = null) => {
    const { el: C, type: F, transition: P, children: O, shapeFlag: E } = h;
    if (E & 6) {
      j(h.component.subTree, p, w, T);
      return;
    }
    if (E & 128) {
      h.suspense.move(p, w, T);
      return;
    }
    if (E & 64) {
      F.move(h, p, w, We);
      return;
    }
    if (F === Ne) {
      s(C, p, w);
      for (let B = 0; B < O.length; B++)
        j(O[B], p, w, T);
      s(h.anchor, p, w);
      return;
    }
    if (F === es) {
      _e(h, p, w);
      return;
    }
    if (T !== 2 && E & 1 && P)
      if (T === 0)
        P.beforeEnter(C), s(C, p, w), it(() => P.enter(C), S);
      else {
        const { leave: B, delayLeave: U, afterLeave: Z } = P, G = () => {
          h.ctx.isUnmounted ? r(C) : s(C, p, w);
        }, ne = () => {
          B(C, () => {
            G(), Z && Z();
          });
        };
        U ? U(C, G, ne) : ne();
      }
    else
      s(C, p, w);
  }, xe = (h, p, w, T = !1, S = !1) => {
    const {
      type: C,
      props: F,
      ref: P,
      children: O,
      dynamicChildren: E,
      shapeFlag: z,
      patchFlag: B,
      dirs: U,
      cacheIndex: Z
    } = h;
    if (B === -2 && (S = !1), P != null && (Vt(), Ln(P, null, w, h, !0), Ht()), Z != null && (p.renderCache[Z] = void 0), z & 256) {
      p.ctx.deactivate(h);
      return;
    }
    const G = z & 1 && U, ne = !Pn(h);
    let W;
    if (ne && (W = F && F.onVnodeBeforeUnmount) && St(W, p, h), z & 6)
      gt(h.component, w, T);
    else {
      if (z & 128) {
        h.suspense.unmount(w, T);
        return;
      }
      G && sn(h, null, p, "beforeUnmount"), z & 64 ? h.type.remove(
        h,
        p,
        w,
        We,
        T
      ) : E && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !E.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (C !== Ne || B > 0 && B & 64) ? at(
        E,
        p,
        w,
        !1,
        !0
      ) : (C === Ne && B & 384 || !S && z & 16) && at(O, p, w), T && lt(h);
    }
    (ne && (W = F && F.onVnodeUnmounted) || G) && it(() => {
      W && St(W, p, h), G && sn(h, null, p, "unmounted");
    }, w);
  }, lt = (h) => {
    const { type: p, el: w, anchor: T, transition: S } = h;
    if (p === Ne) {
      wt(w, T);
      return;
    }
    if (p === es) {
      V(h);
      return;
    }
    const C = () => {
      r(w), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (h.shapeFlag & 1 && S && !S.persisted) {
      const { leave: F, delayLeave: P } = S, O = () => F(w, C);
      P ? P(h.el, C, O) : O();
    } else
      C();
  }, wt = (h, p) => {
    let w;
    for (; h !== p; )
      w = b(h), r(h), h = w;
    r(p);
  }, gt = (h, p, w) => {
    const {
      bum: T,
      scope: S,
      job: C,
      subTree: F,
      um: P,
      m: O,
      a: E,
      parent: z,
      slots: { __: B }
    } = h;
    ki(O), ki(E), T && Jn(T), z && X(B) && B.forEach((U) => {
      z.renderCache[U] = void 0;
    }), S.stop(), C && (C.flags |= 8, xe(F, h, p, w)), P && it(P, p), it(() => {
      h.isUnmounted = !0;
    }, p), p && p.pendingBranch && !p.isUnmounted && h.asyncDep && !h.asyncResolved && h.suspenseId === p.pendingId && (p.deps--, p.deps === 0 && p.resolve());
  }, at = (h, p, w, T = !1, S = !1, C = 0) => {
    for (let F = C; F < h.length; F++)
      xe(h[F], p, w, T, S);
  }, st = (h) => {
    if (h.shapeFlag & 6)
      return st(h.component.subTree);
    if (h.shapeFlag & 128)
      return h.suspense.next();
    const p = b(h.anchor || h.el), w = p && p[Ra];
    return w ? b(w) : p;
  };
  let Pt = !1;
  const mt = (h, p, w) => {
    h == null ? p._vnode && xe(p._vnode, null, null, !0) : D(
      p._vnode || null,
      h,
      p,
      null,
      null,
      null,
      w
    ), p._vnode = h, Pt || (Pt = !0, mi(), Ro(), Pt = !1);
  }, We = {
    p: D,
    um: xe,
    m: j,
    r: lt,
    mt: He,
    mc: ze,
    pc: ie,
    pbc: Ye,
    n: st,
    o: e
  };
  return {
    render: mt,
    hydrate: void 0,
    createApp: Ja(mt)
  };
}
function Hs({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function rn({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function lc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ko(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (X(s) && X(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = Zt(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && Ko(o, l)), l.type === Ts && (l.el = o.el), l.type === Xt && !l.el && (l.el = o.el);
    }
}
function ac(e) {
  const t = e.slice(), n = [0];
  let s, r, i, o, l;
  const a = e.length;
  for (s = 0; s < a; s++) {
    const f = e[s];
    if (f !== 0) {
      if (r = n[n.length - 1], e[r] < f) {
        t[s] = r, n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        l = i + o >> 1, e[n[l]] < f ? i = l + 1 : o = l;
      f < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = t[o];
  return n;
}
function Zo(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Zo(t);
}
function ki(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const cc = Symbol.for("v-scx"), uc = () => Qn(cc);
function Xn(e, t, n) {
  return Go(e, t, n);
}
function Go(e, t, n = Te) {
  const { immediate: s, deep: r, flush: i, once: o } = n, l = Ge({}, n), a = t && s || !t && i !== "post";
  let f;
  if (Vn) {
    if (i === "sync") {
      const I = uc();
      f = I.__watcherHandles || (I.__watcherHandles = []);
    } else if (!a) {
      const I = () => {
      };
      return I.stop = At, I.resume = At, I.pause = At, I;
    }
  }
  const u = Xe;
  l.call = (I, N, D) => Ot(I, u, N, D);
  let m = !1;
  i === "post" ? l.scheduler = (I) => {
    it(I, u && u.suspense);
  } : i !== "sync" && (m = !0, l.scheduler = (I, N) => {
    N ? I() : Or(I);
  }), l.augmentJob = (I) => {
    t && (I.flags |= 4), m && (I.flags |= 2, u && (I.id = u.uid, I.i = u));
  };
  const b = Sa(e, t, l);
  return Vn && (f ? f.push(b) : a && b()), b;
}
function fc(e, t, n) {
  const s = this.proxy, r = De(e) ? e.includes(".") ? Yo(s, e) : () => s[e] : e.bind(s, s);
  let i;
  ee(t) ? i = t : (i = t.handler, n = t);
  const o = Un(this), l = Go(r, i.bind(s), n);
  return o(), l;
}
function Yo(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const hc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Jt(t)}Modifiers`] || e[`${tn(t)}Modifiers`];
function dc(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || Te;
  let r = n;
  const i = t.startsWith("update:"), o = i && hc(s, t.slice(7));
  o && (o.trim && (r = n.map((u) => De(u) ? u.trim() : u)), o.number && (r = n.map(Xs)));
  let l, a = s[l = Bs(t)] || // also try camelCase event handler (#2249)
  s[l = Bs(Jt(t))];
  !a && i && (a = s[l = Bs(tn(t))]), a && Ot(
    a,
    e,
    6,
    r
  );
  const f = s[l + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ot(
      f,
      e,
      6,
      r
    );
  }
}
function Jo(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, l = !1;
  if (!ee(e)) {
    const a = (f) => {
      const u = Jo(f, t, !0);
      u && (l = !0, Ge(o, u));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !l ? (Pe(e) && s.set(e, null), null) : (X(i) ? i.forEach((a) => o[a] = null) : Ge(o, i), Pe(e) && s.set(e, o), o);
}
function Cs(e, t) {
  return !e || !ys(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ve(e, t[0].toLowerCase() + t.slice(1)) || ve(e, tn(t)) || ve(e, t));
}
function xi(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    propsOptions: [i],
    slots: o,
    attrs: l,
    emit: a,
    render: f,
    renderCache: u,
    props: m,
    data: b,
    setupState: I,
    ctx: N,
    inheritAttrs: D
  } = e, ke = fs(e);
  let se, me;
  try {
    if (n.shapeFlag & 4) {
      const V = r || s, ce = V;
      se = Et(
        f.call(
          ce,
          V,
          u,
          m,
          I,
          b,
          N
        )
      ), me = l;
    } else {
      const V = t;
      se = Et(
        V.length > 1 ? V(
          m,
          { attrs: l, slots: o, emit: a }
        ) : V(
          m,
          null
        )
      ), me = t.props ? l : pc(l);
    }
  } catch (V) {
    Fn.length = 0, xs(V, e, 1), se = Rt(Xt);
  }
  let _e = se;
  if (me && D !== !1) {
    const V = Object.keys(me), { shapeFlag: ce } = _e;
    V.length && ce & 7 && (i && V.some(vr) && (me = gc(
      me,
      i
    )), _e = bn(_e, me, !1, !0));
  }
  return n.dirs && (_e = bn(_e, null, !1, !0), _e.dirs = _e.dirs ? _e.dirs.concat(n.dirs) : n.dirs), n.transition && Lr(_e, n.transition), se = _e, fs(ke), se;
}
const pc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ys(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, gc = (e, t) => {
  const n = {};
  for (const s in e)
    (!vr(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function mc(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: l, patchFlag: a } = t, f = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? Si(s, o, f) : !!o;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let m = 0; m < u.length; m++) {
        const b = u[m];
        if (o[b] !== s[b] && !Cs(f, b))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? Si(s, o, f) : !0 : !!o;
  return !1;
}
function Si(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !Cs(n, i))
      return !0;
  }
  return !1;
}
function _c({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Qo = (e) => e.__isSuspense;
function yc(e, t) {
  t && t.pendingBranch ? X(e) ? t.effects.push(...e) : t.effects.push(e) : Ea(e);
}
const Ne = Symbol.for("v-fgt"), Ts = Symbol.for("v-txt"), Xt = Symbol.for("v-cmt"), es = Symbol.for("v-stc"), Fn = [];
let ot = null;
function L(e = !1) {
  Fn.push(ot = e ? null : []);
}
function bc() {
  Fn.pop(), ot = Fn[Fn.length - 1] || null;
}
let qn = 1;
function Ci(e, t = !1) {
  qn += e, e < 0 && ot && t && (ot.hasOnce = !0);
}
function Xo(e) {
  return e.dynamicChildren = qn > 0 ? ot || pn : null, bc(), qn > 0 && ot && ot.push(e), e;
}
function $(e, t, n, s, r, i) {
  return Xo(
    k(
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
function vc(e, t, n, s, r) {
  return Xo(
    Rt(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function el(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function kn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const tl = ({ key: e }) => e ?? null, ts = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? De(e) || Ze(e) || ee(e) ? { i: ft, r: e, k: t, f: !!n } : e : null);
function k(e, t = null, n = null, s = 0, r = null, i = e === Ne ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && tl(t),
    ref: t && ts(t),
    scopeId: Oo,
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
    ctx: ft
  };
  return l ? (Br(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= De(n) ? 8 : 16), qn > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ot && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && ot.push(a), a;
}
const Rt = wc;
function wc(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === Ua) && (e = Xt), el(e)) {
    const l = bn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Br(l, n), qn > 0 && !i && ot && (l.shapeFlag & 6 ? ot[ot.indexOf(e)] = l : ot.push(l)), l.patchFlag = -2, l;
  }
  if (Pc(e) && (e = e.__vccOpts), t) {
    t = kc(t);
    let { class: l, style: a } = t;
    l && !De(l) && (t.class = Oe(l)), Pe(a) && (Ir(a) && !X(a) && (a = Ge({}, a)), t.style = Ee(a));
  }
  const o = De(e) ? 1 : Qo(e) ? 128 : Ia(e) ? 64 : Pe(e) ? 4 : ee(e) ? 2 : 0;
  return k(
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
function kc(e) {
  return e ? Ir(e) || Vo(e) ? Ge({}, e) : e : null;
}
function bn(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: a } = e, f = t ? Sc(r || {}, t) : r, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && tl(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? X(i) ? i.concat(ts(t)) : [i, ts(t)] : ts(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ne ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && bn(e.ssContent),
    ssFallback: e.ssFallback && bn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && Lr(
    u,
    a.clone(u)
  ), u;
}
function _t(e = " ", t = 0) {
  return Rt(Ts, null, e, t);
}
function xc(e, t) {
  const n = Rt(es, null, e);
  return n.staticCount = t, n;
}
function ae(e = "", t = !1) {
  return t ? (L(), vc(Xt, null, e)) : Rt(Xt, null, e);
}
function Et(e) {
  return e == null || typeof e == "boolean" ? Rt(Xt) : X(e) ? Rt(
    Ne,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : el(e) ? Zt(e) : Rt(Ts, null, String(e));
}
function Zt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : bn(e);
}
function Br(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (X(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Br(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Vo(t) ? t._ctx = ft : r === 3 && ft && (ft.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else ee(t) ? (t = { default: t, _ctx: ft }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [_t(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Sc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Oe([t.class, s.class]));
      else if (r === "style")
        t.style = Ee([t.style, s.style]);
      else if (ys(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(X(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function St(e, t, n, s = null) {
  Ot(e, t, 7, [
    n,
    s
  ]);
}
const Cc = Mo();
let Tc = 0;
function Ec(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || Cc, i = {
    uid: Tc++,
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
    scope: new Yl(
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
    propsOptions: Uo(s, r),
    emitsOptions: Jo(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Te,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: Te,
    data: Te,
    props: Te,
    attrs: Te,
    slots: Te,
    refs: Te,
    setupState: Te,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = dc.bind(null, i), e.ce && e.ce(i), i;
}
let Xe = null;
const Ac = () => Xe || ft;
let ds, ar;
{
  const e = ws(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  ds = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Xe = n
  ), ar = t(
    "__VUE_SSR_SETTERS__",
    (n) => Vn = n
  );
}
const Un = (e) => {
  const t = Xe;
  return ds(e), e.scope.on(), () => {
    e.scope.off(), ds(t);
  };
}, Ti = () => {
  Xe && Xe.scope.off(), ds(null);
};
function nl(e) {
  return e.vnode.shapeFlag & 4;
}
let Vn = !1;
function Rc(e, t = !1, n = !1) {
  t && ar(t);
  const { props: s, children: r } = e.vnode, i = nl(e);
  Xa(e, s, i, t), sc(e, r, n || t);
  const o = i ? Ic(e, t) : void 0;
  return t && ar(!1), o;
}
function Ic(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ja);
  const { setup: s } = n;
  if (s) {
    Vt();
    const r = e.setupContext = s.length > 1 ? Lc(e) : null, i = Un(e), o = Hn(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = no(o);
    if (Ht(), i(), (l || e.sp) && !Pn(e) && Lo(e), l) {
      if (o.then(Ti, Ti), t)
        return o.then((a) => {
          Ei(e, a);
        }).catch((a) => {
          xs(a, e, 0);
        });
      e.asyncDep = o;
    } else
      Ei(e, o);
  } else
    sl(e);
}
function Ei(e, t, n) {
  ee(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Pe(t) && (e.setupState = Co(t)), sl(e);
}
function sl(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || At);
  {
    const r = Un(e);
    Vt();
    try {
      za(e);
    } finally {
      Ht(), r();
    }
  }
}
const Oc = {
  get(e, t) {
    return Ke(e, "get", ""), e[t];
  }
};
function Lc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Oc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Es(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Co(_a(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in $n)
        return $n[n](e);
    },
    has(t, n) {
      return n in t || n in $n;
    }
  })) : e.proxy;
}
function Pc(e) {
  return ee(e) && "__vccOpts" in e;
}
const Ve = (e, t) => ka(e, t, Vn), $c = "3.5.18";
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let cr;
const Ai = typeof window < "u" && window.trustedTypes;
if (Ai)
  try {
    cr = /* @__PURE__ */ Ai.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const rl = cr ? (e) => cr.createHTML(e) : (e) => e, Fc = "http://www.w3.org/2000/svg", Bc = "http://www.w3.org/1998/Math/MathML", Bt = typeof document < "u" ? document : null, Ri = Bt && /* @__PURE__ */ Bt.createElement("template"), Nc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? Bt.createElementNS(Fc, e) : t === "mathml" ? Bt.createElementNS(Bc, e) : n ? Bt.createElement(e, { is: n }) : Bt.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => Bt.createTextNode(e),
  createComment: (e) => Bt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Bt.querySelector(e),
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
      Ri.innerHTML = rl(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Ri.content;
      if (s === "svg" || s === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Mc = Symbol("_vtc");
function Dc(e, t, n) {
  const s = e[Mc];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ii = Symbol("_vod"), qc = Symbol("_vsh"), Vc = Symbol(""), Hc = /(^|;)\s*display\s*:/;
function Uc(e, t, n) {
  const s = e.style, r = De(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (De(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && ns(s, l, "");
        }
      else
        for (const o in t)
          n[o] == null && ns(s, o, "");
    for (const o in n)
      o === "display" && (i = !0), ns(s, o, n[o]);
  } else if (r) {
    if (t !== n) {
      const o = s[Vc];
      o && (n += ";" + o), s.cssText = n, i = Hc.test(n);
    }
  } else t && e.removeAttribute("style");
  Ii in e && (e[Ii] = i ? s.display : "", e[qc] && (s.display = "none"));
}
const Oi = /\s*!important$/;
function ns(e, t, n) {
  if (X(n))
    n.forEach((s) => ns(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = jc(e, t);
    Oi.test(n) ? e.setProperty(
      tn(s),
      n.replace(Oi, ""),
      "important"
    ) : e[s] = n;
  }
}
const Li = ["Webkit", "Moz", "ms"], Us = {};
function jc(e, t) {
  const n = Us[t];
  if (n)
    return n;
  let s = Jt(t);
  if (s !== "filter" && s in e)
    return Us[t] = s;
  s = io(s);
  for (let r = 0; r < Li.length; r++) {
    const i = Li[r] + s;
    if (i in e)
      return Us[t] = i;
  }
  return t;
}
const Pi = "http://www.w3.org/1999/xlink";
function $i(e, t, n, s, r, i = Gl(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Pi, t.slice(6, t.length)) : e.setAttributeNS(Pi, t, n) : n == null || i && !oo(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : en(n) ? String(n) : n
  );
}
function Fi(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? rl(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = oo(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function dn(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function zc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Bi = Symbol("_vei");
function Wc(e, t, n, s, r = null) {
  const i = e[Bi] || (e[Bi] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [l, a] = Kc(t);
    if (s) {
      const f = i[t] = Yc(
        s,
        r
      );
      dn(e, l, f, a);
    } else o && (zc(e, l, o, a), i[t] = void 0);
  }
}
const Ni = /(?:Once|Passive|Capture)$/;
function Kc(e) {
  let t;
  if (Ni.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Ni); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : tn(e.slice(2)), t];
}
let js = 0;
const Zc = /* @__PURE__ */ Promise.resolve(), Gc = () => js || (Zc.then(() => js = 0), js = Date.now());
function Yc(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Ot(
      Jc(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Gc(), n;
}
function Jc(e, t) {
  if (X(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (r) => !r._stopped && s && s(r)
    );
  } else
    return t;
}
const Mi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Qc = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? Dc(e, s, o) : t === "style" ? Uc(e, n, s) : ys(t) ? vr(t) || Wc(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Xc(e, t, s, o)) ? (Fi(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && $i(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !De(s)) ? Fi(e, Jt(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), $i(e, t, s, o));
};
function Xc(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Mi(t) && ee(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Mi(t) && De(n) ? !1 : t in e;
}
const Di = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return X(t) ? (n) => Jn(t, n) : t;
};
function eu(e) {
  e.target.composing = !0;
}
function qi(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const zs = Symbol("_assign"), on = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e[zs] = Di(r);
    const i = s || r.props && r.props.type === "number";
    dn(e, t ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let l = e.value;
      n && (l = l.trim()), i && (l = Xs(l)), e[zs](l);
    }), n && dn(e, "change", () => {
      e.value = e.value.trim();
    }), t || (dn(e, "compositionstart", eu), dn(e, "compositionend", qi), dn(e, "change", qi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[zs] = Di(o), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? Xs(e.value) : e.value, a = t ?? "";
    l !== a && (document.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === a) || (e.value = a));
  }
}, tu = ["ctrl", "shift", "alt", "meta"], nu = {
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
  exact: (e, t) => tu.some((n) => e[`${n}Key`] && !t.includes(n))
}, Vi = (e, t) => {
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = nu[t[o]];
      if (l && l(r, t)) return;
    }
    return e(r, ...i);
  });
}, su = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Hi = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = (r) => {
    if (!("key" in r))
      return;
    const i = tn(r.key);
    if (t.some(
      (o) => o === i || su[o] === i
    ))
      return e(r);
  });
}, ru = /* @__PURE__ */ Ge({ patchProp: Qc }, Nc);
let Ui;
function iu() {
  return Ui || (Ui = ic(ru));
}
const ou = (...e) => {
  const t = iu().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = au(s);
    if (!r) return;
    const i = t._component;
    !ee(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, lu(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
};
function lu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function au(e) {
  return De(e) ? document.querySelector(e) : e;
}
const Wt = (e) => {
  const t = e.replace("#", ""), n = parseInt(t.substr(0, 2), 16), s = parseInt(t.substr(2, 2), 16), r = parseInt(t.substr(4, 2), 16);
  return (n * 299 + s * 587 + r * 114) / 1e3 < 128;
}, cu = (e, t) => {
  const n = e.replace("#", ""), s = parseInt(n.substr(0, 2), 16), r = parseInt(n.substr(2, 2), 16), i = parseInt(n.substr(4, 2), 16), o = Wt(e), l = o ? Math.min(255, s + t) : Math.max(0, s - t), a = o ? Math.min(255, r + t) : Math.max(0, r - t), f = o ? Math.min(255, i + t) : Math.max(0, i - t);
  return `#${l.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}${f.toString(16).padStart(2, "0")}`;
}, xn = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e), uu = (e) => {
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
function Nr() {
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
var un = Nr();
function il(e) {
  un = e;
}
var Bn = { exec: () => null };
function we(e, t = "") {
  let n = typeof e == "string" ? e : e.source;
  const s = {
    replace: (r, i) => {
      let o = typeof i == "string" ? i : i.source;
      return o = o.replace(et.caret, "$1"), n = n.replace(r, o), s;
    },
    getRegex: () => new RegExp(n, t)
  };
  return s;
}
var et = {
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
}, fu = /^(?:[ \t]*(?:\n|$))+/, hu = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, du = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, jn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, pu = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Mr = /(?:[*+-]|\d{1,9}[.)])/, ol = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, ll = we(ol).replace(/bull/g, Mr).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), gu = we(ol).replace(/bull/g, Mr).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Dr = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, mu = /^[^\n]+/, qr = /(?!\s*\])(?:\\.|[^\[\]\\])+/, _u = we(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", qr).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), yu = we(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Mr).getRegex(), As = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Vr = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, bu = we(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", Vr).replace("tag", As).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), al = we(Dr).replace("hr", jn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", As).getRegex(), vu = we(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", al).getRegex(), Hr = {
  blockquote: vu,
  code: hu,
  def: _u,
  fences: du,
  heading: pu,
  hr: jn,
  html: bu,
  lheading: ll,
  list: yu,
  newline: fu,
  paragraph: al,
  table: Bn,
  text: mu
}, ji = we(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", jn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", As).getRegex(), wu = {
  ...Hr,
  lheading: gu,
  table: ji,
  paragraph: we(Dr).replace("hr", jn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ji).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", As).getRegex()
}, ku = {
  ...Hr,
  html: we(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", Vr).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Bn,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: we(Dr).replace("hr", jn).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", ll).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, xu = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Su = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, cl = /^( {2,}|\\)\n(?!\s*$)/, Cu = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Rs = /[\p{P}\p{S}]/u, Ur = /[\s\p{P}\p{S}]/u, ul = /[^\s\p{P}\p{S}]/u, Tu = we(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Ur).getRegex(), fl = /(?!~)[\p{P}\p{S}]/u, Eu = /(?!~)[\s\p{P}\p{S}]/u, Au = /(?:[^\s\p{P}\p{S}]|~)/u, Ru = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, hl = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Iu = we(hl, "u").replace(/punct/g, Rs).getRegex(), Ou = we(hl, "u").replace(/punct/g, fl).getRegex(), dl = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Lu = we(dl, "gu").replace(/notPunctSpace/g, ul).replace(/punctSpace/g, Ur).replace(/punct/g, Rs).getRegex(), Pu = we(dl, "gu").replace(/notPunctSpace/g, Au).replace(/punctSpace/g, Eu).replace(/punct/g, fl).getRegex(), $u = we(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, ul).replace(/punctSpace/g, Ur).replace(/punct/g, Rs).getRegex(), Fu = we(/\\(punct)/, "gu").replace(/punct/g, Rs).getRegex(), Bu = we(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Nu = we(Vr).replace("(?:-->|$)", "-->").getRegex(), Mu = we(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", Nu).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), ps = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, Du = we(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", ps).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), pl = we(/^!?\[(label)\]\[(ref)\]/).replace("label", ps).replace("ref", qr).getRegex(), gl = we(/^!?\[(ref)\](?:\[\])?/).replace("ref", qr).getRegex(), qu = we("reflink|nolink(?!\\()", "g").replace("reflink", pl).replace("nolink", gl).getRegex(), jr = {
  _backpedal: Bn,
  // only used for GFM url
  anyPunctuation: Fu,
  autolink: Bu,
  blockSkip: Ru,
  br: cl,
  code: Su,
  del: Bn,
  emStrongLDelim: Iu,
  emStrongRDelimAst: Lu,
  emStrongRDelimUnd: $u,
  escape: xu,
  link: Du,
  nolink: gl,
  punctuation: Tu,
  reflink: pl,
  reflinkSearch: qu,
  tag: Mu,
  text: Cu,
  url: Bn
}, Vu = {
  ...jr,
  link: we(/^!?\[(label)\]\((.*?)\)/).replace("label", ps).getRegex(),
  reflink: we(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", ps).getRegex()
}, ur = {
  ...jr,
  emStrongRDelimAst: Pu,
  emStrongLDelim: Ou,
  url: we(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Hu = {
  ...ur,
  br: we(cl).replace("{2,}", "*").getRegex(),
  text: we(ur.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Zn = {
  normal: Hr,
  gfm: wu,
  pedantic: ku
}, Sn = {
  normal: jr,
  gfm: ur,
  breaks: Hu,
  pedantic: Vu
}, Uu = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, zi = (e) => Uu[e];
function Ct(e, t) {
  if (t) {
    if (et.escapeTest.test(e))
      return e.replace(et.escapeReplace, zi);
  } else if (et.escapeTestNoEncode.test(e))
    return e.replace(et.escapeReplaceNoEncode, zi);
  return e;
}
function Wi(e) {
  try {
    e = encodeURI(e).replace(et.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function Ki(e, t) {
  var i;
  const n = e.replace(et.findPipe, (o, l, a) => {
    let f = !1, u = l;
    for (; --u >= 0 && a[u] === "\\"; ) f = !f;
    return f ? "|" : " |";
  }), s = n.split(et.splitPipe);
  let r = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((i = s.at(-1)) != null && i.trim()) && s.pop(), t)
    if (s.length > t)
      s.splice(t);
    else
      for (; s.length < t; ) s.push("");
  for (; r < s.length; r++)
    s[r] = s[r].trim().replace(et.slashPipe, "|");
  return s;
}
function Cn(e, t, n) {
  const s = e.length;
  if (s === 0)
    return "";
  let r = 0;
  for (; r < s && e.charAt(s - r - 1) === t; )
    r++;
  return e.slice(0, s - r);
}
function ju(e, t) {
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
function Zi(e, t, n, s, r) {
  const i = t.href, o = t.title || null, l = e[1].replace(r.other.outputLinkReplace, "$1");
  s.state.inLink = !0;
  const a = {
    type: e[0].charAt(0) === "!" ? "image" : "link",
    raw: n,
    href: i,
    title: o,
    text: l,
    tokens: s.inlineTokens(l)
  };
  return s.state.inLink = !1, a;
}
function zu(e, t, n) {
  const s = e.match(n.other.indentCodeCompensation);
  if (s === null)
    return t;
  const r = s[1];
  return t.split(`
`).map((i) => {
    const o = i.match(n.other.beginningSpace);
    if (o === null)
      return i;
    const [l] = o;
    return l.length >= r.length ? i.slice(r.length) : i;
  }).join(`
`);
}
var gs = class {
  // set by the lexer
  constructor(e) {
    Ce(this, "options");
    Ce(this, "rules");
    // set by the lexer
    Ce(this, "lexer");
    this.options = e || un;
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
        text: this.options.pedantic ? n : Cn(n, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const n = t[0], s = zu(n, t[3] || "", this.rules);
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
        const s = Cn(n, "#");
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
        raw: Cn(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = Cn(t[0], `
`).split(`
`), s = "", r = "";
      const i = [];
      for (; n.length > 0; ) {
        let o = !1;
        const l = [];
        let a;
        for (a = 0; a < n.length; a++)
          if (this.rules.other.blockquoteStart.test(n[a]))
            l.push(n[a]), o = !0;
          else if (!o)
            l.push(n[a]);
          else
            break;
        n = n.slice(a);
        const f = l.join(`
`), u = f.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${f}` : f, r = r ? `${r}
${u}` : u;
        const m = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(u, i, !0), this.lexer.state.top = m, n.length === 0)
          break;
        const b = i.at(-1);
        if ((b == null ? void 0 : b.type) === "code")
          break;
        if ((b == null ? void 0 : b.type) === "blockquote") {
          const I = b, N = I.raw + `
` + n.join(`
`), D = this.blockquote(N);
          i[i.length - 1] = D, s = s.substring(0, s.length - I.raw.length) + D.raw, r = r.substring(0, r.length - I.text.length) + D.text;
          break;
        } else if ((b == null ? void 0 : b.type) === "list") {
          const I = b, N = I.raw + `
` + n.join(`
`), D = this.list(N);
          i[i.length - 1] = D, s = s.substring(0, s.length - b.raw.length) + D.raw, r = r.substring(0, r.length - I.raw.length) + D.raw, n = N.substring(i.at(-1).raw.length).split(`
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
        let a = !1, f = "", u = "";
        if (!(t = i.exec(e)) || this.rules.block.hr.test(e))
          break;
        f = t[0], e = e.substring(f.length);
        let m = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (se) => " ".repeat(3 * se.length)), b = e.split(`
`, 1)[0], I = !m.trim(), N = 0;
        if (this.options.pedantic ? (N = 2, u = m.trimStart()) : I ? N = t[1].length + 1 : (N = t[2].search(this.rules.other.nonSpaceChar), N = N > 4 ? 1 : N, u = m.slice(N), N += t[1].length), I && this.rules.other.blankLine.test(b) && (f += b + `
`, e = e.substring(b.length + 1), a = !0), !a) {
          const se = this.rules.other.nextBulletRegex(N), me = this.rules.other.hrRegex(N), _e = this.rules.other.fencesBeginRegex(N), V = this.rules.other.headingBeginRegex(N), ce = this.rules.other.htmlBeginRegex(N);
          for (; e; ) {
            const qe = e.split(`
`, 1)[0];
            let de;
            if (b = qe, this.options.pedantic ? (b = b.replace(this.rules.other.listReplaceNesting, "  "), de = b) : de = b.replace(this.rules.other.tabCharGlobal, "    "), _e.test(b) || V.test(b) || ce.test(b) || se.test(b) || me.test(b))
              break;
            if (de.search(this.rules.other.nonSpaceChar) >= N || !b.trim())
              u += `
` + de.slice(N);
            else {
              if (I || m.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || _e.test(m) || V.test(m) || me.test(m))
                break;
              u += `
` + b;
            }
            !I && !b.trim() && (I = !0), f += qe + `
`, e = e.substring(qe.length + 1), m = de.slice(N);
          }
        }
        r.loose || (o ? r.loose = !0 : this.rules.other.doubleBlankLine.test(f) && (o = !0));
        let D = null, ke;
        this.options.gfm && (D = this.rules.other.listIsTask.exec(u), D && (ke = D[0] !== "[ ] ", u = u.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: f,
          task: !!D,
          checked: ke,
          loose: !1,
          text: u,
          tokens: []
        }), r.raw += f;
      }
      const l = r.items.at(-1);
      if (l)
        l.raw = l.raw.trimEnd(), l.text = l.text.trimEnd();
      else
        return;
      r.raw = r.raw.trimEnd();
      for (let a = 0; a < r.items.length; a++)
        if (this.lexer.state.top = !1, r.items[a].tokens = this.lexer.blockTokens(r.items[a].text, []), !r.loose) {
          const f = r.items[a].tokens.filter((m) => m.type === "space"), u = f.length > 0 && f.some((m) => this.rules.other.anyLine.test(m.raw));
          r.loose = u;
        }
      if (r.loose)
        for (let a = 0; a < r.items.length; a++)
          r.items[a].loose = !0;
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
    const n = Ki(t[1]), s = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (o = t[3]) != null && o.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i = {
      type: "table",
      raw: t[0],
      header: [],
      align: [],
      rows: []
    };
    if (n.length === s.length) {
      for (const l of s)
        this.rules.other.tableAlignRight.test(l) ? i.align.push("right") : this.rules.other.tableAlignCenter.test(l) ? i.align.push("center") : this.rules.other.tableAlignLeft.test(l) ? i.align.push("left") : i.align.push(null);
      for (let l = 0; l < n.length; l++)
        i.header.push({
          text: n[l],
          tokens: this.lexer.inline(n[l]),
          header: !0,
          align: i.align[l]
        });
      for (const l of r)
        i.rows.push(Ki(l, i.header.length).map((a, f) => ({
          text: a,
          tokens: this.lexer.inline(a),
          header: !1,
          align: i.align[f]
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
        const i = Cn(n.slice(0, -1), "\\");
        if ((n.length - i.length) % 2 === 0)
          return;
      } else {
        const i = ju(t[2], "()");
        if (i === -2)
          return;
        if (i > -1) {
          const l = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + i;
          t[2] = t[2].substring(0, i), t[0] = t[0].substring(0, l).trim(), t[3] = "";
        }
      }
      let s = t[2], r = "";
      if (this.options.pedantic) {
        const i = this.rules.other.pedanticHrefTitle.exec(s);
        i && (s = i[1], r = i[3]);
      } else
        r = t[3] ? t[3].slice(1, -1) : "";
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), Zi(t, {
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
      return Zi(n, r, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let s = this.rules.inline.emStrongLDelim.exec(e);
    if (!s || s[3] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(s[1] || s[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      const i = [...s[0]].length - 1;
      let o, l, a = i, f = 0;
      const u = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (u.lastIndex = 0, t = t.slice(-1 * e.length + i); (s = u.exec(t)) != null; ) {
        if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o) continue;
        if (l = [...o].length, s[3] || s[4]) {
          a += l;
          continue;
        } else if ((s[5] || s[6]) && i % 3 && !((i + l) % 3)) {
          f += l;
          continue;
        }
        if (a -= l, a > 0) continue;
        l = Math.min(l, l + a + f);
        const m = [...s[0]][0].length, b = e.slice(0, i + s.index + m + l);
        if (Math.min(i, l) % 2) {
          const N = b.slice(1, -1);
          return {
            type: "em",
            raw: b,
            text: N,
            tokens: this.lexer.inlineTokens(N)
          };
        }
        const I = b.slice(2, -2);
        return {
          type: "strong",
          raw: b,
          text: I,
          tokens: this.lexer.inlineTokens(I)
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
}, Dt = class fr {
  constructor(t) {
    Ce(this, "tokens");
    Ce(this, "options");
    Ce(this, "state");
    Ce(this, "tokenizer");
    Ce(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || un, this.options.tokenizer = this.options.tokenizer || new gs(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      other: et,
      block: Zn.normal,
      inline: Sn.normal
    };
    this.options.pedantic ? (n.block = Zn.pedantic, n.inline = Sn.pedantic) : this.options.gfm && (n.block = Zn.gfm, this.options.breaks ? n.inline = Sn.breaks : n.inline = Sn.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: Zn,
      inline: Sn
    };
  }
  /**
   * Static Lex Method
   */
  static lex(t, n) {
    return new fr(n).lex(t);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(t, n) {
    return new fr(n).inlineTokens(t);
  }
  /**
   * Preprocessing
   */
  lex(t) {
    t = t.replace(et.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const s = this.inlineQueue[n];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, n = [], s = !1) {
    var r, i, o;
    for (this.options.pedantic && (t = t.replace(et.tabCharGlobal, "    ").replace(et.spaceLine, "")); t; ) {
      let l;
      if ((i = (r = this.options.extensions) == null ? void 0 : r.block) != null && i.some((f) => (l = f.call({ lexer: this }, t, n)) ? (t = t.substring(l.raw.length), n.push(l), !0) : !1))
        continue;
      if (l = this.tokenizer.space(t)) {
        t = t.substring(l.raw.length);
        const f = n.at(-1);
        l.raw.length === 1 && f !== void 0 ? f.raw += `
` : n.push(l);
        continue;
      }
      if (l = this.tokenizer.code(t)) {
        t = t.substring(l.raw.length);
        const f = n.at(-1);
        (f == null ? void 0 : f.type) === "paragraph" || (f == null ? void 0 : f.type) === "text" ? (f.raw += `
` + l.raw, f.text += `
` + l.text, this.inlineQueue.at(-1).src = f.text) : n.push(l);
        continue;
      }
      if (l = this.tokenizer.fences(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.heading(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.hr(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.blockquote(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.list(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.html(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.def(t)) {
        t = t.substring(l.raw.length);
        const f = n.at(-1);
        (f == null ? void 0 : f.type) === "paragraph" || (f == null ? void 0 : f.type) === "text" ? (f.raw += `
` + l.raw, f.text += `
` + l.raw, this.inlineQueue.at(-1).src = f.text) : this.tokens.links[l.tag] || (this.tokens.links[l.tag] = {
          href: l.href,
          title: l.title
        });
        continue;
      }
      if (l = this.tokenizer.table(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.lheading(t)) {
        t = t.substring(l.raw.length), n.push(l);
        continue;
      }
      let a = t;
      if ((o = this.options.extensions) != null && o.startBlock) {
        let f = 1 / 0;
        const u = t.slice(1);
        let m;
        this.options.extensions.startBlock.forEach((b) => {
          m = b.call({ lexer: this }, u), typeof m == "number" && m >= 0 && (f = Math.min(f, m));
        }), f < 1 / 0 && f >= 0 && (a = t.substring(0, f + 1));
      }
      if (this.state.top && (l = this.tokenizer.paragraph(a))) {
        const f = n.at(-1);
        s && (f == null ? void 0 : f.type) === "paragraph" ? (f.raw += `
` + l.raw, f.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = f.text) : n.push(l), s = a.length !== t.length, t = t.substring(l.raw.length);
        continue;
      }
      if (l = this.tokenizer.text(t)) {
        t = t.substring(l.raw.length);
        const f = n.at(-1);
        (f == null ? void 0 : f.type) === "text" ? (f.raw += `
` + l.raw, f.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = f.text) : n.push(l);
        continue;
      }
      if (t) {
        const f = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(f);
          break;
        } else
          throw new Error(f);
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
    var l, a, f;
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
      if ((a = (l = this.options.extensions) == null ? void 0 : l.inline) != null && a.some((b) => (u = b.call({ lexer: this }, t, n)) ? (t = t.substring(u.raw.length), n.push(u), !0) : !1))
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
        const b = n.at(-1);
        u.type === "text" && (b == null ? void 0 : b.type) === "text" ? (b.raw += u.raw, b.text += u.text) : n.push(u);
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
      let m = t;
      if ((f = this.options.extensions) != null && f.startInline) {
        let b = 1 / 0;
        const I = t.slice(1);
        let N;
        this.options.extensions.startInline.forEach((D) => {
          N = D.call({ lexer: this }, I), typeof N == "number" && N >= 0 && (b = Math.min(b, N));
        }), b < 1 / 0 && b >= 0 && (m = t.substring(0, b + 1));
      }
      if (u = this.tokenizer.inlineText(m)) {
        t = t.substring(u.raw.length), u.raw.slice(-1) !== "_" && (o = u.raw.slice(-1)), i = !0;
        const b = n.at(-1);
        (b == null ? void 0 : b.type) === "text" ? (b.raw += u.raw, b.text += u.text) : n.push(u);
        continue;
      }
      if (t) {
        const b = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(b);
          break;
        } else
          throw new Error(b);
      }
    }
    return n;
  }
}, ms = class {
  // set by the parser
  constructor(e) {
    Ce(this, "options");
    Ce(this, "parser");
    this.options = e || un;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    var i;
    const s = (i = (t || "").match(et.notSpaceStart)) == null ? void 0 : i[0], r = e.replace(et.endingNewline, "") + `
`;
    return s ? '<pre><code class="language-' + Ct(s) + '">' + (n ? r : Ct(r, !0)) + `</code></pre>
` : "<pre><code>" + (n ? r : Ct(r, !0)) + `</code></pre>
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
      const l = e.items[o];
      s += this.listitem(l);
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
      e.loose ? ((n = e.tokens[0]) == null ? void 0 : n.type) === "paragraph" ? (e.tokens[0].text = s + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = s + " " + Ct(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
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
    return `<code>${Ct(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    const s = this.parser.parseInline(n), r = Wi(e);
    if (r === null)
      return s;
    e = r;
    let i = '<a href="' + e + '"';
    return t && (i += ' title="' + Ct(t) + '"'), i += ">" + s + "</a>", i;
  }
  image({ href: e, title: t, text: n, tokens: s }) {
    s && (n = this.parser.parseInline(s, this.parser.textRenderer));
    const r = Wi(e);
    if (r === null)
      return Ct(n);
    e = r;
    let i = `<img src="${e}" alt="${n}"`;
    return t && (i += ` title="${Ct(t)}"`), i += ">", i;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : Ct(e.text);
  }
}, zr = class {
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
}, qt = class hr {
  constructor(t) {
    Ce(this, "options");
    Ce(this, "renderer");
    Ce(this, "textRenderer");
    this.options = t || un, this.options.renderer = this.options.renderer || new ms(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new zr();
  }
  /**
   * Static Parse Method
   */
  static parse(t, n) {
    return new hr(n).parse(t);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(t, n) {
    return new hr(n).parseInline(t);
  }
  /**
   * Parse Loop
   */
  parse(t, n = !0) {
    var r, i;
    let s = "";
    for (let o = 0; o < t.length; o++) {
      const l = t[o];
      if ((i = (r = this.options.extensions) == null ? void 0 : r.renderers) != null && i[l.type]) {
        const f = l, u = this.options.extensions.renderers[f.type].call({ parser: this }, f);
        if (u !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(f.type)) {
          s += u || "";
          continue;
        }
      }
      const a = l;
      switch (a.type) {
        case "space": {
          s += this.renderer.space(a);
          continue;
        }
        case "hr": {
          s += this.renderer.hr(a);
          continue;
        }
        case "heading": {
          s += this.renderer.heading(a);
          continue;
        }
        case "code": {
          s += this.renderer.code(a);
          continue;
        }
        case "table": {
          s += this.renderer.table(a);
          continue;
        }
        case "blockquote": {
          s += this.renderer.blockquote(a);
          continue;
        }
        case "list": {
          s += this.renderer.list(a);
          continue;
        }
        case "html": {
          s += this.renderer.html(a);
          continue;
        }
        case "paragraph": {
          s += this.renderer.paragraph(a);
          continue;
        }
        case "text": {
          let f = a, u = this.renderer.text(f);
          for (; o + 1 < t.length && t[o + 1].type === "text"; )
            f = t[++o], u += `
` + this.renderer.text(f);
          n ? s += this.renderer.paragraph({
            type: "paragraph",
            raw: u,
            text: u,
            tokens: [{ type: "text", raw: u, text: u, escaped: !0 }]
          }) : s += u;
          continue;
        }
        default: {
          const f = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent)
            return console.error(f), "";
          throw new Error(f);
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
      const l = t[o];
      if ((i = (r = this.options.extensions) == null ? void 0 : r.renderers) != null && i[l.type]) {
        const f = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (f !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(l.type)) {
          s += f || "";
          continue;
        }
      }
      const a = l;
      switch (a.type) {
        case "escape": {
          s += n.text(a);
          break;
        }
        case "html": {
          s += n.html(a);
          break;
        }
        case "link": {
          s += n.link(a);
          break;
        }
        case "image": {
          s += n.image(a);
          break;
        }
        case "strong": {
          s += n.strong(a);
          break;
        }
        case "em": {
          s += n.em(a);
          break;
        }
        case "codespan": {
          s += n.codespan(a);
          break;
        }
        case "br": {
          s += n.br(a);
          break;
        }
        case "del": {
          s += n.del(a);
          break;
        }
        case "text": {
          s += n.text(a);
          break;
        }
        default: {
          const f = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent)
            return console.error(f), "";
          throw new Error(f);
        }
      }
    }
    return s;
  }
}, Js, ss = (Js = class {
  constructor(e) {
    Ce(this, "options");
    Ce(this, "block");
    this.options = e || un;
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
    return this.block ? Dt.lex : Dt.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? qt.parse : qt.parseInline;
  }
}, Ce(Js, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
])), Js), Wu = class {
  constructor(...e) {
    Ce(this, "defaults", Nr());
    Ce(this, "options", this.setOptions);
    Ce(this, "parse", this.parseMarkdown(!0));
    Ce(this, "parseInline", this.parseMarkdown(!1));
    Ce(this, "Parser", qt);
    Ce(this, "Renderer", ms);
    Ce(this, "TextRenderer", zr);
    Ce(this, "Lexer", Dt);
    Ce(this, "Tokenizer", gs);
    Ce(this, "Hooks", ss);
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
          for (const l of o.header)
            n = n.concat(this.walkTokens(l.tokens, t));
          for (const l of o.rows)
            for (const a of l)
              n = n.concat(this.walkTokens(a.tokens, t));
          break;
        }
        case "list": {
          const o = i;
          n = n.concat(this.walkTokens(o.items, t));
          break;
        }
        default: {
          const o = i;
          (r = (s = this.defaults.extensions) == null ? void 0 : s.childTokens) != null && r[o.type] ? this.defaults.extensions.childTokens[o.type].forEach((l) => {
            const a = o[l].flat(1 / 0);
            n = n.concat(this.walkTokens(a, t));
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
            let l = r.renderer.apply(this, o);
            return l === !1 && (l = i.apply(this, o)), l;
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
        const r = this.defaults.renderer || new ms(this.defaults);
        for (const i in n.renderer) {
          if (!(i in r))
            throw new Error(`renderer '${i}' does not exist`);
          if (["options", "parser"].includes(i))
            continue;
          const o = i, l = n.renderer[o], a = r[o];
          r[o] = (...f) => {
            let u = l.apply(r, f);
            return u === !1 && (u = a.apply(r, f)), u || "";
          };
        }
        s.renderer = r;
      }
      if (n.tokenizer) {
        const r = this.defaults.tokenizer || new gs(this.defaults);
        for (const i in n.tokenizer) {
          if (!(i in r))
            throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i))
            continue;
          const o = i, l = n.tokenizer[o], a = r[o];
          r[o] = (...f) => {
            let u = l.apply(r, f);
            return u === !1 && (u = a.apply(r, f)), u;
          };
        }
        s.tokenizer = r;
      }
      if (n.hooks) {
        const r = this.defaults.hooks || new ss();
        for (const i in n.hooks) {
          if (!(i in r))
            throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i))
            continue;
          const o = i, l = n.hooks[o], a = r[o];
          ss.passThroughHooks.has(i) ? r[o] = (f) => {
            if (this.defaults.async)
              return Promise.resolve(l.call(r, f)).then((m) => a.call(r, m));
            const u = l.call(r, f);
            return a.call(r, u);
          } : r[o] = (...f) => {
            let u = l.apply(r, f);
            return u === !1 && (u = a.apply(r, f)), u;
          };
        }
        s.hooks = r;
      }
      if (n.walkTokens) {
        const r = this.defaults.walkTokens, i = n.walkTokens;
        s.walkTokens = function(o) {
          let l = [];
          return l.push(i.call(this, o)), r && (l = l.concat(r.call(this, o))), l;
        };
      }
      this.defaults = { ...this.defaults, ...s };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return Dt.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return qt.parse(e, t ?? this.defaults);
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
      const l = i.hooks ? i.hooks.provideLexer() : e ? Dt.lex : Dt.lexInline, a = i.hooks ? i.hooks.provideParser() : e ? qt.parse : qt.parseInline;
      if (i.async)
        return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n).then((f) => l(f, i)).then((f) => i.hooks ? i.hooks.processAllTokens(f) : f).then((f) => i.walkTokens ? Promise.all(this.walkTokens(f, i.walkTokens)).then(() => f) : f).then((f) => a(f, i)).then((f) => i.hooks ? i.hooks.postprocess(f) : f).catch(o);
      try {
        i.hooks && (n = i.hooks.preprocess(n));
        let f = l(n, i);
        i.hooks && (f = i.hooks.processAllTokens(f)), i.walkTokens && this.walkTokens(f, i.walkTokens);
        let u = a(f, i);
        return i.hooks && (u = i.hooks.postprocess(u)), u;
      } catch (f) {
        return o(f);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const s = "<p>An error occurred:</p><pre>" + Ct(n.message + "", !0) + "</pre>";
        return t ? Promise.resolve(s) : s;
      }
      if (t)
        return Promise.reject(n);
      throw n;
    };
  }
}, cn = new Wu();
function he(e, t) {
  return cn.parse(e, t);
}
he.options = he.setOptions = function(e) {
  return cn.setOptions(e), he.defaults = cn.defaults, il(he.defaults), he;
};
he.getDefaults = Nr;
he.defaults = un;
he.use = function(...e) {
  return cn.use(...e), he.defaults = cn.defaults, il(he.defaults), he;
};
he.walkTokens = function(e, t) {
  return cn.walkTokens(e, t);
};
he.parseInline = cn.parseInline;
he.Parser = qt;
he.parser = qt.parse;
he.Renderer = ms;
he.TextRenderer = zr;
he.Lexer = Dt;
he.lexer = Dt.lex;
he.Tokenizer = gs;
he.Hooks = ss;
he.parse = he;
he.options;
he.setOptions;
he.use;
he.walkTokens;
he.parseInline;
qt.parse;
Dt.lex;
const _s = {
  API_URL: "https://api.chattermate.chat/api/v1",
  WS_URL: "wss://api.chattermate.chat"
};
function Ku(e) {
  const t = Ve(() => ({
    backgroundColor: e.value.chat_background_color || "#ffffff",
    color: Wt(e.value.chat_background_color || "#ffffff") ? "#ffffff" : "#000000"
  })), n = Ve(() => ({
    backgroundColor: e.value.chat_bubble_color || "#f34611",
    color: Wt(e.value.chat_bubble_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), s = Ve(() => {
    const f = e.value.chat_background_color || "#F8F9FA", u = cu(f, 20);
    return {
      backgroundColor: u,
      color: Wt(u) ? "#FFFFFF" : "#000000"
    };
  }), r = Ve(() => ({
    backgroundColor: e.value.accent_color || "#f34611",
    color: Wt(e.value.accent_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), i = Ve(() => ({
    color: Wt(e.value.chat_background_color || "#F8F9FA") ? "#FFFFFF" : "#000000"
  })), o = Ve(() => ({
    borderBottom: `1px solid ${Wt(e.value.chat_background_color || "#F8F9FA") ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`
  })), l = Ve(() => e.value.photo_url ? e.value.photo_url.includes("amazonaws.com") ? e.value.photo_url : `${_s.API_URL}${e.value.photo_url}` : ""), a = Ve(() => {
    const f = e.value.chat_background_color || "#ffffff";
    return {
      boxShadow: `0 8px 5px ${Wt(f) ? "rgba(0, 0, 0, 0.24)" : "rgba(0, 0, 0, 0.12)"}`
    };
  });
  return {
    chatStyles: t,
    chatIconStyles: n,
    agentBubbleStyles: s,
    userBubbleStyles: r,
    messageNameStyles: i,
    headerBorderStyles: o,
    photoUrl: l,
    shadowStyle: a
  };
}
const Lt = /* @__PURE__ */ Object.create(null);
Lt.open = "0";
Lt.close = "1";
Lt.ping = "2";
Lt.pong = "3";
Lt.message = "4";
Lt.upgrade = "5";
Lt.noop = "6";
const rs = /* @__PURE__ */ Object.create(null);
Object.keys(Lt).forEach((e) => {
  rs[Lt[e]] = e;
});
const dr = { type: "error", data: "parser error" }, ml = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", _l = typeof ArrayBuffer == "function", yl = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e && e.buffer instanceof ArrayBuffer, Wr = ({ type: e, data: t }, n, s) => ml && t instanceof Blob ? n ? s(t) : Gi(t, s) : _l && (t instanceof ArrayBuffer || yl(t)) ? n ? s(t) : Gi(new Blob([t]), s) : s(Lt[e] + (t || "")), Gi = (e, t) => {
  const n = new FileReader();
  return n.onload = function() {
    const s = n.result.split(",")[1];
    t("b" + (s || ""));
  }, n.readAsDataURL(e);
};
function Yi(e) {
  return e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let Ws;
function Zu(e, t) {
  if (ml && e.data instanceof Blob)
    return e.data.arrayBuffer().then(Yi).then(t);
  if (_l && (e.data instanceof ArrayBuffer || yl(e.data)))
    return t(Yi(e.data));
  Wr(e, !1, (n) => {
    Ws || (Ws = new TextEncoder()), t(Ws.encode(n));
  });
}
const Ji = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", An = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < Ji.length; e++)
  An[Ji.charCodeAt(e)] = e;
const Gu = (e) => {
  let t = e.length * 0.75, n = e.length, s, r = 0, i, o, l, a;
  e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
  const f = new ArrayBuffer(t), u = new Uint8Array(f);
  for (s = 0; s < n; s += 4)
    i = An[e.charCodeAt(s)], o = An[e.charCodeAt(s + 1)], l = An[e.charCodeAt(s + 2)], a = An[e.charCodeAt(s + 3)], u[r++] = i << 2 | o >> 4, u[r++] = (o & 15) << 4 | l >> 2, u[r++] = (l & 3) << 6 | a & 63;
  return f;
}, Yu = typeof ArrayBuffer == "function", Kr = (e, t) => {
  if (typeof e != "string")
    return {
      type: "message",
      data: bl(e, t)
    };
  const n = e.charAt(0);
  return n === "b" ? {
    type: "message",
    data: Ju(e.substring(1), t)
  } : rs[n] ? e.length > 1 ? {
    type: rs[n],
    data: e.substring(1)
  } : {
    type: rs[n]
  } : dr;
}, Ju = (e, t) => {
  if (Yu) {
    const n = Gu(e);
    return bl(n, t);
  } else
    return { base64: !0, data: e };
}, bl = (e, t) => {
  switch (t) {
    case "blob":
      return e instanceof Blob ? e : new Blob([e]);
    case "arraybuffer":
    default:
      return e instanceof ArrayBuffer ? e : e.buffer;
  }
}, vl = "", Qu = (e, t) => {
  const n = e.length, s = new Array(n);
  let r = 0;
  e.forEach((i, o) => {
    Wr(i, !1, (l) => {
      s[o] = l, ++r === n && t(s.join(vl));
    });
  });
}, Xu = (e, t) => {
  const n = e.split(vl), s = [];
  for (let r = 0; r < n.length; r++) {
    const i = Kr(n[r], t);
    if (s.push(i), i.type === "error")
      break;
  }
  return s;
};
function ef() {
  return new TransformStream({
    transform(e, t) {
      Zu(e, (n) => {
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
let Ks;
function Gn(e) {
  return e.reduce((t, n) => t + n.length, 0);
}
function Yn(e, t) {
  if (e[0].length === t)
    return e.shift();
  const n = new Uint8Array(t);
  let s = 0;
  for (let r = 0; r < t; r++)
    n[r] = e[0][s++], s === e[0].length && (e.shift(), s = 0);
  return e.length && s < e[0].length && (e[0] = e[0].slice(s)), n;
}
function tf(e, t) {
  Ks || (Ks = new TextDecoder());
  const n = [];
  let s = 0, r = -1, i = !1;
  return new TransformStream({
    transform(o, l) {
      for (n.push(o); ; ) {
        if (s === 0) {
          if (Gn(n) < 1)
            break;
          const a = Yn(n, 1);
          i = (a[0] & 128) === 128, r = a[0] & 127, r < 126 ? s = 3 : r === 126 ? s = 1 : s = 2;
        } else if (s === 1) {
          if (Gn(n) < 2)
            break;
          const a = Yn(n, 2);
          r = new DataView(a.buffer, a.byteOffset, a.length).getUint16(0), s = 3;
        } else if (s === 2) {
          if (Gn(n) < 8)
            break;
          const a = Yn(n, 8), f = new DataView(a.buffer, a.byteOffset, a.length), u = f.getUint32(0);
          if (u > Math.pow(2, 21) - 1) {
            l.enqueue(dr);
            break;
          }
          r = u * Math.pow(2, 32) + f.getUint32(4), s = 3;
        } else {
          if (Gn(n) < r)
            break;
          const a = Yn(n, r);
          l.enqueue(Kr(i ? a : Ks.decode(a), t)), s = 0;
        }
        if (r === 0 || r > e) {
          l.enqueue(dr);
          break;
        }
      }
    }
  });
}
const wl = 4;
function Me(e) {
  if (e) return nf(e);
}
function nf(e) {
  for (var t in Me.prototype)
    e[t] = Me.prototype[t];
  return e;
}
Me.prototype.on = Me.prototype.addEventListener = function(e, t) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this;
};
Me.prototype.once = function(e, t) {
  function n() {
    this.off(e, n), t.apply(this, arguments);
  }
  return n.fn = t, this.on(e, n), this;
};
Me.prototype.off = Me.prototype.removeListener = Me.prototype.removeAllListeners = Me.prototype.removeEventListener = function(e, t) {
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
Me.prototype.emit = function(e) {
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
Me.prototype.emitReserved = Me.prototype.emit;
Me.prototype.listeners = function(e) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || [];
};
Me.prototype.hasListeners = function(e) {
  return !!this.listeners(e).length;
};
const Is = typeof Promise == "function" && typeof Promise.resolve == "function" ? (t) => Promise.resolve().then(t) : (t, n) => n(t, 0), ut = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), sf = "arraybuffer";
function kl(e, ...t) {
  return t.reduce((n, s) => (e.hasOwnProperty(s) && (n[s] = e[s]), n), {});
}
const rf = ut.setTimeout, of = ut.clearTimeout;
function Os(e, t) {
  t.useNativeTimers ? (e.setTimeoutFn = rf.bind(ut), e.clearTimeoutFn = of.bind(ut)) : (e.setTimeoutFn = ut.setTimeout.bind(ut), e.clearTimeoutFn = ut.clearTimeout.bind(ut));
}
const lf = 1.33;
function af(e) {
  return typeof e == "string" ? cf(e) : Math.ceil((e.byteLength || e.size) * lf);
}
function cf(e) {
  let t = 0, n = 0;
  for (let s = 0, r = e.length; s < r; s++)
    t = e.charCodeAt(s), t < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (s++, n += 4);
  return n;
}
function xl() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function uf(e) {
  let t = "";
  for (let n in e)
    e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
  return t;
}
function ff(e) {
  let t = {}, n = e.split("&");
  for (let s = 0, r = n.length; s < r; s++) {
    let i = n[s].split("=");
    t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
  }
  return t;
}
class hf extends Error {
  constructor(t, n, s) {
    super(t), this.description = n, this.context = s, this.type = "TransportError";
  }
}
class Zr extends Me {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(t) {
    super(), this.writable = !1, Os(this, t), this.opts = t, this.query = t.query, this.socket = t.socket, this.supportsBinary = !t.forceBase64;
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
    return super.emitReserved("error", new hf(t, n, s)), this;
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
    const n = Kr(t, this.socket.binaryType);
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
    return this.opts.port && (this.opts.secure && +(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80) ? ":" + this.opts.port : "";
  }
  _query(t) {
    const n = uf(t);
    return n.length ? "?" + n : "";
  }
}
class df extends Zr {
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
    Xu(t, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
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
    this.writable = !1, Qu(t, (n) => {
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
    return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = xl()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(t, n);
  }
}
let Sl = !1;
try {
  Sl = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const pf = Sl;
function gf() {
}
class mf extends df {
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
   * @param {String} data to send.
   * @param {Function} called upon flush.
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
class It extends Me {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(t, n, s) {
    super(), this.createRequest = t, Os(this, s), this._opts = s, this._method = s.method || "GET", this._uri = n, this._data = s.data !== void 0 ? s.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var t;
    const n = kl(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
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
    typeof document < "u" && (this._index = It.requestsCount++, It.requests[this._index] = this);
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
      if (this._xhr.onreadystatechange = gf, t)
        try {
          this._xhr.abort();
        } catch {
        }
      typeof document < "u" && delete It.requests[this._index], this._xhr = null;
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
It.requestsCount = 0;
It.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", Qi);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in ut ? "pagehide" : "unload";
    addEventListener(e, Qi, !1);
  }
}
function Qi() {
  for (let e in It.requests)
    It.requests.hasOwnProperty(e) && It.requests[e].abort();
}
const _f = function() {
  const e = Cl({
    xdomain: !1
  });
  return e && e.responseType !== null;
}();
class yf extends mf {
  constructor(t) {
    super(t);
    const n = t && t.forceBase64;
    this.supportsBinary = _f && !n;
  }
  request(t = {}) {
    return Object.assign(t, { xd: this.xd }, this.opts), new It(Cl, this.uri(), t);
  }
}
function Cl(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || pf))
      return new XMLHttpRequest();
  } catch {
  }
  if (!t)
    try {
      return new ut[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const Tl = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class bf extends Zr {
  get name() {
    return "websocket";
  }
  doOpen() {
    const t = this.uri(), n = this.opts.protocols, s = Tl ? {} : kl(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
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
      Wr(s, this.supportsBinary, (i) => {
        try {
          this.doWrite(s, i);
        } catch {
        }
        r && Is(() => {
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
    return this.opts.timestampRequests && (n[this.opts.timestampParam] = xl()), this.supportsBinary || (n.b64 = 1), this.createUri(t, n);
  }
}
const Zs = ut.WebSocket || ut.MozWebSocket;
class vf extends bf {
  createSocket(t, n, s) {
    return Tl ? new Zs(t, n, s) : n ? new Zs(t, n) : new Zs(t);
  }
  doWrite(t, n) {
    this.ws.send(n);
  }
}
class wf extends Zr {
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
        const n = tf(Number.MAX_SAFE_INTEGER, this.socket.binaryType), s = t.readable.pipeThrough(n).getReader(), r = ef();
        r.readable.pipeTo(t.writable), this._writer = r.writable.getWriter();
        const i = () => {
          s.read().then(({ done: l, value: a }) => {
            l || (this.onPacket(a), i());
          }).catch((l) => {
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
        r && Is(() => {
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
const kf = {
  websocket: vf,
  webtransport: wf,
  polling: yf
}, xf = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, Sf = [
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
function pr(e) {
  if (e.length > 8e3)
    throw "URI too long";
  const t = e, n = e.indexOf("["), s = e.indexOf("]");
  n != -1 && s != -1 && (e = e.substring(0, n) + e.substring(n, s).replace(/:/g, ";") + e.substring(s, e.length));
  let r = xf.exec(e || ""), i = {}, o = 14;
  for (; o--; )
    i[Sf[o]] = r[o] || "";
  return n != -1 && s != -1 && (i.source = t, i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"), i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), i.ipv6uri = !0), i.pathNames = Cf(i, i.path), i.queryKey = Tf(i, i.query), i;
}
function Cf(e, t) {
  const n = /\/{2,9}/g, s = t.replace(n, "/").split("/");
  return (t.slice(0, 1) == "/" || t.length === 0) && s.splice(0, 1), t.slice(-1) == "/" && s.splice(s.length - 1, 1), s;
}
function Tf(e, t) {
  const n = {};
  return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, r, i) {
    r && (n[r] = i);
  }), n;
}
const gr = typeof addEventListener == "function" && typeof removeEventListener == "function", is = [];
gr && addEventListener("offline", () => {
  is.forEach((e) => e());
}, !1);
class Yt extends Me {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(t, n) {
    if (super(), this.binaryType = sf, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, t && typeof t == "object" && (n = t, t = null), t) {
      const s = pr(t);
      n.hostname = s.host, n.secure = s.protocol === "https" || s.protocol === "wss", n.port = s.port, s.query && (n.query = s.query);
    } else n.host && (n.hostname = pr(n.host).host);
    Os(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((s) => {
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
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = ff(this.opts.query)), gr && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, is.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
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
    n.EIO = wl, n.transport = t, this.id && (n.sid = this.id);
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
    const t = this.opts.rememberUpgrade && Yt.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
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
    this.readyState = "open", Yt.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
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
      if (r && (n += af(r)), s > 0 && n > this._maxPayload)
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
    return t && (this._pingTimeoutTime = 0, Is(() => {
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
   * @param {String} type: packet type.
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
    if (Yt.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
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
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), gr && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const s = is.indexOf(this._offlineEventListener);
        s !== -1 && is.splice(s, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", t, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
Yt.protocol = wl;
class Ef extends Yt {
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
    Yt.priorWebsocketSuccess = !1;
    const r = () => {
      s || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (m) => {
        if (!s)
          if (m.type === "pong" && m.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", n), !n)
              return;
            Yt.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
              s || this.readyState !== "closed" && (u(), this.setTransport(n), n.send([{ type: "upgrade" }]), this.emitReserved("upgrade", n), n = null, this.upgrading = !1, this.flush());
            });
          } else {
            const b = new Error("probe error");
            b.transport = n.name, this.emitReserved("upgradeError", b);
          }
      }));
    };
    function i() {
      s || (s = !0, u(), n.close(), n = null);
    }
    const o = (m) => {
      const b = new Error("probe error: " + m);
      b.transport = n.name, i(), this.emitReserved("upgradeError", b);
    };
    function l() {
      o("transport closed");
    }
    function a() {
      o("socket closed");
    }
    function f(m) {
      n && m.name !== n.name && i();
    }
    const u = () => {
      n.removeListener("open", r), n.removeListener("error", o), n.removeListener("close", l), this.off("close", a), this.off("upgrading", f);
    };
    n.once("open", r), n.once("error", o), n.once("close", l), this.once("close", a), this.once("upgrading", f), this._upgrades.indexOf("webtransport") !== -1 && t !== "webtransport" ? this.setTimeoutFn(() => {
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
let Af = class extends Ef {
  constructor(t, n = {}) {
    const s = typeof t == "object" ? t : n;
    (!s.transports || s.transports && typeof s.transports[0] == "string") && (s.transports = (s.transports || ["polling", "websocket", "webtransport"]).map((r) => kf[r]).filter((r) => !!r)), super(t, s);
  }
};
function Rf(e, t = "", n) {
  let s = e;
  n = n || typeof location < "u" && location, e == null && (e = n.protocol + "//" + n.host), typeof e == "string" && (e.charAt(0) === "/" && (e.charAt(1) === "/" ? e = n.protocol + e : e = n.host + e), /^(https?|wss?):\/\//.test(e) || (typeof n < "u" ? e = n.protocol + "//" + e : e = "https://" + e), s = pr(e)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
  const i = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return s.id = s.protocol + "://" + i + ":" + s.port + t, s.href = s.protocol + "://" + i + (n && n.port === s.port ? "" : ":" + s.port), s;
}
const If = typeof ArrayBuffer == "function", Of = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer, El = Object.prototype.toString, Lf = typeof Blob == "function" || typeof Blob < "u" && El.call(Blob) === "[object BlobConstructor]", Pf = typeof File == "function" || typeof File < "u" && El.call(File) === "[object FileConstructor]";
function Gr(e) {
  return If && (e instanceof ArrayBuffer || Of(e)) || Lf && e instanceof Blob || Pf && e instanceof File;
}
function os(e, t) {
  if (!e || typeof e != "object")
    return !1;
  if (Array.isArray(e)) {
    for (let n = 0, s = e.length; n < s; n++)
      if (os(e[n]))
        return !0;
    return !1;
  }
  if (Gr(e))
    return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return os(e.toJSON(), !0);
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && os(e[n]))
      return !0;
  return !1;
}
function $f(e) {
  const t = [], n = e.data, s = e;
  return s.data = mr(n, t), s.attachments = t.length, { packet: s, buffers: t };
}
function mr(e, t) {
  if (!e)
    return e;
  if (Gr(e)) {
    const n = { _placeholder: !0, num: t.length };
    return t.push(e), n;
  } else if (Array.isArray(e)) {
    const n = new Array(e.length);
    for (let s = 0; s < e.length; s++)
      n[s] = mr(e[s], t);
    return n;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    const n = {};
    for (const s in e)
      Object.prototype.hasOwnProperty.call(e, s) && (n[s] = mr(e[s], t));
    return n;
  }
  return e;
}
function Ff(e, t) {
  return e.data = _r(e.data, t), delete e.attachments, e;
}
function _r(e, t) {
  if (!e)
    return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == "number" && e.num >= 0 && e.num < t.length)
      return t[e.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(e))
    for (let n = 0; n < e.length; n++)
      e[n] = _r(e[n], t);
  else if (typeof e == "object")
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (e[n] = _r(e[n], t));
  return e;
}
const Bf = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], Nf = 5;
var ue;
(function(e) {
  e[e.CONNECT = 0] = "CONNECT", e[e.DISCONNECT = 1] = "DISCONNECT", e[e.EVENT = 2] = "EVENT", e[e.ACK = 3] = "ACK", e[e.CONNECT_ERROR = 4] = "CONNECT_ERROR", e[e.BINARY_EVENT = 5] = "BINARY_EVENT", e[e.BINARY_ACK = 6] = "BINARY_ACK";
})(ue || (ue = {}));
class Mf {
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
    return (t.type === ue.EVENT || t.type === ue.ACK) && os(t) ? this.encodeAsBinary({
      type: t.type === ue.EVENT ? ue.BINARY_EVENT : ue.BINARY_ACK,
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
    return (t.type === ue.BINARY_EVENT || t.type === ue.BINARY_ACK) && (n += t.attachments + "-"), t.nsp && t.nsp !== "/" && (n += t.nsp + ","), t.id != null && (n += t.id), t.data != null && (n += JSON.stringify(t.data, this.replacer)), n;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(t) {
    const n = $f(t), s = this.encodeAsString(n.packet), r = n.buffers;
    return r.unshift(s), r;
  }
}
function Xi(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
class Yr extends Me {
  /**
   * Decoder constructor
   *
   * @param {function} reviver - custom reviver to pass down to JSON.stringify
   */
  constructor(t) {
    super(), this.reviver = t;
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
      const s = n.type === ue.BINARY_EVENT;
      s || n.type === ue.BINARY_ACK ? (n.type = s ? ue.EVENT : ue.ACK, this.reconstructor = new Df(n), n.attachments === 0 && super.emitReserved("decoded", n)) : super.emitReserved("decoded", n);
    } else if (Gr(t) || t.base64)
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
    if (ue[s.type] === void 0)
      throw new Error("unknown packet type " + s.type);
    if (s.type === ue.BINARY_EVENT || s.type === ue.BINARY_ACK) {
      const i = n + 1;
      for (; t.charAt(++n) !== "-" && n != t.length; )
        ;
      const o = t.substring(i, n);
      if (o != Number(o) || t.charAt(n) !== "-")
        throw new Error("Illegal attachments");
      s.attachments = Number(o);
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
      if (Yr.isPayloadValid(s.type, i))
        s.data = i;
      else
        throw new Error("invalid payload");
    }
    return s;
  }
  tryParse(t) {
    try {
      return JSON.parse(t, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(t, n) {
    switch (t) {
      case ue.CONNECT:
        return Xi(n);
      case ue.DISCONNECT:
        return n === void 0;
      case ue.CONNECT_ERROR:
        return typeof n == "string" || Xi(n);
      case ue.EVENT:
      case ue.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && Bf.indexOf(n[0]) === -1);
      case ue.ACK:
      case ue.BINARY_ACK:
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
class Df {
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
      const n = Ff(this.reconPack, this.buffers);
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
const qf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Yr,
  Encoder: Mf,
  get PacketType() {
    return ue;
  },
  protocol: Nf
}, Symbol.toStringTag, { value: "Module" }));
function yt(e, t, n) {
  return e.on(t, n), function() {
    e.off(t, n);
  };
}
const Vf = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class Al extends Me {
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
      yt(t, "open", this.onopen.bind(this)),
      yt(t, "packet", this.onpacket.bind(this)),
      yt(t, "error", this.onerror.bind(this)),
      yt(t, "close", this.onclose.bind(this))
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
    if (Vf.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (n.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const o = {
      type: ue.EVENT,
      data: n
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
      const u = this.ids++, m = n.pop();
      this._registerAckCallback(u, m), o.id = u;
    }
    const l = (r = (s = this.io.engine) === null || s === void 0 ? void 0 : s.transport) === null || r === void 0 ? void 0 : r.writable, a = this.connected && !(!((i = this.io.engine) === null || i === void 0) && i._hasPingExpired());
    return this.flags.volatile && !l || (a ? (this.notifyOutgoingListeners(o), this.packet(o)) : this.sendBuffer.push(o)), this.flags = {}, this;
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
      for (let l = 0; l < this.sendBuffer.length; l++)
        this.sendBuffer[l].id === t && this.sendBuffer.splice(l, 1);
      n.call(this, new Error("operation has timed out"));
    }, r), o = (...l) => {
      this.io.clearTimeoutFn(i), n.apply(this, l);
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
      const i = (o, l) => o ? r(o) : s(l);
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
    t.push((r, ...i) => s !== this._queue[0] ? void 0 : (r !== null ? s.tryCount > this._opts.retries && (this._queue.shift(), n && n(r)) : (this._queue.shift(), n && n(null, ...i)), s.pending = !1, this._drainQueue())), this._queue.push(s), this._drainQueue();
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
      type: ue.CONNECT,
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
        case ue.CONNECT:
          t.data && t.data.sid ? this.onconnect(t.data.sid, t.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case ue.EVENT:
        case ue.BINARY_EVENT:
          this.onevent(t);
          break;
        case ue.ACK:
        case ue.BINARY_ACK:
          this.onack(t);
          break;
        case ue.DISCONNECT:
          this.ondisconnect();
          break;
        case ue.CONNECT_ERROR:
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
        type: ue.ACK,
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
    this.id = t, this.recovered = n && this._pid === n, this._pid = n, this.connected = !0, this.emitBuffered(), this.emitReserved("connect"), this._drainQueue(!0);
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
    return this.connected && this.packet({ type: ue.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
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
function vn(e) {
  e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;
}
vn.prototype.duration = function() {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(), n = Math.floor(t * this.jitter * e);
    e = (Math.floor(t * 10) & 1) == 0 ? e - n : e + n;
  }
  return Math.min(e, this.max) | 0;
};
vn.prototype.reset = function() {
  this.attempts = 0;
};
vn.prototype.setMin = function(e) {
  this.ms = e;
};
vn.prototype.setMax = function(e) {
  this.max = e;
};
vn.prototype.setJitter = function(e) {
  this.jitter = e;
};
class yr extends Me {
  constructor(t, n) {
    var s;
    super(), this.nsps = {}, this.subs = [], t && typeof t == "object" && (n = t, t = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, Os(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5), this.backoff = new vn({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = t;
    const r = n.parser || qf;
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
    this.engine = new Af(this.uri, this.opts);
    const n = this.engine, s = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const r = yt(n, "open", function() {
      s.onopen(), t && t();
    }), i = (l) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", l), t ? t(l) : this.maybeReconnectOnOpen();
    }, o = yt(n, "error", i);
    if (this._timeout !== !1) {
      const l = this._timeout, a = this.setTimeoutFn(() => {
        r(), i(new Error("timeout")), n.close();
      }, l);
      this.opts.autoUnref && a.unref(), this.subs.push(() => {
        this.clearTimeoutFn(a);
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
      yt(t, "ping", this.onping.bind(this)),
      yt(t, "data", this.ondata.bind(this)),
      yt(t, "error", this.onerror.bind(this)),
      yt(t, "close", this.onclose.bind(this)),
      // @ts-ignore
      yt(this.decoder, "decoded", this.ondecoded.bind(this))
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
    Is(() => {
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
    return s ? this._autoConnect && !s.active && s.connect() : (s = new Al(this, t, n), this.nsps[t] = s), s;
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
const Tn = {};
function ls(e, t) {
  typeof e == "object" && (t = e, e = void 0), t = t || {};
  const n = Rf(e, t.path || "/socket.io"), s = n.source, r = n.id, i = n.path, o = Tn[r] && i in Tn[r].nsps, l = t.forceNew || t["force new connection"] || t.multiplex === !1 || o;
  let a;
  return l ? a = new yr(s, t) : (Tn[r] || (Tn[r] = new yr(s, t)), a = Tn[r]), n.query && !t.query && (t.query = n.queryKey), a.socket(n.path, t);
}
Object.assign(ls, {
  Manager: yr,
  Socket: Al,
  io: ls,
  connect: ls
});
function Hf() {
  const e = ge([]), t = ge(!1), n = ge(""), s = ge(!1), r = ge(!1), i = ge(!1), o = ge("connecting"), l = ge(0), a = 5, f = ge({}), u = ge(null);
  let m = null, b = null, I = null, N = null;
  const D = (M) => {
    const $e = localStorage.getItem("ctid");
    return m = ls(`${_s.WS_URL}/widget`, {
      transports: ["websocket"],
      reconnection: !0,
      reconnectionAttempts: a,
      reconnectionDelay: 1e3,
      auth: $e ? {
        conversation_token: $e
      } : void 0
    }), m.on("connect", () => {
      o.value = "connected", l.value = 0;
    }), m.on("disconnect", () => {
      o.value === "connected" && (o.value = "connecting");
    }), m.on("connect_error", () => {
      l.value++, console.error("Socket connection failed, attempt:", l.value), l.value >= a && (o.value = "failed");
    }), m.on("chat_response", (j) => {
      t.value = !1, j.type === "agent_message" ? e.value.push({
        message: j.message,
        message_type: "agent",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: "",
        agent_name: j.agent_name,
        attributes: {
          end_chat: j.end_chat,
          end_chat_reason: j.end_chat_reason,
          end_chat_description: j.end_chat_description,
          request_rating: j.request_rating
        }
      }) : j.shopify_output && typeof j.shopify_output == "object" && j.shopify_output.products ? e.value.push({
        message: j.message,
        // Keep the accompanying text message
        message_type: "product",
        // Use 'product' type for rendering
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: "",
        agent_name: j.agent_name,
        // Assign the whole structured object
        shopify_output: j.shopify_output,
        // Remove the old flattened fields (product_id, product_title, etc.)
        attributes: {
          // Keep other attributes if needed
          end_chat: j.end_chat,
          request_rating: j.request_rating
        }
      }) : e.value.push({
        message: j.message,
        message_type: "bot",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: "",
        agent_name: j.agent_name,
        attributes: {
          end_chat: j.end_chat,
          end_chat_reason: j.end_chat_reason,
          end_chat_description: j.end_chat_description,
          request_rating: j.request_rating
        }
      });
    }), m.on("handle_taken_over", (j) => {
      e.value.push({
        message: `${j.user_name} joined the conversation`,
        message_type: "system",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: j.session_id
      }), f.value = {
        ...f.value,
        human_agent_name: j.user_name,
        human_agent_profile_pic: j.profile_picture
      }, b && b(j);
    }), m.on("error", ce), m.on("chat_history", qe), m.on("rating_submitted", de), m.on("display_form", ze), m.on("form_submitted", dt), m.on("workflow_state", Ye), m.on("workflow_proceeded", pt), m;
  }, ke = async () => {
    try {
      return o.value = "connecting", l.value = 0, m && (m.removeAllListeners(), m.disconnect(), m = null), m = D(""), new Promise((M) => {
        m == null || m.on("connect", () => {
          M(!0);
        }), m == null || m.on("connect_error", () => {
          l.value >= a && M(!1);
        });
      });
    } catch (M) {
      return console.error("Socket initialization failed:", M), o.value = "failed", !1;
    }
  }, se = () => (m && m.disconnect(), ke()), me = (M) => {
    b = M;
  }, _e = (M) => {
    I = M;
  }, V = (M) => {
    N = M;
  }, ce = (M) => {
    t.value = !1, n.value = uu(M), s.value = !0, setTimeout(() => {
      s.value = !1, n.value = "";
    }, 5e3);
  }, qe = (M) => {
    if (M.type === "chat_history" && Array.isArray(M.messages)) {
      const $e = M.messages.map((j) => {
        var lt;
        const xe = {
          message: j.message,
          message_type: j.message_type,
          created_at: j.created_at,
          session_id: "",
          agent_name: j.agent_name || "",
          user_name: j.user_name || "",
          attributes: j.attributes || {}
        };
        return (lt = j.attributes) != null && lt.shopify_output && typeof j.attributes.shopify_output == "object" ? {
          ...xe,
          message_type: "product",
          shopify_output: j.attributes.shopify_output
        } : xe;
      });
      e.value = [
        ...$e.filter(
          (j) => !e.value.some(
            (xe) => xe.message === j.message && xe.created_at === j.created_at
          )
        ),
        ...e.value
      ];
    }
  }, de = (M) => {
    M.success && e.value.push({
      message: "Thank you for your feedback!",
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    });
  }, ze = (M) => {
    var $e;
    console.log("Form display handler in composable:", M), t.value = !1, u.value = M.form_data, console.log("Set currentForm in handleDisplayForm:", u.value), (($e = M.form_data) == null ? void 0 : $e.form_full_screen) === !0 ? (console.log("Full screen form detected, triggering workflow state callback"), I && I({
      type: "form",
      form_data: M.form_data,
      session_id: M.session_id
    })) : e.value.push({
      message: "",
      message_type: "form",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: M.session_id,
      attributes: {
        form_data: M.form_data
      }
    });
  }, dt = (M) => {
    console.log("Form submitted confirmation received, clearing currentForm"), u.value = null, M.success && console.log("Form submitted successfully");
  }, Ye = (M) => {
    console.log("Workflow state received in composable:", M), (M.type === "form" || M.type === "display_form") && (console.log("Setting currentForm from workflow state:", M.form_data), u.value = M.form_data), I && I(M);
  }, pt = (M) => {
    console.log("Workflow proceeded in composable:", M), N && N(M);
  };
  return {
    messages: e,
    loading: t,
    errorMessage: n,
    showError: s,
    loadingHistory: r,
    hasStartedChat: i,
    connectionStatus: o,
    sendMessage: async (M, $e) => {
      !m || !M.trim() || (f.value.human_agent_name || (t.value = !0), e.value.push({
        message: M,
        message_type: "user",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: ""
      }), m.emit("chat", {
        message: M,
        email: $e
      }), i.value = !0);
    },
    loadChatHistory: async () => {
      if (m)
        try {
          r.value = !0, m.emit("get_chat_history");
        } catch (M) {
          console.error("Failed to load chat history:", M);
        } finally {
          r.value = !1;
        }
    },
    connect: ke,
    reconnect: se,
    cleanup: () => {
      m && (m.removeAllListeners(), m.disconnect(), m = null), b = null, I = null, N = null;
    },
    humanAgent: f,
    onTakeover: me,
    submitRating: async (M, $e) => {
      !m || !M || m.emit("submit_rating", {
        rating: M,
        feedback: $e
      });
    },
    currentForm: u,
    submitForm: async (M) => {
      if (console.log("Submitting form in socket:", M), console.log("Current form in socket:", u.value), console.log("Socket in socket:", m), !m) {
        console.error("No socket available for form submission");
        return;
      }
      if (!M || Object.keys(M).length === 0) {
        console.error("No form data to submit");
        return;
      }
      console.log("Emitting submit_form event with data:", M), m.emit("submit_form", {
        form_data: M
      }), u.value = null;
    },
    getWorkflowState: async () => {
      m && (console.log("Getting workflow state 12"), m.emit("get_workflow_state"));
    },
    proceedWorkflow: async () => {
      m && m.emit("proceed_workflow", {});
    },
    onWorkflowState: _e,
    onWorkflowProceeded: V
  };
}
function Uf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Gs = { exports: {} }, eo;
function jf() {
  return eo || (eo = 1, function(e) {
    (function() {
      function t(c, g, x) {
        return c.call.apply(c.bind, arguments);
      }
      function n(c, g, x) {
        if (!c) throw Error();
        if (2 < arguments.length) {
          var y = Array.prototype.slice.call(arguments, 2);
          return function() {
            var A = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(A, y), c.apply(g, A);
          };
        }
        return function() {
          return c.apply(g, arguments);
        };
      }
      function s(c, g, x) {
        return s = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? t : n, s.apply(null, arguments);
      }
      var r = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function i(c, g) {
        this.a = c, this.o = g || c, this.c = this.o.document;
      }
      var o = !!window.FontFace;
      function l(c, g, x, y) {
        if (g = c.c.createElement(g), x) for (var A in x) x.hasOwnProperty(A) && (A == "style" ? g.style.cssText = x[A] : g.setAttribute(A, x[A]));
        return y && g.appendChild(c.c.createTextNode(y)), g;
      }
      function a(c, g, x) {
        c = c.c.getElementsByTagName(g)[0], c || (c = document.documentElement), c.insertBefore(x, c.lastChild);
      }
      function f(c) {
        c.parentNode && c.parentNode.removeChild(c);
      }
      function u(c, g, x) {
        g = g || [], x = x || [];
        for (var y = c.className.split(/\s+/), A = 0; A < g.length; A += 1) {
          for (var H = !1, K = 0; K < y.length; K += 1) if (g[A] === y[K]) {
            H = !0;
            break;
          }
          H || y.push(g[A]);
        }
        for (g = [], A = 0; A < y.length; A += 1) {
          for (H = !1, K = 0; K < x.length; K += 1) if (y[A] === x[K]) {
            H = !0;
            break;
          }
          H || g.push(y[A]);
        }
        c.className = g.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function m(c, g) {
        for (var x = c.className.split(/\s+/), y = 0, A = x.length; y < A; y++) if (x[y] == g) return !0;
        return !1;
      }
      function b(c) {
        return c.o.location.hostname || c.a.location.hostname;
      }
      function I(c, g, x) {
        function y() {
          pe && A && H && (pe(K), pe = null);
        }
        g = l(c, "link", { rel: "stylesheet", href: g, media: "all" });
        var A = !1, H = !0, K = null, pe = x || null;
        o ? (g.onload = function() {
          A = !0, y();
        }, g.onerror = function() {
          A = !0, K = Error("Stylesheet failed to load"), y();
        }) : setTimeout(function() {
          A = !0, y();
        }, 0), a(c, "head", g);
      }
      function N(c, g, x, y) {
        var A = c.c.getElementsByTagName("head")[0];
        if (A) {
          var H = l(c, "script", { src: g }), K = !1;
          return H.onload = H.onreadystatechange = function() {
            K || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (K = !0, x && x(null), H.onload = H.onreadystatechange = null, H.parentNode.tagName == "HEAD" && A.removeChild(H));
          }, A.appendChild(H), setTimeout(function() {
            K || (K = !0, x && x(Error("Script load timeout")));
          }, y || 5e3), H;
        }
        return null;
      }
      function D() {
        this.a = 0, this.c = null;
      }
      function ke(c) {
        return c.a++, function() {
          c.a--, me(c);
        };
      }
      function se(c, g) {
        c.c = g, me(c);
      }
      function me(c) {
        c.a == 0 && c.c && (c.c(), c.c = null);
      }
      function _e(c) {
        this.a = c || "-";
      }
      _e.prototype.c = function(c) {
        for (var g = [], x = 0; x < arguments.length; x++) g.push(arguments[x].replace(/[\W_]+/g, "").toLowerCase());
        return g.join(this.a);
      };
      function V(c, g) {
        this.c = c, this.f = 4, this.a = "n";
        var x = (g || "n4").match(/^([nio])([1-9])$/i);
        x && (this.a = x[1], this.f = parseInt(x[2], 10));
      }
      function ce(c) {
        return ze(c) + " " + (c.f + "00") + " 300px " + qe(c.c);
      }
      function qe(c) {
        var g = [];
        c = c.split(/,\s*/);
        for (var x = 0; x < c.length; x++) {
          var y = c[x].replace(/['"]/g, "");
          y.indexOf(" ") != -1 || /^\d/.test(y) ? g.push("'" + y + "'") : g.push(y);
        }
        return g.join(",");
      }
      function de(c) {
        return c.a + c.f;
      }
      function ze(c) {
        var g = "normal";
        return c.a === "o" ? g = "oblique" : c.a === "i" && (g = "italic"), g;
      }
      function dt(c) {
        var g = 4, x = "n", y = null;
        return c && ((y = c.match(/(normal|oblique|italic)/i)) && y[1] && (x = y[1].substr(0, 1).toLowerCase()), (y = c.match(/([1-9]00|normal|bold)/i)) && y[1] && (/bold/i.test(y[1]) ? g = 7 : /[1-9]00/.test(y[1]) && (g = parseInt(y[1].substr(0, 1), 10)))), x + g;
      }
      function Ye(c, g) {
        this.c = c, this.f = c.o.document.documentElement, this.h = g, this.a = new _e("-"), this.j = g.events !== !1, this.g = g.classes !== !1;
      }
      function pt(c) {
        c.g && u(c.f, [c.a.c("wf", "loading")]), tt(c, "loading");
      }
      function vt(c) {
        if (c.g) {
          var g = m(c.f, c.a.c("wf", "active")), x = [], y = [c.a.c("wf", "loading")];
          g || x.push(c.a.c("wf", "inactive")), u(c.f, x, y);
        }
        tt(c, "inactive");
      }
      function tt(c, g, x) {
        c.j && c.h[g] && (x ? c.h[g](x.c, de(x)) : c.h[g]());
      }
      function He() {
        this.c = {};
      }
      function jt(c, g, x) {
        var y = [], A;
        for (A in g) if (g.hasOwnProperty(A)) {
          var H = c.c[A];
          H && y.push(H(g[A], x));
        }
        return y;
      }
      function re(c, g) {
        this.c = c, this.f = g, this.a = l(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function te(c) {
        a(c.c, "body", c.a);
      }
      function ie(c) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + qe(c.c) + ";" + ("font-style:" + ze(c) + ";font-weight:" + (c.f + "00") + ";");
      }
      function M(c, g, x, y, A, H) {
        this.g = c, this.j = g, this.a = y, this.c = x, this.f = A || 3e3, this.h = H || void 0;
      }
      M.prototype.start = function() {
        var c = this.c.o.document, g = this, x = r(), y = new Promise(function(K, pe) {
          function ye() {
            r() - x >= g.f ? pe() : c.fonts.load(ce(g.a), g.h).then(function(Re) {
              1 <= Re.length ? K() : setTimeout(ye, 25);
            }, function() {
              pe();
            });
          }
          ye();
        }), A = null, H = new Promise(function(K, pe) {
          A = setTimeout(pe, g.f);
        });
        Promise.race([H, y]).then(function() {
          A && (clearTimeout(A), A = null), g.g(g.a);
        }, function() {
          g.j(g.a);
        });
      };
      function $e(c, g, x, y, A, H, K) {
        this.v = c, this.B = g, this.c = x, this.a = y, this.s = K || "BESbswy", this.f = {}, this.w = A || 3e3, this.u = H || null, this.m = this.j = this.h = this.g = null, this.g = new re(this.c, this.s), this.h = new re(this.c, this.s), this.j = new re(this.c, this.s), this.m = new re(this.c, this.s), c = new V(this.a.c + ",serif", de(this.a)), c = ie(c), this.g.a.style.cssText = c, c = new V(this.a.c + ",sans-serif", de(this.a)), c = ie(c), this.h.a.style.cssText = c, c = new V("serif", de(this.a)), c = ie(c), this.j.a.style.cssText = c, c = new V("sans-serif", de(this.a)), c = ie(c), this.m.a.style.cssText = c, te(this.g), te(this.h), te(this.j), te(this.m);
      }
      var j = { D: "serif", C: "sans-serif" }, xe = null;
      function lt() {
        if (xe === null) {
          var c = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          xe = !!c && (536 > parseInt(c[1], 10) || parseInt(c[1], 10) === 536 && 11 >= parseInt(c[2], 10));
        }
        return xe;
      }
      $e.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = r(), gt(this);
      };
      function wt(c, g, x) {
        for (var y in j) if (j.hasOwnProperty(y) && g === c.f[j[y]] && x === c.f[j[y]]) return !0;
        return !1;
      }
      function gt(c) {
        var g = c.g.a.offsetWidth, x = c.h.a.offsetWidth, y;
        (y = g === c.f.serif && x === c.f["sans-serif"]) || (y = lt() && wt(c, g, x)), y ? r() - c.A >= c.w ? lt() && wt(c, g, x) && (c.u === null || c.u.hasOwnProperty(c.a.c)) ? st(c, c.v) : st(c, c.B) : at(c) : st(c, c.v);
      }
      function at(c) {
        setTimeout(s(function() {
          gt(this);
        }, c), 50);
      }
      function st(c, g) {
        setTimeout(s(function() {
          f(this.g.a), f(this.h.a), f(this.j.a), f(this.m.a), g(this.a);
        }, c), 0);
      }
      function Pt(c, g, x) {
        this.c = c, this.a = g, this.f = 0, this.m = this.j = !1, this.s = x;
      }
      var mt = null;
      Pt.prototype.g = function(c) {
        var g = this.a;
        g.g && u(g.f, [g.a.c("wf", c.c, de(c).toString(), "active")], [g.a.c("wf", c.c, de(c).toString(), "loading"), g.a.c("wf", c.c, de(c).toString(), "inactive")]), tt(g, "fontactive", c), this.m = !0, We(this);
      }, Pt.prototype.h = function(c) {
        var g = this.a;
        if (g.g) {
          var x = m(g.f, g.a.c("wf", c.c, de(c).toString(), "active")), y = [], A = [g.a.c("wf", c.c, de(c).toString(), "loading")];
          x || y.push(g.a.c("wf", c.c, de(c).toString(), "inactive")), u(g.f, y, A);
        }
        tt(g, "fontinactive", c), We(this);
      };
      function We(c) {
        --c.f == 0 && c.j && (c.m ? (c = c.a, c.g && u(c.f, [c.a.c("wf", "active")], [c.a.c("wf", "loading"), c.a.c("wf", "inactive")]), tt(c, "active")) : vt(c.a));
      }
      function kt(c) {
        this.j = c, this.a = new He(), this.h = 0, this.f = this.g = !0;
      }
      kt.prototype.load = function(c) {
        this.c = new i(this.j, c.context || this.j), this.g = c.events !== !1, this.f = c.classes !== !1, p(this, new Ye(this.c, c), c);
      };
      function h(c, g, x, y, A) {
        var H = --c.h == 0;
        (c.f || c.g) && setTimeout(function() {
          var K = A || null, pe = y || null || {};
          if (x.length === 0 && H) vt(g.a);
          else {
            g.f += x.length, H && (g.j = H);
            var ye, Re = [];
            for (ye = 0; ye < x.length; ye++) {
              var Ie = x[ye], Ue = pe[Ie.c], rt = g.a, Be = Ie;
              if (rt.g && u(rt.f, [rt.a.c("wf", Be.c, de(Be).toString(), "loading")]), tt(rt, "fontloading", Be), rt = null, mt === null) if (window.FontFace) {
                var Be = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), Ls = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                mt = Be ? 42 < parseInt(Be[1], 10) : !Ls;
              } else mt = !1;
              mt ? rt = new M(s(g.g, g), s(g.h, g), g.c, Ie, g.s, Ue) : rt = new $e(s(g.g, g), s(g.h, g), g.c, Ie, g.s, K, Ue), Re.push(rt);
            }
            for (ye = 0; ye < Re.length; ye++) Re[ye].start();
          }
        }, 0);
      }
      function p(c, g, x) {
        var A = [], y = x.timeout;
        pt(g);
        var A = jt(c.a, x, c.c), H = new Pt(c.c, g, y);
        for (c.h = A.length, g = 0, x = A.length; g < x; g++) A[g].load(function(K, pe, ye) {
          h(c, H, K, pe, ye);
        });
      }
      function w(c, g) {
        this.c = c, this.a = g;
      }
      w.prototype.load = function(c) {
        function g() {
          if (H["__mti_fntLst" + y]) {
            var K = H["__mti_fntLst" + y](), pe = [], ye;
            if (K) for (var Re = 0; Re < K.length; Re++) {
              var Ie = K[Re].fontfamily;
              K[Re].fontStyle != null && K[Re].fontWeight != null ? (ye = K[Re].fontStyle + K[Re].fontWeight, pe.push(new V(Ie, ye))) : pe.push(new V(Ie));
            }
            c(pe);
          } else setTimeout(function() {
            g();
          }, 50);
        }
        var x = this, y = x.a.projectId, A = x.a.version;
        if (y) {
          var H = x.c.o;
          N(this.c, (x.a.api || "https://fast.fonts.net/jsapi") + "/" + y + ".js" + (A ? "?v=" + A : ""), function(K) {
            K ? c([]) : (H["__MonotypeConfiguration__" + y] = function() {
              return x.a;
            }, g());
          }).id = "__MonotypeAPIScript__" + y;
        } else c([]);
      };
      function T(c, g) {
        this.c = c, this.a = g;
      }
      T.prototype.load = function(c) {
        var g, x, y = this.a.urls || [], A = this.a.families || [], H = this.a.testStrings || {}, K = new D();
        for (g = 0, x = y.length; g < x; g++) I(this.c, y[g], ke(K));
        var pe = [];
        for (g = 0, x = A.length; g < x; g++) if (y = A[g].split(":"), y[1]) for (var ye = y[1].split(","), Re = 0; Re < ye.length; Re += 1) pe.push(new V(y[0], ye[Re]));
        else pe.push(new V(y[0]));
        se(K, function() {
          c(pe, H);
        });
      };
      function S(c, g) {
        c ? this.c = c : this.c = C, this.a = [], this.f = [], this.g = g || "";
      }
      var C = "https://fonts.googleapis.com/css";
      function F(c, g) {
        for (var x = g.length, y = 0; y < x; y++) {
          var A = g[y].split(":");
          A.length == 3 && c.f.push(A.pop());
          var H = "";
          A.length == 2 && A[1] != "" && (H = ":"), c.a.push(A.join(H));
        }
      }
      function P(c) {
        if (c.a.length == 0) throw Error("No fonts to load!");
        if (c.c.indexOf("kit=") != -1) return c.c;
        for (var g = c.a.length, x = [], y = 0; y < g; y++) x.push(c.a[y].replace(/ /g, "+"));
        return g = c.c + "?family=" + x.join("%7C"), 0 < c.f.length && (g += "&subset=" + c.f.join(",")), 0 < c.g.length && (g += "&text=" + encodeURIComponent(c.g)), g;
      }
      function O(c) {
        this.f = c, this.a = [], this.c = {};
      }
      var E = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, z = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, B = { i: "i", italic: "i", n: "n", normal: "n" }, U = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function Z(c) {
        for (var g = c.f.length, x = 0; x < g; x++) {
          var y = c.f[x].split(":"), A = y[0].replace(/\+/g, " "), H = ["n4"];
          if (2 <= y.length) {
            var K, pe = y[1];
            if (K = [], pe) for (var pe = pe.split(","), ye = pe.length, Re = 0; Re < ye; Re++) {
              var Ie;
              if (Ie = pe[Re], Ie.match(/^[\w-]+$/)) {
                var Ue = U.exec(Ie.toLowerCase());
                if (Ue == null) Ie = "";
                else {
                  if (Ie = Ue[2], Ie = Ie == null || Ie == "" ? "n" : B[Ie], Ue = Ue[1], Ue == null || Ue == "") Ue = "4";
                  else var rt = z[Ue], Ue = rt || (isNaN(Ue) ? "4" : Ue.substr(0, 1));
                  Ie = [Ie, Ue].join("");
                }
              } else Ie = "";
              Ie && K.push(Ie);
            }
            0 < K.length && (H = K), y.length == 3 && (y = y[2], K = [], y = y ? y.split(",") : K, 0 < y.length && (y = E[y[0]]) && (c.c[A] = y));
          }
          for (c.c[A] || (y = E[A]) && (c.c[A] = y), y = 0; y < H.length; y += 1) c.a.push(new V(A, H[y]));
        }
      }
      function G(c, g) {
        this.c = c, this.a = g;
      }
      var ne = { Arimo: !0, Cousine: !0, Tinos: !0 };
      G.prototype.load = function(c) {
        var g = new D(), x = this.c, y = new S(this.a.api, this.a.text), A = this.a.families;
        F(y, A);
        var H = new O(A);
        Z(H), I(x, P(y), ke(g)), se(g, function() {
          c(H.a, H.c, ne);
        });
      };
      function W(c, g) {
        this.c = c, this.a = g;
      }
      W.prototype.load = function(c) {
        var g = this.a.id, x = this.c.o;
        g ? N(this.c, (this.a.api || "https://use.typekit.net") + "/" + g + ".js", function(y) {
          if (y) c([]);
          else if (x.Typekit && x.Typekit.config && x.Typekit.config.fn) {
            y = x.Typekit.config.fn;
            for (var A = [], H = 0; H < y.length; H += 2) for (var K = y[H], pe = y[H + 1], ye = 0; ye < pe.length; ye++) A.push(new V(K, pe[ye]));
            try {
              x.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            c(A);
          }
        }, 2e3) : c([]);
      };
      function oe(c, g) {
        this.c = c, this.f = g, this.a = [];
      }
      oe.prototype.load = function(c) {
        var g = this.f.id, x = this.c.o, y = this;
        g ? (x.__webfontfontdeckmodule__ || (x.__webfontfontdeckmodule__ = {}), x.__webfontfontdeckmodule__[g] = function(A, H) {
          for (var K = 0, pe = H.fonts.length; K < pe; ++K) {
            var ye = H.fonts[K];
            y.a.push(new V(ye.name, dt("font-weight:" + ye.weight + ";font-style:" + ye.style)));
          }
          c(y.a);
        }, N(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + b(this.c) + "/" + g + ".js", function(A) {
          A && c([]);
        })) : c([]);
      };
      var J = new kt(window);
      J.a.c.custom = function(c, g) {
        return new T(g, c);
      }, J.a.c.fontdeck = function(c, g) {
        return new oe(g, c);
      }, J.a.c.monotype = function(c, g) {
        return new w(g, c);
      }, J.a.c.typekit = function(c, g) {
        return new W(g, c);
      }, J.a.c.google = function(c, g) {
        return new G(g, c);
      };
      var Fe = { load: s(J.load, J) };
      e.exports ? e.exports = Fe : (window.WebFont = Fe, window.WebFontConfig && J.load(window.WebFontConfig));
    })();
  }(Gs)), Gs.exports;
}
var zf = jf();
const Wf = /* @__PURE__ */ Uf(zf);
function Kf() {
  const e = ge({}), t = ge(""), n = (r) => {
    e.value = r, r.photo_url && (e.value.photo_url = r.photo_url), r.font_family && Wf.load({
      google: {
        families: [r.font_family]
      },
      active: () => {
        const i = document.querySelector(".chat-container");
        i && (i.style.fontFamily = `"${r.font_family}", system-ui, sans-serif`);
      }
    }), window.parent.postMessage({
      type: "CUSTOMIZATION_UPDATE",
      data: {
        chat_bubble_color: r.chat_bubble_color || "#f34611"
      }
    }, "*");
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
const Zf = {
  key: 0,
  class: "initializing-overlay"
}, Gf = {
  key: 0,
  class: "connecting-message"
}, Yf = {
  key: 1,
  class: "failed-message"
}, Jf = { class: "welcome-content" }, Qf = { class: "welcome-header" }, Xf = ["src", "alt"], eh = { class: "welcome-title" }, th = { class: "welcome-subtitle" }, nh = { class: "welcome-input-container" }, sh = {
  key: 0,
  class: "email-input"
}, rh = ["disabled"], ih = { class: "welcome-message-input" }, oh = ["placeholder", "disabled"], lh = ["disabled"], ah = { class: "landing-page-content" }, ch = { class: "landing-page-header" }, uh = { class: "landing-page-heading" }, fh = { class: "landing-page-text" }, hh = { class: "landing-page-actions" }, dh = { class: "form-fullscreen-content" }, ph = {
  key: 0,
  class: "form-header"
}, gh = {
  key: 0,
  class: "form-title"
}, mh = {
  key: 1,
  class: "form-description"
}, _h = { class: "form-fields" }, yh = ["for"], bh = {
  key: 0,
  class: "required-indicator"
}, vh = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "autocomplete", "inputmode"], wh = ["id", "placeholder", "required", "min", "max", "value", "onInput"], kh = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput"], xh = ["id", "required", "value", "onChange"], Sh = ["value"], Ch = {
  key: 4,
  class: "checkbox-field"
}, Th = ["id", "required", "checked", "onChange"], Eh = { class: "checkbox-label" }, Ah = {
  key: 5,
  class: "radio-group"
}, Rh = ["name", "value", "required", "checked", "onChange"], Ih = { class: "radio-label" }, Oh = {
  key: 6,
  class: "field-error"
}, Lh = { class: "form-actions" }, Ph = ["disabled"], $h = {
  key: 0,
  class: "loading-spinner-inline"
}, Fh = { key: 1 }, Bh = { class: "header-content" }, Nh = ["src", "alt"], Mh = { class: "header-info" }, Dh = { class: "status" }, qh = {
  key: 1,
  class: "loading-history"
}, Vh = {
  key: 0,
  class: "rating-content"
}, Hh = { class: "rating-prompt" }, Uh = ["onMouseover", "onMouseleave", "onClick", "disabled"], jh = {
  key: 0,
  class: "feedback-wrapper"
}, zh = { class: "feedback-section" }, Wh = ["onUpdate:modelValue", "disabled"], Kh = { class: "feedback-counter" }, Zh = ["onClick", "disabled"], Gh = {
  key: 1,
  class: "submitted-feedback-wrapper"
}, Yh = { class: "submitted-feedback" }, Jh = { class: "submitted-feedback-text" }, Qh = {
  key: 2,
  class: "submitted-message"
}, Xh = {
  key: 1,
  class: "form-content"
}, ed = {
  key: 0,
  class: "form-header"
}, td = {
  key: 0,
  class: "form-title"
}, nd = {
  key: 1,
  class: "form-description"
}, sd = { class: "form-fields" }, rd = ["for"], id = {
  key: 0,
  class: "required-indicator"
}, od = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "disabled", "autocomplete", "inputmode"], ld = ["id", "placeholder", "required", "min", "max", "value", "onInput", "disabled"], ad = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "disabled"], cd = ["id", "required", "value", "onChange", "disabled"], ud = ["value"], fd = {
  key: 4,
  class: "checkbox-field"
}, hd = ["id", "checked", "onChange", "disabled"], dd = ["for"], pd = {
  key: 5,
  class: "radio-field"
}, gd = ["id", "name", "value", "checked", "onChange", "disabled"], md = ["for"], _d = {
  key: 6,
  class: "field-error"
}, yd = { class: "form-actions" }, bd = ["onClick", "disabled"], vd = {
  key: 2,
  class: "user-input-content"
}, wd = {
  key: 0,
  class: "user-input-prompt"
}, kd = {
  key: 1,
  class: "user-input-form"
}, xd = ["onUpdate:modelValue", "onKeydown"], Sd = ["onClick", "disabled"], Cd = {
  key: 2,
  class: "user-input-submitted"
}, Td = {
  key: 0,
  class: "user-input-confirmation"
}, Ed = {
  key: 3,
  class: "product-message-container"
}, Ad = ["innerHTML"], Rd = {
  key: 1,
  class: "products-carousel"
}, Id = { class: "carousel-items" }, Od = {
  key: 0,
  class: "product-image-compact"
}, Ld = ["src", "alt"], Pd = { class: "product-info-compact" }, $d = { class: "product-text-area" }, Fd = { class: "product-title-compact" }, Bd = {
  key: 0,
  class: "product-variant-compact"
}, Nd = { class: "product-price-compact" }, Md = { class: "product-actions-compact" }, Dd = ["onClick"], qd = {
  key: 2,
  class: "no-products-message"
}, Vd = {
  key: 3,
  class: "no-products-message"
}, Hd = ["innerHTML"], Ud = { class: "message-info" }, jd = {
  key: 0,
  class: "agent-name"
}, zd = {
  key: 0,
  class: "typing-indicator"
}, Wd = {
  key: 0,
  class: "email-input"
}, Kd = ["disabled"], Zd = { class: "message-input" }, Gd = ["placeholder", "disabled"], Yd = ["disabled"], Jd = { class: "conversation-ended-message" }, Qd = {
  key: 7,
  class: "rating-dialog"
}, Xd = { class: "rating-content" }, ep = { class: "star-rating" }, tp = ["onClick"], np = { class: "rating-actions" }, sp = ["disabled"], Ys = "ctid", rp = /* @__PURE__ */ Oa({
  __name: "WidgetBuilder",
  props: {
    widgetId: {}
  },
  setup(e) {
    var Xr;
    he.setOptions({
      renderer: new he.Renderer(),
      gfm: !0,
      breaks: !0
    });
    const t = new he.Renderer(), n = t.link;
    t.link = (_, v, d) => n.call(t, _, v, d).replace(/^<a /, '<a target="_blank" rel="nofollow" '), he.use({ renderer: t });
    const s = e, r = Ve(() => {
      var _;
      return s.widgetId || ((_ = window.__INITIAL_DATA__) == null ? void 0 : _.widgetId);
    }), {
      customization: i,
      agentName: o,
      applyCustomization: l,
      initializeFromData: a
    } = Kf(), {
      messages: f,
      loading: u,
      errorMessage: m,
      showError: b,
      loadingHistory: I,
      hasStartedChat: N,
      connectionStatus: D,
      sendMessage: ke,
      loadChatHistory: se,
      connect: me,
      reconnect: _e,
      cleanup: V,
      humanAgent: ce,
      onTakeover: qe,
      submitRating: de,
      submitForm: ze,
      currentForm: dt,
      getWorkflowState: Ye,
      proceedWorkflow: pt,
      onWorkflowState: vt,
      onWorkflowProceeded: tt
    } = Hf(), He = ge(""), jt = ge(!0), re = ge(""), te = ge(!1), ie = (_) => {
      const v = _.target;
      He.value = v.value;
    };
    let M = null;
    const $e = () => {
      M && M.disconnect(), M = new MutationObserver((v) => {
        let d = !1;
        v.forEach((Y) => {
          if (Y.type === "childList") {
            const Se = Array.from(Y.addedNodes).some(
              (le) => {
                var $t;
                return le.nodeType === Node.ELEMENT_NODE && le.matches("input, textarea") || (($t = le.querySelector) == null ? void 0 : $t.call(le, "input, textarea"));
              }
            ), Q = Array.from(Y.removedNodes).some(
              (le) => {
                var $t;
                return le.nodeType === Node.ELEMENT_NODE && le.matches("input, textarea") || (($t = le.querySelector) == null ? void 0 : $t.call(le, "input, textarea"));
              }
            );
            (Se || Q) && (d = !0);
          }
        }), d && setTimeout(j, 100);
      });
      const _ = document.querySelector(".widget-container") || document.body;
      M.observe(_, {
        childList: !0,
        subtree: !0
      });
    }, j = () => {
      const _ = [
        '.widget-container input[type="text"]',
        '.chat-container input[type="text"]',
        ".message-input input",
        ".welcome-message-field",
        ".ask-anything-field",
        'input[placeholder*="message"]',
        'input[placeholder*="Type"]',
        "input.message-input",
        "textarea",
        "input"
      ];
      let v = [];
      for (const d of _) {
        const Y = document.querySelectorAll(d);
        if (Y.length > 0) {
          v = Array.from(Y);
          break;
        }
      }
      if (v.length === 0) {
        setTimeout(j, 200);
        return;
      }
      v.forEach((d) => {
        d.removeEventListener("input", xe), d.removeEventListener("keyup", xe), d.removeEventListener("change", xe), d.addEventListener("input", xe, !0), d.addEventListener("keyup", xe, !0), d.addEventListener("change", xe, !0);
      });
    }, xe = (_) => {
      const v = _.target;
      He.value = v.value;
    }, lt = ge(!0), wt = ge(((Xr = window.__INITIAL_DATA__) == null ? void 0 : Xr.initialToken) || localStorage.getItem(Ys));
    Ve(() => !!wt.value), a();
    const gt = window.__INITIAL_DATA__;
    console.log("Initial data:", gt), gt != null && gt.initialToken && (wt.value = gt.initialToken, window.parent.postMessage({
      type: "TOKEN_UPDATE",
      token: gt.initialToken
    }, "*"), te.value = !0);
    const at = ge(null), {
      chatStyles: st,
      chatIconStyles: Pt,
      agentBubbleStyles: mt,
      userBubbleStyles: We,
      messageNameStyles: kt,
      headerBorderStyles: h,
      photoUrl: p,
      shadowStyle: w
    } = Ku(i);
    Ve(() => f.value.some(
      (_) => _.message_type === "form" && (!_.isSubmitted || _.isSubmitted === !1)
    ));
    const T = Ve(() => N.value && te.value || ct.value ? D.value === "connected" && !u.value : xn(re.value.trim()) && D.value === "connected" && !u.value), S = async () => {
      if (!He.value.trim()) return;
      !N.value && re.value && await F(), await ke(He.value, re.value), He.value = "";
      const _ = document.querySelector('input[placeholder*="Type a message"]');
      _ && (_.value = ""), setTimeout(() => {
        j();
      }, 500);
    }, C = (_) => {
      _.key === "Enter" && !_.shiftKey && (_.preventDefault(), S());
    }, F = async () => {
      var _, v, d;
      try {
        if (!r.value)
          return console.error("Widget ID is not available"), !1;
        const Y = new URL(`${_s.API_URL}/widgets/${r.value}`);
        re.value.trim() && xn(re.value.trim()) && Y.searchParams.append("email", re.value.trim());
        const Se = {
          Accept: "application/json",
          "Content-Type": "application/json"
        };
        wt.value && (Se.Authorization = `Bearer ${wt.value}`);
        const Q = await fetch(Y, {
          headers: Se
        });
        if (Q.status === 401)
          return te.value = !1, !1;
        const le = await Q.json();
        return le.token && (wt.value = le.token, localStorage.setItem(Ys, le.token), window.parent.postMessage({ type: "TOKEN_UPDATE", token: le.token }, "*")), te.value = !0, await me() ? (await P(), (_ = le.agent) != null && _.customization && l(le.agent.customization), le.agent && !(le != null && le.human_agent) && (o.value = le.agent.name), le != null && le.human_agent && (ce.value = le.human_agent), ((v = le.agent) == null ? void 0 : v.workflow) !== void 0 && (window.__INITIAL_DATA__ = window.__INITIAL_DATA__ || {}, window.__INITIAL_DATA__.workflow = le.agent.workflow), (d = le.agent) != null && d.workflow && (console.log("Getting workflow state after authorization"), await Ye()), !0) : (console.error("Failed to connect to chat service"), !1);
      } catch (Y) {
        return console.error("Error checking authorization:", Y), te.value = !1, !1;
      } finally {
        lt.value = !1;
      }
    }, P = async () => {
      !N.value && te.value && (N.value = !0, await se());
    }, O = () => {
      at.value && (at.value.scrollTop = at.value.scrollHeight);
    };
    Xn(() => f.value, (_) => {
      if (Eo(() => {
        O();
      }), _.length > 0) {
        const v = _[_.length - 1];
        K(v);
      }
    }, { deep: !0 });
    const E = async () => {
      await _e() && await F();
    }, z = ge(!1), B = ge(0), U = ge(""), Z = ge(""), G = ge(0), ne = ge(!1), W = ge({}), oe = ge(!1), J = ge({}), Fe = ge(!1), c = ge(null), g = ge("Start Chat"), x = ge(!1), y = ge(null);
    Ve(() => {
      var v;
      const _ = f.value[f.value.length - 1];
      return ((v = _ == null ? void 0 : _.attributes) == null ? void 0 : v.request_rating) || !1;
    });
    const A = Ve(() => {
      var v;
      if (!((v = window.__INITIAL_DATA__) != null && v.workflow))
        return !1;
      const _ = f.value.find((d) => d.message_type === "rating");
      return (_ == null ? void 0 : _.isSubmitted) === !0;
    }), H = Ve(() => ce.value.human_agent_profile_pic ? ce.value.human_agent_profile_pic.includes("amazonaws.com") ? ce.value.human_agent_profile_pic : `${_s.API_URL}${ce.value.human_agent_profile_pic}` : ""), K = (_) => {
      var v, d, Y;
      if ((v = _.attributes) != null && v.end_chat && ((d = _.attributes) != null && d.request_rating)) {
        const Se = _.agent_name || ((Y = ce.value) == null ? void 0 : Y.human_agent_name) || o.value || "our agent";
        f.value.push({
          message: `Rate the chat session that you had with ${Se}`,
          message_type: "rating",
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: _.session_id,
          agent_name: Se,
          showFeedback: !1
        }), Z.value = _.session_id;
      }
    }, pe = (_) => {
      ne.value || (G.value = _);
    }, ye = () => {
      if (!ne.value) {
        const _ = f.value[f.value.length - 1];
        G.value = (_ == null ? void 0 : _.selectedRating) || 0;
      }
    }, Re = async (_) => {
      if (!ne.value) {
        G.value = _;
        const v = f.value[f.value.length - 1];
        v && v.message_type === "rating" && (v.showFeedback = !0, v.selectedRating = _);
      }
    }, Ie = async (_, v, d = null) => {
      try {
        ne.value = !0, await de(v, d);
        const Y = f.value.find((Se) => Se.message_type === "rating");
        Y && (Y.isSubmitted = !0, Y.finalRating = v, Y.finalFeedback = d);
      } catch (Y) {
        console.error("Failed to submit rating:", Y);
      } finally {
        ne.value = !1;
      }
    }, Ue = (_) => {
      const v = {};
      for (const d of _.fields) {
        const Y = W.value[d.name], Se = Ps(d, Y);
        Se && (v[d.name] = Se);
      }
      return J.value = v, Object.keys(v).length === 0;
    }, rt = async (_) => {
      if (console.log("handleFormSubmit called with config:", _), console.log("Current form data:", W.value), console.log("isSubmittingForm:", oe.value), oe.value) {
        console.log("Form submission already in progress, returning");
        return;
      }
      console.log("Validating form...");
      const v = Ue(_);
      if (console.log("Form validation result:", v), console.log("Form errors:", J.value), !v) {
        console.log("Form validation failed, not submitting");
        return;
      }
      try {
        console.log("Starting form submission..."), oe.value = !0, await ze(W.value), console.log("Form submitted successfully");
        const d = f.value.findIndex(
          (Y) => Y.message_type === "form" && (!Y.isSubmitted || Y.isSubmitted === !1)
        );
        d !== -1 && (f.value.splice(d, 1), console.log("Removed form message from chat")), W.value = {}, J.value = {}, console.log("Cleared form data and errors");
      } catch (d) {
        console.error("Failed to submit form:", d);
      } finally {
        oe.value = !1, console.log("Form submission completed");
      }
    }, Be = (_, v) => {
      var d, Y;
      if (console.log(`Field change: ${_} = `, v), W.value[_] = v, console.log("Updated formData:", W.value), v && v.toString().trim() !== "") {
        let Se = null;
        if ((d = y.value) != null && d.fields && (Se = y.value.fields.find((Q) => Q.name === _)), !Se && ((Y = dt.value) != null && Y.fields) && (Se = dt.value.fields.find((Q) => Q.name === _)), Se) {
          const Q = Ps(Se, v);
          Q ? (J.value[_] = Q, console.log(`Validation error for ${_}:`, Q)) : (delete J.value[_], console.log(`Validation passed for ${_}`));
        }
      } else
        delete J.value[_], console.log(`Cleared error for ${_}`);
    }, Ls = (_) => {
      const v = _.replace(/\D/g, "");
      return v.length >= 7 && v.length <= 15;
    }, Ps = (_, v) => {
      if (_.required && (!v || v.toString().trim() === ""))
        return `${_.label} is required`;
      if (!v || v.toString().trim() === "")
        return null;
      if (_.type === "email" && !xn(v))
        return "Please enter a valid email address";
      if (_.type === "tel" && !Ls(v))
        return "Please enter a valid phone number";
      if ((_.type === "text" || _.type === "textarea") && _.minLength && v.length < _.minLength)
        return `${_.label} must be at least ${_.minLength} characters`;
      if ((_.type === "text" || _.type === "textarea") && _.maxLength && v.length > _.maxLength)
        return `${_.label} must not exceed ${_.maxLength} characters`;
      if (_.type === "number") {
        const d = parseFloat(v);
        if (isNaN(d))
          return `${_.label} must be a valid number`;
        if (_.minLength && d < _.minLength)
          return `${_.label} must be at least ${_.minLength}`;
        if (_.maxLength && d > _.maxLength)
          return `${_.label} must not exceed ${_.maxLength}`;
      }
      return null;
    }, Rl = async () => {
      if (oe.value || !y.value) {
        console.log("Already submitting or no form data, returning");
        return;
      }
      try {
        console.log("Starting full screen form submission..."), oe.value = !0, J.value = {};
        let _ = !1;
        for (const v of y.value.fields || []) {
          const d = W.value[v.name], Y = Ps(v, d);
          Y && (J.value[v.name] = Y, _ = !0, console.log(`Validation error for field ${v.name}:`, Y));
        }
        if (console.log("Validation completed. Has errors:", _), console.log("Form errors:", J.value), _) {
          oe.value = !1, console.log("Validation failed, not submitting");
          return;
        }
        console.log("Submitting form data:", W.value), await ze(W.value), console.log("Full screen form submitted successfully"), x.value = !1, y.value = null, W.value = {}, console.log("Full screen form hidden and data cleared");
      } catch (_) {
        console.error("Failed to submit full screen form:", _);
      } finally {
        oe.value = !1, console.log("Full screen form submission completed");
      }
    }, Il = (_) => {
      _ && window.parent.postMessage({
        type: "VIEW_PRODUCT",
        productId: _
      }, "*");
    }, Ol = (_) => _ ? _.replace(/https?:\/\/[^\s\)]+/g, "[link removed]") : "", Ll = async () => {
      try {
        Fe.value = !1, c.value = null, await pt();
      } catch (_) {
        console.error("Failed to proceed workflow:", _);
      }
    }, $s = async (_) => {
      try {
        if (!_.userInputValue || !_.userInputValue.trim())
          return;
        const v = _.userInputValue.trim();
        _.isSubmitted = !0, _.submittedValue = v, await ke(v, re.value), console.log("User input submitted:", v);
      } catch (v) {
        console.error("Failed to submit user input:", v), _.isSubmitted = !1, _.submittedValue = null;
      }
    }, Jr = async () => {
      var _, v, d;
      try {
        let Y = 0;
        const Se = 50;
        for (; !((_ = window.__INITIAL_DATA__) != null && _.widgetId) && Y < Se; )
          await new Promise((le) => setTimeout(le, 100)), Y++;
        return (v = window.__INITIAL_DATA__) != null && v.widgetId ? await F() ? ((d = window.__INITIAL_DATA__) != null && d.workflow && te.value && await Ye(), !0) : (D.value = "connected", !1) : (console.error("Widget data not available after waiting"), !1);
      } catch (Y) {
        return console.error("Failed to initialize widget:", Y), !1;
      }
    }, Pl = () => {
      qe(async () => {
        await F();
      }), window.addEventListener("message", (_) => {
        _.data.type === "SCROLL_TO_BOTTOM" && O(), _.data.type === "TOKEN_RECEIVED" && localStorage.setItem(Ys, _.data.token);
      }), vt((_) => {
        var v, d;
        if (console.log("Workflow state received in component:", _), console.log("Data type:", _.type), console.log("Form data:", _.form_data), g.value = _.button_text || "Start Chat", _.type === "landing_page")
          console.log("Setting landing page data:", _.landing_page_data), c.value = _.landing_page_data, Fe.value = !0, x.value = !1, console.log("Landing page state - show:", Fe.value, "data:", c.value);
        else if (_.type === "form" || _.type === "display_form")
          if (console.log("Form full screen flag:", (v = _.form_data) == null ? void 0 : v.form_full_screen), ((d = _.form_data) == null ? void 0 : d.form_full_screen) === !0)
            console.log("Setting full screen form data:", _.form_data), y.value = _.form_data, x.value = !0, Fe.value = !1, console.log("Full screen form state - show:", x.value);
          else {
            console.log("Regular form mode - adding form message to chat");
            const Y = {
              message: "",
              message_type: "form",
              attributes: {
                form_data: _.form_data
              },
              created_at: (/* @__PURE__ */ new Date()).toISOString(),
              isSubmitted: !1
            };
            f.value.findIndex(
              (Q) => Q.message_type === "form" && !Q.isSubmitted
            ) === -1 && f.value.push(Y), Fe.value = !1, x.value = !1;
          }
        else
          console.log("No special workflow state, hiding overlay forms"), Fe.value = !1, x.value = !1;
      }), tt((_) => {
        console.log("Workflow proceeded:", _);
      });
    }, $l = async () => {
      try {
        console.log("Starting new conversation - getting workflow state"), await Jr(), await Ye();
      } catch (_) {
        throw console.error("Failed to start new conversation:", _), _;
      }
    }, Fl = async () => {
      A.value = !1, f.value = [], await $l();
    };
    Fo(async () => {
      await Jr(), Pl(), $e(), setTimeout(() => {
        j();
      }, 500);
    }), Pr(() => {
      window.removeEventListener("message", (_) => {
        _.data.type === "SCROLL_TO_BOTTOM" && O();
      }), M && (M.disconnect(), M = null), V();
    });
    const ct = Ve(() => i.value.chat_style === "ASK_ANYTHING"), Bl = Ve(() => {
      const _ = {
        width: "100%",
        height: "580px",
        borderRadius: "var(--radius-lg)"
      };
      return ct.value ? {
        ..._,
        width: "100%",
        maxWidth: "800px",
        // Increased width for ASK_ANYTHING style
        minWidth: "600px"
        // Ensure minimum width
      } : _;
    }), Qr = Ve(() => ct.value && f.value.length === 0);
    return (_, v) => (L(), $("div", {
      class: Oe(["chat-container", { collapsed: !jt.value, "ask-anything-style": ct.value }]),
      style: Ee({ ...q(w), ...Bl.value })
    }, [
      lt.value ? (L(), $("div", Zf, v[8] || (v[8] = [
        xc('<div class="loading-spinner" data-v-463fef1a><div class="dot" data-v-463fef1a></div><div class="dot" data-v-463fef1a></div><div class="dot" data-v-463fef1a></div></div><div class="loading-text" data-v-463fef1a>Initializing chat...</div>', 2)
      ]))) : ae("", !0),
      !lt.value && q(D) !== "connected" ? (L(), $("div", {
        key: 1,
        class: Oe(["connection-status", q(D)])
      }, [
        q(D) === "connecting" ? (L(), $("div", Gf, v[9] || (v[9] = [
          _t(" Connecting to chat service... ", -1),
          k("div", { class: "loading-dots" }, [
            k("div", { class: "dot" }),
            k("div", { class: "dot" }),
            k("div", { class: "dot" })
          ], -1)
        ]))) : q(D) === "failed" ? (L(), $("div", Yf, [
          v[10] || (v[10] = _t(" Connection failed. ", -1)),
          k("button", {
            onClick: E,
            class: "reconnect-button"
          }, " Click here to reconnect ")
        ])) : ae("", !0)
      ], 2)) : ae("", !0),
      q(b) ? (L(), $("div", {
        key: 2,
        class: "error-alert",
        style: Ee(q(Pt))
      }, fe(q(m)), 5)) : ae("", !0),
      Qr.value ? (L(), $("div", {
        key: 3,
        class: "welcome-message-section",
        style: Ee(q(st))
      }, [
        k("div", Jf, [
          k("div", Qf, [
            q(p) ? (L(), $("img", {
              key: 0,
              src: q(p),
              alt: q(o),
              class: "welcome-avatar"
            }, null, 8, Xf)) : ae("", !0),
            k("h1", eh, fe(q(i).welcome_title || `Welcome to ${q(o)}`), 1),
            k("p", th, fe(q(i).welcome_subtitle || "I'm here to help you with anything you need. What can I assist you with today?"), 1)
          ])
        ]),
        k("div", nh, [
          !q(N) && !te.value && !ct.value ? (L(), $("div", sh, [
            nn(k("input", {
              "onUpdate:modelValue": v[0] || (v[0] = (d) => re.value = d),
              type: "email",
              placeholder: "Enter your email address",
              disabled: q(u) || q(D) !== "connected",
              class: Oe([{
                invalid: re.value.trim() && !q(xn)(re.value.trim()),
                disabled: q(D) !== "connected"
              }, "welcome-email-input"])
            }, null, 10, rh), [
              [on, re.value]
            ])
          ])) : ae("", !0),
          k("div", ih, [
            nn(k("input", {
              "onUpdate:modelValue": v[1] || (v[1] = (d) => He.value = d),
              type: "text",
              placeholder: q(D) === "connected" ? "Ask me anything..." : "Connecting...",
              onKeypress: C,
              onInput: ie,
              onChange: ie,
              disabled: !T.value,
              class: Oe([{ disabled: q(D) !== "connected" }, "welcome-message-field"])
            }, null, 42, oh), [
              [on, He.value]
            ]),
            k("button", {
              class: "welcome-send-button",
              style: Ee(q(We)),
              onClick: S,
              disabled: !He.value.trim() || !T.value
            }, v[11] || (v[11] = [
              k("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                k("path", {
                  d: "M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1)
            ]), 12, lh)
          ])
        ]),
        k("div", {
          class: "powered-by-welcome",
          style: Ee(q(kt))
        }, v[12] || (v[12] = [
          k("svg", {
            class: "chattermate-logo",
            width: "16",
            height: "16",
            viewBox: "0 0 60 60",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            k("path", {
              d: "M45 15H15C13.3431 15 12 16.3431 12 18V42C12 43.6569 13.3431 45 15 45H25L30 52L35 45H45C46.6569 45 48 43.6569 48 42V18C48 16.3431 46.6569 15 45 15Z",
              fill: "currentColor",
              opacity: "0.8"
            }),
            k("path", {
              d: "M36 27C36 27 32.5 26 30 26C27.5 26 24 27 24 31C24 35 27.5 36 30 36C32.5 36 36 35 36 35V33C36 33 33 34 31.5 34C30 34 27 33 27 31C27 29 30 28 31.5 28C33 28 36 29 36 29V27Z",
              fill: "currentColor"
            })
          ], -1),
          _t(" Powered by ChatterMate ", -1)
        ]), 4)
      ], 4)) : ae("", !0),
      Fe.value && c.value ? (L(), $("div", {
        key: 4,
        class: "landing-page-fullscreen",
        style: Ee(q(st))
      }, [
        k("div", ah, [
          k("div", ch, [
            k("h2", uh, fe(c.value.heading), 1),
            k("div", fh, fe(c.value.content), 1)
          ]),
          k("div", hh, [
            k("button", {
              class: "landing-page-button",
              onClick: Ll
            }, fe(g.value), 1)
          ])
        ]),
        k("div", {
          class: "powered-by-landing",
          style: Ee(q(kt))
        }, v[13] || (v[13] = [
          k("svg", {
            class: "chattermate-logo",
            width: "16",
            height: "16",
            viewBox: "0 0 60 60",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            k("path", {
              d: "M45 15H15C13.3431 15 12 16.3431 12 18V42C12 43.6569 13.3431 45 15 45H25L30 52L35 45H45C46.6569 45 48 43.6569 48 42V18C48 16.3431 46.6569 15 45 15Z",
              fill: "currentColor",
              opacity: "0.8"
            }),
            k("path", {
              d: "M36 27C36 27 32.5 26 30 26C27.5 26 24 27 24 31C24 35 27.5 36 30 36C32.5 36 36 35 36 35V33C36 33 33 34 31.5 34C30 34 27 33 27 31C27 29 30 28 31.5 28C33 28 36 29 36 29V27Z",
              fill: "currentColor"
            })
          ], -1),
          _t(" Powered by ChatterMate ", -1)
        ]), 4)
      ], 4)) : x.value && y.value ? (L(), $("div", {
        key: 5,
        class: "form-fullscreen",
        style: Ee(q(st))
      }, [
        k("div", dh, [
          y.value.title || y.value.description ? (L(), $("div", ph, [
            y.value.title ? (L(), $("h2", gh, fe(y.value.title), 1)) : ae("", !0),
            y.value.description ? (L(), $("p", mh, fe(y.value.description), 1)) : ae("", !0)
          ])) : ae("", !0),
          k("div", _h, [
            (L(!0), $(Ne, null, xt(y.value.fields, (d) => {
              var Y, Se;
              return L(), $("div", {
                key: d.name,
                class: "form-field"
              }, [
                k("label", {
                  for: `fullscreen-form-${d.name}`,
                  class: "field-label"
                }, [
                  _t(fe(d.label) + " ", 1),
                  d.required ? (L(), $("span", bh, "*")) : ae("", !0)
                ], 8, yh),
                d.type === "text" || d.type === "email" || d.type === "tel" ? (L(), $("input", {
                  key: 0,
                  id: `fullscreen-form-${d.name}`,
                  type: d.type,
                  placeholder: d.placeholder || "",
                  required: d.required,
                  minlength: d.minLength,
                  maxlength: d.maxLength,
                  value: W.value[d.name] || "",
                  onInput: (Q) => Be(d.name, Q.target.value),
                  onBlur: (Q) => Be(d.name, Q.target.value),
                  class: Oe(["form-input", { error: J.value[d.name] }]),
                  autocomplete: d.type === "email" ? "email" : d.type === "tel" ? "tel" : "off",
                  inputmode: d.type === "tel" ? "tel" : d.type === "email" ? "email" : "text"
                }, null, 42, vh)) : d.type === "number" ? (L(), $("input", {
                  key: 1,
                  id: `fullscreen-form-${d.name}`,
                  type: "number",
                  placeholder: d.placeholder || "",
                  required: d.required,
                  min: d.minLength,
                  max: d.maxLength,
                  value: W.value[d.name] || "",
                  onInput: (Q) => Be(d.name, Q.target.value),
                  class: Oe(["form-input", { error: J.value[d.name] }])
                }, null, 42, wh)) : d.type === "textarea" ? (L(), $("textarea", {
                  key: 2,
                  id: `fullscreen-form-${d.name}`,
                  placeholder: d.placeholder || "",
                  required: d.required,
                  minlength: d.minLength,
                  maxlength: d.maxLength,
                  value: W.value[d.name] || "",
                  onInput: (Q) => Be(d.name, Q.target.value),
                  class: Oe(["form-textarea", { error: J.value[d.name] }]),
                  rows: "4"
                }, null, 42, kh)) : d.type === "select" ? (L(), $("select", {
                  key: 3,
                  id: `fullscreen-form-${d.name}`,
                  required: d.required,
                  value: W.value[d.name] || "",
                  onChange: (Q) => Be(d.name, Q.target.value),
                  class: Oe(["form-select", { error: J.value[d.name] }])
                }, [
                  v[14] || (v[14] = k("option", { value: "" }, "Please select...", -1)),
                  (L(!0), $(Ne, null, xt((Y = d.options) == null ? void 0 : Y.split(`
`).filter((Q) => Q.trim()), (Q) => (L(), $("option", {
                    key: Q,
                    value: Q.trim()
                  }, fe(Q.trim()), 9, Sh))), 128))
                ], 42, xh)) : d.type === "checkbox" ? (L(), $("label", Ch, [
                  k("input", {
                    id: `fullscreen-form-${d.name}`,
                    type: "checkbox",
                    required: d.required,
                    checked: W.value[d.name] || !1,
                    onChange: (Q) => Be(d.name, Q.target.checked),
                    class: "form-checkbox"
                  }, null, 40, Th),
                  k("span", Eh, fe(d.label), 1)
                ])) : d.type === "radio" ? (L(), $("div", Ah, [
                  (L(!0), $(Ne, null, xt((Se = d.options) == null ? void 0 : Se.split(`
`).filter((Q) => Q.trim()), (Q) => (L(), $("label", {
                    key: Q,
                    class: "radio-field"
                  }, [
                    k("input", {
                      type: "radio",
                      name: `fullscreen-form-${d.name}`,
                      value: Q.trim(),
                      required: d.required,
                      checked: W.value[d.name] === Q.trim(),
                      onChange: (le) => Be(d.name, Q.trim()),
                      class: "form-radio"
                    }, null, 40, Rh),
                    k("span", Ih, fe(Q.trim()), 1)
                  ]))), 128))
                ])) : ae("", !0),
                J.value[d.name] ? (L(), $("div", Oh, fe(J.value[d.name]), 1)) : ae("", !0)
              ]);
            }), 128))
          ]),
          k("div", Lh, [
            k("button", {
              onClick: v[2] || (v[2] = () => {
                console.log("Submit button clicked!"), Rl();
              }),
              disabled: oe.value,
              class: "submit-form-button",
              style: Ee(q(We))
            }, [
              oe.value ? (L(), $("span", $h, v[15] || (v[15] = [
                k("div", { class: "dot" }, null, -1),
                k("div", { class: "dot" }, null, -1),
                k("div", { class: "dot" }, null, -1)
              ]))) : (L(), $("span", Fh, fe(y.value.submit_button_text || "Submit"), 1))
            ], 12, Ph)
          ])
        ]),
        k("div", {
          class: "powered-by-landing",
          style: Ee(q(kt))
        }, v[16] || (v[16] = [
          k("svg", {
            class: "chattermate-logo",
            width: "16",
            height: "16",
            viewBox: "0 0 60 60",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            k("path", {
              d: "M45 15H15C13.3431 15 12 16.3431 12 18V42C12 43.6569 13.3431 45 15 45H25L30 52L35 45H45C46.6569 45 48 43.6569 48 42V18C48 16.3431 46.6569 15 45 15Z",
              fill: "currentColor",
              opacity: "0.8"
            }),
            k("path", {
              d: "M36 27C36 27 32.5 26 30 26C27.5 26 24 27 24 31C24 35 27.5 36 30 36C32.5 36 36 35 36 35V33C36 33 33 34 31.5 34C30 34 27 33 27 31C27 29 30 28 31.5 28C33 28 36 29 36 29V27Z",
              fill: "currentColor"
            })
          ], -1),
          _t(" Powered by ChatterMate ", -1)
        ]), 4)
      ], 4)) : Qr.value ? ae("", !0) : (L(), $(Ne, { key: 6 }, [
        jt.value ? (L(), $("div", {
          key: 0,
          class: Oe(["chat-panel", { "ask-anything-chat": ct.value }]),
          style: Ee(q(st))
        }, [
          ct.value ? ae("", !0) : (L(), $("div", {
            key: 0,
            class: "chat-header",
            style: Ee(q(h))
          }, [
            k("div", Bh, [
              H.value || q(p) ? (L(), $("img", {
                key: 0,
                src: H.value || q(p),
                alt: q(ce).human_agent_name || q(o),
                class: "header-avatar"
              }, null, 8, Nh)) : ae("", !0),
              k("div", Mh, [
                k("h3", {
                  style: Ee(q(kt))
                }, fe(q(ce).human_agent_name || q(o)), 5),
                k("div", Dh, [
                  v[17] || (v[17] = k("span", { class: "status-indicator online" }, null, -1)),
                  k("span", {
                    class: "status-text",
                    style: Ee(q(kt))
                  }, "Online", 4)
                ])
              ])
            ])
          ], 4)),
          q(I) ? (L(), $("div", qh, v[18] || (v[18] = [
            k("div", { class: "loading-spinner" }, [
              k("div", { class: "dot" }),
              k("div", { class: "dot" }),
              k("div", { class: "dot" })
            ], -1)
          ]))) : ae("", !0),
          k("div", {
            class: "chat-messages",
            ref_key: "messagesContainer",
            ref: at
          }, [
            (L(!0), $(Ne, null, xt(q(f), (d, Y) => {
              var Se, Q, le, $t, ei, ti, ni, si, ri, ii, oi, li, ai, ci, ui, fi, hi;
              return L(), $("div", {
                key: Y,
                class: Oe([
                  "message",
                  d.message_type === "bot" || d.message_type === "agent" ? "agent-message" : d.message_type === "system" ? "system-message" : d.message_type === "rating" ? "rating-message" : d.message_type === "form" ? "form-message" : d.message_type === "product" || d.shopify_output ? "product-message" : "user-message"
                ])
              }, [
                k("div", {
                  class: "message-bubble",
                  style: Ee(d.message_type === "system" || d.message_type === "rating" || d.message_type === "product" || d.shopify_output ? {} : d.message_type === "user" ? q(We) : q(mt))
                }, [
                  d.message_type === "rating" ? (L(), $("div", Vh, [
                    k("p", Hh, "Rate the chat session that you had with " + fe(d.agent_name || q(ce).human_agent_name || q(o) || "our agent"), 1),
                    k("div", {
                      class: Oe(["star-rating", { submitted: ne.value || d.isSubmitted }])
                    }, [
                      (L(), $(Ne, null, xt(5, (R) => k("button", {
                        key: R,
                        class: Oe(["star-button", {
                          warning: R <= (d.isSubmitted ? d.finalRating : G.value || d.selectedRating) && (d.isSubmitted ? d.finalRating : G.value || d.selectedRating) <= 3,
                          success: R <= (d.isSubmitted ? d.finalRating : G.value || d.selectedRating) && (d.isSubmitted ? d.finalRating : G.value || d.selectedRating) > 3,
                          selected: R <= (d.isSubmitted ? d.finalRating : G.value || d.selectedRating)
                        }]),
                        onMouseover: (zt) => !d.isSubmitted && pe(R),
                        onMouseleave: (zt) => !d.isSubmitted && ye,
                        onClick: (zt) => !d.isSubmitted && Re(R),
                        disabled: ne.value || d.isSubmitted
                      }, " ★ ", 42, Uh)), 64))
                    ], 2),
                    d.showFeedback && !d.isSubmitted ? (L(), $("div", jh, [
                      k("div", zh, [
                        nn(k("input", {
                          "onUpdate:modelValue": (R) => d.feedback = R,
                          placeholder: "Please share your feedback (optional)",
                          disabled: ne.value,
                          maxlength: "500",
                          class: "feedback-input"
                        }, null, 8, Wh), [
                          [on, d.feedback]
                        ]),
                        k("div", Kh, fe(((Se = d.feedback) == null ? void 0 : Se.length) || 0) + "/500", 1)
                      ]),
                      k("button", {
                        onClick: (R) => Ie(d.session_id, G.value, d.feedback),
                        disabled: ne.value || !G.value,
                        class: "submit-rating-button",
                        style: Ee({ backgroundColor: q(i).accent_color || "var(--primary-color)" })
                      }, fe(ne.value ? "Submitting..." : "Submit Rating"), 13, Zh)
                    ])) : ae("", !0),
                    d.isSubmitted && d.finalFeedback ? (L(), $("div", Gh, [
                      k("div", Yh, [
                        k("p", Jh, fe(d.finalFeedback), 1)
                      ])
                    ])) : d.isSubmitted ? (L(), $("div", Qh, " Thank you for your rating! ")) : ae("", !0)
                  ])) : d.message_type === "form" ? (L(), $("div", Xh, [
                    (le = (Q = d.attributes) == null ? void 0 : Q.form_data) != null && le.title || (ei = ($t = d.attributes) == null ? void 0 : $t.form_data) != null && ei.description ? (L(), $("div", ed, [
                      (ni = (ti = d.attributes) == null ? void 0 : ti.form_data) != null && ni.title ? (L(), $("h3", td, fe(d.attributes.form_data.title), 1)) : ae("", !0),
                      (ri = (si = d.attributes) == null ? void 0 : si.form_data) != null && ri.description ? (L(), $("p", nd, fe(d.attributes.form_data.description), 1)) : ae("", !0)
                    ])) : ae("", !0),
                    k("div", sd, [
                      (L(!0), $(Ne, null, xt((oi = (ii = d.attributes) == null ? void 0 : ii.form_data) == null ? void 0 : oi.fields, (R) => {
                        var zt, Fs;
                        return L(), $("div", {
                          key: R.name,
                          class: "form-field"
                        }, [
                          k("label", {
                            for: `form-${R.name}`,
                            class: "field-label"
                          }, [
                            _t(fe(R.label) + " ", 1),
                            R.required ? (L(), $("span", id, "*")) : ae("", !0)
                          ], 8, rd),
                          R.type === "text" || R.type === "email" || R.type === "tel" ? (L(), $("input", {
                            key: 0,
                            id: `form-${R.name}`,
                            type: R.type,
                            placeholder: R.placeholder || "",
                            required: R.required,
                            minlength: R.minLength,
                            maxlength: R.maxLength,
                            value: W.value[R.name] || "",
                            onInput: (Le) => Be(R.name, Le.target.value),
                            onBlur: (Le) => Be(R.name, Le.target.value),
                            class: Oe(["form-input", { error: J.value[R.name] }]),
                            disabled: oe.value,
                            autocomplete: R.type === "email" ? "email" : R.type === "tel" ? "tel" : "off",
                            inputmode: R.type === "tel" ? "tel" : R.type === "email" ? "email" : "text"
                          }, null, 42, od)) : R.type === "number" ? (L(), $("input", {
                            key: 1,
                            id: `form-${R.name}`,
                            type: "number",
                            placeholder: R.placeholder || "",
                            required: R.required,
                            min: R.min,
                            max: R.max,
                            value: W.value[R.name] || "",
                            onInput: (Le) => Be(R.name, Le.target.value),
                            class: Oe(["form-input", { error: J.value[R.name] }]),
                            disabled: oe.value
                          }, null, 42, ld)) : R.type === "textarea" ? (L(), $("textarea", {
                            key: 2,
                            id: `form-${R.name}`,
                            placeholder: R.placeholder || "",
                            required: R.required,
                            minlength: R.minLength,
                            maxlength: R.maxLength,
                            value: W.value[R.name] || "",
                            onInput: (Le) => Be(R.name, Le.target.value),
                            class: Oe(["form-textarea", { error: J.value[R.name] }]),
                            disabled: oe.value,
                            rows: "3"
                          }, null, 42, ad)) : R.type === "select" ? (L(), $("select", {
                            key: 3,
                            id: `form-${R.name}`,
                            required: R.required,
                            value: W.value[R.name] || "",
                            onChange: (Le) => Be(R.name, Le.target.value),
                            class: Oe(["form-select", { error: J.value[R.name] }]),
                            disabled: oe.value
                          }, [
                            v[19] || (v[19] = k("option", { value: "" }, "Select an option", -1)),
                            (L(!0), $(Ne, null, xt(((zt = R.options) == null ? void 0 : zt.split(",")) || [], (Le) => (L(), $("option", {
                              key: Le.trim(),
                              value: Le.trim()
                            }, fe(Le.trim()), 9, ud))), 128))
                          ], 42, cd)) : R.type === "checkbox" ? (L(), $("div", fd, [
                            k("input", {
                              id: `form-${R.name}`,
                              type: "checkbox",
                              checked: W.value[R.name] || !1,
                              onChange: (Le) => Be(R.name, Le.target.checked),
                              class: "form-checkbox",
                              disabled: oe.value
                            }, null, 40, hd),
                            k("label", {
                              for: `form-${R.name}`,
                              class: "checkbox-label"
                            }, fe(R.placeholder || R.label), 9, dd)
                          ])) : R.type === "radio" ? (L(), $("div", pd, [
                            (L(!0), $(Ne, null, xt(((Fs = R.options) == null ? void 0 : Fs.split(",")) || [], (Le) => (L(), $("div", {
                              key: Le.trim(),
                              class: "radio-option"
                            }, [
                              k("input", {
                                id: `form-${R.name}-${Le.trim()}`,
                                name: `form-${R.name}`,
                                type: "radio",
                                value: Le.trim(),
                                checked: W.value[R.name] === Le.trim(),
                                onChange: (up) => Be(R.name, Le.trim()),
                                class: "form-radio",
                                disabled: oe.value
                              }, null, 40, gd),
                              k("label", {
                                for: `form-${R.name}-${Le.trim()}`,
                                class: "radio-label"
                              }, fe(Le.trim()), 9, md)
                            ]))), 128))
                          ])) : ae("", !0),
                          J.value[R.name] ? (L(), $("div", _d, fe(J.value[R.name]), 1)) : ae("", !0)
                        ]);
                      }), 128))
                    ]),
                    k("div", yd, [
                      k("button", {
                        onClick: () => {
                          var R;
                          console.log("Regular form submit button clicked!"), rt((R = d.attributes) == null ? void 0 : R.form_data);
                        },
                        disabled: oe.value,
                        class: "form-submit-button",
                        style: Ee(q(We))
                      }, fe(oe.value ? "Submitting..." : ((ai = (li = d.attributes) == null ? void 0 : li.form_data) == null ? void 0 : ai.submit_button_text) || "Submit"), 13, bd)
                    ])
                  ])) : d.message_type === "user_input" ? (L(), $("div", vd, [
                    (ci = d.attributes) != null && ci.prompt_message && d.attributes.prompt_message.trim() ? (L(), $("div", wd, fe(d.attributes.prompt_message), 1)) : ae("", !0),
                    d.isSubmitted ? (L(), $("div", Cd, [
                      v[20] || (v[20] = k("strong", null, "Your input:", -1)),
                      _t(" " + fe(d.submittedValue) + " ", 1),
                      (ui = d.attributes) != null && ui.confirmation_message && d.attributes.confirmation_message.trim() ? (L(), $("div", Td, fe(d.attributes.confirmation_message), 1)) : ae("", !0)
                    ])) : (L(), $("div", kd, [
                      nn(k("textarea", {
                        "onUpdate:modelValue": (R) => d.userInputValue = R,
                        class: "user-input-textarea",
                        placeholder: "Type your message here...",
                        rows: "3",
                        onKeydown: [
                          Hi(Vi((R) => $s(d), ["ctrl"]), ["enter"]),
                          Hi(Vi((R) => $s(d), ["meta"]), ["enter"])
                        ]
                      }, null, 40, xd), [
                        [on, d.userInputValue]
                      ]),
                      k("button", {
                        class: "user-input-submit-button",
                        onClick: (R) => $s(d),
                        disabled: !d.userInputValue || !d.userInputValue.trim()
                      }, " Submit ", 8, Sd)
                    ]))
                  ])) : d.shopify_output || d.message_type === "product" ? (L(), $("div", Ed, [
                    d.message ? (L(), $("div", {
                      key: 0,
                      innerHTML: q(he)(Ol(d.message), { renderer: q(t) }),
                      class: "product-message-text"
                    }, null, 8, Ad)) : ae("", !0),
                    (fi = d.shopify_output) != null && fi.products && d.shopify_output.products.length > 0 ? (L(), $("div", Rd, [
                      v[22] || (v[22] = k("h3", { class: "carousel-title" }, "Products", -1)),
                      k("div", Id, [
                        (L(!0), $(Ne, null, xt(d.shopify_output.products, (R) => {
                          var zt;
                          return L(), $("div", {
                            key: R.id,
                            class: "product-card-compact carousel-item"
                          }, [
                            (zt = R.image) != null && zt.src ? (L(), $("div", Od, [
                              k("img", {
                                src: R.image.src,
                                alt: R.title,
                                class: "product-thumbnail"
                              }, null, 8, Ld)
                            ])) : ae("", !0),
                            k("div", Pd, [
                              k("div", $d, [
                                k("div", Fd, fe(R.title), 1),
                                R.variant_title && R.variant_title !== "Default Title" ? (L(), $("div", Bd, fe(R.variant_title), 1)) : ae("", !0),
                                k("div", Nd, fe(R.price_formatted || `₹${R.price}`), 1)
                              ]),
                              k("div", Md, [
                                k("button", {
                                  class: "view-details-button-compact",
                                  onClick: (Fs) => Il(R.id)
                                }, v[21] || (v[21] = [
                                  _t(" View product ", -1),
                                  k("span", { class: "external-link-icon" }, "↗", -1)
                                ]), 8, Dd)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])) : (hi = d.shopify_output) != null && hi.products && d.shopify_output.products.length === 0 ? (L(), $("div", qd, v[23] || (v[23] = [
                      k("p", null, "No products found.", -1)
                    ]))) : d.shopify_output && !d.shopify_output.products ? (L(), $("div", Vd, v[24] || (v[24] = [
                      k("p", null, "No products to display.", -1)
                    ]))) : ae("", !0)
                  ])) : (L(), $("div", {
                    key: 4,
                    innerHTML: q(he)(d.message, { renderer: q(t) })
                  }, null, 8, Hd))
                ], 4),
                k("div", Ud, [
                  d.message_type === "user" ? (L(), $("span", jd, " You ")) : ae("", !0)
                ])
              ], 2);
            }), 128)),
            q(u) ? (L(), $("div", zd, v[25] || (v[25] = [
              k("div", { class: "dot" }, null, -1),
              k("div", { class: "dot" }, null, -1),
              k("div", { class: "dot" }, null, -1)
            ]))) : ae("", !0)
          ], 512),
          A.value ? (L(), $("div", {
            key: 3,
            class: "new-conversation-section",
            style: Ee(q(mt))
          }, [
            k("div", Jd, [
              v[27] || (v[27] = k("p", { class: "ended-text" }, "This chat has ended.", -1)),
              k("button", {
                class: "start-new-conversation-button",
                style: Ee(q(We)),
                onClick: Fl
              }, " Click here to start a new conversation ", 4)
            ])
          ], 4)) : (L(), $("div", {
            key: 2,
            class: Oe(["chat-input", { "ask-anything-input": ct.value }]),
            style: Ee(q(mt))
          }, [
            !q(N) && !te.value && !ct.value ? (L(), $("div", Wd, [
              nn(k("input", {
                "onUpdate:modelValue": v[3] || (v[3] = (d) => re.value = d),
                type: "email",
                placeholder: "Enter your email address to begin",
                disabled: q(u) || q(D) !== "connected",
                class: Oe({
                  invalid: re.value.trim() && !q(xn)(re.value.trim()),
                  disabled: q(D) !== "connected"
                })
              }, null, 10, Kd), [
                [on, re.value]
              ])
            ])) : ae("", !0),
            k("div", Zd, [
              nn(k("input", {
                "onUpdate:modelValue": v[4] || (v[4] = (d) => He.value = d),
                type: "text",
                placeholder: q(D) === "connected" ? ct.value ? "Ask me anything..." : "Type a message..." : "Connecting...",
                onKeypress: C,
                onInput: ie,
                onChange: ie,
                disabled: !T.value,
                class: Oe({ disabled: q(D) !== "connected", "ask-anything-field": ct.value })
              }, null, 42, Gd), [
                [on, He.value]
              ]),
              k("button", {
                class: Oe(["send-button", { "ask-anything-send": ct.value }]),
                style: Ee(q(We)),
                onClick: S,
                disabled: !He.value.trim() || !T.value
              }, v[26] || (v[26] = [
                k("svg", {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg"
                }, [
                  k("path", {
                    d: "M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)
              ]), 14, Yd)
            ])
          ], 6)),
          k("div", {
            class: "powered-by",
            style: Ee(q(kt))
          }, v[28] || (v[28] = [
            k("svg", {
              class: "chattermate-logo",
              width: "16",
              height: "16",
              viewBox: "0 0 60 60",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              k("path", {
                d: "M45 15H15C13.3431 15 12 16.3431 12 18V42C12 43.6569 13.3431 45 15 45H25L30 52L35 45H45C46.6569 45 48 43.6569 48 42V18C48 16.3431 46.6569 15 45 15Z",
                fill: "currentColor",
                opacity: "0.8"
              }),
              k("path", {
                d: "M36 27C36 27 32.5 26 30 26C27.5 26 24 27 24 31C24 35 27.5 36 30 36C32.5 36 36 35 36 35V33C36 33 33 34 31.5 34C30 34 27 33 27 31C27 29 30 28 31.5 28C33 28 36 29 36 29V27Z",
                fill: "currentColor"
              })
            ], -1),
            _t(" Powered by ChatterMate ", -1)
          ]), 4)
        ], 6)) : ae("", !0)
      ], 64)),
      z.value ? (L(), $("div", Qd, [
        k("div", Xd, [
          v[29] || (v[29] = k("h3", null, "Rate your conversation", -1)),
          k("div", ep, [
            (L(), $(Ne, null, xt(5, (d) => k("button", {
              key: d,
              onClick: (Y) => B.value = d,
              class: Oe([{ active: d <= B.value }, "star-button"])
            }, " ★ ", 10, tp)), 64))
          ]),
          nn(k("textarea", {
            "onUpdate:modelValue": v[5] || (v[5] = (d) => U.value = d),
            placeholder: "Additional feedback (optional)",
            class: "rating-feedback"
          }, null, 512), [
            [on, U.value]
          ]),
          k("div", np, [
            k("button", {
              onClick: v[6] || (v[6] = (d) => _.submitRating(B.value, U.value)),
              disabled: !B.value,
              class: "submit-button",
              style: Ee(q(We))
            }, " Submit ", 12, sp),
            k("button", {
              onClick: v[7] || (v[7] = (d) => z.value = !1),
              class: "skip-rating"
            }, " Skip ")
          ])
        ])
      ])) : ae("", !0)
    ], 6));
  }
}), ip = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, op = /* @__PURE__ */ ip(rp, [["__scopeId", "data-v-463fef1a"]]);
window.process || (window.process = { env: { NODE_ENV: "production" } });
const lp = new URL(window.location.href), ap = lp.searchParams.get("widget_id"), cp = ou(op, {
  widgetId: ap
});
cp.mount("#app");
