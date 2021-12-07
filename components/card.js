import React, { Component } from "react";
import {Card, Button, Col, Form, Row} from "react-bootstrap";
import CardContent from "../components/card_content"

export default class Cards extends Component{
    constructor(props) {
        super(props);
        this.state = {card: this.props.card, card_content: ''};

    }

    deleteCard = (event, card) => {
        event.preventDefault();

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.props.member_id}/boards/${this.props.board_code}/columns/${this.props.column_id}/cards/${card.id}` , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
          })
      
          console.log("Column deleted");
    }

    render(){
        return (
        <>
            <Col>
            <Card style={{ width: '17rem',float:'center'}} className="mx-auto my-2">
                <Card.Body>
                    <Card style={{ width: '15rem',float:'center' }} key={this.props.card.id}>
                    <Card.Body>
                        <Card.Title>Card Id: {this.state.card.column_id}</Card.Title>
                        <Card.Text>
                            <CardContent card ={this.state.card} card_content={this.state.card.content} column_id={this.props.column_id} member_id={this.props.member_id} board_code={this.props.board_code}/>
                        </Card.Text>
                        <Button variant="primary" onClick={(event) => this.deleteCard(event, this.state.card)}>Delete Card</Button>
                    </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
            </Col>
        </>
        )
    }
}