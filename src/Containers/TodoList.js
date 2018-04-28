import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Todo from '../Components/Todo';

const TodoListDiv = styled.div`
    width:525px;
    overflow:auto;
    padding-left:0;
    margin-top:20px;
`;


class TodoList extends PureComponent{
    render(){
        return (<TodoListDiv id="TodoListDiv"><Todo/></TodoListDiv>)
    }
}

export default TodoList;

