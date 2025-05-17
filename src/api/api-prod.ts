export default function api() {
  const url = process.env.REACT_APP_PROD_URL;

  return {
    "send-code": `${url}api/user/send-code/`,
    "verify-code": `${url}api/user/verify-code/`,
    refresh: `${url}api/user/refresh/`,
    create: `${url}api/manager/create/`,
    salon: `${url}api/salon/`,
    "salon-barber": `${url}api/salon-barber/`,
    barber: `${url}api/barber/`,
    category: `${url}api/category/`,
    "barber-service": `${url}api/barber-service/`,
    reservation: `${url}api/order/`,
    user: `${url}api/user/`,
    "forget-pass": `${url}api/forget-pass/`,
    "social-network": `${url}api/social-network/`,
    "salon-social-media": `${url}api/salon-social-media/`,
    "best-salons": `${url}api/best/salon/`,
    "best-barbers": `${url}api/best/barber/`,
    order: `${url}api/order/`,
    "ticket-category": `${url}api/ticket-category/`,
    ticket: `${url}api/ticket/`,
    "barber-category-gallery": `${url}api/barber-category-gallery/`,
    comment: `${url}api/order-comment/`,
    wallet: `${url}api/wallet/`,
  };
}
