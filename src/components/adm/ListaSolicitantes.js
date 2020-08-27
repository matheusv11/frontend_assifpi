import React, { useEffect, useState } from 'react'
import {useAuth} from '../auth';
import connection from '../../services/connection';

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
        <h2>Lista de solicitantes</h2>
        <div id="lista" className="row" style={{borderWidth: '5px',borderColor:"green",borderStyle:"solid"}}>
        <input type="number" className="form-control" id=""  onChange={e=> setCpf(e.target.value)} placeholder='Pesquisar por cpf' />
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