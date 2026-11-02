"use client";

import { useEffect, useRef } from "react";

// One loop of the walk is drawn into a 360px-wide tile, about a phone's width, so the bars
// are the same width and the chart pans at the same speed on every screen.
// Enough tiles are placed side by side to cover a wide monitor; CSS slides them left by one tile and repeats.
const TILES = 10;

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
    // To pan without a visible seam, the walk is bent so it ends where it started.
    const drift = ys[n - 1] - ys[0];
    const loop = ys.map((v, i) => Math.max(40, Math.min(170, v - drift * i / (n - 1))));
    const step = W / n;
    let d = "", vols = "";
    for (let i = 0; i < n; i++) {
      const x = i * step;
      d += (i ? "L" : "M") + x.toFixed(1) + " " + loop[i].toFixed(1);
      vols += '<rect class="vol" x="' + (x - 3).toFixed(1) + '" y="' + (H - vhs[i]).toFixed(1) + '" width="5" height="' + vhs[i].toFixed(1) + '"/>';
    }
    d += "L" + W + " " + loop[0].toFixed(1);
    const tile = '<path class="ar" d="' + d + "L" + W + " " + H + "L0 " + H + 'Z"/>' + vols + '<path class="ln" d="' + d + '" vector-effect="non-scaling-stroke"/>';
    // Plain copies rather than <use>: the page's chart colors don't reach inside <use> clones.
    let tiles = "";
    for (let t = 0; t < TILES; t++) tiles += '<g transform="translate(' + t * W + ' 0)">' + tile + "</g>";
    svg.innerHTML = tiles;
  }, []);

  return <svg ref={ref} className="chart-bg" id="chartBg" viewBox={`0 0 ${TILES * 1200} 240`} preserveAspectRatio="none" aria-hidden="true" />;
}
