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
		<!-- <div class="rank-right">
			<rank-item 
				v-for="item in studentsList" 
				:key="item.userId" 
				:userId = "item.userId"
				:userName = "item.userName" 
				:email = "item.email" 
				:phone = "item.phone"
				:student = "item.studentId"
				:organizationId = "organization.organizationId"
			/>
		</div> -->
		<!-- <p v-if="studentsList.length<=0" class="no-info"> 没有数据... </p> -->
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import organization from  '../../store/types/organization'

	import loading from '../item/loading'
	import rankItem from '../item/rankItem'
	export default {
		data () {
			return {		
				spinShow: false,
			}		
		},
		components: {
			loading,
			'rank-item': rankItem
		},
		computed: {
			...mapState({
				'studentsList': state => {
					return state.organization.studentsList
				},
				'organization': state => state.organization
			})
		},
		methods: {
			...mapActions(organization.actions),

			toGetStudentsByOrganId() {
				this.spinShow = true
				this.getStudentsByOrganId({
					organizationId: this.organization.organizationId
				}).then((data) => {
					if(data.state){
						this.spinShow = false
						// this.$Message.success(data.info)
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			
		},
		created () {
			this.toGetStudentsByOrganId()
			this.refresh = new Date().getTime() - new Date().getTime() % 60000
		}
	}
</script>

<style scoped lang='less'>
	section {
		position: relative;
    }
    
    .rank-left {
        margin-left: 2%;
    }
	li {
        list-style: none;
        margin-top: 30px;
        height: 65px;

    }

    li:nth-child(-n + 3) img{
        width: 58px;
        height: 61px;
    }

    li:nth-child(n + 3) p{
        width: 52px;
        padding-left: 8px;

        text-align: center;
        line-height: 65px;
        font-family: HappyZcool-2016;
        font-size: 20px;
        color: #616161;
    }


</style>