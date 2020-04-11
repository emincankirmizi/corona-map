import React from 'react';
import Chart from 'react-apexcharts';
import './LineChart.css';
import countries from '../../../../../Map/coords/centerCountries.json';
import { Button } from 'react-bootstrap';
import language from '../../../../../language';

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options1: {
            },
            series1: [
            ],
            options2: {
            },
            series2: [
            ],
            options3: {
            },
            series3: [
            ],
            options4: {
            },
            series4: [
            ],
            isDataNull: false,
            choosenData: null,
            isCompareCountry: true,
            value: "defaultOpt"
        };
        this.handleChange = this.handleChange.bind(this);
        this.removeCompare = this.removeCompare.bind(this);
    }

    componentDidMount() {
        this.fetchAndSet();
        countries.sort((a, b) => {
            return this.compareStrings(a.name, b.name);
        })
    }

    compareStrings(a, b) {
        // Assuming you want case-insensitive comparison
        a = a.toLowerCase();
        b = b.toLowerCase();

        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }

    fetchAndSet() {
        fetch(`https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=${this.props.choosen}&onlyCountries=false`)
            .then(response => this._parseJSON(response))
            .then(data => {
                if (data.length !== 0) {
                    const isDataNull = false;
                    this.setState({ isDataNull: isDataNull });
                    if (data[0] && data[0].timeseries) {
                        this.setState({ choosenData: data[0] })
                        const newArray = Object.keys(data[0].timeseries);
                        const deaths = [];
                        const recovered = [];
                        const total = [];
                        const xAxis = [];
                        const anonTotal = [];
                        const anonDeaths = [];
                        const anonRecovered = [];
                        newArray.forEach((e, i) => {
                            if (data[0].timeseries[e].confirmed !== 0) {
                                recovered.push(data[0].timeseries[e].recovered);
                                deaths.push(data[0].timeseries[e].deaths);
                                total.push(data[0].timeseries[e].confirmed);
                                xAxis.push(e);
                            }
                        });
                        for (let i = 0; i < total.length; i++) {
                            if (i === 0) {
                                anonTotal.push(total[i]);
                            } else if (i === total.length - 1) {
                                break;
                            }
                            else {
                                anonTotal.push(total[i + 1] - total[i])
                            }
                        }
                        for (let i = 0; i < deaths.length; i++) {
                            if (i === 0) {
                                anonDeaths.push(deaths[i]);
                            } else if (i === deaths.length - 1) {
                                break;
                            }
                            else {
                                anonDeaths.push(deaths[i + 1] - deaths[i])
                            }
                        }
                        for (let i = 0; i < recovered.length; i++) {
                            if (i === 0) {
                                anonRecovered.push(recovered[i]);
                            } else if (i === recovered.length - 1) {
                                break;
                            }
                            else {
                                anonRecovered.push(recovered[i + 1] - recovered[i])
                            }
                        }
                        this.setState({
                            series1: [{
                                name: `${language[this.props.languageCode].cases}`,
                                data: total,
                            },
                            {
                                name: `${language[this.props.languageCode].deaths}`,
                                data: deaths,
                            },
                            {
                                name: `${language[this.props.languageCode].recovered}`,
                                data: recovered
                            }]
                        })
                        this.setState({
                            options1: {
                                chart: {
                                    id: `genelDurum_${this.props.choosen}`
                                },
                                xaxis: {
                                    categories: xAxis
                                },
                                colors: ["#0483D8", "#E61904", "#04D816"],
                                stroke: {
                                    width: 4
                                },
                                title: {
                                    text: `${language[this.props.languageCode].generalStatus} ${this.props.choosen}`,
                                    align: 'left',
                                    offsetX: 20,
                                    offsetY: 20,
                                    style: {
                                        color: '#66a8ff'
                                    }
                                }
                            }
                        })
                        this.setState({
                            series2: [
                                {
                                    name: `${language[this.props.languageCode].deaths}`,
                                    data: anonDeaths,
                                }]
                        })
                        this.setState({
                            options2: {
                                chart: {
                                    id: `gunlukOlum_${this.props.choosen}`
                                },
                                xaxis: {
                                    categories: xAxis
                                },
                                colors: ["#E61904"],
                                dataLabels: {
                                    enabled: false
                                },
                                fill: {
                                    type: 'gradient',
                                    gradient: {
                                        shadeIntensity: 1,
                                        opacityFrom: 0.7,
                                        opacityTo: 0.9,
                                        stops: [0, 100]
                                    }
                                },
                                title: {
                                    text: `${language[this.props.languageCode].dailyDeaths} ${this.props.choosen}`,
                                    align: 'left',
                                    offsetX: 20,
                                    offsetY: 20,
                                    style: {
                                        color: '#66a8ff'
                                    }
                                }
                            }
                        })
                        this.setState({
                            series3: [
                                {
                                    name: `${language[this.props.languageCode].recovered}`,
                                    data: anonRecovered,
                                }]
                        })
                        this.setState({
                            options3: {
                                chart: {
                                    id: `gunlukIyılesen_${this.props.choosen}`
                                },
                                xaxis: {
                                    categories: xAxis
                                },
                                colors: ["#04D816"],
                                dataLabels: {
                                    enabled: false
                                },
                                fill: {
                                    type: 'gradient',
                                    gradient: {
                                        shadeIntensity: 1,
                                        opacityFrom: 0.7,
                                        opacityTo: 0.9,
                                        stops: [0, 100]
                                    }
                                },
                                title: {
                                    text: `${language[this.props.languageCode].dailyRecovered} ${this.props.choosen}`,
                                    align: 'left',
                                    offsetX: 20,
                                    offsetY: 20,
                                    style: {
                                        color: '#66a8ff'
                                    }
                                }
                            }
                        })
                        this.setState({
                            series4: [{
                                name: `${language[this.props.languageCode].cases}`,
                                data: anonTotal,
                            }]
                        })
                        this.setState({
                            options4: {
                                chart: {
                                    id: `gunlukVaka_${this.props.choosen}`
                                },
                                xaxis: {
                                    categories: xAxis
                                },
                                colors: ["#0483D8"],
                                dataLabels: {
                                    enabled: false
                                },
                                fill: {
                                    type: 'gradient',
                                    gradient: {
                                        shadeIntensity: 1,
                                        opacityFrom: 0.4,
                                        opacityTo: 0.2,
                                        stops: [0, 100]
                                    }
                                },
                                title: {
                                    text: `${language[this.props.languageCode].dailyCase} ${this.props.choosen}`,
                                    align: 'left',
                                    offsetX: 20,
                                    offsetY: 20,
                                    style: {
                                        color: '#66a8ff'
                                    }
                                }
                            }
                        })
                    }
                } else {
                    const isDataNull = true;
                    this.setState({ isDataNull: isDataNull });
                }
            });
    }

    _parseJSON(response) {
        return response.text().then(function (text) {
            return text ? JSON.parse(text) : {}
        })
    }

    setGraph(data1, data2, purpose) {
        let name;
        let data1Array = [];
        let data2Array = [];
        let xAxis = [];
        let newArray1;
        let newArray2;
        if (purpose === 2) {
            name = `${language[this.props.languageCode].cases}`;
            const total1 = [];
            newArray1 = Object.keys(data1.timeseries);
            newArray1.forEach(e => {
                total1.push(data1.timeseries[e].confirmed);
                xAxis.push(e);
            })
            data1Array = total1;
            const total2 = [];
            newArray2 = Object.keys(data2.timeseries);
            newArray2.forEach(e => {
                total2.push(data2.timeseries[e].confirmed);
            })
            data2Array = total2;
        } else if (purpose === 3) {
            name = `${language[this.props.languageCode].deaths}`;
            const deaths1 = [];
            newArray1 = Object.keys(data1.timeseries);
            newArray1.forEach(e => {
                deaths1.push(data1.timeseries[e].deaths);
            })
            data1Array = deaths1;
            const deaths2 = [];
            newArray2 = Object.keys(data2.timeseries);
            newArray2.forEach(e => {
                deaths2.push(data2.timeseries[e].deaths);
            })
            data2Array = deaths2;
        } else if (purpose === 4) {
            name = `${language[this.props.languageCode].recovered}`;
            const recovered1 = [];
            newArray1 = Object.keys(data1.timeseries);
            newArray1.forEach(e => {
                recovered1.push(data1.timeseries[e].recovered);
            })
            data1Array = recovered1;
            const recovered2 = [];
            newArray2 = Object.keys(data2.timeseries);
            newArray2.forEach(e => {
                recovered2.push(data2.timeseries[e].recovered);
            })
            data2Array = recovered2;
        }
        this.setState({
            series5: [{
                name: data1.countryregion,
                data: data1Array,
            },
            {
                name: data2.countryregion,
                data: data2Array,
            }]
        })
        this.setState({
            options5: {
                chart: {
                    id: `${data1.countrycode.iso2}_${data2.countrycode.iso2}`
                },
                xaxis: {
                    categories: xAxis
                },
                colors: ["#0483D8", "#E61904"],
                stroke: {
                    width: 4
                },
                title: {
                    text: `${language[this.props.languageCode].comparativeTotal} ${name}, ${data1.countrycode.iso2}- ${data2.countrycode.iso2}`,
                    align: 'left',
                    offsetX: 20,
                    offsetY: 20,
                    style: {
                        color: '#66a8ff'
                    }
                },
                onDatasetHover: {
                    highlightDataSeries: true,
                },
            }
        })
    }

    handleChange(e) {
        const compareCountry = e.target.value;
        this.setState({ value: compareCountry });
        fetch(`https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=${compareCountry}&onlyCountries=false`)
            .then(response => this._parseJSON(response))
            .then(data => {
                if (data.length !== 0) {
                    this.setState({ isCompareCountry: true });
                    this.setState({ graphicId: 5 },
                        this.setGraph(this.state.choosenData, data[0], this.props.graphicId)
                    );
                } else {
                    this.setState({ isCompareCountry: false });
                    this.setState({ graphicId: 0 });
                }
            });
    };

    removeCompare() {
        this.setState({ value: "defaultOpt" });
        this.setState({ graphicId: 0 });
        this.setState({ isCompareCountry: true });
    }

    render() {
        return (
            <div>
                {this.state.isDataNull ? <p>Bu ülke için veri bulunamadı.</p> :
                    <div className="dashoardArea">
                        {this.props.graphicId !== 1 ? <div id="compareCountry">
                            <select id="countries" value={this.state.value} onChange={this.handleChange}>
                                <option value="defaultOpt" disabled="disable">{language[this.props.languageCode].selectCompare}</option>
                                {countries.map(country => (
                                    <option key={country.name} value={country.country_code}>{country.name}</option>
                                ))}
                            </select>
                            <Button id="removeCompare" variant="outline-primary" size="xs" onClick={this.removeCompare}>{language[this.props.languageCode].remove}</Button>
                            {this.state.isCompareCountry ? null : <p style={{ color: "red" }}>{language[this.props.languageCode].noDataSelected}</p>}
                        </div> : null}
                        {this.props.graphicId === 1 && this.state.graphicId !== 5 ? <div id="allIssues">
                            <div className="row">
                                <div className="mixed-chart">
                                    <Chart
                                        options={this.state.options1}
                                        series={this.state.series1}
                                        type="line"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div> : null}
                        {this.props.graphicId === 2 && this.state.graphicId !== 5 ? <div id="casesArea">
                            <div className="row">
                                <div className="mixed-chart">
                                    <Chart
                                        options={this.state.options4}
                                        series={this.state.series4}
                                        type="area"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div> : null}
                        {this.props.graphicId === 3 && this.state.graphicId !== 5 ? <div id="deathsArea">
                            <div className="row">
                                <div className="mixed-chart">
                                    <Chart
                                        options={this.state.options2}
                                        series={this.state.series2}
                                        type="area"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div> : null}
                        {this.props.graphicId === 4 && this.state.graphicId !== 5 ? <div id="recoveredArea">
                            <div className="row">
                                <div className="mixed-chart">
                                    <Chart
                                        options={this.state.options3}
                                        series={this.state.series3}
                                        type="area"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div> : null}
                        {this.state.graphicId === 5 ? <div id="compareCountryArea">
                            <div className="row">
                                <div className="mixed-chart">
                                    <Chart
                                        options={this.state.options5}
                                        series={this.state.series5}
                                        type="line"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div> : null}
                    </div>
                }
            </div>
        );
    }

}