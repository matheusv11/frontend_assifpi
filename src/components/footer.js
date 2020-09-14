import React from 'react';

const Footer=()=>{
    return(
    <div className="text-center "> {/* class removed footer-basic*/}
        <footer className="bg-dark">
        <div className="row">
            <div className="col">
                <div className="text-white">
                <h1 style={{ fontSize: 20, color: "rgb(170,170,170)" }}>
                    Rua Elizeu Martins, 1673, 64002-370, Teresina
                </h1>
                <a className="text-white" href="https://pt-br.facebook.com/assifpi/">Fecebook</a>
                {/* <div className="social">
                    <a href="/#">
                    <i className="icon ion-social-instagram" />
                    </a>
                    <a href="/#">
                    <i className="icon ion-social-snapchat" />
                    </a>
                    <a href="/#">
                    <i className="icon ion-social-twitter" />
                    </a>
                    <a href="https://pt-br.facebook.com/assifpi/" target="blank">
                    <i className="icon ion-social-facebook" />
                    </a>
                </div> */}

                <p className="copyright">ASSIFPI © 2020</p>
                </div>
            </div>

            <div className="col">
                <div className="text-white">
                <h1 style={{ fontSize: 18, color: "rgb(170,170,170)" }}>
                    Crédtios de desenvolvimento
                </h1>
                <p style={{ fontSize: 17, color: "rgb(170,170,170)" }}>Mathes Sales Torres</p>
                <p style={{ fontSize: 17, color: "rgb(170,170,170)" }}>Alexânder Araujo Reis</p>
                </div>  
            </div>
        </div>

        </footer>
    </div>
);
}

export default Footer;
//"rgb(170,170,170)"