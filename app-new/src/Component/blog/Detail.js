
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";

function Detail(){
 
const [getdata, setData] = useState([]);
const param = useParams();

let id = getdata.id;
localStorage.setItem("Id",id);

const [getComment, setGetComment] = useState([]);
const [Id, setGetID] = useState("");

function getCmt(getData){   
   const list = getComment.concat(getData);
   setGetComment(list);
}

function getId(id){
   setGetID(id);
}

useEffect(()=>{
    axios.get("http://localhost:8080/laravel8/laravel8/public/api/blog/detail/" + param.id)
    .then(res =>{
        // console.log(res)
        setData(res.data.data)
        setGetComment(res.data.data.comment)
    
    })
    .catch(function (error) {
        console.log(error)
    })
    
},[]);

return (
    <div class="col-sm-9">
            <div class="blog-post-area">
                <h2 class="title text-center">Latest From our Blog</h2> 
                <div class="single-blog-post" >
                    <h3></h3>
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
                        <img src="" alt=""/>
                    </a>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p> 

                    <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> 

                    <p>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p> 

                    <p>
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                    </p>
                    <div class="pager-area">
                        <ul class="pager pull-right">
                            <li><a href="#">Pre</a></li>
                            <li><a href="#">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        <div class="rating-area">
            {<Rate />}
            {/* <ul class="ratings">
                <li class="rate-this">Rate this item:</li>
                <li>
                    <i class="fa fa-star color"></i>
                    <i class="fa fa-star color"></i>
                    <i class="fa fa-star color"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </li>
                <li class="color">(6 votes)</li>
            </ul>
            <ul class="tag">
                <li>TAG:</li>
                <li><a class="color" href="">Pink <span>/</span></a></li>
                <li><a class="color" href="">T-Shirt <span>/</span></a></li>
                <li><a class="color" href="">Girls</a></li>
            </ul> */}
        </div>

        <div class="socials-share">
            <a href=""><img src="images/blog/socials.png" alt=""/></a>
        </div>

        <div class="media commnets">
            <a class="pull-left" href="#">
                <img class="media-object" src="images/blog/man-one.jpg" alt=""/>
            </a>
            <div class="media-body">
                <h4 class="media-heading">Annie Davis</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <div class="blog-socials">
                    <ul>
                        <li><a href=""><i class="fa fa-facebook"></i></a></li>
                        <li><a href=""><i class="fa fa-twitter"></i></a></li>
                        <li><a href=""><i class="fa fa-dribbble"></i></a></li>
                        <li><a href=""><i class="fa fa-google-plus"></i></a></li>
                    </ul>
                    <a class="btn btn-primary" href="">Other Posts</a>
                </div>
            </div>
        </div>
        
        {<ListComment arr= {getComment} getId={getId}/>}

        <div>
        			
		{<Comment getCmt = {getCmt} id={Id}/>}
				
        </div>
    </div>	 
)

}
export default Detail;