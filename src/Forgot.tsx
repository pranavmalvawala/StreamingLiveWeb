import React from "react";
import { ForgotPage } from "./appBase/pageComponents/ForgotPage";
import { EnvironmentHelper } from './utils'

export const Forgot = () => {
    return (<ForgotPage supportEmail={EnvironmentHelper.supportEmail} />)
}