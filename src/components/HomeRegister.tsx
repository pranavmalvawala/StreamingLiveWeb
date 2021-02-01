import React from "react";
import { Link } from "react-router-dom";
import { ApiHelper, RegisterInterface, RoleInterface, LoginResponseInterface, RolePermissionInterface, ErrorMessages, ChurchInterface, UserInterface, EnvironmentHelper } from ".";


export const HomeRegister: React.FC = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [churchName, setChurchName] = React.useState("");
    const [subDomain, setSubDomain] = React.useState("");
    const [errors, setErrors] = React.useState([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;
        switch (e.currentTarget.name) {
            case "email": setEmail(val); break;
            case "password": setPassword(val); break;
            case "churchName": setChurchName(val); break;
            case "subDomain": setSubDomain(val); break;
        }
    }

    const validate = async () => {
        var errors = [];
        if (churchName === "") errors.push("Please enter your church/organization name.");
        if (subDomain === "") errors.push("Please select a subdomain for your site.");
        if (email === "") errors.push("Please enter your email address.");
        if (password === "") errors.push("Please enter a password.");
        setErrors(errors);
        return errors.length === 0;
    }

    const handleRegister = async (e: React.MouseEvent) => {
        e.preventDefault();
        const btn = e.currentTarget;
        btn.innerHTML = "Validating..."
        if (await validate()) {
            btn.innerHTML = "Registering. Please wait..."
            btn.setAttribute("disabled", "disabled");

            var church: ChurchInterface = null;

            //Create Access
            church = await createAccess();
            console.log(JSON.stringify(church));
            if (church != null) {
                btn.innerHTML = "Configuring..."
                var resp: LoginResponseInterface = await ApiHelper.post("/churches/init", { appName: "StreamingLive" }, "StreamingLiveApi");
                if (resp.errors !== undefined) { setErrors(resp.errors); return 0; }
                else {
                    window.location.href = EnvironmentHelper.SubUrl.replace("{key}", church.subDomain) + "/login/?jwt=" + ApiHelper.getConfig("AccessApi").jwt;
                }
            }
        }
        btn.innerHTML = "Register"
    }

    const createAccess = async () => {
        var data: RegisterInterface = { churchName: churchName, displayName: email, email: email, password: password, subDomain: subDomain };

        var resp: LoginResponseInterface = await ApiHelper.postAnonymous("/churches/register", data, "AccessApi");
        if (resp.errors !== undefined) { setErrors(resp.errors); return null; }
        else {
            const church = resp.churches[0];
            church.apis.forEach(api => { ApiHelper.setPermissions(api.keyName, api.jwt, api.permissions) });
            var response: LoginResponseInterface = await ApiHelper.post("/churchApps/register", { appName: "StreamingLive" }, "AccessApi");
            if (response.errors !== undefined) { setErrors(response.errors); return null; }
            else {
                const church = response.churches[0];
                church.apis.forEach(api => { ApiHelper.setPermissions(api.keyName, api.jwt, api.permissions) });
                await addHostRole(church, response.user)
                return church;
            }
        }

    }

    const addHostRole = async (church: ChurchInterface, user: UserInterface) => {
        var role: RoleInterface = { appName: "StreamingLive", churchId: church.id, name: "Hosts" };
        role.id = (await ApiHelper.post("/roles", [role], "AccessApi"))[0].id;

        const permissions: RolePermissionInterface[] = [];
        permissions.push({ churchId: church.id, contentType: "Chat", action: "Host", roleId: role.id });
        await ApiHelper.post("/rolepermissions", permissions, "AccessApi");
    }


    return (
        <>
            <div id="register">
                <div className="container">
                    <div className="text-center">
                        <h2 style={{ marginBottom: 20 }}>Register <span>Your Church</span></h2>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <p>This is a <b><u>completely free</u></b> service offered to churches by <a href="https://livecs.org/">Live Church Solutions</a>, a 501(c)(3) organization with EIN 45-5349618, that was founded in 2012 with the goal of helping small churches with their technical needs.</p>
                            <p>If you would like to help support our mission of enabling churches to thrive with technology solutions, please consider <a href="https://livecs.org/partner/">partnering with us</a>.</p>
                        </div>
                        <div className="col-lg-6">
                            <ErrorMessages errors={errors} />

                            <div id="registerBox">
                                <form method="post">
                                    <div className="form-group">
                                        <input type="text" name="churchName" value={churchName} className="form-control" placeholder="Church Name" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input type="text" name="subDomain" className="form-control" placeholder="yourchurch" value={subDomain} onChange={handleChange} />
                                            <div className="input-group-append"><span className="input-group-text">.streaminglive.church</span></div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="email" value={email} className="form-control" placeholder="Email Address" onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" value={password} className="form-control" placeholder="Password" onChange={handleChange} />
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block" onClick={handleRegister}>Register</button>
                                </form>
                                <br />
                                <div>
                                    Already have a site? <Link to="/login">Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
