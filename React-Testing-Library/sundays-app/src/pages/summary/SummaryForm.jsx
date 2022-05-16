import React, { useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";



const popover = (
    <Popover id="popover-basic">
        <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
)

const checboxLabel = (
    <span>
        <OverlayTrigger placement="right" overlay={popover}>
            <span style={{ color: 'blue' }}> Terms and Conditions</span>
        </OverlayTrigger>
    </span>
)




export const SummaryForm = ({ setOrderPhase }) => {
    const [terms, setTerms] = useState(false);

    const handleCheckbox = (e) => {
        setTerms(e.target.checked);
    }

    const handleClick = (e) => {
        console.log("Clicking...");
        setOrderPhase("completed");


    }

    return (
        <div className="App">
            <Form>
                <Form.Group controlId="terms-and-conditions" style={{ display: "flex", justifyContent: "center" }}>
                    <Form.Check type="checkbox" checked={terms} onChange={handleCheckbox} label={checboxLabel} />
                </Form.Group>
            </Form>

            <Button variant="primary" type="submit" onClick={handleClick} disabled={!terms}>Confirm order</Button>
        </div>
    )
};
