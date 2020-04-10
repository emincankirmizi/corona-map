import React from 'react';
import './Panel-Title.css';

export default class PanelTitle extends React.Component {

    render() {
        return (
            <div className="all">
                <a href="https://hsgm.saglik.gov.tr/tr/covid19" target="window.open()"><h1>Covid-19</h1></a>
                <a href="https://coronavirus-19-api.herokuapp.com/countries" target="window.open()"><p>Covid-19-API #EvdeKal</p></a>
            </div>
        )
    }
}