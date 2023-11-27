import React, { useState , useEffect } from 'react';
import SignIn from './SignIn'
import SignUp from './SignUp'

function SignInSignUp() {
  let [sign,setSign]=useState("signin")
  
  return (
    <div>
        {sign==="signin" && <SignIn sign={sign} setSign={setSign}/>}
        {sign==="signup" && <SignUp sign={sign} setSign={setSign}/>}
    </div>
  )
}

export default SignInSignUp