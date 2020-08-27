import React,{useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';

const CadastrarDependentes=()=>{
    
    const {token}= useAuth();

    const[formData,setData]=useState({
        nome:'', email:'', cpf:'', rg:'', cidade:'',
        bairro:'',rua:'', telefones:'',imagem_rg:'',
        imagem_cpf:'',comprovante:''
    })

    const Cadastrar= (e)=>{
        e.preventDefault();
        const {imagem_rg,imagem_cpf,comprovante,bairro,cidade,rua,cpf,email,nome,rg,telefones}= formData;
        
        const format= new FormData();

        format.append('files', imagem_rg);
        format.append('files', imagem_cpf);
        format.append('files', comprovante);
        format.append('email', email);
        format.append('nome', nome);
        format.append('cpf', cpf);
        format.append('rg', rg);
        format.append('endereco', `${cidade},${bairro},${rua}`);
        format.append('telefones', telefones);

        connection.post('/dependente', format, {
            headers:{
                authorization: `Bearer ${token}`
            }
        }).then((dados)=>{
            alert(dados.data.message);
        }).catch((err)=>{
            alert(err.response.data.message);
        });
        
    }   

    return (
        <div id='cadastrar-dependentes' style={{margin:"0 auto",width:"80%"}}>

            
            <h2 >Cadastre o dependente</h2>
    
            <div className="card" style={{ borderWidth: '5px',borderColor:"green"}}>
                <div className="card-body">
                    <form onSubmit={Cadastrar}>
       
                        <div className="form-group">
                            <label>Nome Completo:</label>
                            <input onChange={e=> setData({...formData, nome: e.target.value})} type="text" className="form-control" id="" required/>
                        </div>
                        
                        <div className="form-group">
                        <label>Email:</label>
                        <input onChange={e=> setData({...formData, email: e.target.value})} type="email" className="form-control" id="" required/>
                        </div>

                        <div className="row">
                            <div className="form-group col-sm-6 col-xs-12">
                                <label>CPF:</label>
                                <input onChange={e=> setData({...formData, cpf: e.target.value})} type="number" className="form-control" id="" required/>
                            </div>
                    
                            <div className="form-group col-sm-6 col-xs-12">
                                <label>RG:</label>
                                <input onChange={e=> setData({...formData, rg: e.target.value})} type="number" className="form-control" id="" required/>
                            </div>
                        </div>
                
                        <div className="row">
                            <div className="form-group col-sm-4 col-xs-12">
                                <label>Cidade:</label>
                                <input onChange={e=> setData({...formData, cidade: e.target.value})} type="text" className="form-control" id="" required/>
                            </div>
                    
                            <div className="form-group col-sm-4 col-xs-12">
                                <label>Bairro:</label>
                                <input onChange={e=> setData({...formData, bairro: e.target.value})} type="text" className="form-control" id="" required/>
                            </div>
                    
                            <div className="form-group col-sm-4 col-xs-12">
                                <label>Rua e número:</label>
                                <input onChange={e=> setData({...formData, rua: e.target.value})} type="text" className="form-control" id="" required/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Telefones:</label>
                            <textarea onChange={e=> setData({...formData, telefones: e.target.value})} className="form-control" required></textarea>
                        </div>

                        {/* Old input files

                        <div className="row">
                            <div className="form-group col-sm-4 col-xs-12">
                                <label>Foto RG:</label>
                                <input onChange={e=> setData({...formData, imagem_rg: e.target.files[0]})} type='file'/>
                            </div>

                            <div className="form-group col-sm-4 col-xs-12">
                                <label>Foto CPF:</label>
                                <input onChange={e=> setData({...formData, imagem_cpf: e.target.files[0]})} type='file'/>
                            </div>

                            <div className="form-group col-sm-4 col-xs-12">
                                <label>Foto Comprovante de Parentesco:</label>
                                <input onChange={e=> setData({...formData, comprovante: e.target.files[0]})} type='file'/>
                            </div>
                        </div>
                        
                        */}
                        

                        <div className="row" style={{margin:"1%"}}>
                            <div className="custom-file col-sm-6 col-xs-12">
                                <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"
                                onChange={e=> setData({...formData, imagem_rg: e.target.files[0]})}  required/>
                                <label className="custom-file-label" for="inputGroupFile01">{!formData.imagem_rg ? 'Imagem RG ou CNH (frente)' : formData.imagem_rg.name }</label>
                            </div>

                            <div className="custom-file col-sm-6 col-xs-12">
                                <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04"
                                onChange={e=> setData()}  required/>
                                <label className="custom-file-label" for="inputGroupFile04">{!formData.imagem_rg ? 'Imagem RG ou CNH (verso)' : formData.imagem_rg.name }</label>
                            </div>
                        </div>
                        <div className="row" style={{margin:"1%"}}>
                            <div className="custom-file col-sm-6 col-xs-12">
                                <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04"
                                onChange={e=> setData({...formData, imagem_cpf: e.target.files[0]})}  required/>
                                <label className="custom-file-label" for="inputGroupFile04">{!formData.imagem_cpf ? 'Imagem CPF' : formData.imagem_rg.name }</label>
                            </div>
                            <div className="custom-file col-sm-6 col-xs-12">
                                <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04"
                                onChange={e=> setData({...formData, comprovante: e.target.files[0]})}  required/>
                                <label className="custom-file-label" for="inputGroupFile04">{!formData.comprovante ? 'Imagem comprovante de parentesco' : formData.imagem_rg.name }</label>
                            </div>
                        </div>
                        
                        <button onSubmit={Cadastrar} type="submit" className="btn btn-success">Cadastrar</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default CadastrarDependentes;