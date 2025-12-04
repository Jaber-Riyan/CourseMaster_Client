import { Spinner } from "./ui/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center h-screen items-center">
      <Spinner className="size-10" />
    </div>
  );
}
