import React from 'react';
import './Signin.css';

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        };
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    saveAuthTokenInSessions = (token) => {
        window.sessionStorage.setItem('token', token);
        //window.localStorage.setItem('token', token);
    }

    onSubmitSignIn = () => {
        fetch(this.props.url+'/signin', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.userId && data.success === true){
                    this.saveAuthTokenInSessions(data.token);
                    fetch(`${this.props.url}/profile/${data.userId}`, {
                        method: 'get',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': data.token
                        }
                    })
                    .then(response => response.json())
                    .then(user => {
                        if(user && user.email){
                            this.props.loadUser(user);
                            this.props.onRouteChange('home');
                        }
                    })
                }
            }
        );
    }

    render() {
        const { onRouteChange } = this.props;
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="signin__input--bg--hover pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address" 
                                id="email-address" 
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="signin__input--bg--hover b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password" 
                                id="password" 
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"
                            onClick={this.onSubmitSignIn}
                        />
                        </div>
                        <div className="lh-copy mt3">
                        <p 
                            className="f6 link dim black db pointer"
                            onClick={() => onRouteChange('register')}>
                            Register
                        </p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;