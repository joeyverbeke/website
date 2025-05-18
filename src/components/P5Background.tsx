'use client';

import { useEffect, useRef } from 'react';

const NUM_LINES = 8;
const LINE_COLOR = '#8B0000';
const SPEED = 2;
const MAX_BOUNCES = 5;
const MARGIN = 1;

function randomBetween(p: any, minDeg: number, maxDeg: number) {
  // Returns a random angle in radians between minDeg and maxDeg
  return p.radians(p.random(minDeg, maxDeg));
}

export default function P5Background() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<any>(null);

  useEffect(() => {
    let p5: any;
    let lines: { x: number[]; y: number[]; t: number; angle: number; bounces: number }[] = [];
    let w = 0;
    let h = 0;

    const sketch = (p: any) => {
      p.setup = () => {
        w = p.windowWidth;
        h = p.windowHeight;
        p.createCanvas(w, h);
        p.background(0);
        lines = Array.from({ length: NUM_LINES }).map((_, i) => ({
          x: [0],
          y: [h],
          t: p.random(1000, 10000) + i * 1000,
          angle: randomBetween(p, 20, 160), // initial angle upward/rightward
          bounces: 0,
        }));
        p.stroke(LINE_COLOR);
        p.strokeWeight(3);
        p.noFill();
      };

      p.draw = () => {
        p.stroke(LINE_COLOR);
        for (let line of lines) {
          let lastX = line.x[line.x.length - 1];
          let lastY = line.y[line.y.length - 1];
          for (let i = 0; i < SPEED; i++) {
            line.t += 0.01;
            // Use noise to perturb the angle
            let noiseAngle = (p.noise(line.t, line.t * 0.5) - 0.5) * p.PI / 2;
            let angle = line.angle + noiseAngle;
            let step = 3 + p.noise(line.t * 0.5) * 2;
            let newX = lastX + Math.cos(angle) * step;
            let newY = lastY + Math.sin(angle) * step;

            // Bounce logic: if at edge, pick a new angle that moves away from the edge
            let bounced = false;
            let atLeft = newX < MARGIN;
            let atRight = newX > w - MARGIN;
            let atTop = newY < MARGIN;
            let atBottom = newY > h - MARGIN;

            if (atLeft && atTop) {
              // Top-left corner: only allow angles between 20° and 70° (down-right)
              line.angle = randomBetween(p, 20, 70);
              bounced = true;
              newX = MARGIN;
              newY = MARGIN;
            } else if (atRight && atTop) {
              // Top-right corner: only allow angles between 110° and 160° (down-left)
              line.angle = randomBetween(p, 110, 160);
              bounced = true;
              newX = w - MARGIN;
              newY = MARGIN;
            } else if (atLeft && atBottom) {
              // Bottom-left corner: only allow angles between 290° and 340° (up-right)
              line.angle = randomBetween(p, 290, 340);
              bounced = true;
              newX = MARGIN;
              newY = h - MARGIN;
            } else if (atRight && atBottom) {
              // Bottom-right corner: only allow angles between 200° and 250° (up-left)
              line.angle = randomBetween(p, 200, 250);
              bounced = true;
              newX = w - MARGIN;
              newY = h - MARGIN;
            } else if (atLeft) {
              // Left edge: only allow angles between -70° and 70° (rightward)
              line.angle = randomBetween(p, -70, 70);
              bounced = true;
              newX = MARGIN;
            } else if (atRight) {
              // Right edge: only allow angles between 110° and 250° (leftward)
              line.angle = randomBetween(p, 110, 250);
              bounced = true;
              newX = w - MARGIN;
            } else if (atTop) {
              // Top edge: only allow angles between 20° and 160° (downward)
              line.angle = randomBetween(p, 20, 160);
              bounced = true;
              newY = MARGIN;
            } else if (atBottom) {
              // Bottom edge: only allow angles between 200° and 340° (upward)
              line.angle = randomBetween(p, 200, 340);
              bounced = true;
              newY = h - MARGIN;
            }

            if (bounced) {
              line.bounces++;
              if (line.bounces > MAX_BOUNCES) {
                // If stuck, aim toward center
                const centerAngle = Math.atan2(h / 2 - newY, w / 2 - newX);
                line.angle = centerAngle + p.random(-p.PI / 4, p.PI / 4);
                line.bounces = 0;
              }
              continue;
            } else {
              line.bounces = 0;
            }

            line.x.push(newX);
            line.y.push(newY);
            lastX = newX;
            lastY = newY;
          }
          p.beginShape();
          for (let i = 0; i < line.x.length; i++) {
            p.vertex(line.x[i], line.y[i]);
          }
          p.endShape();
        }
      };

      p.windowResized = () => {
        try {
          const oldW = w;
          const oldH = h;
          w = p.windowWidth;
          h = p.windowHeight;
          p.resizeCanvas(w, h);
          p.background(0);
          // Scale all points proportionally
          for (let line of lines) {
            line.x = line.x.map((x) => (x / oldW) * w);
            line.y = line.y.map((y) => (y / oldH) * h);
          }
        } catch (e) {
          // Suppress Zod error
        }
      };
    };

    import('p5').then((module) => {
      p5 = module.default;
      p5Instance.current = new p5(sketch, sketchRef.current!);
    });

    return () => {
      p5Instance.current?.remove();
    };
  }, []);

  return (
    <div
      ref={sketchRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
} 