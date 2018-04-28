import React, { PureComponent } from 'react';

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
                    onChange={this.handleChange}/>
    )}
}


export default Input;