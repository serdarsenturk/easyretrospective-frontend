import React, { Component } from "react";
import Pusher from 'pusher-js';
import firebase from 'firebase/app';
import 'firebase/auth';
import CreateBoard from "./create_board";
import { withRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Button, Container } from "react-bootstrap";

class BoardContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {team: this.props.team, boards: this.props.boards, container_name: this.props.container_name, member_id: this.props.member_id, authenticated: undefined };
        this.router = props.router
    }

    componentDidMount(){
      firebase.auth().onAuthStateChanged((authenticated) => {
        if (authenticated) {
          let idTokenfinal;
          firebase
            .auth()
            .currentUser.getIdToken()
            .then((idToken) => {
              idTokenfinal = idToken;
              if (this.state.team) {
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teams/${this.state.team.id}/boards` , {
                  method: 'GET',
                  credentials: 'include',
                  headers: {
                    'Authorization': `${idTokenfinal}`,
                  }
                })
                .then((res) => res.json())
                .then(team_board => {
                    this.setState({boards:team_board});
                })
              }
              this.setState({
                authenticated: true,
              });
            })
            .catch((e) => {
              alert(e);
            });

          firebase.auth().onIdTokenChanged(function (user) {
            if (user) {
              // User is signed in or token was refreshed.
              user.getIdToken().then((idToken) => {
                idTokenfinal = idToken;  
              });
            }
          });
        } 
      });

      this.pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
        cluster: 'eu',
        encrypted: true
      });
      
      this.channel_dashboard = this.pusher.subscribe(`member-${this.state.member_id}`);

      this.channel_dashboard.bind('board-created', created_board => {
        var temp_board_list = this.state.boards;
        temp_board_list.unshift(created_board);
        this.setState({boards: temp_board_list});
      })

      this.channel_dashboard.bind('board-deleted', deleted_board => {
          this.setState({boards: this.state.boards.filter(board => board.code != deleted_board.code)});
        })

      this.channel_dashboard.bind('board-updated', updated_board => {
        var temp_board_list = this.state.boards;
        var board_index = temp_board_list.findIndex(board => board.code === updated_board.code);
        temp_board_list[board_index] = updated_board;

        this.setState({boards: temp_board_list})
      })
    }

    handleDelete = (board, member_id) => {
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${member_id}/boards/${board.code}` , {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Authorization': `${idToken}`,
          }
        })
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
              <Row className="display-5 d-flex">{this.state.container_name}</Row>
                  <CreateBoard member_id={this.state.member_id} team_id={this.state.team ? this.state.team.id : null} />
              <Row>
                  {this.state.boards.map((board) => (
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