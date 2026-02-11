import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import { Logo } from "@/components/menu/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import pack from "../../../package.json";

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-8">
        <div>
          <Logo />
          <span className="text-xs leading-none">{pack.version}</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/devices">Devices</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/functional-profiles">Functional Profiles</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
