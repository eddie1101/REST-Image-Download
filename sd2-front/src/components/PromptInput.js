import React from "react";
import { Input, Label, FormGroup } from 'reactstrap'

class PromptInput extends React.Component {

    constructor(props) {
        super(props);
    }

    setPrompt = (event) => {
        this.props.setPrompt(event.target.value)
    }  

    render() {

        let placeholder = "Prompt..."

        return (
            <FormGroup floating>
                <Input 
                    id="prompt"
                    type="text"
                    placeholder={placeholder}
                    onChange={this.setPrompt} disabled={this.props.disabled}
                />
                <Label for="prompt">
                    {placeholder}
                </Label>
            </FormGroup>
        );
    }
}

export default PromptInput