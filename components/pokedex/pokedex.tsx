import Card from '../card/card';
import styles from './pokedex.module.scss';

const Pokedex = ({results}: any) => {
    return(
        <div className={styles.pokedex__container}>
            <div className={styles.pokedex__image}></div>

            <input type="text" className={styles.pokedex__searchbar} placeholder="Pokémon" />

            <div className={styles.pokedex__pokelist}>
                {results.map((res: any)  => 
                    <Card infos={ res }/>
                )}
            </div>

        </div>
    );
}

export default Pokedex;
