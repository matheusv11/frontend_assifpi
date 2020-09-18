import React,{useEffect,useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';

const Gastos=()=>{

    const {admToken}=useAuth();
    const [gastos,setGasto]=useState([]);
    const [descricao,setDescricao]=useState('');
    const [valor,setValor]=useState('');
    const [data,setData]=useState('');

    useEffect(()=>{
        connection.get('/gastos', {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            
            setGasto(dados.data);
        }).catch((err)=>{
            alert(err.message);
        })
          // eslint-disable-next-line     
    },[]);
    
    const Cadastrar= (e)=>{
        e.preventDefault();
        const formulario= {descricao,valor,data}

        connection.post('/gastos', formulario,{
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
            setGasto([...gastos,formulario])
        }).catch((err)=>{
            alert(err.message);            
        })
        // setDependentes(dependente_data.filter(dependentes=> dependentes.dependente_id !==id))
        // setConvenios([...convenios, {titulo,descricao, imagem: dados.data.imagem}]) 
    }

    const Deletar= (id)=>{
        if(window.confirm("Você tem certeza? Está ação não poderá ser desfeita."))

        connection.delete(`/gastos/${id}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
             alert(dados.data.message)
            setGasto(gastos.filter(gastos=> gastos.id !==id))
        }).catch((err)=>{
            alert(err.message)
        })
    }

    return (
        <div id="componente-gastos" style={{margin:"0 auto",width:"90%"}}>
            <h2>Gastos
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M15 4H1v8h14V4zM1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1z"/>
            <path d="M13 4a2 2 0 0 0 2 2V4h-2zM3 4a2 2 0 0 1-2 2V4h2zm10 8a2 2 0 0 1 2-2v2h-2zM3 12a2 2 0 0 0-2-2v2h2zm7-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
            </svg>
            </h2>
            <div className="card" style={{borderWidth: '5px',borderColor:"green"}}>
                <div className="card-body">
                    
                    <button className="btn btn-success" style={{margin:"0 auto",marginBottom:"2%"}} 
                    type="button" 
                    data-toggle="collapse" data-target="#collapseExample" 
                    aria-expanded="false" aria-controls="collapseExample">Cadastrar novo gasto</button>

                    <div className="collapse" id="collapseExample" style={{marginBottom:"2%",borderWidth: '5px',borderColor:"green",borderStyle:"solid"}}> 
                        <div className="card card-body">

                            <div className="form-group">
                                <label>Gasto:</label>
                                <input onChange={e=> setDescricao(e.target.value)} className="form-control" />
                            </div>
                        
                            <div className="row">
                                <div className="form-group col-sm-6 col-xs-12">
                                    <label >Valor:</label>
                                    <input onChange={e=> setValor(e.target.value)} type="number" className="form-control" />
                                </div>

                                <div className="form-group col-sm-6 col-xs-12">
                                    <label >Data:</label>
                                    <input onChange={e=> setData(e.target.value)} type="date" className="form-control" />
                                </div>

                            </div>

                            <button onClick={Cadastrar} className="btn btn-success">Cadastrar</button>

                        </div>
                    </div>
                    
                    <div id="listagastos" >
                        <ul className="list-group">
                            {gastos.map(gastos=>(
                              <li key={gastos.id} className="list-group-item list-group-item-warning">
                               Descricao: {gastos.descricao} <br/>
                               Gasto de {gastos.data} <br/>
                               Valor: {gastos.valor} <br/>
                              <button onClick={()=> Deletar(gastos.id)} className="btn btn-outline-danger">Deletar</button>
                              
                              </li>

                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gastos;