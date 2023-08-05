import styled from "styled-components";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 4rem 0 4rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

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
      <h2 className="common-heading">Contact page</h2>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d55116.98855515319!2d87.75983657304091!3d22.872830267012638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1spujari%20shop%2C%20word%20no%2013%2C%20vivekanada%20apartment%2C%20vivekananda%20pally%2C%20arambagh%2C%20hooghly%2C%20712601!5e0!3m2!1sen!2sin!4v1691251276105!5m2!1sen!2sin"
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
            action="https://formspree.io/f/xeqdgwnq"
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