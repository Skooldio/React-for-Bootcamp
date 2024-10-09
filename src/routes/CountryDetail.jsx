/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Divider, Typography } from "@mui/material";

export default function CountryDetail() {
  const { name } = useParams();
  const [countryDetail, setCountryDetail] = useState(null);
  const [loading, setLoading] = useState(countryDetail ? false : true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await res.json();
        if (!res.ok || !data.length) {
          setError({ message: "not-found" });
          return;
        }
        setCountryDetail(data[0]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [name]);
  if (loading) {
    return "loading...";
  }
  if (error) {
    if (error?.message === "not-found ") {
      return "No country information";
    }
    return "Something went wrong";
  }
  return (
    <main
      style={{
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <Button component={Link} to="/" sx={{ marginTop: "1rem" }}>
        All countries
      </Button>
      <Divider sx={{ marginBlock: "1rem" }} />
      <Typography
        variant="h1"
        sx={{
          fontSize: "3rem",
          fontWeight: 500,
          marginTop: "0.5rem",
        }}
      >
        {countryDetail.name.common}
      </Typography>
      <Typography variant="overline" sx={{ marginBottom: "1rem" }}>
        {countryDetail.region}
      </Typography>

      <img
        src={countryDetail.flags.svg}
        alt={countryDetail.flags.alt}
        width="100%"
        style={{ aspectRatio: 2 }}
      />
      <Typography variant="h3" sx={{ fontSize: "1.5rem", marginTop: "1rem" }}>
        Capital
      </Typography>
      <ul>
        {countryDetail.capital
          ? countryDetail.capital?.map((item) => <li key={item}>{item}</li>)
          : "-"}
      </ul>

      <Typography variant="h3" sx={{ fontSize: "1.5rem", marginTop: "1rem" }}>
        Timezones
      </Typography>
      <ul>
        {countryDetail.timezones
          ? countryDetail.timezones?.map((item) => <li key={item}>{item}</li>)
          : "-"}
      </ul>

      <Typography variant="h3" sx={{ fontSize: "1.5rem", marginTop: "1rem" }}>
        Borders
      </Typography>
      <ul>
        {countryDetail.borders
          ? countryDetail.borders?.map((item) => <li key={item}>{item}</li>)
          : "-"}
      </ul>
    </main>
  );
}
