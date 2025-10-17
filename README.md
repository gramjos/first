- cloudfare pages with custom DNS (grahamjoss.org)
- vanilla js ethos with minor exceptions (leaflet and marimo)
- data slice b/c cloudflare 25 MiB limit
```zsh
python -c '
import geopandas as g;
folder = "/Users/gramjos/Computation/cloud-pages/first/notebooks/public/";
d=g.read_file(folder+"bnsf_rail_il.geojson");
il_s=d[d["STATEAB"]=="IL"];
il_s.to_file(folder+"bnsf_rail_il.geojson",driver="GeoJSON");
'
```
- marimo notebook creation `uvx marimo edit notebook1.py`
- notebook conversion `marimo export html-wasm notebook1.py -o output_dir --mode edit --include-cloudflare`

