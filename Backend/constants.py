# This file will contain any constants the app will use
import math

X_RAPID_API_KEY = "61b2ad68e6mshbbd487b7af22dc1p1c66ebjsnbd25bb8ff60a"
X_RAPIDAPI_HOST = "realty-mole-property-api.p.rapidapi.com"
REALTY_MOLE_URL = "https://realty-mole-property-api.p.rapidapi.com/rentalListings"


SIZE_INT = 400
# GOOGLE'S DOCUMENTATION ABOUT CALCULATING DISTANCE BETWEEN POINTS ON THE GLOBE
# // Describe the Gall-Peters projection used by these tiles.
#   gallPetersMapType.projection = {
#     fromLatLngToPoint: function(latLng) {
#       var latRadians = latLng.lat() * Math.PI / 180;
#       return new google.maps.Point(
#           GALL_PETERS_RANGE_X * (0.5 + latLng.lng() / 360),
#           GALL_PETERS_RANGE_Y * (0.5 - 0.5 * Math.sin(latRadians)));
#     },
#     fromPointToLatLng: function(point, noWrap) {
#       var x = point.x / GALL_PETERS_RANGE_X;
#       var y = Math.max(0, Math.min(1, point.y / GALL_PETERS_RANGE_Y));

#       return new google.maps.LatLng(
#           Math.asin(1 - 2 * y) * 180 / Math.PI,
#           -180 + 360 * x,
#           noWrap);
#     }
#   };
LATITUDE_TO_KM = 110.574 #km/degree latitude, need to use google's function to determine exact distances
def find_longitude(latitude):
    """This function finds the longitude based on the give latitude

    Args:
        latitude (_type_): _description_

    Returns:
        _type_: _description_
    """
    return 111.320*math.cos(latitude)


KM_TO_PIXELS = 35 # this isnt right but its more to the scale

TRAVEL_TIME_ID = '6f1ed0f3'
TRAVEL_TIME_APPLICATION_KEY = 'ceacbffb35b3353e486797d8b0cb3cfc'
TRAVEL_TIME_BASE_URL = 'https://api.traveltimeapp.com/v4/time-map'


ZOOM_SCALE_19 = 9.3225/1000 #pixels per km? this is from google maps zooming in and manually doing it


MAPS_ZOOM_SCALE = {
    '19' : '1128.497220',
    '18' : '2256.994440',
    '17' : '4513.988880',
    '16' : '9027.977761',
    '15' : '18055.955520',
    '14' : '36111.911040',
    '13' : '72223.822090',
    '12' : '144447.644200',
    '11' : '288895.288400',
    '10' : '577790.576700',
    '9'  : '1155581.153000',
    '8'  : '2311162.307000',
    '7'  : '4622324.614000',
    '6'  : '9244649.227000',
    '5'  : '18489298.450000',
    '4'  : '36978596.910000',
    '3'  : '73957193.820000',
    '2'  : '147914387.600000',
    '1'  : '295828775.300000',
    '0'  : '591657550.500000'
    }



# our function for converting latitude and longitude coordinates to km then normalizing them
# def change_coords(latitude_array, longitude_array, map_center):
#     total_view_km = 400*PIXELS_TO_KM
#     latitude_array_km = latitude_array*LATITUDE_TO_KM
#     longitude_array_km = longitude_array*LONGITUDE_TO_KM



#     return fixed_coords_for_plotting