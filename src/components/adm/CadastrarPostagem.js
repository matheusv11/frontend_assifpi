import React,{useState} from 'react';
import connection from '../../services/connection';
import {useAuth} from '../auth';

const CadastrarPostagem = () => {
    const {admToken,setLoading}= useAuth();

    const [formData, setData]= useState({
        titulo:'', descricao:'', local:'', data:'', hora:'', anexo:''
    });

    const Cadastrar= (e)=>{
        e.preventDefault();
        const {titulo,descricao,local, data, hora,anexo}= formData;
        // const {...rest}= formData;
        const format= new FormData();
        const format_data= data.split('-') //No back tava com o date now
        format.append('file', anexo)
        format.append('titulo', titulo)
        format.append('descricao',descricao)
        format.append('local',local)
        format.append('data', `${format_data[2]}/${format_data[1]}/${format_data[0]}`)
        format.append('hora', hora)

        setLoading(true);

        connection.post('/evento', format, {
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
    
        <div className="card" style={{borderWidth: '5px',borderColor:"green"}}>
            <div className="card-body">
                <form onSubmit={Cadastrar}>
                
                    <div className="form-group">
                    <label>Título:</label>
                    <input onChange={e=> setData({...formData, titulo: e.target.value})} type="text" className="form-control" id="" required/>
                    </div>
            
            
                    <div className="form-group">
                    <label>Descrição:</label>
                    <textarea onChange={e=> setData({...formData, descricao: e.target.value})} className="form-control" required></textarea>
                    </div>

                    <div className="row">
                        <div className="form-group col-sm-4 col-xs-12">
                            <label>Local:</label>
                            <input onChange={e=> setData({...formData, local: e.target.value})} type="" className="form-control" id="" />
                        </div>

                        <div className="form-group col-sm-4 col-xs-12">
                            <label>Data:</label>
                            <input onChange={e=> setData({...formData, data: e.target.value})} type="date" className="form-control" id="" />
                        </div>

                        <div className="form-group col-sm-4 col-xs-12">
                            <label>Hora:</label>
                            <input onChange={e=> setData({...formData, hora: e.target.value})} type="time" className="form-control" id="" />
                        </div>
                    </div>

                    <div className="custom-file col-sm-6 col-xs-12">
                        <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={e=> setData({...formData, anexo: e.target.files[0]})}  required/>
                        <label className="custom-file-label" for="inputGroupFile01">{!formData.anexo ? 'Anexe algo' : formData.anexo.name }</label>
                    </div>
                
                    <br/>
                    
                    <button onClick={Cadastrar} style={{marginTop:"2%"}} type="submit" className="btn btn-success">Publicar</button>
                </form>
            </div>
        </div>
    </div>);
}

export default CadastrarPostagem;