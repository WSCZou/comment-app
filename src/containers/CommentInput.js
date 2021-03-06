import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentInput from '../components/CommentInput'

import { addComment } from '../reducers/comments'

// CommentInputContainer
// 负责用户名的加载、保存，评论的发布
class CommentContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func,
    content: PropTypes.any,
    replyIndex: PropTypes.number
    
  }

  constructor () {
    super()
    this.state = { 
      username: '' ,
      header:'',
      email:''
    }
  }

  componentWillMount () {
    // componentWillMount 生命周期中初始化用户名
    this._loadEmail()
    this._loadUsername()
  }

  _loadUsername () {
    // 从 LocalStorage 加载 username
    // 然后可以在 render 方法中传给 CommentInput
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  _loadEmail () {
    // 从 LocalStorage 加载 email
    // 然后可以在 render 方法中传给 CommentInput
    const email = localStorage.getItem('email')
    if (email) {
      this.setState({ email })
    }
  }



  /*_loadHeader(){
    const header = localStorage.getItem('header')
    if (header) {
      this.setState({ header })
    }
  }*/



  _saveUsername (username) {
    // 看看 render 方法的 onUserNameInputBlur
    // 这个方法会在用户名输入框 blur 的时候的被调用，保存用户名
    localStorage.setItem('username', username)
  }

  _saveEmail(email){
    localStorage.setItem('email', email)
  }

  handleSubmitComment (comment) {
    // 评论数据的验证
    
    if (!comment) return
    if (!comment.username) return alert('请输入用户名')
    if (!comment.content) return alert('请输入评论内容')
    // 新增评论保存到 LocalStorage 中
    const { comments } = this.props 
    //console.log(this.props.comments)

    console.log(this.props.replyIndex)
    //console.log(this.props.content)
    if(this.props.replyIndex !== -1){
      let commentsp = JSON.parse(JSON.stringify(comments))      
      commentsp[this.props.replyIndex].children.push(comment)      
      const newComments = [...commentsp]     
      localStorage.setItem('comments', JSON.stringify(newComments))
      
    }
    else{
      const newComments = [comment, ...comments]
      localStorage.setItem('comments', JSON.stringify(newComments))
    }

    // this.props.onSubmit 是 connect 传进来的
    // 会 dispatch 一个 action 去新增评论
    if (this.props.onSubmit) {
      this.props.onSubmit(comment,this.props.replyIndex)
    }
  }

  render () {
    return (
      <CommentInput
        username={this.state.username}
        content={this.props.content}
        email={this.state.email}
        onUserNameInputBlur={this._saveUsername.bind(this)}
        onSubmit={this.handleSubmitComment.bind(this)} 
        header={this.state.header} 
        onEmailInputBlur={this._saveEmail.bind(this)}
        replyIndex = {this.props.replyIndex}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    content: state.content,
    replyIndex: state.replyIndex
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment,replyIndex) => {
      dispatch(addComment(comment,replyIndex))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentContainer)