import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserContext } from "./context/user_context";
import { toast } from "react-toastify";
// import { useAuth0 } from "@auth0/auth0-react";
// const host = process.env.REACT_APP_HOSTNAME;

const Contact = () => {
  const Wrapper = styled.section`
    padding: 4rem 0 4rem 0;
    text-align: center;
    .common-heading {
      font-size: 3.8rem;
      font-weight: 500; 
      margin-bottom: 3rem;
      text-transform: capitalize;
    }

    .container {
      margin-top: 10rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  // const { user, isAuthenticated } = useAuth0();
  const { user } = useUserContext();
  // const [message, setMessage] = useState({message:""});
  const [userData, setUserData] = useState({ username: '', mobile: '', email: '' });

  useEffect(() => {
    const fetchUserData = () => {
      if (localStorage.getItem("authToken") && user) {
        setUserData({
          username: user.name,
          email: user.email,
          mobile: user.mobile || ''
        });
      } else {
        // Reset user data if auth-token is not present
        setUserData({ username: '', email: '', mobile: '' });
      }
    };
    fetchUserData();
  }, [user]);

  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  // const handleInputChange = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   if (name === 'message') {
  //     setMessage(value);
  //   } else {
  //     setUserData((prevUserData) => ({
  //       ...prevUserData,
  //       [name]: value,
  //     }));
  //   }
  // };

  return (
    <Wrapper>
      <h2 className="common-heading">Contact Us</h2>
      <div className="container" style={{ marginTop: "0" }}>
        <div className="contact-form">
          <form
            action="https://formspree.io/f/xrgwewve"
            method="POST"
            className="contact-inputs">
            <label className="label-form" htmlFor=""> Name
              <input
                type="text"
                placeholder="Username"
                name="username"
                id="username"
                onChange={handleInputChange}
                value={userData.username}
                required
                autoComplete="off"
                style={{ textTransform: "none" }}
              />
            </label>
            <label className="label-form" htmlFor=""> Mobile
              <input
                type="mobile"
                name="mobile"
                id="mobile"
                placeholder="Mobile Number"
                value={userData.mobile}
                autoComplete="off"
                onChange={handleInputChange}
                required
                style={{ textTransform: "none" }}
              /></label>
            <label className="label-form" htmlFor=""> Email
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={userData.email}
                autoComplete="off"
                onChange={handleInputChange}
                required
                style={{ textTransform: "none" }}
              /></label>
            <label className="label-form" htmlFor=""> Message
              <textarea
                name="message"
                cols="30"
                rows="5"
                required
                autoComplete="off"
                // value={message}
                // onChange={handleInputChange}
                minLength={5}
                style={{ textTransform: "none" }}
                placeholder="Write your message here" /></label>
            <input type="submit" value="send" onClick={() => { toast.success("Message sent successfully"); }} />
            {/* <input type="submit" value="send" onClick={() => {
              if (message.length >= 5) {
                toast.success("Message sent successfully");
              } else {
                toast.error("Message must be at least 5 characters");
              }
            }}
              disabled={message.length < 5} /> */}
          </form>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d117626.64812074947!2d87.79004940234384!3d22.882635789971467!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f81321c9946f95%3A0x3f6368d5588d75e4!2sVIVEKANANDA%20PALLY!5e0!3m2!1sen!2sin!4v1691306706016!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{ border: 0, paddingTop: 50 }}
        allowFullScreen=""
        loading="lazy"
        title="map"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
    </Wrapper>
  );
};

export default Contact;