import React from 'react'
import NavBar from '../components/NavBar';
import Footer from '../components/footer';

const Sobre=()=>{

    return(
    <div id="page-sobre">
        
            <NavBar/>
            
            <header
                className="masthead"
                style={{ backgroundImage: 'url("assets/sobre/img/logocolor.png")',
                // width:"90%",
                margin:"0 auto" }}
            >
                <div className="overlay" />
                <div className="container">
                <div className="row">
                    <div className="col-md-10 col-lg-8 mx-auto">
                    <div className="site-heading">
                        <h2>Quem somos?</h2>
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
            <Footer/>
            

    </div>
    )
}


export default Sobre;