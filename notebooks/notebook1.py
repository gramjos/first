# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "geopandas[all]",
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
    import polars as pl
    import marimo as mo

    path_to_csv = mo.notebook_location() / "public" / "bnsf_rail_il.geojson"
    df = g.read_file(str(path_to_csv))
    return (df,)


@app.cell
def _(df):
    df.head()
    return


@app.cell
def _():
    return


if __name__ == "__main__":
    app.run()
