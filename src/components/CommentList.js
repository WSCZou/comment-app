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

    handleDeleteComment (index,childrenindex) {
        if (this.props.onDeleteComment) {
          this.props.onDeleteComment(index,childrenindex)
        }
      }
    
    handleReplyComment (index,childrenindex) {
        if (this.props.onReplyComment) {
            this.props.onReplyComment(index,childrenindex)
        }
      }
    
    
    render(){
        return(
            <div>
            {
                this.props.comments.map((comment,i) =>{
                    return(
                    <div key={i}>
                    <CommentV1 
                    comment={comment} 
                    key={i} 
                    index={i} 
                    onDeleteComment={this.handleDeleteComment.bind(this)}
                    onPostReply={this.handleReplyComment.bind(this)}/>
                    {
                        comment.children.map((childComment,j) => (
                            <CommentV1 
                            comment={childComment} 
                            key={j} 
                            index={i}
                            childrenindex={j} 
                            onDeleteComment={this.handleDeleteComment.bind(this)}
                            onPostReply={this.handleReplyComment.bind(this)}/>
                        ))
                    }
                    </div>)
                })}
            </div>
        )
    }
}

export default CommentList