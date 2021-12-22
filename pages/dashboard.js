import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import BoardTab from '../components/board_tab'
import { useRouter} from 'next/router'
import { useEffect, useState } from "react";
import {Col, Row, Tab, Nav} from "react-bootstrap";
import CreateBoard from '../components/create_board';
import Pusher from 'pusher-js'

function Dashboard({ boards, member_teams }) {
  const router = useRouter()

  const [ publicBoardList, setPublicBoardList ] = useState(boards.filter(board => board.team_id === null))
  var teams = member_teams[0]["teams_members"]

	useEffect(() => {
    Pusher.logToConsole=process.env.NEXT_PUBLIC_PUSHER_DEBUGGING

		const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
			cluster: 'eu',
      encrypted: true
		})

		const channel = pusher.subscribe('member-1');

		channel.bind('board-deleted',function(deleted_board) {
        setPublicBoardList(publicBoardList.filter(board => board.code != deleted_board.code));
		})
		
		channel.bind('board-updated',function(updated_board) {
      const boardList = publicBoardList;
      const boardIndex = publicBoardList.findIndex(board => board.code === updated_board.code);
      boardList[boardIndex].name = updated_board.name;

      setPublicBoardList(boardList.filter(board => board.team_id === null));
  })

		return (() => {
			pusher.unsubscribe('member-1')
		})
	}, []);

  const clickMe = (board) => {
    router.push(`/boards/${board.code}`)
  }

  const handleDelete = (board) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/1/boards/${board.code}` , {
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
                    <CreateBoard team_id=''/>
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
                            <Button style={ { margin: '1rem'}} variant="primary" onClick={() => handleDelete(board)}>DELETE</Button>
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
              <BoardTab team={team}/>
            ))}
					</Row>
      </>
  )
}

Dashboard.getInitialProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/1/boards`)
  const boards = await res.json()

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/1/teams`)
  const member_teams = await response.json()

  return { boards: boards , member_teams: member_teams}
}

export default Dashboard