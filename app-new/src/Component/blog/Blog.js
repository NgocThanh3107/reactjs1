import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Blog(){

const [getdata,setData]= useState([]);
useEffect(()=>{
    axios.get("http://localhost:8080/laravel8/laravel8/public/api/blog")
    .then(res =>{
        setData(res.data.blog.data)       
    })
    .catch(function (error) {
        console.log(error)
    })
},[])

function renderData(){
    if(getdata.length > 0){
        return getdata.map((value, key)=>{
            return (
				<div class="single-blog-post">
							<h3>{value.title}</h3>	
							<div class="post-meta">
								<ul>
									<li><i class="fa fa-user"></i> Mac Doe</li>
									<li><i class="fa fa-clock-o"></i> 1:33 pm</li>
									<li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
								</ul>
								<span>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star-half-o"></i>
								</span>
							</div>
							<a href="">
								<img src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/" + value.image } alt=""/>
							</a>
							<p>{value.description}</p>
							<Link class="btn btn-primary" to={"http://localhost:3000/blog/detail/" + value.id}>Read More</Link>
				</div>   
						
			)
        })
    }

}
    return (
        <div className="col-sm-9">
			<div className="blog-post-area">
			    <h2 class="title text-center">Latest From our Blog</h2>
						{renderData()}			
						<div class="pagination-area">
							<ul class="pagination">
								<li><a href="" class="active">1</a></li>
								<li><a href="">2</a></li>
								<li><a href="">3</a></li>
								<li><a href=""><i class="fa fa-angle-double-right"></i></a></li>
							</ul>
						</div>   
			</div>		
        </div>                	                 
    )	
}
export default Blog;
