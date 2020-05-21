import React, {useState} from 'react';

const Add = (props) => {

    const [formValues, setformValues] = useState({description:''});

    const handleChange= (event) => {
        const { target } = event;
        const { name, value } = target;
        event.persist();
        setformValues({ ...formValues, [name]: value });
       // console.log(formValues);
    }

    const handleSend = (event) => {
        event.preventDefault();
        props.handleSend(formValues);
        setformValues({ description: '' });
    }

    const handleHide = (event) =>{
        event.preventDefault();
        setformValues({ description: '' });
        props.handleHide();
    }

    return (
        <div>
            
            <form className="admin-form">
                <textarea name="description" onChange={handleChange} value={formValues.description} placeholder="Treść odpowiedzi"></textarea>
                <button className="btn" onClick={handleSend} disabled={formValues.description===''}>Dodaj</button>
                &nbsp;<button className="btn" onClick={handleHide}>Zamknij formularz</button>
            </form>
        </div>
    )

}

export default Add;