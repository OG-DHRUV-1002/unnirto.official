"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── TYPES ─────────────────────────────────────────────
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulse: number;
  pulseSpeed: number;
  color: string;
  opacity: number;
  isHub: boolean;
}

interface DataDrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
  char: string;
  switchTimer: number;
}

interface CircuitPath {
  points: { x: number; y: number }[];
  progress: number;
  speed: number;
  color: string;
  width: number;
  delay: number;
  active: boolean;
}

interface EnergyOrb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color1: string;
  color2: string;
  phase: number;
  phaseSpeed: number;
}

interface HexCell {
  cx: number;
  cy: number;
  highlight: number;
  targetHighlight: number;
  delay: number;
}

// ─── CONSTANTS ─────────────────────────────────────────
const COLORS = {
  bronze: "#9E8A26",
  bronzeLight: "#B8A030",
  copper: "#CD7F32",
  olive: "#556B2F",
  oliveLight: "#6B7C45",
  obsidian: "#0F1117",
  grid: "rgba(158, 138, 38, 0.03)",
  gridBright: "rgba(158, 138, 38, 0.08)",
};

const DATA_CHARS = "01アイウエオカキクケコ{}[]<>=/+*&^%$#@!~ABCDEF0123456789";

// ─── COMPONENT ─────────────────────────────────────────
export default function TechVentureBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);

  // State refs to avoid re-renders
  const nodesRef = useRef<Node[]>([]);
  const dropsRef = useRef<DataDrop[]>([]);
  const circuitsRef = useRef<CircuitPath[]>([]);
  const orbsRef = useRef<EnergyOrb[]>([]);
  const hexCellsRef = useRef<HexCell[]>([]);

  const initScene = useCallback((w: number, h: number) => {
    // ── Neural Constellation Nodes ──
    const NODE_COUNT = Math.min(180, Math.floor((w * h) / 6000));
    const hubCount = Math.floor(NODE_COUNT * 0.08);
    nodesRef.current = Array.from({ length: NODE_COUNT }, (_, i) => {
      const isHub = i < hubCount;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (isHub ? 0.15 : 0.35),
        vy: (Math.random() - 0.5) * (isHub ? 0.15 : 0.35),
        radius: isHub ? Math.random() * 3 + 3 : Math.random() * 1.5 + 0.5,
        baseRadius: isHub ? Math.random() * 3 + 3 : Math.random() * 1.5 + 0.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: [COLORS.bronze, COLORS.copper, COLORS.olive, COLORS.oliveLight, COLORS.bronzeLight][
          Math.floor(Math.random() * 5)
        ],
        opacity: isHub ? 0.8 : Math.random() * 0.5 + 0.2,
        isHub,
      };
    });

    // ── Data Rain ──
    const RAIN_COUNT = Math.min(80, Math.floor(w / 20));
    dropsRef.current = Array.from({ length: RAIN_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speed: Math.random() * 2 + 0.5,
      length: Math.floor(Math.random() * 15) + 5,
      opacity: Math.random() * 0.3 + 0.05,
      char: DATA_CHARS[Math.floor(Math.random() * DATA_CHARS.length)],
      switchTimer: Math.random() * 100,
    }));

    // ── Circuit Traces ──
    const CIRCUIT_COUNT = Math.min(12, Math.floor(w / 150));
    circuitsRef.current = Array.from({ length: CIRCUIT_COUNT }, () => {
      const segCount = Math.floor(Math.random() * 5) + 3;
      const startX = Math.random() * w;
      const startY = Math.random() * h;
      const points = [{ x: startX, y: startY }];
      for (let s = 0; s < segCount; s++) {
        const last = points[points.length - 1];
        // Alternate between horizontal and vertical moves (circuit-board style)
        if (s % 2 === 0) {
          points.push({ x: last.x + (Math.random() - 0.5) * 300, y: last.y });
        } else {
          points.push({ x: last.x, y: last.y + (Math.random() - 0.5) * 200 });
        }
      }
      return {
        points,
        progress: 0,
        speed: Math.random() * 0.003 + 0.001,
        color: Math.random() > 0.5 ? COLORS.bronze : COLORS.olive,
        width: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 300,
        active: false,
      };
    });

    // ── Energy Orbs ──
    orbsRef.current = Array.from({ length: 6 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 150 + 100,
      color1: Math.random() > 0.5 ? COLORS.bronze : COLORS.olive,
      color2: Math.random() > 0.5 ? COLORS.copper : COLORS.oliveLight,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.005 + 0.002,
    }));

    // ── Hex Grid ──
    const hexSize = 40;
    const hexW = hexSize * Math.sqrt(3);
    const hexH = hexSize * 1.5;
    const cols = Math.ceil(w / hexW) + 1;
    const rows = Math.ceil(h / hexH) + 1;
    hexCellsRef.current = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cx = col * hexW + (row % 2 === 1 ? hexW / 2 : 0);
        const cy = row * hexH;
        hexCellsRef.current.push({
          cx,
          cy,
          highlight: 0,
          targetHighlight: 0,
          delay: Math.random() * 500,
        });
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initScene(w, h);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / w;
      mouseRef.current.y = e.clientY / h;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    // ── HEX HELPERS ──
    const drawHexagon = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    // ── DRAW FUNCTIONS ──

    const drawPerspectiveGrid = (time: number) => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const vanishX = w * (0.5 + (mx - 0.5) * 0.15);
      const vanishY = h * (0.35 + (my - 0.5) * 0.1);
      const gridOffset = (time * 0.5) % 60;

      // Horizontal lines going to horizon
      ctx.save();
      for (let i = 0; i < 30; i++) {
        const t = (i + gridOffset / 60) / 30;
        const yy = vanishY + (h - vanishY) * t * t;
        const spread = (yy - vanishY) / (h - vanishY);
        const alpha = spread * 0.06;

        ctx.beginPath();
        ctx.moveTo(vanishX - w * spread * 1.5, yy);
        ctx.lineTo(vanishX + w * spread * 1.5, yy);
        ctx.strokeStyle = `rgba(158, 138, 38, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Vertical converging lines
      for (let i = -15; i <= 15; i++) {
        const alpha = (1 - Math.abs(i) / 15) * 0.04;
        ctx.beginPath();
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(vanishX + i * 80, h + 50);
        ctx.strokeStyle = `rgba(158, 138, 38, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawNeuralConstellation = (time: number) => {
      const nodes = nodesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const CONNECTION_DIST = 180;
      const HUB_CONNECTION_DIST = 280;

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;
        node.radius = node.baseRadius + Math.sin(node.pulse) * (node.isHub ? 1.5 : 0.3);

        // Parallax shift
        const px = (mx - 0.5) * (node.isHub ? 15 : 8);
        const py = (my - 0.5) * (node.isHub ? 15 : 8);

        // Boundary bounce
        if (node.x + px < -50) node.vx = Math.abs(node.vx);
        if (node.x + px > w + 50) node.vx = -Math.abs(node.vx);
        if (node.y + py < -50) node.vy = Math.abs(node.vy);
        if (node.y + py > h + 50) node.vy = -Math.abs(node.vy);
      }

      // Draw connections
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ax = a.x + (mx - 0.5) * (a.isHub ? 15 : 8);
        const ay = a.y + (my - 0.5) * (a.isHub ? 15 : 8);
        const maxDist = a.isHub ? HUB_CONNECTION_DIST : CONNECTION_DIST;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const bx = b.x + (mx - 0.5) * (b.isHub ? 15 : 8);
          const by = b.y + (my - 0.5) * (b.isHub ? 15 : 8);
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;

            // Data pulse traveling along the connection
            const pulsePos = ((time * 0.002 + i * 0.1) % 1);

            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);

            // Gradient line with pulse
            const grad = ctx.createLinearGradient(ax, ay, bx, by);
            const pulseAlpha = alpha * 2;
            grad.addColorStop(Math.max(0, pulsePos - 0.1), `rgba(158, 138, 38, ${alpha * 0.3})`);
            grad.addColorStop(pulsePos, `rgba(158, 138, 38, ${pulseAlpha})`);
            grad.addColorStop(Math.min(1, pulsePos + 0.1), `rgba(158, 138, 38, ${alpha * 0.3})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = a.isHub || b.isHub ? 1 : 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const nx = node.x + (mx - 0.5) * (node.isHub ? 15 : 8);
        const ny = node.y + (my - 0.5) * (node.isHub ? 15 : 8);

        if (node.isHub) {
          // Outer glow ring
          const glowGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, node.radius * 4);
          glowGrad.addColorStop(0, node.color + "30");
          glowGrad.addColorStop(1, "transparent");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(nx, ny, node.radius * 4, 0, Math.PI * 2);
          ctx.fill();

          // Pulsing ring
          const ringRadius = node.radius * 2 + Math.sin(node.pulse * 2) * 3;
          ctx.beginPath();
          ctx.arc(nx, ny, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = node.color + "20";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Core dot
        const dotGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, node.radius);
        dotGrad.addColorStop(0, node.color + "FF");
        dotGrad.addColorStop(0.5, node.color + "80");
        dotGrad.addColorStop(1, node.color + "00");
        ctx.fillStyle = dotGrad;
        ctx.beginPath();
        ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawCircuitTraces = (time: number) => {
      const circuits = circuitsRef.current;

      for (const circuit of circuits) {
        if (time < circuit.delay) continue;
        circuit.active = true;

        // Advance progress
        circuit.progress += circuit.speed;
        if (circuit.progress > 1.3) {
          circuit.progress = 0;
          // Regenerate path
          const startX = Math.random() * w;
          const startY = Math.random() * h;
          circuit.points = [{ x: startX, y: startY }];
          const segCount = Math.floor(Math.random() * 5) + 3;
          for (let s = 0; s < segCount; s++) {
            const last = circuit.points[circuit.points.length - 1];
            if (s % 2 === 0) {
              circuit.points.push({ x: last.x + (Math.random() - 0.5) * 300, y: last.y });
            } else {
              circuit.points.push({ x: last.x, y: last.y + (Math.random() - 0.5) * 200 });
            }
          }
        }

        if (!circuit.active) continue;

        const totalSegments = circuit.points.length - 1;
        const drawUpTo = circuit.progress * totalSegments;

        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let s = 0; s < totalSegments; s++) {
          if (s > drawUpTo) break;

          const from = circuit.points[s];
          const to = circuit.points[s + 1];
          const segProgress = Math.min(1, drawUpTo - s);

          const tx = from.x + (to.x - from.x) * segProgress;
          const ty = from.y + (to.y - from.y) * segProgress;

          // Trail glow
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(tx, ty);

          // Fade older segments
          const age = drawUpTo - s;
          const fadeAlpha = Math.max(0, 0.4 - age * 0.06);

          ctx.strokeStyle = circuit.color + Math.floor(fadeAlpha * 255).toString(16).padStart(2, "0");
          ctx.lineWidth = circuit.width;
          ctx.stroke();

          // Bright head
          if (s === Math.floor(drawUpTo)) {
            const headGrad = ctx.createRadialGradient(tx, ty, 0, tx, ty, 6);
            headGrad.addColorStop(0, circuit.color + "AA");
            headGrad.addColorStop(1, circuit.color + "00");
            ctx.fillStyle = headGrad;
            ctx.beginPath();
            ctx.arc(tx, ty, 6, 0, Math.PI * 2);
            ctx.fill();
          }

          // Junction dots
          if (segProgress >= 1) {
            ctx.fillStyle = circuit.color + "60";
            ctx.beginPath();
            ctx.arc(to.x, to.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      }
    };

    const drawDataRain = (time: number) => {
      const drops = dropsRef.current;
      ctx.save();
      ctx.font = "10px 'JetBrains Mono', monospace";

      for (const drop of drops) {
        drop.y += drop.speed;
        drop.switchTimer--;

        if (drop.switchTimer <= 0) {
          drop.char = DATA_CHARS[Math.floor(Math.random() * DATA_CHARS.length)];
          drop.switchTimer = Math.random() * 60 + 20;
        }

        if (drop.y > h + drop.length * 14) {
          drop.y = -drop.length * 14;
          drop.x = Math.random() * w;
          drop.opacity = Math.random() * 0.3 + 0.05;
        }

        // Draw trail of characters
        for (let c = 0; c < drop.length; c++) {
          const cy = drop.y - c * 14;
          if (cy < -14 || cy > h + 14) continue;

          const charAlpha = (1 - c / drop.length) * drop.opacity;
          const charIdx = (Math.floor(time * 0.1) + c) % DATA_CHARS.length;
          const ch = c === 0 ? drop.char : DATA_CHARS[charIdx];

          // Head character is brighter
          if (c === 0) {
            ctx.fillStyle = `rgba(158, 138, 38, ${charAlpha * 2.5})`;
            // Head glow
            ctx.shadowColor = COLORS.bronze;
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = c < 3
              ? `rgba(158, 138, 38, ${charAlpha})`
              : `rgba(85, 107, 47, ${charAlpha * 0.7})`;
            ctx.shadowBlur = 0;
          }

          ctx.fillText(ch, drop.x, cy);
        }
        ctx.shadowBlur = 0;
      }
      ctx.restore();
    };

    const drawEnergyOrbs = (_time: number) => {
      const orbs = orbsRef.current;

      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.phase += orb.phaseSpeed;

        // Soft boundary wrap
        if (orb.x < -orb.radius) orb.x = w + orb.radius;
        if (orb.x > w + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = h + orb.radius;
        if (orb.y > h + orb.radius) orb.y = -orb.radius;

        const breathe = 1 + Math.sin(orb.phase) * 0.15;
        const r = orb.radius * breathe;
        const alpha = 0.04 + Math.sin(orb.phase) * 0.02;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r);
        grad.addColorStop(0, orb.color1 + Math.floor(alpha * 255).toString(16).padStart(2, "0"));
        grad.addColorStop(0.5, orb.color2 + Math.floor(alpha * 128).toString(16).padStart(2, "0"));
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawHexGrid = (time: number) => {
      const cells = hexCellsRef.current;
      const hexSize = 40;

      // Randomly trigger highlights
      if (Math.random() < 0.02) {
        const idx = Math.floor(Math.random() * cells.length);
        cells[idx].targetHighlight = 1;
      }

      ctx.save();
      for (const cell of cells) {
        // Animate highlight
        if (cell.targetHighlight > cell.highlight) {
          cell.highlight += 0.05;
        } else if (cell.highlight > 0) {
          cell.highlight -= 0.01;
          cell.targetHighlight = 0;
        }

        const baseAlpha = 0.015;
        const highlightAlpha = cell.highlight * 0.08;
        const alpha = baseAlpha + highlightAlpha;

        if (alpha < 0.01) continue;

        drawHexagon(cell.cx, cell.cy, hexSize);
        ctx.strokeStyle = `rgba(158, 138, 38, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        if (cell.highlight > 0.3) {
          drawHexagon(cell.cx, cell.cy, hexSize);
          ctx.fillStyle = `rgba(158, 138, 38, ${cell.highlight * 0.03})`;
          ctx.fill();
        }
      }
      ctx.restore();
    };

    const drawScanline = (time: number) => {
      const scanY = (time * 0.8) % (h + 100) - 50;

      // Main scanline
      const scanGrad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      scanGrad.addColorStop(0, "transparent");
      scanGrad.addColorStop(0.5, "rgba(158, 138, 38, 0.06)");
      scanGrad.addColorStop(1, "transparent");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 30, w, 60);

      // Secondary faster scanline
      const scan2Y = (time * 1.8 + h * 0.4) % (h + 100) - 50;
      ctx.fillStyle = "rgba(85, 107, 47, 0.03)";
      ctx.fillRect(0, scan2Y - 1, w, 2);
    };

    const drawVignette = () => {
      // Corner vignette for cinematic depth
      const vigGrad = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.85);
      vigGrad.addColorStop(0, "transparent");
      vigGrad.addColorStop(1, "rgba(0, 0, 0, 0.4)");
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, w, h);
    };

    // ── MAIN LOOP ──
    let frameCount = 0;

    const animate = () => {
      frameCount++;
      timeRef.current++;
      const time = timeRef.current;

      // Clear with deep obsidian
      ctx.fillStyle = "#0A0C10";
      ctx.fillRect(0, 0, w, h);

      // Layer 1: Perspective Grid (deepest)
      drawPerspectiveGrid(time);

      // Layer 2: Hex Grid
      drawHexGrid(time);

      // Layer 3: Energy Orbs (ambient light blobs)
      drawEnergyOrbs(time);

      // Layer 4: Circuit Traces
      drawCircuitTraces(time);

      // Layer 5: Neural Constellation
      drawNeuralConstellation(time);

      // Layer 6: Data Rain
      drawDataRain(time);

      // Layer 7: Scan Effects
      drawScanline(time);

      // Layer 8: Vignette (topmost)
      drawVignette();

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [initScene]);

  return (
    <>
      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -50 }}
      />

      {/* CSS Overlays */}

      {/* Noise texture overlay for grit */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -20,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          mixBlendMode: "overlay",
          opacity: 0.5,
        }}
      />

      {/* Glitch line effect (occasional) */}
      <div className="tech-glitch-overlay" />

      {/* Top/Bottom gradient fade for content blending */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -15,
          background: `
            linear-gradient(180deg, 
              rgba(10, 12, 16, 0.3) 0%, 
              transparent 15%, 
              transparent 85%, 
              rgba(10, 12, 16, 0.5) 100%
            )
          `,
        }}
      />
    </>
  );
}
