import React from "react";
import { EnvironmentHelper } from "../helpers";

interface Props {
  subDomain: string
}

export const HomeRegisterComplete: React.FC<Props> = props => {
  const url = EnvironmentHelper.SubUrl.replace("{key}", props.subDomain);
  return (
    <div id="registerBox">
      <h3>Thank You For Registering</h3>
      <p>Your custom site of <a href={url}>{url}</a> has been created and is ready to be configured.  Please check your email for your temporary password in order to get started.</p>
      <a href={url} className="btn btn-block btn-primary">Configure Your Site</a>
    </div>
  );
}
