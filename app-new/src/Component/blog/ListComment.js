import axios from "axios";
import { useEffect, useState } from "react";


function ListComment(props){
	const cmt = props.arr;
	// console.log(cmt)

	function handle(e){
		e.preventDefault();
		let id = e.target.id;
		props.getId(id);
		// console.log(id)
	}

	function renderData(){
		if((cmt).length > 0){
			return (cmt).map((value,key)=>{
				if(value.id_comment == 0){
					return(
					<div>
						<li key={key} class="media second-media">
								<a class="pull-left" href="#">
									<img  class="media-object" src={"http://localhost:8080/laravel8/laravel8/public/upload/user/avatar/" + value.image_user} alt=""/>
								</a>
								<div class="media-body">
									<ul class="sinlge-post-meta">
										<li><i class="fa fa-user"></i>{value.name_user}</li>
										<li><i class="fa fa-clock-o"></i>1:33 PM</li>
										<li><i class="fa fa-calendar"></i> {value.updated_at}</li>
									</ul>
									<p>{value.comment}</p>
								    <a onClick={handle} class="btn btn-primary" id={value.id} href="#cmt"><i class="fa fa-reply"></i>Replay</a>
								</div>
						</li>

						    {cmt.map((value2,key2)=>{
								if(value2.id_comment == value.id) // id_comment.map2 = id.map1
								return(
								<li key={key2} class="media second-media">
									<a class="pull-left" href="#">
										<img class="media-object" src={"http://localhost:8080/laravel8/laravel8/public/upload/user/avatar/" + value2.image_user} alt=""/>
									</a>
									<div class="media-body">
										<ul class="sinlge-post-meta">
											<li><i class="fa fa-user"></i>{value2.name_user}</li>
											<li><i class="fa fa-clock-o"></i>1:33 PM</li>
											<li><i class="fa fa-calendar"></i> {value2.updated_at}</li>
										</ul>
										<p>{value2.comment}</p>
										
									</div>
						        </li>
								)
							})
						    }
						
					 </div>
					)
				}
					
		})
	}
	
	}
	return (
		<div class="response-area">
			<h2>3 RESPONSES</h2>
			<ul class="media-list">
				{renderData()}
			</ul>					
	    </div>
	)
}
export default ListComment;