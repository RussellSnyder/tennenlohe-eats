import { Food } from "../interfaces";

const FoodFilter = ({ foods, handleFilter, chosenFood }: { foods: Food[], chosenFood?: Food, handleFilter: Function } ) => (
    <section className="foods col-12">
      <div className="row align-items-center">
        <div className="col-sm-6 text-center text-sm-right">
          <h4>Pick a Food:</h4>
        </div>
        <div className="col-sm-6 text-center text-sm-left">
          <div className="btn-group-sm d-flex flex-wrap" role="group" aria-label="foods available">
          <button
            className={chosenFood ? 'm-1 btn btn-outline-primary' : 'm-1 btn btn-outline-primary active'}
            onClick={() => handleFilter(null)}
          >X</button>
          {foods.map(f => {
            const isChosenFood = chosenFood && chosenFood.name === f.name;
  
            const buttonClassName = isChosenFood
              ? 'm-1 btn btn-outline-primary active'
              : 'm-1 btn btn-outline-primary'
  
            return (
              <button
                key={f.name}
                className={buttonClassName}
                onClick={() => handleFilter(isChosenFood ? undefined : f)}
              >
                {f.name}
              </button>
            )
          })}
        </div>
      </div>
      </div>
    </section>
    )

    export default FoodFilter;