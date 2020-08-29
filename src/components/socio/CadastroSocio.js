import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import connection from '../../services/connection';

const CadastroSocio= ()=>{

    const [isrg,setIsrg]=useState(true);
    const [accept,setAccept]=useState();
    const[formData,setData]=useState({
        email:'',nome:'',cpf:'',rg:'',cidade:'',
        bairro:'',rua:'',telefones:'',senha:'',
        filiacao:'', autorizacao:'',
        repeat:'',imagem_rg_frente:'',imagem_rg_verso:'',
        cnh:'',imagem_cpf:'',comprovante:''
    })

    const ChangeIsrg=(isrg)=>{
        isrg==true ? isrg=false:isrg=true;
        setIsrg(isrg);
    }

    const Registrar=(e)=>{
        e.preventDefault();
        const {email,nome,cpf,rg,cidade,bairro,rua,filiacao,autorizacao, telefones,senha,repeat, imagem_rg_frente,imagem_rg_verso,cnh, imagem_cpf, comprovante} =formData;
        // const data={email,nome,cpf,rg,endereco: `${cidade},${bairro},${rua}`,telefones,senha}
        const format= new FormData();
        // Object.keys(arquivos).map((itens)=>{
        //     format.append('files', arquivos[itens]);
        // });

        format.append('cnh', cnh);
        format.append('rg', imagem_rg_frente);
        format.append('rg', imagem_rg_verso);
        format.append('cpf_comprovante', imagem_cpf);
        format.append('cpf_comprovante', comprovante);  
        format.append('autorizacao_filiacao', autorizacao);  
        format.append('autorizacao_filiacao', filiacao);  
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
        
        <h2>Cadastre-se como Sócio
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-earmark-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M2 2a2 2 0 0 1 2-2h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm7.5 1.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm2 5.755S12 12 8 12s-5 1.755-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"/>
        </svg>
        </h2>
    
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

                    <h5>Identificação:</h5>
                    <button type="button" className="btn btn-link" onClick={e=>ChangeIsrg(isrg)}>Mudar CNH/RG</button>
                    <div className="row" style={{margin:"1%"}}>

                        {isrg ? 
                        <>
                        <div className="custom-file col-sm-6 col-xs-12">
                        <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"
                        onChange={e=> setData({...formData, imagem_rg_frente: e.target.files[0], cnh: ''})}  required/>
                        <label className="custom-file-label" for="inputGroupFile01">{!formData.imagem_rg_frente ? 'Imagem RG (frente)' : formData.imagem_rg_frente.name }</label>
                        </div>

                        <div className="custom-file col-sm-6 col-xs-12">
                        <input type="file" className="custom-file-input" id="inputGroupFile02" aria-describedby="inputGroupFileAddon04"
                        onChange={e=> setData({...formData, imagem_rg_verso: e.target.files[0], cnh: ''})}  required/>
                        <label className="custom-file-label" for="inputGroupFile02">{!formData.imagem_rg_verso ? 'Imagem RG (verso)' : formData.imagem_rg_verso.name }</label>
                        </div>
                        </>
                        :
                        <>
                        <div className="custom-file col-sm-12 col-xs-12">
                        <input type="file" className="custom-file-input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon04"
                        onChange={e=> setData({...formData, cnh: e.target.files[0], imagem_rg_frente:'', imagem_rg_verso:''})}  required/>
                        <label className="custom-file-label" for="inputGroupFile03">{!formData.cnh ? 'Imagem do CNH (frente)' : formData.cnh.name }</label>
                        </div>
                        </> 
                        }
                        

                    </div>

                    <div className="row" style={{margin:"1%"}}>
                        <div className="custom-file col-sm-6 col-xs-12">
                            <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon01" 
                            onChange={e=> setData({...formData, imagem_cpf: e.target.files[0]})} required/>
                            <label className="custom-file-label" for="inputGroupFile04">{!formData.imagem_cpf ? 'Imagem CPF' : formData.imagem_cpf.name }</label>
                        </div>

                        <div className="custom-file col-sm-6 col-xs-12">
                            <input type="file" className="custom-file-input" id="inputGroupFile05" aria-describedby="inputGroupFileAddon01" 
                            onChange={e=> setData({...formData, comprovante: e.target.files[0]})} required/>
                            <label className="custom-file-label" for="inputGroupFile05">{!formData.comprovante ? 'Compovante Residencia' : formData.comprovante.name }</label>
                        </div>
                    </div>

                    <h5>Documentos para débito automatico:</h5>
                    <div className="row" style={{margin:"1%"}}>
                        <div className="custom-file col-sm-6 col-xs-12">
                            <input type="file" className="custom-file-input" id="inputGroupFile06" aria-describedby="inputGroupFileAddon01"
                            onChange={e=> setData({...formData, autorizacao: e.target.files[0]})}  required/>
                            <label className="custom-file-label" for="inputGroupFile06">{!formData.autorizacao ? 'Autorização Banco do Brasil ou Caixa' : formData.autorizacao.name }</label>
                        </div>   
                        <div className="custom-file col-sm-6 col-xs-12">
                            <input type="file" className="custom-file-input" id="inputGroupFile07" aria-describedby="inputGroupFileAddon01"
                            onChange={e=> setData({...formData, filiacao: e.target.files[0]})}  required/>
                            <label className="custom-file-label" for="inputGroupFile07">{!formData.filiacao ? 'Filição de sócio Banco do Brasil ou Caixa' : formData.filiacao.name }</label>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Links para download de documentos a serem preenchidos:</label>
                        <ul>
                            <li>Autorização Banco do Brasil</li>
                            <li>Autorização Caixa Economica Federal</li>
                            <li>Filiação Banco do Brasil</li>
                            <li>Filiação Caixa Economica Federal</li>
                        </ul>
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