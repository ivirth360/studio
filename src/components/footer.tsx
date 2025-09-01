import Link from "next/link";
import { Leaf } from "lucide-react";
import AiContentTool from "./ai-content-tool";

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t">
      <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SYMBI0N. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
            <AiContentTool />
        </div>
      </div>
    </footer>
  );
}
