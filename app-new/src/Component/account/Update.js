import axios from "axios";
import { useEffect, useState } from "react";

function Update(){
	let token = localStorage.getItem("token");
	
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        Name:"",
        Email:"",
        Pass:"",
        Phone:"",
        Address:"",
        Avatar:""
    });
    // console.log(user.Email)
    const [File, setFile] = useState({
        Avatar : ""
    });
    const [avatar, setAvatar] = useState("");
    
    useEffect(()=>{
        let userData = localStorage.getItem("auth");
       
        if(userData){
            userData = JSON.parse(userData);
            // console.log(userData)
            // userData = userData.user   
            setUser({
                Name: userData.name,
                Email: userData.email,
                Pass: userData.pass,
                Phone: userData.phone,
                Address: userData.address,
                Avatar: userData.avatar
            });
        }
    },[]);

    function handleIP(e){
       let getName= e.target.name
       let getValue = e.target.value
        setUser(state => ({...state,[getName]:getValue}))
    }
    function xulyFile(e){	
        const file = e.target.files; 
        let reader = new FileReader();
        reader.onload = (e) =>{
        setAvatar(e.target.result)
        setFile(file[0]);	
        };
        reader.readAsDataURL(file[0]);	
    }

    let id = localStorage.getItem("auth");
        id = JSON.parse(id)
    let id_user = id.id;

    function hanldeSubmit(e){
		e.preventDefault();
		let errObj={};
		let x =1;
		if(user.Name == ""){
			errObj.Name = "vui long nhap ten"
			x = 2;
		  } 
		if(user.Email == ""){     
		    errObj.Email= "vui long nhap email";
		    x = 2;
		}
		// if(user.Pass == ""){   
		//     errObj.Pass = "vui long nhap pass";  
		//     x=2;
		// } 
		if(user.Address == ""){
			errObj.Adress = "vui long nhap dia chi";
			x = 2;
		}
		if(user.Phone == ""){
			errObj.Phone = "vui long nhap sdt";
			x = 2;
		}
		// if(user.Level ==""){
		// 	errObj.Level = "Vui long nhap level";
		// 	x = 2;
		// }
		if(File.Avatar == ""){
			// errObj.Avatar = "vui long chon hinh anh";
			x = 2;
		}else{
			let getSize = File['size'];
			let getNames = File['name'];
						 
			if(getSize > 1024 * 1024){
			   alert('file lớn hơn 1Mb') 
			   x = 2;
			}
	
			let text =["png", "jpg", "jpeg","PNG", "JPG"];
			let demo = getNames;      
			let myarr = demo.split(".");
			  
		   if(text.includes(myarr[1]) == 0){
			 alert("Loi")
			 x = 2;
		   }
		   
		} 

		if(x==1){
			// lây các thong tin gui qua api 
			let config ={
				headers: {
					'Authorization': 'Bearer '+ token,
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				}
			};
			const formData = new FormData();
                formData.append('email', user.Email);
                formData.append('password', user.Pass);
                formData.append('name', user.Name);
                formData.append('phone', user.Phone);
                formData.append('address', user.Address);
                formData.append('avatar', avatar);
				formData.append('level', 0)

		    
			
			axios.post("http://localhost:8080/laravel8/laravel8/public/api/user/update/" + id_user, formData, config)   
			.then((res) =>{
				console.log(res)
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    let auth1 = res.data.Auth;
				    let	local = JSON.stringify(auth1);
					localStorage.setItem("auth", local)

					let token1 = res.data.token;
					localStorage.setItem("token",token1)
                }    
			})
			.catch(function(error){
				console.log(error)
			})
		
		}else{
		  setErrors(errObj);
		}

	}
    function showErr(){
		if(Object.keys(errors).length > 0){
		  return Object.keys(errors).map((key,index)=>{
			return(
			  <li key={key}>
				{errors[key]}
			  </li>
			)
		  })
		}
		// 401 token
	}

    return (
        <div class="col-sm-4">
					<div class="signup-form">
                        <form action="" onSubmit={hanldeSubmit} enctype="multipart/form-data">
							{showErr()}
                            <input type="text" value={user.Name} placeholder="Name" name="Name" onChange={handleIP} />
							<input type="email" value={user.Email} readOnly placeholder="Email Address" name="Email" onChange={handleIP} />
							<input type="password" placeholder="Password" name="Pass" onChange={handleIP} />
							<input type="text" value={user.Phone} placeholder="Phone" name= "Phone" onChange={handleIP} />
							<input type="text" value={user.Address} placeholder="Address" name="Address" onChange={handleIP} />
							<input type="file" placeholder="Avatar" name="Avatar" onChange={xulyFile} />
							<img src={"http://localhost:8080/laravel8/laravel8/public/upload/user/avatar/" + user.Avatar}></img>
							<input type="text" placeholder="Level" name="Level" onChange={handleIP} />
							<button type="submit" class="btn btn-default">Signup</button>
						</form>
					</div>
				</div>
    )

}
export default Update;