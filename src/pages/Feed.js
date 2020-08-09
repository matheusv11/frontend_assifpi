import React,{useEffect,useState} from 'react';
import connection from '../services/connection'
import {useAuth} from '../components/auth';
import Postagem from '../components/Postagem'
import createPagination from '../helpers/createPagination';
import Navbar from '../components/NavBar'


const Feed=()=>{

    const {token,admToken}= useAuth();
    // const [participa,setParticipa]=useState(false);
    // Talvez usar query na url //Ex site de rotas com hooks
    const {setLoading}= useAuth();
    const [eventos,setEventos]=useState([]);
    const [page, setPage]=useState(1);
    const [total,setTotal]=useState('');

    const { pagination } = createPagination({
        numberOfArticles: total,
        articlesPerPage: 5, //Ou eventos.length
        numberOfButtons: 5,
        currentPage: page
      });


    useEffect(()=>{
        setLoading(true)
        connection.get(`/evento?page=${page}`).then((dados)=>{
            setEventos(dados.data)
            setTotal(dados.headers['total-count']);
            setLoading(false)
            // alert(dados.data.length)
            
        }).catch((err)=>{
            alert(err)
            setLoading(false)
        })
    },[page]);

    return(
    <div id="page-feed" >

        <Navbar/>

        <h2 style={{ width: '80%', margin: '0 auto'}}>Eventos e Avisos </h2>
            {eventos.map(evento=>(
                    <Postagem evento={evento}/>        
                
            ))}

        <nav style={{width: '80%', margin: '10px auto', justifyContent:'center', display: 'flex'}} aria-label="...">
    <ul class="pagination">

        <li className={`page-item ${pagination[0]=== page && "disabled"}`} >
        <button onClick={()=> setPage(page-1)} class="page-link"> {"<"} </button>
        </li>

        {pagination.map(pagina => (
          <li
            className={`page-item ${page === pagina && "active"}`}
            onClick={()=> setPage(pagina)}

          >
              <button class="page-link">{pagina}</button>
          </li>
        ))}
        <li className={`page-item ${pagination.reverse()[0]=== page && "disabled"}`} >

        <button onClick={()=> setPage(page+1)} class="page-link" >{">"}</button>

        </li>
    </ul>
    </nav>
    </div>
        );
}

export default Feed;