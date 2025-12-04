import { baseApi } from "@/redux/baseApi";

export const enrollmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        enrollmentUser: builder.query({
            query: () => ({
                url: "/enrollment/me",
                method: "GET",
            }),
            providesTags: ["ENROLLMENT"]
        }),
        enrollmentProgress: builder.query({
            query: (enrollmentId) => ({
                url: `/enrollment/${enrollmentId}/progress`,
                method: "PATCH",
            }),
        }),
        markAsComplete: builder.mutation({
            query: (markAsCompleteInfo) => ({
                url: `/enrollment/mark/progress/${markAsCompleteInfo.courseId}/${markAsCompleteInfo.batch}/${markAsCompleteInfo.moduleId}/${markAsCompleteInfo.lessonId}/${markAsCompleteInfo.enrollmentId}`,
                method: "PATCH"
            }),
            invalidatesTags: ["ENROLLMENT", "USER"]
        })
    })
})

export const { useEnrollmentUserQuery, useEnrollmentProgressQuery, useMarkAsCompleteMutation } = enrollmentApi