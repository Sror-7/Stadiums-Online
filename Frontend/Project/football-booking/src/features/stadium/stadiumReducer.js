import {
  addNewStadium,
  getAllStadiums,
  getStadiumInfoWithBookingsByID,
  getStadiumInfoByOwnerID,
  getStadiumInfoByID,
} from "./stadiumThunk";

export const handleGetAllStadiums = (builder) => {
  builder
    .addCase(getAllStadiums.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllStadiums.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    })
    .addCase(getAllStadiums.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};
export const handleAddNewStadium = (builder) => {
  builder
    .addCase(addNewStadium.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addNewStadium.fulfilled, (state, action) => {
      state.loading = false;
      state.value.push(action.payload);
    })
    .addCase(addNewStadium.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });
};
export const handleGetStadiumInfoWithBookingsByID = (builder) => {
  builder
    .addCase(getStadiumInfoWithBookingsByID.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getStadiumInfoWithBookingsByID.fulfilled, (state, action) => {
      state.loading = false;
      state.StadiumInfoWithBookings = action.payload;
    })
    .addCase(getStadiumInfoWithBookingsByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });
};
export const handleGetStadiumInfoByID = (builder) => {
  builder
    .addCase(getStadiumInfoByID.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getStadiumInfoByID.fulfilled, (state, action) => {
      state.loading = false;
      state.OwnerStadium = action.payload;
    })
    .addCase(getStadiumInfoByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });
};
export const handleGetStadiumInfoByOwnerID = (builder) => {
  builder
    .addCase(getStadiumInfoByOwnerID.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getStadiumInfoByOwnerID.fulfilled, (state, action) => {
      state.loading = false;
      state.OwnerStadium = action.payload;
    })
    .addCase(getStadiumInfoByOwnerID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });
};
