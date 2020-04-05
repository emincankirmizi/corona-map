import React from 'react';
import './Day-Range.css';

export default class DayRange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalDays: null,
            startDate: null,
            allCountries: [],
            allCountriesToday: [],
            totalToday: [],
            newDay: null,
            today: null,
            isToday: true,
            isDayNull: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    UNSAFE_componentWillMount() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        this.setState({
            today: {
                mm: mm,
                dd: dd
            }
        })

        this.setState({ newDay: `${dd}/${mm}/20` })
        const endDate = Date.parse(`${yyyy}-${mm}-${dd}`);
        const startDate = Date.parse("2020-01-22");
        this.setState({ startDate: startDate });
        const timeDiff = endDate - startDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        this.setState({ totalDays: daysDiff });
        fetch(`https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries`)
            .then(response => response.json())
            .then(data => {
                this.setState({ allCountries: data }, () => {
                    document.getElementById("rangeDiv").style.display = "block";
                    document.getElementById("resWait").style.display = "none";
                    document.getElementsByClassName("loader")[0].style.display = "none";
                    document.getElementById("daySlider").value = this.state.totalDays;
                });
            });
        fetch('https://coronavirus-19-api.herokuapp.com/countries')
            .then(response => this._parseJSON(response))
            .then(data => { this.setState({ allCountriesToday: data }, () => { this.setNewDayCountries(false); }) });
        fetch('https://coronavirus-19-api.herokuapp.com/all')
            .then(response => this._parseJSON(response))
            .then(data => { this.setState({ totalToday: data }, () => { this.props.onAllData(data); }) });
        setInterval(() => {
            if (this.state.isToday) {
                fetch('https://coronavirus-19-api.herokuapp.com/countries')
                    .then(response => this._parseJSON(response))
                    .then(data => { this.setState({ allCountriesToday: data }, () => { this.setNewDayCountries(false, true); }) });
                fetch('https://coronavirus-19-api.herokuapp.com/all')
                    .then(response => this._parseJSON(response))
                    .then(data => {
                        this.setState({ totalToday: data }, () => { this.props.onAllData(data); })
                    });
            }
        }, 300000);
    }

    componentDidMount() {
        if (this.state.allCountries.length === 0) {
            document.getElementById("rangeDiv").style.display = "none";
            document.getElementsByClassName("loader")[0].style.display = "block";
            document.getElementById("resWait").style.display = "block";
        }
    }

    handleChange(e) {
        const last = new Date(this.state.startDate + (e.target.value * 24 * 60 * 60 * 1000));
        const day = last.getDate();
        const month = last.getMonth() + 1;
        const newDay = month + '/' + day + '/' + 20
        if (Number(this.state.today["mm"]) === month && Number(this.state.today["dd"]) === day) {
            this.setState({ newDay: newDay }, () => {
                this.setState({ isToday: true }, () => {
                    this.setNewDayCountries(false);
                })
            })
        } else {
            this.setState({ newDay: newDay }, () => {
                this.setState({ isToday: false }, () => {
                    this.setNewDayCountries(true);
                })
            })
        }
    }

    setNewDayCountries(customDay, isInterval = false) {
        if (customDay) {
            const newDayCountries = [];
            const newDay = this.state.newDay;
            this.state.allCountries.forEach(country => {
                let same = false;
                if (country.countryregion === 'US') {
                    country.countryregion = 'USA'
                }
                if (country.countryregion === 'United Kingdom') {
                    country.countryregion = 'UK'
                }
                newDayCountries.forEach(e => {
                    if (e.country === country.countryregion) {
                        if (country.provincestate === "Greenland") {
                            newDayCountries.push(
                                {
                                    "country": country.provincestate,
                                    "cases": country.timeseries[newDay] ? country.timeseries[newDay].confirmed : 0,
                                    "todayCases": null,
                                    "deaths": country.timeseries[newDay] ? country.timeseries[newDay].deaths : 0,
                                    "todayDeaths": null,
                                    "recovered": country.timeseries[newDay] ? country.timeseries[newDay].recovered : 0,
                                    "active": null,
                                    "critical": null,
                                    "casesPerOneMillion": null,
                                    "deathsPerOneMillion": null,
                                    "country_code": country.countrycode ? country.countrycode.iso2 ? country.countrycode.iso2 : undefined : undefined,
                                    "flag": country.countrycode ? country.countrycode.iso2 ? `https://www.countryflags.io/${country.countrycode.iso2}/flat/64.png` : undefined : undefined,
                                }
                            )
                        } else if (country.timeseries[newDay]) {
                            e.cases = e.cases + (country.timeseries[newDay].confirmed ? country.timeseries[newDay].confirmed : 0);
                            e.deaths = e.deaths + country.timeseries[newDay].deaths;
                            e.recovered = e.recovered + country.timeseries[newDay].recovered;
                        }
                        same = true;
                    }
                });
                if (!same) {
                    this.setState({ isDayNull: country.timeseries[newDay] ? false : true });
                    newDayCountries.push(
                        {
                            "country": country.countryregion,
                            "cases": country.timeseries[newDay] ? country.timeseries[newDay].confirmed : 0,
                            "todayCases": null,
                            "deaths": country.timeseries[newDay] ? country.timeseries[newDay].deaths : 0,
                            "todayDeaths": null,
                            "recovered": country.timeseries[newDay] ? country.timeseries[newDay].recovered : 0,
                            "active": null,
                            "critical": null,
                            "casesPerOneMillion": null,
                            "deathsPerOneMillion": null,
                            "country_code": country.countrycode ? country.countrycode.iso2 ? country.countrycode.iso2 : undefined : undefined,
                            "flag": country.countrycode ? country.countrycode.iso2 ? `https://www.countryflags.io/${country.countrycode.iso2}/flat/64.png` : undefined : undefined,
                        }
                    )
                }
            });
            this.sort_by_key(newDayCountries, 'cases');
            let totalDeaths = 0;
            let totalConfirmed = 0;
            let totalRecovered = 0;
            newDayCountries.forEach(e => {
                totalConfirmed = totalConfirmed + (e.cases ? e.cases : 0);
                totalDeaths = totalDeaths + (e.deaths ? e.deaths : 0);
                totalRecovered = totalRecovered + (e.recovered ? e.recovered : 0);
            });
            this.props.onDaySet(newDayCountries, true);
            this.props.onAllData({
                cases: totalConfirmed,
                deaths: totalDeaths,
                recovered: totalRecovered
            });
        } else {
            this.setState({ isDayNull: false });
            this.sort_by_key(this.state.allCountriesToday, 'cases');
            this.state.allCountriesToday.forEach(e => {
                if (e.country === "UAE") {
                    e.country = "United Arab Emirates";
                }
                if (e.country === "Ivory Coast") {
                    e.country = "Côte d'Ivoire";
                }
                if (e.country === "Congo") {
                    e.country = "Congo (Brazzaville)";
                }
                if (e.country === "S. Korea") {
                    e.country = "Korea, South";
                }
            })
            const newCases = isInterval ? false : true;
            this.props.onDaySet(this.state.allCountriesToday, newCases);
            this.props.onAllData(this.state.totalToday);
        }
    }

    sort_by_key(array, key) {
        if (array && array.length && array.length !== 0) {
            return array.sort(function (a, b) {
                var x = a[key]; var y = b[key];
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        }
    }

    _parseJSON(response) {
        return response.text().then(function (text) {
            return text ? JSON.parse(text) : {}
        })
    }


    render() {
        return (
            <div id="dayRange">
                <div>
                    <h3>{this.state.newDay}</h3>
                    {this.state.isDayNull ? <p style={{ color: "red" }} >Seçili güne ait veri bulunamadı.</p> : null}
                </div>
                <input type="range" min="0" max={this.state.totalDays} className="slider" id="daySlider" onChange={this.handleChange}></input>
            </div>
        )
    }
}