import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProdutoSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[50px]" />
          <Skeleton className="h-4 w-[70px]" />
        </div>
      </CardFooter>
    </Card>
  );
}
