var zo = Object.defineProperty;
var Vo = (t, e, n) => e in t ? zo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var re = (t, e, n) => Vo(t, typeof e != "symbol" ? e + "" : e, n);
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Zs(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const oe = {}, Gt = [], ct = () => {
}, Wo = () => !1, Xn = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), Ys = (t) => t.startsWith("onUpdate:"), Te = Object.assign, Js = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Ko = Object.prototype.hasOwnProperty, te = (t, e) => Ko.call(t, e), q = Array.isArray, Zt = (t) => es(t) === "[object Map]", pr = (t) => es(t) === "[object Set]", U = (t) => typeof t == "function", me = (t) => typeof t == "string", Ct = (t) => typeof t == "symbol", he = (t) => t !== null && typeof t == "object", dr = (t) => (he(t) || U(t)) && U(t.then) && U(t.catch), gr = Object.prototype.toString, es = (t) => gr.call(t), Go = (t) => es(t).slice(8, -1), mr = (t) => es(t) === "[object Object]", Qs = (t) => me(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, un = /* @__PURE__ */ Zs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ts = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Zo = /-(\w)/g, Rt = ts(
  (t) => t.replace(Zo, (e, n) => n ? n.toUpperCase() : "")
), Yo = /\B([A-Z])/g, qt = ts(
  (t) => t.replace(Yo, "-$1").toLowerCase()
), yr = ts((t) => t.charAt(0).toUpperCase() + t.slice(1)), ps = ts(
  (t) => t ? `on${yr(t)}` : ""
), Et = (t, e) => !Object.is(t, e), Bn = (t, ...e) => {
  for (let n = 0; n < t.length; n++)
    t[n](...e);
}, _r = (t, e, n, s = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Rs = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let Ti;
const ns = () => Ti || (Ti = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function $e(t) {
  if (q(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const s = t[n], i = me(s) ? el(s) : $e(s);
      if (i)
        for (const r in i)
          e[r] = i[r];
    }
    return e;
  } else if (me(t) || he(t))
    return t;
}
const Jo = /;(?![^(]*\))/g, Qo = /:([^]+)/, Xo = /\/\*[^]*?\*\//g;
function el(t) {
  const e = {};
  return t.replace(Xo, "").split(Jo).forEach((n) => {
    if (n) {
      const s = n.split(Qo);
      s.length > 1 && (e[s[0].trim()] = s[1].trim());
    }
  }), e;
}
function Tt(t) {
  let e = "";
  if (me(t))
    e = t;
  else if (q(t))
    for (let n = 0; n < t.length; n++) {
      const s = Tt(t[n]);
      s && (e += s + " ");
    }
  else if (he(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const tl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", nl = /* @__PURE__ */ Zs(tl);
function br(t) {
  return !!t || t === "";
}
const wr = (t) => !!(t && t.__v_isRef === !0), Cs = (t) => me(t) ? t : t == null ? "" : q(t) || he(t) && (t.toString === gr || !U(t.toString)) ? wr(t) ? Cs(t.value) : JSON.stringify(t, xr, 2) : String(t), xr = (t, e) => wr(e) ? xr(t, e.value) : Zt(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [s, i], r) => (n[ds(s, r) + " =>"] = i, n),
    {}
  )
} : pr(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => ds(n))
} : Ct(e) ? ds(e) : he(e) && !q(e) && !mr(e) ? String(e) : e, ds = (t, e = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ct(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let qe;
class sl {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = qe, !e && qe && (this.index = (qe.scopes || (qe.scopes = [])).push(
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
      const n = qe;
      try {
        return qe = this, e();
      } finally {
        qe = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    qe = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    qe = this.parent;
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
function il() {
  return qe;
}
let le;
const gs = /* @__PURE__ */ new WeakSet();
class kr {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, qe && qe.active && qe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, gs.has(this) && (gs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Sr(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ei(this), Tr(this);
    const e = le, n = Qe;
    le = this, Qe = !0;
    try {
      return this.fn();
    } finally {
      Er(this), le = e, Qe = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        ti(e);
      this.deps = this.depsTail = void 0, Ei(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? gs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Os(this) && this.run();
  }
  get dirty() {
    return Os(this);
  }
}
let vr = 0, fn, hn;
function Sr(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = hn, hn = t;
    return;
  }
  t.next = fn, fn = t;
}
function Xs() {
  vr++;
}
function ei() {
  if (--vr > 0)
    return;
  if (hn) {
    let e = hn;
    for (hn = void 0; e; ) {
      const n = e.next;
      e.next = void 0, e.flags &= -9, e = n;
    }
  }
  let t;
  for (; fn; ) {
    let e = fn;
    for (fn = void 0; e; ) {
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
function Tr(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function Er(t) {
  let e, n = t.depsTail, s = n;
  for (; s; ) {
    const i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), ti(s), rl(s)) : e = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  t.deps = e, t.depsTail = n;
}
function Os(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (Ar(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function Ar(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === _n))
    return;
  t.globalVersion = _n;
  const e = t.dep;
  if (t.flags |= 2, e.version > 0 && !t.isSSR && t.deps && !Os(t)) {
    t.flags &= -3;
    return;
  }
  const n = le, s = Qe;
  le = t, Qe = !0;
  try {
    Tr(t);
    const i = t.fn(t._value);
    (e.version === 0 || Et(i, t._value)) && (t._value = i, e.version++);
  } catch (i) {
    throw e.version++, i;
  } finally {
    le = n, Qe = s, Er(t), t.flags &= -3;
  }
}
function ti(t, e = !1) {
  const { dep: n, prevSub: s, nextSub: i } = t;
  if (s && (s.nextSub = i, t.prevSub = void 0), i && (i.prevSub = s, t.nextSub = void 0), n.subs === t && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      ti(r, !0);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
function rl(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let Qe = !0;
const Rr = [];
function Ot() {
  Rr.push(Qe), Qe = !1;
}
function It() {
  const t = Rr.pop();
  Qe = t === void 0 ? !0 : t;
}
function Ei(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const n = le;
    le = void 0;
    try {
      e();
    } finally {
      le = n;
    }
  }
}
let _n = 0;
class ol {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ni {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(e) {
    if (!le || !Qe || le === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== le)
      n = this.activeLink = new ol(le, this), le.deps ? (n.prevDep = le.depsTail, le.depsTail.nextDep = n, le.depsTail = n) : le.deps = le.depsTail = n, Cr(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = le.depsTail, n.nextDep = void 0, le.depsTail.nextDep = n, le.depsTail = n, le.deps === n && (le.deps = s);
    }
    return n;
  }
  trigger(e) {
    this.version++, _n++, this.notify(e);
  }
  notify(e) {
    Xs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      ei();
    }
  }
}
function Cr(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let s = e.deps; s; s = s.nextDep)
        Cr(s);
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
  }
}
const Is = /* @__PURE__ */ new WeakMap(), Ft = Symbol(
  ""
), Ps = Symbol(
  ""
), bn = Symbol(
  ""
);
function ke(t, e, n) {
  if (Qe && le) {
    let s = Is.get(t);
    s || Is.set(t, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new ni()), i.map = s, i.key = n), i.track();
  }
}
function yt(t, e, n, s, i, r) {
  const o = Is.get(t);
  if (!o) {
    _n++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (Xs(), e === "clear")
    o.forEach(l);
  else {
    const a = q(t), f = a && Qs(n);
    if (a && n === "length") {
      const c = Number(s);
      o.forEach((g, _) => {
        (_ === "length" || _ === bn || !Ct(_) && _ >= c) && l(g);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), f && l(o.get(bn)), e) {
        case "add":
          a ? f && l(o.get("length")) : (l(o.get(Ft)), Zt(t) && l(o.get(Ps)));
          break;
        case "delete":
          a || (l(o.get(Ft)), Zt(t) && l(o.get(Ps)));
          break;
        case "set":
          Zt(t) && l(o.get(Ft));
          break;
      }
  }
  ei();
}
function Vt(t) {
  const e = ee(t);
  return e === t ? e : (ke(e, "iterate", bn), Ge(t) ? e : e.map(ve));
}
function ss(t) {
  return ke(t = ee(t), "iterate", bn), t;
}
const ll = {
  __proto__: null,
  [Symbol.iterator]() {
    return ms(this, Symbol.iterator, ve);
  },
  concat(...t) {
    return Vt(this).concat(
      ...t.map((e) => q(e) ? Vt(e) : e)
    );
  },
  entries() {
    return ms(this, "entries", (t) => (t[1] = ve(t[1]), t));
  },
  every(t, e) {
    return gt(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return gt(this, "filter", t, e, (n) => n.map(ve), arguments);
  },
  find(t, e) {
    return gt(this, "find", t, e, ve, arguments);
  },
  findIndex(t, e) {
    return gt(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return gt(this, "findLast", t, e, ve, arguments);
  },
  findLastIndex(t, e) {
    return gt(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return gt(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return ys(this, "includes", t);
  },
  indexOf(...t) {
    return ys(this, "indexOf", t);
  },
  join(t) {
    return Vt(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return ys(this, "lastIndexOf", t);
  },
  map(t, e) {
    return gt(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return nn(this, "pop");
  },
  push(...t) {
    return nn(this, "push", t);
  },
  reduce(t, ...e) {
    return Ai(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return Ai(this, "reduceRight", t, e);
  },
  shift() {
    return nn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return gt(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return nn(this, "splice", t);
  },
  toReversed() {
    return Vt(this).toReversed();
  },
  toSorted(t) {
    return Vt(this).toSorted(t);
  },
  toSpliced(...t) {
    return Vt(this).toSpliced(...t);
  },
  unshift(...t) {
    return nn(this, "unshift", t);
  },
  values() {
    return ms(this, "values", ve);
  }
};
function ms(t, e, n) {
  const s = ss(t), i = s[e]();
  return s !== t && !Ge(t) && (i._next = i.next, i.next = () => {
    const r = i._next();
    return r.value && (r.value = n(r.value)), r;
  }), i;
}
const al = Array.prototype;
function gt(t, e, n, s, i, r) {
  const o = ss(t), l = o !== t && !Ge(t), a = o[e];
  if (a !== al[e]) {
    const g = a.apply(t, r);
    return l ? ve(g) : g;
  }
  let f = n;
  o !== t && (l ? f = function(g, _) {
    return n.call(this, ve(g), _, t);
  } : n.length > 2 && (f = function(g, _) {
    return n.call(this, g, _, t);
  }));
  const c = a.call(o, f, s);
  return l && i ? i(c) : c;
}
function Ai(t, e, n, s) {
  const i = ss(t);
  let r = n;
  return i !== t && (Ge(t) ? n.length > 3 && (r = function(o, l, a) {
    return n.call(this, o, l, a, t);
  }) : r = function(o, l, a) {
    return n.call(this, o, ve(l), a, t);
  }), i[e](r, ...s);
}
function ys(t, e, n) {
  const s = ee(t);
  ke(s, "iterate", bn);
  const i = s[e](...n);
  return (i === -1 || i === !1) && oi(n[0]) ? (n[0] = ee(n[0]), s[e](...n)) : i;
}
function nn(t, e, n = []) {
  Ot(), Xs();
  const s = ee(t)[e].apply(t, n);
  return ei(), It(), s;
}
const cl = /* @__PURE__ */ Zs("__proto__,__v_isRef,__isVue"), Or = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Ct)
);
function ul(t) {
  Ct(t) || (t = String(t));
  const e = ee(this);
  return ke(e, "has", t), e.hasOwnProperty(t);
}
class Ir {
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
      return s === (i ? r ? wl : Nr : r ? Lr : Br).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(s) ? e : void 0;
    const o = q(e);
    if (!i) {
      let a;
      if (o && (a = ll[n]))
        return a;
      if (n === "hasOwnProperty")
        return ul;
    }
    const l = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Se(e) ? e : s
    );
    return (Ct(n) ? Or.has(n) : cl(n)) || (i || ke(e, "get", n), r) ? l : Se(l) ? o && Qs(n) ? l : l.value : he(l) ? i ? Fr(l) : ii(l) : l;
  }
}
class Pr extends Ir {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, s, i) {
    let r = e[n];
    if (!this._isShallow) {
      const a = Mt(r);
      if (!Ge(s) && !Mt(s) && (r = ee(r), s = ee(s)), !q(e) && Se(r) && !Se(s))
        return a ? !1 : (r.value = s, !0);
    }
    const o = q(e) && Qs(n) ? Number(n) < e.length : te(e, n), l = Reflect.set(
      e,
      n,
      s,
      Se(e) ? e : i
    );
    return e === ee(i) && (o ? Et(s, r) && yt(e, "set", n, s) : yt(e, "add", n, s)), l;
  }
  deleteProperty(e, n) {
    const s = te(e, n);
    e[n];
    const i = Reflect.deleteProperty(e, n);
    return i && s && yt(e, "delete", n, void 0), i;
  }
  has(e, n) {
    const s = Reflect.has(e, n);
    return (!Ct(n) || !Or.has(n)) && ke(e, "has", n), s;
  }
  ownKeys(e) {
    return ke(
      e,
      "iterate",
      q(e) ? "length" : Ft
    ), Reflect.ownKeys(e);
  }
}
class fl extends Ir {
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
const hl = /* @__PURE__ */ new Pr(), pl = /* @__PURE__ */ new fl(), dl = /* @__PURE__ */ new Pr(!0);
const Bs = (t) => t, En = (t) => Reflect.getPrototypeOf(t);
function gl(t, e, n) {
  return function(...s) {
    const i = this.__v_raw, r = ee(i), o = Zt(r), l = t === "entries" || t === Symbol.iterator && o, a = t === "keys" && o, f = i[t](...s), c = n ? Bs : e ? Ls : ve;
    return !e && ke(
      r,
      "iterate",
      a ? Ps : Ft
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
function An(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function ml(t, e) {
  const n = {
    get(i) {
      const r = this.__v_raw, o = ee(r), l = ee(i);
      t || (Et(i, l) && ke(o, "get", i), ke(o, "get", l));
      const { has: a } = En(o), f = e ? Bs : t ? Ls : ve;
      if (a.call(o, i))
        return f(r.get(i));
      if (a.call(o, l))
        return f(r.get(l));
      r !== o && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !t && ke(ee(i), "iterate", Ft), Reflect.get(i, "size", i);
    },
    has(i) {
      const r = this.__v_raw, o = ee(r), l = ee(i);
      return t || (Et(i, l) && ke(o, "has", i), ke(o, "has", l)), i === l ? r.has(i) : r.has(i) || r.has(l);
    },
    forEach(i, r) {
      const o = this, l = o.__v_raw, a = ee(l), f = e ? Bs : t ? Ls : ve;
      return !t && ke(a, "iterate", Ft), l.forEach((c, g) => i.call(r, f(c), f(g), o));
    }
  };
  return Te(
    n,
    t ? {
      add: An("add"),
      set: An("set"),
      delete: An("delete"),
      clear: An("clear")
    } : {
      add(i) {
        !e && !Ge(i) && !Mt(i) && (i = ee(i));
        const r = ee(this);
        return En(r).has.call(r, i) || (r.add(i), yt(r, "add", i, i)), this;
      },
      set(i, r) {
        !e && !Ge(r) && !Mt(r) && (r = ee(r));
        const o = ee(this), { has: l, get: a } = En(o);
        let f = l.call(o, i);
        f || (i = ee(i), f = l.call(o, i));
        const c = a.call(o, i);
        return o.set(i, r), f ? Et(r, c) && yt(o, "set", i, r) : yt(o, "add", i, r), this;
      },
      delete(i) {
        const r = ee(this), { has: o, get: l } = En(r);
        let a = o.call(r, i);
        a || (i = ee(i), a = o.call(r, i)), l && l.call(r, i);
        const f = r.delete(i);
        return a && yt(r, "delete", i, void 0), f;
      },
      clear() {
        const i = ee(this), r = i.size !== 0, o = i.clear();
        return r && yt(
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
    n[i] = gl(i, t, e);
  }), n;
}
function si(t, e) {
  const n = ml(t, e);
  return (s, i, r) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? s : Reflect.get(
    te(n, i) && i in s ? n : s,
    i,
    r
  );
}
const yl = {
  get: /* @__PURE__ */ si(!1, !1)
}, _l = {
  get: /* @__PURE__ */ si(!1, !0)
}, bl = {
  get: /* @__PURE__ */ si(!0, !1)
};
const Br = /* @__PURE__ */ new WeakMap(), Lr = /* @__PURE__ */ new WeakMap(), Nr = /* @__PURE__ */ new WeakMap(), wl = /* @__PURE__ */ new WeakMap();
function xl(t) {
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
function kl(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : xl(Go(t));
}
function ii(t) {
  return Mt(t) ? t : ri(
    t,
    !1,
    hl,
    yl,
    Br
  );
}
function vl(t) {
  return ri(
    t,
    !1,
    dl,
    _l,
    Lr
  );
}
function Fr(t) {
  return ri(
    t,
    !0,
    pl,
    bl,
    Nr
  );
}
function ri(t, e, n, s, i) {
  if (!he(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const r = i.get(t);
  if (r)
    return r;
  const o = kl(t);
  if (o === 0)
    return t;
  const l = new Proxy(
    t,
    o === 2 ? s : n
  );
  return i.set(t, l), l;
}
function Yt(t) {
  return Mt(t) ? Yt(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Mt(t) {
  return !!(t && t.__v_isReadonly);
}
function Ge(t) {
  return !!(t && t.__v_isShallow);
}
function oi(t) {
  return t ? !!t.__v_raw : !1;
}
function ee(t) {
  const e = t && t.__v_raw;
  return e ? ee(e) : t;
}
function Sl(t) {
  return !te(t, "__v_skip") && Object.isExtensible(t) && _r(t, "__v_skip", !0), t;
}
const ve = (t) => he(t) ? ii(t) : t, Ls = (t) => he(t) ? Fr(t) : t;
function Se(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function _e(t) {
  return Tl(t, !1);
}
function Tl(t, e) {
  return Se(t) ? t : new El(t, e);
}
class El {
  constructor(e, n) {
    this.dep = new ni(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? e : ee(e), this._value = n ? e : ve(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, s = this.__v_isShallow || Ge(e) || Mt(e);
    e = s ? e : ee(e), Et(e, n) && (this._rawValue = e, this._value = s ? e : ve(e), this.dep.trigger());
  }
}
function Al(t) {
  return Se(t) ? t.value : t;
}
const Rl = {
  get: (t, e, n) => e === "__v_raw" ? t : Al(Reflect.get(t, e, n)),
  set: (t, e, n, s) => {
    const i = t[e];
    return Se(i) && !Se(n) ? (i.value = n, !0) : Reflect.set(t, e, n, s);
  }
};
function Mr(t) {
  return Yt(t) ? t : new Proxy(t, Rl);
}
class Cl {
  constructor(e, n, s) {
    this.fn = e, this.setter = n, this._value = void 0, this.dep = new ni(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = _n - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    le !== this)
      return Sr(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Ar(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
function Ol(t, e, n = !1) {
  let s, i;
  return U(t) ? s = t : (s = t.get, i = t.set), new Cl(s, i, n);
}
const Rn = {}, Hn = /* @__PURE__ */ new WeakMap();
let Nt;
function Il(t, e = !1, n = Nt) {
  if (n) {
    let s = Hn.get(n);
    s || Hn.set(n, s = []), s.push(t);
  }
}
function Pl(t, e, n = oe) {
  const { immediate: s, deep: i, once: r, scheduler: o, augmentJob: l, call: a } = n, f = (I) => i ? I : Ge(I) || i === !1 || i === 0 ? _t(I, 1) : _t(I);
  let c, g, _, k, P = !1, O = !1;
  if (Se(t) ? (g = () => t.value, P = Ge(t)) : Yt(t) ? (g = () => f(t), P = !0) : q(t) ? (O = !0, P = t.some((I) => Yt(I) || Ge(I)), g = () => t.map((I) => {
    if (Se(I))
      return I.value;
    if (Yt(I))
      return f(I);
    if (U(I))
      return a ? a(I, 2) : I();
  })) : U(t) ? e ? g = a ? () => a(t, 2) : t : g = () => {
    if (_) {
      Ot();
      try {
        _();
      } finally {
        It();
      }
    }
    const I = Nt;
    Nt = c;
    try {
      return a ? a(t, 3, [k]) : t(k);
    } finally {
      Nt = I;
    }
  } : g = ct, e && i) {
    const I = g, D = i === !0 ? 1 / 0 : i;
    g = () => _t(I(), D);
  }
  const j = il(), H = () => {
    c.stop(), j && j.active && Js(j.effects, c);
  };
  if (r && e) {
    const I = e;
    e = (...D) => {
      I(...D), H();
    };
  }
  let W = O ? new Array(t.length).fill(Rn) : Rn;
  const Y = (I) => {
    if (!(!(c.flags & 1) || !c.dirty && !I))
      if (e) {
        const D = c.run();
        if (i || P || (O ? D.some((ue, N) => Et(ue, W[N])) : Et(D, W))) {
          _ && _();
          const ue = Nt;
          Nt = c;
          try {
            const N = [
              D,
              // pass undefined as the old value when it's changed for the first time
              W === Rn ? void 0 : O && W[0] === Rn ? [] : W,
              k
            ];
            a ? a(e, 3, N) : (
              // @ts-expect-error
              e(...N)
            ), W = D;
          } finally {
            Nt = ue;
          }
        }
      } else
        c.run();
  };
  return l && l(Y), c = new kr(g), c.scheduler = o ? () => o(Y, !1) : Y, k = (I) => Il(I, !1, c), _ = c.onStop = () => {
    const I = Hn.get(c);
    if (I) {
      if (a)
        a(I, 4);
      else
        for (const D of I) D();
      Hn.delete(c);
    }
  }, e ? s ? Y(!0) : W = c.run() : o ? o(Y.bind(null, !0), !0) : c.run(), H.pause = c.pause.bind(c), H.resume = c.resume.bind(c), H.stop = H, H;
}
function _t(t, e = 1 / 0, n) {
  if (e <= 0 || !he(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(t)))
    return t;
  if (n.add(t), e--, Se(t))
    _t(t.value, e, n);
  else if (q(t))
    for (let s = 0; s < t.length; s++)
      _t(t[s], e, n);
  else if (pr(t) || Zt(t))
    t.forEach((s) => {
      _t(s, e, n);
    });
  else if (mr(t)) {
    for (const s in t)
      _t(t[s], e, n);
    for (const s of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, s) && _t(t[s], e, n);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function vn(t, e, n, s) {
  try {
    return s ? t(...s) : t();
  } catch (i) {
    is(i, e, n);
  }
}
function ht(t, e, n, s) {
  if (U(t)) {
    const i = vn(t, e, n, s);
    return i && dr(i) && i.catch((r) => {
      is(r, e, n);
    }), i;
  }
  if (q(t)) {
    const i = [];
    for (let r = 0; r < t.length; r++)
      i.push(ht(t[r], e, n, s));
    return i;
  }
}
function is(t, e, n, s = !0) {
  const i = e ? e.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: o } = e && e.appContext.config || oe;
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
      Ot(), vn(r, null, 10, [
        t,
        a,
        f
      ]), It();
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
const Ce = [];
let ot = -1;
const Jt = [];
let vt = null, Wt = 0;
const Dr = /* @__PURE__ */ Promise.resolve();
let zn = null;
function $r(t) {
  const e = zn || Dr;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Ll(t) {
  let e = ot + 1, n = Ce.length;
  for (; e < n; ) {
    const s = e + n >>> 1, i = Ce[s], r = wn(i);
    r < t || r === t && i.flags & 2 ? e = s + 1 : n = s;
  }
  return e;
}
function li(t) {
  if (!(t.flags & 1)) {
    const e = wn(t), n = Ce[Ce.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= wn(n) ? Ce.push(t) : Ce.splice(Ll(e), 0, t), t.flags |= 1, qr();
  }
}
function qr() {
  zn || (zn = Dr.then(jr));
}
function Nl(t) {
  q(t) ? Jt.push(...t) : vt && t.id === -1 ? vt.splice(Wt + 1, 0, t) : t.flags & 1 || (Jt.push(t), t.flags |= 1), qr();
}
function Ri(t, e, n = ot + 1) {
  for (; n < Ce.length; n++) {
    const s = Ce[n];
    if (s && s.flags & 2) {
      if (t && s.id !== t.uid)
        continue;
      Ce.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Ur(t) {
  if (Jt.length) {
    const e = [...new Set(Jt)].sort(
      (n, s) => wn(n) - wn(s)
    );
    if (Jt.length = 0, vt) {
      vt.push(...e);
      return;
    }
    for (vt = e, Wt = 0; Wt < vt.length; Wt++) {
      const n = vt[Wt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    vt = null, Wt = 0;
  }
}
const wn = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function jr(t) {
  try {
    for (ot = 0; ot < Ce.length; ot++) {
      const e = Ce[ot];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), vn(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; ot < Ce.length; ot++) {
      const e = Ce[ot];
      e && (e.flags &= -2);
    }
    ot = -1, Ce.length = 0, Ur(), zn = null, (Ce.length || Jt.length) && jr();
  }
}
let Ve = null, Hr = null;
function Vn(t) {
  const e = Ve;
  return Ve = t, Hr = t && t.type.__scopeId || null, e;
}
function Fl(t, e = Ve, n) {
  if (!e || t._n)
    return t;
  const s = (...i) => {
    s._d && Di(-1);
    const r = Vn(e);
    let o;
    try {
      o = t(...i);
    } finally {
      Vn(r), s._d && Di(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Ci(t, e) {
  if (Ve === null)
    return t;
  const n = as(Ve), s = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [r, o, l, a = oe] = e[i];
    r && (U(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && _t(o), s.push({
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
function Bt(t, e, n, s) {
  const i = t.dirs, r = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    r && (l.oldValue = r[o].value);
    let a = l.dir[s];
    a && (Ot(), ht(a, n, 8, [
      t.el,
      l,
      t,
      e
    ]), It());
  }
}
const Ml = Symbol("_vte"), Dl = (t) => t.__isTeleport;
function ai(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, ai(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function $l(t, e) {
  return U(t) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Te({ name: t.name }, e, { setup: t })
  ) : t;
}
function zr(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function Wn(t, e, n, s, i = !1) {
  if (q(t)) {
    t.forEach(
      (P, O) => Wn(
        P,
        e && (q(e) ? e[O] : e),
        n,
        s,
        i
      )
    );
    return;
  }
  if (pn(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Wn(t, e, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? as(s.component) : s.el, o = i ? null : r, { i: l, r: a } = t, f = e && e.r, c = l.refs === oe ? l.refs = {} : l.refs, g = l.setupState, _ = ee(g), k = g === oe ? () => !1 : (P) => te(_, P);
  if (f != null && f !== a && (me(f) ? (c[f] = null, k(f) && (g[f] = null)) : Se(f) && (f.value = null)), U(a))
    vn(a, l, 12, [o, c]);
  else {
    const P = me(a), O = Se(a);
    if (P || O) {
      const j = () => {
        if (t.f) {
          const H = P ? k(a) ? g[a] : c[a] : a.value;
          i ? q(H) && Js(H, r) : q(H) ? H.includes(r) || H.push(r) : P ? (c[a] = [r], k(a) && (g[a] = c[a])) : (a.value = [r], t.k && (c[t.k] = a.value));
        } else P ? (c[a] = o, k(a) && (g[a] = o)) : O && (a.value = o, t.k && (c[t.k] = o));
      };
      o ? (j.id = -1, De(j, n)) : j();
    }
  }
}
ns().requestIdleCallback;
ns().cancelIdleCallback;
const pn = (t) => !!t.type.__asyncLoader, Vr = (t) => t.type.__isKeepAlive;
function ql(t, e) {
  Wr(t, "a", e);
}
function Ul(t, e) {
  Wr(t, "da", e);
}
function Wr(t, e, n = Oe) {
  const s = t.__wdc || (t.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return t();
  });
  if (rs(e, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Vr(i.parent.vnode) && jl(s, e, n, i), i = i.parent;
  }
}
function jl(t, e, n, s) {
  const i = rs(
    e,
    t,
    s,
    !0
    /* prepend */
  );
  ci(() => {
    Js(s[e], i);
  }, n);
}
function rs(t, e, n = Oe, s = !1) {
  if (n) {
    const i = n[t] || (n[t] = []), r = e.__weh || (e.__weh = (...o) => {
      Ot();
      const l = Sn(n), a = ht(e, n, t, o);
      return l(), It(), a;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const bt = (t) => (e, n = Oe) => {
  (!kn || t === "sp") && rs(t, (...s) => e(...s), n);
}, Hl = bt("bm"), Kr = bt("m"), zl = bt(
  "bu"
), Vl = bt("u"), Wl = bt(
  "bum"
), ci = bt("um"), Kl = bt(
  "sp"
), Gl = bt("rtg"), Zl = bt("rtc");
function Yl(t, e = Oe) {
  rs("ec", t, e);
}
const Jl = Symbol.for("v-ndc");
function Ql(t, e, n, s) {
  let i;
  const r = n, o = q(t);
  if (o || me(t)) {
    const l = o && Yt(t);
    let a = !1;
    l && (a = !Ge(t), t = ss(t)), i = new Array(t.length);
    for (let f = 0, c = t.length; f < c; f++)
      i[f] = e(
        a ? ve(t[f]) : t[f],
        f,
        void 0,
        r
      );
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let l = 0; l < t; l++)
      i[l] = e(l + 1, l, void 0, r);
  } else if (he(t))
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
const Ns = (t) => t ? mo(t) ? as(t) : Ns(t.parent) : null, dn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Te(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => Ns(t.parent),
    $root: (t) => Ns(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => Zr(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      li(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = $r.bind(t.proxy)),
    $watch: (t) => wa.bind(t)
  })
), _s = (t, e) => t !== oe && !t.__isScriptSetup && te(t, e), Xl = {
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
        if (_s(s, e))
          return o[e] = 1, s[e];
        if (i !== oe && te(i, e))
          return o[e] = 2, i[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = t.propsOptions[0]) && te(f, e)
        )
          return o[e] = 3, r[e];
        if (n !== oe && te(n, e))
          return o[e] = 4, n[e];
        Fs && (o[e] = 0);
      }
    }
    const c = dn[e];
    let g, _;
    if (c)
      return e === "$attrs" && ke(t.attrs, "get", ""), c(t);
    if (
      // css module (injected by vue-loader)
      (g = l.__cssModules) && (g = g[e])
    )
      return g;
    if (n !== oe && te(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      _ = a.config.globalProperties, te(_, e)
    )
      return _[e];
  },
  set({ _: t }, e, n) {
    const { data: s, setupState: i, ctx: r } = t;
    return _s(i, e) ? (i[e] = n, !0) : s !== oe && te(s, e) ? (s[e] = n, !0) : te(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (r[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: s, appContext: i, propsOptions: r }
  }, o) {
    let l;
    return !!n[o] || t !== oe && te(t, o) || _s(e, o) || (l = r[0]) && te(l, o) || te(s, o) || te(dn, o) || te(i.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : te(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function Oi(t) {
  return q(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let Fs = !0;
function ea(t) {
  const e = Zr(t), n = t.proxy, s = t.ctx;
  Fs = !1, e.beforeCreate && Ii(e.beforeCreate, t, "bc");
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
    updated: P,
    activated: O,
    deactivated: j,
    beforeDestroy: H,
    beforeUnmount: W,
    destroyed: Y,
    unmounted: I,
    render: D,
    renderTracked: ue,
    renderTriggered: N,
    errorCaptured: ae,
    serverPrefetch: wt,
    // public API
    expose: be,
    inheritAttrs: Pe,
    // assets
    components: Xe,
    directives: ye,
    filters: xt
  } = e;
  if (f && ta(f, s, null), o)
    for (const X in o) {
      const K = o[X];
      U(K) && (s[X] = K.bind(n));
    }
  if (i) {
    const X = i.call(n, n);
    he(X) && (t.data = ii(X));
  }
  if (Fs = !0, r)
    for (const X in r) {
      const K = r[X], je = U(K) ? K.bind(n, n) : U(K.get) ? K.get.bind(n, n) : ct, dt = !U(K) && U(K.set) ? K.set.bind(n) : ct, Be = He({
        get: je,
        set: dt
      });
      Object.defineProperty(s, X, {
        enumerable: !0,
        configurable: !0,
        get: () => Be.value,
        set: (we) => Be.value = we
      });
    }
  if (l)
    for (const X in l)
      Gr(l[X], s, n, X);
  if (a) {
    const X = U(a) ? a.call(n) : a;
    Reflect.ownKeys(X).forEach((K) => {
      la(K, X[K]);
    });
  }
  c && Ii(c, t, "c");
  function ce(X, K) {
    q(K) ? K.forEach((je) => X(je.bind(n))) : K && X(K.bind(n));
  }
  if (ce(Hl, g), ce(Kr, _), ce(zl, k), ce(Vl, P), ce(ql, O), ce(Ul, j), ce(Yl, ae), ce(Zl, ue), ce(Gl, N), ce(Wl, W), ce(ci, I), ce(Kl, wt), q(be))
    if (be.length) {
      const X = t.exposed || (t.exposed = {});
      be.forEach((K) => {
        Object.defineProperty(X, K, {
          get: () => n[K],
          set: (je) => n[K] = je
        });
      });
    } else t.exposed || (t.exposed = {});
  D && t.render === ct && (t.render = D), Pe != null && (t.inheritAttrs = Pe), Xe && (t.components = Xe), ye && (t.directives = ye), wt && zr(t);
}
function ta(t, e, n = ct) {
  q(t) && (t = Ms(t));
  for (const s in t) {
    const i = t[s];
    let r;
    he(i) ? "default" in i ? r = Ln(
      i.from || s,
      i.default,
      !0
    ) : r = Ln(i.from || s) : r = Ln(i), Se(r) ? Object.defineProperty(e, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (o) => r.value = o
    }) : e[s] = r;
  }
}
function Ii(t, e, n) {
  ht(
    q(t) ? t.map((s) => s.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function Gr(t, e, n, s) {
  let i = s.includes(".") ? co(n, s) : () => n[s];
  if (me(t)) {
    const r = e[t];
    U(r) && Nn(i, r);
  } else if (U(t))
    Nn(i, t.bind(n));
  else if (he(t))
    if (q(t))
      t.forEach((r) => Gr(r, e, n, s));
    else {
      const r = U(t.handler) ? t.handler.bind(n) : e[t.handler];
      U(r) && Nn(i, r, t);
    }
}
function Zr(t) {
  const e = t.type, { mixins: n, extends: s } = e, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = r.get(e);
  let a;
  return l ? a = l : !i.length && !n && !s ? a = e : (a = {}, i.length && i.forEach(
    (f) => Kn(a, f, o, !0)
  ), Kn(a, e, o)), he(e) && r.set(e, a), a;
}
function Kn(t, e, n, s = !1) {
  const { mixins: i, extends: r } = e;
  r && Kn(t, r, n, !0), i && i.forEach(
    (o) => Kn(t, o, n, !0)
  );
  for (const o in e)
    if (!(s && o === "expose")) {
      const l = na[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const na = {
  data: Pi,
  props: Bi,
  emits: Bi,
  // objects
  methods: an,
  computed: an,
  // lifecycle
  beforeCreate: Ae,
  created: Ae,
  beforeMount: Ae,
  mounted: Ae,
  beforeUpdate: Ae,
  updated: Ae,
  beforeDestroy: Ae,
  beforeUnmount: Ae,
  destroyed: Ae,
  unmounted: Ae,
  activated: Ae,
  deactivated: Ae,
  errorCaptured: Ae,
  serverPrefetch: Ae,
  // assets
  components: an,
  directives: an,
  // watch
  watch: ia,
  // provide / inject
  provide: Pi,
  inject: sa
};
function Pi(t, e) {
  return e ? t ? function() {
    return Te(
      U(t) ? t.call(this, this) : t,
      U(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function sa(t, e) {
  return an(Ms(t), Ms(e));
}
function Ms(t) {
  if (q(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function Ae(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function an(t, e) {
  return t ? Te(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function Bi(t, e) {
  return t ? q(t) && q(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : Te(
    /* @__PURE__ */ Object.create(null),
    Oi(t),
    Oi(e ?? {})
  ) : e;
}
function ia(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = Te(/* @__PURE__ */ Object.create(null), t);
  for (const s in e)
    n[s] = Ae(t[s], e[s]);
  return n;
}
function Yr() {
  return {
    app: null,
    config: {
      isNativeTag: Wo,
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
    U(s) || (s = Te({}, s)), i != null && !he(i) && (i = null);
    const r = Yr(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const f = r.app = {
      _uid: ra++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: ja,
      get config() {
        return r.config;
      },
      set config(c) {
      },
      use(c, ...g) {
        return o.has(c) || (c && U(c.install) ? (o.add(c), c.install(f, ...g)) : U(c) && (o.add(c), c(f, ...g))), f;
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
          const k = f._ceVNode || ut(s, i);
          return k.appContext = r, _ === !0 ? _ = "svg" : _ === !1 && (_ = void 0), t(k, c, _), a = !0, f._container = c, c.__vue_app__ = f, as(k.component);
        }
      },
      onUnmount(c) {
        l.push(c);
      },
      unmount() {
        a && (ht(
          l,
          f._instance,
          16
        ), t(null, f._container), delete f._container.__vue_app__);
      },
      provide(c, g) {
        return r.provides[c] = g, f;
      },
      runWithContext(c) {
        const g = Qt;
        Qt = f;
        try {
          return c();
        } finally {
          Qt = g;
        }
      }
    };
    return f;
  };
}
let Qt = null;
function la(t, e) {
  if (Oe) {
    let n = Oe.provides;
    const s = Oe.parent && Oe.parent.provides;
    s === n && (n = Oe.provides = Object.create(s)), n[t] = e;
  }
}
function Ln(t, e, n = !1) {
  const s = Oe || Ve;
  if (s || Qt) {
    const i = Qt ? Qt._context.provides : s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && U(e) ? e.call(s && s.proxy) : e;
  }
}
const Jr = {}, Qr = () => Object.create(Jr), Xr = (t) => Object.getPrototypeOf(t) === Jr;
function aa(t, e, n, s = !1) {
  const i = {}, r = Qr();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), eo(t, e, i, r);
  for (const o in t.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? t.props = s ? i : vl(i) : t.type.props ? t.props = i : t.props = r, t.attrs = r;
}
function ca(t, e, n, s) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: o }
  } = t, l = ee(i), [a] = t.propsOptions;
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
        if (os(t.emitsOptions, _))
          continue;
        const k = e[_];
        if (a)
          if (te(r, _))
            k !== r[_] && (r[_] = k, f = !0);
          else {
            const P = Rt(_);
            i[P] = Ds(
              a,
              l,
              P,
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
    eo(t, e, i, r) && (f = !0);
    let c;
    for (const g in l)
      (!e || // for camelCase
      !te(e, g) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = qt(g)) === g || !te(e, c))) && (a ? n && // for camelCase
      (n[g] !== void 0 || // for kebab-case
      n[c] !== void 0) && (i[g] = Ds(
        a,
        l,
        g,
        void 0,
        t,
        !0
      )) : delete i[g]);
    if (r !== l)
      for (const g in r)
        (!e || !te(e, g)) && (delete r[g], f = !0);
  }
  f && yt(t.attrs, "set", "");
}
function eo(t, e, n, s) {
  const [i, r] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let a in e) {
      if (un(a))
        continue;
      const f = e[a];
      let c;
      i && te(i, c = Rt(a)) ? !r || !r.includes(c) ? n[c] = f : (l || (l = {}))[c] = f : os(t.emitsOptions, a) || (!(a in s) || f !== s[a]) && (s[a] = f, o = !0);
    }
  if (r) {
    const a = ee(n), f = l || oe;
    for (let c = 0; c < r.length; c++) {
      const g = r[c];
      n[g] = Ds(
        i,
        a,
        g,
        f[g],
        t,
        !te(f, g)
      );
    }
  }
  return o;
}
function Ds(t, e, n, s, i, r) {
  const o = t[n];
  if (o != null) {
    const l = te(o, "default");
    if (l && s === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && U(a)) {
        const { propsDefaults: f } = i;
        if (n in f)
          s = f[n];
        else {
          const c = Sn(i);
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
    ] && (s === "" || s === qt(n)) && (s = !0));
  }
  return s;
}
const ua = /* @__PURE__ */ new WeakMap();
function to(t, e, n = !1) {
  const s = n ? ua : e.propsCache, i = s.get(t);
  if (i)
    return i;
  const r = t.props, o = {}, l = [];
  let a = !1;
  if (!U(t)) {
    const c = (g) => {
      a = !0;
      const [_, k] = to(g, e, !0);
      Te(o, _), k && l.push(...k);
    };
    !n && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  if (!r && !a)
    return he(t) && s.set(t, Gt), Gt;
  if (q(r))
    for (let c = 0; c < r.length; c++) {
      const g = Rt(r[c]);
      Li(g) && (o[g] = oe);
    }
  else if (r)
    for (const c in r) {
      const g = Rt(c);
      if (Li(g)) {
        const _ = r[c], k = o[g] = q(_) || U(_) ? { type: _ } : Te({}, _), P = k.type;
        let O = !1, j = !0;
        if (q(P))
          for (let H = 0; H < P.length; ++H) {
            const W = P[H], Y = U(W) && W.name;
            if (Y === "Boolean") {
              O = !0;
              break;
            } else Y === "String" && (j = !1);
          }
        else
          O = U(P) && P.name === "Boolean";
        k[
          0
          /* shouldCast */
        ] = O, k[
          1
          /* shouldCastTrue */
        ] = j, (O || te(k, "default")) && l.push(g);
      }
    }
  const f = [o, l];
  return he(t) && s.set(t, f), f;
}
function Li(t) {
  return t[0] !== "$" && !un(t);
}
const no = (t) => t[0] === "_" || t === "$stable", ui = (t) => q(t) ? t.map(at) : [at(t)], fa = (t, e, n) => {
  if (e._n)
    return e;
  const s = Fl((...i) => ui(e(...i)), n);
  return s._c = !1, s;
}, so = (t, e, n) => {
  const s = t._ctx;
  for (const i in t) {
    if (no(i)) continue;
    const r = t[i];
    if (U(r))
      e[i] = fa(i, r, s);
    else if (r != null) {
      const o = ui(r);
      e[i] = () => o;
    }
  }
}, io = (t, e) => {
  const n = ui(e);
  t.slots.default = () => n;
}, ro = (t, e, n) => {
  for (const s in e)
    (n || s !== "_") && (t[s] = e[s]);
}, ha = (t, e, n) => {
  const s = t.slots = Qr();
  if (t.vnode.shapeFlag & 32) {
    const i = e._;
    i ? (ro(s, e, n), n && _r(s, "_", i, !0)) : so(e, s);
  } else e && io(t, e);
}, pa = (t, e, n) => {
  const { vnode: s, slots: i } = t;
  let r = !0, o = oe;
  if (s.shapeFlag & 32) {
    const l = e._;
    l ? n && l === 1 ? r = !1 : ro(i, e, n) : (r = !e.$stable, so(e, i)), o = e;
  } else e && (io(t, e), o = { default: 1 });
  if (r)
    for (const l in i)
      !no(l) && o[l] == null && delete i[l];
}, De = Aa;
function da(t) {
  return ga(t);
}
function ga(t, e) {
  const n = ns();
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
    setScopeId: k = ct,
    insertStaticContent: P
  } = t, O = (h, p, m, w = null, x = null, v = null, E = void 0, R = null, A = !!p.dynamicChildren) => {
    if (h === p)
      return;
    h && !sn(h, p) && (w = tt(h), we(h, x, v, !0), h = null), p.patchFlag === -2 && (A = !1, p.dynamicChildren = null);
    const { type: S, ref: F, shapeFlag: C } = p;
    switch (S) {
      case ls:
        j(h, p, m, w);
        break;
      case Dt:
        H(h, p, m, w);
        break;
      case Fn:
        h == null && W(p, m, w, E);
        break;
      case lt:
        Xe(
          h,
          p,
          m,
          w,
          x,
          v,
          E,
          R,
          A
        );
        break;
      default:
        C & 1 ? D(
          h,
          p,
          m,
          w,
          x,
          v,
          E,
          R,
          A
        ) : C & 6 ? ye(
          h,
          p,
          m,
          w,
          x,
          v,
          E,
          R,
          A
        ) : (C & 64 || C & 128) && S.process(
          h,
          p,
          m,
          w,
          x,
          v,
          E,
          R,
          A,
          Fe
        );
    }
    F != null && x && Wn(F, h && h.ref, v, p || h, !p);
  }, j = (h, p, m, w) => {
    if (h == null)
      s(
        p.el = l(p.children),
        m,
        w
      );
    else {
      const x = p.el = h.el;
      p.children !== h.children && f(x, p.children);
    }
  }, H = (h, p, m, w) => {
    h == null ? s(
      p.el = a(p.children || ""),
      m,
      w
    ) : p.el = h.el;
  }, W = (h, p, m, w) => {
    [h.el, h.anchor] = P(
      h.children,
      p,
      m,
      w,
      h.el,
      h.anchor
    );
  }, Y = ({ el: h, anchor: p }, m, w) => {
    let x;
    for (; h && h !== p; )
      x = _(h), s(h, m, w), h = x;
    s(p, m, w);
  }, I = ({ el: h, anchor: p }) => {
    let m;
    for (; h && h !== p; )
      m = _(h), i(h), h = m;
    i(p);
  }, D = (h, p, m, w, x, v, E, R, A) => {
    p.type === "svg" ? E = "svg" : p.type === "math" && (E = "mathml"), h == null ? ue(
      p,
      m,
      w,
      x,
      v,
      E,
      R,
      A
    ) : wt(
      h,
      p,
      x,
      v,
      E,
      R,
      A
    );
  }, ue = (h, p, m, w, x, v, E, R) => {
    let A, S;
    const { props: F, shapeFlag: C, transition: L, dirs: $ } = h;
    if (A = h.el = o(
      h.type,
      v,
      F && F.is,
      F
    ), C & 8 ? c(A, h.children) : C & 16 && ae(
      h.children,
      A,
      null,
      w,
      x,
      bs(h, v),
      E,
      R
    ), $ && Bt(h, null, w, "created"), N(A, h, h.scopeId, E, w), F) {
      for (const ie in F)
        ie !== "value" && !un(ie) && r(A, ie, null, F[ie], v, w);
      "value" in F && r(A, "value", null, F.value, v), (S = F.onVnodeBeforeMount) && it(S, w, h);
    }
    $ && Bt(h, null, w, "beforeMount");
    const z = ma(x, L);
    z && L.beforeEnter(A), s(A, p, m), ((S = F && F.onVnodeMounted) || z || $) && De(() => {
      S && it(S, w, h), z && L.enter(A), $ && Bt(h, null, w, "mounted");
    }, x);
  }, N = (h, p, m, w, x) => {
    if (m && k(h, m), w)
      for (let v = 0; v < w.length; v++)
        k(h, w[v]);
    if (x) {
      let v = x.subTree;
      if (p === v || fo(v.type) && (v.ssContent === p || v.ssFallback === p)) {
        const E = x.vnode;
        N(
          h,
          E,
          E.scopeId,
          E.slotScopeIds,
          x.parent
        );
      }
    }
  }, ae = (h, p, m, w, x, v, E, R, A = 0) => {
    for (let S = A; S < h.length; S++) {
      const F = h[S] = R ? St(h[S]) : at(h[S]);
      O(
        null,
        F,
        p,
        m,
        w,
        x,
        v,
        E,
        R
      );
    }
  }, wt = (h, p, m, w, x, v, E) => {
    const R = p.el = h.el;
    let { patchFlag: A, dynamicChildren: S, dirs: F } = p;
    A |= h.patchFlag & 16;
    const C = h.props || oe, L = p.props || oe;
    let $;
    if (m && Lt(m, !1), ($ = L.onVnodeBeforeUpdate) && it($, m, p, h), F && Bt(p, h, m, "beforeUpdate"), m && Lt(m, !0), (C.innerHTML && L.innerHTML == null || C.textContent && L.textContent == null) && c(R, ""), S ? be(
      h.dynamicChildren,
      S,
      R,
      m,
      w,
      bs(p, x),
      v
    ) : E || K(
      h,
      p,
      R,
      null,
      m,
      w,
      bs(p, x),
      v,
      !1
    ), A > 0) {
      if (A & 16)
        Pe(R, C, L, m, x);
      else if (A & 2 && C.class !== L.class && r(R, "class", null, L.class, x), A & 4 && r(R, "style", C.style, L.style, x), A & 8) {
        const z = p.dynamicProps;
        for (let ie = 0; ie < z.length; ie++) {
          const J = z[ie], xe = C[J], fe = L[J];
          (fe !== xe || J === "value") && r(R, J, xe, fe, x, m);
        }
      }
      A & 1 && h.children !== p.children && c(R, p.children);
    } else !E && S == null && Pe(R, C, L, m, x);
    (($ = L.onVnodeUpdated) || F) && De(() => {
      $ && it($, m, p, h), F && Bt(p, h, m, "updated");
    }, w);
  }, be = (h, p, m, w, x, v, E) => {
    for (let R = 0; R < p.length; R++) {
      const A = h[R], S = p[R], F = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        A.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (A.type === lt || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !sn(A, S) || // - In the case of a component, it could contain anything.
        A.shapeFlag & 70) ? g(A.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      O(
        A,
        S,
        F,
        null,
        w,
        x,
        v,
        E,
        !0
      );
    }
  }, Pe = (h, p, m, w, x) => {
    if (p !== m) {
      if (p !== oe)
        for (const v in p)
          !un(v) && !(v in m) && r(
            h,
            v,
            p[v],
            null,
            x,
            w
          );
      for (const v in m) {
        if (un(v)) continue;
        const E = m[v], R = p[v];
        E !== R && v !== "value" && r(h, v, R, E, x, w);
      }
      "value" in m && r(h, "value", p.value, m.value, x);
    }
  }, Xe = (h, p, m, w, x, v, E, R, A) => {
    const S = p.el = h ? h.el : l(""), F = p.anchor = h ? h.anchor : l("");
    let { patchFlag: C, dynamicChildren: L, slotScopeIds: $ } = p;
    $ && (R = R ? R.concat($) : $), h == null ? (s(S, m, w), s(F, m, w), ae(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      m,
      F,
      x,
      v,
      E,
      R,
      A
    )) : C > 0 && C & 64 && L && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    h.dynamicChildren ? (be(
      h.dynamicChildren,
      L,
      m,
      x,
      v,
      E,
      R
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || x && p === x.subTree) && oo(
      h,
      p,
      !0
      /* shallow */
    )) : K(
      h,
      p,
      m,
      F,
      x,
      v,
      E,
      R,
      A
    );
  }, ye = (h, p, m, w, x, v, E, R, A) => {
    p.slotScopeIds = R, h == null ? p.shapeFlag & 512 ? x.ctx.activate(
      p,
      m,
      w,
      E,
      A
    ) : xt(
      p,
      m,
      w,
      x,
      v,
      E,
      A
    ) : Ze(h, p, A);
  }, xt = (h, p, m, w, x, v, E) => {
    const R = h.component = Fa(
      h,
      w,
      x
    );
    if (Vr(h) && (R.ctx.renderer = Fe), Ma(R, !1, E), R.asyncDep) {
      if (x && x.registerDep(R, ce, E), !h.el) {
        const A = R.subTree = ut(Dt);
        H(null, A, p, m);
      }
    } else
      ce(
        R,
        h,
        p,
        m,
        x,
        v,
        E
      );
  }, Ze = (h, p, m) => {
    const w = p.component = h.component;
    if (Ta(h, p, m))
      if (w.asyncDep && !w.asyncResolved) {
        X(w, p, m);
        return;
      } else
        w.next = p, w.update();
    else
      p.el = h.el, w.vnode = p;
  }, ce = (h, p, m, w, x, v, E) => {
    const R = () => {
      if (h.isMounted) {
        let { next: C, bu: L, u: $, parent: z, vnode: ie } = h;
        {
          const u = lo(h);
          if (u) {
            C && (C.el = ie.el, X(h, C, E)), u.asyncDep.then(() => {
              h.isUnmounted || R();
            });
            return;
          }
        }
        let J = C, xe;
        Lt(h, !1), C ? (C.el = ie.el, X(h, C, E)) : C = ie, L && Bn(L), (xe = C.props && C.props.onVnodeBeforeUpdate) && it(xe, z, C, ie), Lt(h, !0);
        const fe = Fi(h), Me = h.subTree;
        h.subTree = fe, O(
          Me,
          fe,
          // parent may have changed if it's in a teleport
          g(Me.el),
          // anchor may have changed if it's in a fragment
          tt(Me),
          h,
          x,
          v
        ), C.el = fe.el, J === null && Ea(h, fe.el), $ && De($, x), (xe = C.props && C.props.onVnodeUpdated) && De(
          () => it(xe, z, C, ie),
          x
        );
      } else {
        let C;
        const { el: L, props: $ } = p, { bm: z, m: ie, parent: J, root: xe, type: fe } = h, Me = pn(p);
        Lt(h, !1), z && Bn(z), !Me && (C = $ && $.onVnodeBeforeMount) && it(C, J, p), Lt(h, !0);
        {
          xe.ce && xe.ce._injectChildStyle(fe);
          const u = h.subTree = Fi(h);
          O(
            null,
            u,
            m,
            w,
            h,
            x,
            v
          ), p.el = u.el;
        }
        if (ie && De(ie, x), !Me && (C = $ && $.onVnodeMounted)) {
          const u = p;
          De(
            () => it(C, J, u),
            x
          );
        }
        (p.shapeFlag & 256 || J && pn(J.vnode) && J.vnode.shapeFlag & 256) && h.a && De(h.a, x), h.isMounted = !0, p = m = w = null;
      }
    };
    h.scope.on();
    const A = h.effect = new kr(R);
    h.scope.off();
    const S = h.update = A.run.bind(A), F = h.job = A.runIfDirty.bind(A);
    F.i = h, F.id = h.uid, A.scheduler = () => li(F), Lt(h, !0), S();
  }, X = (h, p, m) => {
    p.component = h;
    const w = h.vnode.props;
    h.vnode = p, h.next = null, ca(h, p.props, w, m), pa(h, p.children, m), Ot(), Ri(h), It();
  }, K = (h, p, m, w, x, v, E, R, A = !1) => {
    const S = h && h.children, F = h ? h.shapeFlag : 0, C = p.children, { patchFlag: L, shapeFlag: $ } = p;
    if (L > 0) {
      if (L & 128) {
        dt(
          S,
          C,
          m,
          w,
          x,
          v,
          E,
          R,
          A
        );
        return;
      } else if (L & 256) {
        je(
          S,
          C,
          m,
          w,
          x,
          v,
          E,
          R,
          A
        );
        return;
      }
    }
    $ & 8 ? (F & 16 && et(S, x, v), C !== S && c(m, C)) : F & 16 ? $ & 16 ? dt(
      S,
      C,
      m,
      w,
      x,
      v,
      E,
      R,
      A
    ) : et(S, x, v, !0) : (F & 8 && c(m, ""), $ & 16 && ae(
      C,
      m,
      w,
      x,
      v,
      E,
      R,
      A
    ));
  }, je = (h, p, m, w, x, v, E, R, A) => {
    h = h || Gt, p = p || Gt;
    const S = h.length, F = p.length, C = Math.min(S, F);
    let L;
    for (L = 0; L < C; L++) {
      const $ = p[L] = A ? St(p[L]) : at(p[L]);
      O(
        h[L],
        $,
        m,
        null,
        x,
        v,
        E,
        R,
        A
      );
    }
    S > F ? et(
      h,
      x,
      v,
      !0,
      !1,
      C
    ) : ae(
      p,
      m,
      w,
      x,
      v,
      E,
      R,
      A,
      C
    );
  }, dt = (h, p, m, w, x, v, E, R, A) => {
    let S = 0;
    const F = p.length;
    let C = h.length - 1, L = F - 1;
    for (; S <= C && S <= L; ) {
      const $ = h[S], z = p[S] = A ? St(p[S]) : at(p[S]);
      if (sn($, z))
        O(
          $,
          z,
          m,
          null,
          x,
          v,
          E,
          R,
          A
        );
      else
        break;
      S++;
    }
    for (; S <= C && S <= L; ) {
      const $ = h[C], z = p[L] = A ? St(p[L]) : at(p[L]);
      if (sn($, z))
        O(
          $,
          z,
          m,
          null,
          x,
          v,
          E,
          R,
          A
        );
      else
        break;
      C--, L--;
    }
    if (S > C) {
      if (S <= L) {
        const $ = L + 1, z = $ < F ? p[$].el : w;
        for (; S <= L; )
          O(
            null,
            p[S] = A ? St(p[S]) : at(p[S]),
            m,
            z,
            x,
            v,
            E,
            R,
            A
          ), S++;
      }
    } else if (S > L)
      for (; S <= C; )
        we(h[S], x, v, !0), S++;
    else {
      const $ = S, z = S, ie = /* @__PURE__ */ new Map();
      for (S = z; S <= L; S++) {
        const y = p[S] = A ? St(p[S]) : at(p[S]);
        y.key != null && ie.set(y.key, S);
      }
      let J, xe = 0;
      const fe = L - z + 1;
      let Me = !1, u = 0;
      const d = new Array(fe);
      for (S = 0; S < fe; S++) d[S] = 0;
      for (S = $; S <= C; S++) {
        const y = h[S];
        if (xe >= fe) {
          we(y, x, v, !0);
          continue;
        }
        let T;
        if (y.key != null)
          T = ie.get(y.key);
        else
          for (J = z; J <= L; J++)
            if (d[J - z] === 0 && sn(y, p[J])) {
              T = J;
              break;
            }
        T === void 0 ? we(y, x, v, !0) : (d[T - z] = S + 1, T >= u ? u = T : Me = !0, O(
          y,
          p[T],
          m,
          null,
          x,
          v,
          E,
          R,
          A
        ), xe++);
      }
      const b = Me ? ya(d) : Gt;
      for (J = b.length - 1, S = fe - 1; S >= 0; S--) {
        const y = z + S, T = p[y], B = y + 1 < F ? p[y + 1].el : w;
        d[S] === 0 ? O(
          null,
          T,
          m,
          B,
          x,
          v,
          E,
          R,
          A
        ) : Me && (J < 0 || S !== b[J] ? Be(T, m, B, 2) : J--);
      }
    }
  }, Be = (h, p, m, w, x = null) => {
    const { el: v, type: E, transition: R, children: A, shapeFlag: S } = h;
    if (S & 6) {
      Be(h.component.subTree, p, m, w);
      return;
    }
    if (S & 128) {
      h.suspense.move(p, m, w);
      return;
    }
    if (S & 64) {
      E.move(h, p, m, Fe);
      return;
    }
    if (E === lt) {
      s(v, p, m);
      for (let C = 0; C < A.length; C++)
        Be(A[C], p, m, w);
      s(h.anchor, p, m);
      return;
    }
    if (E === Fn) {
      Y(h, p, m);
      return;
    }
    if (w !== 2 && S & 1 && R)
      if (w === 0)
        R.beforeEnter(v), s(v, p, m), De(() => R.enter(v), x);
      else {
        const { leave: C, delayLeave: L, afterLeave: $ } = R, z = () => s(v, p, m), ie = () => {
          C(v, () => {
            z(), $ && $();
          });
        };
        L ? L(v, z, ie) : ie();
      }
    else
      s(v, p, m);
  }, we = (h, p, m, w = !1, x = !1) => {
    const {
      type: v,
      props: E,
      ref: R,
      children: A,
      dynamicChildren: S,
      shapeFlag: F,
      patchFlag: C,
      dirs: L,
      cacheIndex: $
    } = h;
    if (C === -2 && (x = !1), R != null && Wn(R, null, m, h, !0), $ != null && (p.renderCache[$] = void 0), F & 256) {
      p.ctx.deactivate(h);
      return;
    }
    const z = F & 1 && L, ie = !pn(h);
    let J;
    if (ie && (J = E && E.onVnodeBeforeUnmount) && it(J, p, h), F & 6)
      Ht(h.component, m, w);
    else {
      if (F & 128) {
        h.suspense.unmount(m, w);
        return;
      }
      z && Bt(h, null, p, "beforeUnmount"), F & 64 ? h.type.remove(
        h,
        p,
        m,
        Fe,
        w
      ) : S && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !S.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (v !== lt || C > 0 && C & 64) ? et(
        S,
        p,
        m,
        !1,
        !0
      ) : (v === lt && C & 384 || !x && F & 16) && et(A, p, m), w && Pt(h);
    }
    (ie && (J = E && E.onVnodeUnmounted) || z) && De(() => {
      J && it(J, p, h), z && Bt(h, null, p, "unmounted");
    }, m);
  }, Pt = (h) => {
    const { type: p, el: m, anchor: w, transition: x } = h;
    if (p === lt) {
      jt(m, w);
      return;
    }
    if (p === Fn) {
      I(h);
      return;
    }
    const v = () => {
      i(m), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (h.shapeFlag & 1 && x && !x.persisted) {
      const { leave: E, delayLeave: R } = x, A = () => E(m, v);
      R ? R(h.el, v, A) : A();
    } else
      v();
  }, jt = (h, p) => {
    let m;
    for (; h !== p; )
      m = _(h), i(h), h = m;
    i(p);
  }, Ht = (h, p, m) => {
    const { bum: w, scope: x, job: v, subTree: E, um: R, m: A, a: S } = h;
    Ni(A), Ni(S), w && Bn(w), x.stop(), v && (v.flags |= 8, we(E, h, p, m)), R && De(R, p), De(() => {
      h.isUnmounted = !0;
    }, p), p && p.pendingBranch && !p.isUnmounted && h.asyncDep && !h.asyncResolved && h.suspenseId === p.pendingId && (p.deps--, p.deps === 0 && p.resolve());
  }, et = (h, p, m, w = !1, x = !1, v = 0) => {
    for (let E = v; E < h.length; E++)
      we(h[E], p, m, w, x);
  }, tt = (h) => {
    if (h.shapeFlag & 6)
      return tt(h.component.subTree);
    if (h.shapeFlag & 128)
      return h.suspense.next();
    const p = _(h.anchor || h.el), m = p && p[Ml];
    return m ? _(m) : p;
  };
  let Ne = !1;
  const nt = (h, p, m) => {
    h == null ? p._vnode && we(p._vnode, null, null, !0) : O(
      p._vnode || null,
      h,
      p,
      null,
      null,
      null,
      m
    ), p._vnode = h, Ne || (Ne = !0, Ri(), Ur(), Ne = !1);
  }, Fe = {
    p: O,
    um: we,
    m: Be,
    r: Pt,
    mt: xt,
    mc: ae,
    pc: K,
    pbc: be,
    n: tt,
    o: t
  };
  return {
    render: nt,
    hydrate: void 0,
    createApp: oa(nt)
  };
}
function bs({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function Lt({ effect: t, job: e }, n) {
  n ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function ma(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function oo(t, e, n = !1) {
  const s = t.children, i = e.children;
  if (q(s) && q(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      let l = i[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[r] = St(i[r]), l.el = o.el), !n && l.patchFlag !== -2 && oo(o, l)), l.type === ls && (l.el = o.el);
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
function lo(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : lo(e);
}
function Ni(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
const _a = Symbol.for("v-scx"), ba = () => Ln(_a);
function Nn(t, e, n) {
  return ao(t, e, n);
}
function ao(t, e, n = oe) {
  const { immediate: s, deep: i, flush: r, once: o } = n, l = Te({}, n), a = e && s || !e && r !== "post";
  let f;
  if (kn) {
    if (r === "sync") {
      const k = ba();
      f = k.__watcherHandles || (k.__watcherHandles = []);
    } else if (!a) {
      const k = () => {
      };
      return k.stop = ct, k.resume = ct, k.pause = ct, k;
    }
  }
  const c = Oe;
  l.call = (k, P, O) => ht(k, c, P, O);
  let g = !1;
  r === "post" ? l.scheduler = (k) => {
    De(k, c && c.suspense);
  } : r !== "sync" && (g = !0, l.scheduler = (k, P) => {
    P ? k() : li(k);
  }), l.augmentJob = (k) => {
    e && (k.flags |= 4), g && (k.flags |= 2, c && (k.id = c.uid, k.i = c));
  };
  const _ = Pl(t, e, l);
  return kn && (f ? f.push(_) : a && _()), _;
}
function wa(t, e, n) {
  const s = this.proxy, i = me(t) ? t.includes(".") ? co(s, t) : () => s[t] : t.bind(s, s);
  let r;
  U(e) ? r = e : (r = e.handler, n = e);
  const o = Sn(this), l = ao(i, r.bind(s), n);
  return o(), l;
}
function co(t, e) {
  const n = e.split(".");
  return () => {
    let s = t;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
const xa = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${Rt(e)}Modifiers`] || t[`${qt(e)}Modifiers`];
function ka(t, e, ...n) {
  if (t.isUnmounted) return;
  const s = t.vnode.props || oe;
  let i = n;
  const r = e.startsWith("update:"), o = r && xa(s, e.slice(7));
  o && (o.trim && (i = n.map((c) => me(c) ? c.trim() : c)), o.number && (i = n.map(Rs)));
  let l, a = s[l = ps(e)] || // also try camelCase event handler (#2249)
  s[l = ps(Rt(e))];
  !a && r && (a = s[l = ps(qt(e))]), a && ht(
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
    t.emitted[l] = !0, ht(
      f,
      t,
      6,
      i
    );
  }
}
function uo(t, e, n = !1) {
  const s = e.emitsCache, i = s.get(t);
  if (i !== void 0)
    return i;
  const r = t.emits;
  let o = {}, l = !1;
  if (!U(t)) {
    const a = (f) => {
      const c = uo(f, e, !0);
      c && (l = !0, Te(o, c));
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  return !r && !l ? (he(t) && s.set(t, null), null) : (q(r) ? r.forEach((a) => o[a] = null) : Te(o, r), he(t) && s.set(t, o), o);
}
function os(t, e) {
  return !t || !Xn(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), te(t, e[0].toLowerCase() + e.slice(1)) || te(t, qt(e)) || te(t, e));
}
function Fi(t) {
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
    ctx: P,
    inheritAttrs: O
  } = t, j = Vn(t);
  let H, W;
  try {
    if (n.shapeFlag & 4) {
      const I = i || s, D = I;
      H = at(
        f.call(
          D,
          I,
          c,
          g,
          k,
          _,
          P
        )
      ), W = l;
    } else {
      const I = e;
      H = at(
        I.length > 1 ? I(
          g,
          { attrs: l, slots: o, emit: a }
        ) : I(
          g,
          null
        )
      ), W = e.props ? l : va(l);
    }
  } catch (I) {
    gn.length = 0, is(I, t, 1), H = ut(Dt);
  }
  let Y = H;
  if (W && O !== !1) {
    const I = Object.keys(W), { shapeFlag: D } = Y;
    I.length && D & 7 && (r && I.some(Ys) && (W = Sa(
      W,
      r
    )), Y = Xt(Y, W, !1, !0));
  }
  return n.dirs && (Y = Xt(Y, null, !1, !0), Y.dirs = Y.dirs ? Y.dirs.concat(n.dirs) : n.dirs), n.transition && ai(Y, n.transition), H = Y, Vn(j), H;
}
const va = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || Xn(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, Sa = (t, e) => {
  const n = {};
  for (const s in t)
    (!Ys(s) || !(s.slice(9) in e)) && (n[s] = t[s]);
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
      return s ? Mi(s, o, f) : !!o;
    if (a & 8) {
      const c = e.dynamicProps;
      for (let g = 0; g < c.length; g++) {
        const _ = c[g];
        if (o[_] !== s[_] && !os(f, _))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? Mi(s, o, f) : !0 : !!o;
  return !1;
}
function Mi(t, e, n) {
  const s = Object.keys(e);
  if (s.length !== Object.keys(t).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (e[r] !== t[r] && !os(n, r))
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
const fo = (t) => t.__isSuspense;
function Aa(t, e) {
  e && e.pendingBranch ? q(t) ? e.effects.push(...t) : e.effects.push(t) : Nl(t);
}
const lt = Symbol.for("v-fgt"), ls = Symbol.for("v-txt"), Dt = Symbol.for("v-cmt"), Fn = Symbol.for("v-stc"), gn = [];
let Ue = null;
function Re(t = !1) {
  gn.push(Ue = t ? null : []);
}
function Ra() {
  gn.pop(), Ue = gn[gn.length - 1] || null;
}
let xn = 1;
function Di(t, e = !1) {
  xn += t, t < 0 && Ue && e && (Ue.hasOnce = !0);
}
function ho(t) {
  return t.dynamicChildren = xn > 0 ? Ue || Gt : null, Ra(), xn > 0 && Ue && Ue.push(t), t;
}
function Le(t, e, n, s, i, r) {
  return ho(
    G(
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
  return ho(
    ut(
      t,
      e,
      n,
      s,
      i,
      !0
    )
  );
}
function po(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function sn(t, e) {
  return t.type === e.type && t.key === e.key;
}
const go = ({ key: t }) => t ?? null, Mn = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? me(t) || Se(t) || U(t) ? { i: Ve, r: t, k: e, f: !!n } : t : null);
function G(t, e = null, n = null, s = 0, i = null, r = t === lt ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && go(e),
    ref: e && Mn(e),
    scopeId: Hr,
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
    ctx: Ve
  };
  return l ? (fi(a, n), r & 128 && t.normalize(a)) : n && (a.shapeFlag |= me(n) ? 8 : 16), xn > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Ue && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Ue.push(a), a;
}
const ut = Oa;
function Oa(t, e = null, n = null, s = 0, i = null, r = !1) {
  if ((!t || t === Jl) && (t = Dt), po(t)) {
    const l = Xt(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && fi(l, n), xn > 0 && !r && Ue && (l.shapeFlag & 6 ? Ue[Ue.indexOf(t)] = l : Ue.push(l)), l.patchFlag = -2, l;
  }
  if (Ua(t) && (t = t.__vccOpts), e) {
    e = Ia(e);
    let { class: l, style: a } = e;
    l && !me(l) && (e.class = Tt(l)), he(a) && (oi(a) && !q(a) && (a = Te({}, a)), e.style = $e(a));
  }
  const o = me(t) ? 1 : fo(t) ? 128 : Dl(t) ? 64 : he(t) ? 4 : U(t) ? 2 : 0;
  return G(
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
  return t ? oi(t) || Xr(t) ? Te({}, t) : t : null;
}
function Xt(t, e, n = !1, s = !1) {
  const { props: i, ref: r, patchFlag: o, children: l, transition: a } = t, f = e ? Ba(i || {}, e) : i, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: f,
    key: f && go(f),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? q(r) ? r.concat(Mn(e)) : [r, Mn(e)] : Mn(e)
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
    patchFlag: e && t.type !== lt ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: t.ssContent && Xt(t.ssContent),
    ssFallback: t.ssFallback && Xt(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return a && s && ai(
    c,
    a.clone(c)
  ), c;
}
function $s(t = " ", e = 0) {
  return ut(ls, null, t, e);
}
function Pa(t, e) {
  const n = ut(Fn, null, t);
  return n.staticCount = e, n;
}
function st(t = "", e = !1) {
  return e ? (Re(), Ca(Dt, null, t)) : ut(Dt, null, t);
}
function at(t) {
  return t == null || typeof t == "boolean" ? ut(Dt) : q(t) ? ut(
    lt,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : po(t) ? St(t) : ut(ls, null, String(t));
}
function St(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : Xt(t);
}
function fi(t, e) {
  let n = 0;
  const { shapeFlag: s } = t;
  if (e == null)
    e = null;
  else if (q(e))
    n = 16;
  else if (typeof e == "object")
    if (s & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), fi(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !Xr(e) ? e._ctx = Ve : i === 3 && Ve && (Ve.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else U(e) ? (e = { default: e, _ctx: Ve }, n = 32) : (e = String(e), s & 64 ? (n = 16, e = [$s(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function Ba(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    for (const i in s)
      if (i === "class")
        e.class !== s.class && (e.class = Tt([e.class, s.class]));
      else if (i === "style")
        e.style = $e([e.style, s.style]);
      else if (Xn(i)) {
        const r = e[i], o = s[i];
        o && r !== o && !(q(r) && r.includes(o)) && (e[i] = r ? [].concat(r, o) : o);
      } else i !== "" && (e[i] = s[i]);
  }
  return e;
}
function it(t, e, n, s = null) {
  ht(t, e, 7, [
    n,
    s
  ]);
}
const La = Yr();
let Na = 0;
function Fa(t, e, n) {
  const s = t.type, i = (e ? e.appContext : t.appContext) || La, r = {
    uid: Na++,
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
    scope: new sl(
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
    propsOptions: to(s, i),
    emitsOptions: uo(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: oe,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: oe,
    data: oe,
    props: oe,
    attrs: oe,
    slots: oe,
    refs: oe,
    setupState: oe,
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
  return r.ctx = { _: r }, r.root = e ? e.root : r, r.emit = ka.bind(null, r), t.ce && t.ce(r), r;
}
let Oe = null, Gn, qs;
{
  const t = ns(), e = (n, s) => {
    let i;
    return (i = t[n]) || (i = t[n] = []), i.push(s), (r) => {
      i.length > 1 ? i.forEach((o) => o(r)) : i[0](r);
    };
  };
  Gn = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Oe = n
  ), qs = e(
    "__VUE_SSR_SETTERS__",
    (n) => kn = n
  );
}
const Sn = (t) => {
  const e = Oe;
  return Gn(t), t.scope.on(), () => {
    t.scope.off(), Gn(e);
  };
}, $i = () => {
  Oe && Oe.scope.off(), Gn(null);
};
function mo(t) {
  return t.vnode.shapeFlag & 4;
}
let kn = !1;
function Ma(t, e = !1, n = !1) {
  e && qs(e);
  const { props: s, children: i } = t.vnode, r = mo(t);
  aa(t, s, r, e), ha(t, i, n);
  const o = r ? Da(t, e) : void 0;
  return e && qs(!1), o;
}
function Da(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, Xl);
  const { setup: s } = n;
  if (s) {
    Ot();
    const i = t.setupContext = s.length > 1 ? qa(t) : null, r = Sn(t), o = vn(
      s,
      t,
      0,
      [
        t.props,
        i
      ]
    ), l = dr(o);
    if (It(), r(), (l || t.sp) && !pn(t) && zr(t), l) {
      if (o.then($i, $i), e)
        return o.then((a) => {
          qi(t, a);
        }).catch((a) => {
          is(a, t, 0);
        });
      t.asyncDep = o;
    } else
      qi(t, o);
  } else
    yo(t);
}
function qi(t, e, n) {
  U(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : he(e) && (t.setupState = Mr(e)), yo(t);
}
function yo(t, e, n) {
  const s = t.type;
  t.render || (t.render = s.render || ct);
  {
    const i = Sn(t);
    Ot();
    try {
      ea(t);
    } finally {
      It(), i();
    }
  }
}
const $a = {
  get(t, e) {
    return ke(t, "get", ""), t[e];
  }
};
function qa(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    attrs: new Proxy(t.attrs, $a),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function as(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(Mr(Sl(t.exposed)), {
    get(e, n) {
      if (n in e)
        return e[n];
      if (n in dn)
        return dn[n](t);
    },
    has(e, n) {
      return n in e || n in dn;
    }
  })) : t.proxy;
}
function Ua(t) {
  return U(t) && "__vccOpts" in t;
}
const He = (t, e) => Ol(t, e, kn), ja = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Us;
const Ui = typeof window < "u" && window.trustedTypes;
if (Ui)
  try {
    Us = /* @__PURE__ */ Ui.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const _o = Us ? (t) => Us.createHTML(t) : (t) => t, Ha = "http://www.w3.org/2000/svg", za = "http://www.w3.org/1998/Math/MathML", mt = typeof document < "u" ? document : null, ji = mt && /* @__PURE__ */ mt.createElement("template"), Va = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, s) => {
    const i = e === "svg" ? mt.createElementNS(Ha, t) : e === "mathml" ? mt.createElementNS(za, t) : n ? mt.createElement(t, { is: n }) : mt.createElement(t);
    return t === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (t) => mt.createTextNode(t),
  createComment: (t) => mt.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => mt.querySelector(t),
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
      ji.innerHTML = _o(
        s === "svg" ? `<svg>${t}</svg>` : s === "mathml" ? `<math>${t}</math>` : t
      );
      const l = ji.content;
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
const Hi = Symbol("_vod"), Ga = Symbol("_vsh"), Za = Symbol(""), Ya = /(^|;)\s*display\s*:/;
function Ja(t, e, n) {
  const s = t.style, i = me(n);
  let r = !1;
  if (n && !i) {
    if (e)
      if (me(e))
        for (const o of e.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && Dn(s, l, "");
        }
      else
        for (const o in e)
          n[o] == null && Dn(s, o, "");
    for (const o in n)
      o === "display" && (r = !0), Dn(s, o, n[o]);
  } else if (i) {
    if (e !== n) {
      const o = s[Za];
      o && (n += ";" + o), s.cssText = n, r = Ya.test(n);
    }
  } else e && t.removeAttribute("style");
  Hi in t && (t[Hi] = r ? s.display : "", t[Ga] && (s.display = "none"));
}
const zi = /\s*!important$/;
function Dn(t, e, n) {
  if (q(n))
    n.forEach((s) => Dn(t, e, s));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const s = Qa(t, e);
    zi.test(n) ? t.setProperty(
      qt(s),
      n.replace(zi, ""),
      "important"
    ) : t[s] = n;
  }
}
const Vi = ["Webkit", "Moz", "ms"], ws = {};
function Qa(t, e) {
  const n = ws[e];
  if (n)
    return n;
  let s = Rt(e);
  if (s !== "filter" && s in t)
    return ws[e] = s;
  s = yr(s);
  for (let i = 0; i < Vi.length; i++) {
    const r = Vi[i] + s;
    if (r in t)
      return ws[e] = r;
  }
  return e;
}
const Wi = "http://www.w3.org/1999/xlink";
function Ki(t, e, n, s, i, r = nl(e)) {
  s && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(Wi, e.slice(6, e.length)) : t.setAttributeNS(Wi, e, n) : n == null || r && !br(n) ? t.removeAttribute(e) : t.setAttribute(
    e,
    r ? "" : Ct(n) ? String(n) : n
  );
}
function Gi(t, e, n, s, i) {
  if (e === "innerHTML" || e === "textContent") {
    n != null && (t[e] = e === "innerHTML" ? _o(n) : n);
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
    l === "boolean" ? n = br(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  o && t.removeAttribute(i || e);
}
function Kt(t, e, n, s) {
  t.addEventListener(e, n, s);
}
function Xa(t, e, n, s) {
  t.removeEventListener(e, n, s);
}
const Zi = Symbol("_vei");
function ec(t, e, n, s, i = null) {
  const r = t[Zi] || (t[Zi] = {}), o = r[e];
  if (s && o)
    o.value = s;
  else {
    const [l, a] = tc(e);
    if (s) {
      const f = r[e] = ic(
        s,
        i
      );
      Kt(t, l, f, a);
    } else o && (Xa(t, l, o, a), r[e] = void 0);
  }
}
const Yi = /(?:Once|Passive|Capture)$/;
function tc(t) {
  let e;
  if (Yi.test(t)) {
    e = {};
    let s;
    for (; s = t.match(Yi); )
      t = t.slice(0, t.length - s[0].length), e[s[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : qt(t.slice(2)), e];
}
let xs = 0;
const nc = /* @__PURE__ */ Promise.resolve(), sc = () => xs || (nc.then(() => xs = 0), xs = Date.now());
function ic(t, e) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    ht(
      rc(s, n.value),
      e,
      5,
      [s]
    );
  };
  return n.value = t, n.attached = sc(), n;
}
function rc(t, e) {
  if (q(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map(
      (s) => (i) => !i._stopped && s && s(i)
    );
  } else
    return e;
}
const Ji = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, oc = (t, e, n, s, i, r) => {
  const o = i === "svg";
  e === "class" ? Ka(t, s, o) : e === "style" ? Ja(t, n, s) : Xn(e) ? Ys(e) || ec(t, e, n, s, r) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : lc(t, e, s, o)) ? (Gi(t, e, s), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && Ki(t, e, s, o, r, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && (/[A-Z]/.test(e) || !me(s)) ? Gi(t, Rt(e), s, r, e) : (e === "true-value" ? t._trueValue = s : e === "false-value" && (t._falseValue = s), Ki(t, e, s, o));
};
function lc(t, e, n, s) {
  if (s)
    return !!(e === "innerHTML" || e === "textContent" || e in t && Ji(e) && U(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Ji(e) && me(n) ? !1 : e in t;
}
const Qi = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return q(e) ? (n) => Bn(e, n) : e;
};
function ac(t) {
  t.target.composing = !0;
}
function Xi(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const ks = Symbol("_assign"), er = {
  created(t, { modifiers: { lazy: e, trim: n, number: s } }, i) {
    t[ks] = Qi(i);
    const r = s || i.props && i.props.type === "number";
    Kt(t, e ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let l = t.value;
      n && (l = l.trim()), r && (l = Rs(l)), t[ks](l);
    }), n && Kt(t, "change", () => {
      t.value = t.value.trim();
    }), e || (Kt(t, "compositionstart", ac), Kt(t, "compositionend", Xi), Kt(t, "change", Xi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: n, modifiers: { lazy: s, trim: i, number: r } }, o) {
    if (t[ks] = Qi(o), t.composing) return;
    const l = (r || t.type === "number") && !/^0\d/.test(t.value) ? Rs(t.value) : t.value, a = e ?? "";
    l !== a && (document.activeElement === t && t.type !== "range" && (s && e === n || i && t.value.trim() === a) || (t.value = a));
  }
}, cc = /* @__PURE__ */ Te({ patchProp: oc }, Va);
let tr;
function uc() {
  return tr || (tr = da(cc));
}
const fc = (...t) => {
  const e = uc().createApp(...t), { mount: n } = e;
  return e.mount = (s) => {
    const i = pc(s);
    if (!i) return;
    const r = e._component;
    !U(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
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
function pc(t) {
  return me(t) ? document.querySelector(t) : t;
}
const kt = (t) => {
  const e = t.replace("#", ""), n = parseInt(e.substr(0, 2), 16), s = parseInt(e.substr(2, 2), 16), i = parseInt(e.substr(4, 2), 16);
  return (n * 299 + s * 587 + i * 114) / 1e3 < 128;
}, dc = (t, e) => {
  const n = t.replace("#", ""), s = parseInt(n.substr(0, 2), 16), i = parseInt(n.substr(2, 2), 16), r = parseInt(n.substr(4, 2), 16), o = kt(t), l = o ? Math.min(255, s + e) : Math.max(0, s - e), a = o ? Math.min(255, i + e) : Math.max(0, i - e), f = o ? Math.min(255, r + e) : Math.max(0, r - e);
  return `#${l.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}${f.toString(16).padStart(2, "0")}`;
}, vs = (t) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t), gc = (t) => {
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
function hi() {
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
let Ut = hi();
function bo(t) {
  Ut = t;
}
const mn = { exec: () => null };
function se(t, e = "") {
  let n = typeof t == "string" ? t : t.source;
  const s = {
    replace: (i, r) => {
      let o = typeof r == "string" ? r : r.source;
      return o = o.replace(Ie.caret, "$1"), n = n.replace(i, o), s;
    },
    getRegex: () => new RegExp(n, e)
  };
  return s;
}
const Ie = {
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
}, mc = /^(?:[ \t]*(?:\n|$))+/, yc = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, _c = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Tn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, bc = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, wo = /(?:[*+-]|\d{1,9}[.)])/, xo = se(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, wo).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), pi = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, wc = /^[^\n]+/, di = /(?!\s*\])(?:\\.|[^\[\]\\])+/, xc = se(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", di).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), kc = se(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, wo).getRegex(), cs = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", gi = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, vc = se("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", gi).replace("tag", cs).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ko = se(pi).replace("hr", Tn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", cs).getRegex(), Sc = se(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ko).getRegex(), mi = {
  blockquote: Sc,
  code: yc,
  def: xc,
  fences: _c,
  heading: bc,
  hr: Tn,
  html: vc,
  lheading: xo,
  list: kc,
  newline: mc,
  paragraph: ko,
  table: mn,
  text: wc
}, nr = se("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Tn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", cs).getRegex(), Tc = {
  ...mi,
  table: nr,
  paragraph: se(pi).replace("hr", Tn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", nr).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", cs).getRegex()
}, Ec = {
  ...mi,
  html: se(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", gi).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: mn,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: se(pi).replace("hr", Tn).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", xo).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Ac = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Rc = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, vo = /^( {2,}|\\)\n(?!\s*$)/, Cc = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, us = /[\p{P}\p{S}]/u, yi = /[\s\p{P}\p{S}]/u, So = /[^\s\p{P}\p{S}]/u, Oc = se(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, yi).getRegex(), To = /(?!~)[\p{P}\p{S}]/u, Ic = /(?!~)[\s\p{P}\p{S}]/u, Pc = /(?:[^\s\p{P}\p{S}]|~)/u, Bc = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, Eo = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Lc = se(Eo, "u").replace(/punct/g, us).getRegex(), Nc = se(Eo, "u").replace(/punct/g, To).getRegex(), Ao = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Fc = se(Ao, "gu").replace(/notPunctSpace/g, So).replace(/punctSpace/g, yi).replace(/punct/g, us).getRegex(), Mc = se(Ao, "gu").replace(/notPunctSpace/g, Pc).replace(/punctSpace/g, Ic).replace(/punct/g, To).getRegex(), Dc = se("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, So).replace(/punctSpace/g, yi).replace(/punct/g, us).getRegex(), $c = se(/\\(punct)/, "gu").replace(/punct/g, us).getRegex(), qc = se(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Uc = se(gi).replace("(?:-->|$)", "-->").getRegex(), jc = se("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Uc).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Zn = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, Hc = se(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", Zn).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Ro = se(/^!?\[(label)\]\[(ref)\]/).replace("label", Zn).replace("ref", di).getRegex(), Co = se(/^!?\[(ref)\](?:\[\])?/).replace("ref", di).getRegex(), zc = se("reflink|nolink(?!\\()", "g").replace("reflink", Ro).replace("nolink", Co).getRegex(), _i = {
  _backpedal: mn,
  // only used for GFM url
  anyPunctuation: $c,
  autolink: qc,
  blockSkip: Bc,
  br: vo,
  code: Rc,
  del: mn,
  emStrongLDelim: Lc,
  emStrongRDelimAst: Fc,
  emStrongRDelimUnd: Dc,
  escape: Ac,
  link: Hc,
  nolink: Co,
  punctuation: Oc,
  reflink: Ro,
  reflinkSearch: zc,
  tag: jc,
  text: Cc,
  url: mn
}, Vc = {
  ..._i,
  link: se(/^!?\[(label)\]\((.*?)\)/).replace("label", Zn).getRegex(),
  reflink: se(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Zn).getRegex()
}, js = {
  ..._i,
  emStrongRDelimAst: Mc,
  emStrongLDelim: Nc,
  url: se(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Wc = {
  ...js,
  br: se(vo).replace("{2,}", "*").getRegex(),
  text: se(js.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Cn = {
  normal: mi,
  gfm: Tc,
  pedantic: Ec
}, rn = {
  normal: _i,
  gfm: js,
  breaks: Wc,
  pedantic: Vc
}, Kc = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, sr = (t) => Kc[t];
function rt(t, e) {
  if (e) {
    if (Ie.escapeTest.test(t))
      return t.replace(Ie.escapeReplace, sr);
  } else if (Ie.escapeTestNoEncode.test(t))
    return t.replace(Ie.escapeReplaceNoEncode, sr);
  return t;
}
function ir(t) {
  try {
    t = encodeURI(t).replace(Ie.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function rr(t, e) {
  var r;
  const n = t.replace(Ie.findPipe, (o, l, a) => {
    let f = !1, c = l;
    for (; --c >= 0 && a[c] === "\\"; )
      f = !f;
    return f ? "|" : " |";
  }), s = n.split(Ie.splitPipe);
  let i = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((r = s.at(-1)) != null && r.trim()) && s.pop(), e)
    if (s.length > e)
      s.splice(e);
    else
      for (; s.length < e; )
        s.push("");
  for (; i < s.length; i++)
    s[i] = s[i].trim().replace(Ie.slashPipe, "|");
  return s;
}
function on(t, e, n) {
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
function or(t, e, n, s, i) {
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
class Yn {
  // set by the lexer
  constructor(e) {
    re(this, "options");
    re(this, "rules");
    // set by the lexer
    re(this, "lexer");
    this.options = e || Ut;
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
        text: this.options.pedantic ? s : on(s, `
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
        const i = on(s, "#");
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
        raw: on(n[0], `
`)
      };
  }
  blockquote(e) {
    const n = this.rules.block.blockquote.exec(e);
    if (n) {
      let s = on(n[0], `
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
          const P = k, O = P.raw + `
` + s.join(`
`), j = this.blockquote(O);
          o[o.length - 1] = j, i = i.substring(0, i.length - P.raw.length) + j.raw, r = r.substring(0, r.length - P.text.length) + j.text;
          break;
        } else if ((k == null ? void 0 : k.type) === "list") {
          const P = k, O = P.raw + `
` + s.join(`
`), j = this.list(O);
          o[o.length - 1] = j, i = i.substring(0, i.length - k.raw.length) + j.raw, r = r.substring(0, r.length - P.raw.length) + j.raw, s = O.substring(o.at(-1).raw.length).split(`
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
`, 1)[0].replace(this.rules.other.listReplaceTabs, (W) => " ".repeat(3 * W.length)), k = e.split(`
`, 1)[0], P = !_.trim(), O = 0;
        if (this.options.pedantic ? (O = 2, g = _.trimStart()) : P ? O = n[1].length + 1 : (O = n[2].search(this.rules.other.nonSpaceChar), O = O > 4 ? 1 : O, g = _.slice(O), O += n[1].length), P && this.rules.other.blankLine.test(k) && (c += k + `
`, e = e.substring(k.length + 1), f = !0), !f) {
          const W = this.rules.other.nextBulletRegex(O), Y = this.rules.other.hrRegex(O), I = this.rules.other.fencesBeginRegex(O), D = this.rules.other.headingBeginRegex(O), ue = this.rules.other.htmlBeginRegex(O);
          for (; e; ) {
            const N = e.split(`
`, 1)[0];
            let ae;
            if (k = N, this.options.pedantic ? (k = k.replace(this.rules.other.listReplaceNesting, "  "), ae = k) : ae = k.replace(this.rules.other.tabCharGlobal, "    "), I.test(k) || D.test(k) || ue.test(k) || W.test(k) || Y.test(k))
              break;
            if (ae.search(this.rules.other.nonSpaceChar) >= O || !k.trim())
              g += `
` + ae.slice(O);
            else {
              if (P || _.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || I.test(_) || D.test(_) || Y.test(_))
                break;
              g += `
` + k;
            }
            !P && !k.trim() && (P = !0), c += N + `
`, e = e.substring(N.length + 1), _ = ae.slice(O);
          }
        }
        r.loose || (l ? r.loose = !0 : this.rules.other.doubleBlankLine.test(c) && (l = !0));
        let j = null, H;
        this.options.gfm && (j = this.rules.other.listIsTask.exec(g), j && (H = j[0] !== "[ ] ", g = g.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: c,
          task: !!j,
          checked: H,
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
    const s = rr(n[1]), i = n[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (l = n[3]) != null && l.trim() ? n[3].replace(this.rules.other.tableRowBlankLine, "").split(`
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
        o.rows.push(rr(a, o.header.length).map((f, c) => ({
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
        const o = on(s.slice(0, -1), "\\");
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
      return i = i.trim(), this.rules.other.startAngleBracket.test(i) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(s) ? i = i.slice(1) : i = i.slice(1, -1)), or(n, {
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
      return or(s, r, s[0], this.lexer, this.rules);
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
          const O = k.slice(1, -1);
          return {
            type: "em",
            raw: k,
            text: O,
            tokens: this.lexer.inlineTokens(O)
          };
        }
        const P = k.slice(2, -2);
        return {
          type: "strong",
          raw: k,
          text: P,
          tokens: this.lexer.inlineTokens(P)
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
class We {
  constructor(e) {
    re(this, "tokens");
    re(this, "options");
    re(this, "state");
    re(this, "tokenizer");
    re(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || Ut, this.options.tokenizer = this.options.tokenizer || new Yn(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      other: Ie,
      block: Cn.normal,
      inline: rn.normal
    };
    this.options.pedantic ? (n.block = Cn.pedantic, n.inline = rn.pedantic) : this.options.gfm && (n.block = Cn.gfm, this.options.breaks ? n.inline = rn.breaks : n.inline = rn.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: Cn,
      inline: rn
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, n) {
    return new We(n).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, n) {
    return new We(n).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(Ie.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const s = this.inlineQueue[n];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, n = [], s = !1) {
    var i, r, o;
    for (this.options.pedantic && (e = e.replace(Ie.tabCharGlobal, "    ").replace(Ie.spaceLine, "")); e; ) {
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
        let P;
        this.options.extensions.startInline.forEach((O) => {
          P = O.call({ lexer: this }, k), typeof P == "number" && P >= 0 && (_ = Math.min(_, P));
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
class Jn {
  // set by the parser
  constructor(e) {
    re(this, "options");
    re(this, "parser");
    this.options = e || Ut;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: n, escaped: s }) {
    var o;
    const i = (o = (n || "").match(Ie.notSpaceStart)) == null ? void 0 : o[0], r = e.replace(Ie.endingNewline, "") + `
`;
    return i ? '<pre><code class="language-' + rt(i) + '">' + (s ? r : rt(r, !0)) + `</code></pre>
` : "<pre><code>" + (s ? r : rt(r, !0)) + `</code></pre>
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
      e.loose ? ((s = e.tokens[0]) == null ? void 0 : s.type) === "paragraph" ? (e.tokens[0].text = i + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = i + " " + rt(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
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
    return `<code>${rt(e, !0)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: n, tokens: s }) {
    const i = this.parser.parseInline(s), r = ir(e);
    if (r === null)
      return i;
    e = r;
    let o = '<a href="' + e + '"';
    return n && (o += ' title="' + rt(n) + '"'), o += ">" + i + "</a>", o;
  }
  image({ href: e, title: n, text: s }) {
    const i = ir(e);
    if (i === null)
      return rt(s);
    e = i;
    let r = `<img src="${e}" alt="${s}"`;
    return n && (r += ` title="${rt(n)}"`), r += ">", r;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : rt(e.text);
  }
}
class bi {
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
class Ke {
  constructor(e) {
    re(this, "options");
    re(this, "renderer");
    re(this, "textRenderer");
    this.options = e || Ut, this.options.renderer = this.options.renderer || new Jn(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new bi();
  }
  /**
   * Static Parse Method
   */
  static parse(e, n) {
    return new Ke(n).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, n) {
    return new Ke(n).parseInline(e);
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
class yn {
  constructor(e) {
    re(this, "options");
    re(this, "block");
    this.options = e || Ut;
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
    return this.block ? We.lex : We.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? Ke.parse : Ke.parseInline;
  }
}
re(yn, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
class Yc {
  constructor(...e) {
    re(this, "defaults", hi());
    re(this, "options", this.setOptions);
    re(this, "parse", this.parseMarkdown(!0));
    re(this, "parseInline", this.parseMarkdown(!1));
    re(this, "Parser", Ke);
    re(this, "Renderer", Jn);
    re(this, "TextRenderer", bi);
    re(this, "Lexer", We);
    re(this, "Tokenizer", Yn);
    re(this, "Hooks", yn);
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
        const r = this.defaults.renderer || new Jn(this.defaults);
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
        const r = this.defaults.tokenizer || new Yn(this.defaults);
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
        const r = this.defaults.hooks || new yn();
        for (const o in s.hooks) {
          if (!(o in r))
            throw new Error(`hook '${o}' does not exist`);
          if (["options", "block"].includes(o))
            continue;
          const l = o, a = s.hooks[l], f = r[l];
          yn.passThroughHooks.has(o) ? r[l] = (c) => {
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
    return We.lex(e, n ?? this.defaults);
  }
  parser(e, n) {
    return Ke.parse(e, n ?? this.defaults);
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
      const a = o.hooks ? o.hooks.provideLexer() : e ? We.lex : We.lexInline, f = o.hooks ? o.hooks.provideParser() : e ? Ke.parse : Ke.parseInline;
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
        const i = "<p>An error occurred:</p><pre>" + rt(s.message + "", !0) + "</pre>";
        return n ? Promise.resolve(i) : i;
      }
      if (n)
        return Promise.reject(s);
      throw s;
    };
  }
}
const $t = new Yc();
function Z(t, e) {
  return $t.parse(t, e);
}
Z.options = Z.setOptions = function(t) {
  return $t.setOptions(t), Z.defaults = $t.defaults, bo(Z.defaults), Z;
};
Z.getDefaults = hi;
Z.defaults = Ut;
Z.use = function(...t) {
  return $t.use(...t), Z.defaults = $t.defaults, bo(Z.defaults), Z;
};
Z.walkTokens = function(t, e) {
  return $t.walkTokens(t, e);
};
Z.parseInline = $t.parseInline;
Z.Parser = Ke;
Z.parser = Ke.parse;
Z.Renderer = Jn;
Z.TextRenderer = bi;
Z.Lexer = We;
Z.lexer = We.lex;
Z.Tokenizer = Yn;
Z.Hooks = yn;
Z.parse = Z;
Z.options;
Z.setOptions;
Z.use;
Z.walkTokens;
Z.parseInline;
Ke.parse;
We.lex;
const Qn = {
  API_URL: "http://localhost:8000/api/v1",
  WS_URL: "ws://localhost:8000"
};
function Jc(t) {
  const e = He(() => ({
    backgroundColor: t.value.chat_background_color || "#ffffff",
    color: kt(t.value.chat_background_color || "#ffffff") ? "#ffffff" : "#000000"
  })), n = He(() => ({
    backgroundColor: t.value.chat_bubble_color || "#f34611",
    color: kt(t.value.chat_bubble_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), s = He(() => {
    const f = t.value.chat_background_color || "#F8F9FA", c = dc(f, 20);
    return {
      backgroundColor: c,
      color: kt(c) ? "#FFFFFF" : "#000000"
    };
  }), i = He(() => ({
    backgroundColor: t.value.accent_color || "#f34611",
    color: kt(t.value.accent_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), r = He(() => ({
    color: kt(t.value.chat_background_color || "#F8F9FA") ? "#FFFFFF" : "#000000"
  })), o = He(() => ({
    borderBottom: `1px solid ${kt(t.value.chat_background_color || "#F8F9FA") ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`
  })), l = He(() => (console.log(t.value.photo_url), console.log(t.value.photo_url_signed), t.value.photo_url ? t.value.photo_url_signed ? t.value.photo_url_signed : (console.log(t.value.photo_url), console.log(Qn.API_URL), `${Qn.API_URL}${t.value.photo_url}`) : "")), a = He(() => {
    const f = t.value.chat_background_color || "#ffffff";
    return {
      boxShadow: `0 8px 5px ${kt(f) ? "rgba(0, 0, 0, 0.24)" : "rgba(0, 0, 0, 0.12)"}`
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
const pt = /* @__PURE__ */ Object.create(null);
pt.open = "0";
pt.close = "1";
pt.ping = "2";
pt.pong = "3";
pt.message = "4";
pt.upgrade = "5";
pt.noop = "6";
const $n = /* @__PURE__ */ Object.create(null);
Object.keys(pt).forEach((t) => {
  $n[pt[t]] = t;
});
const Hs = { type: "error", data: "parser error" }, Oo = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", Io = typeof ArrayBuffer == "function", Po = (t) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t && t.buffer instanceof ArrayBuffer, wi = ({ type: t, data: e }, n, s) => Oo && e instanceof Blob ? n ? s(e) : lr(e, s) : Io && (e instanceof ArrayBuffer || Po(e)) ? n ? s(e) : lr(new Blob([e]), s) : s(pt[t] + (e || "")), lr = (t, e) => {
  const n = new FileReader();
  return n.onload = function() {
    const s = n.result.split(",")[1];
    e("b" + (s || ""));
  }, n.readAsDataURL(t);
};
function ar(t) {
  return t instanceof Uint8Array ? t : t instanceof ArrayBuffer ? new Uint8Array(t) : new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
}
let Ss;
function Qc(t, e) {
  if (Oo && t.data instanceof Blob)
    return t.data.arrayBuffer().then(ar).then(e);
  if (Io && (t.data instanceof ArrayBuffer || Po(t.data)))
    return e(ar(t.data));
  wi(t, !1, (n) => {
    Ss || (Ss = new TextEncoder()), e(Ss.encode(n));
  });
}
const cr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", cn = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let t = 0; t < cr.length; t++)
  cn[cr.charCodeAt(t)] = t;
const Xc = (t) => {
  let e = t.length * 0.75, n = t.length, s, i = 0, r, o, l, a;
  t[t.length - 1] === "=" && (e--, t[t.length - 2] === "=" && e--);
  const f = new ArrayBuffer(e), c = new Uint8Array(f);
  for (s = 0; s < n; s += 4)
    r = cn[t.charCodeAt(s)], o = cn[t.charCodeAt(s + 1)], l = cn[t.charCodeAt(s + 2)], a = cn[t.charCodeAt(s + 3)], c[i++] = r << 2 | o >> 4, c[i++] = (o & 15) << 4 | l >> 2, c[i++] = (l & 3) << 6 | a & 63;
  return f;
}, eu = typeof ArrayBuffer == "function", xi = (t, e) => {
  if (typeof t != "string")
    return {
      type: "message",
      data: Bo(t, e)
    };
  const n = t.charAt(0);
  return n === "b" ? {
    type: "message",
    data: tu(t.substring(1), e)
  } : $n[n] ? t.length > 1 ? {
    type: $n[n],
    data: t.substring(1)
  } : {
    type: $n[n]
  } : Hs;
}, tu = (t, e) => {
  if (eu) {
    const n = Xc(t);
    return Bo(n, e);
  } else
    return { base64: !0, data: t };
}, Bo = (t, e) => {
  switch (e) {
    case "blob":
      return t instanceof Blob ? t : new Blob([t]);
    case "arraybuffer":
    default:
      return t instanceof ArrayBuffer ? t : t.buffer;
  }
}, Lo = "", nu = (t, e) => {
  const n = t.length, s = new Array(n);
  let i = 0;
  t.forEach((r, o) => {
    wi(r, !1, (l) => {
      s[o] = l, ++i === n && e(s.join(Lo));
    });
  });
}, su = (t, e) => {
  const n = t.split(Lo), s = [];
  for (let i = 0; i < n.length; i++) {
    const r = xi(n[i], e);
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
let Ts;
function On(t) {
  return t.reduce((e, n) => e + n.length, 0);
}
function In(t, e) {
  if (t[0].length === e)
    return t.shift();
  const n = new Uint8Array(e);
  let s = 0;
  for (let i = 0; i < e; i++)
    n[i] = t[0][s++], s === t[0].length && (t.shift(), s = 0);
  return t.length && s < t[0].length && (t[0] = t[0].slice(s)), n;
}
function ru(t, e) {
  Ts || (Ts = new TextDecoder());
  const n = [];
  let s = 0, i = -1, r = !1;
  return new TransformStream({
    transform(o, l) {
      for (n.push(o); ; ) {
        if (s === 0) {
          if (On(n) < 1)
            break;
          const a = In(n, 1);
          r = (a[0] & 128) === 128, i = a[0] & 127, i < 126 ? s = 3 : i === 126 ? s = 1 : s = 2;
        } else if (s === 1) {
          if (On(n) < 2)
            break;
          const a = In(n, 2);
          i = new DataView(a.buffer, a.byteOffset, a.length).getUint16(0), s = 3;
        } else if (s === 2) {
          if (On(n) < 8)
            break;
          const a = In(n, 8), f = new DataView(a.buffer, a.byteOffset, a.length), c = f.getUint32(0);
          if (c > Math.pow(2, 21) - 1) {
            l.enqueue(Hs);
            break;
          }
          i = c * Math.pow(2, 32) + f.getUint32(4), s = 3;
        } else {
          if (On(n) < i)
            break;
          const a = In(n, i);
          l.enqueue(xi(r ? a : Ts.decode(a), e)), s = 0;
        }
        if (i === 0 || i > t) {
          l.enqueue(Hs);
          break;
        }
      }
    }
  });
}
const No = 4;
function ge(t) {
  if (t) return ou(t);
}
function ou(t) {
  for (var e in ge.prototype)
    t[e] = ge.prototype[e];
  return t;
}
ge.prototype.on = ge.prototype.addEventListener = function(t, e) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
};
ge.prototype.once = function(t, e) {
  function n() {
    this.off(t, n), e.apply(this, arguments);
  }
  return n.fn = e, this.on(t, n), this;
};
ge.prototype.off = ge.prototype.removeListener = ge.prototype.removeAllListeners = ge.prototype.removeEventListener = function(t, e) {
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
ge.prototype.emit = function(t) {
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
ge.prototype.emitReserved = ge.prototype.emit;
ge.prototype.listeners = function(t) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
};
ge.prototype.hasListeners = function(t) {
  return !!this.listeners(t).length;
};
const fs = typeof Promise == "function" && typeof Promise.resolve == "function" ? (e) => Promise.resolve().then(e) : (e, n) => n(e, 0), ze = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), lu = "arraybuffer";
function Fo(t, ...e) {
  return e.reduce((n, s) => (t.hasOwnProperty(s) && (n[s] = t[s]), n), {});
}
const au = ze.setTimeout, cu = ze.clearTimeout;
function hs(t, e) {
  e.useNativeTimers ? (t.setTimeoutFn = au.bind(ze), t.clearTimeoutFn = cu.bind(ze)) : (t.setTimeoutFn = ze.setTimeout.bind(ze), t.clearTimeoutFn = ze.clearTimeout.bind(ze));
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
function Mo() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function pu(t) {
  let e = "";
  for (let n in t)
    t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
  return e;
}
function du(t) {
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
class ki extends ge {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(e) {
    super(), this.writable = !1, hs(this, e), this.opts = e, this.query = e.query, this.socket = e.socket, this.supportsBinary = !e.forceBase64;
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
    const n = xi(e, this.socket.binaryType);
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
    const n = pu(e);
    return n.length ? "?" + n : "";
  }
}
class mu extends ki {
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
    return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = Mo()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(e, n);
  }
}
let Do = !1;
try {
  Do = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const yu = Do;
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
class ft extends ge {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(e, n, s) {
    super(), this.createRequest = e, hs(this, s), this._opts = s, this._method = s.method || "GET", this._uri = n, this._data = s.data !== void 0 ? s.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var e;
    const n = Fo(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
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
    typeof document < "u" && (this._index = ft.requestsCount++, ft.requests[this._index] = this);
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
      typeof document < "u" && delete ft.requests[this._index], this._xhr = null;
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
ft.requestsCount = 0;
ft.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", ur);
  else if (typeof addEventListener == "function") {
    const t = "onpagehide" in ze ? "pagehide" : "unload";
    addEventListener(t, ur, !1);
  }
}
function ur() {
  for (let t in ft.requests)
    ft.requests.hasOwnProperty(t) && ft.requests[t].abort();
}
const wu = function() {
  const t = $o({
    xdomain: !1
  });
  return t && t.responseType !== null;
}();
class xu extends bu {
  constructor(e) {
    super(e);
    const n = e && e.forceBase64;
    this.supportsBinary = wu && !n;
  }
  request(e = {}) {
    return Object.assign(e, { xd: this.xd }, this.opts), new ft($o, this.uri(), e);
  }
}
function $o(t) {
  const e = t.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!e || yu))
      return new XMLHttpRequest();
  } catch {
  }
  if (!e)
    try {
      return new ze[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const qo = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class ku extends ki {
  get name() {
    return "websocket";
  }
  doOpen() {
    const e = this.uri(), n = this.opts.protocols, s = qo ? {} : Fo(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
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
      wi(s, this.supportsBinary, (r) => {
        try {
          this.doWrite(s, r);
        } catch {
        }
        i && fs(() => {
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
    return this.opts.timestampRequests && (n[this.opts.timestampParam] = Mo()), this.supportsBinary || (n.b64 = 1), this.createUri(e, n);
  }
}
const Es = ze.WebSocket || ze.MozWebSocket;
class vu extends ku {
  createSocket(e, n, s) {
    return qo ? new Es(e, n, s) : n ? new Es(e, n) : new Es(e);
  }
  doWrite(e, n) {
    this.ws.send(n);
  }
}
class Su extends ki {
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
        i && fs(() => {
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
  websocket: vu,
  webtransport: Su,
  polling: xu
}, Eu = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, Au = [
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
function zs(t) {
  if (t.length > 8e3)
    throw "URI too long";
  const e = t, n = t.indexOf("["), s = t.indexOf("]");
  n != -1 && s != -1 && (t = t.substring(0, n) + t.substring(n, s).replace(/:/g, ";") + t.substring(s, t.length));
  let i = Eu.exec(t || ""), r = {}, o = 14;
  for (; o--; )
    r[Au[o]] = i[o] || "";
  return n != -1 && s != -1 && (r.source = e, r.host = r.host.substring(1, r.host.length - 1).replace(/;/g, ":"), r.authority = r.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), r.ipv6uri = !0), r.pathNames = Ru(r, r.path), r.queryKey = Cu(r, r.query), r;
}
function Ru(t, e) {
  const n = /\/{2,9}/g, s = e.replace(n, "/").split("/");
  return (e.slice(0, 1) == "/" || e.length === 0) && s.splice(0, 1), e.slice(-1) == "/" && s.splice(s.length - 1, 1), s;
}
function Cu(t, e) {
  const n = {};
  return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, i, r) {
    i && (n[i] = r);
  }), n;
}
const Vs = typeof addEventListener == "function" && typeof removeEventListener == "function", qn = [];
Vs && addEventListener("offline", () => {
  qn.forEach((t) => t());
}, !1);
class At extends ge {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(e, n) {
    if (super(), this.binaryType = lu, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, e && typeof e == "object" && (n = e, e = null), e) {
      const s = zs(e);
      n.hostname = s.host, n.secure = s.protocol === "https" || s.protocol === "wss", n.port = s.port, s.query && (n.query = s.query);
    } else n.host && (n.hostname = zs(n.host).host);
    hs(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((s) => {
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
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = du(this.opts.query)), Vs && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, qn.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
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
    n.EIO = No, n.transport = e, this.id && (n.sid = this.id);
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
    return e && (this._pingTimeoutTime = 0, fs(() => {
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
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), Vs && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const s = qn.indexOf(this._offlineEventListener);
        s !== -1 && qn.splice(s, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", e, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
At.protocol = No;
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
  n = n || typeof location < "u" && location, t == null && (t = n.protocol + "//" + n.host), typeof t == "string" && (t.charAt(0) === "/" && (t.charAt(1) === "/" ? t = n.protocol + t : t = n.host + t), /^(https?|wss?):\/\//.test(t) || (typeof n < "u" ? t = n.protocol + "//" + t : t = "https://" + t), s = zs(t)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
  const r = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return s.id = s.protocol + "://" + r + ":" + s.port + e, s.href = s.protocol + "://" + r + (n && n.port === s.port ? "" : ":" + s.port), s;
}
const Bu = typeof ArrayBuffer == "function", Lu = (t) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer, Uo = Object.prototype.toString, Nu = typeof Blob == "function" || typeof Blob < "u" && Uo.call(Blob) === "[object BlobConstructor]", Fu = typeof File == "function" || typeof File < "u" && Uo.call(File) === "[object FileConstructor]";
function vi(t) {
  return Bu && (t instanceof ArrayBuffer || Lu(t)) || Nu && t instanceof Blob || Fu && t instanceof File;
}
function Un(t, e) {
  if (!t || typeof t != "object")
    return !1;
  if (Array.isArray(t)) {
    for (let n = 0, s = t.length; n < s; n++)
      if (Un(t[n]))
        return !0;
    return !1;
  }
  if (vi(t))
    return !0;
  if (t.toJSON && typeof t.toJSON == "function" && arguments.length === 1)
    return Un(t.toJSON(), !0);
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n) && Un(t[n]))
      return !0;
  return !1;
}
function Mu(t) {
  const e = [], n = t.data, s = t;
  return s.data = Ws(n, e), s.attachments = e.length, { packet: s, buffers: e };
}
function Ws(t, e) {
  if (!t)
    return t;
  if (vi(t)) {
    const n = { _placeholder: !0, num: e.length };
    return e.push(t), n;
  } else if (Array.isArray(t)) {
    const n = new Array(t.length);
    for (let s = 0; s < t.length; s++)
      n[s] = Ws(t[s], e);
    return n;
  } else if (typeof t == "object" && !(t instanceof Date)) {
    const n = {};
    for (const s in t)
      Object.prototype.hasOwnProperty.call(t, s) && (n[s] = Ws(t[s], e));
    return n;
  }
  return t;
}
function Du(t, e) {
  return t.data = Ks(t.data, e), delete t.attachments, t;
}
function Ks(t, e) {
  if (!t)
    return t;
  if (t && t._placeholder === !0) {
    if (typeof t.num == "number" && t.num >= 0 && t.num < e.length)
      return e[t.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(t))
    for (let n = 0; n < t.length; n++)
      t[n] = Ks(t[n], e);
  else if (typeof t == "object")
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (t[n] = Ks(t[n], e));
  return t;
}
const $u = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], qu = 5;
var V;
(function(t) {
  t[t.CONNECT = 0] = "CONNECT", t[t.DISCONNECT = 1] = "DISCONNECT", t[t.EVENT = 2] = "EVENT", t[t.ACK = 3] = "ACK", t[t.CONNECT_ERROR = 4] = "CONNECT_ERROR", t[t.BINARY_EVENT = 5] = "BINARY_EVENT", t[t.BINARY_ACK = 6] = "BINARY_ACK";
})(V || (V = {}));
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
    return (e.type === V.EVENT || e.type === V.ACK) && Un(e) ? this.encodeAsBinary({
      type: e.type === V.EVENT ? V.BINARY_EVENT : V.BINARY_ACK,
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
    return (e.type === V.BINARY_EVENT || e.type === V.BINARY_ACK) && (n += e.attachments + "-"), e.nsp && e.nsp !== "/" && (n += e.nsp + ","), e.id != null && (n += e.id), e.data != null && (n += JSON.stringify(e.data, this.replacer)), n;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(e) {
    const n = Mu(e), s = this.encodeAsString(n.packet), i = n.buffers;
    return i.unshift(s), i;
  }
}
function fr(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
class Si extends ge {
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
      const s = n.type === V.BINARY_EVENT;
      s || n.type === V.BINARY_ACK ? (n.type = s ? V.EVENT : V.ACK, this.reconstructor = new ju(n), n.attachments === 0 && super.emitReserved("decoded", n)) : super.emitReserved("decoded", n);
    } else if (vi(e) || e.base64)
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
    if (V[s.type] === void 0)
      throw new Error("unknown packet type " + s.type);
    if (s.type === V.BINARY_EVENT || s.type === V.BINARY_ACK) {
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
      if (Si.isPayloadValid(s.type, r))
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
      case V.CONNECT:
        return fr(n);
      case V.DISCONNECT:
        return n === void 0;
      case V.CONNECT_ERROR:
        return typeof n == "string" || fr(n);
      case V.EVENT:
      case V.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && $u.indexOf(n[0]) === -1);
      case V.ACK:
      case V.BINARY_ACK:
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
class ju {
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
      const n = Du(this.reconPack, this.buffers);
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
const Hu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Si,
  Encoder: Uu,
  get PacketType() {
    return V;
  },
  protocol: qu
}, Symbol.toStringTag, { value: "Module" }));
function Je(t, e, n) {
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
class jo extends ge {
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
      Je(e, "open", this.onopen.bind(this)),
      Je(e, "packet", this.onpacket.bind(this)),
      Je(e, "error", this.onerror.bind(this)),
      Je(e, "close", this.onclose.bind(this))
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
      type: V.EVENT,
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
      type: V.CONNECT,
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
        case V.CONNECT:
          e.data && e.data.sid ? this.onconnect(e.data.sid, e.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case V.EVENT:
        case V.BINARY_EVENT:
          this.onevent(e);
          break;
        case V.ACK:
        case V.BINARY_ACK:
          this.onack(e);
          break;
        case V.DISCONNECT:
          this.ondisconnect();
          break;
        case V.CONNECT_ERROR:
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
        type: V.ACK,
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
    return this.connected && this.packet({ type: V.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
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
function en(t) {
  t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
}
en.prototype.duration = function() {
  var t = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var e = Math.random(), n = Math.floor(e * this.jitter * t);
    t = Math.floor(e * 10) & 1 ? t + n : t - n;
  }
  return Math.min(t, this.max) | 0;
};
en.prototype.reset = function() {
  this.attempts = 0;
};
en.prototype.setMin = function(t) {
  this.ms = t;
};
en.prototype.setMax = function(t) {
  this.max = t;
};
en.prototype.setJitter = function(t) {
  this.jitter = t;
};
class Gs extends ge {
  constructor(e, n) {
    var s;
    super(), this.nsps = {}, this.subs = [], e && typeof e == "object" && (n = e, e = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, hs(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5), this.backoff = new en({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = e;
    const i = n.parser || Hu;
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
    const i = Je(n, "open", function() {
      s.onopen(), e && e();
    }), r = (l) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", l), e ? e(l) : this.maybeReconnectOnOpen();
    }, o = Je(n, "error", r);
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
      Je(e, "ping", this.onping.bind(this)),
      Je(e, "data", this.ondata.bind(this)),
      Je(e, "error", this.onerror.bind(this)),
      Je(e, "close", this.onclose.bind(this)),
      // @ts-ignore
      Je(this.decoder, "decoded", this.ondecoded.bind(this))
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
    fs(() => {
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
    return s ? this._autoConnect && !s.active && s.connect() : (s = new jo(this, e, n), this.nsps[e] = s), s;
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
const ln = {};
function jn(t, e) {
  typeof t == "object" && (e = t, t = void 0), e = e || {};
  const n = Pu(t, e.path || "/socket.io"), s = n.source, i = n.id, r = n.path, o = ln[i] && r in ln[i].nsps, l = e.forceNew || e["force new connection"] || e.multiplex === !1 || o;
  let a;
  return l ? a = new Gs(s, e) : (ln[i] || (ln[i] = new Gs(s, e)), a = ln[i]), n.query && !e.query && (e.query = n.queryKey), a.socket(n.path, e);
}
Object.assign(jn, {
  Manager: Gs,
  Socket: jo,
  io: jn,
  connect: jn
});
function Vu() {
  const t = _e([]), e = _e(!1), n = _e(""), s = _e(!1), i = _e(!1), r = _e(!1), o = _e("connecting"), l = _e(0), a = 5, f = _e({});
  let c = null, g = null;
  const _ = (D) => {
    const ue = localStorage.getItem("ctid");
    return c = jn(`${Qn.WS_URL}/widget`, {
      transports: ["websocket"],
      reconnection: !0,
      reconnectionAttempts: a,
      reconnectionDelay: 1e3,
      auth: ue ? {
        conversation_token: ue
      } : void 0
    }), c.on("connect", () => {
      o.value = "connected", l.value = 0;
    }), c.on("disconnect", () => {
      o.value === "connected" && (o.value = "connecting");
    }), c.on("connect_error", () => {
      l.value++, console.error("Socket connection failed, attempt:", l.value), l.value >= a && (o.value = "failed");
    }), c.on("chat_response", (N) => {
      N.type === "agent_message" ? t.value.push({
        message: N.message,
        message_type: "agent",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: "",
        agent_name: N.agent_name
      }) : t.value.push({
        message: N.message,
        message_type: "bot",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: "",
        agent_name: N.agent_name
      }), e.value = !1;
    }), c.on("handle_taken_over", (N) => {
      t.value.push({
        message: `${N.user_name} joined the conversation`,
        message_type: "system",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: N.session_id
      }), f.value = {
        ...f.value,
        agent_name: N.user_name,
        agent_profile_pic: N.profile_picture
      }, g && g(N);
    }), c.on("error", j), c.on("chat_history", H), c;
  }, k = async () => {
    try {
      return o.value = "connecting", l.value = 0, c && (c.removeAllListeners(), c.disconnect(), c = null), c = _(""), new Promise((D) => {
        c == null || c.on("connect", () => {
          D(!0);
        }), c == null || c.on("connect_error", () => {
          l.value >= a && D(!1);
        });
      });
    } catch (D) {
      return console.error("Socket initialization failed:", D), o.value = "failed", !1;
    }
  }, P = () => (c && c.disconnect(), k()), O = (D) => {
    g = D;
  }, j = (D) => {
    e.value = !1, n.value = gc(D), s.value = !0, setTimeout(() => {
      s.value = !1, n.value = "";
    }, 5e3);
  }, H = (D) => {
    if (D.type === "chat_history" && Array.isArray(D.messages)) {
      const ue = D.messages.map((N) => ({
        message: N.message,
        message_type: N.message_type,
        created_at: N.created_at,
        attributes: N.attributes || {},
        session_id: "",
        agent_name: N.agent_name || "",
        user_name: N.user_name || ""
      }));
      t.value = [
        ...ue.filter(
          (N) => !t.value.some(
            (ae) => ae.message === N.message && ae.message_type === N.message_type
          )
        ),
        ...t.value
      ];
    }
  };
  return {
    messages: t,
    loading: e,
    errorMessage: n,
    showError: s,
    loadingHistory: i,
    hasStartedChat: r,
    connectionStatus: o,
    sendMessage: async (D, ue) => {
      !c || !D.trim() || (f.value.full_name || (e.value = !0), t.value.push({
        message: D,
        message_type: "user",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: ""
      }), c.emit("chat", {
        message: D,
        email: ue
      }), r.value = !0);
    },
    loadChatHistory: async () => {
      if (c)
        try {
          i.value = !0, c.emit("get_chat_history");
        } catch (D) {
          console.error("Failed to load chat history:", D);
        } finally {
          i.value = !1;
        }
    },
    connect: k,
    reconnect: P,
    cleanup: () => {
      c && (c.removeAllListeners(), c.disconnect(), c = null), g = null;
    },
    customer: f,
    onTakeover: O
  };
}
function Wu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var As = { exports: {} }, hr;
function Ku() {
  return hr || (hr = 1, function(t) {
    (function() {
      function e(u, d, b) {
        return u.call.apply(u.bind, arguments);
      }
      function n(u, d, b) {
        if (!u) throw Error();
        if (2 < arguments.length) {
          var y = Array.prototype.slice.call(arguments, 2);
          return function() {
            var T = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(T, y), u.apply(d, T);
          };
        }
        return function() {
          return u.apply(d, arguments);
        };
      }
      function s(u, d, b) {
        return s = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? e : n, s.apply(null, arguments);
      }
      var i = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function r(u, d) {
        this.a = u, this.o = d || u, this.c = this.o.document;
      }
      var o = !!window.FontFace;
      function l(u, d, b, y) {
        if (d = u.c.createElement(d), b) for (var T in b) b.hasOwnProperty(T) && (T == "style" ? d.style.cssText = b[T] : d.setAttribute(T, b[T]));
        return y && d.appendChild(u.c.createTextNode(y)), d;
      }
      function a(u, d, b) {
        u = u.c.getElementsByTagName(d)[0], u || (u = document.documentElement), u.insertBefore(b, u.lastChild);
      }
      function f(u) {
        u.parentNode && u.parentNode.removeChild(u);
      }
      function c(u, d, b) {
        d = d || [], b = b || [];
        for (var y = u.className.split(/\s+/), T = 0; T < d.length; T += 1) {
          for (var B = !1, M = 0; M < y.length; M += 1) if (d[T] === y[M]) {
            B = !0;
            break;
          }
          B || y.push(d[T]);
        }
        for (d = [], T = 0; T < y.length; T += 1) {
          for (B = !1, M = 0; M < b.length; M += 1) if (y[T] === b[M]) {
            B = !0;
            break;
          }
          B || d.push(y[T]);
        }
        u.className = d.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function g(u, d) {
        for (var b = u.className.split(/\s+/), y = 0, T = b.length; y < T; y++) if (b[y] == d) return !0;
        return !1;
      }
      function _(u) {
        return u.o.location.hostname || u.a.location.hostname;
      }
      function k(u, d, b) {
        function y() {
          Q && T && B && (Q(M), Q = null);
        }
        d = l(u, "link", { rel: "stylesheet", href: d, media: "all" });
        var T = !1, B = !0, M = null, Q = b || null;
        o ? (d.onload = function() {
          T = !0, y();
        }, d.onerror = function() {
          T = !0, M = Error("Stylesheet failed to load"), y();
        }) : setTimeout(function() {
          T = !0, y();
        }, 0), a(u, "head", d);
      }
      function P(u, d, b, y) {
        var T = u.c.getElementsByTagName("head")[0];
        if (T) {
          var B = l(u, "script", { src: d }), M = !1;
          return B.onload = B.onreadystatechange = function() {
            M || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (M = !0, b && b(null), B.onload = B.onreadystatechange = null, B.parentNode.tagName == "HEAD" && T.removeChild(B));
          }, T.appendChild(B), setTimeout(function() {
            M || (M = !0, b && b(Error("Script load timeout")));
          }, y || 5e3), B;
        }
        return null;
      }
      function O() {
        this.a = 0, this.c = null;
      }
      function j(u) {
        return u.a++, function() {
          u.a--, W(u);
        };
      }
      function H(u, d) {
        u.c = d, W(u);
      }
      function W(u) {
        u.a == 0 && u.c && (u.c(), u.c = null);
      }
      function Y(u) {
        this.a = u || "-";
      }
      Y.prototype.c = function(u) {
        for (var d = [], b = 0; b < arguments.length; b++) d.push(arguments[b].replace(/[\W_]+/g, "").toLowerCase());
        return d.join(this.a);
      };
      function I(u, d) {
        this.c = u, this.f = 4, this.a = "n";
        var b = (d || "n4").match(/^([nio])([1-9])$/i);
        b && (this.a = b[1], this.f = parseInt(b[2], 10));
      }
      function D(u) {
        return ae(u) + " " + (u.f + "00") + " 300px " + ue(u.c);
      }
      function ue(u) {
        var d = [];
        u = u.split(/,\s*/);
        for (var b = 0; b < u.length; b++) {
          var y = u[b].replace(/['"]/g, "");
          y.indexOf(" ") != -1 || /^\d/.test(y) ? d.push("'" + y + "'") : d.push(y);
        }
        return d.join(",");
      }
      function N(u) {
        return u.a + u.f;
      }
      function ae(u) {
        var d = "normal";
        return u.a === "o" ? d = "oblique" : u.a === "i" && (d = "italic"), d;
      }
      function wt(u) {
        var d = 4, b = "n", y = null;
        return u && ((y = u.match(/(normal|oblique|italic)/i)) && y[1] && (b = y[1].substr(0, 1).toLowerCase()), (y = u.match(/([1-9]00|normal|bold)/i)) && y[1] && (/bold/i.test(y[1]) ? d = 7 : /[1-9]00/.test(y[1]) && (d = parseInt(y[1].substr(0, 1), 10)))), b + d;
      }
      function be(u, d) {
        this.c = u, this.f = u.o.document.documentElement, this.h = d, this.a = new Y("-"), this.j = d.events !== !1, this.g = d.classes !== !1;
      }
      function Pe(u) {
        u.g && c(u.f, [u.a.c("wf", "loading")]), ye(u, "loading");
      }
      function Xe(u) {
        if (u.g) {
          var d = g(u.f, u.a.c("wf", "active")), b = [], y = [u.a.c("wf", "loading")];
          d || b.push(u.a.c("wf", "inactive")), c(u.f, b, y);
        }
        ye(u, "inactive");
      }
      function ye(u, d, b) {
        u.j && u.h[d] && (b ? u.h[d](b.c, N(b)) : u.h[d]());
      }
      function xt() {
        this.c = {};
      }
      function Ze(u, d, b) {
        var y = [], T;
        for (T in d) if (d.hasOwnProperty(T)) {
          var B = u.c[T];
          B && y.push(B(d[T], b));
        }
        return y;
      }
      function ce(u, d) {
        this.c = u, this.f = d, this.a = l(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function X(u) {
        a(u.c, "body", u.a);
      }
      function K(u) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + ue(u.c) + ";" + ("font-style:" + ae(u) + ";font-weight:" + (u.f + "00") + ";");
      }
      function je(u, d, b, y, T, B) {
        this.g = u, this.j = d, this.a = y, this.c = b, this.f = T || 3e3, this.h = B || void 0;
      }
      je.prototype.start = function() {
        var u = this.c.o.document, d = this, b = i(), y = new Promise(function(M, Q) {
          function ne() {
            i() - b >= d.f ? Q() : u.fonts.load(D(d.a), d.h).then(function(pe) {
              1 <= pe.length ? M() : setTimeout(ne, 25);
            }, function() {
              Q();
            });
          }
          ne();
        }), T = null, B = new Promise(function(M, Q) {
          T = setTimeout(Q, d.f);
        });
        Promise.race([B, y]).then(function() {
          T && (clearTimeout(T), T = null), d.g(d.a);
        }, function() {
          d.j(d.a);
        });
      };
      function dt(u, d, b, y, T, B, M) {
        this.v = u, this.B = d, this.c = b, this.a = y, this.s = M || "BESbswy", this.f = {}, this.w = T || 3e3, this.u = B || null, this.m = this.j = this.h = this.g = null, this.g = new ce(this.c, this.s), this.h = new ce(this.c, this.s), this.j = new ce(this.c, this.s), this.m = new ce(this.c, this.s), u = new I(this.a.c + ",serif", N(this.a)), u = K(u), this.g.a.style.cssText = u, u = new I(this.a.c + ",sans-serif", N(this.a)), u = K(u), this.h.a.style.cssText = u, u = new I("serif", N(this.a)), u = K(u), this.j.a.style.cssText = u, u = new I("sans-serif", N(this.a)), u = K(u), this.m.a.style.cssText = u, X(this.g), X(this.h), X(this.j), X(this.m);
      }
      var Be = { D: "serif", C: "sans-serif" }, we = null;
      function Pt() {
        if (we === null) {
          var u = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          we = !!u && (536 > parseInt(u[1], 10) || parseInt(u[1], 10) === 536 && 11 >= parseInt(u[2], 10));
        }
        return we;
      }
      dt.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = i(), Ht(this);
      };
      function jt(u, d, b) {
        for (var y in Be) if (Be.hasOwnProperty(y) && d === u.f[Be[y]] && b === u.f[Be[y]]) return !0;
        return !1;
      }
      function Ht(u) {
        var d = u.g.a.offsetWidth, b = u.h.a.offsetWidth, y;
        (y = d === u.f.serif && b === u.f["sans-serif"]) || (y = Pt() && jt(u, d, b)), y ? i() - u.A >= u.w ? Pt() && jt(u, d, b) && (u.u === null || u.u.hasOwnProperty(u.a.c)) ? tt(u, u.v) : tt(u, u.B) : et(u) : tt(u, u.v);
      }
      function et(u) {
        setTimeout(s(function() {
          Ht(this);
        }, u), 50);
      }
      function tt(u, d) {
        setTimeout(s(function() {
          f(this.g.a), f(this.h.a), f(this.j.a), f(this.m.a), d(this.a);
        }, u), 0);
      }
      function Ne(u, d, b) {
        this.c = u, this.a = d, this.f = 0, this.m = this.j = !1, this.s = b;
      }
      var nt = null;
      Ne.prototype.g = function(u) {
        var d = this.a;
        d.g && c(d.f, [d.a.c("wf", u.c, N(u).toString(), "active")], [d.a.c("wf", u.c, N(u).toString(), "loading"), d.a.c("wf", u.c, N(u).toString(), "inactive")]), ye(d, "fontactive", u), this.m = !0, Fe(this);
      }, Ne.prototype.h = function(u) {
        var d = this.a;
        if (d.g) {
          var b = g(d.f, d.a.c("wf", u.c, N(u).toString(), "active")), y = [], T = [d.a.c("wf", u.c, N(u).toString(), "loading")];
          b || y.push(d.a.c("wf", u.c, N(u).toString(), "inactive")), c(d.f, y, T);
        }
        ye(d, "fontinactive", u), Fe(this);
      };
      function Fe(u) {
        --u.f == 0 && u.j && (u.m ? (u = u.a, u.g && c(u.f, [u.a.c("wf", "active")], [u.a.c("wf", "loading"), u.a.c("wf", "inactive")]), ye(u, "active")) : Xe(u.a));
      }
      function tn(u) {
        this.j = u, this.a = new xt(), this.h = 0, this.f = this.g = !0;
      }
      tn.prototype.load = function(u) {
        this.c = new r(this.j, u.context || this.j), this.g = u.events !== !1, this.f = u.classes !== !1, p(this, new be(this.c, u), u);
      };
      function h(u, d, b, y, T) {
        var B = --u.h == 0;
        (u.f || u.g) && setTimeout(function() {
          var M = T || null, Q = y || null || {};
          if (b.length === 0 && B) Xe(d.a);
          else {
            d.f += b.length, B && (d.j = B);
            var ne, pe = [];
            for (ne = 0; ne < b.length; ne++) {
              var de = b[ne], Ee = Q[de.c], Ye = d.a, zt = de;
              if (Ye.g && c(Ye.f, [Ye.a.c("wf", zt.c, N(zt).toString(), "loading")]), ye(Ye, "fontloading", zt), Ye = null, nt === null) if (window.FontFace) {
                var zt = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), Ho = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                nt = zt ? 42 < parseInt(zt[1], 10) : !Ho;
              } else nt = !1;
              nt ? Ye = new je(s(d.g, d), s(d.h, d), d.c, de, d.s, Ee) : Ye = new dt(s(d.g, d), s(d.h, d), d.c, de, d.s, M, Ee), pe.push(Ye);
            }
            for (ne = 0; ne < pe.length; ne++) pe[ne].start();
          }
        }, 0);
      }
      function p(u, d, b) {
        var T = [], y = b.timeout;
        Pe(d);
        var T = Ze(u.a, b, u.c), B = new Ne(u.c, d, y);
        for (u.h = T.length, d = 0, b = T.length; d < b; d++) T[d].load(function(M, Q, ne) {
          h(u, B, M, Q, ne);
        });
      }
      function m(u, d) {
        this.c = u, this.a = d;
      }
      m.prototype.load = function(u) {
        function d() {
          if (B["__mti_fntLst" + y]) {
            var M = B["__mti_fntLst" + y](), Q = [], ne;
            if (M) for (var pe = 0; pe < M.length; pe++) {
              var de = M[pe].fontfamily;
              M[pe].fontStyle != null && M[pe].fontWeight != null ? (ne = M[pe].fontStyle + M[pe].fontWeight, Q.push(new I(de, ne))) : Q.push(new I(de));
            }
            u(Q);
          } else setTimeout(function() {
            d();
          }, 50);
        }
        var b = this, y = b.a.projectId, T = b.a.version;
        if (y) {
          var B = b.c.o;
          P(this.c, (b.a.api || "https://fast.fonts.net/jsapi") + "/" + y + ".js" + (T ? "?v=" + T : ""), function(M) {
            M ? u([]) : (B["__MonotypeConfiguration__" + y] = function() {
              return b.a;
            }, d());
          }).id = "__MonotypeAPIScript__" + y;
        } else u([]);
      };
      function w(u, d) {
        this.c = u, this.a = d;
      }
      w.prototype.load = function(u) {
        var d, b, y = this.a.urls || [], T = this.a.families || [], B = this.a.testStrings || {}, M = new O();
        for (d = 0, b = y.length; d < b; d++) k(this.c, y[d], j(M));
        var Q = [];
        for (d = 0, b = T.length; d < b; d++) if (y = T[d].split(":"), y[1]) for (var ne = y[1].split(","), pe = 0; pe < ne.length; pe += 1) Q.push(new I(y[0], ne[pe]));
        else Q.push(new I(y[0]));
        H(M, function() {
          u(Q, B);
        });
      };
      function x(u, d) {
        u ? this.c = u : this.c = v, this.a = [], this.f = [], this.g = d || "";
      }
      var v = "https://fonts.googleapis.com/css";
      function E(u, d) {
        for (var b = d.length, y = 0; y < b; y++) {
          var T = d[y].split(":");
          T.length == 3 && u.f.push(T.pop());
          var B = "";
          T.length == 2 && T[1] != "" && (B = ":"), u.a.push(T.join(B));
        }
      }
      function R(u) {
        if (u.a.length == 0) throw Error("No fonts to load!");
        if (u.c.indexOf("kit=") != -1) return u.c;
        for (var d = u.a.length, b = [], y = 0; y < d; y++) b.push(u.a[y].replace(/ /g, "+"));
        return d = u.c + "?family=" + b.join("%7C"), 0 < u.f.length && (d += "&subset=" + u.f.join(",")), 0 < u.g.length && (d += "&text=" + encodeURIComponent(u.g)), d;
      }
      function A(u) {
        this.f = u, this.a = [], this.c = {};
      }
      var S = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, F = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, C = { i: "i", italic: "i", n: "n", normal: "n" }, L = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function $(u) {
        for (var d = u.f.length, b = 0; b < d; b++) {
          var y = u.f[b].split(":"), T = y[0].replace(/\+/g, " "), B = ["n4"];
          if (2 <= y.length) {
            var M, Q = y[1];
            if (M = [], Q) for (var Q = Q.split(","), ne = Q.length, pe = 0; pe < ne; pe++) {
              var de;
              if (de = Q[pe], de.match(/^[\w-]+$/)) {
                var Ee = L.exec(de.toLowerCase());
                if (Ee == null) de = "";
                else {
                  if (de = Ee[2], de = de == null || de == "" ? "n" : C[de], Ee = Ee[1], Ee == null || Ee == "") Ee = "4";
                  else var Ye = F[Ee], Ee = Ye || (isNaN(Ee) ? "4" : Ee.substr(0, 1));
                  de = [de, Ee].join("");
                }
              } else de = "";
              de && M.push(de);
            }
            0 < M.length && (B = M), y.length == 3 && (y = y[2], M = [], y = y ? y.split(",") : M, 0 < y.length && (y = S[y[0]]) && (u.c[T] = y));
          }
          for (u.c[T] || (y = S[T]) && (u.c[T] = y), y = 0; y < B.length; y += 1) u.a.push(new I(T, B[y]));
        }
      }
      function z(u, d) {
        this.c = u, this.a = d;
      }
      var ie = { Arimo: !0, Cousine: !0, Tinos: !0 };
      z.prototype.load = function(u) {
        var d = new O(), b = this.c, y = new x(this.a.api, this.a.text), T = this.a.families;
        E(y, T);
        var B = new A(T);
        $(B), k(b, R(y), j(d)), H(d, function() {
          u(B.a, B.c, ie);
        });
      };
      function J(u, d) {
        this.c = u, this.a = d;
      }
      J.prototype.load = function(u) {
        var d = this.a.id, b = this.c.o;
        d ? P(this.c, (this.a.api || "https://use.typekit.net") + "/" + d + ".js", function(y) {
          if (y) u([]);
          else if (b.Typekit && b.Typekit.config && b.Typekit.config.fn) {
            y = b.Typekit.config.fn;
            for (var T = [], B = 0; B < y.length; B += 2) for (var M = y[B], Q = y[B + 1], ne = 0; ne < Q.length; ne++) T.push(new I(M, Q[ne]));
            try {
              b.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            u(T);
          }
        }, 2e3) : u([]);
      };
      function xe(u, d) {
        this.c = u, this.f = d, this.a = [];
      }
      xe.prototype.load = function(u) {
        var d = this.f.id, b = this.c.o, y = this;
        d ? (b.__webfontfontdeckmodule__ || (b.__webfontfontdeckmodule__ = {}), b.__webfontfontdeckmodule__[d] = function(T, B) {
          for (var M = 0, Q = B.fonts.length; M < Q; ++M) {
            var ne = B.fonts[M];
            y.a.push(new I(ne.name, wt("font-weight:" + ne.weight + ";font-style:" + ne.style)));
          }
          u(y.a);
        }, P(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + _(this.c) + "/" + d + ".js", function(T) {
          T && u([]);
        })) : u([]);
      };
      var fe = new tn(window);
      fe.a.c.custom = function(u, d) {
        return new w(d, u);
      }, fe.a.c.fontdeck = function(u, d) {
        return new xe(d, u);
      }, fe.a.c.monotype = function(u, d) {
        return new m(d, u);
      }, fe.a.c.typekit = function(u, d) {
        return new J(d, u);
      }, fe.a.c.google = function(u, d) {
        return new z(d, u);
      };
      var Me = { load: s(fe.load, fe) };
      t.exports ? t.exports = Me : (window.WebFont = Me, window.WebFontConfig && fe.load(window.WebFontConfig));
    })();
  }(As)), As.exports;
}
var Gu = Ku();
const Zu = /* @__PURE__ */ Wu(Gu);
function Yu() {
  const t = _e({}), e = _e(""), n = (i, r, o) => {
    t.value = i, console.log("newCustomization", i), e.value = o.full_name ? o.full_name : r, o.profile_pic && (t.value.photo_url = o.profile_pic), i.font_family && Zu.load({
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
const Pn = "ctid", Ju = /* @__PURE__ */ $l({
  __name: "WidgetBuilder",
  props: {
    widgetId: { type: String, required: !0 }
  },
  setup(t, { expose: e }) {
    var p;
    e(), Z.setOptions({
      renderer: new Z.Renderer(),
      gfm: !0,
      breaks: !0
    });
    const n = new Z.Renderer(), s = n.link;
    n.link = (m, w, x) => s.call(n, m, w, x).replace(/^<a /, '<a target="_blank" rel="nofollow" '), Z.use({ renderer: n });
    const i = t, r = He(() => {
      var m;
      return i.widgetId || ((m = window.__INITIAL_DATA__) == null ? void 0 : m.widgetId);
    }), {
      customization: o,
      agentName: l,
      applyCustomization: a,
      initializeFromData: f
    } = Yu(), {
      messages: c,
      loading: g,
      errorMessage: _,
      showError: k,
      loadingHistory: P,
      hasStartedChat: O,
      connectionStatus: j,
      sendMessage: H,
      loadChatHistory: W,
      connect: Y,
      reconnect: I,
      cleanup: D,
      customer: ue,
      onTakeover: N
    } = Vu(), ae = _e(""), wt = _e(!0), be = _e(""), Pe = _e(!1), Xe = _e(!0), ye = _e(((p = window.__INITIAL_DATA__) == null ? void 0 : p.initialToken) || localStorage.getItem(Pn)), xt = He(() => !!ye.value);
    f();
    const Ze = window.__INITIAL_DATA__;
    Ze != null && Ze.initialToken && (ye.value = Ze.initialToken, window.parent.postMessage({
      type: "TOKEN_UPDATE",
      token: Ze.initialToken
    }, "*"), Pe.value = !0);
    const ce = _e(null), {
      chatStyles: X,
      chatIconStyles: K,
      agentBubbleStyles: je,
      userBubbleStyles: dt,
      messageNameStyles: Be,
      headerBorderStyles: we,
      photoUrl: Pt,
      shadowStyle: jt
    } = Jc(o), Ht = He(() => (xt.value || vs(be.value.trim())) && j.value === "connected"), et = async () => {
      ae.value.trim() && (!O.value && be.value && await Ne(), await H(ae.value, be.value), ae.value = "");
    }, tt = (m) => {
      m.key === "Enter" && !m.shiftKey && (m.preventDefault(), et());
    }, Ne = async () => {
      var m;
      try {
        if (!r.value)
          return console.error("Widget ID is not available"), !1;
        const w = new URL(`${Qn.API_URL}/widgets/${r.value}`);
        be.value.trim() && vs(be.value.trim()) && w.searchParams.append("email", be.value.trim());
        const x = {
          Accept: "application/json",
          "Content-Type": "application/json"
        };
        ye.value && (x.Authorization = `Bearer ${ye.value}`);
        const v = await fetch(w, {
          headers: x
        });
        if (v.status === 401)
          return Pe.value = !1, !1;
        const E = await v.json();
        return E.token && (ye.value = E.token, console.log("Token updated:", E.token), localStorage.setItem(Pn, E.token), window.parent.postMessage({ type: "TOKEN_UPDATE", token: E.token }, "*")), Pe.value = !0, await Y() ? (await nt(), (m = E.agent) != null && m.customization && (ue.value = E.customer, a(E.agent.customization, E.agent.display_name, E.customer)), !0) : (console.error("Failed to connect to chat service"), !1);
      } catch (w) {
        return console.error("Error checking authorization:", w), Pe.value = !1, !1;
      } finally {
        Xe.value = !1;
      }
    }, nt = async () => {
      !O.value && Pe.value && (O.value = !0, await W());
    }, Fe = () => {
      ce.value && (ce.value.scrollTop = ce.value.scrollHeight);
    };
    Nn(() => c.value, (m) => {
      $r(() => {
        Fe();
      });
    }, { deep: !0 });
    const tn = async () => {
      await I() && await Ne();
    };
    Kr(async () => {
      if (!await Ne()) {
        j.value = "connected";
        return;
      }
      N(async () => {
        await Ne();
      }), window.addEventListener("message", (w) => {
        w.data.type === "SCROLL_TO_BOTTOM" && Fe(), w.data.type === "TOKEN_RECEIVED" && localStorage.setItem(Pn, w.data.token);
      });
    }), ci(() => {
      window.removeEventListener("message", (m) => {
        m.data.type === "SCROLL_TO_BOTTOM" && Fe();
      }), D();
    });
    const h = { renderer: n, linkRenderer: s, props: i, widgetId: r, customization: o, agentName: l, applyCustomization: a, initializeFromData: f, messages: c, loading: g, errorMessage: _, showError: k, loadingHistory: P, hasStartedChat: O, connectionStatus: j, socketSendMessage: H, loadChatHistory: W, connect: Y, reconnect: I, cleanup: D, customer: ue, onTakeover: N, newMessage: ae, isExpanded: wt, emailInput: be, hasConversationToken: Pe, isInitializing: Xe, TOKEN_KEY: Pn, token: ye, hasToken: xt, initialData: Ze, messagesContainer: ce, chatStyles: X, chatIconStyles: K, agentBubbleStyles: je, userBubbleStyles: dt, messageNameStyles: Be, headerBorderStyles: we, photoUrl: Pt, shadowStyle: jt, isMessageInputEnabled: Ht, sendMessage: et, handleKeyPress: tt, checkAuthorization: Ne, fetchChatHistory: nt, scrollToBottom: Fe, handleReconnect: tn, get isValidEmail() {
      return vs;
    }, get marked() {
      return Z;
    } };
    return Object.defineProperty(h, "__isScriptSetup", { enumerable: !1, value: !0 }), h;
  }
}), Qu = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, i] of e)
    n[s] = i;
  return n;
}, Xu = {
  key: 0,
  class: "initializing-overlay"
}, ef = {
  key: 0,
  class: "connecting-message"
}, tf = {
  key: 1,
  class: "failed-message"
}, nf = { class: "header-content" }, sf = ["src", "alt"], rf = { class: "header-info" }, of = { class: "status" }, lf = {
  key: 0,
  class: "loading-history"
}, af = {
  class: "chat-messages",
  ref: "messagesContainer"
}, cf = ["innerHTML"], uf = { class: "message-info" }, ff = {
  key: 0,
  class: "agent-name"
}, hf = {
  key: 0,
  class: "typing-indicator"
}, pf = {
  key: 0,
  class: "email-input"
}, df = ["disabled"], gf = { class: "message-input" }, mf = ["placeholder", "disabled"], yf = ["disabled"];
function _f(t, e, n, s, i, r) {
  return Re(), Le("div", {
    class: Tt(["chat-container", { collapsed: !s.isExpanded }]),
    style: $e(s.shadowStyle)
  }, [
    s.isInitializing ? (Re(), Le("div", Xu, e[2] || (e[2] = [
      Pa('<div class="loading-spinner" data-v-a3601fa3><div class="dot" data-v-a3601fa3></div><div class="dot" data-v-a3601fa3></div><div class="dot" data-v-a3601fa3></div></div><div class="loading-text" data-v-a3601fa3>Initializing chat...</div>', 2)
    ]))) : st("", !0),
    !s.isInitializing && s.connectionStatus !== "connected" ? (Re(), Le("div", {
      key: 1,
      class: Tt(["connection-status", s.connectionStatus])
    }, [
      s.connectionStatus === "connecting" ? (Re(), Le("div", ef, e[3] || (e[3] = [
        $s(" Connecting to chat service... "),
        G("div", { class: "loading-dots" }, [
          G("div", { class: "dot" }),
          G("div", { class: "dot" }),
          G("div", { class: "dot" })
        ], -1)
      ]))) : s.connectionStatus === "failed" ? (Re(), Le("div", tf, [
        e[4] || (e[4] = $s(" Connection failed. ")),
        G("button", {
          onClick: s.handleReconnect,
          class: "reconnect-button"
        }, " Click here to reconnect ")
      ])) : st("", !0)
    ], 2)) : st("", !0),
    s.showError ? (Re(), Le("div", {
      key: 2,
      class: "error-alert",
      style: $e(s.chatIconStyles)
    }, Cs(s.errorMessage), 5)) : st("", !0),
    s.isExpanded ? (Re(), Le("div", {
      key: 3,
      class: "chat-panel",
      style: $e(s.chatStyles)
    }, [
      G("div", {
        class: "chat-header",
        style: $e(s.headerBorderStyles)
      }, [
        G("div", nf, [
          s.customer.agent_profile_pic || s.photoUrl ? (Re(), Le("img", {
            key: 0,
            src: s.customer.agent_profile_pic || s.photoUrl,
            alt: s.customer.agent_name || s.agentName,
            class: "header-avatar"
          }, null, 8, sf)) : st("", !0),
          G("div", rf, [
            G("h3", {
              style: $e(s.messageNameStyles)
            }, Cs(s.customer.agent_name || s.agentName), 5),
            G("div", of, [
              e[5] || (e[5] = G("span", { class: "status-indicator online" }, null, -1)),
              G("span", {
                class: "status-text",
                style: $e(s.messageNameStyles)
              }, "Online", 4)
            ])
          ])
        ])
      ], 4),
      s.loadingHistory ? (Re(), Le("div", lf, e[6] || (e[6] = [
        G("div", { class: "loading-spinner" }, [
          G("div", { class: "dot" }),
          G("div", { class: "dot" }),
          G("div", { class: "dot" })
        ], -1)
      ]))) : st("", !0),
      G("div", af, [
        (Re(!0), Le(lt, null, Ql(s.messages, (o, l) => (Re(), Le("div", {
          key: l,
          class: Tt([
            "message",
            o.message_type === "bot" || o.message_type === "agent" ? "agent-message" : o.message_type === "system" ? "system-message" : "user-message"
          ])
        }, [
          G("div", {
            class: "message-bubble",
            style: $e(o.message_type === "system" ? {} : o.message_type === "user" ? s.userBubbleStyles : s.agentBubbleStyles)
          }, [
            G("div", {
              innerHTML: s.marked(o.message, { renderer: s.renderer })
            }, null, 8, cf)
          ], 4),
          G("div", uf, [
            o.message_type === "user" ? (Re(), Le("span", ff, " You ")) : st("", !0)
          ])
        ], 2))), 128)),
        s.loading ? (Re(), Le("div", hf, e[7] || (e[7] = [
          G("div", { class: "dot" }, null, -1),
          G("div", { class: "dot" }, null, -1),
          G("div", { class: "dot" }, null, -1)
        ]))) : st("", !0)
      ], 512),
      G("div", {
        class: "chat-input",
        style: $e(s.agentBubbleStyles)
      }, [
        !s.hasStartedChat && !s.hasConversationToken ? (Re(), Le("div", pf, [
          Ci(G("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (o) => s.emailInput = o),
            type: "email",
            placeholder: "Enter your email address to begin",
            disabled: s.loading || s.connectionStatus !== "connected",
            class: Tt({
              invalid: s.emailInput.trim() && !s.isValidEmail(s.emailInput.trim()),
              disabled: s.connectionStatus !== "connected"
            })
          }, null, 10, df), [
            [er, s.emailInput]
          ])
        ])) : st("", !0),
        G("div", gf, [
          Ci(G("input", {
            "onUpdate:modelValue": e[1] || (e[1] = (o) => s.newMessage = o),
            type: "text",
            placeholder: s.connectionStatus === "connected" ? "Type a message..." : "Connecting...",
            onKeypress: s.handleKeyPress,
            disabled: !s.isMessageInputEnabled,
            class: Tt({ disabled: s.connectionStatus !== "connected" })
          }, null, 42, mf), [
            [er, s.newMessage]
          ]),
          G("button", {
            class: "send-button",
            style: $e(s.userBubbleStyles),
            onClick: s.sendMessage,
            disabled: !s.newMessage.trim() || !s.isMessageInputEnabled
          }, e[8] || (e[8] = [
            G("svg", {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              G("path", {
                d: "M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              })
            ], -1)
          ]), 12, yf)
        ])
      ], 4),
      G("div", {
        class: "powered-by",
        style: $e(s.messageNameStyles)
      }, " Powered by ChatterMate ", 4)
    ], 4)) : st("", !0)
  ], 6);
}
const bf = /* @__PURE__ */ Qu(Ju, [["render", _f], ["__scopeId", "data-v-a3601fa3"], ["__file", "/Users/arunrajkumar/Documents/Personal/code/chattermate.chat/frontend/src/webclient/WidgetBuilder.vue"]]);
window.process || (window.process = { env: { NODE_ENV: "production" } });
const wf = new URL(window.location.href), xf = wf.searchParams.get("widget_id"), kf = fc(bf, {
  widgetId: xf
});
kf.mount("#app");
