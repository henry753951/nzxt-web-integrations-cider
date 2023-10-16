import { MonitoringData, Cpu, Gpu, Ram } from "@nzxt/web-integrations-types/v1";
import { provide, ref } from "vue";
export const useMonitoring = () => {
	const icpu = ref<Cpu>();
	const igpu = ref<Gpu>();
	const iram = ref<Ram>();
	window.nzxt = {
		v1: {
			onMonitoringDataUpdate: (data: MonitoringData) => {
				const { cpus, gpus, ram } = data;
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
			},
			width: 0,
			height: 0,
			shape: "square",
			targetFps: 60,
		},
	};

	return { icpu, igpu, iram };
};
