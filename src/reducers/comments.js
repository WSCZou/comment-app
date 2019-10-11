// action types
const INIT_COMMENTS = 'INIT_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const REPLY_COMMENT = 'REPLY_COMMENT'
const REPLY_CONTENT = 'REPLY_CONTENT'
//reducer
export default function(state, action){//相当于34节中的 stateChanger
    if(!state){
        state = { 
            comments: [],
            content: '',
            replyIndex: -1
          }
    }
    switch(action.type){
        case INIT_COMMENTS:
            //初始化评论
            return { 
                comments: action.comments,
                content: '',
                replyIndex: -1
            }
        case ADD_COMMENT:
            //新增评论
            
            if(action.replyIndex !== -1){
                state.comments[action.replyIndex].children.push(action.comment)
                return{
                    comments:[...state.comments],
                    replyIndex: -1
                }
            }
            else{
                return {
                    comments:[action.comment,...state.comments],
                    replyIndex: -1
                }
            }
        case DELETE_COMMENT:
            //删除评论
            //console.log(action.childrenindex+'!!!!')
            if(action.childrenindex>=0){
                state.comments[action.commentIndex].children.splice(action.childrenindex,1)
                
                //console.log(state.comments[action.commentIndex].children+'!!!!!')
                return{ 
                    comments : [
                        ...state.comments
                    ],
                    replyIndex: -1
                }
            }
            else{
                return{
                    comments:[
                        ...state.comments.slice(0,action.commentIndex),
                        ...state.comments.slice(action.commentIndex+1)
                    ],
                    replyIndex: -1
                }
            }
            
        case REPLY_COMMENT:
            //回复评论
            state.comments.splice(action.commentIndex,0,action.comment)
            return{
                comments:[
                    ...state.comments
                ]
            }
        case REPLY_CONTENT:
            //设置评论内容@
            return{
                content : action.content,
                comments:[...state.comments],
                replyIndex: action.replyIndex
            }
        default:
            return state
    }
}

//action creators
export const initComments = (comments) => {
    return {type:INIT_COMMENTS, comments}
}

export const addComment = (comment,replyIndex) => {
    return { type: ADD_COMMENT,comment,replyIndex}
}

export const deleteComment = (commentIndex,childrenindex) => {
    return {type:DELETE_COMMENT, commentIndex,childrenindex}
}

export const replyComment = (comment,commentIndex) => {
    return {type:REPLY_COMMENT, comment, commentIndex}
}

export const replyContent = (content,replyIndex) => {
    return {type:REPLY_CONTENT, content,replyIndex}
}
