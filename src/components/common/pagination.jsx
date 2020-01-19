import React, { Component } from "react";
import PropTypes from "prop-types";


class Pagination extends Component {
  getPageNumber = () => {
    var pages = [];
    const { itemsCount, pageSize } = this.props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return pages;

    for (let count = 0; count < pageCount; count++) {
      pages.push(count + 1);
    }
    return pages;
  };

  getClassIsActive = pageNum => {
    if (pageNum === parseInt(this.props.currentPage)) return "page-item active";
    else return "page-item";
  };

  render() {
    console.log(this.props.currentPage);
    return (
      <nav>
        <ul className="pagination justify-content-center">
          {this.getPageNumber().map(pageNum => (
            <li
              key={pageNum}
              className={this.getClassIsActive(pageNum)}
              onClick={() => this.props.onPageChange(pageNum)}
            >
              <span style={{ cursor: "pointer" }} className="page-link">
                {pageNum}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
