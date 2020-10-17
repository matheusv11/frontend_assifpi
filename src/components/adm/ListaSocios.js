import React,{useEffect,useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';
import createPagination from '../../helpers/createPagination';
import {cpfMask} from '../../helpers/mask';


const ListaSocios=()=>{

    const {admToken, setAdm, doc_url}= useAuth();
    const[cpf,setCpf]=useState('');
    const[socio_data,setData]=useState([]);
    const[dependente_data,setDependentes]=useState([]);
    const[total,setTotal]=useState(0);
    const[page,setPage]=useState(1);
    const[presencial,setPresencial]=useState('mercadopago');

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
            setTotal(parseInt(dados.headers['total-count']))
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
                return parseInt(dados.headers['total-count'])+prevState
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
        
        // if(!presencial){
        //     return alert('Informe o meio de pagamento')
        // }
        connection.put(`/confirm_socio/${id}?presencial=${presencial}`,'', {
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
            <h2>Lista de sócios e dependentes
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-lines-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </h2>

            <div id="lista" className="row" style={{borderWidth: '5px',borderColor:"green",borderStyle:"solid"}}>
            
            <input type="search" value={cpf} onChange={e=> setCpf(cpfMask(e.target.value))} className="form-control" id=""  placeholder='Pesquisar por cpf' />
                <div id="lista-socios" className="col" style={{borderColor:"green"}}>
                    
                <div className="list-group">
                <h6 className="card-title">Lista de Sócios</h6>
                    {socio_data.map((dados,index)=>(

                    <div>
                        
                        <div role="button" data-toggle="collapse" data-target={`#collapse-${dados.id}`} 
                        aria-expanded="false" aria-controls="collapseExample">

                            {dados.nome}-{dados.confirmado? <>Autorizado</> : <>Não autorizado</>}

                        </div>
                        
                        <div className="collapse" id={`collapse-${dados.id}`}>
                            <div className="card card-body">

                                <p><b>Nome: </b> {dados.nome}</p>

                                <p><b>Email: </b>{dados.email}</p>

                                <p><b>CPF: </b>{dados.cpf}</p>

                                <p><b>RG: </b>{dados.rg}</p>

                                <p><b>Endereço: </b>{dados.endereco}</p>

                                <p><b>Telefones: </b>{dados.telefones}</p>

                                <p><b>Pagamento: </b>{dados.pagamento}</p>

                                {dados.rg_frente && <a href={`${doc_url}/${dados.rg_frente}`} target="blank" >Ver rg_frente</a>}
                                {dados.rg_verso && <a href={`${doc_url}/${dados.rg_verso}`} target="blank" >Ver rg_verso</a>}
                                {dados.cnh && <a href={`${doc_url}/${dados.cnh}`} target="blank" >Ver CNH</a>}
                                {dados.autorizacao && <a href={`${doc_url}/${dados.autorizacao}`} target="blank" >Ver autorizacao</a>}
                                {dados.filiacao && <a href={`${doc_url}/${dados.filiacao}`} target="blank" >Ver filiação</a>}
                                

                                <a href={`${doc_url}/${dados.imagem_cpf}`} target="blank" >Ver cpf</a>
                                <a href={`${doc_url}/${dados.comprovante}`} target="blank" >Ver comprovante</a>
                                


                                {!dados.confirmado &&
                                
                                <>
                                
                                <div className="form-group form-check" style={{marginTop:"2%"}} >
                                    <form>
                                    <input type="radio" id="male" name="gender" value="male" onClick={e=>setPresencial('presencial')}/>
                                    <label for="male">Debito</label><br/>
                                    <input type="radio" id="female" name="gender" value="female" onClick={e=>setPresencial('mercadopago')}/>
                                    <label for="female">mercdopago</label><br/>
                                    </form>
                                    
                                </div>
                                
                                <button style={{margin:"1%"}} onClick={()=> ConfirmarSocio(dados.socio_id,index)} className="btn btn-success">Autenticar Sócio</button></>}
                                <button style={{margin:"1%"}} onClick={()=> DeletarSocio(dados.socio_id)} className="btn btn-danger">Deletar Sócio</button>
                            
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

                                    {dados.nome}-{dados.confirmado? <>Autorizado</> : <>Não autorizado</>}

                                </div>
                                
                                <div className="collapse" id={`collapse-${dados.id}`}>
                                    <div className="card card-body">

                                        <p><b>Nome: </b> {dados.nome}</p>

                                        <p><b>Email: </b>{dados.email}</p>

                                        <p><b>CPF: </b>{dados.cpf}</p>

                                        <p><b>RG: </b>{dados.rg}</p>

                                        <p><b>Endereço: </b>{dados.endereco}</p>

                                        <p><b>Telefones: </b>{dados.telefones}</p>

                                        <a href={`${doc_url}/${dados.comprovante_parentesco}`} target="blank">Ver comprovante de comprovante de parentesco</a>
                                        
                                        {!dados.confirmado && <button style={{margin:"1%"}} onClick={()=> ConfirmarDependente(dados.socio_id, index)} className="btn btn-success">Autenticar Dependente</button>}
                                        <button style={{margin:"1%"}} onClick={()=> DeletarDependente(dados.dependente_id)} className="btn btn-danger">Deletar Dependente</button>
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