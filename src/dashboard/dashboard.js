import React from 'react';
import ChatListComponent from '../chatlist/chatlist'

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

        </div>
            );
        }

        selectChat=(chatIndex)=> {
            console.log('Select a Chat',chatIndex);
        }

        newChatBtnClicked=()=> this.setState({newChatFormVisible: true,selectedChat:null})

        componentWillMount = () => {            
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
export default dashboardComponent;