import type { GeneratorDict } from '$lib/generator_dict/generator_dict';

type DataType = {
	generatorDicts: Mapping;
};

type Mapping = { [name: string]: GeneratorDict };

async function importDicts() {
	return (
		await Promise.all([
			{ name: 'Base', dict: (await import('$lib/data/generator_basic_acks.yaml')).default },
			{
				name: 'Circle of Dawn',
				dict: (await import('$lib/data/generator_circle_of_dawn.yaml')).default
			}
		])
	).reduce<Mapping>((acc, dict) => {
		acc[dict.name] = dict.dict as GeneratorDict;
		return acc;
	}, {});
}

export async function load(): Promise<DataType> {
	const generatorDicts = await importDicts();
	return {
		generatorDicts: generatorDicts
	};
}
