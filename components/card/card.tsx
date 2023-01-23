import { useEffect } from 'react';
import styles from './card.module.scss';

const Card = ({ infos, types }) => {
    const setColor = (type: string) => {
        const typeColor = types.results.find(item => {
            if(item.name === type) {
                return item;
            }
        });

        return {
            backgroundColor: typeColor.colors.foreground || '#FFFFFF',
            border: `1px solid ${typeColor.colors.background}` || '#000000',
        };
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
                    <span style={setColor(type)} className={styles['card__types-list--type']}>{type}</span>
                )}
            </div>
        </div>
    );
}

export default Card;
