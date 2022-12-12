from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS

from generate_image import GenerateImage

app = Flask(__name__)
CORS(app)

api = Api(app)

api.add_resource(GenerateImage, '/generate/')

if __name__ == "__main__":
    app.run(debug=True)



