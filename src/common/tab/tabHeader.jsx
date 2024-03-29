import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { selectedTab } from './tabActions'
import If from '../operator/if'

class TabHeader extends Component {

    render() {

        const selected = this.props.tab.selected === this.props.target
        const visible = this.props.tab.visible[this.props.target]

        return (
            <If test={visible}>
                <li className={selected ? 'active' : ''}>
                    <a href='javascript:;'
                        data-toggle="tab"
                        onClick={() => this.props.selectedTab(this.props.target)}
                        data-target={this.props.target}>
                        <i className={`fa fa-${this.props.icon}`}></i> <span>{this.props.label}</span>
                    </a>
                </li>
            </If>
        )
    }
}

const mapStateToProps = state => ({ tab: state.tab })
const mapDispatchToProps = dispatch => bindActionCreators({ selectedTab }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TabHeader)