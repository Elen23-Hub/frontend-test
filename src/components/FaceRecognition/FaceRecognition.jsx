import  React from 'react'; 
import './FaceRecognition.css';

function FaceRecognition({imageUrl, boxes}) {
    console.log("Received boxes:", boxes); // Check console for output
    return (
        <div className='center ma'>
            <div className='absolute mt2' style={{ position: "relative" }}>
                <img src={imageUrl} width='400px' height='auto'/>
                {boxes.map((box, index) => {
                    return (
                        <div key={index} className='bounding-box'
                            style={{
                                top: `${box.topRow * 100}%`,
                                left: `${box.leftCol * 100}%`,
                                width: `${(box.rightCol - box.leftCol) * 100}%`,
                                height: `${(box.bottomRow - box.topRow) * 100}%`
                            }}
                        />
                    );
                })}
         </div>
        </div>
    );
}

export default FaceRecognition;
