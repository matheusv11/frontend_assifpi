import React,{useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';
import {cpfMask} from '../../helpers/mask';

//personal_fatura

const Negociamento=()=>{

    const {admToken}=useAuth();
    
    const [cpf,setCpf]=useState('');
    const [valor,setValor]=useState('');
    const [paylink,setPaylink]=useState('');
    const [faturas,setFaturas]=useState([]);

    const handle_faturas= ()=>{

        if(!cpf){
            return alert('Digite um cpf')
        }

        connection.post('/personal_fatura?condicao=consulta', {cpf}, {
            headers:{
                authorization:`Bearer ${admToken}`
            }
        }).then((dados)=>{
            setFaturas(dados.data);
        }).catch((err)=>{
            alert(err.response.data.message)
        })
    }

    const create_payment= ()=>{
        const data= {cpf,valor};

        if(!cpf){
            return alert('Digite um cpf')
        }

        if(!valor){
            return alert('Digite um valor')
        }

        connection.post('/personal_fatura', data, {
            headers:{
                authorization:`Bearer ${admToken}`
            }
        }).then((dados)=>{
            console.log(dados)
            setPaylink(dados.data.body.init_point);
        }).catch((err)=>{
            alert(err)
        })
    }


    return(
    <div id='componente-negociamento' style={{margin:"0 auto",width:"80%"}}>
        <h2>Negociamento de dívidas
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cash-stack" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 3H1a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1h-1z"/>
        <path fill-rule="evenodd" d="M15 5H1v8h14V5zM1 4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H1z"/>
        <path d="M13 5a2 2 0 0 0 2 2V5h-2zM3 5a2 2 0 0 1-2 2V5h2zm10 8a2 2 0 0 1 2-2v2h-2zM3 13a2 2 0 0 0-2-2v2h2zm7-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
        </svg>
        </h2>
        
        <div id="lista" style={{borderWidth: '5px',borderColor:"green",borderStyle:"solid"}}>
            <div id="busca" className="row" style={{margin:"1%"}}>
                <input value={cpf} type="text" onChange={e=> setCpf(cpfMask(e.target.value))} className="form-control col-sm-8 col-xs-12" placeholder='Pesquisar por cpf' />
                <button  onClick={e=>handle_faturas()} className="btn btn-success col-sm-4 col-xs-12">Buscar</button>
            </div>
            
            <ul className="list-group" style={{listStyle: "none"}}>
                {faturas.map(fatura=>(
                    <li style={{margin:"1%"}} className="alert alert-danger">{fatura.data_criacao}-{fatura.data_vencimento}</li>
                ))}
            </ul>

            <div id="boleto" className="row" style={{margin:"1%"}}>
                <input type="number" onChange={e=>setValor(e.target.value)}className="form-control col-sm-8 col-xs-12" placeholder='Valor em Reais(R$)' />
                <button onClick={create_payment} className="btn btn-success col-sm-4 col-xs-12">Emitir boleto</button>
            </div>
            link de pagamento: <h5><a href={paylink} targer="blank">{paylink}</a></h5>
        </div>
    </div>)
}

export default Negociamento;