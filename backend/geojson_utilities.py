import math

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