import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
    securityLevel: 'loose',
    fontFamily: 'sans-serif',
});

interface MermaidProps {
    chart: string;
}

const Mermaid = ({ chart }: MermaidProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const renderChart = async () => {
            if (containerRef.current) {
                try {
                    // Generate a unique ID for the SVG
                    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                    // Clear previous
                    containerRef.current.innerHTML = '';

                    // Render returns an object with 'svg' string
                    const { svg } = await mermaid.render(id, chart);
                    containerRef.current.innerHTML = svg;
                } catch (error) {
                    console.error('Mermaid rendering failed:', error);
                    if (containerRef.current) {
                        containerRef.current.innerHTML = '<p class="text-red-500 text-sm">Diagram failed to render</p>';
                    }
                }
            }
        };
        renderChart();
    }, [chart]);

    return <div className="mermaid flex justify-center w-full h-full items-center overflow-auto" ref={containerRef} />;
};

export default Mermaid;
