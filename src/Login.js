import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import { useNavigate } from 'react-router'


const Login = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const gotoHome = () =>{
        navigate('/')
    }

    const SigninUser = () =>{
        if(email.length===0){
            toast.warning("Please Enter Email")
        }else if(password.length ===0){
            toast.warning("Please Enter Password")
        }else{
            const body = {
                email,
                password
            }
            
            const url = 'http://localhost:7070/user/signin'
            axios.post(url, body).then((response)=>{
                const result = response.data
                console.log(result)
                if(result['status']=='success'){
                    toast.success('Welcome to SRCTC')

                    const { userId, firstName, lastName, age, gender, email , birthDate, phone, location, role } = result.data

                    sessionStorage['userId'] = userId
                    sessionStorage['firstName']= firstName
                    sessionStorage['lastName']=lastName
                    sessionStorage['age'] = age
                    sessionStorage['gender']= gender
                    sessionStorage['email']= email
                    sessionStorage['birthDate'] = birthDate
                    sessionStorage['phone']= phone
                    sessionStorage['location']= location
                    sessionStorage["role"] = role
                    sessionStorage["loginStatus"] = 1
                    sessionStorage['checkBox'] = 0
                    
                    navigate('/')
                }else{
                    toast.error('Invalid Email or Password')
                }
            })

        }
    }


    return (
    
        <div className='Login'>

            <div>
               
            </div>

            <div className="row">
                <div className="col"></div>
                <div className="col">
                <div className='container loginblock'>
                    <div className='heading'>
                        <h1 className='loginheading'>User Login</h1>
                    </div>
                    <br />
                    <br/>
                    <div className="form">
                        <div className="mb-3">
                            <label className="label-control"><h5>Email</h5></label>
                            <input onChange={(e)=>{
                                setEmail(e.target.value)
                            }} type="email" className="form-control" />
                        </div>
                        <br/>
                        <div className="mb-3">
                            <label className="label-control"><h5>Password</h5></label>
                            <br />
                            <input onChange={(e)=>{
                                setPassword(e.target.value)
                            }} type="password" className="form-control" />
                        </div>

                        <div>
                            Dont have an account yet?<Link to= '/signup' className='text-body'> SignUp here</Link> 
                        </div>

                        <div className="mb-3">
                            <button onClick={SigninUser} className="btn btn-primary">Sign In</button>
                        </div>
                    </div>
                </div> 
                </div>
                <div className="col"></div>
            </div>

          

        </div>
    )
}

export default Login