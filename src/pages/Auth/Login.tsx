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
import { Link, useLocation, useNavigate } from "react-router";
import PageTitle from "@/components/PageTitle";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Password from "@/components/ui/Password";
import { useState } from "react";
import { useLoginMutation } from "@/redux/features/Auth/auth.api";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, {
    message: "Password should be minimum 6 character",
  }),
});

export default function LoginPage() {
  const [login] = useLoginMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: email ?? "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const toastId = toast.loading("Logging...");
    const loginInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const result = await login(loginInfo).unwrap();
      console.log(result);
      if (result.success) {
        toast.success(result.message, { id: toastId });
        return navigate(`/${result.data && result.data?.user?.role}`);
      } else if (!result.success) {
        return toast.error(result.message, { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      if (error) {
        toast.error(error.data?.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-background to-muted">
      <PageTitle title="Login" />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to continue learning</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                Login
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
              {"Don't have an account? "}
            </span>
            <Link
              to="/auth/register"
              className="text-primary hover:underline font-medium">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
