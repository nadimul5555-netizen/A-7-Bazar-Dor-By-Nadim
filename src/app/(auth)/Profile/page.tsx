"use client";

import { signOut, useSession } from "@/lib/auth-client";
import ProfileLogo from "@/assets/icons8-test-account-48.png";
import SignOutLogo from "@/assets/icons8-sign-out-48.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="container mx-auto min-h-screen px-4 py-10 text-[#27332a]">
      <div className=" mx-auto max-w-5xl my-18">
        <div className="mb-5">
          <h1 className="text-2xl font-bold tracking-tight">আমার প্রোফাইল</h1>
          <p className="mt-1 text-xs text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>
        <div className=" my-12 flex flex-col items-center justify-between gap-4 rounded-xl border border-[#e1e8e1] bg-[#fbfdfb] p-5 sm:flex-row">
          <div className="flex w-full min-w-0 items-center gap-3">
            <Image
              src={session?.user.image || ProfileLogo}
              height={44}
              width={44}
              alt="User Logo"
              className="h-18 w-18 shrink-0 rounded-xl object-cover "
            />
            <div className="min-w-0">
              <h2 className="truncate text-2xl font-bold">{session?.user.name}</h2>
              <p className="truncate  text-gray-500">{session?.user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-red-400 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
          >
            <Image src={SignOutLogo} height={18} width={18} alt="Sign Out" />
            সাইন আউট
          </button>
        </div>
        <div className="mt-4 rounded-xl border border-[#e1e8e1] bg-[#fbfdfb] p-5 sm:p-6">
          <h2 className="text-2xl font-bold">তথ্য</h2>
          <div className="mt-5">
            <label className="mb-2 block text-sx font-medium">নাম</label>
            <input
              type="text"
              defaultValue={session?.user.name || ""}
              placeholder="আপনার নাম লিখুন"
              className="h-12 w-full rounded-md border border-[#e1e8e1] bg-transparent px-3 text-sx outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
          </div>
          <button
            type="button"
            className="my-6 h-12 w-full rounded-md bg-[#07883f] text-xs font-medium text-white shadow-md transition hover:bg-green-700"
          >
            আপডেট
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;