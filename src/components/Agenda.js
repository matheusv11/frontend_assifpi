import React,{useState, useEffect} from 'react';
import connection from '../services/connection';
import {useAuth} from './auth';

const Agenda=()=>{

    const {token,admToken}=useAuth();
    const[formData,setData]=useState({
        local:'',participantes:'', data:'', hora_inicio:'', hora_fim:''
    });
    const[agenda,setAgenda]=useState([]);

    useEffect(()=>{
        connection.get('/agenda').then((dados)=>{
            setAgenda(dados.data);
        }).catch((err)=>{
            alert(err.message);
        })
    },[]);

    const Solicitar= (e)=>{
        e.preventDefault();
        const {...rest}= formData;

        connection.post('/agenda',rest, {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
            setAgenda([...agenda, rest]);
        }).catch((err)=>{
            alert(err.response.data.message);
        })
    }

    const Confirmar= (id, index)=>{
        connection.put(`/agenda/${id}`,'',{
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
            const altera = [...agenda];
            altera[index].status = "confirmado";
            setAgenda(altera);
        }).catch((err)=>{
            alert(err.message);
        })
    }

    const Deletar= (id)=>{
        connection.delete(`/agenda/${id}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
            setAgenda(agenda.filter(agenda=> agenda.id !==id))
        }).catch((err)=>{
            alert(err.message);
        })
    }


    return(
    <div id="pagina-agenda" style={{margin:"0 auto",width:"80%"}}>
        <h2>Agenda
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
        </svg>
        </h2>
        <div id="cadastrar-convenio">
            {token && <button type="button"  className="btn btn-success" 
            data-toggle="collapse" data-target="#collapseExample" 
            aria-expanded="false" aria-controls="collapseExample" style={{margin:"1%"}}>Solicitar</button>
}
            
            <div className="collapse" id="collapseExample" style={{margin:"1%"}}>
                    <div className="card card-body">
                    <form>
                        <div className="form-group">
                            <label>Local:</label>
                            <input onChange={e=> setData({...formData, local: e.target.value})}  className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Participantes:</label>
                            <textarea onChange={e=> setData({...formData, participantes: e.target.value})} className="form-control" required></textarea>
                        </div>
                        <div class="row">
                            <div className="form-group col-sm-4 col-xs-12">
                                <label>Data:</label>
                                <input onChange={e=> setData({...formData, data: e.target.value})} type="date" className="form-control" id="" />
                            </div>
                            <div className="form-group col-sm-4 col-xs-12">
                                <label>Hora de início:</label>
                                <input onChange={e=> setData({...formData, hora_inicio: e.target.value})} type="time" className="form-control" id="" />
                            </div>
                            <div className="form-group col-sm-4 col-xs-12">
                                <label>Hora de finalização:</label>
                                <input onChange={e=> setData({...formData, hora_fim: e.target.value})} type="time" className="form-control" id="" />
                            </div>
                        </div>
                        <button onClick={Solicitar} type="submit" className="btn btn-success">Solicitar</button>
                    </form>
                  </div>
            </div>
        </div>

        <div className="card" style={{borderWidth: '5px',borderColor:"green"}}> 
            <ul className="list-group" style={{listStyle: "none"}}>
                {agenda.map((evento,index)=>(
                    <li key={evento.id} className={`alert alert-${evento.status==="confirmado" ? 'success' : 'warning'}`} style={{margin:"1%"}}>
                        <p><b>Solicitate:</b>{evento.nome}</p>
                        {admToken && <p><b>CPF:</b>{evento.cpf}</p>}
                        <p><b>Local:</b>{evento.local}</p>
                        <p><b>Data:</b>{evento.data}</p>
                        <p><b>Hora:</b>{evento.hora_inicio}-{evento.hora_fim}</p>
                        <p><b>Pedido:</b>{evento.status}</p>
                        <b>Participantes:</b>
                        <ul>
                            {evento.participantes.split(',').map((participantes)=>(
                                <li>{participantes}</li>
                            ))}
                        </ul>
                        {admToken && <button onClick={()=> Confirmar(evento.id,index)} type="button" class="btn btn-success" style={{margin:"1%"}}>Aprovar</button>}
                        {admToken && <button onClick={()=> Deletar(evento.id)}type="button" class="btn btn-danger" style={{margin:"1%"}}>Excluir</button>}
                    </li>
                ))}
            </ul>
        </div>
    </div>
    );
}

export default Agenda;