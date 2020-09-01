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
        <div id="page-recuperar">
            <h2>Recuperação</h2>
            <form>
                <input onChange={e=> setSenha(e.target.value)} type="password" placeholder="Nova senha"/><br/>
                <input onChange={e=> setRepetida(e.target.value)} type="password" placeholder="Repetir senha"/><br/>
                <button onClick={Recuperar} type="submit">Alterar senha</button>
            </form>
        </div>
    )
}

export default Recuperar;