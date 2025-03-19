# Frontend

Smart-brain is my first attempt to create a web application that detects faces in images using an AI model from Clarifai. Built with React for the frontend and Node.js for the backend, it allows users to register, sign in, and track their image submissions.

## Live Demo
The project was deployed on **Render**. Check out the live app here: (https://pythia-btyu.onrender.com/)

## Features
- User authentication (register and sign in)
- Upload an image URL to detect faces
- Bounding boxes drawn around detected faces
- User score tracking for submitted images
- Beautiful UI with Particles.js animation

## Technologies Used
### Frontend
- React (built with Vite)
- CSS / HTML
- Tachyons (for styling)
- Particles-bg

### Backend (Not included in this repo)
- Node.js with Express
- Clarifai API (for face detection)
- bcryptjs for hashing passwords
- PostgreSQL database and knex.js to connect it to the backend server 
- You can find more info at the backend repository here: (https://github.com/Elen23-Hub/Smart-brain-server)
