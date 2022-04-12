import React, { Component } from "react";
import CreateBoard from "./create_board";
import Pusher from 'pusher-js'
import { withRouter } from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Button, Container, Dropdown } from "react-bootstrap";

class BoardContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {team_id: this.props.team_id, team_name: '', boards: [], member_id: this.props.member_id};
        this.router = props.router
    }
    
    componentDidMount(){
      Pusher.logToConsole=process.env.NEXT_PUBLIC_PUSHER_DEBUGGING

      if (this.state.team_id != null){
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teams/${this.state.team_id}/boards` , {
            method: 'GET',
          })
          .then((res) => res.json())
          .then(team => {
              this.setState({boards: team[0].boards})
              this.setState({team_name: team[0].name})
        })
      }
      else {
          this.setState({team_name: 'Private Boards'})
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.state.member_id}/boards` , {
            method: 'GET',
            })
            .then((res) => res.json())
            .then(boards => {
                this.setState({boards: boards})
          })
      }
        
      this.pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
          cluster: 'eu',
          encrypted: true
      });

      this.channel_dashboard = this.pusher.subscribe(`member-${this.state.member_id}`);

      this.channel_dashboard.bind('board-created', function(created_board) {
          this.state.boards.push(created_board);
        })

      this.channel_dashboard.bind('board-deleted', function(deleted_board) {
          this.setState({boards: this.state.boards.filter(board => board.code != deleted_board.code)});
        })

      this.channel_dashboard.bind('board-updated', function(updated_board) {
        const boardList = this.state.boards;
        console.log("serdar")
        const boardIndex = boardList.findIndex(board => board.code === updated_board.code);
        boardList[boardIndex].name = updated_board.name;

        if(boardList[boardIndex].team_id){
          this.setState({boards: boardList.filter(board => board.team_id == boardList[boardIndex].team_id)});
        }
        else {
          this.setState({boards: boardList.filter(board => board.team_id === null)});               
        }
      })
    }

    handleDelete = (board, member_id) => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${member_id}/boards/${board.code}` , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
      })
    }
    
    handleClick = (board_code) => {
      this.router.push(`/boards/${board_code}`)
    }

    componentWillUnmount() {
      this.channel_dashboard.unbind();

      this.pusher.unsubscribe(this.channel_dashboard);
    }

    render(){
      return (
          <section>
          <Container>
              <Row className="display-5 d-flex">{this.state.team_name}</Row>
                  <CreateBoard member_id={this.state.member_id} team_id={this.state.team_id} />
              <Row>
                  {this.state.boards.slice(0, 10).map((board) => (
                    <Col xs={3} md={4} lg={3} className="col-6 col-xs-3 col-md-4 col-lg-3 my-2 p-2" key={board.code}>
                      <Card className="dashboard-card p-2" style={{background: "white", boxShadow: "0 0 10px rgba(0,0,0,.1)"}}>
                        <Card.Body>
                          <Card.Title>
                            <h4 onClick={() => this.handleClick(board.code)}>{board.name}</h4>
                          </Card.Title>
                          <Card.Text className="my-2" style={{fontFamily:"Roboto" ,fontSize: "12px"}}>
                            Board Code: {board.code}
                          </Card.Text>
                          <Card.Text className="my-4" style={{fontFamily:"Roboto" ,fontSize: "12px"}}>
                            Board Date: {board.date}
                          </Card.Text>
                          <Col>
                            <Row md="auto">
                              <Button className="m-2" variant="danger" onClick={() => this.handleDelete(board, this.state.member_id)}>
                                <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                              </Button>
                            </Row>
                          </Col>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
          </Container>
          </section>
      )
    }
}

export default withRouter(BoardContainer)