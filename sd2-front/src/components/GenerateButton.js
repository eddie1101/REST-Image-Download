import React from "react";
import { Button } from "reactstrap";

class GenerateButton extends React.Component {

    constructor(props) {
        super(props);
    }

    generateImage = () => {
        this.props.generateImage();
    }

    render() {
        return (
            <Button onClick={this.generateImage} disabled={this.props.disabled}>
                Download Image
            </Button>
        );
    }

}

export default GenerateButton;