import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Input, Button} from 'antd'


class CommentV1 extends Component {
  static propType = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number,
    onPostReply: PropTypes.func,
    childrenindex: PropTypes.number
    
  }

  constructor(){
    super()
    this.state = { 
      timeString: '',
      isReply:false,
      content: ''}
  }

  componentWillMount(){
    this._updateTimeString()
    this._timer = setInterval(
      this._updateTimeString.bind(this),5000
    )
  }

  componentWillUnmount () {
    clearInterval(this._timer)
  }


  _updateTimeString(){
    const comment = this.props.comment
    const duration = (+Date.now() - comment.createdTime) / 1000
    this.setState({
      timeString: duration > 60
        ?`${Math.round(duration / 60)}分钟前`
        :`${Math.round(Math.max(duration, 1))} 秒前`
    })
  }

  handleDeleteComment(){
    if(this.props.onDeleteComment){
      console.log(this.props.childrenindex)
      this.props.onDeleteComment(this.props.index,this.props.childrenindex)
    }
  }

//现在考虑comment怎么来 这个comment是要回复的评论 而 回复的内容comment怎么搞 ：要commentinput把数据传下来
  handleReplyComment(){
    if(this.props.onPostReply){
        this.props.onPostReply(this.props.index,this.props.childrenindex)//现在要把 this.props.comment 换成 input 的数据
        //console.log(this.props.comment)
        //console.log(this.props.childrenindex+'!')
      }
  }


  handleContentChange(event){
    this.setState({
        content: event.target.value
    })
}

  _getProcessedContent (content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
      .replace(/(http:\/\/[\w.\/]+)(?![^<]+>)/gi,"<a href='$1'>$1</a>")
  }

  render () {
    const { comment } = this.props
    return (
      <div className='comment'>
        <div className='comment-user'>
          <div><a href={"mailto:"+comment.email}><Avatar src={comment.header}></Avatar></a></div>
          <span className='comment-username'>
            {comment.username}
          </span>：
        </div>
        <p dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(comment.content)
        }} />
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span 
          className='comment-delete'
          onClick={this.handleDeleteComment.bind(this)}>
            删除
        </span>
        <Button type='primary'
          className='comment-reply'
          onClick={this.handleReplyComment.bind(this)}>
            回复
        </Button>

      </div>
    )
  }
}

export default CommentV1