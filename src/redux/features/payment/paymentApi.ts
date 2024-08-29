import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        cretePaymentIntent: builder.mutation({
            query: (data) => {
                return {
                    url: `/payment/create-payment-intent`,
                    body: data,
                    method: "POST"
                };
            },
        })
    }),
});

export const { useCretePaymentIntentMutation } = paymentApi;
