import React,{useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';

const CadastrarAdm=()=>{

    const {admToken}= useAuth();    
    
    const [nome,setNome]=useState('');
    const [email,setEmail]=useState('');
    const [senha,setSenha]=useState('');
    const [repeat,setRepeat]=useState('');
    
    const Cadastrar= (e)=>{
        e.preventDefault();
        const data= {nome,email,senha}
        
        if(senha!==repeat){
           return alert('Senhas diferentes')
        }

        connection.post('/adm', data, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
        }).catch((err)=>{
            alert(err.response.data.message)
        })
    }

    return (
        <div id='componente-cadastrar-adm' style={{margin:"0 auto",width:"80%"}}>
            <h2 >Cadastre um administrador</h2>
    
            <div class="card" style={{borderWidth: '5px',borderColor:"green"}}>
                <div class="card-body">
                    <form onSubmit={Cadastrar}>
                        <div class="form-group">
                        <label>Email:</label>
                        <input onChange={e=> setEmail(e.target.value)} type="email" class="form-control" id="" required/>
                        </div>
                
                        <div class="form-group">
                            <label>Nome Completo:</label>
                            <input onChange={e=> setNome(e.target.value)} type="text" class="form-control" id="" required/>
                        </div>
                
                        <div class="form-group">
                        <label>Senha:</label>
                        <input onChange={e=> setSenha(e.target.value)} type="password" class="form-control" id="" required/>
                        </div>
                
                        <div class="form-group">
                            <label>Confirmar Senha:</label>
                            <input onChange={e=> setRepeat(e.target.value)} type="password" class="form-control" id="" required/>
                        </div>
                        
                        {senha===repeat && <span>Senhas iguais</span>}
                        {senha!==repeat && <span>Senhas diferentes</span>}
                        <br/>
                        <button onClick={Cadastrar} type="submit" class="btn btn-success">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadastrarAdm;