import React, {useState} from 'react';
import connection from '../../services/connection';
import {useAuth} from '../auth.js';

const LoginSocio= ()=>{

    const {setToken}= useAuth();
    const[email,setEmail]=useState('');
    const[senha,setSenha]=useState('');

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

    return(
        <div id="page-login-socio" style={{margin:"0 auto",width:"80%"}}>
             
    <h2>Login de sócio</h2>
    
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
        </div>
      </div>
        </div>
    )
}

export default LoginSocio;