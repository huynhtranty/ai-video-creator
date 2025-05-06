import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | VideoCut",
  description: "Login to your VideoCut account",
};

export default function LoginPage() {
  redirect("/");
}