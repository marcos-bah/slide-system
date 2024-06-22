"use client";

import { Mail, PresentationIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <nav className="w-full top-0 z-50 bg-white backdrop-blur text-black border-b-2">
      <div className="container h-14 max-w-screen-2xl flex items-center justify-between mx-auto">
        <div className="flex items-center text-lg font-medium">
          Slide System
        </div>
      </div>
    </nav>
  );
}
