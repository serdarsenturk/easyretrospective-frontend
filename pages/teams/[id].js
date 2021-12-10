import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter} from 'next/router'
import {Col} from "react-bootstrap";

function Teams({boards}) {
  const router = useRouter()

  const clickMe = (board) => {
    router.push(`/boards/${board.code}`)
  }

    return (
      <div>

      <Button style={ { margin: '3rem'}} variant="primary">Create Team</Button>

      {boards.map((board) => (
        <div key={board.id} onClick={() => clickMe(board)}>
        <Card style={{ width: '18rem',float:'right' }}>
          <Card.Body>
            <Card.Title>{board.name}</Card.Title>
            <Card.Text>
              Team Id: {board.code}
            </Card.Text>
            <Col>
              <Button variant="primary">URL</Button>
            </Col>
          </Card.Body>
        </Card>
        </div>
      ))}
      </div>
  )
}


Teams.getInitialProps = async (context) => {
  const { id } = context.query; 
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teams/${id}/boards`)
  const boards = await res.json()

  return { boards: boards }
}

export default Teams