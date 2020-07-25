import React from 'react';

const PainelFinanceiro=()=>{
    
    return (
    <div id='componente-painel-financeiro' style={{margin:"0 auto",width:"80%"}}>
        <h2>Painel Financeiro</h2>
    
        <div class="card" style={{borderWidth: '5px',borderColor:"green"}}>
            <div class="card-body">
                <button type="button"  class="btn btn-success" 
                data-toggle="collapse" data-target="#collapseExample" 
                aria-expanded="false" aria-controls="collapseExample">VIZUALIZAR PENDENTES</button>

                <div class="collapse" id="collapseExample">
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-danger">A simple danger list group item</li>   
                    </ul>              
                </div>

                <div>
                    mais informações
                </div>
            
            </div>
        </div>
    </div>
    );
}

export default PainelFinanceiro;