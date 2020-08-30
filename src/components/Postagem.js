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

                    <div id="carouselExampleControls"  class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner" >
                        <div class="carousel-item active">
                        <img src="data:image/jpeg;base64,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" class="d-block w-100" alt="..."/>
                        </div>
                        <div class="carousel-item">
                        <img src="data:image/jpeg;base64,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" class="d-block w-100" alt="..."/>
                        </div>
                        <div class="carousel-item">
                        <img src="data:image/jpeg;base64,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" class="d-block w-100" alt="..."/>
                        </div>
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