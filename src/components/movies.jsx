import React from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";

class Movies extends React.Component {
  state = {
    fakeMovieList: [],
    fakeGenreList: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: {},
    sortColumn: { path: "title", order: "asc" }
  };

  

  componentDidMount() {
    this.setState({ fakeMovieList: getMovies(), fakeGenreList: getGenres() });
  }

  getCountMovies = () => {
    const { length: count } = this.state.fakeMovieList;
    if (count === 0)
      return (
        <React.Fragment>
          <h6>No Movies Exist In database</h6>
          <hr />
        </React.Fragment>
      );
    else {
      return (
        <h6>
          Showing <span className="badge badge-warning">{count}</span> movies in
          the database
        </h6>
      );
    }
  };

  handleLiked = movie => {
    const fakeMovieList = [...this.state.fakeMovieList];
    const index = fakeMovieList.indexOf(movie);
    fakeMovieList[index] = { ...movie };
    fakeMovieList[index].liked = !fakeMovieList[index].liked;
    this.setState({ fakeMovieList });
  };

  DeleteMovie = id => {
    const movies = [...this.state.fakeMovieList];
    this.setState({ fakeMovieList: movies.filter(m => m._id !== id) });

    const fakeMovieCount = this.state.fakeMovieList.filter(
      x =>
        x._id !== id &&
        (!!this.state.currentGenre._id === false ||
          x.genre._id === this.state.currentGenre._id)
    ).length;

    if (
      this.state.currentPage > Math.ceil(fakeMovieCount / this.state.pageSize)
    )
      this.setState({ currentPage: this.state.currentPage - 1 });
  };

  SortMovie = sortcolumn => {
    console.log("sortcolumn = ",sortcolumn);
    this.setState({ sortColumn: sortcolumn });
  };

  handlePageChange = pageId => {
    this.setState({ currentPage: pageId });
  };

  handleGenreSelect = genre => {
    if (genre === this.state.currentGenre) genre = {};
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  paginate() {
    const {
      pageSize,
      currentPage,
      currentGenre,
      fakeMovieList,
      sortColumn
    } = this.state;

    let filteredMovies =
      currentGenre && currentGenre._id
        ? fakeMovieList.filter(m => m.genre._id === currentGenre._id)
        : fakeMovieList;


        const sortBy = ({ order = 'asc', path }) => order === 'asc'
            ? (a, b) => ((a, b) => a > b || -(a < b))(getValue(a, path), getValue(b, path))
            : (a, b) => ((a, b) => b > a || -(b < a))(getValue(a, path), getValue(b, path)),
        getValue = (object, keys) => keys.split('.').reduce((o, k) => o[k], object);    

    filteredMovies = filteredMovies.sort(sortBy({path:sortColumn.path,order:sortColumn.order}));
   
    const first = (currentPage - 1) * pageSize;
    const last = first + pageSize;

    const pagedMovies = filteredMovies.slice(first, last);

    return { totalCount: filteredMovies.length, data: pagedMovies };
  }
  // fakeMovieCount() {
  //   return this.state.fakeMovieList.filter(
  //     x =>
  //       !!this.state.currentGenre._id === false ||
  //       x.genre._id === this.state.currentGenre._id
  //   ).length;
  // }

  renderTable = () => {
    const movies = this.paginate();
    if (this.state.fakeMovieList.length === 0) return "";
    else {
      return (
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.fakeGenreList}
              currentGenre={this.state.currentGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <MoviesTable
              movies={movies.data}
              onLike={this.handleLiked}
              onDelete={this.DeleteMovie}
              onSort={this.SortMovie}
              sortColumn={this.state.sortColumn}
            />
            <Pagination
              itemsCount={movies.totalCount}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.getCountMovies()}
        {this.renderTable()}
      </React.Fragment>
    );
  }
}

export default Movies;
