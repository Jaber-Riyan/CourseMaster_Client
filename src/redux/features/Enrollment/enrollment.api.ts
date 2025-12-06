import { baseApi } from "@/redux/baseApi";

export const enrollmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        makeEnrollment: builder.mutation({
            query: (makeEnrollmentInfo) => ({
                url: "/enrollment/enroll",
                method: "POST",
                data: makeEnrollmentInfo
            }),
            invalidatesTags: ["ENROLLMENT", "USER"]
        }),
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
            invalidatesTags: ["ENROLLMENT", "USER", "COURSE", "ADMIN_COURSES", "PUBLIC_COURSES"]
        }),
        getEnrollments: builder.query({
            query: () => ({
                url: `/enrollment/admin/enrollments`,
                method: "GET",
            }),
            providesTags: ["ENROLLMENT"]
        }),
        submitAssignment: builder.mutation({
            query: ({ enrollmentId, moduleId, answer }) => ({
                url: `/enrollment/submit/assignment/${enrollmentId}/${moduleId}`,
                method: "POST",
                data: { answer }
            }),
            invalidatesTags: ["COURSE", "ENROLLMENT", "USER"]
        }),
        submitQuiz: builder.mutation({
            query: ({ enrollmentId, moduleId, score }) => ({
                url: `/enrollment/submit/quiz/${enrollmentId}/${moduleId}`,
                method: "POST",
                data: { score }
            }),
            invalidatesTags: ["COURSE", "ENROLLMENT", "USER"]
        }),
        getPendingAssignment: builder.query({
            query: ({ courseId }) => ({
                url: `/enrollment/admin/pending-assignment?courseId=${courseId || ""}`,
                method: "GET",
            }),
            providesTags:["PENDING_ASSIGNMENTS"]
        }),
        reviewAssignment: builder.mutation({
            query: ({ enrollmentId, moduleId, mark }) => ({
                url: `/enrollment/review/assignment/${enrollmentId}/${moduleId}`,
                method: "PATCH",
                data: { mark }
            }),
            invalidatesTags: ["ENROLLMENT", "USER", "PENDING_ASSIGNMENTS"]
        }),
    })
})

export const { useMakeEnrollmentMutation, useEnrollmentUserQuery, useEnrollmentProgressQuery, useMarkAsCompleteMutation, useGetEnrollmentsQuery, useSubmitAssignmentMutation, useSubmitQuizMutation, useGetPendingAssignmentQuery, useReviewAssignmentMutation } = enrollmentApi