import Link from "next/link";
import { Leaf, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-card border-t">
      <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
           <p className="text-sm font-headline text-muted-foreground">
             SYMBI0N – Humans • AI • Nature
           </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Availability: Mon-Fri, 10am-6pm IST / 12:30am-8:30am EST</span>
            </div>
            <div className="hidden sm:block">|</div>
            <div>
                © 2025 SYMBI0N Collective | Powered by SHUKA AI
            </div>
        </div>
      </div>
    </footer>
  );
}
