"use client";

import { useSession, authClient, signOut } from "@/lib/auth-client";
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

  if (isPending) return null;

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link href="/sign-in" className="text-xs font-medium hover:text-green-700 sm:text-sm">
          সাইন ইন
        </Link>
        <Link href="/sign-up" className="rounded-lg bg-green-700 px-3 py-2 text-xs text-white hover:bg-green-800 sm:px-4 sm:text-sm">
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-w-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex max-w-full items-center gap-2 rounded-lg p-1.5 transition hover:bg-gray-100 sm:p-2"
      >
        <Image
          src={session.user.image || UserImage}
          alt="User Avatar"
          width={36}
          height={36}
          className="h-8 w-8 shrink-0 rounded-full object-cover sm:h-9 sm:w-9"
        />
        <span className="max-w-20 truncate text-xs font-medium sm:max-w-24 sm:text-sm">
          {session.user.name}
        </span>
        <span className="shrink-0 text-xs text-gray-500">▼</span>
      </button>

      {isOpen && (
        <div className="absolute md:right-0 lg:right-0 top-full z-[100] mt-2 w-[min(16rem,calc(100vw-1.5rem))] rounded-2xl border border-gray-200 bg-white p-3 shadow-xl sm:p-4">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <Image
              src={session.user.image || UserImage}
              alt="User Avatar"
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-full object-cover"
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
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
            >
              <Image
                src={session.user.image || UserImage}
                alt="User Avatar"
                width={36}
                height={36}
                className="h-5 w-5 rounded-full object-cover"
              />
              আমার প্রোফাইল
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              <Image
                src={signOutLogo}
                alt="Sign Out"
                width={36}
                height={36}
                className="h-5 w-5 object-contain"
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

