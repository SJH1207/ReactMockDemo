import { getTodoLists } from "@/services/todo"

export default {
    // 调用model时，通过命名空间调用，不要和其他的model同名
    namespace: 'todo',

    // 状态，和raect中的state类似，和redux中保存的state一样
    state: {
        todoList:[]
    },

    // 调用接口获得数据
    effects: {
        *getTodoList({payload,callback},{call,put}){
            // 调用方法获取数据
            const resData =yield call(getTodoLists)
            // 调用reducers，并传递数据
            yield put({
                type:'setTodoList', // 类似于redux中action的type
                payload:resData
            })
        }
    },

    // 更新state
    // action能够接受到put来的数据
    reducers: {
        setTodoList(state,action){
            return {
                ...state,
                todoList:action.payload
            }
        }
    }


}
