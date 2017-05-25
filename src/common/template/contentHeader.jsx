import React from 'react'

export default props => (
    <section className="content-header">
        <h1>
            {props.title}
            <small>{props.subtitle}</small>
        </h1>
        <ol className="breadcrumb">
            <li><a href="#"><i className={`fa fa-${props.icon}`}></i> Inicial</a></li>
            <li className="active">{props.title}</li>
            <li className="active">{props.subtitle}</li>
        </ol>
    </section>
)