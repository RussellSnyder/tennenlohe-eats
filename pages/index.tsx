import React, { useEffect, useState } from 'react';
import FoodFilter from '../components/FoodFilter';
import FoodTruckPreview from '../components/FoodTruck/FoodTruckPreview';
import Layout from '../components/Layout'
import RestaurantPreview from '../components/Restaurants/RestaurantPreview';
import { ContentfulContentType, Food, FoodTruck, Restaurant } from '../interfaces';
import { extractEntryFields } from '../utils/contentfulParser';
import { dayOfTheWeekToInt } from '../utils/time';
import { fetchEntries } from './api/contentfulPosts';

interface AppProps {
  foodTrucks: FoodTruck[],
  foods: Food[]
  restaurants: Restaurant[]
}

const FoodTruckSection = ({ foodTrucks, chosenFood }: { foodTrucks: FoodTruck[], chosenFood?: Food } ) => (
  <section className="text-center text-sm-left food-trucks my-4">
    <h2 className="ml-lg-5 mb-3">Food Trucks</h2>
    {foodTrucks.length > 0 || !chosenFood
      ? foodTrucks.map(FoodTruckPreview) 
      : `No Food Trucks Available With "${chosenFood.name}"`
    }
  </section>
)

const RestaurantSection = ({ restaurants, chosenFood }: { restaurants: Restaurant[], chosenFood?: Food } ) => (
  <section className="text-center text-sm-left restaurants my-4">
    <h2 className="ml-lg-5 mb-3">Restaurants</h2>
    {restaurants.length > 0 || !chosenFood
      ? restaurants.map(RestaurantPreview)
      : `No Restaurants Available With "${chosenFood.name}"`
    }
  </section>
)

const App = ({foodTrucks, foods, restaurants}: AppProps) => {
  const [chosenFood, setChosenFood] = useState<Food>();
  const [filteredFoodTrucks, setFilteredFoodTrucks] = useState<FoodTruck[]>(foodTrucks);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);

  useEffect(() => {
    if (!chosenFood) {
      setFilteredFoodTrucks(foodTrucks);
      setFilteredRestaurants(restaurants);
      return;
    }

    const foodTrucksWithChosenFood = foodTrucks.filter(f => {
      {/*
      // @ts-ignore*/}
      return f.foodsAvailable.some((food) => food.fields.name === chosenFood.name);
    })

    setFilteredFoodTrucks(foodTrucksWithChosenFood);

    const restaurantsWithChosenFood = restaurants.filter(r => {
      {/*
          // @ts-ignore*/}
      return r.foodsAvailable.some((food) => food.fields.name === chosenFood.name);
    })
    
    setFilteredRestaurants(restaurantsWithChosenFood);
  }, [chosenFood])

  function handleFilter(food: Food) {
    setChosenFood(food);
  }

  return (
    <Layout title="Tennenlohe Food | Get Your Grub On!">
      <div className="row">
        <h1 className="col-12 main-title text-center my-4">Tennenlohe Food</h1>
      </div>
      <FoodFilter chosenFood={chosenFood} foods={foods} handleFilter={(food: Food) => handleFilter(food)} />
      <FoodTruckSection foodTrucks={filteredFoodTrucks} chosenFood={chosenFood} />
      <RestaurantSection restaurants={filteredRestaurants} chosenFood={chosenFood} />
    </Layout>
  )
}

export default App

export async function getStaticProps() {
    const res = await fetchEntries()

    if (!res) {
      console.error('no data retrived');
      return;
    }

    const foodTrucks = extractEntryFields<FoodTruck>(res, ContentfulContentType.FoodTruck);
    foodTrucks.sort((a, b) => {
      const aDay = dayOfTheWeekToInt(a.availableDay);
      const bDay = dayOfTheWeekToInt(b.availableDay);
      return aDay < bDay ? -1 : 1;
    })

    const restaurants = extractEntryFields<Food>(res, ContentfulContentType.Restaurant);
    const foods = extractEntryFields<Food>(res, ContentfulContentType.Food);

    return {
      props: {
        foodTrucks,
        foods,
        restaurants,
      },
    }
  }