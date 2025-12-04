import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate, useParams } from "react-router";
import { useUserInfoQuery } from "@/redux/features/Auth/auth.api";
import { useEffect } from "react";
import Loading from "@/components/Loading";

// ------- Validation Schema -------
const enrollSchema = z.object({
  transactionId: z
    .string()
    .min(6, "Transaction ID must be at least 6 characters"),
});

export default function EnrollPage() {
  const params = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  const { data, isLoading, isError } = useUserInfoQuery(undefined);
  console.log(data);

  const form = useForm<z.infer<typeof enrollSchema>>({
    resolver: zodResolver(enrollSchema),
    defaultValues: {
      transactionId: "",
    },
  });

  // -------- Form Handler --------
  const onSubmit = (data: z.infer<typeof enrollSchema>) => {
    const enrollmentInfo = {
      courseId: params.courseId,
      batch: params.batch,
    };
    console.log("Transaction ID:", data.transactionId);

    // ⬇️ ekhane API call korte parba
    // await enrollCourse(data.transactionId)
  };

  useEffect(() => {
    // 🚫 Not logged in
    if (!isLoading && (!data || isError)) {
      //   console.log(location.pathname);
      navigate("/auth/login");
    }
  }, [data, isLoading, isError, navigate, location.pathname]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Enroll Course</h1>
        <p className="text-center text-muted-foreground">
          Enter your BKash payment transaction ID
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* === Transaction ID Field === */}
            <FormField
              control={form.control}
              name="transactionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. TXN12A34B56" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
