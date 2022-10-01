export function getRandomFromArray<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

export function getRandomArraySubset<T>(array: T[], n: number): T[] {
	return array.sort(() => 0.5 - Math.random()).slice(0, n);
}
