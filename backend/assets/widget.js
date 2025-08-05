var vl = Object.defineProperty;
var wl = (t, e, n) => e in t ? vl(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var we = (t, e, n) => wl(t, typeof e != "symbol" ? e + "" : e, n);
/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function dr(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const ke = {}, ln = [], yt = () => {
}, kl = () => !1, gs = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), pr = (t) => t.startsWith("onUpdate:"), $e = Object.assign, gr = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, xl = Object.prototype.hasOwnProperty, me = (t, e) => xl.call(t, e), $ = Array.isArray, an = (t) => ms(t) === "[object Map]", Mi = (t) => ms(t) === "[object Set]", Y = (t) => typeof t == "function", Be = (t) => typeof t == "string", Wt = (t) => typeof t == "symbol", Fe = (t) => t !== null && typeof t == "object", qi = (t) => (Fe(t) || Y(t)) && Y(t.then) && Y(t.catch), Ui = Object.prototype.toString, ms = (t) => Ui.call(t), Sl = (t) => ms(t).slice(8, -1), Vi = (t) => ms(t) === "[object Object]", mr = (t) => Be(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, xn = /* @__PURE__ */ dr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), _s = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Cl = /-(\w)/g, Ht = _s(
  (t) => t.replace(Cl, (e, n) => n ? n.toUpperCase() : "")
), Tl = /\B([A-Z])/g, Kt = _s(
  (t) => t.replace(Tl, "-$1").toLowerCase()
), Hi = _s((t) => t.charAt(0).toUpperCase() + t.slice(1)), Os = _s(
  (t) => t ? `on${Hi(t)}` : ""
), Ut = (t, e) => !Object.is(t, e), Gn = (t, ...e) => {
  for (let n = 0; n < t.length; n++)
    t[n](...e);
}, Ks = (t, e, n, s = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, $s = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let Yr;
const ys = () => Yr || (Yr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Se(t) {
  if ($(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const s = t[n], r = Be(s) ? Il(s) : Se(s);
      if (r)
        for (const i in r)
          e[i] = r[i];
    }
    return e;
  } else if (Be(t) || Fe(t))
    return t;
}
const Al = /;(?![^(]*\))/g, El = /:([^]+)/, Rl = /\/\*[^]*?\*\//g;
function Il(t) {
  const e = {};
  return t.replace(Rl, "").split(Al).forEach((n) => {
    if (n) {
      const s = n.split(El);
      s.length > 1 && (e[s[0].trim()] = s[1].trim());
    }
  }), e;
}
function Ie(t) {
  let e = "";
  if (Be(t))
    e = t;
  else if ($(t))
    for (let n = 0; n < t.length; n++) {
      const s = Ie(t[n]);
      s && (e += s + " ");
    }
  else if (Fe(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Ol = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Fl = /* @__PURE__ */ dr(Ol);
function ji(t) {
  return !!t || t === "";
}
const zi = (t) => !!(t && t.__v_isRef === !0), le = (t) => Be(t) ? t : t == null ? "" : $(t) || Fe(t) && (t.toString === Ui || !Y(t.toString)) ? zi(t) ? le(t.value) : JSON.stringify(t, Wi, 2) : String(t), Wi = (t, e) => zi(e) ? Wi(t, e.value) : an(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [s, r], i) => (n[Fs(s, i) + " =>"] = r, n),
    {}
  )
} : Mi(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => Fs(n))
} : Wt(e) ? Fs(e) : Fe(e) && !$(e) && !Vi(e) ? String(e) : e, Fs = (t, e = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Wt(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t
  );
};
/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Xe;
class Pl {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Xe, !e && Xe && (this.index = (Xe.scopes || (Xe.scopes = [])).push(
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
      const n = Xe;
      try {
        return Xe = this, e();
      } finally {
        Xe = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Xe, Xe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Xe = this.prevScope, this.prevScope = void 0);
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
function Ll() {
  return Xe;
}
let Ce;
const Ps = /* @__PURE__ */ new WeakSet();
class Ki {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Xe && Xe.active && Xe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ps.has(this) && (Ps.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Gi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Jr(this), Zi(this);
    const e = Ce, n = ct;
    Ce = this, ct = !0;
    try {
      return this.fn();
    } finally {
      Yi(this), Ce = e, ct = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        br(e);
      this.deps = this.depsTail = void 0, Jr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ps.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Gs(this) && this.run();
  }
  get dirty() {
    return Gs(this);
  }
}
let $i = 0, Sn, Cn;
function Gi(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = Cn, Cn = t;
    return;
  }
  t.next = Sn, Sn = t;
}
function _r() {
  $i++;
}
function yr() {
  if (--$i > 0)
    return;
  if (Cn) {
    let e = Cn;
    for (Cn = void 0; e; ) {
      const n = e.next;
      e.next = void 0, e.flags &= -9, e = n;
    }
  }
  let t;
  for (; Sn; ) {
    let e = Sn;
    for (Sn = void 0; e; ) {
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
function Zi(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function Yi(t) {
  let e, n = t.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), br(s), Bl(s)) : e = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  t.deps = e, t.depsTail = n;
}
function Gs(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (Ji(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function Ji(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === On) || (t.globalVersion = On, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !Gs(t))))
    return;
  t.flags |= 2;
  const e = t.dep, n = Ce, s = ct;
  Ce = t, ct = !0;
  try {
    Zi(t);
    const r = t.fn(t._value);
    (e.version === 0 || Ut(r, t._value)) && (t.flags |= 128, t._value = r, e.version++);
  } catch (r) {
    throw e.version++, r;
  } finally {
    Ce = n, ct = s, Yi(t), t.flags &= -3;
  }
}
function br(t, e = !1) {
  const { dep: n, prevSub: s, nextSub: r } = t;
  if (s && (s.nextSub = r, t.prevSub = void 0), r && (r.prevSub = s, t.nextSub = void 0), n.subs === t && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      br(i, !0);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
function Bl(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let ct = !0;
const Qi = [];
function Pt() {
  Qi.push(ct), ct = !1;
}
function Lt() {
  const t = Qi.pop();
  ct = t === void 0 ? !0 : t;
}
function Jr(t) {
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
let On = 0;
class Nl {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class vr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!Ce || !ct || Ce === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Ce)
      n = this.activeLink = new Nl(Ce, this), Ce.deps ? (n.prevDep = Ce.depsTail, Ce.depsTail.nextDep = n, Ce.depsTail = n) : Ce.deps = Ce.depsTail = n, Xi(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = Ce.depsTail, n.nextDep = void 0, Ce.depsTail.nextDep = n, Ce.depsTail = n, Ce.deps === n && (Ce.deps = s);
    }
    return n;
  }
  trigger(e) {
    this.version++, On++, this.notify(e);
  }
  notify(e) {
    _r();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      yr();
    }
  }
}
function Xi(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let s = e.deps; s; s = s.nextDep)
        Xi(s);
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
  }
}
const Zs = /* @__PURE__ */ new WeakMap(), Qt = Symbol(
  ""
), Ys = Symbol(
  ""
), Fn = Symbol(
  ""
);
function We(t, e, n) {
  if (ct && Ce) {
    let s = Zs.get(t);
    s || Zs.set(t, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new vr()), r.map = s, r.key = n), r.track();
  }
}
function Rt(t, e, n, s, r, i) {
  const o = Zs.get(t);
  if (!o) {
    On++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (_r(), e === "clear")
    o.forEach(l);
  else {
    const a = $(t), u = a && mr(n);
    if (a && n === "length") {
      const c = Number(s);
      o.forEach((p, _) => {
        (_ === "length" || _ === Fn || !Wt(_) && _ >= c) && l(p);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), u && l(o.get(Fn)), e) {
        case "add":
          a ? u && l(o.get("length")) : (l(o.get(Qt)), an(t) && l(o.get(Ys)));
          break;
        case "delete":
          a || (l(o.get(Qt)), an(t) && l(o.get(Ys)));
          break;
        case "set":
          an(t) && l(o.get(Qt));
          break;
      }
  }
  yr();
}
function sn(t) {
  const e = ge(t);
  return e === t ? e : (We(e, "iterate", Fn), ot(t) ? e : e.map(He));
}
function bs(t) {
  return We(t = ge(t), "iterate", Fn), t;
}
const Dl = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ls(this, Symbol.iterator, He);
  },
  concat(...t) {
    return sn(this).concat(
      ...t.map((e) => $(e) ? sn(e) : e)
    );
  },
  entries() {
    return Ls(this, "entries", (t) => (t[1] = He(t[1]), t));
  },
  every(t, e) {
    return At(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return At(this, "filter", t, e, (n) => n.map(He), arguments);
  },
  find(t, e) {
    return At(this, "find", t, e, He, arguments);
  },
  findIndex(t, e) {
    return At(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return At(this, "findLast", t, e, He, arguments);
  },
  findLastIndex(t, e) {
    return At(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return At(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return Bs(this, "includes", t);
  },
  indexOf(...t) {
    return Bs(this, "indexOf", t);
  },
  join(t) {
    return sn(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return Bs(this, "lastIndexOf", t);
  },
  map(t, e) {
    return At(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return mn(this, "pop");
  },
  push(...t) {
    return mn(this, "push", t);
  },
  reduce(t, ...e) {
    return Qr(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return Qr(this, "reduceRight", t, e);
  },
  shift() {
    return mn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return At(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return mn(this, "splice", t);
  },
  toReversed() {
    return sn(this).toReversed();
  },
  toSorted(t) {
    return sn(this).toSorted(t);
  },
  toSpliced(...t) {
    return sn(this).toSpliced(...t);
  },
  unshift(...t) {
    return mn(this, "unshift", t);
  },
  values() {
    return Ls(this, "values", He);
  }
};
function Ls(t, e, n) {
  const s = bs(t), r = s[e]();
  return s !== t && !ot(t) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.value && (i.value = n(i.value)), i;
  }), r;
}
const Ml = Array.prototype;
function At(t, e, n, s, r, i) {
  const o = bs(t), l = o !== t && !ot(t), a = o[e];
  if (a !== Ml[e]) {
    const p = a.apply(t, i);
    return l ? He(p) : p;
  }
  let u = n;
  o !== t && (l ? u = function(p, _) {
    return n.call(this, He(p), _, t);
  } : n.length > 2 && (u = function(p, _) {
    return n.call(this, p, _, t);
  }));
  const c = a.call(o, u, s);
  return l && r ? r(c) : c;
}
function Qr(t, e, n, s) {
  const r = bs(t);
  let i = n;
  return r !== t && (ot(t) ? n.length > 3 && (i = function(o, l, a) {
    return n.call(this, o, l, a, t);
  }) : i = function(o, l, a) {
    return n.call(this, o, He(l), a, t);
  }), r[e](i, ...s);
}
function Bs(t, e, n) {
  const s = ge(t);
  We(s, "iterate", Fn);
  const r = s[e](...n);
  return (r === -1 || r === !1) && Sr(n[0]) ? (n[0] = ge(n[0]), s[e](...n)) : r;
}
function mn(t, e, n = []) {
  Pt(), _r();
  const s = ge(t)[e].apply(t, n);
  return yr(), Lt(), s;
}
const ql = /* @__PURE__ */ dr("__proto__,__v_isRef,__isVue"), eo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Wt)
);
function Ul(t) {
  Wt(t) || (t = String(t));
  const e = ge(this);
  return We(e, "has", t), e.hasOwnProperty(t);
}
class to {
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
      return s === (r ? i ? Yl : io : i ? ro : so).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(s) ? e : void 0;
    const o = $(e);
    if (!r) {
      let a;
      if (o && (a = Dl[n]))
        return a;
      if (n === "hasOwnProperty")
        return Ul;
    }
    const l = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Ke(e) ? e : s
    );
    return (Wt(n) ? eo.has(n) : ql(n)) || (r || We(e, "get", n), i) ? l : Ke(l) ? o && mr(n) ? l : l.value : Fe(l) ? r ? oo(l) : kr(l) : l;
  }
}
class no extends to {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, s, r) {
    let i = e[n];
    if (!this._isShallow) {
      const a = jt(i);
      if (!ot(s) && !jt(s) && (i = ge(i), s = ge(s)), !$(e) && Ke(i) && !Ke(s))
        return a ? !1 : (i.value = s, !0);
    }
    const o = $(e) && mr(n) ? Number(n) < e.length : me(e, n), l = Reflect.set(
      e,
      n,
      s,
      Ke(e) ? e : r
    );
    return e === ge(r) && (o ? Ut(s, i) && Rt(e, "set", n, s) : Rt(e, "add", n, s)), l;
  }
  deleteProperty(e, n) {
    const s = me(e, n);
    e[n];
    const r = Reflect.deleteProperty(e, n);
    return r && s && Rt(e, "delete", n, void 0), r;
  }
  has(e, n) {
    const s = Reflect.has(e, n);
    return (!Wt(n) || !eo.has(n)) && We(e, "has", n), s;
  }
  ownKeys(e) {
    return We(
      e,
      "iterate",
      $(e) ? "length" : Qt
    ), Reflect.ownKeys(e);
  }
}
class Vl extends to {
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
const Hl = /* @__PURE__ */ new no(), jl = /* @__PURE__ */ new Vl(), zl = /* @__PURE__ */ new no(!0);
const Js = (t) => t, Un = (t) => Reflect.getPrototypeOf(t);
function Wl(t, e, n) {
  return function(...s) {
    const r = this.__v_raw, i = ge(r), o = an(i), l = t === "entries" || t === Symbol.iterator && o, a = t === "keys" && o, u = r[t](...s), c = n ? Js : e ? is : He;
    return !e && We(
      i,
      "iterate",
      a ? Ys : Qt
    ), {
      // iterator protocol
      next() {
        const { value: p, done: _ } = u.next();
        return _ ? { value: p, done: _ } : {
          value: l ? [c(p[0]), c(p[1])] : c(p),
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
function Vn(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Kl(t, e) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = ge(i), l = ge(r);
      t || (Ut(r, l) && We(o, "get", r), We(o, "get", l));
      const { has: a } = Un(o), u = e ? Js : t ? is : He;
      if (a.call(o, r))
        return u(i.get(r));
      if (a.call(o, l))
        return u(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !t && We(ge(r), "iterate", Qt), Reflect.get(r, "size", r);
    },
    has(r) {
      const i = this.__v_raw, o = ge(i), l = ge(r);
      return t || (Ut(r, l) && We(o, "has", r), We(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, a = ge(l), u = e ? Js : t ? is : He;
      return !t && We(a, "iterate", Qt), l.forEach((c, p) => r.call(i, u(c), u(p), o));
    }
  };
  return $e(
    n,
    t ? {
      add: Vn("add"),
      set: Vn("set"),
      delete: Vn("delete"),
      clear: Vn("clear")
    } : {
      add(r) {
        !e && !ot(r) && !jt(r) && (r = ge(r));
        const i = ge(this);
        return Un(i).has.call(i, r) || (i.add(r), Rt(i, "add", r, r)), this;
      },
      set(r, i) {
        !e && !ot(i) && !jt(i) && (i = ge(i));
        const o = ge(this), { has: l, get: a } = Un(o);
        let u = l.call(o, r);
        u || (r = ge(r), u = l.call(o, r));
        const c = a.call(o, r);
        return o.set(r, i), u ? Ut(i, c) && Rt(o, "set", r, i) : Rt(o, "add", r, i), this;
      },
      delete(r) {
        const i = ge(this), { has: o, get: l } = Un(i);
        let a = o.call(i, r);
        a || (r = ge(r), a = o.call(i, r)), l && l.call(i, r);
        const u = i.delete(r);
        return a && Rt(i, "delete", r, void 0), u;
      },
      clear() {
        const r = ge(this), i = r.size !== 0, o = r.clear();
        return i && Rt(
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
    n[r] = Wl(r, t, e);
  }), n;
}
function wr(t, e) {
  const n = Kl(t, e);
  return (s, r, i) => r === "__v_isReactive" ? !t : r === "__v_isReadonly" ? t : r === "__v_raw" ? s : Reflect.get(
    me(n, r) && r in s ? n : s,
    r,
    i
  );
}
const $l = {
  get: /* @__PURE__ */ wr(!1, !1)
}, Gl = {
  get: /* @__PURE__ */ wr(!1, !0)
}, Zl = {
  get: /* @__PURE__ */ wr(!0, !1)
};
const so = /* @__PURE__ */ new WeakMap(), ro = /* @__PURE__ */ new WeakMap(), io = /* @__PURE__ */ new WeakMap(), Yl = /* @__PURE__ */ new WeakMap();
function Jl(t) {
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
function Ql(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Jl(Sl(t));
}
function kr(t) {
  return jt(t) ? t : xr(
    t,
    !1,
    Hl,
    $l,
    so
  );
}
function Xl(t) {
  return xr(
    t,
    !1,
    zl,
    Gl,
    ro
  );
}
function oo(t) {
  return xr(
    t,
    !0,
    jl,
    Zl,
    io
  );
}
function xr(t, e, n, s, r) {
  if (!Fe(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const i = Ql(t);
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
function cn(t) {
  return jt(t) ? cn(t.__v_raw) : !!(t && t.__v_isReactive);
}
function jt(t) {
  return !!(t && t.__v_isReadonly);
}
function ot(t) {
  return !!(t && t.__v_isShallow);
}
function Sr(t) {
  return t ? !!t.__v_raw : !1;
}
function ge(t) {
  const e = t && t.__v_raw;
  return e ? ge(e) : t;
}
function ea(t) {
  return !me(t, "__v_skip") && Object.isExtensible(t) && Ks(t, "__v_skip", !0), t;
}
const He = (t) => Fe(t) ? kr(t) : t, is = (t) => Fe(t) ? oo(t) : t;
function Ke(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function ue(t) {
  return ta(t, !1);
}
function ta(t, e) {
  return Ke(t) ? t : new na(t, e);
}
class na {
  constructor(e, n) {
    this.dep = new vr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? e : ge(e), this._value = n ? e : He(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, s = this.__v_isShallow || ot(e) || jt(e);
    e = s ? e : ge(e), Ut(e, n) && (this._rawValue = e, this._value = s ? e : He(e), this.dep.trigger());
  }
}
function sa(t) {
  return Ke(t) ? t.value : t;
}
const ra = {
  get: (t, e, n) => e === "__v_raw" ? t : sa(Reflect.get(t, e, n)),
  set: (t, e, n, s) => {
    const r = t[e];
    return Ke(r) && !Ke(n) ? (r.value = n, !0) : Reflect.set(t, e, n, s);
  }
};
function lo(t) {
  return cn(t) ? t : new Proxy(t, ra);
}
class ia {
  constructor(e, n, s) {
    this.fn = e, this.setter = n, this._value = void 0, this.dep = new vr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = On - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Ce !== this)
      return Gi(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Ji(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
function oa(t, e, n = !1) {
  let s, r;
  return Y(t) ? s = t : (s = t.get, r = t.set), new ia(s, r, n);
}
const Hn = {}, os = /* @__PURE__ */ new WeakMap();
let Jt;
function la(t, e = !1, n = Jt) {
  if (n) {
    let s = os.get(n);
    s || os.set(n, s = []), s.push(t);
  }
}
function aa(t, e, n = ke) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: a } = n, u = (D) => r ? D : ot(D) || r === !1 || r === 0 ? It(D, 1) : It(D);
  let c, p, _, E, B = !1, q = !1;
  if (Ke(t) ? (p = () => t.value, B = ot(t)) : cn(t) ? (p = () => u(t), B = !0) : $(t) ? (q = !0, B = t.some((D) => cn(D) || ot(D)), p = () => t.map((D) => {
    if (Ke(D))
      return D.value;
    if (cn(D))
      return u(D);
    if (Y(D))
      return a ? a(D, 2) : D();
  })) : Y(t) ? e ? p = a ? () => a(t, 2) : t : p = () => {
    if (_) {
      Pt();
      try {
        _();
      } finally {
        Lt();
      }
    }
    const D = Jt;
    Jt = c;
    try {
      return a ? a(t, 3, [E]) : t(E);
    } finally {
      Jt = D;
    }
  } : p = yt, e && r) {
    const D = p, he = r === !0 ? 1 / 0 : r;
    p = () => It(D(), he);
  }
  const oe = Ll(), G = () => {
    c.stop(), oe && oe.active && gr(oe.effects, c);
  };
  if (i && e) {
    const D = e;
    e = (...he) => {
      D(...he), G();
    };
  }
  let te = q ? new Array(t.length).fill(Hn) : Hn;
  const ne = (D) => {
    if (!(!(c.flags & 1) || !c.dirty && !D))
      if (e) {
        const he = c.run();
        if (r || B || (q ? he.some((ye, ee) => Ut(ye, te[ee])) : Ut(he, te))) {
          _ && _();
          const ye = Jt;
          Jt = c;
          try {
            const ee = [
              he,
              // pass undefined as the old value when it's changed for the first time
              te === Hn ? void 0 : q && te[0] === Hn ? [] : te,
              E
            ];
            te = he, a ? a(e, 3, ee) : (
              // @ts-expect-error
              e(...ee)
            );
          } finally {
            Jt = ye;
          }
        }
      } else
        c.run();
  };
  return l && l(ne), c = new Ki(p), c.scheduler = o ? () => o(ne, !1) : ne, E = (D) => la(D, !1, c), _ = c.onStop = () => {
    const D = os.get(c);
    if (D) {
      if (a)
        a(D, 4);
      else
        for (const he of D) he();
      os.delete(c);
    }
  }, e ? s ? ne(!0) : te = c.run() : o ? o(ne.bind(null, !0), !0) : c.run(), G.pause = c.pause.bind(c), G.resume = c.resume.bind(c), G.stop = G, G;
}
function It(t, e = 1 / 0, n) {
  if (e <= 0 || !Fe(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(t)))
    return t;
  if (n.add(t), e--, Ke(t))
    It(t.value, e, n);
  else if ($(t))
    for (let s = 0; s < t.length; s++)
      It(t[s], e, n);
  else if (Mi(t) || an(t))
    t.forEach((s) => {
      It(s, e, n);
    });
  else if (Vi(t)) {
    for (const s in t)
      It(t[s], e, n);
    for (const s of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, s) && It(t[s], e, n);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Nn(t, e, n, s) {
  try {
    return s ? t(...s) : t();
  } catch (r) {
    vs(r, e, n);
  }
}
function wt(t, e, n, s) {
  if (Y(t)) {
    const r = Nn(t, e, n, s);
    return r && qi(r) && r.catch((i) => {
      vs(i, e, n);
    }), r;
  }
  if ($(t)) {
    const r = [];
    for (let i = 0; i < t.length; i++)
      r.push(wt(t[i], e, n, s));
    return r;
  }
}
function vs(t, e, n, s = !0) {
  const r = e ? e.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = e && e.appContext.config || ke;
  if (e) {
    let l = e.parent;
    const a = e.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const c = l.ec;
      if (c) {
        for (let p = 0; p < c.length; p++)
          if (c[p](t, a, u) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      Pt(), Nn(i, null, 10, [
        t,
        a,
        u
      ]), Lt();
      return;
    }
  }
  ca(t, n, r, s, o);
}
function ca(t, e, n, s = !0, r = !1) {
  if (r)
    throw t;
  console.error(t);
}
const Ze = [];
let mt = -1;
const un = [];
let Mt = null, rn = 0;
const ao = /* @__PURE__ */ Promise.resolve();
let ls = null;
function co(t) {
  const e = ls || ao;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function ua(t) {
  let e = mt + 1, n = Ze.length;
  for (; e < n; ) {
    const s = e + n >>> 1, r = Ze[s], i = Pn(r);
    i < t || i === t && r.flags & 2 ? e = s + 1 : n = s;
  }
  return e;
}
function Cr(t) {
  if (!(t.flags & 1)) {
    const e = Pn(t), n = Ze[Ze.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= Pn(n) ? Ze.push(t) : Ze.splice(ua(e), 0, t), t.flags |= 1, uo();
  }
}
function uo() {
  ls || (ls = ao.then(ho));
}
function fa(t) {
  $(t) ? un.push(...t) : Mt && t.id === -1 ? Mt.splice(rn + 1, 0, t) : t.flags & 1 || (un.push(t), t.flags |= 1), uo();
}
function Xr(t, e, n = mt + 1) {
  for (; n < Ze.length; n++) {
    const s = Ze[n];
    if (s && s.flags & 2) {
      if (t && s.id !== t.uid)
        continue;
      Ze.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function fo(t) {
  if (un.length) {
    const e = [...new Set(un)].sort(
      (n, s) => Pn(n) - Pn(s)
    );
    if (un.length = 0, Mt) {
      Mt.push(...e);
      return;
    }
    for (Mt = e, rn = 0; rn < Mt.length; rn++) {
      const n = Mt[rn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Mt = null, rn = 0;
  }
}
const Pn = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function ho(t) {
  try {
    for (mt = 0; mt < Ze.length; mt++) {
      const e = Ze[mt];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Nn(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; mt < Ze.length; mt++) {
      const e = Ze[mt];
      e && (e.flags &= -2);
    }
    mt = -1, Ze.length = 0, fo(), ls = null, (Ze.length || un.length) && ho();
  }
}
let it = null, po = null;
function as(t) {
  const e = it;
  return it = t, po = t && t.type.__scopeId || null, e;
}
function ha(t, e = it, n) {
  if (!e || t._n)
    return t;
  const s = (...r) => {
    s._d && ai(-1);
    const i = as(e);
    let o;
    try {
      o = t(...r);
    } finally {
      as(i), s._d && ai(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function $t(t, e) {
  if (it === null)
    return t;
  const n = Ss(it), s = t.dirs || (t.dirs = []);
  for (let r = 0; r < e.length; r++) {
    let [i, o, l, a = ke] = e[r];
    i && (Y(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && It(o), s.push({
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
function Gt(t, e, n, s) {
  const r = t.dirs, i = e && e.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let a = l.dir[s];
    a && (Pt(), wt(a, n, 8, [
      t.el,
      l,
      t,
      e
    ]), Lt());
  }
}
const da = Symbol("_vte"), pa = (t) => t.__isTeleport;
function Tr(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, Tr(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ga(t, e) {
  return Y(t) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    $e({ name: t.name }, e, { setup: t })
  ) : t;
}
function go(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function Tn(t, e, n, s, r = !1) {
  if ($(t)) {
    t.forEach(
      (B, q) => Tn(
        B,
        e && ($(e) ? e[q] : e),
        n,
        s,
        r
      )
    );
    return;
  }
  if (An(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Tn(t, e, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? Ss(s.component) : s.el, o = r ? null : i, { i: l, r: a } = t, u = e && e.r, c = l.refs === ke ? l.refs = {} : l.refs, p = l.setupState, _ = ge(p), E = p === ke ? () => !1 : (B) => me(_, B);
  if (u != null && u !== a && (Be(u) ? (c[u] = null, E(u) && (p[u] = null)) : Ke(u) && (u.value = null)), Y(a))
    Nn(a, l, 12, [o, c]);
  else {
    const B = Be(a), q = Ke(a);
    if (B || q) {
      const oe = () => {
        if (t.f) {
          const G = B ? E(a) ? p[a] : c[a] : a.value;
          r ? $(G) && gr(G, i) : $(G) ? G.includes(i) || G.push(i) : B ? (c[a] = [i], E(a) && (p[a] = c[a])) : (a.value = [i], t.k && (c[t.k] = a.value));
        } else B ? (c[a] = o, E(a) && (p[a] = o)) : q && (a.value = o, t.k && (c[t.k] = o));
      };
      o ? (oe.id = -1, nt(oe, n)) : oe();
    }
  }
}
ys().requestIdleCallback;
ys().cancelIdleCallback;
const An = (t) => !!t.type.__asyncLoader, mo = (t) => t.type.__isKeepAlive;
function ma(t, e) {
  _o(t, "a", e);
}
function _a(t, e) {
  _o(t, "da", e);
}
function _o(t, e, n = Ye) {
  const s = t.__wdc || (t.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return t();
  });
  if (ws(e, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      mo(r.parent.vnode) && ya(s, e, n, r), r = r.parent;
  }
}
function ya(t, e, n, s) {
  const r = ws(
    e,
    t,
    s,
    !0
    /* prepend */
  );
  Ar(() => {
    gr(s[e], r);
  }, n);
}
function ws(t, e, n = Ye, s = !1) {
  if (n) {
    const r = n[t] || (n[t] = []), i = e.__weh || (e.__weh = (...o) => {
      Pt();
      const l = Dn(n), a = wt(e, n, t, o);
      return l(), Lt(), a;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Bt = (t) => (e, n = Ye) => {
  (!Bn || t === "sp") && ws(t, (...s) => e(...s), n);
}, ba = Bt("bm"), yo = Bt("m"), va = Bt(
  "bu"
), wa = Bt("u"), ka = Bt(
  "bum"
), Ar = Bt("um"), xa = Bt(
  "sp"
), Sa = Bt("rtg"), Ca = Bt("rtc");
function Ta(t, e = Ye) {
  ws("ec", t, e);
}
const Aa = Symbol.for("v-ndc");
function dt(t, e, n, s) {
  let r;
  const i = n, o = $(t);
  if (o || Be(t)) {
    const l = o && cn(t);
    let a = !1, u = !1;
    l && (a = !ot(t), u = jt(t), t = bs(t)), r = new Array(t.length);
    for (let c = 0, p = t.length; c < p; c++)
      r[c] = e(
        a ? u ? is(He(t[c])) : He(t[c]) : t[c],
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
const Qs = (t) => t ? qo(t) ? Ss(t) : Qs(t.parent) : null, En = (
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
    $parent: (t) => Qs(t.parent),
    $root: (t) => Qs(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => vo(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      Cr(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = co.bind(t.proxy)),
    $watch: (t) => Za.bind(t)
  })
), Ns = (t, e) => t !== ke && !t.__isScriptSetup && me(t, e), Ea = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: a } = t;
    let u;
    if (e[0] !== "$") {
      const E = o[e];
      if (E !== void 0)
        switch (E) {
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
        if (Ns(s, e))
          return o[e] = 1, s[e];
        if (r !== ke && me(r, e))
          return o[e] = 2, r[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = t.propsOptions[0]) && me(u, e)
        )
          return o[e] = 3, i[e];
        if (n !== ke && me(n, e))
          return o[e] = 4, n[e];
        Xs && (o[e] = 0);
      }
    }
    const c = En[e];
    let p, _;
    if (c)
      return e === "$attrs" && We(t.attrs, "get", ""), c(t);
    if (
      // css module (injected by vue-loader)
      (p = l.__cssModules) && (p = p[e])
    )
      return p;
    if (n !== ke && me(n, e))
      return o[e] = 4, n[e];
    if (
      // global properties
      _ = a.config.globalProperties, me(_, e)
    )
      return _[e];
  },
  set({ _: t }, e, n) {
    const { data: s, setupState: r, ctx: i } = t;
    return Ns(r, e) ? (r[e] = n, !0) : s !== ke && me(s, e) ? (s[e] = n, !0) : me(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (i[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: s, appContext: r, propsOptions: i }
  }, o) {
    let l;
    return !!n[o] || t !== ke && me(t, o) || Ns(e, o) || (l = i[0]) && me(l, o) || me(s, o) || me(En, o) || me(r.config.globalProperties, o);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : me(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function ei(t) {
  return $(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let Xs = !0;
function Ra(t) {
  const e = vo(t), n = t.proxy, s = t.ctx;
  Xs = !1, e.beforeCreate && ti(e.beforeCreate, t, "bc");
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
    beforeMount: p,
    mounted: _,
    beforeUpdate: E,
    updated: B,
    activated: q,
    deactivated: oe,
    beforeDestroy: G,
    beforeUnmount: te,
    destroyed: ne,
    unmounted: D,
    render: he,
    renderTracked: ye,
    renderTriggered: ee,
    errorCaptured: Ne,
    serverPrefetch: x,
    // public API
    expose: Ae,
    inheritAttrs: Me,
    // assets
    components: re,
    directives: je,
    filters: xt
  } = e;
  if (u && Ia(u, s, null), o)
    for (const Q in o) {
      const J = o[Q];
      Y(J) && (s[Q] = J.bind(n));
    }
  if (r) {
    const Q = r.call(n, n);
    Fe(Q) && (t.data = kr(Q));
  }
  if (Xs = !0, i)
    for (const Q in i) {
      const J = i[Q], M = Y(J) ? J.bind(n, n) : Y(J.get) ? J.get.bind(n, n) : yt, xe = !Y(J) && Y(J.set) ? J.set.bind(n) : yt, j = De({
        get: M,
        set: xe
      });
      Object.defineProperty(s, Q, {
        enumerable: !0,
        configurable: !0,
        get: () => j.value,
        set: (ve) => j.value = ve
      });
    }
  if (l)
    for (const Q in l)
      bo(l[Q], s, n, Q);
  if (a) {
    const Q = Y(a) ? a.call(n) : a;
    Reflect.ownKeys(Q).forEach((J) => {
      Na(J, Q[J]);
    });
  }
  c && ti(c, t, "c");
  function Oe(Q, J) {
    $(J) ? J.forEach((M) => Q(M.bind(n))) : J && Q(J.bind(n));
  }
  if (Oe(ba, p), Oe(yo, _), Oe(va, E), Oe(wa, B), Oe(ma, q), Oe(_a, oe), Oe(Ta, Ne), Oe(Ca, ye), Oe(Sa, ee), Oe(ka, te), Oe(Ar, D), Oe(xa, x), $(Ae))
    if (Ae.length) {
      const Q = t.exposed || (t.exposed = {});
      Ae.forEach((J) => {
        Object.defineProperty(Q, J, {
          get: () => n[J],
          set: (M) => n[J] = M,
          enumerable: !0
        });
      });
    } else t.exposed || (t.exposed = {});
  he && t.render === yt && (t.render = he), Me != null && (t.inheritAttrs = Me), re && (t.components = re), je && (t.directives = je), x && go(t);
}
function Ia(t, e, n = yt) {
  $(t) && (t = er(t));
  for (const s in t) {
    const r = t[s];
    let i;
    Fe(r) ? "default" in r ? i = Zn(
      r.from || s,
      r.default,
      !0
    ) : i = Zn(r.from || s) : i = Zn(r), Ke(i) ? Object.defineProperty(e, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : e[s] = i;
  }
}
function ti(t, e, n) {
  wt(
    $(t) ? t.map((s) => s.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function bo(t, e, n, s) {
  let r = s.includes(".") ? Po(n, s) : () => n[s];
  if (Be(t)) {
    const i = e[t];
    Y(i) && Yn(r, i);
  } else if (Y(t))
    Yn(r, t.bind(n));
  else if (Fe(t))
    if ($(t))
      t.forEach((i) => bo(i, e, n, s));
    else {
      const i = Y(t.handler) ? t.handler.bind(n) : e[t.handler];
      Y(i) && Yn(r, i, t);
    }
}
function vo(t) {
  const e = t.type, { mixins: n, extends: s } = e, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = t.appContext, l = i.get(e);
  let a;
  return l ? a = l : !r.length && !n && !s ? a = e : (a = {}, r.length && r.forEach(
    (u) => cs(a, u, o, !0)
  ), cs(a, e, o)), Fe(e) && i.set(e, a), a;
}
function cs(t, e, n, s = !1) {
  const { mixins: r, extends: i } = e;
  i && cs(t, i, n, !0), r && r.forEach(
    (o) => cs(t, o, n, !0)
  );
  for (const o in e)
    if (!(s && o === "expose")) {
      const l = Oa[o] || n && n[o];
      t[o] = l ? l(t[o], e[o]) : e[o];
    }
  return t;
}
const Oa = {
  data: ni,
  props: si,
  emits: si,
  // objects
  methods: wn,
  computed: wn,
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
  components: wn,
  directives: wn,
  // watch
  watch: Pa,
  // provide / inject
  provide: ni,
  inject: Fa
};
function ni(t, e) {
  return e ? t ? function() {
    return $e(
      Y(t) ? t.call(this, this) : t,
      Y(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function Fa(t, e) {
  return wn(er(t), er(e));
}
function er(t) {
  if ($(t)) {
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
function wn(t, e) {
  return t ? $e(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function si(t, e) {
  return t ? $(t) && $(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : $e(
    /* @__PURE__ */ Object.create(null),
    ei(t),
    ei(e ?? {})
  ) : e;
}
function Pa(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = $e(/* @__PURE__ */ Object.create(null), t);
  for (const s in e)
    n[s] = Ge(t[s], e[s]);
  return n;
}
function wo() {
  return {
    app: null,
    config: {
      isNativeTag: kl,
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
let La = 0;
function Ba(t, e) {
  return function(s, r = null) {
    Y(s) || (s = $e({}, s)), r != null && !Fe(r) && (r = null);
    const i = wo(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const u = i.app = {
      _uid: La++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: yc,
      get config() {
        return i.config;
      },
      set config(c) {
      },
      use(c, ...p) {
        return o.has(c) || (c && Y(c.install) ? (o.add(c), c.install(u, ...p)) : Y(c) && (o.add(c), c(u, ...p))), u;
      },
      mixin(c) {
        return i.mixins.includes(c) || i.mixins.push(c), u;
      },
      component(c, p) {
        return p ? (i.components[c] = p, u) : i.components[c];
      },
      directive(c, p) {
        return p ? (i.directives[c] = p, u) : i.directives[c];
      },
      mount(c, p, _) {
        if (!a) {
          const E = u._ceVNode || bt(s, r);
          return E.appContext = i, _ === !0 ? _ = "svg" : _ === !1 && (_ = void 0), t(E, c, _), a = !0, u._container = c, c.__vue_app__ = u, Ss(E.component);
        }
      },
      onUnmount(c) {
        l.push(c);
      },
      unmount() {
        a && (wt(
          l,
          u._instance,
          16
        ), t(null, u._container), delete u._container.__vue_app__);
      },
      provide(c, p) {
        return i.provides[c] = p, u;
      },
      runWithContext(c) {
        const p = fn;
        fn = u;
        try {
          return c();
        } finally {
          fn = p;
        }
      }
    };
    return u;
  };
}
let fn = null;
function Na(t, e) {
  if (Ye) {
    let n = Ye.provides;
    const s = Ye.parent && Ye.parent.provides;
    s === n && (n = Ye.provides = Object.create(s)), n[t] = e;
  }
}
function Zn(t, e, n = !1) {
  const s = hc();
  if (s || fn) {
    let r = fn ? fn._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && t in r)
      return r[t];
    if (arguments.length > 1)
      return n && Y(e) ? e.call(s && s.proxy) : e;
  }
}
const ko = {}, xo = () => Object.create(ko), So = (t) => Object.getPrototypeOf(t) === ko;
function Da(t, e, n, s = !1) {
  const r = {}, i = xo();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), Co(t, e, r, i);
  for (const o in t.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? t.props = s ? r : Xl(r) : t.type.props ? t.props = r : t.props = i, t.attrs = i;
}
function Ma(t, e, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = t, l = ge(r), [a] = t.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const c = t.vnode.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        let _ = c[p];
        if (ks(t.emitsOptions, _))
          continue;
        const E = e[_];
        if (a)
          if (me(i, _))
            E !== i[_] && (i[_] = E, u = !0);
          else {
            const B = Ht(_);
            r[B] = tr(
              a,
              l,
              B,
              E,
              t,
              !1
            );
          }
        else
          E !== i[_] && (i[_] = E, u = !0);
      }
    }
  } else {
    Co(t, e, r, i) && (u = !0);
    let c;
    for (const p in l)
      (!e || // for camelCase
      !me(e, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((c = Kt(p)) === p || !me(e, c))) && (a ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[c] !== void 0) && (r[p] = tr(
        a,
        l,
        p,
        void 0,
        t,
        !0
      )) : delete r[p]);
    if (i !== l)
      for (const p in i)
        (!e || !me(e, p)) && (delete i[p], u = !0);
  }
  u && Rt(t.attrs, "set", "");
}
function Co(t, e, n, s) {
  const [r, i] = t.propsOptions;
  let o = !1, l;
  if (e)
    for (let a in e) {
      if (xn(a))
        continue;
      const u = e[a];
      let c;
      r && me(r, c = Ht(a)) ? !i || !i.includes(c) ? n[c] = u : (l || (l = {}))[c] = u : ks(t.emitsOptions, a) || (!(a in s) || u !== s[a]) && (s[a] = u, o = !0);
    }
  if (i) {
    const a = ge(n), u = l || ke;
    for (let c = 0; c < i.length; c++) {
      const p = i[c];
      n[p] = tr(
        r,
        a,
        p,
        u[p],
        t,
        !me(u, p)
      );
    }
  }
  return o;
}
function tr(t, e, n, s, r, i) {
  const o = t[n];
  if (o != null) {
    const l = me(o, "default");
    if (l && s === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && Y(a)) {
        const { propsDefaults: u } = r;
        if (n in u)
          s = u[n];
        else {
          const c = Dn(r);
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
    ] && (s === "" || s === Kt(n)) && (s = !0));
  }
  return s;
}
const qa = /* @__PURE__ */ new WeakMap();
function To(t, e, n = !1) {
  const s = n ? qa : e.propsCache, r = s.get(t);
  if (r)
    return r;
  const i = t.props, o = {}, l = [];
  let a = !1;
  if (!Y(t)) {
    const c = (p) => {
      a = !0;
      const [_, E] = To(p, e, !0);
      $e(o, _), E && l.push(...E);
    };
    !n && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  if (!i && !a)
    return Fe(t) && s.set(t, ln), ln;
  if ($(i))
    for (let c = 0; c < i.length; c++) {
      const p = Ht(i[c]);
      ri(p) && (o[p] = ke);
    }
  else if (i)
    for (const c in i) {
      const p = Ht(c);
      if (ri(p)) {
        const _ = i[c], E = o[p] = $(_) || Y(_) ? { type: _ } : $e({}, _), B = E.type;
        let q = !1, oe = !0;
        if ($(B))
          for (let G = 0; G < B.length; ++G) {
            const te = B[G], ne = Y(te) && te.name;
            if (ne === "Boolean") {
              q = !0;
              break;
            } else ne === "String" && (oe = !1);
          }
        else
          q = Y(B) && B.name === "Boolean";
        E[
          0
          /* shouldCast */
        ] = q, E[
          1
          /* shouldCastTrue */
        ] = oe, (q || me(E, "default")) && l.push(p);
      }
    }
  const u = [o, l];
  return Fe(t) && s.set(t, u), u;
}
function ri(t) {
  return t[0] !== "$" && !xn(t);
}
const Er = (t) => t === "_" || t === "__" || t === "_ctx" || t === "$stable", Rr = (t) => $(t) ? t.map(_t) : [_t(t)], Ua = (t, e, n) => {
  if (e._n)
    return e;
  const s = ha((...r) => Rr(e(...r)), n);
  return s._c = !1, s;
}, Ao = (t, e, n) => {
  const s = t._ctx;
  for (const r in t) {
    if (Er(r)) continue;
    const i = t[r];
    if (Y(i))
      e[r] = Ua(r, i, s);
    else if (i != null) {
      const o = Rr(i);
      e[r] = () => o;
    }
  }
}, Eo = (t, e) => {
  const n = Rr(e);
  t.slots.default = () => n;
}, Ro = (t, e, n) => {
  for (const s in e)
    (n || !Er(s)) && (t[s] = e[s]);
}, Va = (t, e, n) => {
  const s = t.slots = xo();
  if (t.vnode.shapeFlag & 32) {
    const r = e.__;
    r && Ks(s, "__", r, !0);
    const i = e._;
    i ? (Ro(s, e, n), n && Ks(s, "_", i, !0)) : Ao(e, s);
  } else e && Eo(t, e);
}, Ha = (t, e, n) => {
  const { vnode: s, slots: r } = t;
  let i = !0, o = ke;
  if (s.shapeFlag & 32) {
    const l = e._;
    l ? n && l === 1 ? i = !1 : Ro(r, e, n) : (i = !e.$stable, Ao(e, r)), o = e;
  } else e && (Eo(t, e), o = { default: 1 });
  if (i)
    for (const l in r)
      !Er(l) && o[l] == null && delete r[l];
}, nt = nc;
function ja(t) {
  return za(t);
}
function za(t, e) {
  const n = ys();
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
    parentNode: p,
    nextSibling: _,
    setScopeId: E = yt,
    insertStaticContent: B
  } = t, q = (h, g, b, C = null, k = null, S = null, P = void 0, O = null, R = !!g.dynamicChildren) => {
    if (h === g)
      return;
    h && !_n(h, g) && (C = ft(h), ve(h, k, S, !0), h = null), g.patchFlag === -2 && (R = !1, g.dynamicChildren = null);
    const { type: T, ref: H, shapeFlag: L } = g;
    switch (T) {
      case xs:
        oe(h, g, b, C);
        break;
      case zt:
        G(h, g, b, C);
        break;
      case Jn:
        h == null && te(g, b, C, P);
        break;
      case Pe:
        re(
          h,
          g,
          b,
          C,
          k,
          S,
          P,
          O,
          R
        );
        break;
      default:
        L & 1 ? he(
          h,
          g,
          b,
          C,
          k,
          S,
          P,
          O,
          R
        ) : L & 6 ? je(
          h,
          g,
          b,
          C,
          k,
          S,
          P,
          O,
          R
        ) : (L & 64 || L & 128) && T.process(
          h,
          g,
          b,
          C,
          k,
          S,
          P,
          O,
          R,
          ht
        );
    }
    H != null && k ? Tn(H, h && h.ref, S, g || h, !g) : H == null && h && h.ref != null && Tn(h.ref, null, S, h, !0);
  }, oe = (h, g, b, C) => {
    if (h == null)
      s(
        g.el = l(g.children),
        b,
        C
      );
    else {
      const k = g.el = h.el;
      g.children !== h.children && u(k, g.children);
    }
  }, G = (h, g, b, C) => {
    h == null ? s(
      g.el = a(g.children || ""),
      b,
      C
    ) : g.el = h.el;
  }, te = (h, g, b, C) => {
    [h.el, h.anchor] = B(
      h.children,
      g,
      b,
      C,
      h.el,
      h.anchor
    );
  }, ne = ({ el: h, anchor: g }, b, C) => {
    let k;
    for (; h && h !== g; )
      k = _(h), s(h, b, C), h = k;
    s(g, b, C);
  }, D = ({ el: h, anchor: g }) => {
    let b;
    for (; h && h !== g; )
      b = _(h), r(h), h = b;
    r(g);
  }, he = (h, g, b, C, k, S, P, O, R) => {
    g.type === "svg" ? P = "svg" : g.type === "math" && (P = "mathml"), h == null ? ye(
      g,
      b,
      C,
      k,
      S,
      P,
      O,
      R
    ) : x(
      h,
      g,
      k,
      S,
      P,
      O,
      R
    );
  }, ye = (h, g, b, C, k, S, P, O) => {
    let R, T;
    const { props: H, shapeFlag: L, transition: V, dirs: W } = h;
    if (R = h.el = o(
      h.type,
      S,
      H && H.is,
      H
    ), L & 8 ? c(R, h.children) : L & 16 && Ne(
      h.children,
      R,
      null,
      C,
      k,
      Ds(h, S),
      P,
      O
    ), W && Gt(h, null, C, "created"), ee(R, h, h.scopeId, P, C), H) {
      for (const X in H)
        X !== "value" && !xn(X) && i(R, X, null, H[X], S, C);
      "value" in H && i(R, "value", null, H.value, S), (T = H.onVnodeBeforeMount) && pt(T, C, h);
    }
    W && Gt(h, null, C, "beforeMount");
    const K = Wa(k, V);
    K && V.beforeEnter(R), s(R, g, b), ((T = H && H.onVnodeMounted) || K || W) && nt(() => {
      T && pt(T, C, h), K && V.enter(R), W && Gt(h, null, C, "mounted");
    }, k);
  }, ee = (h, g, b, C, k) => {
    if (b && E(h, b), C)
      for (let S = 0; S < C.length; S++)
        E(h, C[S]);
    if (k) {
      let S = k.subTree;
      if (g === S || Bo(S.type) && (S.ssContent === g || S.ssFallback === g)) {
        const P = k.vnode;
        ee(
          h,
          P,
          P.scopeId,
          P.slotScopeIds,
          k.parent
        );
      }
    }
  }, Ne = (h, g, b, C, k, S, P, O, R = 0) => {
    for (let T = R; T < h.length; T++) {
      const H = h[T] = O ? qt(h[T]) : _t(h[T]);
      q(
        null,
        H,
        g,
        b,
        C,
        k,
        S,
        P,
        O
      );
    }
  }, x = (h, g, b, C, k, S, P) => {
    const O = g.el = h.el;
    let { patchFlag: R, dynamicChildren: T, dirs: H } = g;
    R |= h.patchFlag & 16;
    const L = h.props || ke, V = g.props || ke;
    let W;
    if (b && Zt(b, !1), (W = V.onVnodeBeforeUpdate) && pt(W, b, g, h), H && Gt(g, h, b, "beforeUpdate"), b && Zt(b, !0), (L.innerHTML && V.innerHTML == null || L.textContent && V.textContent == null) && c(O, ""), T ? Ae(
      h.dynamicChildren,
      T,
      O,
      b,
      C,
      Ds(g, k),
      S
    ) : P || J(
      h,
      g,
      O,
      null,
      b,
      C,
      Ds(g, k),
      S,
      !1
    ), R > 0) {
      if (R & 16)
        Me(O, L, V, b, k);
      else if (R & 2 && L.class !== V.class && i(O, "class", null, V.class, k), R & 4 && i(O, "style", L.style, V.style, k), R & 8) {
        const K = g.dynamicProps;
        for (let X = 0; X < K.length; X++) {
          const Z = K[X], Te = L[Z], be = V[Z];
          (be !== Te || Z === "value") && i(O, Z, Te, be, k, b);
        }
      }
      R & 1 && h.children !== g.children && c(O, g.children);
    } else !P && T == null && Me(O, L, V, b, k);
    ((W = V.onVnodeUpdated) || H) && nt(() => {
      W && pt(W, b, g, h), H && Gt(g, h, b, "updated");
    }, C);
  }, Ae = (h, g, b, C, k, S, P) => {
    for (let O = 0; O < g.length; O++) {
      const R = h[O], T = g[O], H = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        R.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (R.type === Pe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !_n(R, T) || // - In the case of a component, it could contain anything.
        R.shapeFlag & 198) ? p(R.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      q(
        R,
        T,
        H,
        null,
        C,
        k,
        S,
        P,
        !0
      );
    }
  }, Me = (h, g, b, C, k) => {
    if (g !== b) {
      if (g !== ke)
        for (const S in g)
          !xn(S) && !(S in b) && i(
            h,
            S,
            g[S],
            null,
            k,
            C
          );
      for (const S in b) {
        if (xn(S)) continue;
        const P = b[S], O = g[S];
        P !== O && S !== "value" && i(h, S, O, P, k, C);
      }
      "value" in b && i(h, "value", g.value, b.value, k);
    }
  }, re = (h, g, b, C, k, S, P, O, R) => {
    const T = g.el = h ? h.el : l(""), H = g.anchor = h ? h.anchor : l("");
    let { patchFlag: L, dynamicChildren: V, slotScopeIds: W } = g;
    W && (O = O ? O.concat(W) : W), h == null ? (s(T, b, C), s(H, b, C), Ne(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      b,
      H,
      k,
      S,
      P,
      O,
      R
    )) : L > 0 && L & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    h.dynamicChildren ? (Ae(
      h.dynamicChildren,
      V,
      b,
      k,
      S,
      P,
      O
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || k && g === k.subTree) && Io(
      h,
      g,
      !0
      /* shallow */
    )) : J(
      h,
      g,
      b,
      H,
      k,
      S,
      P,
      O,
      R
    );
  }, je = (h, g, b, C, k, S, P, O, R) => {
    g.slotScopeIds = O, h == null ? g.shapeFlag & 512 ? k.ctx.activate(
      g,
      b,
      C,
      P,
      R
    ) : xt(
      g,
      b,
      C,
      k,
      S,
      P,
      R
    ) : ut(h, g, R);
  }, xt = (h, g, b, C, k, S, P) => {
    const O = h.component = fc(
      h,
      C,
      k
    );
    if (mo(h) && (O.ctx.renderer = ht), dc(O, !1, P), O.asyncDep) {
      if (k && k.registerDep(O, Oe, P), !h.el) {
        const R = O.subTree = bt(zt);
        G(null, R, g, b), h.placeholder = R.el;
      }
    } else
      Oe(
        O,
        h,
        g,
        b,
        k,
        S,
        P
      );
  }, ut = (h, g, b) => {
    const C = g.component = h.component;
    if (ec(h, g, b))
      if (C.asyncDep && !C.asyncResolved) {
        Q(C, g, b);
        return;
      } else
        C.next = g, C.update();
    else
      g.el = h.el, C.vnode = g;
  }, Oe = (h, g, b, C, k, S, P) => {
    const O = () => {
      if (h.isMounted) {
        let { next: L, bu: V, u: W, parent: K, vnode: X } = h;
        {
          const f = Oo(h);
          if (f) {
            L && (L.el = X.el, Q(h, L, P)), f.asyncDep.then(() => {
              h.isUnmounted || O();
            });
            return;
          }
        }
        let Z = L, Te;
        Zt(h, !1), L ? (L.el = X.el, Q(h, L, P)) : L = X, V && Gn(V), (Te = L.props && L.props.onVnodeBeforeUpdate) && pt(Te, K, L, X), Zt(h, !0);
        const be = oi(h), ze = h.subTree;
        h.subTree = be, q(
          ze,
          be,
          // parent may have changed if it's in a teleport
          p(ze.el),
          // anchor may have changed if it's in a fragment
          ft(ze),
          h,
          k,
          S
        ), L.el = be.el, Z === null && tc(h, be.el), W && nt(W, k), (Te = L.props && L.props.onVnodeUpdated) && nt(
          () => pt(Te, K, L, X),
          k
        );
      } else {
        let L;
        const { el: V, props: W } = g, { bm: K, m: X, parent: Z, root: Te, type: be } = h, ze = An(g);
        Zt(h, !1), K && Gn(K), !ze && (L = W && W.onVnodeBeforeMount) && pt(L, Z, g), Zt(h, !0);
        {
          Te.ce && // @ts-expect-error _def is private
          Te.ce._def.shadowRoot !== !1 && Te.ce._injectChildStyle(be);
          const f = h.subTree = oi(h);
          q(
            null,
            f,
            b,
            C,
            h,
            k,
            S
          ), g.el = f.el;
        }
        if (X && nt(X, k), !ze && (L = W && W.onVnodeMounted)) {
          const f = g;
          nt(
            () => pt(L, Z, f),
            k
          );
        }
        (g.shapeFlag & 256 || Z && An(Z.vnode) && Z.vnode.shapeFlag & 256) && h.a && nt(h.a, k), h.isMounted = !0, g = b = C = null;
      }
    };
    h.scope.on();
    const R = h.effect = new Ki(O);
    h.scope.off();
    const T = h.update = R.run.bind(R), H = h.job = R.runIfDirty.bind(R);
    H.i = h, H.id = h.uid, R.scheduler = () => Cr(H), Zt(h, !0), T();
  }, Q = (h, g, b) => {
    g.component = h;
    const C = h.vnode.props;
    h.vnode = g, h.next = null, Ma(h, g.props, C, b), Ha(h, g.children, b), Pt(), Xr(h), Lt();
  }, J = (h, g, b, C, k, S, P, O, R = !1) => {
    const T = h && h.children, H = h ? h.shapeFlag : 0, L = g.children, { patchFlag: V, shapeFlag: W } = g;
    if (V > 0) {
      if (V & 128) {
        xe(
          T,
          L,
          b,
          C,
          k,
          S,
          P,
          O,
          R
        );
        return;
      } else if (V & 256) {
        M(
          T,
          L,
          b,
          C,
          k,
          S,
          P,
          O,
          R
        );
        return;
      }
    }
    W & 8 ? (H & 16 && St(T, k, S), L !== T && c(b, L)) : H & 16 ? W & 16 ? xe(
      T,
      L,
      b,
      C,
      k,
      S,
      P,
      O,
      R
    ) : St(T, k, S, !0) : (H & 8 && c(b, ""), W & 16 && Ne(
      L,
      b,
      C,
      k,
      S,
      P,
      O,
      R
    ));
  }, M = (h, g, b, C, k, S, P, O, R) => {
    h = h || ln, g = g || ln;
    const T = h.length, H = g.length, L = Math.min(T, H);
    let V;
    for (V = 0; V < L; V++) {
      const W = g[V] = R ? qt(g[V]) : _t(g[V]);
      q(
        h[V],
        W,
        b,
        null,
        k,
        S,
        P,
        O,
        R
      );
    }
    T > H ? St(
      h,
      k,
      S,
      !0,
      !1,
      L
    ) : Ne(
      g,
      b,
      C,
      k,
      S,
      P,
      O,
      R,
      L
    );
  }, xe = (h, g, b, C, k, S, P, O, R) => {
    let T = 0;
    const H = g.length;
    let L = h.length - 1, V = H - 1;
    for (; T <= L && T <= V; ) {
      const W = h[T], K = g[T] = R ? qt(g[T]) : _t(g[T]);
      if (_n(W, K))
        q(
          W,
          K,
          b,
          null,
          k,
          S,
          P,
          O,
          R
        );
      else
        break;
      T++;
    }
    for (; T <= L && T <= V; ) {
      const W = h[L], K = g[V] = R ? qt(g[V]) : _t(g[V]);
      if (_n(W, K))
        q(
          W,
          K,
          b,
          null,
          k,
          S,
          P,
          O,
          R
        );
      else
        break;
      L--, V--;
    }
    if (T > L) {
      if (T <= V) {
        const W = V + 1, K = W < H ? g[W].el : C;
        for (; T <= V; )
          q(
            null,
            g[T] = R ? qt(g[T]) : _t(g[T]),
            b,
            K,
            k,
            S,
            P,
            O,
            R
          ), T++;
      }
    } else if (T > V)
      for (; T <= L; )
        ve(h[T], k, S, !0), T++;
    else {
      const W = T, K = T, X = /* @__PURE__ */ new Map();
      for (T = K; T <= V; T++) {
        const y = g[T] = R ? qt(g[T]) : _t(g[T]);
        y.key != null && X.set(y.key, T);
      }
      let Z, Te = 0;
      const be = V - K + 1;
      let ze = !1, f = 0;
      const d = new Array(be);
      for (T = 0; T < be; T++) d[T] = 0;
      for (T = W; T <= L; T++) {
        const y = h[T];
        if (Te >= be) {
          ve(y, k, S, !0);
          continue;
        }
        let A;
        if (y.key != null)
          A = X.get(y.key);
        else
          for (Z = K; Z <= V; Z++)
            if (d[Z - K] === 0 && _n(y, g[Z])) {
              A = Z;
              break;
            }
        A === void 0 ? ve(y, k, S, !0) : (d[A - K] = T + 1, A >= f ? f = A : ze = !0, q(
          y,
          g[A],
          b,
          null,
          k,
          S,
          P,
          O,
          R
        ), Te++);
      }
      const w = ze ? Ka(d) : ln;
      for (Z = w.length - 1, T = be - 1; T >= 0; T--) {
        const y = K + T, A = g[y], U = g[y + 1], z = y + 1 < H ? (
          // #13559, fallback to el placeholder for unresolved async component
          U.el || U.placeholder
        ) : C;
        d[T] === 0 ? q(
          null,
          A,
          b,
          z,
          k,
          S,
          P,
          O,
          R
        ) : ze && (Z < 0 || T !== w[Z] ? j(A, b, z, 2) : Z--);
      }
    }
  }, j = (h, g, b, C, k = null) => {
    const { el: S, type: P, transition: O, children: R, shapeFlag: T } = h;
    if (T & 6) {
      j(h.component.subTree, g, b, C);
      return;
    }
    if (T & 128) {
      h.suspense.move(g, b, C);
      return;
    }
    if (T & 64) {
      P.move(h, g, b, ht);
      return;
    }
    if (P === Pe) {
      s(S, g, b);
      for (let L = 0; L < R.length; L++)
        j(R[L], g, b, C);
      s(h.anchor, g, b);
      return;
    }
    if (P === Jn) {
      ne(h, g, b);
      return;
    }
    if (C !== 2 && T & 1 && O)
      if (C === 0)
        O.beforeEnter(S), s(S, g, b), nt(() => O.enter(S), k);
      else {
        const { leave: L, delayLeave: V, afterLeave: W } = O, K = () => {
          h.ctx.isUnmounted ? r(S) : s(S, g, b);
        }, X = () => {
          L(S, () => {
            K(), W && W();
          });
        };
        V ? V(S, K, X) : X();
      }
    else
      s(S, g, b);
  }, ve = (h, g, b, C = !1, k = !1) => {
    const {
      type: S,
      props: P,
      ref: O,
      children: R,
      dynamicChildren: T,
      shapeFlag: H,
      patchFlag: L,
      dirs: V,
      cacheIndex: W
    } = h;
    if (L === -2 && (k = !1), O != null && (Pt(), Tn(O, null, b, h, !0), Lt()), W != null && (g.renderCache[W] = void 0), H & 256) {
      g.ctx.deactivate(h);
      return;
    }
    const K = H & 1 && V, X = !An(h);
    let Z;
    if (X && (Z = P && P.onVnodeBeforeUnmount) && pt(Z, g, h), H & 6)
      nn(h.component, b, C);
    else {
      if (H & 128) {
        h.suspense.unmount(b, C);
        return;
      }
      K && Gt(h, null, g, "beforeUnmount"), H & 64 ? h.type.remove(
        h,
        g,
        b,
        ht,
        C
      ) : T && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !T.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (S !== Pe || L > 0 && L & 64) ? St(
        T,
        g,
        b,
        !1,
        !0
      ) : (S === Pe && L & 384 || !k && H & 16) && St(R, g, b), C && et(h);
    }
    (X && (Z = P && P.onVnodeUnmounted) || K) && nt(() => {
      Z && pt(Z, g, h), K && Gt(h, null, g, "unmounted");
    }, b);
  }, et = (h) => {
    const { type: g, el: b, anchor: C, transition: k } = h;
    if (g === Pe) {
      tn(b, C);
      return;
    }
    if (g === Jn) {
      D(h);
      return;
    }
    const S = () => {
      r(b), k && !k.persisted && k.afterLeave && k.afterLeave();
    };
    if (h.shapeFlag & 1 && k && !k.persisted) {
      const { leave: P, delayLeave: O } = k, R = () => P(b, S);
      O ? O(h.el, S, R) : R();
    } else
      S();
  }, tn = (h, g) => {
    let b;
    for (; h !== g; )
      b = _(h), r(h), h = b;
    r(g);
  }, nn = (h, g, b) => {
    const {
      bum: C,
      scope: k,
      job: S,
      subTree: P,
      um: O,
      m: R,
      a: T,
      parent: H,
      slots: { __: L }
    } = h;
    ii(R), ii(T), C && Gn(C), H && $(L) && L.forEach((V) => {
      H.renderCache[V] = void 0;
    }), k.stop(), S && (S.flags |= 8, ve(P, h, g, b)), O && nt(O, g), nt(() => {
      h.isUnmounted = !0;
    }, g), g && g.pendingBranch && !g.isUnmounted && h.asyncDep && !h.asyncResolved && h.suspenseId === g.pendingId && (g.deps--, g.deps === 0 && g.resolve());
  }, St = (h, g, b, C = !1, k = !1, S = 0) => {
    for (let P = S; P < h.length; P++)
      ve(h[P], g, b, C, k);
  }, ft = (h) => {
    if (h.shapeFlag & 6)
      return ft(h.component.subTree);
    if (h.shapeFlag & 128)
      return h.suspense.next();
    const g = _(h.anchor || h.el), b = g && g[da];
    return b ? _(b) : g;
  };
  let Ct = !1;
  const Tt = (h, g, b) => {
    h == null ? g._vnode && ve(g._vnode, null, null, !0) : q(
      g._vnode || null,
      h,
      g,
      null,
      null,
      null,
      b
    ), g._vnode = h, Ct || (Ct = !0, Xr(), fo(), Ct = !1);
  }, ht = {
    p: q,
    um: ve,
    m: j,
    r: et,
    mt: xt,
    mc: Ne,
    pc: J,
    pbc: Ae,
    n: ft,
    o: t
  };
  return {
    render: Tt,
    hydrate: void 0,
    createApp: Ba(Tt)
  };
}
function Ds({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function Zt({ effect: t, job: e }, n) {
  n ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function Wa(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Io(t, e, n = !1) {
  const s = t.children, r = e.children;
  if ($(s) && $(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = qt(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && Io(o, l)), l.type === xs && (l.el = o.el), l.type === zt && !l.el && (l.el = o.el);
    }
}
function Ka(t) {
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
function Oo(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : Oo(e);
}
function ii(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
const $a = Symbol.for("v-scx"), Ga = () => Zn($a);
function Yn(t, e, n) {
  return Fo(t, e, n);
}
function Fo(t, e, n = ke) {
  const { immediate: s, deep: r, flush: i, once: o } = n, l = $e({}, n), a = e && s || !e && i !== "post";
  let u;
  if (Bn) {
    if (i === "sync") {
      const E = Ga();
      u = E.__watcherHandles || (E.__watcherHandles = []);
    } else if (!a) {
      const E = () => {
      };
      return E.stop = yt, E.resume = yt, E.pause = yt, E;
    }
  }
  const c = Ye;
  l.call = (E, B, q) => wt(E, c, B, q);
  let p = !1;
  i === "post" ? l.scheduler = (E) => {
    nt(E, c && c.suspense);
  } : i !== "sync" && (p = !0, l.scheduler = (E, B) => {
    B ? E() : Cr(E);
  }), l.augmentJob = (E) => {
    e && (E.flags |= 4), p && (E.flags |= 2, c && (E.id = c.uid, E.i = c));
  };
  const _ = aa(t, e, l);
  return Bn && (u ? u.push(_) : a && _()), _;
}
function Za(t, e, n) {
  const s = this.proxy, r = Be(t) ? t.includes(".") ? Po(s, t) : () => s[t] : t.bind(s, s);
  let i;
  Y(e) ? i = e : (i = e.handler, n = e);
  const o = Dn(this), l = Fo(r, i.bind(s), n);
  return o(), l;
}
function Po(t, e) {
  const n = e.split(".");
  return () => {
    let s = t;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const Ya = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${Ht(e)}Modifiers`] || t[`${Kt(e)}Modifiers`];
function Ja(t, e, ...n) {
  if (t.isUnmounted) return;
  const s = t.vnode.props || ke;
  let r = n;
  const i = e.startsWith("update:"), o = i && Ya(s, e.slice(7));
  o && (o.trim && (r = n.map((c) => Be(c) ? c.trim() : c)), o.number && (r = n.map($s)));
  let l, a = s[l = Os(e)] || // also try camelCase event handler (#2249)
  s[l = Os(Ht(e))];
  !a && i && (a = s[l = Os(Kt(e))]), a && wt(
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
    t.emitted[l] = !0, wt(
      u,
      t,
      6,
      r
    );
  }
}
function Lo(t, e, n = !1) {
  const s = e.emitsCache, r = s.get(t);
  if (r !== void 0)
    return r;
  const i = t.emits;
  let o = {}, l = !1;
  if (!Y(t)) {
    const a = (u) => {
      const c = Lo(u, e, !0);
      c && (l = !0, $e(o, c));
    };
    !n && e.mixins.length && e.mixins.forEach(a), t.extends && a(t.extends), t.mixins && t.mixins.forEach(a);
  }
  return !i && !l ? (Fe(t) && s.set(t, null), null) : ($(i) ? i.forEach((a) => o[a] = null) : $e(o, i), Fe(t) && s.set(t, o), o);
}
function ks(t, e) {
  return !t || !gs(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), me(t, e[0].toLowerCase() + e.slice(1)) || me(t, Kt(e)) || me(t, e));
}
function oi(t) {
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
    props: p,
    data: _,
    setupState: E,
    ctx: B,
    inheritAttrs: q
  } = t, oe = as(t);
  let G, te;
  try {
    if (n.shapeFlag & 4) {
      const D = r || s, he = D;
      G = _t(
        u.call(
          he,
          D,
          c,
          p,
          E,
          _,
          B
        )
      ), te = l;
    } else {
      const D = e;
      G = _t(
        D.length > 1 ? D(
          p,
          { attrs: l, slots: o, emit: a }
        ) : D(
          p,
          null
        )
      ), te = e.props ? l : Qa(l);
    }
  } catch (D) {
    Rn.length = 0, vs(D, t, 1), G = bt(zt);
  }
  let ne = G;
  if (te && q !== !1) {
    const D = Object.keys(te), { shapeFlag: he } = ne;
    D.length && he & 7 && (i && D.some(pr) && (te = Xa(
      te,
      i
    )), ne = hn(ne, te, !1, !0));
  }
  return n.dirs && (ne = hn(ne, null, !1, !0), ne.dirs = ne.dirs ? ne.dirs.concat(n.dirs) : n.dirs), n.transition && Tr(ne, n.transition), G = ne, as(oe), G;
}
const Qa = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || gs(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, Xa = (t, e) => {
  const n = {};
  for (const s in t)
    (!pr(s) || !(s.slice(9) in e)) && (n[s] = t[s]);
  return n;
};
function ec(t, e, n) {
  const { props: s, children: r, component: i } = t, { props: o, children: l, patchFlag: a } = e, u = i.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? li(s, o, u) : !!o;
    if (a & 8) {
      const c = e.dynamicProps;
      for (let p = 0; p < c.length; p++) {
        const _ = c[p];
        if (o[_] !== s[_] && !ks(u, _))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? li(s, o, u) : !0 : !!o;
  return !1;
}
function li(t, e, n) {
  const s = Object.keys(e);
  if (s.length !== Object.keys(t).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (e[i] !== t[i] && !ks(n, i))
      return !0;
  }
  return !1;
}
function tc({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const s = e.subTree;
    if (s.suspense && s.suspense.activeBranch === t && (s.el = t.el), s === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const Bo = (t) => t.__isSuspense;
function nc(t, e) {
  e && e.pendingBranch ? $(t) ? e.effects.push(...t) : e.effects.push(t) : fa(t);
}
const Pe = Symbol.for("v-fgt"), xs = Symbol.for("v-txt"), zt = Symbol.for("v-cmt"), Jn = Symbol.for("v-stc"), Rn = [];
let st = null;
function I(t = !1) {
  Rn.push(st = t ? null : []);
}
function sc() {
  Rn.pop(), st = Rn[Rn.length - 1] || null;
}
let Ln = 1;
function ai(t, e = !1) {
  Ln += t, t < 0 && st && e && (st.hasOnce = !0);
}
function No(t) {
  return t.dynamicChildren = Ln > 0 ? st || ln : null, sc(), Ln > 0 && st && st.push(t), t;
}
function F(t, e, n, s, r, i) {
  return No(
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
function rc(t, e, n, s, r) {
  return No(
    bt(
      t,
      e,
      n,
      s,
      r,
      !0
    )
  );
}
function Do(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function _n(t, e) {
  return t.type === e.type && t.key === e.key;
}
const Mo = ({ key: t }) => t ?? null, Qn = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? Be(t) || Ke(t) || Y(t) ? { i: it, r: t, k: e, f: !!n } : t : null);
function v(t, e = null, n = null, s = 0, r = null, i = t === Pe ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Mo(e),
    ref: e && Qn(e),
    scopeId: po,
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
    ctx: it
  };
  return l ? (Ir(a, n), i & 128 && t.normalize(a)) : n && (a.shapeFlag |= Be(n) ? 8 : 16), Ln > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  st && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && st.push(a), a;
}
const bt = ic;
function ic(t, e = null, n = null, s = 0, r = null, i = !1) {
  if ((!t || t === Aa) && (t = zt), Do(t)) {
    const l = hn(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && Ir(l, n), Ln > 0 && !i && st && (l.shapeFlag & 6 ? st[st.indexOf(t)] = l : st.push(l)), l.patchFlag = -2, l;
  }
  if (_c(t) && (t = t.__vccOpts), e) {
    e = oc(e);
    let { class: l, style: a } = e;
    l && !Be(l) && (e.class = Ie(l)), Fe(a) && (Sr(a) && !$(a) && (a = $e({}, a)), e.style = Se(a));
  }
  const o = Be(t) ? 1 : Bo(t) ? 128 : pa(t) ? 64 : Fe(t) ? 4 : Y(t) ? 2 : 0;
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
function oc(t) {
  return t ? Sr(t) || So(t) ? $e({}, t) : t : null;
}
function hn(t, e, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: a } = t, u = e ? ac(r || {}, e) : r, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: u,
    key: u && Mo(u),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? $(i) ? i.concat(Qn(e)) : [i, Qn(e)] : Qn(e)
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
    patchFlag: e && t.type !== Pe ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: t.ssContent && hn(t.ssContent),
    ssFallback: t.ssFallback && hn(t.ssFallback),
    placeholder: t.placeholder,
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return a && s && Tr(
    c,
    a.clone(c)
  ), c;
}
function lt(t = " ", e = 0) {
  return bt(xs, null, t, e);
}
function lc(t, e) {
  const n = bt(Jn, null, t);
  return n.staticCount = e, n;
}
function se(t = "", e = !1) {
  return e ? (I(), rc(zt, null, t)) : bt(zt, null, t);
}
function _t(t) {
  return t == null || typeof t == "boolean" ? bt(zt) : $(t) ? bt(
    Pe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : Do(t) ? qt(t) : bt(xs, null, String(t));
}
function qt(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : hn(t);
}
function Ir(t, e) {
  let n = 0;
  const { shapeFlag: s } = t;
  if (e == null)
    e = null;
  else if ($(e))
    n = 16;
  else if (typeof e == "object")
    if (s & 65) {
      const r = e.default;
      r && (r._c && (r._d = !1), Ir(t, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = e._;
      !r && !So(e) ? e._ctx = it : r === 3 && it && (it.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else Y(e) ? (e = { default: e, _ctx: it }, n = 32) : (e = String(e), s & 64 ? (n = 16, e = [lt(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function ac(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    for (const r in s)
      if (r === "class")
        e.class !== s.class && (e.class = Ie([e.class, s.class]));
      else if (r === "style")
        e.style = Se([e.style, s.style]);
      else if (gs(r)) {
        const i = e[r], o = s[r];
        o && i !== o && !($(i) && i.includes(o)) && (e[r] = i ? [].concat(i, o) : o);
      } else r !== "" && (e[r] = s[r]);
  }
  return e;
}
function pt(t, e, n, s = null) {
  wt(t, e, 7, [
    n,
    s
  ]);
}
const cc = wo();
let uc = 0;
function fc(t, e, n) {
  const s = t.type, r = (e ? e.appContext : t.appContext) || cc, i = {
    uid: uc++,
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
    scope: new Pl(
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
    propsOptions: To(s, r),
    emitsOptions: Lo(s, r),
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
  return i.ctx = { _: i }, i.root = e ? e.root : i, i.emit = Ja.bind(null, i), t.ce && t.ce(i), i;
}
let Ye = null;
const hc = () => Ye || it;
let us, nr;
{
  const t = ys(), e = (n, s) => {
    let r;
    return (r = t[n]) || (r = t[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  us = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ye = n
  ), nr = e(
    "__VUE_SSR_SETTERS__",
    (n) => Bn = n
  );
}
const Dn = (t) => {
  const e = Ye;
  return us(t), t.scope.on(), () => {
    t.scope.off(), us(e);
  };
}, ci = () => {
  Ye && Ye.scope.off(), us(null);
};
function qo(t) {
  return t.vnode.shapeFlag & 4;
}
let Bn = !1;
function dc(t, e = !1, n = !1) {
  e && nr(e);
  const { props: s, children: r } = t.vnode, i = qo(t);
  Da(t, s, i, e), Va(t, r, n || e);
  const o = i ? pc(t, e) : void 0;
  return e && nr(!1), o;
}
function pc(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, Ea);
  const { setup: s } = n;
  if (s) {
    Pt();
    const r = t.setupContext = s.length > 1 ? mc(t) : null, i = Dn(t), o = Nn(
      s,
      t,
      0,
      [
        t.props,
        r
      ]
    ), l = qi(o);
    if (Lt(), i(), (l || t.sp) && !An(t) && go(t), l) {
      if (o.then(ci, ci), e)
        return o.then((a) => {
          ui(t, a);
        }).catch((a) => {
          vs(a, t, 0);
        });
      t.asyncDep = o;
    } else
      ui(t, o);
  } else
    Uo(t);
}
function ui(t, e, n) {
  Y(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : Fe(e) && (t.setupState = lo(e)), Uo(t);
}
function Uo(t, e, n) {
  const s = t.type;
  t.render || (t.render = s.render || yt);
  {
    const r = Dn(t);
    Pt();
    try {
      Ra(t);
    } finally {
      Lt(), r();
    }
  }
}
const gc = {
  get(t, e) {
    return We(t, "get", ""), t[e];
  }
};
function mc(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    attrs: new Proxy(t.attrs, gc),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function Ss(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(lo(ea(t.exposed)), {
    get(e, n) {
      if (n in e)
        return e[n];
      if (n in En)
        return En[n](t);
    },
    has(e, n) {
      return n in e || n in En;
    }
  })) : t.proxy;
}
function _c(t) {
  return Y(t) && "__vccOpts" in t;
}
const De = (t, e) => oa(t, e, Bn), yc = "3.5.18";
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let sr;
const fi = typeof window < "u" && window.trustedTypes;
if (fi)
  try {
    sr = /* @__PURE__ */ fi.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const Vo = sr ? (t) => sr.createHTML(t) : (t) => t, bc = "http://www.w3.org/2000/svg", vc = "http://www.w3.org/1998/Math/MathML", Et = typeof document < "u" ? document : null, hi = Et && /* @__PURE__ */ Et.createElement("template"), wc = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, s) => {
    const r = e === "svg" ? Et.createElementNS(bc, t) : e === "mathml" ? Et.createElementNS(vc, t) : n ? Et.createElement(t, { is: n }) : Et.createElement(t);
    return t === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (t) => Et.createTextNode(t),
  createComment: (t) => Et.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => Et.querySelector(t),
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
      hi.innerHTML = Vo(
        s === "svg" ? `<svg>${t}</svg>` : s === "mathml" ? `<math>${t}</math>` : t
      );
      const l = hi.content;
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
}, kc = Symbol("_vtc");
function xc(t, e, n) {
  const s = t[kc];
  s && (e = (e ? [e, ...s] : [...s]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const di = Symbol("_vod"), Sc = Symbol("_vsh"), Cc = Symbol(""), Tc = /(^|;)\s*display\s*:/;
function Ac(t, e, n) {
  const s = t.style, r = Be(n);
  let i = !1;
  if (n && !r) {
    if (e)
      if (Be(e))
        for (const o of e.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && Xn(s, l, "");
        }
      else
        for (const o in e)
          n[o] == null && Xn(s, o, "");
    for (const o in n)
      o === "display" && (i = !0), Xn(s, o, n[o]);
  } else if (r) {
    if (e !== n) {
      const o = s[Cc];
      o && (n += ";" + o), s.cssText = n, i = Tc.test(n);
    }
  } else e && t.removeAttribute("style");
  di in t && (t[di] = i ? s.display : "", t[Sc] && (s.display = "none"));
}
const pi = /\s*!important$/;
function Xn(t, e, n) {
  if ($(n))
    n.forEach((s) => Xn(t, e, s));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const s = Ec(t, e);
    pi.test(n) ? t.setProperty(
      Kt(s),
      n.replace(pi, ""),
      "important"
    ) : t[s] = n;
  }
}
const gi = ["Webkit", "Moz", "ms"], Ms = {};
function Ec(t, e) {
  const n = Ms[e];
  if (n)
    return n;
  let s = Ht(e);
  if (s !== "filter" && s in t)
    return Ms[e] = s;
  s = Hi(s);
  for (let r = 0; r < gi.length; r++) {
    const i = gi[r] + s;
    if (i in t)
      return Ms[e] = i;
  }
  return e;
}
const mi = "http://www.w3.org/1999/xlink";
function _i(t, e, n, s, r, i = Fl(e)) {
  s && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(mi, e.slice(6, e.length)) : t.setAttributeNS(mi, e, n) : n == null || i && !ji(n) ? t.removeAttribute(e) : t.setAttribute(
    e,
    i ? "" : Wt(n) ? String(n) : n
  );
}
function yi(t, e, n, s, r) {
  if (e === "innerHTML" || e === "textContent") {
    n != null && (t[e] = e === "innerHTML" ? Vo(n) : n);
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
    l === "boolean" ? n = ji(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  o && t.removeAttribute(r || e);
}
function on(t, e, n, s) {
  t.addEventListener(e, n, s);
}
function Rc(t, e, n, s) {
  t.removeEventListener(e, n, s);
}
const bi = Symbol("_vei");
function Ic(t, e, n, s, r = null) {
  const i = t[bi] || (t[bi] = {}), o = i[e];
  if (s && o)
    o.value = s;
  else {
    const [l, a] = Oc(e);
    if (s) {
      const u = i[e] = Lc(
        s,
        r
      );
      on(t, l, u, a);
    } else o && (Rc(t, l, o, a), i[e] = void 0);
  }
}
const vi = /(?:Once|Passive|Capture)$/;
function Oc(t) {
  let e;
  if (vi.test(t)) {
    e = {};
    let s;
    for (; s = t.match(vi); )
      t = t.slice(0, t.length - s[0].length), e[s[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : Kt(t.slice(2)), e];
}
let qs = 0;
const Fc = /* @__PURE__ */ Promise.resolve(), Pc = () => qs || (Fc.then(() => qs = 0), qs = Date.now());
function Lc(t, e) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    wt(
      Bc(s, n.value),
      e,
      5,
      [s]
    );
  };
  return n.value = t, n.attached = Pc(), n;
}
function Bc(t, e) {
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
const wi = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, Nc = (t, e, n, s, r, i) => {
  const o = r === "svg";
  e === "class" ? xc(t, s, o) : e === "style" ? Ac(t, n, s) : gs(e) ? pr(e) || Ic(t, e, n, s, i) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Dc(t, e, s, o)) ? (yi(t, e, s), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && _i(t, e, s, o, i, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && (/[A-Z]/.test(e) || !Be(s)) ? yi(t, Ht(e), s, i, e) : (e === "true-value" ? t._trueValue = s : e === "false-value" && (t._falseValue = s), _i(t, e, s, o));
};
function Dc(t, e, n, s) {
  if (s)
    return !!(e === "innerHTML" || e === "textContent" || e in t && wi(e) && Y(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const r = t.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return wi(e) && Be(n) ? !1 : e in t;
}
const ki = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return $(e) ? (n) => Gn(e, n) : e;
};
function Mc(t) {
  t.target.composing = !0;
}
function xi(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const Us = Symbol("_assign"), Yt = {
  created(t, { modifiers: { lazy: e, trim: n, number: s } }, r) {
    t[Us] = ki(r);
    const i = s || r.props && r.props.type === "number";
    on(t, e ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let l = t.value;
      n && (l = l.trim()), i && (l = $s(l)), t[Us](l);
    }), n && on(t, "change", () => {
      t.value = t.value.trim();
    }), e || (on(t, "compositionstart", Mc), on(t, "compositionend", xi), on(t, "change", xi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (t[Us] = ki(o), t.composing) return;
    const l = (i || t.type === "number") && !/^0\d/.test(t.value) ? $s(t.value) : t.value, a = e ?? "";
    l !== a && (document.activeElement === t && t.type !== "range" && (s && e === n || r && t.value.trim() === a) || (t.value = a));
  }
}, qc = ["ctrl", "shift", "alt", "meta"], Uc = {
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
  exact: (t, e) => qc.some((n) => t[`${n}Key`] && !e.includes(n))
}, Si = (t, e) => {
  const n = t._withMods || (t._withMods = {}), s = e.join(".");
  return n[s] || (n[s] = (r, ...i) => {
    for (let o = 0; o < e.length; o++) {
      const l = Uc[e[o]];
      if (l && l(r, e)) return;
    }
    return t(r, ...i);
  });
}, Vc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Ci = (t, e) => {
  const n = t._withKeys || (t._withKeys = {}), s = e.join(".");
  return n[s] || (n[s] = (r) => {
    if (!("key" in r))
      return;
    const i = Kt(r.key);
    if (e.some(
      (o) => o === i || Vc[o] === i
    ))
      return t(r);
  });
}, Hc = /* @__PURE__ */ $e({ patchProp: Nc }, wc);
let Ti;
function jc() {
  return Ti || (Ti = ja(Hc));
}
const zc = (...t) => {
  const e = jc().createApp(...t), { mount: n } = e;
  return e.mount = (s) => {
    const r = Kc(s);
    if (!r) return;
    const i = e._component;
    !Y(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, Wc(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, e;
};
function Wc(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function Kc(t) {
  return Be(t) ? document.querySelector(t) : t;
}
const Dt = (t) => {
  const e = t.replace("#", ""), n = parseInt(e.substr(0, 2), 16), s = parseInt(e.substr(2, 2), 16), r = parseInt(e.substr(4, 2), 16);
  return (n * 299 + s * 587 + r * 114) / 1e3 < 128;
}, $c = (t, e) => {
  const n = t.replace("#", ""), s = parseInt(n.substr(0, 2), 16), r = parseInt(n.substr(2, 2), 16), i = parseInt(n.substr(4, 2), 16), o = Dt(t), l = o ? Math.min(255, s + e) : Math.max(0, s - e), a = o ? Math.min(255, r + e) : Math.max(0, r - e), u = o ? Math.min(255, i + e) : Math.max(0, i - e);
  return `#${l.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}${u.toString(16).padStart(2, "0")}`;
}, jn = (t) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t), Gc = (t) => {
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
function Or() {
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
var en = Or();
function Ho(t) {
  en = t;
}
var In = { exec: () => null };
function _e(t, e = "") {
  let n = typeof t == "string" ? t : t.source;
  const s = {
    replace: (r, i) => {
      let o = typeof i == "string" ? i : i.source;
      return o = o.replace(Je.caret, "$1"), n = n.replace(r, o), s;
    },
    getRegex: () => new RegExp(n, e)
  };
  return s;
}
var Je = {
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
}, Zc = /^(?:[ \t]*(?:\n|$))+/, Yc = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Jc = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Mn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Qc = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Fr = /(?:[*+-]|\d{1,9}[.)])/, jo = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, zo = _e(jo).replace(/bull/g, Fr).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Xc = _e(jo).replace(/bull/g, Fr).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Pr = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, eu = /^[^\n]+/, Lr = /(?!\s*\])(?:\\.|[^\[\]\\])+/, tu = _e(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Lr).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), nu = _e(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Fr).getRegex(), Cs = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Br = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, su = _e(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", Br).replace("tag", Cs).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Wo = _e(Pr).replace("hr", Mn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Cs).getRegex(), ru = _e(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Wo).getRegex(), Nr = {
  blockquote: ru,
  code: Yc,
  def: tu,
  fences: Jc,
  heading: Qc,
  hr: Mn,
  html: su,
  lheading: zo,
  list: nu,
  newline: Zc,
  paragraph: Wo,
  table: In,
  text: eu
}, Ai = _e(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", Mn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Cs).getRegex(), iu = {
  ...Nr,
  lheading: Xc,
  table: Ai,
  paragraph: _e(Pr).replace("hr", Mn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Ai).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Cs).getRegex()
}, ou = {
  ...Nr,
  html: _e(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", Br).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: In,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: _e(Pr).replace("hr", Mn).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", zo).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, lu = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, au = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Ko = /^( {2,}|\\)\n(?!\s*$)/, cu = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Ts = /[\p{P}\p{S}]/u, Dr = /[\s\p{P}\p{S}]/u, $o = /[^\s\p{P}\p{S}]/u, uu = _e(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Dr).getRegex(), Go = /(?!~)[\p{P}\p{S}]/u, fu = /(?!~)[\s\p{P}\p{S}]/u, hu = /(?:[^\s\p{P}\p{S}]|~)/u, du = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, Zo = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, pu = _e(Zo, "u").replace(/punct/g, Ts).getRegex(), gu = _e(Zo, "u").replace(/punct/g, Go).getRegex(), Yo = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", mu = _e(Yo, "gu").replace(/notPunctSpace/g, $o).replace(/punctSpace/g, Dr).replace(/punct/g, Ts).getRegex(), _u = _e(Yo, "gu").replace(/notPunctSpace/g, hu).replace(/punctSpace/g, fu).replace(/punct/g, Go).getRegex(), yu = _e(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, $o).replace(/punctSpace/g, Dr).replace(/punct/g, Ts).getRegex(), bu = _e(/\\(punct)/, "gu").replace(/punct/g, Ts).getRegex(), vu = _e(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), wu = _e(Br).replace("(?:-->|$)", "-->").getRegex(), ku = _e(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", wu).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), fs = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, xu = _e(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", fs).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), Jo = _e(/^!?\[(label)\]\[(ref)\]/).replace("label", fs).replace("ref", Lr).getRegex(), Qo = _e(/^!?\[(ref)\](?:\[\])?/).replace("ref", Lr).getRegex(), Su = _e("reflink|nolink(?!\\()", "g").replace("reflink", Jo).replace("nolink", Qo).getRegex(), Mr = {
  _backpedal: In,
  // only used for GFM url
  anyPunctuation: bu,
  autolink: vu,
  blockSkip: du,
  br: Ko,
  code: au,
  del: In,
  emStrongLDelim: pu,
  emStrongRDelimAst: mu,
  emStrongRDelimUnd: yu,
  escape: lu,
  link: xu,
  nolink: Qo,
  punctuation: uu,
  reflink: Jo,
  reflinkSearch: Su,
  tag: ku,
  text: cu,
  url: In
}, Cu = {
  ...Mr,
  link: _e(/^!?\[(label)\]\((.*?)\)/).replace("label", fs).getRegex(),
  reflink: _e(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", fs).getRegex()
}, rr = {
  ...Mr,
  emStrongRDelimAst: _u,
  emStrongLDelim: gu,
  url: _e(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Tu = {
  ...rr,
  br: _e(Ko).replace("{2,}", "*").getRegex(),
  text: _e(rr.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, zn = {
  normal: Nr,
  gfm: iu,
  pedantic: ou
}, yn = {
  normal: Mr,
  gfm: rr,
  breaks: Tu,
  pedantic: Cu
}, Au = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Ei = (t) => Au[t];
function gt(t, e) {
  if (e) {
    if (Je.escapeTest.test(t))
      return t.replace(Je.escapeReplace, Ei);
  } else if (Je.escapeTestNoEncode.test(t))
    return t.replace(Je.escapeReplaceNoEncode, Ei);
  return t;
}
function Ri(t) {
  try {
    t = encodeURI(t).replace(Je.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function Ii(t, e) {
  var i;
  const n = t.replace(Je.findPipe, (o, l, a) => {
    let u = !1, c = l;
    for (; --c >= 0 && a[c] === "\\"; ) u = !u;
    return u ? "|" : " |";
  }), s = n.split(Je.splitPipe);
  let r = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !((i = s.at(-1)) != null && i.trim()) && s.pop(), e)
    if (s.length > e)
      s.splice(e);
    else
      for (; s.length < e; ) s.push("");
  for (; r < s.length; r++)
    s[r] = s[r].trim().replace(Je.slashPipe, "|");
  return s;
}
function bn(t, e, n) {
  const s = t.length;
  if (s === 0)
    return "";
  let r = 0;
  for (; r < s && t.charAt(s - r - 1) === e; )
    r++;
  return t.slice(0, s - r);
}
function Eu(t, e) {
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
function Oi(t, e, n, s, r) {
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
function Ru(t, e, n) {
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
var hs = class {
  // set by the lexer
  constructor(t) {
    we(this, "options");
    we(this, "rules");
    // set by the lexer
    we(this, "lexer");
    this.options = t || en;
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
        text: this.options.pedantic ? n : bn(n, `
`)
      };
    }
  }
  fences(t) {
    const e = this.rules.block.fences.exec(t);
    if (e) {
      const n = e[0], s = Ru(n, e[3] || "", this.rules);
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
        const s = bn(n, "#");
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
        raw: bn(e[0], `
`)
      };
  }
  blockquote(t) {
    const e = this.rules.block.blockquote.exec(t);
    if (e) {
      let n = bn(e[0], `
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
        const p = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(c, i, !0), this.lexer.state.top = p, n.length === 0)
          break;
        const _ = i.at(-1);
        if ((_ == null ? void 0 : _.type) === "code")
          break;
        if ((_ == null ? void 0 : _.type) === "blockquote") {
          const E = _, B = E.raw + `
` + n.join(`
`), q = this.blockquote(B);
          i[i.length - 1] = q, s = s.substring(0, s.length - E.raw.length) + q.raw, r = r.substring(0, r.length - E.text.length) + q.text;
          break;
        } else if ((_ == null ? void 0 : _.type) === "list") {
          const E = _, B = E.raw + `
` + n.join(`
`), q = this.list(B);
          i[i.length - 1] = q, s = s.substring(0, s.length - _.raw.length) + q.raw, r = r.substring(0, r.length - E.raw.length) + q.raw, n = B.substring(i.at(-1).raw.length).split(`
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
        let p = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (G) => " ".repeat(3 * G.length)), _ = t.split(`
`, 1)[0], E = !p.trim(), B = 0;
        if (this.options.pedantic ? (B = 2, c = p.trimStart()) : E ? B = e[1].length + 1 : (B = e[2].search(this.rules.other.nonSpaceChar), B = B > 4 ? 1 : B, c = p.slice(B), B += e[1].length), E && this.rules.other.blankLine.test(_) && (u += _ + `
`, t = t.substring(_.length + 1), a = !0), !a) {
          const G = this.rules.other.nextBulletRegex(B), te = this.rules.other.hrRegex(B), ne = this.rules.other.fencesBeginRegex(B), D = this.rules.other.headingBeginRegex(B), he = this.rules.other.htmlBeginRegex(B);
          for (; t; ) {
            const ye = t.split(`
`, 1)[0];
            let ee;
            if (_ = ye, this.options.pedantic ? (_ = _.replace(this.rules.other.listReplaceNesting, "  "), ee = _) : ee = _.replace(this.rules.other.tabCharGlobal, "    "), ne.test(_) || D.test(_) || he.test(_) || G.test(_) || te.test(_))
              break;
            if (ee.search(this.rules.other.nonSpaceChar) >= B || !_.trim())
              c += `
` + ee.slice(B);
            else {
              if (E || p.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || ne.test(p) || D.test(p) || te.test(p))
                break;
              c += `
` + _;
            }
            !E && !_.trim() && (E = !0), u += ye + `
`, t = t.substring(ye.length + 1), p = ee.slice(B);
          }
        }
        r.loose || (o ? r.loose = !0 : this.rules.other.doubleBlankLine.test(u) && (o = !0));
        let q = null, oe;
        this.options.gfm && (q = this.rules.other.listIsTask.exec(c), q && (oe = q[0] !== "[ ] ", c = c.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: u,
          task: !!q,
          checked: oe,
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
          const u = r.items[a].tokens.filter((p) => p.type === "space"), c = u.length > 0 && u.some((p) => this.rules.other.anyLine.test(p.raw));
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
    const n = Ii(e[1]), s = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = (o = e[3]) != null && o.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
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
        i.rows.push(Ii(l, i.header.length).map((a, u) => ({
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
        const i = bn(n.slice(0, -1), "\\");
        if ((n.length - i.length) % 2 === 0)
          return;
      } else {
        const i = Eu(e[2], "()");
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
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), Oi(e, {
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
      return Oi(n, r, n[0], this.lexer, this.rules);
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
        const p = [...s[0]][0].length, _ = t.slice(0, i + s.index + p + l);
        if (Math.min(i, l) % 2) {
          const B = _.slice(1, -1);
          return {
            type: "em",
            raw: _,
            text: B,
            tokens: this.lexer.inlineTokens(B)
          };
        }
        const E = _.slice(2, -2);
        return {
          type: "strong",
          raw: _,
          text: E,
          tokens: this.lexer.inlineTokens(E)
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
}, Ot = class ir {
  constructor(e) {
    we(this, "tokens");
    we(this, "options");
    we(this, "state");
    we(this, "tokenizer");
    we(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || en, this.options.tokenizer = this.options.tokenizer || new hs(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      other: Je,
      block: zn.normal,
      inline: yn.normal
    };
    this.options.pedantic ? (n.block = zn.pedantic, n.inline = yn.pedantic) : this.options.gfm && (n.block = zn.gfm, this.options.breaks ? n.inline = yn.breaks : n.inline = yn.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: zn,
      inline: yn
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, n) {
    return new ir(n).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, n) {
    return new ir(n).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(Je.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const s = this.inlineQueue[n];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, n = [], s = !1) {
    var r, i, o;
    for (this.options.pedantic && (e = e.replace(Je.tabCharGlobal, "    ").replace(Je.spaceLine, "")); e; ) {
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
        let p;
        this.options.extensions.startBlock.forEach((_) => {
          p = _.call({ lexer: this }, c), typeof p == "number" && p >= 0 && (u = Math.min(u, p));
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
      let p = e;
      if ((u = this.options.extensions) != null && u.startInline) {
        let _ = 1 / 0;
        const E = e.slice(1);
        let B;
        this.options.extensions.startInline.forEach((q) => {
          B = q.call({ lexer: this }, E), typeof B == "number" && B >= 0 && (_ = Math.min(_, B));
        }), _ < 1 / 0 && _ >= 0 && (p = e.substring(0, _ + 1));
      }
      if (c = this.tokenizer.inlineText(p)) {
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
}, ds = class {
  // set by the parser
  constructor(t) {
    we(this, "options");
    we(this, "parser");
    this.options = t || en;
  }
  space(t) {
    return "";
  }
  code({ text: t, lang: e, escaped: n }) {
    var i;
    const s = (i = (e || "").match(Je.notSpaceStart)) == null ? void 0 : i[0], r = t.replace(Je.endingNewline, "") + `
`;
    return s ? '<pre><code class="language-' + gt(s) + '">' + (n ? r : gt(r, !0)) + `</code></pre>
` : "<pre><code>" + (n ? r : gt(r, !0)) + `</code></pre>
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
      t.loose ? ((n = t.tokens[0]) == null ? void 0 : n.type) === "paragraph" ? (t.tokens[0].text = s + " " + t.tokens[0].text, t.tokens[0].tokens && t.tokens[0].tokens.length > 0 && t.tokens[0].tokens[0].type === "text" && (t.tokens[0].tokens[0].text = s + " " + gt(t.tokens[0].tokens[0].text), t.tokens[0].tokens[0].escaped = !0)) : t.tokens.unshift({
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
    return `<code>${gt(t, !0)}</code>`;
  }
  br(t) {
    return "<br>";
  }
  del({ tokens: t }) {
    return `<del>${this.parser.parseInline(t)}</del>`;
  }
  link({ href: t, title: e, tokens: n }) {
    const s = this.parser.parseInline(n), r = Ri(t);
    if (r === null)
      return s;
    t = r;
    let i = '<a href="' + t + '"';
    return e && (i += ' title="' + gt(e) + '"'), i += ">" + s + "</a>", i;
  }
  image({ href: t, title: e, text: n, tokens: s }) {
    s && (n = this.parser.parseInline(s, this.parser.textRenderer));
    const r = Ri(t);
    if (r === null)
      return gt(n);
    t = r;
    let i = `<img src="${t}" alt="${n}"`;
    return e && (i += ` title="${gt(e)}"`), i += ">", i;
  }
  text(t) {
    return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : gt(t.text);
  }
}, qr = class {
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
}, Ft = class or {
  constructor(e) {
    we(this, "options");
    we(this, "renderer");
    we(this, "textRenderer");
    this.options = e || en, this.options.renderer = this.options.renderer || new ds(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new qr();
  }
  /**
   * Static Parse Method
   */
  static parse(e, n) {
    return new or(n).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, n) {
    return new or(n).parseInline(e);
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
}, Ws, es = (Ws = class {
  constructor(t) {
    we(this, "options");
    we(this, "block");
    this.options = t || en;
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
    return this.block ? Ot.lex : Ot.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? Ft.parse : Ft.parseInline;
  }
}, we(Ws, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
])), Ws), Iu = class {
  constructor(...t) {
    we(this, "defaults", Or());
    we(this, "options", this.setOptions);
    we(this, "parse", this.parseMarkdown(!0));
    we(this, "parseInline", this.parseMarkdown(!1));
    we(this, "Parser", Ft);
    we(this, "Renderer", ds);
    we(this, "TextRenderer", qr);
    we(this, "Lexer", Ot);
    we(this, "Tokenizer", hs);
    we(this, "Hooks", es);
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
        const r = this.defaults.renderer || new ds(this.defaults);
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
        const r = this.defaults.tokenizer || new hs(this.defaults);
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
        const r = this.defaults.hooks || new es();
        for (const i in n.hooks) {
          if (!(i in r))
            throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i))
            continue;
          const o = i, l = n.hooks[o], a = r[o];
          es.passThroughHooks.has(i) ? r[o] = (u) => {
            if (this.defaults.async)
              return Promise.resolve(l.call(r, u)).then((p) => a.call(r, p));
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
    return Ot.lex(t, e ?? this.defaults);
  }
  parser(t, e) {
    return Ft.parse(t, e ?? this.defaults);
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
      const l = i.hooks ? i.hooks.provideLexer() : t ? Ot.lex : Ot.lexInline, a = i.hooks ? i.hooks.provideParser() : t ? Ft.parse : Ft.parseInline;
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
        const s = "<p>An error occurred:</p><pre>" + gt(n.message + "", !0) + "</pre>";
        return e ? Promise.resolve(s) : s;
      }
      if (e)
        return Promise.reject(n);
      throw n;
    };
  }
}, Xt = new Iu();
function fe(t, e) {
  return Xt.parse(t, e);
}
fe.options = fe.setOptions = function(t) {
  return Xt.setOptions(t), fe.defaults = Xt.defaults, Ho(fe.defaults), fe;
};
fe.getDefaults = Or;
fe.defaults = en;
fe.use = function(...t) {
  return Xt.use(...t), fe.defaults = Xt.defaults, Ho(fe.defaults), fe;
};
fe.walkTokens = function(t, e) {
  return Xt.walkTokens(t, e);
};
fe.parseInline = Xt.parseInline;
fe.Parser = Ft;
fe.parser = Ft.parse;
fe.Renderer = ds;
fe.TextRenderer = qr;
fe.Lexer = Ot;
fe.lexer = Ot.lex;
fe.Tokenizer = hs;
fe.Hooks = es;
fe.parse = fe;
fe.options;
fe.setOptions;
fe.use;
fe.walkTokens;
fe.parseInline;
Ft.parse;
Ot.lex;
const ps = {
  API_URL: "http://localhost:8000/api/v1",
  WS_URL: "ws://localhost:8000"
};
function Ou(t) {
  const e = De(() => ({
    backgroundColor: t.value.chat_background_color || "#ffffff",
    color: Dt(t.value.chat_background_color || "#ffffff") ? "#ffffff" : "#000000"
  })), n = De(() => ({
    backgroundColor: t.value.chat_bubble_color || "#f34611",
    color: Dt(t.value.chat_bubble_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), s = De(() => {
    const u = t.value.chat_background_color || "#F8F9FA", c = $c(u, 20);
    return {
      backgroundColor: c,
      color: Dt(c) ? "#FFFFFF" : "#000000"
    };
  }), r = De(() => ({
    backgroundColor: t.value.accent_color || "#f34611",
    color: Dt(t.value.accent_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), i = De(() => ({
    color: Dt(t.value.chat_background_color || "#F8F9FA") ? "#FFFFFF" : "#000000"
  })), o = De(() => ({
    borderBottom: `1px solid ${Dt(t.value.chat_background_color || "#F8F9FA") ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`
  })), l = De(() => t.value.photo_url ? t.value.photo_url.includes("amazonaws.com") ? t.value.photo_url : `${ps.API_URL}${t.value.photo_url}` : ""), a = De(() => {
    const u = t.value.chat_background_color || "#ffffff";
    return {
      boxShadow: `0 8px 5px ${Dt(u) ? "rgba(0, 0, 0, 0.24)" : "rgba(0, 0, 0, 0.12)"}`
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
const kt = /* @__PURE__ */ Object.create(null);
kt.open = "0";
kt.close = "1";
kt.ping = "2";
kt.pong = "3";
kt.message = "4";
kt.upgrade = "5";
kt.noop = "6";
const ts = /* @__PURE__ */ Object.create(null);
Object.keys(kt).forEach((t) => {
  ts[kt[t]] = t;
});
const lr = { type: "error", data: "parser error" }, Xo = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", el = typeof ArrayBuffer == "function", tl = (t) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t && t.buffer instanceof ArrayBuffer, Ur = ({ type: t, data: e }, n, s) => Xo && e instanceof Blob ? n ? s(e) : Fi(e, s) : el && (e instanceof ArrayBuffer || tl(e)) ? n ? s(e) : Fi(new Blob([e]), s) : s(kt[t] + (e || "")), Fi = (t, e) => {
  const n = new FileReader();
  return n.onload = function() {
    const s = n.result.split(",")[1];
    e("b" + (s || ""));
  }, n.readAsDataURL(t);
};
function Pi(t) {
  return t instanceof Uint8Array ? t : t instanceof ArrayBuffer ? new Uint8Array(t) : new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
}
let Vs;
function Fu(t, e) {
  if (Xo && t.data instanceof Blob)
    return t.data.arrayBuffer().then(Pi).then(e);
  if (el && (t.data instanceof ArrayBuffer || tl(t.data)))
    return e(Pi(t.data));
  Ur(t, !1, (n) => {
    Vs || (Vs = new TextEncoder()), e(Vs.encode(n));
  });
}
const Li = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", kn = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let t = 0; t < Li.length; t++)
  kn[Li.charCodeAt(t)] = t;
const Pu = (t) => {
  let e = t.length * 0.75, n = t.length, s, r = 0, i, o, l, a;
  t[t.length - 1] === "=" && (e--, t[t.length - 2] === "=" && e--);
  const u = new ArrayBuffer(e), c = new Uint8Array(u);
  for (s = 0; s < n; s += 4)
    i = kn[t.charCodeAt(s)], o = kn[t.charCodeAt(s + 1)], l = kn[t.charCodeAt(s + 2)], a = kn[t.charCodeAt(s + 3)], c[r++] = i << 2 | o >> 4, c[r++] = (o & 15) << 4 | l >> 2, c[r++] = (l & 3) << 6 | a & 63;
  return u;
}, Lu = typeof ArrayBuffer == "function", Vr = (t, e) => {
  if (typeof t != "string")
    return {
      type: "message",
      data: nl(t, e)
    };
  const n = t.charAt(0);
  return n === "b" ? {
    type: "message",
    data: Bu(t.substring(1), e)
  } : ts[n] ? t.length > 1 ? {
    type: ts[n],
    data: t.substring(1)
  } : {
    type: ts[n]
  } : lr;
}, Bu = (t, e) => {
  if (Lu) {
    const n = Pu(t);
    return nl(n, e);
  } else
    return { base64: !0, data: t };
}, nl = (t, e) => {
  switch (e) {
    case "blob":
      return t instanceof Blob ? t : new Blob([t]);
    case "arraybuffer":
    default:
      return t instanceof ArrayBuffer ? t : t.buffer;
  }
}, sl = "", Nu = (t, e) => {
  const n = t.length, s = new Array(n);
  let r = 0;
  t.forEach((i, o) => {
    Ur(i, !1, (l) => {
      s[o] = l, ++r === n && e(s.join(sl));
    });
  });
}, Du = (t, e) => {
  const n = t.split(sl), s = [];
  for (let r = 0; r < n.length; r++) {
    const i = Vr(n[r], e);
    if (s.push(i), i.type === "error")
      break;
  }
  return s;
};
function Mu() {
  return new TransformStream({
    transform(t, e) {
      Fu(t, (n) => {
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
let Hs;
function Wn(t) {
  return t.reduce((e, n) => e + n.length, 0);
}
function Kn(t, e) {
  if (t[0].length === e)
    return t.shift();
  const n = new Uint8Array(e);
  let s = 0;
  for (let r = 0; r < e; r++)
    n[r] = t[0][s++], s === t[0].length && (t.shift(), s = 0);
  return t.length && s < t[0].length && (t[0] = t[0].slice(s)), n;
}
function qu(t, e) {
  Hs || (Hs = new TextDecoder());
  const n = [];
  let s = 0, r = -1, i = !1;
  return new TransformStream({
    transform(o, l) {
      for (n.push(o); ; ) {
        if (s === 0) {
          if (Wn(n) < 1)
            break;
          const a = Kn(n, 1);
          i = (a[0] & 128) === 128, r = a[0] & 127, r < 126 ? s = 3 : r === 126 ? s = 1 : s = 2;
        } else if (s === 1) {
          if (Wn(n) < 2)
            break;
          const a = Kn(n, 2);
          r = new DataView(a.buffer, a.byteOffset, a.length).getUint16(0), s = 3;
        } else if (s === 2) {
          if (Wn(n) < 8)
            break;
          const a = Kn(n, 8), u = new DataView(a.buffer, a.byteOffset, a.length), c = u.getUint32(0);
          if (c > Math.pow(2, 21) - 1) {
            l.enqueue(lr);
            break;
          }
          r = c * Math.pow(2, 32) + u.getUint32(4), s = 3;
        } else {
          if (Wn(n) < r)
            break;
          const a = Kn(n, r);
          l.enqueue(Vr(i ? a : Hs.decode(a), e)), s = 0;
        }
        if (r === 0 || r > t) {
          l.enqueue(lr);
          break;
        }
      }
    }
  });
}
const rl = 4;
function Le(t) {
  if (t) return Uu(t);
}
function Uu(t) {
  for (var e in Le.prototype)
    t[e] = Le.prototype[e];
  return t;
}
Le.prototype.on = Le.prototype.addEventListener = function(t, e) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
};
Le.prototype.once = function(t, e) {
  function n() {
    this.off(t, n), e.apply(this, arguments);
  }
  return n.fn = e, this.on(t, n), this;
};
Le.prototype.off = Le.prototype.removeListener = Le.prototype.removeAllListeners = Le.prototype.removeEventListener = function(t, e) {
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
Le.prototype.emit = function(t) {
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
Le.prototype.emitReserved = Le.prototype.emit;
Le.prototype.listeners = function(t) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
};
Le.prototype.hasListeners = function(t) {
  return !!this.listeners(t).length;
};
const As = typeof Promise == "function" && typeof Promise.resolve == "function" ? (e) => Promise.resolve().then(e) : (e, n) => n(e, 0), rt = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), Vu = "arraybuffer";
function il(t, ...e) {
  return e.reduce((n, s) => (t.hasOwnProperty(s) && (n[s] = t[s]), n), {});
}
const Hu = rt.setTimeout, ju = rt.clearTimeout;
function Es(t, e) {
  e.useNativeTimers ? (t.setTimeoutFn = Hu.bind(rt), t.clearTimeoutFn = ju.bind(rt)) : (t.setTimeoutFn = rt.setTimeout.bind(rt), t.clearTimeoutFn = rt.clearTimeout.bind(rt));
}
const zu = 1.33;
function Wu(t) {
  return typeof t == "string" ? Ku(t) : Math.ceil((t.byteLength || t.size) * zu);
}
function Ku(t) {
  let e = 0, n = 0;
  for (let s = 0, r = t.length; s < r; s++)
    e = t.charCodeAt(s), e < 128 ? n += 1 : e < 2048 ? n += 2 : e < 55296 || e >= 57344 ? n += 3 : (s++, n += 4);
  return n;
}
function ol() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function $u(t) {
  let e = "";
  for (let n in t)
    t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
  return e;
}
function Gu(t) {
  let e = {}, n = t.split("&");
  for (let s = 0, r = n.length; s < r; s++) {
    let i = n[s].split("=");
    e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
  }
  return e;
}
class Zu extends Error {
  constructor(e, n, s) {
    super(e), this.description = n, this.context = s, this.type = "TransportError";
  }
}
class Hr extends Le {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(e) {
    super(), this.writable = !1, Es(this, e), this.opts = e, this.query = e.query, this.socket = e.socket, this.supportsBinary = !e.forceBase64;
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
    return super.emitReserved("error", new Zu(e, n, s)), this;
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
    const n = Vr(e, this.socket.binaryType);
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
    const n = $u(e);
    return n.length ? "?" + n : "";
  }
}
class Yu extends Hr {
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
    Du(e, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
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
    this.writable = !1, Nu(e, (n) => {
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
    return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = ol()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(e, n);
  }
}
let ll = !1;
try {
  ll = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const Ju = ll;
function Qu() {
}
class Xu extends Yu {
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
class vt extends Le {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(e, n, s) {
    super(), this.createRequest = e, Es(this, s), this._opts = s, this._method = s.method || "GET", this._uri = n, this._data = s.data !== void 0 ? s.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var e;
    const n = il(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
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
    typeof document < "u" && (this._index = vt.requestsCount++, vt.requests[this._index] = this);
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
      if (this._xhr.onreadystatechange = Qu, e)
        try {
          this._xhr.abort();
        } catch {
        }
      typeof document < "u" && delete vt.requests[this._index], this._xhr = null;
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
vt.requestsCount = 0;
vt.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", Bi);
  else if (typeof addEventListener == "function") {
    const t = "onpagehide" in rt ? "pagehide" : "unload";
    addEventListener(t, Bi, !1);
  }
}
function Bi() {
  for (let t in vt.requests)
    vt.requests.hasOwnProperty(t) && vt.requests[t].abort();
}
const ef = function() {
  const t = al({
    xdomain: !1
  });
  return t && t.responseType !== null;
}();
class tf extends Xu {
  constructor(e) {
    super(e);
    const n = e && e.forceBase64;
    this.supportsBinary = ef && !n;
  }
  request(e = {}) {
    return Object.assign(e, { xd: this.xd }, this.opts), new vt(al, this.uri(), e);
  }
}
function al(t) {
  const e = t.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!e || Ju))
      return new XMLHttpRequest();
  } catch {
  }
  if (!e)
    try {
      return new rt[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const cl = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class nf extends Hr {
  get name() {
    return "websocket";
  }
  doOpen() {
    const e = this.uri(), n = this.opts.protocols, s = cl ? {} : il(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
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
      Ur(s, this.supportsBinary, (i) => {
        try {
          this.doWrite(s, i);
        } catch {
        }
        r && As(() => {
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
    return this.opts.timestampRequests && (n[this.opts.timestampParam] = ol()), this.supportsBinary || (n.b64 = 1), this.createUri(e, n);
  }
}
const js = rt.WebSocket || rt.MozWebSocket;
class sf extends nf {
  createSocket(e, n, s) {
    return cl ? new js(e, n, s) : n ? new js(e, n) : new js(e);
  }
  doWrite(e, n) {
    this.ws.send(n);
  }
}
class rf extends Hr {
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
        const n = qu(Number.MAX_SAFE_INTEGER, this.socket.binaryType), s = e.readable.pipeThrough(n).getReader(), r = Mu();
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
        r && As(() => {
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
const of = {
  websocket: sf,
  webtransport: rf,
  polling: tf
}, lf = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, af = [
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
function ar(t) {
  if (t.length > 8e3)
    throw "URI too long";
  const e = t, n = t.indexOf("["), s = t.indexOf("]");
  n != -1 && s != -1 && (t = t.substring(0, n) + t.substring(n, s).replace(/:/g, ";") + t.substring(s, t.length));
  let r = lf.exec(t || ""), i = {}, o = 14;
  for (; o--; )
    i[af[o]] = r[o] || "";
  return n != -1 && s != -1 && (i.source = e, i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"), i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), i.ipv6uri = !0), i.pathNames = cf(i, i.path), i.queryKey = uf(i, i.query), i;
}
function cf(t, e) {
  const n = /\/{2,9}/g, s = e.replace(n, "/").split("/");
  return (e.slice(0, 1) == "/" || e.length === 0) && s.splice(0, 1), e.slice(-1) == "/" && s.splice(s.length - 1, 1), s;
}
function uf(t, e) {
  const n = {};
  return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, r, i) {
    r && (n[r] = i);
  }), n;
}
const cr = typeof addEventListener == "function" && typeof removeEventListener == "function", ns = [];
cr && addEventListener("offline", () => {
  ns.forEach((t) => t());
}, !1);
class Vt extends Le {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(e, n) {
    if (super(), this.binaryType = Vu, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, e && typeof e == "object" && (n = e, e = null), e) {
      const s = ar(e);
      n.hostname = s.host, n.secure = s.protocol === "https" || s.protocol === "wss", n.port = s.port, s.query && (n.query = s.query);
    } else n.host && (n.hostname = ar(n.host).host);
    Es(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((s) => {
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
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = Gu(this.opts.query)), cr && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, ns.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
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
    n.EIO = rl, n.transport = e, this.id && (n.sid = this.id);
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
    const e = this.opts.rememberUpgrade && Vt.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
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
    this.readyState = "open", Vt.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
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
      if (r && (n += Wu(r)), s > 0 && n > this._maxPayload)
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
    return e && (this._pingTimeoutTime = 0, As(() => {
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
    if (Vt.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
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
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), cr && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const s = ns.indexOf(this._offlineEventListener);
        s !== -1 && ns.splice(s, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", e, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
Vt.protocol = rl;
class ff extends Vt {
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
    Vt.priorWebsocketSuccess = !1;
    const r = () => {
      s || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (p) => {
        if (!s)
          if (p.type === "pong" && p.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", n), !n)
              return;
            Vt.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
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
    const o = (p) => {
      const _ = new Error("probe error: " + p);
      _.transport = n.name, i(), this.emitReserved("upgradeError", _);
    };
    function l() {
      o("transport closed");
    }
    function a() {
      o("socket closed");
    }
    function u(p) {
      n && p.name !== n.name && i();
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
let hf = class extends ff {
  constructor(e, n = {}) {
    const s = typeof e == "object" ? e : n;
    (!s.transports || s.transports && typeof s.transports[0] == "string") && (s.transports = (s.transports || ["polling", "websocket", "webtransport"]).map((r) => of[r]).filter((r) => !!r)), super(e, s);
  }
};
function df(t, e = "", n) {
  let s = t;
  n = n || typeof location < "u" && location, t == null && (t = n.protocol + "//" + n.host), typeof t == "string" && (t.charAt(0) === "/" && (t.charAt(1) === "/" ? t = n.protocol + t : t = n.host + t), /^(https?|wss?):\/\//.test(t) || (typeof n < "u" ? t = n.protocol + "//" + t : t = "https://" + t), s = ar(t)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
  const i = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return s.id = s.protocol + "://" + i + ":" + s.port + e, s.href = s.protocol + "://" + i + (n && n.port === s.port ? "" : ":" + s.port), s;
}
const pf = typeof ArrayBuffer == "function", gf = (t) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer, ul = Object.prototype.toString, mf = typeof Blob == "function" || typeof Blob < "u" && ul.call(Blob) === "[object BlobConstructor]", _f = typeof File == "function" || typeof File < "u" && ul.call(File) === "[object FileConstructor]";
function jr(t) {
  return pf && (t instanceof ArrayBuffer || gf(t)) || mf && t instanceof Blob || _f && t instanceof File;
}
function ss(t, e) {
  if (!t || typeof t != "object")
    return !1;
  if (Array.isArray(t)) {
    for (let n = 0, s = t.length; n < s; n++)
      if (ss(t[n]))
        return !0;
    return !1;
  }
  if (jr(t))
    return !0;
  if (t.toJSON && typeof t.toJSON == "function" && arguments.length === 1)
    return ss(t.toJSON(), !0);
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n) && ss(t[n]))
      return !0;
  return !1;
}
function yf(t) {
  const e = [], n = t.data, s = t;
  return s.data = ur(n, e), s.attachments = e.length, { packet: s, buffers: e };
}
function ur(t, e) {
  if (!t)
    return t;
  if (jr(t)) {
    const n = { _placeholder: !0, num: e.length };
    return e.push(t), n;
  } else if (Array.isArray(t)) {
    const n = new Array(t.length);
    for (let s = 0; s < t.length; s++)
      n[s] = ur(t[s], e);
    return n;
  } else if (typeof t == "object" && !(t instanceof Date)) {
    const n = {};
    for (const s in t)
      Object.prototype.hasOwnProperty.call(t, s) && (n[s] = ur(t[s], e));
    return n;
  }
  return t;
}
function bf(t, e) {
  return t.data = fr(t.data, e), delete t.attachments, t;
}
function fr(t, e) {
  if (!t)
    return t;
  if (t && t._placeholder === !0) {
    if (typeof t.num == "number" && t.num >= 0 && t.num < e.length)
      return e[t.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(t))
    for (let n = 0; n < t.length; n++)
      t[n] = fr(t[n], e);
  else if (typeof t == "object")
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (t[n] = fr(t[n], e));
  return t;
}
const vf = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], wf = 5;
var ie;
(function(t) {
  t[t.CONNECT = 0] = "CONNECT", t[t.DISCONNECT = 1] = "DISCONNECT", t[t.EVENT = 2] = "EVENT", t[t.ACK = 3] = "ACK", t[t.CONNECT_ERROR = 4] = "CONNECT_ERROR", t[t.BINARY_EVENT = 5] = "BINARY_EVENT", t[t.BINARY_ACK = 6] = "BINARY_ACK";
})(ie || (ie = {}));
class kf {
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
    return (e.type === ie.EVENT || e.type === ie.ACK) && ss(e) ? this.encodeAsBinary({
      type: e.type === ie.EVENT ? ie.BINARY_EVENT : ie.BINARY_ACK,
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
    return (e.type === ie.BINARY_EVENT || e.type === ie.BINARY_ACK) && (n += e.attachments + "-"), e.nsp && e.nsp !== "/" && (n += e.nsp + ","), e.id != null && (n += e.id), e.data != null && (n += JSON.stringify(e.data, this.replacer)), n;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(e) {
    const n = yf(e), s = this.encodeAsString(n.packet), r = n.buffers;
    return r.unshift(s), r;
  }
}
function Ni(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
class zr extends Le {
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
      const s = n.type === ie.BINARY_EVENT;
      s || n.type === ie.BINARY_ACK ? (n.type = s ? ie.EVENT : ie.ACK, this.reconstructor = new xf(n), n.attachments === 0 && super.emitReserved("decoded", n)) : super.emitReserved("decoded", n);
    } else if (jr(e) || e.base64)
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
    if (ie[s.type] === void 0)
      throw new Error("unknown packet type " + s.type);
    if (s.type === ie.BINARY_EVENT || s.type === ie.BINARY_ACK) {
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
      if (zr.isPayloadValid(s.type, i))
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
      case ie.CONNECT:
        return Ni(n);
      case ie.DISCONNECT:
        return n === void 0;
      case ie.CONNECT_ERROR:
        return typeof n == "string" || Ni(n);
      case ie.EVENT:
      case ie.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && vf.indexOf(n[0]) === -1);
      case ie.ACK:
      case ie.BINARY_ACK:
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
class xf {
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
      const n = bf(this.reconPack, this.buffers);
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
const Sf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: zr,
  Encoder: kf,
  get PacketType() {
    return ie;
  },
  protocol: wf
}, Symbol.toStringTag, { value: "Module" }));
function at(t, e, n) {
  return t.on(e, n), function() {
    t.off(e, n);
  };
}
const Cf = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class fl extends Le {
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
      at(e, "open", this.onopen.bind(this)),
      at(e, "packet", this.onpacket.bind(this)),
      at(e, "error", this.onerror.bind(this)),
      at(e, "close", this.onclose.bind(this))
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
    if (Cf.hasOwnProperty(e))
      throw new Error('"' + e.toString() + '" is a reserved event name');
    if (n.unshift(e), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const o = {
      type: ie.EVENT,
      data: n
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
      const c = this.ids++, p = n.pop();
      this._registerAckCallback(c, p), o.id = c;
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
      type: ie.CONNECT,
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
        case ie.CONNECT:
          e.data && e.data.sid ? this.onconnect(e.data.sid, e.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case ie.EVENT:
        case ie.BINARY_EVENT:
          this.onevent(e);
          break;
        case ie.ACK:
        case ie.BINARY_ACK:
          this.onack(e);
          break;
        case ie.DISCONNECT:
          this.ondisconnect();
          break;
        case ie.CONNECT_ERROR:
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
        type: ie.ACK,
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
    return this.connected && this.packet({ type: ie.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
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
function dn(t) {
  t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
}
dn.prototype.duration = function() {
  var t = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var e = Math.random(), n = Math.floor(e * this.jitter * t);
    t = (Math.floor(e * 10) & 1) == 0 ? t - n : t + n;
  }
  return Math.min(t, this.max) | 0;
};
dn.prototype.reset = function() {
  this.attempts = 0;
};
dn.prototype.setMin = function(t) {
  this.ms = t;
};
dn.prototype.setMax = function(t) {
  this.max = t;
};
dn.prototype.setJitter = function(t) {
  this.jitter = t;
};
class hr extends Le {
  constructor(e, n) {
    var s;
    super(), this.nsps = {}, this.subs = [], e && typeof e == "object" && (n = e, e = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, Es(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5), this.backoff = new dn({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = e;
    const r = n.parser || Sf;
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
    this.engine = new hf(this.uri, this.opts);
    const n = this.engine, s = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const r = at(n, "open", function() {
      s.onopen(), e && e();
    }), i = (l) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", l), e ? e(l) : this.maybeReconnectOnOpen();
    }, o = at(n, "error", i);
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
      at(e, "ping", this.onping.bind(this)),
      at(e, "data", this.ondata.bind(this)),
      at(e, "error", this.onerror.bind(this)),
      at(e, "close", this.onclose.bind(this)),
      // @ts-ignore
      at(this.decoder, "decoded", this.ondecoded.bind(this))
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
    As(() => {
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
    return s ? this._autoConnect && !s.active && s.connect() : (s = new fl(this, e, n), this.nsps[e] = s), s;
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
const vn = {};
function rs(t, e) {
  typeof t == "object" && (e = t, t = void 0), e = e || {};
  const n = df(t, e.path || "/socket.io"), s = n.source, r = n.id, i = n.path, o = vn[r] && i in vn[r].nsps, l = e.forceNew || e["force new connection"] || e.multiplex === !1 || o;
  let a;
  return l ? a = new hr(s, e) : (vn[r] || (vn[r] = new hr(s, e)), a = vn[r]), n.query && !e.query && (e.query = n.queryKey), a.socket(n.path, e);
}
Object.assign(rs, {
  Manager: hr,
  Socket: fl,
  io: rs,
  connect: rs
});
function Tf() {
  const t = ue([]), e = ue(!1), n = ue(""), s = ue(!1), r = ue(!1), i = ue(!1), o = ue("connecting"), l = ue(0), a = 5, u = ue({}), c = ue(null);
  let p = null, _ = null, E = null, B = null;
  const q = (M) => {
    const xe = localStorage.getItem("ctid");
    return p = rs(`${ps.WS_URL}/widget`, {
      transports: ["websocket"],
      reconnection: !0,
      reconnectionAttempts: a,
      reconnectionDelay: 1e3,
      auth: xe ? {
        conversation_token: xe
      } : void 0
    }), p.on("connect", () => {
      o.value = "connected", l.value = 0;
    }), p.on("disconnect", () => {
      o.value === "connected" && (o.value = "connecting");
    }), p.on("connect_error", () => {
      l.value++, console.error("Socket connection failed, attempt:", l.value), l.value >= a && (o.value = "failed");
    }), p.on("chat_response", (j) => {
      e.value = !1, j.type === "agent_message" ? t.value.push({
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
      }) : j.shopify_output && typeof j.shopify_output == "object" && j.shopify_output.products ? t.value.push({
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
      }) : t.value.push({
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
    }), p.on("handle_taken_over", (j) => {
      t.value.push({
        message: `${j.user_name} joined the conversation`,
        message_type: "system",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: j.session_id
      }), u.value = {
        ...u.value,
        human_agent_name: j.user_name,
        human_agent_profile_pic: j.profile_picture
      }, _ && _(j);
    }), p.on("error", he), p.on("chat_history", ye), p.on("rating_submitted", ee), p.on("display_form", Ne), p.on("form_submitted", x), p.on("workflow_state", Ae), p.on("workflow_proceeded", Me), p;
  }, oe = async () => {
    try {
      return o.value = "connecting", l.value = 0, p && (p.removeAllListeners(), p.disconnect(), p = null), p = q(""), new Promise((M) => {
        p == null || p.on("connect", () => {
          M(!0);
        }), p == null || p.on("connect_error", () => {
          l.value >= a && M(!1);
        });
      });
    } catch (M) {
      return console.error("Socket initialization failed:", M), o.value = "failed", !1;
    }
  }, G = () => (p && p.disconnect(), oe()), te = (M) => {
    _ = M;
  }, ne = (M) => {
    E = M;
  }, D = (M) => {
    B = M;
  }, he = (M) => {
    e.value = !1, n.value = Gc(M), s.value = !0, setTimeout(() => {
      s.value = !1, n.value = "";
    }, 5e3);
  }, ye = (M) => {
    if (M.type === "chat_history" && Array.isArray(M.messages)) {
      const xe = M.messages.map((j) => {
        var et;
        const ve = {
          message: j.message,
          message_type: j.message_type,
          created_at: j.created_at,
          session_id: "",
          agent_name: j.agent_name || "",
          user_name: j.user_name || "",
          attributes: j.attributes || {}
        };
        return (et = j.attributes) != null && et.shopify_output && typeof j.attributes.shopify_output == "object" ? {
          ...ve,
          message_type: "product",
          shopify_output: j.attributes.shopify_output
        } : ve;
      });
      t.value = [
        ...xe.filter(
          (j) => !t.value.some(
            (ve) => ve.message === j.message && ve.created_at === j.created_at
          )
        ),
        ...t.value
      ];
    }
  }, ee = (M) => {
    M.success && t.value.push({
      message: "Thank you for your feedback!",
      message_type: "system",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: ""
    });
  }, Ne = (M) => {
    var xe;
    console.log("Form display handler in composable:", M), e.value = !1, c.value = M.form_data, console.log("Set currentForm in handleDisplayForm:", c.value), ((xe = M.form_data) == null ? void 0 : xe.form_full_screen) === !0 ? (console.log("Full screen form detected, triggering workflow state callback"), E && E({
      type: "form",
      form_data: M.form_data,
      session_id: M.session_id
    })) : t.value.push({
      message: "",
      message_type: "form",
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      session_id: M.session_id,
      attributes: {
        form_data: M.form_data
      }
    });
  }, x = (M) => {
    console.log("Form submitted confirmation received, clearing currentForm"), c.value = null, M.success && console.log("Form submitted successfully");
  }, Ae = (M) => {
    console.log("Workflow state received in composable:", M), (M.type === "form" || M.type === "display_form") && (console.log("Setting currentForm from workflow state:", M.form_data), c.value = M.form_data), E && E(M);
  }, Me = (M) => {
    console.log("Workflow proceeded in composable:", M), B && B(M);
  };
  return {
    messages: t,
    loading: e,
    errorMessage: n,
    showError: s,
    loadingHistory: r,
    hasStartedChat: i,
    connectionStatus: o,
    sendMessage: async (M, xe) => {
      !p || !M.trim() || (u.value.human_agent_name || (e.value = !0), t.value.push({
        message: M,
        message_type: "user",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: ""
      }), p.emit("chat", {
        message: M,
        email: xe
      }), i.value = !0);
    },
    loadChatHistory: async () => {
      if (p)
        try {
          r.value = !0, p.emit("get_chat_history");
        } catch (M) {
          console.error("Failed to load chat history:", M);
        } finally {
          r.value = !1;
        }
    },
    connect: oe,
    reconnect: G,
    cleanup: () => {
      p && (p.removeAllListeners(), p.disconnect(), p = null), _ = null, E = null, B = null;
    },
    humanAgent: u,
    onTakeover: te,
    submitRating: async (M, xe) => {
      !p || !M || p.emit("submit_rating", {
        rating: M,
        feedback: xe
      });
    },
    currentForm: c,
    submitForm: async (M) => {
      if (console.log("Submitting form in socket:", M), console.log("Current form in socket:", c.value), console.log("Socket in socket:", p), !p) {
        console.error("No socket available for form submission");
        return;
      }
      if (!M || Object.keys(M).length === 0) {
        console.error("No form data to submit");
        return;
      }
      console.log("Emitting submit_form event with data:", M), p.emit("submit_form", {
        form_data: M
      }), c.value = null;
    },
    getWorkflowState: async () => {
      p && (console.log("Getting workflow state 12"), p.emit("get_workflow_state"));
    },
    proceedWorkflow: async () => {
      p && p.emit("proceed_workflow", {});
    },
    onWorkflowState: ne,
    onWorkflowProceeded: D
  };
}
function Af(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var zs = { exports: {} }, Di;
function Ef() {
  return Di || (Di = 1, function(t) {
    (function() {
      function e(f, d, w) {
        return f.call.apply(f.bind, arguments);
      }
      function n(f, d, w) {
        if (!f) throw Error();
        if (2 < arguments.length) {
          var y = Array.prototype.slice.call(arguments, 2);
          return function() {
            var A = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(A, y), f.apply(d, A);
          };
        }
        return function() {
          return f.apply(d, arguments);
        };
      }
      function s(f, d, w) {
        return s = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? e : n, s.apply(null, arguments);
      }
      var r = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function i(f, d) {
        this.a = f, this.o = d || f, this.c = this.o.document;
      }
      var o = !!window.FontFace;
      function l(f, d, w, y) {
        if (d = f.c.createElement(d), w) for (var A in w) w.hasOwnProperty(A) && (A == "style" ? d.style.cssText = w[A] : d.setAttribute(A, w[A]));
        return y && d.appendChild(f.c.createTextNode(y)), d;
      }
      function a(f, d, w) {
        f = f.c.getElementsByTagName(d)[0], f || (f = document.documentElement), f.insertBefore(w, f.lastChild);
      }
      function u(f) {
        f.parentNode && f.parentNode.removeChild(f);
      }
      function c(f, d, w) {
        d = d || [], w = w || [];
        for (var y = f.className.split(/\s+/), A = 0; A < d.length; A += 1) {
          for (var U = !1, z = 0; z < y.length; z += 1) if (d[A] === y[z]) {
            U = !0;
            break;
          }
          U || y.push(d[A]);
        }
        for (d = [], A = 0; A < y.length; A += 1) {
          for (U = !1, z = 0; z < w.length; z += 1) if (y[A] === w[z]) {
            U = !0;
            break;
          }
          U || d.push(y[A]);
        }
        f.className = d.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function p(f, d) {
        for (var w = f.className.split(/\s+/), y = 0, A = w.length; y < A; y++) if (w[y] == d) return !0;
        return !1;
      }
      function _(f) {
        return f.o.location.hostname || f.a.location.hostname;
      }
      function E(f, d, w) {
        function y() {
          ae && A && U && (ae(z), ae = null);
        }
        d = l(f, "link", { rel: "stylesheet", href: d, media: "all" });
        var A = !1, U = !0, z = null, ae = w || null;
        o ? (d.onload = function() {
          A = !0, y();
        }, d.onerror = function() {
          A = !0, z = Error("Stylesheet failed to load"), y();
        }) : setTimeout(function() {
          A = !0, y();
        }, 0), a(f, "head", d);
      }
      function B(f, d, w, y) {
        var A = f.c.getElementsByTagName("head")[0];
        if (A) {
          var U = l(f, "script", { src: d }), z = !1;
          return U.onload = U.onreadystatechange = function() {
            z || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (z = !0, w && w(null), U.onload = U.onreadystatechange = null, U.parentNode.tagName == "HEAD" && A.removeChild(U));
          }, A.appendChild(U), setTimeout(function() {
            z || (z = !0, w && w(Error("Script load timeout")));
          }, y || 5e3), U;
        }
        return null;
      }
      function q() {
        this.a = 0, this.c = null;
      }
      function oe(f) {
        return f.a++, function() {
          f.a--, te(f);
        };
      }
      function G(f, d) {
        f.c = d, te(f);
      }
      function te(f) {
        f.a == 0 && f.c && (f.c(), f.c = null);
      }
      function ne(f) {
        this.a = f || "-";
      }
      ne.prototype.c = function(f) {
        for (var d = [], w = 0; w < arguments.length; w++) d.push(arguments[w].replace(/[\W_]+/g, "").toLowerCase());
        return d.join(this.a);
      };
      function D(f, d) {
        this.c = f, this.f = 4, this.a = "n";
        var w = (d || "n4").match(/^([nio])([1-9])$/i);
        w && (this.a = w[1], this.f = parseInt(w[2], 10));
      }
      function he(f) {
        return Ne(f) + " " + (f.f + "00") + " 300px " + ye(f.c);
      }
      function ye(f) {
        var d = [];
        f = f.split(/,\s*/);
        for (var w = 0; w < f.length; w++) {
          var y = f[w].replace(/['"]/g, "");
          y.indexOf(" ") != -1 || /^\d/.test(y) ? d.push("'" + y + "'") : d.push(y);
        }
        return d.join(",");
      }
      function ee(f) {
        return f.a + f.f;
      }
      function Ne(f) {
        var d = "normal";
        return f.a === "o" ? d = "oblique" : f.a === "i" && (d = "italic"), d;
      }
      function x(f) {
        var d = 4, w = "n", y = null;
        return f && ((y = f.match(/(normal|oblique|italic)/i)) && y[1] && (w = y[1].substr(0, 1).toLowerCase()), (y = f.match(/([1-9]00|normal|bold)/i)) && y[1] && (/bold/i.test(y[1]) ? d = 7 : /[1-9]00/.test(y[1]) && (d = parseInt(y[1].substr(0, 1), 10)))), w + d;
      }
      function Ae(f, d) {
        this.c = f, this.f = f.o.document.documentElement, this.h = d, this.a = new ne("-"), this.j = d.events !== !1, this.g = d.classes !== !1;
      }
      function Me(f) {
        f.g && c(f.f, [f.a.c("wf", "loading")]), je(f, "loading");
      }
      function re(f) {
        if (f.g) {
          var d = p(f.f, f.a.c("wf", "active")), w = [], y = [f.a.c("wf", "loading")];
          d || w.push(f.a.c("wf", "inactive")), c(f.f, w, y);
        }
        je(f, "inactive");
      }
      function je(f, d, w) {
        f.j && f.h[d] && (w ? f.h[d](w.c, ee(w)) : f.h[d]());
      }
      function xt() {
        this.c = {};
      }
      function ut(f, d, w) {
        var y = [], A;
        for (A in d) if (d.hasOwnProperty(A)) {
          var U = f.c[A];
          U && y.push(U(d[A], w));
        }
        return y;
      }
      function Oe(f, d) {
        this.c = f, this.f = d, this.a = l(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function Q(f) {
        a(f.c, "body", f.a);
      }
      function J(f) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + ye(f.c) + ";" + ("font-style:" + Ne(f) + ";font-weight:" + (f.f + "00") + ";");
      }
      function M(f, d, w, y, A, U) {
        this.g = f, this.j = d, this.a = y, this.c = w, this.f = A || 3e3, this.h = U || void 0;
      }
      M.prototype.start = function() {
        var f = this.c.o.document, d = this, w = r(), y = new Promise(function(z, ae) {
          function de() {
            r() - w >= d.f ? ae() : f.fonts.load(he(d.a), d.h).then(function(Ee) {
              1 <= Ee.length ? z() : setTimeout(de, 25);
            }, function() {
              ae();
            });
          }
          de();
        }), A = null, U = new Promise(function(z, ae) {
          A = setTimeout(ae, d.f);
        });
        Promise.race([U, y]).then(function() {
          A && (clearTimeout(A), A = null), d.g(d.a);
        }, function() {
          d.j(d.a);
        });
      };
      function xe(f, d, w, y, A, U, z) {
        this.v = f, this.B = d, this.c = w, this.a = y, this.s = z || "BESbswy", this.f = {}, this.w = A || 3e3, this.u = U || null, this.m = this.j = this.h = this.g = null, this.g = new Oe(this.c, this.s), this.h = new Oe(this.c, this.s), this.j = new Oe(this.c, this.s), this.m = new Oe(this.c, this.s), f = new D(this.a.c + ",serif", ee(this.a)), f = J(f), this.g.a.style.cssText = f, f = new D(this.a.c + ",sans-serif", ee(this.a)), f = J(f), this.h.a.style.cssText = f, f = new D("serif", ee(this.a)), f = J(f), this.j.a.style.cssText = f, f = new D("sans-serif", ee(this.a)), f = J(f), this.m.a.style.cssText = f, Q(this.g), Q(this.h), Q(this.j), Q(this.m);
      }
      var j = { D: "serif", C: "sans-serif" }, ve = null;
      function et() {
        if (ve === null) {
          var f = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          ve = !!f && (536 > parseInt(f[1], 10) || parseInt(f[1], 10) === 536 && 11 >= parseInt(f[2], 10));
        }
        return ve;
      }
      xe.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = r(), nn(this);
      };
      function tn(f, d, w) {
        for (var y in j) if (j.hasOwnProperty(y) && d === f.f[j[y]] && w === f.f[j[y]]) return !0;
        return !1;
      }
      function nn(f) {
        var d = f.g.a.offsetWidth, w = f.h.a.offsetWidth, y;
        (y = d === f.f.serif && w === f.f["sans-serif"]) || (y = et() && tn(f, d, w)), y ? r() - f.A >= f.w ? et() && tn(f, d, w) && (f.u === null || f.u.hasOwnProperty(f.a.c)) ? ft(f, f.v) : ft(f, f.B) : St(f) : ft(f, f.v);
      }
      function St(f) {
        setTimeout(s(function() {
          nn(this);
        }, f), 50);
      }
      function ft(f, d) {
        setTimeout(s(function() {
          u(this.g.a), u(this.h.a), u(this.j.a), u(this.m.a), d(this.a);
        }, f), 0);
      }
      function Ct(f, d, w) {
        this.c = f, this.a = d, this.f = 0, this.m = this.j = !1, this.s = w;
      }
      var Tt = null;
      Ct.prototype.g = function(f) {
        var d = this.a;
        d.g && c(d.f, [d.a.c("wf", f.c, ee(f).toString(), "active")], [d.a.c("wf", f.c, ee(f).toString(), "loading"), d.a.c("wf", f.c, ee(f).toString(), "inactive")]), je(d, "fontactive", f), this.m = !0, ht(this);
      }, Ct.prototype.h = function(f) {
        var d = this.a;
        if (d.g) {
          var w = p(d.f, d.a.c("wf", f.c, ee(f).toString(), "active")), y = [], A = [d.a.c("wf", f.c, ee(f).toString(), "loading")];
          w || y.push(d.a.c("wf", f.c, ee(f).toString(), "inactive")), c(d.f, y, A);
        }
        je(d, "fontinactive", f), ht(this);
      };
      function ht(f) {
        --f.f == 0 && f.j && (f.m ? (f = f.a, f.g && c(f.f, [f.a.c("wf", "active")], [f.a.c("wf", "loading"), f.a.c("wf", "inactive")]), je(f, "active")) : re(f.a));
      }
      function pn(f) {
        this.j = f, this.a = new xt(), this.h = 0, this.f = this.g = !0;
      }
      pn.prototype.load = function(f) {
        this.c = new i(this.j, f.context || this.j), this.g = f.events !== !1, this.f = f.classes !== !1, g(this, new Ae(this.c, f), f);
      };
      function h(f, d, w, y, A) {
        var U = --f.h == 0;
        (f.f || f.g) && setTimeout(function() {
          var z = A || null, ae = y || null || {};
          if (w.length === 0 && U) re(d.a);
          else {
            d.f += w.length, U && (d.j = U);
            var de, Ee = [];
            for (de = 0; de < w.length; de++) {
              var Re = w[de], Ue = ae[Re.c], Qe = d.a, Nt = Re;
              if (Qe.g && c(Qe.f, [Qe.a.c("wf", Nt.c, ee(Nt).toString(), "loading")]), je(Qe, "fontloading", Nt), Qe = null, Tt === null) if (window.FontFace) {
                var Nt = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), Rs = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                Tt = Nt ? 42 < parseInt(Nt[1], 10) : !Rs;
              } else Tt = !1;
              Tt ? Qe = new M(s(d.g, d), s(d.h, d), d.c, Re, d.s, Ue) : Qe = new xe(s(d.g, d), s(d.h, d), d.c, Re, d.s, z, Ue), Ee.push(Qe);
            }
            for (de = 0; de < Ee.length; de++) Ee[de].start();
          }
        }, 0);
      }
      function g(f, d, w) {
        var A = [], y = w.timeout;
        Me(d);
        var A = ut(f.a, w, f.c), U = new Ct(f.c, d, y);
        for (f.h = A.length, d = 0, w = A.length; d < w; d++) A[d].load(function(z, ae, de) {
          h(f, U, z, ae, de);
        });
      }
      function b(f, d) {
        this.c = f, this.a = d;
      }
      b.prototype.load = function(f) {
        function d() {
          if (U["__mti_fntLst" + y]) {
            var z = U["__mti_fntLst" + y](), ae = [], de;
            if (z) for (var Ee = 0; Ee < z.length; Ee++) {
              var Re = z[Ee].fontfamily;
              z[Ee].fontStyle != null && z[Ee].fontWeight != null ? (de = z[Ee].fontStyle + z[Ee].fontWeight, ae.push(new D(Re, de))) : ae.push(new D(Re));
            }
            f(ae);
          } else setTimeout(function() {
            d();
          }, 50);
        }
        var w = this, y = w.a.projectId, A = w.a.version;
        if (y) {
          var U = w.c.o;
          B(this.c, (w.a.api || "https://fast.fonts.net/jsapi") + "/" + y + ".js" + (A ? "?v=" + A : ""), function(z) {
            z ? f([]) : (U["__MonotypeConfiguration__" + y] = function() {
              return w.a;
            }, d());
          }).id = "__MonotypeAPIScript__" + y;
        } else f([]);
      };
      function C(f, d) {
        this.c = f, this.a = d;
      }
      C.prototype.load = function(f) {
        var d, w, y = this.a.urls || [], A = this.a.families || [], U = this.a.testStrings || {}, z = new q();
        for (d = 0, w = y.length; d < w; d++) E(this.c, y[d], oe(z));
        var ae = [];
        for (d = 0, w = A.length; d < w; d++) if (y = A[d].split(":"), y[1]) for (var de = y[1].split(","), Ee = 0; Ee < de.length; Ee += 1) ae.push(new D(y[0], de[Ee]));
        else ae.push(new D(y[0]));
        G(z, function() {
          f(ae, U);
        });
      };
      function k(f, d) {
        f ? this.c = f : this.c = S, this.a = [], this.f = [], this.g = d || "";
      }
      var S = "https://fonts.googleapis.com/css";
      function P(f, d) {
        for (var w = d.length, y = 0; y < w; y++) {
          var A = d[y].split(":");
          A.length == 3 && f.f.push(A.pop());
          var U = "";
          A.length == 2 && A[1] != "" && (U = ":"), f.a.push(A.join(U));
        }
      }
      function O(f) {
        if (f.a.length == 0) throw Error("No fonts to load!");
        if (f.c.indexOf("kit=") != -1) return f.c;
        for (var d = f.a.length, w = [], y = 0; y < d; y++) w.push(f.a[y].replace(/ /g, "+"));
        return d = f.c + "?family=" + w.join("%7C"), 0 < f.f.length && (d += "&subset=" + f.f.join(",")), 0 < f.g.length && (d += "&text=" + encodeURIComponent(f.g)), d;
      }
      function R(f) {
        this.f = f, this.a = [], this.c = {};
      }
      var T = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, H = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, L = { i: "i", italic: "i", n: "n", normal: "n" }, V = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function W(f) {
        for (var d = f.f.length, w = 0; w < d; w++) {
          var y = f.f[w].split(":"), A = y[0].replace(/\+/g, " "), U = ["n4"];
          if (2 <= y.length) {
            var z, ae = y[1];
            if (z = [], ae) for (var ae = ae.split(","), de = ae.length, Ee = 0; Ee < de; Ee++) {
              var Re;
              if (Re = ae[Ee], Re.match(/^[\w-]+$/)) {
                var Ue = V.exec(Re.toLowerCase());
                if (Ue == null) Re = "";
                else {
                  if (Re = Ue[2], Re = Re == null || Re == "" ? "n" : L[Re], Ue = Ue[1], Ue == null || Ue == "") Ue = "4";
                  else var Qe = H[Ue], Ue = Qe || (isNaN(Ue) ? "4" : Ue.substr(0, 1));
                  Re = [Re, Ue].join("");
                }
              } else Re = "";
              Re && z.push(Re);
            }
            0 < z.length && (U = z), y.length == 3 && (y = y[2], z = [], y = y ? y.split(",") : z, 0 < y.length && (y = T[y[0]]) && (f.c[A] = y));
          }
          for (f.c[A] || (y = T[A]) && (f.c[A] = y), y = 0; y < U.length; y += 1) f.a.push(new D(A, U[y]));
        }
      }
      function K(f, d) {
        this.c = f, this.a = d;
      }
      var X = { Arimo: !0, Cousine: !0, Tinos: !0 };
      K.prototype.load = function(f) {
        var d = new q(), w = this.c, y = new k(this.a.api, this.a.text), A = this.a.families;
        P(y, A);
        var U = new R(A);
        W(U), E(w, O(y), oe(d)), G(d, function() {
          f(U.a, U.c, X);
        });
      };
      function Z(f, d) {
        this.c = f, this.a = d;
      }
      Z.prototype.load = function(f) {
        var d = this.a.id, w = this.c.o;
        d ? B(this.c, (this.a.api || "https://use.typekit.net") + "/" + d + ".js", function(y) {
          if (y) f([]);
          else if (w.Typekit && w.Typekit.config && w.Typekit.config.fn) {
            y = w.Typekit.config.fn;
            for (var A = [], U = 0; U < y.length; U += 2) for (var z = y[U], ae = y[U + 1], de = 0; de < ae.length; de++) A.push(new D(z, ae[de]));
            try {
              w.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            f(A);
          }
        }, 2e3) : f([]);
      };
      function Te(f, d) {
        this.c = f, this.f = d, this.a = [];
      }
      Te.prototype.load = function(f) {
        var d = this.f.id, w = this.c.o, y = this;
        d ? (w.__webfontfontdeckmodule__ || (w.__webfontfontdeckmodule__ = {}), w.__webfontfontdeckmodule__[d] = function(A, U) {
          for (var z = 0, ae = U.fonts.length; z < ae; ++z) {
            var de = U.fonts[z];
            y.a.push(new D(de.name, x("font-weight:" + de.weight + ";font-style:" + de.style)));
          }
          f(y.a);
        }, B(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + _(this.c) + "/" + d + ".js", function(A) {
          A && f([]);
        })) : f([]);
      };
      var be = new pn(window);
      be.a.c.custom = function(f, d) {
        return new C(d, f);
      }, be.a.c.fontdeck = function(f, d) {
        return new Te(d, f);
      }, be.a.c.monotype = function(f, d) {
        return new b(d, f);
      }, be.a.c.typekit = function(f, d) {
        return new Z(d, f);
      }, be.a.c.google = function(f, d) {
        return new K(d, f);
      };
      var ze = { load: s(be.load, be) };
      t.exports ? t.exports = ze : (window.WebFont = ze, window.WebFontConfig && be.load(window.WebFontConfig));
    })();
  }(zs)), zs.exports;
}
var Rf = Ef();
const If = /* @__PURE__ */ Af(Rf);
function Of() {
  const t = ue({}), e = ue(""), n = (r) => {
    t.value = r, r.photo_url && (t.value.photo_url = r.photo_url), r.font_family && If.load({
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
    customization: t,
    agentName: e,
    applyCustomization: n,
    initializeFromData: () => {
      const r = window.__INITIAL_DATA__;
      r && (n(r.customization || {}), e.value = r.agentName || "");
    }
  };
}
const $n = "ctid", Ff = /* @__PURE__ */ ga({
  __name: "WidgetBuilder",
  props: {
    widgetId: { type: String, required: !0 }
  },
  setup(t, { expose: e }) {
    var Zr;
    e(), fe.setOptions({
      renderer: new fe.Renderer(),
      gfm: !0,
      breaks: !0
    });
    const n = new fe.Renderer(), s = n.link;
    n.link = (m, N, ce) => s.call(n, m, N, ce).replace(/^<a /, '<a target="_blank" rel="nofollow" '), fe.use({ renderer: n });
    const r = t, i = De(() => {
      var m;
      return r.widgetId || ((m = window.__INITIAL_DATA__) == null ? void 0 : m.widgetId);
    }), {
      customization: o,
      agentName: l,
      applyCustomization: a,
      initializeFromData: u
    } = Of(), {
      messages: c,
      loading: p,
      errorMessage: _,
      showError: E,
      loadingHistory: B,
      hasStartedChat: q,
      connectionStatus: oe,
      sendMessage: G,
      loadChatHistory: te,
      connect: ne,
      reconnect: D,
      cleanup: he,
      humanAgent: ye,
      onTakeover: ee,
      submitRating: Ne,
      submitForm: x,
      currentForm: Ae,
      getWorkflowState: Me,
      proceedWorkflow: re,
      onWorkflowState: je,
      onWorkflowProceeded: xt
    } = Tf(), ut = ue(""), Oe = ue(!0), Q = ue(""), J = ue(!1), M = ue(!0), xe = ue(((Zr = window.__INITIAL_DATA__) == null ? void 0 : Zr.initialToken) || localStorage.getItem($n)), j = De(() => !!xe.value);
    u();
    const ve = window.__INITIAL_DATA__;
    ve != null && ve.initialToken && (xe.value = ve.initialToken, window.parent.postMessage({
      type: "TOKEN_UPDATE",
      token: ve.initialToken
    }, "*"), J.value = !0);
    const et = ue(null), {
      chatStyles: tn,
      chatIconStyles: nn,
      agentBubbleStyles: St,
      userBubbleStyles: ft,
      messageNameStyles: Ct,
      headerBorderStyles: Tt,
      photoUrl: ht,
      shadowStyle: pn
    } = Ou(o), h = De(() => c.value.some(
      (m) => m.message_type === "form" && (!m.isSubmitted || m.isSubmitted === !1)
    )), g = De(() => q.value && J.value || gn.value ? oe.value === "connected" && !p.value : jn(Q.value.trim()) && oe.value === "connected" && !p.value), b = async () => {
      ut.value.trim() && (!q.value && Q.value && await k(), await G(ut.value, Q.value), ut.value = "");
    }, C = (m) => {
      m.key === "Enter" && !m.shiftKey && (m.preventDefault(), b());
    }, k = async () => {
      var m, N, ce;
      try {
        if (!i.value)
          return console.error("Widget ID is not available"), !1;
        const pe = new URL(`${ps.API_URL}/widgets/${i.value}`);
        Q.value.trim() && jn(Q.value.trim()) && pe.searchParams.append("email", Q.value.trim());
        const Ve = {
          Accept: "application/json",
          "Content-Type": "application/json"
        };
        xe.value && (Ve.Authorization = `Bearer ${xe.value}`);
        const tt = await fetch(pe, {
          headers: Ve
        });
        if (tt.status === 401)
          return J.value = !1, !1;
        const qe = await tt.json();
        return qe.token && (xe.value = qe.token, localStorage.setItem($n, qe.token), window.parent.postMessage({ type: "TOKEN_UPDATE", token: qe.token }, "*")), J.value = !0, await ne() ? (await S(), (m = qe.agent) != null && m.customization && a(qe.agent.customization), qe.agent && !(qe != null && qe.human_agent) && (l.value = qe.agent.name), qe != null && qe.human_agent && (ye.value = qe.human_agent), ((N = qe.agent) == null ? void 0 : N.workflow) !== void 0 && (window.__INITIAL_DATA__ = window.__INITIAL_DATA__ || {}, window.__INITIAL_DATA__.workflow = qe.agent.workflow), (ce = qe.agent) != null && ce.workflow && (console.log("Getting workflow state after authorization"), await Me()), !0) : (console.error("Failed to connect to chat service"), !1);
      } catch (pe) {
        return console.error("Error checking authorization:", pe), J.value = !1, !1;
      } finally {
        M.value = !1;
      }
    }, S = async () => {
      !q.value && J.value && (q.value = !0, await te());
    }, P = () => {
      et.value && (et.value.scrollTop = et.value.scrollHeight);
    };
    Yn(() => c.value, (m) => {
      if (co(() => {
        P();
      }), m.length > 0) {
        const N = m[m.length - 1];
        U(N);
      }
    }, { deep: !0 });
    const O = async () => {
      await D() && await k();
    }, R = ue(!1), T = ue(0), H = ue(""), L = ue(""), V = ue(0), W = ue(!1), K = ue({}), X = ue(!1), Z = ue({}), Te = ue(!1), be = ue(null), ze = ue("Start Chat"), f = ue(!1), d = ue(null), w = De(() => {
      var N;
      const m = c.value[c.value.length - 1];
      return ((N = m == null ? void 0 : m.attributes) == null ? void 0 : N.request_rating) || !1;
    }), y = De(() => {
      var N;
      if (!((N = window.__INITIAL_DATA__) != null && N.workflow))
        return !1;
      const m = c.value.find((ce) => ce.message_type === "rating");
      return (m == null ? void 0 : m.isSubmitted) === !0;
    }), A = De(() => ye.value.human_agent_profile_pic ? ye.value.human_agent_profile_pic.includes("amazonaws.com") ? ye.value.human_agent_profile_pic : `${ps.API_URL}${ye.value.human_agent_profile_pic}` : ""), U = (m) => {
      var N, ce, pe;
      if ((N = m.attributes) != null && N.end_chat && ((ce = m.attributes) != null && ce.request_rating)) {
        const Ve = m.agent_name || ((pe = ye.value) == null ? void 0 : pe.human_agent_name) || l.value || "our agent";
        c.value.push({
          message: `Rate the chat session that you had with ${Ve}`,
          message_type: "rating",
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: m.session_id,
          agent_name: Ve,
          showFeedback: !1
        }), L.value = m.session_id;
      }
    }, z = (m) => {
      W.value || (V.value = m);
    }, ae = () => {
      if (!W.value) {
        const m = c.value[c.value.length - 1];
        V.value = (m == null ? void 0 : m.selectedRating) || 0;
      }
    }, de = async (m) => {
      if (!W.value) {
        V.value = m;
        const N = c.value[c.value.length - 1];
        N && N.message_type === "rating" && (N.showFeedback = !0, N.selectedRating = m);
      }
    }, Ee = async (m, N, ce = null) => {
      try {
        W.value = !0, await Ne(N, ce);
        const pe = c.value.find((Ve) => Ve.message_type === "rating");
        pe && (pe.isSubmitted = !0, pe.finalRating = N, pe.finalFeedback = ce);
      } catch (pe) {
        console.error("Failed to submit rating:", pe);
      } finally {
        W.value = !1;
      }
    }, Re = (m) => {
      const N = m.shopify_output || {
        id: m.product_id,
        title: m.product_title,
        price: m.product_price,
        image: m.product_image,
        vendor: m.product_vendor
      };
      N && window.parent.postMessage({
        type: "ADD_TO_CART",
        product: N
      }, "*");
    }, Ue = (m) => {
      m && window.parent.postMessage({
        type: "ADD_TO_CART",
        product: m
      }, "*");
    }, Qe = (m) => {
      const N = {};
      for (const ce of m.fields) {
        const pe = K.value[ce.name], Ve = qn(ce, pe);
        Ve && (N[ce.name] = Ve);
      }
      return Z.value = N, Object.keys(N).length === 0;
    }, Nt = async (m) => {
      if (console.log("handleFormSubmit called with config:", m), console.log("Current form data:", K.value), console.log("isSubmittingForm:", X.value), X.value) {
        console.log("Form submission already in progress, returning");
        return;
      }
      console.log("Validating form...");
      const N = Qe(m);
      if (console.log("Form validation result:", N), console.log("Form errors:", Z.value), !N) {
        console.log("Form validation failed, not submitting");
        return;
      }
      try {
        console.log("Starting form submission..."), X.value = !0, await x(K.value), console.log("Form submitted successfully");
        const ce = c.value.findIndex(
          (pe) => pe.message_type === "form" && (!pe.isSubmitted || pe.isSubmitted === !1)
        );
        ce !== -1 && (c.value.splice(ce, 1), console.log("Removed form message from chat")), K.value = {}, Z.value = {}, console.log("Cleared form data and errors");
      } catch (ce) {
        console.error("Failed to submit form:", ce);
      } finally {
        X.value = !1, console.log("Form submission completed");
      }
    }, Rs = (m, N) => {
      var ce, pe;
      if (console.log(`Field change: ${m} = `, N), K.value[m] = N, console.log("Updated formData:", K.value), N && N.toString().trim() !== "") {
        let Ve = null;
        if ((ce = d.value) != null && ce.fields && (Ve = d.value.fields.find((tt) => tt.name === m)), !Ve && ((pe = Ae.value) != null && pe.fields) && (Ve = Ae.value.fields.find((tt) => tt.name === m)), Ve) {
          const tt = qn(Ve, N);
          tt ? (Z.value[m] = tt, console.log(`Validation error for ${m}:`, tt)) : (delete Z.value[m], console.log(`Validation passed for ${m}`));
        }
      } else
        delete Z.value[m], console.log(`Cleared error for ${m}`);
    }, Wr = (m) => {
      const N = m.replace(/\D/g, "");
      return N.length >= 7 && N.length <= 15;
    }, qn = (m, N) => {
      if (m.required && (!N || N.toString().trim() === ""))
        return `${m.label} is required`;
      if (!N || N.toString().trim() === "")
        return null;
      if (m.type === "email" && !jn(N))
        return "Please enter a valid email address";
      if (m.type === "tel" && !Wr(N))
        return "Please enter a valid phone number";
      if ((m.type === "text" || m.type === "textarea") && m.minLength && N.length < m.minLength)
        return `${m.label} must be at least ${m.minLength} characters`;
      if ((m.type === "text" || m.type === "textarea") && m.maxLength && N.length > m.maxLength)
        return `${m.label} must not exceed ${m.maxLength} characters`;
      if (m.type === "number") {
        const ce = parseFloat(N);
        if (isNaN(ce))
          return `${m.label} must be a valid number`;
        if (m.minLength && ce < m.minLength)
          return `${m.label} must be at least ${m.minLength}`;
        if (m.maxLength && ce > m.maxLength)
          return `${m.label} must not exceed ${m.maxLength}`;
      }
      return null;
    }, hl = async () => {
      if (X.value || !d.value) {
        console.log("Already submitting or no form data, returning");
        return;
      }
      try {
        console.log("Starting full screen form submission..."), X.value = !0, Z.value = {};
        let m = !1;
        for (const N of d.value.fields || []) {
          const ce = K.value[N.name], pe = qn(N, ce);
          pe && (Z.value[N.name] = pe, m = !0, console.log(`Validation error for field ${N.name}:`, pe));
        }
        if (console.log("Validation completed. Has errors:", m), console.log("Form errors:", Z.value), m) {
          X.value = !1, console.log("Validation failed, not submitting");
          return;
        }
        console.log("Submitting form data:", K.value), await x(K.value), console.log("Full screen form submitted successfully"), f.value = !1, d.value = null, K.value = {}, console.log("Full screen form hidden and data cleared");
      } catch (m) {
        console.error("Failed to submit full screen form:", m);
      } finally {
        X.value = !1, console.log("Full screen form submission completed");
      }
    }, dl = (m) => {
      m && window.parent.postMessage({
        type: "VIEW_PRODUCT",
        productId: m
      }, "*");
    }, pl = (m) => m ? m.replace(/https?:\/\/[^\s\)]+/g, "[link removed]") : "", gl = async () => {
      try {
        Te.value = !1, be.value = null, await re();
      } catch (m) {
        console.error("Failed to proceed workflow:", m);
      }
    }, ml = async (m) => {
      try {
        if (!m.userInputValue || !m.userInputValue.trim())
          return;
        const N = m.userInputValue.trim();
        m.isSubmitted = !0, m.submittedValue = N, await G(N, Q.value), console.log("User input submitted:", N);
      } catch (N) {
        console.error("Failed to submit user input:", N), m.isSubmitted = !1, m.submittedValue = null;
      }
    }, Is = async () => {
      var m;
      try {
        return await k() ? ((m = window.__INITIAL_DATA__) != null && m.workflow && J.value && (console.log("Getting workflow state on refresh/reload"), await Me()), !0) : (oe.value = "connected", !1);
      } catch (N) {
        return console.error("Failed to initialize widget:", N), !1;
      }
    }, Kr = () => {
      ee(async () => {
        await k();
      }), window.addEventListener("message", (m) => {
        m.data.type === "SCROLL_TO_BOTTOM" && P(), m.data.type === "TOKEN_RECEIVED" && localStorage.setItem($n, m.data.token);
      }), je((m) => {
        var N, ce;
        if (console.log("Workflow state received in component:", m), console.log("Data type:", m.type), console.log("Form data:", m.form_data), ze.value = m.button_text || "Start Chat", m.type === "landing_page")
          console.log("Setting landing page data:", m.landing_page_data), be.value = m.landing_page_data, Te.value = !0, f.value = !1, console.log("Landing page state - show:", Te.value, "data:", be.value);
        else if (m.type === "form" || m.type === "display_form")
          if (console.log("Form full screen flag:", (N = m.form_data) == null ? void 0 : N.form_full_screen), ((ce = m.form_data) == null ? void 0 : ce.form_full_screen) === !0)
            console.log("Setting full screen form data:", m.form_data), d.value = m.form_data, f.value = !0, Te.value = !1, console.log("Full screen form state - show:", f.value);
          else {
            console.log("Regular form mode - adding form message to chat");
            const pe = {
              message: "",
              message_type: "form",
              attributes: {
                form_data: m.form_data
              },
              created_at: (/* @__PURE__ */ new Date()).toISOString(),
              isSubmitted: !1
            };
            c.value.findIndex(
              (tt) => tt.message_type === "form" && !tt.isSubmitted
            ) === -1 && c.value.push(pe), Te.value = !1, f.value = !1;
          }
        else
          console.log("No special workflow state, hiding overlay forms"), Te.value = !1, f.value = !1;
      }), xt((m) => {
        console.log("Workflow proceeded:", m);
      });
    }, $r = async () => {
      try {
        console.log("Starting new conversation - getting workflow state"), await Is(), await Me();
      } catch (m) {
        throw console.error("Failed to start new conversation:", m), m;
      }
    }, _l = async () => {
      y.value = !1, c.value = [], await $r();
    };
    yo(async () => {
      await Is(), Kr();
    }), Ar(() => {
      window.removeEventListener("message", (m) => {
        m.data.type === "SCROLL_TO_BOTTOM" && P();
      }), he();
    });
    const gn = De(() => (console.log("isAskAnythingStyle", o.value.chat_style), o.value.chat_style === "ASK_ANYTHING")), yl = De(() => {
      const m = {
        width: "100%",
        height: "580px",
        borderRadius: "var(--radius-lg)"
      };
      return gn.value ? {
        ...m,
        width: "100%",
        maxWidth: "800px",
        // Increased width for ASK_ANYTHING style
        minWidth: "600px"
        // Ensure minimum width
      } : m;
    }), bl = De(() => (console.log("isAskAnythingStyle.value", gn.value), console.log("messages.value.length", c.value.length), gn.value && c.value.length === 0)), Gr = { renderer: n, linkRenderer: s, props: r, widgetId: i, customization: o, agentName: l, applyCustomization: a, initializeFromData: u, messages: c, loading: p, errorMessage: _, showError: E, loadingHistory: B, hasStartedChat: q, connectionStatus: oe, socketSendMessage: G, loadChatHistory: te, connect: ne, reconnect: D, cleanup: he, humanAgent: ye, onTakeover: ee, socketSubmitRating: Ne, submitForm: x, currentForm: Ae, getWorkflowState: Me, proceedWorkflow: re, onWorkflowState: je, onWorkflowProceeded: xt, newMessage: ut, isExpanded: Oe, emailInput: Q, hasConversationToken: J, isInitializing: M, TOKEN_KEY: $n, token: xe, hasToken: j, initialData: ve, messagesContainer: et, chatStyles: tn, chatIconStyles: nn, agentBubbleStyles: St, userBubbleStyles: ft, messageNameStyles: Ct, headerBorderStyles: Tt, photoUrl: ht, shadowStyle: pn, hasActiveForm: h, isMessageInputEnabled: g, sendMessage: b, handleKeyPress: C, checkAuthorization: k, fetchChatHistory: S, scrollToBottom: P, handleReconnect: O, showRatingDialog: R, currentRating: T, ratingFeedback: H, currentSessionId: L, hoverRating: V, isSubmittingRating: W, formData: K, isSubmittingForm: X, formErrors: Z, showLandingPage: Te, landingPageData: be, workflowButtonText: ze, showFullScreenForm: f, fullScreenFormData: d, ratingEnabled: w, shouldShowNewConversationOption: y, humanAgentPhotoUrl: A, handleEndChat: U, handleStarHover: z, handleStarLeave: ae, handleStarClick: de, handleSubmitRating: Ee, handleAddToCart: Re, handleAddToCartFromCarousel: Ue, validateForm: Qe, handleFormSubmit: Nt, handleFieldChange: Rs, isValidPhoneNumber: Wr, validateFormField: qn, submitFullScreenForm: hl, handleViewDetails: dl, removeUrls: pl, handleLandingPageProceed: gl, handleUserInputSubmit: ml, initializeWidget: Is, setupEventListeners: Kr, startNewConversationWorkflow: $r, handleStartNewConversation: _l, isAskAnythingStyle: gn, containerStyles: yl, shouldShowWelcomeMessage: bl, get isValidEmail() {
      return jn;
    }, get marked() {
      return fe;
    } };
    return Object.defineProperty(Gr, "__isScriptSetup", { enumerable: !1, value: !0 }), Gr;
  }
}), Pf = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, r] of e)
    n[s] = r;
  return n;
}, Lf = {
  key: 0,
  class: "initializing-overlay"
}, Bf = {
  key: 0,
  class: "connecting-message"
}, Nf = {
  key: 1,
  class: "failed-message"
}, Df = { class: "welcome-content" }, Mf = { class: "welcome-header" }, qf = ["src", "alt"], Uf = { class: "welcome-title" }, Vf = { class: "welcome-subtitle" }, Hf = { class: "welcome-input-container" }, jf = {
  key: 0,
  class: "email-input"
}, zf = ["disabled"], Wf = { class: "welcome-message-input" }, Kf = ["placeholder", "disabled"], $f = ["disabled"], Gf = { class: "landing-page-content" }, Zf = { class: "landing-page-header" }, Yf = { class: "landing-page-heading" }, Jf = { class: "landing-page-text" }, Qf = { class: "landing-page-actions" }, Xf = { class: "form-fullscreen-content" }, eh = {
  key: 0,
  class: "form-header"
}, th = {
  key: 0,
  class: "form-title"
}, nh = {
  key: 1,
  class: "form-description"
}, sh = { class: "form-fields" }, rh = ["for"], ih = {
  key: 0,
  class: "required-indicator"
}, oh = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "autocomplete", "inputmode"], lh = ["id", "placeholder", "required", "min", "max", "value", "onInput"], ah = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput"], ch = ["id", "required", "value", "onChange"], uh = ["value"], fh = {
  key: 4,
  class: "checkbox-field"
}, hh = ["id", "required", "checked", "onChange"], dh = { class: "checkbox-label" }, ph = {
  key: 5,
  class: "radio-group"
}, gh = ["name", "value", "required", "checked", "onChange"], mh = { class: "radio-label" }, _h = {
  key: 6,
  class: "field-error"
}, yh = { class: "form-actions" }, bh = ["disabled"], vh = {
  key: 0,
  class: "loading-spinner-inline"
}, wh = { key: 1 }, kh = { class: "header-content" }, xh = ["src", "alt"], Sh = { class: "header-info" }, Ch = { class: "status" }, Th = {
  key: 1,
  class: "loading-history"
}, Ah = {
  class: "chat-messages",
  ref: "messagesContainer"
}, Eh = {
  key: 0,
  class: "rating-content"
}, Rh = { class: "rating-prompt" }, Ih = ["onMouseover", "onMouseleave", "onClick", "disabled"], Oh = {
  key: 0,
  class: "feedback-wrapper"
}, Fh = { class: "feedback-section" }, Ph = ["onUpdate:modelValue", "disabled"], Lh = { class: "feedback-counter" }, Bh = ["onClick", "disabled"], Nh = {
  key: 1,
  class: "submitted-feedback-wrapper"
}, Dh = { class: "submitted-feedback" }, Mh = { class: "submitted-feedback-text" }, qh = {
  key: 2,
  class: "submitted-message"
}, Uh = {
  key: 1,
  class: "form-content"
}, Vh = {
  key: 0,
  class: "form-header"
}, Hh = {
  key: 0,
  class: "form-title"
}, jh = {
  key: 1,
  class: "form-description"
}, zh = { class: "form-fields" }, Wh = ["for"], Kh = {
  key: 0,
  class: "required-indicator"
}, $h = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "disabled", "autocomplete", "inputmode"], Gh = ["id", "placeholder", "required", "min", "max", "value", "onInput", "disabled"], Zh = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "disabled"], Yh = ["id", "required", "value", "onChange", "disabled"], Jh = ["value"], Qh = {
  key: 4,
  class: "checkbox-field"
}, Xh = ["id", "checked", "onChange", "disabled"], ed = ["for"], td = {
  key: 5,
  class: "radio-field"
}, nd = ["id", "name", "value", "checked", "onChange", "disabled"], sd = ["for"], rd = {
  key: 6,
  class: "field-error"
}, id = { class: "form-actions" }, od = ["onClick", "disabled"], ld = {
  key: 2,
  class: "user-input-content"
}, ad = {
  key: 0,
  class: "user-input-prompt"
}, cd = {
  key: 1,
  class: "user-input-form"
}, ud = ["onUpdate:modelValue", "onKeydown"], fd = ["onClick", "disabled"], hd = {
  key: 2,
  class: "user-input-submitted"
}, dd = {
  key: 0,
  class: "user-input-confirmation"
}, pd = {
  key: 3,
  class: "product-message-container"
}, gd = ["innerHTML"], md = {
  key: 1,
  class: "products-carousel"
}, _d = { class: "carousel-items" }, yd = {
  key: 0,
  class: "product-image-compact"
}, bd = ["src", "alt"], vd = { class: "product-info-compact" }, wd = { class: "product-text-area" }, kd = { class: "product-title-compact" }, xd = {
  key: 0,
  class: "product-variant-compact"
}, Sd = { class: "product-price-compact" }, Cd = { class: "product-actions-compact" }, Td = ["onClick"], Ad = {
  key: 2,
  class: "no-products-message"
}, Ed = {
  key: 3,
  class: "no-products-message"
}, Rd = ["innerHTML"], Id = { class: "message-info" }, Od = {
  key: 0,
  class: "agent-name"
}, Fd = {
  key: 0,
  class: "typing-indicator"
}, Pd = {
  key: 0,
  class: "email-input"
}, Ld = ["disabled"], Bd = { class: "message-input" }, Nd = ["placeholder", "disabled"], Dd = ["disabled"], Md = { class: "conversation-ended-message" }, qd = {
  key: 7,
  class: "rating-dialog"
}, Ud = { class: "rating-content" }, Vd = { class: "star-rating" }, Hd = ["onClick"], jd = { class: "rating-actions" }, zd = ["disabled"];
function Wd(t, e, n, s, r, i) {
  return I(), F("div", {
    class: Ie(["chat-container", { collapsed: !s.isExpanded, "ask-anything-style": s.isAskAnythingStyle }]),
    style: Se({ ...s.shadowStyle, ...s.containerStyles })
  }, [
    s.isInitializing ? (I(), F("div", Lf, e[8] || (e[8] = [
      lc('<div class="loading-spinner" data-v-a3601fa3><div class="dot" data-v-a3601fa3></div><div class="dot" data-v-a3601fa3></div><div class="dot" data-v-a3601fa3></div></div><div class="loading-text" data-v-a3601fa3>Initializing chat...</div>', 2)
    ]))) : se("", !0),
    !s.isInitializing && s.connectionStatus !== "connected" ? (I(), F("div", {
      key: 1,
      class: Ie(["connection-status", s.connectionStatus])
    }, [
      s.connectionStatus === "connecting" ? (I(), F("div", Bf, e[9] || (e[9] = [
        lt(" Connecting to chat service... ", -1),
        v("div", { class: "loading-dots" }, [
          v("div", { class: "dot" }),
          v("div", { class: "dot" }),
          v("div", { class: "dot" })
        ], -1)
      ]))) : s.connectionStatus === "failed" ? (I(), F("div", Nf, [
        e[10] || (e[10] = lt(" Connection failed. ", -1)),
        v("button", {
          onClick: s.handleReconnect,
          class: "reconnect-button"
        }, " Click here to reconnect ")
      ])) : se("", !0)
    ], 2)) : se("", !0),
    s.showError ? (I(), F("div", {
      key: 2,
      class: "error-alert",
      style: Se(s.chatIconStyles)
    }, le(s.errorMessage), 5)) : se("", !0),
    s.shouldShowWelcomeMessage ? (I(), F("div", {
      key: 3,
      class: "welcome-message-section",
      style: Se(s.chatStyles)
    }, [
      v("div", Df, [
        v("div", Mf, [
          s.photoUrl ? (I(), F("img", {
            key: 0,
            src: s.photoUrl,
            alt: s.agentName,
            class: "welcome-avatar"
          }, null, 8, qf)) : se("", !0),
          v("h1", Uf, le(s.customization.welcome_title || `Welcome to ${s.agentName}`), 1),
          v("p", Vf, le(s.customization.welcome_subtitle || "I'm here to help you with anything you need. What can I assist you with today?"), 1)
        ])
      ]),
      v("div", Hf, [
        !s.hasStartedChat && !s.hasConversationToken && !s.isAskAnythingStyle ? (I(), F("div", jf, [
          $t(v("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (o) => s.emailInput = o),
            type: "email",
            placeholder: "Enter your email address",
            disabled: s.loading || s.connectionStatus !== "connected",
            class: Ie([{
              invalid: s.emailInput.trim() && !s.isValidEmail(s.emailInput.trim()),
              disabled: s.connectionStatus !== "connected"
            }, "welcome-email-input"])
          }, null, 10, zf), [
            [Yt, s.emailInput]
          ])
        ])) : se("", !0),
        v("div", Wf, [
          $t(v("input", {
            "onUpdate:modelValue": e[1] || (e[1] = (o) => s.newMessage = o),
            type: "text",
            placeholder: s.connectionStatus === "connected" ? "Ask me anything..." : "Connecting...",
            onKeypress: s.handleKeyPress,
            disabled: !s.isMessageInputEnabled,
            class: Ie([{ disabled: s.connectionStatus !== "connected" }, "welcome-message-field"])
          }, null, 42, Kf), [
            [Yt, s.newMessage]
          ]),
          v("button", {
            class: "welcome-send-button",
            style: Se(s.userBubbleStyles),
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
          ]), 12, $f)
        ])
      ]),
      v("div", {
        class: "powered-by-welcome",
        style: Se(s.messageNameStyles)
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
        lt(" Powered by ChatterMate ", -1)
      ]), 4)
    ], 4)) : se("", !0),
    s.showLandingPage && s.landingPageData ? (I(), F("div", {
      key: 4,
      class: "landing-page-fullscreen",
      style: Se(s.chatStyles)
    }, [
      v("div", Gf, [
        v("div", Zf, [
          v("h2", Yf, le(s.landingPageData.heading), 1),
          v("div", Jf, le(s.landingPageData.content), 1)
        ]),
        v("div", Qf, [
          v("button", {
            class: "landing-page-button",
            onClick: s.handleLandingPageProceed
          }, le(s.workflowButtonText), 1)
        ])
      ]),
      v("div", {
        class: "powered-by-landing",
        style: Se(s.messageNameStyles)
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
        lt(" Powered by ChatterMate ", -1)
      ]), 4)
    ], 4)) : s.showFullScreenForm && s.fullScreenFormData ? (I(), F("div", {
      key: 5,
      class: "form-fullscreen",
      style: Se(s.chatStyles)
    }, [
      v("div", Xf, [
        s.fullScreenFormData.title || s.fullScreenFormData.description ? (I(), F("div", eh, [
          s.fullScreenFormData.title ? (I(), F("h2", th, le(s.fullScreenFormData.title), 1)) : se("", !0),
          s.fullScreenFormData.description ? (I(), F("p", nh, le(s.fullScreenFormData.description), 1)) : se("", !0)
        ])) : se("", !0),
        v("div", sh, [
          (I(!0), F(Pe, null, dt(s.fullScreenFormData.fields, (o) => {
            var l, a;
            return I(), F("div", {
              key: o.name,
              class: "form-field"
            }, [
              v("label", {
                for: `fullscreen-form-${o.name}`,
                class: "field-label"
              }, [
                lt(le(o.label) + " ", 1),
                o.required ? (I(), F("span", ih, "*")) : se("", !0)
              ], 8, rh),
              o.type === "text" || o.type === "email" || o.type === "tel" ? (I(), F("input", {
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
                class: Ie(["form-input", { error: s.formErrors[o.name] }]),
                autocomplete: o.type === "email" ? "email" : o.type === "tel" ? "tel" : "off",
                inputmode: o.type === "tel" ? "tel" : o.type === "email" ? "email" : "text"
              }, null, 42, oh)) : o.type === "number" ? (I(), F("input", {
                key: 1,
                id: `fullscreen-form-${o.name}`,
                type: "number",
                placeholder: o.placeholder || "",
                required: o.required,
                min: o.minLength,
                max: o.maxLength,
                value: s.formData[o.name] || "",
                onInput: (u) => s.handleFieldChange(o.name, u.target.value),
                class: Ie(["form-input", { error: s.formErrors[o.name] }])
              }, null, 42, lh)) : o.type === "textarea" ? (I(), F("textarea", {
                key: 2,
                id: `fullscreen-form-${o.name}`,
                placeholder: o.placeholder || "",
                required: o.required,
                minlength: o.minLength,
                maxlength: o.maxLength,
                value: s.formData[o.name] || "",
                onInput: (u) => s.handleFieldChange(o.name, u.target.value),
                class: Ie(["form-textarea", { error: s.formErrors[o.name] }]),
                rows: "4"
              }, null, 42, ah)) : o.type === "select" ? (I(), F("select", {
                key: 3,
                id: `fullscreen-form-${o.name}`,
                required: o.required,
                value: s.formData[o.name] || "",
                onChange: (u) => s.handleFieldChange(o.name, u.target.value),
                class: Ie(["form-select", { error: s.formErrors[o.name] }])
              }, [
                e[14] || (e[14] = v("option", { value: "" }, "Please select...", -1)),
                (I(!0), F(Pe, null, dt((l = o.options) == null ? void 0 : l.split(`
`).filter((u) => u.trim()), (u) => (I(), F("option", {
                  key: u,
                  value: u.trim()
                }, le(u.trim()), 9, uh))), 128))
              ], 42, ch)) : o.type === "checkbox" ? (I(), F("label", fh, [
                v("input", {
                  id: `fullscreen-form-${o.name}`,
                  type: "checkbox",
                  required: o.required,
                  checked: s.formData[o.name] || !1,
                  onChange: (u) => s.handleFieldChange(o.name, u.target.checked),
                  class: "form-checkbox"
                }, null, 40, hh),
                v("span", dh, le(o.label), 1)
              ])) : o.type === "radio" ? (I(), F("div", ph, [
                (I(!0), F(Pe, null, dt((a = o.options) == null ? void 0 : a.split(`
`).filter((u) => u.trim()), (u) => (I(), F("label", {
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
                  }, null, 40, gh),
                  v("span", mh, le(u.trim()), 1)
                ]))), 128))
              ])) : se("", !0),
              s.formErrors[o.name] ? (I(), F("div", _h, le(s.formErrors[o.name]), 1)) : se("", !0)
            ]);
          }), 128))
        ]),
        v("div", yh, [
          v("button", {
            onClick: e[2] || (e[2] = () => {
              console.log("Submit button clicked!"), s.submitFullScreenForm();
            }),
            disabled: s.isSubmittingForm,
            class: "submit-form-button",
            style: Se(s.userBubbleStyles)
          }, [
            s.isSubmittingForm ? (I(), F("span", vh, e[15] || (e[15] = [
              v("div", { class: "dot" }, null, -1),
              v("div", { class: "dot" }, null, -1),
              v("div", { class: "dot" }, null, -1)
            ]))) : (I(), F("span", wh, le(s.fullScreenFormData.submit_button_text || "Submit"), 1))
          ], 12, bh)
        ])
      ]),
      v("div", {
        class: "powered-by-landing",
        style: Se(s.messageNameStyles)
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
        lt(" Powered by ChatterMate ", -1)
      ]), 4)
    ], 4)) : s.shouldShowWelcomeMessage ? se("", !0) : (I(), F(Pe, { key: 6 }, [
      s.isExpanded ? (I(), F("div", {
        key: 0,
        class: Ie(["chat-panel", { "ask-anything-chat": s.isAskAnythingStyle }]),
        style: Se(s.chatStyles)
      }, [
        s.isAskAnythingStyle ? se("", !0) : (I(), F("div", {
          key: 0,
          class: "chat-header",
          style: Se(s.headerBorderStyles)
        }, [
          v("div", kh, [
            s.humanAgentPhotoUrl || s.photoUrl ? (I(), F("img", {
              key: 0,
              src: s.humanAgentPhotoUrl || s.photoUrl,
              alt: s.humanAgent.human_agent_name || s.agentName,
              class: "header-avatar"
            }, null, 8, xh)) : se("", !0),
            v("div", Sh, [
              v("h3", {
                style: Se(s.messageNameStyles)
              }, le(s.humanAgent.human_agent_name || s.agentName), 5),
              v("div", Ch, [
                e[17] || (e[17] = v("span", { class: "status-indicator online" }, null, -1)),
                v("span", {
                  class: "status-text",
                  style: Se(s.messageNameStyles)
                }, "Online", 4)
              ])
            ])
          ])
        ], 4)),
        s.loadingHistory ? (I(), F("div", Th, e[18] || (e[18] = [
          v("div", { class: "loading-spinner" }, [
            v("div", { class: "dot" }),
            v("div", { class: "dot" }),
            v("div", { class: "dot" })
          ], -1)
        ]))) : se("", !0),
        v("div", Ah, [
          (I(!0), F(Pe, null, dt(s.messages, (o, l) => {
            var a, u, c, p, _, E, B, q, oe, G, te, ne, D, he, ye, ee, Ne;
            return I(), F("div", {
              key: l,
              class: Ie([
                "message",
                o.message_type === "bot" || o.message_type === "agent" ? "agent-message" : o.message_type === "system" ? "system-message" : o.message_type === "rating" ? "rating-message" : o.message_type === "form" ? "form-message" : o.message_type === "product" || o.shopify_output ? "product-message" : "user-message"
              ])
            }, [
              v("div", {
                class: "message-bubble",
                style: Se(o.message_type === "system" || o.message_type === "rating" || o.message_type === "product" || o.shopify_output ? {} : o.message_type === "user" ? s.userBubbleStyles : s.agentBubbleStyles)
              }, [
                o.message_type === "rating" ? (I(), F("div", Eh, [
                  v("p", Rh, "Rate the chat session that you had with " + le(o.agent_name || s.humanAgent.human_agent_name || s.agentName || "our agent"), 1),
                  v("div", {
                    class: Ie(["star-rating", { submitted: s.isSubmittingRating || o.isSubmitted }])
                  }, [
                    (I(), F(Pe, null, dt(5, (x) => v("button", {
                      key: x,
                      class: Ie(["star-button", {
                        warning: x <= (o.isSubmitted ? o.finalRating : s.hoverRating || o.selectedRating) && (o.isSubmitted ? o.finalRating : s.hoverRating || o.selectedRating) <= 3,
                        success: x <= (o.isSubmitted ? o.finalRating : s.hoverRating || o.selectedRating) && (o.isSubmitted ? o.finalRating : s.hoverRating || o.selectedRating) > 3,
                        selected: x <= (o.isSubmitted ? o.finalRating : s.hoverRating || o.selectedRating)
                      }]),
                      onMouseover: (Ae) => !o.isSubmitted && s.handleStarHover(x),
                      onMouseleave: (Ae) => !o.isSubmitted && s.handleStarLeave,
                      onClick: (Ae) => !o.isSubmitted && s.handleStarClick(x),
                      disabled: s.isSubmittingRating || o.isSubmitted
                    }, " ★ ", 42, Ih)), 64))
                  ], 2),
                  o.showFeedback && !o.isSubmitted ? (I(), F("div", Oh, [
                    v("div", Fh, [
                      $t(v("input", {
                        "onUpdate:modelValue": (x) => o.feedback = x,
                        placeholder: "Please share your feedback (optional)",
                        disabled: s.isSubmittingRating,
                        maxlength: "500",
                        class: "feedback-input"
                      }, null, 8, Ph), [
                        [Yt, o.feedback]
                      ]),
                      v("div", Lh, le(((a = o.feedback) == null ? void 0 : a.length) || 0) + "/500", 1)
                    ]),
                    v("button", {
                      onClick: (x) => s.handleSubmitRating(o.session_id, s.hoverRating, o.feedback),
                      disabled: s.isSubmittingRating || !s.hoverRating,
                      class: "submit-rating-button",
                      style: Se({ backgroundColor: s.customization.accent_color || "var(--primary-color)" })
                    }, le(s.isSubmittingRating ? "Submitting..." : "Submit Rating"), 13, Bh)
                  ])) : se("", !0),
                  o.isSubmitted && o.finalFeedback ? (I(), F("div", Nh, [
                    v("div", Dh, [
                      v("p", Mh, le(o.finalFeedback), 1)
                    ])
                  ])) : o.isSubmitted ? (I(), F("div", qh, " Thank you for your rating! ")) : se("", !0)
                ])) : o.message_type === "form" ? (I(), F("div", Uh, [
                  (c = (u = o.attributes) == null ? void 0 : u.form_data) != null && c.title || (_ = (p = o.attributes) == null ? void 0 : p.form_data) != null && _.description ? (I(), F("div", Vh, [
                    (B = (E = o.attributes) == null ? void 0 : E.form_data) != null && B.title ? (I(), F("h3", Hh, le(o.attributes.form_data.title), 1)) : se("", !0),
                    (oe = (q = o.attributes) == null ? void 0 : q.form_data) != null && oe.description ? (I(), F("p", jh, le(o.attributes.form_data.description), 1)) : se("", !0)
                  ])) : se("", !0),
                  v("div", zh, [
                    (I(!0), F(Pe, null, dt((te = (G = o.attributes) == null ? void 0 : G.form_data) == null ? void 0 : te.fields, (x) => {
                      var Ae, Me;
                      return I(), F("div", {
                        key: x.name,
                        class: "form-field"
                      }, [
                        v("label", {
                          for: `form-${x.name}`,
                          class: "field-label"
                        }, [
                          lt(le(x.label) + " ", 1),
                          x.required ? (I(), F("span", Kh, "*")) : se("", !0)
                        ], 8, Wh),
                        x.type === "text" || x.type === "email" || x.type === "tel" ? (I(), F("input", {
                          key: 0,
                          id: `form-${x.name}`,
                          type: x.type,
                          placeholder: x.placeholder || "",
                          required: x.required,
                          minlength: x.minLength,
                          maxlength: x.maxLength,
                          value: s.formData[x.name] || "",
                          onInput: (re) => s.handleFieldChange(x.name, re.target.value),
                          onBlur: (re) => s.handleFieldChange(x.name, re.target.value),
                          class: Ie(["form-input", { error: s.formErrors[x.name] }]),
                          disabled: s.isSubmittingForm,
                          autocomplete: x.type === "email" ? "email" : x.type === "tel" ? "tel" : "off",
                          inputmode: x.type === "tel" ? "tel" : x.type === "email" ? "email" : "text"
                        }, null, 42, $h)) : x.type === "number" ? (I(), F("input", {
                          key: 1,
                          id: `form-${x.name}`,
                          type: "number",
                          placeholder: x.placeholder || "",
                          required: x.required,
                          min: x.min,
                          max: x.max,
                          value: s.formData[x.name] || "",
                          onInput: (re) => s.handleFieldChange(x.name, re.target.value),
                          class: Ie(["form-input", { error: s.formErrors[x.name] }]),
                          disabled: s.isSubmittingForm
                        }, null, 42, Gh)) : x.type === "textarea" ? (I(), F("textarea", {
                          key: 2,
                          id: `form-${x.name}`,
                          placeholder: x.placeholder || "",
                          required: x.required,
                          minlength: x.minLength,
                          maxlength: x.maxLength,
                          value: s.formData[x.name] || "",
                          onInput: (re) => s.handleFieldChange(x.name, re.target.value),
                          class: Ie(["form-textarea", { error: s.formErrors[x.name] }]),
                          disabled: s.isSubmittingForm,
                          rows: "3"
                        }, null, 42, Zh)) : x.type === "select" ? (I(), F("select", {
                          key: 3,
                          id: `form-${x.name}`,
                          required: x.required,
                          value: s.formData[x.name] || "",
                          onChange: (re) => s.handleFieldChange(x.name, re.target.value),
                          class: Ie(["form-select", { error: s.formErrors[x.name] }]),
                          disabled: s.isSubmittingForm
                        }, [
                          e[19] || (e[19] = v("option", { value: "" }, "Select an option", -1)),
                          (I(!0), F(Pe, null, dt(((Ae = x.options) == null ? void 0 : Ae.split(",")) || [], (re) => (I(), F("option", {
                            key: re.trim(),
                            value: re.trim()
                          }, le(re.trim()), 9, Jh))), 128))
                        ], 42, Yh)) : x.type === "checkbox" ? (I(), F("div", Qh, [
                          v("input", {
                            id: `form-${x.name}`,
                            type: "checkbox",
                            checked: s.formData[x.name] || !1,
                            onChange: (re) => s.handleFieldChange(x.name, re.target.checked),
                            class: "form-checkbox",
                            disabled: s.isSubmittingForm
                          }, null, 40, Xh),
                          v("label", {
                            for: `form-${x.name}`,
                            class: "checkbox-label"
                          }, le(x.placeholder || x.label), 9, ed)
                        ])) : x.type === "radio" ? (I(), F("div", td, [
                          (I(!0), F(Pe, null, dt(((Me = x.options) == null ? void 0 : Me.split(",")) || [], (re) => (I(), F("div", {
                            key: re.trim(),
                            class: "radio-option"
                          }, [
                            v("input", {
                              id: `form-${x.name}-${re.trim()}`,
                              name: `form-${x.name}`,
                              type: "radio",
                              value: re.trim(),
                              checked: s.formData[x.name] === re.trim(),
                              onChange: (je) => s.handleFieldChange(x.name, re.trim()),
                              class: "form-radio",
                              disabled: s.isSubmittingForm
                            }, null, 40, nd),
                            v("label", {
                              for: `form-${x.name}-${re.trim()}`,
                              class: "radio-label"
                            }, le(re.trim()), 9, sd)
                          ]))), 128))
                        ])) : se("", !0),
                        s.formErrors[x.name] ? (I(), F("div", rd, le(s.formErrors[x.name]), 1)) : se("", !0)
                      ]);
                    }), 128))
                  ]),
                  v("div", id, [
                    v("button", {
                      onClick: () => {
                        var x;
                        console.log("Regular form submit button clicked!"), s.handleFormSubmit((x = o.attributes) == null ? void 0 : x.form_data);
                      },
                      disabled: s.isSubmittingForm,
                      class: "form-submit-button",
                      style: Se(s.userBubbleStyles)
                    }, le(s.isSubmittingForm ? "Submitting..." : ((D = (ne = o.attributes) == null ? void 0 : ne.form_data) == null ? void 0 : D.submit_button_text) || "Submit"), 13, od)
                  ])
                ])) : o.message_type === "user_input" ? (I(), F("div", ld, [
                  (he = o.attributes) != null && he.prompt_message && o.attributes.prompt_message.trim() ? (I(), F("div", ad, le(o.attributes.prompt_message), 1)) : se("", !0),
                  o.isSubmitted ? (I(), F("div", hd, [
                    e[20] || (e[20] = v("strong", null, "Your input:", -1)),
                    lt(" " + le(o.submittedValue) + " ", 1),
                    (ye = o.attributes) != null && ye.confirmation_message && o.attributes.confirmation_message.trim() ? (I(), F("div", dd, le(o.attributes.confirmation_message), 1)) : se("", !0)
                  ])) : (I(), F("div", cd, [
                    $t(v("textarea", {
                      "onUpdate:modelValue": (x) => o.userInputValue = x,
                      class: "user-input-textarea",
                      placeholder: "Type your message here...",
                      rows: "3",
                      onKeydown: [
                        Ci(Si((x) => s.handleUserInputSubmit(o), ["ctrl"]), ["enter"]),
                        Ci(Si((x) => s.handleUserInputSubmit(o), ["meta"]), ["enter"])
                      ]
                    }, null, 40, ud), [
                      [Yt, o.userInputValue]
                    ]),
                    v("button", {
                      class: "user-input-submit-button",
                      onClick: (x) => s.handleUserInputSubmit(o),
                      disabled: !o.userInputValue || !o.userInputValue.trim()
                    }, " Submit ", 8, fd)
                  ]))
                ])) : o.shopify_output || o.message_type === "product" ? (I(), F("div", pd, [
                  o.message ? (I(), F("div", {
                    key: 0,
                    innerHTML: s.marked(s.removeUrls(o.message), { renderer: s.renderer }),
                    class: "product-message-text"
                  }, null, 8, gd)) : se("", !0),
                  (ee = o.shopify_output) != null && ee.products && o.shopify_output.products.length > 0 ? (I(), F("div", md, [
                    e[22] || (e[22] = v("h3", { class: "carousel-title" }, "Products", -1)),
                    v("div", _d, [
                      (I(!0), F(Pe, null, dt(o.shopify_output.products, (x) => {
                        var Ae;
                        return I(), F("div", {
                          key: x.id,
                          class: "product-card-compact carousel-item"
                        }, [
                          (Ae = x.image) != null && Ae.src ? (I(), F("div", yd, [
                            v("img", {
                              src: x.image.src,
                              alt: x.title,
                              class: "product-thumbnail"
                            }, null, 8, bd)
                          ])) : se("", !0),
                          v("div", vd, [
                            v("div", wd, [
                              v("div", kd, le(x.title), 1),
                              x.variant_title && x.variant_title !== "Default Title" ? (I(), F("div", xd, le(x.variant_title), 1)) : se("", !0),
                              v("div", Sd, le(x.price_formatted || `₹${x.price}`), 1)
                            ]),
                            v("div", Cd, [
                              v("button", {
                                class: "view-details-button-compact",
                                onClick: (Me) => s.handleViewDetails(x.id)
                              }, [...e[21] || (e[21] = [
                                lt(" View product ", -1),
                                v("span", { class: "external-link-icon" }, "↗", -1)
                              ])], 8, Td)
                            ])
                          ])
                        ]);
                      }), 128))
                    ])
                  ])) : (Ne = o.shopify_output) != null && Ne.products && o.shopify_output.products.length === 0 ? (I(), F("div", Ad, [...e[23] || (e[23] = [
                    v("p", null, "No products found.", -1)
                  ])])) : o.shopify_output && !o.shopify_output.products ? (I(), F("div", Ed, [...e[24] || (e[24] = [
                    v("p", null, "No products to display.", -1)
                  ])])) : se("", !0)
                ])) : (I(), F("div", {
                  key: 4,
                  innerHTML: s.marked(o.message, { renderer: s.renderer })
                }, null, 8, Rd))
              ], 4),
              v("div", Id, [
                o.message_type === "user" ? (I(), F("span", Od, " You ")) : se("", !0)
              ])
            ], 2);
          }), 128)),
          s.loading ? (I(), F("div", Fd, e[25] || (e[25] = [
            v("div", { class: "dot" }, null, -1),
            v("div", { class: "dot" }, null, -1),
            v("div", { class: "dot" }, null, -1)
          ]))) : se("", !0)
        ], 512),
        s.shouldShowNewConversationOption ? (I(), F("div", {
          key: 3,
          class: "new-conversation-section",
          style: Se(s.agentBubbleStyles)
        }, [
          v("div", Md, [
            e[27] || (e[27] = v("p", { class: "ended-text" }, "This chat has ended.", -1)),
            v("button", {
              class: "start-new-conversation-button",
              style: Se(s.userBubbleStyles),
              onClick: s.handleStartNewConversation
            }, " Click here to start a new conversation ", 4)
          ])
        ], 4)) : (I(), F("div", {
          key: 2,
          class: Ie(["chat-input", { "ask-anything-input": s.isAskAnythingStyle }]),
          style: Se(s.agentBubbleStyles)
        }, [
          !s.hasStartedChat && !s.hasConversationToken && !s.isAskAnythingStyle ? (I(), F("div", Pd, [
            $t(v("input", {
              "onUpdate:modelValue": e[3] || (e[3] = (o) => s.emailInput = o),
              type: "email",
              placeholder: "Enter your email address to begin",
              disabled: s.loading || s.connectionStatus !== "connected",
              class: Ie({
                invalid: s.emailInput.trim() && !s.isValidEmail(s.emailInput.trim()),
                disabled: s.connectionStatus !== "connected"
              })
            }, null, 10, Ld), [
              [Yt, s.emailInput]
            ])
          ])) : se("", !0),
          v("div", Bd, [
            $t(v("input", {
              "onUpdate:modelValue": e[4] || (e[4] = (o) => s.newMessage = o),
              type: "text",
              placeholder: s.connectionStatus === "connected" ? s.isAskAnythingStyle ? "Ask me anything..." : "Type a message..." : "Connecting...",
              onKeypress: s.handleKeyPress,
              disabled: !s.isMessageInputEnabled,
              class: Ie({ disabled: s.connectionStatus !== "connected", "ask-anything-field": s.isAskAnythingStyle })
            }, null, 42, Nd), [
              [Yt, s.newMessage]
            ]),
            v("button", {
              class: Ie(["send-button", { "ask-anything-send": s.isAskAnythingStyle }]),
              style: Se(s.userBubbleStyles),
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
            ]), 14, Dd)
          ])
        ], 6)),
        v("div", {
          class: "powered-by",
          style: Se(s.messageNameStyles)
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
          lt(" Powered by ChatterMate ", -1)
        ]), 4)
      ], 6)) : se("", !0)
    ], 64)),
    s.showRatingDialog ? (I(), F("div", qd, [
      v("div", Ud, [
        e[29] || (e[29] = v("h3", null, "Rate your conversation", -1)),
        v("div", Vd, [
          (I(), F(Pe, null, dt(5, (o) => v("button", {
            key: o,
            onClick: (l) => s.currentRating = o,
            class: Ie([{ active: o <= s.currentRating }, "star-button"])
          }, " ★ ", 10, Hd)), 64))
        ]),
        $t(v("textarea", {
          "onUpdate:modelValue": e[5] || (e[5] = (o) => s.ratingFeedback = o),
          placeholder: "Additional feedback (optional)",
          class: "rating-feedback"
        }, null, 512), [
          [Yt, s.ratingFeedback]
        ]),
        v("div", jd, [
          v("button", {
            onClick: e[6] || (e[6] = (o) => t.submitRating(s.currentRating, s.ratingFeedback)),
            disabled: !s.currentRating,
            class: "submit-button",
            style: Se(s.userBubbleStyles)
          }, " Submit ", 12, zd),
          v("button", {
            onClick: e[7] || (e[7] = (o) => s.showRatingDialog = !1),
            class: "skip-rating"
          }, " Skip ")
        ])
      ])
    ])) : se("", !0)
  ], 6);
}
const Kd = /* @__PURE__ */ Pf(Ff, [["render", Wd], ["__scopeId", "data-v-a3601fa3"], ["__file", "/Users/arunrajkumar/Documents/Personal/code/chattermate.chat/frontend/src/webclient/WidgetBuilder.vue"]]);
window.process || (window.process = { env: { NODE_ENV: "production" } });
const $d = new URL(window.location.href), Gd = $d.searchParams.get("widget_id"), Zd = zc(Kd, {
  widgetId: Gd
});
Zd.mount("#app");
