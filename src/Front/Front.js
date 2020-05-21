import React, {useState, useEffect } from 'react';
import Navigation from './Navigation/Navigation';
import Quiz from './Quiz/Quiz';
import Timer from './Timer/Timer';
import axios from 'axios';
import parse from 'html-react-parser';

const Front = () => {

    const quizTime = 60;
    const [qstate, setqState] = useState({
      stage: 'intro',
      quizTitle:'',
      quizDescription:'',
      quizImage:'',
      quizQuestions:[],
      currentIndex: 0
    });
  //eslint-disable-next-line
    const [seconds, setSeconds] = useState(quizTime);
    //eslint-disable-next-line
    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState(0);
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          'http://backquiz.nilow13.usermd.net/api/quiz/getquiz',
        );
   
        setqState({...qstate, quizTitle: result.data.survey[0].quizTitle, quizDescription: result.data.survey[0].quizDescription, quizImage: result.data.survey[0].photo_full, quizQuestions: result.data.survey[0].quizQuestions});
      };
   
      fetchData();
      //eslint-disable-next-line
    }, []);
  
  
  
    const clickHandler1 = () => {
      setqState({...qstate, stage: 'questions'});
      const interval = setInterval(() => {
  
          setSeconds(seconds => {
            if(seconds > 0 ){
              return seconds - 1;
            } else {
              clearInterval(interval);
              setqState({...qstate, stage: 'summary'});
            }
          });
      }, 1000);
    };
  
    const clickHandler2 = () => {
      setqState({...qstate, currentIndex: qstate.currentIndex + 1});
      setAnswers([...answers, answer]);
      setAnswer(0);
    }
  
    const clickHandler3 = () => {
      setqState({...qstate, stage: 'summary'});
      setAnswers([...answers, answer]);
      setSeconds(0);
     
    }
  
    const clickHandler4 = () => {
      setqState({...qstate, stage: 'intro', currentIndex: 0});
      setSeconds(quizTime);
      setAnswer(0);
      setAnswers([]);
    }
  
    const clickHandlerRadio = (value) => {
      //console.log(value);
      setAnswer(value);
    }
  
    let nav;
  
    if(qstate.stage==='intro') {
      nav= <Navigation adminLink={true} buttonText="Rozpocznij quiz" dis={false} buttonClick={() => clickHandler1()}></Navigation>
    } else if(qstate.stage==='questions' && qstate.currentIndex < qstate.quizQuestions.length-1) {
      nav = <Navigation adminLink={false} buttonText="Następne" dis={answer ===0 ? true : false} buttonClick={() => clickHandler2()}></Navigation>
    } else if(qstate.stage==='questions' && qstate.currentIndex === qstate.quizQuestions.length-1) {
      nav = <Navigation adminLink={false} buttonText="Zobacz podsumowanie" dis={answer === 0 ? true : false} buttonClick={() => clickHandler3()}></Navigation>
    } else {
      nav =  <Navigation adminLink={true} buttonText="Zacznij jeszcze raz" dis={false} buttonClick={() => clickHandler4()}></Navigation>
    }
  
  
    return (
      <div className="app" style={qstate.stage==='intro'?{backgroundImage:`url(${qstate.quizImage})`}:null}>
        <Quiz radioClick={clickHandlerRadio} stage={qstate.stage} quizTitle={qstate.quizTitle} answers={answers} questions={qstate.quizQuestions} index={qstate.currentIndex + 1} questions_quantity={qstate.quizQuestions.length} title={qstate.quizTitle} question={qstate.quizQuestions[qstate.currentIndex]} answer={answer}><div><p>{parse(qstate.quizDescription)}</p></div></Quiz>
  
        {nav}
        
        {qstate.stage === 'questions' && <Timer timeLeft={seconds}></Timer>}
      </div>
    );

}

export default Front;