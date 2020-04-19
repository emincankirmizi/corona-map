import React from 'react';
import './Map-Pattern.css';
import countries from '../../Map/coords/centerCountries.json';
import L from 'leaflet';
import coords from '../../Map/coords/coords.json';
import language from '../../language';

export default class MapPattern extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            design: "area",
            countries: countries,
            coords: coords
        }
        this.setCircle = this.setCircle.bind(this);
        this.setArea = this.setArea.bind(this);
    }

    UNSAFE_componentWillReceiveProps() {
        if (this.props.totalCountryCorona && this.props.totalCountryCorona.length !== 0) {
            this.setCountryDataOnMap();
        }
    }

    componentDidMount() {
        document.getElementById('area').checked = true;
    }

    setCountryDataOnMap() {
        this.props.map.eachLayer((layer) => {
            if (!layer['_url']) {
                this.props.map.removeLayer(layer);
            }
        });
        if (this.state.design === 'area') {
            for (let i = 0; i < this.state.coords[0].features.length; i++) {
                let coronaExist = false;
                for (let y = 0; y < this.props.totalCountryCorona.length; y++) {
                    if (this.state.coords[0].features[i].properties.name === this.props.totalCountryCorona[y].country) {
                        coronaExist = true;
                    }
                }
                if (!coronaExist) {
                    if (this.state.design) {
                        const coord = this.state.coords[0].features[i];
                        const countStyle = {
                            "color": '#ffffff',
                            "weight": 0.1,
                            "opacity": 0.55
                        };
                        L.geoJSON(coord, {
                            style: countStyle,
                            onEachFeature: (f, l) => {
                                l.bindPopup(`
                                <div id="mapPopup">
                                <b>${coord.properties.name}</b><br>
                                <b>Vaka yok.</b><br>
                                </div>
                                `);
                            }
                        }).addTo(this.props.map);
                    }
                }
            }
            this.state.coords[0].features.filter(
                coordOfCountry => {
                    const country = this.props.totalCountryCorona.find(country => coordOfCountry.properties.name === country.country);
                    if (country) {
                        const countStyle = {
                            "color": country.cases > 300000 ? '#1a0000' : country.cases > 100000 ? '#660000' : country.cases > 50000 ? '#b30000' : country.cases > 10000 ? '#ff0000' : country.cases > 5000 ? '#ff3333' : country.cases > 1000 ? '#ff8080' : '#ffcccc',
                            "weight": 0.1,
                            "opacity": 0.55
                        };
                        if (country.cases === 0) {
                            const coord = coordOfCountry;
                            const nullStyle = {
                                "color": '#ffffff',
                                "weight": 0.1,
                                "opacity": 0.55
                            };
                            L.geoJSON(coord, {
                                style: nullStyle,
                                onEachFeature: (f, l) => {
                                    l.bindPopup(`
                                    <div id="mapPopup">
                                    <b>${coord.properties.name}</b><br>
                                    <b>Vaka yok.</b><br>
                                    </div>
                                    `);
                                }
                            }).addTo(this.props.map);
                        } else {
                            L.geoJSON(coordOfCountry, {
                                style: countStyle,
                                onEachFeature: (f, l) => {
                                    l.bindPopup(`
                                    <div id="mapPopup">
                                    <img src=${country.flag} style={{ float: "left" }} width="30px" height="30px" alt="flag"></img>
                                    <b>${country.country}</b>
                                    <hr id="rowLine">
                                    <p><span class="dotCasesMap"></span><b>${language[this.props.languageCode].cases}: ${country.cases}</b></p>
                                    <p><span class="dotDeathsMap"></span><b>${language[this.props.languageCode].deaths}: ${country.deaths}</b></p>
                                    <p><span class="dotRecoveredMap"></span><b>${language[this.props.languageCode].recovered}: ${country.recovered}</b></p>
                                    </div>
                                    `);
                                }
                            }).addTo(this.props.map);
                        }
                    }
                    return true;
                })
        } else {
            this.props.totalCountryCorona.filter(
                country => {
                    const centerOfCountry = this.state.countries.find(centerOfCountry => country.country === centerOfCountry.name)
                    if (centerOfCountry) {
                        if (country.cases !== 0) {
                            country.country_code = centerOfCountry.country_code;
                            country.flag = `https://www.countryflags.io/${country.country_code}/flat/64.png`;
                            this.setState({ totalCountryCorona: this.props.totalCountryCorona })
                            const circleCenter = centerOfCountry.latlng;
                            const circleOptions = {
                                color: "#0483d8",
                                fillColor: "#0483d8",
                                fillOpacity: 0.3,
                                weight: 3
                            }
                            const radius = country.cases > 30000 ? country.cases * 3 : country.cases > 10000 ? country.cases * 5 : country.cases > 5000 ? country.cases * 10 : country.cases > 1000 ? country.cases * 15 : country.cases > 500 ? country.cases * 20 : country.cases > 100 ? country.cases * 25 : country.cases * 100
                            const circle = L.circle(circleCenter, radius, circleOptions);
                            circle.bindPopup(`
                        <div id="mapPopup">
                        <img src=${country.flag} style={{ float: "left" }} width="30px" height="30px" alt="flag"></img>
                        <b>${country.country}</b>
                        <hr id="rowLine">
                        <p><span class="dotCasesMap"></span><b>${language[this.props.languageCode].cases}: ${country.cases}</b></p>
                        <p><span class="dotDeathsMap"></span><b>${language[this.props.languageCode].deaths}: ${country.deaths}</b></p>
                        <p><span class="dotRecoveredMap"></span><b>${language[this.props.languageCode].recovered}: ${country.recovered}</b></p>
                        </div>
                        `);
                            circle.addTo(this.props.map);
                        }
                    }
                    return true;
                })
        }
    }

    setArea(e) {
        this.setState({ design: 'area' }, () => {
            this.setCountryDataOnMap(this.props.totalCountryCorona);
            document.getElementsByClassName('legend')[0].style.display = "block";
        });
    };

    setCircle(e) {
        this.setState({ design: 'circle' }, () => {
            this.setCountryDataOnMap(this.props.totalCountryCorona);
            document.getElementsByClassName('legend')[0].style.display = "none";
        });
    };

    render() {
        return (
            <div id="mapPattern" className="map-design">
                <span>{language[this.props.languageCode].notation}:</span>&nbsp;&nbsp;
                <input type="radio" id="area" name="design" value="area" onChange={this.setArea} ></input>
                <label htmlFor="area">{language[this.props.languageCode].area}</label>&nbsp;&nbsp;
                <input type="radio" id="circle" name="design" value="circle" onChange={this.setCircle} ></input>
                <label htmlFor="circle">{language[this.props.languageCode].circle}</label>
            </div>
        )
    }
}