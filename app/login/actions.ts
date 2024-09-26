"use server";
// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(data: { email: string; password: string }) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.log(error.message);
    return error.message;
  }

  return "Success";
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  // console.log(data)

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect("/map");
}