import React, {useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import Quizes from './Quizes';
import axios from 'axios';

const Admin = () => {

    const [quizes, setQuizes] = useState([]);
    const [addedId, setaddedId] = useState(0);
    const [deletedId, setdeletedId] = useState(0);
    const [editedId, seteditedId] = useState(0);
    const [activeId, setactiveId] = useState(0);

    const token = localStorage.getItem('token');
      useEffect(() => {
        axios
          .get(`http://backquiz.nilow13.usermd.net/api/quiz/getquizes?token=${token}`)
          .then(result => setQuizes(result.data.quizes));
      }, [addedId, deletedId, editedId, activeId, token]);

    const handleResetEditedId = () => {
        seteditedId(0)
    } 

    const handleAdd = (data) => {
        axios
        .post(`http://backquiz.nilow13.usermd.net/api/quiz/new?token=${token}`, data)
        .then(result => setaddedId(result.data.quiz.id));
    }

    const handleDelete = (id) => {
      axios
      .delete(`http://backquiz.nilow13.usermd.net/api/quiz/delete/${id}?token=${token}` )
      .then(result => setdeletedId(id));
      //alert('usuwanie'+id);
  }

    const handleUpdate = (data, id) => {
      axios
      .put(`http://backquiz.nilow13.usermd.net/api/quiz/update/${id}?token=${token}`, data)
      .then(result => seteditedId(result.data.quiz.id));
   }

   const handleActive = (id) => {
    axios
    .put(`http://backquiz.nilow13.usermd.net/api/quiz/setactive/${id}?token=${token}`)
    .then(result => setactiveId(result.data.quiz.id));
 }

    return (
        <div className="admin-wrapper">
            <Navigation></Navigation>
            <Quizes quizes={quizes} handleAdd={handleAdd} handleDelete={handleDelete} handleUpdate={handleUpdate} handleActive={handleActive} handleResetEditedId={handleResetEditedId}></Quizes>
        </div>
    )

}

export default Admin;