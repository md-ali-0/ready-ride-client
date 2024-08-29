import { IBike } from "@/Interface/IBike";
import { TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const rentalsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRentals: builder.query({
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
                    url: `/rentals`,
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<IBike[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["rentals"],
        }),
        createRentals: builder.mutation({
            query: (data) => {
                return {
                    url: `/rentals`,
                    body: data,
                    method: "POST",
                };
            },
            invalidatesTags: ["rentals"],
        }),
        returnRentals: builder.mutation({
            query: (id) => {
                return {
                    url: `rentals/${id}/return`,
                    method: "PUT",
                };
            },
            invalidatesTags: ["rentals"],
        }),
        deleteRentals: builder.mutation({
            query: (id) => {
                return {
                    url: `rentals/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["rentals"],
        }),
    }),
});

export const {
    useGetAllRentalsQuery,
    useCreateRentalsMutation,
    useReturnRentalsMutation,
    useDeleteRentalsMutation,
} = rentalsApi;
