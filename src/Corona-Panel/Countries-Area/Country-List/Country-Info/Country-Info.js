import React from 'react';
import './Country-Info.css';
import LineChart from './LineChart/LineChart';
import { DropdownButton, Dropdown } from 'react-bootstrap';

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
                    <img src={this.props.choosenCountry.flag} style={{ float: "left" }} width="30px" height="30px" alt="flag"></img><h5 style={{ marginTop: "2px" }}>{this.props.choosenCountry.country} (Toplam: {this.props.choosenCountry.cases})</h5>
                </div>
                <div id="inforPanelContent" className="infoPanelContent">
                    <div className="row">
                        <div className="column">
                            <p>Aktif: <span id="values">{this.props.choosenCountry.active}</span></p>
                            <p>İyileşen: <span id="values">{this.props.choosenCountry.recovered}</span></p>
                            <p>Durumu Kritik: <span id="values">{this.props.choosenCountry.critical}</span></p>
                            <p>Bir Milyonda Vaka: <span id="values">{this.props.choosenCountry.casesPerOneMillion ? `${this.props.choosenCountry.casesPerOneMillion} kişi` : null}</span></p>
                            <p>Test Sayısı: <span id="values">{this.props.choosenCountry.totalTests ? `${this.props.choosenCountry.totalTests} kişi` : null}</span></p>
                        </div>
                        <div className="column">
                            <p>Ölüm: <span id="values">{this.props.choosenCountry.deaths}</span></p>
                            <p>Bugünkü Ölümler: <span id="values">{this.props.choosenCountry.todayDeaths}</span></p>
                            <p>Bugünkü Vakalar: <span id="values">{this.props.choosenCountry.todayCases}</span></p>
                            <p>Bir Milyonda Ölen: <span id="values">{this.props.choosenCountry.deathsPerOneMillion ? `${this.props.choosenCountry.deathsPerOneMillion} kişi` : null}</span></p>
                            <p>Bir Milyonda Test: <span id="values">{this.props.choosenCountry.testsPerOneMillion ? `${this.props.choosenCountry.testsPerOneMillion} kişi` : null}</span></p>
                        </div>
                    </div>
                </div>
                <div id="dashboardContent" >
                    <DropdownButton id="dropdown-basic-button" variant="outline-primary" title="Grafikler">
                        <Dropdown.Item onClick={() => this.openGraphic(1)}>Genel</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.openGraphic(2)}>Günlük Vaka</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.openGraphic(3)}>Günlük Ölüm</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.openGraphic(4)}>Günlük İyileşme</Dropdown.Item>
                    </DropdownButton>
                    {this.props.showLineChart ? <LineChart choosen={this.props.choosenCou[0].country_code} graphicId={this.state.graphicId}></LineChart> : null}
                </div>
                <p style={{ textAlign: "center", color: "#66a8ff" }}>Grafik Veri Sağlayıcısı: Johns Hopkins University</p>
            </div>
        )
    }
}