import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  iconBg,
  iconColor,
  className,
}) {
  return (
    <Card className={cn("border-gray-200", className)}>
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              iconBg
            )}
          >
            <Icon className={cn("w-6 h-6", iconColor)} />
          </div>
        </div>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-center text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

