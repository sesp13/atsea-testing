export class GlobalInformation {
  static env = 'prod';
  // static env = 'dev';

  // Base host urls
  static baseUrl =
    this.env == 'prod'
      ? 'https://ec2-3-142-166-129.us-east-2.compute.amazonaws.com/'
      : 'http://localhost:8080/';

  static loginUrl = `${this.baseUrl}login/`;
  static purchaseUrl = `${this.baseUrl}purchase/`;
  static utilityUrl = `${this.baseUrl}utility/`;

  // Api composed urls
  static apiBaseUrl = `${this.baseUrl}api/`;
  static apiCustomerUrl = `${this.apiBaseUrl}customer/`;
  static apiOrderUrl = `${this.apiBaseUrl}order/`;
  static apiProductUrl = `${this.apiBaseUrl}product/`;

  //External urls
  static dockerInternalUrl =
    this.env == 'prod' ? this.baseUrl : 'http://host.docker.internal:8080';

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

  static disableSslVerification(): void {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  }
}
