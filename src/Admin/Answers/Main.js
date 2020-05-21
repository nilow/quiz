import React, {useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import Answers from './Answers';
import axios from 'axios';

const Main = () => {
    let { quizid, questionid } = useParams()
    const [answers, setAnswers] = useState([]);
    const [questionName, setQuestionName] = useState('');
    const [addedId, setaddedId] = useState(0);
    const [deletedId, setdeletedId] = useState(0);
    const [editedId, seteditedId] = useState(0);
    const [sortCounter, setsortCounter] = useState(0);
    const [answersIds, setanswersIds] = useState([]);
    const [properId, setproperId] = useState(0);
    const token = localStorage.getItem('token');

      useEffect(() => {
        axios
          .get(`http://backquiz.nilow13.usermd.net/api/quiz/getanswers/${questionid}?token=${token}` )
          .then(result => {
            setAnswers(result.data.answers);
            setQuestionName(result.data.questionname);
            const ids = result.data.answers.map((answer,index) => {
                return answer.id;
            });
            setanswersIds(ids);
          });
      }, [addedId,deletedId,questionid,editedId,sortCounter,properId,token]);

    const handleAdd = (data) => {
      axios
      .post(`http://backquiz.nilow13.usermd.net/api/answer/new?token=${token}`,{...data, question_id:questionid})
      .then(result => setaddedId(result.data.answer.id));
    }

    const handleDelete = (id) => {
      axios
      .delete(`http://backquiz.nilow13.usermd.net/api/answer/delete/${id}?token=${token}`)
      .then(result => setdeletedId(id));
    }

    const handleUpdate = (data, id) => {
      axios
      .put(`http://backquiz.nilow13.usermd.net/api/answer/update/${id}?token=${token}`, data)
      .then(result => seteditedId(result.data.answer.id));
    }

    const handleUp = (index) => {
      const [...newdata] = answersIds; 
      [ newdata[index-1] , newdata[index] ] = [ newdata[index] , newdata[index-1] ]; 

      axios
      .put(`http://backquiz.nilow13.usermd.net/api/answer/sort?token=${token}`, {data: newdata})
      .then(result => setsortCounter(sortCounter + 1));
    }

    const handleDown= (index) => {
      const [...newdata] = answersIds; 
      [ newdata[index] , newdata[index+1] ] = [ newdata[index+1] , newdata[index] ]; 

      axios
      .put(`http://backquiz.nilow13.usermd.net/api/answer/sort?token=${token}`, {data: newdata})
      .then(result => setsortCounter(sortCounter + 1));
    }

    const handleProper = (id) => {
      axios
      .put(`http://backquiz.nilow13.usermd.net/api/answer/proper/${id}?token=${token}`, {question_id:questionid})
      .then(result => setproperId(result.data.answer.id));
    }

    const handleResetEditedId = () => {
      seteditedId(0)
    }

    return (
        <div className="admin-wrapper">
            <Navigation></Navigation>
            <Answers answers={answers} questionName={questionName} quizId={quizid} handleAdd={handleAdd} handleDelete={handleDelete} handleUpdate={handleUpdate} handleDown={handleDown} handleUp={handleUp} handleProper={handleProper} handleResetEditedId={handleResetEditedId}></Answers>
        </div>
    )

}

export default Main;