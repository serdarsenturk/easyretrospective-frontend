import { useRouter}  from 'next/router'
import cookies from 'next-cookies';
import { useState } from 'react';import CreateBoard from '../components/create_board';
import BoardContainer from '../components/board_container';

import { Row, Container, Button } from "react-bootstrap";

function Dashboard({boards, cookies}) {
  const router = useRouter()
  const member_id = cookies.member_id
  const team_id_list = []

  boards.map(board => {
    if (team_id_list.indexOf(board.team_id) === -1 && board.team_id > 0) {
      team_id_list.push(board.team_id)
    }
  });

  return (
    <>
    <SSRProvider>      
      <div className="row">

          <div class="col-lg-12 p-5">
            <h1>Dashboard</h1>
            <hr />
          </div>
        </div>

        <Tab.Container defaultActiveKey="first">
          <Row className="d-flex justify-content-center">
            <Col sm={3}>
              <Nav variant="pills" className="d-flex justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="first">Private Boards</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Team Boards</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="first">

                    <Col className="d-flex justify-content-center m-3">
                      <CreateBoard member_id={member_id}/>
                    </Col>

                  <div className="card-container card--fixedWidth">

                    {publicBoardList.map((board) => (
                        <div class="board-card p-3 shadow bg-purple text-center border-0">
                            <h1 onClick={() => handleClick(board.code)} class="card-title lead">{board.name}</h1>
                            <hr />
                            <p>Board Code: {board.code}</p>
                            <p>Board Date: {board.date}</p>

                            <Col className="d-flex justify-content-center m-2 p-1">
                              <Col>
                                <Button variant="primary">
                                  <FontAwesomeIcon icon={faEdit} aria-hidden="true"/>   
                                </Button>     
                              </Col>

                              <Col>
                                <Button variant="danger" onClick={() => handleDelete(board, member_id)}>
                                  <FontAwesomeIcon icon={faTrash} aria-hidden="true"></FontAwesomeIcon>
                                </Button>
                              </Col>
                            </Col>
                        </div>
                    ))}

                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="second">
                  <Col className="d-flex justify-content-center m-3">
                    <CreateBoard member_id={member_id} team_id={team_id}/>
                  </Col>
                  <div className="card-container card--fixedWidth">
                      {member_team_boards.map((board) => (

                          <div class="board-card p-3 shadow bg-purple text-center border-0">
                              <h1 onClick={() => handleClick(board.code)} class="card-title lead">{board.name}</h1>
                              <hr />
                              <p>Board Code: {board.code}</p>
                              <p>Board Date: {board.date}</p>
                              <p>Team Id: {board.team_id}</p>

                              <Col className="d-flex justify-content-center m-2 p-1">
                              <Col>
                                <Button variant="primary">
                                  <FontAwesomeIcon icon={faEdit} aria-hidden="true"/>   
                                </Button>     
                              </Col>

                              <Col>
                                <Button variant="danger" onClick={() => handleDelete(board, member_id)}>
                                  <FontAwesomeIcon icon={faTrash} aria-hidden="true"></FontAwesomeIcon>
                                </Button>
                              </Col>
                            </Col>
                          </div>

                      ))}
                    </div>
                </Tab.Pane>
              </Tab.Content>

            </Col>
          </Row>

        </Tab.Container>

      </SSRProvider>

    </>
  )
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${cookies(ctx).member_id}/boards`)
  const boards = await res.json()

  return { props: {boards: boards, cookies: cookies(ctx)}}
}

export default Dashboard