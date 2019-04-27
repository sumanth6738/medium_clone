import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'

class ShowTopic extends React.Component {
      constructor(props){
          super(props)
          this.state = {
              topic : {}
          }
          this.handleDelete = this.handleDelete.bind(this)
      }

      handleDelete (){
          const confirmDelete = window.confirm("Are you sure?")
          if(confirmDelete){
              //api call to delte
              axios.delete(`http://localhost:3005/topics/${this.state.topic._id}`)
              .then(()=> this.props.history.push('/topics'))
              .catch(err => window.alert(err))
          }
      }

      componentDidMount(){
          const id = this.props.match.params.id
          axios.get(`/topics/${id}`)
          
          .then(response => this.setState (()=> ({topic : response.data})))
          
      }

      render (){
          console.log(this.state.topic)
           return (
                  <div>
                      <center><h2>Topic info</h2> </center><br></br>
                      <center>
                      <table border='1' width="300px">
                      
                      <br></br>
                      <center><h2> {this.state.topic.name} </h2></center>
                     
                     <center>
                     <Link to ={`/topics/edit/${this.state.topic._id}`}> edit </Link>

                     <button onClick= {this.handleDelete}>
                        delete 
                     </button>
                     <Link to ="/topics"> back </Link></center>
                      </table>
                      </center>
                     
                   
                     
                  </div>
           )
      }

}

export default ShowTopic