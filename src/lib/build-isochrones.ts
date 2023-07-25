import { Coords, TimeMapResponse } from "traveltime-api";

export function buildIsochrones(iso: TimeMapResponse) {
    let shapes: Coords[][] = [];
    iso.results.map((isochrone, i) => {
        if (isochrone.search_id === "inter") {
            isochrone.shapes.map((shape, j) => {
                let shell = shape.shell;
                shapes.push(shell);
            });
        }
    });
    return shapes;
}