import React from 'react'
import axios from '../../config/axios'
import FormTopic from './FormTopic'
//import {Form, Col, Button} from 'react-bootstrap'

class NTopic extends React.Component{
    constructor(){
        super()
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    handleSubmit(formData) {
        //console.log('notenew component')
        axios.post('/topics', formData)
            .then(() => this.props.history.push('/topics'))
            .catch(err => console.log(err))
    }
   
    render(){
        return(
            <div>
               
               <h2> Add Topic </h2>
                <FormTopic handleSubmit={this.handleSubmit} /> 
            </div>
        )
    }
}
export default NTopic

