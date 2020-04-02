import React from 'react';

const getButtonType = ({ type = '', ...rest }) => {
    const buttonDictionary = {
        start: {
            className: 'Button__mainBTN',
            text: rest.text
        },
        startAgain: {
            className: 'Button__playBTN',
            text: rest.text
        },

        box: {
            className: rest.opened ? (rest.chosen ? 'Button__box-chosen-opened' : 'Button__box-opened') : (rest.chosen ? 'Button__box-chosen' : 'Button__box-closed'),
            text: rest.text
        },

        restart: {
            className: 'Button__restart-show',
            text: 'Restart'
        }
    }
    return buttonDictionary[type] || {}
}

export const Button = ({ onClick, ...props }) => (
    <button className={getButtonType(props).className}
        onClick={onClick}>{getButtonType(props).text}</button>
);
