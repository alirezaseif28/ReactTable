import React, { Component } from 'react';


class TableHeader extends Component {

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) {
      return null;
    }

    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc" />;
    }

    return <i className="fa fa-sort-desc" />;
  };

    raiseSort = path => {
        if(!!path === false)
            return;

        const sortColumn = { ...this.props.sortColumn };
       
        if (sortColumn.path === path) {
          sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        } else {
          sortColumn.path = path;
          sortColumn.order = "asc";
        }
        this.props.onSort(sortColumn);
      };

    render() { 
        return ( 
            <thead>
            <tr>
                {this.props.columns.map(column => (
    <th key={column.path || column.key} style={{cursor:!!column.path===true ? "pointer" : ""}} onClick={()=>this.raiseSort(column.path)} scope="col">{column.label}&nbsp;&nbsp;{this.renderSortIcon(column)}</th> 
                ))}
            </tr>
          </thead>
            );
    }
}
 
export default TableHeader;