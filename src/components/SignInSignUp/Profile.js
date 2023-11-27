import React,{useEffect,useState} from 'react'
import { useAuth, upload , logout } from '../../firebase'

function Profile(props) {
  const currentUser = useAuth();
  const [photoURL,setPhotoURL] = useState("avatar.jpg");
  const [photo,setPhoto] = useState(null);
  function handleChange(e) {
    if(e.target.files[0]){
        setPhoto(e.target.files[0])
    }
  }
  function handleClick() {
    upload(photo, currentUser, props.setLoading);
  }
  useEffect(() => {
    if(currentUser?.photoURL) {
        setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser])
  async function handleLogout() {
    props.setLoading(true);
    try{
        await logout();
    } catch (e) {
        alert("Error!"+e);
    }
    props.setLoading(false);
  }
  return (
    <div className='fields'>
        <div>Currently logged in as: {currentUser?.email} </div>
        <input type="file" onChange={handleChange}/>
        <button disabled={ props.loading || !photo} onClick={handleClick}>Upload</button>
        <img src={photoURL} alt="Avatar" className='avatar'/>
        <button disabled={ props.loading || !currentUser } onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Profile