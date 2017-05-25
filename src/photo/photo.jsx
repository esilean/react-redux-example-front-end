import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Row from '../common/layout/row'
import UploadFile from '../common/upload/uploadFile'
import PhotoFetch from './photoFetch'


class Photo extends Component {

    render() {
        return (
            <div>
                <ContentHeader title='Photo Load' subtitle='Lorem Ipsum' icon='photo' />
                <Content>
                    <Row>
                        <UploadFile cols='12' />
                    </Row>
                    <Row>
                        <PhotoFetch cols='5'/>
                    </Row>
                </Content>
            </div>
        )
    }

}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Photo)