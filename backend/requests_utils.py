from requests import get, Response

def get_data_from_url(url: str) -> Response:
    response = get(url)
    return response.json() if response.status_code == 200 else False