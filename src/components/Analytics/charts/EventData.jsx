import React from "react";
import EventCard from "../../../Container/EventCard";
import EventDataWithDate from "../charts/EventData";
import StackData from "../Componets/StackData";
import Stack_keys from "../Componets/Stack_keys";

export default function EventData() {
  return (
    <>
      <EventCard>
        <EventDataWithDate />
        <Stack_keys />

        {/* pending toggle button */}

        <StackData />
      </EventCard>
    </>
  );
}
