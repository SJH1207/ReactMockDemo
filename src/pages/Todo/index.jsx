import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { Alert, Button, message } from 'antd';
import { Table, Tag, Space } from 'antd';
import { addTodoLists, edit, editTodoLists } from '@/services/todo';
import {connect} from 'umi'
import Modal from 'antd/lib/modal/Modal';
import ProForm, { ProFormText } from '@ant-design/pro-form';

class Todo extends Component {

    state = { isModalVisible: false }

    // 关闭模态框
    handleCancel = () => {
        this.setState({ isModalVisible: false })
    }

    // 打开模态框
    showForm = () => {
        this.setState({ isModalVisible: true })
    }

    // 提交表单后验证
    handleForm = async (value) => {
        // 添加todo
        const res = await addTodoLists(value)

        if (res.code === 0) {
            // 刷新todolist
            this.getData()
            message.success(res.message)
        } else {
            message.error(res.message)
        }
    }

    changeStatus = async (id, status) => {
        // console.log(id,status);
        // 调用services中的方法，修改状态
        const res = await edit({ id, status });

        // 判断执行结果
        if (res.code === 0) {
            this.getData()
            message.success(res.message);
        } else {
            message.error(res.message);
        }
    }

      // 刷新页面的方法
  getData = () => {
    this.props.dispatch({
      type: 'todo/getTodoList',
      payload: null,
    });
  };

    render() {
        // 方式1
        // state = {
        //     data: [],
        // };
        // componentDidMount =async () => {
        //     const {data}=this.state
        //     const resData =await getTodoLists()
        //     console.log(resData);
        //     this.setState({ data: resData })
        //     console.log(data);
        // }
        // console.log('props',this.props);

        // 方法2  models在用户模块书写过  useEffect(){dispatch}
        // src\components\RightContent\AvatarDropdown.jsx
        // const { todoList } = this.props.todo;
        // const data = todoList;
        // 简写，获得todoList并改名为data
        const { todoList: data } = this.props.todo;

        const status = [
            <Alert message="待办" type="info" showIcon />,
            <Alert message="已完成" type="success" showIcon />,
            <Alert message="取消" type="error" showIcon />,
        ];

        // status  0待办  1完成  2取消
        // const data = [
        //     { id: 1, title: 'TodoList列表', status: 1 },
        //     { id: 2, title: 'TodoList添加', status: 2 },
        //     { id: 3, title: 'TodoList编辑', status: 0 },
        //     { id: 4, title: 'TodoList查看', status: 0 },
        //     { id: 5, title: 'TodoList总结', status: 2 },
        //     { id: 6, title: 'TodoList修改状态', status: 1 },
        // ];

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '标题',
                dataIndex: 'title',
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (_, record) => {
                    console.log(record);
                    // if (record.status === 0) {
                    //     return <Alert message="待办" type="info" showIcon />
                    // }
                    // if (record.status === 1) {
                    //     return <Alert message="已完成" type="success" showIcon />
                    // }
                    // if (record.status === 2) {
                    //     return <Alert message="取消" type="error" showIcon />
                    // }

                    // 简写方式
                    return status[record.status];
                },
            },
            {
                title: '修改状态',
                render: (_, record) => {
                    let editOperation = [];
                    if (record.status !== 0) {
                        editOperation.push(
                            <a onClick={() => this.changeStatus(record.id, 0)} key={0}>
                                待办{' '}
                            </a>,
                        );
                    }
                    if (record.status !== 1) {
                        editOperation.push(
                            <a onClick={() => this.changeStatus(record.id, 1)} key={1}>
                                完成{' '}
                            </a>,
                        );
                    }
                    if (record.status !== 2) {
                        editOperation.push(
                            <a onClick={() => this.changeStatus(record.id, 2)} key={2}>
                                取消{' '}
                            </a>,
                        );
                    }
                    return editOperation;
                }
            }
        ];

        return (
            <PageContainer>
                <ProTable
                    columns={columns}
                    search={false}
                    dataSource={data}
                    // request={async () => {
                    //     return { data: await getTodoLists() };
                    // }}
                    dateFormatter="string"
                    headerTitle="表格标题"
                    toolBarRender={() => [
                        <Button type="primary" key="primary" onClick={this.showForm}>
                            <PlusOutlined />
                            新建
                        </Button>,
                    ]}
                />

                <Modal
                    title="添加待办事项"
                    footer={null}
                    visible={this.state.isModalVisible}
                    onCancel={this.handleCancel}
                >
                    <ProForm onFinish={this.handleForm}>
                        <ProFormText name="todo" label="待办事项" rules={[{ required: true }]} />
                    </ProForm>
                </Modal>,
            </PageContainer>
        );
    }
}

export default connect(({ todo }) => ({ todo }))(Todo)