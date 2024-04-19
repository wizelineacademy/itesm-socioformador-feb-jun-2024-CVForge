"use client";

import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

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
        <div>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} renderTextLayer={false} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
        </div>
    );
}

export default MyApp;
