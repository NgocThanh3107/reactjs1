import axios from "axios"
import { useEffect, useState } from "react"


    let token = localStorage.getItem("token");

    let auth =  localStorage.getItem("auth");
        auth = JSON.parse(auth);

    let id_blog = localStorage.getItem("Id");
     

function Comment(props){
    let idcha = props.id;

    const [item, setItem] = useState({
        message:""
    });
    let comments = item.message;  
   
    const [err,setErr] = useState([]);

    function handleIP(e){
        let getName= e.target.name
        let getValue = e.target.value
        setItem(state => ({...state,[getName]:getValue}))
    }
    
    function handleSubmit(e){
        e.preventDefault();
        let login = localStorage.getItem("checkLogin");
        
        let errObj = {};

        if(login == null){
            errObj.Comment = "vui long dang nhap";
            setErr(errObj)
        }else{
            // da logiin roi 
            if(item.message == ""){
                errObj.message = "vui long nhap binh luan"
                setErr(errObj)
            }else{
                let config ={
                    headers: {
                        'Authorization': 'Bearer '+ token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                };

              
                const formData = new FormData();
                formData.append('id_blog', id_blog);
                formData.append('id_user', auth.id);
                // formData.append('id_comment', 0);
                formData.append('id_comment', idcha ? idcha : 0);
                formData.append('comment', comments);
                formData.append('image_user', auth.avatar);
                formData.append('name_user', auth.name);

                axios.post("http://localhost:8080/laravel8/laravel8/public/api/blog/comment/" + id_blog, formData, config)
                .then((res) =>{
                        // console.log(res.data.data);
                    if(res.data.errors){
                        setErr(res.data.errors)	
                    }else{  
                        // localStorage.setItem("cmt",res.data.data.comment)
                        props.getCmt(res.data.data); 
                        console.log(res.data.data);
                    }
                })
                .catch(function(error){
                    console.log(error)
                })
            }
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

    return(	
        <div class="replay-box">
			<div class="row">
				<div class="col-sm-12">
					<h2>Leave a replay</h2>		
                    <div class="text-area">
                        <div class="blank-arrow">
                            <label>Your Name</label>
                        </div>
                        <span>*</span>
                        {showErr()}
                        <form onSubmit={handleSubmit} id="cmt">    
                            <textarea name="message" rows="11" onChange={handleIP} ></textarea>
                            <button type="submit" class="btn btn-primary">Post comment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
                     
    )
}
export default Comment;