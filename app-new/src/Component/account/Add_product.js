import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
function Add_product(){
let token = localStorage.getItem("token");

const [Category, setCategory] = useState({});
const [Brand, setBrand] = useState([]);
const [input,setInput] = useState({
    name:"",
    price:"",
    category:"",
    brand:"",
    company:"",
    detail:"",
    status:"",
    sale:""
})

useEffect(()=>{
    axios.get("http://localhost:8080/laravel8/laravel8/public/api/category-brand")
    .then(res=>{
        // console.log(res.data.category)
        setCategory(res.data.category)
        setBrand(res.data.brand)

    })
    .catch(function (error){
        console.log(error)
        
    })
},[]);

const [getFile, setFile] = useState("")


function xulyFile(e){	
    const file = e.target.files;   
    setFile(file);	
}

function handleInput(e){
    let getName= e.target.name
    let getValue = e.target.value
    setInput(state => ({...state,[getName]:getValue}))
}

function showSale(){
    if(input.status == 0 ){
        return(
            <input type="text" placeholder="sale" name="sale" onChange={handleInput}></input>
        )
    }
}

function showCategory(){
if((Category).length > 0){
    return (Category).map((value,key)=>{
        return(
            <option value={value.id}>{value.category}</option>
        )
    })         
}
};
function showBrand(){
if((Brand).length > 0){
    return (Brand).map((value,key)=>{
        return(
            <option value={value.id}>{value.brand}</option>
        )
    })         
}
};
function showErr(){
if(Object.keys(err).length > 0){
    return Object.keys(err).map((key,index)=>{
      return(
        <li key={key}>
          {err[key]}
        </li>
      )
    })
  }
}

    const [err,setErr] = useState("");
    function handleSubmit(e){
        e.preventDefault();
        let errObj = {};
        let x =1;
        if(input.name == ""){
            errObj.name = "Please enter name";
            x = 2;
        }
        if(input.price == ""){
            errObj.price = "Please enter price";
            x = 2;
        }
        if(input.company == ""){
            errObj.company = "Please enter company";
            x = 2;
        }
        if(input.detail== ""){
            errObj.detail = "Please enter detail";
            x = 2;
        }
        if(input.sale == "" && input.status == 0){
            errObj.sale = "Please enter sale";
            x = 2;
        }
        if(getFile == ""){
			errObj.img = "Please select the image";
			x = 2;
        }else{
            Object.keys(getFile).map((key,index)=>{
                let getSize = getFile[key]['size'];
                let getName = getFile[key]['name'];
                if(getSize > 1024 * 1024){
                    errObj.getSize = "file lớn hơn 1Mb,vui lòng chọn lại"
                    x = 2;
                }
                let text =["png", "jpg", "jpeg","PNG", "JPG"];
                let demo = getName;      
                let myarr = demo.split(".");
               if(text.includes(myarr[1]) == 0){
                    errObj.text = "lỗi định dạng file"
                    x = 2;
               }
            })   
		} 
        setErr(errObj);
        if(x==1){
            alert("ok")
            let config = {
                headers: {
                    'Authorization': 'Bearer '+ token,
                    'Content_Type': 'multipart/form/data',
                    'Accept': 'application/json'
                }
            };
            let formData = new FormData();
            formData.append('name', input.name);
            formData.append('price', input.price);
            formData.append('category', input.category);
            formData.append('brand', input.brand);
            formData.append('company', input.company);
            formData.append('detail', input.detail);
            formData.append('status', input.status);
            formData.append('sale', input.sale ? input.sale : 0);

            Object.keys(getFile).map((item,i)=>{
                formData.append('file[]', getFile[item]);
            });

            axios.post("http://localhost:8080/laravel8/laravel8/public/api/user/product/add", formData, config)
            .then((res)=>{
                console.log(res)
            })
            .catch(function(error){
                console.log(error)
            })
        }
    } 

    return(
        <div class="signup-form">
            <h2>Creat Product</h2>
            {showErr()}
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
                <p><input type="text" placeholder="name" name="name" onChange={handleInput}></input></p>
                <p><input type="text" placeholder="price" name="price" onChange={handleInput}></input></p>
                <p>
                    <select name="category" onChange={handleInput}>
                        {showCategory()}
                    </select>
                </p>
                <p>
                    <select name="brand" onChange={handleInput}>
                        {showBrand()}
                    </select>
                </p>
                   
                <p><input type="file" name="file" onChange={xulyFile} multiple></input></p>
                <p>
                    <select onChange={handleInput} name="status">
                        <option value={1}>New</option>
                        <option value={0}>Sale</option>
                    </select>
                <p>{showSale()}</p>
                </p>
                <p><input type="text" placeholder="Company" name="company" onChange={handleInput}></input></p>
                <p><input type="text" placeholder="Detail" name="detail" onChange={handleInput}></input></p>
                <button type="submit">Signup</button>
            </form> 
        </div>
    )
}
export default Add_product;