<script lang="ts">
	import { Component, Vue, Watch, toNative } from "vue-facing-decorator";
	import { Ref } from "vue";
	import { Cpu, Gpu, Ram, Kraken } from "@nzxt/web-integrations-types/v1";
	import { NZXTShareData, useMonitoring } from "../services/nzxt";
	import InfoPanel from "../components/InfoPanel.vue";

	@Component({
		components: {
			InfoPanel,
		},
	})
	class Dashboard extends Vue {
		NZXTShareData: NZXTShareData = new NZXTShareData();
		panel!: string;
		player!: string;

		icpu!: Ref<Cpu | undefined>;
		igpu!: Ref<Gpu | undefined>;
		iram!: Ref<Ram | undefined>;
		ikraken!: Ref<Kraken | undefined>;

		mounted() {
			console.log("%cDashboard mounted", "color:yellow");
			this.updateNZXTShareData();
			const { icpu, igpu, iram, ikraken } = useMonitoring();
			this.icpu = icpu;
			this.igpu = igpu;
			this.iram = iram;
			this.ikraken = ikraken;
		}

		@Watch("panel")
		PanelChange(newValue: string, oldValue: string) {
			console.log(`%cChange panel to ${newValue}`, "color:lightblue");
			this.NZXTShareData.panel = newValue;
			localStorage.setItem("NZXTShareData", JSON.stringify(this.NZXTShareData));
		}

		@Watch("player")
		PlayerChange(newValue: string, oldValue: string) {
			console.log(`%cChange player to ${newValue}`, "color:lightblue");
			this.NZXTShareData.player = newValue;
			localStorage.setItem("NZXTShareData", JSON.stringify(this.NZXTShareData));
		}

		updateNZXTShareData() {
			this.NZXTShareData.update(
				JSON.parse(localStorage.getItem("NZXTShareData") || "{}")
			);
			this.panel = this.NZXTShareData.panel;
			this.player = this.NZXTShareData.player;
		}

		resetAllData() {
			this.NZXTShareData = new NZXTShareData();
			localStorage.clear();
			localStorage.setItem("NZXTShareData", JSON.stringify(this.NZXTShareData));
			this.updateNZXTShareData();
		}
	}
	export default toNative(Dashboard);
</script>

<template>
	<div class="w-screen max-w-850px">
		<div class="flex justify-between m-3 p-4 px-7 bg-dark-900 rounded-2xl">
			<p class="text-3xl font-bold text-center">Dashboard</p>
			<button
				class="bg-$color-primary rounded-md px-2 py-1"
				@click="resetAllData">
				Reset
			</button>
		</div>

		<div class="flex p-3">
			<div class="bg-dark-400 rounded-3xl m-2">
				<InfoPanel :icpu="icpu" :igpu="igpu" />
			</div>

			<div class="w-full px-4 flex flex-col gap-3">
				<div class="flex justify-between">
					<p class="text-xl font-bold">面板</p>
					<select v-model="panel">
						<option value="dual_data">雙資訊</option>
						<option value="current_song">音樂</option>
						<option value="auto">自動</option>
					</select>
				</div>

				<div class="flex justify-between">
					<p class="text-xl font-bold">播放器</p>
					<select v-model="player">
						<option value="cider2">Cider 2</option>
					</select>
				</div>
			</div>
			<div>
				{{ NZXTShareData }}

				<iframe
					src="/?kraken=1"
					frameborder="0"
					width="250px"
					height="250px"></iframe>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
