import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import {  addSubCategory, deleteCategory, editTitleCategory, takeIdCategory, deleteTodo } from '../Actions/actions';
import { withRouter } from 'react-router-dom';
import {Icon} from 'react-fa';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import '../css/index.css';

const iconStyle = {
    paddingRight:'5px'
};

const iconStyleClose = {
    position:"absolute",
    fontSize:"30px",
    top:"15px",
    right:"17px",
    cursor:"pointer"
};

const Div = styled.div`
    border:none;
    border-color:transparent;
`;

const DivItem = Div.extend`
   display:flex;
   flex-direction:row;
   width: 363px;
   padding: 7px;
   &:hover&{
     background-color: #d6f9f9;
     box-shadow: 0 0 11px 2px white inset;
   }
   &:active{
     background-color: #d6f9f9;
     box-shadow: 0 0 11px 2px white inset;
   }
`;

const ActionModal = styled.h2`
    font-family: 'Handlee', cursive;
    font-weight:bold;
`;

const fadeIn = keyframes`
    0%   { margin-top: 5px }
    15%  {margin-top: 8px}
    30%  {margin-top: 5px}
    45%  {margin-top: 8px}
    100% {margin-top: 5px }
`;

const Warning = styled.p`
    font: bold 16px 'Handlee', cursive;
    color:red;
    margin:5px 0 0 0px;
    display:${(props) => props.isOpen ? 'block' : 'none'};
    animation: ${fadeIn} .3s ease-out;
`;

const CategoryItem = styled.li`
    margin-bottom:2px;
    border-bottom:1px solid ;
    border-color:grey;
    list-style-type:none;
    width:270px;
    height:30px;
    display:inline-flex;
    justify-content: space-between;
    &:hover&{
        cursor: pointer;
        border-bottom:1px solid #25aeb0;
    }
`;

const TitleWrap = styled.span`
    display:inline-flex;
    align-items:center;
`;

const IconWrap = styled.span`
    display:inline-flex;
    align-items:center;
`;

const InputPopup = styled.input`
    width:250px;
    padding-left:7px;
    height:35px;
    border:none;
    font: bold 16px 'Handlee', cursive;
    color:grey;
`;

const ButtonPopup = styled.button`
    margin-top:20px;
    border:none;
    background-color:#4ae0e2;
    color:yellow;
    transition:.2s linear;
    width:250px;
    height:35px;
    cursor: pointer;
    font: bold 16px 'Handlee', cursive;
    &:hover&{
        background-color:#55edef;
    }
`;

class Category extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            isOpen:false,
            itemCategory:'',
            category: '',
            idParent: '',
            edit:false,
            delete:false,
            nameCategory:'',
            titleCategoryPopup:'',
            idCategory:'',
            activeIdEl:'',
            delCategory:false,
            open: false
        };
    this.addSubCategory = this.addSubCategory.bind(this);
    this.editNameCategory = this.editNameCategory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.dropDownCategory = this.dropDownCategory.bind(this);
    this.activeCategory = this.activeCategory.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.putValueInput = this.putValueInput.bind(this);
    this.toggleActiveItem = this.toggleActiveItem.bind(this);
    this.enterCategory = this.enterCategory.bind(this);
    }

    onOpenModal(e){
        if(this.state.edit === true){
            this.setState({titleCategoryPopup:'Rename category'});
        }
        else if(this.state.delete === true){
            this.setState({titleCategoryPopup:'Do you want to delete the selected category?'});
        }
        else{
            this.setState({titleCategoryPopup:'Add category', category:''});
        }
        let idCat = e;
        this.setState({ open: true, idCategory: idCat });
    }

    onCloseModal(){
        this.setState({ open: false, edit:false, delete:false });
    }

    enterCategory(e){
        if(e.key === "Enter"){
            this.addSubCategory();
        }
    }

    putValueInput(){
        document.getElementById("inputPopup").value = this.state.nameCategory;
    }

    editNameCategory(id) {
        let promise = new Promise((resolve) => {
            let categoryItem = document.getElementById("Category"+id).textContent;
            this.setState({
               edit:true,
               category: categoryItem
            });
            resolve();
        });
        promise.then(result => {
            this.onOpenModal(id);
        });
    }

    handleChange(e){
        let value = e.target.value;
        this.setState((state) => ({ category: value }));
    }

    addSubCategory(e) {
        let userText = this.state.category.replace(/^\s+/, '').replace(/\s+$/, '');
        if (userText === '') {
            let input = e.target.previousSibling.previousSibling;
            input.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
            this.setState({isOpen:true});
            setTimeout(
                ()=>{this.setState({isOpen:false});
                    input.style.backgroundColor = "white";
                }
                ,1000);
            return true;
        }
        if(this.state.edit === true){
            this.setState({edit:false});
            this.props.editTitleCategory(this.state.category, this.state.idCategory);
        }
        else if(this.state.delete === true){
            this.setState({delete:false});
            this.props.deleteCategory(this.state.idCategory);
            this.props.deleteTodo(this.state.idCategory);
        }
        else {
            let idParent = this.state.idCategory;
            let iconDown = document.getElementById("iconDown" + idParent);
            iconDown.style.transform = 'rotate(180deg)';
            this.props.addSubCategory(this.state.category, idParent);

        }
        this.onCloseModal();
    }

    deleteCategory(id){
        let promise = new Promise((resolve) => {
            let categoryItem = document.getElementById("Category"+id).textContent;
            this.setState({
                delCategory:true,
                delete:true,
                category: categoryItem
            });
            resolve();
        });
        promise.then(result => {
            this.props.takeIdCategory('');
            this.onOpenModal(id);
        });
    }

    dropDownCategory(e){
        let idCat = e,
            nestedUl = document.getElementById("SubCategories"+idCat),
            icon = document.getElementById("iconDown"+idCat);

        if(nestedUl.style.display === 'none'){
            nestedUl.style.display='block';
            icon.style.transform='rotate(180deg)';
        }
        else{
            nestedUl.style.display='none';
            icon.style.transform='rotate(0deg)';
        }
    }

    activeCategory(e){
        let idCategory = e.target.getAttribute('id'),
            li = e.target,
            liTargetParent = e.currentTarget.parentElement,
            activeIdEl = this.state.activeIdEl,
            delCategory = this.state.delCategory;

        if(delCategory){
            activeIdEl = '';
        }
        if(activeIdEl){
            let liActive = document.getElementById(activeIdEl),
                ActiveParent = liActive.parentElement.parentElement;
            liActive.removeAttribute('active');
            liActive.style.borderColor = 'grey';
            liActive.style.color = 'grey';
            ActiveParent.style.backgroundColor = "transparent";
            ActiveParent.style.boxShadow = "none";
        }
        if(li.hasAttribute('active') === true){
            this.props.history.push({ pathname: "/"});
            li.removeAttribute('active');
            li.style.borderColor = 'grey';
            li.style.color = 'grey';
            liTargetParent.style.backgroundColor = "transparent";
            liTargetParent.style.boxShadow = "none";
        }
        else{
            this.props.history.push({ pathname: "/TodoList/"+idCategory});
            li.setAttribute('active','');
            li.style.borderColor = '#46dadc';
            li.style.color = '#46dadc';
            liTargetParent.style.backgroundColor = "#d6f9f9";
            liTargetParent.style.boxShadow = "0 0 11px 2px white inset";
            this.setState({activeIdEl:idCategory, delCategory:false});

            this.props.takeIdCategory(idCategory);
        }

    }

    toggleActiveItem(e){
        let target = e.currentTarget;
        if(target.getAttribute("active")){
           target.removeAttribute("active")
        }
        else{
            target.setAttribute("active",'');
            target.style.backgroundColor = "#d6f9f9";
            target.style.boxShadow = "0 0 11px 2px white inset";
        }
    }

    renderCategory(arrList) {
        if(arrList.length === 0){
            return true;
        }else {
            return arrList.map((item, i) => {
                return ( <Div key={item.id}>
                    <DivItem id="itemWrap">
                        <TitleWrap>
                            <Icon id={"iconDown" + item.id} name="caret-down" onClick={()=> {
                                this.dropDownCategory(item.id)
                            }} className="icon-style" style={{marginRight: '10px'}} />
                        </TitleWrap>
                        <Link title="Select category" key={item.id} id={item.id} to={{pathname: ``}} style={{textDecoration: 'none', color: 'grey'}}
                            onClick={this.activeCategory}>
                            <CategoryItem key={item.id} id={"Category" + item.id}>
                                        {item.category}
                            </CategoryItem>
                        </Link>
                        <IconWrap>
                            <Icon name="trash" onClick={() => this.deleteCategory(item.id)} style={iconStyle} className="icon-style"/>
                            <Icon name="edit" onClick={() => this.editNameCategory(item.id)} style={iconStyle} className="icon-style"/>
                            <Icon name="plus" onClick={() => this.onOpenModal(item.id)} style={iconStyle} className="icon-style"/>
                        </IconWrap>
                    </DivItem>
                    <ul id={"SubCategories" + item.id}>{this.renderCategory(item.subcategory)}</ul>
                </Div>
                )
            })
        }
    }

render(){
    return(
        <div>{this.renderCategory(this.props.CategoryList)}
        <div id="Popup">
            <Modal
                open={this.state.open}
                onClose={this.onCloseModal}
                little
                styles={{
                    modal:{
                        background:"yellow",
                        color:"#4ae0e2",
                        paddingTop:"30px",
                        textAlign:"center",
                        width: "350px",
                        height:"250px",
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center"
                    },
                    closeIcon:{
                        opacity:"0"
                    }
                }}
                classNames={{
                    transitionEnter: 'transition-enter',
                    transitionEnterActive: 'transition-enter-active',
                    transitionExit: 'transition-exit-active',
                    transitionExitActive: 'transition-exit-active'
                }}
                animationDuration={1000}
            >
            <Icon name="close" style={iconStyleClose} onClick={this.onCloseModal} />
            <ActionModal>{this.state.titleCategoryPopup}</ActionModal>
            <InputPopup id="inputPopup" placeholder="Enter category title" value={this.state.category} onChange={this.handleChange} onKeyPress={this.enterCategory}/>
            <Warning isOpen={this.state.isOpen} id="WarningModal">Enter category name</Warning>
            <ButtonPopup onClick={this.addSubCategory}>OK</ButtonPopup>
            </Modal>
    </div>
    </div>
    )}
}

const mapStateToProps = state => {
    return {
        CategoryList: state.CategoryList,
        idCategory: state.idCategory
    };
};

const mapDispatchToProps =  {
    addSubCategory,
    deleteCategory,
    editTitleCategory,
    takeIdCategory,
    deleteTodo
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));