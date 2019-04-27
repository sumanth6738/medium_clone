import React from 'react' 
import axios from '../../config/axios'
import FormStory from './FormStory'

class EditStory extends React.Component {
    constructor(props){
        super(props) 
        this.state = {
            story : {},
            topic: {}
            
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount (){
        const {id} = this.props.match.params
        axios.get(`/stories/${id}`)
        .then(response => {
            this.setState(()=> ({story : response.data}))
        })
       
    }

    handleSubmit(formData) {
       // console.log('note new component')
        axios.put(`/stories/${this.state.story._id}`, formData)
            .then(() => this.props.history.push(`/stories/${this.state.story._id}`))
            .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
                <h2> Edit Story</h2>
                <FormStory
                  story = {this.state.story}
                  handleSubmit = {this.handleSubmit}
                  />
            </div>
        )
    }
}

export default EditStory