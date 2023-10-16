<script setup lang="ts">
	import { useMonitoring } from "../services/nzxt";
	import InfoPanel from "../components/InfoPanel.vue";
	const { icpu, igpu } = useMonitoring();
</script>

<script lang="ts">
	let panel: string = "dual data";
</script>

<template>
	<div class="max-w-850px w-screen p-3">
		<p class="text-3xl font-bold text-center">Dashboard</p>
		<div class="flex">
			<div class="bg-dark-800 rounded-3xl m-2">
				<InfoPanel :icpu="icpu" :igpu="igpu" />
			</div>

			<div class="w-full">
				<select v-model="panel">
					<option value="dual_data">雙資訊</option>
					<option value="current_song">Cider</option>
				</select>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
