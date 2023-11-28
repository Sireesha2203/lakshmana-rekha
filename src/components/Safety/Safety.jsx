import React,{useState,useEffect} from 'react'

function Safety() {
    // State to store user's location and known locations
    const [userLocation, setUserLocation] = useState(null);
    const [knownLocations, setKnownLocations] = useState([]);
    const [showSafetyModal, setShowSafetyModal] = useState(false);
   // Function to check if the location is new
  const isNewLocation = () => {
    if (userLocation) {
      // Implement logic to compare the current location with known locations
      const isNew = !knownLocations.some((location) => {
        // Assuming locations are considered the same if they have the same latitude and longitude
        return (
          location.latitude === userLocation.latitude &&
          location.longitude === userLocation.longitude
        );
      });
  
      return isNew;
    }
    return false; // Return false if userLocation is not available
  };
  
  // Function to fetch user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  };
  
  // Function to handle user response to the popup
  const handleUserResponse = (isSafe) => {
    if (isSafe) {
      // Add the current location to knownLocations
      setKnownLocations((prevLocations) => [
        ...prevLocations,
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
      ]);
      console.log(knownLocations)
      console.log('Location is safe. You may implement further actions.');
    } else {
      console.log('Location is unsafe. You may implement further actions.');
    }
    // Close the modal after handling user response
    setShowSafetyModal(false);
  };
  
  
  // Effect hook to fetch user's location and check periodically
  useEffect(() => {
    // Fetch user's location on component mount
    getUserLocation();

    // Periodically check the location
    const interval = setInterval(() => {
      getUserLocation();

      // Check if it's a new location after 7 days && knownLocations.length > 0 && 
      if (isNewLocation()) {
        // Implement code to show a popup for user confirmation
        // You might want to use a modal library or create your own modal component
        const isSafe = window.confirm('Is this a safe location?');
        // Show the safety check modal
        setShowSafetyModal(true);
        // Handle user response after 15 minutes
        setTimeout(() => {
          handleUserResponse(isSafe);
        }, 5 * 1000);
      }
    }, 10 * 1000);
    console.log(knownLocations)
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [knownLocations]); // Re-run the effect when knownLocations changes


  return (
    <div style={{ height: '90vh' }}>
        <hr />
      {userLocation && (
        <>
          <p>User's Latitude: {userLocation.latitude}</p>
          <p>User's Longitude: {userLocation.longitude}</p>
        </>
      )}
      <p>Known Locations: {knownLocations.join(', ')}</p>

      {/* Modal */}
      {showSafetyModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Is this a safe location?</p>
            <button onClick={() => handleUserResponse(true)}>Yes</button>
            <button onClick={() => handleUserResponse(false)}>No</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default Safety;