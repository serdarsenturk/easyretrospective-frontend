import React, { Component } from "react";
import { Card, Button , Col, Row, DropdownButton, Dropdown} from "react-bootstrap";
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
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    render(){
        return (
        <>
        <Card className="my-2 py-2" key={this.props.card.id} style={{background: "white"}}>
            <Card.Body>
                <Col className="d-flex">
                    <Col className="mx-auto">
                        <CardContent card={this.state.card} card_content={this.state.card.content} column_id={this.props.column_id} member_id={this.props.member_id} board_code={this.props.board_code} />
                    </Col>
                    <Row>
                        <DropdownButton variant="outline-secondary" className="align-text-bottom" title="" aria-haspopup="true" aria-expanded="false">
                            <Dropdown.Item onClick={(event) => this.deleteCard(event, this.state.card)}><FontAwesomeIcon icon={faTrash} aria-hidden="true" /> Delete</Dropdown.Item>
                        </DropdownButton>
                    </Row>
                </Col>
            </Card.Body>
        </Card>
        </>
        )
    }
}