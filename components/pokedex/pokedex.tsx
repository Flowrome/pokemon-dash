import { useState } from 'react';
import styles from './pokedex.module.scss';

const Pokedex = () => {
    return(
        <div className={styles.pokedex__container}>
            <input type="text" className={styles.pokedex__searchbar} placeholder="Pokémon" />

            <div className={styles.pokedex}>
                <div className={styles.pokedex__image}>
                    image box
                </div>
                <div className={styles.pokedex__details}>
                    detail infos
                </div>
            </div>
        </div>
    );
}

export default Pokedex;
