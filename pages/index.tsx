import Link from 'next/link'
import Layout from '../components/Layout'
import { ContentType, Food, FoodTruck, Restaurant } from '../interfaces';
import { extractEntryFields, extractFoodTrucks } from '../utils/contentfulParser';
import { fetchEntries } from './api/contentfulPosts';

interface AppProps {
  foodTrucks: FoodTruck[],
  foods: Food[]
  restaurants: Restaurant[]
}

const getTime = (dateString: string) => {
  var myDate = new Date(dateString);

  var minutes = myDate.getMinutes();
  var hours = myDate.getHours();

  return `${hours}:${minutes}`;
}


const FoodTruckDisplay = ({name, address, logo, availableDay, availableStart, availableEnd}: FoodTruck) => (
  <div className="row" key={name}>
    <div className="col-sm-3">
      <img className="img-fluid" src={logo.fields.file.url} alt={logo.fields.title}/>
    </div>
    <div className="col-cm-9">
      <h3>{availableDay}s {getTime(availableStart)}-{getTime(availableEnd)}</h3>
      <h2>{name}</h2>
    </div>
  </div>
)

const RestaurantDisplay = ({name, address, logo}: Restaurant) => (
  <div className="row" key={name}>
    <div className="col-sm-3">
      <img className="img-fluid" src={logo.fields.file.url} alt={logo.fields.title}/>
    </div>
    <div className="col-cm-9">
      <h2>{name}</h2>
      <h3>{address}</h3>
    </div>
  </div>
)


const FoodTruckSection = ({ foodTrucks}: { foodTrucks: FoodTruck[] } ) => (
  <section className="food-trucks">
    <h2>Food Trucks</h2>
    {foodTrucks.map(FoodTruckDisplay)}
  </section>
)

const RestaurantSection = ({ restaurants }: { restaurants: Restaurant[] } ) => (
  <section className="restaurants">
    <h2>Restaurants</h2>
    {restaurants.map(RestaurantDisplay)}
  </section>
)

const FoodsSection = ({ foods }: { foods: Food[] } ) => (
  <section className="foods">
    <h2>Foods</h2>
    TODO: show foodtruck/resto based on food selection
    {foods.map(f => JSON.stringify(f))}
  </section>
)



const App = ({foodTrucks, foods, restaurants}: AppProps) => (
  <Layout title="Tennenlohe Food | Get Your Grub On!">
    <h1>Tennenlohe Food</h1>
    <FoodTruckSection foodTrucks={foodTrucks} />
    <RestaurantSection restaurants={restaurants} />
    <FoodsSection foods={foods} />
  </Layout>
)

export default App

export async function getStaticProps() {
    const res = await fetchEntries()

    if (!res) {
      console.error('no data retrived');
      return;
    }

    const foodTrucks = extractEntryFields<FoodTruck>(res, ContentType.FoodTruck);
    const restaurants = extractEntryFields<Food>(res, ContentType.Restaurant);
    const foods = extractEntryFields<Food>(res, ContentType.Food);

    return {
      props: {
        foodTrucks,
        foods,
        restaurants,
      },
    }
  }