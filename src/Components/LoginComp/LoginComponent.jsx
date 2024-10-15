"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import {useRouter } from "next/navigation";
import Cookie from "js-cookie"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaSpider } from "react-icons/fa";

const formSchema = z.object({
  email: z.string().min(5, {
    message: "Please enter a valid Email address.",
  }).email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const LoginComponent = () => {

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (value) => {
try {
    const url = new URLSearchParams(window.location.search)
    const callback = url.get('callback')
    setLoading(true);
    setError('');
    const result = await fetch("http://localhost:4000/login",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: value.email, password: value.password})
    })
    setLoading(false);
    if (result.ok) {
      let jsonRes = await result.json()
      if (!jsonRes.success) {
        setError(jsonRes.message);
      } else {
        Cookie.set('token', jsonRes.token)
        Cookie.set('name', jsonRes.name)
        router.push(`${callback? callback : '/'}`);
        router.refresh()
      }
    }else{
      setError(result.text)
    }
  } catch (error) {
  setError("Failed to Fetch Request")
  }
  };

  if (!mounted) {
    return <span className="loading loading-spinner loading-sm"></span>;
    ;
  }

  return (
    <div className="w-full max-w-[500px] h-auto px-3 py-4 rounded-lg shadow-2xl mb-32">
      <h1 className='text-2xl sm:text-3xl text-center my-4 font-semibold'>Please Login</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" loading={loading} className="w-full my-2">
            {loading ? 'Logging in..' : 'Login'}
          </Button>
          <p>Don&apos;t have an account? <Link href={'/signup'} className="text-primary font-bold text-base">Sign Up</Link></p>
        </form>
        {error && <div className="error text-red-600 font-bold my-3 flex items-center gap-x-3"><FaSpider /><p>  {error}</p></div>}
      </Form>
    </div>
  );
};

export default LoginComponent;
