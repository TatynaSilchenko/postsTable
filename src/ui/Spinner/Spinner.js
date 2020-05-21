import React from "react";
import s from "./Spinner.module.css";
import SpinnerIcon from "./SpinnerIcon";

const Spinner = () => {
    return (
        <div className={s.spinner}>
            <SpinnerIcon/>
        </div>
    );
};

export default Spinner;
