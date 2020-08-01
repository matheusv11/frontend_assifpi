import React from 'react';
import NavBar from '../components/NavBar';

const Home= ()=>{

    return(
        <div id="home" 
        //style={{width:"90%",margin:"0 auto"}}
        >
            <NavBar/>            
            <header
                className="masthead"
                style={{
                backgroundImage: 'url("assets/index/img/imagem-visao-aeria-assifpi.jpg")',
                width:"90%",
                margin:"0 auto"
                }}
            >
                <div className="overlay" />
                <div className="container">
                <div className="row">
                    <div className="col-md-10 col-lg-8 mx-auto">
                    <div className="site-heading">
                        <h3>Venha para associação dos servidores do IFPI!</h3>
                        <span className="subheading">
                        Junte-se a outros servidores e faça parte da família!
                        </span>
                    </div>
                    </div>
                </div>
                </div>
            </header>
            
            
            
            
            <div className="team-grid">
                <div className="container">
                <div className="intro">
                    <h2 className="text-center">Diretoria</h2>
                </div>
                <div className="row people">
                    <div className="col-md-4 col-lg-3 item">
                    <div
                        className="box"
                        style={{
                        backgroundImage: "url(assets/index/img/foto-perfil-padrao.png)"
                        }}
                    >
                        <div className="cover">
                        <div className="social" />
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <h1>Nome</h1>
                    <h2>Presidente</h2>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <div
                        className="box"
                        style={{
                        backgroundImage: "url(assets/index/img/vice-presidente.jpg)"
                        }}
                    >
                        <div className="cover" />
                    </div>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <h1>Eduilson Carneiro</h1>
                    <h2>Vice-Presidente</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                    <button
                        className="btn btn-primary bg-success"
                        type="button"
                        style={{
                        marginTop: "1%",
                        marginBottom: "1%",
                        backgroundColor: "rgb(30, 126, 52)"
                        }}
                    >
                        Conheça a direção executiva
                    </button>
                    </div>
                </div>
                </div>
            </div>
            <div className="text-center footer-basic">
                <footer>
                <div className="social">
                    <a href="#">
                    <i className="icon ion-social-instagram" />
                    </a>
                    <a href="#">
                    <i className="icon ion-social-snapchat" />
                    </a>
                    <a href="#">
                    <i className="icon ion-social-twitter" />
                    </a>
                    <a href="https://pt-br.facebook.com/assifpi/">
                    <i className="icon ion-social-facebook" />
                    </a>
                </div>
                <h1 style={{ fontSize: 20, color: "rgb(170,170,170)" }}>
                    Rua Elizeu Martins, 1673, 64002-370, Teresina
                </h1>
                <p className="copyright">ASSIFPI © 2020</p>
                </footer>
            </div>
</div>

    
    );
}

export default Home;