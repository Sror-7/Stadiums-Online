import {
  getBookingsByStadiumID,
  getBookingsByStadiumAndDate,
  getBookingsByStadiumIDAndDateAndStatusID,
  getBookingsByUserIDAndDateAndStatusID,
  addNewBooking,
  updateBookingStatusByID,
  getOneTimeBookingsListByStadiumIDAndDate,
} from "./bookingThunk";

export const handleGetBookingsByStadium = (builder) => {
  builder
    .addCase(getBookingsByStadiumID.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.value = [];
    })
    .addCase(getBookingsByStadiumID.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    })
    .addCase(getBookingsByStadiumID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};
export const handleGetBookingsByStadiumAndDate = (builder) => {
  builder
    .addCase(getBookingsByStadiumAndDate.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.value = [];
    })
    .addCase(getBookingsByStadiumAndDate.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    })
    .addCase(getBookingsByStadiumAndDate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};
export const handleGetBookingsByStadiumAndDateAndStatus = (builder) => {
  builder
    .addCase(getBookingsByStadiumIDAndDateAndStatusID.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.bookingsList = [];
    })
    .addCase(
      getBookingsByStadiumIDAndDateAndStatusID.fulfilled,
      (state, action) => {
        state.loading = false;
        state.bookingsList = action.payload;
      }
    )
    .addCase(
      getBookingsByStadiumIDAndDateAndStatusID.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }
    );
};
export const handleGetBookingsByUserAndDateAndStatus = (builder) => {
  builder
    .addCase(getBookingsByUserIDAndDateAndStatusID.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.bookingsList = [];
    })
    .addCase(
      getBookingsByUserIDAndDateAndStatusID.fulfilled,
      (state, action) => {
        state.loading = false;
        state.bookingsList = action.payload;
      }
    )
    .addCase(
      getBookingsByUserIDAndDateAndStatusID.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }
    );
};
export const handleGetBookingsListByStadiumIDAndDate = (builder) => {
  builder
    .addCase(getOneTimeBookingsListByStadiumIDAndDate.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.showBookingsList = [];
    })
    .addCase(
      getOneTimeBookingsListByStadiumIDAndDate.fulfilled,
      (state, action) => {
        state.loading = false;
        state.showBookingsList = action.payload;
      }
    )
    .addCase(
      getOneTimeBookingsListByStadiumIDAndDate.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }
    );
};
export const handleUpdateBookingStatusByID = (builder) => {
  builder
    .addCase(updateBookingStatusByID.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateBookingStatusByID.fulfilled, (state, action) => {
      state.loading = false;

      const updatedBookingId = action.meta.arg.bookingID;
      state.bookingsList = state.bookingsList.filter(
        (booking) => booking.bookingID !== updatedBookingId
      );
    })
    .addCase(updateBookingStatusByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};
export const handleAddNewBooking = (builder) => {
  builder

    .addCase(addNewBooking.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.newBookingID = [];
    })
    .addCase(addNewBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.newBookingID = action.payload;
    })
    .addCase(addNewBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};
