import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import { UserContext } from "../../UserContext";
function Products(){
const use = useContext(UserContext);

const use1 = useContext(UserContext);
// console.log(use1)
const [data,setData] = useState([]);
// console.log(data)
useEffect(()=>{
    axios.get("http://localhost:8080/laravel8/laravel8/public/api/product/list")
    .then(res=>{
        // console.log(res)
        setData(res.data.data.data)
    });
	
},[]);


let Obj={};
// let Qty=0;
function handleAdd_cart(e){
	e.preventDefault(); 
	const id_pr = e.target.id;
	if (id_pr.trim() !== ''){
		let cart = localStorage.getItem("cart");
		if(cart){
			Obj = JSON.parse(cart)
			if(Obj[id_pr]){
			   Obj[id_pr] += 1;
			}else {
				Obj[id_pr] = 1;	
			}
		}else {
			Obj[id_pr] = 1;
		}
	}else{
		console.log("giá trị Id rỗng")
	}	
	localStorage.setItem("cart", JSON.stringify(Obj));
	tongQty();
}

function tongQty(){
	let totalQty = 0;
	let getQty = localStorage.getItem("cart")
		if(getQty){
			Obj = JSON.parse(getQty);
			Object.keys(Obj).map(function(key){
				totalQty += Obj[key];
			})
		}
		// console.log(totalQty)
	localStorage.setItem("cart", JSON.stringify(Obj));
    use.loginContext(totalQty);
}

let WL = {};
function add_wishlist(e){
	e.preventDefault(); 
	const getid = e.target.id;
	if (getid.trim() !== '') {
	let wlist = localStorage.getItem("W_list");
		if(wlist){
			WL = JSON.parse(wlist)
			if(!WL[getid]){
				WL[getid] = 1;
			}
		}else{
			WL[getid] = 1;
		}
	localStorage.setItem("W_list", JSON.stringify(WL));
	}else{
		console.log("giá trị Id rỗng")
	}
	tongWL();
}

function tongWL(){
	let totalWL = 0;
	let getQty = localStorage.getItem("W_list")
		if(getQty){
			WL=JSON.parse(getQty)
			Object.keys(WL).map(function(key){
				totalWL += WL[key];
			})
		}
		// console.log(totalWL)
	    localStorage.setItem("W_list", JSON.stringify(WL));	
    use1.Wl(totalWL);
}

function renderData(){
	if(data.length > 0){
		return data.map((value,key)=>{
			let images = data[key]["image"];
			let img = JSON.parse(images);
			return(
				<div class="col-sm-4">
					<div class="product-image-wrapper">
						<div class="single-products">
							<div class="productinfo text-center">
											<img src={"http://localhost:8080/laravel8/laravel8/public/upload/product/" + data[key]["id_user"] + "/" + img[0] } alt="" />
											<h2>{data[key]["price"]}</h2>
											<p>{data[key]["name"]}</p>
											<a onClick={handleAdd_cart} id={data[key]["id"]} class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
							</div>
							<div class="product-overlay">
								<div class="overlay-content">
									<h2>{data[key]["price"]}</h2>
									<p>{data[key]["name"]}</p>
									<a onClick={handleAdd_cart} id={data[key]["id"]} class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
								</div>
							</div>
						</div>
						<div class="choose">
							<ul class="nav nav-pills nav-justified">
								<li><a onClick={add_wishlist} id={data[key]["id"]} href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
								<li><a href="#"><i class="fa fa-plus-square"></i>Add to compare</a></li>
								<li><Link to={"http://localhost:3000/products/detail/" + data[key]["id"] }>More</Link></li>
							</ul>
						</div>
					</div>
				</div>
				
			)
		})
	}
}
    return(
        <div class="col-sm-9 padding-right">
            <div class="features_items">
            <h2 class="title text-center">Features Items</h2>
            {renderData()}
            </div>
        </div>

    )
}
export default Products;