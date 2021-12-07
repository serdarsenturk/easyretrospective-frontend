import Board from '../../components/board'

export default function BoardDetail({ board }) {

  return (
    <div>
      <Board board={board}/>
    </div>
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