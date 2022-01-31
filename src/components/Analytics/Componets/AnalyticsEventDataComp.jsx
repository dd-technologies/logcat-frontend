import React from "react";
import CustomCard from "../../../Container/CustomCard";
import EventDataWithDate from "./EventDataWithDate";
import StackData from "./StackData";
import StackNewData from "./StackNewData";

export default function AnalyticsEventDataComp() {
  return (
    <>
      <CustomCard height="100%">
        <EventDataWithDate />
        <StackData />
        {/* <StackNewData /> */}
      </CustomCard>
    </>
  );
}
