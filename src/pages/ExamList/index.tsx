import { Button, message, Popconfirm, Space } from 'antd';
import './index.scss';
import { useEffect, useState } from 'react';
import {
	examDelete,
	examList,
	examPublish,
	examUnpublish,
} from '../../interfaces';
import { ExamAddModal } from './ExamAddModal';

interface Exam {
	id: number;
	name: string;
	isPublish: boolean;
	isDelete: boolean;
	content: string;
}

export function ExamList() {
	const [list, setList] = useState<Array<Exam>>();
	const [isExamAddModalOpen, setIsExamAddModalOpen] = useState(false);
	const [bin, setBin] = useState(false);
	async function query() {
		try {
			const res = await examList();
			if (res.status === 201 || res.status === 200) {
				setList(res.data);
			}
		} catch (e: any) {
			message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
		}
	}
	async function changePublishState(id: number, publish: boolean) {
		try {
			const res = publish ? await examUnpublish(id) : await examPublish(id);
			if (res.status === 201 || res.status === 200) {
				message.success(publish ? '已取消发布' : '已发布');
				query();
			}
		} catch (e: any) {
			message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
		}
	}
	async function deleteExam(id: number) {
		try {
			const res = await examDelete(id);
			if (res.status === 201 || res.status === 200) {
				message.success('已删除');
				query();
			}
		} catch (e: any) {
			message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
		}
	}

	useEffect(() => {
		query();
	}, []);

	return (
		<div id='ExamList-container'>
			<div className='header'>
				<h1>考试系统</h1>
			</div>
			<div className='body'>
				<div className='operate'>
					<Space>
						<Button
							type='primary'
							onClick={() => {
								setIsExamAddModalOpen(true);
							}}
						>
							新建试卷
						</Button>
						<Button
							onClick={() => {
								setBin((bin) => !bin);
							}}
						>
							{bin ? '退出回收站' : '打开回收站'}
						</Button>
					</Space>
				</div>
				<div className='list'>
					{list
						?.filter((item) => {
							return bin ? item.isDelete === true : item.isDelete === false;
						})

						?.map((item) => {
							return (
								<div className='item'>
									<p>{item.name}</p>
									<div className='btns'>
										<Button
											className='btn'
											type='primary'
											style={{ background: 'darkblue' }}
											onClick={() => {
												changePublishState(item.id, item.isPublish);
											}}
										>
											{item.isPublish ? '停止' : '发布'}
										</Button>
										<Button
											className='btn'
											type='primary'
											style={{ background: 'green' }}
										>
											编辑
										</Button>
										<Popconfirm
											title='试卷删除'
											description='确认放入回收站吗？'
											onConfirm={() => deleteExam(item.id)}
											okText='Yes'
											cancelText='No'
										>
											<Button
												className='btn'
												type='primary'
												style={{ background: 'darkred' }}
											>
												删除
											</Button>
										</Popconfirm>
									</div>
								</div>
							);
						})}
				</div>
			</div>
			<ExamAddModal
				isOpen={isExamAddModalOpen}
				handleClose={() => {
					setIsExamAddModalOpen(false);
					query();
				}}
			/>
		</div>
	);
}
