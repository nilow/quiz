import React, {useState} from 'react';
import Add from './Add';
import Quiz from './Quiz';

const Quizes = (props) => {

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

    const handleSendActive = (id) => {
        props.handleActive(id);
    }

    const handleResetEditedId = () => {
        props.handleResetEditedId();
    }

    const handleDelete = (id) => {
        props.handleDelete(id);
    }

    return (
        <div className="admin-content">
            {showForm && <Add handleSend={handleSend} handleHide={handleHide}></Add>}
            <div className="admin-content-top">
                <h3>Wszystkie quizy</h3>
                {!showForm && <button className="btn" onClick={handleShow}>Dodaj nowy quiz</button>}
            </div>
            <div className="admin-list-wrapper">
                <table className="admin-list">
                    <tbody>
                        <tr><td className="quiz-name">Nazwa <span className="small">(kliknięcie na nazwę aktywuje quiz)</span></td><td>Opis</td><td>Grafika</td><td colSpan="3"></td></tr>
                        {props.quizes.map((quiz,index)=>{
                            return (
                                <Quiz key={index} quiz={quiz} index={index} quizesLength={props.quizes.length} handleSendUpdate={handleSendUpdate} handleSendActive={handleSendActive} handleResetEditedId={handleResetEditedId} handleDelete={handleDelete} handleHide={handleHide} showForm={showForm}></Quiz>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Quizes;