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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  useUpdateUserMutation,
  useUserInfoQuery,
} from "@/redux/features/Auth/auth.api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function StudentProfilePage() {
  const { data } = useUserInfoQuery(undefined);
  const [updateProfile] = useUpdateUserMutation();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: data?.data?.name,
      email: data?.data?.email,
      bio: "This is The Best Caption",
    },
  });

  const onSubmit = async (formData: any) => {
    const userUpdateInfo = {
      name: formData.name,
      userId: data?.data?._id,
    };
    try {
      const toastId = toast.loading("Updating...");
      const result = await updateProfile(userUpdateInfo).unwrap();
      console.log(result);
      if (result.success) {
        toast.success(result.message, { id: toastId });
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
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6 text-center space-y-4">
            <Avatar className="w-32 h-32 mx-auto">
              <AvatarFallback className="text-4xl">
                {data?.data?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{data?.data?.name}</h3>
              <p className="text-sm text-muted-foreground">
                {data?.data?.email}
              </p>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Change Photo
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  disabled
                  readOnly
                  {...register("email")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  rows={4}
                  {...register("bio")}
                />
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learning Stats</CardTitle>
          <CardDescription>Your learning progress overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold">
                {data?.data?.enrolledCourses.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Courses Enrolled
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold">24</div>
              <div className="text-sm text-muted-foreground">Hours Learned</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold">32%</div>
              <div className="text-sm text-muted-foreground">Avg Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
