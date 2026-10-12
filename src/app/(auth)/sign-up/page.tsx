"use client";

import { authClient } from "@/lib/auth-client";
import { Button, FieldError, FieldGroup, Form, IconCalendar, Input, Label, TextField, Toast } from "@heroui/react";
import {Icon} from "@iconify/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function SignUpPage() {
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    if(data.password !== data.confirmPassword){
      toast.error("Password do not match!")
      return ;
    }
    const { data:resData, error } = await authClient.signUp.email({
    name: data.name as string,
    email: data.email as string,
    password: data.password as string,

});
if(resData){
  toast.success(`${data.name} Your Account create Successfully`)
}
if(error){
  toast.error(error.message)
}
router.push("/")
  };

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center px-4 pt-8 text-[#303b32]">
      <h1 className="text-2xl my-5 font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mt-1 text-xs text-gray-500">নিজের বাজার যাত্রা শুরু করুন আর নির্ভরযোগ্য তথ্য পান।</p>
      <div className="mt-4 w-full max-w-[500px] rounded-xl border border-[#e1e8e1] bg-[#fbfdfb] p-5">
        <Form className="w-full" onSubmit={onSubmit}>
          <FieldGroup className="gap-3">
            <TextField isRequired name="name">
              <Label className="m-2 block text-sm font-bold">নাম</Label>
              <Input className=" mb-1.5 h-9 w-full rounded-md border border-[#e1e8e1] bg-transparent px-3 text-xs outline-none focus:border-green-600" placeholder=" নাদিমুল ইসলাম" />
              <FieldError />
            </TextField>
            <TextField isRequired name="email" type="email">
              <Label className="m-2 block text-sm font-bold">ইমেইল</Label>
              <Input className="h-9 w-full rounded-md border border-[#e1e8e1] bg-transparent px-3 text-xs outline-none focus:border-green-600" placeholder="you@example.com" />
              <FieldError />
            </TextField>
            <TextField isRequired name="password" type="password">
              <Label className="m-2 block text-sm font-bold">পাসওয়ার্ড</Label>
              <Input className="h-9 w-full rounded-md border border-[#e1e8e1] bg-transparent px-3 text-xs outline-none focus:border-green-600" placeholder="কমপক্ষে ৮ অক্ষর" />
              <FieldError />
            </TextField>
            <TextField isRequired name="confirmPassword" type="password">
              <Label className="m-2 block text-sm font-bold">পাসওয়ার্ড নিশ্চিত করুন</Label>
              <Input className="h-9 w-full rounded-md border border-[#e1e8e1] bg-transparent px-3 text-xs outline-none focus:border-green-600" placeholder="আবার লিখুন" />
              <FieldError />
            </TextField>
          </FieldGroup>
          <Button type="submit" className="mt-4 h-9 w-full rounded-md bg-[#07883f] text-xs font-semibold text-white shadow-md transition-colors hover:bg-green-700">অ্যাকাউন্ট তৈরি করুন</Button>
        </Form>
        <div className="my-4 flex items-center gap-3 text-xs text-gray-500">
          <span className="h-px flex-1 bg-[#e1e8e1]"></span>
          <span>অথবা</span>
          <span className="h-px flex-1 bg-[#e1e8e1]"></span>
        </div>
        <div className="grid grid-cols-2 gap-2">
           <Button className="w-full rounded-lg" variant="tertiary">
        <Icon icon="devicon:google" />
        Google দিয়ে চালিয়ে যান
      </Button>
        
            <Button className="w-full rounded-lg" variant="tertiary">
        <Icon icon="mdi:github" />
         GitHub দিয়ে চালিয়ে যান
      </Button>
        </div>
        <p className="mt-4 text-center text-xs text-gray-500">অ্যাকাউন্ট আছে? <button type="button" className="font-medium text-[#07883f] hover:underline">সাইন ইন করুন</button></p>
      </div>
      <p className="mt-4 text-xs text-gray-500">← পেছনে ফিরে যান</p>
    </div>
  );
}
export default SignUpPage;