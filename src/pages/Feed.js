import React,{useEffect,useState} from 'react';
import connection from '../services/connection'
// import {useAuth} from '../components/auth';
import Postagem from '../components/Postagem'
import createPagination from '../helpers/createPagination';
import Navbar from '../components/NavBar'
// import Footer from '../components/footer';

const Feed=()=>{

    // const {token,admToken}= useAuth();
    // const [participa,setParticipa]=useState(false);
    // Talvez usar query na url //Ex site de rotas com hooks
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
        connection.get(`/evento?page=${page}`).then((dados)=>{
            setEventos(dados.data)
            setTotal(dados.headers['total-count']);
            // alert(dados.data.length)
        }).catch((err)=>{
            alert(err)
        })
        // eslint-disable-next-line
    },[page]);

    return(
    <div id="page-feed" >

        <Navbar/>

        <h2 style={{ width: '80%', margin: '0 auto'}}>Eventos e Avisos
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-mailbox" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z"/>
        <path fill-rule="evenodd" d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854z"/>
        <path d="M5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z"/>
        </svg>       
        </h2>
        
            {eventos.map(evento=>(
                    <Postagem evento={evento}/>        
            ))}

        <nav style={{width: '80%', margin: '10px auto', justifyContent:'center', display: 'flex'}} aria-label="...">
    <ul className="pagination">

        <li className={`page-item ${pagination[0]=== page && "disabled"}`} >
        <button onClick={()=> setPage(page-1)} className="page-link"> {"<"} </button>
        </li>

        {pagination.map(pagina => (
          <li
            className={`page-item ${page === pagina && "active"}`}
            onClick={()=> setPage(pagina)}

          >
              <button className="page-link">{pagina}</button>
          </li>
        ))}
        <li className={`page-item ${pagination.reverse()[0]=== page && "disabled"}`} >

        <button onClick={()=> setPage(page+1)} className="page-link" >{">"}</button>

        </li>
    </ul>
    </nav>
  
    {/*<Footer/>*/}
    </div>
        );
}

export default Feed;