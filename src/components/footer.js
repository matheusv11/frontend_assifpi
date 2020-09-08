import React from 'react';

const Footer=()=>{
    return(
    <div className="text-center footer-basic">
        <footer>
        <div className="social">
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
        </div>
        <h1 style={{ fontSize: 20, color: "rgb(170,170,170)" }}>
            Rua Elizeu Martins, 1673, 64002-370, Teresina
        </h1>
        <p>Créditos:...</p>
        <p className="copyright">ASSIFPI © 2020</p>

        </footer>
    </div>
);
}

export default Footer;