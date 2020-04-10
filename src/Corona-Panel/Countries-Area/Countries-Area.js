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

    setParams = (openInfo, choosenCountry, choosenCou) => {
        this.props.setInfoParams(openInfo, choosenCountry, choosenCou);
    }

    render() {
        return (
            <div id="countriesArea">
                <SearchBox message={this.setMessage} />
                <CountryList totalCountryCorona={this.props.totalCountryCorona} message={this.state.message} map={this.props.map} showPanel={this.props.showPanel} deliveryInfoParams={this.setParams} />
            </div>
        )
    }
}