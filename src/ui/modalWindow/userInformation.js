import React from "react";
import {Modal} from "react-bootstrap";
import "./../../App.css";
import s from "./UserInfo.module.css";

const UserInformation = ({title, username, body, ...props}) => {
    return <div>
        <Modal
            size="lg"
            show={props.lgShow}
            onHide={() => props.setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    <div className={s.userName}><span className={s.titles}>Name:</span> {username}</div>
                    <div className={s.title}><span className={s.titles}>Title: </span>{title}</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
        </Modal>
    </div>
};

export default UserInformation
