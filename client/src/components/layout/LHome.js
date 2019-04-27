import React from 'react' 
import {Link} from 'react-router-dom'
import axios from '../../config/axios'

class LHome extends React.Component{
    constructor(props){
        super(props)
        this.state={
            storys:[],
            story: {},
            topic:{}
        }
    }
    componentDidMount() {
        axios.get("/story")
        .then(response => this.setState(()=> ({storys:response.data})))
        const id = this.state.storys._id
//console.log(id)
        // axios.get(`/story`)
        // .then(response => this.setState(()=> {
        //     const story = response.data
            
        //   const Id = response.data.topicId
        //   //console.log(Id)
        //   axios.get(`/topics/${Id}`)
        //              .then(response => this.setState(()=> ({story, topics: response.data})))                     
        // }))
      
    }
    
render(){
     //console.log(this.state.story)
    // console.log(this.state.story.title)
    // console.log(this.state.topics)
    return (
        <div className='container-fluid' >
            <h5>
            <center>
          <Link to="/topics/culture">Culture</Link> ||  <Link to="/topics/Technology">Technology</Link> || <Link to="/topics/political">Political</Link> ||  <Link to="/topics/sports">Sports</Link> || 
            </center>
            </h5>
            <h2>Listing Stories- {this.state.storys.length} </h2>
                           
                <ul>
                    {
                        this.state.storys.map(story => {
                            return (
                                <li key={story._id}> <b>Title:</b>  {story.title}<br></br>
                                <b>Body:</b>  {story.body}<br></br>
                                <b>Topic:</b>  {this.state.topic.name}<br></br>
                              
                                </li>
                            )
                        })
                    }
                </ul>
            
        </div>
    )
}
   
}

export default LHome