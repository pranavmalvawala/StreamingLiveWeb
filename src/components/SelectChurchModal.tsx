import React from "react";
import { Button, Container, Modal, Row } from "react-bootstrap";
import { ChurchInterface } from ".";
interface props {
    churches?: ChurchInterface[]
    show: Boolean
    onHide: () => void
    selectChurch: (subdomain: string) => void
}
export const SelectChurchModal: React.FC<props> = (props) => (
  <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header closeButton className="text-center">
      <h3 className="text-center">Select Church</h3>
    </Modal.Header>
    <Modal.Body>
      <Container>
        <Row className="justify-content-sm-center">
          {props.churches.map(c => (<Button key={c.id} variant="info" onClick={() => props.selectChurch(c.subDomain)} className="m-3">{c.name}</Button>))}
        </Row>
      </Container>

    </Modal.Body>
  </Modal>
)
