import styles from "./PokemonList.module.css";

type PokemonListProps = {
  children: React.ReactNode;
};

export default function PokemonList({ children }: PokemonListProps) {
  return <div className={styles.list}>{children}</div>;
}
