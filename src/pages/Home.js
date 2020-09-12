import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/footer';
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
                // width:"90%",
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
                        type="button"  className="btn btn-success" 
                        data-toggle="collapse" data-target="#collapseExample" 
                        aria-expanded="false" aria-controls="collapseExample"
                    >
                        Conheça o quadro de funcionários
                    </button>
                    </div>
                </div>
                {/* mais funcionairos */}
                <div className="collapse" id="collapseExample">
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
                    <h1>Francierc Alves</h1>
                    <h2>1° SECRETÁRIO</h2>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <div
                        className="box"
                        style={{
                        backgroundImage: "url(assets/index/img/foto-perfil-padrao.png)"
                        }}
                    >
                        <div className="cover" />
                    </div>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <h1>Raimunda Nonata</h1>
                    <h2>2° SECRETÁRIO</h2>
                    </div>
                </div>
                <div className="row people">
                    <div className="col-md-4 col-lg-3 item">
                    <div
                        className="box"
                        style={{
                        backgroundImage: "url(assets/index/img/Apolinario.jpg)"
                        }}
                    >
                        <div className="cover">
                        <div className="social" />
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <h1>Apolinário de Lima</h1>
                    <h2>1° TESOUREIRO</h2>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <div
                        className="box"
                        style={{
                        backgroundImage: "url(assets/index/img/foto-perfil-padrao.png"
                        }}
                    >
                        <div className="cover" />
                    </div>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <h1>Rita Martins</h1>
                    <h2>2° TESOUREIRO</h2>
                    </div>
                </div>
                <div className="row people">
                    <div className="col-md-4 col-lg-3 item">
                    <div
                        className="box"
                        style={{
                        backgroundImage: "url(assets/index/img/zilda.jpg)"
                        }}
                    >
                        <div className="cover">
                        <div className="social" />
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <h1>Zilda Brito</h1>
                    <h2>Diretor Social</h2>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <div
                        className="box"
                        style={{
                        backgroundImage: "url(assets/index/img/valdenia.jpg)"
                        }}
                    >
                        <div className="cover" />
                    </div>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <h1>Valdenia Pinto</h1>
                    <h2>Diretor de esportes</h2>
                    </div>
                </div>
                <div className="row people">
                    <div className="col-md-4 col-lg-3 item">
                    <div
                        className="box"
                        style={{
                        backgroundImage: "url(assets/index/img/Elaine.jpg)"
                        }}
                    >
                        <div className="cover">
                        <div className="social" />
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <h1>Elaine Cristina</h1>
                    <h2>Diretor de cultura</h2>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <div
                        className="box"
                        style={{
                        backgroundImage: "url(assets/index/img/Dawslay.jpg)"
                        }}
                    >
                        <div className="cover" />
                    </div>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <h1>Dawsley Carvalho</h1>
                    <h2>Diretor de relações públicas</h2>
                    </div>
                </div>
                <div className="row people">
                    <div className="col-md-4 col-lg-3 item">
                    <div
                        className="box"
                        style={{
                        backgroundImage: "url(assets/index/img/Herivelto.jpg)"
                        }}
                    >
                        <div className="cover">
                        <div className="social" />
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <h1>José Herivelto</h1>
                    <h2>Diretor de patrimônio</h2>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <div
                        className="box"
                        style={{
                        backgroundImage: "url(assets/index/img/Allankout.jpg)"
                        }}
                    >
                        <div className="cover" />
                    </div>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <h1>Allan Kout</h1>
                    <h2>Acessor jurídico</h2>
                    </div>
                </div>
                
                <div className="intro">
                    <h2 className="text-center">Conselho Fiscal</h2>
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
                    <h1>Maria do Amparo</h1>
                    <h2>1° Titular</h2>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <div
                        className="box"
                        style={{
                        backgroundImage: "url(assets/index/img/Daniel.jpg)"
                        }}
                    >
                        <div className="cover" />
                    </div>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <h1>Daniel Ribeiro</h1>
                    <h2>2° Titular</h2>
                    </div>
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
                    <h1>Eraldo Lopes</h1>
                    <h2>3° Titular</h2>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <div
                        className="box"
                        style={{
                        backgroundImage: "url(assets/index/img/Ivanaldo.jpg)"
                        }}
                    >
                        <div className="cover" />
                    </div>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <h1>Ivanaldo Ribeiro</h1>
                    <h2>1° Suplente</h2>
                    </div>
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
                    <h1>Laudenildes Pontes</h1>
                    <h2>2° Suplente</h2>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <div
                        className="box"
                        style={{
                        backgroundImage: "url(assets/index/img/foto-perfil-padrao.png)"
                        }}
                    >
                        <div className="cover" />
                    </div>
                    </div>
                    <div className="col-md-4 col-lg-3 item">
                    <h1>Fernanda da Silva</h1>
                    <h2>3° Suplente</h2>
                    </div>
                    
                    
                </div>
                </div>

                </div>
            </div>
            <hr />
            <Footer/>
</div>

    
    );
}

export default Home;