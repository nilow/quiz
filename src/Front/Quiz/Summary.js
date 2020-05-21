import React from 'react';
const Summary = (props) => {
   const properAnswers = props.questions.map((value)=>{
        return value.proper
   });
   const array_intersection = props.answers.filter(function(x) {
	if(properAnswers.indexOf(parseInt(x,10)) !== -1)
		return true;
	else
		return false;
});

    return (
    <div>
        <h1>{props.quizTitle}<br />{parseInt((array_intersection.length/props.questions.length)*100,10)}% poprawnych odpowiedzi</h1>
        <div className="summary-list">
            <ol>
                {props.questions.map((value, index) => {
                        return (
                            <li key={index}>
                                {value.content}<br />
                                {value.photo!=='' && <img src={value.photo} alt="" />}
                                <ul className="answers-list summary">
                                {value.ans.map((value2, index2) => {
                                    let nameClass='';
                                    if(parseInt(props.answers[index],10) === parseInt(value2.id,10) && parseInt(value.proper,10) === parseInt(value2.id,10)){
                                        nameClass = 'selected proper';
                                    }
                                    else{
                                        if(parseInt(value.proper,10) === parseInt(value2.id,10)){
                                            nameClass = 'proper';
                                        }
                                        if(parseInt(props.answers[index],10) === parseInt(value2.id,10)){
                                            nameClass = 'selected';
                                        }
                                    }
                                   
                                    return (
                                        <li key={index2} className={nameClass}>
                                            {value2.content}
                                        </li>
                                    )         
                                })}
                                </ul>
                            </li>
                        )         
                })}
            </ol>
        </div>
    </div>
    )

}

export default Summary;