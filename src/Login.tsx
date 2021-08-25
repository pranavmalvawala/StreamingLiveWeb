import React from "react";
import { useCookies } from "react-cookie";
import UserContext from "./UserContext";
import { LoginPage } from "./appBase/pageComponents/LoginPage";
import { UserHelper, EnvironmentHelper } from "./helpers"

export const Login: React.FC = (props: any) => {
  const [cookies] = useCookies(["jwt"]);
  const context = React.useContext(UserContext);

  const successCallback = () => {
    const subDomain = UserHelper.currentChurch.subDomain;
    window.location.href = (EnvironmentHelper.SubUrl.replace("{key}", subDomain) + "/login?jwt=" + jwt);
  }

  let search = new URLSearchParams(props.location?.search);
  let jwt = search.get("jwt") || cookies.jwt;
  let auth = search.get("auth");
  if (!jwt) jwt = "";
  if (!auth) auth = "";

  return (
    <>
      <LoginPage auth={auth} context={context} jwt={jwt} successCallback={successCallback} appName="StreamingLive" appUrl={window.location.href} />
    </>
  );

};
