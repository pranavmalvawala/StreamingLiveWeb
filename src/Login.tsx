import React from "react";
import { useCookies } from "react-cookie";
import UserContext from "./UserContext";
import { LoginPage } from "./appBase/pageComponents/LoginPage";
import { UserHelper, EnvironmentHelper, ChurchInterface, ApiHelper, RoleInterface, RolePermissionInterface } from "./helpers"

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

  const postChurchRegister = async (church: ChurchInterface) => {
    await ApiHelper.post("/churchApps/register", { appName: "StreamingLive" }, "AccessApi");
    await addHostRole(church);
  }

  const addHostRole = async (church: ChurchInterface) => {
    let role: RoleInterface = { churchId: church.id, name: "StreamingLive Hosts" };
    role.id = (await ApiHelper.post("/roles", [role], "AccessApi"))[0].id;

    const permissions: RolePermissionInterface[] = [];
    permissions.push({ churchId: church.id, apiName: "MessagingApi", contentType: "Chat", action: "Host", roleId: role.id });
    await ApiHelper.post("/rolepermissions", permissions, "AccessApi");
  }

  return (
    <LoginPage
      auth={auth}
      context={context}
      jwt={jwt}
      appName="StreamingLive"
      appUrl={window.location.href}
      churchRegisteredCallback={postChurchRegister}
      successCallback={successCallback}
    />
  );

};
