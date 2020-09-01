import React, { useEffect, useState } from 'react';
import connection from '../services/connection';
import {useHistory,useParams} from 'react-router-dom';

const Recuperar= ()=>{
    
    const history= useHistory();
    const params= useParams();

    const[senha,setSenha]=useState('');
    const[repetida,setRepetida]=useState('');

    useEffect(()=>{
        // alert(params.token)
        // connection.
    },[]);

    const Recuperar=(e)=>{
        e.preventDefault();

        if(senha!==repetida){
            return alert('Senhas não coerentes');
        }
        connection.put(`/recover/${params.token}`,{senha},{
            headers:{
                authorization: `Bearer ${params.token}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
            history.push('/acesso');
        }).catch((err)=>{
            alert(err.response.data.message);
        })
    }

    return(
        <div id="page-recuperar" style={{margin:"0 auto",width:"80%"}}>
            <h2>Recuperação de senha</h2>
            <div className="card" style={{ borderWidth: '5px',borderColor:"green"}}>
                <div className="card-body">
                    <form>
                    <div className="form-group">
                        <label>Senha:</label>
                        <input onChange={e=> setSenha(e.target.value)}  type="password" className="form-control"  required/>
                    </div>

                    <div className="form-group">
                        <label>Repetir Senha:</label>
                        <input onChange={e=> setRepetida(e.target.value)}  type="password" className="form-control"  required/>
                    </div>
                   
                    <button onClick={Recuperar} className="btn btn-success"type="submit">Alterar senha</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default Recuperar;