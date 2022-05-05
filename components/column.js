import React, { Component } from "react";
import { Card, Button, Form, Col, Row, Stack, Dropdown, DropdownButton } from "react-bootstrap";
import Cards from '../components/card'
import ColumnName from '../components/column_name'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Pusher from 'pusher-js'

class Column extends Component{
    constructor(props) {
        super(props);
        this.state = {column: this.props.column, content: ''};
    }

    componentDidMount() {
        Pusher.logToConsole=process.env.NEXT_PUBLIC_PUSHER_DEBUGGING
        
        this.pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
            cluster: 'eu',
            encrypted: true
          });

          this.channel = this.pusher.subscribe(`board-${this.props.board_code}-${this.state.column.id}`)
          
          this.channel.bind('card-created', new_card => {
            var newCardList = this.state.column.cards;
            newCardList.push(new_card);
            const newColumn = {id: this.state.column.id, cards: newCardList};
            this.setState({column: newColumn});
    })

        this.channel.bind('card-updated', updated_card => {
            var newCardList = this.state.column.cards;
            const cardIndex = newCardList.findIndex(card => card.id == updated_card.id);
            newCardList[cardIndex].content = updated_card.content;
            const newColumn = {id: this.state.column.id, cards: newCardList};
            this.setState({column: newColumn});
        })

        this.channel.bind('card-deleted', deleted_card => {
            var cardList = this.state.column.cards;
            var newCardList = cardList.filter(card => card.id != deleted_card.id);
            const newColumn = {id: this.state.column.id, cards: newCardList};
            this.setState({column: newColumn});
        })
    }

    handleSubmitCard = (event) => {
        event.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.props.member_id}/boards/${this.props.board_code}/columns/${this.state.column.id}/cards` , {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "content": this.state.content
            })
          })
    }

    handleChangeContent(event) {
        event.preventDefault();

        this.setState({content: event.target.value});
    }

    deleteColumn = (event, column) => {
        event.preventDefault();

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.props.member_id}/boards/${this.props.board_code}/columns/${column.id}` , {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
          })      
    }

    componentWillUnmount() {
        this.channel.unbind();

        this.pusher.unsubscribe(this.channel);
    }

    render(){
        return (
            <Card>
                <Card.Title>
                    <Col className="d-flex m-auto">
                        <Row className="mx-auto">
                            <ColumnName column={this.state.column} column_name={this.state.column.name} member_id={this.props.member_id} board_code={this.props.board_code} /> 
                        </Row>
                        <Row>
                            <DropdownButton variant="outline-secondary" title="" aria-haspopup="true" aria-expanded="false">
                                <Dropdown.Item onClick={(event) => this.deleteColumn(event, this.state.column)}><FontAwesomeIcon icon={faTrash} aria-hidden="true" /> Delete</Dropdown.Item>
                            </DropdownButton>
                        </Row>
                    </Col>      
                </Card.Title>
                <Card.Body>                
                    {this.state.column.cards.map((card) => (
                        <Cards
                        key={card.id} 
                        card={card}
                        member_id = {this.props.member_id}
                        board_code = {this.props.board_code}
                        column_id = {this.state.column.id}
                        />
                    ))}
                
                    <Form onSubmit={this.handleSubmitCard}>
                        <Row>
                            <Col className="col-8 col-md-9 col-sm-6 mx-0">
                                <Form.Control type="text" placeholder="" onChange={(event) => this.handleChangeContent(event)}/>
                            </Col>
                            <Col>
                                <Button style={{float:"right"}} variant="success" type="submit">
                                    <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

        )
    }
}

export default Column