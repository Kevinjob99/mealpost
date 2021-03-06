const Moltin = require('../../../helpers/moltin');
const checkToken = require('../../../helpers/checkToken');
const config = require('../../../config/config');
const User = require('../../../models/user');
const OrderFeedback = require('../../../models/orderFeedback');
const Order = require('../../../models/order');

exports.getOrderHistory = (request) => {
  return new Promise((resolve, reject) => {
    let email = checkToken(request);  
    
    if (email) {
      User.findOne({ email: email }).exec((err, user) => {
        if (err) {
          reject({ status: 500, message: 'Internal server error ...' });
          return;
        }
  
        if (!user) {
          reject({ status: 401, message: 'Unauthorized request!' });
          return;
        }

        if (!user.customer_id) {
          reject({ status: 403, message: 'User is not a registered customer!' });
          return;
        }

        Moltin.Orders.With('items').Filter({eq: {customer_id: user.customer_id}}).All()
          .then(orders => {
            resolve({ status: 200, order_history: transformOrderInfo(orders)});
          })
          .catch(err => {
            console.log(err);
            reject({ status: err.errors[0].status, message: err.errors[0].detail});
          })
      });
    } else {
      reject({ status: 401, message: 'Unauthorized request!'});
    }
  });
};

exports.getOrder = (request) => {
  return new Promise((resolve, reject) => {
    let email = checkToken(request);  
    
    if (email) {
      User.findOne({ email: email }).exec((err, user) => {
        if (err) {
          reject({ status: 500, message: 'Internal server error ...' });
          return;
        }
  
        if (!user) {
          reject({ status: 401, message: 'Unauthorized request!' });
          return;
        }

        if (!user.customer_id) {
          reject({ status: 403, message: 'User is not a registered customer!' });
          return;
        }

        const orderId = request.param('id');
        console.log(orderId);

        Order.findOne({ order_id: orderId }).exec((err, order) => {
          if (err) {
            reject({ status: 500, message: 'Internal server error ...' });
            return;
          } else {
            resolve({ status: 200, order: order});
          }
        });
      });
    } else {
      reject({ status: 401, message: 'Unauthorized request!'});
    }
  });
};

exports.rateOrder = (request) => {
  return new Promise((resolve, reject) => {
    let email = checkToken(request);  
    
    if (email) {
      User.findOne({ email: email }).exec((err, user) => {
        if (err) {
          reject({ status: 500, message: 'Internal server error ...' });
          return;
        }
  
        if (!user) {
          reject({ status: 401, message: 'Unauthorized request!' });
          return;
        }

        if (!user.customer_id) {
          reject({ status: 403, message: 'User is not a registered customer!' });
          return;
        }

        const { order_id, product_id, rate, feedback, canReply } = request.body; 

        Moltin.Products.Get(product_id)
          .then(product => {
            new OrderFeedback({
              user: {
                user_id: user,
                name: user.name,
                email: user.email,
              },
              order_id: order_id,
              product: {
                product_id: product_id,
                name: product.data.name,
                price: product.data.meta.display_price.without_tax.formatted,
              },
              rate: rate,
              feedback: feedback,
              canReply: canReply,
            }).save(err => {
              if (err) {
                console.log(err);
                reject({ status: 500, message: 'Internal Server Error' });
              } else {
                resolve({ status: 200, message: 'Feedback has been saved'});
              }
            });
          })
          .catch(err => {
            console.log(err);
            reject({ status: 500, message: 'Internal Server Error' });
          });
      });
    } else {
      reject({ status: 401, message: 'Unauthorized request!'});
    }
  });
}

const transformOrderInfo = (orders) => {
  let items = orders.data;
  const includes = orders.included.items;

  items = items.map(item => {
    return {
      id: item.id,
      status: item.status,
      shipping: item.shipping,
      payment: item.payment,
      price: item.meta.display_price.with_tax.formatted,
      timestamp: item.meta.timestamps.created_at,
      products: item.relationships.items.data.map(item => {
        const productInfo = includes.find(include => include.id === item.id);
        return {
          product_id: productInfo.product_id,
          quantity: productInfo.quantity,
        }
      }),
    }
  });

  return items;
}
