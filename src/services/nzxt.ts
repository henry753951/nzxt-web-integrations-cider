import {
	MonitoringData,
	Cpu,
	Gpu,
	Ram,
	Kraken,
} from "@nzxt/web-integrations-types/v1";
import { provide, ref } from "vue";

export class NZXTShareData {
	panel: string = "dual_data";
	player!: string;

	constructor() {
		this.update(JSON.parse(localStorage.getItem("NZXTShareData") || "{}"));
	}
	update(json: any) {
		console.log(`NZXTShareData.update(${JSON.stringify(json)})`);
		if ("panel" in json) this.panel = json.panel;
		if ("player" in json) this.player = json.player;
	}

	toJSON() {
		return {
			panel: this.panel,
			player: this.player,
		};
	}
}

export const useMonitoring = () => {
	const icpu = ref<Cpu>();
	const igpu = ref<Gpu>();
	const iram = ref<Ram>();
	const ikraken = ref<Kraken>();
	window.nzxt = {
		v1: {
			onMonitoringDataUpdate: (data: MonitoringData) => {
				const { cpus, gpus, ram, kraken } = data;
				const cpu = cpus.pop();
				let gpu;

				if (gpus.length > 1) {
					const [mainGpu] = gpus.filter(
						(card) => !card.name.includes("Graphics")
					);
					gpu = mainGpu;
				} else {
					gpu = gpus.pop();
				}
				icpu.value = cpu;
				igpu.value = gpu;
				iram.value = ram;
				ikraken.value = kraken;
			},
			width: 0,
			height: 0,
			shape: "square",
			targetFps: 60,
		},
	};

	return { icpu, igpu, iram, ikraken };
};
