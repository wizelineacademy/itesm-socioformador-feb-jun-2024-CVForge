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

const MyApp = () => {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const file = '/pdf/q_learning_notes.pdf';

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
        <div className="w-full h-full flex flex-row overflow-hidden">
            <div className="w-2/3 flex justify-center overflow-y-scroll bg-bg">
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
            <div className="w-1/3 z-10">
                <InsightBar />
            </div>
        </div>
    );
}

export default MyApp;
