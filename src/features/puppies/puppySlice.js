// /*
// TODO: Define the following 4 endpoints:
//   1. getPuppies (query)
//   2. getPuppy (query)
//   3. addPuppy (mutation)
//   4. deletePuppy (mutation)

// The query endpoints should provide the "Puppy" tag.
// The mutation endpoints should invalidate the "Puppy" tag.

// (Optional) TODO: Write `transformResponse` and `transformErrorResponse`
// functions for each endpoint.
// */

import api from "/src/store/api.js";

const puppyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPuppies: build.query({
      query: () => "players",
      transformResponse: (response) => response.data.players, // Extract players array
      providesTags: [{ type: "Puppy", id: "LIST" }], // Tag for the entire list
    }),
    getPuppy: build.query({
      query: (id) => `players/${id}`,
      transformResponse: (response) => response.data, // Extract player data
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.error || "An unknown error occurred",
      }),
      providesTags: (result, error, id) => [{ type: "Puppy", id }], // Dynamic tag for player
    }),
    addPuppy: build.mutation({
      query: (newPuppy) => ({
        url: "players",
        method: "POST",
        body: newPuppy,
      }),
      invalidatesTags: [{ type: "Puppy", id: "LIST" }], // Invalidate the list cache
    }),
    deletePuppy: build.mutation({
      query: (id) => ({
        url: `players/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Puppy", id }], // Invalidate specific player
    }),
  }),
});

export default puppyApi;

export const {
  useGetPuppiesQuery,
  useGetPuppyQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation,
} = puppyApi;

