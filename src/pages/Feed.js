import React,{useEffect,useState} from 'react';
import connection from '../services/connection'
import {useAuth} from '../components/auth';
import Postagem from '../components/Postagem'

const Feed=()=>{

    const {token,admToken}= useAuth();
    const [eventos,setEventos]=useState([]);

    const [participa,setParticipa]=useState(false);

    useEffect(()=>{
        connection.get('/evento').then((dados)=>{
            console.log(dados.data)
            setEventos(dados.data)
        }).catch((err)=>{
            console.log(err)
        })
        console.log(admToken);
    },[]);

    


    return(
    <div id="page-feed" >
        <h2 style={{ width: '80%', margin: '0 auto'}}>Eventos e Avisos </h2>
        
            {eventos.map(evento=>(
                    <Postagem evento={evento}/>        
            ))}

    <nav style={{width: '80%', margin: '0 auto'}}>
        <ul class="pagination">
        <li class="page-item"><a class="page-link" href="/">Previous</a></li>
        <li class="page-item"><a class="page-link" href="/">1</a></li>
        <li class="page-item"><a class="page-link" href="/">2</a></li>
        <li class="page-item"><a class="page-link" href="/">3</a></li>
        <li class="page-item"><a class="page-link" href="/">Next</a></li>
        </ul>
    </nav>
    </div>
        );
}

export default Feed;