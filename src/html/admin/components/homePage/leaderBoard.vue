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
				<img :src="item.imgPath" alt="头像">
				<p class="user-name">{{item.username}}</p>
				<p class="student-id">{{item.studentId}}</p>
			</li>
		</div>
		<div class="clear"></div>
		<p v-if="leaderBoardList.length<=0" class="no-info"> 没有数据... </p>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import leaderBoard from  '../../store/types/leaderBoard'

	import loading from '../item/loading'
import organization from '../../store/types/organization';
	export default {
		data () {
			return {		
				
			}		
		},
		props: ['testpaperId', 'total', 'organizationId'],
		components: {
			loading,
		},
		computed: {
			...mapState({
				'leaderBoardList': state => {
					return state.leaderBoard.leaderBoardList.slice(0, 6)
				},

			})
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
				if(this.total) { 

					this.getTotalLeaderBoard({
						testpaperId: this.testpaperId
					})
				} else {
					this.getOrganLeaderBoard({
						testpaperId: this.testpaperId
					})
				}
			}
			
		},
		watch: {
			organizationId: function (val) {
				console.log(this.organizationId)
				console.log(this.total)
				this.toSetBoardInfo()
				this.getLeaderBoard()
			},
			testpaperId: function(val) {
				this.toSetBoardInfo()
				this.getLeaderBoard()
			},
			total: function() {
				this.getLeaderBoard()
			}
		},
		created () {
			this.setLeaderBoardInfo()
			this.getLeaderBoard()
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

	}

	.rank-right li img{
		display: inline-block;

		margin-left: 80px;
        width: 63px;
		height: 63px;
		border-radius: 50%;
	}
	
	.user-name {
		display: inline-block;

		width: 200px;
		margin: 0 200px 0 60px;
	}
	
	.student-id {
		display: inline-block;

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