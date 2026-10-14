

const FooterPage = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-[#f8fbf9]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-center text-xs text-[#303b32] sm:flex-row sm:gap-4 sm:px-6 sm:py-6 sm:text-left">
        <p className="text-sm ">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="text-sm">
          সকল দাম সংরক্ষিত; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;