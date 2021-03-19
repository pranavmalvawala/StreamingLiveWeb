import React from "react";
import UserContext from "./UserContext";
import { LoginPage } from "./appBase/pageComponents/LoginPage";
import { SelectChurchModal, ChurchInterface } from "./components";
import { ApiHelper, UserHelper, EnvironmentHelper } from "./utils"

export const Login: React.FC = (props: any) => {

    const [modalShow, setModalShow] = React.useState(false);
    const [churches, setChurches] = React.useState<ChurchInterface[]>([]);

    const getCookieValue = (a: string) => {
        var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    };

    const successCallback = () => {
        setChurches(UserHelper.churches);
        setModalShow(true);
    }

    const context = React.useContext(UserContext);

    let search = new URLSearchParams(props.location?.search);
    var jwt = search.get("jwt") || getCookieValue("jwt");
    let auth = search.get("auth");
    if (jwt === undefined || jwt === null) jwt = "";
    if (auth === undefined || auth === null) auth = "";

    const selectChurch = (selectedChurch: string) => {
        const jwt = ApiHelper.getConfig("StreamingLiveApi").jwt;
        window.location.href = (EnvironmentHelper.SubUrl.replace("{key}", selectedChurch) + "/login/" + jwt);
    }

    const getModal = () => {
        if (churches.length > 1) return (<SelectChurchModal show={modalShow} onHide={() => setModalShow(false)} churches={churches} selectChurch={selectChurch} />)
        else if (churches.length === 1) {
            selectChurch(churches[0].subDomain);
        }
        return null;
    }

    return (
        <>
            <LoginPage auth={auth} context={context} jwt={jwt} successCallback={successCallback} />
            { getModal()}
        </>
    );

};
