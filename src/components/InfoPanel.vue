<script lang="ts">
	import { Cpu, Gpu, Ram, Kraken } from "@nzxt/web-integrations-types/v1";
	import { Component, Vue, toNative, Prop } from "vue-facing-decorator";

	@Component
	class InfoPanel extends Vue {
		@Prop icpu!: Cpu;
		@Prop igpu!: Gpu;
		@Prop iram!: Ram;
		@Prop ikraken!: Kraken;
	}

	export default toNative(InfoPanel);
</script>

<template>
	<div class="p-5">
		<p class="text-2xl">系統資訊</p>
		<div class="w-150px">
			<p class="text-lg text-$color-primary">CPU</p>
			<div class="flex flex-col justify-start">
				<div>
					溫度:
					{{ Math.round((icpu?.temperature as number) * 10) / 10 }}°C
				</div>
				<div>負載: {{ Math.round((icpu?.load as number) * 1000) / 10 }}%</div>
			</div>

			<p class="text-lg text-$nzxt-color">GPU</p>
			<div class="flex-row">
				<div>
					溫度:
					{{ Math.round((igpu?.temperature as number) * 10) / 10 }}°C
				</div>
				<div>負載: {{ Math.round((igpu?.load as number) * 1000) / 10 }}%</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
