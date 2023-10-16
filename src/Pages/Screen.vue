<script setup lang="ts">
	import ProgressBar from "../components/ProgressBar.vue";
	import { useMonitoring } from "../services/nzxt";
	const { icpu, igpu } = useMonitoring();
</script>

<template>
	<div class="h-screen w-screen">
		<div class="flex flex-col">
			<div class="flex items-end justify-between">
				<div class="text-3xl font-bold">CPU</div>
				<div class="text-7xl font-bold">{{ Math.round(icpu?.temperature as number) }}°</div>
			</div>
			<div class="flex flex-col gap-2">
				<ProgressBar :progress="(icpu?.temperature as number)" />
				<ProgressBar :progress="(igpu?.temperature as number)" color="red" />
			</div>

			<div class="flex items-start justify-between">
				<div class="text-3xl font-bold">GPU</div>
				<div class="text-7xl font-bold">{{ Math.round(igpu?.temperature as number) }}°</div>
			</div>
		</div>
		<p class="text-3xl font-bold text-center">NZXT</p>
	</div>
</template>

<style scoped></style>
