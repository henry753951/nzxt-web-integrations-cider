import { isPlaying_ as isPlaying_cider2 } from "../services/cider2";
import { currentPlayingSong as currentPlayingSong_cider2 } from "../services/cider2";

export const isPlaying = async (player: string) => {
	switch (player) {
		case "cider2":
			return await isPlaying_cider2();
            
		default:
			return Promise.resolve(false);
	}
};

export const currentPlayingSong = async (player: string) => {
    switch (player) {
        case "cider2":
            return await currentPlayingSong_cider2();
            
        default:
            return Promise.resolve({});
    }
};
