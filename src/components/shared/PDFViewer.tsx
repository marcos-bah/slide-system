"use client"

import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { Button } from '../ui/button';
import React from 'react';
import { fetchApi, fetchApiFile } from '@/app/api/common/fecthApi';
import axios, { AxiosResponse } from "axios";
import { on } from 'events';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const ws = new WebSocket('ws://localhost:8000/ws');

function listenWebSocket<T>(url: string, onMessage: (data: any) => void): Promise<void> {
  // verificar se o websocket já possui conexao aberta

  ws.onmessage = (event) => {
    onMessage(JSON.parse(event.data));
  };
  return Promise.resolve();
}

export default function PDFViewer() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  listenWebSocket('ws://localhost:8000/ws', onMessage => {
    if(onMessage.current_page){
      setPageNumber(onMessage.current_page);
    }
  });

  async function setPageNumberApi(newPageNumber: number) {
    try {
      fetchApi({
        url: 'http://127.0.0.1:8000/page',
        method: 'POST',
        body: {
          "page_number": newPageNumber,
        },
      }).then(response => {
        // setPageNumber(newPageNumber);
      })
    } catch (error) {
      console.error('Erro ao mudar a página:', error);
    }
  }

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
    <div className='flex flex-col items-center justify-between p-4'>
      <div className='h-[550px] w-full rounded border-2 border-gray-300 flex flex-col items-center justify-center'>
        <Document file={data} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} height={500}  renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      </div>
      <div className='w-full flex items-center justify-between mt-2'>
        <Button onClick={() => setPageNumberApi(pageNumber - 1)} disabled={pageNumber <= 1}>
          Anterior
        </Button>
        <span>
          {/* {pageNumber} de {numPages} */}
        </span>
        <Button onClick={() => setPageNumberApi(pageNumber + 1)} disabled={pageNumber >= numPages}>
          Próximo
        </Button>
      </div>
    </div>
  );
}