import axios from 'axios'
import React, {useEffect, useState} from 'react'

const UserRanking=()=> {
  const storedUserId = localStorage.getItem('userId');
  const [animeRanking, setAnimeRanking] = useState([]);
  
  useEffect(()=> {
    if (storedUserId) {
      //fetch ranking from anme quiz
      
    }
  })
  return (
    <div>
        <h1>UserRanking</h1>
        <p>Lorem</p>
    </div>
  )
}

export default UserRanking