import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { loginContext } from '../../contexts/loginContext'
import Form from 'react-bootstrap/Form';
import './SignInSignUp.css'
import { Button } from 'react-bootstrap';
import { useSpring,animated } from 'react-spring';
function SignInSignUp() {
  let [,loginUser,userLoginStatus,loginErr,,signUpErr,userSignUpStatus,signUp] = useContext(loginContext)
  const navigate = useNavigate()
  let { register, handleSubmit, formState: { errors } } = useForm()
  let [mode, setMode] = useState(true)
  let submitForm = async (userCredObj) => {
    await loginUser(userCredObj);
    if (userLoginStatus) {
      navigate('/profile')
    }
  }
  let submitSignUpForm = async (userCredObj) => {
    await signUp(userCredObj);
    if (userSignUpStatus) {
      await loginUser({username:userCredObj.username,password:userCredObj.password});
      if (userLoginStatus) {
        navigate('/')
      }
    }
  }
  const fadeInFromLeftAnimation = useSpring({
    to: { opacity: 1, transform: "translateX(0px)" },
    from: { opacity: 0, transform: "translateX(-20px)" },
    config: { duration: 500 },
  });
  useEffect(() => { 
    if (userLoginStatus) {
      navigate('/profile')
    }
  }, [userLoginStatus])
  
  return (
    <div>
      {mode ? (<animated.div style={fadeInFromLeftAnimation} className="container p-3">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <img
            className="image w-100 h-100"
            src="media/UserData.png"
            alt="Card"
          />
        </div>
        <div
          className="col-lg-6 col-md-6 col-sm-12 p-3 border border-2 signindiv"
          id="first"
        >
          <div className="card-body">
            <div className="text-center">
              <h1 className="text-white ">Sign In</h1>
              <p className="text-white ">The key to happiness is to sign in.</p>
            </div>
            <div className="d-block p-4">
              <form onSubmit={handleSubmit(submitForm)}>
                <div className=" mx-auto">
                  <h5 className="text-white ">Username</h5>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Username"
                      {...register("username", {
                        required: {
                          value: "true",
                          message: "* Username is required",
                        },
                        minLength: {
                          value: 4,
                          message: "* Username is Too Small",
                        },
                      })}
                    />
                  {errors.username?.message && (
                    <p className="text-danger">{errors.username?.message}</p>
                  )}
                </div>
                <br/>
                <div className=" mx-auto">
                  <h5 className="text-white">Password</h5>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your Password"
                      {...register("password", {
                        required: {
                          value: "true",
                          message: "* Password is required",
                        },
                        minLength: {
                          value: 8,
                          message: "* Password is Too Small",
                        },
                      })}
                    />
                  {errors.password?.message && (
                    <p className="text-danger">{errors.password?.message}</p>
                  )}
                </div>
                <p className="text-white ">
                  Forget Password?
                  <NavLink className="p-3" to="/reset-password">
                    Reset here
                  </NavLink>
                </p>
                <div className="p-2 text-center ">
                  {loginErr.length !== 0 && (
                    <p className="text-danger text-left text-center">
                      {loginErr}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="col-lg-3 bg-success border-success fw-bold mb-2"
                  >
                    Login
                  </Button>
                  <br/>
                  <p className="text-white ">
                  Don't have an Account?
                  <NavLink className="p-3" onClick={()=>setMode(!mode)}>
                    Create and Account
                  </NavLink>
                </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </animated.div>):(
      <animated.div style={fadeInFromLeftAnimation} className="container p-3">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <img
            className="image w-100 h-100"
            src="media/UserData.png"
            alt="Card"
          />
        </div>
        <div
          className="col-lg-6 col-md-6 col-sm-12 p-3 border border-2 signindiv"
          id="first"
        >
          <div className="card-body">
            <div className="text-center">
              <h1 className="text-white ">Sign Up</h1>
              <p className="text-white ">The key to happiness is to sign up.</p>
            </div>
            <div className="d-block p-4">
              <form onSubmit={handleSubmit(submitSignUpForm)}>
                <div className='row'>
                  <div className=" mx-auto col-md-6">
                    <h5 className="text-white ">First Name</h5>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        {...register("firstname", {
                          required: {
                            value: "true",
                            message: "* First Name is required",
                          },
                        })}
                      />
                    {errors.firstname?.message && (
                      <p className="text-danger">{errors.firstname?.message}</p>
                    )}
                  </div>
                  <div className=" mx-auto col-md-6">
                    <h5 className="text-white ">Last Name</h5>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        {...register("lastname", {
                          required: {
                            value: "true",
                            message: "* Last Name is required",
                          }
                        })}
                      />
                    {errors.lastname?.message && (
                      <p className="text-danger">{errors.lastname?.message}</p>
                    )}
                  </div>
                </div>
                <br/>
                <div className=" mx-auto">
                  <h5 className="text-white ">Email</h5>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      {...register("email", {
                        required: {
                          value: "true",
                          message: "* Email is required",
                        },
                      })}
                    />
                  {errors.email?.message && (
                    <p className="text-danger">{errors.email?.message}</p>
                  )}
                </div>
                <br/>
                <div className=" mx-auto">
                  <h5 className="text-white ">Phone Number (Optional)</h5>
                    <Form.Control
                      type="tel"
                      placeholder="Phone Number"
                      {...register("phone")}
                    />
                  {errors.phone?.message && (
                    <p className="text-danger">{errors.phone?.message}</p>
                  )}
                </div>
                <br/>
                <div className=" mx-auto">
                  <h5 className="text-white ">Username</h5>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Username"
                      {...register("username", {
                        required: {
                          value: "true",
                          message: "* Username is required",
                        },
                        minLength: {
                          value: 4,
                          message: "* Username is Too Small",
                        },
                      })}
                    />
                  {errors.username?.message && (
                    <p className="text-danger">{errors.username?.message}</p>
                  )}
                </div>
                <br/>
                <div className=" mx-auto">
                  <h5 className="text-white">Password</h5>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your Password"
                      {...register("password", {
                        required: {
                          value: "true",
                          message: "* Password is required",
                        },
                        minLength: {
                          value: 8,
                          message: "* Password is Too Small",
                        },
                      })}
                    />
                  {errors.password?.message && (
                    <p className="text-danger">{errors.password?.message}</p>
                  )}
                </div>
                <div className="p-2 text-center ">
                  {signUpErr.length !== 0 && (
                    <p className="text-danger text-left text-center">
                      {signUpErr}
                    </p>
                  )}
                  <br/>
                  <Button
                    type="submit"
                    className="col-lg-3 bg-success border-success fw-bold mb-2"
                  >
                    SignUp
                  </Button>
                  <p className="text-white ">
                    Already have an Account?
                    <NavLink className="p-3" onClick={()=>setMode(!mode)}>
                      Sign In
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
    )}
    </div>
  );
}
export default SignInSignUp