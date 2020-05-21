import React from 'react';
const Intro = (props) => {
    return (
    <div>
        <h1>{props.title}</h1>
        {props.children}
    </div>
    )

}

export default Intro;