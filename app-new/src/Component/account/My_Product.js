import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function My_Product(){
let token = localStorage.getItem("token");

const [data,setData] = useState({});

function hanldeDelete(e){
        let id_pro =  e.target.id;
        // console.log(id_pro);
        let config = {
            headers: {
                'Authorization': 'Bearer '+ token,
                'Content_Type': 'multipart/form/data',
                'Accept': 'application/json'
            }
        };
      
        axios.get("http://localhost:8080/laravel8/laravel8/public/api/user/product/delete/" + id_pro, config)
        .then(ress=>{
        // console.log(ress)
        setData(ress.data.data)
        }) 
};

function renderData(){
    if(Object.keys(data).length > 0){
        return Object.keys(data).map((key,index)=>{
            let images = data[key]["image"];
                images = JSON.parse(images);
            let id_pro = data[key]["id"];
            return(   
                <tr>
                    <td width={100}>{data[key]["id"]}</td>
                    <td width={100}>{data[key]["name"]}</td>
                    <td width={100}><img width={70} height={70} src={"http://localhost:8080/laravel8/laravel8/public/upload/product/" + data[key]["id_user"] + "/" + images} alt=""></img></td>
                    <td width={100}>{data[key]["price"]}</td>
                    <td><Link to={"http://localhost:3000/account/editproduct/" + id_pro}>Edit</Link></td>
                    <td><a id={data[key]["id"]} onClick={hanldeDelete}>delete </a></td>    
                </tr>
            )
        })
    }
}
useEffect(()=>{
    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
            'Content_Type': 'multipart/form/data',
            'Accept': 'application/json'
        }
    };
    axios.get("http://localhost:8080/laravel8/laravel8/public/api/user/my-product", config)
    .then(res=>{
        setData(res.data.data)
        console.log(res)
    });
},[]);

    return(
        <div>
            <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Action</th>
            </tr>
            {renderData()}
            </table>
        <p><Link to={"http://localhost:3000/account/addproduct"}>Add</Link></p>
        </div>
    )
}
export default My_Product;