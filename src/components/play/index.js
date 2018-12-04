import React, { Component } from "react";
import "./some.css";
import ProvideScrollPosition from "react-provide-scroll-position";

export class index extends Component {
  render() {
    let ScrollTop = ProvideScrollPosition(({ scrollTop }) => (
      <div>{scrollTop}</div>
    ));
    return (
      <div className="example">
        <ScrollTop />
        the thing
      </div>
    );
  }
}

export default index;
