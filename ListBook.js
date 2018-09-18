/*jshint esversion: 6 */
/*jshint ignore:start */

import React, { Component } from 'react'
import propTypes from 'prop-types'
//import { Link } from 'react-router-dom'

class ListBook extends Component {
	static propTypes = {
		book: propTypes.array.isRequired,
    shelf: propTypes.string.isRequired,
    shelf1: propTypes.string.isRequired,
    shelf2: propTypes.string.isRequired,
    updateBookShelf: propTypes.func.isRequired,
	}
  onShelfMove = (i, e) => {
    this.props.updateBookShelf(i, e.target.value)
  }
	render(){
    const { book, updateBookShelf } = this.props
		return(
        <ol className="books-grid">
          {book.map( (item)  => (
              <li key={item.id}>
                <div className="book">
                  {item.shelf && (
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks.smallThumbnail})` }}></div>
                        <div className="book-shelf-changer">                         
                          <select value={item.setShelf} onChange={ (e) => this.onShelfMove(item, e)} >
                            <option value="move" >Move to...</option>
                            <option value={this.props.shelf2}>{this.props.shelf2}</option>
                            <option  value={this.props.shelf1}>{this.props.shelf1}</option>
                            <option  value={this.props.shelf}>{this.props.shelf}</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                    )}
                  {!item.shelf && (
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks.smallThumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select onChange={ (e) => this.onShelfMove(item, e)} value="none">
                          <option value="move" >Move to...</option>
                          <option value={this.props.shelf2}>{this.props.shelf2}</option>
                          <option value={this.props.shelf1}>{this.props.shelf1}</option>
                          <option value={this.props.shelf}>{this.props.shelf}</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                  )}   
                  <div className="book-title">{item.title}</div>
                  <div className="book-authors">{item.authors}</div>
                  {item.averageRating && (
                    <div className="book-ratings">Rating: {item.averageRating}</div>
                  )}  
                </div>
              </li>
            ))}
          </ol>                      
		    )
	   }
}

export default ListBook