import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import CardContent from "../components/card_content"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
    }

    render(){
        return (
        <>
            <div className="item-container">
                <Card key={this.props.card.id}>
                    
                    <Card.Body>
                        <div className="col">
                            <Card.Title className="text-uppercase text-muted mb-10">
                                Card Id: {this.state.card.id}
                            </Card.Title>
                            <Card.Text>
                                <CardContent card={this.state.card} card_content={this.state.card.content} column_id={this.props.column_id} member_id={this.props.member_id} board_code={this.props.board_code}/>
                            </Card.Text>
                        </div>

                    <Button variant="danger" onClick={(event) => this.deleteCard(event, this.state.card)}>
                        <FontAwesomeIcon icon={faTrash} aria-hidden="true"/>
                    </Button>
                    
                    </Card.Body>
                </Card>

            </div>

        </>
        )
    }
}