<script setup lang="ts">
	import { Cpu, Gpu, Ram } from "@nzxt/web-integrations-types/v1";
	const props = defineProps({
		icpu: {
			type: Object as () => Cpu | undefined,
			required: true,
		},
		igpu: {
			type: Object as () => Gpu | undefined,
			required: true,
		},
	});
</script>

<template>
	<div class="w-180px flex flex-col items-center my-3">
		<div>
			<p class="text-lg text-$color-primary">CPU</p>
			<div class="flex flex-col justify-start">
				<div>
					Temperature:
					{{ Math.round(((icpu?.temperature as number) * 10) / 10) }}°C
				</div>
				<div>Load: {{ Math.round((icpu?.load as number) * 1000) / 10 }}%</div>
			</div>

			<p class="text-lg text-$nzxt-color">GPU</p>
			<div class="flex-row">
				<div>
					Temperature:
					{{ Math.round(((igpu?.temperature as number) * 10) / 10) }}°C
				</div>
				<div>Load: {{ Math.round((igpu?.load as number) * 1000) / 10 }}%</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
