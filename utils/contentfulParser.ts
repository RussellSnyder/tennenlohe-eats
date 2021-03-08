import { Entry } from "contentful";
import { ContentfulContentType } from "../interfaces";

interface ObjectWithFields<T> {
    fields: T
}

export function extractEntryFields<T>(content: Entry<unknown>[], contentType: ContentfulContentType): T[] {
    const rawContent = content.filter(c => c.sys.contentType.sys.id === contentType) as ObjectWithFields<T>[];

    if (rawContent.length < 1) {
        return [];
    }

    return rawContent.map(t => t.fields);
}