import { ref as X, onMounted as Y, watch as q, openBlock as D, createElementBlock as G } from "vue";
const v = (m) => {
  const r = {
    issue: [],
    trendField: {},
    extra: {}
  }, t = m.length - 1;
  for (let g = 1; g <= 10; g++)
    r.trendField[g] = Array.from({ length: 10 }, () => []), r.extra[g] = Array.from({ length: 10 }, () => ({
      total: 0,
      maxMissing: 0,
      averageMissing: 0,
      maxContinuous: 0
    }));
  const h = {};
  for (let g = 0; g <= t; g++) {
    r.issue.push(m[g].lotteryNum);
    for (let a = 0; a < 10; a++) {
      const u = m[t - g].results[a];
      for (let d = 0; d < 10; d++) {
        const l = r.trendField[a + 1][d], i = r.extra[a + 1][d];
        if (d + 1 === u)
          i.total += 1, l[l.length - 1] < 0 ? h[`${a + 1}${d}`] += 1 : h[`${a + 1}${d}`] = 1, l.push(-u), i.maxContinuous = Math.max(
            i.maxContinuous,
            h[`${a + 1}${d}`]
          );
        else {
          const x = l[l.length - 1];
          l.push(l.length === 0 || x < 0 ? 1 : x + 1);
        }
        t === g && (i.averageMissing = Math.round(m.length / (i.total + 1))), i.maxMissing = Math.max(i.maxMissing, l[l.length - 1]);
      }
    }
  }
  return r;
}, M = (m, c, r = 1) => {
  const t = m.getContext("2d"), h = 0, g = 0, a = 240, u = 200, d = 10, l = 100, i = 100, x = "#F5F5F5", S = "#fff", T = "#E7E7E7", z = "期号", N = [
    "冠军走势",
    "亚军走势",
    "第三名走势",
    "第四名走势",
    "第五名走势",
    "第六名走势",
    "第七名走势",
    "第八名走势",
    "第九名走势",
    "第十名走势"
  ], y = [
    { title: "出现总次数", value: "total" },
    { title: "平均遗漏值", value: "averageMissing" },
    { title: "最大遗漏值", value: "maxMissing" },
    { title: "最大连出值", value: "maxContinuous" }
  ], $ = "#63666F", k = "#1E8EF5", C = "40px", B = 2, P = "rgba(0, 0, 0, 0.10)", b = {};
  m.height = u + i * c.issue.length + i * y.length;
  const w = ({
    text: e,
    width: n,
    height: s,
    x: o,
    y: f,
    bgColor: I = "#fff",
    fontSize: R = "56px",
    heighlight: p = !1,
    fieldIndex: L,
    color: j = $,
    fontWeight: O = "400"
  }) => {
    t.beginPath(), t.rect(o, f, n, s), t.fillStyle = I, t.fill(), t.beginPath(), t.lineWidth = B, t.strokeStyle = P, t.moveTo(o + n - 0.5, f), t.lineTo(o + n - 0.5, f + s - 0.5), t.lineTo(o, f + s - 0.5), t.stroke(), p ? (() => {
      t.beginPath();
      const V = 40;
      t.fillStyle = "#F24848";
      const F = {
        x: o + l / 2,
        y: f + i / 2,
        text: e
      };
      t.arc(F.x, F.y, V, 0, Math.PI * 2), t.fill(), b[L] = F;
    })() : (() => {
      t.font = `${O} ${R} PingFang SC`, t.fillStyle = p ? "#fff" : j, t.textAlign = "center", t.textBaseline = "middle", t.fillText(e < 0 ? Math.abs(e) : e, o + n / 2, f + s / 2);
    })();
  }, E = () => {
    w({
      text: z,
      width: a,
      height: u,
      x: h,
      y: g,
      bgColor: x,
      fontSize: "40px",
      fontWeight: "500"
    });
    for (let e = 0; e < c.issue.length; e++)
      w({
        text: c.issue[e].slice(-5),
        width: a,
        height: i,
        x: h,
        y: u + e * i,
        bgColor: e % 2 === 0 ? S : x,
        fontSize: C
      });
  }, W = () => {
    w({
      text: N[r - 1],
      width: l * 10,
      height: i,
      x: a,
      y: g,
      bgColor: x,
      fontSize: C
    });
    for (let e = 1; e <= d; e++)
      w({
        text: e,
        width: l,
        height: i,
        x: a + l * (e - 1),
        y: i,
        bgColor: x,
        fontSize: C
      });
    for (let e = 0; e < c.trendField[r].length; e++) {
      const n = c.trendField[r][e];
      for (let s = 0; s < n.length; s++) {
        const o = n[s];
        w({
          text: o,
          width: l,
          height: i,
          x: a + l * e,
          y: u + i * (n.length - s - 1),
          bgColor: s % 2 === 0 ? x : S,
          fontSize: C,
          heighlight: o < 0,
          fieldIndex: s
        });
      }
    }
  }, _ = () => {
    t.strokeStyle = "#F24848", t.lineWidth = 4;
    const e = Object.keys(b).length;
    for (let n = 1; n < e; n++)
      t.beginPath(), t.moveTo(b[n].x, b[n].y), t.lineTo(b[n - 1].x, b[n - 1].y), t.stroke();
    for (let n = 0; n < e; n++)
      t.font = `400 ${C} PingFang SC`, t.fillStyle = "#fff", t.textAlign = "center", t.textBaseline = "middle", t.fillText(
        Math.abs(b[n].text),
        b[n].x,
        b[n].y
      );
  }, A = () => {
    for (let e = 0; e < c.trendField[r].length; e++) {
      const n = c.trendField[r][e];
      for (let s = n.length - 1; s >= 0; s--) {
        const o = n[s];
        if (o < 0)
          break;
        w({
          text: o,
          width: l,
          height: i,
          x: a + l * e,
          y: u + i * (n.length - s - 1),
          bgColor: T,
          fontSize: C,
          heighlight: o < 0,
          fieldIndex: s
        });
      }
    }
  }, H = () => {
    const e = c.issue.length, n = (o) => e % 2 === 0 ? o % 2 === 0 : o % 2 !== 0;
    for (let o = 0; o < y.length; o++)
      w({
        text: y[o].title,
        width: a,
        height: i,
        x: h,
        y: e * i + u + o * i,
        bgColor: n(o) ? S : x,
        fontSize: C,
        color: k
      });
    const s = c.extra[r];
    for (let o = 0; o < s.length; o++)
      for (let f = 0; f < y.length; f++)
        w({
          text: s[o][y[f].value],
          width: l,
          height: i,
          x: a + l * o,
          y: e * i + u + f * i,
          bgColor: n(f) ? S : x,
          fontSize: C,
          color: k
        });
  };
  E(), W(), A(), _(), H();
}, U = {
  __name: "champion",
  props: {
    data: Array,
    type: Number
  },
  setup(m) {
    const c = m, r = X(null);
    return Y(() => {
      const t = v(c.data), h = r.value;
      M(h, t, c.type);
    }), q(
      () => c.data,
      () => {
        const t = v(c.data), h = r.value;
        M(h, t, c.type);
      },
      { deep: !0 }
    ), (t, h) => (D(), G("canvas", {
      ref_key: "canvasRef",
      ref: r,
      width: "1240"
    }, null, 512));
  }
};
export {
  U as default
};
