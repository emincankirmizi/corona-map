import React from 'react';
import './Legend.css';

export default class Legend extends React.Component {

    render() {
        return (
            <div className="legend">
                <div className="legTitle">
                    <span>Lejant</span>
                </div>
                <span className="dot" style={{ 'backgroundColor': 'rgba(255, 255, 255, 0.65)' }}></span><span>&nbsp;&nbsp;&nbsp;&nbsp;Vaka Yok</span><br></br>
                <span className="dot" style={{ 'backgroundColor': 'rgba(255, 204, 204, 0.65)' }}></span><span>&nbsp;&nbsp;&nbsp;&nbsp;&lt; 100</span><br></br>
                <span className="dot" style={{ 'backgroundColor': 'rgba(255, 128, 128 , 0.65)' }}></span><span>&nbsp;&nbsp;&nbsp;&nbsp;&lt; 500</span><br></br>
                <span className="dot" style={{ 'backgroundColor': 'rgba(255, 51, 51, 0.65)' }}></span><span>&nbsp;&nbsp;&nbsp;&nbsp;&lt; 1000</span><br></br>
                <span className="dot" style={{ 'backgroundColor': 'rgba(255, 0, 0, 0.65)' }}></span><span>&nbsp;&nbsp;&nbsp;&nbsp;&lt; 5000</span><br></br>
                <span className="dot" style={{ 'backgroundColor': 'rgba(179, 0, 0, 0.65)' }}></span><span>&nbsp;&nbsp;&nbsp;&nbsp;&lt; 10000</span><br></br>
                <span className="dot" style={{ 'backgroundColor': 'rgba(102, 0, 0, 0.65)' }}></span><span>&nbsp;&nbsp;&nbsp;&nbsp;&lt; 30000</span><br></br>
                <span className="dot" style={{ 'backgroundColor': 'rgba(26, 0, 0, 0.65)' }}></span><span>&nbsp;&nbsp;&nbsp;&nbsp;&gt; 30000</span>
            </div>
        )
    }

}