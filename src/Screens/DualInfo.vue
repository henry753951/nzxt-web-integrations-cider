<script lang="ts">
	import { Component, Vue, toNative, Prop } from "vue-facing-decorator";
	import ProgressBar from "../components/ProgressBar.vue";
	import { Cpu, Gpu, Ram, Kraken } from "@nzxt/web-integrations-types/v1";

	@Component({
		components: {
			ProgressBar,
		},
	})
	class DualInfo extends Vue {
		@Prop icpu!: Cpu;
		@Prop igpu!: Gpu;
		@Prop iram!: Ram;
		@Prop ikraken!: Kraken;
	}

	export default toNative(DualInfo);
</script>

<template>
	<div class="flex flex-col">
		<div class="flex items-end justify-between">
			<div class="text-3xl font-bold">CPU</div>
			<div class="text-7xl font-bold">
				{{
					Math.round(icpu?.temperature as number)
						? Math.round(icpu?.temperature as number)
						: 51
				}}°
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<ProgressBar
				:progress="(icpu?.temperature as number) ? (icpu?.temperature as number): 51 "
				color="#6B00DE" />
			<ProgressBar
				:progress="(igpu?.temperature as number) ? (igpu?.temperature as number): 32"
				color="#D600BF" />
		</div>

		<div class="flex items-start justify-between">
			<div class="text-3xl font-bold">GPU</div>
			<div class="text-7xl font-bold">
				{{
					Math.round(igpu?.temperature as number)
						? Math.round(igpu?.temperature as number)
						: 32
				}}°
			</div>
		</div>
	</div>
	<p class="text-3xl pt-2 font-w-900 text-center">NZXT</p>
</template>

<style scoped></style>
