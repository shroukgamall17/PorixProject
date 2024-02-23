import { useState, useEffect, useRef } from 'react'; 
import axios from 'axios'; 
import './Header.css'; 
import OfferDetail from './OfferDetail';

 
function Header() { 
  const [searchActive, setSearchActive] = useState(false); 
  const [inputValue, setInputValue] = useState(''); 
  const [offers, setOffers] = useState([]); 
  const [filteredOffers, setFilteredOffers] = useState([]); 
  const [selectedOfferId, setSelectedOfferId] = useState(null); // Track the ID of the selected offer 
  const inputRef = useRef(null); 
 
  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const response = await axios.get('/offers.json'); 
        setOffers(response.data.offers); 
      } catch (error) { 
        console.error('Error fetching data: ', error); 
      } 
    }; 
 
    fetchData(); 
  }, []); 
 
 
 
  const handleInputChange = (e) => { 
    const value = e.target.value; 
    setInputValue(value); 
    setSearchActive(true); 
    const filtered = offers.filter((offer) => 
      offer.name.toLowerCase().includes(value.toLowerCase()) 
    ); 
    setFilteredOffers(filtered); 
  }; 
 
  const handleOfferClick = (offerId) => { 
    setSelectedOfferId(offerId);
    setSearchActive(false);
    setInputValue('');
  }; 
 
  useEffect(() => { 
    const handleClickOutside = (e) => { 
      if (inputRef.current && !inputRef.current.contains(e.target)) { 
        setSearchActive(false); 
        setInputValue(''); 
      } 
    }; 
 
    if (searchActive) { 
      document.addEventListener('mousedown', handleClickOutside); 
    } 
 
    return () => { 
      document.removeEventListener('mousedown', handleClickOutside); 
    }; 
  }, [searchActive]); 
 
  return ( 
    <header 
      className={`relative w-full ${selectedOfferId ? 'bg-opacity-50' : ''}`} // Add class for darker background when modal is open 
      style={{ 
        background: `linear-gradient(to top, var(--custom-background), rgba(0, 0, 0, 0)), url('/HeaderCover.jpg')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '500px', 
      }} 
    > 
      <div className="container mx-auto"> 
        <div> 
          <img 
            src="logo2.png" 
            alt="Logo" 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 xl:w-30 lg:w-30 h-40 bg-transparent" 
          /> 
        </div> 
        <ul className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex bg-transparent w-full justify-center"> 
          <li className="inline-block mx-4 py-2 px-4 rounded-full first-li cursor-pointer"> 
            All Offers 
          </li> 
          <li className="inline-block mx-4 rounded-full custom-li" ref={inputRef}> 
            <input 
              type="text" 
              className={`py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${searchActive && 'input-expanded'}`} 
              placeholder="Search for offers..." 
              value={inputValue} 
              onChange={handleInputChange} 
              autoFocus 
              style={{ backgroundColor: '#b72c6c', color: 'white' }} 
            /> 
            {searchActive && inputValue && filteredOffers.length > 0 && ( 
              <ul className="dropdown" style={{ width: '400px', borderRadius: '0', backgroundColor: '#b72c6c', color: 'white', position: 'absolute', zIndex: '10', marginTop: '8px', maxHeight: '200px', overflowY: 'auto' }}> 
                {filteredOffers.map((offer) => ( 
                  <li key={offer.id} className="offer-item" onClick={() => handleOfferClick(offer.id)}> 
                    {offer.name} 
                    <hr className="separator" />
                  </li> 
                ))} 
              </ul> 
            )} 
          </li> 
          <li className="inline-block mx-4 py-2 px-4 rounded-full custom-li cursor-pointer">Highest Paying</li> 
          <li className="inline-block mx-4 py-2 px-4 rounded-full custom-li cursor-pointer">Easiest</li> 
        </ul> 
      </div> 
      {selectedOfferId && ( 
        <> 
        <div className="modal-overlay"></div> 
        <OfferDetail offerId={selectedOfferId} onClose={() => setSelectedOfferId(null)} /> 
        </> 
      )} 
    </header> 
  ); 
} 
 
export default Header;