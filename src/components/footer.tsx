import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t">
      <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
           <p className="text-sm font-headline text-muted-foreground">
             SYMBI0N – Humans • AI • Nature
           </p>
        </div>
        <div className="text-sm text-muted-foreground">
          © 2025 SYMBI0N Collective | Powered by SHUKA AI
        </div>
      </div>
    </footer>
  );
}
