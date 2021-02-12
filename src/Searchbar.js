import React, {Component} from 'react'
import Results from './Results'
import LastFiveSearches from './LastFiveSearches';

class Searchbar extends  Component {
	
  constructor( props ) {
    super( props );
    this.state = {
      query: '',
      loading: false,
      message: '',
      results: [],
      lastFiveSearches: []
    };
    this.cancel = '';
  }

  fetchSearchResults = (event) => {
    const {lastFiveSearches, query, isLoading} = this.state
    // previous request response should come then only new request will go 
    if (event.key === 'Enter' && !isLoading && query !== '') {
    
    // last search elements
    if(lastFiveSearches.indexOf(query)) {
      lastFiveSearches.unshift(query)
      if(lastFiveSearches.length > 5) {
        lastFiveSearches.pop();
      }
    }     
     
    this.setState({
      lastFiveSearches: lastFiveSearches,
      loading: true
    })
    const searchUrl = `http://api.geonames.org/postalCodeLookupJSON?postalcode=${query}&country=&username=junaidbhat06`;
    fetch(searchUrl)
      .then(response => response.json())
      .then((data) => {
        const resultNotFoundMsg = !data.postalcodes.length
          ? 'There are no more search results. Please try a new search.'
          : '';
        this.setState({
          query: '',
          results: data.postalcodes,
          message: resultNotFoundMsg,
          loading: false,
        });  
      })
      .catch((error) => {
        if (error) {
          this.setState({
            loading: false,
            message: 'Failed to fetch results.Please check network',
          });
        }
      })
    }
  }
  
  handleOnInputChange = (event) => {
    const query = event.target.value;
    if ( ! query ) {
      this.setState({ query, results: {}, message: '' } );
    } else {
      this.setState({ query, loading: true, message: '' }, () => {
        this.fetchSearchResults(1, query);
      });
    }
  }

	render() {
    const {query, lastFiveSearches, results, message} = this.state
		return (
			<div className="container">
				{/*Heading*/}
				<h2 className="heading">Search PINCODE and GET NAME OF THE PLACE</h2>
        <LastFiveSearches lastFiveSearches={lastFiveSearches} />
        {/*Search Input*/}
        <label className="search-label" htmlFor="search-input">
            <input
            onKeyPress={this.fetchSearchResults}
            type="text"
            value={query}
            id="search-input"
            placeholder="Search postal code eg 560030..."
            onChange={this.handleOnInputChange}
            />
					<i className="fa fa-search search-icon"/>
				</label>
        {/*Result*/}
        <Results results={results} message={message} />
			</div>
			)
	}
}
export default Searchbar;