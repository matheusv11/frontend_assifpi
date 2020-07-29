import React from 'react';
import {useAuth} from './auth';

const Spinner= ({children})=>{

    const {loading}=useAuth(); 

    return(
        <>
        {children}
        
        {loading &&
            <div style={{
                position: 'fixed',
                overflow: 'visible',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: '100%',
                height: '100%',
                alignItems:'center',
                backgroundColor: 'rgba(0,0,0,0.3)'

            }} class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>

    }

        </>
    )

}

export default Spinner;