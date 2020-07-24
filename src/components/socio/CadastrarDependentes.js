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
    
            <div class="card" style={{ borderWidth: '5px',borderColor:"green"}}>
                <div class="card-body">
                    <form onSubmit={Cadastrar}>
       
                        <div class="form-group">
                            <label>Nome Completo:</label>
                            <input onChange={e=> setData({...formData, nome: e.target.value})} type="text" class="form-control" id="" required/>
                        </div>
                        
                        <div class="form-group">
                        <label>Email:</label>
                        <input onChange={e=> setData({...formData, email: e.target.value})} type="email" class="form-control" id="" required/>
                        </div>

                        <div class="row">
                            <div class="form-group col-sm-6 col-xs-12">
                                <label>CPF:</label>
                                <input onChange={e=> setData({...formData, cpf: e.target.value})} type="number" class="form-control" id="" required/>
                            </div>
                    
                            <div class="form-group col-sm-6 col-xs-12">
                                <label>RG:</label>
                                <input onChange={e=> setData({...formData, rg: e.target.value})} type="number" class="form-control" id="" required/>
                            </div>
                        </div>
                
                        <div class="row">
                            <div class="form-group col-sm-4 col-xs-12">
                                <label>Cidade:</label>
                                <input onChange={e=> setData({...formData, cidade: e.target.value})} type="text" class="form-control" id="" required/>
                            </div>
                    
                            <div class="form-group col-sm-4 col-xs-12">
                                <label>Bairro:</label>
                                <input onChange={e=> setData({...formData, bairro: e.target.value})} type="text" class="form-control" id="" required/>
                            </div>
                    
                            <div class="form-group col-sm-4 col-xs-12">
                                <label>Rua e número:</label>
                                <input onChange={e=> setData({...formData, rua: e.target.value})} type="text" class="form-control" id="" required/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Telefones:</label>
                            <textarea onChange={e=> setData({...formData, telefones: e.target.value})} class="form-control" required></textarea>
                        </div>

                        <div class="row">
                            <div class="form-group col-sm-4 col-xs-12">
                                <label>Foto RG:</label>
                                <input onChange={e=> setData({...formData, imagem_rg: e.target.files[0]})} type='file'/>
                            </div>

                            <div class="form-group col-sm-4 col-xs-12">
                                <label>Foto CPF:</label>
                                <input onChange={e=> setData({...formData, imagem_cpf: e.target.files[0]})} type='file'/>
                            </div>

                            <div class="form-group col-sm-4 col-xs-12">
                                <label>Foto Comprovante de Endereço:</label>
                                <input onChange={e=> setData({...formData, comprovante: e.target.files[0]})} type='file'/>
                            </div>
                        </div>
                        
                        <button onSubmit={Cadastrar} type="submit" class="btn btn-success">Cadastrar</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default CadastrarDependentes;