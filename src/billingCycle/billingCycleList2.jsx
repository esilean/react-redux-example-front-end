import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getList, showUpdate, showDelete } from './billingCycleActions'

import $ from 'jquery'
$.DataTable = require('datatables.net');

const columns = [
    {
        title: 'Nome',
        width: 120,
        data: 'name'
    },
    {
        title: 'Mês',
        width: 180,
        data: 'month'
    },
    {
        title: 'Ano',
        width: 180,
        data: 'year'
    },
    {
        title: 'Ações',
        width: 100
    },
];


function reloadTableData(names) {
    const table = $('.data-table-wrapper').find('table').DataTable();
    table.clear();
    table.rows.add(names);
    table.draw();
}

function updateTable(names) {
    const table = $('.data-table-wrapper').find('table').DataTable();
    let dataChanged = false;
    table.rows().every(function () {
        const oldNameData = this.data();
        const newNameData = names.find((nameData) => {
            return nameData.name === oldNameData.name;
        });
        if (oldNameData.nickname !== newNameData.nickname) {
            dataChanged = true;
            this.data(newNameData);
        }
        return true;
    });

    if (dataChanged) {
        table.draw();
    }
}


class BillingCycleList extends Component {
    constructor(props) {
        super(props)

    }

    componentWillMount() {
        console.log('componentWillMount')
        this.props.getList();

        $('.data-table-wrapper')
            .find('table')
            .DataTable()
            .destroy(true);
    }

    componentDidMount() {

        $(this.refs.main).DataTable({
            dom: '<"data-table-wrapper"t>',
            data: this.props.list,
            columns,
            ordering: false
        });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
        $('.data-table-wrapper').find('table').DataTable().destroy(true);
    }




    shouldComponentUpdate(nextProps) {
        console.log('shouldComponentUpdate')
        reloadTableData(nextProps);

        //    updateTable(nextProps);

        return false;
    }

    renderRows() {
        const list = this.props.list || []

        return list.map(bc => (
            <tr key={bc._id}>
                <td>{bc.name}</td>
                <td>{bc.month}</td>
                <td>{bc.year}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(bc)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.showDelete(bc)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ))

    }

    render() {

        console.log('render')

        this.componentDidMount1()

        return (
            <div className='box-body'>
                <table ref="main" />
            </div>
        )
    }
}

const mapStateToProps = state => ({ list: state.billingCycle.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, showDelete }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList)