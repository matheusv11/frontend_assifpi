import React from 'react';


const Agenda=()=>{

    return(
    <div id="pagina-agenda" style={{margin:"0 auto",width:"80%"}}>
        <h2>Agenda</h2>
        <div id="cadastrar-convenio">
            <button type="button"  className="btn btn-success" 
            data-toggle="collapse" data-target="#collapseExample" 
            aria-expanded="false" aria-controls="collapseExample" style={{margin:"1%"}}>Solicitar</button>


            <div className="collapse" id="collapseExample" style={{margin:"1%"}}>
                    <div className="card card-body">
                    <form onSubmit="">
                        <div className="form-group">
                            <label>Local:</label>
                            <input onChange=""  className="form-control"/>
                        </div>
                        <div class="row">
                            <div className="form-group col-sm-4 col-xs-12">
                                <label>Data:</label>
                                <input onChange="" type="date" className="form-control" id="" />
                            </div>
                            <div className="form-group col-sm-4 col-xs-12">
                                <label>Hora de início:</label>
                                <input onChange="" type="time" className="form-control" id="" />
                            </div>
                            <div className="form-group col-sm-4 col-xs-12">
                                <label>Hora de finalização:</label>
                                <input onChange="" type="time" className="form-control" id="" />
                            </div>
                        </div>
                        <button onClick="" type="submit" className="btn btn-success">Solicitar</button>
                    </form>
                    </div>
            </div>

        </div>

        <div className="card" style={{borderWidth: '5px',borderColor:"green"}}> 
            <ul className="list-group" style={{listStyle: "none"}}>
                <li className="alert alert-success" style={{margin:"1%"}}>
                    <p><b>Solicitate:</b>Jose Maria</p>
                    <p><b>CPF:</b>06531145321</p>
                    <p><b>Local:</b>Clube Principal</p>
                    <p><b>Data:</b>19/02/2020</p>
                    <p><b>Hora:</b>10:00-15:00</p>
                    <p><b>Pedido:</b>Aprovado</p>
                    <button type="button" class="btn btn-success">Aprovar</button>
                    <button type="button" class="btn btn-danger">Excluir</button>
                </li>
                <li className="alert alert-warning" style={{margin:"1%"}}>
                <p>
                    <b>Solicitate:</b>Maria Marta</p>
                    <p><b>CPF:</b>06531145320</p>
                    <p><b>Local:</b>Clube Principal</p>
                    <p><b>Data:</b>19/02/2020</p>
                    <p><b>Hora:</b>16:00-20:00</p>
                    <p><b>Pedido:</b>Aguardando avaliação</p>
                    <button type="button" class="btn btn-success">Aprovar</button>
                    <button type="button" class="btn btn-danger">Excluir</button>
                </li>
            </ul>
        </div>
    </div>
    );
}

export default Agenda;