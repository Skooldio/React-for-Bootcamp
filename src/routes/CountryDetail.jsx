/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";

export default function CountryDetail() {
  const { id } = useParams();
  return <div>Hello {id}</div>;
}
