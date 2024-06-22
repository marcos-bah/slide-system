import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";

export default function Upload() {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] bg-gray-100 dark:bg-gray-950">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Upload Slides
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Drag and drop your slide files or click to select.
            </p>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center h-48 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:border-gray-600 dark:hover:border-gray-500 dark:focus:ring-gray-500">
              <UploadIcon className="w-12 h-12 text-gray-400" />
              <span className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-50">
                Drop files here or click to upload
              </span>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Upload Slides
          </Button>
        </div>
      </div>
    </div>
  );
}

function UploadIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
