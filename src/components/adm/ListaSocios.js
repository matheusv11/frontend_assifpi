import React,{useEffect,useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';

const ListaSocios=()=>{

    const {admToken, setAdm}= useAuth();
    const[cpf,setCpf]=useState('');
    const[socio_data,setData]=useState([]);
    const[dependente_data,setDependentes]=useState([]);

    useEffect(()=>{
        connection.get(`/index_socios?cpf=${cpf}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setData(dados.data);
        }).catch((err)=>{
            setAdm(null);
            localStorage.removeItem('admToken');
            alert(err.message);
        });
    },[cpf]);//Fazer busca via query ainda
    
    useEffect(()=>{
        connection.get(`/index_dependentes?cpf=${cpf}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setDependentes(dados.data);
        }).catch((err)=>{
            setAdm(null);
            localStorage.removeItem('admToken');
            alert(err.message);
        });
    },[cpf]);
    
    const ConfirmarSocio= (id,index)=>{
        connection.put(`/confirm_socio/${id}`,'', {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            alert(dados.data.message)//Atualizar o json do botao //Ex: todo list
            const altera = [...socio_data];
            altera[index].confirmado = 1;
            setData(altera)
        }).catch((err)=>{
            alert(err.message)
            // alert(err.response.data.message) //Nao pode atualizar mesmo socios duas vezes pra nao gerar mais faturas
        })
    }

        
    const ConfirmarDependente= (id,index)=>{
        connection.post(`/confirm_dependente/${id}`,'', { //Update to put
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            alert(dados.data.message)
            const altera = [...dependente_data];
            altera[index].confirmado = 1;
            setDependentes(altera);

        }).catch((err)=>{
            alert(err)
        })
    }

    return( 
        <div id='componente-lista-socios' style={{margin:"0 auto",width:"90%"}}>
            <h2>Lista de sócios e dependentes</h2>
            
            <div id="lista" class="row" style={{borderWidth: '5px',borderColor:"green",borderStyle:"solid"}}>
            
            <input type="number" onChange={e=> setCpf(e.target.value)} class="form-control" id=""  placeholder='Pesquisar por cpf' />
                <div id="lista-socios" class="col" style={{borderColor:"green"}}>
                    
                <div class="list-group">
                <h5 class="card-title">Lista de Sócios</h5>
                    {socio_data.map((dados,index)=>(

                    <div>
                        
                        <div data-toggle="collapse" data-target={`#collapse-${dados.id}`} 
                        aria-expanded="false" aria-controls="collapseExample">

                            {dados.nome}-{dados.confirmado}

                        </div>
                        
                        <div class="collapse" id={`collapse-${dados.id}`}>
                            <div class="card card-body">

                                <p><b>Nome: </b> {dados.nome}</p>

                                <p><b>Email: </b>{dados.email}</p>

                                <p><b>CPF: </b>{dados.cpf}</p>

                                <p><b>RG: </b>{dados.rg}</p>

                                <p><b>Endereço: </b>{dados.endereco}</p>

                                <p><b>Telefones: </b>{dados.telefones}</p>

                                <a href={`http://localhost:3030/files/${dados.imagem_rg}`} target="_blank">Ver rg</a>
                                <a href={`http://localhost:3030/files/${dados.imagem_cpf}`} target="_blank">Ver cpf</a>
                                <a href={`http://localhost:3030/files/${dados.comprovante}`} target="_blank">Ver comprovante</a>
                                
                                
                                {!dados.confirmado && <button onClick={()=> ConfirmarSocio(dados.socio_id,index)} class="btn btn-danger">Autenticar Usuario</button>}

                                <button class="btn btn-danger">Deletar Usuario</button>
                            
                            </div>
                        </div>

                        <hr/>
                    </div>

                    ))}            


                </div>

                </div>

                <div id="lista-dependentes" class="col" style={{borderColor:"red"}}>
                    
                    <div class="list-group">
                        <h5 class="card-title">Lista de Dependentes</h5>
                        {dependente_data.map((dados,index)=>(

                            <div>
                                
                                <div data-toggle="collapse" data-target={`#collapse-${dados.id}`} 
                                aria-expanded="false" aria-controls="collapseExample">

                                    {dados.nome}-{dados.confirmado}

                                </div>
                                
                                <div class="collapse" id={`collapse-${dados.id}`}>
                                    <div class="card card-body">

                                        <p><b>Nome: </b> {dados.nome}</p>

                                        <p><b>Email: </b>{dados.email}</p>

                                        <p><b>CPF: </b>{dados.cpf}</p>

                                        <p><b>RG: </b>{dados.rg}</p>

                                        <p><b>Endereço: </b>{dados.endereco}</p>

                                        <p><b>Telefones: </b>{dados.telefones}</p>

                                        <a href={`http://localhost:3030/files/${dados.imagem_rg}`} target="_blank">Ver rg</a>
                                        <a href={`http://localhost:3030/files/${dados.imagem_cpf}`} target="_blank">Ver cpf</a>
                                        <a href={`http://localhost:3030/files/${dados.comprovante}`} target="_blank">Ver comprovante</a>
                                        
                                        
                                        {!dados.confirmado && <button onClick={()=> ConfirmarDependente(dados.socio_id, index)} class="btn btn-danger">Autenticar Usuario</button>}
                                        <button class="btn btn-danger">Deletar Usuario</button>
                                    </div>
                                </div>

                                <hr/>
                            </div>

                            ))}            
                    </div>
                        
                </div>
            </div>      

        </div>
    );
}

export default ListaSocios;