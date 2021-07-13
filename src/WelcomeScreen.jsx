import React from 'react';
import './WelcomeScreen.css';
import PropTypes from 'prop-types';

function WelcomeScreen({showWelcomeScreen, getAccessToken}) {
    return showWelcomeScreen ?
        (
            <div className="WelcomeScreen">
                <h1>Welcome to the Meet app</h1>
                <h4>
                    Log in to see upcoming events around the world for
                    full-stack
                    developers
                </h4>
                <div className="button_cont" >
                    <div className="google-btn">
                        <div className="google-icon-wrapper">
                            <img
                                className="google-icon"
                                // eslint-disable-next-line max-len
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="Google sign-in"
                            />
                        </div>
                        <button onClick={() => { getAccessToken(); }}
                            rel="nofollow noopener"
                            className="btn-text"
                        >
                            <b>Sign in with google</b>
                        </button>
                    </div>
                </div>
                <a
                    // eslint-disable-next-line max-len
                    href={`${process.env.PUBLIC_URL}/privacy-policy.html`}
                    rel="nofollow noopener"
                >
    Privacy policy
                </a>
            </div>
        )
        : null;
}

WelcomeScreen.propTypes = {
    getAccessToken: PropTypes.func.isRequired,
    showWelcomeScreen: PropTypes.bool.isRequired
};

export default WelcomeScreen;