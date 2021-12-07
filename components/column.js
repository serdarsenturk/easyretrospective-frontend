import React, { Component } from "react";
import { Card, Button, Col, Form, Row} from "react-bootstrap";
import Cards from '../components/card'
import ColumnName from '../components/column_name'

class Column extends Component{
    constructor(props) {
        super(props);
        this.state = { column: this.props.column, content: ''};
    }

    handleSubmitCard = (event) => {
        event.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.props.member_id}/boards/${this.props.board_code}/columns/${this.state.column.id}/cards` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "content": this.state.content
            })
          });
    }

    handleChangeContent(event) {
        event.preventDefault();
        
        this.setState({content: event.target.value});
    }


    deleteColumn = (event, column) => {
        event.preventDefault();

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.props.member_id}/boards/${this.props.board_code}/columns/${column.id}` , {
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
            <Card style={{ width: '18rem',float:'right'}} className="mx-auto my-2">
                <Card.Header>
                    <ColumnName column ={this.state.column} column_name={this.state.column.name} member_id={this.props.member_id} board_code={this.props.board_code}/>
                </Card.Header>
                <Card.Body>     
                <Form onSubmit={this.handleSubmitCard}>
                    <Form>
                        <Col sm={13}>
                        <Form.Control type="text" placeholder="" onChange={(event) => this.handleChangeContent(event)}/>
                        </Col>
                    </Form>
                    <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 0}}>
                    <Button type="submit">Add</Button>
                    </Col>
                    </Form.Group>
                </Form>   
                {this.state.column.cards.map((card) => (
                    <Cards
                    key={card.id} 
                    card={card}
                    member_id = {this.props.member_id}
                    board_code = {this.props.board_code}
                    column_id = {this.state.column.id}
                />
                ))}
                <Button variant="primary" onClick={(event) => this.deleteColumn(event, this.state.column)}>Delete Column</Button>
                </Card.Body>
            </Card>
            </Col>
        </>
        )
    }
}

export default Column