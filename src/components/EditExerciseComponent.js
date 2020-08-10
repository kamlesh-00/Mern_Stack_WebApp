import React, { Component } from 'react';

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';

class EditExercise extends Component{

    constructor(props){
        super(props);
        this.state={
            username:'',
            description:'',
            duration:0,
            date:new Date(),
            users:[]
        }
        this.onChange = this.onChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        axios.get('/api/exercises/'+this.props.match.params.id)
        .then(res=>{
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })
            }
        ).catch(err=>console.log(err));
    
        axios.get('/api/users')
        .then(res=>{
            if(res.data.length>0){
                this.setState({
                    users:res.data.map(data=>data.username)
                })
            }
        })
    }

    onChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if(name==='duration'){
            this.setState({
                duration: Number(value)
            })
        }else{
            this.setState({
                [name]: value
            })
        }
    }

    onChangeDate(datee){
        this.setState({
            date: datee
        })
    }

    onSubmit(e){
        e.preventDefault();
        const exercise = {
            username:this.state.username,
            description:this.state.description,
            duration:this.state.duration,
            date:this.state.date
        }

        console.log(exercise);

        axios.update('/api/exercises/update/'+this.props.match.params.id,exercise)
        .then(res=>console.log(res.data));

        // window.location = '/';
    }

    render(){
        return(
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='username'>Username: </label>
                        <select ref='userInput'
                            required
                            className='form-control'
                            value={this.state.username}
                            name='username'
                            onChange={this.onChange}>
                            {
                                this.state.users.map(user=>{
                                    return(
                                        <option key={user}
                                            value={user}>
                                                {user}
                                        </option>
                                    );
                                })
                            }
                            </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description: </label>
                        <input type='text' name='description'
                            required
                            className='form-control'
                            value={this.state.description}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='duration'>Duration: </label>
                        <input type='text' name='duration'
                            className='form-control'
                            value={this.state.duration}
                            onChange={this.onChange}    
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='date'>Date: </label>
                        <DatePicker 
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Edit Exercise Log' className='btn btn-primary' />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditExercise;