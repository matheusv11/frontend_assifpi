import React,{useState, useEffect} from 'react';
import connection from '../../services/connection';
import {useAuth} from '../auth';

const PerfilSocio=()=>{

    const {token, setToken, setLoading}= useAuth();

    const[socio_data, setSocio]=useState('');

    const [statusCarteira,setStatusCarteira]=useState('')

    const Solicitar= ()=>{
      setLoading(true);
      connection.post('/carteira', '',{
        headers:{
          authorization: `Bearer ${token}`
        }
      }).then((dados)=>{
        setLoading(false)
        alert(dados.data.message)
        setStatusCarteira('solicitada');
      }).catch((err)=>{
        setLoading(false)
        alert(err.response.data.message);
      })
    }

    useEffect(()=>{
        setLoading(true);
        connection.get('/socio', {
          headers:{
            authorization: `Bearer ${token}`
          }
        }).then((dados)=>{
          setLoading(false)
          setSocio(dados.data);
        }).catch((err)=>{
          setLoading(false)
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
            <h2>Página de Perfil </h2>
            
            <div className="card" style={{borderWidth: '5px',borderColor:"green",borderStyle:"solid"}}>
                <div className="card-body">
            
                <h5 className="card-title">Sócio</h5>

                <p><b>Nome: </b> {socio_data.nome} <span className="badge badge-pill badge-success">Sócio</span> </p>


                <p><b>Email: </b>{socio_data.email}</p>

                <p><b>CPF: </b>{socio_data.cpf}</p>

                <p><b>RG: </b>{socio_data.rg}</p>

                <p><b>Endereço: </b>{socio_data.endereco}</p>

                <p><b>Telefones: </b>{socio_data.telefones}</p>

                {!statusCarteira && <button onClick={Solicitar} type="button" className="btn btn-dark" style={{marginLeft: '80px'}}>Solicitar Carteira</button>} 
                {statusCarteira==='solicitada' && <b style={{marginLeft: '80px'}}>Carteira Solicitada</b>}
                {statusCarteira==='confeccionada' && <b style={{marginLeft: '80px'}}>Carteira Confeccionada</b>}
                </div>
            </div>
        </div>
    )
}

export default PerfilSocio;