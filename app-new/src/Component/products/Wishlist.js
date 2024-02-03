import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
function Wishlist(){
    const [data,setData] = useState([]);
    const use1 = useContext(UserContext);
    const use = useContext(UserContext);
    useEffect(()=>{
        axios.get("http://localhost:8080/laravel8/laravel8/public/api/product/wishlist")
        .then(res=>{
            setData(res.data.data)
        });
    },[]);
    
    // Lọc data 
    let Obj_wl = localStorage.getItem("W_list");
        Obj_wl = JSON.parse(Obj_wl);
    const newArray = data.filter(item => Obj_wl[item.id]);

    let WL = {};
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

    function XoaWL(e){
        e.preventDefault();
        let getid= e.target.id;
        let newData = [...data];
        if(newData.length > 0){
            newData.map((value,key)=>{
                if(value.id == getid){
                   delete newData[key];
                }
            })
        }
        let newArray = newData.filter(function(v){return v!==''})
        setData(newArray); 
    // local:
        let W_list = localStorage.getItem("W_list");
        if(W_list){
            WL = JSON.parse(W_list)
            if(WL[getid]){
                delete WL[getid];
            }
        }
        localStorage.setItem("W_list", JSON.stringify(WL));  
        tongWL();
    }


    let Obj={};
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
    function renderData(){
        if(newArray.length > 0){
            return newArray.map((value,key)=>{
                let images = newArray[key]["image"];
                let img = JSON.parse(images);
                return(
                    <div class="col-sm-4">
                        <div class="product-image-wrapper">
                            <div class="single-products">
                                <div class="productinfo text-center">
                                                <img src={"http://localhost:8080/laravel8/laravel8/public/upload/product/" + newArray[key]["id_user"] + "/" + img[0] } alt="" />
                                                <h2>{newArray[key]["price"]}</h2>
                                                <p>{newArray[key]["name"]}</p>
                                                <a onClick={handleAdd_cart} id={newArray[key]["id"]} class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                                </div>
                                <div class="product-overlay">
                                    <div class="overlay-content">
                                        <h2>{newArray[key]["price"]}</h2>
                                        <p>{newArray[key]["name"]}</p>
                                        <a onClick={handleAdd_cart} id={newArray[key]["id"]} class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                                    </div>
                                </div>
                            </div>
                            <div class="choose">
                                <ul class="nav nav-pills nav-justified">
                                    <li><a onClick={XoaWL} id={newArray[key]["id"]} ><i class="fa fa-plus-square"></i>Delete to wishlist</a></li>
                                    <li><a href="#"><i class="fa fa-plus-square"></i>Add to compare</a></li>
                                    <li><Link to={"http://localhost:3000/products/detail/" + newArray[key]["id"] }>More</Link></li>
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
export default Wishlist;