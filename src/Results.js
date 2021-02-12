import React, {Fragment} from 'react'
const Results = ({message, results}) => {
    return (
        <Fragment>
        {results.length ? (
            <div className="results-container">
            {results.map((result, index) => {
            return (
                <a key={index} href={result.previewURL} className="result-items">
                <p className="image-username">Country Code: <strong>{result.countryCode}</strong> Place: <strong>{result.placeName}</strong> lat: <strong>{result.lat}</strong> lng: <strong>{result.lng}</strong></p>
                </a>
            );
            })}
        </div>
        ) : <div> {message} </div>}
        </Fragment>
    )
}

export default Results