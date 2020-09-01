const { readFile, writeFile } = require("fs").promises;

const mergeIntervals = (intervals) => {
	let length = 0;
	let [begin, end] = intervals[0];
	for (let i = 1; i < intervals.length; i++) {
		let [newBegin, newEnd] = intervals[i];
		if (newBegin > end) {
			length += end - begin;
			(begin = newBegin), (end = newEnd);
		} else {
			end = newEnd;
		}
	}
	length += end - begin;
	return length;
};

(async () => {
	let i = 1;
	while (i <= 10) {
		const data = await readFile(`./input/${i}.in`, "utf-8");

		let intervals = [];

		data.split("\n")
			.slice(1)
			.map((i) => {
				if (i !== "") {
					intervals.push(i.split(" ").map((n) => parseInt(n)));
				}
			});

		intervals.sort((a, b) => a[0] - b[0]);
		let maxLen = Number.MIN_SAFE_INTEGER;
		for (let j = 0; j < intervals.length; j++) {
			// console.log(i);
			let afterRemoval = intervals
				.slice(0, j)
				.concat(intervals.slice(j + 1));
			let len = mergeIntervals(afterRemoval);
			maxLen = Math.max(len, maxLen);
		}
		console.log(maxLen);
		console.log(`./output/${i}.out`);
		await writeFile(`./output/${i}.out`, maxLen);
		i += 1;
	}
})();
