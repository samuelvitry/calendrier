import React from 'react'

export const Button = (props, { onClick }) => {

    return (
        <a className={props.full ? "button-full" : "button-empty"} onClick={() => {props.onClick()}}>
            {props.txt}
        </a>
    );
}
