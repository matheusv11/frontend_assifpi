import React,{useState,useEffect} from 'react';
import connection from '../services/connection';
import {useAuth} from '../components/auth';

const Convenios=()=>{
    
    const {admToken}=useAuth();
    const[titulo,setTitulo]=useState('');
    const[descricao,setDescricao]=useState('');
    const[imagem,setImagem]=useState('');
    const[convenios,setConvenios]=useState([]);

    useEffect(()=>{
        connection.get('/convenios').then((dados)=>{
            setConvenios(dados.data);
        }).catch((err)=>{
            alert(err.message);
        })
    },[]);

    const Criar= (e)=>{
        e.preventDefault();
        const format= new FormData();
        format.append('file', imagem);
        format.append('titulo', titulo);
        format.append('descricao', descricao);

        connection.post('/convenios',format, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
            // setConvenios([...convenios, {titulo,descricao}])

        }).catch((err)=>{
            alert(err.message)
        })
    }

    const Deletar= (id)=>{
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
    <div id="page-convenios" 
    //style={{marginLeft:"30%"}}
    >
        <h2>Convenios para os assóciados!</h2>

        {admToken && 
        <div id="cadastrar-convenio">
            <button type="button"  class="btn btn-success" 
            data-toggle="collapse" data-target="#collapseExample" 
            aria-expanded="false" aria-controls="collapseExample">Cadastrar novo Covenio</button>


            <div class="collapse" id="collapseExample">
                    <div class="card card-body">
                    <form onSubmit={Criar}>
                        <div class="form-group">
                            <label>Título:</label>
                            <input onChange={e=> setTitulo(e.target.value)}  class="form-control"/>
                            
                        </div>
                        <div class="form-group">
                            <label >Descrição:</label>
                            <textarea onChange={e=> setDescricao(e.target.value)} class="form-control" />
                        </div>
                        <div class="form-group form-check">
                            <label>Imagem (opcional):</label><br/>
                            <input onChange={e=> setImagem(e.target.files[0])} type="file"/>
                        </div>
                        <button onClick={Criar} type="submit" class="btn btn-success">Publicar</button>
                    </form>
                    </div>
            </div>

        </div>}

 
        <div style={{borderColor:"black",width:"100%"}}>
            {convenios.map(dados=>(
                <div class="card" style={{width: '18rem',height:"25rem",float:"left",borderColor:"green" ,margin:"2%"}}>
                {dados.imagem && <img src={`http://localhost:3030/files/${dados.imagem}`} style={{height:"50%"}} class="card-img-top" />}
                <div class="card-body">
                    <h5 class="card-title">{dados.titulo}</h5>
                    <p class="card-text">{dados.descricao}</p>
                        {admToken && <button onClick={()=> Deletar(dados.id)} type="button" class="btn btn-danger">Deletar este convenio</button>}
                </div>
                </div>
            ))}
            
        </div>

        
        
        
    </div>)
}

export default Convenios;