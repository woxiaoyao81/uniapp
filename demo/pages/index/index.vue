<template>
	<view class="container">
		<view class="title">
			<text>安装软件数量是:{{ num }}个</text>
		</view>
		<view class="btn" @click="btnGetApp"><text>获取所有包名和应用名</text></view>
		<scroll-view class="box-container" scroll-y="true">
			<view class="box">
				<view class="box-item" v-for="(item, index) of appArr" :key="index">
					<view>
						<text>{{ item.appName }}</text>
					</view>
					<view class="name">
						<text>{{ item.packName }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import wxy from '@/common/wxy-android.js';
export default {
	data() {
		return {
			num: 0,
			appArr: []
		};
	},
	methods: {
		btnGetApp() {
			// #ifdef APP-PLUS			
			let appArr=[];
			uni.showLoading({
				title: '获取中',
				mask: true,
				success:(res)=>{
					appArr = wxy.getApplication();
					this.num = appArr.length;
					this.appArr = appArr;
					uni.hideLoading();					
				}
			});			
			// #endif
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	width: 100vw;
	height: 100vh;
	overflow: hidden;

	.title {
		font-size: 1.5em;
		text-align: center;
	}

	.btn {
		width: 50vw;
		padding: 0 1em;
		background-color: #007d20;
		color: white;
		border-radius: 1em;
		margin: 0.5em auto;
		line-height: 2em;
		text-align: center;
	}

	.box-container {
		height: 100%;

		.box {
			padding: 5px 1em;
			
			.box-item {
				line-height: 1.5em;
				
				.name{
					background-color: lightgray;
				}
			}
		}
	}
}
</style>
