import React, {useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';

const LoginAdm = ()=>{
    //Tentar children pra talvez otimizar o uso desse componente
    const {setAdm, setLoading}= useAuth();
    const[email,setEmail]=useState('');
    const[senha,setSenha]=useState('');

    const Login= (e)=>{
        e.preventDefault();
        const data= {email,senha}
        setLoading(true);
        connection.post('/auth_adm', data).then((dados)=>{
            setLoading(false);
            setAdm(dados.data.token);
            localStorage.setItem('admToken', dados.data.token);
        }).catch((err)=>{
            setLoading(false);
            alert(err.response.data.message)
        })
    }

    return(
        <div id='componente-login-adm' style={{margin:"0 auto",width:"80%"}}>

        <h2>Login de administrador</h2>
    
        <div class="card" style={{ borderWidth: '5px',borderColor:"green"}}>
            <div class="card-body">
                <form onSubmit={Login}>
    
                    <div class="form-group">
                        <label>Email:</label>
                        <input onChange={e=> setEmail(e.target.value)} type="email" class="form-control" id="" required/>
                    </div>
            

                    <div class="form-group">
                        <label>Senha:</label>
                        <input onChange={e=> setSenha(e.target.value)} type="password" class="form-control" id="" required/>
                    </div>
            
                    
                    <button onClick={Login} type="submit" class="btn btn-success">Entrar</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default LoginAdm;