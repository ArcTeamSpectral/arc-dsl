'use client';

import React from 'react';
import ArcGrid from '@/components/ArcGrid';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface ArcPuzzleCarouselProps {
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

const ArcPuzzleCarousel: React.FC<ArcPuzzleCarouselProps> = ({ puzzle }) => {
    const allExamples = [...puzzle.train, ...puzzle.test];

    return (
        <div className="md:hidden">
            <Carousel>
                <CarouselContent>
                    {allExamples.map((example, index) => (
                        <CarouselItem key={index}>
                            <div className="p-4">
                                <h3 className="text-center mb-2">
                                    {index < puzzle.train.length ? `Train ${index + 1}` : 'Test'}
                                </h3>
                                <div className="mb-4">
                                    <h4 className="text-center mb-2">Input</h4>
                                    <div className="flex justify-center">
                                        <ArcGrid grid={example.input} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-center mb-2">Output</h4>
                                    <div className="flex justify-center">
                                        <ArcGrid grid={example.output} />
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default ArcPuzzleCarousel;