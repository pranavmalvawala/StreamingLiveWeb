import React from "react";
import { Button, Container, Modal, Row } from "react-bootstrap";
import { ApiHelper, ChurchInterface, EnvironmentHelper } from ".";
interface props {
    churchs?: ChurchInterface[]
    show: Boolean
    onHide: () => void
}
export const SelectChurchModal: React.FC<props> = (props) => {
    const redirectToChurch = (selectedChurch: string) => {
        const jwt = ApiHelper.getConfig("StreamingLiveApi").jwt;
        window.location.href = (EnvironmentHelper.SubUrl.replace("{key}", selectedChurch) + "/login/" + jwt);
    }
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton className="text-center">
                <h3 className="text-center">Select Church</h3>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="justify-content-sm-center">
                        {props.churchs.map(c => {
                            return (<Button key={c.id} variant="info" onClick={() => redirectToChurch(c.subDomain)} className="m-3">{c.name}</Button>);
                        })}
                    </Row>
                </Container>

            </Modal.Body>
        </Modal>
    );
}
