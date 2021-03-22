import React from 'react';
import ChatListComponent from '../chatlist/chatlist'
//import NewChatComponent from '../NewChat/newChat';
import ChatViewComponent from '../chatview/chatView';
import ChatTextBoxComponent from '../chattextbox/chatTextBox';
import styles from './styles';
import { Button, withStyles } from '@material-ui/core';
import firebase from '@firebase/app';
require('firebase/auth');
class dashboardComponent extends React.Component{

    constructor() {
        super();
        this.state = {
          selectedChat: null,
          newChatFormVisible: false,
          email: null,
          friends: [],
          chats: []
        };
      }


        render()
        {
            const {classes}=this.props;
            return(
        <div>
            
            <ChatListComponent history={this.props.history}
                newChatBtnFn={this.newChatBtnClicked}

                selectChatFn={this.selectChat}
                
                chats={this.state.chats}
                userEmail={this.state.email}
                seclectedChatIndex={this.state.selectedChat} 
                >
                
            </ChatListComponent>
           
            {
              this.state.newChatFormVisible ?
               null : <ChatViewComponent user={this.state.email} 
               chat={this.state.chats[this.state.selectedChat]}>
                  
               </ChatViewComponent>
            }
            
               
            {
               this.state.selectedChat !== null && 
               !this.state.newChatFormVisible ?
                <ChatTextBoxComponent
                 userClickedInputFn={this.messageRead} submitMessageFn={this.submitMessage}>

                 </ChatTextBoxComponent> : null
            }
            
              <Button className={classes.signOutBtn}  onClick={this.signOut}>
                  Sign out ! 

              </Button>
        </div>
            );
        }

        signOut = () => firebase.auth().signOut();

        selectChat=(chatIndex)=> {
         // console.log('index :', chatIndex);
            this.setState({selectedChat:chatIndex})
        }

        submitMessage = (msg) => {
          const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat]
            .users
            .filter(_usr => _usr !== this.state.email)[0])
          firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .update({
              messages: firebase.firestore.FieldValue.arrayUnion({
                sender: this.state.email,
                message: msg,
                timestamp: Date.now()
              }),
              receiverHasRead: false
            });
        }

        // Always in alphabetical order:
  // 'user1:user2'
  buildDocKey = (friend) => [this.state.email, friend].sort().join(':');
        

        newChatBtnClicked=()=> this.setState({newChatFormVisible: true,selectedChat:null})

        componentDidMount = () => {            
            firebase.auth().onAuthStateChanged(async _usr => {
              if(!_usr)     //if user doesnt exist 
                this.props.history.push('/login');
              else {
                await firebase
                  .firestore()
                  .collection('chats')
                  .where('users', 'array-contains', _usr.email)
                  .onSnapshot(async res => {
                    const chats = res.docs.map(_doc => _doc.data());
                    await this.setState({
                      email: _usr.email,
                      chats: chats,
                      friends: []
                    });
                    console.log(this.state);
                  })
              }
          });
        }

    }
export default withStyles(styles)(dashboardComponent);