import React, {useEffect, useState} from 'react';

import {useAuth} from '../auth';
import connection from '../../services/connection';
//colocar faturas pendentes co links de pagamento e colocar historioco de faturas ja pagas

const Pagamentos=()=>{
    const now = new Date();
    const data= `${now.getFullYear()},${now.getMonth()+1},${now.getDate()}`;
    const dateOne = new Date(data); //Year, Month, Date    

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
        
        //window.location.href = "http://pt.stackoverflow.com";
        //window.location.replace("http://pt.stackoverflow.com");
        connection.post(`/faturas/${id}`, '', {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            // alert(dados.data.body.external_reference)
            window.location.replace(dados.data.body.init_point);
        }).catch((err)=>{
            alert(err)
        })
    }
        // let vencimento= dados.data_vencimento//Data de vencimento
        // let parts = vencimento.split('/');
        // let data = new Date(parts[2], parts[1] - 1, parts[0]);
    
    return(
    <div id="componente-pagamentos" style={{margin:"0 auto",width:"80%"}}>
        
        <h2>Pagamentos</h2>
    
        <div class="card" style={{borderWidth: '5px',borderColor:"green"}}>
            <div class="card-body">
                {pagamentos.map(dados=>(
                    <div key={dados.id}>
                        
                        <ul class="list-group">
                            <li class={`list-group-item list-group-item-${dados.status=="pending" ? 'warning' : 'sucess'}`}>
                                <p><b>Status pagamento:</b> {dados.status}</p>
                                <p><b>Data de criação:</b> {dados.data_criacao}</p>
                                <p><b>Data de vencimento:</b> {dados.data_vencimento}</p>
                                {dateOne>=new Date(`${dados.data_vencimento.split('/')[2]},${dados.data_vencimento.split('/')[1]},${dados.data_vencimento.split('/')[0]}`) && dados.status=="pending" ? <button class="btn btn-success"onClick={()=> Pagar(dados.id)}>Pague</button>: "Nao precisa pagar"}
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