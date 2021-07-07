import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
    }

    getStyle = () => {
        return {
            color: this.color
        };
    }

    render() {
        return (
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }    
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
    }

    getStyle = () => {
        return {
            color: '#BA5550',
            fontWeight: 'bold'
        };
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#31598F';
    }
}

Alert.propTypes = {
    text: PropTypes.string.isRequired
};

export {ErrorAlert, InfoAlert};