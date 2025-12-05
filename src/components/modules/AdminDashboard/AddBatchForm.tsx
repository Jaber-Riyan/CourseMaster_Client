import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import Loading from "@/components/Loading";
import { z } from "zod";
import {
  useAddCourseBatchMutation,
  useAdminAllCoursesQuery,
} from "@/redux/features/Course/course.api";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const batchSchema = z.object({
  courseId: z.string().min(1, "Course is required"),
  batchName: z.string().min(1, "Batch name is required"),
  startDate: z.date({
    error: "Start date is required",
  }),
});

type BatchSchemaData = z.infer<typeof batchSchema>;

export default function BatchForm() {
  const { data: adminAllCourses, isLoading } =
    useAdminAllCoursesQuery(undefined);

  const [addCourseBatchMutation] = useAddCourseBatchMutation();

  const form = useForm<BatchSchemaData>({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      courseId: "",
      batchName: "",
      startDate: undefined,
    },
  });

  const onSubmit = async (values: BatchSchemaData) => {
    const offset = 6 * 60; // +6 hours Bangladesh
    const localDate = new Date(values.startDate.getTime() - offset * 60 * 1000);

    // Format as YYYY-MM-DD
    const yyyy = localDate.getFullYear();
    const mm = String(localDate.getMonth() + 1).padStart(2, "0");
    const dd = String(localDate.getDate()).padStart(2, "0");

    const addCourseBatchInfo = {
      name: values.batchName,
      courseId: values.courseId,
      startDate: `${yyyy}-${mm}-${dd}`,
    };
    console.log(addCourseBatchInfo);

    let toastId;
    try {
      toastId = toast.loading("Batch Adding...");
      const result = await addCourseBatchMutation(addCourseBatchInfo).unwrap();

      if (result.success) {
        form.reset();
        return toast.success(result.message, { id: toastId });
      } else {
        return toast.error(result.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.data?.message, { id: toastId });
    }
  };

  //   if (isLoading) return <Loading />;

  return (
    <div className="space-y-6 p-5 border-2 rounded-2xl">
      <h2 className="text-2xl font-semibold">Add Course Batch</h2>
      <Separator className="p-1 my-3 bg-white/40" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* ============== Select Course (same as before) ================= */}
          <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Course</FormLabel>

                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Courses</SelectLabel>

                        {adminAllCourses?.data?.map((course) => (
                          <SelectItem key={course._id} value={course._id}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* ==================== Batch Name ======================= */}
          <FormField
            control={form.control}
            name="batchName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: January-2025" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ================= Start Date (Date Picker) =================== */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal">
                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="p-0 w-auto">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* ====================== Submit ======================= */}
          <Button type="submit">Create Course Batch</Button>
        </form>
      </Form>
    </div>
  );
}
