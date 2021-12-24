import React from "react";
import EventCard from "../../../../Container/EventCard";

import EventDataWithDate from "./EventDataWithDate";
import StackData from "./StackData";
import Stack_keys from "./Stack_keys";


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
