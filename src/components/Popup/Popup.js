import React, { Component } from "react";
import "./Popup.css";
import TickSrc from "../../assets/check.gif";
import WarnSign from "../../assets/warning.png";

export class Popup extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          {this.props.text === "Success" ? (
            <h1>{this.props.text}</h1>
          ) : (
            <h1 className="red">{this.props.text}</h1>
          )}
          {this.props.text === "Success" ? (
            <a href="comparisonResult">
              <img src={TickSrc} alt="tick" />
            </a>
          ) : (
            <img src={WarnSign} alt="warn" />
          )}
          <div className="popupCloseButton" onClick={this.props.closePopup}>
            x
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
