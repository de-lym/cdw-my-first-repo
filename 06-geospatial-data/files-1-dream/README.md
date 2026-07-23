# Nightfall — How the World Sleeps

A single Mapbox GL JS canvas: a world choropleth of average nightly time in
bed by country, built for the Geospatial Structures assignment (Digital
Object 4). Adapted from the course example `mapBox_Sketch_03.js`
(external GeoJSON loading pattern).

## Files
- `index.html` — page shell, loads Mapbox GL JS + this project's CSS/JS
- `style.css` — the "Nightfall" design system (night-sky palette, Fraunces/IBM Plex type)
- `sleep_map.js` — the map logic (adapted from `mapBox_Sketch_03.js`)
- `sleep_by_country.geojson` — the data: 177 country boundaries (Natural
  Earth 1:110m), 48 of them carrying real sleep-duration figures

## 1. Add your Mapbox token
Open `sleep_map.js` and replace the placeholder on the `mapboxgl.accessToken`
line with your own public token from
https://account.mapbox.com/access-tokens/

```js
mapboxgl.accessToken = 'pk.YOUR_OWN_TOKEN_HERE';
```

## 2. Run on a local server
Like the course example, this fetches a local `.geojson` file, which
browsers block over `file://`. From inside this folder, run one of:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then visit `http://localhost:8000`.

## 3. Where the data comes from
Sleep figures: downloaded directly from World Population Review,
*"Average Sleep Time by Country"* —
https://worldpopulationreview.com/country-rankings/average-sleep-time-by-country
(source file included here as `source_sleep_data.json`, 50 markets, average
minutes in bed and bedtime, sourced by WPR from a 2015 ENTRAIN smartphone
sleep-tracking study).

Boundaries: [nvkelso/natural-earth-vector](https://github.com/nvkelso/natural-earth-vector),
`ne_110m_admin_0_countries.geojson` (public domain, Natural Earth).

Two markets in the source file — Hong Kong and Singapore — don't exist as
separate polygons at 1:110m boundary resolution, so 48 of the 50 rows end up
mapped. `sleep_by_country.geojson` is generated from `source_sleep_data.json`
joined onto the Natural Earth boundaries by country name.

## Submission notes
**Angle chosen:** sleep science — average time in bed and bedtime by
country, as a way into the "dream" theme through the biology that makes
dreaming possible.

**How a geospatial structure could extend into a more personal/dream
project:** the same choropleth machinery (a GeoJSON source, data-driven
`fill-color`, hover/click states) could just as easily map an individual's
own dream journal — geotagging each entry to the real or half-remembered
place it was set in. Recurring settings could be shown as point-density
heatmap layers instead of country fills, and a time slider could scrub
through months of entries to reveal which places recur most in someone's
dreaming mind, turning a private, interior archive into something
navigable like a city.
