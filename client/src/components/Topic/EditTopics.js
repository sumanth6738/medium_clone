import React from 'react' 
import axios from '../../config/axios'
import FormTopic from './FormTopic'

class EditTopics extends React.Component {
    constructor(props){
        super(props) 
        this.state = {
            topic : {},
            
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount (){
        const {id} = this.props.match.params
        axios.get(`/topics/${id}`)
        .then(response => {
            this.setState(()=> ({topic : response.data}))
        })
    }

    handleSubmit(formData) {
       // console.log('note new component')
        axios.put(`/topics/${this.state.topic._id}`, formData)
            .then(() => this.props.history.push(`/topics/${this.state.topic._id}`))
            .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
                <h2> Edit Topic</h2>
                <FormTopic
                  topic = {this.state.topic}
                  handleSubmit = {this.handleSubmit}
                  />
            </div>
        )
    }
}

export default EditTopics