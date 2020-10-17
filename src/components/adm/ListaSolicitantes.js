import React, { useEffect, useState } from 'react'
import {useAuth} from '../auth';
import connection from '../../services/connection';
import {cpfMask} from '../../helpers/mask';

const ListaSolicitantes=()=>{

    const {admToken}=useAuth();
    const[cpf,setCpf]=useState('');
    const[socio_data,setSocio]=useState([]);
    const[dependente_data,setDependente]=useState([]);

    useEffect(()=>{
        connection.get(`/carteira?cpf=${cpf}`,{
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setSocio(dados.data.socios)
            setDependente(dados.data.dependentes)
        }).catch((err)=>{   
            alert(err.message);
        })
        // eslint-disable-next-line
    },[cpf]);

    const ConfirmarCarteiraSocio= (id)=>{
        if(window.confirm("Você tem certeza? Está ação não poderá ser desfeita."))

        connection.put(`/change_carteira_socio/${id}`, '', {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
            setSocio(socio_data.filter(socios=> socios.id !==id))
        }).catch((err)=>{
            alert(err.message)
        })
    }  

    const ConfirmarCarteiraDependente= (id)=>{
        if(window.confirm("Você tem certeza? Está ação não poderá ser desfeita."))
        
        connection.put(`/change_carteira_dependente/${id}`, '', {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
            setDependente(dependente_data.filter(dependente=> dependente.id !==id))
        }).catch((err)=>{
            alert(err.message)
        })
    }

    return (
    <div id='componente-lista-solicitantes' style={{width:"90%",margin:"0 auto"}}>
        <h2>Lista de solicitantes
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-card-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
            <path fill-rule="evenodd" d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
            </svg>
        </h2>
        <div id="lista" className="row" style={{borderWidth: '5px',borderColor:"green",borderStyle:"solid"}}>
        <input type="search" className="form-control" value={cpf}  onChange={e=> setCpf(cpfMask(e.target.value))} placeholder='Pesquisar por cpf' />
            <div id="lista-socios" className="col" >
                {socio_data.map(dados=>(
                    <div key={dados.id} >
                    <p><b>Nome: </b> {dados.nome} <span className="badge badge-pill badge-success">Sócio</span></p> 
                    <p><b>Email: </b>{dados.email}</p>
                    <p><b>CPF: </b>{dados.cpf}</p>
                    <p><b>RG: </b>{dados.rg}</p>
                    <p><button onClick={()=> ConfirmarCarteiraSocio(dados.id)} type="button" className="btn btn-warning">Confirmar confeccionamento</button></p>
                    </div>
                ))}

            </div>

            <div id="lista-dependentes" className="col" >
                    {dependente_data.map(dados=>(
                        <div key={dados.id} >
                        <p><b>Nome: </b> {dados.nome} <span className="badge badge-info">Dependente</span></p> 
                        <p><b>Email: </b>{dados.email}</p>
                        <p><b>CPF: </b>{dados.cpf}</p>
                        <p><b>RG: </b>{dados.rg}</p>
                        <button onClick={()=> ConfirmarCarteiraDependente(dados.id)} type="button" className="btn btn-warning">Confirmar confeccionamento</button>
                        </div>
                    ))}
                    
            </div>
        </div>

    </div>)

}

export default ListaSolicitantes;