import type { Position } from "@turf/turf";
import type { Coords } from "traveltime-api";

export function CoordToPosition(coords: Coords[]) {
    let position_array: Position[] = [];
    for (const c of coords) {
        position_array.push([c.lat, c.lng]);
    }
    return position_array;
}
