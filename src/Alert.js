import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faExclamationTriangle,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.icon = faExclamationTriangle;
    }

    getIcon = () => {
        return <FontAwesomeIcon icon={this.icon} />;
    }

    getStyle = () => {
        return {
            color: this.color,
            fontWeight: 'bold'
        };
    }

    render() {
        return (
            <div className="Alert">
                
                <p style={this.getStyle()}>
                    {this.props.text !== '' 
                        ? this.getIcon()
                        : null} {this.props.text}</p>
            </div>
        );
    }    
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#BA5550';
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#31598F';
        this.icon = faInfoCircle;
    }
}

Alert.propTypes = {
    text: PropTypes.string.isRequired
};

export {ErrorAlert, InfoAlert};