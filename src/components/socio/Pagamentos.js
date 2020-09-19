import React, {useEffect, useState} from 'react';

import {useAuth} from '../auth';
import connection from '../../services/connection';
//colocar faturas pendentes co links de pagamento e colocar historioco de faturas ja pagas

const Pagamentos=()=>{

    const {token}=useAuth();
    const[pagamentos,setPagamentos]=useState([]);
    
    useEffect(()=>{ 
        connection.get('/index_socio_fatura', {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            setPagamentos(dados.data);
        }).catch((err)=>{
            alert(err);
        })
        // eslint-disable-next-line  
    },[])

    const Pagar= (id)=>{
        connection.post(`/faturas/${id}`, '', {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            window.location.replace(dados.data.body.init_point);
        }).catch((err)=>{
            alert(err)
        })
    }
    
    return(
    <div id="componente-pagamentos" style={{margin:"0 auto",width:"80%"}}>
        
        <h2>Pagamentos 
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-credit-card-2-back" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zM1 9h14v2H1V9z"/>
        </svg>
        </h2>
    
        <div className="card" style={{borderWidth: '5px',borderColor:"green"}}>
            <div className="card-body">
                {pagamentos.map(dados=>(
                    <div key={dados.id}>
                        
                        <ul className="list-group">
                            <li className={`list-group-item list-group-item-${dados.status==="pending" ? 'warning' : 'success'}`}>
                                <p><b>Status pagamento:</b> {dados.status}</p>
                                <p><b>Data de criação:</b> {dados.data_criacao.substr(0,10).split('-').reverse().join('/')}</p>
                                <p><b>Data de vencimento:</b> {dados.data_vencimento.substr(0,10).split('-').reverse().join('/')}</p>
                                {dados.status==="approved" ? "Pagamento já efetuado": <button className="btn btn-success"onClick={()=> Pagar(dados.id)}>Pague</button>}
                            </li>
                        </ul>
                        
                    </div>
                ))}
            
            </div>
        </div>
    </div>
    );
}

export default Pagamentos;