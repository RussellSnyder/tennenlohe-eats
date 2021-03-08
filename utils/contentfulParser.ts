import { Entry } from "contentful";
import { FoodTruck } from "../interfaces";

interface ObjectWithFields<T> {
    fields: T
}

export function extractEntryFields<T>(content: Entry<unknown>[], contentType: string): T[] {
    const rawContent = content.filter(c => c.sys.contentType.sys.id === contentType) as ObjectWithFields<T>[];

    if (rawContent.length < 1) {
        return [];
    }

    return rawContent.map(t => t.fields);
}

export const extractFoodTrucks = (content: Entry<unknown>[]): FoodTruck[] => {
    const rawFoodTrucks = content.filter(c => c.sys.contentType.sys.id === 'foodTruck') as ObjectWithFields<FoodTruck>[];
    if (rawFoodTrucks.length < 1) {
        return [];
    }


    return rawFoodTrucks.map(t => t.fields);
}
