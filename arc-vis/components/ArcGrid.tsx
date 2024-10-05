'use client';

import React, { useEffect, useRef } from 'react';

interface ArcGridProps {
    grid: number[][];
}

const ArcGrid: React.FC<ArcGridProps> = ({ grid }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const cellSize = 25; // Slightly larger squares
        const width = grid[0].length * cellSize;
        const height = grid.length * cellSize;

        canvas.width = width;
        canvas.height = height;

        const colorMap: { [key: number]: string } = {
            0: "#000000", // black
            1: "#0074d9", // blue
            2: "#ff4136", // red
            3: "#2ecc40", // green
            4: "#ffdc00", // yellow
            5: "#aaaaaa", // gray
            6: "#f012be", // fuchsia
            7: "#ff851b", // orange
            8: "#7fdbff", // teal
            9: "#870c25", // brown
        };

        // Fill background with dark grey
        ctx.fillStyle = '#333333';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        grid.forEach((row, i) => {
            row.forEach((cell, j) => {
                ctx.fillStyle = colorMap[cell] || '#CCCCCC';
                ctx.fillRect(
                    j * cellSize,
                    i * cellSize,
                    cellSize,
                    cellSize
                );
                // Draw faint lines
                ctx.strokeStyle = '#444444';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(
                    j * cellSize,
                    i * cellSize,
                    cellSize,
                    cellSize
                );
            });
        });
    }, [grid]);

    return <canvas ref={canvasRef} />;
};

export default ArcGrid;