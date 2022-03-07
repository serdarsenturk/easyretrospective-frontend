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
                    <Card.Body>
                    </Card.Body>
        </>
        )
    }
}