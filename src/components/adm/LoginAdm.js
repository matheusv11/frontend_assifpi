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
        <div id='componente-login-adm' className="col-sm-6 col-xs-12" style={{margin:"0 auto"}}>

        <h2>Login de administrador</h2>
    
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