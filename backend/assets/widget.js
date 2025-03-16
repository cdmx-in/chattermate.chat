var Wo = Object.defineProperty;
var Ko = (t, e, n) => e in t ? Wo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ce = (t, e, n) => Ko(t, typeof e != "symbol" ? e + "" : e, n);
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Qs(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const ue = {}, Yt = [], ht = () => {
}, Go = () => !1, ts = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), Xs = (t) => t.startsWith("onUpdate:"), Oe = Object.assign, ei = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Zo = Object.prototype.hasOwnProperty, re = (t, e) => Zo.call(t, e), j = Array.isArray, Jt = (t) => ns(t) === "[object Map]", gr = (t) => ns(t) === "[object Set]", V = (t) => typeof t == "function", xe = (t) => typeof t == "string", Ot = (t) => typeof t == "symbol", ye = (t) => t !== null && typeof t == "object", mr = (t) => (ye(t) || V(t)) && V(t.then) && V(t.catch), yr = Object.prototype.toString, ns = (t) => yr.call(t), Yo = (t) => ns(t).slice(8, -1), _r = (t) => ns(t) === "[object Object]", ti = (t) => xe(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, hn = /* @__PURE__ */ Qs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ss = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Jo = /-(\w)/g, Ct = ss(
  (t) => t.replace(Jo, (e, n) => n ? n.toUpperCase() : "")
), Qo = /\B([A-Z])/g, jt = ss(
  (t) => t.replace(Qo, "-$1").toLowerCase()
), br = ss((t) => t.charAt(0).toUpperCase() + t.slice(1)), gs = ss(
  (t) => t ? `on${br(t)}` : ""
), Rt = (t, e) => !Object.is(t, e), Nn = (t, ...e) => {
  for (let n = 0; n < t.length; n++)
    t[n](...e);
}, wr = (t, e, n, s = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Ps = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let Ci;
const is = () => Ci || (Ci = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Le(t) {
  if (j(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const s = t[n], i = xe(s) ? nl(s) : Le(s);
      if (i)
        for (const r in i)
          e[r] = i[r];
    }
    return e;
  } else if (xe(t) || ye(t))
    return t;
}
const Xo = /;(?![^(]*\))/g, el = /:([^]+)/, tl = /\/\*[^]*?\*\//g;
function nl(t) {
  const e = {};
  return t.replace(tl, "").split(Xo).forEach((n) => {
    if (n) {
      const s = n.split(el);
      s.length > 1 && (e[s[0].trim()] = s[1].trim());
    }
  }), e;
}
function nt(t) {
  let e = "";
  if (xe(t))
    e = t;
  else if (j(t))
    for (let n = 0; n < t.length; n++) {
      const s = nt(t[n]);
      s && (e += s + " ");
    }
  else if (ye(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const sl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", il = /* @__PURE__ */ Qs(sl);
function vr(t) {
  return !!t || t === "";
}
const xr = (t) => !!(t && t.__v_isRef === !0), Ft = (t) => xe(t) ? t : t == null ? "" : j(t) || ye(t) && (t.toString === yr || !V(t.toString)) ? xr(t) ? Ft(t.value) : JSON.stringify(t, kr, 2) : String(t), kr = (t, e) => xr(e) ? kr(t, e.value) : Jt(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [s, i], r) => (n[ms(s, r) + " =>"] = i, n),
    {}
  )
} : gr(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => ms(n))
} : Ot(e) ? ms(e) : ye(e) && !j(e) && !_r(e) ? String(e) : e, ms = (t, e = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ot(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let He;
class rl {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = He, !e && He && (this.index = (He.scopes || (He.scopes = [])).push(
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
      const n = He;
      try {
        return He = this, e();
      } finally {
        He = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    He = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    He = this.parent;
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
function ol() {
  return He;
}
let he;
const ys = /* @__PURE__ */ new WeakSet();
class Sr {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, He && He.active && He.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ys.has(this) && (ys.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Er(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Oi(this), Rr(this);
    const e = he, n = it;
    he = this, it = !0;
    try {
      return this.fn();
    } finally {
      Ar(this), he = e, it = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        ii(e);
      this.deps = this.depsTail = void 0, Oi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ys.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ls(this) && this.run();
  }
  get dirty() {
    return Ls(this);
  }
}
let Tr = 0, dn, pn;
function Er(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = pn, pn = t;
    return;
  }
  t.next = dn, dn = t;
}
function ni() {
  Tr++;
}
function si() {
  if (--Tr > 0)
    return;
  if (pn) {
    let e = pn;
    for (pn = void 0; e; ) {
      const n = e.next;
      e.next = void 0, e.flags &= -9, e = n;
    }
  }
  let t;
  for (; dn; ) {
    let e = dn;
    for (dn = void 0; e; ) {
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
function Rr(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function Ar(t) {
  let e, n = t.depsTail, s = n;
  for (; s; ) {
    const i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), ii(s), ll(s)) : e = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  t.deps = e, t.depsTail = n;
}
function Ls(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (Cr(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function Cr(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === wn))
    return;
  t.globalVersion = wn;
  const e = t.dep;
  if (t.flags |= 2, e.version > 0 && !t.isSSR && t.deps && !Ls(t)) {
    t.flags &= -3;
    return;
  }
  const n = he, s = it;
  he = t, it = !0;
  try {
    Rr(t);
    const i = t.fn(t._value);
    (e.version === 0 || Rt(i, t._value)) && (t._value = i, e.version++);
  } catch (i) {
    throw e.version++, i;
  } finally {
    he = n, it = s, Ar(t), t.flags &= -3;
  }
}
function ii(t, e = !1) {
  const { dep: n, prevSub: s, nextSub: i } = t;
  if (s && (s.nextSub = i, t.prevSub = void 0), i && (i.prevSub = s, t.nextSub = void 0), n.subs === t && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      ii(r, !0);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
function ll(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let it = !0;
const Or = [];
function It() {
  Or.push(it), it = !1;
}
function Pt() {
  const t = Or.pop();
  it = t === void 0 ? !0 : t;
}
function Oi(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const n = he;
    he = void 0;
    try {
      e();
    } finally {
      he = n;
    }
  }
}
let wn = 0;
class al {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ri {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(e) {
    if (!he || !it || he === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== he)
      n = this.activeLink = new al(he, this), he.deps ? (n.prevDep = he.depsTail, he.depsTail.nextDep = n, he.depsTail = n) : he.deps = he.depsTail = n, Ir(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = he.depsTail, n.nextDep = void 0, he.depsTail.nextDep = n, he.depsTail = n, he.deps === n && (he.deps = s);
    }
    return n;
  }
  trigger(e) {
    this.version++, wn++, this.notify(e);
  }
  notify(e) {
    ni();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      si();
    }
  }
}
function Ir(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let s = e.deps; s; s = s.nextDep)
        Ir(s);
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
  }
}
const Bs = /* @__PURE__ */ new WeakMap(), Dt = Symbol(
  ""
), $s = Symbol(
  ""
), vn = Symbol(
  ""
);
function Re(t, e, n) {
  if (it && he) {
    let s = Bs.get(t);
    s || Bs.set(t, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new ri()), i.map = s, i.key = n), i.track();
  }
}
function wt(t, e, n, s, i, r) {
  const o = Bs.get(t);
  if (!o) {
    wn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (ni(), e === "clear")
    o.forEach(l);
  else {
    const a = j(t), f = a && ti(n);
    if (a && n === "length") {
      const c = Number(s);
      o.forEach((g, _) => {
        (_ === "length" || _ === vn || !Ot(_) && _ >= c) && l(g);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), f && l(o.get(vn)), e) {
        case "add":
          a ? f && l(o.get("length")) : (l(o.get(Dt)), Jt(t) && l(o.get($s)));
          break;
        case "delete":
          a || (l(o.get(Dt)), Jt(t) && l(o.get($s)));
          break;
        case "set":
          Jt(t) && l(o.get(Dt));
          break;
      }
  }
  si();
}
function Kt(t) {
  const e = ie(t);
  return e === t ? e : (Re(e, "iterate", vn), Qe(t) ? e : e.map(Ae));
}
function rs(t) {
  return Re(t = ie(t), "iterate", vn), t;
}
const cl = {
  __proto__: null,
  [Symbol.iterator]() {
    return _s(this, Symbol.iterator, Ae);
  },
  concat(...t) {
    return Kt(this).concat(
      ...t.map((e) => j(e) ? Kt(e) : e)
    );
  },
  entries() {
    return _s(this, "entries", (t) => (t[1] = Ae(t[1]), t));
  },
  every(t, e) {
    return _t(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return _t(this, "filter", t, e, (n) => n.map(Ae), arguments);
  },
  find(t, e) {
    return _t(this, "find", t, e, Ae, arguments);
  },
  findIndex(t, e) {
    return _t(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return _t(this, "findLast", t, e, Ae, arguments);
  },
  findLastIndex(t, e) {
    return _t(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return _t(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return bs(this, "includes", t);
  },
  indexOf(...t) {
    return bs(this, "indexOf", t);
  },
  join(t) {
    return Kt(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return bs(this, "lastIndexOf", t);
  },
  map(t, e) {
    return _t(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return rn(this, "pop");
  },
  push(...t) {
    return rn(this, "push", t);
  },
  reduce(t, ...e) {
    return Ii(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return Ii(this, "reduceRight", t, e);
  },
  shift() {
    return rn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return _t(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return rn(this, "splice", t);
  },
  toReversed() {
    return Kt(this).toReversed();
  },
  toSorted(t) {
    return Kt(this).toSorted(t);
  },
  toSpliced(...t) {
    return Kt(this).toSpliced(...t);
  },
  unshift(...t) {
    return rn(this, "unshift", t);
  },
  values() {
    return _s(this, "values", Ae);
  }
};
function _s(t, e, n) {
  const s = rs(t), i = s[e]();
  return s !== t && !Qe(t) && (i._next = i.next, i.next = () => {
    const r = i._next();
    return r.value && (r.value = n(r.value)), r;
  }), i;
}
const ul = Array.prototype;
function _t(t, e, n, s, i, r) {
  const o = rs(t), l = o !== t && !Qe(t), a = o[e];
  if (a !== ul[e]) {
    const g = a.apply(t, r);
    return l ? Ae(g) : g;
  }
  let f = n;
  o !== t && (l ? f = function(g, _) {
    return n.call(this, Ae(g), _, t);
  } : n.length > 2 && (f = function(g, _) {
    return n.call(this, g, _, t);
  }));
  const c = a.call(o, f, s);
  return l && i ? i(c) : c;
}
function Ii(t, e, n, s) {
  const i = rs(t);
  let r = n;
  return i !== t && (Qe(t) ? n.length > 3 && (r = function(o, l, a) {
    return n.call(this, o, l, a, t);
  }) : r = function(o, l, a) {
    return n.call(this, o, Ae(l), a, t);
  }), i[e](r, ...s);
}
function bs(t, e, n) {
  const s = ie(t);
  Re(s, "iterate", vn);
  const i = s[e](...n);
  return (i === -1 || i === !1) && ci(n[0]) ? (n[0] = ie(n[0]), s[e](...n)) : i;
}
function rn(t, e, n = []) {
  It(), ni();
  const s = ie(t)[e].apply(t, n);
  return si(), Pt(), s;
}
const fl = /* @__PURE__ */ Qs("__proto__,__v_isRef,__isVue"), Pr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Ot)
);
function hl(t) {
  Ot(t) || (t = String(t));
  const e = ie(this);
  return Re(e, "has", t), e.hasOwnProperty(t);
}
class Lr {
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
      return s === (i ? r ? xl : Fr : r ? Nr : $r).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(s) ? e : void 0;
    const o = j(e);
    if (!i) {
      let a;
      if (o && (a = cl[n]))
        return a;
      if (n === "hasOwnProperty")
        return hl;
    }
    const l = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Ce(e) ? e : s
    );
    return (Ot(n) ? Pr.has(n) : fl(n)) || (i || Re(e, "get", n), r) ? l : Ce(l) ? o && ti(n) ? l : l.value : ye(l) ? i ? Mr(l) : li(l) : l;
  }
}
class Br extends Lr {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, s, i) {
    let r = e[n];
    if (!this._isShallow) {
      const a = qt(r);
      if (!Qe(s) && !qt(s) && (r = ie(r), s = ie(s)), !j(e) && Ce(r) && !Ce(s))
        return a ? !1 : (r.value = s, !0);
    }
    const o = j(e) && ti(n) ? Number(n) < e.length : re(e, n), l = Reflect.set(
      e,
      n,
      s,
      Ce(e) ? e : i
    );
    return e === ie(i) && (o ? Rt(s, r) && wt(e, "set", n, s) : wt(e, "add", n, s)), l;
  }
  deleteProperty(e, n) {
    const s = re(e, n);
    e[n];
    const i = Reflect.deleteProperty(e, n);
    return i && s && wt(e, "delete", n, void 0), i;
  }
  has(e, n) {
    const s = Reflect.has(e, n);
    return (!Ot(n) || !Pr.has(n)) && Re(e, "has", n), s;
  }
  ownKeys(e) {
    return Re(
      e,
      "iterate",
      j(e) ? "length" : Dt
    ), Reflect.ownKeys(e);
  }
}
class dl extends Lr {
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
const pl = /* @__PURE__ */ new Br(), gl = /* @__PURE__ */ new dl(), ml = /* @__PURE__ */ new Br(!0);
const Ns = (t) => t, An = (t) => Reflect.getPrototypeOf(t);
function yl(t, e, n) {
  return function(...s) {
    const i = this.__v_raw, r = ie(i), o = Jt(r), l = t === "entries" || t === Symbol.iterator && o, a = t === "keys" && o, f = i[t](...s), c = n ? Ns : e ? Fs : Ae;
    return !e && Re(
      r,
      "iterate",
      a ? $s : Dt
    ), {
      // iterator protocol
      next() {
        const { value: g, done: _ } = f.next();
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
function Cn(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function _l(t, e) {
  const n = {
    get(i) {
      const r = this.__v_raw, o = ie(r), l = ie(i);
      t || (Rt(i, l) && Re(o, "get", i), Re(o, "get", l));
      const { has: a } = An(o), f = e ? Ns : t ? Fs : Ae;
      if (a.call(o, i))
        return f(r.get(i));
      if (a.call(o, l))
        return f(r.get(l));
      r !== o && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !t && Re(ie(i), "iterate", Dt), Reflect.get(i, "size", i);
    },
    has(i) {
      const r = this.__v_raw, o = ie(r), l = ie(i);
      return t || (Rt(i, l) && Re(o, "has", i), Re(o, "has", l)), i === l ? r.has(i) : r.has(i) || r.has(l);
    },
    forEach(i, r) {
      const o = this, l = o.__v_raw, a = ie(l), f = e ? Ns : t ? Fs : Ae;
      return !t && Re(a, "iterate", Dt), l.forEach((c, g) => i.call(r, f(c), f(g), o));
    }
  };
  return Oe(
    n,
    t ? {
      add: Cn("add"),
      set: Cn("set"),
      delete: Cn("delete"),
      clear: Cn("clear")
    } : {
      add(i) {
        !e && !Qe(i) && !qt(i) && (i = ie(i));
        const r = ie(this);
        return An(r).has.call(r, i) || (r.add(i), wt(r, "add", i, i)), this;
      },
      set(i, r) {
        !e && !Qe(r) && !qt(r) && (r = ie(r));
        const o = ie(this), { has: l, get: a } = An(o);
        let f = l.call(o, i);
        f || (i = ie(i), f = l.call(o, i));
        const c = a.call(o, i);
        return o.set(i, r), f ? Rt(r, c) && wt(o, "set", i, r) : wt(o, "add", i, r), this;
      },
      delete(i) {
        const r = ie(this), { has: o, get: l } = An(r);
        let a = o.call(r, i);
        a || (i = ie(i), a = o.call(r, i)), l && l.call(r, i);
        const f = r.delete(i);
        return a && wt(r, "delete", i, void 0), f;
      },
      clear() {
        const i = ie(this), r = i.size !== 0, o = i.clear();
        return r && wt(
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
    n[i] = yl(i, t, e);
  }), n;
}
function oi(t, e) {
  const n = _l(t, e);
  return (s, i, r) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? s : Reflect.get(
    re(n, i) && i in s ? n : s,
    i,
    r
  );
}
const bl = {
  get: /* @__PURE__ */ oi(!1, !1)
}, wl = {
  get: /* @__PURE__ */ oi(!1, !0)
}, vl = {
  get: /* @__PURE__ */ oi(!0, !1)
};
const $r = /* @__PURE__ */ new WeakMap(), Nr = /* @__PURE__ */ new WeakMap(), Fr = /* @__PURE__ */ new WeakMap(), xl = /* @__PURE__ */ new WeakMap();
function kl(t) {
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
function Sl(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : kl(Yo(t));
}
function li(t) {
  return qt(t) ? t : ai(
    t,
    !1,
    pl,
    bl,
    $r
  );
}
function Tl(t) {
  return ai(
    t,
    !1,
    ml,
    wl,
    Nr
  );
}
function Mr(t) {
  return ai(
    t,
    !0,
    gl,
    vl,
    Fr
  );
}
function ai(t, e, n, s, i) {
  if (!ye(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const r = i.get(t);
  if (r)
    return r;
  const o = Sl(t);
  if (o === 0)
    return t;
  const l = new Proxy(
    t,
    o === 2 ? s : n
  );
  return i.set(t, l), l;
}
function Qt(t) {
  return qt(t) ? Qt(t.__v_raw) : !!(t && t.__v_isReactive);
}
function qt(t) {
  return !!(t && t.__v_isReadonly);
}
function Qe(t) {
  return !!(t && t.__v_isShallow);
}
function ci(t) {
  return t ? !!t.__v_raw : !1;
}
function ie(t) {
  const e = t && t.__v_raw;
  return e ? ie(e) : t;
}
function El(t) {
  return !re(t, "__v_skip") && Object.isExtensible(t) && wr(t, "__v_skip", !0), t;
}
const Ae = (t) => ye(t) ? li(t) : t, Fs = (t) => ye(t) ? Mr(t) : t;
function Ce(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function pe(t) {
  return Rl(t, !1);
}
function Rl(t, e) {
  return Ce(t) ? t : new Al(t, e);
}
class Al {
  constructor(e, n) {
    this.dep = new ri(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? e : ie(e), this._value = n ? e : Ae(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, s = this.__v_isShallow || Qe(e) || qt(e);
    e = s ? e : ie(e), Rt(e, n) && (this._rawValue = e, this._value = s ? e : Ae(e), this.dep.trigger());
  }
}
function z(t) {
  return Ce(t) ? t.value : t;
}
const Cl = {
  get: (t, e, n) => e === "__v_raw" ? t : z(Reflect.get(t, e, n)),
  set: (t, e, n, s) => {
    const i = t[e];
    return Ce(i) && !Ce(n) ? (i.value = n, !0) : Reflect.set(t, e, n, s);
  }
};
function Dr(t) {
  return Qt(t) ? t : new Proxy(t, Cl);
}
class Ol {
  constructor(e, n, s) {
    this.fn = e, this.setter = n, this._value = void 0, this.dep = new ri(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = wn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    he !== this)
      return Er(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Cr(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
function Il(t, e, n = !1) {
  let s, i;
  return V(t) ? s = t : (s = t.get, i = t.set), new Ol(s, i, n);
}
const On = {}, Wn = /* @__PURE__ */ new WeakMap();
let Mt;
function Pl(t, e = !1, n = Mt) {
  if (n) {
    let s = Wn.get(n);
    s || Wn.set(n, s = []), s.push(t);
  }
}
function Ll(t, e, n = ue) {
  const { immediate: s, deep: i, once: r, scheduler: o, augmentJob: l, call: a } = n, f = ($) => i ? $ : Qe($) || i === !1 || i === 0 ? vt($, 1) : vt($);
  let c, g, _, k, B = !1, P = !1;
  if (Ce(t) ? (g = () => t.value, B = Qe(t)) : Qt(t) ? (g = () => f(t), B = !0) : j(t) ? (P = !0, B = t.some(($) => Qt($) || Qe($)), g = () => t.map(($) => {
    if (Ce($))
      return $.value;
    if (Qt($))
      return f($);
    if (V($))
      return a ? a($, 2) : $();
  })) : V(t) ? e ? g = a ? () => a(t, 2) : t : g = () => {
    if (_) {
      It();
      try {
        _();
      } finally {
        Pt();
      }
    }
    const $ = Mt;
    Mt = c;
    try {
      return a ? a(t, 3, [k]) : t(k);
    } finally {
      Mt = $;
    }
  } : g = ht, e && i) {
    const $ = g, J = i === !0 ? 1 / 0 : i;
    g = () => vt($(), J);
  }
  const G = ol(), K = () => {
    c.stop(), G && G.active && ei(G.effects, c);
  };
  if (r && e) {
    const $ = e;
    e = (...J) => {
      $(...J), K();
    };
  }
  let Y = P ? new Array(t.length).fill(On) : On;
  const te = ($) => {
    if (!(!(c.flags & 1) || !c.dirty && !$))
      if (e) {
        const J = c.run();
        if (i || B || (P ? J.some((Se, F) => Rt(Se, Y[F])) : Rt(J, Y))) {
          _ && _();
          const Se = Mt;
          Mt = c;
          try {
            const F = [
              J,
              // pass undefined as the old value when it's changed for the first time
              Y === On ? void 0 : P && Y[0] === On ? [] : Y,
              k
            ];
            a ? a(e, 3, F) : (
              // @ts-expect-error
              e(...F)
            ), Y = J;
          } finally {
            Mt = Se;
          }
        }
      } else
        c.run();
  };
  return l && l(te), c = new Sr(g), c.scheduler = o ? () => o(te, !1) : te, k = ($) => Pl($, !1, c), _ = c.onStop = () => {
    const $ = Wn.get(c);
    if ($) {
      if (a)
        a($, 4);
      else
        for (const J of $) J();
      Wn.delete(c);
    }
  }, e ? s ? te(!0) : Y = c.run() : o ? o(te.bind(null, !0), !0) : c.run(), K.pause = c.pause.bind(c), K.resume = c.resume.bind(c), K.stop = K, K;
}
function vt(t, e = 1 / 0, n) {
  if (e <= 0 || !ye(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(t)))
    return t;
  if (n.add(t), e--, Ce(t))
    vt(t.value, e, n);
  else if (j(t))
    for (let s = 0; s < t.length; s++)
      vt(t[s], e, n);
  else if (gr(t) || Jt(t))
    t.forEach((s) => {
      vt(s, e, n);
    });
  else if (_r(t)) {
    for (const s in t)
      vt(t[s], e, n);
    for (const s of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, s) && vt(t[s], e, n);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Tn(t, e, n, s) {
  try {
    return s ? t(...s) : t();
  } catch (i) {
    os(i, e, n);
  }
}
function gt(t, e, n, s) {
  if (V(t)) {
    const i = Tn(t, e, n, s);
    return i && mr(i) && i.catch((r) => {
      os(r, e, n);
    }), i;
  }
  if (j(t)) {
    const i = [];
    for (let r = 0; r < t.length; r++)
      i.push(gt(t[r], e, n, s));
    return i;
  }
}
function os(t, e, n, s = !0) {
  const i = e ? e.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: o } = e && e.appContext.config || ue;
  if (e) {
    let l = e.parent;
    const a = e.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const c = l.ec;
      if (c) {
        for (let g = 0; g < c.length; g++)
          if (c[g](t, a, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      It(), Tn(r, null, 10, [
        t,
        a,
        f
      ]), Pt();
      return;
    }
  }
  Bl(t, n, i, s, o);
}
function Bl(t, e, n, s = !0, i = !1) {
  if (i)
    throw t;
  console.error(t);
}
const Be = [];
let ut = -1;
const Xt = [];
let Tt = null, Gt = 0;
const qr = /* @__PURE__ */ Promise.resolve();
let Kn = null;
function Ur(t) {
  const e = Kn || qr;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function $l(t) {
  let e = ut + 1, n = Be.length;
  for (; e < n; ) {
    const s = e + n >>> 1, i = Be[s], r = xn(i);
    r < t || r === t && i.flags & 2 ? e = s + 1 : n = s;
  }
  return e;
}
function ui(t) {
  if (!(t.flags & 1)) {
    const e = xn(t), n = Be[Be.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= xn(n) ? Be.push(t) : Be.splice($l(e), 0, t), t.flags |= 1, Hr();
  }
}
function Hr() {
  Kn || (Kn = qr.then(zr));
}
function Nl(t) {
  j(t) ? Xt.push(...t) : Tt && t.id === -1 ? Tt.splice(Gt + 1, 0, t) : t.flags & 1 || (Xt.push(t), t.flags |= 1), Hr();
}
function Pi(t, e, n = ut + 1) {
  for (; n < Be.length; n++) {
    const s = Be[n];
    if (s && s.flags & 2) {
      if (t && s.id !== t.uid)
        continue;
      Be.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function jr(t) {
  if (Xt.length) {
    const e = [...new Set(Xt)].sort(
      (n, s) => xn(n) - xn(s)
    );
    if (Xt.length = 0, Tt) {
      Tt.push(...e);
      return;
    }
    for (Tt = e, Gt = 0; Gt < Tt.length; Gt++) {
      const n = Tt[Gt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Tt = null, Gt = 0;
  }
}
const xn = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function zr(t) {
  try {
    for (ut = 0; ut < Be.length; ut++) {
      const e = Be[ut];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Tn(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; ut < Be.length; ut++) {
      const e = Be[ut];
      e && (e.flags &= -2);
    }
    ut = -1, Be.length = 0, jr(), Kn = null, (Be.length || Xt.length) && zr();
  }
}
let Ze = null, Vr = null;
function Gn(t) {
  const e = Ze;
  return Ze = t, Vr = t && t.type.__scopeId || null, e;
}
function Fl(t, e = Ze, n) {
  if (!e || t._n)
    return t;
  const s = (...i) => {
    s._d && Ui(-1);
    const r = Gn(e);
    let o;
    try {
      o = t(...i);
    } finally {
      Gn(r), s._d && Ui(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function In(t, e) {
  if (Ze === null)
    return t;
  const n = us(Ze), s = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [r, o, l, a = ue] = e[i];
    r && (V(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && vt(o), s.push({
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
function $t(t, e, n, s) {
  const i = t.dirs, r = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    r && (l.oldValue = r[o].value);
    let a = l.dir[s];
    a && (It(), gt(a, n, 8, [
      t.el,
      l,
      t,
      e
    ]), Pt());
  }
}
const Ml = Symbol("_vte"), Dl = (t) => t.__isTeleport;
function fi(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, fi(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ql(t, e) {
  return V(t) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Oe({ name: t.name }, e, { setup: t })
  ) : t;
}
function Wr(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function Zn(t, e, n, s, i = !1) {
  if (j(t)) {
    t.forEach(
      (B, P) => Zn(
        B,
        e && (j(e) ? e[P] : e),
        n,
        s,
        i
      )
    );
    return;
  }
  if (gn(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Zn(t, e, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? us(s.component) : s.el, o = i ? null : r, { i: l, r: a } = t, f = e && e.r, c = l.refs === ue ? l.refs = {} : l.refs, g = l.setupState, _ = ie(g), k = g === ue ? () => !1 : (B) => re(_, B);
  if (f != null && f !== a && (xe(f) ? (c[f] = null, k(f) && (g[f] = null)) : Ce(f) && (f.value = null)), V(a))
    Tn(a, l, 12, [o, c]);
  else {
    const B = xe(a), P = Ce(a);
    if (B || P) {
      const G = () => {
        if (t.f) {
          const K = B ? k(a) ? g[a] : c[a] : a.value;
          i ? j(K) && ei(K, r) : j(K) ? K.includes(r) || K.push(r) : B ? (c[a] = [r], k(a) && (g[a] = c[a])) : (a.value = [r], t.k && (c[t.k] = a.value));
        } else B ? (c[a] = o, k(a) && (g[a] = o)) : P && (a.value = o, t.k && (c[t.k] = o));
      };
      o ? (G.id = -1, Ue(G, n)) : G();
    }
  }
}
is().requestIdleCallback;
is().cancelIdleCallback;
const gn = (t) => !!t.type.__asyncLoader, Kr = (t) => t.type.__isKeepAlive;
function Ul(t, e) {
  Gr(t, "a", e);
}
function Hl(t, e) {
  Gr(t, "da", e);
}
function Gr(t, e, n = $e) {
  const s = t.__wdc || (t.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return t();
  });
  if (ls(e, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Kr(i.parent.vnode) && jl(s, e, n, i), i = i.parent;
  }
}
function jl(t, e, n, s) {
  const i = ls(
    e,
    t,
    s,
    !0
    /* prepend */
  );
  hi(() => {
    ei(s[e], i);
  }, n);
}
function ls(t, e, n = $e, s = !1) {
  if (n) {
    const i = n[t] || (n[t] = []), r = e.__weh || (e.__weh = (...o) => {
      It();
      const l = En(n), a = gt(e, n, t, o);
      return l(), Pt(), a;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const xt = (t) => (e, n = $e) => {
  (!Sn || t === "sp") && ls(t, (...s) => e(...s), n);
}, zl = xt("bm"), Zr = xt("m"), Vl = xt(
  "bu"
), Wl = xt("u"), Kl = xt(
  "bum"
), hi = xt("um"), Gl = xt(
  "sp"
), Zl = xt("rtg"), Yl = xt("rtc");
function Jl(t, e = $e) {
  ls("ec", t, e);
}
const Ql = Symbol.for("v-ndc");
function ws(t, e, n, s) {
  let i;
  const r = n, o = j(t);
  if (o || xe(t)) {
    const l = o && Qt(t);
    let a = !1;
    l && (a = !Qe(t), t = rs(t)), i = new Array(t.length);
    for (let f = 0, c = t.length; f < c; f++)
      i[f] = e(
        a ? Ae(t[f]) : t[f],
        f,
        void 0,
        r
      );
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let l = 0; l < t; l++)
      i[l] = e(l + 1, l, void 0, r);
  } else if (ye(t))
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
const Ms = (t) => t ? _o(t) ? us(t) : Ms(t.parent) : null, mn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Oe(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => Ms(t.parent),
    $root: (t) => Ms(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => Jr(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      ui(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = Ur.bind(t.proxy)),
    $watch: (t) => wa.bind(t)
  })
), vs = (t, e) => t !== ue && !t.__isScriptSetup && re(t, e), Xl = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: i, props: r, accessCache: o, type: l, appContext: a } = t;
    let f;
    if (e[0] !== "$") {
      const k = o[e];
      if (k !== void 0)
        switch (k) {
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
        if (vs(s, e))
          return o[e] = 1, s[e];
        if (i !== ue && re(i, e))
          return o[e] = 2, i[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = t.propsOptions[0]) && re(f, e)
        )
          return o[e] = 3, r[e];
        if (n !== ue && re(n, e))
          return o[e] = 4, n[e];
        Ds && (o[e] = 0);
      }
    }
    const c = mn[e];
    let g, _;
    if (c)
      return e === "$attrs" && Re(t.attrs, "get", ""), c(t);
    if (
      // css module (injected by vue-loader)
      (g = l.__cssModules) && (g = g[e])
    )
      return g;
    if (n !== ue && re(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      _ = a.config.globalProperties, re(_, e)
    )
      return _[e];
  },
  set({ _: t }, e, n) {
    const { data: s, setupState: i, ctx: r } = t;
    return vs(i, e) ? (i[e] = n, !0) : s !== ue && re(s, e) ? (s[e] = n, !0) : re(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (r[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: s, appContext: i, propsOptions: r }
  }, o) {
    let l;
    return !!n[o] || t !== ue && re(t, o) || vs(e, o) || (l = r[0]) && re(l, o) || re(s, o) || re(mn, o) || re(i.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : re(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function Li(t) {
  return j(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let Ds = !0;
function ea(t) {
  const e = Jr(t), n = t.proxy, s = t.ctx;
  Ds = !1, e.beforeCreate && Bi(e.beforeCreate, t, "bc");
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
    beforeMount: g,
    mounted: _,
    beforeUpdate: k,
    updated: B,
    activated: P,
    deactivated: G,
    beforeDestroy: K,
    beforeUnmount: Y,
    destroyed: te,
    unmounted: $,
    render: J,
    renderTracked: Se,
    renderTriggered: F,
    errorCaptured: Q,
    serverPrefetch: W,
    // public API
    expose: ge,
    inheritAttrs: Fe,
    // assets
    components: Xe,
    directives: ke,
    filters: Lt
  } = e;
  if (f && ta(f, s, null), o)
    for (const se in o) {
      const X = o[se];
      V(X) && (s[se] = X.bind(n));
    }
  if (i) {
    const se = i.call(n, n);
    ye(se) && (t.data = li(se));
  }
  if (Ds = !0, r)
    for (const se in r) {
      const X = r[se], Me = V(X) ? X.bind(n, n) : V(X.get) ? X.get.bind(n, n) : ht, et = !V(X) && V(X.set) ? X.set.bind(n) : ht, Te = je({
        get: Me,
        set: et
      });
      Object.defineProperty(s, se, {
        enumerable: !0,
        configurable: !0,
        get: () => Te.value,
        set: (Ee) => Te.value = Ee
      });
    }
  if (l)
    for (const se in l)
      Yr(l[se], s, n, se);
  if (a) {
    const se = V(a) ? a.call(n) : a;
    Reflect.ownKeys(se).forEach((X) => {
      la(X, se[X]);
    });
  }
  c && Bi(c, t, "c");
  function de(se, X) {
    j(X) ? X.forEach((Me) => se(Me.bind(n))) : X && se(X.bind(n));
  }
  if (de(zl, g), de(Zr, _), de(Vl, k), de(Wl, B), de(Ul, P), de(Hl, G), de(Jl, Q), de(Yl, Se), de(Zl, F), de(Kl, Y), de(hi, $), de(Gl, W), j(ge))
    if (ge.length) {
      const se = t.exposed || (t.exposed = {});
      ge.forEach((X) => {
        Object.defineProperty(se, X, {
          get: () => n[X],
          set: (Me) => n[X] = Me
        });
      });
    } else t.exposed || (t.exposed = {});
  J && t.render === ht && (t.render = J), Fe != null && (t.inheritAttrs = Fe), Xe && (t.components = Xe), ke && (t.directives = ke), W && Wr(t);
}
function ta(t, e, n = ht) {
  j(t) && (t = qs(t));
  for (const s in t) {
    const i = t[s];
    let r;
    ye(i) ? "default" in i ? r = Fn(
      i.from || s,
      i.default,
      !0
    ) : r = Fn(i.from || s) : r = Fn(i), Ce(r) ? Object.defineProperty(e, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (o) => r.value = o
    }) : e[s] = r;
  }
}
function Bi(t, e, n) {
  gt(
    j(t) ? t.map((s) => s.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function Yr(t, e, n, s) {
  let i = s.includes(".") ? fo(n, s) : () => n[s];
  if (xe(t)) {
    const r = e[t];
    V(r) && Mn(i, r);
  } else if (V(t))
    Mn(i, t.bind(n));
  else if (ye(t))
    if (j(t))
      t.forEach((r) => Yr(r, e, n, s));
    else {
      const r = V(t.handler) ? t.handler.bind(n) : e[t.handler];
      V(r) && Mn(i, r, t);
    }
}
function Jr(t) {
  const e = t.type, { mixins: n, extends: s } = e, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = r.get(e);
  let a;
  return l ? a = l : !i.length && !n && !s ? a = e : (a = {}, i.length && i.forEach(
    (f) => Yn(a, f, o, !0)
  ), Yn(a, e, o)), ye(e) && r.set(e, a), a;
}
function Yn(t, e, n, s = !1) {
  const { mixins: i, extends: r } = e;
  r && Yn(t, r, n, !0), i && i.forEach(
    (o) => Yn(t, o, n, !0)
  );
  for (const o in e)
    if (!(s && o === "expose")) {
      const l = na[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const na = {
  data: $i,
  props: Ni,
  emits: Ni,
  // objects
  methods: un,
  computed: un,
  // lifecycle
  beforeCreate: Pe,
  created: Pe,
  beforeMount: Pe,
  mounted: Pe,
  beforeUpdate: Pe,
  updated: Pe,
  beforeDestroy: Pe,
  beforeUnmount: Pe,
  destroyed: Pe,
  unmounted: Pe,
  activated: Pe,
  deactivated: Pe,
  errorCaptured: Pe,
  serverPrefetch: Pe,
  // assets
  components: un,
  directives: un,
  // watch
  watch: ia,
  // provide / inject
  provide: $i,
  inject: sa
};
function $i(t, e) {
  return e ? t ? function() {
    return Oe(
      V(t) ? t.call(this, this) : t,
      V(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function sa(t, e) {
  return un(qs(t), qs(e));
}
function qs(t) {
  if (j(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function Pe(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function un(t, e) {
  return t ? Oe(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function Ni(t, e) {
  return t ? j(t) && j(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : Oe(
    /* @__PURE__ */ Object.create(null),
    Li(t),
    Li(e ?? {})
  ) : e;
}
function ia(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = Oe(/* @__PURE__ */ Object.create(null), t);
  for (const s in e)
    n[s] = Pe(t[s], e[s]);
  return n;
}
function Qr() {
  return {
    app: null,
    config: {
      isNativeTag: Go,
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
let ra = 0;
function oa(t, e) {
  return function(s, i = null) {
    V(s) || (s = Oe({}, s)), i != null && !ye(i) && (i = null);
    const r = Qr(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const f = r.app = {
      _uid: ra++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: Ha,
      get config() {
        return r.config;
      },
      set config(c) {
      },
      use(c, ...g) {
        return o.has(c) || (c && V(c.install) ? (o.add(c), c.install(f, ...g)) : V(c) && (o.add(c), c(f, ...g))), f;
      },
      mixin(c) {
        return r.mixins.includes(c) || r.mixins.push(c), f;
      },
      component(c, g) {
        return g ? (r.components[c] = g, f) : r.components[c];
      },
      directive(c, g) {
        return g ? (r.directives[c] = g, f) : r.directives[c];
      },
      mount(c, g, _) {
        if (!a) {
          const k = f._ceVNode || dt(s, i);
          return k.appContext = r, _ === !0 ? _ = "svg" : _ === !1 && (_ = void 0), t(k, c, _), a = !0, f._container = c, c.__vue_app__ = f, us(k.component);
        }
      },
      onUnmount(c) {
        l.push(c);
      },
      unmount() {
        a && (gt(
          l,
          f._instance,
          16
        ), t(null, f._container), delete f._container.__vue_app__);
      },
      provide(c, g) {
        return r.provides[c] = g, f;
      },
      runWithContext(c) {
        const g = en;
        en = f;
        try {
          return c();
        } finally {
          en = g;
        }
      }
    };
    return f;
  };
}
let en = null;
function la(t, e) {
  if ($e) {
    let n = $e.provides;
    const s = $e.parent && $e.parent.provides;
    s === n && (n = $e.provides = Object.create(s)), n[t] = e;
  }
}
function Fn(t, e, n = !1) {
  const s = $e || Ze;
  if (s || en) {
    const i = en ? en._context.provides : s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && V(e) ? e.call(s && s.proxy) : e;
  }
}
const Xr = {}, eo = () => Object.create(Xr), to = (t) => Object.getPrototypeOf(t) === Xr;
function aa(t, e, n, s = !1) {
  const i = {}, r = eo();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), no(t, e, i, r);
  for (const o in t.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? t.props = s ? i : Tl(i) : t.type.props ? t.props = i : t.props = r, t.attrs = r;
}
function ca(t, e, n, s) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: o }
  } = t, l = ie(i), [a] = t.propsOptions;
  let f = !1;
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
        if (as(t.emitsOptions, _))
          continue;
        const k = e[_];
        if (a)
          if (re(r, _))
            k !== r[_] && (r[_] = k, f = !0);
          else {
            const B = Ct(_);
            i[B] = Us(
              a,
              l,
              B,
              k,
              t,
              !1
            );
          }
        else
          k !== r[_] && (r[_] = k, f = !0);
      }
    }
  } else {
    no(t, e, i, r) && (f = !0);
    let c;
    for (const g in l)
      (!e || // for camelCase
      !re(e, g) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = jt(g)) === g || !re(e, c))) && (a ? n && // for camelCase
      (n[g] !== void 0 || // for kebab-case
      n[c] !== void 0) && (i[g] = Us(
        a,
        l,
        g,
        void 0,
        t,
        !0
      )) : delete i[g]);
    if (r !== l)
      for (const g in r)
        (!e || !re(e, g)) && (delete r[g], f = !0);
  }
  f && wt(t.attrs, "set", "");
}
function no(t, e, n, s) {
  const [i, r] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let a in e) {
      if (hn(a))
        continue;
      const f = e[a];
      let c;
      i && re(i, c = Ct(a)) ? !r || !r.includes(c) ? n[c] = f : (l || (l = {}))[c] = f : as(t.emitsOptions, a) || (!(a in s) || f !== s[a]) && (s[a] = f, o = !0);
    }
  if (r) {
    const a = ie(n), f = l || ue;
    for (let c = 0; c < r.length; c++) {
      const g = r[c];
      n[g] = Us(
        i,
        a,
        g,
        f[g],
        t,
        !re(f, g)
      );
    }
  }
  return o;
}
function Us(t, e, n, s, i, r) {
  const o = t[n];
  if (o != null) {
    const l = re(o, "default");
    if (l && s === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && V(a)) {
        const { propsDefaults: f } = i;
        if (n in f)
          s = f[n];
        else {
          const c = En(i);
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
    ] && (s === "" || s === jt(n)) && (s = !0));
  }
  return s;
}
const ua = /* @__PURE__ */ new WeakMap();
function so(t, e, n = !1) {
  const s = n ? ua : e.propsCache, i = s.get(t);
  if (i)
    return i;
  const r = t.props, o = {}, l = [];
  let a = !1;
  if (!V(t)) {
    const c = (g) => {
      a = !0;
      const [_, k] = so(g, e, !0);
      Oe(o, _), k && l.push(...k);
    };
    !n && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  if (!r && !a)
    return ye(t) && s.set(t, Yt), Yt;
  if (j(r))
    for (let c = 0; c < r.length; c++) {
      const g = Ct(r[c]);
      Fi(g) && (o[g] = ue);
    }
  else if (r)
    for (const c in r) {
      const g = Ct(c);
      if (Fi(g)) {
        const _ = r[c], k = o[g] = j(_) || V(_) ? { type: _ } : Oe({}, _), B = k.type;
        let P = !1, G = !0;
        if (j(B))
          for (let K = 0; K < B.length; ++K) {
            const Y = B[K], te = V(Y) && Y.name;
            if (te === "Boolean") {
              P = !0;
              break;
            } else te === "String" && (G = !1);
          }
        else
          P = V(B) && B.name === "Boolean";
        k[
          0
          /* shouldCast */
        ] = P, k[
          1
          /* shouldCastTrue */
        ] = G, (P || re(k, "default")) && l.push(g);
      }
    }
  const f = [o, l];
  return ye(t) && s.set(t, f), f;
}
function Fi(t) {
  return t[0] !== "$" && !hn(t);
}
const io = (t) => t[0] === "_" || t === "$stable", di = (t) => j(t) ? t.map(ft) : [ft(t)], fa = (t, e, n) => {
  if (e._n)
    return e;
  const s = Fl((...i) => di(e(...i)), n);
  return s._c = !1, s;
}, ro = (t, e, n) => {
  const s = t._ctx;
  for (const i in t) {
    if (io(i)) continue;
    const r = t[i];
    if (V(r))
      e[i] = fa(i, r, s);
    else if (r != null) {
      const o = di(r);
      e[i] = () => o;
    }
  }
}, oo = (t, e) => {
  const n = di(e);
  t.slots.default = () => n;
}, lo = (t, e, n) => {
  for (const s in e)
    (n || s !== "_") && (t[s] = e[s]);
}, ha = (t, e, n) => {
  const s = t.slots = eo();
  if (t.vnode.shapeFlag & 32) {
    const i = e._;
    i ? (lo(s, e, n), n && wr(s, "_", i, !0)) : ro(e, s);
  } else e && oo(t, e);
}, da = (t, e, n) => {
  const { vnode: s, slots: i } = t;
  let r = !0, o = ue;
  if (s.shapeFlag & 32) {
    const l = e._;
    l ? n && l === 1 ? r = !1 : lo(i, e, n) : (r = !e.$stable, ro(e, i)), o = e;
  } else e && (oo(t, e), o = { default: 1 });
  if (r)
    for (const l in i)
      !io(l) && o[l] == null && delete i[l];
}, Ue = Ra;
function pa(t) {
  return ga(t);
}
function ga(t, e) {
  const n = is();
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
    parentNode: g,
    nextSibling: _,
    setScopeId: k = ht,
    insertStaticContent: B
  } = t, P = (h, d, m, T = null, b = null, v = null, I = void 0, O = null, C = !!d.dynamicChildren) => {
    if (h === d)
      return;
    h && !on(h, d) && (T = lt(h), Ee(h, b, v, !0), h = null), d.patchFlag === -2 && (C = !1, d.dynamicChildren = null);
    const { type: E, ref: M, shapeFlag: L } = d;
    switch (E) {
      case cs:
        G(h, d, m, T);
        break;
      case Ut:
        K(h, d, m, T);
        break;
      case Dn:
        h == null && Y(d, m, T, I);
        break;
      case Ke:
        Xe(
          h,
          d,
          m,
          T,
          b,
          v,
          I,
          O,
          C
        );
        break;
      default:
        L & 1 ? J(
          h,
          d,
          m,
          T,
          b,
          v,
          I,
          O,
          C
        ) : L & 6 ? ke(
          h,
          d,
          m,
          T,
          b,
          v,
          I,
          O,
          C
        ) : (L & 64 || L & 128) && E.process(
          h,
          d,
          m,
          T,
          b,
          v,
          I,
          O,
          C,
          We
        );
    }
    M != null && b && Zn(M, h && h.ref, v, d || h, !d);
  }, G = (h, d, m, T) => {
    if (h == null)
      s(
        d.el = l(d.children),
        m,
        T
      );
    else {
      const b = d.el = h.el;
      d.children !== h.children && f(b, d.children);
    }
  }, K = (h, d, m, T) => {
    h == null ? s(
      d.el = a(d.children || ""),
      m,
      T
    ) : d.el = h.el;
  }, Y = (h, d, m, T) => {
    [h.el, h.anchor] = B(
      h.children,
      d,
      m,
      T,
      h.el,
      h.anchor
    );
  }, te = ({ el: h, anchor: d }, m, T) => {
    let b;
    for (; h && h !== d; )
      b = _(h), s(h, m, T), h = b;
    s(d, m, T);
  }, $ = ({ el: h, anchor: d }) => {
    let m;
    for (; h && h !== d; )
      m = _(h), i(h), h = m;
    i(d);
  }, J = (h, d, m, T, b, v, I, O, C) => {
    d.type === "svg" ? I = "svg" : d.type === "math" && (I = "mathml"), h == null ? Se(
      d,
      m,
      T,
      b,
      v,
      I,
      O,
      C
    ) : W(
      h,
      d,
      b,
      v,
      I,
      O,
      C
    );
  }, Se = (h, d, m, T, b, v, I, O) => {
    let C, E;
    const { props: M, shapeFlag: L, transition: R, dirs: S } = h;
    if (C = h.el = o(
      h.type,
      v,
      M && M.is,
      M
    ), L & 8 ? c(C, h.children) : L & 16 && Q(
      h.children,
      C,
      null,
      T,
      b,
      xs(h, v),
      I,
      O
    ), S && $t(h, null, T, "created"), F(C, h, h.scopeId, I, T), M) {
      for (const H in M)
        H !== "value" && !hn(H) && r(C, H, null, M[H], v, T);
      "value" in M && r(C, "value", null, M.value, v), (E = M.onVnodeBeforeMount) && at(E, T, h);
    }
    S && $t(h, null, T, "beforeMount");
    const x = ma(b, R);
    x && R.beforeEnter(C), s(C, d, m), ((E = M && M.onVnodeMounted) || x || S) && Ue(() => {
      E && at(E, T, h), x && R.enter(C), S && $t(h, null, T, "mounted");
    }, b);
  }, F = (h, d, m, T, b) => {
    if (m && k(h, m), T)
      for (let v = 0; v < T.length; v++)
        k(h, T[v]);
    if (b) {
      let v = b.subTree;
      if (d === v || po(v.type) && (v.ssContent === d || v.ssFallback === d)) {
        const I = b.vnode;
        F(
          h,
          I,
          I.scopeId,
          I.slotScopeIds,
          b.parent
        );
      }
    }
  }, Q = (h, d, m, T, b, v, I, O, C = 0) => {
    for (let E = C; E < h.length; E++) {
      const M = h[E] = O ? Et(h[E]) : ft(h[E]);
      P(
        null,
        M,
        d,
        m,
        T,
        b,
        v,
        I,
        O
      );
    }
  }, W = (h, d, m, T, b, v, I) => {
    const O = d.el = h.el;
    let { patchFlag: C, dynamicChildren: E, dirs: M } = d;
    C |= h.patchFlag & 16;
    const L = h.props || ue, R = d.props || ue;
    let S;
    if (m && Nt(m, !1), (S = R.onVnodeBeforeUpdate) && at(S, m, d, h), M && $t(d, h, m, "beforeUpdate"), m && Nt(m, !0), (L.innerHTML && R.innerHTML == null || L.textContent && R.textContent == null) && c(O, ""), E ? ge(
      h.dynamicChildren,
      E,
      O,
      m,
      T,
      xs(d, b),
      v
    ) : I || X(
      h,
      d,
      O,
      null,
      m,
      T,
      xs(d, b),
      v,
      !1
    ), C > 0) {
      if (C & 16)
        Fe(O, L, R, m, b);
      else if (C & 2 && L.class !== R.class && r(O, "class", null, R.class, b), C & 4 && r(O, "style", L.style, R.style, b), C & 8) {
        const x = d.dynamicProps;
        for (let H = 0; H < x.length; H++) {
          const D = x[H], ae = L[D], fe = R[D];
          (fe !== ae || D === "value") && r(O, D, ae, fe, b, m);
        }
      }
      C & 1 && h.children !== d.children && c(O, d.children);
    } else !I && E == null && Fe(O, L, R, m, b);
    ((S = R.onVnodeUpdated) || M) && Ue(() => {
      S && at(S, m, d, h), M && $t(d, h, m, "updated");
    }, T);
  }, ge = (h, d, m, T, b, v, I) => {
    for (let O = 0; O < d.length; O++) {
      const C = h[O], E = d[O], M = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        C.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (C.type === Ke || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !on(C, E) || // - In the case of a component, it could contain anything.
        C.shapeFlag & 70) ? g(C.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      P(
        C,
        E,
        M,
        null,
        T,
        b,
        v,
        I,
        !0
      );
    }
  }, Fe = (h, d, m, T, b) => {
    if (d !== m) {
      if (d !== ue)
        for (const v in d)
          !hn(v) && !(v in m) && r(
            h,
            v,
            d[v],
            null,
            b,
            T
          );
      for (const v in m) {
        if (hn(v)) continue;
        const I = m[v], O = d[v];
        I !== O && v !== "value" && r(h, v, O, I, b, T);
      }
      "value" in m && r(h, "value", d.value, m.value, b);
    }
  }, Xe = (h, d, m, T, b, v, I, O, C) => {
    const E = d.el = h ? h.el : l(""), M = d.anchor = h ? h.anchor : l("");
    let { patchFlag: L, dynamicChildren: R, slotScopeIds: S } = d;
    S && (O = O ? O.concat(S) : S), h == null ? (s(E, m, T), s(M, m, T), Q(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      m,
      M,
      b,
      v,
      I,
      O,
      C
    )) : L > 0 && L & 64 && R && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    h.dynamicChildren ? (ge(
      h.dynamicChildren,
      R,
      m,
      b,
      v,
      I,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || b && d === b.subTree) && ao(
      h,
      d,
      !0
      /* shallow */
    )) : X(
      h,
      d,
      m,
      M,
      b,
      v,
      I,
      O,
      C
    );
  }, ke = (h, d, m, T, b, v, I, O, C) => {
    d.slotScopeIds = O, h == null ? d.shapeFlag & 512 ? b.ctx.activate(
      d,
      m,
      T,
      I,
      C
    ) : Lt(
      d,
      m,
      T,
      b,
      v,
      I,
      C
    ) : rt(h, d, C);
  }, Lt = (h, d, m, T, b, v, I) => {
    const O = h.component = Na(
      h,
      T,
      b
    );
    if (Kr(h) && (O.ctx.renderer = We), Fa(O, !1, I), O.asyncDep) {
      if (b && b.registerDep(O, de, I), !h.el) {
        const C = O.subTree = dt(Ut);
        K(null, C, d, m);
      }
    } else
      de(
        O,
        h,
        d,
        m,
        b,
        v,
        I
      );
  }, rt = (h, d, m) => {
    const T = d.component = h.component;
    if (Ta(h, d, m))
      if (T.asyncDep && !T.asyncResolved) {
        se(T, d, m);
        return;
      } else
        T.next = d, T.update();
    else
      d.el = h.el, T.vnode = d;
  }, de = (h, d, m, T, b, v, I) => {
    const O = () => {
      if (h.isMounted) {
        let { next: L, bu: R, u: S, parent: x, vnode: H } = h;
        {
          const u = co(h);
          if (u) {
            L && (L.el = H.el, se(h, L, I)), u.asyncDep.then(() => {
              h.isUnmounted || O();
            });
            return;
          }
        }
        let D = L, ae;
        Nt(h, !1), L ? (L.el = H.el, se(h, L, I)) : L = H, R && Nn(R), (ae = L.props && L.props.onVnodeBeforeUpdate) && at(ae, x, L, H), Nt(h, !0);
        const fe = Di(h), De = h.subTree;
        h.subTree = fe, P(
          De,
          fe,
          // parent may have changed if it's in a teleport
          g(De.el),
          // anchor may have changed if it's in a fragment
          lt(De),
          h,
          b,
          v
        ), L.el = fe.el, D === null && Ea(h, fe.el), S && Ue(S, b), (ae = L.props && L.props.onVnodeUpdated) && Ue(
          () => at(ae, x, L, H),
          b
        );
      } else {
        let L;
        const { el: R, props: S } = d, { bm: x, m: H, parent: D, root: ae, type: fe } = h, De = gn(d);
        Nt(h, !1), x && Nn(x), !De && (L = S && S.onVnodeBeforeMount) && at(L, D, d), Nt(h, !0);
        {
          ae.ce && ae.ce._injectChildStyle(fe);
          const u = h.subTree = Di(h);
          P(
            null,
            u,
            m,
            T,
            h,
            b,
            v
          ), d.el = u.el;
        }
        if (H && Ue(H, b), !De && (L = S && S.onVnodeMounted)) {
          const u = d;
          Ue(
            () => at(L, D, u),
            b
          );
        }
        (d.shapeFlag & 256 || D && gn(D.vnode) && D.vnode.shapeFlag & 256) && h.a && Ue(h.a, b), h.isMounted = !0, d = m = T = null;
      }
    };
    h.scope.on();
    const C = h.effect = new Sr(O);
    h.scope.off();
    const E = h.update = C.run.bind(C), M = h.job = C.runIfDirty.bind(C);
    M.i = h, M.id = h.uid, C.scheduler = () => ui(M), Nt(h, !0), E();
  }, se = (h, d, m) => {
    d.component = h;
    const T = h.vnode.props;
    h.vnode = d, h.next = null, ca(h, d.props, T, m), da(h, d.children, m), It(), Pi(h), Pt();
  }, X = (h, d, m, T, b, v, I, O, C = !1) => {
    const E = h && h.children, M = h ? h.shapeFlag : 0, L = d.children, { patchFlag: R, shapeFlag: S } = d;
    if (R > 0) {
      if (R & 128) {
        et(
          E,
          L,
          m,
          T,
          b,
          v,
          I,
          O,
          C
        );
        return;
      } else if (R & 256) {
        Me(
          E,
          L,
          m,
          T,
          b,
          v,
          I,
          O,
          C
        );
        return;
      }
    }
    S & 8 ? (M & 16 && ot(E, b, v), L !== E && c(m, L)) : M & 16 ? S & 16 ? et(
      E,
      L,
      m,
      T,
      b,
      v,
      I,
      O,
      C
    ) : ot(E, b, v, !0) : (M & 8 && c(m, ""), S & 16 && Q(
      L,
      m,
      T,
      b,
      v,
      I,
      O,
      C
    ));
  }, Me = (h, d, m, T, b, v, I, O, C) => {
    h = h || Yt, d = d || Yt;
    const E = h.length, M = d.length, L = Math.min(E, M);
    let R;
    for (R = 0; R < L; R++) {
      const S = d[R] = C ? Et(d[R]) : ft(d[R]);
      P(
        h[R],
        S,
        m,
        null,
        b,
        v,
        I,
        O,
        C
      );
    }
    E > M ? ot(
      h,
      b,
      v,
      !0,
      !1,
      L
    ) : Q(
      d,
      m,
      T,
      b,
      v,
      I,
      O,
      C,
      L
    );
  }, et = (h, d, m, T, b, v, I, O, C) => {
    let E = 0;
    const M = d.length;
    let L = h.length - 1, R = M - 1;
    for (; E <= L && E <= R; ) {
      const S = h[E], x = d[E] = C ? Et(d[E]) : ft(d[E]);
      if (on(S, x))
        P(
          S,
          x,
          m,
          null,
          b,
          v,
          I,
          O,
          C
        );
      else
        break;
      E++;
    }
    for (; E <= L && E <= R; ) {
      const S = h[L], x = d[R] = C ? Et(d[R]) : ft(d[R]);
      if (on(S, x))
        P(
          S,
          x,
          m,
          null,
          b,
          v,
          I,
          O,
          C
        );
      else
        break;
      L--, R--;
    }
    if (E > L) {
      if (E <= R) {
        const S = R + 1, x = S < M ? d[S].el : T;
        for (; E <= R; )
          P(
            null,
            d[E] = C ? Et(d[E]) : ft(d[E]),
            m,
            x,
            b,
            v,
            I,
            O,
            C
          ), E++;
      }
    } else if (E > R)
      for (; E <= L; )
        Ee(h[E], b, v, !0), E++;
    else {
      const S = E, x = E, H = /* @__PURE__ */ new Map();
      for (E = x; E <= R; E++) {
        const y = d[E] = C ? Et(d[E]) : ft(d[E]);
        y.key != null && H.set(y.key, E);
      }
      let D, ae = 0;
      const fe = R - x + 1;
      let De = !1, u = 0;
      const p = new Array(fe);
      for (E = 0; E < fe; E++) p[E] = 0;
      for (E = S; E <= L; E++) {
        const y = h[E];
        if (ae >= fe) {
          Ee(y, b, v, !0);
          continue;
        }
        let A;
        if (y.key != null)
          A = H.get(y.key);
        else
          for (D = x; D <= R; D++)
            if (p[D - x] === 0 && on(y, d[D])) {
              A = D;
              break;
            }
        A === void 0 ? Ee(y, b, v, !0) : (p[A - x] = E + 1, A >= u ? u = A : De = !0, P(
          y,
          d[A],
          m,
          null,
          b,
          v,
          I,
          O,
          C
        ), ae++);
      }
      const w = De ? ya(p) : Yt;
      for (D = w.length - 1, E = fe - 1; E >= 0; E--) {
        const y = x + E, A = d[y], N = y + 1 < M ? d[y + 1].el : T;
        p[E] === 0 ? P(
          null,
          A,
          m,
          N,
          b,
          v,
          I,
          O,
          C
        ) : De && (D < 0 || E !== w[D] ? Te(A, m, N, 2) : D--);
      }
    }
  }, Te = (h, d, m, T, b = null) => {
    const { el: v, type: I, transition: O, children: C, shapeFlag: E } = h;
    if (E & 6) {
      Te(h.component.subTree, d, m, T);
      return;
    }
    if (E & 128) {
      h.suspense.move(d, m, T);
      return;
    }
    if (E & 64) {
      I.move(h, d, m, We);
      return;
    }
    if (I === Ke) {
      s(v, d, m);
      for (let L = 0; L < C.length; L++)
        Te(C[L], d, m, T);
      s(h.anchor, d, m);
      return;
    }
    if (I === Dn) {
      te(h, d, m);
      return;
    }
    if (T !== 2 && E & 1 && O)
      if (T === 0)
        O.beforeEnter(v), s(v, d, m), Ue(() => O.enter(v), b);
      else {
        const { leave: L, delayLeave: R, afterLeave: S } = O, x = () => s(v, d, m), H = () => {
          L(v, () => {
            x(), S && S();
          });
        };
        R ? R(v, x, H) : H();
      }
    else
      s(v, d, m);
  }, Ee = (h, d, m, T = !1, b = !1) => {
    const {
      type: v,
      props: I,
      ref: O,
      children: C,
      dynamicChildren: E,
      shapeFlag: M,
      patchFlag: L,
      dirs: R,
      cacheIndex: S
    } = h;
    if (L === -2 && (b = !1), O != null && Zn(O, null, m, h, !0), S != null && (d.renderCache[S] = void 0), M & 256) {
      d.ctx.deactivate(h);
      return;
    }
    const x = M & 1 && R, H = !gn(h);
    let D;
    if (H && (D = I && I.onVnodeBeforeUnmount) && at(D, d, h), M & 6)
      Bt(h.component, m, T);
    else {
      if (M & 128) {
        h.suspense.unmount(m, T);
        return;
      }
      x && $t(h, null, d, "beforeUnmount"), M & 64 ? h.type.remove(
        h,
        d,
        m,
        We,
        T
      ) : E && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !E.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (v !== Ke || L > 0 && L & 64) ? ot(
        E,
        d,
        m,
        !1,
        !0
      ) : (v === Ke && L & 384 || !b && M & 16) && ot(C, d, m), T && kt(h);
    }
    (H && (D = I && I.onVnodeUnmounted) || x) && Ue(() => {
      D && at(D, d, h), x && $t(h, null, d, "unmounted");
    }, m);
  }, kt = (h) => {
    const { type: d, el: m, anchor: T, transition: b } = h;
    if (d === Ke) {
      Vt(m, T);
      return;
    }
    if (d === Dn) {
      $(h);
      return;
    }
    const v = () => {
      i(m), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (h.shapeFlag & 1 && b && !b.persisted) {
      const { leave: I, delayLeave: O } = b, C = () => I(m, v);
      O ? O(h.el, v, C) : C();
    } else
      v();
  }, Vt = (h, d) => {
    let m;
    for (; h !== d; )
      m = _(h), i(h), h = m;
    i(d);
  }, Bt = (h, d, m) => {
    const { bum: T, scope: b, job: v, subTree: I, um: O, m: C, a: E } = h;
    Mi(C), Mi(E), T && Nn(T), b.stop(), v && (v.flags |= 8, Ee(I, h, d, m)), O && Ue(O, d), Ue(() => {
      h.isUnmounted = !0;
    }, d), d && d.pendingBranch && !d.isUnmounted && h.asyncDep && !h.asyncResolved && h.suspenseId === d.pendingId && (d.deps--, d.deps === 0 && d.resolve());
  }, ot = (h, d, m, T = !1, b = !1, v = 0) => {
    for (let I = v; I < h.length; I++)
      Ee(h[I], d, m, T, b);
  }, lt = (h) => {
    if (h.shapeFlag & 6)
      return lt(h.component.subTree);
    if (h.shapeFlag & 128)
      return h.suspense.next();
    const d = _(h.anchor || h.el), m = d && d[Ml];
    return m ? _(m) : d;
  };
  let Ve = !1;
  const yt = (h, d, m) => {
    h == null ? d._vnode && Ee(d._vnode, null, null, !0) : P(
      d._vnode || null,
      h,
      d,
      null,
      null,
      null,
      m
    ), d._vnode = h, Ve || (Ve = !0, Pi(), jr(), Ve = !1);
  }, We = {
    p: P,
    um: Ee,
    m: Te,
    r: kt,
    mt: Lt,
    mc: Q,
    pc: X,
    pbc: ge,
    n: lt,
    o: t
  };
  return {
    render: yt,
    hydrate: void 0,
    createApp: oa(yt)
  };
}
function xs({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function Nt({ effect: t, job: e }, n) {
  n ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function ma(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function ao(t, e, n = !1) {
  const s = t.children, i = e.children;
  if (j(s) && j(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      let l = i[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[r] = Et(i[r]), l.el = o.el), !n && l.patchFlag !== -2 && ao(o, l)), l.type === cs && (l.el = o.el);
    }
}
function ya(t) {
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
function co(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : co(e);
}
function Mi(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
const _a = Symbol.for("v-scx"), ba = () => Fn(_a);
function Mn(t, e, n) {
  return uo(t, e, n);
}
function uo(t, e, n = ue) {
  const { immediate: s, deep: i, flush: r, once: o } = n, l = Oe({}, n), a = e && s || !e && r !== "post";
  let f;
  if (Sn) {
    if (r === "sync") {
      const k = ba();
      f = k.__watcherHandles || (k.__watcherHandles = []);
    } else if (!a) {
      const k = () => {
      };
      return k.stop = ht, k.resume = ht, k.pause = ht, k;
    }
  }
  const c = $e;
  l.call = (k, B, P) => gt(k, c, B, P);
  let g = !1;
  r === "post" ? l.scheduler = (k) => {
    Ue(k, c && c.suspense);
  } : r !== "sync" && (g = !0, l.scheduler = (k, B) => {
    B ? k() : ui(k);
  }), l.augmentJob = (k) => {
    e && (k.flags |= 4), g && (k.flags |= 2, c && (k.id = c.uid, k.i = c));
  };
  const _ = Ll(t, e, l);
  return Sn && (f ? f.push(_) : a && _()), _;
}
function wa(t, e, n) {
  const s = this.proxy, i = xe(t) ? t.includes(".") ? fo(s, t) : () => s[t] : t.bind(s, s);
  let r;
  V(e) ? r = e : (r = e.handler, n = e);
  const o = En(this), l = uo(i, r.bind(s), n);
  return o(), l;
}
function fo(t, e) {
  const n = e.split(".");
  return () => {
    let s = t;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
const va = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${Ct(e)}Modifiers`] || t[`${jt(e)}Modifiers`];
function xa(t, e, ...n) {
  if (t.isUnmounted) return;
  const s = t.vnode.props || ue;
  let i = n;
  const r = e.startsWith("update:"), o = r && va(s, e.slice(7));
  o && (o.trim && (i = n.map((c) => xe(c) ? c.trim() : c)), o.number && (i = n.map(Ps)));
  let l, a = s[l = gs(e)] || // also try camelCase event handler (#2249)
  s[l = gs(Ct(e))];
  !a && r && (a = s[l = gs(jt(e))]), a && gt(
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
    t.emitted[l] = !0, gt(
      f,
      t,
      6,
      i
    );
  }
}
function ho(t, e, n = !1) {
  const s = e.emitsCache, i = s.get(t);
  if (i !== void 0)
    return i;
  const r = t.emits;
  let o = {}, l = !1;
  if (!V(t)) {
    const a = (f) => {
      const c = ho(f, e, !0);
      c && (l = !0, Oe(o, c));
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  return !r && !l ? (ye(t) && s.set(t, null), null) : (j(r) ? r.forEach((a) => o[a] = null) : Oe(o, r), ye(t) && s.set(t, o), o);
}
function as(t, e) {
  return !t || !ts(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), re(t, e[0].toLowerCase() + e.slice(1)) || re(t, jt(e)) || re(t, e));
}
function Di(t) {
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
    props: g,
    data: _,
    setupState: k,
    ctx: B,
    inheritAttrs: P
  } = t, G = Gn(t);
  let K, Y;
  try {
    if (n.shapeFlag & 4) {
      const $ = i || s, J = $;
      K = ft(
        f.call(
          J,
          $,
          c,
          g,
          k,
          _,
          B
        )
      ), Y = l;
    } else {
      const $ = e;
      K = ft(
        $.length > 1 ? $(
          g,
          { attrs: l, slots: o, emit: a }
        ) : $(
          g,
          null
        )
      ), Y = e.props ? l : ka(l);
    }
  } catch ($) {
    yn.length = 0, os($, t, 1), K = dt(Ut);
  }
  let te = K;
  if (Y && P !== !1) {
    const $ = Object.keys(Y), { shapeFlag: J } = te;
    $.length && J & 7 && (r && $.some(Xs) && (Y = Sa(
      Y,
      r
    )), te = tn(te, Y, !1, !0));
  }
  return n.dirs && (te = tn(te, null, !1, !0), te.dirs = te.dirs ? te.dirs.concat(n.dirs) : n.dirs), n.transition && fi(te, n.transition), K = te, Gn(G), K;
}
const ka = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || ts(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, Sa = (t, e) => {
  const n = {};
  for (const s in t)
    (!Xs(s) || !(s.slice(9) in e)) && (n[s] = t[s]);
  return n;
};
function Ta(t, e, n) {
  const { props: s, children: i, component: r } = t, { props: o, children: l, patchFlag: a } = e, f = r.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? qi(s, o, f) : !!o;
    if (a & 8) {
      const c = e.dynamicProps;
      for (let g = 0; g < c.length; g++) {
        const _ = c[g];
        if (o[_] !== s[_] && !as(f, _))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? qi(s, o, f) : !0 : !!o;
  return !1;
}
function qi(t, e, n) {
  const s = Object.keys(e);
  if (s.length !== Object.keys(t).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (e[r] !== t[r] && !as(n, r))
      return !0;
  }
  return !1;
}
function Ea({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const s = e.subTree;
    if (s.suspense && s.suspense.activeBranch === t && (s.el = t.el), s === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const po = (t) => t.__isSuspense;
function Ra(t, e) {
  e && e.pendingBranch ? j(t) ? e.effects.push(...t) : e.effects.push(t) : Nl(t);
}
const Ke = Symbol.for("v-fgt"), cs = Symbol.for("v-txt"), Ut = Symbol.for("v-cmt"), Dn = Symbol.for("v-stc"), yn = [];
let ze = null;
function me(t = !1) {
  yn.push(ze = t ? null : []);
}
function Aa() {
  yn.pop(), ze = yn[yn.length - 1] || null;
}
let kn = 1;
function Ui(t, e = !1) {
  kn += t, t < 0 && ze && e && (ze.hasOnce = !0);
}
function go(t) {
  return t.dynamicChildren = kn > 0 ? ze || Yt : null, Aa(), kn > 0 && ze && ze.push(t), t;
}
function we(t, e, n, s, i, r) {
  return go(
    U(
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
function Ca(t, e, n, s, i) {
  return go(
    dt(
      t,
      e,
      n,
      s,
      i,
      !0
    )
  );
}
function mo(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function on(t, e) {
  return t.type === e.type && t.key === e.key;
}
const yo = ({ key: t }) => t ?? null, qn = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? xe(t) || Ce(t) || V(t) ? { i: Ze, r: t, k: e, f: !!n } : t : null);
function U(t, e = null, n = null, s = 0, i = null, r = t === Ke ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && yo(e),
    ref: e && qn(e),
    scopeId: Vr,
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
    ctx: Ze
  };
  return l ? (pi(a, n), r & 128 && t.normalize(a)) : n && (a.shapeFlag |= xe(n) ? 8 : 16), kn > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ze && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && ze.push(a), a;
}
const dt = Oa;
function Oa(t, e = null, n = null, s = 0, i = null, r = !1) {
  if ((!t || t === Ql) && (t = Ut), mo(t)) {
    const l = tn(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && pi(l, n), kn > 0 && !r && ze && (l.shapeFlag & 6 ? ze[ze.indexOf(t)] = l : ze.push(l)), l.patchFlag = -2, l;
  }
  if (Ua(t) && (t = t.__vccOpts), e) {
    e = Ia(e);
    let { class: l, style: a } = e;
    l && !xe(l) && (e.class = nt(l)), ye(a) && (ci(a) && !j(a) && (a = Oe({}, a)), e.style = Le(a));
  }
  const o = xe(t) ? 1 : po(t) ? 128 : Dl(t) ? 64 : ye(t) ? 4 : V(t) ? 2 : 0;
  return U(
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
function Ia(t) {
  return t ? ci(t) || to(t) ? Oe({}, t) : t : null;
}
function tn(t, e, n = !1, s = !1) {
  const { props: i, ref: r, patchFlag: o, children: l, transition: a } = t, f = e ? La(i || {}, e) : i, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: f,
    key: f && yo(f),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? j(r) ? r.concat(qn(e)) : [r, qn(e)] : qn(e)
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
    patchFlag: e && t.type !== Ke ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: t.ssContent && tn(t.ssContent),
    ssFallback: t.ssFallback && tn(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return a && s && fi(
    c,
    a.clone(c)
  ), c;
}
function Hs(t = " ", e = 0) {
  return dt(cs, null, t, e);
}
function Pa(t, e) {
  const n = dt(Dn, null, t);
  return n.staticCount = e, n;
}
function qe(t = "", e = !1) {
  return e ? (me(), Ca(Ut, null, t)) : dt(Ut, null, t);
}
function ft(t) {
  return t == null || typeof t == "boolean" ? dt(Ut) : j(t) ? dt(
    Ke,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : mo(t) ? Et(t) : dt(cs, null, String(t));
}
function Et(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : tn(t);
}
function pi(t, e) {
  let n = 0;
  const { shapeFlag: s } = t;
  if (e == null)
    e = null;
  else if (j(e))
    n = 16;
  else if (typeof e == "object")
    if (s & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), pi(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !to(e) ? e._ctx = Ze : i === 3 && Ze && (Ze.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else V(e) ? (e = { default: e, _ctx: Ze }, n = 32) : (e = String(e), s & 64 ? (n = 16, e = [Hs(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function La(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    for (const i in s)
      if (i === "class")
        e.class !== s.class && (e.class = nt([e.class, s.class]));
      else if (i === "style")
        e.style = Le([e.style, s.style]);
      else if (ts(i)) {
        const r = e[i], o = s[i];
        o && r !== o && !(j(r) && r.includes(o)) && (e[i] = r ? [].concat(r, o) : o);
      } else i !== "" && (e[i] = s[i]);
  }
  return e;
}
function at(t, e, n, s = null) {
  gt(t, e, 7, [
    n,
    s
  ]);
}
const Ba = Qr();
let $a = 0;
function Na(t, e, n) {
  const s = t.type, i = (e ? e.appContext : t.appContext) || Ba, r = {
    uid: $a++,
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
    scope: new rl(
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
    propsOptions: so(s, i),
    emitsOptions: ho(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ue,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: ue,
    data: ue,
    props: ue,
    attrs: ue,
    slots: ue,
    refs: ue,
    setupState: ue,
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
  return r.ctx = { _: r }, r.root = e ? e.root : r, r.emit = xa.bind(null, r), t.ce && t.ce(r), r;
}
let $e = null, Jn, js;
{
  const t = is(), e = (n, s) => {
    let i;
    return (i = t[n]) || (i = t[n] = []), i.push(s), (r) => {
      i.length > 1 ? i.forEach((o) => o(r)) : i[0](r);
    };
  };
  Jn = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => $e = n
  ), js = e(
    "__VUE_SSR_SETTERS__",
    (n) => Sn = n
  );
}
const En = (t) => {
  const e = $e;
  return Jn(t), t.scope.on(), () => {
    t.scope.off(), Jn(e);
  };
}, Hi = () => {
  $e && $e.scope.off(), Jn(null);
};
function _o(t) {
  return t.vnode.shapeFlag & 4;
}
let Sn = !1;
function Fa(t, e = !1, n = !1) {
  e && js(e);
  const { props: s, children: i } = t.vnode, r = _o(t);
  aa(t, s, r, e), ha(t, i, n);
  const o = r ? Ma(t, e) : void 0;
  return e && js(!1), o;
}
function Ma(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, Xl);
  const { setup: s } = n;
  if (s) {
    It();
    const i = t.setupContext = s.length > 1 ? qa(t) : null, r = En(t), o = Tn(
      s,
      t,
      0,
      [
        t.props,
        i
      ]
    ), l = mr(o);
    if (Pt(), r(), (l || t.sp) && !gn(t) && Wr(t), l) {
      if (o.then(Hi, Hi), e)
        return o.then((a) => {
          ji(t, a);
        }).catch((a) => {
          os(a, t, 0);
        });
      t.asyncDep = o;
    } else
      ji(t, o);
  } else
    bo(t);
}
function ji(t, e, n) {
  V(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : ye(e) && (t.setupState = Dr(e)), bo(t);
}
function bo(t, e, n) {
  const s = t.type;
  t.render || (t.render = s.render || ht);
  {
    const i = En(t);
    It();
    try {
      ea(t);
    } finally {
      Pt(), i();
    }
  }
}
const Da = {
  get(t, e) {
    return Re(t, "get", ""), t[e];
  }
};
function qa(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    attrs: new Proxy(t.attrs, Da),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function us(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(Dr(El(t.exposed)), {
    get(e, n) {
      if (n in e)
        return e[n];
      if (n in mn)
        return mn[n](t);
    },
    has(e, n) {
      return n in e || n in mn;
    }
  })) : t.proxy;
}
function Ua(t) {
  return V(t) && "__vccOpts" in t;
}
const je = (t, e) => Il(t, e, Sn), Ha = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let zs;
const zi = typeof window < "u" && window.trustedTypes;
if (zi)
  try {
    zs = /* @__PURE__ */ zi.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const wo = zs ? (t) => zs.createHTML(t) : (t) => t, ja = "http://www.w3.org/2000/svg", za = "http://www.w3.org/1998/Math/MathML", bt = typeof document < "u" ? document : null, Vi = bt && /* @__PURE__ */ bt.createElement("template"), Va = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, s) => {
    const i = e === "svg" ? bt.createElementNS(ja, t) : e === "mathml" ? bt.createElementNS(za, t) : n ? bt.createElement(t, { is: n }) : bt.createElement(t);
    return t === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (t) => bt.createTextNode(t),
  createComment: (t) => bt.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => bt.querySelector(t),
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
      Vi.innerHTML = wo(
        s === "svg" ? `<svg>${t}</svg>` : s === "mathml" ? `<math>${t}</math>` : t
      );
      const l = Vi.content;
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
}, Wa = Symbol("_vtc");
function Ka(t, e, n) {
  const s = t[Wa];
  s && (e = (e ? [e, ...s] : [...s]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const Wi = Symbol("_vod"), Ga = Symbol("_vsh"), Za = Symbol(""), Ya = /(^|;)\s*display\s*:/;
function Ja(t, e, n) {
  const s = t.style, i = xe(n);
  let r = !1;
  if (n && !i) {
    if (e)
      if (xe(e))
        for (const o of e.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && Un(s, l, "");
        }
      else
        for (const o in e)
          n[o] == null && Un(s, o, "");
    for (const o in n)
      o === "display" && (r = !0), Un(s, o, n[o]);
  } else if (i) {
    if (e !== n) {
      const o = s[Za];
      o && (n += ";" + o), s.cssText = n, r = Ya.test(n);
    }
  } else e && t.removeAttribute("style");
  Wi in t && (t[Wi] = r ? s.display : "", t[Ga] && (s.display = "none"));
}
const Ki = /\s*!important$/;
function Un(t, e, n) {
  if (j(n))
    n.forEach((s) => Un(t, e, s));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const s = Qa(t, e);
    Ki.test(n) ? t.setProperty(
      jt(s),
      n.replace(Ki, ""),
      "important"
    ) : t[s] = n;
  }
}
const Gi = ["Webkit", "Moz", "ms"], ks = {};
function Qa(t, e) {
  const n = ks[e];
  if (n)
    return n;
  let s = Ct(e);
  if (s !== "filter" && s in t)
    return ks[e] = s;
  s = br(s);
  for (let i = 0; i < Gi.length; i++) {
    const r = Gi[i] + s;
    if (r in t)
      return ks[e] = r;
  }
  return e;
}
const Zi = "http://www.w3.org/1999/xlink";
function Yi(t, e, n, s, i, r = il(e)) {
  s && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(Zi, e.slice(6, e.length)) : t.setAttributeNS(Zi, e, n) : n == null || r && !vr(n) ? t.removeAttribute(e) : t.setAttribute(
    e,
    r ? "" : Ot(n) ? String(n) : n
  );
}
function Ji(t, e, n, s, i) {
  if (e === "innerHTML" || e === "textContent") {
    n != null && (t[e] = e === "innerHTML" ? wo(n) : n);
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
    l === "boolean" ? n = vr(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  o && t.removeAttribute(i || e);
}
function Zt(t, e, n, s) {
  t.addEventListener(e, n, s);
}
function Xa(t, e, n, s) {
  t.removeEventListener(e, n, s);
}
const Qi = Symbol("_vei");
function ec(t, e, n, s, i = null) {
  const r = t[Qi] || (t[Qi] = {}), o = r[e];
  if (s && o)
    o.value = s;
  else {
    const [l, a] = tc(e);
    if (s) {
      const f = r[e] = ic(
        s,
        i
      );
      Zt(t, l, f, a);
    } else o && (Xa(t, l, o, a), r[e] = void 0);
  }
}
const Xi = /(?:Once|Passive|Capture)$/;
function tc(t) {
  let e;
  if (Xi.test(t)) {
    e = {};
    let s;
    for (; s = t.match(Xi); )
      t = t.slice(0, t.length - s[0].length), e[s[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : jt(t.slice(2)), e];
}
let Ss = 0;
const nc = /* @__PURE__ */ Promise.resolve(), sc = () => Ss || (nc.then(() => Ss = 0), Ss = Date.now());
function ic(t, e) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    gt(
      rc(s, n.value),
      e,
      5,
      [s]
    );
  };
  return n.value = t, n.attached = sc(), n;
}
function rc(t, e) {
  if (j(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map(
      (s) => (i) => !i._stopped && s && s(i)
    );
  } else
    return e;
}
const er = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, oc = (t, e, n, s, i, r) => {
  const o = i === "svg";
  e === "class" ? Ka(t, s, o) : e === "style" ? Ja(t, n, s) : ts(e) ? Xs(e) || ec(t, e, n, s, r) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : lc(t, e, s, o)) ? (Ji(t, e, s), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && Yi(t, e, s, o, r, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && (/[A-Z]/.test(e) || !xe(s)) ? Ji(t, Ct(e), s, r, e) : (e === "true-value" ? t._trueValue = s : e === "false-value" && (t._falseValue = s), Yi(t, e, s, o));
};
function lc(t, e, n, s) {
  if (s)
    return !!(e === "innerHTML" || e === "textContent" || e in t && er(e) && V(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return er(e) && xe(n) ? !1 : e in t;
}
const tr = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return j(e) ? (n) => Nn(e, n) : e;
};
function ac(t) {
  t.target.composing = !0;
}
function nr(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const Ts = Symbol("_assign"), Pn = {
  created(t, { modifiers: { lazy: e, trim: n, number: s } }, i) {
    t[Ts] = tr(i);
    const r = s || i.props && i.props.type === "number";
    Zt(t, e ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let l = t.value;
      n && (l = l.trim()), r && (l = Ps(l)), t[Ts](l);
    }), n && Zt(t, "change", () => {
      t.value = t.value.trim();
    }), e || (Zt(t, "compositionstart", ac), Zt(t, "compositionend", nr), Zt(t, "change", nr));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: n, modifiers: { lazy: s, trim: i, number: r } }, o) {
    if (t[Ts] = tr(o), t.composing) return;
    const l = (r || t.type === "number") && !/^0\d/.test(t.value) ? Ps(t.value) : t.value, a = e ?? "";
    l !== a && (document.activeElement === t && t.type !== "range" && (s && e === n || i && t.value.trim() === a) || (t.value = a));
  }
}, cc = /* @__PURE__ */ Oe({ patchProp: oc }, Va);
let sr;
function uc() {
  return sr || (sr = pa(cc));
}
const fc = (...t) => {
  const e = uc().createApp(...t), { mount: n } = e;
  return e.mount = (s) => {
    const i = dc(s);
    if (!i) return;
    const r = e._component;
    !V(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = n(i, !1, hc(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, e;
};
function hc(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function dc(t) {
  return xe(t) ? document.querySelector(t) : t;
}
const St = (t) => {
  const e = t.replace("#", ""), n = parseInt(e.substr(0, 2), 16), s = parseInt(e.substr(2, 2), 16), i = parseInt(e.substr(4, 2), 16);
  return (n * 299 + s * 587 + i * 114) / 1e3 < 128;
}, pc = (t, e) => {
  const n = t.replace("#", ""), s = parseInt(n.substr(0, 2), 16), i = parseInt(n.substr(2, 2), 16), r = parseInt(n.substr(4, 2), 16), o = St(t), l = o ? Math.min(255, s + e) : Math.max(0, s - e), a = o ? Math.min(255, i + e) : Math.max(0, i - e), f = o ? Math.min(255, r + e) : Math.max(0, r - e);
  return `#${l.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}${f.toString(16).padStart(2, "0")}`;
}, Es = (t) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t), gc = (t) => {
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
function gi() {
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
let zt = gi();
function vo(t) {
  zt = t;
}
const _n = { exec: () => null };
function le(t, e = "") {
  let n = typeof t == "string" ? t : t.source;
  const s = {
    replace: (i, r) => {
      let o = typeof r == "string" ? r : r.source;
      return o = o.replace(Ne.caret, "$1"), n = n.replace(i, o), s;
    },
    getRegex: () => new RegExp(n, e)
  };
  return s;
}
const Ne = {
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
}, mc = /^(?:[ \t]*(?:\n|$))+/, yc = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, _c = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Rn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, bc = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, xo = /(?:[*+-]|\d{1,9}[.)])/, ko = le(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, xo).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), mi = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, wc = /^[^\n]+/, yi = /(?!\s*\])(?:\\.|[^\[\]\\])+/, vc = le(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", yi).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), xc = le(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, xo).getRegex(), fs = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", _i = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, kc = le("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", _i).replace("tag", fs).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), So = le(mi).replace("hr", Rn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", fs).getRegex(), Sc = le(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", So).getRegex(), bi = {
  blockquote: Sc,
  code: yc,
  def: vc,
  fences: _c,
  heading: bc,
  hr: Rn,
  html: kc,
  lheading: ko,
  list: xc,
  newline: mc,
  paragraph: So,
  table: _n,
  text: wc
}, ir = le("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Rn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", fs).getRegex(), Tc = {
  ...bi,
  table: ir,
  paragraph: le(mi).replace("hr", Rn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ir).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", fs).getRegex()
}, Ec = {
  ...bi,
  html: le(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", _i).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: _n,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: le(mi).replace("hr", Rn).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", ko).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Rc = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Ac = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, To = /^( {2,}|\\)\n(?!\s*$)/, Cc = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, hs = /[\p{P}\p{S}]/u, wi = /[\s\p{P}\p{S}]/u, Eo = /[^\s\p{P}\p{S}]/u, Oc = le(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, wi).getRegex(), Ro = /(?!~)[\p{P}\p{S}]/u, Ic = /(?!~)[\s\p{P}\p{S}]/u, Pc = /(?:[^\s\p{P}\p{S}]|~)/u, Lc = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, Ao = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Bc = le(Ao, "u").replace(/punct/g, hs).getRegex(), $c = le(Ao, "u").replace(/punct/g, Ro).getRegex(), Co = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Nc = le(Co, "gu").replace(/notPunctSpace/g, Eo).replace(/punctSpace/g, wi).replace(/punct/g, hs).getRegex(), Fc = le(Co, "gu").replace(/notPunctSpace/g, Pc).replace(/punctSpace/g, Ic).replace(/punct/g, Ro).getRegex(), Mc = le("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Eo).replace(/punctSpace/g, wi).replace(/punct/g, hs).getRegex(), Dc = le(/\\(punct)/, "gu").replace(/punct/g, hs).getRegex(), qc = le(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Uc = le(_i).replace("(?:-->|$)", "-->").getRegex(), Hc = le("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Uc).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Qn = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, jc = le(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", Qn).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Oo = le(/^!?\[(label)\]\[(ref)\]/).replace("label", Qn).replace("ref", yi).getRegex(), Io = le(/^!?\[(ref)\](?:\[\])?/).replace("ref", yi).getRegex(), zc = le("reflink|nolink(?!\\()", "g").replace("reflink", Oo).replace("nolink", Io).getRegex(), vi = {
  _backpedal: _n,
  // only used for GFM url
  anyPunctuation: Dc,
  autolink: qc,
  blockSkip: Lc,
  br: To,
  code: Ac,
  del: _n,
  emStrongLDelim: Bc,
  emStrongRDelimAst: Nc,
  emStrongRDelimUnd: Mc,
  escape: Rc,
  link: jc,
  nolink: Io,
  punctuation: Oc,
  reflink: Oo,
  reflinkSearch: zc,
  tag: Hc,
  text: Cc,
  url: _n
}, Vc = {
  ...vi,
  link: le(/^!?\[(label)\]\((.*?)\)/).replace("label", Qn).getRegex(),
  reflink: le(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Qn).getRegex()
}, Vs = {
  ...vi,
  emStrongRDelimAst: Fc,
  emStrongLDelim: $c,
  url: le(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Wc = {
  ...Vs,
  br: le(To).replace("{2,}", "*").getRegex(),
  text: le(Vs.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Ln = {
  normal: bi,
  gfm: Tc,
  pedantic: Ec
}, ln = {
  normal: vi,
  gfm: Vs,
  breaks: Wc,
  pedantic: Vc
}, Kc = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, rr = (t) => Kc[t];
function ct(t, e) {
  if (e) {
    if (Ne.escapeTest.test(t))
      return t.replace(Ne.escapeReplace, rr);
  } else if (Ne.escapeTestNoEncode.test(t))
    return t.replace(Ne.escapeReplaceNoEncode, rr);
  return t;
}
function or(t) {
  try {
    t = encodeURI(t).replace(Ne.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function lr(t, e) {
  var r;
  const n = t.replace(Ne.findPipe, (o, l, a) => {
    let f = !1, c = l;
    for (; --c >= 0 && a[c] === "\\"; )
      f = !f;
    return f ? "|" : " |";
  }), s = n.split(Ne.splitPipe);
  let i = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((r = s.at(-1)) != null && r.trim()) && s.pop(), e)
    if (s.length > e)
      s.splice(e);
    else
      for (; s.length < e; )
        s.push("");
  for (; i < s.length; i++)
    s[i] = s[i].trim().replace(Ne.slashPipe, "|");
  return s;
}
function an(t, e, n) {
  const s = t.length;
  if (s === 0)
    return "";
  let i = 0;
  for (; i < s && t.charAt(s - i - 1) === e; )
    i++;
  return t.slice(0, s - i);
}
function Gc(t, e) {
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
function ar(t, e, n, s, i) {
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
function Zc(t, e, n) {
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
class Xn {
  // set by the lexer
  constructor(e) {
    ce(this, "options");
    ce(this, "rules");
    // set by the lexer
    ce(this, "lexer");
    this.options = e || zt;
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
        text: this.options.pedantic ? s : an(s, `
`)
      };
    }
  }
  fences(e) {
    const n = this.rules.block.fences.exec(e);
    if (n) {
      const s = n[0], i = Zc(s, n[3] || "", this.rules);
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
        const i = an(s, "#");
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
        raw: an(n[0], `
`)
      };
  }
  blockquote(e) {
    const n = this.rules.block.blockquote.exec(e);
    if (n) {
      let s = an(n[0], `
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
`), g = c.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        i = i ? `${i}
${c}` : c, r = r ? `${r}
${g}` : g;
        const _ = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(g, o, !0), this.lexer.state.top = _, s.length === 0)
          break;
        const k = o.at(-1);
        if ((k == null ? void 0 : k.type) === "code")
          break;
        if ((k == null ? void 0 : k.type) === "blockquote") {
          const B = k, P = B.raw + `
` + s.join(`
`), G = this.blockquote(P);
          o[o.length - 1] = G, i = i.substring(0, i.length - B.raw.length) + G.raw, r = r.substring(0, r.length - B.text.length) + G.text;
          break;
        } else if ((k == null ? void 0 : k.type) === "list") {
          const B = k, P = B.raw + `
` + s.join(`
`), G = this.list(P);
          o[o.length - 1] = G, i = i.substring(0, i.length - k.raw.length) + G.raw, r = r.substring(0, r.length - B.raw.length) + G.raw, s = P.substring(o.at(-1).raw.length).split(`
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
        let f = !1, c = "", g = "";
        if (!(n = o.exec(e)) || this.rules.block.hr.test(e))
          break;
        c = n[0], e = e.substring(c.length);
        let _ = n[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (Y) => " ".repeat(3 * Y.length)), k = e.split(`
`, 1)[0], B = !_.trim(), P = 0;
        if (this.options.pedantic ? (P = 2, g = _.trimStart()) : B ? P = n[1].length + 1 : (P = n[2].search(this.rules.other.nonSpaceChar), P = P > 4 ? 1 : P, g = _.slice(P), P += n[1].length), B && this.rules.other.blankLine.test(k) && (c += k + `
`, e = e.substring(k.length + 1), f = !0), !f) {
          const Y = this.rules.other.nextBulletRegex(P), te = this.rules.other.hrRegex(P), $ = this.rules.other.fencesBeginRegex(P), J = this.rules.other.headingBeginRegex(P), Se = this.rules.other.htmlBeginRegex(P);
          for (; e; ) {
            const F = e.split(`
`, 1)[0];
            let Q;
            if (k = F, this.options.pedantic ? (k = k.replace(this.rules.other.listReplaceNesting, "  "), Q = k) : Q = k.replace(this.rules.other.tabCharGlobal, "    "), $.test(k) || J.test(k) || Se.test(k) || Y.test(k) || te.test(k))
              break;
            if (Q.search(this.rules.other.nonSpaceChar) >= P || !k.trim())
              g += `
` + Q.slice(P);
            else {
              if (B || _.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || $.test(_) || J.test(_) || te.test(_))
                break;
              g += `
` + k;
            }
            !B && !k.trim() && (B = !0), c += F + `
`, e = e.substring(F.length + 1), _ = Q.slice(P);
          }
        }
        r.loose || (l ? r.loose = !0 : this.rules.other.doubleBlankLine.test(c) && (l = !0));
        let G = null, K;
        this.options.gfm && (G = this.rules.other.listIsTask.exec(g), G && (K = G[0] !== "[ ] ", g = g.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: c,
          task: !!G,
          checked: K,
          loose: !1,
          text: g,
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
          const c = r.items[f].tokens.filter((_) => _.type === "space"), g = c.length > 0 && c.some((_) => this.rules.other.anyLine.test(_.raw));
          r.loose = g;
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
    const s = lr(n[1]), i = n[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (l = n[3]) != null && l.trim() ? n[3].replace(this.rules.other.tableRowBlankLine, "").split(`
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
        o.rows.push(lr(a, o.header.length).map((f, c) => ({
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
        const o = an(s.slice(0, -1), "\\");
        if ((s.length - o.length) % 2 === 0)
          return;
      } else {
        const o = Gc(n[2], "()");
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
      return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(s) ? i = i.slice(1) : i = i.slice(1, -1)), ar(n, {
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
      return ar(s, r, s[0], this.lexer, this.rules);
    }
  }
  emStrong(e, n, s = "") {
    let i = this.rules.inline.emStrongLDelim.exec(e);
    if (!i || i[3] && s.match(this.rules.other.unicodeAlphaNumeric))
      return;
    if (!(i[1] || i[2] || "") || !s || this.rules.inline.punctuation.exec(s)) {
      const o = [...i[0]].length - 1;
      let l, a, f = o, c = 0;
      const g = i[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (g.lastIndex = 0, n = n.slice(-1 * e.length + o); (i = g.exec(n)) != null; ) {
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
        const _ = [...i[0]][0].length, k = e.slice(0, o + i.index + _ + a);
        if (Math.min(o, a) % 2) {
          const P = k.slice(1, -1);
          return {
            type: "em",
            raw: k,
            text: P,
            tokens: this.lexer.inlineTokens(P)
          };
        }
        const B = k.slice(2, -2);
        return {
          type: "strong",
          raw: k,
          text: B,
          tokens: this.lexer.inlineTokens(B)
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
class Ye {
  constructor(e) {
    ce(this, "tokens");
    ce(this, "options");
    ce(this, "state");
    ce(this, "tokenizer");
    ce(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || zt, this.options.tokenizer = this.options.tokenizer || new Xn(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      other: Ne,
      block: Ln.normal,
      inline: ln.normal
    };
    this.options.pedantic ? (n.block = Ln.pedantic, n.inline = ln.pedantic) : this.options.gfm && (n.block = Ln.gfm, this.options.breaks ? n.inline = ln.breaks : n.inline = ln.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: Ln,
      inline: ln
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, n) {
    return new Ye(n).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, n) {
    return new Ye(n).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(Ne.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const s = this.inlineQueue[n];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, n = [], s = !1) {
    var i, r, o;
    for (this.options.pedantic && (e = e.replace(Ne.tabCharGlobal, "    ").replace(Ne.spaceLine, "")); e; ) {
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
        let g;
        this.options.extensions.startBlock.forEach((_) => {
          g = _.call({ lexer: this }, c), typeof g == "number" && g >= 0 && (f = Math.min(f, g));
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
      if ((f = this.options.extensions) != null && f.startInline) {
        let _ = 1 / 0;
        const k = e.slice(1);
        let B;
        this.options.extensions.startInline.forEach((P) => {
          B = P.call({ lexer: this }, k), typeof B == "number" && B >= 0 && (_ = Math.min(_, B));
        }), _ < 1 / 0 && _ >= 0 && (g = e.substring(0, _ + 1));
      }
      if (c = this.tokenizer.inlineText(g)) {
        e = e.substring(c.raw.length), c.raw.slice(-1) !== "_" && (o = c.raw.slice(-1)), r = !0;
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
}
class es {
  // set by the parser
  constructor(e) {
    ce(this, "options");
    ce(this, "parser");
    this.options = e || zt;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: n, escaped: s }) {
    var o;
    const i = (o = (n || "").match(Ne.notSpaceStart)) == null ? void 0 : o[0], r = e.replace(Ne.endingNewline, "") + `
`;
    return i ? '<pre><code class="language-' + ct(i) + '">' + (s ? r : ct(r, !0)) + `</code></pre>
` : "<pre><code>" + (s ? r : ct(r, !0)) + `</code></pre>
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
      e.loose ? ((s = e.tokens[0]) == null ? void 0 : s.type) === "paragraph" ? (e.tokens[0].text = i + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = i + " " + ct(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
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
    return `<code>${ct(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: n, tokens: s }) {
    const i = this.parser.parseInline(s), r = or(e);
    if (r === null)
      return i;
    e = r;
    let o = '<a href="' + e + '"';
    return n && (o += ' title="' + ct(n) + '"'), o += ">" + i + "</a>", o;
  }
  image({ href: e, title: n, text: s }) {
    const i = or(e);
    if (i === null)
      return ct(s);
    e = i;
    let r = `<img src="${e}" alt="${s}"`;
    return n && (r += ` title="${ct(n)}"`), r += ">", r;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : ct(e.text);
  }
}
class xi {
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
class Je {
  constructor(e) {
    ce(this, "options");
    ce(this, "renderer");
    ce(this, "textRenderer");
    this.options = e || zt, this.options.renderer = this.options.renderer || new es(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new xi();
  }
  /**
   * Static Parse Method
   */
  static parse(e, n) {
    return new Je(n).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, n) {
    return new Je(n).parseInline(e);
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
class bn {
  constructor(e) {
    ce(this, "options");
    ce(this, "block");
    this.options = e || zt;
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
    return this.block ? Ye.lex : Ye.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? Je.parse : Je.parseInline;
  }
}
ce(bn, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
class Yc {
  constructor(...e) {
    ce(this, "defaults", gi());
    ce(this, "options", this.setOptions);
    ce(this, "parse", this.parseMarkdown(!0));
    ce(this, "parseInline", this.parseMarkdown(!1));
    ce(this, "Parser", Je);
    ce(this, "Renderer", es);
    ce(this, "TextRenderer", xi);
    ce(this, "Lexer", Ye);
    ce(this, "Tokenizer", Xn);
    ce(this, "Hooks", bn);
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
        const r = this.defaults.renderer || new es(this.defaults);
        for (const o in s.renderer) {
          if (!(o in r))
            throw new Error(`renderer '${o}' does not exist`);
          if (["options", "parser"].includes(o))
            continue;
          const l = o, a = s.renderer[l], f = r[l];
          r[l] = (...c) => {
            let g = a.apply(r, c);
            return g === !1 && (g = f.apply(r, c)), g || "";
          };
        }
        i.renderer = r;
      }
      if (s.tokenizer) {
        const r = this.defaults.tokenizer || new Xn(this.defaults);
        for (const o in s.tokenizer) {
          if (!(o in r))
            throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o))
            continue;
          const l = o, a = s.tokenizer[l], f = r[l];
          r[l] = (...c) => {
            let g = a.apply(r, c);
            return g === !1 && (g = f.apply(r, c)), g;
          };
        }
        i.tokenizer = r;
      }
      if (s.hooks) {
        const r = this.defaults.hooks || new bn();
        for (const o in s.hooks) {
          if (!(o in r))
            throw new Error(`hook '${o}' does not exist`);
          if (["options", "block"].includes(o))
            continue;
          const l = o, a = s.hooks[l], f = r[l];
          bn.passThroughHooks.has(o) ? r[l] = (c) => {
            if (this.defaults.async)
              return Promise.resolve(a.call(r, c)).then((_) => f.call(r, _));
            const g = a.call(r, c);
            return f.call(r, g);
          } : r[l] = (...c) => {
            let g = a.apply(r, c);
            return g === !1 && (g = f.apply(r, c)), g;
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
    return Ye.lex(e, n ?? this.defaults);
  }
  parser(e, n) {
    return Je.parse(e, n ?? this.defaults);
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
      const a = o.hooks ? o.hooks.provideLexer() : e ? Ye.lex : Ye.lexInline, f = o.hooks ? o.hooks.provideParser() : e ? Je.parse : Je.parseInline;
      if (o.async)
        return Promise.resolve(o.hooks ? o.hooks.preprocess(s) : s).then((c) => a(c, o)).then((c) => o.hooks ? o.hooks.processAllTokens(c) : c).then((c) => o.walkTokens ? Promise.all(this.walkTokens(c, o.walkTokens)).then(() => c) : c).then((c) => f(c, o)).then((c) => o.hooks ? o.hooks.postprocess(c) : c).catch(l);
      try {
        o.hooks && (s = o.hooks.preprocess(s));
        let c = a(s, o);
        o.hooks && (c = o.hooks.processAllTokens(c)), o.walkTokens && this.walkTokens(c, o.walkTokens);
        let g = f(c, o);
        return o.hooks && (g = o.hooks.postprocess(g)), g;
      } catch (c) {
        return l(c);
      }
    };
  }
  onError(e, n) {
    return (s) => {
      if (s.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const i = "<p>An error occurred:</p><pre>" + ct(s.message + "", !0) + "</pre>";
        return n ? Promise.resolve(i) : i;
      }
      if (n)
        return Promise.reject(s);
      throw s;
    };
  }
}
const Ht = new Yc();
function ee(t, e) {
  return Ht.parse(t, e);
}
ee.options = ee.setOptions = function(t) {
  return Ht.setOptions(t), ee.defaults = Ht.defaults, vo(ee.defaults), ee;
};
ee.getDefaults = gi;
ee.defaults = zt;
ee.use = function(...t) {
  return Ht.use(...t), ee.defaults = Ht.defaults, vo(ee.defaults), ee;
};
ee.walkTokens = function(t, e) {
  return Ht.walkTokens(t, e);
};
ee.parseInline = Ht.parseInline;
ee.Parser = Je;
ee.parser = Je.parse;
ee.Renderer = es;
ee.TextRenderer = xi;
ee.Lexer = Ye;
ee.lexer = Ye.lex;
ee.Tokenizer = Xn;
ee.Hooks = bn;
ee.parse = ee;
ee.options;
ee.setOptions;
ee.use;
ee.walkTokens;
ee.parseInline;
Je.parse;
Ye.lex;
const ki = {
  API_URL: "https://api.chattermate.chat/api/v1",
  WS_URL: "wss://api.chattermate.chat"
};
function Jc(t) {
  const e = je(() => ({
    backgroundColor: t.value.chat_background_color || "#ffffff",
    color: St(t.value.chat_background_color || "#ffffff") ? "#ffffff" : "#000000"
  })), n = je(() => ({
    backgroundColor: t.value.chat_bubble_color || "#f34611",
    color: St(t.value.chat_bubble_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), s = je(() => {
    const f = t.value.chat_background_color || "#F8F9FA", c = pc(f, 20);
    return {
      backgroundColor: c,
      color: St(c) ? "#FFFFFF" : "#000000"
    };
  }), i = je(() => ({
    backgroundColor: t.value.accent_color || "#f34611",
    color: St(t.value.accent_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), r = je(() => ({
    color: St(t.value.chat_background_color || "#F8F9FA") ? "#FFFFFF" : "#000000"
  })), o = je(() => ({
    borderBottom: `1px solid ${St(t.value.chat_background_color || "#F8F9FA") ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`
  })), l = je(() => t.value.photo_url ? t.value.photo_url.includes("amazonaws.com") ? t.value.photo_url : `${ki.API_URL}${t.value.photo_url}` : ""), a = je(() => {
    const f = t.value.chat_background_color || "#ffffff";
    return {
      boxShadow: `0 8px 5px ${St(f) ? "rgba(0, 0, 0, 0.24)" : "rgba(0, 0, 0, 0.12)"}`
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
const mt = /* @__PURE__ */ Object.create(null);
mt.open = "0";
mt.close = "1";
mt.ping = "2";
mt.pong = "3";
mt.message = "4";
mt.upgrade = "5";
mt.noop = "6";
const Hn = /* @__PURE__ */ Object.create(null);
Object.keys(mt).forEach((t) => {
  Hn[mt[t]] = t;
});
const Ws = { type: "error", data: "parser error" }, Po = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", Lo = typeof ArrayBuffer == "function", Bo = (t) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t && t.buffer instanceof ArrayBuffer, Si = ({ type: t, data: e }, n, s) => Po && e instanceof Blob ? n ? s(e) : cr(e, s) : Lo && (e instanceof ArrayBuffer || Bo(e)) ? n ? s(e) : cr(new Blob([e]), s) : s(mt[t] + (e || "")), cr = (t, e) => {
  const n = new FileReader();
  return n.onload = function() {
    const s = n.result.split(",")[1];
    e("b" + (s || ""));
  }, n.readAsDataURL(t);
};
function ur(t) {
  return t instanceof Uint8Array ? t : t instanceof ArrayBuffer ? new Uint8Array(t) : new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
}
let Rs;
function Qc(t, e) {
  if (Po && t.data instanceof Blob)
    return t.data.arrayBuffer().then(ur).then(e);
  if (Lo && (t.data instanceof ArrayBuffer || Bo(t.data)))
    return e(ur(t.data));
  Si(t, !1, (n) => {
    Rs || (Rs = new TextEncoder()), e(Rs.encode(n));
  });
}
const fr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", fn = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let t = 0; t < fr.length; t++)
  fn[fr.charCodeAt(t)] = t;
const Xc = (t) => {
  let e = t.length * 0.75, n = t.length, s, i = 0, r, o, l, a;
  t[t.length - 1] === "=" && (e--, t[t.length - 2] === "=" && e--);
  const f = new ArrayBuffer(e), c = new Uint8Array(f);
  for (s = 0; s < n; s += 4)
    r = fn[t.charCodeAt(s)], o = fn[t.charCodeAt(s + 1)], l = fn[t.charCodeAt(s + 2)], a = fn[t.charCodeAt(s + 3)], c[i++] = r << 2 | o >> 4, c[i++] = (o & 15) << 4 | l >> 2, c[i++] = (l & 3) << 6 | a & 63;
  return f;
}, eu = typeof ArrayBuffer == "function", Ti = (t, e) => {
  if (typeof t != "string")
    return {
      type: "message",
      data: $o(t, e)
    };
  const n = t.charAt(0);
  return n === "b" ? {
    type: "message",
    data: tu(t.substring(1), e)
  } : Hn[n] ? t.length > 1 ? {
    type: Hn[n],
    data: t.substring(1)
  } : {
    type: Hn[n]
  } : Ws;
}, tu = (t, e) => {
  if (eu) {
    const n = Xc(t);
    return $o(n, e);
  } else
    return { base64: !0, data: t };
}, $o = (t, e) => {
  switch (e) {
    case "blob":
      return t instanceof Blob ? t : new Blob([t]);
    case "arraybuffer":
    default:
      return t instanceof ArrayBuffer ? t : t.buffer;
  }
}, No = "", nu = (t, e) => {
  const n = t.length, s = new Array(n);
  let i = 0;
  t.forEach((r, o) => {
    Si(r, !1, (l) => {
      s[o] = l, ++i === n && e(s.join(No));
    });
  });
}, su = (t, e) => {
  const n = t.split(No), s = [];
  for (let i = 0; i < n.length; i++) {
    const r = Ti(n[i], e);
    if (s.push(r), r.type === "error")
      break;
  }
  return s;
};
function iu() {
  return new TransformStream({
    transform(t, e) {
      Qc(t, (n) => {
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
let As;
function Bn(t) {
  return t.reduce((e, n) => e + n.length, 0);
}
function $n(t, e) {
  if (t[0].length === e)
    return t.shift();
  const n = new Uint8Array(e);
  let s = 0;
  for (let i = 0; i < e; i++)
    n[i] = t[0][s++], s === t[0].length && (t.shift(), s = 0);
  return t.length && s < t[0].length && (t[0] = t[0].slice(s)), n;
}
function ru(t, e) {
  As || (As = new TextDecoder());
  const n = [];
  let s = 0, i = -1, r = !1;
  return new TransformStream({
    transform(o, l) {
      for (n.push(o); ; ) {
        if (s === 0) {
          if (Bn(n) < 1)
            break;
          const a = $n(n, 1);
          r = (a[0] & 128) === 128, i = a[0] & 127, i < 126 ? s = 3 : i === 126 ? s = 1 : s = 2;
        } else if (s === 1) {
          if (Bn(n) < 2)
            break;
          const a = $n(n, 2);
          i = new DataView(a.buffer, a.byteOffset, a.length).getUint16(0), s = 3;
        } else if (s === 2) {
          if (Bn(n) < 8)
            break;
          const a = $n(n, 8), f = new DataView(a.buffer, a.byteOffset, a.length), c = f.getUint32(0);
          if (c > Math.pow(2, 21) - 1) {
            l.enqueue(Ws);
            break;
          }
          i = c * Math.pow(2, 32) + f.getUint32(4), s = 3;
        } else {
          if (Bn(n) < i)
            break;
          const a = $n(n, i);
          l.enqueue(Ti(r ? a : As.decode(a), e)), s = 0;
        }
        if (i === 0 || i > t) {
          l.enqueue(Ws);
          break;
        }
      }
    }
  });
}
const Fo = 4;
function ve(t) {
  if (t) return ou(t);
}
function ou(t) {
  for (var e in ve.prototype)
    t[e] = ve.prototype[e];
  return t;
}
ve.prototype.on = ve.prototype.addEventListener = function(t, e) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
};
ve.prototype.once = function(t, e) {
  function n() {
    this.off(t, n), e.apply(this, arguments);
  }
  return n.fn = e, this.on(t, n), this;
};
ve.prototype.off = ve.prototype.removeListener = ve.prototype.removeAllListeners = ve.prototype.removeEventListener = function(t, e) {
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
ve.prototype.emit = function(t) {
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
ve.prototype.emitReserved = ve.prototype.emit;
ve.prototype.listeners = function(t) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
};
ve.prototype.hasListeners = function(t) {
  return !!this.listeners(t).length;
};
const ds = typeof Promise == "function" && typeof Promise.resolve == "function" ? (e) => Promise.resolve().then(e) : (e, n) => n(e, 0), Ge = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), lu = "arraybuffer";
function Mo(t, ...e) {
  return e.reduce((n, s) => (t.hasOwnProperty(s) && (n[s] = t[s]), n), {});
}
const au = Ge.setTimeout, cu = Ge.clearTimeout;
function ps(t, e) {
  e.useNativeTimers ? (t.setTimeoutFn = au.bind(Ge), t.clearTimeoutFn = cu.bind(Ge)) : (t.setTimeoutFn = Ge.setTimeout.bind(Ge), t.clearTimeoutFn = Ge.clearTimeout.bind(Ge));
}
const uu = 1.33;
function fu(t) {
  return typeof t == "string" ? hu(t) : Math.ceil((t.byteLength || t.size) * uu);
}
function hu(t) {
  let e = 0, n = 0;
  for (let s = 0, i = t.length; s < i; s++)
    e = t.charCodeAt(s), e < 128 ? n += 1 : e < 2048 ? n += 2 : e < 55296 || e >= 57344 ? n += 3 : (s++, n += 4);
  return n;
}
function Do() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function du(t) {
  let e = "";
  for (let n in t)
    t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
  return e;
}
function pu(t) {
  let e = {}, n = t.split("&");
  for (let s = 0, i = n.length; s < i; s++) {
    let r = n[s].split("=");
    e[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
  }
  return e;
}
class gu extends Error {
  constructor(e, n, s) {
    super(e), this.description = n, this.context = s, this.type = "TransportError";
  }
}
class Ei extends ve {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(e) {
    super(), this.writable = !1, ps(this, e), this.opts = e, this.query = e.query, this.socket = e.socket, this.supportsBinary = !e.forceBase64;
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
    return super.emitReserved("error", new gu(e, n, s)), this;
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
    const n = Ti(e, this.socket.binaryType);
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
    const n = du(e);
    return n.length ? "?" + n : "";
  }
}
class mu extends Ei {
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
    su(e, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
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
    this.writable = !1, nu(e, (n) => {
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
    return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = Do()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(e, n);
  }
}
let qo = !1;
try {
  qo = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const yu = qo;
function _u() {
}
class bu extends mu {
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
class pt extends ve {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(e, n, s) {
    super(), this.createRequest = e, ps(this, s), this._opts = s, this._method = s.method || "GET", this._uri = n, this._data = s.data !== void 0 ? s.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var e;
    const n = Mo(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
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
    typeof document < "u" && (this._index = pt.requestsCount++, pt.requests[this._index] = this);
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
      if (this._xhr.onreadystatechange = _u, e)
        try {
          this._xhr.abort();
        } catch {
        }
      typeof document < "u" && delete pt.requests[this._index], this._xhr = null;
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
pt.requestsCount = 0;
pt.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", hr);
  else if (typeof addEventListener == "function") {
    const t = "onpagehide" in Ge ? "pagehide" : "unload";
    addEventListener(t, hr, !1);
  }
}
function hr() {
  for (let t in pt.requests)
    pt.requests.hasOwnProperty(t) && pt.requests[t].abort();
}
const wu = function() {
  const t = Uo({
    xdomain: !1
  });
  return t && t.responseType !== null;
}();
class vu extends bu {
  constructor(e) {
    super(e);
    const n = e && e.forceBase64;
    this.supportsBinary = wu && !n;
  }
  request(e = {}) {
    return Object.assign(e, { xd: this.xd }, this.opts), new pt(Uo, this.uri(), e);
  }
}
function Uo(t) {
  const e = t.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!e || yu))
      return new XMLHttpRequest();
  } catch {
  }
  if (!e)
    try {
      return new Ge[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const Ho = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class xu extends Ei {
  get name() {
    return "websocket";
  }
  doOpen() {
    const e = this.uri(), n = this.opts.protocols, s = Ho ? {} : Mo(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
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
      Si(s, this.supportsBinary, (r) => {
        try {
          this.doWrite(s, r);
        } catch {
        }
        i && ds(() => {
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
    return this.opts.timestampRequests && (n[this.opts.timestampParam] = Do()), this.supportsBinary || (n.b64 = 1), this.createUri(e, n);
  }
}
const Cs = Ge.WebSocket || Ge.MozWebSocket;
class ku extends xu {
  createSocket(e, n, s) {
    return Ho ? new Cs(e, n, s) : n ? new Cs(e, n) : new Cs(e);
  }
  doWrite(e, n) {
    this.ws.send(n);
  }
}
class Su extends Ei {
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
        const n = ru(Number.MAX_SAFE_INTEGER, this.socket.binaryType), s = e.readable.pipeThrough(n).getReader(), i = iu();
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
        i && ds(() => {
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
const Tu = {
  websocket: ku,
  webtransport: Su,
  polling: vu
}, Eu = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, Ru = [
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
function Ks(t) {
  if (t.length > 8e3)
    throw "URI too long";
  const e = t, n = t.indexOf("["), s = t.indexOf("]");
  n != -1 && s != -1 && (t = t.substring(0, n) + t.substring(n, s).replace(/:/g, ";") + t.substring(s, t.length));
  let i = Eu.exec(t || ""), r = {}, o = 14;
  for (; o--; )
    r[Ru[o]] = i[o] || "";
  return n != -1 && s != -1 && (r.source = e, r.host = r.host.substring(1, r.host.length - 1).replace(/;/g, ":"), r.authority = r.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), r.ipv6uri = !0), r.pathNames = Au(r, r.path), r.queryKey = Cu(r, r.query), r;
}
function Au(t, e) {
  const n = /\/{2,9}/g, s = e.replace(n, "/").split("/");
  return (e.slice(0, 1) == "/" || e.length === 0) && s.splice(0, 1), e.slice(-1) == "/" && s.splice(s.length - 1, 1), s;
}
function Cu(t, e) {
  const n = {};
  return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, i, r) {
    i && (n[i] = r);
  }), n;
}
const Gs = typeof addEventListener == "function" && typeof removeEventListener == "function", jn = [];
Gs && addEventListener("offline", () => {
  jn.forEach((t) => t());
}, !1);
class At extends ve {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(e, n) {
    if (super(), this.binaryType = lu, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, e && typeof e == "object" && (n = e, e = null), e) {
      const s = Ks(e);
      n.hostname = s.host, n.secure = s.protocol === "https" || s.protocol === "wss", n.port = s.port, s.query && (n.query = s.query);
    } else n.host && (n.hostname = Ks(n.host).host);
    ps(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((s) => {
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
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = pu(this.opts.query)), Gs && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, jn.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
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
    n.EIO = Fo, n.transport = e, this.id && (n.sid = this.id);
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
    const e = this.opts.rememberUpgrade && At.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
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
    this.readyState = "open", At.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
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
      if (i && (n += fu(i)), s > 0 && n > this._maxPayload)
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
    return e && (this._pingTimeoutTime = 0, ds(() => {
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
    if (At.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
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
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), Gs && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const s = jn.indexOf(this._offlineEventListener);
        s !== -1 && jn.splice(s, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", e, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
At.protocol = Fo;
class Ou extends At {
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
    At.priorWebsocketSuccess = !1;
    const i = () => {
      s || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (g) => {
        if (!s)
          if (g.type === "pong" && g.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", n), !n)
              return;
            At.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
              s || this.readyState !== "closed" && (c(), this.setTransport(n), n.send([{ type: "upgrade" }]), this.emitReserved("upgrade", n), n = null, this.upgrading = !1, this.flush());
            });
          } else {
            const _ = new Error("probe error");
            _.transport = n.name, this.emitReserved("upgradeError", _);
          }
      }));
    };
    function r() {
      s || (s = !0, c(), n.close(), n = null);
    }
    const o = (g) => {
      const _ = new Error("probe error: " + g);
      _.transport = n.name, r(), this.emitReserved("upgradeError", _);
    };
    function l() {
      o("transport closed");
    }
    function a() {
      o("socket closed");
    }
    function f(g) {
      n && g.name !== n.name && r();
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
let Iu = class extends Ou {
  constructor(e, n = {}) {
    const s = typeof e == "object" ? e : n;
    (!s.transports || s.transports && typeof s.transports[0] == "string") && (s.transports = (s.transports || ["polling", "websocket", "webtransport"]).map((i) => Tu[i]).filter((i) => !!i)), super(e, s);
  }
};
function Pu(t, e = "", n) {
  let s = t;
  n = n || typeof location < "u" && location, t == null && (t = n.protocol + "//" + n.host), typeof t == "string" && (t.charAt(0) === "/" && (t.charAt(1) === "/" ? t = n.protocol + t : t = n.host + t), /^(https?|wss?):\/\//.test(t) || (typeof n < "u" ? t = n.protocol + "//" + t : t = "https://" + t), s = Ks(t)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
  const r = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return s.id = s.protocol + "://" + r + ":" + s.port + e, s.href = s.protocol + "://" + r + (n && n.port === s.port ? "" : ":" + s.port), s;
}
const Lu = typeof ArrayBuffer == "function", Bu = (t) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer, jo = Object.prototype.toString, $u = typeof Blob == "function" || typeof Blob < "u" && jo.call(Blob) === "[object BlobConstructor]", Nu = typeof File == "function" || typeof File < "u" && jo.call(File) === "[object FileConstructor]";
function Ri(t) {
  return Lu && (t instanceof ArrayBuffer || Bu(t)) || $u && t instanceof Blob || Nu && t instanceof File;
}
function zn(t, e) {
  if (!t || typeof t != "object")
    return !1;
  if (Array.isArray(t)) {
    for (let n = 0, s = t.length; n < s; n++)
      if (zn(t[n]))
        return !0;
    return !1;
  }
  if (Ri(t))
    return !0;
  if (t.toJSON && typeof t.toJSON == "function" && arguments.length === 1)
    return zn(t.toJSON(), !0);
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n) && zn(t[n]))
      return !0;
  return !1;
}
function Fu(t) {
  const e = [], n = t.data, s = t;
  return s.data = Zs(n, e), s.attachments = e.length, { packet: s, buffers: e };
}
function Zs(t, e) {
  if (!t)
    return t;
  if (Ri(t)) {
    const n = { _placeholder: !0, num: e.length };
    return e.push(t), n;
  } else if (Array.isArray(t)) {
    const n = new Array(t.length);
    for (let s = 0; s < t.length; s++)
      n[s] = Zs(t[s], e);
    return n;
  } else if (typeof t == "object" && !(t instanceof Date)) {
    const n = {};
    for (const s in t)
      Object.prototype.hasOwnProperty.call(t, s) && (n[s] = Zs(t[s], e));
    return n;
  }
  return t;
}
function Mu(t, e) {
  return t.data = Ys(t.data, e), delete t.attachments, t;
}
function Ys(t, e) {
  if (!t)
    return t;
  if (t && t._placeholder === !0) {
    if (typeof t.num == "number" && t.num >= 0 && t.num < e.length)
      return e[t.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(t))
    for (let n = 0; n < t.length; n++)
      t[n] = Ys(t[n], e);
  else if (typeof t == "object")
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (t[n] = Ys(t[n], e));
  return t;
}
const Du = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], qu = 5;
var Z;
(function(t) {
  t[t.CONNECT = 0] = "CONNECT", t[t.DISCONNECT = 1] = "DISCONNECT", t[t.EVENT = 2] = "EVENT", t[t.ACK = 3] = "ACK", t[t.CONNECT_ERROR = 4] = "CONNECT_ERROR", t[t.BINARY_EVENT = 5] = "BINARY_EVENT", t[t.BINARY_ACK = 6] = "BINARY_ACK";
})(Z || (Z = {}));
class Uu {
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
    return (e.type === Z.EVENT || e.type === Z.ACK) && zn(e) ? this.encodeAsBinary({
      type: e.type === Z.EVENT ? Z.BINARY_EVENT : Z.BINARY_ACK,
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
    return (e.type === Z.BINARY_EVENT || e.type === Z.BINARY_ACK) && (n += e.attachments + "-"), e.nsp && e.nsp !== "/" && (n += e.nsp + ","), e.id != null && (n += e.id), e.data != null && (n += JSON.stringify(e.data, this.replacer)), n;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(e) {
    const n = Fu(e), s = this.encodeAsString(n.packet), i = n.buffers;
    return i.unshift(s), i;
  }
}
function dr(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
class Ai extends ve {
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
      const s = n.type === Z.BINARY_EVENT;
      s || n.type === Z.BINARY_ACK ? (n.type = s ? Z.EVENT : Z.ACK, this.reconstructor = new Hu(n), n.attachments === 0 && super.emitReserved("decoded", n)) : super.emitReserved("decoded", n);
    } else if (Ri(e) || e.base64)
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
    if (Z[s.type] === void 0)
      throw new Error("unknown packet type " + s.type);
    if (s.type === Z.BINARY_EVENT || s.type === Z.BINARY_ACK) {
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
      if (Ai.isPayloadValid(s.type, r))
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
      case Z.CONNECT:
        return dr(n);
      case Z.DISCONNECT:
        return n === void 0;
      case Z.CONNECT_ERROR:
        return typeof n == "string" || dr(n);
      case Z.EVENT:
      case Z.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && Du.indexOf(n[0]) === -1);
      case Z.ACK:
      case Z.BINARY_ACK:
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
class Hu {
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
      const n = Mu(this.reconPack, this.buffers);
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
const ju = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Ai,
  Encoder: Uu,
  get PacketType() {
    return Z;
  },
  protocol: qu
}, Symbol.toStringTag, { value: "Module" }));
function st(t, e, n) {
  return t.on(e, n), function() {
    t.off(e, n);
  };
}
const zu = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class zo extends ve {
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
      st(e, "open", this.onopen.bind(this)),
      st(e, "packet", this.onpacket.bind(this)),
      st(e, "error", this.onerror.bind(this)),
      st(e, "close", this.onclose.bind(this))
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
    if (zu.hasOwnProperty(e))
      throw new Error('"' + e.toString() + '" is a reserved event name');
    if (n.unshift(e), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const o = {
      type: Z.EVENT,
      data: n
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
      const c = this.ids++, g = n.pop();
      this._registerAckCallback(c, g), o.id = c;
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
      type: Z.CONNECT,
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
        case Z.CONNECT:
          e.data && e.data.sid ? this.onconnect(e.data.sid, e.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case Z.EVENT:
        case Z.BINARY_EVENT:
          this.onevent(e);
          break;
        case Z.ACK:
        case Z.BINARY_ACK:
          this.onack(e);
          break;
        case Z.DISCONNECT:
          this.ondisconnect();
          break;
        case Z.CONNECT_ERROR:
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
        type: Z.ACK,
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
    return this.connected && this.packet({ type: Z.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
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
function nn(t) {
  t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
}
nn.prototype.duration = function() {
  var t = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var e = Math.random(), n = Math.floor(e * this.jitter * t);
    t = Math.floor(e * 10) & 1 ? t + n : t - n;
  }
  return Math.min(t, this.max) | 0;
};
nn.prototype.reset = function() {
  this.attempts = 0;
};
nn.prototype.setMin = function(t) {
  this.ms = t;
};
nn.prototype.setMax = function(t) {
  this.max = t;
};
nn.prototype.setJitter = function(t) {
  this.jitter = t;
};
class Js extends ve {
  constructor(e, n) {
    var s;
    super(), this.nsps = {}, this.subs = [], e && typeof e == "object" && (n = e, e = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, ps(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5), this.backoff = new nn({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = e;
    const i = n.parser || ju;
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
    this.engine = new Iu(this.uri, this.opts);
    const n = this.engine, s = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const i = st(n, "open", function() {
      s.onopen(), e && e();
    }), r = (l) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", l), e ? e(l) : this.maybeReconnectOnOpen();
    }, o = st(n, "error", r);
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
      st(e, "ping", this.onping.bind(this)),
      st(e, "data", this.ondata.bind(this)),
      st(e, "error", this.onerror.bind(this)),
      st(e, "close", this.onclose.bind(this)),
      // @ts-ignore
      st(this.decoder, "decoded", this.ondecoded.bind(this))
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
    ds(() => {
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
    return s ? this._autoConnect && !s.active && s.connect() : (s = new zo(this, e, n), this.nsps[e] = s), s;
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
const cn = {};
function Vn(t, e) {
  typeof t == "object" && (e = t, t = void 0), e = e || {};
  const n = Pu(t, e.path || "/socket.io"), s = n.source, i = n.id, r = n.path, o = cn[i] && r in cn[i].nsps, l = e.forceNew || e["force new connection"] || e.multiplex === !1 || o;
  let a;
  return l ? a = new Js(s, e) : (cn[i] || (cn[i] = new Js(s, e)), a = cn[i]), n.query && !e.query && (e.query = n.queryKey), a.socket(n.path, e);
}
Object.assign(Vn, {
  Manager: Js,
  Socket: zo,
  io: Vn,
  connect: Vn
});
function Vu() {
  const t = pe([]), e = pe(!1), n = pe(""), s = pe(!1), i = pe(!1), r = pe(!1), o = pe("connecting"), l = pe(0), a = 5, f = pe({});
  let c = null, g = null;
  const _ = (F) => {
    const Q = localStorage.getItem("ctid");
    return c = Vn(`${ki.WS_URL}/widget`, {
      transports: ["websocket"],
      reconnection: !0,
      reconnectionAttempts: a,
      reconnectionDelay: 1e3,
      auth: Q ? {
        conversation_token: Q
      } : void 0
    }), c.on("connect", () => {
      o.value = "connected", l.value = 0;
    }), c.on("disconnect", () => {
      o.value === "connected" && (o.value = "connecting");
    }), c.on("connect_error", () => {
      l.value++, console.error("Socket connection failed, attempt:", l.value), l.value >= a && (o.value = "failed");
    }), c.on("chat_response", (W) => {
      W.type === "agent_message" ? t.value.push({
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
      }), e.value = !1;
    }), c.on("handle_taken_over", (W) => {
      t.value.push({
        message: `${W.user_name} joined the conversation`,
        message_type: "system",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: W.session_id
      }), f.value = {
        ...f.value,
        agent_name: W.user_name,
        agent_profile_pic: W.profile_picture
      }, g && g(W);
    }), c.on("error", G), c.on("chat_history", K), c.on("rating_submitted", Y), c;
  }, k = async () => {
    try {
      return o.value = "connecting", l.value = 0, c && (c.removeAllListeners(), c.disconnect(), c = null), c = _(""), new Promise((F) => {
        c == null || c.on("connect", () => {
          F(!0);
        }), c == null || c.on("connect_error", () => {
          l.value >= a && F(!1);
        });
      });
    } catch (F) {
      return console.error("Socket initialization failed:", F), o.value = "failed", !1;
    }
  }, B = () => (c && c.disconnect(), k()), P = (F) => {
    g = F;
  }, G = (F) => {
    e.value = !1, n.value = gc(F), s.value = !0, setTimeout(() => {
      s.value = !1, n.value = "";
    }, 5e3);
  }, K = (F) => {
    if (F.type === "chat_history" && Array.isArray(F.messages)) {
      const Q = F.messages.map((W) => ({
        message: W.message,
        message_type: W.message_type,
        created_at: W.created_at,
        attributes: W.attributes || {},
        session_id: "",
        agent_name: W.agent_name || "",
        user_name: W.user_name || ""
      }));
      t.value = [
        ...Q.filter(
          (W) => !t.value.some(
            (ge) => ge.message === W.message && ge.message_type === W.message_type
          )
        ),
        ...t.value
      ];
    }
  }, Y = (F) => {
    F.success && t.value.push({
      message: "Thank you for your feedback!",
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    });
  };
  return {
    messages: t,
    loading: e,
    errorMessage: n,
    showError: s,
    loadingHistory: i,
    hasStartedChat: r,
    connectionStatus: o,
    sendMessage: async (F, Q) => {
      !c || !F.trim() || (f.value.full_name || (e.value = !0), t.value.push({
        message: F,
        message_type: "user",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: ""
      }), c.emit("chat", {
        message: F,
        email: Q
      }), r.value = !0);
    },
    loadChatHistory: async () => {
      if (c)
        try {
          i.value = !0, c.emit("get_chat_history");
        } catch (F) {
          console.error("Failed to load chat history:", F);
        } finally {
          i.value = !1;
        }
    },
    connect: k,
    reconnect: B,
    cleanup: () => {
      c && (c.removeAllListeners(), c.disconnect(), c = null), g = null;
    },
    customer: f,
    onTakeover: P,
    submitRating: async (F, Q) => {
      !c || !F || c.emit("submit_rating", {
        rating: F,
        feedback: Q
      });
    }
  };
}
function Wu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Os = { exports: {} }, pr;
function Ku() {
  return pr || (pr = 1, function(t) {
    (function() {
      function e(u, p, w) {
        return u.call.apply(u.bind, arguments);
      }
      function n(u, p, w) {
        if (!u) throw Error();
        if (2 < arguments.length) {
          var y = Array.prototype.slice.call(arguments, 2);
          return function() {
            var A = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(A, y), u.apply(p, A);
          };
        }
        return function() {
          return u.apply(p, arguments);
        };
      }
      function s(u, p, w) {
        return s = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? e : n, s.apply(null, arguments);
      }
      var i = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function r(u, p) {
        this.a = u, this.o = p || u, this.c = this.o.document;
      }
      var o = !!window.FontFace;
      function l(u, p, w, y) {
        if (p = u.c.createElement(p), w) for (var A in w) w.hasOwnProperty(A) && (A == "style" ? p.style.cssText = w[A] : p.setAttribute(A, w[A]));
        return y && p.appendChild(u.c.createTextNode(y)), p;
      }
      function a(u, p, w) {
        u = u.c.getElementsByTagName(p)[0], u || (u = document.documentElement), u.insertBefore(w, u.lastChild);
      }
      function f(u) {
        u.parentNode && u.parentNode.removeChild(u);
      }
      function c(u, p, w) {
        p = p || [], w = w || [];
        for (var y = u.className.split(/\s+/), A = 0; A < p.length; A += 1) {
          for (var N = !1, q = 0; q < y.length; q += 1) if (p[A] === y[q]) {
            N = !0;
            break;
          }
          N || y.push(p[A]);
        }
        for (p = [], A = 0; A < y.length; A += 1) {
          for (N = !1, q = 0; q < w.length; q += 1) if (y[A] === w[q]) {
            N = !0;
            break;
          }
          N || p.push(y[A]);
        }
        u.className = p.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function g(u, p) {
        for (var w = u.className.split(/\s+/), y = 0, A = w.length; y < A; y++) if (w[y] == p) return !0;
        return !1;
      }
      function _(u) {
        return u.o.location.hostname || u.a.location.hostname;
      }
      function k(u, p, w) {
        function y() {
          ne && A && N && (ne(q), ne = null);
        }
        p = l(u, "link", { rel: "stylesheet", href: p, media: "all" });
        var A = !1, N = !0, q = null, ne = w || null;
        o ? (p.onload = function() {
          A = !0, y();
        }, p.onerror = function() {
          A = !0, q = Error("Stylesheet failed to load"), y();
        }) : setTimeout(function() {
          A = !0, y();
        }, 0), a(u, "head", p);
      }
      function B(u, p, w, y) {
        var A = u.c.getElementsByTagName("head")[0];
        if (A) {
          var N = l(u, "script", { src: p }), q = !1;
          return N.onload = N.onreadystatechange = function() {
            q || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (q = !0, w && w(null), N.onload = N.onreadystatechange = null, N.parentNode.tagName == "HEAD" && A.removeChild(N));
          }, A.appendChild(N), setTimeout(function() {
            q || (q = !0, w && w(Error("Script load timeout")));
          }, y || 5e3), N;
        }
        return null;
      }
      function P() {
        this.a = 0, this.c = null;
      }
      function G(u) {
        return u.a++, function() {
          u.a--, Y(u);
        };
      }
      function K(u, p) {
        u.c = p, Y(u);
      }
      function Y(u) {
        u.a == 0 && u.c && (u.c(), u.c = null);
      }
      function te(u) {
        this.a = u || "-";
      }
      te.prototype.c = function(u) {
        for (var p = [], w = 0; w < arguments.length; w++) p.push(arguments[w].replace(/[\W_]+/g, "").toLowerCase());
        return p.join(this.a);
      };
      function $(u, p) {
        this.c = u, this.f = 4, this.a = "n";
        var w = (p || "n4").match(/^([nio])([1-9])$/i);
        w && (this.a = w[1], this.f = parseInt(w[2], 10));
      }
      function J(u) {
        return Q(u) + " " + (u.f + "00") + " 300px " + Se(u.c);
      }
      function Se(u) {
        var p = [];
        u = u.split(/,\s*/);
        for (var w = 0; w < u.length; w++) {
          var y = u[w].replace(/['"]/g, "");
          y.indexOf(" ") != -1 || /^\d/.test(y) ? p.push("'" + y + "'") : p.push(y);
        }
        return p.join(",");
      }
      function F(u) {
        return u.a + u.f;
      }
      function Q(u) {
        var p = "normal";
        return u.a === "o" ? p = "oblique" : u.a === "i" && (p = "italic"), p;
      }
      function W(u) {
        var p = 4, w = "n", y = null;
        return u && ((y = u.match(/(normal|oblique|italic)/i)) && y[1] && (w = y[1].substr(0, 1).toLowerCase()), (y = u.match(/([1-9]00|normal|bold)/i)) && y[1] && (/bold/i.test(y[1]) ? p = 7 : /[1-9]00/.test(y[1]) && (p = parseInt(y[1].substr(0, 1), 10)))), w + p;
      }
      function ge(u, p) {
        this.c = u, this.f = u.o.document.documentElement, this.h = p, this.a = new te("-"), this.j = p.events !== !1, this.g = p.classes !== !1;
      }
      function Fe(u) {
        u.g && c(u.f, [u.a.c("wf", "loading")]), ke(u, "loading");
      }
      function Xe(u) {
        if (u.g) {
          var p = g(u.f, u.a.c("wf", "active")), w = [], y = [u.a.c("wf", "loading")];
          p || w.push(u.a.c("wf", "inactive")), c(u.f, w, y);
        }
        ke(u, "inactive");
      }
      function ke(u, p, w) {
        u.j && u.h[p] && (w ? u.h[p](w.c, F(w)) : u.h[p]());
      }
      function Lt() {
        this.c = {};
      }
      function rt(u, p, w) {
        var y = [], A;
        for (A in p) if (p.hasOwnProperty(A)) {
          var N = u.c[A];
          N && y.push(N(p[A], w));
        }
        return y;
      }
      function de(u, p) {
        this.c = u, this.f = p, this.a = l(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function se(u) {
        a(u.c, "body", u.a);
      }
      function X(u) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + Se(u.c) + ";" + ("font-style:" + Q(u) + ";font-weight:" + (u.f + "00") + ";");
      }
      function Me(u, p, w, y, A, N) {
        this.g = u, this.j = p, this.a = y, this.c = w, this.f = A || 3e3, this.h = N || void 0;
      }
      Me.prototype.start = function() {
        var u = this.c.o.document, p = this, w = i(), y = new Promise(function(q, ne) {
          function oe() {
            i() - w >= p.f ? ne() : u.fonts.load(J(p.a), p.h).then(function(_e) {
              1 <= _e.length ? q() : setTimeout(oe, 25);
            }, function() {
              ne();
            });
          }
          oe();
        }), A = null, N = new Promise(function(q, ne) {
          A = setTimeout(ne, p.f);
        });
        Promise.race([N, y]).then(function() {
          A && (clearTimeout(A), A = null), p.g(p.a);
        }, function() {
          p.j(p.a);
        });
      };
      function et(u, p, w, y, A, N, q) {
        this.v = u, this.B = p, this.c = w, this.a = y, this.s = q || "BESbswy", this.f = {}, this.w = A || 3e3, this.u = N || null, this.m = this.j = this.h = this.g = null, this.g = new de(this.c, this.s), this.h = new de(this.c, this.s), this.j = new de(this.c, this.s), this.m = new de(this.c, this.s), u = new $(this.a.c + ",serif", F(this.a)), u = X(u), this.g.a.style.cssText = u, u = new $(this.a.c + ",sans-serif", F(this.a)), u = X(u), this.h.a.style.cssText = u, u = new $("serif", F(this.a)), u = X(u), this.j.a.style.cssText = u, u = new $("sans-serif", F(this.a)), u = X(u), this.m.a.style.cssText = u, se(this.g), se(this.h), se(this.j), se(this.m);
      }
      var Te = { D: "serif", C: "sans-serif" }, Ee = null;
      function kt() {
        if (Ee === null) {
          var u = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          Ee = !!u && (536 > parseInt(u[1], 10) || parseInt(u[1], 10) === 536 && 11 >= parseInt(u[2], 10));
        }
        return Ee;
      }
      et.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = i(), Bt(this);
      };
      function Vt(u, p, w) {
        for (var y in Te) if (Te.hasOwnProperty(y) && p === u.f[Te[y]] && w === u.f[Te[y]]) return !0;
        return !1;
      }
      function Bt(u) {
        var p = u.g.a.offsetWidth, w = u.h.a.offsetWidth, y;
        (y = p === u.f.serif && w === u.f["sans-serif"]) || (y = kt() && Vt(u, p, w)), y ? i() - u.A >= u.w ? kt() && Vt(u, p, w) && (u.u === null || u.u.hasOwnProperty(u.a.c)) ? lt(u, u.v) : lt(u, u.B) : ot(u) : lt(u, u.v);
      }
      function ot(u) {
        setTimeout(s(function() {
          Bt(this);
        }, u), 50);
      }
      function lt(u, p) {
        setTimeout(s(function() {
          f(this.g.a), f(this.h.a), f(this.j.a), f(this.m.a), p(this.a);
        }, u), 0);
      }
      function Ve(u, p, w) {
        this.c = u, this.a = p, this.f = 0, this.m = this.j = !1, this.s = w;
      }
      var yt = null;
      Ve.prototype.g = function(u) {
        var p = this.a;
        p.g && c(p.f, [p.a.c("wf", u.c, F(u).toString(), "active")], [p.a.c("wf", u.c, F(u).toString(), "loading"), p.a.c("wf", u.c, F(u).toString(), "inactive")]), ke(p, "fontactive", u), this.m = !0, We(this);
      }, Ve.prototype.h = function(u) {
        var p = this.a;
        if (p.g) {
          var w = g(p.f, p.a.c("wf", u.c, F(u).toString(), "active")), y = [], A = [p.a.c("wf", u.c, F(u).toString(), "loading")];
          w || y.push(p.a.c("wf", u.c, F(u).toString(), "inactive")), c(p.f, y, A);
        }
        ke(p, "fontinactive", u), We(this);
      };
      function We(u) {
        --u.f == 0 && u.j && (u.m ? (u = u.a, u.g && c(u.f, [u.a.c("wf", "active")], [u.a.c("wf", "loading"), u.a.c("wf", "inactive")]), ke(u, "active")) : Xe(u.a));
      }
      function sn(u) {
        this.j = u, this.a = new Lt(), this.h = 0, this.f = this.g = !0;
      }
      sn.prototype.load = function(u) {
        this.c = new r(this.j, u.context || this.j), this.g = u.events !== !1, this.f = u.classes !== !1, d(this, new ge(this.c, u), u);
      };
      function h(u, p, w, y, A) {
        var N = --u.h == 0;
        (u.f || u.g) && setTimeout(function() {
          var q = A || null, ne = y || null || {};
          if (w.length === 0 && N) Xe(p.a);
          else {
            p.f += w.length, N && (p.j = N);
            var oe, _e = [];
            for (oe = 0; oe < w.length; oe++) {
              var be = w[oe], Ie = ne[be.c], tt = p.a, Wt = be;
              if (tt.g && c(tt.f, [tt.a.c("wf", Wt.c, F(Wt).toString(), "loading")]), ke(tt, "fontloading", Wt), tt = null, yt === null) if (window.FontFace) {
                var Wt = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), Vo = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                yt = Wt ? 42 < parseInt(Wt[1], 10) : !Vo;
              } else yt = !1;
              yt ? tt = new Me(s(p.g, p), s(p.h, p), p.c, be, p.s, Ie) : tt = new et(s(p.g, p), s(p.h, p), p.c, be, p.s, q, Ie), _e.push(tt);
            }
            for (oe = 0; oe < _e.length; oe++) _e[oe].start();
          }
        }, 0);
      }
      function d(u, p, w) {
        var A = [], y = w.timeout;
        Fe(p);
        var A = rt(u.a, w, u.c), N = new Ve(u.c, p, y);
        for (u.h = A.length, p = 0, w = A.length; p < w; p++) A[p].load(function(q, ne, oe) {
          h(u, N, q, ne, oe);
        });
      }
      function m(u, p) {
        this.c = u, this.a = p;
      }
      m.prototype.load = function(u) {
        function p() {
          if (N["__mti_fntLst" + y]) {
            var q = N["__mti_fntLst" + y](), ne = [], oe;
            if (q) for (var _e = 0; _e < q.length; _e++) {
              var be = q[_e].fontfamily;
              q[_e].fontStyle != null && q[_e].fontWeight != null ? (oe = q[_e].fontStyle + q[_e].fontWeight, ne.push(new $(be, oe))) : ne.push(new $(be));
            }
            u(ne);
          } else setTimeout(function() {
            p();
          }, 50);
        }
        var w = this, y = w.a.projectId, A = w.a.version;
        if (y) {
          var N = w.c.o;
          B(this.c, (w.a.api || "https://fast.fonts.net/jsapi") + "/" + y + ".js" + (A ? "?v=" + A : ""), function(q) {
            q ? u([]) : (N["__MonotypeConfiguration__" + y] = function() {
              return w.a;
            }, p());
          }).id = "__MonotypeAPIScript__" + y;
        } else u([]);
      };
      function T(u, p) {
        this.c = u, this.a = p;
      }
      T.prototype.load = function(u) {
        var p, w, y = this.a.urls || [], A = this.a.families || [], N = this.a.testStrings || {}, q = new P();
        for (p = 0, w = y.length; p < w; p++) k(this.c, y[p], G(q));
        var ne = [];
        for (p = 0, w = A.length; p < w; p++) if (y = A[p].split(":"), y[1]) for (var oe = y[1].split(","), _e = 0; _e < oe.length; _e += 1) ne.push(new $(y[0], oe[_e]));
        else ne.push(new $(y[0]));
        K(q, function() {
          u(ne, N);
        });
      };
      function b(u, p) {
        u ? this.c = u : this.c = v, this.a = [], this.f = [], this.g = p || "";
      }
      var v = "https://fonts.googleapis.com/css";
      function I(u, p) {
        for (var w = p.length, y = 0; y < w; y++) {
          var A = p[y].split(":");
          A.length == 3 && u.f.push(A.pop());
          var N = "";
          A.length == 2 && A[1] != "" && (N = ":"), u.a.push(A.join(N));
        }
      }
      function O(u) {
        if (u.a.length == 0) throw Error("No fonts to load!");
        if (u.c.indexOf("kit=") != -1) return u.c;
        for (var p = u.a.length, w = [], y = 0; y < p; y++) w.push(u.a[y].replace(/ /g, "+"));
        return p = u.c + "?family=" + w.join("%7C"), 0 < u.f.length && (p += "&subset=" + u.f.join(",")), 0 < u.g.length && (p += "&text=" + encodeURIComponent(u.g)), p;
      }
      function C(u) {
        this.f = u, this.a = [], this.c = {};
      }
      var E = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, M = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, L = { i: "i", italic: "i", n: "n", normal: "n" }, R = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function S(u) {
        for (var p = u.f.length, w = 0; w < p; w++) {
          var y = u.f[w].split(":"), A = y[0].replace(/\+/g, " "), N = ["n4"];
          if (2 <= y.length) {
            var q, ne = y[1];
            if (q = [], ne) for (var ne = ne.split(","), oe = ne.length, _e = 0; _e < oe; _e++) {
              var be;
              if (be = ne[_e], be.match(/^[\w-]+$/)) {
                var Ie = R.exec(be.toLowerCase());
                if (Ie == null) be = "";
                else {
                  if (be = Ie[2], be = be == null || be == "" ? "n" : L[be], Ie = Ie[1], Ie == null || Ie == "") Ie = "4";
                  else var tt = M[Ie], Ie = tt || (isNaN(Ie) ? "4" : Ie.substr(0, 1));
                  be = [be, Ie].join("");
                }
              } else be = "";
              be && q.push(be);
            }
            0 < q.length && (N = q), y.length == 3 && (y = y[2], q = [], y = y ? y.split(",") : q, 0 < y.length && (y = E[y[0]]) && (u.c[A] = y));
          }
          for (u.c[A] || (y = E[A]) && (u.c[A] = y), y = 0; y < N.length; y += 1) u.a.push(new $(A, N[y]));
        }
      }
      function x(u, p) {
        this.c = u, this.a = p;
      }
      var H = { Arimo: !0, Cousine: !0, Tinos: !0 };
      x.prototype.load = function(u) {
        var p = new P(), w = this.c, y = new b(this.a.api, this.a.text), A = this.a.families;
        I(y, A);
        var N = new C(A);
        S(N), k(w, O(y), G(p)), K(p, function() {
          u(N.a, N.c, H);
        });
      };
      function D(u, p) {
        this.c = u, this.a = p;
      }
      D.prototype.load = function(u) {
        var p = this.a.id, w = this.c.o;
        p ? B(this.c, (this.a.api || "https://use.typekit.net") + "/" + p + ".js", function(y) {
          if (y) u([]);
          else if (w.Typekit && w.Typekit.config && w.Typekit.config.fn) {
            y = w.Typekit.config.fn;
            for (var A = [], N = 0; N < y.length; N += 2) for (var q = y[N], ne = y[N + 1], oe = 0; oe < ne.length; oe++) A.push(new $(q, ne[oe]));
            try {
              w.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            u(A);
          }
        }, 2e3) : u([]);
      };
      function ae(u, p) {
        this.c = u, this.f = p, this.a = [];
      }
      ae.prototype.load = function(u) {
        var p = this.f.id, w = this.c.o, y = this;
        p ? (w.__webfontfontdeckmodule__ || (w.__webfontfontdeckmodule__ = {}), w.__webfontfontdeckmodule__[p] = function(A, N) {
          for (var q = 0, ne = N.fonts.length; q < ne; ++q) {
            var oe = N.fonts[q];
            y.a.push(new $(oe.name, W("font-weight:" + oe.weight + ";font-style:" + oe.style)));
          }
          u(y.a);
        }, B(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + _(this.c) + "/" + p + ".js", function(A) {
          A && u([]);
        })) : u([]);
      };
      var fe = new sn(window);
      fe.a.c.custom = function(u, p) {
        return new T(p, u);
      }, fe.a.c.fontdeck = function(u, p) {
        return new ae(p, u);
      }, fe.a.c.monotype = function(u, p) {
        return new m(p, u);
      }, fe.a.c.typekit = function(u, p) {
        return new D(p, u);
      }, fe.a.c.google = function(u, p) {
        return new x(p, u);
      };
      var De = { load: s(fe.load, fe) };
      t.exports ? t.exports = De : (window.WebFont = De, window.WebFontConfig && fe.load(window.WebFontConfig));
    })();
  }(Os)), Os.exports;
}
var Gu = Ku();
const Zu = /* @__PURE__ */ Wu(Gu);
function Yu() {
  const t = pe({}), e = pe(""), n = (i, r, o) => {
    t.value = i, e.value = o.full_name ? o.full_name : r, o.profile_pic && (t.value.photo_url = o.profile_pic), i.font_family && Zu.load({
      google: {
        families: [i.font_family]
      },
      active: () => {
        const l = document.querySelector(".chat-container");
        l && (l.style.fontFamily = `"${i.font_family}", system-ui, sans-serif`);
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
      i && n(i.customization || {}, i.agentName || "", i.customer || "");
    }
  };
}
const Ju = {
  key: 0,
  class: "initializing-overlay"
}, Qu = {
  key: 0,
  class: "connecting-message"
}, Xu = {
  key: 1,
  class: "failed-message"
}, ef = { class: "header-content" }, tf = ["src", "alt"], nf = { class: "header-info" }, sf = { class: "status" }, rf = {
  key: 0,
  class: "loading-history"
}, of = {
  key: 0,
  class: "rating-content"
}, lf = { class: "rating-prompt" }, af = ["onMouseover", "onMouseleave", "onClick", "disabled"], cf = {
  key: 0,
  class: "feedback-wrapper"
}, uf = { class: "feedback-section" }, ff = ["onUpdate:modelValue", "disabled"], hf = { class: "feedback-counter" }, df = ["onClick", "disabled"], pf = {
  key: 1,
  class: "submitted-feedback-wrapper"
}, gf = { class: "submitted-feedback" }, mf = { class: "submitted-feedback-text" }, yf = {
  key: 2,
  class: "submitted-message"
}, _f = ["innerHTML"], bf = { class: "message-info" }, wf = {
  key: 0,
  class: "agent-name"
}, vf = {
  key: 0,
  class: "typing-indicator"
}, xf = {
  key: 0,
  class: "email-input"
}, kf = ["disabled"], Sf = { class: "message-input" }, Tf = ["placeholder", "disabled"], Ef = ["disabled"], Rf = {
  key: 4,
  class: "rating-dialog"
}, Af = { class: "rating-content" }, Cf = { class: "star-rating" }, Of = ["onClick"], If = { class: "rating-actions" }, Pf = ["disabled"], Is = "ctid", Lf = /* @__PURE__ */ ql({
  __name: "WidgetBuilder",
  props: {
    widgetId: {}
  },
  setup(t) {
    var L;
    ee.setOptions({
      renderer: new ee.Renderer(),
      gfm: !0,
      breaks: !0
    });
    const e = new ee.Renderer(), n = e.link;
    e.link = (R, S, x) => n.call(e, R, S, x).replace(/^<a /, '<a target="_blank" rel="nofollow" '), ee.use({ renderer: e });
    const s = t, i = je(() => {
      var R;
      return s.widgetId || ((R = window.__INITIAL_DATA__) == null ? void 0 : R.widgetId);
    }), {
      customization: r,
      agentName: o,
      applyCustomization: l,
      initializeFromData: a
    } = Yu(), {
      messages: f,
      loading: c,
      errorMessage: g,
      showError: _,
      loadingHistory: k,
      hasStartedChat: B,
      connectionStatus: P,
      sendMessage: G,
      loadChatHistory: K,
      connect: Y,
      reconnect: te,
      cleanup: $,
      customer: J,
      onTakeover: Se,
      submitRating: F
    } = Vu(), Q = pe(""), W = pe(!0), ge = pe(""), Fe = pe(!1), Xe = pe(!0), ke = pe(((L = window.__INITIAL_DATA__) == null ? void 0 : L.initialToken) || localStorage.getItem(Is)), Lt = je(() => !!ke.value);
    a();
    const rt = window.__INITIAL_DATA__;
    rt != null && rt.initialToken && (ke.value = rt.initialToken, window.parent.postMessage({
      type: "TOKEN_UPDATE",
      token: rt.initialToken
    }, "*"), Fe.value = !0);
    const de = pe(null), {
      chatStyles: se,
      chatIconStyles: X,
      agentBubbleStyles: Me,
      userBubbleStyles: et,
      messageNameStyles: Te,
      headerBorderStyles: Ee,
      photoUrl: kt,
      shadowStyle: Vt
    } = Jc(r), Bt = je(() => (Lt.value || Es(ge.value.trim())) && P.value === "connected" && !c.value), ot = async () => {
      Q.value.trim() && (!B.value && ge.value && await Ve(), await G(Q.value, ge.value), Q.value = "");
    }, lt = (R) => {
      R.key === "Enter" && !R.shiftKey && (R.preventDefault(), ot());
    }, Ve = async () => {
      var R;
      try {
        if (!i.value)
          return console.error("Widget ID is not available"), !1;
        const S = new URL(`${ki.API_URL}/widgets/${i.value}`);
        ge.value.trim() && Es(ge.value.trim()) && S.searchParams.append("email", ge.value.trim());
        const x = {
          Accept: "application/json",
          "Content-Type": "application/json"
        };
        ke.value && (x.Authorization = `Bearer ${ke.value}`);
        const H = await fetch(S, {
          headers: x
        });
        if (H.status === 401)
          return Fe.value = !1, !1;
        const D = await H.json();
        return D.token && (ke.value = D.token, localStorage.setItem(Is, D.token), window.parent.postMessage({ type: "TOKEN_UPDATE", token: D.token }, "*")), Fe.value = !0, await Y() ? (await yt(), (R = D.agent) != null && R.customization && (J.value = D.customer, l(D.agent.customization, D.agent.display_name, D.customer)), !0) : (console.error("Failed to connect to chat service"), !1);
      } catch (S) {
        return console.error("Error checking authorization:", S), Fe.value = !1, !1;
      } finally {
        Xe.value = !1;
      }
    }, yt = async () => {
      !B.value && Fe.value && (B.value = !0, await K());
    }, We = () => {
      de.value && (de.value.scrollTop = de.value.scrollHeight);
    };
    Mn(() => f.value, (R) => {
      if (Ur(() => {
        We();
      }), R.length > 0) {
        const S = R[R.length - 1];
        I(S);
      }
    }, { deep: !0 });
    const sn = async () => {
      await te() && await Ve();
    }, h = pe(!1), d = pe(0), m = pe(""), T = pe(""), b = pe(0), v = pe(!1);
    je(() => {
      var S;
      const R = f.value[f.value.length - 1];
      return ((S = R == null ? void 0 : R.attributes) == null ? void 0 : S.request_rating) || !1;
    });
    const I = (R) => {
      var S, x, H;
      if ((S = R.attributes) != null && S.end_chat && ((x = R.attributes) != null && x.request_rating)) {
        const D = R.agent_name || ((H = J.value) == null ? void 0 : H.agent_name) || o.value || "our agent";
        f.value.push({
          message: `Rate the chat session that you had with ${D}`,
          message_type: "rating",
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: R.session_id,
          agent_name: D,
          showFeedback: !1
        }), T.value = R.session_id;
      }
    }, O = (R) => {
      v.value || (b.value = R);
    }, C = () => {
      if (!v.value) {
        const R = f.value[f.value.length - 1];
        b.value = (R == null ? void 0 : R.selectedRating) || 0;
      }
    }, E = async (R) => {
      if (!v.value) {
        b.value = R;
        const S = f.value[f.value.length - 1];
        S && S.message_type === "rating" && (S.showFeedback = !0, S.selectedRating = R);
      }
    }, M = async (R, S, x = null) => {
      try {
        v.value = !0, await F(S, x);
        const H = f.value.find((D) => D.message_type === "rating");
        H && (H.isSubmitted = !0, H.finalRating = S, H.finalFeedback = x);
      } catch (H) {
        console.error("Failed to submit rating:", H);
      } finally {
        v.value = !1;
      }
    };
    return Zr(async () => {
      if (!await Ve()) {
        P.value = "connected";
        return;
      }
      Se(async () => {
        await Ve();
      }), window.addEventListener("message", (S) => {
        S.data.type === "SCROLL_TO_BOTTOM" && We(), S.data.type === "TOKEN_RECEIVED" && localStorage.setItem(Is, S.data.token);
      });
    }), hi(() => {
      window.removeEventListener("message", (R) => {
        R.data.type === "SCROLL_TO_BOTTOM" && We();
      }), $();
    }), (R, S) => (me(), we("div", {
      class: nt(["chat-container", { collapsed: !W.value }]),
      style: Le(z(Vt))
    }, [
      Xe.value ? (me(), we("div", Ju, S[5] || (S[5] = [
        Pa('<div class="loading-spinner" data-v-126f8212><div class="dot" data-v-126f8212></div><div class="dot" data-v-126f8212></div><div class="dot" data-v-126f8212></div></div><div class="loading-text" data-v-126f8212>Initializing chat...</div>', 2)
      ]))) : qe("", !0),
      !Xe.value && z(P) !== "connected" ? (me(), we("div", {
        key: 1,
        class: nt(["connection-status", z(P)])
      }, [
        z(P) === "connecting" ? (me(), we("div", Qu, S[6] || (S[6] = [
          Hs(" Connecting to chat service... "),
          U("div", { class: "loading-dots" }, [
            U("div", { class: "dot" }),
            U("div", { class: "dot" }),
            U("div", { class: "dot" })
          ], -1)
        ]))) : z(P) === "failed" ? (me(), we("div", Xu, [
          S[7] || (S[7] = Hs(" Connection failed. ")),
          U("button", {
            onClick: sn,
            class: "reconnect-button"
          }, " Click here to reconnect ")
        ])) : qe("", !0)
      ], 2)) : qe("", !0),
      z(_) ? (me(), we("div", {
        key: 2,
        class: "error-alert",
        style: Le(z(X))
      }, Ft(z(g)), 5)) : qe("", !0),
      W.value ? (me(), we("div", {
        key: 3,
        class: "chat-panel",
        style: Le(z(se))
      }, [
        U("div", {
          class: "chat-header",
          style: Le(z(Ee))
        }, [
          U("div", ef, [
            z(J).agent_profile_pic || z(kt) ? (me(), we("img", {
              key: 0,
              src: z(J).agent_profile_pic || z(kt),
              alt: z(J).agent_name || z(o),
              class: "header-avatar"
            }, null, 8, tf)) : qe("", !0),
            U("div", nf, [
              U("h3", {
                style: Le(z(Te))
              }, Ft(z(J).agent_name || z(o)), 5),
              U("div", sf, [
                S[8] || (S[8] = U("span", { class: "status-indicator online" }, null, -1)),
                U("span", {
                  class: "status-text",
                  style: Le(z(Te))
                }, "Online", 4)
              ])
            ])
          ])
        ], 4),
        z(k) ? (me(), we("div", rf, S[9] || (S[9] = [
          U("div", { class: "loading-spinner" }, [
            U("div", { class: "dot" }),
            U("div", { class: "dot" }),
            U("div", { class: "dot" })
          ], -1)
        ]))) : qe("", !0),
        U("div", {
          class: "chat-messages",
          ref_key: "messagesContainer",
          ref: de
        }, [
          (me(!0), we(Ke, null, ws(z(f), (x, H) => {
            var D;
            return me(), we("div", {
              key: H,
              class: nt([
                "message",
                x.message_type === "bot" || x.message_type === "agent" ? "agent-message" : x.message_type === "system" ? "system-message" : x.message_type === "rating" ? "rating-message" : "user-message"
              ])
            }, [
              U("div", {
                class: "message-bubble",
                style: Le(x.message_type === "system" || x.message_type === "rating" ? {} : x.message_type === "user" ? z(et) : z(Me))
              }, [
                x.message_type === "rating" ? (me(), we("div", of, [
                  U("p", lf, "Rate the chat session that you had with " + Ft(x.agent_name || z(J).agent_name || z(o) || "our agent"), 1),
                  U("div", {
                    class: nt(["star-rating", { submitted: v.value || x.isSubmitted }])
                  }, [
                    (me(), we(Ke, null, ws(5, (ae) => U("button", {
                      key: ae,
                      class: nt(["star-button", {
                        warning: ae <= (x.isSubmitted ? x.finalRating : b.value || x.selectedRating) && (x.isSubmitted ? x.finalRating : b.value || x.selectedRating) <= 3,
                        success: ae <= (x.isSubmitted ? x.finalRating : b.value || x.selectedRating) && (x.isSubmitted ? x.finalRating : b.value || x.selectedRating) > 3,
                        selected: ae <= (x.isSubmitted ? x.finalRating : b.value || x.selectedRating)
                      }]),
                      onMouseover: (fe) => !x.isSubmitted && O(ae),
                      onMouseleave: (fe) => !x.isSubmitted && C,
                      onClick: (fe) => !x.isSubmitted && E(ae),
                      disabled: v.value || x.isSubmitted
                    }, " ★ ", 42, af)), 64))
                  ], 2),
                  x.showFeedback && !x.isSubmitted ? (me(), we("div", cf, [
                    U("div", uf, [
                      In(U("input", {
                        "onUpdate:modelValue": (ae) => x.feedback = ae,
                        placeholder: "Please share your feedback (optional)",
                        disabled: v.value,
                        maxlength: "500",
                        class: "feedback-input"
                      }, null, 8, ff), [
                        [Pn, x.feedback]
                      ]),
                      U("div", hf, Ft(((D = x.feedback) == null ? void 0 : D.length) || 0) + "/500", 1)
                    ]),
                    U("button", {
                      onClick: (ae) => M(x.session_id, b.value, x.feedback),
                      disabled: v.value || !b.value,
                      class: "submit-rating-button",
                      style: Le({ backgroundColor: z(r).accent_color || "var(--primary-color)" })
                    }, Ft(v.value ? "Submitting..." : "Submit Rating"), 13, df)
                  ])) : qe("", !0),
                  x.isSubmitted && x.finalFeedback ? (me(), we("div", pf, [
                    U("div", gf, [
                      U("p", mf, Ft(x.finalFeedback), 1)
                    ])
                  ])) : x.isSubmitted ? (me(), we("div", yf, " Thank you for your rating! ")) : qe("", !0)
                ])) : (me(), we("div", {
                  key: 1,
                  innerHTML: z(ee)(x.message, { renderer: z(e) })
                }, null, 8, _f))
              ], 4),
              U("div", bf, [
                x.message_type === "user" ? (me(), we("span", wf, " You ")) : qe("", !0)
              ])
            ], 2);
          }), 128)),
          z(c) ? (me(), we("div", vf, S[10] || (S[10] = [
            U("div", { class: "dot" }, null, -1),
            U("div", { class: "dot" }, null, -1),
            U("div", { class: "dot" }, null, -1)
          ]))) : qe("", !0)
        ], 512),
        U("div", {
          class: "chat-input",
          style: Le(z(Me))
        }, [
          !z(B) && !Fe.value ? (me(), we("div", xf, [
            In(U("input", {
              "onUpdate:modelValue": S[0] || (S[0] = (x) => ge.value = x),
              type: "email",
              placeholder: "Enter your email address to begin",
              disabled: z(c) || z(P) !== "connected",
              class: nt({
                invalid: ge.value.trim() && !z(Es)(ge.value.trim()),
                disabled: z(P) !== "connected"
              })
            }, null, 10, kf), [
              [Pn, ge.value]
            ])
          ])) : qe("", !0),
          U("div", Sf, [
            In(U("input", {
              "onUpdate:modelValue": S[1] || (S[1] = (x) => Q.value = x),
              type: "text",
              placeholder: z(P) === "connected" ? "Type a message..." : "Connecting...",
              onKeypress: lt,
              disabled: !Bt.value,
              class: nt({ disabled: z(P) !== "connected" })
            }, null, 42, Tf), [
              [Pn, Q.value]
            ]),
            U("button", {
              class: "send-button",
              style: Le(z(et)),
              onClick: ot,
              disabled: !Q.value.trim() || !Bt.value
            }, S[11] || (S[11] = [
              U("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                U("path", {
                  d: "M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1)
            ]), 12, Ef)
          ])
        ], 4),
        U("div", {
          class: "powered-by",
          style: Le(z(Te))
        }, " Powered by ChatterMate ", 4)
      ], 4)) : qe("", !0),
      h.value ? (me(), we("div", Rf, [
        U("div", Af, [
          S[12] || (S[12] = U("h3", null, "Rate your conversation", -1)),
          U("div", Cf, [
            (me(), we(Ke, null, ws(5, (x) => U("button", {
              key: x,
              onClick: (H) => d.value = x,
              class: nt([{ active: x <= d.value }, "star-button"])
            }, " ★ ", 10, Of)), 64))
          ]),
          In(U("textarea", {
            "onUpdate:modelValue": S[2] || (S[2] = (x) => m.value = x),
            placeholder: "Additional feedback (optional)",
            class: "rating-feedback"
          }, null, 512), [
            [Pn, m.value]
          ]),
          U("div", If, [
            U("button", {
              onClick: S[3] || (S[3] = (x) => R.submitRating(d.value, m.value)),
              disabled: !d.value,
              class: "submit-button",
              style: Le(z(et))
            }, " Submit ", 12, Pf),
            U("button", {
              onClick: S[4] || (S[4] = (x) => h.value = !1),
              class: "skip-rating"
            }, " Skip ")
          ])
        ])
      ])) : qe("", !0)
    ], 6));
  }
}), Bf = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, i] of e)
    n[s] = i;
  return n;
}, $f = /* @__PURE__ */ Bf(Lf, [["__scopeId", "data-v-126f8212"]]);
window.process || (window.process = { env: { NODE_ENV: "production" } });
const Nf = new URL(window.location.href), Ff = Nf.searchParams.get("widget_id"), Mf = fc($f, {
  widgetId: Ff
});
Mf.mount("#app");
