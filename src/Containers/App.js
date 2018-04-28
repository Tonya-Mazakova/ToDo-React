import React, { PureComponent } from 'react';
/*import {BrowserRouter as Router, Route} from 'react-router-dom';*/
import styled from 'styled-components';
import SearchBar from './SearchBar';
import InputCategory from './InputCategory';
import InputTodo from './InputTodo';
import Categories from '../Containers/Categories';
import TodoList from '../Containers/TodoList';
import { Route } from 'react-router-dom';
import {Icon} from 'react-fa'

/*import Progress from 'react-progressbar';*/


const BackgroundWrapper = styled.div`
    height:100px;
    background:#4ae0e2;
`;

const Wrapper = styled.div`
    width:950px;
    margin: 0 auto;
    display: flex;
`;

const AppWrapper = Wrapper.extend`
    flex-direction:column;
    font-family: 'Handlee', cursive;
    font-weight:bold;
    color: grey;
    height:500px;
`;

const HeaderTopWrapper = Wrapper.extend`
    height:100px;
    justify-content: space-between;
    align-items:center;
`;

const HeaderBottomWrapper = Wrapper.extend`
    margin:20px auto 0;
`;

const ContentWrap = Wrapper.extend`
    margin:20px auto 0;
    justify-content: space-between;
`;

const TitleWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

class App extends PureComponent{
   render(){
        return(
                <BackgroundWrapper>
                    <AppWrapper>
                        <HeaderTopWrapper>
                            <TitleWrap>
                                <h1 style={{fontSize:"27px"}}>Better blunt pencil than sharp mind...</h1>
                                <Icon name="pencil" style={{fontSize:"27px", marginBottom: "7px"}}/>
                            </TitleWrap>
                            <SearchBar />
                        </HeaderTopWrapper>

                        <HeaderBottomWrapper>

                         </HeaderBottomWrapper>

                         <ContentWrap>
                            <div>
                                <InputCategory  name="Category"
                                                type="text"
                                                placeholder="Enter category name" />
                                <Categories/>
                            </div>
                            <div>
                                <Route path="/TodoList" render={()=>(<InputTodo name="EnterTodo"
                                                                                type="text"
                                                                                placeholder="Enter to do"/>
                                )}/>
                                <TodoList/>
                            </div>
                         </ContentWrap>

                    </AppWrapper>
                </BackgroundWrapper>
        )
    }}

export default App;