import React, { Component } from 'react'
import { Container, Row } from "react-bootstrap"
import Product from './product'

class ProductList extends Component {
    render() {
        return (
            <Container className="my-5">
                <Row>
                    {this.props.products.slice(0,30).map(x => <Product
                         onImageClicked={this.props.onImageClicked}
                         key={x.id} item={x} />)}
                </Row>
            </Container>
        )
    }
}
export default ProductList