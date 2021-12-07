import React from 'react'
import Column from '../components/column'
import {Form, Button, Col, Row} from 'react-bootstrap'
import BoardName from '../components/board_name'

export default class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {board: this.props.board}
    }

    render(){
        return (    
            <>
            <BoardName board={this.state.board}/>

            <Form onSubmit={this.handleSubmit}>
                <Form>
                    <Col sm={13}>
                    <Form.Control type="text" placeholder="Enter column name" onChange={this.handleChange}/>
                    </Col>
                </Form>
                <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 0}}>
                <Button type="submit">Add</Button>
                </Col>
                </Form.Group>
            </Form>

            <Row>
            {
                this.props.board.columns.map(column => (
                    <Column 
                        key={column.id} 
                        column={column}
                        member_id= {this.props.board.member_id}
                        board_code= {this.props.board.code}
                    />
                )) 
            }
            </Row>
            </>
        );
    }
}