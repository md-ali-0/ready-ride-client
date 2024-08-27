import { IUserData } from "@/interface/IUser";
import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
        })
    }),
});

export const { useGetMeQuery } = userApi;
