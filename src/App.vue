<script setup lang="ts">
	import { useMonitoring } from "./services/nzxt.ts";
	import Dashnoard from "./Pages/Dashboard.vue";
	import Screen from "./Pages/Screen.vue";
</script>

<script lang="ts">
	const kraken = window.location.search.includes("kraken=1");
</script>

<template>
	<Screen v-if="kraken" />
	<Dashnoard v-else />
</template>

<style scoped></style>
