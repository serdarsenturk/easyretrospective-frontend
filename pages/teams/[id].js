import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter} from 'next/router'
import {Col} from "react-bootstrap";

function Teams({boards}) {
  const router = useRouter()

  const handleClick = () => {
    const { id } = router.query

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teams/${id}/boards` , {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then(board => router.push(`/boards/${board.code}`));
    console.log("Redirecting to board");
  }

  const clickMe = (board) => {
    router.push(`/boards/${board.code}`)
  }

  const handleDelete = (board) => {
    console.log(board.code)
    const { id } = router.query

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teams/${id}/boards/${board.code}` , {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      }
    })

    console.log("Board deleted");
  }

    return (
      <div>

      <Button style={ { margin: '3rem'}} variant="primary" onClick={() => handleClick()}>Create Team</Button>

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
              <Button style={ { margin: '1rem'}} variant="primary" onClick={() => handleDelete(board)}>DELETE</Button>
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