"use client";

import { useSession, authClient } from "@/lib/auth-client";
import UserImage from "@/assets/icons8-test-account-48.png";
import signOutLogo from '@/assets/icons8-sign-out-48.png'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DropdownPage = () => {
  const { data: session, isPending } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে");
    setIsOpen(false);
    router.push("/");
    router.refresh();
  };

  if (isPending) return null;

  if (!session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/sign-in" className="text-sm font-medium hover:text-green-700">
          সাইন ইন
        </Link>
        <Link href="/sign-up" className="rounded-lg bg-green-700 px-4 py-2 text-sm text-white hover:bg-green-800">
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-gray-100"
      >
        <Image
          src={session.user.image || UserImage}
          alt="User Avatar"
          width={36}
          height={36}
          className="h-9 w-9 rounded-full object-cover"
        />
        <span className="max-w-24 truncate text-sm font-medium">
          {session.user.name}
        </span>
        <span className="text-xs text-gray-500">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-100 mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <Image
              src={session.user.image || UserImage}
              alt="User Avatar"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-gray-900">
                {session.user.name}
              </h2>
              <p className="truncate text-xs text-gray-500">
                {session.user.email}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <Link
              href="/Profile"
              onClick={() => setIsOpen(!isOpen)}
              className=" flex gap-2  rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
            >
               <Image
          src={session.user.image || UserImage}
          alt="User Avatar"
          width={36}
          height={36}
          
          
          className="h-5 w-5 rounded-full object-cover"
        /> আমার প্রোফাইল
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className=" flex gap-2 w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
                   <Image
          src={signOutLogo}
          alt="User Avatar"
          width={36}
          height={36}
          
          
          className="h-5 w-5 rounded-full object-cover"
        />
               সাইন আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownPage;