import React, { Component } from "react";
import "./compareResult.css";

export class ComparisonResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: ["Pass", "Failure", "Failure %", "Total", "Sections"],
      rows: {}
    };
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              {this.state.columns.map(function(column) {
                return <th>{column}</th>;
              })}
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default ComparisonResult;
