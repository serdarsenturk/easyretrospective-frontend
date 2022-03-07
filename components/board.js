import React from 'react'
import Column from '../components/column'
import { Form, Button, Row } from 'react-bootstrap'
import BoardName from '../components/board_name'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Pusher from 'pusher-js'

export default class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {board: this.props.board, column_name: ''}
    }

    componentDidMount() {
        Pusher.logToConsole=process.env.NEXT_PUBLIC_PUSHER_DEBUGGING
        
        this.pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
            cluster: 'eu',
            encrypted: true
          });

          this.channel = this.pusher.subscribe(`board-${this.state.board.code}`)

          this.channel.bind('column-created', new_column => {
            var newColumnList = this.state.board.columns;
            newColumnList.push(new_column);
            const newBoard = {id: this.state.board.id, columns: newColumnList, code: this.state.board.code, member_id: this.props.board.member_id};
            this.setState({board: newBoard});
    })

        this.channel.bind('column-updated', updated_column => {
            var newColumnList = this.state.board.columns;
            const columnIndex = newColumnList.findIndex(column => column.id == updated_column.id);
            newColumnList[columnIndex].name = updated_column.name;
            const newBoard = {id: this.state.board.id, columns: newColumnList, code: this.state.board.code, member_id: this.props.board.member_id};
            this.setState({board: newBoard});
        })

        this.channel.bind('column-deleted', deleted_column => {
            var columnList = this.state.board.columns;
            var newColumnList = columnList.filter(column => column.id != deleted_column.id);
            const newBoard = {id: this.state.board.id, columns: newColumnList, code: this.state.board.code, member_id: this.props.board.member_id};
            this.setState({board: newBoard});
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/1/boards/${this.props.board.code}/columns` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": this.state.column_name
            })
          })
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