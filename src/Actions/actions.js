export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_SUB_CATEGORY = 'ADD_SUB_CATEGORY';
export const EDIT_TITLE_CATEGORY = 'EDIT_TITLE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const TAKE_ID_CATEGORY ='TAKE_ID_CATEGORY';
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TITLE_TODO = 'EDIT_TITLE_TODO';
export const EDIT_DESCRIPTION_TODO = 'EDIT_DESCRIPTION_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const FILTER_TODO = 'FILTER_TODO';
export const CHANGE_CHECKBOX_TODO = 'CHANGE_CHECKBOX_TODO';
export const STYLE_ACTIVE_TODO = 'STYLE_ACTIVE_TODO';



export function addCategory( category, id){
    let newId = String(id);
    return {
        type: ADD_CATEGORY,
        subcategory:[],
        text: category,
        id: newId
    }
}

export function addSubCategory( category, id){
    return {
        type: ADD_SUB_CATEGORY,
        text: category,
        id
    }
}

export function editTitleCategory(category, id) {
    return {
        type: EDIT_TITLE_CATEGORY,
        text: category,
        id
    }
}

export function deleteCategory(id) {
    return {
        type: DELETE_CATEGORY,
        id
    }
}

export function takeIdCategory(id) {
    return {
        type: TAKE_ID_CATEGORY,
        id
    }
}

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        text: todo
    }
}

export function changeCheckboxTodo(flag,id) {
    return {
        type: CHANGE_CHECKBOX_TODO,
        checked: flag,
        id
    }
}

export function styleActiveTodo(flag,id) {
    return {
        type: STYLE_ACTIVE_TODO,
        active: flag,
        id
    }
}

export function editTitleTodo(todo, id) {
    return {
        type: EDIT_TITLE_TODO,
        text: todo,
        id
    }
}

export function editDescriptionTodo(description, id) {
    return {
        type: EDIT_DESCRIPTION_TODO,
        description: description,
        id
    }
}

export function deleteTodo(id) {
    return {
        type: DELETE_TODO,
        id
    }
}

export function filterTodo(text,checked){
    return {
        type: FILTER_TODO,
        todo:text,
        checked:checked
    }
}