import React from 'react';
import './New-Cases.css';
import language from '../../language'

export default class NewCase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            continentDisplay: null,
            mouseContent: null,
            x: null,
            y: null
        }
    }

    render() {
        return (
            <div className="newCases">
                <span className="closeNewPanel">&times;</span>
                <div className="newCasesTitle">
                    <h5>{language[this.props.languageCode].newCases}</h5>
                </div>
                {this.props.newCases.map((cases, index) => (
                    <div className="descCases" key={index}>
                        <p style={{ color: cases.case === 0 ? 'white' : cases.case === 1 ? '#C81313' : cases.case === 2 ? '#43BA1F' : "black" }}>{cases.text}</p>
                    </div>
                ))}
            </div>
        )
    }
}