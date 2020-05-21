import React, {useState} from 'react';
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import axios from 'axios';

const Quiz = (props) => {

    const index= props.index;
    const quiz=props.quiz;
    const [editedId, seteditedId] = useState(0);
    const [formValues, setformValues] = useState({title:'', file:''});
    const [uploaded, setuploaded] = useState(false);
    const [selectedFile, setselectedFile] = useState('');
    const token = localStorage.getItem('token');

    const handleSendActive = (id) => {
        props.handleSendActive(id);
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
        setformValues({ ...formValues, title: '', description: '', file: '' });
    }

    const handleQuit = () => {
        seteditedId(0);
        setformValues({ ...formValues, title: '', description: '', file: '' });
        setuploaded(false);
    }

    const handleEdit = (id, content, desc, photo) => {
        seteditedId(id);
        setformValues({ ...formValues, title: content, description: desc, file: photo });
        props.handleResetEditedId();
        props.handleHide();
    }


    return (
        <tr key={index} className={quiz.is_active === 1 ? 'proper':''}>
            <td>
                {!props.showForm && editedId===quiz.id?<div className="admin-form no-margin"><textarea name="title" value={formValues.title} onChange={handleChange}></textarea></div> : <span onClick={()=>{handleSendActive(quiz.id)}}>{quiz.name}</span>}
            </td>
            <td>
                {!props.showForm && editedId===quiz.id?<div className="admin-form no-margin"><textarea name="description" value={formValues.description} onChange={handleChange}></textarea></div> : parse(quiz.description)}
            </td>
            <td>{quiz.photo_full!=='' && <img className="quiz_photo" src={quiz.photo_full} alt="" />}
                {!props.showForm && editedId===quiz.id && <div><label htmlFor="questionImage" className="btn" onClick={()=>{setuploaded(false)}}>Wybierz plik</label><input id="questionImage" type="file" onChange={handleChangeFile} style={{display: 'none'}} />&nbsp;<button className="btn" onClick={handleUploadFile}>Wgraj na serwer</button>&nbsp;{uploaded && <span className="ok">&#10004;</span>}</div>}
            </td>
            <td className="cell-action">
                {!props.showForm && editedId===quiz.id ? <div><button className="btn btn-save" onClick={()=>{ handleSendUpdate(quiz.id) }}>Zapisz</button><br />&nbsp;<br /><button className="btn btn-quit" onClick={()=>{ handleQuit() }}>Anuluj</button></div> : <button className="btn btn-edit" onClick={()=>{handleEdit(quiz.id, quiz.name, quiz.description, quiz.photo)}}>Edycja</button>}
            </td>
                                
            <td className="cell-action"><button className="btn btn-del" onClick={()=>{if (window.confirm('Czy na pewno usunąć ten quiz?')) props.handleDelete(quiz.id) }}>Kasuj</button></td>
            <td className="cell-action"><Link to={`/questions/${quiz.id}`} className="btn">Pytania</Link></td>
                                
        </tr>
    )

}

export default Quiz;





