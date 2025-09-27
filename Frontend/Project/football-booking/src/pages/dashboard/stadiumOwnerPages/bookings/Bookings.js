// src/pages/owner/Bookings.jsx
import { useState } from "react";
import BookingFilters from "../../../../components/stadiumOwner/BookingFilters";
import BookingTable from "../../../../components/stadiumOwner/BookingTable";
import useBookings from "../../../../hooks/stadiumOwner/useBookings";
import { BOOKING_STATUS_IDS } from "../../../../constants/BookingStatus";
export default function Bookings() {
  const [filters, setFilters] = useState({
    stadiumId: 2,
    type: "OneTime",
    statusId: BOOKING_STATUS_IDS.PENDING,
    date: new Date().toLocaleDateString(),
    weekNumber: 1,
    weekDay: "Sunday",
  });

  const { bookings, loading } = useBookings(filters);

  return (
    <>
      <BookingFilters filters={filters} onChange={setFilters} />
      <BookingTable bookings={bookings} loading={loading} />
    </>
  );
}
