import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useAvailableCoursesQuery } from "@/redux/features/Course/course.api";
import Loading from "@/components/Loading";
import { Link } from "react-router";

export default function CoursesPage() {
  const [originalData, setOriginalData] = useState<any[]>([]); // server data
  const [filteredData, setFilteredData] = useState<any[]>([]); // ui data
  const { data: fetchAllCourses, isLoading } =
    useAvailableCoursesQuery(undefined);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  // 🚀 Load once from server
  useEffect(() => {
    (async () => {
      if (!isLoading) {
        const data = await fetchAllCourses.data;
        const courses = data?.availableCoursesFromQuery || [];
        setOriginalData(courses);
        setFilteredData(courses);
      }
    })();
  }, [fetchAllCourses, isLoading]);

  // 🧠 Client-side filtering
  useEffect(() => {
    let data = [...originalData];

    // ---- Search ----
    if (searchTerm) {
      data = data.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // ---- Category ----
    if (category) {
      if (category === "All")
        return setFilteredData(
          fetchAllCourses?.data?.availableCoursesFromQuery
        );
      console.log(category);
      data = data.filter((c) => c.category?.includes(category));
    }

    // ---- Sort ----
    if (sort === "priceLow") data.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") data.sort((a, b) => b.price - a.price);
    if (sort === "newest")
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    setFilteredData(data);
    setPage(1);
  }, [
    searchTerm,
    category,
    sort,
    originalData,
    fetchAllCourses?.data?.availableCoursesFromQuery,
  ]);

  // ---- Pagination ----
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = filteredData.slice(start, end);
  const totalPages = Math.ceil(filteredData.length / limit);

  if (isLoading) return <Loading />;
  console.log(fetchAllCourses?.data?.anotherAvailableCourseWithQuery);

  const categories = Array.from(
    new Set(
      fetchAllCourses?.data?.availableCoursesFromQuery?.flatMap(
        (c: any) => c.category
      ) ?? []
    )
  );

  const capitalizeCategory = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">All Courses</h1>

      {/*  ⭐ Filters UI ⭐ */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses with course Title or Instructor name....."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category */}
        <Select onValueChange={(val) => setCategory(val)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="AI">AI</SelectItem>

            {categories.map((cat: any) => {
              const cap = capitalizeCategory(cat);
              return (
                <SelectItem key={cat} value={cat}>
                  {cap}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select onValueChange={(val) => setSort(val)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="priceLow">Price: Low → High</SelectItem>
            <SelectItem value="priceHigh">Price: High → Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedData.map((course, index) => (
          <Card key={course._id}>
            <img
              src={course.thumbnail}
              className="h-48 w-full object-cover p-3 rounded-2xl"
            />

            <CardHeader>
              <Badge>{course.category?.[0]}</Badge>
              <CardTitle className="line-clamp-2">{course.title}</CardTitle>
              <CardTitle className="text-purple-500/70 mt-2">
                Instructor : {course.instructor}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between items-center">
                <p className="font-bold text-white/70">
                  Start Date:{" "}
                  {course?._id ===
                    fetchAllCourses?.data?.anotherAvailableCourseWithQuery[
                      index
                    ]._id &&
                  fetchAllCourses?.data?.anotherAvailableCourseWithQuery[index]
                    .upcomingBatches?.[0]?.startDate
                    ? new Date(
                        fetchAllCourses?.data?.anotherAvailableCourseWithQuery[
                          index
                        ].upcomingBatches?.[0]?.startDate
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </p>
                <p className="font-bold text-lg">BDT {course.price}</p>
              </div>
              <Button className="w-full mt-3 cursor-pointer">
                <Link
                  to={`/course/${course?._id}/${fetchAllCourses?.data?.anotherAvailableCourseWithQuery[index].upcomingBatches?.[0]?.name}/${fetchAllCourses?.data?.anotherAvailableCourseWithQuery[index].upcomingBatches?.[0]?.startDate}`}>
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}>
          Prev
        </Button>

        <Button variant="secondary">{page}</Button>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
