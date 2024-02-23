import { useState, useEffect } from "react"; 
import PropTypes from "prop-types"; 
import axios from "axios"; 
import "./OfferDetail.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faCoins, faTimes } from "@fortawesome/free-solid-svg-icons";
 
const OfferDetail = ({ offerId, onClose }) => { 
  const [offer, setOffer] = useState([]); 
 
  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const response = await axios.get("/offers.json"); 
        const sortedOffers = response.data.offers.sort( 
          (a, b) => b.reward - a.reward 
        ); 
        setOffer(sortedOffers[0]); 
        const offers = response.data.offers; 

        const offer = offers.find((offer) => offer.id === offerId); 
 
        // Now you have the offer object with the matching ID 
        setOffer(offer); 
        console.log(offer); 
        // Assuming you want to display the first offer 
      } catch (error) { 
        console.error("Error fetching data: ", error); 
      } 
    }; 
    fetchData(); 
  }, [offerId]); 
 
  return ( 
    <> 
      <div className="modal-container"> 
        <div className="modal border-2 border-ad2966 bg-280f3d rounded-2xl text-left w-96"> 
          <div className="modal-content"> 
            <button className="modal-close" onClick={onClose}> {/* Close button */} 
              <FontAwesomeIcon icon={faTimes} /> 
            </button> 
            <div className="grid grid-cols-3 bg-130421 p-3"> 
              <div className="col-span-1"> 
                <img 
                  src={offer.image} 
                  alt="" 
                  className="w-24 h-24 rounded-xl" 
                /> 
              </div> 
              <div className="col-span-2 "> 
                <div> 
                  <div className="overflow-x-auto mb-1"> 
                    <h2 className="text-ad2966 font-bold text-lg whitespace-nowrap"> 
                      {offer.name} 
                    </h2> 
                  </div> 
                  <span className=" text-xl font-bold bg-8c2558 text-280f3d rounded-full"> 
                    {offer.reward}{" "} 
                    <FontAwesomeIcon 
                      icon={faCoins} 
                      className="text-yellow-500 mr-2 bg-transparent" 
                    /> 
                  </span> 
                </div> 
                <div></div> 
              </div> 
            </div> 
 
            <div className=" bg-130421 p-3 mt-1 mb-3"> 
              <div className="text-ad2966 font-bold  text-lg"> 
                Offer Details 
              </div> 
              <p className="text-white max-w-lg h-32 overflow-y-auto"> 
                {offer.description} 
              </p> 
            </div> 
 
            <div className=" bg-130421 p-3 mb-3"> 
              <div className="flex"> 
                <div className="text-ad2966 font-bold text-lg mr-2"> 
                  Your Coins 
                </div> 
                <span className=" text-xl font-bold bg-8c2558 rounded-full text-white"> 
                  {offer.reward}{" "} 
                  <FontAwesomeIcon 
                    icon={faCoins} 
                    className="text-yellow-500 mr-2 bg-transparent" 
                  /> 
                </span> 
              </div> 
 
              <div className="text-white"> 
                {offer && 
                offer.instructions && 
                offer.instructions.split(",").map((instruction, index) => ( 
                  <div key={index} className="flex justify-between"> 
                    <div className="instruction w-52">{instruction.trim()}</div> 
                    <span className="font-bold bg-8c2558 rounded-full text-white mb-1"> 
                    {"  "}{offer.reward}{" "} 
                      <FontAwesomeIcon 
                        icon={faCoins} 
                        className="text-yellow-500 mr-2 bg-transparent" 
                      /> 
                    </span>
</div> 
                ))} 
              </div> 
            </div> 
          </div> 
          <div className="flex justify-center"> 
            <button 
              className="bg-green-700 hover:bg-green-800 text-gray-900 font-bold py-1 px-10 rounded" 
              onClick={onClose} 
            > 
              add to my activity 
            </button> 
          </div> 
        </div> 
      </div> 
    </> 
  ); 
}; 
 
OfferDetail.propTypes = { 
  offerId: PropTypes.number.isRequired, 
  onClose: PropTypes.func.isRequired, 
}; 
 
export default OfferDetail;