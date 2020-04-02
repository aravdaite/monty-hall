import React, { Component } from 'react';
import { Button } from '../components';

export class Input extends Component {
    state = {
        input: null
    }
    myChangeHandler = (event) => {
        let input = event.target.value;
        this.setState({ input });
    }

    render() {
        return (
            <div className="Input">
                <input className="Input__inputField"
                    type="text"
                    placeholder="type here..."
                    onChange={this.myChangeHandler}
                />
                <Button type='startAgain' text={"Test"} onClick={() => this.props.onClick(this.state.input)} />
            </div>
        );
    }
}