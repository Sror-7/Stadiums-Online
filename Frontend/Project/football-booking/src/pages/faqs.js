import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQs() {
  const faqs = [
    {
      question: "What is GOOL?",
      answer:
        "GOOL is a stadium booking platform where owners can share their available slots and players can easily book them online.",
    },
    {
      question: "How can I register?",
      answer:
        "Click on the 'Register' button in the footer or header, fill out the form, and verify your email to create your account.",
    },
    {
      question: "Can I book without an account?",
      answer:
        "No, you need to create an account in order to book stadium slots.",
    },
    {
      question: "Is there a fee to join as a stadium owner?",
      answer:
        "Currently, joining as a stadium owner is free. In the future, there may be premium features with extra benefits.",
    },
  ];

  return (
    <Container sx={{ py: 6 }} style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        Frequently Asked Questions (FAQs)
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
