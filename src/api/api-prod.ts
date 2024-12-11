export default function api() {
  const url = process.env.REACT_APP_PROD_URL;

  return {
    "send-code": `${url}api/user/send-code/`,
    "verify-code": `${url}api/user/verify-code/`,
    create: `${url}api/manager/create/`,
    salon: `${url}api/salon/`,
    category: `${url}api/category/`,
    service: `${url}api/salon-skill/`,
    barber: `${url}api/salon-barber/`,
    reservation: `${url}api/order/`,
    user: `${url}api/user/`,
    "forget-pass": `${url}api/forget-pass/`,
    "social-network": `${url}api/social-network/`,
    "salon-social-media": `${url}api/salon-social-media/`,
  };
}
