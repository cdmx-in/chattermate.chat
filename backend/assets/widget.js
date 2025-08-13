var Ll = Object.defineProperty;
var Fl = (t, e, n) => e in t ? Ll(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ke = (t, e, n) => Fl(t, typeof e != "symbol" ? e + "" : e, n);
/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function gr(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const xe = {}, un = [], St = () => {
}, Pl = () => !1, _s = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), mr = (t) => t.startsWith("onUpdate:"), $e = Object.assign, _r = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Nl = Object.prototype.hasOwnProperty, _e = (t, e) => Nl.call(t, e), $ = Array.isArray, hn = (t) => ys(t) === "[object Map]", Hi = (t) => ys(t) === "[object Set]", J = (t) => typeof t == "function", Me = (t) => typeof t == "string", Gt = (t) => typeof t == "symbol", Fe = (t) => t !== null && typeof t == "object", ji = (t) => (Fe(t) || J(t)) && J(t.then) && J(t.catch), Wi = Object.prototype.toString, ys = (t) => Wi.call(t), Bl = (t) => ys(t).slice(8, -1), zi = (t) => ys(t) === "[object Object]", yr = (t) => Me(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Tn = /* @__PURE__ */ gr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), bs = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Dl = /-(\w)/g, Kt = bs(
  (t) => t.replace(Dl, (e, n) => n ? n.toUpperCase() : "")
), Ml = /\B([A-Z])/g, Yt = bs(
  (t) => t.replace(Ml, "-$1").toLowerCase()
), Ki = bs((t) => t.charAt(0).toUpperCase() + t.slice(1)), Fs = bs(
  (t) => t ? `on${Ki(t)}` : ""
), Wt = (t, e) => !Object.is(t, e), Jn = (t, ...e) => {
  for (let n = 0; n < t.length; n++)
    t[n](...e);
}, Zs = (t, e, n, s = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Gs = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let ei;
const vs = () => ei || (ei = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ve(t) {
  if ($(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const s = t[n], r = Me(s) ? Hl(s) : ve(s);
      if (r)
        for (const i in r)
          e[i] = r[i];
    }
    return e;
  } else if (Me(t) || Fe(t))
    return t;
}
const ql = /;(?![^(]*\))/g, Ul = /:([^]+)/, Vl = /\/\*[^]*?\*\//g;
function Hl(t) {
  const e = {};
  return t.replace(Vl, "").split(ql).forEach((n) => {
    if (n) {
      const s = n.split(Ul);
      s.length > 1 && (e[s[0].trim()] = s[1].trim());
    }
  }), e;
}
function Re(t) {
  let e = "";
  if (Me(t))
    e = t;
  else if ($(t))
    for (let n = 0; n < t.length; n++) {
      const s = Re(t[n]);
      s && (e += s + " ");
    }
  else if (Fe(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const jl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Wl = /* @__PURE__ */ gr(jl);
function $i(t) {
  return !!t || t === "";
}
const Zi = (t) => !!(t && t.__v_isRef === !0), le = (t) => Me(t) ? t : t == null ? "" : $(t) || Fe(t) && (t.toString === Wi || !J(t.toString)) ? Zi(t) ? le(t.value) : JSON.stringify(t, Gi, 2) : String(t), Gi = (t, e) => Zi(e) ? Gi(t, e.value) : hn(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [s, r], i) => (n[Ps(s, i) + " =>"] = r, n),
    {}
  )
} : Hi(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => Ps(n))
} : Gt(e) ? Ps(e) : Fe(e) && !$(e) && !zi(e) ? String(e) : e, Ps = (t, e = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Gt(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t
  );
};
/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let tt;
class zl {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = tt, !e && tt && (this.index = (tt.scopes || (tt.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let e, n;
      if (this.scopes)
        for (e = 0, n = this.scopes.length; e < n; e++)
          this.scopes[e].pause();
      for (e = 0, n = this.effects.length; e < n; e++)
        this.effects[e].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let e, n;
      if (this.scopes)
        for (e = 0, n = this.scopes.length; e < n; e++)
          this.scopes[e].resume();
      for (e = 0, n = this.effects.length; e < n; e++)
        this.effects[e].resume();
    }
  }
  run(e) {
    if (this._active) {
      const n = tt;
      try {
        return tt = this, e();
      } finally {
        tt = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = tt, tt = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (tt = this.prevScope, this.prevScope = void 0);
  }
  stop(e) {
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
      if (!this.detached && this.parent && !e) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Kl() {
  return tt;
}
let Ce;
const Ns = /* @__PURE__ */ new WeakSet();
class Yi {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, tt && tt.active && tt.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ns.has(this) && (Ns.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Qi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ti(this), Xi(this);
    const e = Ce, n = gt;
    Ce = this, gt = !0;
    try {
      return this.fn();
    } finally {
      eo(this), Ce = e, gt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        wr(e);
      this.deps = this.depsTail = void 0, ti(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ns.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ys(this) && this.run();
  }
  get dirty() {
    return Ys(this);
  }
}
let Ji = 0, En, An;
function Qi(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = An, An = t;
    return;
  }
  t.next = En, En = t;
}
function br() {
  Ji++;
}
function vr() {
  if (--Ji > 0)
    return;
  if (An) {
    let e = An;
    for (An = void 0; e; ) {
      const n = e.next;
      e.next = void 0, e.flags &= -9, e = n;
    }
  }
  let t;
  for (; En; ) {
    let e = En;
    for (En = void 0; e; ) {
      const n = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (s) {
          t || (t = s);
        }
      e = n;
    }
  }
  if (t) throw t;
}
function Xi(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function eo(t) {
  let e, n = t.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), wr(s), $l(s)) : e = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  t.deps = e, t.depsTail = n;
}
function Ys(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (to(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function to(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === Pn) || (t.globalVersion = Pn, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !Ys(t))))
    return;
  t.flags |= 2;
  const e = t.dep, n = Ce, s = gt;
  Ce = t, gt = !0;
  try {
    Xi(t);
    const r = t.fn(t._value);
    (e.version === 0 || Wt(r, t._value)) && (t.flags |= 128, t._value = r, e.version++);
  } catch (r) {
    throw e.version++, r;
  } finally {
    Ce = n, gt = s, eo(t), t.flags &= -3;
  }
}
function wr(t, e = !1) {
  const { dep: n, prevSub: s, nextSub: r } = t;
  if (s && (s.nextSub = r, t.prevSub = void 0), r && (r.prevSub = s, t.nextSub = void 0), n.subs === t && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      wr(i, !0);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
function $l(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let gt = !0;
const no = [];
function Dt() {
  no.push(gt), gt = !1;
}
function Mt() {
  const t = no.pop();
  gt = t === void 0 ? !0 : t;
}
function ti(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const n = Ce;
    Ce = void 0;
    try {
      e();
    } finally {
      Ce = n;
    }
  }
}
let Pn = 0;
class Zl {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class kr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!Ce || !gt || Ce === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Ce)
      n = this.activeLink = new Zl(Ce, this), Ce.deps ? (n.prevDep = Ce.depsTail, Ce.depsTail.nextDep = n, Ce.depsTail = n) : Ce.deps = Ce.depsTail = n, so(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = Ce.depsTail, n.nextDep = void 0, Ce.depsTail.nextDep = n, Ce.depsTail = n, Ce.deps === n && (Ce.deps = s);
    }
    return n;
  }
  trigger(e) {
    this.version++, Pn++, this.notify(e);
  }
  notify(e) {
    br();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      vr();
    }
  }
}
function so(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let s = e.deps; s; s = s.nextDep)
        so(s);
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
  }
}
const Js = /* @__PURE__ */ new WeakMap(), sn = Symbol(
  ""
), Qs = Symbol(
  ""
), Nn = Symbol(
  ""
);
function ze(t, e, n) {
  if (gt && Ce) {
    let s = Js.get(t);
    s || Js.set(t, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new kr()), r.map = s, r.key = n), r.track();
  }
}
function Ft(t, e, n, s, r, i) {
  const o = Js.get(t);
  if (!o) {
    Pn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (br(), e === "clear")
    o.forEach(l);
  else {
    const a = $(t), u = a && yr(n);
    if (a && n === "length") {
      const c = Number(s);
      o.forEach((g, _) => {
        (_ === "length" || _ === Nn || !Gt(_) && _ >= c) && l(g);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), u && l(o.get(Nn)), e) {
        case "add":
          a ? u && l(o.get("length")) : (l(o.get(sn)), hn(t) && l(o.get(Qs)));
          break;
        case "delete":
          a || (l(o.get(sn)), hn(t) && l(o.get(Qs)));
          break;
        case "set":
          hn(t) && l(o.get(sn));
          break;
      }
  }
  vr();
}
function ln(t) {
  const e = me(t);
  return e === t ? e : (ze(e, "iterate", Nn), ht(t) ? e : e.map(He));
}
function ws(t) {
  return ze(t = me(t), "iterate", Nn), t;
}
const Gl = {
  __proto__: null,
  [Symbol.iterator]() {
    return Bs(this, Symbol.iterator, He);
  },
  concat(...t) {
    return ln(this).concat(
      ...t.map((e) => $(e) ? ln(e) : e)
    );
  },
  entries() {
    return Bs(this, "entries", (t) => (t[1] = He(t[1]), t));
  },
  every(t, e) {
    return Ot(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return Ot(this, "filter", t, e, (n) => n.map(He), arguments);
  },
  find(t, e) {
    return Ot(this, "find", t, e, He, arguments);
  },
  findIndex(t, e) {
    return Ot(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return Ot(this, "findLast", t, e, He, arguments);
  },
  findLastIndex(t, e) {
    return Ot(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return Ot(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return Ds(this, "includes", t);
  },
  indexOf(...t) {
    return Ds(this, "indexOf", t);
  },
  join(t) {
    return ln(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return Ds(this, "lastIndexOf", t);
  },
  map(t, e) {
    return Ot(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return bn(this, "pop");
  },
  push(...t) {
    return bn(this, "push", t);
  },
  reduce(t, ...e) {
    return ni(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return ni(this, "reduceRight", t, e);
  },
  shift() {
    return bn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return Ot(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return bn(this, "splice", t);
  },
  toReversed() {
    return ln(this).toReversed();
  },
  toSorted(t) {
    return ln(this).toSorted(t);
  },
  toSpliced(...t) {
    return ln(this).toSpliced(...t);
  },
  unshift(...t) {
    return bn(this, "unshift", t);
  },
  values() {
    return Bs(this, "values", He);
  }
};
function Bs(t, e, n) {
  const s = ws(t), r = s[e]();
  return s !== t && !ht(t) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.value && (i.value = n(i.value)), i;
  }), r;
}
const Yl = Array.prototype;
function Ot(t, e, n, s, r, i) {
  const o = ws(t), l = o !== t && !ht(t), a = o[e];
  if (a !== Yl[e]) {
    const g = a.apply(t, i);
    return l ? He(g) : g;
  }
  let u = n;
  o !== t && (l ? u = function(g, _) {
    return n.call(this, He(g), _, t);
  } : n.length > 2 && (u = function(g, _) {
    return n.call(this, g, _, t);
  }));
  const c = a.call(o, u, s);
  return l && r ? r(c) : c;
}
function ni(t, e, n, s) {
  const r = ws(t);
  let i = n;
  return r !== t && (ht(t) ? n.length > 3 && (i = function(o, l, a) {
    return n.call(this, o, l, a, t);
  }) : i = function(o, l, a) {
    return n.call(this, o, He(l), a, t);
  }), r[e](i, ...s);
}
function Ds(t, e, n) {
  const s = me(t);
  ze(s, "iterate", Nn);
  const r = s[e](...n);
  return (r === -1 || r === !1) && Tr(n[0]) ? (n[0] = me(n[0]), s[e](...n)) : r;
}
function bn(t, e, n = []) {
  Dt(), br();
  const s = me(t)[e].apply(t, n);
  return vr(), Mt(), s;
}
const Jl = /* @__PURE__ */ gr("__proto__,__v_isRef,__isVue"), ro = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Gt)
);
function Ql(t) {
  Gt(t) || (t = String(t));
  const e = me(this);
  return ze(e, "has", t), e.hasOwnProperty(t);
}
class io {
  constructor(e = !1, n = !1) {
    this._isReadonly = e, this._isShallow = n;
  }
  get(e, n, s) {
    if (n === "__v_skip") return e.__v_skip;
    const r = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return s === (r ? i ? aa : co : i ? ao : lo).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(s) ? e : void 0;
    const o = $(e);
    if (!r) {
      let a;
      if (o && (a = Gl[n]))
        return a;
      if (n === "hasOwnProperty")
        return Ql;
    }
    const l = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Ke(e) ? e : s
    );
    return (Gt(n) ? ro.has(n) : Jl(n)) || (r || ze(e, "get", n), i) ? l : Ke(l) ? o && yr(n) ? l : l.value : Fe(l) ? r ? uo(l) : Sr(l) : l;
  }
}
class oo extends io {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, s, r) {
    let i = e[n];
    if (!this._isShallow) {
      const a = $t(i);
      if (!ht(s) && !$t(s) && (i = me(i), s = me(s)), !$(e) && Ke(i) && !Ke(s))
        return a ? !1 : (i.value = s, !0);
    }
    const o = $(e) && yr(n) ? Number(n) < e.length : _e(e, n), l = Reflect.set(
      e,
      n,
      s,
      Ke(e) ? e : r
    );
    return e === me(r) && (o ? Wt(s, i) && Ft(e, "set", n, s) : Ft(e, "add", n, s)), l;
  }
  deleteProperty(e, n) {
    const s = _e(e, n);
    e[n];
    const r = Reflect.deleteProperty(e, n);
    return r && s && Ft(e, "delete", n, void 0), r;
  }
  has(e, n) {
    const s = Reflect.has(e, n);
    return (!Gt(n) || !ro.has(n)) && ze(e, "has", n), s;
  }
  ownKeys(e) {
    return ze(
      e,
      "iterate",
      $(e) ? "length" : sn
    ), Reflect.ownKeys(e);
  }
}
class Xl extends io {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, n) {
    return !0;
  }
  deleteProperty(e, n) {
    return !0;
  }
}
const ea = /* @__PURE__ */ new oo(), ta = /* @__PURE__ */ new Xl(), na = /* @__PURE__ */ new oo(!0);
const Xs = (t) => t, jn = (t) => Reflect.getPrototypeOf(t);
function sa(t, e, n) {
  return function(...s) {
    const r = this.__v_raw, i = me(r), o = hn(i), l = t === "entries" || t === Symbol.iterator && o, a = t === "keys" && o, u = r[t](...s), c = n ? Xs : e ? ls : He;
    return !e && ze(
      i,
      "iterate",
      a ? Qs : sn
    ), {
      // iterator protocol
      next() {
        const { value: g, done: _ } = u.next();
        return _ ? { value: g, done: _ } : {
          value: l ? [c(g[0]), c(g[1])] : c(g),
          done: _
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Wn(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function ra(t, e) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = me(i), l = me(r);
      t || (Wt(r, l) && ze(o, "get", r), ze(o, "get", l));
      const { has: a } = jn(o), u = e ? Xs : t ? ls : He;
      if (a.call(o, r))
        return u(i.get(r));
      if (a.call(o, l))
        return u(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !t && ze(me(r), "iterate", sn), Reflect.get(r, "size", r);
    },
    has(r) {
      const i = this.__v_raw, o = me(i), l = me(r);
      return t || (Wt(r, l) && ze(o, "has", r), ze(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, a = me(l), u = e ? Xs : t ? ls : He;
      return !t && ze(a, "iterate", sn), l.forEach((c, g) => r.call(i, u(c), u(g), o));
    }
  };
  return $e(
    n,
    t ? {
      add: Wn("add"),
      set: Wn("set"),
      delete: Wn("delete"),
      clear: Wn("clear")
    } : {
      add(r) {
        !e && !ht(r) && !$t(r) && (r = me(r));
        const i = me(this);
        return jn(i).has.call(i, r) || (i.add(r), Ft(i, "add", r, r)), this;
      },
      set(r, i) {
        !e && !ht(i) && !$t(i) && (i = me(i));
        const o = me(this), { has: l, get: a } = jn(o);
        let u = l.call(o, r);
        u || (r = me(r), u = l.call(o, r));
        const c = a.call(o, r);
        return o.set(r, i), u ? Wt(i, c) && Ft(o, "set", r, i) : Ft(o, "add", r, i), this;
      },
      delete(r) {
        const i = me(this), { has: o, get: l } = jn(i);
        let a = o.call(i, r);
        a || (r = me(r), a = o.call(i, r)), l && l.call(i, r);
        const u = i.delete(r);
        return a && Ft(i, "delete", r, void 0), u;
      },
      clear() {
        const r = me(this), i = r.size !== 0, o = r.clear();
        return i && Ft(
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
    n[r] = sa(r, t, e);
  }), n;
}
function xr(t, e) {
  const n = ra(t, e);
  return (s, r, i) => r === "__v_isReactive" ? !t : r === "__v_isReadonly" ? t : r === "__v_raw" ? s : Reflect.get(
    _e(n, r) && r in s ? n : s,
    r,
    i
  );
}
const ia = {
  get: /* @__PURE__ */ xr(!1, !1)
}, oa = {
  get: /* @__PURE__ */ xr(!1, !0)
}, la = {
  get: /* @__PURE__ */ xr(!0, !1)
};
const lo = /* @__PURE__ */ new WeakMap(), ao = /* @__PURE__ */ new WeakMap(), co = /* @__PURE__ */ new WeakMap(), aa = /* @__PURE__ */ new WeakMap();
function ca(t) {
  switch (t) {
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
function ua(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : ca(Bl(t));
}
function Sr(t) {
  return $t(t) ? t : Cr(
    t,
    !1,
    ea,
    ia,
    lo
  );
}
function ha(t) {
  return Cr(
    t,
    !1,
    na,
    oa,
    ao
  );
}
function uo(t) {
  return Cr(
    t,
    !0,
    ta,
    la,
    co
  );
}
function Cr(t, e, n, s, r) {
  if (!Fe(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const i = ua(t);
  if (i === 0)
    return t;
  const o = r.get(t);
  if (o)
    return o;
  const l = new Proxy(
    t,
    i === 2 ? s : n
  );
  return r.set(t, l), l;
}
function fn(t) {
  return $t(t) ? fn(t.__v_raw) : !!(t && t.__v_isReactive);
}
function $t(t) {
  return !!(t && t.__v_isReadonly);
}
function ht(t) {
  return !!(t && t.__v_isShallow);
}
function Tr(t) {
  return t ? !!t.__v_raw : !1;
}
function me(t) {
  const e = t && t.__v_raw;
  return e ? me(e) : t;
}
function fa(t) {
  return !_e(t, "__v_skip") && Object.isExtensible(t) && Zs(t, "__v_skip", !0), t;
}
const He = (t) => Fe(t) ? Sr(t) : t, ls = (t) => Fe(t) ? uo(t) : t;
function Ke(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function he(t) {
  return da(t, !1);
}
function da(t, e) {
  return Ke(t) ? t : new pa(t, e);
}
class pa {
  constructor(e, n) {
    this.dep = new kr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? e : me(e), this._value = n ? e : He(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, s = this.__v_isShallow || ht(e) || $t(e);
    e = s ? e : me(e), Wt(e, n) && (this._rawValue = e, this._value = s ? e : He(e), this.dep.trigger());
  }
}
function ga(t) {
  return Ke(t) ? t.value : t;
}
const ma = {
  get: (t, e, n) => e === "__v_raw" ? t : ga(Reflect.get(t, e, n)),
  set: (t, e, n, s) => {
    const r = t[e];
    return Ke(r) && !Ke(n) ? (r.value = n, !0) : Reflect.set(t, e, n, s);
  }
};
function ho(t) {
  return fn(t) ? t : new Proxy(t, ma);
}
class _a {
  constructor(e, n, s) {
    this.fn = e, this.setter = n, this._value = void 0, this.dep = new kr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Pn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Ce !== this)
      return Qi(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return to(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
function ya(t, e, n = !1) {
  let s, r;
  return J(t) ? s = t : (s = t.get, r = t.set), new _a(s, r, n);
}
const zn = {}, as = /* @__PURE__ */ new WeakMap();
let tn;
function ba(t, e = !1, n = tn) {
  if (n) {
    let s = as.get(n);
    s || as.set(n, s = []), s.push(t);
  }
}
function va(t, e, n = xe) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: a } = n, u = (M) => r ? M : ht(M) || r === !1 || r === 0 ? Pt(M, 1) : Pt(M);
  let c, g, _, A, N = !1, V = !1;
  if (Ke(t) ? (g = () => t.value, N = ht(t)) : fn(t) ? (g = () => u(t), N = !0) : $(t) ? (V = !0, N = t.some((M) => fn(M) || ht(M)), g = () => t.map((M) => {
    if (Ke(M))
      return M.value;
    if (fn(M))
      return u(M);
    if (J(M))
      return a ? a(M, 2) : M();
  })) : J(t) ? e ? g = a ? () => a(t, 2) : t : g = () => {
    if (_) {
      Dt();
      try {
        _();
      } finally {
        Mt();
      }
    }
    const M = tn;
    tn = c;
    try {
      return a ? a(t, 3, [A]) : t(A);
    } finally {
      tn = M;
    }
  } : g = St, e && r) {
    const M = g, de = r === !0 ? 1 / 0 : r;
    g = () => Pt(M(), de);
  }
  const te = Kl(), Z = () => {
    c.stop(), te && te.active && _r(te.effects, c);
  };
  if (i && e) {
    const M = e;
    e = (...de) => {
      M(...de), Z();
    };
  }
  let re = V ? new Array(t.length).fill(zn) : zn;
  const ie = (M) => {
    if (!(!(c.flags & 1) || !c.dirty && !M))
      if (e) {
        const de = c.run();
        if (r || N || (V ? de.some((we, ne) => Wt(we, re[ne])) : Wt(de, re))) {
          _ && _();
          const we = tn;
          tn = c;
          try {
            const ne = [
              de,
              // pass undefined as the old value when it's changed for the first time
              re === zn ? void 0 : V && re[0] === zn ? [] : re,
              A
            ];
            re = de, a ? a(e, 3, ne) : (
              // @ts-expect-error
              e(...ne)
            );
          } finally {
            tn = we;
          }
        }
      } else
        c.run();
  };
  return l && l(ie), c = new Yi(g), c.scheduler = o ? () => o(ie, !1) : ie, A = (M) => ba(M, !1, c), _ = c.onStop = () => {
    const M = as.get(c);
    if (M) {
      if (a)
        a(M, 4);
      else
        for (const de of M) de();
      as.delete(c);
    }
  }, e ? s ? ie(!0) : re = c.run() : o ? o(ie.bind(null, !0), !0) : c.run(), Z.pause = c.pause.bind(c), Z.resume = c.resume.bind(c), Z.stop = Z, Z;
}
function Pt(t, e = 1 / 0, n) {
  if (e <= 0 || !Fe(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(t)))
    return t;
  if (n.add(t), e--, Ke(t))
    Pt(t.value, e, n);
  else if ($(t))
    for (let s = 0; s < t.length; s++)
      Pt(t[s], e, n);
  else if (Hi(t) || hn(t))
    t.forEach((s) => {
      Pt(s, e, n);
    });
  else if (zi(t)) {
    for (const s in t)
      Pt(t[s], e, n);
    for (const s of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, s) && Pt(t[s], e, n);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function qn(t, e, n, s) {
  try {
    return s ? t(...s) : t();
  } catch (r) {
    ks(r, e, n);
  }
}
function Et(t, e, n, s) {
  if (J(t)) {
    const r = qn(t, e, n, s);
    return r && ji(r) && r.catch((i) => {
      ks(i, e, n);
    }), r;
  }
  if ($(t)) {
    const r = [];
    for (let i = 0; i < t.length; i++)
      r.push(Et(t[i], e, n, s));
    return r;
  }
}
function ks(t, e, n, s = !0) {
  const r = e ? e.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = e && e.appContext.config || xe;
  if (e) {
    let l = e.parent;
    const a = e.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const c = l.ec;
      if (c) {
        for (let g = 0; g < c.length; g++)
          if (c[g](t, a, u) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      Dt(), qn(i, null, 10, [
        t,
        a,
        u
      ]), Mt();
      return;
    }
  }
  wa(t, n, r, s, o);
}
function wa(t, e, n, s = !0, r = !1) {
  if (r)
    throw t;
  console.error(t);
}
const Je = [];
let kt = -1;
const dn = [];
let Ht = null, an = 0;
const fo = /* @__PURE__ */ Promise.resolve();
let cs = null;
function po(t) {
  const e = cs || fo;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function ka(t) {
  let e = kt + 1, n = Je.length;
  for (; e < n; ) {
    const s = e + n >>> 1, r = Je[s], i = Bn(r);
    i < t || i === t && r.flags & 2 ? e = s + 1 : n = s;
  }
  return e;
}
function Er(t) {
  if (!(t.flags & 1)) {
    const e = Bn(t), n = Je[Je.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= Bn(n) ? Je.push(t) : Je.splice(ka(e), 0, t), t.flags |= 1, go();
  }
}
function go() {
  cs || (cs = fo.then(_o));
}
function xa(t) {
  $(t) ? dn.push(...t) : Ht && t.id === -1 ? Ht.splice(an + 1, 0, t) : t.flags & 1 || (dn.push(t), t.flags |= 1), go();
}
function si(t, e, n = kt + 1) {
  for (; n < Je.length; n++) {
    const s = Je[n];
    if (s && s.flags & 2) {
      if (t && s.id !== t.uid)
        continue;
      Je.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function mo(t) {
  if (dn.length) {
    const e = [...new Set(dn)].sort(
      (n, s) => Bn(n) - Bn(s)
    );
    if (dn.length = 0, Ht) {
      Ht.push(...e);
      return;
    }
    for (Ht = e, an = 0; an < Ht.length; an++) {
      const n = Ht[an];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Ht = null, an = 0;
  }
}
const Bn = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function _o(t) {
  try {
    for (kt = 0; kt < Je.length; kt++) {
      const e = Je[kt];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), qn(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; kt < Je.length; kt++) {
      const e = Je[kt];
      e && (e.flags &= -2);
    }
    kt = -1, Je.length = 0, mo(), cs = null, (Je.length || dn.length) && _o();
  }
}
let ut = null, yo = null;
function us(t) {
  const e = ut;
  return ut = t, yo = t && t.type.__scopeId || null, e;
}
function Sa(t, e = ut, n) {
  if (!e || t._n)
    return t;
  const s = (...r) => {
    s._d && fi(-1);
    const i = us(e);
    let o;
    try {
      o = t(...r);
    } finally {
      us(i), s._d && fi(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Jt(t, e) {
  if (ut === null)
    return t;
  const n = Ts(ut), s = t.dirs || (t.dirs = []);
  for (let r = 0; r < e.length; r++) {
    let [i, o, l, a = xe] = e[r];
    i && (J(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Pt(o), s.push({
      dir: i,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return t;
}
function Qt(t, e, n, s) {
  const r = t.dirs, i = e && e.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let a = l.dir[s];
    a && (Dt(), Et(a, n, 8, [
      t.el,
      l,
      t,
      e
    ]), Mt());
  }
}
const Ca = Symbol("_vte"), Ta = (t) => t.__isTeleport;
function Ar(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, Ar(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ea(t, e) {
  return J(t) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    $e({ name: t.name }, e, { setup: t })
  ) : t;
}
function bo(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function Rn(t, e, n, s, r = !1) {
  if ($(t)) {
    t.forEach(
      (N, V) => Rn(
        N,
        e && ($(e) ? e[V] : e),
        n,
        s,
        r
      )
    );
    return;
  }
  if (In(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Rn(t, e, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? Ts(s.component) : s.el, o = r ? null : i, { i: l, r: a } = t, u = e && e.r, c = l.refs === xe ? l.refs = {} : l.refs, g = l.setupState, _ = me(g), A = g === xe ? () => !1 : (N) => _e(_, N);
  if (u != null && u !== a && (Me(u) ? (c[u] = null, A(u) && (g[u] = null)) : Ke(u) && (u.value = null)), J(a))
    qn(a, l, 12, [o, c]);
  else {
    const N = Me(a), V = Ke(a);
    if (N || V) {
      const te = () => {
        if (t.f) {
          const Z = N ? A(a) ? g[a] : c[a] : a.value;
          r ? $(Z) && _r(Z, i) : $(Z) ? Z.includes(i) || Z.push(i) : N ? (c[a] = [i], A(a) && (g[a] = c[a])) : (a.value = [i], t.k && (c[t.k] = a.value));
        } else N ? (c[a] = o, A(a) && (g[a] = o)) : V && (a.value = o, t.k && (c[t.k] = o));
      };
      o ? (te.id = -1, st(te, n)) : te();
    }
  }
}
vs().requestIdleCallback;
vs().cancelIdleCallback;
const In = (t) => !!t.type.__asyncLoader, vo = (t) => t.type.__isKeepAlive;
function Aa(t, e) {
  wo(t, "a", e);
}
function Ra(t, e) {
  wo(t, "da", e);
}
function wo(t, e, n = Qe) {
  const s = t.__wdc || (t.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return t();
  });
  if (xs(e, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      vo(r.parent.vnode) && Ia(s, e, n, r), r = r.parent;
  }
}
function Ia(t, e, n, s) {
  const r = xs(
    e,
    t,
    s,
    !0
    /* prepend */
  );
  Rr(() => {
    _r(s[e], r);
  }, n);
}
function xs(t, e, n = Qe, s = !1) {
  if (n) {
    const r = n[t] || (n[t] = []), i = e.__weh || (e.__weh = (...o) => {
      Dt();
      const l = Un(n), a = Et(e, n, t, o);
      return l(), Mt(), a;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const qt = (t) => (e, n = Qe) => {
  (!Mn || t === "sp") && xs(t, (...s) => e(...s), n);
}, Oa = qt("bm"), ko = qt("m"), La = qt(
  "bu"
), Fa = qt("u"), Pa = qt(
  "bum"
), Rr = qt("um"), Na = qt(
  "sp"
), Ba = qt("rtg"), Da = qt("rtc");
function Ma(t, e = Qe) {
  xs("ec", t, e);
}
const qa = Symbol.for("v-ndc");
function bt(t, e, n, s) {
  let r;
  const i = n, o = $(t);
  if (o || Me(t)) {
    const l = o && fn(t);
    let a = !1, u = !1;
    l && (a = !ht(t), u = $t(t), t = ws(t)), r = new Array(t.length);
    for (let c = 0, g = t.length; c < g; c++)
      r[c] = e(
        a ? u ? ls(He(t[c])) : He(t[c]) : t[c],
        c,
        void 0,
        i
      );
  } else if (typeof t == "number") {
    r = new Array(t);
    for (let l = 0; l < t; l++)
      r[l] = e(l + 1, l, void 0, i);
  } else if (Fe(t))
    if (t[Symbol.iterator])
      r = Array.from(
        t,
        (l, a) => e(l, a, void 0, i)
      );
    else {
      const l = Object.keys(t);
      r = new Array(l.length);
      for (let a = 0, u = l.length; a < u; a++) {
        const c = l[a];
        r[a] = e(t[c], c, a, i);
      }
    }
  else
    r = [];
  return r;
}
const er = (t) => t ? jo(t) ? Ts(t) : er(t.parent) : null, On = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ $e(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => er(t.parent),
    $root: (t) => er(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => So(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      Er(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = po.bind(t.proxy)),
    $watch: (t) => lc.bind(t)
  })
), Ms = (t, e) => t !== xe && !t.__isScriptSetup && _e(t, e), Ua = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: a } = t;
    let u;
    if (e[0] !== "$") {
      const A = o[e];
      if (A !== void 0)
        switch (A) {
          case 1:
            return s[e];
          case 2:
            return r[e];
          case 4:
            return n[e];
          case 3:
            return i[e];
        }
      else {
        if (Ms(s, e))
          return o[e] = 1, s[e];
        if (r !== xe && _e(r, e))
          return o[e] = 2, r[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = t.propsOptions[0]) && _e(u, e)
        )
          return o[e] = 3, i[e];
        if (n !== xe && _e(n, e))
          return o[e] = 4, n[e];
        tr && (o[e] = 0);
      }
    }
    const c = On[e];
    let g, _;
    if (c)
      return e === "$attrs" && ze(t.attrs, "get", ""), c(t);
    if (
      // css module (injected by vue-loader)
      (g = l.__cssModules) && (g = g[e])
    )
      return g;
    if (n !== xe && _e(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      _ = a.config.globalProperties, _e(_, e)
    )
      return _[e];
  },
  set({ _: t }, e, n) {
    const { data: s, setupState: r, ctx: i } = t;
    return Ms(r, e) ? (r[e] = n, !0) : s !== xe && _e(s, e) ? (s[e] = n, !0) : _e(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (i[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: s, appContext: r, propsOptions: i }
  }, o) {
    let l;
    return !!n[o] || t !== xe && _e(t, o) || Ms(e, o) || (l = i[0]) && _e(l, o) || _e(s, o) || _e(On, o) || _e(r.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : _e(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function ri(t) {
  return $(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let tr = !0;
function Va(t) {
  const e = So(t), n = t.proxy, s = t.ctx;
  tr = !1, e.beforeCreate && ii(e.beforeCreate, t, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: a,
    inject: u,
    // lifecycle
    created: c,
    beforeMount: g,
    mounted: _,
    beforeUpdate: A,
    updated: N,
    activated: V,
    deactivated: te,
    beforeDestroy: Z,
    beforeUnmount: re,
    destroyed: ie,
    unmounted: M,
    render: de,
    renderTracked: we,
    renderTriggered: ne,
    errorCaptured: qe,
    serverPrefetch: k,
    // public API
    expose: Ae,
    inheritAttrs: Ve,
    // assets
    components: ae,
    directives: je,
    filters: Rt
  } = e;
  if (u && Ha(u, s, null), o)
    for (const ee in o) {
      const Q = o[ee];
      J(Q) && (s[ee] = Q.bind(n));
    }
  if (r) {
    const ee = r.call(n, n);
    Fe(ee) && (t.data = Sr(ee));
  }
  if (tr = !0, i)
    for (const ee in i) {
      const Q = i[ee], q = J(Q) ? Q.bind(n, n) : J(Q.get) ? Q.get.bind(n, n) : St, be = !J(Q) && J(Q.set) ? Q.set.bind(n) : St, H = Be({
        get: q,
        set: be
      });
      Object.defineProperty(s, ee, {
        enumerable: !0,
        configurable: !0,
        get: () => H.value,
        set: (Se) => H.value = Se
      });
    }
  if (l)
    for (const ee in l)
      xo(l[ee], s, n, ee);
  if (a) {
    const ee = J(a) ? a.call(n) : a;
    Reflect.ownKeys(ee).forEach((Q) => {
      Za(Q, ee[Q]);
    });
  }
  c && ii(c, t, "c");
  function Ie(ee, Q) {
    $(Q) ? Q.forEach((q) => ee(q.bind(n))) : Q && ee(Q.bind(n));
  }
  if (Ie(Oa, g), Ie(ko, _), Ie(La, A), Ie(Fa, N), Ie(Aa, V), Ie(Ra, te), Ie(Ma, qe), Ie(Da, we), Ie(Ba, ne), Ie(Pa, re), Ie(Rr, M), Ie(Na, k), $(Ae))
    if (Ae.length) {
      const ee = t.exposed || (t.exposed = {});
      Ae.forEach((Q) => {
        Object.defineProperty(ee, Q, {
          get: () => n[Q],
          set: (q) => n[Q] = q,
          enumerable: !0
        });
      });
    } else t.exposed || (t.exposed = {});
  de && t.render === St && (t.render = de), Ve != null && (t.inheritAttrs = Ve), ae && (t.components = ae), je && (t.directives = je), k && bo(t);
}
function Ha(t, e, n = St) {
  $(t) && (t = nr(t));
  for (const s in t) {
    const r = t[s];
    let i;
    Fe(r) ? "default" in r ? i = Qn(
      r.from || s,
      r.default,
      !0
    ) : i = Qn(r.from || s) : i = Qn(r), Ke(i) ? Object.defineProperty(e, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : e[s] = i;
  }
}
function ii(t, e, n) {
  Et(
    $(t) ? t.map((s) => s.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function xo(t, e, n, s) {
  let r = s.includes(".") ? Do(n, s) : () => n[s];
  if (Me(t)) {
    const i = e[t];
    J(i) && nn(r, i);
  } else if (J(t))
    nn(r, t.bind(n));
  else if (Fe(t))
    if ($(t))
      t.forEach((i) => xo(i, e, n, s));
    else {
      const i = J(t.handler) ? t.handler.bind(n) : e[t.handler];
      J(i) && nn(r, i, t);
    }
}
function So(t) {
  const e = t.type, { mixins: n, extends: s } = e, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = i.get(e);
  let a;
  return l ? a = l : !r.length && !n && !s ? a = e : (a = {}, r.length && r.forEach(
    (u) => hs(a, u, o, !0)
  ), hs(a, e, o)), Fe(e) && i.set(e, a), a;
}
function hs(t, e, n, s = !1) {
  const { mixins: r, extends: i } = e;
  i && hs(t, i, n, !0), r && r.forEach(
    (o) => hs(t, o, n, !0)
  );
  for (const o in e)
    if (!(s && o === "expose")) {
      const l = ja[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const ja = {
  data: oi,
  props: li,
  emits: li,
  // objects
  methods: Sn,
  computed: Sn,
  // lifecycle
  beforeCreate: Ye,
  created: Ye,
  beforeMount: Ye,
  mounted: Ye,
  beforeUpdate: Ye,
  updated: Ye,
  beforeDestroy: Ye,
  beforeUnmount: Ye,
  destroyed: Ye,
  unmounted: Ye,
  activated: Ye,
  deactivated: Ye,
  errorCaptured: Ye,
  serverPrefetch: Ye,
  // assets
  components: Sn,
  directives: Sn,
  // watch
  watch: za,
  // provide / inject
  provide: oi,
  inject: Wa
};
function oi(t, e) {
  return e ? t ? function() {
    return $e(
      J(t) ? t.call(this, this) : t,
      J(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function Wa(t, e) {
  return Sn(nr(t), nr(e));
}
function nr(t) {
  if ($(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function Ye(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Sn(t, e) {
  return t ? $e(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function li(t, e) {
  return t ? $(t) && $(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : $e(
    /* @__PURE__ */ Object.create(null),
    ri(t),
    ri(e ?? {})
  ) : e;
}
function za(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = $e(/* @__PURE__ */ Object.create(null), t);
  for (const s in e)
    n[s] = Ye(t[s], e[s]);
  return n;
}
function Co() {
  return {
    app: null,
    config: {
      isNativeTag: Pl,
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
let Ka = 0;
function $a(t, e) {
  return function(s, r = null) {
    J(s) || (s = $e({}, s)), r != null && !Fe(r) && (r = null);
    const i = Co(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const u = i.app = {
      _uid: Ka++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Ic,
      get config() {
        return i.config;
      },
      set config(c) {
      },
      use(c, ...g) {
        return o.has(c) || (c && J(c.install) ? (o.add(c), c.install(u, ...g)) : J(c) && (o.add(c), c(u, ...g))), u;
      },
      mixin(c) {
        return i.mixins.includes(c) || i.mixins.push(c), u;
      },
      component(c, g) {
        return g ? (i.components[c] = g, u) : i.components[c];
      },
      directive(c, g) {
        return g ? (i.directives[c] = g, u) : i.directives[c];
      },
      mount(c, g, _) {
        if (!a) {
          const A = u._ceVNode || Ct(s, r);
          return A.appContext = i, _ === !0 ? _ = "svg" : _ === !1 && (_ = void 0), t(A, c, _), a = !0, u._container = c, c.__vue_app__ = u, Ts(A.component);
        }
      },
      onUnmount(c) {
        l.push(c);
      },
      unmount() {
        a && (Et(
          l,
          u._instance,
          16
        ), t(null, u._container), delete u._container.__vue_app__);
      },
      provide(c, g) {
        return i.provides[c] = g, u;
      },
      runWithContext(c) {
        const g = pn;
        pn = u;
        try {
          return c();
        } finally {
          pn = g;
        }
      }
    };
    return u;
  };
}
let pn = null;
function Za(t, e) {
  if (Qe) {
    let n = Qe.provides;
    const s = Qe.parent && Qe.parent.provides;
    s === n && (n = Qe.provides = Object.create(s)), n[t] = e;
  }
}
function Qn(t, e, n = !1) {
  const s = Sc();
  if (s || pn) {
    let r = pn ? pn._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && t in r)
      return r[t];
    if (arguments.length > 1)
      return n && J(e) ? e.call(s && s.proxy) : e;
  }
}
const To = {}, Eo = () => Object.create(To), Ao = (t) => Object.getPrototypeOf(t) === To;
function Ga(t, e, n, s = !1) {
  const r = {}, i = Eo();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), Ro(t, e, r, i);
  for (const o in t.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? t.props = s ? r : ha(r) : t.type.props ? t.props = r : t.props = i, t.attrs = i;
}
function Ya(t, e, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = t, l = me(r), [a] = t.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const c = t.vnode.dynamicProps;
      for (let g = 0; g < c.length; g++) {
        let _ = c[g];
        if (Ss(t.emitsOptions, _))
          continue;
        const A = e[_];
        if (a)
          if (_e(i, _))
            A !== i[_] && (i[_] = A, u = !0);
          else {
            const N = Kt(_);
            r[N] = sr(
              a,
              l,
              N,
              A,
              t,
              !1
            );
          }
        else
          A !== i[_] && (i[_] = A, u = !0);
      }
    }
  } else {
    Ro(t, e, r, i) && (u = !0);
    let c;
    for (const g in l)
      (!e || // for camelCase
      !_e(e, g) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Yt(g)) === g || !_e(e, c))) && (a ? n && // for camelCase
      (n[g] !== void 0 || // for kebab-case
      n[c] !== void 0) && (r[g] = sr(
        a,
        l,
        g,
        void 0,
        t,
        !0
      )) : delete r[g]);
    if (i !== l)
      for (const g in i)
        (!e || !_e(e, g)) && (delete i[g], u = !0);
  }
  u && Ft(t.attrs, "set", "");
}
function Ro(t, e, n, s) {
  const [r, i] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let a in e) {
      if (Tn(a))
        continue;
      const u = e[a];
      let c;
      r && _e(r, c = Kt(a)) ? !i || !i.includes(c) ? n[c] = u : (l || (l = {}))[c] = u : Ss(t.emitsOptions, a) || (!(a in s) || u !== s[a]) && (s[a] = u, o = !0);
    }
  if (i) {
    const a = me(n), u = l || xe;
    for (let c = 0; c < i.length; c++) {
      const g = i[c];
      n[g] = sr(
        r,
        a,
        g,
        u[g],
        t,
        !_e(u, g)
      );
    }
  }
  return o;
}
function sr(t, e, n, s, r, i) {
  const o = t[n];
  if (o != null) {
    const l = _e(o, "default");
    if (l && s === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && J(a)) {
        const { propsDefaults: u } = r;
        if (n in u)
          s = u[n];
        else {
          const c = Un(r);
          s = u[n] = a.call(
            null,
            e
          ), c();
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
    ] && (s === "" || s === Yt(n)) && (s = !0));
  }
  return s;
}
const Ja = /* @__PURE__ */ new WeakMap();
function Io(t, e, n = !1) {
  const s = n ? Ja : e.propsCache, r = s.get(t);
  if (r)
    return r;
  const i = t.props, o = {}, l = [];
  let a = !1;
  if (!J(t)) {
    const c = (g) => {
      a = !0;
      const [_, A] = Io(g, e, !0);
      $e(o, _), A && l.push(...A);
    };
    !n && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  if (!i && !a)
    return Fe(t) && s.set(t, un), un;
  if ($(i))
    for (let c = 0; c < i.length; c++) {
      const g = Kt(i[c]);
      ai(g) && (o[g] = xe);
    }
  else if (i)
    for (const c in i) {
      const g = Kt(c);
      if (ai(g)) {
        const _ = i[c], A = o[g] = $(_) || J(_) ? { type: _ } : $e({}, _), N = A.type;
        let V = !1, te = !0;
        if ($(N))
          for (let Z = 0; Z < N.length; ++Z) {
            const re = N[Z], ie = J(re) && re.name;
            if (ie === "Boolean") {
              V = !0;
              break;
            } else ie === "String" && (te = !1);
          }
        else
          V = J(N) && N.name === "Boolean";
        A[
          0
          /* shouldCast */
        ] = V, A[
          1
          /* shouldCastTrue */
        ] = te, (V || _e(A, "default")) && l.push(g);
      }
    }
  const u = [o, l];
  return Fe(t) && s.set(t, u), u;
}
function ai(t) {
  return t[0] !== "$" && !Tn(t);
}
const Ir = (t) => t === "_" || t === "__" || t === "_ctx" || t === "$stable", Or = (t) => $(t) ? t.map(xt) : [xt(t)], Qa = (t, e, n) => {
  if (e._n)
    return e;
  const s = Sa((...r) => Or(e(...r)), n);
  return s._c = !1, s;
}, Oo = (t, e, n) => {
  const s = t._ctx;
  for (const r in t) {
    if (Ir(r)) continue;
    const i = t[r];
    if (J(i))
      e[r] = Qa(r, i, s);
    else if (i != null) {
      const o = Or(i);
      e[r] = () => o;
    }
  }
}, Lo = (t, e) => {
  const n = Or(e);
  t.slots.default = () => n;
}, Fo = (t, e, n) => {
  for (const s in e)
    (n || !Ir(s)) && (t[s] = e[s]);
}, Xa = (t, e, n) => {
  const s = t.slots = Eo();
  if (t.vnode.shapeFlag & 32) {
    const r = e.__;
    r && Zs(s, "__", r, !0);
    const i = e._;
    i ? (Fo(s, e, n), n && Zs(s, "_", i, !0)) : Oo(e, s);
  } else e && Lo(t, e);
}, ec = (t, e, n) => {
  const { vnode: s, slots: r } = t;
  let i = !0, o = xe;
  if (s.shapeFlag & 32) {
    const l = e._;
    l ? n && l === 1 ? i = !1 : Fo(r, e, n) : (i = !e.$stable, Oo(e, r)), o = e;
  } else e && (Lo(t, e), o = { default: 1 });
  if (i)
    for (const l in r)
      !Ir(l) && o[l] == null && delete r[l];
}, st = pc;
function tc(t) {
  return nc(t);
}
function nc(t, e) {
  const n = vs();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: l,
    createComment: a,
    setText: u,
    setElementText: c,
    parentNode: g,
    nextSibling: _,
    setScopeId: A = St,
    insertStaticContent: N
  } = t, V = (f, m, b, T = null, x = null, C = null, P = void 0, F = null, I = !!m.dynamicChildren) => {
    if (f === m)
      return;
    f && !vn(f, m) && (T = lt(f), Se(f, x, C, !0), f = null), m.patchFlag === -2 && (I = !1, m.dynamicChildren = null);
    const { type: E, ref: W, shapeFlag: B } = m;
    switch (E) {
      case Cs:
        te(f, m, b, T);
        break;
      case Zt:
        Z(f, m, b, T);
        break;
      case Xn:
        f == null && re(m, b, T, P);
        break;
      case Ne:
        ae(
          f,
          m,
          b,
          T,
          x,
          C,
          P,
          F,
          I
        );
        break;
      default:
        B & 1 ? de(
          f,
          m,
          b,
          T,
          x,
          C,
          P,
          F,
          I
        ) : B & 6 ? je(
          f,
          m,
          b,
          T,
          x,
          C,
          P,
          F,
          I
        ) : (B & 64 || B & 128) && E.process(
          f,
          m,
          b,
          T,
          x,
          C,
          P,
          F,
          I,
          _t
        );
    }
    W != null && x ? Rn(W, f && f.ref, C, m || f, !m) : W == null && f && f.ref != null && Rn(f.ref, null, C, f, !0);
  }, te = (f, m, b, T) => {
    if (f == null)
      s(
        m.el = l(m.children),
        b,
        T
      );
    else {
      const x = m.el = f.el;
      m.children !== f.children && u(x, m.children);
    }
  }, Z = (f, m, b, T) => {
    f == null ? s(
      m.el = a(m.children || ""),
      b,
      T
    ) : m.el = f.el;
  }, re = (f, m, b, T) => {
    [f.el, f.anchor] = N(
      f.children,
      m,
      b,
      T,
      f.el,
      f.anchor
    );
  }, ie = ({ el: f, anchor: m }, b, T) => {
    let x;
    for (; f && f !== m; )
      x = _(f), s(f, b, T), f = x;
    s(m, b, T);
  }, M = ({ el: f, anchor: m }) => {
    let b;
    for (; f && f !== m; )
      b = _(f), r(f), f = b;
    r(m);
  }, de = (f, m, b, T, x, C, P, F, I) => {
    m.type === "svg" ? P = "svg" : m.type === "math" && (P = "mathml"), f == null ? we(
      m,
      b,
      T,
      x,
      C,
      P,
      F,
      I
    ) : k(
      f,
      m,
      x,
      C,
      P,
      F,
      I
    );
  }, we = (f, m, b, T, x, C, P, F) => {
    let I, E;
    const { props: W, shapeFlag: B, transition: j, dirs: K } = f;
    if (I = f.el = o(
      f.type,
      C,
      W && W.is,
      W
    ), B & 8 ? c(I, f.children) : B & 16 && qe(
      f.children,
      I,
      null,
      T,
      x,
      qs(f, C),
      P,
      F
    ), K && Qt(f, null, T, "created"), ne(I, f, f.scopeId, P, T), W) {
      for (const pe in W)
        pe !== "value" && !Tn(pe) && i(I, pe, null, W[pe], C, T);
      "value" in W && i(I, "value", null, W.value, C), (E = W.onVnodeBeforeMount) && vt(E, T, f);
    }
    K && Qt(f, null, T, "beforeMount");
    const G = sc(x, j);
    G && j.beforeEnter(I), s(I, m, b), ((E = W && W.onVnodeMounted) || G || K) && st(() => {
      E && vt(E, T, f), G && j.enter(I), K && Qt(f, null, T, "mounted");
    }, x);
  }, ne = (f, m, b, T, x) => {
    if (b && A(f, b), T)
      for (let C = 0; C < T.length; C++)
        A(f, T[C]);
    if (x) {
      let C = x.subTree;
      if (m === C || qo(C.type) && (C.ssContent === m || C.ssFallback === m)) {
        const P = x.vnode;
        ne(
          f,
          P,
          P.scopeId,
          P.slotScopeIds,
          x.parent
        );
      }
    }
  }, qe = (f, m, b, T, x, C, P, F, I = 0) => {
    for (let E = I; E < f.length; E++) {
      const W = f[E] = F ? jt(f[E]) : xt(f[E]);
      V(
        null,
        W,
        m,
        b,
        T,
        x,
        C,
        P,
        F
      );
    }
  }, k = (f, m, b, T, x, C, P) => {
    const F = m.el = f.el;
    let { patchFlag: I, dynamicChildren: E, dirs: W } = m;
    I |= f.patchFlag & 16;
    const B = f.props || xe, j = m.props || xe;
    let K;
    if (b && Xt(b, !1), (K = j.onVnodeBeforeUpdate) && vt(K, b, m, f), W && Qt(m, f, b, "beforeUpdate"), b && Xt(b, !0), (B.innerHTML && j.innerHTML == null || B.textContent && j.textContent == null) && c(F, ""), E ? Ae(
      f.dynamicChildren,
      E,
      F,
      b,
      T,
      qs(m, x),
      C
    ) : P || Q(
      f,
      m,
      F,
      null,
      b,
      T,
      qs(m, x),
      C,
      !1
    ), I > 0) {
      if (I & 16)
        Ve(F, B, j, b, x);
      else if (I & 2 && B.class !== j.class && i(F, "class", null, j.class, x), I & 4 && i(F, "style", B.style, j.style, x), I & 8) {
        const G = m.dynamicProps;
        for (let pe = 0; pe < G.length; pe++) {
          const se = G[pe], Ue = B[se], Te = j[se];
          (Te !== Ue || se === "value") && i(F, se, Ue, Te, x, b);
        }
      }
      I & 1 && f.children !== m.children && c(F, m.children);
    } else !P && E == null && Ve(F, B, j, b, x);
    ((K = j.onVnodeUpdated) || W) && st(() => {
      K && vt(K, b, m, f), W && Qt(m, f, b, "updated");
    }, T);
  }, Ae = (f, m, b, T, x, C, P) => {
    for (let F = 0; F < m.length; F++) {
      const I = f[F], E = m[F], W = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        I.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (I.type === Ne || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !vn(I, E) || // - In the case of a component, it could contain anything.
        I.shapeFlag & 198) ? g(I.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      V(
        I,
        E,
        W,
        null,
        T,
        x,
        C,
        P,
        !0
      );
    }
  }, Ve = (f, m, b, T, x) => {
    if (m !== b) {
      if (m !== xe)
        for (const C in m)
          !Tn(C) && !(C in b) && i(
            f,
            C,
            m[C],
            null,
            x,
            T
          );
      for (const C in b) {
        if (Tn(C)) continue;
        const P = b[C], F = m[C];
        P !== F && C !== "value" && i(f, C, F, P, x, T);
      }
      "value" in b && i(f, "value", m.value, b.value, x);
    }
  }, ae = (f, m, b, T, x, C, P, F, I) => {
    const E = m.el = f ? f.el : l(""), W = m.anchor = f ? f.anchor : l("");
    let { patchFlag: B, dynamicChildren: j, slotScopeIds: K } = m;
    K && (F = F ? F.concat(K) : K), f == null ? (s(E, b, T), s(W, b, T), qe(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      b,
      W,
      x,
      C,
      P,
      F,
      I
    )) : B > 0 && B & 64 && j && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren ? (Ae(
      f.dynamicChildren,
      j,
      b,
      x,
      C,
      P,
      F
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || x && m === x.subTree) && Po(
      f,
      m,
      !0
      /* shallow */
    )) : Q(
      f,
      m,
      b,
      W,
      x,
      C,
      P,
      F,
      I
    );
  }, je = (f, m, b, T, x, C, P, F, I) => {
    m.slotScopeIds = F, f == null ? m.shapeFlag & 512 ? x.ctx.activate(
      m,
      b,
      T,
      P,
      I
    ) : Rt(
      m,
      b,
      T,
      x,
      C,
      P,
      I
    ) : it(f, m, I);
  }, Rt = (f, m, b, T, x, C, P) => {
    const F = f.component = xc(
      f,
      T,
      x
    );
    if (vo(f) && (F.ctx.renderer = _t), Cc(F, !1, P), F.asyncDep) {
      if (x && x.registerDep(F, Ie, P), !f.el) {
        const I = F.subTree = Ct(Zt);
        Z(null, I, m, b), f.placeholder = I.el;
      }
    } else
      Ie(
        F,
        f,
        m,
        b,
        x,
        C,
        P
      );
  }, it = (f, m, b) => {
    const T = m.component = f.component;
    if (fc(f, m, b))
      if (T.asyncDep && !T.asyncResolved) {
        ee(T, m, b);
        return;
      } else
        T.next = m, T.update();
    else
      m.el = f.el, T.vnode = m;
  }, Ie = (f, m, b, T, x, C, P) => {
    const F = () => {
      if (f.isMounted) {
        let { next: B, bu: j, u: K, parent: G, vnode: pe } = f;
        {
          const h = No(f);
          if (h) {
            B && (B.el = pe.el, ee(f, B, P)), h.asyncDep.then(() => {
              f.isUnmounted || F();
            });
            return;
          }
        }
        let se = B, Ue;
        Xt(f, !1), B ? (B.el = pe.el, ee(f, B, P)) : B = pe, j && Jn(j), (Ue = B.props && B.props.onVnodeBeforeUpdate) && vt(Ue, G, B, pe), Xt(f, !0);
        const Te = ui(f), Ge = f.subTree;
        f.subTree = Te, V(
          Ge,
          Te,
          // parent may have changed if it's in a teleport
          g(Ge.el),
          // anchor may have changed if it's in a fragment
          lt(Ge),
          f,
          x,
          C
        ), B.el = Te.el, se === null && dc(f, Te.el), K && st(K, x), (Ue = B.props && B.props.onVnodeUpdated) && st(
          () => vt(Ue, G, B, pe),
          x
        );
      } else {
        let B;
        const { el: j, props: K } = m, { bm: G, m: pe, parent: se, root: Ue, type: Te } = f, Ge = In(m);
        Xt(f, !1), G && Jn(G), !Ge && (B = K && K.onVnodeBeforeMount) && vt(B, se, m), Xt(f, !0);
        {
          Ue.ce && // @ts-expect-error _def is private
          Ue.ce._def.shadowRoot !== !1 && Ue.ce._injectChildStyle(Te);
          const h = f.subTree = ui(f);
          V(
            null,
            h,
            b,
            T,
            f,
            x,
            C
          ), m.el = h.el;
        }
        if (pe && st(pe, x), !Ge && (B = K && K.onVnodeMounted)) {
          const h = m;
          st(
            () => vt(B, se, h),
            x
          );
        }
        (m.shapeFlag & 256 || se && In(se.vnode) && se.vnode.shapeFlag & 256) && f.a && st(f.a, x), f.isMounted = !0, m = b = T = null;
      }
    };
    f.scope.on();
    const I = f.effect = new Yi(F);
    f.scope.off();
    const E = f.update = I.run.bind(I), W = f.job = I.runIfDirty.bind(I);
    W.i = f, W.id = f.uid, I.scheduler = () => Er(W), Xt(f, !0), E();
  }, ee = (f, m, b) => {
    m.component = f;
    const T = f.vnode.props;
    f.vnode = m, f.next = null, Ya(f, m.props, T, b), ec(f, m.children, b), Dt(), si(f), Mt();
  }, Q = (f, m, b, T, x, C, P, F, I = !1) => {
    const E = f && f.children, W = f ? f.shapeFlag : 0, B = m.children, { patchFlag: j, shapeFlag: K } = m;
    if (j > 0) {
      if (j & 128) {
        be(
          E,
          B,
          b,
          T,
          x,
          C,
          P,
          F,
          I
        );
        return;
      } else if (j & 256) {
        q(
          E,
          B,
          b,
          T,
          x,
          C,
          P,
          F,
          I
        );
        return;
      }
    }
    K & 8 ? (W & 16 && ft(E, x, C), B !== E && c(b, B)) : W & 16 ? K & 16 ? be(
      E,
      B,
      b,
      T,
      x,
      C,
      P,
      F,
      I
    ) : ft(E, x, C, !0) : (W & 8 && c(b, ""), K & 16 && qe(
      B,
      b,
      T,
      x,
      C,
      P,
      F,
      I
    ));
  }, q = (f, m, b, T, x, C, P, F, I) => {
    f = f || un, m = m || un;
    const E = f.length, W = m.length, B = Math.min(E, W);
    let j;
    for (j = 0; j < B; j++) {
      const K = m[j] = I ? jt(m[j]) : xt(m[j]);
      V(
        f[j],
        K,
        b,
        null,
        x,
        C,
        P,
        F,
        I
      );
    }
    E > W ? ft(
      f,
      x,
      C,
      !0,
      !1,
      B
    ) : qe(
      m,
      b,
      T,
      x,
      C,
      P,
      F,
      I,
      B
    );
  }, be = (f, m, b, T, x, C, P, F, I) => {
    let E = 0;
    const W = m.length;
    let B = f.length - 1, j = W - 1;
    for (; E <= B && E <= j; ) {
      const K = f[E], G = m[E] = I ? jt(m[E]) : xt(m[E]);
      if (vn(K, G))
        V(
          K,
          G,
          b,
          null,
          x,
          C,
          P,
          F,
          I
        );
      else
        break;
      E++;
    }
    for (; E <= B && E <= j; ) {
      const K = f[B], G = m[j] = I ? jt(m[j]) : xt(m[j]);
      if (vn(K, G))
        V(
          K,
          G,
          b,
          null,
          x,
          C,
          P,
          F,
          I
        );
      else
        break;
      B--, j--;
    }
    if (E > B) {
      if (E <= j) {
        const K = j + 1, G = K < W ? m[K].el : T;
        for (; E <= j; )
          V(
            null,
            m[E] = I ? jt(m[E]) : xt(m[E]),
            b,
            G,
            x,
            C,
            P,
            F,
            I
          ), E++;
      }
    } else if (E > j)
      for (; E <= B; )
        Se(f[E], x, C, !0), E++;
    else {
      const K = E, G = E, pe = /* @__PURE__ */ new Map();
      for (E = G; E <= j; E++) {
        const y = m[E] = I ? jt(m[E]) : xt(m[E]);
        y.key != null && pe.set(y.key, E);
      }
      let se, Ue = 0;
      const Te = j - G + 1;
      let Ge = !1, h = 0;
      const p = new Array(Te);
      for (E = 0; E < Te; E++) p[E] = 0;
      for (E = K; E <= B; E++) {
        const y = f[E];
        if (Ue >= Te) {
          Se(y, x, C, !0);
          continue;
        }
        let S;
        if (y.key != null)
          S = pe.get(y.key);
        else
          for (se = G; se <= j; se++)
            if (p[se - G] === 0 && vn(y, m[se])) {
              S = se;
              break;
            }
        S === void 0 ? Se(y, x, C, !0) : (p[S - G] = E + 1, S >= h ? h = S : Ge = !0, V(
          y,
          m[S],
          b,
          null,
          x,
          C,
          P,
          F,
          I
        ), Ue++);
      }
      const w = Ge ? rc(p) : un;
      for (se = w.length - 1, E = Te - 1; E >= 0; E--) {
        const y = G + E, S = m[y], D = m[y + 1], U = y + 1 < W ? (
          // #13559, fallback to el placeholder for unresolved async component
          D.el || D.placeholder
        ) : T;
        p[E] === 0 ? V(
          null,
          S,
          b,
          U,
          x,
          C,
          P,
          F,
          I
        ) : Ge && (se < 0 || E !== w[se] ? H(S, b, U, 2) : se--);
      }
    }
  }, H = (f, m, b, T, x = null) => {
    const { el: C, type: P, transition: F, children: I, shapeFlag: E } = f;
    if (E & 6) {
      H(f.component.subTree, m, b, T);
      return;
    }
    if (E & 128) {
      f.suspense.move(m, b, T);
      return;
    }
    if (E & 64) {
      P.move(f, m, b, _t);
      return;
    }
    if (P === Ne) {
      s(C, m, b);
      for (let B = 0; B < I.length; B++)
        H(I[B], m, b, T);
      s(f.anchor, m, b);
      return;
    }
    if (P === Xn) {
      ie(f, m, b);
      return;
    }
    if (T !== 2 && E & 1 && F)
      if (T === 0)
        F.beforeEnter(C), s(C, m, b), st(() => F.enter(C), x);
      else {
        const { leave: B, delayLeave: j, afterLeave: K } = F, G = () => {
          f.ctx.isUnmounted ? r(C) : s(C, m, b);
        }, pe = () => {
          B(C, () => {
            G(), K && K();
          });
        };
        j ? j(C, G, pe) : pe();
      }
    else
      s(C, m, b);
  }, Se = (f, m, b, T = !1, x = !1) => {
    const {
      type: C,
      props: P,
      ref: F,
      children: I,
      dynamicChildren: E,
      shapeFlag: W,
      patchFlag: B,
      dirs: j,
      cacheIndex: K
    } = f;
    if (B === -2 && (x = !1), F != null && (Dt(), Rn(F, null, b, f, !0), Mt()), K != null && (m.renderCache[K] = void 0), W & 256) {
      m.ctx.deactivate(f);
      return;
    }
    const G = W & 1 && j, pe = !In(f);
    let se;
    if (pe && (se = P && P.onVnodeBeforeUnmount) && vt(se, m, f), W & 6)
      ot(f.component, b, T);
    else {
      if (W & 128) {
        f.suspense.unmount(b, T);
        return;
      }
      G && Qt(f, null, m, "beforeUnmount"), W & 64 ? f.type.remove(
        f,
        m,
        b,
        _t,
        T
      ) : E && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !E.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (C !== Ne || B > 0 && B & 64) ? ft(
        E,
        m,
        b,
        !1,
        !0
      ) : (C === Ne && B & 384 || !x && W & 16) && ft(I, m, b), T && Ze(f);
    }
    (pe && (se = P && P.onVnodeUnmounted) || G) && st(() => {
      se && vt(se, m, f), G && Qt(f, null, m, "unmounted");
    }, b);
  }, Ze = (f) => {
    const { type: m, el: b, anchor: T, transition: x } = f;
    if (m === Ne) {
      Ut(b, T);
      return;
    }
    if (m === Xn) {
      M(f);
      return;
    }
    const C = () => {
      r(b), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (f.shapeFlag & 1 && x && !x.persisted) {
      const { leave: P, delayLeave: F } = x, I = () => P(b, C);
      F ? F(f.el, C, I) : I();
    } else
      C();
  }, Ut = (f, m) => {
    let b;
    for (; f !== m; )
      b = _(f), r(f), f = b;
    r(m);
  }, ot = (f, m, b) => {
    const {
      bum: T,
      scope: x,
      job: C,
      subTree: P,
      um: F,
      m: I,
      a: E,
      parent: W,
      slots: { __: B }
    } = f;
    ci(I), ci(E), T && Jn(T), W && $(B) && B.forEach((j) => {
      W.renderCache[j] = void 0;
    }), x.stop(), C && (C.flags |= 8, Se(P, f, m, b)), F && st(F, m), st(() => {
      f.isUnmounted = !0;
    }, m), m && m.pendingBranch && !m.isUnmounted && f.asyncDep && !f.asyncResolved && f.suspenseId === m.pendingId && (m.deps--, m.deps === 0 && m.resolve());
  }, ft = (f, m, b, T = !1, x = !1, C = 0) => {
    for (let P = C; P < f.length; P++)
      Se(f[P], m, b, T, x);
  }, lt = (f) => {
    if (f.shapeFlag & 6)
      return lt(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const m = _(f.anchor || f.el), b = m && m[Ca];
    return b ? _(b) : m;
  };
  let mt = !1;
  const et = (f, m, b) => {
    f == null ? m._vnode && Se(m._vnode, null, null, !0) : V(
      m._vnode || null,
      f,
      m,
      null,
      null,
      null,
      b
    ), m._vnode = f, mt || (mt = !0, si(), mo(), mt = !1);
  }, _t = {
    p: V,
    um: Se,
    m: H,
    r: Ze,
    mt: Rt,
    mc: qe,
    pc: Q,
    pbc: Ae,
    n: lt,
    o: t
  };
  return {
    render: et,
    hydrate: void 0,
    createApp: $a(et)
  };
}
function qs({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function Xt({ effect: t, job: e }, n) {
  n ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function sc(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Po(t, e, n = !1) {
  const s = t.children, r = e.children;
  if ($(s) && $(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = jt(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && Po(o, l)), l.type === Cs && (l.el = o.el), l.type === Zt && !l.el && (l.el = o.el);
    }
}
function rc(t) {
  const e = t.slice(), n = [0];
  let s, r, i, o, l;
  const a = t.length;
  for (s = 0; s < a; s++) {
    const u = t[s];
    if (u !== 0) {
      if (r = n[n.length - 1], t[r] < u) {
        e[s] = r, n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        l = i + o >> 1, t[n[l]] < u ? i = l + 1 : o = l;
      u < t[n[i]] && (i > 0 && (e[s] = n[i - 1]), n[i] = s);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = e[o];
  return n;
}
function No(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : No(e);
}
function ci(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
const ic = Symbol.for("v-scx"), oc = () => Qn(ic);
function nn(t, e, n) {
  return Bo(t, e, n);
}
function Bo(t, e, n = xe) {
  const { immediate: s, deep: r, flush: i, once: o } = n, l = $e({}, n), a = e && s || !e && i !== "post";
  let u;
  if (Mn) {
    if (i === "sync") {
      const A = oc();
      u = A.__watcherHandles || (A.__watcherHandles = []);
    } else if (!a) {
      const A = () => {
      };
      return A.stop = St, A.resume = St, A.pause = St, A;
    }
  }
  const c = Qe;
  l.call = (A, N, V) => Et(A, c, N, V);
  let g = !1;
  i === "post" ? l.scheduler = (A) => {
    st(A, c && c.suspense);
  } : i !== "sync" && (g = !0, l.scheduler = (A, N) => {
    N ? A() : Er(A);
  }), l.augmentJob = (A) => {
    e && (A.flags |= 4), g && (A.flags |= 2, c && (A.id = c.uid, A.i = c));
  };
  const _ = va(t, e, l);
  return Mn && (u ? u.push(_) : a && _()), _;
}
function lc(t, e, n) {
  const s = this.proxy, r = Me(t) ? t.includes(".") ? Do(s, t) : () => s[t] : t.bind(s, s);
  let i;
  J(e) ? i = e : (i = e.handler, n = e);
  const o = Un(this), l = Bo(r, i.bind(s), n);
  return o(), l;
}
function Do(t, e) {
  const n = e.split(".");
  return () => {
    let s = t;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const ac = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${Kt(e)}Modifiers`] || t[`${Yt(e)}Modifiers`];
function cc(t, e, ...n) {
  if (t.isUnmounted) return;
  const s = t.vnode.props || xe;
  let r = n;
  const i = e.startsWith("update:"), o = i && ac(s, e.slice(7));
  o && (o.trim && (r = n.map((c) => Me(c) ? c.trim() : c)), o.number && (r = n.map(Gs)));
  let l, a = s[l = Fs(e)] || // also try camelCase event handler (#2249)
  s[l = Fs(Kt(e))];
  !a && i && (a = s[l = Fs(Yt(e))]), a && Et(
    a,
    t,
    6,
    r
  );
  const u = s[l + "Once"];
  if (u) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[l])
      return;
    t.emitted[l] = !0, Et(
      u,
      t,
      6,
      r
    );
  }
}
function Mo(t, e, n = !1) {
  const s = e.emitsCache, r = s.get(t);
  if (r !== void 0)
    return r;
  const i = t.emits;
  let o = {}, l = !1;
  if (!J(t)) {
    const a = (u) => {
      const c = Mo(u, e, !0);
      c && (l = !0, $e(o, c));
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  return !i && !l ? (Fe(t) && s.set(t, null), null) : ($(i) ? i.forEach((a) => o[a] = null) : $e(o, i), Fe(t) && s.set(t, o), o);
}
function Ss(t, e) {
  return !t || !_s(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), _e(t, e[0].toLowerCase() + e.slice(1)) || _e(t, Yt(e)) || _e(t, e));
}
function ui(t) {
  const {
    type: e,
    vnode: n,
    proxy: s,
    withProxy: r,
    propsOptions: [i],
    slots: o,
    attrs: l,
    emit: a,
    render: u,
    renderCache: c,
    props: g,
    data: _,
    setupState: A,
    ctx: N,
    inheritAttrs: V
  } = t, te = us(t);
  let Z, re;
  try {
    if (n.shapeFlag & 4) {
      const M = r || s, de = M;
      Z = xt(
        u.call(
          de,
          M,
          c,
          g,
          A,
          _,
          N
        )
      ), re = l;
    } else {
      const M = e;
      Z = xt(
        M.length > 1 ? M(
          g,
          { attrs: l, slots: o, emit: a }
        ) : M(
          g,
          null
        )
      ), re = e.props ? l : uc(l);
    }
  } catch (M) {
    Ln.length = 0, ks(M, t, 1), Z = Ct(Zt);
  }
  let ie = Z;
  if (re && V !== !1) {
    const M = Object.keys(re), { shapeFlag: de } = ie;
    M.length && de & 7 && (i && M.some(mr) && (re = hc(
      re,
      i
    )), ie = gn(ie, re, !1, !0));
  }
  return n.dirs && (ie = gn(ie, null, !1, !0), ie.dirs = ie.dirs ? ie.dirs.concat(n.dirs) : n.dirs), n.transition && Ar(ie, n.transition), Z = ie, us(te), Z;
}
const uc = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || _s(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, hc = (t, e) => {
  const n = {};
  for (const s in t)
    (!mr(s) || !(s.slice(9) in e)) && (n[s] = t[s]);
  return n;
};
function fc(t, e, n) {
  const { props: s, children: r, component: i } = t, { props: o, children: l, patchFlag: a } = e, u = i.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? hi(s, o, u) : !!o;
    if (a & 8) {
      const c = e.dynamicProps;
      for (let g = 0; g < c.length; g++) {
        const _ = c[g];
        if (o[_] !== s[_] && !Ss(u, _))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? hi(s, o, u) : !0 : !!o;
  return !1;
}
function hi(t, e, n) {
  const s = Object.keys(e);
  if (s.length !== Object.keys(t).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (e[i] !== t[i] && !Ss(n, i))
      return !0;
  }
  return !1;
}
function dc({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const s = e.subTree;
    if (s.suspense && s.suspense.activeBranch === t && (s.el = t.el), s === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const qo = (t) => t.__isSuspense;
function pc(t, e) {
  e && e.pendingBranch ? $(t) ? e.effects.push(...t) : e.effects.push(t) : xa(t);
}
const Ne = Symbol.for("v-fgt"), Cs = Symbol.for("v-txt"), Zt = Symbol.for("v-cmt"), Xn = Symbol.for("v-stc"), Ln = [];
let rt = null;
function O(t = !1) {
  Ln.push(rt = t ? null : []);
}
function gc() {
  Ln.pop(), rt = Ln[Ln.length - 1] || null;
}
let Dn = 1;
function fi(t, e = !1) {
  Dn += t, t < 0 && rt && e && (rt.hasOnce = !0);
}
function Uo(t) {
  return t.dynamicChildren = Dn > 0 ? rt || un : null, gc(), Dn > 0 && rt && rt.push(t), t;
}
function L(t, e, n, s, r, i) {
  return Uo(
    v(
      t,
      e,
      n,
      s,
      r,
      i,
      !0
    )
  );
}
function mc(t, e, n, s, r) {
  return Uo(
    Ct(
      t,
      e,
      n,
      s,
      r,
      !0
    )
  );
}
function Vo(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function vn(t, e) {
  return t.type === e.type && t.key === e.key;
}
const Ho = ({ key: t }) => t ?? null, es = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? Me(t) || Ke(t) || J(t) ? { i: ut, r: t, k: e, f: !!n } : t : null);
function v(t, e = null, n = null, s = 0, r = null, i = t === Ne ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Ho(e),
    ref: e && es(e),
    scopeId: yo,
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
    ctx: ut
  };
  return l ? (Lr(a, n), i & 128 && t.normalize(a)) : n && (a.shapeFlag |= Me(n) ? 8 : 16), Dn > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  rt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && rt.push(a), a;
}
const Ct = _c;
function _c(t, e = null, n = null, s = 0, r = null, i = !1) {
  if ((!t || t === qa) && (t = Zt), Vo(t)) {
    const l = gn(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && Lr(l, n), Dn > 0 && !i && rt && (l.shapeFlag & 6 ? rt[rt.indexOf(t)] = l : rt.push(l)), l.patchFlag = -2, l;
  }
  if (Rc(t) && (t = t.__vccOpts), e) {
    e = yc(e);
    let { class: l, style: a } = e;
    l && !Me(l) && (e.class = Re(l)), Fe(a) && (Tr(a) && !$(a) && (a = $e({}, a)), e.style = ve(a));
  }
  const o = Me(t) ? 1 : qo(t) ? 128 : Ta(t) ? 64 : Fe(t) ? 4 : J(t) ? 2 : 0;
  return v(
    t,
    e,
    n,
    s,
    r,
    o,
    i,
    !0
  );
}
function yc(t) {
  return t ? Tr(t) || Ao(t) ? $e({}, t) : t : null;
}
function gn(t, e, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: a } = t, u = e ? vc(r || {}, e) : r, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: u,
    key: u && Ho(u),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? $(i) ? i.concat(es(e)) : [i, es(e)] : es(e)
    ) : i,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: l,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== Ne ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && gn(t.ssContent),
    ssFallback: t.ssFallback && gn(t.ssFallback),
    placeholder: t.placeholder,
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return a && s && Ar(
    c,
    a.clone(c)
  ), c;
}
function dt(t = " ", e = 0) {
  return Ct(Cs, null, t, e);
}
function bc(t, e) {
  const n = Ct(Xn, null, t);
  return n.staticCount = e, n;
}
function oe(t = "", e = !1) {
  return e ? (O(), mc(Zt, null, t)) : Ct(Zt, null, t);
}
function xt(t) {
  return t == null || typeof t == "boolean" ? Ct(Zt) : $(t) ? Ct(
    Ne,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : Vo(t) ? jt(t) : Ct(Cs, null, String(t));
}
function jt(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : gn(t);
}
function Lr(t, e) {
  let n = 0;
  const { shapeFlag: s } = t;
  if (e == null)
    e = null;
  else if ($(e))
    n = 16;
  else if (typeof e == "object")
    if (s & 65) {
      const r = e.default;
      r && (r._c && (r._d = !1), Lr(t, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = e._;
      !r && !Ao(e) ? e._ctx = ut : r === 3 && ut && (ut.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else J(e) ? (e = { default: e, _ctx: ut }, n = 32) : (e = String(e), s & 64 ? (n = 16, e = [dt(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function vc(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    for (const r in s)
      if (r === "class")
        e.class !== s.class && (e.class = Re([e.class, s.class]));
      else if (r === "style")
        e.style = ve([e.style, s.style]);
      else if (_s(r)) {
        const i = e[r], o = s[r];
        o && i !== o && !($(i) && i.includes(o)) && (e[r] = i ? [].concat(i, o) : o);
      } else r !== "" && (e[r] = s[r]);
  }
  return e;
}
function vt(t, e, n, s = null) {
  Et(t, e, 7, [
    n,
    s
  ]);
}
const wc = Co();
let kc = 0;
function xc(t, e, n) {
  const s = t.type, r = (e ? e.appContext : t.appContext) || wc, i = {
    uid: kc++,
    vnode: t,
    type: s,
    parent: e,
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
    scope: new zl(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(r.provides),
    ids: e ? e.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Io(s, r),
    emitsOptions: Mo(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: xe,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: xe,
    data: xe,
    props: xe,
    attrs: xe,
    slots: xe,
    refs: xe,
    setupState: xe,
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
  return i.ctx = { _: i }, i.root = e ? e.root : i, i.emit = cc.bind(null, i), t.ce && t.ce(i), i;
}
let Qe = null;
const Sc = () => Qe || ut;
let fs, rr;
{
  const t = vs(), e = (n, s) => {
    let r;
    return (r = t[n]) || (r = t[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  fs = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Qe = n
  ), rr = e(
    "__VUE_SSR_SETTERS__",
    (n) => Mn = n
  );
}
const Un = (t) => {
  const e = Qe;
  return fs(t), t.scope.on(), () => {
    t.scope.off(), fs(e);
  };
}, di = () => {
  Qe && Qe.scope.off(), fs(null);
};
function jo(t) {
  return t.vnode.shapeFlag & 4;
}
let Mn = !1;
function Cc(t, e = !1, n = !1) {
  e && rr(e);
  const { props: s, children: r } = t.vnode, i = jo(t);
  Ga(t, s, i, e), Xa(t, r, n || e);
  const o = i ? Tc(t, e) : void 0;
  return e && rr(!1), o;
}
function Tc(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, Ua);
  const { setup: s } = n;
  if (s) {
    Dt();
    const r = t.setupContext = s.length > 1 ? Ac(t) : null, i = Un(t), o = qn(
      s,
      t,
      0,
      [
        t.props,
        r
      ]
    ), l = ji(o);
    if (Mt(), i(), (l || t.sp) && !In(t) && bo(t), l) {
      if (o.then(di, di), e)
        return o.then((a) => {
          pi(t, a);
        }).catch((a) => {
          ks(a, t, 0);
        });
      t.asyncDep = o;
    } else
      pi(t, o);
  } else
    Wo(t);
}
function pi(t, e, n) {
  J(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : Fe(e) && (t.setupState = ho(e)), Wo(t);
}
function Wo(t, e, n) {
  const s = t.type;
  t.render || (t.render = s.render || St);
  {
    const r = Un(t);
    Dt();
    try {
      Va(t);
    } finally {
      Mt(), r();
    }
  }
}
const Ec = {
  get(t, e) {
    return ze(t, "get", ""), t[e];
  }
};
function Ac(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    attrs: new Proxy(t.attrs, Ec),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function Ts(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(ho(fa(t.exposed)), {
    get(e, n) {
      if (n in e)
        return e[n];
      if (n in On)
        return On[n](t);
    },
    has(e, n) {
      return n in e || n in On;
    }
  })) : t.proxy;
}
function Rc(t) {
  return J(t) && "__vccOpts" in t;
}
const Be = (t, e) => ya(t, e, Mn), Ic = "3.5.18";
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ir;
const gi = typeof window < "u" && window.trustedTypes;
if (gi)
  try {
    ir = /* @__PURE__ */ gi.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const zo = ir ? (t) => ir.createHTML(t) : (t) => t, Oc = "http://www.w3.org/2000/svg", Lc = "http://www.w3.org/1998/Math/MathML", Lt = typeof document < "u" ? document : null, mi = Lt && /* @__PURE__ */ Lt.createElement("template"), Fc = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, s) => {
    const r = e === "svg" ? Lt.createElementNS(Oc, t) : e === "mathml" ? Lt.createElementNS(Lc, t) : n ? Lt.createElement(t, { is: n }) : Lt.createElement(t);
    return t === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (t) => Lt.createTextNode(t),
  createComment: (t) => Lt.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => Lt.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, n, s, r, i) {
    const o = n ? n.previousSibling : e.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; e.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      mi.innerHTML = zo(
        s === "svg" ? `<svg>${t}</svg>` : s === "mathml" ? `<math>${t}</math>` : t
      );
      const l = mi.content;
      if (s === "svg" || s === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      e.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : e.firstChild,
      // last
      n ? n.previousSibling : e.lastChild
    ];
  }
}, Pc = Symbol("_vtc");
function Nc(t, e, n) {
  const s = t[Pc];
  s && (e = (e ? [e, ...s] : [...s]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const _i = Symbol("_vod"), Bc = Symbol("_vsh"), Dc = Symbol(""), Mc = /(^|;)\s*display\s*:/;
function qc(t, e, n) {
  const s = t.style, r = Me(n);
  let i = !1;
  if (n && !r) {
    if (e)
      if (Me(e))
        for (const o of e.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && ts(s, l, "");
        }
      else
        for (const o in e)
          n[o] == null && ts(s, o, "");
    for (const o in n)
      o === "display" && (i = !0), ts(s, o, n[o]);
  } else if (r) {
    if (e !== n) {
      const o = s[Dc];
      o && (n += ";" + o), s.cssText = n, i = Mc.test(n);
    }
  } else e && t.removeAttribute("style");
  _i in t && (t[_i] = i ? s.display : "", t[Bc] && (s.display = "none"));
}
const yi = /\s*!important$/;
function ts(t, e, n) {
  if ($(n))
    n.forEach((s) => ts(t, e, s));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const s = Uc(t, e);
    yi.test(n) ? t.setProperty(
      Yt(s),
      n.replace(yi, ""),
      "important"
    ) : t[s] = n;
  }
}
const bi = ["Webkit", "Moz", "ms"], Us = {};
function Uc(t, e) {
  const n = Us[e];
  if (n)
    return n;
  let s = Kt(e);
  if (s !== "filter" && s in t)
    return Us[e] = s;
  s = Ki(s);
  for (let r = 0; r < bi.length; r++) {
    const i = bi[r] + s;
    if (i in t)
      return Us[e] = i;
  }
  return e;
}
const vi = "http://www.w3.org/1999/xlink";
function wi(t, e, n, s, r, i = Wl(e)) {
  s && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(vi, e.slice(6, e.length)) : t.setAttributeNS(vi, e, n) : n == null || i && !$i(n) ? t.removeAttribute(e) : t.setAttribute(
    e,
    i ? "" : Gt(n) ? String(n) : n
  );
}
function ki(t, e, n, s, r) {
  if (e === "innerHTML" || e === "textContent") {
    n != null && (t[e] = e === "innerHTML" ? zo(n) : n);
    return;
  }
  const i = t.tagName;
  if (e === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? t.getAttribute("value") || "" : t.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      t.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== a || !("_value" in t)) && (t.value = a), n == null && t.removeAttribute(e), t._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof t[e];
    l === "boolean" ? n = $i(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  o && t.removeAttribute(r || e);
}
function cn(t, e, n, s) {
  t.addEventListener(e, n, s);
}
function Vc(t, e, n, s) {
  t.removeEventListener(e, n, s);
}
const xi = Symbol("_vei");
function Hc(t, e, n, s, r = null) {
  const i = t[xi] || (t[xi] = {}), o = i[e];
  if (s && o)
    o.value = s;
  else {
    const [l, a] = jc(e);
    if (s) {
      const u = i[e] = Kc(
        s,
        r
      );
      cn(t, l, u, a);
    } else o && (Vc(t, l, o, a), i[e] = void 0);
  }
}
const Si = /(?:Once|Passive|Capture)$/;
function jc(t) {
  let e;
  if (Si.test(t)) {
    e = {};
    let s;
    for (; s = t.match(Si); )
      t = t.slice(0, t.length - s[0].length), e[s[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : Yt(t.slice(2)), e];
}
let Vs = 0;
const Wc = /* @__PURE__ */ Promise.resolve(), zc = () => Vs || (Wc.then(() => Vs = 0), Vs = Date.now());
function Kc(t, e) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Et(
      $c(s, n.value),
      e,
      5,
      [s]
    );
  };
  return n.value = t, n.attached = zc(), n;
}
function $c(t, e) {
  if ($(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map(
      (s) => (r) => !r._stopped && s && s(r)
    );
  } else
    return e;
}
const Ci = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, Zc = (t, e, n, s, r, i) => {
  const o = r === "svg";
  e === "class" ? Nc(t, s, o) : e === "style" ? qc(t, n, s) : _s(e) ? mr(e) || Hc(t, e, n, s, i) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Gc(t, e, s, o)) ? (ki(t, e, s), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && wi(t, e, s, o, i, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && (/[A-Z]/.test(e) || !Me(s)) ? ki(t, Kt(e), s, i, e) : (e === "true-value" ? t._trueValue = s : e === "false-value" && (t._falseValue = s), wi(t, e, s, o));
};
function Gc(t, e, n, s) {
  if (s)
    return !!(e === "innerHTML" || e === "textContent" || e in t && Ci(e) && J(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const r = t.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Ci(e) && Me(n) ? !1 : e in t;
}
const Ti = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return $(e) ? (n) => Jn(e, n) : e;
};
function Yc(t) {
  t.target.composing = !0;
}
function Ei(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const Hs = Symbol("_assign"), en = {
  created(t, { modifiers: { lazy: e, trim: n, number: s } }, r) {
    t[Hs] = Ti(r);
    const i = s || r.props && r.props.type === "number";
    cn(t, e ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let l = t.value;
      n && (l = l.trim()), i && (l = Gs(l)), t[Hs](l);
    }), n && cn(t, "change", () => {
      t.value = t.value.trim();
    }), e || (cn(t, "compositionstart", Yc), cn(t, "compositionend", Ei), cn(t, "change", Ei));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (t[Hs] = Ti(o), t.composing) return;
    const l = (i || t.type === "number") && !/^0\d/.test(t.value) ? Gs(t.value) : t.value, a = e ?? "";
    l !== a && (document.activeElement === t && t.type !== "range" && (s && e === n || r && t.value.trim() === a) || (t.value = a));
  }
}, Jc = ["ctrl", "shift", "alt", "meta"], Qc = {
  stop: (t) => t.stopPropagation(),
  prevent: (t) => t.preventDefault(),
  self: (t) => t.target !== t.currentTarget,
  ctrl: (t) => !t.ctrlKey,
  shift: (t) => !t.shiftKey,
  alt: (t) => !t.altKey,
  meta: (t) => !t.metaKey,
  left: (t) => "button" in t && t.button !== 0,
  middle: (t) => "button" in t && t.button !== 1,
  right: (t) => "button" in t && t.button !== 2,
  exact: (t, e) => Jc.some((n) => t[`${n}Key`] && !e.includes(n))
}, Ai = (t, e) => {
  const n = t._withMods || (t._withMods = {}), s = e.join(".");
  return n[s] || (n[s] = (r, ...i) => {
    for (let o = 0; o < e.length; o++) {
      const l = Qc[e[o]];
      if (l && l(r, e)) return;
    }
    return t(r, ...i);
  });
}, Xc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Ri = (t, e) => {
  const n = t._withKeys || (t._withKeys = {}), s = e.join(".");
  return n[s] || (n[s] = (r) => {
    if (!("key" in r))
      return;
    const i = Yt(r.key);
    if (e.some(
      (o) => o === i || Xc[o] === i
    ))
      return t(r);
  });
}, eu = /* @__PURE__ */ $e({ patchProp: Zc }, Fc);
let Ii;
function tu() {
  return Ii || (Ii = tc(eu));
}
const nu = (...t) => {
  const e = tu().createApp(...t), { mount: n } = e;
  return e.mount = (s) => {
    const r = ru(s);
    if (!r) return;
    const i = e._component;
    !J(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, su(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, e;
};
function su(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function ru(t) {
  return Me(t) ? document.querySelector(t) : t;
}
const Vt = (t) => {
  const e = t.replace("#", ""), n = parseInt(e.substr(0, 2), 16), s = parseInt(e.substr(2, 2), 16), r = parseInt(e.substr(4, 2), 16);
  return (n * 299 + s * 587 + r * 114) / 1e3 < 128;
}, iu = (t, e) => {
  const n = t.replace("#", ""), s = parseInt(n.substr(0, 2), 16), r = parseInt(n.substr(2, 2), 16), i = parseInt(n.substr(4, 2), 16), o = Vt(t), l = o ? Math.min(255, s + e) : Math.max(0, s - e), a = o ? Math.min(255, r + e) : Math.max(0, r - e), u = o ? Math.min(255, i + e) : Math.max(0, i - e);
  return `#${l.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}${u.toString(16).padStart(2, "0")}`;
}, Kn = (t) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t), ou = (t) => {
  switch (t.type) {
    case "connection_error":
      return "Unable to connect. Please try again later.";
    case "auth_error":
      return "Authentication failed. Please refresh the page.";
    case "chat_error":
      return "Unable to send message. Please try again.";
    case "ai_config_missing":
      return "Chat service is currently unavailable.";
    default:
      return t.error || "Something went wrong. Please try again.";
  }
};
function Fr() {
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
var on = Fr();
function Ko(t) {
  on = t;
}
var Fn = { exec: () => null };
function ye(t, e = "") {
  let n = typeof t == "string" ? t : t.source;
  const s = {
    replace: (r, i) => {
      let o = typeof i == "string" ? i : i.source;
      return o = o.replace(Xe.caret, "$1"), n = n.replace(r, o), s;
    },
    getRegex: () => new RegExp(n, e)
  };
  return s;
}
var Xe = {
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
  listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),
  nextBulletRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
  hrRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
  fencesBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:\`\`\`|~~~)`),
  headingBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}#`),
  htmlBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}<(?:[a-z].*>|!--)`, "i")
}, lu = /^(?:[ \t]*(?:\n|$))+/, au = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, cu = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Vn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, uu = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Pr = /(?:[*+-]|\d{1,9}[.)])/, $o = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Zo = ye($o).replace(/bull/g, Pr).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), hu = ye($o).replace(/bull/g, Pr).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Nr = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, fu = /^[^\n]+/, Br = /(?!\s*\])(?:\\.|[^\[\]\\])+/, du = ye(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Br).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), pu = ye(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Pr).getRegex(), Es = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Dr = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, gu = ye(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", Dr).replace("tag", Es).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Go = ye(Nr).replace("hr", Vn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Es).getRegex(), mu = ye(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Go).getRegex(), Mr = {
  blockquote: mu,
  code: au,
  def: du,
  fences: cu,
  heading: uu,
  hr: Vn,
  html: gu,
  lheading: Zo,
  list: pu,
  newline: lu,
  paragraph: Go,
  table: Fn,
  text: fu
}, Oi = ye(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", Vn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Es).getRegex(), _u = {
  ...Mr,
  lheading: hu,
  table: Oi,
  paragraph: ye(Nr).replace("hr", Vn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Oi).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Es).getRegex()
}, yu = {
  ...Mr,
  html: ye(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", Dr).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Fn,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: ye(Nr).replace("hr", Vn).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Zo).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, bu = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, vu = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Yo = /^( {2,}|\\)\n(?!\s*$)/, wu = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, As = /[\p{P}\p{S}]/u, qr = /[\s\p{P}\p{S}]/u, Jo = /[^\s\p{P}\p{S}]/u, ku = ye(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, qr).getRegex(), Qo = /(?!~)[\p{P}\p{S}]/u, xu = /(?!~)[\s\p{P}\p{S}]/u, Su = /(?:[^\s\p{P}\p{S}]|~)/u, Cu = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, Xo = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Tu = ye(Xo, "u").replace(/punct/g, As).getRegex(), Eu = ye(Xo, "u").replace(/punct/g, Qo).getRegex(), el = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Au = ye(el, "gu").replace(/notPunctSpace/g, Jo).replace(/punctSpace/g, qr).replace(/punct/g, As).getRegex(), Ru = ye(el, "gu").replace(/notPunctSpace/g, Su).replace(/punctSpace/g, xu).replace(/punct/g, Qo).getRegex(), Iu = ye(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, Jo).replace(/punctSpace/g, qr).replace(/punct/g, As).getRegex(), Ou = ye(/\\(punct)/, "gu").replace(/punct/g, As).getRegex(), Lu = ye(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Fu = ye(Dr).replace("(?:-->|$)", "-->").getRegex(), Pu = ye(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", Fu).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), ds = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, Nu = ye(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", ds).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), tl = ye(/^!?\[(label)\]\[(ref)\]/).replace("label", ds).replace("ref", Br).getRegex(), nl = ye(/^!?\[(ref)\](?:\[\])?/).replace("ref", Br).getRegex(), Bu = ye("reflink|nolink(?!\\()", "g").replace("reflink", tl).replace("nolink", nl).getRegex(), Ur = {
  _backpedal: Fn,
  // only used for GFM url
  anyPunctuation: Ou,
  autolink: Lu,
  blockSkip: Cu,
  br: Yo,
  code: vu,
  del: Fn,
  emStrongLDelim: Tu,
  emStrongRDelimAst: Au,
  emStrongRDelimUnd: Iu,
  escape: bu,
  link: Nu,
  nolink: nl,
  punctuation: ku,
  reflink: tl,
  reflinkSearch: Bu,
  tag: Pu,
  text: wu,
  url: Fn
}, Du = {
  ...Ur,
  link: ye(/^!?\[(label)\]\((.*?)\)/).replace("label", ds).getRegex(),
  reflink: ye(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", ds).getRegex()
}, or = {
  ...Ur,
  emStrongRDelimAst: Ru,
  emStrongLDelim: Eu,
  url: ye(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Mu = {
  ...or,
  br: ye(Yo).replace("{2,}", "*").getRegex(),
  text: ye(or.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, $n = {
  normal: Mr,
  gfm: _u,
  pedantic: yu
}, wn = {
  normal: Ur,
  gfm: or,
  breaks: Mu,
  pedantic: Du
}, qu = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Li = (t) => qu[t];
function wt(t, e) {
  if (e) {
    if (Xe.escapeTest.test(t))
      return t.replace(Xe.escapeReplace, Li);
  } else if (Xe.escapeTestNoEncode.test(t))
    return t.replace(Xe.escapeReplaceNoEncode, Li);
  return t;
}
function Fi(t) {
  try {
    t = encodeURI(t).replace(Xe.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function Pi(t, e) {
  var i;
  const n = t.replace(Xe.findPipe, (o, l, a) => {
    let u = !1, c = l;
    for (; --c >= 0 && a[c] === "\\"; ) u = !u;
    return u ? "|" : " |";
  }), s = n.split(Xe.splitPipe);
  let r = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((i = s.at(-1)) != null && i.trim()) && s.pop(), e)
    if (s.length > e)
      s.splice(e);
    else
      for (; s.length < e; ) s.push("");
  for (; r < s.length; r++)
    s[r] = s[r].trim().replace(Xe.slashPipe, "|");
  return s;
}
function kn(t, e, n) {
  const s = t.length;
  if (s === 0)
    return "";
  let r = 0;
  for (; r < s && t.charAt(s - r - 1) === e; )
    r++;
  return t.slice(0, s - r);
}
function Uu(t, e) {
  if (t.indexOf(e[1]) === -1)
    return -1;
  let n = 0;
  for (let s = 0; s < t.length; s++)
    if (t[s] === "\\")
      s++;
    else if (t[s] === e[0])
      n++;
    else if (t[s] === e[1] && (n--, n < 0))
      return s;
  return n > 0 ? -2 : -1;
}
function Ni(t, e, n, s, r) {
  const i = e.href, o = e.title || null, l = t[1].replace(r.other.outputLinkReplace, "$1");
  s.state.inLink = !0;
  const a = {
    type: t[0].charAt(0) === "!" ? "image" : "link",
    raw: n,
    href: i,
    title: o,
    text: l,
    tokens: s.inlineTokens(l)
  };
  return s.state.inLink = !1, a;
}
function Vu(t, e, n) {
  const s = t.match(n.other.indentCodeCompensation);
  if (s === null)
    return e;
  const r = s[1];
  return e.split(`
`).map((i) => {
    const o = i.match(n.other.beginningSpace);
    if (o === null)
      return i;
    const [l] = o;
    return l.length >= r.length ? i.slice(r.length) : i;
  }).join(`
`);
}
var ps = class {
  // set by the lexer
  constructor(t) {
    ke(this, "options");
    ke(this, "rules");
    // set by the lexer
    ke(this, "lexer");
    this.options = t || on;
  }
  space(t) {
    const e = this.rules.block.newline.exec(t);
    if (e && e[0].length > 0)
      return {
        type: "space",
        raw: e[0]
      };
  }
  code(t) {
    const e = this.rules.block.code.exec(t);
    if (e) {
      const n = e[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: e[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? n : kn(n, `
`)
      };
    }
  }
  fences(t) {
    const e = this.rules.block.fences.exec(t);
    if (e) {
      const n = e[0], s = Vu(n, e[3] || "", this.rules);
      return {
        type: "code",
        raw: n,
        lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2],
        text: s
      };
    }
  }
  heading(t) {
    const e = this.rules.block.heading.exec(t);
    if (e) {
      let n = e[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        const s = kn(n, "#");
        (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (n = s.trim());
      }
      return {
        type: "heading",
        raw: e[0],
        depth: e[1].length,
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  hr(t) {
    const e = this.rules.block.hr.exec(t);
    if (e)
      return {
        type: "hr",
        raw: kn(e[0], `
`)
      };
  }
  blockquote(t) {
    const e = this.rules.block.blockquote.exec(t);
    if (e) {
      let n = kn(e[0], `
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
        const u = l.join(`
`), c = u.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${u}` : u, r = r ? `${r}
${c}` : c;
        const g = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(c, i, !0), this.lexer.state.top = g, n.length === 0)
          break;
        const _ = i.at(-1);
        if ((_ == null ? void 0 : _.type) === "code")
          break;
        if ((_ == null ? void 0 : _.type) === "blockquote") {
          const A = _, N = A.raw + `
` + n.join(`
`), V = this.blockquote(N);
          i[i.length - 1] = V, s = s.substring(0, s.length - A.raw.length) + V.raw, r = r.substring(0, r.length - A.text.length) + V.text;
          break;
        } else if ((_ == null ? void 0 : _.type) === "list") {
          const A = _, N = A.raw + `
` + n.join(`
`), V = this.list(N);
          i[i.length - 1] = V, s = s.substring(0, s.length - _.raw.length) + V.raw, r = r.substring(0, r.length - A.raw.length) + V.raw, n = N.substring(i.at(-1).raw.length).split(`
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
  list(t) {
    let e = this.rules.block.list.exec(t);
    if (e) {
      let n = e[1].trim();
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
      for (; t; ) {
        let a = !1, u = "", c = "";
        if (!(e = i.exec(t)) || this.rules.block.hr.test(t))
          break;
        u = e[0], t = t.substring(u.length);
        let g = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (Z) => " ".repeat(3 * Z.length)), _ = t.split(`
`, 1)[0], A = !g.trim(), N = 0;
        if (this.options.pedantic ? (N = 2, c = g.trimStart()) : A ? N = e[1].length + 1 : (N = e[2].search(this.rules.other.nonSpaceChar), N = N > 4 ? 1 : N, c = g.slice(N), N += e[1].length), A && this.rules.other.blankLine.test(_) && (u += _ + `
`, t = t.substring(_.length + 1), a = !0), !a) {
          const Z = this.rules.other.nextBulletRegex(N), re = this.rules.other.hrRegex(N), ie = this.rules.other.fencesBeginRegex(N), M = this.rules.other.headingBeginRegex(N), de = this.rules.other.htmlBeginRegex(N);
          for (; t; ) {
            const we = t.split(`
`, 1)[0];
            let ne;
            if (_ = we, this.options.pedantic ? (_ = _.replace(this.rules.other.listReplaceNesting, "  "), ne = _) : ne = _.replace(this.rules.other.tabCharGlobal, "    "), ie.test(_) || M.test(_) || de.test(_) || Z.test(_) || re.test(_))
              break;
            if (ne.search(this.rules.other.nonSpaceChar) >= N || !_.trim())
              c += `
` + ne.slice(N);
            else {
              if (A || g.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || ie.test(g) || M.test(g) || re.test(g))
                break;
              c += `
` + _;
            }
            !A && !_.trim() && (A = !0), u += we + `
`, t = t.substring(we.length + 1), g = ne.slice(N);
          }
        }
        r.loose || (o ? r.loose = !0 : this.rules.other.doubleBlankLine.test(u) && (o = !0));
        let V = null, te;
        this.options.gfm && (V = this.rules.other.listIsTask.exec(c), V && (te = V[0] !== "[ ] ", c = c.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: u,
          task: !!V,
          checked: te,
          loose: !1,
          text: c,
          tokens: []
        }), r.raw += u;
      }
      const l = r.items.at(-1);
      if (l)
        l.raw = l.raw.trimEnd(), l.text = l.text.trimEnd();
      else
        return;
      r.raw = r.raw.trimEnd();
      for (let a = 0; a < r.items.length; a++)
        if (this.lexer.state.top = !1, r.items[a].tokens = this.lexer.blockTokens(r.items[a].text, []), !r.loose) {
          const u = r.items[a].tokens.filter((g) => g.type === "space"), c = u.length > 0 && u.some((g) => this.rules.other.anyLine.test(g.raw));
          r.loose = c;
        }
      if (r.loose)
        for (let a = 0; a < r.items.length; a++)
          r.items[a].loose = !0;
      return r;
    }
  }
  html(t) {
    const e = this.rules.block.html.exec(t);
    if (e)
      return {
        type: "html",
        block: !0,
        raw: e[0],
        pre: e[1] === "pre" || e[1] === "script" || e[1] === "style",
        text: e[0]
      };
  }
  def(t) {
    const e = this.rules.block.def.exec(t);
    if (e) {
      const n = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), s = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return {
        type: "def",
        tag: n,
        raw: e[0],
        href: s,
        title: r
      };
    }
  }
  table(t) {
    var o;
    const e = this.rules.block.table.exec(t);
    if (!e || !this.rules.other.tableDelimiter.test(e[2]))
      return;
    const n = Pi(e[1]), s = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (o = e[3]) != null && o.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], i = {
      type: "table",
      raw: e[0],
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
        i.rows.push(Pi(l, i.header.length).map((a, u) => ({
          text: a,
          tokens: this.lexer.inline(a),
          header: !1,
          align: i.align[u]
        })));
      return i;
    }
  }
  lheading(t) {
    const e = this.rules.block.lheading.exec(t);
    if (e)
      return {
        type: "heading",
        raw: e[0],
        depth: e[2].charAt(0) === "=" ? 1 : 2,
        text: e[1],
        tokens: this.lexer.inline(e[1])
      };
  }
  paragraph(t) {
    const e = this.rules.block.paragraph.exec(t);
    if (e) {
      const n = e[1].charAt(e[1].length - 1) === `
` ? e[1].slice(0, -1) : e[1];
      return {
        type: "paragraph",
        raw: e[0],
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  text(t) {
    const e = this.rules.block.text.exec(t);
    if (e)
      return {
        type: "text",
        raw: e[0],
        text: e[0],
        tokens: this.lexer.inline(e[0])
      };
  }
  escape(t) {
    const e = this.rules.inline.escape.exec(t);
    if (e)
      return {
        type: "escape",
        raw: e[0],
        text: e[1]
      };
  }
  tag(t) {
    const e = this.rules.inline.tag.exec(t);
    if (e)
      return !this.lexer.state.inLink && this.rules.other.startATag.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(e[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: e[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: e[0]
      };
  }
  link(t) {
    const e = this.rules.inline.link.exec(t);
    if (e) {
      const n = e[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
        if (!this.rules.other.endAngleBracket.test(n))
          return;
        const i = kn(n.slice(0, -1), "\\");
        if ((n.length - i.length) % 2 === 0)
          return;
      } else {
        const i = Uu(e[2], "()");
        if (i === -2)
          return;
        if (i > -1) {
          const l = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + i;
          e[2] = e[2].substring(0, i), e[0] = e[0].substring(0, l).trim(), e[3] = "";
        }
      }
      let s = e[2], r = "";
      if (this.options.pedantic) {
        const i = this.rules.other.pedanticHrefTitle.exec(s);
        i && (s = i[1], r = i[3]);
      } else
        r = e[3] ? e[3].slice(1, -1) : "";
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), Ni(e, {
        href: s && s.replace(this.rules.inline.anyPunctuation, "$1"),
        title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
      }, e[0], this.lexer, this.rules);
    }
  }
  reflink(t, e) {
    let n;
    if ((n = this.rules.inline.reflink.exec(t)) || (n = this.rules.inline.nolink.exec(t))) {
      const s = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), r = e[s.toLowerCase()];
      if (!r) {
        const i = n[0].charAt(0);
        return {
          type: "text",
          raw: i,
          text: i
        };
      }
      return Ni(n, r, n[0], this.lexer, this.rules);
    }
  }
  emStrong(t, e, n = "") {
    let s = this.rules.inline.emStrongLDelim.exec(t);
    if (!s || s[3] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(s[1] || s[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      const i = [...s[0]].length - 1;
      let o, l, a = i, u = 0;
      const c = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (c.lastIndex = 0, e = e.slice(-1 * t.length + i); (s = c.exec(e)) != null; ) {
        if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o) continue;
        if (l = [...o].length, s[3] || s[4]) {
          a += l;
          continue;
        } else if ((s[5] || s[6]) && i % 3 && !((i + l) % 3)) {
          u += l;
          continue;
        }
        if (a -= l, a > 0) continue;
        l = Math.min(l, l + a + u);
        const g = [...s[0]][0].length, _ = t.slice(0, i + s.index + g + l);
        if (Math.min(i, l) % 2) {
          const N = _.slice(1, -1);
          return {
            type: "em",
            raw: _,
            text: N,
            tokens: this.lexer.inlineTokens(N)
          };
        }
        const A = _.slice(2, -2);
        return {
          type: "strong",
          raw: _,
          text: A,
          tokens: this.lexer.inlineTokens(A)
        };
      }
    }
  }
  codespan(t) {
    const e = this.rules.inline.code.exec(t);
    if (e) {
      let n = e[2].replace(this.rules.other.newLineCharGlobal, " ");
      const s = this.rules.other.nonSpaceChar.test(n), r = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return s && r && (n = n.substring(1, n.length - 1)), {
        type: "codespan",
        raw: e[0],
        text: n
      };
    }
  }
  br(t) {
    const e = this.rules.inline.br.exec(t);
    if (e)
      return {
        type: "br",
        raw: e[0]
      };
  }
  del(t) {
    const e = this.rules.inline.del.exec(t);
    if (e)
      return {
        type: "del",
        raw: e[0],
        text: e[2],
        tokens: this.lexer.inlineTokens(e[2])
      };
  }
  autolink(t) {
    const e = this.rules.inline.autolink.exec(t);
    if (e) {
      let n, s;
      return e[2] === "@" ? (n = e[1], s = "mailto:" + n) : (n = e[1], s = n), {
        type: "link",
        raw: e[0],
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
  url(t) {
    var n;
    let e;
    if (e = this.rules.inline.url.exec(t)) {
      let s, r;
      if (e[2] === "@")
        s = e[0], r = "mailto:" + s;
      else {
        let i;
        do
          i = e[0], e[0] = ((n = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : n[0]) ?? "";
        while (i !== e[0]);
        s = e[0], e[1] === "www." ? r = "http://" + e[0] : r = e[0];
      }
      return {
        type: "link",
        raw: e[0],
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
  inlineText(t) {
    const e = this.rules.inline.text.exec(t);
    if (e) {
      const n = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: e[0],
        text: e[0],
        escaped: n
      };
    }
  }
}, Nt = class lr {
  constructor(e) {
    ke(this, "tokens");
    ke(this, "options");
    ke(this, "state");
    ke(this, "tokenizer");
    ke(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || on, this.options.tokenizer = this.options.tokenizer || new ps(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      other: Xe,
      block: $n.normal,
      inline: wn.normal
    };
    this.options.pedantic ? (n.block = $n.pedantic, n.inline = wn.pedantic) : this.options.gfm && (n.block = $n.gfm, this.options.breaks ? n.inline = wn.breaks : n.inline = wn.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: $n,
      inline: wn
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, n) {
    return new lr(n).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, n) {
    return new lr(n).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(Xe.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const s = this.inlineQueue[n];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, n = [], s = !1) {
    var r, i, o;
    for (this.options.pedantic && (e = e.replace(Xe.tabCharGlobal, "    ").replace(Xe.spaceLine, "")); e; ) {
      let l;
      if ((i = (r = this.options.extensions) == null ? void 0 : r.block) != null && i.some((u) => (l = u.call({ lexer: this }, e, n)) ? (e = e.substring(l.raw.length), n.push(l), !0) : !1))
        continue;
      if (l = this.tokenizer.space(e)) {
        e = e.substring(l.raw.length);
        const u = n.at(-1);
        l.raw.length === 1 && u !== void 0 ? u.raw += `
` : n.push(l);
        continue;
      }
      if (l = this.tokenizer.code(e)) {
        e = e.substring(l.raw.length);
        const u = n.at(-1);
        (u == null ? void 0 : u.type) === "paragraph" || (u == null ? void 0 : u.type) === "text" ? (u.raw += `
` + l.raw, u.text += `
` + l.text, this.inlineQueue.at(-1).src = u.text) : n.push(l);
        continue;
      }
      if (l = this.tokenizer.fences(e)) {
        e = e.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.heading(e)) {
        e = e.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.hr(e)) {
        e = e.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.blockquote(e)) {
        e = e.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.list(e)) {
        e = e.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.html(e)) {
        e = e.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.def(e)) {
        e = e.substring(l.raw.length);
        const u = n.at(-1);
        (u == null ? void 0 : u.type) === "paragraph" || (u == null ? void 0 : u.type) === "text" ? (u.raw += `
` + l.raw, u.text += `
` + l.raw, this.inlineQueue.at(-1).src = u.text) : this.tokens.links[l.tag] || (this.tokens.links[l.tag] = {
          href: l.href,
          title: l.title
        });
        continue;
      }
      if (l = this.tokenizer.table(e)) {
        e = e.substring(l.raw.length), n.push(l);
        continue;
      }
      if (l = this.tokenizer.lheading(e)) {
        e = e.substring(l.raw.length), n.push(l);
        continue;
      }
      let a = e;
      if ((o = this.options.extensions) != null && o.startBlock) {
        let u = 1 / 0;
        const c = e.slice(1);
        let g;
        this.options.extensions.startBlock.forEach((_) => {
          g = _.call({ lexer: this }, c), typeof g == "number" && g >= 0 && (u = Math.min(u, g));
        }), u < 1 / 0 && u >= 0 && (a = e.substring(0, u + 1));
      }
      if (this.state.top && (l = this.tokenizer.paragraph(a))) {
        const u = n.at(-1);
        s && (u == null ? void 0 : u.type) === "paragraph" ? (u.raw += `
` + l.raw, u.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = u.text) : n.push(l), s = a.length !== e.length, e = e.substring(l.raw.length);
        continue;
      }
      if (l = this.tokenizer.text(e)) {
        e = e.substring(l.raw.length);
        const u = n.at(-1);
        (u == null ? void 0 : u.type) === "text" ? (u.raw += `
` + l.raw, u.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = u.text) : n.push(l);
        continue;
      }
      if (e) {
        const u = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(u);
          break;
        } else
          throw new Error(u);
      }
    }
    return this.state.top = !0, n;
  }
  inline(e, n = []) {
    return this.inlineQueue.push({ src: e, tokens: n }), n;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(e, n = []) {
    var l, a, u;
    let s = e, r = null;
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
    for (; e; ) {
      i || (o = ""), i = !1;
      let c;
      if ((a = (l = this.options.extensions) == null ? void 0 : l.inline) != null && a.some((_) => (c = _.call({ lexer: this }, e, n)) ? (e = e.substring(c.raw.length), n.push(c), !0) : !1))
        continue;
      if (c = this.tokenizer.escape(e)) {
        e = e.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.tag(e)) {
        e = e.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.link(e)) {
        e = e.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(c.raw.length);
        const _ = n.at(-1);
        c.type === "text" && (_ == null ? void 0 : _.type) === "text" ? (_.raw += c.raw, _.text += c.text) : n.push(c);
        continue;
      }
      if (c = this.tokenizer.emStrong(e, s, o)) {
        e = e.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.codespan(e)) {
        e = e.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.br(e)) {
        e = e.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.del(e)) {
        e = e.substring(c.raw.length), n.push(c);
        continue;
      }
      if (c = this.tokenizer.autolink(e)) {
        e = e.substring(c.raw.length), n.push(c);
        continue;
      }
      if (!this.state.inLink && (c = this.tokenizer.url(e))) {
        e = e.substring(c.raw.length), n.push(c);
        continue;
      }
      let g = e;
      if ((u = this.options.extensions) != null && u.startInline) {
        let _ = 1 / 0;
        const A = e.slice(1);
        let N;
        this.options.extensions.startInline.forEach((V) => {
          N = V.call({ lexer: this }, A), typeof N == "number" && N >= 0 && (_ = Math.min(_, N));
        }), _ < 1 / 0 && _ >= 0 && (g = e.substring(0, _ + 1));
      }
      if (c = this.tokenizer.inlineText(g)) {
        e = e.substring(c.raw.length), c.raw.slice(-1) !== "_" && (o = c.raw.slice(-1)), i = !0;
        const _ = n.at(-1);
        (_ == null ? void 0 : _.type) === "text" ? (_.raw += c.raw, _.text += c.text) : n.push(c);
        continue;
      }
      if (e) {
        const _ = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(_);
          break;
        } else
          throw new Error(_);
      }
    }
    return n;
  }
}, gs = class {
  // set by the parser
  constructor(t) {
    ke(this, "options");
    ke(this, "parser");
    this.options = t || on;
  }
  space(t) {
    return "";
  }
  code({ text: t, lang: e, escaped: n }) {
    var i;
    const s = (i = (e || "").match(Xe.notSpaceStart)) == null ? void 0 : i[0], r = t.replace(Xe.endingNewline, "") + `
`;
    return s ? '<pre><code class="language-' + wt(s) + '">' + (n ? r : wt(r, !0)) + `</code></pre>
` : "<pre><code>" + (n ? r : wt(r, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: t }) {
    return `<blockquote>
${this.parser.parse(t)}</blockquote>
`;
  }
  html({ text: t }) {
    return t;
  }
  heading({ tokens: t, depth: e }) {
    return `<h${e}>${this.parser.parseInline(t)}</h${e}>
`;
  }
  hr(t) {
    return `<hr>
`;
  }
  list(t) {
    const e = t.ordered, n = t.start;
    let s = "";
    for (let o = 0; o < t.items.length; o++) {
      const l = t.items[o];
      s += this.listitem(l);
    }
    const r = e ? "ol" : "ul", i = e && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + r + i + `>
` + s + "</" + r + `>
`;
  }
  listitem(t) {
    var n;
    let e = "";
    if (t.task) {
      const s = this.checkbox({ checked: !!t.checked });
      t.loose ? ((n = t.tokens[0]) == null ? void 0 : n.type) === "paragraph" ? (t.tokens[0].text = s + " " + t.tokens[0].text, t.tokens[0].tokens && t.tokens[0].tokens.length > 0 && t.tokens[0].tokens[0].type === "text" && (t.tokens[0].tokens[0].text = s + " " + wt(t.tokens[0].tokens[0].text), t.tokens[0].tokens[0].escaped = !0)) : t.tokens.unshift({
        type: "text",
        raw: s + " ",
        text: s + " ",
        escaped: !0
      }) : e += s + " ";
    }
    return e += this.parser.parse(t.tokens, !!t.loose), `<li>${e}</li>
`;
  }
  checkbox({ checked: t }) {
    return "<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: t }) {
    return `<p>${this.parser.parseInline(t)}</p>
`;
  }
  table(t) {
    let e = "", n = "";
    for (let r = 0; r < t.header.length; r++)
      n += this.tablecell(t.header[r]);
    e += this.tablerow({ text: n });
    let s = "";
    for (let r = 0; r < t.rows.length; r++) {
      const i = t.rows[r];
      n = "";
      for (let o = 0; o < i.length; o++)
        n += this.tablecell(i[o]);
      s += this.tablerow({ text: n });
    }
    return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + s + `</table>
`;
  }
  tablerow({ text: t }) {
    return `<tr>
${t}</tr>
`;
  }
  tablecell(t) {
    const e = this.parser.parseInline(t.tokens), n = t.header ? "th" : "td";
    return (t.align ? `<${n} align="${t.align}">` : `<${n}>`) + e + `</${n}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens: t }) {
    return `<strong>${this.parser.parseInline(t)}</strong>`;
  }
  em({ tokens: t }) {
    return `<em>${this.parser.parseInline(t)}</em>`;
  }
  codespan({ text: t }) {
    return `<code>${wt(t, !0)}</code>`;
  }
  br(t) {
    return "<br>";
  }
  del({ tokens: t }) {
    return `<del>${this.parser.parseInline(t)}</del>`;
  }
  link({ href: t, title: e, tokens: n }) {
    const s = this.parser.parseInline(n), r = Fi(t);
    if (r === null)
      return s;
    t = r;
    let i = '<a href="' + t + '"';
    return e && (i += ' title="' + wt(e) + '"'), i += ">" + s + "</a>", i;
  }
  image({ href: t, title: e, text: n, tokens: s }) {
    s && (n = this.parser.parseInline(s, this.parser.textRenderer));
    const r = Fi(t);
    if (r === null)
      return wt(n);
    t = r;
    let i = `<img src="${t}" alt="${n}"`;
    return e && (i += ` title="${wt(e)}"`), i += ">", i;
  }
  text(t) {
    return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : wt(t.text);
  }
}, Vr = class {
  // no need for block level renderers
  strong({ text: t }) {
    return t;
  }
  em({ text: t }) {
    return t;
  }
  codespan({ text: t }) {
    return t;
  }
  del({ text: t }) {
    return t;
  }
  html({ text: t }) {
    return t;
  }
  text({ text: t }) {
    return t;
  }
  link({ text: t }) {
    return "" + t;
  }
  image({ text: t }) {
    return "" + t;
  }
  br() {
    return "";
  }
}, Bt = class ar {
  constructor(e) {
    ke(this, "options");
    ke(this, "renderer");
    ke(this, "textRenderer");
    this.options = e || on, this.options.renderer = this.options.renderer || new gs(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Vr();
  }
  /**
   * Static Parse Method
   */
  static parse(e, n) {
    return new ar(n).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, n) {
    return new ar(n).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, n = !0) {
    var r, i;
    let s = "";
    for (let o = 0; o < e.length; o++) {
      const l = e[o];
      if ((i = (r = this.options.extensions) == null ? void 0 : r.renderers) != null && i[l.type]) {
        const u = l, c = this.options.extensions.renderers[u.type].call({ parser: this }, u);
        if (c !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(u.type)) {
          s += c || "";
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
          let u = a, c = this.renderer.text(u);
          for (; o + 1 < e.length && e[o + 1].type === "text"; )
            u = e[++o], c += `
` + this.renderer.text(u);
          n ? s += this.renderer.paragraph({
            type: "paragraph",
            raw: c,
            text: c,
            tokens: [{ type: "text", raw: c, text: c, escaped: !0 }]
          }) : s += c;
          continue;
        }
        default: {
          const u = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent)
            return console.error(u), "";
          throw new Error(u);
        }
      }
    }
    return s;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, n = this.renderer) {
    var r, i;
    let s = "";
    for (let o = 0; o < e.length; o++) {
      const l = e[o];
      if ((i = (r = this.options.extensions) == null ? void 0 : r.renderers) != null && i[l.type]) {
        const u = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (u !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(l.type)) {
          s += u || "";
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
          const u = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent)
            return console.error(u), "";
          throw new Error(u);
        }
      }
    }
    return s;
  }
}, $s, ns = ($s = class {
  constructor(t) {
    ke(this, "options");
    ke(this, "block");
    this.options = t || on;
  }
  /**
   * Process markdown before marked
   */
  preprocess(t) {
    return t;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(t) {
    return t;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(t) {
    return t;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? Nt.lex : Nt.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? Bt.parse : Bt.parseInline;
  }
}, ke($s, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
])), $s), Hu = class {
  constructor(...t) {
    ke(this, "defaults", Fr());
    ke(this, "options", this.setOptions);
    ke(this, "parse", this.parseMarkdown(!0));
    ke(this, "parseInline", this.parseMarkdown(!1));
    ke(this, "Parser", Bt);
    ke(this, "Renderer", gs);
    ke(this, "TextRenderer", Vr);
    ke(this, "Lexer", Nt);
    ke(this, "Tokenizer", ps);
    ke(this, "Hooks", ns);
    this.use(...t);
  }
  /**
   * Run callback for every token
   */
  walkTokens(t, e) {
    var s, r;
    let n = [];
    for (const i of t)
      switch (n = n.concat(e.call(this, i)), i.type) {
        case "table": {
          const o = i;
          for (const l of o.header)
            n = n.concat(this.walkTokens(l.tokens, e));
          for (const l of o.rows)
            for (const a of l)
              n = n.concat(this.walkTokens(a.tokens, e));
          break;
        }
        case "list": {
          const o = i;
          n = n.concat(this.walkTokens(o.items, e));
          break;
        }
        default: {
          const o = i;
          (r = (s = this.defaults.extensions) == null ? void 0 : s.childTokens) != null && r[o.type] ? this.defaults.extensions.childTokens[o.type].forEach((l) => {
            const a = o[l].flat(1 / 0);
            n = n.concat(this.walkTokens(a, e));
          }) : o.tokens && (n = n.concat(this.walkTokens(o.tokens, e)));
        }
      }
    return n;
  }
  use(...t) {
    const e = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return t.forEach((n) => {
      const s = { ...n };
      if (s.async = this.defaults.async || s.async || !1, n.extensions && (n.extensions.forEach((r) => {
        if (!r.name)
          throw new Error("extension name required");
        if ("renderer" in r) {
          const i = e.renderers[r.name];
          i ? e.renderers[r.name] = function(...o) {
            let l = r.renderer.apply(this, o);
            return l === !1 && (l = i.apply(this, o)), l;
          } : e.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const i = e[r.level];
          i ? i.unshift(r.tokenizer) : e[r.level] = [r.tokenizer], r.start && (r.level === "block" ? e.startBlock ? e.startBlock.push(r.start) : e.startBlock = [r.start] : r.level === "inline" && (e.startInline ? e.startInline.push(r.start) : e.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (e.childTokens[r.name] = r.childTokens);
      }), s.extensions = e), n.renderer) {
        const r = this.defaults.renderer || new gs(this.defaults);
        for (const i in n.renderer) {
          if (!(i in r))
            throw new Error(`renderer '${i}' does not exist`);
          if (["options", "parser"].includes(i))
            continue;
          const o = i, l = n.renderer[o], a = r[o];
          r[o] = (...u) => {
            let c = l.apply(r, u);
            return c === !1 && (c = a.apply(r, u)), c || "";
          };
        }
        s.renderer = r;
      }
      if (n.tokenizer) {
        const r = this.defaults.tokenizer || new ps(this.defaults);
        for (const i in n.tokenizer) {
          if (!(i in r))
            throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i))
            continue;
          const o = i, l = n.tokenizer[o], a = r[o];
          r[o] = (...u) => {
            let c = l.apply(r, u);
            return c === !1 && (c = a.apply(r, u)), c;
          };
        }
        s.tokenizer = r;
      }
      if (n.hooks) {
        const r = this.defaults.hooks || new ns();
        for (const i in n.hooks) {
          if (!(i in r))
            throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i))
            continue;
          const o = i, l = n.hooks[o], a = r[o];
          ns.passThroughHooks.has(i) ? r[o] = (u) => {
            if (this.defaults.async)
              return Promise.resolve(l.call(r, u)).then((g) => a.call(r, g));
            const c = l.call(r, u);
            return a.call(r, c);
          } : r[o] = (...u) => {
            let c = l.apply(r, u);
            return c === !1 && (c = a.apply(r, u)), c;
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
  setOptions(t) {
    return this.defaults = { ...this.defaults, ...t }, this;
  }
  lexer(t, e) {
    return Nt.lex(t, e ?? this.defaults);
  }
  parser(t, e) {
    return Bt.parse(t, e ?? this.defaults);
  }
  parseMarkdown(t) {
    return (n, s) => {
      const r = { ...s }, i = { ...this.defaults, ...r }, o = this.onError(!!i.silent, !!i.async);
      if (this.defaults.async === !0 && r.async === !1)
        return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n > "u" || n === null)
        return o(new Error("marked(): input parameter is undefined or null"));
      if (typeof n != "string")
        return o(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
      i.hooks && (i.hooks.options = i, i.hooks.block = t);
      const l = i.hooks ? i.hooks.provideLexer() : t ? Nt.lex : Nt.lexInline, a = i.hooks ? i.hooks.provideParser() : t ? Bt.parse : Bt.parseInline;
      if (i.async)
        return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n).then((u) => l(u, i)).then((u) => i.hooks ? i.hooks.processAllTokens(u) : u).then((u) => i.walkTokens ? Promise.all(this.walkTokens(u, i.walkTokens)).then(() => u) : u).then((u) => a(u, i)).then((u) => i.hooks ? i.hooks.postprocess(u) : u).catch(o);
      try {
        i.hooks && (n = i.hooks.preprocess(n));
        let u = l(n, i);
        i.hooks && (u = i.hooks.processAllTokens(u)), i.walkTokens && this.walkTokens(u, i.walkTokens);
        let c = a(u, i);
        return i.hooks && (c = i.hooks.postprocess(c)), c;
      } catch (u) {
        return o(u);
      }
    };
  }
  onError(t, e) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, t) {
        const s = "<p>An error occurred:</p><pre>" + wt(n.message + "", !0) + "</pre>";
        return e ? Promise.resolve(s) : s;
      }
      if (e)
        return Promise.reject(n);
      throw n;
    };
  }
}, rn = new Hu();
function fe(t, e) {
  return rn.parse(t, e);
}
fe.options = fe.setOptions = function(t) {
  return rn.setOptions(t), fe.defaults = rn.defaults, Ko(fe.defaults), fe;
};
fe.getDefaults = Fr;
fe.defaults = on;
fe.use = function(...t) {
  return rn.use(...t), fe.defaults = rn.defaults, Ko(fe.defaults), fe;
};
fe.walkTokens = function(t, e) {
  return rn.walkTokens(t, e);
};
fe.parseInline = rn.parseInline;
fe.Parser = Bt;
fe.parser = Bt.parse;
fe.Renderer = gs;
fe.TextRenderer = Vr;
fe.Lexer = Nt;
fe.lexer = Nt.lex;
fe.Tokenizer = ps;
fe.Hooks = ns;
fe.parse = fe;
fe.options;
fe.setOptions;
fe.use;
fe.walkTokens;
fe.parseInline;
Bt.parse;
Nt.lex;
const ms = {
  API_URL: "http://localhost:8000/api/v1",
  WS_URL: "ws://localhost:8000"
};
function ju(t) {
  const e = Be(() => ({
    backgroundColor: t.value.chat_background_color || "#ffffff",
    color: Vt(t.value.chat_background_color || "#ffffff") ? "#ffffff" : "#000000"
  })), n = Be(() => ({
    backgroundColor: t.value.chat_bubble_color || "#f34611",
    color: Vt(t.value.chat_bubble_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), s = Be(() => {
    const u = t.value.chat_background_color || "#F8F9FA", c = iu(u, 20);
    return {
      backgroundColor: c,
      color: Vt(c) ? "#FFFFFF" : "#000000"
    };
  }), r = Be(() => ({
    backgroundColor: t.value.accent_color || "#f34611",
    color: Vt(t.value.accent_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), i = Be(() => ({
    color: Vt(t.value.chat_background_color || "#F8F9FA") ? "#FFFFFF" : "#000000"
  })), o = Be(() => ({
    borderBottom: `1px solid ${Vt(t.value.chat_background_color || "#F8F9FA") ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`
  })), l = Be(() => t.value.photo_url ? t.value.photo_url.includes("amazonaws.com") ? t.value.photo_url : `${ms.API_URL}${t.value.photo_url}` : ""), a = Be(() => {
    const u = t.value.chat_background_color || "#ffffff";
    return {
      boxShadow: `0 8px 5px ${Vt(u) ? "rgba(0, 0, 0, 0.24)" : "rgba(0, 0, 0, 0.12)"}`
    };
  });
  return {
    chatStyles: e,
    chatIconStyles: n,
    agentBubbleStyles: s,
    userBubbleStyles: r,
    messageNameStyles: i,
    headerBorderStyles: o,
    photoUrl: l,
    shadowStyle: a
  };
}
const At = /* @__PURE__ */ Object.create(null);
At.open = "0";
At.close = "1";
At.ping = "2";
At.pong = "3";
At.message = "4";
At.upgrade = "5";
At.noop = "6";
const ss = /* @__PURE__ */ Object.create(null);
Object.keys(At).forEach((t) => {
  ss[At[t]] = t;
});
const cr = { type: "error", data: "parser error" }, sl = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", rl = typeof ArrayBuffer == "function", il = (t) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t && t.buffer instanceof ArrayBuffer, Hr = ({ type: t, data: e }, n, s) => sl && e instanceof Blob ? n ? s(e) : Bi(e, s) : rl && (e instanceof ArrayBuffer || il(e)) ? n ? s(e) : Bi(new Blob([e]), s) : s(At[t] + (e || "")), Bi = (t, e) => {
  const n = new FileReader();
  return n.onload = function() {
    const s = n.result.split(",")[1];
    e("b" + (s || ""));
  }, n.readAsDataURL(t);
};
function Di(t) {
  return t instanceof Uint8Array ? t : t instanceof ArrayBuffer ? new Uint8Array(t) : new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
}
let js;
function Wu(t, e) {
  if (sl && t.data instanceof Blob)
    return t.data.arrayBuffer().then(Di).then(e);
  if (rl && (t.data instanceof ArrayBuffer || il(t.data)))
    return e(Di(t.data));
  Hr(t, !1, (n) => {
    js || (js = new TextEncoder()), e(js.encode(n));
  });
}
const Mi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Cn = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let t = 0; t < Mi.length; t++)
  Cn[Mi.charCodeAt(t)] = t;
const zu = (t) => {
  let e = t.length * 0.75, n = t.length, s, r = 0, i, o, l, a;
  t[t.length - 1] === "=" && (e--, t[t.length - 2] === "=" && e--);
  const u = new ArrayBuffer(e), c = new Uint8Array(u);
  for (s = 0; s < n; s += 4)
    i = Cn[t.charCodeAt(s)], o = Cn[t.charCodeAt(s + 1)], l = Cn[t.charCodeAt(s + 2)], a = Cn[t.charCodeAt(s + 3)], c[r++] = i << 2 | o >> 4, c[r++] = (o & 15) << 4 | l >> 2, c[r++] = (l & 3) << 6 | a & 63;
  return u;
}, Ku = typeof ArrayBuffer == "function", jr = (t, e) => {
  if (typeof t != "string")
    return {
      type: "message",
      data: ol(t, e)
    };
  const n = t.charAt(0);
  return n === "b" ? {
    type: "message",
    data: $u(t.substring(1), e)
  } : ss[n] ? t.length > 1 ? {
    type: ss[n],
    data: t.substring(1)
  } : {
    type: ss[n]
  } : cr;
}, $u = (t, e) => {
  if (Ku) {
    const n = zu(t);
    return ol(n, e);
  } else
    return { base64: !0, data: t };
}, ol = (t, e) => {
  switch (e) {
    case "blob":
      return t instanceof Blob ? t : new Blob([t]);
    case "arraybuffer":
    default:
      return t instanceof ArrayBuffer ? t : t.buffer;
  }
}, ll = "", Zu = (t, e) => {
  const n = t.length, s = new Array(n);
  let r = 0;
  t.forEach((i, o) => {
    Hr(i, !1, (l) => {
      s[o] = l, ++r === n && e(s.join(ll));
    });
  });
}, Gu = (t, e) => {
  const n = t.split(ll), s = [];
  for (let r = 0; r < n.length; r++) {
    const i = jr(n[r], e);
    if (s.push(i), i.type === "error")
      break;
  }
  return s;
};
function Yu() {
  return new TransformStream({
    transform(t, e) {
      Wu(t, (n) => {
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
        t.data && typeof t.data != "string" && (r[0] |= 128), e.enqueue(r), e.enqueue(n);
      });
    }
  });
}
let Ws;
function Zn(t) {
  return t.reduce((e, n) => e + n.length, 0);
}
function Gn(t, e) {
  if (t[0].length === e)
    return t.shift();
  const n = new Uint8Array(e);
  let s = 0;
  for (let r = 0; r < e; r++)
    n[r] = t[0][s++], s === t[0].length && (t.shift(), s = 0);
  return t.length && s < t[0].length && (t[0] = t[0].slice(s)), n;
}
function Ju(t, e) {
  Ws || (Ws = new TextDecoder());
  const n = [];
  let s = 0, r = -1, i = !1;
  return new TransformStream({
    transform(o, l) {
      for (n.push(o); ; ) {
        if (s === 0) {
          if (Zn(n) < 1)
            break;
          const a = Gn(n, 1);
          i = (a[0] & 128) === 128, r = a[0] & 127, r < 126 ? s = 3 : r === 126 ? s = 1 : s = 2;
        } else if (s === 1) {
          if (Zn(n) < 2)
            break;
          const a = Gn(n, 2);
          r = new DataView(a.buffer, a.byteOffset, a.length).getUint16(0), s = 3;
        } else if (s === 2) {
          if (Zn(n) < 8)
            break;
          const a = Gn(n, 8), u = new DataView(a.buffer, a.byteOffset, a.length), c = u.getUint32(0);
          if (c > Math.pow(2, 21) - 1) {
            l.enqueue(cr);
            break;
          }
          r = c * Math.pow(2, 32) + u.getUint32(4), s = 3;
        } else {
          if (Zn(n) < r)
            break;
          const a = Gn(n, r);
          l.enqueue(jr(i ? a : Ws.decode(a), e)), s = 0;
        }
        if (r === 0 || r > t) {
          l.enqueue(cr);
          break;
        }
      }
    }
  });
}
const al = 4;
function De(t) {
  if (t) return Qu(t);
}
function Qu(t) {
  for (var e in De.prototype)
    t[e] = De.prototype[e];
  return t;
}
De.prototype.on = De.prototype.addEventListener = function(t, e) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
};
De.prototype.once = function(t, e) {
  function n() {
    this.off(t, n), e.apply(this, arguments);
  }
  return n.fn = e, this.on(t, n), this;
};
De.prototype.off = De.prototype.removeListener = De.prototype.removeAllListeners = De.prototype.removeEventListener = function(t, e) {
  if (this._callbacks = this._callbacks || {}, arguments.length == 0)
    return this._callbacks = {}, this;
  var n = this._callbacks["$" + t];
  if (!n) return this;
  if (arguments.length == 1)
    return delete this._callbacks["$" + t], this;
  for (var s, r = 0; r < n.length; r++)
    if (s = n[r], s === e || s.fn === e) {
      n.splice(r, 1);
      break;
    }
  return n.length === 0 && delete this._callbacks["$" + t], this;
};
De.prototype.emit = function(t) {
  this._callbacks = this._callbacks || {};
  for (var e = new Array(arguments.length - 1), n = this._callbacks["$" + t], s = 1; s < arguments.length; s++)
    e[s - 1] = arguments[s];
  if (n) {
    n = n.slice(0);
    for (var s = 0, r = n.length; s < r; ++s)
      n[s].apply(this, e);
  }
  return this;
};
De.prototype.emitReserved = De.prototype.emit;
De.prototype.listeners = function(t) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
};
De.prototype.hasListeners = function(t) {
  return !!this.listeners(t).length;
};
const Rs = typeof Promise == "function" && typeof Promise.resolve == "function" ? (e) => Promise.resolve().then(e) : (e, n) => n(e, 0), ct = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), Xu = "arraybuffer";
function cl(t, ...e) {
  return e.reduce((n, s) => (t.hasOwnProperty(s) && (n[s] = t[s]), n), {});
}
const eh = ct.setTimeout, th = ct.clearTimeout;
function Is(t, e) {
  e.useNativeTimers ? (t.setTimeoutFn = eh.bind(ct), t.clearTimeoutFn = th.bind(ct)) : (t.setTimeoutFn = ct.setTimeout.bind(ct), t.clearTimeoutFn = ct.clearTimeout.bind(ct));
}
const nh = 1.33;
function sh(t) {
  return typeof t == "string" ? rh(t) : Math.ceil((t.byteLength || t.size) * nh);
}
function rh(t) {
  let e = 0, n = 0;
  for (let s = 0, r = t.length; s < r; s++)
    e = t.charCodeAt(s), e < 128 ? n += 1 : e < 2048 ? n += 2 : e < 55296 || e >= 57344 ? n += 3 : (s++, n += 4);
  return n;
}
function ul() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function ih(t) {
  let e = "";
  for (let n in t)
    t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
  return e;
}
function oh(t) {
  let e = {}, n = t.split("&");
  for (let s = 0, r = n.length; s < r; s++) {
    let i = n[s].split("=");
    e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
  }
  return e;
}
class lh extends Error {
  constructor(e, n, s) {
    super(e), this.description = n, this.context = s, this.type = "TransportError";
  }
}
class Wr extends De {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(e) {
    super(), this.writable = !1, Is(this, e), this.opts = e, this.query = e.query, this.socket = e.socket, this.supportsBinary = !e.forceBase64;
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
  onError(e, n, s) {
    return super.emitReserved("error", new lh(e, n, s)), this;
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
  send(e) {
    this.readyState === "open" && this.write(e);
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
  onData(e) {
    const n = jr(e, this.socket.binaryType);
    this.onPacket(n);
  }
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  onPacket(e) {
    super.emitReserved("packet", e);
  }
  /**
   * Called upon close.
   *
   * @protected
   */
  onClose(e) {
    this.readyState = "closed", super.emitReserved("close", e);
  }
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(e) {
  }
  createUri(e, n = {}) {
    return e + "://" + this._hostname() + this._port() + this.opts.path + this._query(n);
  }
  _hostname() {
    const e = this.opts.hostname;
    return e.indexOf(":") === -1 ? e : "[" + e + "]";
  }
  _port() {
    return this.opts.port && (this.opts.secure && +(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80) ? ":" + this.opts.port : "";
  }
  _query(e) {
    const n = ih(e);
    return n.length ? "?" + n : "";
  }
}
class ah extends Wr {
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
  pause(e) {
    this.readyState = "pausing";
    const n = () => {
      this.readyState = "paused", e();
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
  onData(e) {
    const n = (s) => {
      if (this.readyState === "opening" && s.type === "open" && this.onOpen(), s.type === "close")
        return this.onClose({ description: "transport closed by the server" }), !1;
      this.onPacket(s);
    };
    Gu(e, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
  }
  /**
   * For polling, send a close packet.
   *
   * @protected
   */
  doClose() {
    const e = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? e() : this.once("open", e);
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} packets - data packets
   * @protected
   */
  write(e) {
    this.writable = !1, Zu(e, (n) => {
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
    const e = this.opts.secure ? "https" : "http", n = this.query || {};
    return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = ul()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(e, n);
  }
}
let hl = !1;
try {
  hl = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const ch = hl;
function uh() {
}
class hh extends ah {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @package
   */
  constructor(e) {
    if (super(e), typeof location < "u") {
      const n = location.protocol === "https:";
      let s = location.port;
      s || (s = n ? "443" : "80"), this.xd = typeof location < "u" && e.hostname !== location.hostname || s !== e.port;
    }
  }
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @private
   */
  doWrite(e, n) {
    const s = this.request({
      method: "POST",
      data: e
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
    const e = this.request();
    e.on("data", this.onData.bind(this)), e.on("error", (n, s) => {
      this.onError("xhr poll error", n, s);
    }), this.pollXhr = e;
  }
}
class Tt extends De {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(e, n, s) {
    super(), this.createRequest = e, Is(this, s), this._opts = s, this._method = s.method || "GET", this._uri = n, this._data = s.data !== void 0 ? s.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var e;
    const n = cl(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
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
      (e = this._opts.cookieJar) === null || e === void 0 || e.addCookies(s), "withCredentials" in s && (s.withCredentials = this._opts.withCredentials), this._opts.requestTimeout && (s.timeout = this._opts.requestTimeout), s.onreadystatechange = () => {
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
    typeof document < "u" && (this._index = Tt.requestsCount++, Tt.requests[this._index] = this);
  }
  /**
   * Called upon error.
   *
   * @private
   */
  _onError(e) {
    this.emitReserved("error", e, this._xhr), this._cleanup(!0);
  }
  /**
   * Cleans up house.
   *
   * @private
   */
  _cleanup(e) {
    if (!(typeof this._xhr > "u" || this._xhr === null)) {
      if (this._xhr.onreadystatechange = uh, e)
        try {
          this._xhr.abort();
        } catch {
        }
      typeof document < "u" && delete Tt.requests[this._index], this._xhr = null;
    }
  }
  /**
   * Called upon load.
   *
   * @private
   */
  _onLoad() {
    const e = this._xhr.responseText;
    e !== null && (this.emitReserved("data", e), this.emitReserved("success"), this._cleanup());
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
Tt.requestsCount = 0;
Tt.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", qi);
  else if (typeof addEventListener == "function") {
    const t = "onpagehide" in ct ? "pagehide" : "unload";
    addEventListener(t, qi, !1);
  }
}
function qi() {
  for (let t in Tt.requests)
    Tt.requests.hasOwnProperty(t) && Tt.requests[t].abort();
}
const fh = function() {
  const t = fl({
    xdomain: !1
  });
  return t && t.responseType !== null;
}();
class dh extends hh {
  constructor(e) {
    super(e);
    const n = e && e.forceBase64;
    this.supportsBinary = fh && !n;
  }
  request(e = {}) {
    return Object.assign(e, { xd: this.xd }, this.opts), new Tt(fl, this.uri(), e);
  }
}
function fl(t) {
  const e = t.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!e || ch))
      return new XMLHttpRequest();
  } catch {
  }
  if (!e)
    try {
      return new ct[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const dl = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class ph extends Wr {
  get name() {
    return "websocket";
  }
  doOpen() {
    const e = this.uri(), n = this.opts.protocols, s = dl ? {} : cl(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    this.opts.extraHeaders && (s.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(e, n, s);
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
    }, this.ws.onclose = (e) => this.onClose({
      description: "websocket connection closed",
      context: e
    }), this.ws.onmessage = (e) => this.onData(e.data), this.ws.onerror = (e) => this.onError("websocket error", e);
  }
  write(e) {
    this.writable = !1;
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = n === e.length - 1;
      Hr(s, this.supportsBinary, (i) => {
        try {
          this.doWrite(s, i);
        } catch {
        }
        r && Rs(() => {
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
    const e = this.opts.secure ? "wss" : "ws", n = this.query || {};
    return this.opts.timestampRequests && (n[this.opts.timestampParam] = ul()), this.supportsBinary || (n.b64 = 1), this.createUri(e, n);
  }
}
const zs = ct.WebSocket || ct.MozWebSocket;
class gh extends ph {
  createSocket(e, n, s) {
    return dl ? new zs(e, n, s) : n ? new zs(e, n) : new zs(e);
  }
  doWrite(e, n) {
    this.ws.send(n);
  }
}
class mh extends Wr {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
    } catch (e) {
      return this.emitReserved("error", e);
    }
    this._transport.closed.then(() => {
      this.onClose();
    }).catch((e) => {
      this.onError("webtransport error", e);
    }), this._transport.ready.then(() => {
      this._transport.createBidirectionalStream().then((e) => {
        const n = Ju(Number.MAX_SAFE_INTEGER, this.socket.binaryType), s = e.readable.pipeThrough(n).getReader(), r = Yu();
        r.readable.pipeTo(e.writable), this._writer = r.writable.getWriter();
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
  write(e) {
    this.writable = !1;
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = n === e.length - 1;
      this._writer.write(s).then(() => {
        r && Rs(() => {
          this.writable = !0, this.emitReserved("drain");
        }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var e;
    (e = this._transport) === null || e === void 0 || e.close();
  }
}
const _h = {
  websocket: gh,
  webtransport: mh,
  polling: dh
}, yh = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, bh = [
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
function ur(t) {
  if (t.length > 8e3)
    throw "URI too long";
  const e = t, n = t.indexOf("["), s = t.indexOf("]");
  n != -1 && s != -1 && (t = t.substring(0, n) + t.substring(n, s).replace(/:/g, ";") + t.substring(s, t.length));
  let r = yh.exec(t || ""), i = {}, o = 14;
  for (; o--; )
    i[bh[o]] = r[o] || "";
  return n != -1 && s != -1 && (i.source = e, i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"), i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), i.ipv6uri = !0), i.pathNames = vh(i, i.path), i.queryKey = wh(i, i.query), i;
}
function vh(t, e) {
  const n = /\/{2,9}/g, s = e.replace(n, "/").split("/");
  return (e.slice(0, 1) == "/" || e.length === 0) && s.splice(0, 1), e.slice(-1) == "/" && s.splice(s.length - 1, 1), s;
}
function wh(t, e) {
  const n = {};
  return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, r, i) {
    r && (n[r] = i);
  }), n;
}
const hr = typeof addEventListener == "function" && typeof removeEventListener == "function", rs = [];
hr && addEventListener("offline", () => {
  rs.forEach((t) => t());
}, !1);
class zt extends De {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(e, n) {
    if (super(), this.binaryType = Xu, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, e && typeof e == "object" && (n = e, e = null), e) {
      const s = ur(e);
      n.hostname = s.host, n.secure = s.protocol === "https" || s.protocol === "wss", n.port = s.port, s.query && (n.query = s.query);
    } else n.host && (n.hostname = ur(n.host).host);
    Is(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((s) => {
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
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = oh(this.opts.query)), hr && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, rs.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  createTransport(e) {
    const n = Object.assign({}, this.opts.query);
    n.EIO = al, n.transport = e, this.id && (n.sid = this.id);
    const s = Object.assign({}, this.opts, {
      query: n,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[e]);
    return new this._transportsByName[e](s);
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
    const e = this.opts.rememberUpgrade && zt.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
    this.readyState = "opening";
    const n = this.createTransport(e);
    n.open(), this.setTransport(n);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  setTransport(e) {
    this.transport && this.transport.removeAllListeners(), this.transport = e, e.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (n) => this._onClose("transport close", n));
  }
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  onOpen() {
    this.readyState = "open", zt.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
  }
  /**
   * Handles a packet.
   *
   * @private
   */
  _onPacket(e) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing")
      switch (this.emitReserved("packet", e), this.emitReserved("heartbeat"), e.type) {
        case "open":
          this.onHandshake(JSON.parse(e.data));
          break;
        case "ping":
          this._sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong"), this._resetPingTimeout();
          break;
        case "error":
          const n = new Error("server error");
          n.code = e.data, this._onError(n);
          break;
        case "message":
          this.emitReserved("data", e.data), this.emitReserved("message", e.data);
          break;
      }
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  onHandshake(e) {
    this.emitReserved("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this._pingInterval = e.pingInterval, this._pingTimeout = e.pingTimeout, this._maxPayload = e.maxPayload, this.onOpen(), this.readyState !== "closed" && this._resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const e = this._pingInterval + this._pingTimeout;
    this._pingTimeoutTime = Date.now() + e, this._pingTimeoutTimer = this.setTimeoutFn(() => {
      this._onClose("ping timeout");
    }, e), this.opts.autoUnref && this._pingTimeoutTimer.unref();
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
      const e = this._getWritablePackets();
      this.transport.send(e), this._prevBufferLen = e.length, this.emitReserved("flush");
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
      if (r && (n += sh(r)), s > 0 && n > this._maxPayload)
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
    const e = Date.now() > this._pingTimeoutTime;
    return e && (this._pingTimeoutTime = 0, Rs(() => {
      this._onClose("ping timeout");
    }, this.setTimeoutFn)), e;
  }
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  write(e, n, s) {
    return this._sendPacket("message", e, n, s), this;
  }
  /**
   * Sends a message. Alias of {@link Socket#write}.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  send(e, n, s) {
    return this._sendPacket("message", e, n, s), this;
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
  _sendPacket(e, n, s, r) {
    if (typeof n == "function" && (r = n, n = void 0), typeof s == "function" && (r = s, s = null), this.readyState === "closing" || this.readyState === "closed")
      return;
    s = s || {}, s.compress = s.compress !== !1;
    const i = {
      type: e,
      data: n,
      options: s
    };
    this.emitReserved("packetCreate", i), this.writeBuffer.push(i), r && this.once("flush", r), this.flush();
  }
  /**
   * Closes the connection.
   */
  close() {
    const e = () => {
      this._onClose("forced close"), this.transport.close();
    }, n = () => {
      this.off("upgrade", n), this.off("upgradeError", n), e();
    }, s = () => {
      this.once("upgrade", n), this.once("upgradeError", n);
    };
    return (this.readyState === "opening" || this.readyState === "open") && (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", () => {
      this.upgrading ? s() : e();
    }) : this.upgrading ? s() : e()), this;
  }
  /**
   * Called upon transport error
   *
   * @private
   */
  _onError(e) {
    if (zt.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
      return this.transports.shift(), this._open();
    this.emitReserved("error", e), this._onClose("transport error", e);
  }
  /**
   * Called upon transport close.
   *
   * @private
   */
  _onClose(e, n) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), hr && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const s = rs.indexOf(this._offlineEventListener);
        s !== -1 && rs.splice(s, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", e, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
zt.protocol = al;
class kh extends zt {
  constructor() {
    super(...arguments), this._upgrades = [];
  }
  onOpen() {
    if (super.onOpen(), this.readyState === "open" && this.opts.upgrade)
      for (let e = 0; e < this._upgrades.length; e++)
        this._probe(this._upgrades[e]);
  }
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  _probe(e) {
    let n = this.createTransport(e), s = !1;
    zt.priorWebsocketSuccess = !1;
    const r = () => {
      s || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (g) => {
        if (!s)
          if (g.type === "pong" && g.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", n), !n)
              return;
            zt.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
              s || this.readyState !== "closed" && (c(), this.setTransport(n), n.send([{ type: "upgrade" }]), this.emitReserved("upgrade", n), n = null, this.upgrading = !1, this.flush());
            });
          } else {
            const _ = new Error("probe error");
            _.transport = n.name, this.emitReserved("upgradeError", _);
          }
      }));
    };
    function i() {
      s || (s = !0, c(), n.close(), n = null);
    }
    const o = (g) => {
      const _ = new Error("probe error: " + g);
      _.transport = n.name, i(), this.emitReserved("upgradeError", _);
    };
    function l() {
      o("transport closed");
    }
    function a() {
      o("socket closed");
    }
    function u(g) {
      n && g.name !== n.name && i();
    }
    const c = () => {
      n.removeListener("open", r), n.removeListener("error", o), n.removeListener("close", l), this.off("close", a), this.off("upgrading", u);
    };
    n.once("open", r), n.once("error", o), n.once("close", l), this.once("close", a), this.once("upgrading", u), this._upgrades.indexOf("webtransport") !== -1 && e !== "webtransport" ? this.setTimeoutFn(() => {
      s || n.open();
    }, 200) : n.open();
  }
  onHandshake(e) {
    this._upgrades = this._filterUpgrades(e.upgrades), super.onHandshake(e);
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  _filterUpgrades(e) {
    const n = [];
    for (let s = 0; s < e.length; s++)
      ~this.transports.indexOf(e[s]) && n.push(e[s]);
    return n;
  }
}
let xh = class extends kh {
  constructor(e, n = {}) {
    const s = typeof e == "object" ? e : n;
    (!s.transports || s.transports && typeof s.transports[0] == "string") && (s.transports = (s.transports || ["polling", "websocket", "webtransport"]).map((r) => _h[r]).filter((r) => !!r)), super(e, s);
  }
};
function Sh(t, e = "", n) {
  let s = t;
  n = n || typeof location < "u" && location, t == null && (t = n.protocol + "//" + n.host), typeof t == "string" && (t.charAt(0) === "/" && (t.charAt(1) === "/" ? t = n.protocol + t : t = n.host + t), /^(https?|wss?):\/\//.test(t) || (typeof n < "u" ? t = n.protocol + "//" + t : t = "https://" + t), s = ur(t)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
  const i = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return s.id = s.protocol + "://" + i + ":" + s.port + e, s.href = s.protocol + "://" + i + (n && n.port === s.port ? "" : ":" + s.port), s;
}
const Ch = typeof ArrayBuffer == "function", Th = (t) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer, pl = Object.prototype.toString, Eh = typeof Blob == "function" || typeof Blob < "u" && pl.call(Blob) === "[object BlobConstructor]", Ah = typeof File == "function" || typeof File < "u" && pl.call(File) === "[object FileConstructor]";
function zr(t) {
  return Ch && (t instanceof ArrayBuffer || Th(t)) || Eh && t instanceof Blob || Ah && t instanceof File;
}
function is(t, e) {
  if (!t || typeof t != "object")
    return !1;
  if (Array.isArray(t)) {
    for (let n = 0, s = t.length; n < s; n++)
      if (is(t[n]))
        return !0;
    return !1;
  }
  if (zr(t))
    return !0;
  if (t.toJSON && typeof t.toJSON == "function" && arguments.length === 1)
    return is(t.toJSON(), !0);
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n) && is(t[n]))
      return !0;
  return !1;
}
function Rh(t) {
  const e = [], n = t.data, s = t;
  return s.data = fr(n, e), s.attachments = e.length, { packet: s, buffers: e };
}
function fr(t, e) {
  if (!t)
    return t;
  if (zr(t)) {
    const n = { _placeholder: !0, num: e.length };
    return e.push(t), n;
  } else if (Array.isArray(t)) {
    const n = new Array(t.length);
    for (let s = 0; s < t.length; s++)
      n[s] = fr(t[s], e);
    return n;
  } else if (typeof t == "object" && !(t instanceof Date)) {
    const n = {};
    for (const s in t)
      Object.prototype.hasOwnProperty.call(t, s) && (n[s] = fr(t[s], e));
    return n;
  }
  return t;
}
function Ih(t, e) {
  return t.data = dr(t.data, e), delete t.attachments, t;
}
function dr(t, e) {
  if (!t)
    return t;
  if (t && t._placeholder === !0) {
    if (typeof t.num == "number" && t.num >= 0 && t.num < e.length)
      return e[t.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(t))
    for (let n = 0; n < t.length; n++)
      t[n] = dr(t[n], e);
  else if (typeof t == "object")
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (t[n] = dr(t[n], e));
  return t;
}
const Oh = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], Lh = 5;
var ce;
(function(t) {
  t[t.CONNECT = 0] = "CONNECT", t[t.DISCONNECT = 1] = "DISCONNECT", t[t.EVENT = 2] = "EVENT", t[t.ACK = 3] = "ACK", t[t.CONNECT_ERROR = 4] = "CONNECT_ERROR", t[t.BINARY_EVENT = 5] = "BINARY_EVENT", t[t.BINARY_ACK = 6] = "BINARY_ACK";
})(ce || (ce = {}));
class Fh {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(e) {
    this.replacer = e;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(e) {
    return (e.type === ce.EVENT || e.type === ce.ACK) && is(e) ? this.encodeAsBinary({
      type: e.type === ce.EVENT ? ce.BINARY_EVENT : ce.BINARY_ACK,
      nsp: e.nsp,
      data: e.data,
      id: e.id
    }) : [this.encodeAsString(e)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(e) {
    let n = "" + e.type;
    return (e.type === ce.BINARY_EVENT || e.type === ce.BINARY_ACK) && (n += e.attachments + "-"), e.nsp && e.nsp !== "/" && (n += e.nsp + ","), e.id != null && (n += e.id), e.data != null && (n += JSON.stringify(e.data, this.replacer)), n;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(e) {
    const n = Rh(e), s = this.encodeAsString(n.packet), r = n.buffers;
    return r.unshift(s), r;
  }
}
function Ui(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
class Kr extends De {
  /**
   * Decoder constructor
   *
   * @param {function} reviver - custom reviver to pass down to JSON.stringify
   */
  constructor(e) {
    super(), this.reviver = e;
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(e) {
    let n;
    if (typeof e == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      n = this.decodeString(e);
      const s = n.type === ce.BINARY_EVENT;
      s || n.type === ce.BINARY_ACK ? (n.type = s ? ce.EVENT : ce.ACK, this.reconstructor = new Ph(n), n.attachments === 0 && super.emitReserved("decoded", n)) : super.emitReserved("decoded", n);
    } else if (zr(e) || e.base64)
      if (this.reconstructor)
        n = this.reconstructor.takeBinaryData(e), n && (this.reconstructor = null, super.emitReserved("decoded", n));
      else
        throw new Error("got binary data when not reconstructing a packet");
    else
      throw new Error("Unknown type: " + e);
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(e) {
    let n = 0;
    const s = {
      type: Number(e.charAt(0))
    };
    if (ce[s.type] === void 0)
      throw new Error("unknown packet type " + s.type);
    if (s.type === ce.BINARY_EVENT || s.type === ce.BINARY_ACK) {
      const i = n + 1;
      for (; e.charAt(++n) !== "-" && n != e.length; )
        ;
      const o = e.substring(i, n);
      if (o != Number(o) || e.charAt(n) !== "-")
        throw new Error("Illegal attachments");
      s.attachments = Number(o);
    }
    if (e.charAt(n + 1) === "/") {
      const i = n + 1;
      for (; ++n && !(e.charAt(n) === "," || n === e.length); )
        ;
      s.nsp = e.substring(i, n);
    } else
      s.nsp = "/";
    const r = e.charAt(n + 1);
    if (r !== "" && Number(r) == r) {
      const i = n + 1;
      for (; ++n; ) {
        const o = e.charAt(n);
        if (o == null || Number(o) != o) {
          --n;
          break;
        }
        if (n === e.length)
          break;
      }
      s.id = Number(e.substring(i, n + 1));
    }
    if (e.charAt(++n)) {
      const i = this.tryParse(e.substr(n));
      if (Kr.isPayloadValid(s.type, i))
        s.data = i;
      else
        throw new Error("invalid payload");
    }
    return s;
  }
  tryParse(e) {
    try {
      return JSON.parse(e, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(e, n) {
    switch (e) {
      case ce.CONNECT:
        return Ui(n);
      case ce.DISCONNECT:
        return n === void 0;
      case ce.CONNECT_ERROR:
        return typeof n == "string" || Ui(n);
      case ce.EVENT:
      case ce.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && Oh.indexOf(n[0]) === -1);
      case ce.ACK:
      case ce.BINARY_ACK:
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
class Ph {
  constructor(e) {
    this.packet = e, this.buffers = [], this.reconPack = e;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(e) {
    if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {
      const n = Ih(this.reconPack, this.buffers);
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
const Nh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Kr,
  Encoder: Fh,
  get PacketType() {
    return ce;
  },
  protocol: Lh
}, Symbol.toStringTag, { value: "Module" }));
function pt(t, e, n) {
  return t.on(e, n), function() {
    t.off(e, n);
  };
}
const Bh = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class gl extends De {
  /**
   * `Socket` constructor.
   */
  constructor(e, n, s) {
    super(), this.connected = !1, this.recovered = !1, this.receiveBuffer = [], this.sendBuffer = [], this._queue = [], this._queueSeq = 0, this.ids = 0, this.acks = {}, this.flags = {}, this.io = e, this.nsp = n, s && s.auth && (this.auth = s.auth), this._opts = Object.assign({}, s), this.io._autoConnect && this.open();
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
    const e = this.io;
    this.subs = [
      pt(e, "open", this.onopen.bind(this)),
      pt(e, "packet", this.onpacket.bind(this)),
      pt(e, "error", this.onerror.bind(this)),
      pt(e, "close", this.onclose.bind(this))
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
  send(...e) {
    return e.unshift("message"), this.emit.apply(this, e), this;
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
  emit(e, ...n) {
    var s, r, i;
    if (Bh.hasOwnProperty(e))
      throw new Error('"' + e.toString() + '" is a reserved event name');
    if (n.unshift(e), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const o = {
      type: ce.EVENT,
      data: n
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
      const c = this.ids++, g = n.pop();
      this._registerAckCallback(c, g), o.id = c;
    }
    const l = (r = (s = this.io.engine) === null || s === void 0 ? void 0 : s.transport) === null || r === void 0 ? void 0 : r.writable, a = this.connected && !(!((i = this.io.engine) === null || i === void 0) && i._hasPingExpired());
    return this.flags.volatile && !l || (a ? (this.notifyOutgoingListeners(o), this.packet(o)) : this.sendBuffer.push(o)), this.flags = {}, this;
  }
  /**
   * @private
   */
  _registerAckCallback(e, n) {
    var s;
    const r = (s = this.flags.timeout) !== null && s !== void 0 ? s : this._opts.ackTimeout;
    if (r === void 0) {
      this.acks[e] = n;
      return;
    }
    const i = this.io.setTimeoutFn(() => {
      delete this.acks[e];
      for (let l = 0; l < this.sendBuffer.length; l++)
        this.sendBuffer[l].id === e && this.sendBuffer.splice(l, 1);
      n.call(this, new Error("operation has timed out"));
    }, r), o = (...l) => {
      this.io.clearTimeoutFn(i), n.apply(this, l);
    };
    o.withError = !0, this.acks[e] = o;
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
  emitWithAck(e, ...n) {
    return new Promise((s, r) => {
      const i = (o, l) => o ? r(o) : s(l);
      i.withError = !0, n.push(i), this.emit(e, ...n);
    });
  }
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  _addToQueue(e) {
    let n;
    typeof e[e.length - 1] == "function" && (n = e.pop());
    const s = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: e,
      flags: Object.assign({ fromQueue: !0 }, this.flags)
    };
    e.push((r, ...i) => s !== this._queue[0] ? void 0 : (r !== null ? s.tryCount > this._opts.retries && (this._queue.shift(), n && n(r)) : (this._queue.shift(), n && n(null, ...i)), s.pending = !1, this._drainQueue())), this._queue.push(s), this._drainQueue();
  }
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  _drainQueue(e = !1) {
    if (!this.connected || this._queue.length === 0)
      return;
    const n = this._queue[0];
    n.pending && !e || (n.pending = !0, n.tryCount++, this.flags = n.flags, this.emit.apply(this, n.args));
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  packet(e) {
    e.nsp = this.nsp, this.io._packet(e);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  onopen() {
    typeof this.auth == "function" ? this.auth((e) => {
      this._sendConnectPacket(e);
    }) : this._sendConnectPacket(this.auth);
  }
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  _sendConnectPacket(e) {
    this.packet({
      type: ce.CONNECT,
      data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, e) : e
    });
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  onerror(e) {
    this.connected || this.emitReserved("connect_error", e);
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(e, n) {
    this.connected = !1, delete this.id, this.emitReserved("disconnect", e, n), this._clearAcks();
  }
  /**
   * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
   * the server.
   *
   * @private
   */
  _clearAcks() {
    Object.keys(this.acks).forEach((e) => {
      if (!this.sendBuffer.some((s) => String(s.id) === e)) {
        const s = this.acks[e];
        delete this.acks[e], s.withError && s.call(this, new Error("socket has been disconnected"));
      }
    });
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  onpacket(e) {
    if (e.nsp === this.nsp)
      switch (e.type) {
        case ce.CONNECT:
          e.data && e.data.sid ? this.onconnect(e.data.sid, e.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case ce.EVENT:
        case ce.BINARY_EVENT:
          this.onevent(e);
          break;
        case ce.ACK:
        case ce.BINARY_ACK:
          this.onack(e);
          break;
        case ce.DISCONNECT:
          this.ondisconnect();
          break;
        case ce.CONNECT_ERROR:
          this.destroy();
          const s = new Error(e.data.message);
          s.data = e.data.data, this.emitReserved("connect_error", s);
          break;
      }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  onevent(e) {
    const n = e.data || [];
    e.id != null && n.push(this.ack(e.id)), this.connected ? this.emitEvent(n) : this.receiveBuffer.push(Object.freeze(n));
  }
  emitEvent(e) {
    if (this._anyListeners && this._anyListeners.length) {
      const n = this._anyListeners.slice();
      for (const s of n)
        s.apply(this, e);
    }
    super.emit.apply(this, e), this._pid && e.length && typeof e[e.length - 1] == "string" && (this._lastOffset = e[e.length - 1]);
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  ack(e) {
    const n = this;
    let s = !1;
    return function(...r) {
      s || (s = !0, n.packet({
        type: ce.ACK,
        id: e,
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
  onack(e) {
    const n = this.acks[e.id];
    typeof n == "function" && (delete this.acks[e.id], n.withError && e.data.unshift(null), n.apply(this, e.data));
  }
  /**
   * Called upon server connect.
   *
   * @private
   */
  onconnect(e, n) {
    this.id = e, this.recovered = n && this._pid === n, this._pid = n, this.connected = !0, this.emitBuffered(), this.emitReserved("connect"), this._drainQueue(!0);
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  emitBuffered() {
    this.receiveBuffer.forEach((e) => this.emitEvent(e)), this.receiveBuffer = [], this.sendBuffer.forEach((e) => {
      this.notifyOutgoingListeners(e), this.packet(e);
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
    this.subs && (this.subs.forEach((e) => e()), this.subs = void 0), this.io._destroy(this);
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
    return this.connected && this.packet({ type: ce.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
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
  compress(e) {
    return this.flags.compress = e, this;
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
  timeout(e) {
    return this.flags.timeout = e, this;
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
  onAny(e) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.push(e), this;
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
  prependAny(e) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(e), this;
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
  offAny(e) {
    if (!this._anyListeners)
      return this;
    if (e) {
      const n = this._anyListeners;
      for (let s = 0; s < n.length; s++)
        if (e === n[s])
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
  onAnyOutgoing(e) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(e), this;
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
  prependAnyOutgoing(e) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(e), this;
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
  offAnyOutgoing(e) {
    if (!this._anyOutgoingListeners)
      return this;
    if (e) {
      const n = this._anyOutgoingListeners;
      for (let s = 0; s < n.length; s++)
        if (e === n[s])
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
  notifyOutgoingListeners(e) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const n = this._anyOutgoingListeners.slice();
      for (const s of n)
        s.apply(this, e.data);
    }
  }
}
function mn(t) {
  t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
}
mn.prototype.duration = function() {
  var t = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var e = Math.random(), n = Math.floor(e * this.jitter * t);
    t = (Math.floor(e * 10) & 1) == 0 ? t - n : t + n;
  }
  return Math.min(t, this.max) | 0;
};
mn.prototype.reset = function() {
  this.attempts = 0;
};
mn.prototype.setMin = function(t) {
  this.ms = t;
};
mn.prototype.setMax = function(t) {
  this.max = t;
};
mn.prototype.setJitter = function(t) {
  this.jitter = t;
};
class pr extends De {
  constructor(e, n) {
    var s;
    super(), this.nsps = {}, this.subs = [], e && typeof e == "object" && (n = e, e = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, Is(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5), this.backoff = new mn({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = e;
    const r = n.parser || Nh;
    this.encoder = new r.Encoder(), this.decoder = new r.Decoder(), this._autoConnect = n.autoConnect !== !1, this._autoConnect && this.open();
  }
  reconnection(e) {
    return arguments.length ? (this._reconnection = !!e, e || (this.skipReconnect = !0), this) : this._reconnection;
  }
  reconnectionAttempts(e) {
    return e === void 0 ? this._reconnectionAttempts : (this._reconnectionAttempts = e, this);
  }
  reconnectionDelay(e) {
    var n;
    return e === void 0 ? this._reconnectionDelay : (this._reconnectionDelay = e, (n = this.backoff) === null || n === void 0 || n.setMin(e), this);
  }
  randomizationFactor(e) {
    var n;
    return e === void 0 ? this._randomizationFactor : (this._randomizationFactor = e, (n = this.backoff) === null || n === void 0 || n.setJitter(e), this);
  }
  reconnectionDelayMax(e) {
    var n;
    return e === void 0 ? this._reconnectionDelayMax : (this._reconnectionDelayMax = e, (n = this.backoff) === null || n === void 0 || n.setMax(e), this);
  }
  timeout(e) {
    return arguments.length ? (this._timeout = e, this) : this._timeout;
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
  open(e) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new xh(this.uri, this.opts);
    const n = this.engine, s = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const r = pt(n, "open", function() {
      s.onopen(), e && e();
    }), i = (l) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", l), e ? e(l) : this.maybeReconnectOnOpen();
    }, o = pt(n, "error", i);
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
  connect(e) {
    return this.open(e);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */
  onopen() {
    this.cleanup(), this._readyState = "open", this.emitReserved("open");
    const e = this.engine;
    this.subs.push(
      pt(e, "ping", this.onping.bind(this)),
      pt(e, "data", this.ondata.bind(this)),
      pt(e, "error", this.onerror.bind(this)),
      pt(e, "close", this.onclose.bind(this)),
      // @ts-ignore
      pt(this.decoder, "decoded", this.ondecoded.bind(this))
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
  ondata(e) {
    try {
      this.decoder.add(e);
    } catch (n) {
      this.onclose("parse error", n);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(e) {
    Rs(() => {
      this.emitReserved("packet", e);
    }, this.setTimeoutFn);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */
  onerror(e) {
    this.emitReserved("error", e);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(e, n) {
    let s = this.nsps[e];
    return s ? this._autoConnect && !s.active && s.connect() : (s = new gl(this, e, n), this.nsps[e] = s), s;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(e) {
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
  _packet(e) {
    const n = this.encoder.encode(e);
    for (let s = 0; s < n.length; s++)
      this.engine.write(n[s], e.options);
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  cleanup() {
    this.subs.forEach((e) => e()), this.subs.length = 0, this.decoder.destroy();
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
  onclose(e, n) {
    var s;
    this.cleanup(), (s = this.engine) === null || s === void 0 || s.close(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", e, n), this._reconnection && !this.skipReconnect && this.reconnect();
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const e = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;
    else {
      const n = this.backoff.duration();
      this._reconnecting = !0;
      const s = this.setTimeoutFn(() => {
        e.skipReconnect || (this.emitReserved("reconnect_attempt", e.backoff.attempts), !e.skipReconnect && e.open((r) => {
          r ? (e._reconnecting = !1, e.reconnect(), this.emitReserved("reconnect_error", r)) : e.onreconnect();
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
    const e = this.backoff.attempts;
    this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", e);
  }
}
const xn = {};
function os(t, e) {
  typeof t == "object" && (e = t, t = void 0), e = e || {};
  const n = Sh(t, e.path || "/socket.io"), s = n.source, r = n.id, i = n.path, o = xn[r] && i in xn[r].nsps, l = e.forceNew || e["force new connection"] || e.multiplex === !1 || o;
  let a;
  return l ? a = new pr(s, e) : (xn[r] || (xn[r] = new pr(s, e)), a = xn[r]), n.query && !e.query && (e.query = n.queryKey), a.socket(n.path, e);
}
Object.assign(os, {
  Manager: pr,
  Socket: gl,
  io: os,
  connect: os
});
function Dh() {
  const t = he([]), e = he(!1), n = he(""), s = he(!1), r = he(!1), i = he(!1), o = he("connecting"), l = he(0), a = 5, u = he({}), c = he(null);
  let g = null, _ = null, A = null, N = null;
  const V = (q) => {
    const be = localStorage.getItem("ctid");
    return g = os(`${ms.WS_URL}/widget`, {
      transports: ["websocket"],
      reconnection: !0,
      reconnectionAttempts: a,
      reconnectionDelay: 1e3,
      auth: be ? {
        conversation_token: be
      } : void 0
    }), g.on("connect", () => {
      o.value = "connected", l.value = 0;
    }), g.on("disconnect", () => {
      o.value === "connected" && (console.log("Socket disconnected, setting connection status to connecting"), o.value = "connecting");
    }), g.on("connect_error", () => {
      l.value++, console.error("Socket connection failed, attempt:", l.value, "connection status:", o.value), l.value >= a && (o.value = "failed");
    }), g.on("chat_response", (H) => {
      e.value = !1, H.type === "agent_message" ? t.value.push({
        message: H.message,
        message_type: "agent",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: "",
        agent_name: H.agent_name,
        attributes: {
          end_chat: H.end_chat,
          end_chat_reason: H.end_chat_reason,
          end_chat_description: H.end_chat_description,
          request_rating: H.request_rating
        }
      }) : H.shopify_output && typeof H.shopify_output == "object" && H.shopify_output.products ? t.value.push({
        message: H.message,
        // Keep the accompanying text message
        message_type: "product",
        // Use 'product' type for rendering
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: "",
        agent_name: H.agent_name,
        // Assign the whole structured object
        shopify_output: H.shopify_output,
        // Remove the old flattened fields (product_id, product_title, etc.)
        attributes: {
          // Keep other attributes if needed
          end_chat: H.end_chat,
          request_rating: H.request_rating
        }
      }) : t.value.push({
        message: H.message,
        message_type: "bot",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: "",
        agent_name: H.agent_name,
        attributes: {
          end_chat: H.end_chat,
          end_chat_reason: H.end_chat_reason,
          end_chat_description: H.end_chat_description,
          request_rating: H.request_rating
        }
      });
    }), g.on("handle_taken_over", (H) => {
      t.value.push({
        message: `${H.user_name} joined the conversation`,
        message_type: "system",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: H.session_id
      }), u.value = {
        ...u.value,
        human_agent_name: H.user_name,
        human_agent_profile_pic: H.profile_picture
      }, _ && _(H);
    }), g.on("error", de), g.on("chat_history", we), g.on("rating_submitted", ne), g.on("display_form", qe), g.on("form_submitted", k), g.on("workflow_state", Ae), g.on("workflow_proceeded", Ve), g;
  }, te = async () => {
    try {
      return o.value = "connecting", l.value = 0, g && (g.removeAllListeners(), g.disconnect(), g = null), g = V(""), new Promise((q) => {
        g == null || g.on("connect", () => {
          q(!0);
        }), g == null || g.on("connect_error", () => {
          l.value >= a && q(!1);
        });
      });
    } catch (q) {
      return console.error("Socket initialization failed:", q), o.value = "failed", !1;
    }
  }, Z = () => (g && g.disconnect(), te()), re = (q) => {
    _ = q;
  }, ie = (q) => {
    A = q;
  }, M = (q) => {
    N = q;
  }, de = (q) => {
    e.value = !1, n.value = ou(q), s.value = !0, setTimeout(() => {
      s.value = !1, n.value = "";
    }, 5e3);
  }, we = (q) => {
    if (q.type === "chat_history" && Array.isArray(q.messages)) {
      const be = q.messages.map((H) => {
        var Ze;
        const Se = {
          message: H.message,
          message_type: H.message_type,
          created_at: H.created_at,
          session_id: "",
          agent_name: H.agent_name || "",
          user_name: H.user_name || "",
          attributes: H.attributes || {}
        };
        return (Ze = H.attributes) != null && Ze.shopify_output && typeof H.attributes.shopify_output == "object" ? {
          ...Se,
          message_type: "product",
          shopify_output: H.attributes.shopify_output
        } : Se;
      });
      t.value = [
        ...be.filter(
          (H) => !t.value.some(
            (Se) => Se.message === H.message && Se.created_at === H.created_at
          )
        ),
        ...t.value
      ];
    }
  }, ne = (q) => {
    q.success && t.value.push({
      message: "Thank you for your feedback!",
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    });
  }, qe = (q) => {
    var be;
    console.log("Form display handler in composable:", q), e.value = !1, c.value = q.form_data, console.log("Set currentForm in handleDisplayForm:", c.value), ((be = q.form_data) == null ? void 0 : be.form_full_screen) === !0 ? (console.log("Full screen form detected, triggering workflow state callback"), A && A({
      type: "form",
      form_data: q.form_data,
      session_id: q.session_id
    })) : t.value.push({
      message: "",
      message_type: "form",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: q.session_id,
      attributes: {
        form_data: q.form_data
      }
    });
  }, k = (q) => {
    console.log("Form submitted confirmation received, clearing currentForm"), c.value = null, q.success && console.log("Form submitted successfully");
  }, Ae = (q) => {
    console.log("Workflow state received in composable:", q), (q.type === "form" || q.type === "display_form") && (console.log("Setting currentForm from workflow state:", q.form_data), c.value = q.form_data), A && A(q);
  }, Ve = (q) => {
    console.log("Workflow proceeded in composable:", q), N && N(q);
  };
  return {
    messages: t,
    loading: e,
    errorMessage: n,
    showError: s,
    loadingHistory: r,
    hasStartedChat: i,
    connectionStatus: o,
    sendMessage: async (q, be) => {
      !g || !q.trim() || (u.value.human_agent_name || (e.value = !0), t.value.push({
        message: q,
        message_type: "user",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: ""
      }), g.emit("chat", {
        message: q,
        email: be
      }), i.value = !0);
    },
    loadChatHistory: async () => {
      if (g)
        try {
          r.value = !0, g.emit("get_chat_history");
        } catch (q) {
          console.error("Failed to load chat history:", q);
        } finally {
          r.value = !1;
        }
    },
    connect: te,
    reconnect: Z,
    cleanup: () => {
      g && (g.removeAllListeners(), g.disconnect(), g = null), _ = null, A = null, N = null;
    },
    humanAgent: u,
    onTakeover: re,
    submitRating: async (q, be) => {
      !g || !q || g.emit("submit_rating", {
        rating: q,
        feedback: be
      });
    },
    currentForm: c,
    submitForm: async (q) => {
      if (console.log("Submitting form in socket:", q), console.log("Current form in socket:", c.value), console.log("Socket in socket:", g), !g) {
        console.error("No socket available for form submission");
        return;
      }
      if (!q || Object.keys(q).length === 0) {
        console.error("No form data to submit");
        return;
      }
      console.log("Emitting submit_form event with data:", q), g.emit("submit_form", {
        form_data: q
      }), c.value = null;
    },
    getWorkflowState: async () => {
      g && (console.log("Getting workflow state 12"), g.emit("get_workflow_state"));
    },
    proceedWorkflow: async () => {
      g && g.emit("proceed_workflow", {});
    },
    onWorkflowState: ie,
    onWorkflowProceeded: M
  };
}
function Mh(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Ks = { exports: {} }, Vi;
function qh() {
  return Vi || (Vi = 1, function(t) {
    (function() {
      function e(h, p, w) {
        return h.call.apply(h.bind, arguments);
      }
      function n(h, p, w) {
        if (!h) throw Error();
        if (2 < arguments.length) {
          var y = Array.prototype.slice.call(arguments, 2);
          return function() {
            var S = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(S, y), h.apply(p, S);
          };
        }
        return function() {
          return h.apply(p, arguments);
        };
      }
      function s(h, p, w) {
        return s = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? e : n, s.apply(null, arguments);
      }
      var r = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function i(h, p) {
        this.a = h, this.o = p || h, this.c = this.o.document;
      }
      var o = !!window.FontFace;
      function l(h, p, w, y) {
        if (p = h.c.createElement(p), w) for (var S in w) w.hasOwnProperty(S) && (S == "style" ? p.style.cssText = w[S] : p.setAttribute(S, w[S]));
        return y && p.appendChild(h.c.createTextNode(y)), p;
      }
      function a(h, p, w) {
        h = h.c.getElementsByTagName(p)[0], h || (h = document.documentElement), h.insertBefore(w, h.lastChild);
      }
      function u(h) {
        h.parentNode && h.parentNode.removeChild(h);
      }
      function c(h, p, w) {
        p = p || [], w = w || [];
        for (var y = h.className.split(/\s+/), S = 0; S < p.length; S += 1) {
          for (var D = !1, U = 0; U < y.length; U += 1) if (p[S] === y[U]) {
            D = !0;
            break;
          }
          D || y.push(p[S]);
        }
        for (p = [], S = 0; S < y.length; S += 1) {
          for (D = !1, U = 0; U < w.length; U += 1) if (y[S] === w[U]) {
            D = !0;
            break;
          }
          D || p.push(y[S]);
        }
        h.className = p.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function g(h, p) {
        for (var w = h.className.split(/\s+/), y = 0, S = w.length; y < S; y++) if (w[y] == p) return !0;
        return !1;
      }
      function _(h) {
        return h.o.location.hostname || h.a.location.hostname;
      }
      function A(h, p, w) {
        function y() {
          X && S && D && (X(U), X = null);
        }
        p = l(h, "link", { rel: "stylesheet", href: p, media: "all" });
        var S = !1, D = !0, U = null, X = w || null;
        o ? (p.onload = function() {
          S = !0, y();
        }, p.onerror = function() {
          S = !0, U = Error("Stylesheet failed to load"), y();
        }) : setTimeout(function() {
          S = !0, y();
        }, 0), a(h, "head", p);
      }
      function N(h, p, w, y) {
        var S = h.c.getElementsByTagName("head")[0];
        if (S) {
          var D = l(h, "script", { src: p }), U = !1;
          return D.onload = D.onreadystatechange = function() {
            U || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (U = !0, w && w(null), D.onload = D.onreadystatechange = null, D.parentNode.tagName == "HEAD" && S.removeChild(D));
          }, S.appendChild(D), setTimeout(function() {
            U || (U = !0, w && w(Error("Script load timeout")));
          }, y || 5e3), D;
        }
        return null;
      }
      function V() {
        this.a = 0, this.c = null;
      }
      function te(h) {
        return h.a++, function() {
          h.a--, re(h);
        };
      }
      function Z(h, p) {
        h.c = p, re(h);
      }
      function re(h) {
        h.a == 0 && h.c && (h.c(), h.c = null);
      }
      function ie(h) {
        this.a = h || "-";
      }
      ie.prototype.c = function(h) {
        for (var p = [], w = 0; w < arguments.length; w++) p.push(arguments[w].replace(/[\W_]+/g, "").toLowerCase());
        return p.join(this.a);
      };
      function M(h, p) {
        this.c = h, this.f = 4, this.a = "n";
        var w = (p || "n4").match(/^([nio])([1-9])$/i);
        w && (this.a = w[1], this.f = parseInt(w[2], 10));
      }
      function de(h) {
        return qe(h) + " " + (h.f + "00") + " 300px " + we(h.c);
      }
      function we(h) {
        var p = [];
        h = h.split(/,\s*/);
        for (var w = 0; w < h.length; w++) {
          var y = h[w].replace(/['"]/g, "");
          y.indexOf(" ") != -1 || /^\d/.test(y) ? p.push("'" + y + "'") : p.push(y);
        }
        return p.join(",");
      }
      function ne(h) {
        return h.a + h.f;
      }
      function qe(h) {
        var p = "normal";
        return h.a === "o" ? p = "oblique" : h.a === "i" && (p = "italic"), p;
      }
      function k(h) {
        var p = 4, w = "n", y = null;
        return h && ((y = h.match(/(normal|oblique|italic)/i)) && y[1] && (w = y[1].substr(0, 1).toLowerCase()), (y = h.match(/([1-9]00|normal|bold)/i)) && y[1] && (/bold/i.test(y[1]) ? p = 7 : /[1-9]00/.test(y[1]) && (p = parseInt(y[1].substr(0, 1), 10)))), w + p;
      }
      function Ae(h, p) {
        this.c = h, this.f = h.o.document.documentElement, this.h = p, this.a = new ie("-"), this.j = p.events !== !1, this.g = p.classes !== !1;
      }
      function Ve(h) {
        h.g && c(h.f, [h.a.c("wf", "loading")]), je(h, "loading");
      }
      function ae(h) {
        if (h.g) {
          var p = g(h.f, h.a.c("wf", "active")), w = [], y = [h.a.c("wf", "loading")];
          p || w.push(h.a.c("wf", "inactive")), c(h.f, w, y);
        }
        je(h, "inactive");
      }
      function je(h, p, w) {
        h.j && h.h[p] && (w ? h.h[p](w.c, ne(w)) : h.h[p]());
      }
      function Rt() {
        this.c = {};
      }
      function it(h, p, w) {
        var y = [], S;
        for (S in p) if (p.hasOwnProperty(S)) {
          var D = h.c[S];
          D && y.push(D(p[S], w));
        }
        return y;
      }
      function Ie(h, p) {
        this.c = h, this.f = p, this.a = l(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function ee(h) {
        a(h.c, "body", h.a);
      }
      function Q(h) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + we(h.c) + ";" + ("font-style:" + qe(h) + ";font-weight:" + (h.f + "00") + ";");
      }
      function q(h, p, w, y, S, D) {
        this.g = h, this.j = p, this.a = y, this.c = w, this.f = S || 3e3, this.h = D || void 0;
      }
      q.prototype.start = function() {
        var h = this.c.o.document, p = this, w = r(), y = new Promise(function(U, X) {
          function ue() {
            r() - w >= p.f ? X() : h.fonts.load(de(p.a), p.h).then(function(Ee) {
              1 <= Ee.length ? U() : setTimeout(ue, 25);
            }, function() {
              X();
            });
          }
          ue();
        }), S = null, D = new Promise(function(U, X) {
          S = setTimeout(X, p.f);
        });
        Promise.race([D, y]).then(function() {
          S && (clearTimeout(S), S = null), p.g(p.a);
        }, function() {
          p.j(p.a);
        });
      };
      function be(h, p, w, y, S, D, U) {
        this.v = h, this.B = p, this.c = w, this.a = y, this.s = U || "BESbswy", this.f = {}, this.w = S || 3e3, this.u = D || null, this.m = this.j = this.h = this.g = null, this.g = new Ie(this.c, this.s), this.h = new Ie(this.c, this.s), this.j = new Ie(this.c, this.s), this.m = new Ie(this.c, this.s), h = new M(this.a.c + ",serif", ne(this.a)), h = Q(h), this.g.a.style.cssText = h, h = new M(this.a.c + ",sans-serif", ne(this.a)), h = Q(h), this.h.a.style.cssText = h, h = new M("serif", ne(this.a)), h = Q(h), this.j.a.style.cssText = h, h = new M("sans-serif", ne(this.a)), h = Q(h), this.m.a.style.cssText = h, ee(this.g), ee(this.h), ee(this.j), ee(this.m);
      }
      var H = { D: "serif", C: "sans-serif" }, Se = null;
      function Ze() {
        if (Se === null) {
          var h = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          Se = !!h && (536 > parseInt(h[1], 10) || parseInt(h[1], 10) === 536 && 11 >= parseInt(h[2], 10));
        }
        return Se;
      }
      be.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = r(), ot(this);
      };
      function Ut(h, p, w) {
        for (var y in H) if (H.hasOwnProperty(y) && p === h.f[H[y]] && w === h.f[H[y]]) return !0;
        return !1;
      }
      function ot(h) {
        var p = h.g.a.offsetWidth, w = h.h.a.offsetWidth, y;
        (y = p === h.f.serif && w === h.f["sans-serif"]) || (y = Ze() && Ut(h, p, w)), y ? r() - h.A >= h.w ? Ze() && Ut(h, p, w) && (h.u === null || h.u.hasOwnProperty(h.a.c)) ? lt(h, h.v) : lt(h, h.B) : ft(h) : lt(h, h.v);
      }
      function ft(h) {
        setTimeout(s(function() {
          ot(this);
        }, h), 50);
      }
      function lt(h, p) {
        setTimeout(s(function() {
          u(this.g.a), u(this.h.a), u(this.j.a), u(this.m.a), p(this.a);
        }, h), 0);
      }
      function mt(h, p, w) {
        this.c = h, this.a = p, this.f = 0, this.m = this.j = !1, this.s = w;
      }
      var et = null;
      mt.prototype.g = function(h) {
        var p = this.a;
        p.g && c(p.f, [p.a.c("wf", h.c, ne(h).toString(), "active")], [p.a.c("wf", h.c, ne(h).toString(), "loading"), p.a.c("wf", h.c, ne(h).toString(), "inactive")]), je(p, "fontactive", h), this.m = !0, _t(this);
      }, mt.prototype.h = function(h) {
        var p = this.a;
        if (p.g) {
          var w = g(p.f, p.a.c("wf", h.c, ne(h).toString(), "active")), y = [], S = [p.a.c("wf", h.c, ne(h).toString(), "loading")];
          w || y.push(p.a.c("wf", h.c, ne(h).toString(), "inactive")), c(p.f, y, S);
        }
        je(p, "fontinactive", h), _t(this);
      };
      function _t(h) {
        --h.f == 0 && h.j && (h.m ? (h = h.a, h.g && c(h.f, [h.a.c("wf", "active")], [h.a.c("wf", "loading"), h.a.c("wf", "inactive")]), je(h, "active")) : ae(h.a));
      }
      function yt(h) {
        this.j = h, this.a = new Rt(), this.h = 0, this.f = this.g = !0;
      }
      yt.prototype.load = function(h) {
        this.c = new i(this.j, h.context || this.j), this.g = h.events !== !1, this.f = h.classes !== !1, m(this, new Ae(this.c, h), h);
      };
      function f(h, p, w, y, S) {
        var D = --h.h == 0;
        (h.f || h.g) && setTimeout(function() {
          var U = S || null, X = y || null || {};
          if (w.length === 0 && D) ae(p.a);
          else {
            p.f += w.length, D && (p.j = D);
            var ue, Ee = [];
            for (ue = 0; ue < w.length; ue++) {
              var ge = w[ue], Oe = X[ge.c], nt = p.a, It = ge;
              if (nt.g && c(nt.f, [nt.a.c("wf", It.c, ne(It).toString(), "loading")]), je(nt, "fontloading", It), nt = null, et === null) if (window.FontFace) {
                var It = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), Os = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                et = It ? 42 < parseInt(It[1], 10) : !Os;
              } else et = !1;
              et ? nt = new q(s(p.g, p), s(p.h, p), p.c, ge, p.s, Oe) : nt = new be(s(p.g, p), s(p.h, p), p.c, ge, p.s, U, Oe), Ee.push(nt);
            }
            for (ue = 0; ue < Ee.length; ue++) Ee[ue].start();
          }
        }, 0);
      }
      function m(h, p, w) {
        var S = [], y = w.timeout;
        Ve(p);
        var S = it(h.a, w, h.c), D = new mt(h.c, p, y);
        for (h.h = S.length, p = 0, w = S.length; p < w; p++) S[p].load(function(U, X, ue) {
          f(h, D, U, X, ue);
        });
      }
      function b(h, p) {
        this.c = h, this.a = p;
      }
      b.prototype.load = function(h) {
        function p() {
          if (D["__mti_fntLst" + y]) {
            var U = D["__mti_fntLst" + y](), X = [], ue;
            if (U) for (var Ee = 0; Ee < U.length; Ee++) {
              var ge = U[Ee].fontfamily;
              U[Ee].fontStyle != null && U[Ee].fontWeight != null ? (ue = U[Ee].fontStyle + U[Ee].fontWeight, X.push(new M(ge, ue))) : X.push(new M(ge));
            }
            h(X);
          } else setTimeout(function() {
            p();
          }, 50);
        }
        var w = this, y = w.a.projectId, S = w.a.version;
        if (y) {
          var D = w.c.o;
          N(this.c, (w.a.api || "https://fast.fonts.net/jsapi") + "/" + y + ".js" + (S ? "?v=" + S : ""), function(U) {
            U ? h([]) : (D["__MonotypeConfiguration__" + y] = function() {
              return w.a;
            }, p());
          }).id = "__MonotypeAPIScript__" + y;
        } else h([]);
      };
      function T(h, p) {
        this.c = h, this.a = p;
      }
      T.prototype.load = function(h) {
        var p, w, y = this.a.urls || [], S = this.a.families || [], D = this.a.testStrings || {}, U = new V();
        for (p = 0, w = y.length; p < w; p++) A(this.c, y[p], te(U));
        var X = [];
        for (p = 0, w = S.length; p < w; p++) if (y = S[p].split(":"), y[1]) for (var ue = y[1].split(","), Ee = 0; Ee < ue.length; Ee += 1) X.push(new M(y[0], ue[Ee]));
        else X.push(new M(y[0]));
        Z(U, function() {
          h(X, D);
        });
      };
      function x(h, p) {
        h ? this.c = h : this.c = C, this.a = [], this.f = [], this.g = p || "";
      }
      var C = "https://fonts.googleapis.com/css";
      function P(h, p) {
        for (var w = p.length, y = 0; y < w; y++) {
          var S = p[y].split(":");
          S.length == 3 && h.f.push(S.pop());
          var D = "";
          S.length == 2 && S[1] != "" && (D = ":"), h.a.push(S.join(D));
        }
      }
      function F(h) {
        if (h.a.length == 0) throw Error("No fonts to load!");
        if (h.c.indexOf("kit=") != -1) return h.c;
        for (var p = h.a.length, w = [], y = 0; y < p; y++) w.push(h.a[y].replace(/ /g, "+"));
        return p = h.c + "?family=" + w.join("%7C"), 0 < h.f.length && (p += "&subset=" + h.f.join(",")), 0 < h.g.length && (p += "&text=" + encodeURIComponent(h.g)), p;
      }
      function I(h) {
        this.f = h, this.a = [], this.c = {};
      }
      var E = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, W = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, B = { i: "i", italic: "i", n: "n", normal: "n" }, j = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function K(h) {
        for (var p = h.f.length, w = 0; w < p; w++) {
          var y = h.f[w].split(":"), S = y[0].replace(/\+/g, " "), D = ["n4"];
          if (2 <= y.length) {
            var U, X = y[1];
            if (U = [], X) for (var X = X.split(","), ue = X.length, Ee = 0; Ee < ue; Ee++) {
              var ge;
              if (ge = X[Ee], ge.match(/^[\w-]+$/)) {
                var Oe = j.exec(ge.toLowerCase());
                if (Oe == null) ge = "";
                else {
                  if (ge = Oe[2], ge = ge == null || ge == "" ? "n" : B[ge], Oe = Oe[1], Oe == null || Oe == "") Oe = "4";
                  else var nt = W[Oe], Oe = nt || (isNaN(Oe) ? "4" : Oe.substr(0, 1));
                  ge = [ge, Oe].join("");
                }
              } else ge = "";
              ge && U.push(ge);
            }
            0 < U.length && (D = U), y.length == 3 && (y = y[2], U = [], y = y ? y.split(",") : U, 0 < y.length && (y = E[y[0]]) && (h.c[S] = y));
          }
          for (h.c[S] || (y = E[S]) && (h.c[S] = y), y = 0; y < D.length; y += 1) h.a.push(new M(S, D[y]));
        }
      }
      function G(h, p) {
        this.c = h, this.a = p;
      }
      var pe = { Arimo: !0, Cousine: !0, Tinos: !0 };
      G.prototype.load = function(h) {
        var p = new V(), w = this.c, y = new x(this.a.api, this.a.text), S = this.a.families;
        P(y, S);
        var D = new I(S);
        K(D), A(w, F(y), te(p)), Z(p, function() {
          h(D.a, D.c, pe);
        });
      };
      function se(h, p) {
        this.c = h, this.a = p;
      }
      se.prototype.load = function(h) {
        var p = this.a.id, w = this.c.o;
        p ? N(this.c, (this.a.api || "https://use.typekit.net") + "/" + p + ".js", function(y) {
          if (y) h([]);
          else if (w.Typekit && w.Typekit.config && w.Typekit.config.fn) {
            y = w.Typekit.config.fn;
            for (var S = [], D = 0; D < y.length; D += 2) for (var U = y[D], X = y[D + 1], ue = 0; ue < X.length; ue++) S.push(new M(U, X[ue]));
            try {
              w.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            h(S);
          }
        }, 2e3) : h([]);
      };
      function Ue(h, p) {
        this.c = h, this.f = p, this.a = [];
      }
      Ue.prototype.load = function(h) {
        var p = this.f.id, w = this.c.o, y = this;
        p ? (w.__webfontfontdeckmodule__ || (w.__webfontfontdeckmodule__ = {}), w.__webfontfontdeckmodule__[p] = function(S, D) {
          for (var U = 0, X = D.fonts.length; U < X; ++U) {
            var ue = D.fonts[U];
            y.a.push(new M(ue.name, k("font-weight:" + ue.weight + ";font-style:" + ue.style)));
          }
          h(y.a);
        }, N(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + _(this.c) + "/" + p + ".js", function(S) {
          S && h([]);
        })) : h([]);
      };
      var Te = new yt(window);
      Te.a.c.custom = function(h, p) {
        return new T(p, h);
      }, Te.a.c.fontdeck = function(h, p) {
        return new Ue(p, h);
      }, Te.a.c.monotype = function(h, p) {
        return new b(p, h);
      }, Te.a.c.typekit = function(h, p) {
        return new se(p, h);
      }, Te.a.c.google = function(h, p) {
        return new G(p, h);
      };
      var Ge = { load: s(Te.load, Te) };
      t.exports ? t.exports = Ge : (window.WebFont = Ge, window.WebFontConfig && Te.load(window.WebFontConfig));
    })();
  }(Ks)), Ks.exports;
}
var Uh = qh();
const Vh = /* @__PURE__ */ Mh(Uh);
function Hh() {
  const t = he({}), e = he(""), n = (r) => {
    t.value = r, r.photo_url && (t.value.photo_url = r.photo_url), r.font_family && Vh.load({
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
        chat_bubble_color: r.chat_bubble_color || "#f34611",
        chat_style: r.chat_style
      }
    }, "*");
  };
  return {
    customization: t,
    agentName: e,
    applyCustomization: n,
    initializeFromData: () => {
      const r = window.__INITIAL_DATA__;
      r && (n(r.customization || {}), e.value = r.agentName || "");
    }
  };
}
const Yn = "ctid", jh = /* @__PURE__ */ Ea({
  __name: "WidgetBuilder",
  props: {
    widgetId: { type: String, required: !0 }
  },
  setup(t, { expose: e }) {
    var Xr;
    e(), fe.setOptions({
      renderer: new fe.Renderer(),
      gfm: !0,
      breaks: !0
    });
    const n = new fe.Renderer(), s = n.link;
    n.link = (d, R, z) => s.call(n, d, R, z).replace(/^<a /, '<a target="_blank" rel="nofollow" '), fe.use({ renderer: n });
    const r = t, i = Be(() => {
      var d;
      return r.widgetId || ((d = window.__INITIAL_DATA__) == null ? void 0 : d.widgetId);
    }), {
      customization: o,
      agentName: l,
      applyCustomization: a,
      initializeFromData: u
    } = Hh(), {
      messages: c,
      loading: g,
      errorMessage: _,
      showError: A,
      loadingHistory: N,
      hasStartedChat: V,
      connectionStatus: te,
      sendMessage: Z,
      loadChatHistory: re,
      connect: ie,
      reconnect: M,
      cleanup: de,
      humanAgent: we,
      onTakeover: ne,
      submitRating: qe,
      submitForm: k,
      currentForm: Ae,
      getWorkflowState: Ve,
      proceedWorkflow: ae,
      onWorkflowState: je,
      onWorkflowProceeded: Rt
    } = Dh(), it = he(""), Ie = he(!0), ee = he(""), Q = he(!1), q = (d) => {
      const R = d.target;
      it.value = R.value;
    };
    let be = null;
    const H = () => {
      be && be.disconnect(), be = new MutationObserver((R) => {
        let z = !1, Y = !1;
        R.forEach((Le) => {
          if (Le.type === "childList") {
            const We = Array.from(Le.addedNodes).some(
              (at) => {
                var yn;
                return at.nodeType === Node.ELEMENT_NODE && (at.matches("input, textarea") || ((yn = at.querySelector) == null ? void 0 : yn.call(at, "input, textarea")));
              }
            ), Pe = Array.from(Le.removedNodes).some(
              (at) => {
                var yn;
                return at.nodeType === Node.ELEMENT_NODE && (at.matches("input, textarea") || ((yn = at.querySelector) == null ? void 0 : yn.call(at, "input, textarea")));
              }
            );
            We && (Y = !0, z = !0), Pe && (z = !0);
          }
        }), z && (clearTimeout(H.timeoutId), H.timeoutId = setTimeout(() => {
          Ze();
        }, Y ? 50 : 100));
      });
      const d = document.querySelector(".widget-container") || document.body;
      be.observe(d, {
        childList: !0,
        subtree: !0
      });
    };
    H.timeoutId = null;
    let Se = [];
    const Ze = () => {
      Ut();
      const d = [
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
      let R = [];
      for (const z of d) {
        const Y = document.querySelectorAll(z);
        if (Y.length > 0) {
          R = Array.from(Y);
          break;
        }
      }
      R.length !== 0 && (Se = R, R.forEach((z) => {
        z.addEventListener("input", ot, !0), z.addEventListener("keyup", ot, !0), z.addEventListener("change", ot, !0), z.addEventListener("keypress", ft, !0), z.addEventListener("keydown", lt, !0);
      }));
    }, Ut = () => {
      Se.forEach((d) => {
        d.removeEventListener("input", ot), d.removeEventListener("keyup", ot), d.removeEventListener("change", ot), d.removeEventListener("keypress", ft), d.removeEventListener("keydown", lt);
      }), Se = [];
    }, ot = (d) => {
      const R = d.target;
      it.value = R.value;
    }, ft = (d) => {
      d.key === "Enter" && !d.shiftKey && (d.preventDefault(), d.stopPropagation(), j());
    }, lt = (d) => {
      d.key === "Enter" && !d.shiftKey && (d.preventDefault(), d.stopPropagation(), j());
    }, mt = he(!0), et = he(((Xr = window.__INITIAL_DATA__) == null ? void 0 : Xr.initialToken) || localStorage.getItem(Yn)), _t = Be(() => !!et.value);
    u();
    const yt = window.__INITIAL_DATA__;
    yt != null && yt.initialToken && (et.value = yt.initialToken, window.parent.postMessage({
      type: "TOKEN_UPDATE",
      token: yt.initialToken
    }, "*"), Q.value = !0);
    const f = he(null), {
      chatStyles: m,
      chatIconStyles: b,
      agentBubbleStyles: T,
      userBubbleStyles: x,
      messageNameStyles: C,
      headerBorderStyles: P,
      photoUrl: F,
      shadowStyle: I
    } = ju(o), E = Be(() => c.value.some(
      (d) => d.message_type === "form" && (!d.isSubmitted || d.isSubmitted === !1)
    )), W = Be(() => {
      var d;
      return V.value && Q.value || _n.value ? te.value === "connected" && !g.value : Kn(ee.value.trim()) && te.value === "connected" && !g.value || ((d = window.__INITIAL_DATA__) == null ? void 0 : d.workflow);
    }), B = Be(() => te.value === "connected" ? _n.value ? "Ask me anything..." : "Type a message..." : "Connecting..."), j = async () => {
      if (!it.value.trim()) return;
      !V.value && ee.value && await G(), await Z(it.value, ee.value), it.value = "";
      const d = document.querySelector('input[placeholder*="Type a message"]');
      d && (d.value = ""), setTimeout(() => {
        Ze();
      }, 500);
    }, K = (d) => {
      d.key === "Enter" && !d.shiftKey && (d.preventDefault(), d.stopPropagation(), j());
    }, G = async () => {
      var d, R, z;
      try {
        if (!i.value)
          return console.error("Widget ID is not available"), !1;
        const Y = new URL(`${ms.API_URL}/widgets/${i.value}`);
        ee.value.trim() && Kn(ee.value.trim()) && Y.searchParams.append("email", ee.value.trim());
        const Le = {
          Accept: "application/json",
          "Content-Type": "application/json"
        };
        et.value && (Le.Authorization = `Bearer ${et.value}`);
        const We = await fetch(Y, {
          headers: Le
        });
        if (We.status === 401)
          return Q.value = !1, !1;
        const Pe = await We.json();
        return Pe.token && (et.value = Pe.token, localStorage.setItem(Yn, Pe.token), window.parent.postMessage({ type: "TOKEN_UPDATE", token: Pe.token }, "*")), Q.value = !0, await ie() ? (await pe(), (d = Pe.agent) != null && d.customization && a(Pe.agent.customization), Pe.agent && !(Pe != null && Pe.human_agent) && (l.value = Pe.agent.name), Pe != null && Pe.human_agent && (we.value = Pe.human_agent), ((R = Pe.agent) == null ? void 0 : R.workflow) !== void 0 && (window.__INITIAL_DATA__ = window.__INITIAL_DATA__ || {}, window.__INITIAL_DATA__.workflow = Pe.agent.workflow), (z = Pe.agent) != null && z.workflow && (console.log("Getting workflow state after authorization"), await Ve()), !0) : (console.error("Failed to connect to chat service"), !1);
      } catch (Y) {
        return console.error("Error checking authorization:", Y), Q.value = !1, !1;
      } finally {
        mt.value = !1;
      }
    }, pe = async () => {
      !V.value && Q.value && (V.value = !0, await re());
    }, se = () => {
      f.value && (f.value.scrollTop = f.value.scrollHeight);
    };
    nn(() => c.value, (d) => {
      po(() => {
        se();
      });
    }, { deep: !0 }), nn(te, (d, R) => {
      d === "connected" && R !== "connected" && setTimeout(Ze, 100);
    }), nn(() => c.value.length, (d, R) => {
      d > 0 && R === 0 && setTimeout(Ze, 100);
    }), nn(() => c.value, (d) => {
      if (d.length > 0) {
        const R = d[d.length - 1];
        $r(R);
      }
    }, { deep: !0 });
    const Ue = async () => {
      await M() && await G();
    }, Te = he(!1), Ge = he(0), h = he(""), p = he(""), w = he(0), y = he(!1), S = he({}), D = he(!1), U = he({}), X = he(!1), ue = he(null), Ee = he("Start Chat"), ge = he(!1), Oe = he(null), nt = Be(() => {
      var R;
      const d = c.value[c.value.length - 1];
      return ((R = d == null ? void 0 : d.attributes) == null ? void 0 : R.request_rating) || !1;
    }), It = Be(() => {
      var R;
      if (!((R = window.__INITIAL_DATA__) != null && R.workflow))
        return !1;
      const d = c.value.find((z) => z.message_type === "rating");
      return (d == null ? void 0 : d.isSubmitted) === !0;
    }), Os = Be(() => we.value.human_agent_profile_pic ? we.value.human_agent_profile_pic.includes("amazonaws.com") ? we.value.human_agent_profile_pic : `${ms.API_URL}${we.value.human_agent_profile_pic}` : ""), $r = (d) => {
      var R, z, Y;
      if ((R = d.attributes) != null && R.end_chat && ((z = d.attributes) != null && z.request_rating)) {
        const Le = d.agent_name || ((Y = we.value) == null ? void 0 : Y.human_agent_name) || l.value || "our agent";
        c.value.push({
          message: `Rate the chat session that you had with ${Le}`,
          message_type: "rating",
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: d.session_id,
          agent_name: Le,
          showFeedback: !1
        }), p.value = d.session_id;
      }
    }, ml = (d) => {
      y.value || (w.value = d);
    }, _l = () => {
      if (!y.value) {
        const d = c.value[c.value.length - 1];
        w.value = (d == null ? void 0 : d.selectedRating) || 0;
      }
    }, yl = async (d) => {
      if (!y.value) {
        w.value = d;
        const R = c.value[c.value.length - 1];
        R && R.message_type === "rating" && (R.showFeedback = !0, R.selectedRating = d);
      }
    }, bl = async (d, R, z = null) => {
      try {
        y.value = !0, await qe(R, z);
        const Y = c.value.find((Le) => Le.message_type === "rating");
        Y && (Y.isSubmitted = !0, Y.finalRating = R, Y.finalFeedback = z);
      } catch (Y) {
        console.error("Failed to submit rating:", Y);
      } finally {
        y.value = !1;
      }
    }, vl = (d) => {
      const R = d.shopify_output || {
        id: d.product_id,
        title: d.product_title,
        price: d.product_price,
        image: d.product_image,
        vendor: d.product_vendor
      };
      R && window.parent.postMessage({
        type: "ADD_TO_CART",
        product: R
      }, "*");
    }, wl = (d) => {
      d && window.parent.postMessage({
        type: "ADD_TO_CART",
        product: d
      }, "*");
    }, Zr = (d) => {
      const R = {};
      for (const z of d.fields) {
        const Y = S.value[z.name], Le = Hn(z, Y);
        Le && (R[z.name] = Le);
      }
      return U.value = R, Object.keys(R).length === 0;
    }, kl = async (d) => {
      if (console.log("handleFormSubmit called with config:", d), console.log("Current form data:", S.value), console.log("isSubmittingForm:", D.value), D.value) {
        console.log("Form submission already in progress, returning");
        return;
      }
      console.log("Validating form...");
      const R = Zr(d);
      if (console.log("Form validation result:", R), console.log("Form errors:", U.value), !R) {
        console.log("Form validation failed, not submitting");
        return;
      }
      try {
        console.log("Starting form submission..."), D.value = !0, await k(S.value), console.log("Form submitted successfully");
        const z = c.value.findIndex(
          (Y) => Y.message_type === "form" && (!Y.isSubmitted || Y.isSubmitted === !1)
        );
        z !== -1 && (c.value.splice(z, 1), console.log("Removed form message from chat")), S.value = {}, U.value = {}, console.log("Cleared form data and errors");
      } catch (z) {
        console.error("Failed to submit form:", z);
      } finally {
        D.value = !1, console.log("Form submission completed");
      }
    }, xl = (d, R) => {
      var z, Y;
      if (console.log(`Field change: ${d} = `, R), S.value[d] = R, console.log("Updated formData:", S.value), R && R.toString().trim() !== "") {
        let Le = null;
        if ((z = Oe.value) != null && z.fields && (Le = Oe.value.fields.find((We) => We.name === d)), !Le && ((Y = Ae.value) != null && Y.fields) && (Le = Ae.value.fields.find((We) => We.name === d)), Le) {
          const We = Hn(Le, R);
          We ? (U.value[d] = We, console.log(`Validation error for ${d}:`, We)) : (delete U.value[d], console.log(`Validation passed for ${d}`));
        }
      } else
        delete U.value[d], console.log(`Cleared error for ${d}`);
    }, Gr = (d) => {
      const R = d.replace(/\D/g, "");
      return R.length >= 7 && R.length <= 15;
    }, Hn = (d, R) => {
      if (d.required && (!R || R.toString().trim() === ""))
        return `${d.label} is required`;
      if (!R || R.toString().trim() === "")
        return null;
      if (d.type === "email" && !Kn(R))
        return "Please enter a valid email address";
      if (d.type === "tel" && !Gr(R))
        return "Please enter a valid phone number";
      if ((d.type === "text" || d.type === "textarea") && d.minLength && R.length < d.minLength)
        return `${d.label} must be at least ${d.minLength} characters`;
      if ((d.type === "text" || d.type === "textarea") && d.maxLength && R.length > d.maxLength)
        return `${d.label} must not exceed ${d.maxLength} characters`;
      if (d.type === "number") {
        const z = parseFloat(R);
        if (isNaN(z))
          return `${d.label} must be a valid number`;
        if (d.minLength && z < d.minLength)
          return `${d.label} must be at least ${d.minLength}`;
        if (d.maxLength && z > d.maxLength)
          return `${d.label} must not exceed ${d.maxLength}`;
      }
      return null;
    }, Sl = async () => {
      if (D.value || !Oe.value) {
        console.log("Already submitting or no form data, returning");
        return;
      }
      try {
        console.log("Starting full screen form submission..."), D.value = !0, U.value = {};
        let d = !1;
        for (const R of Oe.value.fields || []) {
          const z = S.value[R.name], Y = Hn(R, z);
          Y && (U.value[R.name] = Y, d = !0, console.log(`Validation error for field ${R.name}:`, Y));
        }
        if (console.log("Validation completed. Has errors:", d), console.log("Form errors:", U.value), d) {
          D.value = !1, console.log("Validation failed, not submitting");
          return;
        }
        console.log("Submitting form data:", S.value), await k(S.value), console.log("Full screen form submitted successfully"), ge.value = !1, Oe.value = null, S.value = {}, console.log("Full screen form hidden and data cleared");
      } catch (d) {
        console.error("Failed to submit full screen form:", d);
      } finally {
        D.value = !1, console.log("Full screen form submission completed");
      }
    }, Cl = (d) => {
      d && window.parent.postMessage({
        type: "VIEW_PRODUCT",
        productId: d
      }, "*");
    }, Tl = (d) => d ? d.replace(/https?:\/\/[^\s\)]+/g, "[link removed]") : "", El = async () => {
      try {
        X.value = !1, ue.value = null, await ae();
      } catch (d) {
        console.error("Failed to proceed workflow:", d);
      }
    }, Al = async (d) => {
      try {
        if (!d.userInputValue || !d.userInputValue.trim())
          return;
        const R = d.userInputValue.trim();
        d.isSubmitted = !0, d.submittedValue = R, await Z(R, ee.value), console.log("User input submitted:", R);
      } catch (R) {
        console.error("Failed to submit user input:", R), d.isSubmitted = !1, d.submittedValue = null;
      }
    }, Ls = async () => {
      var d, R, z;
      try {
        let Y = 0;
        const Le = 50;
        for (; !((d = window.__INITIAL_DATA__) != null && d.widgetId) && Y < Le; )
          await new Promise((Pe) => setTimeout(Pe, 100)), Y++;
        return (R = window.__INITIAL_DATA__) != null && R.widgetId ? await G() ? ((z = window.__INITIAL_DATA__) != null && z.workflow && Q.value && await Ve(), !0) : (console.log("$$$ isAuthorized false, setting connection status to connected"), te.value = "connected", !1) : (console.error("Widget data not available after waiting"), !1);
      } catch (Y) {
        return console.error("Failed to initialize widget:", Y), !1;
      }
    }, Yr = () => {
      ne(async () => {
        await G();
      }), window.addEventListener("message", (d) => {
        d.data.type === "SCROLL_TO_BOTTOM" && se(), d.data.type === "TOKEN_RECEIVED" && localStorage.setItem(Yn, d.data.token);
      }), je((d) => {
        var R, z;
        if (console.log("Workflow state received in component:", d), console.log("Data type:", d.type), console.log("Form data:", d.form_data), Ee.value = d.button_text || "Start Chat", d.type === "landing_page")
          console.log("Setting landing page data:", d.landing_page_data), ue.value = d.landing_page_data, X.value = !0, ge.value = !1, console.log("Landing page state - show:", X.value, "data:", ue.value);
        else if (d.type === "form" || d.type === "display_form")
          if (console.log("Form full screen flag:", (R = d.form_data) == null ? void 0 : R.form_full_screen), ((z = d.form_data) == null ? void 0 : z.form_full_screen) === !0)
            console.log("Setting full screen form data:", d.form_data), Oe.value = d.form_data, ge.value = !0, X.value = !1, console.log("Full screen form state - show:", ge.value);
          else {
            console.log("Regular form mode - adding form message to chat");
            const Y = {
              message: "",
              message_type: "form",
              attributes: {
                form_data: d.form_data
              },
              created_at: (/* @__PURE__ */ new Date()).toISOString(),
              isSubmitted: !1
            };
            c.value.findIndex(
              (We) => We.message_type === "form" && !We.isSubmitted
            ) === -1 && c.value.push(Y), X.value = !1, ge.value = !1;
          }
        else
          console.log("No special workflow state, hiding overlay forms"), X.value = !1, ge.value = !1;
      }), Rt((d) => {
        console.log("Workflow proceeded:", d);
      });
    }, Jr = async () => {
      try {
        console.log("Starting new conversation - getting workflow state"), await Ls(), await Ve();
      } catch (d) {
        throw console.error("Failed to start new conversation:", d), d;
      }
    }, Rl = async () => {
      It.value = !1, c.value = [], await Jr();
    };
    ko(async () => {
      await Ls(), Yr(), H(), (() => {
        const R = c.value.length > 0, z = te.value === "connected", Y = document.querySelector('input[type="text"], textarea') !== null;
        return R || z || Y;
      })() && setTimeout(Ze, 100);
    }), Rr(() => {
      window.removeEventListener("message", (d) => {
        d.data.type === "SCROLL_TO_BOTTOM" && se();
      }), be && (be.disconnect(), be = null), H.timeoutId && (clearTimeout(H.timeoutId), H.timeoutId = null), Ut(), de();
    });
    const _n = Be(() => o.value.chat_style === "ASK_ANYTHING"), Il = Be(() => {
      const d = {
        width: "100%",
        height: "580px",
        borderRadius: "var(--radius-lg)"
      };
      return window.innerWidth <= 768 && (d.width = "100vw", d.height = "100vh", d.borderRadius = "0", d.position = "fixed", d.top = "0", d.left = "0", d.bottom = "0", d.right = "0", d.maxWidth = "100vw", d.maxHeight = "100vh"), _n.value ? window.innerWidth <= 768 ? {
        ...d,
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
        minWidth: "unset",
        borderRadius: "0"
      } : window.innerWidth <= 1024 ? {
        ...d,
        width: "95%",
        maxWidth: "700px",
        minWidth: "500px",
        height: "650px"
      } : {
        ...d,
        width: "100%",
        maxWidth: "400px",
        minWidth: "400px",
        height: "580px"
      } : d;
    }), Ol = Be(() => _n.value && c.value.length === 0), Qr = { renderer: n, linkRenderer: s, props: r, widgetId: i, customization: o, agentName: l, applyCustomization: a, initializeFromData: u, messages: c, loading: g, errorMessage: _, showError: A, loadingHistory: N, hasStartedChat: V, connectionStatus: te, socketSendMessage: Z, loadChatHistory: re, connect: ie, reconnect: M, cleanup: de, humanAgent: we, onTakeover: ne, socketSubmitRating: qe, submitForm: k, currentForm: Ae, getWorkflowState: Ve, proceedWorkflow: ae, onWorkflowState: je, onWorkflowProceeded: Rt, newMessage: it, isExpanded: Ie, emailInput: ee, hasConversationToken: Q, handleInputSync: q, get domObserver() {
      return be;
    }, set domObserver(d) {
      be = d;
    }, setupDOMObserver: H, get currentInputFields() {
      return Se;
    }, set currentInputFields(d) {
      Se = d;
    }, setupNativeEventListeners: Ze, cleanupNativeEventListeners: Ut, handleNativeInput: ot, handleNativeKeyPress: ft, handleNativeKeyDown: lt, isInitializing: mt, TOKEN_KEY: Yn, token: et, hasToken: _t, initialData: yt, messagesContainer: f, chatStyles: m, chatIconStyles: b, agentBubbleStyles: T, userBubbleStyles: x, messageNameStyles: C, headerBorderStyles: P, photoUrl: F, shadowStyle: I, hasActiveForm: E, isMessageInputEnabled: W, placeholderText: B, sendMessage: j, handleKeyPress: K, checkAuthorization: G, fetchChatHistory: pe, scrollToBottom: se, handleReconnect: Ue, showRatingDialog: Te, currentRating: Ge, ratingFeedback: h, currentSessionId: p, hoverRating: w, isSubmittingRating: y, formData: S, isSubmittingForm: D, formErrors: U, showLandingPage: X, landingPageData: ue, workflowButtonText: Ee, showFullScreenForm: ge, fullScreenFormData: Oe, ratingEnabled: nt, shouldShowNewConversationOption: It, humanAgentPhotoUrl: Os, handleEndChat: $r, handleStarHover: ml, handleStarLeave: _l, handleStarClick: yl, handleSubmitRating: bl, handleAddToCart: vl, handleAddToCartFromCarousel: wl, validateForm: Zr, handleFormSubmit: kl, handleFieldChange: xl, isValidPhoneNumber: Gr, validateFormField: Hn, submitFullScreenForm: Sl, handleViewDetails: Cl, removeUrls: Tl, handleLandingPageProceed: El, handleUserInputSubmit: Al, initializeWidget: Ls, setupEventListeners: Yr, startNewConversationWorkflow: Jr, handleStartNewConversation: Rl, isAskAnythingStyle: _n, containerStyles: Il, shouldShowWelcomeMessage: Ol, get isValidEmail() {
      return Kn;
    }, get marked() {
      return fe;
    } };
    return Object.defineProperty(Qr, "__isScriptSetup", { enumerable: !1, value: !0 }), Qr;
  }
}), Wh = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, r] of e)
    n[s] = r;
  return n;
}, zh = {
  key: 0,
  class: "initializing-overlay"
}, Kh = {
  key: 0,
  class: "connecting-message"
}, $h = {
  key: 1,
  class: "failed-message"
}, Zh = { class: "welcome-content" }, Gh = { class: "welcome-header" }, Yh = ["src", "alt"], Jh = { class: "welcome-title" }, Qh = { class: "welcome-subtitle" }, Xh = { class: "welcome-input-container" }, ef = {
  key: 0,
  class: "email-input"
}, tf = ["disabled"], nf = { class: "welcome-message-input" }, sf = ["placeholder", "disabled"], rf = ["disabled"], of = { class: "landing-page-content" }, lf = { class: "landing-page-header" }, af = { class: "landing-page-heading" }, cf = { class: "landing-page-text" }, uf = { class: "landing-page-actions" }, hf = { class: "form-fullscreen-content" }, ff = {
  key: 0,
  class: "form-header"
}, df = {
  key: 0,
  class: "form-title"
}, pf = {
  key: 1,
  class: "form-description"
}, gf = { class: "form-fields" }, mf = ["for"], _f = {
  key: 0,
  class: "required-indicator"
}, yf = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "autocomplete", "inputmode"], bf = ["id", "placeholder", "required", "min", "max", "value", "onInput"], vf = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput"], wf = ["id", "required", "value", "onChange"], kf = ["value"], xf = {
  key: 4,
  class: "checkbox-field"
}, Sf = ["id", "required", "checked", "onChange"], Cf = { class: "checkbox-label" }, Tf = {
  key: 5,
  class: "radio-group"
}, Ef = ["name", "value", "required", "checked", "onChange"], Af = { class: "radio-label" }, Rf = {
  key: 6,
  class: "field-error"
}, If = { class: "form-actions" }, Of = ["disabled"], Lf = {
  key: 0,
  class: "loading-spinner-inline"
}, Ff = { key: 1 }, Pf = { class: "header-content" }, Nf = ["src", "alt"], Bf = { class: "header-info" }, Df = { class: "status" }, Mf = { class: "ask-anything-header" }, qf = ["src", "alt"], Uf = { class: "header-info" }, Vf = {
  key: 2,
  class: "loading-history"
}, Hf = {
  class: "chat-messages",
  ref: "messagesContainer"
}, jf = {
  key: 0,
  class: "rating-content"
}, Wf = { class: "rating-prompt" }, zf = ["onMouseover", "onMouseleave", "onClick", "disabled"], Kf = {
  key: 0,
  class: "feedback-wrapper"
}, $f = { class: "feedback-section" }, Zf = ["onUpdate:modelValue", "disabled"], Gf = { class: "feedback-counter" }, Yf = ["onClick", "disabled"], Jf = {
  key: 1,
  class: "submitted-feedback-wrapper"
}, Qf = { class: "submitted-feedback" }, Xf = { class: "submitted-feedback-text" }, ed = {
  key: 2,
  class: "submitted-message"
}, td = {
  key: 1,
  class: "form-content"
}, nd = {
  key: 0,
  class: "form-header"
}, sd = {
  key: 0,
  class: "form-title"
}, rd = {
  key: 1,
  class: "form-description"
}, id = { class: "form-fields" }, od = ["for"], ld = {
  key: 0,
  class: "required-indicator"
}, ad = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "disabled", "autocomplete", "inputmode"], cd = ["id", "placeholder", "required", "min", "max", "value", "onInput", "disabled"], ud = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "disabled"], hd = ["id", "required", "value", "onChange", "disabled"], fd = ["value"], dd = {
  key: 4,
  class: "checkbox-field"
}, pd = ["id", "checked", "onChange", "disabled"], gd = ["for"], md = {
  key: 5,
  class: "radio-field"
}, _d = ["id", "name", "value", "checked", "onChange", "disabled"], yd = ["for"], bd = {
  key: 6,
  class: "field-error"
}, vd = { class: "form-actions" }, wd = ["onClick", "disabled"], kd = {
  key: 2,
  class: "user-input-content"
}, xd = {
  key: 0,
  class: "user-input-prompt"
}, Sd = {
  key: 1,
  class: "user-input-form"
}, Cd = ["onUpdate:modelValue", "onKeydown"], Td = ["onClick", "disabled"], Ed = {
  key: 2,
  class: "user-input-submitted"
}, Ad = {
  key: 0,
  class: "user-input-confirmation"
}, Rd = {
  key: 3,
  class: "product-message-container"
}, Id = ["innerHTML"], Od = {
  key: 1,
  class: "products-carousel"
}, Ld = { class: "carousel-items" }, Fd = {
  key: 0,
  class: "product-image-compact"
}, Pd = ["src", "alt"], Nd = { class: "product-info-compact" }, Bd = { class: "product-text-area" }, Dd = { class: "product-title-compact" }, Md = {
  key: 0,
  class: "product-variant-compact"
}, qd = { class: "product-price-compact" }, Ud = { class: "product-actions-compact" }, Vd = ["onClick"], Hd = {
  key: 2,
  class: "no-products-message"
}, jd = {
  key: 3,
  class: "no-products-message"
}, Wd = ["innerHTML"], zd = { class: "message-info" }, Kd = {
  key: 0,
  class: "agent-name"
}, $d = {
  key: 0,
  class: "typing-indicator"
}, Zd = {
  key: 0,
  class: "email-input"
}, Gd = ["disabled"], Yd = { class: "message-input" }, Jd = ["placeholder", "disabled"], Qd = ["disabled"], Xd = { class: "conversation-ended-message" }, ep = {
  key: 7,
  class: "rating-dialog"
}, tp = { class: "rating-content" }, np = { class: "star-rating" }, sp = ["onClick"], rp = { class: "rating-actions" }, ip = ["disabled"];
function op(t, e, n, s, r, i) {
  return O(), L("div", {
    class: Re(["chat-container", { collapsed: !s.isExpanded, "ask-anything-style": s.isAskAnythingStyle }]),
    style: ve({ ...s.shadowStyle, ...s.containerStyles })
  }, [
    s.isInitializing ? (O(), L("div", zh, e[8] || (e[8] = [
      bc('<div class="loading-spinner" data-v-a3601fa3><div class="dot" data-v-a3601fa3></div><div class="dot" data-v-a3601fa3></div><div class="dot" data-v-a3601fa3></div></div><div class="loading-text" data-v-a3601fa3>Initializing chat...</div>', 2)
    ]))) : oe("", !0),
    !s.isInitializing && s.connectionStatus !== "connected" ? (O(), L("div", {
      key: 1,
      class: Re(["connection-status", s.connectionStatus])
    }, [
      s.connectionStatus === "connecting" ? (O(), L("div", Kh, e[9] || (e[9] = [
        dt(" Connecting to chat service... ", -1),
        v("div", { class: "loading-dots" }, [
          v("div", { class: "dot" }),
          v("div", { class: "dot" }),
          v("div", { class: "dot" })
        ], -1)
      ]))) : s.connectionStatus === "failed" ? (O(), L("div", $h, [
        e[10] || (e[10] = dt(" Connection failed. ", -1)),
        v("button", {
          onClick: s.handleReconnect,
          class: "reconnect-button"
        }, " Click here to reconnect ")
      ])) : oe("", !0)
    ], 2)) : oe("", !0),
    s.showError ? (O(), L("div", {
      key: 2,
      class: "error-alert",
      style: ve(s.chatIconStyles)
    }, le(s.errorMessage), 5)) : oe("", !0),
    s.shouldShowWelcomeMessage ? (O(), L("div", {
      key: 3,
      class: "welcome-message-section",
      style: ve(s.chatStyles)
    }, [
      v("div", Zh, [
        v("div", Gh, [
          s.photoUrl ? (O(), L("img", {
            key: 0,
            src: s.photoUrl,
            alt: s.agentName,
            class: "welcome-avatar"
          }, null, 8, Yh)) : oe("", !0),
          v("h1", Jh, le(s.customization.welcome_title || `Welcome to ${s.agentName}`), 1),
          v("p", Qh, le(s.customization.welcome_subtitle || "I'm here to help you with anything you need. What can I assist you with today?"), 1)
        ])
      ]),
      v("div", Xh, [
        !s.hasStartedChat && !s.hasConversationToken && !s.isAskAnythingStyle ? (O(), L("div", ef, [
          Jt(v("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (o) => s.emailInput = o),
            type: "email",
            placeholder: "Enter your email address",
            disabled: s.loading || s.connectionStatus !== "connected",
            class: Re([{
              invalid: s.emailInput.trim() && !s.isValidEmail(s.emailInput.trim()),
              disabled: s.connectionStatus !== "connected"
            }, "welcome-email-input"])
          }, null, 10, tf), [
            [en, s.emailInput]
          ])
        ])) : oe("", !0),
        v("div", nf, [
          Jt(v("input", {
            "onUpdate:modelValue": e[1] || (e[1] = (o) => s.newMessage = o),
            type: "text",
            placeholder: s.placeholderText,
            onKeypress: s.handleKeyPress,
            onInput: s.handleInputSync,
            onChange: s.handleInputSync,
            disabled: !s.isMessageInputEnabled,
            class: Re([{ disabled: !s.isMessageInputEnabled }, "welcome-message-field"])
          }, null, 42, sf), [
            [en, s.newMessage]
          ]),
          v("button", {
            class: "welcome-send-button",
            style: ve(s.userBubbleStyles),
            onClick: s.sendMessage,
            disabled: !s.newMessage.trim() || !s.isMessageInputEnabled
          }, e[11] || (e[11] = [
            v("svg", {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              v("path", {
                d: "M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              })
            ], -1)
          ]), 12, rf)
        ])
      ]),
      v("div", {
        class: "powered-by-welcome",
        style: ve(s.messageNameStyles)
      }, e[12] || (e[12] = [
        v("svg", {
          class: "chattermate-logo",
          width: "16",
          height: "16",
          viewBox: "0 0 60 60",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, [
          v("path", {
            d: "M45 15H15C13.3431 15 12 16.3431 12 18V42C12 43.6569 13.3431 45 15 45H25L30 52L35 45H45C46.6569 45 48 43.6569 48 42V18C48 16.3431 46.6569 15 45 15Z",
            fill: "currentColor",
            opacity: "0.8"
          }),
          v("path", {
            d: "M36 27C36 27 32.5 26 30 26C27.5 26 24 27 24 31C24 35 27.5 36 30 36C32.5 36 36 35 36 35V33C36 33 33 34 31.5 34C30 34 27 33 27 31C27 29 30 28 31.5 28C33 28 36 29 36 29V27Z",
            fill: "currentColor"
          })
        ], -1),
        dt(" Powered by ChatterMate ", -1)
      ]), 4)
    ], 4)) : oe("", !0),
    s.showLandingPage && s.landingPageData ? (O(), L("div", {
      key: 4,
      class: "landing-page-fullscreen",
      style: ve(s.chatStyles)
    }, [
      v("div", of, [
        v("div", lf, [
          v("h2", af, le(s.landingPageData.heading), 1),
          v("div", cf, le(s.landingPageData.content), 1)
        ]),
        v("div", uf, [
          v("button", {
            class: "landing-page-button",
            onClick: s.handleLandingPageProceed
          }, le(s.workflowButtonText), 1)
        ])
      ]),
      v("div", {
        class: "powered-by-landing",
        style: ve(s.messageNameStyles)
      }, e[13] || (e[13] = [
        v("svg", {
          class: "chattermate-logo",
          width: "16",
          height: "16",
          viewBox: "0 0 60 60",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, [
          v("path", {
            d: "M45 15H15C13.3431 15 12 16.3431 12 18V42C12 43.6569 13.3431 45 15 45H25L30 52L35 45H45C46.6569 45 48 43.6569 48 42V18C48 16.3431 46.6569 15 45 15Z",
            fill: "currentColor",
            opacity: "0.8"
          }),
          v("path", {
            d: "M36 27C36 27 32.5 26 30 26C27.5 26 24 27 24 31C24 35 27.5 36 30 36C32.5 36 36 35 36 35V33C36 33 33 34 31.5 34C30 34 27 33 27 31C27 29 30 28 31.5 28C33 28 36 29 36 29V27Z",
            fill: "currentColor"
          })
        ], -1),
        dt(" Powered by ChatterMate ", -1)
      ]), 4)
    ], 4)) : s.showFullScreenForm && s.fullScreenFormData ? (O(), L("div", {
      key: 5,
      class: "form-fullscreen",
      style: ve(s.chatStyles)
    }, [
      v("div", hf, [
        s.fullScreenFormData.title || s.fullScreenFormData.description ? (O(), L("div", ff, [
          s.fullScreenFormData.title ? (O(), L("h2", df, le(s.fullScreenFormData.title), 1)) : oe("", !0),
          s.fullScreenFormData.description ? (O(), L("p", pf, le(s.fullScreenFormData.description), 1)) : oe("", !0)
        ])) : oe("", !0),
        v("div", gf, [
          (O(!0), L(Ne, null, bt(s.fullScreenFormData.fields, (o) => {
            var l, a;
            return O(), L("div", {
              key: o.name,
              class: "form-field"
            }, [
              v("label", {
                for: `fullscreen-form-${o.name}`,
                class: "field-label"
              }, [
                dt(le(o.label) + " ", 1),
                o.required ? (O(), L("span", _f, "*")) : oe("", !0)
              ], 8, mf),
              o.type === "text" || o.type === "email" || o.type === "tel" ? (O(), L("input", {
                key: 0,
                id: `fullscreen-form-${o.name}`,
                type: o.type,
                placeholder: o.placeholder || "",
                required: o.required,
                minlength: o.minLength,
                maxlength: o.maxLength,
                value: s.formData[o.name] || "",
                onInput: (u) => s.handleFieldChange(o.name, u.target.value),
                onBlur: (u) => s.handleFieldChange(o.name, u.target.value),
                class: Re(["form-input", { error: s.formErrors[o.name] }]),
                autocomplete: o.type === "email" ? "email" : o.type === "tel" ? "tel" : "off",
                inputmode: o.type === "tel" ? "tel" : o.type === "email" ? "email" : "text"
              }, null, 42, yf)) : o.type === "number" ? (O(), L("input", {
                key: 1,
                id: `fullscreen-form-${o.name}`,
                type: "number",
                placeholder: o.placeholder || "",
                required: o.required,
                min: o.minLength,
                max: o.maxLength,
                value: s.formData[o.name] || "",
                onInput: (u) => s.handleFieldChange(o.name, u.target.value),
                class: Re(["form-input", { error: s.formErrors[o.name] }])
              }, null, 42, bf)) : o.type === "textarea" ? (O(), L("textarea", {
                key: 2,
                id: `fullscreen-form-${o.name}`,
                placeholder: o.placeholder || "",
                required: o.required,
                minlength: o.minLength,
                maxlength: o.maxLength,
                value: s.formData[o.name] || "",
                onInput: (u) => s.handleFieldChange(o.name, u.target.value),
                class: Re(["form-textarea", { error: s.formErrors[o.name] }]),
                rows: "4"
              }, null, 42, vf)) : o.type === "select" ? (O(), L("select", {
                key: 3,
                id: `fullscreen-form-${o.name}`,
                required: o.required,
                value: s.formData[o.name] || "",
                onChange: (u) => s.handleFieldChange(o.name, u.target.value),
                class: Re(["form-select", { error: s.formErrors[o.name] }])
              }, [
                e[14] || (e[14] = v("option", { value: "" }, "Please select...", -1)),
                (O(!0), L(Ne, null, bt((l = o.options) == null ? void 0 : l.split(`
`).filter((u) => u.trim()), (u) => (O(), L("option", {
                  key: u,
                  value: u.trim()
                }, le(u.trim()), 9, kf))), 128))
              ], 42, wf)) : o.type === "checkbox" ? (O(), L("label", xf, [
                v("input", {
                  id: `fullscreen-form-${o.name}`,
                  type: "checkbox",
                  required: o.required,
                  checked: s.formData[o.name] || !1,
                  onChange: (u) => s.handleFieldChange(o.name, u.target.checked),
                  class: "form-checkbox"
                }, null, 40, Sf),
                v("span", Cf, le(o.label), 1)
              ])) : o.type === "radio" ? (O(), L("div", Tf, [
                (O(!0), L(Ne, null, bt((a = o.options) == null ? void 0 : a.split(`
`).filter((u) => u.trim()), (u) => (O(), L("label", {
                  key: u,
                  class: "radio-field"
                }, [
                  v("input", {
                    type: "radio",
                    name: `fullscreen-form-${o.name}`,
                    value: u.trim(),
                    required: o.required,
                    checked: s.formData[o.name] === u.trim(),
                    onChange: (c) => s.handleFieldChange(o.name, u.trim()),
                    class: "form-radio"
                  }, null, 40, Ef),
                  v("span", Af, le(u.trim()), 1)
                ]))), 128))
              ])) : oe("", !0),
              s.formErrors[o.name] ? (O(), L("div", Rf, le(s.formErrors[o.name]), 1)) : oe("", !0)
            ]);
          }), 128))
        ]),
        v("div", If, [
          v("button", {
            onClick: e[2] || (e[2] = () => {
              console.log("Submit button clicked!"), s.submitFullScreenForm();
            }),
            disabled: s.isSubmittingForm,
            class: "submit-form-button",
            style: ve(s.userBubbleStyles)
          }, [
            s.isSubmittingForm ? (O(), L("span", Lf, e[15] || (e[15] = [
              v("div", { class: "dot" }, null, -1),
              v("div", { class: "dot" }, null, -1),
              v("div", { class: "dot" }, null, -1)
            ]))) : (O(), L("span", Ff, le(s.fullScreenFormData.submit_button_text || "Submit"), 1))
          ], 12, Of)
        ])
      ]),
      v("div", {
        class: "powered-by-landing",
        style: ve(s.messageNameStyles)
      }, e[16] || (e[16] = [
        v("svg", {
          class: "chattermate-logo",
          width: "16",
          height: "16",
          viewBox: "0 0 60 60",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, [
          v("path", {
            d: "M45 15H15C13.3431 15 12 16.3431 12 18V42C12 43.6569 13.3431 45 15 45H25L30 52L35 45H45C46.6569 45 48 43.6569 48 42V18C48 16.3431 46.6569 15 45 15Z",
            fill: "currentColor",
            opacity: "0.8"
          }),
          v("path", {
            d: "M36 27C36 27 32.5 26 30 26C27.5 26 24 27 24 31C24 35 27.5 36 30 36C32.5 36 36 35 36 35V33C36 33 33 34 31.5 34C30 34 27 33 27 31C27 29 30 28 31.5 28C33 28 36 29 36 29V27Z",
            fill: "currentColor"
          })
        ], -1),
        dt(" Powered by ChatterMate ", -1)
      ]), 4)
    ], 4)) : s.shouldShowWelcomeMessage ? oe("", !0) : (O(), L(Ne, { key: 6 }, [
      s.isExpanded ? (O(), L("div", {
        key: 0,
        class: Re(["chat-panel", { "ask-anything-chat": s.isAskAnythingStyle }]),
        style: ve(s.chatStyles)
      }, [
        s.isAskAnythingStyle ? (O(), L("div", {
          key: 1,
          class: "ask-anything-top",
          style: ve(s.headerBorderStyles)
        }, [
          v("div", Mf, [
            s.humanAgentPhotoUrl || s.photoUrl ? (O(), L("img", {
              key: 0,
              src: s.humanAgentPhotoUrl || s.photoUrl,
              alt: s.humanAgent.human_agent_name || s.agentName,
              class: "header-avatar"
            }, null, 8, qf)) : oe("", !0),
            v("div", Uf, [
              v("h3", {
                style: ve(s.messageNameStyles)
              }, le(s.agentName), 5),
              v("p", {
                class: "ask-anything-subtitle",
                style: ve(s.messageNameStyles)
              }, le(s.customization.welcome_subtitle || "Ask me anything. I'm here to help."), 5)
            ])
          ])
        ], 4)) : (O(), L("div", {
          key: 0,
          class: "chat-header",
          style: ve(s.headerBorderStyles)
        }, [
          v("div", Pf, [
            s.humanAgentPhotoUrl || s.photoUrl ? (O(), L("img", {
              key: 0,
              src: s.humanAgentPhotoUrl || s.photoUrl,
              alt: s.humanAgent.human_agent_name || s.agentName,
              class: "header-avatar"
            }, null, 8, Nf)) : oe("", !0),
            v("div", Bf, [
              v("h3", {
                style: ve(s.messageNameStyles)
              }, le(s.humanAgent.human_agent_name || s.agentName), 5),
              v("div", Df, [
                e[17] || (e[17] = v("span", { class: "status-indicator online" }, null, -1)),
                v("span", {
                  class: "status-text",
                  style: ve(s.messageNameStyles)
                }, "Online", 4)
              ])
            ])
          ])
        ], 4)),
        s.loadingHistory ? (O(), L("div", Vf, e[18] || (e[18] = [
          v("div", { class: "loading-spinner" }, [
            v("div", { class: "dot" }),
            v("div", { class: "dot" }),
            v("div", { class: "dot" })
          ], -1)
        ]))) : oe("", !0),
        v("div", Hf, [
          (O(!0), L(Ne, null, bt(s.messages, (o, l) => {
            var a, u, c, g, _, A, N, V, te, Z, re, ie, M, de, we, ne, qe;
            return O(), L("div", {
              key: l,
              class: Re([
                "message",
                o.message_type === "bot" || o.message_type === "agent" ? "agent-message" : o.message_type === "system" ? "system-message" : o.message_type === "rating" ? "rating-message" : o.message_type === "form" ? "form-message" : o.message_type === "product" || o.shopify_output ? "product-message" : "user-message"
              ])
            }, [
              v("div", {
                class: "message-bubble",
                style: ve(o.message_type === "system" || o.message_type === "rating" || o.message_type === "product" || o.shopify_output ? {} : o.message_type === "user" ? s.userBubbleStyles : s.agentBubbleStyles)
              }, [
                o.message_type === "rating" ? (O(), L("div", jf, [
                  v("p", Wf, "Rate the chat session that you had with " + le(o.agent_name || s.humanAgent.human_agent_name || s.agentName || "our agent"), 1),
                  v("div", {
                    class: Re(["star-rating", { submitted: s.isSubmittingRating || o.isSubmitted }])
                  }, [
                    (O(), L(Ne, null, bt(5, (k) => v("button", {
                      key: k,
                      class: Re(["star-button", {
                        warning: k <= (o.isSubmitted ? o.finalRating : s.hoverRating || o.selectedRating) && (o.isSubmitted ? o.finalRating : s.hoverRating || o.selectedRating) <= 3,
                        success: k <= (o.isSubmitted ? o.finalRating : s.hoverRating || o.selectedRating) && (o.isSubmitted ? o.finalRating : s.hoverRating || o.selectedRating) > 3,
                        selected: k <= (o.isSubmitted ? o.finalRating : s.hoverRating || o.selectedRating)
                      }]),
                      onMouseover: (Ae) => !o.isSubmitted && s.handleStarHover(k),
                      onMouseleave: (Ae) => !o.isSubmitted && s.handleStarLeave,
                      onClick: (Ae) => !o.isSubmitted && s.handleStarClick(k),
                      disabled: s.isSubmittingRating || o.isSubmitted
                    }, " ★ ", 42, zf)), 64))
                  ], 2),
                  o.showFeedback && !o.isSubmitted ? (O(), L("div", Kf, [
                    v("div", $f, [
                      Jt(v("input", {
                        "onUpdate:modelValue": (k) => o.feedback = k,
                        placeholder: "Please share your feedback (optional)",
                        disabled: s.isSubmittingRating,
                        maxlength: "500",
                        class: "feedback-input"
                      }, null, 8, Zf), [
                        [en, o.feedback]
                      ]),
                      v("div", Gf, le(((a = o.feedback) == null ? void 0 : a.length) || 0) + "/500", 1)
                    ]),
                    v("button", {
                      onClick: (k) => s.handleSubmitRating(o.session_id, s.hoverRating, o.feedback),
                      disabled: s.isSubmittingRating || !s.hoverRating,
                      class: "submit-rating-button",
                      style: ve({ backgroundColor: s.customization.accent_color || "var(--primary-color)" })
                    }, le(s.isSubmittingRating ? "Submitting..." : "Submit Rating"), 13, Yf)
                  ])) : oe("", !0),
                  o.isSubmitted && o.finalFeedback ? (O(), L("div", Jf, [
                    v("div", Qf, [
                      v("p", Xf, le(o.finalFeedback), 1)
                    ])
                  ])) : o.isSubmitted ? (O(), L("div", ed, " Thank you for your rating! ")) : oe("", !0)
                ])) : o.message_type === "form" ? (O(), L("div", td, [
                  (c = (u = o.attributes) == null ? void 0 : u.form_data) != null && c.title || (_ = (g = o.attributes) == null ? void 0 : g.form_data) != null && _.description ? (O(), L("div", nd, [
                    (N = (A = o.attributes) == null ? void 0 : A.form_data) != null && N.title ? (O(), L("h3", sd, le(o.attributes.form_data.title), 1)) : oe("", !0),
                    (te = (V = o.attributes) == null ? void 0 : V.form_data) != null && te.description ? (O(), L("p", rd, le(o.attributes.form_data.description), 1)) : oe("", !0)
                  ])) : oe("", !0),
                  v("div", id, [
                    (O(!0), L(Ne, null, bt((re = (Z = o.attributes) == null ? void 0 : Z.form_data) == null ? void 0 : re.fields, (k) => {
                      var Ae, Ve;
                      return O(), L("div", {
                        key: k.name,
                        class: "form-field"
                      }, [
                        v("label", {
                          for: `form-${k.name}`,
                          class: "field-label"
                        }, [
                          dt(le(k.label) + " ", 1),
                          k.required ? (O(), L("span", ld, "*")) : oe("", !0)
                        ], 8, od),
                        k.type === "text" || k.type === "email" || k.type === "tel" ? (O(), L("input", {
                          key: 0,
                          id: `form-${k.name}`,
                          type: k.type,
                          placeholder: k.placeholder || "",
                          required: k.required,
                          minlength: k.minLength,
                          maxlength: k.maxLength,
                          value: s.formData[k.name] || "",
                          onInput: (ae) => s.handleFieldChange(k.name, ae.target.value),
                          onBlur: (ae) => s.handleFieldChange(k.name, ae.target.value),
                          class: Re(["form-input", { error: s.formErrors[k.name] }]),
                          disabled: s.isSubmittingForm,
                          autocomplete: k.type === "email" ? "email" : k.type === "tel" ? "tel" : "off",
                          inputmode: k.type === "tel" ? "tel" : k.type === "email" ? "email" : "text"
                        }, null, 42, ad)) : k.type === "number" ? (O(), L("input", {
                          key: 1,
                          id: `form-${k.name}`,
                          type: "number",
                          placeholder: k.placeholder || "",
                          required: k.required,
                          min: k.min,
                          max: k.max,
                          value: s.formData[k.name] || "",
                          onInput: (ae) => s.handleFieldChange(k.name, ae.target.value),
                          class: Re(["form-input", { error: s.formErrors[k.name] }]),
                          disabled: s.isSubmittingForm
                        }, null, 42, cd)) : k.type === "textarea" ? (O(), L("textarea", {
                          key: 2,
                          id: `form-${k.name}`,
                          placeholder: k.placeholder || "",
                          required: k.required,
                          minlength: k.minLength,
                          maxlength: k.maxLength,
                          value: s.formData[k.name] || "",
                          onInput: (ae) => s.handleFieldChange(k.name, ae.target.value),
                          class: Re(["form-textarea", { error: s.formErrors[k.name] }]),
                          disabled: s.isSubmittingForm,
                          rows: "3"
                        }, null, 42, ud)) : k.type === "select" ? (O(), L("select", {
                          key: 3,
                          id: `form-${k.name}`,
                          required: k.required,
                          value: s.formData[k.name] || "",
                          onChange: (ae) => s.handleFieldChange(k.name, ae.target.value),
                          class: Re(["form-select", { error: s.formErrors[k.name] }]),
                          disabled: s.isSubmittingForm
                        }, [
                          e[19] || (e[19] = v("option", { value: "" }, "Select an option", -1)),
                          (O(!0), L(Ne, null, bt(((Ae = k.options) == null ? void 0 : Ae.split(",")) || [], (ae) => (O(), L("option", {
                            key: ae.trim(),
                            value: ae.trim()
                          }, le(ae.trim()), 9, fd))), 128))
                        ], 42, hd)) : k.type === "checkbox" ? (O(), L("div", dd, [
                          v("input", {
                            id: `form-${k.name}`,
                            type: "checkbox",
                            checked: s.formData[k.name] || !1,
                            onChange: (ae) => s.handleFieldChange(k.name, ae.target.checked),
                            class: "form-checkbox",
                            disabled: s.isSubmittingForm
                          }, null, 40, pd),
                          v("label", {
                            for: `form-${k.name}`,
                            class: "checkbox-label"
                          }, le(k.placeholder || k.label), 9, gd)
                        ])) : k.type === "radio" ? (O(), L("div", md, [
                          (O(!0), L(Ne, null, bt(((Ve = k.options) == null ? void 0 : Ve.split(",")) || [], (ae) => (O(), L("div", {
                            key: ae.trim(),
                            class: "radio-option"
                          }, [
                            v("input", {
                              id: `form-${k.name}-${ae.trim()}`,
                              name: `form-${k.name}`,
                              type: "radio",
                              value: ae.trim(),
                              checked: s.formData[k.name] === ae.trim(),
                              onChange: (je) => s.handleFieldChange(k.name, ae.trim()),
                              class: "form-radio",
                              disabled: s.isSubmittingForm
                            }, null, 40, _d),
                            v("label", {
                              for: `form-${k.name}-${ae.trim()}`,
                              class: "radio-label"
                            }, le(ae.trim()), 9, yd)
                          ]))), 128))
                        ])) : oe("", !0),
                        s.formErrors[k.name] ? (O(), L("div", bd, le(s.formErrors[k.name]), 1)) : oe("", !0)
                      ]);
                    }), 128))
                  ]),
                  v("div", vd, [
                    v("button", {
                      onClick: () => {
                        var k;
                        console.log("Regular form submit button clicked!"), s.handleFormSubmit((k = o.attributes) == null ? void 0 : k.form_data);
                      },
                      disabled: s.isSubmittingForm,
                      class: "form-submit-button",
                      style: ve(s.userBubbleStyles)
                    }, le(s.isSubmittingForm ? "Submitting..." : ((M = (ie = o.attributes) == null ? void 0 : ie.form_data) == null ? void 0 : M.submit_button_text) || "Submit"), 13, wd)
                  ])
                ])) : o.message_type === "user_input" ? (O(), L("div", kd, [
                  (de = o.attributes) != null && de.prompt_message && o.attributes.prompt_message.trim() ? (O(), L("div", xd, le(o.attributes.prompt_message), 1)) : oe("", !0),
                  o.isSubmitted ? (O(), L("div", Ed, [
                    e[20] || (e[20] = v("strong", null, "Your input:", -1)),
                    dt(" " + le(o.submittedValue) + " ", 1),
                    (we = o.attributes) != null && we.confirmation_message && o.attributes.confirmation_message.trim() ? (O(), L("div", Ad, le(o.attributes.confirmation_message), 1)) : oe("", !0)
                  ])) : (O(), L("div", Sd, [
                    Jt(v("textarea", {
                      "onUpdate:modelValue": (k) => o.userInputValue = k,
                      class: "user-input-textarea",
                      placeholder: "Type your message here...",
                      rows: "3",
                      onKeydown: [
                        Ri(Ai((k) => s.handleUserInputSubmit(o), ["ctrl"]), ["enter"]),
                        Ri(Ai((k) => s.handleUserInputSubmit(o), ["meta"]), ["enter"])
                      ]
                    }, null, 40, Cd), [
                      [en, o.userInputValue]
                    ]),
                    v("button", {
                      class: "user-input-submit-button",
                      onClick: (k) => s.handleUserInputSubmit(o),
                      disabled: !o.userInputValue || !o.userInputValue.trim()
                    }, " Submit ", 8, Td)
                  ]))
                ])) : o.shopify_output || o.message_type === "product" ? (O(), L("div", Rd, [
                  o.message ? (O(), L("div", {
                    key: 0,
                    innerHTML: s.marked(s.removeUrls(o.message), { renderer: s.renderer }),
                    class: "product-message-text"
                  }, null, 8, Id)) : oe("", !0),
                  (ne = o.shopify_output) != null && ne.products && o.shopify_output.products.length > 0 ? (O(), L("div", Od, [
                    e[22] || (e[22] = v("h3", { class: "carousel-title" }, "Products", -1)),
                    v("div", Ld, [
                      (O(!0), L(Ne, null, bt(o.shopify_output.products, (k) => {
                        var Ae;
                        return O(), L("div", {
                          key: k.id,
                          class: "product-card-compact carousel-item"
                        }, [
                          (Ae = k.image) != null && Ae.src ? (O(), L("div", Fd, [
                            v("img", {
                              src: k.image.src,
                              alt: k.title,
                              class: "product-thumbnail"
                            }, null, 8, Pd)
                          ])) : oe("", !0),
                          v("div", Nd, [
                            v("div", Bd, [
                              v("div", Dd, le(k.title), 1),
                              k.variant_title && k.variant_title !== "Default Title" ? (O(), L("div", Md, le(k.variant_title), 1)) : oe("", !0),
                              v("div", qd, le(k.price_formatted || `₹${k.price}`), 1)
                            ]),
                            v("div", Ud, [
                              v("button", {
                                class: "view-details-button-compact",
                                onClick: (Ve) => s.handleViewDetails(k.id)
                              }, [...e[21] || (e[21] = [
                                dt(" View product ", -1),
                                v("span", { class: "external-link-icon" }, "↗", -1)
                              ])], 8, Vd)
                            ])
                          ])
                        ]);
                      }), 128))
                    ])
                  ])) : (qe = o.shopify_output) != null && qe.products && o.shopify_output.products.length === 0 ? (O(), L("div", Hd, [...e[23] || (e[23] = [
                    v("p", null, "No products found.", -1)
                  ])])) : o.shopify_output && !o.shopify_output.products ? (O(), L("div", jd, [...e[24] || (e[24] = [
                    v("p", null, "No products to display.", -1)
                  ])])) : oe("", !0)
                ])) : (O(), L("div", {
                  key: 4,
                  innerHTML: s.marked(o.message, { renderer: s.renderer })
                }, null, 8, Wd))
              ], 4),
              v("div", zd, [
                o.message_type === "user" ? (O(), L("span", Kd, " You ")) : oe("", !0)
              ])
            ], 2);
          }), 128)),
          s.loading ? (O(), L("div", $d, e[25] || (e[25] = [
            v("div", { class: "dot" }, null, -1),
            v("div", { class: "dot" }, null, -1),
            v("div", { class: "dot" }, null, -1)
          ]))) : oe("", !0)
        ], 512),
        s.shouldShowNewConversationOption ? (O(), L("div", {
          key: 4,
          class: "new-conversation-section",
          style: ve(s.agentBubbleStyles)
        }, [
          v("div", Xd, [
            e[27] || (e[27] = v("p", { class: "ended-text" }, "This chat has ended.", -1)),
            v("button", {
              class: "start-new-conversation-button",
              style: ve(s.userBubbleStyles),
              onClick: s.handleStartNewConversation
            }, " Click here to start a new conversation ", 4)
          ])
        ], 4)) : (O(), L("div", {
          key: 3,
          class: Re(["chat-input", { "ask-anything-input": s.isAskAnythingStyle }]),
          style: ve(s.agentBubbleStyles)
        }, [
          !s.hasStartedChat && !s.hasConversationToken && !s.isAskAnythingStyle ? (O(), L("div", Zd, [
            Jt(v("input", {
              "onUpdate:modelValue": e[3] || (e[3] = (o) => s.emailInput = o),
              type: "email",
              placeholder: "Enter your email address to begin",
              disabled: s.loading || s.connectionStatus !== "connected",
              class: Re({
                invalid: s.emailInput.trim() && !s.isValidEmail(s.emailInput.trim()),
                disabled: s.connectionStatus !== "connected"
              })
            }, null, 10, Gd), [
              [en, s.emailInput]
            ])
          ])) : oe("", !0),
          v("div", Yd, [
            Jt(v("input", {
              "onUpdate:modelValue": e[4] || (e[4] = (o) => s.newMessage = o),
              type: "text",
              placeholder: s.placeholderText,
              onKeypress: s.handleKeyPress,
              onInput: s.handleInputSync,
              onChange: s.handleInputSync,
              disabled: !s.isMessageInputEnabled,
              class: Re({ disabled: !s.isMessageInputEnabled, "ask-anything-field": s.isAskAnythingStyle })
            }, null, 42, Jd), [
              [en, s.newMessage]
            ]),
            v("button", {
              class: Re(["send-button", { "ask-anything-send": s.isAskAnythingStyle }]),
              style: ve(s.userBubbleStyles),
              onClick: s.sendMessage,
              disabled: !s.newMessage.trim() || !s.isMessageInputEnabled
            }, e[26] || (e[26] = [
              v("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                v("path", {
                  d: "M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1)
            ]), 14, Qd)
          ])
        ], 6)),
        v("div", {
          class: "powered-by",
          style: ve(s.messageNameStyles)
        }, e[28] || (e[28] = [
          v("svg", {
            class: "chattermate-logo",
            width: "16",
            height: "16",
            viewBox: "0 0 60 60",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            v("path", {
              d: "M45 15H15C13.3431 15 12 16.3431 12 18V42C12 43.6569 13.3431 45 15 45H25L30 52L35 45H45C46.6569 45 48 43.6569 48 42V18C48 16.3431 46.6569 15 45 15Z",
              fill: "currentColor",
              opacity: "0.8"
            }),
            v("path", {
              d: "M36 27C36 27 32.5 26 30 26C27.5 26 24 27 24 31C24 35 27.5 36 30 36C32.5 36 36 35 36 35V33C36 33 33 34 31.5 34C30 34 27 33 27 31C27 29 30 28 31.5 28C33 28 36 29 36 29V27Z",
              fill: "currentColor"
            })
          ], -1),
          dt(" Powered by ChatterMate ", -1)
        ]), 4)
      ], 6)) : oe("", !0)
    ], 64)),
    s.showRatingDialog ? (O(), L("div", ep, [
      v("div", tp, [
        e[29] || (e[29] = v("h3", null, "Rate your conversation", -1)),
        v("div", np, [
          (O(), L(Ne, null, bt(5, (o) => v("button", {
            key: o,
            onClick: (l) => s.currentRating = o,
            class: Re([{ active: o <= s.currentRating }, "star-button"])
          }, " ★ ", 10, sp)), 64))
        ]),
        Jt(v("textarea", {
          "onUpdate:modelValue": e[5] || (e[5] = (o) => s.ratingFeedback = o),
          placeholder: "Additional feedback (optional)",
          class: "rating-feedback"
        }, null, 512), [
          [en, s.ratingFeedback]
        ]),
        v("div", rp, [
          v("button", {
            onClick: e[6] || (e[6] = (o) => t.submitRating(s.currentRating, s.ratingFeedback)),
            disabled: !s.currentRating,
            class: "submit-button",
            style: ve(s.userBubbleStyles)
          }, " Submit ", 12, ip),
          v("button", {
            onClick: e[7] || (e[7] = (o) => s.showRatingDialog = !1),
            class: "skip-rating"
          }, " Skip ")
        ])
      ])
    ])) : oe("", !0)
  ], 6);
}
const lp = /* @__PURE__ */ Wh(jh, [["render", op], ["__scopeId", "data-v-a3601fa3"], ["__file", "/Users/arunrajkumar/Documents/Personal/code/chattermate.chat/frontend/src/webclient/WidgetBuilder.vue"]]);
window.process || (window.process = { env: { NODE_ENV: "production" } });
const ap = new URL(window.location.href), cp = ap.searchParams.get("widget_id"), up = nu(lp, {
  widgetId: cp
});
up.mount("#app");
