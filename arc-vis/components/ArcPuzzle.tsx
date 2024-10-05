'use client';

import React from 'react';
import ArcGrid from '@/components/ArcGrid';

interface ArcPuzzleProps {
    puzzle: {
        train: Array<{
            input: number[][];
            output: number[][];
        }>;
        test: Array<{
            input: number[][];
            output: number[][];
        }>;
    };
}

const ArcPuzzle: React.FC<ArcPuzzleProps> = ({ puzzle }) => {
    const allExamples = [...puzzle.train, ...puzzle.test];

    return (
        <div className="overflow-x-auto hidden md:block">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="p-4 text-left">Input</th>
                        {allExamples.map((_, index) => (
                            <th key={index} className="p-4 text-center">
                                {index < puzzle.train.length ? `Train ${index + 1}` : 'Test'}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-4 text-left">Input</td>
                        {allExamples.map((example, index) => (
                            <td key={index} className="p-4 text-center hover:bg-gray-100 transition-colors duration-200">
                                <div className="flex justify-center">
                                    <ArcGrid grid={example.input} />
                                </div>
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td className="p-4 text-left">Output</td>
                        {allExamples.map((example, index) => (
                            <td key={index} className="p-4 text-center hover:bg-gray-100 transition-colors duration-200">
                                <div className="flex justify-center">
                                    <ArcGrid grid={example.output} />
                                </div>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ArcPuzzle;
