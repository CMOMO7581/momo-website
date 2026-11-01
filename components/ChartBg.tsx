"use client";

import { useEffect, useRef } from "react";

export function ChartBg() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Decorative chart: a seeded random walk, not real market data.
    const svg = ref.current;
    if (!svg) return;
    let seed = 7;
    function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
    const n = 120, W = 1200, H = 240, ys: number[] = [], vhs: number[] = [];
    let y = 150;
    for (let i = 0; i < n; i++) {
      y += (rnd() - 0.47) * 14; y = Math.max(40, Math.min(170, y));
      ys.push(y);
      vhs.push(8 + rnd() * 28);
    }
    // To pan without a visible seam, the walk is bent so it ends where it started,
    // then drawn twice side by side; CSS slides it left by one copy and repeats.
    const drift = ys[n - 1] - ys[0];
    const loop = ys.map((v, i) => Math.max(40, Math.min(170, v - drift * i / (n - 1))));
    const step = W / n;
    let d = "", vols = "";
    for (let i = 0; i < 2 * n; i++) {
      const x = i * step;
      d += (i ? "L" : "M") + x.toFixed(1) + " " + loop[i % n].toFixed(1);
      vols += '<rect class="vol" x="' + (x - 3).toFixed(1) + '" y="' + (H - vhs[i % n]).toFixed(1) + '" width="5" height="' + vhs[i % n].toFixed(1) + '"/>';
    }
    d += "L" + 2 * W + " " + loop[0].toFixed(1);
    svg.innerHTML = '<path class="ar" d="' + d + "L" + 2 * W + " " + H + "L0 " + H + 'Z"/>' + vols + '<path class="ln" d="' + d + '" vector-effect="non-scaling-stroke"/>';
  }, []);

  // Twice the masthead's width: the second half repeats the first.
  return <svg ref={ref} className="chart-bg" id="chartBg" viewBox="0 0 2400 240" preserveAspectRatio="none" aria-hidden="true" />;
}
