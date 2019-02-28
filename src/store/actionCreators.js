import actionTypes from './actionTypes'

const actionCreators = {
  getInputVal: (value) => ({
    type: actionTypes.ADD_TODO_ITEM,
    value
  }) 
}

export default actionCreators