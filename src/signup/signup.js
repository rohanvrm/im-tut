import { Link } from 'react-router-dom';
import React from 'react';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
const firebase = require("firebase");

class signupComponent extends React.Component{


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
                        <Input type='password' onChange={(e)=> this.userTyping('passwordconfirmation', e) } id='signup-password-confirmation-input'></Input>
                    </FormControl>

                    <Button type='submit' fullWidth varaint='contained'  className={classes.submit}> Submit</Button>

                </form>
                </Paper>

                </main>
            );
        }
        userTyping=(type,e)=>{

            console.log(type,e);
        }
        submitSignup=(e)=>{
            console.log('SUBMITTING');
        }

}
export default withStyles(styles)(signupComponent);