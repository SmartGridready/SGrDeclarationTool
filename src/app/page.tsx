import Link from "next/link";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/shadcn/card";
import { Logo } from "@/components/menu/logo";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex items-start justify-center pt-8">
      <div className="w-full max-w-3xl">
        <Card className="border-border/50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Logo />
            </div>
            <CardDescription className="mt-2 text-base">
              Create or edit device declarations and functional profiles for SmartGridready compliant systems.
              <br />
              Select an editor below to get started.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Link
                href="/devices"
                className="flex items-center justify-between rounded-lg border border-border/40 bg-card p-6 shadow-sm transition-shadow hover:shadow-md cursor-pointer group"
              >
                <div>
                  <h3 className="mb-1 text-lg font-semibold">Devices</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Edit or create Device EIDs</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/functional-profiles"
                className="flex items-center justify-between rounded-lg border border-border/40 bg-card p-6 shadow-sm transition-shadow hover:shadow-md cursor-pointer group"
              >
                <div>
                  <h3 className="mb-1 text-lg font-semibold">Functional Profiles</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Edit or create Functional Profiles</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
