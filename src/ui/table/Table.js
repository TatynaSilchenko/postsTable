import React from "react";
import s from "./Table.module.css";
import *as ReactBootStrap from "react-bootstrap";
import {useSelector} from "react-redux";
import "../../App.css";

const Table = ({getUsers, ...props}) => {

    //Get column name from state
    const columns = useSelector(state => state.table.columns);

    //set columns
    const headerClassSet = (key) => {
        if (key === "username") return `${s.headerName} ${s.userNameColumn}`;
        if (key === "id") return `${s.idColumn} ${s.headerName}`;

        return s.headerName;
    };

    const headerColumns = () => Object.keys(columns).map(key => {
        return <th key={key}
                   className={headerClassSet(key)}>{columns[key].label}</th>
    });

    const getUpperCase = (string) => {
        return string[0].toUpperCase() + string.slice(1)
    };

    //set modal's value
    const getMoreInfo = (e, item) => {
        props.setShowModal(true);
        const upperTitle = getUpperCase(item.title);
        props.setTitle(upperTitle);
        const upperBody = getUpperCase(item.body);
        props.setBody(upperBody);
        props.setUsername(item.username)
    };

    //create table
    const rows = () => {
        return props.posts.map((item) => row(item))
    };
    const row = (item) => {
        return <tr key={item.id} className={s.row}>
            {Object.keys(columns).map((key, i) => <td key={key}
                                                      className={key === "title" ? s.alignItemLeft : null}
                                                      onClick={e => key === "title" && getMoreInfo(e, item)}>
                {key === "id" ? item[key] : getUpperCase(item[key])}</td>)}</tr>
    };

    return (
        <div className={s.tableWrapper}>
            <ReactBootStrap.Table striped bordered hover>
                <thead>
                <tr>{headerColumns()}</tr>
                </thead>
                <tbody>
                {rows()}
                </tbody>
            </ReactBootStrap.Table>
        </div>
    )
};

export default Table
