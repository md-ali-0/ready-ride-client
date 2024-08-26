/* eslint-disable @typescript-eslint/no-explicit-any */

import config from "@/config";
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logOut, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: `${config.host}/api`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("authorization", token);
        }
        return headers;
    },
});

const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
> = async (args, api, extraOption): Promise<any> => {
    let result = await baseQuery(args, api, extraOption);

    if (result?.error?.status === 404) {
        toast.error("User Not Found");
    }
    if (result?.error?.status === 401) {
        const res = await fetch(`${config.host}/auth/refresh-token`, {
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();
        if (data?.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user;

            api.dispatch(setUser({ user, token: data?.data?.accessToken }));
            result = await baseQuery(args, api, extraOption);
        }
        api.dispatch(logOut());
    }
    return result;
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
    tagTypes: ["auth", "users", "userData"],
});
