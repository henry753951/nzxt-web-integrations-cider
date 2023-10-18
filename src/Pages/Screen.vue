<script lang="ts">
	import { Component, Vue, toNative, Prop, Watch } from "vue-facing-decorator";
	import { Ref, watch } from "vue";
	import { Cpu, Gpu, Ram, Kraken } from "@nzxt/web-integrations-types/v1";
	import { useMonitoring, NZXTShareData } from "../services/nzxt";
	import { isPlaying, currentPlayingSong } from "../services/music";
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

		currentSong!: any;

		check_interval!: number;
		playingState: boolean = false;
		GetPlayerData() {
			isPlaying(this.NZXTShareData.player).then((state) => {
				this.playingState = state;
			});
			currentPlayingSong(this.NZXTShareData.player).then((song) => {
				if (song != true) this.currentSong = song;
			});
		}

		SetCheckInterval() {
			clearInterval(this.check_interval);
			this.GetPlayerData();
			this.check_interval = setInterval(() => {
				this.GetPlayerData();
			}, 2000);
		}

		mounted() {
			console.log("%cScreen mounted", "color:yellow");
			const { icpu, igpu, iram, ikraken } = useMonitoring();
			this.icpu = icpu;
			this.igpu = igpu;
			this.iram = iram;
			this.ikraken = ikraken;
			if (
				this.NZXTShareData.panel == "now_playing" ||
				this.NZXTShareData.panel == "auto"
			) {
				this.SetCheckInterval();
			}

			window.addEventListener("storage", (e) => {
				if (e.key == "NZXTShareData") {
					this.NZXTShareData.update(JSON.parse(e.newValue || "{}"));
					if (
						this.NZXTShareData.panel == "now_playing" ||
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
	<div
		class="w-screen h-100vw bg-black"
		style="max-width: 100vw; overflow: hidden">
		<DualInfo :icpu="icpu" :igpu="igpu" />
		<div
			class="NowPlaying-wrap"
			:class="{ active: getCurrentPanel == 'now_playing' }">
			<div
				class="NowPlaying"
				:class="{ active: getCurrentPanel == 'now_playing' }">
				<NowPlaying :currentSong="currentSong" />
			</div>
		</div>
	</div>
</template>

<style scoped>
	.NowPlaying-wrap {
		transform: translate(-50%, -50%);
		top: 50%;
		left: 50%;
	
		position: fixed;
		max-width: 120vw;
		max-height: 120vw;
		overflow: hidden;
		width: 120vw;
		height: 120vw;
		background-color: rgba(0, 0, 0, 0);
		transition: all 0.5s ease-in-out;
	}
	.NowPlaying-wrap.active {
		background-color: rgba(0, 0, 0, 0.651);
		backdrop-filter: blur(10px);
	}
	.NowPlaying {
		opacity: 0;
		transform: translateY(30%) scale(0.7);
		transition: all 0.5s ease-in-out;
	}

	.NowPlaying.active {
		opacity: 1;
		transform: translateY(0%) scale(1);
	}
</style>
