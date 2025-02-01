var zo = Object.defineProperty;
var Vo = (t, e, n) => e in t ? zo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ae = (t, e, n) => Vo(t, typeof e != "symbol" ? e + "" : e, n);
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Gs(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const ue = {}, Zt = [], at = () => {
}, Wo = () => !1, Jn = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), Zs = (t) => t.startsWith("onUpdate:"), Ae = Object.assign, Ys = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Ko = Object.prototype.hasOwnProperty, re = (t, e) => Ko.call(t, e), D = Array.isArray, Yt = (t) => Qn(t) === "[object Map]", pr = (t) => Qn(t) === "[object Set]", q = (t) => typeof t == "function", we = (t) => typeof t == "string", Pt = (t) => typeof t == "symbol", me = (t) => t !== null && typeof t == "object", dr = (t) => (me(t) || q(t)) && q(t.then) && q(t.catch), gr = Object.prototype.toString, Qn = (t) => gr.call(t), Go = (t) => Qn(t).slice(8, -1), mr = (t) => Qn(t) === "[object Object]", Js = (t) => we(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, un = /* @__PURE__ */ Gs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Xn = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Zo = /-(\w)/g, Ot = Xn(
  (t) => t.replace(Zo, (e, n) => n ? n.toUpperCase() : "")
), Yo = /\B([A-Z])/g, jt = Xn(
  (t) => t.replace(Yo, "-$1").toLowerCase()
), yr = Xn((t) => t.charAt(0).toUpperCase() + t.slice(1)), fs = Xn(
  (t) => t ? `on${yr(t)}` : ""
), At = (t, e) => !Object.is(t, e), Bn = (t, ...e) => {
  for (let n = 0; n < t.length; n++)
    t[n](...e);
}, br = (t, e, n, s = !1) => {
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
const es = () => Ti || (Ti = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function He(t) {
  if (D(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const s = t[n], i = we(s) ? el(s) : He(s);
      if (i)
        for (const r in i)
          e[r] = i[r];
    }
    return e;
  } else if (we(t) || me(t))
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
function Rt(t) {
  let e = "";
  if (we(t))
    e = t;
  else if (D(t))
    for (let n = 0; n < t.length; n++) {
      const s = Rt(t[n]);
      s && (e += s + " ");
    }
  else if (me(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const tl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", nl = /* @__PURE__ */ Gs(tl);
function _r(t) {
  return !!t || t === "";
}
const wr = (t) => !!(t && t.__v_isRef === !0), As = (t) => we(t) ? t : t == null ? "" : D(t) || me(t) && (t.toString === gr || !q(t.toString)) ? wr(t) ? As(t.value) : JSON.stringify(t, xr, 2) : String(t), xr = (t, e) => wr(e) ? xr(t, e.value) : Yt(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [s, i], r) => (n[hs(s, r) + " =>"] = i, n),
    {}
  )
} : pr(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => hs(n))
} : Pt(e) ? hs(e) : me(e) && !D(e) && !mr(e) ? String(e) : e, hs = (t, e = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Pt(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let je;
class sl {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = je, !e && je && (this.index = (je.scopes || (je.scopes = [])).push(
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
      const n = je;
      try {
        return je = this, e();
      } finally {
        je = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    je = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    je = this.parent;
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
  return je;
}
let fe;
const ps = /* @__PURE__ */ new WeakSet();
class kr {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, je && je.active && je.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ps.has(this) && (ps.delete(this), this.trigger()));
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
    const e = fe, n = et;
    fe = this, et = !0;
    try {
      return this.fn();
    } finally {
      Er(this), fe = e, et = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        ei(e);
      this.deps = this.depsTail = void 0, Ei(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ps.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Cs(this) && this.run();
  }
  get dirty() {
    return Cs(this);
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
function Qs() {
  vr++;
}
function Xs() {
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
    s.version === -1 ? (s === n && (n = i), ei(s), rl(s)) : e = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  t.deps = e, t.depsTail = n;
}
function Cs(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (Rr(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function Rr(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === bn))
    return;
  t.globalVersion = bn;
  const e = t.dep;
  if (t.flags |= 2, e.version > 0 && !t.isSSR && t.deps && !Cs(t)) {
    t.flags &= -3;
    return;
  }
  const n = fe, s = et;
  fe = t, et = !0;
  try {
    Tr(t);
    const i = t.fn(t._value);
    (e.version === 0 || At(i, t._value)) && (t._value = i, e.version++);
  } catch (i) {
    throw e.version++, i;
  } finally {
    fe = n, et = s, Er(t), t.flags &= -3;
  }
}
function ei(t, e = !1) {
  const { dep: n, prevSub: s, nextSub: i } = t;
  if (s && (s.nextSub = i, t.prevSub = void 0), i && (i.prevSub = s, t.nextSub = void 0), n.subs === t && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      ei(r, !0);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
function rl(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let et = !0;
const Ar = [];
function It() {
  Ar.push(et), et = !1;
}
function Bt() {
  const t = Ar.pop();
  et = t === void 0 ? !0 : t;
}
function Ei(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const n = fe;
    fe = void 0;
    try {
      e();
    } finally {
      fe = n;
    }
  }
}
let bn = 0;
class ol {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ti {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(e) {
    if (!fe || !et || fe === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== fe)
      n = this.activeLink = new ol(fe, this), fe.deps ? (n.prevDep = fe.depsTail, fe.depsTail.nextDep = n, fe.depsTail = n) : fe.deps = fe.depsTail = n, Cr(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = fe.depsTail, n.nextDep = void 0, fe.depsTail.nextDep = n, fe.depsTail = n, fe.deps === n && (fe.deps = s);
    }
    return n;
  }
  trigger(e) {
    this.version++, bn++, this.notify(e);
  }
  notify(e) {
    Qs();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Xs();
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
const Os = /* @__PURE__ */ new WeakMap(), Mt = Symbol(
  ""
), Ps = Symbol(
  ""
), _n = Symbol(
  ""
);
function Te(t, e, n) {
  if (et && fe) {
    let s = Os.get(t);
    s || Os.set(t, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new ti()), i.map = s, i.key = n), i.track();
  }
}
function bt(t, e, n, s, i, r) {
  const o = Os.get(t);
  if (!o) {
    bn++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (Qs(), e === "clear")
    o.forEach(l);
  else {
    const c = D(t), f = c && Js(n);
    if (c && n === "length") {
      const a = Number(s);
      o.forEach((g, b) => {
        (b === "length" || b === _n || !Pt(b) && b >= a) && l(g);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), f && l(o.get(_n)), e) {
        case "add":
          c ? f && l(o.get("length")) : (l(o.get(Mt)), Yt(t) && l(o.get(Ps)));
          break;
        case "delete":
          c || (l(o.get(Mt)), Yt(t) && l(o.get(Ps)));
          break;
        case "set":
          Yt(t) && l(o.get(Mt));
          break;
      }
  }
  Xs();
}
function Wt(t) {
  const e = ie(t);
  return e === t ? e : (Te(e, "iterate", _n), Je(t) ? e : e.map(Ee));
}
function ts(t) {
  return Te(t = ie(t), "iterate", _n), t;
}
const ll = {
  __proto__: null,
  [Symbol.iterator]() {
    return ds(this, Symbol.iterator, Ee);
  },
  concat(...t) {
    return Wt(this).concat(
      ...t.map((e) => D(e) ? Wt(e) : e)
    );
  },
  entries() {
    return ds(this, "entries", (t) => (t[1] = Ee(t[1]), t));
  },
  every(t, e) {
    return gt(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return gt(this, "filter", t, e, (n) => n.map(Ee), arguments);
  },
  find(t, e) {
    return gt(this, "find", t, e, Ee, arguments);
  },
  findIndex(t, e) {
    return gt(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return gt(this, "findLast", t, e, Ee, arguments);
  },
  findLastIndex(t, e) {
    return gt(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return gt(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return gs(this, "includes", t);
  },
  indexOf(...t) {
    return gs(this, "indexOf", t);
  },
  join(t) {
    return Wt(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return gs(this, "lastIndexOf", t);
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
    return Ri(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return Ri(this, "reduceRight", t, e);
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
    return Wt(this).toReversed();
  },
  toSorted(t) {
    return Wt(this).toSorted(t);
  },
  toSpliced(...t) {
    return Wt(this).toSpliced(...t);
  },
  unshift(...t) {
    return nn(this, "unshift", t);
  },
  values() {
    return ds(this, "values", Ee);
  }
};
function ds(t, e, n) {
  const s = ts(t), i = s[e]();
  return s !== t && !Je(t) && (i._next = i.next, i.next = () => {
    const r = i._next();
    return r.value && (r.value = n(r.value)), r;
  }), i;
}
const cl = Array.prototype;
function gt(t, e, n, s, i, r) {
  const o = ts(t), l = o !== t && !Je(t), c = o[e];
  if (c !== cl[e]) {
    const g = c.apply(t, r);
    return l ? Ee(g) : g;
  }
  let f = n;
  o !== t && (l ? f = function(g, b) {
    return n.call(this, Ee(g), b, t);
  } : n.length > 2 && (f = function(g, b) {
    return n.call(this, g, b, t);
  }));
  const a = c.call(o, f, s);
  return l && i ? i(a) : a;
}
function Ri(t, e, n, s) {
  const i = ts(t);
  let r = n;
  return i !== t && (Je(t) ? n.length > 3 && (r = function(o, l, c) {
    return n.call(this, o, l, c, t);
  }) : r = function(o, l, c) {
    return n.call(this, o, Ee(l), c, t);
  }), i[e](r, ...s);
}
function gs(t, e, n) {
  const s = ie(t);
  Te(s, "iterate", _n);
  const i = s[e](...n);
  return (i === -1 || i === !1) && ri(n[0]) ? (n[0] = ie(n[0]), s[e](...n)) : i;
}
function nn(t, e, n = []) {
  It(), Qs();
  const s = ie(t)[e].apply(t, n);
  return Xs(), Bt(), s;
}
const al = /* @__PURE__ */ Gs("__proto__,__v_isRef,__isVue"), Or = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Pt)
);
function ul(t) {
  Pt(t) || (t = String(t));
  const e = ie(this);
  return Te(e, "has", t), e.hasOwnProperty(t);
}
class Pr {
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
      return s === (i ? r ? wl : $r : r ? Lr : Br).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(s) ? e : void 0;
    const o = D(e);
    if (!i) {
      let c;
      if (o && (c = ll[n]))
        return c;
      if (n === "hasOwnProperty")
        return ul;
    }
    const l = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Re(e) ? e : s
    );
    return (Pt(n) ? Or.has(n) : al(n)) || (i || Te(e, "get", n), r) ? l : Re(l) ? o && Js(n) ? l : l.value : me(l) ? i ? Nr(l) : si(l) : l;
  }
}
class Ir extends Pr {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, s, i) {
    let r = e[n];
    if (!this._isShallow) {
      const c = Dt(r);
      if (!Je(s) && !Dt(s) && (r = ie(r), s = ie(s)), !D(e) && Re(r) && !Re(s))
        return c ? !1 : (r.value = s, !0);
    }
    const o = D(e) && Js(n) ? Number(n) < e.length : re(e, n), l = Reflect.set(
      e,
      n,
      s,
      Re(e) ? e : i
    );
    return e === ie(i) && (o ? At(s, r) && bt(e, "set", n, s) : bt(e, "add", n, s)), l;
  }
  deleteProperty(e, n) {
    const s = re(e, n);
    e[n];
    const i = Reflect.deleteProperty(e, n);
    return i && s && bt(e, "delete", n, void 0), i;
  }
  has(e, n) {
    const s = Reflect.has(e, n);
    return (!Pt(n) || !Or.has(n)) && Te(e, "has", n), s;
  }
  ownKeys(e) {
    return Te(
      e,
      "iterate",
      D(e) ? "length" : Mt
    ), Reflect.ownKeys(e);
  }
}
class fl extends Pr {
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
const hl = /* @__PURE__ */ new Ir(), pl = /* @__PURE__ */ new fl(), dl = /* @__PURE__ */ new Ir(!0);
const Is = (t) => t, Rn = (t) => Reflect.getPrototypeOf(t);
function gl(t, e, n) {
  return function(...s) {
    const i = this.__v_raw, r = ie(i), o = Yt(r), l = t === "entries" || t === Symbol.iterator && o, c = t === "keys" && o, f = i[t](...s), a = n ? Is : e ? Bs : Ee;
    return !e && Te(
      r,
      "iterate",
      c ? Ps : Mt
    ), {
      // iterator protocol
      next() {
        const { value: g, done: b } = f.next();
        return b ? { value: g, done: b } : {
          value: l ? [a(g[0]), a(g[1])] : a(g),
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
function An(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function ml(t, e) {
  const n = {
    get(i) {
      const r = this.__v_raw, o = ie(r), l = ie(i);
      t || (At(i, l) && Te(o, "get", i), Te(o, "get", l));
      const { has: c } = Rn(o), f = e ? Is : t ? Bs : Ee;
      if (c.call(o, i))
        return f(r.get(i));
      if (c.call(o, l))
        return f(r.get(l));
      r !== o && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !t && Te(ie(i), "iterate", Mt), Reflect.get(i, "size", i);
    },
    has(i) {
      const r = this.__v_raw, o = ie(r), l = ie(i);
      return t || (At(i, l) && Te(o, "has", i), Te(o, "has", l)), i === l ? r.has(i) : r.has(i) || r.has(l);
    },
    forEach(i, r) {
      const o = this, l = o.__v_raw, c = ie(l), f = e ? Is : t ? Bs : Ee;
      return !t && Te(c, "iterate", Mt), l.forEach((a, g) => i.call(r, f(a), f(g), o));
    }
  };
  return Ae(
    n,
    t ? {
      add: An("add"),
      set: An("set"),
      delete: An("delete"),
      clear: An("clear")
    } : {
      add(i) {
        !e && !Je(i) && !Dt(i) && (i = ie(i));
        const r = ie(this);
        return Rn(r).has.call(r, i) || (r.add(i), bt(r, "add", i, i)), this;
      },
      set(i, r) {
        !e && !Je(r) && !Dt(r) && (r = ie(r));
        const o = ie(this), { has: l, get: c } = Rn(o);
        let f = l.call(o, i);
        f || (i = ie(i), f = l.call(o, i));
        const a = c.call(o, i);
        return o.set(i, r), f ? At(r, a) && bt(o, "set", i, r) : bt(o, "add", i, r), this;
      },
      delete(i) {
        const r = ie(this), { has: o, get: l } = Rn(r);
        let c = o.call(r, i);
        c || (i = ie(i), c = o.call(r, i)), l && l.call(r, i);
        const f = r.delete(i);
        return c && bt(r, "delete", i, void 0), f;
      },
      clear() {
        const i = ie(this), r = i.size !== 0, o = i.clear();
        return r && bt(
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
function ni(t, e) {
  const n = ml(t, e);
  return (s, i, r) => i === "__v_isReactive" ? !t : i === "__v_isReadonly" ? t : i === "__v_raw" ? s : Reflect.get(
    re(n, i) && i in s ? n : s,
    i,
    r
  );
}
const yl = {
  get: /* @__PURE__ */ ni(!1, !1)
}, bl = {
  get: /* @__PURE__ */ ni(!1, !0)
}, _l = {
  get: /* @__PURE__ */ ni(!0, !1)
};
const Br = /* @__PURE__ */ new WeakMap(), Lr = /* @__PURE__ */ new WeakMap(), $r = /* @__PURE__ */ new WeakMap(), wl = /* @__PURE__ */ new WeakMap();
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
function si(t) {
  return Dt(t) ? t : ii(
    t,
    !1,
    hl,
    yl,
    Br
  );
}
function vl(t) {
  return ii(
    t,
    !1,
    dl,
    bl,
    Lr
  );
}
function Nr(t) {
  return ii(
    t,
    !0,
    pl,
    _l,
    $r
  );
}
function ii(t, e, n, s, i) {
  if (!me(t) || t.__v_raw && !(e && t.__v_isReactive))
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
function Jt(t) {
  return Dt(t) ? Jt(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Dt(t) {
  return !!(t && t.__v_isReadonly);
}
function Je(t) {
  return !!(t && t.__v_isShallow);
}
function ri(t) {
  return t ? !!t.__v_raw : !1;
}
function ie(t) {
  const e = t && t.__v_raw;
  return e ? ie(e) : t;
}
function Sl(t) {
  return !re(t, "__v_skip") && Object.isExtensible(t) && br(t, "__v_skip", !0), t;
}
const Ee = (t) => me(t) ? si(t) : t, Bs = (t) => me(t) ? Nr(t) : t;
function Re(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function Se(t) {
  return Tl(t, !1);
}
function Tl(t, e) {
  return Re(t) ? t : new El(t, e);
}
class El {
  constructor(e, n) {
    this.dep = new ti(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? e : ie(e), this._value = n ? e : Ee(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, s = this.__v_isShallow || Je(e) || Dt(e);
    e = s ? e : ie(e), At(e, n) && (this._rawValue = e, this._value = s ? e : Ee(e), this.dep.trigger());
  }
}
function j(t) {
  return Re(t) ? t.value : t;
}
const Rl = {
  get: (t, e, n) => e === "__v_raw" ? t : j(Reflect.get(t, e, n)),
  set: (t, e, n, s) => {
    const i = t[e];
    return Re(i) && !Re(n) ? (i.value = n, !0) : Reflect.set(t, e, n, s);
  }
};
function Fr(t) {
  return Jt(t) ? t : new Proxy(t, Rl);
}
class Al {
  constructor(e, n, s) {
    this.fn = e, this.setter = n, this._value = void 0, this.dep = new ti(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = bn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    fe !== this)
      return Sr(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Rr(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
function Cl(t, e, n = !1) {
  let s, i;
  return q(t) ? s = t : (s = t.get, i = t.set), new Al(s, i, n);
}
const Cn = {}, jn = /* @__PURE__ */ new WeakMap();
let Ft;
function Ol(t, e = !1, n = Ft) {
  if (n) {
    let s = jn.get(n);
    s || jn.set(n, s = []), s.push(t);
  }
}
function Pl(t, e, n = ue) {
  const { immediate: s, deep: i, once: r, scheduler: o, augmentJob: l, call: c } = n, f = (I) => i ? I : Je(I) || i === !1 || i === 0 ? _t(I, 1) : _t(I);
  let a, g, b, w, O = !1, P = !1;
  if (Re(t) ? (g = () => t.value, O = Je(t)) : Jt(t) ? (g = () => f(t), O = !0) : D(t) ? (P = !0, O = t.some((I) => Jt(I) || Je(I)), g = () => t.map((I) => {
    if (Re(I))
      return I.value;
    if (Jt(I))
      return f(I);
    if (q(I))
      return c ? c(I, 2) : I();
  })) : q(t) ? e ? g = c ? () => c(t, 2) : t : g = () => {
    if (b) {
      It();
      try {
        b();
      } finally {
        Bt();
      }
    }
    const I = Ft;
    Ft = a;
    try {
      return c ? c(t, 3, [w]) : t(w);
    } finally {
      Ft = I;
    }
  } : g = at, e && i) {
    const I = g, F = i === !0 ? 1 / 0 : i;
    g = () => _t(I(), F);
  }
  const V = il(), U = () => {
    a.stop(), V && V.active && Ys(V.effects, a);
  };
  if (r && e) {
    const I = e;
    e = (...F) => {
      I(...F), U();
    };
  }
  let Q = P ? new Array(t.length).fill(Cn) : Cn;
  const ee = (I) => {
    if (!(!(a.flags & 1) || !a.dirty && !I))
      if (e) {
        const F = a.run();
        if (i || O || (P ? F.some((W, H) => At(W, Q[H])) : At(F, Q))) {
          b && b();
          const W = Ft;
          Ft = a;
          try {
            const H = [
              F,
              // pass undefined as the old value when it's changed for the first time
              Q === Cn ? void 0 : P && Q[0] === Cn ? [] : Q,
              w
            ];
            c ? c(e, 3, H) : (
              // @ts-expect-error
              e(...H)
            ), Q = F;
          } finally {
            Ft = W;
          }
        }
      } else
        a.run();
  };
  return l && l(ee), a = new kr(g), a.scheduler = o ? () => o(ee, !1) : ee, w = (I) => Ol(I, !1, a), b = a.onStop = () => {
    const I = jn.get(a);
    if (I) {
      if (c)
        c(I, 4);
      else
        for (const F of I) F();
      jn.delete(a);
    }
  }, e ? s ? ee(!0) : Q = a.run() : o ? o(ee.bind(null, !0), !0) : a.run(), U.pause = a.pause.bind(a), U.resume = a.resume.bind(a), U.stop = U, U;
}
function _t(t, e = 1 / 0, n) {
  if (e <= 0 || !me(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(t)))
    return t;
  if (n.add(t), e--, Re(t))
    _t(t.value, e, n);
  else if (D(t))
    for (let s = 0; s < t.length; s++)
      _t(t[s], e, n);
  else if (pr(t) || Yt(t))
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
    ns(i, e, n);
  }
}
function ft(t, e, n, s) {
  if (q(t)) {
    const i = vn(t, e, n, s);
    return i && dr(i) && i.catch((r) => {
      ns(r, e, n);
    }), i;
  }
  if (D(t)) {
    const i = [];
    for (let r = 0; r < t.length; r++)
      i.push(ft(t[r], e, n, s));
    return i;
  }
}
function ns(t, e, n, s = !0) {
  const i = e ? e.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: o } = e && e.appContext.config || ue;
  if (e) {
    let l = e.parent;
    const c = e.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let g = 0; g < a.length; g++)
          if (a[g](t, c, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      It(), vn(r, null, 10, [
        t,
        c,
        f
      ]), Bt();
      return;
    }
  }
  Il(t, n, i, s, o);
}
function Il(t, e, n, s = !0, i = !1) {
  if (i)
    throw t;
  console.error(t);
}
const Ie = [];
let rt = -1;
const Qt = [];
let Tt = null, Kt = 0;
const Mr = /* @__PURE__ */ Promise.resolve();
let Un = null;
function Dr(t) {
  const e = Un || Mr;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Bl(t) {
  let e = rt + 1, n = Ie.length;
  for (; e < n; ) {
    const s = e + n >>> 1, i = Ie[s], r = wn(i);
    r < t || r === t && i.flags & 2 ? e = s + 1 : n = s;
  }
  return e;
}
function oi(t) {
  if (!(t.flags & 1)) {
    const e = wn(t), n = Ie[Ie.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= wn(n) ? Ie.push(t) : Ie.splice(Bl(e), 0, t), t.flags |= 1, qr();
  }
}
function qr() {
  Un || (Un = Mr.then(jr));
}
function Ll(t) {
  D(t) ? Qt.push(...t) : Tt && t.id === -1 ? Tt.splice(Kt + 1, 0, t) : t.flags & 1 || (Qt.push(t), t.flags |= 1), qr();
}
function Ai(t, e, n = rt + 1) {
  for (; n < Ie.length; n++) {
    const s = Ie[n];
    if (s && s.flags & 2) {
      if (t && s.id !== t.uid)
        continue;
      Ie.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Hr(t) {
  if (Qt.length) {
    const e = [...new Set(Qt)].sort(
      (n, s) => wn(n) - wn(s)
    );
    if (Qt.length = 0, Tt) {
      Tt.push(...e);
      return;
    }
    for (Tt = e, Kt = 0; Kt < Tt.length; Kt++) {
      const n = Tt[Kt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Tt = null, Kt = 0;
  }
}
const wn = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function jr(t) {
  try {
    for (rt = 0; rt < Ie.length; rt++) {
      const e = Ie[rt];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), vn(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; rt < Ie.length; rt++) {
      const e = Ie[rt];
      e && (e.flags &= -2);
    }
    rt = -1, Ie.length = 0, Hr(), Un = null, (Ie.length || Qt.length) && jr();
  }
}
let Ge = null, Ur = null;
function zn(t) {
  const e = Ge;
  return Ge = t, Ur = t && t.type.__scopeId || null, e;
}
function $l(t, e = Ge, n) {
  if (!e || t._n)
    return t;
  const s = (...i) => {
    s._d && Mi(-1);
    const r = zn(e);
    let o;
    try {
      o = t(...i);
    } finally {
      zn(r), s._d && Mi(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Ci(t, e) {
  if (Ge === null)
    return t;
  const n = os(Ge), s = t.dirs || (t.dirs = []);
  for (let i = 0; i < e.length; i++) {
    let [r, o, l, c = ue] = e[i];
    r && (q(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && _t(o), s.push({
      dir: r,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return t;
}
function $t(t, e, n, s) {
  const i = t.dirs, r = e && e.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    r && (l.oldValue = r[o].value);
    let c = l.dir[s];
    c && (It(), ft(c, n, 8, [
      t.el,
      l,
      t,
      e
    ]), Bt());
  }
}
const Nl = Symbol("_vte"), Fl = (t) => t.__isTeleport;
function li(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, li(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ml(t, e) {
  return q(t) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ae({ name: t.name }, e, { setup: t })
  ) : t;
}
function zr(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function Vn(t, e, n, s, i = !1) {
  if (D(t)) {
    t.forEach(
      (O, P) => Vn(
        O,
        e && (D(e) ? e[P] : e),
        n,
        s,
        i
      )
    );
    return;
  }
  if (pn(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Vn(t, e, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? os(s.component) : s.el, o = i ? null : r, { i: l, r: c } = t, f = e && e.r, a = l.refs === ue ? l.refs = {} : l.refs, g = l.setupState, b = ie(g), w = g === ue ? () => !1 : (O) => re(b, O);
  if (f != null && f !== c && (we(f) ? (a[f] = null, w(f) && (g[f] = null)) : Re(f) && (f.value = null)), q(c))
    vn(c, l, 12, [o, a]);
  else {
    const O = we(c), P = Re(c);
    if (O || P) {
      const V = () => {
        if (t.f) {
          const U = O ? w(c) ? g[c] : a[c] : c.value;
          i ? D(U) && Ys(U, r) : D(U) ? U.includes(r) || U.push(r) : O ? (a[c] = [r], w(c) && (g[c] = a[c])) : (c.value = [r], t.k && (a[t.k] = c.value));
        } else O ? (a[c] = o, w(c) && (g[c] = o)) : P && (c.value = o, t.k && (a[t.k] = o));
      };
      o ? (V.id = -1, qe(V, n)) : V();
    }
  }
}
es().requestIdleCallback;
es().cancelIdleCallback;
const pn = (t) => !!t.type.__asyncLoader, Vr = (t) => t.type.__isKeepAlive;
function Dl(t, e) {
  Wr(t, "a", e);
}
function ql(t, e) {
  Wr(t, "da", e);
}
function Wr(t, e, n = Be) {
  const s = t.__wdc || (t.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return t();
  });
  if (ss(e, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      Vr(i.parent.vnode) && Hl(s, e, n, i), i = i.parent;
  }
}
function Hl(t, e, n, s) {
  const i = ss(
    e,
    t,
    s,
    !0
    /* prepend */
  );
  ci(() => {
    Ys(s[e], i);
  }, n);
}
function ss(t, e, n = Be, s = !1) {
  if (n) {
    const i = n[t] || (n[t] = []), r = e.__weh || (e.__weh = (...o) => {
      It();
      const l = Sn(n), c = ft(e, n, t, o);
      return l(), Bt(), c;
    });
    return s ? i.unshift(r) : i.push(r), r;
  }
}
const xt = (t) => (e, n = Be) => {
  (!kn || t === "sp") && ss(t, (...s) => e(...s), n);
}, jl = xt("bm"), Kr = xt("m"), Ul = xt(
  "bu"
), zl = xt("u"), Vl = xt(
  "bum"
), ci = xt("um"), Wl = xt(
  "sp"
), Kl = xt("rtg"), Gl = xt("rtc");
function Zl(t, e = Be) {
  ss("ec", t, e);
}
const Yl = Symbol.for("v-ndc");
function Jl(t, e, n, s) {
  let i;
  const r = n, o = D(t);
  if (o || we(t)) {
    const l = o && Jt(t);
    let c = !1;
    l && (c = !Je(t), t = ts(t)), i = new Array(t.length);
    for (let f = 0, a = t.length; f < a; f++)
      i[f] = e(
        c ? Ee(t[f]) : t[f],
        f,
        void 0,
        r
      );
  } else if (typeof t == "number") {
    i = new Array(t);
    for (let l = 0; l < t; l++)
      i[l] = e(l + 1, l, void 0, r);
  } else if (me(t))
    if (t[Symbol.iterator])
      i = Array.from(
        t,
        (l, c) => e(l, c, void 0, r)
      );
    else {
      const l = Object.keys(t);
      i = new Array(l.length);
      for (let c = 0, f = l.length; c < f; c++) {
        const a = l[c];
        i[c] = e(t[a], a, c, r);
      }
    }
  else
    i = [];
  return i;
}
const Ls = (t) => t ? mo(t) ? os(t) : Ls(t.parent) : null, dn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ae(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => Ls(t.parent),
    $root: (t) => Ls(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => Zr(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      oi(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = Dr.bind(t.proxy)),
    $watch: (t) => _c.bind(t)
  })
), ms = (t, e) => t !== ue && !t.__isScriptSetup && re(t, e), Ql = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: i, props: r, accessCache: o, type: l, appContext: c } = t;
    let f;
    if (e[0] !== "$") {
      const w = o[e];
      if (w !== void 0)
        switch (w) {
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
        if (ms(s, e))
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
        $s && (o[e] = 0);
      }
    }
    const a = dn[e];
    let g, b;
    if (a)
      return e === "$attrs" && Te(t.attrs, "get", ""), a(t);
    if (
      // css module (injected by vue-loader)
      (g = l.__cssModules) && (g = g[e])
    )
      return g;
    if (n !== ue && re(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      b = c.config.globalProperties, re(b, e)
    )
      return b[e];
  },
  set({ _: t }, e, n) {
    const { data: s, setupState: i, ctx: r } = t;
    return ms(i, e) ? (i[e] = n, !0) : s !== ue && re(s, e) ? (s[e] = n, !0) : re(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (r[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: s, appContext: i, propsOptions: r }
  }, o) {
    let l;
    return !!n[o] || t !== ue && re(t, o) || ms(e, o) || (l = r[0]) && re(l, o) || re(s, o) || re(dn, o) || re(i.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : re(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function Oi(t) {
  return D(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let $s = !0;
function Xl(t) {
  const e = Zr(t), n = t.proxy, s = t.ctx;
  $s = !1, e.beforeCreate && Pi(e.beforeCreate, t, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: o,
    watch: l,
    provide: c,
    inject: f,
    // lifecycle
    created: a,
    beforeMount: g,
    mounted: b,
    beforeUpdate: w,
    updated: O,
    activated: P,
    deactivated: V,
    beforeDestroy: U,
    beforeUnmount: Q,
    destroyed: ee,
    unmounted: I,
    render: F,
    renderTracked: W,
    renderTriggered: H,
    errorCaptured: te,
    serverPrefetch: $e,
    // public API
    expose: ze,
    inheritAttrs: Ve,
    // assets
    components: pt,
    directives: Fe,
    filters: kt
  } = e;
  if (f && ec(f, s, null), o)
    for (const se in o) {
      const G = o[se];
      q(G) && (s[se] = G.bind(n));
    }
  if (i) {
    const se = i.call(n, n);
    me(se) && (t.data = si(se));
  }
  if ($s = !0, r)
    for (const se in r) {
      const G = r[se], We = q(G) ? G.bind(n, n) : q(G.get) ? G.get.bind(n, n) : at, tt = !q(G) && q(G.set) ? G.set.bind(n) : at, Ce = ot({
        get: We,
        set: tt
      });
      Object.defineProperty(s, se, {
        enumerable: !0,
        configurable: !0,
        get: () => Ce.value,
        set: (ke) => Ce.value = ke
      });
    }
  if (l)
    for (const se in l)
      Gr(l[se], s, n, se);
  if (c) {
    const se = q(c) ? c.call(n) : c;
    Reflect.ownKeys(se).forEach((G) => {
      oc(G, se[G]);
    });
  }
  a && Pi(a, t, "c");
  function he(se, G) {
    D(G) ? G.forEach((We) => se(We.bind(n))) : G && se(G.bind(n));
  }
  if (he(jl, g), he(Kr, b), he(Ul, w), he(zl, O), he(Dl, P), he(ql, V), he(Zl, te), he(Gl, W), he(Kl, H), he(Vl, Q), he(ci, I), he(Wl, $e), D(ze))
    if (ze.length) {
      const se = t.exposed || (t.exposed = {});
      ze.forEach((G) => {
        Object.defineProperty(se, G, {
          get: () => n[G],
          set: (We) => n[G] = We
        });
      });
    } else t.exposed || (t.exposed = {});
  F && t.render === at && (t.render = F), Ve != null && (t.inheritAttrs = Ve), pt && (t.components = pt), Fe && (t.directives = Fe), $e && zr(t);
}
function ec(t, e, n = at) {
  D(t) && (t = Ns(t));
  for (const s in t) {
    const i = t[s];
    let r;
    me(i) ? "default" in i ? r = Ln(
      i.from || s,
      i.default,
      !0
    ) : r = Ln(i.from || s) : r = Ln(i), Re(r) ? Object.defineProperty(e, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (o) => r.value = o
    }) : e[s] = r;
  }
}
function Pi(t, e, n) {
  ft(
    D(t) ? t.map((s) => s.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function Gr(t, e, n, s) {
  let i = s.includes(".") ? ao(n, s) : () => n[s];
  if (we(t)) {
    const r = e[t];
    q(r) && $n(i, r);
  } else if (q(t))
    $n(i, t.bind(n));
  else if (me(t))
    if (D(t))
      t.forEach((r) => Gr(r, e, n, s));
    else {
      const r = q(t.handler) ? t.handler.bind(n) : e[t.handler];
      q(r) && $n(i, r, t);
    }
}
function Zr(t) {
  const e = t.type, { mixins: n, extends: s } = e, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = r.get(e);
  let c;
  return l ? c = l : !i.length && !n && !s ? c = e : (c = {}, i.length && i.forEach(
    (f) => Wn(c, f, o, !0)
  ), Wn(c, e, o)), me(e) && r.set(e, c), c;
}
function Wn(t, e, n, s = !1) {
  const { mixins: i, extends: r } = e;
  r && Wn(t, r, n, !0), i && i.forEach(
    (o) => Wn(t, o, n, !0)
  );
  for (const o in e)
    if (!(s && o === "expose")) {
      const l = tc[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const tc = {
  data: Ii,
  props: Bi,
  emits: Bi,
  // objects
  methods: cn,
  computed: cn,
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
  components: cn,
  directives: cn,
  // watch
  watch: sc,
  // provide / inject
  provide: Ii,
  inject: nc
};
function Ii(t, e) {
  return e ? t ? function() {
    return Ae(
      q(t) ? t.call(this, this) : t,
      q(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function nc(t, e) {
  return cn(Ns(t), Ns(e));
}
function Ns(t) {
  if (D(t)) {
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
function cn(t, e) {
  return t ? Ae(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function Bi(t, e) {
  return t ? D(t) && D(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : Ae(
    /* @__PURE__ */ Object.create(null),
    Oi(t),
    Oi(e ?? {})
  ) : e;
}
function sc(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = Ae(/* @__PURE__ */ Object.create(null), t);
  for (const s in e)
    n[s] = Pe(t[s], e[s]);
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
let ic = 0;
function rc(t, e) {
  return function(s, i = null) {
    q(s) || (s = Ae({}, s)), i != null && !me(i) && (i = null);
    const r = Yr(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const f = r.app = {
      _uid: ic++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: qc,
      get config() {
        return r.config;
      },
      set config(a) {
      },
      use(a, ...g) {
        return o.has(a) || (a && q(a.install) ? (o.add(a), a.install(f, ...g)) : q(a) && (o.add(a), a(f, ...g))), f;
      },
      mixin(a) {
        return r.mixins.includes(a) || r.mixins.push(a), f;
      },
      component(a, g) {
        return g ? (r.components[a] = g, f) : r.components[a];
      },
      directive(a, g) {
        return g ? (r.directives[a] = g, f) : r.directives[a];
      },
      mount(a, g, b) {
        if (!c) {
          const w = f._ceVNode || wt(s, i);
          return w.appContext = r, b === !0 ? b = "svg" : b === !1 && (b = void 0), t(w, a, b), c = !0, f._container = a, a.__vue_app__ = f, os(w.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (ft(
          l,
          f._instance,
          16
        ), t(null, f._container), delete f._container.__vue_app__);
      },
      provide(a, g) {
        return r.provides[a] = g, f;
      },
      runWithContext(a) {
        const g = Xt;
        Xt = f;
        try {
          return a();
        } finally {
          Xt = g;
        }
      }
    };
    return f;
  };
}
let Xt = null;
function oc(t, e) {
  if (Be) {
    let n = Be.provides;
    const s = Be.parent && Be.parent.provides;
    s === n && (n = Be.provides = Object.create(s)), n[t] = e;
  }
}
function Ln(t, e, n = !1) {
  const s = Be || Ge;
  if (s || Xt) {
    const i = Xt ? Xt._context.provides : s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && t in i)
      return i[t];
    if (arguments.length > 1)
      return n && q(e) ? e.call(s && s.proxy) : e;
  }
}
const Jr = {}, Qr = () => Object.create(Jr), Xr = (t) => Object.getPrototypeOf(t) === Jr;
function lc(t, e, n, s = !1) {
  const i = {}, r = Qr();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), eo(t, e, i, r);
  for (const o in t.propsOptions[0])
    o in i || (i[o] = void 0);
  n ? t.props = s ? i : vl(i) : t.type.props ? t.props = i : t.props = r, t.attrs = r;
}
function cc(t, e, n, s) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: o }
  } = t, l = ie(i), [c] = t.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const a = t.vnode.dynamicProps;
      for (let g = 0; g < a.length; g++) {
        let b = a[g];
        if (is(t.emitsOptions, b))
          continue;
        const w = e[b];
        if (c)
          if (re(r, b))
            w !== r[b] && (r[b] = w, f = !0);
          else {
            const O = Ot(b);
            i[O] = Fs(
              c,
              l,
              O,
              w,
              t,
              !1
            );
          }
        else
          w !== r[b] && (r[b] = w, f = !0);
      }
    }
  } else {
    eo(t, e, i, r) && (f = !0);
    let a;
    for (const g in l)
      (!e || // for camelCase
      !re(e, g) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = jt(g)) === g || !re(e, a))) && (c ? n && // for camelCase
      (n[g] !== void 0 || // for kebab-case
      n[a] !== void 0) && (i[g] = Fs(
        c,
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
  f && bt(t.attrs, "set", "");
}
function eo(t, e, n, s) {
  const [i, r] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let c in e) {
      if (un(c))
        continue;
      const f = e[c];
      let a;
      i && re(i, a = Ot(c)) ? !r || !r.includes(a) ? n[a] = f : (l || (l = {}))[a] = f : is(t.emitsOptions, c) || (!(c in s) || f !== s[c]) && (s[c] = f, o = !0);
    }
  if (r) {
    const c = ie(n), f = l || ue;
    for (let a = 0; a < r.length; a++) {
      const g = r[a];
      n[g] = Fs(
        i,
        c,
        g,
        f[g],
        t,
        !re(f, g)
      );
    }
  }
  return o;
}
function Fs(t, e, n, s, i, r) {
  const o = t[n];
  if (o != null) {
    const l = re(o, "default");
    if (l && s === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && q(c)) {
        const { propsDefaults: f } = i;
        if (n in f)
          s = f[n];
        else {
          const a = Sn(i);
          s = f[n] = c.call(
            null,
            e
          ), a();
        }
      } else
        s = c;
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
const ac = /* @__PURE__ */ new WeakMap();
function to(t, e, n = !1) {
  const s = n ? ac : e.propsCache, i = s.get(t);
  if (i)
    return i;
  const r = t.props, o = {}, l = [];
  let c = !1;
  if (!q(t)) {
    const a = (g) => {
      c = !0;
      const [b, w] = to(g, e, !0);
      Ae(o, b), w && l.push(...w);
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  if (!r && !c)
    return me(t) && s.set(t, Zt), Zt;
  if (D(r))
    for (let a = 0; a < r.length; a++) {
      const g = Ot(r[a]);
      Li(g) && (o[g] = ue);
    }
  else if (r)
    for (const a in r) {
      const g = Ot(a);
      if (Li(g)) {
        const b = r[a], w = o[g] = D(b) || q(b) ? { type: b } : Ae({}, b), O = w.type;
        let P = !1, V = !0;
        if (D(O))
          for (let U = 0; U < O.length; ++U) {
            const Q = O[U], ee = q(Q) && Q.name;
            if (ee === "Boolean") {
              P = !0;
              break;
            } else ee === "String" && (V = !1);
          }
        else
          P = q(O) && O.name === "Boolean";
        w[
          0
          /* shouldCast */
        ] = P, w[
          1
          /* shouldCastTrue */
        ] = V, (P || re(w, "default")) && l.push(g);
      }
    }
  const f = [o, l];
  return me(t) && s.set(t, f), f;
}
function Li(t) {
  return t[0] !== "$" && !un(t);
}
const no = (t) => t[0] === "_" || t === "$stable", ai = (t) => D(t) ? t.map(ct) : [ct(t)], uc = (t, e, n) => {
  if (e._n)
    return e;
  const s = $l((...i) => ai(e(...i)), n);
  return s._c = !1, s;
}, so = (t, e, n) => {
  const s = t._ctx;
  for (const i in t) {
    if (no(i)) continue;
    const r = t[i];
    if (q(r))
      e[i] = uc(i, r, s);
    else if (r != null) {
      const o = ai(r);
      e[i] = () => o;
    }
  }
}, io = (t, e) => {
  const n = ai(e);
  t.slots.default = () => n;
}, ro = (t, e, n) => {
  for (const s in e)
    (n || s !== "_") && (t[s] = e[s]);
}, fc = (t, e, n) => {
  const s = t.slots = Qr();
  if (t.vnode.shapeFlag & 32) {
    const i = e._;
    i ? (ro(s, e, n), n && br(s, "_", i, !0)) : so(e, s);
  } else e && io(t, e);
}, hc = (t, e, n) => {
  const { vnode: s, slots: i } = t;
  let r = !0, o = ue;
  if (s.shapeFlag & 32) {
    const l = e._;
    l ? n && l === 1 ? r = !1 : ro(i, e, n) : (r = !e.$stable, so(e, i)), o = e;
  } else e && (io(t, e), o = { default: 1 });
  if (r)
    for (const l in i)
      !no(l) && o[l] == null && delete i[l];
}, qe = Ec;
function pc(t) {
  return dc(t);
}
function dc(t, e) {
  const n = es();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: i,
    patchProp: r,
    createElement: o,
    createText: l,
    createComment: c,
    setText: f,
    setElementText: a,
    parentNode: g,
    nextSibling: b,
    setScopeId: w = at,
    insertStaticContent: O
  } = t, P = (h, d, y, v = null, x = null, k = null, A = void 0, R = null, E = !!d.dynamicChildren) => {
    if (h === d)
      return;
    h && !sn(h, d) && (v = de(h), ke(h, x, k, !0), h = null), d.patchFlag === -2 && (E = !1, d.dynamicChildren = null);
    const { type: S, ref: $, shapeFlag: C } = d;
    switch (S) {
      case rs:
        V(h, d, y, v);
        break;
      case qt:
        U(h, d, y, v);
        break;
      case bs:
        h == null && Q(d, y, v, A);
        break;
      case lt:
        pt(
          h,
          d,
          y,
          v,
          x,
          k,
          A,
          R,
          E
        );
        break;
      default:
        C & 1 ? F(
          h,
          d,
          y,
          v,
          x,
          k,
          A,
          R,
          E
        ) : C & 6 ? Fe(
          h,
          d,
          y,
          v,
          x,
          k,
          A,
          R,
          E
        ) : (C & 64 || C & 128) && S.process(
          h,
          d,
          y,
          v,
          x,
          k,
          A,
          R,
          E,
          xe
        );
    }
    $ != null && x && Vn($, h && h.ref, k, d || h, !d);
  }, V = (h, d, y, v) => {
    if (h == null)
      s(
        d.el = l(d.children),
        y,
        v
      );
    else {
      const x = d.el = h.el;
      d.children !== h.children && f(x, d.children);
    }
  }, U = (h, d, y, v) => {
    h == null ? s(
      d.el = c(d.children || ""),
      y,
      v
    ) : d.el = h.el;
  }, Q = (h, d, y, v) => {
    [h.el, h.anchor] = O(
      h.children,
      d,
      y,
      v,
      h.el,
      h.anchor
    );
  }, ee = ({ el: h, anchor: d }, y, v) => {
    let x;
    for (; h && h !== d; )
      x = b(h), s(h, y, v), h = x;
    s(d, y, v);
  }, I = ({ el: h, anchor: d }) => {
    let y;
    for (; h && h !== d; )
      y = b(h), i(h), h = y;
    i(d);
  }, F = (h, d, y, v, x, k, A, R, E) => {
    d.type === "svg" ? A = "svg" : d.type === "math" && (A = "mathml"), h == null ? W(
      d,
      y,
      v,
      x,
      k,
      A,
      R,
      E
    ) : $e(
      h,
      d,
      x,
      k,
      A,
      R,
      E
    );
  }, W = (h, d, y, v, x, k, A, R) => {
    let E, S;
    const { props: $, shapeFlag: C, transition: L, dirs: M } = h;
    if (E = h.el = o(
      h.type,
      k,
      $ && $.is,
      $
    ), C & 8 ? a(E, h.children) : C & 16 && te(
      h.children,
      E,
      null,
      v,
      x,
      ys(h, k),
      A,
      R
    ), M && $t(h, null, v, "created"), H(E, h, h.scopeId, A, v), $) {
      for (const ce in $)
        ce !== "value" && !un(ce) && r(E, ce, null, $[ce], k, v);
      "value" in $ && r(E, "value", null, $.value, k), (S = $.onVnodeBeforeMount) && st(S, v, h);
    }
    M && $t(h, null, v, "beforeMount");
    const z = gc(x, L);
    z && L.beforeEnter(E), s(E, d, y), ((S = $ && $.onVnodeMounted) || z || M) && qe(() => {
      S && st(S, v, h), z && L.enter(E), M && $t(h, null, v, "mounted");
    }, x);
  }, H = (h, d, y, v, x) => {
    if (y && w(h, y), v)
      for (let k = 0; k < v.length; k++)
        w(h, v[k]);
    if (x) {
      let k = x.subTree;
      if (d === k || fo(k.type) && (k.ssContent === d || k.ssFallback === d)) {
        const A = x.vnode;
        H(
          h,
          A,
          A.scopeId,
          A.slotScopeIds,
          x.parent
        );
      }
    }
  }, te = (h, d, y, v, x, k, A, R, E = 0) => {
    for (let S = E; S < h.length; S++) {
      const $ = h[S] = R ? Et(h[S]) : ct(h[S]);
      P(
        null,
        $,
        d,
        y,
        v,
        x,
        k,
        A,
        R
      );
    }
  }, $e = (h, d, y, v, x, k, A) => {
    const R = d.el = h.el;
    let { patchFlag: E, dynamicChildren: S, dirs: $ } = d;
    E |= h.patchFlag & 16;
    const C = h.props || ue, L = d.props || ue;
    let M;
    if (y && Nt(y, !1), (M = L.onVnodeBeforeUpdate) && st(M, y, d, h), $ && $t(d, h, y, "beforeUpdate"), y && Nt(y, !0), (C.innerHTML && L.innerHTML == null || C.textContent && L.textContent == null) && a(R, ""), S ? ze(
      h.dynamicChildren,
      S,
      R,
      y,
      v,
      ys(d, x),
      k
    ) : A || G(
      h,
      d,
      R,
      null,
      y,
      v,
      ys(d, x),
      k,
      !1
    ), E > 0) {
      if (E & 16)
        Ve(R, C, L, y, x);
      else if (E & 2 && C.class !== L.class && r(R, "class", null, L.class, x), E & 4 && r(R, "style", C.style, L.style, x), E & 8) {
        const z = d.dynamicProps;
        for (let ce = 0; ce < z.length; ce++) {
          const X = z[ce], ve = C[X], ge = L[X];
          (ge !== ve || X === "value") && r(R, X, ve, ge, x, y);
        }
      }
      E & 1 && h.children !== d.children && a(R, d.children);
    } else !A && S == null && Ve(R, C, L, y, x);
    ((M = L.onVnodeUpdated) || $) && qe(() => {
      M && st(M, y, d, h), $ && $t(d, h, y, "updated");
    }, v);
  }, ze = (h, d, y, v, x, k, A) => {
    for (let R = 0; R < d.length; R++) {
      const E = h[R], S = d[R], $ = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === lt || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !sn(E, S) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 70) ? g(E.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          y
        )
      );
      P(
        E,
        S,
        $,
        null,
        v,
        x,
        k,
        A,
        !0
      );
    }
  }, Ve = (h, d, y, v, x) => {
    if (d !== y) {
      if (d !== ue)
        for (const k in d)
          !un(k) && !(k in y) && r(
            h,
            k,
            d[k],
            null,
            x,
            v
          );
      for (const k in y) {
        if (un(k)) continue;
        const A = y[k], R = d[k];
        A !== R && k !== "value" && r(h, k, R, A, x, v);
      }
      "value" in y && r(h, "value", d.value, y.value, x);
    }
  }, pt = (h, d, y, v, x, k, A, R, E) => {
    const S = d.el = h ? h.el : l(""), $ = d.anchor = h ? h.anchor : l("");
    let { patchFlag: C, dynamicChildren: L, slotScopeIds: M } = d;
    M && (R = R ? R.concat(M) : M), h == null ? (s(S, y, v), s($, y, v), te(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      y,
      $,
      x,
      k,
      A,
      R,
      E
    )) : C > 0 && C & 64 && L && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    h.dynamicChildren ? (ze(
      h.dynamicChildren,
      L,
      y,
      x,
      k,
      A,
      R
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || x && d === x.subTree) && oo(
      h,
      d,
      !0
      /* shallow */
    )) : G(
      h,
      d,
      y,
      $,
      x,
      k,
      A,
      R,
      E
    );
  }, Fe = (h, d, y, v, x, k, A, R, E) => {
    d.slotScopeIds = R, h == null ? d.shapeFlag & 512 ? x.ctx.activate(
      d,
      y,
      v,
      A,
      E
    ) : kt(
      d,
      y,
      v,
      x,
      k,
      A,
      E
    ) : Lt(h, d, E);
  }, kt = (h, d, y, v, x, k, A) => {
    const R = h.component = Lc(
      h,
      v,
      x
    );
    if (Vr(h) && (R.ctx.renderer = xe), $c(R, !1, A), R.asyncDep) {
      if (x && x.registerDep(R, he, A), !h.el) {
        const E = R.subTree = wt(qt);
        U(null, E, d, y);
      }
    } else
      he(
        R,
        h,
        d,
        y,
        x,
        k,
        A
      );
  }, Lt = (h, d, y) => {
    const v = d.component = h.component;
    if (Sc(h, d, y))
      if (v.asyncDep && !v.asyncResolved) {
        se(v, d, y);
        return;
      } else
        v.next = d, v.update();
    else
      d.el = h.el, v.vnode = d;
  }, he = (h, d, y, v, x, k, A) => {
    const R = () => {
      if (h.isMounted) {
        let { next: C, bu: L, u: M, parent: z, vnode: ce } = h;
        {
          const u = lo(h);
          if (u) {
            C && (C.el = ce.el, se(h, C, A)), u.asyncDep.then(() => {
              h.isUnmounted || R();
            });
            return;
          }
        }
        let X = C, ve;
        Nt(h, !1), C ? (C.el = ce.el, se(h, C, A)) : C = ce, L && Bn(L), (ve = C.props && C.props.onVnodeBeforeUpdate) && st(ve, z, C, ce), Nt(h, !0);
        const ge = Ni(h), Me = h.subTree;
        h.subTree = ge, P(
          Me,
          ge,
          // parent may have changed if it's in a teleport
          g(Me.el),
          // anchor may have changed if it's in a fragment
          de(Me),
          h,
          x,
          k
        ), C.el = ge.el, X === null && Tc(h, ge.el), M && qe(M, x), (ve = C.props && C.props.onVnodeUpdated) && qe(
          () => st(ve, z, C, ce),
          x
        );
      } else {
        let C;
        const { el: L, props: M } = d, { bm: z, m: ce, parent: X, root: ve, type: ge } = h, Me = pn(d);
        Nt(h, !1), z && Bn(z), !Me && (C = M && M.onVnodeBeforeMount) && st(C, X, d), Nt(h, !0);
        {
          ve.ce && ve.ce._injectChildStyle(ge);
          const u = h.subTree = Ni(h);
          P(
            null,
            u,
            y,
            v,
            h,
            x,
            k
          ), d.el = u.el;
        }
        if (ce && qe(ce, x), !Me && (C = M && M.onVnodeMounted)) {
          const u = d;
          qe(
            () => st(C, X, u),
            x
          );
        }
        (d.shapeFlag & 256 || X && pn(X.vnode) && X.vnode.shapeFlag & 256) && h.a && qe(h.a, x), h.isMounted = !0, d = y = v = null;
      }
    };
    h.scope.on();
    const E = h.effect = new kr(R);
    h.scope.off();
    const S = h.update = E.run.bind(E), $ = h.job = E.runIfDirty.bind(E);
    $.i = h, $.id = h.uid, E.scheduler = () => oi($), Nt(h, !0), S();
  }, se = (h, d, y) => {
    d.component = h;
    const v = h.vnode.props;
    h.vnode = d, h.next = null, cc(h, d.props, v, y), hc(h, d.children, y), It(), Ai(h), Bt();
  }, G = (h, d, y, v, x, k, A, R, E = !1) => {
    const S = h && h.children, $ = h ? h.shapeFlag : 0, C = d.children, { patchFlag: L, shapeFlag: M } = d;
    if (L > 0) {
      if (L & 128) {
        tt(
          S,
          C,
          y,
          v,
          x,
          k,
          A,
          R,
          E
        );
        return;
      } else if (L & 256) {
        We(
          S,
          C,
          y,
          v,
          x,
          k,
          A,
          R,
          E
        );
        return;
      }
    }
    M & 8 ? ($ & 16 && dt(S, x, k), C !== S && a(y, C)) : $ & 16 ? M & 16 ? tt(
      S,
      C,
      y,
      v,
      x,
      k,
      A,
      R,
      E
    ) : dt(S, x, k, !0) : ($ & 8 && a(y, ""), M & 16 && te(
      C,
      y,
      v,
      x,
      k,
      A,
      R,
      E
    ));
  }, We = (h, d, y, v, x, k, A, R, E) => {
    h = h || Zt, d = d || Zt;
    const S = h.length, $ = d.length, C = Math.min(S, $);
    let L;
    for (L = 0; L < C; L++) {
      const M = d[L] = E ? Et(d[L]) : ct(d[L]);
      P(
        h[L],
        M,
        y,
        null,
        x,
        k,
        A,
        R,
        E
      );
    }
    S > $ ? dt(
      h,
      x,
      k,
      !0,
      !1,
      C
    ) : te(
      d,
      y,
      v,
      x,
      k,
      A,
      R,
      E,
      C
    );
  }, tt = (h, d, y, v, x, k, A, R, E) => {
    let S = 0;
    const $ = d.length;
    let C = h.length - 1, L = $ - 1;
    for (; S <= C && S <= L; ) {
      const M = h[S], z = d[S] = E ? Et(d[S]) : ct(d[S]);
      if (sn(M, z))
        P(
          M,
          z,
          y,
          null,
          x,
          k,
          A,
          R,
          E
        );
      else
        break;
      S++;
    }
    for (; S <= C && S <= L; ) {
      const M = h[C], z = d[L] = E ? Et(d[L]) : ct(d[L]);
      if (sn(M, z))
        P(
          M,
          z,
          y,
          null,
          x,
          k,
          A,
          R,
          E
        );
      else
        break;
      C--, L--;
    }
    if (S > C) {
      if (S <= L) {
        const M = L + 1, z = M < $ ? d[M].el : v;
        for (; S <= L; )
          P(
            null,
            d[S] = E ? Et(d[S]) : ct(d[S]),
            y,
            z,
            x,
            k,
            A,
            R,
            E
          ), S++;
      }
    } else if (S > L)
      for (; S <= C; )
        ke(h[S], x, k, !0), S++;
    else {
      const M = S, z = S, ce = /* @__PURE__ */ new Map();
      for (S = z; S <= L; S++) {
        const m = d[S] = E ? Et(d[S]) : ct(d[S]);
        m.key != null && ce.set(m.key, S);
      }
      let X, ve = 0;
      const ge = L - z + 1;
      let Me = !1, u = 0;
      const p = new Array(ge);
      for (S = 0; S < ge; S++) p[S] = 0;
      for (S = M; S <= C; S++) {
        const m = h[S];
        if (ve >= ge) {
          ke(m, x, k, !0);
          continue;
        }
        let T;
        if (m.key != null)
          T = ce.get(m.key);
        else
          for (X = z; X <= L; X++)
            if (p[X - z] === 0 && sn(m, d[X])) {
              T = X;
              break;
            }
        T === void 0 ? ke(m, x, k, !0) : (p[T - z] = S + 1, T >= u ? u = T : Me = !0, P(
          m,
          d[T],
          y,
          null,
          x,
          k,
          A,
          R,
          E
        ), ve++);
      }
      const _ = Me ? mc(p) : Zt;
      for (X = _.length - 1, S = ge - 1; S >= 0; S--) {
        const m = z + S, T = d[m], B = m + 1 < $ ? d[m + 1].el : v;
        p[S] === 0 ? P(
          null,
          T,
          y,
          B,
          x,
          k,
          A,
          R,
          E
        ) : Me && (X < 0 || S !== _[X] ? Ce(T, y, B, 2) : X--);
      }
    }
  }, Ce = (h, d, y, v, x = null) => {
    const { el: k, type: A, transition: R, children: E, shapeFlag: S } = h;
    if (S & 6) {
      Ce(h.component.subTree, d, y, v);
      return;
    }
    if (S & 128) {
      h.suspense.move(d, y, v);
      return;
    }
    if (S & 64) {
      A.move(h, d, y, xe);
      return;
    }
    if (A === lt) {
      s(k, d, y);
      for (let C = 0; C < E.length; C++)
        Ce(E[C], d, y, v);
      s(h.anchor, d, y);
      return;
    }
    if (A === bs) {
      ee(h, d, y);
      return;
    }
    if (v !== 2 && S & 1 && R)
      if (v === 0)
        R.beforeEnter(k), s(k, d, y), qe(() => R.enter(k), x);
      else {
        const { leave: C, delayLeave: L, afterLeave: M } = R, z = () => s(k, d, y), ce = () => {
          C(k, () => {
            z(), M && M();
          });
        };
        L ? L(k, z, ce) : ce();
      }
    else
      s(k, d, y);
  }, ke = (h, d, y, v = !1, x = !1) => {
    const {
      type: k,
      props: A,
      ref: R,
      children: E,
      dynamicChildren: S,
      shapeFlag: $,
      patchFlag: C,
      dirs: L,
      cacheIndex: M
    } = h;
    if (C === -2 && (x = !1), R != null && Vn(R, null, y, h, !0), M != null && (d.renderCache[M] = void 0), $ & 256) {
      d.ctx.deactivate(h);
      return;
    }
    const z = $ & 1 && L, ce = !pn(h);
    let X;
    if (ce && (X = A && A.onVnodeBeforeUnmount) && st(X, d, h), $ & 6)
      vt(h.component, y, v);
    else {
      if ($ & 128) {
        h.suspense.unmount(y, v);
        return;
      }
      z && $t(h, null, d, "beforeUnmount"), $ & 64 ? h.type.remove(
        h,
        d,
        y,
        xe,
        v
      ) : S && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !S.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (k !== lt || C > 0 && C & 64) ? dt(
        S,
        d,
        y,
        !1,
        !0
      ) : (k === lt && C & 384 || !x && $ & 16) && dt(E, d, y), v && nt(h);
    }
    (ce && (X = A && A.onVnodeUnmounted) || z) && qe(() => {
      X && st(X, d, h), z && $t(h, null, d, "unmounted");
    }, y);
  }, nt = (h) => {
    const { type: d, el: y, anchor: v, transition: x } = h;
    if (d === lt) {
      zt(y, v);
      return;
    }
    if (d === bs) {
      I(h);
      return;
    }
    const k = () => {
      i(y), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (h.shapeFlag & 1 && x && !x.persisted) {
      const { leave: A, delayLeave: R } = x, E = () => A(y, k);
      R ? R(h.el, k, E) : E();
    } else
      k();
  }, zt = (h, d) => {
    let y;
    for (; h !== d; )
      y = b(h), i(h), h = y;
    i(d);
  }, vt = (h, d, y) => {
    const { bum: v, scope: x, job: k, subTree: A, um: R, m: E, a: S } = h;
    $i(E), $i(S), v && Bn(v), x.stop(), k && (k.flags |= 8, ke(A, h, d, y)), R && qe(R, d), qe(() => {
      h.isUnmounted = !0;
    }, d), d && d.pendingBranch && !d.isUnmounted && h.asyncDep && !h.asyncResolved && h.suspenseId === d.pendingId && (d.deps--, d.deps === 0 && d.resolve());
  }, dt = (h, d, y, v = !1, x = !1, k = 0) => {
    for (let A = k; A < h.length; A++)
      ke(h[A], d, y, v, x);
  }, de = (h) => {
    if (h.shapeFlag & 6)
      return de(h.component.subTree);
    if (h.shapeFlag & 128)
      return h.suspense.next();
    const d = b(h.anchor || h.el), y = d && d[Nl];
    return y ? b(y) : d;
  };
  let Z = !1;
  const pe = (h, d, y) => {
    h == null ? d._vnode && ke(d._vnode, null, null, !0) : P(
      d._vnode || null,
      h,
      d,
      null,
      null,
      null,
      y
    ), d._vnode = h, Z || (Z = !0, Ai(), Hr(), Z = !1);
  }, xe = {
    p: P,
    um: ke,
    m: Ce,
    r: nt,
    mt: kt,
    mc: te,
    pc: G,
    pbc: ze,
    n: de,
    o: t
  };
  return {
    render: pe,
    hydrate: void 0,
    createApp: rc(pe)
  };
}
function ys({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function Nt({ effect: t, job: e }, n) {
  n ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function gc(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function oo(t, e, n = !1) {
  const s = t.children, i = e.children;
  if (D(s) && D(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      let l = i[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[r] = Et(i[r]), l.el = o.el), !n && l.patchFlag !== -2 && oo(o, l)), l.type === rs && (l.el = o.el);
    }
}
function mc(t) {
  const e = t.slice(), n = [0];
  let s, i, r, o, l;
  const c = t.length;
  for (s = 0; s < c; s++) {
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
function $i(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
const yc = Symbol.for("v-scx"), bc = () => Ln(yc);
function $n(t, e, n) {
  return co(t, e, n);
}
function co(t, e, n = ue) {
  const { immediate: s, deep: i, flush: r, once: o } = n, l = Ae({}, n), c = e && s || !e && r !== "post";
  let f;
  if (kn) {
    if (r === "sync") {
      const w = bc();
      f = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!c) {
      const w = () => {
      };
      return w.stop = at, w.resume = at, w.pause = at, w;
    }
  }
  const a = Be;
  l.call = (w, O, P) => ft(w, a, O, P);
  let g = !1;
  r === "post" ? l.scheduler = (w) => {
    qe(w, a && a.suspense);
  } : r !== "sync" && (g = !0, l.scheduler = (w, O) => {
    O ? w() : oi(w);
  }), l.augmentJob = (w) => {
    e && (w.flags |= 4), g && (w.flags |= 2, a && (w.id = a.uid, w.i = a));
  };
  const b = Pl(t, e, l);
  return kn && (f ? f.push(b) : c && b()), b;
}
function _c(t, e, n) {
  const s = this.proxy, i = we(t) ? t.includes(".") ? ao(s, t) : () => s[t] : t.bind(s, s);
  let r;
  q(e) ? r = e : (r = e.handler, n = e);
  const o = Sn(this), l = co(i, r.bind(s), n);
  return o(), l;
}
function ao(t, e) {
  const n = e.split(".");
  return () => {
    let s = t;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
const wc = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${Ot(e)}Modifiers`] || t[`${jt(e)}Modifiers`];
function xc(t, e, ...n) {
  if (t.isUnmounted) return;
  const s = t.vnode.props || ue;
  let i = n;
  const r = e.startsWith("update:"), o = r && wc(s, e.slice(7));
  o && (o.trim && (i = n.map((a) => we(a) ? a.trim() : a)), o.number && (i = n.map(Rs)));
  let l, c = s[l = fs(e)] || // also try camelCase event handler (#2249)
  s[l = fs(Ot(e))];
  !c && r && (c = s[l = fs(jt(e))]), c && ft(
    c,
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
    t.emitted[l] = !0, ft(
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
  if (!q(t)) {
    const c = (f) => {
      const a = uo(f, e, !0);
      a && (l = !0, Ae(o, a));
    };
    !n && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  return !r && !l ? (me(t) && s.set(t, null), null) : (D(r) ? r.forEach((c) => o[c] = null) : Ae(o, r), me(t) && s.set(t, o), o);
}
function is(t, e) {
  return !t || !Jn(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), re(t, e[0].toLowerCase() + e.slice(1)) || re(t, jt(e)) || re(t, e));
}
function Ni(t) {
  const {
    type: e,
    vnode: n,
    proxy: s,
    withProxy: i,
    propsOptions: [r],
    slots: o,
    attrs: l,
    emit: c,
    render: f,
    renderCache: a,
    props: g,
    data: b,
    setupState: w,
    ctx: O,
    inheritAttrs: P
  } = t, V = zn(t);
  let U, Q;
  try {
    if (n.shapeFlag & 4) {
      const I = i || s, F = I;
      U = ct(
        f.call(
          F,
          I,
          a,
          g,
          w,
          b,
          O
        )
      ), Q = l;
    } else {
      const I = e;
      U = ct(
        I.length > 1 ? I(
          g,
          { attrs: l, slots: o, emit: c }
        ) : I(
          g,
          null
        )
      ), Q = e.props ? l : kc(l);
    }
  } catch (I) {
    gn.length = 0, ns(I, t, 1), U = wt(qt);
  }
  let ee = U;
  if (Q && P !== !1) {
    const I = Object.keys(Q), { shapeFlag: F } = ee;
    I.length && F & 7 && (r && I.some(Zs) && (Q = vc(
      Q,
      r
    )), ee = en(ee, Q, !1, !0));
  }
  return n.dirs && (ee = en(ee, null, !1, !0), ee.dirs = ee.dirs ? ee.dirs.concat(n.dirs) : n.dirs), n.transition && li(ee, n.transition), U = ee, zn(V), U;
}
const kc = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || Jn(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, vc = (t, e) => {
  const n = {};
  for (const s in t)
    (!Zs(s) || !(s.slice(9) in e)) && (n[s] = t[s]);
  return n;
};
function Sc(t, e, n) {
  const { props: s, children: i, component: r } = t, { props: o, children: l, patchFlag: c } = e, f = r.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? Fi(s, o, f) : !!o;
    if (c & 8) {
      const a = e.dynamicProps;
      for (let g = 0; g < a.length; g++) {
        const b = a[g];
        if (o[b] !== s[b] && !is(f, b))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? Fi(s, o, f) : !0 : !!o;
  return !1;
}
function Fi(t, e, n) {
  const s = Object.keys(e);
  if (s.length !== Object.keys(t).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (e[r] !== t[r] && !is(n, r))
      return !0;
  }
  return !1;
}
function Tc({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const s = e.subTree;
    if (s.suspense && s.suspense.activeBranch === t && (s.el = t.el), s === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const fo = (t) => t.__isSuspense;
function Ec(t, e) {
  e && e.pendingBranch ? D(t) ? e.effects.push(...t) : e.effects.push(t) : Ll(t);
}
const lt = Symbol.for("v-fgt"), rs = Symbol.for("v-txt"), qt = Symbol.for("v-cmt"), bs = Symbol.for("v-stc"), gn = [];
let Ue = null;
function Ne(t = !1) {
  gn.push(Ue = t ? null : []);
}
function Rc() {
  gn.pop(), Ue = gn[gn.length - 1] || null;
}
let xn = 1;
function Mi(t, e = !1) {
  xn += t, t < 0 && Ue && e && (Ue.hasOnce = !0);
}
function ho(t) {
  return t.dynamicChildren = xn > 0 ? Ue || Zt : null, Rc(), xn > 0 && Ue && Ue.push(t), t;
}
function De(t, e, n, s, i, r) {
  return ho(
    Y(
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
function Ac(t, e, n, s, i) {
  return ho(
    wt(
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
const go = ({ key: t }) => t ?? null, Nn = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? we(t) || Re(t) || q(t) ? { i: Ge, r: t, k: e, f: !!n } : t : null);
function Y(t, e = null, n = null, s = 0, i = null, r = t === lt ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && go(e),
    ref: e && Nn(e),
    scopeId: Ur,
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
    ctx: Ge
  };
  return l ? (ui(c, n), r & 128 && t.normalize(c)) : n && (c.shapeFlag |= we(n) ? 8 : 16), xn > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Ue && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ue.push(c), c;
}
const wt = Cc;
function Cc(t, e = null, n = null, s = 0, i = null, r = !1) {
  if ((!t || t === Yl) && (t = qt), po(t)) {
    const l = en(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && ui(l, n), xn > 0 && !r && Ue && (l.shapeFlag & 6 ? Ue[Ue.indexOf(t)] = l : Ue.push(l)), l.patchFlag = -2, l;
  }
  if (Dc(t) && (t = t.__vccOpts), e) {
    e = Oc(e);
    let { class: l, style: c } = e;
    l && !we(l) && (e.class = Rt(l)), me(c) && (ri(c) && !D(c) && (c = Ae({}, c)), e.style = He(c));
  }
  const o = we(t) ? 1 : fo(t) ? 128 : Fl(t) ? 64 : me(t) ? 4 : q(t) ? 2 : 0;
  return Y(
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
function Oc(t) {
  return t ? ri(t) || Xr(t) ? Ae({}, t) : t : null;
}
function en(t, e, n = !1, s = !1) {
  const { props: i, ref: r, patchFlag: o, children: l, transition: c } = t, f = e ? Pc(i || {}, e) : i, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: f,
    key: f && go(f),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? D(r) ? r.concat(Nn(e)) : [r, Nn(e)] : Nn(e)
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
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && en(t.ssContent),
    ssFallback: t.ssFallback && en(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return c && s && li(
    a,
    c.clone(a)
  ), a;
}
function Ms(t = " ", e = 0) {
  return wt(rs, null, t, e);
}
function mt(t = "", e = !1) {
  return e ? (Ne(), Ac(qt, null, t)) : wt(qt, null, t);
}
function ct(t) {
  return t == null || typeof t == "boolean" ? wt(qt) : D(t) ? wt(
    lt,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : po(t) ? Et(t) : wt(rs, null, String(t));
}
function Et(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : en(t);
}
function ui(t, e) {
  let n = 0;
  const { shapeFlag: s } = t;
  if (e == null)
    e = null;
  else if (D(e))
    n = 16;
  else if (typeof e == "object")
    if (s & 65) {
      const i = e.default;
      i && (i._c && (i._d = !1), ui(t, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = e._;
      !i && !Xr(e) ? e._ctx = Ge : i === 3 && Ge && (Ge.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else q(e) ? (e = { default: e, _ctx: Ge }, n = 32) : (e = String(e), s & 64 ? (n = 16, e = [Ms(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function Pc(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    for (const i in s)
      if (i === "class")
        e.class !== s.class && (e.class = Rt([e.class, s.class]));
      else if (i === "style")
        e.style = He([e.style, s.style]);
      else if (Jn(i)) {
        const r = e[i], o = s[i];
        o && r !== o && !(D(r) && r.includes(o)) && (e[i] = r ? [].concat(r, o) : o);
      } else i !== "" && (e[i] = s[i]);
  }
  return e;
}
function st(t, e, n, s = null) {
  ft(t, e, 7, [
    n,
    s
  ]);
}
const Ic = Yr();
let Bc = 0;
function Lc(t, e, n) {
  const s = t.type, i = (e ? e.appContext : t.appContext) || Ic, r = {
    uid: Bc++,
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
  return r.ctx = { _: r }, r.root = e ? e.root : r, r.emit = xc.bind(null, r), t.ce && t.ce(r), r;
}
let Be = null, Kn, Ds;
{
  const t = es(), e = (n, s) => {
    let i;
    return (i = t[n]) || (i = t[n] = []), i.push(s), (r) => {
      i.length > 1 ? i.forEach((o) => o(r)) : i[0](r);
    };
  };
  Kn = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Be = n
  ), Ds = e(
    "__VUE_SSR_SETTERS__",
    (n) => kn = n
  );
}
const Sn = (t) => {
  const e = Be;
  return Kn(t), t.scope.on(), () => {
    t.scope.off(), Kn(e);
  };
}, Di = () => {
  Be && Be.scope.off(), Kn(null);
};
function mo(t) {
  return t.vnode.shapeFlag & 4;
}
let kn = !1;
function $c(t, e = !1, n = !1) {
  e && Ds(e);
  const { props: s, children: i } = t.vnode, r = mo(t);
  lc(t, s, r, e), fc(t, i, n);
  const o = r ? Nc(t, e) : void 0;
  return e && Ds(!1), o;
}
function Nc(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, Ql);
  const { setup: s } = n;
  if (s) {
    It();
    const i = t.setupContext = s.length > 1 ? Mc(t) : null, r = Sn(t), o = vn(
      s,
      t,
      0,
      [
        t.props,
        i
      ]
    ), l = dr(o);
    if (Bt(), r(), (l || t.sp) && !pn(t) && zr(t), l) {
      if (o.then(Di, Di), e)
        return o.then((c) => {
          qi(t, c);
        }).catch((c) => {
          ns(c, t, 0);
        });
      t.asyncDep = o;
    } else
      qi(t, o);
  } else
    yo(t);
}
function qi(t, e, n) {
  q(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : me(e) && (t.setupState = Fr(e)), yo(t);
}
function yo(t, e, n) {
  const s = t.type;
  t.render || (t.render = s.render || at);
  {
    const i = Sn(t);
    It();
    try {
      Xl(t);
    } finally {
      Bt(), i();
    }
  }
}
const Fc = {
  get(t, e) {
    return Te(t, "get", ""), t[e];
  }
};
function Mc(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    attrs: new Proxy(t.attrs, Fc),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function os(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(Fr(Sl(t.exposed)), {
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
function Dc(t) {
  return q(t) && "__vccOpts" in t;
}
const ot = (t, e) => Cl(t, e, kn), qc = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let qs;
const Hi = typeof window < "u" && window.trustedTypes;
if (Hi)
  try {
    qs = /* @__PURE__ */ Hi.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const bo = qs ? (t) => qs.createHTML(t) : (t) => t, Hc = "http://www.w3.org/2000/svg", jc = "http://www.w3.org/1998/Math/MathML", yt = typeof document < "u" ? document : null, ji = yt && /* @__PURE__ */ yt.createElement("template"), Uc = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, s) => {
    const i = e === "svg" ? yt.createElementNS(Hc, t) : e === "mathml" ? yt.createElementNS(jc, t) : n ? yt.createElement(t, { is: n }) : yt.createElement(t);
    return t === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (t) => yt.createTextNode(t),
  createComment: (t) => yt.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => yt.querySelector(t),
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
      ji.innerHTML = bo(
        s === "svg" ? `<svg>${t}</svg>` : s === "mathml" ? `<math>${t}</math>` : t
      );
      const l = ji.content;
      if (s === "svg" || s === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
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
}, zc = Symbol("_vtc");
function Vc(t, e, n) {
  const s = t[zc];
  s && (e = (e ? [e, ...s] : [...s]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const Ui = Symbol("_vod"), Wc = Symbol("_vsh"), Kc = Symbol(""), Gc = /(^|;)\s*display\s*:/;
function Zc(t, e, n) {
  const s = t.style, i = we(n);
  let r = !1;
  if (n && !i) {
    if (e)
      if (we(e))
        for (const o of e.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && Fn(s, l, "");
        }
      else
        for (const o in e)
          n[o] == null && Fn(s, o, "");
    for (const o in n)
      o === "display" && (r = !0), Fn(s, o, n[o]);
  } else if (i) {
    if (e !== n) {
      const o = s[Kc];
      o && (n += ";" + o), s.cssText = n, r = Gc.test(n);
    }
  } else e && t.removeAttribute("style");
  Ui in t && (t[Ui] = r ? s.display : "", t[Wc] && (s.display = "none"));
}
const zi = /\s*!important$/;
function Fn(t, e, n) {
  if (D(n))
    n.forEach((s) => Fn(t, e, s));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const s = Yc(t, e);
    zi.test(n) ? t.setProperty(
      jt(s),
      n.replace(zi, ""),
      "important"
    ) : t[s] = n;
  }
}
const Vi = ["Webkit", "Moz", "ms"], _s = {};
function Yc(t, e) {
  const n = _s[e];
  if (n)
    return n;
  let s = Ot(e);
  if (s !== "filter" && s in t)
    return _s[e] = s;
  s = yr(s);
  for (let i = 0; i < Vi.length; i++) {
    const r = Vi[i] + s;
    if (r in t)
      return _s[e] = r;
  }
  return e;
}
const Wi = "http://www.w3.org/1999/xlink";
function Ki(t, e, n, s, i, r = nl(e)) {
  s && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(Wi, e.slice(6, e.length)) : t.setAttributeNS(Wi, e, n) : n == null || r && !_r(n) ? t.removeAttribute(e) : t.setAttribute(
    e,
    r ? "" : Pt(n) ? String(n) : n
  );
}
function Gi(t, e, n, s, i) {
  if (e === "innerHTML" || e === "textContent") {
    n != null && (t[e] = e === "innerHTML" ? bo(n) : n);
    return;
  }
  const r = t.tagName;
  if (e === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? t.getAttribute("value") || "" : t.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      t.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in t)) && (t.value = c), n == null && t.removeAttribute(e), t._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof t[e];
    l === "boolean" ? n = _r(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  o && t.removeAttribute(i || e);
}
function Gt(t, e, n, s) {
  t.addEventListener(e, n, s);
}
function Jc(t, e, n, s) {
  t.removeEventListener(e, n, s);
}
const Zi = Symbol("_vei");
function Qc(t, e, n, s, i = null) {
  const r = t[Zi] || (t[Zi] = {}), o = r[e];
  if (s && o)
    o.value = s;
  else {
    const [l, c] = Xc(e);
    if (s) {
      const f = r[e] = na(
        s,
        i
      );
      Gt(t, l, f, c);
    } else o && (Jc(t, l, o, c), r[e] = void 0);
  }
}
const Yi = /(?:Once|Passive|Capture)$/;
function Xc(t) {
  let e;
  if (Yi.test(t)) {
    e = {};
    let s;
    for (; s = t.match(Yi); )
      t = t.slice(0, t.length - s[0].length), e[s[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : jt(t.slice(2)), e];
}
let ws = 0;
const ea = /* @__PURE__ */ Promise.resolve(), ta = () => ws || (ea.then(() => ws = 0), ws = Date.now());
function na(t, e) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    ft(
      sa(s, n.value),
      e,
      5,
      [s]
    );
  };
  return n.value = t, n.attached = ta(), n;
}
function sa(t, e) {
  if (D(e)) {
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
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, ia = (t, e, n, s, i, r) => {
  const o = i === "svg";
  e === "class" ? Vc(t, s, o) : e === "style" ? Zc(t, n, s) : Jn(e) ? Zs(e) || Qc(t, e, n, s, r) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : ra(t, e, s, o)) ? (Gi(t, e, s), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && Ki(t, e, s, o, r, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && (/[A-Z]/.test(e) || !we(s)) ? Gi(t, Ot(e), s, r, e) : (e === "true-value" ? t._trueValue = s : e === "false-value" && (t._falseValue = s), Ki(t, e, s, o));
};
function ra(t, e, n, s) {
  if (s)
    return !!(e === "innerHTML" || e === "textContent" || e in t && Ji(e) && q(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Ji(e) && we(n) ? !1 : e in t;
}
const Qi = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return D(e) ? (n) => Bn(e, n) : e;
};
function oa(t) {
  t.target.composing = !0;
}
function Xi(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const xs = Symbol("_assign"), er = {
  created(t, { modifiers: { lazy: e, trim: n, number: s } }, i) {
    t[xs] = Qi(i);
    const r = s || i.props && i.props.type === "number";
    Gt(t, e ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let l = t.value;
      n && (l = l.trim()), r && (l = Rs(l)), t[xs](l);
    }), n && Gt(t, "change", () => {
      t.value = t.value.trim();
    }), e || (Gt(t, "compositionstart", oa), Gt(t, "compositionend", Xi), Gt(t, "change", Xi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: n, modifiers: { lazy: s, trim: i, number: r } }, o) {
    if (t[xs] = Qi(o), t.composing) return;
    const l = (r || t.type === "number") && !/^0\d/.test(t.value) ? Rs(t.value) : t.value, c = e ?? "";
    l !== c && (document.activeElement === t && t.type !== "range" && (s && e === n || i && t.value.trim() === c) || (t.value = c));
  }
}, la = /* @__PURE__ */ Ae({ patchProp: ia }, Uc);
let tr;
function ca() {
  return tr || (tr = pc(la));
}
const aa = (...t) => {
  const e = ca().createApp(...t), { mount: n } = e;
  return e.mount = (s) => {
    const i = fa(s);
    if (!i) return;
    const r = e._component;
    !q(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = n(i, !1, ua(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, e;
};
function ua(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function fa(t) {
  return we(t) ? document.querySelector(t) : t;
}
const St = (t) => {
  const e = t.replace("#", ""), n = parseInt(e.substr(0, 2), 16), s = parseInt(e.substr(2, 2), 16), i = parseInt(e.substr(4, 2), 16);
  return (n * 299 + s * 587 + i * 114) / 1e3 < 128;
}, ha = (t, e) => {
  const n = t.replace("#", ""), s = parseInt(n.substr(0, 2), 16), i = parseInt(n.substr(2, 2), 16), r = parseInt(n.substr(4, 2), 16), o = St(t), l = o ? Math.min(255, s + e) : Math.max(0, s - e), c = o ? Math.min(255, i + e) : Math.max(0, i - e), f = o ? Math.min(255, r + e) : Math.max(0, r - e);
  return `#${l.toString(16).padStart(2, "0")}${c.toString(16).padStart(2, "0")}${f.toString(16).padStart(2, "0")}`;
}, ks = (t) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t), pa = (t) => {
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
function fi() {
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
let Ut = fi();
function _o(t) {
  Ut = t;
}
const mn = { exec: () => null };
function le(t, e = "") {
  let n = typeof t == "string" ? t : t.source;
  const s = {
    replace: (i, r) => {
      let o = typeof r == "string" ? r : r.source;
      return o = o.replace(Le.caret, "$1"), n = n.replace(i, o), s;
    },
    getRegex: () => new RegExp(n, e)
  };
  return s;
}
const Le = {
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
}, da = /^(?:[ \t]*(?:\n|$))+/, ga = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, ma = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Tn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, ya = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, wo = /(?:[*+-]|\d{1,9}[.)])/, xo = le(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, wo).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), hi = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, ba = /^[^\n]+/, pi = /(?!\s*\])(?:\\.|[^\[\]\\])+/, _a = le(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", pi).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), wa = le(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, wo).getRegex(), ls = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", di = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, xa = le("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", di).replace("tag", ls).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ko = le(hi).replace("hr", Tn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ls).getRegex(), ka = le(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ko).getRegex(), gi = {
  blockquote: ka,
  code: ga,
  def: _a,
  fences: ma,
  heading: ya,
  hr: Tn,
  html: xa,
  lheading: xo,
  list: wa,
  newline: da,
  paragraph: ko,
  table: mn,
  text: ba
}, nr = le("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Tn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ls).getRegex(), va = {
  ...gi,
  table: nr,
  paragraph: le(hi).replace("hr", Tn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", nr).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ls).getRegex()
}, Sa = {
  ...gi,
  html: le(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", di).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: mn,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: le(hi).replace("hr", Tn).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", xo).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Ta = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Ea = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, vo = /^( {2,}|\\)\n(?!\s*$)/, Ra = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, cs = /[\p{P}\p{S}]/u, mi = /[\s\p{P}\p{S}]/u, So = /[^\s\p{P}\p{S}]/u, Aa = le(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, mi).getRegex(), To = /(?!~)[\p{P}\p{S}]/u, Ca = /(?!~)[\s\p{P}\p{S}]/u, Oa = /(?:[^\s\p{P}\p{S}]|~)/u, Pa = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, Eo = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Ia = le(Eo, "u").replace(/punct/g, cs).getRegex(), Ba = le(Eo, "u").replace(/punct/g, To).getRegex(), Ro = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", La = le(Ro, "gu").replace(/notPunctSpace/g, So).replace(/punctSpace/g, mi).replace(/punct/g, cs).getRegex(), $a = le(Ro, "gu").replace(/notPunctSpace/g, Oa).replace(/punctSpace/g, Ca).replace(/punct/g, To).getRegex(), Na = le("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, So).replace(/punctSpace/g, mi).replace(/punct/g, cs).getRegex(), Fa = le(/\\(punct)/, "gu").replace(/punct/g, cs).getRegex(), Ma = le(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Da = le(di).replace("(?:-->|$)", "-->").getRegex(), qa = le("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Da).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Gn = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, Ha = le(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", Gn).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Ao = le(/^!?\[(label)\]\[(ref)\]/).replace("label", Gn).replace("ref", pi).getRegex(), Co = le(/^!?\[(ref)\](?:\[\])?/).replace("ref", pi).getRegex(), ja = le("reflink|nolink(?!\\()", "g").replace("reflink", Ao).replace("nolink", Co).getRegex(), yi = {
  _backpedal: mn,
  // only used for GFM url
  anyPunctuation: Fa,
  autolink: Ma,
  blockSkip: Pa,
  br: vo,
  code: Ea,
  del: mn,
  emStrongLDelim: Ia,
  emStrongRDelimAst: La,
  emStrongRDelimUnd: Na,
  escape: Ta,
  link: Ha,
  nolink: Co,
  punctuation: Aa,
  reflink: Ao,
  reflinkSearch: ja,
  tag: qa,
  text: Ra,
  url: mn
}, Ua = {
  ...yi,
  link: le(/^!?\[(label)\]\((.*?)\)/).replace("label", Gn).getRegex(),
  reflink: le(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Gn).getRegex()
}, Hs = {
  ...yi,
  emStrongRDelimAst: $a,
  emStrongLDelim: Ba,
  url: le(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, za = {
  ...Hs,
  br: le(vo).replace("{2,}", "*").getRegex(),
  text: le(Hs.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, On = {
  normal: gi,
  gfm: va,
  pedantic: Sa
}, rn = {
  normal: yi,
  gfm: Hs,
  breaks: za,
  pedantic: Ua
}, Va = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, sr = (t) => Va[t];
function it(t, e) {
  if (e) {
    if (Le.escapeTest.test(t))
      return t.replace(Le.escapeReplace, sr);
  } else if (Le.escapeTestNoEncode.test(t))
    return t.replace(Le.escapeReplaceNoEncode, sr);
  return t;
}
function ir(t) {
  try {
    t = encodeURI(t).replace(Le.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function rr(t, e) {
  var r;
  const n = t.replace(Le.findPipe, (o, l, c) => {
    let f = !1, a = l;
    for (; --a >= 0 && c[a] === "\\"; )
      f = !f;
    return f ? "|" : " |";
  }), s = n.split(Le.splitPipe);
  let i = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((r = s.at(-1)) != null && r.trim()) && s.pop(), e)
    if (s.length > e)
      s.splice(e);
    else
      for (; s.length < e; )
        s.push("");
  for (; i < s.length; i++)
    s[i] = s[i].trim().replace(Le.slashPipe, "|");
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
function Wa(t, e) {
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
    const c = {
      type: "link",
      raw: n,
      href: r,
      title: o,
      text: l,
      tokens: s.inlineTokens(l)
    };
    return s.state.inLink = !1, c;
  }
  return {
    type: "image",
    raw: n,
    href: r,
    title: o,
    text: l
  };
}
function Ka(t, e, n) {
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
class Zn {
  // set by the lexer
  constructor(e) {
    ae(this, "options");
    ae(this, "rules");
    // set by the lexer
    ae(this, "lexer");
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
      const s = n[0], i = Ka(s, n[3] || "", this.rules);
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
        const c = [];
        let f;
        for (f = 0; f < s.length; f++)
          if (this.rules.other.blockquoteStart.test(s[f]))
            c.push(s[f]), l = !0;
          else if (!l)
            c.push(s[f]);
          else
            break;
        s = s.slice(f);
        const a = c.join(`
`), g = a.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        i = i ? `${i}
${a}` : a, r = r ? `${r}
${g}` : g;
        const b = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(g, o, !0), this.lexer.state.top = b, s.length === 0)
          break;
        const w = o.at(-1);
        if ((w == null ? void 0 : w.type) === "code")
          break;
        if ((w == null ? void 0 : w.type) === "blockquote") {
          const O = w, P = O.raw + `
` + s.join(`
`), V = this.blockquote(P);
          o[o.length - 1] = V, i = i.substring(0, i.length - O.raw.length) + V.raw, r = r.substring(0, r.length - O.text.length) + V.text;
          break;
        } else if ((w == null ? void 0 : w.type) === "list") {
          const O = w, P = O.raw + `
` + s.join(`
`), V = this.list(P);
          o[o.length - 1] = V, i = i.substring(0, i.length - w.raw.length) + V.raw, r = r.substring(0, r.length - O.raw.length) + V.raw, s = P.substring(o.at(-1).raw.length).split(`
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
        let f = !1, a = "", g = "";
        if (!(n = o.exec(e)) || this.rules.block.hr.test(e))
          break;
        a = n[0], e = e.substring(a.length);
        let b = n[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (Q) => " ".repeat(3 * Q.length)), w = e.split(`
`, 1)[0], O = !b.trim(), P = 0;
        if (this.options.pedantic ? (P = 2, g = b.trimStart()) : O ? P = n[1].length + 1 : (P = n[2].search(this.rules.other.nonSpaceChar), P = P > 4 ? 1 : P, g = b.slice(P), P += n[1].length), O && this.rules.other.blankLine.test(w) && (a += w + `
`, e = e.substring(w.length + 1), f = !0), !f) {
          const Q = this.rules.other.nextBulletRegex(P), ee = this.rules.other.hrRegex(P), I = this.rules.other.fencesBeginRegex(P), F = this.rules.other.headingBeginRegex(P), W = this.rules.other.htmlBeginRegex(P);
          for (; e; ) {
            const H = e.split(`
`, 1)[0];
            let te;
            if (w = H, this.options.pedantic ? (w = w.replace(this.rules.other.listReplaceNesting, "  "), te = w) : te = w.replace(this.rules.other.tabCharGlobal, "    "), I.test(w) || F.test(w) || W.test(w) || Q.test(w) || ee.test(w))
              break;
            if (te.search(this.rules.other.nonSpaceChar) >= P || !w.trim())
              g += `
` + te.slice(P);
            else {
              if (O || b.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || I.test(b) || F.test(b) || ee.test(b))
                break;
              g += `
` + w;
            }
            !O && !w.trim() && (O = !0), a += H + `
`, e = e.substring(H.length + 1), b = te.slice(P);
          }
        }
        r.loose || (l ? r.loose = !0 : this.rules.other.doubleBlankLine.test(a) && (l = !0));
        let V = null, U;
        this.options.gfm && (V = this.rules.other.listIsTask.exec(g), V && (U = V[0] !== "[ ] ", g = g.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: a,
          task: !!V,
          checked: U,
          loose: !1,
          text: g,
          tokens: []
        }), r.raw += a;
      }
      const c = r.items.at(-1);
      if (c)
        c.raw = c.raw.trimEnd(), c.text = c.text.trimEnd();
      else
        return;
      r.raw = r.raw.trimEnd();
      for (let f = 0; f < r.items.length; f++)
        if (this.lexer.state.top = !1, r.items[f].tokens = this.lexer.blockTokens(r.items[f].text, []), !r.loose) {
          const a = r.items[f].tokens.filter((b) => b.type === "space"), g = a.length > 0 && a.some((b) => this.rules.other.anyLine.test(b.raw));
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
      for (const c of i)
        this.rules.other.tableAlignRight.test(c) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(c) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(c) ? o.align.push("left") : o.align.push(null);
      for (let c = 0; c < s.length; c++)
        o.header.push({
          text: s[c],
          tokens: this.lexer.inline(s[c]),
          header: !0,
          align: o.align[c]
        });
      for (const c of r)
        o.rows.push(rr(c, o.header.length).map((f, a) => ({
          text: f,
          tokens: this.lexer.inline(f),
          header: !1,
          align: o.align[a]
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
        const o = Wa(n[2], "()");
        if (o > -1) {
          const c = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + o;
          n[2] = n[2].substring(0, o), n[0] = n[0].substring(0, c).trim(), n[3] = "";
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
      let l, c, f = o, a = 0;
      const g = i[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (g.lastIndex = 0, n = n.slice(-1 * e.length + o); (i = g.exec(n)) != null; ) {
        if (l = i[1] || i[2] || i[3] || i[4] || i[5] || i[6], !l)
          continue;
        if (c = [...l].length, i[3] || i[4]) {
          f += c;
          continue;
        } else if ((i[5] || i[6]) && o % 3 && !((o + c) % 3)) {
          a += c;
          continue;
        }
        if (f -= c, f > 0)
          continue;
        c = Math.min(c, c + f + a);
        const b = [...i[0]][0].length, w = e.slice(0, o + i.index + b + c);
        if (Math.min(o, c) % 2) {
          const P = w.slice(1, -1);
          return {
            type: "em",
            raw: w,
            text: P,
            tokens: this.lexer.inlineTokens(P)
          };
        }
        const O = w.slice(2, -2);
        return {
          type: "strong",
          raw: w,
          text: O,
          tokens: this.lexer.inlineTokens(O)
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
class Ze {
  constructor(e) {
    ae(this, "tokens");
    ae(this, "options");
    ae(this, "state");
    ae(this, "tokenizer");
    ae(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || Ut, this.options.tokenizer = this.options.tokenizer || new Zn(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      other: Le,
      block: On.normal,
      inline: rn.normal
    };
    this.options.pedantic ? (n.block = On.pedantic, n.inline = rn.pedantic) : this.options.gfm && (n.block = On.gfm, this.options.breaks ? n.inline = rn.breaks : n.inline = rn.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: On,
      inline: rn
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, n) {
    return new Ze(n).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, n) {
    return new Ze(n).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(Le.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const s = this.inlineQueue[n];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, n = [], s = !1) {
    var i, r, o;
    for (this.options.pedantic && (e = e.replace(Le.tabCharGlobal, "    ").replace(Le.spaceLine, "")); e; ) {
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
      let c = e;
      if ((o = this.options.extensions) != null && o.startBlock) {
        let f = 1 / 0;
        const a = e.slice(1);
        let g;
        this.options.extensions.startBlock.forEach((b) => {
          g = b.call({ lexer: this }, a), typeof g == "number" && g >= 0 && (f = Math.min(f, g));
        }), f < 1 / 0 && f >= 0 && (c = e.substring(0, f + 1));
      }
      if (this.state.top && (l = this.tokenizer.paragraph(c))) {
        const f = n.at(-1);
        s && (f == null ? void 0 : f.type) === "paragraph" ? (f.raw += `
` + l.raw, f.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = f.text) : n.push(l), s = c.length !== e.length, e = e.substring(l.raw.length);
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
    var l, c, f;
    let s = e, i = null;
    if (this.tokens.links) {
      const a = Object.keys(this.tokens.links);
      if (a.length > 0)
        for (; (i = this.tokenizer.rules.inline.reflinkSearch.exec(s)) != null; )
          a.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) && (s = s.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (i = this.tokenizer.rules.inline.blockSkip.exec(s)) != null; )
      s = s.slice(0, i.index) + "[" + "a".repeat(i[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (i = this.tokenizer.rules.inline.anyPunctuation.exec(s)) != null; )
      s = s.slice(0, i.index) + "++" + s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let r = !1, o = "";
    for (; e; ) {
      r || (o = ""), r = !1;
      let a;
      if ((c = (l = this.options.extensions) == null ? void 0 : l.inline) != null && c.some((b) => (a = b.call({ lexer: this }, e, n)) ? (e = e.substring(a.raw.length), n.push(a), !0) : !1))
        continue;
      if (a = this.tokenizer.escape(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.tag(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.link(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(a.raw.length);
        const b = n.at(-1);
        a.type === "text" && (b == null ? void 0 : b.type) === "text" ? (b.raw += a.raw, b.text += a.text) : n.push(a);
        continue;
      }
      if (a = this.tokenizer.emStrong(e, s, o)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.codespan(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.br(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.del(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (a = this.tokenizer.autolink(e)) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      if (!this.state.inLink && (a = this.tokenizer.url(e))) {
        e = e.substring(a.raw.length), n.push(a);
        continue;
      }
      let g = e;
      if ((f = this.options.extensions) != null && f.startInline) {
        let b = 1 / 0;
        const w = e.slice(1);
        let O;
        this.options.extensions.startInline.forEach((P) => {
          O = P.call({ lexer: this }, w), typeof O == "number" && O >= 0 && (b = Math.min(b, O));
        }), b < 1 / 0 && b >= 0 && (g = e.substring(0, b + 1));
      }
      if (a = this.tokenizer.inlineText(g)) {
        e = e.substring(a.raw.length), a.raw.slice(-1) !== "_" && (o = a.raw.slice(-1)), r = !0;
        const b = n.at(-1);
        (b == null ? void 0 : b.type) === "text" ? (b.raw += a.raw, b.text += a.text) : n.push(a);
        continue;
      }
      if (e) {
        const b = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(b);
          break;
        } else
          throw new Error(b);
      }
    }
    return n;
  }
}
class Yn {
  // set by the parser
  constructor(e) {
    ae(this, "options");
    ae(this, "parser");
    this.options = e || Ut;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: n, escaped: s }) {
    var o;
    const i = (o = (n || "").match(Le.notSpaceStart)) == null ? void 0 : o[0], r = e.replace(Le.endingNewline, "") + `
`;
    return i ? '<pre><code class="language-' + it(i) + '">' + (s ? r : it(r, !0)) + `</code></pre>
` : "<pre><code>" + (s ? r : it(r, !0)) + `</code></pre>
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
      const c = e.items[l];
      i += this.listitem(c);
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
      e.loose ? ((s = e.tokens[0]) == null ? void 0 : s.type) === "paragraph" ? (e.tokens[0].text = i + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = i + " " + it(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = !0)) : e.tokens.unshift({
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
    return `<code>${it(e, !0)}</code>`;
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
    return n && (o += ' title="' + it(n) + '"'), o += ">" + i + "</a>", o;
  }
  image({ href: e, title: n, text: s }) {
    const i = ir(e);
    if (i === null)
      return it(s);
    e = i;
    let r = `<img src="${e}" alt="${s}"`;
    return n && (r += ` title="${it(n)}"`), r += ">", r;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : it(e.text);
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
class Ye {
  constructor(e) {
    ae(this, "options");
    ae(this, "renderer");
    ae(this, "textRenderer");
    this.options = e || Ut, this.options.renderer = this.options.renderer || new Yn(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new bi();
  }
  /**
   * Static Parse Method
   */
  static parse(e, n) {
    return new Ye(n).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, n) {
    return new Ye(n).parseInline(e);
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
        const f = l, a = this.options.extensions.renderers[f.type].call({ parser: this }, f);
        if (a !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(f.type)) {
          s += a || "";
          continue;
        }
      }
      const c = l;
      switch (c.type) {
        case "space": {
          s += this.renderer.space(c);
          continue;
        }
        case "hr": {
          s += this.renderer.hr(c);
          continue;
        }
        case "heading": {
          s += this.renderer.heading(c);
          continue;
        }
        case "code": {
          s += this.renderer.code(c);
          continue;
        }
        case "table": {
          s += this.renderer.table(c);
          continue;
        }
        case "blockquote": {
          s += this.renderer.blockquote(c);
          continue;
        }
        case "list": {
          s += this.renderer.list(c);
          continue;
        }
        case "html": {
          s += this.renderer.html(c);
          continue;
        }
        case "paragraph": {
          s += this.renderer.paragraph(c);
          continue;
        }
        case "text": {
          let f = c, a = this.renderer.text(f);
          for (; o + 1 < e.length && e[o + 1].type === "text"; )
            f = e[++o], a += `
` + this.renderer.text(f);
          n ? s += this.renderer.paragraph({
            type: "paragraph",
            raw: a,
            text: a,
            tokens: [{ type: "text", raw: a, text: a, escaped: !0 }]
          }) : s += a;
          continue;
        }
        default: {
          const f = 'Token with "' + c.type + '" type was not found.';
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
      const c = l;
      switch (c.type) {
        case "escape": {
          s += n.text(c);
          break;
        }
        case "html": {
          s += n.html(c);
          break;
        }
        case "link": {
          s += n.link(c);
          break;
        }
        case "image": {
          s += n.image(c);
          break;
        }
        case "strong": {
          s += n.strong(c);
          break;
        }
        case "em": {
          s += n.em(c);
          break;
        }
        case "codespan": {
          s += n.codespan(c);
          break;
        }
        case "br": {
          s += n.br(c);
          break;
        }
        case "del": {
          s += n.del(c);
          break;
        }
        case "text": {
          s += n.text(c);
          break;
        }
        default: {
          const f = 'Token with "' + c.type + '" type was not found.';
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
    ae(this, "options");
    ae(this, "block");
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
    return this.block ? Ze.lex : Ze.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? Ye.parse : Ye.parseInline;
  }
}
ae(yn, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
class Ga {
  constructor(...e) {
    ae(this, "defaults", fi());
    ae(this, "options", this.setOptions);
    ae(this, "parse", this.parseMarkdown(!0));
    ae(this, "parseInline", this.parseMarkdown(!1));
    ae(this, "Parser", Ye);
    ae(this, "Renderer", Yn);
    ae(this, "TextRenderer", bi);
    ae(this, "Lexer", Ze);
    ae(this, "Tokenizer", Zn);
    ae(this, "Hooks", yn);
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
          for (const c of l.header)
            s = s.concat(this.walkTokens(c.tokens, n));
          for (const c of l.rows)
            for (const f of c)
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
          (r = (i = this.defaults.extensions) == null ? void 0 : i.childTokens) != null && r[l.type] ? this.defaults.extensions.childTokens[l.type].forEach((c) => {
            const f = l[c].flat(1 / 0);
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
            let c = r.renderer.apply(this, l);
            return c === !1 && (c = o.apply(this, l)), c;
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
        const r = this.defaults.renderer || new Yn(this.defaults);
        for (const o in s.renderer) {
          if (!(o in r))
            throw new Error(`renderer '${o}' does not exist`);
          if (["options", "parser"].includes(o))
            continue;
          const l = o, c = s.renderer[l], f = r[l];
          r[l] = (...a) => {
            let g = c.apply(r, a);
            return g === !1 && (g = f.apply(r, a)), g || "";
          };
        }
        i.renderer = r;
      }
      if (s.tokenizer) {
        const r = this.defaults.tokenizer || new Zn(this.defaults);
        for (const o in s.tokenizer) {
          if (!(o in r))
            throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o))
            continue;
          const l = o, c = s.tokenizer[l], f = r[l];
          r[l] = (...a) => {
            let g = c.apply(r, a);
            return g === !1 && (g = f.apply(r, a)), g;
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
          const l = o, c = s.hooks[l], f = r[l];
          yn.passThroughHooks.has(o) ? r[l] = (a) => {
            if (this.defaults.async)
              return Promise.resolve(c.call(r, a)).then((b) => f.call(r, b));
            const g = c.call(r, a);
            return f.call(r, g);
          } : r[l] = (...a) => {
            let g = c.apply(r, a);
            return g === !1 && (g = f.apply(r, a)), g;
          };
        }
        i.hooks = r;
      }
      if (s.walkTokens) {
        const r = this.defaults.walkTokens, o = s.walkTokens;
        i.walkTokens = function(l) {
          let c = [];
          return c.push(o.call(this, l)), r && (c = c.concat(r.call(this, l))), c;
        };
      }
      this.defaults = { ...this.defaults, ...i };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, n) {
    return Ze.lex(e, n ?? this.defaults);
  }
  parser(e, n) {
    return Ye.parse(e, n ?? this.defaults);
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
      const c = o.hooks ? o.hooks.provideLexer() : e ? Ze.lex : Ze.lexInline, f = o.hooks ? o.hooks.provideParser() : e ? Ye.parse : Ye.parseInline;
      if (o.async)
        return Promise.resolve(o.hooks ? o.hooks.preprocess(s) : s).then((a) => c(a, o)).then((a) => o.hooks ? o.hooks.processAllTokens(a) : a).then((a) => o.walkTokens ? Promise.all(this.walkTokens(a, o.walkTokens)).then(() => a) : a).then((a) => f(a, o)).then((a) => o.hooks ? o.hooks.postprocess(a) : a).catch(l);
      try {
        o.hooks && (s = o.hooks.preprocess(s));
        let a = c(s, o);
        o.hooks && (a = o.hooks.processAllTokens(a)), o.walkTokens && this.walkTokens(a, o.walkTokens);
        let g = f(a, o);
        return o.hooks && (g = o.hooks.postprocess(g)), g;
      } catch (a) {
        return l(a);
      }
    };
  }
  onError(e, n) {
    return (s) => {
      if (s.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        const i = "<p>An error occurred:</p><pre>" + it(s.message + "", !0) + "</pre>";
        return n ? Promise.resolve(i) : i;
      }
      if (n)
        return Promise.reject(s);
      throw s;
    };
  }
}
const Ht = new Ga();
function J(t, e) {
  return Ht.parse(t, e);
}
J.options = J.setOptions = function(t) {
  return Ht.setOptions(t), J.defaults = Ht.defaults, _o(J.defaults), J;
};
J.getDefaults = fi;
J.defaults = Ut;
J.use = function(...t) {
  return Ht.use(...t), J.defaults = Ht.defaults, _o(J.defaults), J;
};
J.walkTokens = function(t, e) {
  return Ht.walkTokens(t, e);
};
J.parseInline = Ht.parseInline;
J.Parser = Ye;
J.parser = Ye.parse;
J.Renderer = Yn;
J.TextRenderer = bi;
J.Lexer = Ze;
J.lexer = Ze.lex;
J.Tokenizer = Zn;
J.Hooks = yn;
J.parse = J;
J.options;
J.setOptions;
J.use;
J.walkTokens;
J.parseInline;
Ye.parse;
Ze.lex;
const _i = {
  API_URL: "http://localhost:8000/api/v1",
  WS_URL: "ws://localhost:8000"
};
function Za(t) {
  const e = ot(() => ({
    backgroundColor: t.value.chat_background_color || "#ffffff",
    color: St(t.value.chat_background_color || "#ffffff") ? "#ffffff" : "#000000"
  })), n = ot(() => ({
    backgroundColor: t.value.chat_bubble_color || "#f34611",
    color: St(t.value.chat_bubble_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), s = ot(() => {
    const f = t.value.chat_background_color || "#F8F9FA", a = ha(f, 20);
    return {
      backgroundColor: a,
      color: St(a) ? "#FFFFFF" : "#000000"
    };
  }), i = ot(() => ({
    backgroundColor: t.value.accent_color || "#f34611",
    color: St(t.value.accent_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), r = ot(() => ({
    color: St(t.value.chat_background_color || "#F8F9FA") ? "#FFFFFF" : "#000000"
  })), o = ot(() => ({
    borderBottom: `1px solid ${St(t.value.chat_background_color || "#F8F9FA") ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`
  })), l = ot(() => t.value.photo_url ? `${_i.API_URL}${t.value.photo_url}` : ""), c = ot(() => {
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
    shadowStyle: c
  };
}
const ht = /* @__PURE__ */ Object.create(null);
ht.open = "0";
ht.close = "1";
ht.ping = "2";
ht.pong = "3";
ht.message = "4";
ht.upgrade = "5";
ht.noop = "6";
const Mn = /* @__PURE__ */ Object.create(null);
Object.keys(ht).forEach((t) => {
  Mn[ht[t]] = t;
});
const js = { type: "error", data: "parser error" }, Oo = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", Po = typeof ArrayBuffer == "function", Io = (t) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t && t.buffer instanceof ArrayBuffer, wi = ({ type: t, data: e }, n, s) => Oo && e instanceof Blob ? n ? s(e) : lr(e, s) : Po && (e instanceof ArrayBuffer || Io(e)) ? n ? s(e) : lr(new Blob([e]), s) : s(ht[t] + (e || "")), lr = (t, e) => {
  const n = new FileReader();
  return n.onload = function() {
    const s = n.result.split(",")[1];
    e("b" + (s || ""));
  }, n.readAsDataURL(t);
};
function cr(t) {
  return t instanceof Uint8Array ? t : t instanceof ArrayBuffer ? new Uint8Array(t) : new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
}
let vs;
function Ya(t, e) {
  if (Oo && t.data instanceof Blob)
    return t.data.arrayBuffer().then(cr).then(e);
  if (Po && (t.data instanceof ArrayBuffer || Io(t.data)))
    return e(cr(t.data));
  wi(t, !1, (n) => {
    vs || (vs = new TextEncoder()), e(vs.encode(n));
  });
}
const ar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", an = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let t = 0; t < ar.length; t++)
  an[ar.charCodeAt(t)] = t;
const Ja = (t) => {
  let e = t.length * 0.75, n = t.length, s, i = 0, r, o, l, c;
  t[t.length - 1] === "=" && (e--, t[t.length - 2] === "=" && e--);
  const f = new ArrayBuffer(e), a = new Uint8Array(f);
  for (s = 0; s < n; s += 4)
    r = an[t.charCodeAt(s)], o = an[t.charCodeAt(s + 1)], l = an[t.charCodeAt(s + 2)], c = an[t.charCodeAt(s + 3)], a[i++] = r << 2 | o >> 4, a[i++] = (o & 15) << 4 | l >> 2, a[i++] = (l & 3) << 6 | c & 63;
  return f;
}, Qa = typeof ArrayBuffer == "function", xi = (t, e) => {
  if (typeof t != "string")
    return {
      type: "message",
      data: Bo(t, e)
    };
  const n = t.charAt(0);
  return n === "b" ? {
    type: "message",
    data: Xa(t.substring(1), e)
  } : Mn[n] ? t.length > 1 ? {
    type: Mn[n],
    data: t.substring(1)
  } : {
    type: Mn[n]
  } : js;
}, Xa = (t, e) => {
  if (Qa) {
    const n = Ja(t);
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
}, Lo = "", eu = (t, e) => {
  const n = t.length, s = new Array(n);
  let i = 0;
  t.forEach((r, o) => {
    wi(r, !1, (l) => {
      s[o] = l, ++i === n && e(s.join(Lo));
    });
  });
}, tu = (t, e) => {
  const n = t.split(Lo), s = [];
  for (let i = 0; i < n.length; i++) {
    const r = xi(n[i], e);
    if (s.push(r), r.type === "error")
      break;
  }
  return s;
};
function nu() {
  return new TransformStream({
    transform(t, e) {
      Ya(t, (n) => {
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
let Ss;
function Pn(t) {
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
function su(t, e) {
  Ss || (Ss = new TextDecoder());
  const n = [];
  let s = 0, i = -1, r = !1;
  return new TransformStream({
    transform(o, l) {
      for (n.push(o); ; ) {
        if (s === 0) {
          if (Pn(n) < 1)
            break;
          const c = In(n, 1);
          r = (c[0] & 128) === 128, i = c[0] & 127, i < 126 ? s = 3 : i === 126 ? s = 1 : s = 2;
        } else if (s === 1) {
          if (Pn(n) < 2)
            break;
          const c = In(n, 2);
          i = new DataView(c.buffer, c.byteOffset, c.length).getUint16(0), s = 3;
        } else if (s === 2) {
          if (Pn(n) < 8)
            break;
          const c = In(n, 8), f = new DataView(c.buffer, c.byteOffset, c.length), a = f.getUint32(0);
          if (a > Math.pow(2, 21) - 1) {
            l.enqueue(js);
            break;
          }
          i = a * Math.pow(2, 32) + f.getUint32(4), s = 3;
        } else {
          if (Pn(n) < i)
            break;
          const c = In(n, i);
          l.enqueue(xi(r ? c : Ss.decode(c), e)), s = 0;
        }
        if (i === 0 || i > t) {
          l.enqueue(js);
          break;
        }
      }
    }
  });
}
const $o = 4;
function _e(t) {
  if (t) return iu(t);
}
function iu(t) {
  for (var e in _e.prototype)
    t[e] = _e.prototype[e];
  return t;
}
_e.prototype.on = _e.prototype.addEventListener = function(t, e) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
};
_e.prototype.once = function(t, e) {
  function n() {
    this.off(t, n), e.apply(this, arguments);
  }
  return n.fn = e, this.on(t, n), this;
};
_e.prototype.off = _e.prototype.removeListener = _e.prototype.removeAllListeners = _e.prototype.removeEventListener = function(t, e) {
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
_e.prototype.emit = function(t) {
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
_e.prototype.emitReserved = _e.prototype.emit;
_e.prototype.listeners = function(t) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
};
_e.prototype.hasListeners = function(t) {
  return !!this.listeners(t).length;
};
const as = typeof Promise == "function" && typeof Promise.resolve == "function" ? (e) => Promise.resolve().then(e) : (e, n) => n(e, 0), Ke = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), ru = "arraybuffer";
function No(t, ...e) {
  return e.reduce((n, s) => (t.hasOwnProperty(s) && (n[s] = t[s]), n), {});
}
const ou = Ke.setTimeout, lu = Ke.clearTimeout;
function us(t, e) {
  e.useNativeTimers ? (t.setTimeoutFn = ou.bind(Ke), t.clearTimeoutFn = lu.bind(Ke)) : (t.setTimeoutFn = Ke.setTimeout.bind(Ke), t.clearTimeoutFn = Ke.clearTimeout.bind(Ke));
}
const cu = 1.33;
function au(t) {
  return typeof t == "string" ? uu(t) : Math.ceil((t.byteLength || t.size) * cu);
}
function uu(t) {
  let e = 0, n = 0;
  for (let s = 0, i = t.length; s < i; s++)
    e = t.charCodeAt(s), e < 128 ? n += 1 : e < 2048 ? n += 2 : e < 55296 || e >= 57344 ? n += 3 : (s++, n += 4);
  return n;
}
function Fo() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function fu(t) {
  let e = "";
  for (let n in t)
    t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
  return e;
}
function hu(t) {
  let e = {}, n = t.split("&");
  for (let s = 0, i = n.length; s < i; s++) {
    let r = n[s].split("=");
    e[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
  }
  return e;
}
class pu extends Error {
  constructor(e, n, s) {
    super(e), this.description = n, this.context = s, this.type = "TransportError";
  }
}
class ki extends _e {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(e) {
    super(), this.writable = !1, us(this, e), this.opts = e, this.query = e.query, this.socket = e.socket, this.supportsBinary = !e.forceBase64;
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
    return super.emitReserved("error", new pu(e, n, s)), this;
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
    const n = fu(e);
    return n.length ? "?" + n : "";
  }
}
class du extends ki {
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
    tu(e, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
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
    this.writable = !1, eu(e, (n) => {
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
    return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = Fo()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(e, n);
  }
}
let Mo = !1;
try {
  Mo = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const gu = Mo;
function mu() {
}
class yu extends du {
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
class ut extends _e {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(e, n, s) {
    super(), this.createRequest = e, us(this, s), this._opts = s, this._method = s.method || "GET", this._uri = n, this._data = s.data !== void 0 ? s.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var e;
    const n = No(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
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
    typeof document < "u" && (this._index = ut.requestsCount++, ut.requests[this._index] = this);
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
      if (this._xhr.onreadystatechange = mu, e)
        try {
          this._xhr.abort();
        } catch {
        }
      typeof document < "u" && delete ut.requests[this._index], this._xhr = null;
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
ut.requestsCount = 0;
ut.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", ur);
  else if (typeof addEventListener == "function") {
    const t = "onpagehide" in Ke ? "pagehide" : "unload";
    addEventListener(t, ur, !1);
  }
}
function ur() {
  for (let t in ut.requests)
    ut.requests.hasOwnProperty(t) && ut.requests[t].abort();
}
const bu = function() {
  const t = Do({
    xdomain: !1
  });
  return t && t.responseType !== null;
}();
class _u extends yu {
  constructor(e) {
    super(e);
    const n = e && e.forceBase64;
    this.supportsBinary = bu && !n;
  }
  request(e = {}) {
    return Object.assign(e, { xd: this.xd }, this.opts), new ut(Do, this.uri(), e);
  }
}
function Do(t) {
  const e = t.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!e || gu))
      return new XMLHttpRequest();
  } catch {
  }
  if (!e)
    try {
      return new Ke[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const qo = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class wu extends ki {
  get name() {
    return "websocket";
  }
  doOpen() {
    const e = this.uri(), n = this.opts.protocols, s = qo ? {} : No(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
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
        i && as(() => {
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
    return this.opts.timestampRequests && (n[this.opts.timestampParam] = Fo()), this.supportsBinary || (n.b64 = 1), this.createUri(e, n);
  }
}
const Ts = Ke.WebSocket || Ke.MozWebSocket;
class xu extends wu {
  createSocket(e, n, s) {
    return qo ? new Ts(e, n, s) : n ? new Ts(e, n) : new Ts(e);
  }
  doWrite(e, n) {
    this.ws.send(n);
  }
}
class ku extends ki {
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
        const n = su(Number.MAX_SAFE_INTEGER, this.socket.binaryType), s = e.readable.pipeThrough(n).getReader(), i = nu();
        i.readable.pipeTo(e.writable), this._writer = i.writable.getWriter();
        const r = () => {
          s.read().then(({ done: l, value: c }) => {
            l || (this.onPacket(c), r());
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
        i && as(() => {
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
const vu = {
  websocket: xu,
  webtransport: ku,
  polling: _u
}, Su = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, Tu = [
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
function Us(t) {
  if (t.length > 8e3)
    throw "URI too long";
  const e = t, n = t.indexOf("["), s = t.indexOf("]");
  n != -1 && s != -1 && (t = t.substring(0, n) + t.substring(n, s).replace(/:/g, ";") + t.substring(s, t.length));
  let i = Su.exec(t || ""), r = {}, o = 14;
  for (; o--; )
    r[Tu[o]] = i[o] || "";
  return n != -1 && s != -1 && (r.source = e, r.host = r.host.substring(1, r.host.length - 1).replace(/;/g, ":"), r.authority = r.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), r.ipv6uri = !0), r.pathNames = Eu(r, r.path), r.queryKey = Ru(r, r.query), r;
}
function Eu(t, e) {
  const n = /\/{2,9}/g, s = e.replace(n, "/").split("/");
  return (e.slice(0, 1) == "/" || e.length === 0) && s.splice(0, 1), e.slice(-1) == "/" && s.splice(s.length - 1, 1), s;
}
function Ru(t, e) {
  const n = {};
  return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, i, r) {
    i && (n[i] = r);
  }), n;
}
const zs = typeof addEventListener == "function" && typeof removeEventListener == "function", Dn = [];
zs && addEventListener("offline", () => {
  Dn.forEach((t) => t());
}, !1);
class Ct extends _e {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(e, n) {
    if (super(), this.binaryType = ru, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, e && typeof e == "object" && (n = e, e = null), e) {
      const s = Us(e);
      n.hostname = s.host, n.secure = s.protocol === "https" || s.protocol === "wss", n.port = s.port, s.query && (n.query = s.query);
    } else n.host && (n.hostname = Us(n.host).host);
    us(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((s) => {
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
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = hu(this.opts.query)), zs && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, Dn.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
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
    n.EIO = $o, n.transport = e, this.id && (n.sid = this.id);
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
    const e = this.opts.rememberUpgrade && Ct.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
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
    this.readyState = "open", Ct.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
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
      if (i && (n += au(i)), s > 0 && n > this._maxPayload)
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
    return e && (this._pingTimeoutTime = 0, as(() => {
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
    if (Ct.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
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
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), zs && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const s = Dn.indexOf(this._offlineEventListener);
        s !== -1 && Dn.splice(s, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", e, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
Ct.protocol = $o;
class Au extends Ct {
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
    Ct.priorWebsocketSuccess = !1;
    const i = () => {
      s || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (g) => {
        if (!s)
          if (g.type === "pong" && g.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", n), !n)
              return;
            Ct.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
              s || this.readyState !== "closed" && (a(), this.setTransport(n), n.send([{ type: "upgrade" }]), this.emitReserved("upgrade", n), n = null, this.upgrading = !1, this.flush());
            });
          } else {
            const b = new Error("probe error");
            b.transport = n.name, this.emitReserved("upgradeError", b);
          }
      }));
    };
    function r() {
      s || (s = !0, a(), n.close(), n = null);
    }
    const o = (g) => {
      const b = new Error("probe error: " + g);
      b.transport = n.name, r(), this.emitReserved("upgradeError", b);
    };
    function l() {
      o("transport closed");
    }
    function c() {
      o("socket closed");
    }
    function f(g) {
      n && g.name !== n.name && r();
    }
    const a = () => {
      n.removeListener("open", i), n.removeListener("error", o), n.removeListener("close", l), this.off("close", c), this.off("upgrading", f);
    };
    n.once("open", i), n.once("error", o), n.once("close", l), this.once("close", c), this.once("upgrading", f), this._upgrades.indexOf("webtransport") !== -1 && e !== "webtransport" ? this.setTimeoutFn(() => {
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
let Cu = class extends Au {
  constructor(e, n = {}) {
    const s = typeof e == "object" ? e : n;
    (!s.transports || s.transports && typeof s.transports[0] == "string") && (s.transports = (s.transports || ["polling", "websocket", "webtransport"]).map((i) => vu[i]).filter((i) => !!i)), super(e, s);
  }
};
function Ou(t, e = "", n) {
  let s = t;
  n = n || typeof location < "u" && location, t == null && (t = n.protocol + "//" + n.host), typeof t == "string" && (t.charAt(0) === "/" && (t.charAt(1) === "/" ? t = n.protocol + t : t = n.host + t), /^(https?|wss?):\/\//.test(t) || (typeof n < "u" ? t = n.protocol + "//" + t : t = "https://" + t), s = Us(t)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
  const r = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return s.id = s.protocol + "://" + r + ":" + s.port + e, s.href = s.protocol + "://" + r + (n && n.port === s.port ? "" : ":" + s.port), s;
}
const Pu = typeof ArrayBuffer == "function", Iu = (t) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer, Ho = Object.prototype.toString, Bu = typeof Blob == "function" || typeof Blob < "u" && Ho.call(Blob) === "[object BlobConstructor]", Lu = typeof File == "function" || typeof File < "u" && Ho.call(File) === "[object FileConstructor]";
function vi(t) {
  return Pu && (t instanceof ArrayBuffer || Iu(t)) || Bu && t instanceof Blob || Lu && t instanceof File;
}
function qn(t, e) {
  if (!t || typeof t != "object")
    return !1;
  if (Array.isArray(t)) {
    for (let n = 0, s = t.length; n < s; n++)
      if (qn(t[n]))
        return !0;
    return !1;
  }
  if (vi(t))
    return !0;
  if (t.toJSON && typeof t.toJSON == "function" && arguments.length === 1)
    return qn(t.toJSON(), !0);
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n) && qn(t[n]))
      return !0;
  return !1;
}
function $u(t) {
  const e = [], n = t.data, s = t;
  return s.data = Vs(n, e), s.attachments = e.length, { packet: s, buffers: e };
}
function Vs(t, e) {
  if (!t)
    return t;
  if (vi(t)) {
    const n = { _placeholder: !0, num: e.length };
    return e.push(t), n;
  } else if (Array.isArray(t)) {
    const n = new Array(t.length);
    for (let s = 0; s < t.length; s++)
      n[s] = Vs(t[s], e);
    return n;
  } else if (typeof t == "object" && !(t instanceof Date)) {
    const n = {};
    for (const s in t)
      Object.prototype.hasOwnProperty.call(t, s) && (n[s] = Vs(t[s], e));
    return n;
  }
  return t;
}
function Nu(t, e) {
  return t.data = Ws(t.data, e), delete t.attachments, t;
}
function Ws(t, e) {
  if (!t)
    return t;
  if (t && t._placeholder === !0) {
    if (typeof t.num == "number" && t.num >= 0 && t.num < e.length)
      return e[t.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(t))
    for (let n = 0; n < t.length; n++)
      t[n] = Ws(t[n], e);
  else if (typeof t == "object")
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (t[n] = Ws(t[n], e));
  return t;
}
const Fu = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], Mu = 5;
var K;
(function(t) {
  t[t.CONNECT = 0] = "CONNECT", t[t.DISCONNECT = 1] = "DISCONNECT", t[t.EVENT = 2] = "EVENT", t[t.ACK = 3] = "ACK", t[t.CONNECT_ERROR = 4] = "CONNECT_ERROR", t[t.BINARY_EVENT = 5] = "BINARY_EVENT", t[t.BINARY_ACK = 6] = "BINARY_ACK";
})(K || (K = {}));
class Du {
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
    return (e.type === K.EVENT || e.type === K.ACK) && qn(e) ? this.encodeAsBinary({
      type: e.type === K.EVENT ? K.BINARY_EVENT : K.BINARY_ACK,
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
    return (e.type === K.BINARY_EVENT || e.type === K.BINARY_ACK) && (n += e.attachments + "-"), e.nsp && e.nsp !== "/" && (n += e.nsp + ","), e.id != null && (n += e.id), e.data != null && (n += JSON.stringify(e.data, this.replacer)), n;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(e) {
    const n = $u(e), s = this.encodeAsString(n.packet), i = n.buffers;
    return i.unshift(s), i;
  }
}
function fr(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
class Si extends _e {
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
      const s = n.type === K.BINARY_EVENT;
      s || n.type === K.BINARY_ACK ? (n.type = s ? K.EVENT : K.ACK, this.reconstructor = new qu(n), n.attachments === 0 && super.emitReserved("decoded", n)) : super.emitReserved("decoded", n);
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
    if (K[s.type] === void 0)
      throw new Error("unknown packet type " + s.type);
    if (s.type === K.BINARY_EVENT || s.type === K.BINARY_ACK) {
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
      case K.CONNECT:
        return fr(n);
      case K.DISCONNECT:
        return n === void 0;
      case K.CONNECT_ERROR:
        return typeof n == "string" || fr(n);
      case K.EVENT:
      case K.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && Fu.indexOf(n[0]) === -1);
      case K.ACK:
      case K.BINARY_ACK:
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
class qu {
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
      const n = Nu(this.reconPack, this.buffers);
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
  Encoder: Du,
  get PacketType() {
    return K;
  },
  protocol: Mu
}, Symbol.toStringTag, { value: "Module" }));
function Xe(t, e, n) {
  return t.on(e, n), function() {
    t.off(e, n);
  };
}
const ju = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class jo extends _e {
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
      Xe(e, "open", this.onopen.bind(this)),
      Xe(e, "packet", this.onpacket.bind(this)),
      Xe(e, "error", this.onerror.bind(this)),
      Xe(e, "close", this.onclose.bind(this))
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
    if (ju.hasOwnProperty(e))
      throw new Error('"' + e.toString() + '" is a reserved event name');
    if (n.unshift(e), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const o = {
      type: K.EVENT,
      data: n
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
      const a = this.ids++, g = n.pop();
      this._registerAckCallback(a, g), o.id = a;
    }
    const l = (i = (s = this.io.engine) === null || s === void 0 ? void 0 : s.transport) === null || i === void 0 ? void 0 : i.writable, c = this.connected && !(!((r = this.io.engine) === null || r === void 0) && r._hasPingExpired());
    return this.flags.volatile && !l || (c ? (this.notifyOutgoingListeners(o), this.packet(o)) : this.sendBuffer.push(o)), this.flags = {}, this;
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
      type: K.CONNECT,
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
        case K.CONNECT:
          e.data && e.data.sid ? this.onconnect(e.data.sid, e.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case K.EVENT:
        case K.BINARY_EVENT:
          this.onevent(e);
          break;
        case K.ACK:
        case K.BINARY_ACK:
          this.onack(e);
          break;
        case K.DISCONNECT:
          this.ondisconnect();
          break;
        case K.CONNECT_ERROR:
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
        type: K.ACK,
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
    return this.connected && this.packet({ type: K.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
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
function tn(t) {
  t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
}
tn.prototype.duration = function() {
  var t = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var e = Math.random(), n = Math.floor(e * this.jitter * t);
    t = Math.floor(e * 10) & 1 ? t + n : t - n;
  }
  return Math.min(t, this.max) | 0;
};
tn.prototype.reset = function() {
  this.attempts = 0;
};
tn.prototype.setMin = function(t) {
  this.ms = t;
};
tn.prototype.setMax = function(t) {
  this.max = t;
};
tn.prototype.setJitter = function(t) {
  this.jitter = t;
};
class Ks extends _e {
  constructor(e, n) {
    var s;
    super(), this.nsps = {}, this.subs = [], e && typeof e == "object" && (n = e, e = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, us(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5), this.backoff = new tn({
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
    this.engine = new Cu(this.uri, this.opts);
    const n = this.engine, s = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const i = Xe(n, "open", function() {
      s.onopen(), e && e();
    }), r = (l) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", l), e ? e(l) : this.maybeReconnectOnOpen();
    }, o = Xe(n, "error", r);
    if (this._timeout !== !1) {
      const l = this._timeout, c = this.setTimeoutFn(() => {
        i(), r(new Error("timeout")), n.close();
      }, l);
      this.opts.autoUnref && c.unref(), this.subs.push(() => {
        this.clearTimeoutFn(c);
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
      Xe(e, "ping", this.onping.bind(this)),
      Xe(e, "data", this.ondata.bind(this)),
      Xe(e, "error", this.onerror.bind(this)),
      Xe(e, "close", this.onclose.bind(this)),
      // @ts-ignore
      Xe(this.decoder, "decoded", this.ondecoded.bind(this))
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
    as(() => {
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
function Hn(t, e) {
  typeof t == "object" && (e = t, t = void 0), e = e || {};
  const n = Ou(t, e.path || "/socket.io"), s = n.source, i = n.id, r = n.path, o = ln[i] && r in ln[i].nsps, l = e.forceNew || e["force new connection"] || e.multiplex === !1 || o;
  let c;
  return l ? c = new Ks(s, e) : (ln[i] || (ln[i] = new Ks(s, e)), c = ln[i]), n.query && !e.query && (e.query = n.queryKey), c.socket(n.path, e);
}
Object.assign(Hn, {
  Manager: Ks,
  Socket: jo,
  io: Hn,
  connect: Hn
});
function Uu() {
  const t = Se([]), e = Se(!1), n = Se(""), s = Se(!1), i = Se(!1), r = Se(!1), o = Se("connecting"), l = Se(0), c = 5, f = Se({});
  let a = null, g = null;
  const b = (F) => (a = Hn(`${_i.WS_URL}/widget`, {
    transports: ["websocket"],
    reconnection: !0,
    reconnectionAttempts: c,
    reconnectionDelay: 1e3,
    auth: {
      session_id: F
    }
  }), a.on("connect", () => {
    o.value = "connected", l.value = 0;
  }), a.on("disconnect", () => {
    o.value === "connected" && (o.value = "connecting");
  }), a.on("connect_error", () => {
    l.value++, console.error("Socket connection failed, attempt:", l.value), l.value >= c && (o.value = "failed");
  }), a.on("chat_response", (W) => {
    W.type === "agent_message" ? t.value.push({
      message: W.message,
      message_type: "agent",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: "",
      agent_name: W.agent_name
    }) : t.value.push({
      message: W.message,
      message_type: "bot",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: "",
      agent_name: W.agent_name
    }), e.value = !1;
  }), a.on("handle_taken_over", (W) => {
    t.value.push({
      message: `${W.user_name} joined the conversation`,
      message_type: "system",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: W.session_id
    }), f.value = {
      ...f.value,
      agent_name: W.user_name,
      agent_profile_pic: W.profile_picture
    }, g && g(W);
  }), a.on("error", V), a.on("chat_history", U), a), w = async () => {
    try {
      return o.value = "connecting", l.value = 0, a && (a.removeAllListeners(), a.disconnect(), a = null), a = b(""), new Promise((F) => {
        a == null || a.on("connect", () => {
          F(!0);
        }), a == null || a.on("connect_error", () => {
          l.value >= c && F(!1);
        });
      });
    } catch (F) {
      return console.error("Socket initialization failed:", F), o.value = "failed", !1;
    }
  }, O = () => (a && a.disconnect(), w()), P = (F) => {
    g = F;
  }, V = (F) => {
    e.value = !1, n.value = pa(F), s.value = !0, setTimeout(() => {
      s.value = !1, n.value = "";
    }, 5e3);
  }, U = (F) => {
    if (F.type === "chat_history" && Array.isArray(F.messages)) {
      const W = F.messages.map((H) => ({
        message: H.message,
        message_type: H.message_type,
        timestamp: H.timestamp,
        attributes: H.attributes || {},
        session_id: "",
        agent_name: H.agent_name || "",
        user_name: H.user_name || ""
      }));
      t.value = [
        ...W.filter(
          (H) => !t.value.some(
            (te) => te.message === H.message && te.message_type === H.message_type
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
    sendMessage: async (F, W) => {
      !a || !F.trim() || (f.value.full_name || (e.value = !0), t.value.push({
        message: F,
        message_type: "user",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: ""
      }), a.emit("chat", {
        message: F,
        email: W
      }), r.value = !0);
    },
    loadChatHistory: async () => {
      if (a)
        try {
          i.value = !0, a.emit("get_chat_history");
        } catch (F) {
          console.error("Failed to load chat history:", F);
        } finally {
          i.value = !1;
        }
    },
    connect: w,
    reconnect: O,
    cleanup: () => {
      a && (a.removeAllListeners(), a.disconnect(), a = null), g = null;
    },
    customer: f,
    onTakeover: P
  };
}
function zu(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Es = { exports: {} }, hr;
function Vu() {
  return hr || (hr = 1, function(t) {
    (function() {
      function e(u, p, _) {
        return u.call.apply(u.bind, arguments);
      }
      function n(u, p, _) {
        if (!u) throw Error();
        if (2 < arguments.length) {
          var m = Array.prototype.slice.call(arguments, 2);
          return function() {
            var T = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(T, m), u.apply(p, T);
          };
        }
        return function() {
          return u.apply(p, arguments);
        };
      }
      function s(u, p, _) {
        return s = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? e : n, s.apply(null, arguments);
      }
      var i = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function r(u, p) {
        this.a = u, this.o = p || u, this.c = this.o.document;
      }
      var o = !!window.FontFace;
      function l(u, p, _, m) {
        if (p = u.c.createElement(p), _) for (var T in _) _.hasOwnProperty(T) && (T == "style" ? p.style.cssText = _[T] : p.setAttribute(T, _[T]));
        return m && p.appendChild(u.c.createTextNode(m)), p;
      }
      function c(u, p, _) {
        u = u.c.getElementsByTagName(p)[0], u || (u = document.documentElement), u.insertBefore(_, u.lastChild);
      }
      function f(u) {
        u.parentNode && u.parentNode.removeChild(u);
      }
      function a(u, p, _) {
        p = p || [], _ = _ || [];
        for (var m = u.className.split(/\s+/), T = 0; T < p.length; T += 1) {
          for (var B = !1, N = 0; N < m.length; N += 1) if (p[T] === m[N]) {
            B = !0;
            break;
          }
          B || m.push(p[T]);
        }
        for (p = [], T = 0; T < m.length; T += 1) {
          for (B = !1, N = 0; N < _.length; N += 1) if (m[T] === _[N]) {
            B = !0;
            break;
          }
          B || p.push(m[T]);
        }
        u.className = p.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function g(u, p) {
        for (var _ = u.className.split(/\s+/), m = 0, T = _.length; m < T; m++) if (_[m] == p) return !0;
        return !1;
      }
      function b(u) {
        return u.o.location.hostname || u.a.location.hostname;
      }
      function w(u, p, _) {
        function m() {
          ne && T && B && (ne(N), ne = null);
        }
        p = l(u, "link", { rel: "stylesheet", href: p, media: "all" });
        var T = !1, B = !0, N = null, ne = _ || null;
        o ? (p.onload = function() {
          T = !0, m();
        }, p.onerror = function() {
          T = !0, N = Error("Stylesheet failed to load"), m();
        }) : setTimeout(function() {
          T = !0, m();
        }, 0), c(u, "head", p);
      }
      function O(u, p, _, m) {
        var T = u.c.getElementsByTagName("head")[0];
        if (T) {
          var B = l(u, "script", { src: p }), N = !1;
          return B.onload = B.onreadystatechange = function() {
            N || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (N = !0, _ && _(null), B.onload = B.onreadystatechange = null, B.parentNode.tagName == "HEAD" && T.removeChild(B));
          }, T.appendChild(B), setTimeout(function() {
            N || (N = !0, _ && _(Error("Script load timeout")));
          }, m || 5e3), B;
        }
        return null;
      }
      function P() {
        this.a = 0, this.c = null;
      }
      function V(u) {
        return u.a++, function() {
          u.a--, Q(u);
        };
      }
      function U(u, p) {
        u.c = p, Q(u);
      }
      function Q(u) {
        u.a == 0 && u.c && (u.c(), u.c = null);
      }
      function ee(u) {
        this.a = u || "-";
      }
      ee.prototype.c = function(u) {
        for (var p = [], _ = 0; _ < arguments.length; _++) p.push(arguments[_].replace(/[\W_]+/g, "").toLowerCase());
        return p.join(this.a);
      };
      function I(u, p) {
        this.c = u, this.f = 4, this.a = "n";
        var _ = (p || "n4").match(/^([nio])([1-9])$/i);
        _ && (this.a = _[1], this.f = parseInt(_[2], 10));
      }
      function F(u) {
        return te(u) + " " + (u.f + "00") + " 300px " + W(u.c);
      }
      function W(u) {
        var p = [];
        u = u.split(/,\s*/);
        for (var _ = 0; _ < u.length; _++) {
          var m = u[_].replace(/['"]/g, "");
          m.indexOf(" ") != -1 || /^\d/.test(m) ? p.push("'" + m + "'") : p.push(m);
        }
        return p.join(",");
      }
      function H(u) {
        return u.a + u.f;
      }
      function te(u) {
        var p = "normal";
        return u.a === "o" ? p = "oblique" : u.a === "i" && (p = "italic"), p;
      }
      function $e(u) {
        var p = 4, _ = "n", m = null;
        return u && ((m = u.match(/(normal|oblique|italic)/i)) && m[1] && (_ = m[1].substr(0, 1).toLowerCase()), (m = u.match(/([1-9]00|normal|bold)/i)) && m[1] && (/bold/i.test(m[1]) ? p = 7 : /[1-9]00/.test(m[1]) && (p = parseInt(m[1].substr(0, 1), 10)))), _ + p;
      }
      function ze(u, p) {
        this.c = u, this.f = u.o.document.documentElement, this.h = p, this.a = new ee("-"), this.j = p.events !== !1, this.g = p.classes !== !1;
      }
      function Ve(u) {
        u.g && a(u.f, [u.a.c("wf", "loading")]), Fe(u, "loading");
      }
      function pt(u) {
        if (u.g) {
          var p = g(u.f, u.a.c("wf", "active")), _ = [], m = [u.a.c("wf", "loading")];
          p || _.push(u.a.c("wf", "inactive")), a(u.f, _, m);
        }
        Fe(u, "inactive");
      }
      function Fe(u, p, _) {
        u.j && u.h[p] && (_ ? u.h[p](_.c, H(_)) : u.h[p]());
      }
      function kt() {
        this.c = {};
      }
      function Lt(u, p, _) {
        var m = [], T;
        for (T in p) if (p.hasOwnProperty(T)) {
          var B = u.c[T];
          B && m.push(B(p[T], _));
        }
        return m;
      }
      function he(u, p) {
        this.c = u, this.f = p, this.a = l(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function se(u) {
        c(u.c, "body", u.a);
      }
      function G(u) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + W(u.c) + ";" + ("font-style:" + te(u) + ";font-weight:" + (u.f + "00") + ";");
      }
      function We(u, p, _, m, T, B) {
        this.g = u, this.j = p, this.a = m, this.c = _, this.f = T || 3e3, this.h = B || void 0;
      }
      We.prototype.start = function() {
        var u = this.c.o.document, p = this, _ = i(), m = new Promise(function(N, ne) {
          function oe() {
            i() - _ >= p.f ? ne() : u.fonts.load(F(p.a), p.h).then(function(ye) {
              1 <= ye.length ? N() : setTimeout(oe, 25);
            }, function() {
              ne();
            });
          }
          oe();
        }), T = null, B = new Promise(function(N, ne) {
          T = setTimeout(ne, p.f);
        });
        Promise.race([B, m]).then(function() {
          T && (clearTimeout(T), T = null), p.g(p.a);
        }, function() {
          p.j(p.a);
        });
      };
      function tt(u, p, _, m, T, B, N) {
        this.v = u, this.B = p, this.c = _, this.a = m, this.s = N || "BESbswy", this.f = {}, this.w = T || 3e3, this.u = B || null, this.m = this.j = this.h = this.g = null, this.g = new he(this.c, this.s), this.h = new he(this.c, this.s), this.j = new he(this.c, this.s), this.m = new he(this.c, this.s), u = new I(this.a.c + ",serif", H(this.a)), u = G(u), this.g.a.style.cssText = u, u = new I(this.a.c + ",sans-serif", H(this.a)), u = G(u), this.h.a.style.cssText = u, u = new I("serif", H(this.a)), u = G(u), this.j.a.style.cssText = u, u = new I("sans-serif", H(this.a)), u = G(u), this.m.a.style.cssText = u, se(this.g), se(this.h), se(this.j), se(this.m);
      }
      var Ce = { D: "serif", C: "sans-serif" }, ke = null;
      function nt() {
        if (ke === null) {
          var u = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          ke = !!u && (536 > parseInt(u[1], 10) || parseInt(u[1], 10) === 536 && 11 >= parseInt(u[2], 10));
        }
        return ke;
      }
      tt.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = i(), vt(this);
      };
      function zt(u, p, _) {
        for (var m in Ce) if (Ce.hasOwnProperty(m) && p === u.f[Ce[m]] && _ === u.f[Ce[m]]) return !0;
        return !1;
      }
      function vt(u) {
        var p = u.g.a.offsetWidth, _ = u.h.a.offsetWidth, m;
        (m = p === u.f.serif && _ === u.f["sans-serif"]) || (m = nt() && zt(u, p, _)), m ? i() - u.A >= u.w ? nt() && zt(u, p, _) && (u.u === null || u.u.hasOwnProperty(u.a.c)) ? de(u, u.v) : de(u, u.B) : dt(u) : de(u, u.v);
      }
      function dt(u) {
        setTimeout(s(function() {
          vt(this);
        }, u), 50);
      }
      function de(u, p) {
        setTimeout(s(function() {
          f(this.g.a), f(this.h.a), f(this.j.a), f(this.m.a), p(this.a);
        }, u), 0);
      }
      function Z(u, p, _) {
        this.c = u, this.a = p, this.f = 0, this.m = this.j = !1, this.s = _;
      }
      var pe = null;
      Z.prototype.g = function(u) {
        var p = this.a;
        p.g && a(p.f, [p.a.c("wf", u.c, H(u).toString(), "active")], [p.a.c("wf", u.c, H(u).toString(), "loading"), p.a.c("wf", u.c, H(u).toString(), "inactive")]), Fe(p, "fontactive", u), this.m = !0, xe(this);
      }, Z.prototype.h = function(u) {
        var p = this.a;
        if (p.g) {
          var _ = g(p.f, p.a.c("wf", u.c, H(u).toString(), "active")), m = [], T = [p.a.c("wf", u.c, H(u).toString(), "loading")];
          _ || m.push(p.a.c("wf", u.c, H(u).toString(), "inactive")), a(p.f, m, T);
        }
        Fe(p, "fontinactive", u), xe(this);
      };
      function xe(u) {
        --u.f == 0 && u.j && (u.m ? (u = u.a, u.g && a(u.f, [u.a.c("wf", "active")], [u.a.c("wf", "loading"), u.a.c("wf", "inactive")]), Fe(u, "active")) : pt(u.a));
      }
      function En(u) {
        this.j = u, this.a = new kt(), this.h = 0, this.f = this.g = !0;
      }
      En.prototype.load = function(u) {
        this.c = new r(this.j, u.context || this.j), this.g = u.events !== !1, this.f = u.classes !== !1, d(this, new ze(this.c, u), u);
      };
      function h(u, p, _, m, T) {
        var B = --u.h == 0;
        (u.f || u.g) && setTimeout(function() {
          var N = T || null, ne = m || null || {};
          if (_.length === 0 && B) pt(p.a);
          else {
            p.f += _.length, B && (p.j = B);
            var oe, ye = [];
            for (oe = 0; oe < _.length; oe++) {
              var be = _[oe], Oe = ne[be.c], Qe = p.a, Vt = be;
              if (Qe.g && a(Qe.f, [Qe.a.c("wf", Vt.c, H(Vt).toString(), "loading")]), Fe(Qe, "fontloading", Vt), Qe = null, pe === null) if (window.FontFace) {
                var Vt = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), Uo = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                pe = Vt ? 42 < parseInt(Vt[1], 10) : !Uo;
              } else pe = !1;
              pe ? Qe = new We(s(p.g, p), s(p.h, p), p.c, be, p.s, Oe) : Qe = new tt(s(p.g, p), s(p.h, p), p.c, be, p.s, N, Oe), ye.push(Qe);
            }
            for (oe = 0; oe < ye.length; oe++) ye[oe].start();
          }
        }, 0);
      }
      function d(u, p, _) {
        var T = [], m = _.timeout;
        Ve(p);
        var T = Lt(u.a, _, u.c), B = new Z(u.c, p, m);
        for (u.h = T.length, p = 0, _ = T.length; p < _; p++) T[p].load(function(N, ne, oe) {
          h(u, B, N, ne, oe);
        });
      }
      function y(u, p) {
        this.c = u, this.a = p;
      }
      y.prototype.load = function(u) {
        function p() {
          if (B["__mti_fntLst" + m]) {
            var N = B["__mti_fntLst" + m](), ne = [], oe;
            if (N) for (var ye = 0; ye < N.length; ye++) {
              var be = N[ye].fontfamily;
              N[ye].fontStyle != null && N[ye].fontWeight != null ? (oe = N[ye].fontStyle + N[ye].fontWeight, ne.push(new I(be, oe))) : ne.push(new I(be));
            }
            u(ne);
          } else setTimeout(function() {
            p();
          }, 50);
        }
        var _ = this, m = _.a.projectId, T = _.a.version;
        if (m) {
          var B = _.c.o;
          O(this.c, (_.a.api || "https://fast.fonts.net/jsapi") + "/" + m + ".js" + (T ? "?v=" + T : ""), function(N) {
            N ? u([]) : (B["__MonotypeConfiguration__" + m] = function() {
              return _.a;
            }, p());
          }).id = "__MonotypeAPIScript__" + m;
        } else u([]);
      };
      function v(u, p) {
        this.c = u, this.a = p;
      }
      v.prototype.load = function(u) {
        var p, _, m = this.a.urls || [], T = this.a.families || [], B = this.a.testStrings || {}, N = new P();
        for (p = 0, _ = m.length; p < _; p++) w(this.c, m[p], V(N));
        var ne = [];
        for (p = 0, _ = T.length; p < _; p++) if (m = T[p].split(":"), m[1]) for (var oe = m[1].split(","), ye = 0; ye < oe.length; ye += 1) ne.push(new I(m[0], oe[ye]));
        else ne.push(new I(m[0]));
        U(N, function() {
          u(ne, B);
        });
      };
      function x(u, p) {
        u ? this.c = u : this.c = k, this.a = [], this.f = [], this.g = p || "";
      }
      var k = "https://fonts.googleapis.com/css";
      function A(u, p) {
        for (var _ = p.length, m = 0; m < _; m++) {
          var T = p[m].split(":");
          T.length == 3 && u.f.push(T.pop());
          var B = "";
          T.length == 2 && T[1] != "" && (B = ":"), u.a.push(T.join(B));
        }
      }
      function R(u) {
        if (u.a.length == 0) throw Error("No fonts to load!");
        if (u.c.indexOf("kit=") != -1) return u.c;
        for (var p = u.a.length, _ = [], m = 0; m < p; m++) _.push(u.a[m].replace(/ /g, "+"));
        return p = u.c + "?family=" + _.join("%7C"), 0 < u.f.length && (p += "&subset=" + u.f.join(",")), 0 < u.g.length && (p += "&text=" + encodeURIComponent(u.g)), p;
      }
      function E(u) {
        this.f = u, this.a = [], this.c = {};
      }
      var S = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, $ = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, C = { i: "i", italic: "i", n: "n", normal: "n" }, L = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function M(u) {
        for (var p = u.f.length, _ = 0; _ < p; _++) {
          var m = u.f[_].split(":"), T = m[0].replace(/\+/g, " "), B = ["n4"];
          if (2 <= m.length) {
            var N, ne = m[1];
            if (N = [], ne) for (var ne = ne.split(","), oe = ne.length, ye = 0; ye < oe; ye++) {
              var be;
              if (be = ne[ye], be.match(/^[\w-]+$/)) {
                var Oe = L.exec(be.toLowerCase());
                if (Oe == null) be = "";
                else {
                  if (be = Oe[2], be = be == null || be == "" ? "n" : C[be], Oe = Oe[1], Oe == null || Oe == "") Oe = "4";
                  else var Qe = $[Oe], Oe = Qe || (isNaN(Oe) ? "4" : Oe.substr(0, 1));
                  be = [be, Oe].join("");
                }
              } else be = "";
              be && N.push(be);
            }
            0 < N.length && (B = N), m.length == 3 && (m = m[2], N = [], m = m ? m.split(",") : N, 0 < m.length && (m = S[m[0]]) && (u.c[T] = m));
          }
          for (u.c[T] || (m = S[T]) && (u.c[T] = m), m = 0; m < B.length; m += 1) u.a.push(new I(T, B[m]));
        }
      }
      function z(u, p) {
        this.c = u, this.a = p;
      }
      var ce = { Arimo: !0, Cousine: !0, Tinos: !0 };
      z.prototype.load = function(u) {
        var p = new P(), _ = this.c, m = new x(this.a.api, this.a.text), T = this.a.families;
        A(m, T);
        var B = new E(T);
        M(B), w(_, R(m), V(p)), U(p, function() {
          u(B.a, B.c, ce);
        });
      };
      function X(u, p) {
        this.c = u, this.a = p;
      }
      X.prototype.load = function(u) {
        var p = this.a.id, _ = this.c.o;
        p ? O(this.c, (this.a.api || "https://use.typekit.net") + "/" + p + ".js", function(m) {
          if (m) u([]);
          else if (_.Typekit && _.Typekit.config && _.Typekit.config.fn) {
            m = _.Typekit.config.fn;
            for (var T = [], B = 0; B < m.length; B += 2) for (var N = m[B], ne = m[B + 1], oe = 0; oe < ne.length; oe++) T.push(new I(N, ne[oe]));
            try {
              _.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            u(T);
          }
        }, 2e3) : u([]);
      };
      function ve(u, p) {
        this.c = u, this.f = p, this.a = [];
      }
      ve.prototype.load = function(u) {
        var p = this.f.id, _ = this.c.o, m = this;
        p ? (_.__webfontfontdeckmodule__ || (_.__webfontfontdeckmodule__ = {}), _.__webfontfontdeckmodule__[p] = function(T, B) {
          for (var N = 0, ne = B.fonts.length; N < ne; ++N) {
            var oe = B.fonts[N];
            m.a.push(new I(oe.name, $e("font-weight:" + oe.weight + ";font-style:" + oe.style)));
          }
          u(m.a);
        }, O(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + b(this.c) + "/" + p + ".js", function(T) {
          T && u([]);
        })) : u([]);
      };
      var ge = new En(window);
      ge.a.c.custom = function(u, p) {
        return new v(p, u);
      }, ge.a.c.fontdeck = function(u, p) {
        return new ve(p, u);
      }, ge.a.c.monotype = function(u, p) {
        return new y(p, u);
      }, ge.a.c.typekit = function(u, p) {
        return new X(p, u);
      }, ge.a.c.google = function(u, p) {
        return new z(p, u);
      };
      var Me = { load: s(ge.load, ge) };
      t.exports ? t.exports = Me : (window.WebFont = Me, window.WebFontConfig && ge.load(window.WebFontConfig));
    })();
  }(Es)), Es.exports;
}
var Wu = Vu();
const Ku = /* @__PURE__ */ zu(Wu);
function Gu() {
  const t = Se({}), e = Se(""), n = (i, r, o) => {
    t.value = i, e.value = o.full_name ? o.full_name : r, o.profile_pic && (t.value.photo_url = o.profile_pic), i.font_family && Ku.load({
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
const Zu = {
  key: 0,
  class: "connecting-message"
}, Yu = {
  key: 1,
  class: "failed-message"
}, Ju = { class: "header-content" }, Qu = ["src", "alt"], Xu = { class: "header-info" }, ef = { class: "status" }, tf = {
  key: 0,
  class: "loading-history"
}, nf = ["innerHTML"], sf = { class: "message-info" }, rf = {
  key: 0,
  class: "agent-name"
}, of = {
  key: 0,
  class: "typing-indicator"
}, lf = {
  key: 0,
  class: "email-input"
}, cf = ["disabled"], af = { class: "message-input" }, uf = ["placeholder", "disabled"], ff = ["disabled"], hf = /* @__PURE__ */ Ml({
  __name: "WidgetBuilder",
  props: {
    widgetId: {}
  },
  setup(t) {
    J.setOptions({
      renderer: new J.Renderer(),
      gfm: !0,
      breaks: !0
    });
    const e = new J.Renderer(), n = e.link;
    e.link = (de, Z, pe) => n.call(e, de, Z, pe).replace(/^<a /, '<a target="_blank" rel="nofollow" '), J.use({ renderer: e });
    const s = t, {
      customization: i,
      agentName: r,
      applyCustomization: o,
      initializeFromData: l
    } = Gu(), {
      messages: c,
      loading: f,
      errorMessage: a,
      showError: g,
      loadingHistory: b,
      hasStartedChat: w,
      connectionStatus: O,
      sendMessage: P,
      loadChatHistory: V,
      connect: U,
      reconnect: Q,
      cleanup: ee,
      customer: I,
      onTakeover: F
    } = Uu(), W = Se(""), H = Se(!0), te = Se(""), $e = Se(!1);
    l();
    const ze = window.__INITIAL_DATA__;
    ze && ($e.value = !!ze.customerId);
    const Ve = Se(null), {
      chatStyles: pt,
      chatIconStyles: Fe,
      agentBubbleStyles: kt,
      userBubbleStyles: Lt,
      messageNameStyles: he,
      headerBorderStyles: se,
      photoUrl: G,
      shadowStyle: We
    } = Za(i), tt = ot(() => ($e.value || ks(te.value.trim())) && O.value === "connected"), Ce = async () => {
      W.value.trim() && (!w.value && te.value && await nt(), await P(W.value, te.value), W.value = "");
    }, ke = (de) => {
      de.key === "Enter" && !de.shiftKey && (de.preventDefault(), Ce());
    }, nt = async () => {
      var de;
      try {
        const Z = new URL(`${_i.API_URL}/widgets/${s.widgetId}`);
        te.value.trim() && ks(te.value.trim()) && Z.searchParams.append("email", te.value.trim());
        const pe = await fetch(Z);
        if (pe.status === 401)
          return $e.value = !1, !1;
        const xe = await pe.json();
        return $e.value = !0, await U() ? (await zt(), (de = xe.agent) != null && de.customization && (I.value = xe.customer, o(xe.agent.customization, xe.agent.display_name, xe.customer)), !0) : (console.error("Failed to connect to chat service"), !1);
      } catch (Z) {
        return console.error("Error checking authorization:", Z), $e.value = !1, !1;
      }
    }, zt = async () => {
      !w.value && $e.value && (w.value = !0, await V());
    }, vt = () => {
      Ve.value && (Ve.value.scrollTop = Ve.value.scrollHeight);
    };
    $n(() => c.value, (de) => {
      Dr(() => {
        vt();
      });
    }, { deep: !0 });
    const dt = async () => {
      await Q() && await nt();
    };
    return Kr(async () => {
      if (!await nt()) {
        O.value = "connected";
        return;
      }
      F(async () => {
        await nt();
      }), window.addEventListener("message", (Z) => {
        Z.data.type === "SCROLL_TO_BOTTOM" && vt();
      });
    }), ci(() => {
      window.removeEventListener("message", (de) => {
        de.data.type === "SCROLL_TO_BOTTOM" && vt();
      }), ee();
    }), (de, Z) => (Ne(), De("div", {
      class: Rt(["chat-container", { collapsed: !H.value }]),
      style: He(j(We))
    }, [
      j(O) !== "connected" ? (Ne(), De("div", {
        key: 0,
        class: Rt(["connection-status", j(O)])
      }, [
        j(O) === "connecting" ? (Ne(), De("div", Zu, Z[2] || (Z[2] = [
          Ms(" Connecting to chat service... "),
          Y("div", { class: "loading-dots" }, [
            Y("div", { class: "dot" }),
            Y("div", { class: "dot" }),
            Y("div", { class: "dot" })
          ], -1)
        ]))) : j(O) === "failed" ? (Ne(), De("div", Yu, [
          Z[3] || (Z[3] = Ms(" Connection failed. ")),
          Y("button", {
            onClick: dt,
            class: "reconnect-button"
          }, " Click here to reconnect ")
        ])) : mt("", !0)
      ], 2)) : mt("", !0),
      j(g) ? (Ne(), De("div", {
        key: 1,
        class: "error-alert",
        style: He(j(Fe))
      }, As(j(a)), 5)) : mt("", !0),
      H.value ? (Ne(), De("div", {
        key: 2,
        class: "chat-panel",
        style: He(j(pt))
      }, [
        Y("div", {
          class: "chat-header",
          style: He(j(se))
        }, [
          Y("div", Ju, [
            j(I).agent_profile_pic || j(G) ? (Ne(), De("img", {
              key: 0,
              src: j(I).agent_profile_pic || j(G),
              alt: j(I).agent_name || j(r),
              class: "header-avatar"
            }, null, 8, Qu)) : mt("", !0),
            Y("div", Xu, [
              Y("h3", {
                style: He(j(he))
              }, As(j(I).agent_name || j(r)), 5),
              Y("div", ef, [
                Z[4] || (Z[4] = Y("span", { class: "status-indicator online" }, null, -1)),
                Y("span", {
                  class: "status-text",
                  style: He(j(he))
                }, "Online", 4)
              ])
            ])
          ])
        ], 4),
        j(b) ? (Ne(), De("div", tf, Z[5] || (Z[5] = [
          Y("div", { class: "loading-spinner" }, [
            Y("div", { class: "dot" }),
            Y("div", { class: "dot" }),
            Y("div", { class: "dot" })
          ], -1)
        ]))) : mt("", !0),
        Y("div", {
          class: "chat-messages",
          ref_key: "messagesContainer",
          ref: Ve
        }, [
          (Ne(!0), De(lt, null, Jl(j(c), (pe, xe) => (Ne(), De("div", {
            key: xe,
            class: Rt([
              "message",
              pe.message_type === "bot" || pe.message_type === "agent" ? "agent-message" : pe.message_type === "system" ? "system-message" : "user-message"
            ])
          }, [
            Y("div", {
              class: "message-bubble",
              style: He(pe.message_type === "system" ? {} : pe.message_type === "user" ? j(Lt) : j(kt))
            }, [
              Y("div", {
                innerHTML: j(J)(pe.message, { renderer: j(e) })
              }, null, 8, nf)
            ], 4),
            Y("div", sf, [
              pe.message_type === "user" ? (Ne(), De("span", rf, " You ")) : mt("", !0)
            ])
          ], 2))), 128)),
          j(f) ? (Ne(), De("div", of, Z[6] || (Z[6] = [
            Y("div", { class: "dot" }, null, -1),
            Y("div", { class: "dot" }, null, -1),
            Y("div", { class: "dot" }, null, -1)
          ]))) : mt("", !0)
        ], 512),
        Y("div", {
          class: "chat-input",
          style: He(j(kt))
        }, [
          !j(w) && !$e.value ? (Ne(), De("div", lf, [
            Ci(Y("input", {
              "onUpdate:modelValue": Z[0] || (Z[0] = (pe) => te.value = pe),
              type: "email",
              placeholder: "Enter your email address to begin",
              disabled: j(f) || j(O) !== "connected",
              class: Rt({
                invalid: te.value.trim() && !j(ks)(te.value.trim()),
                disabled: j(O) !== "connected"
              })
            }, null, 10, cf), [
              [er, te.value]
            ])
          ])) : mt("", !0),
          Y("div", af, [
            Ci(Y("input", {
              "onUpdate:modelValue": Z[1] || (Z[1] = (pe) => W.value = pe),
              type: "text",
              placeholder: j(O) === "connected" ? "Type a message..." : "Connecting...",
              onKeypress: ke,
              disabled: !tt.value,
              class: Rt({ disabled: j(O) !== "connected" })
            }, null, 42, uf), [
              [er, W.value]
            ]),
            Y("button", {
              class: "send-button",
              style: He(j(Lt)),
              onClick: Ce,
              disabled: !W.value.trim() || !tt.value
            }, Z[7] || (Z[7] = [
              Y("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                Y("path", {
                  d: "M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1)
            ]), 12, ff)
          ])
        ], 4),
        Y("div", {
          class: "powered-by",
          style: He(j(he))
        }, " Powered by ChatterMate ", 4)
      ], 4)) : mt("", !0)
    ], 6));
  }
}), pf = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, i] of e)
    n[s] = i;
  return n;
}, df = /* @__PURE__ */ pf(hf, [["__scopeId", "data-v-28311f53"]]);
window.process || (window.process = { env: { NODE_ENV: "production" } });
const gf = new URL(window.location.href), mf = gf.searchParams.get("widget_id"), yf = aa(df, {
  widgetId: mf
});
yf.mount("#app");
