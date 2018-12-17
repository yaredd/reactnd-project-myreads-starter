import React, { Component } from 'react'
import BookShelf from './BookShelf.js'

class Shelves extends Component {

    render(){
        return (
            <div>
                <BookShelf key={this.props.category} category={this.props.category}/>
            </div>
        )
    }
}

export default Shelves