import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faStar, faGift, faCoins } from "@fortawesome/free-solid-svg-icons"; 
import { useState, useEffect } from "react"; 
import axios from "axios"; 
import "./Recommended.css"; 
import OfferDetail from "./OfferDetail";
 
const Recommended = () => { 
  const [offers, setOffers] = useState([]); 
  const [selectedOfferId, setSelectedOfferId] = useState(null); 
 
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
 
  const handleCardClick = (offerId) => { 
    setSelectedOfferId(offerId); 
  }; 
 
  const handleCloseModal = () => { 
    setSelectedOfferId(null); 
  }; 
 
  return ( 
    <div className="p-4 " id="recommended"> 
      <div className="flex items-center mt-9"> 
        <FontAwesomeIcon icon={faGift} className="text-white mr-2 ml-9 -mt-1" /> 
        <h1 className="text-4xl mb-3 font-bold relative text-pink-500"> 
          Recommended 
        </h1> 
        <div className="flex items-center "> 
          {[...Array(5)].map((_, index) => ( 
            <FontAwesomeIcon 
              key={index} 
              icon={faStar} 
              className="text-yellow-500 ml-2" 
            /> 
          ))} 
        </div> 
        <div className="h-2 w-2 ml-2 rounded-full bg-pink-500"></div> 
        <div className="h-0.5 flex-grow bg-pink-500"></div> 
      </div> 
 
      <br /> 
 
      <div className="recommended overflow-x-scroll ml-9"> 
        <div className="flex gap-4 pb-4"> 
          {offers.map((offer) => ( 
            <div 
              key={offer.id} 
              className="flex flex-col items-center justify-center" 
              onClick={() => handleCardClick(offer.id)} // Attach click handler 
            > 
              <div 
                className="w-36 h-44 bg-cover bg-center rounded-more mb-4 relative" 
                style={{ 
                  backgroundImage: `linear-gradient(to top, #130421, rgba(0, 0, 0, 0)), url('${offer.image}')`, 
                  backgroundSize: "cover", 
                  backgroundRepeat: "no-repeat", 
                  backgroundPosition: "center", 
                  cursor: "pointer", // Add cursor pointer 
                }} 
              > 
                <span className="absolute bottom-6 w-full bg-transparent flex justify-center"> 
                  <span className="text-xl font-bold bg-8e1c55 text-C3C3C3 px-5 py-1 rounded-full"> 
                    {offer.reward}{" "} 
                    <FontAwesomeIcon 
                      icon={faCoins} 
                      className="text-yellow-500 mr-2 bg-transparent" 
                    /> 
                  </span> 
                </span> 
              </div> 
            </div> 
          ))} 
        </div> 
      </div> 
 
      {/* Render OfferDetail modal if selectedOfferId is not null */} 
      {selectedOfferId && ( 
        <> 
        <div className="modal-overlay" onClick={handleCloseModal}></div> 
        <OfferDetail offerId={selectedOfferId} onClose={handleCloseModal} /> 
        </> 
      )} 
    </div> 
  ); 
}; 
 
export default Recommended;