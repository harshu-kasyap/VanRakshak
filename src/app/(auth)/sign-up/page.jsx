"use client";

import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const SignUpSchema = z.object({
  name: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    town: z.string().min(1, "Town is required"),
    pin: z.string().min(6, "PIN code is required"),
    district: z.string().min(1, "District is required"),
    state: z.string().min(1, "State is required")
  }),
  role: z.enum(
    ["admin", "forest_ranger"],
    "Please select a role"
  )
});

function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const apiData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phone: formData.mobileNo,
        address: {
          street: formData.street,
          town: formData.town,
          pin: formData.pin,
          district: formData.district,
          state: formData.state
        },
        role: formData.role
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        apiData,
        {
          withCredentials: true,
        }
      );
      router.push("/sign-in");
    } catch (error) {
      console.error(error);
      toast({
        title: error.response?.data?.message || "Sign up failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12 lg:py-0">
        <div className="mx-auto grid mt-10 md:mt-16 w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  {...form.register("firstName")}
                />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  {...form.register("lastName")}
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobileNo">Phone</Label>
              <Input
                id="mobileNo"
                type="number"
                {...form.register("mobileNo")}
              />
              {form.formState.errors.mobileNo && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.mobileNo.message}
                </p>
              )}
            </div>
            <div>
              <Label className="text-xl py-2 mb-2" >Address</Label>
              <div className="grid gap-2">
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  type="text"
                  {...form.register("street")}
                />
                {form.formState.errors.street && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.street.message}
                  </p>
                )}
              </div>
              <div className="flex gap-4 mt-2">
                <div className="grid gap-2 w-1/2">
                  <Label htmlFor="town">Town</Label>
                  <Input
                    id="town"
                    type="text"
                    {...form.register("town")}
                  />
                  {form.formState.errors.town && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.town.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2 w-1/2">
                  <Label htmlFor="pin">Pin Code</Label>
                  <Input
                    id="pin"
                    type="number"
                    {...form.register("pin")}
                  />
                  {form.formState.errors.pin && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.pin.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="grid gap-2 w-1/2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    type="text"
                    {...form.register("district")}
                  />
                  {form.formState.errors.district && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.district.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2 w-1/2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    type="text"
                    {...form.register("state")}
                  />
                  {form.formState.errors.state && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.state.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                onValueChange={(value) => form.setValue("role", value)}
                defaultValue={form.getValues("role")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    Admin
                  </SelectItem>
                  <SelectItem value="forest_ranger">Forest Ranger</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.role && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.role.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={loading || !form.formState.isValid}
              className="w-full"
            >
              {loading && <Loader2 className="animate-spin" />}
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Image
          src="/register.jpeg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-screen w-full object-cover"
        />
      </div>
    </div>
  );
}

export default Page;
