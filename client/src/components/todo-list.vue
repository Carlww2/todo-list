<template>
	<div class="container">
		<h1>{{ msg }}</h1>
		<div class="row">
			<form method="post">
				<div class="col-lg-12">
					<div class="input-group">
						<span class="input-group-addon">
						<input type="checkbox" aria-label="..." v-model="task.completed">
						</span>
						<input type="text" class="form-control" aria-label="..." v-model="task.description" @keypress.prevent.enter="storeTask()">
						<div class="input-group-addon">
							<button type="submit" class="btn btn-primary btn-sm" @click.prevent="storeTask()">
								<i class="glyphicon glyphicon-floppy-save"></i>
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
		<div>
			<ul class="list-group">
				<li class="list-group-item" v-for="task in tasks" :key="task._id">
					<div :class="{ done: task.completed }">
						{{task.description}}
					</div>
					
					<div class="buttons">
						<button v-if="!task.completed" class="btn btn-sm btn-success" @click="updateTask(task._id, true)">
							<i class="glyphicon glyphicon-ok"></i>
						</button>
						<button v-else class="btn btn-sm btn-warning" @click="updateTask(task._id, false)">
							<i class="glyphicon glyphicon-remove"></i>
						</button>
						<button class="btn btn-sm btn-danger" @click="deleteTask(task._id)">
							<i class="glyphicon glyphicon-trash"></i>
						</button>
					</div>

				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		msg: String
	},
	data() {
		return {
			task: {
				description: '',
				completed: false
			},
			tasks: []
		}
	},
	methods: {
		async reload() {
			try {
				this.tasks = await this.$http.get('api/tasks')
				this.tasks = this.tasks.data
			} catch (error) {
				alert(error.message)
			}
		},
		async storeTask() {
			try {
				await this.$http.post(`api/tasks`, this.task)
				await this.reload()

				this.task = {}
			} catch (e) {
				alert(e.message)
			}
		},
		async updateTask(id, status) {
			try {
				await this.$http.patch(`api/tasks/${id}`, {
					completed: status
				})
				await this.reload()
			} catch (e) {
				alert(e.message)
			}
		},
		async deleteTask (id) {
			try {
				await this.$http.delete(`api/tasks/${id}`)
				await this.reload()
			} catch (e) {
				alert(e.message)
			}
		}
	},
	async created () {
		await this.reload()
	}
	
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.done {
		text-decoration: line-through;
		color: gray;
	}
	.list-group{
		text-align: left;
	}
	.list-group-item > div{
		display: inline-block;
		width: 50%;
	}
	.buttons {
		text-align: right;
	}
	.buttons > button {
		margin: 0px 1px;
	}
</style>
