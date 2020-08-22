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
        const format_data= data.split('-') //No back tava com o date now
        const formulario= {descricao,valor,data: `${format_data[2]}/${format_data[1]}/${format_data[0]}`}

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
            <h2>Gastos</h2>
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