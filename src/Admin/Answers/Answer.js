import React, {useState} from 'react';

const Answer = (props) => {

    const index= props.index;
    const answer=props.answer;
    const [editedId, seteditedId] = useState(0);
    const [formValues, setformValues] = useState({description:''});

    const handleSendOrderDown = (index) => {
        props.handleSendOrderDown(index);
    }

    const handleSendOrderUp = (index) => {
        props.handleSendOrderUp(index);
    }

    const handleChange= (event) => {
        const { target } = event;
        const { name, value } = target;
        event.persist();
        setformValues({ ...formValues, [name]: value });
       // console.log(formValues);
    }

    const handleSendProper = (id) => {
        props.handleSendProper(id);
    }

    const handleSendUpdate = (id) => {
        props.handleSendUpdate(formValues,id); 
        seteditedId(0)
    }

    const handleQuit = () => {
        seteditedId(0);
        setformValues({ ...formValues, description: '' });
    }

    const handleEdit = (id, content) => {
        seteditedId(id);
        setformValues({ ...formValues, description: content });
        props.handleResetEditedId();
        props.handleHide();
    }

    return (
        <tr key={index} className={answer.is_proper === 1 ? 'proper':''}>
            <td>
                {index > 0 ? <button className="btn arrow" onClick={()=>{handleSendOrderUp(index)}}>&uarr;</button>:''}<br />
                 {index < props.answersLength-1 ? <button className="btn arrow" onClick={()=>{handleSendOrderDown(index)}}>&darr;</button>:''}
            </td>
            <td>
                {!props.showForm && editedId===answer.id?<div className="admin-form no-margin"><textarea name="description" value={formValues.description} onChange={handleChange}></textarea></div> : <span onClick={()=>{handleSendProper(answer.id)}}>{answer.content}</span>}
            </td>
                            
            <td className="cell-action">
                {!props.showForm && editedId===answer.id ? <div><button className="btn btn-save" onClick={()=>{ handleSendUpdate(answer.id) }}>Zapisz</button><br />&nbsp;<br /><button className="btn btn-quit" onClick={()=>{ handleQuit() }}>Anuluj</button></div> : <button className="btn btn-edit" onClick={()=>{handleEdit(answer.id, answer.content)}}>Edycja</button>}
            </td>
                            
            <td className="cell-action"><button className="btn btn-del" onClick={()=>{if (window.confirm('Czy na pewno usunąć tę odpowiedź?')) props.handleDelete(answer.id) }}>Kasuj</button></td>
        </tr>
    )
}

export default Answer;





