import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import './App.css';

// configuration for particles lib (background)
const particlesOptions = {
        particles: {
          numbers: {
            value: 60
          },
          density: {
            enable: true,
            value_area: 800
          }
        }
      };

const defaultImage = 'https://img.waz.de/img/incoming/crop231702901/588780267-w1200-cv4_3-q85/Shutterstock-Creative-7.jpg';

const url ='http://localhost:3000'; //'https://limitless-lake-68008.herokuapp.com'

const initalState = {
  input: defaultImage,
  imageUrl: '',
  boxes:[],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age:''
  }
};

class App extends Component {
  constructor(){
    super();
    this.state = initalState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch(url+'/signin',{
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.id) {
          fetch(`${url}/profile/${data.id}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
          .then(response => response.json())
          .then(user => {
            if(user && user.email){
              this.loadUser(user);
              this.onRouteChange('home');
            }
          })
        }
      })
      .catch(console.log);
    }
  }

  // componentDidMount(){
  //   fetch('http://localhost:3001/')
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  // }

  loadUser = (data) => {
    const { id, name, email, entries, joined, age } = data;
    this.setState({ user: {
        id: id,
        name: name,
        email: email,
        entries: entries,
        joined: joined,
        age: age
      }
    });
  }

  calculateFaceLocation = (data) => {
    if (data && data.outputs) {
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);

      const retVal = data.outputs[0].data.regions.map( (element) => {
        let clarifaiFace = element.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
      });
      return retVal;
    }
    return [];
  }

  displayFaceBox = (boxes) => {
    if(boxes) {
      this.setState({boxes: boxes});
    } else {
      this.setState({boxes: null});
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // call ai-api
  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});

    fetch(url+'/imageurl',{ 
      method:'post',
      headers: {
        'Content-Type':'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then((response) => {
      if (response) {
        fetch(url+'/image',{ 
          method:'put',
          headers: {
            'Content-Type':'application/json',
            'Authorization': window.sessionStorage.getItem('token')
          },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count } ))
        })
        .catch(console.log);
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch((err) => console.log(err));
  }

  removeAuthTokenInSessions = () => {
    const key = 'token';
    const token = sessionStorage.getItem(key);
    if (token) {
      fetch(url+'/signout',{
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.authorization === false) {
          window.sessionStorage.removeItem(key);
        }
      })
      .catch(console.log);
    }
  }

  onRouteChange = (route) => {
    if(route === 'signedout'){
      this.removeAuthTokenInSessions();
      return this.setState(initalState);
    } else if (route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  }

  render() {
    const { input, imageUrl, route, boxes, isSignedIn, isProfileOpen, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal} route={route}/>
        { isProfileOpen ? 
          <Modal>
            <Profile 
              isProfileOpen={isProfileOpen} 
              toggleModal={this.toggleModal}
              loadUser={this.loadUser}
              user={user}
              url={url}
              />

          </Modal> : null }
        { route === 'home'
          ? 
          <div>
              <Logo />
              <Rank 
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onPictureSubmit={this.onPictureSubmit}
                input={input}
              />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
            </div>
          : (
              route === 'signin'
              ?
              <Signin 
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser}
                url={url}
              />
              :
              <Register 
                onRouteChange={this.onRouteChange} 
                loadUser={this.loadUser}
                url={url}
              />
            )
        }
      </div>
    );
  }
}

export default App;
