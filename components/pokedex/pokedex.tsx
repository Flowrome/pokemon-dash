import Card from '../card/card';
import styles from './pokedex.module.scss';

const Pokedex = ({results, types}: any) => {
    return(
        <div className={`${styles.pokedex__container}`}>
            <div className={styles.pokedex__image}></div>

            <input type="text" className={styles.pokedex__searchbar} placeholder="Pokémon" />

            <div className={`${styles.pokedex__pokelist} col-8 d-flex justify-content-center flex-wrap`}>
                {results.map((res: any, index: number)  => 
                    <Card key={index} infos={ res } types={types}/>
                )}
            </div>
        </div>
    );
}

export default Pokedex;

