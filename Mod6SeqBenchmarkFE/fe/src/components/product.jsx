import React, { Component } from 'react'
import { Col, Image, Button, Card} from "react-bootstrap"

class Product extends Component {

    render() {
        const { name, description, brand, imageurl, price} = this.props.item
        return (
            <Col md={4}>
                <Card style={{height:"430px"}}>
                <Card.Img variant="top" src={imageurl} style={{height:"250px", width:"auto"}}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
        {brand} - {description} - € {price}
                    </Card.Text>
                    <Button variant="primary" onClick={this.addToCard}>Add to Cart</Button>
                </Card.Body>
                </Card>
            </Col>
        )
    }
}

export default Product