import { Link } from "react-router-dom";

function MenuAccount(){
    return(		
        <div class="col-sm-3">
			<div class="left-sidebar">
				<h2>Category</h2>
				<div class="panel-group category-products" id="accordian">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title"><a href="#">ACCOUNT</a></h4>
					    </div>
					</div>
					<div class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title"><a href="http://localhost:3000/account/myproduct">MY PRODUCT</a></h4>
						</div>
					</div>	
				</div>
			</div>
		</div>

    )
}
export default MenuAccount;