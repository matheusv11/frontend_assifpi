import React,{useState} from 'react';
import connection from '../../services/connection';
import {useAuth} from '../auth';

const CadastrarPostagem = () => {
    const {admToken}= useAuth();

    const [formData, setData]= useState({
        titulo:'', descricao:'', local:'', data: null, hora: null, anexo:'', imagens:''
    });

    const Cadastrar= (e)=>{
        e.preventDefault();
        const {titulo,descricao,local, data, hora, anexo, imagens}= formData;
        // const {...rest}= formData;
        const format= new FormData();
        format.append('anexo', anexo)

        Object.keys(imagens).map((itens)=>{
           return format.append('imagens', imagens[itens]);
        });

        format.append('titulo', titulo)
        format.append('descricao',descricao)
        format.append('local',local)
        format.append('data', data)
        format.append('hora', hora)

        connection.post('/evento', format, {
            headers:{
                authorization:`Bearer ${admToken}`
            }
        }).then((dados)=>{
            alert(dados.data.message);  
        }).catch((err)=>{
            alert(err.message);
        })
    }

    return (
    <div id='componente-cadastrar-postagem' style={{margin:"0 auto",width:"80%"}}>
        <h2>Criar Postagem
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
        </svg>
        </h2>
    
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

                    <div className="custom-file col-sm-6 col-xs-12">
                        <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={e=> setData({...formData, imagens: e.target.files})} multiple required/>
                        <label className="custom-file-label" for="inputGroupFile01">{!formData.imagens[0] ? 'Coloque imagens' : formData.imagens[0].name }</label>
                    </div>
                
                    <br/>
                    
                    <button onClick={Cadastrar} style={{marginTop:"2%"}} type="submit" className="btn btn-success">Publicar</button>
                </form>
            </div>
        </div>
    </div>);
}

export default CadastrarPostagem;