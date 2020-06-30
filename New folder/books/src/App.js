import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state={
    books: []
  }

  render(){
    return(
      <div>
        <h1>Book catalogue</h1>
        {this.state.books.map((book, index) => (
          <div key ={index}>
            <img src={book.img} style={{width: "200px"}}></img>
            <span>{book.title}</span>
            </div>
        ))}
      </div>
    )
  }

  componentDidMount =async () => {
    const apiUrl = process.env.REACT_APP_API_URL 
    const resp = await fetch(`${apiUrl}/books`)
    const jsonBooks = await resp.json()

    this.setState({
      books:jsonBooks.data
    })
  }
}

export default App;
