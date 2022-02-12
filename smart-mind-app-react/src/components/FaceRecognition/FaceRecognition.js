import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = (props) => {
    /* create image to detect */
    const image = (props.imageUrl !== '') ? 
        <img id='inputImage' src={props.imageUrl} alt='item to detect' width='500px' height='auto' /> : 
        <img src='' alt='' />;
    
    /* create multiple boxes*/
    const detectionBoxes = props.boxes.map((box,index) => {
        return (<div key={index} 
                className='bounding-box' 
                style={{
                    top: box.topRow,
                    right: box.rightCol,
                    bottom: box.bottomRow,
                    left: box.leftCol
                }}>
        </div>);
    });

    return(
        <div className='center ma3 mb5'>
            <div className='absolute mt2'>
                {image}
                {detectionBoxes}
            </div>
        </div>
    );
}

export default FaceRecognition;