import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Category from '../Components/Category';

const CategoryList = styled.ul`
    width:430px;
    overflow:auto;
    padding-left:0;
    margin-top:20px;
`;

class Categories extends PureComponent{
    render(){
        return (<div><CategoryList><Category/></CategoryList></div>)
    }
}


export default Categories;