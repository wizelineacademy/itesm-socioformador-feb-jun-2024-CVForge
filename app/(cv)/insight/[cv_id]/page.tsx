"use client";

// Package imports
import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

// Component imports
import InsightBar from './InsightBar';

if (typeof window !== 'undefined') {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url
    ).toString();
}

const Insight = () => {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const file = '/pdf/q_learning_notes.pdf';

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
        <div className="w-full h-full flex flex-row overflow-hidden bg-bg">   
            <div className="w-[calc(100%_-_400px)] flex justify-center overflow-y-scroll">
                <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(
                        new Array(numPages),
                        (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1}
                                renderTextLayer={false} renderAnnotationLayer={false} 
                                className="my-10"/>
                        )
                    )}
                </Document>
            </div>
            <div className="absolute right-0 z-10">
                <InsightBar />
            </div>
        </div>
    );
}

export default Insight;
