import React, {useEffect, useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';

const ListaDependentes=()=>{
    
    const {token}=useAuth();
    
    const[dependente_data, setDepedente]= useState([]);

    useEffect(()=>{
        connection.get('/dependente', {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            setDepedente(dados.data);
        }).catch((err)=>{
            alert(err);
        })
        // eslint-disable-next-line     
    }, [token]);   

    const Deletar= (id)=>{
        if(window.confirm("Você tem certeza? Está ação não poderá ser desfeita."))

        connection.delete(`/dependente/${id}`, {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
            setDepedente(dependente_data.filter(dependentes=> dependentes.id !==id))
        }).catch((err)=>{
            alert(err.message)
        });
    }

    const Solicitar= (id)=>{
        if(window.confirm("Você quer solicitar a carteira deste dependete? Caso sim sua solicitacao será enviada."))
        
        connection.post(`/carteira/${id}`, '', {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
        }).catch((err)=>{
            alert(err.response.data.message)
        })
    }
 
    return(
        <div id='componente-lista-dependentes'  style={{width:"90%",margin:"0 auto"}}>
            <h2>Página de Dependenetes
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-people" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg></h2>
            
            {dependente_data.map((dados)=>(
                <div className="card"  style={{ borderWidth: '5px',borderColor:"green",marginTop:"2%"}}>
                    <div className="card-body">
                    
                    <p><b>Nome: </b> {dados.nome} <span className="badge badge-info">Dependente</span></p> 
                    
                    <p><b>Email: </b>{dados.email}</p>

                    <p><b>CPF: </b>{dados.cpf}</p>

                    <p><b>RG: </b>{dados.rg}</p>

                    <p><b>Endereço: </b>{dados.endereco}</p>

                    <p><b>Telefones: </b>{dados.telefones}</p>

                    {!dados.status && <button onClick={()=> Solicitar(dados.id)} type="button" className="btn btn-dark" style={{marginLeft: '80px'}}>Solicitar Carteira</button>} 
                    {dados.status==='solicitada' && <b style={{marginLeft: '80px'}}>Carteira Solicitada</b>}
                    {dados.status==='confeccionada' && <b style={{marginLeft: '80px'}}>Carteira Confeccionada</b>}
                    <button onClick={()=> Deletar(dados.id)} type="button" className="btn btn-outline-danger">Deletar este Dependente</button>

                    </div>
            
                </div>
            ))}

        </div>
    )
}

export default ListaDependentes;