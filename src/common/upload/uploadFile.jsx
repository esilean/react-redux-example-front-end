import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DropzoneComponent from 'react-dropzone-component';

import { getImages } from '../../photo/photoActions'

import Grid from '../layout/grid'

class UploadFile extends Component {
    constructor(props) {
        super(props);

        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif",
            maxFiles: 3,
            dictMaxFilesExceeded: 'Máximo de imagens permitidas',
            params: {
                produto: '44562',
                cor: '036'
            }
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            //postUrl: 'http://localhost:51186/api/v1/ccf/upload'
            postUrl: 'http://localhost:3004/uploadHandler'
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        this.success = file => console.log('uploaded', file);

        this.removedfile = file => console.log('removing...', file);

        this.dropzone = null;

        this.callback = this.callback.bind(this)

    }

    // Simple callbacks work too, of course
    callback() {
        this.props.getImages()
    }

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            complete: this.callback,
            success: this.success,
            removedfile: this.removedfile
        }

        return (
            <Grid cols={this.props.cols}>
                <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
            </Grid>
        )
    }
}

const mapStateToProps = state => ({ selectedItem: state.photo.selectedItem })
const mapDispatchToProps = dispatch => bindActionCreators({ getImages }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(UploadFile)