
"use client";

import { signOut, useSession } from "@/lib/auth-client";
import ProfileLogo from "@/assets/icons8-test-account-48.png";
import SignOutLogo from "@/assets/icons8-sign-out-48.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="container mx-auto min-h-screen px-3 py-6 text-[#27332a] sm:px-5 sm:py-8 md:px-6 md:py-10">
      <div className="mx-auto my-8 max-w-5xl sm:my-12 md:my-18">
        <div className="mb-5">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">আমার প্রোফাইল</h1>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>
        <div className="my-8 flex flex-col items-stretch justify-between gap-4 rounded-xl border border-[#e1e8e1] bg-[#fbfdfb] p-4 sm:my-10 sm:flex-row sm:items-center sm:p-5 md:my-12">
          <div className="flex w-full min-w-0 items-center gap-3">
            <Image
              src={session?.user.image || ProfileLogo}
              height={44}
              width={44}
              alt="User Logo"
              className="h-14 w-14 shrink-0 rounded-xl object-cover sm:h-16 sm:w-16 md:h-18 md:w-18"
            />
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-bold sm:text-xl md:text-2xl">{session?.user.name}</h2>
              <p className="truncate text-xs text-gray-500 sm:text-sm">{session?.user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-red-400 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 sm:w-auto sm:self-center"
          >
            <Image src={SignOutLogo} height={18} width={18} alt="Sign Out" />
            সাইন আউট
          </button>
        </div>
        <div className="mt-4 rounded-xl border border-[#e1e8e1] bg-[#fbfdfb] p-4 sm:p-5 md:p-6">
          <h2 className="text-xl font-bold sm:text-2xl">তথ্য</h2>
          <div className="mt-5">
            <label className="mb-2 block text-xs font-medium">নাম</label>
            <input
              type="text"
              defaultValue={session?.user.name || ""}
              placeholder="আপনার নাম লিখুন"
              className="h-11 w-full rounded-md border border-[#e1e8e1] bg-transparent px-3 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 sm:h-12"
            />
          </div>
          <button
            type="button"
            className="my-5 h-11 w-full rounded-md bg-[#07883f] text-xs font-medium text-white shadow-md transition hover:bg-green-700 sm:my-6 sm:h-12"
          >
            আপডেট
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

