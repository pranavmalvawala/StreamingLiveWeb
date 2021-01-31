import React from "react";

export const Header: React.FC = () => {
    return (
        <>
            <div id="navbar" className="fixed-top">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-lg-2-5"><a className="navbar-brand" href="/"><img src="/images/logo-nav.png" alt="logo" /></a></div>
                    </div>
                </div>
            </div>
            <div id="navSpacer" ></div>
        </>
    );
}
