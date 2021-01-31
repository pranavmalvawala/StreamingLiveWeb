import React from "react";
import UserContext from "./UserContext";
import { LoginPage } from "./appBase/pageComponents/LoginPage";
import { SelectChurchModal } from "./components";
import { ApiHelper, UserHelper } from "./utils"

export const Login: React.FC = (props: any) => {

    const [modalShow, setModalShow] = React.useState(false);
    const [churches, setChurches] = React.useState([]);

    const getCookieValue = (a: string) => {
        var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    };

    const successCallback = () => {
        setChurches(UserHelper.churches);
        setModalShow(true);
        console.log(ApiHelper.apiConfigs);
    }

    const context = React.useContext(UserContext);

    let search = new URLSearchParams(props.location?.search);
    var jwt = search.get("jwt") || getCookieValue("jwt");
    let auth = search.get("auth");
    if (jwt === undefined || jwt === null) jwt = "";
    if (auth === undefined || auth === null) auth = "";

    const getModal = () => {
        console.log(churches);
        if (churches.length > 0) return (<SelectChurchModal show={modalShow} onHide={() => setModalShow(false)} churchs={churches} />)
        else return null;
    }

    return (
        <>
            <LoginPage auth={auth} context={context} jwt={jwt} successCallback={successCallback} />
            { getModal()}
        </>
    );

};
