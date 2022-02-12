import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = (props) => {
    return(
    <div>
        <p className='i f3'>
            {'This smart mind will detect faces in your pictures. Git it a try!'}
        </p>
        <div className='center'>
            <div className='form center pa4 br3 shadow-5'>
                <input 
                    className='f4 pa2 w-70 center' type="text"
                    onChange={props.onInputChange}
                    placeholder={'Image url...'}
                    value={props.input}
                    />
                <button 
                    className='b w-30 grow f4 link ph3 pv2 dib white bg-mid-gray'
                    onClick={props.onPictureSubmit}>
                    {'Detect'}
                </button>
            </div>
        </div>
    </div>
    );
}

export default ImageLinkForm;