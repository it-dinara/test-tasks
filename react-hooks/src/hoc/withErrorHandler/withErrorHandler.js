import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../_Aux/_Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        UNSAVE_componentWillMount () {
            this.reqInterceptor = axios.request.use( req => {
                this.setState( { error: null } );
                return req;
            } );
            this.resInterceptor = axios.response.use( res => res, error => {
				this.setState( { error: error } );
				console.log(error)
            } );
        }

        componentWillUnmount () {
            axios.request.eject( this.reqInterceptor );
            axios.response.eject( this.resInterceptor );
        }

        errorConfirmedHandler = () => {
            this.setState( { error: null } );
        }

        render () {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;