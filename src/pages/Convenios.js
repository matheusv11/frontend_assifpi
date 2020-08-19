import React,{useState,useEffect} from 'react';
import connection from '../services/connection';
import {useAuth} from '../components/auth';
import Navbar from '../components/NavBar';


const Convenios=()=>{
    
    const {admToken,setLoading,doc_url}=useAuth();
    const[titulo,setTitulo]=useState('');
    const[descricao,setDescricao]=useState('');
    const[imagem,setImagem]=useState('');
    const[anexo,setAnexo]=useState('');
    const[convenios,setConvenios]=useState([]);

    useEffect(()=>{
        setLoading(true)
        connection.get('/convenios').then((dados)=>{
            setConvenios(dados.data);
            setLoading(false)
        }).catch((err)=>{
            alert(err.message);
            setLoading(false)
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
        setLoading(true);
        
        connection.post('/convenios',format, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setLoading(false);
            alert(dados.data.message);
            setConvenios([...convenios, {titulo,descricao, imagem: dados.data.imagem, anexo: dados.data.anexo}]) 
            //Resolver problema de url de imagem //Melhorar isso //ConvenioController
        }).catch((err)=>{
            setLoading(false);
            alert(err.response.data.message)
        })
    }

    const Deletar= (id)=>{
        setLoading(true);
        connection.delete(`/convenios/${id}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setLoading(false)
            alert(dados.data.message);
            setConvenios(convenios.filter(convenios=> convenios.id !==id))
        }).catch((err)=>{
            setLoading(false);
            alert(err.message)
        })
        //setDepedente(dependente_data.filter(dependentes=> dependentes.id !==id))
    }

    return (
    <div id="page-convenios">
        
        <Navbar/>
        
        <h2>Convenios para os assóciados!</h2>

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
                        {admToken && <button onClick={()=> Deletar(dados.id)} type="button" className="btn btn-danger">Deletar este convenio</button>}
                        
                </div>
                </div>
            ))}
            
        </div>

        
        
        
    </div>)
}

export default Convenios;