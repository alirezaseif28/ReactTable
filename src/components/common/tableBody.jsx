import React, { Component } from "react";

class TableBody extends Component {


  renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }

    return this.getPropValue(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  getPropValue(obj, path) {
    if (!path) {
      return obj;
    }

    const properties = path.split(".");
    return this.getPropValue(obj[properties.shift()], properties.join("."));
  }

  render() {
    const { movies, columns } = this.props;
    return (
      <tbody>
        {movies.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item,column)}>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
