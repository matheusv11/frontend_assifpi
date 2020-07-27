import React from 'react';


const Gastos=()=>{

    return (
        <div id="componente-gastos" style={{margin:"0 auto",width:"90%"}}>
            <h2>Gastos</h2>
            <div class="card" style={{borderWidth: '5px',borderColor:"green"}}>
                <div class="card-body">
                    
                    <button class="btn btn-success" style={{margin:"0 auto",marginBottom:"2%"}} 
                    type="button"  class="btn btn-success" 
                    data-toggle="collapse" data-target="#collapseExample" 
                    aria-expanded="false" aria-controls="collapseExample">Cadastrar novo gasto</button>

                    <div class="collapse" id="collapseExample" style={{marginBottom:"2%",borderWidth: '5px',borderColor:"green",borderStyle:"solid"}}> 
                        <div class="card card-body">

                            <div class="form-group">
                                <label >Gasto:</label>
                                <input class="form-control" />
                            </div>
                        

                            <div class="row">
                                <div class="form-group col-sm-6 col-xs-12">
                                    <label >Valor:</label>
                                    <input type="number" class="form-control" />
                                </div>

                                <div class="form-group col-sm-6 col-xs-12">
                                    <label >Data:</label>
                                    <input type="date" class="form-control" />
                                </div>

                            </div>

                            <button class="btn btn-success">Cadastrar</button>

                        </div>
                    </div>
                    
                    <div id="listagastos" >
                        <ul class="list-group">
                            <li class="list-group-item list-group-item-warning">A simple warning list group item <button class="btn btn-outline-danger">Deletar</button></li>
                            <li class="list-group-item list-group-item-warning">A simple warning list group item <button class="btn btn-outline-danger">Deletar</button></li>
                            <li class="list-group-item list-group-item-warning">A simple warning list group item <button class="btn btn-outline-danger">Deletar</button></li>
                            <li class="list-group-item list-group-item-warning">A simple warning list group item <button class="btn btn-outline-danger">Deletar</button></li>
                            <li class="list-group-item list-group-item-warning">A simple warning list group item <button class="btn btn-outline-danger">Deletar</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gastos;