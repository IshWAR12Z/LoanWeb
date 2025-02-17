import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Card } from "react-bootstrap";

function CardGrid() {
  const [cards, setCards] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });

  // Fetch Cards from Backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cards")
      .then((res) => setCards(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle Loan Apply Button Click
  const handleApplyClick = (loanTitle) => {
    setSelectedLoan(loanTitle);
    setShow(true);
  };

  // Handle Modal Close
  const handleClose = () => {
    setShow(false);
    setFormData({ name: "", email: "", phone: "", amount: "" });
  };

  // Handle Form Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Loan Application Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/apply", {
        ...formData,
        loanType: selectedLoan,
      });
      alert("Loan Application Submitted Successfully!");
      handleClose();
    } catch (error) {
      console.error("Error submitting loan application", error);
      alert("Error submitting application");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold text-primary">Loan Categories</h2>
      <div className="row">
        {cards.map((card) => (
          <div key={card._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <Card className="shadow-lg border-0 custom-card">
              <div className="card-img-container">
                <Card.Img
                  variant="top"
                  src={card.img}
                  alt={card.title}
                  onError={(e) => (e.target.src = "")} // Fallback Image
                  className="img-fluid"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fw-bold">{card.title}</Card.Title>
                <Card.Text className="text-muted">
                  {card.description || "Apply now for the best loan offers."}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleApplyClick(card.title)}
                >
                  Apply Now
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Loan Application Form Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {selectedLoan}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Loan Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Application
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CardGrid;
