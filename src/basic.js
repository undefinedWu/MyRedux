import { createStore, bindActionCreators, applyMiddleware } from 'redux'
import { numType, numAction, studentAction } from './redux/action'
import reducer from './redux/reducer'

const store = createStore(reducer)

