import React from 'react';
import {useAuth} from '../components/auth';

const Home= ()=>{

    const {token}= useAuth();
    
    return(
        <div>
            O valor do token na home é {token}
        </div>
    )
}

export default Home;