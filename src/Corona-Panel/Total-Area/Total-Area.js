import React from 'react';
import './Total-Area.css';

export default class TotalArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            continentDisplay: null,
            mouseContent: null,
            x: null,
            y: null
        }
    }

    _onMouseMove(e) {
        const id = e.target.id;
        switch (id) {
            default:
                this.setState({ continentDisplay: "none" });
                break;
            case "dotCases":
                this.setState({ mouseContent: 1 })
                break;
            case "dotDeaths":
                this.setState({ mouseContent: 2 })
                break;
            case "dotRecovered":
                this.setState({ mouseContent: 3 })
                break;
        }
        this.setState({ continentDisplay: "block" });
        this.setState({ x: e.screeny, y: 0 });
    }


    _onMouseLeave(e) {
        this.setState({ continentDisplay: "none" });
    }

    render() {
        return (
            <div id="allInfo" className="allInfo">
                {/* {this.props.continentCorona.lenght !== 0 ? <div id="continentInfo" style={{ left: this.state.x, top: this.state.y, display: this.state.continentDisplay }}>
                    {this.props.continentCorona.map(continent => {
                        switch (this.state.mouseContent) {
                            default:
                                return null
                            case 1:
                                return <p key={continent.country}>{continent.country}: {continent.cases}</p>
                            case 2:
                                return <p key={continent.country}>{continent.country}: {continent.deaths}</p>
                            case 3:
                                return <p key={continent.country}>{continent.country}: {continent.recovered}</p>
                        }
                    })}
                </div> : null} */}
                <div id="totalCasesArea">
                    <span id="dotCases" className="dotCases" onMouseOverCapture={this._onMouseMove.bind(this)} onMouseLeave={this._onMouseLeave.bind(this)}></span><h5>Toplam Vaka: {this.props.totalCorona.cases}</h5>
                    <hr id="rowLine"></hr>
                </div>
                <div id="totalDeathsArea">
                    <span id="dotDeaths" className="dotDeaths" onMouseOverCapture={this._onMouseMove.bind(this)} onMouseLeave={this._onMouseLeave.bind(this)}></span><h5>Toplam Ölüm: {this.props.totalCorona.deaths}</h5>
                    <hr id="rowLine"></hr>
                </div>
                <div id="totalRecoveredArea">
                    <span id="dotRecovered" className="dotRecovered" onMouseOverCapture={this._onMouseMove.bind(this)} onMouseLeave={this._onMouseLeave.bind(this)}></span><h5>Toplam İyileşen: {this.props.totalCorona.recovered}</h5>
                </div>
            </div>
        )
    }
}