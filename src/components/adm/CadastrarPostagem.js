import React,{useState} from 'react';
import connection from '../../services/connection';
import {useAuth} from '../auth';

const CadastrarPostagem = () => {
    const {admToken,setLoading}= useAuth();

    const [formData, setData]= useState({
        titulo:'', descricao:'', local:'', data:'', hora:''
    });

    const Cadastrar= (e)=>{
        e.preventDefault();
        const {titulo,descricao,local, data, hora}= formData;
        // const {...rest}= formData;
        const format_data= data.split('-') //No back tava com o date now
        const dados= {titulo,descricao,local,data: `${format_data[2]}/${format_data[1]}/${format_data[0]}`,hora}
        setLoading(true);
        connection.post('/evento', dados, {
            headers:{
                authorization:`Bearer ${admToken}`
            }
        }).then((dados)=>{
            setLoading(false)
            alert(dados.data.message);  
        }).catch((err)=>{
            setLoading(false)
            alert(err.message);
        })
    }

    return (
    <div id='componente-cadastrar-postagem' style={{margin:"0 auto",width:"80%"}}>
        <h2>Criar Postagem</h2>
    
        <div class="card" style={{borderWidth: '5px',borderColor:"green"}}>
            <div class="card-body">
                <form onSubmit={Cadastrar}>

                    <div class="form-group">
                    <label>Título:</label>
                    <input onChange={e=> setData({...formData, titulo: e.target.value})} type="text" class="form-control" id="" required/>
                    </div>
            
            
                    <div class="form-group">
                    <label>Descrição:</label>
                    <textarea onChange={e=> setData({...formData, descricao: e.target.value})} class="form-control" required></textarea>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-4 col-xs-12">
                            <label>Local:</label>
                            <input onChange={e=> setData({...formData, local: e.target.value})} type="" class="form-control" id="" />
                        </div>

                        <div class="form-group col-sm-4 col-xs-12">
                            <label>Data:</label>
                            <input type="date" onChange={e=> setData({...formData, data: e.target.value})} type="date" class="form-control" id="" />
                        </div>

                        <div class="form-group col-sm-4 col-xs-12">
                            <label>Hora:</label>
                            <input onChange={e=> setData({...formData, hora: e.target.value})} type="time" class="form-control" id="" />
                        </div>
                    </div>
            
                    
                    <button onClick={Cadastrar} type="submit" class="btn btn-success">Publicar</button>
                </form>
            </div>
        </div>
    </div>);
}

export default CadastrarPostagem;