<script setup lang="ts">
	import { useMonitoring } from "../services/nzxt";
	import InfoPanel from "../components/InfoPanel.vue";
	const { icpu, igpu } = useMonitoring();
</script>

<template>
	<div>
		<p class="text-3xl font-bold">Dashboard</p>
		<InfoPanel :icpu="icpu" :igpu="igpu" />
	</div>
</template>

<style scoped></style>
