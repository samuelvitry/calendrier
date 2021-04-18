import React from 'react'

export const Button = (props, { onClick }) => {

    if(props.full) {
        return (
            <a className="button-full" onClick={() => {props.onClick()}}>
                {props.txt}
            </a>
        );
    }
    else {
        return (
            <a className="button-empty" onClick={() => {props.onClick()}}>
                {props.txt}
            </a>
        );
    }
}
