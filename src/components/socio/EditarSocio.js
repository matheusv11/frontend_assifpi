import React,{useState, useEffect} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';

const EditarSocio=()=>{

    const {token, setLoading}= useAuth();

    const[endereco,setEndereco]= useState('');
    const[telefones,setTelefone]=useState('');
    const[senha,setSenha]=useState('');

    useEffect(()=>{
        setLoading(true);
        connection.get('/socio', {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            setLoading(false);
            setEndereco(dados.data.endereco);
            setTelefone(dados.data.telefones);
        }).catch((err)=>{
            setLoading(false);
            alert(err.response.data.message);
        })
    },[token]);

    const Alterar=(e)=>{
        e.preventDefault();
        const data= {endereco,telefones, senha};

        setLoading(true)
        connection.put('/socio', data, {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            setLoading(false)
            alert(dados.data.message);
        }).catch((err)=>{
            setLoading(false);
            alert(err.response.data.message);
        })
    }

    return (
        <div id='editar-socio' style={{margin:"0 auto",width:"80%"}}>
            <h2 >Mudar informações</h2>
            
            <div class="card" style={{ borderWidth: '5px',borderColor:"green"}}>
                <div class="card-body">
                    <form onSubmit={Alterar}>

                        <div class="form-group">
                            <label>Endereço:</label>
                            <input onChange={e=> setEndereco(e.target.value)} defaultValue={endereco} type="text" class="form-control"  required/>
                        </div>

                        <div class="form-group">
                            <label>Telefones:</label>
                            <input onChange={e=> setTelefone(e.target.value)} defaultValue={telefones} type="text" class="form-control"  required/>
                        </div>
                
                        <div class="form-group">
                         <label>Senha:</label>
                         <input onChange={e=> setSenha(e.target.value)} type="password" class="form-control"  required/>
                        </div>
                
                        <span>Coloque sua senha para confirmar as alteracoes</span><br/>
                        <button onClick={Alterar} type="submit" class="btn btn-success">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditarSocio;