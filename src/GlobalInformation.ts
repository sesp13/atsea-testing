export class GlobalInformation {
  //External urls
  static dockerInternalUrl = 'http://host.docker.internal:8080';

  // Base host urls
  static baseUrl = 'http://localhost:8080/';
  static loginUrl = `${this.baseUrl}login/`;
  static purchaseUrl = `${this.baseUrl}purchase/`;
  static utilityUrl = `${this.baseUrl}utility/`;

  // Api composed urls
  static apiBaseUrl = `${this.baseUrl}/api/`;
  static apiCustomerUrl = `${this.apiBaseUrl}customer/`;
  static apiOrderUrl = `${this.apiBaseUrl}order/`;
  static apiProductUrl = `${this.apiBaseUrl}product/`;


  static customerSample = {
    customer_id: undefined,
    name: 'Juan Carlos',
    address: '144 Townsend, San Francisco 99999',
    email: 'juanca548@example.com',
    phone: '513 222 5555',
    username: 'j',
    password: 'j',
    enabled: 'true',
    role: 'USER',
  };
}
