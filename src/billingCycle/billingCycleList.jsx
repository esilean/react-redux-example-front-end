import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import Reactable from 'reactable'

import { getList, showUpdate, showDelete, filterList } from './billingCycleActions'

import Grid from '../common/layout/grid'
import LabelAndInputFilter from '../common/form/labelAndInputFilter'



var Table = Reactable.Table,
    Thead = Reactable.Thead,
    Th = Reactable.Th,
    Tr = Reactable.Tr,
    Td = Reactable.Td;

class BillingCycleList extends Component {


    renderRows() {

        const list = this.props.list || []
        const nameFilter = this.props.nameFilter || ''

        return list
            .filter(function (el) {
                return el.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
                    el.month.toString().includes(nameFilter) ||
                    el.year.toString().includes(nameFilter);
            })
            .map(bc => (
                <Tr key={bc._id}>
                    <Td column='name' data={bc.name}>{bc.name}</Td>
                    <Td column='month' data={bc.month}>{bc.month}</Td>
                    <Td column='year' data={bc.year}>{bc.year}</Td>
                    <Td column=''>
                        <div>
                            <button className='btn btn-warning' onClick={() => this.props.showUpdate(bc)}>
                                <i className='fa fa-pencil'></i>
                            </button>
                            <button className='btn btn-danger' onClick={() => this.props.showDelete(bc)}>
                                <i className='fa fa-trash-o'></i>
                            </button>
                        </div>
                    </Td>
                </Tr>
            ))

    }

    componentDidMount() {
        $('tbody.reactable-pagination tr td').addClass('custom-pagination');
    }

    render() {

        return (
            <div role='form' className='box-body'>
                <Grid cols='12 9 10'>
                    <LabelAndInputFilter name='nameF'
                        label='Nome Filtro' cols='12 4' placeholder='Informe o nome'
                        onChange={this.props.filterList}
                        value={this.props.nameFilter} />
                </Grid>
                <Table className='table table-bordered table-hover'
                    itemsPerPage={1}
                    pageButtonLimit={3}
                    sortable={true}>
                    <Thead>
                        <Th column='name'>Nome</Th>
                        <Th column='month'>Mês</Th>
                        <Th column='year'>Ano</Th>
                        <Th column='' className='table-actions'>Ações</Th>
                    </Thead>
                    {this.renderRows()}
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => ({ list: state.billingCycle.list, nameFilter: state.billingCycle.nameFilter })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, showDelete, filterList }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList)