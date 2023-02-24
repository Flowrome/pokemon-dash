import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../card/card";
import styles from "./pokedex.module.scss";

const Pokedex = ({ results, types }: any) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    router.push(`/home?q=${debouncedSearch}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <div className={`${styles.pokedex__container}`}>
      <div className={styles.pokedex__image}></div>

      <input
        type="text"
        onChange={() => {}}
        className={styles.pokedex__searchbar}
        onKeyUp={(event: any) => {
            console.log(event)
          setSearch(event.target?.value || "");
        }}
        placeholder="Pokémon"
      />

      <div
        className={`${styles.pokedex__pokelist} col-8 d-flex justify-content-center flex-wrap`}
      >
        {results.map((res: any, index: number) => (
          <Card key={index} infos={res} types={types} />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
