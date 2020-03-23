import React from 'react';
import Chart from 'react-apexcharts';
import './LineChart.css';

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
            },
            series: [
            ]
        };
    }

    componentDidMount() {
        this.fetchAndSet();
    }

    fetchAndSet() {
        console.log(this.props.choosen);
        fetch(`https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=${this.props.choosen}&onlyCountries=false`)
            .then(response => response.json())
            .then(data => {
                if (data[0].timeseries) {
                    const newArray = Object.keys(data[0].timeseries);
                    const deaths = [];
                    const recovered = [];
                    const total = [];
                    const xAxis = [];
                    newArray.forEach((e, i) => {
                        if (data[0].timeseries[e].confirmed !== 0) {
                            recovered.push(data[0].timeseries[e].recovered);
                            deaths.push(data[0].timeseries[e].deaths);
                            total.push(data[0].timeseries[e].confirmed);
                            xAxis.push(e);
                        }
                    });
                    this.setState({
                        series: [{
                            name: "Vaka",
                            data: total
                        },
                        {
                            name: "Ölüm",
                            data: deaths
                        },
                        {
                            name: "İyileşme",
                            data: recovered
                        }]
                    })
                    this.setState({
                        options: {
                            chart: {
                                id: "basic-bar"
                            },
                            xaxis: {
                                categories: xAxis
                            }
                        }
                    })
                }
            });
    }

    render() {
        return (
            <div className="dashoardArea">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="500"
                        />
                    </div>
                </div>
            </div>
        );
    }

}