import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../components/CommentList'
import { initComments, deleteComment, replyComment, replyContent } from '../reducers/comments'


//CommentListContainer
//一个 smart 组件，负责评论列表数据的加载，初始化，删除评论
//沟通 commentlist 和 state
class CommentListContainer extends Component{
    static propTypes = {
        comments:PropTypes.array,//这个是initComments传的
        initComments:PropTypes.func,
        onDeleteComment: PropTypes.func,
        onReplyComment: PropTypes.func,
        onReply: PropTypes.func,
        onReplyContent: PropTypes.func
    }

    componentWillMount(){
        //componentWillMount 生命周期中初始化评论
        this._loadComments()
    }

    _loadComments(){
        //从 LocalStorage 中加载评论
        let comments = localStorage.getItem('comments')
        comments = comments ? JSON.parse(comments) : []
        //this.props.initComment 是 connect 传进来的
        //可以帮我们把数据初始化到 state 里面去
        this.props.initComments(comments)
        //console.log(this.props)
    }

    handleDeleteComment(index,childrenindex){
        const { comments } = this.props
        //console.log(this.props)
        //props 是不能变的，所以这里新建一个删除了特定下标的评论列表
        if(childrenindex>=0){
            comments[index].children.splice(childrenindex,1)
            
            const newComments = [
                ...comments
            ]
            //保存最新的评论列表到 LocalStorage
            localStorage.setItem('comments', JSON.stringify(newComments))
        }
        else{
            const newComments = [          //这里切片是因为要把新的评论保存到 LocalStorage
                ...comments.slice(0,index),
                ...comments.slice(index + 1)
            ]
            //保存最新的评论列表到 LocalStorage
            localStorage.setItem('comments', JSON.stringify(newComments))
        }
        
        if(this.props.onDeleteComment){
            //this.props.onDeleteComment 是 connect 传进来的
            //会 dispatch 一个 action 去删除评论
            this.props.onDeleteComment(index,childrenindex)
        }
    }

    /*handleReplyComment(index){
        const { comment } = this.props.onReply() //现在这个comment 要从 input 来
        const { comments } = this.props
        const commentsp = comments.concat()//这里是重点 如果直接commentsp = comments 那只是引用 还是会改变原数组
        //console.log(this.props)
        //props 是不能变的，所以这里新建一个回复了特定下标的评论列表
        commentsp.splice(index,0,comment)
        console.log(comments)
        const newComments = [          //这里切片是因为要把新的评论保存到 LocalStorage
            ...commentsp
        ]
        //console.log(newComments)
        //保存最新的评论列表到 LocalStorage
        localStorage.setItem('comments', JSON.stringify(newComments))
        if(this.props.onReplyComment){
            //this.props.onReplyComment 是 connect 传进来的
            //会 dispatch 一个 action 去回复评论
            this.props.onReplyComment(comment,index)
        }

    }*/

    handleReplyContent(index,childrenindex){
        const { comments } = this.props
        /*while(1){
            console.log(comments[index].username)
        }*/
        
        if(this.props.onReplyContent){
            if(childrenindex >= 0){
                console.log(comments[index].children[childrenindex].username)
                this.props.onReplyContent(comments[index].children[childrenindex].username,index)
            }
            else{
                this.props.onReplyContent(comments[index].username,index)
            }
        }
    }


    
    render(){
        return (
            <CommentList
                comments={this.props.comments}
                onDeleteComment={this.handleDeleteComment.bind(this)}
                onReplyComment={this.handleReplyContent.bind(this)}/>
        )
    }
}

//评论列表从 state.comments 中获取
const mapStateToProps = (state) => {
    console.log(state.comments)
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // 提供给 CommentListContainer
        // 当从 LocalStorage 加载评论列表以后就会通过这个方法
        // 把评论列表初始化到 state 当中
        initComments: (comments) => {
            dispatch(initComments(comments))
        },
        //删除评论
        onDeleteComment: (commentIndex,childrenindex) => {
            dispatch(deleteComment(commentIndex,childrenindex))
        },

        //@回复
        onReplyContent:(content,replyIndex) => {
            dispatch(replyContent(content,replyIndex))
        }
        
    }
}

// 将 CommentListContainer connect 到 store
// 会把 comments、initComments、onDeleteComment 传给 CommentListContain
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentListContainer)