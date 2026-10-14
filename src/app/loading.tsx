const Loading = () => {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8 sm:px-6">
      {/* Heading Skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="mb-3 h-8 w-48 rounded-lg bg-gray-200"></div>
        <div className="h-4 w-64 max-w-full rounded bg-gray-200"></div>
      </div>

      {/* Product Cards Skeleton */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            {/* Product Image / Emoji */}
            <div className="mb-4 flex h-36 items-center justify-center rounded-xl bg-gray-100">
              <div className="h-16 w-16 rounded-full bg-gray-200"></div>
            </div>

            {/* Product Name */}
            <div className="mb-3 h-5 w-3/4 rounded bg-gray-200"></div>

            {/* Product Unit */}
            <div className="mb-4 h-4 w-1/3 rounded bg-gray-200"></div>

            {/* Price Section */}
            <div className="flex items-center justify-between gap-3">
              <div className="h-5 w-24 rounded bg-gray-200"></div>
              <div className="h-6 w-16 rounded-full bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;