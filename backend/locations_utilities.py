import math
from utilities import deep_get
from requests_utils import get_data_from_url


def get_center_from_degrees(locations):

    if len(locations) == 0:
        return False

    x = 0.0
    y = 0.0
    z = 0.0

    for coord in locations:
        latitude = math.radians(coord[0])
        longitude = math.radians(coord[1])

        x += math.cos(latitude) * math.cos(longitude)
        y += math.cos(latitude) * math.sin(longitude)
        z += math.sin(latitude)

    total = len(locations)

    x = x / total
    y = y / total
    z = z / total

    central_longitude = math.atan2(y, x)
    central_square_root = math.sqrt(x * x + y * y)
    central_latitude = math.atan2(z, central_square_root)

    return [math.degrees(central_latitude), math.degrees(central_longitude)]


def get_locations_data(locations_names):

    # get location data for each location
    locations_to_return = []
    locations_center = []
    for location in locations_names.get("locations", []):
        url = f"https://nominatim.openstreetmap.org/search.php?q={location}&polygon_geojson=1&format=json"
        location_data = get_data_from_url(url)

        # parse data to get only coords if there is data
        if type(location_data) is list and len(location_data) > 0:
            location_data = location_data[0]
            locations_to_return.append(
                deep_get(location_data, [], "geojson", "coordinates")[0])

            # get center of each location
            lat = location_data.get("lat")
            lon = location_data.get("lon")
            if lat and lon:
                locations_center.append([float(lon), float(lat)])

    # get center of all locations [lat, lon]
    center_point = get_center_from_degrees(locations_center)

    # return locations data or error message
    data = {
        "center": center_point if center_point else [0, 0],
        "locations": locations_to_return
    }
    return data
