import React from "react";
import { useCookies } from "react-cookie";
import UserContext from "./UserContext";
import { LoginPage } from "./appBase/pageComponents/LoginPage";
import { SelectChurchModal, ChurchInterface } from "./components";
import { ApiHelper, UserHelper, EnvironmentHelper } from "./helpers"

export const Login: React.FC = (props: any) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [churches, setChurches] = React.useState<ChurchInterface[]>([]);
  const [cookies] = useCookies(["jwt"]);
  const context = React.useContext(UserContext);

  const successCallback = () => {
    setChurches(UserHelper.churches);
    setModalShow(true);
  }

  let search = new URLSearchParams(props.location?.search);
  let jwt = search.get("jwt") || cookies.jwt;
  let auth = search.get("auth");
  if (!jwt) jwt = "";
  if (!auth) auth = "";

  const selectChurch = (selectedChurch: string) => {
    const jwt = ApiHelper.getConfig("StreamingLiveApi").jwt;
    window.location.href = (EnvironmentHelper.SubUrl.replace("{key}", selectedChurch) + "/login?jwt=" + jwt);
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
      <LoginPage auth={auth} context={context} jwt={jwt} successCallback={successCallback} appName="StreamingLive" />
      {getModal()}
    </>
  );

};
