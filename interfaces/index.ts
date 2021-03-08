export enum ContentfulContentType {
  Restaurant = 'restaurants',
  FoodTruck = 'foodTruck',
  Food = 'food',
}

export interface Food {
  name: string,
  nameDe: string
}

interface FoodPlace {
  name: string,
  address: string,
  foodsAvailable: Food[],
  website: string,
  description: string,
  descriptionDe: string,
  logo: { sys: [Object], fields: [Object] },
}

export interface Restaurant extends FoodPlace {}

export interface FoodTruck extends FoodPlace {
  availableDay: string,
  availableStart: string,
  availableEnd: string,
}