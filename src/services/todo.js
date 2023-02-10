import request from "umi-request";

/**
 * 获取所有的todoLists
 * @returns 
 */
export const getTodoLists=async ()=>{
    return request('/api/todoList')
}

/**
 * 添加todoLists
 * @returns 
 */
export const addTodoLists=async (data)=>{
    console.log("data",data);
    const url='/api/todo'
    const options={
        data
    }
    return request.post(url,options)
}

/**
 * 添加todoLists
 * @returns 
 */
export const edit =async (data)=>{
    console.log(data);
    const url='/api/edit' 
    const option={
        data
    } 
    return request.put(url,option)
}