import React from 'react';
import './Countries-Area.css';
import SearchBox from './Search-Box/Search-Box'
import CountryList from './Country-List/Country-List'

export default class CountriesArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: null,
            totalCountryCorona: null
        }
    }

    UNSAFE_componentWillReceiveProps() {
        if (this.props.totalCountryCorona) {
            this.setState({ totalCountryCorona: this.props.totalCountryCorona })
        }
    }

    setMessage = (message) => {
        this.setState({ message: message })
    }

    render() {
        return (
            <div id="countriesArea">
                <SearchBox message={this.setMessage} />
                <CountryList totalCountryCorona={this.state.totalCountryCorona} message={this.state.message} map={this.props.map} />
            </div>
        )
    }
}