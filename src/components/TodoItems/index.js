import React, { Component } from "react";
import "./toDoItems.css";

export class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

  createTasks(item) {
    return (
      <li key={item.key} className="listItem">
        {item.text}
        <span className="delete" onClick={() => this.delete(item.key)}>
          x
        </span>
      </li>
    );
  }

  delete(key) {
    this.props.delete(key);
  }

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);

    return <ul className="theList">{listItems}</ul>;
  }
}

export default TodoItems;
