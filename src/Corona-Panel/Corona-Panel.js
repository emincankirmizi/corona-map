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
            isMobile: false,
            message: null,
            currentData: null,
            newDay: [],
            continentCorona: [],
        }
    }

    componentDidMount() {
        if (!("Notification" in window)) {
            this.setState({ isMobile: true });
            alert("Bu cihaz bilgilendirmelere izin vermiyor.");
        } else if (Notification.permission !== 'denied' || Notification.permission === "default") {
            Notification.requestPermission(function (permission) {
            });
        }
        this.setState({ design: 'area' });
        document.getElementById('area').checked = true;
        if (window.innerWidth > 600) {
            document.getElementById("panel").style.display = "block";
            document.getElementsByClassName('hamburger')[0].classList.toggle('change');
        } else {
            document.getElementById("panel").style.display = "none";
        }

        const closeNewBtn = document.getElementsByClassName('closeNewPanel')[0];
        closeNewBtn.addEventListener("click", function () {
            document.getElementsByClassName('newCases')[0].style.display = 'none';
        });
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
                            "text": `${data[i].country} yeni vakalar açıkladı.Yeni sayı: ${data[i].cases}`,
                            "case": 0
                        });
                    }
                    if (this.state.totalCountryCorona[i].deaths < data[i].deaths) {
                        newCasesArray.push({
                            "text": `${data[i].country} yeni kayıpları açıkladı. Yeni sayı: ${data[i].deaths}`,
                            "case": 1
                        });
                    }
                    if (this.state.totalCountryCorona[i].recovered < data[i].recovered) {
                        newCasesArray.push({
                            "text": `${data[i].country} yeni iyileşen vakaları açıkladı. Yeni sayı: ${data[i].recovered}`,
                            "case": 2
                        });
                    }
                }
            }
            if (newCasesArray.length !== 0) {
                this.setState({ newCases: newCasesArray });
                this.setState({ openNewCases: true });
                if (!this.state.isMobile) {
                    if (Notification.permission === "granted") {
                        new Notification("Yeni gelişmeler var.");
                    }
                }
                document.getElementsByClassName('newCases')[0].style.display = 'block';
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
            if (window.innerWidth > 600) {
                document.getElementsByClassName("infoPanel")[0].style.left = "350px";
                document.getElementsByClassName("infoPanel")[0].style.top = "0px";
            } else {
                document.getElementsByClassName("infoPanel")[0].style.width = "100%";
                document.getElementsByClassName("infoPanel")[0].style.left = "0px";
                document.getElementsByClassName("infoPanel")[0].style.top = "0px";
                document.getElementsByClassName("infoPanel")[0].style.borderRadius = "5px";
                document.getElementsByClassName("infoPanel")[0].style.height = "100%";
            }
        } else {
            document.getElementById("panel").style.display = "none";
            if (document.getElementsByClassName('infoPanel')[0].style.display !== "none") {
                if (window.innerWidth < 600) {
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
                const closeInfoBtn = document.getElementsByClassName('closeInfoPanel')[0];
                const btnListener = closeInfoBtn.addEventListener("click", () => {
                    this.setState({ openInfo: false });
                    closeInfoBtn.removeEventListener("click", btnListener)
                });
            }
        });
        this.setState({ choosenCountry: choosenCountry });
        this.setState({ choosenCou: choosenCou });
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
                    <PanelTitle />
                    <TotalArea continentCorona={this.state.continentCorona} totalCorona={this.state.totalCorona} />
                    <MapPattern totalCountryCorona={this.state.totalCountryCorona} map={this.props.map} />
                    <DayRange onDaySet={this.setDay} onAllData={this.setAllCountries}></DayRange>
                    <CountriesArea totalCountryCorona={this.state.totalCountryCorona} map={this.props.map} setInfoParams={this.setInfoParams} />
                </div>
                {this.state.openInfo ? <CountryInfo choosenCountry={this.state.choosenCountry} choosenCou={this.state.choosenCou} /> : null}
                <div className="newCases" style={{ display: this.state.openNewCases ? 'block' : 'none' }}>
                    <span className="closeNewPanel">&times;</span>
                    <div className="newCasesTitle">
                        <h5>Yeni Vakalar</h5>
                    </div>
                    {this.state.newCases.map((cases, index) => (
                        <div className="descCases" key={index}>
                            <p style={{ color: cases.case === 0 ? 'white' : cases.case === 1 ? '#C81313' : cases.case === 2 ? '#43BA1F' : "black" }}>{cases.text}</p>
                        </div>
                    ))}
                </div>
            </div >
        );
    }
}