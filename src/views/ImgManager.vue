<template>
	<div class="container">
		<header>
			<p><span class="header-icon"></span><span>活动维护</span></p>
		</header>
		<div class="content">
			<div class="search">
				<el-row>
					<el-col :span="4">
						<el-button
								type="primary"
								icon="el-icon-plus"
								@click="dialogFormVisible=true"
								size="small">新增活动</el-button>
					</el-col>
				</el-row>
				<el-table
						:data="tableData"
						v-loading="loading"
						max-height="500px"
						stripe
						style="width: 100%">
					<template slot="empty">
						<img :src="urlImg" style="width: 200px; margin-top: 20px;"/>
						<p style="margin: 0; line-height: 30px">暂无数据</p>
					</template>
					<el-table-column
							type="selection"
							width="55">
					</el-table-column>
					<el-table-column
							label="活动图片">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.name }}</span>
						</template>
					</el-table-column>
					<el-table-column
							label="生效时间">
						<template slot-scope="scope">
							<span>{{scope.row.shopname}}</span>
						</template>
					</el-table-column>
					<el-table-column
							label="失效时间">
						<template slot-scope="scope">
							<span>{{scope.row.address}}</span>
						</template>
					</el-table-column>
					<el-table-column
							label="推送范围">
						<template slot-scope="scope">
							<span>{{scope.row.phone}}</span>
						</template>
					</el-table-column>
					<el-table-column
							label="活动地址">
						<template slot-scope="scope">
							<span>{{scope.row.open_time}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="150">
						<template slot-scope="scope">
							<el-button
									size="mini"
									type="primary" plain>修改</el-button>
							<el-button
									size="mini"
									type="danger" plain>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="page">
					<el-pagination
							small
							layout="prev, pager, next"
							@current-change="changePage"
							:page-count="count">
					</el-pagination>
				</div>

			</div>
		</div>
		<add-img
				:isShowDialog="dialogFormVisible"
				@closeCreateMenuDialog="closeCreateMenuDialog"
		/>
	</div>
</template>

<script>
	import urlImg from '../static/no-data2.png'
	import AddImg from './AddImg.vue'
	export default {
		name: 'imgManager',
		props: {},
		components: {
			AddImg
		},
		data () {
			return {
				urlImg,
				tableData: [{name: 'test'}],
				loading: false,
				dialogFormVisible: false,
				count: 0
			}
		},
		computed: {},
		methods: {
			closeCreateMenuDialog() {
				this.dialogFormVisible = false
			},
			changePage() {}
		}
	}

</script>
<style>
	.container {
		padding: 15px;
		background: #f5f8ff;

	}
	header {
		height: 50px;
		line-height: 50px;
		box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2), 0px 3px 10px 0px rgba(0, 0, 0, 0.19);
		padding: 0 10px;
		background-color: #fff;
	}
	header > p {
		display: flex;
		align-items: center;
		font-size: 14px;

	}
	span.header-icon {
		width: 5px;
		height: 20px;
		background-color: #409EFF;
		display: inline-block;
		margin-right: 10px
	}
	.content {
		margin-top: 20px;
	}
	.search {
		padding: 20px 10px;
		background-color: #fff;
		overflow: hidden;
	}
	.el-row {
		margin: 20px 0;
	}
	.search .page {
		margin-top: 15px;
		text-align: right;
	}
</style>