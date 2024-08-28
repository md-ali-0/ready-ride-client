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
        }),
        updateProfile: builder.mutation({
            query: (data)=>{
                return {
                    url: `/users/me`,
                    method: 'PUT',
                    body: data
                }
            }
        })
    }),
});

export const { useGetMeQuery , useUpdateProfileMutation } = userApi;
