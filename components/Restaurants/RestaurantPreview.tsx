import { Restaurant } from "../../interfaces"

const RestaurantPreview = ({ name, address, logo, foodsAvailable }: Restaurant) => (
    <div className="row align-items-center px-lg-5 mx-lg-5" key={name}>
        <div className="col-sm-3">
            {/*
           // @ts-ignore*/}
            <img className="img-fluid" src={logo.fields.file.url} alt={logo.fields.title} />
        </div>
        <div className="col-sm-6">
            <h3>{name}</h3>
            <h6>{address}</h6>
        </div>
        {/*
           // @ts-ignore*/}
        <div className="col-sm-3">{foodsAvailable.map(f => f.fields.name).join(', ')}</div>
        <hr className="col-sm-10 offset-sm-1" />
    </div>
)

export default RestaurantPreview