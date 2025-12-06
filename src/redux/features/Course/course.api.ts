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
            providesTags: ["COURSE"]
        }),
        adminAllCourses: builder.query({
            query: () => ({
                url: `/courses/admin/all-courses`,
                method: "GET",
            }),
            providesTags: ["ADMIN_COURSES"]
        }),
        createCourse: builder.mutation({
            query: (createCourseData) => ({
                url: `/courses/create`,
                method: "POST",
                data: createCourseData
            }),
            invalidatesTags: ["ADMIN_COURSES"]
        }),
        addCourseModule: builder.mutation({
            query: ({ courseId, ...addCourseModuleData }) => ({
                url: `/courses/add-module/${courseId}`,
                method: "PATCH",
                data: addCourseModuleData
            }),
            invalidatesTags: ["ADMIN_COURSES", "COURSE", "ENROLLMENT", "USER"]
        }),
        addCourseBatch: builder.mutation({
            query: ({ courseId, ...addCourseBatchData }) => ({
                url: `/courses/add-batch/${courseId}`,
                method: "PATCH",
                data: addCourseBatchData
            }),
            invalidatesTags: ["ADMIN_COURSES", "COURSE"]
        }),
        getAssignment: builder.query({
            query: ({ courseId, moduleId }) => ({
                url: `/courses/get-assignment/${courseId}/${moduleId}`,
                method: "GET",
            }),
        }),
        getQuiz: builder.query({
            query: ({ courseId, moduleId }) => ({
                url: `/courses/get-quiz/${courseId}/${moduleId}`,
                method: "GET",
            }),
        }),
    })
})

export const { useAvailableCoursesQuery, useSingleCourseQuery, useAdminAllCoursesQuery, useCreateCourseMutation, useAddCourseModuleMutation, useAddCourseBatchMutation, useGetAssignmentQuery, useGetQuizQuery } = courseApi