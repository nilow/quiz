import React, {useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import Questions from './Questions';
import axios from 'axios';

const Main = () => {
    let { quizid } = useParams()
    const [questions, setQuestions] = useState([]);
    const [quizName, setQuizName] = useState('');
    const [addedId, setaddedId] = useState(0);
    const [deletedId, setdeletedId] = useState(0);
    const [editedId, seteditedId] = useState(0);
    const [sortCounter, setsortCounter] = useState(0);
    const [questionsIds, setquestionsIds] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
      axios
        .get(`http://backquiz.nilow13.usermd.net/api/quiz/getquestions/${quizid}?token=${token}`)
        .then(result => {
          setQuestions(result.data.questions);
          setQuizName(result.data.quizname);
          const ids = result.data.questions.map((question,index) => {
            return question.id;
          });
          setquestionsIds(ids);
        });
      }, [addedId, deletedId, quizid, editedId, sortCounter, token]);

    const handleResetEditedId = () => {
      seteditedId(0)
    }

    const handleAdd = (data) => {
      console.log(data);
      axios
      .post(`http://backquiz.nilow13.usermd.net/api/question/new?token=${token}`,{...data, survey_id: quizid})
      .then(result => setaddedId(result.data.question.id));
    }
    
    const handleDelete = (id) => {
      axios
      .delete(`http://backquiz.nilow13.usermd.net/api/question/delete/${id}?token=${token}`)
      .then(result => setdeletedId(id));
    }
    const handleUpdate = (data, id) => {
      axios
      .put(`http://backquiz.nilow13.usermd.net/api/question/update/${id}?token=${token}`, data)
      .then(result => seteditedId(result.data.question.id));
    }

    const handleUp = (index) => {
      const [...newdata] = questionsIds; 
      [ newdata[index-1] , newdata[index] ] = [ newdata[index] , newdata[index-1] ]; 

      axios
      .put(`http://backquiz.nilow13.usermd.net/api/question/sort?token=${token}`, {data: newdata})
      .then(result => setsortCounter(sortCounter + 1));
    }
    
    const handleDown= (index) => {
     
      const [...newdata] = questionsIds; 
      [ newdata[index] , newdata[index+1] ] = [ newdata[index+1] , newdata[index] ]; 

      axios
      .put(`http://backquiz.nilow13.usermd.net/api/question/sort?token=${token}`, {data: newdata})
      .then(result => setsortCounter(sortCounter + 1));
    }

    return (
        <div className="admin-wrapper">
            <Navigation></Navigation>
            <Questions questions={questions} quizName={quizName} quizId={quizid} handleAdd={handleAdd} handleDelete={handleDelete} handleUpdate={handleUpdate} handleDown={handleDown} handleUp={handleUp} handleResetEditedId={handleResetEditedId}></Questions>
        </div>
    )
}

export default Main;