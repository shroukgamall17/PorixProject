import { useState, useEffect } from "react";
import axios from "axios";
import { isAndroid } from 'react-device-detect';
import OffersCard from "./OfferCard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faGift } from "@fortawesome/free-solid-svg-icons";
import "./OfferCard.css";
import "./AllOffersAndSurveys.css";

const AllOffersAndSurveys = () => {
  const [offers, setOffers] = useState([]);
  const [showSurveys, setShowSurveys] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/offers.json");
        let sortedOffers = response.data.offers.sort((a, b) => b.reward - a.reward);
        
        if (isAndroid) {
          const androidOffers = response.data.offers.filter(offer => offer.os === "android");
          sortedOffers = androidOffers.concat(sortedOffers);
        }
        
        setOffers(sortedOffers);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  

  const filteredOffers = showSurveys ? offers.filter(offer => offer.model === "survey").concat(offers.filter(offer => offer.model === "offer")) : offers;

  const showSurveysHandler = () => {
    setShowSurveys(true);
  };

  const hideSurveysHandler = () => {
    setShowSurveys(false);
  };

  return (
    <div className="w-full mb-44">
      <div className="flex items-center mt-9">
        <FontAwesomeIcon icon={faGift} className="text-white mr-2 ml-9 -mt-1" />
        <div className="mt-4 ml-6">
          <button onClick={showSurveysHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Show Surveys
          </button>
          <button onClick={hideSurveysHandler} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-4 rounded">
            Hide Surveys
          </button>
        </div>
        <h1 className="text-4xl mb-3 font-bold relative text-pink-500">
          {showSurveys ? 'Surveys are visible' : 'Surveys are hidden'}
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

      <div className="grid grid-cols-1 gap-2 mt-6 w-full relative md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 justify-center items-center">

        {filteredOffers.map((offer, index) => (
          <div key={index} className="col-span-1">
            <OffersCard
              offerId={offer.id}
              offerName={offer.name}
              offerImage={offer.image}
              offerDescription={offer.description}
              offerReward={offer.reward}
              isLeftAligned={index % 2 === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOffersAndSurveys;
