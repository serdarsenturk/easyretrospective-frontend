import { Container } from 'react-bootstrap';
import Board from '../../components/board';
import cookies from 'next-cookies';

export default function BoardDetail({ board }) {

  return (
    <Container>
      <Board board={board}/>
    </Container>
  )
}

export async function getServerSideProps(context){
  const { code } = context.query;
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/boards/${code}`)

  const board = await res.json()
  
  return {
    props: {
      board : board, 
    }  
  }
}