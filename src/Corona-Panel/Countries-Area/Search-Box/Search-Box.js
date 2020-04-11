import React from 'react';
import './Search-Box.css';
import language from '../../../language'

export default class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: null,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        }, () => {
            this.props.message(this.state.message);
        });
    };

    render() {
        return (
            <div id="searchBox" className="search-box">
                <input type="text" placeholder={language[this.props.languageCode].countryName} maxLength="7" onChange={this.handleChange}></input>
            </div>
        )
    }
}