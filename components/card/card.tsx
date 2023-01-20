import { useEffect } from 'react';
import { ModelResponseGet as ModelTypes} from '../../pages/api/types/methods/get';
import styles from './card.module.scss';

const Card = ({ infos }) => {

    const setTypeColor = (type: string) => {
        useEffect(() => {
            fetch(`/api/types`)
               .then((response) => response.json())
               .then((data: ModelTypes) => {
                // debugger
                    const typeColor = data.results.find(item => {
                        if(item.name.toLowerCase === type.toLowerCase) {
                            return item.colors.secondary;
                        }
                    }) || '#FFFFFF';
                    return {
                        backgroundColor: typeColor
                    };
                  console.log(data);
               })
               .catch((err) => {
                  console.log(err.message);
               });
         }, []);
    }

    return(
        <div className={styles.card}>
            <div className={styles.card__image}>
                <img src={`${infos.sprites.front}`} />
            </div>

            <div className={styles.card__infos}>
                <span>{infos.name}</span>
            </div>

            <div className={styles['card__types-list']}>
                {infos.types.map((type: string) => 
                    <span style={setTypeColor(type)} className={styles['card__types-list--type']}>{type}</span>
                )}
            </div>
        </div>
    );
}

export default Card;
