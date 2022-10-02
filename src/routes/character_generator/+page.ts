import basicGeneratorDict from '$lib/data/generator_basic_acks.yaml';
import circleOfDawnDict from '$lib/data/generator_circle_of_dawn.yaml';
import type { GeneratorDict } from '$lib/generator_dict/generator_dict';

type DataType = {
	generatorDicts: { [name: string]: GeneratorDict };
};

export async function load(): Promise<DataType> {
	return {
		generatorDicts: {
			Basic: basicGeneratorDict,
			'Circle of Dawn': circleOfDawnDict
		}
	};
}
