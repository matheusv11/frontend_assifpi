import React,{useState, useEffect} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';

const EditarSocio=()=>{

    const {token}= useAuth();

    const[endereco,setEndereco]= useState('');
    const[telefones,setTelefone]=useState('');
    const[senha,setSenha]=useState('');

    useEffect(()=>{
        connection.get('/socio', {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            setEndereco(dados.data.endereco);
            setTelefone(dados.data.telefones);
        }).catch((err)=>{
            alert(err.response.data.message);
        })
        // eslint-disable-next-line
    },[token]);

    const Alterar=(e)=>{
        e.preventDefault();
        const data= {endereco,telefones, senha};

        connection.put('/socio', data, {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
        }).catch((err)=>{
            alert(err.response.data.message);
        })
    }

    return (
        <div id='editar-socio' style={{margin:"0 auto",width:"80%"}}>
            <h2 >Mudar informações 
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </h2>
            
            <div className="card" style={{ borderWidth: '5px',borderColor:"green"}}>
                <div className="card-body">
                    <form onSubmit={Alterar}>

                        <div className="form-group">
                            <label>Endereço:</label>
                            <input onChange={e=> setEndereco(e.target.value)} defaultValue={endereco} type="text" className="form-control"  required/>
                        </div>

                        <div className="form-group">
                            <label>Telefones:</label>
                            <input onChange={e=> setTelefone(e.target.value)} defaultValue={telefones} type="text" className="form-control"  required/>
                        </div>
                
                        <div className="form-group">
                         <label>Senha:</label>
                         <input onChange={e=> setSenha(e.target.value)} type="password" className="form-control"  required/>
                        </div>
                
                        <span>Coloque sua senha para confirmar as alteracoes</span><br/>
                        <button onClick={Alterar} type="submit" className="btn btn-success">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditarSocio;