import { baseApi } from "@/redux/baseApi";

export const courseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        availableCourses: builder.query({
            query: () => ({
                url: "/courses/public/courses",
                method: "GET",
            }),
            providesTags: ["PUBLIC_COURSES"]
        }),
        singleCourse: builder.query({
            query: (id) => ({
                url: `/courses/${id}`,
                method: "GET",
            }),
        }),
    })
})

export const { useAvailableCoursesQuery, useSingleCourseQuery } = courseApi