import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class LTopic extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            topics :[]
        }
    }

    componentDidMount() {
        axios.get('/topics')
            .then(response => this.setState(() => ({ topics: response.data })))
            console.log(this.state.topics)
    }

   render(){
       return (
         <div>
             <Link to="/topics/new">Add Topic</Link>
                {
                    this.state.topics.length === 0 ? (<p> No topics found. Add your first Note</p>) : (
                        <div> 
                           
                            <h2>Listing Topics- {this.state.topics.length} </h2>
                           
                            <ul>
                                {
                                    this.state.topics.map(topic => {
                                        return (
                                            <li key={topic._id}> <b>Name:</b> <Link to={`/topics/${topic._id}`}> {topic.name}</Link><br></br>
                                                               </li>
                                        )
                                    })
                                }
                            </ul>
                                
                        </div>
                    ) 
                }
                <br></br>
         </div>
       )
   } 
}
export default LTopic

