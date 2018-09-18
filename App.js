/*jshint esversion: 6 */
/*jshint ignore:start */

import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    newBooksFromSearch: [],
  }
//format the books array
formatBooks = () => {
  const currentlyReading = []
  const read = []
  const wantToRead = []
  this.state.books.forEach( item => {
    if(item.shelf === "currentlyReading" || item.shelf === "Currently Reading"){
        item.setShelf = "Currently Reading"
        currentlyReading.push(item)
    } 
    if(item.shelf === "read" || item.shelf === "Read" ){
        item.setShelf = "Read"
        read.push(item)
    }    
    if(item.shelf === "wantToRead" || item.shelf === "Want to Read"){
        item.setShelf = "Want to Read"
        wantToRead.push(item) 
    } 
  })
  return(
    {
      currentlyReading: currentlyReading,
      read: read,
      wantToRead: wantToRead
    }
  )
}
//Fetching Books Data
componentDidMount(){
    BooksAPI.getAll().then( ( response ) => {
      this.setState({ books: response })
    })
}


 //Update the shelf of the book in state and also in DB
 updateBookShelf = (book, shelf) => {
      const filteredBookIndex = this.state.books.findIndex( i => i.id === book.id )
      let booksCopy = JSON.parse(JSON.stringify(this.state.books))
      booksCopy[filteredBookIndex].shelf = shelf
      this.setState({books:booksCopy})
      //update the backend DB
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
      BooksAPI.update({id: book.id}, dbShelf)   
 }
 searchBooks = (queryString) => {
     BooksAPI.search(queryString).then( ( response ) => {
       if(response){
          response.forEach( item => {
            const filteredBookIndex = this.state.books.findIndex( i => i.id === item.id )
            if(filteredBookIndex !== -1){
                item.shelf = this.state.books[filteredBookIndex].shelf
               if(item.shelf === "currentlyReading" || item.shelf === "Currently Reading")
                  item.setShelf = "Currently Reading"
                }
                if(item.shelf === "read" || item.shelf === "Read" ){
                  item.setShelf = "Read"
                }
               if(item.shelf === "wantToRead" || item.shelf === "Want to Read"){
                  item.setShelf = "Want to Read"
                }  
          })
       }
    this.setState({searchResults:response})
    })
 } 
clearSearch = () => {

  //Merge the newBooksFromSearch array to the books araay stae in api.js
   this.setState({
    books: this.state.books.concat(this.state.newBooksFromSearch)
   })
  //clear the  newBooksFromSearch array
  this.setState({searchResults:[]})
  this.setState({newBooksFromSearch:[]})
}
  render() {
    return (
    <div className="app">
        <Route exact path="/" render={
            () => (
              <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                {this.state.books &&
                  <ListBooks books={this.state.books} formatBooks={this.formatBooks} updateBookShelf={this.updateBookShelf} />
                }
                <div className="open-search">
                  <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
              </div> 
            )      
          }/>
        <Route path="/search" render={() => (
            <SearchBooks searchBooks={this.searchBooks} searchResults = {this.state.searchResults} newBooksFromSearch = {this.state.newBooksFromSearch} clearSearch={this.clearSearch}  />
          )  
        }/> 
        <div className="open-search">
              <Link
                to="/search"
              >Add a book</Link>
        </div>       
    </div>
    )
  }
}


export default BooksApp
