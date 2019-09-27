import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Avatar} from 'antd'
import 'antd/dist/antd.css'
import CommentList from '../containers/CommentList'

const { TextArea } = Input;

export default class CommentInput extends Component{
    static propTypes = {
        username: PropTypes.any,
        email:PropTypes.any,
        onSubmit: PropTypes.func,
        onUserNameInputBlur: PropTypes.func,
        header: PropTypes.any,
        onEmailInputBlur:PropTypes.func,
        onReply: PropTypes.func

    }

    static defaultProps = {
        username: '',
        email:''
    }

    constructor(props){
        super(props)
        this.state = {
            username: props.username,//从 props 上取 username 字段
            content: '',
            header: props.header,//从 props 上取 头像
            email:props.email,//从 props 上取 email 字段
            
        }
        this.headerList = []
        for(let i= 0; i < 4; i++){
            this.headerList.push(require(`../assets/${i+1}.jpg`))
        }
    }

    componentDidMount(){
        this.TextArea.focus()
    }

    handleUsernameBlur(event){
        if(this.props.onUserNameInputBlur){
            this.props.onUserNameInputBlur(event.target.value)
        }
    }

    handldEmailBlur(event){
        if(this.props.onEmailInputBlur){
            this.props.onEmailInputBlur(event.target.value)
        }
    }

    handleUsernameChange(event){
        this.setState({
            username: event.target.value
        })
    }

    handleEmailChange(event){
        this.setState({
            email: event.target.value
        })
    }
    
    handleContentChange(event){
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit(){
        if(this.props.onSubmit){
            this.props.onSubmit({ //这里传的是comment这个对象
                username: this.state.username,
                email: this.state.email,
                content: this.state.content,
                createdTime: +new Date(),
                header: this.state.header
            })
        }
        this.setState({content: ''})
    }

    handleReply(){
        return{
            comment:{
                username: this.state.username,
                email: this.state.email,
                content: this.state.content,
                createdTime: +new Date(),
                header: this.state.header}}
    }

    handleAvatar(event){
        this.setState({
            header: event.target.src
        })
    }

    render(){
        const listHeader = !this.state.header ? '请选择头像':(
            <div>已选择头像:<Avatar src={this.state.header}></Avatar></div>
        )

        return(
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名</span>
                    <div className='comment-field-input'>
                        <Input placeholder="输入用户名" allowClear
                            value={this.state.username}
                            onBlur={this.handleUsernameBlur.bind(this)}
                            onChange={this.handleUsernameChange.bind(this)}/>
                    </div>
                </div>
                <div className='e-mail-field'>
                    <span className='e-mail-field-name'>邮箱地址</span>
                    <div className='comment-field-input'>
                        <Input placeholder="输入邮箱地址" allowClear
                            value={this.state.email}
                            onBlur={this.handldEmailBlur.bind(this)}
                            onChange={this.handleEmailChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-filed'>
                    <span className='comment-filed-name'>评论内容</span>
                    <div className='comment-field-input'>
                        <TextArea placeholder="输入内容" autosize 
                            ref={(TextArea)=> this.TextArea = TextArea} 
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-fild'>
                    <div className='comment-fild-avatar'>{!this.state.header ? '请选择头像':(
                        <div>已选择头像:<Avatar src={this.state.header}></Avatar></div>)}
                    </div>
                    
                    <Avatar src={this.headerList[0]} 
                            onClick={this.handleAvatar.bind(this)}></Avatar>
                    <Avatar src={this.headerList[1]}
                            onClick={this.handleAvatar.bind(this)}></Avatar>
                    <Avatar src={this.headerList[2]}
                            onClick={this.handleAvatar.bind(this)}></Avatar>
                    <Avatar src={this.headerList[3]}
                            onClick={this.handleAvatar.bind(this)}></Avatar>
                    

                </div>
                <div className='comment-field-button'>
                    <Button type='primary'
                        onClick={this.handleSubmit.bind(this)}>
                        发布
                    </Button>
                </div>
                <CommentList
                    onReply={this.handleReply()}/>
            </div>

            
        )
    }
}

