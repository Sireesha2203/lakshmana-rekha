import { useState , useEffect } from "react"
import axios from "axios";
import { loginContext } from "./loginContext";

function UserLoginStore({children}){
    const [currentUser,setCurrentUser]=useState({});
    const [loginErr,setLoginErr]=useState("")
    const [signUpErr,setSignUpErr]=useState("")
    const [userLoginStatus,setUserLoginStatus]=useState(false)
    const [userSignUpStatus,setUserSignUpStatus]=useState(false)
    //function to make user login reuqest
    const loginUser=async(userCredObj)=>{
        await axios.post("/user-api/user-login",userCredObj)
        .then((response)=>{
            if(response.data.message==="success"){
              setCurrentUser({ ...response.data.user });
              setLoginErr("");
              setUserLoginStatus(true);
              //store jwt token in local or session storage
              localStorage.setItem("token", response.data.token);
            }
            else{
                setLoginErr(response.data.message)
            }
            //navigate to user profile
            //console.log("navigated to user profile")
        })
        .catch((err)=>{
            console.log("err in user login:",err)
            setLoginErr(err)
        })
    }
    const signUp = async (userCredObj) =>{
      await axios.post("/user-api/user-signup",userCredObj)
        .then((response)=>{
            if(response.data.message==="User Created"){
              setSignUpErr("");
              setUserSignUpStatus(true);
            }
            else{
              setUserSignUpStatus(false);
              setSignUpErr(response.data.message)
            }
        })
        .catch((err)=>{
            setUserSignUpStatus(false);
            console.log("err in user login:",err)
            setSignUpErr(err)
        })
    }
    //userlogout
    const logoutUser=()=>{
        //clear local or session storage
        localStorage.clear();
         //update user login status
         setUserLoginStatus(false)

    }
    //to add in userlogincontextstore.js
    const checkTokenAndFetchUser = async () => {
        // Check if a token exists in local storage
        const token = localStorage.getItem('token');
      
        if (!token) {
          // No token, return null indicating no authenticated user
          return null;
        }
      
        // Token exists, send a request to verify it with the server
        try {
          const response = await axios.post('/user-api/verify-token', null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (response.data.message === 'Token is valid') {
            // Token is valid, fetch user data
            const userDataResponse = await axios.get('/user-api/get-user-info', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      
            const user = userDataResponse.data.payload;
            setUserLoginStatus(true);
            setCurrentUser(user)
            // console.log(user)
            // return user;
          } else {
            // Token verification failed, return null
            return null;
          }
        } catch (error) {
          // Handle network errors or any other issues
          console.error(error);
          return null;
        }
      };
      useEffect(() => {
        // Function to calculate the distance between two coordinates (Haversine formula)
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const toRadians = (degrees) => degrees * (Math.PI / 180);
            const R = 6371; // Radius of the Earth in km
            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        };
    
        // Function to calculate days since user creation
        const calculateDaysSinceCreation = () => {
            const creationDate = localStorage.getItem("userCreatedDate");
            if (!creationDate) {
                localStorage.setItem("userCreatedDate", new Date().toISOString());
                console.error("User creation date not found in localStorage.");
                return null;
            }
            const creationDateObj = new Date(creationDate);
            const today = new Date();
            const diffTime = Math.abs(today - creationDateObj);
            return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days
        };
        // Function to prompt user for location safety
        const promptLocationSafety = (latitude, longitude) => {
          const isSafe = window.confirm("Is this location safe?");
          if (isSafe) {
              // Add location to coordinates array
              const storedCoordinates = JSON.parse(localStorage.getItem("coordinatesArray")) || [];
              const updatedCoordinates = [
                  ...storedCoordinates,
                  { lat: latitude, lon: longitude, timestamp: new Date().toISOString() },
              ];
              localStorage.setItem("coordinatesArray", JSON.stringify(updatedCoordinates));
          } else {
              // Log coordinates to the console
              console.log(`Unsafe location detected: Latitude: ${latitude}, Longitude: ${longitude}`);
          }
        };
    
        // Function to get and store location
        const updateLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
    
                    const daysSinceCreation = calculateDaysSinceCreation();
                    if (daysSinceCreation === null) return;
    
                    if (daysSinceCreation <= 7) {
                        // Logic for the first 7 days
                        const storedCoordinates = JSON.parse(localStorage.getItem("coordinatesArray")) || [];
                        const lastCoords = storedCoordinates[storedCoordinates.length - 1];
    
                        if (
                            !lastCoords || // No previous coordinates
                            calculateDistance(lastCoords.lat, lastCoords.lon, latitude, longitude) >= 4 // Moved >= 4 km
                        ) {
                            const updatedCoordinates = [
                                ...storedCoordinates,
                                { lat: latitude, lon: longitude, timestamp: new Date().toISOString() },
                            ];
                            localStorage.setItem("coordinatesArray", JSON.stringify(updatedCoordinates));
                        }
                    } else {
                        // Logic for days 8 and beyond
                        const storedCoordinates = JSON.parse(localStorage.getItem("coordinatesArray")) || [];
                        const lastCoords = storedCoordinates[storedCoordinates.length - 1];

                        if (
                            !lastCoords || // No previous coordinates
                            calculateDistance(lastCoords.lat, lastCoords.lon, latitude, longitude) >= 4 // Moved >= 4 km
                        ) {
                            promptLocationSafety(latitude, longitude);
                        }
                    }
                },
                (error) => {
                    console.error("Error fetching location:", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        };
    
        // Run location update every 10 minutes
        const intervalId = setInterval(updateLocation, 10 * 60 * 1000); // 10 minutes
    
        // Initial location update
        updateLocation();
    
        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);    
    
    useEffect(() => {
        checkTokenAndFetchUser();
    }, []);
    return(
        <loginContext.Provider value={[currentUser,loginUser,userLoginStatus,loginErr,logoutUser,signUpErr,userSignUpStatus,signUp,checkTokenAndFetchUser]}>
            {children}
        </loginContext.Provider>
    )
}
export default UserLoginStore;