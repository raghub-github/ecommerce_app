import { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProductContext } from "./context/ProductContext";
import PageNavigation from "./components/PageNavigation";
import MyImage from "./components/MyImage";
import { Container } from "./styles/Container";
import FormatPrice from "./Helpers/FormatePrice";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import Star from "./components/Stars";
import AddToCart from "./components/AddToCart";

// const API = "https://api.pujakaitem.com/api/products";
// const API = "http://localhost:3001/api/products";
const API = "http://134.122.17.33:5000/api/products";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();

  const { _id } = useParams();
  // const {
  //   _id: alias,
  //   name,
  //   company,
  //   price,
  //   description,
  //   category,
  //   stock,
  //   stars,
  //   reviews,
  //   image,
  // } = singleProduct;
  // console.log(name, company, price);

  useEffect(() => {
    getSingleProduct(`${API}?_id=${_id}`);
  }, []);

  if (isSingleLoading) {
    return <div className="page_loading App">Loading.....</div>;
  }

  return (
    <Wrapper>
      {singleProduct.map((elm, index) => {
        return <div key={index}>
          <PageNavigation title={elm.name} />
          <Container className="container">
            <div className="grid grid-two-column">
              {/* product Images  */}
              <div className="product_images">
                <MyImage imgs={elm.image} />
              </div>

              {/* product dAta  */}
              <div className="product-data">
                <h2>{elm.name}</h2>
                <Star stars={elm.rating} reviews={elm.reviews} />

                <p className="product-data-price">
                  MRP:
                  <del>
                    <FormatPrice price={elm.price + 250000} />
                  </del>
                </p>
                <p className="product-data-price product-data-real-price">
                  Deal of the Day: <FormatPrice price={elm.price} />
                </p>
                <p>{elm.description}</p>
                <div className="product-data-warranty">
                  <div className="product-warranty-data">
                    <TbTruckDelivery className="warranty-icon" />
                    <p>Free Delivery</p>
                  </div>

                  <div className="product-warranty-data">
                    <TbReplace className="warranty-icon" />
                    <p>30 Days Replacement</p>
                  </div>

                  <div className="product-warranty-data">
                    <TbTruckDelivery className="warranty-icon" />
                    <p>Quick Delivered </p>
                  </div>

                  <div className="product-warranty-data">
                    <MdSecurity className="warranty-icon" />
                    <p>2 Year Warranty </p>
                  </div>
                </div>

                <div className="product-data-info">
                  <p>
                    Available:
                    <span style={{ color: "green" }}> {elm.stock > 0 ? "In Stock" : "Not Available"}</span>
                  </p>
                  {/* <p>
                ID : <span> {elm._id} </span>
              </p> */}
                  <p>
                    Brand :<span> {elm.company} </span>
                  </p>
                </div>
                <hr />
                {(elm.stock) > 0 && <AddToCart product={elm} />}
              </div>
            </div>
          </Container>
        </div>
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 2rem 0;
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;