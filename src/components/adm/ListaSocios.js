import React,{useEffect,useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';
import createPagination from '../../helpers/createPagination';


const ListaSocios=()=>{

    const {admToken, setAdm, doc_url}= useAuth();
    const[cpf,setCpf]=useState('');
    const[socio_data,setData]=useState([]);
    const[dependente_data,setDependentes]=useState([]);
    const[total,setTotal]=useState(0);
    const[page,setPage]=useState(1);
    
    const {pagination}= createPagination({
        numberOfArticles: total,
        articlesPerPage: 10, //Ou eventos.length
        numberOfButtons: 5,
        currentPage: page
    })

    useEffect(()=>{
        connection.get(`/index_socios?page=${page}&cpf=${cpf}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setData(dados.data);
            setTotal(prevState=>{
                return prevState+parseInt(dados.headers['total-count'])
            })
        }).catch((err)=>{
            setAdm(null);
            localStorage.removeItem('admToken');
            alert(err.message);
        });
        // eslint-disable-next-line
    },[cpf,page]);//Fazer busca via query ainda

    useEffect(()=>{
        connection.get(`/index_dependentes?page=${page}&cpf=${cpf}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setDependentes(dados.data);
            setTotal(prevState=>{
                return prevState+parseInt(dados.headers['total-count'])
            })
        }).catch((err)=>{
            setAdm(null);
            localStorage.removeItem('admToken');
            alert(err.message);
        });
        // eslint-disable-next-line
    },[cpf,page]);
    
    const ConfirmarSocio= (id,index)=>{
        if(window.confirm("Você tem certeza? Está ação não poderá ser desfeita."))

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
        if(window.confirm("Você tem certeza? Está ação não poderá ser desfeita."))

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


    const DeletarSocio= (id)=>{
        if(window.confirm("Você tem certeza? Está ação não poderá ser desfeita."))

        connection.delete(`/socio/${id}`, {
            headers:{
                authorization:  `Bearer ${admToken}`
            }
        }).then((dados)=>{    
            alert(dados.data.message)
            setData(socio_data.filter(socios=> socios.socio_id !==id))
        }).catch((err)=>{
            alert(err.message)
        })
    }

    const DeletarDependente= (id)=>{
        if(window.confirm("Você tem certeza? Está ação não poderá ser desfeita."))
        
        connection.delete(`/delete_dependente/${id}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
            setDependentes(dependente_data.filter(dependentes=> dependentes.dependente_id !==id))
        }).catch((err)=>{
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

            <nav style={{width: '80%', margin: '10px auto', justifyContent:'center', display: 'flex'}} aria-label="...">
    <ul className="pagination">

        <li className={`page-item ${pagination[0]=== page && "disabled"}`} >
        <button onClick={()=> setPage(page-1)} className="page-link"> {"<"} </button>
        </li>

        {pagination.map(pagina => (
          <li
            className={`page-item ${page === pagina && "active"}`}
            onClick={()=> setPage(pagina)}

          >
              <button className="page-link">{pagina}</button>
          </li>
        ))}
        <li className={`page-item ${pagination.reverse()[0]=== page && "disabled"}`} >

        <button onClick={()=> setPage(page+1)} className="page-link" >{">"}</button>

        </li>
    </ul>
    </nav>                
        </div>
    );
}

export default ListaSocios;