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
        
        <h2>Pagamentos</h2>
    
        <div class="card" style={{borderWidth: '5px',borderColor:"green"}}>
            <div class="card-body">
                {pagamentos.map(dados=>(
                    <div key={dados.id}>
                        
                        <ul class="list-group">
                            <li class={`list-group-item list-group-item-${dados.status=="pending" ? 'warning' : 'success'}`}>
                                <p><b>Status pagamento:</b> {dados.status}</p>
                                <p><b>Data de criação:</b> {dados.data_criacao}</p>
                                <p><b>Data de vencimento:</b> {dados.data_vencimento}</p>
                                {dados.renovada==1 && dados.status=="pending" ? <button class="btn btn-success"onClick={()=> Pagar(dados.id)}>Pague</button>: "Nao precisa pagar"}
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