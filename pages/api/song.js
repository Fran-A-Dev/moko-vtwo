import netlifyGraph from "../../lib/netlifyGraph";

export default async function handler(req, res) {
  const result = await netlifyGraph.fetchSpotifySearch(
    {
      query: "Set Fire to The Rain",
    },
    { accessToken: "??" }
  );

  result.data.spotify.search.tracks.map((track) => {
    console.log(track.id);
    console.log(track.name);
    console
      .log(track.artists)
      .map((artist) => {
        artist.name;
      })
      .join(", ");
  });
  res.status(200).json({ name: "fran " });
}
