import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/productlist'

class App extends React.Component {
  state = {
    products: [],
    page: 0,
    pageSize: 12,
  }

  setPage = async (page) => {
    this.setState({
      page: page
    }, async () => {
      await this.fetchData()
    })
  }

render(){
  return(
    <div>
      <h1 style={{textAlign:"center"}}>MARKETPLACE</h1>
       <ProductList
             products={this.state.products} />
    </div>
  )
}

fetchData = async () => {
  
    const res = await fetch(`http://localhost:3003/products?limit=${this.state.pageSize}&offset=${this.state.page * this.state.pageSize}`)
    const products = await res.json()
    this.setState({
      products: products
    })
  
  
}

componentDidMount = async () => {
  await this.fetchData()
  
}


}

export default App;
