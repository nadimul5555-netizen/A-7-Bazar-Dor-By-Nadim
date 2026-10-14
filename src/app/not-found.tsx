import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f8fbf9] px-4 py-12 text-center text-[#303b32]">
      <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl">
        ⚠️
      </div>

      <h1 className="text-6xl font-extrabold text-[#07883f] sm:text-7xl">
        404
      </h1>

      <h2 className="mt-4 text-xl font-bold sm:text-2xl">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
        দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
        বাজার দর থেকে প্রয়োজনীয় পণ্যের দাম দেখতে হোম পেজে ফিরে যান।
      </p>

      <Link
        href="/"
        className="mt-7 inline-flex items-center justify-center rounded-lg bg-[#07883f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default NotFound;