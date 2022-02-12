import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation = (props) => {
    
        if(props.isSignedIn){
            return(
                <nav style={{display:'flex', justifyContent:'flex-end'}}>
                    <ProfileIcon onRouteChange={props.onRouteChange} toggleModal={props.toggleModal}/>
                </nav>);
        } else {
            return(
                <nav style={{display:'flex', justifyContent:'flex-end'}}>
                    <p 
                        className={`f3 link dim black pa3 pointer 
                            ${props.route === 'signin' ? 'underline':''}`}
                        onClick={() => props.onRouteChange('signin')}>
                        {'Signin'}
                    </p>
                    <p 
                        className={`f3 link dim black pa3 pointer 
                        ${props.route === 'register' ? 'underline':''}`}
                        onClick={() => props.onRouteChange('register')}>
                        {'Register'}
                    </p>
                </nav>);
        }
}

export default Navigation;