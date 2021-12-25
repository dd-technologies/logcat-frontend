import React from "react";
import EventCard from "../../../Container/EventCard";
import EventDataWithDate from "./EventDataWithDate";
import Stackkeys from "./Stackkeys";
import StackData from "./StackData";

export default function AnalyticsEventDataComp() {
  return (
    <>
      <EventCard>
        <EventDataWithDate />
        <Stackkeys />
        {/* pending toggle button */}
        <StackData />
      </EventCard>
    </>
  );
}
