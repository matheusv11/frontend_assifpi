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
            <h2 >Mudar informações</h2>
            
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