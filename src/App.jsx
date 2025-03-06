import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import Rank from "./components/Rank/Rank";
import ParticlesBg from 'particles-bg';
import { useState } from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";


const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = 'f267ee1270f74435a126fb33851fb86c';
  const USER_ID = 'elen23_cyberella';
  const APP_ID = 'facerecognitionbrain';
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;


  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": imageUrl
                }
            }
        }
    ]
});

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
   },
  body: raw
};
return requestOptions;
}   


function App() {
  const [input, setInput] = useState("");
  const [IMAGE_URL, setImageUrl] = useState("");
  // State to store the input URL
  const onInputChange = (event) => {  
    setInput(event.target.value);
  };
  
  const onsubmit = () => {
    const IMAGE_URL = input;
    setImageUrl (IMAGE_URL);
    
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(input))
  .then(response => response.json())
  .then(result => {
      const regions = result.outputs[0].data.regions;

      regions.forEach(region => {
          // Accessing and rounding the bounding box values
          const boundingBox = region.region_info.bounding_box;
          const topRow = boundingBox.top_row.toFixed(3);
          const leftCol = boundingBox.left_col.toFixed(3);
          const bottomRow = boundingBox.bottom_row.toFixed(3);
          const rightCol = boundingBox.right_col.toFixed(3);

          region.data.concepts.forEach(concept => {
              // Accessing and rounding the concept value
              const name = concept.name;
              const value = concept.value.toFixed(4);

              console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
              
          });//
      });
        
  })
  .catch(error => console.log('error', error));
  }


  return (    
    <div className="App">
      <ParticlesBg type="circle" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange = {onInputChange}
        onsubmit = {onsubmit}/>
      <FaceRecognition imageUrl = {IMAGE_URL}/>
    </div>
  );
}

export default App;