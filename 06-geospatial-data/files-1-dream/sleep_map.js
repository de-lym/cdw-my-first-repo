/*
 * NIGHTFALL — How the World Sleeps
 * =================================
 * Adapted from the course example "mapBox_Sketch_03.js" (Loading External
 * GeoJSON Data). Same core pattern — fetch a GeoJSON file, add it as a
 * source, style it with data-driven paint properties, fit the map to its
 * bounds — swapped from NYC neighborhoods to a world choropleth of average
 * nightly time in bed, built from a public sleep-duration-by-country
 * dataset (World Population Review / ENTRAIN study).
 */

var nightfallMap = function () {
  // ==========================================================
  // STEP 1: MAPBOX ACCESS TOKEN
  // ==========================================================
  // Replace with your own token from https://account.mapbox.com/access-tokens/
  mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyc2NoZXJyeSIsImEiOiJjbXJ3eTJyenAwYnhyMnlxMGJqaXI1d2kyIn0.o1RT7N039ClqF6ovbDPnhw';

  // ==========================================================
  // STEP 2: CREATE THE MAP
  // ==========================================================
  const map = new mapboxgl.Map({
    container: 'sleep-map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [10, 20],
    zoom: 1.4,
    pitch: 0,
    bearing: 0,
    projection: 'mercator'
  });

  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
  map.addControl(new mapboxgl.ScaleControl({ maxWidth: 80, unit: 'metric' }), 'bottom-right');
  map.scrollZoom.disable(); // keep page scroll usable; click the map to re-enable zoom
  map.on('click', () => map.scrollZoom.enable());

  // ==========================================================
  // STEP 3: LOAD THE DATA ONCE THE MAP IS READY
  // ==========================================================
  map.on('load', () => {
    fetch('sleep_by_country.geojson')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        map.addSource('sleep-data', {
          type: 'geojson',
          data: data,
          generateId: true // lets us use feature-state for hover highlighting
        });

        // ----------------------------------------------------
        // STEP 4: CHOROPLETH FILL
        // Amber (least sleep) -> moonlight -> violet (most sleep)
        // Countries without a matched record fall back to --no-data
        // ----------------------------------------------------
        map.addLayer({
          id: 'sleep-fill',
          type: 'fill',
          source: 'sleep-data',
          paint: {
            'fill-color': [
              'case',
              ['==', ['get', 'has_data'], true],
              [
                'interpolate',
                ['linear'],
                ['get', 'sleep_hours'],
                5.8, '#e8a25c',
                6.6, '#cfc9ba',
                7.5, '#7d6bc4'
              ],
              '#3a4270'
            ],
            'fill-opacity': [
              'case',
              ['==', ['get', 'has_data'], true], 0.85,
              0.35
            ]
          }
        });

        map.addLayer({
          id: 'sleep-border',
          type: 'line',
          source: 'sleep-data',
          paint: {
            'line-color': '#0a0e21',
            'line-width': 0.6,
            'line-opacity': 0.8
          }
        });

        // highlight layer, driven by feature-state on hover
        map.addLayer({
          id: 'sleep-highlight',
          type: 'line',
          source: 'sleep-data',
          paint: {
            'line-color': '#f3efe4',
            'line-width': [
              'case',
              ['boolean', ['feature-state', 'hover'], false], 1.6,
              0
            ]
          }
        });

        // ----------------------------------------------------
        // STEP 5: HOVER STATE
        // ----------------------------------------------------
        let hoveredId = null;

        map.on('mousemove', 'sleep-fill', (e) => {
          if (!e.features.length) return;
          map.getCanvas().style.cursor = 'pointer';

          if (hoveredId !== null) {
            map.setFeatureState({ source: 'sleep-data', id: hoveredId }, { hover: false });
          }
          hoveredId = e.features[0].id;
          map.setFeatureState({ source: 'sleep-data', id: hoveredId }, { hover: true });
        });

        map.on('mouseleave', 'sleep-fill', () => {
          map.getCanvas().style.cursor = '';
          if (hoveredId !== null) {
            map.setFeatureState({ source: 'sleep-data', id: hoveredId }, { hover: false });
          }
          hoveredId = null;
        });

        // ----------------------------------------------------
        // STEP 6: CLICK POPUP WITH SLEEP DETAILS
        // ----------------------------------------------------
        map.on('click', 'sleep-fill', (e) => {
          const props = e.features[0].properties;
          if (!props.has_data) return;

          const hours = Math.floor(props.sleep_minutes / 60);
          const mins = props.sleep_minutes % 60;

          new mapboxgl.Popup({ offset: 8 })
            .setLngLat(e.lngLat)
            .setHTML(`
              <div class="popup-country">${props.name}</div>
              <div class="popup-row"><span>Time in bed</span><strong>${hours}h ${mins}m</strong></div>
              <div class="popup-row"><span>Typical bedtime</span><strong>${props.bedtime}</strong></div>
            `)
            .addTo(map);
        });

        console.log(`Nightfall map loaded — ${data.features.length} territories, ${data.features.filter(f => f.properties.has_data).length} with sleep data.`);
      })
      .catch((error) => {
        console.error('Error loading sleep_by_country.geojson:', error);
        const el = document.getElementById('sleep-map');
        el.innerHTML = `<div style="padding:24px;font-family:sans-serif;color:#f3efe4;">
          Could not load sleep_by_country.geojson. Make sure this page is running on a
          local server (not opened directly as a file://) — see README for setup.
        </div>`;
      });
  });
};

nightfallMap();
