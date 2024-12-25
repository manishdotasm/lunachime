import { Card, CardContent } from "@/components/ui/card";

export default function PlaceholderContent({ children }: { children: React.ReactNode }) {
  return (
    <Card className="rounded-lg border-none mt-6 h-full">
      <CardContent className="">
        <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">{children}</div>
      </CardContent>
    </Card>
  );
}
