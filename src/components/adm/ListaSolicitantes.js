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
    },[cpf]);

    const ConfirmarCarteiraSocio= (id)=>{
        connection.post(`/change_carteira_socio/${id}`, '', {
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
        connection.post(`/change_carteira_dependente/${id}`, '', {
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
    <div id='componente-lista-solicitantes' style={{margin:"0 auto"}}>
        <h2>Lista de solicitantes</h2>
        <div id="lista" style={{width:'100%'}}>
        <input type="number" class="form-control" id=""  placeholder='Pesquisar por cpf' />
            <div id="lista-socios" style={{width:"50%",float:"left",borderColor:"green"}}>
                {socio_data.map(dados=>(
                    <div key={dados.id} style={{borderStyle:"solid",borderColor:"gray"}}>
                    <p><b>Nome: </b> {dados.nome} <span class="badge badge-pill badge-success">Sócio</span></p> 
                    <p><b>Email: </b>{dados.email}</p>
                    <p><b>CPF: </b>{dados.cpf}</p>
                    <p><b>RG: </b>{dados.rg}</p>
                    <button onClick={()=> ConfirmarCarteiraSocio(dados.id)} type="button" class="btn btn-warning">Confirmar que a carteira foi confeccionada</button>
                    </div>
                ))}

            </div>

            <div id="lista-dependentes" style={{marginLeft:"50%",borderColor:"red"}}>
                    {dependente_data.map(dados=>(
                        <div key={dados.id} style={{borderStyle:"solid",borderColor:"gray"}}>
                        <p><b>Nome: </b> {dados.nome} <span class="badge badge-info">Dependente</span></p> 
                        <p><b>Email: </b>{dados.email}</p>
                        <p><b>CPF: </b>{dados.cpf}</p>
                        <p><b>RG: </b>{dados.rg}</p>
                        <button onClick={()=> ConfirmarCarteiraDependente(dados.id)} type="button" class="btn btn-warning">Confirmar que a carteira foi confeccionada</button>
                        </div>
                    ))}
                    
            </div>
        </div>

    </div>)

}

export default ListaSolicitantes;