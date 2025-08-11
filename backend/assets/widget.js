var Vl = Object.defineProperty;
var Hl = (e, t, n) => t in e ? Vl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var xe = (e, t, n) => Hl(e, typeof t != "symbol" ? t + "" : t, n);
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
const Se = {}, _n = [], At = () => {
}, Ul = () => !1, vs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), kr = (e) => e.startsWith("onUpdate:"), Ke = Object.assign, xr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, jl = Object.prototype.hasOwnProperty, ye = (e, t) => jl.call(e, t), J = Array.isArray, yn = (e) => ws(e) === "[object Map]", no = (e) => ws(e) === "[object Set]", Q = (e) => typeof e == "function", Be = (e) => typeof e == "string", tn = (e) => typeof e == "symbol", $e = (e) => e !== null && typeof e == "object", so = (e) => ($e(e) || Q(e)) && Q(e.then) && Q(e.catch), ro = Object.prototype.toString, ws = (e) => ro.call(e), zl = (e) => ws(e).slice(8, -1), io = (e) => ws(e) === "[object Object]", Sr = (e) => Be(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ln = /* @__PURE__ */ wr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ks = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Wl = /-(\w)/g, Qt = ks(
  (e) => e.replace(Wl, (t, n) => n ? n.toUpperCase() : "")
), Kl = /\B([A-Z])/g, nn = ks(
  (e) => e.replace(Kl, "-$1").toLowerCase()
), oo = ks((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ms = ks(
  (e) => e ? `on${oo(e)}` : ""
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
let pi;
const xs = () => pi || (pi = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ee(e) {
  if (J(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = Be(s) ? Jl(s) : Ee(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (Be(e) || $e(e))
    return e;
}
const Zl = /;(?![^(]*\))/g, Gl = /:([^]+)/, Yl = /\/\*[^]*?\*\//g;
function Jl(e) {
  const t = {};
  return e.replace(Yl, "").split(Zl).forEach((n) => {
    if (n) {
      const s = n.split(Gl);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Le(e) {
  let t = "";
  if (Be(e))
    t = e;
  else if (J(e))
    for (let n = 0; n < e.length; n++) {
      const s = Le(e[n]);
      s && (t += s + " ");
    }
  else if ($e(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Ql = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Xl = /* @__PURE__ */ wr(Ql);
function lo(e) {
  return !!e || e === "";
}
const ao = (e) => !!(e && e.__v_isRef === !0), ce = (e) => Be(e) ? e : e == null ? "" : J(e) || $e(e) && (e.toString === ro || !Q(e.toString)) ? ao(e) ? ce(e.value) : JSON.stringify(e, co, 2) : String(e), co = (e, t) => ao(t) ? co(e, t.value) : yn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[Ds(s, i) + " =>"] = r, n),
    {}
  )
} : no(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ds(n))
} : tn(t) ? Ds(t) : $e(t) && !J(t) && !io(t) ? String(t) : t, Ds = (e, t = "") => {
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
let st;
class ea {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = st, !t && st && (this.index = (st.scopes || (st.scopes = [])).push(
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
      const n = st;
      try {
        return st = this, t();
      } finally {
        st = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = st, st = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (st = this.prevScope, this.prevScope = void 0);
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
function ta() {
  return st;
}
let Ae;
const qs = /* @__PURE__ */ new WeakSet();
class uo {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, st && st.active && st.effects.push(this);
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ho(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, gi(this), po(this);
    const t = Ae, n = vt;
    Ae = this, vt = !0;
    try {
      return this.fn();
    } finally {
      go(this), Ae = t, vt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Er(t);
      this.deps = this.depsTail = void 0, gi(this), this.onStop && this.onStop(), this.flags &= -2;
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
let fo = 0, Pn, $n;
function ho(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = $n, $n = e;
    return;
  }
  e.next = Pn, Pn = e;
}
function Cr() {
  fo++;
}
function Tr() {
  if (--fo > 0)
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
function po(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function go(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), Er(s), na(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function nr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (mo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function mo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === qn) || (e.globalVersion = qn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !nr(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = Ae, s = vt;
  Ae = e, vt = !0;
  try {
    po(e);
    const r = e.fn(e._value);
    (t.version === 0 || Yt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    Ae = n, vt = s, go(e), e.flags &= -3;
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
function na(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let vt = !0;
const _o = [];
function Dt() {
  _o.push(vt), vt = !1;
}
function qt() {
  const e = _o.pop();
  vt = e === void 0 ? !0 : e;
}
function gi(e) {
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
let qn = 0;
class sa {
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
    if (!Ae || !vt || Ae === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Ae)
      n = this.activeLink = new sa(Ae, this), Ae.deps ? (n.prevDep = Ae.depsTail, Ae.depsTail.nextDep = n, Ae.depsTail = n) : Ae.deps = Ae.depsTail = n, yo(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = Ae.depsTail, n.nextDep = void 0, Ae.depsTail.nextDep = n, Ae.depsTail = n, Ae.deps === n && (Ae.deps = s);
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
function yo(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        yo(s);
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
function ze(e, t, n) {
  if (vt && Ae) {
    let s = sr.get(e);
    s || sr.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new Ar()), r.map = s, r.key = n), r.track();
  }
}
function Ft(e, t, n, s, r, i) {
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
    const a = J(e), u = a && Sr(n);
    if (a && n === "length") {
      const f = Number(s);
      o.forEach((m, b) => {
        (b === "length" || b === Vn || !tn(b) && b >= f) && l(m);
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
  const t = _e(e);
  return t === e ? t : (ze(t, "iterate", Vn), dt(e) ? t : t.map(Ue));
}
function Ss(e) {
  return ze(e = _e(e), "iterate", Vn), e;
}
const ra = {
  __proto__: null,
  [Symbol.iterator]() {
    return Vs(this, Symbol.iterator, Ue);
  },
  concat(...e) {
    return pn(this).concat(
      ...e.map((t) => J(t) ? pn(t) : t)
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
    return mi(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return mi(this, "reduceRight", e, t);
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
const ia = Array.prototype;
function Pt(e, t, n, s, r, i) {
  const o = Ss(e), l = o !== e && !dt(e), a = o[t];
  if (a !== ia[t]) {
    const m = a.apply(e, i);
    return l ? Ue(m) : m;
  }
  let u = n;
  o !== e && (l ? u = function(m, b) {
    return n.call(this, Ue(m), b, e);
  } : n.length > 2 && (u = function(m, b) {
    return n.call(this, m, b, e);
  }));
  const f = a.call(o, u, s);
  return l && r ? r(f) : f;
}
function mi(e, t, n, s) {
  const r = Ss(e);
  let i = n;
  return r !== e && (dt(e) ? n.length > 3 && (i = function(o, l, a) {
    return n.call(this, o, l, a, e);
  }) : i = function(o, l, a) {
    return n.call(this, o, Ue(l), a, e);
  }), r[t](i, ...s);
}
function Hs(e, t, n) {
  const s = _e(e);
  ze(s, "iterate", Vn);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Lr(n[0]) ? (n[0] = _e(n[0]), s[t](...n)) : r;
}
function Sn(e, t, n = []) {
  Dt(), Cr();
  const s = _e(e)[t].apply(e, n);
  return Tr(), qt(), s;
}
const oa = /* @__PURE__ */ wr("__proto__,__v_isRef,__isVue"), bo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(tn)
);
function la(e) {
  tn(e) || (e = String(e));
  const t = _e(this);
  return ze(t, "has", e), t.hasOwnProperty(e);
}
class vo {
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
      return s === (r ? i ? _a : So : i ? xo : ko).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = J(t);
    if (!r) {
      let a;
      if (o && (a = ra[n]))
        return a;
      if (n === "hasOwnProperty")
        return la;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      We(t) ? t : s
    );
    return (tn(n) ? bo.has(n) : oa(n)) || (r || ze(t, "get", n), i) ? l : We(l) ? o && Sr(n) ? l : l.value : $e(l) ? r ? Co(l) : Ir(l) : l;
  }
}
class wo extends vo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    if (!this._isShallow) {
      const a = Xt(i);
      if (!dt(s) && !Xt(s) && (i = _e(i), s = _e(s)), !J(t) && We(i) && !We(s))
        return a ? !1 : (i.value = s, !0);
    }
    const o = J(t) && Sr(n) ? Number(n) < t.length : ye(t, n), l = Reflect.set(
      t,
      n,
      s,
      We(t) ? t : r
    );
    return t === _e(r) && (o ? Yt(s, i) && Ft(t, "set", n, s) : Ft(t, "add", n, s)), l;
  }
  deleteProperty(t, n) {
    const s = ye(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Ft(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!tn(n) || !bo.has(n)) && ze(t, "has", n), s;
  }
  ownKeys(t) {
    return ze(
      t,
      "iterate",
      J(t) ? "length" : fn
    ), Reflect.ownKeys(t);
  }
}
class aa extends vo {
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
const ca = /* @__PURE__ */ new wo(), ua = /* @__PURE__ */ new aa(), fa = /* @__PURE__ */ new wo(!0);
const ir = (e) => e, Zn = (e) => Reflect.getPrototypeOf(e);
function ha(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = _e(r), o = yn(i), l = e === "entries" || e === Symbol.iterator && o, a = e === "keys" && o, u = r[e](...s), f = n ? ir : t ? us : Ue;
    return !t && ze(
      i,
      "iterate",
      a ? rr : fn
    ), {
      // iterator protocol
      next() {
        const { value: m, done: b } = u.next();
        return b ? { value: m, done: b } : {
          value: l ? [f(m[0]), f(m[1])] : f(m),
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
function Gn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function da(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = _e(i), l = _e(r);
      e || (Yt(r, l) && ze(o, "get", r), ze(o, "get", l));
      const { has: a } = Zn(o), u = t ? ir : e ? us : Ue;
      if (a.call(o, r))
        return u(i.get(r));
      if (a.call(o, l))
        return u(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && ze(_e(r), "iterate", fn), Reflect.get(r, "size", r);
    },
    has(r) {
      const i = this.__v_raw, o = _e(i), l = _e(r);
      return e || (Yt(r, l) && ze(o, "has", r), ze(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, a = _e(l), u = t ? ir : e ? us : Ue;
      return !e && ze(a, "iterate", fn), l.forEach((f, m) => r.call(i, u(f), u(m), o));
    }
  };
  return Ke(
    n,
    e ? {
      add: Gn("add"),
      set: Gn("set"),
      delete: Gn("delete"),
      clear: Gn("clear")
    } : {
      add(r) {
        !t && !dt(r) && !Xt(r) && (r = _e(r));
        const i = _e(this);
        return Zn(i).has.call(i, r) || (i.add(r), Ft(i, "add", r, r)), this;
      },
      set(r, i) {
        !t && !dt(i) && !Xt(i) && (i = _e(i));
        const o = _e(this), { has: l, get: a } = Zn(o);
        let u = l.call(o, r);
        u || (r = _e(r), u = l.call(o, r));
        const f = a.call(o, r);
        return o.set(r, i), u ? Yt(i, f) && Ft(o, "set", r, i) : Ft(o, "add", r, i), this;
      },
      delete(r) {
        const i = _e(this), { has: o, get: l } = Zn(i);
        let a = o.call(i, r);
        a || (r = _e(r), a = o.call(i, r)), l && l.call(i, r);
        const u = i.delete(r);
        return a && Ft(i, "delete", r, void 0), u;
      },
      clear() {
        const r = _e(this), i = r.size !== 0, o = r.clear();
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
    n[r] = ha(r, e, t);
  }), n;
}
function Rr(e, t) {
  const n = da(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    ye(n, r) && r in s ? n : s,
    r,
    i
  );
}
const pa = {
  get: /* @__PURE__ */ Rr(!1, !1)
}, ga = {
  get: /* @__PURE__ */ Rr(!1, !0)
}, ma = {
  get: /* @__PURE__ */ Rr(!0, !1)
};
const ko = /* @__PURE__ */ new WeakMap(), xo = /* @__PURE__ */ new WeakMap(), So = /* @__PURE__ */ new WeakMap(), _a = /* @__PURE__ */ new WeakMap();
function ya(e) {
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
function ba(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ya(zl(e));
}
function Ir(e) {
  return Xt(e) ? e : Or(
    e,
    !1,
    ca,
    pa,
    ko
  );
}
function va(e) {
  return Or(
    e,
    !1,
    fa,
    ga,
    xo
  );
}
function Co(e) {
  return Or(
    e,
    !0,
    ua,
    ma,
    So
  );
}
function Or(e, t, n, s, r) {
  if (!$e(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = ba(e);
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
function _e(e) {
  const t = e && e.__v_raw;
  return t ? _e(t) : e;
}
function wa(e) {
  return !ye(e, "__v_skip") && Object.isExtensible(e) && er(e, "__v_skip", !0), e;
}
const Ue = (e) => $e(e) ? Ir(e) : e, us = (e) => $e(e) ? Co(e) : e;
function We(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function de(e) {
  return ka(e, !1);
}
function ka(e, t) {
  return We(e) ? e : new xa(e, t);
}
class xa {
  constructor(t, n) {
    this.dep = new Ar(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : _e(t), this._value = n ? t : Ue(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || dt(t) || Xt(t);
    t = s ? t : _e(t), Yt(t, n) && (this._rawValue = t, this._value = s ? t : Ue(t), this.dep.trigger());
  }
}
function H(e) {
  return We(e) ? e.value : e;
}
const Sa = {
  get: (e, t, n) => t === "__v_raw" ? e : H(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return We(r) && !We(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function To(e) {
  return bn(e) ? e : new Proxy(e, Sa);
}
class Ca {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ar(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = qn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Ae !== this)
      return ho(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return mo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Ta(e, t, n = !1) {
  let s, r;
  return Q(e) ? s = e : (s = e.get, r = e.set), new Ca(s, r, n);
}
const Yn = {}, fs = /* @__PURE__ */ new WeakMap();
let cn;
function Ea(e, t = !1, n = cn) {
  if (n) {
    let s = fs.get(n);
    s || fs.set(n, s = []), s.push(e);
  }
}
function Aa(e, t, n = Se) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: a } = n, u = (q) => r ? q : dt(q) || r === !1 || r === 0 ? Nt(q, 1) : Nt(q);
  let f, m, b, L, F = !1, D = !1;
  if (We(e) ? (m = () => e.value, F = dt(e)) : bn(e) ? (m = () => u(e), F = !0) : J(e) ? (D = !0, F = e.some((q) => bn(q) || dt(q)), m = () => e.map((q) => {
    if (We(q))
      return q.value;
    if (bn(q))
      return u(q);
    if (Q(q))
      return a ? a(q, 2) : q();
  })) : Q(e) ? t ? m = a ? () => a(e, 2) : e : m = () => {
    if (b) {
      Dt();
      try {
        b();
      } finally {
        qt();
      }
    }
    const q = cn;
    cn = f;
    try {
      return a ? a(e, 3, [L]) : e(L);
    } finally {
      cn = q;
    }
  } : m = At, t && r) {
    const q = m, oe = r === !0 ? 1 / 0 : r;
    m = () => Nt(q(), oe);
  }
  const we = ta(), te = () => {
    f.stop(), we && we.active && xr(we.effects, f);
  };
  if (i && t) {
    const q = t;
    t = (...oe) => {
      q(...oe), te();
    };
  }
  let pe = D ? new Array(e.length).fill(Yn) : Yn;
  const ge = (q) => {
    if (!(!(f.flags & 1) || !f.dirty && !q))
      if (t) {
        const oe = f.run();
        if (r || F || (D ? oe.some((Me, fe) => Yt(Me, pe[fe])) : Yt(oe, pe))) {
          b && b();
          const Me = cn;
          cn = f;
          try {
            const fe = [
              oe,
              // pass undefined as the old value when it's changed for the first time
              pe === Yn ? void 0 : D && pe[0] === Yn ? [] : pe,
              L
            ];
            pe = oe, a ? a(t, 3, fe) : (
              // @ts-expect-error
              t(...fe)
            );
          } finally {
            cn = Me;
          }
        }
      } else
        f.run();
  };
  return l && l(ge), f = new uo(m), f.scheduler = o ? () => o(ge, !1) : ge, L = (q) => Ea(q, !1, f), b = f.onStop = () => {
    const q = fs.get(f);
    if (q) {
      if (a)
        a(q, 4);
      else
        for (const oe of q) oe();
      fs.delete(f);
    }
  }, t ? s ? ge(!0) : pe = f.run() : o ? o(ge.bind(null, !0), !0) : f.run(), te.pause = f.pause.bind(f), te.resume = f.resume.bind(f), te.stop = te, te;
}
function Nt(e, t = 1 / 0, n) {
  if (t <= 0 || !$e(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, We(e))
    Nt(e.value, t, n);
  else if (J(e))
    for (let s = 0; s < e.length; s++)
      Nt(e[s], t, n);
  else if (no(e) || yn(e))
    e.forEach((s) => {
      Nt(s, t, n);
    });
  else if (io(e)) {
    for (const s in e)
      Nt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Nt(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function zn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Cs(r, t, n);
  }
}
function Ot(e, t, n, s) {
  if (Q(e)) {
    const r = zn(e, t, n, s);
    return r && so(r) && r.catch((i) => {
      Cs(i, t, n);
    }), r;
  }
  if (J(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(Ot(e[i], t, n, s));
    return r;
  }
}
function Cs(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || Se;
  if (t) {
    let l = t.parent;
    const a = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let m = 0; m < f.length; m++)
          if (f[m](e, a, u) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      Dt(), zn(i, null, 10, [
        e,
        a,
        u
      ]), qt();
      return;
    }
  }
  Ra(e, n, r, s, o);
}
function Ra(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const Je = [];
let Tt = -1;
const vn = [];
let Zt = null, gn = 0;
const Eo = /* @__PURE__ */ Promise.resolve();
let hs = null;
function Ao(e) {
  const t = hs || Eo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ia(e) {
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
    !(e.flags & 2) && t >= Hn(n) ? Je.push(e) : Je.splice(Ia(t), 0, e), e.flags |= 1, Ro();
  }
}
function Ro() {
  hs || (hs = Eo.then(Oo));
}
function Oa(e) {
  J(e) ? vn.push(...e) : Zt && e.id === -1 ? Zt.splice(gn + 1, 0, e) : e.flags & 1 || (vn.push(e), e.flags |= 1), Ro();
}
function _i(e, t, n = Tt + 1) {
  for (; n < Je.length; n++) {
    const s = Je[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      Je.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Io(e) {
  if (vn.length) {
    const t = [...new Set(vn)].sort(
      (n, s) => Hn(n) - Hn(s)
    );
    if (vn.length = 0, Zt) {
      Zt.push(...t);
      return;
    }
    for (Zt = t, gn = 0; gn < Zt.length; gn++) {
      const n = Zt[gn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Zt = null, gn = 0;
  }
}
const Hn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Oo(e) {
  try {
    for (Tt = 0; Tt < Je.length; Tt++) {
      const t = Je[Tt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), zn(
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
    Tt = -1, Je.length = 0, Io(), hs = null, (Je.length || vn.length) && Oo();
  }
}
let ht = null, Lo = null;
function ds(e) {
  const t = ht;
  return ht = e, Lo = e && e.type.__scopeId || null, t;
}
function La(e, t = ht, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && Ti(-1);
    const i = ds(t);
    let o;
    try {
      o = e(...r);
    } finally {
      ds(i), s._d && Ti(1);
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
    let [i, o, l, a = Se] = t[r];
    i && (Q(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Nt(o), s.push({
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
const Pa = Symbol("_vte"), $a = (e) => e.__isTeleport;
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
function Po(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Fn(e, t, n, s, r = !1) {
  if (J(e)) {
    e.forEach(
      (F, D) => Fn(
        F,
        t && (J(t) ? t[D] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (Nn(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Fn(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? Rs(s.component) : s.el, o = r ? null : i, { i: l, r: a } = e, u = t && t.r, f = l.refs === Se ? l.refs = {} : l.refs, m = l.setupState, b = _e(m), L = m === Se ? () => !1 : (F) => ye(b, F);
  if (u != null && u !== a && (Be(u) ? (f[u] = null, L(u) && (m[u] = null)) : We(u) && (u.value = null)), Q(a))
    zn(a, l, 12, [o, f]);
  else {
    const F = Be(a), D = We(a);
    if (F || D) {
      const we = () => {
        if (e.f) {
          const te = F ? L(a) ? m[a] : f[a] : a.value;
          r ? J(te) && xr(te, i) : J(te) ? te.includes(i) || te.push(i) : F ? (f[a] = [i], L(a) && (m[a] = f[a])) : (a.value = [i], e.k && (f[e.k] = a.value));
        } else F ? (f[a] = o, L(a) && (m[a] = o)) : D && (a.value = o, e.k && (f[e.k] = o));
      };
      o ? (we.id = -1, lt(we, n)) : we();
    }
  }
}
xs().requestIdleCallback;
xs().cancelIdleCallback;
const Nn = (e) => !!e.type.__asyncLoader, $o = (e) => e.type.__isKeepAlive;
function Na(e, t) {
  Fo(e, "a", t);
}
function Ba(e, t) {
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
      $o(r.parent.vnode) && Ma(s, t, n, r), r = r.parent;
  }
}
function Ma(e, t, n, s) {
  const r = Ts(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Fr(() => {
    xr(s[t], r);
  }, n);
}
function Ts(e, t, n = Qe, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Dt();
      const l = Wn(n), a = Ot(t, n, e, o);
      return l(), qt(), a;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Vt = (e) => (t, n = Qe) => {
  (!jn || e === "sp") && Ts(e, (...s) => t(...s), n);
}, Da = Vt("bm"), No = Vt("m"), qa = Vt(
  "bu"
), Va = Vt("u"), Ha = Vt(
  "bum"
), Fr = Vt("um"), Ua = Vt(
  "sp"
), ja = Vt("rtg"), za = Vt("rtc");
function Wa(e, t = Qe) {
  Ts("ec", e, t);
}
const Ka = Symbol.for("v-ndc");
function xt(e, t, n, s) {
  let r;
  const i = n, o = J(e);
  if (o || Be(e)) {
    const l = o && bn(e);
    let a = !1, u = !1;
    l && (a = !dt(e), u = Xt(e), e = Ss(e)), r = new Array(e.length);
    for (let f = 0, m = e.length; f < m; f++)
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
const or = (e) => e ? sl(e) ? Rs(e) : or(e.parent) : null, Bn = (
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
    $options: (e) => Mo(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Pr(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ao.bind(e.proxy)),
    $watch: (e) => gc.bind(e)
  })
), Us = (e, t) => e !== Se && !e.__isScriptSetup && ye(e, t), Za = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: a } = e;
    let u;
    if (t[0] !== "$") {
      const L = o[t];
      if (L !== void 0)
        switch (L) {
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
        if (r !== Se && ye(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && ye(u, t)
        )
          return o[t] = 3, i[t];
        if (n !== Se && ye(n, t))
          return o[t] = 4, n[t];
        lr && (o[t] = 0);
      }
    }
    const f = Bn[t];
    let m, b;
    if (f)
      return t === "$attrs" && ze(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (m = l.__cssModules) && (m = m[t])
    )
      return m;
    if (n !== Se && ye(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      b = a.config.globalProperties, ye(b, t)
    )
      return b[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return Us(r, t) ? (r[t] = n, !0) : s !== Se && ye(s, t) ? (s[t] = n, !0) : ye(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i }
  }, o) {
    let l;
    return !!n[o] || e !== Se && ye(e, o) || Us(t, o) || (l = i[0]) && ye(l, o) || ye(s, o) || ye(Bn, o) || ye(r.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : ye(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function yi(e) {
  return J(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let lr = !0;
function Ga(e) {
  const t = Mo(e), n = e.proxy, s = e.ctx;
  lr = !1, t.beforeCreate && bi(t.beforeCreate, e, "bc");
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
    beforeMount: m,
    mounted: b,
    beforeUpdate: L,
    updated: F,
    activated: D,
    deactivated: we,
    beforeDestroy: te,
    beforeUnmount: pe,
    destroyed: ge,
    unmounted: q,
    render: oe,
    renderTracked: Me,
    renderTriggered: fe,
    errorCaptured: je,
    serverPrefetch: pt,
    // public API
    expose: Ze,
    inheritAttrs: gt,
    // assets
    components: wt,
    directives: et,
    filters: Ve
  } = t;
  if (u && Ya(u, s, null), o)
    for (const ee in o) {
      const se = o[ee];
      Q(se) && (s[ee] = se.bind(n));
    }
  if (r) {
    const ee = r.call(n, n);
    $e(ee) && (e.data = Ir(ee));
  }
  if (lr = !0, i)
    for (const ee in i) {
      const se = i[ee], M = Q(se) ? se.bind(n, n) : Q(se.get) ? se.get.bind(n, n) : At, ke = !Q(se) && Q(se.set) ? se.set.bind(n) : At, W = qe({
        get: M,
        set: ke
      });
      Object.defineProperty(s, ee, {
        enumerable: !0,
        configurable: !0,
        get: () => W.value,
        set: (Ce) => W.value = Ce
      });
    }
  if (l)
    for (const ee in l)
      Bo(l[ee], s, n, ee);
  if (a) {
    const ee = Q(a) ? a.call(n) : a;
    Reflect.ownKeys(ee).forEach((se) => {
      nc(se, ee[se]);
    });
  }
  f && bi(f, e, "c");
  function ne(ee, se) {
    J(se) ? se.forEach((M) => ee(M.bind(n))) : se && ee(se.bind(n));
  }
  if (ne(Da, m), ne(No, b), ne(qa, L), ne(Va, F), ne(Na, D), ne(Ba, we), ne(Wa, je), ne(za, Me), ne(ja, fe), ne(Ha, pe), ne(Fr, q), ne(Ua, pt), J(Ze))
    if (Ze.length) {
      const ee = e.exposed || (e.exposed = {});
      Ze.forEach((se) => {
        Object.defineProperty(ee, se, {
          get: () => n[se],
          set: (M) => n[se] = M,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  oe && e.render === At && (e.render = oe), gt != null && (e.inheritAttrs = gt), wt && (e.components = wt), et && (e.directives = et), pt && Po(e);
}
function Ya(e, t, n = At) {
  J(e) && (e = ar(e));
  for (const s in e) {
    const r = e[s];
    let i;
    $e(r) ? "default" in r ? i = ts(
      r.from || s,
      r.default,
      !0
    ) : i = ts(r.from || s) : i = ts(r), We(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function bi(e, t, n) {
  Ot(
    J(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Bo(e, t, n, s) {
  let r = s.includes(".") ? Jo(n, s) : () => n[s];
  if (Be(e)) {
    const i = t[e];
    Q(i) && un(r, i);
  } else if (Q(e))
    un(r, e.bind(n));
  else if ($e(e))
    if (J(e))
      e.forEach((i) => Bo(i, t, n, s));
    else {
      const i = Q(e.handler) ? e.handler.bind(n) : t[e.handler];
      Q(i) && un(r, i, e);
    }
}
function Mo(e) {
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
      const l = Ja[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Ja = {
  data: vi,
  props: wi,
  emits: wi,
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
  watch: Xa,
  // provide / inject
  provide: vi,
  inject: Qa
};
function vi(e, t) {
  return t ? e ? function() {
    return Ke(
      Q(e) ? e.call(this, this) : e,
      Q(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Qa(e, t) {
  return In(ar(e), ar(t));
}
function ar(e) {
  if (J(e)) {
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
function wi(e, t) {
  return e ? J(e) && J(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ke(
    /* @__PURE__ */ Object.create(null),
    yi(e),
    yi(t ?? {})
  ) : t;
}
function Xa(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ke(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Ye(e[s], t[s]);
  return n;
}
function Do() {
  return {
    app: null,
    config: {
      isNativeTag: Ul,
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
let ec = 0;
function tc(e, t) {
  return function(s, r = null) {
    Q(s) || (s = Ke({}, s)), r != null && !$e(r) && (r = null);
    const i = Do(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const u = i.app = {
      _uid: ec++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Mc,
      get config() {
        return i.config;
      },
      set config(f) {
      },
      use(f, ...m) {
        return o.has(f) || (f && Q(f.install) ? (o.add(f), f.install(u, ...m)) : Q(f) && (o.add(f), f(u, ...m))), u;
      },
      mixin(f) {
        return i.mixins.includes(f) || i.mixins.push(f), u;
      },
      component(f, m) {
        return m ? (i.components[f] = m, u) : i.components[f];
      },
      directive(f, m) {
        return m ? (i.directives[f] = m, u) : i.directives[f];
      },
      mount(f, m, b) {
        if (!a) {
          const L = u._ceVNode || Rt(s, r);
          return L.appContext = i, b === !0 ? b = "svg" : b === !1 && (b = void 0), e(L, f, b), a = !0, u._container = f, f.__vue_app__ = u, Rs(L.component);
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
      provide(f, m) {
        return i.provides[f] = m, u;
      },
      runWithContext(f) {
        const m = wn;
        wn = u;
        try {
          return f();
        } finally {
          wn = m;
        }
      }
    };
    return u;
  };
}
let wn = null;
function nc(e, t) {
  if (Qe) {
    let n = Qe.provides;
    const s = Qe.parent && Qe.parent.provides;
    s === n && (n = Qe.provides = Object.create(s)), n[e] = t;
  }
}
function ts(e, t, n = !1) {
  const s = Lc();
  if (s || wn) {
    let r = wn ? wn._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && Q(t) ? t.call(s && s.proxy) : t;
  }
}
const qo = {}, Vo = () => Object.create(qo), Ho = (e) => Object.getPrototypeOf(e) === qo;
function sc(e, t, n, s = !1) {
  const r = {}, i = Vo();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Uo(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : va(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function rc(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, l = _e(r), [a] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const f = e.vnode.dynamicProps;
      for (let m = 0; m < f.length; m++) {
        let b = f[m];
        if (Es(e.emitsOptions, b))
          continue;
        const L = t[b];
        if (a)
          if (ye(i, b))
            L !== i[b] && (i[b] = L, u = !0);
          else {
            const F = Qt(b);
            r[F] = cr(
              a,
              l,
              F,
              L,
              e,
              !1
            );
          }
        else
          L !== i[b] && (i[b] = L, u = !0);
      }
    }
  } else {
    Uo(e, t, r, i) && (u = !0);
    let f;
    for (const m in l)
      (!t || // for camelCase
      !ye(t, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = nn(m)) === m || !ye(t, f))) && (a ? n && // for camelCase
      (n[m] !== void 0 || // for kebab-case
      n[f] !== void 0) && (r[m] = cr(
        a,
        l,
        m,
        void 0,
        e,
        !0
      )) : delete r[m]);
    if (i !== l)
      for (const m in i)
        (!t || !ye(t, m)) && (delete i[m], u = !0);
  }
  u && Ft(e.attrs, "set", "");
}
function Uo(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let a in t) {
      if (Ln(a))
        continue;
      const u = t[a];
      let f;
      r && ye(r, f = Qt(a)) ? !i || !i.includes(f) ? n[f] = u : (l || (l = {}))[f] = u : Es(e.emitsOptions, a) || (!(a in s) || u !== s[a]) && (s[a] = u, o = !0);
    }
  if (i) {
    const a = _e(n), u = l || Se;
    for (let f = 0; f < i.length; f++) {
      const m = i[f];
      n[m] = cr(
        r,
        a,
        m,
        u[m],
        e,
        !ye(u, m)
      );
    }
  }
  return o;
}
function cr(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = ye(o, "default");
    if (l && s === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && Q(a)) {
        const { propsDefaults: u } = r;
        if (n in u)
          s = u[n];
        else {
          const f = Wn(r);
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
const ic = /* @__PURE__ */ new WeakMap();
function jo(e, t, n = !1) {
  const s = n ? ic : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, l = [];
  let a = !1;
  if (!Q(e)) {
    const f = (m) => {
      a = !0;
      const [b, L] = jo(m, t, !0);
      Ke(o, b), L && l.push(...L);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!i && !a)
    return $e(e) && s.set(e, _n), _n;
  if (J(i))
    for (let f = 0; f < i.length; f++) {
      const m = Qt(i[f]);
      ki(m) && (o[m] = Se);
    }
  else if (i)
    for (const f in i) {
      const m = Qt(f);
      if (ki(m)) {
        const b = i[f], L = o[m] = J(b) || Q(b) ? { type: b } : Ke({}, b), F = L.type;
        let D = !1, we = !0;
        if (J(F))
          for (let te = 0; te < F.length; ++te) {
            const pe = F[te], ge = Q(pe) && pe.name;
            if (ge === "Boolean") {
              D = !0;
              break;
            } else ge === "String" && (we = !1);
          }
        else
          D = Q(F) && F.name === "Boolean";
        L[
          0
          /* shouldCast */
        ] = D, L[
          1
          /* shouldCastTrue */
        ] = we, (D || ye(L, "default")) && l.push(m);
      }
    }
  const u = [o, l];
  return $e(e) && s.set(e, u), u;
}
function ki(e) {
  return e[0] !== "$" && !Ln(e);
}
const Nr = (e) => e === "_" || e === "__" || e === "_ctx" || e === "$stable", Br = (e) => J(e) ? e.map(Et) : [Et(e)], oc = (e, t, n) => {
  if (t._n)
    return t;
  const s = La((...r) => Br(t(...r)), n);
  return s._c = !1, s;
}, zo = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (Nr(r)) continue;
    const i = e[r];
    if (Q(i))
      t[r] = oc(r, i, s);
    else if (i != null) {
      const o = Br(i);
      t[r] = () => o;
    }
  }
}, Wo = (e, t) => {
  const n = Br(t);
  e.slots.default = () => n;
}, Ko = (e, t, n) => {
  for (const s in t)
    (n || !Nr(s)) && (e[s] = t[s]);
}, lc = (e, t, n) => {
  const s = e.slots = Vo();
  if (e.vnode.shapeFlag & 32) {
    const r = t.__;
    r && er(s, "__", r, !0);
    const i = t._;
    i ? (Ko(s, t, n), n && er(s, "_", i, !0)) : zo(t, s);
  } else t && Wo(e, t);
}, ac = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = Se;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : Ko(r, t, n) : (i = !t.$stable, zo(t, r)), o = t;
  } else t && (Wo(e, t), o = { default: 1 });
  if (i)
    for (const l in r)
      !Nr(l) && o[l] == null && delete r[l];
}, lt = kc;
function cc(e) {
  return uc(e);
}
function uc(e, t) {
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
    parentNode: m,
    nextSibling: b,
    setScopeId: L = At,
    insertStaticContent: F
  } = e, D = (h, g, w, T = null, S = null, C = null, N = void 0, I = null, O = !!g.dynamicChildren) => {
    if (h === g)
      return;
    h && !Cn(h, g) && (T = ct(h), Ce(h, S, C, !0), h = null), g.patchFlag === -2 && (O = !1, g.dynamicChildren = null);
    const { type: E, ref: j, shapeFlag: B } = g;
    switch (E) {
      case As:
        we(h, g, w, T);
        break;
      case en:
        te(h, g, w, T);
        break;
      case ns:
        h == null && pe(g, w, T, N);
        break;
      case Fe:
        wt(
          h,
          g,
          w,
          T,
          S,
          C,
          N,
          I,
          O
        );
        break;
      default:
        B & 1 ? oe(
          h,
          g,
          w,
          T,
          S,
          C,
          N,
          I,
          O
        ) : B & 6 ? et(
          h,
          g,
          w,
          T,
          S,
          C,
          N,
          I,
          O
        ) : (B & 64 || B & 128) && E.process(
          h,
          g,
          w,
          T,
          S,
          C,
          N,
          I,
          O,
          it
        );
    }
    j != null && S ? Fn(j, h && h.ref, C, g || h, !g) : j == null && h && h.ref != null && Fn(h.ref, null, C, h, !0);
  }, we = (h, g, w, T) => {
    if (h == null)
      s(
        g.el = l(g.children),
        w,
        T
      );
    else {
      const S = g.el = h.el;
      g.children !== h.children && u(S, g.children);
    }
  }, te = (h, g, w, T) => {
    h == null ? s(
      g.el = a(g.children || ""),
      w,
      T
    ) : g.el = h.el;
  }, pe = (h, g, w, T) => {
    [h.el, h.anchor] = F(
      h.children,
      g,
      w,
      T,
      h.el,
      h.anchor
    );
  }, ge = ({ el: h, anchor: g }, w, T) => {
    let S;
    for (; h && h !== g; )
      S = b(h), s(h, w, T), h = S;
    s(g, w, T);
  }, q = ({ el: h, anchor: g }) => {
    let w;
    for (; h && h !== g; )
      w = b(h), r(h), h = w;
    r(g);
  }, oe = (h, g, w, T, S, C, N, I, O) => {
    g.type === "svg" ? N = "svg" : g.type === "math" && (N = "mathml"), h == null ? Me(
      g,
      w,
      T,
      S,
      C,
      N,
      I,
      O
    ) : pt(
      h,
      g,
      S,
      C,
      N,
      I,
      O
    );
  }, Me = (h, g, w, T, S, C, N, I) => {
    let O, E;
    const { props: j, shapeFlag: B, transition: z, dirs: K } = h;
    if (O = h.el = o(
      h.type,
      C,
      j && j.is,
      j
    ), B & 8 ? f(O, h.children) : B & 16 && je(
      h.children,
      O,
      null,
      T,
      S,
      js(h, C),
      N,
      I
    ), K && on(h, null, T, "created"), fe(O, h, h.scopeId, N, T), j) {
      for (const he in j)
        he !== "value" && !Ln(he) && i(O, he, null, j[he], C, T);
      "value" in j && i(O, "value", null, j.value, C), (E = j.onVnodeBeforeMount) && St(E, T, h);
    }
    K && on(h, null, T, "beforeMount");
    const X = fc(S, z);
    X && z.beforeEnter(O), s(O, g, w), ((E = j && j.onVnodeMounted) || X || K) && lt(() => {
      E && St(E, T, h), X && z.enter(O), K && on(h, null, T, "mounted");
    }, S);
  }, fe = (h, g, w, T, S) => {
    if (w && L(h, w), T)
      for (let C = 0; C < T.length; C++)
        L(h, T[C]);
    if (S) {
      let C = S.subTree;
      if (g === C || Xo(C.type) && (C.ssContent === g || C.ssFallback === g)) {
        const N = S.vnode;
        fe(
          h,
          N,
          N.scopeId,
          N.slotScopeIds,
          S.parent
        );
      }
    }
  }, je = (h, g, w, T, S, C, N, I, O = 0) => {
    for (let E = O; E < h.length; E++) {
      const j = h[E] = I ? Gt(h[E]) : Et(h[E]);
      D(
        null,
        j,
        g,
        w,
        T,
        S,
        C,
        N,
        I
      );
    }
  }, pt = (h, g, w, T, S, C, N) => {
    const I = g.el = h.el;
    let { patchFlag: O, dynamicChildren: E, dirs: j } = g;
    O |= h.patchFlag & 16;
    const B = h.props || Se, z = g.props || Se;
    let K;
    if (w && ln(w, !1), (K = z.onVnodeBeforeUpdate) && St(K, w, g, h), j && on(g, h, w, "beforeUpdate"), w && ln(w, !0), (B.innerHTML && z.innerHTML == null || B.textContent && z.textContent == null) && f(I, ""), E ? Ze(
      h.dynamicChildren,
      E,
      I,
      w,
      T,
      js(g, S),
      C
    ) : N || se(
      h,
      g,
      I,
      null,
      w,
      T,
      js(g, S),
      C,
      !1
    ), O > 0) {
      if (O & 16)
        gt(I, B, z, w, S);
      else if (O & 2 && B.class !== z.class && i(I, "class", null, z.class, S), O & 4 && i(I, "style", B.style, z.style, S), O & 8) {
        const X = g.dynamicProps;
        for (let he = 0; he < X.length; he++) {
          const re = X[he], De = B[re], ae = z[re];
          (ae !== De || re === "value") && i(I, re, De, ae, S, w);
        }
      }
      O & 1 && h.children !== g.children && f(I, g.children);
    } else !N && E == null && gt(I, B, z, w, S);
    ((K = z.onVnodeUpdated) || j) && lt(() => {
      K && St(K, w, g, h), j && on(g, h, w, "updated");
    }, T);
  }, Ze = (h, g, w, T, S, C, N) => {
    for (let I = 0; I < g.length; I++) {
      const O = h[I], E = g[I], j = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        O.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (O.type === Fe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Cn(O, E) || // - In the case of a component, it could contain anything.
        O.shapeFlag & 198) ? m(O.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          w
        )
      );
      D(
        O,
        E,
        j,
        null,
        T,
        S,
        C,
        N,
        !0
      );
    }
  }, gt = (h, g, w, T, S) => {
    if (g !== w) {
      if (g !== Se)
        for (const C in g)
          !Ln(C) && !(C in w) && i(
            h,
            C,
            g[C],
            null,
            S,
            T
          );
      for (const C in w) {
        if (Ln(C)) continue;
        const N = w[C], I = g[C];
        N !== I && C !== "value" && i(h, C, I, N, S, T);
      }
      "value" in w && i(h, "value", g.value, w.value, S);
    }
  }, wt = (h, g, w, T, S, C, N, I, O) => {
    const E = g.el = h ? h.el : l(""), j = g.anchor = h ? h.anchor : l("");
    let { patchFlag: B, dynamicChildren: z, slotScopeIds: K } = g;
    K && (I = I ? I.concat(K) : K), h == null ? (s(E, w, T), s(j, w, T), je(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      w,
      j,
      S,
      C,
      N,
      I,
      O
    )) : B > 0 && B & 64 && z && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    h.dynamicChildren ? (Ze(
      h.dynamicChildren,
      z,
      w,
      S,
      C,
      N,
      I
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (g.key != null || S && g === S.subTree) && Zo(
      h,
      g,
      !0
      /* shallow */
    )) : se(
      h,
      g,
      w,
      j,
      S,
      C,
      N,
      I,
      O
    );
  }, et = (h, g, w, T, S, C, N, I, O) => {
    g.slotScopeIds = I, h == null ? g.shapeFlag & 512 ? S.ctx.activate(
      g,
      w,
      T,
      N,
      O
    ) : Ve(
      g,
      w,
      T,
      S,
      C,
      N,
      O
    ) : Ht(h, g, O);
  }, Ve = (h, g, w, T, S, C, N) => {
    const I = h.component = Oc(
      h,
      T,
      S
    );
    if ($o(h) && (I.ctx.renderer = it), Pc(I, !1, N), I.asyncDep) {
      if (S && S.registerDep(I, ne, N), !h.el) {
        const O = I.subTree = Rt(en);
        te(null, O, g, w), h.placeholder = O.el;
      }
    } else
      ne(
        I,
        h,
        g,
        w,
        S,
        C,
        N
      );
  }, Ht = (h, g, w) => {
    const T = g.component = h.component;
    if (vc(h, g, w))
      if (T.asyncDep && !T.asyncResolved) {
        ee(T, g, w);
        return;
      } else
        T.next = g, T.update();
    else
      g.el = h.el, T.vnode = g;
  }, ne = (h, g, w, T, S, C, N) => {
    const I = () => {
      if (h.isMounted) {
        let { next: B, bu: z, u: K, parent: X, vnode: he } = h;
        {
          const c = Go(h);
          if (c) {
            B && (B.el = he.el, ee(h, B, N)), c.asyncDep.then(() => {
              h.isUnmounted || I();
            });
            return;
          }
        }
        let re = B, De;
        ln(h, !1), B ? (B.el = he.el, ee(h, B, N)) : B = he, z && es(z), (De = B.props && B.props.onVnodeBeforeUpdate) && St(De, X, B, he), ln(h, !0);
        const ae = Si(h), Ie = h.subTree;
        h.subTree = ae, D(
          Ie,
          ae,
          // parent may have changed if it's in a teleport
          m(Ie.el),
          // anchor may have changed if it's in a fragment
          ct(Ie),
          h,
          S,
          C
        ), B.el = ae.el, re === null && wc(h, ae.el), K && lt(K, S), (De = B.props && B.props.onVnodeUpdated) && lt(
          () => St(De, X, B, he),
          S
        );
      } else {
        let B;
        const { el: z, props: K } = g, { bm: X, m: he, parent: re, root: De, type: ae } = h, Ie = Nn(g);
        ln(h, !1), X && es(X), !Ie && (B = K && K.onVnodeBeforeMount) && St(B, re, g), ln(h, !0);
        {
          De.ce && // @ts-expect-error _def is private
          De.ce._def.shadowRoot !== !1 && De.ce._injectChildStyle(ae);
          const c = h.subTree = Si(h);
          D(
            null,
            c,
            w,
            T,
            h,
            S,
            C
          ), g.el = c.el;
        }
        if (he && lt(he, S), !Ie && (B = K && K.onVnodeMounted)) {
          const c = g;
          lt(
            () => St(B, re, c),
            S
          );
        }
        (g.shapeFlag & 256 || re && Nn(re.vnode) && re.vnode.shapeFlag & 256) && h.a && lt(h.a, S), h.isMounted = !0, g = w = T = null;
      }
    };
    h.scope.on();
    const O = h.effect = new uo(I);
    h.scope.off();
    const E = h.update = O.run.bind(O), j = h.job = O.runIfDirty.bind(O);
    j.i = h, j.id = h.uid, O.scheduler = () => Pr(j), ln(h, !0), E();
  }, ee = (h, g, w) => {
    g.component = h;
    const T = h.vnode.props;
    h.vnode = g, h.next = null, rc(h, g.props, T, w), ac(h, g.children, w), Dt(), _i(h), qt();
  }, se = (h, g, w, T, S, C, N, I, O = !1) => {
    const E = h && h.children, j = h ? h.shapeFlag : 0, B = g.children, { patchFlag: z, shapeFlag: K } = g;
    if (z > 0) {
      if (z & 128) {
        ke(
          E,
          B,
          w,
          T,
          S,
          C,
          N,
          I,
          O
        );
        return;
      } else if (z & 256) {
        M(
          E,
          B,
          w,
          T,
          S,
          C,
          N,
          I,
          O
        );
        return;
      }
    }
    K & 8 ? (j & 16 && kt(E, S, C), B !== E && f(w, B)) : j & 16 ? K & 16 ? ke(
      E,
      B,
      w,
      T,
      S,
      C,
      N,
      I,
      O
    ) : kt(E, S, C, !0) : (j & 8 && f(w, ""), K & 16 && je(
      B,
      w,
      T,
      S,
      C,
      N,
      I,
      O
    ));
  }, M = (h, g, w, T, S, C, N, I, O) => {
    h = h || _n, g = g || _n;
    const E = h.length, j = g.length, B = Math.min(E, j);
    let z;
    for (z = 0; z < B; z++) {
      const K = g[z] = O ? Gt(g[z]) : Et(g[z]);
      D(
        h[z],
        K,
        w,
        null,
        S,
        C,
        N,
        I,
        O
      );
    }
    E > j ? kt(
      h,
      S,
      C,
      !0,
      !1,
      B
    ) : je(
      g,
      w,
      T,
      S,
      C,
      N,
      I,
      O,
      B
    );
  }, ke = (h, g, w, T, S, C, N, I, O) => {
    let E = 0;
    const j = g.length;
    let B = h.length - 1, z = j - 1;
    for (; E <= B && E <= z; ) {
      const K = h[E], X = g[E] = O ? Gt(g[E]) : Et(g[E]);
      if (Cn(K, X))
        D(
          K,
          X,
          w,
          null,
          S,
          C,
          N,
          I,
          O
        );
      else
        break;
      E++;
    }
    for (; E <= B && E <= z; ) {
      const K = h[B], X = g[z] = O ? Gt(g[z]) : Et(g[z]);
      if (Cn(K, X))
        D(
          K,
          X,
          w,
          null,
          S,
          C,
          N,
          I,
          O
        );
      else
        break;
      B--, z--;
    }
    if (E > B) {
      if (E <= z) {
        const K = z + 1, X = K < j ? g[K].el : T;
        for (; E <= z; )
          D(
            null,
            g[E] = O ? Gt(g[E]) : Et(g[E]),
            w,
            X,
            S,
            C,
            N,
            I,
            O
          ), E++;
      }
    } else if (E > z)
      for (; E <= B; )
        Ce(h[E], S, C, !0), E++;
    else {
      const K = E, X = E, he = /* @__PURE__ */ new Map();
      for (E = X; E <= z; E++) {
        const v = g[E] = O ? Gt(g[E]) : Et(g[E]);
        v.key != null && he.set(v.key, E);
      }
      let re, De = 0;
      const ae = z - X + 1;
      let Ie = !1, c = 0;
      const p = new Array(ae);
      for (E = 0; E < ae; E++) p[E] = 0;
      for (E = K; E <= B; E++) {
        const v = h[E];
        if (De >= ae) {
          Ce(v, S, C, !0);
          continue;
        }
        let A;
        if (v.key != null)
          A = he.get(v.key);
        else
          for (re = X; re <= z; re++)
            if (p[re - X] === 0 && Cn(v, g[re])) {
              A = re;
              break;
            }
        A === void 0 ? Ce(v, S, C, !0) : (p[A - X] = E + 1, A >= c ? c = A : Ie = !0, D(
          v,
          g[A],
          w,
          null,
          S,
          C,
          N,
          I,
          O
        ), De++);
      }
      const k = Ie ? hc(p) : _n;
      for (re = k.length - 1, E = ae - 1; E >= 0; E--) {
        const v = X + E, A = g[v], V = g[v + 1], U = v + 1 < j ? (
          // #13559, fallback to el placeholder for unresolved async component
          V.el || V.placeholder
        ) : T;
        p[E] === 0 ? D(
          null,
          A,
          w,
          U,
          S,
          C,
          N,
          I,
          O
        ) : Ie && (re < 0 || E !== k[re] ? W(A, w, U, 2) : re--);
      }
    }
  }, W = (h, g, w, T, S = null) => {
    const { el: C, type: N, transition: I, children: O, shapeFlag: E } = h;
    if (E & 6) {
      W(h.component.subTree, g, w, T);
      return;
    }
    if (E & 128) {
      h.suspense.move(g, w, T);
      return;
    }
    if (E & 64) {
      N.move(h, g, w, it);
      return;
    }
    if (N === Fe) {
      s(C, g, w);
      for (let B = 0; B < O.length; B++)
        W(O[B], g, w, T);
      s(h.anchor, g, w);
      return;
    }
    if (N === ns) {
      ge(h, g, w);
      return;
    }
    if (T !== 2 && E & 1 && I)
      if (T === 0)
        I.beforeEnter(C), s(C, g, w), lt(() => I.enter(C), S);
      else {
        const { leave: B, delayLeave: z, afterLeave: K } = I, X = () => {
          h.ctx.isUnmounted ? r(C) : s(C, g, w);
        }, he = () => {
          B(C, () => {
            X(), K && K();
          });
        };
        z ? z(C, X, he) : he();
      }
    else
      s(C, g, w);
  }, Ce = (h, g, w, T = !1, S = !1) => {
    const {
      type: C,
      props: N,
      ref: I,
      children: O,
      dynamicChildren: E,
      shapeFlag: j,
      patchFlag: B,
      dirs: z,
      cacheIndex: K
    } = h;
    if (B === -2 && (S = !1), I != null && (Dt(), Fn(I, null, w, h, !0), qt()), K != null && (g.renderCache[K] = void 0), j & 256) {
      g.ctx.deactivate(h);
      return;
    }
    const X = j & 1 && z, he = !Nn(h);
    let re;
    if (he && (re = N && N.onVnodeBeforeUnmount) && St(re, g, h), j & 6)
      sn(h.component, w, T);
    else {
      if (j & 128) {
        h.suspense.unmount(w, T);
        return;
      }
      X && on(h, null, g, "beforeUnmount"), j & 64 ? h.type.remove(
        h,
        g,
        w,
        it,
        T
      ) : E && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !E.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (C !== Fe || B > 0 && B & 64) ? kt(
        E,
        g,
        w,
        !1,
        !0
      ) : (C === Fe && B & 384 || !S && j & 16) && kt(O, g, w), T && mt(h);
    }
    (he && (re = N && N.onVnodeUnmounted) || X) && lt(() => {
      re && St(re, g, h), X && on(h, null, g, "unmounted");
    }, w);
  }, mt = (h) => {
    const { type: g, el: w, anchor: T, transition: S } = h;
    if (g === Fe) {
      _t(w, T);
      return;
    }
    if (g === ns) {
      q(h);
      return;
    }
    const C = () => {
      r(w), S && !S.persisted && S.afterLeave && S.afterLeave();
    };
    if (h.shapeFlag & 1 && S && !S.persisted) {
      const { leave: N, delayLeave: I } = S, O = () => N(w, C);
      I ? I(h.el, C, O) : O();
    } else
      C();
  }, _t = (h, g) => {
    let w;
    for (; h !== g; )
      w = b(h), r(h), h = w;
    r(g);
  }, sn = (h, g, w) => {
    const {
      bum: T,
      scope: S,
      job: C,
      subTree: N,
      um: I,
      m: O,
      a: E,
      parent: j,
      slots: { __: B }
    } = h;
    xi(O), xi(E), T && es(T), j && J(B) && B.forEach((z) => {
      j.renderCache[z] = void 0;
    }), S.stop(), C && (C.flags |= 8, Ce(N, h, g, w)), I && lt(I, g), lt(() => {
      h.isUnmounted = !0;
    }, g), g && g.pendingBranch && !g.isUnmounted && h.asyncDep && !h.asyncResolved && h.suspenseId === g.pendingId && (g.deps--, g.deps === 0 && g.resolve());
  }, kt = (h, g, w, T = !1, S = !1, C = 0) => {
    for (let N = C; N < h.length; N++)
      Ce(h[N], g, w, T, S);
  }, ct = (h) => {
    if (h.shapeFlag & 6)
      return ct(h.component.subTree);
    if (h.shapeFlag & 128)
      return h.suspense.next();
    const g = b(h.anchor || h.el), w = g && g[Pa];
    return w ? b(w) : g;
  };
  let rt = !1;
  const tt = (h, g, w) => {
    h == null ? g._vnode && Ce(g._vnode, null, null, !0) : D(
      g._vnode || null,
      h,
      g,
      null,
      null,
      null,
      w
    ), g._vnode = h, rt || (rt = !0, _i(), Io(), rt = !1);
  }, it = {
    p: D,
    um: Ce,
    m: W,
    r: mt,
    mt: Ve,
    mc: je,
    pc: se,
    pbc: Ze,
    n: ct,
    o: e
  };
  return {
    render: tt,
    hydrate: void 0,
    createApp: tc(tt)
  };
}
function js({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ln({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function fc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Zo(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (J(s) && J(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = Gt(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && Zo(o, l)), l.type === As && (l.el = o.el), l.type === en && !l.el && (l.el = o.el);
    }
}
function hc(e) {
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
function Go(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Go(t);
}
function xi(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const dc = Symbol.for("v-scx"), pc = () => ts(dc);
function un(e, t, n) {
  return Yo(e, t, n);
}
function Yo(e, t, n = Se) {
  const { immediate: s, deep: r, flush: i, once: o } = n, l = Ke({}, n), a = t && s || !t && i !== "post";
  let u;
  if (jn) {
    if (i === "sync") {
      const L = pc();
      u = L.__watcherHandles || (L.__watcherHandles = []);
    } else if (!a) {
      const L = () => {
      };
      return L.stop = At, L.resume = At, L.pause = At, L;
    }
  }
  const f = Qe;
  l.call = (L, F, D) => Ot(L, f, F, D);
  let m = !1;
  i === "post" ? l.scheduler = (L) => {
    lt(L, f && f.suspense);
  } : i !== "sync" && (m = !0, l.scheduler = (L, F) => {
    F ? L() : Pr(L);
  }), l.augmentJob = (L) => {
    t && (L.flags |= 4), m && (L.flags |= 2, f && (L.id = f.uid, L.i = f));
  };
  const b = Aa(e, t, l);
  return jn && (u ? u.push(b) : a && b()), b;
}
function gc(e, t, n) {
  const s = this.proxy, r = Be(e) ? e.includes(".") ? Jo(s, e) : () => s[e] : e.bind(s, s);
  let i;
  Q(t) ? i = t : (i = t.handler, n = t);
  const o = Wn(this), l = Yo(r, i.bind(s), n);
  return o(), l;
}
function Jo(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const mc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Qt(t)}Modifiers`] || e[`${nn(t)}Modifiers`];
function _c(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || Se;
  let r = n;
  const i = t.startsWith("update:"), o = i && mc(s, t.slice(7));
  o && (o.trim && (r = n.map((f) => Be(f) ? f.trim() : f)), o.number && (r = n.map(tr)));
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
function Qo(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, l = !1;
  if (!Q(e)) {
    const a = (u) => {
      const f = Qo(u, t, !0);
      f && (l = !0, Ke(o, f));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !l ? ($e(e) && s.set(e, null), null) : (J(i) ? i.forEach((a) => o[a] = null) : Ke(o, i), $e(e) && s.set(e, o), o);
}
function Es(e, t) {
  return !e || !vs(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ye(e, t[0].toLowerCase() + t.slice(1)) || ye(e, nn(t)) || ye(e, t));
}
function Si(e) {
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
    props: m,
    data: b,
    setupState: L,
    ctx: F,
    inheritAttrs: D
  } = e, we = ds(e);
  let te, pe;
  try {
    if (n.shapeFlag & 4) {
      const q = r || s, oe = q;
      te = Et(
        u.call(
          oe,
          q,
          f,
          m,
          L,
          b,
          F
        )
      ), pe = l;
    } else {
      const q = t;
      te = Et(
        q.length > 1 ? q(
          m,
          { attrs: l, slots: o, emit: a }
        ) : q(
          m,
          null
        )
      ), pe = t.props ? l : yc(l);
    }
  } catch (q) {
    Mn.length = 0, Cs(q, e, 1), te = Rt(en);
  }
  let ge = te;
  if (pe && D !== !1) {
    const q = Object.keys(pe), { shapeFlag: oe } = ge;
    q.length && oe & 7 && (i && q.some(kr) && (pe = bc(
      pe,
      i
    )), ge = kn(ge, pe, !1, !0));
  }
  return n.dirs && (ge = kn(ge, null, !1, !0), ge.dirs = ge.dirs ? ge.dirs.concat(n.dirs) : n.dirs), n.transition && $r(ge, n.transition), te = ge, ds(we), te;
}
const yc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || vs(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, bc = (e, t) => {
  const n = {};
  for (const s in e)
    (!kr(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function vc(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: l, patchFlag: a } = t, u = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? Ci(s, o, u) : !!o;
    if (a & 8) {
      const f = t.dynamicProps;
      for (let m = 0; m < f.length; m++) {
        const b = f[m];
        if (o[b] !== s[b] && !Es(u, b))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? Ci(s, o, u) : !0 : !!o;
  return !1;
}
function Ci(e, t, n) {
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
function wc({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Xo = (e) => e.__isSuspense;
function kc(e, t) {
  t && t.pendingBranch ? J(e) ? t.effects.push(...e) : t.effects.push(e) : Oa(e);
}
const Fe = Symbol.for("v-fgt"), As = Symbol.for("v-txt"), en = Symbol.for("v-cmt"), ns = Symbol.for("v-stc"), Mn = [];
let at = null;
function P(e = !1) {
  Mn.push(at = e ? null : []);
}
function xc() {
  Mn.pop(), at = Mn[Mn.length - 1] || null;
}
let Un = 1;
function Ti(e, t = !1) {
  Un += e, e < 0 && at && t && (at.hasOnce = !0);
}
function el(e) {
  return e.dynamicChildren = Un > 0 ? at || _n : null, xc(), Un > 0 && at && at.push(e), e;
}
function $(e, t, n, s, r, i) {
  return el(
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
function Sc(e, t, n, s, r) {
  return el(
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
function tl(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Cn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const nl = ({ key: e }) => e ?? null, ss = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Be(e) || We(e) || Q(e) ? { i: ht, r: e, k: t, f: !!n } : e : null);
function x(e, t = null, n = null, s = 0, r = null, i = e === Fe ? 0 : 1, o = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && nl(t),
    ref: t && ss(t),
    scopeId: Lo,
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
  return l ? (Mr(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= Be(n) ? 8 : 16), Un > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  at && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && at.push(a), a;
}
const Rt = Cc;
function Cc(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === Ka) && (e = en), tl(e)) {
    const l = kn(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Mr(l, n), Un > 0 && !i && at && (l.shapeFlag & 6 ? at[at.indexOf(e)] = l : at.push(l)), l.patchFlag = -2, l;
  }
  if (Bc(e) && (e = e.__vccOpts), t) {
    t = Tc(t);
    let { class: l, style: a } = t;
    l && !Be(l) && (t.class = Le(l)), $e(a) && (Lr(a) && !J(a) && (a = Ke({}, a)), t.style = Ee(a));
  }
  const o = Be(e) ? 1 : Xo(e) ? 128 : $a(e) ? 64 : $e(e) ? 4 : Q(e) ? 2 : 0;
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
function Tc(e) {
  return e ? Lr(e) || Ho(e) ? Ke({}, e) : e : null;
}
function kn(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: a } = e, u = t ? Ac(r || {}, t) : r, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && nl(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? J(i) ? i.concat(ss(t)) : [i, ss(t)] : ss(t)
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
    patchFlag: t && e.type !== Fe ? o === -1 ? 16 : o | 16 : o,
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
function Ec(e, t) {
  const n = Rt(ns, null, e);
  return n.staticCount = t, n;
}
function ie(e = "", t = !1) {
  return t ? (P(), Sc(en, null, e)) : Rt(en, null, e);
}
function Et(e) {
  return e == null || typeof e == "boolean" ? Rt(en) : J(e) ? Rt(
    Fe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : tl(e) ? Gt(e) : Rt(As, null, String(e));
}
function Gt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : kn(e);
}
function Mr(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (J(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Mr(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Ho(t) ? t._ctx = ht : r === 3 && ht && (ht.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Q(t) ? (t = { default: t, _ctx: ht }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [yt(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Ac(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Le([t.class, s.class]));
      else if (r === "style")
        t.style = Ee([t.style, s.style]);
      else if (vs(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(J(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
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
const Rc = Do();
let Ic = 0;
function Oc(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || Rc, i = {
    uid: Ic++,
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
    scope: new ea(
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
    propsOptions: jo(s, r),
    emitsOptions: Qo(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Se,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: Se,
    data: Se,
    props: Se,
    attrs: Se,
    slots: Se,
    refs: Se,
    setupState: Se,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = _c.bind(null, i), e.ce && e.ce(i), i;
}
let Qe = null;
const Lc = () => Qe || ht;
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
const Wn = (e) => {
  const t = Qe;
  return gs(e), e.scope.on(), () => {
    e.scope.off(), gs(t);
  };
}, Ei = () => {
  Qe && Qe.scope.off(), gs(null);
};
function sl(e) {
  return e.vnode.shapeFlag & 4;
}
let jn = !1;
function Pc(e, t = !1, n = !1) {
  t && ur(t);
  const { props: s, children: r } = e.vnode, i = sl(e);
  sc(e, s, i, t), lc(e, r, n || t);
  const o = i ? $c(e, t) : void 0;
  return t && ur(!1), o;
}
function $c(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Za);
  const { setup: s } = n;
  if (s) {
    Dt();
    const r = e.setupContext = s.length > 1 ? Nc(e) : null, i = Wn(e), o = zn(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = so(o);
    if (qt(), i(), (l || e.sp) && !Nn(e) && Po(e), l) {
      if (o.then(Ei, Ei), t)
        return o.then((a) => {
          Ai(e, a);
        }).catch((a) => {
          Cs(a, e, 0);
        });
      e.asyncDep = o;
    } else
      Ai(e, o);
  } else
    rl(e);
}
function Ai(e, t, n) {
  Q(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : $e(t) && (e.setupState = To(t)), rl(e);
}
function rl(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || At);
  {
    const r = Wn(e);
    Dt();
    try {
      Ga(e);
    } finally {
      qt(), r();
    }
  }
}
const Fc = {
  get(e, t) {
    return ze(e, "get", ""), e[t];
  }
};
function Nc(e) {
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
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(To(wa(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Bn)
        return Bn[n](e);
    },
    has(t, n) {
      return n in t || n in Bn;
    }
  })) : e.proxy;
}
function Bc(e) {
  return Q(e) && "__vccOpts" in e;
}
const qe = (e, t) => Ta(e, t, jn), Mc = "3.5.18";
/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let fr;
const Ri = typeof window < "u" && window.trustedTypes;
if (Ri)
  try {
    fr = /* @__PURE__ */ Ri.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const il = fr ? (e) => fr.createHTML(e) : (e) => e, Dc = "http://www.w3.org/2000/svg", qc = "http://www.w3.org/1998/Math/MathML", $t = typeof document < "u" ? document : null, Ii = $t && /* @__PURE__ */ $t.createElement("template"), Vc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? $t.createElementNS(Dc, e) : t === "mathml" ? $t.createElementNS(qc, e) : n ? $t.createElement(e, { is: n }) : $t.createElement(e);
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
      Ii.innerHTML = il(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Ii.content;
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
}, Hc = Symbol("_vtc");
function Uc(e, t, n) {
  const s = e[Hc];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Oi = Symbol("_vod"), jc = Symbol("_vsh"), zc = Symbol(""), Wc = /(^|;)\s*display\s*:/;
function Kc(e, t, n) {
  const s = e.style, r = Be(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (Be(t))
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
      const o = s[zc];
      o && (n += ";" + o), s.cssText = n, i = Wc.test(n);
    }
  } else t && e.removeAttribute("style");
  Oi in e && (e[Oi] = i ? s.display : "", e[jc] && (s.display = "none"));
}
const Li = /\s*!important$/;
function rs(e, t, n) {
  if (J(n))
    n.forEach((s) => rs(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Zc(e, t);
    Li.test(n) ? e.setProperty(
      nn(s),
      n.replace(Li, ""),
      "important"
    ) : e[s] = n;
  }
}
const Pi = ["Webkit", "Moz", "ms"], zs = {};
function Zc(e, t) {
  const n = zs[t];
  if (n)
    return n;
  let s = Qt(t);
  if (s !== "filter" && s in e)
    return zs[t] = s;
  s = oo(s);
  for (let r = 0; r < Pi.length; r++) {
    const i = Pi[r] + s;
    if (i in e)
      return zs[t] = i;
  }
  return t;
}
const $i = "http://www.w3.org/1999/xlink";
function Fi(e, t, n, s, r, i = Xl(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS($i, t.slice(6, t.length)) : e.setAttributeNS($i, t, n) : n == null || i && !lo(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : tn(n) ? String(n) : n
  );
}
function Ni(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? il(n) : n);
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
    l === "boolean" ? n = lo(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
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
function Gc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Bi = Symbol("_vei");
function Yc(e, t, n, s, r = null) {
  const i = e[Bi] || (e[Bi] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [l, a] = Jc(t);
    if (s) {
      const u = i[t] = eu(
        s,
        r
      );
      mn(e, l, u, a);
    } else o && (Gc(e, l, o, a), i[t] = void 0);
  }
}
const Mi = /(?:Once|Passive|Capture)$/;
function Jc(e) {
  let t;
  if (Mi.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Mi); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : nn(e.slice(2)), t];
}
let Ws = 0;
const Qc = /* @__PURE__ */ Promise.resolve(), Xc = () => Ws || (Qc.then(() => Ws = 0), Ws = Date.now());
function eu(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Ot(
      tu(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Xc(), n;
}
function tu(e, t) {
  if (J(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (r) => !r._stopped && s && s(r)
    );
  } else
    return t;
}
const Di = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, nu = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? Uc(e, s, o) : t === "style" ? Kc(e, n, s) : vs(t) ? kr(t) || Yc(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : su(e, t, s, o)) ? (Ni(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Fi(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !Be(s)) ? Ni(e, Qt(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Fi(e, t, s, o));
};
function su(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Di(t) && Q(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Di(t) && Be(n) ? !1 : t in e;
}
const qi = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return J(t) ? (n) => es(t, n) : t;
};
function ru(e) {
  e.target.composing = !0;
}
function Vi(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Ks = Symbol("_assign"), an = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e[Ks] = qi(r);
    const i = s || r.props && r.props.type === "number";
    mn(e, t ? "change" : "input", (o) => {
      if (o.target.composing) return;
      let l = e.value;
      n && (l = l.trim()), i && (l = tr(l)), e[Ks](l);
    }), n && mn(e, "change", () => {
      e.value = e.value.trim();
    }), t || (mn(e, "compositionstart", ru), mn(e, "compositionend", Vi), mn(e, "change", Vi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[Ks] = qi(o), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? tr(e.value) : e.value, a = t ?? "";
    l !== a && (document.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === a) || (e.value = a));
  }
}, iu = ["ctrl", "shift", "alt", "meta"], ou = {
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
  exact: (e, t) => iu.some((n) => e[`${n}Key`] && !t.includes(n))
}, Hi = (e, t) => {
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = ou[t[o]];
      if (l && l(r, t)) return;
    }
    return e(r, ...i);
  });
}, lu = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Ui = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = (r) => {
    if (!("key" in r))
      return;
    const i = nn(r.key);
    if (t.some(
      (o) => o === i || lu[o] === i
    ))
      return e(r);
  });
}, au = /* @__PURE__ */ Ke({ patchProp: nu }, Vc);
let ji;
function cu() {
  return ji || (ji = cc(au));
}
const uu = (...e) => {
  const t = cu().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = hu(s);
    if (!r) return;
    const i = t._component;
    !Q(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, fu(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
};
function fu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function hu(e) {
  return Be(e) ? document.querySelector(e) : e;
}
const Kt = (e) => {
  const t = e.replace("#", ""), n = parseInt(t.substr(0, 2), 16), s = parseInt(t.substr(2, 2), 16), r = parseInt(t.substr(4, 2), 16);
  return (n * 299 + s * 587 + r * 114) / 1e3 < 128;
}, du = (e, t) => {
  const n = e.replace("#", ""), s = parseInt(n.substr(0, 2), 16), r = parseInt(n.substr(2, 2), 16), i = parseInt(n.substr(4, 2), 16), o = Kt(e), l = o ? Math.min(255, s + t) : Math.max(0, s - t), a = o ? Math.min(255, r + t) : Math.max(0, r - t), u = o ? Math.min(255, i + t) : Math.max(0, i - t);
  return `#${l.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}${u.toString(16).padStart(2, "0")}`;
}, Tn = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e), pu = (e) => {
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
function ol(e) {
  dn = e;
}
var Dn = { exec: () => null };
function be(e, t = "") {
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
}, gu = /^(?:[ \t]*(?:\n|$))+/, mu = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, _u = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Kn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, yu = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, qr = /(?:[*+-]|\d{1,9}[.)])/, ll = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, al = be(ll).replace(/bull/g, qr).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), bu = be(ll).replace(/bull/g, qr).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Vr = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, vu = /^[^\n]+/, Hr = /(?!\s*\])(?:\\.|[^\[\]\\])+/, wu = be(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Hr).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), ku = be(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, qr).getRegex(), Is = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Ur = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, xu = be(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", Ur).replace("tag", Is).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), cl = be(Vr).replace("hr", Kn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Is).getRegex(), Su = be(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", cl).getRegex(), jr = {
  blockquote: Su,
  code: mu,
  def: wu,
  fences: _u,
  heading: yu,
  hr: Kn,
  html: xu,
  lheading: al,
  list: ku,
  newline: gu,
  paragraph: cl,
  table: Dn,
  text: vu
}, zi = be(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", Kn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Is).getRegex(), Cu = {
  ...jr,
  lheading: bu,
  table: zi,
  paragraph: be(Vr).replace("hr", Kn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", zi).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Is).getRegex()
}, Tu = {
  ...jr,
  html: be(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", Ur).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: Dn,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: be(Vr).replace("hr", Kn).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", al).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Eu = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Au = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, ul = /^( {2,}|\\)\n(?!\s*$)/, Ru = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Os = /[\p{P}\p{S}]/u, zr = /[\s\p{P}\p{S}]/u, fl = /[^\s\p{P}\p{S}]/u, Iu = be(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, zr).getRegex(), hl = /(?!~)[\p{P}\p{S}]/u, Ou = /(?!~)[\s\p{P}\p{S}]/u, Lu = /(?:[^\s\p{P}\p{S}]|~)/u, Pu = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, dl = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, $u = be(dl, "u").replace(/punct/g, Os).getRegex(), Fu = be(dl, "u").replace(/punct/g, hl).getRegex(), pl = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Nu = be(pl, "gu").replace(/notPunctSpace/g, fl).replace(/punctSpace/g, zr).replace(/punct/g, Os).getRegex(), Bu = be(pl, "gu").replace(/notPunctSpace/g, Lu).replace(/punctSpace/g, Ou).replace(/punct/g, hl).getRegex(), Mu = be(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, fl).replace(/punctSpace/g, zr).replace(/punct/g, Os).getRegex(), Du = be(/\\(punct)/, "gu").replace(/punct/g, Os).getRegex(), qu = be(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Vu = be(Ur).replace("(?:-->|$)", "-->").getRegex(), Hu = be(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", Vu).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), ms = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, Uu = be(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", ms).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), gl = be(/^!?\[(label)\]\[(ref)\]/).replace("label", ms).replace("ref", Hr).getRegex(), ml = be(/^!?\[(ref)\](?:\[\])?/).replace("ref", Hr).getRegex(), ju = be("reflink|nolink(?!\\()", "g").replace("reflink", gl).replace("nolink", ml).getRegex(), Wr = {
  _backpedal: Dn,
  // only used for GFM url
  anyPunctuation: Du,
  autolink: qu,
  blockSkip: Pu,
  br: ul,
  code: Au,
  del: Dn,
  emStrongLDelim: $u,
  emStrongRDelimAst: Nu,
  emStrongRDelimUnd: Mu,
  escape: Eu,
  link: Uu,
  nolink: ml,
  punctuation: Iu,
  reflink: gl,
  reflinkSearch: ju,
  tag: Hu,
  text: Ru,
  url: Dn
}, zu = {
  ...Wr,
  link: be(/^!?\[(label)\]\((.*?)\)/).replace("label", ms).getRegex(),
  reflink: be(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", ms).getRegex()
}, hr = {
  ...Wr,
  emStrongRDelimAst: Bu,
  emStrongLDelim: Fu,
  url: be(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Wu = {
  ...hr,
  br: be(ul).replace("{2,}", "*").getRegex(),
  text: be(hr.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Jn = {
  normal: jr,
  gfm: Cu,
  pedantic: Tu
}, En = {
  normal: Wr,
  gfm: hr,
  breaks: Wu,
  pedantic: zu
}, Ku = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Wi = (e) => Ku[e];
function Ct(e, t) {
  if (t) {
    if (Xe.escapeTest.test(e))
      return e.replace(Xe.escapeReplace, Wi);
  } else if (Xe.escapeTestNoEncode.test(e))
    return e.replace(Xe.escapeReplaceNoEncode, Wi);
  return e;
}
function Ki(e) {
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
function Zu(e, t) {
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
function Gi(e, t, n, s, r) {
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
function Gu(e, t, n) {
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
    xe(this, "options");
    xe(this, "rules");
    // set by the lexer
    xe(this, "lexer");
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
      const n = t[0], s = Gu(n, t[3] || "", this.rules);
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
        const m = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(f, i, !0), this.lexer.state.top = m, n.length === 0)
          break;
        const b = i.at(-1);
        if ((b == null ? void 0 : b.type) === "code")
          break;
        if ((b == null ? void 0 : b.type) === "blockquote") {
          const L = b, F = L.raw + `
` + n.join(`
`), D = this.blockquote(F);
          i[i.length - 1] = D, s = s.substring(0, s.length - L.raw.length) + D.raw, r = r.substring(0, r.length - L.text.length) + D.text;
          break;
        } else if ((b == null ? void 0 : b.type) === "list") {
          const L = b, F = L.raw + `
` + n.join(`
`), D = this.list(F);
          i[i.length - 1] = D, s = s.substring(0, s.length - b.raw.length) + D.raw, r = r.substring(0, r.length - L.raw.length) + D.raw, n = F.substring(i.at(-1).raw.length).split(`
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
        let m = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (te) => " ".repeat(3 * te.length)), b = e.split(`
`, 1)[0], L = !m.trim(), F = 0;
        if (this.options.pedantic ? (F = 2, f = m.trimStart()) : L ? F = t[1].length + 1 : (F = t[2].search(this.rules.other.nonSpaceChar), F = F > 4 ? 1 : F, f = m.slice(F), F += t[1].length), L && this.rules.other.blankLine.test(b) && (u += b + `
`, e = e.substring(b.length + 1), a = !0), !a) {
          const te = this.rules.other.nextBulletRegex(F), pe = this.rules.other.hrRegex(F), ge = this.rules.other.fencesBeginRegex(F), q = this.rules.other.headingBeginRegex(F), oe = this.rules.other.htmlBeginRegex(F);
          for (; e; ) {
            const Me = e.split(`
`, 1)[0];
            let fe;
            if (b = Me, this.options.pedantic ? (b = b.replace(this.rules.other.listReplaceNesting, "  "), fe = b) : fe = b.replace(this.rules.other.tabCharGlobal, "    "), ge.test(b) || q.test(b) || oe.test(b) || te.test(b) || pe.test(b))
              break;
            if (fe.search(this.rules.other.nonSpaceChar) >= F || !b.trim())
              f += `
` + fe.slice(F);
            else {
              if (L || m.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || ge.test(m) || q.test(m) || pe.test(m))
                break;
              f += `
` + b;
            }
            !L && !b.trim() && (L = !0), u += Me + `
`, e = e.substring(Me.length + 1), m = fe.slice(F);
          }
        }
        r.loose || (o ? r.loose = !0 : this.rules.other.doubleBlankLine.test(u) && (o = !0));
        let D = null, we;
        this.options.gfm && (D = this.rules.other.listIsTask.exec(f), D && (we = D[0] !== "[ ] ", f = f.replace(this.rules.other.listReplaceTask, ""))), r.items.push({
          type: "list_item",
          raw: u,
          task: !!D,
          checked: we,
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
          const u = r.items[a].tokens.filter((m) => m.type === "space"), f = u.length > 0 && u.some((m) => this.rules.other.anyLine.test(m.raw));
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
        const i = Zu(t[2], "()");
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
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), Gi(t, {
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
      return Gi(n, r, n[0], this.lexer, this.rules);
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
        const m = [...s[0]][0].length, b = e.slice(0, i + s.index + m + l);
        if (Math.min(i, l) % 2) {
          const F = b.slice(1, -1);
          return {
            type: "em",
            raw: b,
            text: F,
            tokens: this.lexer.inlineTokens(F)
          };
        }
        const L = b.slice(2, -2);
        return {
          type: "strong",
          raw: b,
          text: L,
          tokens: this.lexer.inlineTokens(L)
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
}, Bt = class dr {
  constructor(t) {
    xe(this, "tokens");
    xe(this, "options");
    xe(this, "state");
    xe(this, "tokenizer");
    xe(this, "inlineQueue");
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
        let m;
        this.options.extensions.startBlock.forEach((b) => {
          m = b.call({ lexer: this }, f), typeof m == "number" && m >= 0 && (u = Math.min(u, m));
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
      if ((a = (l = this.options.extensions) == null ? void 0 : l.inline) != null && a.some((b) => (f = b.call({ lexer: this }, t, n)) ? (t = t.substring(f.raw.length), n.push(f), !0) : !1))
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
        const b = n.at(-1);
        f.type === "text" && (b == null ? void 0 : b.type) === "text" ? (b.raw += f.raw, b.text += f.text) : n.push(f);
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
      let m = t;
      if ((u = this.options.extensions) != null && u.startInline) {
        let b = 1 / 0;
        const L = t.slice(1);
        let F;
        this.options.extensions.startInline.forEach((D) => {
          F = D.call({ lexer: this }, L), typeof F == "number" && F >= 0 && (b = Math.min(b, F));
        }), b < 1 / 0 && b >= 0 && (m = t.substring(0, b + 1));
      }
      if (f = this.tokenizer.inlineText(m)) {
        t = t.substring(f.raw.length), f.raw.slice(-1) !== "_" && (o = f.raw.slice(-1)), i = !0;
        const b = n.at(-1);
        (b == null ? void 0 : b.type) === "text" ? (b.raw += f.raw, b.text += f.text) : n.push(f);
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
}, ys = class {
  // set by the parser
  constructor(e) {
    xe(this, "options");
    xe(this, "parser");
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
    const s = this.parser.parseInline(n), r = Ki(e);
    if (r === null)
      return s;
    e = r;
    let i = '<a href="' + e + '"';
    return t && (i += ' title="' + Ct(t) + '"'), i += ">" + s + "</a>", i;
  }
  image({ href: e, title: t, text: n, tokens: s }) {
    s && (n = this.parser.parseInline(s, this.parser.textRenderer));
    const r = Ki(e);
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
    xe(this, "options");
    xe(this, "renderer");
    xe(this, "textRenderer");
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
    xe(this, "options");
    xe(this, "block");
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
    return this.block ? Bt.lex : Bt.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? Mt.parse : Mt.parseInline;
  }
}, xe(Xs, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
])), Xs), Yu = class {
  constructor(...e) {
    xe(this, "defaults", Dr());
    xe(this, "options", this.setOptions);
    xe(this, "parse", this.parseMarkdown(!0));
    xe(this, "parseInline", this.parseMarkdown(!1));
    xe(this, "Parser", Mt);
    xe(this, "Renderer", ys);
    xe(this, "TextRenderer", Kr);
    xe(this, "Lexer", Bt);
    xe(this, "Tokenizer", _s);
    xe(this, "Hooks", is);
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
              return Promise.resolve(l.call(r, u)).then((m) => a.call(r, m));
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
    return Bt.lex(e, t ?? this.defaults);
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
      const l = i.hooks ? i.hooks.provideLexer() : e ? Bt.lex : Bt.lexInline, a = i.hooks ? i.hooks.provideParser() : e ? Mt.parse : Mt.parseInline;
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
}, hn = new Yu();
function ue(e, t) {
  return hn.parse(e, t);
}
ue.options = ue.setOptions = function(e) {
  return hn.setOptions(e), ue.defaults = hn.defaults, ol(ue.defaults), ue;
};
ue.getDefaults = Dr;
ue.defaults = dn;
ue.use = function(...e) {
  return hn.use(...e), ue.defaults = hn.defaults, ol(ue.defaults), ue;
};
ue.walkTokens = function(e, t) {
  return hn.walkTokens(e, t);
};
ue.parseInline = hn.parseInline;
ue.Parser = Mt;
ue.parser = Mt.parse;
ue.Renderer = ys;
ue.TextRenderer = Kr;
ue.Lexer = Bt;
ue.lexer = Bt.lex;
ue.Tokenizer = _s;
ue.Hooks = is;
ue.parse = ue;
ue.options;
ue.setOptions;
ue.use;
ue.walkTokens;
ue.parseInline;
Mt.parse;
Bt.lex;
const bs = {
  API_URL: "https://api.chattermate.chat/api/v1",
  WS_URL: "wss://api.chattermate.chat"
};
function Ju(e) {
  const t = qe(() => ({
    backgroundColor: e.value.chat_background_color || "#ffffff",
    color: Kt(e.value.chat_background_color || "#ffffff") ? "#ffffff" : "#000000"
  })), n = qe(() => ({
    backgroundColor: e.value.chat_bubble_color || "#f34611",
    color: Kt(e.value.chat_bubble_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), s = qe(() => {
    const u = e.value.chat_background_color || "#F8F9FA", f = du(u, 20);
    return {
      backgroundColor: f,
      color: Kt(f) ? "#FFFFFF" : "#000000"
    };
  }), r = qe(() => ({
    backgroundColor: e.value.accent_color || "#f34611",
    color: Kt(e.value.accent_color || "#f34611") ? "#FFFFFF" : "#000000"
  })), i = qe(() => ({
    color: Kt(e.value.chat_background_color || "#F8F9FA") ? "#FFFFFF" : "#000000"
  })), o = qe(() => ({
    borderBottom: `1px solid ${Kt(e.value.chat_background_color || "#F8F9FA") ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`
  })), l = qe(() => e.value.photo_url ? e.value.photo_url.includes("amazonaws.com") ? e.value.photo_url : `${bs.API_URL}${e.value.photo_url}` : ""), a = qe(() => {
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
const gr = { type: "error", data: "parser error" }, _l = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", yl = typeof ArrayBuffer == "function", bl = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e && e.buffer instanceof ArrayBuffer, Zr = ({ type: e, data: t }, n, s) => _l && t instanceof Blob ? n ? s(t) : Yi(t, s) : yl && (t instanceof ArrayBuffer || bl(t)) ? n ? s(t) : Yi(new Blob([t]), s) : s(Lt[e] + (t || "")), Yi = (e, t) => {
  const n = new FileReader();
  return n.onload = function() {
    const s = n.result.split(",")[1];
    t("b" + (s || ""));
  }, n.readAsDataURL(e);
};
function Ji(e) {
  return e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
}
let Zs;
function Qu(e, t) {
  if (_l && e.data instanceof Blob)
    return e.data.arrayBuffer().then(Ji).then(t);
  if (yl && (e.data instanceof ArrayBuffer || bl(e.data)))
    return t(Ji(e.data));
  Zr(e, !1, (n) => {
    Zs || (Zs = new TextEncoder()), t(Zs.encode(n));
  });
}
const Qi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", On = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < Qi.length; e++)
  On[Qi.charCodeAt(e)] = e;
const Xu = (e) => {
  let t = e.length * 0.75, n = e.length, s, r = 0, i, o, l, a;
  e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
  const u = new ArrayBuffer(t), f = new Uint8Array(u);
  for (s = 0; s < n; s += 4)
    i = On[e.charCodeAt(s)], o = On[e.charCodeAt(s + 1)], l = On[e.charCodeAt(s + 2)], a = On[e.charCodeAt(s + 3)], f[r++] = i << 2 | o >> 4, f[r++] = (o & 15) << 4 | l >> 2, f[r++] = (l & 3) << 6 | a & 63;
  return u;
}, ef = typeof ArrayBuffer == "function", Gr = (e, t) => {
  if (typeof e != "string")
    return {
      type: "message",
      data: vl(e, t)
    };
  const n = e.charAt(0);
  return n === "b" ? {
    type: "message",
    data: tf(e.substring(1), t)
  } : os[n] ? e.length > 1 ? {
    type: os[n],
    data: e.substring(1)
  } : {
    type: os[n]
  } : gr;
}, tf = (e, t) => {
  if (ef) {
    const n = Xu(e);
    return vl(n, t);
  } else
    return { base64: !0, data: e };
}, vl = (e, t) => {
  switch (t) {
    case "blob":
      return e instanceof Blob ? e : new Blob([e]);
    case "arraybuffer":
    default:
      return e instanceof ArrayBuffer ? e : e.buffer;
  }
}, wl = "", nf = (e, t) => {
  const n = e.length, s = new Array(n);
  let r = 0;
  e.forEach((i, o) => {
    Zr(i, !1, (l) => {
      s[o] = l, ++r === n && t(s.join(wl));
    });
  });
}, sf = (e, t) => {
  const n = e.split(wl), s = [];
  for (let r = 0; r < n.length; r++) {
    const i = Gr(n[r], t);
    if (s.push(i), i.type === "error")
      break;
  }
  return s;
};
function rf() {
  return new TransformStream({
    transform(e, t) {
      Qu(e, (n) => {
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
let Gs;
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
function of(e, t) {
  Gs || (Gs = new TextDecoder());
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
          l.enqueue(Gr(i ? a : Gs.decode(a), t)), s = 0;
        }
        if (r === 0 || r > e) {
          l.enqueue(gr);
          break;
        }
      }
    }
  });
}
const kl = 4;
function Ne(e) {
  if (e) return lf(e);
}
function lf(e) {
  for (var t in Ne.prototype)
    e[t] = Ne.prototype[t];
  return e;
}
Ne.prototype.on = Ne.prototype.addEventListener = function(e, t) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this;
};
Ne.prototype.once = function(e, t) {
  function n() {
    this.off(e, n), t.apply(this, arguments);
  }
  return n.fn = t, this.on(e, n), this;
};
Ne.prototype.off = Ne.prototype.removeListener = Ne.prototype.removeAllListeners = Ne.prototype.removeEventListener = function(e, t) {
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
Ne.prototype.emit = function(e) {
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
Ne.prototype.emitReserved = Ne.prototype.emit;
Ne.prototype.listeners = function(e) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || [];
};
Ne.prototype.hasListeners = function(e) {
  return !!this.listeners(e).length;
};
const Ls = typeof Promise == "function" && typeof Promise.resolve == "function" ? (t) => Promise.resolve().then(t) : (t, n) => n(t, 0), ft = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), af = "arraybuffer";
function xl(e, ...t) {
  return t.reduce((n, s) => (e.hasOwnProperty(s) && (n[s] = e[s]), n), {});
}
const cf = ft.setTimeout, uf = ft.clearTimeout;
function Ps(e, t) {
  t.useNativeTimers ? (e.setTimeoutFn = cf.bind(ft), e.clearTimeoutFn = uf.bind(ft)) : (e.setTimeoutFn = ft.setTimeout.bind(ft), e.clearTimeoutFn = ft.clearTimeout.bind(ft));
}
const ff = 1.33;
function hf(e) {
  return typeof e == "string" ? df(e) : Math.ceil((e.byteLength || e.size) * ff);
}
function df(e) {
  let t = 0, n = 0;
  for (let s = 0, r = e.length; s < r; s++)
    t = e.charCodeAt(s), t < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (s++, n += 4);
  return n;
}
function Sl() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function pf(e) {
  let t = "";
  for (let n in e)
    e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
  return t;
}
function gf(e) {
  let t = {}, n = e.split("&");
  for (let s = 0, r = n.length; s < r; s++) {
    let i = n[s].split("=");
    t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
  }
  return t;
}
class mf extends Error {
  constructor(t, n, s) {
    super(t), this.description = n, this.context = s, this.type = "TransportError";
  }
}
class Yr extends Ne {
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
    return super.emitReserved("error", new mf(t, n, s)), this;
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
    const n = Gr(t, this.socket.binaryType);
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
    const n = pf(t);
    return n.length ? "?" + n : "";
  }
}
class _f extends Yr {
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
    sf(t, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
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
    this.writable = !1, nf(t, (n) => {
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
    return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = Sl()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(t, n);
  }
}
let Cl = !1;
try {
  Cl = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const yf = Cl;
function bf() {
}
class vf extends _f {
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
class It extends Ne {
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
    const n = xl(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
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
      if (this._xhr.onreadystatechange = bf, t)
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
    attachEvent("onunload", Xi);
  else if (typeof addEventListener == "function") {
    const e = "onpagehide" in ft ? "pagehide" : "unload";
    addEventListener(e, Xi, !1);
  }
}
function Xi() {
  for (let e in It.requests)
    It.requests.hasOwnProperty(e) && It.requests[e].abort();
}
const wf = function() {
  const e = Tl({
    xdomain: !1
  });
  return e && e.responseType !== null;
}();
class kf extends vf {
  constructor(t) {
    super(t);
    const n = t && t.forceBase64;
    this.supportsBinary = wf && !n;
  }
  request(t = {}) {
    return Object.assign(t, { xd: this.xd }, this.opts), new It(Tl, this.uri(), t);
  }
}
function Tl(e) {
  const t = e.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!t || yf))
      return new XMLHttpRequest();
  } catch {
  }
  if (!t)
    try {
      return new ft[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const El = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class xf extends Yr {
  get name() {
    return "websocket";
  }
  doOpen() {
    const t = this.uri(), n = this.opts.protocols, s = El ? {} : xl(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
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
      Zr(s, this.supportsBinary, (i) => {
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
    return this.opts.timestampRequests && (n[this.opts.timestampParam] = Sl()), this.supportsBinary || (n.b64 = 1), this.createUri(t, n);
  }
}
const Ys = ft.WebSocket || ft.MozWebSocket;
class Sf extends xf {
  createSocket(t, n, s) {
    return El ? new Ys(t, n, s) : n ? new Ys(t, n) : new Ys(t);
  }
  doWrite(t, n) {
    this.ws.send(n);
  }
}
class Cf extends Yr {
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
        const n = of(Number.MAX_SAFE_INTEGER, this.socket.binaryType), s = t.readable.pipeThrough(n).getReader(), r = rf();
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
const Tf = {
  websocket: Sf,
  webtransport: Cf,
  polling: kf
}, Ef = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, Af = [
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
  let r = Ef.exec(e || ""), i = {}, o = 14;
  for (; o--; )
    i[Af[o]] = r[o] || "";
  return n != -1 && s != -1 && (i.source = t, i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"), i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), i.ipv6uri = !0), i.pathNames = Rf(i, i.path), i.queryKey = If(i, i.query), i;
}
function Rf(e, t) {
  const n = /\/{2,9}/g, s = t.replace(n, "/").split("/");
  return (t.slice(0, 1) == "/" || t.length === 0) && s.splice(0, 1), t.slice(-1) == "/" && s.splice(s.length - 1, 1), s;
}
function If(e, t) {
  const n = {};
  return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, r, i) {
    r && (n[r] = i);
  }), n;
}
const _r = typeof addEventListener == "function" && typeof removeEventListener == "function", ls = [];
_r && addEventListener("offline", () => {
  ls.forEach((e) => e());
}, !1);
class Jt extends Ne {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(t, n) {
    if (super(), this.binaryType = af, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, t && typeof t == "object" && (n = t, t = null), t) {
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
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = gf(this.opts.query)), _r && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
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
    n.EIO = kl, n.transport = t, this.id && (n.sid = this.id);
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
      if (r && (n += hf(r)), s > 0 && n > this._maxPayload)
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
Jt.protocol = kl;
class Of extends Jt {
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
      s || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (m) => {
        if (!s)
          if (m.type === "pong" && m.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", n), !n)
              return;
            Jt.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
              s || this.readyState !== "closed" && (f(), this.setTransport(n), n.send([{ type: "upgrade" }]), this.emitReserved("upgrade", n), n = null, this.upgrading = !1, this.flush());
            });
          } else {
            const b = new Error("probe error");
            b.transport = n.name, this.emitReserved("upgradeError", b);
          }
      }));
    };
    function i() {
      s || (s = !0, f(), n.close(), n = null);
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
    function u(m) {
      n && m.name !== n.name && i();
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
let Lf = class extends Of {
  constructor(t, n = {}) {
    const s = typeof t == "object" ? t : n;
    (!s.transports || s.transports && typeof s.transports[0] == "string") && (s.transports = (s.transports || ["polling", "websocket", "webtransport"]).map((r) => Tf[r]).filter((r) => !!r)), super(t, s);
  }
};
function Pf(e, t = "", n) {
  let s = e;
  n = n || typeof location < "u" && location, e == null && (e = n.protocol + "//" + n.host), typeof e == "string" && (e.charAt(0) === "/" && (e.charAt(1) === "/" ? e = n.protocol + e : e = n.host + e), /^(https?|wss?):\/\//.test(e) || (typeof n < "u" ? e = n.protocol + "//" + e : e = "https://" + e), s = mr(e)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
  const i = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
  return s.id = s.protocol + "://" + i + ":" + s.port + t, s.href = s.protocol + "://" + i + (n && n.port === s.port ? "" : ":" + s.port), s;
}
const $f = typeof ArrayBuffer == "function", Ff = (e) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer, Al = Object.prototype.toString, Nf = typeof Blob == "function" || typeof Blob < "u" && Al.call(Blob) === "[object BlobConstructor]", Bf = typeof File == "function" || typeof File < "u" && Al.call(File) === "[object FileConstructor]";
function Jr(e) {
  return $f && (e instanceof ArrayBuffer || Ff(e)) || Nf && e instanceof Blob || Bf && e instanceof File;
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
function Mf(e) {
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
function Df(e, t) {
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
const qf = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
], Vf = 5;
var le;
(function(e) {
  e[e.CONNECT = 0] = "CONNECT", e[e.DISCONNECT = 1] = "DISCONNECT", e[e.EVENT = 2] = "EVENT", e[e.ACK = 3] = "ACK", e[e.CONNECT_ERROR = 4] = "CONNECT_ERROR", e[e.BINARY_EVENT = 5] = "BINARY_EVENT", e[e.BINARY_ACK = 6] = "BINARY_ACK";
})(le || (le = {}));
class Hf {
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
    return (t.type === le.EVENT || t.type === le.ACK) && as(t) ? this.encodeAsBinary({
      type: t.type === le.EVENT ? le.BINARY_EVENT : le.BINARY_ACK,
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
    return (t.type === le.BINARY_EVENT || t.type === le.BINARY_ACK) && (n += t.attachments + "-"), t.nsp && t.nsp !== "/" && (n += t.nsp + ","), t.id != null && (n += t.id), t.data != null && (n += JSON.stringify(t.data, this.replacer)), n;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(t) {
    const n = Mf(t), s = this.encodeAsString(n.packet), r = n.buffers;
    return r.unshift(s), r;
  }
}
function eo(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
class Qr extends Ne {
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
      const s = n.type === le.BINARY_EVENT;
      s || n.type === le.BINARY_ACK ? (n.type = s ? le.EVENT : le.ACK, this.reconstructor = new Uf(n), n.attachments === 0 && super.emitReserved("decoded", n)) : super.emitReserved("decoded", n);
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
    if (le[s.type] === void 0)
      throw new Error("unknown packet type " + s.type);
    if (s.type === le.BINARY_EVENT || s.type === le.BINARY_ACK) {
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
      case le.CONNECT:
        return eo(n);
      case le.DISCONNECT:
        return n === void 0;
      case le.CONNECT_ERROR:
        return typeof n == "string" || eo(n);
      case le.EVENT:
      case le.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && qf.indexOf(n[0]) === -1);
      case le.ACK:
      case le.BINARY_ACK:
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
class Uf {
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
      const n = Df(this.reconPack, this.buffers);
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
const jf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Qr,
  Encoder: Hf,
  get PacketType() {
    return le;
  },
  protocol: Vf
}, Symbol.toStringTag, { value: "Module" }));
function bt(e, t, n) {
  return e.on(t, n), function() {
    e.off(t, n);
  };
}
const zf = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class Rl extends Ne {
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
    if (zf.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    if (n.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const o = {
      type: le.EVENT,
      data: n
    };
    if (o.options = {}, o.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
      const f = this.ids++, m = n.pop();
      this._registerAckCallback(f, m), o.id = f;
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
      type: le.CONNECT,
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
        case le.CONNECT:
          t.data && t.data.sid ? this.onconnect(t.data.sid, t.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case le.EVENT:
        case le.BINARY_EVENT:
          this.onevent(t);
          break;
        case le.ACK:
        case le.BINARY_ACK:
          this.onack(t);
          break;
        case le.DISCONNECT:
          this.ondisconnect();
          break;
        case le.CONNECT_ERROR:
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
        type: le.ACK,
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
    return this.connected && this.packet({ type: le.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
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
class vr extends Ne {
  constructor(t, n) {
    var s;
    super(), this.nsps = {}, this.subs = [], t && typeof t == "object" && (n = t, t = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, Ps(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : 0.5), this.backoff = new xn({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = t;
    const r = n.parser || jf;
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
    this.engine = new Lf(this.uri, this.opts);
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
    return s ? this._autoConnect && !s.active && s.connect() : (s = new Rl(this, t, n), this.nsps[t] = s), s;
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
  const n = Pf(e, t.path || "/socket.io"), s = n.source, r = n.id, i = n.path, o = Rn[r] && i in Rn[r].nsps, l = t.forceNew || t["force new connection"] || t.multiplex === !1 || o;
  let a;
  return l ? a = new vr(s, t) : (Rn[r] || (Rn[r] = new vr(s, t)), a = Rn[r]), n.query && !t.query && (t.query = n.queryKey), a.socket(n.path, t);
}
Object.assign(cs, {
  Manager: vr,
  Socket: Rl,
  io: cs,
  connect: cs
});
function Wf() {
  const e = de([]), t = de(!1), n = de(""), s = de(!1), r = de(!1), i = de(!1), o = de("connecting"), l = de(0), a = 5, u = de({}), f = de(null);
  let m = null, b = null, L = null, F = null;
  const D = (M) => {
    const ke = localStorage.getItem("ctid");
    return m = cs(`${bs.WS_URL}/widget`, {
      transports: ["websocket"],
      reconnection: !0,
      reconnectionAttempts: a,
      reconnectionDelay: 1e3,
      auth: ke ? {
        conversation_token: ke
      } : void 0
    }), m.on("connect", () => {
      o.value = "connected", l.value = 0;
    }), m.on("disconnect", () => {
      o.value === "connected" && (console.log("Socket disconnected, setting connection status to connecting"), o.value = "connecting");
    }), m.on("connect_error", () => {
      l.value++, console.error("Socket connection failed, attempt:", l.value, "connection status:", o.value), l.value >= a && (o.value = "failed");
    }), m.on("chat_response", (W) => {
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
    }), m.on("handle_taken_over", (W) => {
      e.value.push({
        message: `${W.user_name} joined the conversation`,
        message_type: "system",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: W.session_id
      }), u.value = {
        ...u.value,
        human_agent_name: W.user_name,
        human_agent_profile_pic: W.profile_picture
      }, b && b(W);
    }), m.on("error", oe), m.on("chat_history", Me), m.on("rating_submitted", fe), m.on("display_form", je), m.on("form_submitted", pt), m.on("workflow_state", Ze), m.on("workflow_proceeded", gt), m;
  }, we = async () => {
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
  }, te = () => (m && m.disconnect(), we()), pe = (M) => {
    b = M;
  }, ge = (M) => {
    L = M;
  }, q = (M) => {
    F = M;
  }, oe = (M) => {
    t.value = !1, n.value = pu(M), s.value = !0, setTimeout(() => {
      s.value = !1, n.value = "";
    }, 5e3);
  }, Me = (M) => {
    if (M.type === "chat_history" && Array.isArray(M.messages)) {
      const ke = M.messages.map((W) => {
        var mt;
        const Ce = {
          message: W.message,
          message_type: W.message_type,
          created_at: W.created_at,
          session_id: "",
          agent_name: W.agent_name || "",
          user_name: W.user_name || "",
          attributes: W.attributes || {}
        };
        return (mt = W.attributes) != null && mt.shopify_output && typeof W.attributes.shopify_output == "object" ? {
          ...Ce,
          message_type: "product",
          shopify_output: W.attributes.shopify_output
        } : Ce;
      });
      e.value = [
        ...ke.filter(
          (W) => !e.value.some(
            (Ce) => Ce.message === W.message && Ce.created_at === W.created_at
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
    var ke;
    console.log("Form display handler in composable:", M), t.value = !1, f.value = M.form_data, console.log("Set currentForm in handleDisplayForm:", f.value), ((ke = M.form_data) == null ? void 0 : ke.form_full_screen) === !0 ? (console.log("Full screen form detected, triggering workflow state callback"), L && L({
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
  }, Ze = (M) => {
    console.log("Workflow state received in composable:", M), (M.type === "form" || M.type === "display_form") && (console.log("Setting currentForm from workflow state:", M.form_data), f.value = M.form_data), L && L(M);
  }, gt = (M) => {
    console.log("Workflow proceeded in composable:", M), F && F(M);
  };
  return {
    messages: e,
    loading: t,
    errorMessage: n,
    showError: s,
    loadingHistory: r,
    hasStartedChat: i,
    connectionStatus: o,
    sendMessage: async (M, ke) => {
      !m || !M.trim() || (u.value.human_agent_name || (t.value = !0), e.value.push({
        message: M,
        message_type: "user",
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        session_id: ""
      }), m.emit("chat", {
        message: M,
        email: ke
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
    connect: we,
    reconnect: te,
    cleanup: () => {
      m && (m.removeAllListeners(), m.disconnect(), m = null), b = null, L = null, F = null;
    },
    humanAgent: u,
    onTakeover: pe,
    submitRating: async (M, ke) => {
      !m || !M || m.emit("submit_rating", {
        rating: M,
        feedback: ke
      });
    },
    currentForm: f,
    submitForm: async (M) => {
      if (console.log("Submitting form in socket:", M), console.log("Current form in socket:", f.value), console.log("Socket in socket:", m), !m) {
        console.error("No socket available for form submission");
        return;
      }
      if (!M || Object.keys(M).length === 0) {
        console.error("No form data to submit");
        return;
      }
      console.log("Emitting submit_form event with data:", M), m.emit("submit_form", {
        form_data: M
      }), f.value = null;
    },
    getWorkflowState: async () => {
      m && (console.log("Getting workflow state 12"), m.emit("get_workflow_state"));
    },
    proceedWorkflow: async () => {
      m && m.emit("proceed_workflow", {});
    },
    onWorkflowState: ge,
    onWorkflowProceeded: q
  };
}
function Kf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Js = { exports: {} }, to;
function Zf() {
  return to || (to = 1, function(e) {
    (function() {
      function t(c, p, k) {
        return c.call.apply(c.bind, arguments);
      }
      function n(c, p, k) {
        if (!c) throw Error();
        if (2 < arguments.length) {
          var v = Array.prototype.slice.call(arguments, 2);
          return function() {
            var A = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(A, v), c.apply(p, A);
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
      function l(c, p, k, v) {
        if (p = c.c.createElement(p), k) for (var A in k) k.hasOwnProperty(A) && (A == "style" ? p.style.cssText = k[A] : p.setAttribute(A, k[A]));
        return v && p.appendChild(c.c.createTextNode(v)), p;
      }
      function a(c, p, k) {
        c = c.c.getElementsByTagName(p)[0], c || (c = document.documentElement), c.insertBefore(k, c.lastChild);
      }
      function u(c) {
        c.parentNode && c.parentNode.removeChild(c);
      }
      function f(c, p, k) {
        p = p || [], k = k || [];
        for (var v = c.className.split(/\s+/), A = 0; A < p.length; A += 1) {
          for (var V = !1, U = 0; U < v.length; U += 1) if (p[A] === v[U]) {
            V = !0;
            break;
          }
          V || v.push(p[A]);
        }
        for (p = [], A = 0; A < v.length; A += 1) {
          for (V = !1, U = 0; U < k.length; U += 1) if (v[A] === k[U]) {
            V = !0;
            break;
          }
          V || p.push(v[A]);
        }
        c.className = p.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function m(c, p) {
        for (var k = c.className.split(/\s+/), v = 0, A = k.length; v < A; v++) if (k[v] == p) return !0;
        return !1;
      }
      function b(c) {
        return c.o.location.hostname || c.a.location.hostname;
      }
      function L(c, p, k) {
        function v() {
          G && A && V && (G(U), G = null);
        }
        p = l(c, "link", { rel: "stylesheet", href: p, media: "all" });
        var A = !1, V = !0, U = null, G = k || null;
        o ? (p.onload = function() {
          A = !0, v();
        }, p.onerror = function() {
          A = !0, U = Error("Stylesheet failed to load"), v();
        }) : setTimeout(function() {
          A = !0, v();
        }, 0), a(c, "head", p);
      }
      function F(c, p, k, v) {
        var A = c.c.getElementsByTagName("head")[0];
        if (A) {
          var V = l(c, "script", { src: p }), U = !1;
          return V.onload = V.onreadystatechange = function() {
            U || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (U = !0, k && k(null), V.onload = V.onreadystatechange = null, V.parentNode.tagName == "HEAD" && A.removeChild(V));
          }, A.appendChild(V), setTimeout(function() {
            U || (U = !0, k && k(Error("Script load timeout")));
          }, v || 5e3), V;
        }
        return null;
      }
      function D() {
        this.a = 0, this.c = null;
      }
      function we(c) {
        return c.a++, function() {
          c.a--, pe(c);
        };
      }
      function te(c, p) {
        c.c = p, pe(c);
      }
      function pe(c) {
        c.a == 0 && c.c && (c.c(), c.c = null);
      }
      function ge(c) {
        this.a = c || "-";
      }
      ge.prototype.c = function(c) {
        for (var p = [], k = 0; k < arguments.length; k++) p.push(arguments[k].replace(/[\W_]+/g, "").toLowerCase());
        return p.join(this.a);
      };
      function q(c, p) {
        this.c = c, this.f = 4, this.a = "n";
        var k = (p || "n4").match(/^([nio])([1-9])$/i);
        k && (this.a = k[1], this.f = parseInt(k[2], 10));
      }
      function oe(c) {
        return je(c) + " " + (c.f + "00") + " 300px " + Me(c.c);
      }
      function Me(c) {
        var p = [];
        c = c.split(/,\s*/);
        for (var k = 0; k < c.length; k++) {
          var v = c[k].replace(/['"]/g, "");
          v.indexOf(" ") != -1 || /^\d/.test(v) ? p.push("'" + v + "'") : p.push(v);
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
        var p = 4, k = "n", v = null;
        return c && ((v = c.match(/(normal|oblique|italic)/i)) && v[1] && (k = v[1].substr(0, 1).toLowerCase()), (v = c.match(/([1-9]00|normal|bold)/i)) && v[1] && (/bold/i.test(v[1]) ? p = 7 : /[1-9]00/.test(v[1]) && (p = parseInt(v[1].substr(0, 1), 10)))), k + p;
      }
      function Ze(c, p) {
        this.c = c, this.f = c.o.document.documentElement, this.h = p, this.a = new ge("-"), this.j = p.events !== !1, this.g = p.classes !== !1;
      }
      function gt(c) {
        c.g && f(c.f, [c.a.c("wf", "loading")]), et(c, "loading");
      }
      function wt(c) {
        if (c.g) {
          var p = m(c.f, c.a.c("wf", "active")), k = [], v = [c.a.c("wf", "loading")];
          p || k.push(c.a.c("wf", "inactive")), f(c.f, k, v);
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
        var v = [], A;
        for (A in p) if (p.hasOwnProperty(A)) {
          var V = c.c[A];
          V && v.push(V(p[A], k));
        }
        return v;
      }
      function ne(c, p) {
        this.c = c, this.f = p, this.a = l(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function ee(c) {
        a(c.c, "body", c.a);
      }
      function se(c) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + Me(c.c) + ";" + ("font-style:" + je(c) + ";font-weight:" + (c.f + "00") + ";");
      }
      function M(c, p, k, v, A, V) {
        this.g = c, this.j = p, this.a = v, this.c = k, this.f = A || 3e3, this.h = V || void 0;
      }
      M.prototype.start = function() {
        var c = this.c.o.document, p = this, k = r(), v = new Promise(function(U, G) {
          function me() {
            r() - k >= p.f ? G() : c.fonts.load(oe(p.a), p.h).then(function(Re) {
              1 <= Re.length ? U() : setTimeout(me, 25);
            }, function() {
              G();
            });
          }
          me();
        }), A = null, V = new Promise(function(U, G) {
          A = setTimeout(G, p.f);
        });
        Promise.race([V, v]).then(function() {
          A && (clearTimeout(A), A = null), p.g(p.a);
        }, function() {
          p.j(p.a);
        });
      };
      function ke(c, p, k, v, A, V, U) {
        this.v = c, this.B = p, this.c = k, this.a = v, this.s = U || "BESbswy", this.f = {}, this.w = A || 3e3, this.u = V || null, this.m = this.j = this.h = this.g = null, this.g = new ne(this.c, this.s), this.h = new ne(this.c, this.s), this.j = new ne(this.c, this.s), this.m = new ne(this.c, this.s), c = new q(this.a.c + ",serif", fe(this.a)), c = se(c), this.g.a.style.cssText = c, c = new q(this.a.c + ",sans-serif", fe(this.a)), c = se(c), this.h.a.style.cssText = c, c = new q("serif", fe(this.a)), c = se(c), this.j.a.style.cssText = c, c = new q("sans-serif", fe(this.a)), c = se(c), this.m.a.style.cssText = c, ee(this.g), ee(this.h), ee(this.j), ee(this.m);
      }
      var W = { D: "serif", C: "sans-serif" }, Ce = null;
      function mt() {
        if (Ce === null) {
          var c = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          Ce = !!c && (536 > parseInt(c[1], 10) || parseInt(c[1], 10) === 536 && 11 >= parseInt(c[2], 10));
        }
        return Ce;
      }
      ke.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = r(), sn(this);
      };
      function _t(c, p, k) {
        for (var v in W) if (W.hasOwnProperty(v) && p === c.f[W[v]] && k === c.f[W[v]]) return !0;
        return !1;
      }
      function sn(c) {
        var p = c.g.a.offsetWidth, k = c.h.a.offsetWidth, v;
        (v = p === c.f.serif && k === c.f["sans-serif"]) || (v = mt() && _t(c, p, k)), v ? r() - c.A >= c.w ? mt() && _t(c, p, k) && (c.u === null || c.u.hasOwnProperty(c.a.c)) ? ct(c, c.v) : ct(c, c.B) : kt(c) : ct(c, c.v);
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
      function rt(c, p, k) {
        this.c = c, this.a = p, this.f = 0, this.m = this.j = !1, this.s = k;
      }
      var tt = null;
      rt.prototype.g = function(c) {
        var p = this.a;
        p.g && f(p.f, [p.a.c("wf", c.c, fe(c).toString(), "active")], [p.a.c("wf", c.c, fe(c).toString(), "loading"), p.a.c("wf", c.c, fe(c).toString(), "inactive")]), et(p, "fontactive", c), this.m = !0, it(this);
      }, rt.prototype.h = function(c) {
        var p = this.a;
        if (p.g) {
          var k = m(p.f, p.a.c("wf", c.c, fe(c).toString(), "active")), v = [], A = [p.a.c("wf", c.c, fe(c).toString(), "loading")];
          k || v.push(p.a.c("wf", c.c, fe(c).toString(), "inactive")), f(p.f, v, A);
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
        this.c = new i(this.j, c.context || this.j), this.g = c.events !== !1, this.f = c.classes !== !1, g(this, new Ze(this.c, c), c);
      };
      function h(c, p, k, v, A) {
        var V = --c.h == 0;
        (c.f || c.g) && setTimeout(function() {
          var U = A || null, G = v || null || {};
          if (k.length === 0 && V) wt(p.a);
          else {
            p.f += k.length, V && (p.j = V);
            var me, Re = [];
            for (me = 0; me < k.length; me++) {
              var Oe = k[me], He = G[Oe.c], ot = p.a, jt = Oe;
              if (ot.g && f(ot.f, [ot.a.c("wf", jt.c, fe(jt).toString(), "loading")]), et(ot, "fontloading", jt), ot = null, tt === null) if (window.FontFace) {
                var jt = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), $s = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                tt = jt ? 42 < parseInt(jt[1], 10) : !$s;
              } else tt = !1;
              tt ? ot = new M(s(p.g, p), s(p.h, p), p.c, Oe, p.s, He) : ot = new ke(s(p.g, p), s(p.h, p), p.c, Oe, p.s, U, He), Re.push(ot);
            }
            for (me = 0; me < Re.length; me++) Re[me].start();
          }
        }, 0);
      }
      function g(c, p, k) {
        var A = [], v = k.timeout;
        gt(p);
        var A = Ht(c.a, k, c.c), V = new rt(c.c, p, v);
        for (c.h = A.length, p = 0, k = A.length; p < k; p++) A[p].load(function(U, G, me) {
          h(c, V, U, G, me);
        });
      }
      function w(c, p) {
        this.c = c, this.a = p;
      }
      w.prototype.load = function(c) {
        function p() {
          if (V["__mti_fntLst" + v]) {
            var U = V["__mti_fntLst" + v](), G = [], me;
            if (U) for (var Re = 0; Re < U.length; Re++) {
              var Oe = U[Re].fontfamily;
              U[Re].fontStyle != null && U[Re].fontWeight != null ? (me = U[Re].fontStyle + U[Re].fontWeight, G.push(new q(Oe, me))) : G.push(new q(Oe));
            }
            c(G);
          } else setTimeout(function() {
            p();
          }, 50);
        }
        var k = this, v = k.a.projectId, A = k.a.version;
        if (v) {
          var V = k.c.o;
          F(this.c, (k.a.api || "https://fast.fonts.net/jsapi") + "/" + v + ".js" + (A ? "?v=" + A : ""), function(U) {
            U ? c([]) : (V["__MonotypeConfiguration__" + v] = function() {
              return k.a;
            }, p());
          }).id = "__MonotypeAPIScript__" + v;
        } else c([]);
      };
      function T(c, p) {
        this.c = c, this.a = p;
      }
      T.prototype.load = function(c) {
        var p, k, v = this.a.urls || [], A = this.a.families || [], V = this.a.testStrings || {}, U = new D();
        for (p = 0, k = v.length; p < k; p++) L(this.c, v[p], we(U));
        var G = [];
        for (p = 0, k = A.length; p < k; p++) if (v = A[p].split(":"), v[1]) for (var me = v[1].split(","), Re = 0; Re < me.length; Re += 1) G.push(new q(v[0], me[Re]));
        else G.push(new q(v[0]));
        te(U, function() {
          c(G, V);
        });
      };
      function S(c, p) {
        c ? this.c = c : this.c = C, this.a = [], this.f = [], this.g = p || "";
      }
      var C = "https://fonts.googleapis.com/css";
      function N(c, p) {
        for (var k = p.length, v = 0; v < k; v++) {
          var A = p[v].split(":");
          A.length == 3 && c.f.push(A.pop());
          var V = "";
          A.length == 2 && A[1] != "" && (V = ":"), c.a.push(A.join(V));
        }
      }
      function I(c) {
        if (c.a.length == 0) throw Error("No fonts to load!");
        if (c.c.indexOf("kit=") != -1) return c.c;
        for (var p = c.a.length, k = [], v = 0; v < p; v++) k.push(c.a[v].replace(/ /g, "+"));
        return p = c.c + "?family=" + k.join("%7C"), 0 < c.f.length && (p += "&subset=" + c.f.join(",")), 0 < c.g.length && (p += "&text=" + encodeURIComponent(c.g)), p;
      }
      function O(c) {
        this.f = c, this.a = [], this.c = {};
      }
      var E = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, j = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, B = { i: "i", italic: "i", n: "n", normal: "n" }, z = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function K(c) {
        for (var p = c.f.length, k = 0; k < p; k++) {
          var v = c.f[k].split(":"), A = v[0].replace(/\+/g, " "), V = ["n4"];
          if (2 <= v.length) {
            var U, G = v[1];
            if (U = [], G) for (var G = G.split(","), me = G.length, Re = 0; Re < me; Re++) {
              var Oe;
              if (Oe = G[Re], Oe.match(/^[\w-]+$/)) {
                var He = z.exec(Oe.toLowerCase());
                if (He == null) Oe = "";
                else {
                  if (Oe = He[2], Oe = Oe == null || Oe == "" ? "n" : B[Oe], He = He[1], He == null || He == "") He = "4";
                  else var ot = j[He], He = ot || (isNaN(He) ? "4" : He.substr(0, 1));
                  Oe = [Oe, He].join("");
                }
              } else Oe = "";
              Oe && U.push(Oe);
            }
            0 < U.length && (V = U), v.length == 3 && (v = v[2], U = [], v = v ? v.split(",") : U, 0 < v.length && (v = E[v[0]]) && (c.c[A] = v));
          }
          for (c.c[A] || (v = E[A]) && (c.c[A] = v), v = 0; v < V.length; v += 1) c.a.push(new q(A, V[v]));
        }
      }
      function X(c, p) {
        this.c = c, this.a = p;
      }
      var he = { Arimo: !0, Cousine: !0, Tinos: !0 };
      X.prototype.load = function(c) {
        var p = new D(), k = this.c, v = new S(this.a.api, this.a.text), A = this.a.families;
        N(v, A);
        var V = new O(A);
        K(V), L(k, I(v), we(p)), te(p, function() {
          c(V.a, V.c, he);
        });
      };
      function re(c, p) {
        this.c = c, this.a = p;
      }
      re.prototype.load = function(c) {
        var p = this.a.id, k = this.c.o;
        p ? F(this.c, (this.a.api || "https://use.typekit.net") + "/" + p + ".js", function(v) {
          if (v) c([]);
          else if (k.Typekit && k.Typekit.config && k.Typekit.config.fn) {
            v = k.Typekit.config.fn;
            for (var A = [], V = 0; V < v.length; V += 2) for (var U = v[V], G = v[V + 1], me = 0; me < G.length; me++) A.push(new q(U, G[me]));
            try {
              k.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            c(A);
          }
        }, 2e3) : c([]);
      };
      function De(c, p) {
        this.c = c, this.f = p, this.a = [];
      }
      De.prototype.load = function(c) {
        var p = this.f.id, k = this.c.o, v = this;
        p ? (k.__webfontfontdeckmodule__ || (k.__webfontfontdeckmodule__ = {}), k.__webfontfontdeckmodule__[p] = function(A, V) {
          for (var U = 0, G = V.fonts.length; U < G; ++U) {
            var me = V.fonts[U];
            v.a.push(new q(me.name, pt("font-weight:" + me.weight + ";font-style:" + me.style)));
          }
          c(v.a);
        }, F(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + b(this.c) + "/" + p + ".js", function(A) {
          A && c([]);
        })) : c([]);
      };
      var ae = new Ut(window);
      ae.a.c.custom = function(c, p) {
        return new T(p, c);
      }, ae.a.c.fontdeck = function(c, p) {
        return new De(p, c);
      }, ae.a.c.monotype = function(c, p) {
        return new w(p, c);
      }, ae.a.c.typekit = function(c, p) {
        return new re(p, c);
      }, ae.a.c.google = function(c, p) {
        return new X(p, c);
      };
      var Ie = { load: s(ae.load, ae) };
      e.exports ? e.exports = Ie : (window.WebFont = Ie, window.WebFontConfig && ae.load(window.WebFontConfig));
    })();
  }(Js)), Js.exports;
}
var Gf = Zf();
const Yf = /* @__PURE__ */ Kf(Gf);
function Jf() {
  const e = de({}), t = de(""), n = (r) => {
    e.value = r, r.photo_url && (e.value.photo_url = r.photo_url), r.font_family && Yf.load({
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
const Qf = {
  key: 0,
  class: "initializing-overlay"
}, Xf = {
  key: 0,
  class: "connecting-message"
}, eh = {
  key: 1,
  class: "failed-message"
}, th = { class: "welcome-content" }, nh = { class: "welcome-header" }, sh = ["src", "alt"], rh = { class: "welcome-title" }, ih = { class: "welcome-subtitle" }, oh = { class: "welcome-input-container" }, lh = {
  key: 0,
  class: "email-input"
}, ah = ["disabled"], ch = { class: "welcome-message-input" }, uh = ["placeholder", "disabled"], fh = ["disabled"], hh = { class: "landing-page-content" }, dh = { class: "landing-page-header" }, ph = { class: "landing-page-heading" }, gh = { class: "landing-page-text" }, mh = { class: "landing-page-actions" }, _h = { class: "form-fullscreen-content" }, yh = {
  key: 0,
  class: "form-header"
}, bh = {
  key: 0,
  class: "form-title"
}, vh = {
  key: 1,
  class: "form-description"
}, wh = { class: "form-fields" }, kh = ["for"], xh = {
  key: 0,
  class: "required-indicator"
}, Sh = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "autocomplete", "inputmode"], Ch = ["id", "placeholder", "required", "min", "max", "value", "onInput"], Th = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput"], Eh = ["id", "required", "value", "onChange"], Ah = ["value"], Rh = {
  key: 4,
  class: "checkbox-field"
}, Ih = ["id", "required", "checked", "onChange"], Oh = { class: "checkbox-label" }, Lh = {
  key: 5,
  class: "radio-group"
}, Ph = ["name", "value", "required", "checked", "onChange"], $h = { class: "radio-label" }, Fh = {
  key: 6,
  class: "field-error"
}, Nh = { class: "form-actions" }, Bh = ["disabled"], Mh = {
  key: 0,
  class: "loading-spinner-inline"
}, Dh = { key: 1 }, qh = { class: "header-content" }, Vh = ["src", "alt"], Hh = { class: "header-info" }, Uh = { class: "status" }, jh = {
  key: 1,
  class: "loading-history"
}, zh = {
  key: 0,
  class: "rating-content"
}, Wh = { class: "rating-prompt" }, Kh = ["onMouseover", "onMouseleave", "onClick", "disabled"], Zh = {
  key: 0,
  class: "feedback-wrapper"
}, Gh = { class: "feedback-section" }, Yh = ["onUpdate:modelValue", "disabled"], Jh = { class: "feedback-counter" }, Qh = ["onClick", "disabled"], Xh = {
  key: 1,
  class: "submitted-feedback-wrapper"
}, ed = { class: "submitted-feedback" }, td = { class: "submitted-feedback-text" }, nd = {
  key: 2,
  class: "submitted-message"
}, sd = {
  key: 1,
  class: "form-content"
}, rd = {
  key: 0,
  class: "form-header"
}, id = {
  key: 0,
  class: "form-title"
}, od = {
  key: 1,
  class: "form-description"
}, ld = { class: "form-fields" }, ad = ["for"], cd = {
  key: 0,
  class: "required-indicator"
}, ud = ["id", "type", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "onBlur", "disabled", "autocomplete", "inputmode"], fd = ["id", "placeholder", "required", "min", "max", "value", "onInput", "disabled"], hd = ["id", "placeholder", "required", "minlength", "maxlength", "value", "onInput", "disabled"], dd = ["id", "required", "value", "onChange", "disabled"], pd = ["value"], gd = {
  key: 4,
  class: "checkbox-field"
}, md = ["id", "checked", "onChange", "disabled"], _d = ["for"], yd = {
  key: 5,
  class: "radio-field"
}, bd = ["id", "name", "value", "checked", "onChange", "disabled"], vd = ["for"], wd = {
  key: 6,
  class: "field-error"
}, kd = { class: "form-actions" }, xd = ["onClick", "disabled"], Sd = {
  key: 2,
  class: "user-input-content"
}, Cd = {
  key: 0,
  class: "user-input-prompt"
}, Td = {
  key: 1,
  class: "user-input-form"
}, Ed = ["onUpdate:modelValue", "onKeydown"], Ad = ["onClick", "disabled"], Rd = {
  key: 2,
  class: "user-input-submitted"
}, Id = {
  key: 0,
  class: "user-input-confirmation"
}, Od = {
  key: 3,
  class: "product-message-container"
}, Ld = ["innerHTML"], Pd = {
  key: 1,
  class: "products-carousel"
}, $d = { class: "carousel-items" }, Fd = {
  key: 0,
  class: "product-image-compact"
}, Nd = ["src", "alt"], Bd = { class: "product-info-compact" }, Md = { class: "product-text-area" }, Dd = { class: "product-title-compact" }, qd = {
  key: 0,
  class: "product-variant-compact"
}, Vd = { class: "product-price-compact" }, Hd = { class: "product-actions-compact" }, Ud = ["onClick"], jd = {
  key: 2,
  class: "no-products-message"
}, zd = {
  key: 3,
  class: "no-products-message"
}, Wd = ["innerHTML"], Kd = { class: "message-info" }, Zd = {
  key: 0,
  class: "agent-name"
}, Gd = {
  key: 0,
  class: "typing-indicator"
}, Yd = {
  key: 0,
  class: "email-input"
}, Jd = ["disabled"], Qd = { class: "message-input" }, Xd = ["placeholder", "disabled"], ep = ["disabled"], tp = { class: "conversation-ended-message" }, np = {
  key: 7,
  class: "rating-dialog"
}, sp = { class: "rating-content" }, rp = { class: "star-rating" }, ip = ["onClick"], op = { class: "rating-actions" }, lp = ["disabled"], Qs = "ctid", ap = /* @__PURE__ */ Fa({
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
    t.link = (_, y, d) => n.call(t, _, y, d).replace(/^<a /, '<a target="_blank" rel="nofollow" '), ue.use({ renderer: t });
    const s = e, r = qe(() => {
      var _;
      return s.widgetId || ((_ = window.__INITIAL_DATA__) == null ? void 0 : _.widgetId);
    }), {
      customization: i,
      agentName: o,
      applyCustomization: l,
      initializeFromData: a
    } = Jf(), {
      messages: u,
      loading: f,
      errorMessage: m,
      showError: b,
      loadingHistory: L,
      hasStartedChat: F,
      connectionStatus: D,
      sendMessage: we,
      loadChatHistory: te,
      connect: pe,
      reconnect: ge,
      cleanup: q,
      humanAgent: oe,
      onTakeover: Me,
      submitRating: fe,
      submitForm: je,
      currentForm: pt,
      getWorkflowState: Ze,
      proceedWorkflow: gt,
      onWorkflowState: wt,
      onWorkflowProceeded: et
    } = Wf(), Ve = de(""), Ht = de(!0), ne = de(""), ee = de(!1), se = (_) => {
      const y = _.target;
      Ve.value = y.value;
    };
    let M = null;
    const ke = () => {
      M && M.disconnect(), M = new MutationObserver((y) => {
        let d = !1, Z = !1;
        y.forEach((ve) => {
          if (ve.type === "childList") {
            const Y = Array.from(ve.addedNodes).some(
              (Ge) => {
                var zt;
                return Ge.nodeType === Node.ELEMENT_NODE && (Ge.matches("input, textarea") || ((zt = Ge.querySelector) == null ? void 0 : zt.call(Ge, "input, textarea")));
              }
            ), Te = Array.from(ve.removedNodes).some(
              (Ge) => {
                var zt;
                return Ge.nodeType === Node.ELEMENT_NODE && (Ge.matches("input, textarea") || ((zt = Ge.querySelector) == null ? void 0 : zt.call(Ge, "input, textarea")));
              }
            );
            Y && (Z = !0, d = !0), Te && (d = !0);
          }
        }), d && (clearTimeout(ke.timeoutId), ke.timeoutId = setTimeout(() => {
          Ce();
        }, Z ? 50 : 100));
      });
      const _ = document.querySelector(".widget-container") || document.body;
      M.observe(_, {
        childList: !0,
        subtree: !0
      });
    };
    ke.timeoutId = null;
    let W = [];
    const Ce = () => {
      mt();
      const _ = [
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
      let y = [];
      for (const d of _) {
        const Z = document.querySelectorAll(d);
        if (Z.length > 0) {
          y = Array.from(Z);
          break;
        }
      }
      y.length !== 0 && (W = y, y.forEach((d) => {
        d.addEventListener("input", _t, !0), d.addEventListener("keyup", _t, !0), d.addEventListener("change", _t, !0), d.addEventListener("keypress", sn, !0), d.addEventListener("keydown", kt, !0);
      }));
    }, mt = () => {
      W.forEach((_) => {
        _.removeEventListener("input", _t), _.removeEventListener("keyup", _t), _.removeEventListener("change", _t), _.removeEventListener("keypress", sn), _.removeEventListener("keydown", kt);
      }), W = [];
    }, _t = (_) => {
      const y = _.target;
      Ve.value = y.value;
    }, sn = (_) => {
      _.key === "Enter" && !_.shiftKey && (_.preventDefault(), _.stopPropagation(), O());
    }, kt = (_) => {
      _.key === "Enter" && !_.shiftKey && (_.preventDefault(), _.stopPropagation(), O());
    }, ct = de(!0), rt = de(((ti = window.__INITIAL_DATA__) == null ? void 0 : ti.initialToken) || localStorage.getItem(Qs));
    qe(() => !!rt.value), a();
    const tt = window.__INITIAL_DATA__;
    console.log("Initial data:", tt), tt != null && tt.initialToken && (rt.value = tt.initialToken, window.parent.postMessage({
      type: "TOKEN_UPDATE",
      token: tt.initialToken
    }, "*"), ee.value = !0);
    const it = de(null), {
      chatStyles: Ut,
      chatIconStyles: h,
      agentBubbleStyles: g,
      userBubbleStyles: w,
      messageNameStyles: T,
      headerBorderStyles: S,
      photoUrl: C,
      shadowStyle: N
    } = Ju(i);
    qe(() => u.value.some(
      (_) => _.message_type === "form" && (!_.isSubmitted || _.isSubmitted === !1)
    ));
    const I = qe(() => {
      var _;
      return F.value && ee.value || ut.value ? D.value === "connected" && !f.value : Tn(ne.value.trim()) && D.value === "connected" && !f.value || ((_ = window.__INITIAL_DATA__) == null ? void 0 : _.workflow);
    }), O = async () => {
      if (!Ve.value.trim()) return;
      !F.value && ne.value && await j(), await we(Ve.value, ne.value), Ve.value = "";
      const _ = document.querySelector('input[placeholder*="Type a message"]');
      _ && (_.value = ""), setTimeout(() => {
        Ce();
      }, 500);
    }, E = (_) => {
      _.key === "Enter" && !_.shiftKey && (_.preventDefault(), _.stopPropagation(), O());
    }, j = async () => {
      var _, y, d;
      try {
        if (!r.value)
          return console.error("Widget ID is not available"), !1;
        const Z = new URL(`${bs.API_URL}/widgets/${r.value}`);
        ne.value.trim() && Tn(ne.value.trim()) && Z.searchParams.append("email", ne.value.trim());
        const ve = {
          Accept: "application/json",
          "Content-Type": "application/json"
        };
        rt.value && (ve.Authorization = `Bearer ${rt.value}`);
        const Y = await fetch(Z, {
          headers: ve
        });
        if (Y.status === 401)
          return ee.value = !1, !1;
        const Te = await Y.json();
        return Te.token && (rt.value = Te.token, localStorage.setItem(Qs, Te.token), window.parent.postMessage({ type: "TOKEN_UPDATE", token: Te.token }, "*")), ee.value = !0, await pe() ? (await B(), (_ = Te.agent) != null && _.customization && l(Te.agent.customization), Te.agent && !(Te != null && Te.human_agent) && (o.value = Te.agent.name), Te != null && Te.human_agent && (oe.value = Te.human_agent), ((y = Te.agent) == null ? void 0 : y.workflow) !== void 0 && (window.__INITIAL_DATA__ = window.__INITIAL_DATA__ || {}, window.__INITIAL_DATA__.workflow = Te.agent.workflow), (d = Te.agent) != null && d.workflow && (console.log("Getting workflow state after authorization"), await Ze()), !0) : (console.error("Failed to connect to chat service"), !1);
      } catch (Z) {
        return console.error("Error checking authorization:", Z), ee.value = !1, !1;
      } finally {
        ct.value = !1;
      }
    }, B = async () => {
      !F.value && ee.value && (F.value = !0, await te());
    }, z = () => {
      it.value && (it.value.scrollTop = it.value.scrollHeight);
    };
    un(() => u.value, (_) => {
      Ao(() => {
        z();
      });
    }, { deep: !0 }), un(D, (_, y) => {
      _ === "connected" && y !== "connected" && setTimeout(Ce, 100);
    }), un(() => u.value.length, (_, y) => {
      _ > 0 && y === 0 && setTimeout(Ce, 100);
    }), un(() => u.value, (_) => {
      if (_.length > 0) {
        const y = _[_.length - 1];
        Oe(y);
      }
    }, { deep: !0 });
    const K = async () => {
      await ge() && await j();
    }, X = de(!1), he = de(0), re = de(""), De = de(""), ae = de(0), Ie = de(!1), c = de({}), p = de(!1), k = de({}), v = de(!1), A = de(null), V = de("Start Chat"), U = de(!1), G = de(null);
    qe(() => {
      var y;
      const _ = u.value[u.value.length - 1];
      return ((y = _ == null ? void 0 : _.attributes) == null ? void 0 : y.request_rating) || !1;
    });
    const me = qe(() => {
      var y;
      if (!((y = window.__INITIAL_DATA__) != null && y.workflow))
        return !1;
      const _ = u.value.find((d) => d.message_type === "rating");
      return (_ == null ? void 0 : _.isSubmitted) === !0;
    }), Re = qe(() => oe.value.human_agent_profile_pic ? oe.value.human_agent_profile_pic.includes("amazonaws.com") ? oe.value.human_agent_profile_pic : `${bs.API_URL}${oe.value.human_agent_profile_pic}` : ""), Oe = (_) => {
      var y, d, Z;
      if ((y = _.attributes) != null && y.end_chat && ((d = _.attributes) != null && d.request_rating)) {
        const ve = _.agent_name || ((Z = oe.value) == null ? void 0 : Z.human_agent_name) || o.value || "our agent";
        u.value.push({
          message: `Rate the chat session that you had with ${ve}`,
          message_type: "rating",
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          session_id: _.session_id,
          agent_name: ve,
          showFeedback: !1
        }), De.value = _.session_id;
      }
    }, He = (_) => {
      Ie.value || (ae.value = _);
    }, ot = () => {
      if (!Ie.value) {
        const _ = u.value[u.value.length - 1];
        ae.value = (_ == null ? void 0 : _.selectedRating) || 0;
      }
    }, jt = async (_) => {
      if (!Ie.value) {
        ae.value = _;
        const y = u.value[u.value.length - 1];
        y && y.message_type === "rating" && (y.showFeedback = !0, y.selectedRating = _);
      }
    }, $s = async (_, y, d = null) => {
      try {
        Ie.value = !0, await fe(y, d);
        const Z = u.value.find((ve) => ve.message_type === "rating");
        Z && (Z.isSubmitted = !0, Z.finalRating = y, Z.finalFeedback = d);
      } catch (Z) {
        console.error("Failed to submit rating:", Z);
      } finally {
        Ie.value = !1;
      }
    }, Il = (_) => {
      const y = {};
      for (const d of _.fields) {
        const Z = c.value[d.name], ve = Fs(d, Z);
        ve && (y[d.name] = ve);
      }
      return k.value = y, Object.keys(y).length === 0;
    }, Ol = async (_) => {
      if (console.log("handleFormSubmit called with config:", _), console.log("Current form data:", c.value), console.log("isSubmittingForm:", p.value), p.value) {
        console.log("Form submission already in progress, returning");
        return;
      }
      console.log("Validating form...");
      const y = Il(_);
      if (console.log("Form validation result:", y), console.log("Form errors:", k.value), !y) {
        console.log("Form validation failed, not submitting");
        return;
      }
      try {
        console.log("Starting form submission..."), p.value = !0, await je(c.value), console.log("Form submitted successfully");
        const d = u.value.findIndex(
          (Z) => Z.message_type === "form" && (!Z.isSubmitted || Z.isSubmitted === !1)
        );
        d !== -1 && (u.value.splice(d, 1), console.log("Removed form message from chat")), c.value = {}, k.value = {}, console.log("Cleared form data and errors");
      } catch (d) {
        console.error("Failed to submit form:", d);
      } finally {
        p.value = !1, console.log("Form submission completed");
      }
    }, nt = (_, y) => {
      var d, Z;
      if (console.log(`Field change: ${_} = `, y), c.value[_] = y, console.log("Updated formData:", c.value), y && y.toString().trim() !== "") {
        let ve = null;
        if ((d = G.value) != null && d.fields && (ve = G.value.fields.find((Y) => Y.name === _)), !ve && ((Z = pt.value) != null && Z.fields) && (ve = pt.value.fields.find((Y) => Y.name === _)), ve) {
          const Y = Fs(ve, y);
          Y ? (k.value[_] = Y, console.log(`Validation error for ${_}:`, Y)) : (delete k.value[_], console.log(`Validation passed for ${_}`));
        }
      } else
        delete k.value[_], console.log(`Cleared error for ${_}`);
    }, Ll = (_) => {
      const y = _.replace(/\D/g, "");
      return y.length >= 7 && y.length <= 15;
    }, Fs = (_, y) => {
      if (_.required && (!y || y.toString().trim() === ""))
        return `${_.label} is required`;
      if (!y || y.toString().trim() === "")
        return null;
      if (_.type === "email" && !Tn(y))
        return "Please enter a valid email address";
      if (_.type === "tel" && !Ll(y))
        return "Please enter a valid phone number";
      if ((_.type === "text" || _.type === "textarea") && _.minLength && y.length < _.minLength)
        return `${_.label} must be at least ${_.minLength} characters`;
      if ((_.type === "text" || _.type === "textarea") && _.maxLength && y.length > _.maxLength)
        return `${_.label} must not exceed ${_.maxLength} characters`;
      if (_.type === "number") {
        const d = parseFloat(y);
        if (isNaN(d))
          return `${_.label} must be a valid number`;
        if (_.minLength && d < _.minLength)
          return `${_.label} must be at least ${_.minLength}`;
        if (_.maxLength && d > _.maxLength)
          return `${_.label} must not exceed ${_.maxLength}`;
      }
      return null;
    }, Pl = async () => {
      if (p.value || !G.value) {
        console.log("Already submitting or no form data, returning");
        return;
      }
      try {
        console.log("Starting full screen form submission..."), p.value = !0, k.value = {};
        let _ = !1;
        for (const y of G.value.fields || []) {
          const d = c.value[y.name], Z = Fs(y, d);
          Z && (k.value[y.name] = Z, _ = !0, console.log(`Validation error for field ${y.name}:`, Z));
        }
        if (console.log("Validation completed. Has errors:", _), console.log("Form errors:", k.value), _) {
          p.value = !1, console.log("Validation failed, not submitting");
          return;
        }
        console.log("Submitting form data:", c.value), await je(c.value), console.log("Full screen form submitted successfully"), U.value = !1, G.value = null, c.value = {}, console.log("Full screen form hidden and data cleared");
      } catch (_) {
        console.error("Failed to submit full screen form:", _);
      } finally {
        p.value = !1, console.log("Full screen form submission completed");
      }
    }, $l = (_) => {
      _ && window.parent.postMessage({
        type: "VIEW_PRODUCT",
        productId: _
      }, "*");
    }, Fl = (_) => _ ? _.replace(/https?:\/\/[^\s\)]+/g, "[link removed]") : "", Nl = async () => {
      try {
        v.value = !1, A.value = null, await gt();
      } catch (_) {
        console.error("Failed to proceed workflow:", _);
      }
    }, Ns = async (_) => {
      try {
        if (!_.userInputValue || !_.userInputValue.trim())
          return;
        const y = _.userInputValue.trim();
        _.isSubmitted = !0, _.submittedValue = y, await we(y, ne.value), console.log("User input submitted:", y);
      } catch (y) {
        console.error("Failed to submit user input:", y), _.isSubmitted = !1, _.submittedValue = null;
      }
    }, Xr = async () => {
      var _, y, d;
      try {
        let Z = 0;
        const ve = 50;
        for (; !((_ = window.__INITIAL_DATA__) != null && _.widgetId) && Z < ve; )
          await new Promise((Te) => setTimeout(Te, 100)), Z++;
        return (y = window.__INITIAL_DATA__) != null && y.widgetId ? await j() ? ((d = window.__INITIAL_DATA__) != null && d.workflow && ee.value && await Ze(), !0) : (console.log("$$$ isAuthorized false, setting connection status to connected"), D.value = "connected", !1) : (console.error("Widget data not available after waiting"), !1);
      } catch (Z) {
        return console.error("Failed to initialize widget:", Z), !1;
      }
    }, Bl = () => {
      Me(async () => {
        await j();
      }), window.addEventListener("message", (_) => {
        _.data.type === "SCROLL_TO_BOTTOM" && z(), _.data.type === "TOKEN_RECEIVED" && localStorage.setItem(Qs, _.data.token);
      }), wt((_) => {
        var y, d;
        if (console.log("Workflow state received in component:", _), console.log("Data type:", _.type), console.log("Form data:", _.form_data), V.value = _.button_text || "Start Chat", _.type === "landing_page")
          console.log("Setting landing page data:", _.landing_page_data), A.value = _.landing_page_data, v.value = !0, U.value = !1, console.log("Landing page state - show:", v.value, "data:", A.value);
        else if (_.type === "form" || _.type === "display_form")
          if (console.log("Form full screen flag:", (y = _.form_data) == null ? void 0 : y.form_full_screen), ((d = _.form_data) == null ? void 0 : d.form_full_screen) === !0)
            console.log("Setting full screen form data:", _.form_data), G.value = _.form_data, U.value = !0, v.value = !1, console.log("Full screen form state - show:", U.value);
          else {
            console.log("Regular form mode - adding form message to chat");
            const Z = {
              message: "",
              message_type: "form",
              attributes: {
                form_data: _.form_data
              },
              created_at: (/* @__PURE__ */ new Date()).toISOString(),
              isSubmitted: !1
            };
            u.value.findIndex(
              (Y) => Y.message_type === "form" && !Y.isSubmitted
            ) === -1 && u.value.push(Z), v.value = !1, U.value = !1;
          }
        else
          console.log("No special workflow state, hiding overlay forms"), v.value = !1, U.value = !1;
      }), et((_) => {
        console.log("Workflow proceeded:", _);
      });
    }, Ml = async () => {
      try {
        console.log("Starting new conversation - getting workflow state"), await Xr(), await Ze();
      } catch (_) {
        throw console.error("Failed to start new conversation:", _), _;
      }
    }, Dl = async () => {
      me.value = !1, u.value = [], await Ml();
    };
    No(async () => {
      await Xr(), Bl(), ke(), (() => {
        const y = u.value.length > 0, d = D.value === "connected", Z = document.querySelector('input[type="text"], textarea') !== null;
        return y || d || Z;
      })() && setTimeout(Ce, 100);
    }), Fr(() => {
      window.removeEventListener("message", (_) => {
        _.data.type === "SCROLL_TO_BOTTOM" && z();
      }), M && (M.disconnect(), M = null), ke.timeoutId && (clearTimeout(ke.timeoutId), ke.timeoutId = null), mt(), q();
    });
    const ut = qe(() => i.value.chat_style === "ASK_ANYTHING"), ql = qe(() => {
      const _ = {
        width: "100%",
        height: "580px",
        borderRadius: "var(--radius-lg)"
      };
      return ut.value ? {
        ..._,
        width: "100%",
        maxWidth: "800px",
        // Increased width for ASK_ANYTHING style
        minWidth: "600px"
        // Ensure minimum width
      } : _;
    }), ei = qe(() => ut.value && u.value.length === 0);
    return (_, y) => (P(), $("div", {
      class: Le(["chat-container", { collapsed: !Ht.value, "ask-anything-style": ut.value }]),
      style: Ee({ ...H(N), ...ql.value })
    }, [
      ct.value ? (P(), $("div", Qf, y[8] || (y[8] = [
        Ec('<div class="loading-spinner" data-v-e9a5dbdc><div class="dot" data-v-e9a5dbdc></div><div class="dot" data-v-e9a5dbdc></div><div class="dot" data-v-e9a5dbdc></div></div><div class="loading-text" data-v-e9a5dbdc>Initializing chat...</div>', 2)
      ]))) : ie("", !0),
      !ct.value && H(D) !== "connected" ? (P(), $("div", {
        key: 1,
        class: Le(["connection-status", H(D)])
      }, [
        H(D) === "connecting" ? (P(), $("div", Xf, y[9] || (y[9] = [
          yt(" Connecting to chat service... ", -1),
          x("div", { class: "loading-dots" }, [
            x("div", { class: "dot" }),
            x("div", { class: "dot" }),
            x("div", { class: "dot" })
          ], -1)
        ]))) : H(D) === "failed" ? (P(), $("div", eh, [
          y[10] || (y[10] = yt(" Connection failed. ", -1)),
          x("button", {
            onClick: K,
            class: "reconnect-button"
          }, " Click here to reconnect ")
        ])) : ie("", !0)
      ], 2)) : ie("", !0),
      H(b) ? (P(), $("div", {
        key: 2,
        class: "error-alert",
        style: Ee(H(h))
      }, ce(H(m)), 5)) : ie("", !0),
      ei.value ? (P(), $("div", {
        key: 3,
        class: "welcome-message-section",
        style: Ee(H(Ut))
      }, [
        x("div", th, [
          x("div", nh, [
            H(C) ? (P(), $("img", {
              key: 0,
              src: H(C),
              alt: H(o),
              class: "welcome-avatar"
            }, null, 8, sh)) : ie("", !0),
            x("h1", rh, ce(H(i).welcome_title || `Welcome to ${H(o)}`), 1),
            x("p", ih, ce(H(i).welcome_subtitle || "I'm here to help you with anything you need. What can I assist you with today?"), 1)
          ])
        ]),
        x("div", oh, [
          !H(F) && !ee.value && !ut.value ? (P(), $("div", lh, [
            rn(x("input", {
              "onUpdate:modelValue": y[0] || (y[0] = (d) => ne.value = d),
              type: "email",
              placeholder: "Enter your email address",
              disabled: H(f) || H(D) !== "connected",
              class: Le([{
                invalid: ne.value.trim() && !H(Tn)(ne.value.trim()),
                disabled: H(D) !== "connected"
              }, "welcome-email-input"])
            }, null, 10, ah), [
              [an, ne.value]
            ])
          ])) : ie("", !0),
          x("div", ch, [
            rn(x("input", {
              "onUpdate:modelValue": y[1] || (y[1] = (d) => Ve.value = d),
              type: "text",
              placeholder: I.value ? "Ask me anything..." : "Connecting...",
              onKeypress: E,
              onInput: se,
              onChange: se,
              disabled: !I.value,
              class: Le([{ disabled: !I.value }, "welcome-message-field"])
            }, null, 42, uh), [
              [an, Ve.value]
            ]),
            x("button", {
              class: "welcome-send-button",
              style: Ee(H(w)),
              onClick: O,
              disabled: !Ve.value.trim() || !I.value
            }, y[11] || (y[11] = [
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
            ]), 12, fh)
          ])
        ]),
        x("div", {
          class: "powered-by-welcome",
          style: Ee(H(T))
        }, y[12] || (y[12] = [
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
      ], 4)) : ie("", !0),
      v.value && A.value ? (P(), $("div", {
        key: 4,
        class: "landing-page-fullscreen",
        style: Ee(H(Ut))
      }, [
        x("div", hh, [
          x("div", dh, [
            x("h2", ph, ce(A.value.heading), 1),
            x("div", gh, ce(A.value.content), 1)
          ]),
          x("div", mh, [
            x("button", {
              class: "landing-page-button",
              onClick: Nl
            }, ce(V.value), 1)
          ])
        ]),
        x("div", {
          class: "powered-by-landing",
          style: Ee(H(T))
        }, y[13] || (y[13] = [
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
      ], 4)) : U.value && G.value ? (P(), $("div", {
        key: 5,
        class: "form-fullscreen",
        style: Ee(H(Ut))
      }, [
        x("div", _h, [
          G.value.title || G.value.description ? (P(), $("div", yh, [
            G.value.title ? (P(), $("h2", bh, ce(G.value.title), 1)) : ie("", !0),
            G.value.description ? (P(), $("p", vh, ce(G.value.description), 1)) : ie("", !0)
          ])) : ie("", !0),
          x("div", wh, [
            (P(!0), $(Fe, null, xt(G.value.fields, (d) => {
              var Z, ve;
              return P(), $("div", {
                key: d.name,
                class: "form-field"
              }, [
                x("label", {
                  for: `fullscreen-form-${d.name}`,
                  class: "field-label"
                }, [
                  yt(ce(d.label) + " ", 1),
                  d.required ? (P(), $("span", xh, "*")) : ie("", !0)
                ], 8, kh),
                d.type === "text" || d.type === "email" || d.type === "tel" ? (P(), $("input", {
                  key: 0,
                  id: `fullscreen-form-${d.name}`,
                  type: d.type,
                  placeholder: d.placeholder || "",
                  required: d.required,
                  minlength: d.minLength,
                  maxlength: d.maxLength,
                  value: c.value[d.name] || "",
                  onInput: (Y) => nt(d.name, Y.target.value),
                  onBlur: (Y) => nt(d.name, Y.target.value),
                  class: Le(["form-input", { error: k.value[d.name] }]),
                  autocomplete: d.type === "email" ? "email" : d.type === "tel" ? "tel" : "off",
                  inputmode: d.type === "tel" ? "tel" : d.type === "email" ? "email" : "text"
                }, null, 42, Sh)) : d.type === "number" ? (P(), $("input", {
                  key: 1,
                  id: `fullscreen-form-${d.name}`,
                  type: "number",
                  placeholder: d.placeholder || "",
                  required: d.required,
                  min: d.minLength,
                  max: d.maxLength,
                  value: c.value[d.name] || "",
                  onInput: (Y) => nt(d.name, Y.target.value),
                  class: Le(["form-input", { error: k.value[d.name] }])
                }, null, 42, Ch)) : d.type === "textarea" ? (P(), $("textarea", {
                  key: 2,
                  id: `fullscreen-form-${d.name}`,
                  placeholder: d.placeholder || "",
                  required: d.required,
                  minlength: d.minLength,
                  maxlength: d.maxLength,
                  value: c.value[d.name] || "",
                  onInput: (Y) => nt(d.name, Y.target.value),
                  class: Le(["form-textarea", { error: k.value[d.name] }]),
                  rows: "4"
                }, null, 42, Th)) : d.type === "select" ? (P(), $("select", {
                  key: 3,
                  id: `fullscreen-form-${d.name}`,
                  required: d.required,
                  value: c.value[d.name] || "",
                  onChange: (Y) => nt(d.name, Y.target.value),
                  class: Le(["form-select", { error: k.value[d.name] }])
                }, [
                  y[14] || (y[14] = x("option", { value: "" }, "Please select...", -1)),
                  (P(!0), $(Fe, null, xt((Z = d.options) == null ? void 0 : Z.split(`
`).filter((Y) => Y.trim()), (Y) => (P(), $("option", {
                    key: Y,
                    value: Y.trim()
                  }, ce(Y.trim()), 9, Ah))), 128))
                ], 42, Eh)) : d.type === "checkbox" ? (P(), $("label", Rh, [
                  x("input", {
                    id: `fullscreen-form-${d.name}`,
                    type: "checkbox",
                    required: d.required,
                    checked: c.value[d.name] || !1,
                    onChange: (Y) => nt(d.name, Y.target.checked),
                    class: "form-checkbox"
                  }, null, 40, Ih),
                  x("span", Oh, ce(d.label), 1)
                ])) : d.type === "radio" ? (P(), $("div", Lh, [
                  (P(!0), $(Fe, null, xt((ve = d.options) == null ? void 0 : ve.split(`
`).filter((Y) => Y.trim()), (Y) => (P(), $("label", {
                    key: Y,
                    class: "radio-field"
                  }, [
                    x("input", {
                      type: "radio",
                      name: `fullscreen-form-${d.name}`,
                      value: Y.trim(),
                      required: d.required,
                      checked: c.value[d.name] === Y.trim(),
                      onChange: (Te) => nt(d.name, Y.trim()),
                      class: "form-radio"
                    }, null, 40, Ph),
                    x("span", $h, ce(Y.trim()), 1)
                  ]))), 128))
                ])) : ie("", !0),
                k.value[d.name] ? (P(), $("div", Fh, ce(k.value[d.name]), 1)) : ie("", !0)
              ]);
            }), 128))
          ]),
          x("div", Nh, [
            x("button", {
              onClick: y[2] || (y[2] = () => {
                console.log("Submit button clicked!"), Pl();
              }),
              disabled: p.value,
              class: "submit-form-button",
              style: Ee(H(w))
            }, [
              p.value ? (P(), $("span", Mh, y[15] || (y[15] = [
                x("div", { class: "dot" }, null, -1),
                x("div", { class: "dot" }, null, -1),
                x("div", { class: "dot" }, null, -1)
              ]))) : (P(), $("span", Dh, ce(G.value.submit_button_text || "Submit"), 1))
            ], 12, Bh)
          ])
        ]),
        x("div", {
          class: "powered-by-landing",
          style: Ee(H(T))
        }, y[16] || (y[16] = [
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
      ], 4)) : ei.value ? ie("", !0) : (P(), $(Fe, { key: 6 }, [
        Ht.value ? (P(), $("div", {
          key: 0,
          class: Le(["chat-panel", { "ask-anything-chat": ut.value }]),
          style: Ee(H(Ut))
        }, [
          ut.value ? ie("", !0) : (P(), $("div", {
            key: 0,
            class: "chat-header",
            style: Ee(H(S))
          }, [
            x("div", qh, [
              Re.value || H(C) ? (P(), $("img", {
                key: 0,
                src: Re.value || H(C),
                alt: H(oe).human_agent_name || H(o),
                class: "header-avatar"
              }, null, 8, Vh)) : ie("", !0),
              x("div", Hh, [
                x("h3", {
                  style: Ee(H(T))
                }, ce(H(oe).human_agent_name || H(o)), 5),
                x("div", Uh, [
                  y[17] || (y[17] = x("span", { class: "status-indicator online" }, null, -1)),
                  x("span", {
                    class: "status-text",
                    style: Ee(H(T))
                  }, "Online", 4)
                ])
              ])
            ])
          ], 4)),
          H(L) ? (P(), $("div", jh, y[18] || (y[18] = [
            x("div", { class: "loading-spinner" }, [
              x("div", { class: "dot" }),
              x("div", { class: "dot" }),
              x("div", { class: "dot" })
            ], -1)
          ]))) : ie("", !0),
          x("div", {
            class: "chat-messages",
            ref_key: "messagesContainer",
            ref: it
          }, [
            (P(!0), $(Fe, null, xt(H(u), (d, Z) => {
              var ve, Y, Te, Ge, zt, ni, si, ri, ii, oi, li, ai, ci, ui, fi, hi, di;
              return P(), $("div", {
                key: Z,
                class: Le([
                  "message",
                  d.message_type === "bot" || d.message_type === "agent" ? "agent-message" : d.message_type === "system" ? "system-message" : d.message_type === "rating" ? "rating-message" : d.message_type === "form" ? "form-message" : d.message_type === "product" || d.shopify_output ? "product-message" : "user-message"
                ])
              }, [
                x("div", {
                  class: "message-bubble",
                  style: Ee(d.message_type === "system" || d.message_type === "rating" || d.message_type === "product" || d.shopify_output ? {} : d.message_type === "user" ? H(w) : H(g))
                }, [
                  d.message_type === "rating" ? (P(), $("div", zh, [
                    x("p", Wh, "Rate the chat session that you had with " + ce(d.agent_name || H(oe).human_agent_name || H(o) || "our agent"), 1),
                    x("div", {
                      class: Le(["star-rating", { submitted: Ie.value || d.isSubmitted }])
                    }, [
                      (P(), $(Fe, null, xt(5, (R) => x("button", {
                        key: R,
                        class: Le(["star-button", {
                          warning: R <= (d.isSubmitted ? d.finalRating : ae.value || d.selectedRating) && (d.isSubmitted ? d.finalRating : ae.value || d.selectedRating) <= 3,
                          success: R <= (d.isSubmitted ? d.finalRating : ae.value || d.selectedRating) && (d.isSubmitted ? d.finalRating : ae.value || d.selectedRating) > 3,
                          selected: R <= (d.isSubmitted ? d.finalRating : ae.value || d.selectedRating)
                        }]),
                        onMouseover: (Wt) => !d.isSubmitted && He(R),
                        onMouseleave: (Wt) => !d.isSubmitted && ot,
                        onClick: (Wt) => !d.isSubmitted && jt(R),
                        disabled: Ie.value || d.isSubmitted
                      }, " ★ ", 42, Kh)), 64))
                    ], 2),
                    d.showFeedback && !d.isSubmitted ? (P(), $("div", Zh, [
                      x("div", Gh, [
                        rn(x("input", {
                          "onUpdate:modelValue": (R) => d.feedback = R,
                          placeholder: "Please share your feedback (optional)",
                          disabled: Ie.value,
                          maxlength: "500",
                          class: "feedback-input"
                        }, null, 8, Yh), [
                          [an, d.feedback]
                        ]),
                        x("div", Jh, ce(((ve = d.feedback) == null ? void 0 : ve.length) || 0) + "/500", 1)
                      ]),
                      x("button", {
                        onClick: (R) => $s(d.session_id, ae.value, d.feedback),
                        disabled: Ie.value || !ae.value,
                        class: "submit-rating-button",
                        style: Ee({ backgroundColor: H(i).accent_color || "var(--primary-color)" })
                      }, ce(Ie.value ? "Submitting..." : "Submit Rating"), 13, Qh)
                    ])) : ie("", !0),
                    d.isSubmitted && d.finalFeedback ? (P(), $("div", Xh, [
                      x("div", ed, [
                        x("p", td, ce(d.finalFeedback), 1)
                      ])
                    ])) : d.isSubmitted ? (P(), $("div", nd, " Thank you for your rating! ")) : ie("", !0)
                  ])) : d.message_type === "form" ? (P(), $("div", sd, [
                    (Te = (Y = d.attributes) == null ? void 0 : Y.form_data) != null && Te.title || (zt = (Ge = d.attributes) == null ? void 0 : Ge.form_data) != null && zt.description ? (P(), $("div", rd, [
                      (si = (ni = d.attributes) == null ? void 0 : ni.form_data) != null && si.title ? (P(), $("h3", id, ce(d.attributes.form_data.title), 1)) : ie("", !0),
                      (ii = (ri = d.attributes) == null ? void 0 : ri.form_data) != null && ii.description ? (P(), $("p", od, ce(d.attributes.form_data.description), 1)) : ie("", !0)
                    ])) : ie("", !0),
                    x("div", ld, [
                      (P(!0), $(Fe, null, xt((li = (oi = d.attributes) == null ? void 0 : oi.form_data) == null ? void 0 : li.fields, (R) => {
                        var Wt, Bs;
                        return P(), $("div", {
                          key: R.name,
                          class: "form-field"
                        }, [
                          x("label", {
                            for: `form-${R.name}`,
                            class: "field-label"
                          }, [
                            yt(ce(R.label) + " ", 1),
                            R.required ? (P(), $("span", cd, "*")) : ie("", !0)
                          ], 8, ad),
                          R.type === "text" || R.type === "email" || R.type === "tel" ? (P(), $("input", {
                            key: 0,
                            id: `form-${R.name}`,
                            type: R.type,
                            placeholder: R.placeholder || "",
                            required: R.required,
                            minlength: R.minLength,
                            maxlength: R.maxLength,
                            value: c.value[R.name] || "",
                            onInput: (Pe) => nt(R.name, Pe.target.value),
                            onBlur: (Pe) => nt(R.name, Pe.target.value),
                            class: Le(["form-input", { error: k.value[R.name] }]),
                            disabled: p.value,
                            autocomplete: R.type === "email" ? "email" : R.type === "tel" ? "tel" : "off",
                            inputmode: R.type === "tel" ? "tel" : R.type === "email" ? "email" : "text"
                          }, null, 42, ud)) : R.type === "number" ? (P(), $("input", {
                            key: 1,
                            id: `form-${R.name}`,
                            type: "number",
                            placeholder: R.placeholder || "",
                            required: R.required,
                            min: R.min,
                            max: R.max,
                            value: c.value[R.name] || "",
                            onInput: (Pe) => nt(R.name, Pe.target.value),
                            class: Le(["form-input", { error: k.value[R.name] }]),
                            disabled: p.value
                          }, null, 42, fd)) : R.type === "textarea" ? (P(), $("textarea", {
                            key: 2,
                            id: `form-${R.name}`,
                            placeholder: R.placeholder || "",
                            required: R.required,
                            minlength: R.minLength,
                            maxlength: R.maxLength,
                            value: c.value[R.name] || "",
                            onInput: (Pe) => nt(R.name, Pe.target.value),
                            class: Le(["form-textarea", { error: k.value[R.name] }]),
                            disabled: p.value,
                            rows: "3"
                          }, null, 42, hd)) : R.type === "select" ? (P(), $("select", {
                            key: 3,
                            id: `form-${R.name}`,
                            required: R.required,
                            value: c.value[R.name] || "",
                            onChange: (Pe) => nt(R.name, Pe.target.value),
                            class: Le(["form-select", { error: k.value[R.name] }]),
                            disabled: p.value
                          }, [
                            y[19] || (y[19] = x("option", { value: "" }, "Select an option", -1)),
                            (P(!0), $(Fe, null, xt(((Wt = R.options) == null ? void 0 : Wt.split(",")) || [], (Pe) => (P(), $("option", {
                              key: Pe.trim(),
                              value: Pe.trim()
                            }, ce(Pe.trim()), 9, pd))), 128))
                          ], 42, dd)) : R.type === "checkbox" ? (P(), $("div", gd, [
                            x("input", {
                              id: `form-${R.name}`,
                              type: "checkbox",
                              checked: c.value[R.name] || !1,
                              onChange: (Pe) => nt(R.name, Pe.target.checked),
                              class: "form-checkbox",
                              disabled: p.value
                            }, null, 40, md),
                            x("label", {
                              for: `form-${R.name}`,
                              class: "checkbox-label"
                            }, ce(R.placeholder || R.label), 9, _d)
                          ])) : R.type === "radio" ? (P(), $("div", yd, [
                            (P(!0), $(Fe, null, xt(((Bs = R.options) == null ? void 0 : Bs.split(",")) || [], (Pe) => (P(), $("div", {
                              key: Pe.trim(),
                              class: "radio-option"
                            }, [
                              x("input", {
                                id: `form-${R.name}-${Pe.trim()}`,
                                name: `form-${R.name}`,
                                type: "radio",
                                value: Pe.trim(),
                                checked: c.value[R.name] === Pe.trim(),
                                onChange: (pp) => nt(R.name, Pe.trim()),
                                class: "form-radio",
                                disabled: p.value
                              }, null, 40, bd),
                              x("label", {
                                for: `form-${R.name}-${Pe.trim()}`,
                                class: "radio-label"
                              }, ce(Pe.trim()), 9, vd)
                            ]))), 128))
                          ])) : ie("", !0),
                          k.value[R.name] ? (P(), $("div", wd, ce(k.value[R.name]), 1)) : ie("", !0)
                        ]);
                      }), 128))
                    ]),
                    x("div", kd, [
                      x("button", {
                        onClick: () => {
                          var R;
                          console.log("Regular form submit button clicked!"), Ol((R = d.attributes) == null ? void 0 : R.form_data);
                        },
                        disabled: p.value,
                        class: "form-submit-button",
                        style: Ee(H(w))
                      }, ce(p.value ? "Submitting..." : ((ci = (ai = d.attributes) == null ? void 0 : ai.form_data) == null ? void 0 : ci.submit_button_text) || "Submit"), 13, xd)
                    ])
                  ])) : d.message_type === "user_input" ? (P(), $("div", Sd, [
                    (ui = d.attributes) != null && ui.prompt_message && d.attributes.prompt_message.trim() ? (P(), $("div", Cd, ce(d.attributes.prompt_message), 1)) : ie("", !0),
                    d.isSubmitted ? (P(), $("div", Rd, [
                      y[20] || (y[20] = x("strong", null, "Your input:", -1)),
                      yt(" " + ce(d.submittedValue) + " ", 1),
                      (fi = d.attributes) != null && fi.confirmation_message && d.attributes.confirmation_message.trim() ? (P(), $("div", Id, ce(d.attributes.confirmation_message), 1)) : ie("", !0)
                    ])) : (P(), $("div", Td, [
                      rn(x("textarea", {
                        "onUpdate:modelValue": (R) => d.userInputValue = R,
                        class: "user-input-textarea",
                        placeholder: "Type your message here...",
                        rows: "3",
                        onKeydown: [
                          Ui(Hi((R) => Ns(d), ["ctrl"]), ["enter"]),
                          Ui(Hi((R) => Ns(d), ["meta"]), ["enter"])
                        ]
                      }, null, 40, Ed), [
                        [an, d.userInputValue]
                      ]),
                      x("button", {
                        class: "user-input-submit-button",
                        onClick: (R) => Ns(d),
                        disabled: !d.userInputValue || !d.userInputValue.trim()
                      }, " Submit ", 8, Ad)
                    ]))
                  ])) : d.shopify_output || d.message_type === "product" ? (P(), $("div", Od, [
                    d.message ? (P(), $("div", {
                      key: 0,
                      innerHTML: H(ue)(Fl(d.message), { renderer: H(t) }),
                      class: "product-message-text"
                    }, null, 8, Ld)) : ie("", !0),
                    (hi = d.shopify_output) != null && hi.products && d.shopify_output.products.length > 0 ? (P(), $("div", Pd, [
                      y[22] || (y[22] = x("h3", { class: "carousel-title" }, "Products", -1)),
                      x("div", $d, [
                        (P(!0), $(Fe, null, xt(d.shopify_output.products, (R) => {
                          var Wt;
                          return P(), $("div", {
                            key: R.id,
                            class: "product-card-compact carousel-item"
                          }, [
                            (Wt = R.image) != null && Wt.src ? (P(), $("div", Fd, [
                              x("img", {
                                src: R.image.src,
                                alt: R.title,
                                class: "product-thumbnail"
                              }, null, 8, Nd)
                            ])) : ie("", !0),
                            x("div", Bd, [
                              x("div", Md, [
                                x("div", Dd, ce(R.title), 1),
                                R.variant_title && R.variant_title !== "Default Title" ? (P(), $("div", qd, ce(R.variant_title), 1)) : ie("", !0),
                                x("div", Vd, ce(R.price_formatted || `₹${R.price}`), 1)
                              ]),
                              x("div", Hd, [
                                x("button", {
                                  class: "view-details-button-compact",
                                  onClick: (Bs) => $l(R.id)
                                }, y[21] || (y[21] = [
                                  yt(" View product ", -1),
                                  x("span", { class: "external-link-icon" }, "↗", -1)
                                ]), 8, Ud)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])) : (di = d.shopify_output) != null && di.products && d.shopify_output.products.length === 0 ? (P(), $("div", jd, y[23] || (y[23] = [
                      x("p", null, "No products found.", -1)
                    ]))) : d.shopify_output && !d.shopify_output.products ? (P(), $("div", zd, y[24] || (y[24] = [
                      x("p", null, "No products to display.", -1)
                    ]))) : ie("", !0)
                  ])) : (P(), $("div", {
                    key: 4,
                    innerHTML: H(ue)(d.message, { renderer: H(t) })
                  }, null, 8, Wd))
                ], 4),
                x("div", Kd, [
                  d.message_type === "user" ? (P(), $("span", Zd, " You ")) : ie("", !0)
                ])
              ], 2);
            }), 128)),
            H(f) ? (P(), $("div", Gd, y[25] || (y[25] = [
              x("div", { class: "dot" }, null, -1),
              x("div", { class: "dot" }, null, -1),
              x("div", { class: "dot" }, null, -1)
            ]))) : ie("", !0)
          ], 512),
          me.value ? (P(), $("div", {
            key: 3,
            class: "new-conversation-section",
            style: Ee(H(g))
          }, [
            x("div", tp, [
              y[27] || (y[27] = x("p", { class: "ended-text" }, "This chat has ended.", -1)),
              x("button", {
                class: "start-new-conversation-button",
                style: Ee(H(w)),
                onClick: Dl
              }, " Click here to start a new conversation ", 4)
            ])
          ], 4)) : (P(), $("div", {
            key: 2,
            class: Le(["chat-input", { "ask-anything-input": ut.value }]),
            style: Ee(H(g))
          }, [
            !H(F) && !ee.value && !ut.value ? (P(), $("div", Yd, [
              rn(x("input", {
                "onUpdate:modelValue": y[3] || (y[3] = (d) => ne.value = d),
                type: "email",
                placeholder: "Enter your email address to begin",
                disabled: H(f) || H(D) !== "connected",
                class: Le({
                  invalid: ne.value.trim() && !H(Tn)(ne.value.trim()),
                  disabled: H(D) !== "connected"
                })
              }, null, 10, Jd), [
                [an, ne.value]
              ])
            ])) : ie("", !0),
            x("div", Qd, [
              rn(x("input", {
                "onUpdate:modelValue": y[4] || (y[4] = (d) => Ve.value = d),
                type: "text",
                placeholder: I.value ? ut.value ? "Ask me anything..." : "Type a message..." : "Connecting...",
                onKeypress: E,
                onInput: se,
                onChange: se,
                disabled: !I.value,
                class: Le({ disabled: !I.value, "ask-anything-field": ut.value })
              }, null, 42, Xd), [
                [an, Ve.value]
              ]),
              x("button", {
                class: Le(["send-button", { "ask-anything-send": ut.value }]),
                style: Ee(H(w)),
                onClick: O,
                disabled: !Ve.value.trim() || !I.value
              }, y[26] || (y[26] = [
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
              ]), 14, ep)
            ])
          ], 6)),
          x("div", {
            class: "powered-by",
            style: Ee(H(T))
          }, y[28] || (y[28] = [
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
        ], 6)) : ie("", !0)
      ], 64)),
      X.value ? (P(), $("div", np, [
        x("div", sp, [
          y[29] || (y[29] = x("h3", null, "Rate your conversation", -1)),
          x("div", rp, [
            (P(), $(Fe, null, xt(5, (d) => x("button", {
              key: d,
              onClick: (Z) => he.value = d,
              class: Le([{ active: d <= he.value }, "star-button"])
            }, " ★ ", 10, ip)), 64))
          ]),
          rn(x("textarea", {
            "onUpdate:modelValue": y[5] || (y[5] = (d) => re.value = d),
            placeholder: "Additional feedback (optional)",
            class: "rating-feedback"
          }, null, 512), [
            [an, re.value]
          ]),
          x("div", op, [
            x("button", {
              onClick: y[6] || (y[6] = (d) => _.submitRating(he.value, re.value)),
              disabled: !he.value,
              class: "submit-button",
              style: Ee(H(w))
            }, " Submit ", 12, lp),
            x("button", {
              onClick: y[7] || (y[7] = (d) => X.value = !1),
              class: "skip-rating"
            }, " Skip ")
          ])
        ])
      ])) : ie("", !0)
    ], 6));
  }
}), cp = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, up = /* @__PURE__ */ cp(ap, [["__scopeId", "data-v-e9a5dbdc"]]);
window.process || (window.process = { env: { NODE_ENV: "production" } });
const fp = new URL(window.location.href), hp = fp.searchParams.get("widget_id"), dp = uu(up, {
  widgetId: hp
});
dp.mount("#app");
