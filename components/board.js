import React from 'react'
import Column from '../components/column'
import { Form, Button, Container, Row, Col, Stack, SSRProvider } from 'react-bootstrap'
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

          this.channel_column = this.pusher.subscribe(`board-${this.state.board.code}`)
          this.channel_board = this.pusher.subscribe(`member-${this.state.board.member_id}`)

          this.channel_board.bind('board-updated', updated_board => {
            var boardNameHasChanged = {id: this.state.board.id, columns: this.state.board.columns, code: updated_board.code, name: updated_board.name, member_id: this.props.board.member_id }
            this.setState({board: boardNameHasChanged})
        })

          this.channel_column.bind('column-created', new_column => {
            var newColumnList = this.state.board.columns;
            newColumnList.push(new_column);
            const newBoard = {id: this.state.board.id, columns: newColumnList, code: this.state.board.code, member_id: this.props.board.member_id};
            this.setState({board: newBoard});
        })

        this.channel_column.bind('column-updated', updated_column => {
            var newColumnList = this.state.board.columns;
            const columnIndex = newColumnList.findIndex(column => column.id == updated_column.id);
            newColumnList[columnIndex].name = updated_column.name;
            const newBoard = {id: this.state.board.id, columns: newColumnList, code: this.state.board.code, member_id: this.props.board.member_id};
            this.setState({board: newBoard});
        })

        this.channel_column.bind('column-deleted', deleted_column => {
            var columnList = this.state.board.columns;
            var newColumnList = columnList.filter(column => column.id != deleted_column.id);
            const newBoard = {id: this.state.board.id, columns: newColumnList, code: this.state.board.code, member_id: this.props.board.member_id};
            this.setState({board: newBoard});
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.props.board.member_id}/boards/${this.props.board.code}/columns` , {
            method: 'POST',
            credentials: 'include',
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
        this.channel_column.unbind();
        this.channel_board.unbind();

        this.pusher.unsubscribe(this.channel_column);
        this.pusher.unsubscribe(this.channel_board);
    }

    render(){
        return (    
        <>
        <SSRProvider>
        <Container  className="d-flex flex-column">
            <Col className="col-sm-12 mx-auto my-1">
                <Row>
                    <Form className="my-2" style={{display:'flex', justifyContent:'right'}} onSubmit={this.handleSubmit}>
                        <Stack direction="horizontal" gap={2}>
                        <Form.Control type="text" placeholder="Enter column name" onChange={(event) => this.handleChange(event)} />
                            <Button type="submit">
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Stack>
                    </Form>
                </Row>
                <Row>
                    <BoardName board={this.state.board} />
                </Row>
            </Col>
            <Row>
                <Col>
                    <Container className="d-flex overflow-auto">
                        {this.state.board.columns.map(column => (
                            <Stack key={column.id} className="col-7 col-lg-3 col-md-4 col-sm-6 mx-2">
                                <Column 
                                    column={column}
                                    member_id= {this.state.board.member_id}
                                    board_code= {this.state.board.code} 
                                />
                            </Stack>
                        ))}
                    </Container>
                </Col>
            </Row>
        </Container>
        </SSRProvider>
        </>
        );
    }
}