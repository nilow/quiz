import React from 'react';
import Intro from './Intro';
import Questions from './Questions';
import Summary from './Summary';

const Quiz = (props) => {

    let content;
    const clickHandler = (arg) => {
        //console.log(arg);
        props.radioClick(arg);
      }
    if(props.stage === 'intro'){
        content = <Intro title={props.title}>{props.children}</Intro>  
    }
    else if(props.stage === 'questions') {
        content = <Questions answer={props.answer} index={props.index} radioClick={clickHandler} question={props.question} questions_quantity={props.questions_quantity} />
    }
    else {
        content = <Summary quizTitle ={props.quizTitle} questions={props.questions} answers={props.answers} />
    }
    return (
    <div className="section-quiz">
        <div className="section-quiz_container">
            {content}        
        </div>
    </div>
    )

}

export default Quiz;