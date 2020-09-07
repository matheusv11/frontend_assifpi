import React,{useState, useEffect} from 'react';
import connection from '../../services/connection';
import {useAuth} from '../auth';

const PerfilSocio=()=>{

    const {token, setToken}= useAuth();
    const[socio_data, setSocio]=useState('');
    const [statusCarteira,setStatusCarteira]=useState('');

    const Solicitar= ()=>{
      if(window.confirm("Você realmente deseja solicitar? Caso sim irá ser requisitada sua carteira."))
      connection.post('/carteira', '',{
        headers:{
          authorization: `Bearer ${token}`
        }
      }).then((dados)=>{
        alert(dados.data.message)
        setStatusCarteira('solicitada');
      }).catch((err)=>{
        alert(err.response.data.message);
      })
    }

    useEffect(()=>{
        connection.get('/socio', {
          headers:{
            authorization: `Bearer ${token}`
          }
        }).then((dados)=>{
          setSocio(dados.data);
        }).catch((err)=>{
          setToken(null)
          localStorage.removeItem('token');
          alert(err.message)
        });
        // eslint-disable-next-line
    },[]);
    
    useEffect(()=>{
      connection.get('/index_carteira_socio', {
        headers:{
          authorization: `Bearer ${token}`
        }
      }).then((dados)=>{
        setStatusCarteira(dados.data.status);
      }).catch((err)=>{
        // setToken(null)
        // localStorage.removeItem('token');
        alert(err.message)
      });

  },[token,setToken]);
      
    return(
        <div id='componente-perfil-socio' style={{width:"90%",margin:"0 auto"}}>
            <h2>Página de Perfil 
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z"/>
            </svg> 
            </h2>
            
            <div className="card" style={{borderWidth: '5px',borderColor:"green",borderStyle:"solid"}}>
                <div className="card-body">
            
                {/* <img src="assets/profilepic.png" alt="..." class="img-thumbnail"></img> */}
                {/* https://www.freepngimg.com/thumb/youtube/62644-profile-account-google-icons-computer-user-iconfinder-thumb.png */}
                <p><b>Nome: </b> {socio_data.nome} <span className="badge badge-pill badge-success">Sócio</span> </p>


                <p><b>Email: </b>{socio_data.email}</p>

                <p><b>CPF: </b>{socio_data.cpf}</p>

                <p><b>RG: </b>{socio_data.rg}</p>

                <p><b>Endereço: </b>{socio_data.endereco}</p>

                <p><b>Telefones: </b>{socio_data.telefones}</p>

                {!statusCarteira && <button onClick={Solicitar} type="button" className="btn btn-dark" style={{margin:"0 auto"}}>Solicitar Carteira</button>} 
                {statusCarteira==='solicitada' && <b style={{margin:"0 auto"}}>Carteira Solicitada</b>}
                {statusCarteira==='confeccionada' && <b style={{margin:"0 auto"}}>Carteira Confeccionada</b>}
                </div>
            </div>
        </div>
    )
}

export default PerfilSocio;