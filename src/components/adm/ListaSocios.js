import React,{useEffect,useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';

const ListaSocios=()=>{

    const {admToken, setAdm, setLoading, doc_url}= useAuth();
    const[cpf,setCpf]=useState('');
    const[socio_data,setData]=useState([]);
    const[dependente_data,setDependentes]=useState([]);

    useEffect(()=>{
        setLoading(true);
        connection.get(`/index_socios?cpf=${cpf}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setLoading(false)
            setData(dados.data);
        }).catch((err)=>{
            setLoading(false)
            setAdm(null);
            localStorage.removeItem('admToken');
            alert(err.message);
        });
        // eslint-disable-next-line
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
        // eslint-disable-next-line
    },[cpf]);
    
    const ConfirmarSocio= (id,index)=>{
        setLoading(true)
        connection.put(`/confirm_socio/${id}`,'', {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setLoading(false)
            alert(dados.data.message)//Atualizar o json do botao //Ex: todo list
            const altera = [...socio_data];
            altera[index].confirmado = 1;
            setData(altera)
        }).catch((err)=>{
            setLoading(false)
            alert(err.message)
            // alert(err.response.data.message) //Nao pode atualizar mesmo socios duas vezes pra nao gerar mais faturas
        })
    }

        
    const ConfirmarDependente= (id,index)=>{
        setLoading(true)
        connection.post(`/confirm_dependente/${id}`,'', { //Update to put
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setLoading(false)
            alert(dados.data.message)
            const altera = [...dependente_data];
            altera[index].confirmado = 1;
            setDependentes(altera);

        }).catch((err)=>{
            setLoading(false);
            alert(err)
        })
    }


    const DeletarSocio= (id)=>{
        setLoading(true)
        connection.delete(`/socio/${id}`, {
            headers:{
                authorization:  `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setLoading(false);
            alert(dados.data.message)
            setData(socio_data.filter(socios=> socios.socio_id !==id))

        }).catch((err)=>{
            setLoading(false);
            alert(err.message)
        })

    }

    const DeletarDependente= (id)=>{
        setLoading(true);
        connection.delete(`/delete_dependente/${id}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setLoading(false)
            alert(dados.data.message);
            setDependentes(dependente_data.filter(dependentes=> dependentes.dependente_id !==id))

        }).catch((err)=>{
            setLoading(false)
            alert(err.message)
        })

    }

    return( 
        <div id='componente-lista-socios' style={{margin:"0 auto",width:"90%"}}>
            <h2>Lista de sócios e dependentes</h2>
            
            <div id="lista" className="row" style={{borderWidth: '5px',borderColor:"green",borderStyle:"solid"}}>
            
            <input type="number" onChange={e=> setCpf(e.target.value)} className="form-control" id=""  placeholder='Pesquisar por cpf' />
                <div id="lista-socios" className="col" style={{borderColor:"green"}}>
                    
                <div className="list-group">
                <h6 className="card-title">Lista de Sócios</h6>
                    {socio_data.map((dados,index)=>(

                    <div>
                        
                        <div role="button" data-toggle="collapse" data-target={`#collapse-${dados.id}`} 
                        aria-expanded="false" aria-controls="collapseExample">

                            {dados.nome}-{dados.confirmado}

                        </div>
                        
                        <div className="collapse" id={`collapse-${dados.id}`}>
                            <div className="card card-body">

                                <p><b>Nome: </b> {dados.nome}</p>

                                <p><b>Email: </b>{dados.email}</p>

                                <p><b>CPF: </b>{dados.cpf}</p>

                                <p><b>RG: </b>{dados.rg}</p>

                                <p><b>Endereço: </b>{dados.endereco}</p>

                                <p><b>Telefones: </b>{dados.telefones}</p>

                                <a href={`${doc_url}/${dados.imagem_rg}`} target="blank" >Ver rg</a>
                                <a href={`${doc_url}/${dados.imagem_cpf}`} target="blank" >Ver cpf</a>
                                <a href={`${doc_url}/${dados.comprovante}`} target="blank" >Ver comprovante</a>
                                
                                
                                {!dados.confirmado && <button onClick={()=> ConfirmarSocio(dados.socio_id,index)} className="btn btn-success">Autenticar Sócio</button>}

                                <button onClick={()=> DeletarSocio(dados.socio_id)} className="btn btn-danger">Deletar Sócio</button>
                            
                            </div>
                        </div>

                        <hr/>
                    </div>

                    ))}            


                </div>

                </div>

                <div id="lista-dependentes" className="col" style={{borderColor:"red"}}>
                    
                    <div className="list-group">
                        <h6 className="card-title">Lista de Dependentes</h6>
                        {dependente_data.map((dados,index)=>(

                            <div>
                                
                                <div role="button" data-toggle="collapse" data-target={`#collapse-${dados.id}`} 
                                aria-expanded="false" aria-controls="collapseExample">

                                    {dados.nome}-{dados.confirmado}

                                </div>
                                
                                <div className="collapse" id={`collapse-${dados.id}`}>
                                    <div className="card card-body">

                                        <p><b>Nome: </b> {dados.nome}</p>

                                        <p><b>Email: </b>{dados.email}</p>

                                        <p><b>CPF: </b>{dados.cpf}</p>

                                        <p><b>RG: </b>{dados.rg}</p>

                                        <p><b>Endereço: </b>{dados.endereco}</p>

                                        <p><b>Telefones: </b>{dados.telefones}</p>

                                        <a href={`${doc_url}/${dados.imagem_rg}`} target="blank">Ver rg</a>
                                        <a href={`${doc_url}/${dados.imagem_cpf}`} target="blank">Ver cpf</a>
                                        <a href={`${doc_url}/${dados.comprovante}`} target="blank">Ver comprovante</a>
                                        
                                        
                                        {!dados.confirmado && <button onClick={()=> ConfirmarDependente(dados.socio_id, index)} className="btn btn-success">Autenticar Dependente</button>}
                                        <button onClick={()=> DeletarDependente(dados.dependente_id)} className="btn btn-danger">Deletar Dependente</button>
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