import { ApiHelper } from "../appBase/helpers/ApiHelper";

export class EnvironmentHelper {
  private static AccessApi = "";
  private static StreamingLiveApi = "";
  private static MembershipApi = "";
  static SubUrl = "";
  static AccountsAppUrl = "";
  static ChurchAppUrl = "";
  static GoogleAnalyticsTag = "";

  static init = () => {
    switch (process.env.REACT_APP_STAGE) {
      case "staging": EnvironmentHelper.initStaging(); break;
      case "prod": EnvironmentHelper.initProd(); break;
      default: EnvironmentHelper.initDev(); break;
    }
    ApiHelper.apiConfigs = [
      { keyName: "AccessApi", url: EnvironmentHelper.AccessApi, jwt: "", permisssions: [] },
      { keyName: "StreamingLiveApi", url: EnvironmentHelper.StreamingLiveApi, jwt: "", permisssions: [] },
      { keyName: "MembershipApi", url: EnvironmentHelper.MembershipApi, jwt: "", permisssions: [] }
    ];
  }

  static initDev = () => {
    EnvironmentHelper.AccessApi = process.env.REACT_APP_ACCESS_API || "";
    EnvironmentHelper.StreamingLiveApi = process.env.REACT_APP_STREAMINGLIVE_API || "";
    EnvironmentHelper.MembershipApi = process.env.REACT_APP_MEMBERSHIP_API || "";
    EnvironmentHelper.SubUrl = process.env.REACT_APP_SUB_URL || "";
    EnvironmentHelper.AccountsAppUrl = process.env.REACT_APP_ACCOUNTS_APP_URL || "";
    EnvironmentHelper.ChurchAppUrl = process.env.REACT_APP_CHURCH_APPS_URL || "";
    EnvironmentHelper.GoogleAnalyticsTag = process.env.REACT_APP_GOOGLE_ANALYTICS || "";
  }

  //NOTE: None of these values are secret.
  static initStaging = () => {
    EnvironmentHelper.AccessApi = "https://accessapi.staging.churchapps.org";
    EnvironmentHelper.StreamingLiveApi = "https://api.staging.streaminglive.church";
    EnvironmentHelper.MembershipApi = "https://membershipapi.staging.churchapps.org";
    EnvironmentHelper.SubUrl = "https://{key}.staging.streaminglive.church";
    EnvironmentHelper.AccountsAppUrl = "https://accounts.staging.churchapps.org";
    EnvironmentHelper.ChurchAppUrl = "https://staging.churchapps.org";
    EnvironmentHelper.GoogleAnalyticsTag = "";
  }

  //NOTE: None of these values are secret.
  static initProd = () => {
    EnvironmentHelper.AccessApi = "https://accessapi.churchapps.org";
    EnvironmentHelper.StreamingLiveApi = "https://api.streaminglive.church";
    EnvironmentHelper.MembershipApi = "https://membershipapi.churchapps.org";
    EnvironmentHelper.SubUrl = "https://{key}.streaminglive.church";
    EnvironmentHelper.AccountsAppUrl = "https://accounts.churchapps.org";
    EnvironmentHelper.ChurchAppUrl = "https://churchapps.org";
    EnvironmentHelper.GoogleAnalyticsTag = "UA-164774603-1";
  }

}

