import React, { Component } from 'react'
import ReactDOM from 'react-dom'

//コンポーネント
import Form from './form'
import Confirm from './confirm'

//Form
const Main = props =>{
    const { title, rendering } = props.data.confirmVisible ? {
        title: 'Confirm',
        rendering: <Confirm {...props} />,
    } : {
        title: 'Form',
        rendering: <Form {...props} />,
    }

    return (
        <div>
            <h2>{title}</h2>
            {rendering}
        </div>
    )
}

export default Main
