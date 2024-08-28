import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => {
                return {
                    url: "/auth/login",
                    body: data,
                    method: "POST",
                };
            },
        }),
        SignUpUser: builder.mutation({
            query: (data) => {
                return {
                    url: "/auth/signup",
                    body: data,
                    method: "POST",
                };
            },
        }),
    }),
});

export const { useLoginUserMutation, useSignUpUserMutation } = authApi;
