import Card from "../../components/Card";
import Layout from "../../components/Layout";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");

    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export default function Character() {
  const router = useRouter();
  const { slug: id } = router.query;

  const {
    data: character,
    error,
    isLoading,
  } = useSWR(`https://swapi.dev/api/people/${id}`, fetcher);

  if (error) return <h1>Something went wrong...</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Layout>
      <Card
        id={id}
        name={character.name}
        height={character.height}
        eyeColor={character.eye_color}
        birthYear={character.birth_year}
      />
    </Layout>
  );
}
