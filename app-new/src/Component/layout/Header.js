import { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

function Header(){
const use = useContext(UserContext);
// console.log(use);
let cart = use.getTongQty;
localStorage.setItem("icon_cart", JSON.stringify(cart));
// localStorage.setItem("cart", JSON.stringify(cart));
const use1 = useContext(UserContext);
let wlist = use1.getwl;

	const Navigate = useNavigate();

	function renderLogin(){
		let local1 = localStorage.getItem("checkLogin");
		if(local1 != null){
			return(
				<li><a onClick={logout}><i class="fa fa-lock"></i>Logout</a></li>
			)
		}else{
			return(
				<li><Link to="/login"><i class="fa fa-lock"></i> Login</Link></li>
			)
		}
    }
	
	function logout(){
		localStorage.clear()
		Navigate("/login")

	}

    return(
        <header id="header">
		<div class="header_top">
			<div class="container">
				<div class="row">
					<div class="col-sm-6">
						<div class="contactinfo">
							<ul class="nav nav-pills">
								<li><a href=""><i class="fa fa-phone"></i> +2 95 01 88 821</a></li>
								<li><a href=""><i class="fa fa-envelope"></i> info@domain.com</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-6">
						<div class="social-icons pull-right">
							<ul class="nav navbar-nav">
								<li><a href=""><i class="fa fa-facebook"></i></a></li>
								<li><a href=""><i class="fa fa-twitter"></i></a></li>
								<li><a href=""><i class="fa fa-linkedin"></i></a></li>
								<li><a href=""><i class="fa fa-dribbble"></i></a></li>
								<li><a href=""><i class="fa fa-google-plus"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		
		<div class="header-middle">
			<div class="container">
				<div class="row">
					<div class="col-md-4 clearfix">
						<div class="logo pull-left">
							<a href="index.html"><img src="images/home/logo.png" alt="" /></a>
						</div>
						<div class="btn-group pull-right clearfix">
							<div class="btn-group">
								<button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
									USA
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu">
									<li><a href="">Canada</a></li>
									<li><a href="">UK</a></li>
								</ul>
							</div>
							
							<div class="btn-group">
								<button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
									DOLLAR
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu">
									<li><a href="">Canadian Dollar</a></li>
									<li><a href="">Pound</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-md-8 clearfix">
						<div class="shop-menu clearfix pull-right">
							<ul class="nav navbar-nav">
								<li><Link to="http://localhost:3000/account"><i class="fa fa-user"></i> Account</Link></li>
								<li><Link to="http://localhost:3000/wishlist"><i class="fa fa-star"></i>{wlist}</Link></li>
								<li><Link to=""><i class="fa fa-crosshairs"></i> Checkout</Link></li>
								<li><Link to="http://localhost:3000/cart"><i class="fa fa-shopping-cart"></i>{cart}</Link></li>
								{renderLogin()}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	
		<div class="header-bottom">
			<div class="container">
				<div class="row">
					<div class="col-sm-9">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
						</div>
						<div class="mainmenu pull-left">
							<ul class="nav navbar-nav collapse navbar-collapse">
								<li><Link to="http://localhost:3000">Home</Link></li>
								<li class="dropdown"><a href="#">Shop<i class="fa fa-angle-down"></i></a>
                                    <ul role="menu" class="sub-menu">
                                        <li><Link to="http://localhost:3000/products">Products</Link></li>
										<li><Link to="http://localhost:3000/products/detail">Product Details</Link></li> 
										<li><Link to="">Checkout</Link></li> 
										<li><Link to="http://localhost:3000/cart">Cart</Link></li> 
										<li><Link to="http://localhost:3000/login">Login</Link></li> 
                                    </ul>
                                </li>
								<li class="dropdown"><Link to="" class="active">Blog<i class="fa fa-angle-down"></i></Link>
                                    <ul role="menu" class="sub-menu">
                                        <li><Link to="http://localhost:3000/blog/list">Blog List</Link></li>
										<li><Link to="" class="active">Blog Single</Link></li>
                                    </ul>
                                </li> 
								<li><Link to="">404</Link></li>
								<li><Link a="">Contact</Link></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="search_box pull-right">
							<input type="text" placeholder="Search"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
	
    )
}
export default Header;