import { FoodTruck } from "../../interfaces"
import { getTime } from "../../utils/time"

const FoodTruckPreview = ({name, address, logo, availableDay, availableStart, availableEnd, foodsAvailable}: FoodTruck) => (
    <div className="row align-items-center px-lg-5 mx-lg-5" key={name}>
        <div className="col-sm-3">
            {/*
            // @ts-ignore*/}
        <img className="img-fluid" src={logo.fields.file.url} alt={logo.fields.title}/>
        </div>
        <div className="col-sm-6">
        <h3>{name}</h3>
        <h5>{availableDay}s | {getTime(availableStart)}-{getTime(availableEnd)}</h5>
        <h6>{address}</h6>
        </div>
        <div className="col-sm-3">{foodsAvailable.map((f: any) => f.fields.name).join(', ')}</div>
        <hr className="col-sm-10 offset-sm-1" />
    </div>
)

  export default FoodTruckPreview
  