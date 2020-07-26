import React from 'react'
import {Link} from 'react-router-dom';

const Sobre=()=>{

    return(
    <div id="page-sobre">
        
        <nav className="navbar navbar-light navbar-expand-lg fixed-top" id="mainNav">
                <div className="container">
                <a className="navbar-brand" href="/">
                <img src="assets/sobre/img/logocolor.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy"/>
                    ASSIFPI
                </a>
                <button
                    data-toggle="collapse"
                    data-target="#navbarResponsive"
                    className="navbar-toggler"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fa fa-bars" />
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item" role="presentation">
                        <Link to="/" className="nav-link">
                        Home
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/feed" class="nav-item">
                            Notícias
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/convenios" class="nav-item">
                            Convênios
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/sobre" class="nav-item">
                            Sobre
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/acesso" class="nav-item">
                        Área do associado
                        </Link>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
            <header
                className="masthead"
                style={{ backgroundImage: 'url("assets/sobre/img/logocolor.png")' }}
            >
                <div className="overlay" />
                <div className="container">
                <div className="row">
                    <div className="col-md-10 col-lg-8 mx-auto">
                    <div className="site-heading">
                        <h1>Quem somos?</h1>
                        <span className="subheading">
                        Veja nossa história, missão e mais
                        </span>
                    </div>
                    </div>
                </div>
                </div>
            </header>
            <div className="container">
                <div className="row">
                <div className="col-md-10 col-lg-8 mx-auto">
                    <h1 className="text-center">História</h1>
                    <p>
                    Associação dos Servidores do Instituto Federal de Educação, Ciência e
                    Tecnologia do Piauí, sucessora da ASCEFET, fundada em 20 de setembro
                    de 1979, pelos servidores da antiga Escola Técnica Federal do Piauí. A
                    ASSIFPI tem por finalidade.
                    </p>
                </div>
                </div>
                <div className="row">
                <div className="col-md-10 col-lg-8 mx-auto">
                    <h1 className="text-center">Missão</h1>
                    <p>
                    Difundir a prática de desportos e culturas entre sócios e a
                    comunidade.
                    </p>
                    <p>
                    Filiar-se as federações desportivas e culturais e representativas da
                    classe.
                    </p>
                    <p>
                    firmar, sem ônus para a Associação, contratos de prestação de serviços
                    com entidades médicos hospitalares, de seguros, fornecedores de
                    gêneros alimentícios ou de medicamentos ou outros que visem ao
                    favorecimento dos associados.
                    </p>
                </div>
                </div>
            </div>
            <hr />
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
                <ul className="list-inline">
                    <li className="list-inline-item">
                    <a href="index.html">Home</a>
                    </li>
                    <li className="list-inline-item">
                    <a href="noticias.html">Notícias</a>
                    </li>
                    <li className="list-inline-item">
                    <a href="convenios.html">Convênios</a>
                    </li>
                    <li className="list-inline-item">
                    <a href="sobre.html">Sobre</a>
                    </li>
                    <li className="list-inline-item">
                    <a href="contato.html">Contato</a>
                    </li>
                    <li className="list-inline-item" />
                </ul>
                <h1 style={{ fontSize: 20, color: "rgb(170,170,170)" }}>
                    Rua Elizeu Martins, 1673, 64002-370, Teresina
                </h1>
                <p className="copyright">ASSIFPI © 2020</p>
                </footer>
            </div>
            

    </div>
    )
}


export default Sobre;