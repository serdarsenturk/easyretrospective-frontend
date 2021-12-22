import React from 'react'
import Column from '../components/column'
import {Form, Button, Col, Row} from 'react-bootstrap'
import BoardName from '../components/board_name'
import Pusher from 'pusher-js'

export default class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {board: this.props.board, column_name: ''}
    }

    handleSubmit = (event) => {
        event.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.props.board.member_id}/boards/${this.props.board.code}/columns` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": this.state.column_name
            })
          });
    }

    handleChange(event) {
        event.preventDefault();
        
        this.setState({column_name: event.target.value});
    }

    componentWillUnmount() {
        this.channel.unbind();

        this.pusher.unsubscribe(this.channel);
    }


    render(){
        return (    
            <>
            <BoardName board={this.state.board}/>

            <Form onSubmit={this.handleSubmit}>
                <Form>
                    <Col sm={13}>
                    <Form.Control type="text" placeholder="Enter column name" onChange={(event) => this.handleChange(event)}/>
                    </Col>
                </Form>
                <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 0}}>
                <Button type="submit">Add</Button>
                </Col>
                </Form.Group>
            </Form>
            <Row>
            {this.state.board.columns.map(column => (
                    <Column 
                        key={column.id} 
                        column={column}
                        member_id= {this.state.board.member_id}
                        board_code= {this.state.board.code}
                    />
            ))}
            </Row>
            </>
        );
    }
}