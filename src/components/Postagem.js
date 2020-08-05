import React,{useState,useEffect} from 'react';
import {useAuth} from '../components/auth';
import connection from '../services/connection';
// import Modal from '../components/Modal';

const Postagem=({evento})=>{

    const [participa,setParticipa]=useState(false);
    const [show,setShow]=useState(false);
    const [participantes,setParticipante]=useState([]);
    const {token,admToken,setLoading}= useAuth();

    useEffect(()=>{
        //If token pega dados 
        connection.get(`/index_socio_evento/${evento.id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            if(dados.data){
                setParticipa(true);
            }
        })
        // .catch((err)=>{
        //     alert(err)
        // })

    },[]);


    const Participar= ()=>{
        setLoading(true)

        connection.post(`/socio_evento/${evento.id}`, '', {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            setLoading(false)
            alert(dados.data.message);
            setParticipa(true)
        }).catch((err)=>{
            setLoading(false)
            alert(err.response.data.message)
        })
    }

    const Remover= ()=>{
        setLoading(true)
        connection.delete(`/socio_evento/${evento.id}`, {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            setLoading(false)
            alert(dados.data.message)
            setParticipa(false);
            console.log(evento.id)
        }).catch((err)=>{
            setLoading(false)
            alert(err.response.data.message)
        })
    }

    const Visualizar= ()=>{
        setLoading(true)
        connection.get(`/socio_evento/${evento.id}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setParticipante(dados.data);
            setShow(true);
            setLoading(false)
        }).catch((err)=>{
            setLoading(false)
            alert(err);
        })
    }


    const Deletar= (id)=>{
        setLoading(true);
        connection.delete(`/evento/${id}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setLoading(false)
            alert(dados.data.message)
            //Resolve exclude
            // setConvenios(convenios.filter(convenios=> convenios.id !==id))

        }).catch((err)=>{
            setLoading(false)
            alert(err)
        })
    }
    return (
    <div id='componente-postagem'>


        <div class="card"  style={{width: '80%', margin: '0 auto', marginTop: '2%', borderWidth: '5px',borderColor:"green"}}>
                    <div class="card-body">
    
                        <h3><b>{evento.titulo}</b></h3>
                        
                        <p>{evento.descricao}</p>

                        <p><b>Data: </b>{evento.data==='undefined' && <></>}</p>

                        <p><b>Hora: </b>{evento.hora}</p>

                        <p><b>Local: </b>{evento.local}</p>

                        { evento.anexo && <p><b>Anexo: </b><a target="_blank" href={`http://localhost:3030/files/${evento.anexo}`}>Documento</a></p>}
                        
                        {evento.hora && <>{token && <>{!participa ? (<button onClick={Participar} type="button" class="btn btn-outline-success">Confirmar presença</button>):
                        (<button onClick={Remover} type="button" class="btn btn-outline-danger">Tirar presença</button>)}</>}</>}
                        
                        {admToken && <div><button onClick={Visualizar} type="button"  class="btn btn-success" data-toggle="collapse" data-target={`#collapseExample${evento.id}`} 
                        aria-expanded="false" aria-controls="collapseExample">Vizualizar Confirmados</button> <button onClick={()=> Deletar(evento.id)} type="button" class="btn btn-danger">Deletar</button></div>}

                    

                    </div>
                        <div class="collapse" id={`collapseExample${evento.id}`}>
                            <div class="card card-body">
                                <h3>Lista de participantes</h3>
                            {show && <div>{participantes.map(participantes=>(
                            <div key={participantes.id}>{participantes.nome}</div>
                            ))}</div>}
                            </div>
                        </div>
                </div>

    </div>)
}

export default Postagem