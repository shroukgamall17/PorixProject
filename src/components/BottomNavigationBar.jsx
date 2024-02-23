import PropTypes from 'prop-types'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faHome, faUser, faStar, faCoins } from '@fortawesome/free-solid-svg-icons'; 
import { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import './BottomNavigationBar.css'; 
import './BottomNavigationBar.css'; 
const BottomNavigationBar = ({ handleRecommendedClick }) => { 
  const [showRecommended, setShowRecommended] = useState(false); 
  const [offers, setOffers] = useState([]); 
 
  const handleHomeClick = () => { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }; 
 
  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const response = await axios.get("/offers.json"); 
        const sortedOffers = response.data.offers.sort((a, b) => b.reward - a.reward); 
        setOffers(sortedOffers); 
      } catch (error) { 
        console.error("Error fetching data: ", error); 
      } 
    }; 
 
    fetchData(); 
  }, []); 
 
  return ( 
    <nav className="bottom-navbar"> 
      <ul className="flex justify-around items-center h-full"> 
        <li className="flex flex-col items-center cursor-pointer" onClick={handleHomeClick}> 
          <FontAwesomeIcon icon={faHome} className="h-6 w-6 text-pink-500" /> 
          <span>Home</span> 
        </li> 
        <li className="flex flex-col items-center cursor-pointer" onClick={() => setShowRecommended(!showRecommended)}> 
          <FontAwesomeIcon icon={faUser} className="h-6 w-6 text-pink-500" /> 
          <span>My Activity</span> 
        </li> 
        <li className="flex flex-col items-center cursor-pointer" onClick={handleRecommendedClick}> 
          <FontAwesomeIcon icon={faStar} className="h-6 w-6 text-pink-500" /> 
          <span>Recommended</span> 
        </li> 
      </ul> 
 
      {showRecommended && ( 
        <div className="my-activity-slider ml-12"> 
          <div className="overflow-x-scroll ml-9"> 
            <div className="flex "> 
              {offers.map((offer) => ( 
                <div key={offer.id} className="flex flex-col items-center justify-center"> 
                  <div className='bg-transparent'></div> 

     <div className="left-large-circle w-32 h-32 flex items-center justify-center rounded-full bg-1f0933 ">
      <div
        className="small-circle w-24 h-24 rounded-full bg-white"
        style={{
          border: "2px solid #8c2558",
          backgroundSize: "cover",
          backgroundImage: `linear-gradient(to top, #130421, rgba(0, 0, 0, 0)), url('${offer.image}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          cursor: "pointer",
        }}
      ></div>
    </div>
                  <div className="h-52 w-[400px]">
  <div className="w-64">
    <div className=" bg-280f3d left-details">
      <h1 className="text-ad2966 w-52 mt-5">{offer.name}</h1>
      <p className="text-a7a6aa w-52">
    {offer.description}
      </p>
      <div className="flex absolute left-36 bottom-6">
        <span className="w-full bg-transparent flex justify-center">
          <span className="text-xl font-bold bg-8c2558 text-280f3d rounded-full">
            {offer.reward}{" "}
            <FontAwesomeIcon
              icon={faCoins}
              className="text-yellow-500 mr-2 bg-transparent"
            />
          </span>
        </span>
      </div>
    </div>
  </div>
</div>
 
                </div> 
              ))} 
            </div> 
          </div> 
        </div> 
      )} 
    </nav> 
  ); 
}; 
 
BottomNavigationBar.propTypes = { 
  handleRecommendedClick: PropTypes.func.isRequired, 
}; 
 
export default BottomNavigationBar;