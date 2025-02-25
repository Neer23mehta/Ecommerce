import { useEffect, useState } from "react"
import { Form } from "react-router-dom"
import "/home/tristate/Desktop/Neer/neer/src/EcommerseUI/Signin.css"

const Key = "Inp-Data"
export const signinData = async ({ request }) => {
    try {
      const inp = await request.inp();
      const data = Object.fromEntries(inp)
      console.log(data); 
    } catch (error) {
      console.error(error);
    }
  };
export const SignUP = () => {
    const [inp,setInp] = useState({
        firstname:"",
        middlename:"",
        lastname:"",
        email:"",
        mobilenumber:"",
        password:"",
    })
    useEffect(()=>{
        const InpData = localStorage.getItem(Key);
        if(InpData){
            setInp(JSON.parse(InpData))
        }
    },[])
    const handlesubmit = (e) => {
        e.preventDefault();
        localStorage.setItem(Key,JSON.stringify(inp))
    }
    const handlechange = (e) => {
        const{name,value} = e.target;
        setInp({...inp,[name]:value,});
    }
    return (
        <div className="Signin-Page">
            <Form method="POST" action="/signin"onSubmit={handlesubmit}>
                <div className="Inp">
                    <label>First-Name:</label>
                    <input type="text" placeholder="Firstname" required value={inp.firstname} name="firstname" onChange={handlechange}/>
                    <label>Middle-Name:</label>
                    <input type="text" placeholder="Middlename" required value={inp.middlename} name="middlename" onChange={handlechange}/> 
                    <label>Last-Name:</label>
                    <input type="text" placeholder="Lastname" required value={inp.lastname} name="lastname" onChange={handlechange}/> 
                    <label>Email</label>
                    <input type="email" placeholder="Email" required value={inp.email} name="email" onChange={handlechange}/> 
                    <label>Ph-Number:</label>
                    <input type="number" placeholder="Phone-Number" required value={inp.mobilenumber} name="mobilenumber" onChange={handlechange}/>                  
                    <label>Password:</label>
                    <input type="password" placeholder="password" required value={inp.password} name="password" onChange={handlechange}/>
                </div>
                <div className="Btn">
                    <button type="submit">Submit</button>
                </div>
            </Form>
        </div>
    )
}