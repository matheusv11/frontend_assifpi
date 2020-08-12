import React from 'react'

const Feed=()=>{

    return(
        <div id='componente-feed'>
            <h1  style={{marginLeft: '20%'}}>Eventos e Avisos </h1>
    
            <div className="card"  style={{width: '800px', marginLeft: '20%', marginTop: '10px', borderWidth: '15px'}}>
                <div className="card-body">
            
                <h3><b>Palestra sobre EAD</b></h3>
                
                <p>O Ensino a Distância (conhecido também como EAD) é uma nova alternativa de ensino que as pessoas têm encontrado para adquirir seu diploma - com horários e turnos de estudo flexíveis - e desta forma conquistar um bom emprego ou subir de cargo dentro de uma organização. O que levou à ascensão desta modalidade de Ensino foi a evolução tecnológica.

                    A relação entre aluno e professor ocorre com a ajuda de ferramentas online, que são disponibilizadas no portal da Instituição de EAD escolhida.
                    
                    Com o EAD os caminhos entre o aluno e o diploma foram reduzidos, facilitando a vida daqueles que almejam o crescimento profissional, ou mesmo o reposicionamento na carreira.
                    </p>
                <p><b>Data: </b>19/03/2002</p>

                <p><b>Hora: </b>8:30</p>

                <p><b>Local: </b>IFPI-Teresina central predio C</p>

                <button type="button" className="btn btn-outline-primary">Confirmar presença</button>
                <button type="button" className="btn btn-outline-danger">Tirar presença</button>
                <button type="button" className="btn btn-outline-warning">Vizualizar Confirmados</button>

                </div>

            </div>

            <div className="card"  style={{width: '800px', marginLeft: '20%', marginTop: '10px', borderWidth: '15px'}}>
                <div className="card-body">
            
                <h3><b>AVISO SAUDE PUBLICA</b></h3>
                
                <p> O MINISTÉRIO DA SAÚDE,
                    no exercício de suas atribuições legais, 
                    notadamente aquelas expressas no art. 1º, 
                    do anexo I, do Decreto nº 9.795, de 17 de maio
                    de 2019, bem como no art. 1º da Lei nº 1.920 de 
                    25 de julho de 1953, e Considerando que em 11 de
                    março de 2020, devido ao aumento na disseminação
                    global do novo Coronavírus (SARS-CoV-2), foi d
                    ecretada Pandemia de COVID-19 pela Organização Mundi
                    al da Saúde (OMS). Considerando a Lei n° 13.979, de 06 de fevereiro de 2020,
                    </p>
                <p><b>Data: </b>--</p>

                <p><b>Hora: </b>--</p>

                <p><b>Local: </b>--</p>

                </div>

            </div>


            <nav style={{marginLeft: '20%'}}>
                <ul className="pagination">
                <li className="page-item"><a className="page-link" href="/">Previous</a></li>
                <li className="page-item"><a className="page-link" href="/">1</a></li>
                <li className="page-item"><a className="page-link" href="/">2</a></li>
                <li className="page-item"><a className="page-link" href="/">3</a></li>
                <li className="page-item"><a className="page-link" href="/">Next</a></li>
                </ul>
            </nav>
        </div>
    );

}

export default Feed;