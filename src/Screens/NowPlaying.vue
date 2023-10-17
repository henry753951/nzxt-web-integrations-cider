<script lang="ts">
	import { Component, Vue, toNative, Prop } from "vue-facing-decorator";
	import ProgressBar from "../components/ProgressBar.vue";

	@Component({
		components: {},
	})
	class NowPlaying extends Vue {
		@Prop({ required: true })
		player!: string;
	}
	export default toNative(NowPlaying);
</script>

<template>
	<div></div>
</template>

<style scoped></style>
