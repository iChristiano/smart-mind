import React from 'react';
import './Profile.css';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.user.name,
            email: this.props.user.email,
            age: this.props.user.age
        }
    }

    onFormChange = (event) => {
        switch (event.target.name) {
            case 'user-name':
                this.setState({name: event.target.value})
                break;
            case 'user-email':
                this.setState({email: event.target.value})
                break;
            case 'user-age':
                this.setState({age: event.target.value})
                break;
            default:
                return;
        }
    }

    onProfileUpdate = (data) => {
        fetch(this.props.url+'/profile/'+this.props.user.id, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')},
            body: JSON.stringify({ formInput: data })
        })
        .then(resp => {
            if (resp.status === 200 || resp.status === 304 ) {
                this.props.toggleModal();
                this.props.loadUser({...this.props.user, ...data});
            }
        })
        .catch(console.log);
    }

    render() {
        const { user, toggleModal } = this.props;
        const { name, email, age } = this.state;
        return (<div 
            className="profile-modal">
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                <main className="pa4 black-80 w-80">
                    <img
                        src="http://tachyons.io/img/logo.jpg"
                        className="h3 w3 dib" alt="avatar" />
                    <h1>{name}</h1>
                    <h4>{`Image submitted: ${user.entries}`}</h4>
                    <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
                    <hr />
                    <div className="mt3">
                        <label className="mt2 fw6" htmlFor="user-name">Name:</label>
                        <input 
                            className="pa2 ba w-100"
                            placeholder={user.name}
                            type="text" 
                            name="user-name" 
                            id="name" 
                            onChange={this.onFormChange}
                        />
                    </div>
                    <div className="mt3">
                        <label className="mt2 fw6" htmlFor="user-email">Email:</label>
                        <input 
                            className="pa2 ba w-100"
                            placeholder={user.email}
                            type="text" 
                            name="user-email" 
                            id="email" 
                            onChange={this.onFormChange}
                        />
                    </div>
                    <div className="mt3">
                        <label className="mt2 fw6" htmlFor="user-age">Age:</label>
                        <input 
                            className="pa2 ba w-100"
                            placeholder={user.age}
                            type="text" 
                            name="user-age" 
                            id="age"
                            onChange={this.onFormChange}
                        />
                    </div>
                     <div className="profile__submitBtn mt4">
                         <button 
                            className="b pa2 grow pointer hover-white w-40 bg-lightest-blue b--black-20"
                            onClick={ () => this.onProfileUpdate({name, email, age})}>Save</button>
                         <button 
                            className="b pa2 grow pointer hover-white w-40 bg-washed-red b--black-20 "
                            onClick={toggleModal}>Cancel</button>
                     </div>
                </main>
                <div className="modal-close" onClick={toggleModal}>&times;</div>
            </article>
        </div>)
    }
    
}

export default Profile;