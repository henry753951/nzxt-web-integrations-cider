<script lang="ts">
	import { Component, Vue, toNative, Prop, Ref } from "vue-facing-decorator";
	import ProgressBar from "../components/ProgressBar.vue";

	@Component({
		components: {},
	})
	class NowPlaying extends Vue {
		@Prop({ required: true })
		currentSong!: any;

		@Ref("songref")
		songNameRef!: HTMLDivElement;

		checkOverflow() {
			if (this.songNameRef) {
				console.log(this.songNameRef.scrollWidth, this.songNameRef.offsetWidth);
				return this.songNameRef.scrollWidth > this.songNameRef.offsetWidth;
			}
			return false;
		}

		get songName() {
			if (this.currentSong) {
				return this.currentSong.name;
			}
		}

		get songImage() {
			if (this.currentSong) {
				const url = this.currentSong.artwork.url as string;
				const w = url.match(/{w}/g);
				const h = url.match(/{h}/g);
				if (w && h) {
					return url.replace(/{w}/g, "500").replace(/{h}/g, "500");
				}
			}
		}
	}
	export default toNative(NowPlaying);
</script>

<template>
	<div class="flex flex-col justify-center items-center">
		<img :src="songImage" class="w-80vw h-80vw" />
		<div
			ref="songref"
			class="font-bold max-w-100vw"
			style="
				font-size: 12vw;
				white-space: nowrap;
				overflow: visible;
				box-sizing: border-box;
			"
			:class="{ marquee: checkOverflow() }">
			{{ songName }}
		</div>
	</div>
</template>

<style scoped>
	.marquee {
		animation: marquee 10s linear infinite;
	}

	@keyframes marquee {
		0% {
			transform: translateX(100%);
		}

		100% {
			transform: translateX(-100%);
		}
	}
</style>
