import React, {useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';

const LoginAdm = ()=>{
    //Tentar children pra talvez otimizar o uso desse componente
    const {setAdm}= useAuth();
    const[email,setEmail]=useState('');
    const[senha,setSenha]=useState('');

    const Login= (e)=>{
        e.preventDefault();
        const data= {email,senha}
        
        connection.post('/auth_adm', data).then((dados)=>{
            setAdm(dados.data.token);
            localStorage.setItem('admToken', dados.data.token);
        }).catch((err)=>{
            alert(err.response.data.message)
        })
    }

    return(
        <div id='componente-login-adm' className="col-sm-6 col-xs-12" style={{margin:"0 auto"}}>

        <h2>Login de administrador
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-door-open-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2v13h1V2.5a.5.5 0 0 0-.5-.5H11zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
        </svg>
        </h2>
    
        <div className="card" style={{ borderWidth: '5px',borderColor:"green"}}>
            <div className="card-body">
                <form onSubmit={Login}>
    
                    <div className="form-group">
                        <label>Email:</label>
                        <input onChange={e=> setEmail(e.target.value)} type="email" className="form-control" id="" required/>
                    </div>
            

                    <div className="form-group">
                        <label>Senha:</label>
                        <input onChange={e=> setSenha(e.target.value)} type="password" className="form-control" id="" required/>
                    </div>
            
                    
                    <button onClick={Login} type="submit" className="btn btn-success">Entrar</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default LoginAdm;