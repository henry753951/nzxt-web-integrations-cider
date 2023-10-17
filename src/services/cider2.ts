export const isPlaying_ = async () : Promise<boolean> => {
	return new Promise((resolve, reject) => {
		fetch("http://localhost:10769/isPlaying")
			.then((res) => {
				res.json().then((json) => {
					const isPlaying = json["is_playing"];
					console.log("isPlaying: " + isPlaying);
					resolve(isPlaying);
				});
			})
			.catch((error) => {
				console.error("Error:", error);
				reject(error);
			});
	});
};
