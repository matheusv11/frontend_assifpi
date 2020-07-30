import React from 'react';
import {Link} from 'react-router-dom'


const Termos=()=>{

    return(
    <div id='termosdeuso' style={{margin:"0 auto",width:"70%"}}>
        <h2>Termos de condições e de uso</h2>
        <div class="card" style={{borderWidth: '5px',borderColor:"green",borderStyle:"solid"}}>
            <div class="card-body">
                <p>Ao se cadastrar você concorda estar ciente de que:</p>
                <p>1.O sistema guardará informações fornecidas por você atravês dos formulários em seus bancos de dados.</p>
                <p>2.Para sua segurança sua senha será criptografada em nosso banco de dados o que implica que ela não poderá ser recuperada em caso de esquecimento por sua parte!</p>
                <p>3.Serei cobrado mensalmente no valor de R$ 00,00 disponível para para pagamentos no campo de "Pagamentos" atravês da API do Mercado Pago.</p>
                <Link to="/acesso" style={{color:"blue"}}>Voltar</Link>
            </div>
        </div>
    </div>
    );
}

export default Termos;