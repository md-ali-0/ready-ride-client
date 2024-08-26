import { IUserData } from "@/interface/IUser";
import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => {
                return {
                    url: `/user/me`,
                };
            },
            transformResponse: (response: TResponseRedux<IUserData>) => {
                return response.data;
            },
            providesTags: ["userData"],
        }),
        createUser: builder.mutation({
            query: (data) => {
                return {
                    url: "/user/create-user",
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
});

export const { useGetMeQuery, useCreateUserMutation } = userApi;
