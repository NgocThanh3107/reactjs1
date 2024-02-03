import axios from "axios";
import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";

function Login(){

const [getData, setGetData] = useState({
	Email: "",
	Pass: "",
	Level: 0
})


const [err,setErr] = useState("")

const navigate = useNavigate();

function handleIP(e){
	let getName= e.target.name
	let getValue = e.target.value
	setGetData(state => ({...state,[getName]:getValue}))
}
function log(e){
    e.preventDefault();
    let errObj={};
    let x=1;
    if(getData.Email == ""){
        errObj.Email = "Vui long nhap email"
        x=2;
    }
    if(getData.Pass == ""){
        errObj.Pass = "Vui long nhap pass"
        x=2;
    }
	// if(getData.Level == ""){
	// 	errObj.Level = "Vui long nhap level";
	// 	x=2;
	// }
	setErr(errObj)
	if(x==1){
		let data = {
			email: getData.Email,
			password: getData.Pass,
			level: 0
		}
		axios.post("http://localhost:8080/laravel8/laravel8/public/api/login", data)
			.then((res) =>{
				console.log(res)
				if(res.data.errors){
					setErr(res.data.errors)	
				}else{
					
					localStorage.setItem("checkLogin", true);

					let auth = res.data.Auth;
				    let local = JSON.stringify(auth);
					localStorage.setItem("auth",local)

					let token = res.data.token;
					localStorage.setItem("token",token)

					navigate("/");
				}
			})
			.catch(function (error){
				console.log(error)
			})
		
	}else{
		alert("lỗi")
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
        <div class="col-sm-4 col-sm-offset-1">
	 		<div class="login-form">
	 			<h2>Login to your account</h2>
					<form action="#" onSubmit={log}>
						{showErr()}
	 					<input type="email" placeholder="Email Address" name="Email" onChange={handleIP}/>
						<input type="password" placeholder="Password" name="Pass" onChange={handleIP}/>
						<input type="text" placeholder="Level" name="Level" onChange={handleIP} />
	 				<span>
	 					<input type="checkbox" class="checkbox"/> 
						    Keep me signed in
					</span>
	 				<button type="submit" class="btn btn-default">Login</button>
					</form>
			</div>
	 	</div>
    )
}
export default Login;