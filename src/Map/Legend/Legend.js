import React from 'react';
import './Legend.css';

export default class Map extends React.Component {

    render() {
        return (
            <div className="legend">
                <div className="legTitle">
                    <h4>Lejant</h4>
                </div>
                <span className="dot" style={{ 'backgroundColor': 'rgba(255, 64, 0, 0.65)' }}></span>&nbsp;&nbsp;&nbsp;&nbsp;&lt; 100<br></br>
                <span className="dot" style={{ 'backgroundColor': 'rgba(186, 74, 0, 0.65)' }}></span>&nbsp;&nbsp;&nbsp;&nbsp;&lt; 500<br></br>
                <span className="dot" style={{ 'backgroundColor': 'rgba(255, 26, 26, 0.65)' }}></span>&nbsp;&nbsp;&nbsp;&nbsp;&lt; 1000<br></br>
                <span className="dot" style={{ 'backgroundColor': 'rgba(255, 0, 0, 0.65)' }}></span>&nbsp;&nbsp;&nbsp;&nbsp;&lt; 5000<br></br>
                <span className="dot" style={{ 'backgroundColor': 'rgba(230, 0, 0, 0.65)' }}></span>&nbsp;&nbsp;&nbsp;&nbsp;&lt; 1000<br></br>
                <span className="dot" style={{ 'backgroundColor': 'rgba(204, 0, 0, 0.65)' }}></span>&nbsp;&nbsp;&nbsp;&nbsp;&lt; 30000<br></br>
                <span className="dot" style={{ 'backgroundColor': 'rgba(179, 0, 0, 0.65)' }}></span>&nbsp;&nbsp;&nbsp;&nbsp;&gt; 30000
            </div>
        )
    }

}