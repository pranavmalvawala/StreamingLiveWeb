import React from "react";
import { Link } from "react-router-dom";
import { ApiHelper, RegisterInterface, RoleInterface, LoginResponseInterface, RolePermissionInterface, ErrorMessages, ChurchInterface, UserInterface, PersonInterface } from ".";
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import * as yup from "yup";
import { Formik, FormikHelpers } from "formik";
import ReactGA from "react-ga";

const schema = yup.object().shape({
  churchName: yup.string().required("Please enter your church name."),
  firstName: yup.string().required("Please enter your first name."),
  lastName: yup.string().required("Please enter your last name."),
  email: yup.string().required("Please enter your email address.").email("Please enter a valid email address."),
  subDomain: yup.string().required("Please select a subdomain for your church.")
})

interface Props {
  registrationCallback?: (selectedSubDomain: string) => void
}

export const HomeRegisterForm: React.FC<Props> = props => {
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

    ReactGA.event({ category: "Streaming", action: "Register" });
    let church: ChurchInterface = null;
    let loginResp = await createAccess(values);
    if (loginResp.errors) {
      setErrors({ subDomain: loginResp.errors[0] })
      return;
    }

    church = loginResp.churches.filter(c => c.subDomain === values.subDomain)[0];
    if (church != null) {
      let resp: LoginResponseInterface = await ApiHelper.post("/churches/init", { appName: "StreamingLive" }, "StreamingLiveApi");
      const { person }: { person: PersonInterface } = await ApiHelper.post("/churches/init", { user: loginResp.user }, "MembershipApi");
      await ApiHelper.post("/userchurch", { personId: person.id }, "AccessApi");
      if (resp.errors !== undefined) { setCustomErrors(resp.errors); return 0; }
      else props.registrationCallback(church.subDomain);
    }
  }

  const initialValues: RegisterInterface = { churchName: "", firstName: "", lastName: "", email: "", subDomain: "", appName: "StreamingLive", appUrl: window.location.href };

  return (
    <>
      <ErrorMessages errors={customErrors} />
      <div id="registerBox">
        <Formik validationSchema={schema} onSubmit={handleSubmit} initialValues={initialValues}>
          {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control type="text" placeholder="Church Name" name="churchName" value={values.churchName} onChange={handleChange} isInvalid={touched.churchName && !!errors.churchName} />
                <Form.Control.Feedback type="invalid">{errors.churchName}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <InputGroup>
                  <Form.Control type="text" placeholder="yourchurch" name="subDomain" value={values.subDomain} onChange={handleChange} isInvalid={touched.subDomain && !!errors.subDomain} />
                  <InputGroup.Text>.streaminglive.church</InputGroup.Text>
                  <Form.Control.Feedback type="invalid">{errors.subDomain}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Control type="text" placeholder="First Name" name="firstName" value={values.firstName} onChange={handleChange} isInvalid={touched.firstName && !!errors.firstName} />
                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control type="text" placeholder="Last Name" name="lastName" value={values.lastName} onChange={handleChange} isInvalid={touched.lastName && !!errors.lastName} />
                    <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Control type="email" placeholder="Email" name="email" value={values.email} onChange={handleChange} isInvalid={touched.email && !!errors.email} />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
    </>
  );
}
