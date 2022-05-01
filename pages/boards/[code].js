import { Container } from 'react-bootstrap';
import Board from '../../components/board';

export default function BoardDetail({ board }) {

  return (
    <Container>
      <Board board={board}/>
    </Container>
  )
}

export async function getServerSideProps(ctx){
  const { code } = ctx.query;
  
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/boards/${code}`)

  const board = await res.json()
  
  return {
    props: {
      board : board, 
    }  
  }
}