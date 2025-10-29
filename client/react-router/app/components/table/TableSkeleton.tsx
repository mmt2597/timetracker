import { Skeleton } from "~/components/ui/skeleton";

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
  showHeader?: boolean;
}

export function TableSkeleton({ columns = 7, rows = 5, showHeader = false }: TableSkeletonProps) {
  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40 animate-pulse" />
            <Skeleton className="h-4 w-64 animate-pulse" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 animate-pulse" />
            <Skeleton className="h-9 w-28 animate-pulse" />
          </div>
        </div>
      )}

      {/* Table header skeleton */}
      <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {Array.from({ length: columns }).map((_, idx) => (
          <div key={`th-${idx}`} className="px-3 py-2">
            <Skeleton className="h-5 w-24 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Table body skeleton */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={`tr-${rowIdx}`}
          className="grid animate-pulse"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: columns }).map((_, colIdx) => (
            <div key={`td-${rowIdx}-${colIdx}`} className="px-3 py-2">
              <Skeleton className="h-6 w-full animate-pulse" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}