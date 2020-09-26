import React,{useState,useEffect} from 'react';
import connection from '../services/connection';
import {useAuth} from '../components/auth';
import Navbar from '../components/NavBar';
import Footer from '../components/footer';

const Convenios=()=>{
    
    const {admToken,doc_url}=useAuth();
    const[titulo,setTitulo]=useState('');
    const[descricao,setDescricao]=useState('');
    const[imagem,setImagem]=useState('');
    const[anexo,setAnexo]=useState('');
    const[convenios,setConvenios]=useState([]);

    useEffect(()=>{
        connection.get('/convenios').then((dados)=>{
            setConvenios(dados.data);
        }).catch((err)=>{
            alert(err.message);
        })
        // eslint-disable-next-line
    },[]);

    const Criar= (e)=>{
        e.preventDefault();
        const format= new FormData();
        format.append('file', imagem);
        format.append('file', anexo);
        format.append('titulo', titulo);
        format.append('descricao', descricao);

        connection.post('/convenios',format, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
            setConvenios([...convenios, {titulo,descricao, imagem: dados.data.imagem, anexo: dados.data.anexo}]) 
            //Resolver problema de url de imagem //Melhorar isso //ConvenioController
        }).catch((err)=>{
            alert(err.response.data.message)
        })
    }

    const Deletar= (id)=>{
        if(window.confirm("Você tem certeza? Está ação não poderá ser desfeita."))
        
        connection.delete(`/convenios/${id}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
            setConvenios(convenios.filter(convenios=> convenios.id !==id))
        }).catch((err)=>{
            alert(err.message)
        })
        //setDepedente(dependente_data.filter(dependentes=> dependentes.id !==id))
    }

    return (
    <div id="page-convenios">
        
        <Navbar/>
        
        <h2>Convênios para os assóciados!
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-gift" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zM1 4v2h6V4H1zm8 0v2h6V4H9zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5V7zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5H7z"/>
        </svg>
        </h2>

        {admToken && 
        <div id="cadastrar-convenio">
            <button type="button"  className="btn btn-success" 
            data-toggle="collapse" data-target="#collapseExample" 
            aria-expanded="false" aria-controls="collapseExample">Cadastrar novo Covenio</button>


            <div className="collapse" id="collapseExample">
                    <div className="card card-body">
                    <form onSubmit={Criar}>
                        <div className="form-group">
                            <label>Título:</label>
                            <input onChange={e=> setTitulo(e.target.value)}  className="form-control"/>
                            
                        </div>
                        <div className="form-group">
                            <label >Descrição:</label>
                            <textarea onChange={e=> setDescricao(e.target.value)} className="form-control" />
                        </div>
                        <div className="row">
                            <div className="form-group form-check col-sm-6 col-xs-12">
                                <label>Imagem:</label><br/>
                                <input onChange={e=> setImagem(e.target.files[0])} type="file"/>
                            </div>

                            <div className="form-group form-check col-sm-6 col-xs-12">
                                <label>Anexo:</label><br/>
                                <input type="file" onChange={e=> setAnexo(e.target.files[0])}/>
                            </div>
                        </div>
                        <button onClick={Criar} type="submit" className="btn btn-success">Publicar</button>
                    </form>
                    </div>
            </div>

        </div>}

 
        <div style={{borderColor:"black",width:"100%"}}>
            {convenios.map(dados=>(
                <div className="card" style={{width: '16rem',float:"left",borderColor:"green" ,margin:"4%"}}>
                {dados.imagem && <img src={`${doc_url}/${dados.imagem}`} style={{height:"50%"}} alt="" className="card-img-top" />}
                <div className="card-body">
                    <h5 className="card-title">{dados.titulo}</h5>
                    <p className="card-text">{dados.descricao}</p> 
                    <p><b>Anexo:<a target="blank" href={`${doc_url}/${dados.anexo}`}>Documento</a></b></p> 
                        {admToken && <button onClick={()=> Deletar(dados.id)} type="button" className="btn btn-danger">Deletar este convênio</button>}
                        
                </div>
                </div>
            ))}
            
        </div>


        <Footer/>
        
        
    </div>)
}

export default Convenios;