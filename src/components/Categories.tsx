import { useState } from "react";
import { Value } from "sass";

function Categories(){
    const [activeIndex, setActiveIndex] = useState(0)

    const categories: string[] = [
      'Усі', 
      'М\'ясні', 
      'Вегетаріанська', 
      'Гриль',
      'Гострі', 
      'Закриті'
    ]

    const onClickCategory = (index: number) => {
      setActiveIndex(index)
    }

    return (
      <div className='categories'>
        <ul>
          {categories.map((value, index) => (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={activeIndex === index ? 'active' : ''}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  export default Categories;
  