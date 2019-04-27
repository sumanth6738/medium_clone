import React from 'react'
import axios from '../../config/axios'
import FormStory from './FormStory'
//import {Form, Col, Button} from 'react-bootstrap'

class NStory extends React.Component{
    constructor(){
        super()
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    handleSubmit(formData,tagData) {
        //console.log('notenew component')
        axios.post('/stories', formData)
            .then(() => this.props.history.push('/stories'))
            .catch(err => console.log(err))
        axios.post('/tags',tagData)
        .then((result)=>{console.log(result)})
        .catch(err => console.log(err))
    }
  
   
    render(){
       
        return(
            <div>
               
               <h2> Add Story </h2>
                <FormStory handleSubmit={this.handleSubmit} /> 
            </div>
        )
    }
}
export default NStory
