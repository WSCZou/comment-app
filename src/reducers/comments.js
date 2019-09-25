// action types
const INIT_COMMENTS = 'INIT_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const REPLY_COMMENT = 'REPLY_COMMENT'

//reducer
/**
 * comments 的每一项的结构设计
 * { username, email, content, header, children: [] }
 * 可以添加一个 children 字段，来储存当前评论的回复评论，这样数据之间更有关联性
 */
export default function(state, action){//相当于34节中的 stateChanger
  if(!state){
    state = { comments: [] }
  }
  switch(action.type){
    case INIT_COMMENTS:
      //初始化评论
      return { comments: action.comments }
    case ADD_COMMENT:
      //新增评论
      return {
        comments: [action.comment, ...state.comments]
      }
    case DELETE_COMMENT:
      //删除评论
      return {
        comments: [
          ...state.comments.slice(0, action.commentIndex),
          ...state.comments.slice(action.commentIndex + 1)
        ]
      }
    case REPLY_COMMENT:
      //回复评论
      // TODO 回复评论后，应该操作当前评论的 children
      return {
        comments: [
          ...state.comments.splice(action.commentIndex, 0, action.comment)
        ]
      }
    default:
      return state
  }
}

//action creators
export const initComments = (comments) => {
  return { type: INIT_COMMENTS, comments }
}

export const addComment = (comment) => {
  return { type: ADD_COMMENT, comment }
}

export const deleteComment = (commentIndex) => {
  return { type: DELETE_COMMENT, commentIndex }
}

export const replyComments = (comment,commentIndex) => {
  return { type: REPLY_COMMENT, comment, commentIndex }
}
