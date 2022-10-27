from functools import reduce


def deep_get(dictionary,  default=None, *keys):
    return reduce(lambda d, key: d.get(key) if d else default, keys, dictionary)