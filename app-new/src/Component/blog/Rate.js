import StarRatings from 'react-star-ratings';
import { useEffect, useState } from "react"; 
import axios from 'axios';

        let token = localStorage.getItem("token");
        let auth =  localStorage.getItem("auth");
            auth = JSON.parse(auth);
        let id_blog = localStorage.getItem("Id");

    function Rate(){
        const [rating, setRating] = useState(0);
        // console.log(rating)
       
        useEffect(()=>{
            axios.get("http://localhost:8080/laravel8/laravel8/public/api/blog/rate/" + id_blog) 
            .then(res=>{
               
                // tbc = tong sao rate / so nguoi rate
            // console.log(res.data.data)

            let obj = res.data.data;
    
            let sum = 0;
            
            if(Object.keys(obj).length > 0){
                Object.keys(obj).map((key,index)=>{(
                   sum += obj[key]["rate"]
                )
                    const tbc = sum / Object.keys(obj).length;
                    setRating(tbc);
                }) 
            }
            


            

            })
        },[]);

        function changeRating( newRating, name ){
            setRating(newRating)
           
            // - xu ly logic
            let login = localStorage.getItem("checkLogin");
            if(login==null){
                alert("vui long dang nhap de danh gia");
            }
            else{
                alert("ok")
                // - xu ly api
                let config ={
                    headers: {
                        'Authorization': 'Bearer '+ token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                };

                const formData = new FormData();
                formData.append('blog_id', id_blog);
                formData.append('user_id', auth.id);       
                formData.append('rate', rating);
            
                axios.post("http://localhost:8080/laravel8/laravel8/public/api/blog/rate/" + id_blog, formData, config)
                    .then((res) =>{
                        // console.log(res)    
                    })
                    .catch(function(error){
                        console.log(error)
                    })
            }
        } 

        return (      
          <StarRatings 
            rating={rating}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={6}
            name='rating'
          /> 
        ); 
    }
   export default Rate; 