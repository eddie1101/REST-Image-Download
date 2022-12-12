from flask import send_file
from flask_restful import Resource, request

import json

from stable_diffusion import generate_image


class GenerateImage(Resource):
    def put(self):
        print(request.data)
        prompt = json.loads(request.data)["prompt"]
        path = generate_image(768, 768, prompt)
        return send_file("output/" + path)
