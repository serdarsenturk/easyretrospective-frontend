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
    <Container>
      <Row>
        <BoardContainer boards={boards} member_id={member_id} />
      </Row>
    
      <Row>
      {team_id_list.map((num) => 
        <BoardContainer key={num} member_id={member_id} team_id={num} />
      )}
      </Row>

    </Container>
    </>
    )
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${cookies(ctx).member_id}/boards`)
  const boards = await res.json()

  return { props: {boards: boards, cookies: cookies(ctx)}}
}

export default Dashboard