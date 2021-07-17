import React from "react";
import { Link } from "react-router-dom";
import { ApiHelper, RegisterInterface, RoleInterface, LoginResponseInterface, RolePermissionInterface, ErrorMessages, ChurchInterface, UserInterface, EnvironmentHelper, PersonInterface, PasswordField } from ".";
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import * as yup from "yup";
import { Formik, FormikHelpers } from "formik";

const schema = yup.object().shape({
  churchName: yup.string().required("Please enter your church name."),
  firstName: yup.string().required("Please enter your first name."),
  lastName: yup.string().required("Please enter your last name."),
  password: yup.string().required("Please enter a password.").min(6, "Passwords must be at least 6 characters."),
  email: yup.string().required("Please enter your email address.").email("Please enter a valid email address."),
  subDomain: yup.string().required("Please select a subdomain for your church.")
})

export function HomeRegister() {
  const [customErrors, setCustomErrors] = React.useState([]);

  async function createAccess(values: RegisterInterface) {
    let resp: LoginResponseInterface = await ApiHelper.postAnonymous("/churches/register", values, "AccessApi");
    if (resp.errors !== undefined) { return resp; }
    else {
      const church = resp.churches[0];
      church.apis.forEach(api => { ApiHelper.setPermissions(api.keyName, api.jwt, api.permissions) });
      let response: LoginResponseInterface = await ApiHelper.post("/churchApps/register", { appName: "StreamingLive" }, "AccessApi");
      if (response.errors !== undefined) { setCustomErrors(response.errors); return null; }
      else {
        const church = response.churches[0];
        church.apis.forEach(api => { ApiHelper.setPermissions(api.keyName, api.jwt, api.permissions) });
        await addHostRole(church, response.user)
        return resp;
      }
    }

  }

  async function addHostRole(church: ChurchInterface, user: UserInterface) {
    let role: RoleInterface = { churchId: church.id, name: "Hosts" };
    role.id = (await ApiHelper.post("/roles", [role], "AccessApi"))[0].id;

    const permissions: RolePermissionInterface[] = [];
    permissions.push({ churchId: church.id, apiName: "MessagingApi", contentType: "Chat", action: "Host", roleId: role.id });
    await ApiHelper.post("/rolepermissions", permissions, "AccessApi");
  }

  async function handleSubmit(values: RegisterInterface, { setSubmitting, setErrors }: FormikHelpers<RegisterInterface>) {
    setCustomErrors([])
    // check if user already exist and if so, return user's associated churches
    const verifyResponse = await ApiHelper.postAnonymous("/users/verifyCredentials", { email: values.email, password: values.password }, "AccessApi");

    if (verifyResponse.churches) {
      const errorMessage = <>There is already an account with this email address, please <a href={EnvironmentHelper.AccountsAppUrl}>login</a> to manage your churches and apps. If you wish to create a new church with this email, please register from <a href={EnvironmentHelper.ChurchAppUrl}>ChurchApps</a></>;
      setCustomErrors([errorMessage]);
      return;
    }

    let church: ChurchInterface = null;
    let loginResp = await createAccess(values);
    if (loginResp.errors) {
      setErrors({ subDomain: loginResp.errors[0] })
      return;
    }

    church = loginResp.churches.filter(c => c.subDomain === values.subDomain)[0];
    if (church != null) {
      let resp: LoginResponseInterface = await ApiHelper.post("/churches/init", { appName: "StreamingLive" }, "StreamingLiveApi");
      const { person }: { person: PersonInterface} = await ApiHelper.post("/churches/init", { user: loginResp.user }, "MembershipApi");
      await ApiHelper.post("/userchurch", { personId: person.id }, "AccessApi");
      if (resp.errors !== undefined) { setCustomErrors(resp.errors); return 0; }
      else {
        window.location.href = EnvironmentHelper.SubUrl.replace("{key}", church.subDomain) + "/login/?jwt=" + ApiHelper.getConfig("AccessApi").jwt;
      }
    }
  }

  const initialValues: RegisterInterface = { churchName: "", firstName: "", lastName: "", password: "", email: "", subDomain: "" };

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
              <ErrorMessages errors={customErrors} />

              <div id="registerBox">
                <Formik
                  validationSchema={schema}
                  onSubmit={handleSubmit}
                  initialValues={initialValues}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                    isSubmitting
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Church Name"
                          name="churchName"
                          value={values.churchName}
                          onChange={handleChange}
                          isInvalid={touched.churchName && !!errors.churchName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.churchName}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="yourchurch"
                            name="subDomain"
                            value={values.subDomain}
                            onChange={handleChange}
                            isInvalid={touched.subDomain && !!errors.subDomain}
                          />
                          <InputGroup.Text>.streaminglive.church</InputGroup.Text>
                          <Form.Control.Feedback type="invalid">
                            {errors.subDomain}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              placeholder="First Name"
                              name="firstName"
                              value={values.firstName}
                              onChange={handleChange}
                              isInvalid={touched.firstName && !!errors.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.firstName}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              placeholder="Last Name"
                              name="lastName"
                              value={values.lastName}
                              onChange={handleChange}
                              isInvalid={touched.lastName && !!errors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.lastName}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={touched.email && !!errors.email}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <PasswordField
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={touched.password && !!errors.password}
                          errorText={errors.password}
                        />
                      </Form.Group>
                      <Button type="submit" variant="primary" block disabled={isSubmitting}>
                        {isSubmitting ? "Registering. Please wait..." : "Register for Free"}
                      </Button>
                    </Form>
                  )}
                </Formik>
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
