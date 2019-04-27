import React from "react"
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

import { Form, Col,Button, Jumbotron, } from 'react-bootstrap'

class UserRegister extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            validated: false,
            message:'',
            notice:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    

    handleSubmit(e){
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
            
        }  
           
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
          }
          this.setState({ validated: true });
          
        console.log(this.state.validated)

        if(this.state.validated === true){
        axios.post('http://localhost:3005/users/register',formData)
            .then(() => {
                this.setState(() => ({
                username:'', email:'', password:'',validated: false, notice: 'Successfully registered, redirecting to login page'
                }))  
                setTimeout(()=>{
                    this.props.history.push("/users/login")
                },2000)
            })
            .catch(err => console.log(err))
        }
    }
        
            handleChange(e){
                e.persist()
                // when ever we r taking event obj directly inside the event handler or directly 
                // inside the setState method then we suppose to call persist
                this.setState(()=> ({
                    [e.target.name]: e.target.value
                }))
            }
             

    
    render(){
        const { validated } = this.state;
        return(
            <div><center>
                <Jumbotron as={Col} md="8">
 
                <center>
                <h1>Join Blog</h1>
                <p>Create an account to receive great stories in your inbox, personalize your homepage, and follow authors and topics that you love.</p>
                <h3>Register</h3>
                {this.state.notice && <p>{this.state.notice}</p>}
               
                <Form as={Col} md="6" noValidate
        validated={validated}>
                    <Form.Group as={Col} md="8" controlId="formBasicUsername">
                        {/* <Form.Label > Username </Form.Label> */}
                        <Form.Control type="text" value={this.state.username} onChange={this.handleChange} name="username" placeholder="Enter Username" required/>
                        <Form.Control.Feedback type="invalid">
                             Please Enter Username
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="8" controlId="formBasicEmail">
                        {/* <Form.Label> Email </Form.Label> */}
                        <Form.Control type="text" value={this.state.email} onChange={this.handleChange} name="email" placeholder="Enter email" required />
                        <Form.Control.Feedback type="invalid">
                             Please Enter Email
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="8" controlId="formBasicPassword">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="Password" required />
                        <Form.Control.Feedback type="invalid">
                             Please Enter Password
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
                <br></br>
                <p>Already have an account? <Link to="/users/login">Log in</Link></p>
                <p>To make Blog work, we log user data and share it with service providers. Click “Submit” above to accept Blog’s Terms of Service & Privacy Policy.</p>
                </center>
                </Jumbotron>
                </center>
            </div>
        )
    }
}
export default UserRegister