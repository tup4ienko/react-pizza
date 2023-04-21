import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { Skeleton } from '../components/PIzzaBlock/Skeleton';
import PizzaBlock from '../components/PIzzaBlock';
import Pizza from '../models/pizza';
import agent from '../api/agent';

const Home = () => {
  const [pizzas, setPizzas] = useState<Array<Pizza>>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPizzas = async () => {
      const pizzas = await agent.Pizzas.list();
      setPizzas(pizzas);
      setIsLoading(false);
    };

    fetchPizzas();
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Усі піци</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </>
  );
};

export default Home;
