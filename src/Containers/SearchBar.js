import React, { PureComponent } from 'react';
import check from '../images/check.png';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import {  filterTodo } from '../Actions/actions';
import { withRouter } from 'react-router-dom';
import '../css/index.css';

const Form = styled.form`
   display:flex;
   align-items:center;
`;

const fadeIn = keyframes`
    0%   { margin-top: 2px }
    15%  { margin-top: 5px }
    30%  { margin-top: 2px }
    45%  { margin-top: 5px }
    100% { margin-top: 2px }
`;

const Warning = styled.p`
    font-size:16px;
    color:red;
    margin:2px 70px 0 0;
    text-align:right;
    display:${(props) => props.isOpen ? 'block' : 'none'};
    animation: ${fadeIn} .3s ease-out;
`;

const ShowDone = styled.span`
    position: absolute;
    font-size:14px;
    display:flex;
    top:10px;
    right:10px;
`;

const Checkmark = styled.span`
    position: absolute;
    top: 50%;
    left: 0;
    margin-top:-8px;
    height: 16px;
    width: 16px;
    background-color: white;
`;

const LabelCheckbox = styled.label`
    color:${(props)=>props.styleDone ? "#57ecbd":"grey"};
    display: flex;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    font-size: 16px;
`;

const Checkbox = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    &:checked+${Checkmark}{
      background-image:url(${check});
      background-position:center;
      background-repeat:no-repeat;
    }

`;

class SearchBar extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            isChecked:false,
            warning:"",
            isOpen:false,
            idCategory:'',
            value:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        let target = event.target,
            idCategory = this.props.idCategory;

        if(!idCategory){
            this.setState({warning:"Select category"});
            target.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
            this.setState({isOpen:true});
            setTimeout(
                ()=>{this.setState({isOpen:false});
                    target.style.backgroundColor = "white";
                }
                ,1000);
            return true;
        }

        switch(target.type) {
            case 'checkbox':
                this.props.filterTodo(this.state.value, !this.state.isChecked);
                this.setState({
                    isChecked:!this.state.isChecked
                });
                break;
            case 'text':
                let value = event.target.value,
                    userText = value.replace(/\\+$/, "");
                this.setState({
                    value:userText
                });
                this.props.filterTodo(userText, this.state.isChecked);
                break;
            default:
                break;
        }
    }

    render(){
        return(
            <div>
            <Form>
                <LabelCheckbox>
                    <ShowDone>Done</ShowDone>
                    <Checkbox
                        id="check"
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isChecked}
                        onChange={this.handleInputChange} />
                    <Checkmark></Checkmark>
                </LabelCheckbox>
                <input  className="input-style"
                        name="Search"
                        type="text"
                        placeholder="Search"
                        value={this.state.value}
                        onChange={this.handleInputChange} />
            </Form>
            <Warning isOpen={this.state.isOpen} id="Warning">{this.state.warning}</Warning>
                </div>
        )}
    }

const mapStateToProps = state => {
    return {
        CategoryList: state.CategoryList,
        TodoList: state.TodoList,
        idCategory: state.idCategory
    };
};

const mapDispatchToProps =  {
    filterTodo
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));