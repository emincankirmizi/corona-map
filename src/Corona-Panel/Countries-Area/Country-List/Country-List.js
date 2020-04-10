import React from 'react';
import './Country-List.css';
import countries from '../../../Map/coords/centerCountries.json';

export default class CountryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            choosenCountry: [],
            choosenCou: [],
            countries: countries,
            openInfo: true,
        }
    }

    chooseCountry(country) {
        this.setState({ openInfo: false }, () => {
            this.props.deliveryInfoParams(this.state.openInfo, this.state.choosenCountry, this.state.choosenCou);
            this.setState({
                choosenCou: this.state.countries.filter(
                    c => {
                        if (c.name === country.country)
                            return c;
                        return null;
                    }
                )
            }, () => {
                this.setState({ choosenCountry: country });
                if (this.state.choosenCou[0] && this.state.choosenCou[0].latlng) {
                    this.props.map.setView(this.state.choosenCou[0].latlng, 5);
                    setTimeout(() => {
                        this.setState({ openInfo: true }, () => { this.props.deliveryInfoParams(this.state.openInfo, this.state.choosenCountry, this.state.choosenCou); });
                    }, 1);
                }
                this.props.map.on('click', (e) => {
                    if (this.state.openInfo) {
                        this.setState({ openInfo: false }, () => { this.props.deliveryInfoParams(this.state.openInfo, this.state.choosenCountry, this.state.choosenCou); });
                    }
                });
            })
        });
    }

    render() {
        return (
            <div>
                <div className="countries">
                    <div id="covidAPIWait">
                        <p style={{ color: "red" }}>Veri sağlayıcısına bağlanılamadı.</p>
                    </div>
                    {this.props.totalCountryCorona ? this.props.totalCountryCorona.filter(e => {
                        if (e.country !== "World" && e.country !== "Europe"
                            && e.country !== "Africa" && e.country !== "North America"
                            && e.country !== "Asia" && e.country !== "Oceania" && e.country !== "South America"
                            && e.country !== "Total:") {
                            if (this.props.message) {
                                return e.country.toLowerCase().includes(this.props.message.toLowerCase());
                            }
                            return e;
                        }
                        return null;
                    }).map(country => (
                        <div className="country" key={country.country} onClick={() => this.chooseCountry(country)}>
                            <img src={country.flag} style={{ float: "left", marginTop: "-6px", marginRight: "1px" }} width="30px" height="30px" alt="flag"></img><span style={{ fontSize: "15px" }}>{country.country}</span><span style={{ fontSize: "12px", color: "#E61904", float: "right" }}>{country.todayDeaths && country.todayDeaths !== 0 ? `+${country.todayDeaths}` : null}</span><span style={{ fontSize: "12px", color: "#0483D8", float: "right", marginRight: "3px" }}>{country.todayCases && country.todayCases !== 0 ? `+${country.todayCases}` : null}</span>
                            <hr id="rowLine"></hr>
                            <div className="title">
                                <p><span className="dotCasesInfo"></span><span> Vaka: {country.cases}</span></p>
                                <p><span className="dotDeathsInfo"></span><span> Ölüm: {country.deaths}</span></p>
                                <p><span className="dotRecoveredInfo"></span><span>İyileşen: {country.recovered}</span></p>
                                <span>Detay için tıklayınız...</span>
                            </div>
                        </div>
                    )) : null}
                </div>
            </div>
        )
    }
}