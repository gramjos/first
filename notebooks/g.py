# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "geopandas[all]==1.1.1",
# ]
# ///

import marimo

__generated_with = "0.17.0"
app = marimo.App(width="medium")


@app.cell
def _():
    import geopandas as g
    return (g,)


@app.cell
def _(g):
    d=g.read_file("/Users/gramjos/Computation/cloud-pages/first/notebooks/public/bnsf_rail.geojson")
    return (d,)


@app.cell
def _(d):
    d
    return


@app.cell
def _(d):
    il_s=d[d['STATEAB']=='IL']
    return (il_s,)


@app.cell
def _(il_s):
    il_s
    return


@app.cell
def _():
    return


if __name__ == "__main__":
    app.run()
