import { Link } from 'react-router-dom'; //for clicking text based link
import React from 'react';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
//import { makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//const firebase = require("firebase");

import firebase from '@firebase/app';
require('firebase/auth');

class signupComponent extends React.Component{

    constructor(){
        
        super();
        
        this.state={
            email:null,
            password:null,
            passwordConfirmation:null,
            signupError:''
        };
    }
        render()
        {
            const{classes}= this.props;

            

            return(

                <main className={classes.main}>

                <CssBaseline>

                </CssBaseline>

                <Paper className={classes.paper}>
                        <Typography component='h1' variants='h5'>

                            Signup !!
                        </Typography>

                        <form onSubmit={(e)=> this.submitSignup(e)} className={classes.form}>
                                <FormControl required fullWidth margin='normal'>
                                        <InputLabel htmlFor='sign-email-input'>Enter your Email</InputLabel>
                                         <Input autoComplete='email' onChange={(e)=> this.userTyping('email', e)} autoFocus id='sign-email-input'></Input>
                                </FormControl>

                                <FormControl required fullWidth margin='normal'>
                                    
                                    <InputLabel htmlFor='signup-password-input,'>Create A Password</InputLabel>
                                    <Input type='password' onChange={(e)=> this.userTyping('password', e) } id='signup-password-input'></Input>
                                </FormControl>

                                <FormControl required fullWidth margin='normal'>
                                    
                                    <InputLabel htmlFor='signup-password-confirmation-input,'>Confirm Your Password</InputLabel>
                                    <Input type='password' onChange={(e)=> this.userTyping('passwordConfirmation', e) } id='signup-password-confirmation-input'></Input>
                                </FormControl>

                                <Button type='submit' fullWidth varaint='contained'  className={classes.submit}> Submit</Button>

                        </form>
                        <br></br>

                        {

                            this.state.signupError ? <Typography className='classes.errorText'   component='h5'  align='center' variant='h6'>
                                {this.state.signupError}
                            </Typography>  : null
                        }

                        <Typography component='h5'  align='center' variant='h6' className={classes.hasAccountHeader}> Already Have an Account ?</Typography>
                        <Link className={classes.logInLink} align='center' to ='/login'> Login In !</Link>
                </Paper>

                </main>
            );
        }

        formIsValid = () => this.state.password === this.state.passwordConfirmation;

        userTyping=(type,e)=>{
            switch (type) {
                case 'email':
                  this.setState({ email: e.target.value });
                  break;
          
                case 'password':
                  this.setState({ password: e.target.value });
                  break;
          
                case 'passwordConfirmation':
                  this.setState({ passwordConfirmation: e.target.value });
                  break;
          
                default:
                  break;
              }
            
        }
        submitSignup=(e)=>{
           e.preventDefault(); //prevent refreshing of page
            console.log('Submitting!',this.state);
                if(!this.formIsValid())
                {
                    this.setState({signupError:'Passwords does not match !'});
                    return;
                }


              firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
                  .then(authRes=> {
                      const userObj={email: authRes.user.email};
                      

                      firebase.firestore().collection('users')
                      .doc(this.state.email).set(userObj).then(()=>{

                        this.props.history.push('/dashboard')
                      }, dbError => {
                        console.log(dbError);
                        this.setState({signupError:'Failed to add user'});

                      })

                      
                  }, authErr => {
                      console.log(authErr);
                      this.setState({signupError:'Failed to add user'});
                  })

        

        }

}
export default withStyles(styles)(signupComponent);