import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: ''
        };
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const User = {
            username: this.state.username
        };

        console.log(User);
        axios.post('/api/users/add',User)
        .then(res=>{console.log(res.data);window.location = '/';})
    }

    render(){
        return(
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='username'>Username: </label>
                        <input type='text' name='username'
                            required
                            className='form-control'
                            onChange={this.onChangeUsername}
                            value={this.state.username}
                        />
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Create User' className='btn btn-primary' />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUser;