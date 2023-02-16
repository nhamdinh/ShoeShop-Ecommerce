/* eslint-disable no-restricted-globals */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_LINK } from "../../utils/constants.js";

export const productsApi = createApi({
  reducerPath: "productsApis",
  baseQuery: fetchBaseQuery({
    baseUrl: API_LINK,
    prepareHeaders: (headers, { getState }) => {
      // Get token from store (userSlice)
      // @ts-ignore
      const token = getState().auth?.accessToken;

      // Add token to headers
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "GetProducts",
    "GetCarriers",
    "GetOrder",
    "getShippersHistory",
    "GetOrderDetail",
    "GetMemos",
    "GetGraphs",
    "GetSetlmentRequests",
  ],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (data) => ({
        url: `/api/products`,
        method: "GET",
        params: data,
      }),
      //@ts-ignore
      providesTags: ["GetProducts"],
    }),
    getCostList: builder.query({
      query: (data) => ({
        url: `/managers/settlement-cost`,
        method: "GET",
      }),
    }),
    updateMemoOrder: builder.mutation({
      query: (data) => ({
        url: `orders/${data.id}/memo`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["GetOrder", "GetOrderDetail"],
    }),
    deleteMemoOrder: builder.mutation({
      query: (data) => ({
        url: `orders/${data.id}/memo`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["GetOrder"],
    }),
    getOrderDetail: builder.query({
      query: (data) => ({
        url: `orders/${data.id}`,
        method: "GET",
      }),
      providesTags: ["GetOrderDetail"],
    }),
    getOrder: builder.query({
      query: (data) => ({
        url: `/orders`,
        method: "GET",
        params: data,
      }),
      providesTags: ["GetOrder"],
    }),
    getShipperDetail: builder.query({
      query: (data) => ({
        url: `/providers/` + data.id,
        method: "GET",
      }),
    }),
    getShippersHistory: builder.query({
      query: (data) => ({
        url: `/managers/settlement-providers-history`,
        method: "GET",
        params: data,
      }),
      //@ts-ignore
      providesTags: ["getShippersHistory"],
    }),

    getShipperById: builder.query({
      query: (data) => ({
        url: `/providers/${data.id}`,
        method: "GET",
      }),
    }),
    approvalMember: builder.mutation({
      query: (data) => ({
        url: `/providers/${data.id}/status/approval`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["GetProducts"],
    }),
    updateShipperStatus: builder.mutation({
      query: (data) => ({
        url: `/providers/${data.id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["GetProducts"],
    }),
    deleteShipper: builder.mutation({
      query: (data) => ({
        url: `/providers/${data.id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["GetProducts"],
    }),
    getCarrier: builder.query({
      query: (data) => ({
        url: `/carriers/${data.id}`,
        method: "GET",
        params: data,
      }),
    }),
    getCarriers: builder.query({
      query: (data) => ({
        url: `/carriers/`,
        method: "GET",
        params: data,
      }),
      providesTags: ["GetCarriers"],
    }),
    updateCarrierStatus: builder.mutation({
      query: (data) => ({
        url: `/carriers/${data.id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["GetCarriers"],
    }),
    deleteCarrier: builder.mutation({
      query: (data) => ({
        url: `/carriers/${data.id}`,
        method: "DELETE",
        body: data,
      }),
      //@ts-ignore
      invalidatesTags: ["GetCarriers"],
    }),
    getGraphs: builder.query({
      query: (data) => ({
        url: `/managers/graph?providerId=${data.providerId}`,
        method: "GET",
      }),
      providesTags: ["GetGraphs"],
    }),
    getProviderMemos: builder.query({
      query: (data) => ({
        url: `providers/${data.id}/memos`,
        method: "GET",
      }),
      providesTags: ["GetMemos"],
    }),
    createMemo: builder.mutation({
      query: (data) => ({
        url: `providers/${data.providerId}/memos`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["GetMemos"],
    }),
    updateMemo: builder.mutation({
      query: (data) => ({
        url: `providers/${data.providerId}/memos/${data.memoId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["GetMemos"],
    }),
    deleteMemo: builder.mutation({
      query: (data) => ({
        url: `providers/${data.providerId}/memos/${data.memoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GetMemos"],
      /*         params: data.providerId,
       */
    }),
    getCarrierSetlmentRequests: builder.query({
      query: (data) => ({
        url: `request-payment-tags`,
        method: "GET",
        params: data,
      }),
      providesTags: ["GetSetlmentRequests"],
    }),
    paymentRequest: builder.mutation({
      query: (data) => ({
        url: `request-payment-tags/${data.id}/payment`,
        method: "POST",
      }),
      invalidatesTags: ["GetSetlmentRequests"],
    }),
    unpaymentRequest: builder.mutation({
      query: (data) => ({
        url: `request-payment-tags/${data.id}/cancel-payment`,
        method: "POST",
      }),
      invalidatesTags: ["GetSetlmentRequests"],
    }),
    getOrdersInRequest: builder.query({
      query: (data) => ({
        url: `request-payment-tags/${data.id}`,
        method: "GET",
        params: data,
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: (data) => ({
        url: `/carriers/${data.id}/orders/payment`,
        method: "POST",
      }),
      invalidatesTags: ["GetOrder"],
    }),
    updatePaybackStatus: builder.mutation({
      query: (data) => ({
        url: `/providers/${data.provider_id}/status-payback/month/${data.month}/year/${data.year}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["GetGraphs"],
    }),
  }),
});

export const {
  useUpdateMemoOrderMutation,
  useDeleteMemoOrderMutation,
  useGetOrderDetailQuery,
  useGetCarrierQuery,
  useGetProductsQuery,
  useGetShippersHistoryQuery,
  useGetCarriersQuery,
  useApprovalMemberMutation,
  useUpdateShipperStatusMutation,
  useUpdateCarrierStatusMutation,
  useDeleteShipperMutation,
  useDeleteCarrierMutation,
  useGetOrderQuery,
  useGetCostListQuery,
  useGetGraphsQuery,
  useGetShipperDetailQuery,
  useGetProviderMemosQuery,
  useCreateMemoMutation,
  useUpdateMemoMutation,
  useDeleteMemoMutation,
  useGetShipperByIdQuery,
  useUpdateOrderStatusMutation,
  useUpdatePaybackStatusMutation,
  useGetCarrierSetlmentRequestsQuery,
  usePaymentRequestMutation,
  useUnpaymentRequestMutation,
  useGetOrdersInRequestQuery,
} = productsApi;
