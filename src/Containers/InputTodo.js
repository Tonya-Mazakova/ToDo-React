import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { addTodo } from '../Actions/actions';
import '../css/index.css';


const InputButtonWrap = styled.div`
    display:flex;
    justify-content:flex-end;
`;

const fadeIn = keyframes`
    0%   { margin-top: 5px }
    15%  {margin-top: 8px}
    30%  {margin-top: 5px}
    45%  {margin-top: 8px}
    100% {margin-top: 5px }
`;

const Warning = styled.p`
    font-size:16px;
    color:red;
    margin:5px 120px 0 0;
    text-align:right;
    display:${(props) => props.isOpen ? 'block' : 'none'};
    animation: ${fadeIn} .3s ease-out;
`;

class InputTodo extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            warning:"",
            isOpen:false,
            todo:'',
            idCategory:this.props.idCategory,
            name: this.props.name,
            type: this.props.type,
            id:'',
            placeholder:this.props.placeholder
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.enterTodo = this.enterTodo.bind(this);
    }

    handleChange(e){
        const value = e.target.value;
        this.setState((state) => ({ todo: value }));
    }

    addTodo(e){
        let userText = this.state.todo.replace(/^\s+/, '').replace(/\s+$/, '');
        if (userText === '') {
            this.setState({warning:"Enter todo name"});
            let input = e.target.previousSibling;
            input.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
            this.setState({isOpen:true});
            setTimeout(
                ()=>{this.setState({isOpen:false});
                    input.style.backgroundColor = "white";
                }
                ,1000);
            return true;
        }

        let todo = this.state.todo;
        let promise = new Promise((resolve) => {
            if(!this.props.TodoList.length){
                this.setState((state) => ({ id: 0 }));
            }
            resolve();
        });
        promise.then(result => {
            let id = this.state.id + 1;
            this.props.addTodo(todo);
            this.setState({todo: '', id: id})
        });
    }

    enterTodo(e){
        if(e.key === "Enter"){
            this.addTodo();
        }
    }

    render(){
        return(
            <div>
            <InputButtonWrap id="inputTodo">
                <input  className="input-style"
                        name={this.state.name}
                        type={this.state.type}
                        placeholder={this.state.placeholder}
                        value={this.state.todo}
                        onChange={this.handleChange}
                        onKeyPress={this.enterTodo}
                />
                <button className="button-style" onClick={this.addTodo}>Add</button>
            </InputButtonWrap>
            <Warning isOpen={this.state.isOpen} id="Warning">{this.state.warning}</Warning>
                </div>
            )
        }
    }


const mapStateToProps = state => {
    return {
        TodoList: state.TodoList,
        idCategory: state.idCategory
    };
};
const mapDispatchToProps =  {
    addTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTodo);



