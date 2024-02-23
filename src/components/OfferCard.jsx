import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Fade } from "react-awesome-reveal";
import OfferDetail from "./OfferDetail";
import "./OfferCard.css"

const OffersCard = ({
  offerName,
  offerImage,
  offerDescription,
  offerReward,
  offerId,
  isLeftAligned,
}) => {
  const [showFullDescription] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toggleDescription = () => {
   // setShowFullDescription(!showFullDescription);
   setOpenModal(true);
  };

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>

    <Fade direction={isLeftAligned ? "left" : "right"} triggerOnce={true}>
      {isLeftAligned && (
        <div className="left-card my-6 ml-12  h-auto w-[600px] relative">
          <div className="grid grid-cols-3 h-48">
            <div className=" bg-280f3d col-span-2 left-details">
              <h1 className="text-ad2966 w-72">{offerName}</h1>
              <p className=" text-a7a6aa w-72">
                {showFullDescription
                  ? offerDescription
                  : offerDescription.slice(0, 100)}
                {!showFullDescription && offerDescription.length > 160 && (
                  <button className="text-8c2558" onClick={toggleDescription}>
                    Read More
                  </button>
                )}
              </p>
              <div className="flex absolute left-36 bottom-6">
                <span className="w-full bg-transparent flex justify-center">
                  <span className=" text-xl font-bold bg-8c2558 text-280f3d rounded-full">
                    {offerReward}{" "}
                    <FontAwesomeIcon
                      icon={faCoins}
                      className="text-yellow-500 mr-2 bg-transparent"
                    />
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="p-7 bg-130421 h-36 relative flex items-center justify-center ">
                <div className="right-7 left-large-circle w-40 h-40 flex items-center justify-center rounded-full bg-130421  absolute ">
                  <div
                    className="small-circle w-32 h-32 rounded-full bg-white"
                    style={{
                      border: "2px solid #8c2558",
                      backgroundSize: "cover",
                      backgroundImage: `linear-gradient(to top, #130421, rgba(0, 0, 0, 0)), url('${offerImage}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      cursor: "pointer",
                    }}
                    onClick={handleClick}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLeftAligned && (
        <div className="right-card grid grid-cols-3 h-48 w-[600px] mr-6 my-6 relative">
          <div className=" flex items-center justify-center">
            <div className="bg-130421 h-36 relative flex items-center justify-center">
              <div className="left-1 right-large-circle w-40 h-40 flex items-center justify-center rounded-full bg-130421  absolute">
                <div
                  className="small-circle w-32 h-32 rounded-full bg-white"
                  style={{
                    border: "2px solid #8c2558",
                    backgroundSize: "cover",
                    backgroundImage: `linear-gradient(to top, #130421, rgba(0, 0, 0, 0)), url('${offerImage}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleClick}
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-280f3d col-span-2 right-details">
            <h1 className="text-ad2966 w-72 ml-12 ">{offerName}</h1>
            <p className=" text-a7a6aa w-80 ml-12 ">
              {showFullDescription
                ? offerDescription
                : offerDescription.slice(0, 100)}
              {!showFullDescription && offerDescription.length > 160 && (
                <button className="text-8c2558" onClick={toggleDescription}>
                  Read More
                </button>
              )}
            </p>
            <div className="flex absolute ml-36 bottom-6">
                <span className="w-full bg-transparent flex justify-center">
                  <span className=" text-xl font-bold bg-8c2558 text-280f3d rounded-full">
                    {offerReward}{" "}
                    <FontAwesomeIcon
                      icon={faCoins}
                      className="text-yellow-500 mr-2 bg-transparent"
                    />
                  </span>
                </span>
              </div>
          </div>
        </div>
      )}

    </Fade>
    {openModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <OfferDetail offerId={offerId} onClose={handleCloseModal} style={{ zIndex: 9999 }} />
        </>
      )}
    </>
    
  );
};

OffersCard.propTypes = {
  offerName: PropTypes.string.isRequired,
  offerImage: PropTypes.string.isRequired,
  offerDescription: PropTypes.string.isRequired,
  offerReward: PropTypes.number.isRequired,
  offerId: PropTypes.number.isRequired,
  isLeftAligned: PropTypes.bool.isRequired,
};

export default OffersCard;
