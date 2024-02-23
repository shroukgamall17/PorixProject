import './App.css'; 
import Header from './components/Header'; 
import Recommended from './components/Recommended'; 
import Offers from './components/AllOffersAndSurveys'; 
import BottomNavigationBar from './components/BottomNavigationBar'; 
import { useState, useEffect } from 'react'; 
import axios from 'axios'; 
 
function App() { 
  const [offers, setOffers] = useState([]); 
  const [dataFetched, setDataFetched] = useState(false); 
 
  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const response = await axios.get('/offers.json', { cache: "no-cache" });
        setOffers(response.data.offers); 
        setDataFetched(true); 
      } catch (error) { 
        console.error('Error fetching data: ', error);
        setDataFetched(false); 
      } 
    }; 
 
    fetchData(); 
  }, []); 
 
  const handleRecommendedClick = () => { 
    const recommendedElement = document.getElementById('recommended'); 
    recommendedElement.scrollIntoView({ behavior: 'smooth' }); 
  }; 
 
  if (!dataFetched) { 
    console.log('data fetching...');
    return <div>Loading...</div>; 
  }
  
  if (offers?.length === 0) { 
    console.log('fetching failed...');
    return (
      <div>Not Found Page</div>
    ) 
  }

  if (dataFetched) {
    console.log('fetching success...');
    return (
      <>
        <Header /> 
        <Recommended id="recommended" /> 
        <Offers offers={offers} /> 
        <BottomNavigationBar handleRecommendedClick={handleRecommendedClick} />
        <div>site rendered</div>
      </>
    )
  }
} 
 
export default App;