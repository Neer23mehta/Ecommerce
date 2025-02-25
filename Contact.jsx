import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import "/home/tristate/Desktop/Neer/neer/src/EcommerseUI/Signup.css";


const items = "FormItems"
export const contactData = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData)
    console.log(data); 
  } catch (error) {
    console.error(error); // Handle error appropriately
  }
};

export const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem(items);
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(items, JSON.stringify(formData));
    console.log(formData);
    return setFormData("")
  };

  // const handleclick = () => {
  //  return setFormData("");
  // }

  return (
    <div className="Main-container">
      <Form method="POST" className="Form-main" action="/contact" onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          style={{ height: "100px" }}
        />

        <button type="submit" >Submit</button>
      </Form>
    </div>
  );
};
