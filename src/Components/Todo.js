import React, { PureComponent } from 'react';
import check from '../images/check.png';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {Icon} from 'react-fa'
import { Route } from 'react-router-dom';
import { editTitleTodo, editDescriptionTodo, changeCheckboxTodo, styleActiveTodo } from '../Actions/actions';
import '../css/index.css';

const iconStyle = {
    paddingLeft: '10px'
};

const TodoItem = styled.li`
    cursor:pointer;
    padding: 0 20px;
    width:390px;
    height:50px;
    display:flex;
    align-items:center;
    justify-content: space-between;
    background-color:${(props) => props.active ? 'yellow' : '#57ecbd'};
    box-shadow:${(props) => props.active ? 'lightgrey 3px 3px 4px 0px, -3px -4px 2px 0px #57edbd' : 'none'};
    margin:5px;
    &:hover&{
      box-shadow:${(props) => props.active ? 'lightgrey 3px 3px 4px 0px, -3px -4px 2px 0px #57edbd' : 'lightgrey 3px 3px 4px 0px'};
`;

const TitleWrap = styled.div`

`;

const IconWrap = styled.div`

`;

const Checkmark = styled.span`
    position: absolute;
    top: 50%;
    margin-top: -8px;
    left: 0;
    height: 16px;
    width: 16px;
    background-color:white;
`;

const LabelCheckbox = styled.label`
    color:${(props)=>props.styleDone ? "#57ecbd":"grey"};
    display: inline-block;
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

const ButtonEdit = styled.button`
    width: ${props => props.save ? '110px' : '80px'};
    margin-right: ${props => props.save ? '20px' : '0'};
    height:40px;
    border:none;
    margin-left:-1px;
    background-color:yellow;
    color:#35c9cb;
    transition:.2s linear;
    cursor: pointer;
    font: bold 16px 'Handlee', cursive;
    &:hover&{
        background-color:#4ae0e2;
        color:yellow;
    }
`;

const InputTodoEdit = styled.input`
    font: bold 16px 'Handlee', cursive;
    color:grey;
    width:250px;
    padding-left:7px;
    height:35px;
    margin-top:15px;
    border:none;
`;

const DivTodoEditWrap = styled.div`

`;

const DescriptionTodoTextArea = styled.textarea`
    font: bold 16px 'Handlee', cursive;
    color:grey;
    margin-top: 17px;
    padding:7px;
    width: 100%;
    height: 200px;
    border:none;
`;

const FormEditDone = styled.form`
    position:relative;
    margin-top:20px;
`;

const TodoUl = styled.ul`
   display:flex;
   align-items:flex-end;
   flex-direction:column;
   padding-left:0;
   margin-top:0;
   margin-bottom:0;
`;

const ButtonWrap = styled.div`
   display:flex;
   justify-content:flex-end;
`;


class Todo extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            idCategory:this.props.idCategory,
            editTodo:false,
            titleTodo:'',
            checked:0,
            activeIdEdit:'',
            idTodo:''
        };
        this.renderTodoList = this.renderTodoList.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.renderTodo = this.renderTodo.bind(this);
        this.runEditTodo = this.runEditTodo.bind(this);
        this.renderEditTodo = this.renderEditTodo.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
        this.activeTodo = this.activeTodo.bind(this);
    }

    handleInputChange(e,id){
        if(e.target.name === "CheckboxTodoEdit" && !this.state.checked){
            let checked = e.target.checked;
            this.setState({checked:""+!checked});
        }
        let checked = e.target.checked;
        this.activeTodo(e,checked,id);
        this.props.changeCheckboxTodo(checked, id);
    }

    activeTodo(e,checked, id){
        let idTodo = id;
        if(checked){
            this.props.styleActiveTodo(true, idTodo);
        }else{
            this.props.styleActiveTodo(false, idTodo);
        }
    }

    saveTodo(){
        let idTodo = this.state.idTodo,
            titleTodo = this.state.titleTodo,
            inputTodo = document.getElementsByName("Todo")[0].value,
            descriptionTodo = document.getElementsByName("DescriptionTodo")[0].value;

        if(inputTodo === titleTodo){
            this.props.editDescriptionTodo(descriptionTodo, idTodo);
         }
        else{
            this.props.editTitleTodo(inputTodo, idTodo);
            this.props.editDescriptionTodo(descriptionTodo, idTodo);
        }

        this.setState({editTodo:false, checked:''});
        this.renderTodoList(this.props.TodoList);
    }

    runEditTodo(idTodo, todo){
        let promise = new Promise((resolve)=>{
            if(this.state.editTodo){
                if(this.state.checked){
                    let checked = this.state.checked,
                        checkedBoolean = (checked === "true" ? true : false);
                    this.props.changeCheckboxTodo(checkedBoolean, this.state.idTodo);
                    this.props.styleActiveTodo(checkedBoolean, this.state.idTodo);
                }
                this.setState({editTodo:false, checked:''});
            }
            else{
                this.setState({editTodo:true, idTodo:idTodo, titleTodo:todo});
            }
            resolve();
        });
        promise.then(result =>{
            this.renderTodoList(this.props.TodoList);
        });
    }

    renderEditTodo(TodoList){
        let idTodo = this.state.idTodo,
            idTodoArr = idTodo.split("-"),
            j=1,
            handleInputChange = this.handleInputChange,
            runEditTodo = this.runEditTodo,
            saveTodo = this.saveTodo;

        function editTodo(TodoList) {
            return TodoList.map((el, i)=> {
                if (i === +idTodoArr[j] && el.id !== idTodo) {
                    j++;
                    return editTodo(el.subtodo);
                }
                else if (el.id === idTodo) {
                    return (<DivTodoEditWrap key={el.id}>
                        <ButtonWrap>
                            <ButtonEdit save onClick={saveTodo}>Save changes</ButtonEdit>
                            <ButtonEdit onClick={()=>{runEditTodo(el.id, el.todo)}}>Cancel</ButtonEdit>
                        </ButtonWrap>
                        <InputTodoEdit id="InputTodo"
                                        name="Todo"
                                        type="text"
                                        defaultValue={el.todo}
                        />
                        <FormEditDone>
                            <LabelCheckbox styleDone={el.checked}>
                                <Checkbox
                                          name="CheckboxTodoEdit"
                                          type="checkbox"
                                          checked = {el.checked}
                                          onChange={(e)=>{handleInputChange(e, el.id)}}/>
                                <Checkmark></Checkmark>
                                Done</LabelCheckbox>
                        </FormEditDone>
                        <DescriptionTodoTextArea name="DescriptionTodo"
                                                 placeholder="Description"
                                                 defaultValue={el.description}
                        />
                    </DivTodoEditWrap>)
                }
            return true;
            });
        }

        return editTodo(TodoList[+idTodoArr[0]]);
    }

    renderTodo(item){
        if(!item){
            return false;
        }
        return (item.map((el,j) =>{
            if(el===""){
                return false;
            }
            return (
                    <TodoUl key={el.id}>
                        <Route path={"/TodoList/Category:pathTodo"} render={(props)=> {

                            let pathTodoLength = props.match.params.pathTodo.length,
                                idTodo = el.idCategory.slice(0, pathTodoLength);

                            if(idTodo === props.match.params.pathTodo && this.props.TodoListFilter.value && el.todo.toLowerCase().search(this.props.TodoListFilter.value.toLowerCase()) !==-1){
                                if(this.props.TodoListFilter.checked === true && el.checked){
                                    return (<TodoItem key={el.id} id={el.id} active={el.active}>
                                        <TitleWrap>
                                            <LabelCheckbox styleDone={el.checked}>
                                                <Checkbox
                                                    name="Todo"
                                                    type="checkbox"
                                                    checked = {el.checked}
                                                    onChange={(e)=> {this.handleInputChange(e, el.id)}}/>
                                                <Checkmark></Checkmark>
                                                     {el.todo}
                                            </LabelCheckbox>
                                        </TitleWrap>
                                        <IconWrap>
                                            <Icon name="edit"
                                                onClick={()=> {this.runEditTodo(el.id, el.todo)}} className="icon-style" style={iconStyle} />
                                        </IconWrap>
                                    </TodoItem>)
                                }
                                else if(this.props.TodoListFilter.checked === false){
                                    return (
                                        <TodoItem key={el.id} id={el.id} active={el.active}>
                                        <TitleWrap>
                                            <LabelCheckbox styleDone={el.checked}>
                                                <Checkbox
                                                    name="Todo"
                                                    type="checkbox"
                                                    checked = {el.checked}
                                                    onChange={(e)=> {this.handleInputChange(e, el.id)}}/>
                                                <Checkmark></Checkmark>
                                                     {el.todo}
                                            </LabelCheckbox>
                                        </TitleWrap>
                                        <IconWrap>
                                            <Icon name="edit"
                                                onClick={()=> {this.runEditTodo(el.id, el.todo)}} className="icon-style" style={iconStyle}/>
                                        </IconWrap>
                                    </TodoItem>)
                                }
                            }
                            else if(idTodo === props.match.params.pathTodo && this.props.TodoListFilter.checked === true && el.checked === true && !this.props.TodoListFilter.value){
                                return (<TodoItem key={el.id} id={el.id} active={el.active}>
                                    <TitleWrap>
                                        <LabelCheckbox styleDone={el.checked}>
                                            <Checkbox
                                                name="Todo"
                                                type="checkbox"
                                                checked = {el.checked}
                                                onChange={(e)=> {this.handleInputChange(e, el.id)}}/>
                                            <Checkmark></Checkmark>
                                                     {el.todo}
                                        </LabelCheckbox>
                                    </TitleWrap>
                                    <IconWrap>
                                        <Icon name="edit"
                                            onClick={()=> {this.runEditTodo(el.id, el.todo)}} className="icon-style" style={iconStyle} />
                                    </IconWrap>
                                </TodoItem>)
                            }
                            else if(idTodo === props.match.params.pathTodo && !this.props.TodoListFilter.checked && !this.props.TodoListFilter.value){
                                    return (
                                        <TodoItem active={el.active} key={el.id} id={el.id}>
                                            <TitleWrap>
                                                <LabelCheckbox styleDone={el.checked}>
                                                    <Checkbox
                                                        name="Todo"
                                                        type="checkbox"
                                                        checked = {el.checked}
                                                        onChange={(e)=> {this.handleInputChange(e, el.id)}}/>
                                                    <Checkmark></Checkmark>
                                                     {el.todo}
                                                </LabelCheckbox>
                                            </TitleWrap>
                                            <IconWrap>
                                                <Icon name="edit" onClick={()=> {this.runEditTodo(el.id, el.todo)}} className="icon-style" style={iconStyle} />
                                            </IconWrap>
                                        </TodoItem>)
                                }
                            return false;
                        }}/>
                      {this.renderTodo(el.subtodo)}
                    </TodoUl>
                )
        }))

    }

    renderTodoList(TodoList){
        if(this.state.editTodo){
            return this.renderEditTodo(TodoList);
        }
        else{
            return(
            TodoList.map((item) => {
                return this.renderTodo(item)
            })
            )
        }
    }


render() {
    return(<div id="TodoList">{this.renderTodoList(this.props.TodoList)}</div> )
    }
}


const mapStateToProps = state => {
    return {
        CategoryList: state.CategoryList,
        TodoList: state.TodoList,
        TodoListFilter:state.TodoListFilter,
        idCategory: state.idCategory
    };
};

const mapDispatchToProps =  {
    editTitleTodo,
    editDescriptionTodo,
    changeCheckboxTodo,
    styleActiveTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);