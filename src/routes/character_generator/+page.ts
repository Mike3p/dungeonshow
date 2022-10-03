import type { GeneratorDict } from '$lib/generator_dict/generator_dict';

type DataType = {
	generatorDicts: Mapping;
};

type Mapping = { [name: string]: GeneratorDict };

async function importDicts(): Promise<Mapping> {
	return {
		Base: (await import('$lib/data/generator_basic_acks.yaml')).default as GeneratorDict,
		'Circle of Dawn': (await import('$lib/data/generator_circle_of_dawn.yaml'))
			.default as GeneratorDict
	};
}

export async function load(): Promise<DataType> {
	return {
		generatorDicts: await importDicts()
	};
}
