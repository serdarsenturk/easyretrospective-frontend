import Pusher from 'pusher-js'
import cookies from 'next-cookies'
import Button from 'react-bootstrap/Button';
import CreateBoard from '../components/create_board';
import { Row, Tab, SSRProvider, TabContainer, Col, Nav, Sonnet } from "react-bootstrap";
import { useEffect, useState } from "react";
import { faTrash, faTachometer, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from "next/router";

function Dashboard({ boards, cookies}) {
  const member_id = cookies.member_id
  const team_id = cookies.team_id
  const [publicBoardList, setPublicBoardList] = useState(boards.filter(board => board.team_id == null && board.team_id != team_id))
  const [member_team_boards, setMemberTeamBoards] = useState(boards.filter(board => board.team_id == team_id))
  const router = useRouter();

	useEffect(() => {
    Pusher.logToConsole=process.env.NEXT_PUBLIC_PUSHER_DEBUGGING

		const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
			cluster: 'eu',
      encrypted: true
		})

		const channel = pusher.subscribe(`member-${member_id}`);

		channel.bind('board-created', function(created_board) {
      publicBoardList.push(created_board)
    })

		channel.bind('board-deleted', function(deleted_board) {
        setPublicBoardList(publicBoardList.filter(board => board.code != deleted_board.code));
	  })
		
		channel.bind('board-updated', function(updated_board) {
      const boardList = boards;
      const boardIndex = boardList.findIndex(board => board.code === updated_board.code);
      boardList[boardIndex].name = updated_board.name;

      if(boardList[boardIndex].team_id){
        setMemberTeamBoards(boardList.filter(board => board.team_id == boardList[boardIndex].team_id))
      }
      else{
        setPublicBoardList(boardList.filter(board => board.team_id === null));
      }
    })

		return (() => {
			pusher.unsubscribe(`member-${member_id}`)
		})
	}, []);

  const handleDelete = (board, member_id) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${member_id}/boards/${board.code}` , {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      }
    })
  }

  const handleClick = (board_code) => {
    router.push(`/boards/${board_code}`)
  }

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