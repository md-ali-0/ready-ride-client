import { IBike } from "@/Interface/IBike";
import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBikes: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    console.log(args);
                    
                    args.forEach((item: TQueryParam) => {
                        if (item.value !== undefined) {
                            params.append(item.name, item.value as string);
                        }
                    });
                }
                return {
                    url: `/bikes`,
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<IBike[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["bikes"],
        })
    }),
});

export const { useGetAllBikesQuery } = userApi;
