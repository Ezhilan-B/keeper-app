import React from 'react';

function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer>
            <p>Copyright <span>&#169;</span> {year}</p>
        </footer>
    );
}

export default Footer;