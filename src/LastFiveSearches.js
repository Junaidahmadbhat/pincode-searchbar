import React from 'react'
const LastFiveSearches = ({lastFiveSearches}) => {
    return <div><strong>Last five searches:</strong><span>{!lastFiveSearches.length ? ' No seach done' : ` ${lastFiveSearches.join(',')}`}</span></div>				
}
export default LastFiveSearches 
