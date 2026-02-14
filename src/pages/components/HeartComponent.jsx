import React, { useEffect, useRef } from "react";

const HeartComponent = ({ className }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        };

        resize();
        window.addEventListener("resize", resize);

        const O = canvas.clientWidth;
        const Q = canvas.clientHeight;

        const e = [];
        const h = [];
        const M = Math;
        const R = M.random;
        const C = M.cos;
        const Y = 6.3;
        const v = 32;

        for (let i = 0; i < Y; i += 0.2) {
            h.push([
                O / 2 + 100 * M.pow(M.sin(i), 3),
                Q / 2 - 6 * (15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i)),
            ]);
        }

        for (let i = 0; i < v; i++) {
            const x = R() * O;
            const y = R() * Q;

            const f = [];
            for (let k = 0; k < v; k++) {
                f[k] = {
                    x,
                    y,
                    X: 0,
                    Y: 0,
                    R: 1 - k / v + 1,
                    S: R() + 1,
                    q: ~~(R() * v),
                    D: (i % 2) * 2 - 1,
                    F: R() * 0.2 + 0.7,
                    f: `hsla(0, 100%, 50%, 0.2)`,
                };
            }
            e[i] = f;
        }

        const render = (p) => {
            ctx.fillStyle = p.f;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.R, 0, Y, false);
            ctx.closePath();
            ctx.fill();
        };

        const loop = () => {
            ctx.clearRect(0, 0, O, Q);

            for (let i = v - 1; i >= 0; i--) {
                const f = e[i];
                const u = f[0];
                const q = h[u.q];
                const D = u.x - q[0];
                const E = u.y - q[1];
                const G = M.sqrt(D * D + E * E);

                if (G < 10) {
                    if (R() > 0.95) {
                        u.q = ~~(R() * v);
                    } else {
                        if (R() > 0.99) u.D *= -1;
                        u.q += u.D;
                        u.q %= v;
                        if (u.q < 0) u.q += v;
                    }
                }

                u.X += (-D / G) * u.S;
                u.Y += (-E / G) * u.S;

                u.x += u.X;
                u.y += u.Y;

                render(u);

                u.X *= u.F;
                u.Y *= u.F;

                for (let k = 0; k < v - 1; k++) {
                    const T = f[k];
                    const N = f[k + 1];
                    N.x -= (N.x - T.x) * 0.7;
                    N.y -= (N.y - T.y) * 0.7;
                    render(N);
                }
            }
        };

        const animate = () => {
            requestAnimationFrame(animate);
            loop();
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`${className || ""} absolute -top-3 left-0 w-full h-full pointer-events-none z-0`}
            style={{ backgroundColor: "transparent" }}
        />
    );
};

export default HeartComponent;
