import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import Comment from './Comment'
export default class CommentApp extends Component {
  render() {
    return (
      <div className='wrapper'>
        <CommentInput />
        <CommentList />
        <Comment/>
      </div>
    )
  }
}