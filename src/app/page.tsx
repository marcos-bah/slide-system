"use client";

import React, { useEffect, useState } from "react";
import { fetchApi } from "./api/common/fecthApi";
import Header from "@/components/shared/Header";
import PDFViewer from "@/components/shared/PDFViewer";
import mqtt from 'mqtt';

 // mosquitto 
 const broker = 'broker.emqx.io';
 const port = 8083;
 const topic = "js/mqtt";
 const client_id = `mqttjs_ + ${Math.random().toString(16)}`;

 const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt', {
   clientId: client_id,
 });

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const broker = 'broker.emqx.io';
    const port = 8083;
    const topic = "js/mqtt";
    const client_id = `mqttjs_` + Math.random().toString(16);
    const client = mqtt.connect(`ws://${broker}:${port}/mqtt`, {
      clientId: client_id,
    });

    client.on('connect', () => {
      console.log('Conectado');
      client.subscribe(topic);
    });

    client.on('message', (topic: string, message: Buffer) => {
      setMessages(prevMessages => [...prevMessages, { text: message.toString() }]);
    });

    return () => {
      client.end(); // Desconecta o cliente quando o componente é desmontado
    };
  }, []); // Array de dependências vazio significa que isso roda apenas uma vez

  function sendMessage(message: string) {
    client.publish(topic, message);
  }

  const handleInputChange = (event:any) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    console.log('Enviando mensagem:', message);
    sendMessage(message);
    setMessage(''); // Limpar o input após enviar
  };

  return (
    <div className="bg-background bg-white text-black">
      <Header />
      <header className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <PDFViewer />
          <div className="w-full h-full mt-12">
            <h1 className="w-[400px] text-3xl font-bold tracking-tight text-gray-900">
              Chat
            </h1>
            <div className="h-[200px] flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 rounded-t-lg">
              {messages.map((message, index) => (
                <p key={index} className="break-words">{message.text}</p>
              ))}
            </div>
            <div className="p-4 bg-white">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                  value={message} // Vincular o estado ao valor do input
                  onChange={handleInputChange} // Atualizar o estado com cada mudança no input
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleSendMessage}>
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
