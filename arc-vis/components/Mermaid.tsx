'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose',
});

interface MermaidProps {
    chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
    const mermaidRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mermaidRef.current) {
            mermaid.contentLoaded();
        }
    }, [chart]);

    return (
        <div className="mermaid w-full h-full" ref={mermaidRef}>
            {chart}
        </div>
    );
};

export default Mermaid;