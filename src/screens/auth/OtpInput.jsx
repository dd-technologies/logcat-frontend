/* eslint-disable */

import React from "react";
import Style from "../../css/OtpInput.module.css";
class Otpinput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: "",
      disable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value1, event) {
    this.setState({ [value1]: event.target.value });
    let st = this.state;
    const otp = `${st.otp1}${st.otp2}${st.otp3}${st.otp4}${st.otp5}${event.target.value}`;
    this.props.setState({ ...this.props.state, otp: otp });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  inputfocus = (elmnt) => {
    if (elmnt.key == "Delete" || elmnt.key == "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      // console.log("next");

      const next = elmnt.target.tabIndex;
      if (next < 6) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className={Style.otpContainer}>
          <input
            name="otp1"
            type="text"
            autoComplete="off"
            className={Style.optInput}
            value={this.state.otp1}
            onChange={(e) => this.handleChange("otp1", e)}
            tabIndex="1"
            maxLength="1"
            onKeyUp={(e) => this.inputfocus(e)}
          />
          <input
            name="otp2"
            type="text"
            autoComplete="off"
            className={Style.optInput}
            value={this.state.otp2}
            onChange={(e) => this.handleChange("otp2", e)}
            tabIndex="2"
            maxLength="1"
            onKeyUp={(e) => this.inputfocus(e)}
          />
          <input
            name="otp3"
            type="text"
            autoComplete="off"
            className={Style.optInput}
            value={this.state.otp3}
            onChange={(e) => this.handleChange("otp3", e)}
            tabIndex="3"
            maxLength="1"
            onKeyUp={(e) => this.inputfocus(e)}
          />
          <input
            name="otp4"
            type="text"
            autoComplete="off"
            className={Style.optInput}
            value={this.state.otp4}
            onChange={(e) => this.handleChange("otp4", e)}
            tabIndex="4"
            maxLength="1"
            onKeyUp={(e) => this.inputfocus(e)}
          />

          <input
            name="otp5"
            type="text"
            autoComplete="off"
            className={Style.optInput}
            value={this.state.otp5}
            onChange={(e) => this.handleChange("otp5", e)}
            tabIndex="5"
            maxLength="1"
            onKeyUp={(e) => this.inputfocus(e)}
          />

          <input
            name="otp6"
            type="text"
            autoComplete="off"
            className={Style.optInput}
            value={this.state.otp6}
            onChange={(e) => this.handleChange("otp6", e)}
            tabIndex="6"
            maxLength="1"
            onKeyUp={(e) => this.inputfocus(e)}
          />
        </div>
      </form>
    );
  }
}

export default Otpinput;
