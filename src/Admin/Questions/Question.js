import React, {useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Question = (props) => {

    const index= props.index;
    const question=props.question;
    const [editedId, seteditedId] = useState(0);
    const [formValues, setformValues] = useState({title:'', file:''});
    const [uploaded, setuploaded] = useState(false);
    const [selectedFile, setselectedFile] = useState('');
    const token = localStorage.getItem('token');

    const handleSendOrderDown = (index) => {
        props.handleSendOrderDown(index);
    }

    const handleSendOrderUp = (index) => {
        props.handleSendOrderUp(index);
    }

    const handleUploadFile = (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('image', selectedFile, selectedFile.name)
       axios
      .post(`http://backquiz.nilow13.usermd.net/api/question/upload?token=${token}`,fd)
      .then(result => setuploaded(result.data.file.message));
    }

    const handleChangeFile= (event) => {
        //event.persist();
        setformValues({ ...formValues, file: event.target.files[0].name });
        setselectedFile(event.target.files[0]);
    }

    const handleChange= (event) => {
        const { target } = event;
        const { name, value } = target;
        event.persist();
        setformValues({ ...formValues, [name]: value });
       // console.log(formValues);
    }

    const handleSendUpdate = (id) => {
        props.handleSendUpdate(formValues,id);
        seteditedId(0);
        setuploaded(false);
        setformValues({ ...formValues, title: '', file: '' });
    }

    const handleQuit = () => {
        seteditedId(0);
        setformValues({ ...formValues, title: '', file: '' });
        setuploaded(false);
    }

    const handleEdit = (id, content, photo) => {
        seteditedId(id);
        setformValues({ ...formValues, title: content, file: photo });
        props.handleResetEditedId();
        props.handleHide();
    }   

    return (
        <tr key={index}>
            <td>
                {index > 0 ? <button className="btn arrow" onClick={()=>{handleSendOrderUp(index)}}>&uarr;</button>:''}<br />
                {index < props.questionsLength-1 ? <button className="btn arrow" onClick={()=>{handleSendOrderDown(index)}}>&darr;</button>:''}
            </td>
            <td>
                {!props.showForm && editedId===question.id?<div className="admin-form no-margin"><textarea name="title" value={formValues.title} onChange={handleChange}></textarea></div> : question.content}
            </td>
                                
            <td>{question.photo_full!=='' && <img className="quiz_photo" src={question.photo_full} alt="" />}
                {!props.showForm && editedId===question.id && <div><label htmlFor="questionImage" className="btn" onClick={()=>{setuploaded(false)}}>Wybierz plik</label><input id="questionImage" type="file" onChange={handleChangeFile} style={{display: 'none'}} />&nbsp;<button className="btn" onClick={handleUploadFile}>Wgraj na serwer</button>&nbsp;{uploaded && <span className="ok">&#10004;</span>}</div>}
            </td>
                                
            <td className="cell-action">
                {!props.showForm && editedId===question.id ? <div><button className="btn btn-save" onClick={()=>{handleSendUpdate(question.id)}}>Zapisz</button><br />&nbsp;<br /><button className="btn btn-quit" onClick={()=>{ handleQuit() }}>Anuluj</button></div> : <button className="btn btn-edit" onClick={()=>{handleEdit(question.id, question.content, question.photo)}}>Edycja</button>}
            </td>
                                
            <td className="cell-action"><button className="btn btn-del" onClick={()=>{if (window.confirm('Czy na pewno usunąć to pytanie?')) props.handleDelete(question.id) }}>Kasuj</button></td>
            <td className="cell-action"><Link to={`/answers/${props.quizId}/${question.id}`} className="btn">Odpowiedzi</Link></td>
                                
        </tr>
    )
}

export default Question;





