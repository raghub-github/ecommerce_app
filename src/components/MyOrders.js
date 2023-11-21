import React, { useState, useEffect } from 'react';

const OrderStatusChecker = () => {
  // State to store orders and loading state
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch orders from the API
  const fetchOrders = async () => {
    try {
      setLoading(true);

      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      const response = await fetch('YOUR_API_ENDPOINT');
      const data = await response.json();

      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to fetch orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <div style={styles.container}>
      {loading ? (
        <p style={styles.loading}>Loading orders...</p>
      ) : (
        orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} style={styles.orderContainer}>
              <p style={styles.orderId}>Order ID: {order.id}</p>
              <p style={styles.orderStatus}>Status: {order.status}</p>
              {/* Add more order details as needed */}
            </div>
          ))
        ) : (
          <p style={styles.noOrders}>No orders found.</p>
        )
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: 'auto',
    marginTop: '50px',
  },
  loading: {
    fontSize: '18px',
    color: '#888',
  },
  orderContainer: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  orderId: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  orderStatus: {
    fontSize: '14px',
    color: '#4CAF50',
  },
  noOrders: {
    fontSize: '16px',
    color: '#888',
  },
};

export default OrderStatusChecker;
