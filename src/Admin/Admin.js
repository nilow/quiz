import React, {useState, useEffect } from 'react';
import Navigation from './Navigation/Navigation';
import Quizes from './Quizes/Quizes';
import axios from 'axios';

const Admin = () => {

    const [quizes, setQuizes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            'http://backquiz.nilow13.usermd.net/api/quiz/getquizes',
          );
     
          setQuizes(result.data.quizes);
        };
     
        fetchData();
        //eslint-disable-next-line
      }, []);
    return (
        <div className="admin-wrapper">
            <Navigation></Navigation>
            <Quizes quizes={quizes}></Quizes>
        </div>
    )

}

export default Admin;