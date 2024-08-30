import { IBike } from "@/Interface/IBike";
import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBikes: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
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
        }),
        getBikeDetails: builder.query({
            query: (id) => {
                return {
                    url: `/bikes/${id}`,
                };
            },
            transformResponse: (response: TResponseRedux<IBike>) => {
                return {
                    data: response.data,
                };
            },
            providesTags: ["bikes"],
        }),
        createBike: builder.mutation({
            query: (data) => {
                return {
                    url: `/bikes`,
                    method: "POST",
                    body: data,
                };
            },
            transformResponse: (response: TResponseRedux<IBike>) => {
                return {
                    data: response.data,
                };
            },
            invalidatesTags: ["bikes"],
        }),
        updateBike: builder.mutation({
            query: (data) => {
                return {
                    url: `/bikes/${data.id}`,
                    method: "PUT",
                    body: data.data,
                };
            },
            transformResponse: (response: TResponseRedux<IBike>) => {
                return {
                    data: response.data,
                };
            },
            invalidatesTags: ["bikes"],
        }),
        deleteBike: builder.mutation({
            query: (id) => {
                return {
                    url: `/bikes/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["bikes"],
        }),
    }),
});

export const {
    useGetAllBikesQuery,
    useGetBikeDetailsQuery,
    useCreateBikeMutation,
    useUpdateBikeMutation,
    useDeleteBikeMutation
} = bikeApi;
