import { IUserData } from "@/interface/IUser";
import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => {
                return {
                    url: `/users/`,
                };
            },
            transformResponse: (response: TResponseRedux<IUserData[]>) => {
                return response.data;
            },
            providesTags: ["users"],
        }),
        updateUser: builder.mutation({
            query: (data) => {
                return {
                    url: `/users/${data.id}`,
                    method: "PATCH",
                    body: data.data,
                };
            },
            invalidatesTags: ["users"],
        }),
        deleteUser: builder.mutation({
            query: (id) => {
                return {
                    url: `/users/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["users"],
        }),
        getMe: builder.query({
            query: () => {
                return {
                    url: `/users/me`,
                };
            },
            transformResponse: (response: TResponseRedux<IUserData>) => {
                return response.data;
            },
            providesTags: ["userData"],
        }),
        updateProfile: builder.mutation({
            query: (data) => {
                return {
                    url: `/users/me`,
                    method: "PUT",
                    body: data,
                };
            },
            invalidatesTags: ["userData"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetMeQuery,
    useUpdateUserMutation,
    useUpdateProfileMutation,
    useDeleteUserMutation,
} = userApi;
