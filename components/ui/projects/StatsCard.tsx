import type { ElementType } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  icon: ElementType;
  label: string;
  value: number;
}

export async function StatsCard({ icon: Icon, label, value }: StatsCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
