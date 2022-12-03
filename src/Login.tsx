import React from "react";
import { useCookies } from "react-cookie";
import UserContext from "./UserContext";
import { LoginPage } from "./appBase/pageComponents/LoginPage";
import { UserHelper, EnvironmentHelper, ChurchInterface, ApiHelper, RoleInterface, RolePermissionInterface, UserInterface } from "./helpers";
import ReactGA from "react-ga";
import { Box } from "@mui/material";

export const Login: React.FC = (props: any) => {
  const [cookies] = useCookies(["jwt"]);
  const context = React.useContext(UserContext);

  const successCallback = () => {
    const subDomain = UserHelper.currentUserChurch.church.subDomain;
    window.location.href = (EnvironmentHelper.SubUrl.replace("{key}", subDomain) + "/login?jwt=" + (UserHelper.currentUserChurch.jwt));
  }

  const trackChurchRegister = async (church: ChurchInterface) => {
    if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.event({ category: "Church", action: "Register" });
  }

  const trackUserRegister = async (user: UserInterface) => {
    if (EnvironmentHelper.GoogleAnalyticsTag !== "") ReactGA.event({ category: "User", action: "Register" });
  }

  let search = new URLSearchParams(window.location?.search);
  let jwt = search.get("jwt") || cookies.jwt;
  let auth = search.get("auth");
  if (!jwt) jwt = "";
  if (!auth) auth = "";

  const postChurchRegister = async (church: ChurchInterface) => {
    await addHostRole(church);
    trackChurchRegister(church);
  }

  const addHostRole = async (church: ChurchInterface) => {
    let role: RoleInterface = { churchId: church.id, name: "StreamingLive Hosts" };
    role.id = (await ApiHelper.post("/roles", [role], "MembershipApi"))[0].id;

    const permissions: RolePermissionInterface[] = [];
    permissions.push({ churchId: church.id, apiName: "MessagingApi", contentType: "Chat", action: "Host", roleId: role.id });
    await ApiHelper.post("/rolepermissions", permissions, "MembershipApi");
  }

  return (
    <Box style={{ backgroundColor: "#EEE", minHeight: "100vh" }}>
      <LoginPage
        auth={auth}
        context={context}
        jwt={jwt}
        appName="StreamingLive"
        appUrl={window.location.href}
        churchRegisteredCallback={postChurchRegister}
        loginSuccessOverride={successCallback}
        userRegisteredCallback={trackUserRegister}
      />
    </Box>
  );

};
