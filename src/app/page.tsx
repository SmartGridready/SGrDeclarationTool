import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/card";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-4rem-3rem)] items-center justify-center ">
      <div className="w-full max-w-3xl">
        <Card className="border-border/50 bg-[#59b886]/5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">SmartGridready Declaration Tool</CardTitle>
            <CardDescription className="mt-2 text-base">
              Create or edit device declarations and functional profiles for SmartGridready
              compliant systems.
              <br />
              Select an editor below to get started.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Link
                href="/devices"
                className="block rounded-lg border border-border/40 bg-white p-6 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
              >
                <h3 className="mb-1 text-lg font-semibold">Product</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Edit or create Device EIDs
                </p>
              </Link>

              <Link
                href="/functional-profiles"
                className="block rounded-lg border border-border/40 bg-white p-6 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
              >
                <h3 className="mb-1 text-lg font-semibold">Functional Profile</h3>
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
