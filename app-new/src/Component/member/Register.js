import axios from "axios";
import { useEffect, useState } from "react"
import { redirect } from "react-router-dom";

function Register(){
	const [getData, setGetData] = useState({
		Email:"",
		Pass:"",
		Name:"",
		Phone:"",
		Address:"",
		Level:0
	}
	);
	   
	   const [err, setErr] = useState("")
	   
	function handleIP(e){
		  let getName= e.target.name
		  let getValue = e.target.value
		  setGetData(state => ({...state,[getName]:getValue}))
	} 
	   

		const [File, setFile] = useState({
			Avatar : ""
		})

		const [avatar, setAvatar] = useState("")
			
	function xulyFile(e){	
			const file = e.target.files; 
	
			let reader = new FileReader();
			reader.onload = (e) =>{
			setAvatar(e.target.result)
			setFile(file[0]);	
	        };
		reader.readAsDataURL(file[0]);	
		
	}

	function hanldeSubmit(e){
		e.preventDefault();
		let errObj={};
		let x =1;
		if(getData.Name == ""){
			errObj.Name = "vui long nhap ten"
			x = 2;
		  } 
		if(getData.Email == ""){     
		    errObj.Email= "vui long nhap email";
		    x = 2;
		}
		if(getData.Pass == ""){   
		    errObj.Pass = "vui long nhap pass";  
		    x=2;
		} 
		if(getData.Address == ""){
			errObj.Adress = "vui long nhap dia chi";
			x = 2;
		}
		if(getData.Phone == ""){
			errObj.Phone = "vui long nhap sdt";
			x = 2;
		}
		// if(getData.Level ==""){
		// 	errObj.Level = "Vui long nhap level";
		// 	x = 2;
		// }
		if(File.Avatar == ""){
			errObj.Avatar = "vui long chon hinh anh";
			x = 2;
		}else{
			let getSize = File['size'];
			let getNames = File['name'];
						 
			if(getSize > 1024 * 1024){
			    errObj.getSize = "file lớn hơn 1Mb,vui lòng chọn lại"
			    x = 2;
			}
	
			let text =["png", "jpg", "jpeg","PNG", "JPG"];
			let demo = getNames;      
			let myarr = demo.split(".");
			  
		   if(text.includes(myarr[1]) == 0){
			    errObj.text = "lỗi định dạng file"
			    x = 2;
		   }
		   
		} 
		if(x==1){
		  alert("Dang ky thanh cong")
		  let xx = JSON.stringify(getData);
	      localStorage.setItem("getlocal", xx)
			// lây cái thong tin gui qua api 
		    let data = {
				email: getData.Email,
				password: getData.Pass,
				name: getData.Name,
				phone: getData.Phone,
				address: getData.Address,
				avatar: avatar,
				level: 0	
			}
			
			axios.post("http://localhost:8080/laravel8/laravel8/public/api/register", data)
			.then((res) =>{
				// console.log(res)
			})
			.catch(function(error){
				console.log(error)
			})
		
		}else{
		  setErr(errObj);
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

    return (
        <div class="col-sm-4">
					<div class="signup-form">
						<h2>New User Signup!</h2>
						<form action="#" onSubmit={hanldeSubmit} enctype="multipart/form-data">
							{showErr()}
							<input type="text" placeholder="Name" name="Name" onChange={handleIP}/>
							<input type="email" placeholder="Email Address" name="Email" onChange={handleIP}/>
							<input type="password" placeholder="Password" name="Pass" onChange={handleIP}/>
							<input type="text" placeholder="Phone" name= "Phone" onChange={handleIP} />
							<input type="text" placeholder="Address" name="Address" onChange={handleIP} />
							<input type="file" placeholder="Avatar" name="Avatar" onChange={xulyFile} /> 
							<input type="text" placeholder="Level" name="Level" onChange={handleIP} />
							<button type="submit" class="btn btn-default">Signup</button>
						</form>
					</div>
				</div>
    )
   
}
export default Register;