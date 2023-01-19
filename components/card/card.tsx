import { useState } from 'react';
import styles from './card.module.scss';

const Card = (props) => {
    const customStyles = {
        backgroundColor: "red"
    };
    return(
        <div className={styles.card}>
            <div className={styles.card__image}>
                <img src={`${props.infos.sprites.front}`} />
            </div>

            <div className={styles.card__infos}>
                <span>{props.infos.name}</span>
            </div>

            <div className={styles['card__types-list']}>
                {props.infos.types.map((type: string) => 
                    <span style={customStyles} className={styles['card__types-list--type']}>{type}</span>
                )}
            </div>
        </div>
    );
}

export default Card;
