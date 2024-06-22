"use client";

import React from "react";
import { fetchApi } from "./api/common/fecthApi";
import Header from "@/components/shared/Header";
import Image from "next/image";
import PDFViewer from "@/components/shared/PDFViewer";
import { MessageList, MessageType } from "react-chat-elements"

export default function Home() {
  const chats: MessageType[] = [
    {
      position: "right",
      type: "text",
      text: "Olá, como posso te ajudar?",
      date: new Date(),
      title: "Eu",
      status: "read",
      focus: false,
      forwarded: false,
      titleColor: "#8717ae",
      id: 1,
      notch: false,
      replyButton: false,
      retracted: false,
      removeButton: false,
    },
    {
      position: "left",
      type: "text",
      text: "Olá, gostaria de saber mais sobre o produto X",
      date: new Date(),
      title: "Cliente",
      status: "read",
      focus: false,
      forwarded: false,
      titleColor: "#8717ae",
      id: 2,
      notch: false,
      replyButton: false,
      retracted: false,
      removeButton: false,
    },
    {
      position: "right",
      type: "text",
      text: "Claro, o produto X é um produto de alta qualidade",
      date: new Date(),
      title: "Eu",
      status: "read",
      focus: false,
      forwarded: false,
      titleColor: "#8717ae",
      id: 3,
      notch: false,
      replyButton: false,
      retracted: false,
      removeButton: false,
    },
    {
      position: "left",
      type: "text",
      text: "Obrigado, vou comprar agora",
      date: new Date(),
      title: "Cliente",
      status: "read",
      focus: false,
      forwarded: false,
      titleColor: "#8717ae",
      id: 4,
      notch: false,
      replyButton: false,
      retracted: false,
      removeButton: false,
    },
  ];

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
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex items-start justify-between">
          <PDFViewer />
          <div className="w-[400px] h-full">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Chat
            </h1>
            <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={chats}
              referance={(el: any) => {
                console.log(el);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
