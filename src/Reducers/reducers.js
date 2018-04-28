import { combineReducers } from 'redux';
import { ADD_CATEGORY, ADD_SUB_CATEGORY, DELETE_CATEGORY, EDIT_TITLE_CATEGORY, TAKE_ID_CATEGORY } from '../Actions/actions';
import { ADD_TODO, CHANGE_CHECKBOX_TODO, STYLE_ACTIVE_TODO, EDIT_TITLE_TODO, EDIT_DESCRIPTION_TODO, DELETE_TODO, FILTER_TODO} from '../Actions/actions';


const addingEachCategory = (action) => {
    return {
        subcategory:[],
        category: action.text,
        id: action.id
    }
};

const addingSubCategory = (action, stateCategory) => {
    let idParentArr = action.id.split("-"),
        id = idParentArr[0],
        idChild = 0,
        objChild = {},
        j=0;

    function innerAddingSubCategory(stateCategory){
        stateCategory.map(function(item, i) {
            if(item.id === id && idParentArr[j+1]){
                j++;
                id+="-"+idParentArr[j];
                innerAddingSubCategory(item.subcategory);
            }
            if(item.id === id && !idParentArr[j+1]){
                if(item.subcategory.length === 0){
                    idChild = '0';
                    objChild={
                        subcategory:[],
                        category: action.text,
                        id: action.id+"-"+idChild
                    };
                }
                else{
                    let idPrevCat = (item.subcategory[0].id).split("-"),
                        newId = +(idPrevCat[idPrevCat.length-1])+1;
                    objChild={
                        subcategory:[],
                        category: action.text,
                        id: action.id+"-"+newId
                    };
                }

                return item.subcategory.unshift(objChild);
            }
            return item;
        });
    }

    innerAddingSubCategory(stateCategory);

    return stateCategory;
};

const deleteCategory = (action, stateCategory)=>{
    let idArr = action.id.split("-"),
        id = idArr[0],
        newArr,
        j = 0;

    function innerDeleteCategory(stateCategory){
        return stateCategory.filter((el, i)=>{
            if(el.id === id && idArr[j+1]){
                id+="-"+idArr[++j];
                newArr = innerDeleteCategory(el.subcategory);
                el.subcategory = newArr;
                return true;
            }
            else if(el.id === id && !idArr[j+1]){
                return false;
            }
            return true;
        });
    }
    return innerDeleteCategory(stateCategory);
};

const editTitleCategory = (action, stateCategory)=>{
    let id = action.id;
    stateCategory.map(function(item, i) {
        if(item.id === id){
            item.category = action.text;
        }
        if(item.subcategory.length > 0){
            editTitleCategory(action, item.subcategory);
        }
        return false;
    });
    return stateCategory;
};

function CategoryList(stateCategory = [], action) {
    let myCategory = null;
    switch(action.type) {
        case ADD_CATEGORY:
            myCategory = [...stateCategory, addingEachCategory(action)];
            return myCategory;
        case ADD_SUB_CATEGORY:
            myCategory = addingSubCategory(action, stateCategory);
            return myCategory;
        case DELETE_CATEGORY:
            myCategory = deleteCategory(action, stateCategory);
            return myCategory;
        case EDIT_TITLE_CATEGORY:
            myCategory = editTitleCategory(action, stateCategory);
            return myCategory;
        default:
            return stateCategory;
    }
}

const addTodo = (action, stateTodo)=>{
    let todoId = idCat,
        idArr = todoId.split("-");

    if(!stateTodo[+idArr[0]]){
        stateTodo[+idArr[0]]=[];
        if(idArr.length === 1){
           stateTodo[+idArr[0]].push({
                subtodo:[''],
                todo:action.text,
                id:idCat+'-0'+stateTodo[idArr[0]].length,
                idCategory: idCat,
                description:'',
                checked:false,
                active:false
            });
            return [...stateTodo];
        }
        stateTodo[+idArr[0]].push({
            subtodo:[''],
            todo:'',
            id:'',
            idCategory:'',
            description:'',
            checked:false,
            active:false
        });
    }

    let j=0,
        count=1,
        length = idArr.length;

    function addingTodo(stateTodo){
        if (j < length - 1) {
            if(stateTodo[idArr[j+1]]){
                count=j+1;
                j++;
                addingTodo(stateTodo[idArr[count]].subtodo);
            }
            else{
                stateTodo[idArr[j+1]] = {
                    subtodo: [''],
                    todo: '',
                    id: '',
                    idCategory:'',
                    description:'',
                    checked:false,
                    active:false
                };
                count=j+1;
                j++;
                addingTodo(stateTodo[idArr[count]].subtodo);
            }
        }
        else {
            if(stateTodo[0] === ""){
                stateTodo[0] = {
                    subtodo: [''],
                    todo: action.text,
                    id: idCat + '-00',
                    idCategory: idCat,
                    description:'',
                    checked:false,
                    active:false
                }
            }
            else{
                stateTodo.push({
                    subtodo: [''],
                    todo: action.text,
                    id: idCat + '-0' + (stateTodo.length),
                    idCategory: idCat,
                    description:'',
                    checked:false,
                    active:false
                });
            }
        }
      };

    addingTodo(stateTodo[idArr[0]]);
    return [...stateTodo];

};

const editTitleTodo = (action, stateTodo)=>{
    let id = action.id.split("-"),
        todo = action.text,
        j=0;

    function innerEditTodo(stateTodo){
        return stateTodo.map((el, i)=>{
            if(el.id === action.id){
                el.todo = todo;
            }
            else if(i === +id[j+1]){
                j++;
                innerEditTodo(el.subtodo);
            }
            return el;
        });
    }

    innerEditTodo(stateTodo[+id[0]]);
    return [...stateTodo];
};

const editDescriptionTodo =(action, stateTodo)=>{
    let id = action.id.split("-"),
        description = action.description,
        j=0;

    function innerEditDescriptionTodo(stateTodo){
        return stateTodo.map((el, i)=>{
            if(el.id === action.id){
                el.description = description;
            }
            else if(i === +id[j+1]){
                j++;
                innerEditDescriptionTodo(el.subtodo);
            }
            return el;
        });
    }

    innerEditDescriptionTodo(stateTodo[+id[0]]);
    return [...stateTodo];

};

const deleteTodo = (action, stateTodo)=>{
    let idCatArr = action.id.split("-"),
        newArr,
        j = 1;

    if(idCatArr.length === 1){
        return stateTodo.filter((el,i)=>{
            if(i === +idCatArr[0]){
                return false;
            }
            return el;
        });
    }

    function innerDeleteTodo(stateTodo){
        return stateTodo.filter((el, i)=>{
            if(i === +idCatArr[j]){
                j++;
                newArr = innerDeleteTodo(el.subtodo);
                el.subtodo = newArr;
                return true;
            }
            else if(el.idCategory === action.id){
                return false;
            }
            return true;
        });
    }

    innerDeleteTodo(stateTodo[+idCatArr[0]]);
    return [...stateTodo];

};

const changeCheckboxTodo = (action, stateTodo)=>{
    let id = action.id.split("-"),
        checked = action.checked,
        j=0;

    function innerChangeCheckboxTodo(stateTodo){
        return stateTodo.map((el, i)=>{
            if(el.id === action.id){
                el.checked = checked;
            }
            else if(i === +id[j+1]){
                j++;
                innerChangeCheckboxTodo(el.subtodo);
            }
            return el;
        });
    }

    innerChangeCheckboxTodo(stateTodo[+id[0]]);
    return [...stateTodo];

};

const styleActiveTodo = (action, stateTodo)=>{
    let id = action.id.split("-"),
        active = action.active,
        j=0;

    function innerStyleActiveTodo(stateTodo){
        return stateTodo.map((el, i)=>{
            if(el.id === action.id){
                el.active = active;
            }
            else if(i === +id[j+1]){
                j++;
                innerStyleActiveTodo(el.subtodo);
            }
            return el;
        });
    }

    innerStyleActiveTodo(stateTodo[+id[0]]);
    return [...stateTodo];

};

function TodoList(stateTodo = [], action) {
    let myTodo = null;
    switch(action.type) {
        case ADD_TODO:
            myTodo = addTodo(action, stateTodo);
            return myTodo;
        case EDIT_TITLE_TODO:
            myTodo = editTitleTodo(action, stateTodo);
            return myTodo;
        case EDIT_DESCRIPTION_TODO:
            myTodo = editDescriptionTodo(action, stateTodo);
            return myTodo;
        case DELETE_TODO:
            myTodo = deleteTodo(action, stateTodo);
            return myTodo;
        case CHANGE_CHECKBOX_TODO:
            myTodo = changeCheckboxTodo(action, stateTodo);
            return myTodo;
        case STYLE_ACTIVE_TODO:
            myTodo = styleActiveTodo(action, stateTodo);
            return myTodo;
        default:
            return stateTodo;
    }
}

const filterTodo = (action,TodoListFilter)=>{
    let todo = action.todo,
        checked = action.checked;
    return {value:todo, checked:checked};
};

function TodoListFilter(TodoListFilter={}, action){
    let myTodo = null;
    if(action.type === FILTER_TODO){
        myTodo = filterTodo(action, TodoListFilter);
        return myTodo;
    }
    return TodoListFilter;
}

let idCat;
const idCategory = (idCategory='', action)=>{
    if(action.type === TAKE_ID_CATEGORY){
        idCategory = action.id;
        idCat = idCategory.slice(8);
    }
    return idCategory;
};



const rootReducer  = combineReducers({
    CategoryList,
    TodoList,
    TodoListFilter,
    idCategory
});





export default rootReducer