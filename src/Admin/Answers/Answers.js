import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Add from './Add';
import Answer from './Answer';

const Answers = (props) => {
   
    const [showForm, setshowForm] = useState(false);
    

    const handleShow = () => {
        setshowForm(true);
    }

    const handleHide = () => {
        setshowForm(false);
    }

    const handleSend = (values) => {
        props.handleAdd(values);
    }

    const handleSendUpdate = (values,id) => {
        props.handleUpdate(values,id); 
    }

    const handleSendOrderDown = (index) => {
        props.handleDown(index);
    }

    const handleSendOrderUp = (index) => {
        props.handleUp(index);
    }

    const handleSendProper = (id) => {
        props.handleProper(id);
    }

    const handleResetEditedId = () => {
        props.handleResetEditedId();
    }

    const handleDelete = (id)=>{
        props.handleDelete(id);
    }

    return (
        <div className="admin-content">
             {showForm && <Add handleSend={handleSend} handleHide={handleHide}></Add>}
             <div className="admin-content-top">
                <h3>Odpowiedzi do pytania &#8222;{props.questionName}&#8221;</h3>
                <div>
                    <Link to={`/questions/${props.quizId}`} className="btn">Wróć do pytań</Link>&nbsp;
                    {!showForm && <button className="btn" onClick={handleShow}>Dodaj nową odpowiedź</button>}
                </div>
            </div>
            <div className="admin-list-wrapper">
                <table className="admin-list">
                    <tbody>
                        <tr><td className="sorting">&nbsp;</td><td>Treść <span className="small">(kliknięcie na treść oznacza prawidłową odpowiedź)</span></td><td colSpan="2"></td></tr>
                        {props.answers.map((answer,index)=>{
                            return (
                                <Answer key={index} handleHide={handleHide} handleSendOrderDown={handleSendOrderDown} handleSendOrderUp={handleSendOrderUp} answer={answer} index={index} answersLength={props.answers.length} handleSendProper={handleSendProper} handleSendUpdate={handleSendUpdate} handleResetEditedId={handleResetEditedId} handleDelete={handleDelete} showForm={showForm}></Answer>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Answers;