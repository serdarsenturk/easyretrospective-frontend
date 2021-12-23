import React, { Component } from "react";
import {Tab, Nav, Col, Row, Card, Button} from "react-bootstrap";
import CreateBoard from "./create_board";

export default class BoardTab extends Component{
    constructor(props) {
        super(props);
        this.state = {team: this.props.team, team_boards: [], member_id: this.props.member_id };
    }
  
    handleDelete = (board) => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.state.member_id}/boards/${board.code}` , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
      })
      console.log("Board deleted");
    }

    handleSelect = () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teams/${this.state.team.id}/boards` , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
          })
          .then((res) => res.json())
          .then(board => {
            setTimeout(() => {
                this.setState({team_boards: board})
            }, 10);
          });
    }

    render(){
        return (
        <>
            <Tab.Container id="left-tabs-example" onSelect={this.handleSelect}>
            <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                    <Nav.Link eventKey="second">{this.state.team.name}</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    
                <Tab.Pane eventKey="second">
                <CreateBoard member_id={this.state.member_id}/>
                    {this.state.team_boards.map((board) => (
                      <Col>
                      <Card style={{ width: '18rem',float:'right' }}>
                        <Card.Body>
                          <Card.Title>{board.name}</Card.Title>
                          <Card.Text>
                            Board Code: {board.code}
                            <br/>
                            Board Date: {board.date}
                            <br/>
                            Team id: {board.team_id}
                          </Card.Text>
                          <Col>
                            <Button variant="primary">URL</Button>
                            <Button style={ { margin: '1rem'}} variant="primary" onClick={() => this.handleDelete(board)}>DELETE</Button>
                          </Col>
                        </Card.Body>
                      </Card>
                      </Col>
                    ))}
                </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
        </>
        )
    }
}