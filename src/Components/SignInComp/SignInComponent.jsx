"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  email: z.string().min(5, { message: 'Please enter a valid Email address.' }).email({ message: 'Invalid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

const SignIn = () => {
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
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);
      if (res.ok) { 
        const data = await res.json();
        if (data.success) {
          router.push('/login');
        } else {
          setError(data.message);
        }
      }else{
        setError(res.text)
      }
    } catch (err) {
      setLoading(false);
      setError('An unexpected error occurred');
    }
  };

  if (!mounted) {
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  return (
    <div className="w-full max-w-[500px] h-auto px-3 py-4 rounded-lg shadow-2xl">
      <h1 className="text-2xl sm:text-3xl text-center my-4 font-semibold">Please Create Your Account</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem >
                <FormLabel>Enter Your Name</FormLabel>
                <FormControl>
                  <Input className="bg-transparent" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Your Email</FormLabel>
                <FormControl>
                  <Input className="bg-transparent" placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Your Password</FormLabel>
                <FormControl>
                  <Input className="bg-transparent" placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          <Button type="submit" loading={loading} className="w-full my-2">
            {loading ? 'Signing In..' : 'Sign In'}
          </Button>
          <p>Already have an account? <Link href="/login" className="text-primary font-bold text-base">Login</Link></p>
        </form>
        {error && <div className="error text-red-600 font-bold"><p>{error}</p></div>}
      </Form>
    </div>
  );
};

export default SignIn;
