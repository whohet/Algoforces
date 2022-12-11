import React from "react";
import { Accordion, Container } from "react-bootstrap";
import { FAQ_DATA } from "./faq_data";

import "./FAQ.css";

function FAQ() {
  return (
    <div className="faq-page">
      <div className="faq-container">
        {/* <h2>Frequently Asked Questions</h2> */}
        <h5>Find the answers for the most frequently asked questions below.</h5>
        <Accordion>
          <Accordion>
            {FAQ_DATA.map((faq, i) => {
              return (
                <Accordion.Item eventKey={i}>
                  <Accordion.Header>{faq.question}</Accordion.Header>
                  <Accordion.Body>
                    <div style={{whiteSpace: "pre-line"}}>{faq.answer}</div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Accordion>
      </div>
    </div>
  );
}

export default FAQ;
