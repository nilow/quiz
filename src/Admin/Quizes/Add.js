import React, {useState} from 'react';
import axios from 'axios';

const Add = (props) => {

    const [formValues, setformValues] = useState({title:'', description:'', file:''});
    const [uploaded, setuploaded] = useState(false);
    const [selectedFile, setselectedFile] = useState('');
    const token = localStorage.getItem('token');

    const handleChange= (event) => {
        const { target } = event;
        const { name, value } = target;
        event.persist();
        setformValues({ ...formValues, [name]: value });
    }

    const handleHide = (event)=>{
        event.preventDefault();
        setformValues({ title: '', description:'', file:'' });
        props.handleHide();
    }

    const handleChangeFile= (event) => {
        setformValues({ ...formValues, file: event.target.files[0].name });
        setselectedFile(event.target.files[0])
    }

    const handleSend = (event) => {
        event.preventDefault();
        props.handleSend(formValues);
        setformValues({ title: '', description:'', file: '' });
        setuploaded(false);
    }

    const handleUploadFile = (event) => {
        event.preventDefault();
        const fd = new FormData();
        fd.append('image', selectedFile, selectedFile.name)
       axios
      .post(`http://backquiz.nilow13.usermd.net/api/question/upload?token=${token}`,fd)
      .then(result => setuploaded(result.data.file.message));
    }

    return (
        <div>
            <div><form className="admin-form"><input type="text" name="title" onChange={handleChange} value={formValues.title} placeholder="Nazwa quizu"></input><br /><textarea name="description" onChange={handleChange} value={formValues.description} placeholder="Opis quizu"></textarea><label htmlFor="questionImage" className="btn" onClick={()=>{setuploaded(false)}}>Wybierz plik</label><input id="questionImage" type="file" onChange={handleChangeFile} style={{display: 'none'}} />&nbsp;<button className="btn" onClick={handleUploadFile}>Wgraj na serwer</button>&nbsp;{uploaded && <span className="ok">&#10004;</span>}<br /><br /><button className="btn" onClick={handleSend} disabled={formValues.title==='' || formValues.description===''}>Dodaj</button>&nbsp;<button className="btn" onClick={handleHide}>Zamknij formularz</button></form></div>
        </div>
    )

}

export default Add;