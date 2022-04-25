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

export async function getServerSideProps(ctx){
  const { code } = ctx.query;
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/boards/${code}`, {
    method: 'GET',
    headers: {
      'member_id': `${cookies(ctx).member_id}`
    } 
  })

  const board = await res.json()
  
  return {
    props: {
      board : board, 
    }  
  }
}