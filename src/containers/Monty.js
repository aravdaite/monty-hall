import React, { Component } from 'react';
import { Button, Input } from '../components';

export const initState = {
    doors: [],
    chosenDoor: null,
    winningDoor: null,
    openedDoors: [false, false, false],
    started: false,
    openMade: false,
    changedAfterOpen: false,
    tries: 0,
    change: 0,
    noChange: 0,
    winsAfterChange: 0,
    winsNoChange: 0,
    testAuto: false
}
class Monty extends Component {

    state = { ...initState };

    getArray = () => {
        const doors = [];
        for (let i = 0; i < 3; i++) {
            doors.push('');
        }
        let lucky = Math.random() > 0.5 ? (Math.random() > 0.5 ? 2 : 0) : (Math.random() > 0.5 ? 2 : 1);
        this.setState({ doors, winningDoor: lucky, openedDoors: [false, false, false], started: true, testAuto: false, chosenDoor: null, openMade: false });
    }

    chooseDoor = (index) => {
        const { started, openedDoors, chosenDoor } = this.state;
        if (started) {
            if (!openedDoors[index]) {
                if (chosenDoor !== null) {
                    this.setState({ changedAfterOpen: true });
                }
                this.setState({ chosenDoor: index })
            }
        }
    }

    removeDoor = () => {
        const { openMade, chosenDoor, openedDoors, winningDoor } = this.state;
        if (openMade !== true && chosenDoor !== null) {
            const doors = [...openedDoors];
            let num;
            if (chosenDoor === winningDoor) {
                const arr = [];
                for (let i = 0; i < 3; i++) {
                    if (i !== winningDoor)
                        arr.push(i)
                }
                num = Math.random() > 0.5 ? arr[0] : arr[1]
            } else {
                for (let i = 0; i < 3; i++) {
                    if (i !== winningDoor && i !== chosenDoor) {
                        num = i;
                    }
                }
            }
            doors[num] = true;
            this.setState({ openedDoors: doors, openMade: true });
        }
    }
    showResult = () => {
        const { changedAfterOpen, chosenDoor, winningDoor } = this.state;
        const tries = this.state.tries + 1;
        const doors = this.state.doors;
        doors[this.state.winningDoor] = 'X';
        if (changedAfterOpen) {
            const change = this.state.change + 1;
            let winsAfterChange = this.state.winsAfterChange;
            if (winningDoor === chosenDoor) {
                winsAfterChange += 1;
            }
            this.setState({ winsAfterChange, change })
        } else {
            const noChange = this.state.noChange + 1;
            let winsNoChange = this.state.winsNoChange;
            if (winningDoor === chosenDoor) {
                winsNoChange += 1;
            }
            this.setState({ winsNoChange, noChange })
        }
        this.setState({ doors, openedDoors: [true, true, true], tries, changedAfterOpen: false });
    }
    testAuto = (tests) => {

        if (!Number(tests) || tests > 100000) {
            alert("Please put in a number smaller than 100 000");
        } else {

            let countWins = 0;
            let countWinsCHange = 0;
            let secondChosen;
            let remove;
            for (let count = 0; count < tests; count++) {

                const num = Math.random() > 0.5 ? (Math.random() > 0.5 ? 2 : 0) : (Math.random() > 0.5 ? 2 : 1);
                const numChosen = Math.random() > 0.5 ? (Math.random() > 0.5 ? 2 : 0) : (Math.random() > 0.5 ? 2 : 1);

                //check if the initial guess was right and a win without changing the door would be made
                if (num === numChosen) { countWins++ };
                //find the empty door that could be removed
                const arr = []
                for (let i = 0; i < 3; i++) {
                    if (i !== numChosen && i !== num) {
                        arr.push(i)
                    }
                }
                if (arr.length > 1) {
                    remove = Math.random() > 0.5 ? arr[0] : arr[1]
                } else { remove = arr[0] };
                //choose the other door, after one empty door was removed
                for (let i = 0; i < 3; i++) {
                    if (i !== remove && i !== numChosen) {
                        secondChosen = i;
                    }
                }
                //check if the chosen door is the winning one
                if (num === secondChosen) { countWinsCHange++ }
            }
            const tries = this.state.tries + tests * 2;
            const noChange = this.state.noChange + tests * 1;
            const change = this.state.change + tests * 1;
            const winsNoChange = this.state.winsNoChange + countWins;
            const winsAfterChange = this.state.winsAfterChange + countWinsCHange;
            this.setState({ tries, change, noChange, winsNoChange, winsAfterChange });
        }
    }
    testAutomatically = () => {
        this.setState({ testAuto: true, started: false });
    }
    restart = () => {
        this.setState({ ...initState })
    }
    render() {
        const { testAuto, started, openedDoors, chosenDoor, winningDoor, openMade, tries, winsNoChange, noChange, winsAfterChange, change } = this.state;
        return (
            <div className="body">
                {started || testAuto ? <div><p>Test amount : <strong>{tries}</strong></p>
                    < div >
                        <p>Changed the door: <strong>{change}</strong>.
                            Won after changing the door: <strong>{winsAfterChange}</strong>.
                            Percentage: <strong>{change === 0 ? 0 : winsAfterChange / change * 100}</strong></p>
                    </div>
                    <div>
                        <p>Didn't change the door: <strong>{noChange}</strong>.
                            Won after not changing the door: <strong>{winsNoChange}</strong>.
                            Percentage: <strong>{noChange === 0 ? 0 : winsNoChange / noChange * 100}</strong></p>
                    </div>
                </div>
                    : <div className="Monty__text"><p> Statistics say, that it is always better to change your door after one empty door is removed. Now you can test <strong> empirically </strong>, if it is really true!</p> </div>}

                {!started && !testAuto ?

                    <div className="Monty__startButtonsDiv"> {!started ? <Button type='start' text={'Start testing manually!'} started={this.state.started} onClick={this.getArray} /> : ''}
                        <Button type='start' text={'I\'m too lazy to test manually... Test automatically'} onClick={this.testAutomatically} /></div>

                    : ''}
                {testAuto && !started ?
                    <div className="Monty__text">
                        <p>How many times do you want to test:</p>
                        <Input onClick={this.testAuto} />
                        <Button type='start' text="Test manually" started={this.state.started} onClick={this.getArray} />
                        <Button type='restart' onClick={this.restart} /> </div>
                    : ''}
                {!testAuto && started ?
                    <div className="Monty__text">  <div className="Monty__gameText" >{started ? (chosenDoor !== null ? (openMade ? (openedDoors[winningDoor] ? "Result!"
                        : "Do you want to change the door? Press 'Show Result' when you're ready!")
                        : "Press 'Open one empty door'!")
                        : "Choose a box!")
                        : ''}</div>
                        <div className={this.state.started ? "Monty__doors" : "Monty__doors-none"} >
                            {testAuto ? '' : <div className="Monty__doorBox">
                                {[...Array(3).keys()].map((index) =>
                                    <Button type="box" chosen={chosenDoor === index} opened={openedDoors[index]} text={this.state.doors[index]} onClick={() => this.chooseDoor(index)} />)}
                            </div>}
                            {openedDoors[winningDoor] ? <Button type='startAgain' text="Start again" onClick={this.getArray} /> : ''}
                        </div>
                        {!openMade ? <Button type="startAgain" text="Open one empty door" openMade={openMade} chosen={chosenDoor} onClick={this.removeDoor} /> : ''}
                        {openMade ? !openedDoors[winningDoor] ? <Button type='startAgain' text="Show result" openMade={openMade} allOpened={openedDoors[winningDoor]} onClick={this.showResult} /> : '' : ''}
                        <Button type='start' text="I'm too lazy to test manually... Test automatically" onClick={this.testAutomatically} />
                        <Button type='restart' onClick={this.restart} />
                    </div>
                    : ''}
            </div>


        )
    }
}
export default Monty;