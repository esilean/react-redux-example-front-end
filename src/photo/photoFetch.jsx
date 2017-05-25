import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getImages, selectImage } from './photoActions'

import { Carousel } from 'react-responsive-carousel'

import Grid from '../common/layout/grid'

class PhotoFetch extends Component {

    componentDidMount(){
        this.props.getImages()
    }

    renderImages(images) {
        
        return images.map(i => (
            <div key={i.name}>
                <img src={i.url} />
                <p className="legend">{i.name}</p>
            </div>
        ))
    }

    render() {

        const images = this.props.images || []

        return (
            <Grid cols={this.props.cols}>
                <div className='carouselDiv'>
                    <Carousel
                        axis="horizontal"
                        showThumbs={true}
                        selectedItem={this.props.selectedItem}
                        showArrows={true}
                        infiniteLoop={true}
                        //dynamicHeight 
                        //autoPlay={false}
                        //stopOnHover={true}
                        width='620px'
                        emulateTouch={false}
                    >
                        {this.renderImages(images)}
                    </Carousel>
                </div>
            </Grid>
        )
    }

}

const mapStateToProps = state => ({ images: state.photo.images, selectedItem: state.photo.selectedItem })
const mapDispatchToProps = dispatch => bindActionCreators({ getImages, selectImage }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PhotoFetch)