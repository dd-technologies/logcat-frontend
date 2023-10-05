import React from "react";
import Style from "../../css/DeviceAssign.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { deviceAssignAction } from "../../store/action/AdminDashboard";
import { useState } from "react";
import { useEffect } from "react";
import closeImg from "../../assets/icons/cancel.png";
import { getRegisteredDetailsById } from "../../store/action/DeviceAction";
function Model({ _id, open, onClose }) {
  const getRegisteredDetailsReducer = useSelector(
    (state) => state.getRegisteredDetailsReducer
  );
  const { data12 } = getRegisteredDetailsReducer;
  let regDetail = data12;
  const dispatch = useDispatch();
  const [selectId, setSelectId] = useState([]);
  const assignBtn = (e) => {
    if (!selectId.length) {
      toast.error("Select DeviceId");
    } else {
      dispatch(deviceAssignAction({ _id, DeviceId: selectId }));
      toast.success("Success");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  useEffect(() => {
    dispatch(getRegisteredDetailsById());
  }, []);
  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add the value to the array if the checkbox is checked
      setSelectId([...selectId, value]);
    } else {
      // Remove the value from the array if the checkbox is unchecked
      setSelectId(selectId.filter((item) => item !== value));
    }
  };
  console.log("regDetail.data",regDetail )
  if (!open) return null;
  return (
    <div id={Style.popup}>
      <Toaster />
      <div className={Style.closebtn}>
        <img src={closeImg} className={Style.closeBtn} onClick={onClose} />
      </div>
      <div className={Style.popupData}>
        {regDetail?
          <div className={Style.deviceIds}>
            {regDetail.data
              .map((entry, index) => {
                return {
                  entry: entry,
                  index: index,
                };
              })
              .filter((proj) => {
                return proj.entry.isAssigned === false;
              })
              .map((proj) => {
                return (
                  <div className={Style.input_deviceID}>
                    <input
                      type="checkbox"
                      value={proj.entry.DeviceId}
                      onChange={(e) => handleChange(e)}
                      checked={selectId.includes(proj.entry.DeviceId)}
                    />
                    <span>{proj.entry.DeviceId}</span>
                  </div>
                );
              })}
          </div>
         : 
          <div className={Style.deviceIds}>
            <span>No Device Available</span>
          </div>
        }
      </div>
      <div className={Style.assignBtnClass}>
      {regDetail?
        <button className={Style.assignBtn} onClick={assignBtn}>
          Assign
        </button>
        :""}
      </div>
    </div>
  );
}

export default Model;
