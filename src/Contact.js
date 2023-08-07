import styled from "styled-components";

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

  return (
    <Wrapper>
      <h2 className="common-heading">Contact Us</h2>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d117626.64812074947!2d87.79004940234384!3d22.882635789971467!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f81321c9946f95%3A0x3f6368d5588d75e4!2sVIVEKANANDA%20PALLY!5e0!3m2!1sen!2sin!4v1691306706016!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="map"
        referrerPolicy="no-referrer-when-downgrade"></iframe>

      <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/xrgwewve"
            method="POST"
            className="contact-inputs">
            <input
              type="text"
              placeholder="username"
              name="username"
              required
              autoComplete="off"
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
            />

            <textarea
              name="Message"
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter you message"></textarea>

            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;