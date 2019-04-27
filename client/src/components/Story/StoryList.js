import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
import { Card, } from 'react-bootstrap'

class StoryList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            stories:[],
            topic: {},
            
        }
    }
    componentDidMount() {
        axios.get('/stories')
            .then(response => this.setState(() => {
                this.state.stories = response.data
                this.state.stories.map(story => {
                    const Id = story.topicId
                    console.log(Id)
                    axios.get(`/topics/${Id}`)
                               .then(response => this.setState(()=> ({ topic: response.data})))   
                    
                })
                
            }))
       
    }
  
        
        
  
   render(){
     //  console.log(this.state.stories)
       return (
         <div className='container-fluid'>
             <Link to="/stories/new">Add Story</Link>
                {
                    this.state.stories.length === 0 ? (<p> No Stories found. Add your first Story</p>) : (
                        <div> 
                           
                            <h2>Listing Stories- {this.state.stories.length} </h2>
                           
                            {
                                    this.state.stories.map(story => {
                                        return (
                                            <div>
                                            <Card border="dark" style={{ width: '50rem' }}>
                                            <Card.Header>{this.state.topic.name}</Card.Header>
                                            <Card.Body>
                                            <Card.Title>{story.title}</Card.Title>
                                            <Card.Text text-right='true'><b>CreatedAt:</b>{story.createdAt}</Card.Text>
                                            <Card.Text>{story.description}<br></br></Card.Text>
                                            {/* <Card.Text>
                                            {story.body}<br></br>
                                            </Card.Text> */}
                                            
                                            </Card.Body>
                                            {/* <center>
                                                <Link to ={`/stories/edit/${this.state.story._id}`}> edit </Link>

                                                <button onClick= {this.handleDelete}>
                                                    delete 
                                                </button>
                                                <Link to ="/topics"> back </Link></center> <br></br> */}
                                                <Link to={`/stories/${story._id}`} className='text-right'> Continue ...</Link>
                                            </Card> <br></br><br></br>
                                            
                                            </div>
                                                              
                                        )
                                    })
                                }   
                              <br></br>
                        </div>
                    ) 
                }
                <br></br>
         </div>
       )
   } 
}
export default StoryList

