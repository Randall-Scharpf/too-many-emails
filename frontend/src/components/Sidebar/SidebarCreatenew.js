import React from "react";
import {useState} from 'react';


export default function SidebarCreatenew({}){

    const [message,setMessage] = useState('')


    const handleclick =() =>{ //handleclick option for create
        alert('clicked')
        //change create button to text box
        return(
          <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="enter new address"
            id="message"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message} />
            </form>
        )
      }
      const handleSubmit = event => {
        event.preventDefault()
        //check if $message is okay 
        //if so add to stack of emails
        //else error message

        

      
        alert(`The name you entered was: ${message}`)


        
      }

      



      return(
        <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="enter new address"
          id="message"
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message} />
          </form>
      )


}