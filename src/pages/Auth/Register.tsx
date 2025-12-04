import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router";
import PageTitle from "@/components/PageTitle";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Password from "@/components/ui/Password";
import {
  useRegisterMutation,
  useUserInfoQuery,
} from "@/redux/features/Auth/auth.api";
import { useEffect } from "react";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, {
      error: "Name is too short",
    })
    .max(50),
  email: z.email(),
  password: z.string().min(8, {
    message: "Password should be minimum 6 character",
  }),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  // const { data } = useUserInfoQuery(undefined);

  // useEffect(() => {
  //   if (data?.data?.email) {
  //     navigate(`/${data?.data?.role}`);
  //   }
  // }, [data?.data?.role, data?.data?.email, navigate]);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const toastId = toast.loading("Loading...");

    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    try {
      console.log(userInfo);
      const result = await register(userInfo).unwrap();
      console.log(result);
      if (result.success) {
        toast.success(result.message, { id: toastId });
        return navigate("/auth/login", { state: data.email });
      }
      if (!result.success) {
        return toast.error(result.message, { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      if (error) {
        toast.error(error.data?.message, { id: toastId });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-background to-muted">
      <PageTitle title="Register" />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Start your learning journey today</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@company.com" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display email.
                    </FormDescription>
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
                      <Password {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full bg-transparent">
              Google
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              GitHub
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              to="/auth/login"
              className="text-primary hover:underline font-medium">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
