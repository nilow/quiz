import React, {useState} from 'react';
import Add from './Add';
import Question from './Question';

const Questions = (props) => {

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

    const handleSendUpdate = (values, id) => {
        props.handleUpdate(values,id);
    }

    const handleSendOrderDown = (index) => {
        props.handleDown(index);
    }

    const handleSendOrderUp = (index) => {
        props.handleUp(index);
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
                <h3>Pytania do quizu &#8222;{props.quizName}&#8221;</h3>
                {!showForm && <button className="btn" onClick={handleShow}>Dodaj nowe pytanie</button>}
            </div>
            <div className="admin-list-wrapper">
                <table className="admin-list">
                    <tbody>
                        <tr><td className="sorting">&nbsp;</td><td>Treść</td><td>Grafika</td><td colSpan="3"></td></tr>
                        {props.questions.map((question,index)=>{
                            return (
                                <Question key={index} handleSendOrderDown={handleSendOrderDown} handleSendOrderUp={handleSendOrderUp} question={question} index={index} questionsLength={props.questions.length} handleSendUpdate={handleSendUpdate} handleResetEditedId={handleResetEditedId} handleDelete={handleDelete} quizId={props.quizId} handleHide={handleHide} showForm={showForm}></Question>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Questions;