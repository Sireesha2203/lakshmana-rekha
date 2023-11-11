import './SignUp.css'
import React from 'react'
import {useForm} from 'react-hook-form'
import {Button} from 'react-bootstrap'

function SignUp(props) {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let submitForm=(userObj)=>{
    console.log(userObj)
  }
   

  return (
    <div className='container w-50' id="dim">
    <div className=" reg container mt-5 ">
      <style> @import url('https://fonts.googleapis.com/css2?family=Archivo+Narrow:ital,wght@0,500;1,400&family=Berkshire+Swash&family=Carter+One&family=DM+Serif+Text:ital@1&family=Khand&family=Oleo+Script&family=Permanent+Marker&family=Righteous&display=swap'); </style>
        <h2 className='text-center mx-auto'>Student Sign up</h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="row row-cols-1 row-cols-lg-2">
            <div className="col mx-auto">            
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text"  className='form-control mb-3' placeholder='Username' {...register("firstname",{required:{value:"true",message:"* Username is required"},minLength:{value:4,message:"* Username is Too Small"},maxLength:{value:8,message:"* Username is Too Big"}})}/>
                    {errors.firstname?.message && <p className="text-danger">{errors.firstname?.message}</p> }            
            </div>
            <div className="col mx-auto">            
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" className='form-control mb-3'  placeholder='Username' {...register("lastname",{required:{value:"true",message:"* Username is required"},minLength:{value:4,message:"* Username is Too Small"},maxLength:{value:8,message:"* Username is Too Big"}})}/>
                        {errors.lastname?.message &&<p className="text-danger">{errors.lastname?.message}</p>}              
            </div>
            <div className="col mx-auto">            
                    <label htmlFor="birthday">Date of Birthday</label>
                    <input type="date"  className='form-control mb-3' placeholder='birthday'{...register("dateOfBirth",{required:true,max:"2005-12-20"})}/>
                        {errors.dateOfBirth?.type==="required"&&<p className="text-danger">* DOB is required</p>}      
            </div>

          <div>            
            <label htmlFor="gender">Gender</label>
            <div className="row row-cols-1 row-cols-sm-2 ">
              <div className="form-check col">
              <input type="radio" id="male" value="Male" {...register("gender",{required:{value:"true",message:"please select the gender"}})} />
              <label htmlFor="male" className="form-check-label ">Male</label>
              </div>
              <div className="form-check col">
              <input type="radio" id="female" value="Female" {...register("gender",{required:{value:"true",message:"please select the gender"}})} />
              <label htmlFor="female" className="form-check-label ">Female</label>
              </div>
              {errors.gender?.message && <p className='text-danger'>{errors.gender?.message}</p>}
            </div> 
          </div>

          <div className="col mx-auto" >
            <label htmlFor="email">Email</label>
            <input type="email" className='form-control' placeholder='emali id'  {...register("email",{required:{value:"true",message:"* email is required"}})}/>
            {errors.email?.message &&<p className="text-danger">{errors.email?.message}</p>}   
          </div>

          <div className="col mx-auto">
            <label htmlFor="number">Phone Number</label>
            <input type="number"  id="" className='form-control' placeholder="phone number" {...register("number",{required:{value:"true",message:"*Phone number is required"},minLength:{value:10,message:"*Phone number length should be 10"},maxLength:{value:10,message:"*Phone number length should be 10"}})} />
            {errors.number?.message && <p className='text-danger'>{errors.number?.message}</p> }
          </div>
          </div> 

          <div className="row row-cols-1 ">
        
          </div>
          <div className='text-center'>
          <button type='submit' className="btn mr-0 mt-3 btn-info ">Submit</button>
          </div>
         
          <div>Already a user?<Button onClick={()=>{props.setSign("signin")}}>SignIn</Button></div>
           
          </form>
    </div></div>
  )
}

export default SignUp;
