import React from 'react' 
import {Form, Col, Button} from 'react-bootstrap'

class FormTopic extends React.Component {
    constructor() {
        super() 
        this.state = {
          name:''
        }
        // bind methods, sets the context of the this keyword
       
        this.handleSubmit = this.handleSubmit.bind(this) 
    }

    // es6 arrow function
    handleChange = (e) => {
        const name = e.target.value 
        // console.log(this) 
        this.setState(() => ({name }))
    }

   
    componentWillReceiveProps(nextProps){
        const{name} = nextProps.topic
        this.setState(()=>({
           name
        }))
    }

    handleSubmit(e) {
        e.preventDefault() 
        const formData = {
           name: this.state.name
          
        }

        this.props.handleSubmit(formData)

        // clear form 

        this.setState(() => ({ 
           name: ''
        }))
      
    }

    render() {
        return (
            <div>
                
                <Form as={Col} md="6" >
                    <Form.Group as={Col} md="8" controlId="formBasicName">
                        {/* <Form.Label> Email </Form.Label> */}
                        <Form.Control type="text" value={this.state.name} onChange={this.handleChange} name="name" placeholder="Topic Name" required />
                        {/* <Form.Control.Feedback type="invalid">
                            Please Enter Email
                        </Form.Control.Feedback> */}
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
               
            </div>
        )
    }
}

export default FormTopic