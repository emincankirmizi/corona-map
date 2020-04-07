import React from 'react';
import './Corona-Count.css';
import L from 'leaflet';
import data from '../coords/coords.json';
import countries from '../coords/centerCountries.json';
// import countriesNames from '../coords/countries.json';
import LineChart from '../../Map/LineChart/LineChart';
import DayRange from '../..//Map/Day-Range/Day-Range';
import { DropdownButton, Dropdown } from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');

export default class CoronaCount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalCountryCorona: [],
            totalCorona: [],
            allStutation: true,
            onlyRecovered: false,
            onlyDeaths: false,
            openInfo: false,
            choosenCountry: [],
            countries: countries,
            newCases: [],
            openNewCases: false,
            isMobile: false,
            showLineChart: false,
            message: null,
            design: null,
            currentData: null,
            newDay: [],
            graphicId: 1
        }
        this.handleChange = this.handleChange.bind(this);
        this.setCircle = this.setCircle.bind(this);
        this.setArea = this.setArea.bind(this);
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
        const closeInfoBtn = document.getElementsByClassName('closeInfoPanel')[0];
        closeInfoBtn.addEventListener("click", function () {
            document.getElementsByClassName('infoPanel')[0].style.display = 'none';
        });

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
                if (this.state.totalCountryCorona[i].country !== "World") {
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
        this.props.map.eachLayer((layer) => {
            if (!layer['_url']) {
                this.props.map.removeLayer(layer);
            }
        });
        this.setFlags();
        if (this.state.design === 'area') {
            for (let i = 0; i < data[0].features.length; i++) {
                let coronaExist = false;
                for (let y = 0; y < this.state.totalCountryCorona.length; y++) {
                    if (data[0].features[i].properties.name === this.state.totalCountryCorona[y].country) {
                        coronaExist = true;
                    }
                }
                if (!coronaExist) {
                    if (this.state.design) {
                        const aa = data[0].features[i];
                        const countStyle = {
                            "color": '#ffffff',
                            "weight": 0.1,
                            "opacity": 0.55
                        };
                        L.geoJSON(aa, {
                            style: countStyle,
                            onEachFeature: (f, l) => {
                                l.bindPopup(`
                                <div id="mapPopup">
                                <b>${aa.properties.name}</b><br>
                                <b>Vaka yok.</b><br>
                                </div>
                                `);
                            }
                        }).addTo(this.props.map);
                    }
                }
            }
            data[0].features.filter(
                o => {
                    const aa = this.state.totalCountryCorona.find(o2 => o.properties.name === o2.country);
                    if (aa) {
                        // const o2 = this.state.countries.find(o => aa.country === o.name);
                        // if (o2) {
                        //     aa.country_code = o2.country_code;
                        //     aa.flag = `https://www.countryflags.io/${o2.country_code}/flat/64.png`;
                        //     this.setState({ totalCountryCorona: this.state.totalCountryCorona })
                        // }
                        const countStyle = {
                            "color": aa.active > 30000 ? '#1a0000' : aa.active > 10000 ? '#660000' : aa.active > 5000 ? '#b30000' : aa.active > 1000 ? '#ff0000' : aa.active > 500 ? '#ff3333' : aa.active > 100 ? '#ff8080' : '#ffcccc',
                            "weight": 0.1,
                            "opacity": 0.55
                        };
                        if (aa.active === 0) {
                            const bb = o;
                            const nullStyle = {
                                "color": '#ffffff',
                                "weight": 0.1,
                                "opacity": 0.55
                            };
                            L.geoJSON(bb, {
                                style: nullStyle,
                                onEachFeature: (f, l) => {
                                    l.bindPopup(`
                                    <div id="mapPopup">
                                    <b>${bb.properties.name}</b><br>
                                    <b>Vaka yok.</b><br>
                                    </div>
                                    `);
                                }
                            }).addTo(this.props.map);
                        } else {
                            L.geoJSON(o, {
                                style: countStyle,
                                onEachFeature: (f, l) => {
                                    l.bindPopup(`
                                    <div id="mapPopup">
                                    <img src=${aa.flag} style={{ float: "left" }} width="30px" height="30px" alt="flag"></img>
                                    <b>${aa.country}</b>
                                    <hr id="rowLine">
                                    <p><span class="dotCasesMap"></span><b>Vaka:${aa.active}</b></p>
                                    <p><span class="dotDeathsMap"></span><b>Ölüm:${aa.deaths}</b></p>
                                    <p><span class="dotRecoveredMap"></span><b>İyileşen:${aa.recovered}</b></p>
                                    </div>
                                    `);
                                }
                            }).addTo(this.props.map);
                        }
                    }
                    return true;
                })
        } else {
            this.state.totalCountryCorona.filter(
                o2 => {
                    const aa = this.state.countries.find(o => o2.country === o.name)
                    if (aa) {
                        if (o2.active !== 0) {
                            o2.country_code = aa.country_code;
                            o2.flag = `https://www.countryflags.io/${aa.country_code}/flat/64.png`;
                            this.setState({ totalCountryCorona: this.state.totalCountryCorona })
                            const circleCenter = aa.latlng;
                            const circleOptions = {
                                color: "#0483d8",
                                fillColor: "#0483d8",
                                fillOpacity: 0.3,
                                weight: 3
                            }
                            const radius = o2.active > 30000 ? o2.active * 3 : o2.active > 10000 ? o2.active * 5 : o2.active > 5000 ? o2.active * 10 : o2.active > 1000 ? o2.active * 15 : o2.active > 500 ? o2.active * 20 : o2.active > 100 ? o2.active * 25 : o2.active * 100
                            const circle = L.circle(circleCenter, radius, circleOptions);
                            circle.bindPopup(`
                        <div id="mapPopup">
                        <img src=${o2.flag} style={{ float: "left" }} width="30px" height="30px" alt="flag"></img>
                        <b>${o2.country}</b>
                        <p><span class="dotCasesMap"></span><b>Vaka:${o2.active}</b></p>
                        <p><span class="dotDeathsMap"></span><b>Ölüm:${o2.deaths}</b></p>
                        <p><span class="dotRecoveredMap"></span><b>İyileşen:${o2.recovered}</b></p>
                        </div>
                        `);
                            circle.addTo(this.props.map);
                        }
                    }
                    return true;
                })
        }
    }

    chooseCountry(country) {
        this.setState({ showLineChart: false });
        document.getElementsByClassName('infoPanel')[0].style.display = 'none';
        this.choosenCou = this.state.countries.filter(
            c => c.name === country.country
        )
        this.setState({ choosenCountry: country });
        if (this.choosenCou[0] && this.choosenCou[0].latlng) {
            this.props.map.setView(this.choosenCou[0].latlng, 5);
            setTimeout(() => {
                this.setState({ showLineChart: true });
            }, 1);
        }
        document.getElementsByClassName('infoPanel')[0].style.display = 'block';
        this.setState({ graphicId: 1 });
        this.props.map.on('click', (e) => {
            this.setState({ showLineChart: false });
            document.getElementsByClassName('infoPanel')[0].style.display = 'none';
        });
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

    handleChange(e) {
        this.setState({
            message: e.target.value
        });
    };

    setCircle(e) {
        this.setState({ design: 'circle' });
        setTimeout(() => {
            this.setCountryData(this.state.totalCountryCorona);
            document.getElementsByClassName('legend')[0].style.display = "none";
        }, 1);
    };

    setArea(e) {
        this.setState({ design: 'area' });
        setTimeout(() => {
            this.setCountryData(this.state.totalCountryCorona);
            document.getElementsByClassName('legend')[0].style.display = "block";
        }, 1);
    };

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

    openGraphic(graphicId) {
        this.setState({ graphicId: graphicId });
    }

    render() {
        return (
            <div>
                <div id="panel">
                    <div className="all">
                        <a href="https://hsgm.saglik.gov.tr/tr/covid19" target="window.open()"><h1>Covid-19</h1></a>
                        <a href="https://coronavirus-19-api.herokuapp.com/countries" target="window.open()"><p>Covid-19-API #EvdeKal</p></a>
                    </div>
                    <div id="allInfo" className="allInfo">
                        <span className="dotCases"></span><h5>Toplam Vaka: {this.state.totalCorona.cases}</h5>
                        <hr id="rowLine"></hr>
                        <span className="dotDeaths"></span><h5>Toplam Ölüm: {this.state.totalCorona.deaths}</h5>
                        <hr id="rowLine"></hr>
                        <span className="dotRecovered"></span><h5>Toplam İyileşen: {this.state.totalCorona.recovered}</h5>
                    </div>
                    <div id="mapPattern" className="map-design">
                        <p style={{ color: "#A20B06", fontSize: "small" }}><i>Sınıflandırmalar aktif vakalara göre yapılmıştır.</i></p>
                        <span>Gösterim Şekli:</span>&nbsp;&nbsp;
                        <input type="radio" id="area" name="design" value="area" onChange={this.setArea} ></input>
                        <label htmlFor="area">Alan</label>&nbsp;&nbsp;
                        <input type="radio" id="circle" name="design" value="circle" onChange={this.setCircle} ></input>
                        <label htmlFor="circle">Daire</label>
                    </div>
                    <div className="loader"></div>
                    <div id="resWait">
                        <p>Zamanlayıcı için veri bekleniyor.</p>
                    </div>
                    <div id="rangeDiv">
                        <DayRange onDaySet={this.setDay} onAllData={this.setAllCountries}></DayRange>
                    </div>
                    <div id="searchBox" className="search-box">
                        <input type="text" placeholder="Ülke adı girin..." maxLength="7" onChange={this.handleChange}></input>
                    </div>
                    <div className="countries">
                        <div id="covidAPIWait">
                            <p style={{ color: "red" }}>Veri sağlayıcısına bağlanılamadı.</p>
                        </div>
                        {this.state.totalCountryCorona.filter(e => {
                            if (this.state.message) {
                                return e.country.toLowerCase().includes(this.state.message.toLowerCase());
                            } else {
                                return e;
                            }
                        }).map(country => (
                            country.country !== "World" ?
                                <div className="country" key={country.country} onClick={() => this.chooseCountry(country)}>
                                    <img src={country.flag} style={{ float: "left", marginTop: "-6px", marginRight: "1px" }} width="30px" height="30px" alt="flag"></img><span style={{ fontSize: "15px" }}>{country.country}</span><span style={{ fontSize: "12px", color: "#E61904", float: "right" }}>{country.todayDeaths && country.todayDeaths !== 0 ? `+${country.todayDeaths}` : null}</span><span style={{ fontSize: "12px", color: "#0483D8", float: "right", marginRight: "3px" }}>{country.todayCases && country.todayCases !== 0 ? `+${country.todayCases}` : null}</span>
                                    <hr id="rowLine"></hr>
                                    <div className="title">
                                        <p><span className="dotCasesInfo"></span><span> Vaka: {country.cases}</span></p>
                                        {/* <p>Bugün: {country.todayCases}</p> */}
                                        <p><span className="dotDeathsInfo"></span><span> Ölüm: {country.deaths}</span></p>
                                        <p><span className="dotRecoveredInfo"></span><span>İyileşen: {country.recovered}</span></p>
                                        <span>Detay için tıklayınız...</span>
                                        {/* {this.state.onlyDeaths || this.state.allStutation ? <p>Durumu Kritik: {country.critical}</p> : null}
                <p>Aktif: {country.active}</p> */}
                                        {/* {country.casesPerOneMillion ? <p>Bir Milyonda: {country.casesPerOneMillion} kişi</p> : null} */}
                                    </div>
                                </div> : null
                        ))}
                    </div>
                </div>
                <div className="hamburger" onClick={() => this.hamburgerClick()}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className="infoPanel" style={{ display: this.state.openInfo ? 'block' : 'none' }}>
                    <span className="closeInfoPanel">&times;</span>
                    <div className="infoPanelTitle">
                        <img src={this.state.choosenCountry.flag} style={{ float: "left" }} width="30px" height="30px" alt="flag"></img><h5 style={{ marginTop: "2px" }}>{this.state.choosenCountry.country} (Toplam: {this.state.choosenCountry.cases})</h5>
                    </div>
                    <div id="inforPanelContent" className="infoPanelContent">
                        <div className="row">
                            <div className="column">
                                <p>Aktif: <span id="values">{this.state.choosenCountry.active}</span></p>
                                <p>İyileşen: <span id="values">{this.state.choosenCountry.recovered}</span></p>
                                <p>Durumu Kritik: <span id="values">{this.state.choosenCountry.critical}</span></p>
                                <p>Bir Milyonda Vaka: <span id="values">{this.state.choosenCountry.casesPerOneMillion ? `${this.state.choosenCountry.casesPerOneMillion} kişi` : null}</span></p>
                                <p>Test Sayısı: <span id="values">{this.state.choosenCountry.totalTests ? `${this.state.choosenCountry.totalTests} kişi` : null}</span></p>
                            </div>
                            <div className="column">
                                <p>Ölüm: <span id="values">{this.state.choosenCountry.deaths}</span></p>
                                <p>Bugünkü Ölümler: <span id="values">{this.state.choosenCountry.todayDeaths}</span></p>
                                <p>Bugünkü Vakalar: <span id="values">{this.state.choosenCountry.todayCases}</span></p>
                                <p>Bir Milyonda Ölen: <span id="values">{this.state.choosenCountry.deathsPerOneMillion ? `${this.state.choosenCountry.deathsPerOneMillion} kişi` : null}</span></p>
                                <p>Bir Milyonda Test: <span id="values">{this.state.choosenCountry.testsPerOneMillion ? `${this.state.choosenCountry.testsPerOneMillion} kişi` : null}</span></p>
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
                        {this.state.showLineChart ? <LineChart choosen={this.choosenCou[0].country_code} graphicId={this.state.graphicId}></LineChart> : null}
                    </div>
                    <p style={{ textAlign: "center", color: "#66a8ff" }}>Grafik Veri Sağlayıcısı: Johns Hopkins University</p>
                </div>
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