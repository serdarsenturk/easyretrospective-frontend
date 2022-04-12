import React, { Component } from "react";
import CreateBoard from "./create_board";
import Pusher from 'pusher-js'
import { withRouter } from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Button, Container, Dropdown } from "react-bootstrap";
class BoardContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {team_id: this.props.team_id, team_name: '', boards: [], member_id: this.props.member_id};
        this.router = props.router
    }
    
    componentDidMount(){
      Pusher.logToConsole=process.env.NEXT_PUBLIC_PUSHER_DEBUGGING

      if (this.state.team_id != null){
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/teams/${this.state.team_id}/boards` , {
            method: 'GET',
          })
          .then((res) => res.json())
          .then(team => {
              this.setState({boards: team[0].boards})
              this.setState({team_name: team[0].name})
        })
      }
      else {
          this.setState({team_name: 'Private Boards'})
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${this.state.member_id}/boards` , {
            method: 'GET',
            })
            .then((res) => res.json())
            .then(boards => {
                this.setState({boards: boards})
          })
      }
        
      this.pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
          cluster: 'eu',
          encrypted: true
      });

      this.channel_dashboard = this.pusher.subscribe(`member-${this.state.member_id}`);

      this.channel_dashboard.bind('board-created', function(created_board) {
          this.state.boards.push(created_board);
        })

      this.channel_dashboard.bind('board-deleted', function(deleted_board) {
          this.setState({boards: this.state.boards.filter(board => board.code != deleted_board.code)});
        })

      this.channel_dashboard.bind('board-updated', function(updated_board) {
        const boardList = this.state.boards;
        console.log("serdar")
        const boardIndex = boardList.findIndex(board => board.code === updated_board.code);
        boardList[boardIndex].name = updated_board.name;

        if(boardList[boardIndex].team_id){
          this.setState({boards: boardList.filter(board => board.team_id == boardList[boardIndex].team_id)});
        }
        else {
          this.setState({boards: boardList.filter(board => board.team_id === null)});               
        }
      })
    }
}

export default withRouter(BoardContainer)