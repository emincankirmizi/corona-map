import React from 'react';
import './Country-Info.css';
import LineChart from './LineChart/LineChart';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import language from '../../../../language';

export default class CountryInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openInfo: false,
            openGraphic: 1,
            close: true
        }
    }

    componentDidMount() {
        this.setState({ graphicId: 1 });
        this.setState({ close: true });
        if (window.innerWidth > 769) {
            document.getElementsByClassName("infoPanel")[0].style.left = "350px";
            document.getElementsByClassName("infoPanel")[0].style.top = "0px";
        } else {
            document.getElementsByClassName("infoPanel")[0].style.width = "100%";
            document.getElementsByClassName("infoPanel")[0].style.left = "0px";
            document.getElementsByClassName("infoPanel")[0].style.top = "0px";
            document.getElementsByClassName("infoPanel")[0].style.borderRadius = "5px";
            document.getElementsByClassName("infoPanel")[0].style.height = "100%";
        }
    }

    openGraphic(graphicId) {
        this.setState({ graphicId: graphicId });
    }

    componentWillUnmount() {
        this.setState({ graphicId: 1 });
        this.setState({ close: false })
    }

    render() {
        return (
            <div className="infoPanel">
                <span className="closeInfoPanel">&times;</span>
                <div className="infoPanelTitle">
                    <img src={this.props.choosenCountry.flag} style={{ float: "left" }} width="30px" height="30px" alt="flag"></img><h5 style={{ marginTop: "2px" }}>{this.props.choosenCountry.country} ({language[this.props.languageCode].total}: {this.props.choosenCountry.cases})</h5>
                </div>
                <div id="inforPanelContent" className="infoPanelContent">
                    <div className="row">
                        <div className="column">
                            <p>{language[this.props.languageCode].active} <span id="values">{this.props.choosenCountry.active}</span></p>
                            <p>{language[this.props.languageCode].recovered}: <span id="values">{this.props.choosenCountry.recovered}</span></p>
                            <p>{language[this.props.languageCode].critical} <span id="values">{this.props.choosenCountry.critical}</span></p>
                            <p>{language[this.props.languageCode].casesPerOneMillion} <span id="values">{this.props.choosenCountry.casesPerOneMillion ? `${this.props.choosenCountry.casesPerOneMillion}` : null}</span></p>
                            <p>{language[this.props.languageCode].totalTests} <span id="values">{this.props.choosenCountry.totalTests ? `${this.props.choosenCountry.totalTests}` : null}</span></p>
                        </div>
                        <div className="column">
                            <p>{language[this.props.languageCode].deaths}: <span id="values">{this.props.choosenCountry.deaths}</span></p>
                            <p>{language[this.props.languageCode].todayDeaths} <span id="values">{this.props.choosenCountry.todayDeaths}</span></p>
                            <p>{language[this.props.languageCode].todayDeaths} <span id="values">{this.props.choosenCountry.todayCases}</span></p>
                            <p>{language[this.props.languageCode].deathsPerOneMillion} <span id="values">{this.props.choosenCountry.deathsPerOneMillion ? `${this.props.choosenCountry.deathsPerOneMillion}` : null}</span></p>
                            <p>{language[this.props.languageCode].testsPerOneMillion} <span id="values">{this.props.choosenCountry.testsPerOneMillion ? `${this.props.choosenCountry.testsPerOneMillion}` : null}</span></p>
                        </div>
                    </div>
                </div>
                <div id="dashboardContent" >
                    <DropdownButton id="dropdown-basic-button" variant="outline-primary" title={language[this.props.languageCode].graphics}>
                        <Dropdown.Item onClick={() => this.openGraphic(1)}>{language[this.props.languageCode].general}</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.openGraphic(2)}>{language[this.props.languageCode].dailyCase}</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.openGraphic(3)}>{language[this.props.languageCode].dailyDeaths}</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.openGraphic(4)}>{language[this.props.languageCode].dailyRecovered}</Dropdown.Item>
                    </DropdownButton>
                    {this.props.showLineChart ? <LineChart choosen={this.props.choosenCou[0].country_code} graphicId={this.state.graphicId} languageCode={this.props.languageCode}></LineChart> : null}
                </div>
                <p style={{ textAlign: "center", color: "#66a8ff" }}>{language[this.props.languageCode].graphicProvider} Johns Hopkins University</p>
            </div>
        )
    }
}