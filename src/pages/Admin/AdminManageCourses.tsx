import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useAdminAllCoursesQuery,
  useCreateCourseMutation,
} from "@/redux/features/Course/course.api";
import Loading from "@/components/Loading";
import { toast } from "sonner";
import ModuleForm from "@/components/modules/AdminDashboard/AddModuleForm";
import BatchForm from "@/components/modules/AdminDashboard/AddBatchForm";
import { Separator } from "@/components/ui/separator";

const courseCreateSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(5, "Description is required"),
  instructor: z.string().min(2, "Instructor is required"),
  price: z.number().min(0, "Price must be >= 0"),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
  courseBanner: z.string().url("Course Banner must be a valid URL"),
  category: z.string().optional(),
  tags: z.string().optional(),
});

type CourseCreateFormData = z.infer<typeof courseCreateSchema>;

export default function AdminCoursesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [createCourseMutation] = useCreateCourseMutation();
  const { data: adminAllCourses, isLoading } =
    useAdminAllCoursesQuery(undefined);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CourseCreateFormData>({
    resolver: zodResolver(courseCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      instructor: "",
      price: 0,
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      courseBanner:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      category: "",
      tags: "",
    },
  });

  const capitalize = (str: string) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const courseCreateOnSubmit = async (data: CourseCreateFormData) => {
    // category & tags string -> array + capitalize
    const courseCreateData = {
      ...data,
      category: data.category
        ? data.category.split(",").map((c) => capitalize(c.trim()))
        : [],
      tags: data.tags
        ? data.tags.split(",").map((t) => capitalize(t.trim()))
        : [],
    };

    console.log("Final Course Data:", courseCreateData);

    let toastId;

    try {
      toastId = toast.loading("Logging...");
      const result = await createCourseMutation(courseCreateData).unwrap();
      console.log(result);
      if (result.success) {
        reset();
        setIsAddDialogOpen(false);
        return toast.success(result.message, { id: toastId });
      } else if (!result.success) {
        return toast.error(result.message, { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      if (error) {
        return toast.error(error.data?.message, { id: toastId });
      }
    }
  };

  if (isLoading) return <Loading />;
  // console.log(adminAllCourses?.data);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Courses</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage course content
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] flex flex-col w-full">
            <DialogHeader className="p-6 pb-2">
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Fill in the course details below
              </DialogDescription>
            </DialogHeader>

            <div className="overflow-y-auto px-6 pb-6 flex-1">
              <form
                onSubmit={handleSubmit(courseCreateOnSubmit)}
                className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" {...register("title")} />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input id="instructor" {...register("instructor")} />
                    {errors.instructor && (
                      <p className="text-red-500">
                        {errors.instructor.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (BDT)</Label>
                    <Input
                      type="number"
                      id="price"
                      {...register("price", { valueAsNumber: true })}
                    />
                    {errors.price && (
                      <p className="text-red-500">{errors.price.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category (comma separated)</Label>
                    <Input
                      id="category"
                      {...register("category")}
                      placeholder="Development, Web"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      {...register("tags")}
                      placeholder="JavaScript, React, Node.js"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail URL</Label>
                  <Input id="thumbnail" {...register("thumbnail")} />
                  {errors.thumbnail && (
                    <p className="text-red-500">{errors.thumbnail.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseBanner">Course Banner URL</Label>
                  <Input id="courseBanner" {...register("courseBanner")} />
                  {errors.courseBanner && (
                    <p className="text-red-500">
                      {errors.courseBanner.message}
                    </p>
                  )}
                </div>
                <div className="shrink-0 pt-4">
                  <Button type="submit" className="w-full">
                    Create Course
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Courses & Course Add Section</CardTitle>
          <CardDescription>
            Total: {adminAllCourses?.data?.length} courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminAllCourses?.data?.map((course) => (
                <TableRow
                  key={course._id}
                  className="bg-accent rounded-2xl cursor-pointer">
                  <TableCell>
                    <div className="font-medium">{course.title}</div>
                  </TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    {course?.category.map((category) => (
                      <div>
                        <Badge variant="default" className="mb-1">
                          {category}
                        </Badge>
                        <br />
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>BDT {course.price}</TableCell>
                  <TableCell>4.9</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ModuleForm />
      {/* <Separator className="p-1 my-3 bg-white/40" /> */}
      {/* <BatchForm /> */}
    </div>
  );
}
