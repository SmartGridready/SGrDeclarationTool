import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/sections/shared/components/shadcn/card";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-4rem-3rem)] items-center justify-center ">
      <div className="w-full max-w-3xl">
        <Card className="border-border/50 bg-[#59b886]/5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">SmartGridready Wizard</CardTitle>
            <CardDescription className="mt-2 text-base">
              A quick introduction to the two core areas of this tool.
              <br />
              To start off select a device or functional profile Editor
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Link
                href="/devices"
                className="block rounded-lg border border-border/40 bg-white p-6 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
              >
                <h3 className="mb-1 text-lg font-semibold">Devices</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Edit or create Device EIDs
                </p>
              </Link>

              <Link
                href="/functional-profiles"
                className="block rounded-lg border border-border/40 bg-white p-6 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
              >
                <h3 className="mb-1 text-lg font-semibold">Functional Profiles</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Edit or create Functional Profiles
                </p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
