import React,{useState,useEffect} from 'react';
import {useAuth} from '../components/auth';
import connection from '../services/connection';
// import Modal from '../components/Modal';

const Postagem=({evento})=>{

    const {token,admToken,doc_url}= useAuth();
    const [participa,setParticipa]=useState(false);
    const [show,setShow]=useState(false);
    const [participantes,setParticipante]=useState([]);
    const [deleted,setDelete]=useState(false);

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
        // eslint-disable-next-line
    },[]);

    const Participar= ()=>{
        connection.post(`/socio_evento/${evento.id}`, '', {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
            setParticipa(true)
        }).catch((err)=>{
            alert(err.response.data.message)
        })
    }

    const Remover= ()=>{
        connection.delete(`/socio_evento/${evento.id}`, {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            alert(dados.data.message)
            setParticipa(false);
            console.log(evento.id)
        }).catch((err)=>{
            alert(err.response.data.message)
        })
    }

    const Visualizar= ()=>{
        connection.get(`/socio_evento/${evento.id}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setParticipante(dados.data);
            setShow(true);
        }).catch((err)=>{
            alert(err);
        })
    }

    const Deletar= (id)=>{
        if(window.confirm("Você tem certeza? Está ação não poderá ser desfeita."))
        connection.delete(`/evento/${id}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            alert(dados.data.message)
            setDelete(true)
            //Resolve exclude
            // setConvenios(convenios.filter(convenios=> convenios.id !==id))
        }).catch((err)=>{
            alert(err)
        })
    }
    
    return (
    <div id='componente-postagem'>
        {deleted ? <></> : 
                <div className="card"  style={{width: '80%', margin: '0 auto', marginTop: '2%', borderWidth: '5px',borderColor:"green"}}>
                <div className="card-body">

                    <h3><b>{evento.titulo}</b></h3>
                    
                    <p>{evento.descricao}</p>
                    {evento.imagens && 
                        <div id="carouselExampleControls"  class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner" >
                            {evento.imagens.split(',').map((img, index)=>(
                                <div class={`carousel-item ${index===0 && 'active'}`}>
                                    <img style={{height:"60vh"}} src={`${doc_url}/${img}`} class="d-block w-100" alt="..."/>
                                </div>
                            ))}

                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                        </div>
                    }
                    <p><b>Data: </b> {(evento.data==='undefined')? <></> : <>{evento.data}</>} </p>

                    <p><b>Hora: </b>{evento.hora}</p>

                    <p><b>Local: </b>{evento.local}</p>

                    { evento.anexo && <p><b>Anexo: </b><a target="blank" href={`${doc_url}/${evento.anexo}`}>Documento</a></p>}

                    {evento.hora && <>{token && <>{!participa ? (<button onClick={Participar} type="button" className="btn btn-outline-success">Confirmar presença</button>):
                    (<button onClick={Remover} type="button" className="btn btn-outline-danger">Tirar presença</button>)}</>}</>}
                    
                    {admToken && <div><button onClick={Visualizar} type="button"  className="btn btn-success" data-toggle="collapse" data-target={`#collapseExample${evento.id}`} 
                    aria-expanded="false" aria-controls="collapseExample">Vizualizar Confirmados</button> <button onClick={()=> Deletar(evento.id)} type="button" className="btn btn-danger">Deletar</button></div>}

                

                </div>
                    <div className="collapse" id={`collapseExample${evento.id}`}>
                        <div className="card card-body">
                            <h3>Lista de participantes</h3>
                        {show && <div>{participantes.map(participantes=>(
                        <div key={participantes.id}>{participantes.nome}</div>
                        ))}</div>}
                        </div>
                    </div>
            </div>
        }


    </div>
    
    )
}

export default Postagem