//import 'babel-polyfill' // SE UTILIZAR, INSTALAR NPM
import "regenerator-runtime/runtime"

import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import Routes from './main/routes'
import reducers from './main/reducers'
import { watchPhoto } from './photo/photoSaga'


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()

const saga = createSagaMiddleware(watchPhoto)
const store = applyMiddleware(multi, thunk, promise, saga)(createStore)(reducers, devTools)

//Tem que rodar para todo saga ????????????? bug?
saga.run(watchPhoto)

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>
    , document.getElementById('app'))
