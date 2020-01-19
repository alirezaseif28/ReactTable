import React, { Component } from 'react';
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class Table extends Component {
    
    render() { 
        const {columns , sortColumn , onSort , movies}=this.props;
        return ( 
        <table className="table">
        <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort}/>
        <TableBody movies={movies} columns={columns} />
      </table> );
    }
}
 
export default Table;