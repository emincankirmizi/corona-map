import React from 'react';
import Chart from 'react-apexcharts';
import './LineChart.css';

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
            isDataNull: false
        };
    }

    componentDidMount() {
        this.fetchAndSet();
        console.log(this.props.graphicId);
    }

    fetchAndSet() {
        fetch(`https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=${this.props.choosen}&onlyCountries=false`)
            .then(response => response.json())
            .then(data => {
                const isDataNull = data.length === 0 ? true : false;
                this.setState({ isDataNull: isDataNull });
                if (data[0] && data[0].timeseries) {
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
                            name: "Vaka",
                            data: total,
                        },
                        {
                            name: "Ölüm",
                            data: deaths,
                        },
                        {
                            name: "İyileşme",
                            data: recovered
                        }]
                    })
                    this.setState({
                        options1: {
                            chart: {
                                id: "basic-bar"
                            },
                            xaxis: {
                                categories: xAxis
                            },
                            colors: ["#0483D8", "#E61904", "#04D816"],
                            stroke: {
                                width: 4
                            }
                        }
                    })
                    this.setState({
                        series2: [
                            {
                                name: "Ölüm",
                                data: anonDeaths,
                            }]
                    })
                    this.setState({
                        options2: {
                            chart: {
                                id: "basic-area"
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
                        }
                    })
                    this.setState({
                        series3: [
                            {
                                name: "İyileşen",
                                data: anonRecovered,
                            }]
                    })
                    this.setState({
                        options3: {
                            chart: {
                                id: "basic-area"
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
                        }
                    })
                    this.setState({
                        series4: [{
                            name: "Vaka",
                            data: anonTotal,
                        }]
                    })
                    this.setState({
                        options4: {
                            chart: {
                                id: "basic-area"
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
                        }
                    })
                }
            });
    }

    render() {
        return (
            <div className="dashoardArea">
                {this.state.isDataNull ? <p>Bu ülke için veri bulunamadı.</p> : null}
                {this.props.graphicId === 1 ? <div id="allIssues">
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
                {this.props.graphicId === 2 ? <div id="casesArea">
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
                {this.props.graphicId === 3 ? <div id="deathsArea">
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
                {this.props.graphicId === 4 ? <div id="recoveredArea">
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
            </div>
        );
    }

}