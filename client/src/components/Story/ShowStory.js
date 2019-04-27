import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'
import { Jumbotron,Col} from 'react-bootstrap'
//import striptags from 'striptags'
import CKEditor from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

class ShowStory extends React.Component {
      constructor(props){
          super(props)
          this.state = {
              story : {}
          }
          this.handleDelete = this.handleDelete.bind(this)
      }

      handleDelete (){
          const confirmDelete = window.confirm("Are you sure?")
          if(confirmDelete){
              //api call to delte
              axios.delete(`http://localhost:3005/stories/${this.state.story._id}`)
              .then(()=> this.props.history.push('/stories'))
              .catch(err => window.alert(err))
          }
      }

      componentDidMount(){
          const id = this.props.match.params.id
          axios.get(`/stories/${id}`)
          
          .then(response => this.setState (()=> ({story : response.data})))
          
      }

      render (){
         // console.log(this.state.story)
           return (
                <div className='container-fluid'>
                
                <center>
                    <Jumbotron as={Col} md="8" className='text-left' style={{background:'F3F1F1'}} >
                        <h1>{this.state.story.title}</h1>
                        <h6>{this.state.story.description}</h6>
                        {/* <p>{striptags(this.state.story.body)}</p> */}

                        <CKEditor  
                         editor={ BalloonEditor }
                            data = 
                            {this.state.story.body}
                           
                            // data =  { <div> 
                            
                            //         {/* <h1>{this.state.story.title}</h1>
                            //             <h6>{this.state.story.description}</h6> */}
                            //             <p>{this.state.story.body} </p>
                                            
                            //         </div>}
                            onInit={ editor => {
                            editor.isReadOnly = true;
                           
                            } }
                        />


                        <center>
                        <Link to ={`/stories/edit/${this.state.story._id}`}> edit </Link>
                        <button onClick= {this.handleDelete}>
                        delete 
                        </button>
                        <Link to ="/stories"> back </Link></center>
                    </Jumbotron> 

                    </center>
                    
                </div>
           )
      }

}

export default ShowStory