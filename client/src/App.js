import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import axios from './config/axios';
import Home  from './components/layout/Home'
import UserRegister from './components/aunthentication/Register'
import UserLogin from './components/aunthentication/Login'
import LHome from './components/layout/LHome'
import LTopic from './components/Topic/TList'
import NTopic from './components/Topic/NTopic'
import EditTopics from './components/Topic/EditTopics'
import ShowTopic from './components/Topic/ShowTopic'
import StoryList from './components/Story/StoryList'
import NStory from './components/Story/NStory'
import EditStory from './components/Story/EditStory'
import ShowStory from './components/Story/ShowStory'


class App extends Component{
  constructor(props){
    super(props) 
    this.state = {
      isAuthenticated: !!localStorage.getItem('token'),
    }
    this.handleIsAuthenticated = this.handleIsAuthenticated.bind(this)
  }

  handleIsAuthenticated(bool) {
    this.setState(() => ({
      isAuthenticated: bool
    }))
  }


  render(){
    return(
      <BrowserRouter>
        <div className='container-fluid'> 
          {
              !this.state.isAuthenticated && (
                <div>
                  <Row >
                    <Col> <h1>Blog</h1></Col>
                      <Col md={3}>
                      <Link to="/" > Home </Link> || 
                      <Link to="/users/register" > Register </Link> || 
                      <Link to="/users/login"> Login</Link> 
                    </Col>
                  </Row>
                </div>
              )
          }

          {
            this.state.isAuthenticated && (
            <div>
              <Row>
                  <Col> <h1>Blog</h1></Col>
                  <Col md={3}>
                  <Link to="/home">H0ME</Link>||
                  <Link to="/topics"> Topics </Link>||
                  <Link to="/stories">Stories</Link>||
                  <Link to="/users/logout">Logout</Link>
                </Col>
              </Row> 
            </div> 
            )
          }
                      
          <hr/>
          
         <Switch>
            <Route path="/" component = {Home} exact={true} />
            <Route path="/home" component = {LHome} exact={true} />

            <Route path="/topics" component = {LTopic} exact={true}/>
            <Route path="/topics/new" component = {NTopic} exact={true}/>
            <Route path="/topics/edit/:id" component={EditTopics} exact={true}/>
            <Route path="/topics/:id" component={ShowTopic} exact={true}/>

            <Route path="/stories" component = {StoryList} exact={true}/>
            <Route path="/stories/new" component = {NStory} exact={true}/>
            <Route path='/stories/edit/:id'component = {EditStory} exact={true} />
            <Route path="/stories/:id" component={ShowStory} exact={true}/>

            <Route path="/users/register" component={UserRegister} exact={true}/>
            <Route path="/users/login" render={() => <UserLogin  handleIsAuthenticated={this.handleIsAuthenticated}/> } /> 
            <Route path='/users/logout' component={()=> {
              localStorage.clear()
              axios.defaults.headers['x-auth'] = null
              //   setTimeout(()=>{
              //     this.props.history.push("/")
              // },2000)
              return(
                <div>
                  <p>Successfully logged out</p>
                  
                </div>
              )
            }} />
          </Switch>
        </div>
      </BrowserRouter>
      
    )
  }
}
export default App;
