import React from 'react';
const Questions = (props) => {
  
    const sendData = (event) => {
        props.radioClick(event.target.value);
        //console.log(event.target.value)
   }

    return (
    <div>
        <h1>{props.index}/{props.questions_quantity}</h1>
        <div><img src={props.question.photo} alt="" /></div>
        <div className="question-content">{props.question.content}</div>
        <form>
            <ul className="answers-list">
                {props.question.ans.map((value, index) => {
                return (
                    <li key={index}>
                        <label>
                            <input name="answer" checked={parseInt(props.answer, 10) === parseInt(value.id, 10)} type="radio" value={value.id} onChange={sendData}/>
                            {value.content}
                            <span className="checkmark"></span>
                        </label>
                    </li>
                )
                    
                })}
            </ul>
        </form>       
    </div>
    )

}

export default Questions;