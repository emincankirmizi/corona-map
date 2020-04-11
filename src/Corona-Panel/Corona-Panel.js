import React from 'react';
import './Corona-Panel.css';
import countries from '../Map/coords/centerCountries.json';
// import countriesNames from '../coords/countries.json';
import DayRange from './Day-Range/Day-Range';
import TotalArea from './Total-Area/Total-Area'
import MapPattern from './Map-Pattern/Map-Pattern'
import PanelTitle from './Panel-Title/Panel-Title'
import CountriesArea from './Countries-Area/Countries-Area'
import CountryInfo from './Countries-Area/Country-List/Country-Info/Country-Info';
import NewCase from './New-Cases/New-Cases'
import language from '../language'
require('bootstrap/dist/css/bootstrap.css');

export default class CoronaPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalCountryCorona: [],
            totalCorona: [],
            allStutation: true,
            onlyRecovered: false,
            onlyDeaths: false,
            choosenCountry: [],
            countries: countries,
            newCases: [],
            openNewCases: false,
            openInfo: false,
            isMobile: false,
            message: null,
            currentData: null,
            newDay: [],
            showLineChart: false,
            continentCorona: [],
            languageCode: 1,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        if (!("Notification" in window)) {
            this.setState({ isMobile: true });
            alert("Bu cihaz bilgilendirmelere izin vermiyor.");
        } else if (Notification.permission !== 'denied' || Notification.permission === "default") {
            Notification.requestPermission(function (permission) {
            });
        }
        if (window.innerWidth > 600) {
            document.getElementById("panel").style.display = "block";
            document.getElementsByClassName('hamburger')[0].classList.toggle('change');
        } else {
            document.getElementById("panel").style.display = "none";
        }
    }

    setCountryData(data, dayRange = false) {
        if (data.length === 0) {
            return;
        }
        if (this.state.totalCountryCorona.length !== 0 && !dayRange) {
            const newCasesArray = [];
            for (let i = 0; i < this.state.totalCountryCorona.length; i++) {
                if (this.state.totalCountryCorona[i].country !== "World" && this.state.totalCountryCorona[i].country !== "Europe"
                    && this.state.totalCountryCorona[i].country !== "Africa" && this.state.totalCountryCorona[i].country !== "North America"
                    && this.state.totalCountryCorona[i].country !== "Asia" && this.state.totalCountryCorona[i].country !== "Oceania" &&
                    this.state.totalCountryCorona[i].country !== "South America" && this.state.totalCountryCorona[i].country !== "Total:") {
                    if (this.state.totalCountryCorona[i].cases < data[i].cases) {
                        newCasesArray.push({
                            "text": `${data[i].country} ${language[this.state.languageCode].announcedCase} ${language[this.state.languageCode].newCount} ${data[i].cases}`,
                            "case": 0
                        });
                    }
                    if (this.state.totalCountryCorona[i].deaths < data[i].deaths) {
                        newCasesArray.push({
                            "text": `${data[i].country} ${language[this.state.languageCode].announcedDeaths} ${language[this.state.languageCode].newCount} ${data[i].deaths}`,
                            "case": 1
                        });
                    }
                    if (this.state.totalCountryCorona[i].recovered < data[i].recovered) {
                        newCasesArray.push({
                            "text": `${data[i].country} ${language[this.state.languageCode].announcedRecovered} ${language[this.state.languageCode].newCount} ${data[i].recovered}`,
                            "case": 2
                        });
                    }
                }
            }
            if (newCasesArray.length !== 0) {
                this.setState({ newCases: newCasesArray });
                this.setState({ openNewCases: true }, () => {
                    const closeInfoBtn = document.getElementsByClassName('closeNewPanel')[0];
                    const btnListener = closeInfoBtn.addEventListener("click", () => {
                        this.setState({ openNewCases: false });
                        closeInfoBtn.removeEventListener("click", btnListener)
                    });
                });
                if (!this.state.isMobile) {
                    if (Notification.permission === "granted") {
                        new Notification("Yeni gelişmeler var.");
                    }
                }
            }
        }
        const continentCorona = data.filter(continent => {
            if (continent.country === "World" || continent.country === "Europe"
                || continent.country === "Africa" || continent.country === "North America"
                || continent.country === "Asia" || continent.country === "Oceania" || continent.country === "South America") {
                return continent;
            }
            return null;
        })
        this.setState({ continentCorona: continentCorona })
        this.setState({ totalCountryCorona: data }, () => {
            this.checkData();
        })
    }

    setAllData(data) {
        if (data.length === 0) {
            return;
        }
        this.setState({ totalCorona: data })
    }

    setFlags() {
        const tc = this.state.totalCountryCorona.find(o2 => "Turks and Caicos" === o2.country);
        if (tc) {
            tc.country_code = "tc";
            tc.flag = `https://www.countryflags.io/tc/flat/64.png`;
            this.setState({ totalCountryCorona: this.state.totalCountryCorona })
        }
        const vc = this.state.totalCountryCorona.find(o2 => "St. Vincent Grenadines" === o2.country);
        if (vc) {
            vc.country_code = "vc";
            vc.flag = `https://www.countryflags.io/vc/flat/64.png`;
            this.setState({ totalCountryCorona: this.state.totalCountryCorona })
        }
        const cv = this.state.totalCountryCorona.find(o2 => "Cabo Verde" === o2.country);
        if (cv) {
            cv.country_code = "cv";
            cv.flag = `https://www.countryflags.io/cv/flat/64.png`;
            this.setState({ totalCountryCorona: this.state.totalCountryCorona })
        }
        const sz = this.state.totalCountryCorona.find(o2 => "Eswatini" === o2.country);
        if (sz) {
            sz.country_code = "cv";
            sz.flag = `https://www.countryflags.io/sz/flat/64.png`;
            this.setState({ totalCountryCorona: this.state.totalCountryCorona })
        }
        const cd = this.state.totalCountryCorona.find(o2 => "DRC" === o2.country);
        if (cd) {
            cd.country_code = "cd";
            cd.flag = `https://www.countryflags.io/cd/flat/64.png`;
            this.setState({ totalCountryCorona: this.state.totalCountryCorona })
        }
        const fo = this.state.totalCountryCorona.find(o2 => "Faeroe Islands" === o2.country);
        if (fo) {
            fo.country_code = "fo";
            fo.flag = `https://www.countryflags.io/fo/flat/64.png`;
            this.setState({ totalCountryCorona: this.state.totalCountryCorona })
        }
        const mk = this.state.totalCountryCorona.find(o2 => "North Macedonia" === o2.country);
        if (mk) {
            mk.country_code = "mk";
            mk.flag = `https://www.countryflags.io/mk/flat/64.png`;
            this.setState({ totalCountryCorona: this.state.totalCountryCorona })
        }
        this.state.countries.filter(
            o => {
                const aa = this.state.totalCountryCorona.find(o2 => o.name === o2.country);
                if (aa) {
                    const o2 = this.state.countries.find(o => aa.country === o.name);
                    if (o2) {
                        aa.country_code = o2.country_code;
                        aa.flag = `https://www.countryflags.io/${o2.country_code}/flat/64.png`;
                        this.setState({ totalCountryCorona: this.state.totalCountryCorona })
                    }
                }
                return o;
            }
        )
    }

    checkData() {
        this.setFlags();
    }

    hamburgerClick(x) {
        document.getElementsByClassName('hamburger')[0].classList.toggle('change');
        if (document.getElementById("panel").style.display === "none") {
            document.getElementById("panel").style.display = "block";
            if (this.state.openInfo) {
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
        } else {
            document.getElementById("panel").style.display = "none";
            if (this.state.openInfo) {
                if (window.innerWidth < 769) {
                    document.getElementsByClassName('infoPanel')[0].style.display = "none"
                } else {
                    document.getElementsByClassName("infoPanel")[0].style.left = "0px";
                    document.getElementsByClassName("infoPanel")[0].style.top = "40px";
                }
            }
        }
    }

    setDay = (day, isToday) => {
        if (day.length) {
            document.getElementById("covidAPIWait").style.display = "none";
            this.setState({ newDay: day });
            this.setCountryData(day, isToday);
            day.forEach(element => {
                if (element.country === this.state.choosenCountry.country) {
                    this.setState({ choosenCountry: element });
                }
            });
        } else {
            document.getElementById("covidAPIWait").style.display = "block";
        }
    }

    setAllCountries = (total) => {
        this.setAllData(total);
    }

    setInfoParams = (openInfo, choosenCountry, choosenCou) => {
        this.setState({ openInfo: openInfo }, () => {
            if (this.state.openInfo) {
                this.setState({ showLineChart: true });
                const closeInfoBtn = document.getElementsByClassName('closeInfoPanel')[0];
                const btnListener = closeInfoBtn.addEventListener("click", () => {
                    this.setState({ openInfo: false });
                    this.setState({ showLineChart: false });
                    closeInfoBtn.removeEventListener("click", btnListener)
                });
            }
        });
        this.setState({ choosenCountry: choosenCountry });
        this.setState({ choosenCou: choosenCou });
    }

    handleClick(e) {
        const code = e.target.id === 'tr' ? 1 : 0;
        this.setState({ languageCode: code }, () => this.props.onSetLocalization(this.state.languageCode));
    }

    render() {
        return (
            <div>
                <div className="hamburger" onClick={() => this.hamburgerClick()}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div id="panel">
                    <div id="localArea">
                        <input id="tr" type="image" width="40px" height="40px" alt="Türkçe" src="https://www.countryflags.io/TR/flat/64.png" onClick={this.handleClick} />
                        <input id="en" type="image" width="40px" height="40px" alt="Ingilizce" src="https://www.countryflags.io/GB/flat/64.png" onClick={this.handleClick} />
                    </div>
                    <PanelTitle languageCode={this.state.languageCode} />
                    <TotalArea continentCorona={this.state.continentCorona} totalCorona={this.state.totalCorona} languageCode={this.state.languageCode} />
                    {this.state.totalCountryCorona && this.state.totalCountryCorona.length !== 0 ?
                        <MapPattern totalCountryCorona={this.state.totalCountryCorona} map={this.props.map} languageCode={this.state.languageCode} /> : null}
                    <DayRange onDaySet={this.setDay} onAllData={this.setAllCountries} languageCode={this.state.languageCode}></DayRange>
                    <CountriesArea totalCountryCorona={this.state.totalCountryCorona} map={this.props.map} setInfoParams={this.setInfoParams} languageCode={this.state.languageCode} />
                </div>
                {this.state.openInfo ? <CountryInfo choosenCountry={this.state.choosenCountry} choosenCou={this.state.choosenCou} showLineChart={this.state.showLineChart} languageCode={this.state.languageCode} /> : null}
                {this.state.openNewCases ? <NewCase newCases={this.state.newCases} languageCode={this.state.languageCode} /> : null}
            </div >
        );
    }
}