/*jshint esversion: 6 */
/*jshint ignore:start */

import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ListBook from './ListBook'
import * as BooksAPI from './BooksAPI'
//import serializeForm from 'form-serialize'

class SearchBooks extends Component {
  static propTypes = {
    searchBooks: propTypes.func.isRequired,
    searchResults: propTypes.array.isRequired,
    newBooksFromSearch: propTypes.array.isRequired,
    clearSearch: propTypes.func.isRequired,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const searchString = e.target.elements.searchInput.value
    const searchResults = this.props.searchBooks(searchString)
    console.log("searchResults")
    console.log(this.props.searchResults)
  }
  handleSearch = (item, shelf ) => {
    console.log("H SRCH")
    console.log(item)
    console.log(shelf)
    item.shelf = shelf
    this.props.newBooksFromSearch.push(item)
    let dbShelf;
      if(shelf === "Currently Reading"){
        dbShelf = "currentlyReading"
      }
      if(shelf === "Read"){
        dbShelf = "read"
      }
      if(shelf === "Want to Read"){
        dbShelf = "wantToRead"
      }
      //update the backend DB
      BooksAPI.update({id: item.id}, dbShelf) 
  }
  //update shelf of selected book from search
  // updateBookShelfFromSearch = (book, shelf) => {
  //    this.props.updateBookShelfFromSearchArray.push({book: book, shelf: shelf})
  // }
  //clear the search page
  componentWillUnmount(){
    //clear searchresults array in API.JS
    //Merge the newBooksFromSearch array to the stae in api.js 
    //clear the  newBooksFromSearch array
    this.props.clearSearch() 
  }
  render(){
    const { searchResults } = this.props
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <form onSubmit={this.handleSubmit}>
              <input  name="searchInput" type="text" placeholder="Search by title or author" />
            </form>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              <ListBook updateBookShelf={this.handleSearch} book={searchResults} shelf='Currently Reading' shelf1='Want to Read' shelf2='Read'/>
          </ol>
        </div>
    </div>
    )
  }  
}  

export default SearchBooks