import { createStore } from 'redux'
 
// 新建store
// 通过reducer建立
// 根据老得state和action,生成新的state
function counter(state = 0, action) {
  switch(action.type) {
    case '加机关枪':
      return state + 1
    case '减机关枪':
      return state - 1
    default: 
      return 10
  }
}

const store = createStore(counter)
const init = store.getState()

function listener() {
  const cur = store.getState()
  console.log(cur)
}

// 订阅事件
store.subscribe(listener)

// 派发事件 传递action
store.dispatch({type: '加机关枪'})