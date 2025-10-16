var Ul = Object.defineProperty;
var jl = (e, t, n) => t in e ? Ul(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ce = (e, t, n) => jl(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function wr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Te = {}, _n = [], At = () => {
}, Wl = () => !1, vs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), kr = (e) => e.startsWith("onUpdate:"), Ke = Object.assign, xr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, zl = Object.prototype.hasOwnProperty, be = (e, t) => zl.call(e, t), Y = Array.isArray, yn = (e) => ws(e) === "[object Map]", ro = (e) => ws(e) === "[object Set]", Q = (e) => typeof e == "function", De = (e) => typeof e == "string", tn = (e) => typeof e == "symbol", $e = (e) => e !== null && typeof e == "object", io = (e) => ($e(e) || Q(e)) && Q(e.then) && Q(e.catch), oo = Object.prototype.toString, ws = (e) => oo.call(e), Kl = (e) => ws(e).slice(8, -1), lo = (e) => ws(e) === "[object Object]", Sr = (e) => De(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ln = /* @__PURE__ */ wr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ks = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Gl = /-(\w)/g, Qt = ks(
  (e) => e.replace(Gl, (t, n) => n ? n.toUpperCase() : "")
), Zl = /\B([A-Z])/g, nn = ks(
  (e) => e.replace(Zl, "-$1").toLowerCase()
), ao = ks((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ms = ks(
  (e) => e ? `on${ao(e)}` : ""
), Yt = (e, t) => !Object.is(e, t), es = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, er = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, tr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let gi;
const xs = () => gi || (gi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function we(e) {
  if (Y(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = De(s) ? Xl(s) : we(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (De(e) || $e(e))
    return e;
}
const Yl = /;(?![^(]*\))/g, Jl = /:([^]+)/, Ql = /\/\*[^]*?\*\//g;
function Xl(e) {
  const t = {};
  return e.replace(Ql, "").split(Yl).forEach((n) => {
    if (n) {
      const s = n.split(Jl);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Pe(e) {
  let t = "";
  if (De(e))
    t = e;
  else if (Y(e))
    for (let n = 0; n < e.length; n++) {
      const s = Pe(e[n]);
      s && (t += s + " ");
    }
  else if ($e(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const ea = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ta = /* @__PURE__ */ wr(ea);
function co(e) {
  return !!e || e === "";
}
const uo = (e) => !!(e && e.__v_isRef === !0), se = (e) => De(e) ? e : e == null ? "" : Y(e) || $e(e) && (e.toString === oo || !Q(e.toString)) ? uo(e) ? se(e.value) : JSON.stringify(e, fo, 2) : String(e), fo = (e, t) => uo(t) ? fo(e, t.value) : yn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[Ds(s, i) + " =>"] = r, n),
    {}
  )
} : ro(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ds(n))
} : tn(t) ? Ds(t) : $e(t) && !Y(t) && !lo(t) ? String(t) : t, Ds = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    tn(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let nt;
class na {
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
function sa() {
  return nt;
}
let Re;
const qs = /* @__PURE__ */ new WeakSet();
class ho {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, nt && nt.active && nt.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, qs.has(this) && (qs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || go(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, mi(this), mo(this);
    const t = Re, n = vt;
    Re = this, vt = !0;
    try {
      return this.fn();
    } finally {
      _o(this), Re = t, vt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Er(t);
      this.deps = this.depsTail = void 0, mi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? qs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    nr(this) && this.run();
  }
  get dirty() {
    return nr(this);
  }
}
let po = 0, Pn, $n;
function go(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = $n, $n = e;
    return;
  }
  e.next = Pn, Pn = e;
}
function Cr() {
  po++;
}
function Tr() {
  if (--po > 0)
    return;
  if ($n) {
    let t = $n;
    for ($n = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Pn; ) {
    let t = Pn;
    for (Pn = void 0; t; ) {
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
function mo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function _o(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), Er(s), ra(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function nr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (yo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function yo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === qn) || (e.globalVersion = qn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !nr(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = Re, s = vt;
  Re = e, vt = !0;
  try {
    mo(e);
    const r = e.fn(e._value);
    (t.version === 0 || Yt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    Re = n, vt = s, _o(e), e.flags &= -3;
  }
}
function Er(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      Er(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function ra(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let vt = !0;
const bo = [];
function Dt() {
  bo.push(vt), vt = !1;
}
function qt() {
  const e = bo.pop();
  vt = e === void 0 ? !0 : e;
}
function mi(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = Re;
    Re = void 0;
    try {
      t();
    } finally {
      Re = n;
    }
  }
}
let qn = 0;
class ia {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ar {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Re || !vt || Re === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Re)
      n = this.activeLink = new ia(Re, this), Re.deps ? (n.prevDep = Re.depsTail, Re.depsTail.nextDep = n, Re.depsTail = n) : Re.deps = Re.depsTail = n, vo(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = Re.depsTail, n.nextDep = void 0, Re.depsTail.nextDep = n, Re.depsTail = n, Re.deps === n && (Re.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, qn++, this.notify(t);
  }
  notify(t) {
    Cr();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Tr();
    }
  }
}
function vo(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        vo(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const sr = /* @__PURE__ */ new WeakMap(), fn = Symbol(
  ""
), rr = Symbol(
  ""
), Vn = Symbol(
  ""
);
function We(e, t, n) {
  if (vt && Re) {
    let s = sr.get(e);
    s || sr.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new Ar()), r.map = s, r.key = n), r.track();
  }
}
function Nt(e, t, n, s, r, i) {
  const o = sr.get(e);
  if (!o) {
    qn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (Cr(), t === "clear")
    o.forEach(l);
  else {
    const a = Y(e), u = a && Sr(n);
    if (a && n === "length") {
      const f = Number(s);
      o.forEach((_, v) => {
        (v === "length" || v === Vn || !tn(v) && v >= f) && l(_);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), u && l(o.get(Vn)), t) {
        case "add":
          a ? u && l(o.get("length")) : (l(o.get(fn)), yn(e) && l(o.get(rr)));
          break;
        case "delete":
          a || (l(o.get(fn)), yn(e) && l(o.get(rr)));
          break;
        case "set":
          yn(e) && l(o.get(fn));
          break;
      }
  }
  Tr();
}
function pn(e) {
  const t = ye(e);
  return t === e ? t : (We(t, "iterate", Vn), dt(e) ? t : t.map(Ue));
}
function Ss(e) {
  return We(e = ye(e), "iterate", Vn), e;
}
const oa = {
  __proto__: null,
  [Symbol.iterator]() {
    return Vs(this, Symbol.iterator, Ue);
  },
  concat(...e) {
    return pn(this).concat(
      ...e.map((t) => Y(t) ? pn(t) : t)
    );
  },
  entries() {
    return Vs(this, "entries", (e) => (e[1] = Ue(e[1]), e));
  },
  every(e, t) {
    return Pt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Pt(this, "filter", e, t, (n) => n.map(Ue), arguments);
  },
  find(e, t) {
    return Pt(this, "find", e, t, Ue, arguments);
  },
  findIndex(e, t) {
    return Pt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Pt(this, "findLast", e, t, Ue, arguments);
  },
  findLastIndex(e, t) {
    return Pt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Pt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Hs(this, "includes", e);
  },
  indexOf(...e) {
    return Hs(this, "indexOf", e);
  },
  join(e) {
    return pn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return Hs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Pt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Sn(this, "pop");
  },
  push(...e) {
    return Sn(this, "push", e);
  },
  reduce(e, ...t) {
    return _i(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return _i(this, "reduceRight", e, t);
  },
  shift() {
    return Sn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Pt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Sn(this, "splice", e);
  },
  toReversed() {
    return pn(this).toReversed();
  },
  toSorted(e) {
    return pn(this).toSorted(e);
  },
  toSpliced(...e) {
    return pn(this).toSpliced(...e);
  },
  unshift(...e) {
    return Sn(this, "unshift", e);
  },
  values() {
    return Vs(this, "values", Ue);
  }
};
function Vs(e, t, n) {
  const s = Ss(e), r = s[t]();
  return s !== e && !dt(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.value && (i.value = n(i.value)), i;
  }), r;
}
const la = Array.prototype;
function Pt(e, t, n, s, r, i) {
  const o = Ss(e), l = o !== e && !dt(e), a = o[t];
  if (a !== la[t]) {
    const _ = a.apply(e, i);
    return l ? Ue(_) : _;
  }
  let u = n;
  o !== e && (l ? u = function(_, v) {
    return n.call(this, Ue(_), v, e);
  } : n.length > 2 && (u = function(_, v) {
    return n.call(this, _, v, e);
  }));
  const f = a.call(o, u, s);
  return l && r ? r(f) : f;
}
function _i(e, t, n, s) {
  const r = Ss(e);
  let i = n;
  return r !== e && (dt(e) ? n.length > 3 && (i = function(o, l, a) {
    return n.call(this, o, l, a, e);
  }) : i = function(o, l, a) {
    return n.call(this, o, Ue(l), a, e);
  }), r[t](i, ...s);
}
function Hs(e, t, n) {
  const s = ye(e);
  We(s, "iterate", Vn);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Lr(n[0]) ? (n[0] = ye(n[0]), s[t](...n)) : r;
}
function Sn(e, t, n = []) {
  Dt(), Cr();
  const s = ye(e)[t].apply(e, n);
  return Tr(), qt(), s;
}
const aa = /* @__PURE__ */ wr("__proto__,__v_isRef,__isVue"), wo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(tn)
);
function ca(e) {
  tn(e) || (e = String(e));
  const t = ye(this);
  return We(t, "has", e), t.hasOwnProperty(e);
}
class ko {
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
      return s === (r ? i ? ba : To : i ? Co : So).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = Y(t);
    if (!r) {
      let a;
      if (o && (a = oa[n]))
        return a;
      if (n === "hasOwnProperty")
        return ca;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      ze(t) ? t : s
    );
    return (tn(n) ? wo.has(n) : aa(n)) || (r || We(t, "get", n), i) ? l : ze(l) ? o && Sr(n) ? l : l.value : $e(l) ? r ? Eo(l) : Ir(l) : l;
  }
}
class xo extends ko {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    if (!this._isShallow) {
      const a = Xt(i);
      if (!dt(s) && !Xt(s) && (i = ye(i), s = ye(s)), !Y(t) && ze(i) && !ze(s))
        return a ? !1 : (i.value = s, !0);
    }
    const o = Y(t) && Sr(n) ? Number(n) < t.length : be(t, n), l = Reflect.set(
      t,
      n,
      s,
      ze(t) ? t : r
    );
    return t === ye(r) && (o ? Yt(s, i) && Nt(t, "set", n, s) : Nt(t, "add", n, s)), l;
  }
  deleteProperty(t, n) {
    const s = be(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Nt(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!tn(n) || !wo.has(n)) && We(t, "has", n), s;
  }
  ownKeys(t) {
    return We(
      t,
      "iterate",
      Y(t) ? "length" : fn
    ), Reflect.ownKeys(t);
  }
}
class ua extends ko {
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
const fa = /* @__PURE__ */ new xo(), ha = /* @__PURE__ */ new ua(), da = /* @__PURE__ */ new xo(!0);
const ir = (e) => e, Gn = (e) => Reflect.getPrototypeOf(e);
function pa(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = ye(r), o = yn(i), l = e === "entries" || e === Symbol.iterator && o, a = e === "keys" && o, u = r[e](...s), f = n ? ir : t ? us : Ue;
    return !t && We(
      i,
      "iterate",
      a ? rr : fn
    ), {
      // iterator protocol
      next() {
        const { value: _, done: v } = u.next();
        return v ? { value: _, done: v } : {
          value: l ? [f(_[0]), f(_[1])] : f(_),
          done: v
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Zn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ga(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = ye(i), l = ye(r);
      e || (Yt(r, l) && We(o, "get", r), We(o, "get", l));
      const { has: a } = Gn(o), u = t ? ir : e ? us : Ue;
      if (a.call(o, r))
        return u(i.get(r));
      if (a.call(o, l))
        return u(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && We(ye(r), "iterate", fn), Reflect.get(r, "size", r);
    },
    has(r) {
      const i = this.__v_raw, o = ye(i), l = ye(r);
      return e || (Yt(r, l) && We(o, "has", r), We(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, a = ye(l), u = t ? ir : e ? us : Ue;
      return !e && We(a, "iterate", fn), l.forEach((f, _) => r.call(i, u(f), u(_), o));
    }
  };
  return Ke(
    n,
    e ? {
      add: Zn("add"),
      set: Zn("set"),
      delete: Zn("delete"),
      clear: Zn("clear")
    } : {
      add(r) {
        !t && !dt(r) && !Xt(r) && (r = ye(r));
        const i = ye(this);
        return Gn(i).has.call(i, r) || (i.add(r), Nt(i, "add", r, r)), this;
      },
      set(r, i) {
        !t && !dt(i) && !Xt(i) && (i = ye(i));
        const o = ye(this), { has: l, get: a } = Gn(o);
        let u = l.call(o, r);
        u || (r = ye(r), u = l.call(o, r));
        const f = a.call(o, r);
        return o.set(r, i), u ? Yt(i, f) && Nt(o, "set", r, i) : Nt(o, "add", r, i), this;
      },
      delete(r) {
        const i = ye(this), { has: o, get: l } = Gn(i);
        let a = o.call(i, r);
        a || (r = ye(r), a = o.call(i, r)), l && l.call(i, r);
        const u = i.delete(r);
        return a && Nt(i, "delete", r, void 0), u;
      },
      clear() {
        const r = ye(this), i = r.size !== 0, o = r.clear();
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
    n[r] = pa(r, e, t);
  }), n;
}
function Rr(e, t) {
  const n = ga(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    be(n, r) && r in s ? n : s,
    r,
    i
  );
}
const ma = {
  get: /* @__PURE__ */ Rr(!1, !1)
}, _a = {
  get: /* @__PURE__ */ Rr(!1, !0)
}, ya = {
  get: /* @__PURE__ */ Rr(!0, !1)
};
const So = /* @__PURE__ */ new WeakMap(), Co = /* @__PURE__ */ new WeakMap(), To = /* @__PURE__ */ new WeakMap(), ba = /* @__PURE__ */ new WeakMap();
function va(e) {
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
function wa(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : va(Kl(e));
}
function Ir(e) {
  return Xt(e) ? e : Or(
    e,
    !1,
    fa,
    ma,
    So
  );
}
function ka(e) {
  return Or(
    e,
    !1,
    da,
    _a,
    Co
  );
}
function Eo(e) {
  return Or(
    e,
    !0,
    ha,
    ya,
    To
  );
}
function Or(e, t, n, s, r) {
  if (!$e(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = wa(e);
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
function bn(e) {
  return Xt(e) ? bn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Xt(e) {
  return !!(e && e.__v_isReadonly);
}
function dt(e) {
  return !!(e && e.__v_isShallow);
}
function Lr(e) {
  return e ? !!e.__v_raw : !1;
}
function ye(e) {
  const t = e && e.__v_raw;
  return t ? ye(t) : e;
}
function xa(e) {
  return !be(e, "__v_skip") && Object.isExtensible(e) && er(e, "__v_skip", !0), e;
}
const Ue = (e) => $e(e) ? Ir(e) : e, us = (e) => $e(e) ? Eo(e) : e;
function ze(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function he(e) {
  return Sa(e, !1);
}
function Sa(e, t) {
  return ze(e) ? e : new Ca(e, t);
}
class Ca {
  constructor(t, n) {
    this.dep = new Ar(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : ye(t), this._value = n ? t : Ue(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || dt(t) || Xt(t);
    t = s ? t : ye(t), Yt(t, n) && (this._rawValue = t, this._value = s ? t : Ue(t), this.dep.trigger());
  }
}
function D(e) {
  return ze(e) ? e.value : e;
}
const Ta = {
  get: (e, t, n) => t === "__v_raw" ? e : D(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return ze(r) && !ze(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Ao(e) {
  return bn(e) ? e : new Proxy(e, Ta);
}
class Ea {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ar(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = qn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Re !== this)
      return go(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return yo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Aa(e, t, n = !1) {
  let s, r;
  return Q(e) ? s = e : (s = e.get, r = e.set), new Ea(s, r, n);
}
const Yn = {}, fs = /* @__PURE__ */ new WeakMap();
let cn;
function Ra(e, t = !1, n = cn) {
  if (n) {
    let s = fs.get(n);
    s || fs.set(n, s = []), s.push(e);
  }
}
function Ia(e, t, n = Te) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: a } = n, u = (H) => r ? H : dt(H) || r === !1 || r === 0 ? Bt(H, 1) : Bt(H);
  let f, _, v, I, B = !1, q = !1;
  if (ze(e) ? (_ = () => e.value, B = dt(e)) : bn(e) ? (_ = () => u(e), B = !0) : Y(e) ? (q = !0, B = e.some((H) => bn(H) || dt(H)), _ = () => e.map((H) => {
    if (ze(H))
      return H.value;
    if (bn(H))
      return u(H);
    if (Q(H))
      return a ? a(H, 2) : H();
  })) : Q(e) ? t ? _ = a ? () => a(e, 2) : e : _ = () => {
    if (v) {
      Dt();
      try {
        v();
      } finally {
        qt();
      }
    }
    const H = cn;
    cn = f;
    try {
      return a ? a(e, 3, [I]) : e(I);
    } finally {
      cn = H;
    }
  } : _ = At, t && r) {
    const H = _, le = r === !0 ? 1 / 0 : r;
    _ = () => Bt(H(), le);
  }
  const ke = sa(), te = () => {
    f.stop(), ke && ke.active && xr(ke.effects, f);
  };
  if (i && t) {
    const H = t;
    t = (...le) => {
      H(...le), te();
    };
  }
  let de = q ? new Array(e.length).fill(Yn) : Yn;
  const pe = (H) => {
    if (!(!(f.flags & 1) || !f.dirty && !H))
      if (t) {
        const le = f.run();
        if (r || B || (q ? le.some((qe, fe) => Yt(qe, de[fe])) : Yt(le, de))) {
          v && v();
          const qe = cn;
          cn = f;
          try {
            const fe = [
              le,
              // pass undefined as the old value when it's changed for the first time
              de === Yn ? void 0 : q && de[0] === Yn ? [] : de,
              I
            ];
            de = le, a ? a(t, 3, fe) : (
              // @ts-expect-error
              t(...fe)
            );
          } finally {
            cn = qe;
          }
        }
      } else
        f.run();
  };
  return l && l(pe), f = new ho(_), f.scheduler = o ? () => o(pe, !1) : pe, I = (H) => Ra(H, !1, f), v = f.onStop = () => {
    const H = fs.get(f);
    if (H) {
      if (a)
        a(H, 4);
      else
        for (const le of H) le();
      fs.delete(f);
    }
  }, t ? s ? pe(!0) : de = f.run() : o ? o(pe.bind(null, !0), !0) : f.run(), te.pause = f.pause.bind(f), te.resume = f.resume.bind(f), te.stop = te, te;
}
function Bt(e, t = 1 / 0, n) {
  if (t <= 0 || !$e(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, ze(e))
    Bt(e.value, t, n);
  else if (Y(e))
    for (let s = 0; s < e.length; s++)
      Bt(e[s], t, n);
  else if (ro(e) || yn(e))
    e.forEach((s) => {
      Bt(s, t, n);
    });
  else if (lo(e)) {
    for (const s in e)
      Bt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Bt(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Wn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Cs(r, t, n);
  }
}
function Ot(e, t, n, s) {
  if (Q(e)) {
    const r = Wn(e, t, n, s);
    return r && io(r) && r.catch((i) => {
      Cs(i, t, n);
    }), r;
  }
  if (Y(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(Ot(e[i], t, n, s));
    return r;
  }
}
function Cs(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || Te;
  if (t) {
    let l = t.parent;
    const a = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let _ = 0; _ < f.length; _++)
          if (f[_](e, a, u) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      Dt(), Wn(i, null, 10, [
        e,
        a,
        u
      ]), qt();
      return;
    }
  }
  Oa(e, n, r, s, o);
}
function Oa(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Je = [];
let Tt = -1;
const vn = [];
let Gt = null, gn = 0;
const Ro = /* @__PURE__ */ Promise.resolve();
let hs = null;
function Io(e) {
  const t = hs || Ro;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function La(e) {
  let t = Tt + 1, n = Je.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = Je[s], i = Hn(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Pr(e) {
  if (!(e.flags & 1)) {
    const t = Hn(e), n = Je[Je.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Hn(n) ? Je.push(e) : Je.splice(La(t), 0, e), e.flags |= 1, Oo();
  }
}
function Oo() {
  hs || (hs = Ro.then(Po));
}
function Pa(e) {
  Y(e) ? vn.push(...e) : Gt && e.id === -1 ? Gt.splice(gn + 1, 0, e) : e.flags & 1 || (vn.push(e), e.flags |= 1), Oo();
}
function yi(e, t, n = Tt + 1) {
  for (; n < Je.length; n++) {
    const s = Je[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      Je.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Lo(e) {
  if (vn.length) {
    const t = [...new Set(vn)].sort(
      (n, s) => Hn(n) - Hn(s)
    );
    if (vn.length = 0, Gt) {
      Gt.push(...t);
      return;
    }
    for (Gt = t, gn = 0; gn < Gt.length; gn++) {
      const n = Gt[gn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Gt = null, gn = 0;
  }
}
const Hn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Po(e) {
  try {
    for (Tt = 0; Tt < Je.length; Tt++) {
      const t = Je[Tt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Wn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Tt < Je.length; Tt++) {
      const t = Je[Tt];
      t && (t.flags &= -2);
    }
    Tt = -1, Je.length = 0, Lo(), hs = null, (Je.length || vn.length) && Po();
  }
}
let ht = null, $o = null;
function ds(e) {
  const t = ht;
  return ht = e, $o = e && e.type.__scopeId || null, t;
}
function $a(e, t = ht, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && Ei(-1);
    const i = ds(t);
    let o;
    try {
      o = e(...r);
    } finally {
      ds(i), s._d && Ei(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function rn(e, t) {
  if (ht === null)
    return e;
  const n = Rs(ht), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, l, a = Te] = t[r];
    i && (Q(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Bt(o), s.push({
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
function on(e, t, n, s) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let a = l.dir[s];
    a && (Dt(), Ot(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), qt());
  }
}
const Na = Symbol("_vte"), Ba = (e) => e.__isTeleport;
function $r(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, $r(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Fa(e, t) {
  return Q(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ke({ name: e.name }, t, { setup: e })
  ) : e;
}
function No(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Nn(e, t, n, s, r = !1) {
  if (Y(e)) {
    e.forEach(
      (B, q) => Nn(
        B,
        t && (Y(t) ? t[q] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (Bn(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Nn(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? Rs(s.component) : s.el, o = r ? null : i, { i: l, r: a } = e, u = t && t.r, f = l.refs === Te ? l.refs = {} : l.refs, _ = l.setupState, v = ye(_), I = _ === Te ? () => !1 : (B) => be(v, B);
  if (u != null && u !== a && (De(u) ? (f[u] = null, I(u) && (_[u] = null)) : ze(u) && (u.value = null)), Q(a))
    Wn(a, l, 12, [o, f]);
  else {
    const B = De(a), q = ze(a);
    if (B || q) {
      const ke = () => {
        if (e.f) {
          const te = B ? I(a) ? _[a] : f[a] : a.value;
          r ? Y(te) && xr(te, i) : Y(te) ? te.includes(i) || te.push(i) : B ? (f[a] = [i], I(a) && (_[a] = f[a])) : (a.value = [i], e.k && (f[e.k] = a.value));
        } else B ? (f[a] = o, I(a) && (_[a] = o)) : q && (a.value = o, e.k && (f[e.k] = o));
      };
      o ? (ke.id = -1, lt(ke, n)) : ke();
    }
  }
}
xs().requestIdleCallback;
xs().cancelIdleCallback;
const Bn = (e) => !!e.type.__asyncLoader, Bo = (e) => e.type.__isKeepAlive;
function Ma(e, t) {
  Fo(e, "a", t);
}
function Da(e, t) {
  Fo(e, "da", t);
}
function Fo(e, t, n = Qe) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Ts(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Bo(r.parent.vnode) && qa(s, t, n, r), r = r.parent;
  }
}
function qa(e, t, n, s) {
  const r = Ts(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Nr(() => {
    xr(s[t], r);
  }, n);
}
function Ts(e, t, n = Qe, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Dt();
      const l = zn(n), a = Ot(t, n, e, o);
      return l(), qt(), a;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Vt = (e) => (t, n = Qe) => {
  (!jn || e === "sp") && Ts(e, (...s) => t(...s), n);
}, Va = Vt("bm"), Mo = Vt("m"), Ha = Vt(
  "bu"
), Ua = Vt("u"), ja = Vt(
  "bum"
), Nr = Vt("um"), Wa = Vt(
  "sp"
), za = Vt("rtg"), Ka = Vt("rtc");
function Ga(e, t = Qe) {
  Ts("ec", e, t);
}
const Za = Symbol.for("v-ndc");
function xt(e, t, n, s) {
  let r;
  const i = n, o = Y(e);
  if (o || De(e)) {
    const l = o && bn(e);
    let a = !1, u = !1;
    l && (a = !dt(e), u = Xt(e), e = Ss(e)), r = new Array(e.length);
    for (let f = 0, _ = e.length; f < _; f++)
      r[f] = t(
        a ? u ? us(Ue(e[f])) : Ue(e[f]) : e[f],
        f,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, i);
  } else if ($e(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, a) => t(l, a, void 0, i)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let a = 0, u = l.length; a < u; a++) {
        const f = l[a];
        r[a] = t(e[f], f, a, i);
      }
    }
  else
    r = [];
  return r;
}
const or = (e) => e ? il(e) ? Rs(e) : or(e.parent) : null, Fn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ke(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => or(e.parent),
    $root: (e) => or(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => qo(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Pr(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Io.bind(e.proxy)),
    $watch: (e) => _c.bind(e)
  })
), Us = (e, t) => e !== Te && !e.__isScriptSetup && be(e, t), Ya = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: a } = e;
    let u;
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
        if (Us(s, t))
          return o[t] = 1, s[t];
        if (r !== Te && be(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && be(u, t)
        )
          return o[t] = 3, i[t];
        if (n !== Te && be(n, t))
          return o[t] = 4, n[t];
        lr && (o[t] = 0);
      }
    }
    const f = Fn[t];
    let _, v;
    if (f)
      return t === "$attrs" && We(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (_ = l.__cssModules) && (_ = _[t])
    )
      return _;
    if (n !== Te && be(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      v = a.config.globalProperties, be(v, t)
    )
      return v[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return Us(r, t) ? (r[t] = n, !0) : s !== Te && be(s, t) ? (s[t] = n, !0) : be(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i }
  }, o) {
    let l;
    return !!n[o] || e !== Te && be(e, o) || Us(t, o) || (l = i[0]) && be(l, o) || be(s, o) || be(Fn, o) || be(r.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : be(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function bi(e) {
  return Y(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let lr = !0;
function Ja(e) {
  const t = qo(e), n = e.proxy, s = e.ctx;
  lr = !1, t.beforeCreate && vi(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: a,
    inject: u,
    // lifecycle
    created: f,
    beforeMount: _,
    mounted: v,
    beforeUpdate: I,
    updated: B,
    activated: q,
    deactivated: ke,
    beforeDestroy: te,
    beforeUnmount: de,
    destroyed: pe,
    unmounted: H,
    render: le,
    renderTracked: qe,
    renderTriggered: fe,
    errorCaptured: je,
    serverPrefetch: pt,
    // public API
    expose: Ge,
    inheritAttrs: gt,
    // assets
    components: wt,
    directives: et,
    filters: Ve
  } = t;
  if (u && Qa(u, s, null), o)
    for (const X in o) {
      const ie = o[X];
      Q(ie) && (s[X] = ie.bind(n));
    }
  if (r) {
    const X = r.call(n, n);
    $e(X) && (e.data = Ir(X));
  }
  if (lr = !0, i)
    for (const X in i) {
      const ie = i[X], M = Q(ie) ? ie.bind(n, n) : Q(ie.get) ? ie.get.bind(n, n) : At, xe = !Q(ie) && Q(ie.set) ? ie.set.bind(n) : At, W = Fe({
        get: M,
        set: xe
      });
      Object.defineProperty(s, X, {
        enumerable: !0,
        configurable: !0,
        get: () => W.value,
        set: (Ee) => W.value = Ee
      });
    }
  if (l)
    for (const X in l)
      Do(l[X], s, n, X);
  if (a) {
    const X = Q(a) ? a.call(n) : a;
    Reflect.ownKeys(X).forEach((ie) => {
      rc(ie, X[ie]);
    });
  }
  f && vi(f, e, "c");
  function re(X, ie) {
    Y(ie) ? ie.forEach((M) => X(M.bind(n))) : ie && X(ie.bind(n));
  }
  if (re(Va, _), re(Mo, v), re(Ha, I), re(Ua, B), re(Ma, q), re(Da, ke), re(Ga, je), re(Ka, qe), re(za, fe), re(ja, de), re(Nr, H), re(Wa, pt), Y(Ge))
    if (Ge.length) {
      const X = e.exposed || (e.exposed = {});
      Ge.forEach((ie) => {
        Object.defineProperty(X, ie, {
          get: () => n[ie],
          set: (M) => n[ie] = M,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  le && e.render === At && (e.render = le), gt != null && (e.inheritAttrs = gt), wt && (e.components = wt), et && (e.directives = et), pt && No(e);
}
function Qa(e, t, n = At) {
  Y(e) && (e = ar(e));
  for (const s in e) {
    const r = e[s];
    let i;
    $e(r) ? "default" in r ? i = ts(
      r.from || s,
      r.default,
      !0
    ) : i = ts(r.from || s) : i = ts(r), ze(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function vi(e, t, n) {
  Ot(
    Y(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Do(e, t, n, s) {
  let r = s.includes(".") ? Xo(n, s) : () => n[s];
  if (De(e)) {
    const i = t[e];
    Q(i) && un(r, i);
  } else if (Q(e))
    un(r, e.bind(n));
  else if ($e(e))
    if (Y(e))
      e.forEach((i) => Do(i, t, n, s));
    else {
      const i = Q(e.handler) ? e.handler.bind(n) : t[e.handler];
      Q(i) && un(r, i, e);
    }
}
function qo(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = i.get(t);
  let a;
  return l ? a = l : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (u) => ps(a, u, o, !0)
  ), ps(a, t, o)), $e(t) && i.set(t, a), a;
}
function ps(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && ps(e, i, n, !0), r && r.forEach(
    (o) => ps(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = Xa[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Xa = {
  data: wi,
  props: ki,
  emits: ki,
  // objects
  methods: In,
  computed: In,
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
  components: In,
  directives: In,
  // watch
  watch: tc,
  // provide / inject
  provide: wi,
  inject: ec
};
function wi(e, t) {
  return t ? e ? function() {
    return Ke(
      Q(e) ? e.call(this, this) : e,
      Q(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function ec(e, t) {
  return In(ar(e), ar(t));
}
function ar(e) {
  if (Y(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ye(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function In(e, t) {
  return e ? Ke(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ki(e, t) {
  return e ? Y(e) && Y(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ke(
    /* @__PURE__ */ Object.create(null),
    bi(e),
    bi(t ?? {})
  ) : t;
}
function tc(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ke(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Ye(e[s], t[s]);
  return n;
}
function Vo() {
  return {
    app: null,
    config: {
      isNativeTag: Wl,
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
let nc = 0;
function sc(e, t) {
  return function(s, r = null) {
    Q(s) || (s = Ke({}, s)), r != null && !$e(r) && (r = null);
    const i = Vo(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const u = i.app = {
      _uid: nc++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: qc,
      get config() {
        return i.config;
      },
      set config(f) {
      },
      use(f, ..._) {
        return o.has(f) || (f && Q(f.install) ? (o.add(f), f.install(u, ..._)) : Q(f) && (o.add(f), f(u, ..._))), u;
      },
      mixin(f) {
        return i.mixins.includes(f) || i.mixins.push(f), u;
      },
      component(f, _) {
        return _ ? (i.components[f] = _, u) : i.components[f];
      },
      directive(f, _) {
        return _ ? (i.directives[f] = _, u) : i.directives[f];
      },
      mount(f, _, v) {
        if (!a) {
          const I = u._ceVNode || Rt(s, r);
          return I.appContext = i, v === !0 ? v = "svg" : v === !1 && (v = void 0), e(I, f, v), a = !0, u._container = f, f.__vue_app__ = u, Rs(I.component);
        }
      },
      onUnmount(f) {
        l.push(f);
      },
      unmount() {
        a && (Ot(
          l,
          u._instance,
          16
        ), e(null, u._container), delete u._container.__vue_app__);
      },
      provide(f, _) {
        return i.provides[f] = _, u;
      },
      runWithContext(f) {
        const _ = wn;
        wn = u;
        try {
          return f();
        } finally {
          wn = _;
        }
      }
    };
    return u;
  };
}
let wn = null;
function rc(e, t) {
  if (Qe) {
    let n = Qe.provides;
    const s = Qe.parent && Qe.parent.provides;
    s === n && (n = Qe.provides = Object.create(s)), n[e] = t;
  }
}
function ts(e, t, n = !1) {
  const s = $c();
  if (s || wn) {
    let r = wn ? wn._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && Q(t) ? t.call(s && s.proxy) : t;
  }
}
const Ho = {}, Uo = () => Object.create(Ho), jo = (e) => Object.getPrototypeOf(e) === Ho;
function ic(e, t, n, s = !1) {
  const r = {}, i = Uo();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Wo(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : ka(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function oc(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, l = ye(r), [a] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const f = e.vnode.dynamicProps;
      for (let _ = 0; _ < f.length; _++) {
        let v = f[_];
        if (Es(e.emitsOptions, v))
          continue;
        const I = t[v];
        if (a)
          if (be(i, v))
            I !== i[v] && (i[v] = I, u = !0);
          else {
            const B = Qt(v);
            r[B] = cr(
              a,
              l,
              B,
              I,
              e,
              !1
            );
          }
        else
          I !== i[v] && (i[v] = I, u = !0);
      }
    }
  } else {
    Wo(e, t, r, i) && (u = !0);
    let f;
    for (const _ in l)
      (!t || // for camelCase
      !be(t, _) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = nn(_)) === _ || !be(t, f))) && (a ? n && // for camelCase
      (n[_] !== void 0 || // for kebab-case
      n[f] !== void 0) && (r[_] = cr(
        a,
        l,
        _,
        void 0,
        e,
        !0
      )) : delete r[_]);
    if (i !== l)
      for (const _ in i)
        (!t || !be(t, _)) && (delete i[_], u = !0);
  }
  u && Nt(e.attrs, "set", "");
}
function Wo(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let a in t) {
      if (Ln(a))
        continue;
      const u = t[a];
      let f;
      r && be(r, f = Qt(a)) ? !i || !i.includes(f) ? n[f] = u : (l || (l = {}))[f] = u : Es(e.emitsOptions, a) || (!(a in s) || u !== s[a]) && (s[a] = u, o = !0);
    }
  if (i) {
    const a = ye(n), u = l || Te;
    for (let f = 0; f < i.length; f++) {
      const _ = i[f];
      n[_] = cr(
        r,
        a,
        _,
        u[_],
        e,
        !be(u, _)
      );
    }
  }
  return o;
}
function cr(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = be(o, "default");
    if (l && s === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && Q(a)) {
        const { propsDefaults: u } = r;
        if (n in u)
          s = u[n];
        else {
          const f = zn(r);
          s = u[n] = a.call(
            null,
            t
          ), f();
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
    ] && (s === "" || s === nn(n)) && (s = !0));
  }
  return s;
}
const lc = /* @__PURE__ */ new WeakMap();
function zo(e, t, n = !1) {
  const s = n ? lc : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, l = [];
  let a = !1;
  if (!Q(e)) {
    const f = (_) => {
      a = !0;
      const [v, I] = zo(_, t, !0);
      Ke(o, v), I && l.push(...I);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!i && !a)
    return $e(e) && s.set(e, _n), _n;
  if (Y(i))
    for (let f = 0; f < i.length; f++) {
      const _ = Qt(i[f]);
      xi(_) && (o[_] = Te);
    }
  else if (i)
    for (const f in i) {
      const _ = Qt(f);
      if (xi(_)) {
        const v = i[f], I = o[_] = Y(v) || Q(v) ? { type: v } : Ke({}, v), B = I.type;
        let q = !1, ke = !0;
        if (Y(B))
          for (let te = 0; te < B.length; ++te) {
            const de = B[te], pe = Q(de) && de.name;
            if (pe === "Boolean") {
              q = !0;
              break;
            } else pe === "String" && (ke = !1);
          }
        else
          q = Q(B) && B.name === "Boolean";
        I[
          0
          /* shouldCast */
        ] = q, I[
          1
          /* shouldCastTrue */
        ] = ke, (q || be(I, "default")) && l.push(_);
      }
    }
  const u = [o, l];
  return $e(e) && s.set(e, u), u;
}
function xi(e) {
  return e[0] !== "$" && !Ln(e);
}
const Br = (e) => e === "_" || e === "__" || e === "_ctx" || e === "$stable", Fr = (e) => Y(e) ? e.map(Et) : [Et(e)], ac = (e, t, n) => {
  if (t._n)
    return t;
  const s = $a((...r) => Fr(t(...r)), n);
  return s._c = !1, s;
}, Ko = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (Br(r)) continue;
    const i = e[r];
    if (Q(i))
      t[r] = ac(r, i, s);
    else if (i != null) {
      const o = Fr(i);
      t[r] = () => o;
    }
  }
}, Go = (e, t) => {
  const n = Fr(t);
  e.slots.default = () => n;
}, Zo = (e, t, n) => {
  for (const s in t)
    (n || !Br(s)) && (e[s] = t[s]);
}, cc = (e, t, n) => {
  const s = e.slots = Uo();
  if (e.vnode.shapeFlag & 32) {
    const r = t.__;
    r && er(s, "__", r, !0);
    const i = t._;
    i ? (Zo(s, t, n), n && er(s, "_", i, !0)) : Ko(t, s);
  } else t && Go(e, t);
}, uc = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = Te;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : Zo(r, t, n) : (i = !t.$stable, Ko(t, r)), o = t;
  } else t && (Go(e, t), o = { default: 1 });
  if (i)
    for (const l in r)
      !Br(l) && o[l] == null && delete r[l];
}, lt = Sc;
function fc(e) {
  return hc(e);
}
function hc(e, t) {
  const n = xs();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: l,
    createComment: a,
    setText: u,
    setElementText: f,
    parentNode: _,
    nextSibling: v,
    setScopeId: I = At,
    insertStaticContent: B
  } = e, q = (d, g, w, C = null, T = null, S = null, F = void 0, O = null, L = !!g.dynamicChildren) => {
    if (d === g)
      return;
    d && !Cn(d, g) && (C = ct(d), Ee(d, T, S, !0), d = null), g.patchFlag === -2 && (L = !1, g.dynamicChildren = null);
    const { type: E, ref: U, shapeFlag: N } = g;
    switch (E) {
      case As:
        ke(d, g, w, C);
        break;
      case en:
        te(d, g, w, C);
        break;
      case ns:
        d == null && de(g, w, C, F);
        break;
      case Be:
        wt(
          d,
          g,
          w,
          C,
          T,
          S,
          F,
          O,
          L
        );
        break;
      default:
        N & 1 ? le(
          d,
          g,
          w,
          C,
          T,
          S,
          F,
          O,
          L
        ) : N & 6 ? et(
          d,
          g,
          w,
          C,
          T,
          S,
          F,
          O,
          L
        ) : (N & 64 || N & 128) && E.process(
          d,
          g,
          w,
          C,
          T,
          S,
          F,
          O,
          L,
          it
        );
    }
    U != null && T ? Nn(U, d && d.ref, S, g || d, !g) : U == null && d && d.ref != null && Nn(d.ref, null, S, d, !0);
  }, ke = (d, g, w, C) => {
    if (d == null)
      s(
        g.el = l(g.children),
        w,
        C
      );
    else {
      const T = g.el = d.el;
      g.children !== d.children && u(T, g.children);
    }
  }, te = (d, g, w, C) => {
    d == null ? s(
      g.el = a(g.children || ""),
      w,
      C
    ) : g.el = d.el;
  }, de = (d, g, w, C) => {
    [d.el, d.anchor] = B(
      d.children,
      g,
      w,
      C,
      d.el,
      d.anchor
    );
  }, pe = ({ el: d, anchor: g }, w, C) => {
    let T;
    for (; d && d !== g; )
      T = v(d), s(d, w, C), d = T;
    s(g, w, C);
  }, H = ({ el: d, anchor: g }) => {
    let w;
    for (; d && d !== g; )
      w = v(d), r(d), d = w;
    r(g);
  }, le = (d, g, w, C, T, S, F, O, L) => {
    g.type === "svg" ? F = "svg" : g.type === "math" && (F = "mathml"), d == null ? qe(
      g,
      w,
      C,
      T,
      S,
      F,
      O,
      L
    ) : pt(
      d,
      g,
      T,
      S,
      F,
      O,
      L
    );
  }, qe = (d, g, w, C, T, S, F, O) => {
    let L, E;
    const { props: U, shapeFlag: N, transition: j, dirs: K } = d;
    if (L = d.el = o(
      d.type,
      S,
      U && U.is,
      U
    ), N & 8 ? f(L, d.children) : N & 16 && je(
      d.children,
      L,
      null,
      C,
      T,
      js(d, S),
      F,
      O
    ), K && on(d, null, C, "created"), fe(L, d, d.scopeId, F, C), U) {
      for (const ge in U)
        ge !== "value" && !Ln(ge) && i(L, ge, null, U[ge], S, C);
      "value" in U && i(L, "value", null, U.value, S), (E = U.onVnodeBeforeMount) && St(E, C, d);
    }
    K && on(d, null, C, "beforeMount");
    const ee = dc(T, j);
    ee && j.beforeEnter(L), s(L, g, w), ((E = U && U.onVnodeMounted) || ee || K) && lt(() => {
      E && St(E, C, d), ee && j.enter(L), K && on(d, null, C, "mounted");
    }, T);
  }, fe = (d, g, w, C, T) => {
    if (w && I(d, w), C)
      for (let S = 0; S < C.length; S++)
        I(d, C[S]);
    if (T) {
      let S = T.subTree;
      if (g === S || tl(S.type) && (S.ssContent === g || S.ssFallback === g)) {
        const F = T.vnode;
        fe(
          d,
          F,
          F.scopeId,
          F.slotScopeIds,
          T.parent
        );
      }
    }
  }, je = (d, g, w, C, T, S, F, O, L = 0) => {
    for (let E = L; E < d.length; E++) {
      const U = d[E] = O ? Zt(d[E]) : Et(d[E]);
      q(
        null,
        U,
        g,
        w,
        C,
        T,
        S,
        F,
        O
      );
    }
  }, pt = (d, g, w, C, T, S, F) => {
    const O = g.el = d.el;
    let { patchFlag: L, dynamicChildren: E, dirs: U } = g;
    L |= d.patchFlag & 16;
    const N = d.props || Te, j = g.props || Te;
    let K;
    if (w && ln(w, !1), (K = j.onVnodeBeforeUpdate) && St(K, w, g, d), U && on(g, d, w, "beforeUpdate"), w && ln(w, !0), (N.innerHTML && j.innerHTML == null || N.textContent && j.textContent == null) && f(O, ""), E ? Ge(
      d.dynamicChildren,
      E,
      O,
      w,
      C,
      js(g, T),
      S
    ) : F || ie(
      d,
      g,
      O,
      null,
      w,
      C,
      js(g, T),
      S,
      !1
    ), L > 0) {
      if (L & 16)
        gt(O, N, j, w, T);
      else if (L & 2 && N.class !== j.class && i(O, "class", null, j.class, T), L & 4 && i(O, "style", N.style, j.style, T), L & 8) {
        const ee = g.dynamicProps;
        for (let ge = 0; ge < ee.length; ge++) {
          const oe = ee[ge], Ne = N[oe], Ie = j[oe];
          (Ie !== Ne || oe === "value") && i(O, oe, Ne, Ie, T, w);
        }
      }
      L & 1 && d.children !== g.children && f(O, g.children);
    } else !F && E == null && gt(O, N, j, w, T);
    ((K = j.onVnodeUpdated) || U) && lt(() => {
      K && St(K, w, g, d), U && on(g, d, w, "updated");
    }, C);
  }, Ge = (d, g, w, C, T, S, F) => {
    for (let O = 0; O < g.length; O++) {
      const L = d[O], E = g[O], U = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        L.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (L.type === Be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Cn(L, E) || // - In the case of a component, it could contain anything.
        L.shapeFlag & 198) ? _(L.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          w
        )
      );
      q(
        L,
        E,
        U,
        null,
        C,
        T,
        S,
        F,
        !0
      );
    }
  }, gt = (d, g, w, C, T) => {
    if (g !== w) {
      if (g !== Te)
        for (const S in g)
          !Ln(S) && !(S in w) && i(
            d,
            S,
            g[S],
            null,
            T,
            C
          );
      for (const S in w) {
        if (Ln(S)) continue;
        const F = w[S], O = g[S];
        F !== O && S !== "value" && i(d, S, O, F, T, C);
      }
      "value" in w && i(d, "value", g.value, w.value, T);
    }
  }, wt = (d, g, w, C, T, S, F, O, L) => {
    const E = g.el = d ? d.el : l(""), U = g.anchor = d ? d.anchor : l("");
    let { patchFlag: N, dynamicChildren: j, slotScopeIds: K } = g;
    K && (O = O ? O.concat(K) : K), d == null ? (s(E, w, C), s(U, w, C), je(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      w,
      U,
      T,
      S,
      F,
      O,
      L
    )) : N > 0 && N & 64 && j && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    d.dynamicChildren ? (Ge(
      d.dynamicChildren,
      j,
      w,
      T,
      S,
      F,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || T && g === T.subTree) && Yo(
      d,
      g,
      !0
      /* shallow */
    )) : ie(
      d,
      g,
      w,
      U,
      T,
      S,
      F,
      O,
      L
    );
  }, et = (d, g, w, C, T, S, F, O, L) => {
    g.slotScopeIds = O, d == null ? g.shapeFlag & 512 ? T.ctx.activate(
      g,
      w,
      C,
      F,
      L
    ) : Ve(
      g,
      w,
      C,
      T,
      S,
      F,
      L
    ) : Ht(d, g, L);
  }, Ve = (d, g, w, C, T, S, F) => {
    const O = d.component = Pc(
      d,
      C,
      T
    );
    if (Bo(d) && (O.ctx.renderer = it), Nc(O, !1, F), O.asyncDep) {
      if (T && T.registerDep(O, re, F), !d.el) {
        const L = O.subTree = Rt(en);
        te(null, L, g, w), d.placeholder = L.el;
      }
    } else
      re(
        O,
        d,
        g,
        w,
        T,
        S,
        F
      );
  }, Ht = (d, g, w) => {
    const C = g.component = d.component;
    if (kc(d, g, w))
      if (C.asyncDep && !C.asyncResolved) {
        X(C, g, w);
        return;
      } else
        C.next = g, C.update();
    else
      g.el = d.el, C.vnode = g;
  }, re = (d, g, w, C, T, S, F) => {
    const O = () => {
      if (d.isMounted) {
        let { next: N, bu: j, u: K, parent: ee, vnode: ge } = d;
        {
          const c = Jo(d);
          if (c) {
            N && (N.el = ge.el, X(d, N, F)), c.asyncDep.then(() => {
              d.isUnmounted || O();
            });
            return;
          }
        }
        let oe = N, Ne;
        ln(d, !1), N ? (N.el = ge.el, X(d, N, F)) : N = ge, j && es(j), (Ne = N.props && N.props.onVnodeBeforeUpdate) && St(Ne, ee, N, ge), ln(d, !0);
        const Ie = Ci(d), Le = d.subTree;
        d.subTree = Ie, q(
          Le,
          Ie,
          // parent may have changed if it's in a teleport
          _(Le.el),
          // anchor may have changed if it's in a fragment
          ct(Le),
          d,
          T,
          S
        ), N.el = Ie.el, oe === null && xc(d, Ie.el), K && lt(K, T), (Ne = N.props && N.props.onVnodeUpdated) && lt(
          () => St(Ne, ee, N, ge),
          T
        );
      } else {
        let N;
        const { el: j, props: K } = g, { bm: ee, m: ge, parent: oe, root: Ne, type: Ie } = d, Le = Bn(g);
        ln(d, !1), ee && es(ee), !Le && (N = K && K.onVnodeBeforeMount) && St(N, oe, g), ln(d, !0);
        {
          Ne.ce && // @ts-expect-error _def is private
          Ne.ce._def.shadowRoot !== !1 && Ne.ce._injectChildStyle(Ie);
          const c = d.subTree = Ci(d);
          q(
            null,
            c,
            w,
            C,
            d,
            T,
            S
          ), g.el = c.el;
        }
        if (ge && lt(ge, T), !Le && (N = K && K.onVnodeMounted)) {
          const c = g;
          lt(
            () => St(N, oe, c),
            T
          );
        }
        (g.shapeFlag & 256 || oe && Bn(oe.vnode) && oe.vnode.shapeFlag & 256) && d.a && lt(d.a, T), d.isMounted = !0, g = w = C = null;
      }
    };
    d.scope.on();
    const L = d.effect = new ho(O);
    d.scope.off();
    const E = d.update = L.run.bind(L), U = d.job = L.runIfDirty.bind(L);
    U.i = d, U.id = d.uid, L.scheduler = () => Pr(U), ln(d, !0), E();
  }, X = (d, g, w) => {
    g.component = d;
    const C = d.vnode.props;
    d.vnode = g, d.next = null, oc(d, g.props, C, w), uc(d, g.children, w), Dt(), yi(d), qt();
  }, ie = (d, g, w, C, T, S, F, O, L = !1) => {
    const E = d && d.children, U = d ? d.shapeFlag : 0, N = g.children, { patchFlag: j, shapeFlag: K } = g;
    if (j > 0) {
      if (j & 128) {
        xe(
          E,
          N,
          w,
          C,
          T,
          S,
          F,
          O,
          L
        );
        return;
      } else if (j & 256) {
        M(
          E,
          N,
          w,
          C,
          T,
          S,
          F,
          O,
          L
        );
        return;
      }
    }
    K & 8 ? (U & 16 && kt(E, T, S), N !== E && f(w, N)) : U & 16 ? K & 16 ? xe(
      E,
      N,
      w,
      C,
      T,
      S,
      F,
      O,
      L
    ) : kt(E, T, S, !0) : (U & 8 && f(w, ""), K & 16 && je(
      N,
      w,
      C,
      T,
      S,
      F,
      O,
      L
    ));
  }, M = (d, g, w, C, T, S, F, O, L) => {
    d = d || _n, g = g || _n;
    const E = d.length, U = g.length, N = Math.min(E, U);
    let j;
    for (j = 0; j < N; j++) {
      const K = g[j] = L ? Zt(g[j]) : Et(g[j]);
      q(
        d[j],
        K,
        w,
        null,
        T,
        S,
        F,
        O,
        L
      );
    }
    E > U ? kt(
      d,
      T,
      S,
      !0,
      !1,
      N
    ) : je(
      g,
      w,
      C,
      T,
      S,
      F,
      O,
      L,
      N
    );
  }, xe = (d, g, w, C, T, S, F, O, L) => {
    let E = 0;
    const U = g.length;
    let N = d.length - 1, j = U - 1;
    for (; E <= N && E <= j; ) {
      const K = d[E], ee = g[E] = L ? Zt(g[E]) : Et(g[E]);
      if (Cn(K, ee))
        q(
          K,
          ee,
          w,
          null,
          T,
          S,
          F,
          O,
          L
        );
      else
        break;
      E++;
    }
    for (; E <= N && E <= j; ) {
      const K = d[N], ee = g[j] = L ? Zt(g[j]) : Et(g[j]);
      if (Cn(K, ee))
        q(
          K,
          ee,
          w,
          null,
          T,
          S,
          F,
          O,
          L
        );
      else
        break;
      N--, j--;
    }
    if (E > N) {
      if (E <= j) {
        const K = j + 1, ee = K < U ? g[K].el : C;
        for (; E <= j; )
          q(
            null,
            g[E] = L ? Zt(g[E]) : Et(g[E]),
            w,
            ee,
            T,
            S,
            F,
            O,
            L
          ), E++;
      }
    } else if (E > j)
      for (; E <= N; )
        Ee(d[E], T, S, !0), E++;
    else {
      const K = E, ee = E, ge = /* @__PURE__ */ new Map();
      for (E = ee; E <= j; E++) {
        const y = g[E] = L ? Zt(g[E]) : Et(g[E]);
        y.key != null && ge.set(y.key, E);
      }
      let oe, Ne = 0;
      const Ie = j - ee + 1;
      let Le = !1, c = 0;
      const p = new Array(Ie);
      for (E = 0; E < Ie; E++) p[E] = 0;
      for (E = K; E <= N; E++) {
        const y = d[E];
        if (Ne >= Ie) {
          Ee(y, T, S, !0);
          continue;
        }
        let A;
        if (y.key != null)
          A = ge.get(y.key);
        else
          for (oe = ee; oe <= j; oe++)
            if (p[oe - ee] === 0 && Cn(y, g[oe])) {
              A = oe;
              break;
            }
        A === void 0 ? Ee(y, T, S, !0) : (p[A - ee] = E + 1, A >= c ? c = A : Le = !0, q(
          y,
          g[A],
          w,
          null,
          T,
          S,
          F,
          O,
          L
        ), Ne++);
      }
      const k = Le ? pc(p) : _n;
      for (oe = k.length - 1, E = Ie - 1; E >= 0; E--) {
        const y = ee + E, A = g[y], V = g[y + 1], z = y + 1 < U ? (
          // #13559, fallback to el placeholder for unresolved async component
          V.el || V.placeholder
        ) : C;
        p[E] === 0 ? q(
          null,
          A,
          w,
          z,
          T,
          S,
          F,
          O,
          L
        ) : Le && (oe < 0 || E !== k[oe] ? W(A, w, z, 2) : oe--);
      }
    }
  }, W = (d, g, w, C, T = null) => {
    const { el: S, type: F, transition: O, children: L, shapeFlag: E } = d;
    if (E & 6) {
      W(d.component.subTree, g, w, C);
      return;
    }
    if (E & 128) {
      d.suspense.move(g, w, C);
      return;
    }
    if (E & 64) {
      F.move(d, g, w, it);
      return;
    }
    if (F === Be) {
      s(S, g, w);
      for (let N = 0; N < L.length; N++)
        W(L[N], g, w, C);
      s(d.anchor, g, w);
      return;
    }
    if (F === ns) {
      pe(d, g, w);
      return;
    }
    if (C !== 2 && E & 1 && O)
      if (C === 0)
        O.beforeEnter(S), s(S, g, w), lt(() => O.enter(S), T);
      else {
        const { leave: N, delayLeave: j, afterLeave: K } = O, ee = () => {
          d.ctx.isUnmounted ? r(S) : s(S, g, w);
        }, ge = () => {
          N(S, () => {
            ee(), K && K();
          });
        };
        j ? j(S, ee, ge) : ge();
      }
    else
      s(S, g, w);
  }, Ee = (d, g, w, C = !1, T = !1) => {
    const {
      type: S,
      props: F,
      ref: O,
      children: L,
      dynamicChildren: E,
      shapeFlag: U,
      patchFlag: N,
      dirs: j,
      cacheIndex: K
    } = d;
    if (N === -2 && (T = !1), O != null && (Dt(), Nn(O, null, w, d, !0), qt()), K != null && (g.renderCache[K] = void 0), U & 256) {
      g.ctx.deactivate(d);
      return;
    }
    const ee = U & 1 && j, ge = !Bn(d);
    let oe;
    if (ge && (oe = F && F.onVnodeBeforeUnmount) && St(oe, g, d), U & 6)
      sn(d.component, w, C);
    else {
      if (U & 128) {
        d.suspense.unmount(w, C);
        return;
      }
      ee && on(d, null, g, "beforeUnmount"), U & 64 ? d.type.remove(
        d,
        g,
        w,
        it,
        C
      ) : E && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !E.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (S !== Be || N > 0 && N & 64) ? kt(
        E,
        g,
        w,
        !1,
        !0
      ) : (S === Be && N & 384 || !T && U & 16) && kt(L, g, w), C && mt(d);
    }
    (ge && (oe = F && F.onVnodeUnmounted) || ee) && lt(() => {
      oe && St(oe, g, d), ee && on(d, null, g, "unmounted");
    }, w);
  }, mt = (d) => {
    const { type: g, el: w, anchor: C, transition: T } = d;
    if (g === Be) {
      _t(w, C);
      return;
    }
    if (g === ns) {
      H(d);
      return;
    }
    const S = () => {
      r(w), T && !T.persisted && T.afterLeave && T.afterLeave();
    };
    if (d.shapeFlag & 1 && T && !T.persisted) {
      const { leave: F, delayLeave: O } = T, L = () => F(w, S);
      O ? O(d.el, S, L) : L();
    } else
      S();
  }, _t = (d, g) => {
    let w;
    for (; d !== g; )
      w = v(d), r(d), d = w;
    r(g);
  }, sn = (d, g, w) => {
    const {
      bum: C,
      scope: T,
      job: S,
      subTree: F,
      um: O,
      m: L,
      a: E,
      parent: U,
      slots: { __: N }
    } = d;
    Si(L), Si(E), C && es(C), U && Y(N) && N.forEach((j) => {
      U.renderCache[j] = void 0;
    }), T.stop(), S && (S.flags |= 8, Ee(F, d, g, w)), O && lt(O, g), lt(() => {
      d.isUnmounted = !0;
    }, g), g && g.pendingBranch && !g.isUnmounted && d.asyncDep && !d.asyncResolved && d.suspenseId === g.pendingId && (g.deps--, g.deps === 0 && g.resolve());
  }, kt = (d, g, w, C = !1, T = !1, S = 0) => {
    for (let F = S; F < d.length; F++)
      Ee(d[F], g, w, C, T);
  }, ct = (d) => {
    if (d.shapeFlag & 6)
      return ct(d.component.subTree);
    if (d.shapeFlag & 128)
      return d.suspense.next();
    const g = v(d.anchor || d.el), w = g && g[Na];
    return w ? v(w) : g;
  };
  let st = !1;
  const rt = (d, g, w) => {
    d == null ? g._vnode && Ee(g._vnode, null, null, !0) : q(
      g._vnode || null,
      d,
      g,
      null,
      null,
      null,
      w
    ), g._vnode = d, st || (st = !0, yi(), Lo(), st = !1);
  }, it = {
    p: q,
    um: Ee,
    m: W,
    r: mt,
    mt: Ve,
    mc: je,
    pc: ie,
    pbc: Ge,
    n: ct,
    o: e
  };
  return {
    render: rt,
    hydrate: void 0,
    createApp: sc(rt)
  };
}
function js({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ln({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function dc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Yo(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (Y(s) && Y(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = Zt(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && Yo(o, l)), l.type === As && (l.el = o.el), l.type === en && !l.el && (l.el = o.el);
    }
}
function pc(e) {
  const t = e.slice(), n = [0];
  let s, r, i, o, l;
  const a = e.length;
  for (s = 0; s < a; s++) {
    const u = e[s];
    if (u !== 0) {
      if (r = n[n.length - 1], e[r] < u) {
        t[s] = r, n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        l = i + o >> 1, e[n[l]] < u ? i = l + 1 : o = l;
      u < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = t[o];
  return n;
}
function Jo(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Jo(t);
}
function Si(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const gc = Symbol.for("v-scx"), mc = () => ts(gc);
function un(e, t, n) {
  return Qo(e, t, n);
}
function Qo(e, t, n = Te) {
  const { immediate: s, deep: r, flush: i, once: o } = n, l = Ke({}, n), a = t && s || !t && i !== "post";
  let u;
  if (jn) {
    if (i === "sync") {
      const I = mc();
      u = I.__watcherHandles || (I.__watcherHandles = []);
    } else if (!a) {
      const I = () => {
      };
      return I.stop = At, I.resume = At, I.pause = At, I;
    }
  }
  const f = Qe;
  l.call = (I, B, q) => Ot(I, f, B, q);
  let _ = !1;
  i === "post" ? l.scheduler = (I) => {
    lt(I, f && f.suspense);
  } : i !== "sync" && (_ = !0, l.scheduler = (I, B) => {
    B ? I() : Pr(I);
  }), l.augmentJob = (I) => {
    t && (I.flags |= 4), _ && (I.flags |= 2, f && (I.id = f.uid, I.i = f));
  };
  const v = Ia(e, t, l);
  return jn && (u ? u.push(v) : a && v()), v;
}
function _c(e, t, n) {
  const s = this.proxy, r = De(e) ? e.includes(".") ? Xo(s, e) : () => s[e] : e.bind(s, s);
  let i;
  Q(t) ? i = t : (i = t.handler, n = t);
  const o = zn(this), l = Qo(r, i.bind(s), n);
  return o(), l;
}
function Xo(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const yc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Qt(t)}Modifiers`] || e[`${nn(t)}Modifiers`];
function bc(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || Te;
  let r = n;
  const i = t.startsWith("update:"), o = i && yc(s, t.slice(7));
  o && (o.trim && (r = n.map((f) => De(f) ? f.trim() : f)), o.number && (r = n.map(tr)));
  let l, a = s[l = Ms(t)] || // also try camelCase event handler (#2249)
  s[l = Ms(Qt(t))];
  !a && i && (a = s[l = Ms(nn(t))]), a && Ot(
    a,
    e,
    6,
    r
  );
  const u = s[l + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ot(
      u,
      e,
      6,
      r
    );
  }
}
function el(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, l = !1;
  if (!Q(e)) {
    const a = (u) => {
      const f = el(u, t, !0);
      f && (l = !0, Ke(o, f));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !l ? ($e(e) && s.set(e, null), null) : (Y(i) ? i.forEach((a) => o[a] = null) : Ke(o, i), $e(e) && s.set(e, o), o);
}
function Es(e, t) {
  return !e || !vs(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), be(e, t[0].toLowerCase() + t.slice(1)) || be(e, nn(t)) || be(e, t));
}
function Ci(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    propsOptions: [i],
    slots: o,
    attrs: l,
    emit: a,
    render: u,
    renderCache: f,
    props: _,
    data: v,
    setupState: I,
    ctx: B,
    inheritAttrs: q
  } = e, ke = ds(e);
  let te, de;
  try {
    if (n.shapeFlag & 4) {
      const H = r || s, le = H;
      te = Et(
        u.call(
          le,
          H,
          f,
          _,
          I,
          v,
          B
        )
      ), de = l;
    } else {
      const H = t;
      te = Et(
        H.length > 1 ? H(
          _,
          { attrs: l, slots: o, emit: a }
        ) : H(
          _,
          null
        )
      ), de = t.props ? l : vc(l);
    }
  } catch (H) {
    Mn.length = 0, Cs(H, e, 1), te = Rt(en);
  }
  let pe = te;
  if (de && q !== !1) {
    const H = Object.keys(de), { shapeFlag: le } = pe;
    H.length && le & 7 && (i && H.some(kr) && (de = wc(
      de,
      i
    )), pe = kn(pe, de, !1, !0));
  }
  return n.dirs && (pe = kn(pe, null, !1, !0), pe.dirs = pe.dirs ? pe.dirs.concat(n.dirs) : n.dirs), n.transition && $r(pe, n.transition), te = pe, ds(ke), te;
}
const vc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || vs(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, wc = (e, t) => {
  const n = {};
  for (const s in e)
    (!kr(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function kc(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: l, patchFlag: a } = t, u = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? Ti(s, o, u) : !!o;
    if (a & 8) {
      const f = t.dynamicProps;
      for (let _ = 0; _ < f.length; _++) {
        const v = f[_];
        if (o[v] !== s[v] && !Es(u, v))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? Ti(s, o, u) : !0 : !!o;
  return !1;
}
function Ti(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !Es(n, i))
      return !0;
  }
  return !1;
}
function xc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const tl = (e) => e.__isSuspense;
function Sc(e, t) {
  t && t.pendingBranch ? Y(e) ? t.effects.push(...e) : t.effects.push(e) : Pa(e);
}
const Be = Symbol.for("v-fgt"), As = Symbol.for("v-txt"), en = Symbol.for("v-cmt"), ns = Symbol.for("v-stc"), Mn = [];
let at = null;
function P(e = !1) {
  Mn.push(at = e ? null : []);
}
function Cc() {
  Mn.pop(), at = Mn[Mn.length - 1] || null;
}
let Un = 1;
function Ei(e, t = !1) {
  Un += e, e < 0 && at && t && (at.hasOnce = !0);
}
function nl(e) {
  return e.dynamicChildren = Un > 0 ? at || _n : null, Cc(), Un > 0 && at && at.push(e), e;
}
function $(e, t, n, s, r, i) {
  return nl(
    x(
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
function Tc(e, t, n, s, r) {
  return nl(
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
function sl(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Cn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const rl = ({ key: e }) => e ?? null, ss = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? De(e) || ze(e) || Q(e) ? { i: ht, r: e, k: t, f: !!n } : e : null);
function x(e, t = null, n = null, s = 0, r = null, i = e === Be ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && rl(t),
    ref: t && ss(t),
    scopeId: $o,
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
    ctx: ht
  };
  return l ? (Mr(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= De(n) ? 8 : 16), Un > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  at && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && at.push(a), a;
}
const Rt = Ec;
function Ec(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === Za) && (e = en), sl(e)) {
    const l = kn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Mr(l, n), Un > 0 && !i && at && (l.shapeFlag & 6 ? at[at.indexOf(e)] = l : at.push(l)), l.patchFlag = -2, l;
  }
  if (Dc(e) && (e = e.__vccOpts), t) {
    t = Ac(t);
    let { class: l, style: a } = t;
    l && !De(l) && (t.class = Pe(l)), $e(a) && (Lr(a) && !Y(a) && (a = Ke({}, a)), t.style = we(a));
  }
  const o = De(e) ? 1 : tl(e) ? 128 : Ba(e) ? 64 : $e(e) ? 4 : Q(e) ? 2 : 0;
  return x(
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
function Ac(e) {
  return e ? Lr(e) || jo(e) ? Ke({}, e) : e : null;
}
function kn(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: a } = e, u = t ? Ic(r || {}, t) : r, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && rl(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? Y(i) ? i.concat(ss(t)) : [i, ss(t)] : ss(t)
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
    patchFlag: t && e.type !== Be ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: e.ssContent && kn(e.ssContent),
    ssFallback: e.ssFallback && kn(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && $r(
    f,
    a.clone(f)
  ), f;
}
function yt(e = " ", t = 0) {
  return Rt(As, null, e, t);
}
function Rc(e, t) {
  const n = Rt(ns, null, e);
  return n.staticCount = t, n;
}
function ae(e = "", t = !1) {
  return t ? (P(), Tc(en, null, e)) : Rt(en, null, e);
}
function Et(e) {
  return e == null || typeof e == "boolean" ? Rt(en) : Y(e) ? Rt(
    Be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : sl(e) ? Zt(e) : Rt(As, null, String(e));
}
function Zt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : kn(e);
}
function Mr(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (Y(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Mr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !jo(t) ? t._ctx = ht : r === 3 && ht && (ht.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Q(t) ? (t = { default: t, _ctx: ht }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [yt(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Ic(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Pe([t.class, s.class]));
      else if (r === "style")
        t.style = we([t.style, s.style]);
      else if (vs(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(Y(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
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
const Oc = Vo();
let Lc = 0;
function Pc(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || Oc, i = {
    uid: Lc++,
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
    scope: new na(
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
    propsOptions: zo(s, r),
    emitsOptions: el(s, r),
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = bc.bind(null, i), e.ce && e.ce(i), i;
}
let Qe = null;
const $c = () => Qe || ht;
let gs, ur;
{
  const e = xs(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  gs = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Qe = n
  ), ur = t(
    "__VUE_SSR_SETTERS__",
    (n) => jn = n
  );
}
const zn = (e) => {
  const t = Qe;
  return gs(e), e.scope.on(), () => {
    e.scope.off(), gs(t);
  };
}, Ai = () => {
  Qe && Qe.scope.off(), gs(null);
};
function il(e) {
  return e.vnode.shapeFlag & 4;
}
let jn = !1;
function Nc(e, t = !1, n = !1) {
  t && ur(t);
  const { props: s, children: r } = e.vnode, i = il(e);
  ic(e, s, i, t), cc(e, r, n || t);
  const o = i ? Bc(e, t) : void 0;
  return t && ur(!1), o;
}
function Bc(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ya);
  const { setup: s } = n;
  if (s) {
    Dt();
    const r = e.setupContext = s.length > 1 ? Mc(e) : null, i = zn(e), o = Wn(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = io(o);
    if (qt(), i(), (l || e.sp) && !Bn(e) && No(e), l) {
      if (o.then(Ai, Ai), t)
        return o.then((a) => {
          Ri(e, a);
        }).catch((a) => {
          Cs(a, e, 0);
        });
      e.asyncDep = o;
    } else
      Ri(e, o);
  } else
    ol(e);
}
function Ri(e, t, n) {
  Q(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : $e(t) && (e.setupState = Ao(t)), ol(e);
}
function ol(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || At);
  {
    const r = zn(e);
    Dt();
    try {
      Ja(e);
    } finally {
      qt(), r();
    }
  }
}
const Fc = {
  get(e, t) {
    return We(e, "get", ""), e[t];
  }
};
function Mc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Fc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Rs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ao(xa(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Fn)
        return Fn[n](e);
    },
    has(t, n) {
      return n in t || n in Fn;
    }
  })) : e.proxy;
}
function Dc(e) {
  return Q(e) && "__vccOpts" in e;
}
const Fe = (e, t) => Aa(e, t, jn), qc = "3.5.18";
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let fr;
const Ii = typeof window < "u" && window.trustedTypes;
if (Ii)
  try {
    fr = /* @__PURE__ */ Ii.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const ll = fr ? (e) => fr.createHTML(e) : (e) => e, Vc = "http://www.w3.org/2000/svg", Hc = "http://www.w3.org/1998/Math/MathML", $t = typeof document < "u" ? document : null, Oi = $t && /* @__PURE__ */ $t.createElement("template"), Uc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? $t.createElementNS(Vc, e) : t === "mathml" ? $t.createElementNS(Hc, e) : n ? $t.createElement(e, { is: n }) : $t.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => $t.createTextNode(e),
  createComment: (e) => $t.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => $t.querySelector(e),
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
      Oi.innerHTML = ll(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Oi.content;
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
}, jc = Symbol("_vtc");
function Wc(e, t, n) {
  const s = e[jc];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Li = Symbol("_vod"), zc = Symbol("_vsh"), Kc = Symbol(""), Gc = /(^|;)\s*display\s*:/;
function Zc(e, t, n) {
  const s = e.style, r = De(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (De(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && rs(s, l, "");
        }
      else
        for (const o in t)
          n[o] == null && rs(s, o, "");
    for (const o in n)
      o === "display" && (i = !0), rs(s, o, n[o]);
  } else if (r) {
    if (t !== n) {
      const o = s[Kc];
      o && (n += ";" + o), s.cssText = n, i = Gc.test(n);
    }
  } else t && e.removeAttribute("style");
  Li in e && (e[Li] = i ? s.display : "", e[zc] && (s.display = "none"));
}
const Pi = /\s*!important$/;
function rs(e, t, n) {
  if (Y(n))
    n.forEach((s) => rs(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Yc(e, t);
    Pi.test(n) ? e.setProperty(
      nn(s),
      n.replace(Pi, ""),
      "important"
    ) : e[s] = n;
  }
}
const $i = ["Webkit", "Moz", "ms"], Ws = {};
function Yc(e, t) {
  const n = Ws[t];
  if (n)
    return n;
  let s = Qt(t);
  if (s !== "filter" && s in e)
    return Ws[t] = s;
  s = ao(s);
  for (let r = 0; r < $i.length; r++) {
    const i = $i[r] + s;
    if (i in e)
      return Ws[t] = i;
  }
  return t;
}
const Ni = "http://www.w3.org/1999/xlink";
function Bi(e, t, n, s, r, i = ta(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ni, t.slice(6, t.length)) : e.setAttributeNS(Ni, t, n) : n == null || i && !co(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : tn(n) ? String(n) : n
  );
}
function Fi(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? ll(n) : n);
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
    l === "boolean" ? n = co(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function mn(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Jc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Mi = Symbol("_vei");
function Qc(e, t, n, s, r = null) {
  const i = e[Mi] || (e[Mi] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [l, a] = Xc(t);
    if (s) {
      const u = i[t] = nu(
        s,
        r
      );
      mn(e, l, u, a);
    } else o && (Jc(e, l, o, a), i[t] = void 0);
  }
}
const Di = /(?:Once|Passive|Capture)$/;
function Xc(e) {
  let t;
  if (Di.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Di); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : nn(e.slice(2)), t];
}
let zs = 0;
const eu = /* @__PURE__ */ Promise.resolve(), tu = () => zs || (eu.then(() => zs = 0), zs = Date.now());
function nu(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Ot(
      su(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = tu(), n;
}
function su(e, t) {
  if (Y(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (r) => !r._stopped && s && s(r)
    );
  } else
    return t;
}
const qi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, ru = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? Wc(e, s, o) : t === "style" ? Zc(e, n, s) : vs(t) ? kr(t) || Qc(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : iu(e, t, s, o)) ? (Fi(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Bi(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !De(s)) ? Fi(e, Qt(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Bi(e, t, s, o));
};
function iu(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && qi(t) && Q(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return qi(t) && De(n) ? !1 : t in e;
}
const Vi = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return Y(t) ? (n) => es(t, n) : t;
};
function ou(e) {
  e.target.composing = !0;
}
function Hi(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Ks = Symbol("_assign"), an = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e[Ks] = Vi(r);
    const i = s || r.props && r.props.type === "number";
    mn(e, t ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let l = e.value;
      n && (l = l.trim()), i && (l = tr(l)), e[Ks](l);
    }), n && mn(e, "change", () => {
      e.value = e.value.trim();
    }), t || (mn(e, "compositionstart", ou), mn(e, "compositionend", Hi), mn(e, "change", Hi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[Ks] = Vi(o), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? tr(e.value) : e.value, a = t ?? "";
    l !== a && (document.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === a) || (e.value = a));
  }
}, lu = ["ctrl", "shift", "alt", "meta"], au = {
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
  exact: (e, t) => lu.some((n) => e[`${n}Key`] && !t.includes(n))
}, Ui = (e, t) => {
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = au[t[o]];
      if (l && l(r, t)) return;
    }
    return e(r, ...i);
  });
}, cu = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, ji = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = (r) => {
    if (!("key" in r))
      return;
    const i = nn(r.key);
    if (t.some(
      (o) => o === i || cu[o] === i
    ))
      return e(r);
  });
}, uu = /* @__PURE__ */ Ke({ patchProp: ru }, Uc);
let Wi;
function fu() {
  return Wi || (Wi = fc(uu));
}
const hu = (...e) => {
  const t = fu().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = pu(s);
    if (!r) return;
    const i = t._component;
    !Q(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, du(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
};
function du(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function pu(e) {
  return De(e) ? document.querySelector(e) : e;
}
const Kt = (e) => {
  const t = e.replace("#", ""), n = parseInt(t.substr(0, 2), 16), s = parseInt(t.substr(2, 2), 16), r = parseInt(t.substr(4, 2), 16);
  return (n * 299 + s * 587 + r * 114) / 1e3 < 128;
}, gu = (e, t) => {
  const n = e.replace("#", ""), s = parseInt(n.substr(0, 2), 16), r = parseInt(n.substr(2, 2), 16), i = parseInt(n.substr(4, 2), 16), o = Kt(e), l = o ? Math.min(255, s + t) : Math.max(0, s - t), a = o ? Math.min(255, r + t) : Math.max(0, r - t), u = o ? Math.min(255, i + t) : Math.max(0, i - t);
  return `#${l.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}${u.toString(16).padStart(2, "0")}`;
}, Tn = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e), mu = (e) => {
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
function Dr() {
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
var dn = Dr();
function al(e) {
  dn = e;
}
var Dn = { exec: () => null };
function ve(e, t = "") {
  let n = typeof e == "string" ? e : e.source;
  const s = {
    replace: (r, i) => {
      let o = typeof i == "string" ? i : i.source;
      return o = o.replace(Xe.caret, "$1"), n = n.replace(r, o), s;
    },
    getRegex: () => new RegExp(n, t)
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
  listItemRegex: (e) => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
  nextBulletRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
  hrRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
  fencesBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`),
  headingBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}#`),
  htmlBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i")
}, _u = /^(?:[ \t]*(?:\n|$))+/, yu = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, bu = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Kn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, vu = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, qr = /(?:[*+-]|\d{1,9}[.)])/, cl = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, ul = ve(cl).replace(/bull/g, qr).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), wu = ve(cl).replace(/bull/g, qr).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Vr = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, ku = /^[^\n]+/, Hr = /(?!\s*\])(?:\\.|[^\[\]\\])+/, xu = ve(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Hr).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Su = ve(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, qr).getRegex(), Is = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Ur = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Cu = ve(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", Ur).replace("tag", Is).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), fl = ve(Vr).replace("hr", Kn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Is).getRegex(), Tu = ve(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", fl).getRegex(), jr = {
  blockquote: Tu,
  code: yu,
  def: xu,
  fences: bu,
  heading: vu,
  hr: Kn,
  html: Cu,
  lheading: ul,
  list: Su,
  newline: _u,
  paragraph: fl,
  table: Dn,
  text: ku
}, zi = ve(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", Kn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Is).getRegex(), Eu = {
  ...jr,
  lheading: wu,
  table: zi,
  paragraph: ve(Vr).replace("hr", Kn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", zi).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Is).getRegex()
}, Au = {
  ...jr,
  html: ve(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", Ur).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Dn,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: ve(Vr).replace("hr", Kn).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", ul).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Ru = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Iu = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, hl = /^( {2,}|\\)\n(?!\s*$)/, Ou = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Os = /[\p{P}\p{S}]/u, Wr = /[\s\p{P}\p{S}]/u, dl = /[^\s\p{P}\p{S}]/u, Lu = ve(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Wr).getRegex(), pl = /(?!~)[\p{P}\p{S}]/u, Pu = /(?!~)[\s\p{P}\p{S}]/u, $u = /(?:[^\s\p{P}\p{S}]|~)/u, Nu = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, gl = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Bu = ve(gl, "u").replace(/punct/g, Os).getRegex(), Fu = ve(gl, "u").replace(/punct/g, pl).getRegex(), ml = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Mu = ve(ml, "gu").replace(/notPunctSpace/g, dl).replace(/punctSpace/g, Wr).replace(/punct/g, Os).getRegex(), Du = ve(ml, "gu").replace(/notPunctSpace/g, $u).replace(/punctSpace/g, Pu).replace(/punct/g, pl).getRegex(), qu = ve(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, dl).replace(/punctSpace/g, Wr).replace(/punct/g, Os).getRegex(), Vu = ve(/\\(punct)/, "gu").replace(/punct/g, Os).getRegex(), Hu = ve(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Uu = ve(Ur).replace("(?:-->|$)", "-->").getRegex(), ju = ve(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", Uu).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), ms = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, Wu = ve(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", ms).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), _l = ve(/^!?\[(label)\]\[(ref)\]/).replace("label", ms).replace("ref", Hr).getRegex(), yl = ve(/^!?\[(ref)\](?:\[\])?/).replace("ref", Hr).getRegex(), zu = ve("reflink|nolink(?!\\()", "g").replace("reflink", _l).replace("nolink", yl).getRegex(), zr = {
  _backpedal: Dn,
  // only used for GFM url
  anyPunctuation: Vu,
  autolink: Hu,
  blockSkip: Nu,
  br: hl,
  code: Iu,
  del: Dn,
  emStrongLDelim: Bu,
  emStrongRDelimAst: Mu,
  emStrongRDelimUnd: qu,
  escape: Ru,
  link: Wu,
  nolink: yl,
  punctuation: Lu,
  reflink: _l,
  reflinkSearch: zu,
  tag: ju,
  text: Ou,
  url: Dn
}, Ku = {
  ...zr,
  link: ve(/^!?\[(label)\]\((.*?)\)/).replace("label", ms).getRegex(),
  reflink: ve(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", ms).getRegex()
}, hr = {
  ...zr,
  emStrongRDelimAst: Du,
  emStrongLDelim: Fu,
  url: ve(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Gu = {
  ...hr,
  br: ve(hl).replace("{2,}", "*").getRegex(),
  text: ve(hr.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Jn = {
  normal: jr,
  gfm: Eu,
  pedantic: Au
}, En = {
  normal: zr,
  gfm: hr,
  breaks: Gu,
  pedantic: Ku
}, Zu = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Ki = (e) => Zu[e];
function Ct(e, t) {
  if (t) {
    if (Xe.escapeTest.test(e))
      return e.replace(Xe.escapeReplace, Ki);
  } else if (Xe.escapeTestNoEncode.test(e))
    return e.replace(Xe.escapeReplaceNoEncode, Ki);
  return e;
}
function Gi(e) {
  try {
    e = encodeURI(e).replace(Xe.percentDecode, "%");
  } catch {
    return null;
  }
  return e;
}
function Zi(e, t) {
  var i;
  const n = e.replace(Xe.findPipe, (o, l, a) => {
    let u = !1, f = l;
    for (; --f >= 0 && a[f] === "\\"; ) u = !u;
    return u ? "|" : " |";
  }), s = n.split(Xe.splitPipe);
  let r = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((i = s.at(-1)) != null && i.trim()) && s.pop(), t)
    if (s.length > t)
      s.splice(t);
    else
      for (; s.length < t; ) s.push("");
  for (; r < s.length; r++)
    s[r] = s[r].trim().replace(Xe.slashPipe, "|");
  return s;
}
function An(e, t, n) {
  const s = e.length;
  if (s === 0)
    return "";
  let r = 0;
  for (; r < s && e.charAt(s - r - 1) === t; )
    r++;
  return e.slice(0, s - r);
}
function Yu(e, t) {
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
function Yi(e, t, n, s, r) {
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
function Ju(e, t, n) {
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
var _s = class {
  // set by the lexer
  constructor(e) {
    Ce(this, "options");
    Ce(this, "rules");
    // set by the lexer
    Ce(this, "lexer");
    this.options = e || dn;
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
        text: this.options.pedantic ? n : An(n, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const n = t[0], s = Ju(n, t[3] || "", this.rules);
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
        const s = An(n, "#");
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
        raw: An(t[0], `
`)
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = An(t[0], `
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
`), f = u.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${u}` : u, r = r ? `${r}
${f}` : f;
        const _ = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(f, i, !0), this.lexer.state.top = _, n.length === 0)
          break;
        const v = i.at(-1);
        if ((v == null ? void 0 : v.type) === "code")
          break;
        if ((v == null ? void 0 : v.type) === "blockquote") {
          const I = v, B = I.raw + `
` + n.join(`
`), q = this.blockquote(B);
          i[i.length - 1] = q, s = s.substring(0, s.length - I.raw.length) + q.raw, r = r.substring(0, r.length - I.text.length) + q.text;
          break;
        } else if ((v == null ? void 0 : v.type) === "list") {
          const I = v, B = I.raw + `
` + n.join(`
`), q = this.list(B);
          i[i.length - 1] = q, s = s.substring(0, s.length - v.raw.length) + q.raw, r = r.substring(0, r.length - I.raw.length) + q.raw, n = B.substring(i.at(-1).raw.length).split(`
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
        let a = !1, u = "", f = "";
        if (!(t = i.exec(e)) || this.rules.block.hr.test(e))
          break;
        u = t[0], e = e.substring(u.length);
        let _ = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (te) => " ".repeat(3 * te.length)), v = e.split(`
`, 1)[0], I = !_.trim(), B = 0;
        if (this.options.pedantic ? (B = 2, f = _.trimStart()) : I ? B = t[1].length + 1 : (B = t[2].search(this.rules.other.nonSpaceChar), B = B > 4 ? 1 : B, f = _.slice(B), B += t[1].length), I && this.rules.other.blankLine.test(v) && (u += v + `
`, e = e.substring(v.length + 1), a = !0), !a) {
          const te = this.rules.other.nextBulletRegex(B), de = this.rules.other.hrRegex(B), pe = this.rules.other.fencesBeginRegex(B), H = this.rules.other.headingBeginRegex(B), le = this.rules.other.htmlBeginRegex(B);
          for (; e; ) {
            const qe = e.split(`
`, 1)[0];
            let fe;
            if (v = qe, this.options.pedantic ? (v = v.replace(this.rules.other.listReplaceNesting, "  "), fe = v) : fe = v.replace(this.rules.other.tabCharGlobal, "    "), pe.test(v) || H.test(v) || le.test(v) || te.test(v) || de.test(v))
              break;
            if (fe.search(this.rules.other.nonSpaceChar) >= B || !v.trim())
              f += `
` + fe.slice(B);
            else {
              if (I || _.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || pe.test(_) || H.test(_) || de.test(_))
                break;
              f += `
` + v;
            }
            !I && !v.trim() && (I = !0), u += qe + `
`, e = e.substring(qe.length + 1), _ = fe.slice(B);
          }
        }
        r.loose || (o ? r.loose = !0 : this.rules.other.doubleBlankLine.test(u) && (o = !0));
        let q = null, ke;
        this.options.gfm && (q = this.rules.other.listIsTask.exec(f), q && (ke = q[0] !== "[ ] ", f = f.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: u,
          task: !!q,
          checked: ke,
          loose: !1,
          text: f,
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
          const u = r.items[a].tokens.filter((_) => _.type === "space"), f = u.length > 0 && u.some((_) => this.rules.other.anyLine.test(_.raw));
          r.loose = f;
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
    const n = Zi(t[1]), s = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (o = t[3]) != null && o.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
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
        i.rows.push(Zi(l, i.header.length).map((a, u) => ({
          text: a,
          tokens: this.lexer.inline(a),
          header: !1,
          align: i.align[u]
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
        const i = An(n.slice(0, -1), "\\");
        if ((n.length - i.length) % 2 === 0)
          return;
      } else {
        const i = Yu(t[2], "()");
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
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), Yi(t, {
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
      return Yi(n, r, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let s = this.rules.inline.emStrongLDelim.exec(e);
    if (!s || s[3] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(s[1] || s[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      const i = [...s[0]].length - 1;
      let o, l, a = i, u = 0;
      const f = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (f.lastIndex = 0, t = t.slice(-1 * e.length + i); (s = f.exec(t)) != null; ) {
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
        const _ = [...s[0]][0].length, v = e.slice(0, i + s.index + _ + l);
        if (Math.min(i, l) % 2) {
          const B = v.slice(1, -1);
          return {
            type: "em",
            raw: v,
            text: B,
            tokens: this.lexer.inlineTokens(B)
          };
        }
        const I = v.slice(2, -2);
        return {
          type: "strong",
          raw: v,
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
}, Ft = class dr {
  constructor(t) {
    Ce(this, "tokens");
    Ce(this, "options");
    Ce(this, "state");
    Ce(this, "tokenizer");
    Ce(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || dn, this.options.tokenizer = this.options.tokenizer || new _s(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      other: Xe,
      block: Jn.normal,
      inline: En.normal
    };
    this.options.pedantic ? (n.block = Jn.pedantic, n.inline = En.pedantic) : this.options.gfm && (n.block = Jn.gfm, this.options.breaks ? n.inline = En.breaks : n.inline = En.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: Jn,
      inline: En
    };
  }
  /**
   * Static Lex Method
   */
  static lex(t, n) {
    return new dr(n).lex(t);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(t, n) {
    return new dr(n).inlineTokens(t);
  }
  /**
   * Preprocessing
   */
  lex(t) {
    t = t.replace(Xe.carriageReturn, `
`), this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const s = this.inlineQueue[n];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, n = [], s = !1) {
    var r, i, o;
    for (this.options.pedantic && (t = t.replace(Xe.tabCharGlobal, "    ").replace(Xe.spaceLine, "")); t; ) {
      let l;
      if ((i = (r = this.options.extensions) == null ? void 0 : r.block) != null && i.some((u) => (l = u.call({ lexer: this }, t, n)) ? (t = t.substring(l.raw.length), n.push(l), !0) : !1))
        continue;
      if (l = this.tokenizer.space(t)) {
        t = t.substring(l.raw.length);
        const u = n.at(-1);
        l.raw.length === 1 && u !== void 0 ? u.raw += `
` : n.push(l);
        continue;
      }
      if (l = this.tokenizer.code(t)) {
        t = t.substring(l.raw.length);
        const u = n.at(-1);
        (u == null ? void 0 : u.type) === "paragraph" || (u == null ? void 0 : u.type) === "text" ? (u.raw += `
` + l.raw, u.text += `
` + l.text, this.inlineQueue.at(-1).src = u.text) : n.push(l);
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
        const u = n.at(-1);
        (u == null ? void 0 : u.type) === "paragraph" || (u == null ? void 0 : u.type) === "text" ? (u.raw += `
` + l.raw, u.text += `
` + l.raw, this.inlineQueue.at(-1).src = u.text) : this.tokens.links[l.tag] || (this.tokens.links[l.tag] = {
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
        let u = 1 / 0;
        const f = t.slice(1);
        let _;
        this.options.extensions.startBlock.forEach((v) => {
          _ = v.call({ lexer: this }, f), typeof _ == "number" && _ >= 0 && (u = Math.min(u, _));
        }), u < 1 / 0 && u >= 0 && (a = t.substring(0, u + 1));
      }
      if (this.state.top && (l = this.tokenizer.paragraph(a))) {
        const u = n.at(-1);
        s && (u == null ? void 0 : u.type) === "paragraph" ? (u.raw += `
` + l.raw, u.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = u.text) : n.push(l), s = a.length !== t.length, t = t.substring(l.raw.length);
        continue;
      }
      if (l = this.tokenizer.text(t)) {
        t = t.substring(l.raw.length);
        const u = n.at(-1);
        (u == null ? void 0 : u.type) === "text" ? (u.raw += `
` + l.raw, u.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = u.text) : n.push(l);
        continue;
      }
      if (t) {
        const u = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(u);
          break;
        } else
          throw new Error(u);
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
    var l, a, u;
    let s = t, r = null;
    if (this.tokens.links) {
      const f = Object.keys(this.tokens.links);
      if (f.length > 0)
        for (; (r = this.tokenizer.rules.inline.reflinkSearch.exec(s)) != null; )
          f.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (s = s.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(s)) != null; )
      s = s.slice(0, r.index) + "++" + s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (r = this.tokenizer.rules.inline.blockSkip.exec(s)) != null; )
      s = s.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    let i = !1, o = "";
    for (; t; ) {
      i || (o = ""), i = !1;
      let f;
      if ((a = (l = this.options.extensions) == null ? void 0 : l.inline) != null && a.some((v) => (f = v.call({ lexer: this }, t, n)) ? (t = t.substring(f.raw.length), n.push(f), !0) : !1))
        continue;
      if (f = this.tokenizer.escape(t)) {
        t = t.substring(f.raw.length), n.push(f);
        continue;
      }
      if (f = this.tokenizer.tag(t)) {
        t = t.substring(f.raw.length), n.push(f);
        continue;
      }
      if (f = this.tokenizer.link(t)) {
        t = t.substring(f.raw.length), n.push(f);
        continue;
      }
      if (f = this.tokenizer.reflink(t, this.tokens.links)) {
        t = t.substring(f.raw.length);
        const v = n.at(-1);
        f.type === "text" && (v == null ? void 0 : v.type) === "text" ? (v.raw += f.raw, v.text += f.text) : n.push(f);
        continue;
      }
      if (f = this.tokenizer.emStrong(t, s, o)) {
        t = t.substring(f.raw.length), n.push(f);
        continue;
      }
      if (f = this.tokenizer.codespan(t)) {
        t = t.substring(f.raw.length), n.push(f);
        continue;
      }
      if (f = this.tokenizer.br(t)) {
        t = t.substring(f.raw.length), n.push(f);
        continue;
      }
      if (f = this.tokenizer.del(t)) {
        t = t.substring(f.raw.length), n.push(f);
        continue;
      }
      if (f = this.tokenizer.autolink(t)) {
        t = t.substring(f.raw.length), n.push(f);
        continue;
      }
      if (!this.state.inLink && (f = this.tokenizer.url(t))) {
        t = t.substring(f.raw.length), n.push(f);
        continue;
      }
      let _ = t;
      if ((u = this.options.extensions) != null && u.startInline) {
        let v = 1 / 0;
        const I = t.slice(1);
        let B;
        this.options.extensions.startInline.forEach((q) => {
          B = q.call({ lexer: this }, I), typeof B == "number" && B >= 0 && (v = Math.min(v, B));
        }), v < 1 / 0 && v >= 0 && (_ = t.substring(0, v + 1));
      }
      if (f = this.tokenizer.inlineText(_)) {
        t = t.substring(f.raw.length), f.raw.slice(-1) !== "_" && (o = f.raw.slice(-1)), i = !0;
        const v = n.at(-1);
        (v == null ? void 0 : v.type) === "text" ? (v.raw += f.raw, v.text += f.text) : n.push(f);
        continue;
      }
      if (t) {
        const v = "Infinite loop on byte: " + t.charCodeAt(0);
        if (this.options.silent) {
          console.error(v);
          break;
        } else
          throw new Error(v);
      }
    }
    return n;
  }
}, ys = class {
  // set by the parser
  constructor(e) {
    Ce(this, "options");
    Ce(this, "parser");
    this.options = e || dn;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    var i;
    const s = (i = (t || "").match(Xe.notSpaceStart)) == null ? void 0 : i[0], r = e.replace(Xe.endingNewline, "") + `
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
    const s = this.parser.parseInline(n), r = Gi(e);
    if (r === null)
      return s;
    e = r;
    let i = '<a href="' + e + '"';
    return t && (i += ' title="' + Ct(t) + '"'), i += ">" + s + "</a>", i;
  }
  image({ href: e, title: t, text: n, tokens: s }) {
    s && (n = this.parser.parseInline(s, this.parser.textRenderer));
    const r = Gi(e);
    if (r === null)
      return Ct(n);
    e = r;
    let i = `<img src="${e}" alt="${n}"`;
    return t && (i += ` title="${Ct(t)}"`), i += ">", i;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : Ct(e.text);
  }
}, Kr = class {
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
}, Mt = class pr {
  constructor(t) {
    Ce(this, "options");
    Ce(this, "renderer");
    Ce(this, "textRenderer");
    this.options = t || dn, this.options.renderer = this.options.renderer || new ys(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Kr();
  }
  /**
   * Static Parse Method
   */
  static parse(t, n) {
    return new pr(n).parse(t);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(t, n) {
    return new pr(n).parseInline(t);
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
        const u = l, f = this.options.extensions.renderers[u.type].call({ parser: this }, u);
        if (f !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(u.type)) {
          s += f || "";
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
          let u = a, f = this.renderer.text(u);
          for (; o + 1 < t.length && t[o + 1].type === "text"; )
            u = t[++o], f += `
` + this.renderer.text(u);
          n ? s += this.renderer.paragraph({
            type: "paragraph",
            raw: f,
            text: f,
            tokens: [{ type: "text", raw: f, text: f, escaped: !0 }]
          }) : s += f;
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
  parseInline(t, n = this.renderer) {
    var r, i;
    let s = "";
    for (let o = 0; o < t.length; o++) {
      const l = t[o];
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
}, Xs, is = (Xs = class {
  constructor(e) {
    Ce(this, "options");
    Ce(this, "block");
    this.options = e || dn;
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
    return this.block ? Ft.lex : Ft.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? Mt.parse : Mt.parseInline;
  }
}, Ce(Xs, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
])), Xs), Qu = class {
  constructor(...e) {
    Ce(this, "defaults", Dr());
    Ce(this, "options", this.setOptions);
    Ce(this, "parse", this.parseMarkdown(!0));
    Ce(this, "parseInline", this.parseMarkdown(!1));
    Ce(this, "Parser", Mt);
    Ce(this, "Renderer", ys);
    Ce(this, "TextRenderer", Kr);
    Ce(this, "Lexer", Ft);
    Ce(this, "Tokenizer", _s);
    Ce(this, "Hooks", is);
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
        const r = this.defaults.renderer || new ys(this.defaults);
        for (const i in n.renderer) {
          if (!(i in r))
            throw new Error(`renderer '${i}' does not exist`);
          if (["options", "parser"].includes(i))
            continue;
          const o = i, l = n.renderer[o], a = r[o];
          r[o] = (...u) => {
            let f = l.apply(r, u);
            return f === !1 && (f = a.apply(r, u)), f || "";
          };
        }
        s.renderer = r;
      }
      if (n.tokenizer) {
        const r = this.defaults.tokenizer || new _s(this.defaults);
        for (const i in n.tokenizer) {
          if (!(i in r))
            throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i))
            continue;
          const o = i, l = n.tokenizer[o], a = r[o];
          r[o] = (...u) => {
            let f = l.apply(r, u);
            return f === !1 && (f = a.apply(r, u)), f;
          };
        }
        s.tokenizer = r;
      }
      if (n.hooks) {
        const r = this.defaults.hooks || new is();
        for (const i in n.hooks) {
          if (!(i in r))
            throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i))
            continue;
          const o = i, l = n.hooks[o], a = r[o];
          is.passThroughHooks.has(i) ? r[o] = (u) => {
            if (this.defaults.async)
              return Promise.resolve(l.call(r, u)).then((_) => a.call(r, _));
            const f = l.call(r, u);
            return a.call(r, f);
          } : r[o] = (...u) => {
            let f = l.apply(r, u);
            return f === !1 && (f = a.apply(r, u)), f;
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
    return Ft.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return Mt.parse(e, t ?? this.defaults);
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
      const l = i.hooks ? i.hooks.provideLexer() : e ? Ft.lex : Ft.lexInline, a = i.hooks ? i.hooks.provideParser() : e ? Mt.parse : Mt.parseInline;
      if (i.async)
        return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n).then((u) => l(u, i)).then((u) => i.hooks ? i.hooks.processAllTokens(u) : u).then((u) => i.walkTokens ? Promise.all(this.walkTokens(u, i.walkTokens)).then(() => u) : u).then((u) => a(u, i)).then((u) => i.hooks ? i.hooks.postprocess(u) : u).catch(o);
      try {
        i.hooks && (n = i.hooks.preprocess(n));
        let u = l(n, i);
        i.hooks && (u = i.hooks.processAllTokens(u)), i.walkTokens && this.walkTokens(u, i.walkTokens);
        let f = a(u, i);
        return i.hooks && (f = i.hooks.postprocess(f)), f;
      } catch (u) {
        return o(u);
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
}, hn = new Qu();
function ue(e, t) {
  return hn.parse(e, t);
}
ue.options = ue.setOptions = function(e) {
  return hn.setOptions(e), ue.defaults = hn.defaults, al(ue.defaults), ue;
};
ue.getDefaults = Dr;
ue.defaults = dn;
ue.use = function(...e) {
  return hn.use(...e), ue.defaults = hn.defaults, al(ue.defaults), ue;
};
ue.walkTokens = function(e, t) {
  return hn.walkTokens(e, t);
};
ue.parseInline = hn.parseInline;
ue.Parser = Mt;
ue.parser = Mt.parse;
ue.Renderer = ys;
ue.TextRenderer = Kr;
ue.Lexer = Ft;
ue.lexer = Ft.lex;
ue.Tokenizer = _s;
ue.Hooks = is;
ue.parse = ue;
ue.options;
ue.setOptions;
ue.use;
ue.walkTokens;
ue.parseInline;
Mt.parse;
Ft.lex;
function Ji() {
  return typeof window < "u" && window.APP_CONFIG ? window.APP_CONFIG : {};
}
const bs = {
  get API_URL() {
    return Ji().API_URL || "https://api.chattermate.chat/api/v1";
  },
  get WS_URL() {
    return Ji().WS_URL || "wss://api.chattermate.chat";
  }
};
function Xu(e) {
  const t = Fe(() => ({
    backgroundColor: e.value.chat_background_color || "#ffffff",
    color: Kt(e.value.chat_background_color || "#ffffff") ? "#ffffff" : "#000000"
  })), n = Fe(() => ({
    backgroundColor: e.value.chat_bubble_color || "#f34611",
    color: Kt(e.value.chat_bubble_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), s = Fe(() => {
    const u = e.value.chat_background_color || "#F8F9FA", f = gu(u, 20);
    return {
      backgroundColor: f,
      color: Kt(f) ? "#FFFFFF" : "#000000"
    };
  }), r = Fe(() => ({
    backgroundColor: e.value.accent_color || "#f34611",
    color: Kt(e.value.accent_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), i = Fe(() => ({
    color: Kt(e.value.chat_background_color || "#F8F9FA") ? "#FFFFFF" : "#000000"
  })), o = Fe(() => ({
    borderBottom: `1px solid ${Kt(e.value.chat_background_color || "#F8F9FA") ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`
  })), l = Fe(() => e.value.photo_url ? e.value.photo_url.includes("amazonaws.com") ? e.value.photo_url : `${bs.API_URL}${e.value.photo_url}` : ""), a = Fe(() => {
    const u = e.value.chat_background_color || "#ffffff";
    return {
      boxShadow: `0 8px 5px ${Kt(u) ? "rgba(0, 0, 0, 0.24)" : "rgba(0, 0, 0, 0.12)"}`
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
const os = /* @__PURE__ */ Object.create(null);
Object.keys(Lt).forEach((e) => {
  os[Lt[e]] = e;
});
const gr = { type: "error", data: "parser error" }, bl = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", vl = typeof ArrayBuffer == "function", wl = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e && e.buffer instanceof ArrayBuffer, Gr = ({ type: e, data: t }, n, s) => bl && t instanceof Blob ? n ? s(t) : Qi(t, s) : vl && (t instanceof ArrayBuffer || wl(t)) ? n ? s(t) : Qi(new Blob([t]), s) : s(Lt[e] + (t || "")), Qi = (e, t) => {
  const n = new FileReader();
  return n.onload = function() {
    const s = n.result.split(",")[1];
    t("b" + (s || ""));
  }, n.readAsDataURL(e);
};
function Xi(e) {
  return e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let Gs;
function ef(e, t) {
  if (bl && e.data instanceof Blob)
    return e.data.arrayBuffer().then(Xi).then(t);
  if (vl && (e.data instanceof ArrayBuffer || wl(e.data)))
    return t(Xi(e.data));
  Gr(e, !1, (n) => {
    Gs || (Gs = new TextEncoder()), t(Gs.encode(n));
  });
}
const eo = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", On = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < eo.length; e++)
  On[eo.charCodeAt(e)] = e;
const tf = (e) => {
  let t = e.length * 0.75, n = e.length, s, r = 0, i, o, l, a;
  e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
  const u = new ArrayBuffer(t), f = new Uint8Array(u);
  for (s = 0; s < n; s += 4)
    i = On[e.charCodeAt(s)], o = On[e.charCodeAt(s + 1)], l = On[e.charCodeAt(s + 2)], a = On[e.charCodeAt(s + 3)], f[r++] = i << 2 | o >> 4, f[r++] = (o & 15) << 4 | l >> 2, f[r++] = (l & 3) << 6 | a & 63;
  return u;
}, nf = typeof ArrayBuffer == "function", Zr = (e, t) => {
  if (typeof e != "string")
    return {
      type: "message",
      data: kl(e, t)
    };
  const n = e.charAt(0);
  return n === "b" ? {
    type: "message",
    data: sf(e.substring(1), t)
  } : os[n] ? e.length > 1 ? {
    type: os[n],
    data: e.substring(1)
  } : {
    type: os[n]
  } : gr;
}, sf = (e, t) => {
  if (nf) {
    const n = tf(e);
    return kl(n, t);
  } else
    return { base64: !0, data: e };
}, kl = (e, t) => {
  switch (t) {
    case "blob":
      return e instanceof Blob ? e : new Blob([e]);
    case "arraybuffer":
    default:
      return e instanceof ArrayBuffer ? e : e.buffer;
  }
}, xl = "", rf = (e, t) => {
  const n = e.length, s = new Array(n);
  let r = 0;
  e.forEach((i, o) => {
    Gr(i, !1, (l) => {
      s[o] = l, ++r === n && t(s.join(xl));
    });
  });
}, of = (e, t) => {
  const n = e.split(xl), s = [];
  for (let r = 0; r < n.length; r++) {
    const i = Zr(n[r], t);
    if (s.push(i), i.type === "error")
      break;
  }
  return s;
};
function lf() {
  return new TransformStream({
    transform(e, t) {
      ef(e, (n) => {
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
let Zs;
function Qn(e) {
  return e.reduce((t, n) => t + n.length, 0);
}
function Xn(e, t) {
  if (e[0].length === t)
    return e.shift();
  const n = new Uint8Array(t);
  let s = 0;
  for (let r = 0; r < t; r++)
    n[r] = e[0][s++], s === e[0].length && (e.shift(), s = 0);
  return e.length && s < e[0].length && (e[0] = e[0].slice(s)), n;
}
function af(e, t) {
  Zs || (Zs = new TextDecoder());
  const n = [];
  let s = 0, r = -1, i = !1;
  return new TransformStream({
    transform(o, l) {
      for (n.push(o); ; ) {
        if (s === 0) {
          if (Qn(n) < 1)
            break;
          const a = Xn(n, 1);
          i = (a[0] & 128) === 128, r = a[0] & 127, r < 126 ? s = 3 : r === 126 ? s = 1 : s = 2;
        } else if (s === 1) {
          if (Qn(n) < 2)
            break;
          const a = Xn(n, 2);
          r = new DataView(a.buffer, a.byteOffset, a.length).getUint16(0), s = 3;
        } else if (s === 2) {
          if (Qn(n) < 8)
            break;
          const a = Xn(n, 8), u = new DataView(a.buffer, a.byteOffset, a.length), f = u.getUint32(0);
          if (f > Math.pow(2, 21) - 1) {
            l.enqueue(gr);
            break;
          }
          r = f * Math.pow(2, 32) + u.getUint32(4), s = 3;
        } else {
          if (Qn(n) < r)
            break;
          const a = Xn(n, r);
          l.enqueue(Zr(i ? a : Zs.decode(a), t)), s = 0;
        }
        if (r === 0 || r > e) {
          l.enqueue(gr);
          break;
        }
      }
    }
  });
}
const Sl = 4;
function Me(e) {
  if (e) return cf(e);
}
function cf(e) {
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
const Ls = typeof Promise == "function" && typeof Promise.resolve == "function" ? (t) => Promise.resolve().then(t) : (t, n) => n(t, 0), ft = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), uf = "arraybuffer";
function Cl(e, ...t) {
  return t.reduce((n, s) => (e.hasOwnProperty(s) && (n[s] = e[s]), n), {});
}
const ff = ft.setTimeout, hf = ft.clearTimeout;
function Ps(e, t) {
  t.useNativeTimers ? (e.setTimeoutFn = ff.bind(ft), e.clearTimeoutFn = hf.bind(ft)) : (e.setTimeoutFn = ft.setTimeout.bind(ft), e.clearTimeoutFn = ft.clearTimeout.bind(ft));
}
const df = 1.33;
function pf(e) {
  return typeof e == "string" ? gf(e) : Math.ceil((e.byteLength || e.size) * df);
}
function gf(e) {
  let t = 0, n = 0;
  for (let s = 0, r = e.length; s < r; s++)
    t = e.charCodeAt(s), t < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (s++, n += 4);
  return n;
}
function Tl() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function mf(e) {
  let t = "";
  for (let n in e)
    e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
  return t;
}
function _f(e) {
  let t = {}, n = e.split("&");
  for (let s = 0, r = n.length; s < r; s++) {
    let i = n[s].split("=");
    t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
  }
  return t;
}
class yf extends Error {
  constructor(t, n, s) {
    super(t), this.description = n, this.context = s, this.type = "TransportError";
  }
}
class Yr extends Me {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(t) {
    super(), this.writable = !1, Ps(this, t), this.opts = t, this.query = t.query, this.socket = t.socket, this.supportsBinary = !t.forceBase64;
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
    return super.emitReserved("error", new yf(t, n, s)), this;
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
    const n = Zr(t, this.socket.binaryType);
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
    const n = mf(t);
    return n.length ? "?" + n : "";
  }
}
class bf extends Yr {
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
    of(t, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
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
    this.writable = !1, rf(t, (n) => {
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
    return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = Tl()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(t, n);
  }
}
let El = !1;
try {
  El = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const vf = El;
function wf() {
}
class kf extends bf {
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
    super(), this.createRequest = t, Ps(this, s), this._opts = s, this._method = s.method || "GET", this._uri = n, this._data = s.data !== void 0 ? s.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var t;
    const n = Cl(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
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
      if (this._xhr.onreadystatechange = wf, t)
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
    attachEvent("onunload", to);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in ft ? "pagehide" : "unload";
    addEventListener(e, to, !1);
  }
}
function to() {
  for (let e in It.requests)
    It.requests.hasOwnProperty(e) && It.requests[e].abort();
}
const xf = function() {
  const e = Al({
    xdomain: !1
  });
  return e && e.responseType !== null;
}();
class Sf extends kf {
  constructor(t) {
    super(t);
    const n = t && t.forceBase64;
    this.supportsBinary = xf && !n;
  }
  request(t = {}) {
    return Object.assign(t, { xd: this.xd }, this.opts), new It(Al, this.uri(), t);
  }
}
function Al(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || vf))
      return new XMLHttpRequest();
  } catch {
  }
  if (!t)
    try {
      return new ft[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const Rl = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class Cf extends Yr {
  get name() {
    return "websocket";
  }
  doOpen() {
    const t = this.uri(), n = this.opts.protocols, s = Rl ? {} : Cl(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
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
      Gr(s, this.supportsBinary, (i) => {
        try {
          this.doWrite(s, i);
        } catch {
        }
        r && Ls(() => {
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
    return this.opts.timestampRequests && (n[this.opts.timestampParam] = Tl()), this.supportsBinary || (n.b64 = 1), this.createUri(t, n);
  }
}
const Ys = ft.WebSocket || ft.MozWebSocket;
class Tf extends Cf {
  createSocket(t, n, s) {
    return Rl ? new Ys(t, n, s) : n ? new Ys(t, n) : new Ys(t);
  }
  doWrite(t, n) {
    this.ws.send(n);
  }
}
class Ef extends Yr {
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
        const n = af(Number.MAX_SAFE_INTEGER, this.socket.binaryType), s = t.readable.pipeThrough(n).getReader(), r = lf();
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
        r && Ls(() => {
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
const Af = {
  websocket: Tf,
  webtransport: Ef,
  polling: Sf
}, Rf = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, If = [
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
function mr(e) {
  if (e.length > 8e3)
    throw "URI too long";
  const t = e, n = e.indexOf("["), s = e.indexOf("]");
  n != -1 && s != -1 && (e = e.substring(0, n) + e.substring(n, s).replace(/:/g, ";") + e.substring(s, e.length));
  let r = Rf.exec(e || ""), i = {}, o = 14;
  for (; o--; )
    i[If[o]] = r[o] || "";
  return n != -1 && s != -1 && (i.source = t, i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"), i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), i.ipv6uri = !0), i.pathNames = Of(i, i.path), i.queryKey = Lf(i, i.query), i;
}
function Of(e, t) {
  const n = /\/{2,9}/g, s = t.replace(n, "/").split("/");
  return (t.slice(0, 1) == "/" || t.length === 0) && s.splice(0, 1), t.slice(-1) == "/" && s.splice(s.length - 1, 1), s;
}
function Lf(e, t) {
  const n = {};
  return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, r, i) {
    r && (n[r] = i);
  }), n;
}
const _r = typeof addEventListener == "function" && typeof removeEventListener == "function", ls = [];
_r && addEventListener("offline", () => {
  ls.forEach((e) => e());
}, !1);
class Jt extends Me {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(t, n) {
    if (super(), this.binaryType = uf, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, t && typeof t == "object" && (n = t, t = null), t) {
      const s = mr(t);
      n.hostname = s.host, n.secure = s.protocol === "https" || s.protocol === "wss", n.port = s.port, s.query && (n.query = s.query);
    } else n.host && (n.hostname = mr(n.host).host);
    Ps(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((s) => {
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
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = _f(this.opts.query)), _r && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, ls.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
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
    n.EIO = Sl, n.transport = t, this.id && (n.sid = this.id);
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
    const t = this.opts.rememberUpgrade && Jt.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
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
    this.readyState = "open", Jt.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
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
      if (r && (n += pf(r)), s > 0 && n > this._maxPayload)
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
    return t && (this._pingTimeoutTime = 0, Ls(() => {
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
    if (Jt.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
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
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), _r && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const s = ls.indexOf(this._offlineEventListener);
        s !== -1 && ls.splice(s, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", t, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
Jt.protocol = Sl;
class Pf extends Jt {
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
    Jt.priorWebsocketSuccess = !1;
    const r = () => {
      s || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (_) => {
        if (!s)
          if (_.type === "pong" && _.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", n), !n)
              return;
            Jt.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
              s || this.readyState !== "closed" && (f(), this.setTransport(n), n.send([{ type: "upgrade" }]), this.emitReserved("upgrade", n), n = null, this.upgrading = !1, this.flush());
            });
          } else {
            const v = new Error("probe error");
            v.transport = n.name, this.emitReserved("upgradeError", v);
          }
      }));
    };
    function i() {
      s || (s = !0, f(), n.close(), n = null);
    }
    const o = (_) => {
      const v = new Error("probe error: " + _);
      v.transport = n.name, i(), this.emitReserved("upgradeError", v);
    };
    function l() {
      o("transport closed");
    }
    function a() {
      o("socket closed");
    }
    function u(_) {
      n && _.name !== n.name && i();
    }
    const f = () => {
      n.removeListener("open", r), n.removeListener("error", o), n.removeListener("close", l), this.off("close", a), this.off("upgrading", u);
    };
    n.once("open", r), n.once("error", o), n.once("close", l), this.once("close", a), this.once("upgrading", u), this._upgrades.indexOf("webtransport") !== -1 && t !== "webtransport" ? this.setTimeoutFn(() => {
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
let $f = class extends Pf {
  constructor(t, n = {}) {
    const s = typeof t == "object" ? t : n;
    (!s.transports || s.transports && typeof s.transports[0] == "string") && (s.transports = (s.transports || ["polling", "websocket", "webtransport"]).map((r) => Af[r]).filter((r) => !!r)), super(t, s);
  }
};
function Nf(e, t = "", n) {
  let s = e;
  n = n || typeof location < "u" && location, e == null && (e = n.protocol + "//" + n.host), typeof e == "string" && (e.charAt(0) === "/" && (e.charAt(1) === "/" ? e = n.protocol + e : e = n.host + e), /^(https?|wss?):\/\//.test(e) || (typeof n < "u" ? e = n.protocol + "//" + e : e = "https://" + e), s = mr(e)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
  const i = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return s.id = s.protocol + "://" + i + ":" + s.port + t, s.href = s.protocol + "://" + i + (n && n.port === s.port ? "" : ":" + s.port), s;
}
const Bf = typeof ArrayBuffer == "function", Ff = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer, Il = Object.prototype.toString, Mf = typeof Blob == "function" || typeof Blob < "u" && Il.call(Blob) === "[object BlobConstructor]", Df = typeof File == "function" || typeof File < "u" && Il.call(File) === "[object FileConstructor]";
function Jr(e) {
  return Bf && (e instanceof ArrayBuffer || Ff(e)) || Mf && e instanceof Blob || Df && e instanceof File;
}
function as(e, t) {
  if (!e || typeof e != "object")
    return !1;
  if (Array.isArray(e)) {
    for (let n = 0, s = e.length; n < s; n++)
      if (as(e[n]))
        return !0;
    return !1;
  }
  if (Jr(e))
    return !0;
  if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1)
    return as(e.toJSON(), !0);
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && as(e[n]))
      return !0;
  return !1;
}
function qf(e) {
  const t = [], n = e.data, s = e;
  return s.data = yr(n, t), s.attachments = t.length, { packet: s, buffers: t };
}
function yr(e, t) {
  if (!e)
    return e;
  if (Jr(e)) {
    const n = { _placeholder: !0, num: t.length };
    return t.push(e), n;
  } else if (Array.isArray(e)) {
    const n = new Array(e.length);
    for (let s = 0; s < e.length; s++)
      n[s] = yr(e[s], t);
    return n;
  } else if (typeof e == "object" && !(e instanceof Date)) {
    const n = {};
    for (const s in e)
      Object.prototype.hasOwnProperty.call(e, s) && (n[s] = yr(e[s], t));
    return n;
  }
  return e;
}
function Vf(e, t) {
  return e.data = br(e.data, t), delete e.attachments, e;
}
function br(e, t) {
  if (!e)
    return e;
  if (e && e._placeholder === !0) {
    if (typeof e.num == "number" && e.num >= 0 && e.num < t.length)
      return t[e.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(e))
    for (let n = 0; n < e.length; n++)
      e[n] = br(e[n], t);
  else if (typeof e == "object")
    for (const n in e)
      Object.prototype.hasOwnProperty.call(e, n) && (e[n] = br(e[n], t));
  return e;
}
const Hf = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], Uf = 5;
var ce;
(function(e) {
  e[e.CONNECT = 0] = "CONNECT", e[e.DISCONNECT = 1] = "DISCONNECT", e[e.EVENT = 2] = "EVENT", e[e.ACK = 3] = "ACK", e[e.CONNECT_ERROR = 4] = "CONNECT_ERROR", e[e.BINARY_EVENT = 5] = "BINARY_EVENT", e[e.BINARY_ACK = 6] = "BINARY_ACK";
})(ce || (ce = {}));
class jf {
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
    return (t.type === ce.EVENT || t.type === ce.ACK) && as(t) ? this.encodeAsBinary({
      type: t.type === ce.EVENT ? ce.BINARY_EVENT : ce.BINARY_ACK,
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
    return (t.type === ce.BINARY_EVENT || t.type === ce.BINARY_ACK) && (n += t.attachments + "-"), t.nsp && t.nsp !== "/" && (n += t.nsp + ","), t.id != null && (n += t.id), t.data != null && (n += JSON.stringify(t.data, this.replacer)), n;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(t) {
    const n = qf(t), s = this.encodeAsString(n.packet), r = n.buffers;
    return r.unshift(s), r;
  }
}
function no(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
class Qr extends Me {
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
      const s = n.type === ce.BINARY_EVENT;
      s || n.type === ce.BINARY_ACK ? (n.type = s ? ce.EVENT : ce.ACK, this.reconstructor = new Wf(n), n.attachments === 0 && super.emitReserved("decoded", n)) : super.emitReserved("decoded", n);
    } else if (Jr(t) || t.base64)
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
    if (ce[s.type] === void 0)
      throw new Error("unknown packet type " + s.type);
    if (s.type === ce.BINARY_EVENT || s.type === ce.BINARY_ACK) {
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
      if (Qr.isPayloadValid(s.type, i))
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
      case ce.CONNECT:
        return no(n);
      case ce.DISCONNECT:
        return n === void 0;
      case ce.CONNECT_ERROR:
        return typeof n == "string" || no(n);
      case ce.EVENT:
      case ce.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && Hf.indexOf(n[0]) === -1);
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
class Wf {
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
      const n = Vf(this.reconPack, this.buffers);
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
const zf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Qr,
  Encoder: jf,
  get PacketType() {
    return ce;
  },
  protocol: Uf
}, Symbol.toStringTag, { value: "Module" }));
function bt(e, t, n) {
  return e.on(t, n), function() {
    e.off(t, n);
  };
}
const Kf = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class Ol extends Me {
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
      bt(t, "open", this.onopen.bind(this)),
      bt(t, "packet", this.onpacket.bind(this)),
      bt(t, "error", this.onerror.bind(this)),
      bt(t, "close", this.onclose.bind(this))
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
    if (Kf.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (n.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const o = {
      type: ce.EVENT,
      data: n
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
      const f = this.ids++, _ = n.pop();
      this._registerAckCallback(f, _), o.id = f;
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
      type: ce.CONNECT,
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
        case ce.CONNECT:
          t.data && t.data.sid ? this.onconnect(t.data.sid, t.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case ce.EVENT:
        case ce.BINARY_EVENT:
          this.onevent(t);
          break;
        case ce.ACK:
        case ce.BINARY_ACK:
          this.onack(t);
          break;
        case ce.DISCONNECT:
          this.ondisconnect();
          break;
        case ce.CONNECT_ERROR:
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
        type: ce.ACK,
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
function xn(e) {
  e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;
}
xn.prototype.duration = function() {
  var e = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var t = Math.random(), n = Math.floor(t * this.jitter * e);
    e = (Math.floor(t * 10) & 1) == 0 ? e - n : e + n;
  }
  return Math.min(e, this.max) | 0;
};
xn.prototype.reset = function() {
  this.attempts = 0;
};
xn.prototype.setMin = function(e) {
  this.ms = e;
};
xn.prototype.setMax = function(e) {
  this.max = e;
};
xn.prototype.setJitter = function(e) {
  this.jitter = e;
};
class vr extends Me {
  constructor(t, n) {
    var s;
    super(), this.nsps = {}, this.subs = [], t && typeof t == "object" && (n = t, t = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, Ps(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5), this.backoff = new xn({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = t;
    const r = n.parser || zf;
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
    this.engine = new $f(this.uri, this.opts);
    const n = this.engine, s = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const r = bt(n, "open", function() {
      s.onopen(), t && t();
    }), i = (l) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", l), t ? t(l) : this.maybeReconnectOnOpen();
    }, o = bt(n, "error", i);
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
      bt(t, "ping", this.onping.bind(this)),
      bt(t, "data", this.ondata.bind(this)),
      bt(t, "error", this.onerror.bind(this)),
      bt(t, "close", this.onclose.bind(this)),
      // @ts-ignore
      bt(this.decoder, "decoded", this.ondecoded.bind(this))
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
    Ls(() => {
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
    return s ? this._autoConnect && !s.active && s.connect() : (s = new Ol(this, t, n), this.nsps[t] = s), s;
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
const Rn = {};
function cs(e, t) {
  typeof e == "object" && (t = e, e = void 0), t = t || {};
  const n = Nf(e, t.path || "/socket.io"), s = n.source, r = n.id, i = n.path, o = Rn[r] && i in Rn[r].nsps, l = t.forceNew || t["force new connection"] || t.multiplex === !1 || o;
  let a;
  return l ? a = new vr(s, t) : (Rn[r] || (Rn[r] = new vr(s, t)), a = Rn[r]), n.query && !t.query && (t.query = n.queryKey), a.socket(n.path, t);
}
Object.assign(cs, {
  Manager: vr,
  Socket: Ol,
  io: cs,
  connect: cs
});
function Gf() {
  const e = he([]), t = he(!1), n = he(""), s = he(!1), r = he(!1), i = he(!1), o = he("connecting"), l = he(0), a = 5, u = he({}), f = he(null);
  let _ = null, v = null, I = null, B = null;
  const q = (M) => {
    const xe = localStorage.getItem("ctid");
    return _ = cs(`${bs.WS_URL}/widget`, {
      transports: ["websocket"],
      reconnection: !0,
      reconnectionAttempts: a,
      reconnectionDelay: 1e3,
      auth: xe ? {
        conversation_token: xe
      } : void 0
    }), _.on("connect", () => {
      o.value = "connected", l.value = 0;
    }), _.on("disconnect", () => {
      o.value === "connected" && (console.log("Socket disconnected, setting connection status to connecting"), o.value = "connecting");
    }), _.on("connect_error", () => {
      l.value++, console.error("Socket connection failed, attempt:", l.value, "connection status:", o.value), l.value >= a && (o.value = "failed");
    }), _.on("chat_response", (W) => {
      t.value = !1, W.type === "agent_message" ? e.value.push({
        message: W.message,
        message_type: "agent",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: "",
        agent_name: W.agent_name,
        attributes: {
          end_chat: W.end_chat,
          end_chat_reason: W.end_chat_reason,
          end_chat_description: W.end_chat_description,
          request_rating: W.request_rating
        }
      }) : W.shopify_output && typeof W.shopify_output == "object" && W.shopify_output.products ? e.value.push({
        message: W.message,
        // Keep the accompanying text message
        message_type: "product",
        // Use 'product' type for rendering
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: "",
        agent_name: W.agent_name,
        // Assign the whole structured object
        shopify_output: W.shopify_output,
        // Remove the old flattened fields (product_id, product_title, etc.)
        attributes: {
          // Keep other attributes if needed
          end_chat: W.end_chat,
          request_rating: W.request_rating
        }
      }) : e.value.push({
        message: W.message,
        message_type: "bot",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: "",
        agent_name: W.agent_name,
        attributes: {
          end_chat: W.end_chat,
          end_chat_reason: W.end_chat_reason,
          end_chat_description: W.end_chat_description,
          request_rating: W.request_rating
        }
      });
    }), _.on("handle_taken_over", (W) => {
      e.value.push({
        message: `${W.user_name} joined the conversation`,
        message_type: "system",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: W.session_id
      }), u.value = {
        ...u.value,
        human_agent_name: W.user_name,
        human_agent_profile_pic: W.profile_picture
      }, v && v(W);
    }), _.on("error", le), _.on("chat_history", qe), _.on("rating_submitted", fe), _.on("display_form", je), _.on("form_submitted", pt), _.on("workflow_state", Ge), _.on("workflow_proceeded", gt), _;
  }, ke = async () => {
    try {
      return o.value = "connecting", l.value = 0, _ && (_.removeAllListeners(), _.disconnect(), _ = null), _ = q(""), new Promise((M) => {
        _ == null || _.on("connect", () => {
          M(!0);
        }), _ == null || _.on("connect_error", () => {
          l.value >= a && M(!1);
        });
      });
    } catch (M) {
      return console.error("Socket initialization failed:", M), o.value = "failed", !1;
    }
  }, te = () => (_ && _.disconnect(), ke()), de = (M) => {
    v = M;
  }, pe = (M) => {
    I = M;
  }, H = (M) => {
    B = M;
  }, le = (M) => {
    t.value = !1, n.value = mu(M), s.value = !0, setTimeout(() => {
      s.value = !1, n.value = "";
    }, 5e3);
  }, qe = (M) => {
    if (M.type === "chat_history" && Array.isArray(M.messages)) {
      const xe = M.messages.map((W) => {
        var mt;
        const Ee = {
          message: W.message,
          message_type: W.message_type,
          created_at: W.created_at,
          session_id: "",
          agent_name: W.agent_name || "",
          user_name: W.user_name || "",
          attributes: W.attributes || {}
        };
        return (mt = W.attributes) != null && mt.shopify_output && typeof W.attributes.shopify_output == "object" ? {
          ...Ee,
          message_type: "product",
          shopify_output: W.attributes.shopify_output
        } : Ee;
      });
      e.value = [
        ...xe.filter(
          (W) => !e.value.some(
            (Ee) => Ee.message === W.message && Ee.created_at === W.created_at
          )
        ),
        ...e.value
      ];
    }
  }, fe = (M) => {
    M.success && e.value.push({
      message: "Thank you for your feedback!",
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    });
  }, je = (M) => {
    var xe;
    console.log("Form display handler in composable:", M), t.value = !1, f.value = M.form_data, console.log("Set currentForm in handleDisplayForm:", f.value), ((xe = M.form_data) == null ? void 0 : xe.form_full_screen) === !0 ? (console.log("Full screen form detected, triggering workflow state callback"), I && I({
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
  }, pt = (M) => {
    console.log("Form submitted confirmation received, clearing currentForm"), f.value = null, M.success && console.log("Form submitted successfully");
  }, Ge = (M) => {
    console.log("Workflow state received in composable:", M), (M.type === "form" || M.type === "display_form") && (console.log("Setting currentForm from workflow state:", M.form_data), f.value = M.form_data), I && I(M);
  }, gt = (M) => {
    console.log("Workflow proceeded in composable:", M), B && B(M);
  };
  return {
    messages: e,
    loading: t,
    errorMessage: n,
    showError: s,
    loadingHistory: r,
    hasStartedChat: i,
    connectionStatus: o,
    sendMessage: async (M, xe) => {
      !_ || !M.trim() || (u.value.human_agent_name || (t.value = !0), e.value.push({
        message: M,
        message_type: "user",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: ""
      }), _.emit("chat", {
        message: M,
        email: xe
      }), i.value = !0);
    },
    loadChatHistory: async () => {
      if (_)
        try {
          r.value = !0, _.emit("get_chat_history");
        } catch (M) {
          console.error("Failed to load chat history:", M);
        } finally {
          r.value = !1;
        }
    },
    connect: ke,
    reconnect: te,
    cleanup: () => {
      _ && (_.removeAllListeners(), _.disconnect(), _ = null), v = null, I = null, B = null;
    },
    humanAgent: u,
    onTakeover: de,
    submitRating: async (M, xe) => {
      !_ || !M || _.emit("submit_rating", {
        rating: M,
        feedback: xe
      });
    },
    currentForm: f,
    submitForm: async (M) => {
      if (console.log("Submitting form in socket:", M), console.log("Current form in socket:", f.value), console.log("Socket in socket:", _), !_) {
        console.error("No socket available for form submission");
        return;
      }
      if (!M || Object.keys(M).length === 0) {
        console.error("No form data to submit");
        return;
      }
      console.log("Emitting submit_form event with data:", M), _.emit("submit_form", {
        form_data: M
      }), f.value = null;
    },
    getWorkflowState: async () => {
      _ && (console.log("Getting workflow state 12"), _.emit("get_workflow_state"));
    },
    proceedWorkflow: async () => {
      _ && _.emit("proceed_workflow", {});
    },
    onWorkflowState: pe,
    onWorkflowProceeded: H
  };
}
function Zf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Js = { exports: {} }, so;
function Yf() {
  return so || (so = 1, function(e) {
    (function() {
      function t(c, p, k) {
        return c.call.apply(c.bind, arguments);
      }
      function n(c, p, k) {
        if (!c) throw Error();
        if (2 < arguments.length) {
          var y = Array.prototype.slice.call(arguments, 2);
          return function() {
            var A = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(A, y), c.apply(p, A);
          };
        }
        return function() {
          return c.apply(p, arguments);
        };
      }
      function s(c, p, k) {
        return s = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? t : n, s.apply(null, arguments);
      }
      var r = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function i(c, p) {
        this.a = c, this.o = p || c, this.c = this.o.document;
      }
      var o = !!window.FontFace;
      function l(c, p, k, y) {
        if (p = c.c.createElement(p), k) for (var A in k) k.hasOwnProperty(A) && (A == "style" ? p.style.cssText = k[A] : p.setAttribute(A, k[A]));
        return y && p.appendChild(c.c.createTextNode(y)), p;
      }
      function a(c, p, k) {
        c = c.c.getElementsByTagName(p)[0], c || (c = document.documentElement), c.insertBefore(k, c.lastChild);
      }
      function u(c) {
        c.parentNode && c.parentNode.removeChild(c);
      }
      function f(c, p, k) {
        p = p || [], k = k || [];
        for (var y = c.className.split(/\s+/), A = 0; A < p.length; A += 1) {
          for (var V = !1, z = 0; z < y.length; z += 1) if (p[A] === y[z]) {
            V = !0;
            break;
          }
          V || y.push(p[A]);
        }
        for (p = [], A = 0; A < y.length; A += 1) {
          for (V = !1, z = 0; z < k.length; z += 1) if (y[A] === k[z]) {
            V = !0;
            break;
          }
          V || p.push(y[A]);
        }
        c.className = p.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function _(c, p) {
        for (var k = c.className.split(/\s+/), y = 0, A = k.length; y < A; y++) if (k[y] == p) return !0;
        return !1;
      }
      function v(c) {
        return c.o.location.hostname || c.a.location.hostname;
      }
      function I(c, p, k) {
        function y() {
          ne && A && V && (ne(z), ne = null);
        }
        p = l(c, "link", { rel: "stylesheet", href: p, media: "all" });
        var A = !1, V = !0, z = null, ne = k || null;
        o ? (p.onload = function() {
          A = !0, y();
        }, p.onerror = function() {
          A = !0, z = Error("Stylesheet failed to load"), y();
        }) : setTimeout(function() {
          A = !0, y();
        }, 0), a(c, "head", p);
      }
      function B(c, p, k, y) {
        var A = c.c.getElementsByTagName("head")[0];
        if (A) {
          var V = l(c, "script", { src: p }), z = !1;
          return V.onload = V.onreadystatechange = function() {
            z || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (z = !0, k && k(null), V.onload = V.onreadystatechange = null, V.parentNode.tagName == "HEAD" && A.removeChild(V));
          }, A.appendChild(V), setTimeout(function() {
            z || (z = !0, k && k(Error("Script load timeout")));
          }, y || 5e3), V;
        }
        return null;
      }
      function q() {
        this.a = 0, this.c = null;
      }
      function ke(c) {
        return c.a++, function() {
          c.a--, de(c);
        };
      }
      function te(c, p) {
        c.c = p, de(c);
      }
      function de(c) {
        c.a == 0 && c.c && (c.c(), c.c = null);
      }
      function pe(c) {
        this.a = c || "-";
      }
      pe.prototype.c = function(c) {
        for (var p = [], k = 0; k < arguments.length; k++) p.push(arguments[k].replace(/[\W_]+/g, "").toLowerCase());
        return p.join(this.a);
      };
      function H(c, p) {
        this.c = c, this.f = 4, this.a = "n";
        var k = (p || "n4").match(/^([nio])([1-9])$/i);
        k && (this.a = k[1], this.f = parseInt(k[2], 10));
      }
      function le(c) {
        return je(c) + " " + (c.f + "00") + " 300px " + qe(c.c);
      }
      function qe(c) {
        var p = [];
        c = c.split(/,\s*/);
        for (var k = 0; k < c.length; k++) {
          var y = c[k].replace(/['"]/g, "");
          y.indexOf(" ") != -1 || /^\d/.test(y) ? p.push("'" + y + "'") : p.push(y);
        }
        return p.join(",");
      }
      function fe(c) {
        return c.a + c.f;
      }
      function je(c) {
        var p = "normal";
        return c.a === "o" ? p = "oblique" : c.a === "i" && (p = "italic"), p;
      }
      function pt(c) {
        var p = 4, k = "n", y = null;
        return c && ((y = c.match(/(normal|oblique|italic)/i)) && y[1] && (k = y[1].substr(0, 1).toLowerCase()), (y = c.match(/([1-9]00|normal|bold)/i)) && y[1] && (/bold/i.test(y[1]) ? p = 7 : /[1-9]00/.test(y[1]) && (p = parseInt(y[1].substr(0, 1), 10)))), k + p;
      }
      function Ge(c, p) {
        this.c = c, this.f = c.o.document.documentElement, this.h = p, this.a = new pe("-"), this.j = p.events !== !1, this.g = p.classes !== !1;
      }
      function gt(c) {
        c.g && f(c.f, [c.a.c("wf", "loading")]), et(c, "loading");
      }
      function wt(c) {
        if (c.g) {
          var p = _(c.f, c.a.c("wf", "active")), k = [], y = [c.a.c("wf", "loading")];
          p || k.push(c.a.c("wf", "inactive")), f(c.f, k, y);
        }
        et(c, "inactive");
      }
      function et(c, p, k) {
        c.j && c.h[p] && (k ? c.h[p](k.c, fe(k)) : c.h[p]());
      }
      function Ve() {
        this.c = {};
      }
      function Ht(c, p, k) {
        var y = [], A;
        for (A in p) if (p.hasOwnProperty(A)) {
          var V = c.c[A];
          V && y.push(V(p[A], k));
        }
        return y;
      }
      function re(c, p) {
        this.c = c, this.f = p, this.a = l(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function X(c) {
        a(c.c, "body", c.a);
      }
      function ie(c) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + qe(c.c) + ";" + ("font-style:" + je(c) + ";font-weight:" + (c.f + "00") + ";");
      }
      function M(c, p, k, y, A, V) {
        this.g = c, this.j = p, this.a = y, this.c = k, this.f = A || 3e3, this.h = V || void 0;
      }
      M.prototype.start = function() {
        var c = this.c.o.document, p = this, k = r(), y = new Promise(function(z, ne) {
          function Z() {
            r() - k >= p.f ? ne() : c.fonts.load(le(p.a), p.h).then(function(Oe) {
              1 <= Oe.length ? z() : setTimeout(Z, 25);
            }, function() {
              ne();
            });
          }
          Z();
        }), A = null, V = new Promise(function(z, ne) {
          A = setTimeout(ne, p.f);
        });
        Promise.race([V, y]).then(function() {
          A && (clearTimeout(A), A = null), p.g(p.a);
        }, function() {
          p.j(p.a);
        });
      };
      function xe(c, p, k, y, A, V, z) {
        this.v = c, this.B = p, this.c = k, this.a = y, this.s = z || "BESbswy", this.f = {}, this.w = A || 3e3, this.u = V || null, this.m = this.j = this.h = this.g = null, this.g = new re(this.c, this.s), this.h = new re(this.c, this.s), this.j = new re(this.c, this.s), this.m = new re(this.c, this.s), c = new H(this.a.c + ",serif", fe(this.a)), c = ie(c), this.g.a.style.cssText = c, c = new H(this.a.c + ",sans-serif", fe(this.a)), c = ie(c), this.h.a.style.cssText = c, c = new H("serif", fe(this.a)), c = ie(c), this.j.a.style.cssText = c, c = new H("sans-serif", fe(this.a)), c = ie(c), this.m.a.style.cssText = c, X(this.g), X(this.h), X(this.j), X(this.m);
      }
      var W = { D: "serif", C: "sans-serif" }, Ee = null;
      function mt() {
        if (Ee === null) {
          var c = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          Ee = !!c && (536 > parseInt(c[1], 10) || parseInt(c[1], 10) === 536 && 11 >= parseInt(c[2], 10));
        }
        return Ee;
      }
      xe.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = r(), sn(this);
      };
      function _t(c, p, k) {
        for (var y in W) if (W.hasOwnProperty(y) && p === c.f[W[y]] && k === c.f[W[y]]) return !0;
        return !1;
      }
      function sn(c) {
        var p = c.g.a.offsetWidth, k = c.h.a.offsetWidth, y;
        (y = p === c.f.serif && k === c.f["sans-serif"]) || (y = mt() && _t(c, p, k)), y ? r() - c.A >= c.w ? mt() && _t(c, p, k) && (c.u === null || c.u.hasOwnProperty(c.a.c)) ? ct(c, c.v) : ct(c, c.B) : kt(c) : ct(c, c.v);
      }
      function kt(c) {
        setTimeout(s(function() {
          sn(this);
        }, c), 50);
      }
      function ct(c, p) {
        setTimeout(s(function() {
          u(this.g.a), u(this.h.a), u(this.j.a), u(this.m.a), p(this.a);
        }, c), 0);
      }
      function st(c, p, k) {
        this.c = c, this.a = p, this.f = 0, this.m = this.j = !1, this.s = k;
      }
      var rt = null;
      st.prototype.g = function(c) {
        var p = this.a;
        p.g && f(p.f, [p.a.c("wf", c.c, fe(c).toString(), "active")], [p.a.c("wf", c.c, fe(c).toString(), "loading"), p.a.c("wf", c.c, fe(c).toString(), "inactive")]), et(p, "fontactive", c), this.m = !0, it(this);
      }, st.prototype.h = function(c) {
        var p = this.a;
        if (p.g) {
          var k = _(p.f, p.a.c("wf", c.c, fe(c).toString(), "active")), y = [], A = [p.a.c("wf", c.c, fe(c).toString(), "loading")];
          k || y.push(p.a.c("wf", c.c, fe(c).toString(), "inactive")), f(p.f, y, A);
        }
        et(p, "fontinactive", c), it(this);
      };
      function it(c) {
        --c.f == 0 && c.j && (c.m ? (c = c.a, c.g && f(c.f, [c.a.c("wf", "active")], [c.a.c("wf", "loading"), c.a.c("wf", "inactive")]), et(c, "active")) : wt(c.a));
      }
      function Ut(c) {
        this.j = c, this.a = new Ve(), this.h = 0, this.f = this.g = !0;
      }
      Ut.prototype.load = function(c) {
        this.c = new i(this.j, c.context || this.j), this.g = c.events !== !1, this.f = c.classes !== !1, g(this, new Ge(this.c, c), c);
      };
      function d(c, p, k, y, A) {
        var V = --c.h == 0;
        (c.f || c.g) && setTimeout(function() {
          var z = A || null, ne = y || null || {};
          if (k.length === 0 && V) wt(p.a);
          else {
            p.f += k.length, V && (p.j = V);
            var Z, Oe = [];
            for (Z = 0; Z < k.length; Z++) {
              var Se = k[Z], He = ne[Se.c], ot = p.a, jt = Se;
              if (ot.g && f(ot.f, [ot.a.c("wf", jt.c, fe(jt).toString(), "loading")]), et(ot, "fontloading", jt), ot = null, rt === null) if (window.FontFace) {
                var jt = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), $s = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                rt = jt ? 42 < parseInt(jt[1], 10) : !$s;
              } else rt = !1;
              rt ? ot = new M(s(p.g, p), s(p.h, p), p.c, Se, p.s, He) : ot = new xe(s(p.g, p), s(p.h, p), p.c, Se, p.s, z, He), Oe.push(ot);
            }
            for (Z = 0; Z < Oe.length; Z++) Oe[Z].start();
          }
        }, 0);
      }
      function g(c, p, k) {
        var A = [], y = k.timeout;
        gt(p);
        var A = Ht(c.a, k, c.c), V = new st(c.c, p, y);
        for (c.h = A.length, p = 0, k = A.length; p < k; p++) A[p].load(function(z, ne, Z) {
          d(c, V, z, ne, Z);
        });
      }
      function w(c, p) {
        this.c = c, this.a = p;
      }
      w.prototype.load = function(c) {
        function p() {
          if (V["__mti_fntLst" + y]) {
            var z = V["__mti_fntLst" + y](), ne = [], Z;
            if (z) for (var Oe = 0; Oe < z.length; Oe++) {
              var Se = z[Oe].fontfamily;
              z[Oe].fontStyle != null && z[Oe].fontWeight != null ? (Z = z[Oe].fontStyle + z[Oe].fontWeight, ne.push(new H(Se, Z))) : ne.push(new H(Se));
            }
            c(ne);
          } else setTimeout(function() {
            p();
          }, 50);
        }
        var k = this, y = k.a.projectId, A = k.a.version;
        if (y) {
          var V = k.c.o;
          B(this.c, (k.a.api || "https://fast.fonts.net/jsapi") + "/" + y + ".js" + (A ? "?v=" + A : ""), function(z) {
            z ? c([]) : (V["__MonotypeConfiguration__" + y] = function() {
              return k.a;
            }, p());
          }).id = "__MonotypeAPIScript__" + y;
        } else c([]);
      };
      function C(c, p) {
        this.c = c, this.a = p;
      }
      C.prototype.load = function(c) {
        var p, k, y = this.a.urls || [], A = this.a.families || [], V = this.a.testStrings || {}, z = new q();
        for (p = 0, k = y.length; p < k; p++) I(this.c, y[p], ke(z));
        var ne = [];
        for (p = 0, k = A.length; p < k; p++) if (y = A[p].split(":"), y[1]) for (var Z = y[1].split(","), Oe = 0; Oe < Z.length; Oe += 1) ne.push(new H(y[0], Z[Oe]));
        else ne.push(new H(y[0]));
        te(z, function() {
          c(ne, V);
        });
      };
      function T(c, p) {
        c ? this.c = c : this.c = S, this.a = [], this.f = [], this.g = p || "";
      }
      var S = "https://fonts.googleapis.com/css";
      function F(c, p) {
        for (var k = p.length, y = 0; y < k; y++) {
          var A = p[y].split(":");
          A.length == 3 && c.f.push(A.pop());
          var V = "";
          A.length == 2 && A[1] != "" && (V = ":"), c.a.push(A.join(V));
        }
      }
      function O(c) {
        if (c.a.length == 0) throw Error("No fonts to load!");
        if (c.c.indexOf("kit=") != -1) return c.c;
        for (var p = c.a.length, k = [], y = 0; y < p; y++) k.push(c.a[y].replace(/ /g, "+"));
        return p = c.c + "?family=" + k.join("%7C"), 0 < c.f.length && (p += "&subset=" + c.f.join(",")), 0 < c.g.length && (p += "&text=" + encodeURIComponent(c.g)), p;
      }
      function L(c) {
        this.f = c, this.a = [], this.c = {};
      }
      var E = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, U = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, N = { i: "i", italic: "i", n: "n", normal: "n" }, j = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function K(c) {
        for (var p = c.f.length, k = 0; k < p; k++) {
          var y = c.f[k].split(":"), A = y[0].replace(/\+/g, " "), V = ["n4"];
          if (2 <= y.length) {
            var z, ne = y[1];
            if (z = [], ne) for (var ne = ne.split(","), Z = ne.length, Oe = 0; Oe < Z; Oe++) {
              var Se;
              if (Se = ne[Oe], Se.match(/^[\w-]+$/)) {
                var He = j.exec(Se.toLowerCase());
                if (He == null) Se = "";
                else {
                  if (Se = He[2], Se = Se == null || Se == "" ? "n" : N[Se], He = He[1], He == null || He == "") He = "4";
                  else var ot = U[He], He = ot || (isNaN(He) ? "4" : He.substr(0, 1));
                  Se = [Se, He].join("");
                }
              } else Se = "";
              Se && z.push(Se);
            }
            0 < z.length && (V = z), y.length == 3 && (y = y[2], z = [], y = y ? y.split(",") : z, 0 < y.length && (y = E[y[0]]) && (c.c[A] = y));
          }
          for (c.c[A] || (y = E[A]) && (c.c[A] = y), y = 0; y < V.length; y += 1) c.a.push(new H(A, V[y]));
        }
      }
      function ee(c, p) {
        this.c = c, this.a = p;
      }
      var ge = { Arimo: !0, Cousine: !0, Tinos: !0 };
      ee.prototype.load = function(c) {
        var p = new q(), k = this.c, y = new T(this.a.api, this.a.text), A = this.a.families;
        F(y, A);
        var V = new L(A);
        K(V), I(k, O(y), ke(p)), te(p, function() {
          c(V.a, V.c, ge);
        });
      };
      function oe(c, p) {
        this.c = c, this.a = p;
      }
      oe.prototype.load = function(c) {
        var p = this.a.id, k = this.c.o;
        p ? B(this.c, (this.a.api || "https://use.typekit.net") + "/" + p + ".js", function(y) {
          if (y) c([]);
          else if (k.Typekit && k.Typekit.config && k.Typekit.config.fn) {
            y = k.Typekit.config.fn;
            for (var A = [], V = 0; V < y.length; V += 2) for (var z = y[V], ne = y[V + 1], Z = 0; Z < ne.length; Z++) A.push(new H(z, ne[Z]));
            try {
              k.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            c(A);
          }
        }, 2e3) : c([]);
      };
      function Ne(c, p) {
        this.c = c, this.f = p, this.a = [];
      }
      Ne.prototype.load = function(c) {
        var p = this.f.id, k = this.c.o, y = this;
        p ? (k.__webfontfontdeckmodule__ || (k.__webfontfontdeckmodule__ = {}), k.__webfontfontdeckmodule__[p] = function(A, V) {
          for (var z = 0, ne = V.fonts.length; z < ne; ++z) {
            var Z = V.fonts[z];
            y.a.push(new H(Z.name, pt("font-weight:" + Z.weight + ";font-style:" + Z.style)));
          }
          c(y.a);
        }, B(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + v(this.c) + "/" + p + ".js", function(A) {
          A && c([]);
        })) : c([]);
      };
      var Ie = new Ut(window);
      Ie.a.c.custom = function(c, p) {
        return new C(p, c);
      }, Ie.a.c.fontdeck = function(c, p) {
        return new Ne(p, c);
      }, Ie.a.c.monotype = function(c, p) {
        return new w(p, c);
      }, Ie.a.c.typekit = function(c, p) {
        return new oe(p, c);
      }, Ie.a.c.google = function(c, p) {
        return new ee(p, c);
      };
      var Le = { load: s(Ie.load, Ie) };
      e.exports ? e.exports = Le : (window.WebFont = Le, window.WebFontConfig && Ie.load(window.WebFontConfig));
    })();
  }(Js)), Js.exports;
}
var Jf = Yf();
const Qf = /* @__PURE__ */ Zf(Jf);
function Xf() {
  const e = he({}), t = he(""), n = (r) => {
    e.value = r, r.photo_url && (e.value.photo_url = r.photo_url), r.font_family && Qf.load({
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
    customization: e,
    agentName: t,
    applyCustomization: n,
    initializeFromData: () => {
      const r = window.__INITIAL_DATA__;
      r && (n(r.customization || {}), t.value = r.agentName || "");
    }
  };
}
const eh = {
  key: 0,
  class: "initializing-overlay"
}, th = {
  key: 0,
  class: "connecting-message"
}, nh = {
  key: 1,
  class: "failed-message"
}, sh = { class: "welcome-content" }, rh = { class: "welcome-header" }, ih = ["src", "alt"], oh = { class: "welcome-title" }, lh = { class: "welcome-subtitle" }, ah = { class: "welcome-input-container" }, ch = {
  key: 0,
  class: "email-input"
}, uh = ["disabled"], fh = { class: "welcome-message-input" }, hh = ["placeholder", "disabled"], dh = ["disabled"], ph = { class: "landing-page-content" }, gh = { class: "landing-page-header" }, mh = { class: "landing-page-heading" }, _h = { class: "landing-page-text" }, yh = { class: "landing-page-actions" }, bh = { class: "form-fullscreen-content" }, vh = {
  key: 0,
  class: "form-header"
}, wh = {
  key: 0,
  class: "form-title"
}, kh = {
  key: 1,
  class: "form-description"
}, xh = { class: "form-fields" }, Sh = ["for"], Ch = {
  key: 0,
  class: "required-indicator"
}, Th = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "autocomplete", "inputmode"], Eh = ["id", "placeholder", "required", "min", "max", "value", "onInput"], Ah = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput"], Rh = ["id", "required", "value", "onChange"], Ih = { value: "" }, Oh = ["value"], Lh = {
  key: 4,
  class: "checkbox-field"
}, Ph = ["id", "required", "checked", "onChange"], $h = { class: "checkbox-label" }, Nh = {
  key: 5,
  class: "radio-group"
}, Bh = ["name", "value", "required", "checked", "onChange"], Fh = { class: "radio-label" }, Mh = {
  key: 6,
  class: "field-error"
}, Dh = { class: "form-actions" }, qh = ["disabled"], Vh = {
  key: 0,
  class: "loading-spinner-inline"
}, Hh = { key: 1 }, Uh = { class: "header-content" }, jh = ["src", "alt"], Wh = { class: "header-info" }, zh = { class: "status" }, Kh = { class: "ask-anything-header" }, Gh = ["src", "alt"], Zh = { class: "header-info" }, Yh = {
  key: 2,
  class: "loading-history"
}, Jh = {
  key: 0,
  class: "rating-content"
}, Qh = { class: "rating-prompt" }, Xh = ["onMouseover", "onMouseleave", "onClick", "disabled"], ed = {
  key: 0,
  class: "feedback-wrapper"
}, td = { class: "feedback-section" }, nd = ["onUpdate:modelValue", "disabled"], sd = { class: "feedback-counter" }, rd = ["onClick", "disabled"], id = {
  key: 1,
  class: "submitted-feedback-wrapper"
}, od = { class: "submitted-feedback" }, ld = { class: "submitted-feedback-text" }, ad = {
  key: 2,
  class: "submitted-message"
}, cd = {
  key: 1,
  class: "form-content"
}, ud = {
  key: 0,
  class: "form-header"
}, fd = {
  key: 0,
  class: "form-title"
}, hd = {
  key: 1,
  class: "form-description"
}, dd = { class: "form-fields" }, pd = ["for"], gd = {
  key: 0,
  class: "required-indicator"
}, md = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "disabled", "autocomplete", "inputmode"], _d = ["id", "placeholder", "required", "min", "max", "value", "onInput", "disabled"], yd = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "disabled"], bd = ["id", "required", "value", "onChange", "disabled"], vd = { value: "" }, wd = ["value"], kd = {
  key: 4,
  class: "checkbox-field"
}, xd = ["id", "checked", "onChange", "disabled"], Sd = ["for"], Cd = {
  key: 5,
  class: "radio-field"
}, Td = ["id", "name", "value", "checked", "onChange", "disabled"], Ed = ["for"], Ad = {
  key: 6,
  class: "field-error"
}, Rd = { class: "form-actions" }, Id = ["onClick", "disabled"], Od = {
  key: 2,
  class: "user-input-content"
}, Ld = {
  key: 0,
  class: "user-input-prompt"
}, Pd = {
  key: 1,
  class: "user-input-form"
}, $d = ["onUpdate:modelValue", "onKeydown"], Nd = ["onClick", "disabled"], Bd = {
  key: 2,
  class: "user-input-submitted"
}, Fd = {
  key: 0,
  class: "user-input-confirmation"
}, Md = {
  key: 3,
  class: "product-message-container"
}, Dd = ["innerHTML"], qd = {
  key: 1,
  class: "products-carousel"
}, Vd = { class: "carousel-items" }, Hd = {
  key: 0,
  class: "product-image-compact"
}, Ud = ["src", "alt"], jd = { class: "product-info-compact" }, Wd = { class: "product-text-area" }, zd = { class: "product-title-compact" }, Kd = {
  key: 0,
  class: "product-variant-compact"
}, Gd = { class: "product-price-compact" }, Zd = { class: "product-actions-compact" }, Yd = ["onClick"], Jd = {
  key: 2,
  class: "no-products-message"
}, Qd = {
  key: 3,
  class: "no-products-message"
}, Xd = ["innerHTML"], ep = { class: "message-info" }, tp = {
  key: 0,
  class: "agent-name"
}, np = {
  key: 0,
  class: "typing-indicator"
}, sp = {
  key: 0,
  class: "email-input"
}, rp = ["disabled"], ip = { class: "message-input" }, op = ["placeholder", "disabled"], lp = ["disabled"], ap = { class: "conversation-ended-message" }, cp = {
  key: 7,
  class: "rating-dialog"
}, up = { class: "rating-content" }, fp = { class: "star-rating" }, hp = ["onClick"], dp = { class: "rating-actions" }, pp = ["disabled"], Qs = "ctid", gp = /* @__PURE__ */ Fa({
  __name: "WidgetBuilder",
  props: {
    widgetId: {}
  },
  setup(e) {
    var ti;
    ue.setOptions({
      renderer: new ue.Renderer(),
      gfm: !0,
      breaks: !0
    });
    const t = new ue.Renderer(), n = t.link;
    t.link = (m, b, h) => n.call(t, m, b, h).replace(/^<a /, '<a target="_blank" rel="nofollow" '), ue.use({ renderer: t });
    const s = e, r = Fe(() => {
      var m;
      return s.widgetId || ((m = window.__INITIAL_DATA__) == null ? void 0 : m.widgetId);
    }), {
      customization: i,
      agentName: o,
      applyCustomization: l,
      initializeFromData: a
    } = Xf(), {
      messages: u,
      loading: f,
      errorMessage: _,
      showError: v,
      loadingHistory: I,
      hasStartedChat: B,
      connectionStatus: q,
      sendMessage: ke,
      loadChatHistory: te,
      connect: de,
      reconnect: pe,
      cleanup: H,
      humanAgent: le,
      onTakeover: qe,
      submitRating: fe,
      submitForm: je,
      currentForm: pt,
      getWorkflowState: Ge,
      proceedWorkflow: gt,
      onWorkflowState: wt,
      onWorkflowProceeded: et
    } = Gf(), Ve = he(""), Ht = he(!0), re = he(""), X = he(!1), ie = (m) => {
      const b = m.target;
      Ve.value = b.value;
    };
    let M = null;
    const xe = () => {
      M && M.disconnect(), M = new MutationObserver((b) => {
        let h = !1, G = !1;
        b.forEach((me) => {
          if (me.type === "childList") {
            const J = Array.from(me.addedNodes).some(
              (Ze) => {
                var Wt;
                return Ze.nodeType === Node.ELEMENT_NODE && (Ze.matches("input, textarea") || ((Wt = Ze.querySelector) == null ? void 0 : Wt.call(Ze, "input, textarea")));
              }
            ), Ae = Array.from(me.removedNodes).some(
              (Ze) => {
                var Wt;
                return Ze.nodeType === Node.ELEMENT_NODE && (Ze.matches("input, textarea") || ((Wt = Ze.querySelector) == null ? void 0 : Wt.call(Ze, "input, textarea")));
              }
            );
            J && (G = !0, h = !0), Ae && (h = !0);
          }
        }), h && (clearTimeout(xe.timeoutId), xe.timeoutId = setTimeout(() => {
          Ee();
        }, G ? 50 : 100));
      });
      const m = document.querySelector(".widget-container") || document.body;
      M.observe(m, {
        childList: !0,
        subtree: !0
      });
    };
    xe.timeoutId = null;
    let W = [];
    const Ee = () => {
      mt();
      const m = [
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
      let b = [];
      for (const h of m) {
        const G = document.querySelectorAll(h);
        if (G.length > 0) {
          b = Array.from(G);
          break;
        }
      }
      b.length !== 0 && (W = b, b.forEach((h) => {
        h.addEventListener("input", _t, !0), h.addEventListener("keyup", _t, !0), h.addEventListener("change", _t, !0), h.addEventListener("keypress", sn, !0), h.addEventListener("keydown", kt, !0);
      }));
    }, mt = () => {
      W.forEach((m) => {
        m.removeEventListener("input", _t), m.removeEventListener("keyup", _t), m.removeEventListener("change", _t), m.removeEventListener("keypress", sn), m.removeEventListener("keydown", kt);
      }), W = [];
    }, _t = (m) => {
      const b = m.target;
      Ve.value = b.value;
    }, sn = (m) => {
      m.key === "Enter" && !m.shiftKey && (m.preventDefault(), m.stopPropagation(), E());
    }, kt = (m) => {
      m.key === "Enter" && !m.shiftKey && (m.preventDefault(), m.stopPropagation(), E());
    }, ct = he(!0), st = he(((ti = window.__INITIAL_DATA__) == null ? void 0 : ti.initialToken) || localStorage.getItem(Qs));
    Fe(() => !!st.value), a();
    const rt = window.__INITIAL_DATA__;
    rt != null && rt.initialToken && (st.value = rt.initialToken, window.parent.postMessage({
      type: "TOKEN_UPDATE",
      token: rt.initialToken
    }, "*"), X.value = !0);
    const it = he(null), {
      chatStyles: Ut,
      chatIconStyles: d,
      agentBubbleStyles: g,
      userBubbleStyles: w,
      messageNameStyles: C,
      headerBorderStyles: T,
      photoUrl: S,
      shadowStyle: F
    } = Xu(i);
    Fe(() => u.value.some(
      (m) => m.message_type === "form" && (!m.isSubmitted || m.isSubmitted === !1)
    ));
    const O = Fe(() => {
      var m;
      return B.value && X.value || ut.value ? q.value === "connected" && !f.value : Tn(re.value.trim()) && q.value === "connected" && !f.value || ((m = window.__INITIAL_DATA__) == null ? void 0 : m.workflow);
    }), L = Fe(() => q.value === "connected" ? ut.value ? "Ask me anything..." : "Type a message..." : "Connecting..."), E = async () => {
      if (!Ve.value.trim()) return;
      !B.value && re.value && await N(), await ke(Ve.value, re.value), Ve.value = "";
      const m = document.querySelector('input[placeholder*="Type a message"]');
      m && (m.value = ""), setTimeout(() => {
        Ee();
      }, 500);
    }, U = (m) => {
      m.key === "Enter" && !m.shiftKey && (m.preventDefault(), m.stopPropagation(), E());
    }, N = async () => {
      var m, b, h;
      try {
        if (!r.value)
          return console.error("Widget ID is not available"), !1;
        const G = new URL(`${bs.API_URL}/widgets/${r.value}`);
        re.value.trim() && Tn(re.value.trim()) && G.searchParams.append("email", re.value.trim());
        const me = {
          Accept: "application/json",
          "Content-Type": "application/json"
        };
        st.value && (me.Authorization = `Bearer ${st.value}`);
        const J = await fetch(G, {
          headers: me
        });
        if (J.status === 401)
          return X.value = !1, !1;
        const Ae = await J.json();
        return Ae.token && (st.value = Ae.token, localStorage.setItem(Qs, Ae.token), window.parent.postMessage({ type: "TOKEN_UPDATE", token: Ae.token }, "*")), X.value = !0, await de() ? (await j(), (m = Ae.agent) != null && m.customization && l(Ae.agent.customization), Ae.agent && !(Ae != null && Ae.human_agent) && (o.value = Ae.agent.name), Ae != null && Ae.human_agent && (le.value = Ae.human_agent), ((b = Ae.agent) == null ? void 0 : b.workflow) !== void 0 && (window.__INITIAL_DATA__ = window.__INITIAL_DATA__ || {}, window.__INITIAL_DATA__.workflow = Ae.agent.workflow), (h = Ae.agent) != null && h.workflow && (console.log("Getting workflow state after authorization"), await Ge()), !0) : (console.error("Failed to connect to chat service"), !1);
      } catch (G) {
        return console.error("Error checking authorization:", G), X.value = !1, !1;
      } finally {
        ct.value = !1;
      }
    }, j = async () => {
      !B.value && X.value && (B.value = !0, await te());
    }, K = () => {
      it.value && (it.value.scrollTop = it.value.scrollHeight);
    };
    un(() => u.value, (m) => {
      Io(() => {
        K();
      });
    }, { deep: !0 }), un(q, (m, b) => {
      m === "connected" && b !== "connected" && setTimeout(Ee, 100);
    }), un(() => u.value.length, (m, b) => {
      m > 0 && b === 0 && setTimeout(Ee, 100);
    }), un(() => u.value, (m) => {
      if (m.length > 0) {
        const b = m[m.length - 1];
        He(b);
      }
    }, { deep: !0 });
    const ee = async () => {
      await pe() && await N();
    }, ge = he(!1), oe = he(0), Ne = he(""), Ie = he(""), Le = he(0), c = he(!1), p = he({}), k = he(!1), y = he({}), A = he(!1), V = he(null), z = he("Start Chat"), ne = he(!1), Z = he(null);
    Fe(() => {
      var b;
      const m = u.value[u.value.length - 1];
      return ((b = m == null ? void 0 : m.attributes) == null ? void 0 : b.request_rating) || !1;
    });
    const Oe = Fe(() => {
      var b;
      if (!((b = window.__INITIAL_DATA__) != null && b.workflow))
        return !1;
      const m = u.value.find((h) => h.message_type === "rating");
      return (m == null ? void 0 : m.isSubmitted) === !0;
    }), Se = Fe(() => le.value.human_agent_profile_pic ? le.value.human_agent_profile_pic.includes("amazonaws.com") ? le.value.human_agent_profile_pic : `${bs.API_URL}${le.value.human_agent_profile_pic}` : ""), He = (m) => {
      var b, h, G;
      if ((b = m.attributes) != null && b.end_chat && ((h = m.attributes) != null && h.request_rating)) {
        const me = m.agent_name || ((G = le.value) == null ? void 0 : G.human_agent_name) || o.value || "our agent";
        u.value.push({
          message: `Rate the chat session that you had with ${me}`,
          message_type: "rating",
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: m.session_id,
          agent_name: me,
          showFeedback: !1
        }), Ie.value = m.session_id;
      }
    }, ot = (m) => {
      c.value || (Le.value = m);
    }, jt = () => {
      if (!c.value) {
        const m = u.value[u.value.length - 1];
        Le.value = (m == null ? void 0 : m.selectedRating) || 0;
      }
    }, $s = async (m) => {
      if (!c.value) {
        Le.value = m;
        const b = u.value[u.value.length - 1];
        b && b.message_type === "rating" && (b.showFeedback = !0, b.selectedRating = m);
      }
    }, Ll = async (m, b, h = null) => {
      try {
        c.value = !0, await fe(b, h);
        const G = u.value.find((me) => me.message_type === "rating");
        G && (G.isSubmitted = !0, G.finalRating = b, G.finalFeedback = h);
      } catch (G) {
        console.error("Failed to submit rating:", G);
      } finally {
        c.value = !1;
      }
    }, Pl = (m) => {
      const b = {};
      for (const h of m.fields) {
        const G = p.value[h.name], me = Ns(h, G);
        me && (b[h.name] = me);
      }
      return y.value = b, Object.keys(b).length === 0;
    }, $l = async (m) => {
      if (!(k.value || !Pl(m)))
        try {
          k.value = !0, await je(p.value);
          const h = u.value.findIndex(
            (G) => G.message_type === "form" && (!G.isSubmitted || G.isSubmitted === !1)
          );
          h !== -1 && u.value.splice(h, 1), p.value = {}, y.value = {};
        } catch (h) {
          console.error("Failed to submit form:", h);
        } finally {
          k.value = !1;
        }
    }, tt = (m, b) => {
      var h, G;
      if (p.value[m] = b, b && b.toString().trim() !== "") {
        let me = null;
        if ((h = Z.value) != null && h.fields && (me = Z.value.fields.find((J) => J.name === m)), !me && ((G = pt.value) != null && G.fields) && (me = pt.value.fields.find((J) => J.name === m)), me) {
          const J = Ns(me, b);
          J ? (y.value[m] = J, console.log(`Validation error for ${m}:`, J)) : delete y.value[m];
        }
      } else
        delete y.value[m], console.log(`Cleared error for ${m}`);
    }, Nl = (m) => {
      const b = m.replace(/\D/g, "");
      return b.length >= 7 && b.length <= 15;
    }, Ns = (m, b) => {
      if (m.required && (!b || b.toString().trim() === ""))
        return `${m.label} is required`;
      if (!b || b.toString().trim() === "")
        return null;
      if (m.type === "email" && !Tn(b))
        return "Please enter a valid email address";
      if (m.type === "tel" && !Nl(b))
        return "Please enter a valid phone number";
      if ((m.type === "text" || m.type === "textarea") && m.minLength && b.length < m.minLength)
        return `${m.label} must be at least ${m.minLength} characters`;
      if ((m.type === "text" || m.type === "textarea") && m.maxLength && b.length > m.maxLength)
        return `${m.label} must not exceed ${m.maxLength} characters`;
      if (m.type === "number") {
        const h = parseFloat(b);
        if (isNaN(h))
          return `${m.label} must be a valid number`;
        if (m.minLength && h < m.minLength)
          return `${m.label} must be at least ${m.minLength}`;
        if (m.maxLength && h > m.maxLength)
          return `${m.label} must not exceed ${m.maxLength}`;
      }
      return null;
    }, Bl = async () => {
      if (!(k.value || !Z.value))
        try {
          k.value = !0, y.value = {};
          let m = !1;
          for (const b of Z.value.fields || []) {
            const h = p.value[b.name], G = Ns(b, h);
            G && (y.value[b.name] = G, m = !0, console.log(`Validation error for field ${b.name}:`, G));
          }
          if (m) {
            k.value = !1, console.log("Validation failed, not submitting");
            return;
          }
          await je(p.value), ne.value = !1, Z.value = null, p.value = {};
        } catch (m) {
          console.error("Failed to submit full screen form:", m);
        } finally {
          k.value = !1, console.log("Full screen form submission completed");
        }
    }, Fl = (m, b) => {
      if (console.log("handleViewDetails called with:", { product: m, shopDomain: b }), !m) {
        console.error("No product provided to handleViewDetails");
        return;
      }
      let h = null;
      if (m.handle && b)
        h = `https://${b}/products/${m.handle}`;
      else if (m.id && b)
        h = `https://${b}/products/${m.id}`;
      else if (b) {
        if (!m.handle && !m.id) {
          console.error("Product handle and ID are both missing! Product:", m), alert("Unable to open product: Product information incomplete.");
          return;
        }
      } else {
        console.error("Shop domain is missing! Product:", m), alert("Unable to open product: Shop domain not available. Please contact support.");
        return;
      }
      h && (console.log("Opening product URL:", h), window.open(h, "_blank"));
    }, Ml = async () => {
      try {
        A.value = !1, V.value = null, await gt();
      } catch (m) {
        console.error("Failed to proceed workflow:", m);
      }
    }, Bs = async (m) => {
      try {
        if (!m.userInputValue || !m.userInputValue.trim())
          return;
        const b = m.userInputValue.trim();
        m.isSubmitted = !0, m.submittedValue = b, await ke(b, re.value);
      } catch (b) {
        console.error("Failed to submit user input:", b), m.isSubmitted = !1, m.submittedValue = null;
      }
    }, Xr = async () => {
      var m, b, h;
      try {
        let G = 0;
        const me = 50;
        for (; !((m = window.__INITIAL_DATA__) != null && m.widgetId) && G < me; )
          await new Promise((Ae) => setTimeout(Ae, 100)), G++;
        return (b = window.__INITIAL_DATA__) != null && b.widgetId ? await N() ? ((h = window.__INITIAL_DATA__) != null && h.workflow && X.value && await Ge(), !0) : (q.value = "connected", !1) : (console.error("Widget data not available after waiting"), !1);
      } catch (G) {
        return console.error("Failed to initialize widget:", G), !1;
      }
    }, Dl = () => {
      qe(async () => {
        await N();
      }), window.addEventListener("message", (m) => {
        m.data.type === "SCROLL_TO_BOTTOM" && K(), m.data.type === "TOKEN_RECEIVED" && localStorage.setItem(Qs, m.data.token);
      }), wt((m) => {
        var b;
        if (z.value = m.button_text || "Start Chat", m.type === "landing_page")
          V.value = m.landing_page_data, A.value = !0, ne.value = !1;
        else if (m.type === "form" || m.type === "display_form")
          if (((b = m.form_data) == null ? void 0 : b.form_full_screen) === !0)
            Z.value = m.form_data, ne.value = !0, A.value = !1;
          else {
            const h = {
              message: "",
              message_type: "form",
              attributes: {
                form_data: m.form_data
              },
              created_at: (/* @__PURE__ */ new Date()).toISOString(),
              isSubmitted: !1
            };
            u.value.findIndex(
              (me) => me.message_type === "form" && !me.isSubmitted
            ) === -1 && u.value.push(h), A.value = !1, ne.value = !1;
          }
        else
          A.value = !1, ne.value = !1;
      }), et((m) => {
        console.log("Workflow proceeded:", m);
      });
    }, ql = async () => {
      try {
        await Xr(), await Ge();
      } catch (m) {
        throw console.error("Failed to start new conversation:", m), m;
      }
    }, Vl = async () => {
      Oe.value = !1, u.value = [], await ql();
    };
    Mo(async () => {
      await Xr(), Dl(), xe(), (() => {
        const b = u.value.length > 0, h = q.value === "connected", G = document.querySelector('input[type="text"], textarea') !== null;
        return b || h || G;
      })() && setTimeout(Ee, 100);
    }), Nr(() => {
      window.removeEventListener("message", (m) => {
        m.data.type === "SCROLL_TO_BOTTOM" && K();
      }), M && (M.disconnect(), M = null), xe.timeoutId && (clearTimeout(xe.timeoutId), xe.timeoutId = null), mt(), H();
    });
    const ut = Fe(() => i.value.chat_style === "ASK_ANYTHING"), Hl = Fe(() => {
      const m = {
        width: "100%",
        height: "580px",
        borderRadius: "var(--radius-lg)"
      };
      return window.innerWidth <= 768 && (m.width = "100vw", m.height = "100vh", m.borderRadius = "0", m.position = "fixed", m.top = "0", m.left = "0", m.bottom = "0", m.right = "0", m.maxWidth = "100vw", m.maxHeight = "100vh"), ut.value ? window.innerWidth <= 768 ? {
        ...m,
        width: "100vw",
        height: "100vh",
        maxWidth: "100vw",
        maxHeight: "100vh",
        minWidth: "unset",
        borderRadius: "0"
      } : window.innerWidth <= 1024 ? {
        ...m,
        width: "95%",
        maxWidth: "700px",
        minWidth: "500px",
        height: "650px"
      } : {
        ...m,
        width: "100%",
        maxWidth: "400px",
        minWidth: "400px",
        height: "580px"
      } : m;
    }), ei = Fe(() => ut.value && u.value.length === 0);
    return (m, b) => (P(), $("div", {
      class: Pe(["chat-container", { collapsed: !Ht.value, "ask-anything-style": ut.value }]),
      style: we({ ...D(F), ...Hl.value })
    }, [
      ct.value ? (P(), $("div", eh, b[8] || (b[8] = [
        Rc('<div class="loading-spinner" data-v-5b7debf6><div class="dot" data-v-5b7debf6></div><div class="dot" data-v-5b7debf6></div><div class="dot" data-v-5b7debf6></div></div><div class="loading-text" data-v-5b7debf6>Initializing chat...</div>', 2)
      ]))) : ae("", !0),
      !ct.value && D(q) !== "connected" ? (P(), $("div", {
        key: 1,
        class: Pe(["connection-status", D(q)])
      }, [
        D(q) === "connecting" ? (P(), $("div", th, b[9] || (b[9] = [
          yt(" Connecting to chat service... ", -1),
          x("div", { class: "loading-dots" }, [
            x("div", { class: "dot" }),
            x("div", { class: "dot" }),
            x("div", { class: "dot" })
          ], -1)
        ]))) : D(q) === "failed" ? (P(), $("div", nh, [
          b[10] || (b[10] = yt(" Connection failed. ", -1)),
          x("button", {
            onClick: ee,
            class: "reconnect-button"
          }, " Click here to reconnect ")
        ])) : ae("", !0)
      ], 2)) : ae("", !0),
      D(v) ? (P(), $("div", {
        key: 2,
        class: "error-alert",
        style: we(D(d))
      }, se(D(_)), 5)) : ae("", !0),
      ei.value ? (P(), $("div", {
        key: 3,
        class: "welcome-message-section",
        style: we(D(Ut))
      }, [
        x("div", sh, [
          x("div", rh, [
            D(S) ? (P(), $("img", {
              key: 0,
              src: D(S),
              alt: D(o),
              class: "welcome-avatar"
            }, null, 8, ih)) : ae("", !0),
            x("h1", oh, se(D(i).welcome_title || `Welcome to ${D(o)}`), 1),
            x("p", lh, se(D(i).welcome_subtitle || "I'm here to help you with anything you need. What can I assist you with today?"), 1)
          ])
        ]),
        x("div", ah, [
          !D(B) && !X.value && !ut.value ? (P(), $("div", ch, [
            rn(x("input", {
              "onUpdate:modelValue": b[0] || (b[0] = (h) => re.value = h),
              type: "email",
              placeholder: "Enter your email address",
              disabled: D(f) || D(q) !== "connected",
              class: Pe([{
                invalid: re.value.trim() && !D(Tn)(re.value.trim()),
                disabled: D(q) !== "connected"
              }, "welcome-email-input"])
            }, null, 10, uh), [
              [an, re.value]
            ])
          ])) : ae("", !0),
          x("div", fh, [
            rn(x("input", {
              "onUpdate:modelValue": b[1] || (b[1] = (h) => Ve.value = h),
              type: "text",
              placeholder: L.value,
              onKeypress: U,
              onInput: ie,
              onChange: ie,
              disabled: !O.value,
              class: Pe([{ disabled: !O.value }, "welcome-message-field"])
            }, null, 42, hh), [
              [an, Ve.value]
            ]),
            x("button", {
              class: "welcome-send-button",
              style: we(D(w)),
              onClick: E,
              disabled: !Ve.value.trim() || !O.value
            }, b[11] || (b[11] = [
              x("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                x("path", {
                  d: "M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1)
            ]), 12, dh)
          ])
        ]),
        x("div", {
          class: "powered-by-welcome",
          style: we(D(C))
        }, b[12] || (b[12] = [
          x("svg", {
            class: "chattermate-logo",
            width: "16",
            height: "16",
            viewBox: "0 0 60 60",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            x("path", {
              d: "M45 15H15C13.3431 15 12 16.3431 12 18V42C12 43.6569 13.3431 45 15 45H25L30 52L35 45H45C46.6569 45 48 43.6569 48 42V18C48 16.3431 46.6569 15 45 15Z",
              fill: "currentColor",
              opacity: "0.8"
            }),
            x("path", {
              d: "M36 27C36 27 32.5 26 30 26C27.5 26 24 27 24 31C24 35 27.5 36 30 36C32.5 36 36 35 36 35V33C36 33 33 34 31.5 34C30 34 27 33 27 31C27 29 30 28 31.5 28C33 28 36 29 36 29V27Z",
              fill: "currentColor"
            })
          ], -1),
          yt(" Powered by ChatterMate ", -1)
        ]), 4)
      ], 4)) : ae("", !0),
      A.value && V.value ? (P(), $("div", {
        key: 4,
        class: "landing-page-fullscreen",
        style: we(D(Ut))
      }, [
        x("div", ph, [
          x("div", gh, [
            x("h2", mh, se(V.value.heading), 1),
            x("div", _h, se(V.value.content), 1)
          ]),
          x("div", yh, [
            x("button", {
              class: "landing-page-button",
              onClick: Ml
            }, se(z.value), 1)
          ])
        ]),
        x("div", {
          class: "powered-by-landing",
          style: we(D(C))
        }, b[13] || (b[13] = [
          x("svg", {
            class: "chattermate-logo",
            width: "16",
            height: "16",
            viewBox: "0 0 60 60",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            x("path", {
              d: "M45 15H15C13.3431 15 12 16.3431 12 18V42C12 43.6569 13.3431 45 15 45H25L30 52L35 45H45C46.6569 45 48 43.6569 48 42V18C48 16.3431 46.6569 15 45 15Z",
              fill: "currentColor",
              opacity: "0.8"
            }),
            x("path", {
              d: "M36 27C36 27 32.5 26 30 26C27.5 26 24 27 24 31C24 35 27.5 36 30 36C32.5 36 36 35 36 35V33C36 33 33 34 31.5 34C30 34 27 33 27 31C27 29 30 28 31.5 28C33 28 36 29 36 29V27Z",
              fill: "currentColor"
            })
          ], -1),
          yt(" Powered by ChatterMate ", -1)
        ]), 4)
      ], 4)) : ne.value && Z.value ? (P(), $("div", {
        key: 5,
        class: "form-fullscreen",
        style: we(D(Ut))
      }, [
        x("div", bh, [
          Z.value.title || Z.value.description ? (P(), $("div", vh, [
            Z.value.title ? (P(), $("h2", wh, se(Z.value.title), 1)) : ae("", !0),
            Z.value.description ? (P(), $("p", kh, se(Z.value.description), 1)) : ae("", !0)
          ])) : ae("", !0),
          x("div", xh, [
            (P(!0), $(Be, null, xt(Z.value.fields, (h) => {
              var G, me;
              return P(), $("div", {
                key: h.name,
                class: "form-field"
              }, [
                x("label", {
                  for: `fullscreen-form-${h.name}`,
                  class: "field-label"
                }, [
                  yt(se(h.label) + " ", 1),
                  h.required ? (P(), $("span", Ch, "*")) : ae("", !0)
                ], 8, Sh),
                h.type === "text" || h.type === "email" || h.type === "tel" ? (P(), $("input", {
                  key: 0,
                  id: `fullscreen-form-${h.name}`,
                  type: h.type,
                  placeholder: h.placeholder || "",
                  required: h.required,
                  minlength: h.minLength,
                  maxlength: h.maxLength,
                  value: p.value[h.name] || "",
                  onInput: (J) => tt(h.name, J.target.value),
                  onBlur: (J) => tt(h.name, J.target.value),
                  class: Pe(["form-input", { error: y.value[h.name] }]),
                  autocomplete: h.type === "email" ? "email" : h.type === "tel" ? "tel" : "off",
                  inputmode: h.type === "tel" ? "tel" : h.type === "email" ? "email" : "text"
                }, null, 42, Th)) : h.type === "number" ? (P(), $("input", {
                  key: 1,
                  id: `fullscreen-form-${h.name}`,
                  type: "number",
                  placeholder: h.placeholder || "",
                  required: h.required,
                  min: h.minLength,
                  max: h.maxLength,
                  value: p.value[h.name] || "",
                  onInput: (J) => tt(h.name, J.target.value),
                  class: Pe(["form-input", { error: y.value[h.name] }])
                }, null, 42, Eh)) : h.type === "textarea" ? (P(), $("textarea", {
                  key: 2,
                  id: `fullscreen-form-${h.name}`,
                  placeholder: h.placeholder || "",
                  required: h.required,
                  minlength: h.minLength,
                  maxlength: h.maxLength,
                  value: p.value[h.name] || "",
                  onInput: (J) => tt(h.name, J.target.value),
                  class: Pe(["form-textarea", { error: y.value[h.name] }]),
                  rows: "4"
                }, null, 42, Ah)) : h.type === "select" ? (P(), $("select", {
                  key: 3,
                  id: `fullscreen-form-${h.name}`,
                  required: h.required,
                  value: p.value[h.name] || "",
                  onChange: (J) => tt(h.name, J.target.value),
                  class: Pe(["form-select", { error: y.value[h.name] }])
                }, [
                  x("option", Ih, se(h.placeholder || "Please select..."), 1),
                  (P(!0), $(Be, null, xt((Array.isArray(h.options) ? h.options : ((G = h.options) == null ? void 0 : G.split(`
`)) || []).filter((J) => J.trim()), (J) => (P(), $("option", {
                    key: J,
                    value: J.trim()
                  }, se(J.trim()), 9, Oh))), 128))
                ], 42, Rh)) : h.type === "checkbox" ? (P(), $("label", Lh, [
                  x("input", {
                    id: `fullscreen-form-${h.name}`,
                    type: "checkbox",
                    required: h.required,
                    checked: p.value[h.name] || !1,
                    onChange: (J) => tt(h.name, J.target.checked),
                    class: "form-checkbox"
                  }, null, 40, Ph),
                  x("span", $h, se(h.label), 1)
                ])) : h.type === "radio" ? (P(), $("div", Nh, [
                  (P(!0), $(Be, null, xt((Array.isArray(h.options) ? h.options : ((me = h.options) == null ? void 0 : me.split(`
`)) || []).filter((J) => J.trim()), (J) => (P(), $("label", {
                    key: J,
                    class: "radio-field"
                  }, [
                    x("input", {
                      type: "radio",
                      name: `fullscreen-form-${h.name}`,
                      value: J.trim(),
                      required: h.required,
                      checked: p.value[h.name] === J.trim(),
                      onChange: (Ae) => tt(h.name, J.trim()),
                      class: "form-radio"
                    }, null, 40, Bh),
                    x("span", Fh, se(J.trim()), 1)
                  ]))), 128))
                ])) : ae("", !0),
                y.value[h.name] ? (P(), $("div", Mh, se(y.value[h.name]), 1)) : ae("", !0)
              ]);
            }), 128))
          ]),
          x("div", Dh, [
            x("button", {
              onClick: b[2] || (b[2] = () => {
                console.log("Submit button clicked!"), Bl();
              }),
              disabled: k.value,
              class: "submit-form-button",
              style: we(D(w))
            }, [
              k.value ? (P(), $("span", Vh, b[14] || (b[14] = [
                x("div", { class: "dot" }, null, -1),
                x("div", { class: "dot" }, null, -1),
                x("div", { class: "dot" }, null, -1)
              ]))) : (P(), $("span", Hh, se(Z.value.submit_button_text || "Submit"), 1))
            ], 12, qh)
          ])
        ]),
        x("div", {
          class: "powered-by-landing",
          style: we(D(C))
        }, b[15] || (b[15] = [
          x("svg", {
            class: "chattermate-logo",
            width: "16",
            height: "16",
            viewBox: "0 0 60 60",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            x("path", {
              d: "M45 15H15C13.3431 15 12 16.3431 12 18V42C12 43.6569 13.3431 45 15 45H25L30 52L35 45H45C46.6569 45 48 43.6569 48 42V18C48 16.3431 46.6569 15 45 15Z",
              fill: "currentColor",
              opacity: "0.8"
            }),
            x("path", {
              d: "M36 27C36 27 32.5 26 30 26C27.5 26 24 27 24 31C24 35 27.5 36 30 36C32.5 36 36 35 36 35V33C36 33 33 34 31.5 34C30 34 27 33 27 31C27 29 30 28 31.5 28C33 28 36 29 36 29V27Z",
              fill: "currentColor"
            })
          ], -1),
          yt(" Powered by ChatterMate ", -1)
        ]), 4)
      ], 4)) : ei.value ? ae("", !0) : (P(), $(Be, { key: 6 }, [
        Ht.value ? (P(), $("div", {
          key: 0,
          class: Pe(["chat-panel", { "ask-anything-chat": ut.value }]),
          style: we(D(Ut))
        }, [
          ut.value ? (P(), $("div", {
            key: 1,
            class: "ask-anything-top",
            style: we(D(T))
          }, [
            x("div", Kh, [
              Se.value || D(S) ? (P(), $("img", {
                key: 0,
                src: Se.value || D(S),
                alt: D(le).human_agent_name || D(o),
                class: "header-avatar"
              }, null, 8, Gh)) : ae("", !0),
              x("div", Zh, [
                x("h3", {
                  style: we(D(C))
                }, se(D(o)), 5),
                x("p", {
                  class: "ask-anything-subtitle",
                  style: we(D(C))
                }, se(D(i).welcome_subtitle || "Ask me anything. I'm here to help."), 5)
              ])
            ])
          ], 4)) : (P(), $("div", {
            key: 0,
            class: "chat-header",
            style: we(D(T))
          }, [
            x("div", Uh, [
              Se.value || D(S) ? (P(), $("img", {
                key: 0,
                src: Se.value || D(S),
                alt: D(le).human_agent_name || D(o),
                class: "header-avatar"
              }, null, 8, jh)) : ae("", !0),
              x("div", Wh, [
                x("h3", {
                  style: we(D(C))
                }, se(D(le).human_agent_name || D(o)), 5),
                x("div", zh, [
                  b[16] || (b[16] = x("span", { class: "status-indicator online" }, null, -1)),
                  x("span", {
                    class: "status-text",
                    style: we(D(C))
                  }, "Online", 4)
                ])
              ])
            ])
          ], 4)),
          D(I) ? (P(), $("div", Yh, b[17] || (b[17] = [
            x("div", { class: "loading-spinner" }, [
              x("div", { class: "dot" }),
              x("div", { class: "dot" }),
              x("div", { class: "dot" })
            ], -1)
          ]))) : ae("", !0),
          x("div", {
            class: "chat-messages",
            ref_key: "messagesContainer",
            ref: it
          }, [
            (P(!0), $(Be, null, xt(D(u), (h, G) => {
              var me, J, Ae, Ze, Wt, ni, si, ri, ii, oi, li, ai, ci, ui, fi, hi, di, pi;
              return P(), $("div", {
                key: G,
                class: Pe([
                  "message",
                  h.message_type === "bot" || h.message_type === "agent" ? "agent-message" : h.message_type === "system" ? "system-message" : h.message_type === "rating" ? "rating-message" : h.message_type === "form" ? "form-message" : h.message_type === "product" || h.shopify_output ? "product-message" : "user-message"
                ])
              }, [
                x("div", {
                  class: "message-bubble",
                  style: we(h.message_type === "system" || h.message_type === "rating" || h.message_type === "product" || h.shopify_output ? {} : h.message_type === "user" ? D(w) : D(g))
                }, [
                  h.message_type === "rating" ? (P(), $("div", Jh, [
                    x("p", Qh, "Rate the chat session that you had with " + se(h.agent_name || D(le).human_agent_name || D(o) || "our agent"), 1),
                    x("div", {
                      class: Pe(["star-rating", { submitted: c.value || h.isSubmitted }])
                    }, [
                      (P(), $(Be, null, xt(5, (R) => x("button", {
                        key: R,
                        class: Pe(["star-button", {
                          warning: R <= (h.isSubmitted ? h.finalRating : Le.value || h.selectedRating) && (h.isSubmitted ? h.finalRating : Le.value || h.selectedRating) <= 3,
                          success: R <= (h.isSubmitted ? h.finalRating : Le.value || h.selectedRating) && (h.isSubmitted ? h.finalRating : Le.value || h.selectedRating) > 3,
                          selected: R <= (h.isSubmitted ? h.finalRating : Le.value || h.selectedRating)
                        }]),
                        onMouseover: (zt) => !h.isSubmitted && ot(R),
                        onMouseleave: (zt) => !h.isSubmitted && jt,
                        onClick: (zt) => !h.isSubmitted && $s(R),
                        disabled: c.value || h.isSubmitted
                      }, " ★ ", 42, Xh)), 64))
                    ], 2),
                    h.showFeedback && !h.isSubmitted ? (P(), $("div", ed, [
                      x("div", td, [
                        rn(x("input", {
                          "onUpdate:modelValue": (R) => h.feedback = R,
                          placeholder: "Please share your feedback (optional)",
                          disabled: c.value,
                          maxlength: "500",
                          class: "feedback-input"
                        }, null, 8, nd), [
                          [an, h.feedback]
                        ]),
                        x("div", sd, se(((me = h.feedback) == null ? void 0 : me.length) || 0) + "/500", 1)
                      ]),
                      x("button", {
                        onClick: (R) => Ll(h.session_id, Le.value, h.feedback),
                        disabled: c.value || !Le.value,
                        class: "submit-rating-button",
                        style: we({ backgroundColor: D(i).accent_color || "var(--primary-color)" })
                      }, se(c.value ? "Submitting..." : "Submit Rating"), 13, rd)
                    ])) : ae("", !0),
                    h.isSubmitted && h.finalFeedback ? (P(), $("div", id, [
                      x("div", od, [
                        x("p", ld, se(h.finalFeedback), 1)
                      ])
                    ])) : h.isSubmitted ? (P(), $("div", ad, " Thank you for your rating! ")) : ae("", !0)
                  ])) : h.message_type === "form" ? (P(), $("div", cd, [
                    (Ae = (J = h.attributes) == null ? void 0 : J.form_data) != null && Ae.title || (Wt = (Ze = h.attributes) == null ? void 0 : Ze.form_data) != null && Wt.description ? (P(), $("div", ud, [
                      (si = (ni = h.attributes) == null ? void 0 : ni.form_data) != null && si.title ? (P(), $("h3", fd, se(h.attributes.form_data.title), 1)) : ae("", !0),
                      (ii = (ri = h.attributes) == null ? void 0 : ri.form_data) != null && ii.description ? (P(), $("p", hd, se(h.attributes.form_data.description), 1)) : ae("", !0)
                    ])) : ae("", !0),
                    x("div", dd, [
                      (P(!0), $(Be, null, xt((li = (oi = h.attributes) == null ? void 0 : oi.form_data) == null ? void 0 : li.fields, (R) => {
                        var zt, Fs;
                        return P(), $("div", {
                          key: R.name,
                          class: "form-field"
                        }, [
                          x("label", {
                            for: `form-${R.name}`,
                            class: "field-label"
                          }, [
                            yt(se(R.label) + " ", 1),
                            R.required ? (P(), $("span", gd, "*")) : ae("", !0)
                          ], 8, pd),
                          R.type === "text" || R.type === "email" || R.type === "tel" ? (P(), $("input", {
                            key: 0,
                            id: `form-${R.name}`,
                            type: R.type,
                            placeholder: R.placeholder || "",
                            required: R.required,
                            minlength: R.minLength,
                            maxlength: R.maxLength,
                            value: p.value[R.name] || "",
                            onInput: (_e) => tt(R.name, _e.target.value),
                            onBlur: (_e) => tt(R.name, _e.target.value),
                            class: Pe(["form-input", { error: y.value[R.name] }]),
                            disabled: k.value,
                            autocomplete: R.type === "email" ? "email" : R.type === "tel" ? "tel" : "off",
                            inputmode: R.type === "tel" ? "tel" : R.type === "email" ? "email" : "text"
                          }, null, 42, md)) : R.type === "number" ? (P(), $("input", {
                            key: 1,
                            id: `form-${R.name}`,
                            type: "number",
                            placeholder: R.placeholder || "",
                            required: R.required,
                            min: R.min,
                            max: R.max,
                            value: p.value[R.name] || "",
                            onInput: (_e) => tt(R.name, _e.target.value),
                            class: Pe(["form-input", { error: y.value[R.name] }]),
                            disabled: k.value
                          }, null, 42, _d)) : R.type === "textarea" ? (P(), $("textarea", {
                            key: 2,
                            id: `form-${R.name}`,
                            placeholder: R.placeholder || "",
                            required: R.required,
                            minlength: R.minLength,
                            maxlength: R.maxLength,
                            value: p.value[R.name] || "",
                            onInput: (_e) => tt(R.name, _e.target.value),
                            class: Pe(["form-textarea", { error: y.value[R.name] }]),
                            disabled: k.value,
                            rows: "3"
                          }, null, 42, yd)) : R.type === "select" ? (P(), $("select", {
                            key: 3,
                            id: `form-${R.name}`,
                            required: R.required,
                            value: p.value[R.name] || "",
                            onChange: (_e) => tt(R.name, _e.target.value),
                            class: Pe(["form-select", { error: y.value[R.name] }]),
                            disabled: k.value
                          }, [
                            x("option", vd, se(R.placeholder || "Select an option"), 1),
                            (P(!0), $(Be, null, xt((Array.isArray(R.options) ? R.options : ((zt = R.options) == null ? void 0 : zt.split(`
`)) || []).filter((_e) => _e.trim()), (_e) => (P(), $("option", {
                              key: _e.trim(),
                              value: _e.trim()
                            }, se(_e.trim()), 9, wd))), 128))
                          ], 42, bd)) : R.type === "checkbox" ? (P(), $("div", kd, [
                            x("input", {
                              id: `form-${R.name}`,
                              type: "checkbox",
                              checked: p.value[R.name] || !1,
                              onChange: (_e) => tt(R.name, _e.target.checked),
                              class: "form-checkbox",
                              disabled: k.value
                            }, null, 40, xd),
                            x("label", {
                              for: `form-${R.name}`,
                              class: "checkbox-label"
                            }, se(R.placeholder || R.label), 9, Sd)
                          ])) : R.type === "radio" ? (P(), $("div", Cd, [
                            (P(!0), $(Be, null, xt((Array.isArray(R.options) ? R.options : ((Fs = R.options) == null ? void 0 : Fs.split(`
`)) || []).filter((_e) => _e.trim()), (_e) => (P(), $("div", {
                              key: _e.trim(),
                              class: "radio-option"
                            }, [
                              x("input", {
                                id: `form-${R.name}-${_e.trim()}`,
                                name: `form-${R.name}`,
                                type: "radio",
                                value: _e.trim(),
                                checked: p.value[R.name] === _e.trim(),
                                onChange: (wp) => tt(R.name, _e.trim()),
                                class: "form-radio",
                                disabled: k.value
                              }, null, 40, Td),
                              x("label", {
                                for: `form-${R.name}-${_e.trim()}`,
                                class: "radio-label"
                              }, se(_e.trim()), 9, Ed)
                            ]))), 128))
                          ])) : ae("", !0),
                          y.value[R.name] ? (P(), $("div", Ad, se(y.value[R.name]), 1)) : ae("", !0)
                        ]);
                      }), 128))
                    ]),
                    x("div", Rd, [
                      x("button", {
                        onClick: () => {
                          var R;
                          console.log("Regular form submit button clicked!"), $l((R = h.attributes) == null ? void 0 : R.form_data);
                        },
                        disabled: k.value,
                        class: "form-submit-button",
                        style: we(D(w))
                      }, se(k.value ? "Submitting..." : ((ci = (ai = h.attributes) == null ? void 0 : ai.form_data) == null ? void 0 : ci.submit_button_text) || "Submit"), 13, Id)
                    ])
                  ])) : h.message_type === "user_input" ? (P(), $("div", Od, [
                    (ui = h.attributes) != null && ui.prompt_message && h.attributes.prompt_message.trim() ? (P(), $("div", Ld, se(h.attributes.prompt_message), 1)) : ae("", !0),
                    h.isSubmitted ? (P(), $("div", Bd, [
                      b[18] || (b[18] = x("strong", null, "Your input:", -1)),
                      yt(" " + se(h.submittedValue) + " ", 1),
                      (fi = h.attributes) != null && fi.confirmation_message && h.attributes.confirmation_message.trim() ? (P(), $("div", Fd, se(h.attributes.confirmation_message), 1)) : ae("", !0)
                    ])) : (P(), $("div", Pd, [
                      rn(x("textarea", {
                        "onUpdate:modelValue": (R) => h.userInputValue = R,
                        class: "user-input-textarea",
                        placeholder: "Type your message here...",
                        rows: "3",
                        onKeydown: [
                          ji(Ui((R) => Bs(h), ["ctrl"]), ["enter"]),
                          ji(Ui((R) => Bs(h), ["meta"]), ["enter"])
                        ]
                      }, null, 40, $d), [
                        [an, h.userInputValue]
                      ]),
                      x("button", {
                        class: "user-input-submit-button",
                        onClick: (R) => Bs(h),
                        disabled: !h.userInputValue || !h.userInputValue.trim()
                      }, " Submit ", 8, Nd)
                    ]))
                  ])) : h.shopify_output || h.message_type === "product" ? (P(), $("div", Md, [
                    h.message && (!((hi = h.shopify_output) != null && hi.products) || h.shopify_output.products.length === 0) ? (P(), $("div", {
                      key: 0,
                      innerHTML: D(ue)(h.message, { renderer: D(t) }),
                      class: "product-message-text"
                    }, null, 8, Dd)) : ae("", !0),
                    (di = h.shopify_output) != null && di.products && h.shopify_output.products.length > 0 ? (P(), $("div", qd, [
                      b[20] || (b[20] = x("h3", { class: "carousel-title" }, "Products", -1)),
                      x("div", Vd, [
                        (P(!0), $(Be, null, xt(h.shopify_output.products, (R) => {
                          var zt;
                          return P(), $("div", {
                            key: R.id,
                            class: "product-card-compact carousel-item"
                          }, [
                            (zt = R.image) != null && zt.src ? (P(), $("div", Hd, [
                              x("img", {
                                src: R.image.src,
                                alt: R.title,
                                class: "product-thumbnail"
                              }, null, 8, Ud)
                            ])) : ae("", !0),
                            x("div", jd, [
                              x("div", Wd, [
                                x("div", zd, se(R.title), 1),
                                R.variant_title && R.variant_title !== "Default Title" ? (P(), $("div", Kd, se(R.variant_title), 1)) : ae("", !0),
                                x("div", Gd, se(R.price_formatted || `₹${R.price}`), 1)
                              ]),
                              x("div", Zd, [
                                x("button", {
                                  class: "view-details-button-compact",
                                  onClick: (Fs) => {
                                    var _e;
                                    return Fl(R, (_e = h.shopify_output) == null ? void 0 : _e.shop_domain);
                                  }
                                }, b[19] || (b[19] = [
                                  yt(" View product ", -1),
                                  x("span", { class: "external-link-icon" }, "↗", -1)
                                ]), 8, Yd)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])) : !h.message && ((pi = h.shopify_output) != null && pi.products) && h.shopify_output.products.length === 0 ? (P(), $("div", Jd, b[21] || (b[21] = [
                      x("p", null, "No products found.", -1)
                    ]))) : !h.message && h.shopify_output && !h.shopify_output.products ? (P(), $("div", Qd, b[22] || (b[22] = [
                      x("p", null, "No products to display.", -1)
                    ]))) : ae("", !0)
                  ])) : (P(), $("div", {
                    key: 4,
                    innerHTML: D(ue)(h.message, { renderer: D(t) })
                  }, null, 8, Xd))
                ], 4),
                x("div", ep, [
                  h.message_type === "user" ? (P(), $("span", tp, " You ")) : ae("", !0)
                ])
              ], 2);
            }), 128)),
            D(f) ? (P(), $("div", np, b[23] || (b[23] = [
              x("div", { class: "dot" }, null, -1),
              x("div", { class: "dot" }, null, -1),
              x("div", { class: "dot" }, null, -1)
            ]))) : ae("", !0)
          ], 512),
          Oe.value ? (P(), $("div", {
            key: 4,
            class: "new-conversation-section",
            style: we(D(g))
          }, [
            x("div", ap, [
              b[25] || (b[25] = x("p", { class: "ended-text" }, "This chat has ended.", -1)),
              x("button", {
                class: "start-new-conversation-button",
                style: we(D(w)),
                onClick: Vl
              }, " Click here to start a new conversation ", 4)
            ])
          ], 4)) : (P(), $("div", {
            key: 3,
            class: Pe(["chat-input", { "ask-anything-input": ut.value }]),
            style: we(D(g))
          }, [
            !D(B) && !X.value && !ut.value ? (P(), $("div", sp, [
              rn(x("input", {
                "onUpdate:modelValue": b[3] || (b[3] = (h) => re.value = h),
                type: "email",
                placeholder: "Enter your email address to begin",
                disabled: D(f) || D(q) !== "connected",
                class: Pe({
                  invalid: re.value.trim() && !D(Tn)(re.value.trim()),
                  disabled: D(q) !== "connected"
                })
              }, null, 10, rp), [
                [an, re.value]
              ])
            ])) : ae("", !0),
            x("div", ip, [
              rn(x("input", {
                "onUpdate:modelValue": b[4] || (b[4] = (h) => Ve.value = h),
                type: "text",
                placeholder: L.value,
                onKeypress: U,
                onInput: ie,
                onChange: ie,
                disabled: !O.value,
                class: Pe({ disabled: !O.value, "ask-anything-field": ut.value })
              }, null, 42, op), [
                [an, Ve.value]
              ]),
              x("button", {
                class: Pe(["send-button", { "ask-anything-send": ut.value }]),
                style: we(D(w)),
                onClick: E,
                disabled: !Ve.value.trim() || !O.value
              }, b[24] || (b[24] = [
                x("svg", {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg"
                }, [
                  x("path", {
                    d: "M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)
              ]), 14, lp)
            ])
          ], 6)),
          x("div", {
            class: "powered-by",
            style: we(D(C))
          }, b[26] || (b[26] = [
            x("svg", {
              class: "chattermate-logo",
              width: "16",
              height: "16",
              viewBox: "0 0 60 60",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              x("path", {
                d: "M45 15H15C13.3431 15 12 16.3431 12 18V42C12 43.6569 13.3431 45 15 45H25L30 52L35 45H45C46.6569 45 48 43.6569 48 42V18C48 16.3431 46.6569 15 45 15Z",
                fill: "currentColor",
                opacity: "0.8"
              }),
              x("path", {
                d: "M36 27C36 27 32.5 26 30 26C27.5 26 24 27 24 31C24 35 27.5 36 30 36C32.5 36 36 35 36 35V33C36 33 33 34 31.5 34C30 34 27 33 27 31C27 29 30 28 31.5 28C33 28 36 29 36 29V27Z",
                fill: "currentColor"
              })
            ], -1),
            yt(" Powered by ChatterMate ", -1)
          ]), 4)
        ], 6)) : ae("", !0)
      ], 64)),
      ge.value ? (P(), $("div", cp, [
        x("div", up, [
          b[27] || (b[27] = x("h3", null, "Rate your conversation", -1)),
          x("div", fp, [
            (P(), $(Be, null, xt(5, (h) => x("button", {
              key: h,
              onClick: (G) => oe.value = h,
              class: Pe([{ active: h <= oe.value }, "star-button"])
            }, " ★ ", 10, hp)), 64))
          ]),
          rn(x("textarea", {
            "onUpdate:modelValue": b[5] || (b[5] = (h) => Ne.value = h),
            placeholder: "Additional feedback (optional)",
            class: "rating-feedback"
          }, null, 512), [
            [an, Ne.value]
          ]),
          x("div", dp, [
            x("button", {
              onClick: b[6] || (b[6] = (h) => m.submitRating(oe.value, Ne.value)),
              disabled: !oe.value,
              class: "submit-button",
              style: we(D(w))
            }, " Submit ", 12, pp),
            x("button", {
              onClick: b[7] || (b[7] = (h) => ge.value = !1),
              class: "skip-rating"
            }, " Skip ")
          ])
        ])
      ])) : ae("", !0)
    ], 6));
  }
}), mp = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, _p = /* @__PURE__ */ mp(gp, [["__scopeId", "data-v-5b7debf6"]]);
window.process || (window.process = { env: { NODE_ENV: "production" } });
const yp = new URL(window.location.href), bp = yp.searchParams.get("widget_id"), vp = hu(_p, {
  widgetId: bp
});
vp.mount("#app");
