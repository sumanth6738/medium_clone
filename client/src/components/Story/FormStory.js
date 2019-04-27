import React from 'react' 
import {Form, Col, Button} from 'react-bootstrap'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import axios from '../../config/axios'

import CreatableSelect from 'react-select/lib/Creatable';


class FormTopic extends React.Component {
    constructor() {
        super() 
        this.state = {
          title:'',
          description: '',
          body:'',
          ispublished:'',
          topics:[],
          topicId:'',
          tags:'',
          Tags:[],
       
        }
        // bind methods, sets the context of the this keyword
        
        this.handleSubmit = this.handleSubmit.bind(this) 
      
    }

    componentDidMount() {
        axios.get('/topics')
            .then(response => this.setState(() => ({ topics: response.data })))
            // console.log(this.state.topics)      
    }

    handleTitleChange = (e) => {
        const title = e.target.value
        this.setState(()=>({title}))
    }
    handleDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(()=>({description}))
    }
    handleBodyChange = (e) => {
        const body = e.target.value
        this.setState(()=>({body}))
    }
    // onEditorStateChange: Function = (editorState) => {
    //     this.setState({
    //       editorState: editorState.getCurrentContent()
    //     });
    //   };
    
    
      handleTopicChange = (e) => {
        const topicId = e.target.value

        this.setState(()=>({topicId}))
      }
    handleTagChange = (e) => {
        const tags = e.map(tag => tag.value)
        const Tag= tags
        this.setState(()=>({
            tags: Tag
        }))
    }
    
    

   
    componentWillReceiveProps(nextProps){
        const{title, description, body, topicId,tags} = nextProps.story
        this.setState(()=>({
           title,
           description,
           body,
           topicId,
           tags
        }))
    }

    handleSubmit(e) {
        e.preventDefault() 
        const formData = {
           title: this.state.title,
           description: this.state.description,
           body: this.state.body,
           topicId: this.state.topicId,
          tags: this.state.tags
        }
        const tagData ={
            tags: this.state.tags
        }
        this.props.handleSubmit(formData,tagData)
        console.log(formData)
        // clear form 
        console.log(tagData)

        this.setState(() => ({ 
           title: '',
           description:'',
           body: '',
           topicId:'',
           tags:''
        }))
      
    }
    componentDidMount(){
        axios.get(`/topics`)
        .then(response => this.setState (()=> ({topics : response.data})))
        axios.get(`/tags`)
        .then(response => this.setState (()=> ({Tags : response.data})))
    }
    render() {
        // const { editorState } = this.state;
    //    console.log(this.state.topics)
       const options = this.state.Tags.map(tag => {
           return {value: tag._id, label: tag.name}
       })
        return (
            <div>
                
               <Form as={Col} md="6" >
               
                    <Form.Group as={Col} md="8" controlId="formBasicName">
                        <Form.Label> Email </Form.Label>
                        <Form.Control type="text" value={this.state.title} onChange={this.handleTitleChange}  placeholder="title" required />
                        
                    </Form.Group>
                    <Form.Group as={Col} md="8" controlId="formBasicDescription">
                        <Form.Label> Email </Form.Label>
                        <Form.Control as="textarea" rows='2' value={this.state.description} onChange={this.handleDescriptionChange}  placeholder="description" required />
                        
                    </Form.Group>
                   
                     {/* <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows="10" value={this.state.body} onChange={this.handleBodyChange}  placeholder="body" />
                    </Form.Group> */}
                    <CKEditor
                    editor={ ClassicEditor }
                    data = {this.state.body}
                    // // data="<p>Hello from CKEditor 5!</p>"
                    // onInit={ editor => {
                    //     // You can store the "editor" and use when it is needed.
                    //     console.log( 'Editor is ready to use!', editor );
                    // } }
                    onChange={ ( event, editor ) => {
                        
                        let body = editor.getData();
                        // striptags(body);
                       
                        this.setState(()=>({body}))
                      
                    //    console.log( { event, editor, body } );
                    } }
                    onBlur={ editor => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ editor => {
                        console.log( 'Focus.', editor );
                    } }
                />
                    
                    <br></br>
                    <Form.Group controlId="exampleForm.ControlSelect1" >
                        <Form.Label>Topic</Form.Label>
                       
                        <Form.Control as="select" value={this.state.topicId} onChange={this.handleTopicChange}>
                    {/* <select value={this.state.topicId} onChange={this.handleTopicChange}> */}
                        <option>--SELECT--</option>
                        {this.state.topics.map(topic => {
                                return (
                                    <option key={topic._id} value={topic._id}>{topic.name}</option>
                                )
                            })
                        }
                    {/* </select> */}
                        </Form.Control>
                    </Form.Group>
                    
                    <CreatableSelect
                        isClearable
                        onChange={this.handleTagChange}
                        isMulti
                        options={options}
                    />
                    <br/>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
               
            </div>
        )
    }
}

export default FormTopic