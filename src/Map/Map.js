import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`;

export default class Map extends React.Component {

    setMap() {
        const bounds = new L.LatLngBounds(new L.LatLng(-400, -350), new L.LatLng(400, 350));
        this.map = L.map('map', {
            center: [39, 35],
            zoom: 3,
            maxBounds: bounds,
            maxBoundsViscosity: 0.3,
            maxZoom: 7,
            minZoom: 2,
            zoomControl: false
        });
        this.props.onMapSet(this.map);
    }

    setZoomButton() {
        L.control.zoom({
            position: 'bottomright'
        }).addTo(this.map);
    }

    addBaseLayer() {
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a> -- <a href="https://tr.linkedin.com/in/emin-can-kirmizi-b14398144" target="window.open()">Emin Can Kırmızı tarafından yapıldı.</a>',
            subdomains: 'abcd',
            maxZoom: 12,
        }).addTo(this.map);
    }

    componentDidMount() {
        this.setMap();
        this.setZoomButton();
        this.addBaseLayer();
    }

    render() {
        return (
            <Wrapper id="map">
            </Wrapper>
        )
    }
}