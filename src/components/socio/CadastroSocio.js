import React, {useState} from 'react';
import connection from '../../services/connection';

const CadastroSocio= ()=>{
    
    const[formData,setData]=useState({
        email:'',nome:'',cpf:'',rg:'',cidade:'',
        bairro:'',rua:'',telefones:'',senha:'',
        repeat:'',imagem_rg:'',imagem_cpf:'',comprovante:''
    })


    const Registrar=(e)=>{
        e.preventDefault();
        const {email,nome,cpf,rg,cidade,bairro,rua,telefones,senha,repeat, imagem_rg, imagem_cpf, comprovante} =formData;
        // const data={email,nome,cpf,rg,endereco: `${cidade},${bairro},${rua}`,telefones,senha}
        const format= new FormData();

        // Object.keys(arquivos).map((itens)=>{
        //     format.append('files', arquivos[itens]);
        // });
        format.append('files', imagem_rg);
        format.append('files', imagem_cpf);
        format.append('files', comprovante);
        format.append('email', email);
        format.append('nome', nome);
        format.append('cpf', cpf);
        format.append('rg', rg);
        format.append('endereco', `${cidade},${bairro},${rua}`);
        format.append('telefones', telefones);
        format.append('senha', senha);

        if(senha !== repeat){
            return alert('Senhas nao compativeis');
        }
        
        connection.post('/socio', format).then((dados)=>{
            alert(dados.data.message);
        }).catch((err)=>{
            alert(err.response.data.message);
        });
    }

    return (
        <div id='componente-cadastro-socio' style={{margin:"0 auto",width:"80%"}}>
        
        <h2>Cadastre-se como Sócio</h2>
    
        <div class="card" style={{borderWidth: '5px',borderColor:"green"}}>
            <div class="card-body">
                <form onSubmit={Registrar}>
                    <div class="form-group">
                    <label>Email:</label>
                    <input onChange={e=> setData({...formData, email: e.target.value})} type="email" class="form-control" id="" required/>
                    </div>
            
                    <div class="form-group">
                        <label>Nome Completo:</label>
                        <input onChange={e=> setData({...formData, nome: e.target.value})} type="text" class="form-control" id="" required/>
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
                        <div class="form-group col-sm-6 col-xs-12">
                            <label>Senha:</label>
                            <input onChange={e=> setData({...formData, senha: e.target.value})} type="password" class="form-control" id="" required/>
                        </div>
                
                        <div class="form-group col-sm-6 col-xs-12">
                            <label>Confirmar Senha:</label>
                            <input onChange={e=> setData({...formData, repeat: e.target.value})} type="password" class="form-control" id="" required/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-sm-4 col-xs-12">
                            <label>IMAGEM RG:</label>
                            <input onChange={e=> setData({...formData, imagem_rg: e.target.files[0]})} type="file" id=""  required/>
                        </div>

                        <div class="form-group col-sm-4 col-xs-12">
                            <label>IMAGEM CPF:</label>
                            <input onChange={e=> setData({...formData, imagem_cpf: e.target.files[0]})} type="file" id=""  required/>
                        </div>

                        <div class="form-group col-sm-4 col-xs-12">
                            <label>IMAGEM COMPROVANTE DE ENDEREÇO:</label>
                            <input onChange={e=> setData({...formData, comprovante: e.target.files[0]})} type="file" id=""  required/>
                        </div>
                    </div>
                    
                    <button onClick={Registrar} type="submit" class="btn btn-success">Cadastrar</button>
                </form>
            </div>
        </div>

        </div>
    );
}

export default CadastroSocio;