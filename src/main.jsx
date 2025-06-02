import React, {Component, StrictMode} from "react";
import { createRoot } from "react-dom/client";
import Navigation from "./components/Navigation/Navigation.jsx";
import Signin from "./components/Signin/signin.jsx";
import Register from "./components/Register/Register.jsx";
import Logo from "./components/Logo/Logo.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import Rank from "./components/Rank/Rank.jsx";
import ParticlesBg from 'particles-bg';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";
import './index.css';
import "tachyons/css/tachyons.min.css";

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {    
  input: "",     // that is what the user will input
  imageUrl: "",   // should get displayed when we click onButtonSubmit
  boxes : [],  //Stores detected face bounding box coordinates.
  route: 'signin',  //Keeps track of the current route of the app.
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {   
    super();    //Calls the parent class (Component) constructor to enable "this".
    this.state = initialState;
  } 

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onInputChange = (event) => {    // It's a prop of the App and will be called when the input field changes, we receive an event
    this.setState({ input: event.target.value });  //Updates the state of the component with the value of the input field.
  } 

  onButtonSubmit = () => {    //This function is called when the submit button is clicked.
    const IMAGE_URL = this.state.input;   //Stores the value of the input field in a variable.
    console.log('About to fetch Clarifai API');
    this.setState({ imageUrl: IMAGE_URL });   //Updates imageUrl in the state to display the submitted image.

    fetch(`${API_URL}/imageurl`, {
    // fetch(`/imageurl`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        input: IMAGE_URL })
    })
      .then(response => response.json())
      .then(result => {
        if (result) {
          fetch(`${API_URL}/image`, {
          // fetch(`/image`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
         // .catch(console.log)  Intentional vulnerability - Missing .catch block
        }

                        //Extracts first output from the API response[] and then gets face detection regions
        const regions = result.outputs[0].data.regions;
        const boxes = regions.map(region => {   //Loops through and maps the detected face regions to an array of bounding boxes.
          const boundingBox = region.region_info.bounding_box;
            return {
              topRow: parseFloat (boundingBox.top_row.toFixed(3)),     //parseFloat - converts rounded values to numbers
              leftCol: parseFloat (boundingBox.left_col.toFixed(3)),   // toFixed - rounds the value to 3 decimal places
              bottomRow: parseFloat (boundingBox.bottom_row.toFixed(3)),
              rightCol: parseFloat (boundingBox.right_col.toFixed(3))
            }
          }
          );
        this.setState({ boxes });  //Updates the state with the detected face bounding boxes.

        regions.forEach(region => {    // Logs face detection concepts & confidence and prints them to the console.
            region.data.concepts.forEach(concept => {
                // Accessing and rounding the concept value
                const name = concept.name;
                const value = concept.value.toFixed(4);

                console.log(`${name}: ${value}`);  
            });
        });
      })
     .catch(error => console.log('error',error));
  }

  onRouteChange = (route) => {   //This function is called when the route changes. 
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route:route});  //Our route is going to be what we give it.
  }
  

  render() {
    const { isSignedIn, route, imageUrl, boxes } = this.state;
    return (
      <StrictMode>
          <ParticlesBg type="circle" bg={true} />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          { this.state.route === 'home' 
             ? <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm  
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit}/>                
                <FaceRecognition 
                  imageUrl={imageUrl}
                  boxes={boxes}/>
                </div>
              : (route === 'signin' 
                  ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                )
          }
      </StrictMode>
    );
  }
}  

createRoot(document.getElementById('root')).render (<App />);
