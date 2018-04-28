import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addCategory } from '../Actions/actions';
import styled, { keyframes } from 'styled-components';
import '../css/index.css';

const InputButtonWrap = styled.div`
    display:flex;
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
    margin:5px 0 0 55px;
    display:${(props) => props.isOpen ? 'block' : 'none'};
    animation: ${fadeIn} .3s ease-out;
`;

class InputCategory extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
            category:'',
            name: this.props.name,
            type: this.props.type,
            id:0,
            placeholder:this.props.placeholder
        };
        this.handleChange = this.handleChange.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.enterCategory = this.enterCategory.bind(this);
    }

    handleChange(e){
        let value = e.target.value;
        this.setState((state) => ({ category: value }));
    }

    addCategory(e){
        let userText = this.state.category.replace(/^\s+/, '').replace(/\s+$/, '');
        if (userText === '') {
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
        let newId = 0;
        let promise = new Promise((resolve) => {
            if(!this.props.categoryList.length){
                this.setState((state) => ({ id: 0 }));
            }
            resolve();
        });
        promise.then(result => {
            newId = this.state.id;
            this.props.addCategory(this.state.category, newId);
       });
        promise.then(result => {
            newId++;
            this.setState({category: '', id:newId});
        });
    }

    enterCategory(e){
        if(e.key === "Enter"){
            this.addCategory();
        }
    }

    render(){
        return(
            <div>
            <InputButtonWrap>
                <input  className="input-style"
                        name={this.state.name}
                        type={this.state.type}
                        placeholder={this.state.placeholder}
                        value={this.state.category}
                        onChange={this.handleChange}
                        onKeyPress={this.enterCategory}
                />
                <button className="button-style" onClick={this.addCategory} >Add</button>
            </InputButtonWrap>
            <Warning isOpen={this.state.isOpen} id="Warning">Enter category name</Warning>
                </div>
        )
    }
}


const mapStateToProps = state => {
    return {
    categoryList: state.CategoryList
    };
};
const mapDispatchToProps =  {
    addCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(InputCategory);



