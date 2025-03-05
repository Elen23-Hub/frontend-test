import  React from 'react'; 

function FaceRecognition({imageUrl}) {
    return (
        <div className='center'>
            <img alt='' src={imageUrl} />
        </div>
    );
}

export default FaceRecognition;
