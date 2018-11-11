<template>
	<section>
        <div class="rank-left">
            <ul>
                <li><img src="../../../../assets/images/first@3x.png"></li>
                <li><img src="../../../../assets/images/second@3x.png"></li>
                <li><img src="../../../../assets/images/third@3x.png"></li>
                <li><p>NO.4</p></li>
                <li><p>NO.5</p></li>
                <li><p>NO.6</p></li>
            </ul>
        </div>
		<div class="rank-right">
			<li 
				v-for="(item, index) in leaderBoardList" 
				 
			>
				<img :src="IP + item.imagePath" alt="头像">
				<!-- <img :src="studentPhoto" alt=""> -->
				<p class="user-name">{{item.username}}</p>
				<p class="student-id">{{item.studentId}}</p>
				<p class="score">{{item.score}} 分</p>
			</li>
		</div>
		<div class="clear"></div>
		<p v-if="leaderBoardList.length<=0" class="no-info"> 没有数据... </p>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import leaderBoard from  '../../store/types/leaderBoard'
	import student from  '../../store/types/student'
	import loading from '../item/loading'
	import organization from '../../store/types/organization';
	

	export default {
		data () {
			return {		
				defaultImg: require('@/assets/images/noimage.png')
			}		
		},
		props: ['testpaperId', 'totalOrgan', 'organizationId'],
		components: {
			loading,
		},
		computed: {
			...mapState({
				'leaderBoardList': state => {
					return state.leaderBoard.leaderBoardList.slice(0, 6)
				},
				

			}),
			'IP' : function() {
				return this.$store.getters.myIP
			}
		},
		methods: {
			...mapActions(leaderBoard.actions),

			
			toSetBoardInfo() {
				this.setLeaderBoardInfo({
					testPaperId: this.testpaperId,
					testOrganId: this.organizationId
				})
			},
			getLeaderBoard() {
				if(this.totalOrgan) {
					this.getTotalLeaderBoard({
						testpaperId: this.testpaperId
					})
				} else {
					this.getOrganLeaderBoard({
						testpaperId: this.testpaperId,
					})
				}
				
			}
			
		},
		watch: {
			organizationId: function (val) {
				console.log(this.organizationId)
				console.log(this.totalPaper)
				this.toSetBoardInfo()
				this.getLeaderBoard()
			},
			testpaperId: function(val) {
				this.toSetBoardInfo()
				this.getLeaderBoard()
			},
			totalOrgan: function() {
				this.getLeaderBoard()
			}
		},
		created () {
			this.setLeaderBoardInfo()
			this.getLeaderBoard()
			// console.log(this.IP)
			console.log(this.IP)
		}
	}
</script>

<style scoped lang='less'>
	section {
		position: relative;

    }
    
    .rank-left {
		float: left;
        margin-left: 2%;
    }
	.rank-left li {
        list-style: none;
        margin-top: 30px;
        height: 65px;

    }

    .rank-left li:nth-child(-n + 3) img{
        width: 58px;
        height: 63px;
    }

    .rank-left li:nth-child(n + 3) p{
        width: 52px;
        padding-left: 8px;

        text-align: center;
        line-height: 65px;
        font-family: HappyZcool-2016;
        font-size: 20px;
        color: #616161;
    }
	
	.rank-right {
		float: left;
		font-size: 20px;
	}

	.rank-right li {
        list-style: none;
        margin-top: 30px;
		height: 65px;
		line-height: 65px;

		// vertical-align: middle;

	}

	.rank-right li img{
		display: inline-block;

		margin-left: 80px;
        width: 63px;
		height: 63px;
		border-radius: 50%;
	}
	
	.user-name {
		position: relative;
		top: -20px;
		display: inline-block;

		width: 200px;
		margin: 0 80px 0 130px;
	}
	
	.student-id {
		position: relative;
		top: -20px;
		display: inline-block;

	}

	.score {
		
		position: relative;
		top: -20px;
		display: inline-block;

		margin-left: 160px;

		font-size: 25px;
		color: #2d8cf0;
	}

	.clear {
		clear: both;
	}

	.no-info {
		margin-top: 30px;
		text-align: center;
		font-size: 20px;
	}
</style>