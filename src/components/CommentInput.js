import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, List, Grid, Avatar} from 'antd'
import 'antd/dist/antd.css'
import img from '../assets/1.jpg'

const { TextArea } = Input;

export default class CommentInput extends Component{
    static propTypes = {
        username: PropTypes.any,
        onSubmit: PropTypes.func,
        onUserNameInputBlur: PropTypes.func
    }

    static defaultProps = {
        username: ''
    }

    constructor(props){
        super(props)
        this.state = {
            username: props.username,//从 props 上取 username 字段
            content: ''
        }
        this.headerList = []
        for(let i= 0; i < 4; i++){
            this.headerList.push(require(`../assets/${i+1}.jpg`))
        }
    }

    componentDidMount(){
        this.textarea.focus()
    }

    handldUsernameBlur(event){
        if(this.props.onUserNameInputBlur){
            this.props.onUserNameInputBlur(event.target.value)
        }
    }

    handleUsernameChange(event){
        this.setState({
            username: event.target.value
        })
    }
    
    handleContentChange(event){
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit(){
        if(this.props.onSubmit){
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                createdTime: +new Date()
            })
        }
        this.setState({content: ''})
    }

    render(){
        return(
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名</span>
                    <div className='comment-field-input'>
                        <Input placeholder="输入用户名" allowClear
                            value={this.state.username}
                            onBlur={this.handldUsernameBlur.bind(this)}
                            onChange={this.handleUsernameChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-filed'>
                    <span className='comment-filed-name'>评论内容</span>
                    <div className='comment-field-input'>
                        <TextArea placeholder="输入内容" autosize 
                            ref={(textarea)=> this.textarea = textarea} 
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-fild'>
                    <span className='comment-fild-avatar'>选择头像</span>
                    <Avatar src={img}></Avatar>
                    <Avatar src={this.headerList[1]}></Avatar>
                    <Avatar src={this.headerList[2]}></Avatar>
                    <Avatar src={this.headerList[3]}></Avatar>

                </div>
                <div className='comment-field-button'>
                    <Button type='primary'
                        onClick={this.handleSubmit.bind(this)}>
                        发布
                    </Button>
                </div>
            </div>

            
        )
    }
}

