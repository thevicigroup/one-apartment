from shapely.geometry import Point
from shapely.geometry.polygon import Polygon
import numpy as np
import contextlib
from icecream import ic



def coordinate_inside(target_coordinates, shell_coordinate_latitude, shell_coordinate_longitude, hole_coordinate_latitude, hole_coordinate_longitude):
    """ This function serves to find out of the target coordinates
    that are input into this function are inside any of the isochrone
    shells

    Parameters:
    -----------
        target_coordinates : 
            These are the current coordinates being analyzed
        shell_coordinate_latitude : 

        shell_coordinate_longitude : 

        hole_coordinate_latitude : 

        hole_coordinate_longitude : 

    Returns:
    --------
        Bool, True if inside the shells, false if outside
    
    
    
    """
    
    target_coordinates = Point(target_coordinates)
    final_bool = []
    for shell in range(len(shell_coordinate_latitude)):
        current_coords = np.column_stack((shell_coordinate_latitude[shell], shell_coordinate_longitude[shell]))
        current_polygon = Polygon(current_coords)
        final_bool.append(target_coordinates.within(current_polygon))
    for hole in range(len(hole_coordinate_latitude)):
        with contextlib.suppress(KeyError):
            current_coords = np.column_stack((hole_coordinate_latitude[hole], hole_coordinate_longitude[hole]))
            current_polygon = Polygon(current_coords)
            current_bool = target_coordinates.within(current_polygon)
            current_bool = current_bool != True
            final_bool.append(current_bool)
    return any(final_bool)