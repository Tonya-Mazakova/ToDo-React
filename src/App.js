import React, { PureComponent } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import styled from 'styled-components';
import H1 from './сomponents/H1-styles';
import Progress from 'react-progressbar';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import store from './index';


const BackgroundWrapper = styled.div`
    height:70px;
    background:lightgreen;
`;

const Wrapper = styled.div`
    width:900px;
    margin: 0 auto;
    display: flex;
`;

const AppWrapper = Wrapper.extend`
    flex-direction:column;
    font-family: 'Handlee', cursive;
    font-weight:bold;
    color: grey;
    min-height: 100%;
`;

const HeaderTopWrapper = Wrapper.extend`
    height:70px;
    justify-content: space-between;
    align-items:center;
`;

const HeaderBottomWrapper = Wrapper.extend`
    margin:20px auto 0;
`;

const ButtonWrapper = Wrapper.extend`
    justify-content: space-between;
`;

const InputButtonWrap = styled.div`
    display:flex;
`;

const ButtonWrap = styled.button`
    outline:none;
    border:1px solid grey;
    margin-left:-1px;
    background-color:white;
    transition:.2s linear;
    ${ButtonWrap}:hover&{
        background-color:grey;
        color:white;
        cursor: pointer;
    }
`;

const ContentWrap = Wrapper.extend`
    margin:20px auto 0;
`;


class SearchBar extends PureComponent{
    constructor(props){
      super(props);
      this.state={
          isChecked:false
      };
      this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        const target = event.target;
        const valueInput = target.value;

        switch(target.type) {
            case 'checkbox':
                this.setState({
                    isChecked:!this.state.isChecked
                });
                break;
            case 'text':

                break;
            default:
                break;
        }
    }

    render(){
        return(
    <form style={{display:'flex'}}>
        <label>
            Show done
                <input
                    name="isGoing"
                    type="checkbox"
                    checked={this.state.isChecked}
                onChange={this.handleInputChange} />
        </label>
        <Input name="Search" type="text" placeholder="Search" onChange={this.handleInputChange}/>
    </form>
)}
}



/*if (window.addEventListener) {
 window.addEventListener('DOMContentLoaded', run);
 } else {
 window.attachEvent('onload', run);
 }

 /*class MyPage extends PureComponent{
 constructor(props){
 super(props);
 this.state={
 progress:0
 }
 }
 renderToolbar(){
 return
 <Ons.Toolbar>
 <div>Progress</div>
 </Ons.Toolbar>
 }
 componentDidMount(){
 this.interval = setInterval(() => {
 let progress = this.state.progress;

 if (progress === 100) {
 clearInterval(this.interval);
 return;
 }

 progress++;
 this.setState({progress: progress});

 }, 40);
 }
 componentWillUnmount() {
 if (this.interval) {
 clearInterval(this.interval);
 }
 }
 render(){
 return
 <Ons.Page renderToolbar={this.renderToolbar}>
 <Ons.ProgressBar value={this.state.progress} />

 <section style={{margin: '16px'}}>
 <p>Progress: {this.state.progress}%</p>
 <p><Ons.ProgressBar value={20} /></p>
 <p><Ons.ProgressBar value={40} secondaryValue={80} /></p>
 <p><Ons.ProgressBar indeterminate /></p>
 <p><Ons.ProgressCircular value={20} />
 <Ons.ProgressCircular value={40} secondaryValue={80} />
 <Ons.ProgressCircular indeterminate />
 </p>

 </section>
 </Ons.Page>
 }
 }*/



/*ons.ready(function() {
 ReactDOM.render(<MyPage />, document.getElementById('root'))
 });*/

/*class ProgressBar extends PureComponent{
 constructor(props){
 super(props);
 this.state={
 completed:0
 }
 }
 componentDidMount(){
 var self = this;

 var id = window.setInterval(function () {
 var diff = Math.random() * 10;

 self.setState({
 completed: self.state.completed + diff
 });

 if (self.state.completed > 100) {
 window.clearInterval(id);
 }
 }, 1000);
 }
 render() {
 return (
 <div>
    <h1>react-progressbar</h1>
    <ProgressBar completed={this.state.completed} />
 </div>
 );
 }
 };*/

class ProgressBar extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            completed:0
        };

    }
    componentDidMount(){
        var self = this;

        var id = window.setInterval(function () {
            var diff = Math.random() * 10;

            self.setState({
                completed: self.state.completed + diff
            });

            if (self.state.completed > 100) {
                window.clearInterval(id);
            }
        }, 1000);
    }

    render(){
        return(
    <Progress completed={this.state.completed} />
)}

}

class Input extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            name:this.props.name,
            placeholder:this.props.placeholder,
            type:this.props.type
        };
    }

    render(){
        return(
                <input
                    name={this.state.name}
                    placeholder={this.state.placeholder}
                    type={this.state.type}
                    changeFunc={this.handleInputChange}
                    onChange={this.handleChange}/>
    )}
}


class AddInput extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            placeholder: this.props.placeholder,
            type: this.props.type,
            value: this.props.value
        };

    }
    render(){

        return(
            <InputButtonWrap>

                <Input  name={this.state.name}
                        placeholder={this.state.placeholder}
                        type={this.state.type}
                        value={this.state.value}
                                                            />
                <ButtonWrap>Add</ButtonWrap>
            </InputButtonWrap>
)}
}

class CategoryList extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            id:0,
            value:this.props.value,
            name: 'categoryName',
            parentId:0,
            items: []
        };
        this.handleInputChange=this.handleInputChange.bind(this);
    }

    handleInputChange(){
        alert("parent");
        };

    render(){
        console.log(this.props.appStore)
        return(
            <div >
                <AddInput
                          name="Category"
                          type="text"
                          value={this.state.value}
                          placeholder="Enter category title"
                          changeFunc={this.handleInputChange} />
            </div>
        )
    }
}

class App extends PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props.appStore)
        return(

            <Router>
            <BackgroundWrapper>
                <AppWrapper>
                    <HeaderTopWrapper>
                        <H1>To-do List</H1>
                        <SearchBar />
                    </HeaderTopWrapper>

                    <HeaderBottomWrapper>

                    </HeaderBottomWrapper>


                    <ContentWrap>
                        <CategoryList storeList={this.props.appStore}
                                      name="Category"
                                      type="text"
                                      value="uu"
                                      placeholder="Enter category title"
                                      onChange={this.handleInputChange}/>
                    </ContentWrap>
                    <ul>
                        {this.props.appStore.map((track, index)=>
                        <li key={index}>{track}</li>
                    )}
                    </ul>

                </AppWrapper>
            </BackgroundWrapper>
        </Router>

        )
    }
}

/*export default connect(
    state=>({
        appStore: state
    }),
    dispatch=>({

    })
)(App);*/


connect(
    state=>({
        appStore: state
    }),
        dispatch=>({

    })
)(CategoryList);