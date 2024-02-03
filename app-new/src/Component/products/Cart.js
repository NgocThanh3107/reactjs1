import axios from "axios";
import {useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
function Cart(){
    
let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);

const [data,setData] = useState([]);
const use = useContext(UserContext);

useEffect(()=>{
    axios.post("http://localhost:8080/laravel8/laravel8/public/api/product/cart", cart)
    .then(res=>{
        setData(res.data.data)
        // console.log(res.data.data)
    })
},[]);

let obj={};
function handleCong(e){
    e.preventDefault();
    let getId = e.target.id;
    if(data.length > 0){
        const updatedData = data.map((value,key)=>{
            if(value.id == getId){
                return { ...value, qty: value.qty + 1 };
            }   
            return value; 
        }) 
        setData(updatedData); 
    }

//local...  
    let qtyMoi = localStorage.getItem("cart");
    if(qtyMoi){
        obj=JSON.parse(qtyMoi)
        if(obj[getId]){
            obj[getId] += 1;
        }
    }
    localStorage.setItem("cart", JSON.stringify(obj)); 
    tongQty();
}

function handleTru(e){
    e.preventDefault();
    let getId = e.target.id;
    let newData = [...data];
    if(newData.length > 0){
       newData.map((value,key)=>{
            if(value.id == getId){
                let newQty = value.qty - 1;
                if(newQty < 1){
                    delete newData[key];
                }else{  
                    newData[key]['qty'] -= 1; 
                }  
            } 
        })
        let newArray = newData.filter(function(v){return v!==''})
        setData(newArray); 
    } 
//local...  
    let qtyMoi = localStorage.getItem("cart");
    if(qtyMoi){
        obj=JSON.parse(qtyMoi)
        if(obj[getId]){
            obj[getId] -= 1;
        }
        if(obj[getId] == ""){
            delete obj[getId];
        }
        localStorage.setItem("cart", JSON.stringify(obj))    
    } 
    tongQty();
}

function handleDelete(e){
    e.preventDefault();
    let getId = e.target.id;
    let newData = [...data];
    if(newData.length > 0){
        newData.map((value,key)=>{
            if(value.id == getId){
               delete newData[key];
            }
        })
        // console.log(newData)
        let newArray = newData.filter(function(v){return v!==''})
        setData(newArray); 
    }
// local...    
    let dele = localStorage.getItem("cart");
    if(dele){
        obj = JSON.parse(dele)
        if(obj[getId]){
            delete obj[getId];
        }
    }
    localStorage.setItem("cart", JSON.stringify(obj));  
    tongQty();  
}

function tongQty(){
	//tính tổng Qty	
	let totalQty = 0;
	let getQty = localStorage.getItem("cart")
		if(getQty){
			obj = JSON.parse(getQty);
			Object.keys(obj).map(function(key){
				totalQty += obj[key];
			})
			console.log(totalQty)
		}
		localStorage.setItem("cart", JSON.stringify(obj));
    use.loginContext(totalQty);    
}

function renderData(){
    if(data.length > 0){
        return data.map((value,key)=>{
            let img = value.image;
            let images= JSON.parse(img);
            let total = value.price * value.qty;
            return(
                <tr>
                    <td class="cart_product">
                        <a href=""><img width={70} height={50} src={"http://localhost:8080/laravel8/laravel8/public/upload/product/" + value.id_user + "/" + images[0]} alt=""/></a>
                    </td>
                    <td class="cart_description">
                        <h4><a href="">{value.name}</a></h4>
                        <p>Web ID: 1089772</p>
                    </td>
                    <td class="cart_price">
                        <p>{value.price}</p>
                    </td>
                    <td class="cart_quantity">
                        <div class="cart_quantity_button">
                            <a onClick={handleCong} id={value.id} class="cart_quantity_up" > + </a>
                            <input class="cart_quantity_input" type="text" value={value.qty} autocomplete="off" size="2"/>
                            <a onClick={handleTru} id={value.id} class="cart_quantity_down"> - </a>
                        </div>
                    </td>
                    <td class="cart_total">
                        <p class="cart_total_price">{total}</p>
                    </td>
                    <td class="cart_delete">
                        <a class="cart_quantity_delete"><i onClick={handleDelete} id={value.id} class="fa fa-times"></i></a>
                    </td>
                </tr>       
            )
        })
    }
}

return(
    <section id="cart_items">
    <div class="container">
        <div class="breadcrumbs">
            <ol class="breadcrumb">
              <li><a href="#">Home</a></li>
              <li class="active">Shopping Cart</li>
            </ol>
        </div>
        <div class="table-responsive cart_info">
        <table class="table table-condensed">
                <thead>
                    <tr class="cart_menu">
                        <td class="image">Item</td>
                        <td class="description">Name</td>
                        <td class="price">Price</td>
                        <td class="quantity">Quantity</td>
                        <td class="total">Total</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {renderData()}
                </tbody>
            </table>
        </div>
    </div>
</section>
)

}
export default Cart;