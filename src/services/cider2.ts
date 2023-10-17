export const isPlaying_ = async () : Promise<boolean> => {
	return new Promise((resolve, reject) => {
		fetch("http://localhost:10769/isPlaying")
			.then((res) => {
				res.json().then((json) => {
					const isPlaying = json["is_playing"];
					resolve(isPlaying);
				});
			})
			.catch((error) => {
				console.error("Error:", error);
				reject(error);
			});
	});
};


export const currentPlayingSong = async () : Promise<Object> => {
	return new Promise((resolve, reject) => {
		fetch("http://localhost:10769/currentPlayingSong")
			.then((res) => {
				res.json().then((json) => {
					const info = json["info"];
					console.log("isPlaying: " + info);
					resolve(info);
				});
			})
			.catch((error) => {
				console.error("Error:", error);
				reject(error);
			});
	});
};
