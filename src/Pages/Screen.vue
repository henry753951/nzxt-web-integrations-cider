<script lang="ts">
	import { Component, Vue, toNative, Prop, Watch } from "vue-facing-decorator";
	import { Ref, watch } from "vue";
	import { Cpu, Gpu, Ram, Kraken } from "@nzxt/web-integrations-types/v1";
	import { useMonitoring, NZXTShareData } from "../services/nzxt";
	import { isPlaying } from "../services/music";
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
		icpu!: Ref<Cpu | undefined>;
		igpu!: Ref<Gpu | undefined>;
		iram!: Ref<Ram | undefined>;
		ikraken!: Ref<Kraken | undefined>;

		check_interval!: number;
		playingState: boolean = false;

		SetCheckInterval() {
			clearInterval(this.check_interval);
			switch (this.NZXTShareData.player) {
				case "cider2":
					isPlaying("cider2").then((state) => {
						this.playingState = state;
					});
					break;
			}
			this.check_interval = setInterval(() => {
				switch (this.NZXTShareData.player) {
					case "cider2":
						isPlaying("cider2").then((state) => {
							this.playingState = state;
						});
						break;
				}
			}, 1000);
		}

		mounted() {
			console.log("%cScreen mounted", "color:yellow");
			const { icpu, igpu, iram, ikraken } = useMonitoring();
			this.icpu = icpu;
			this.igpu = igpu;
			this.iram = iram;
			this.ikraken = ikraken;
			if (
				this.NZXTShareData.panel == "current_song" ||
				this.NZXTShareData.panel == "auto"
			) {
				this.SetCheckInterval();
			}

			window.addEventListener("storage", (e) => {
				if (e.key == "NZXTShareData") {
					this.NZXTShareData.update(JSON.parse(e.newValue || "{}"));
					if (
						this.NZXTShareData.panel == "current_song" ||
						this.NZXTShareData.panel == "auto"
					) {
						this.SetCheckInterval();
					} else {
						clearInterval(this.check_interval);
					}
				}
			});
		}

		unmounted() {
			clearInterval(this.check_interval);
		}

		get getCurrentPanel() {
			if (this.NZXTShareData.panel == "auto") {
				if (this.playingState) return "now_playing";
				return "dual_data";
			}
			console.log(this.NZXTShareData.panel);
			return this.NZXTShareData.panel;
		}
	}
	export default toNative(Screen);
</script>

<template>
	<div class="w-screen h-100vw bg-black">
		<DualInfo :icpu="icpu" :igpu="igpu" v-if="getCurrentPanel == 'dual_data'" />

		<NowPlaying v-else-if="getCurrentPanel == 'now_playing'" />
	</div>
</template>

<style scoped></style>
