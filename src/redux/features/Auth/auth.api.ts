import { baseApi } from "@/redux/baseApi";
import type { ILogin, IResponse } from "@/types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/users/register",
                method: "POST",
                data: userInfo,
            }),
        }),
        login: builder.mutation<IResponse<null>, ILogin>({
            query: (loginInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: loginInfo
            }),
            invalidatesTags: ["USER"]
        }),
        userInfo: builder.query({
            query: () => ({
                url: "/users/me",
                method: "GET",
            }),
            providesTags: ["USER"]
        }),
        updateUser: builder.mutation({
            query: ({ userId, ...updatedData }) => ({
                url: `/users/${userId}`,
                method: "PATCH",
                data: updatedData
            }),
            invalidatesTags: ["USER"]
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            invalidatesTags: ["USER"]
        }),
    })
})

export const { useRegisterMutation, useLoginMutation, useUserInfoQuery,useUpdateUserMutation, useLogoutMutation } = authApi