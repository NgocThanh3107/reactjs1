import MenuAccount from "../layout/MenuAccount";
import Update from "./Update";

function Account(){
    
    return(
		<div class="container">
			<div class="row">
				<div class="col-sm-3">
					<div class="left-sidebar">
						{<MenuAccount />}
					
						
					</div>
				</div>
				<div class="col-sm-9">
					<div class="blog-post-area">
						<h2 class="title text-center">Update user</h2>
						 {<Update />}
					</div>
				</div>
			</div>
		</div>
	
    )
}
export default Account;