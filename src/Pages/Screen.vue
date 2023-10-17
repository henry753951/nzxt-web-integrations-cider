<script lang="ts">
	import { Component, Vue, toNative, Prop, Watch } from "vue-facing-decorator";
	import { Ref, watch } from "vue";
	import { Cpu, Gpu, Ram, Kraken } from "@nzxt/web-integrations-types/v1";
	import { useMonitoring, NZXTShareData } from "../services/nzxt";
	import DualInfo from "../Screens/DualInfo.vue";
	import NowPlaying from "../Screens/NowPlaying.vue";

	@Component({
		components: {
			DualInfo,
			NowPlaying,
		},
	})
	class Screen extends Vue {
		NZXTShareData: NZXTShareData = new NZXTShareData();
		panel!: string;
		icpu!: Ref<Cpu | undefined>;
		igpu!: Ref<Gpu | undefined>;
		iram!: Ref<Ram | undefined>;
		ikraken!: Ref<Kraken | undefined>;

		mounted() {
			console.log("%cScreen mounted", "color:yellow");
			const { icpu, igpu, iram, ikraken } = useMonitoring();
			this.icpu = icpu;
			this.igpu = igpu;
			this.iram = iram;
			this.ikraken = ikraken;

			window.addEventListener("storage", (e) => {
				if (e.key == "NZXTShareData") {
					this.NZXTShareData.update(JSON.parse(e.newValue || "{}"));
				}
			});
		}
		get getCurrentPanel() {
			if (this.NZXTShareData.panel == "auto") {
				// todo: auto panel
				return this.NZXTShareData.panel;
			}

			return this.NZXTShareData.panel;
		}
	}
	export default toNative(Screen);
</script>

<template>
	<div class="w-screen h-100vw bg-black">
		<DualInfo :icpu="icpu" :igpu="igpu" v-if="panel == getCurrentPanel" />

		<NowPlaying />
	</div>
</template>

<style scoped></style>
