import React from "react";
import { Container, Row, Col } from 'reactstrap'
import GenerateButton from "./GenerateButton";

import PromptInput from "./PromptInput";

class StableDiffusion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prompt: "",
            message: "",
            lock: false
        }
    }

    setPrompt = (value) => {
        this.setState({
            prompt: value,
        });
    }

    generateImage = () => {
        this.setState({message: "Please wait up to a minute for the image to generate...", lock: true});
        let url = "http://localhost:5000/generate/"
        fetch(url, 
            {
                method: "PUT",
                headers: {
                    "ContentType": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost"
                },
                body: JSON.stringify({"prompt": this.state.prompt})
            }
        )
        .then(
            (response) => response.blob()
        )
        .then(
            (blob) => {
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                  );
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute(
                    'download',
                    `${this.state.prompt.toLowerCase().replaceAll(' ', '_')}`,
                  );
              
                  document.body.appendChild(link);
              
                  // Start download
                  link.click();
              
                  link.parentNode.removeChild(link);
                  this.setState({message: "Downloading...", lock: false})
            }
        ).catch(
            (error) => {
                console.log(error);
                this.setState({message: "An error has occurred.", lock: false})
            }
        );
    }

    render() {

        let message = <></>
        if(this.state.message) {
            message = <p>{this.state.message}</p>
        }

        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col>
                        <PromptInput
                            setPrompt={this.setPrompt}
                            disabled={this.state.lock}
                        />
                        <GenerateButton
                            generateImage={this.generateImage}
                            disabled={this.state.lock}
                        />
                        {message}
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default StableDiffusion;