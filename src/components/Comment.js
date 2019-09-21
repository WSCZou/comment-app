import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Input } from 'antd'
class Comment extends Component {
  static propType = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
  }

  constructor(){
    super()
    this.state = { timeString: '',
                   isReply:false}
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
      this.props.onDeleteComment(this.props.index)
    }
  }

  handleReplyComment(){
    this.setState({
      isReply:true
    })
  }

  creatInput(){
    if(this.state.isReply)
      {return  '<Input>' }
    else
      return ''
    
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
        <span 
          className='comment-reply'
          onClick={this.handleReplyComment.bind(this)}>
          回复
        </span>
        <div className='reply'
             dangerouslySetInnerHTML={{
              __html: this.creatInput()}
             }/>
      </div>
    )
  }
}

export default Comment