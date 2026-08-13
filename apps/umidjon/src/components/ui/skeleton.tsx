import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("skeleton rounded-lg", className)} />;
}

export function PageSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[88rem] px-5 pb-24 pt-32 sm:px-8">
      <div className="flex flex-col gap-6">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-12 w-full max-w-2xl" />
        <Skeleton className="h-5 w-full max-w-lg" />
      </div>

      <div className="mt-16 flex flex-col gap-10">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="grid gap-6 rounded-2xl border border-border p-4 md:grid-cols-[1.1fr_1fr]"
          >
            <Skeleton className="aspect-[16/10] w-full md:aspect-auto md:min-h-[16rem]" />
            <div className="flex flex-col gap-4 p-4">
              <Skeleton className="h-7 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <div className="mt-auto flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
