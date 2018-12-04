import React, { Component } from "react";
import "./form.css";
import CSVReader from "react-csv-reader";
import TodoItems from "../../components/TodoItems";
import Popup from "../../components/Popup/Popup";

export class ComparisonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      components: { users: false, products: false, settings: false },
      ignoreComments: [],
      baseUrlV1: "",
      baseUrlV2: "",
      attachFfid: "",
      showPopup: false,
      showPopupFail: false
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  togglePopupFail() {
    this.setState({
      showPopupFail: !this.state.showPopupFail
    });
  }

  handleCheckBoxChange = this._handleCheckBoxChange.bind(this);
  onChangeBaseURL1 = this._onChangeBaseURL1.bind(this);
  onChangeBaseURL2 = this._onChangeBaseURL2.bind(this);
  onChangeFfid = this._onChangeFfid.bind(this);
  onSubmit = this._onSubmit.bind(this);
  onaddItem = this._addItem.bind(this);
  onfile = this._onfile.bind(this);
  onReset = this._onReset.bind(this);
  deleteItem = this._deleteItem.bind(this);

  render() {
    return (
      <div className="form-element center">
        <h3>
          <u>Compare Form</u>
        </h3>
        <form onSubmit={this.onSubmit}>
          <div className="checkbox1">
            <label>
              Users:
              <input
                name="users"
                data-name="components"
                type="checkbox"
                checked={this.state.components.users}
                onChange={this.handleCheckBoxChange}
              />
            </label>
            <label>
              Products:
              <input
                name="products"
                data-name="components"
                type="checkbox"
                checked={this.state.components.products}
                onChange={this.handleCheckBoxChange}
              />
            </label>
            <label>
              Settings:
              <input
                name="settings"
                data-name="components"
                type="checkbox"
                checked={this.state.components.settings}
                onChange={this.handleCheckBoxChange}
              />
            </label>
          </div>
          <div className="ignoreComments">
            <input
              ref={a => (this._inputElement = a)}
              type="text"
              placeholder="Ignore Comments"
            />
            <input type="button" value="+" onClick={this.onaddItem} />
            <TodoItems
              entries={this.state.ignoreComments}
              delete={this.deleteItem}
            />
          </div>

          <div className="urlCompare">
            <label>Base URL for v1 API</label>
            <input
              placeholder="Base URL for v1 API"
              value={this.state.baseUrlV1}
              type="text"
              onChange={this.onChangeBaseURL1}
            />
            <h4>V/S</h4>
            <label>Base URL for v2 API</label>
            <input
              placeholder="Base URL for v2 API"
              value={this.state.baseUrlV2}
              type="text"
              onChange={this.onChangeBaseURL2}
            />
          </div>
          <div>
            <label>Time Range</label>
            <input type="text" placeholder="From Time" />-
            <input type="text" placeholder="To Time" />
            <h4>OR</h4>
            <CSVReader
              cssClass="csv-input"
              label="Select CSV"
              onFileLoaded={this.onfile}
              onError={this.handleDarkSideForce}
              inputStyle={{ color: "blue" }}
            />
          </div>
          <div className="submitButton">
            <input type="submit" name="submitForm" value="Submit" />
            <input
              type="button"
              name="clearForm"
              value="Reset"
              onClick={this.onReset}
            />
            {this.state.showPopup ? (
              <Popup text="Success" closePopup={this.togglePopup.bind(this)} />
            ) : null}
            {this.state.showPopupFail ? (
              <Popup
                text="Failed !!!"
                closePopup={this.togglePopupFail.bind(this)}
              />
            ) : null}
          </div>
        </form>
      </div>
    );
  }

  _deleteItem(key) {
    var filteredItems = this.state.ignoreComments.filter(item => {
      return item.key !== key;
    });

    this.setState({
      ignoreComments: filteredItems
    });
  }

  _handleCheckBoxChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let stateObj = {
      [target.dataset.name]: { ...this.state[target.dataset.name] }
    };
    stateObj[target.dataset.name][target.name] = value;
    this.setState(prevState => ({
      ...prevState,
      ...stateObj
    }));
  }

  _onChangeBaseURL1(e) {
    this.setState({
      baseUrlV1: e.target.value
    });
  }

  _onChangeBaseURL2(e) {
    this.setState({
      baseUrlV2: e.target.value
    });
  }

  _onChangeFfid(e) {
    this.setState({
      attachFfid: e.target.value
    });
  }

  _onfile(e) {
    this.setState({
      attachFfid: e
    });
  }

  _addItem(e) {
    e.preventDefault();

    if (this._inputElement.value !== "") {
      var newItem = {
        text: this._inputElement.value,
        key: Date.now()
      };

      this.setState(prevState => {
        return {
          ignoreComments: prevState.ignoreComments.concat(newItem)
        };
      });

      this._inputElement.value = "";
    }

    console.log(this.state.ignoreComments);
  }

  _onSubmit(e) {
    let idList = [];
    this.state.attachFfid.forEach(element => {
      idList.push(Number(element));
    });

    const payload = {
      users: this.state.components.users,
      products: this.state.components.products,
      settings: this.state.components.settings,
      ignoreComments: this.state.ignoreComments.map(item => item.text),
      baseUrlV1: this.state.baseUrlV1,
      baseUrlV2: this.state.baseUrlV2,
      attachFfid: idList
    };
    e.preventDefault();
    fetch("http://localhost:5000/data/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (response.status === 200) {
          this.togglePopup();
        }
      })
      .catch(e => {
        this.togglePopupFail();
      });
  }

  _onReset() {
    this.setState({
      components: { users: false, products: false, settings: false },
      ignoreComments: [],
      baseUrlV1: "",
      baseUrlV2: "",
      attachFfid: ""
    });
  }
}

export default ComparisonForm;
