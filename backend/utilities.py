from functools import reduce
import hashlib

def deep_get(dictionary,  default=None, *keys):
    return reduce(lambda d, key: d.get(key) if d else default, keys, dictionary)

def hash_password(password):
    return hashlib.sha256(password.encode("utf-8")).hexdigest() if password else ""