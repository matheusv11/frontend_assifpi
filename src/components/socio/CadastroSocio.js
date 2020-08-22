import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import connection from '../../services/connection';

const CadastroSocio= ()=>{

    const [accept,setAccept]=useState();
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
        <div id='componente-cadastro-socio' className="col-sm-10 col-xs-12" style={{margin:"0 auto"}}>
        
        <h2>Cadastre-se como Sócio</h2>
    
        <div className="card" style={{borderWidth: '5px',borderColor:"green"}}>
            <div className="card-body">
                <form onSubmit={Registrar}>
                    <div className="row">
                        <div className="form-group col-sm-6 col-xs-12">
                            <label>Nome Completo:</label>
                            <input onChange={e=> setData({...formData, nome: e.target.value})} type="text" className="form-control" id="" required/>
                        </div>
                        
                        <div className="form-group col-sm-6 col-xs-12">
                            <label>Email:</label>
                            <input onChange={e=> setData({...formData, email: e.target.value})} type="email" className="form-control" id="" required/>
                        </div>
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
                    
                    <div className="row">
                        <div className="form-group col-sm-6 col-xs-12">
                            <label>Senha:</label>
                            <input onChange={e=> setData({...formData, senha: e.target.value})} type="password" className="form-control" id="" required/>
                        </div>
                
                        <div className="form-group col-sm-6 col-xs-12">
                            <label>Confirmar Senha:</label>
                            <input onChange={e=> setData({...formData, repeat: e.target.value})} type="password" className="form-control" id="" required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="custom-file col-sm-4 col-xs-12">
                            <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"
                            onChange={e=> setData({...formData, imagem_rg: e.target.files[0]})}  required/>
                            <label className="custom-file-label" for="inputGroupFile01">{!formData.imagem_rg ? 'Imagem RG' : formData.imagem_rg.name }</label>
                        </div>


                        <div className="custom-file col-sm-4 col-xs-12">
                            <input type="file" className="custom-file-input" id="inputGroupFile02" aria-describedby="inputGroupFileAddon01" 
                            onChange={e=> setData({...formData, imagem_cpf: e.target.files[0]})} required/>
                            <label className="custom-file-label" for="inputGroupFile02">{!formData.imagem_cpf ? 'Imagem CPF' : formData.imagem_cpf.name }</label>
                        </div>

                        <div className="custom-file col-sm-4 col-xs-12">
                            <input type="file" className="custom-file-input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon01" 
                            onChange={e=> setData({...formData, comprovante: e.target.files[0]})} required/>
                            <label className="custom-file-label" for="inputGroupFile03">{!formData.comprovante ? 'Compovante Residencia' : formData.comprovante.name }</label>
                        </div>
                    </div>
                    
                    <div className="form-group form-check" style={{marginTop:"2%"}} >
                        <input type="radio" className="form-check-input" onChange={e=>setAccept(e.target.value)} />
                        <label className="form-check-label" for="exampleCheck1">Ao me cadastrar eu concordo com os <Link to="/termosdeuso" style={{color:"blue"}}>Termos e Condições de uso</Link></label>
                    </div>

                    {!accept && <button onClick={Registrar} type="submit" className="btn btn-success" disabled>Cadastrar</button>}
                    {accept==='on' && <button onClick={Registrar} type="submit" className="btn btn-success">Cadastrar</button>}
                </form>
            </div>
        </div>

        </div>
    );
}

export default CadastroSocio;