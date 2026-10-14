"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  FieldGroup,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function SignInPage() {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const { data: resData, error } = await authClient.signIn.email({
      email: data.email as string,
      password: data.password as string,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    if (resData) {
      toast.success("Login Successfully");
      router.push("/");
    }
  };
  const signIn = async () => {
    const Data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center  px-4 pt-8 text-[#303b32]">
      <h1 className="text-2xl font-bold">সাইন ইন</h1>
      <p className="mt-1 text-center text-sm text-gray-500">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>
      <div className="mt-6 w-full max-w-[500px] rounded-2xl border border-[#e1e8e1] bg-[#fbfdfb] p-6">
        <Form className="w-full" onSubmit={onSubmit}>
          <FieldGroup className="gap-4">
            <TextField isRequired name="email" type="email">
              <Label className="mb-1 block text-sm font-medium">ইমেইল</Label>
              <Input
                className="h-10 w-full rounded-lg border border-[#e1e8e1] bg-transparent px-3 text-sm outline-none focus:border-green-600"
                placeholder="you@example.com"
              />
              <FieldError />
            </TextField>
            <TextField isRequired name="password" type="password">
              <Label className="mb-1 block text-sm font-medium">
                পাসওয়ার্ড
              </Label>
              <Input
                className="h-10 w-full rounded-lg border border-[#e1e8e1] bg-transparent px-3 text-sm outline-none focus:border-green-600"
                placeholder="কমপক্ষে ৮ অক্ষর"
              />
              <FieldError />
            </TextField>
          </FieldGroup>
          <Button
            type="submit"
            className="mt-4 h-10 w-full rounded-lg bg-[#07883f] text-sm font-semibold text-white shadow-md transition-colors hover:bg-green-700"
          >
            সাইন ইন
          </Button>
        </Form>
        <div className="my-4 flex items-center gap-3 text-xs text-gray-600">
          <span className="h-px flex-1 bg-[#e1e8e1]"></span>
          <span>অথবা</span>
          <span className="h-px flex-1 bg-[#e1e8e1]"></span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            onClick={signIn}
            className="h-auto min-h-11 w-full justify-center gap-2 rounded-lg px-3 py-3 text-sm whitespace-normal"
            variant="tertiary"
          >
            <Icon icon="devicon:google" className="shrink-0 text-lg" />
            <span>Google দিয়ে চালিয়ে যান</span>
          </Button>

          <Button
            className="h-auto min-h-11 w-full justify-center gap-2 rounded-lg px-3 py-3 text-sm whitespace-normal"
            variant="tertiary"
          >
            <Icon icon="mdi:facebook" className="shrink-0 text-lg" />
            <span>Facebook দিয়ে চালিয়ে যান</span>
          </Button>
        </div>

        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="font-medium text-[#07883f] hover:underline"
          >
            সাইন আপ করুন
          </button>
        </p>
      </div>
      <button
        type="button"
        onClick={() => router.push("/")}
        className="mt-5 text-sm text-gray-500 transition-colors hover:text-[#07883f]"
      >
        ← হোম পেজে ফিরে যান
      </button>
    </div>
  );
}

export default SignInPage;
