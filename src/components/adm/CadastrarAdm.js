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
           return alert('Senhas diferentes') //Pode ser pelo back ou pelo html mesmo
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
            <h2>Cadastre um administrador
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-earmark-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2 2a2 2 0 0 1 2-2h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm7.5 1.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm2 5.755S12 12 8 12s-5 1.755-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"/>
                </svg>
            </h2>
    
            <div className="card" style={{borderWidth: '5px',borderColor:"green"}}>
                <div className="card-body">
                    <form onSubmit={Cadastrar}>
                        <div className="form-group">
                        <label>Email:</label>
                        <input onChange={e=> setEmail(e.target.value)} type="email" className="form-control" id="" required/>
                        </div>
                
                        <div className="form-group">
                            <label>Nome Completo:</label>
                            <input onChange={e=> setNome(e.target.value)} type="text" className="form-control" id="" required/>
                        </div>

                        <div className="row">
                            <div className="form-group col-sm-6 col-xs-12">
                            <label>Senha:</label>
                            <input onChange={e=> setSenha(e.target.value)} type="password" className="form-control" id="" required/>
                            </div>
                    
                            <div className="form-group col-sm-6 col-xs-12">
                                <label>Confirmar Senha:</label>
                                <input onChange={e=> setRepeat(e.target.value)} type="password" className="form-control" id="" required/>
                            </div>
                        </div>
                        
                        {senha===repeat && <span>Senhas iguais</span>}
                        {senha!==repeat && <span>Senhas diferentes</span>}
                        <br/>
                        <button onClick={Cadastrar} type="submit" className="btn btn-success">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadastrarAdm;