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
	  })
		
		channel.bind('board-updated',function(updated_board) {
		channel.bind('board-updated', function(updated_board) {
      const boardList = publicBoardList;
      const boardIndex = publicBoardList.findIndex(board => board.code === updated_board.code);
      boardList[boardIndex].name = updated_board.name;

      setPublicBoardList(boardList.filter(board => board.team_id === null));
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

    console.log("Board deleted");
  }

    return (
      <>      
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                    <Nav.Link eventKey="first">Public</Nav.Link>
                    <CreateBoard member_id={member_id}/>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                    {publicBoardList.map((board) => (
                      // <Col key={board.id} onClick={() => clickMe(board)}>
                      <Col>
                      <Card style={{ width: '18rem',float:'right' }}>
                        <Card.Body>
                          <Card.Title>{board.name}</Card.Title>
                          <Card.Text>
                            Board Code: {board.code}
                            <br/>
                            Board Date: {board.date}
                          </Card.Text>
                          <Col>
                            <Button variant="primary">URL</Button>
                            <Button style={ { margin: '1rem'}} variant="primary" onClick={() => handleDelete(board, member_id)}>DELETE</Button>
                            <Button style={ { margin: '1rem'}} variant="primary" onClick={() => clickMe(board)}>GOTO</Button>
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
					<Row>
            {teams.map((team) =>(
              <BoardTab team={team} member_id={member_id}/>
            ))}
					</Row>
      </>
  )
}

Dashboard.getInitialProps = async (ctx) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${cookies(ctx).member_id}/boards`)
  const boards = await res.json()

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${cookies(ctx).member_id}/teams`)
  const member_teams = await response.json()

  return { boards: boards , member_teams: member_teams , cookies: cookies(ctx)}
}

export default Dashboard