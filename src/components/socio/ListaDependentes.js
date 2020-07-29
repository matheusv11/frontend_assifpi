import React, {useEffect, useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';

const ListaDependentes=()=>{
    
    const {token,setLoading}=useAuth();
    
    const[dependente_data, setDepedente]= useState([]);

    useEffect(()=>{
        setLoading(true);
        connection.get('/dependente', {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            setLoading(false);
            setDepedente(dados.data);
        }).catch((err)=>{
            setLoading(false)
            alert(err);
        })
        
    }, [token]);   

    const Deletar= (id)=>{
        setLoading(true);
        connection.delete(`/dependente/${id}`, {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            setLoading(false)
            alert(dados.data.message);
            setDepedente(dependente_data.filter(dependentes=> dependentes.id !==id))
        }).catch((err)=>{
            setLoading(false)
            alert(err.message)
        });
    }

    const Solicitar= (id)=>{
        setLoading(true)
        connection.post(`/carteira/${id}`, '', {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            setLoading(false)
            alert(dados.data.message);
        }).catch((err)=>{
            setLoading(false)
            alert(err.response.data.message)
        })
    }
 
    return(
        <div id='componente-lista-dependentes'  style={{width:"90%",margin:"0 auto"}}>
            <h2>Página de Dependenetes</h2>
            
            {dependente_data.map((dados)=>(
                <div class="card"  style={{ borderWidth: '5px',borderColor:"green",marginTop:"2%"}}>
                    <div class="card-body">
                    
                    <p><b>Nome: </b> {dados.nome} <span class="badge badge-info">Dependente</span></p> 
                    
                    <p><b>Email: </b>{dados.email}</p>

                    <p><b>CPF: </b>{dados.cpf}</p>

                    <p><b>RG: </b>{dados.rg}</p>

                    <p><b>Endereço: </b>{dados.endereco}</p>

                    <p><b>Telefones: </b>{dados.telefones}</p>

                    {!dados.status && <button onClick={()=> Solicitar(dados.id)} type="button" className="btn btn-dark" style={{marginLeft: '80px'}}>Solicitar Carteira</button>} 
                    {dados.status==='solicitada' && <b style={{marginLeft: '80px'}}>Carteira Solicitada</b>}
                    {dados.status==='confeccionada' && <b style={{marginLeft: '80px'}}>Carteira Confeccionada</b>}

                    <button onClick={()=> Deletar(dados.id)} type="button" class="btn btn-outline-danger">Deletar este Dependente</button>

                    </div>
            
                </div>
            ))}







        </div>
    )
}

export default ListaDependentes;