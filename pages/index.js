import useSWR from "swr";

export default function HomePage() {
  const { data } = useSWR("/api/plants");
  console.log(data);
  return <div></div>;
}
