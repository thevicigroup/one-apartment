"use client";

import React from "react";
import * as turf from "@turf/turf";
import { TimeMapResponse } from "traveltime-api";

import type { Apartment } from "@/types/apartment";
import { buildIsochrones, buildShapes } from "@/lib/build-isochrones";
import { CoordToPosition } from "@/lib/coord-to-position";
import { Button } from "@/components/ui/button";
import { useApartmentContext } from "@/components/providers";

export const UpdateApartmentsButton = () => {
    const { updateApartments, parameters, saveIsochrones, saveShapes } = useApartmentContext();

    async function updateApartmentsOnMap() {
        const response = await fetch("/api/isochrone", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ parameters: parameters }),
        });
        const apartmentsResponse = await fetch(
            "/api/apartments?" + new URLSearchParams({ address: parameters![0].address }),
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        if (response?.ok && apartmentsResponse?.ok && (response?.ok && apartmentsResponse?.ok)) {
              const apartments: Apartment[] = await apartmentsResponse.json();
              // updateApartments(apartments);
              const data: TimeMapResponse = await response.json();
              const shapes = buildIsochrones(data);
              const isochrones = buildShapes(data);
              saveIsochrones(shapes);
              saveShapes(isochrones);
        
              let filteredApartments: Apartment[] = [];
              if (isochrones.length > 0) {
                  const apartmentPoints = turf.points(
                      apartments.map((apartment) => {
                          return [apartment.latitude, apartment.longitude];
                      }),
                  );
                  isochrones.map((iso) => {
                      const polygon = turf.polygon([CoordToPosition(iso)]);
                      const pointsInside = apartmentPoints.features.map((p) => {
                          if (turf.booleanPointInPolygon(p.geometry, polygon)) {
                              return p.geometry.coordinates;
                          }
                          return [];
                      });
                      apartments
                          .filter((a) => {
                              const p = [a.latitude, a.longitude];
                              for (const i of pointsInside) {
                                  if (i.length === 0) continue;
                                  if (p[0] === i[0] && p[1] === i[1]) {
                                      return true;
                                  }
                              }
                              return false;
                          })
                          .map((a) => {
                              filteredApartments.push(a);
                              return a;
                          });
                  });
                  updateApartments(filteredApartments);
              }
        }
    }

    return (
        <Button className="w-full" variant="secondary" onClick={() => updateApartmentsOnMap()}>
            Update Apartments
        </Button>
    );
};
