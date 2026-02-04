import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slidesContent } from './slides';

import { slideDiagrams } from './diagrams';
import Mermaid from './components/Mermaid';

// Custom components will go here or be imported
const Slide = ({ slide, index, total }: { slide: any, index: number, total: number }) => {
    // Logic Layout
    // Check for table in markdown
    const isTable = slide.body.includes('| - |') || slide.body.includes('|---|');
    // Check for long text
    const isLongText = slide.body.length > 700;

    // Check for diagram
    // Check for diagram
    const diagramCode = slideDiagrams[slide.title];
    const hasDiagram = !!diagramCode;
    const hasCustomImage = !!slide.visualImage;

    // Use the pre-calculated flag or local heuristics
    // If diagram or custom image exists, force split view to show it
    const showImage = (!isTable && !isLongText && !slide.noImage) || hasDiagram || hasCustomImage;

    return (
        <div className="h-full w-full flex flex-col p-12 box-border relative">
            {/* Header */}
            <div className="mb-8 shrink-0">
                <h2 className="text-5xl font-bold text-[#333333] tracking-tight">{slide.title}</h2>
                <div className="w-24 h-1 bg-[#58A7D8] mt-4 rounded-full"></div>
            </div>

            <div className="flex-1 min-h-0 flex gap-12 items-start">
                {/* Content Area */}
                <div className={`h-full overflow-y-auto pr-4 ${showImage ? 'w-1/2' : 'w-full'} flex flex-col`}>
                    <div className="prose prose-xl max-w-none text-[#555555] prose-headings:text-[#333333] prose-strong:text-[#333333] prose-li:marker:text-[#58A7D8]">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                            ul: ({ node, ...props }) => <ul className="list-none space-y-4 pl-0" {...props} />,
                            li: ({ node, children, ...props }) => (
                                <li className="flex gap-3 items-start" {...props}>
                                    <span className="shrink-0 mt-3 w-3 h-3 rounded-full bg-[#58A7D8]"></span>
                                    <span>{children}</span>
                                </li>
                            ),
                            p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                            table: ({ node, ...props }) => <div className="overflow-x-auto"><table className="min-w-full border-collapse border border-gray-200 my-6 text-xl" {...props} /></div>,
                            thead: ({ node, ...props }) => <thead className="bg-gray-50" {...props} />,
                            th: ({ node, ...props }) => <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-[#333333]" {...props} />,
                            td: ({ node, ...props }) => <td className="border border-gray-200 px-4 py-3" {...props} />,
                        }}>
                            {slide.body}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* Right Visual Area: Diagram or Placeholder */}
                {showImage && (
                    <div className={`w-1/2 h-full rounded-2xl flex items-center justify-center relative overflow-hidden ${hasDiagram || hasCustomImage ? 'bg-gray-50 border border-gray-100' : ''}`}>
                        {hasDiagram ? (
                            <div className="w-full h-full p-6">
                                <Mermaid chart={diagramCode} />
                            </div>
                        ) : hasCustomImage ? (
                            <img
                                src={slide.visualImage}
                                alt={slide.title}
                                className="w-full h-full object-contain p-6"
                            />
                        ) : null}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="h-16 flex items-end justify-between mt-auto shrink-0 border-t border-gray-100 pt-6">
                <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">Enterprise Application Integration</div>
                <div className="flex items-center gap-4">
                    <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#58A7D8] transition-all duration-300" style={{ width: `${((index + 1) / total) * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-mono text-gray-400 min-w-[3rem] text-right">{index + 1} / {total}</span>
                </div>
            </div>
        </div>
    );
};

function App() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slidesContent.length - 1));
    const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.code === 'Space') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="w-full h-screen bg-white shadow-2xl overflow-hidden relative">
                <Slide slide={slidesContent[currentSlide]} index={currentSlide} total={slidesContent.length} />

                {/* Navigation Overlay Buttons */}
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100/50 transition-colors text-gray-400 hover:text-gray-600 disabled:opacity-0">
                    <ChevronLeft size={32} />
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100/50 transition-colors text-gray-400 hover:text-gray-600 disabled:opacity-0">
                    <ChevronRight size={32} />
                </button>
            </div>
        </div>
    )
}

export default App
