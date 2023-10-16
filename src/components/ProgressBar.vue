<script setup lang="ts">
	const props = defineProps({
		progress: Number,
		color: String || "#42b883",
		style: Object,
	});
</script>

<template>
	<div class="progress-bar">
		<div
			class="progress-bar__inner"
			:style="{
				...props.style,
				...{ width: props.progress + '%', background: props.color },
			}"></div>
	</div>
</template>

<style scoped>
	.progress-bar {
		width: 100%;
		height: 1.5rem;
		background-color: #3d3d3d;
		border-radius: 3rem;
		overflow: hidden;
		.progress-bar__inner {
			height: 100%;
			background-color: #42b883;
			border-radius: 0.5rem;
			transition: width 0.3s ease-in-out;
		}
	}
</style>
