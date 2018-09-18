/*jshint esversion: 6 */
/*jshint ignore:start */

import React, { Component } from 'react'
import propTypes from 'prop-types'
//import { Link } from 'react-router-dom'
import ListBook from './ListBook'
class ListBooks extends Component {
	static propTypes = {
		books: propTypes.array.isRequired,
		formatBooks: propTypes.func.isRequired,
		updateBookShelf: propTypes.func.isRequired
	}

	render(){
		const {  updateBookShelf } = this.props
		const formatBooks = this.props.formatBooks()
		return (
			  <div className="list-books-content">
              	<div>
              		<div className="bookshelf">
                  		<h2 className="bookshelf-title">Currently Reading</h2>
                  	  	<div className="bookshelf-books">            
                  		   <ListBook book={formatBooks.currentlyReading} updateBookShelf={updateBookShelf} shelf='Currently Reading' shelf1='Want to Read' shelf2='Read'/>
              		  	</div> 
                  	</div>
                  	<div className="bookshelf">
	              	    <h2 className="bookshelf-title">Want to Read</h2>
	              	    <div className="bookshelf-books">
	              		  <ListBook book={formatBooks.wantToRead} updateBookShelf={updateBookShelf} shelf='Want to Read' shelf1='Currently Reading' shelf2='Read'/>
	          		    </div>
                  	</div>
                  	<div className="bookshelf">
		          		<h2 className="bookshelf-title">Read</h2>
		          		<div className="bookshelf-books">
		          			<ListBook book={formatBooks.read} updateBookShelf={updateBookShelf} shelf='Read' shelf1='Want to Read' shelf2='Currently Reading'/>
		          		</div>
              		</div>
              </div>
            </div>   	
		)
	}
}

export default ListBooks