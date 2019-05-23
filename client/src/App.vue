<template>
	<div id="app" class="jumbotron">
		<img alt="Vue logo" src="./assets/logo.png">
		<TodoList msg="Todo list"/>
	</div>
</template>

<script>
import TodoList from './components/todo-list.vue'

export default {
	name: 'app',
	components: {
		TodoList
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
