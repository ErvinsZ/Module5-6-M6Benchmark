import React, { Component } from 'react'
import { Col, Image, Button, Card} from "react-bootstrap"

class Product extends Component {

    render() {
        const { name, description, brand, imageurl, price, category} = this.props.item
        return (
            <Col md={4}>
                <Card >
                <Card.Img variant="top" src={imageurl} style={{width:"100%px", height:"250px"}}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
        {brand} - {category} - € {price}
                    </Card.Text>
                    <Button variant="primary" onClick={this.addToCard}>Add to Cart</Button>
                </Card.Body>
                </Card>
            </Col>
        )
    }
}

export default Product