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

		updateNZXTShareData() {
			this.NZXTShareData.update(
				JSON.parse(localStorage.getItem("NZXTShareData") || "{}")
			);
			this.panel = this.NZXTShareData.panel;
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
	<div class="max-w-850px w-screen p-3">
		<p class="text-3xl font-bold text-center">Dashboard {{}}</p>
		<div class="flex">
			<div class="bg-dark-400 rounded-3xl m-2">
				<InfoPanel :icpu="icpu" :igpu="igpu" />
			</div>

			<div class="w-full">
				<select v-model="panel">
					<option value="dual_data">雙資訊</option>
					<option value="current_song">Cider</option>
				</select>
			</div>
			<div>
				{{ NZXTShareData }}
				<iframe src="/?kraken=1" frameborder="0"></iframe>
				<button class="bg-$color-primary rounded-md px-2 py-1" @click="resetAllData">Reset</button>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
