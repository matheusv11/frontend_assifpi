import React, {useState} from 'react';
import connection from '../../services/connection';
import {useAuth} from '../auth.js';

const LoginSocio= ()=>{

    const {setToken}= useAuth();
    const[email,setEmail]=useState('');
    const[senha,setSenha]=useState('');
    const[recover_email,setRecover]=useState('');

    const Login= (e)=>{
      
      e.preventDefault()
      const data= {email,senha};

      connection.post('auth_socio', data).then((dados)=>{
        setToken(dados.data.token);
        localStorage.setItem('token',dados.data.token)
      }).catch((err)=>{
        alert(err.response.data.message);
      });

    }

    const Recuperar= (e)=>{
      e.preventDefault();

      connection.post('/request',{email: recover_email}).then((dados)=>{
        alert(dados.data.message);
      }).catch((err)=>{
        alert(err.response.data.message);
      })
    }

    return(
        <div id="page-login-socio"  className="col-sm-6 col-xs-12" style={{margin:"0 auto"}}>
             
    <h2>Login de sócio
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-door-open" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z"/>
        <path fill-rule="evenodd" d="M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z"/>
        <path d="M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z"/>
      </svg>
    </h2>
    
    <div className="card" style={{borderWidth: '5px',borderColor:"green"}}>
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

            <form>
              <input type="email" onChange={e=> setRecover(e.target.value)} className="form-control" id="" required/>
              <button type="submit" onClick={Recuperar}>Enviar email</button>
            </form>
        </div>
      </div>
        </div>
    )
}

export default LoginSocio;