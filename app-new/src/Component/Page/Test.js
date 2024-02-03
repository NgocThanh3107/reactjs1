import React from "react";
import { useSelector } from "react-redux";
function Test(){
    const list = useSelector(state => state.hobby.list); // Lấy giá trị của list từ Redux store

    console.log(list); // In ra giá trị của list

    return(
        <ul>
            pppppp
        </ul>
    );
}

export default Test;