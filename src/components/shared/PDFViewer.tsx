"use client"

import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { Button } from '../ui/button';
import React from 'react';
import { fetchApi, fetchApiFile } from '@/app/api/common/fecthApi';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PDFViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const [data, setData] = React.useState<any>([]);

  React.useEffect(() => {
    fetchApiFile({
      url: 'http://127.0.0.1:8000/current_file',
      method: 'GET',
    }).then(response => response)
    .then(blob => {
      var file = new File([blob], "filename.pdf", {type: "application/pdf"});
      setData(file);
    })
      .catch((error) => console.error(error));
  }, []); 

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <Document file={data} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} height={500}  renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
      <div className='w-full flex items-center justify-between mt-2'>
        <Button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
          Anterior
        </Button>
        <span>
          {pageNumber} de {numPages}
        </span>
        <Button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>
          Próximo
        </Button>
      </div>
    </div>
  );
}