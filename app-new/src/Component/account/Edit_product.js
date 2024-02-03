import { toBeChecked } from "@testing-library/jest-dom/matchers";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Edit_product(){

const param = useParams();
let token = localStorage.getItem("token");
let id = localStorage.getItem("auth");
    id = JSON.parse(id)
    let id_user = id.id;

const [img,setImg] = useState([]);
const [data,setData] = useState({
    Name:"",
    Price:"",
    Category:"",
    Brand:"",
    Status:"",
    Company:"",
    Detail:"",
    Sale:"",
    Id_pro:""
});

const [err,setErr] = useState("");

useEffect(()=>{
    let config = {
        headers: {
            'Authorization': 'Bearer '+ token,
            'Content_Type': 'multipart/form/data',
            'Accept': 'application/json'
        }
    };
    axios.get("http://localhost:8080/laravel8/laravel8/public/api/user/product/" + param.id, config)
    .then(res=>{

        setImg(res.data.data.image)
        let getdata = res.data.data;
        setData({
            Name: getdata.name,
            Price: getdata.price,
            Category: getdata.id_category,
            Brand: getdata.id_brand,
            Status: getdata.status,
            Company: getdata.company_profile,
            Detail: getdata.detail,
            Sale: getdata.sale ? getdata.sale : 0,
            Id_pro:getdata.id
        })
    });
},[]);

function handleIP(e){
    let getName= e.target.name
    let getValue = e.target.value
     setData(state => ({...state,[getName]:getValue}))
}

const [file,setFile] = useState("");
function xulyFile(e){	
    const files = e.target.files;   
    setFile(files);	
}

const [array,setArray] = useState([]);

function handleCheck(e){
   let newValue = e.target.value;
   if(e.target.checked == true){
    setArray(state => [...state, newValue]);
   }else{
    if(array.includes(newValue) == true){
        const newArr = array.filter((v)=> v !== newValue);
        setArray(newArr)
    }
    else{
        setArray([...array, newValue])
    }
    //  - kiem tra newValue co trong  array
    //  - remove value in array
   }

}

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
function renderImg(){
    if((img).length >0){
        return (img).map((value,key)=>{
            return(
                <p>
                    <input  type="checkbox" value={value} name="Checkbox" onClick={handleCheck}></input>
                    <img width={50} height={50} src={"http://localhost:8080/laravel8/laravel8/public/upload/product/" + id_user + "/" + value} alt=""></img>
                </p>
            )
        })
    }
}

let errObj = {};
let x = 1;
function handleSubmit(e){
    e.preventDefault();
    if(data.Name == ""){
    errObj.Name = "Please enter name";
    x = 2;
    }
    if(data.Price == ""){
    errObj.Price = "Please enter price";
    x = 2;
    }
    if(data.Company == ""){
        errObj.Company = "Please enter company";
        x = 2;
    }
    if(data.Detail == ""){
        errObj.Detail = "Please enter detail";
        x = 2;
    }
    if(array == 0){
        errObj.array= "Please choose photo";
        x = 2;
    }
    if((img.length + file.length) - array.length > 3){
        errObj.array1="Photo more than 3";
        x = 2;
    }
    if(file == ""){
        errObj.img = "Please select the image";
        x = 2;
    }else{
        Object.keys(file).map((key,index)=>{
            let getSize = file[key]['size'];
            let getName = file[key]['name'];
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
        let config ={
            headers: {
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        let formData = new FormData();
            formData.append('name', data.Name);
            formData.append('price', data.Price);
            formData.append('category', data.Category);
            formData.append('brand', data.Brand);
            formData.append('company', data.Company);
            formData.append('detail', data.Detail);
            formData.append('status', data.Status);
            formData.append('sale', data.Sale ? data.Sale : 0);
            formData.append('avatarCheckBox[]', array);

            Object.keys(file).map((item,i)=>{
                formData.append('file[]', file[item]);
            });
            Object.keys(array).map((item,i)=>{
                formData.append('avatarCheckBox[]', array[item]);
            });

        axios.post("http://localhost:8080/laravel8/laravel8/public/api/user/product/update/" + data.Id_pro, formData, config )
        .then(res=>{
            console.log(res)
        })
        .catch(function(errors){
            console.log(errors)
        })
    }
}

return(
    <div class="signup-form">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
            {showErr()}
            <p><input type="text" value={data.Name} placeholder="Name" name="Name" onChange={handleIP}></input></p>
            <p><input type="text" value={data.Price} placeholder="Price" name="Price" onChange={handleIP}></input></p>
            <p><input type="text" value={data.Category} placeholder="Category" name="Category" onChange={handleIP}></input></p>
            <p><input type="text" value={data.Brand} placeholder="Brand" name="Brand" onChange={handleIP}></input></p>
            <p><input type="file" name="File" onChange={xulyFile} multiple></input>
            {renderImg()}
            </p>
            <p><input type="text" value={data.Status} placeholder="Status" name="Status" onChange={handleIP}></input></p>
            <p><input type="text" value={data.Company} placeholder="Company" name="Company" onChange={handleIP}></input></p>
            <p><input type="text" value={data.Detail} placeholder="Detail" name="Detail" onChange={handleIP}></input></p>
            <p><input type="text" value={data.Sale} placeholder="Sale" name="Sale" onChange={handleIP}></input></p>
            <button type="submit">Update</button>
        </form>
    </div>
)

}
export default Edit_product;

