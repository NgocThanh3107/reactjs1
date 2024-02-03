import Header from "./Component/layout/Header";
import Footer from "./Component/layout/Footer";
import MenuLeft from "./Component/layout/MenuLeft";
import { useLocation } from "react-router-dom";
import Account from "./Component/layout/MenuAccount";
import { UserContext} from "./UserContext";
import { useState } from "react";
import Test from "./Component/Page/Test";

// cau truc 1 component : la nhung doan html dc viet ben trong js
function App(props){
  let params1 = useLocation();
  // console.log(params1)
  const [getTongQty,setTongQty] = useState(0);
  const [getwl,setGetwl] = useState(0);
  function loginContext(x){
    // console.log(x)
    setTongQty(x)
  }
  function Wl(y){
    setGetwl(y)
  }
  
 return(
  <div>
    <UserContext.Provider value = {
      {
      getTongQty:getTongQty,
      loginContext:loginContext,
      getwl:getwl,
      Wl:Wl
      }
    }
    >
      <Header />
      <Test />
      <section>
        <div className="container">
          <div className="row">
            {params1['pathname'].includes("account") ? <Account /> : <MenuLeft />}
            {props.children}
          </div>
        </div>
      </section>
      <Footer/>
     
    </UserContext.Provider>
    
  </div>
 )
  // bai 12: textarea, select 
}
export default App;