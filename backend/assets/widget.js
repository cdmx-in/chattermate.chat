var El = Object.defineProperty;
var Rl = (t, e, n) => e in t ? El(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var we = (t, e, n) => Rl(t, typeof e != "symbol" ? e + "" : e, n);
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function pi(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const ke = {}, dn = [], At = () => {
}, Il = () => !1, ms = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), gi = (t) => t.startsWith("onUpdate:"), Ke = Object.assign, mi = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Ol = Object.prototype.hasOwnProperty, be = (t, e) => Ol.call(t, e), Y = Array.isArray, pn = (t) => _s(t) === "[object Map]", Zr = (t) => _s(t) === "[object Set]", Q = (t) => typeof t == "function", Me = (t) => typeof t == "string", Zt = (t) => typeof t == "symbol", Pe = (t) => t !== null && typeof t == "object", Gr = (t) => (Pe(t) || Q(t)) && Q(t.then) && Q(t.catch), Yr = Object.prototype.toString, _s = (t) => Yr.call(t), Ll = (t) => _s(t).slice(8, -1), Jr = (t) => _s(t) === "[object Object]", _i = (t) => Me(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, En = /* @__PURE__ */ pi(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ys = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Pl = /-(\w)/g, Kt = ys(
  (t) => t.replace(Pl, (e, n) => n ? n.toUpperCase() : "")
), $l = /\B([A-Z])/g, Gt = ys(
  (t) => t.replace($l, "-$1").toLowerCase()
), Qr = ys((t) => t.charAt(0).toUpperCase() + t.slice(1)), $s = ys(
  (t) => t ? `on${Qr(t)}` : ""
), zt = (t, e) => !Object.is(t, e), Yn = (t, ...e) => {
  for (let n = 0; n < t.length; n++)
    t[n](...e);
}, Xr = (t, e, n, s = !1) => {
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
let or;
const bs = () => or || (or = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Se(t) {
  if (Y(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const s = t[n], i = Me(s) ? Ml(s) : Se(s);
      if (i)
        for (const r in i)
          e[r] = i[r];
    }
    return e;
  } else if (Me(t) || Pe(t))
    return t;
}
const Fl = /;(?![^(]*\))/g, Bl = /:([^]+)/, Nl = /\/\*[^]*?\*\//g;
function Ml(t) {
  const e = {};
  return t.replace(Nl, "").split(Fl).forEach((n) => {
    if (n) {
      const s = n.split(Bl);
      s.length > 1 && (e[s[0].trim()] = s[1].trim());
    }
  }), e;
}
function Ie(t) {
  let e = "";
  if (Me(t))
    e = t;
  else if (Y(t))
    for (let n = 0; n < t.length; n++) {
      const s = Ie(t[n]);
      s && (e += s + " ");
    }
  else if (Pe(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Dl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ql = /* @__PURE__ */ pi(Dl);
function eo(t) {
  return !!t || t === "";
}
const to = (t) => !!(t && t.__v_isRef === !0), fe = (t) => Me(t) ? t : t == null ? "" : Y(t) || Pe(t) && (t.toString === Yr || !Q(t.toString)) ? to(t) ? fe(t.value) : JSON.stringify(t, no, 2) : String(t), no = (t, e) => to(e) ? no(t, e.value) : pn(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [s, i], r) => (n[Fs(s, r) + " =>"] = i, n),
    {}
  )
} : Zr(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => Fs(n))
} : Zt(e) ? Fs(e) : Pe(e) && !Y(e) && !Jr(e) ? String(e) : e, Fs = (t, e = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Zt(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let rt;
class Vl {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = rt, !e && rt && (this.index = (rt.scopes || (rt.scopes = [])).push(
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
      const n = rt;
      try {
        return rt = this, e();
      } finally {
        rt = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    rt = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    rt = this.parent;
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
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Hl() {
  return rt;
}
let Ce;
const Bs = /* @__PURE__ */ new WeakSet();
class so {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, rt && rt.active && rt.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Bs.has(this) && (Bs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ro(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, lr(this), oo(this);
    const e = Ce, n = yt;
    Ce = this, yt = !0;
    try {
      return this.fn();
    } finally {
      lo(this), Ce = e, yt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        vi(e);
      this.deps = this.depsTail = void 0, lr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Bs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
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
let io = 0, Rn, In;
function ro(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = In, In = t;
    return;
  }
  t.next = Rn, Rn = t;
}
function yi() {
  io++;
}
function bi() {
  if (--io > 0)
    return;
  if (In) {
    let e = In;
    for (In = void 0; e; ) {
      const n = e.next;
      e.next = void 0, e.flags &= -9, e = n;
    }
  }
  let t;
  for (; Rn; ) {
    let e = Rn;
    for (Rn = void 0; e; ) {
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
function oo(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function lo(t) {
  let e, n = t.depsTail, s = n;
  for (; s; ) {
    const i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), vi(s), Ul(s)) : e = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  t.deps = e, t.depsTail = n;
}
function Ys(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (ao(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function ao(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === Bn))
    return;
  t.globalVersion = Bn;
  const e = t.dep;
  if (t.flags |= 2, e.version > 0 && !t.isSSR && t.deps && !Ys(t)) {
    t.flags &= -3;
    return;
  }
  const n = Ce, s = yt;
  Ce = t, yt = !0;
  try {
    oo(t);
    const i = t.fn(t._value);
    (e.version === 0 || zt(i, t._value)) && (t._value = i, e.version++);
  } catch (i) {
    throw e.version++, i;
  } finally {
    Ce = n, yt = s, lo(t), t.flags &= -3;
  }
}
function vi(t, e = !1) {
  const { dep: n, prevSub: s, nextSub: i } = t;
  if (s && (s.nextSub = i, t.prevSub = void 0), i && (i.prevSub = s, t.nextSub = void 0), n.subs === t && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      vi(r, !0);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
function Ul(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let yt = !0;
const co = [];
function Yt() {
  co.push(yt), yt = !1;
}
function Jt() {
  const t = co.pop();
  yt = t === void 0 ? !0 : t;
}
function lr(t) {
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
let Bn = 0;
class jl {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class wi {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(e) {
    if (!Ce || !yt || Ce === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Ce)
      n = this.activeLink = new jl(Ce, this), Ce.deps ? (n.prevDep = Ce.depsTail, Ce.depsTail.nextDep = n, Ce.depsTail = n) : Ce.deps = Ce.depsTail = n, uo(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = Ce.depsTail, n.nextDep = void 0, Ce.depsTail.nextDep = n, Ce.depsTail = n, Ce.deps === n && (Ce.deps = s);
    }
    return n;
  }
  trigger(e) {
    this.version++, Bn++, this.notify(e);
  }
  notify(e) {
    yi();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      bi();
    }
  }
}
function uo(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let s = e.deps; s; s = s.nextDep)
        uo(s);
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
  }
}
const Js = /* @__PURE__ */ new WeakMap(), rn = Symbol(
  ""
), Qs = Symbol(
  ""
), Nn = Symbol(
  ""
);
function je(t, e, n) {
  if (yt && Ce) {
    let s = Js.get(t);
    s || Js.set(t, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new wi()), i.map = s, i.key = n), i.track();
  }
}
function Ft(t, e, n, s, i, r) {
  const o = Js.get(t);
  if (!o) {
    Bn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (yi(), e === "clear")
    o.forEach(l);
  else {
    const a = Y(t), f = a && _i(n);
    if (a && n === "length") {
      const c = Number(s);
      o.forEach((d, w) => {
        (w === "length" || w === Nn || !Zt(w) && w >= c) && l(d);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), f && l(o.get(Nn)), e) {
        case "add":
          a ? f && l(o.get("length")) : (l(o.get(rn)), pn(t) && l(o.get(Qs)));
          break;
        case "delete":
          a || (l(o.get(rn)), pn(t) && l(o.get(Qs)));
          break;
        case "set":
          pn(t) && l(o.get(rn));
          break;
      }
  }
  bi();
}
function un(t) {
  const e = ye(t);
  return e === t ? e : (je(e, "iterate", Nn), dt(t) ? e : e.map(ze));
}
function vs(t) {
  return je(t = ye(t), "iterate", Nn), t;
}
const zl = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ns(this, Symbol.iterator, ze);
  },
  concat(...t) {
    return un(this).concat(
      ...t.map((e) => Y(e) ? un(e) : e)
    );
  },
  entries() {
    return Ns(this, "entries", (t) => (t[1] = ze(t[1]), t));
  },
  every(t, e) {
    return Pt(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return Pt(this, "filter", t, e, (n) => n.map(ze), arguments);
  },
  find(t, e) {
    return Pt(this, "find", t, e, ze, arguments);
  },
  findIndex(t, e) {
    return Pt(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return Pt(this, "findLast", t, e, ze, arguments);
  },
  findLastIndex(t, e) {
    return Pt(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return Pt(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return Ms(this, "includes", t);
  },
  indexOf(...t) {
    return Ms(this, "indexOf", t);
  },
  join(t) {
    return un(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return Ms(this, "lastIndexOf", t);
  },
  map(t, e) {
    return Pt(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return vn(this, "pop");
  },
  push(...t) {
    return vn(this, "push", t);
  },
  reduce(t, ...e) {
    return ar(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return ar(this, "reduceRight", t, e);
  },
  shift() {
    return vn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return Pt(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return vn(this, "splice", t);
  },
  toReversed() {
    return un(this).toReversed();
  },
  toSorted(t) {
    return un(this).toSorted(t);
  },
  toSpliced(...t) {
    return un(this).toSpliced(...t);
  },
  unshift(...t) {
    return vn(this, "unshift", t);
  },
  values() {
    return Ns(this, "values", ze);
  }
};
function Ns(t, e, n) {
  const s = vs(t), i = s[e]();
  return s !== t && !dt(t) && (i._next = i.next, i.next = () => {
    const r = i._next();
    return r.value && (r.value = n(r.value)), r;
  }), i;
}
const Wl = Array.prototype;
function Pt(t, e, n, s, i, r) {
  const o = vs(t), l = o !== t && !dt(t), a = o[e];
  if (a !== Wl[e]) {
    const d = a.apply(t, r);
    return l ? ze(d) : d;
  }
  let f = n;
  o !== t && (l ? f = function(d, w) {
    return n.call(this, ze(d), w, t);
  } : n.length > 2 && (f = function(d, w) {
    return n.call(this, d, w, t);
  }));
  const c = a.call(o, f, s);
  return l && i ? i(c) : c;
}
function ar(t, e, n, s) {
  const i = vs(t);
  let r = n;
  return i !== t && (dt(t) ? n.length > 3 && (r = function(o, l, a) {
    return n.call(this, o, l, a, t);
  }) : r = function(o, l, a) {
    return n.call(this, o, ze(l), a, t);
  }), i[e](r, ...s);
}
function Ms(t, e, n) {
  const s = ye(t);
  je(s, "iterate", Nn);
  const i = s[e](...n);
  return (i === -1 || i === !1) && Ci(n[0]) ? (n[0] = ye(n[0]), s[e](...n)) : i;
}
function vn(t, e, n = []) {
  Yt(), yi();
  const s = ye(t)[e].apply(t, n);
  return bi(), Jt(), s;
}
const Kl = /* @__PURE__ */ pi("__proto__,__v_isRef,__isVue"), fo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Zt)
);
function Zl(t) {
  Zt(t) || (t = String(t));
  const e = ye(this);
  return je(e, "has", t), e.hasOwnProperty(t);
}
class ho {
  constructor(e = !1, n = !1) {
    this._isReadonly = e, this._isShallow = n;
  }
  get(e, n, s) {
    if (n === "__v_skip") return e.__v_skip;
    const i = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return s === (i ? r ? ia : _o : r ? mo : go).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(s) ? e : void 0;
    const o = Y(e);
    if (!i) {
      let a;
      if (o && (a = zl[n]))
        return a;
      if (n === "hasOwnProperty")
        return Zl;
    }
    const l = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      We(e) ? e : s
    );
    return (Zt(n) ? fo.has(n) : Kl(n)) || (i || je(e, "get", n), r) ? l : We(l) ? o && _i(n) ? l : l.value : Pe(l) ? i ? yo(l) : xi(l) : l;
  }
}
class po extends ho {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, s, i) {
    let r = e[n];
    if (!this._isShallow) {
      const a = on(r);
      if (!dt(s) && !on(s) && (r = ye(r), s = ye(s)), !Y(e) && We(r) && !We(s))
        return a ? !1 : (r.value = s, !0);
    }
    const o = Y(e) && _i(n) ? Number(n) < e.length : be(e, n), l = Reflect.set(
      e,
      n,
      s,
      We(e) ? e : i
    );
    return e === ye(i) && (o ? zt(s, r) && Ft(e, "set", n, s) : Ft(e, "add", n, s)), l;
  }
  deleteProperty(e, n) {
    const s = be(e, n);
    e[n];
    const i = Reflect.deleteProperty(e, n);
    return i && s && Ft(e, "delete", n, void 0), i;
  }
  has(e, n) {
    const s = Reflect.has(e, n);
    return (!Zt(n) || !fo.has(n)) && je(e, "has", n), s;
  }
  ownKeys(e) {
    return je(
      e,
      "iterate",
      Y(e) ? "length" : rn
    ), Reflect.ownKeys(e);
  }
}
class Gl extends ho {
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
const Yl = /* @__PURE__ */ new po(), Jl = /* @__PURE__ */ new Gl(), Ql = /* @__PURE__ */ new po(!0);
const Xs = (t) => t, jn = (t) => Reflect.getPrototypeOf(t);
function Xl(t, e, n) {
  return function(...s) {
    const i = this.__v_raw, r = ye(i), o = pn(r), l = t === "entries" || t === Symbol.iterator && o, a = t === "keys" && o, f = i[t](...s), c = n ? Xs : e ? ei : ze;
    return !e && je(
      r,
      "iterate",
      a ? Qs : rn
    ), {
      // iterator protocol
      next() {
        const { value: d, done: w } = f.next();
        return w ? { value: d, done: w } : {
          value: l ? [c(d[0]), c(d[1])] : c(d),
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
function zn(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function ea(t, e) {
  const n = {
    get(i) {
      const r = this.__v_raw, o = ye(r), l = ye(i);
      t || (zt(i, l) && je(o, "get", i), je(o, "get", l));
      const { has: a } = jn(o), f = e ? Xs : t ? ei : ze;
      if (a.call(o, i))
        return f(r.get(i));
      if (a.call(o, l))
        return f(r.get(l));
      r !== o && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !t && je(ye(i), "iterate", rn), Reflect.get(i, "size", i);
    },
    has(i) {
      const r = this.__v_raw, o = ye(r), l = ye(i);
      return t || (zt(i, l) && je(o, "has", i), je(o, "has", l)), i === l ? r.has(i) : r.has(i) || r.has(l);
    },
    forEach(i, r) {
      const o = this, l = o.__v_raw, a = ye(l), f = e ? Xs : t ? ei : ze;
      return !t && je(a, "iterate", rn), l.forEach((c, d) => i.call(r, f(c), f(d), o));
    }
  };
  return Ke(
    n,
    t ? {
      add: zn("add"),
      set: zn("set"),
      delete: zn("delete"),
      clear: zn("clear")
    } : {
      add(i) {
        !e && !dt(i) && !on(i) && (i = ye(i));
        const r = ye(this);
        return jn(r).has.call(r, i) || (r.add(i), Ft(r, "add", i, i)), this;
      },
      set(i, r) {
        !e && !dt(r) && !on(r) && (r = ye(r));
        const o = ye(this), { has: l, get: a } = jn(o);
        let f = l.call(o, i);
        f || (i = ye(i), f = l.call(o, i));
        const c = a.call(o, i);
        return o.set(i, r), f ? zt(r, c) && Ft(o, "set", i, r) : Ft(o, "add", i, r), this;
      },
      delete(i) {
        const r = ye(this), { has: o, get: l } = jn(r);
        let a = o.call(r, i);
        a || (i = ye(i), a = o.call(r, i)), l && l.call(r, i);
        const f = r.delete(i);
        return a && Ft(r, "delete", i, void 0), f;
      },
      clear() {
        const i = ye(this), r = i.size !== 0, o = i.clear();
        return r && Ft(
          i,
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
  ].forEach((i) => {
    n[i] = Xl(i, t, e);
  }), n;
}
function ki(t, e) {
  const n = ea(t, e);
  return (s, i, r) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? s : Reflect.get(
    be(n, i) && i in s ? n : s,
    i,
    r
  );
}
const ta = {
  get: /* @__PURE__ */ ki(!1, !1)
}, na = {
  get: /* @__PURE__ */ ki(!1, !0)
}, sa = {
  get: /* @__PURE__ */ ki(!0, !1)
};
const go = /* @__PURE__ */ new WeakMap(), mo = /* @__PURE__ */ new WeakMap(), _o = /* @__PURE__ */ new WeakMap(), ia = /* @__PURE__ */ new WeakMap();
function ra(t) {
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
function oa(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : ra(Ll(t));
}
function xi(t) {
  return on(t) ? t : Si(
    t,
    !1,
    Yl,
    ta,
    go
  );
}
function la(t) {
  return Si(
    t,
    !1,
    Ql,
    na,
    mo
  );
}
function yo(t) {
  return Si(
    t,
    !0,
    Jl,
    sa,
    _o
  );
}
function Si(t, e, n, s, i) {
  if (!Pe(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const r = i.get(t);
  if (r)
    return r;
  const o = oa(t);
  if (o === 0)
    return t;
  const l = new Proxy(
    t,
    o === 2 ? s : n
  );
  return i.set(t, l), l;
}
function gn(t) {
  return on(t) ? gn(t.__v_raw) : !!(t && t.__v_isReactive);
}
function on(t) {
  return !!(t && t.__v_isReadonly);
}
function dt(t) {
  return !!(t && t.__v_isShallow);
}
function Ci(t) {
  return t ? !!t.__v_raw : !1;
}
function ye(t) {
  const e = t && t.__v_raw;
  return e ? ye(e) : t;
}
function aa(t) {
  return !be(t, "__v_skip") && Object.isExtensible(t) && Xr(t, "__v_skip", !0), t;
}
const ze = (t) => Pe(t) ? xi(t) : t, ei = (t) => Pe(t) ? yo(t) : t;
function We(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function ge(t) {
  return ca(t, !1);
}
function ca(t, e) {
  return We(t) ? t : new ua(t, e);
}
class ua {
  constructor(e, n) {
    this.dep = new wi(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? e : ye(e), this._value = n ? e : ze(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, s = this.__v_isShallow || dt(e) || on(e);
    e = s ? e : ye(e), zt(e, n) && (this._rawValue = e, this._value = s ? e : ze(e), this.dep.trigger());
  }
}
function H(t) {
  return We(t) ? t.value : t;
}
const fa = {
  get: (t, e, n) => e === "__v_raw" ? t : H(Reflect.get(t, e, n)),
  set: (t, e, n, s) => {
    const i = t[e];
    return We(i) && !We(n) ? (i.value = n, !0) : Reflect.set(t, e, n, s);
  }
};
function bo(t) {
  return gn(t) ? t : new Proxy(t, fa);
}
class ha {
  constructor(e, n, s) {
    this.fn = e, this.setter = n, this._value = void 0, this.dep = new wi(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Bn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Ce !== this)
      return ro(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return ao(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
function da(t, e, n = !1) {
  let s, i;
  return Q(t) ? s = t : (s = t.get, i = t.set), new ha(s, i, n);
}
const Wn = {}, os = /* @__PURE__ */ new WeakMap();
let sn;
function pa(t, e = !1, n = sn) {
  if (n) {
    let s = os.get(n);
    s || os.set(n, s = []), s.push(t);
  }
}
function ga(t, e, n = ke) {
  const { immediate: s, deep: i, once: r, scheduler: o, augmentJob: l, call: a } = n, f = (U) => i ? U : dt(U) || i === !1 || i === 0 ? Bt(U, 1) : Bt(U);
  let c, d, w, S, q = !1, F = !1;
  if (We(t) ? (d = () => t.value, q = dt(t)) : gn(t) ? (d = () => f(t), q = !0) : Y(t) ? (F = !0, q = t.some((U) => gn(U) || dt(U)), d = () => t.map((U) => {
    if (We(U))
      return U.value;
    if (gn(U))
      return f(U);
    if (Q(U))
      return a ? a(U, 2) : U();
  })) : Q(t) ? e ? d = a ? () => a(t, 2) : t : d = () => {
    if (w) {
      Yt();
      try {
        w();
      } finally {
        Jt();
      }
    }
    const U = sn;
    sn = c;
    try {
      return a ? a(t, 3, [S]) : t(S);
    } finally {
      sn = U;
    }
  } : d = At, e && i) {
    const U = d, ie = i === !0 ? 1 / 0 : i;
    d = () => Bt(U(), ie);
  }
  const te = Hl(), ne = () => {
    c.stop(), te && te.active && mi(te.effects, c);
  };
  if (r && e) {
    const U = e;
    e = (...ie) => {
      U(...ie), ne();
    };
  }
  let de = F ? new Array(t.length).fill(Wn) : Wn;
  const me = (U) => {
    if (!(!(c.flags & 1) || !c.dirty && !U))
      if (e) {
        const ie = c.run();
        if (i || q || (F ? ie.some((qe, _e) => zt(qe, de[_e])) : zt(ie, de))) {
          w && w();
          const qe = sn;
          sn = c;
          try {
            const _e = [
              ie,
              // pass undefined as the old value when it's changed for the first time
              de === Wn ? void 0 : F && de[0] === Wn ? [] : de,
              S
            ];
            a ? a(e, 3, _e) : (
              // @ts-expect-error
              e(..._e)
            ), de = ie;
          } finally {
            sn = qe;
          }
        }
      } else
        c.run();
  };
  return l && l(me), c = new so(d), c.scheduler = o ? () => o(me, !1) : me, S = (U) => pa(U, !1, c), w = c.onStop = () => {
    const U = os.get(c);
    if (U) {
      if (a)
        a(U, 4);
      else
        for (const ie of U) ie();
      os.delete(c);
    }
  }, e ? s ? me(!0) : de = c.run() : o ? o(me.bind(null, !0), !0) : c.run(), ne.pause = c.pause.bind(c), ne.resume = c.resume.bind(c), ne.stop = ne, ne;
}
function Bt(t, e = 1 / 0, n) {
  if (e <= 0 || !Pe(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(t)))
    return t;
  if (n.add(t), e--, We(t))
    Bt(t.value, e, n);
  else if (Y(t))
    for (let s = 0; s < t.length; s++)
      Bt(t[s], e, n);
  else if (Zr(t) || pn(t))
    t.forEach((s) => {
      Bt(s, e, n);
    });
  else if (Jr(t)) {
    for (const s in t)
      Bt(t[s], e, n);
    for (const s of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, s) && Bt(t[s], e, n);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Vn(t, e, n, s) {
  try {
    return s ? t(...s) : t();
  } catch (i) {
    ws(i, e, n);
  }
}
function It(t, e, n, s) {
  if (Q(t)) {
    const i = Vn(t, e, n, s);
    return i && Gr(i) && i.catch((r) => {
      ws(r, e, n);
    }), i;
  }
  if (Y(t)) {
    const i = [];
    for (let r = 0; r < t.length; r++)
      i.push(It(t[r], e, n, s));
    return i;
  }
}
function ws(t, e, n, s = !0) {
  const i = e ? e.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: o } = e && e.appContext.config || ke;
  if (e) {
    let l = e.parent;
    const a = e.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const c = l.ec;
      if (c) {
        for (let d = 0; d < c.length; d++)
          if (c[d](t, a, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      Yt(), Vn(r, null, 10, [
        t,
        a,
        f
      ]), Jt();
      return;
    }
  }
  ma(t, n, i, s, o);
}
function ma(t, e, n, s = !0, i = !1) {
  if (i)
    throw t;
  console.error(t);
}
const Ye = [];
let Ct = -1;
const mn = [];
let Ut = null, fn = 0;
const vo = /* @__PURE__ */ Promise.resolve();
let ls = null;
function wo(t) {
  const e = ls || vo;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function _a(t) {
  let e = Ct + 1, n = Ye.length;
  for (; e < n; ) {
    const s = e + n >>> 1, i = Ye[s], r = Mn(i);
    r < t || r === t && i.flags & 2 ? e = s + 1 : n = s;
  }
  return e;
}
function Ti(t) {
  if (!(t.flags & 1)) {
    const e = Mn(t), n = Ye[Ye.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= Mn(n) ? Ye.push(t) : Ye.splice(_a(e), 0, t), t.flags |= 1, ko();
  }
}
function ko() {
  ls || (ls = vo.then(So));
}
function ya(t) {
  Y(t) ? mn.push(...t) : Ut && t.id === -1 ? Ut.splice(fn + 1, 0, t) : t.flags & 1 || (mn.push(t), t.flags |= 1), ko();
}
function cr(t, e, n = Ct + 1) {
  for (; n < Ye.length; n++) {
    const s = Ye[n];
    if (s && s.flags & 2) {
      if (t && s.id !== t.uid)
        continue;
      Ye.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function xo(t) {
  if (mn.length) {
    const e = [...new Set(mn)].sort(
      (n, s) => Mn(n) - Mn(s)
    );
    if (mn.length = 0, Ut) {
      Ut.push(...e);
      return;
    }
    for (Ut = e, fn = 0; fn < Ut.length; fn++) {
      const n = Ut[fn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Ut = null, fn = 0;
  }
}
const Mn = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function So(t) {
  try {
    for (Ct = 0; Ct < Ye.length; Ct++) {
      const e = Ye[Ct];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Vn(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; Ct < Ye.length; Ct++) {
      const e = Ye[Ct];
      e && (e.flags &= -2);
    }
    Ct = -1, Ye.length = 0, xo(), ls = null, (Ye.length || mn.length) && So();
  }
}
let ut = null, Co = null;
function as(t) {
  const e = ut;
  return ut = t, Co = t && t.type.__scopeId || null, e;
}
function ba(t, e = ut, n) {
  if (!e || t._n)
    return t;
  const s = (...i) => {
    s._d && yr(-1);
    const r = as(e);
    let o;
    try {
      o = t(...i);
    } finally {
      as(r), s._d && yr(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Xt(t, e) {
  if (ut === null)
    return t;
  const n = Cs(ut), s = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [r, o, l, a = ke] = e[i];
    r && (Q(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && Bt(o), s.push({
      dir: r,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return t;
}
function en(t, e, n, s) {
  const i = t.dirs, r = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    r && (l.oldValue = r[o].value);
    let a = l.dir[s];
    a && (Yt(), It(a, n, 8, [
      t.el,
      l,
      t,
      e
    ]), Jt());
  }
}
const va = Symbol("_vte"), wa = (t) => t.__isTeleport;
function Ai(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, Ai(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ka(t, e) {
  return Q(t) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ke({ name: t.name }, e, { setup: t })
  ) : t;
}
function To(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function cs(t, e, n, s, i = !1) {
  if (Y(t)) {
    t.forEach(
      (q, F) => cs(
        q,
        e && (Y(e) ? e[F] : e),
        n,
        s,
        i
      )
    );
    return;
  }
  if (On(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && cs(t, e, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? Cs(s.component) : s.el, o = i ? null : r, { i: l, r: a } = t, f = e && e.r, c = l.refs === ke ? l.refs = {} : l.refs, d = l.setupState, w = ye(d), S = d === ke ? () => !1 : (q) => be(w, q);
  if (f != null && f !== a && (Me(f) ? (c[f] = null, S(f) && (d[f] = null)) : We(f) && (f.value = null)), Q(a))
    Vn(a, l, 12, [o, c]);
  else {
    const q = Me(a), F = We(a);
    if (q || F) {
      const te = () => {
        if (t.f) {
          const ne = q ? S(a) ? d[a] : c[a] : a.value;
          i ? Y(ne) && mi(ne, r) : Y(ne) ? ne.includes(r) || ne.push(r) : q ? (c[a] = [r], S(a) && (d[a] = c[a])) : (a.value = [r], t.k && (c[t.k] = a.value));
        } else q ? (c[a] = o, S(a) && (d[a] = o)) : F && (a.value = o, t.k && (c[t.k] = o));
      };
      o ? (te.id = -1, it(te, n)) : te();
    }
  }
}
bs().requestIdleCallback;
bs().cancelIdleCallback;
const On = (t) => !!t.type.__asyncLoader, Ao = (t) => t.type.__isKeepAlive;
function xa(t, e) {
  Eo(t, "a", e);
}
function Sa(t, e) {
  Eo(t, "da", e);
}
function Eo(t, e, n = Je) {
  const s = t.__wdc || (t.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return t();
  });
  if (ks(e, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Ao(i.parent.vnode) && Ca(s, e, n, i), i = i.parent;
  }
}
function Ca(t, e, n, s) {
  const i = ks(
    e,
    t,
    s,
    !0
    /* prepend */
  );
  Ei(() => {
    mi(s[e], i);
  }, n);
}
function ks(t, e, n = Je, s = !1) {
  if (n) {
    const i = n[t] || (n[t] = []), r = e.__weh || (e.__weh = (...o) => {
      Yt();
      const l = Hn(n), a = It(e, n, t, o);
      return l(), Jt(), a;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const Nt = (t) => (e, n = Je) => {
  (!qn || t === "sp") && ks(t, (...s) => e(...s), n);
}, Ta = Nt("bm"), Ro = Nt("m"), Aa = Nt(
  "bu"
), Ea = Nt("u"), Ra = Nt(
  "bum"
), Ei = Nt("um"), Ia = Nt(
  "sp"
), Oa = Nt("rtg"), La = Nt("rtc");
function Pa(t, e = Je) {
  ks("ec", t, e);
}
const $a = Symbol.for("v-ndc");
function kt(t, e, n, s) {
  let i;
  const r = n, o = Y(t);
  if (o || Me(t)) {
    const l = o && gn(t);
    let a = !1;
    l && (a = !dt(t), t = vs(t)), i = new Array(t.length);
    for (let f = 0, c = t.length; f < c; f++)
      i[f] = e(
        a ? ze(t[f]) : t[f],
        f,
        void 0,
        r
      );
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let l = 0; l < t; l++)
      i[l] = e(l + 1, l, void 0, r);
  } else if (Pe(t))
    if (t[Symbol.iterator])
      i = Array.from(
        t,
        (l, a) => e(l, a, void 0, r)
      );
    else {
      const l = Object.keys(t);
      i = new Array(l.length);
      for (let a = 0, f = l.length; a < f; a++) {
        const c = l[a];
        i[a] = e(t[c], c, a, r);
      }
    }
  else
    i = [];
  return i;
}
const ti = (t) => t ? Jo(t) ? Cs(t) : ti(t.parent) : null, Ln = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ke(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => ti(t.parent),
    $root: (t) => ti(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => Oo(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      Ti(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = wo.bind(t.proxy)),
    $watch: (t) => nc.bind(t)
  })
), Ds = (t, e) => t !== ke && !t.__isScriptSetup && be(t, e), Fa = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: i, props: r, accessCache: o, type: l, appContext: a } = t;
    let f;
    if (e[0] !== "$") {
      const S = o[e];
      if (S !== void 0)
        switch (S) {
          case 1:
            return s[e];
          case 2:
            return i[e];
          case 4:
            return n[e];
          case 3:
            return r[e];
        }
      else {
        if (Ds(s, e))
          return o[e] = 1, s[e];
        if (i !== ke && be(i, e))
          return o[e] = 2, i[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = t.propsOptions[0]) && be(f, e)
        )
          return o[e] = 3, r[e];
        if (n !== ke && be(n, e))
          return o[e] = 4, n[e];
        ni && (o[e] = 0);
      }
    }
    const c = Ln[e];
    let d, w;
    if (c)
      return e === "$attrs" && je(t.attrs, "get", ""), c(t);
    if (
      // css module (injected by vue-loader)
      (d = l.__cssModules) && (d = d[e])
    )
      return d;
    if (n !== ke && be(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      w = a.config.globalProperties, be(w, e)
    )
      return w[e];
  },
  set({ _: t }, e, n) {
    const { data: s, setupState: i, ctx: r } = t;
    return Ds(i, e) ? (i[e] = n, !0) : s !== ke && be(s, e) ? (s[e] = n, !0) : be(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (r[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: s, appContext: i, propsOptions: r }
  }, o) {
    let l;
    return !!n[o] || t !== ke && be(t, o) || Ds(e, o) || (l = r[0]) && be(l, o) || be(s, o) || be(Ln, o) || be(i.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : be(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function ur(t) {
  return Y(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let ni = !0;
function Ba(t) {
  const e = Oo(t), n = t.proxy, s = t.ctx;
  ni = !1, e.beforeCreate && fr(e.beforeCreate, t, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: o,
    watch: l,
    provide: a,
    inject: f,
    // lifecycle
    created: c,
    beforeMount: d,
    mounted: w,
    beforeUpdate: S,
    updated: q,
    activated: F,
    deactivated: te,
    beforeDestroy: ne,
    beforeUnmount: de,
    destroyed: me,
    unmounted: U,
    render: ie,
    renderTracked: qe,
    renderTriggered: _e,
    errorCaptured: $e,
    serverPrefetch: pt,
    // public API
    expose: Ze,
    inheritAttrs: gt,
    // assets
    components: bt,
    directives: Xe,
    filters: He
  } = e;
  if (f && Na(f, s, null), o)
    for (const X in o) {
      const re = o[X];
      Q(re) && (s[X] = re.bind(n));
    }
  if (i) {
    const X = i.call(n, n);
    Pe(X) && (t.data = xi(X));
  }
  if (ni = !0, r)
    for (const X in r) {
      const re = r[X], D = Q(re) ? re.bind(n, n) : Q(re.get) ? re.get.bind(n, n) : At, Te = !Q(re) && Q(re.set) ? re.set.bind(n) : At, W = De({
        get: D,
        set: Te
      });
      Object.defineProperty(s, X, {
        enumerable: !0,
        configurable: !0,
        get: () => W.value,
        set: (Ae) => W.value = Ae
      });
    }
  if (l)
    for (const X in l)
      Io(l[X], s, n, X);
  if (a) {
    const X = Q(a) ? a.call(n) : a;
    Reflect.ownKeys(X).forEach((re) => {
      Ua(re, X[re]);
    });
  }
  c && fr(c, t, "c");
  function se(X, re) {
    Y(re) ? re.forEach((D) => X(D.bind(n))) : re && X(re.bind(n));
  }
  if (se(Ta, d), se(Ro, w), se(Aa, S), se(Ea, q), se(xa, F), se(Sa, te), se(Pa, $e), se(La, qe), se(Oa, _e), se(Ra, de), se(Ei, U), se(Ia, pt), Y(Ze))
    if (Ze.length) {
      const X = t.exposed || (t.exposed = {});
      Ze.forEach((re) => {
        Object.defineProperty(X, re, {
          get: () => n[re],
          set: (D) => n[re] = D
        });
      });
    } else t.exposed || (t.exposed = {});
  ie && t.render === At && (t.render = ie), gt != null && (t.inheritAttrs = gt), bt && (t.components = bt), Xe && (t.directives = Xe), pt && To(t);
}
function Na(t, e, n = At) {
  Y(t) && (t = si(t));
  for (const s in t) {
    const i = t[s];
    let r;
    Pe(i) ? "default" in i ? r = Jn(
      i.from || s,
      i.default,
      !0
    ) : r = Jn(i.from || s) : r = Jn(i), We(r) ? Object.defineProperty(e, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (o) => r.value = o
    }) : e[s] = r;
  }
}
function fr(t, e, n) {
  It(
    Y(t) ? t.map((s) => s.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function Io(t, e, n, s) {
  let i = s.includes(".") ? zo(n, s) : () => n[s];
  if (Me(t)) {
    const r = e[t];
    Q(r) && Qn(i, r);
  } else if (Q(t))
    Qn(i, t.bind(n));
  else if (Pe(t))
    if (Y(t))
      t.forEach((r) => Io(r, e, n, s));
    else {
      const r = Q(t.handler) ? t.handler.bind(n) : e[t.handler];
      Q(r) && Qn(i, r, t);
    }
}
function Oo(t) {
  const e = t.type, { mixins: n, extends: s } = e, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = r.get(e);
  let a;
  return l ? a = l : !i.length && !n && !s ? a = e : (a = {}, i.length && i.forEach(
    (f) => us(a, f, o, !0)
  ), us(a, e, o)), Pe(e) && r.set(e, a), a;
}
function us(t, e, n, s = !1) {
  const { mixins: i, extends: r } = e;
  r && us(t, r, n, !0), i && i.forEach(
    (o) => us(t, o, n, !0)
  );
  for (const o in e)
    if (!(s && o === "expose")) {
      const l = Ma[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const Ma = {
  data: hr,
  props: dr,
  emits: dr,
  // objects
  methods: Tn,
  computed: Tn,
  // lifecycle
  beforeCreate: Ge,
  created: Ge,
  beforeMount: Ge,
  mounted: Ge,
  beforeUpdate: Ge,
  updated: Ge,
  beforeDestroy: Ge,
  beforeUnmount: Ge,
  destroyed: Ge,
  unmounted: Ge,
  activated: Ge,
  deactivated: Ge,
  errorCaptured: Ge,
  serverPrefetch: Ge,
  // assets
  components: Tn,
  directives: Tn,
  // watch
  watch: qa,
  // provide / inject
  provide: hr,
  inject: Da
};
function hr(t, e) {
  return e ? t ? function() {
    return Ke(
      Q(t) ? t.call(this, this) : t,
      Q(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function Da(t, e) {
  return Tn(si(t), si(e));
}
function si(t) {
  if (Y(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function Ge(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Tn(t, e) {
  return t ? Ke(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function dr(t, e) {
  return t ? Y(t) && Y(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : Ke(
    /* @__PURE__ */ Object.create(null),
    ur(t),
    ur(e ?? {})
  ) : e;
}
function qa(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = Ke(/* @__PURE__ */ Object.create(null), t);
  for (const s in e)
    n[s] = Ge(t[s], e[s]);
  return n;
}
function Lo() {
  return {
    app: null,
    config: {
      isNativeTag: Il,
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
let Va = 0;
function Ha(t, e) {
  return function(s, i = null) {
    Q(s) || (s = Ke({}, s)), i != null && !Pe(i) && (i = null);
    const r = Lo(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const f = r.app = {
      _uid: Va++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: Sc,
      get config() {
        return r.config;
      },
      set config(c) {
      },
      use(c, ...d) {
        return o.has(c) || (c && Q(c.install) ? (o.add(c), c.install(f, ...d)) : Q(c) && (o.add(c), c(f, ...d))), f;
      },
      mixin(c) {
        return r.mixins.includes(c) || r.mixins.push(c), f;
      },
      component(c, d) {
        return d ? (r.components[c] = d, f) : r.components[c];
      },
      directive(c, d) {
        return d ? (r.directives[c] = d, f) : r.directives[c];
      },
      mount(c, d, w) {
        if (!a) {
          const S = f._ceVNode || Et(s, i);
          return S.appContext = r, w === !0 ? w = "svg" : w === !1 && (w = void 0), t(S, c, w), a = !0, f._container = c, c.__vue_app__ = f, Cs(S.component);
        }
      },
      onUnmount(c) {
        l.push(c);
      },
      unmount() {
        a && (It(
          l,
          f._instance,
          16
        ), t(null, f._container), delete f._container.__vue_app__);
      },
      provide(c, d) {
        return r.provides[c] = d, f;
      },
      runWithContext(c) {
        const d = _n;
        _n = f;
        try {
          return c();
        } finally {
          _n = d;
        }
      }
    };
    return f;
  };
}
let _n = null;
function Ua(t, e) {
  if (Je) {
    let n = Je.provides;
    const s = Je.parent && Je.parent.provides;
    s === n && (n = Je.provides = Object.create(s)), n[t] = e;
  }
}
function Jn(t, e, n = !1) {
  const s = Je || ut;
  if (s || _n) {
    const i = _n ? _n._context.provides : s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && Q(e) ? e.call(s && s.proxy) : e;
  }
}
const Po = {}, $o = () => Object.create(Po), Fo = (t) => Object.getPrototypeOf(t) === Po;
function ja(t, e, n, s = !1) {
  const i = {}, r = $o();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), Bo(t, e, i, r);
  for (const o in t.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? t.props = s ? i : la(i) : t.type.props ? t.props = i : t.props = r, t.attrs = r;
}
function za(t, e, n, s) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: o }
  } = t, l = ye(i), [a] = t.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const c = t.vnode.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        let w = c[d];
        if (xs(t.emitsOptions, w))
          continue;
        const S = e[w];
        if (a)
          if (be(r, w))
            S !== r[w] && (r[w] = S, f = !0);
          else {
            const q = Kt(w);
            i[q] = ii(
              a,
              l,
              q,
              S,
              t,
              !1
            );
          }
        else
          S !== r[w] && (r[w] = S, f = !0);
      }
    }
  } else {
    Bo(t, e, i, r) && (f = !0);
    let c;
    for (const d in l)
      (!e || // for camelCase
      !be(e, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Gt(d)) === d || !be(e, c))) && (a ? n && // for camelCase
      (n[d] !== void 0 || // for kebab-case
      n[c] !== void 0) && (i[d] = ii(
        a,
        l,
        d,
        void 0,
        t,
        !0
      )) : delete i[d]);
    if (r !== l)
      for (const d in r)
        (!e || !be(e, d)) && (delete r[d], f = !0);
  }
  f && Ft(t.attrs, "set", "");
}
function Bo(t, e, n, s) {
  const [i, r] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let a in e) {
      if (En(a))
        continue;
      const f = e[a];
      let c;
      i && be(i, c = Kt(a)) ? !r || !r.includes(c) ? n[c] = f : (l || (l = {}))[c] = f : xs(t.emitsOptions, a) || (!(a in s) || f !== s[a]) && (s[a] = f, o = !0);
    }
  if (r) {
    const a = ye(n), f = l || ke;
    for (let c = 0; c < r.length; c++) {
      const d = r[c];
      n[d] = ii(
        i,
        a,
        d,
        f[d],
        t,
        !be(f, d)
      );
    }
  }
  return o;
}
function ii(t, e, n, s, i, r) {
  const o = t[n];
  if (o != null) {
    const l = be(o, "default");
    if (l && s === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && Q(a)) {
        const { propsDefaults: f } = i;
        if (n in f)
          s = f[n];
        else {
          const c = Hn(i);
          s = f[n] = a.call(
            null,
            e
          ), c();
        }
      } else
        s = a;
      i.ce && i.ce._setProp(n, s);
    }
    o[
      0
      /* shouldCast */
    ] && (r && !l ? s = !1 : o[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === Gt(n)) && (s = !0));
  }
  return s;
}
const Wa = /* @__PURE__ */ new WeakMap();
function No(t, e, n = !1) {
  const s = n ? Wa : e.propsCache, i = s.get(t);
  if (i)
    return i;
  const r = t.props, o = {}, l = [];
  let a = !1;
  if (!Q(t)) {
    const c = (d) => {
      a = !0;
      const [w, S] = No(d, e, !0);
      Ke(o, w), S && l.push(...S);
    };
    !n && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  if (!r && !a)
    return Pe(t) && s.set(t, dn), dn;
  if (Y(r))
    for (let c = 0; c < r.length; c++) {
      const d = Kt(r[c]);
      pr(d) && (o[d] = ke);
    }
  else if (r)
    for (const c in r) {
      const d = Kt(c);
      if (pr(d)) {
        const w = r[c], S = o[d] = Y(w) || Q(w) ? { type: w } : Ke({}, w), q = S.type;
        let F = !1, te = !0;
        if (Y(q))
          for (let ne = 0; ne < q.length; ++ne) {
            const de = q[ne], me = Q(de) && de.name;
            if (me === "Boolean") {
              F = !0;
              break;
            } else me === "String" && (te = !1);
          }
        else
          F = Q(q) && q.name === "Boolean";
        S[
          0
          /* shouldCast */
        ] = F, S[
          1
          /* shouldCastTrue */
        ] = te, (F || be(S, "default")) && l.push(d);
      }
    }
  const f = [o, l];
  return Pe(t) && s.set(t, f), f;
}
function pr(t) {
  return t[0] !== "$" && !En(t);
}
const Mo = (t) => t[0] === "_" || t === "$stable", Ri = (t) => Y(t) ? t.map(Tt) : [Tt(t)], Ka = (t, e, n) => {
  if (e._n)
    return e;
  const s = ba((...i) => Ri(e(...i)), n);
  return s._c = !1, s;
}, Do = (t, e, n) => {
  const s = t._ctx;
  for (const i in t) {
    if (Mo(i)) continue;
    const r = t[i];
    if (Q(r))
      e[i] = Ka(i, r, s);
    else if (r != null) {
      const o = Ri(r);
      e[i] = () => o;
    }
  }
}, qo = (t, e) => {
  const n = Ri(e);
  t.slots.default = () => n;
}, Vo = (t, e, n) => {
  for (const s in e)
    (n || s !== "_") && (t[s] = e[s]);
}, Za = (t, e, n) => {
  const s = t.slots = $o();
  if (t.vnode.shapeFlag & 32) {
    const i = e._;
    i ? (Vo(s, e, n), n && Xr(s, "_", i, !0)) : Do(e, s);
  } else e && qo(t, e);
}, Ga = (t, e, n) => {
  const { vnode: s, slots: i } = t;
  let r = !0, o = ke;
  if (s.shapeFlag & 32) {
    const l = e._;
    l ? n && l === 1 ? r = !1 : Vo(i, e, n) : (r = !e.$stable, Do(e, i)), o = e;
  } else e && (qo(t, e), o = { default: 1 });
  if (r)
    for (const l in i)
      !Mo(l) && o[l] == null && delete i[l];
}, it = cc;
function Ya(t) {
  return Ja(t);
}
function Ja(t, e) {
  const n = bs();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: i,
    patchProp: r,
    createElement: o,
    createText: l,
    createComment: a,
    setText: f,
    setElementText: c,
    parentNode: d,
    nextSibling: w,
    setScopeId: S = At,
    insertStaticContent: q
  } = t, F = (h, p, b, A = null, T = null, E = null, N = void 0, L = null, P = !!p.dynamicChildren) => {
    if (h === p)
      return;
    h && !wn(h, p) && (A = wt(h), Ae(h, T, E, !0), h = null), p.patchFlag === -2 && (P = !1, p.dynamicChildren = null);
    const { type: C, ref: j, shapeFlag: R } = p;
    switch (C) {
      case Ss:
        te(h, p, b, A);
        break;
      case ln:
        ne(h, p, b, A);
        break;
      case Xn:
        h == null && de(p, b, A, N);
        break;
      case Be:
        bt(
          h,
          p,
          b,
          A,
          T,
          E,
          N,
          L,
          P
        );
        break;
      default:
        R & 1 ? ie(
          h,
          p,
          b,
          A,
          T,
          E,
          N,
          L,
          P
        ) : R & 6 ? Xe(
          h,
          p,
          b,
          A,
          T,
          E,
          N,
          L,
          P
        ) : (R & 64 || R & 128) && C.process(
          h,
          p,
          b,
          A,
          T,
          E,
          N,
          L,
          P,
          tt
        );
    }
    j != null && T && cs(j, h && h.ref, E, p || h, !p);
  }, te = (h, p, b, A) => {
    if (h == null)
      s(
        p.el = l(p.children),
        b,
        A
      );
    else {
      const T = p.el = h.el;
      p.children !== h.children && f(T, p.children);
    }
  }, ne = (h, p, b, A) => {
    h == null ? s(
      p.el = a(p.children || ""),
      b,
      A
    ) : p.el = h.el;
  }, de = (h, p, b, A) => {
    [h.el, h.anchor] = q(
      h.children,
      p,
      b,
      A,
      h.el,
      h.anchor
    );
  }, me = ({ el: h, anchor: p }, b, A) => {
    let T;
    for (; h && h !== p; )
      T = w(h), s(h, b, A), h = T;
    s(p, b, A);
  }, U = ({ el: h, anchor: p }) => {
    let b;
    for (; h && h !== p; )
      b = w(h), i(h), h = b;
    i(p);
  }, ie = (h, p, b, A, T, E, N, L, P) => {
    p.type === "svg" ? N = "svg" : p.type === "math" && (N = "mathml"), h == null ? qe(
      p,
      b,
      A,
      T,
      E,
      N,
      L,
      P
    ) : pt(
      h,
      p,
      T,
      E,
      N,
      L,
      P
    );
  }, qe = (h, p, b, A, T, E, N, L) => {
    let P, C;
    const { props: j, shapeFlag: R, transition: M, dirs: V } = h;
    if (P = h.el = o(
      h.type,
      E,
      j && j.is,
      j
    ), R & 8 ? c(P, h.children) : R & 16 && $e(
      h.children,
      P,
      null,
      A,
      T,
      qs(h, E),
      N,
      L
    ), V && en(h, null, A, "created"), _e(P, h, h.scopeId, N, A), j) {
      for (const ae in j)
        ae !== "value" && !En(ae) && r(P, ae, null, j[ae], E, A);
      "value" in j && r(P, "value", null, j.value, E), (C = j.onVnodeBeforeMount) && xt(C, A, h);
    }
    V && en(h, null, A, "beforeMount");
    const Z = Qa(T, M);
    Z && M.beforeEnter(P), s(P, p, b), ((C = j && j.onVnodeMounted) || Z || V) && it(() => {
      C && xt(C, A, h), Z && M.enter(P), V && en(h, null, A, "mounted");
    }, T);
  }, _e = (h, p, b, A, T) => {
    if (b && S(h, b), A)
      for (let E = 0; E < A.length; E++)
        S(h, A[E]);
    if (T) {
      let E = T.subTree;
      if (p === E || Ko(E.type) && (E.ssContent === p || E.ssFallback === p)) {
        const N = T.vnode;
        _e(
          h,
          N,
          N.scopeId,
          N.slotScopeIds,
          T.parent
        );
      }
    }
  }, $e = (h, p, b, A, T, E, N, L, P = 0) => {
    for (let C = P; C < h.length; C++) {
      const j = h[C] = L ? jt(h[C]) : Tt(h[C]);
      F(
        null,
        j,
        p,
        b,
        A,
        T,
        E,
        N,
        L
      );
    }
  }, pt = (h, p, b, A, T, E, N) => {
    const L = p.el = h.el;
    let { patchFlag: P, dynamicChildren: C, dirs: j } = p;
    P |= h.patchFlag & 16;
    const R = h.props || ke, M = p.props || ke;
    let V;
    if (b && tn(b, !1), (V = M.onVnodeBeforeUpdate) && xt(V, b, p, h), j && en(p, h, b, "beforeUpdate"), b && tn(b, !0), (R.innerHTML && M.innerHTML == null || R.textContent && M.textContent == null) && c(L, ""), C ? Ze(
      h.dynamicChildren,
      C,
      L,
      b,
      A,
      qs(p, T),
      E
    ) : N || re(
      h,
      p,
      L,
      null,
      b,
      A,
      qs(p, T),
      E,
      !1
    ), P > 0) {
      if (P & 16)
        gt(L, R, M, b, T);
      else if (P & 2 && R.class !== M.class && r(L, "class", null, M.class, T), P & 4 && r(L, "style", R.style, M.style, T), P & 8) {
        const Z = p.dynamicProps;
        for (let ae = 0; ae < Z.length; ae++) {
          const ce = Z[ae], Ee = R[ce], ee = M[ce];
          (ee !== Ee || ce === "value") && r(L, ce, Ee, ee, T, b);
        }
      }
      P & 1 && h.children !== p.children && c(L, p.children);
    } else !N && C == null && gt(L, R, M, b, T);
    ((V = M.onVnodeUpdated) || j) && it(() => {
      V && xt(V, b, p, h), j && en(p, h, b, "updated");
    }, A);
  }, Ze = (h, p, b, A, T, E, N) => {
    for (let L = 0; L < p.length; L++) {
      const P = h[L], C = p[L], j = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        P.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (P.type === Be || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !wn(P, C) || // - In the case of a component, it could contain anything.
        P.shapeFlag & 70) ? d(P.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      F(
        P,
        C,
        j,
        null,
        A,
        T,
        E,
        N,
        !0
      );
    }
  }, gt = (h, p, b, A, T) => {
    if (p !== b) {
      if (p !== ke)
        for (const E in p)
          !En(E) && !(E in b) && r(
            h,
            E,
            p[E],
            null,
            T,
            A
          );
      for (const E in b) {
        if (En(E)) continue;
        const N = b[E], L = p[E];
        N !== L && E !== "value" && r(h, E, L, N, T, A);
      }
      "value" in b && r(h, "value", p.value, b.value, T);
    }
  }, bt = (h, p, b, A, T, E, N, L, P) => {
    const C = p.el = h ? h.el : l(""), j = p.anchor = h ? h.anchor : l("");
    let { patchFlag: R, dynamicChildren: M, slotScopeIds: V } = p;
    V && (L = L ? L.concat(V) : V), h == null ? (s(C, b, A), s(j, b, A), $e(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      b,
      j,
      T,
      E,
      N,
      L,
      P
    )) : R > 0 && R & 64 && M && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    h.dynamicChildren ? (Ze(
      h.dynamicChildren,
      M,
      b,
      T,
      E,
      N,
      L
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || T && p === T.subTree) && Ho(
      h,
      p,
      !0
      /* shallow */
    )) : re(
      h,
      p,
      b,
      j,
      T,
      E,
      N,
      L,
      P
    );
  }, Xe = (h, p, b, A, T, E, N, L, P) => {
    p.slotScopeIds = L, h == null ? p.shapeFlag & 512 ? T.ctx.activate(
      p,
      b,
      A,
      N,
      P
    ) : He(
      p,
      b,
      A,
      T,
      E,
      N,
      P
    ) : Mt(h, p, P);
  }, He = (h, p, b, A, T, E, N) => {
    const L = h.component = yc(
      h,
      A,
      T
    );
    if (Ao(h) && (L.ctx.renderer = tt), bc(L, !1, N), L.asyncDep) {
      if (T && T.registerDep(L, se, N), !h.el) {
        const P = L.subTree = Et(ln);
        ne(null, P, p, b);
      }
    } else
      se(
        L,
        h,
        p,
        b,
        T,
        E,
        N
      );
  }, Mt = (h, p, b) => {
    const A = p.component = h.component;
    if (lc(h, p, b))
      if (A.asyncDep && !A.asyncResolved) {
        X(A, p, b);
        return;
      } else
        A.next = p, A.update();
    else
      p.el = h.el, A.vnode = p;
  }, se = (h, p, b, A, T, E, N) => {
    const L = () => {
      if (h.isMounted) {
        let { next: R, bu: M, u: V, parent: Z, vnode: ae } = h;
        {
          const u = Uo(h);
          if (u) {
            R && (R.el = ae.el, X(h, R, N)), u.asyncDep.then(() => {
              h.isUnmounted || L();
            });
            return;
          }
        }
        let ce = R, Ee;
        tn(h, !1), R ? (R.el = ae.el, X(h, R, N)) : R = ae, M && Yn(M), (Ee = R.props && R.props.onVnodeBeforeUpdate) && xt(Ee, Z, R, ae), tn(h, !0);
        const ee = mr(h), Ue = h.subTree;
        h.subTree = ee, F(
          Ue,
          ee,
          // parent may have changed if it's in a teleport
          d(Ue.el),
          // anchor may have changed if it's in a fragment
          wt(Ue),
          h,
          T,
          E
        ), R.el = ee.el, ce === null && ac(h, ee.el), V && it(V, T), (Ee = R.props && R.props.onVnodeUpdated) && it(
          () => xt(Ee, Z, R, ae),
          T
        );
      } else {
        let R;
        const { el: M, props: V } = p, { bm: Z, m: ae, parent: ce, root: Ee, type: ee } = h, Ue = On(p);
        tn(h, !1), Z && Yn(Z), !Ue && (R = V && V.onVnodeBeforeMount) && xt(R, ce, p), tn(h, !0);
        {
          Ee.ce && Ee.ce._injectChildStyle(ee);
          const u = h.subTree = mr(h);
          F(
            null,
            u,
            b,
            A,
            h,
            T,
            E
          ), p.el = u.el;
        }
        if (ae && it(ae, T), !Ue && (R = V && V.onVnodeMounted)) {
          const u = p;
          it(
            () => xt(R, ce, u),
            T
          );
        }
        (p.shapeFlag & 256 || ce && On(ce.vnode) && ce.vnode.shapeFlag & 256) && h.a && it(h.a, T), h.isMounted = !0, p = b = A = null;
      }
    };
    h.scope.on();
    const P = h.effect = new so(L);
    h.scope.off();
    const C = h.update = P.run.bind(P), j = h.job = P.runIfDirty.bind(P);
    j.i = h, j.id = h.uid, P.scheduler = () => Ti(j), tn(h, !0), C();
  }, X = (h, p, b) => {
    p.component = h;
    const A = h.vnode.props;
    h.vnode = p, h.next = null, za(h, p.props, A, b), Ga(h, p.children, b), Yt(), cr(h), Jt();
  }, re = (h, p, b, A, T, E, N, L, P = !1) => {
    const C = h && h.children, j = h ? h.shapeFlag : 0, R = p.children, { patchFlag: M, shapeFlag: V } = p;
    if (M > 0) {
      if (M & 128) {
        Te(
          C,
          R,
          b,
          A,
          T,
          E,
          N,
          L,
          P
        );
        return;
      } else if (M & 256) {
        D(
          C,
          R,
          b,
          A,
          T,
          E,
          N,
          L,
          P
        );
        return;
      }
    }
    V & 8 ? (j & 16 && et(C, T, E), R !== C && c(b, R)) : j & 16 ? V & 16 ? Te(
      C,
      R,
      b,
      A,
      T,
      E,
      N,
      L,
      P
    ) : et(C, T, E, !0) : (j & 8 && c(b, ""), V & 16 && $e(
      R,
      b,
      A,
      T,
      E,
      N,
      L,
      P
    ));
  }, D = (h, p, b, A, T, E, N, L, P) => {
    h = h || dn, p = p || dn;
    const C = h.length, j = p.length, R = Math.min(C, j);
    let M;
    for (M = 0; M < R; M++) {
      const V = p[M] = P ? jt(p[M]) : Tt(p[M]);
      F(
        h[M],
        V,
        b,
        null,
        T,
        E,
        N,
        L,
        P
      );
    }
    C > j ? et(
      h,
      T,
      E,
      !0,
      !1,
      R
    ) : $e(
      p,
      b,
      A,
      T,
      E,
      N,
      L,
      P,
      R
    );
  }, Te = (h, p, b, A, T, E, N, L, P) => {
    let C = 0;
    const j = p.length;
    let R = h.length - 1, M = j - 1;
    for (; C <= R && C <= M; ) {
      const V = h[C], Z = p[C] = P ? jt(p[C]) : Tt(p[C]);
      if (wn(V, Z))
        F(
          V,
          Z,
          b,
          null,
          T,
          E,
          N,
          L,
          P
        );
      else
        break;
      C++;
    }
    for (; C <= R && C <= M; ) {
      const V = h[R], Z = p[M] = P ? jt(p[M]) : Tt(p[M]);
      if (wn(V, Z))
        F(
          V,
          Z,
          b,
          null,
          T,
          E,
          N,
          L,
          P
        );
      else
        break;
      R--, M--;
    }
    if (C > R) {
      if (C <= M) {
        const V = M + 1, Z = V < j ? p[V].el : A;
        for (; C <= M; )
          F(
            null,
            p[C] = P ? jt(p[C]) : Tt(p[C]),
            b,
            Z,
            T,
            E,
            N,
            L,
            P
          ), C++;
      }
    } else if (C > M)
      for (; C <= R; )
        Ae(h[C], T, E, !0), C++;
    else {
      const V = C, Z = C, ae = /* @__PURE__ */ new Map();
      for (C = Z; C <= M; C++) {
        const y = p[C] = P ? jt(p[C]) : Tt(p[C]);
        y.key != null && ae.set(y.key, C);
      }
      let ce, Ee = 0;
      const ee = M - Z + 1;
      let Ue = !1, u = 0;
      const m = new Array(ee);
      for (C = 0; C < ee; C++) m[C] = 0;
      for (C = V; C <= R; C++) {
        const y = h[C];
        if (Ee >= ee) {
          Ae(y, T, E, !0);
          continue;
        }
        let I;
        if (y.key != null)
          I = ae.get(y.key);
        else
          for (ce = Z; ce <= M; ce++)
            if (m[ce - Z] === 0 && wn(y, p[ce])) {
              I = ce;
              break;
            }
        I === void 0 ? Ae(y, T, E, !0) : (m[I - Z] = C + 1, I >= u ? u = I : Ue = !0, F(
          y,
          p[I],
          b,
          null,
          T,
          E,
          N,
          L,
          P
        ), Ee++);
      }
      const x = Ue ? Xa(m) : dn;
      for (ce = x.length - 1, C = ee - 1; C >= 0; C--) {
        const y = Z + C, I = p[y], z = y + 1 < j ? p[y + 1].el : A;
        m[C] === 0 ? F(
          null,
          I,
          b,
          z,
          T,
          E,
          N,
          L,
          P
        ) : Ue && (ce < 0 || C !== x[ce] ? W(I, b, z, 2) : ce--);
      }
    }
  }, W = (h, p, b, A, T = null) => {
    const { el: E, type: N, transition: L, children: P, shapeFlag: C } = h;
    if (C & 6) {
      W(h.component.subTree, p, b, A);
      return;
    }
    if (C & 128) {
      h.suspense.move(p, b, A);
      return;
    }
    if (C & 64) {
      N.move(h, p, b, tt);
      return;
    }
    if (N === Be) {
      s(E, p, b);
      for (let R = 0; R < P.length; R++)
        W(P[R], p, b, A);
      s(h.anchor, p, b);
      return;
    }
    if (N === Xn) {
      me(h, p, b);
      return;
    }
    if (A !== 2 && C & 1 && L)
      if (A === 0)
        L.beforeEnter(E), s(E, p, b), it(() => L.enter(E), T);
      else {
        const { leave: R, delayLeave: M, afterLeave: V } = L, Z = () => s(E, p, b), ae = () => {
          R(E, () => {
            Z(), V && V();
          });
        };
        M ? M(E, Z, ae) : ae();
      }
    else
      s(E, p, b);
  }, Ae = (h, p, b, A = !1, T = !1) => {
    const {
      type: E,
      props: N,
      ref: L,
      children: P,
      dynamicChildren: C,
      shapeFlag: j,
      patchFlag: R,
      dirs: M,
      cacheIndex: V
    } = h;
    if (R === -2 && (T = !1), L != null && cs(L, null, b, h, !0), V != null && (p.renderCache[V] = void 0), j & 256) {
      p.ctx.deactivate(h);
      return;
    }
    const Z = j & 1 && M, ae = !On(h);
    let ce;
    if (ae && (ce = N && N.onVnodeBeforeUnmount) && xt(ce, p, h), j & 6)
      lt(h.component, b, A);
    else {
      if (j & 128) {
        h.suspense.unmount(b, A);
        return;
      }
      Z && en(h, null, p, "beforeUnmount"), j & 64 ? h.type.remove(
        h,
        p,
        b,
        tt,
        A
      ) : C && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !C.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (E !== Be || R > 0 && R & 64) ? et(
        C,
        p,
        b,
        !1,
        !0
      ) : (E === Be && R & 384 || !T && j & 16) && et(P, p, b), A && vt(h);
    }
    (ae && (ce = N && N.onVnodeUnmounted) || Z) && it(() => {
      ce && xt(ce, p, h), Z && en(h, null, p, "unmounted");
    }, b);
  }, vt = (h) => {
    const { type: p, el: b, anchor: A, transition: T } = h;
    if (p === Be) {
      Dt(b, A);
      return;
    }
    if (p === Xn) {
      U(h);
      return;
    }
    const E = () => {
      i(b), T && !T.persisted && T.afterLeave && T.afterLeave();
    };
    if (h.shapeFlag & 1 && T && !T.persisted) {
      const { leave: N, delayLeave: L } = T, P = () => N(b, E);
      L ? L(h.el, E, P) : P();
    } else
      E();
  }, Dt = (h, p) => {
    let b;
    for (; h !== p; )
      b = w(h), i(h), h = b;
    i(p);
  }, lt = (h, p, b) => {
    const { bum: A, scope: T, job: E, subTree: N, um: L, m: P, a: C } = h;
    gr(P), gr(C), A && Yn(A), T.stop(), E && (E.flags |= 8, Ae(N, h, p, b)), L && it(L, p), it(() => {
      h.isUnmounted = !0;
    }, p), p && p.pendingBranch && !p.isUnmounted && h.asyncDep && !h.asyncResolved && h.suspenseId === p.pendingId && (p.deps--, p.deps === 0 && p.resolve());
  }, et = (h, p, b, A = !1, T = !1, E = 0) => {
    for (let N = E; N < h.length; N++)
      Ae(h[N], p, b, A, T);
  }, wt = (h) => {
    if (h.shapeFlag & 6)
      return wt(h.component.subTree);
    if (h.shapeFlag & 128)
      return h.suspense.next();
    const p = w(h.anchor || h.el), b = p && p[va];
    return b ? w(b) : p;
  };
  let at = !1;
  const Lt = (h, p, b) => {
    h == null ? p._vnode && Ae(p._vnode, null, null, !0) : F(
      p._vnode || null,
      h,
      p,
      null,
      null,
      null,
      b
    ), p._vnode = h, at || (at = !0, cr(), xo(), at = !1);
  }, tt = {
    p: F,
    um: Ae,
    m: W,
    r: vt,
    mt: He,
    mc: $e,
    pc: re,
    pbc: Ze,
    n: wt,
    o: t
  };
  return {
    render: Lt,
    hydrate: void 0,
    createApp: Ha(Lt)
  };
}
function qs({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function tn({ effect: t, job: e }, n) {
  n ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function Qa(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Ho(t, e, n = !1) {
  const s = t.children, i = e.children;
  if (Y(s) && Y(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      let l = i[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[r] = jt(i[r]), l.el = o.el), !n && l.patchFlag !== -2 && Ho(o, l)), l.type === Ss && (l.el = o.el);
    }
}
function Xa(t) {
  const e = t.slice(), n = [0];
  let s, i, r, o, l;
  const a = t.length;
  for (s = 0; s < a; s++) {
    const f = t[s];
    if (f !== 0) {
      if (i = n[n.length - 1], t[i] < f) {
        e[s] = i, n.push(s);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        l = r + o >> 1, t[n[l]] < f ? r = l + 1 : o = l;
      f < t[n[r]] && (r > 0 && (e[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; )
    n[r] = o, o = e[o];
  return n;
}
function Uo(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : Uo(e);
}
function gr(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
const ec = Symbol.for("v-scx"), tc = () => Jn(ec);
function Qn(t, e, n) {
  return jo(t, e, n);
}
function jo(t, e, n = ke) {
  const { immediate: s, deep: i, flush: r, once: o } = n, l = Ke({}, n), a = e && s || !e && r !== "post";
  let f;
  if (qn) {
    if (r === "sync") {
      const S = tc();
      f = S.__watcherHandles || (S.__watcherHandles = []);
    } else if (!a) {
      const S = () => {
      };
      return S.stop = At, S.resume = At, S.pause = At, S;
    }
  }
  const c = Je;
  l.call = (S, q, F) => It(S, c, q, F);
  let d = !1;
  r === "post" ? l.scheduler = (S) => {
    it(S, c && c.suspense);
  } : r !== "sync" && (d = !0, l.scheduler = (S, q) => {
    q ? S() : Ti(S);
  }), l.augmentJob = (S) => {
    e && (S.flags |= 4), d && (S.flags |= 2, c && (S.id = c.uid, S.i = c));
  };
  const w = ga(t, e, l);
  return qn && (f ? f.push(w) : a && w()), w;
}
function nc(t, e, n) {
  const s = this.proxy, i = Me(t) ? t.includes(".") ? zo(s, t) : () => s[t] : t.bind(s, s);
  let r;
  Q(e) ? r = e : (r = e.handler, n = e);
  const o = Hn(this), l = jo(i, r.bind(s), n);
  return o(), l;
}
function zo(t, e) {
  const n = e.split(".");
  return () => {
    let s = t;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
const sc = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${Kt(e)}Modifiers`] || t[`${Gt(e)}Modifiers`];
function ic(t, e, ...n) {
  if (t.isUnmounted) return;
  const s = t.vnode.props || ke;
  let i = n;
  const r = e.startsWith("update:"), o = r && sc(s, e.slice(7));
  o && (o.trim && (i = n.map((c) => Me(c) ? c.trim() : c)), o.number && (i = n.map(Gs)));
  let l, a = s[l = $s(e)] || // also try camelCase event handler (#2249)
  s[l = $s(Kt(e))];
  !a && r && (a = s[l = $s(Gt(e))]), a && It(
    a,
    t,
    6,
    i
  );
  const f = s[l + "Once"];
  if (f) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[l])
      return;
    t.emitted[l] = !0, It(
      f,
      t,
      6,
      i
    );
  }
}
function Wo(t, e, n = !1) {
  const s = e.emitsCache, i = s.get(t);
  if (i !== void 0)
    return i;
  const r = t.emits;
  let o = {}, l = !1;
  if (!Q(t)) {
    const a = (f) => {
      const c = Wo(f, e, !0);
      c && (l = !0, Ke(o, c));
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  return !r && !l ? (Pe(t) && s.set(t, null), null) : (Y(r) ? r.forEach((a) => o[a] = null) : Ke(o, r), Pe(t) && s.set(t, o), o);
}
function xs(t, e) {
  return !t || !ms(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), be(t, e[0].toLowerCase() + e.slice(1)) || be(t, Gt(e)) || be(t, e));
}
function mr(t) {
  const {
    type: e,
    vnode: n,
    proxy: s,
    withProxy: i,
    propsOptions: [r],
    slots: o,
    attrs: l,
    emit: a,
    render: f,
    renderCache: c,
    props: d,
    data: w,
    setupState: S,
    ctx: q,
    inheritAttrs: F
  } = t, te = as(t);
  let ne, de;
  try {
    if (n.shapeFlag & 4) {
      const U = i || s, ie = U;
      ne = Tt(
        f.call(
          ie,
          U,
          c,
          d,
          S,
          w,
          q
        )
      ), de = l;
    } else {
      const U = e;
      ne = Tt(
        U.length > 1 ? U(
          d,
          { attrs: l, slots: o, emit: a }
        ) : U(
          d,
          null
        )
      ), de = e.props ? l : rc(l);
    }
  } catch (U) {
    Pn.length = 0, ws(U, t, 1), ne = Et(ln);
  }
  let me = ne;
  if (de && F !== !1) {
    const U = Object.keys(de), { shapeFlag: ie } = me;
    U.length && ie & 7 && (r && U.some(gi) && (de = oc(
      de,
      r
    )), me = yn(me, de, !1, !0));
  }
  return n.dirs && (me = yn(me, null, !1, !0), me.dirs = me.dirs ? me.dirs.concat(n.dirs) : n.dirs), n.transition && Ai(me, n.transition), ne = me, as(te), ne;
}
const rc = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || ms(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, oc = (t, e) => {
  const n = {};
  for (const s in t)
    (!gi(s) || !(s.slice(9) in e)) && (n[s] = t[s]);
  return n;
};
function lc(t, e, n) {
  const { props: s, children: i, component: r } = t, { props: o, children: l, patchFlag: a } = e, f = r.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? _r(s, o, f) : !!o;
    if (a & 8) {
      const c = e.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        const w = c[d];
        if (o[w] !== s[w] && !xs(f, w))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? _r(s, o, f) : !0 : !!o;
  return !1;
}
function _r(t, e, n) {
  const s = Object.keys(e);
  if (s.length !== Object.keys(t).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (e[r] !== t[r] && !xs(n, r))
      return !0;
  }
  return !1;
}
function ac({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const s = e.subTree;
    if (s.suspense && s.suspense.activeBranch === t && (s.el = t.el), s === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const Ko = (t) => t.__isSuspense;
function cc(t, e) {
  e && e.pendingBranch ? Y(t) ? e.effects.push(...t) : e.effects.push(t) : ya(t);
}
const Be = Symbol.for("v-fgt"), Ss = Symbol.for("v-txt"), ln = Symbol.for("v-cmt"), Xn = Symbol.for("v-stc"), Pn = [];
let ot = null;
function $(t = !1) {
  Pn.push(ot = t ? null : []);
}
function uc() {
  Pn.pop(), ot = Pn[Pn.length - 1] || null;
}
let Dn = 1;
function yr(t, e = !1) {
  Dn += t, t < 0 && ot && e && (ot.hasOnce = !0);
}
function Zo(t) {
  return t.dynamicChildren = Dn > 0 ? ot || dn : null, uc(), Dn > 0 && ot && ot.push(t), t;
}
function B(t, e, n, s, i, r) {
  return Zo(
    k(
      t,
      e,
      n,
      s,
      i,
      r,
      !0
    )
  );
}
function fc(t, e, n, s, i) {
  return Zo(
    Et(
      t,
      e,
      n,
      s,
      i,
      !0
    )
  );
}
function Go(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function wn(t, e) {
  return t.type === e.type && t.key === e.key;
}
const Yo = ({ key: t }) => t ?? null, es = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? Me(t) || We(t) || Q(t) ? { i: ut, r: t, k: e, f: !!n } : t : null);
function k(t, e = null, n = null, s = 0, i = null, r = t === Be ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Yo(e),
    ref: e && es(e),
    scopeId: Co,
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
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: ut
  };
  return l ? (Ii(a, n), r & 128 && t.normalize(a)) : n && (a.shapeFlag |= Me(n) ? 8 : 16), Dn > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ot && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && ot.push(a), a;
}
const Et = hc;
function hc(t, e = null, n = null, s = 0, i = null, r = !1) {
  if ((!t || t === $a) && (t = ln), Go(t)) {
    const l = yn(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && Ii(l, n), Dn > 0 && !r && ot && (l.shapeFlag & 6 ? ot[ot.indexOf(t)] = l : ot.push(l)), l.patchFlag = -2, l;
  }
  if (xc(t) && (t = t.__vccOpts), e) {
    e = dc(e);
    let { class: l, style: a } = e;
    l && !Me(l) && (e.class = Ie(l)), Pe(a) && (Ci(a) && !Y(a) && (a = Ke({}, a)), e.style = Se(a));
  }
  const o = Me(t) ? 1 : Ko(t) ? 128 : wa(t) ? 64 : Pe(t) ? 4 : Q(t) ? 2 : 0;
  return k(
    t,
    e,
    n,
    s,
    i,
    o,
    r,
    !0
  );
}
function dc(t) {
  return t ? Ci(t) || Fo(t) ? Ke({}, t) : t : null;
}
function yn(t, e, n = !1, s = !1) {
  const { props: i, ref: r, patchFlag: o, children: l, transition: a } = t, f = e ? gc(i || {}, e) : i, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: f,
    key: f && Yo(f),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? Y(r) ? r.concat(es(e)) : [r, es(e)] : es(e)
    ) : r,
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
    patchFlag: e && t.type !== Be ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: t.ssContent && yn(t.ssContent),
    ssFallback: t.ssFallback && yn(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return a && s && Ai(
    c,
    a.clone(c)
  ), c;
}
function mt(t = " ", e = 0) {
  return Et(Ss, null, t, e);
}
function pc(t, e) {
  const n = Et(Xn, null, t);
  return n.staticCount = e, n;
}
function le(t = "", e = !1) {
  return e ? ($(), fc(ln, null, t)) : Et(ln, null, t);
}
function Tt(t) {
  return t == null || typeof t == "boolean" ? Et(ln) : Y(t) ? Et(
    Be,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : Go(t) ? jt(t) : Et(Ss, null, String(t));
}
function jt(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : yn(t);
}
function Ii(t, e) {
  let n = 0;
  const { shapeFlag: s } = t;
  if (e == null)
    e = null;
  else if (Y(e))
    n = 16;
  else if (typeof e == "object")
    if (s & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), Ii(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !Fo(e) ? e._ctx = ut : i === 3 && ut && (ut.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else Q(e) ? (e = { default: e, _ctx: ut }, n = 32) : (e = String(e), s & 64 ? (n = 16, e = [mt(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function gc(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    for (const i in s)
      if (i === "class")
        e.class !== s.class && (e.class = Ie([e.class, s.class]));
      else if (i === "style")
        e.style = Se([e.style, s.style]);
      else if (ms(i)) {
        const r = e[i], o = s[i];
        o && r !== o && !(Y(r) && r.includes(o)) && (e[i] = r ? [].concat(r, o) : o);
      } else i !== "" && (e[i] = s[i]);
  }
  return e;
}
function xt(t, e, n, s = null) {
  It(t, e, 7, [
    n,
    s
  ]);
}
const mc = Lo();
let _c = 0;
function yc(t, e, n) {
  const s = t.type, i = (e ? e.appContext : t.appContext) || mc, r = {
    uid: _c++,
    vnode: t,
    type: s,
    parent: e,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Vl(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(i.provides),
    ids: e ? e.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: No(s, i),
    emitsOptions: Wo(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ke,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: ke,
    data: ke,
    props: ke,
    attrs: ke,
    slots: ke,
    refs: ke,
    setupState: ke,
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
  return r.ctx = { _: r }, r.root = e ? e.root : r, r.emit = ic.bind(null, r), t.ce && t.ce(r), r;
}
let Je = null, fs, ri;
{
  const t = bs(), e = (n, s) => {
    let i;
    return (i = t[n]) || (i = t[n] = []), i.push(s), (r) => {
      i.length > 1 ? i.forEach((o) => o(r)) : i[0](r);
    };
  };
  fs = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Je = n
  ), ri = e(
    "__VUE_SSR_SETTERS__",
    (n) => qn = n
  );
}
const Hn = (t) => {
  const e = Je;
  return fs(t), t.scope.on(), () => {
    t.scope.off(), fs(e);
  };
}, br = () => {
  Je && Je.scope.off(), fs(null);
};
function Jo(t) {
  return t.vnode.shapeFlag & 4;
}
let qn = !1;
function bc(t, e = !1, n = !1) {
  e && ri(e);
  const { props: s, children: i } = t.vnode, r = Jo(t);
  ja(t, s, r, e), Za(t, i, n);
  const o = r ? vc(t, e) : void 0;
  return e && ri(!1), o;
}
function vc(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, Fa);
  const { setup: s } = n;
  if (s) {
    Yt();
    const i = t.setupContext = s.length > 1 ? kc(t) : null, r = Hn(t), o = Vn(
      s,
      t,
      0,
      [
        t.props,
        i
      ]
    ), l = Gr(o);
    if (Jt(), r(), (l || t.sp) && !On(t) && To(t), l) {
      if (o.then(br, br), e)
        return o.then((a) => {
          vr(t, a);
        }).catch((a) => {
          ws(a, t, 0);
        });
      t.asyncDep = o;
    } else
      vr(t, o);
  } else
    Qo(t);
}
function vr(t, e, n) {
  Q(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : Pe(e) && (t.setupState = bo(e)), Qo(t);
}
function Qo(t, e, n) {
  const s = t.type;
  t.render || (t.render = s.render || At);
  {
    const i = Hn(t);
    Yt();
    try {
      Ba(t);
    } finally {
      Jt(), i();
    }
  }
}
const wc = {
  get(t, e) {
    return je(t, "get", ""), t[e];
  }
};
function kc(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    attrs: new Proxy(t.attrs, wc),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function Cs(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(bo(aa(t.exposed)), {
    get(e, n) {
      if (n in e)
        return e[n];
      if (n in Ln)
        return Ln[n](t);
    },
    has(e, n) {
      return n in e || n in Ln;
    }
  })) : t.proxy;
}
function xc(t) {
  return Q(t) && "__vccOpts" in t;
}
const De = (t, e) => da(t, e, qn), Sc = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let oi;
const wr = typeof window < "u" && window.trustedTypes;
if (wr)
  try {
    oi = /* @__PURE__ */ wr.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const Xo = oi ? (t) => oi.createHTML(t) : (t) => t, Cc = "http://www.w3.org/2000/svg", Tc = "http://www.w3.org/1998/Math/MathML", $t = typeof document < "u" ? document : null, kr = $t && /* @__PURE__ */ $t.createElement("template"), Ac = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, s) => {
    const i = e === "svg" ? $t.createElementNS(Cc, t) : e === "mathml" ? $t.createElementNS(Tc, t) : n ? $t.createElement(t, { is: n }) : $t.createElement(t);
    return t === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (t) => $t.createTextNode(t),
  createComment: (t) => $t.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => $t.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, n, s, i, r) {
    const o = n ? n.previousSibling : e.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; e.insertBefore(i.cloneNode(!0), n), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      kr.innerHTML = Xo(
        s === "svg" ? `<svg>${t}</svg>` : s === "mathml" ? `<math>${t}</math>` : t
      );
      const l = kr.content;
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
}, Ec = Symbol("_vtc");
function Rc(t, e, n) {
  const s = t[Ec];
  s && (e = (e ? [e, ...s] : [...s]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const xr = Symbol("_vod"), Ic = Symbol("_vsh"), Oc = Symbol(""), Lc = /(^|;)\s*display\s*:/;
function Pc(t, e, n) {
  const s = t.style, i = Me(n);
  let r = !1;
  if (n && !i) {
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
      o === "display" && (r = !0), ts(s, o, n[o]);
  } else if (i) {
    if (e !== n) {
      const o = s[Oc];
      o && (n += ";" + o), s.cssText = n, r = Lc.test(n);
    }
  } else e && t.removeAttribute("style");
  xr in t && (t[xr] = r ? s.display : "", t[Ic] && (s.display = "none"));
}
const Sr = /\s*!important$/;
function ts(t, e, n) {
  if (Y(n))
    n.forEach((s) => ts(t, e, s));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const s = $c(t, e);
    Sr.test(n) ? t.setProperty(
      Gt(s),
      n.replace(Sr, ""),
      "important"
    ) : t[s] = n;
  }
}
const Cr = ["Webkit", "Moz", "ms"], Vs = {};
function $c(t, e) {
  const n = Vs[e];
  if (n)
    return n;
  let s = Kt(e);
  if (s !== "filter" && s in t)
    return Vs[e] = s;
  s = Qr(s);
  for (let i = 0; i < Cr.length; i++) {
    const r = Cr[i] + s;
    if (r in t)
      return Vs[e] = r;
  }
  return e;
}
const Tr = "http://www.w3.org/1999/xlink";
function Ar(t, e, n, s, i, r = ql(e)) {
  s && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(Tr, e.slice(6, e.length)) : t.setAttributeNS(Tr, e, n) : n == null || r && !eo(n) ? t.removeAttribute(e) : t.setAttribute(
    e,
    r ? "" : Zt(n) ? String(n) : n
  );
}
function Er(t, e, n, s, i) {
  if (e === "innerHTML" || e === "textContent") {
    n != null && (t[e] = e === "innerHTML" ? Xo(n) : n);
    return;
  }
  const r = t.tagName;
  if (e === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? t.getAttribute("value") || "" : t.value, a = n == null ? (
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
    l === "boolean" ? n = eo(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  o && t.removeAttribute(i || e);
}
function hn(t, e, n, s) {
  t.addEventListener(e, n, s);
}
function Fc(t, e, n, s) {
  t.removeEventListener(e, n, s);
}
const Rr = Symbol("_vei");
function Bc(t, e, n, s, i = null) {
  const r = t[Rr] || (t[Rr] = {}), o = r[e];
  if (s && o)
    o.value = s;
  else {
    const [l, a] = Nc(e);
    if (s) {
      const f = r[e] = qc(
        s,
        i
      );
      hn(t, l, f, a);
    } else o && (Fc(t, l, o, a), r[e] = void 0);
  }
}
const Ir = /(?:Once|Passive|Capture)$/;
function Nc(t) {
  let e;
  if (Ir.test(t)) {
    e = {};
    let s;
    for (; s = t.match(Ir); )
      t = t.slice(0, t.length - s[0].length), e[s[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : Gt(t.slice(2)), e];
}
let Hs = 0;
const Mc = /* @__PURE__ */ Promise.resolve(), Dc = () => Hs || (Mc.then(() => Hs = 0), Hs = Date.now());
function qc(t, e) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    It(
      Vc(s, n.value),
      e,
      5,
      [s]
    );
  };
  return n.value = t, n.attached = Dc(), n;
}
function Vc(t, e) {
  if (Y(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map(
      (s) => (i) => !i._stopped && s && s(i)
    );
  } else
    return e;
}
const Or = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, Hc = (t, e, n, s, i, r) => {
  const o = i === "svg";
  e === "class" ? Rc(t, s, o) : e === "style" ? Pc(t, n, s) : ms(e) ? gi(e) || Bc(t, e, n, s, r) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Uc(t, e, s, o)) ? (Er(t, e, s), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && Ar(t, e, s, o, r, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && (/[A-Z]/.test(e) || !Me(s)) ? Er(t, Kt(e), s, r, e) : (e === "true-value" ? t._trueValue = s : e === "false-value" && (t._falseValue = s), Ar(t, e, s, o));
};
function Uc(t, e, n, s) {
  if (s)
    return !!(e === "innerHTML" || e === "textContent" || e in t && Or(e) && Q(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Or(e) && Me(n) ? !1 : e in t;
}
const Lr = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return Y(e) ? (n) => Yn(e, n) : e;
};
function jc(t) {
  t.target.composing = !0;
}
function Pr(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const Us = Symbol("_assign"), nn = {
  created(t, { modifiers: { lazy: e, trim: n, number: s } }, i) {
    t[Us] = Lr(i);
    const r = s || i.props && i.props.type === "number";
    hn(t, e ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let l = t.value;
      n && (l = l.trim()), r && (l = Gs(l)), t[Us](l);
    }), n && hn(t, "change", () => {
      t.value = t.value.trim();
    }), e || (hn(t, "compositionstart", jc), hn(t, "compositionend", Pr), hn(t, "change", Pr));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: n, modifiers: { lazy: s, trim: i, number: r } }, o) {
    if (t[Us] = Lr(o), t.composing) return;
    const l = (r || t.type === "number") && !/^0\d/.test(t.value) ? Gs(t.value) : t.value, a = e ?? "";
    l !== a && (document.activeElement === t && t.type !== "range" && (s && e === n || i && t.value.trim() === a) || (t.value = a));
  }
}, zc = ["ctrl", "shift", "alt", "meta"], Wc = {
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
  exact: (t, e) => zc.some((n) => t[`${n}Key`] && !e.includes(n))
}, $r = (t, e) => {
  const n = t._withMods || (t._withMods = {}), s = e.join(".");
  return n[s] || (n[s] = (i, ...r) => {
    for (let o = 0; o < e.length; o++) {
      const l = Wc[e[o]];
      if (l && l(i, e)) return;
    }
    return t(i, ...r);
  });
}, Kc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Fr = (t, e) => {
  const n = t._withKeys || (t._withKeys = {}), s = e.join(".");
  return n[s] || (n[s] = (i) => {
    if (!("key" in i))
      return;
    const r = Gt(i.key);
    if (e.some(
      (o) => o === r || Kc[o] === r
    ))
      return t(i);
  });
}, Zc = /* @__PURE__ */ Ke({ patchProp: Hc }, Ac);
let Br;
function Gc() {
  return Br || (Br = Ya(Zc));
}
const Yc = (...t) => {
  const e = Gc().createApp(...t), { mount: n } = e;
  return e.mount = (s) => {
    const i = Qc(s);
    if (!i) return;
    const r = e._component;
    !Q(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = n(i, !1, Jc(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, e;
};
function Jc(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function Qc(t) {
  return Me(t) ? document.querySelector(t) : t;
}
const Ht = (t) => {
  const e = t.replace("#", ""), n = parseInt(e.substr(0, 2), 16), s = parseInt(e.substr(2, 2), 16), i = parseInt(e.substr(4, 2), 16);
  return (n * 299 + s * 587 + i * 114) / 1e3 < 128;
}, Xc = (t, e) => {
  const n = t.replace("#", ""), s = parseInt(n.substr(0, 2), 16), i = parseInt(n.substr(2, 2), 16), r = parseInt(n.substr(4, 2), 16), o = Ht(t), l = o ? Math.min(255, s + e) : Math.max(0, s - e), a = o ? Math.min(255, i + e) : Math.max(0, i - e), f = o ? Math.min(255, r + e) : Math.max(0, r - e);
  return `#${l.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}${f.toString(16).padStart(2, "0")}`;
}, kn = (t) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t), eu = (t) => {
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
function Oi() {
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
let cn = Oi();
function el(t) {
  cn = t;
}
const $n = { exec: () => null };
function ve(t, e = "") {
  let n = typeof t == "string" ? t : t.source;
  const s = {
    replace: (i, r) => {
      let o = typeof r == "string" ? r : r.source;
      return o = o.replace(Qe.caret, "$1"), n = n.replace(i, o), s;
    },
    getRegex: () => new RegExp(n, e)
  };
  return s;
}
const Qe = {
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
}, tu = /^(?:[ \t]*(?:\n|$))+/, nu = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, su = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Un = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, iu = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, tl = /(?:[*+-]|\d{1,9}[.)])/, nl = ve(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, tl).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), Li = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, ru = /^[^\n]+/, Pi = /(?!\s*\])(?:\\.|[^\[\]\\])+/, ou = ve(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Pi).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), lu = ve(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, tl).getRegex(), Ts = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", $i = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, au = ve("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", $i).replace("tag", Ts).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), sl = ve(Li).replace("hr", Un).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ts).getRegex(), cu = ve(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", sl).getRegex(), Fi = {
  blockquote: cu,
  code: nu,
  def: ou,
  fences: su,
  heading: iu,
  hr: Un,
  html: au,
  lheading: nl,
  list: lu,
  newline: tu,
  paragraph: sl,
  table: $n,
  text: ru
}, Nr = ve("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Un).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ts).getRegex(), uu = {
  ...Fi,
  table: Nr,
  paragraph: ve(Li).replace("hr", Un).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Nr).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ts).getRegex()
}, fu = {
  ...Fi,
  html: ve(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", $i).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: $n,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: ve(Li).replace("hr", Un).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", nl).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, hu = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, du = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, il = /^( {2,}|\\)\n(?!\s*$)/, pu = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, As = /[\p{P}\p{S}]/u, Bi = /[\s\p{P}\p{S}]/u, rl = /[^\s\p{P}\p{S}]/u, gu = ve(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Bi).getRegex(), ol = /(?!~)[\p{P}\p{S}]/u, mu = /(?!~)[\s\p{P}\p{S}]/u, _u = /(?:[^\s\p{P}\p{S}]|~)/u, yu = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, ll = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, bu = ve(ll, "u").replace(/punct/g, As).getRegex(), vu = ve(ll, "u").replace(/punct/g, ol).getRegex(), al = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", wu = ve(al, "gu").replace(/notPunctSpace/g, rl).replace(/punctSpace/g, Bi).replace(/punct/g, As).getRegex(), ku = ve(al, "gu").replace(/notPunctSpace/g, _u).replace(/punctSpace/g, mu).replace(/punct/g, ol).getRegex(), xu = ve("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, rl).replace(/punctSpace/g, Bi).replace(/punct/g, As).getRegex(), Su = ve(/\\(punct)/, "gu").replace(/punct/g, As).getRegex(), Cu = ve(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Tu = ve($i).replace("(?:-->|$)", "-->").getRegex(), Au = ve("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Tu).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), hs = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, Eu = ve(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", hs).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), cl = ve(/^!?\[(label)\]\[(ref)\]/).replace("label", hs).replace("ref", Pi).getRegex(), ul = ve(/^!?\[(ref)\](?:\[\])?/).replace("ref", Pi).getRegex(), Ru = ve("reflink|nolink(?!\\()", "g").replace("reflink", cl).replace("nolink", ul).getRegex(), Ni = {
  _backpedal: $n,
  // only used for GFM url
  anyPunctuation: Su,
  autolink: Cu,
  blockSkip: yu,
  br: il,
  code: du,
  del: $n,
  emStrongLDelim: bu,
  emStrongRDelimAst: wu,
  emStrongRDelimUnd: xu,
  escape: hu,
  link: Eu,
  nolink: ul,
  punctuation: gu,
  reflink: cl,
  reflinkSearch: Ru,
  tag: Au,
  text: pu,
  url: $n
}, Iu = {
  ...Ni,
  link: ve(/^!?\[(label)\]\((.*?)\)/).replace("label", hs).getRegex(),
  reflink: ve(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", hs).getRegex()
}, li = {
  ...Ni,
  emStrongRDelimAst: ku,
  emStrongLDelim: vu,
  url: ve(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Ou = {
  ...li,
  br: ve(il).replace("{2,}", "*").getRegex(),
  text: ve(li.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Kn = {
  normal: Fi,
  gfm: uu,
  pedantic: fu
}, xn = {
  normal: Ni,
  gfm: li,
  breaks: Ou,
  pedantic: Iu
}, Lu = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Mr = (t) => Lu[t];
function St(t, e) {
  if (e) {
    if (Qe.escapeTest.test(t))
      return t.replace(Qe.escapeReplace, Mr);
  } else if (Qe.escapeTestNoEncode.test(t))
    return t.replace(Qe.escapeReplaceNoEncode, Mr);
  return t;
}
function Dr(t) {
  try {
    t = encodeURI(t).replace(Qe.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function qr(t, e) {
  var r;
  const n = t.replace(Qe.findPipe, (o, l, a) => {
    let f = !1, c = l;
    for (; --c >= 0 && a[c] === "\\"; )
      f = !f;
    return f ? "|" : " |";
  }), s = n.split(Qe.splitPipe);
  let i = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((r = s.at(-1)) != null && r.trim()) && s.pop(), e)
    if (s.length > e)
      s.splice(e);
    else
      for (; s.length < e; )
        s.push("");
  for (; i < s.length; i++)
    s[i] = s[i].trim().replace(Qe.slashPipe, "|");
  return s;
}
function Sn(t, e, n) {
  const s = t.length;
  if (s === 0)
    return "";
  let i = 0;
  for (; i < s && t.charAt(s - i - 1) === e; )
    i++;
  return t.slice(0, s - i);
}
function Pu(t, e) {
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
  return -1;
}
function Vr(t, e, n, s, i) {
  const r = e.href, o = e.title || null, l = t[1].replace(i.other.outputLinkReplace, "$1");
  if (t[0].charAt(0) !== "!") {
    s.state.inLink = !0;
    const a = {
      type: "link",
      raw: n,
      href: r,
      title: o,
      text: l,
      tokens: s.inlineTokens(l)
    };
    return s.state.inLink = !1, a;
  }
  return {
    type: "image",
    raw: n,
    href: r,
    title: o,
    text: l
  };
}
function $u(t, e, n) {
  const s = t.match(n.other.indentCodeCompensation);
  if (s === null)
    return e;
  const i = s[1];
  return e.split(`
`).map((r) => {
    const o = r.match(n.other.beginningSpace);
    if (o === null)
      return r;
    const [l] = o;
    return l.length >= i.length ? r.slice(i.length) : r;
  }).join(`
`);
}
class ds {
  // set by the lexer
  constructor(e) {
    we(this, "options");
    we(this, "rules");
    // set by the lexer
    we(this, "lexer");
    this.options = e || cn;
  }
  space(e) {
    const n = this.rules.block.newline.exec(e);
    if (n && n[0].length > 0)
      return {
        type: "space",
        raw: n[0]
      };
  }
  code(e) {
    const n = this.rules.block.code.exec(e);
    if (n) {
      const s = n[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: n[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? s : Sn(s, `
`)
      };
    }
  }
  fences(e) {
    const n = this.rules.block.fences.exec(e);
    if (n) {
      const s = n[0], i = $u(s, n[3] || "", this.rules);
      return {
        type: "code",
        raw: s,
        lang: n[2] ? n[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : n[2],
        text: i
      };
    }
  }
  heading(e) {
    const n = this.rules.block.heading.exec(e);
    if (n) {
      let s = n[2].trim();
      if (this.rules.other.endingHash.test(s)) {
        const i = Sn(s, "#");
        (this.options.pedantic || !i || this.rules.other.endingSpaceChar.test(i)) && (s = i.trim());
      }
      return {
        type: "heading",
        raw: n[0],
        depth: n[1].length,
        text: s,
        tokens: this.lexer.inline(s)
      };
    }
  }
  hr(e) {
    const n = this.rules.block.hr.exec(e);
    if (n)
      return {
        type: "hr",
        raw: Sn(n[0], `
`)
      };
  }
  blockquote(e) {
    const n = this.rules.block.blockquote.exec(e);
    if (n) {
      let s = Sn(n[0], `
`).split(`
`), i = "", r = "";
      const o = [];
      for (; s.length > 0; ) {
        let l = !1;
        const a = [];
        let f;
        for (f = 0; f < s.length; f++)
          if (this.rules.other.blockquoteStart.test(s[f]))
            a.push(s[f]), l = !0;
          else if (!l)
            a.push(s[f]);
          else
            break;
        s = s.slice(f);
        const c = a.join(`
`), d = c.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        i = i ? `${i}
${c}` : c, r = r ? `${r}
${d}` : d;
        const w = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(d, o, !0), this.lexer.state.top = w, s.length === 0)
          break;
        const S = o.at(-1);
        if ((S == null ? void 0 : S.type) === "code")
          break;
        if ((S == null ? void 0 : S.type) === "blockquote") {
          const q = S, F = q.raw + `
` + s.join(`
`), te = this.blockquote(F);
          o[o.length - 1] = te, i = i.substring(0, i.length - q.raw.length) + te.raw, r = r.substring(0, r.length - q.text.length) + te.text;
          break;
        } else if ((S == null ? void 0 : S.type) === "list") {
          const q = S, F = q.raw + `
` + s.join(`
`), te = this.list(F);
          o[o.length - 1] = te, i = i.substring(0, i.length - S.raw.length) + te.raw, r = r.substring(0, r.length - q.raw.length) + te.raw, s = F.substring(o.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: i,
        tokens: o,
        text: r
      };
    }
  }
  list(e) {
    let n = this.rules.block.list.exec(e);
    if (n) {
      let s = n[1].trim();
      const i = s.length > 1, r = {
        type: "list",
        raw: "",
        ordered: i,
        start: i ? +s.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      s = i ? `\\d{1,9}\\${s.slice(-1)}` : `\\${s}`, this.options.pedantic && (s = i ? s : "[*+-]");
      const o = this.rules.other.listItemRegex(s);
      let l = !1;
      for (; e; ) {
        let f = !1, c = "", d = "";
        if (!(n = o.exec(e)) || this.rules.block.hr.test(e))
          break;
        c = n[0], e = e.substring(c.length);
        let w = n[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (de) => " ".repeat(3 * de.length)), S = e.split(`
`, 1)[0], q = !w.trim(), F = 0;
        if (this.options.pedantic ? (F = 2, d = w.trimStart()) : q ? F = n[1].length + 1 : (F = n[2].search(this.rules.other.nonSpaceChar), F = F > 4 ? 1 : F, d = w.slice(F), F += n[1].length), q && this.rules.other.blankLine.test(S) && (c += S + `
`, e = e.substring(S.length + 1), f = !0), !f) {
          const de = this.rules.other.nextBulletRegex(F), me = this.rules.other.hrRegex(F), U = this.rules.other.fencesBeginRegex(F), ie = this.rules.other.headingBeginRegex(F), qe = this.rules.other.htmlBeginRegex(F);
          for (; e; ) {
            const _e = e.split(`
`, 1)[0];
            let $e;
            if (S = _e, this.options.pedantic ? (S = S.replace(this.rules.other.listReplaceNesting, "  "), $e = S) : $e = S.replace(this.rules.other.tabCharGlobal, "    "), U.test(S) || ie.test(S) || qe.test(S) || de.test(S) || me.test(S))
              break;
            if ($e.search(this.rules.other.nonSpaceChar) >= F || !S.trim())
              d += `
` + $e.slice(F);
            else {
              if (q || w.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || U.test(w) || ie.test(w) || me.test(w))
                break;
              d += `
` + S;
            }
            !q && !S.trim() && (q = !0), c += _e + `
`, e = e.substring(_e.length + 1), w = $e.slice(F);
          }
        }
        r.loose || (l ? r.loose = !0 : this.rules.other.doubleBlankLine.test(c) && (l = !0));
        let te = null, ne;
        this.options.gfm && (te = this.rules.other.listIsTask.exec(d), te && (ne = te[0] !== "[ ] ", d = d.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: c,
          task: !!te,
          checked: ne,
          loose: !1,
          text: d,
          tokens: []
        }), r.raw += c;
      }
      const a = r.items.at(-1);
      if (a)
        a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
      else
        return;
      r.raw = r.raw.trimEnd();
      for (let f = 0; f < r.items.length; f++)
        if (this.lexer.state.top = !1, r.items[f].tokens = this.lexer.blockTokens(r.items[f].text, []), !r.loose) {
          const c = r.items[f].tokens.filter((w) => w.type === "space"), d = c.length > 0 && c.some((w) => this.rules.other.anyLine.test(w.raw));
          r.loose = d;
        }
      if (r.loose)
        for (let f = 0; f < r.items.length; f++)
          r.items[f].loose = !0;
      return r;
    }
  }
  html(e) {
    const n = this.rules.block.html.exec(e);
    if (n)
      return {
        type: "html",
        block: !0,
        raw: n[0],
        pre: n[1] === "pre" || n[1] === "script" || n[1] === "style",
        text: n[0]
      };
  }
  def(e) {
    const n = this.rules.block.def.exec(e);
    if (n) {
      const s = n[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), i = n[2] ? n[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = n[3] ? n[3].substring(1, n[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : n[3];
      return {
        type: "def",
        tag: s,
        raw: n[0],
        href: i,
        title: r
      };
    }
  }
  table(e) {
    var l;
    const n = this.rules.block.table.exec(e);
    if (!n || !this.rules.other.tableDelimiter.test(n[2]))
      return;
    const s = qr(n[1]), i = n[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (l = n[3]) != null && l.trim() ? n[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], o = {
      type: "table",
      raw: n[0],
      header: [],
      align: [],
      rows: []
    };
    if (s.length === i.length) {
      for (const a of i)
        this.rules.other.tableAlignRight.test(a) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? o.align.push("left") : o.align.push(null);
      for (let a = 0; a < s.length; a++)
        o.header.push({
          text: s[a],
          tokens: this.lexer.inline(s[a]),
          header: !0,
          align: o.align[a]
        });
      for (const a of r)
        o.rows.push(qr(a, o.header.length).map((f, c) => ({
          text: f,
          tokens: this.lexer.inline(f),
          header: !1,
          align: o.align[c]
        })));
      return o;
    }
  }
  lheading(e) {
    const n = this.rules.block.lheading.exec(e);
    if (n)
      return {
        type: "heading",
        raw: n[0],
        depth: n[2].charAt(0) === "=" ? 1 : 2,
        text: n[1],
        tokens: this.lexer.inline(n[1])
      };
  }
  paragraph(e) {
    const n = this.rules.block.paragraph.exec(e);
    if (n) {
      const s = n[1].charAt(n[1].length - 1) === `
` ? n[1].slice(0, -1) : n[1];
      return {
        type: "paragraph",
        raw: n[0],
        text: s,
        tokens: this.lexer.inline(s)
      };
    }
  }
  text(e) {
    const n = this.rules.block.text.exec(e);
    if (n)
      return {
        type: "text",
        raw: n[0],
        text: n[0],
        tokens: this.lexer.inline(n[0])
      };
  }
  escape(e) {
    const n = this.rules.inline.escape.exec(e);
    if (n)
      return {
        type: "escape",
        raw: n[0],
        text: n[1]
      };
  }
  tag(e) {
    const n = this.rules.inline.tag.exec(e);
    if (n)
      return !this.lexer.state.inLink && this.rules.other.startATag.test(n[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(n[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(n[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(n[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: n[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: n[0]
      };
  }
  link(e) {
    const n = this.rules.inline.link.exec(e);
    if (n) {
      const s = n[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(s)) {
        if (!this.rules.other.endAngleBracket.test(s))
          return;
        const o = Sn(s.slice(0, -1), "\\");
        if ((s.length - o.length) % 2 === 0)
          return;
      } else {
        const o = Pu(n[2], "()");
        if (o > -1) {
          const a = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + o;
          n[2] = n[2].substring(0, o), n[0] = n[0].substring(0, a).trim(), n[3] = "";
        }
      }
      let i = n[2], r = "";
      if (this.options.pedantic) {
        const o = this.rules.other.pedanticHrefTitle.exec(i);
        o && (i = o[1], r = o[3]);
      } else
        r = n[3] ? n[3].slice(1, -1) : "";
      return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(s) ? i = i.slice(1) : i = i.slice(1, -1)), Vr(n, {
        href: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
        title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
      }, n[0], this.lexer, this.rules);
    }
  }
  reflink(e, n) {
    let s;
    if ((s = this.rules.inline.reflink.exec(e)) || (s = this.rules.inline.nolink.exec(e))) {
      const i = (s[2] || s[1]).replace(this.rules.other.multipleSpaceGlobal, " "), r = n[i.toLowerCase()];
      if (!r) {
        const o = s[0].charAt(0);
        return {
          type: "text",
          raw: o,
          text: o
        };
      }
      return Vr(s, r, s[0], this.lexer, this.rules);
    }
  }
  emStrong(e, n, s = "") {
    let i = this.rules.inline.emStrongLDelim.exec(e);
    if (!i || i[3] && s.match(this.rules.other.unicodeAlphaNumeric))
      return;
    if (!(i[1] || i[2] || "") || !s || this.rules.inline.punctuation.exec(s)) {
      const o = [...i[0]].length - 1;
      let l, a, f = o, c = 0;
      const d = i[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (d.lastIndex = 0, n = n.slice(-1 * e.length + o); (i = d.exec(n)) != null; ) {
        if (l = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !l)
          continue;
        if (a = [...l].length, i[3] || i[4]) {
          f += a;
          continue;
        } else if ((i[5] || i[6]) && o % 3 && !((o + a) % 3)) {
          c += a;
          continue;
        }
        if (f -= a, f > 0)
          continue;
        a = Math.min(a, a + f + c);
        const w = [...i[0]][0].length, S = e.slice(0, o + i.index + w + a);
        if (Math.min(o, a) % 2) {
          const F = S.slice(1, -1);
          return {
            type: "em",
            raw: S,
            text: F,
            tokens: this.lexer.inlineTokens(F)
          };
        }
        const q = S.slice(2, -2);
        return {
          type: "strong",
          raw: S,
          text: q,
          tokens: this.lexer.inlineTokens(q)
        };
      }
    }
  }
  codespan(e) {
    const n = this.rules.inline.code.exec(e);
    if (n) {
      let s = n[2].replace(this.rules.other.newLineCharGlobal, " ");
      const i = this.rules.other.nonSpaceChar.test(s), r = this.rules.other.startingSpaceChar.test(s) && this.rules.other.endingSpaceChar.test(s);
      return i && r && (s = s.substring(1, s.length - 1)), {
        type: "codespan",
        raw: n[0],
        text: s
      };
    }
  }
  br(e) {
    const n = this.rules.inline.br.exec(e);
    if (n)
      return {
        type: "br",
        raw: n[0]
      };
  }
  del(e) {
    const n = this.rules.inline.del.exec(e);
    if (n)
      return {
        type: "del",
        raw: n[0],
        text: n[2],
        tokens: this.lexer.inlineTokens(n[2])
      };
  }
  autolink(e) {
    const n = this.rules.inline.autolink.exec(e);
    if (n) {
      let s, i;
      return n[2] === "@" ? (s = n[1], i = "mailto:" + s) : (s = n[1], i = s), {
        type: "link",
        raw: n[0],
        text: s,
        href: i,
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
  url(e) {
    var s;
    let n;
    if (n = this.rules.inline.url.exec(e)) {
      let i, r;
      if (n[2] === "@")
        i = n[0], r = "mailto:" + i;
      else {
        let o;
        do
          o = n[0], n[0] = ((s = this.rules.inline._backpedal.exec(n[0])) == null ? void 0 : s[0]) ?? "";
        while (o !== n[0]);
        i = n[0], n[1] === "www." ? r = "http://" + n[0] : r = n[0];
      }
      return {
        type: "link",
        raw: n[0],
        text: i,
        href: r,
        tokens: [
          {
            type: "text",
            raw: i,
            text: i
          }
        ]
      };
    }
  }
  inlineText(e) {
    const n = this.rules.inline.text.exec(e);
    if (n) {
      const s = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: n[0],
        text: n[0],
        escaped: s
      };
    }
  }
}
class ft {
  constructor(e) {
    we(this, "tokens");
    we(this, "options");
    we(this, "state");
    we(this, "tokenizer");
    we(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || cn, this.options.tokenizer = this.options.tokenizer || new ds(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      other: Qe,
      block: Kn.normal,
      inline: xn.normal
    };
    this.options.pedantic ? (n.block = Kn.pedantic, n.inline = xn.pedantic) : this.options.gfm && (n.block = Kn.gfm, this.options.breaks ? n.inline = xn.breaks : n.inline = xn.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: Kn,
      inline: xn
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, n) {
    return new ft(n).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, n) {
    return new ft(n).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(Qe.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const s = this.inlineQueue[n];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, n = [], s = !1) {
    var i, r, o;
    for (this.options.pedantic && (e = e.replace(Qe.tabCharGlobal, "    ").replace(Qe.spaceLine, "")); e; ) {
      let l;
      if ((r = (i = this.options.extensions) == null ? void 0 : i.block) != null && r.some((f) => (l = f.call({ lexer: this }, e, n)) ? (e = e.substring(l.raw.length), n.push(l), !0) : !1))
        continue;
      if (l = this.tokenizer.space(e)) {
        e = e.substring(l.raw.length);
        const f = n.at(-1);
        l.raw.length === 1 && f !== void 0 ? f.raw += `
` : n.push(l);
        continue;
      }
      if (l = this.tokenizer.code(e)) {
        e = e.substring(l.raw.length);
        const f = n.at(-1);
        (f == null ? void 0 : f.type) === "paragraph" || (f == null ? void 0 : f.type) === "text" ? (f.raw += `
` + l.raw, f.text += `
` + l.text, this.inlineQueue.at(-1).src = f.text) : n.push(l);
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
        const f = n.at(-1);
        (f == null ? void 0 : f.type) === "paragraph" || (f == null ? void 0 : f.type) === "text" ? (f.raw += `
` + l.raw, f.text += `
` + l.raw, this.inlineQueue.at(-1).src = f.text) : this.tokens.links[l.tag] || (this.tokens.links[l.tag] = {
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
        let f = 1 / 0;
        const c = e.slice(1);
        let d;
        this.options.extensions.startBlock.forEach((w) => {
          d = w.call({ lexer: this }, c), typeof d == "number" && d >= 0 && (f = Math.min(f, d));
        }), f < 1 / 0 && f >= 0 && (a = e.substring(0, f + 1));
      }
      if (this.state.top && (l = this.tokenizer.paragraph(a))) {
        const f = n.at(-1);
        s && (f == null ? void 0 : f.type) === "paragraph" ? (f.raw += `
` + l.raw, f.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = f.text) : n.push(l), s = a.length !== e.length, e = e.substring(l.raw.length);
        continue;
      }
      if (l = this.tokenizer.text(e)) {
        e = e.substring(l.raw.length);
        const f = n.at(-1);
        (f == null ? void 0 : f.type) === "text" ? (f.raw += `
` + l.raw, f.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = f.text) : n.push(l);
        continue;
      }
      if (e) {
        const f = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(f);
          break;
        } else
          throw new Error(f);
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
    var l, a, f;
    let s = e, i = null;
    if (this.tokens.links) {
      const c = Object.keys(this.tokens.links);
      if (c.length > 0)
        for (; (i = this.tokenizer.rules.inline.reflinkSearch.exec(s)) != null; )
          c.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) && (s = s.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (i = this.tokenizer.rules.inline.blockSkip.exec(s)) != null; )
      s = s.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (i = this.tokenizer.rules.inline.anyPunctuation.exec(s)) != null; )
      s = s.slice(0, i.index) + "++" + s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let r = !1, o = "";
    for (; e; ) {
      r || (o = ""), r = !1;
      let c;
      if ((a = (l = this.options.extensions) == null ? void 0 : l.inline) != null && a.some((w) => (c = w.call({ lexer: this }, e, n)) ? (e = e.substring(c.raw.length), n.push(c), !0) : !1))
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
        const w = n.at(-1);
        c.type === "text" && (w == null ? void 0 : w.type) === "text" ? (w.raw += c.raw, w.text += c.text) : n.push(c);
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
      let d = e;
      if ((f = this.options.extensions) != null && f.startInline) {
        let w = 1 / 0;
        const S = e.slice(1);
        let q;
        this.options.extensions.startInline.forEach((F) => {
          q = F.call({ lexer: this }, S), typeof q == "number" && q >= 0 && (w = Math.min(w, q));
        }), w < 1 / 0 && w >= 0 && (d = e.substring(0, w + 1));
      }
      if (c = this.tokenizer.inlineText(d)) {
        e = e.substring(c.raw.length), c.raw.slice(-1) !== "_" && (o = c.raw.slice(-1)), r = !0;
        const w = n.at(-1);
        (w == null ? void 0 : w.type) === "text" ? (w.raw += c.raw, w.text += c.text) : n.push(c);
        continue;
      }
      if (e) {
        const w = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(w);
          break;
        } else
          throw new Error(w);
      }
    }
    return n;
  }
}
class ps {
  // set by the parser
  constructor(e) {
    we(this, "options");
    we(this, "parser");
    this.options = e || cn;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: n, escaped: s }) {
    var o;
    const i = (o = (n || "").match(Qe.notSpaceStart)) == null ? void 0 : o[0], r = e.replace(Qe.endingNewline, "") + `
`;
    return i ? '<pre><code class="language-' + St(i) + '">' + (s ? r : St(r, !0)) + `</code></pre>
` : "<pre><code>" + (s ? r : St(r, !0)) + `</code></pre>
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
  heading({ tokens: e, depth: n }) {
    return `<h${n}>${this.parser.parseInline(e)}</h${n}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    const n = e.ordered, s = e.start;
    let i = "";
    for (let l = 0; l < e.items.length; l++) {
      const a = e.items[l];
      i += this.listitem(a);
    }
    const r = n ? "ol" : "ul", o = n && s !== 1 ? ' start="' + s + '"' : "";
    return "<" + r + o + `>
` + i + "</" + r + `>
`;
  }
  listitem(e) {
    var s;
    let n = "";
    if (e.task) {
      const i = this.checkbox({ checked: !!e.checked });
      e.loose ? ((s = e.tokens[0]) == null ? void 0 : s.type) === "paragraph" ? (e.tokens[0].text = i + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = i + " " + St(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
        type: "text",
        raw: i + " ",
        text: i + " ",
        escaped: !0
      }) : n += i + " ";
    }
    return n += this.parser.parse(e.tokens, !!e.loose), `<li>${n}</li>
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
    let n = "", s = "";
    for (let r = 0; r < e.header.length; r++)
      s += this.tablecell(e.header[r]);
    n += this.tablerow({ text: s });
    let i = "";
    for (let r = 0; r < e.rows.length; r++) {
      const o = e.rows[r];
      s = "";
      for (let l = 0; l < o.length; l++)
        s += this.tablecell(o[l]);
      i += this.tablerow({ text: s });
    }
    return i && (i = `<tbody>${i}</tbody>`), `<table>
<thead>
` + n + `</thead>
` + i + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    const n = this.parser.parseInline(e.tokens), s = e.header ? "th" : "td";
    return (e.align ? `<${s} align="${e.align}">` : `<${s}>`) + n + `</${s}>
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
    return `<code>${St(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: n, tokens: s }) {
    const i = this.parser.parseInline(s), r = Dr(e);
    if (r === null)
      return i;
    e = r;
    let o = '<a href="' + e + '"';
    return n && (o += ' title="' + St(n) + '"'), o += ">" + i + "</a>", o;
  }
  image({ href: e, title: n, text: s }) {
    const i = Dr(e);
    if (i === null)
      return St(s);
    e = i;
    let r = `<img src="${e}" alt="${s}"`;
    return n && (r += ` title="${St(n)}"`), r += ">", r;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : St(e.text);
  }
}
class Mi {
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
}
class ht {
  constructor(e) {
    we(this, "options");
    we(this, "renderer");
    we(this, "textRenderer");
    this.options = e || cn, this.options.renderer = this.options.renderer || new ps(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Mi();
  }
  /**
   * Static Parse Method
   */
  static parse(e, n) {
    return new ht(n).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, n) {
    return new ht(n).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, n = !0) {
    var i, r;
    let s = "";
    for (let o = 0; o < e.length; o++) {
      const l = e[o];
      if ((r = (i = this.options.extensions) == null ? void 0 : i.renderers) != null && r[l.type]) {
        const f = l, c = this.options.extensions.renderers[f.type].call({ parser: this }, f);
        if (c !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(f.type)) {
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
          let f = a, c = this.renderer.text(f);
          for (; o + 1 < e.length && e[o + 1].type === "text"; )
            f = e[++o], c += `
` + this.renderer.text(f);
          n ? s += this.renderer.paragraph({
            type: "paragraph",
            raw: c,
            text: c,
            tokens: [{ type: "text", raw: c, text: c, escaped: !0 }]
          }) : s += c;
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
  parseInline(e, n = this.renderer) {
    var i, r;
    let s = "";
    for (let o = 0; o < e.length; o++) {
      const l = e[o];
      if ((r = (i = this.options.extensions) == null ? void 0 : i.renderers) != null && r[l.type]) {
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
}
class Fn {
  constructor(e) {
    we(this, "options");
    we(this, "block");
    this.options = e || cn;
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
    return this.block ? ft.lex : ft.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? ht.parse : ht.parseInline;
  }
}
we(Fn, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
class Fu {
  constructor(...e) {
    we(this, "defaults", Oi());
    we(this, "options", this.setOptions);
    we(this, "parse", this.parseMarkdown(!0));
    we(this, "parseInline", this.parseMarkdown(!1));
    we(this, "Parser", ht);
    we(this, "Renderer", ps);
    we(this, "TextRenderer", Mi);
    we(this, "Lexer", ft);
    we(this, "Tokenizer", ds);
    we(this, "Hooks", Fn);
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, n) {
    var i, r;
    let s = [];
    for (const o of e)
      switch (s = s.concat(n.call(this, o)), o.type) {
        case "table": {
          const l = o;
          for (const a of l.header)
            s = s.concat(this.walkTokens(a.tokens, n));
          for (const a of l.rows)
            for (const f of a)
              s = s.concat(this.walkTokens(f.tokens, n));
          break;
        }
        case "list": {
          const l = o;
          s = s.concat(this.walkTokens(l.items, n));
          break;
        }
        default: {
          const l = o;
          (r = (i = this.defaults.extensions) == null ? void 0 : i.childTokens) != null && r[l.type] ? this.defaults.extensions.childTokens[l.type].forEach((a) => {
            const f = l[a].flat(1 / 0);
            s = s.concat(this.walkTokens(f, n));
          }) : l.tokens && (s = s.concat(this.walkTokens(l.tokens, n)));
        }
      }
    return s;
  }
  use(...e) {
    const n = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((s) => {
      const i = { ...s };
      if (i.async = this.defaults.async || i.async || !1, s.extensions && (s.extensions.forEach((r) => {
        if (!r.name)
          throw new Error("extension name required");
        if ("renderer" in r) {
          const o = n.renderers[r.name];
          o ? n.renderers[r.name] = function(...l) {
            let a = r.renderer.apply(this, l);
            return a === !1 && (a = o.apply(this, l)), a;
          } : n.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const o = n[r.level];
          o ? o.unshift(r.tokenizer) : n[r.level] = [r.tokenizer], r.start && (r.level === "block" ? n.startBlock ? n.startBlock.push(r.start) : n.startBlock = [r.start] : r.level === "inline" && (n.startInline ? n.startInline.push(r.start) : n.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (n.childTokens[r.name] = r.childTokens);
      }), i.extensions = n), s.renderer) {
        const r = this.defaults.renderer || new ps(this.defaults);
        for (const o in s.renderer) {
          if (!(o in r))
            throw new Error(`renderer '${o}' does not exist`);
          if (["options", "parser"].includes(o))
            continue;
          const l = o, a = s.renderer[l], f = r[l];
          r[l] = (...c) => {
            let d = a.apply(r, c);
            return d === !1 && (d = f.apply(r, c)), d || "";
          };
        }
        i.renderer = r;
      }
      if (s.tokenizer) {
        const r = this.defaults.tokenizer || new ds(this.defaults);
        for (const o in s.tokenizer) {
          if (!(o in r))
            throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o))
            continue;
          const l = o, a = s.tokenizer[l], f = r[l];
          r[l] = (...c) => {
            let d = a.apply(r, c);
            return d === !1 && (d = f.apply(r, c)), d;
          };
        }
        i.tokenizer = r;
      }
      if (s.hooks) {
        const r = this.defaults.hooks || new Fn();
        for (const o in s.hooks) {
          if (!(o in r))
            throw new Error(`hook '${o}' does not exist`);
          if (["options", "block"].includes(o))
            continue;
          const l = o, a = s.hooks[l], f = r[l];
          Fn.passThroughHooks.has(o) ? r[l] = (c) => {
            if (this.defaults.async)
              return Promise.resolve(a.call(r, c)).then((w) => f.call(r, w));
            const d = a.call(r, c);
            return f.call(r, d);
          } : r[l] = (...c) => {
            let d = a.apply(r, c);
            return d === !1 && (d = f.apply(r, c)), d;
          };
        }
        i.hooks = r;
      }
      if (s.walkTokens) {
        const r = this.defaults.walkTokens, o = s.walkTokens;
        i.walkTokens = function(l) {
          let a = [];
          return a.push(o.call(this, l)), r && (a = a.concat(r.call(this, l))), a;
        };
      }
      this.defaults = { ...this.defaults, ...i };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, n) {
    return ft.lex(e, n ?? this.defaults);
  }
  parser(e, n) {
    return ht.parse(e, n ?? this.defaults);
  }
  parseMarkdown(e) {
    return (s, i) => {
      const r = { ...i }, o = { ...this.defaults, ...r }, l = this.onError(!!o.silent, !!o.async);
      if (this.defaults.async === !0 && r.async === !1)
        return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof s > "u" || s === null)
        return l(new Error("marked(): input parameter is undefined or null"));
      if (typeof s != "string")
        return l(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(s) + ", string expected"));
      o.hooks && (o.hooks.options = o, o.hooks.block = e);
      const a = o.hooks ? o.hooks.provideLexer() : e ? ft.lex : ft.lexInline, f = o.hooks ? o.hooks.provideParser() : e ? ht.parse : ht.parseInline;
      if (o.async)
        return Promise.resolve(o.hooks ? o.hooks.preprocess(s) : s).then((c) => a(c, o)).then((c) => o.hooks ? o.hooks.processAllTokens(c) : c).then((c) => o.walkTokens ? Promise.all(this.walkTokens(c, o.walkTokens)).then(() => c) : c).then((c) => f(c, o)).then((c) => o.hooks ? o.hooks.postprocess(c) : c).catch(l);
      try {
        o.hooks && (s = o.hooks.preprocess(s));
        let c = a(s, o);
        o.hooks && (c = o.hooks.processAllTokens(c)), o.walkTokens && this.walkTokens(c, o.walkTokens);
        let d = f(c, o);
        return o.hooks && (d = o.hooks.postprocess(d)), d;
      } catch (c) {
        return l(c);
      }
    };
  }
  onError(e, n) {
    return (s) => {
      if (s.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const i = "<p>An error occurred:</p><pre>" + St(s.message + "", !0) + "</pre>";
        return n ? Promise.resolve(i) : i;
      }
      if (n)
        return Promise.reject(s);
      throw s;
    };
  }
}
const an = new Fu();
function he(t, e) {
  return an.parse(t, e);
}
he.options = he.setOptions = function(t) {
  return an.setOptions(t), he.defaults = an.defaults, el(he.defaults), he;
};
he.getDefaults = Oi;
he.defaults = cn;
he.use = function(...t) {
  return an.use(...t), he.defaults = an.defaults, el(he.defaults), he;
};
he.walkTokens = function(t, e) {
  return an.walkTokens(t, e);
};
he.parseInline = an.parseInline;
he.Parser = ht;
he.parser = ht.parse;
he.Renderer = ps;
he.TextRenderer = Mi;
he.Lexer = ft;
he.lexer = ft.lex;
he.Tokenizer = ds;
he.Hooks = Fn;
he.parse = he;
he.options;
he.setOptions;
he.use;
he.walkTokens;
he.parseInline;
ht.parse;
ft.lex;
const gs = {
  API_URL: "http://localhost:8000/api/v1",
  WS_URL: "ws://localhost:8000"
};
function Bu(t) {
  const e = De(() => ({
    backgroundColor: t.value.chat_background_color || "#ffffff",
    color: Ht(t.value.chat_background_color || "#ffffff") ? "#ffffff" : "#000000"
  })), n = De(() => ({
    backgroundColor: t.value.chat_bubble_color || "#f34611",
    color: Ht(t.value.chat_bubble_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), s = De(() => {
    const f = t.value.chat_background_color || "#F8F9FA", c = Xc(f, 20);
    return {
      backgroundColor: c,
      color: Ht(c) ? "#FFFFFF" : "#000000"
    };
  }), i = De(() => ({
    backgroundColor: t.value.accent_color || "#f34611",
    color: Ht(t.value.accent_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), r = De(() => ({
    color: Ht(t.value.chat_background_color || "#F8F9FA") ? "#FFFFFF" : "#000000"
  })), o = De(() => ({
    borderBottom: `1px solid ${Ht(t.value.chat_background_color || "#F8F9FA") ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`
  })), l = De(() => t.value.photo_url ? t.value.photo_url.includes("amazonaws.com") ? t.value.photo_url : `${gs.API_URL}${t.value.photo_url}` : ""), a = De(() => {
    const f = t.value.chat_background_color || "#ffffff";
    return {
      boxShadow: `0 8px 5px ${Ht(f) ? "rgba(0, 0, 0, 0.24)" : "rgba(0, 0, 0, 0.12)"}`
    };
  });
  return {
    chatStyles: e,
    chatIconStyles: n,
    agentBubbleStyles: s,
    userBubbleStyles: i,
    messageNameStyles: r,
    headerBorderStyles: o,
    photoUrl: l,
    shadowStyle: a
  };
}
const Ot = /* @__PURE__ */ Object.create(null);
Ot.open = "0";
Ot.close = "1";
Ot.ping = "2";
Ot.pong = "3";
Ot.message = "4";
Ot.upgrade = "5";
Ot.noop = "6";
const ns = /* @__PURE__ */ Object.create(null);
Object.keys(Ot).forEach((t) => {
  ns[Ot[t]] = t;
});
const ai = { type: "error", data: "parser error" }, fl = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", hl = typeof ArrayBuffer == "function", dl = (t) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t && t.buffer instanceof ArrayBuffer, Di = ({ type: t, data: e }, n, s) => fl && e instanceof Blob ? n ? s(e) : Hr(e, s) : hl && (e instanceof ArrayBuffer || dl(e)) ? n ? s(e) : Hr(new Blob([e]), s) : s(Ot[t] + (e || "")), Hr = (t, e) => {
  const n = new FileReader();
  return n.onload = function() {
    const s = n.result.split(",")[1];
    e("b" + (s || ""));
  }, n.readAsDataURL(t);
};
function Ur(t) {
  return t instanceof Uint8Array ? t : t instanceof ArrayBuffer ? new Uint8Array(t) : new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
}
let js;
function Nu(t, e) {
  if (fl && t.data instanceof Blob)
    return t.data.arrayBuffer().then(Ur).then(e);
  if (hl && (t.data instanceof ArrayBuffer || dl(t.data)))
    return e(Ur(t.data));
  Di(t, !1, (n) => {
    js || (js = new TextEncoder()), e(js.encode(n));
  });
}
const jr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", An = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let t = 0; t < jr.length; t++)
  An[jr.charCodeAt(t)] = t;
const Mu = (t) => {
  let e = t.length * 0.75, n = t.length, s, i = 0, r, o, l, a;
  t[t.length - 1] === "=" && (e--, t[t.length - 2] === "=" && e--);
  const f = new ArrayBuffer(e), c = new Uint8Array(f);
  for (s = 0; s < n; s += 4)
    r = An[t.charCodeAt(s)], o = An[t.charCodeAt(s + 1)], l = An[t.charCodeAt(s + 2)], a = An[t.charCodeAt(s + 3)], c[i++] = r << 2 | o >> 4, c[i++] = (o & 15) << 4 | l >> 2, c[i++] = (l & 3) << 6 | a & 63;
  return f;
}, Du = typeof ArrayBuffer == "function", qi = (t, e) => {
  if (typeof t != "string")
    return {
      type: "message",
      data: pl(t, e)
    };
  const n = t.charAt(0);
  return n === "b" ? {
    type: "message",
    data: qu(t.substring(1), e)
  } : ns[n] ? t.length > 1 ? {
    type: ns[n],
    data: t.substring(1)
  } : {
    type: ns[n]
  } : ai;
}, qu = (t, e) => {
  if (Du) {
    const n = Mu(t);
    return pl(n, e);
  } else
    return { base64: !0, data: t };
}, pl = (t, e) => {
  switch (e) {
    case "blob":
      return t instanceof Blob ? t : new Blob([t]);
    case "arraybuffer":
    default:
      return t instanceof ArrayBuffer ? t : t.buffer;
  }
}, gl = "", Vu = (t, e) => {
  const n = t.length, s = new Array(n);
  let i = 0;
  t.forEach((r, o) => {
    Di(r, !1, (l) => {
      s[o] = l, ++i === n && e(s.join(gl));
    });
  });
}, Hu = (t, e) => {
  const n = t.split(gl), s = [];
  for (let i = 0; i < n.length; i++) {
    const r = qi(n[i], e);
    if (s.push(r), r.type === "error")
      break;
  }
  return s;
};
function Uu() {
  return new TransformStream({
    transform(t, e) {
      Nu(t, (n) => {
        const s = n.length;
        let i;
        if (s < 126)
          i = new Uint8Array(1), new DataView(i.buffer).setUint8(0, s);
        else if (s < 65536) {
          i = new Uint8Array(3);
          const r = new DataView(i.buffer);
          r.setUint8(0, 126), r.setUint16(1, s);
        } else {
          i = new Uint8Array(9);
          const r = new DataView(i.buffer);
          r.setUint8(0, 127), r.setBigUint64(1, BigInt(s));
        }
        t.data && typeof t.data != "string" && (i[0] |= 128), e.enqueue(i), e.enqueue(n);
      });
    }
  });
}
let zs;
function Zn(t) {
  return t.reduce((e, n) => e + n.length, 0);
}
function Gn(t, e) {
  if (t[0].length === e)
    return t.shift();
  const n = new Uint8Array(e);
  let s = 0;
  for (let i = 0; i < e; i++)
    n[i] = t[0][s++], s === t[0].length && (t.shift(), s = 0);
  return t.length && s < t[0].length && (t[0] = t[0].slice(s)), n;
}
function ju(t, e) {
  zs || (zs = new TextDecoder());
  const n = [];
  let s = 0, i = -1, r = !1;
  return new TransformStream({
    transform(o, l) {
      for (n.push(o); ; ) {
        if (s === 0) {
          if (Zn(n) < 1)
            break;
          const a = Gn(n, 1);
          r = (a[0] & 128) === 128, i = a[0] & 127, i < 126 ? s = 3 : i === 126 ? s = 1 : s = 2;
        } else if (s === 1) {
          if (Zn(n) < 2)
            break;
          const a = Gn(n, 2);
          i = new DataView(a.buffer, a.byteOffset, a.length).getUint16(0), s = 3;
        } else if (s === 2) {
          if (Zn(n) < 8)
            break;
          const a = Gn(n, 8), f = new DataView(a.buffer, a.byteOffset, a.length), c = f.getUint32(0);
          if (c > Math.pow(2, 21) - 1) {
            l.enqueue(ai);
            break;
          }
          i = c * Math.pow(2, 32) + f.getUint32(4), s = 3;
        } else {
          if (Zn(n) < i)
            break;
          const a = Gn(n, i);
          l.enqueue(qi(r ? a : zs.decode(a), e)), s = 0;
        }
        if (i === 0 || i > t) {
          l.enqueue(ai);
          break;
        }
      }
    }
  });
}
const ml = 4;
function Ne(t) {
  if (t) return zu(t);
}
function zu(t) {
  for (var e in Ne.prototype)
    t[e] = Ne.prototype[e];
  return t;
}
Ne.prototype.on = Ne.prototype.addEventListener = function(t, e) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
};
Ne.prototype.once = function(t, e) {
  function n() {
    this.off(t, n), e.apply(this, arguments);
  }
  return n.fn = e, this.on(t, n), this;
};
Ne.prototype.off = Ne.prototype.removeListener = Ne.prototype.removeAllListeners = Ne.prototype.removeEventListener = function(t, e) {
  if (this._callbacks = this._callbacks || {}, arguments.length == 0)
    return this._callbacks = {}, this;
  var n = this._callbacks["$" + t];
  if (!n) return this;
  if (arguments.length == 1)
    return delete this._callbacks["$" + t], this;
  for (var s, i = 0; i < n.length; i++)
    if (s = n[i], s === e || s.fn === e) {
      n.splice(i, 1);
      break;
    }
  return n.length === 0 && delete this._callbacks["$" + t], this;
};
Ne.prototype.emit = function(t) {
  this._callbacks = this._callbacks || {};
  for (var e = new Array(arguments.length - 1), n = this._callbacks["$" + t], s = 1; s < arguments.length; s++)
    e[s - 1] = arguments[s];
  if (n) {
    n = n.slice(0);
    for (var s = 0, i = n.length; s < i; ++s)
      n[s].apply(this, e);
  }
  return this;
};
Ne.prototype.emitReserved = Ne.prototype.emit;
Ne.prototype.listeners = function(t) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
};
Ne.prototype.hasListeners = function(t) {
  return !!this.listeners(t).length;
};
const Es = typeof Promise == "function" && typeof Promise.resolve == "function" ? (e) => Promise.resolve().then(e) : (e, n) => n(e, 0), ct = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), Wu = "arraybuffer";
function _l(t, ...e) {
  return e.reduce((n, s) => (t.hasOwnProperty(s) && (n[s] = t[s]), n), {});
}
const Ku = ct.setTimeout, Zu = ct.clearTimeout;
function Rs(t, e) {
  e.useNativeTimers ? (t.setTimeoutFn = Ku.bind(ct), t.clearTimeoutFn = Zu.bind(ct)) : (t.setTimeoutFn = ct.setTimeout.bind(ct), t.clearTimeoutFn = ct.clearTimeout.bind(ct));
}
const Gu = 1.33;
function Yu(t) {
  return typeof t == "string" ? Ju(t) : Math.ceil((t.byteLength || t.size) * Gu);
}
function Ju(t) {
  let e = 0, n = 0;
  for (let s = 0, i = t.length; s < i; s++)
    e = t.charCodeAt(s), e < 128 ? n += 1 : e < 2048 ? n += 2 : e < 55296 || e >= 57344 ? n += 3 : (s++, n += 4);
  return n;
}
function yl() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function Qu(t) {
  let e = "";
  for (let n in t)
    t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
  return e;
}
function Xu(t) {
  let e = {}, n = t.split("&");
  for (let s = 0, i = n.length; s < i; s++) {
    let r = n[s].split("=");
    e[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
  }
  return e;
}
class ef extends Error {
  constructor(e, n, s) {
    super(e), this.description = n, this.context = s, this.type = "TransportError";
  }
}
class Vi extends Ne {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(e) {
    super(), this.writable = !1, Rs(this, e), this.opts = e, this.query = e.query, this.socket = e.socket, this.supportsBinary = !e.forceBase64;
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
    return super.emitReserved("error", new ef(e, n, s)), this;
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
    const n = qi(e, this.socket.binaryType);
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
    const n = Qu(e);
    return n.length ? "?" + n : "";
  }
}
class tf extends Vi {
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
    Hu(e, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
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
    this.writable = !1, Vu(e, (n) => {
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
    return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = yl()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(e, n);
  }
}
let bl = !1;
try {
  bl = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const nf = bl;
function sf() {
}
class rf extends tf {
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
    s.on("success", n), s.on("error", (i, r) => {
      this.onError("xhr post error", i, r);
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
class Rt extends Ne {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(e, n, s) {
    super(), this.createRequest = e, Rs(this, s), this._opts = s, this._method = s.method || "GET", this._uri = n, this._data = s.data !== void 0 ? s.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var e;
    const n = _l(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    n.xdomain = !!this._opts.xd;
    const s = this._xhr = this.createRequest(n);
    try {
      s.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          s.setDisableHeaderCheck && s.setDisableHeaderCheck(!0);
          for (let i in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(i) && s.setRequestHeader(i, this._opts.extraHeaders[i]);
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
        var i;
        s.readyState === 3 && ((i = this._opts.cookieJar) === null || i === void 0 || i.parseCookies(
          // @ts-ignore
          s.getResponseHeader("set-cookie")
        )), s.readyState === 4 && (s.status === 200 || s.status === 1223 ? this._onLoad() : this.setTimeoutFn(() => {
          this._onError(typeof s.status == "number" ? s.status : 0);
        }, 0));
      }, s.send(this._data);
    } catch (i) {
      this.setTimeoutFn(() => {
        this._onError(i);
      }, 0);
      return;
    }
    typeof document < "u" && (this._index = Rt.requestsCount++, Rt.requests[this._index] = this);
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
      if (this._xhr.onreadystatechange = sf, e)
        try {
          this._xhr.abort();
        } catch {
        }
      typeof document < "u" && delete Rt.requests[this._index], this._xhr = null;
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
Rt.requestsCount = 0;
Rt.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", zr);
  else if (typeof addEventListener == "function") {
    const t = "onpagehide" in ct ? "pagehide" : "unload";
    addEventListener(t, zr, !1);
  }
}
function zr() {
  for (let t in Rt.requests)
    Rt.requests.hasOwnProperty(t) && Rt.requests[t].abort();
}
const of = function() {
  const t = vl({
    xdomain: !1
  });
  return t && t.responseType !== null;
}();
class lf extends rf {
  constructor(e) {
    super(e);
    const n = e && e.forceBase64;
    this.supportsBinary = of && !n;
  }
  request(e = {}) {
    return Object.assign(e, { xd: this.xd }, this.opts), new Rt(vl, this.uri(), e);
  }
}
function vl(t) {
  const e = t.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!e || nf))
      return new XMLHttpRequest();
  } catch {
  }
  if (!e)
    try {
      return new ct[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const wl = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class af extends Vi {
  get name() {
    return "websocket";
  }
  doOpen() {
    const e = this.uri(), n = this.opts.protocols, s = wl ? {} : _l(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    this.opts.extraHeaders && (s.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(e, n, s);
    } catch (i) {
      return this.emitReserved("error", i);
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
      const s = e[n], i = n === e.length - 1;
      Di(s, this.supportsBinary, (r) => {
        try {
          this.doWrite(s, r);
        } catch {
        }
        i && Es(() => {
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
    return this.opts.timestampRequests && (n[this.opts.timestampParam] = yl()), this.supportsBinary || (n.b64 = 1), this.createUri(e, n);
  }
}
const Ws = ct.WebSocket || ct.MozWebSocket;
class cf extends af {
  createSocket(e, n, s) {
    return wl ? new Ws(e, n, s) : n ? new Ws(e, n) : new Ws(e);
  }
  doWrite(e, n) {
    this.ws.send(n);
  }
}
class uf extends Vi {
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
        const n = ju(Number.MAX_SAFE_INTEGER, this.socket.binaryType), s = e.readable.pipeThrough(n).getReader(), i = Uu();
        i.readable.pipeTo(e.writable), this._writer = i.writable.getWriter();
        const r = () => {
          s.read().then(({ done: l, value: a }) => {
            l || (this.onPacket(a), r());
          }).catch((l) => {
          });
        };
        r();
        const o = { type: "open" };
        this.query.sid && (o.data = `{"sid":"${this.query.sid}"}`), this._writer.write(o).then(() => this.onOpen());
      });
    });
  }
  write(e) {
    this.writable = !1;
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = n === e.length - 1;
      this._writer.write(s).then(() => {
        i && Es(() => {
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
const ff = {
  websocket: cf,
  webtransport: uf,
  polling: lf
}, hf = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, df = [
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
function ci(t) {
  if (t.length > 8e3)
    throw "URI too long";
  const e = t, n = t.indexOf("["), s = t.indexOf("]");
  n != -1 && s != -1 && (t = t.substring(0, n) + t.substring(n, s).replace(/:/g, ";") + t.substring(s, t.length));
  let i = hf.exec(t || ""), r = {}, o = 14;
  for (; o--; )
    r[df[o]] = i[o] || "";
  return n != -1 && s != -1 && (r.source = e, r.host = r.host.substring(1, r.host.length - 1).replace(/;/g, ":"), r.authority = r.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), r.ipv6uri = !0), r.pathNames = pf(r, r.path), r.queryKey = gf(r, r.query), r;
}
function pf(t, e) {
  const n = /\/{2,9}/g, s = e.replace(n, "/").split("/");
  return (e.slice(0, 1) == "/" || e.length === 0) && s.splice(0, 1), e.slice(-1) == "/" && s.splice(s.length - 1, 1), s;
}
function gf(t, e) {
  const n = {};
  return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, i, r) {
    i && (n[i] = r);
  }), n;
}
const ui = typeof addEventListener == "function" && typeof removeEventListener == "function", ss = [];
ui && addEventListener("offline", () => {
  ss.forEach((t) => t());
}, !1);
class Wt extends Ne {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(e, n) {
    if (super(), this.binaryType = Wu, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, e && typeof e == "object" && (n = e, e = null), e) {
      const s = ci(e);
      n.hostname = s.host, n.secure = s.protocol === "https" || s.protocol === "wss", n.port = s.port, s.query && (n.query = s.query);
    } else n.host && (n.hostname = ci(n.host).host);
    Rs(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((s) => {
      const i = s.prototype.name;
      this.transports.push(i), this._transportsByName[i] = s;
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
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = Xu(this.opts.query)), ui && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, ss.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
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
    n.EIO = ml, n.transport = e, this.id && (n.sid = this.id);
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
    const e = this.opts.rememberUpgrade && Wt.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
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
    this.readyState = "open", Wt.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
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
      const i = this.writeBuffer[s].data;
      if (i && (n += Yu(i)), s > 0 && n > this._maxPayload)
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
    return e && (this._pingTimeoutTime = 0, Es(() => {
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
  _sendPacket(e, n, s, i) {
    if (typeof n == "function" && (i = n, n = void 0), typeof s == "function" && (i = s, s = null), this.readyState === "closing" || this.readyState === "closed")
      return;
    s = s || {}, s.compress = s.compress !== !1;
    const r = {
      type: e,
      data: n,
      options: s
    };
    this.emitReserved("packetCreate", r), this.writeBuffer.push(r), i && this.once("flush", i), this.flush();
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
    if (Wt.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
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
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), ui && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const s = ss.indexOf(this._offlineEventListener);
        s !== -1 && ss.splice(s, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", e, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
Wt.protocol = ml;
class mf extends Wt {
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
    Wt.priorWebsocketSuccess = !1;
    const i = () => {
      s || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (d) => {
        if (!s)
          if (d.type === "pong" && d.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", n), !n)
              return;
            Wt.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
              s || this.readyState !== "closed" && (c(), this.setTransport(n), n.send([{ type: "upgrade" }]), this.emitReserved("upgrade", n), n = null, this.upgrading = !1, this.flush());
            });
          } else {
            const w = new Error("probe error");
            w.transport = n.name, this.emitReserved("upgradeError", w);
          }
      }));
    };
    function r() {
      s || (s = !0, c(), n.close(), n = null);
    }
    const o = (d) => {
      const w = new Error("probe error: " + d);
      w.transport = n.name, r(), this.emitReserved("upgradeError", w);
    };
    function l() {
      o("transport closed");
    }
    function a() {
      o("socket closed");
    }
    function f(d) {
      n && d.name !== n.name && r();
    }
    const c = () => {
      n.removeListener("open", i), n.removeListener("error", o), n.removeListener("close", l), this.off("close", a), this.off("upgrading", f);
    };
    n.once("open", i), n.once("error", o), n.once("close", l), this.once("close", a), this.once("upgrading", f), this._upgrades.indexOf("webtransport") !== -1 && e !== "webtransport" ? this.setTimeoutFn(() => {
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
let _f = class extends mf {
  constructor(e, n = {}) {
    const s = typeof e == "object" ? e : n;
    (!s.transports || s.transports && typeof s.transports[0] == "string") && (s.transports = (s.transports || ["polling", "websocket", "webtransport"]).map((i) => ff[i]).filter((i) => !!i)), super(e, s);
  }
};
function yf(t, e = "", n) {
  let s = t;
  n = n || typeof location < "u" && location, t == null && (t = n.protocol + "//" + n.host), typeof t == "string" && (t.charAt(0) === "/" && (t.charAt(1) === "/" ? t = n.protocol + t : t = n.host + t), /^(https?|wss?):\/\//.test(t) || (typeof n < "u" ? t = n.protocol + "//" + t : t = "https://" + t), s = ci(t)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
  const r = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return s.id = s.protocol + "://" + r + ":" + s.port + e, s.href = s.protocol + "://" + r + (n && n.port === s.port ? "" : ":" + s.port), s;
}
const bf = typeof ArrayBuffer == "function", vf = (t) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer, kl = Object.prototype.toString, wf = typeof Blob == "function" || typeof Blob < "u" && kl.call(Blob) === "[object BlobConstructor]", kf = typeof File == "function" || typeof File < "u" && kl.call(File) === "[object FileConstructor]";
function Hi(t) {
  return bf && (t instanceof ArrayBuffer || vf(t)) || wf && t instanceof Blob || kf && t instanceof File;
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
  if (Hi(t))
    return !0;
  if (t.toJSON && typeof t.toJSON == "function" && arguments.length === 1)
    return is(t.toJSON(), !0);
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n) && is(t[n]))
      return !0;
  return !1;
}
function xf(t) {
  const e = [], n = t.data, s = t;
  return s.data = fi(n, e), s.attachments = e.length, { packet: s, buffers: e };
}
function fi(t, e) {
  if (!t)
    return t;
  if (Hi(t)) {
    const n = { _placeholder: !0, num: e.length };
    return e.push(t), n;
  } else if (Array.isArray(t)) {
    const n = new Array(t.length);
    for (let s = 0; s < t.length; s++)
      n[s] = fi(t[s], e);
    return n;
  } else if (typeof t == "object" && !(t instanceof Date)) {
    const n = {};
    for (const s in t)
      Object.prototype.hasOwnProperty.call(t, s) && (n[s] = fi(t[s], e));
    return n;
  }
  return t;
}
function Sf(t, e) {
  return t.data = hi(t.data, e), delete t.attachments, t;
}
function hi(t, e) {
  if (!t)
    return t;
  if (t && t._placeholder === !0) {
    if (typeof t.num == "number" && t.num >= 0 && t.num < e.length)
      return e[t.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(t))
    for (let n = 0; n < t.length; n++)
      t[n] = hi(t[n], e);
  else if (typeof t == "object")
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (t[n] = hi(t[n], e));
  return t;
}
const Cf = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], Tf = 5;
var ue;
(function(t) {
  t[t.CONNECT = 0] = "CONNECT", t[t.DISCONNECT = 1] = "DISCONNECT", t[t.EVENT = 2] = "EVENT", t[t.ACK = 3] = "ACK", t[t.CONNECT_ERROR = 4] = "CONNECT_ERROR", t[t.BINARY_EVENT = 5] = "BINARY_EVENT", t[t.BINARY_ACK = 6] = "BINARY_ACK";
})(ue || (ue = {}));
class Af {
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
    return (e.type === ue.EVENT || e.type === ue.ACK) && is(e) ? this.encodeAsBinary({
      type: e.type === ue.EVENT ? ue.BINARY_EVENT : ue.BINARY_ACK,
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
    return (e.type === ue.BINARY_EVENT || e.type === ue.BINARY_ACK) && (n += e.attachments + "-"), e.nsp && e.nsp !== "/" && (n += e.nsp + ","), e.id != null && (n += e.id), e.data != null && (n += JSON.stringify(e.data, this.replacer)), n;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(e) {
    const n = xf(e), s = this.encodeAsString(n.packet), i = n.buffers;
    return i.unshift(s), i;
  }
}
function Wr(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
class Ui extends Ne {
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
      const s = n.type === ue.BINARY_EVENT;
      s || n.type === ue.BINARY_ACK ? (n.type = s ? ue.EVENT : ue.ACK, this.reconstructor = new Ef(n), n.attachments === 0 && super.emitReserved("decoded", n)) : super.emitReserved("decoded", n);
    } else if (Hi(e) || e.base64)
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
    if (ue[s.type] === void 0)
      throw new Error("unknown packet type " + s.type);
    if (s.type === ue.BINARY_EVENT || s.type === ue.BINARY_ACK) {
      const r = n + 1;
      for (; e.charAt(++n) !== "-" && n != e.length; )
        ;
      const o = e.substring(r, n);
      if (o != Number(o) || e.charAt(n) !== "-")
        throw new Error("Illegal attachments");
      s.attachments = Number(o);
    }
    if (e.charAt(n + 1) === "/") {
      const r = n + 1;
      for (; ++n && !(e.charAt(n) === "," || n === e.length); )
        ;
      s.nsp = e.substring(r, n);
    } else
      s.nsp = "/";
    const i = e.charAt(n + 1);
    if (i !== "" && Number(i) == i) {
      const r = n + 1;
      for (; ++n; ) {
        const o = e.charAt(n);
        if (o == null || Number(o) != o) {
          --n;
          break;
        }
        if (n === e.length)
          break;
      }
      s.id = Number(e.substring(r, n + 1));
    }
    if (e.charAt(++n)) {
      const r = this.tryParse(e.substr(n));
      if (Ui.isPayloadValid(s.type, r))
        s.data = r;
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
      case ue.CONNECT:
        return Wr(n);
      case ue.DISCONNECT:
        return n === void 0;
      case ue.CONNECT_ERROR:
        return typeof n == "string" || Wr(n);
      case ue.EVENT:
      case ue.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && Cf.indexOf(n[0]) === -1);
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
class Ef {
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
      const n = Sf(this.reconPack, this.buffers);
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
const Rf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Ui,
  Encoder: Af,
  get PacketType() {
    return ue;
  },
  protocol: Tf
}, Symbol.toStringTag, { value: "Module" }));
function _t(t, e, n) {
  return t.on(e, n), function() {
    t.off(e, n);
  };
}
const If = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class xl extends Ne {
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
      _t(e, "open", this.onopen.bind(this)),
      _t(e, "packet", this.onpacket.bind(this)),
      _t(e, "error", this.onerror.bind(this)),
      _t(e, "close", this.onclose.bind(this))
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
    var s, i, r;
    if (If.hasOwnProperty(e))
      throw new Error('"' + e.toString() + '" is a reserved event name');
    if (n.unshift(e), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const o = {
      type: ue.EVENT,
      data: n
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
      const c = this.ids++, d = n.pop();
      this._registerAckCallback(c, d), o.id = c;
    }
    const l = (i = (s = this.io.engine) === null || s === void 0 ? void 0 : s.transport) === null || i === void 0 ? void 0 : i.writable, a = this.connected && !(!((r = this.io.engine) === null || r === void 0) && r._hasPingExpired());
    return this.flags.volatile && !l || (a ? (this.notifyOutgoingListeners(o), this.packet(o)) : this.sendBuffer.push(o)), this.flags = {}, this;
  }
  /**
   * @private
   */
  _registerAckCallback(e, n) {
    var s;
    const i = (s = this.flags.timeout) !== null && s !== void 0 ? s : this._opts.ackTimeout;
    if (i === void 0) {
      this.acks[e] = n;
      return;
    }
    const r = this.io.setTimeoutFn(() => {
      delete this.acks[e];
      for (let l = 0; l < this.sendBuffer.length; l++)
        this.sendBuffer[l].id === e && this.sendBuffer.splice(l, 1);
      n.call(this, new Error("operation has timed out"));
    }, i), o = (...l) => {
      this.io.clearTimeoutFn(r), n.apply(this, l);
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
    return new Promise((s, i) => {
      const r = (o, l) => o ? i(o) : s(l);
      r.withError = !0, n.push(r), this.emit(e, ...n);
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
    e.push((i, ...r) => s !== this._queue[0] ? void 0 : (i !== null ? s.tryCount > this._opts.retries && (this._queue.shift(), n && n(i)) : (this._queue.shift(), n && n(null, ...r)), s.pending = !1, this._drainQueue())), this._queue.push(s), this._drainQueue();
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
      type: ue.CONNECT,
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
        case ue.CONNECT:
          e.data && e.data.sid ? this.onconnect(e.data.sid, e.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case ue.EVENT:
        case ue.BINARY_EVENT:
          this.onevent(e);
          break;
        case ue.ACK:
        case ue.BINARY_ACK:
          this.onack(e);
          break;
        case ue.DISCONNECT:
          this.ondisconnect();
          break;
        case ue.CONNECT_ERROR:
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
    return function(...i) {
      s || (s = !0, n.packet({
        type: ue.ACK,
        id: e,
        data: i
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
function bn(t) {
  t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
}
bn.prototype.duration = function() {
  var t = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var e = Math.random(), n = Math.floor(e * this.jitter * t);
    t = Math.floor(e * 10) & 1 ? t + n : t - n;
  }
  return Math.min(t, this.max) | 0;
};
bn.prototype.reset = function() {
  this.attempts = 0;
};
bn.prototype.setMin = function(t) {
  this.ms = t;
};
bn.prototype.setMax = function(t) {
  this.max = t;
};
bn.prototype.setJitter = function(t) {
  this.jitter = t;
};
class di extends Ne {
  constructor(e, n) {
    var s;
    super(), this.nsps = {}, this.subs = [], e && typeof e == "object" && (n = e, e = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, Rs(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5), this.backoff = new bn({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = e;
    const i = n.parser || Rf;
    this.encoder = new i.Encoder(), this.decoder = new i.Decoder(), this._autoConnect = n.autoConnect !== !1, this._autoConnect && this.open();
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
    this.engine = new _f(this.uri, this.opts);
    const n = this.engine, s = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const i = _t(n, "open", function() {
      s.onopen(), e && e();
    }), r = (l) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", l), e ? e(l) : this.maybeReconnectOnOpen();
    }, o = _t(n, "error", r);
    if (this._timeout !== !1) {
      const l = this._timeout, a = this.setTimeoutFn(() => {
        i(), r(new Error("timeout")), n.close();
      }, l);
      this.opts.autoUnref && a.unref(), this.subs.push(() => {
        this.clearTimeoutFn(a);
      });
    }
    return this.subs.push(i), this.subs.push(o), this;
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
      _t(e, "ping", this.onping.bind(this)),
      _t(e, "data", this.ondata.bind(this)),
      _t(e, "error", this.onerror.bind(this)),
      _t(e, "close", this.onclose.bind(this)),
      // @ts-ignore
      _t(this.decoder, "decoded", this.ondecoded.bind(this))
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
    Es(() => {
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
    return s ? this._autoConnect && !s.active && s.connect() : (s = new xl(this, e, n), this.nsps[e] = s), s;
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
        e.skipReconnect || (this.emitReserved("reconnect_attempt", e.backoff.attempts), !e.skipReconnect && e.open((i) => {
          i ? (e._reconnecting = !1, e.reconnect(), this.emitReserved("reconnect_error", i)) : e.onreconnect();
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
const Cn = {};
function rs(t, e) {
  typeof t == "object" && (e = t, t = void 0), e = e || {};
  const n = yf(t, e.path || "/socket.io"), s = n.source, i = n.id, r = n.path, o = Cn[i] && r in Cn[i].nsps, l = e.forceNew || e["force new connection"] || e.multiplex === !1 || o;
  let a;
  return l ? a = new di(s, e) : (Cn[i] || (Cn[i] = new di(s, e)), a = Cn[i]), n.query && !e.query && (e.query = n.queryKey), a.socket(n.path, e);
}
Object.assign(rs, {
  Manager: di,
  Socket: xl,
  io: rs,
  connect: rs
});
function Of() {
  const t = ge([]), e = ge(!1), n = ge(""), s = ge(!1), i = ge(!1), r = ge(!1), o = ge("connecting"), l = ge(0), a = 5, f = ge({}), c = ge(null);
  let d = null, w = null, S = null, q = null;
  const F = (D) => {
    const Te = localStorage.getItem("ctid");
    return d = rs(`${gs.WS_URL}/widget`, {
      transports: ["websocket"],
      reconnection: !0,
      reconnectionAttempts: a,
      reconnectionDelay: 1e3,
      auth: Te ? {
        conversation_token: Te
      } : void 0
    }), d.on("connect", () => {
      o.value = "connected", l.value = 0;
    }), d.on("disconnect", () => {
      o.value === "connected" && (o.value = "connecting");
    }), d.on("connect_error", () => {
      l.value++, console.error("Socket connection failed, attempt:", l.value), l.value >= a && (o.value = "failed");
    }), d.on("chat_response", (W) => {
      e.value = !1, W.type === "agent_message" ? t.value.push({
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
      }) : W.shopify_output && typeof W.shopify_output == "object" && W.shopify_output.products ? t.value.push({
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
      }) : t.value.push({
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
    }), d.on("handle_taken_over", (W) => {
      t.value.push({
        message: `${W.user_name} joined the conversation`,
        message_type: "system",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: W.session_id
      }), f.value = {
        ...f.value,
        human_agent_name: W.user_name,
        human_agent_profile_pic: W.profile_picture
      }, w && w(W);
    }), d.on("error", ie), d.on("chat_history", qe), d.on("rating_submitted", _e), d.on("display_form", $e), d.on("form_submitted", pt), d.on("workflow_state", Ze), d.on("workflow_proceeded", gt), d;
  }, te = async () => {
    try {
      return o.value = "connecting", l.value = 0, d && (d.removeAllListeners(), d.disconnect(), d = null), d = F(""), new Promise((D) => {
        d == null || d.on("connect", () => {
          D(!0);
        }), d == null || d.on("connect_error", () => {
          l.value >= a && D(!1);
        });
      });
    } catch (D) {
      return console.error("Socket initialization failed:", D), o.value = "failed", !1;
    }
  }, ne = () => (d && d.disconnect(), te()), de = (D) => {
    w = D;
  }, me = (D) => {
    S = D;
  }, U = (D) => {
    q = D;
  }, ie = (D) => {
    e.value = !1, n.value = eu(D), s.value = !0, setTimeout(() => {
      s.value = !1, n.value = "";
    }, 5e3);
  }, qe = (D) => {
    if (D.type === "chat_history" && Array.isArray(D.messages)) {
      const Te = D.messages.map((W) => {
        var vt;
        const Ae = {
          message: W.message,
          message_type: W.message_type,
          created_at: W.created_at,
          session_id: "",
          agent_name: W.agent_name || "",
          user_name: W.user_name || "",
          attributes: W.attributes || {}
        };
        return (vt = W.attributes) != null && vt.shopify_output && typeof W.attributes.shopify_output == "object" ? {
          ...Ae,
          message_type: "product",
          shopify_output: W.attributes.shopify_output
        } : Ae;
      });
      t.value = [
        ...Te.filter(
          (W) => !t.value.some(
            (Ae) => Ae.message === W.message && Ae.created_at === W.created_at
          )
        ),
        ...t.value
      ];
    }
  }, _e = (D) => {
    D.success && t.value.push({
      message: "Thank you for your feedback!",
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    });
  }, $e = (D) => {
    var Te;
    console.log("Form display handler in composable:", D), e.value = !1, c.value = D.form_data, console.log("Set currentForm in handleDisplayForm:", c.value), ((Te = D.form_data) == null ? void 0 : Te.form_full_screen) === !0 ? (console.log("Full screen form detected, triggering workflow state callback"), S && S({
      type: "form",
      form_data: D.form_data,
      session_id: D.session_id
    })) : t.value.push({
      message: "",
      message_type: "form",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: D.session_id,
      attributes: {
        form_data: D.form_data
      }
    });
  }, pt = (D) => {
    console.log("Form submitted confirmation received, clearing currentForm"), c.value = null, D.success && console.log("Form submitted successfully");
  }, Ze = (D) => {
    console.log("Workflow state received in composable:", D), (D.type === "form" || D.type === "display_form") && (console.log("Setting currentForm from workflow state:", D.form_data), c.value = D.form_data), S && S(D);
  }, gt = (D) => {
    console.log("Workflow proceeded in composable:", D), q && q(D);
  };
  return {
    messages: t,
    loading: e,
    errorMessage: n,
    showError: s,
    loadingHistory: i,
    hasStartedChat: r,
    connectionStatus: o,
    sendMessage: async (D, Te) => {
      !d || !D.trim() || (f.value.human_agent_name || (e.value = !0), t.value.push({
        message: D,
        message_type: "user",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: ""
      }), d.emit("chat", {
        message: D,
        email: Te
      }), r.value = !0);
    },
    loadChatHistory: async () => {
      if (d)
        try {
          i.value = !0, d.emit("get_chat_history");
        } catch (D) {
          console.error("Failed to load chat history:", D);
        } finally {
          i.value = !1;
        }
    },
    connect: te,
    reconnect: ne,
    cleanup: () => {
      d && (d.removeAllListeners(), d.disconnect(), d = null), w = null, S = null, q = null;
    },
    humanAgent: f,
    onTakeover: de,
    submitRating: async (D, Te) => {
      !d || !D || d.emit("submit_rating", {
        rating: D,
        feedback: Te
      });
    },
    currentForm: c,
    submitForm: async (D) => {
      if (console.log("Submitting form in socket:", D), console.log("Current form in socket:", c.value), console.log("Socket in socket:", d), !d) {
        console.error("No socket available for form submission");
        return;
      }
      if (!D || Object.keys(D).length === 0) {
        console.error("No form data to submit");
        return;
      }
      console.log("Emitting submit_form event with data:", D), d.emit("submit_form", {
        form_data: D
      }), c.value = null;
    },
    getWorkflowState: async () => {
      d && (console.log("Getting workflow state 12"), d.emit("get_workflow_state"));
    },
    proceedWorkflow: async () => {
      d && d.emit("proceed_workflow", {});
    },
    onWorkflowState: me,
    onWorkflowProceeded: U
  };
}
function Lf(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Ks = { exports: {} }, Kr;
function Pf() {
  return Kr || (Kr = 1, function(t) {
    (function() {
      function e(u, m, x) {
        return u.call.apply(u.bind, arguments);
      }
      function n(u, m, x) {
        if (!u) throw Error();
        if (2 < arguments.length) {
          var y = Array.prototype.slice.call(arguments, 2);
          return function() {
            var I = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(I, y), u.apply(m, I);
          };
        }
        return function() {
          return u.apply(m, arguments);
        };
      }
      function s(u, m, x) {
        return s = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? e : n, s.apply(null, arguments);
      }
      var i = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function r(u, m) {
        this.a = u, this.o = m || u, this.c = this.o.document;
      }
      var o = !!window.FontFace;
      function l(u, m, x, y) {
        if (m = u.c.createElement(m), x) for (var I in x) x.hasOwnProperty(I) && (I == "style" ? m.style.cssText = x[I] : m.setAttribute(I, x[I]));
        return y && m.appendChild(u.c.createTextNode(y)), m;
      }
      function a(u, m, x) {
        u = u.c.getElementsByTagName(m)[0], u || (u = document.documentElement), u.insertBefore(x, u.lastChild);
      }
      function f(u) {
        u.parentNode && u.parentNode.removeChild(u);
      }
      function c(u, m, x) {
        m = m || [], x = x || [];
        for (var y = u.className.split(/\s+/), I = 0; I < m.length; I += 1) {
          for (var z = !1, K = 0; K < y.length; K += 1) if (m[I] === y[K]) {
            z = !0;
            break;
          }
          z || y.push(m[I]);
        }
        for (m = [], I = 0; I < y.length; I += 1) {
          for (z = !1, K = 0; K < x.length; K += 1) if (y[I] === x[K]) {
            z = !0;
            break;
          }
          z || m.push(y[I]);
        }
        u.className = m.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function d(u, m) {
        for (var x = u.className.split(/\s+/), y = 0, I = x.length; y < I; y++) if (x[y] == m) return !0;
        return !1;
      }
      function w(u) {
        return u.o.location.hostname || u.a.location.hostname;
      }
      function S(u, m, x) {
        function y() {
          pe && I && z && (pe(K), pe = null);
        }
        m = l(u, "link", { rel: "stylesheet", href: m, media: "all" });
        var I = !1, z = !0, K = null, pe = x || null;
        o ? (m.onload = function() {
          I = !0, y();
        }, m.onerror = function() {
          I = !0, K = Error("Stylesheet failed to load"), y();
        }) : setTimeout(function() {
          I = !0, y();
        }, 0), a(u, "head", m);
      }
      function q(u, m, x, y) {
        var I = u.c.getElementsByTagName("head")[0];
        if (I) {
          var z = l(u, "script", { src: m }), K = !1;
          return z.onload = z.onreadystatechange = function() {
            K || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (K = !0, x && x(null), z.onload = z.onreadystatechange = null, z.parentNode.tagName == "HEAD" && I.removeChild(z));
          }, I.appendChild(z), setTimeout(function() {
            K || (K = !0, x && x(Error("Script load timeout")));
          }, y || 5e3), z;
        }
        return null;
      }
      function F() {
        this.a = 0, this.c = null;
      }
      function te(u) {
        return u.a++, function() {
          u.a--, de(u);
        };
      }
      function ne(u, m) {
        u.c = m, de(u);
      }
      function de(u) {
        u.a == 0 && u.c && (u.c(), u.c = null);
      }
      function me(u) {
        this.a = u || "-";
      }
      me.prototype.c = function(u) {
        for (var m = [], x = 0; x < arguments.length; x++) m.push(arguments[x].replace(/[\W_]+/g, "").toLowerCase());
        return m.join(this.a);
      };
      function U(u, m) {
        this.c = u, this.f = 4, this.a = "n";
        var x = (m || "n4").match(/^([nio])([1-9])$/i);
        x && (this.a = x[1], this.f = parseInt(x[2], 10));
      }
      function ie(u) {
        return $e(u) + " " + (u.f + "00") + " 300px " + qe(u.c);
      }
      function qe(u) {
        var m = [];
        u = u.split(/,\s*/);
        for (var x = 0; x < u.length; x++) {
          var y = u[x].replace(/['"]/g, "");
          y.indexOf(" ") != -1 || /^\d/.test(y) ? m.push("'" + y + "'") : m.push(y);
        }
        return m.join(",");
      }
      function _e(u) {
        return u.a + u.f;
      }
      function $e(u) {
        var m = "normal";
        return u.a === "o" ? m = "oblique" : u.a === "i" && (m = "italic"), m;
      }
      function pt(u) {
        var m = 4, x = "n", y = null;
        return u && ((y = u.match(/(normal|oblique|italic)/i)) && y[1] && (x = y[1].substr(0, 1).toLowerCase()), (y = u.match(/([1-9]00|normal|bold)/i)) && y[1] && (/bold/i.test(y[1]) ? m = 7 : /[1-9]00/.test(y[1]) && (m = parseInt(y[1].substr(0, 1), 10)))), x + m;
      }
      function Ze(u, m) {
        this.c = u, this.f = u.o.document.documentElement, this.h = m, this.a = new me("-"), this.j = m.events !== !1, this.g = m.classes !== !1;
      }
      function gt(u) {
        u.g && c(u.f, [u.a.c("wf", "loading")]), Xe(u, "loading");
      }
      function bt(u) {
        if (u.g) {
          var m = d(u.f, u.a.c("wf", "active")), x = [], y = [u.a.c("wf", "loading")];
          m || x.push(u.a.c("wf", "inactive")), c(u.f, x, y);
        }
        Xe(u, "inactive");
      }
      function Xe(u, m, x) {
        u.j && u.h[m] && (x ? u.h[m](x.c, _e(x)) : u.h[m]());
      }
      function He() {
        this.c = {};
      }
      function Mt(u, m, x) {
        var y = [], I;
        for (I in m) if (m.hasOwnProperty(I)) {
          var z = u.c[I];
          z && y.push(z(m[I], x));
        }
        return y;
      }
      function se(u, m) {
        this.c = u, this.f = m, this.a = l(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function X(u) {
        a(u.c, "body", u.a);
      }
      function re(u) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + qe(u.c) + ";" + ("font-style:" + $e(u) + ";font-weight:" + (u.f + "00") + ";");
      }
      function D(u, m, x, y, I, z) {
        this.g = u, this.j = m, this.a = y, this.c = x, this.f = I || 3e3, this.h = z || void 0;
      }
      D.prototype.start = function() {
        var u = this.c.o.document, m = this, x = i(), y = new Promise(function(K, pe) {
          function G() {
            i() - x >= m.f ? pe() : u.fonts.load(ie(m.a), m.h).then(function(Re) {
              1 <= Re.length ? K() : setTimeout(G, 25);
            }, function() {
              pe();
            });
          }
          G();
        }), I = null, z = new Promise(function(K, pe) {
          I = setTimeout(pe, m.f);
        });
        Promise.race([z, y]).then(function() {
          I && (clearTimeout(I), I = null), m.g(m.a);
        }, function() {
          m.j(m.a);
        });
      };
      function Te(u, m, x, y, I, z, K) {
        this.v = u, this.B = m, this.c = x, this.a = y, this.s = K || "BESbswy", this.f = {}, this.w = I || 3e3, this.u = z || null, this.m = this.j = this.h = this.g = null, this.g = new se(this.c, this.s), this.h = new se(this.c, this.s), this.j = new se(this.c, this.s), this.m = new se(this.c, this.s), u = new U(this.a.c + ",serif", _e(this.a)), u = re(u), this.g.a.style.cssText = u, u = new U(this.a.c + ",sans-serif", _e(this.a)), u = re(u), this.h.a.style.cssText = u, u = new U("serif", _e(this.a)), u = re(u), this.j.a.style.cssText = u, u = new U("sans-serif", _e(this.a)), u = re(u), this.m.a.style.cssText = u, X(this.g), X(this.h), X(this.j), X(this.m);
      }
      var W = { D: "serif", C: "sans-serif" }, Ae = null;
      function vt() {
        if (Ae === null) {
          var u = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          Ae = !!u && (536 > parseInt(u[1], 10) || parseInt(u[1], 10) === 536 && 11 >= parseInt(u[2], 10));
        }
        return Ae;
      }
      Te.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = i(), lt(this);
      };
      function Dt(u, m, x) {
        for (var y in W) if (W.hasOwnProperty(y) && m === u.f[W[y]] && x === u.f[W[y]]) return !0;
        return !1;
      }
      function lt(u) {
        var m = u.g.a.offsetWidth, x = u.h.a.offsetWidth, y;
        (y = m === u.f.serif && x === u.f["sans-serif"]) || (y = vt() && Dt(u, m, x)), y ? i() - u.A >= u.w ? vt() && Dt(u, m, x) && (u.u === null || u.u.hasOwnProperty(u.a.c)) ? wt(u, u.v) : wt(u, u.B) : et(u) : wt(u, u.v);
      }
      function et(u) {
        setTimeout(s(function() {
          lt(this);
        }, u), 50);
      }
      function wt(u, m) {
        setTimeout(s(function() {
          f(this.g.a), f(this.h.a), f(this.j.a), f(this.m.a), m(this.a);
        }, u), 0);
      }
      function at(u, m, x) {
        this.c = u, this.a = m, this.f = 0, this.m = this.j = !1, this.s = x;
      }
      var Lt = null;
      at.prototype.g = function(u) {
        var m = this.a;
        m.g && c(m.f, [m.a.c("wf", u.c, _e(u).toString(), "active")], [m.a.c("wf", u.c, _e(u).toString(), "loading"), m.a.c("wf", u.c, _e(u).toString(), "inactive")]), Xe(m, "fontactive", u), this.m = !0, tt(this);
      }, at.prototype.h = function(u) {
        var m = this.a;
        if (m.g) {
          var x = d(m.f, m.a.c("wf", u.c, _e(u).toString(), "active")), y = [], I = [m.a.c("wf", u.c, _e(u).toString(), "loading")];
          x || y.push(m.a.c("wf", u.c, _e(u).toString(), "inactive")), c(m.f, y, I);
        }
        Xe(m, "fontinactive", u), tt(this);
      };
      function tt(u) {
        --u.f == 0 && u.j && (u.m ? (u = u.a, u.g && c(u.f, [u.a.c("wf", "active")], [u.a.c("wf", "loading"), u.a.c("wf", "inactive")]), Xe(u, "active")) : bt(u.a));
      }
      function Qt(u) {
        this.j = u, this.a = new He(), this.h = 0, this.f = this.g = !0;
      }
      Qt.prototype.load = function(u) {
        this.c = new r(this.j, u.context || this.j), this.g = u.events !== !1, this.f = u.classes !== !1, p(this, new Ze(this.c, u), u);
      };
      function h(u, m, x, y, I) {
        var z = --u.h == 0;
        (u.f || u.g) && setTimeout(function() {
          var K = I || null, pe = y || null || {};
          if (x.length === 0 && z) bt(m.a);
          else {
            m.f += x.length, z && (m.j = z);
            var G, Re = [];
            for (G = 0; G < x.length; G++) {
              var xe = x[G], Ve = pe[xe.c], nt = m.a, qt = xe;
              if (nt.g && c(nt.f, [nt.a.c("wf", qt.c, _e(qt).toString(), "loading")]), Xe(nt, "fontloading", qt), nt = null, Lt === null) if (window.FontFace) {
                var qt = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), Is = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                Lt = qt ? 42 < parseInt(qt[1], 10) : !Is;
              } else Lt = !1;
              Lt ? nt = new D(s(m.g, m), s(m.h, m), m.c, xe, m.s, Ve) : nt = new Te(s(m.g, m), s(m.h, m), m.c, xe, m.s, K, Ve), Re.push(nt);
            }
            for (G = 0; G < Re.length; G++) Re[G].start();
          }
        }, 0);
      }
      function p(u, m, x) {
        var I = [], y = x.timeout;
        gt(m);
        var I = Mt(u.a, x, u.c), z = new at(u.c, m, y);
        for (u.h = I.length, m = 0, x = I.length; m < x; m++) I[m].load(function(K, pe, G) {
          h(u, z, K, pe, G);
        });
      }
      function b(u, m) {
        this.c = u, this.a = m;
      }
      b.prototype.load = function(u) {
        function m() {
          if (z["__mti_fntLst" + y]) {
            var K = z["__mti_fntLst" + y](), pe = [], G;
            if (K) for (var Re = 0; Re < K.length; Re++) {
              var xe = K[Re].fontfamily;
              K[Re].fontStyle != null && K[Re].fontWeight != null ? (G = K[Re].fontStyle + K[Re].fontWeight, pe.push(new U(xe, G))) : pe.push(new U(xe));
            }
            u(pe);
          } else setTimeout(function() {
            m();
          }, 50);
        }
        var x = this, y = x.a.projectId, I = x.a.version;
        if (y) {
          var z = x.c.o;
          q(this.c, (x.a.api || "https://fast.fonts.net/jsapi") + "/" + y + ".js" + (I ? "?v=" + I : ""), function(K) {
            K ? u([]) : (z["__MonotypeConfiguration__" + y] = function() {
              return x.a;
            }, m());
          }).id = "__MonotypeAPIScript__" + y;
        } else u([]);
      };
      function A(u, m) {
        this.c = u, this.a = m;
      }
      A.prototype.load = function(u) {
        var m, x, y = this.a.urls || [], I = this.a.families || [], z = this.a.testStrings || {}, K = new F();
        for (m = 0, x = y.length; m < x; m++) S(this.c, y[m], te(K));
        var pe = [];
        for (m = 0, x = I.length; m < x; m++) if (y = I[m].split(":"), y[1]) for (var G = y[1].split(","), Re = 0; Re < G.length; Re += 1) pe.push(new U(y[0], G[Re]));
        else pe.push(new U(y[0]));
        ne(K, function() {
          u(pe, z);
        });
      };
      function T(u, m) {
        u ? this.c = u : this.c = E, this.a = [], this.f = [], this.g = m || "";
      }
      var E = "https://fonts.googleapis.com/css";
      function N(u, m) {
        for (var x = m.length, y = 0; y < x; y++) {
          var I = m[y].split(":");
          I.length == 3 && u.f.push(I.pop());
          var z = "";
          I.length == 2 && I[1] != "" && (z = ":"), u.a.push(I.join(z));
        }
      }
      function L(u) {
        if (u.a.length == 0) throw Error("No fonts to load!");
        if (u.c.indexOf("kit=") != -1) return u.c;
        for (var m = u.a.length, x = [], y = 0; y < m; y++) x.push(u.a[y].replace(/ /g, "+"));
        return m = u.c + "?family=" + x.join("%7C"), 0 < u.f.length && (m += "&subset=" + u.f.join(",")), 0 < u.g.length && (m += "&text=" + encodeURIComponent(u.g)), m;
      }
      function P(u) {
        this.f = u, this.a = [], this.c = {};
      }
      var C = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, j = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, R = { i: "i", italic: "i", n: "n", normal: "n" }, M = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function V(u) {
        for (var m = u.f.length, x = 0; x < m; x++) {
          var y = u.f[x].split(":"), I = y[0].replace(/\+/g, " "), z = ["n4"];
          if (2 <= y.length) {
            var K, pe = y[1];
            if (K = [], pe) for (var pe = pe.split(","), G = pe.length, Re = 0; Re < G; Re++) {
              var xe;
              if (xe = pe[Re], xe.match(/^[\w-]+$/)) {
                var Ve = M.exec(xe.toLowerCase());
                if (Ve == null) xe = "";
                else {
                  if (xe = Ve[2], xe = xe == null || xe == "" ? "n" : R[xe], Ve = Ve[1], Ve == null || Ve == "") Ve = "4";
                  else var nt = j[Ve], Ve = nt || (isNaN(Ve) ? "4" : Ve.substr(0, 1));
                  xe = [xe, Ve].join("");
                }
              } else xe = "";
              xe && K.push(xe);
            }
            0 < K.length && (z = K), y.length == 3 && (y = y[2], K = [], y = y ? y.split(",") : K, 0 < y.length && (y = C[y[0]]) && (u.c[I] = y));
          }
          for (u.c[I] || (y = C[I]) && (u.c[I] = y), y = 0; y < z.length; y += 1) u.a.push(new U(I, z[y]));
        }
      }
      function Z(u, m) {
        this.c = u, this.a = m;
      }
      var ae = { Arimo: !0, Cousine: !0, Tinos: !0 };
      Z.prototype.load = function(u) {
        var m = new F(), x = this.c, y = new T(this.a.api, this.a.text), I = this.a.families;
        N(y, I);
        var z = new P(I);
        V(z), S(x, L(y), te(m)), ne(m, function() {
          u(z.a, z.c, ae);
        });
      };
      function ce(u, m) {
        this.c = u, this.a = m;
      }
      ce.prototype.load = function(u) {
        var m = this.a.id, x = this.c.o;
        m ? q(this.c, (this.a.api || "https://use.typekit.net") + "/" + m + ".js", function(y) {
          if (y) u([]);
          else if (x.Typekit && x.Typekit.config && x.Typekit.config.fn) {
            y = x.Typekit.config.fn;
            for (var I = [], z = 0; z < y.length; z += 2) for (var K = y[z], pe = y[z + 1], G = 0; G < pe.length; G++) I.push(new U(K, pe[G]));
            try {
              x.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            u(I);
          }
        }, 2e3) : u([]);
      };
      function Ee(u, m) {
        this.c = u, this.f = m, this.a = [];
      }
      Ee.prototype.load = function(u) {
        var m = this.f.id, x = this.c.o, y = this;
        m ? (x.__webfontfontdeckmodule__ || (x.__webfontfontdeckmodule__ = {}), x.__webfontfontdeckmodule__[m] = function(I, z) {
          for (var K = 0, pe = z.fonts.length; K < pe; ++K) {
            var G = z.fonts[K];
            y.a.push(new U(G.name, pt("font-weight:" + G.weight + ";font-style:" + G.style)));
          }
          u(y.a);
        }, q(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + w(this.c) + "/" + m + ".js", function(I) {
          I && u([]);
        })) : u([]);
      };
      var ee = new Qt(window);
      ee.a.c.custom = function(u, m) {
        return new A(m, u);
      }, ee.a.c.fontdeck = function(u, m) {
        return new Ee(m, u);
      }, ee.a.c.monotype = function(u, m) {
        return new b(m, u);
      }, ee.a.c.typekit = function(u, m) {
        return new ce(m, u);
      }, ee.a.c.google = function(u, m) {
        return new Z(m, u);
      };
      var Ue = { load: s(ee.load, ee) };
      t.exports ? t.exports = Ue : (window.WebFont = Ue, window.WebFontConfig && ee.load(window.WebFontConfig));
    })();
  }(Ks)), Ks.exports;
}
var $f = Pf();
const Ff = /* @__PURE__ */ Lf($f);
function Bf() {
  const t = ge({}), e = ge(""), n = (i) => {
    t.value = i, i.photo_url && (t.value.photo_url = i.photo_url), i.font_family && Ff.load({
      google: {
        families: [i.font_family]
      },
      active: () => {
        const r = document.querySelector(".chat-container");
        r && (r.style.fontFamily = `"${i.font_family}", system-ui, sans-serif`);
      }
    }), window.parent.postMessage({
      type: "CUSTOMIZATION_UPDATE",
      data: {
        chat_bubble_color: i.chat_bubble_color || "#f34611"
      }
    }, "*");
  };
  return {
    customization: t,
    agentName: e,
    applyCustomization: n,
    initializeFromData: () => {
      const i = window.__INITIAL_DATA__;
      i && (n(i.customization || {}), e.value = i.agentName || "");
    }
  };
}
const Nf = {
  key: 0,
  class: "initializing-overlay"
}, Mf = {
  key: 0,
  class: "connecting-message"
}, Df = {
  key: 1,
  class: "failed-message"
}, qf = { class: "welcome-content" }, Vf = { class: "welcome-header" }, Hf = ["src", "alt"], Uf = { class: "welcome-title" }, jf = { class: "welcome-subtitle" }, zf = { class: "welcome-input-container" }, Wf = {
  key: 0,
  class: "email-input"
}, Kf = ["disabled"], Zf = { class: "welcome-message-input" }, Gf = ["placeholder", "disabled"], Yf = ["disabled"], Jf = { class: "landing-page-content" }, Qf = { class: "landing-page-header" }, Xf = { class: "landing-page-heading" }, eh = { class: "landing-page-text" }, th = { class: "landing-page-actions" }, nh = { class: "form-fullscreen-content" }, sh = {
  key: 0,
  class: "form-header"
}, ih = {
  key: 0,
  class: "form-title"
}, rh = {
  key: 1,
  class: "form-description"
}, oh = { class: "form-fields" }, lh = ["for"], ah = {
  key: 0,
  class: "required-indicator"
}, ch = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "autocomplete", "inputmode"], uh = ["id", "placeholder", "required", "min", "max", "value", "onInput"], fh = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput"], hh = ["id", "required", "value", "onChange"], dh = ["value"], ph = {
  key: 4,
  class: "checkbox-field"
}, gh = ["id", "required", "checked", "onChange"], mh = { class: "checkbox-label" }, _h = {
  key: 5,
  class: "radio-group"
}, yh = ["name", "value", "required", "checked", "onChange"], bh = { class: "radio-label" }, vh = {
  key: 6,
  class: "field-error"
}, wh = { class: "form-actions" }, kh = ["disabled"], xh = {
  key: 0,
  class: "loading-spinner-inline"
}, Sh = { key: 1 }, Ch = { class: "header-content" }, Th = ["src", "alt"], Ah = { class: "header-info" }, Eh = { class: "status" }, Rh = {
  key: 1,
  class: "loading-history"
}, Ih = {
  key: 0,
  class: "rating-content"
}, Oh = { class: "rating-prompt" }, Lh = ["onMouseover", "onMouseleave", "onClick", "disabled"], Ph = {
  key: 0,
  class: "feedback-wrapper"
}, $h = { class: "feedback-section" }, Fh = ["onUpdate:modelValue", "disabled"], Bh = { class: "feedback-counter" }, Nh = ["onClick", "disabled"], Mh = {
  key: 1,
  class: "submitted-feedback-wrapper"
}, Dh = { class: "submitted-feedback" }, qh = { class: "submitted-feedback-text" }, Vh = {
  key: 2,
  class: "submitted-message"
}, Hh = {
  key: 1,
  class: "form-content"
}, Uh = {
  key: 0,
  class: "form-header"
}, jh = {
  key: 0,
  class: "form-title"
}, zh = {
  key: 1,
  class: "form-description"
}, Wh = { class: "form-fields" }, Kh = ["for"], Zh = {
  key: 0,
  class: "required-indicator"
}, Gh = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "disabled", "autocomplete", "inputmode"], Yh = ["id", "placeholder", "required", "min", "max", "value", "onInput", "disabled"], Jh = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "disabled"], Qh = ["id", "required", "value", "onChange", "disabled"], Xh = ["value"], ed = {
  key: 4,
  class: "checkbox-field"
}, td = ["id", "checked", "onChange", "disabled"], nd = ["for"], sd = {
  key: 5,
  class: "radio-field"
}, id = ["id", "name", "value", "checked", "onChange", "disabled"], rd = ["for"], od = {
  key: 6,
  class: "field-error"
}, ld = { class: "form-actions" }, ad = ["onClick", "disabled"], cd = {
  key: 2,
  class: "user-input-content"
}, ud = {
  key: 0,
  class: "user-input-prompt"
}, fd = {
  key: 1,
  class: "user-input-form"
}, hd = ["onUpdate:modelValue", "onKeydown"], dd = ["onClick", "disabled"], pd = {
  key: 2,
  class: "user-input-submitted"
}, gd = {
  key: 0,
  class: "user-input-confirmation"
}, md = {
  key: 3,
  class: "product-message-container"
}, _d = ["innerHTML"], yd = {
  key: 1,
  class: "products-carousel"
}, bd = { class: "carousel-items" }, vd = {
  key: 0,
  class: "product-image-compact"
}, wd = ["src", "alt"], kd = { class: "product-info-compact" }, xd = { class: "product-text-area" }, Sd = { class: "product-title-compact" }, Cd = {
  key: 0,
  class: "product-variant-compact"
}, Td = { class: "product-price-compact" }, Ad = { class: "product-actions-compact" }, Ed = ["onClick"], Rd = {
  key: 2,
  class: "no-products-message"
}, Id = {
  key: 3,
  class: "no-products-message"
}, Od = ["innerHTML"], Ld = { class: "message-info" }, Pd = {
  key: 0,
  class: "agent-name"
}, $d = {
  key: 0,
  class: "typing-indicator"
}, Fd = {
  key: 0,
  class: "email-input"
}, Bd = ["disabled"], Nd = { class: "message-input" }, Md = ["placeholder", "disabled"], Dd = ["disabled"], qd = { class: "conversation-ended-message" }, Vd = {
  key: 7,
  class: "rating-dialog"
}, Hd = { class: "rating-content" }, Ud = { class: "star-rating" }, jd = ["onClick"], zd = { class: "rating-actions" }, Wd = ["disabled"], Zs = "ctid", Kd = /* @__PURE__ */ ka({
  __name: "WidgetBuilder",
  props: {
    widgetId: {}
  },
  setup(t) {
    var Wi;
    he.setOptions({
      renderer: new he.Renderer(),
      gfm: !0,
      breaks: !0
    });
    const e = new he.Renderer(), n = e.link;
    e.link = (_, v, g) => n.call(e, _, v, g).replace(/^<a /, '<a target="_blank" rel="nofollow" '), he.use({ renderer: e });
    const s = t, i = De(() => {
      var _;
      return s.widgetId || ((_ = window.__INITIAL_DATA__) == null ? void 0 : _.widgetId);
    }), {
      customization: r,
      agentName: o,
      applyCustomization: l,
      initializeFromData: a
    } = Bf(), {
      messages: f,
      loading: c,
      errorMessage: d,
      showError: w,
      loadingHistory: S,
      hasStartedChat: q,
      connectionStatus: F,
      sendMessage: te,
      loadChatHistory: ne,
      connect: de,
      reconnect: me,
      cleanup: U,
      humanAgent: ie,
      onTakeover: qe,
      submitRating: _e,
      submitForm: $e,
      currentForm: pt,
      getWorkflowState: Ze,
      proceedWorkflow: gt,
      onWorkflowState: bt,
      onWorkflowProceeded: Xe
    } = Of(), He = ge(""), Mt = ge(!0), se = ge(""), X = ge(!1), re = ge(!0), D = ge(((Wi = window.__INITIAL_DATA__) == null ? void 0 : Wi.initialToken) || localStorage.getItem(Zs));
    De(() => !!D.value), a();
    const Te = window.__INITIAL_DATA__;
    Te != null && Te.initialToken && (D.value = Te.initialToken, window.parent.postMessage({
      type: "TOKEN_UPDATE",
      token: Te.initialToken
    }, "*"), X.value = !0);
    const W = ge(null), {
      chatStyles: Ae,
      chatIconStyles: vt,
      agentBubbleStyles: Dt,
      userBubbleStyles: lt,
      messageNameStyles: et,
      headerBorderStyles: wt,
      photoUrl: at,
      shadowStyle: Lt
    } = Bu(r);
    De(() => f.value.some(
      (_) => _.message_type === "form" && (!_.isSubmitted || _.isSubmitted === !1)
    ));
    const tt = De(() => q.value && X.value || st.value ? F.value === "connected" && !c.value : kn(se.value.trim()) && F.value === "connected" && !c.value), Qt = async () => {
      He.value.trim() && (!q.value && se.value && await p(), await te(He.value, se.value), He.value = "");
    }, h = (_) => {
      _.key === "Enter" && !_.shiftKey && (_.preventDefault(), Qt());
    }, p = async () => {
      var _, v, g;
      try {
        if (!i.value)
          return console.error("Widget ID is not available"), !1;
        const oe = new URL(`${gs.API_URL}/widgets/${i.value}`);
        se.value.trim() && kn(se.value.trim()) && oe.searchParams.append("email", se.value.trim());
        const Oe = {
          Accept: "application/json",
          "Content-Type": "application/json"
        };
        D.value && (Oe.Authorization = `Bearer ${D.value}`);
        const J = await fetch(oe, {
          headers: Oe
        });
        if (J.status === 401)
          return X.value = !1, !1;
        const Fe = await J.json();
        return Fe.token && (D.value = Fe.token, localStorage.setItem(Zs, Fe.token), window.parent.postMessage({ type: "TOKEN_UPDATE", token: Fe.token }, "*")), X.value = !0, await de() ? (await b(), (_ = Fe.agent) != null && _.customization && l(Fe.agent.customization), Fe.agent && !(Fe != null && Fe.human_agent) && (o.value = Fe.agent.name), Fe != null && Fe.human_agent && (ie.value = Fe.human_agent), ((v = Fe.agent) == null ? void 0 : v.workflow) !== void 0 && (window.__INITIAL_DATA__ = window.__INITIAL_DATA__ || {}, window.__INITIAL_DATA__.workflow = Fe.agent.workflow), (g = Fe.agent) != null && g.workflow && (console.log("Getting workflow state after authorization"), await Ze()), !0) : (console.error("Failed to connect to chat service"), !1);
      } catch (oe) {
        return console.error("Error checking authorization:", oe), X.value = !1, !1;
      } finally {
        re.value = !1;
      }
    }, b = async () => {
      !q.value && X.value && (q.value = !0, await ne());
    }, A = () => {
      W.value && (W.value.scrollTop = W.value.scrollHeight);
    };
    Qn(() => f.value, (_) => {
      if (wo(() => {
        A();
      }), _.length > 0) {
        const v = _[_.length - 1];
        m(v);
      }
    }, { deep: !0 });
    const T = async () => {
      await me() && await p();
    }, E = ge(!1), N = ge(0), L = ge(""), P = ge(""), C = ge(0), j = ge(!1), R = ge({}), M = ge(!1), V = ge({}), Z = ge(!1), ae = ge(null), ce = ge("Start Chat"), Ee = ge(!1), ee = ge(null);
    De(() => {
      var v;
      const _ = f.value[f.value.length - 1];
      return ((v = _ == null ? void 0 : _.attributes) == null ? void 0 : v.request_rating) || !1;
    });
    const Ue = De(() => {
      var v;
      if (!((v = window.__INITIAL_DATA__) != null && v.workflow))
        return !1;
      const _ = f.value.find((g) => g.message_type === "rating");
      return (_ == null ? void 0 : _.isSubmitted) === !0;
    }), u = De(() => ie.value.human_agent_profile_pic ? ie.value.human_agent_profile_pic.includes("amazonaws.com") ? ie.value.human_agent_profile_pic : `${gs.API_URL}${ie.value.human_agent_profile_pic}` : ""), m = (_) => {
      var v, g, oe;
      if ((v = _.attributes) != null && v.end_chat && ((g = _.attributes) != null && g.request_rating)) {
        const Oe = _.agent_name || ((oe = ie.value) == null ? void 0 : oe.human_agent_name) || o.value || "our agent";
        f.value.push({
          message: `Rate the chat session that you had with ${Oe}`,
          message_type: "rating",
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: _.session_id,
          agent_name: Oe,
          showFeedback: !1
        }), P.value = _.session_id;
      }
    }, x = (_) => {
      j.value || (C.value = _);
    }, y = () => {
      if (!j.value) {
        const _ = f.value[f.value.length - 1];
        C.value = (_ == null ? void 0 : _.selectedRating) || 0;
      }
    }, I = async (_) => {
      if (!j.value) {
        C.value = _;
        const v = f.value[f.value.length - 1];
        v && v.message_type === "rating" && (v.showFeedback = !0, v.selectedRating = _);
      }
    }, z = async (_, v, g = null) => {
      try {
        j.value = !0, await _e(v, g);
        const oe = f.value.find((Oe) => Oe.message_type === "rating");
        oe && (oe.isSubmitted = !0, oe.finalRating = v, oe.finalFeedback = g);
      } catch (oe) {
        console.error("Failed to submit rating:", oe);
      } finally {
        j.value = !1;
      }
    }, K = (_) => {
      const v = {};
      for (const g of _.fields) {
        const oe = R.value[g.name], Oe = xe(g, oe);
        Oe && (v[g.name] = Oe);
      }
      return V.value = v, Object.keys(v).length === 0;
    }, pe = async (_) => {
      if (console.log("handleFormSubmit called with config:", _), console.log("Current form data:", R.value), console.log("isSubmittingForm:", M.value), M.value) {
        console.log("Form submission already in progress, returning");
        return;
      }
      console.log("Validating form...");
      const v = K(_);
      if (console.log("Form validation result:", v), console.log("Form errors:", V.value), !v) {
        console.log("Form validation failed, not submitting");
        return;
      }
      try {
        console.log("Starting form submission..."), M.value = !0, await $e(R.value), console.log("Form submitted successfully");
        const g = f.value.findIndex(
          (oe) => oe.message_type === "form" && (!oe.isSubmitted || oe.isSubmitted === !1)
        );
        g !== -1 && (f.value.splice(g, 1), console.log("Removed form message from chat")), R.value = {}, V.value = {}, console.log("Cleared form data and errors");
      } catch (g) {
        console.error("Failed to submit form:", g);
      } finally {
        M.value = !1, console.log("Form submission completed");
      }
    }, G = (_, v) => {
      var g, oe;
      if (console.log(`Field change: ${_} = `, v), R.value[_] = v, console.log("Updated formData:", R.value), v && v.toString().trim() !== "") {
        let Oe = null;
        if ((g = ee.value) != null && g.fields && (Oe = ee.value.fields.find((J) => J.name === _)), !Oe && ((oe = pt.value) != null && oe.fields) && (Oe = pt.value.fields.find((J) => J.name === _)), Oe) {
          const J = xe(Oe, v);
          J ? (V.value[_] = J, console.log(`Validation error for ${_}:`, J)) : (delete V.value[_], console.log(`Validation passed for ${_}`));
        }
      } else
        delete V.value[_], console.log(`Cleared error for ${_}`);
    }, Re = (_) => {
      const v = _.replace(/\D/g, "");
      return v.length >= 7 && v.length <= 15;
    }, xe = (_, v) => {
      if (_.required && (!v || v.toString().trim() === ""))
        return `${_.label} is required`;
      if (!v || v.toString().trim() === "")
        return null;
      if (_.type === "email" && !kn(v))
        return "Please enter a valid email address";
      if (_.type === "tel" && !Re(v))
        return "Please enter a valid phone number";
      if ((_.type === "text" || _.type === "textarea") && _.minLength && v.length < _.minLength)
        return `${_.label} must be at least ${_.minLength} characters`;
      if ((_.type === "text" || _.type === "textarea") && _.maxLength && v.length > _.maxLength)
        return `${_.label} must not exceed ${_.maxLength} characters`;
      if (_.type === "number") {
        const g = parseFloat(v);
        if (isNaN(g))
          return `${_.label} must be a valid number`;
        if (_.minLength && g < _.minLength)
          return `${_.label} must be at least ${_.minLength}`;
        if (_.maxLength && g > _.maxLength)
          return `${_.label} must not exceed ${_.maxLength}`;
      }
      return null;
    }, Ve = async () => {
      if (M.value || !ee.value) {
        console.log("Already submitting or no form data, returning");
        return;
      }
      try {
        console.log("Starting full screen form submission..."), M.value = !0, V.value = {};
        let _ = !1;
        for (const v of ee.value.fields || []) {
          const g = R.value[v.name], oe = xe(v, g);
          oe && (V.value[v.name] = oe, _ = !0, console.log(`Validation error for field ${v.name}:`, oe));
        }
        if (console.log("Validation completed. Has errors:", _), console.log("Form errors:", V.value), _) {
          M.value = !1, console.log("Validation failed, not submitting");
          return;
        }
        console.log("Submitting form data:", R.value), await $e(R.value), console.log("Full screen form submitted successfully"), Ee.value = !1, ee.value = null, R.value = {}, console.log("Full screen form hidden and data cleared");
      } catch (_) {
        console.error("Failed to submit full screen form:", _);
      } finally {
        M.value = !1, console.log("Full screen form submission completed");
      }
    }, nt = (_) => {
      _ && window.parent.postMessage({
        type: "VIEW_PRODUCT",
        productId: _
      }, "*");
    }, qt = (_) => _ ? _.replace(/https?:\/\/[^\s\)]+/g, "[link removed]") : "", Is = async () => {
      try {
        Z.value = !1, ae.value = null, await gt();
      } catch (_) {
        console.error("Failed to proceed workflow:", _);
      }
    }, Os = async (_) => {
      try {
        if (!_.userInputValue || !_.userInputValue.trim())
          return;
        const v = _.userInputValue.trim();
        _.isSubmitted = !0, _.submittedValue = v, await te(v, se.value), console.log("User input submitted:", v);
      } catch (v) {
        console.error("Failed to submit user input:", v), _.isSubmitted = !1, _.submittedValue = null;
      }
    }, ji = async () => {
      var _;
      try {
        return await p() ? ((_ = window.__INITIAL_DATA__) != null && _.workflow && X.value && (console.log("Getting workflow state on refresh/reload"), await Ze()), !0) : (F.value = "connected", !1);
      } catch (v) {
        return console.error("Failed to initialize widget:", v), !1;
      }
    }, Sl = () => {
      qe(async () => {
        await p();
      }), window.addEventListener("message", (_) => {
        _.data.type === "SCROLL_TO_BOTTOM" && A(), _.data.type === "TOKEN_RECEIVED" && localStorage.setItem(Zs, _.data.token);
      }), bt((_) => {
        var v, g;
        if (console.log("Workflow state received in component:", _), console.log("Data type:", _.type), console.log("Form data:", _.form_data), ce.value = _.button_text || "Start Chat", _.type === "landing_page")
          console.log("Setting landing page data:", _.landing_page_data), ae.value = _.landing_page_data, Z.value = !0, Ee.value = !1, console.log("Landing page state - show:", Z.value, "data:", ae.value);
        else if (_.type === "form" || _.type === "display_form")
          if (console.log("Form full screen flag:", (v = _.form_data) == null ? void 0 : v.form_full_screen), ((g = _.form_data) == null ? void 0 : g.form_full_screen) === !0)
            console.log("Setting full screen form data:", _.form_data), ee.value = _.form_data, Ee.value = !0, Z.value = !1, console.log("Full screen form state - show:", Ee.value);
          else {
            console.log("Regular form mode - adding form message to chat");
            const oe = {
              message: "",
              message_type: "form",
              attributes: {
                form_data: _.form_data
              },
              created_at: (/* @__PURE__ */ new Date()).toISOString(),
              isSubmitted: !1
            };
            f.value.findIndex(
              (J) => J.message_type === "form" && !J.isSubmitted
            ) === -1 && f.value.push(oe), Z.value = !1, Ee.value = !1;
          }
        else
          console.log("No special workflow state, hiding overlay forms"), Z.value = !1, Ee.value = !1;
      }), Xe((_) => {
        console.log("Workflow proceeded:", _);
      });
    }, Cl = async () => {
      try {
        console.log("Starting new conversation - getting workflow state"), await ji(), await Ze();
      } catch (_) {
        throw console.error("Failed to start new conversation:", _), _;
      }
    }, Tl = async () => {
      Ue.value = !1, f.value = [], await Cl();
    };
    Ro(async () => {
      await ji(), Sl();
    }), Ei(() => {
      window.removeEventListener("message", (_) => {
        _.data.type === "SCROLL_TO_BOTTOM" && A();
      }), U();
    });
    const st = De(() => (console.log("isAskAnythingStyle", r.value.chat_style), r.value.chat_style === "ASK_ANYTHING")), Al = De(() => {
      const _ = {
        width: "100%",
        height: "580px",
        borderRadius: "var(--radius-lg)"
      };
      return st.value ? {
        ..._,
        width: "100%",
        maxWidth: "800px",
        // Increased width for ASK_ANYTHING style
        minWidth: "600px"
        // Ensure minimum width
      } : _;
    }), zi = De(() => (console.log("isAskAnythingStyle.value", st.value), console.log("messages.value.length", f.value.length), st.value && f.value.length === 0));
    return (_, v) => ($(), B("div", {
      class: Ie(["chat-container", { collapsed: !Mt.value, "ask-anything-style": st.value }]),
      style: Se({ ...H(Lt), ...Al.value })
    }, [
      re.value ? ($(), B("div", Nf, v[8] || (v[8] = [
        pc('<div class="loading-spinner" data-v-54930dc9><div class="dot" data-v-54930dc9></div><div class="dot" data-v-54930dc9></div><div class="dot" data-v-54930dc9></div></div><div class="loading-text" data-v-54930dc9>Initializing chat...</div>', 2)
      ]))) : le("", !0),
      !re.value && H(F) !== "connected" ? ($(), B("div", {
        key: 1,
        class: Ie(["connection-status", H(F)])
      }, [
        H(F) === "connecting" ? ($(), B("div", Mf, v[9] || (v[9] = [
          mt(" Connecting to chat service... "),
          k("div", { class: "loading-dots" }, [
            k("div", { class: "dot" }),
            k("div", { class: "dot" }),
            k("div", { class: "dot" })
          ], -1)
        ]))) : H(F) === "failed" ? ($(), B("div", Df, [
          v[10] || (v[10] = mt(" Connection failed. ")),
          k("button", {
            onClick: T,
            class: "reconnect-button"
          }, " Click here to reconnect ")
        ])) : le("", !0)
      ], 2)) : le("", !0),
      H(w) ? ($(), B("div", {
        key: 2,
        class: "error-alert",
        style: Se(H(vt))
      }, fe(H(d)), 5)) : le("", !0),
      zi.value ? ($(), B("div", {
        key: 3,
        class: "welcome-message-section",
        style: Se(H(Ae))
      }, [
        k("div", qf, [
          k("div", Vf, [
            H(at) ? ($(), B("img", {
              key: 0,
              src: H(at),
              alt: H(o),
              class: "welcome-avatar"
            }, null, 8, Hf)) : le("", !0),
            k("h1", Uf, fe(H(r).welcome_title || `Welcome to ${H(o)}`), 1),
            k("p", jf, fe(H(r).welcome_subtitle || "I'm here to help you with anything you need. What can I assist you with today?"), 1)
          ])
        ]),
        k("div", zf, [
          !H(q) && !X.value && !st.value ? ($(), B("div", Wf, [
            Xt(k("input", {
              "onUpdate:modelValue": v[0] || (v[0] = (g) => se.value = g),
              type: "email",
              placeholder: "Enter your email address",
              disabled: H(c) || H(F) !== "connected",
              class: Ie([{
                invalid: se.value.trim() && !H(kn)(se.value.trim()),
                disabled: H(F) !== "connected"
              }, "welcome-email-input"])
            }, null, 10, Kf), [
              [nn, se.value]
            ])
          ])) : le("", !0),
          k("div", Zf, [
            Xt(k("input", {
              "onUpdate:modelValue": v[1] || (v[1] = (g) => He.value = g),
              type: "text",
              placeholder: H(F) === "connected" ? "Ask me anything..." : "Connecting...",
              onKeypress: h,
              disabled: !tt.value,
              class: Ie([{ disabled: H(F) !== "connected" }, "welcome-message-field"])
            }, null, 42, Gf), [
              [nn, He.value]
            ]),
            k("button", {
              class: "welcome-send-button",
              style: Se(H(lt)),
              onClick: Qt,
              disabled: !He.value.trim() || !tt.value
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
            ]), 12, Yf)
          ])
        ]),
        k("div", {
          class: "powered-by-welcome",
          style: Se(H(et))
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
          mt(" Powered by ChatterMate ")
        ]), 4)
      ], 4)) : le("", !0),
      Z.value && ae.value ? ($(), B("div", {
        key: 4,
        class: "landing-page-fullscreen",
        style: Se(H(Ae))
      }, [
        k("div", Jf, [
          k("div", Qf, [
            k("h2", Xf, fe(ae.value.heading), 1),
            k("div", eh, fe(ae.value.content), 1)
          ]),
          k("div", th, [
            k("button", {
              class: "landing-page-button",
              onClick: Is
            }, fe(ce.value), 1)
          ])
        ]),
        k("div", {
          class: "powered-by-landing",
          style: Se(H(et))
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
          mt(" Powered by ChatterMate ")
        ]), 4)
      ], 4)) : Ee.value && ee.value ? ($(), B("div", {
        key: 5,
        class: "form-fullscreen",
        style: Se(H(Ae))
      }, [
        k("div", nh, [
          ee.value.title || ee.value.description ? ($(), B("div", sh, [
            ee.value.title ? ($(), B("h2", ih, fe(ee.value.title), 1)) : le("", !0),
            ee.value.description ? ($(), B("p", rh, fe(ee.value.description), 1)) : le("", !0)
          ])) : le("", !0),
          k("div", oh, [
            ($(!0), B(Be, null, kt(ee.value.fields, (g) => {
              var oe, Oe;
              return $(), B("div", {
                key: g.name,
                class: "form-field"
              }, [
                k("label", {
                  for: `fullscreen-form-${g.name}`,
                  class: "field-label"
                }, [
                  mt(fe(g.label) + " ", 1),
                  g.required ? ($(), B("span", ah, "*")) : le("", !0)
                ], 8, lh),
                g.type === "text" || g.type === "email" || g.type === "tel" ? ($(), B("input", {
                  key: 0,
                  id: `fullscreen-form-${g.name}`,
                  type: g.type,
                  placeholder: g.placeholder || "",
                  required: g.required,
                  minlength: g.minLength,
                  maxlength: g.maxLength,
                  value: R.value[g.name] || "",
                  onInput: (J) => G(g.name, J.target.value),
                  onBlur: (J) => G(g.name, J.target.value),
                  class: Ie(["form-input", { error: V.value[g.name] }]),
                  autocomplete: g.type === "email" ? "email" : g.type === "tel" ? "tel" : "off",
                  inputmode: g.type === "tel" ? "tel" : g.type === "email" ? "email" : "text"
                }, null, 42, ch)) : g.type === "number" ? ($(), B("input", {
                  key: 1,
                  id: `fullscreen-form-${g.name}`,
                  type: "number",
                  placeholder: g.placeholder || "",
                  required: g.required,
                  min: g.minLength,
                  max: g.maxLength,
                  value: R.value[g.name] || "",
                  onInput: (J) => G(g.name, J.target.value),
                  class: Ie(["form-input", { error: V.value[g.name] }])
                }, null, 42, uh)) : g.type === "textarea" ? ($(), B("textarea", {
                  key: 2,
                  id: `fullscreen-form-${g.name}`,
                  placeholder: g.placeholder || "",
                  required: g.required,
                  minlength: g.minLength,
                  maxlength: g.maxLength,
                  value: R.value[g.name] || "",
                  onInput: (J) => G(g.name, J.target.value),
                  class: Ie(["form-textarea", { error: V.value[g.name] }]),
                  rows: "4"
                }, null, 42, fh)) : g.type === "select" ? ($(), B("select", {
                  key: 3,
                  id: `fullscreen-form-${g.name}`,
                  required: g.required,
                  value: R.value[g.name] || "",
                  onChange: (J) => G(g.name, J.target.value),
                  class: Ie(["form-select", { error: V.value[g.name] }])
                }, [
                  v[14] || (v[14] = k("option", { value: "" }, "Please select...", -1)),
                  ($(!0), B(Be, null, kt((oe = g.options) == null ? void 0 : oe.split(`
`).filter((J) => J.trim()), (J) => ($(), B("option", {
                    key: J,
                    value: J.trim()
                  }, fe(J.trim()), 9, dh))), 128))
                ], 42, hh)) : g.type === "checkbox" ? ($(), B("label", ph, [
                  k("input", {
                    id: `fullscreen-form-${g.name}`,
                    type: "checkbox",
                    required: g.required,
                    checked: R.value[g.name] || !1,
                    onChange: (J) => G(g.name, J.target.checked),
                    class: "form-checkbox"
                  }, null, 40, gh),
                  k("span", mh, fe(g.label), 1)
                ])) : g.type === "radio" ? ($(), B("div", _h, [
                  ($(!0), B(Be, null, kt((Oe = g.options) == null ? void 0 : Oe.split(`
`).filter((J) => J.trim()), (J) => ($(), B("label", {
                    key: J,
                    class: "radio-field"
                  }, [
                    k("input", {
                      type: "radio",
                      name: `fullscreen-form-${g.name}`,
                      value: J.trim(),
                      required: g.required,
                      checked: R.value[g.name] === J.trim(),
                      onChange: (Fe) => G(g.name, J.trim()),
                      class: "form-radio"
                    }, null, 40, yh),
                    k("span", bh, fe(J.trim()), 1)
                  ]))), 128))
                ])) : le("", !0),
                V.value[g.name] ? ($(), B("div", vh, fe(V.value[g.name]), 1)) : le("", !0)
              ]);
            }), 128))
          ]),
          k("div", wh, [
            k("button", {
              onClick: v[2] || (v[2] = () => {
                console.log("Submit button clicked!"), Ve();
              }),
              disabled: M.value,
              class: "submit-form-button",
              style: Se(H(lt))
            }, [
              M.value ? ($(), B("span", xh, v[15] || (v[15] = [
                k("div", { class: "dot" }, null, -1),
                k("div", { class: "dot" }, null, -1),
                k("div", { class: "dot" }, null, -1)
              ]))) : ($(), B("span", Sh, fe(ee.value.submit_button_text || "Submit"), 1))
            ], 12, kh)
          ])
        ]),
        k("div", {
          class: "powered-by-landing",
          style: Se(H(et))
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
          mt(" Powered by ChatterMate ")
        ]), 4)
      ], 4)) : zi.value ? le("", !0) : ($(), B(Be, { key: 6 }, [
        Mt.value ? ($(), B("div", {
          key: 0,
          class: Ie(["chat-panel", { "ask-anything-chat": st.value }]),
          style: Se(H(Ae))
        }, [
          st.value ? le("", !0) : ($(), B("div", {
            key: 0,
            class: "chat-header",
            style: Se(H(wt))
          }, [
            k("div", Ch, [
              u.value || H(at) ? ($(), B("img", {
                key: 0,
                src: u.value || H(at),
                alt: H(ie).human_agent_name || H(o),
                class: "header-avatar"
              }, null, 8, Th)) : le("", !0),
              k("div", Ah, [
                k("h3", {
                  style: Se(H(et))
                }, fe(H(ie).human_agent_name || H(o)), 5),
                k("div", Eh, [
                  v[17] || (v[17] = k("span", { class: "status-indicator online" }, null, -1)),
                  k("span", {
                    class: "status-text",
                    style: Se(H(et))
                  }, "Online", 4)
                ])
              ])
            ])
          ], 4)),
          H(S) ? ($(), B("div", Rh, v[18] || (v[18] = [
            k("div", { class: "loading-spinner" }, [
              k("div", { class: "dot" }),
              k("div", { class: "dot" }),
              k("div", { class: "dot" })
            ], -1)
          ]))) : le("", !0),
          k("div", {
            class: "chat-messages",
            ref_key: "messagesContainer",
            ref: W
          }, [
            ($(!0), B(Be, null, kt(H(f), (g, oe) => {
              var Oe, J, Fe, Ls, Ki, Zi, Gi, Yi, Ji, Qi, Xi, er, tr, nr, sr, ir, rr;
              return $(), B("div", {
                key: oe,
                class: Ie([
                  "message",
                  g.message_type === "bot" || g.message_type === "agent" ? "agent-message" : g.message_type === "system" ? "system-message" : g.message_type === "rating" ? "rating-message" : g.message_type === "form" ? "form-message" : g.message_type === "product" || g.shopify_output ? "product-message" : "user-message"
                ])
              }, [
                k("div", {
                  class: "message-bubble",
                  style: Se(g.message_type === "system" || g.message_type === "rating" || g.message_type === "product" || g.shopify_output ? {} : g.message_type === "user" ? H(lt) : H(Dt))
                }, [
                  g.message_type === "rating" ? ($(), B("div", Ih, [
                    k("p", Oh, "Rate the chat session that you had with " + fe(g.agent_name || H(ie).human_agent_name || H(o) || "our agent"), 1),
                    k("div", {
                      class: Ie(["star-rating", { submitted: j.value || g.isSubmitted }])
                    }, [
                      ($(), B(Be, null, kt(5, (O) => k("button", {
                        key: O,
                        class: Ie(["star-button", {
                          warning: O <= (g.isSubmitted ? g.finalRating : C.value || g.selectedRating) && (g.isSubmitted ? g.finalRating : C.value || g.selectedRating) <= 3,
                          success: O <= (g.isSubmitted ? g.finalRating : C.value || g.selectedRating) && (g.isSubmitted ? g.finalRating : C.value || g.selectedRating) > 3,
                          selected: O <= (g.isSubmitted ? g.finalRating : C.value || g.selectedRating)
                        }]),
                        onMouseover: (Vt) => !g.isSubmitted && x(O),
                        onMouseleave: (Vt) => !g.isSubmitted && y,
                        onClick: (Vt) => !g.isSubmitted && I(O),
                        disabled: j.value || g.isSubmitted
                      }, " ★ ", 42, Lh)), 64))
                    ], 2),
                    g.showFeedback && !g.isSubmitted ? ($(), B("div", Ph, [
                      k("div", $h, [
                        Xt(k("input", {
                          "onUpdate:modelValue": (O) => g.feedback = O,
                          placeholder: "Please share your feedback (optional)",
                          disabled: j.value,
                          maxlength: "500",
                          class: "feedback-input"
                        }, null, 8, Fh), [
                          [nn, g.feedback]
                        ]),
                        k("div", Bh, fe(((Oe = g.feedback) == null ? void 0 : Oe.length) || 0) + "/500", 1)
                      ]),
                      k("button", {
                        onClick: (O) => z(g.session_id, C.value, g.feedback),
                        disabled: j.value || !C.value,
                        class: "submit-rating-button",
                        style: Se({ backgroundColor: H(r).accent_color || "var(--primary-color)" })
                      }, fe(j.value ? "Submitting..." : "Submit Rating"), 13, Nh)
                    ])) : le("", !0),
                    g.isSubmitted && g.finalFeedback ? ($(), B("div", Mh, [
                      k("div", Dh, [
                        k("p", qh, fe(g.finalFeedback), 1)
                      ])
                    ])) : g.isSubmitted ? ($(), B("div", Vh, " Thank you for your rating! ")) : le("", !0)
                  ])) : g.message_type === "form" ? ($(), B("div", Hh, [
                    (Fe = (J = g.attributes) == null ? void 0 : J.form_data) != null && Fe.title || (Ki = (Ls = g.attributes) == null ? void 0 : Ls.form_data) != null && Ki.description ? ($(), B("div", Uh, [
                      (Gi = (Zi = g.attributes) == null ? void 0 : Zi.form_data) != null && Gi.title ? ($(), B("h3", jh, fe(g.attributes.form_data.title), 1)) : le("", !0),
                      (Ji = (Yi = g.attributes) == null ? void 0 : Yi.form_data) != null && Ji.description ? ($(), B("p", zh, fe(g.attributes.form_data.description), 1)) : le("", !0)
                    ])) : le("", !0),
                    k("div", Wh, [
                      ($(!0), B(Be, null, kt((Xi = (Qi = g.attributes) == null ? void 0 : Qi.form_data) == null ? void 0 : Xi.fields, (O) => {
                        var Vt, Ps;
                        return $(), B("div", {
                          key: O.name,
                          class: "form-field"
                        }, [
                          k("label", {
                            for: `form-${O.name}`,
                            class: "field-label"
                          }, [
                            mt(fe(O.label) + " ", 1),
                            O.required ? ($(), B("span", Zh, "*")) : le("", !0)
                          ], 8, Kh),
                          O.type === "text" || O.type === "email" || O.type === "tel" ? ($(), B("input", {
                            key: 0,
                            id: `form-${O.name}`,
                            type: O.type,
                            placeholder: O.placeholder || "",
                            required: O.required,
                            minlength: O.minLength,
                            maxlength: O.maxLength,
                            value: R.value[O.name] || "",
                            onInput: (Le) => G(O.name, Le.target.value),
                            onBlur: (Le) => G(O.name, Le.target.value),
                            class: Ie(["form-input", { error: V.value[O.name] }]),
                            disabled: M.value,
                            autocomplete: O.type === "email" ? "email" : O.type === "tel" ? "tel" : "off",
                            inputmode: O.type === "tel" ? "tel" : O.type === "email" ? "email" : "text"
                          }, null, 42, Gh)) : O.type === "number" ? ($(), B("input", {
                            key: 1,
                            id: `form-${O.name}`,
                            type: "number",
                            placeholder: O.placeholder || "",
                            required: O.required,
                            min: O.min,
                            max: O.max,
                            value: R.value[O.name] || "",
                            onInput: (Le) => G(O.name, Le.target.value),
                            class: Ie(["form-input", { error: V.value[O.name] }]),
                            disabled: M.value
                          }, null, 42, Yh)) : O.type === "textarea" ? ($(), B("textarea", {
                            key: 2,
                            id: `form-${O.name}`,
                            placeholder: O.placeholder || "",
                            required: O.required,
                            minlength: O.minLength,
                            maxlength: O.maxLength,
                            value: R.value[O.name] || "",
                            onInput: (Le) => G(O.name, Le.target.value),
                            class: Ie(["form-textarea", { error: V.value[O.name] }]),
                            disabled: M.value,
                            rows: "3"
                          }, null, 42, Jh)) : O.type === "select" ? ($(), B("select", {
                            key: 3,
                            id: `form-${O.name}`,
                            required: O.required,
                            value: R.value[O.name] || "",
                            onChange: (Le) => G(O.name, Le.target.value),
                            class: Ie(["form-select", { error: V.value[O.name] }]),
                            disabled: M.value
                          }, [
                            v[19] || (v[19] = k("option", { value: "" }, "Select an option", -1)),
                            ($(!0), B(Be, null, kt(((Vt = O.options) == null ? void 0 : Vt.split(",")) || [], (Le) => ($(), B("option", {
                              key: Le.trim(),
                              value: Le.trim()
                            }, fe(Le.trim()), 9, Xh))), 128))
                          ], 42, Qh)) : O.type === "checkbox" ? ($(), B("div", ed, [
                            k("input", {
                              id: `form-${O.name}`,
                              type: "checkbox",
                              checked: R.value[O.name] || !1,
                              onChange: (Le) => G(O.name, Le.target.checked),
                              class: "form-checkbox",
                              disabled: M.value
                            }, null, 40, td),
                            k("label", {
                              for: `form-${O.name}`,
                              class: "checkbox-label"
                            }, fe(O.placeholder || O.label), 9, nd)
                          ])) : O.type === "radio" ? ($(), B("div", sd, [
                            ($(!0), B(Be, null, kt(((Ps = O.options) == null ? void 0 : Ps.split(",")) || [], (Le) => ($(), B("div", {
                              key: Le.trim(),
                              class: "radio-option"
                            }, [
                              k("input", {
                                id: `form-${O.name}-${Le.trim()}`,
                                name: `form-${O.name}`,
                                type: "radio",
                                value: Le.trim(),
                                checked: R.value[O.name] === Le.trim(),
                                onChange: (Xd) => G(O.name, Le.trim()),
                                class: "form-radio",
                                disabled: M.value
                              }, null, 40, id),
                              k("label", {
                                for: `form-${O.name}-${Le.trim()}`,
                                class: "radio-label"
                              }, fe(Le.trim()), 9, rd)
                            ]))), 128))
                          ])) : le("", !0),
                          V.value[O.name] ? ($(), B("div", od, fe(V.value[O.name]), 1)) : le("", !0)
                        ]);
                      }), 128))
                    ]),
                    k("div", ld, [
                      k("button", {
                        onClick: () => {
                          var O;
                          console.log("Regular form submit button clicked!"), pe((O = g.attributes) == null ? void 0 : O.form_data);
                        },
                        disabled: M.value,
                        class: "form-submit-button",
                        style: Se(H(lt))
                      }, fe(M.value ? "Submitting..." : ((tr = (er = g.attributes) == null ? void 0 : er.form_data) == null ? void 0 : tr.submit_button_text) || "Submit"), 13, ad)
                    ])
                  ])) : g.message_type === "user_input" ? ($(), B("div", cd, [
                    (nr = g.attributes) != null && nr.prompt_message && g.attributes.prompt_message.trim() ? ($(), B("div", ud, fe(g.attributes.prompt_message), 1)) : le("", !0),
                    g.isSubmitted ? ($(), B("div", pd, [
                      v[20] || (v[20] = k("strong", null, "Your input:", -1)),
                      mt(" " + fe(g.submittedValue) + " ", 1),
                      (sr = g.attributes) != null && sr.confirmation_message && g.attributes.confirmation_message.trim() ? ($(), B("div", gd, fe(g.attributes.confirmation_message), 1)) : le("", !0)
                    ])) : ($(), B("div", fd, [
                      Xt(k("textarea", {
                        "onUpdate:modelValue": (O) => g.userInputValue = O,
                        class: "user-input-textarea",
                        placeholder: "Type your message here...",
                        rows: "3",
                        onKeydown: [
                          Fr($r((O) => Os(g), ["ctrl"]), ["enter"]),
                          Fr($r((O) => Os(g), ["meta"]), ["enter"])
                        ]
                      }, null, 40, hd), [
                        [nn, g.userInputValue]
                      ]),
                      k("button", {
                        class: "user-input-submit-button",
                        onClick: (O) => Os(g),
                        disabled: !g.userInputValue || !g.userInputValue.trim()
                      }, " Submit ", 8, dd)
                    ]))
                  ])) : g.shopify_output || g.message_type === "product" ? ($(), B("div", md, [
                    g.message ? ($(), B("div", {
                      key: 0,
                      innerHTML: H(he)(qt(g.message), { renderer: H(e) }),
                      class: "product-message-text"
                    }, null, 8, _d)) : le("", !0),
                    (ir = g.shopify_output) != null && ir.products && g.shopify_output.products.length > 0 ? ($(), B("div", yd, [
                      v[22] || (v[22] = k("h3", { class: "carousel-title" }, "Products", -1)),
                      k("div", bd, [
                        ($(!0), B(Be, null, kt(g.shopify_output.products, (O) => {
                          var Vt;
                          return $(), B("div", {
                            key: O.id,
                            class: "product-card-compact carousel-item"
                          }, [
                            (Vt = O.image) != null && Vt.src ? ($(), B("div", vd, [
                              k("img", {
                                src: O.image.src,
                                alt: O.title,
                                class: "product-thumbnail"
                              }, null, 8, wd)
                            ])) : le("", !0),
                            k("div", kd, [
                              k("div", xd, [
                                k("div", Sd, fe(O.title), 1),
                                O.variant_title && O.variant_title !== "Default Title" ? ($(), B("div", Cd, fe(O.variant_title), 1)) : le("", !0),
                                k("div", Td, fe(O.price_formatted || `₹${O.price}`), 1)
                              ]),
                              k("div", Ad, [
                                k("button", {
                                  class: "view-details-button-compact",
                                  onClick: (Ps) => nt(O.id)
                                }, v[21] || (v[21] = [
                                  mt(" View product "),
                                  k("span", { class: "external-link-icon" }, "↗", -1)
                                ]), 8, Ed)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])) : (rr = g.shopify_output) != null && rr.products && g.shopify_output.products.length === 0 ? ($(), B("div", Rd, v[23] || (v[23] = [
                      k("p", null, "No products found.", -1)
                    ]))) : g.shopify_output && !g.shopify_output.products ? ($(), B("div", Id, v[24] || (v[24] = [
                      k("p", null, "No products to display.", -1)
                    ]))) : le("", !0)
                  ])) : ($(), B("div", {
                    key: 4,
                    innerHTML: H(he)(g.message, { renderer: H(e) })
                  }, null, 8, Od))
                ], 4),
                k("div", Ld, [
                  g.message_type === "user" ? ($(), B("span", Pd, " You ")) : le("", !0)
                ])
              ], 2);
            }), 128)),
            H(c) ? ($(), B("div", $d, v[25] || (v[25] = [
              k("div", { class: "dot" }, null, -1),
              k("div", { class: "dot" }, null, -1),
              k("div", { class: "dot" }, null, -1)
            ]))) : le("", !0)
          ], 512),
          Ue.value ? ($(), B("div", {
            key: 3,
            class: "new-conversation-section",
            style: Se(H(Dt))
          }, [
            k("div", qd, [
              v[27] || (v[27] = k("p", { class: "ended-text" }, "This chat has ended.", -1)),
              k("button", {
                class: "start-new-conversation-button",
                style: Se(H(lt)),
                onClick: Tl
              }, " Click here to start a new conversation ", 4)
            ])
          ], 4)) : ($(), B("div", {
            key: 2,
            class: Ie(["chat-input", { "ask-anything-input": st.value }]),
            style: Se(H(Dt))
          }, [
            !H(q) && !X.value && !st.value ? ($(), B("div", Fd, [
              Xt(k("input", {
                "onUpdate:modelValue": v[3] || (v[3] = (g) => se.value = g),
                type: "email",
                placeholder: "Enter your email address to begin",
                disabled: H(c) || H(F) !== "connected",
                class: Ie({
                  invalid: se.value.trim() && !H(kn)(se.value.trim()),
                  disabled: H(F) !== "connected"
                })
              }, null, 10, Bd), [
                [nn, se.value]
              ])
            ])) : le("", !0),
            k("div", Nd, [
              Xt(k("input", {
                "onUpdate:modelValue": v[4] || (v[4] = (g) => He.value = g),
                type: "text",
                placeholder: H(F) === "connected" ? st.value ? "Ask me anything..." : "Type a message..." : "Connecting...",
                onKeypress: h,
                disabled: !tt.value,
                class: Ie({ disabled: H(F) !== "connected", "ask-anything-field": st.value })
              }, null, 42, Md), [
                [nn, He.value]
              ]),
              k("button", {
                class: Ie(["send-button", { "ask-anything-send": st.value }]),
                style: Se(H(lt)),
                onClick: Qt,
                disabled: !He.value.trim() || !tt.value
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
              ]), 14, Dd)
            ])
          ], 6)),
          k("div", {
            class: "powered-by",
            style: Se(H(et))
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
            mt(" Powered by ChatterMate ")
          ]), 4)
        ], 6)) : le("", !0)
      ], 64)),
      E.value ? ($(), B("div", Vd, [
        k("div", Hd, [
          v[29] || (v[29] = k("h3", null, "Rate your conversation", -1)),
          k("div", Ud, [
            ($(), B(Be, null, kt(5, (g) => k("button", {
              key: g,
              onClick: (oe) => N.value = g,
              class: Ie([{ active: g <= N.value }, "star-button"])
            }, " ★ ", 10, jd)), 64))
          ]),
          Xt(k("textarea", {
            "onUpdate:modelValue": v[5] || (v[5] = (g) => L.value = g),
            placeholder: "Additional feedback (optional)",
            class: "rating-feedback"
          }, null, 512), [
            [nn, L.value]
          ]),
          k("div", zd, [
            k("button", {
              onClick: v[6] || (v[6] = (g) => _.submitRating(N.value, L.value)),
              disabled: !N.value,
              class: "submit-button",
              style: Se(H(lt))
            }, " Submit ", 12, Wd),
            k("button", {
              onClick: v[7] || (v[7] = (g) => E.value = !1),
              class: "skip-rating"
            }, " Skip ")
          ])
        ])
      ])) : le("", !0)
    ], 6));
  }
}), Zd = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, i] of e)
    n[s] = i;
  return n;
}, Gd = /* @__PURE__ */ Zd(Kd, [["__scopeId", "data-v-54930dc9"]]);
window.process || (window.process = { env: { NODE_ENV: "production" } });
const Yd = new URL(window.location.href), Jd = Yd.searchParams.get("widget_id"), Qd = Yc(Gd, {
  widgetId: Jd
});
Qd.mount("#app");
