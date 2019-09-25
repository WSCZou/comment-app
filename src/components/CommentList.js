import React, { Component } from 'react'

import PropTypes from 'prop-types'
import CommentV1 from './commentV1'
class CommentList extends Component{
    static propsTypes = {
        comment: PropTypes.array,
        onDeleteComment: PropTypes.func,
        onReplyComment: PropTypes.func,
    }

    static defaultProps = {
        comments: []
    }

    handleDeleteComment (index) {
        if (this.props.onDeleteComment) {
          this.props.onDeleteComment(index)
        }
      }
    
    handleReplyComment (comment,index) {
        if (this.props.onReplyComment) {
            this.props.onReplyComment(comment,index)
        }
      }

    render(){
        return(
            <div>
            {this.props.comments.map((comment,i) =>
             <CommentV1 comment={comment} 
                      key={i} 
                      index={i} 
                      onDeleteComment={this.handleDeleteComment.bind(this)}
                      onPostReply={this.handleReplyComment.bind(this)}/>)}
            </div>
        )
    }
}

export default CommentList