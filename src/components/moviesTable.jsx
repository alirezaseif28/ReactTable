import React, { Component } from "react";
import  Table  from './common/table';
import  Like  from './common/like';


class MoviesTable extends Component {
  state = {};
  
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key :"like",
      content: movie =>(<Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />)
    },
    {
      key:"delete",
      content:movie =>(<button
        className="btn btn-secondary"
        onClick={() => this.props.onDelete(movie._id)}>
        Delete
      </button>)
    }
  ];
  

  render() {
    const { movies, onSort,sortColumn } = this.props;
    return (
        <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} movies={movies} />
    );
  }
}

export default MoviesTable;
